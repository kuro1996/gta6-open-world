// Jet ski racing on Solara Bay: buy a ski, fit parts, race buoy courses
// against rivals, land tricks off the wake, enter leagues, sign sponsors,
// run tours and rentals, rinse, repair and refuel. Context supplies rng,
// cash access, a logger and the player position. The day/hour getters, heat
// adder and speed getter are present with defaults but never called. Weather
// is internal state here, not a context getter.
export const JETSKI_MODELS = [
  { id: 'starter', name: 'Wave Pup', cost: 0, topSpeed: 70, acceleration: 55, handling: 50, stability: 60, fuel: 100, desc: 'A gentle trainer ski, free with the club card.' },
  { id: 'splash', name: 'Splash Runner', cost: 350, topSpeed: 95, acceleration: 65, handling: 60, stability: 65, fuel: 110, desc: 'A friendly ski for weekend races.' },
  { id: 'dolphin', name: 'Dolphin GT', cost: 800, topSpeed: 120, acceleration: 72, handling: 70, stability: 70, fuel: 120, desc: 'Quick and stable, a club favourite.' },
  { id: 'stingray', name: 'Stingray', cost: 1400, topSpeed: 140, acceleration: 80, handling: 78, stability: 72, fuel: 125, desc: 'Sharp handling for tight buoy courses.' },
  { id: 'barracuda', name: 'Barracuda', cost: 2200, topSpeed: 160, acceleration: 86, handling: 84, stability: 75, fuel: 130, desc: 'A predator on the water.' },
  { id: 'orca', name: 'Orca Pro', cost: 3000, topSpeed: 180, acceleration: 90, handling: 88, stability: 80, fuel: 140, desc: 'Pro power with a heavy hull.' },
  { id: 'typhoon', name: 'Typhoon X', cost: 4200, topSpeed: 200, acceleration: 94, handling: 92, stability: 82, fuel: 145, desc: 'The fastest ski the bay allows.' },
  { id: 'phoenix', name: 'Phoenix One', cost: 5800, topSpeed: 215, acceleration: 98, handling: 96, stability: 85, fuel: 150, desc: 'A championship ski, light as foam.' },
];

export const JETSKI_COURSES = [
  { id: 'bay-loop', name: 'Bay Loop', buoys: 8, laps: 3, difficulty: 2, par: 95, prize: 130, desc: 'An easy loop around the bay markers.' },
  { id: 'pier-slalom', name: 'Pier Slalom', buoys: 10, laps: 3, difficulty: 3, par: 115, prize: 190, desc: 'Slalom between the pier posts.' },
  { id: 'bridge-run', name: 'Bridge Run', buoys: 12, laps: 3, difficulty: 5, par: 135, prize: 270, desc: 'Under the bridge and back.' },
  { id: 'harbour-dash', name: 'Harbour Dash', buoys: 9, laps: 4, difficulty: 4, par: 125, prize: 230, desc: 'A fast dash through the harbour.' },
  { id: 'wave-break', name: 'Wave Break', buoys: 14, laps: 3, difficulty: 7, par: 155, prize: 390, desc: 'Big waves past the breakwater.' },
  { id: 'storm-buoy', name: 'Storm Buoy', buoys: 16, laps: 3, difficulty: 8, par: 175, prize: 490, desc: 'Tight buoys in rough water.' },
  { id: 'lighthouse-ring', name: 'Lighthouse Ring', buoys: 12, laps: 4, difficulty: 6, par: 165, prize: 430, desc: 'A long ring around the lighthouse.' },
  { id: 'grand-circuit', name: 'Grand Circuit', buoys: 18, laps: 4, difficulty: 9, par: 205, prize: 660, desc: 'The full bay circuit, the final race.' },
];

export const JETSKI_TRICKS = [
  { id: 'tail-whip', name: 'Tail Whip', points: 50, risk: 0.2, desc: 'Swing the tail out on a turn.' },
  { id: 'jump', name: 'Wake Jump', points: 60, risk: 0.25, desc: 'Launch off your own wake.' },
  { id: 'spin', name: '360 Spin', points: 80, risk: 0.3, desc: 'A full spin on the water.' },
  { id: 'barrel', name: 'Barrel Roll', points: 100, risk: 0.4, desc: 'Roll the ski right over.' },
  { id: 'nose-stand', name: 'Nose Stand', points: 70, risk: 0.3, desc: 'Stand the ski on its nose.' },
  { id: 'submarine', name: 'Submarine', points: 90, risk: 0.35, desc: 'Dip under and pop back up.' },
  { id: 'double-spin', name: 'Double Spin', points: 120, risk: 0.5, desc: 'Two spins, one very wet rider.' },
  { id: 'wave-ride', name: 'Wave Ride', points: 55, risk: 0.2, desc: 'Surf the biggest wave of the day.' },
  { id: 'slalom-flip', name: 'Slalom Flip', points: 110, risk: 0.45, desc: 'Flip between two buoys.' },
  { id: 'triple-jump', name: 'Triple Jump', points: 140, risk: 0.55, desc: 'Three jumps, no landing gear.' },
];

