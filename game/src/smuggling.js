// Solara Nights — Smuggling (round 4 attempt 6, NEW module).
// The dark side of the bay: move contraband for the crew and get paid
// like it. Smuggling runs pay five to ten times a courier job, but every
// run raises the player's heat, and getting busted mid-run loses the
// cargo, the payout, and a chunk of reputation with the crew. Runs come
// in three flavours — a quiet boat drop at the pier, a fast car run
// across the city, and a dead drop in a back alley — each with its own
// risk profile, deadline and payout curve. The crew only trusts couriers
// who have already proven themselves (delivery reputation), and the
// biggest runs unlock only after the player owns the Neon Palms Bar,
// where the contacts drink.
//
// Heat is the core resource here: high heat makes the run harder (more
// police attention, tighter deadlines) but the crew pays a danger bonus
// for it. The module is self-contained and talks to the game only
// through the optional `ctx` hooks: cash, heat, position, and the
// business check for the bar.

export const SMUGGLING_VERSION = 1;

export const CONTRABAND = [
  { id: 'cigars', name: 'Untaxed Cigars', base: 220, risk: 0.3, heat: 8, weight: 2 },
  { id: 'spirits', name: 'Bootleg Spirits', base: 320, risk: 0.4, heat: 12, weight: 3 },
  { id: 'electronics', name: 'Grey-Market Electronics', base: 480, risk: 0.5, heat: 16, weight: 3 },
  { id: 'art', name: 'Stolen Art', base: 750, risk: 0.65, heat: 22, weight: 1 },
  { id: 'diamonds', name: 'Blood Diamonds', base: 1200, risk: 0.8, heat: 30, weight: 1 },
  { id: 'cash', name: 'Dirty Cash Bundles', base: 900, risk: 0.55, heat: 25, weight: 4 },
];

export const RUN_TYPES = [
  { id: 'boat', name: 'Boat Drop', desc: 'Pick up at the pier, deliver to the marina. Slow, quiet, wet.', mult: 1.0, deadlineMult: 1.4, detect: 0.6 },
  { id: 'car', name: 'Fast Car Run', desc: 'Across the city, fast. The cops love a fast car.', mult: 1.35, deadlineMult: 0.8, detect: 1.2 },
  { id: 'dead-drop', name: 'Dead Drop', desc: 'Leave it in the alley, walk away. No face, no case.', mult: 0.85, deadlineMult: 1.2, detect: 0.5 },
];

export const SMUGGLE_SPOTS = [
  { id: 'pier', name: 'Old Pier', x: 312, z: -40 },
  { id: 'marina', name: 'Marina Steps', x: 310, z: 60 },
  { id: 'canal', name: 'Canal Mouth', x: 300, z: 170 },
  { id: 'alley', name: 'Back Alley', x: -80, z: 120 },
  { id: 'warehouse', name: 'Warehouse Row', x: -240, z: -160 },
  { id: 'airfield', name: 'Bay Airfield', x: -280, z: 240 },
  { id: 'beach', name: 'South Beach', x: 306, z: 260 },
  { id: 'plaza', name: 'Central Plaza', x: 0, z: 0 },
];

export const CREW_RANKS = [
  { rank: 0, name: 'Nobody', minRep: 0, maxCargo: 'cigars' },
  { rank: 1, name: 'Runner', minRep: 100, maxCargo: 'spirits' },
  { rank: 2, name: 'Trusted', minRep: 300, maxCargo: 'electronics' },
  { rank: 3, name: 'Made', minRep: 600, maxCargo: 'art' },
  { rank: 4, name: 'Kingpin', minRep: 1000, maxCargo: 'diamonds' },
];

export function rankForRep(rep) {
  let current = CREW_RANKS[0];
  for (const r of CREW_RANKS) if (rep >= r.minRep) current = r;
  return current;
}

export function cargoAllowed(rank, cargoId) {
  const order = CONTRABAND.map((c) => c.id);
  const maxIdx = order.indexOf(rank.maxCargo);
  return order.indexOf(cargoId) <= maxIdx;
}

