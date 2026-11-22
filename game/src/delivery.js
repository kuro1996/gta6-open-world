// Solara Nights — Delivery (round 4 attempt 6, NEW module).
// Courier work for Solara Bay: pick up a package, deliver it to the
// drop-off before the timer runs out. Fast, clean deliveries build a
// reputation that unlocks bigger, better-paying jobs; late deliveries
// pay half and hurt the rating; damaged goods (crashing the car hard)
// cut the payout. The chain is endless — finish one job and the next
// offer appears immediately, with distance, deadline and pay scaled to
// the player's reputation tier. A five-star courier gets the VIP runs.
//
// Delivery spots reuse the city's named places: the system picks a
// pickup and a drop-off from a table of addresses and computes the
// straight-line distance, then sets a deadline the player can actually
// make by car (or on foot for the short hops). The module is
// self-contained and talks to the game only through the optional `ctx`
// hooks: position, cash, and a damage/heat feed.

export const DELIVERY_VERSION = 1;

export const DELIVERY_SPOTS = [
  { id: 'diner', name: 'Sunrise Diner', x: -200, z: -60 },
  { id: 'pier', name: 'Old Pier', x: 312, z: -40 },
  { id: 'garage', name: 'Reyes Auto Garage', x: 60, z: -140 },
  { id: 'bar', name: 'Neon Palms Bar', x: 180, z: 40 },
  { id: 'marina', name: 'Marina Steps', x: 310, z: 60 },
  { id: 'mall', name: 'Solara Mall', x: -40, z: 160 },
  { id: 'hotel', name: 'Palms Hotel', x: 120, z: -220 },
  { id: 'beach', name: 'South Beach', x: 306, z: 260 },
  { id: 'plaza', name: 'Central Plaza', x: 0, z: 0 },
  { id: 'airport', name: 'Bay Airfield', x: -280, z: 240 },
  { id: 'studio', name: 'Vice Studios', x: -140, z: -220 },
  { id: 'arcade', name: 'Pixel Palace Arcade', x: 40, z: 200 },
];

export const PARCELS = [
  { id: 'food', name: 'Hot Food Box', base: 25, fragile: false, weight: 1 },
  { id: 'groceries', name: 'Grocery Bags', base: 30, fragile: false, weight: 2 },
  { id: 'documents', name: 'Sealed Documents', base: 45, fragile: false, weight: 1 },
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
  let current = TIERS[0];
  for (const t of TIERS) if (rep >= t.minRep) current = t;
  return current;
}