export const JETSKI_PARTS = [
  { id: 'engine-a', name: 'Sport Engine', cost: 220, slot: 'engine', speed: 14, acceleration: 6, handling: 0, desc: 'A hotter engine for the straight.' },
  { id: 'engine-b', name: 'Race Engine', cost: 650, slot: 'engine', speed: 28, acceleration: 10, handling: 0, desc: 'Top-end power, thirsty for fuel.', fuel: -5 },
  { id: 'hull-a', name: 'Light Hull', cost: 300, slot: 'hull', speed: 6, acceleration: 4, handling: 8, desc: 'A lighter hull that turns quicker.', stability: -3 },
  { id: 'hull-b', name: 'Racing Hull', cost: 700, slot: 'hull', speed: 10, acceleration: 6, handling: 12, desc: 'A hull built for buoy courses.', stability: 2 },
  { id: 'tank-a', name: 'Big Tank', cost: 260, slot: 'tank', speed: 0, acceleration: 0, handling: 0, desc: 'More fuel for longer heats.', fuel: 25 },
  { id: 'tank-b', name: 'Turbo Tank', cost: 520, slot: 'tank', speed: 4, acceleration: 0, handling: 0, desc: 'Maximum range, some extra weight.', fuel: 40 },
  { id: 'pump-a', name: 'Jet Pump', cost: 350, slot: 'pump', speed: 8, acceleration: 8, handling: 2, desc: 'A pump that bites the water.' },
  { id: 'pump-b', name: 'Pro Pump', cost: 600, slot: 'pump', speed: 12, acceleration: 12, handling: 4, desc: 'Instant response from the throttle.', stability: 3 },
  { id: 'seat-a', name: 'Grip Seat', cost: 150, slot: 'seat', speed: 0, acceleration: 2, handling: 6, desc: 'Stay on the ski in the rough stuff.', stability: 5 },
  { id: 'gps', name: 'Race GPS', cost: 400, slot: 'gps', speed: 2, acceleration: 0, handling: 10, desc: 'Know every buoy before you see it.', stability: 0 },
];

export const JETSKI_RIVALS = [
  { id: 'reef', name: 'Reef', skill: 55, style: 'aggressive', taunt: 'The bay is mine, rookie.' },
  { id: 'sandy', name: 'Sandy', skill: 65, style: 'smooth', taunt: 'I ride the waves, you fight them.' },
  { id: 'crash', name: 'Crash', skill: 72, style: 'reckless', taunt: 'Buoys are for decoration.' },
  { id: 'marina', name: 'Marina', skill: 80, style: 'precise', taunt: 'Every buoy, every time.' },
  { id: 'tide', name: 'Tide', skill: 88, style: 'aggressive', taunt: 'You should have stayed on the beach.' },
  { id: 'storm', name: 'Storm', skill: 95, style: 'champion', taunt: 'I am the storm. Beat the storm.' },
];

export const JETSKI_LEAGUES = [
  { id: 'rookie-regatta', name: 'Rookie Regatta', minRank: 0, entryFee: 100, races: 3, prize: 500, desc: 'First steps into league racing.' },
  { id: 'bay-series', name: 'Bay Series', minRank: 1, entryFee: 250, races: 4, prize: 1200, desc: 'The regular bay championship.' },
  { id: 'pro-wave', name: 'Pro Wave', minRank: 2, entryFee: 600, races: 5, prize: 3000, desc: 'Fast riders only, big money.' },
  { id: 'grand-championship', name: 'Grand Championship', minRank: 3, entryFee: 1500, races: 6, prize: 8000, desc: 'The title every rider wants.' },
];

export const JETSKI_RANKS = [
  { level: 0, name: 'Rookie', xp: 0, perk: 'Ride club courses and rookie leagues.' },
  { level: 1, name: 'Club Rider', xp: 150, perk: 'Bay series entry and better sponsors.' },
  { level: 2, name: 'Pro Rider', xp: 400, perk: 'Pro wave entry and top parts.' },
  { level: 3, name: 'Ace', xp: 800, perk: 'Championship entry and elite sponsors.' },
  { level: 4, name: 'Bay Legend', xp: 1500, perk: 'The fastest name on the water.' },
];

export const JETSKI_SPONSORS = [
  { id: 'wave-fuel', name: 'Wave Fuel', pay: 200, need: 'races', goal: 5, desc: 'Pays for every five races ridden.' },
  { id: 'wax-co', name: 'Wax Co', pay: 300, need: 'tricks', goal: 10, desc: 'Pays for every ten tricks landed.' },
  { id: 'salt-drinks', name: 'Salt Drinks', pay: 500, need: 'wins', goal: 3, desc: 'Pays for every three wins.' },
  { id: 'surf-wear', name: 'Surf Wear', pay: 1000, need: 'titles', goal: 1, desc: 'Pays for every league title.' },
];

export const JETSKI_WEATHER = [
  { id: 'glass', name: 'Glass', speedMult: 1.05, riskMult: 0.9, desc: 'Flat calm water, perfect for speed.' },
  { id: 'chop', name: 'Chop', speedMult: 1.0, riskMult: 1.0, desc: 'A light chop, normal racing.' },
  { id: 'waves', name: 'Waves', speedMult: 0.9, riskMult: 1.3, desc: 'Real waves, real fun, real risk.' },
  { id: 'storm', name: 'Storm', speedMult: 0.75, riskMult: 1.8, desc: 'Only fools ride in a storm.' },
  { id: 'fog', name: 'Fog', speedMult: 0.95, riskMult: 1.2, desc: 'Thick fog, buoys appear late.' },
];

export const JETSKI_FREESTYLE_SPOTS = [
  { id: 'pier', name: 'Old Pier', mult: 1.0, desc: 'A friendly spot for first tricks.' },
  { id: 'breakwater', name: 'Breakwater', mult: 1.3, desc: 'Big air off the wall.' },
  { id: 'sandbar', name: 'Sandbar', mult: 1.5, desc: 'The crowd loves the danger.' },
  { id: 'bridge', name: 'Bridge Span', mult: 1.2, desc: 'Echoes under the bridge.' },
];

