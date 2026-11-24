// Solara Transit — city bus driver: routes, timetables, passengers,
// fares, tips and breakdowns. Round 7, all-new system. Clock in at the
// depot, pick a route, and run it stop to stop: open the doors, take the
// fare, keep the schedule, and keep the passengers happy. Late buses lose
// tips; rude passengers cost rating; a clean record earns the night route
// and the articulated bus. The city rides with you — literally.
export const BUS_DEPOT = { id: 'depot', name: 'Solara Transit Depot', x: 110, z: 100, district: 'Industrial' };

export const BUS_ROUTES = [
  {
    id: 'downtown-loop', name: 'Downtown Loop', fare: 3, basePay: 90, difficulty: 1,
    stops: [
      { id: 'central', name: 'Central Station', x: 0, z: 0 },
      { id: 'mall', name: 'Solara Mall', x: 20, z: -140 },
      { id: 'diner', name: "Ria's Diner", x: 40, z: 30 },
      { id: 'hotel', name: 'Grand Solara Hotel', x: 160, z: 60 },
      { id: 'depot', name: 'Transit Depot', x: 110, z: 100 },
    ],
  },
  {
    id: 'harbor-line', name: 'Harbor Line', fare: 4, basePay: 130, difficulty: 2,
    stops: [
      { id: 'central', name: 'Central Station', x: 0, z: 0 },
      { id: 'warehouse', name: 'Harbor Warehouse 9', x: -180, z: 120 },
      { id: 'marina', name: 'Marina Bay', x: 190, z: 140 },
      { id: 'gas', name: 'FuelMax Station', x: 90, z: 150 },
      { id: 'depot', name: 'Transit Depot', x: 110, z: 100 },
    ],
  },
  {
    id: 'northside-express', name: 'Northside Express', fare: 5, basePay: 170, difficulty: 3,
    stops: [
      { id: 'central', name: 'Central Station', x: 0, z: 0 },
      { id: 'apartments', name: 'Palm Court Apartments', x: -100, z: -60 },
      { id: 'school', name: 'Northside High', x: -130, z: -170 },
      { id: 'stadium', name: 'Stadium', x: -200, z: -40 },
      { id: 'depot', name: 'Transit Depot', x: 110, z: 100 },
    ],
  },
  {
    id: 'airport-shuttle', name: 'Airport Shuttle', fare: 6, basePay: 200, difficulty: 2,
    stops: [
      { id: 'central', name: 'Central Station', x: 0, z: 0 },
      { id: 'airport', name: 'Solara Intl Airport', x: 220, z: -180 },
      { id: 'hotel', name: 'Grand Solara Hotel', x: 160, z: 60 },
      { id: 'depot', name: 'Transit Depot', x: 110, z: 100 },
    ],
  },
  {
    id: 'night-owl', name: 'Night Owl', fare: 7, basePay: 260, difficulty: 4, nightOnly: true,
    stops: [
      { id: 'central', name: 'Central Station', x: 0, z: 0 },
      { id: 'nightclub', name: 'Neon Reef Club', x: 60, z: 120 },
      { id: 'marina', name: 'Marina Bay', x: 190, z: 140 },
      { id: 'stadium', name: 'Stadium', x: -200, z: -40 },
      { id: 'depot', name: 'Transit Depot', x: 110, z: 100 },
    ],
  },
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
  { id: 'worker', name: 'Shift Worker', patience: 50, tipChance: 0.15, tip: 4, fare: 1.0 },
  { id: 'party', name: 'Party Goer', patience: 40, tipChance: 0.5, tip: 10, fare: 1.2 },
  { id: 'rude', name: 'Rude Passenger', patience: 25, tipChance: 0, tip: 0, fare: 1.0, rude: true },
  { id: 'musician', name: 'Street Musician', patience: 70, tipChance: 0.3, tip: 5, fare: 0.8 },
];

