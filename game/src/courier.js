// courier.js — Swift Courier: timed parcel deliveries across the city.
// Take jobs from the depot board, pick up parcels, race the clock to the
// drop-off, and keep your rating high for better-paying rush work. Fragile
// parcels punish rough driving, multi-stop routes pay more, and a five-star
// streak unlocks the premium fleet. Pure logic, no rendering, no imports.
// Factory: createCourierSystem(deps) with deps { rng, getHour, getDay,
// getCash, addCash, addHeat, log, getPlayerPos, getWeather }.

// ---------------------------------------------------------------------------
// Data tables
// ---------------------------------------------------------------------------

// City districts: coordinates in the world grid, traffic level, base fare
// modifier. Distance between districts drives the delivery fee.
export const DISTRICTS = [
  { id: 'downtown', name: 'Downtown', x: 0, z: 0, traffic: 5, fareMult: 1.0 },
  { id: 'port', name: 'Portside', x: -420, z: 180, traffic: 3, fareMult: 1.1 },
  { id: 'beach', name: 'Vice Beach', x: 380, z: 260, traffic: 4, fareMult: 1.15 },
  { id: 'suburbs', name: 'Leafy Suburbs', x: -320, z: -300, traffic: 2, fareMult: 1.05 },
  { id: 'industrial', name: 'Industrial Zone', x: 420, z: -280, traffic: 3, fareMult: 1.1 },
  { id: 'airport', name: 'Airport', x: -480, z: -80, traffic: 4, fareMult: 1.3 },
  { id: 'university', name: 'University', x: 120, z: -380, traffic: 3, fareMult: 1.0 },
  { id: 'oldtown', name: 'Old Town', x: -140, z: 340, traffic: 2, fareMult: 0.95 },
  { id: 'mall', name: 'Mega Mall', x: 240, z: 120, traffic: 5, fareMult: 1.05 },
  { id: 'docks', name: 'Fish Docks', x: -380, z: 320, traffic: 2, fareMult: 1.1 },
  { id: 'hills', name: 'Starfish Hills', x: 480, z: 80, traffic: 1, fareMult: 1.25 },
  { id: 'market', name: 'Night Market', x: 60, z: 420, traffic: 4, fareMult: 1.0 },
];

// Parcel types: weight class, fragility, base pay, handling notes.
export const PARCEL_TYPES = [
  { id: 'letter', name: 'Letter', weight: 0.1, fragile: 0, basePay: 8, size: 'S', desc: 'A plain envelope. Light and easy.' },
  { id: 'documents', name: 'Legal Documents', weight: 0.5, fragile: 1, basePay: 15, size: 'S', desc: 'Signed, sealed, and time-sensitive.' },
  { id: 'food', name: 'Hot Food Box', weight: 2, fragile: 1, basePay: 18, size: 'M', desc: 'Keep it hot, keep it level, keep it fast.' },
  { id: 'groceries', name: 'Grocery Bag', weight: 6, fragile: 1, basePay: 20, size: 'M', desc: 'Eggs on top. Always eggs on top.' },
  { id: 'flowers', name: 'Flower Bouquet', weight: 1, fragile: 3, basePay: 25, size: 'M', desc: 'Somebody is apologising. Do not crush it.' },
  { id: 'cake', name: 'Birthday Cake', weight: 3, fragile: 3, basePay: 30, size: 'M', desc: 'Three tiers. One bump and it is modern art.' },
  { id: 'electronics', name: 'Electronics Box', weight: 4, fragile: 2, basePay: 35, size: 'M', desc: 'This side up. Fragile means fragile.' },
  { id: 'medicine', name: 'Medicine Parcel', weight: 0.8, fragile: 2, basePay: 40, size: 'S', desc: 'Cold-chain. Lives depend on the clock.' },
  { id: 'wine', name: 'Wine Case', weight: 9, fragile: 3, basePay: 45, size: 'L', desc: 'Twelve bottles, zero room for error.' },
  { id: 'furniture', name: 'Flat-pack Furniture', weight: 25, fragile: 1, basePay: 60, size: 'L', desc: 'Heavy, awkward, and somehow always urgent.' },
  { id: 'art', name: 'Framed Artwork', weight: 7, fragile: 3, basePay: 70, size: 'L', desc: 'One of a kind. Insured for more than your car.' },
  { id: 'instruments', name: 'Guitar Case', weight: 5, fragile: 3, basePay: 55, size: 'L', desc: 'A vintage guitar. Handle like a baby.' },
  { id: 'parts', name: 'Machine Parts', weight: 18, fragile: 0, basePay: 50, size: 'L', desc: 'Greasy, heavy, indestructible.' },
  { id: 'petsupply', name: 'Pet Supplies', weight: 8, fragile: 0, basePay: 22, size: 'M', desc: 'Kibble, toys, and one very excited dog waiting.' },
  { id: 'jewellery', name: 'Jewellery Box', weight: 0.3, fragile: 2, basePay: 90, size: 'S', desc: 'Small box, enormous value. Do not lose it.' },
  { id: 'antique', name: 'Antique Vase', weight: 4, fragile: 4, basePay: 120, size: 'M', desc: 'Ming dynasty. One chip and you owe a fortune.' },
  { id: 'server', name: 'Server Rack Unit', weight: 30, fragile: 2, basePay: 110, size: 'L', desc: 'A whole company is offline until this arrives.' },
  { id: 'tires', name: 'Tire Set', weight: 40, fragile: 0, basePay: 65, size: 'L', desc: 'Four tires. Smells like rubber, pays like cash.' },
  { id: 'books', name: 'Book Crate', weight: 15, fragile: 0, basePay: 28, size: 'L', desc: 'Forty kilos of knowledge.' },
  { id: 'mystery', name: 'Sealed Mystery Box', weight: 3, fragile: 1, basePay: 45, size: 'M', desc: 'No label, no sender, no questions asked.' },
];