export const JETSKI_TOURS = [
  { id: 'sunset-tour', name: 'Sunset Tour', duration: 60, price: 80, guests: 4, desc: 'A gentle sunset ride along the bay.' },
  { id: 'island-hop', name: 'Island Hop', duration: 120, price: 150, guests: 6, desc: 'Hop between the bay islands.' },
  { id: 'dolphin-watch', name: 'Dolphin Watch', duration: 90, price: 120, guests: 5, desc: 'Chase the dolphins at dawn.' },
  { id: 'fishing-run', name: 'Fishing Run', duration: 180, price: 200, guests: 3, desc: 'A long run to the fishing grounds.' },
  { id: 'party-ride', name: 'Party Ride', duration: 45, price: 100, guests: 8, desc: 'A loud ride for a birthday group.' },
  { id: 'photo-tour', name: 'Photo Tour', duration: 75, price: 110, guests: 4, desc: 'Slow stops at every pretty view.' },
  { id: 'night-glow', name: 'Night Glow', duration: 60, price: 140, guests: 4, desc: 'A glowing night ride under the lights.' },
  { id: 'grand-tour', name: 'Grand Tour', duration: 240, price: 300, guests: 6, desc: 'The whole bay, start to finish.' },
];

export const JETSKI_RENTAL_RATES = [
  { id: 'hourly', name: 'Hourly', price: 40, fuel: 10, desc: 'An hour on the water.' },
  { id: 'half-day', name: 'Half Day', price: 150, fuel: 40, desc: 'A morning or an afternoon.' },
  { id: 'full-day', name: 'Full Day', price: 250, fuel: 70, desc: 'Dawn to dusk.' },
  { id: 'weekend', name: 'Weekend', price: 450, fuel: 120, desc: 'The whole weekend.' },
];

export const JETSKI_MAINTENANCE = [
  { id: 'oil-change', name: 'Oil Change', cost: 30, interval: 5, desc: 'Fresh oil every five races.' },
  { id: 'spark-plugs', name: 'Spark Plugs', cost: 40, interval: 8, desc: 'New plugs every eight races.' },
  { id: 'hull-clean', name: 'Hull Clean', cost: 25, interval: 3, desc: 'Scrub the hull every three races.' },
  { id: 'impeller', name: 'Impeller Check', cost: 60, interval: 10, desc: 'Check the impeller every ten races.' },
  { id: 'full-service', name: 'Full Service', cost: 120, interval: 15, desc: 'The full works every fifteen races.' },
];

export const JETSKI_BEACH_EVENTS = [
  { id: 'beach-party', name: 'Beach Party', mult: 1.4, desc: 'A party brings a crowd.' },
  { id: 'surf-contest', name: 'Surf Contest', mult: 1.3, desc: 'Surfers draw a big audience.' },
  { id: 'rainy-beach', name: 'Rainy Beach', mult: 0.7, desc: 'Rain empties the beach.' },
  { id: 'fishing-fest', name: 'Fishing Fest', mult: 1.2, desc: 'A fishing festival on the pier.' },
  { id: 'quiet-tide', name: 'Quiet Tide', mult: 0.9, desc: 'A slow day at the beach.' },
  { id: 'fireworks', name: 'Fireworks Night', mult: 1.6, desc: 'Fireworks over the bay.' },
];

export const JETSKI_SAFETY = [
  { id: 'life-jacket', name: 'Life Jacket', cost: 50, desc: 'A jacket that keeps you afloat.' },
  { id: 'helmet', name: 'Helmet', cost: 80, desc: 'A helmet for the hard landings.' },
  { id: 'kill-switch', name: 'Kill Switch', cost: 40, desc: 'Stops the ski if you fall off.' },
  { id: 'flare-kit', name: 'Flare Kit', cost: 30, desc: 'Signal for help from far away.' },
  { id: 'first-aid', name: 'First Aid Kit', cost: 35, desc: 'Patch up small cuts on the water.' },
];

export const JETSKI_TIPS = [
  { id: 'tip-buoys', name: 'Buoy Lines', tip: 'Cut buoys close, but never hit one.' },
  { id: 'tip-fuel', name: 'Watch Fuel', tip: 'An empty tank mid-race needs a tow.' },
  { id: 'tip-tricks', name: 'Trick Combos', tip: 'Tricks pay more inside a combo.' },
  { id: 'tip-weather', name: 'Read Weather', tip: 'Storm water is fast to crash and slow to race.' },
  { id: 'tip-rinse', name: 'Rinse After', tip: 'Rinse the ski after every race, salt eats metal.' },
  { id: 'tip-parts', name: 'Fit Parts', tip: 'Parts only help the active ski.' },
  { id: 'tip-leagues', name: 'League Points', tip: 'Six points per race on average wins a title.' },
  { id: 'tip-tours', name: 'Tour Money', tip: 'Tours pay without racing, but they burn fuel.' },
];

export const JETSKI_AWARDS = [
  { id: 'first-ride', name: 'First Ride', need: 'racesRidden', goal: 1, desc: 'Ride your first race.' },
  { id: 'first-win', name: 'First Win', need: 'wins', goal: 1, desc: 'Win a race.' },
  { id: 'trick-ten', name: 'Trick Ten', need: 'tricksLanded', goal: 10, desc: 'Land ten tricks.' },
  { id: 'league-champ', name: 'League Champ', need: 'leagueTitles', goal: 1, desc: 'Win a league title.' },
  { id: 'tour-guide', name: 'Tour Guide', need: 'racesRidden', goal: 20, desc: 'Ride twenty races.' },
];

