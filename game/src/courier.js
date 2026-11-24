export const DISTRICTS = [
  { id: 'downtown', name: 'Downtown', x: 0, z: 0, traffic: 8, fareMult: 1.2 },
  { id: 'harbour', name: 'Harbour', x: -400, z: 200, traffic: 5, fareMult: 1.0 },
  { id: 'uptown', name: 'Uptown', x: 300, z: -300, traffic: 6, fareMult: 1.3 },
  { id: 'old-town', name: 'Old Town', x: -200, z: -400, traffic: 4, fareMult: 0.9 },
  { id: 'airport', name: 'Airport', x: 800, z: 500, traffic: 7, fareMult: 1.5 },
  { id: 'university', name: 'University', x: 200, z: 400, traffic: 6, fareMult: 1.0 },
  { id: 'market', name: 'Market District', x: -100, z: 100, traffic: 9, fareMult: 1.1 },
  { id: 'suburbs', name: 'Suburbs', x: 600, z: -600, traffic: 2, fareMult: 0.8 },
  { id: 'industrial', name: 'Industrial Zone', x: -600, z: -100, traffic: 5, fareMult: 0.9 },
  { id: 'beach', name: 'Beachfront', x: -300, z: 700, traffic: 4, fareMult: 1.2 },
  { id: 'mall', name: 'Grand Mall', x: 100, z: -100, traffic: 8, fareMult: 1.1 },
  { id: 'hospital', name: 'Hospital Quarter', x: 400, z: 100, traffic: 6, fareMult: 1.0 },
];

export const PARCEL_TYPES = [
  { id: 'letter', name: 'Letter', weight: 0.1, fragile: 0, basePay: 5, size: 'small', desc: 'A plain envelope' },
  { id: 'documents', name: 'Documents', weight: 0.5, fragile: 0, basePay: 8, size: 'small', desc: 'Important papers' },
  { id: 'food', name: 'Food Delivery', weight: 1.5, fragile: 1, basePay: 10, size: 'small', desc: 'Hot food, keep it level' },
  { id: 'groceries', name: 'Groceries', weight: 4, fragile: 1, basePay: 12, size: 'medium', desc: 'A bag of groceries' },
  { id: 'flowers', name: 'Flowers', weight: 1, fragile: 2, basePay: 15, size: 'medium', desc: 'Fresh flowers, handle gently' },
  { id: 'electronics', name: 'Electronics', weight: 2, fragile: 3, basePay: 20, size: 'medium', desc: 'Fragile gadgets' },
  { id: 'wine', name: 'Wine Case', weight: 6, fragile: 3, basePay: 25, size: 'medium', desc: 'Bottles that hate bumps' },
  { id: 'cake', name: 'Wedding Cake', weight: 3, fragile: 4, basePay: 40, size: 'large', desc: 'One bump and it is over' },
  { id: 'art', name: 'Artwork', weight: 5, fragile: 4, basePay: 50, size: 'large', desc: 'Priceless and fragile' },
  { id: 'medicine', name: 'Medicine', weight: 0.5, fragile: 1, basePay: 18, size: 'small', desc: 'Urgent medical supplies' },
  { id: 'books', name: 'Books', weight: 3, fragile: 0, basePay: 9, size: 'medium', desc: 'A heavy box of books' },
  { id: 'clothing', name: 'Clothing', weight: 2, fragile: 0, basePay: 10, size: 'medium', desc: 'A parcel of clothes' },
  { id: 'furniture', name: 'Furniture', weight: 25, fragile: 1, basePay: 45, size: 'large', desc: 'A flat-pack wardrobe' },
  { id: 'instruments', name: 'Instrument', weight: 4, fragile: 3, basePay: 35, size: 'large', desc: 'A delicate violin' },
  { id: 'jewellery', name: 'Jewellery', weight: 0.2, fragile: 2, basePay: 60, size: 'small', desc: 'Small, valuable, insured' },
  { id: 'plants', name: 'Plants', weight: 2, fragile: 2, basePay: 12, size: 'medium', desc: 'Potted plants' },
  { id: 'toys', name: 'Toys', weight: 1.5, fragile: 1, basePay: 8, size: 'medium', desc: 'A box of toys' },
  { id: 'tools', name: 'Tools', weight: 8, fragile: 0, basePay: 14, size: 'medium', desc: 'Heavy tools' },
  { id: 'pet-supplies', name: 'Pet Supplies', weight: 3, fragile: 0, basePay: 11, size: 'medium', desc: 'Food and toys for pets' },
  { id: 'antiques', name: 'Antiques', weight: 4, fragile: 4, basePay: 70, size: 'large', desc: 'Old, rare and very breakable' },
];

export const COURIER_VEHICLES = [
  { id: 'bicycle', name: 'Bicycle', price: 0, capacity: 2, speedBonus: 0, durability: 30, desc: 'Pedal power' },
  { id: 'scooter', name: 'Scooter', price: 300, capacity: 3, speedBonus: 0.15, durability: 50, desc: 'Zippy and cheap to run' },
  { id: 'motorbike', name: 'Motorbike', price: 800, capacity: 3, speedBonus: 0.3, durability: 60, desc: 'Fast through traffic' },
  { id: 'van', name: 'Delivery Van', price: 2500, capacity: 6, speedBonus: 0.2, durability: 80, desc: 'Room for everything' },
  { id: 'sports-car', name: 'Sports Car', price: 8000, capacity: 2, speedBonus: 0.5, durability: 70, desc: 'Absurdly fast' },
  { id: 'truck', name: 'Box Truck', price: 12000, capacity: 10, speedBonus: 0.1, durability: 90, desc: 'The big hauler' },
];

