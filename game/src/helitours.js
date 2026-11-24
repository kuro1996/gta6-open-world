// helitours.js — Helicopter Tours: scenic flights, photo missions, charters.
// Rent a helicopter, fly tourists over the city, and hit the photo waypoints
// for tips. Sunset flights pay double, storm flights pay triple and scare
// everyone. Earn your pilot licence ranks, unlock bigger birds, and take on
// rescue and VIP charter missions when the radio calls. Pure logic, no
// rendering, no imports.
// Factory: createHeliTourSystem(deps) with deps { rng, getHour, getDay,
// getCash, addCash, addHeat, log, getPlayerPos, getWeather }.

// ---------------------------------------------------------------------------
// Data tables
// ---------------------------------------------------------------------------

// Helicopters: seats, speed, stability, fuel burn, rental price per flight.
export const HELICOPTERS = [
  { id: 'robin', name: 'Robin R22', price: 0, seats: 2, speed: 1.0, stability: 1, fuelBurn: 1, desc: 'A tiny two-seater. Shaky, cheap, honest.' },
  { id: 'jetranger', name: 'JetRanger', price: 800, seats: 3, speed: 1.2, stability: 2, fuelBurn: 1.2, desc: 'The tour-industry workhorse.' },
  { id: 'ec130', name: 'EC130', price: 2500, seats: 5, speed: 1.4, stability: 3, fuelBurn: 1.5, desc: 'Big windows, smooth ride, happy tourists.' },
  { id: 'bell407', name: 'Bell 407', price: 6000, seats: 5, speed: 1.7, stability: 4, fuelBurn: 1.8, desc: 'Fast and steady. The VIP favourite.' },
  { id: 'aw139', name: 'AW139', price: 15000, seats: 8, speed: 2.0, stability: 5, fuelBurn: 2.2, desc: 'A flying living room for eight.' },
  { id: 'chinook', name: 'Chinook Heavy', price: 30000, seats: 12, speed: 1.6, stability: 5, fuelBurn: 3.5, desc: 'Twelve seats and a cargo hook. A beast.' },
];

// Tour routes: waypoints, duration, base fare per passenger, best hour.
export const TOUR_ROUTES = [
  { id: 'city-lights', name: 'City Lights', stops: 4, minutes: 15, fare: 60, bestHour: 20, desc: 'Downtown at dusk, when the neon wakes up.' },
  { id: 'beach-run', name: 'Beach Run', stops: 3, minutes: 12, fare: 50, bestHour: 17, desc: 'The whole coastline in one golden sweep.' },
  { id: 'sunset', name: 'Sunset Special', stops: 5, minutes: 20, fare: 120, bestHour: 18, desc: 'Chase the sun as it drops into the sea.' },
  { id: 'island-hop', name: 'Island Hop', stops: 6, minutes: 25, fare: 150, bestHour: 10, desc: 'Three islands, six landings, one great story.' },
  { id: 'mountain', name: 'Mountain Ridge', stops: 4, minutes: 18, fare: 90, bestHour: 8, desc: 'Ridge lines and valleys at first light.' },
  { id: 'night-neon', name: 'Night Neon', stops: 5, minutes: 20, fare: 130, bestHour: 22, desc: 'The city from above at midnight.' },
  { id: 'harbour', name: 'Harbour Tour', stops: 3, minutes: 10, fare: 45, bestHour: 14, desc: 'Ships, cranes, and the working port.' },
  { id: 'grand-tour', name: 'Grand Tour', stops: 8, minutes: 35, fare: 250, bestHour: 12, desc: 'Everything. Every sight. One flight.' },
  { id: 'volcano', name: 'Volcano Rim', stops: 4, minutes: 22, fare: 180, bestHour: 9, desc: 'Circle the crater. Do not fly into it.' },
  { id: 'waterfall', name: 'Waterfall Run', stops: 3, minutes: 14, fare: 70, bestHour: 11, desc: 'Three waterfalls in the jungle valley.' },
  { id: 'stadium', name: 'Stadium Flyover', stops: 2, minutes: 8, fare: 40, bestHour: 19, desc: 'Match night from the best seat in the sky.' },
  { id: 'lighthouse', name: 'Lighthouse Loop', stops: 3, minutes: 12, fare: 55, bestHour: 16, desc: 'The old lighthouse and the cliffs below it.' },
];

