// Solara Nights — Taxi (round 4 attempt 6, NEW module).
// Drive a cab for Solara Bay: pick up fares, drive them to their
// destination, and get paid by the metre plus a tip that depends on
// how smooth the ride was. Passengers rate the ride out of five
// stars; a high rating unlocks VIP fares who pay triple and never
// complain about the route. A low rating gets the player fired from
// the cab company for the day. Passengers have personalities — the
// tourist who wants the scenic route, the businessman in a hurry,
// the nervous granny who hates speed, the drunk who just wants to
// go home — and each one scores the ride differently.
//
// Fares appear near the player; the player drives to the pickup,
// the passenger gets in, and a timer starts. Drive like a maniac
// and the tip evaporates; drive smooth and fast and the stars pile
// up. The module is self-contained and talks to the game only
// through the optional `ctx` hooks: position, speed, cash, and a
// collision feed for the smoothness score.

export const TAXI_VERSION = 1;

export const TAXI_SPOTS = [
  { id: 'plaza', name: 'Central Plaza', x: 0, z: 0 },
  { id: 'hotel', name: 'Palms Hotel', x: 120, z: -220 },
  { id: 'mall', name: 'Solara Mall', x: -40, z: 160 },
  { id: 'airport', name: 'Bay Airfield', x: -280, z: 240 },
  { id: 'pier', name: 'Old Pier', x: 312, z: -40 },
  { id: 'bar', name: 'Neon Palms Bar', x: 180, z: 40 },
  { id: 'station', name: 'Metro Station', x: -160, z: 100 },
  { id: 'hospital', name: 'Bay General', x: 200, z: -120 },
  { id: 'studio', name: 'Vice Studios', x: -140, z: -220 },
  { id: 'beach', name: 'South Beach', x: 306, z: 260 },
];

export const PASSENGER_TYPES = [
  {
    id: 'tourist', name: 'Tourist', patience: 1.3, tipMult: 1.2,
    speedPref: 0.6, desc: 'Wants the scenic route. Tips well for views.',
    lines: ['Is that the bay? Amazing!', 'Take the long way, I am not in a hurry.'],
  },
  {
    id: 'business', name: 'Businessman', patience: 0.7, tipMult: 1.5,
    speedPref: 1.4, desc: 'Late for a meeting. Speed is everything.',
    lines: ['Faster, please. My meeting started ten minutes ago.', 'Do you know a shortcut?'],
  },
  {
    id: 'granny', name: 'Granny', patience: 1.5, tipMult: 0.9,
    speedPref: 0.35, desc: 'Hates speed, loves a gentle ride.',
    lines: ['Slow down, dear, my heart!', 'Such a nice young driver.'],
  },
  {
    id: 'drunk', name: 'Drunk Reveller', patience: 1.0, tipMult: 1.1,
    speedPref: 0.8, desc: 'Just wants to get home. May fall asleep.',
    lines: ['Hic! That was a great night.', 'Zzz… wake me at home.'],
  },
  {
    id: 'vip', name: 'VIP', patience: 0.9, tipMult: 3.0,
    speedPref: 1.1, desc: 'Pays triple. Expects perfection.',
    lines: ['I do not wait. Nobody makes me wait.', 'Impress me.'],
  },
  {
    id: 'student', name: 'Student', patience: 1.1, tipMult: 0.7,
    speedPref: 1.0, desc: 'Broke, but rates honestly.',
    lines: ['Can you drop me at campus?', 'Five stars if you play good music.'],
  },
];

export const FARE_RATE_PER_M = 0.35;
export const BASE_FARE = 8;

export function passengerById(id) {
  return PASSENGER_TYPES.find((p) => p.id === id) || PASSENGER_TYPES[0];
}

export function fareForDistance(dist, passenger) {
  return Math.round(BASE_FARE + dist * FARE_RATE_PER_M * passenger.tipMult);
}

export function tipForRide(fare, smoothness, speedScore, passenger) {
  // smoothness 0..1 (1 = no bumps), speedScore 0..1 (1 = matched preference).
  const quality = smoothness * 0.6 + speedScore * 0.4;
  const tipRate = Math.max(0, quality - 0.35) * 0.8;
  return Math.round(fare * tipRate * passenger.tipMult);
}