export const COURIER_RANKS = [
  { id: 'rookie', name: 'Rookie', deliveriesNeeded: 0, minRating: 0, perk: 'Board access' },
  { id: 'regular', name: 'Regular', deliveriesNeeded: 10, minRating: 3.5, perk: 'More board jobs' },
  { id: 'pro', name: 'Pro', deliveriesNeeded: 30, minRating: 4.0, perk: 'Rush jobs' },
  { id: 'elite', name: 'Elite', deliveriesNeeded: 75, minRating: 4.3, perk: 'Multi-stop jobs' },
  { id: 'legend', name: 'Legend', deliveriesNeeded: 150, minRating: 4.6, perk: 'Best pay in the city' },
];

export const URGENCY = [
  { id: 'standard', name: 'Standard', timeMult: 1.5, payMult: 1, minRank: 'rookie' },
  { id: 'express', name: 'Express', timeMult: 1, payMult: 1.5, minRank: 'rookie' },
  { id: 'rush', name: 'Rush', timeMult: 0.7, payMult: 2.2, minRank: 'regular' },
  { id: 'critical', name: 'Critical', timeMult: 0.5, payMult: 3.5, minRank: 'pro' },
];

export const COURIER_MISSIONS = [
  { id: 'first-delivery', name: 'First Delivery', desc: 'Complete your first delivery', reward: 50 },
  { id: 'deliver-10', name: 'Ten Deliveries', desc: 'Complete 10 deliveries', reward: 150 },
  { id: 'deliver-50', name: 'Fifty Deliveries', desc: 'Complete 50 deliveries', reward: 500 },
  { id: 'five-star', name: 'Five Star Service', desc: 'Earn a five star rating', reward: 100 },
  { id: 'rush-ontime', name: 'Rush Master', desc: 'Deliver 5 rush jobs on time', reward: 250 },
  { id: 'fragile-safe', name: 'Gentle Hands', desc: 'Deliver 10 fragile parcels undamaged', reward: 200 },
  { id: 'streak-5', name: 'Hot Streak', desc: 'Reach a 5 delivery streak', reward: 150 },
  { id: 'multi-stop', name: 'Multi Stop Pro', desc: 'Complete a multi-stop job', reward: 200 },
  { id: 'earn-1000', name: 'Thousand Earner', desc: 'Earn 1000 in total', reward: 300 },
  { id: 'rank-pro', name: 'Pro Courier', desc: 'Reach Pro rank', reward: 400 },
];

export const FEEDBACK = {
  1: ['Terrible, never again', 'Late and damaged', 'Worst courier ever', 'Parcel arrived in pieces'],
  2: ['Slow and sloppy', 'Not great', 'Could do better', 'Disappointed'],
  3: ['Average delivery', 'It arrived, eventually', 'Fine, nothing special', 'Okay service'],
  4: ['Fast and friendly', 'Great service', 'Parcel arrived in perfect shape', 'Would order again'],
  5: ['Flawless delivery!', 'Fastest courier in the city', 'Absolutely perfect', 'Five stars, no notes'],
};

export const TRAFFIC_EVENTS = [
  { id: 'jam', name: 'Traffic Jam', desc: 'Gridlock on the main road', timeCost: 30, chance: 0.25 },
  { id: 'shortcut', name: 'Secret Shortcut', desc: 'A back alley cuts through', timeCost: -15, chance: 0.15 },
  { id: 'roadworks', name: 'Roadworks', desc: 'Cones everywhere', timeCost: 20, chance: 0.2 },
  { id: 'accident', name: 'Accident Ahead', desc: 'A crash blocks the lane', timeCost: 45, chance: 0.1 },
  { id: 'green-wave', name: 'Green Wave', desc: 'Every light turns green', timeCost: -10, chance: 0.3 },
];

export const CLIENT_TYPES = [
  { id: 'regular', name: 'Regular', tipChance: 0.2, patience: 'normal', note: 'Orders every week' },
  { id: 'vip', name: 'VIP', tipChance: 0.6, patience: 'low', note: 'Tips well, expects speed' },
  { id: 'business', name: 'Business', tipChance: 0.3, patience: 'normal', note: 'Recurring corporate orders' },
  { id: 'elderly', name: 'Elderly', tipChance: 0.4, patience: 'high', note: 'Kind and patient' },
  { id: 'student', name: 'Student', tipChance: 0.1, patience: 'high', note: 'Broke but friendly' },
  { id: 'chef', name: 'Chef', tipChance: 0.5, patience: 'low', note: 'Needs supplies now' },
  { id: 'artist', name: 'Artist', tipChance: 0.35, patience: 'normal', note: 'Fragile cargo, big heart' },
  { id: 'doctor', name: 'Doctor', tipChance: 0.45, patience: 'low', note: 'Medical urgency' },
];

