export const GYM_VERSION = 1;

export const MEMBERSHIP = { day: 15, week: 60, month: 150 };

export const EXERCISES = [
  { id: 'bench', name: 'Bench Press', stat: 'strength', baseGain: 2.2, zone: [0.35, 0.65], tempo: 1.1, description: 'Push the bar, grow the chest.' },
  { id: 'squat', name: 'Squat Rack', stat: 'strength', baseGain: 2.6, zone: [0.3, 0.6], tempo: 1.3, description: 'Leg day, every day.' },
  { id: 'bag', name: 'Heavy Bag', stat: 'strength', baseGain: 1.8, zone: [0.4, 0.7], tempo: 0.8, description: 'Punch until the bag swings.' },
  { id: 'treadmill', name: 'Treadmill', stat: 'stamina', baseGain: 2.4, zone: [0.45, 0.75], tempo: 1.0, description: 'Run the belt, build the lungs.' },
  { id: 'ropes', name: 'Battle Ropes', stat: 'stamina', baseGain: 2.0, zone: [0.35, 0.65], tempo: 0.7, description: 'Waves of rope, waves of sweat.' },
  { id: 'bike', name: 'Spin Bike', stat: 'stamina', baseGain: 1.9, zone: [0.5, 0.8], tempo: 1.2, description: 'Pedal hard, stay in the zone.' },
];

export const LEVELS = [
  { level: 0, name: 'Couch Potato', min: 0 },
  { level: 1, name: 'Gym Newbie', min: 15 },
  { level: 2, name: 'Regular', min: 30 },
  { level: 3, name: 'Athlete', min: 50 },
  { level: 4, name: 'Beast', min: 70 },
  { level: 5, name: 'Solara Strong', min: 90 },
];

export function exerciseById(id) {
  return EXERCISES.find((e) => e.id === id) || null;
}

export function levelFor(value) {
  let best = LEVELS[0];
  for (const l of LEVELS) {
    if (value >= l.min) best = l;
  }
  return best;
}

export function punchMultiplier(strength) {
  return 1 + (strength / 100) * 1;
}

export function sprintMultiplier(stamina) {
  return 1 + (stamina / 100) * 0.6;
}

export function regenPerSecond(stamina) {
  return 0.4 + (stamina / 100) * 1.6;
}

export function repGain(exercise, needle, fatigue) {
  const mod = Math.max(0.25, 1 - fatigue);
  const [lo, hi] = exercise.zone;
  if (needle >= lo && needle <= hi) return exercise.baseGain * mod;
  if (needle >= lo - 0.12 && needle <= hi + 0.12) return exercise.baseGain * 0.5 * mod;
  return 0;
}