export function starsForRide(smoothness, speedScore, onTime) {
  let stars = 1;
  const quality = smoothness * 0.6 + speedScore * 0.4;
  if (quality > 0.85) stars = 5;
  else if (quality > 0.7) stars = 4;
  else if (quality > 0.5) stars = 3;
  else if (quality > 0.35) stars = 2;
  if (!onTime) stars = Math.max(1, stars - 1);
  return stars;
}

export function averageRating(ratings) {
  if (!ratings.length) return 0;
  return ratings.reduce((a, b) => a + b, 0) / ratings.length;
}

export function createTaxiSystem(ctx = {}) {
  const rng = ctx.rng || Math.random;
  const state = {
    version: TAXI_VERSION,
    onShift: false,
    fare: null, // { id, passenger, from, to, dist, fare, phase, timeLeft, bumps, topSpeed, timeInCar }
    offered: null,
    completed: 0,
    failed: 0,
    earned: 0,
    tips: 0,
    ratings: [],
    bestStreak: 0,
    streak: 0,
    firedUntil: 0,
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

  function playerPos() {
    if (typeof ctx.getPlayerPos === 'function') return ctx.getPlayerPos();
    return { x: 0, z: 0 };
  }

  function speedNow() {
    if (typeof ctx.getSpeed === 'function') return ctx.getSpeed();
    return 0;
  }

  function dayNow() {
    if (typeof ctx.getDay === 'function') return ctx.getDay();
    return 1;
  }

  function avgRating() {
    return averageRating(state.ratings);
  }

  function startShift() {
    if (state.onShift) return { ok: false, reason: 'already-on-shift' };
    if (dayNow() < state.firedUntil) {
      return { ok: false, reason: 'fired', until: state.firedUntil };
    }
    state.onShift = true;
    offerFare();
    note('🚕 Shift started. Pick up fares, drive smooth, earn stars.');
    return { ok: true };
  }

  function endShift() {
    if (!state.onShift) return { ok: false, reason: 'not-on-shift' };
    state.onShift = false;
    state.fare = null;
    state.offered = null;
    note(`🚕 Shift over. ${state.completed} fares, $${state.earned} earned, rating ${avgRating().toFixed(1)}★.`);
    return { ok: true, earned: state.earned };
  }

  function pickSpot(excludeId) {
    const pool = TAXI_SPOTS.filter((s) => s.id !== excludeId);
    return pool[Math.floor(rng() * pool.length)];
  }

  function offerFare() {
    if (!state.onShift) return { ok: false, reason: 'not-on-shift' };
    const vipUnlocked = avgRating() >= 4.5 && state.completed >= 5;
    const pool = vipUnlocked
      ? PASSENGER_TYPES
      : PASSENGER_TYPES.filter((p) => p.id !== 'vip' || rng() < 0.05);
    const passenger = pool[Math.floor(rng() * pool.length)];
    const from = pickSpot(null);
    const to = pickSpot(from.id);
    const dist = Math.hypot(from.x - to.x, from.z - to.z);
    const fare = fareForDistance(dist, passenger);
    state.offered = {
      id: `fare-${state.completed + state.failed + 1}`,
      passenger, from, to, dist: Math.round(dist), fare,
      deadline: Math.round(20 + dist / 12 * passenger.patience),
    };
    return { ok: true, offered: state.offered };
  }

  function acceptFare() {
    if (!state.offered) return { ok: false, reason: 'no-offer' };
    if (state.fare) return { ok: false, reason: 'fare-active' };
    state.fare = {
      ...state.offered, phase: 'pickup',
      timeLeft: state.offered.deadline, bumps: 0,
      topSpeed: 0, timeInCar: 0, maxSpeedSeen: 0,
    };
    state.offered = null;
    const p = state.fare.passenger;
    note(`🚕 Fare: ${p.name} at ${state.fare.from.name} → ${state.fare.to.name}. Fare $${state.fare.fare}. "${p.lines[0]}"`);
    return { ok: true, fare: state.fare };
  }

  function declineFare() {
    state.offered = null;
    return offerFare();
  }

  function nearSpot(spot, radius = 8) {
    const p = playerPos();
    return Math.hypot(p.x - spot.x, p.z - spot.z) <= radius;
  }

  function reportBump(severity = 1) {
    if (!state.fare) return;
    state.fare.bumps += severity;
  }

  function tick(dt) {
    const fare = state.fare;
    if (!fare) return;
    fare.timeLeft -= dt;
    const speed = speedNow();
    fare.maxSpeedSeen = Math.max(fare.maxSpeedSeen, speed);
    if (fare.phase === 'pickup' && nearSpot(fare.from)) {
      fare.phase = 'ride';
      fare.timeLeft = fare.deadline;
      note(`🚕 ${fare.passenger.name} is in. Drive to ${fare.to.name}!`);
      if (typeof ctx.onPickup === 'function') ctx.onPickup(fare);
    } else if (fare.phase === 'ride') {
      fare.timeInCar += dt;
      if (nearSpot(fare.to)) {
        completeFare(true);
        return;
      }
    }
    if (fare.timeLeft <= 0) failFare('too-slow');
  }

  function completeFare(onTime) {
    const fare = state.fare;
    state.fare = null;
    const smoothness = Math.max(0, 1 - fare.bumps * 0.12);
    const ideal = 12 * fare.passenger.speedPref;
    const speedScore = Math.max(0, 1 - Math.abs(fare.maxSpeedSeen - ideal) / Math.max(ideal, 8));
    const tip = tipForRide(fare.fare, smoothness, speedScore, fare.passenger);
    const stars = starsForRide(smoothness, speedScore, onTime);
    const total = fare.fare + tip;
    state.completed += 1;
    state.earned += total;
    state.tips += tip;
    state.ratings.push(stars);
    if (state.ratings.length > 20) state.ratings.shift();
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    addCash(total);
    note(`🚕 Dropped off ${fare.passenger.name}: fare $${fare.fare} + tip $${tip} = $${total}. Rated ${stars}★ (avg ${avgRating().toFixed(1)}★).`);
    if (avgRating() < 2.5 && state.ratings.length >= 5) {
      state.firedUntil = dayNow() + 1;
      state.onShift = false;
      note('🚕 FIRED! Rating fell below 2.5★. Come back tomorrow.');
    }
    if (typeof ctx.onFareComplete === 'function') ctx.onFareComplete(fare, total, stars);
    if (state.onShift) offerFare();
    return { ok: true, total, tip, stars, rating: avgRating() };
  }

  function failFare(reason) {
    const fare = state.fare;
    state.fare = null;
    state.failed += 1;
    state.streak = 0;
    state.ratings.push(1);
    if (state.ratings.length > 20) state.ratings.shift();
    note(`🚕 Fare failed (${reason}). ${fare ? fare.passenger.name : ''} left angry. 1★.`);
    if (state.onShift) offerFare();
    return { ok: false, reason };
  }

  function cancelFare() {
    if (!state.fare) return { ok: false, reason: 'no-fare' };
    return failFare('cancelled');
  }

  function stats() {
    return {
      onShift: state.onShift,
      completed: state.completed,
      failed: state.failed,
      earned: state.earned,
      tips: state.tips,
      rating: +avgRating().toFixed(2),
      streak: state.streak,
      bestStreak: state.bestStreak,
      active: !!state.fare,
    };
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(data) {
    if (!data || data.version !== TAXI_VERSION) return false;
    Object.assign(state, data);
    return true;
  }

  function hudLine() {
    if (state.fare) {
      const f = state.fare;
      const target = f.phase === 'pickup' ? f.from.name : f.to.name;
      return `🚕 ${f.phase === 'pickup' ? 'PICKUP' : 'DROP'} ${f.passenger.name} → ${target} — ${Math.max(0, Math.ceil(f.timeLeft))}s — $${f.fare}`;
    }
    if (state.offered) return `🚕 Fare offered: ${state.offered.passenger.name} → ${state.offered.to.name} — $${state.offered.fare}`;
    if (state.onShift) return '🚕 On shift — waiting for fares';
    return '';
  }

  return {
    name: 'taxi',
    version: TAXI_VERSION,
    state,
    spots: TAXI_SPOTS,
    passengers: PASSENGER_TYPES,
    startShift,
    endShift,
    offerFare,
    acceptFare,
    declineFare,
    tick,
    reportBump,
    cancelFare,
    stats,
    serialize,
    deserialize,
    hudLine,
  };
}

export default createTaxiSystem;
