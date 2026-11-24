export const BOUNTY_TARGETS = [
  { id: 'marlow', name: 'Jo Skip Marlow', crime: 'Skipped bail', difficulty: 1, rewardAlive: 400, rewardDead: 220, intelNeed: 1, district: 'Docks', blurb: 'A small-time skip with a big mouth.' },
  { id: 'voss', name: 'Ana Voss', crime: 'Fraud', difficulty: 2, rewardAlive: 900, rewardDead: 500, intelNeed: 2, district: 'Plaza', blurb: 'Paper trails and a fast car.' },
  { id: 'delgado', name: 'Rex Delgado', crime: 'Armed robbery', difficulty: 3, rewardAlive: 1600, rewardDead: 950, intelNeed: 2, district: 'Downtown', blurb: 'Heavy, armed, and not shy about it.' },
  { id: 'haddad', name: 'Omar Fence Haddad', crime: 'Fencing stolen goods', difficulty: 3, rewardAlive: 1900, rewardDead: 1100, intelNeed: 3, district: 'Marina', blurb: 'Every stolen watch in the bay passes through him.' },
  { id: 'park', name: 'Lena Ghost Park', crime: 'Grand theft', difficulty: 4, rewardAlive: 3200, rewardDead: 1800, intelNeed: 3, district: 'Beach', blurb: 'Gone before the alarm finishes ringing.' },
  { id: 'crown', name: 'Silas Sil Crown', crime: 'Syndicate enforcer', difficulty: 5, rewardAlive: 6000, rewardDead: 3500, intelNeed: 4, district: 'Docks', blurb: 'Ex-crew, expensive, and very dangerous.' },
];

const INTEL_COST = 120;
const INTEL_BONUS = 0.12;
const BASE_ODDS = 0.55;
const COLD_AFTER = 3;
const RANK_STEPS = [
  { min: 0, name: 'Rookie' },
  { min: 3, name: 'Tracker' },
  { min: 8, name: 'Hunter' },
  { min: 15, name: 'Manhunter' },
  { min: 25, name: 'Legend of the Bay' },
];

export function bountyRank(collected) {
  let rank = RANK_STEPS[0].name;
  for (const step of RANK_STEPS) {
    if (collected >= step.min) rank = step.name;
  }
  return rank;
}

