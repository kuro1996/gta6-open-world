export const STUNT_VERSION = 1;

export const STUNT_RAMPS = [
  { id: 'pier', name: 'Pier Launch', x: 300, z: -40, direction: -1, minSpeed: 22, par: 1200 },
  { id: 'mall', name: 'Mall Roof Gap', x: -40, z: 150, direction: 1, minSpeed: 24, par: 1500 },
  { id: 'canal', name: 'Canal Jump', x: 290, z: 170, direction: -1, minSpeed: 20, par: 1000 },
  { id: 'airfield', name: 'Airfield Kicker', x: -280, z: 230, direction: 1, minSpeed: 26, par: 1800 },
  { id: 'plaza', name: 'Plaza Steps', x: 10, z: 10, direction: -1, minSpeed: 18, par: 800 },
  { id: 'dune', name: 'Dune Blaster', x: 300, z: 250, direction: 1, minSpeed: 22, par: 1300 },
];

export const LANDINGS = [
  { id: 'perfect', label: 'PERFECT LANDING', min: 0.9, mult: 1.5 },
  { id: 'clean', label: 'Clean Landing', min: 0.7, mult: 1.2 },
  { id: 'rough', label: 'Rough Landing', min: 0.45, mult: 0.8 },
  { id: 'crash', label: 'CRASH', min: 0, mult: 0 },
];

export function landingFor(quality) {
  for (const l of LANDINGS) {
    if (quality >= l.min) return l;
  }
  return LANDINGS[LANDINGS.length - 1];
}

export function nearestRamp(x, z, maxDist) {
  const limit = maxDist === undefined ? 10 : maxDist;
  let best = null;
  let bestD = limit;
  for (const r of STUNT_RAMPS) {
    const d = Math.hypot(r.x - x, r.z - z);
    if (d <= bestD) {
      bestD = d;
      best = r;
    }
  }
  return best;
}

export function scoreJump(input) {
  const mult = input.multiplier === undefined ? 1 : input.multiplier;
  const airPoints = Math.round(input.airtime * 220);
  const distPoints = Math.round(input.distance * 9);
  const flipPoints = Math.round(input.flips * 350);
  const spinPoints = Math.round(input.spins * 200);
  let speedBonus = 0;
  if (input.speed >= 30) speedBonus = 150;
  else if (input.speed >= 25) speedBonus = 75;
  const landing = landingFor(input.landingQuality);
  const subtotal = airPoints + distPoints + flipPoints + spinPoints + speedBonus;
  const total = Math.round(subtotal * landing.mult * mult);
  return {
    airPoints,
    distPoints,
    flipPoints,
    spinPoints,
    speedBonus,
    landing: landing.id,
    landingLabel: landing.label,
    landingMult: landing.mult,
    subtotal,
    multiplier: mult,
    total,
    banked: landing.mult > 0,
  };
}

export function gradeFor(total) {
  if (total >= 4000) return 'S';
  if (total >= 2500) return 'A';
  if (total >= 1500) return 'B';
  if (total >= 800) return 'C';
  return 'D';
}

