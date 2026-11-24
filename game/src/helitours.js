export const HELICOPTERS = [
  { id: 'robin', name: 'Robinson R44', price: 0, seats: 2, speed: 1.0, stability: 1, fuelBurn: 1, desc: 'A trusty little trainer.' },
  { id: 'jetranger', name: 'JetRanger', price: 800, seats: 3, speed: 1.2, stability: 2, fuelBurn: 1.2, desc: 'A nimble workhorse.' },
  { id: 'ec130', name: 'EC130', price: 2500, seats: 5, speed: 1.4, stability: 3, fuelBurn: 1.5, desc: 'Smooth and roomy.' },
  { id: 'bell407', name: 'Bell 407', price: 6000, seats: 5, speed: 1.7, stability: 4, fuelBurn: 1.8, desc: 'Fast with a great view.' },
  { id: 'aw139', name: 'AW139', price: 15000, seats: 8, speed: 2.0, stability: 5, fuelBurn: 2.2, desc: 'A serious tour machine.' },
  { id: 'chinook', name: 'Chinook', price: 30000, seats: 12, speed: 1.6, stability: 5, fuelBurn: 3.5, desc: 'A flying bus.' },
];

export const TOUR_ROUTES = [
  { id: 'city-lights', name: 'City Lights', stops: 4, minutes: 15, fare: 60, bestHour: 20, desc: 'The city glowing below.' },
  { id: 'beach-run', name: 'Beach Run', stops: 3, minutes: 12, fare: 50, bestHour: 17, desc: 'Sand and surf from above.' },
  { id: 'sunset', name: 'Sunset Tour', stops: 5, minutes: 20, fare: 120, bestHour: 18, desc: 'Chase the sun down.' },
  { id: 'island-hop', name: 'Island Hop', stops: 6, minutes: 25, fare: 150, bestHour: 10, desc: 'Hop between the islands.' },
  { id: 'mountain', name: 'Mountain Loop', stops: 4, minutes: 18, fare: 90, bestHour: 8, desc: 'Ridges and valleys.' },
  { id: 'night-neon', name: 'Night Neon', stops: 5, minutes: 20, fare: 130, bestHour: 22, desc: 'Neon signs from the sky.' },
  { id: 'harbour', name: 'Harbour Tour', stops: 3, minutes: 10, fare: 45, bestHour: 14, desc: 'Cranes and cargo ships.' },
  { id: 'grand-tour', name: 'Grand Tour', stops: 8, minutes: 35, fare: 250, bestHour: 12, desc: 'The whole city in one flight.' },
  { id: 'volcano', name: 'Volcano Run', stops: 4, minutes: 22, fare: 180, bestHour: 9, desc: 'Steam and black rock.' },
  { id: 'waterfall', name: 'Waterfall Run', stops: 3, minutes: 14, fare: 70, bestHour: 11, desc: 'Falling water from above.' },
  { id: 'stadium', name: 'Stadium Flyover', stops: 2, minutes: 8, fare: 40, bestHour: 19, desc: 'Circle the stadium lights.' },
  { id: 'lighthouse', name: 'Lighthouse Run', stops: 3, minutes: 12, fare: 55, bestHour: 16, desc: 'The beam sweeping the sea.' },
];

export const PHOTO_SPOTS = [
  { id: 'skyline', name: 'Skyline', bonus: 25, desc: 'The whole skyline at once.' },
  { id: 'sunset-sea', name: 'Sunset Sea', bonus: 40, desc: 'The sun sinking into the sea.' },
  { id: 'bridge', name: 'Bridge', bonus: 20, desc: 'The harbour bridge.' },
  { id: 'stadium-night', name: 'Stadium at Night', bonus: 30, desc: 'Floodlights and crowds.' },
  { id: 'waterfall-top', name: 'Waterfall Top', bonus: 35, desc: 'Looking down the falls.' },
  { id: 'island-aerial', name: 'Island Aerial', bonus: 30, desc: 'An island from straight above.' },
  { id: 'volcano-crater', name: 'Volcano Crater', bonus: 50, desc: 'Steam rising from the crater.' },
  { id: 'yacht-fleet', name: 'Yacht Fleet', bonus: 25, desc: 'White hulls in the marina.' },
  { id: 'old-town', name: 'Old Town', bonus: 15, desc: 'Red roofs and old lanes.' },
  { id: 'port-cranes', name: 'Port Cranes', bonus: 20, desc: 'Giant cranes at work.' },
  { id: 'golf-course', name: 'Golf Course', bonus: 15, desc: 'Green fairways below.' },
  { id: 'airport', name: 'Airport', bonus: 20, desc: 'Runways and parked jets.' },
  { id: 'lighthouse-beam', name: 'Lighthouse Beam', bonus: 30, desc: 'The beam cutting the dark.' },
  { id: 'neon-strip', name: 'Neon Strip', bonus: 35, desc: 'A river of neon signs.' },
  { id: 'jungle-canopy', name: 'Jungle Canopy', bonus: 25, desc: 'Green canopy to the horizon.' },
  { id: 'snow-peak', name: 'Snow Peak', bonus: 45, desc: 'A white peak in the sun.' },
];

