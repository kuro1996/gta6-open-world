export const MARINA = { id: 'solara-marina', name: 'Solara Marina', x: 190, z: 140, district: 'Marina' };

export const BOATS = [
  { id: 'dinghy', name: 'Leaky Dinghy', price: 300, speed: 1.0, capacity: 2, luxury: 1, fuel: 20, desc: 'It floats, mostly.' },
  { id: 'speedboat', name: 'Speedboat', price: 2500, speed: 2.2, capacity: 4, luxury: 2, fuel: 40, desc: 'Fast, loud and thirsty.' },
  { id: 'fishing-boat', name: 'Fishing Boat', price: 4000, speed: 1.2, capacity: 6, luxury: 2, fuel: 35, desc: 'Built for long days at sea.' },
  { id: 'sailboat', name: 'Sailboat', price: 6000, speed: 1.5, capacity: 6, luxury: 3, fuel: 5, desc: 'Quiet, graceful, wind-powered.' },
  { id: 'yacht', name: 'Yacht', price: 25000, speed: 1.8, capacity: 12, luxury: 5, fuel: 60, desc: 'White hulls and champagne.' },
  { id: 'superyacht', name: 'Superyacht', price: 80000, speed: 2.0, capacity: 20, luxury: 8, fuel: 100, desc: 'A floating palace.' },
  { id: 'catamaran', name: 'Catamaran', price: 12000, speed: 1.6, capacity: 10, luxury: 4, fuel: 30, desc: 'Stable, roomy and smooth.' },
];

export const SEA_ROUTES = [
  { id: 'sunset', name: 'Sunset Cruise', duration: 120, pay: 300, needLuxury: 2, passengers: 8 },
  { id: 'fishing-charter', name: 'Fishing Charter', duration: 180, pay: 450, needLuxury: 1, passengers: 6 },
  { id: 'party', name: 'Party Cruise', duration: 150, pay: 600, needLuxury: 3, passengers: 12 },
  { id: 'island', name: 'Island Hop', duration: 240, pay: 800, needLuxury: 3, passengers: 10 },
  { id: 'whale', name: 'Whale Watching', duration: 200, pay: 500, needLuxury: 2, passengers: 10 },
  { id: 'vip', name: 'VIP Cruise', duration: 180, pay: 1500, needLuxury: 5, passengers: 4 },
  { id: 'dive', name: 'Dive Trip', duration: 220, pay: 550, needLuxury: 2, passengers: 8 },
  { id: 'wedding', name: 'Wedding Cruise', duration: 300, pay: 2500, needLuxury: 5, passengers: 16 },
];

export const SEA_RACES = [
  { id: 'harbor-sprint', name: 'Harbor Sprint', entry: 100, prize: 500, needSpeed: 1.5 },
  { id: 'regatta', name: 'Solara Regatta', entry: 300, prize: 2000, needSpeed: 1.5 },
  { id: 'ocean-classic', name: 'Ocean Classic', entry: 800, prize: 6000, needSpeed: 1.8 },
  { id: 'midnight-run', name: 'Midnight Run', entry: 500, prize: 3000, needSpeed: 2.0, nightOnly: true },
];

export const SEA_RESCUES = [
  { id: 'stranded', name: 'Stranded Sailors', pay: 200, difficulty: 1, time: 90 },
  { id: 'sinking', name: 'Sinking Boat', pay: 450, difficulty: 2, time: 120 },
  { id: 'swimmer', name: 'Tired Swimmer', pay: 150, difficulty: 1, time: 60 },
  { id: 'storm-rescue', name: 'Storm Rescue', pay: 800, difficulty: 3, time: 150 },
  { id: 'yacht-fire', name: 'Yacht Fire', pay: 1000, difficulty: 3, time: 180 },
];

export const SEA_WEATHER = [
  { id: 'calm', name: 'Calm Seas', speedMult: 1.1, risk: 0.05, desc: 'Glass-smooth water.' },
  { id: 'breeze', name: 'Breeze', speedMult: 1.0, risk: 0.1, desc: 'A gentle push from the wind.' },
  { id: 'rough', name: 'Rough Seas', speedMult: 0.8, risk: 0.3, desc: 'Choppy waves, hold on.' },
  { id: 'storm', name: 'Storm', speedMult: 0.6, risk: 0.6, desc: 'Lightning and heavy rain.' },
  { id: 'fog', name: 'Fog', speedMult: 0.7, risk: 0.4, desc: 'Thick fog, slow and careful.' },
];