export function createStuntSystem(ctx) {
  const c = ctx || {};
  const rng = c.rng;
  void rng;
  const state = {
    version: STUNT_VERSION,
    airborne: false,
    jump: null,
    score: 0,
    bestJump: 0,
    bestRun: 0,
    runScore: 0,
    multiplier: 1,
    chain: 0,
    jumps: 0,
    perfectLandings: 0,
    crashes: 0,
    rampBests: {},
    leaderboard: [],
    lastScore: null,
    log: [],
  };

  function note(msg) {
    state.log.push(msg);
    if (state.log.length > 40) state.log.shift();
    if (typeof c.log === 'function') c.log(msg);
  }
  function cashIn(amount) {
    if (typeof c.addCash === 'function') c.addCash(amount);
    else if (typeof c.cash === 'number') c.cash += amount;
  }
  function posNow() {
    if (typeof c.getPlayerPos === 'function') return c.getPlayerPos();
    return { x: 0, y: 0, z: 0 };
  }
  function speedNow() {
    return typeof c.getSpeed === 'function' ? c.getSpeed() : 0;
  }
  function nowMs() {
    return typeof c.now === 'function' ? c.now() : Date.now();
  }

  const sys = {
    name: 'stunt',
    version: STUNT_VERSION,
    state,
    ramps: STUNT_RAMPS,

    startJump(ramp) {
      const p = posNow();
      const r = ramp || null;
      state.airborne = true;
      state.jump = {
        ramp: r ? r.id : 'wild',
        rampName: r ? r.name : 'Wild Jump',
        startX: p.x || 0,
        startZ: p.z || 0,
        startTime: nowMs(),
        airtime: 0,
        distance: 0,
        flips: 0,
        spins: 0,
        speed: speedNow(),
      };
      return { ok: true, ramp: state.jump.rampName };
    },

    addRotation(flips, spins) {
      if (!state.jump) return;
      state.jump.flips += flips || 0;
      state.jump.spins += spins || 0;
    },

    tickAir(dt) {
      if (!state.jump) return;
      state.jump.airtime += dt;
      const p = posNow();
      state.jump.distance = Math.hypot((p.x || 0) - state.jump.startX, (p.z || 0) - state.jump.startZ);
    },

    land(quality) {
      if (!state.jump || !state.airborne) return { ok: false, reason: 'not-airborne' };
      const jump = state.jump;
      const breakdown = scoreJump({
        airtime: jump.airtime,
        distance: jump.distance,
        flips: Math.floor(jump.flips),
        spins: Math.floor(jump.spins),
        landingQuality: quality,
        speed: jump.speed,
        multiplier: state.multiplier,
      });
      state.airborne = false;
      state.jump = null;
      state.jumps += 1;
      const record = Object.assign({}, breakdown, {
        ramp: jump.ramp,
        rampName: jump.rampName,
        grade: gradeFor(breakdown.total),
      });
      state.lastScore = record;
      if (breakdown.banked) {
        state.score += breakdown.total;
        state.runScore += breakdown.total;
        state.chain += 1;
        state.multiplier = Math.min(4, 1 + state.chain * 0.25);
        if (breakdown.total > state.bestJump) state.bestJump = breakdown.total;
        if (state.runScore > state.bestRun) state.bestRun = state.runScore;
        if (breakdown.landing === 'perfect') state.perfectLandings += 1;
        const prevBest = state.rampBests[jump.ramp] || 0;
        if (breakdown.total > prevBest) state.rampBests[jump.ramp] = breakdown.total;
        state.leaderboard.push({
          ramp: jump.ramp,
          rampName: jump.rampName,
          total: breakdown.total,
          grade: record.grade,
          airtime: Math.round(jump.airtime * 100) / 100,
          distance: Math.round(jump.distance),
          when: nowMs(),
        });
        state.leaderboard.sort((a, b) => b.total - a.total);
        if (state.leaderboard.length > 10) state.leaderboard.length = 10;
        const rampDef = STUNT_RAMPS.find((r) => r.id === jump.ramp);
        if (rampDef && breakdown.total >= rampDef.par) {
          const prize = Math.round(breakdown.total * 0.02);
          cashIn(prize);
          note('Beat the ' + rampDef.name + ' par! Prize $' + prize + '.');
        }
        if (typeof c.onStunt === 'function') c.onStunt(record);
        note('Landed ' + jump.rampName + ': ' + breakdown.total + ' pts (' + record.grade + ').');
        return Object.assign({ ok: true }, record);
      }
      state.crashes += 1;
      state.chain = 0;
      state.multiplier = 1;
      state.runScore = 0;
      note('Crashed the landing on ' + jump.rampName + ' — ' + breakdown.total + ' pts lost.');
      if (typeof c.onCrash === 'function') c.onCrash(record);
      return Object.assign({ ok: true }, record);
    },

    resetRun() {
      state.runScore = 0;
      state.chain = 0;
      state.multiplier = 1;
    },

    stats() {
      return {
        score: state.score,
        bestJump: state.bestJump,
        bestRun: state.bestRun,
        jumps: state.jumps,
        perfectLandings: state.perfectLandings,
        crashes: state.crashes,
        chain: state.chain,
        multiplier: state.multiplier,
        rampsBeaten: Object.keys(state.rampBests).length,
        leaderboard: state.leaderboard.slice(0, 5),
      };
    },

    serialize() {
      const copy = JSON.parse(JSON.stringify(state));
      delete copy.jump;
      delete copy.airborne;
      return copy;
    },

    deserialize(data) {
      if (!data || data.version !== STUNT_VERSION) return false;
      const copy = JSON.parse(JSON.stringify(data));
      for (const k of Object.keys(state)) delete state[k];
      Object.assign(state, copy);
      state.jump = null;
      state.airborne = false;
      return true;
    },

    hudLine() {
      if (state.jump) {
        return 'AIRBORNE ' + state.jump.airtime.toFixed(1) + 's | ' + Math.round(state.jump.distance) + 'm | ' + Math.floor(state.jump.flips) + ' flips';
      }
      if (state.lastScore) {
        return 'STUNT ' + state.lastScore.total + ' pts (' + state.lastScore.grade + ') x' + state.multiplier.toFixed(2);
      }
      return '';
    },
  };
  return sys;
}

export default createStuntSystem;
