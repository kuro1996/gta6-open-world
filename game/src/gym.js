// Solara Nights — Gym (round 4 attempt 6, NEW module).
// The Iron Paradise gym on the north side: train strength and stamina
// and the body pays it back in the world. More strength means harder
// punches and faster car-jacking; more stamina means longer sprints
// and quicker recovery after a chase. Training is a minigame, not a
// button: each exercise has a rhythm — press in the green zone, keep
// the combo alive, and the gains stack. Miss the zone and the set
// fizzles. Over-train and fatigue caps the gains until the player
// rests (sleep at a safehouse or just wait it out).
//
// Stats are small numbers with big effects: strength 0-100 maps to a
// punch multiplier (1.0x-2.0x) and stamina 0-100 maps to a sprint
// multiplier (1.0x-1.6x) plus faster health regen. The module is
// self-contained and talks to the game only through the optional `ctx`
// hooks: cash (membership), health, and the safehouse rest signal.

export const GYM_VERSION = 1;

export const MEMBERSHIP = { day: 15, week: 60, month: 150 };

export const EXERCISES = [
  {
    id: 'bench', name: 'Bench Press', stat: 'strength', baseGain: 2.2,
    zone: [0.35, 0.65], tempo: 1.1, desc: 'Chest day. The bar does not lie.',
  },
  {
    id: 'squat', name: 'Squat Rack', stat: 'strength', baseGain: 2.6,
    zone: [0.3, 0.6], tempo: 1.3, desc: 'Legs. Nobody skips legs here.',
  },
  {
    id: 'bag', name: 'Heavy Bag', stat: 'strength', baseGain: 1.8,
    zone: [0.4, 0.7], tempo: 0.8, desc: 'Punch the bag. Punch it like it owes you money.',
  },
  {
    id: 'treadmill', name: 'Treadmill', stat: 'stamina', baseGain: 2.4,
    zone: [0.45, 0.75], tempo: 1.0, desc: 'Run until the city blurs.',
  },
  {
    id: 'rope', name: 'Battle Ropes', stat: 'stamina', baseGain: 2.0,
    zone: [0.35, 0.65], tempo: 0.7, desc: 'Waves of pain, in both directions.',
  },
  {
    id: 'bike', name: 'Spin Bike', stat: 'stamina', baseGain: 1.9,
    zone: [0.5, 0.8], tempo: 1.2, desc: 'Pedal nowhere, fast.',
  },
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

export function levelFor(statValue) {
  let current = LEVELS[0];
  for (const l of LEVELS) if (statValue >= l.min) current = l;
  return current;
}

// Punch damage multiplier from strength 0-100.
export function punchMultiplier(strength) {
  return 1 + (strength / 100) * 1.0;
}

// Sprint speed multiplier from stamina 0-100.
export function sprintMultiplier(stamina) {
  return 1 + (stamina / 100) * 0.6;
}

// Health regen per second while resting, from stamina.
export function regenPerSecond(stamina) {
  return 0.4 + (stamina / 100) * 1.6;
}

// Gain for one rep: perfect zone = full gain, near miss = half, miss = 0.
export function repGain(exercise, needle, fatigue) {
  const [lo, hi] = exercise.zone;
  const fatigueMod = Math.max(0.25, 1 - fatigue);
  if (needle >= lo && needle <= hi) return exercise.baseGain * fatigueMod;
  const near = needle >= lo - 0.12 && needle <= hi + 0.12;
  if (near) return exercise.baseGain * 0.5 * fatigueMod;
  return 0;
}

export function createGymSystem(ctx = {}) {
  const state = {
    version: GYM_VERSION,
    memberUntil: 0, // game-day count; 0 = not a member
    strength: 8,
    stamina: 10,
    fatigue: 0, // 0..1, grows with training, decays with rest
    exercise: null, // { id, reps, needle, dir, combo, bestCombo, setsDone }
    totalReps: 0,
    perfectReps: 0,
    workouts: 0,
    personalBests: {}, // exerciseId -> best combo
    sessionsToday: 0,
    log: [],
  };

  function note(msg) {
    state.log.push(msg);
    if (state.log.length > 40) state.log.shift();
    if (typeof ctx.log === 'function') ctx.log(msg);
  }

  function cash() {
    return typeof ctx.getCash === 'function' ? ctx.getCash() : (ctx.cash ?? 0);
  }

  function addCash(amount) {
    if (typeof ctx.addCash === 'function') ctx.addCash(amount);
    else if (typeof ctx.cash === 'number') ctx.cash += amount;
  }

  function dayNow() {
    if (typeof ctx.getDay === 'function') return ctx.getDay();
    return 1;
  }

  function isMember() {
    return state.memberUntil >= dayNow();
  }

  function buyMembership(kind) {
    const cost = MEMBERSHIP[kind];
    if (cost === undefined) return { ok: false, reason: 'unknown-plan' };
    if (cash() < cost) return { ok: false, reason: 'not-enough-cash' };
    addCash(-cost);
    const days = kind === 'day' ? 1 : kind === 'week' ? 7 : 30;
    state.memberUntil = Math.max(dayNow(), state.memberUntil) + days;
    note(`🏋️ Gym membership (${kind}) — $${cost}. Valid until day ${state.memberUntil}.`);
    return { ok: true, until: state.memberUntil };
  }

  function startExercise(id) {
    const ex = exerciseById(id);
    if (!ex) return { ok: false, reason: 'unknown-exercise' };
    if (!isMember()) return { ok: false, reason: 'not-a-member' };
    if (state.exercise) return { ok: false, reason: 'already-training' };
    if (state.fatigue >= 0.95) return { ok: false, reason: 'exhausted' };
    state.exercise = {
      id, reps: 0, needle: 0, dir: 1, combo: 0, bestCombo: 0,
      setsDone: 0, gained: 0,
    };
    note(`🏋️ ${ex.name} — press in the green zone! ${ex.desc}`);
    return { ok: true, exercise: id };
  }

  // Needle sweeps back and forth; the player presses to lock a rep.
  function tick(dt) {
    const ex = state.exercise;
    if (!ex) return;
    const def = exerciseById(ex.id);
    ex.needle += ex.dir * dt * def.tempo;
    if (ex.needle >= 1) { ex.needle = 1; ex.dir = -1; }
    if (ex.needle <= 0) { ex.needle = 0; ex.dir = 1; }
    // Fatigue creeps up while training.
    state.fatigue = Math.min(1, state.fatigue + dt * 0.008);
  }

  function press() {
    const ex = state.exercise;
    if (!ex) return { ok: false, reason: 'not-training' };
    const def = exerciseById(ex.id);
    const gain = repGain(def, ex.needle, state.fatigue);
    ex.reps += 1;
    state.totalReps += 1;
    if (gain > 0) {
      ex.combo += 1;
      ex.bestCombo = Math.max(ex.bestCombo, ex.combo);
      if (gain >= def.baseGain * 0.9) state.perfectReps += 1;
      const comboBonus = 1 + Math.min(0.5, ex.combo * 0.02);
      const total = gain * comboBonus;
      state[def.stat] = Math.min(100, state[def.stat] + total);
      ex.gained += total;
      state.fatigue = Math.min(1, state.fatigue + 0.03);
      if (ex.combo > 0 && ex.combo % 10 === 0) {
        note(`🔥 ${ex.combo} perfect reps in a row! ${def.stat} +${total.toFixed(1)}.`);
      }
      return { ok: true, gain: +total.toFixed(2), combo: ex.combo, stat: def.stat, value: +state[def.stat].toFixed(1) };
    }
    ex.combo = 0;
    state.fatigue = Math.min(1, state.fatigue + 0.02);
    return { ok: true, gain: 0, combo: 0, miss: true };
  }

  function finishSet() {
    const ex = state.exercise;
    if (!ex) return { ok: false, reason: 'not-training' };
    ex.setsDone += 1;
    const best = state.personalBests[ex.id] || 0;
    if (ex.bestCombo > best) {
      state.personalBests[ex.id] = ex.bestCombo;
      note(`🏆 New personal best on ${exerciseById(ex.id).name}: ${ex.bestCombo} combo!`);
    }
    const summary = { exercise: ex.id, reps: ex.reps, gained: +ex.gained.toFixed(1), bestCombo: ex.bestCombo };
    state.exercise = null;
    state.workouts += 1;
    return { ok: true, ...summary };
  }

  function rest(hours = 8) {
    // Sleeping / resting decays fatigue and gives a small stamina bonus.
    state.fatigue = Math.max(0, state.fatigue - hours * 0.12);
    if (hours >= 6) {
      state.stamina = Math.min(100, state.stamina + 0.5);
    }
    return { ok: true, fatigue: +state.fatigue.toFixed(2) };
  }

  function stats() {
    return {
      strength: +state.strength.toFixed(1),
      stamina: +state.stamina.toFixed(1),
      strengthLevel: levelFor(state.strength),
      staminaLevel: levelFor(state.stamina),
      punchMultiplier: +punchMultiplier(state.strength).toFixed(2),
      sprintMultiplier: +sprintMultiplier(state.stamina).toFixed(2),
      regenPerSecond: +regenPerSecond(state.stamina).toFixed(2),
      fatigue: +state.fatigue.toFixed(2),
      member: isMember(),
      memberUntil: state.memberUntil,
      workouts: state.workouts,
      totalReps: state.totalReps,
      perfectReps: state.perfectReps,
    };
  }

  function serialize() {
    return JSON.parse(JSON.stringify({ ...state, exercise: null }));
  }

  function deserialize(data) {
    if (!data || data.version !== GYM_VERSION) return false;
    Object.assign(state, data);
    state.exercise = null;
    return true;
  }

  function hudLine() {
    if (state.exercise) {
      const def = exerciseById(state.exercise.id);
      return `🏋️ ${def.name} — combo ${state.exercise.combo} — ${def.stat} ${state[def.stat].toFixed(0)}`;
    }
    return `🏋️ STR ${state.strength.toFixed(0)} · STA ${state.stamina.toFixed(0)}${isMember() ? ' · member' : ''}`;
  }

  return {
    name: 'gym',
    version: GYM_VERSION,
    state,
    exercises: EXERCISES,
    memberships: MEMBERSHIP,
    buyMembership,
    isMember,
    startExercise,
    tick,
    press,
    finishSet,
    rest,
    stats,
    serialize,
    deserialize,
    hudLine,
  };
}

export default createGymSystem;