export const BUS_EVENTS = [
  { id: 'traffic', name: 'Traffic Jam', text: 'Gridlock ahead — the schedule slips.' },
  { id: 'breakdown', name: 'Breakdown', text: 'The engine coughs and dies. Passengers groan.' },
  { id: 'fare-dodger', name: 'Fare Dodger', text: 'Someone slips past without paying.' },
  { id: 'lost-child', name: 'Lost Child', text: 'A lost kid boards, crying. You help them find mom.' },
  { id: 'singer', name: 'Bus Singer', text: 'A passenger starts singing. The bus joins in.' },
  { id: 'rain', name: 'Sudden Rain', text: 'Rain hammers the roof. Everyone stays aboard longer.' },
  { id: 'inspector', name: 'Ticket Inspector', text: 'An inspector boards and checks every pass.' },
  { id: 'proposal', name: 'Bus Proposal', text: 'A passenger proposes on your bus! The crowd cheers.' },
];

export const BUS_RANKS = [
  { rank: 0, name: 'Trainee', routesNeeded: 0, payMult: 1.0 },
  { rank: 1, name: 'Driver', routesNeeded: 5, payMult: 1.15 },
  { rank: 2, name: 'Senior Driver', routesNeeded: 15, payMult: 1.3 },
  { rank: 3, name: 'Route Master', routesNeeded: 30, payMult: 1.5 },
  { rank: 4, name: 'Transit Legend', routesNeeded: 60, payMult: 1.8 },
];

export const BUS_UPGRADES = [
  { id: 'ac', name: 'Air Conditioning', price: 500, desc: '+comfort, happier passengers' },
  { id: 'wifi', name: 'Free WiFi', price: 700, desc: '+tips, +rating' },
  { id: 'engine', name: 'Tuned Engine', price: 900, desc: '+15% speed, fewer breakdowns' },
  { id: 'seats', name: 'Comfy Seats', price: 600, desc: '+comfort, +patience' },
  { id: 'display', name: 'Next-Stop Display', price: 350, desc: 'passengers alight on time' },
  { id: 'camera', name: 'Cabin Camera', price: 450, desc: 'fare dodgers caught automatically' },
  { id: 'horn', name: 'Air Horn', price: 150, desc: 'traffic parts for you' },
  { id: 'paint', name: 'Custom Paint', price: 800, desc: 'the city notices your bus' },
];

export function busRankFor(routesDone) {
  let rank = 0;
  for (let i = 0; i < BUS_RANKS.length; i++) {
    if (routesDone >= BUS_RANKS[i].routesNeeded) rank = i;
  }
  return rank;
}

