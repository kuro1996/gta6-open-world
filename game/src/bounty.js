// Solara Nights — Bounty Hunter (Round 6 attempt 8).
// The Solara Bay Bail Board: skip-tracers, deadbeats and one very
// expensive ex-crew enforcer, all with a price on their head. Take a
// contract, gather intel to raise your odds, then take the target down —
// alive pays more, loud pays in heat. Intel decays: a contract left
// sitting goes cold and the target slips town.
// The system owns its state and only touches the game through the small
// ctx hooks below (rng / getCash / addCash / addHeat / log / getDay),
// the same factory pattern as arcade.js / bank.js / tuning.js.

export const BOUNTY_TARGETS = [
  {
    id: 'skip-trace-jo',
    name: 'Jo "Skip" Marlow',
    crime: 'Skipped bail on a chop-shop rap',
    difficulty: 1,
    rewardAlive: 400,
    rewardDead: 220,
    intelNeed: 1,
    district: 'Docks',
    blurb: 'Hides in the container yard. Runs at the sight of a badge.',
  },
  {
    id: 'debt-runner-ana',
    name: 'Ana Voss',
    crime: 'Owes the Velvet Room $9,000 in markers',
    difficulty: 2,
    rewardAlive: 900,
    rewardDead: 500,
    intelNeed: 2,
    district: 'Plaza',
    blurb: 'Moves between hotel bars. Never the same one twice.',
  },
  {
    id: 'wheelman-rex',
    name: 'Rex Delgado',
    crime: 'Wheelman for three bank crews',
    difficulty: 3,
    rewardAlive: 1600,
    rewardDead: 950,
    intelNeed: 2,
    district: 'Downtown',
    blurb: 'Fast car, faster mouth. Corner him and he talks — or shoots.',
  },
  {
    id: 'fence-omar',
    name: 'Omar "Fence" Haddad',
    crime: 'Fencing stolen parts across the bay',
    difficulty: 3,
    rewardAlive: 1900,
    rewardDead: 1100,
    intelNeed: 3,
    district: 'Marina',
    blurb: 'Two bodyguards, one boat, zero patience.',
  },
  {
    id: 'ghost-lena',
    name: 'Lena "Ghost" Park',
    crime: 'Ghosted three crews mid-heist',
    difficulty: 4,
    rewardAlive: 3200,
    rewardDead: 1800,
    intelNeed: 3,
    district: 'Beach',
    blurb: 'Nobody has a photo. Everybody has a story.',
  },
  {
    id: 'enforcer-sil',
    name: 'Silas "Sil" Crown',
    crime: 'Ex-crew enforcer, wanted by everyone at once',
    difficulty: 5,
    rewardAlive: 6000,
    rewardDead: 3500,
    intelNeed: 4,
    district: 'Docks',
    blurb: 'The board pays double for him alive. The board is scared of him.',
  },
];

const INTEL_COST = 120; // cash per intel point
const INTEL_BONUS = 0.12; // +12% takedown odds per intel point
const BASE_ODDS = 0.55; // base takedown chance at full intel
const COLD_AFTER_DAYS = 3; // a contract goes cold this many days after taking it
const RANK_STEPS = [0, 3, 8, 15, 25]; // bounties collected -> rank index
const RANK_NAMES = ['Rookie', 'Tracker', 'Hunter', 'Manhunter', 'Legend of the Bay'];

export function bountyRank(collected) {
  let rank = 0;
  for (let i = 0; i < RANK_STEPS.length; i += 1) {
    if (collected >= RANK_STEPS[i]) rank = i;
  }
  return RANK_NAMES[rank];
}