export const JETSKI_RECORDS = [
  { id: 'races', name: 'Races Ridden', field: 'racesRidden', unit: 'races', desc: 'All races ridden.' },
  { id: 'wins', name: 'Wins', field: 'wins', unit: 'wins', desc: 'All races won.' },
  { id: 'tricks', name: 'Tricks Landed', field: 'tricksLanded', unit: 'tricks', desc: 'All tricks landed.' },
  { id: 'best-combo', name: 'Best Combo', field: 'bestCombo', unit: 'combo', desc: 'Longest trick combo.' },
  { id: 'earned', name: 'Total Earned', field: 'earned', unit: 'cash', desc: 'All cash earned from jetskiing.' },
];

export const JETSKI_SEASONAL_EVENTS = [
  { id: 'spring-regatta', name: 'Spring Regatta', season: 'spring', prize: 800, desc: 'The spring opener.' },
  { id: 'summer-splash', name: 'Summer Splash', season: 'summer', prize: 1200, desc: 'The big summer race.' },
  { id: 'autumn-swell', name: 'Autumn Swell', season: 'autumn', prize: 900, desc: 'Racing in the autumn swell.' },
  { id: 'winter-glow', name: 'Winter Glow', season: 'winter', prize: 1000, desc: 'Night racing under the lights.' },
];

export const JETSKI_QUICK_START = [
  'Pick a course and start your first race.',
  'Pass buoys to advance laps and finish.',
  'Land tricks mid-race to build a combo.',
  'Buy a faster ski when you can afford it.',
  'Enter a league once your rank allows it.',
  'Run tours between races for easy money.',
];

export const JETSKI_META = {
  system: 'jetski',
  version: '7b-B',
  author: 'builder-B',
  files: 1,
  lines: 1003,
  features: ['races', 'tricks', 'leagues', 'tours', 'rentals', 'trials'],
};

const byId = (arr, id) => arr.find((x) => x.id === id);
const bounded = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export function jetskiRankFor(xp) {
  let out = 0;
  for (const r of JETSKI_RANKS) if (xp >= r.xp) out = r.level;
  return out;
}

export function jetskiStatsFor(modelId, ownedParts) {
  const model = byId(JETSKI_MODELS, modelId);
  if (!model) return { topSpeed: 0, acceleration: 0, handling: 0, stability: 0, fuel: 0 };
  const parts = (ownedParts || []).map((id) => byId(JETSKI_PARTS, id)).filter(Boolean);
  let topSpeed = model.topSpeed;
  let acceleration = model.acceleration;
  let handling = model.handling;
  let stability = model.stability;
  let fuel = model.fuel;
  for (const p of parts) {
    topSpeed += p.speed || 0;
    acceleration += p.acceleration || 0;
    handling += p.handling || 0;
    stability += p.stability || 0;
    fuel += p.fuel || 0;
  }
  return {
    topSpeed: bounded(topSpeed, 20, 230),
    acceleration: bounded(acceleration, 10, 100),
    handling: bounded(handling, 10, 100),
    stability: bounded(stability, 10, 100),
    fuel: bounded(fuel, 30, 200),
  };
}

export function jetskiRaceTime(course, skiStats, weather, rng) {
  const wobble = 0.95 + (rng ? rng() : Math.random()) * 0.1;
  const mult = weather ? weather.speedMult : 1;
  const time = course.par * (120 / skiStats.topSpeed) * (1.1 - skiStats.handling / 500) / mult * wobble;
  return Math.round(time * 10) / 10;
}

export function jetskiRivalTime(rival, course, rng) {
  const wobble = 0.95 + (rng ? rng() : Math.random()) * 0.1;
  const time = course.par * (1.15 - rival.skill / 200) * wobble;
  return Math.round(time * 10) / 10;
}

export function jetskiPrizeFor(course, rank, place) {
  const mult = place === 1 ? 1 : place === 2 ? 0.5 : place === 3 ? 0.25 : 0.1;
  return Math.round(course.prize * (1 + rank * 0.1) * mult);
}

export function jetskiFreestyleScore(trickIds, spotId) {
  let sum = 0;
  for (const id of trickIds) {
    const t = byId(JETSKI_TRICKS, id);
    if (t) sum += t.points;
  }
  const spot = byId(JETSKI_FREESTYLE_SPOTS, spotId);
  return Math.round(sum * (spot ? spot.mult : 1));
}

export function jetskiSeasonStandings(results) {
  const table = {};
  for (const r of results) {
    const pts = r.place === 1 ? 10 : r.place === 2 ? 6 : r.place === 3 ? 4 : 1;
    table[r.pilot] = (table[r.pilot] || 0) + pts;
  }
  return Object.keys(table).map((p) => ({ pilot: p, points: table[p] })).sort((a, b) => b.points - a.points);
}

export function jetskiWaveHeight(weatherId) {
  if (weatherId === 'glass') return 0.1;
  if (weatherId === 'chop') return 0.4;
  if (weatherId === 'waves') return 1.2;
  if (weatherId === 'storm') return 2;
  if (weatherId === 'fog') return 0.3;
  return 0.5;
}

export function jetskiTourPay(tourId, guests, rank) {
  const tour = byId(JETSKI_TOURS, tourId);
  if (!tour) return 0;
  return Math.round(tour.price * guests * (1 + (rank || 0) * 0.1));
}

export function jetskiRentalPay(rateId, days) {
  const rate = byId(JETSKI_RENTAL_RATES, rateId);
  if (!rate) return 0;
  return rate.price * days;
}

export function jetskiMaintenanceDue(races, itemId) {
  const item = byId(JETSKI_MAINTENANCE, itemId);
  if (!item) return false;
  return races > 0 && races % item.interval === 0;
}

export function jetskiBeachMult(eventId) {
  const ev = byId(JETSKI_BEACH_EVENTS, eventId);
  return ev ? ev.mult : 1;
}

