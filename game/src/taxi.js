export const TAXI_VERSION = 1;
export const FARE_RATE_PER_M = 0.35;
export const BASE_FARE = 8;

export const TAXI_SPOTS = [
  { id: 'plaza', name: 'Plaza', x: 0, z: 0 },
  { id: 'hotel', name: 'Grand Hotel', x: 45, z: -60 },
  { id: 'mall', name: 'Solara Mall', x: -70, z: 30 },
  { id: 'airport', name: 'Airport', x: 200, z: -180 },
  { id: 'pier', name: 'Old Pier', x: -120, z: 210 },
  { id: 'bar', name: 'Neon Bar', x: 80, z: 90 },
  { id: 'station', name: 'Train Station', x: -40, z: -120 },
  { id: 'hospital', name: 'Hospital', x: 110, z: -30 },
  { id: 'studio', name: 'Film Studio', x: -150, z: -90 },
  { id: 'beach', name: 'Beach', x: 180, z: 150 },
];

export const PASSENGER_TYPES = [
  { id: 'tourist', name: 'Tourist', patience: 1.0, tipMult: 1.2, speedPref: 0.9, desc: 'Snapping photos of everything.', lines: ['Take the scenic route!', 'Wow, this city is beautiful!'] },
  { id: 'businessman', name: 'Businessman', patience: 0.7, tipMult: 1.5, speedPref: 1.2, desc: 'Late for a meeting, as always.', lines: ['Step on it, I am late.', 'Time is money, driver.'] },
  { id: 'granny', name: 'Granny', patience: 1.4, tipMult: 0.9, speedPref: 0.6, desc: 'In no rush at all.', lines: ['No hurry, dear.', 'Mind the bumps, my back!'] },
  { id: 'drunk', name: 'Drunk Reveller', patience: 0.9, tipMult: 1.1, speedPref: 1.0, desc: 'Singing along to nothing.', lines: ['To the next bar!', 'You are my best friend, driver.'] },
  { id: 'vip', name: 'VIP', patience: 0.8, tipMult: 3.0, speedPref: 1.1, desc: 'Expects the best, pays for it.', lines: ['Discretion, please.', 'Make it smooth.'] },
  { id: 'student', name: 'Student', patience: 1.2, tipMult: 0.7, speedPref: 0.8, desc: 'Counting every coin.', lines: ['Cheapest route, please.', 'Can we stop for a snack?'] },
];

export function passengerById(id) {
  return PASSENGER_TYPES.find((p) => p.id === id) || PASSENGER_TYPES[0];
}

export function fareForDistance(distance, passenger) {
  const p = passenger || PASSENGER_TYPES[0];
  return Math.round(BASE_FARE + distance * FARE_RATE_PER_M * p.tipMult);
}

export function tipForRide(fare, smoothness, speedScore, passenger) {
  const p = passenger || PASSENGER_TYPES[0];
  const quality = smoothness * 0.6 + speedScore * 0.4;
  const rate = quality > 0.35 ? (quality - 0.35) * 0.8 : 0;
  return Math.round(fare * rate * (p.tipMult || 1));
}

export function starsForRide(smoothness, speedScore, late) {
  const quality = smoothness * 0.6 + speedScore * 0.4;
  let stars = 1;
  if (quality > 0.85) stars = 5;
  else if (quality > 0.7) stars = 4;
  else if (quality > 0.5) stars = 3;
  else if (quality > 0.35) stars = 2;
  if (late) stars -= 1;
  return Math.max(1, stars);
}

export function averageRating(ratings) {
  if (!ratings || ratings.length === 0) return 0;
  return ratings.reduce((a, b) => a + b, 0) / ratings.length;
}

function clone(v) {
  return JSON.parse(JSON.stringify(v));
}