// Photo waypoints: where tourists want their picture taken.
export const PHOTO_SPOTS = [
  { id: 'skyline', name: 'Skyline Vista', bonus: 25, desc: 'The whole downtown skyline in one frame.' },
  { id: 'sunset-sea', name: 'Sunset Over Sea', bonus: 40, desc: 'The sun touching the water.' },
  { id: 'bridge', name: 'Suspension Bridge', bonus: 20, desc: 'The bridge from directly above.' },
  { id: 'stadium-night', name: 'Stadium Lights', bonus: 30, desc: 'Floodlights and a full crowd.' },
  { id: 'waterfall-top', name: 'Waterfall Top', bonus: 35, desc: 'Looking straight down the falls.' },
  { id: 'island-aerial', name: 'Island Aerial', bonus: 30, desc: 'A perfect ring island from the air.' },
  { id: 'volcano-crater', name: 'Volcano Crater', bonus: 50, desc: 'Smoke, lava glow, and a lot of nerve.' },
  { id: 'yacht-fleet', name: 'Yacht Fleet', bonus: 25, desc: 'White yachts on blue water.' },
  { id: 'old-town', name: 'Old Town Roofs', bonus: 15, desc: 'Red tiles and church spires.' },
  { id: 'port-cranes', name: 'Port Cranes', bonus: 20, desc: 'Giant cranes like steel dinosaurs.' },
  { id: 'golf-course', name: 'Golf Course', bonus: 15, desc: 'Eighteen holes of green from above.' },
  { id: 'airport', name: 'Airport Runway', bonus: 20, desc: 'A jet taking off right below you.' },
  { id: 'lighthouse-beam', name: 'Lighthouse Beam', bonus: 30, desc: 'The beam sweeping the dark sea.' },
  { id: 'neon-strip', name: 'Neon Strip', bonus: 35, desc: 'The strip at full neon.' },
  { id: 'jungle-canopy', name: 'Jungle Canopy', bonus: 25, desc: 'Green as far as the eye can see.' },
  { id: 'snow-peak', name: 'Snow Peak', bonus: 45, desc: 'The white peak above the clouds.' },
];

// Passenger types: how many, how generous, how nervous.
export const PASSENGER_TYPES = [
  { id: 'tourist', name: 'Tourist', count: 2, tipChance: 0.4, nervous: 1, desc: 'Camera out, smiling, ready for anything.' },
  { id: 'couple', name: 'Honeymoon Couple', count: 2, tipChance: 0.7, nervous: 1, desc: 'Tips big if the sunset is perfect.' },
  { id: 'family', name: 'Family', count: 4, tipChance: 0.3, nervous: 2, desc: 'Kids press against the windows.' },
  { id: 'photographer', name: 'Photographer', count: 1, tipChance: 0.6, nervous: 0, desc: 'Wants the perfect angle, pays for hovering.' },
  { id: 'vip', name: 'VIP', count: 1, tipChance: 0.9, nervous: 0, desc: 'Pays triple, expects smooth and on time.' },
  { id: 'birthday', name: 'Birthday Group', count: 5, tipChance: 0.5, nervous: 1, desc: 'Loud, happy, and generous.' },
  { id: 'nervous', name: 'Nervous Flyer', count: 1, tipChance: 0.2, nervous: 3, desc: 'White knuckles. Smooth flying earns a tip.' },
  { id: 'influencer', name: 'Influencer', count: 2, tipChance: 0.8, nervous: 0, desc: 'Films everything. A good flight is free advertising.' },
];

// Pilot licence ranks.
export const PILOT_RANKS = [
  { id: 'student', name: 'Student Pilot', xpNeeded: 0, perk: 'Short routes only.' },
  { id: 'private', name: 'Private Pilot', xpNeeded: 150, perk: 'All routes, +10% fares.' },
  { id: 'commercial', name: 'Commercial Pilot', xpNeeded: 500, perk: 'VIP charters, +20% fares.' },
  { id: 'atp', name: 'Airline Transport Pilot', xpNeeded: 1500, perk: 'Rescue missions, +35% fares.' },
  { id: 'ace', name: 'Ace of the Skies', xpNeeded: 4000, perk: '+50% fares, storm flights.' },
];

// Special missions: radio calls that pay well and test skill.
export const HELI_MISSIONS = [
  { id: 'first-flight', name: 'First Flight', desc: 'Complete your first tour.', reward: 100 },
  { id: 'ten-tours', name: 'Ten Tours', desc: 'Complete 10 tours.', reward: 500 },
  { id: 'photo-ten', name: 'Photo Pro', desc: 'Nail 10 photo waypoints.', reward: 400 },
  { id: 'sunset-five', name: 'Sunset Chaser', desc: 'Complete 5 sunset tours.', reward: 600 },
  { id: 'vip-five', name: 'VIP Service', desc: 'Fly 5 VIP passengers.', reward: 800 },
  { id: 'rescue-one', name: 'First Rescue', desc: 'Complete a rescue mission.', reward: 1500 },
  { id: 'storm-flight', name: 'Storm Rider', desc: 'Complete a flight in a storm.', reward: 2000 },
  { id: 'perfect-tour', name: 'Perfect Tour', desc: 'Finish a tour with 5-star satisfaction.', reward: 700 },
  { id: 'grand-tour-5', name: 'Grand Tour Guide', desc: 'Complete 5 Grand Tours.', reward: 1200 },
  { id: 'earn-10000', name: 'Sky Baron', desc: 'Earn $10,000 from flights.', reward: 2500 },
];

// Rescue / charter jobs that come over the radio.
export const RADIO_JOBS = [
  { id: 'rescue-hiker', name: 'Rescue: Lost Hiker', pay: 800, difficulty: 2, desc: 'A hiker is stranded on the ridge. Winch them up.' },
  { id: 'rescue-boat', name: 'Rescue: Stranded Boat', pay: 1000, difficulty: 3, desc: 'A boat lost power off the coast. Airlift the crew.' },
  { id: 'medevac', name: 'Medevac', pay: 2000, difficulty: 4, desc: 'A patient needs the hospital now. Fly fast, fly smooth.' },
  { id: 'vip-charter', name: 'VIP Charter', pay: 1500, difficulty: 2, desc: 'A celebrity needs the airport in twenty minutes.' },
  { id: 'fire-spot', name: 'Fire Spotting', pay: 600, difficulty: 3, desc: 'Circle the wildfire and report the spread.' },
  { id: 'cargo-lift', name: 'Cargo Lift', pay: 1200, difficulty: 3, desc: 'Lift a generator to a rooftop site.' },
  { id: 'news-chase', name: 'News Chase', pay: 900, difficulty: 4, desc: 'Follow the story from the air for the evening news.' },
  { id: 'wedding', name: 'Wedding Flyover', pay: 700, difficulty: 1, desc: 'Fly the newlyweds over the beach at sunset.' },
];

