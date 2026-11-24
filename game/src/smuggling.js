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
  { id: 'boat', name: 'Boat Drop', description: 'Quiet water, slow and steady.', mult: 1.0, deadlineMult: 1.4, detection: 0.6 },
  { id: 'car', name: 'Fast Car Run', description: 'Speed over stealth.', mult: 1.35, deadlineMult: 0.8, detection: 1.2 },
  { id: 'dead-drop', name: 'Dead Drop', description: 'Leave it and walk away.', mult: 0.85, deadlineMult: 1.2, detection: 0.5 },
];

export const SMUGGLE_SPOTS = [
  { id: 'pier', name: 'Old Pier', x: 312, z: -40 },
  { id: 'marina-steps', name: 'Marina Steps', x: 310, z: 60 },
  { id: 'canal', name: 'Canal Mouth', x: 300, z: 170 },
  { id: 'alley', name: 'Back Alley', x: -80, z: 120 },
  { id: 'warehouse', name: 'Warehouse Row', x: -240, z: -160 },
  { id: 'airfield', name: 'Bay Airfield', x: -280, z: 240 },
  { id: 'south-beach', name: 'South Beach', x: 306, z: 260 },
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
  let best = CREW_RANKS[0];
  for (const r of CREW_RANKS) {
    if (rep >= r.minRep) best = r;
  }
  return best;
}

export function cargoAllowed(rank, cargoId) {
  const maxIdx = CONTRABAND.findIndex((c) => c.id === rank.maxCargo);
  const idx = CONTRABAND.findIndex((c) => c.id === cargoId);
  if (idx < 0 || maxIdx < 0) return false;
  if (idx <= maxIdx) return true;
  return rank.maxCargo === 'diamonds' && cargoId === 'cash';
}

export function payForRun(cargo, runType, heatLevel, rep) {
  const danger = 1 + heatLevel * 0.08;
  const repBonus = 1 + Math.min(0.5, rep / 2000);
  return Math.round(cargo.base * runType.mult * danger * repBonus);
}

export function bustChance(cargo, runType, heatLevel, wanted) {
  return 0.0012 * cargo.risk * runType.detection * (1 + heatLevel * 0.25 + wanted * 0.35);
}

function findCargo(id) {
  return CONTRABAND.find((c) => c.id === id) || null;
}
function findRunType(id) {
  return RUN_TYPES.find((r) => r.id === id) || null;
}