export function payForRun(cargo, runType, heatLevel, rep) {
  const dangerBonus = 1 + heatLevel * 0.08;
  const repBonus = 1 + Math.min(0.5, rep / 2000);
  return Math.round(cargo.base * runType.mult * dangerBonus * repBonus);
}

export function bustChance(cargo, runType, heatLevel, wanted) {
  // Per-second detection probability while the run is active.
  const base = 0.0012 * cargo.risk * runType.detect;
  return base * (1 + heatLevel * 0.25 + wanted * 0.35);
}

export function createSmugglingSystem(ctx = {}) {
  const rng = ctx.rng || Math.random;
  const state = {
    version: SMUGGLING_VERSION,
    rep: 0,
    run: null, // { id, cargo, runType, from, to, deadline, timeLeft, pay, phase }
    offered: null,
    completed: 0,
    busted: 0,
    failed: 0,
    earned: 0,
    lostCargo: 0,
    log: [],
  };

  function note(msg) {
    state.log.push(msg);
    if (state.log.length > 40) state.log.shift();
    if (typeof ctx.log === 'function') ctx.log(msg);
  }

  function addCash(amount) {
    if (typeof ctx.addCash === 'function') ctx.addCash(amount);
    else if (typeof ctx.cash === 'number') ctx.cash += amount;
  }

  function addHeat(amount) {
    if (typeof ctx.addHeat === 'function') ctx.addHeat(amount);
  }

  function heatLevel() {
    if (typeof ctx.getHeatLevel === 'function') return ctx.getHeatLevel();
    return typeof ctx.heat === 'number' ? ctx.heat : 0;
  }

  function wantedLevel() {
    if (typeof ctx.getWanted === 'function') return ctx.getWanted();
    return 0;
  }

  function hasBar() {
    if (typeof ctx.hasBusiness === 'function') return ctx.hasBusiness('bar');
    return true; // standalone: contacts available
  }

  function deliveryRep() {
    if (typeof ctx.getDeliveryRep === 'function') return ctx.getDeliveryRep();
    return 999; // standalone: assume proven
  }

  function pickSpot(excludeId) {
    const pool = SMUGGLE_SPOTS.filter((s) => s.id !== excludeId);
    return pool[Math.floor(rng() * pool.length)];
  }

  function offerRun() {
    if (deliveryRep() < 50 && state.rep < 50) {
      state.offered = null;
      return { ok: false, reason: 'prove-yourself-first', need: 'delivery rep 50' };
    }
    const rank = rankForRep(state.rep);
    const allowed = CONTRABAND.filter((c) => cargoAllowed(rank, c.id));
    const cargo = allowed[Math.floor(rng() * allowed.length)];
    const runType = RUN_TYPES[Math.floor(rng() * RUN_TYPES.length)];
    const from = pickSpot(null);
    const to = pickSpot(from.id);
    const dist = Math.hypot(from.x - to.x, from.z - to.z);
    const deadline = Math.round((30 + dist / 11) * runType.deadlineMult);
    const pay = payForRun(cargo, runType, heatLevel(), state.rep);
    state.offered = { id: `run-${state.completed + state.busted + state.failed + 1}`, cargo, runType, from, to, dist: Math.round(dist), deadline, pay };
    return { ok: true, offered: state.offered };
  }

  function acceptRun() {
    if (!state.offered) return { ok: false, reason: 'no-offer' };
    if (state.run) return { ok: false, reason: 'run-active' };
    if (state.offered.cargo.id === 'diamonds' && !hasBar()) {
      return { ok: false, reason: 'needs-bar', need: 'own the Neon Palms Bar' };
    }
    state.run = { ...state.offered, timeLeft: state.offered.deadline, phase: 'pickup' };
    state.offered = null;
    addHeat(state.run.cargo.heat * 0.4);
    note(`🤫 Smuggling: ${state.run.cargo.name} (${state.run.runType.name}) — ${state.run.from.name} → ${state.run.to.name}, ${state.run.deadline}s, pays $${state.run.pay}. Stay quiet.`);
    return { ok: true, run: state.run };
  }

  function declineRun() {
    state.offered = null;
    return offerRun();
  }

  function nearSpot(spot, radius = 8) {
    if (typeof ctx.getPlayerPos !== 'function') return false;
    const p = ctx.getPlayerPos();
    return Math.hypot(p.x - spot.x, p.z - spot.z) <= radius;
  }

  function tick(dt) {
    const run = state.run;
    if (!run) return;
    run.timeLeft -= dt;
    if (run.phase === 'pickup' && nearSpot(run.from)) {
      run.phase = 'deliver';
      note(`🤫 Cargo loaded. Deliver to ${run.to.name} — ${Math.ceil(run.timeLeft)}s left.`);
    } else if (run.phase === 'deliver' && nearSpot(run.to)) {
      completeRun();
      return;
    }
    // Detection roll: the longer the run, the likelier a bust.
    if (rng() < bustChance(run.cargo, run.runType, heatLevel(), wantedLevel()) * dt * 60) {
      bustRun('spotted');
      return;
    }
    if (run.timeLeft <= 0) {
      failRun('too-slow');
    }
  }

  function completeRun() {
    const run = state.run;
    state.run = null;
    state.completed += 1;
    state.rep += 40 + Math.round(run.cargo.risk * 40);
    state.earned += run.pay;
    addCash(run.pay);
    addHeat(run.cargo.heat * 0.3);
    note(`🤫 Run complete — $${run.pay} in dirty money. Crew rep +${40 + Math.round(run.cargo.risk * 40)}.`);
    if (typeof ctx.onSmuggleComplete === 'function') ctx.onSmuggleComplete(run, run.pay);
    offerRun();
    return { ok: true, pay: run.pay, rep: state.rep };
  }

  function bustRun(reason) {
    const run = state.run;
    state.run = null;
    state.busted += 1;
    state.lostCargo += 1;
    state.rep = Math.max(0, state.rep - 60);
    addHeat(25);
    note(`🚨 BUSTED (${reason})! Cargo seized, crew rep -60, heat +25.`);
    if (typeof ctx.onBust === 'function') ctx.onBust(run, reason);
    offerRun();
    return { ok: false, reason };
  }

  function failRun(reason) {
    const run = state.run;
    state.run = null;
    state.failed += 1;
    state.rep = Math.max(0, state.rep - 20);
    note(`🤫 Run failed (${reason}). The crew is not pleased. Rep -20.`);
    offerRun();
    return { ok: false, reason };
  }

  function abandonRun() {
    if (!state.run) return { ok: false, reason: 'no-run' };
    return failRun('abandoned');
  }

  function stats() {
    return {
      rep: state.rep,
      rank: rankForRep(state.rep),
      completed: state.completed,
      busted: state.busted,
      failed: state.failed,
      earned: state.earned,
      lostCargo: state.lostCargo,
      active: !!state.run,
    };
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(data) {
    if (!data || data.version !== SMUGGLING_VERSION) return false;
    Object.assign(state, data);
    return true;
  }

  function hudLine() {
    if (state.run) {
      const r = state.run;
      const target = r.phase === 'pickup' ? r.from.name : r.to.name;
      return `🤫 ${r.phase === 'pickup' ? 'PICKUP' : 'DELIVER'} ${r.cargo.name} → ${target} — ${Math.max(0, Math.ceil(r.timeLeft))}s — $${r.pay}`;
    }
    if (state.offered) return `🤫 Run offered: ${state.offered.cargo.name} — $${state.offered.pay}`;
    return '';
  }

  return {
    name: 'smuggling',
    version: SMUGGLING_VERSION,
    state,
    contraband: CONTRABAND,
    runTypes: RUN_TYPES,
    spots: SMUGGLE_SPOTS,
    offerRun,
    acceptRun,
    declineRun,
    tick,
    abandonRun,
    stats,
    serialize,
    deserialize,
    hudLine,
  };
}

export default createSmugglingSystem;