export const DELIVERY_TIPS = [
  'Keep fragile parcels upright.',
  'A smile earns better tips.',
  'Plan your route before you ride.',
  'Check the address twice.',
  'Rain slows you down, leave early.',
  'Never stack heavy parcels on fragile ones.',
  'A full tank beats a missed deadline.',
  'Regulars tip better when you remember their name.',
];

export const DEPOT_UPGRADES = [
  { id: 'shelves', name: 'Better Shelves', price: 200, desc: 'More room for parcels' },
  { id: 'ramp', name: 'Loading Ramp', price: 350, desc: 'Faster loading' },
  { id: 'locker', name: 'Secure Lockers', price: 150, desc: 'Keep parcels safe overnight' },
  { id: 'coffee', name: 'Coffee Machine', price: 100, desc: 'Fuel for the couriers' },
  { id: 'tracker', name: 'GPS Trackers', price: 400, desc: 'Live tracking for every job' },
  { id: 'garage', name: 'Garage Bay', price: 800, desc: 'Covered parking for vehicles' },
  { id: 'radio', name: 'Radio Room', price: 250, desc: 'Dispatch in real time' },
  { id: 'rest-room', name: 'Rest Room', price: 300, desc: 'A place to recharge between runs' },
];

export const NIGHT_SHIFT = [
  { hour: 22, payMult: 1.2, note: 'Late night premium' },
  { hour: 23, payMult: 1.3, note: 'Quiet streets' },
  { hour: 0, payMult: 1.5, note: 'Midnight rates' },
  { hour: 1, payMult: 1.5, note: 'Dead of night' },
  { hour: 2, payMult: 1.4, note: 'Almost dawn' },
  { hour: 3, payMult: 1.3, note: 'Early birds' },
  { hour: 4, payMult: 1.2, note: 'Dawn deliveries' },
];

export const COURIER_RIVALS = [
  { id: 'flash', name: 'Flash', deliveries: 220, rating: 4.8, desc: 'The fastest rider in town' },
  { id: 'steady-ed', name: 'Steady Ed', deliveries: 180, rating: 4.9, desc: 'Never late, never rushed' },
  { id: 'big-mike', name: 'Big Mike', deliveries: 150, rating: 4.2, desc: 'Hauls the heavy loads' },
  { id: 'night-owl', name: 'Night Owl', deliveries: 130, rating: 4.5, desc: 'Owns the night shift' },
  { id: 'rookie-rita', name: 'Rookie Rita', deliveries: 40, rating: 4.7, desc: 'New but hungry' },
];

export const CLIENT_STORIES = [
  'A chef once tipped a courier a whole cake.',
  'The mayor\'s cat escaped during a delivery and was found in the van.',
  'A violin arrived intact after three city blocks of potholes.',
  'One courier delivered a wedding ring five minutes before the ceremony.',
  'The hospital quarter orders medicine at the same time every day.',
  'A rival courier once delivered a parcel to the wrong twin.',
  'The grand mall orders peak every Friday at noon.',
];

export const DELIVERY_ZONES = [
  { id: 'central', name: 'Central Zone', districts: ['downtown', 'market', 'mall'], bonus: 1.1 },
  { id: 'north', name: 'North Zone', districts: ['uptown', 'university', 'suburbs'], bonus: 1.0 },
  { id: 'south', name: 'South Zone', districts: ['harbour', 'beach', 'old-town'], bonus: 1.05 },
  { id: 'west', name: 'West Zone', districts: ['industrial', 'airport', 'hospital'], bonus: 0.95 },
];

export const COURIER_WEATHER = [
  { weather: 'clear', speedMult: 1, tipMult: 1, note: 'Perfect riding weather' },
  { weather: 'cloudy', speedMult: 0.95, tipMult: 1, note: 'Grey but rideable' },
  { weather: 'rain', speedMult: 0.9, tipMult: 1.2, note: 'Wet roads, sympathetic tips' },
  { weather: 'storm', speedMult: 0.75, tipMult: 1.5, note: 'Dangerous, but the tips are huge' },
  { weather: 'fog', speedMult: 0.85, tipMult: 1.1, note: 'Slow down, stay safe' },
];

export const VEHICLE_SKINS = [
  { id: 'flame', name: 'Flame Decals', price: 100, desc: 'Hot rods for hot deliveries' },
  { id: 'neon', name: 'Neon Lights', price: 150, desc: 'Glow through the night' },
  { id: 'gold', name: 'Gold Trim', price: 300, desc: 'Look like a legend' },
  { id: 'camo', name: 'Camo Wrap', price: 120, desc: 'Blend into the city' },
  { id: 'checker', name: 'Checker Flag', price: 80, desc: 'Race day vibes' },
  { id: 'matte', name: 'Matte Black', price: 200, desc: 'Stealth mode' },
  { id: 'rainbow', name: 'Rainbow Paint', price: 250, desc: 'Impossible to miss' },
];