export function createBusDriverSystem(deps = {}) {
  const rng = deps.rng || Math.random;
  const getCash = deps.getCash || (() => 0);
  const addCash = deps.addCash || (() => {});
  const addHeat = deps.addHeat || (() => {});
  const log = deps.log || (() => {});
  const getDay = deps.getDay || (() => 1);
  const getHour = deps.getHour || (() => 12);
  const getPlayerPos = deps.getPlayerPos || (() => ({ x: 0, z: 0 }));
  const getSpeed = deps.getSpeed || (() => 0);

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
    activeRoute: null, // { routeId, stopIndex, passengers: [], startedDay, schedule: [], lateBy, doorsOpen }
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
  };

  function rankInfo() { return BUS_RANKS[state.rank]; }
  function busInfo() { return BUS_MODELS.find((b) => b.id === state.bus) || BUS_MODELS[0]; }
  function hasUpgrade(id) { return state.upgrades.includes(id); }
  function comfort() {
    let c = busInfo().comfort;
    if (hasUpgrade('ac')) c += 1;
    if (hasUpgrade('seats')) c += 1;
    if (hasUpgrade('wifi')) c += 1;
    return c;
  }
  function speedMult() {
    let s = busInfo().speed;
    if (hasUpgrade('engine')) s *= 1.15;
    if (state.condition < 50) s *= 0.85;
    return s;
  }
  function capacity() { return busInfo().capacity; }

  function startRoute(routeId) {
    if (state.activeRoute) return { ok: false, reason: 'route-active' };
    const route = BUS_ROUTES.find((r) => r.id === routeId);
    if (!route) return { ok: false, reason: 'no-such-route' };
    const hour = getHour();
    const night = hour >= 22 || hour < 5;
    if (route.nightOnly && !night) return { ok: false, reason: 'night-only' };
    if (route.id === 'night-owl' && state.rank < 2) return { ok: false, reason: 'rank-too-low', need: 'Senior Driver' };
    if (state.fuel < 20) return { ok: false, reason: 'low-fuel', need: 20 };
    const schedule = route.stops.map((s, i) => ({ stopId: s.id, dueIn: 60 + i * 75, arrived: false }));
    state.activeRoute = {
      routeId: route.id,
      routeName: route.name,
      stopIndex: 0,
      passengers: [],
      schedule,
      startedDay: getDay(),
      lateBy: 0,
      doorsOpen: false,
      boarded: 0,
      alighted: 0,
      collected: 0,
      tips: 0,
      elapsed: 0,
    };
    log(`Route started: ${route.name} — ${route.stops.length} stops. First stop: ${route.stops[0].name}.`);
    return { ok: true, route: { ...state.activeRoute, passengers: [] } };
  }

  function openDoors() {
    const run = state.activeRoute;
    if (!run) return { ok: false, reason: 'no-route' };
    const route = BUS_ROUTES.find((r) => r.id === run.routeId);
    const stop = route.stops[run.stopIndex];
    const p = getPlayerPos();
    if (Math.hypot(stop.x - p.x, stop.z - p.z) > 25) {
      return { ok: false, reason: 'not-at-stop', stop: stop.name };
    }
    run.doorsOpen = true;
    // Passengers alight.
    const alighting = run.passengers.filter((ps) => ps.destination === stop.id);
    for (const ps of alighting) {
      run.passengers = run.passengers.filter((x) => x !== ps);
      run.alighted += 1;
      state.passengersCarried += 1;
    }
    // New passengers board, up to capacity.
    const free = capacity() - run.passengers.length;
    const waiting = 1 + Math.floor(rng() * 5) + (stop.id === 'central' ? 3 : 0);
    const boarding = Math.min(free, waiting);
    let collected = 0;
    let tips = 0;
    for (let i = 0; i < boarding; i++) {
      const type = BUS_PASSENGER_TYPES[Math.floor(rng() * BUS_PASSENGER_TYPES.length)];
      const destIdx = Math.min(route.stops.length - 1, run.stopIndex + 1 + Math.floor(rng() * (route.stops.length - run.stopIndex - 1 || 1)));
      const dest = route.stops[destIdx].id;
      const fare = Math.round(route.fare * type.fare);
      if (rng() < 0.12 && !hasUpgrade('camera')) {
        state.fareDodgers += 1;
        log('A fare dodger slips past without paying!');
      } else {
        collected += fare;
        state.faresCollected += fare;
        if (rng() < type.tipChance * (1 + comfort() * 0.1)) {
          const tip = type.tip;
          tips += tip;
          state.tipsEarned += tip;
        }
      }
      run.passengers.push({
        type: type.id,
        name: type.name,
        destination: dest,
        patience: type.patience * (hasUpgrade('seats') ? 1.25 : 1),
        rude: !!type.rude,
        boardedAt: run.stopIndex,
      });
      run.boarded += 1;
    }
    addCash(collected + tips);
    run.collected += collected;
    run.tips += tips;
    state.totalEarned += collected + tips;
    // Schedule check.
    const sched = run.schedule[run.stopIndex];
    const late = run.elapsed - sched.dueIn;
    if (late > 0) {
      run.lateBy += late;
      state.totalLateMinutes += Math.round(late / 60);
      state.consecutiveOnTime = 0;
    } else {
      state.consecutiveOnTime += 1;
      if (state.consecutiveOnTime > state.bestStreak) state.bestStreak = state.consecutiveOnTime;
    }
    sched.arrived = true;
    log(`Doors open at ${stop.name}: ${alighting.length} off, ${boarding} on. Fares $${collected}, tips $${tips}.${late > 0 ? ` LATE by ${Math.round(late)}s.` : ' On time!'}`);
    return { ok: true, stop: stop.id, alighted: alighting.length, boarded: boarding, collected, tips, late: Math.max(0, Math.round(late)) };
  }

  function closeDoors() {
    const run = state.activeRoute;
    if (!run) return { ok: false, reason: 'no-route' };
    if (!run.doorsOpen) return { ok: false, reason: 'doors-closed' };
    run.doorsOpen = false;
    // Rude passengers complain if the bus is late or crowded.
    const rude = run.passengers.filter((ps) => ps.rude);
    if (rude.length > 0 && run.lateBy > 30) {
      state.complaints += 1;
      state.rating = Math.max(1, state.rating - 0.05);
      log('A rude passenger complains loudly about the delay. Rating dips.');
    }
    // Advance to the next stop, or finish the route.
    run.stopIndex += 1;
    const route = BUS_ROUTES.find((r) => r.id === run.routeId);
    if (run.stopIndex >= route.stops.length) {
      return finishRoute();
    }
    const next = route.stops[run.stopIndex];
    log(`Doors closed. Next stop: ${next.name}.`);
    return { ok: true, nextStop: next.id, nextName: next.name };
  }

  function finishRoute() {
    const run = state.activeRoute;
    if (!run) return { ok: false, reason: 'no-route' };
    const route = BUS_ROUTES.find((r) => r.id === run.routeId);
    state.activeRoute = null;
    state.routesDone += 1;
    state.shiftRoutes += 1;
    const pay = Math.round(route.basePay * rankInfo().payMult);
    const onTime = run.lateBy <= 30;
    const perfect = onTime && state.complaints === 0 && run.boarded >= 5;
    const bonus = onTime ? 40 : 0;
    const perfectBonus = perfect ? 60 : 0;
    const total = pay + bonus + perfectBonus;
    addCash(total);
    state.totalEarned += total;
    if (onTime) {
      state.perfectRoutes += perfect ? 1 : 0;
      state.rating = Math.min(5, state.rating + 0.05);
      state.compliments += 1;
    } else {
      state.rating = Math.max(1, state.rating - 0.08);
    }
    if (route.nightOnly) state.nightRoutes += 1;
    state.routeHistory[route.id] = (state.routeHistory[route.id] || 0) + 1;
    const newRank = busRankFor(state.routesDone);
    let promoted = false;
    if (newRank > state.rank) {
      state.rank = newRank;
      promoted = true;
      log(`PROMOTED to ${BUS_RANKS[newRank].name}! Pay x${BUS_RANKS[newRank].payMult}.`);
    }
    if (state.bestOnTime === null || run.elapsed < state.bestOnTime) {
      state.bestOnTime = Math.round(run.elapsed);
    }
    state.lastRouteDay = getDay();
    state.fuel = Math.max(0, state.fuel - 15);
    state.condition = Math.max(0, state.condition - 3);
    log(`Route complete: ${route.name}! Pay $${pay}${bonus ? ` + on-time $${bonus}` : ''}${perfectBonus ? ` + perfect $${perfectBonus}` : ''} = $${total}. Fares $${run.collected}, tips $${run.tips}.`);
    return { ok: true, route: route.id, pay: total, base: pay, bonus, perfectBonus, onTime, perfect, promoted, boarded: run.boarded, alighted: run.alighted };
  }

  function abandonRoute() {
    if (!state.activeRoute) return { ok: false, reason: 'no-route' };
    const run = state.activeRoute;
    state.activeRoute = null;
    state.routesFailed += 1;
    state.rating = Math.max(1, state.rating - 0.15);
    state.complaints += 1;
    state.consecutiveOnTime = 0;
    log(`Route abandoned mid-way — ${run.passengers.length} passengers left stranded. Rating drops.`);
    return { ok: true, route: run.routeId, stranded: run.passengers.length };
  }

  function refuel() {
    const p = getPlayerPos();
    const d = Math.hypot(BUS_DEPOT.x - p.x, BUS_DEPOT.z - p.z);
    if (d > 25) return { ok: false, reason: 'not-at-depot' };
    const missing = 100 - state.fuel;
    if (missing <= 0) return { ok: false, reason: 'tank-full' };
    const cost = Math.ceil(missing * 0.8);
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.fuel = 100;
    log(`Bus refueled at the depot for $${cost}.`);
    return { ok: true, cost };
  }

  function repairBus() {
    const p = getPlayerPos();
    const d = Math.hypot(BUS_DEPOT.x - p.x, BUS_DEPOT.z - p.z);
    if (d > 25) return { ok: false, reason: 'not-at-depot' };
    const missing = 100 - state.condition;
    if (missing <= 0) return { ok: false, reason: 'bus-fine' };
    const cost = Math.ceil(missing * 3);
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.condition = 100;
    log(`Bus repaired at the depot for $${cost}.`);
    return { ok: true, cost };
  }

  function buyBus(busId) {
    const bus = BUS_MODELS.find((b) => b.id === busId);
    if (!bus) return { ok: false, reason: 'no-such-bus' };
    if (state.ownedBuses.includes(busId)) {
      state.bus = busId;
      log(`Switched to your ${bus.name}.`);
      return { ok: true, bus: busId, switched: true };
    }
    if (busId === 'articulated' && state.rank < 2) return { ok: false, reason: 'rank-too-low', need: 'Senior Driver' };
    if (busId === 'electric' && state.rank < 3) return { ok: false, reason: 'rank-too-low', need: 'Route Master' };
    if (busId === 'party' && state.rank < 3) return { ok: false, reason: 'rank-too-low', need: 'Route Master' };
    if (getCash() < bus.price) return { ok: false, reason: 'no-cash', need: bus.price };
    addCash(-bus.price);
    state.ownedBuses.push(busId);
    state.bus = busId;
    log(`Bought the ${bus.name} for $${bus.price}! Capacity ${bus.capacity}, comfort ${bus.comfort}.`);
    return { ok: true, bus: busId, price: bus.price };
  }

  function buyUpgrade(upId) {
    const up = BUS_UPGRADES.find((u) => u.id === upId);
    if (!up) return { ok: false, reason: 'no-such-upgrade' };
    if (hasUpgrade(upId)) return { ok: false, reason: 'already-owned' };
    if (getCash() < up.price) return { ok: false, reason: 'no-cash', need: up.price };
    addCash(-up.price);
    state.upgrades.push(upId);
    log(`Bus upgrade: ${up.name} for $${up.price}. ${up.desc}.`);
    return { ok: true, upgrade: upId, price: up.price };
  }

  function catchDodger() {
    const run = state.activeRoute;
    if (!run) return { ok: false, reason: 'no-route' };
    if (state.fareDodgers <= state.dodgersCaught) return { ok: false, reason: 'no-dodgers' };
    state.dodgersCaught += 1;
    const fine = 25;
    addCash(fine);
    state.totalEarned += fine;
    log(`Caught a fare dodger! They pay the $${fine} fine on the spot.`);
    return { ok: true, fine };
  }

  function handlePassengerComplaint() {
    const run = state.activeRoute;
    if (!run) return { ok: false, reason: 'no-route' };
    const rude = run.passengers.find((ps) => ps.rude);
    if (!rude) return { ok: false, reason: 'no-rude-passenger' };
    run.passengers = run.passengers.filter((ps) => ps !== rude);
    state.complaints += 1;
    if (rng() < 0.5) {
      addHeat(5);
      log('You threw the rude passenger off the bus. They call the cops!');
      return { ok: true, removed: true, heat: 5 };
    }
    state.rating = Math.min(5, state.rating + 0.03);
    log('You calmly handle the rude passenger. The other riders applaud.');
    return { ok: true, removed: true, heat: 0 };
  }

  function startShift() {
    if (state.shift) return { ok: false, reason: 'shift-active' };
    state.shift = { startedDay: getDay(), routes: 0 };
    state.shiftRoutes = 0;
    log('Bus shift started at the depot. Pick a route and run it.');
    return { ok: true, shift: { ...state.shift } };
  }

  function endShift() {
    if (!state.shift) return { ok: false, reason: 'no-shift' };
    const routes = state.shiftRoutes;
    const bonus = routes * 20;
    if (bonus > 0) {
      addCash(bonus);
      state.totalEarned += bonus;
    }
    state.shift = null;
    log(`Shift over: ${routes} routes run, shift bonus $${bonus}.`);
    return { ok: true, routes, bonus };
  }

  function tick(dt) {
    const run = state.activeRoute;
    if (!run) return;
    run.elapsed += dt;
    // Fuel burns while driving; the bus wears down.
    const moving = getSpeed() > 1;
    if (moving) {
      state.fuel = Math.max(0, state.fuel - dt * 0.05);
      state.condition = Math.max(0, state.condition - dt * 0.01);
    }
    // Passengers lose patience; the impatient ones get off angry at the next stop.
    for (const ps of run.passengers) {
      ps.patience -= dt * (run.lateBy > 60 ? 2 : 1);
      if (ps.patience <= 0) {
        ps.angry = true;
      }
    }
    // Angry passengers at the next door-opening leave a complaint.
    if (run.doorsOpen) {
      const angry = run.passengers.filter((ps) => ps.angry);
      if (angry.length > 0) {
        state.complaints += angry.length;
        state.rating = Math.max(1, state.rating - 0.03 * angry.length);
      }
    }
    // Random road events, rare.
    if (rng() < dt * 0.004) {
      const ev = BUS_EVENTS[Math.floor(rng() * BUS_EVENTS.length)];
      state.eventsSeen[ev.id] = (state.eventsSeen[ev.id] || 0) + 1;
      switch (ev.id) {
        case 'traffic':
          run.lateBy += 45;
          state.totalLateMinutes += 1;
          log('Traffic jam! The schedule slips by 45 seconds.');
          break;
        case 'breakdown': {
          if (state.condition < 40 || rng() < 0.3) {
            state.breakdowns += 1;
            run.lateBy += 120;
            state.totalLateMinutes += 2;
            state.condition = Math.max(0, state.condition - 10);
            log('BREAKDOWN! The engine dies. Passengers groan as you wait for the mechanic.');
          }
          break;
        }
        case 'fare-dodger':
          state.fareDodgers += 1;
          log('A fare dodger slips past without paying!');
          break;
        case 'lost-child':
          state.compliments += 1;
          state.rating = Math.min(5, state.rating + 0.05);
          addCash(10);
          state.totalEarned += 10;
          log('You help a lost kid find their mom. She tips you $10. Rating up!');
          break;
        case 'singer':
          state.compliments += 1;
          state.rating = Math.min(5, state.rating + 0.03);
          log('A passenger sings, the whole bus joins in. Morale up!');
          break;
        case 'rain':
          log('Sudden rain — everyone stays aboard a little longer.');
          break;
        case 'inspector': {
          const caught = Math.min(state.fareDodgers - state.dodgersCaught, 2);
          if (caught > 0) {
            state.dodgersCaught += caught;
            const fines = caught * 25;
            addCash(fines);
            state.totalEarned += fines;
            log(`Ticket inspector boards and fines ${caught} dodgers — $${fines} to you.`);
          } else {
            log('Ticket inspector boards. All passes in order.');
          }
          break;
        }
        case 'proposal':
          state.compliments += 2;
          state.rating = Math.min(5, state.rating + 0.1);
          addCash(50);
          state.totalEarned += 50;
          log('A passenger proposes on your bus! The couple tips you $50. Rating up!');
          break;
        default:
          log(`Bus: ${ev.text}`);
          break;
      }
    }
    // Out of fuel mid-route: the route fails.
    if (state.fuel <= 0) {
      log('Out of fuel mid-route! The bus rolls to a stop.');
      abandonRoute();
    }
  }

  function tickDay(day) {
    // New day: fuel and condition partially restored by the depot crew.
    state.fuel = Math.min(100, state.fuel + 40);
    state.condition = Math.min(100, state.condition + 15);
    if (state.shift && state.shift.startedDay !== day) endShift();
    // Monday maintenance: the depot services every bus for free.
    if (day % 7 === 1) {
      state.condition = 100;
      log('Monday depot maintenance — your bus is serviced for free.');
    }
    return { day, fuel: Math.round(state.fuel), condition: Math.round(state.condition), rating: Number(state.rating.toFixed(1)) };
  }

  function interact() {
    const p = getPlayerPos();
    // At the depot: refuel, repair, or clock in.
    const depotD = Math.hypot(BUS_DEPOT.x - p.x, BUS_DEPOT.z - p.z);
    if (depotD < 25) {
      if (state.fuel < 50) return refuel().ok;
      if (state.condition < 60) return repairBus().ok;
      if (!state.shift) return startShift().ok;
      if (!state.activeRoute) {
        const res = startRoute('downtown-loop');
        return res.ok || res.reason === 'low-fuel';
      }
      return true;
    }
    // On a route: open/close doors at the current stop.
    const run = state.activeRoute;
    if (run) {
      const route = BUS_ROUTES.find((r) => r.id === run.routeId);
      const stop = route.stops[Math.min(run.stopIndex, route.stops.length - 1)];
      const d = Math.hypot(stop.x - p.x, stop.z - p.z);
      if (d < 25) {
        if (!run.doorsOpen) return openDoors().ok;
        return closeDoors().ok;
      }
    }
    return false;
  }

  function hudLine() {
    const run = state.activeRoute;
    if (run) {
      const route = BUS_ROUTES.find((r) => r.id === run.routeId);
      const stop = route.stops[Math.min(run.stopIndex, route.stops.length - 1)];
      return `BUS ${run.routeName} → ${stop.name} · ${run.passengers.length}/${capacity()} pax · late ${Math.round(run.lateBy)}s · ★${state.rating.toFixed(1)}`;
    }
    const p = getPlayerPos();
    if (Math.hypot(BUS_DEPOT.x - p.x, BUS_DEPOT.z - p.z) < 25) {
      return `DEPOT · ${BUS_RANKS[state.rank].name} · fuel ${Math.round(state.fuel)}% · ${state.bus}`;
    }
    if (state.fuel < 20) return 'BUS fuel low — visit the depot!';
    return '';
  }

  function stats() {
    return {
      rank: BUS_RANKS[state.rank].name,
      rankIndex: state.rank,
      routesDone: state.routesDone,
      routesFailed: state.routesFailed,
      totalEarned: state.totalEarned,
      tipsEarned: state.tipsEarned,
      passengersCarried: state.passengersCarried,
      faresCollected: state.faresCollected,
      rating: Number(state.rating.toFixed(1)),
      ratingCount: state.ratingCount,
      bus: state.bus,
      ownedBuses: [...state.ownedBuses],
      upgrades: [...state.upgrades],
      comfort: comfort(),
      capacity: capacity(),
      activeRoute: state.activeRoute ? state.activeRoute.routeId : null,
      activeStop: state.activeRoute ? state.activeRoute.stopIndex : null,
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
      chartersDone: state.chartersDone || 0,
      schoolRuns: state.schoolRuns || 0,
      toursDone: state.toursDone || 0,
      washes: state.washes || 0,
      lostFound: state.lostFound || 0,
      karaokeNights: state.karaokeNights || 0,
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
      chartersDone: state.chartersDone || 0,
      schoolRuns: state.schoolRuns || 0,
      toursDone: state.toursDone || 0,
      washes: state.washes || 0,
      lostFound: state.lostFound || 0,
      karaokeNights: state.karaokeNights || 0,
    };
  }

  function deserialize(d) {
    if (!d) return;
    state.rank = d.rank ?? 0;
    state.routesDone = d.routesDone ?? 0;
    state.routesFailed = d.routesFailed ?? 0;
    state.totalEarned = d.totalEarned ?? 0;
    state.tipsEarned = d.tipsEarned ?? 0;
    state.passengersCarried = d.passengersCarried ?? 0;
    state.faresCollected = d.faresCollected ?? 0;
    state.rating = d.rating ?? 4.0;
    state.ratingCount = d.ratingCount ?? 20;
    state.bus = d.bus || 'minibus';
    state.ownedBuses = [...(d.ownedBuses || ['minibus'])];
    state.upgrades = [...(d.upgrades || [])];
    state.shiftRoutes = d.shiftRoutes ?? 0;
    state.breakdowns = d.breakdowns ?? 0;
    state.fareDodgers = d.fareDodgers ?? 0;
    state.dodgersCaught = d.dodgersCaught ?? 0;
    state.complaints = d.complaints ?? 0;
    state.compliments = d.compliments ?? 0;
    state.bestOnTime = d.bestOnTime ?? null;
    state.totalLateMinutes = d.totalLateMinutes ?? 0;
    state.nightRoutes = d.nightRoutes ?? 0;
    state.perfectRoutes = d.perfectRoutes ?? 0;
    state.fuel = d.fuel ?? 100;
    state.condition = d.condition ?? 100;
    state.lastRouteDay = d.lastRouteDay ?? 0;
    state.bestStreak = d.bestStreak ?? 0;
    state.routeHistory = { ...(d.routeHistory || {}) };
    state.eventsSeen = { ...(d.eventsSeen || {}) };
    state.chartersDone = d.chartersDone ?? 0;
    state.schoolRuns = d.schoolRuns ?? 0;
    state.toursDone = d.toursDone ?? 0;
    state.washes = d.washes ?? 0;
    state.lostFound = d.lostFound ?? 0;
    state.karaokeNights = d.karaokeNights ?? 0;
    state.activeRoute = null;
    state.shift = null;
    state.consecutiveOnTime = 0;
  }

  // --- Round 7 top-up: charters, school runs, tours, bus wash ---
  const BUS_CHARTERS = [
    { id: 'school-trip', name: 'School Field Trip', pay: 200, needCapacity: 20 },
    { id: 'wedding-bus', name: 'Wedding Shuttle', pay: 350, needCapacity: 25 },
    { id: 'team-bus', name: 'Sports Team Bus', pay: 300, needCapacity: 30 },
    { id: 'concert-bus', name: 'Concert Shuttle', pay: 500, needCapacity: 40 },
  ];
  function bookCharter(charterId) {
    const charter = BUS_CHARTERS.find((c) => c.id === charterId);
    if (!charter) return { ok: false, reason: 'no-such-charter' };
    if (capacity() < charter.needCapacity) return { ok: false, reason: 'capacity-too-low', need: charter.needCapacity };
    if (state.fuel < 30) return { ok: false, reason: 'low-fuel', need: 30 };
    state.fuel = Math.max(0, state.fuel - 30);
    const pay = Math.round(charter.pay * rankInfo().payMult);
    addCash(pay);
    state.totalEarned += pay;
    state.chartersDone = (state.chartersDone || 0) + 1;
    state.passengersCarried += charter.needCapacity;
    log(`Charter complete: ${charter.name}! Paid $${pay}.`);
    return { ok: true, charter: charterId, pay };
  }
  function schoolRun() {
    const hour = getHour();
    if (hour < 6 || hour > 9) return { ok: false, reason: 'wrong-hours', window: '06:00–09:00' };
    const kids = 10 + Math.floor(rng() * 15);
    const pay = kids * 3;
    addCash(pay);
    state.totalEarned += pay;
    state.schoolRuns = (state.schoolRuns || 0) + 1;
    state.passengersCarried += kids;
    log(`School run: ${kids} kids safely to Northside High. Pay $${pay}.`);
    return { ok: true, kids, pay };
  }
  function sightseeingTour() {
    if (state.rank < 1) return { ok: false, reason: 'rank-too-low', need: 'Driver' };
    const tourists = 8 + Math.floor(rng() * 12);
    const pay = tourists * 8;
    addCash(pay);
    state.totalEarned += pay;
    state.toursDone = (state.toursDone || 0) + 1;
    state.passengersCarried += tourists;
    state.rating = Math.min(5, state.rating + 0.05);
    log(`Sightseeing tour: ${tourists} tourists, $${pay}. Rating up!`);
    return { ok: true, tourists, pay };
  }
  function washBus() {
    const cost = 25;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.condition = Math.min(100, state.condition + 5);
    state.rating = Math.min(5, state.rating + 0.03);
    state.washes = (state.washes || 0) + 1;
    log(`Bus washed for $${cost}. It gleams. Condition +5.`);
    return { ok: true, cost };
  }
  function lostProperty() {
    if (rng() < 0.5) return { ok: false, reason: 'nothing-found' };
    const value = 10 + Math.floor(rng() * 50);
    addCash(value);
    state.totalEarned += value;
    state.lostFound = (state.lostFound || 0) + 1;
    log(`Found lost property on the bus — returned it, kept the $${value} reward.`);
    return { ok: true, value };
  }
  function busKaraokeNight() {
    if (state.rank < 2) return { ok: false, reason: 'rank-too-low', need: 'Senior Driver' };
    const riders = 15 + Math.floor(rng() * 20);
    const pay = riders * 5;
    addCash(pay);
    state.totalEarned += pay;
    state.karaokeNights = (state.karaokeNights || 0) + 1;
    log(`Karaoke bus night: ${riders} riders singing all the way. Pay $${pay}.`);
    return { ok: true, riders, pay };
  }

  return {
    state,
    tick,
    tickDay,
    interact,
    hudLine,
    stats,
    serialize,
    deserialize,
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
    comfort,
    speedMult,
    capacity,
    hasUpgrade,
    busInfo,
    rankInfo,
    bookCharter,
    schoolRun,
    sightseeingTour,
    washBus,
    lostProperty,
    busKaraokeNight,
  };
}