export function createSmugglingSystem(ctx) {
  const c = ctx || {};
  const state = {
    version: SMUGGLING_VERSION,
    rep: 0,
    run: null,
    offered: null,
    completed: 0,
    busted: 0,
    failed: 0,
    earned: 0,
    lostCargo: 0,
    log: [],
  };

  function say(msg) {
    state.log.push(msg);
    if (state.log.length > 40) state.log.shift();
    if (typeof c.log === 'function') c.log(msg);
  }
  function roll() {
    return typeof c.rng === 'function' ? c.rng() : Math.random();
  }
  function cashIn(amount) {
    if (typeof c.addCash === 'function') c.addCash(amount);
    else if (typeof c.cash === 'number') c.cash += amount;
  }
  function addHeat(amount) {
    if (typeof c.addHeat === 'function') c.addHeat(amount);
  }
  function heatLevel() {
    if (typeof c.getHeatLevel === 'function') return c.getHeatLevel();
    return typeof c.heat === 'number' ? c.heat : 0;
  }
  function wantedLevel() {
    return typeof c.getWanted === 'function' ? c.getWanted() : 0;
  }
  function hasBar() {
    if (typeof c.hasBusiness === 'function') return c.hasBusiness('bar');
    return true;
  }
  function deliveryRep() {
    if (typeof c.getDeliveryRep === 'function') return c.getDeliveryRep();
    return 999;
  }
  function pickSpot(excludeId) {
    const pool = SMUGGLE_SPOTS.filter((s) => s.id !== excludeId);
    return pool[Math.floor(roll() * pool.length)];
  }
  function nearSpot(spot, radius) {
    const r = radius === undefined ? 8 : radius;
    if (typeof c.getPlayerPos !== 'function') return false;
    const p = c.getPlayerPos();
    return Math.hypot(p.x - spot.x, p.z - spot.z) <= r;
  }

  function completeRun() {
    const run = state.run;
    state.run = null;
    const cargo = findCargo(run.cargo);
    const repGain = Math.round(40 + cargo.risk * 40);
    state.completed += 1;
    state.rep += repGain;
    state.earned += run.pay;
    cashIn(run.pay);
    addHeat(Math.round(cargo.heat * 0.3));
    say('Smuggling run done: $' + run.pay + ' for ' + cargo.name + '.');
    if (typeof c.onSmuggleComplete === 'function') c.onSmuggleComplete(run);
    sys.offerRun();
    return { ok: true, pay: run.pay, rep: repGain };
  }

  function bustRun(reason) {
    state.run = null;
    state.busted += 1;
    state.lostCargo += 1;
    state.rep = Math.max(0, state.rep - 60);
    addHeat(25);
    say('Busted! ' + reason + ' — cargo lost.');
    if (typeof c.onBust === 'function') c.onBust(reason);
    sys.offerRun();
    return { ok: false, reason };
  }

  function failRun(reason) {
    state.run = null;
    state.failed += 1;
    state.rep = Math.max(0, state.rep - 20);
    say('Smuggling run failed: ' + reason + '.');
    sys.offerRun();
    return { ok: false, reason };
  }

  const sys = {
    name: 'smuggling',
    version: SMUGGLING_VERSION,
    state,
    contraband: CONTRABAND,
    runTypes: RUN_TYPES,
    spots: SMUGGLE_SPOTS,

    offerRun() {
      const dRep = deliveryRep();
      if (dRep < 50 && state.rep < 50) {
        state.offered = null;
        return { ok: false, reason: 'prove-yourself-first', need: 50 };
      }
      const rank = rankForRep(state.rep);
      const allowed = CONTRABAND.filter((cargo) => cargoAllowed(rank, cargo.id));
      const cargo = allowed[Math.floor(roll() * allowed.length)];
      const runType = RUN_TYPES[Math.floor(roll() * RUN_TYPES.length)];
      const from = pickSpot(null);
      const to = pickSpot(from.id);
      const distance = Math.hypot(to.x - from.x, to.z - from.z);
      const deadline = Math.round((25 + distance / 13) * runType.deadlineMult);
      const pay = payForRun(cargo, runType, heatLevel(), state.rep);
      const offer = {
        id: 'run-' + (state.completed + state.busted + state.failed + 1),
        cargo: cargo.id,
        runType: runType.id,
        from,
        to,
        distance,
        deadline,
        pay,
      };
      state.offered = offer;
      return { ok: true, offer };
    },

    acceptRun() {
      if (!state.offered) return { ok: false, reason: 'no-offer' };
      if (state.run) return { ok: false, reason: 'run-active' };
      if (state.offered.cargo === 'diamonds' && !hasBar()) {
        return { ok: false, reason: 'needs-bar', need: 'Neon Palms Bar' };
      }
      const offer = state.offered;
      const cargo = findCargo(offer.cargo);
      state.run = {
        id: offer.id,
        cargo: offer.cargo,
        runType: offer.runType,
        from: offer.from,
        to: offer.to,
        deadline: offer.deadline,
        timeLeft: offer.deadline,
        pay: offer.pay,
        phase: 'pickup',
      };
      state.offered = null;
      addHeat(Math.round(cargo.heat * 0.4));
      say('Smuggling run started: ' + cargo.name + ' to ' + state.run.to.name + '.');
      return { ok: true, run: state.run };
    },

    declineRun() {
      state.offered = null;
      return sys.offerRun();
    },

    tick(dt) {
      if (!state.run) return;
      const run = state.run;
      run.timeLeft -= dt;
      if (run.phase === 'pickup' && nearSpot(run.from)) {
        run.phase = 'deliver';
        say('Cargo picked up. Deliver to ' + run.to.name + '.');
      } else if (run.phase === 'deliver' && nearSpot(run.to)) {
        completeRun();
        return;
      }
      const cargo = findCargo(run.cargo);
      const runType = findRunType(run.runType);
      const chance = bustChance(cargo, runType, heatLevel(), wantedLevel());
      if (roll() < chance * dt * 60) {
        bustRun('spotted');
        return;
      }
      if (run.timeLeft <= 0) failRun('too-slow');
    },

    abandonRun() {
      if (!state.run) return { ok: false, reason: 'no-run' };
      return failRun('abandoned');
    },

    stats() {
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
    },

    serialize() {
      return JSON.parse(JSON.stringify(state));
    },

    deserialize(data) {
      if (!data || data.version !== SMUGGLING_VERSION) return false;
      const copy = JSON.parse(JSON.stringify(data));
      for (const k of Object.keys(state)) delete state[k];
      Object.assign(state, copy);
      return true;
    },

    hudLine() {
      if (state.run) {
        const cargo = findCargo(state.run.cargo);
        const word = state.run.phase === 'pickup' ? 'PICKUP' : 'DELIVER';
        const target = state.run.phase === 'pickup' ? state.run.from : state.run.to;
        return word + ' ' + (cargo ? cargo.name : state.run.cargo) + ' → ' + target.name + ' | ' + Math.ceil(state.run.timeLeft) + 's | $' + state.run.pay;
      }
      if (state.offered) {
        const cargo = findCargo(state.offered.cargo);
        return 'SMUGGLE ' + (cargo ? cargo.name : state.offered.cargo) + ' | $' + state.offered.pay;
      }
      return '';
    },
  };
  return sys;
}

export default createSmugglingSystem;
