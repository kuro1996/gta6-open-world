export const BUS_DEPOT = { id: 'depot', name: 'Solara Transit Depot', x: 110, z: 100, district: 'Industrial' };

export const BUS_ROUTES = [
  { id: 'downtown-loop', name: 'Downtown Loop', fare: 3, basePay: 90, difficulty: 1, stops: [
    { id: 'central', name: 'Central Station', x: 0, z: 0 },
    { id: 'mall', name: 'Solara Mall', x: 20, z: -140 },
    { id: 'diner', name: "Ria's Diner", x: 40, z: 30 },
    { id: 'hotel', name: 'Grand Solara Hotel', x: 160, z: 60 },
    { id: 'depot', name: 'Solara Transit Depot', x: 110, z: 100 },
  ] },
  { id: 'harbor-line', name: 'Harbor Line', fare: 4, basePay: 130, difficulty: 2, stops: [
    { id: 'central', name: 'Central Station', x: 0, z: 0 },
    { id: 'warehouse', name: 'Harbor Warehouse 9', x: -180, z: 120 },
    { id: 'marina', name: 'Marina Bay', x: 190, z: 140 },
    { id: 'gas', name: 'FuelMax Station', x: 90, z: 150 },
    { id: 'depot', name: 'Solara Transit Depot', x: 110, z: 100 },
  ] },
  { id: 'northside-express', name: 'Northside Express', fare: 5, basePay: 170, difficulty: 3, stops: [
    { id: 'central', name: 'Central Station', x: 0, z: 0 },
    { id: 'apartments', name: 'Palm Court Apartments', x: -100, z: -60 },
    { id: 'school', name: 'Northside High', x: -130, z: -170 },
    { id: 'stadium', name: 'Stadium', x: -200, z: -40 },
    { id: 'depot', name: 'Solara Transit Depot', x: 110, z: 100 },
  ] },
  { id: 'airport-shuttle', name: 'Airport Shuttle', fare: 6, basePay: 200, difficulty: 2, stops: [
    { id: 'central', name: 'Central Station', x: 0, z: 0 },
    { id: 'airport', name: 'Solara Intl Airport', x: 220, z: -180 },
    { id: 'hotel', name: 'Grand Solara Hotel', x: 160, z: 60 },
    { id: 'depot', name: 'Solara Transit Depot', x: 110, z: 100 },
  ] },
  { id: 'night-owl', name: 'Night Owl', fare: 7, basePay: 260, difficulty: 4, nightOnly: true, stops: [
    { id: 'central', name: 'Central Station', x: 0, z: 0 },
    { id: 'nightclub', name: 'Neon Reef Row', x: 60, z: 120 },
    { id: 'marina', name: 'Marina Bay', x: 190, z: 140 },
    { id: 'stadium', name: 'Stadium', x: -200, z: -40 },
    { id: 'depot', name: 'Solara Transit Depot', x: 110, z: 100 },
  ] },
];

export const BUS_MODELS = [
  { id: 'minibus', name: 'Minibus', price: 0, capacity: 12, speed: 1.0, comfort: 1, unlocked: true },
  { id: 'citybus', name: 'City Bus', price: 1500, capacity: 30, speed: 0.9, comfort: 2, unlocked: false },
  { id: 'articulated', name: 'Articulated Bus', price: 4000, capacity: 55, speed: 0.8, comfort: 3, unlocked: false },
  { id: 'electric', name: 'Electric Bus', price: 6000, capacity: 35, speed: 1.1, comfort: 4, unlocked: false },
  { id: 'party', name: 'Party Bus', price: 8000, capacity: 20, speed: 1.0, comfort: 5, unlocked: false },
];

export const BUS_PASSENGER_TYPES = [
  { id: 'commuter', name: 'Commuter', patience: 60, tipChance: 0.1, tip: 2, fare: 1.0 },
  { id: 'student', name: 'Student', patience: 90, tipChance: 0.05, tip: 1, fare: 0.5 },
  { id: 'tourist', name: 'Tourist', patience: 45, tipChance: 0.4, tip: 8, fare: 1.5 },
  { id: 'elderly', name: 'Elderly', patience: 120, tipChance: 0.2, tip: 3, fare: 0.5 },
  { id: 'worker', name: 'Worker', patience: 50, tipChance: 0.15, tip: 4, fare: 1.0 },
  { id: 'party', name: 'Party Goer', patience: 40, tipChance: 0.5, tip: 10, fare: 1.2 },
  { id: 'rude', name: 'Rude Passenger', patience: 25, tipChance: 0, tip: 0, fare: 1.0, rude: true },
  { id: 'musician', name: 'Musician', patience: 70, tipChance: 0.3, tip: 5, fare: 0.8 },
];