export function jetskiSafetyScore(ownedSafety) {
  return (ownedSafety || []).length * 20;
}

export function jetskiFuelCost(distanceKm, consumption) {
  return Math.ceil(distanceKm * consumption);
}

export function jetskiRacePurse(prize, place, sponsors) {
  const mult = place === 1 ? 1 : place === 2 ? 0.5 : place === 3 ? 0.25 : 0.1;
  return Math.round(prize * mult + sponsors * 50);
}

export function jetskiTopSpeedWithParts(modelId, partIds) {
  return jetskiStatsFor(modelId, partIds).topSpeed;
}

export function jetskiTipFor(day) {
  return JETSKI_TIPS[((day % JETSKI_TIPS.length) + JETSKI_TIPS.length) % JETSKI_TIPS.length];
}

export function jetskiAwardProgress(awardId, state) {
  const a = byId(JETSKI_AWARDS, awardId);
  if (!a) return null;
  const current = state[a.need] || 0;
  return { id: a.id, name: a.name, current, goal: a.goal, done: current >= a.goal };
}

export function jetskiFuelRange(fuelLeft, consumption) {
  if (!consumption || consumption <= 0) return 0;
  return Math.round(fuelLeft / consumption);
}

export function jetskiWaveRisk(weatherId) {
  const w = byId(JETSKI_WEATHER, weatherId);
  return w ? w.riskMult : 1;
}

export function jetskiBestCourse(bestTimes) {
  const keys = Object.keys(bestTimes || {});
  if (!keys.length) return null;
  let best = keys[0];
  for (const k of keys) if (bestTimes[k] < bestTimes[best]) best = k;
  return { course: best, time: bestTimes[best] };
}

export function jetskiConditionLabel(condition) {
  if (condition >= 90) return 'excellent';
  if (condition >= 70) return 'good';
  if (condition >= 45) return 'worn';
  if (condition >= 20) return 'poor';
  return 'critical';
}

export function jetskiRecordFor(recordId, state) {
  const rec = byId(JETSKI_RECORDS, recordId);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: state[rec.field] || 0, unit: rec.unit };
}

export function jetskiAllRecords(state) {
  return JETSKI_RECORDS.map((r) => ({ id: r.id, name: r.name, value: state[r.field] || 0, unit: r.unit, desc: r.desc }));
}

export function jetskiWinRate(wins, races) {
  if (!races) return 0;
  return Math.round((wins / races) * 1000) / 10;
}

export function jetskiWipeoutRate(wipeouts, races) {
  if (!races) return 0;
  return Math.round((wipeouts / races) * 100) / 100;
}

export function jetskiRiderGrade(wins, races, bestCombo) {
  const rate = jetskiWinRate(wins, races);
  if (rate >= 70 && bestCombo >= 8) return 'S';
  if (rate >= 55 && bestCombo >= 5) return 'A';
  if (rate >= 40) return 'B';
  if (rate >= 20) return 'C';
  return 'D';
}

export function jetskiSeasonalEvent(seasonId) {
  return JETSKI_SEASONAL_EVENTS.find((e) => e.season === seasonId) || null;
}

export function jetskiSeasonalPrize(seasonId, place) {
  const ev = jetskiSeasonalEvent(seasonId);
  if (!ev) return 0;
  return Math.round(ev.prize * (place === 1 ? 1 : place === 2 ? 0.5 : 0.25));
}

export function jetskiTourSeasonMult(seasonId) {
  if (seasonId === 'summer') return 1.5;
  if (seasonId === 'spring' || seasonId === 'autumn') return 1.2;
  return 0.8;
}

export function jetskiQuickStart(step) {
  if (step < 0 || step >= JETSKI_QUICK_START.length) return null;
  return JETSKI_QUICK_START[step];
}

export function jetskiTotalValue(state) {
  return state.owned.length * 500 + state.parts.length * 200;
}

export function jetskiProgressPercent(state) {
  const total = state.racesRidden + state.timeTrials;
  if (!total) return 0;
  return Math.round((state.wins / total) * 1000) / 10;
}

export function jetskiSummary(state) {
  const rankName = JETSKI_RANKS[state.rank].name;
  return `${rankName} Ria rode ${state.racesRidden} races, won ${state.wins}, landed ${state.tricksLanded} tricks and earned ${Math.round(state.earned)}.`;
}

export function jetskiNextGoal(state) {
  if (state.racesRidden < 3) return 'Ride 3 races to hit your first goal.';
  if (state.wins < 1) return 'Win your first race to hit your next goal.';
  if (state.leagueTitles < 1) return 'Win your first league title to hit your next goal.';
  return 'Reach the top rank and become a Bay Legend.';
}

export function jetskiMeta() {
  return { ...JETSKI_META, features: [...JETSKI_META.features] };
}