export const BOAT_UPGRADES = [
  { id: 'engine', name: 'Turbo Engine', price: 1500, speed: 0.3, desc: 'More power under the deck.' },
  { id: 'gps', name: 'GPS Navigator', price: 600, desc: 'Never get lost again.' },
  { id: 'sonar', name: 'Sonar', price: 900, desc: 'See the fish below.' },
  { id: 'bar', name: 'Onboard Bar', price: 2000, desc: 'Drinks for the party crowd.' },
  { id: 'hull', name: 'Reinforced Hull', price: 1200, desc: 'Takes a beating and keeps going.' },
  { id: 'sails', name: 'Racing Sails', price: 1800, speed: 0.25, desc: 'Sailboats only.' },
  { id: 'cabin', name: 'Luxury Cabin', price: 3000, luxury: 2, desc: 'Sleep in style.' },
  { id: 'radio', name: 'Marine Radio', price: 400, desc: 'Hear every call on the water.' },
];

export const SEA_CREW = [
  { id: 'deckhand', name: 'Deckhand', wage: 50, effect: 'Plus 10 percent charter pay.' },
  { id: 'chef', name: 'Chef', wage: 120, effect: 'Plus 25 percent party and VIP pay.' },
  { id: 'dj', name: 'DJ', wage: 100, effect: 'Plus 20 percent party pay.' },
  { id: 'captain', name: 'Relief Captain', wage: 150, effect: 'Races plus 10 percent speed.' },
  { id: 'diver', name: 'Diver', wage: 110, effect: 'Dive trips plus 30 percent.' },
];

export const SEA_CARGO = [
  { id: 'fish', name: 'Fresh Fish', buy: 5, sell: 12, legal: true },
  { id: 'spices', name: 'Spices', buy: 20, sell: 45, legal: true },
  { id: 'rum', name: 'Rum', buy: 15, sell: 35, legal: true },
  { id: 'art', name: 'Art', buy: 40, sell: 90, legal: true },
  { id: 'pearls', name: 'Pearls', buy: 100, sell: 260, legal: true },
  { id: 'mystery', name: 'Sealed Crates', buy: 80, sell: 220, legal: false },
];

export const SEA_EVENTS = [
  { id: 'dolphins', name: 'Dolphins', text: 'Dolphins ride the bow wave.' },
  { id: 'pirate', name: 'Pirate', text: 'A suspicious boat pulls alongside.' },
  { id: 'wave', name: 'Rogue Wave', text: 'A huge wave slams the hull.' },
  { id: 'engine-fail', name: 'Engine Failure', text: 'The engine coughs and dies.' },
  { id: 'seagull', name: 'Seagulls', text: 'Seagulls crowd the deck.' },
  { id: 'sunset-perfect', name: 'Perfect Sunset', text: 'The sky turns gold and pink.' },
  { id: 'patrol', name: 'Harbor Patrol', text: 'A patrol boat signals you to stop.' },
  { id: 'whale-breach', name: 'Whale Breach', text: 'A whale breaches beside the boat.' },
];

const SEA_FISH = [
  { id: 'mackerel', name: 'Mackerel', value: 10, weight: 0.35 },
  { id: 'tuna', name: 'Tuna', value: 40, weight: 0.25 },
  { id: 'snapper', name: 'Snapper', value: 25, weight: 0.2 },
  { id: 'marlin', name: 'Marlin', value: 90, weight: 0.1 },
  { id: 'sardine', name: 'Sardine', value: 5, weight: 0.08 },
  { id: 'golden', name: 'Golden Catch', value: 150, weight: 0.02 },
];

function boatById(id) {
  for (const b of BOATS) if (b.id === id) return b;
  return null;
}

function routeById(id) {
  for (const r of SEA_ROUTES) if (r.id === id) return r;
  return null;
}

function weatherById(id) {
  for (const w of SEA_WEATHER) if (w.id === id) return w;
  return SEA_WEATHER[0];
}