export const PASSENGER_TYPES = [
  { id: 'tourist', name: 'Tourist', count: 2, tipChance: 0.4, nervous: 1, desc: 'First time in a helicopter.' },
  { id: 'couple', name: 'Couple', count: 2, tipChance: 0.7, nervous: 1, desc: 'A romantic flight.' },
  { id: 'family', name: 'Family', count: 4, tipChance: 0.3, nervous: 2, desc: 'Kids pressed to the windows.' },
  { id: 'photographer', name: 'Photographer', count: 1, tipChance: 0.6, nervous: 0, desc: 'Here for the shots.' },
  { id: 'vip', name: 'VIP', count: 1, tipChance: 0.9, nervous: 0, desc: 'Important, and knows it.' },
  { id: 'birthday', name: 'Birthday Group', count: 5, tipChance: 0.5, nervous: 1, desc: 'Celebrating in the sky.' },
  { id: 'nervous', name: 'Nervous Flyer', count: 1, tipChance: 0.2, nervous: 3, desc: 'White knuckles all the way.' },
  { id: 'influencer', name: 'Influencer', count: 2, tipChance: 0.8, nervous: 0, desc: 'Filming everything.' },
];

export const PILOT_RANKS = [
  { id: 'student', name: 'Student Pilot', xpNeeded: 0, perk: 'Short routes only.' },
  { id: 'private', name: 'Private Pilot', xpNeeded: 150, perk: 'All routes plus 10 percent fares.' },
  { id: 'commercial', name: 'Commercial Pilot', xpNeeded: 500, perk: 'VIP charters plus 20 percent fares.' },
  { id: 'atp', name: 'Airline Transport Pilot', xpNeeded: 1500, perk: 'Rescue missions plus 35 percent fares.' },
  { id: 'ace', name: 'Ace Pilot', xpNeeded: 4000, perk: 'Plus 50 percent fares and storm flights.' },
];

export const HELI_MISSIONS = [
  { id: 'first-flight', name: 'First Flight', desc: 'Complete your first tour.', reward: 100 },
  { id: 'ten-tours', name: 'Ten Tours', desc: 'Complete 10 tours.', reward: 500 },
  { id: 'photo-ten', name: 'Photo Ten', desc: 'Nail 10 photo waypoints.', reward: 400 },
  { id: 'sunset-five', name: 'Sunset Five', desc: 'Complete 5 sunset tours.', reward: 600 },
  { id: 'vip-five', name: 'VIP Five', desc: 'Fly 5 VIP passengers.', reward: 800 },
  { id: 'rescue-one', name: 'First Rescue', desc: 'Complete a rescue mission.', reward: 1500 },
  { id: 'storm-flight', name: 'Storm Flight', desc: 'Complete a flight in a storm.', reward: 2000 },
  { id: 'perfect-tour', name: 'Perfect Tour', desc: 'Finish a tour with 5 star satisfaction.', reward: 700 },
  { id: 'grand-tour-5', name: 'Grand Tour Five', desc: 'Complete 5 Grand Tours.', reward: 1200 },
  { id: 'earn-10000', name: 'Earn 10000', desc: 'Earn 10000 dollars from flights.', reward: 2500 },
];

export const RADIO_JOBS = [
  { id: 'rescue-hiker', name: 'Rescue Hiker', pay: 800, difficulty: 2, desc: 'A hiker is stuck on the ridge.' },
  { id: 'rescue-boat', name: 'Rescue Boat', pay: 1000, difficulty: 3, desc: 'A boat is taking on water.' },
  { id: 'medevac', name: 'Medevac', pay: 2000, difficulty: 4, desc: 'A patient needs the hospital, fast.' },
  { id: 'vip-charter', name: 'VIP Charter', pay: 1500, difficulty: 2, desc: 'A VIP needs a quick hop.' },
  { id: 'fire-spot', name: 'Fire Spotting', pay: 600, difficulty: 3, desc: 'Spot fires from the air.' },
  { id: 'cargo-lift', name: 'Cargo Lift', pay: 1200, difficulty: 3, desc: 'Lift a heavy load to the ridge.' },
  { id: 'news-chase', name: 'News Chase', pay: 900, difficulty: 4, desc: 'Follow a breaking story.' },
  { id: 'wedding', name: 'Wedding Flight', pay: 700, difficulty: 1, desc: 'Fly the couple to the venue.' },
];

export const FLIGHT_WEATHER = [
  { weather: 'clear', stability: 0, payMult: 1.0, note: 'Perfect flying weather.' },
  { weather: 'clouds', stability: -0.5, payMult: 1.0, note: 'Cloudy but fine.' },
  { weather: 'rain', stability: -1.5, payMult: 1.2, note: 'Rainy, bumpy ride.' },
  { weather: 'storm', stability: -3, payMult: 1.5, note: 'Storm — dangerous flying.' },
  { weather: 'fog', stability: -2, payMult: 1.1, note: 'Foggy, low visibility.' },
];

export const PRE_FLIGHT_CHECKLIST = [
  'Check fuel level',
  'Inspect rotor blades',
  'Test radio',
  'Check oil pressure',
  'Walk around the helicopter',
  'Brief the passengers',
  'Check weather report',
  'Secure loose items',
];