export function createTaxiSystem(ctx = {}) {
  const c = ctx || {};
  const roll = typeof c.rng === 'function' ? c.rng : () => Math.random();

  const state = {
    version: TAXI_VERSION,
    onShift: false,
    offer: null,
    fare: null,
    completed: 0,
    failed: 0,
    earned: 0,
    tips: 0,
    ratings: [],
    streak: 0,
    bestStreak: 0,
    firedUntilDay: -1,
    offerSeq: 0,
  };

  function say(msg) {
    if (typeof c.log === 'function') c.log(msg);
  }

  function dayNow() {
    return typeof c.getDay === 'function' ? c.getDay() : 0;
  }

  function posNow() {
    if (typeof c.getPlayerPos === 'function') return c.getPlayerPos();
    return { x: 0, z: 0 };
  }

  function speedNow() {
    return typeof c.getSpeed === 'function' ? c.getSpeed() : 0;
  }

  function pickSpot(except) {
    let s = TAXI_SPOTS[Math.floor(roll() * TAXI_SPOTS.length)];
    let guard = 0;
    while (except && s.id === except.id && guard < 10) {
      s = TAXI_SPOTS[Math.floor(roll() * TAXI_SPOTS.length)];
      guard += 1;
    }
    return s;
  }

  function failFare(reason) {
    const f = state.fare;
    state.fare = null;
    state.failed += 1;
    state.streak = 0;
    state.ratings.push(1);
    if (state.ratings.length > 20) state.ratings.shift();
    say(`Fare failed: ${reason}.`);
    if (averageRating(state.ratings) < 2.5 && state.ratings.length >= 5) {
      state.firedUntilDay = dayNow() + 1;
      state.onShift = false;
      state.offer = null;
      say('Fired! Low rating. Come back tomorrow.');
    }
    return { ok: false, reason, fare: f };
  }

  const sys = {
    name: 'Taxi',
    version: TAXI_VERSION,
    state,
    spots: TAXI_SPOTS,
    passengers: PASSENGER_TYPES,

    startShift() {
      if (state.onShift) return { ok: false, reason: 'already-on-shift' };
      if (dayNow() < state.firedUntilDay) return { ok: false, reason: 'fired', firedUntilDay: state.firedUntilDay };
      state.onShift = true;
      say('Shift started. Looking for fares.');
      const offered = sys.offerFare();
      return { ok: true, offer: offered.ok ? offered.offer : null };
    },

    endShift() {
      if (!state.onShift) return { ok: false, reason: 'not-on-shift' };
      state.onShift = false;
      state.fare = null;
      state.offer = null;
      say(`Shift over. Earned $${state.earned}, rating ${averageRating(state.ratings).toFixed(2)}.`);
      return { ok: true, earned: state.earned, rating: averageRating(state.ratings) };
    },

    offerFare() {
      if (!state.onShift) return { ok: false, reason: 'not-on-shift' };
      const avg = averageRating(state.ratings);
      const vipUnlocked = avg >= 4.5 && state.completed >= 5;
      let passenger;
      if (vipUnlocked || roll() < 0.05) {
        passenger = passengerById('vip');
      } else {
        const pool = PASSENGER_TYPES.filter((p) => p.id !== 'vip');
        passenger = pool[Math.floor(roll() * pool.length)];
      }
      const from = pickSpot(null);
      const to = pickSpot(from);
      const distance = Math.round(Math.hypot(to.x - from.x, to.z - from.z));
      const fare = fareForDistance(distance, passenger);
      state.offerSeq += 1;
      state.offer = {
        id: state.offerSeq,
        passenger: passenger.id,
        passengerName: passenger.name,
        from, to,
        distance,
        fare,
        deadline: 20 + (distance / 12) * passenger.patience,
      };
      return { ok: true, offer: clone(state.offer) };
    },

    acceptFare() {
      if (!state.offer) return { ok: false, reason: 'no-offer' };
      if (state.fare) return { ok: false, reason: 'fare-active' };
      const offer = state.offer;
      state.offer = null;
      state.fare = {
        ...clone(offer),
        phase: 'pickup',
        timeLeft: offer.deadline,
        bumps: 0,
        topSpeed: 0,
        timeInCar: 0,
        maxSpeed: 0,
      };
      const p = passengerById(offer.passenger);
      say(`${p.name}: "${p.lines[0]}"`);
      return { ok: true, fare: clone(state.fare) };
    },

    declineFare() {
      state.offer = null;
      return sys.offerFare();
    },

    tick(dt) {
      const step = Number(dt) || 0;
      const f = state.fare;
      if (!f) return;
      f.timeLeft -= step;
      const spd = speedNow();
      if (spd > f.maxSpeed) f.maxSpeed = spd;
      if (spd > f.topSpeed) f.topSpeed = spd;
      const pos = posNow();
      const target = f.phase === 'pickup' ? f.from : f.to;
      const d = Math.hypot(target.x - pos.x, target.z - pos.z);
      if (f.phase === 'pickup' && d < 8) {
        f.phase = 'ride';
        f.timeLeft = 20 + (f.distance / 12) * passengerById(f.passenger).patience;
        if (typeof c.onPickup === 'function') c.onPickup(f);
        say('Passenger picked up.');
        return;
      }
      if (f.phase === 'ride') {
        f.timeInCar += step;
        if (d < 8) {
          const passenger = passengerById(f.passenger);
          const smoothness = Math.max(0, 1 - f.bumps * 0.12);
          const ideal = 12 * passenger.speedPref;
          const gap = Math.abs(f.maxSpeed - ideal);
          const speedScore = Math.max(0, 1 - gap / 20);
          const tip = tipForRide(f.fare, smoothness, speedScore, passenger);
          const late = f.timeLeft < 0;
          const stars = starsForRide(smoothness, speedScore, late);
          const total = f.fare + tip;
          if (typeof c.addCash === 'function') c.addCash(total);
          else if (typeof c.cash === 'number') c.cash += total;
          state.earned += total;
          state.tips += tip;
          state.completed += 1;
          state.streak += 1;
          if (state.streak > state.bestStreak) state.bestStreak = state.streak;
          state.ratings.push(stars);
          if (state.ratings.length > 20) state.ratings.shift();
          state.fare = null;
          if (typeof c.onFareComplete === 'function') c.onFareComplete({ fare: f.fare, tip, stars, total });
          say(`Fare complete: $${total} (tip $${tip}), ${stars} stars.`);
          if (averageRating(state.ratings) < 2.5 && state.ratings.length >= 5) {
            state.firedUntilDay = dayNow() + 1;
            state.onShift = false;
            state.offer = null;
            say('Fired! Low rating. Come back tomorrow.');
          }
          return;
        }
      }
      if (f.timeLeft <= 0) {
        failFare('too-slow');
      }
    },

    reportBump(severity = 1) {
      if (!state.fare) return;
      state.fare.bumps += severity;
    },

    cancelFare() {
      if (!state.fare) return { ok: false, reason: 'no-fare' };
      return failFare('cancelled');
    },

    stats() {
      return {
        onShift: state.onShift,
        completed: state.completed,
        failed: state.failed,
        earned: state.earned,
        tips: state.tips,
        rating: Math.round(averageRating(state.ratings) * 100) / 100,
        streak: state.streak,
        bestStreak: state.bestStreak,
        active: !!state.fare,
        hasFare: !!state.fare,
      };
    },

    serialize() { return clone(state); },

    deserialize(input) {
      if (!input || typeof input !== 'object') return false;
      if (input.version !== TAXI_VERSION) return false;
      Object.keys(input).forEach((k) => { state[k] = clone(input[k]); });
      return true;
    },

    hudLine() {
      if (state.fare) {
        const f = state.fare;
        const target = f.phase === 'pickup' ? f.from : f.to;
        const label = f.phase === 'pickup' ? 'Pickup' : 'Drop off';
        return `${label} ${f.passengerName} at ${target.name} · ${Math.max(0, Math.ceil(f.timeLeft))}s · $${f.fare}`;
      }
      if (state.offer) {
        return `Fare offered: ${state.offer.passengerName} ${state.offer.from.name} → ${state.offer.to.name} · $${state.offer.fare}`;
      }
      if (state.onShift) return 'Taxi: on shift, waiting for fares…';
      return '';
    },
  };

  return sys;
}

export default createTaxiSystem;