export const RADIO_CHATTER = [
  'Dispatch to all riders, lunch rush incoming.',
  'Anyone near the harbour? Pick up waiting.',
  'Traffic building on the main bridge.',
  'Nice work on the airport run, Flash.',
  'Rain coming in, watch the corners.',
  'The mall needs three riders, now.',
  'Remember, fragile means fragile.',
  'Coffee is on at the depot.',
  'Night shift, check your lights.',
  'A customer left a five star review, keep it up.',
];

export const PACKAGE_INSURANCE = [
  { id: 'basic', name: 'Basic Cover', cost: 10, cover: 0.5, desc: 'Covers half the damage' },
  { id: 'standard', name: 'Standard Cover', cost: 25, cover: 0.75, desc: 'Covers most of the damage' },
  { id: 'premium', name: 'Premium Cover', cost: 50, cover: 1, desc: 'Full cover, no questions' },
  { id: 'none', name: 'No Insurance', cost: 0, cover: 0, desc: 'Ride at your own risk' },
];

export const COURIER_SLANG = [
  'On the fly means already out for delivery.',
  'Deadheading is riding back empty.',
  'A ghost drop is a parcel left with no signature.',
  'The cage is where parcels wait for pickup.',
  'Rush hour is both the best and worst time to ride.',
  'A bunny hop is the shortcut over the kerb.',
];

export const TIME_BANDS = [
  { id: 'morning', hours: [6, 7, 8, 9, 10], payMult: 1, note: 'Morning rush' },
  { id: 'midday', hours: [11, 12, 13, 14], payMult: 1.1, note: 'Lunch peak' },
  { id: 'evening', hours: [17, 18, 19, 20], payMult: 1.2, note: 'Evening rush' },
  { id: 'night', hours: [21, 22, 23, 0, 1, 2, 3, 4, 5], payMult: 1.3, note: 'Night premium' },
];

export const APP_REVIEWS = [
  { stars: 5, text: 'Fastest delivery I have ever had!' },
  { stars: 5, text: 'The courier was friendly and the parcel perfect.' },
  { stars: 4, text: 'Good service, slightly late.' },
  { stars: 3, text: 'It arrived, that is about it.' },
  { stars: 2, text: 'Slow and the box was dented.' },
  { stars: 1, text: 'Never again.' },
];

export const PEAK_HOURS = [
  { hour: 8, demand: 'high', note: 'Morning commute parcels' },
  { hour: 12, demand: 'high', note: 'Lunch rush' },
  { hour: 18, demand: 'high', note: 'Evening rush' },
  { hour: 22, demand: 'medium', note: 'Late night orders' },
  { hour: 3, demand: 'low', note: 'Dead quiet' },
];

export const COURIER_HALL_OF_FAME = [
  { name: 'Flash', record: '300 deliveries in one month' },
  { name: 'Steady Ed', record: '1000 deliveries without a single late one' },
  { name: 'Night Owl', record: 'A full year of night shifts' },
  { name: 'Big Mike', record: 'Heaviest single parcel ever delivered' },
];

export const COURIER_VEHICLE_NAMES = ['Speedy', 'Old Faithful', 'The Rocket', 'Parcel Pal', 'Zoomer'];

export const DEPOT_MOTTOS = [
  'Fast, safe, on time.',
  'Every parcel matters.',
  'Rain or shine, we ride.',
  'The city never waits, neither do we.',
];

export const COURIER_PROVERBS = [
  'A late parcel is a lost customer.',
  'The shortest road is the one you know.',
  'Ride smooth, deliver fast.',
  'Tips follow smiles.',
];

export const DELIVERY_RECORDS = [
  { record: 'Fastest delivery', value: '4 minutes', holder: 'Flash' },
  { record: 'Most deliveries in a day', value: '42', holder: 'Steady Ed' },
  { record: 'Longest streak', value: '30 days', holder: 'Night Owl' },
];

function distBetween(a, b) {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dz * dz);
}

export function districtById(id) {
  return DISTRICTS.find((d) => d.id === id) || DISTRICTS[0];
}

export function jobPay(parcel, from, to, urgency, rankMult) {
  const dist = distBetween(from, to);
  const distancePay = 6 * (dist / 100);
  const raw = (parcel.basePay + distancePay) * urgency.payMult * from.fareMult * to.fareMult * (rankMult || 1);
  return Math.max(5, Math.round(raw));
}

export function timeLimitFor(parcel, from, to, urgency, speedBonus) {
  const dist = distBetween(from, to);
  const base = 45 + 12 * (dist / 100);
  const limit = base * urgency.timeMult * (1 - (speedBonus || 0));
  return Math.max(30, Math.round(limit));
}

export function nightPayMult(hour) {
  const row = NIGHT_SHIFT.find((n) => n.hour === hour);
  return row ? row.payMult : 1;
}

export function zoneFor(districtId) {
  return DELIVERY_ZONES.find((z) => z.districts.includes(districtId)) || DELIVERY_ZONES[0];
}

export function zoneBonusFor(fromId, toId) {
  const za = zoneFor(fromId);
  const zb = zoneFor(toId);
  if (za.id === zb.id) return za.bonus;
  return (za.bonus + zb.bonus) / 2;
}