export const BUS_EVENTS = [
  { id: 'traffic', name: 'Traffic Jam', text: 'Traffic brings the bus to a crawl.' },
  { id: 'breakdown', name: 'Breakdown', text: 'Something under the hood gives up.' },
  { id: 'fare-dodger', name: 'Fare Dodger', text: 'Someone slips past without paying.' },
  { id: 'lost-child', name: 'Lost Child', text: 'A lost child finds their stop.' },
  { id: 'singer', name: 'Singer', text: 'A passenger sings a sweet song.' },
  { id: 'rain', name: 'Rain', text: 'Rain rattles on the roof.' },
  { id: 'inspector', name: 'Inspector', text: 'An inspector boards the bus.' },
  { id: 'proposal', name: 'Proposal', text: 'Someone proposes on the bus.' },
];

export const BUS_RANKS = [
  { rank: 0, name: 'Trainee', routesNeeded: 0, payMult: 1.0 },
  { rank: 1, name: 'Driver', routesNeeded: 5, payMult: 1.15 },
  { rank: 2, name: 'Senior Driver', routesNeeded: 15, payMult: 1.3 },
  { rank: 3, name: 'Route Master', routesNeeded: 30, payMult: 1.5 },
  { rank: 4, name: 'Transit Legend', routesNeeded: 60, payMult: 1.8 },
];

export const BUS_UPGRADES = [
  { id: 'ac', name: 'Air Conditioning', price: 500, desc: 'Comfort and happier passengers.' },
  { id: 'wifi', name: 'WiFi', price: 700, desc: 'Tips and rating.' },
  { id: 'engine', name: 'Tuned Engine', price: 900, desc: 'Plus 15 percent speed and fewer breakdowns.' },
  { id: 'seats', name: 'Comfy Seats', price: 600, desc: 'Comfort and patience.' },
  { id: 'display', name: 'Stop Display', price: 350, desc: 'Passengers alight on time.' },
  { id: 'camera', name: 'Fare Camera', price: 450, desc: 'Fare dodgers caught automatically.' },
  { id: 'horn', name: 'Loud Horn', price: 150, desc: 'Traffic parts.' },
  { id: 'paint', name: 'Fresh Paint', price: 800, desc: 'The city notices the bus.' },
];

const CHARTERS = [
  { id: 'school-trip', name: 'School Trip', pay: 300, needCapacity: 12 },
  { id: 'wedding-bus', name: 'Wedding Bus', pay: 500, needCapacity: 20 },
  { id: 'tour-group', name: 'Tour Group', pay: 400, needCapacity: 30 },
  { id: 'team-bus', name: 'Team Bus', pay: 650, needCapacity: 40 },
];

export function busRankFor(routesDone) {
  let out = 0;
  for (const r of BUS_RANKS) if (routesDone >= r.routesNeeded) out = r.rank;
  return out;
}

function routeById(id) {
  for (const r of BUS_ROUTES) if (r.id === id) return r;
  return null;
}

function modelById(id) {
  for (const m of BUS_MODELS) if (m.id === id) return m;
  return null;
}

function typeById(id) {
  for (const t of BUS_PASSENGER_TYPES) if (t.id === id) return t;
  return null;
}

