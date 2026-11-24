export const DELIVERY_VERSION = 1;

export const DELIVERY_SPOTS = [
  { id: 'diner', name: 'Sunrise Diner', x: -200, z: -60 },
  { id: 'pier', name: 'Old Pier', x: 312, z: -40 },
  { id: 'garage', name: 'Reyes Auto Garage', x: 60, z: -140 },
  { id: 'palms-bar', name: 'Neon Palms Bar', x: 180, z: 40 },
  { id: 'marina-steps', name: 'Marina Steps', x: 310, z: 60 },
  { id: 'mall', name: 'Solara Mall', x: -40, z: 160 },
  { id: 'hotel', name: 'Palms Hotel', x: 120, z: -220 },
  { id: 'south-beach', name: 'South Beach', x: 306, z: 260 },
  { id: 'plaza', name: 'Central Plaza', x: 0, z: 0 },
  { id: 'airfield', name: 'Bay Airfield', x: -280, z: 240 },
  { id: 'studios', name: 'Vice Studios', x: -140, z: -220 },
  { id: 'arcade', name: 'Pixel Palace Arcade', x: 40, z: 200 },
];

export const PARCELS = [
  { id: 'food', name: 'Hot Food Box', base: 25, fragile: false, weight: 1 },
  { id: 'grocery', name: 'Grocery Bags', base: 30, fragile: false, weight: 2 },
  { id: 'docs', name: 'Sealed Documents', base: 45, fragile: false, weight: 1 },
  { id: 'electronics', name: 'Electronics Crate', base: 70, fragile: true, weight: 3 },
  { id: 'flowers', name: 'Flower Bouquet', base: 35, fragile: true, weight: 1 },
  { id: 'medical', name: 'Medical Supplies', base: 90, fragile: true, weight: 2 },
  { id: 'vip', name: 'VIP Gift Box', base: 150, fragile: true, weight: 1 },
  { id: 'parts', name: 'Car Parts', base: 60, fragile: false, weight: 4 },
];

export const TIERS = [
  { tier: 0, name: 'Rookie', minRep: 0, payMult: 1.0, maxDist: 260 },
  { tier: 1, name: 'Reliable', minRep: 150, payMult: 1.2, maxDist: 340 },
  { tier: 2, name: 'Pro Courier', minRep: 400, payMult: 1.5, maxDist: 460 },
  { tier: 3, name: 'VIP Runner', minRep: 800, payMult: 2.0, maxDist: 600 },
];

export function tierForRep(rep) {
  let best = TIERS[0];
  for (const t of TIERS) {
    if (rep >= t.minRep) best = t;
  }
  return best;
}

export function distanceBetween(a, b) {
  return Math.hypot(b.x - a.x, b.z - a.z);
}

export function deadlineForDistance(distance, tier) {
  const base = Math.round(25 + distance / 13);
  return tier >= 2 ? Math.round(base * 0.92) : base;
}

export function payForJob(parcel, distance, tier, damage) {
  const distPay = Math.round(distance * 0.12);
  const raw = Math.round((parcel.base + distPay) * tier.payMult);
  const cut = Math.round(raw * Math.min(0.6, damage * 0.4));
  return Math.max(5, raw - cut);
}

export function repGainFor(timeLeft, deadline, damage) {
  let gain = 10;
  const frac = deadline > 0 ? timeLeft / deadline : 0;
  if (frac > 0.4) gain += 8;
  else if (frac > 0.15) gain += 4;
  if (damage > 0.3) gain -= 6;
  return Math.max(2, gain);
}