export function leaderboardPlace(playerDeliveries, playerRating) {
  const board = COURIER_RIVALS.map((r) => ({ name: r.name, deliveries: r.deliveries, rating: r.rating }));
  board.push({ name: 'You', deliveries: playerDeliveries, rating: playerRating });
  board.sort((a, b) => b.deliveries - a.deliveries);
  const place = board.findIndex((b) => b.name === 'You') + 1;
  return { place, board };
}

export function ratingNeededForRank(rankId) {
  const rank = COURIER_RANKS.find((r) => r.id === rankId);
  if (!rank) return null;
  return { deliveries: rank.deliveriesNeeded, rating: rank.minRating };
}

export function nextRank(currentRankId, deliveries, rating) {
  const idx = COURIER_RANKS.findIndex((r) => r.id === currentRankId);
  if (idx < 0 || idx >= COURIER_RANKS.length - 1) return null;
  const next = COURIER_RANKS[idx + 1];
  return {
    next,
    deliveriesLeft: Math.max(0, next.deliveriesNeeded - deliveries),
    ratingNeeded: next.minRating,
    ratingMet: rating >= next.minRating,
  };
}

export function fragileDamageEstimate(parcel, severity, vehicle) {
  if (!parcel.fragile) return 0;
  const dmg = severity * parcel.fragile * 10 - vehicle.durability * 0.12;
  return Math.max(0, Math.round(dmg));
}

export function tipEstimate(pay, stars, fragile) {
  if (stars >= 4 && fragile >= 3) return Math.round(pay * 0.2) + 15;
  if (stars >= 4) return Math.round(pay * 0.1);
  if (stars >= 3) return Math.round(pay * 0.05);
  return 0;
}

export function starRatingFor(late, damaged, timeLeft, timeLimit) {
  let stars = 5;
  if (late) stars -= 2;
  if (damaged) stars -= 2;
  if (!late && timeLeft < timeLimit * 0.25) stars -= 1;
  return Math.max(1, Math.min(5, stars));
}

export function vehicleRepairCost(wear) {
  return Math.round(wear * 3);
}

export function bestVehicleFor(cash, capacity) {
  const fitting = COURIER_VEHICLES.filter((v) => v.capacity >= capacity && v.price <= cash);
  if (fitting.length) return fitting.sort((a, b) => b.speedBonus - a.speedBonus)[0];
  return COURIER_VEHICLES[0];
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
  return COURIER_WEATHER.find((w) => w.weather === weather) || COURIER_WEATHER[0];
}

export function timeBandFor(hour) {
  const band = TIME_BANDS.find((b) => b.hours.includes(hour));
  if (band) return band;
  return { id: 'normal', hours: [], payMult: 1, note: 'Normal hours' };
}

export function insurancePayout(insuranceId, damageCost) {
  const ins = PACKAGE_INSURANCE.find((i) => i.id === insuranceId);
  if (!ins) return 0;
  return Math.round(damageCost * ins.cover);
}

export function skinPrice(skinId) {
  const skin = VEHICLE_SKINS.find((s) => s.id === skinId);
  return skin ? skin.price : 0;
}

export function chatterLine(rng) {
  const r = rng || Math.random;
  return RADIO_CHATTER[Math.floor(r() * RADIO_CHATTER.length)];
}

export function payWithTimeBand(basePay, hour) {
  return Math.round(basePay * timeBandFor(hour).payMult);
}

export function deliveryEfficiency(deliveries, hoursWorked) {
  if (!hoursWorked) return 0;
  return Math.round((deliveries / hoursWorked) * 100) / 100;
}

export function reviewForStarsCourier(stars, rng) {
  const r = rng || Math.random;
  const matches = APP_REVIEWS.filter((x) => x.stars === stars);
  if (!matches.length) return APP_REVIEWS[0];
  return matches[Math.floor(r() * matches.length)];
}

export function peakDemandFor(hour) {
  const row = PEAK_HOURS.find((p) => p.hour === hour);
  return row ? row.demand : 'normal';
}

export function isPeakHour(hour) {
  return PEAK_HOURS.some((p) => p.hour === hour);
}

export function randomVehicleName(rng) {
  const r = rng || Math.random;
  return COURIER_VEHICLE_NAMES[Math.floor(r() * COURIER_VEHICLE_NAMES.length)];
}

export function mottoFor(index) {
  return DEPOT_MOTTOS[((index % DEPOT_MOTTOS.length) + DEPOT_MOTTOS.length) % DEPOT_MOTTOS.length];
}

export function proverbCourier(index) {
  return COURIER_PROVERBS[((index % COURIER_PROVERBS.length) + COURIER_PROVERBS.length) % COURIER_PROVERBS.length];
}

export function deliveryRecordFor(name) {
  return DELIVERY_RECORDS.find((r) => r.record === name) || null;
}