export function createBusDriverSystem(deps) {
  const d = deps || {};
  const rnd = typeof d.rng === 'function' ? d.rng : Math.random;
  const cashOf = typeof d.getCash === 'function' ? d.getCash : () => 0;
  const moveCash = typeof d.addCash === 'function' ? d.addCash : () => {};
  const pushHeat = typeof d.addHeat === 'function' ? d.addHeat : () => {};
  const say = typeof d.log === 'function' ? d.log : () => {};
  const dayOf = typeof d.getDay === 'function' ? d.getDay : () => 1;
  const hourOf = typeof d.getHour === 'function' ? d.getHour : () => 12;
  const posOf = typeof d.getPlayerPos === 'function' ? d.getPlayerPos : () => ({ x: 0, z: 0 });
  const speedOf = typeof d.getSpeed === 'function' ? d.getSpeed : () => 0;

  const state = {
    rank: 0,
    routesDone: 0,
    routesFailed: 0,
    totalEarned: 0,
    tipsEarned: 0,
    passengersCarried: 0,
    faresCollected: 0,
    rating: 4.0,
    ratingCount: 20,
    bus: 'minibus',
    ownedBuses: ['minibus'],
    upgrades: [],
    activeRoute: null,
    shift: null,
    shiftRoutes: 0,
    breakdowns: 0,
    fareDodgers: 0,
    dodgersCaught: 0,
    complaints: 0,
    compliments: 0,
    bestOnTime: null,
    totalLateMinutes: 0,
    nightRoutes: 0,
    perfectRoutes: 0,
    eventsSeen: {},
    routeHistory: {},
    fuel: 100,
    condition: 100,
    lastRouteDay: 0,
    consecutiveOnTime: 0,
    bestStreak: 0,
    chartersDone: 0,
    schoolRuns: 0,
    toursDone: 0,
    washes: 0,
    lostFound: 0,
    karaokeNights: 0,
  };

  function rankInfo() {
    return BUS_RANKS[state.rank] || BUS_RANKS[0];
  }

  function busInfo() {
    return modelById(state.bus) || BUS_MODELS[0];
  }

  function hasUpgrade(id) {
    return state.upgrades.includes(id);
  }

  function comfort() {
    let c = busInfo().comfort;
    if (hasUpgrade('ac')) c += 1;
    if (hasUpgrade('seats')) c += 1;
    if (hasUpgrade('wifi')) c += 1;
    return c;
  }

  function speedMult() {
    let m = busInfo().speed;
    if (hasUpgrade('engine')) m *= 1.15;
    if (state.condition < 50) m *= 0.85;
    return m;
  }

  function capacity() {
    return busInfo().capacity;
  }

  function startRoute(routeId) {
    if (state.activeRoute) return { ok: false, reason: 'route-active' };
    const route = routeById(routeId);
    if (!route) return { ok: false, reason: 'unknown-route' };
    const hour = hourOf();
    const night = hour >= 22 || hour < 5;
    if (route.nightOnly && !night) return { ok: false, reason: 'not-night' };
    if (routeId === 'night-owl' && state.rank < 2) return { ok: false, reason: 'rank-too-low' };
    if (state.fuel < 20) return { ok: false, reason: 'low-fuel' };
    const schedule = route.stops.map((s, i) => ({ stopId: s.id, due: 60 + i * 75, arrived: false }));
    state.activeRoute = {
      routeId: route.id,
      routeName: route.name,
      stopIndex: 0,
      passengers: [],
      schedule,
      startedDay: dayOf(),
      lateBy: 0,
      doorsOpen: false,
      boarded: 0,
      alighted: 0,
      collected: 0,
      tips: 0,
      elapsed: 0,
    };
    return { ok: true, route: { ...state.activeRoute, passengers: [] }, passengers: [] };
  }

  function currentStop() {
    if (!state.activeRoute) return null;
    const route = routeById(state.activeRoute.routeId);
    return route ? route.stops[state.activeRoute.stopIndex] : null;
  }

  function openDoors() {
    if (!state.activeRoute) return { ok: false, reason: 'no-route' };
    const stop = currentStop();
    if (!stop) return { ok: false, reason: 'no-stop' };
    const pos = posOf();
    if (Math.hypot(pos.x - stop.x, pos.z - stop.z) > 25) return { ok: false, reason: 'too-far' };
    const route = routeById(state.activeRoute.routeId);
    const active = state.activeRoute;
    active.doorsOpen = true;
    let alighted = 0;
    const remaining = [];
    for (const p of active.passengers) {
      if (p.destination === stop.id) alighted += 1;
      else remaining.push(p);
    }
    active.passengers = remaining;
    active.alighted += alighted;
    let boarded = 0;
    let collected = 0;
    let tips = 0;
    const freeSeats = capacity() - active.passengers.length;
    let want = 1 + Math.floor(rnd() * 5);
    if (stop.id === 'central') want += 3;
    want = Math.min(want, Math.max(0, freeSeats));
    for (let i = 0; i < want; i++) {
      const type = BUS_PASSENGER_TYPES[Math.floor(rnd() * BUS_PASSENGER_TYPES.length)];
      const destIdx = state.activeRoute.stopIndex + 1 + Math.floor(rnd() * Math.max(1, route.stops.length - state.activeRoute.stopIndex - 1));
      const dest = route.stops[Math.min(destIdx, route.stops.length - 1)] || route.stops[route.stops.length - 1];
      const dodges = rnd() < 0.12 && !hasUpgrade('camera');
      const fare = Math.round(route.fare * type.fare);
      let tip = 0;
      if (!dodges && rnd() < type.tipChance * (1 + comfort() * 0.1)) tip = type.tip;
      const patience = type.patience * (hasUpgrade('seats') ? 1.25 : 1);
      active.passengers.push({ typeId: type.id, destination: dest.id, fare, dodger: dodges, patience, rude: !!type.rude, tip });
      boarded += 1;
      if (!dodges) collected += fare;
      tips += tip;
      if (dodges) state.fareDodgers += 1;
    }
    if (collected > 0) {
      moveCash(collected);
      state.totalEarned += collected;
      state.faresCollected += collected;
    }
    if (tips > 0) {
      moveCash(tips);
      state.totalEarned += tips;
      state.tipsEarned += tips;
    }
    active.boarded += boarded;
    active.collected += collected;
    active.tips += tips;
    state.passengersCarried += boarded;
    const due = active.schedule[active.stopIndex] ? active.schedule[active.stopIndex].due : 0;
    const late = Math.max(0, Math.floor(active.elapsed - due));
    if (late > 0) {
      active.lateBy += late;
      state.totalLateMinutes += Math.ceil(late / 60);
      state.consecutiveOnTime = 0;
    } else {
      state.consecutiveOnTime += 1;
      if (state.consecutiveOnTime > state.bestStreak) state.bestStreak = state.consecutiveOnTime;
    }
    if (active.schedule[active.stopIndex]) active.schedule[active.stopIndex].arrived = true;
    say('Doors open at ' + stop.name + ' — ' + boarded + ' boarded, ' + alighted + ' alighted.');
    return { ok: true, stopId: stop.id, alighted, boarded, collected, tips, lateSeconds: late };
  }

  function closeDoors() {
    if (!state.activeRoute) return { ok: false, reason: 'no-route' };
    const active = state.activeRoute;
    if (!active.doorsOpen) return { ok: false, reason: 'doors-closed' };
    active.doorsOpen = false;
    const rudeAboard = active.passengers.some((p) => p.rude);
    if (rudeAboard && active.lateBy > 30) {
      state.complaints += 1;
      state.rating = Math.max(1, state.rating - 0.05);
    }
    const route = routeById(active.routeId);
    active.stopIndex += 1;
    if (active.stopIndex >= route.stops.length) return finishRoute();
    const next = route.stops[active.stopIndex];
    return { ok: true, nextStopId: next.id, nextStopName: next.name };
  }

  function finishRoute() {
    if (!state.activeRoute) return { ok: false, reason: 'no-route' };
    const active = state.activeRoute;
    state.activeRoute = null;
    const route = routeById(active.routeId);
    state.routesDone += 1;
    state.shiftRoutes += 1;
    const base = Math.round(route.basePay * rankInfo().payMult);
    const onTime = active.lateBy <= 30;
    const bonus = onTime ? 40 : 0;
    const perfect = onTime && state.complaints === 0 && active.boarded >= 5;
    const perfectBonus = perfect ? 60 : 0;
    const total = base + bonus + perfectBonus;
    moveCash(total);
    state.totalEarned += total;
    if (onTime) state.rating = Math.min(5, state.rating + 0.05);
    else state.rating = Math.max(1, state.rating - 0.08);
    if (perfect) state.perfectRoutes += 1;
    if (active.routeId === 'night-owl') state.nightRoutes += 1;
    state.routeHistory[active.routeId] = (state.routeHistory[active.routeId] || 0) + 1;
    const oldRank = state.rank;
    const newRank = busRankFor(state.routesDone);
    const promoted = newRank > oldRank;
    if (promoted) state.rank = newRank;
    if (state.bestOnTime === null || active.elapsed < state.bestOnTime) state.bestOnTime = Math.round(active.elapsed);
    state.lastRouteDay = dayOf();
    state.fuel = Math.max(0, state.fuel - 15);
    state.condition = Math.max(0, state.condition - 3);
    say('Route done: ' + route.name + ' — $' + total + '.');
    return { ok: true, routeId: active.routeId, totalPay: total, basePay: base, bonus, perfectBonus, onTime, perfect, promoted, boarded: active.boarded, alighted: active.alighted };
  }

  function abandonRoute() {
    if (!state.activeRoute) return { ok: false, reason: 'no-route' };
    const active = state.activeRoute;
    const stranded = active.passengers.length;
    state.activeRoute = null;
    state.routesFailed += 1;
    state.rating = Math.max(1, state.rating - 0.15);
    state.complaints += 1;
    state.consecutiveOnTime = 0;
    return { ok: true, routeId: active.routeId, stranded };
  }

  function refuel() {
    const pos = posOf();
    if (Math.hypot(pos.x - BUS_DEPOT.x, pos.z - BUS_DEPOT.z) > 25) return { ok: false, reason: 'too-far' };
    if (state.fuel >= 100) return { ok: false, reason: 'tank-full' };
    const cost = Math.ceil((100 - state.fuel) * 0.8);
    if (cashOf() < cost) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-cost);
    state.fuel = 100;
    return { ok: true, cost };
  }

  function repairBus() {
    const pos = posOf();
    if (Math.hypot(pos.x - BUS_DEPOT.x, pos.z - BUS_DEPOT.z) > 25) return { ok: false, reason: 'too-far' };
    if (state.condition >= 100) return { ok: false, reason: 'bus-fine' };
    const cost = Math.ceil((100 - state.condition) * 3);
    if (cashOf() < cost) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-cost);
    state.condition = 100;
    return { ok: true, cost };
  }

  function buyBus(busId) {
    const model = modelById(busId);
    if (!model) return { ok: false, reason: 'unknown-bus' };
    if (cashOf() < model.price && !state.ownedBuses.includes(busId)) return { ok: false, reason: 'not-enough-cash' };
    if (state.ownedBuses.includes(busId)) {
      state.bus = busId;
      return { ok: true, busId, switched: true };
    }
    if (busId === 'articulated' && state.rank < 2) return { ok: false, reason: 'rank-too-low' };
    if ((busId === 'electric' || busId === 'party') && state.rank < 3) return { ok: false, reason: 'rank-too-low' };
    moveCash(-model.price);
    state.ownedBuses.push(busId);
    state.bus = busId;
    return { ok: true, busId, price: model.price };
  }

  function buyUpgrade(upgradeId) {
    const up = BUS_UPGRADES.find((u) => u.id === upgradeId);
    if (!up) return { ok: false, reason: 'unknown-upgrade' };
    if (hasUpgrade(upgradeId)) return { ok: false, reason: 'already-owned' };
    if (cashOf() < up.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-up.price);
    state.upgrades.push(upgradeId);
    return { ok: true, upgradeId, price: up.price };
  }

  function catchDodger() {
    if (!state.activeRoute) return { ok: false, reason: 'no-route' };
    const dodger = state.activeRoute.passengers.find((p) => p.dodger);
    if (!dodger) return { ok: false, reason: 'no-dodgers' };
    dodger.dodger = false;
    state.dodgersCaught += 1;
    moveCash(25);
    state.totalEarned += 25;
    return { ok: true, fine: 25 };
  }

  function handlePassengerComplaint() {
    if (!state.activeRoute) return { ok: false, reason: 'no-route' };
    const idx = state.activeRoute.passengers.findIndex((p) => p.rude);
    if (idx < 0) return { ok: false, reason: 'no-rude-passenger' };
    state.activeRoute.passengers.splice(idx, 1);
    state.complaints += 1;
    if (rnd() < 0.5) {
      pushHeat(5);
      return { ok: true, removed: true, heat: 5 };
    }
    state.rating = Math.min(5, state.rating + 0.03);
    return { ok: true, removed: true, heat: 0 };
  }

  function startShift() {
    if (state.shift) return { ok: false, reason: 'shift-active' };
    state.shift = { startedDay: dayOf(), routes: 0 };
    state.shiftRoutes = 0;
    return { ok: true, shift: { ...state.shift } };
  }

  function endShift() {
    if (!state.shift) return { ok: false, reason: 'no-shift' };
    const routes = state.shiftRoutes;
    const bonus = 20 * routes;
    moveCash(bonus);
    state.totalEarned += bonus;
    state.shift = null;
    return { ok: true, routes, bonus };
  }

  function applyBusEvent(eventId) {
    state.eventsSeen[eventId] = (state.eventsSeen[eventId] || 0) + 1;
    const active = state.activeRoute;
    if (eventId === 'traffic') {
      if (active) { active.lateBy += 45; state.totalLateMinutes += 1; }
    } else if (eventId === 'breakdown') {
      if (active && (state.condition < 40 || rnd() < 0.3)) {
        state.breakdowns += 1;
        active.lateBy += 120;
        state.totalLateMinutes += 2;
        state.condition = Math.max(0, state.condition - 10);
      }
    } else if (eventId === 'fare-dodger') {
      state.fareDodgers += 1;
    } else if (eventId === 'lost-child') {
      state.compliments += 1;
      state.rating = Math.min(5, state.rating + 0.05);
      moveCash(10);
      state.totalEarned += 10;
    } else if (eventId === 'singer') {
      state.compliments += 1;
      state.rating = Math.min(5, state.rating + 0.03);
    } else if (eventId === 'rain') {
      say('Rain rattles on the bus roof.');
    } else if (eventId === 'inspector') {
      if (active) {
        let fined = 0;
        for (const p of active.passengers) {
          if (p.dodger && fined < 2) { p.dodger = false; fined += 1; state.dodgersCaught += 1; }
        }
        if (fined > 0) {
          moveCash(fined * 25);
          state.totalEarned += fined * 25;
        }
      }
    } else if (eventId === 'proposal') {
      state.compliments += 2;
      state.rating = Math.min(5, state.rating + 0.1);
      moveCash(50);
      state.totalEarned += 50;
    }
    return eventId;
  }

  function tick(dt) {
    if (!state.activeRoute) return;
    const step = dt || 0;
    const active = state.activeRoute;
    active.elapsed += step;
    if (speedOf() > 1) {
      state.fuel = Math.max(0, state.fuel - 0.05 * step);
      state.condition = Math.max(0, state.condition - 0.01 * step);
    }
    for (const p of active.passengers) {
      p.patience -= step * (active.lateBy > 60 ? 2 : 1);
      if (p.patience <= 0 && active.doorsOpen) {
        state.complaints += 1;
        state.rating = Math.max(1, state.rating - 0.03);
        p.patience = 9999;
      }
    }
    if (rnd() < step * 0.004) {
      const ev = BUS_EVENTS[Math.floor(rnd() * BUS_EVENTS.length)];
      applyBusEvent(ev.id);
    }
    if (state.fuel <= 0) abandonRoute();
  }

  function tickDay(day) {
    const today = day !== undefined && day !== null ? day : dayOf();
    state.fuel = Math.min(100, state.fuel + 40);
    state.condition = Math.min(100, state.condition + 15);
    if (state.shift && state.shift.startedDay !== today) state.shift = null;
    if (today % 7 === 1) state.condition = 100;
    return { day: today, fuel: Math.round(state.fuel), condition: Math.round(state.condition), rating: Math.round(state.rating * 10) / 10 };
  }

  function interact() {
    const pos = posOf();
    if (Math.hypot(pos.x - BUS_DEPOT.x, pos.z - BUS_DEPOT.z) <= 25) {
      if (state.fuel < 50) { refuel(); return true; }
      if (state.condition < 60) { repairBus(); return true; }
      if (!state.shift) { startShift(); return true; }
      if (!state.activeRoute) { startRoute('downtown-loop'); return true; }
      return true;
    }
    if (state.activeRoute) {
      const stop = currentStop();
      if (stop && Math.hypot(pos.x - stop.x, pos.z - stop.z) <= 25) {
        if (state.activeRoute.doorsOpen) closeDoors();
        else openDoors();
        return true;
      }
    }
    return false;
  }

  function hudLine() {
    if (state.activeRoute) {
      const route = routeById(state.activeRoute.routeId);
      const next = route.stops[state.activeRoute.stopIndex];
      return 'BUS ' + state.activeRoute.routeName + ' → ' + (next ? next.name : 'depot') + ' · ' + state.activeRoute.passengers.length + '/' + capacity() + ' · late ' + state.activeRoute.lateBy + 's · ' + Math.round(state.rating * 10) / 10 + '★';
    }
    const pos = posOf();
    if (Math.hypot(pos.x - BUS_DEPOT.x, pos.z - BUS_DEPOT.z) <= 25) {
      return 'DEPOT · ' + rankInfo().name + ' · fuel ' + Math.round(state.fuel) + '% · ' + state.bus;
    }
    if (state.fuel < 20) return 'Low fuel — refuel at the depot.';
    return '';
  }

  function stats() {
    return {
      rankName: rankInfo().name,
      rank: state.rank,
      routesDone: state.routesDone,
      routesFailed: state.routesFailed,
      totalEarned: state.totalEarned,
      tipsEarned: state.tipsEarned,
      passengersCarried: state.passengersCarried,
      faresCollected: state.faresCollected,
      rating: Math.round(state.rating * 10) / 10,
      ratingCount: state.ratingCount,
      busId: state.bus,
      ownedBuses: [...state.ownedBuses],
      upgrades: [...state.upgrades],
      comfort: comfort(),
      capacity: capacity(),
      activeRouteId: state.activeRoute ? state.activeRoute.routeId : null,
      activeStopIndex: state.activeRoute ? state.activeRoute.stopIndex : null,
      passengersOnboard: state.activeRoute ? state.activeRoute.passengers.length : 0,
      onShift: !!state.shift,
      shiftRoutes: state.shiftRoutes,
      breakdowns: state.breakdowns,
      fareDodgers: state.fareDodgers,
      dodgersCaught: state.dodgersCaught,
      complaints: state.complaints,
      compliments: state.compliments,
      bestOnTime: state.bestOnTime,
      totalLateMinutes: state.totalLateMinutes,
      nightRoutes: state.nightRoutes,
      perfectRoutes: state.perfectRoutes,
      fuel: Math.round(state.fuel),
      condition: Math.round(state.condition),
      consecutiveOnTime: state.consecutiveOnTime,
      bestStreak: state.bestStreak,
      routeHistory: { ...state.routeHistory },
      eventsSeen: Object.keys(state.eventsSeen).length,
      chartersDone: state.chartersDone,
      schoolRuns: state.schoolRuns,
      toursDone: state.toursDone,
      washes: state.washes,
      lostFound: state.lostFound,
      karaokeNights: state.karaokeNights,
    };
  }

  function serialize() {
    return {
      rank: state.rank,
      routesDone: state.routesDone,
      routesFailed: state.routesFailed,
      totalEarned: state.totalEarned,
      tipsEarned: state.tipsEarned,
      passengersCarried: state.passengersCarried,
      faresCollected: state.faresCollected,
      rating: state.rating,
      ratingCount: state.ratingCount,
      bus: state.bus,
      ownedBuses: [...state.ownedBuses],
      upgrades: [...state.upgrades],
      shiftRoutes: state.shiftRoutes,
      breakdowns: state.breakdowns,
      fareDodgers: state.fareDodgers,
      dodgersCaught: state.dodgersCaught,
      complaints: state.complaints,
      compliments: state.compliments,
      bestOnTime: state.bestOnTime,
      totalLateMinutes: state.totalLateMinutes,
      nightRoutes: state.nightRoutes,
      perfectRoutes: state.perfectRoutes,
      fuel: state.fuel,
      condition: state.condition,
      lastRouteDay: state.lastRouteDay,
      bestStreak: state.bestStreak,
      routeHistory: { ...state.routeHistory },
      eventsSeen: { ...state.eventsSeen },
      chartersDone: state.chartersDone,
      schoolRuns: state.schoolRuns,
      toursDone: state.toursDone,
      washes: state.washes,
      lostFound: state.lostFound,
      karaokeNights: state.karaokeNights,
    };
  }

  function deserialize(saved) {
    const s = saved || {};
    state.rank = Math.floor(Number(s.rank) || 0);
    state.routesDone = Math.floor(Number(s.routesDone) || 0);
    state.routesFailed = Math.floor(Number(s.routesFailed) || 0);
    state.totalEarned = Number(s.totalEarned) || 0;
    state.tipsEarned = Number(s.tipsEarned) || 0;
    state.passengersCarried = Math.floor(Number(s.passengersCarried) || 0);
    state.faresCollected = Number(s.faresCollected) || 0;
    state.rating = Number(s.rating) || 4.0;
    state.ratingCount = Math.floor(Number(s.ratingCount) || 0);
    state.bus = typeof s.bus === 'string' ? s.bus : 'minibus';
    state.ownedBuses = Array.isArray(s.ownedBuses) && s.ownedBuses.length > 0 ? [...s.ownedBuses] : ['minibus'];
    state.upgrades = Array.isArray(s.upgrades) ? [...s.upgrades] : [];
    state.shiftRoutes = Math.floor(Number(s.shiftRoutes) || 0);
    state.breakdowns = Math.floor(Number(s.breakdowns) || 0);
    state.fareDodgers = Math.floor(Number(s.fareDodgers) || 0);
    state.dodgersCaught = Math.floor(Number(s.dodgersCaught) || 0);
    state.complaints = Math.floor(Number(s.complaints) || 0);
    state.compliments = Math.floor(Number(s.compliments) || 0);
    state.bestOnTime = s.bestOnTime === null || s.bestOnTime === undefined ? null : Number(s.bestOnTime);
    state.totalLateMinutes = Math.floor(Number(s.totalLateMinutes) || 0);
    state.nightRoutes = Math.floor(Number(s.nightRoutes) || 0);
    state.perfectRoutes = Math.floor(Number(s.perfectRoutes) || 0);
    state.fuel = Number(s.fuel) || 100;
    state.condition = Number(s.condition) || 100;
    state.lastRouteDay = Math.floor(Number(s.lastRouteDay) || 0);
    state.bestStreak = Math.floor(Number(s.bestStreak) || 0);
    state.routeHistory = s.routeHistory && typeof s.routeHistory === 'object' ? { ...s.routeHistory } : {};
    state.eventsSeen = s.eventsSeen && typeof s.eventsSeen === 'object' ? { ...s.eventsSeen } : {};
    state.chartersDone = Math.floor(Number(s.chartersDone) || 0);
    state.schoolRuns = Math.floor(Number(s.schoolRuns) || 0);
    state.toursDone = Math.floor(Number(s.toursDone) || 0);
    state.washes = Math.floor(Number(s.washes) || 0);
    state.lostFound = Math.floor(Number(s.lostFound) || 0);
    state.karaokeNights = Math.floor(Number(s.karaokeNights) || 0);
    state.activeRoute = null;
    state.shift = null;
    state.consecutiveOnTime = 0;
    return { ok: true };
  }

  function bookCharter(charterId) {
    const charter = CHARTERS.find((c) => c.id === charterId);
    if (!charter) return { ok: false, reason: 'unknown-charter' };
    if (capacity() < charter.needCapacity) return { ok: false, reason: 'capacity-too-low' };
    if (state.fuel < 30) return { ok: false, reason: 'low-fuel' };
    state.fuel -= 30;
    const pay = Math.round(charter.pay * rankInfo().payMult);
    moveCash(pay);
    state.totalEarned += pay;
    state.chartersDone += 1;
    state.passengersCarried += charter.needCapacity;
    return { ok: true, charterId, pay };
  }

  function schoolRun() {
    const hour = hourOf();
    if (hour < 6 || hour >= 9) return { ok: false, reason: 'wrong-hour' };
    const kids = 10 + Math.floor(rnd() * 15);
    const pay = kids * 3;
    moveCash(pay);
    state.totalEarned += pay;
    state.schoolRuns += 1;
    state.passengersCarried += kids;
    return { ok: true, kids, pay };
  }

  function sightseeingTour() {
    if (state.rank < 1) return { ok: false, reason: 'rank-too-low' };
    const tourists = 8 + Math.floor(rnd() * 12);
    const pay = tourists * 8;
    moveCash(pay);
    state.totalEarned += pay;
    state.toursDone += 1;
    state.rating = Math.min(5, state.rating + 0.05);
    return { ok: true, tourists, pay };
  }

  function washBus() {
    if (cashOf() < 25) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-25);
    state.condition = Math.min(100, state.condition + 5);
    state.rating = Math.min(5, state.rating + 0.03);
    state.washes += 1;
    return { ok: true, cost: 25 };
  }

  function lostProperty() {
    if (rnd() < 0.5) return { ok: false, reason: 'nothing-found' };
    const value = 10 + Math.floor(rnd() * 50);
    moveCash(value);
    state.totalEarned += value;
    state.lostFound += 1;
    return { ok: true, value };
  }

  function busKaraokeNight() {
    if (state.rank < 2) return { ok: false, reason: 'rank-too-low' };
    const riders = 15 + Math.floor(rnd() * 20);
    const pay = riders * 5;
    moveCash(pay);
    state.totalEarned += pay;
    state.karaokeNights += 1;
    return { ok: true, riders, pay };
  }

  return {
    name: 'Bus Driver',
    state,
    startRoute,
    openDoors,
    closeDoors,
    finishRoute,
    abandonRoute,
    refuel,
    repairBus,
    buyBus,
    buyUpgrade,
    catchDodger,
    handlePassengerComplaint,
    startShift,
    endShift,
    tick,
    tickDay,
    interact,
    hudLine,
    stats,
    serialize,
    deserialize,
    bookCharter,
    schoolRun,
    sightseeingTour,
    washBus,
    lostProperty,
    busKaraokeNight,
  };
}