export function createGymSystem(ctx) {
  const c = ctx || {};
  const state = {
    version: GYM_VERSION,
    memberUntil: 0,
    strength: 8,
    stamina: 10,
    fatigue: 0,
    exercise: null,
    totalReps: 0,
    perfectReps: 0,
    workouts: 0,
    personalBests: {},
    sessionsToday: 0,
    log: [],
  };

  function note(msg) {
    state.log.push(msg);
    if (state.log.length > 40) state.log.shift();
    if (typeof c.log === 'function') c.log(msg);
  }
  function cashNow() {
    return typeof c.getCash === 'function' ? c.getCash() : 0;
  }
  function charge(amount) {
    if (typeof c.addCash === 'function') c.addCash(amount);
    else if (typeof c.cash === 'number') c.cash += amount;
  }
  function dayNow() {
    return typeof c.getDay === 'function' ? c.getDay() : 1;
  }

  const sys = {
    name: 'gym',
    version: GYM_VERSION,
    state,
    exercises: EXERCISES,
    memberships: MEMBERSHIP,

    isMember() {
      return state.memberUntil >= dayNow();
    },

    buyMembership(plan) {
      const price = MEMBERSHIP[plan];
      if (price === undefined) return { ok: false, reason: 'unknown-plan' };
      if (cashNow() < price) return { ok: false, reason: 'not-enough-cash', need: price };
      charge(-price);
      const days = plan === 'day' ? 1 : plan === 'week' ? 7 : 30;
      state.memberUntil = Math.max(dayNow(), state.memberUntil) + days;
      note('Bought a ' + plan + ' gym membership for $' + price + '.');
      return { ok: true, until: state.memberUntil };
    },

    startExercise(id) {
      const ex = exerciseById(id);
      if (!ex) return { ok: false, reason: 'unknown-exercise' };
      if (!sys.isMember()) return { ok: false, reason: 'not-a-member' };
      if (state.exercise) return { ok: false, reason: 'already-training' };
      if (state.fatigue >= 0.95) return { ok: false, reason: 'exhausted' };
      state.exercise = { id, reps: 0, needle: 0, direction: 1, combo: 0, bestCombo: 0, setsDone: 0, gained: 0 };
      note('Started ' + ex.name + '.');
      return { ok: true, exercise: id };
    },

    tick(dt) {
      if (!state.exercise) return;
      const ex = exerciseById(state.exercise.id);
      if (!ex) return;
      state.exercise.needle += state.exercise.direction * ex.tempo * dt;
      if (state.exercise.needle >= 1) {
        state.exercise.needle = 1;
        state.exercise.direction = -1;
      } else if (state.exercise.needle <= 0) {
        state.exercise.needle = 0;
        state.exercise.direction = 1;
      }
      state.fatigue = Math.min(1, state.fatigue + 0.008 * dt);
    },

    press() {
      if (!state.exercise) return { ok: false, reason: 'not-training' };
      const ex = exerciseById(state.exercise.id);
      const set = state.exercise;
      const gain = repGain(ex, set.needle, state.fatigue);
      set.reps += 1;
      state.totalReps += 1;
      if (gain > 0) {
        set.combo += 1;
        if (set.combo > set.bestCombo) set.bestCombo = set.combo;
        if (gain >= ex.baseGain * 0.9) state.perfectReps += 1;
        const bonus = Math.min(0.5, set.combo * 0.02);
        const total = gain * (1 + bonus);
        if (ex.stat === 'strength') state.strength = Math.min(100, state.strength + total);
        else state.stamina = Math.min(100, state.stamina + total);
        set.gained += total;
        state.fatigue = Math.min(1, state.fatigue + 0.03);
        if (set.combo % 10 === 0) note('Combo x' + set.combo + ' on ' + ex.name + '!');
        const value = ex.stat === 'strength' ? state.strength : state.stamina;
        return { ok: true, gain: total, combo: set.combo, stat: ex.stat, value };
      }
      set.combo = 0;
      state.fatigue = Math.min(1, state.fatigue + 0.02);
      return { ok: true, gain: 0, combo: 0, miss: true, stat: ex.stat, value: ex.stat === 'strength' ? state.strength : state.stamina };
    },

    finishSet() {
      if (!state.exercise) return { ok: false, reason: 'not-training' };
      const set = state.exercise;
      set.setsDone += 1;
      const prev = state.personalBests[set.id] || 0;
      if (set.bestCombo > prev) state.personalBests[set.id] = set.bestCombo;
      const summary = { exercise: set.id, reps: set.reps, gained: set.gained, bestCombo: set.bestCombo };
      state.exercise = null;
      state.workouts += 1;
      return Object.assign({ ok: true }, summary);
    },

    rest(hours) {
      const h = hours === undefined ? 8 : hours;
      state.fatigue = Math.max(0, state.fatigue - h * 0.12);
      if (h >= 6) state.stamina = Math.min(100, state.stamina + 0.5);
      return { ok: true, fatigue: Math.round(state.fatigue * 100) / 100 };
    },

    stats() {
      return {
        strength: Math.round(state.strength),
        stamina: Math.round(state.stamina),
        strengthLevel: levelFor(state.strength).name,
        staminaLevel: levelFor(state.stamina).name,
        punchMultiplier: punchMultiplier(state.strength),
        sprintMultiplier: sprintMultiplier(state.stamina),
        regenPerSecond: regenPerSecond(state.stamina),
        fatigue: Math.round(state.fatigue * 100) / 100,
        member: sys.isMember(),
        memberUntil: state.memberUntil,
        workouts: state.workouts,
        totalReps: state.totalReps,
        perfectReps: state.perfectReps,
      };
    },

    serialize() {
      const copy = JSON.parse(JSON.stringify(state));
      copy.exercise = null;
      return copy;
    },

    deserialize(data) {
      if (!data || data.version !== GYM_VERSION) return false;
      const copy = JSON.parse(JSON.stringify(data));
      for (const k of Object.keys(state)) delete state[k];
      Object.assign(state, copy);
      state.exercise = null;
      return true;
    },

    hudLine() {
      if (state.exercise) {
        const ex = exerciseById(state.exercise.id);
        const value = ex && ex.stat === 'strength' ? state.strength : state.stamina;
        return 'GYM ' + (ex ? ex.name : state.exercise.id) + ' x' + state.exercise.combo + ' | ' + (ex ? ex.stat : '') + ' ' + Math.round(value);
      }
      return 'GYM STR ' + Math.round(state.strength) + ' STA ' + Math.round(state.stamina) + (sys.isMember() ? ' | member' : '');
    },
  };
  return sys;
}

export default createGymSystem;