// Courier vehicles: capacity, speed bonus, durability.
export const COURIER_VEHICLES = [
  { id: 'bicycle', name: 'Delivery Bicycle', price: 0, capacity: 1, speedBonus: 0, durability: 3, desc: 'Pedal power. Free, slow, honest.' },
  { id: 'scooter', name: 'Scooter', price: 400, capacity: 2, speedBonus: 0.15, durability: 5, desc: 'Zips through traffic. The city classic.' },
  { id: 'van', name: 'Delivery Van', price: 2500, capacity: 4, speedBonus: 0.1, durability: 8, desc: 'Four parcels at once. The workhorse.' },
  { id: 'truck', name: 'Box Truck', price: 8000, capacity: 6, speedBonus: 0.05, durability: 10, desc: 'Six parcels, one trip, serious money.' },
  { id: 'sportbike', name: 'Sport Bike', price: 6000, capacity: 1, speedBonus: 0.45, durability: 4, desc: 'One parcel, absurd speed, rush-job king.' },
  { id: 'ev-van', name: 'EV Cargo Van', price: 15000, capacity: 5, speedBonus: 0.3, durability: 9, desc: 'Silent, quick, and kind to fragile cargo.' },
];

// Courier ranks: rating + deliveries unlock better jobs.
export const COURIER_RANKS = [
  { id: 'rookie', name: 'Rookie', deliveriesNeeded: 0, minRating: 0, perk: 'Standard board jobs.' },
  { id: 'regular', name: 'Regular', deliveriesNeeded: 10, minRating: 3.5, perk: 'Rush jobs appear.' },
  { id: 'trusted', name: 'Trusted', deliveriesNeeded: 30, minRating: 4.0, perk: 'Multi-stop routes appear, +10% pay.' },
  { id: 'elite', name: 'Elite Courier', deliveriesNeeded: 75, minRating: 4.5, perk: 'Premium jobs, +20% pay, fragile bonus.' },
  { id: 'legend', name: 'City Legend', deliveriesNeeded: 150, minRating: 4.8, perk: '+35% pay, VIP clients, mystery boxes.' },
];

// Job urgency tiers.
export const URGENCY = [
  { id: 'standard', name: 'Standard', timeMult: 1.0, payMult: 1.0, minRank: 'rookie' },
  { id: 'express', name: 'Express', timeMult: 0.7, payMult: 1.4, minRank: 'rookie' },
  { id: 'rush', name: 'Rush', timeMult: 0.45, payMult: 2.0, minRank: 'regular' },
  { id: 'critical', name: 'Critical', timeMult: 0.3, payMult: 3.0, minRank: 'elite' },
];

// Courier missions.
export const COURIER_MISSIONS = [
  { id: 'first-delivery', name: 'First Delivery', desc: 'Complete your first delivery.', reward: 50 },
  { id: 'ten-deliveries', name: 'Ten Deliveries', desc: 'Complete 10 deliveries.', reward: 200 },
  { id: 'fifty-deliveries', name: 'Fifty Deliveries', desc: 'Complete 50 deliveries.', reward: 800 },
  { id: 'five-star', name: 'Five Stars', desc: 'Reach a 5.0 rating (min 10 deliveries).', reward: 500 },
  { id: 'streak-5', name: 'Hot Streak', desc: 'Complete 5 deliveries in a row without a late or damaged parcel.', reward: 400 },
  { id: 'streak-10', name: 'Unstoppable', desc: 'Complete 10 deliveries in a row without a late or damaged parcel.', reward: 1500 },
  { id: 'fragile-pro', name: 'Fragile Pro', desc: 'Deliver 10 fragile parcels undamaged.', reward: 600 },
  { id: 'rush-king', name: 'Rush King', desc: 'Complete 15 rush jobs on time.', reward: 1000 },
  { id: 'multi-stop', name: 'Route Master', desc: 'Complete 5 multi-stop routes.', reward: 700 },
  { id: 'earn-5000', name: 'Courier Cash', desc: 'Earn $5,000 total from deliveries.', reward: 1000 },
];

// Customer feedback lines, keyed by star rating.
export const FEEDBACK = {
  5: ['Lightning fast, parcel perfect!', 'Best courier in the city!', 'On time and smiling. Five stars!', 'I will request you every time.'],
  4: ['Quick delivery, all good.', 'Nearly perfect, thanks!', 'Good courier, minor delay.', 'Parcel arrived safe. Thanks!'],
  3: ['It arrived. Eventually.', 'Okay, but a bit slow.', 'Parcel fine, timing meh.', 'Average service.'],
  2: ['Late and the box was dented.', 'Not happy with the delay.', 'Parcel arrived damaged.', 'Would not recommend.'],
  1: ['Terrible! Never again!', 'Parcel destroyed. Refund!', 'Hours late. Unacceptable.', 'Worst courier ever.'],
};