export function createJetskiSystem(ctx) {
  const {
    rng = Math.random,
    getDay = () => 1,
    getHour = () => 12,
    getCash = () => 0,
    addCash = () => {},
    addHeat = () => {},
    getSpeed = () => 0,
    log = () => {},
    getPlayerPos = () => ({ x: 0, y: 0, z: 0 }),
  } = ctx || {};

  const state = {
    xp: 0, rank: 0, owned: ['starter'], active: 'starter', parts: [], installed: {},
    racesRidden: 0, wins: 0, podiums: 0, bestTimes: {}, totalTricks: 0, tricksLanded: 0,
    crashes: 0, wipeouts: 0, repairsPaid: 0, earned: 0, spent: 0, combo: 0, bestCombo: 0,
    comboPoints: 0, race: null, buoy: 0, lap: 1, raceTime: 0, fuelLeft: 100,
    condition: 100, weather: 'chop', league: null, leagueRace: 0, leaguePoints: 0,
    leagueWins: 0, leagueTitles: 0, sponsors: [], sponsorProgress: {}, timeTrials: 0,
    bestTrial: {}, lastDay: 1, dailyRaces: 0, rivalBeaten: {}, freestyleScore: 0,
    bestFreestyle: 0, rinses: 0, fuelBought: 0,
  };

  const currentStats = () => jetskiStatsFor(state.active, state.parts);
  const weatherNow = () => byId(JETSKI_WEATHER, state.weather) || JETSKI_WEATHER[1];
  const leagueDef = () => (state.league ? byId(JETSKI_LEAGUES, state.league) : null);
  const refreshRank = () => {
    const next = jetskiRankFor(state.xp);
    if (next > state.rank) state.rank = next;
  };
  const gainXp = (n) => { state.xp += n; refreshRank(); };
  const fail = (reason) => ({ ok: false, reason });

  function checkSponsors() {
    for (const sid of state.sponsors) {
      const sp = byId(JETSKI_SPONSORS, sid);
      if (!sp) continue;
      const metric = sp.need === 'races' ? state.racesRidden
        : sp.need === 'tricks' ? state.tricksLanded
        : sp.need === 'wins' ? state.wins
        : state.leagueTitles;
      state.sponsorProgress[sid] = metric;
      if (metric >= sp.goal) {
        addCash(sp.pay);
        state.earned += sp.pay;
        state.sponsorProgress[sid] = 0;
        log(`Sponsor ${sp.name} paid ${sp.pay}.`);
      }
    }
  }

  function buySki(skiId) {
    const model = byId(JETSKI_MODELS, skiId);
    if (!model) return fail('unknown ski');
    if (state.owned.includes(skiId)) return fail('already owned');
    if (getCash() < model.cost) return fail('not enough cash');
    addCash(-model.cost);
    state.spent += model.cost;
    state.owned.push(skiId);
    gainXp(25);
    return { ok: true, id: skiId };
  }

  function selectSki(skiId) {
    if (!state.owned.includes(skiId)) return fail('ski not owned');
    state.active = skiId;
    const s = currentStats();
    state.condition = 100;
    state.fuelLeft = s.fuel;
    return { ok: true, id: skiId, stats: s };
  }

  function buyPart(partId) {
    const part = byId(JETSKI_PARTS, partId);
    if (!part) return fail('unknown part');
    if (state.parts.includes(partId)) return fail('already owned');
    if (getCash() < part.cost) return fail('not enough cash');
    addCash(-part.cost);
    state.spent += part.cost;
    state.parts.push(partId);
    state.installed[part.slot] = partId;
    gainXp(15);
    return { ok: true, id: partId, stats: currentStats() };
  }

  function removePart(slot) {
    const partId = state.installed[slot];
    if (!partId) return fail('slot empty');
    delete state.installed[slot];
    state.parts = state.parts.filter((p) => p !== partId);
    return { ok: true, removed: partId, stats: currentStats() };
  }

  function startRace(courseId, rivalId) {
    const course = byId(JETSKI_COURSES, courseId);
    if (!course) return fail('unknown course');
    if (state.race) return fail('race already active');
    if (state.condition < 30) return fail('condition too low');
    if (state.fuelLeft < 30) return fail('fuel too low');
    state.race = { course: courseId, rival: rivalId || null, trial: false };
    state.buoy = 0;
    state.lap = 1;
    state.raceTime = 0;
    state.combo = 0;
    state.comboPoints = 0;
    return { ok: true, course: courseId, rival: rivalId || null, weather: state.weather };
  }

  function passBuoy() {
    if (!state.race) return fail('no race active');
    const course = byId(JETSKI_COURSES, state.race.course);
    state.buoy += 1;
    state.fuelLeft = Math.max(0, state.fuelLeft - 2);
    state.raceTime = Math.round((state.raceTime + (course.par / (course.buoys * course.laps)) * (0.9 + rng() * 0.2)) * 10) / 10;
    if (rng() < 0.08 * jetskiWaveRisk(state.weather)) {
      state.wipeouts += 1;
      state.combo = 0;
      state.condition = Math.max(0, state.condition - 8);
      return { ok: true, wipeout: true, buoy: state.buoy, lap: state.lap };
    }
    if (state.buoy >= course.buoys) {
      state.buoy = 0;
      state.lap += 1;
      if (state.lap > course.laps) return finishRace();
    }
    return { ok: true, buoy: state.buoy, lap: state.lap, time: Math.round(state.raceTime * 10) / 10 };
  }

  function doTrick(trickId) {
    const trick = byId(JETSKI_TRICKS, trickId);
    if (!trick) return fail('unknown trick');
    if (!state.race) return fail('no race active');
    const s = currentStats();
    const crashChance = trick.risk * jetskiWaveRisk(state.weather) * (1 - s.stability / 200);
    if (rng() < Math.max(0.02, crashChance)) {
      state.crashes += 1;
      state.wipeouts += 1;
      state.combo = 0;
      state.condition = Math.max(0, state.condition - 12);
      return { ok: true, crashed: true, trick: trickId, points: 0, combo: 0 };
    }
    state.combo += 1;
    if (state.combo > state.bestCombo) state.bestCombo = state.combo;
    const points = trick.points * state.combo;
    state.comboPoints += points;
    state.totalTricks += 1;
    state.tricksLanded += 1;
    gainXp(6);
    return { ok: true, crashed: false, trick: trickId, points, combo: state.combo };
  }

  function finishRace() {
    if (!state.race) return fail('no race active');
    const course = byId(JETSKI_COURSES, state.race.course);
    const s = currentStats();
    const time = jetskiRaceTime(course, s, weatherNow(), rng);
    let rivalTime = null;
    let place = 1;
    if (state.race.rival) {
      const rival = byId(JETSKI_RIVALS, state.race.rival);
      rivalTime = jetskiRivalTime(rival, course, rng);
      place = time <= rivalTime ? 1 : 2;
    }
    if (rng() < 0.15 && place < 3) place += 1;
    const prize = jetskiPrizeFor(course, state.rank, place) + Math.floor(state.comboPoints / 10);
    const comboPoints = state.comboPoints;
    state.race = null;
    state.combo = 0;
    state.comboPoints = 0;
    state.racesRidden += 1;
    state.dailyRaces += 1;
    state.fuelLeft = Math.max(0, state.fuelLeft - 12);
    state.condition = Math.max(0, state.condition - 5);
    if (place === 1) state.wins += 1;
    if (place <= 3) state.podiums += 1;
    if (!state.bestTimes[course.id] || time < state.bestTimes[course.id]) state.bestTimes[course.id] = time;
    addCash(prize);
    state.earned += prize;
    gainXp(place === 1 ? 50 : 25);
    const league = leagueDef();
    if (league) {
      state.leagueRace += 1;
      state.leaguePoints += place === 1 ? 10 : place === 2 ? 6 : place === 3 ? 4 : 1;
      if (place === 1) state.leagueWins += 1;
      if (state.leagueRace >= league.races) {
        if (state.leaguePoints >= league.races * 6) {
          state.leagueTitles += 1;
          addCash(league.prize);
          state.earned += league.prize;
          log(`League title won: ${league.name}.`);
        }
        state.league = null;
        state.leagueRace = 0;
        state.leaguePoints = 0;
        state.leagueWins = 0;
      }
    }
    checkSponsors();
    return { ok: true, time, rivalTime, place, prize, comboPoints };
  }

  function forfeitRace() {
    if (!state.race) return fail('no race active');
    state.race = null;
    state.combo = 0;
    state.comboPoints = 0;
    return { ok: true };
  }

  function startTimeTrial(courseId) {
    const course = byId(JETSKI_COURSES, courseId);
    if (!course) return fail('unknown course');
    if (state.race) return fail('race already active');
    state.race = { course: courseId, rival: null, trial: true };
    state.buoy = 0;
    state.lap = 1;
    state.raceTime = 0;
    return { ok: true, course: courseId };
  }

  function finishTrial() {
    if (!state.race || !state.race.trial) return fail('no trial active');
    const course = byId(JETSKI_COURSES, state.race.course);
    const time = jetskiRaceTime(course, currentStats(), weatherNow(), rng);
    const improved = !state.bestTrial[course.id] || time < state.bestTrial[course.id];
    if (improved) state.bestTrial[course.id] = time;
    state.race = null;
    state.timeTrials += 1;
    const bonus = improved ? 60 + 20 * state.rank : 10;
    addCash(bonus);
    state.earned += bonus;
    gainXp(10);
    return { ok: true, time, improved, bonus };
  }

  function freestyle(trickIds) {
    if (state.race) return fail('race active');
    let landed = 0;
    let points = 0;
    const s = currentStats();
    for (const id of trickIds || []) {
      const trick = byId(JETSKI_TRICKS, id);
      if (!trick) continue;
      const crashChance = trick.risk * jetskiWaveRisk(state.weather) * (1 - s.stability / 200);
      if (rng() < Math.max(0.02, crashChance)) {
        state.crashes += 1;
        log(`Wipeout on a ${trick.name} in freestyle.`);
        break;
      }
      points += trick.points;
      landed += 1;
      state.totalTricks += 1;
      state.tricksLanded += 1;
    }
    state.freestyleScore = points;
    if (points > state.bestFreestyle) state.bestFreestyle = points;
    const pay = Math.round(points / 5);
    addCash(pay);
    state.earned += pay;
    gainXp(8 * landed);
    return { ok: true, landed, points, pay };
  }

  function enterLeague(leagueId) {
    const league = byId(JETSKI_LEAGUES, leagueId);
    if (!league) return fail('unknown league');
    if (state.league) return fail('league already active');
    if (state.rank < league.minRank) return fail('rank too low for this league');
    if (getCash() < league.entryFee) return fail('not enough cash');
    addCash(-league.entryFee);
    state.spent += league.entryFee;
    state.league = leagueId;
    state.leagueRace = 0;
    state.leaguePoints = 0;
    state.leagueWins = 0;
    return { ok: true, league: leagueId };
  }

  function signSponsor(sponsorId) {
    const sp = byId(JETSKI_SPONSORS, sponsorId);
    if (!sp) return fail('unknown sponsor');
    if (state.sponsors.includes(sponsorId)) return fail('already signed');
    if (sponsorId !== JETSKI_SPONSORS[0].id && state.rank < 1) return fail('rank too low for this sponsor');
    state.sponsors.push(sponsorId);
    state.sponsorProgress[sponsorId] = 0;
    return { ok: true, id: sponsorId };
  }

  function repair() {
    if (state.condition >= 100) return fail('no damage to repair');
    const cost = (100 - state.condition) * 2;
    if (getCash() < cost) return fail('not enough cash');
    addCash(-cost);
    state.spent += cost;
    state.repairsPaid += cost;
    state.condition = 100;
    return { ok: true, cost };
  }

  function refuel() {
    const cap = currentStats().fuel;
    if (state.fuelLeft >= cap) return fail('fuel already full');
    const cost = Math.ceil((cap - state.fuelLeft) / 10);
    if (getCash() < cost) return fail('not enough cash');
    addCash(-cost);
    state.spent += cost;
    state.fuelBought += cost;
    state.fuelLeft = cap;
    return { ok: true, cost };
  }

  function rinse() {
    if (getCash() < 10) return fail('not enough cash');
    addCash(-10);
    state.spent += 10;
    state.rinses += 1;
    state.condition = Math.min(100, state.condition + 5);
    return { ok: true, cost: 10 };
  }

  function tick(dt) {
    if (!state.race) return;
    state.raceTime += dt;
    state.fuelLeft = Math.max(0, state.fuelLeft - 0.35 * dt);
    if (state.fuelLeft <= 0) {
      log('Out of fuel, towed back to the dock.');
      state.race = null;
      state.combo = 0;
      state.comboPoints = 0;
      state.condition = Math.max(0, state.condition - 10);
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyRaces = 0;
    state.fuelLeft = currentStats().fuel;
    const roll = rng();
    state.weather = roll < 0.4 ? 'chop' : roll < 0.6 ? 'glass' : roll < 0.75 ? 'waves' : roll < 0.9 ? 'fog' : 'storm';
    log(`Forecast: ${weatherNow().name} on the water.`);
    state.condition = Math.max(0, state.condition - 2);
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    for (const key of Object.keys(saved)) {
      if (key in state) state[key] = saved[key];
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: JETSKI_RANKS[state.rank].name, xp: state.xp, active: state.active,
      owned: state.owned.length, parts: state.parts.length, racesRidden: state.racesRidden,
      wins: state.wins, podiums: state.podiums, tricksLanded: state.tricksLanded,
      bestCombo: state.bestCombo, crashes: state.crashes, wipeouts: state.wipeouts,
      earned: Math.round(state.earned), spent: state.spent, repairsPaid: state.repairsPaid,
      league: state.league, leagueTitles: state.leagueTitles,
      sponsors: state.sponsors.length, timeTrials: state.timeTrials,
      weather: state.weather, fuel: Math.round(state.fuelLeft),
      condition: Math.round(state.condition), racing: !!state.race,
      buoy: state.buoy, lap: state.lap, dailyRaces: state.dailyRaces,
      bestFreestyle: state.bestFreestyle, rinses: state.rinses,
    };
  }

  function hudLine() {
    if (state.race) {
      const course = byId(JETSKI_COURSES, state.race.course);
      return `Racing ${course.name}: lap ${state.lap}, buoy ${state.buoy}, fuel ${Math.round(state.fuelLeft)}.`;
    }
    if (state.league) {
      const league = leagueDef();
      return `League ${league.name}: race ${state.leagueRace + 1}, ${state.leaguePoints} points.`;
    }
    if (state.condition < 40) return `${state.active} needs repair.`;
    return '';
  }

  function interact() {
    const pos = getPlayerPos() || {};
    const dx = (pos.x || 0) - 150;
    const dz = (pos.z || 0) - (-170);
    if (Math.sqrt(dx * dx + dz * dz) > 30) return false;
    if (state.race) { passBuoy(); return true; }
    return false;
  }

  function courseList() {
    return JETSKI_COURSES.map((c) => ({
      id: c.id, name: c.name, buoys: c.buoys, laps: c.laps, difficulty: c.difficulty,
      prize: c.prize, best: state.bestTimes[c.id] || null,
    }));
  }

  function garage() {
    return JETSKI_MODELS.map((m) => ({
      id: m.id, name: m.name, cost: m.cost, owned: state.owned.includes(m.id),
      stats: jetskiStatsFor(m.id, m.id === state.active ? state.parts : []),
    }));
  }

  return {
    state, buySki, selectSki, buyPart, removePart, startRace, passBuoy, doTrick,
    finishRace, forfeitRace, startTimeTrial, finishTrial, freestyle, enterLeague,
    signSponsor, repair, refuel, rinse, tick, tickDay, serialize, deserialize,
    stats, hudLine, interact, courseList, garage, currentStats,
  };
}

export function createJetskiTours(system) {
  const st = system.state;
  let toursDone = 0;
  let toursEarned = 0;
  let rentalsDone = 0;
  let rentalsEarned = 0;
  let maintenanceDone = 0;

  const fail = (reason) => ({ ok: false, reason });

  function runTour(tourId, guests) {
    const tour = byId(JETSKI_TOURS, tourId);
    if (!tour) return fail('unknown tour');
    if (guests > tour.guests) return fail('too many guests');
    if (st.fuelLeft < 30) return fail('fuel too low');
    const pay = jetskiTourPay(tourId, guests, st.rank);
    toursDone += 1;
    toursEarned += pay;
    st.fuelLeft -= 25;
    return { ok: true, tour: tourId, guests, pay, duration: tour.duration };
  }

  function rentOut(rateId, days) {
    const rate = byId(JETSKI_RENTAL_RATES, rateId);
    if (!rate) return fail('unknown rate');
    const pay = jetskiRentalPay(rateId, days);
    rentalsDone += 1;
    rentalsEarned += pay;
    return { ok: true, rate: rateId, days, pay };
  }

  function doMaintenance(itemId) {
    const item = byId(JETSKI_MAINTENANCE, itemId);
    if (!item) return fail('unknown maintenance');
    maintenanceDone += 1;
    st.condition = Math.min(100, st.condition + 10);
    return { ok: true, item: itemId, cost: item.cost, condition: Math.round(st.condition) };
  }

  function tourRecord() {
    return { toursDone, toursEarned, rentalsDone, rentalsEarned, maintenanceDone };
  }

  return { runTour, rentOut, doMaintenance, tourRecord };
}