export const HELIPORTS = [
  { id: 'marina', name: 'Marina Heliport', fuelPrice: 2, fee: 10, desc: 'By the water, busy at sunset.' },
  { id: 'downtown', name: 'Downtown Heliport', fuelPrice: 3, fee: 20, desc: 'On a rooftop downtown.' },
  { id: 'airport', name: 'Airport Heliport', fuelPrice: 2, fee: 15, desc: 'Next to the runways.' },
  { id: 'harbor', name: 'Harbor Heliport', fuelPrice: 2, fee: 5, desc: 'Cheap fuel by the docks.' },
  { id: 'stadium', name: 'Stadium Heliport', fuelPrice: 3, fee: 12, desc: 'Close to the game.' },
  { id: 'mountain', name: 'Mountain Heliport', fuelPrice: 4, fee: 8, desc: 'High up, thin air.' },
];

export const FLIGHT_LOGBOOK = [
  { flight: 'First solo', note: 'Shaky hands, big grin.' },
  { flight: 'Sunset over the bay', note: 'Passengers went quiet.' },
  { flight: 'Storm dodge', note: 'Landed just before the rain.' },
  { flight: 'Island hop', note: 'Six landings, no complaints.' },
  { flight: 'Night neon', note: 'The city looked like a circuit board.' },
];

export const AIR_TRAFFIC = [
  { id: 'c172', name: 'Cessna 172', altitude: 3000, note: 'A small trainer buzzing by.' },
  { id: 'a320', name: 'Airbus A320', altitude: 10000, note: 'An airliner on approach.' },
  { id: 'heli2', name: 'News Helicopter', altitude: 1500, note: 'Chasing a story.' },
  { id: 'blimp', name: 'Blimp', altitude: 2000, note: 'Slow and proud.' },
  { id: 'drone', name: 'Delivery Drone', altitude: 400, note: 'Carrying a small package.' },
];

export const PILOT_STORIES = [
  'An old pilot once landed on a rooftop in a storm.',
  'The first tour pilot flew with a paper map.',
  'A seagull once hitched a ride for a whole tour.',
  'The marina heliport was built in a single weekend.',
  'A VIP once tipped a pilot with a gold watch.',
];

export const NIGHT_FLIGHT_RULES = [
  'Lights on before takeoff.',
  'Stay above 500 feet over the city.',
  'No flights in fog at night.',
  'File a flight plan after dark.',
];

export const FUEL_PRICES = [
  { heliport: 'marina', price: 2 },
  { heliport: 'downtown', price: 3 },
  { heliport: 'airport', price: 2 },
  { heliport: 'harbor', price: 2 },
  { heliport: 'stadium', price: 3 },
  { heliport: 'mountain', price: 4 },
];

export const SCENIC_VIEWPOINTS = [
  { id: 'bay-view', name: 'Bay View', bestHour: 18, bonus: 20, desc: 'The whole bay at golden hour.' },
  { id: 'ridge-view', name: 'Ridge View', bestHour: 8, bonus: 15, desc: 'Morning light on the ridge.' },
  { id: 'harbor-view', name: 'Harbor View', bestHour: 14, bonus: 15, desc: 'Ships and cranes below.' },
  { id: 'city-view', name: 'City View', bestHour: 20, bonus: 25, desc: 'City lights coming on.' },
  { id: 'island-view', name: 'Island View', bestHour: 10, bonus: 20, desc: 'Turquoise water around the islands.' },
  { id: 'peak-view', name: 'Peak View', bestHour: 9, bonus: 30, desc: 'The highest point in Solara.' },
  { id: 'beach-view', name: 'Beach View', bestHour: 17, bonus: 15, desc: 'Long shadows on the sand.' },
  { id: 'neon-view', name: 'Neon View', bestHour: 22, bonus: 30, desc: 'The strip in full neon.' },
];

export const MAINTENANCE = [
  { check: 'rotor', name: 'Rotor Inspection', cost: 200, desc: 'Check blades and bearings.' },
  { check: 'engine', name: 'Engine Service', cost: 400, desc: 'Oil, filters and spark plugs.' },
  { check: 'avionics', name: 'Avionics Check', cost: 300, desc: 'Radios and instruments.' },
  { check: 'fuel', name: 'Fuel System', cost: 150, desc: 'Lines, pumps and tanks.' },
];

export const PASSENGER_REVIEWS = [
  { stars: 5, text: 'Best flight of my life!' },
  { stars: 5, text: 'The pilot was amazing.' },
  { stars: 4, text: 'Great views, a little bumpy.' },
  { stars: 4, text: 'Loved it, would fly again.' },
  { stars: 3, text: 'Nice enough, nothing special.' },
  { stars: 3, text: 'A bit shaky for my taste.' },
  { stars: 2, text: 'Felt sick the whole time.' },
  { stars: 1, text: 'Never again.' },
];

export const FLIGHT_SCHOOLS = [
  { id: 'solara-flight-school', name: 'Solara Flight School', price: 500, desc: 'Learn the basics in a week.' },
  { id: 'ace-academy', name: 'Ace Academy', price: 2000, desc: 'Advanced training for pros.' },
];

