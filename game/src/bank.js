export const HEIST_TARGETS = [
  { id: 'marina', name: 'Marina Branch', vault: 2400, guards: 2, difficulty: 1, blurb: 'Small branch, sleepy guards, quick in and out.' },
  { id: 'plaza', name: 'Plaza Central', vault: 6500, guards: 4, difficulty: 2, blurb: 'Downtown flagship with a proper vault door.' },
  { id: 'crown', name: 'Crown Reserve', vault: 15000, guards: 7, difficulty: 3, blurb: 'The Syndicate bank. Bring your best crew.' },
];

export const CREW_ROLES = [
  { id: 'driver', name: 'Getaway Driver', cost: 400, cut: 0.12, effect: 'escape', blurb: 'Never caught, never late.' },
  { id: 'hacker', name: 'Hacker', cost: 600, cut: 0.15, effect: 'crack', blurb: 'Opens dials like they were doors.' },
  { id: 'muscle', name: 'Muscle', cost: 350, cut: 0.10, effect: 'guard', blurb: 'Keeps the guards busy.' },
  { id: 'lookout', name: 'Lookout', cost: 250, cut: 0.08, effect: 'alarm', blurb: 'Sees the alarm before it sees you.' },
];

export const GEAR_ITEMS = [
  { id: 'drill', name: 'Thermal Drill', cost: 500, effect: 'crack', blurb: 'Melts vault steel.' },
  { id: 'jammer', name: 'Signal Jammer', cost: 350, effect: 'alarm', blurb: 'Kills the alarm signal.' },
  { id: 'masks', name: 'Clean Masks', cost: 150, effect: 'heat', blurb: 'Nobody recognises anyone.' },
  { id: 'smoke', name: 'Smoke Bombs', cost: 200, effect: 'guard', blurb: 'A wall of smoke for the guards.' },
];

export const APPROACHES = {
  silent: { label: 'Silent', payMult: 0.7, heat: 20, alarmChance: 0.12 },
  loud: { label: 'Loud', payMult: 1.0, heat: 60, alarmChance: 0.3 },
};

function snap(v) {
  return JSON.parse(JSON.stringify(v));
}