export function createYachtSystem(deps) {
  const d = deps || {};
  const rnd = typeof d.rng === 'function' ? d.rng : Math.random;
  const cashOf = typeof d.getCash === 'function' ? d.getCash : () => 0;
  const moveCash = typeof d.addCash === 'function' ? d.addCash : () => {};
  const pushHeat = typeof d.addHeat === 'function' ? d.addHeat : () => {};
  const say = typeof d.log === 'function' ? d.log : () => {};
  const dayOf = typeof d.getDay === 'function' ? d.getDay : () => 1;
  const hourOf = typeof d.getHour === 'function' ? d.getHour : () => 12;
  const posOf = typeof d.getPlayerPos === 'function' ? d.getPlayerPos : () => ({ x: 0, z: 0 });

  const state = {
    boat: null,
    ownedBoats: [],
    upgrades: [],
    crew: [],
    fuel: 100,
    condition: 100,
    charter: null,
    race: null,
    rescue: null,
    cargo: {},
    totalEarned: 0,
    chartersDone: 0,
    racesWon: 0,
    racesRun: 0,
    rescuesDone: 0,
    rescuesFailed: 0,
    seaMiles: 0,
    seaWeather: 'calm',
    weatherTimer: 0,
    eventsSeen: {},
    smuggled: 0,
    patrolFines: 0,
    tipsEarned: 0,
    bestRace: null,
    regattaTitles: 0,
    vipClients: 0,
    fishCaught: 0,
    fuelBought: 0,
    repairs: 0,
    marinaFees: 0,
    rating: 4.0,
    ratingCount: 12,
    dayEarned: 0,
    bestDay: 0,
    lastSailDay: 0,
    photos: 0,
    photoLikes: 0,
    boatShows: 0,
    boatShowWins: 0,
    marinaParties: 0,
    shanties: 0,
    dives: 0,
  };

  function boatInfo() {
    return state.boat ? boatById(state.boat) : null;
  }

  function hasUpgrade(id) {
    return state.upgrades.includes(id);
  }

  function hasCrew(id) {
    return state.crew.includes(id);
  }

  function speed() {
    const boat = boatInfo();
    if (!boat) return 0;
    let s = boat.speed;
    for (const id of state.upgrades) {
      const up = BOAT_UPGRADES.find((u) => u.id === id);
      if (up && up.speed) s += up.speed;
    }
    if (hasCrew('captain')) s *= 1.1;
    s *= weatherById(state.seaWeather).speedMult;
    if (state.condition < 50) s *= 0.85;
    return s;
  }

  function luxury() {
    const boat = boatInfo();
    if (!boat) return 0;
    let l = boat.luxury;
    for (const id of state.upgrades) {
      const up = BOAT_UPGRADES.find((u) => u.id === id);
      if (up && up.luxury) l += up.luxury;
    }
    return l;
  }

  function fuelBurn() {
    const boat = boatInfo();
    if (!boat) return 0;
    return boat.fuel / 100;
  }

  function buyBoat(boatId) {
    const boat = boatById(boatId);
    if (!boat) return { ok: false, reason: 'unknown-boat' };
    if (cashOf() < boat.price && !state.ownedBoats.includes(boatId)) return { ok: false, reason: 'not-enough-cash' };
    if (state.ownedBoats.includes(boatId)) {
      state.boat = boatId;
      return { ok: true, boatId, switched: true };
    }
    moveCash(-boat.price);
    state.ownedBoats.push(boatId);
    state.boat = boatId;
    state.fuel = 100;
    state.condition = 100;
    say('Bought the ' + boat.name + '.');
    return { ok: true, boatId, price: boat.price };
  }

  function buyFuel(amount) {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    if (state.fuel >= 100) return { ok: false, reason: 'tank-full' };
    const want = amount === undefined || amount === null ? 50 : amount;
    const litres = Math.min(want, 100 - state.fuel);
    const cost = Math.ceil(litres * 1.2);
    if (cashOf() < cost) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-cost);
    state.fuel += litres;
    state.fuelBought += litres;
    return { ok: true, fuel: Math.round(state.fuel), cost };
  }

  function repairBoat() {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    if (state.condition >= 100) return { ok: false, reason: 'boat-fine' };
    const cost = Math.ceil((100 - state.condition) * 4);
    if (cashOf() < cost) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-cost);
    state.condition = 100;
    state.repairs += 1;
    return { ok: true, cost };
  }

  function buyUpgrade(upgradeId) {
    const up = BOAT_UPGRADES.find((u) => u.id === upgradeId);
    if (!up) return { ok: false, reason: 'unknown-upgrade' };
    if (hasUpgrade(upgradeId)) return { ok: false, reason: 'already-owned' };
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    if (upgradeId === 'sails' && state.boat !== 'sailboat') return { ok: false, reason: 'sailboats-only' };
    if (cashOf() < up.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-up.price);
    state.upgrades.push(upgradeId);
    return { ok: true, upgradeId, price: up.price };
  }

  function hireCrew(crewId) {
    const member = SEA_CREW.find((c) => c.id === crewId);
    if (!member) return { ok: false, reason: 'unknown-crew' };
    if (hasCrew(crewId)) return { ok: false, reason: 'already-hired' };
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    state.crew.push(crewId);
    return { ok: true, crewId, wage: member.wage };
  }

  function fireCrew(crewId) {
    if (!hasCrew(crewId)) return { ok: false, reason: 'not-hired' };
    state.crew = state.crew.filter((c) => c !== crewId);
    return { ok: true, crewId };
  }

  function startCharter(routeId) {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    if (state.charter) return { ok: false, reason: 'charter-active' };
    const route = routeById(routeId);
    if (!route) return { ok: false, reason: 'unknown-route' };
    const boat = boatInfo();
    if (luxury() < route.needLuxury) return { ok: false, reason: 'luxury-too-low' };
    if (boat.capacity < route.passengers) return { ok: false, reason: 'capacity-too-low' };
    const need = route.duration * fuelBurn() * 0.1;
    if (state.fuel < need) return { ok: false, reason: 'low-fuel' };
    if (weatherById(state.seaWeather).risk >= 0.6) return { ok: false, reason: 'storm-weather' };
    state.charter = { routeId: route.id, routeName: route.name, timeLeft: route.duration, passengers: route.passengers, pay: route.pay, startedDay: dayOf() };
    return { ok: true, charter: { ...state.charter } };
  }

  function finishCharter() {
    if (!state.charter) return { ok: false, reason: 'no-charter' };
    const charter = state.charter;
    state.charter = null;
    const route = routeById(charter.routeId);
    let mult = 1;
    if (hasCrew('deckhand')) mult *= 1.1;
    if (hasCrew('chef') && (charter.routeId === 'party' || charter.routeId === 'vip' || charter.routeId === 'wedding')) mult *= 1.25;
    if (hasCrew('dj') && charter.routeId === 'party') mult *= 1.2;
    if (hasUpgrade('bar') && charter.routeId === 'party') mult *= 1.4;
    if (hasUpgrade('sonar') && charter.routeId === 'fishing-charter') mult *= 1.3;
    if (hasCrew('diver') && charter.routeId === 'dive') mult *= 1.3;
    const base = Math.round(charter.pay * mult);
    const tip = Math.floor(rnd() * 60) + luxury() * 10;
    const total = base + tip;
    moveCash(total);
    state.totalEarned += total;
    state.dayEarned += total;
    state.tipsEarned += tip;
    state.chartersDone += 1;
    state.seaMiles += 12;
    state.fuel = Math.max(0, state.fuel - route.duration * fuelBurn() * 0.1);
    state.condition = Math.max(0, state.condition - 2);
    if (charter.routeId === 'vip' || charter.routeId === 'wedding') state.vipClients += 1;
    if (charter.routeId === 'fishing-charter') state.fishCaught += 5 + Math.floor(rnd() * 10);
    state.rating = Math.min(5, state.rating + 0.03);
    state.lastSailDay = dayOf();
    say('Charter done: ' + route.name + ' — $' + total + '.');
    return { ok: true, totalPay: total, basePay: base, tip, routeId: charter.routeId };
  }

  function cancelCharter() {
    if (!state.charter) return { ok: false, reason: 'no-charter' };
    const routeId = state.charter.routeId;
    state.charter = null;
    state.rating = Math.max(1, state.rating - 0.1);
    return { ok: true, routeId };
  }

  function enterRace(raceId) {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    const race = SEA_RACES.find((r) => r.id === raceId);
    if (!race) return { ok: false, reason: 'unknown-race' };
    if (speed() < race.needSpeed) return { ok: false, reason: 'speed-too-low' };
    const hour = hourOf();
    const night = hour >= 22 || hour < 5;
    if (race.nightOnly && !night) return { ok: false, reason: 'not-night' };
    if (cashOf() < race.entry) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-race.entry);
    state.racesRun += 1;
    const rivals = 3 + Math.floor(rnd() * 3);
    const rivalSpeeds = [];
    for (let i = 0; i < rivals; i++) rivalSpeeds.push(1.4 + rnd() * 1.2);
    const beaten = rivalSpeeds.filter((s) => s > speed()).length;
    const place = beaten + 1;
    const won = place === 1;
    let prize = 0;
    if (won) {
      prize = race.prize;
      moveCash(prize);
      state.totalEarned += prize;
      state.dayEarned += prize;
      state.racesWon += 1;
      if (raceId === 'regatta') state.regattaTitles += 1;
    }
    state.seaMiles += 8;
    state.fuel = Math.max(0, state.fuel - 10);
    const result = { place, won, prize, rivals };
    if (!state.bestRace || prize > state.bestRace.prize) state.bestRace = { raceId, prize, place };
    return { ok: true, ...result };
  }

  function answerRescue(rescueId) {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    if (state.rescue) return { ok: false, reason: 'rescue-active' };
    const rescue = SEA_RESCUES.find((r) => r.id === rescueId);
    if (!rescue) return { ok: false, reason: 'unknown-rescue' };
    if (rescue.difficulty === 3 && weatherById(state.seaWeather).risk >= 0.4) return { ok: false, reason: 'weather-too-bad' };
    state.rescue = { id: rescue.id, name: rescue.name, timeLeft: rescue.time, pay: rescue.pay, difficulty: rescue.difficulty };
    return { ok: true, rescue: { ...state.rescue } };
  }

  function completeRescue() {
    if (!state.rescue) return { ok: false, reason: 'no-rescue' };
    const rescue = state.rescue;
    state.rescue = null;
    const chance = 0.7 + (hasUpgrade('gps') ? 0.15 : 0) - rescue.difficulty * 0.05;
    if (rnd() < chance) {
      const pay = Math.round(rescue.pay * (hasUpgrade('gps') ? 1.15 : 1));
      moveCash(pay);
      state.totalEarned += pay;
      state.dayEarned += pay;
      state.rescuesDone += 1;
      state.rating = Math.min(5, state.rating + 0.1);
      return { ok: true, success: true, pay };
    }
    state.rescuesFailed += 1;
    state.rating = Math.max(1, state.rating - 0.05);
    return { ok: true, success: false, pay: 0 };
  }

  function buyCargo(cargoId, qty) {
    const cargo = SEA_CARGO.find((c) => c.id === cargoId);
    if (!cargo) return { ok: false, reason: 'unknown-cargo' };
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    const n = qty === undefined || qty === null ? 1 : qty;
    const cost = cargo.buy * n;
    if (cashOf() < cost) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-cost);
    state.cargo[cargoId] = (state.cargo[cargoId] || 0) + n;
    if (!cargo.legal) state.smuggled += n;
    return { ok: true, cargoId, quantity: n, cost };
  }

  function sellCargo(cargoId, qty) {
    const cargo = SEA_CARGO.find((c) => c.id === cargoId);
    if (!cargo) return { ok: false, reason: 'unknown-cargo' };
    const n = qty === undefined || qty === null ? 1 : qty;
    const held = state.cargo[cargoId] || 0;
    if (held < n) return { ok: false, reason: 'not-enough-cargo' };
    state.cargo[cargoId] = held - n;
    if (state.cargo[cargoId] <= 0) delete state.cargo[cargoId];
    const value = cargo.sell * n;
    let fine = 0;
    let heat = 0;
    if (!cargo.legal && rnd() < 0.3) {
      fine = 100;
      heat = 20;
      state.patrolFines += 1;
      pushHeat(heat);
    }
    const net = value - fine;
    moveCash(net);
    state.totalEarned += net;
    state.dayEarned += net;
    return { ok: true, net, value, fine, heat };
  }

  function payMarinaFee() {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    const fee = 20 + luxury() * 10;
    if (cashOf() < fee) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-fee);
    state.marinaFees += 1;
    state.condition = Math.min(100, state.condition + 5);
    return { ok: true, fee };
  }

  function applySeaEvent(eventId) {
    state.eventsSeen[eventId] = (state.eventsSeen[eventId] || 0) + 1;
    if (eventId === 'dolphins') {
      state.rating = Math.min(5, state.rating + 0.05);
      moveCash(30);
      state.totalEarned += 30;
    } else if (eventId === 'pirate') {
      if (rnd() < 0.3) {
        const loss = Math.min(cashOf(), 100 + Math.floor(rnd() * 200));
        moveCash(-loss);
        say('Pirates took $' + loss + '.');
      }
    } else if (eventId === 'wave') {
      let dmg = 8;
      if (hasUpgrade('hull')) dmg -= 4;
      state.condition = Math.max(0, state.condition - dmg);
    } else if (eventId === 'engine-fail') {
      if (state.charter) state.charter.timeLeft += 60;
      state.condition = Math.max(0, state.condition - 5);
    } else if (eventId === 'seagull') {
      state.rating = Math.max(1, state.rating - 0.03);
    } else if (eventId === 'sunset-perfect') {
      state.rating = Math.min(5, state.rating + 0.08);
      moveCash(50);
      state.totalEarned += 50;
    } else if (eventId === 'patrol') {
      const illegal = Object.keys(state.cargo).some((id) => {
        const c = SEA_CARGO.find((x) => x.id === id);
        return c && !c.legal;
      });
      if (illegal) {
        moveCash(-200);
        pushHeat(25);
        state.patrolFines += 1;
      }
    } else if (eventId === 'whale-breach') {
      state.rating = Math.min(5, state.rating + 0.1);
      moveCash(80);
      state.totalEarned += 80;
    }
    return eventId;
  }

  function tick(dt) {
    const step = dt || 0;
    state.weatherTimer -= step;
    if (state.weatherTimer <= 0) {
      state.weatherTimer = 90 + rnd() * 120;
      const roll = rnd();
      state.seaWeather = roll < 0.4 ? 'calm' : roll < 0.7 ? 'breeze' : roll < 0.85 ? 'rough' : roll < 0.93 ? 'fog' : 'storm';
    }
    if (state.charter) {
      state.charter.timeLeft -= step;
      state.seaMiles += step * 0.05;
      if (weatherById(state.seaWeather).risk >= 0.3) state.condition = Math.max(0, state.condition - 0.02 * step);
      if (rnd() < step * 0.004) {
        const ev = SEA_EVENTS[Math.floor(rnd() * SEA_EVENTS.length)];
        applySeaEvent(ev.id);
      }
      if (state.charter.timeLeft <= 0) finishCharter();
    }
    if (state.rescue) {
      state.rescue.timeLeft -= step;
      if (state.rescue.timeLeft <= 0) completeRescue();
    }
  }

  function tickDay(day) {
    const today = day !== undefined && day !== null ? day : dayOf();
    let wages = 0;
    for (const id of state.crew) {
      const member = SEA_CREW.find((c) => c.id === id);
      if (member) wages += member.wage;
    }
    const paidWages = Math.min(cashOf(), wages);
    if (paidWages > 0) moveCash(-paidWages);
    let fee = 0;
    if (state.boat) {
      fee = 10 + luxury() * 5;
      const paidFee = Math.min(cashOf(), fee);
      if (paidFee > 0) moveCash(-paidFee);
    }
    if (state.dayEarned > state.bestDay) state.bestDay = state.dayEarned;
    state.dayEarned = 0;
    if (state.boat && rnd() < 0.5) say('A rescue call crackles over the radio.');
    return { day: today, wages, rating: Math.round(state.rating * 10) / 10 };
  }

  function interact() {
    const pos = posOf();
    if (Math.hypot(pos.x - MARINA.x, pos.z - MARINA.z) > 20) return false;
    if (!state.boat) {
      const res = buyBoat('dinghy');
      return res.ok || res.reason === 'not-enough-cash';
    }
    if (state.charter || state.rescue) return true;
    const boat = boatInfo();
    const sunset = startCharter('sunset');
    if (sunset.ok) return true;
    if (luxury() >= 1 && boat.capacity >= 6) {
      const fishing = startCharter('fishing-charter');
      return fishing.ok;
    }
    return true;
  }

  function hudLine() {
    if (state.charter) {
      return 'SEA ' + state.charter.routeName + ' · ' + Math.ceil(state.charter.timeLeft) + 's · ' + state.seaWeather + ' · fuel ' + Math.round(state.fuel) + '%';
    }
    if (state.rescue) {
      return 'RESCUE ' + state.rescue.name + ' · ' + Math.ceil(state.rescue.timeLeft) + 's';
    }
    const pos = posOf();
    if (Math.hypot(pos.x - MARINA.x, pos.z - MARINA.z) <= 20) {
      const boat = boatInfo();
      return 'MARINA · ' + (boat ? boat.name : 'no boat') + ' · ' + state.seaWeather + ' · ' + Math.round(state.rating * 10) / 10 + '★';
    }
    if (state.boat && state.fuel < 20) return 'Low fuel — buy more at the marina.';
    return '';
  }

  function stats() {
    return {
      boatId: state.boat,
      ownedBoats: [...state.ownedBoats],
      upgrades: [...state.upgrades],
      crew: [...state.crew],
      fuel: Math.round(state.fuel),
      condition: Math.round(state.condition),
      speed: Math.round(speed() * 100) / 100,
      luxury: luxury(),
      charterRouteId: state.charter ? state.charter.routeId : null,
      rescueId: state.rescue ? state.rescue.id : null,
      cargo: { ...state.cargo },
      totalEarned: state.totalEarned,
      chartersDone: state.chartersDone,
      racesWon: state.racesWon,
      racesRun: state.racesRun,
      rescuesDone: state.rescuesDone,
      rescuesFailed: state.rescuesFailed,
      seaMiles: Math.round(state.seaMiles),
      seaWeather: state.seaWeather,
      smuggled: state.smuggled,
      patrolFines: state.patrolFines,
      tipsEarned: state.tipsEarned,
      bestRace: state.bestRace ? { ...state.bestRace } : null,
      regattaTitles: state.regattaTitles,
      vipClients: state.vipClients,
      fishCaught: state.fishCaught,
      fuelBought: state.fuelBought,
      repairs: state.repairs,
      marinaFees: state.marinaFees,
      rating: Math.round(state.rating * 10) / 10,
      bestDay: state.bestDay,
      dayEarned: state.dayEarned,
      eventsSeen: Object.keys(state.eventsSeen).length,
      photos: state.photos,
      photoLikes: state.photoLikes,
      boatShows: state.boatShows,
      boatShowWins: state.boatShowWins,
      marinaParties: state.marinaParties,
      shanties: state.shanties,
      dives: state.dives,
    };
  }

  function serialize() {
    return {
      boat: state.boat,
      ownedBoats: [...state.ownedBoats],
      upgrades: [...state.upgrades],
      crew: [...state.crew],
      fuel: state.fuel,
      condition: state.condition,
      cargo: { ...state.cargo },
      totalEarned: state.totalEarned,
      chartersDone: state.chartersDone,
      racesWon: state.racesWon,
      racesRun: state.racesRun,
      rescuesDone: state.rescuesDone,
      rescuesFailed: state.rescuesFailed,
      seaMiles: state.seaMiles,
      smuggled: state.smuggled,
      patrolFines: state.patrolFines,
      tipsEarned: state.tipsEarned,
      bestRace: state.bestRace ? { ...state.bestRace } : null,
      regattaTitles: state.regattaTitles,
      vipClients: state.vipClients,
      fishCaught: state.fishCaught,
      fuelBought: state.fuelBought,
      repairs: state.repairs,
      marinaFees: state.marinaFees,
      rating: state.rating,
      ratingCount: state.ratingCount,
      bestDay: state.bestDay,
      lastSailDay: state.lastSailDay,
      eventsSeen: { ...state.eventsSeen },
      photos: state.photos,
      photoLikes: state.photoLikes,
      boatShows: state.boatShows,
      boatShowWins: state.boatShowWins,
      marinaParties: state.marinaParties,
      shanties: state.shanties,
      dives: state.dives,
    };
  }

  function deserialize(saved) {
    const s = saved || {};
    state.boat = typeof s.boat === 'string' ? s.boat : null;
    state.ownedBoats = Array.isArray(s.ownedBoats) ? [...s.ownedBoats] : [];
    state.upgrades = Array.isArray(s.upgrades) ? [...s.upgrades] : [];
    state.crew = Array.isArray(s.crew) ? [...s.crew] : [];
    state.fuel = Number(s.fuel) || 100;
    state.condition = Number(s.condition) || 100;
    state.cargo = s.cargo && typeof s.cargo === 'object' ? { ...s.cargo } : {};
    state.totalEarned = Number(s.totalEarned) || 0;
    state.chartersDone = Math.floor(Number(s.chartersDone) || 0);
    state.racesWon = Math.floor(Number(s.racesWon) || 0);
    state.racesRun = Math.floor(Number(s.racesRun) || 0);
    state.rescuesDone = Math.floor(Number(s.rescuesDone) || 0);
    state.rescuesFailed = Math.floor(Number(s.rescuesFailed) || 0);
    state.seaMiles = Number(s.seaMiles) || 0;
    state.smuggled = Math.floor(Number(s.smuggled) || 0);
    state.patrolFines = Math.floor(Number(s.patrolFines) || 0);
    state.tipsEarned = Number(s.tipsEarned) || 0;
    state.bestRace = s.bestRace ? { ...s.bestRace } : null;
    state.regattaTitles = Math.floor(Number(s.regattaTitles) || 0);
    state.vipClients = Math.floor(Number(s.vipClients) || 0);
    state.fishCaught = Math.floor(Number(s.fishCaught) || 0);
    state.fuelBought = Number(s.fuelBought) || 0;
    state.repairs = Math.floor(Number(s.repairs) || 0);
    state.marinaFees = Math.floor(Number(s.marinaFees) || 0);
    state.rating = Number(s.rating) || 4.0;
    state.ratingCount = Math.floor(Number(s.ratingCount) || 0);
    state.bestDay = Number(s.bestDay) || 0;
    state.lastSailDay = Math.floor(Number(s.lastSailDay) || 0);
    state.eventsSeen = s.eventsSeen && typeof s.eventsSeen === 'object' ? { ...s.eventsSeen } : {};
    state.photos = Math.floor(Number(s.photos) || 0);
    state.photoLikes = Math.floor(Number(s.photoLikes) || 0);
    state.boatShows = Math.floor(Number(s.boatShows) || 0);
    state.boatShowWins = Math.floor(Number(s.boatShowWins) || 0);
    state.marinaParties = Math.floor(Number(s.marinaParties) || 0);
    state.shanties = Math.floor(Number(s.shanties) || 0);
    state.dives = Math.floor(Number(s.dives) || 0);
    state.charter = null;
    state.rescue = null;
    state.seaWeather = 'calm';
    state.dayEarned = 0;
    return { ok: true };
  }

  function fishAtSea() {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    if (state.fuel < 5) return { ok: false, reason: 'low-fuel' };
    state.fuel -= 5;
    const total = SEA_FISH.reduce((a, f) => a + f.weight, 0);
    let roll = rnd() * total;
    let caught = SEA_FISH[SEA_FISH.length - 1];
    for (const f of SEA_FISH) {
      roll -= f.weight;
      if (roll <= 0) { caught = f; break; }
    }
    state.fishCaught += 1;
    if (caught.value > 0) {
      moveCash(caught.value);
      state.totalEarned += caught.value;
      state.dayEarned += caught.value;
    }
    return { ok: true, fishId: caught.id, value: caught.value };
  }

  function sunsetPhoto() {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    const hour = hourOf();
    if (hour < 17 || hour > 19) return { ok: false, reason: 'wrong-hour' };
    const likes = 50 + Math.floor(rnd() * 200) + luxury() * 30;
    state.photos += 1;
    state.photoLikes += likes;
    state.rating = Math.min(5, state.rating + 0.02);
    return { ok: true, likes };
  }

  function enterBoatShow() {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    if (cashOf() < 100) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-100);
    state.boatShows += 1;
    const score = Math.round(luxury() * 20 + state.condition * 0.5 + rnd() * 30);
    const field = [60, 90, 120, 150].map((base) => base + Math.floor(rnd() * 20));
    const beaten = field.filter((s) => s > score).length;
    const place = beaten + 1;
    const won = place === 1;
    let prize = 0;
    if (won) {
      prize = 1500;
      moveCash(prize);
      state.totalEarned += prize;
      state.boatShowWins += 1;
    }
    return { ok: true, won, place, prize, score };
  }

  function marinaParty() {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    if (cashOf() < 200) return { ok: false, reason: 'not-enough-cash' };
    if (luxury() < 3) return { ok: false, reason: 'luxury-too-low' };
    moveCash(-200);
    const guests = 10 + Math.floor(rnd() * 20);
    const earned = guests * 15;
    moveCash(earned);
    state.totalEarned += earned;
    state.dayEarned += earned;
    state.marinaParties += 1;
    state.rating = Math.min(5, state.rating + 0.1);
    return { ok: true, guests, earned, cost: 200 };
  }

  function singSeaShanty() {
    if (!state.charter) return { ok: false, reason: 'no-charter' };
    const tip = 20 + Math.floor(rnd() * 40);
    moveCash(tip);
    state.totalEarned += tip;
    state.dayEarned += tip;
    state.tipsEarned += tip;
    state.shanties += 1;
    return { ok: true, tip };
  }

  function deepSeaDive() {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    if (!hasCrew('diver')) return { ok: false, reason: 'no-diver' };
    if (state.fuel < 10) return { ok: false, reason: 'low-fuel' };
    state.fuel -= 10;
    state.dives += 1;
    if (rnd() < 0.4) {
      const value = 100 + Math.floor(rnd() * 300);
      moveCash(value);
      state.totalEarned += value;
      state.dayEarned += value;
      return { ok: true, found: true, value };
    }
    return { ok: true, found: false, value: 0 };
  }

  return {
    name: 'Yacht',
    state,
    buyBoat,
    buyFuel,
    repairBoat,
    buyUpgrade,
    hireCrew,
    fireCrew,
    startCharter,
    finishCharter,
    cancelCharter,
    enterRace,
    answerRescue,
    completeRescue,
    buyCargo,
    sellCargo,
    payMarinaFee,
    tick,
    tickDay,
    interact,
    hudLine,
    stats,
    serialize,
    deserialize,
    fishAtSea,
    sunsetPhoto,
    enterBoatShow,
    marinaParty,
    singSeaShanty,
    deepSeaDive,
  };
}