export const FAMOUS_PILOTS = [
  { name: 'Amelia Hart', note: 'Flew around the world solo.' },
  { name: 'Captain Ria Voss', note: 'The first pilot of Solara.' },
  { name: 'Dusty Miller', note: 'Famous for storm rescues.' },
  { name: 'Lena Sky', note: 'Holds the city speed record.' },
];

export const AIRSPACE_RULES = [
  'Stay below 3000 feet over the city.',
  'Keep clear of the airport approach.',
  'No flying over the stadium during games.',
  'Helicopters yield to airliners.',
  'File a plan for night flights.',
];

export const HELI_FILMS = [
  { title: 'Rotor Days', year: 1985, note: 'A classic about a bush pilot.' },
  { title: 'Night Skyline', year: 1998, note: 'A heist film with a helicopter chase.' },
  { title: 'Storm Rescue', year: 2012, note: 'Based on a true rescue.' },
];

export const PILOT_CALLSIGNS = ['Skyhawk', 'Rotor', 'Cloud', 'Falcon', 'Breeze', 'Comet'];

export const AVIATION_MOTTOS = [
  'Fly safe, fly smooth.',
  'The sky is the limit.',
  'Smooth hands, calm mind.',
  'Every landing is a good landing.',
];

export const PILOT_PROVERBS = [
  'A good pilot is always learning.',
  'Trust your instruments.',
  'There are old pilots and bold pilots, but no old bold pilots.',
  'The rotor never lies.',
];

export const FAMOUS_FLIGHTS = [
  { flight: 'First Solara Tour', year: 1990, note: 'Two passengers, one tiny helicopter.' },
  { flight: 'Storm Rescue of 2004', year: 2004, note: 'A daring rescue in a hurricane.' },
  { flight: 'Island Record', year: 2018, note: 'Twelve islands in one day.' },
];

function heliById(id) {
  for (const h of HELICOPTERS) if (h.id === id) return h;
  return null;
}

function routeById(id) {
  for (const r of TOUR_ROUTES) if (r.id === id) return r;
  return null;
}

function rankById(id) {
  for (const r of PILOT_RANKS) if (r.id === id) return r;
  return PILOT_RANKS[0];
}

function weatherRecFor(word) {
  for (const w of FLIGHT_WEATHER) if (w.weather === word) return w;
  return FLIGHT_WEATHER[0];
}

export function fareFor(route, passengerCount, hour, rankMult, weatherMult) {
  const bonus = Math.abs(hour - route.bestHour) <= 1 ? 1.25 : 1;
  return Math.round(route.fare * passengerCount * (rankMult || 1) * (weatherMult || 1) * bonus);
}

export function fuelCost(litres, heliportId) {
  const rec = FUEL_PRICES.find((p) => p.heliport === heliportId);
  const price = rec ? rec.price : 2;
  return Math.round(litres * price);
}

export function flightTimeFor(route, heli) {
  return Math.round((route.minutes * 60) / heli.speed);
}

export function fuelNeededFor(route, heli) {
  return Math.round(route.minutes * heli.fuelBurn * 0.4);
}

export function satisfactionFrom(smoothness, photosNailed, photosTotal, turbulence) {
  let s = 5;
  if (smoothness < 50) s -= 1.5;
  else if (smoothness < 80) s -= 0.5;
  if (photosTotal > 0 && photosNailed < photosTotal / 2) s -= 0.5;
  if (turbulence > 7) s -= 1;
  s = Math.max(1, Math.min(5, s));
  return Math.round(s * 2) / 2;
}

export function tipFor(pay, satisfaction, tipChance, rng) {
  const roll = typeof rng === 'function' ? rng() : Math.random();
  if (satisfaction >= 5 && roll < tipChance) return Math.round(pay * 0.25);
  if (satisfaction >= 4 && roll < 0.3) return Math.round(pay * 0.1);
  return 0;
}

export function bestRouteFor(hour, rankId, cash) {
  const pool = TOUR_ROUTES.filter((r) => rankId !== 'student' || r.stops <= 5);
  let best = null;
  let bestScore = -Infinity;
  for (const r of pool) {
    const bonus = Math.abs(hour - r.bestHour) <= 1 ? 1.25 : 1;
    const score = (r.fare * bonus) / r.minutes;
    if (score > bestScore) { bestScore = score; best = r; }
  }
  return best;
}

export function heliForPassengers(count, cash) {
  for (const h of HELICOPTERS) if (h.seats >= count && h.price <= cash) return h;
  for (const h of HELICOPTERS) if (h.seats >= count) return h;
  return HELICOPTERS[0];
}

export function pilotRankProgress(xp) {
  let current = PILOT_RANKS[0];
  let next = null;
  for (let i = 0; i < PILOT_RANKS.length; i++) {
    if (xp >= PILOT_RANKS[i].xpNeeded) {
      current = PILOT_RANKS[i];
      next = PILOT_RANKS[i + 1] || null;
    }
  }
  return { current, next, xpToNext: next ? next.xpNeeded - xp : 0 };
}

export function canFlyInWeather(weather, rankId) {
  if (weather === 'storm') return rankId === 'ace';
  if (weather === 'fog') return rankId === 'commercial' || rankId === 'atp' || rankId === 'ace';
  return true;
}