export function createBountySystem(ctx) {
  const c = ctx;
  const state = {
    active: null,
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

  function findTarget(id) {
    return BOUNTY_TARGETS.find((t) => t.id === id) || null;
  }
  function dayNow() {
    return typeof c.getDay === 'function' ? c.getDay() : 1;
  }
  function isCold() {
    if (!state.active) return false;
    return dayNow() - state.active.dayTaken >= COLD_AFTER;
  }
  function say(msg) {
    if (typeof c.log === 'function') c.log(msg);
  }
  function roll() {
    return typeof c.rng === 'function' ? c.rng() : Math.random();
  }

  const sys = {
    takeContract(id) {
      const target = findTarget(id);
      if (!target) return { ok: false, reason: 'no-such-target' };
      if (state.active) return { ok: false, reason: 'contract-active', active: state.active.id };
      if (state.completedIds.includes(id)) return { ok: false, reason: 'already-collected' };
      state.active = { id, intel: 0, dayTaken: dayNow(), attempts: 0 };
      say('Took the contract on ' + target.name + '.');
      return { ok: true, target: target.name, rewardAlive: target.rewardAlive, intelNeed: target.intelNeed };
    },

    gatherIntel() {
      if (!state.active) return { ok: false, reason: 'no-contract' };
      const target = findTarget(state.active.id);
      if (state.active.intel >= target.intelNeed) return { ok: false, reason: 'intel-maxed' };
      if (c.getCash() < INTEL_COST) return { ok: false, reason: 'no-cash', need: INTEL_COST };
      c.addCash(-INTEL_COST);
      state.spent += INTEL_COST;
      state.active.intel += 1;
      say('Intel on ' + target.name + ': spotted near the ' + target.district + '.');
      return { ok: true, intel: state.active.intel, need: target.intelNeed };
    },

    takedown(mode) {
      if (!state.active) return { ok: false, reason: 'no-contract' };
      const target = findTarget(state.active.id);
      const aliveMode = mode !== 'dead';
      let odds = BASE_ODDS + state.active.intel * INTEL_BONUS - (target.difficulty - 1) * 0.08;
      if (isCold()) odds -= 0.10;
      odds -= state.active.attempts * 0.10;
      odds = Math.max(0.05, Math.min(0.95, odds));
      const r = roll();
      state.active.attempts += 1;
      if (r > odds) {
        state.failed += 1;
        if (state.active.attempts >= 2) {
          const name = target.name;
          state.active = null;
          say(name + ' slipped town after two failed takedowns.');
          return { ok: false, reason: 'target-fled', target: name, odds };
        }
        return { ok: false, reason: 'takedown-failed', odds, attempts: state.active.attempts };
      }
      const reward = aliveMode ? target.rewardAlive : target.rewardDead;
      const heat = aliveMode ? 0 : target.difficulty;
      c.addCash(reward);
      if (heat > 0 && typeof c.addHeat === 'function') c.addHeat(heat);
      state.collected += 1;
      if (aliveMode) state.alive += 1;
      else state.dead += 1;
      state.earned += reward;
      state.completedIds.push(target.id);
      state.lastCatch = { id: target.id, name: target.name, alive: aliveMode, reward, heat };
      const rank = bountyRank(state.collected);
      state.active = null;
      say('Brought in ' + target.name + ' for $' + reward + '. Rank: ' + rank + '.');
      return { ok: true, target: target.name, alive: aliveMode, reward, heat, rank };
    },

    abandon() {
      if (!state.active) return { ok: false, reason: 'no-contract' };
      const target = findTarget(state.active.id);
      state.active = null;
      say('Abandoned the contract on ' + target.name + '.');
      return { ok: true, target: target.name };
    },

    tickDay(day) {
      if (!state.active) return { ok: false, reason: 'no-contract' };
      if (day - state.active.dayTaken > COLD_AFTER) {
        const target = findTarget(state.active.id);
        state.active = null;
        state.cold += 1;
        say(target.name + ' slipped town — the trail went cold.');
        return { ok: true, cold: true, target: target.name };
      }
      return { ok: true, cold: isCold(), active: state.active.id };
    },

    contractStatus() {
      if (!state.active) return { active: false };
      const target = findTarget(state.active.id);
      return {
        active: true,
        id: state.active.id,
        name: target.name,
        intel: state.active.intel,
        need: target.intelNeed,
        attempts: state.active.attempts,
        cold: isCold(),
        rewardAlive: target.rewardAlive,
        rewardDead: target.rewardDead,
      };
    },

    availableContracts() {
      return BOUNTY_TARGETS.filter((t) => !state.completedIds.includes(t.id)).map((t) => ({
        id: t.id,
        name: t.name,
        difficulty: t.difficulty,
        rewardAlive: t.rewardAlive,
        rewardDead: t.rewardDead,
        district: t.district,
      }));
    },

    stats() {
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
    },

    hudLine() {
      if (state.active) {
        const target = findTarget(state.active.id);
        return 'BOUNTY ' + target.name + ' ' + state.active.intel + '/' + target.intelNeed + (isCold() ? ' COLD' : '');
      }
      if (state.collected === 0) return '';
      return 'BOUNTY ' + bountyRank(state.collected) + ' ' + state.collected + ' caught | $' + state.earned;
    },

    serialize() {
      return {
        active: state.active ? JSON.parse(JSON.stringify(state.active)) : null,
        collected: state.collected,
        alive: state.alive,
        dead: state.dead,
        failed: state.failed,
        earned: state.earned,
        spent: state.spent,
        cold: state.cold,
        completedIds: state.completedIds.slice(),
        lastCatch: state.lastCatch ? JSON.parse(JSON.stringify(state.lastCatch)) : null,
      };
    },

    deserialize(data) {
      if (!data || typeof data !== 'object') return;
      if (data.active !== undefined) state.active = data.active ? JSON.parse(JSON.stringify(data.active)) : null;
      if (typeof data.collected === 'number') state.collected = data.collected;
      if (typeof data.alive === 'number') state.alive = data.alive;
      if (typeof data.dead === 'number') state.dead = data.dead;
      if (typeof data.failed === 'number') state.failed = data.failed;
      if (typeof data.earned === 'number') state.earned = data.earned;
      if (typeof data.spent === 'number') state.spent = data.spent;
      if (typeof data.cold === 'number') state.cold = data.cold;
      if (Array.isArray(data.completedIds)) state.completedIds = data.completedIds.slice();
      if (data.lastCatch !== undefined) state.lastCatch = data.lastCatch ? JSON.parse(JSON.stringify(data.lastCatch)) : null;
    },
  };
  return sys;
}