export function createBankSystem(ctx) {
  const c = ctx || {};
  const dice = typeof c.rng === 'function' ? c.rng : Math.random;
  const state = {
    targetId: null,
    approach: 'silent',
    crew: [],
    gear: [],
    phase: 'planning',
    dials: 0,
    dialTotal: 0,
    mistakes: 0,
    maxMistakes: 3,
    heistsDone: 0,
    heistsBusted: 0,
    totalTaken: 0,
    bestTake: 0,
    lastHeist: null,
  };

  function say(msg) {
    if (typeof c.log === 'function') c.log(msg);
  }
  function cashNow() {
    return typeof c.getCash === 'function' ? c.getCash() : 0;
  }
  function pay(amount) {
    if (typeof c.addCash === 'function') c.addCash(amount);
  }
  function heat(amount) {
    if (typeof c.addHeat === 'function') c.addHeat(amount);
  }
  function findTarget(id) {
    return HEIST_TARGETS.find((t) => t.id === id) || null;
  }
  function findRole(id) {
    return CREW_ROLES.find((r) => r.id === id) || null;
  }
  function findGear(id) {
    return GEAR_ITEMS.find((g) => g.id === id) || null;
  }

  function finishHeist(success, reason) {
    const target = findTarget(state.targetId);
    const approach = APPROACHES[state.approach] || APPROACHES.silent;
    if (!success) {
      state.phase = 'busted';
      state.heistsBusted += 1;
      heat(approach.heat);
      state.lastHeist = { success: false, reason, heat: approach.heat };
      say('Heist busted: ' + reason + '.');
      state.phase = 'planning';
      state.targetId = null;
      return { ok: true, success: false, reason, heat: approach.heat };
    }
    const factor = 0.85 + dice() * 0.3;
    const gross = Math.round(target.vault * approach.payMult * factor);
    const cut = Math.round(gross * sys.crewCut());
    let take = gross - cut;
    let heatAmt = approach.heat;
    if (sys.hasEffect('heat')) heatAmt = Math.round(heatAmt / 2);
    pay(take);
    heat(heatAmt);
    state.heistsDone += 1;
    state.totalTaken += take;
    if (take > state.bestTake) state.bestTake = take;
    state.lastHeist = { success: true, gross, cut, take, heat: heatAmt };
    state.phase = 'done';
    say('Heist done: took $' + take + ' from ' + target.name + '.');
    state.phase = 'planning';
    state.targetId = null;
    return { ok: true, success: true, gross, cut, take, heat: heatAmt };
  }

  const sys = {
    target(id) {
      return findTarget(id);
    },

    hasEffect(effect) {
      for (const id of state.crew) {
        const role = findRole(id);
        if (role && role.effect === effect) return true;
      }
      for (const id of state.gear) {
        const item = findGear(id);
        if (item && item.effect === effect) return true;
      }
      return false;
    },

    crewCost() {
      let sum = 0;
      for (const id of state.crew) {
        const role = findRole(id);
        if (role) sum += role.cost;
      }
      return sum;
    },

    gearCost() {
      let sum = 0;
      for (const id of state.gear) {
        const item = findGear(id);
        if (item) sum += item.cost;
      }
      return sum;
    },

    crewCut() {
      let sum = 0;
      for (const id of state.crew) {
        const role = findRole(id);
        if (role) sum += role.cut;
      }
      return sum;
    },

    planHeist(targetId, approach) {
      const target = findTarget(targetId);
      if (!target) return { ok: false, reason: 'no-target' };
      if (state.phase === 'cracking') return { ok: false, reason: 'in-progress' };
      state.targetId = targetId;
      state.approach = APPROACHES[approach] ? approach : 'silent';
      state.phase = 'planning';
      state.crew = [];
      state.gear = [];
      state.mistakes = 0;
      say('Planned a heist on ' + target.name + ' (' + state.approach + ').');
      return { ok: true, target: target.name, approach: state.approach };
    },

    hireCrew(roleId) {
      if (state.phase !== 'planning') return { ok: false, reason: 'not-planning' };
      const role = findRole(roleId);
      if (!role) return { ok: false, reason: 'no-role' };
      if (state.crew.includes(roleId)) return { ok: false, reason: 'already-hired' };
      if (state.crew.length >= 3) return { ok: false, reason: 'crew-full' };
      if (cashNow() < role.cost) return { ok: false, reason: 'no-cash', need: role.cost };
      pay(-role.cost);
      state.crew.push(roleId);
      say('Hired ' + role.name + ' for $' + role.cost + '.');
      return { ok: true, crew: state.crew.slice() };
    },

    buyGear(gearId) {
      if (state.phase !== 'planning') return { ok: false, reason: 'not-planning' };
      const item = findGear(gearId);
      if (!item) return { ok: false, reason: 'no-gear' };
      if (state.gear.includes(gearId)) return { ok: false, reason: 'already-owned' };
      if (cashNow() < item.cost) return { ok: false, reason: 'no-cash', need: item.cost };
      pay(-item.cost);
      state.gear.push(gearId);
      say('Bought ' + item.name + ' for $' + item.cost + '.');
      return { ok: true, gear: state.gear.slice() };
    },

    startHeist() {
      if (state.phase !== 'planning' || !state.targetId) return { ok: false, reason: 'no-plan' };
      const target = findTarget(state.targetId);
      state.dialTotal = 3 + target.difficulty * 2;
      state.dials = state.dialTotal;
      state.maxMistakes = sys.hasEffect('alarm') ? 4 : 3;
      state.mistakes = 0;
      state.phase = 'cracking';
      say('Inside ' + target.name + '. Crack the vault.');
      return { ok: true, dials: state.dials, maxMistakes: state.maxMistakes };
    },

    crackVault(guess) {
      if (state.phase !== 'cracking') return { ok: false, reason: 'not-cracking' };
      const g = Math.max(0, Math.min(9, Math.floor(guess)));
      const code = Math.floor(dice() * 10);
      const window = sys.hasEffect('crack') ? 2 : 1;
      const lucky = sys.hasEffect('guard') && dice() < 0.15;
      if (Math.abs(g - code) <= window || lucky) {
        const opened = sys.hasEffect('crack') && state.gear.includes('drill') ? 2 : 1;
        state.dials = Math.max(0, state.dials - opened);
        say('Dial opened (' + opened + '). ' + state.dials + ' left.');
        if (state.dials <= 0) return finishHeist(true);
        return { ok: true, hit: true, dials: state.dials, mistakes: state.mistakes, code };
      }
      state.mistakes += 1;
      const approach = APPROACHES[state.approach] || APPROACHES.silent;
      const alarm = dice() < approach.alarmChance;
      if (state.mistakes >= state.maxMistakes || alarm) {
        return finishHeist(false, alarm ? 'alarm' : 'too-many-mistakes');
      }
      say('Wrong dial. ' + state.mistakes + ' mistake(s).');
      return { ok: true, hit: false, dials: state.dials, mistakes: state.mistakes, code };
    },

    scout(targetId) {
      const target = findTarget(targetId);
      if (!target) return { ok: false, reason: 'no-target' };
      const roll = dice();
      const guards = roll < 0.2 ? Math.max(1, target.guards - 1) : target.guards;
      const cold = roll < 0.35;
      const tip = roll < 0.2 ? 'A guard called in sick.' : roll < 0.35 ? 'Quiet week, light patrols.' : 'Standard security on site.';
      return { ok: true, target: target.name, guards, vault: target.vault, cold, tip };
    },

    planSummary() {
      if (!state.targetId) return { ok: false, reason: 'no-plan' };
      const target = findTarget(state.targetId);
      const approach = APPROACHES[state.approach] || APPROACHES.silent;
      const upfront = sys.crewCost() + sys.gearCost();
      const gross = Math.round(target.vault * approach.payMult);
      const cut = Math.round(gross * sys.crewCut());
      const crewNames = state.crew.map((id) => { const r = findRole(id); return r ? r.name : id; });
      const gearNames = state.gear.map((id) => { const g = findGear(id); return g ? g.name : id; });
      return {
        ok: true,
        target: target.name,
        approach: approach.label,
        upfront,
        gross,
        cut,
        expected: gross - cut,
        heat: approach.heat,
        crew: crewNames,
        gear: gearNames,
      };
    },

    abortHeist() {
      if (state.phase !== 'cracking') return { ok: false, reason: 'not-cracking' };
      state.targetId = null;
      state.phase = 'planning';
      state.heistsBusted += 1;
      say('Walked away from the heist.');
      return { ok: true };
    },

    hudLine() {
      if (state.phase === 'cracking') {
        return 'HEIST ' + state.dials + '/' + state.dialTotal + ' dials | ' + (state.maxMistakes - state.mistakes) + ' mistakes left';
      }
      if (state.targetId) {
        const target = findTarget(state.targetId);
        return 'HEIST ' + (target ? target.name : state.targetId) + ' | crew ' + state.crew.length;
      }
      return '';
    },

    stats() {
      return {
        phase: state.phase,
        target: state.targetId,
        crew: state.crew.length,
        gear: state.gear.length,
        dials: state.dials,
        done: state.heistsDone,
        busted: state.heistsBusted,
        taken: state.totalTaken,
        best: state.bestTake,
        last: state.lastHeist,
      };
    },

    serialize() {
      return snap(state);
    },

    deserialize(data) {
      if (!data) return;
      const copy = snap(data);
      state.targetId = copy.targetId;
      state.approach = copy.approach;
      state.crew = copy.crew || [];
      state.gear = copy.gear || [];
      state.phase = copy.phase;
      state.dials = copy.dials;
      state.dialTotal = copy.dialTotal;
      state.mistakes = copy.mistakes;
      state.maxMistakes = copy.maxMistakes;
      state.heistsDone = copy.heistsDone;
      state.heistsBusted = copy.heistsBusted;
      state.totalTaken = copy.totalTaken;
      state.bestTake = copy.bestTake;
      state.lastHeist = copy.lastHeist;
    },
  };
  return sys;
}