export function createDeliverySystem(ctx) {
  const c = ctx || {};
  const state = {
    version: DELIVERY_VERSION,
    rep: 0,
    job: null,
    offered: null,
    completed: 0,
    failed: 0,
    late: 0,
    earned: 0,
    bestStreak: 0,
    streak: 0,
    totalDistance: 0,
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
  function posNow() {
    if (typeof c.getPlayerPos === 'function') return c.getPlayerPos();
    return { x: 0, y: 0, z: 0 };
  }
  function pickSpot(excludeId) {
    const pool = DELIVERY_SPOTS.filter((s) => s.id !== excludeId);
    return pool[Math.floor(roll() * pool.length)];
  }
  function nearSpot(spot, radius) {
    const r = radius === undefined ? 8 : radius;
    const p = posNow();
    return Math.hypot(p.x - spot.x, p.z - spot.z) <= r;
  }

  function completeJob(lateFlag) {
    const job = state.job;
    state.job = null;
    const basePay = payForJob(job.parcel, job.distance, tierForRep(state.rep), job.damage);
    const pay = lateFlag ? Math.floor(basePay / 2) : basePay;
    const repDelta = lateFlag ? -5 : repGainFor(job.timeLeft, job.deadline, job.damage);
    state.rep = Math.max(0, state.rep + repDelta);
    state.completed += 1;
    state.streak += 1;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    state.totalDistance += job.distance;
    state.earned += pay;
    if (lateFlag) state.late += 1;
    cashIn(pay);
    say('Delivered ' + job.parcel.name + (lateFlag ? ' late' : '') + ' for $' + pay + '.');
    if (typeof c.onDeliver === 'function') c.onDeliver(job, pay, lateFlag);
    sys.offerJob();
    return { ok: true, pay, late: lateFlag, rep: state.rep };
  }

  function failJob(reason) {
    state.job = null;
    state.failed += 1;
    state.streak = 0;
    state.rep = Math.max(0, state.rep - 10);
    say('Delivery failed: ' + reason + '.');
    sys.offerJob();
    return { ok: false, reason };
  }

  const sys = {
    name: 'delivery',
    version: DELIVERY_VERSION,
    state,
    spots: DELIVERY_SPOTS,
    parcels: PARCELS,
    tiers: TIERS,

    offerJob() {
      const tier = tierForRep(state.rep);
      const from = pickSpot(null);
      let to = pickSpot(from.id);
      let dist = distanceBetween(from, to);
      let tries = 0;
      while (dist > tier.maxDist && tries < 12) {
        to = pickSpot(from.id);
        dist = distanceBetween(from, to);
        tries += 1;
      }
      let parcel = PARCELS[Math.floor(roll() * PARCELS.length)];
      if (parcel.id === 'vip' && tier.tier < 3 && roll() >= 0.1) {
        const others = PARCELS.filter((p) => p.id !== 'vip');
        parcel = others[Math.floor(roll() * others.length)];
      }
      const deadline = deadlineForDistance(dist, tier.tier);
      const pay = payForJob(parcel, dist, tier, 0);
      const offer = {
        id: 'job-' + (state.completed + state.failed + 1),
        parcel,
        from,
        to,
        distance: dist,
        deadline,
        pay,
        tier: tier.tier,
      };
      state.offered = offer;
      return offer;
    },

    acceptJob() {
      if (!state.offered) return { ok: false, reason: 'no-offer' };
      if (state.job) return { ok: false, reason: 'job-active' };
      const offer = state.offered;
      state.job = {
        id: offer.id,
        parcel: offer.parcel,
        from: offer.from,
        to: offer.to,
        distance: offer.distance,
        deadline: offer.deadline,
        timeLeft: offer.deadline,
        pay: offer.pay,
        damage: 0,
        phase: 'pickup',
      };
      state.offered = null;
      say('Pick up ' + offer.parcel.name + ' at ' + offer.from.name + '.');
      return { ok: true, job: state.job };
    },

    declineJob() {
      if (!state.offered) return { ok: false, reason: 'no-offer' };
      state.offered = null;
      const next = sys.offerJob();
      return { ok: true, offer: next };
    },

    tick(dt) {
      if (!state.job) return;
      const job = state.job;
      job.timeLeft -= dt;
      if (job.phase === 'pickup' && nearSpot(job.from)) {
        job.phase = 'deliver';
        if (typeof c.onPickup === 'function') c.onPickup(job);
        say('Picked up ' + job.parcel.name + '. Deliver to ' + job.to.name + '.');
      } else if (job.phase === 'deliver' && nearSpot(job.to)) {
        completeJob(false);
        return;
      }
      if (job.timeLeft <= 0) {
        if (job.phase === 'deliver') completeJob(true);
        else failJob('time-out');
      }
    },

    reportDamage(amount) {
      if (!state.job) return;
      state.job.damage = Math.min(1, state.job.damage + amount);
      if (state.job.damage > 0.5) say('The parcel is getting damaged!');
    },

    cancelJob() {
      if (!state.job) return { ok: false, reason: 'no-job' };
      return failJob('cancelled');
    },

    stats() {
      return {
        rep: state.rep,
        tier: tierForRep(state.rep),
        completed: state.completed,
        failed: state.failed,
        late: state.late,
        earned: state.earned,
        streak: state.streak,
        bestStreak: state.bestStreak,
        totalDistance: Math.round(state.totalDistance),
        active: !!state.job,
      };
    },

    serialize() {
      return JSON.parse(JSON.stringify(state));
    },

    deserialize(data) {
      if (!data || data.version !== DELIVERY_VERSION) return false;
      const copy = JSON.parse(JSON.stringify(data));
      for (const k of Object.keys(state)) delete state[k];
      Object.assign(state, copy);
      return true;
    },

    hudLine() {
      if (state.job) {
        const word = state.job.phase === 'pickup' ? 'PICKUP' : 'DELIVER';
        const target = state.job.phase === 'pickup' ? state.job.from : state.job.to;
        return word + ' ' + state.job.parcel.name + ' → ' + target.name + ' | ' + Math.ceil(state.job.timeLeft) + 's | $' + state.job.pay;
      }
      if (state.offered) {
        return 'DELIVERY ' + state.offered.parcel.name + ' → ' + state.offered.to.name + ' | $' + state.offered.pay;
      }
      return '';
    },
  };
  return sys;
}

export default createDeliverySystem;