export function distanceBetween(a, b) {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

// Seconds allowed: distance at ~14 m/s average plus a pickup grace period.
export function deadlineForDistance(dist, tier) {
  const base = 25 + dist / 13;
  return Math.round(base * (tier >= 2 ? 0.92 : 1));
}

export function payForJob(parcel, dist, tier, damage) {
  const distPay = Math.round(dist * 0.12);
  const raw = Math.round((parcel.base + distPay) * tier.payMult);
  const damageCut = Math.round(raw * Math.min(0.6, damage * 0.4));
  return Math.max(5, raw - damageCut);
}

export function repGainFor(timeLeft, deadline, damage) {
  let gain = 10;
  if (timeLeft > deadline * 0.4) gain += 8; // very fast
  else if (timeLeft > deadline * 0.15) gain += 4;
  if (damage > 0.3) gain -= 6;
  return Math.max(2, gain);
}

export function createDeliverySystem(ctx = {}) {
  const rng = ctx.rng || Math.random;
  const state = {
    version: DELIVERY_VERSION,
    rep: 0,
    job: null, // { id, parcel, from, to, dist, deadline, timeLeft, pay, damage, phase }
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

  function pickSpot(excludeId) {
    const pool = DELIVERY_SPOTS.filter((s) => s.id !== excludeId);
    return pool[Math.floor(rng() * pool.length)];
  }

  function offerJob() {
    const tier = tierForRep(state.rep);
    const from = pickSpot(null);
    let to = pickSpot(from.id);
    let dist = distanceBetween(from, to);
    let guard = 0;
    while (dist > tier.maxDist && guard < 12) {
      to = pickSpot(from.id);
      dist = distanceBetween(from, to);
      guard += 1;
    }
    const parcelPool = tier.tier >= 3
      ? PARCELS
      : PARCELS.filter((p) => p.id !== 'vip' || rng() < 0.1);
    const parcel = parcelPool[Math.floor(rng() * parcelPool.length)];
    const deadline = deadlineForDistance(dist, tier.tier);
    const pay = payForJob(parcel, dist, tier, 0);
    state.offered = {
      id: `job-${state.completed + state.failed + 1}`,
      parcel, from, to, dist: Math.round(dist),
      deadline, pay, tier: tier.tier,
    };
    return state.offered;
  }

  function acceptJob() {
    if (!state.offered) return { ok: false, reason: 'no-offer' };
    if (state.job) return { ok: false, reason: 'job-active' };
    state.job = { ...state.offered, timeLeft: state.offered.deadline, damage: 0, phase: 'pickup' };
    state.offered = null;
    note(`📦 Pickup: ${state.job.parcel.name} at ${state.job.from.name}. Deliver to ${state.job.to.name} in ${state.job.deadline}s — pays $${state.job.pay}.`);
    return { ok: true, job: state.job };
  }

  function declineJob() {
    if (!state.offered) return { ok: false, reason: 'no-offer' };
    state.offered = null;
    offerJob();
    return { ok: true, offered: state.offered };
  }

  function nearSpot(spot, radius = 8) {
    const p = playerPos();
    return Math.hypot(p.x - spot.x, p.z - spot.z) <= radius;
  }

  function tick(dt) {
    const job = state.job;
    if (!job) return;
    job.timeLeft -= dt;
    if (job.phase === 'pickup' && nearSpot(job.from)) {
      job.phase = 'deliver';
      note(`📦 Picked up ${job.parcel.name}. Go to ${job.to.name}!`);
      if (typeof ctx.onPickup === 'function') ctx.onPickup(job);
    } else if (job.phase === 'deliver' && nearSpot(job.to)) {
      completeJob(false);
      return;
    }
    if (job.timeLeft <= 0) {
      if (job.phase === 'deliver') {
        // Arrived after the deadline: half pay, rep hit.
        completeJob(true);
      } else {
        failJob('time-out');
      }
    }
  }

  function reportDamage(amount) {
    if (!state.job) return;
    state.job.damage = Math.min(1, state.job.damage + amount);
    if (state.job.damage > 0.5) note('⚠️ Package damaged! Payout is dropping.');
  }

  function completeJob(late) {
    const job = state.job;
    state.job = null;
    const pay = late
      ? Math.round(payForJob(job.parcel, job.dist, tierForRep(state.rep), job.damage) * 0.5)
      : payForJob(job.parcel, job.dist, tierForRep(state.rep), job.damage);
    const repGain = late ? -5 : repGainFor(job.timeLeft, job.deadline, job.damage);
    state.rep = Math.max(0, state.rep + repGain);
    state.completed += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.totalDistance += job.dist;
    state.earned += pay;
    if (late) state.late += 1;
    addCash(pay);
    note(late
      ? `📦 Late delivery — half pay $${pay}. Rep ${repGain}.`
      : `📦 Delivered ${job.parcel.name} in time! +$${pay} (rep +${repGain}, streak ${state.streak}).`);
    if (typeof ctx.onDeliver === 'function') ctx.onDeliver(job, pay, late);
    offerJob();
    return { ok: true, pay, late, rep: state.rep };
  }

  function failJob(reason) {
    const job = state.job;
    state.job = null;
    state.failed += 1;
    state.streak = 0;
    state.rep = Math.max(0, state.rep - 10);
    note(`📦 Delivery failed (${reason}). Rep -10.`);
    offerJob();
    return { ok: false, reason };
  }

  function cancelJob() {
    if (!state.job) return { ok: false, reason: 'no-job' };
    return failJob('cancelled');
  }

  function stats() {
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
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(data) {
    if (!data || data.version !== DELIVERY_VERSION) return false;
    Object.assign(state, data);
    return true;
  }

  function hudLine() {
    if (state.job) {
      const j = state.job;
      const target = j.phase === 'pickup' ? j.from.name : j.to.name;
      return `📦 ${j.phase === 'pickup' ? 'PICKUP' : 'DELIVER'} ${j.parcel.name} → ${target} — ${Math.max(0, Math.ceil(j.timeLeft))}s — $${j.pay}`;
    }
    if (state.offered) return `📦 Job offered: ${state.offered.parcel.name} → ${state.offered.to.name} — $${state.offered.pay}`;
    return '';
  }

  return {
    name: 'delivery',
    version: DELIVERY_VERSION,
    state,
    spots: DELIVERY_SPOTS,
    parcels: PARCELS,
    tiers: TIERS,
    offerJob,
    acceptJob,
    declineJob,
    tick,
    reportDamage,
    cancelJob,
    stats,
    serialize,
    deserialize,
    hudLine,
  };
}

export default createDeliverySystem;