export function createCourierSystem(deps = {}) {
  const rng = typeof deps.rng === 'function' ? deps.rng : Math.random;
  const getHour = typeof deps.getHour === 'function' ? deps.getHour : () => 12;
  const getDay = typeof deps.getDay === 'function' ? deps.getDay : () => 1;
  const getCash = typeof deps.getCash === 'function' ? deps.getCash : () => 0;
  const addCash = typeof deps.addCash === 'function' ? deps.addCash : () => {};
  const addHeat = typeof deps.addHeat === 'function' ? deps.addHeat : () => {};
  const log = typeof deps.log === 'function' ? deps.log : () => {};
  const getPlayerPos = typeof deps.getPlayerPos === 'function' ? deps.getPlayerPos : () => ({ x: 0, z: 0 });
  const getWeather = typeof deps.getWeather === 'function' ? deps.getWeather : () => ({ condition: 'clear' });

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

  function rankRecord() {
    return COURIER_RANKS.find((r) => r.id === state.rank) || COURIER_RANKS[0];
  }

  function rankIndex() {
    return COURIER_RANKS.findIndex((r) => r.id === state.rank);
  }

  function vehicleRecord() {
    return COURIER_VEHICLES.find((v) => v.id === state.vehicleId) || COURIER_VEHICLES[0];
  }

  function rankMult() {
    return 1 + rankIndex() * 0.15;
  }

  function avgRating() {
    return state.ratingCount > 0 ? state.ratingSum / state.ratingCount : 0;
  }

  function refreshRank() {
    let best = COURIER_RANKS[0];
    for (const r of COURIER_RANKS) {
      if (state.totalDeliveries >= r.deliveriesNeeded && avgRating() >= r.minRating) best = r;
    }
    state.rank = best.id;
  }

  function addRating(stars) {
    state.ratingSum += stars;
    state.ratingCount += 1;
  }

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const mission = COURIER_MISSIONS.find((m) => m.id === id);
    if (!mission) return;
    let done = false;
    if (id === 'first-delivery') done = state.totalDeliveries >= 1;
    else if (id === 'deliver-10') done = state.totalDeliveries >= 10;
    else if (id === 'deliver-50') done = state.totalDeliveries >= 50;
    else if (id === 'five-star') done = avgRating() >= 5 || state.ratingSum > 0 && (state.ratingSum / state.ratingCount) >= 4.99;
    else if (id === 'rush-ontime') done = state.rushOnTime >= 5;
    else if (id === 'fragile-safe') done = state.fragileSafe >= 10;
    else if (id === 'streak-5') done = state.bestStreak >= 5;
    else if (id === 'multi-stop') done = state.multiStopDone >= 1;
    else if (id === 'earn-1000') done = state.totalEarned >= 1000;
    else if (id === 'rank-pro') done = rankIndex() >= 2;
    if (!done) return;
    state.missionsDone[id] = true;
    addCash(mission.reward);
    log(`Mission complete: ${mission.name}`);
  }

  function makeJob() {
    const parcel = PARCEL_TYPES[Math.floor(rng() * PARCEL_TYPES.length)];
    const from = DISTRICTS[Math.floor(rng() * DISTRICTS.length)];
    let to = DISTRICTS[Math.floor(rng() * DISTRICTS.length)];
    while (to.id === from.id) to = DISTRICTS[Math.floor(rng() * DISTRICTS.length)];
    const urgency = URGENCY[Math.floor(rng() * URGENCY.length)];
    const vehicle = vehicleRecord();
    const pay = jobPay(parcel, from, to, urgency, rankMult());
    const limit = timeLimitFor(parcel, from, to, urgency, vehicle.speedBonus);
    const multi = rankIndex() > 1 && rng() < 0.25;
    const stops = [];
    if (multi) {
      const extra = DISTRICTS[Math.floor(rng() * DISTRICTS.length)];
      stops.push({ districtId: extra.id, parcelId: parcel.id, done: false });
    }
    return {
      id: `job-${Date.now()}-${Math.floor(rng() * 100000)}`,
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

  function completeJob(job, expired) {
    const late = expired || job.timeLeft <= 0;
    const damaged = job.damage >= 50;
    const stars = starRatingFor(late, damaged, job.timeLeft, job.timeLimit);
    let pay = job.pay;
    if (expired) pay = Math.floor(job.pay / 2);
    const tip = tipEstimate(pay, stars, job.fragile);
    const bonus = Math.round(pay * (streakBonus(state.streak) - 1));
    const total = pay + tip + bonus;
    addCash(total);
    state.totalDeliveries += 1;
    state.totalEarned += total;
    state.tips += tip;
    if (late) {
      state.totalLate += 1;
      state.streak = 0;
    } else {
      state.streak += 1;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    }
    if (damaged) state.totalDamaged += 1;
    if (job.urgencyId === 'rush' && !late) state.rushOnTime += 1;
    if (job.fragile >= 1 && !damaged) state.fragileSafe += 1;
    if (job.multi) state.multiStopDone += 1;
    addRating(stars);
    const record = {
      jobId: job.id,
      parcelName: job.parcelName,
      pay: total,
      stars,
      late,
      day: getDay(),
    };
    state.completedJobs.push(record);
    if (state.completedJobs.length > 20) state.completedJobs.shift();
    state.activeJobs = state.activeJobs.filter((j) => j.id !== job.id);
    refreshRank();
    checkMission('first-delivery');
    checkMission('deliver-10');
    checkMission('deliver-50');
    checkMission('five-star');
    checkMission('rush-ontime');
    checkMission('fragile-safe');
    checkMission('streak-5');
    checkMission('multi-stop');
    checkMission('earn-1000');
    checkMission('rank-pro');
    log(`Delivered ${job.parcelName} for ${total} (${stars} stars)`);
    return { ok: true, job, stars, pay: total, tip, late, damaged, expired: !!expired };
  }

  function rollTrafficEvent(job) {
    let roll = rng();
    let acc = 0;
    for (const ev of TRAFFIC_EVENTS) {
      acc += ev.chance;
      if (roll < acc) {
        job.timeLeft = Math.max(0, job.timeLeft + ev.timeCost);
        job.timeLeft -= ev.timeCost * 0;
        log(`Traffic event: ${ev.name}`);
        return { ok: true, event: ev };
      }
    }
    return { ok: true, event: null };
  }

  const system = {
    state,

    board() {
      if (state.boardDay !== getDay() || state.board.length === 0) this.refreshBoard();
      return state.board;
    },

    refreshBoard() {
      state.board = [];
      const count = 5 + rankIndex();
      for (let i = 0; i < count; i++) state.board.push(makeJob());
      state.boardDay = getDay();
      return state.board;
    },

    acceptJob(jobId) {
      const idx = state.board.findIndex((j) => j.id === jobId);
      if (idx < 0) return { ok: false, error: 'job not on board' };
      const vehicle = vehicleRecord();
      if (state.activeJobs.length >= vehicle.capacity) return { ok: false, error: 'vehicle full' };
      const job = state.board.splice(idx, 1)[0];
      job.status = 'accepted';
      state.activeJobs.push(job);
      state.jobsToday += 1;
      log(`Accepted job: ${job.parcelName}`);
      return { ok: true, job };
    },

    pickup(jobId) {
      const job = state.activeJobs.find((j) => j.id === jobId);
      if (!job) return { ok: false, error: 'no such active job' };
      if (job.pickedUp) return { ok: false, error: 'already picked up' };
      const pos = getPlayerPos();
      const from = districtById(job.fromId);
      const d = Math.sqrt((pos.x - from.x) ** 2 + (pos.z - from.z) ** 2);
      if (d > 60) return { ok: false, error: 'too far from pickup' };
      job.pickedUp = true;
      job.status = 'picked-up';
      log(`Picked up ${job.parcelName}`);
      return { ok: true, job };
    },

    deliver(jobId) {
      const job = state.activeJobs.find((j) => j.id === jobId);
      if (!job) return { ok: false, error: 'no such active job' };
      if (!job.pickedUp) return { ok: false, error: 'not picked up yet' };
      const pos = getPlayerPos();
      const to = districtById(job.toId);
      const d = Math.sqrt((pos.x - to.x) ** 2 + (pos.z - to.z) ** 2);
      if (d > 60) return { ok: false, error: 'too far from drop-off' };
      return completeJob(job, false);
    },

    reportBump(severity) {
      const hits = [];
      for (const job of state.activeJobs) {
        if (!job.pickedUp || !job.fragile) continue;
        const vehicle = vehicleRecord();
        const dmg = Math.min(100, severity * job.fragile * 10 - vehicle.durability * 0.12);
        if (dmg <= 0) continue;
        const before = job.damage;
        job.damage = Math.min(100, job.damage + dmg);
        if (job.damage >= 50 && before < 50) {
          state.damageEvents += 1;
          log(`Warning: ${job.parcelName} is badly damaged`);
        }
        hits.push({ jobId: job.id, damage: Math.round(dmg) });
      }
      return { ok: true, hits };
    },

    buyVehicle(vehicleId) {
      if (!COURIER_VEHICLES.find((v) => v.id === vehicleId)) return { ok: false, error: 'unknown vehicle' };
      if (state.vehiclesOwned.includes(vehicleId)) {
        state.vehicleId = vehicleId;
        return { ok: true, equipped: vehicleId };
      }
      const vehicle = COURIER_VEHICLES.find((v) => v.id === vehicleId);
      if (getCash() < vehicle.price) return { ok: false, error: 'not enough cash' };
      addCash(-vehicle.price);
      state.vehiclesOwned.push(vehicleId);
      state.vehicleId = vehicleId;
      state.vehicleWear = 0;
      log(`Bought vehicle: ${vehicle.name}`);
      return { ok: true, vehicle };
    },

    repairVehicle() {
      if (state.vehicleWear === 0) return { ok: false, error: 'no wear to repair' };
      const cost = vehicleRepairCost(state.vehicleWear);
      if (getCash() < cost) return { ok: false, error: 'not enough cash' };
      addCash(-cost);
      state.vehicleWear = 0;
      log(`Repaired vehicle for ${cost}`);
      return { ok: true, cost };
    },

    cancelJob(jobId) {
      const idx = state.activeJobs.findIndex((j) => j.id === jobId);
      if (idx < 0) return { ok: false, error: 'no such active job' };
      const job = state.activeJobs.splice(idx, 1)[0];
      addRating(2);
      state.streak = 0;
      log(`Cancelled job: ${job.parcelName}`);
      refreshRank();
      return { ok: true, job };
    },

    planRoute(jobId) {
      const job = state.activeJobs.find((j) => j.id === jobId) || state.board.find((j) => j.id === jobId);
      if (!job) return { ok: false, error: 'no such job' };
      const pos = getPlayerPos();
      const from = districtById(job.fromId);
      const to = districtById(job.toId);
      const pickupDist = Math.round(Math.sqrt((pos.x - from.x) ** 2 + (pos.z - from.z) ** 2));
      const deliveryDist = Math.round(distBetween(from, to));
      const totalDist = pickupDist + deliveryDist;
      const estSeconds = Math.round(totalDist / 10);
      const slack = job.timeLeft - estSeconds;
      const trafficNote = from.traffic >= 8 || to.traffic >= 8 ? 'Heavy traffic expected' : 'Traffic looks clear';
      const route = {
        jobId: job.id,
        pickupName: from.name,
        dropoffName: to.name,
        pickupDistance: pickupDist,
        deliveryDistance: deliveryDist,
        totalDistance: totalDist,
        estimatedSeconds: estSeconds,
        timeLeft: job.timeLeft,
        slack,
        trafficNote,
        stops: job.stops.map((s) => districtById(s.districtId).name),
      };
      return { ok: true, route };
    },

    bestJobForPlayer() {
      if (state.board.length === 0) return { ok: false, error: 'board is empty' };
      const pos = getPlayerPos();
      let best = null;
      let bestScore = -Infinity;
      for (const job of state.board) {
        const from = districtById(job.fromId);
        const d = Math.sqrt((pos.x - from.x) ** 2 + (pos.z - from.z) ** 2);
        const score = job.pay / Math.max(30, d / 10) - job.fragile * 2;
        if (score > bestScore) { bestScore = score; best = job; }
      }
      return { ok: true, job: best, score: Math.round(bestScore * 100) / 100 };
    },

    rollTrafficEvent(jobId) {
      const job = state.activeJobs.find((j) => j.id === jobId);
      if (!job) return { ok: false, error: 'no such active job' };
      return rollTrafficEvent(job);
    },

    applyWeatherEffect() {
      const w = getWeather();
      const word = w && w.condition ? w.condition : 'clear';
      if (word === 'rain') return { speedMult: 0.9, note: 'Rain slows you down' };
      if (word === 'storm') return { speedMult: 0.75, note: 'Storm, ride carefully' };
      if (word === 'fog') return { speedMult: 0.85, note: 'Fog, poor visibility' };
      return { speedMult: 1, note: 'Clear roads' };
    },

    missions() {
      return COURIER_MISSIONS.map((m) => ({ ...m, done: !!state.missionsDone[m.id] }));
    },

    tick(dt) {
      const day = getDay();
      if (day !== state.day) {
        state.day = day;
        state.jobsToday = 0;
        this.refreshBoard();
      }
      const wearFactor = 1 + state.vehicleWear / 200;
      const step = (dt || 0) * wearFactor;
      for (const job of [...state.activeJobs]) {
        job.timeLeft -= step;
        job._eventTimer = (job._eventTimer || 0) + (dt || 0);
        if (job._eventTimer >= 45) {
          job._eventTimer = 0;
          if (rng() < 0.4) rollTrafficEvent(job);
        }
        if (job.timeLeft <= 0) {
          job.timeLeft = 0;
          completeJob(job, true);
        }
      }
    },

    hudLine() {
      if (state.totalDeliveries === 0 && state.activeJobs.length === 0) return '';
      const rank = rankRecord();
      const rating = state.ratingCount > 0 ? (state.ratingSum / state.ratingCount).toFixed(1) : '0.0';
      let line = `Courier ${rank.name} ${rating}★ | ${state.activeJobs.length} active`;
      if (state.activeJobs.length > 0) {
        const parts = state.activeJobs.map((j) => `${j.parcelName} ${Math.round(j.timeLeft)}s`);
        line += ': ' + parts.join(' | ');
      }
      line += ` | streak ${state.streak}`;
      return line;
    },

    summary() {
      return {
        rank: state.rank,
        rating: avgRating(),
        totalDeliveries: state.totalDeliveries,
        totalEarned: state.totalEarned,
        totalLate: state.totalLate,
        streak: state.streak,
        bestStreak: state.bestStreak,
        vehicleId: state.vehicleId,
        missionsDone: Object.keys(state.missionsDone).length,
      };
    },

    serialize() {
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
    },

    deserialize(saved) {
      if (!saved || typeof saved !== 'object') return;
      if (typeof saved.rank === 'string') state.rank = saved.rank;
      if (typeof saved.vehicleId === 'string') state.vehicleId = saved.vehicleId;
      if (Array.isArray(saved.vehiclesOwned)) state.vehiclesOwned = [...saved.vehiclesOwned];
      if (Array.isArray(saved.completedJobs)) state.completedJobs = saved.completedJobs.map((j) => ({ ...j }));
      const numeric = ['vehicleWear', 'totalDeliveries', 'totalEarned', 'totalLate', 'totalDamaged', 'ratingSum', 'ratingCount', 'streak', 'bestStreak', 'rushOnTime', 'fragileSafe', 'multiStopDone', 'tips'];
      for (const key of numeric) {
        if (typeof saved[key] === 'number') state[key] = saved[key];
      }
      if (saved.missionsDone && typeof saved.missionsDone === 'object') state.missionsDone = { ...saved.missionsDone };
    },
  };

  return system;
}