export function createBountySystem(ctx) {
  const state = {
    active: null, // { id, intel, dayTaken, attempts }
    collected: 0,
    alive: 0,
    dead: 0,
    failed: 0,
    earned: 0,
    spent: 0,
    cold: 0,
    completedIds: [],
    lastCatch: null,
  };

  function targetById(id) {
    return BOUNTY_TARGETS.find((t) => t.id === id) || null;
  }

  function dayNow() {
    return ctx.getDay ? ctx.getDay() : 1;
  }

  function isCold() {
    if (!state.active) return false;
    return dayNow() - state.active.dayTaken >= COLD_AFTER_DAYS;
  }

  function takeContract(id) {
    const target = targetById(id);
    if (!target) return { ok: false, reason: 'no-such-target' };
    if (state.active) return { ok: false, reason: 'contract-active', active: state.active.id };
    if (state.completedIds.includes(id)) return { ok: false, reason: 'already-collected' };
    state.active = { id, intel: 0, dayTaken: dayNow(), attempts: 0 };
    ctx.log(`Contract taken: ${target.name} — ${target.crime}. Bring them in.`);
    return { ok: true, target: target.name, rewardAlive: target.rewardAlive, intelNeed: target.intelNeed };
  }

  function gatherIntel() {
    if (!state.active) return { ok: false, reason: 'no-contract' };
    const target = targetById(state.active.id);
    if (state.active.intel >= target.intelNeed) return { ok: false, reason: 'intel-maxed' };
    if (ctx.getCash() < INTEL_COST) return { ok: false, reason: 'no-cash', need: INTEL_COST };
    ctx.addCash(-INTEL_COST);
    state.spent += INTEL_COST;
    state.active.intel += 1;
    ctx.log(`Intel on ${target.name}: ${state.active.intel}/${target.intelNeed} — last seen in ${target.district}.`);
    return { ok: true, intel: state.active.intel, need: target.intelNeed };
  }

  // Attempt the takedown. Odds: base 55%, +12% per intel point, −8% per
  // difficulty step above 1, −10% if the contract went cold. Alive pays
  // the full reward; a "loud" takedown (dead) pays the smaller reward
  // but adds heat. A failed attempt costs the target's nerve: the next
  // attempt is 10% harder, and after 2 failures the target bolts.
  function takedown(mode) {
    if (!state.active) return { ok: false, reason: 'no-contract' };
    const target = targetById(state.active.id);
    const alive = mode !== 'dead';
    let odds = BASE_ODDS + state.active.intel * INTEL_BONUS - (target.difficulty - 1) * 0.08;
    if (isCold()) odds -= 0.10;
    odds -= state.active.attempts * 0.10;
    odds = Math.max(0.05, Math.min(0.95, odds));
    const roll = ctx.rng ? ctx.rng() : Math.random();
    state.active.attempts += 1;
    if (roll > odds) {
      state.failed += 1;
      if (state.active.attempts >= 2) {
        const fled = target.name;
        state.active = null;
        ctx.log(`${fled} slipped the net twice — the contract is blown.`);
        return { ok: false, reason: 'target-fled', target: fled, odds };
      }
      ctx.log(`Takedown on ${target.name} missed — they know you're coming now.`);
      return { ok: false, reason: 'takedown-failed', odds, attempts: state.active ? state.active.attempts : 0 };
    }
    const reward = alive ? target.rewardAlive : target.rewardDead;
    const heat = alive ? 0 : target.difficulty;
    ctx.addCash(reward);
    if (heat > 0 && ctx.addHeat) ctx.addHeat(heat);
    state.collected += 1;
    if (alive) state.alive += 1;
    else state.dead += 1;
    state.earned += reward;
    state.completedIds.push(target.id);
    state.lastCatch = { id: target.id, name: target.name, alive, reward, heat };
    state.active = null;
    ctx.log(`${target.name} ${alive ? 'brought in alive' : 'taken down'} — +$${reward}${heat ? `, +${heat} heat` : ''}. Rank: ${bountyRank(state.collected)}.`);
    return { ok: true, target: target.name, alive, reward, heat, rank: bountyRank(state.collected) };
  }

  function abandon() {
    if (!state.active) return { ok: false, reason: 'no-contract' };
    const name = targetById(state.active.id).name;
    state.active = null;
    ctx.log(`Contract on ${name} abandoned. The board remembers.`);
    return { ok: true, target: name };
  }

  // Called once a day from main.js: a contract left sitting goes cold
  // (odds penalty) and after one more day the target slips town entirely.
  function tickDay(day) {
    if (!state.active) return { ok: false, reason: 'no-contract' };
    if (day - state.active.dayTaken > COLD_AFTER_DAYS) {
      const name = targetById(state.active.id).name;
      state.active = null;
      state.cold += 1;
      ctx.log(`Contract on ${name} went cold — they slipped out of Solara Bay.`);
      return { ok: true, cold: true, target: name };
    }
    return { ok: true, cold: isCold(), active: state.active.id };
  }

  function contractStatus() {
    if (!state.active) return { active: false };
    const target = targetById(state.active.id);
    return {
      active: true,
      id: target.id,
      name: target.name,
      intel: state.active.intel,
      need: target.intelNeed,
      attempts: state.active.attempts,
      cold: isCold(),
      rewardAlive: target.rewardAlive,
      rewardDead: target.rewardDead,
    };
  }

  function availableContracts() {
    return BOUNTY_TARGETS.filter((t) => !state.completedIds.includes(t.id)).map((t) => ({
      id: t.id, name: t.name, difficulty: t.difficulty,
      rewardAlive: t.rewardAlive, rewardDead: t.rewardDead, district: t.district,
    }));
  }

  function stats() {
    return {
      active: state.active ? state.active.id : null,
      collected: state.collected,
      alive: state.alive,
      dead: state.dead,
      failed: state.failed,
      cold: state.cold,
      earned: state.earned,
      spent: state.spent,
      profit: state.earned - state.spent,
      rank: bountyRank(state.collected),
      lastCatch: state.lastCatch,
    };
  }

  function hudLine() {
    if (!state.active && state.collected === 0) return '';
    const c = contractStatus();
    return c.active
      ? `BOUNTY ${c.name} · intel ${c.intel}/${c.need}${c.cold ? ' · COLD' : ''}`
      : `BOUNTY ${bountyRank(state.collected)} · ${state.collected} collected · +$${state.earned}`;
  }

  function serialize() {
    return {
      active: state.active ? { ...state.active } : null,
      collected: state.collected,
      alive: state.alive,
      dead: state.dead,
      failed: state.failed,
      earned: state.earned,
      spent: state.spent,
      cold: state.cold,
      completedIds: [...state.completedIds],
      lastCatch: state.lastCatch ? { ...state.lastCatch } : null,
    };
  }

  function deserialize(data) {
    if (!data || typeof data !== 'object') return;
    if (data.active) state.active = { ...data.active };
    if (typeof data.collected === 'number') state.collected = data.collected;
    if (typeof data.alive === 'number') state.alive = data.alive;
    if (typeof data.dead === 'number') state.dead = data.dead;
    if (typeof data.failed === 'number') state.failed = data.failed;
    if (typeof data.earned === 'number') state.earned = data.earned;
    if (typeof data.spent === 'number') state.spent = data.spent;
    if (typeof data.cold === 'number') state.cold = data.cold;
    if (Array.isArray(data.completedIds)) state.completedIds = [...data.completedIds];
    if (data.lastCatch) state.lastCatch = { ...data.lastCatch };
  }

  return {
    takeContract, gatherIntel, takedown, abandon, tickDay,
    contractStatus, availableContracts, stats, hudLine,
    serialize, deserialize, state,
  };
}