// Traffic events that can hit a job mid-route.
export const TRAFFIC_EVENTS = [
  { id: 'jam', name: 'Traffic Jam', desc: 'Gridlock ahead. Lose 20 seconds.', timeCost: 20, chance: 0.3 },
  { id: 'detour', name: 'Road Closed', desc: 'Detour adds distance but keeps you moving.', timeCost: 12, chance: 0.25 },
  { id: 'rain', name: 'Sudden Downpour', desc: 'Wet roads slow you down.', timeCost: 8, chance: 0.2 },
  { id: 'shortcut', name: 'Shortcut Found', desc: 'A back alley saves time!', timeCost: -15, chance: 0.15 },
  { id: 'police', name: 'Police Checkpoint', desc: 'A quick check costs you time.', timeCost: 10, chance: 0.1 },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clampNum(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

function dist(a, b) {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dz * dz);
}

export function districtById(id) {
  return DISTRICTS.find((d) => d.id === id) || DISTRICTS[0];
}

export function jobPay(parcel, from, to, urgency, rankMult) {
  const d = dist(from, to);
  const distancePay = Math.round((d / 100) * 6);
  const base = parcel.basePay + distancePay;
  return Math.max(5, Math.round(base * urgency.payMult * from.fareMult * to.fareMult * rankMult));
}

export function timeLimitFor(parcel, from, to, urgency, speedBonus) {
  const d = dist(from, to);
  const baseSeconds = 45 + (d / 100) * 12;
  return Math.max(30, Math.round(baseSeconds * urgency.timeMult * (1 - speedBonus)));
}

function randomDistrict(rng, excludeId) {
  const pool = DISTRICTS.filter((d) => d.id !== excludeId);
  return pool[Math.floor(rng() * pool.length)];
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createCourierSystem(deps) {
  const d = deps || {};
  const rng = d.rng || Math.random;
  const getHour = d.getHour || (() => 12);
  const getDay = d.getDay || (() => 1);
  const getCash = d.getCash || (() => 0);
  const addCash = d.addCash || (() => {});
  const addHeat = d.addHeat || (() => {});
  const log = d.log || (() => {});
  const getPlayerPos = d.getPlayerPos || (() => ({ x: 0, z: 0 }));
  const getWeather = d.getWeather || (() => 'clear');

  const state = {
    rank: 'rookie',
    vehicleId: 'bicycle',
    vehiclesOwned: ['bicycle'],
    vehicleWear: 0,
    board: [],
    boardDay: 0,
    activeJobs: [],
    completedJobs: [],
    totalDeliveries: 0,
    totalEarned: 0,
    totalLate: 0,
    totalDamaged: 0,
    ratingSum: 0,
    ratingCount: 0,
    streak: 0,
    bestStreak: 0,
    rushOnTime: 0,
    fragileSafe: 0,
    multiStopDone: 0,
    missionsDone: {},
    day: 1,
    jobsToday: 0,
    tips: 0,
    damageEvents: 0,
  };

  function rating() {
    if (state.ratingCount === 0) return 5.0;
    return Math.round((state.ratingSum / state.ratingCount) * 10) / 10;
  }

  function rankMult() {
    if (state.rank === 'legend') return 1.35;
    if (state.rank === 'elite') return 1.2;
    if (state.rank === 'trusted') return 1.1;
    return 1;
  }

  function vehicle() {
    return COURIER_VEHICLES.find((v) => v.id === state.vehicleId) || COURIER_VEHICLES[0];
  }

  function refreshRank() {
    let best = COURIER_RANKS[0];
    const r = rating();
    for (const rank of COURIER_RANKS) {
      if (state.totalDeliveries >= rank.deliveriesNeeded && r >= rank.minRating) best = rank;
    }
    if (best.id !== state.rank) {
      state.rank = best.id;
      log(`Courier rank up: ${best.name}! ${best.perk}`);
    }
  }

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const m = COURIER_MISSIONS.find((x) => x.id === id);
    if (!m) return;
    let done = false;
    switch (id) {
      case 'first-delivery': done = state.totalDeliveries >= 1; break;
      case 'ten-deliveries': done = state.totalDeliveries >= 10; break;
      case 'fifty-deliveries': done = state.totalDeliveries >= 50; break;
      case 'five-star': done = state.totalDeliveries >= 10 && rating() >= 5.0; break;
      case 'streak-5': done = state.bestStreak >= 5; break;
      case 'streak-10': done = state.bestStreak >= 10; break;
      case 'fragile-pro': done = state.fragileSafe >= 10; break;
      case 'rush-king': done = state.rushOnTime >= 15; break;
      case 'multi-stop': done = state.multiStopDone >= 5; break;
      case 'earn-5000': done = state.totalEarned >= 5000; break;
      default: done = false;
    }
    if (!done) return;
    state.missionsDone[id] = true;
    addCash(m.reward);
    log(`Courier mission complete: ${m.name} (+$${m.reward}).`);
  }

  function rankIndex() {
    return COURIER_RANKS.findIndex((r) => r.id === state.rank);
  }

  function generateJob() {
    const parcel = PARCEL_TYPES[Math.floor(rng() * PARCEL_TYPES.length)];
    const from = randomDistrict(rng, null);
    let to = randomDistrict(rng, from.id);
    const urgencies = URGENCY.filter((u) => rankIndex() >= COURIER_RANKS.findIndex((r) => r.id === u.minRank));
    const urgency = urgencies[Math.floor(rng() * urgencies.length)];
    const v = vehicle();
    const pay = jobPay(parcel, from, to, urgency, rankMult());
    const limit = timeLimitFor(parcel, from, to, urgency, v.speedBonus);
    const multi = state.rank !== 'rookie' && state.rank !== 'regular' && rng() < 0.25;
    const stops = [];
    if (multi) {
      const extra = randomDistrict(rng, to.id);
      stops.push({ districtId: extra.id, parcelId: PARCEL_TYPES[Math.floor(rng() * PARCEL_TYPES.length)].id, done: false });
    }
    return {
      id: `job-${Date.now()}-${Math.floor(rng() * 1e6)}`,
      parcelId: parcel.id,
      parcelName: parcel.name,
      fragile: parcel.fragile,
      fromId: from.id,
      toId: to.id,
      urgencyId: urgency.id,
      urgencyName: urgency.name,
      pay,
      timeLimit: limit,
      timeLeft: limit,
      status: 'offered',
      stops,
      multi,
      pickedUp: false,
      damage: 0,
      createdDay: getDay(),
    };
  }

  function refreshBoard() {
    const day = getDay();
    state.board = [];
    const count = 5 + rankIndex();
    for (let i = 0; i < count; i++) state.board.push(generateJob());
    state.boardDay = day;
    return state.board;
  }

  function board() {
    if (state.boardDay !== getDay() || state.board.length === 0) refreshBoard();
    return state.board.filter((j) => j.status === 'offered');
  }

  function acceptJob(jobId) {
    const job = state.board.find((j) => j.id === jobId && j.status === 'offered');
    if (!job) return { ok: false, error: 'job not on the board' };
    const v = vehicle();
    if (state.activeJobs.length >= v.capacity) {
      return { ok: false, error: `vehicle capacity full (${v.capacity})` };
    }
    job.status = 'accepted';
    state.activeJobs.push(job);
    state.jobsToday++;
    log(`Accepted ${job.urgencyName} delivery: ${job.parcelName} from ${districtById(job.fromId).name} to ${districtById(job.toId).name}. ${job.timeLimit}s on the clock, $${job.pay}.`);
    return { ok: true, job };
  }

  function pickup(jobId) {
    const job = state.activeJobs.find((j) => j.id === jobId);
    if (!job) return { ok: false, error: 'no such active job' };
    if (job.pickedUp) return { ok: false, error: 'already picked up' };
    const pos = getPlayerPos();
    const from = districtById(job.fromId);
    if (dist(from, pos) > 60) return { ok: false, error: 'not at the pickup point yet' };
    job.pickedUp = true;
    log(`Picked up ${job.parcelName}. Deliver to ${districtById(job.toId).name}.`);
    return { ok: true, job };
  }

  function reportBump(severity) {
    // Called by the driving layer when the player crashes. severity 0-1.
    let damaged = [];
    for (const job of state.activeJobs) {
      if (!job.pickedUp) continue;
      if (job.fragile <= 0) continue;
      const hit = severity * job.fragile * (10 - vehicle().durability) * 0.12;
      job.damage = Math.min(100, job.damage + hit);
      if (job.damage >= 50 && !job.damageWarned) {
        job.damageWarned = true;
        state.damageEvents++;
        log(`Careful! The ${job.parcelName} is taking damage (${Math.round(job.damage)}%).`);
      }
      damaged.push({ jobId: job.id, damage: Math.round(job.damage) });
    }
    return { ok: true, damaged };
  }

  function deliver(jobId) {
    const idx = state.activeJobs.findIndex((j) => j.id === jobId);
    if (idx < 0) return { ok: false, error: 'no such active job' };
    const job = state.activeJobs[idx];
    if (!job.pickedUp) return { ok: false, error: 'pick up the parcel first' };
    const pos = getPlayerPos();
    const to = districtById(job.toId);
    if (dist(to, pos) > 60) return { ok: false, error: 'not at the drop-off yet' };
    return completeJob(job, idx, false);
  }

  function completeJob(job, idx, expired) {
    state.activeJobs.splice(idx, 1);
    const late = expired || job.timeLeft <= 0;
    const damaged = job.damage >= 50;
    let stars = 5;
    if (late) stars -= 2;
    if (damaged) stars -= 2;
    if (job.timeLeft < job.timeLimit * 0.25 && !late) stars -= 1;
    stars = clampNum(stars, 1, 5);
    let pay = job.pay;
    if (late) pay = Math.round(pay * 0.5);
    if (damaged) pay = Math.round(pay * 0.6);
    let tip = 0;
    if (stars === 5 && rng() < 0.5) tip = Math.round(pay * 0.2);
    if (stars >= 4 && job.fragile >= 3 && !damaged) tip += 15;
    const total = pay + tip;
    addCash(total);
    state.totalDeliveries++;
    state.totalEarned += total;
    state.tips += tip;
    state.ratingSum += stars;
    state.ratingCount++;
    if (late) state.totalLate++;
    if (damaged) state.totalDamaged++;
    if (job.fragile > 0 && !damaged) state.fragileSafe++;
    if (job.urgencyId === 'rush' && !late) state.rushOnTime++;
    if (job.multi) state.multiStopDone++;
    if (!late && !damaged) {
      state.streak++;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
    } else {
      state.streak = 0;
    }
    // Vehicle wear: every delivery adds a little; high wear slows you down.
    state.vehicleWear = Math.min(100, state.vehicleWear + 2 + (damaged ? 3 : 0));
    const feedback = FEEDBACK[stars][Math.floor(rng() * FEEDBACK[stars].length)];
    const done = {
      ...job,
      status: late ? 'late' : 'delivered',
      stars,
      pay,
      tip,
      total,
      feedback,
      day: getDay(),
    };
    state.completedJobs.unshift(done);
    if (state.completedJobs.length > 20) state.completedJobs.pop();
    log(`Delivered ${job.parcelName}: ${stars} stars — "${feedback}" +$${total}${tip ? ` (incl. $${tip} tip)` : ''}.`);
    refreshRank();
    checkMission('first-delivery');
    checkMission('ten-deliveries');
    checkMission('fifty-deliveries');
    checkMission('five-star');
    checkMission('streak-5');
    checkMission('streak-10');
    checkMission('fragile-pro');
    checkMission('rush-king');
    checkMission('multi-stop');
    checkMission('earn-5000');
    return { ok: true, delivery: done };
  }

  // --- Vehicles ------------------------------------------------------------
  function buyVehicle(vehicleId) {
    const v = COURIER_VEHICLES.find((x) => x.id === vehicleId);
    if (!v) return { ok: false, error: 'unknown vehicle' };
    if (state.vehiclesOwned.includes(vehicleId)) {
      state.vehicleId = vehicleId;
      return { ok: true, equipped: vehicleId };
    }
    if (getCash() < v.price) return { ok: false, error: 'not enough cash' };
    addCash(-v.price);
    state.vehiclesOwned.push(vehicleId);
    state.vehicleId = vehicleId;
    state.vehicleWear = 0;
    log(`Bought ${v.name} ($${v.price}). Capacity ${v.capacity}, speed +${Math.round(v.speedBonus * 100)}%.`);
    return { ok: true, vehicle: v };
  }

  function repairVehicle() {
    if (state.vehicleWear <= 0) return { ok: false, error: 'vehicle is already in perfect shape' };
    const cost = Math.round(state.vehicleWear * 3);
    if (getCash() < cost) return { ok: false, error: 'not enough cash for repairs' };
    addCash(-cost);
    state.vehicleWear = 0;
    log(`Vehicle repaired for $${cost}. Good as new.`);
    return { ok: true, cost };
  }

  function cancelJob(jobId) {
    const idx = state.activeJobs.findIndex((j) => j.id === jobId);
    if (idx < 0) return { ok: false, error: 'no such active job' };
    const job = state.activeJobs.splice(idx, 1)[0];
    state.ratingSum += 2;
    state.ratingCount++;
    state.streak = 0;
    log(`Cancelled ${job.parcelName} delivery. Rating hit: customer left 2 stars.`);
    refreshRank();
    return { ok: true, job };
  }

  // --- Route planning ------------------------------------------------------
  function planRoute(jobId) {
    const job = state.activeJobs.find((j) => j.id === jobId) || state.board.find((j) => j.id === jobId);
    if (!job) return { ok: false, error: 'no such job' };
    const pos = getPlayerPos();
    const from = districtById(job.fromId);
    const to = districtById(job.toId);
    const leg1 = Math.round(dist(pos, from));
    const leg2 = Math.round(dist(from, to));
    const total = leg1 + leg2;
    const estSeconds = Math.round((total / 100) * 12 * (1 - vehicle().speedBonus));
    const trafficNote = to.traffic >= 4 ? 'Heavy traffic near the drop-off.' : to.traffic <= 2 ? 'Clear roads near the drop-off.' : 'Moderate traffic.';
    return {
      ok: true,
      route: {
        jobId: job.id,
        from: from.name,
        to: to.name,
        pickupDistance: leg1,
        deliveryDistance: leg2,
        totalDistance: total,
        estSeconds,
        timeLeft: job.timeLeft,
        slack: job.timeLeft - estSeconds,
        trafficNote,
        stops: job.stops.map((s) => districtById(s.districtId).name),
      },
    };
  }

  function bestJobForPlayer() {
    const offered = board();
    if (offered.length === 0) return { ok: false, error: 'board is empty' };
    const pos = getPlayerPos();
    let best = null;
    let bestScore = -Infinity;
    for (const job of offered) {
      const from = districtById(job.fromId);
      const to = districtById(job.toId);
      const d = dist(pos, from) + dist(from, to);
      const score = job.pay / Math.max(30, d / 10) - (job.fragile * 2);
      if (score > bestScore) { bestScore = score; best = job; }
    }
    return { ok: true, job: best, score: Math.round(bestScore * 100) / 100 };
  }

  // --- Traffic events ------------------------------------------------------
  function rollTrafficEvent(jobId) {
    const job = state.activeJobs.find((j) => j.id === jobId);
    if (!job) return { ok: false, error: 'no such active job' };
    const roll = rng();
    let acc = 0;
    for (const ev of TRAFFIC_EVENTS) {
      acc += ev.chance;
      if (roll <= acc) {
        job.timeLeft = Math.max(0, job.timeLeft + ev.timeCost);
        if (ev.timeCost < 0) job.timeLeft -= ev.timeCost * 0;
        log(`${ev.name}: ${ev.desc}`);
        return { ok: true, event: ev };
      }
    }
    return { ok: true, event: null };
  }

  function applyWeatherEffect() {
    const w = getWeather();
    if (w === 'rain') return { speedMult: 0.9, note: 'Rain: roads are slick, drive carefully.' };
    if (w === 'storm') return { speedMult: 0.75, note: 'Storm: deliveries are dangerous but pay respect.' };
    if (w === 'fog') return { speedMult: 0.85, note: 'Fog: visibility is low.' };
    return { speedMult: 1, note: 'Clear skies. Good day for deliveries.' };
  }

  // --- Daily loop ----------------------------------------------------------
  function tick(dt) {
    const day = getDay();
    if (day !== state.day) {
      state.day = day;
      state.jobsToday = 0;
      refreshBoard();
    }
    // Active job timers tick down in real seconds while playing.
    for (let i = state.activeJobs.length - 1; i >= 0; i--) {
      const job = state.activeJobs[i];
      const wearSlow = 1 + state.vehicleWear / 200;
      job.timeLeft -= dt * wearSlow;
      // Random traffic events roughly every 45 seconds of a job.
      job._eventTimer = (job._eventTimer || 0) + dt;
      if (job._eventTimer > 45) {
        job._eventTimer = 0;
        if (rng() < 0.4) rollTrafficEvent(job.id);
      }
      if (job.timeLeft <= 0) {
        const idx = state.activeJobs.indexOf(job);
        if (idx >= 0) {
          log(`Too late! The ${job.parcelName} delivery expired. Half pay, rating hit.`);
          completeJob(job, idx, true);
        }
      }
    }
    // Unaccepted board jobs expire at day rollover (handled by refreshBoard).
  }

  function missions() {
    return COURIER_MISSIONS.map((m) => ({ ...m, done: !!state.missionsDone[m.id] }));
  }

  function hudLine() {
    if (state.totalDeliveries === 0 && state.activeJobs.length === 0) return '';
    const active = state.activeJobs.map((j) => `${j.parcelName} ${Math.max(0, Math.ceil(j.timeLeft))}s`).join(' | ');
    return `Courier ${state.rank} ${rating()}★ | ${state.activeJobs.length} active${active ? `: ${active}` : ''} | streak ${state.streak}`;
  }

  function summary() {
    return {
      rank: state.rank,
      rating: rating(),
      vehicle: state.vehicleId,
      vehicleWear: Math.round(state.vehicleWear),
      activeJobs: state.activeJobs.length,
      totalDeliveries: state.totalDeliveries,
      totalEarned: state.totalEarned,
      totalLate: state.totalLate,
      totalDamaged: state.totalDamaged,
      streak: state.streak,
      bestStreak: state.bestStreak,
      tips: state.tips,
      missionsDone: Object.keys(state.missionsDone).length,
      recent: state.completedJobs.slice(0, 5).map((j) => `${j.parcelName} ${j.stars}★ +$${j.total}`),
    };
  }

  function serialize() {
    return {
      rank: state.rank,
      vehicleId: state.vehicleId,
      vehiclesOwned: [...state.vehiclesOwned],
      vehicleWear: state.vehicleWear,
      totalDeliveries: state.totalDeliveries,
      totalEarned: state.totalEarned,
      totalLate: state.totalLate,
      totalDamaged: state.totalDamaged,
      ratingSum: state.ratingSum,
      ratingCount: state.ratingCount,
      streak: state.streak,
      bestStreak: state.bestStreak,
      rushOnTime: state.rushOnTime,
      fragileSafe: state.fragileSafe,
      multiStopDone: state.multiStopDone,
      missionsDone: { ...state.missionsDone },
      tips: state.tips,
      completedJobs: state.completedJobs.map((j) => ({ ...j })),
    };
  }

  function deserialize(s) {
    if (!s || typeof s !== 'object') return;
    if (typeof s.rank === 'string') state.rank = s.rank;
    if (typeof s.vehicleId === 'string') state.vehicleId = s.vehicleId;
    if (Array.isArray(s.vehiclesOwned)) state.vehiclesOwned = [...s.vehiclesOwned];
    for (const k of ['vehicleWear', 'totalDeliveries', 'totalEarned', 'totalLate', 'totalDamaged', 'ratingSum', 'ratingCount', 'streak', 'bestStreak', 'rushOnTime', 'fragileSafe', 'multiStopDone', 'tips']) {
      if (typeof s[k] === 'number') state[k] = s[k];
    }
    if (s.missionsDone) state.missionsDone = { ...s.missionsDone };
    if (Array.isArray(s.completedJobs)) state.completedJobs = s.completedJobs.map((j) => ({ ...j }));
  }

  return {
    state,
    board,
    refreshBoard,
    acceptJob,
    pickup,
    deliver,
    reportBump,
    buyVehicle,
    repairVehicle,
    cancelJob,
    planRoute,
    bestJobForPlayer,
    rollTrafficEvent,
    applyWeatherEffect,
    missions,
    tick,
    hudLine,
    summary,
    serialize,
    deserialize,
  };
}

// ---------------------------------------------------------------------------
// Extra reference data: client archetypes (flavour for the depot board)
// ---------------------------------------------------------------------------

export const CLIENT_TYPES = [
  { id: 'student', name: 'Student', tipChance: 0.2, patience: 'low', note: 'Always in a hurry, rarely tips.' },
  { id: 'office', name: 'Office Worker', tipChance: 0.35, patience: 'medium', note: 'Orders lunch at 12:59 every day.' },
  { id: 'elderly', name: 'Elderly Resident', tipChance: 0.6, patience: 'high', note: 'Tips in coins and tells you stories.' },
  { id: 'chef', name: 'Restaurant Chef', tipChance: 0.4, patience: 'low', note: 'Needs ingredients before service starts.' },
  { id: 'collector', name: 'Collector', tipChance: 0.5, patience: 'medium', note: 'Fragile parcels only, inspects every corner.' },
  { id: 'business', name: 'Business Owner', tipChance: 0.45, patience: 'medium', note: 'Pays on time, expects the same.' },
  { id: 'tourist', name: 'Tourist', tipChance: 0.7, patience: 'high', note: 'Tips big, gets lost giving directions.' },
  { id: 'streamer', name: 'Streamer', tipChance: 0.3, patience: 'low', note: 'Will rate you live on stream.' },
];

export const DELIVERY_TIPS = [
  'Deliver before the timer hits red for a tip bonus.',
  'Fragile parcels hate bumps. Brake early.',
  'A 5-star streak unlocks rush jobs that pay double.',
  'The sport bike is the fastest way to beat rush timers.',
  'Repair your vehicle: wear quietly eats your clock.',
  'Multi-stop routes pay for the extra leg.',
  'Rain slows traffic but customers tip more.',
  'Cancel a job you cannot finish — a late delivery hurts more.',
];


// ---------------------------------------------------------------------------
// Part 3 — Night shifts, depot upgrades, leaderboards, client stories
// ---------------------------------------------------------------------------

// Depot upgrades: permanent improvements bought with cash.
export const DEPOT_UPGRADES = [
  { id: 'radio', name: 'Dispatch Radio', price: 500, desc: 'Hear about rush jobs before anyone else.' },
  { id: 'gps', name: 'GPS Unit', price: 800, desc: 'Shorter routes, fewer wrong turns.' },
  { id: 'insulated-bag', name: 'Insulated Bag', price: 300, desc: 'Food arrives hot. Tips go up.' },
  { id: 'fragile-kit', name: 'Fragile Kit', price: 600, desc: 'Padding and straps. Fragile damage -50%.' },
  { id: 'rain-gear', name: 'Rain Gear', price: 250, desc: 'Rain no longer slows you down.' },
  { id: 'phone-mount', name: 'Phone Mount', price: 150, desc: 'See the route without stopping.' },
  { id: 'spare-tire', name: 'Spare Tire Kit', price: 200, desc: 'A flat no longer ends your shift.' },
  { id: 'coffee', name: 'Coffee Machine', price: 400, desc: 'Free coffee. Streaks last longer.' },
];

// Night shift bonuses: working after dark pays more.
export const NIGHT_SHIFT = [
  { hour: 22, payMult: 1.2, note: 'Late evening. Fewer cars, more pay.' },
  { hour: 23, payMult: 1.3, note: 'Night owls order food now.' },
  { hour: 0, payMult: 1.5, note: 'Midnight. The city is yours.' },
  { hour: 1, payMult: 1.5, note: 'The quiet hours. Big tips from insomniacs.' },
  { hour: 2, payMult: 1.4, note: 'Almost dawn. Last orders.' },
  { hour: 3, payMult: 1.3, note: 'Bakers and fishermen wake up.' },
  { hour: 4, payMult: 1.2, note: 'Dawn deliveries for the early birds.' },
];

// Leaderboard rivals: NPC couriers you compete with weekly.
export const COURIER_RIVALS = [
  { id: 'speedy-sam', name: 'Speedy Sam', deliveries: 142, rating: 4.9, desc: 'Fastest legs in the city.' },
  { id: 'careful-cara', name: 'Careful Cara', deliveries: 138, rating: 5.0, desc: 'Never damaged a parcel. Ever.' },
  { id: 'big-mike', name: 'Big Mike', deliveries: 155, rating: 4.6, desc: 'Drives a truck, delivers everything.' },
  { id: 'night-owl-nia', name: 'Night Owl Nia', deliveries: 120, rating: 4.8, desc: 'Owns the night shift.' },
  { id: 'rookie-ray', name: 'Rookie Ray', deliveries: 30, rating: 4.2, desc: 'New, keen, and learning fast.' },
];

// Client stories: flavour for the depot noticeboard.
export const CLIENT_STORIES = [
  'Mrs. Alvarez tips in cookies. Take the cookies.',
  'The office on floor 12 always orders at 12:59. Be ready.',
  'The collector on Hills Road inspects every corner of the box.',
  'The streamer rates you live. Smile at the doorbell camera.',
  'The elderly man on Old Town tells a story with every tip.',
  'The chef at the Night Market needs his ingredients before service.',
  'The tourist in the Hills always tips double and gets lost giving directions.',
];

// Delivery zones: grouped districts with a zone bonus.
export const DELIVERY_ZONES = [
  { id: 'central', name: 'Central', districts: ['downtown', 'mall', 'market'], bonus: 1.0 },
  { id: 'coastal', name: 'Coastal', districts: ['beach', 'port', 'docks'], bonus: 1.1 },
  { id: 'north', name: 'North', districts: ['airport', 'university', 'hills'], bonus: 1.15 },
  { id: 'south', name: 'South', districts: ['suburbs', 'oldtown', 'industrial'], bonus: 1.05 },
];

// Weather delivery notes.
export const COURIER_WEATHER = [
  { weather: 'clear', speedMult: 1.0, tipMult: 1.0, note: 'Perfect delivery weather.' },
  { weather: 'clouds', speedMult: 0.98, tipMult: 1.0, note: 'Overcast, easy riding.' },
  { weather: 'rain', speedMult: 0.85, tipMult: 1.3, note: 'Rain: slower, but customers tip more.' },
  { weather: 'storm', speedMult: 0.7, tipMult: 1.5, note: 'Storm: dangerous, generous tips.' },
  { weather: 'fog', speedMult: 0.9, tipMult: 1.1, note: 'Fog: slow down, stay safe.' },
];

// Pure helpers.

export function nightPayMult(hour) {
  const row = NIGHT_SHIFT.find((n) => n.hour === Math.floor(hour) % 24);
  return row ? row.payMult : 1.0;
}

export function zoneFor(districtId) {
  return DELIVERY_ZONES.find((z) => z.districts.includes(districtId)) || DELIVERY_ZONES[0];
}

export function zoneBonusFor(fromId, toId) {
  const a = zoneFor(fromId);
  const b = zoneFor(toId);
  return a.id === b.id ? a.bonus : (a.bonus + b.bonus) / 2;
}

export function leaderboardPlace(playerDeliveries, playerRating) {
  const all = COURIER_RIVALS.map((r) => ({ name: r.name, deliveries: r.deliveries, rating: r.rating }));
  all.push({ name: 'You', deliveries: playerDeliveries, rating: playerRating });
  all.sort((a, b) => b.deliveries - a.deliveries);
  return { place: all.findIndex((x) => x.name === 'You') + 1, board: all };
}

export function ratingNeededForRank(rankId) {
  const rank = COURIER_RANKS.find((r) => r.id === rankId);
  return rank ? { deliveries: rank.deliveriesNeeded, rating: rank.minRating } : null;
}

export function nextRank(currentRankId, deliveries, rating) {
  const idx = COURIER_RANKS.findIndex((r) => r.id === currentRankId);
  if (idx < 0 || idx >= COURIER_RANKS.length - 1) return null;
  const next = COURIER_RANKS[idx + 1];
  return {
    next,
    deliveriesLeft: Math.max(0, next.deliveriesNeeded - deliveries),
    ratingNeeded: next.minRating,
    ratingOk: rating >= next.minRating,
  };
}

export function fragileDamageEstimate(parcel, severity, vehicle) {
  if (parcel.fragile <= 0) return 0;
  return Math.round(severity * parcel.fragile * (10 - vehicle.durability) * 0.12);
}

export function tipEstimate(pay, stars, fragile) {
  let tip = 0;
  if (stars === 5) tip = Math.round(pay * 0.2);
  if (stars >= 4 && fragile >= 3) tip += 15;
  return tip;
}

export function starRatingFor(late, damaged, timeLeft, timeLimit) {
  let stars = 5;
  if (late) stars -= 2;
  if (damaged) stars -= 2;
  if (timeLeft < timeLimit * 0.25 && !late) stars -= 1;
  return Math.max(1, Math.min(5, stars));
}

export function vehicleRepairCost(wear) {
  return Math.round(wear * 3);
}

export function bestVehicleFor(cash, needCapacity) {
  const affordable = COURIER_VEHICLES.filter((v) => v.price <= cash && v.capacity >= needCapacity);
  if (affordable.length === 0) return COURIER_VEHICLES[0];
  affordable.sort((a, b) => b.speedBonus - a.speedBonus);
  return affordable[0];
}

export function dailyEarningsGoal(deliveries, avgPay) {
  return deliveries * avgPay;
}

export function streakBonus(streak) {
  if (streak >= 10) return 1.25;
  if (streak >= 5) return 1.15;
  if (streak >= 3) return 1.05;
  return 1;
}

export function weatherDeliveryNote(weather) {
  const w = COURIER_WEATHER.find((x) => x.weather === weather);
  return w || COURIER_WEATHER[0];
}


// ---------------------------------------------------------------------------
// Part 4 — Vehicle skins, depot radio chatter, insurance, courier slang
// ---------------------------------------------------------------------------

// Vehicle skins: cosmetic wraps for courier vehicles.
export const VEHICLE_SKINS = [
  { id: 'standard', name: 'Standard', price: 0, desc: 'Factory paint. Honest.' },
  { id: 'flame', name: 'Flame Wrap', price: 200, desc: 'Flames. Everybody sees you coming.' },
  { id: 'neon', name: 'Neon Wrap', price: 350, desc: 'Glows at night. Customers find you fast.' },
  { id: 'gold', name: 'Gold Wrap', price: 1000, desc: 'Gold. For the courier who has made it.' },
  { id: 'camo', name: 'Camo Wrap', price: 250, desc: 'Blend in. Deliver unseen.' },
  { id: 'checker', name: 'Checker Wrap', price: 150, desc: 'Taxi vibes. Classic.' },
  { id: 'pink', name: 'Pink Wrap', price: 300, desc: 'Impossible to miss. Tips go up.' },
];

// Depot radio chatter (flavour).
export const RADIO_CHATTER = [
  'Dispatch: rush job at the mall, who is close?',
  'Dispatch: the cake on Hills Road cannot wait. Somebody go.',
  'Driver 4: traffic is dead on the bridge. Avoid it.',
  'Dispatch: VIP client, double tip, be nice.',
  'Driver 7: I just delivered a parrot. A live one.',
  'Dispatch: rain coming. Rain gear on.',
  'Driver 2: the elevator at the tower is broken. Take the stairs.',
  'Dispatch: somebody ordered 40 pizzas. Good luck.',
  'Driver 9: the dog at Old Town is friendly. The gate is not.',
  'Dispatch: night shift starts at 22:00. Volunteers?',
];

// Package insurance tiers.
export const PACKAGE_INSURANCE = [
  { id: 'none', name: 'No Insurance', cost: 0, cover: 0, desc: 'You break it, you pay for it.' },
  { id: 'basic', name: 'Basic Cover', cost: 5, cover: 0.5, desc: 'Covers half the damage cost.' },
  { id: 'full', name: 'Full Cover', cost: 15, cover: 1.0, desc: 'Covers all damage. Sleep easy.' },
  { id: 'premium', name: 'Premium Cover', cost: 30, cover: 1.0, desc: 'Full cover plus a replacement guarantee.' },
];

// Courier slang (flavour).
export const COURIER_SLANG = [
  'A "hot bag" is food that cannot wait.',
  'A "ghost" is a customer who never answers the door.',
  'A "double" is two deliveries on one trip.',
  'A "dead run" is a trip back with no parcel.',
  'A "five-star" is a perfect delivery. Chase them.',
  'The "golden hour" is 18:00-19:00. Dinner rush.',
];

// Delivery time bands and their pay.
export const TIME_BANDS = [
  { id: 'breakfast', hours: [7, 8, 9], payMult: 1.1, note: 'Breakfast rush.' },
  { id: 'lunch', hours: [11, 12, 13], payMult: 1.2, note: 'Lunch rush. Busiest time.' },
  { id: 'dinner', hours: [18, 19, 20], payMult: 1.3, note: 'Dinner rush. Best tips.' },
  { id: 'late', hours: [22, 23, 0, 1], payMult: 1.5, note: 'Late night. Few drivers, big pay.' },
];

// Pure helpers.

export function timeBandFor(hour) {
  const h = Math.floor(hour) % 24;
  return TIME_BANDS.find((b) => b.hours.includes(h)) || { id: 'normal', hours: [], payMult: 1.0, note: 'Normal hours.' };
}

export function insurancePayout(insuranceId, damageCost) {
  const ins = PACKAGE_INSURANCE.find((i) => i.id === insuranceId);
  if (!ins) return 0;
  return Math.round(damageCost * ins.cover);
}

export function skinPrice(skinId) {
  const s = VEHICLE_SKINS.find((x) => x.id === skinId);
  return s ? s.price : 0;
}

export function chatterLine(rng) {
  return RADIO_CHATTER[Math.floor(rng() * RADIO_CHATTER.length)];
}

export function payWithTimeBand(basePay, hour) {
  const band = timeBandFor(hour);
  return Math.round(basePay * band.payMult);
}

export function deliveryEfficiency(deliveries, hoursWorked) {
  if (hoursWorked <= 0) return 0;
  return Math.round((deliveries / hoursWorked) * 10) / 10;
}


// ---------------------------------------------------------------------------
// Part 5 — App reviews, peak hours, courier hall of fame
// ---------------------------------------------------------------------------

export const APP_REVIEWS = [
  { stars: 5, text: 'My food arrived hot and fast!' },
  { stars: 5, text: 'The courier was so polite.' },
  { stars: 4, text: 'Quick delivery, all good.' },
  { stars: 3, text: 'It arrived. Eventually.' },
  { stars: 1, text: 'Hours late. Never again.' },
  { stars: 5, text: 'Best courier in the city!' },
];

export const PEAK_HOURS = [
  { hour: 12, demand: 'high', note: 'Lunch peak.' },
  { hour: 13, demand: 'high', note: 'Lunch peak.' },
  { hour: 19, demand: 'very-high', note: 'Dinner peak. The golden hour.' },
  { hour: 20, demand: 'high', note: 'Dinner continues.' },
  { hour: 0, demand: 'medium', note: 'Late night orders.' },
];

export const COURIER_HALL_OF_FAME = [
  { name: 'Speedy Sam', record: '142 deliveries in a week' },
  { name: 'Careful Cara', record: '500 deliveries, zero damage' },
  { name: 'Big Mike', record: 'Most parcels in one day: 48' },
  { name: 'Night Owl Nia', record: '100 night shifts in a row' },
];

export function reviewForStarsCourier(stars, rng) {
  const pool = APP_REVIEWS.filter((r) => r.stars === stars);
  if (pool.length === 0) return APP_REVIEWS[0];
  return pool[Math.floor(rng() * pool.length)];
}

export function peakDemandFor(hour) {
  const row = PEAK_HOURS.find((p) => p.hour === Math.floor(hour) % 24);
  return row ? row.demand : 'normal';
}

export function isPeakHour(hour) {
  return PEAK_HOURS.some((p) => p.hour === Math.floor(hour) % 24);
}


// ---------------------------------------------------------------------------
// Part 6 — Courier vehicle names, depot mottos
// ---------------------------------------------------------------------------

export const COURIER_VEHICLE_NAMES = [
  'The Parcel Rocket',
  'Speedy Delivery',
  'The Hot Box',
  'Parcel Force One',
  'The Midnight Runner',
];

export const DEPOT_MOTTOS = [
  'On time, every time.',
  'We deliver. You smile.',
  'Rain or shine, the parcel arrives.',
  'Fast is good. Safe is better. Both is best.',
];

export function randomVehicleName(rng) {
  return COURIER_VEHICLE_NAMES[Math.floor(rng() * COURIER_VEHICLE_NAMES.length)];
}

export function mottoFor(index) {
  return DEPOT_MOTTOS[index % DEPOT_MOTTOS.length];
}


// ---------------------------------------------------------------------------
// Part 7 — Courier proverbs, delivery records
// ---------------------------------------------------------------------------

export const COURIER_PROVERBS = [
  'The shortest route is the one you know by heart.',
  'A parcel delivered late is a promise broken.',
  'Rain is just the city testing you.',
  'Every door is a new story.',
];

export const DELIVERY_RECORDS = [
  { record: 'Fastest delivery', value: '4 minutes', holder: 'Speedy Sam' },
  { record: 'Most in a day', value: '48', holder: 'Big Mike' },
  { record: 'Longest streak', value: '62', holder: 'Careful Cara' },
];

export function proverbCourier(index) {
  return COURIER_PROVERBS[index % COURIER_PROVERBS.length];
}

export function deliveryRecordFor(recordName) {
  return DELIVERY_RECORDS.find((r) => r.record === recordName) || null;
}