export function photoBonusTotal(nailedSpots) {
  let total = 0;
  for (const s of nailedSpots || []) total += s.bonus || 0;
  return total;
}

export function radioJobDifficultyLabel(difficulty) {
  if (difficulty <= 1) return 'Easy';
  if (difficulty === 2) return 'Moderate';
  if (difficulty === 3) return 'Hard';
  return 'Extreme';
}

export function viewpointForHour(hour) {
  const h = ((hour % 24) + 24) % 24;
  for (const v of SCENIC_VIEWPOINTS) if (v.bestHour === h) return v;
  return null;
}

export function viewpointBonus(viewpointId) {
  const v = SCENIC_VIEWPOINTS.find((x) => x.id === viewpointId);
  return v ? v.bonus : 0;
}

export function maintenanceCost(checkId) {
  const m = MAINTENANCE.find((x) => x.check === checkId);
  return m ? m.cost : 0;
}

export function reviewForStars(stars, rng) {
  const pool = PASSENGER_REVIEWS.filter((r) => r.stars === stars);
  if (pool.length === 0) return PASSENGER_REVIEWS[0];
  const roll = typeof rng === 'function' ? rng() : Math.random();
  return pool[Math.floor(roll * pool.length)];
}

export function totalMaintenanceCost() {
  return MAINTENANCE.reduce((a, m) => a + m.cost, 0);
}

export function schoolPrice(schoolId) {
  const s = FLIGHT_SCHOOLS.find((x) => x.id === schoolId);
  return s ? s.price : 0;
}

export function pilotForName(name) {
  const needle = String(name || '').toLowerCase();
  for (const p of FAMOUS_PILOTS) if (p.name.toLowerCase().includes(needle)) return p;
  return null;
}

export function airspaceRuleFor(index) {
  return AIRSPACE_RULES[((index % AIRSPACE_RULES.length) + AIRSPACE_RULES.length) % AIRSPACE_RULES.length];
}

export function filmForYearHeli(year) {
  for (const f of HELI_FILMS) if (f.year === year) return f;
  return null;
}

export function randomPilotCallsign(rng) {
  const roll = typeof rng === 'function' ? rng() : Math.random();
  return PILOT_CALLSIGNS[Math.floor(roll * PILOT_CALLSIGNS.length)];
}

export function aviationMottoFor(index) {
  return AVIATION_MOTTOS[((index % AVIATION_MOTTOS.length) + AVIATION_MOTTOS.length) % AVIATION_MOTTOS.length];
}

export function proverbPilot(index) {
  return PILOT_PROVERBS[((index % PILOT_PROVERBS.length) + PILOT_PROVERBS.length) % PILOT_PROVERBS.length];
}

export function famousFlightFor(name) {
  for (const f of FAMOUS_FLIGHTS) if (f.flight === name) return f;
  return null;
}

