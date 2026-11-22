// Solara Nights — Stunts (round 4 attempt 6, NEW module).
// Stunt jumps, airtime and rotation scoring for Solara Bay's daredevils.
// The city hides stunt ramps; launch off one at speed, and the system
// scores the jump on four axes: airtime, distance, rotation (flips and
// spins), and landing quality. A clean landing banks the points; a bad
// landing wrecks the car and pays nothing. Chain clean jumps without
// crashing to grow a multiplier, and beat the local leaderboard — the
// board remembers the best jump per ramp and the best overall run.
//
// The scoring is deliberately transparent: every jump produces a full
// breakdown (airtime points, distance points, rotation points, landing
// bonus, multiplier) so the HUD can show the player exactly what the
// jump was worth. The module is self-contained and talks to the game
// only through the optional `ctx` hooks.

export const STUNT_VERSION = 1;

export const STUNT_RAMPS = [
  { id: 'pier-ramp', name: 'Pier Launch', x: 300, z: -40, dir: -1, minSpeed: 22, par: 1200 },
  { id: 'mall-ramp', name: 'Mall Roof Gap', x: -40, z: 150, dir: 1, minSpeed: 24, par: 1500 },
  { id: 'canal-ramp', name: 'Canal Jump', x: 290, z: 170, dir: -1, minSpeed: 20, par: 1000 },
  { id: 'airport-ramp', name: 'Airfield Kicker', x: -280, z: 230, dir: 1, minSpeed: 26, par: 1800 },
  { id: 'plaza-ramp', name: 'Plaza Steps', x: 10, z: 10, dir: -1, minSpeed: 18, par: 800 },
  { id: 'beach-ramp', name: 'Dune Blaster', x: 300, z: 250, dir: 1, minSpeed: 22, par: 1300 },
];

export const LANDINGS = [
  { id: 'perfect', label: 'PERFECT LANDING', min: 0.9, mult: 1.5 },
  { id: 'clean', label: 'Clean Landing', min: 0.7, mult: 1.2 },
  { id: 'rough', label: 'Rough Landing', min: 0.45, mult: 0.8 },
  { id: 'crash', label: 'CRASH', min: 0, mult: 0 },
];

export function landingFor(quality) {
  for (const l of LANDINGS) if (quality >= l.min) return l;
  return LANDINGS[LANDINGS.length - 1];
}

export function nearestRamp(x, z, maxDist = 10) {
  let best = null;
  let bestD = maxDist;
  for (const ramp of STUNT_RAMPS) {
    const d = Math.hypot(ramp.x - x, ramp.z - z);
    if (d < bestD) { bestD = d; best = ramp; }
  }
  return best;
}

// Pure scoring: given jump physics, return the full breakdown.
export function scoreJump({ airtime, distance, flips, spins, landingQuality, speed, multiplier = 1 }) {
  const airPoints = Math.round(airtime * 220);
  const distPoints = Math.round(distance * 9);
  const flipPoints = Math.round(flips * 350);
  const spinPoints = Math.round(spins * 200);
  const speedBonus = speed >= 30 ? 150 : speed >= 25 ? 75 : 0;
  const landing = landingFor(landingQuality);
  const subtotal = airPoints + distPoints + flipPoints + spinPoints + speedBonus;
  const total = Math.round(subtotal * landing.mult * multiplier);
  return {
    airPoints, distPoints, flipPoints, spinPoints, speedBonus,
    landing: landing.id, landingLabel: landing.label, landingMult: landing.mult,
    subtotal, multiplier, total, banked: landing.mult > 0,
  };
}

export function gradeFor(total) {
  if (total >= 4000) return 'S';
  if (total >= 2500) return 'A';
  if (total >= 1500) return 'B';
  if (total >= 800) return 'C';
  return 'D';
}