// Weather effects on flying.
export const FLIGHT_WEATHER = [
  { weather: 'clear', stability: 0, payMult: 1.0, note: 'Perfect flying weather.' },
  { weather: 'clouds', stability: -0.5, payMult: 1.0, note: 'Cloudy but fine.' },
  { weather: 'rain', stability: -1.5, payMult: 1.2, note: 'Rain: bumpy, but tourists still pay.' },
  { weather: 'storm', stability: -3, payMult: 1.5, note: 'Storm: dangerous. Only aces fly.' },
  { weather: 'fog', stability: -2, payMult: 1.1, note: 'Fog: low visibility, fly by instruments.' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clampNum(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

export function fareFor(route, passengers, hour, rankMult, weatherMult) {
  const bestHourBonus = Math.abs(hour - route.bestHour) <= 1 ? 1.25 : 1;
  return Math.round(route.fare * passengers * bestHourBonus * rankMult * weatherMult);
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createHeliTourSystem(deps) {
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

  function rank() {
    return PILOT_RANKS.find((r) => r.id === state.rank) || PILOT_RANKS[0];
  }

  function fareMult() {
    if (state.rank === 'ace') return 1.5;
    if (state.rank === 'atp') return 1.35;
    if (state.rank === 'commercial') return 1.2;
    if (state.rank === 'private') return 1.1;
    return 1;
  }

  function heli() {
    return HELICOPTERS.find((h) => h.id === state.heliId) || HELICOPTERS[0];
  }

  function weatherInfo() {
    const w = getWeather();
    return FLIGHT_WEATHER.find((x) => x.weather === w) || FLIGHT_WEATHER[0];
  }

  function refreshRank() {
    let best = PILOT_RANKS[0];
    for (const r of PILOT_RANKS) if (state.xp >= r.xpNeeded) best = r;
    if (best.id !== state.rank) {
      state.rank = best.id;
      log(`Pilot rank up: ${best.name}! ${best.perk}`);
    }
  }

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const m = HELI_MISSIONS.find((x) => x.id === id);
    if (!m) return;
    let done = false;
    switch (id) {
      case 'first-flight': done = state.totalTours >= 1; break;
      case 'ten-tours': done = state.totalTours >= 10; break;
      case 'photo-ten': done = state.photosNailed >= 10; break;
      case 'sunset-five': done = state.sunsetTours >= 5; break;
      case 'vip-five': done = state.vipFlown >= 5; break;
      case 'rescue-one': done = state.rescues >= 1; break;
      case 'storm-flight': done = state.stormFlights >= 1; break;
      case 'perfect-tour': done = state.perfectTours >= 1; break;
      case 'grand-tour-5': done = state.grandTours >= 5; break;
      case 'earn-10000': done = state.totalEarned >= 10000; break;
      default: done = false;
    }
    if (!done) return;
    state.missionsDone[id] = true;
    addCash(m.reward);
    log(`Heli mission complete: ${m.name} (+$${m.reward}).`);
  }

  function buyHelicopter(heliId) {
    const h = HELICOPTERS.find((x) => x.id === heliId);
    if (!h) return { ok: false, error: 'unknown helicopter' };
    if (state.helisOwned.includes(heliId)) {
      state.heliId = heliId;
      return { ok: true, equipped: heliId };
    }
    if (getCash() < h.price) return { ok: false, error: 'not enough cash' };
    addCash(-h.price);
    state.helisOwned.push(heliId);
    state.heliId = heliId;
    log(`Bought ${h.name} ($${h.price}). ${h.seats} seats, speed x${h.speed}.`);
    return { ok: true, heli: h };
  }

  function refuel(amount) {
    const litres = amount === 'full' ? state.fuelCapacity - state.fuel : clampNum(Math.floor(amount) || 10, 1, state.fuelCapacity);
    const cost = Math.round(litres * 2);
    if (state.fuel + litres > state.fuelCapacity) return { ok: false, error: 'tank would overflow' };
    if (getCash() < cost) return { ok: false, error: 'not enough cash for fuel' };
    addCash(-cost);
    state.fuel += litres;
    return { ok: true, fuel: Math.round(state.fuel), cost };
  }

  function startTour(routeId, passengerTypeId) {
    const route = TOUR_ROUTES.find((r) => r.id === routeId);
    if (!route) return { ok: false, error: 'unknown route' };
    if (state.flight) return { ok: false, error: 'already flying' };
    const pax = PASSENGER_TYPES.find((p) => p.id === passengerTypeId) || PASSENGER_TYPES[0];
    const h = heli();
    if (pax.count > h.seats) return { ok: false, error: `${h.name} only seats ${h.seats}` };
    const rankIdx = PILOT_RANKS.findIndex((r) => r.id === state.rank);
    if (route.stops > 5 && rankIdx === 0) return { ok: false, error: 'needs Private Pilot licence for long routes' };
    const w = weatherInfo();
    if (w.weather === 'storm' && state.rank !== 'ace') return { ok: false, error: 'storm flying needs Ace rank' };
    const fuelNeeded = Math.round(route.minutes * h.fuelBurn * 0.4);
    if (state.fuel < fuelNeeded) return { ok: false, error: `need ${fuelNeeded} fuel (have ${Math.round(state.fuel)})` };
    // Pick photo waypoints for this route.
    const spots = [...PHOTO_SPOTS].sort(() => rng() - 0.5).slice(0, Math.min(3, route.stops));
    const hour = getHour();
    const fare = fareFor(route, pax.count, hour, fareMult(), w.payMult);
    state.flight = {
      kind: 'tour',
      routeId: route.id,
      routeName: route.name,
      passengerType: pax.id,
      passengerName: pax.name,
      passengers: pax.count,
      nervous: pax.nervous,
      fare,
      stops: route.stops,
      stopsDone: 0,
      spots: spots.map((s) => ({ ...s, done: false, nailed: false })),
      smoothness: 100,
      turbulence: 0,
      fuelNeeded,
      elapsed: 0,
      duration: route.minutes * 60,
      satisfaction: 5,
    };
    state.fuel -= fuelNeeded;
    log(`Tour started: ${route.name} with ${pax.count} ${pax.name.toLowerCase()} — $${fare} if they are happy.`);
    return { ok: true, flight: { ...state.flight, spots: state.flight.spots } };
  }

  function flyTick(dt, input) {
    const f = state.flight;
    if (!f) return { ok: false, error: 'not flying' };
    f.elapsed += dt;
    const h = heli();
    const w = weatherInfo();
    // Turbulence grows in bad weather and with a shaky helicopter.
    const turbBase = Math.max(0, -w.stability) * 2 + (5 - h.stability) * 0.5;
    f.turbulence = clampNum(f.turbulence + (turbBase - f.turbulence) * dt * 0.2 + (rng() - 0.5) * 4 * dt, 0, 10);
    const gentle = input && input.gentle;
    const aggressive = input && input.aggressive;
    if (aggressive) {
      f.smoothness = clampNum(f.smoothness - (4 + f.turbulence) * dt, 0, 100);
      f.stopsDone += 0;
    } else if (gentle) {
      f.smoothness = clampNum(f.smoothness + 1 * dt, 0, 100);
    } else {
      f.smoothness = clampNum(f.smoothness - f.turbulence * 0.4 * dt, 0, 100);
    }
    // Nervous passengers hate turbulence.
    if (f.turbulence > 7 && f.nervous >= 2) {
      f.satisfaction = clampNum(f.satisfaction - 0.5 * dt, 1, 5);
    }
    // Waypoints tick by as time passes.
    const progress = f.elapsed / f.duration;
    const shouldHave = Math.floor(progress * f.stops);
    if (shouldHave > f.stopsDone) {
      f.stopsDone = shouldHave;
      log(`Waypoint ${f.stopsDone}/${f.stops} — ${f.routeName}.`);
    }
    if (f.elapsed >= f.duration) {
      return completeFlightWithRescue();
    }
    return { ok: true, flight: { ...f, progress: Math.round(progress * 100) } };
  }

  function takePhoto(spotIdx) {
    const f = state.flight;
    if (!f) return { ok: false, error: 'not flying' };
    if (spotIdx < 0 || spotIdx >= f.spots.length) return { ok: false, error: 'no such photo spot' };
    const spot = f.spots[spotIdx];
    if (spot.done) return { ok: false, error: 'already photographed' };
    spot.done = true;
    // A good photo needs low turbulence and decent smoothness.
    const quality = clampNum(100 - f.turbulence * 8 - (100 - f.smoothness) * 0.3 + rng() * 10, 0, 100);
    const nailed = quality >= 60;
    spot.nailed = nailed;
    spot.quality = Math.round(quality);
    if (nailed) {
      state.photosNailed++;
      state.album.push({ spot: spot.name, quality: spot.quality, day: getDay() });
      f.satisfaction = clampNum(f.satisfaction + 0.3, 1, 5);
      log(`Photo nailed: ${spot.name} (${spot.quality}%)! +$${spot.bonus} tip.`);
      checkMission('photo-ten');
      return { ok: true, spot, quality: spot.quality, bonus: spot.bonus };
    }
    state.photosMissed++;
    log(`Photo missed: ${spot.name} (${spot.quality}%) — too shaky.`);
    return { ok: true, spot, quality: spot.quality, bonus: 0 };
  }

  function completeFlight() {
    const f = state.flight;
    if (!f) return { ok: false, error: 'not flying' };
    const smoothBonus = f.smoothness >= 80 ? 1.2 : f.smoothness >= 50 ? 1 : 0.7;
    const photoBonus = f.spots.filter((s) => s.nailed).reduce((sum, s) => sum + s.bonus, 0);
    let pay = Math.round(f.fare * smoothBonus) + photoBonus;
    const pax = PASSENGER_TYPES.find((p) => p.id === f.passengerType);
    let tip = 0;
    const sat = Math.round(clampNum(f.satisfaction, 1, 5));
    if (sat >= 5 && rng() < (pax ? pax.tipChance : 0.4)) tip = Math.round(pay * 0.25);
    else if (sat >= 4 && rng() < 0.3) tip = Math.round(pay * 0.1);
    const total = pay + tip;
    addCash(total);
    state.totalTours++;
    state.totalEarned += total;
    state.totalTips += tip;
    state.satisfactionSum += sat;
    state.satisfactionCount++;
    state.flightsToday++;
    const hour = getHour();
    if (f.routeId === 'sunset' || (hour >= 17 && hour <= 19)) state.sunsetTours++;
    if (f.passengerType === 'vip') state.vipFlown++;
    if (f.routeId === 'grand-tour') state.grandTours++;
    if (sat >= 5) state.perfectTours++;
    if (getWeather() === 'storm') state.stormFlights++;
    const xpGain = 20 + f.stops * 5 + f.spots.filter((s) => s.nailed).length * 10;
    state.xp += xpGain;
    const flight = { ...f, pay, tip, total, satisfaction: sat };
    state.flight = null;
    log(`Tour complete: ${f.routeName} — ${sat} stars, smoothness ${Math.round(f.smoothness)}%. Paid $${total}${tip ? ` (incl. $${tip} tip)` : ''}.`);
    refreshRank();
    checkMission('first-flight');
    checkMission('ten-tours');
    checkMission('sunset-five');
    checkMission('vip-five');
    checkMission('storm-flight');
    checkMission('perfect-tour');
    checkMission('grand-tour-5');
    checkMission('earn-10000');
    return { ok: true, flight };
  }

  function abortFlight() {
    const f = state.flight;
    if (!f) return { ok: false, error: 'not flying' };
    state.flight = null;
    const refund = Math.round(f.fare * 0.3);
    addCash(refund);
    log(`Flight aborted. Partial refund $${refund}. Passengers are not happy.`);
    state.satisfactionSum += 2;
    state.satisfactionCount++;
    return { ok: true, refund };
  }

  // --- Radio jobs ----------------------------------------------------------
  function radioCall() {
    if (state.radioJob) return { ok: false, error: 'a radio job is already waiting' };
    if (state.radioCooldown > 0) return { ok: false, error: `radio quiet for ${Math.ceil(state.radioCooldown)}s` };
    const job = RADIO_JOBS[Math.floor(rng() * RADIO_JOBS.length)];
    const rankIdx = PILOT_RANKS.findIndex((r) => r.id === state.rank);
    if (job.difficulty >= 4 && rankIdx < 3) {
      return { ok: false, error: 'no jobs right now — check back later' };
    }
    state.radioJob = { ...job, accepted: false, progress: 0 };
    log(`RADIO: ${job.name} — $${job.pay}. ${job.desc}`);
    return { ok: true, job: state.radioJob };
  }

  function acceptRadioJob() {
    const job = state.radioJob;
    if (!job) return { ok: false, error: 'no radio job waiting' };
    if (state.flight) return { ok: false, error: 'finish your current flight first' };
    const fuelNeeded = 25;
    if (state.fuel < fuelNeeded) return { ok: false, error: 'not enough fuel' };
    state.fuel -= fuelNeeded;
    job.accepted = true;
    state.flight = {
      kind: 'radio',
      routeId: job.id,
      routeName: job.name,
      passengerType: 'rescue',
      passengerName: 'Rescue',
      passengers: 1,
      nervous: 0,
      fare: job.pay,
      stops: job.difficulty + 1,
      stopsDone: 0,
      spots: [],
      smoothness: 100,
      turbulence: 0,
      fuelNeeded,
      elapsed: 0,
      duration: (job.difficulty + 1) * 90,
      satisfaction: 5,
    };
    log(`Accepted radio job: ${job.name}.`);
    return { ok: true, job };
  }

  function declineRadioJob() {
    if (!state.radioJob) return { ok: false, error: 'no radio job waiting' };
    const job = state.radioJob;
    state.radioJob = null;
    state.radioCooldown = 120;
    log(`Declined ${job.name}. The radio goes quiet for a while.`);
    return { ok: true };
  }

  function missions() {
    return HELI_MISSIONS.map((m) => ({ ...m, done: !!state.missionsDone[m.id] }));
  }

  function tick(dt) {
    const day = getDay();
    if (day !== state.day) {
      state.day = day;
      state.flightsToday = 0;
    }
    if (state.radioCooldown > 0) state.radioCooldown -= dt;
    // A rescue counts when a radio flight completes.
    if (state.flight && state.flight.kind === 'radio' && state.flight.elapsed >= state.flight.duration) {
      // completeFlight handles the payout; count the rescue here.
    }
    // Random radio call while idle.
    if (!state.flight && !state.radioJob && state.radioCooldown <= 0 && rng() < dt * 0.005) {
      radioCall();
    }
  }

  function hudLine() {
    if (state.totalTours === 0 && !state.flight) return '';
    const avg = state.satisfactionCount ? (state.satisfactionSum / state.satisfactionCount).toFixed(1) : '—';
    const flying = state.flight ? ` | Flying ${state.flight.routeName} ${Math.floor((state.flight.elapsed / state.flight.duration) * 100)}%` : '';
    return `Heli ${rank().name} | fuel ${Math.round(state.fuel)} | tours ${state.totalTours} | ${avg}★${flying}`;
  }

  function summary() {
    return {
      rank: state.rank,
      xp: state.xp,
      heli: state.heliId,
      fuel: Math.round(state.fuel),
      totalTours: state.totalTours,
      totalEarned: state.totalEarned,
      totalTips: state.totalTips,
      photosNailed: state.photosNailed,
      photosMissed: state.photosMissed,
      rescues: state.rescues,
      album: state.album.length,
      missionsDone: Object.keys(state.missionsDone).length,
      satisfaction: state.satisfactionCount ? Math.round((state.satisfactionSum / state.satisfactionCount) * 10) / 10 : 0,
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

  function deserialize(s) {
    if (!s || typeof s !== 'object') return;
    if (typeof s.xp === 'number') state.xp = s.xp;
    if (typeof s.rank === 'string') state.rank = s.rank;
    if (typeof s.heliId === 'string') state.heliId = s.heliId;
    if (Array.isArray(s.helisOwned)) state.helisOwned = [...s.helisOwned];
    for (const k of ['fuel', 'totalTours', 'totalEarned', 'totalTips', 'photosNailed', 'photosMissed', 'sunsetTours', 'vipFlown', 'rescues', 'stormFlights', 'perfectTours', 'grandTours', 'satisfactionSum', 'satisfactionCount']) {
      if (typeof s[k] === 'number') state[k] = s[k];
    }
    if (s.missionsDone) state.missionsDone = { ...s.missionsDone };
    if (Array.isArray(s.album)) state.album = s.album.map((a) => ({ ...a }));
  }

  // Count a rescue when a radio flight completes: wrap completeFlight.
  const _completeFlight = completeFlight;
  function completeFlightWithRescue() {
    const wasRadio = state.flight && state.flight.kind === 'radio';
    const res = _completeFlight();
    if (wasRadio && res.ok) {
      state.rescues++;
      checkMission('rescue-one');
    }
    return res;
  }

  return {
    state,
    buyHelicopter,
    refuel,
    startTour,
    flyTick,
    takePhoto,
    completeFlight: completeFlightWithRescue,
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

// ---------------------------------------------------------------------------
// Extra reference data: pilot checklist (flavour for the hangar board)
// ---------------------------------------------------------------------------

export const PRE_FLIGHT_CHECKLIST = [
  'Check fuel — never trust the gauge alone.',
  'Check rotor blades for nicks and cracks.',
  'Check the weather at the destination, not just here.',
  'Brief the passengers: doors, headsets, no standing up.',
  'Check the photo spots for the route before takeoff.',
  'Sunset flights: leave ten minutes early, the light waits for nobody.',
  'In a storm, fly around it. Never through it.',
  'Smooth beats fast. Tourists tip for smooth.',
];


// ---------------------------------------------------------------------------
// Part 3 — Heliports, flight logbook, air traffic, pilot stories
// ---------------------------------------------------------------------------

// Heliports: where you can land, refuel, and pick up passengers.
export const HELIPORTS = [
  { id: 'downtown-pad', name: 'Downtown Pad', fuelPrice: 2, fee: 0, desc: 'On top of the tallest tower.' },
  { id: 'airport-heli', name: 'Airport Heliport', fuelPrice: 2, fee: 20, desc: 'Next to the runways. Busy.' },
  { id: 'marina-pad', name: 'Marina Pad', fuelPrice: 3, fee: 0, desc: 'By the yachts. Great views.' },
  { id: 'hospital-pad', name: 'Hospital Pad', fuelPrice: 2, fee: 0, desc: 'Medevac base. Always open.' },
  { id: 'island-pad', name: 'Island Pad', fuelPrice: 4, fee: 50, desc: 'The only fuel for a hundred miles.' },
  { id: 'mountain-pad', name: 'Mountain Pad', fuelPrice: 3, fee: 30, desc: 'High altitude, thin air, careful.' },
];

// Flight logbook entries: notable flights (flavour + records).
export const FLIGHT_LOGBOOK = [
  { flight: 'First sunset tour', note: 'The sun dropped into the sea right as we passed the beach.' },
  { flight: 'Storm rescue', note: 'Flew through rain that felt like gravel. Brought them home.' },
  { flight: 'Grand tour', note: 'Thirty-five minutes, eight stops, zero complaints.' },
  { flight: 'VIP charter', note: 'A celebrity, a deadline, and a perfect landing.' },
  { flight: 'Volcano rim', note: 'The crater glowed. The passengers went silent.' },
];

// Air traffic notes: what shares the sky.
export const AIR_TRAFFIC = [
  { id: 'airliner', name: 'Airliner', altitude: 'high', note: 'Stay below their lanes.' },
  { id: 'news-heli', name: 'News Helicopter', altitude: 'low', note: 'They chase the same stories you do.' },
  { id: 'police-heli', name: 'Police Helicopter', altitude: 'mid', note: 'Give them room. They are working.' },
  { id: 'private-jet', name: 'Private Jet', altitude: 'high', note: 'Fast, loud, gone.' },
  { id: 'blimp', name: 'Advertising Blimp', altitude: 'low', note: 'Slow. Very slow. Fly around it.' },
];

// Pilot stories (flavour).
export const PILOT_STORIES = [
  'A pilot once landed on the downtown pad in a storm to deliver a heart for transplant.',
  'The EC130 with the big windows was bought after a tourist cried happy tears.',
  'The Chinook once lifted a whole food truck off a roof. Nobody knows why it was there.',
  'Sunset tours sell out in minutes on Fridays. Book the slot early.',
  'The best photo spot is the volcano crater at dawn. The worst is also the volcano crater.',
];

// Night flight rules.
export const NIGHT_FLIGHT_RULES = [
  'Night flights need working nav lights. Check them before takeoff.',
  'The city looks different at night. So do the landing pads.',
  'Tourists pay double for night neon tours. They are worth it.',
  'Fog at night is a no-go. Wait for morning.',
];

// Fuel price table by heliport.
export const FUEL_PRICES = [
  { heliport: 'downtown-pad', price: 2 },
  { heliport: 'airport-heli', price: 2 },
  { heliport: 'marina-pad', price: 3 },
  { heliport: 'hospital-pad', price: 2 },
  { heliport: 'island-pad', price: 4 },
  { heliport: 'mountain-pad', price: 3 },
];

// Pure helpers.

export function fuelCost(litres, heliportId) {
  const row = FUEL_PRICES.find((f) => f.heliport === heliportId);
  const price = row ? row.price : 2;
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
  if (photosTotal > 0 && photosNailed / photosTotal < 0.5) s -= 0.5;
  if (turbulence > 7) s -= 1;
  return Math.max(1, Math.min(5, Math.round(s * 2) / 2));
}

export function tipFor(pay, satisfaction, tipChance, rng) {
  if (satisfaction >= 5 && rng() < tipChance) return Math.round(pay * 0.25);
  if (satisfaction >= 4 && rng() < 0.3) return Math.round(pay * 0.1);
  return 0;
}

export function bestRouteFor(hour, rankId, cash) {
  const rankIdx = PILOT_RANKS.findIndex((r) => r.id === rankId);
  const routes = TOUR_ROUTES.filter((r) => (r.stops <= 5 || rankIdx > 0));
  let best = routes[0];
  let bestScore = -1;
  for (const r of routes) {
    const hourBonus = Math.abs(hour - r.bestHour) <= 1 ? 1.25 : 1;
    const score = (r.fare * hourBonus) / r.minutes;
    if (score > bestScore) { bestScore = score; best = r; }
  }
  return best;
}

export function heliForPassengers(count, cash) {
  const ok = HELICOPTERS.filter((h) => h.seats >= count && h.price <= cash);
  if (ok.length > 0) return ok[0];
  return HELICOPTERS.filter((h) => h.seats >= count)[0] || HELICOPTERS[0];
}

export function pilotRankProgress(xp) {
  let current = PILOT_RANKS[0];
  let next = null;
  for (let i = 0; i < PILOT_RANKS.length; i++) {
    if (xp >= PILOT_RANKS[i].xpNeeded) current = PILOT_RANKS[i];
    else { next = PILOT_RANKS[i]; break; }
  }
  return { current, next, toNext: next ? next.xpNeeded - xp : 0 };
}

export function canFlyInWeather(weather, rankId) {
  if (weather === 'storm') return rankId === 'ace';
  if (weather === 'fog') return ['commercial', 'atp', 'ace'].includes(rankId);
  return true;
}

export function photoBonusTotal(spots) {
  return spots.filter((s) => s.nailed).reduce((sum, s) => sum + s.bonus, 0);
}

export function radioJobDifficultyLabel(difficulty) {
  if (difficulty <= 1) return 'Easy';
  if (difficulty === 2) return 'Moderate';
  if (difficulty === 3) return 'Hard';
  return 'Extreme';
}


// ---------------------------------------------------------------------------
// Part 4 — Scenic viewpoints, maintenance, passenger reviews
// ---------------------------------------------------------------------------

// Scenic viewpoints: the best seats in the sky.
export const SCENIC_VIEWPOINTS = [
  { id: 'skyline-dusk', name: 'Skyline at Dusk', bestHour: 19, bonus: 30, desc: 'The city lights come on one by one.' },
  { id: 'beach-sunset', name: 'Beach Sunset', bestHour: 18, bonus: 40, desc: 'The sun drops into the sea.' },
  { id: 'mountain-dawn', name: 'Mountain Dawn', bestHour: 6, bonus: 35, desc: 'First light on the ridge.' },
  { id: 'island-noon', name: 'Island Noon', bestHour: 12, bonus: 20, desc: 'Turquoise water, white sand.' },
  { id: 'volcano-night', name: 'Volcano Night', bestHour: 22, bonus: 50, desc: 'Lava glow in the dark.' },
  { id: 'neon-midnight', name: 'Neon Midnight', bestHour: 0, bonus: 35, desc: 'The strip at full neon.' },
  { id: 'waterfall-morning', name: 'Waterfall Morning', bestHour: 9, bonus: 25, desc: 'Rainbows in the spray.' },
  { id: 'harbour-golden', name: 'Harbour Golden Hour', bestHour: 17, bonus: 25, desc: 'Ships and cranes in golden light.' },
];

// Helicopter maintenance schedule.
export const MAINTENANCE = [
  { check: 'daily', name: 'Daily Check', cost: 50, desc: 'Oil, blades, lights. Every morning.' },
  { check: 'weekly', name: 'Weekly Service', cost: 200, desc: 'Full inspection once a week.' },
  { check: 'monthly', name: 'Monthly Overhaul', cost: 800, desc: 'Deep service. Keeps the bird safe.' },
  { check: 'engine', name: 'Engine Overhaul', cost: 5000, desc: 'Every 500 flight hours.' },
];

// Passenger reviews (flavour).
export const PASSENGER_REVIEWS = [
  { stars: 5, text: 'Best experience of my holiday!' },
  { stars: 5, text: 'The sunset tour made me cry. In a good way.' },
  { stars: 4, text: 'Great flight, a little bumpy over the ridge.' },
  { stars: 4, text: 'The photos are amazing. The pilot was lovely.' },
  { stars: 3, text: 'Nice views, but I wanted more time at the volcano.' },
  { stars: 5, text: 'Our pilot pointed out every landmark. Brilliant.' },
  { stars: 2, text: 'Too much turbulence. I felt sick.' },
  { stars: 5, text: 'Proposed to my girlfriend over the beach. She said yes!' },
];

// Flight schools (flavour).
export const FLIGHT_SCHOOLS = [
  { id: 'city-air', name: 'City Air School', price: 500, desc: 'Learn to fly in a weekend.' },
  { id: 'coastal-air', name: 'Coastal Air Academy', price: 2000, desc: 'Serious training, serious pilots.' },
];

// Pure helpers.

export function viewpointForHour(hour) {
  const h = Math.floor(hour) % 24;
  return SCENIC_VIEWPOINTS.find((v) => v.bestHour === h) || null;
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
  return pool[Math.floor(rng() * pool.length)];
}

export function totalMaintenanceCost() {
  return MAINTENANCE.reduce((s, m) => s + m.cost, 0);
}

export function schoolPrice(schoolId) {
  const s = FLIGHT_SCHOOLS.find((x) => x.id === schoolId);
  return s ? s.price : 0;
}


// ---------------------------------------------------------------------------
// Part 5 — Famous pilots, airspace rules, heli films
// ---------------------------------------------------------------------------

export const FAMOUS_PILOTS = [
  { name: 'Amelia Earhart', note: 'Flew across the Atlantic. Alone.' },
  { name: 'Charles Lindbergh', note: 'First solo flight across the Atlantic.' },
  { name: 'Chuck Yeager', note: 'First to break the sound barrier.' },
  { name: 'Sully Sullenberger', note: 'Landed a plane on a river. Everybody lived.' },
];

export const AIRSPACE_RULES = [
  'Stay below 500 feet over the city.',
  'Never fly over the prison. The tower guards do not joke.',
  'The airport has a no-fly zone. Respect it.',
  'Night flights need nav lights on.',
  'In fog, fly by instruments or do not fly at all.',
];

export const HELI_FILMS = [
  { title: 'Apocalypse Now', year: 1979, note: 'The helicopters. The music. Unforgettable.' },
  { title: 'Black Hawk Down', year: 2001, note: 'A rescue that became a battle.' },
  { title: 'Airwolf', year: 1984, note: 'A helicopter that could do anything.' },
];

export function pilotForName(name) {
  return FAMOUS_PILOTS.find((p) => p.name.toLowerCase().includes(name.toLowerCase())) || null;
}

export function airspaceRuleFor(index) {
  return AIRSPACE_RULES[index % AIRSPACE_RULES.length];
}

export function filmForYearHeli(year) {
  return HELI_FILMS.find((f) => f.year === year) || null;
}


// ---------------------------------------------------------------------------
// Part 6 — Pilot callsigns, aviation mottos
// ---------------------------------------------------------------------------

export const PILOT_CALLSIGNS = [
  'Maverick',
  'Iceman',
  'Goose',
  'Viper',
  'Falcon',
  'Hawk',
];

export const AVIATION_MOTTOS = [
  'Smooth is fast.',
  'Aviate, navigate, communicate.',
  'The sky is not the limit. It is the office.',
  'Every landing you walk away from is a good landing.',
];

export function randomPilotCallsign(rng) {
  return PILOT_CALLSIGNS[Math.floor(rng() * PILOT_CALLSIGNS.length)];
}

export function aviationMottoFor(index) {
  return AVIATION_MOTTOS[index % AVIATION_MOTTOS.length];
}


// ---------------------------------------------------------------------------
// Part 7 — Pilot proverbs, famous flights
// ---------------------------------------------------------------------------

export const PILOT_PROVERBS = [
  'There are old pilots and bold pilots, but no old bold pilots.',
  'The propeller is just a fan to keep the pilot cool.',
  'Flying is hours of boredom punctuated by moments of terror.',
  'A smooth landing is a pilot signature.',
];

export const FAMOUS_FLIGHTS = [
  { flight: 'First powered flight', year: 1903, note: 'Wright brothers, 12 seconds.' },
  { flight: 'First Atlantic crossing', year: 1927, note: 'Lindbergh, 33 hours.' },
  { flight: 'Miracle on the Hudson', year: 2009, note: 'Everybody lived.' },
];

export function proverbPilot(index) {
  return PILOT_PROVERBS[index % PILOT_PROVERBS.length];
}

export function famousFlightFor(name) {
  return FAMOUS_FLIGHTS.find((f) => f.flight === name) || null;
}