export function createHeliTourSystem(deps) {
  const d = deps || {};
  const rnd = typeof d.rng === 'function' ? d.rng : Math.random;
  const hourOf = typeof d.getHour === 'function' ? d.getHour : () => 12;
  const dayOf = typeof d.getDay === 'function' ? d.getDay : () => 1;
  const cashOf = typeof d.getCash === 'function' ? d.getCash : () => 0;
  const moveCash = typeof d.addCash === 'function' ? d.addCash : () => {};
  const say = typeof d.log === 'function' ? d.log : () => {};

  const state = {
    xp: 0,
    rank: 'student',
    heliId: 'robin',
    helisOwned: ['robin'],
    fuel: 100,
    fuelCapacity: 100,
    flight: null,
    totalTours: 0,
    totalEarned: 0,
    totalTips: 0,
    photosNailed: 0,
    photosMissed: 0,
    sunsetTours: 0,
    vipFlown: 0,
    rescues: 0,
    stormFlights: 0,
    perfectTours: 0,
    grandTours: 0,
    satisfactionSum: 0,
    satisfactionCount: 0,
    missionsDone: {},
    day: 1,
    flightsToday: 0,
    radioJob: null,
    radioCooldown: 0,
    album: [],
  };

  function weatherWord() {
    const w = typeof d.getWeather === 'function' ? d.getWeather() : null;
    if (!w) return 'clear';
    if (typeof w === 'string') return w;
    return w.condition || 'clear';
  }

  function rankRec() {
    return rankById(state.rank);
  }

  function fareMult() {
    if (state.rank === 'ace') return 1.5;
    if (state.rank === 'atp') return 1.35;
    if (state.rank === 'commercial') return 1.2;
    if (state.rank === 'private') return 1.1;
    return 1;
  }

  function heliRec() {
    return heliById(state.heliId) || HELICOPTERS[0];
  }

  function weatherInfo() {
    return weatherRecFor(weatherWord());
  }

  function refreshRank() {
    const progress = pilotRankProgress(state.xp);
    if (progress.current.id !== state.rank) {
      state.rank = progress.current.id;
      say('Promoted to ' + progress.current.name + '!');
    }
  }

  function missionDone(id) {
    return !!state.missionsDone[id];
  }

  function checkMission(id) {
    if (missionDone(id)) return;
    const mission = HELI_MISSIONS.find((m) => m.id === id);
    if (!mission) return;
    let done = false;
    if (id === 'first-flight') done = state.totalTours >= 1;
    else if (id === 'ten-tours') done = state.totalTours >= 10;
    else if (id === 'photo-ten') done = state.photosNailed >= 10;
    else if (id === 'sunset-five') done = state.sunsetTours >= 5;
    else if (id === 'vip-five') done = state.vipFlown >= 5;
    else if (id === 'rescue-one') done = state.rescues >= 1;
    else if (id === 'storm-flight') done = state.stormFlights >= 1;
    else if (id === 'perfect-tour') done = state.perfectTours >= 1;
    else if (id === 'grand-tour-5') done = state.grandTours >= 5;
    else if (id === 'earn-10000') done = state.totalEarned >= 10000;
    if (done) {
      state.missionsDone[id] = true;
      moveCash(mission.reward);
      state.totalEarned += mission.reward;
      say('Mission complete: ' + mission.name + ' — $' + mission.reward + '.');
    }
  }

  function checkAllMissions() {
    for (const m of HELI_MISSIONS) checkMission(m.id);
  }

  function buyHelicopter(heliId) {
    const heli = heliById(heliId);
    if (!heli) return { ok: false, error: 'unknown-helicopter' };
    if (state.helisOwned.includes(heliId)) {
      state.heliId = heliId;
      return { ok: true, equipped: heliId };
    }
    if (cashOf() < heli.price) return { ok: false, error: 'not-enough-cash' };
    moveCash(-heli.price);
    state.helisOwned.push(heliId);
    state.heliId = heliId;
    return { ok: true, heli: { ...heli } };
  }

  function refuel(amount) {
    let litres;
    if (amount === 'full') litres = state.fuelCapacity - state.fuel;
    else litres = Math.max(1, Math.min(state.fuelCapacity, amount === undefined || amount === null ? 50 : amount));
    if (state.fuel + litres > state.fuelCapacity) return { ok: false, error: 'tank-overflow' };
    const cost = litres * 2;
    if (cashOf() < cost) return { ok: false, error: 'not-enough-cash' };
    moveCash(-cost);
    state.fuel += litres;
    return { ok: true, fuel: Math.round(state.fuel), cost };
  }

  function startTour(routeId, passengerTypeId) {
    const route = routeById(routeId);
    if (!route) return { ok: false, error: 'unknown-route' };
    if (state.flight) return { ok: false, error: 'already-flying' };
    const pax = PASSENGER_TYPES.find((p) => p.id === passengerTypeId) || PASSENGER_TYPES[0];
    const heli = heliRec();
    if (pax.count > heli.seats) return { ok: false, error: 'too-many-passengers' };
    if (state.rank === 'student' && route.stops > 5) return { ok: false, error: 'rank-too-low' };
    if (!canFlyInWeather(weatherWord(), state.rank)) return { ok: false, error: 'bad-weather' };
    const need = fuelNeededFor(route, heli);
    if (state.fuel < need) return { ok: false, error: 'low-fuel' };
    const shuffled = [...PHOTO_SPOTS].sort(() => rnd() - 0.5);
    const spots = shuffled.slice(0, Math.min(3, route.stops)).map((s) => ({ id: s.id, name: s.name, bonus: s.bonus, done: false, nailed: false }));
    const fare = fareFor(route, pax.count, hourOf(), fareMult(), weatherInfo().payMult);
    state.flight = {
      kind: 'tour',
      routeId: route.id,
      routeName: route.name,
      passengerType: pax.id,
      passengerName: pax.name,
      passengerCount: pax.count,
      nervousness: pax.nervous,
      fare,
      stops: route.stops,
      stopsDone: 0,
      spots,
      smoothness: 100,
      turbulence: 0,
      fuelNeeded: need,
      elapsed: 0,
      duration: route.minutes * 60,
      satisfaction: 5,
    };
    state.fuel -= need;
    say('Tour started: ' + route.name + ' with ' + pax.name + '.');
    return { ok: true, flight: { ...state.flight, spots: state.flight.spots.map((s) => ({ ...s })) } };
  }

  function flyTick(dt, input) {
    if (!state.flight) return { ok: false, error: 'not-flying' };
    const step = dt || 0;
    const flight = state.flight;
    const heli = heliRec();
    const weather = weatherInfo();
    const base = Math.max(0, -weather.stability * 2 + 5 - heli.stability * 0.5);
    const target = base + (rnd() - 0.5) * 2;
    flight.turbulence = Math.max(0, Math.min(10, flight.turbulence + (target - flight.turbulence) * Math.min(1, step * 0.5)));
    if (input && input.aggressive) flight.smoothness -= (4 + flight.turbulence) * step;
    else if (input && input.gentle) flight.smoothness += 1 * step;
    else flight.smoothness -= flight.turbulence * 0.4 * step;
    flight.smoothness = Math.max(0, Math.min(100, flight.smoothness));
    if (flight.nervousness >= 2 && flight.turbulence > 7) flight.satisfaction = Math.max(1, flight.satisfaction - 0.1 * step);
    flight.elapsed += step;
    const progress = Math.min(1, flight.elapsed / flight.duration);
    const stopsDone = Math.floor(progress * flight.stops);
    if (stopsDone > flight.stopsDone) {
      flight.stopsDone = stopsDone;
      say('Waypoint ' + stopsDone + ' of ' + flight.stops + '.');
    }
    if (flight.elapsed >= flight.duration) return completeFlight();
    return { ok: true, flight: { ...flight, spots: flight.spots.map((s) => ({ ...s })) }, progress: Math.round(progress * 100) / 100 };
  }

  function takePhoto(spotIndex) {
    if (!state.flight) return { ok: false, error: 'not-flying' };
    const flight = state.flight;
    if (spotIndex < 0 || spotIndex >= flight.spots.length) return { ok: false, error: 'bad-spot' };
    const spot = flight.spots[spotIndex];
    if (spot.done) return { ok: false, error: 'already-photographed' };
    spot.done = true;
    const quality = Math.max(0, Math.min(100, 100 - flight.turbulence * 8 - (100 - flight.smoothness) * 0.3 + rnd() * 10));
    const nailed = quality >= 60;
    spot.nailed = nailed;
    if (nailed) {
      state.photosNailed += 1;
      flight.satisfaction = Math.min(5, flight.satisfaction + 0.3);
      state.album.push({ spotId: spot.id, quality: Math.round(quality) });
    } else {
      state.photosMissed += 1;
    }
    checkMission('photo-ten');
    return { ok: true, spot: { ...spot }, quality: Math.round(quality), bonus: nailed ? spot.bonus : 0 };
  }

  function completeFlight() {
    if (!state.flight) return { ok: false, error: 'not-flying' };
    const flight = state.flight;
    const nailedSpots = flight.spots.filter((s) => s.nailed);
    const satisfaction = satisfactionFrom(flight.smoothness, nailedSpots.length, flight.spots.length, flight.turbulence);
    const smoothBonus = flight.smoothness >= 80 ? 1.2 : flight.smoothness >= 50 ? 1 : 0.7;
    const photoBonus = photoBonusTotal(nailedSpots);
    const pax = PASSENGER_TYPES.find((p) => p.id === flight.passengerType) || PASSENGER_TYPES[0];
    const tip = tipFor(flight.fare, satisfaction, pax.tipChance, rnd);
    const pay = Math.round(flight.fare * smoothBonus) + photoBonus;
    const total = pay + tip;
    moveCash(total);
    state.totalEarned += total;
    state.totalTips += tip;
    state.dayEarned = (state.dayEarned || 0) + total;
    state.totalTours += 1;
    state.satisfactionSum += satisfaction;
    state.satisfactionCount += 1;
    state.flightsToday += 1;
    const hour = hourOf();
    if (flight.routeId === 'sunset' || (hour >= 17 && hour <= 19)) state.sunsetTours += 1;
    if (flight.passengerType === 'vip') state.vipFlown += 1;
    if (flight.routeId === 'grand-tour') state.grandTours += 1;
    if (satisfaction >= 5) state.perfectTours += 1;
    if (weatherWord() === 'storm') state.stormFlights += 1;
    state.xp += 20 + flight.stops * 5 + nailedSpots.length * 10;
    const wasRadio = flight.kind === 'radio';
    state.flight = null;
    if (wasRadio) {
      state.rescues += 1;
      checkMission('rescue-one');
    }
    refreshRank();
    checkAllMissions();
    say('Flight complete — satisfaction ' + satisfaction + ' stars, $' + total + '.');
    return { ok: true, flight: { ...flight, spots: flight.spots.map((s) => ({ ...s })) }, pay, tip, total, satisfaction: Math.round(satisfaction * 10) / 10 };
  }

  function abortFlight() {
    if (!state.flight) return { ok: false, error: 'not-flying' };
    const flight = state.flight;
    state.flight = null;
    const refund = Math.round(flight.fare * 0.3);
    moveCash(refund);
    state.satisfactionSum += 2;
    state.satisfactionCount += 1;
    return { ok: true, refund };
  }

  function radioCall() {
    if (state.radioJob) return { ok: false, error: 'job-waiting' };
    if (state.radioCooldown > 0) return { ok: false, error: 'radio-cooldown' };
    const job = RADIO_JOBS[Math.floor(rnd() * RADIO_JOBS.length)];
    const rankOrder = ['student', 'private', 'commercial', 'atp', 'ace'];
    if (job.difficulty === 4 && rankOrder.indexOf(state.rank) < rankOrder.indexOf('atp')) {
      return { ok: false, error: 'no-jobs' };
    }
    state.radioJob = { ...job, accepted: false };
    return { ok: true, job: { ...state.radioJob } };
  }

  function acceptRadioJob() {
    if (!state.radioJob) return { ok: false, error: 'no-job' };
    if (state.flight) return { ok: false, error: 'already-flying' };
    if (state.fuel < 25) return { ok: false, error: 'low-fuel' };
    const job = state.radioJob;
    state.radioJob = null;
    state.fuel -= 25;
    const stops = job.difficulty + 1;
    state.flight = {
      kind: 'radio',
      routeId: job.id,
      routeName: job.name,
      passengerType: 'rescue',
      passengerName: 'Rescue',
      passengerCount: 1,
      nervousness: 1,
      fare: job.pay,
      stops,
      stopsDone: 0,
      spots: [],
      smoothness: 100,
      turbulence: 0,
      fuelNeeded: 25,
      elapsed: 0,
      duration: stops * 90,
      satisfaction: 5,
    };
    return { ok: true, job: { ...job, accepted: true } };
  }

  function declineRadioJob() {
    if (!state.radioJob) return { ok: false, error: 'no-job' };
    state.radioJob = null;
    state.radioCooldown = 120;
    return { ok: true };
  }

  function missions() {
    return HELI_MISSIONS.map((m) => ({ ...m, done: missionDone(m.id) }));
  }

  function tick(dt) {
    const step = dt || 0;
    const today = dayOf();
    if (today !== state.day) {
      state.day = today;
      state.flightsToday = 0;
    }
    if (state.radioCooldown > 0) state.radioCooldown = Math.max(0, state.radioCooldown - step);
    if (!state.flight && !state.radioJob && state.radioCooldown <= 0) {
      if (rnd() < step * 0.005) radioCall();
    }
  }

  function hudLine() {
    if (state.totalTours === 0 && !state.flight) return '';
    const avg = state.satisfactionCount > 0 ? Math.round((state.satisfactionSum / state.satisfactionCount) * 10) / 10 : 0;
    let line = 'Heli ' + rankRec().name + ' · fuel ' + Math.round(state.fuel) + ' · ' + state.totalTours + ' tours · ' + avg + '★';
    if (state.flight) {
      const progress = Math.round((state.flight.elapsed / state.flight.duration) * 100);
      line += ' · flying ' + progress + '%';
    }
    return line;
  }

  function summary() {
    const avg = state.satisfactionCount > 0 ? Math.round((state.satisfactionSum / state.satisfactionCount) * 10) / 10 : 0;
    return {
      rankId: state.rank,
      xp: state.xp,
      heliId: state.heliId,
      fuel: Math.round(state.fuel),
      totalTours: state.totalTours,
      totalEarned: state.totalEarned,
      totalTips: state.totalTips,
      photosNailed: state.photosNailed,
      photosMissed: state.photosMissed,
      rescues: state.rescues,
      albumLength: state.album.length,
      missionsDone: Object.keys(state.missionsDone).length,
      averageSatisfaction: avg,
    };
  }

  function serialize() {
    return {
      xp: state.xp,
      rank: state.rank,
      heliId: state.heliId,
      helisOwned: [...state.helisOwned],
      fuel: state.fuel,
      totalTours: state.totalTours,
      totalEarned: state.totalEarned,
      totalTips: state.totalTips,
      photosNailed: state.photosNailed,
      photosMissed: state.photosMissed,
      sunsetTours: state.sunsetTours,
      vipFlown: state.vipFlown,
      rescues: state.rescues,
      stormFlights: state.stormFlights,
      perfectTours: state.perfectTours,
      grandTours: state.grandTours,
      satisfactionSum: state.satisfactionSum,
      satisfactionCount: state.satisfactionCount,
      missionsDone: { ...state.missionsDone },
      album: state.album.map((a) => ({ ...a })),
    };
  }

  function deserialize(saved) {
    const s = saved || {};
    if (typeof s.xp === 'number') state.xp = s.xp;
    if (typeof s.rank === 'string') state.rank = s.rank;
    if (typeof s.heliId === 'string') state.heliId = s.heliId;
    if (Array.isArray(s.helisOwned)) state.helisOwned = [...s.helisOwned];
    if (typeof s.fuel === 'number') state.fuel = s.fuel;
    if (typeof s.totalTours === 'number') state.totalTours = s.totalTours;
    if (typeof s.totalEarned === 'number') state.totalEarned = s.totalEarned;
    if (typeof s.totalTips === 'number') state.totalTips = s.totalTips;
    if (typeof s.photosNailed === 'number') state.photosNailed = s.photosNailed;
    if (typeof s.photosMissed === 'number') state.photosMissed = s.photosMissed;
    if (typeof s.sunsetTours === 'number') state.sunsetTours = s.sunsetTours;
    if (typeof s.vipFlown === 'number') state.vipFlown = s.vipFlown;
    if (typeof s.rescues === 'number') state.rescues = s.rescues;
    if (typeof s.stormFlights === 'number') state.stormFlights = s.stormFlights;
    if (typeof s.perfectTours === 'number') state.perfectTours = s.perfectTours;
    if (typeof s.grandTours === 'number') state.grandTours = s.grandTours;
    if (typeof s.satisfactionSum === 'number') state.satisfactionSum = s.satisfactionSum;
    if (typeof s.satisfactionCount === 'number') state.satisfactionCount = s.satisfactionCount;
    if (s.missionsDone && typeof s.missionsDone === 'object') state.missionsDone = { ...s.missionsDone };
    if (Array.isArray(s.album)) state.album = s.album.map((a) => ({ ...a }));
  }

  return {
    name: 'Heli Tours',
    state,
    buyHelicopter,
    refuel,
    startTour,
    flyTick,
    takePhoto,
    completeFlight,
    abortFlight,
    radioCall,
    acceptRadioJob,
    declineRadioJob,
    missions,
    tick,
    hudLine,
    summary,
    serialize,
    deserialize,
  };
}