export function createStuntSystem(ctx = {}) {
  const rng = ctx.rng || Math.random;
  const state = {
    version: STUNT_VERSION,
    airborne: false,
    jump: null, // { ramp, startX, startZ, startTime, airtime, distance, flips, spins, speed }
    score: 0,
    bestJump: 0,
    bestRun: 0,
    runScore: 0,
    multiplier: 1,
    chain: 0,
    jumps: 0,
    perfectLandings: 0,
    crashes: 0,
    rampBests: {}, // rampId -> best total
    leaderboard: [], // { ramp, total, grade, airtime, distance, when }
    lastScore: null,
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

  function speedNow() {
    if (typeof ctx.getSpeed === 'function') return ctx.getSpeed();
    return 0;
  }

  function playerPos() {
    if (typeof ctx.getPlayerPos === 'function') return ctx.getPlayerPos();
    return { x: 0, z: 0 };
  }

  function isAirborne() {
    if (typeof ctx.isAirborne === 'function') return ctx.isAirborne();
    return state.airborne;
  }

  // Called by main.js when the car leaves a ramp (or any jump start).
  function startJump(ramp) {
    const p = playerPos();
    state.airborne = true;
    state.jump = {
      ramp: ramp ? ramp.id : 'wild',
      rampName: ramp ? ramp.name : 'Wild Jump',
      startX: p.x, startZ: p.z,
      startTime: typeof ctx.now === 'function' ? ctx.now() : Date.now(),
      airtime: 0, distance: 0, flips: 0, spins: 0,
      speed: speedNow(),
    };
    return { ok: true, ramp: state.jump.rampName };
  }

  function addRotation(flips, spins) {
    if (!state.jump) return;
    state.jump.flips += flips;
    state.jump.spins += spins;
  }

  // Called every frame while airborne; landing is detected by main.js.
  function tickAir(dt) {
    if (!state.jump) return;
    state.jump.airtime += dt;
    const p = playerPos();
    state.jump.distance = Math.hypot(p.x - state.jump.startX, p.z - state.jump.startZ);
    // Style bonus: holding rotation in the air adds flair points later.
  }

  // Called by main.js on landing. landingQuality 0..1 (1 = wheels down flat).
  function land(landingQuality) {
    if (!state.jump) return { ok: false, reason: 'not-airborne' };
    const j = state.jump;
    const breakdown = scoreJump({
      airtime: j.airtime,
      distance: j.distance,
      flips: Math.floor(j.flips),
      spins: Math.floor(j.spins),
      landingQuality,
      speed: j.speed,
      multiplier: state.multiplier,
    });
    state.airborne = false;
    state.jump = null;
    state.jumps += 1;
    state.lastScore = { ...breakdown, ramp: j.ramp, rampName: j.rampName, grade: gradeFor(breakdown.total) };
    if (breakdown.banked) {
      state.score += breakdown.total;
      state.runScore += breakdown.total;
      state.chain += 1;
      state.multiplier = Math.min(4, 1 + state.chain * 0.25);
      state.bestJump = Math.max(state.bestJump, breakdown.total);
      state.bestRun = Math.max(state.bestRun, state.runScore);
      if (breakdown.landing === 'perfect') state.perfectLandings += 1;
      const prev = state.rampBests[j.ramp] || 0;
      if (breakdown.total > prev && breakdown.total > 0) {
        state.rampBests[j.ramp] = breakdown.total;
        note(`🏆 New best on ${j.rampName}: ${breakdown.total} pts (${state.lastScore.grade})!`);
      } else {
        note(`🛫 ${j.rampName}: ${breakdown.total} pts (${state.lastScore.grade}) — ${breakdown.landingLabel}. Chain x${state.multiplier.toFixed(2)}.`);
      }
      if (breakdown.total > 0) {
        state.leaderboard.push({
          ramp: j.ramp, rampName: j.rampName, total: breakdown.total,
          grade: state.lastScore.grade, airtime: +j.airtime.toFixed(2),
          distance: Math.round(j.distance), when: Date.now(),
        });
        state.leaderboard.sort((a, b) => b.total - a.total);
        state.leaderboard = state.leaderboard.slice(0, 10);
      }
      // Cash prize for beating the ramp par.
      const ramp = STUNT_RAMPS.find((r) => r.id === j.ramp);
      if (ramp && breakdown.total >= ramp.par) {
        const prize = Math.round(breakdown.total * 0.02);
        addCash(prize);
        note(`💰 Beat the ${ramp.name} par (${ramp.par}) — prize $${prize}.`);
      }
      if (typeof ctx.onStunt === 'function') ctx.onStunt(state.lastScore);
    } else {
      state.crashes += 1;
      state.chain = 0;
      state.multiplier = 1;
      state.runScore = 0;
      note(`💥 CRASH on ${j.rampName} — ${breakdown.subtotal} pts lost. Chain reset.`);
      if (typeof ctx.onCrash === 'function') ctx.onCrash(j);
    }
    return { ok: true, ...state.lastScore };
  }

  function resetRun() {
    state.runScore = 0;
    state.chain = 0;
    state.multiplier = 1;
  }

  function stats() {
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
  }

  function serialize() {
    const { jump, airborne, ...rest } = state;
    return JSON.parse(JSON.stringify(rest));
  }

  function deserialize(data) {
    if (!data || data.version !== STUNT_VERSION) return false;
    Object.assign(state, data);
    state.jump = null;
    state.airborne = false;
    return true;
  }

  function hudLine() {
    if (state.jump) {
      return `🛫 AIRBORNE ${state.jump.airtime.toFixed(1)}s — ${Math.round(state.jump.distance)}m — flips ${Math.floor(state.jump.flips)}`;
    }
    if (state.lastScore) return `🛫 Last jump: ${state.lastScore.total} pts (${state.lastScore.grade}) — chain x${state.multiplier.toFixed(2)}`;
    return '';
  }

  return {
    name: 'stunt',
    version: STUNT_VERSION,
    state,
    ramps: STUNT_RAMPS,
    startJump,
    addRotation,
    tickAir,
    land,
    resetRun,
    stats,
    serialize,
    deserialize,
    hudLine,
  };
}

export default createStuntSystem;
