// Solara Marina — yachts and boats: buy, charter, race and rescue at
// sea. Round 7, all-new system. The marina sells everything from a
// leaky dinghy to a superyacht: charter it out for sunset cruises, run
// fishing charters, race the regatta, rescue stranded sailors, and dodge
// the harbor patrol when the cargo gets interesting. The sea pays —
// when it doesn't take.
export const MARINA = { id: 'solara-marina', name: 'Solara Marina', x: 190, z: 140, district: 'Marina' };

export const BOATS = [
  { id: 'dinghy', name: 'Leaky Dinghy', price: 300, speed: 1.0, capacity: 2, luxury: 1, fuel: 20, desc: 'It floats. Mostly.' },
  { id: 'speedboat', name: 'Speedboat', price: 2500, speed: 2.2, capacity: 4, luxury: 2, fuel: 40, desc: 'Fast, loud, thirsty.' },
  { id: 'fishing-boat', name: 'Fishing Boat', price: 4000, speed: 1.2, capacity: 6, luxury: 2, fuel: 35, desc: 'Built for the deep catch.' },
  { id: 'sailboat', name: 'Sailboat', price: 6000, speed: 1.5, capacity: 6, luxury: 3, fuel: 5, desc: 'Wind is free. Style is not.' },
  { id: 'yacht', name: 'Sunseeker Yacht', price: 25000, speed: 1.8, capacity: 12, luxury: 5, fuel: 60, desc: 'The dream. Champagne not included.' },
  { id: 'superyacht', name: 'Superyacht Crown', price: 80000, speed: 2.0, capacity: 20, luxury: 8, fuel: 100, desc: 'A floating palace with a helipad.' },
  { id: 'catamaran', name: 'Catamaran', price: 12000, speed: 1.6, capacity: 10, luxury: 4, fuel: 30, desc: 'Stable, wide, party-ready.' },
];

export const SEA_ROUTES = [
  { id: 'sunset', name: 'Sunset Cruise', duration: 120, pay: 300, needLuxury: 2, passengers: 8 },
  { id: 'fishing-charter', name: 'Fishing Charter', duration: 180, pay: 450, needLuxury: 1, passengers: 6 },
  { id: 'party', name: 'Party Cruise', duration: 150, pay: 600, needLuxury: 3, passengers: 12 },
  { id: 'island', name: 'Island Hop', duration: 240, pay: 800, needLuxury: 3, passengers: 10 },
  { id: 'whale', name: 'Whale Watching', duration: 200, pay: 500, needLuxury: 2, passengers: 10 },
  { id: 'vip', name: 'VIP Charter', duration: 180, pay: 1500, needLuxury: 5, passengers: 4 },
  { id: 'dive', name: 'Dive Trip', duration: 220, pay: 550, needLuxury: 2, passengers: 8 },
  { id: 'wedding', name: 'Wedding at Sea', duration: 300, pay: 2500, needLuxury: 5, passengers: 16 },
];

export const SEA_RACES = [
  { id: 'harbor-sprint', name: 'Harbor Sprint', entry: 100, prize: 500, needSpeed: 1.5 },
  { id: 'regatta', name: 'Solara Regatta', entry: 300, prize: 2000, needSpeed: 1.5 },
  { id: 'ocean-classic', name: 'Ocean Classic', entry: 800, prize: 6000, needSpeed: 1.8 },
  { id: 'midnight-run', name: 'Midnight Run', entry: 500, prize: 3000, needSpeed: 2.0, nightOnly: true },
];

export const SEA_RESCUES = [
  { id: 'stranded', name: 'Stranded Sailor', pay: 200, difficulty: 1, time: 90 },
  { id: 'sinking', name: 'Sinking Boat', pay: 450, difficulty: 2, time: 120 },
  { id: 'swimmer', name: 'Swimmer in Trouble', pay: 150, difficulty: 1, time: 60 },
  { id: 'storm-rescue', name: 'Storm Rescue', pay: 800, difficulty: 3, time: 150 },
  { id: 'yacht-fire', name: 'Yacht Fire', pay: 1000, difficulty: 3, time: 180 },
];

export const SEA_WEATHER = [
  { id: 'calm', name: 'Calm Seas', speedMult: 1.1, risk: 0.05, desc: 'Glass-smooth water.' },
  { id: 'breeze', name: 'Light Breeze', speedMult: 1.0, risk: 0.1, desc: 'A pleasant chop.' },
  { id: 'rough', name: 'Rough Seas', speedMult: 0.8, risk: 0.3, desc: 'White caps everywhere.' },
  { id: 'storm', name: 'Storm', speedMult: 0.6, risk: 0.6, desc: 'Do not go out. Seriously.' },
  { id: 'fog', name: 'Sea Fog', speedMult: 0.7, risk: 0.4, desc: 'You can barely see the bow.' },
];

export const BOAT_UPGRADES = [
  { id: 'engine', name: 'Turbo Engine', price: 1500, speed: 0.3, desc: '+0.3 speed' },
  { id: 'gps', name: 'Marine GPS', price: 600, desc: 'never lost, +rescue pay' },
  { id: 'sonar', name: 'Fish Sonar', price: 900, desc: 'fishing charters pay +30%' },
  { id: 'bar', name: 'Onboard Bar', price: 2000, desc: 'party cruises pay +40%' },
  { id: 'hull', name: 'Reinforced Hull', price: 1200, desc: 'storm damage -50%' },
  { id: 'sails', name: 'Racing Sails', price: 1800, speed: 0.25, desc: '+0.25 speed, sailboats only' },
  { id: 'cabin', name: 'Luxury Cabin', price: 3000, luxury: 2, desc: '+2 luxury' },
  { id: 'radio', name: 'Marine Radio', price: 400, desc: 'rescue calls come faster' },
];

export const SEA_CREW = [
  { id: 'deckhand', name: 'Deckhand', wage: 50, effect: '+10% charter pay' },
  { id: 'chef', name: 'Onboard Chef', wage: 120, effect: '+25% party/vip pay' },
  { id: 'dj', name: 'Boat DJ', wage: 100, effect: '+20% party pay' },
  { id: 'captain', name: 'Relief Captain', wage: 150, effect: 'races +10% speed' },
  { id: 'diver', name: 'Dive Master', wage: 110, effect: 'dive trips pay +30%' },
];

export const SEA_CARGO = [
  { id: 'fish', name: 'Fresh Catch', buy: 5, sell: 12, legal: true },
  { id: 'spices', name: 'Island Spices', buy: 20, sell: 45, legal: true },
  { id: 'rum', name: 'Island Rum', buy: 15, sell: 35, legal: true },
  { id: 'art', name: 'Island Art', buy: 40, sell: 90, legal: true },
  { id: 'pearls', name: 'Black Pearls', buy: 100, sell: 260, legal: true },
  { id: 'mystery', name: 'Sealed Crates', buy: 80, sell: 220, legal: false },
];

export const SEA_EVENTS = [
  { id: 'dolphins', name: 'Dolphins', text: 'Dolphins ride your bow wave! Passengers cheer.' },
  { id: 'pirate', name: 'Pirate Scare', text: 'A suspicious boat shadows you...' },
  { id: 'wave', name: 'Rogue Wave', text: 'A rogue wave slams the hull!' },
  { id: 'engine-fail', name: 'Engine Failure', text: 'The engine dies mid-sea.' },
  { id: 'seagull', name: 'Seagull Attack', text: 'Seagulls steal the lunch buffet.' },
  { id: 'sunset-perfect', name: 'Perfect Sunset', text: 'The sunset is unreal. Everyone takes photos.' },
  { id: 'patrol', name: 'Harbor Patrol', text: 'Harbor patrol pulls alongside for an inspection.' },
  { id: 'whale-breach', name: 'Whale Breach', text: 'A whale breaches right beside the boat!' },
];

export function createYachtSystem(deps = {}) {
  const rng = deps.rng || Math.random;
  const getCash = deps.getCash || (() => 0);
  const addCash = deps.addCash || (() => {});
  const addHeat = deps.addHeat || (() => {});
  const log = deps.log || (() => {});
  const getDay = deps.getDay || (() => 1);
  const getHour = deps.getHour || (() => 12);
  const getPlayerPos = deps.getPlayerPos || (() => ({ x: 0, z: 0 }));

  const state = {
    boat: null,
    ownedBoats: [],
    upgrades: [],
    crew: [],
    fuel: 100,
    condition: 100,
    charter: null, // { routeId, timeLeft, passengers, pay }
    race: null,
    rescue: null, // { rescueId, timeLeft }
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
  };

  function boatInfo() { return BOATS.find((b) => b.id === state.boat) || null; }
  function hasUpgrade(id) { return state.upgrades.includes(id); }
  function hasCrew(id) { return state.crew.includes(id); }
  function speed() {
    const boat = boatInfo();
    if (!boat) return 0;
    let s = boat.speed;
    for (const u of state.upgrades) {
      const def = BOAT_UPGRADES.find((x) => x.id === u);
      if (def && def.speed) s += def.speed;
    }
    if (hasCrew('captain')) s *= 1.1;
    const weather = SEA_WEATHER.find((w) => w.id === state.seaWeather);
    if (weather) s *= weather.speedMult;
    if (state.condition < 50) s *= 0.85;
    return s;
  }
  function luxury() {
    const boat = boatInfo();
    if (!boat) return 0;
    let l = boat.luxury;
    for (const u of state.upgrades) {
      const def = BOAT_UPGRADES.find((x) => x.id === u);
      if (def && def.luxury) l += def.luxury;
    }
    return l;
  }
  function fuelBurn() {
    const boat = boatInfo();
    return boat ? boat.fuel / 100 : 0;
  }

  function buyBoat(boatId) {
    const boat = BOATS.find((b) => b.id === boatId);
    if (!boat) return { ok: false, reason: 'no-such-boat' };
    if (state.ownedBoats.includes(boatId)) {
      state.boat = boatId;
      log(`Switched to your ${boat.name}.`);
      return { ok: true, boat: boatId, switched: true };
    }
    if (getCash() < boat.price) return { ok: false, reason: 'no-cash', need: boat.price };
    addCash(-boat.price);
    state.ownedBoats.push(boatId);
    state.boat = boatId;
    state.fuel = 100;
    state.condition = 100;
    log(`Bought the ${boat.name} for $${boat.price}! ${boat.desc}`);
    return { ok: true, boat: boatId, price: boat.price };
  }

  function buyFuel(amount = 50) {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    const missing = 100 - state.fuel;
    const buy = Math.min(amount, missing);
    if (buy <= 0) return { ok: false, reason: 'tank-full' };
    const cost = Math.ceil(buy * 1.2);
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.fuel += buy;
    state.fuelBought += buy;
    log(`Bought ${buy}L of marine fuel for $${cost}.`);
    return { ok: true, fuel: Math.round(state.fuel), cost };
  }

  function repairBoat() {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    const missing = 100 - state.condition;
    if (missing <= 0) return { ok: false, reason: 'boat-fine' };
    const cost = Math.ceil(missing * 4);
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.condition = 100;
    state.repairs += 1;
    log(`Boat repaired at the marina for $${cost}.`);
    return { ok: true, cost };
  }

  function buyUpgrade(upId) {
    const up = BOAT_UPGRADES.find((u) => u.id === upId);
    if (!up) return { ok: false, reason: 'no-such-upgrade' };
    if (hasUpgrade(upId)) return { ok: false, reason: 'already-owned' };
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    if (upId === 'sails' && state.boat !== 'sailboat') return { ok: false, reason: 'sailboat-only' };
    if (getCash() < up.price) return { ok: false, reason: 'no-cash', need: up.price };
    addCash(-up.price);
    state.upgrades.push(upId);
    log(`Boat upgrade: ${up.name} for $${up.price}. ${up.desc}.`);
    return { ok: true, upgrade: upId, price: up.price };
  }

  function hireCrew(crewId) {
    const member = SEA_CREW.find((c) => c.id === crewId);
    if (!member) return { ok: false, reason: 'no-such-crew' };
    if (hasCrew(crewId)) return { ok: false, reason: 'already-hired' };
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    state.crew.push(crewId);
    log(`Hired ${member.name} ($${member.wage}/day). ${member.effect}.`);
    return { ok: true, crew: crewId, wage: member.wage };
  }

  function fireCrew(crewId) {
    if (!hasCrew(crewId)) return { ok: false, reason: 'not-hired' };
    state.crew = state.crew.filter((c) => c !== crewId);
    log(`Let go of the ${crewId}. The crew grumbles.`);
    return { ok: true, crew: crewId };
  }

  function startCharter(routeId) {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    if (state.charter) return { ok: false, reason: 'charter-active' };
    const route = SEA_ROUTES.find((r) => r.id === routeId);
    if (!route) return { ok: false, reason: 'no-such-route' };
    if (luxury() < route.needLuxury) return { ok: false, reason: 'luxury-too-low', need: route.needLuxury };
    const boat = boatInfo();
    if (boat.capacity < route.passengers) return { ok: false, reason: 'capacity-too-low', need: route.passengers };
    const fuelNeed = route.duration * fuelBurn() * 0.1;
    if (state.fuel < fuelNeed) return { ok: false, reason: 'low-fuel', need: Math.ceil(fuelNeed) };
    const weather = SEA_WEATHER.find((w) => w.id === state.seaWeather);
    if (weather && weather.risk >= 0.6) return { ok: false, reason: 'storm-warning' };
    state.charter = {
      routeId, routeName: route.name, timeLeft: route.duration,
      passengers: route.passengers, pay: route.pay, startedDay: getDay(),
    };
    log(`Charter started: ${route.name} — ${route.passengers} passengers, $${route.pay} on completion.`);
    return { ok: true, charter: { ...state.charter } };
  }

  function finishCharter() {
    const ch = state.charter;
    if (!ch) return { ok: false, reason: 'no-charter' };
    state.charter = null;
    state.chartersDone += 1;
    let pay = ch.pay;
    if (hasCrew('deckhand')) pay = Math.round(pay * 1.1);
    if (hasCrew('chef') && (ch.routeId === 'party' || ch.routeId === 'vip' || ch.routeId === 'wedding')) pay = Math.round(pay * 1.25);
    if (hasCrew('dj') && ch.routeId === 'party') pay = Math.round(pay * 1.2);
    if (hasUpgrade('bar') && ch.routeId === 'party') pay = Math.round(pay * 1.4);
    if (hasUpgrade('sonar') && ch.routeId === 'fishing-charter') pay = Math.round(pay * 1.3);
    if (hasCrew('diver') && ch.routeId === 'dive') pay = Math.round(pay * 1.3);
    const tip = Math.floor(rng() * 60) + luxury() * 10;
    const total = pay + tip;
    addCash(total);
    state.totalEarned += total;
    state.dayEarned += total;
    state.tipsEarned += tip;
    state.seaMiles += 12;
    state.fuel = Math.max(0, state.fuel - ch.timeLeft * fuelBurn() * 0.05);
    state.condition = Math.max(0, state.condition - 2);
    if (ch.routeId === 'vip' || ch.routeId === 'wedding') state.vipClients += 1;
    if (ch.routeId === 'fishing-charter') state.fishCaught += 5 + Math.floor(rng() * 10);
    state.rating = Math.min(5, state.rating + 0.03);
    state.lastSailDay = getDay();
    log(`Charter complete: ${ch.routeName}! $${pay} + $${tip} tips = $${total}.`);
    return { ok: true, pay: total, base: pay, tip, route: ch.routeId };
  }

  function cancelCharter() {
    if (!state.charter) return { ok: false, reason: 'no-charter' };
    const ch = state.charter;
    state.charter = null;
    state.rating = Math.max(1, state.rating - 0.1);
    log(`Charter cancelled — ${ch.routeName} passengers are furious. Rating drops.`);
    return { ok: true, route: ch.routeId };
  }

  function enterRace(raceId) {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    const race = SEA_RACES.find((r) => r.id === raceId);
    if (!race) return { ok: false, reason: 'no-such-race' };
    if (speed() < race.needSpeed) return { ok: false, reason: 'too-slow', need: race.needSpeed };
    const hour = getHour();
    if (race.nightOnly && hour < 22 && hour >= 5) return { ok: false, reason: 'night-only' };
    if (getCash() < race.entry) return { ok: false, reason: 'no-cash', need: race.entry };
    addCash(-race.entry);
    state.racesRun += 1;
    const mySpeed = speed();
    const rivals = 3 + Math.floor(rng() * 3);
    let place = 1;
    for (let i = 0; i < rivals; i++) {
      const rivalSpeed = 1.4 + rng() * 1.2;
      if (rivalSpeed > mySpeed) place += 1;
    }
    state.seaMiles += 8;
    state.fuel = Math.max(0, state.fuel - 10);
    if (place === 1) {
      addCash(race.prize);
      state.totalEarned += race.prize;
      state.dayEarned += race.prize;
      state.racesWon += 1;
      if (race.id === 'regatta') state.regattaTitles += 1;
      const best = state.bestRace;
      if (!best || race.prize > best.prize) state.bestRace = { race: race.id, prize: race.prize };
      log(`RACE WIN! ${race.name} — first place! Prize $${race.prize}!`);
      return { ok: true, place: 1, won: true, prize: race.prize, rivals };
    }
    log(`${race.name}: finished ${place} of ${rivals + 1}. The entry fee is gone.`);
    return { ok: true, place, won: false, prize: 0, rivals };
  }

  function answerRescue(rescueId) {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    if (state.rescue) return { ok: false, reason: 'rescue-active' };
    const rescue = SEA_RESCUES.find((r) => r.id === rescueId);
    if (!rescue) return { ok: false, reason: 'no-such-rescue' };
    const weather = SEA_WEATHER.find((w) => w.id === state.seaWeather);
    if (rescue.difficulty >= 3 && weather && weather.risk >= 0.4) {
      return { ok: false, reason: 'too-dangerous' };
    }
    state.rescue = { rescueId, rescueName: rescue.name, timeLeft: rescue.time, pay: rescue.pay, difficulty: rescue.difficulty };
    log(`Rescue call: ${rescue.name}! ${rescue.time}s to get there — $${rescue.pay} reward.`);
    return { ok: true, rescue: { ...state.rescue } };
  }

  function completeRescue() {
    const r = state.rescue;
    if (!r) return { ok: false, reason: 'no-rescue' };
    state.rescue = null;
    const success = rng() < 0.7 + (hasUpgrade('gps') ? 0.15 : 0) - r.difficulty * 0.05;
    if (success) {
      let pay = r.pay;
      if (hasUpgrade('gps')) pay = Math.round(pay * 1.15);
      addCash(pay);
      state.totalEarned += pay;
      state.dayEarned += pay;
      state.rescuesDone += 1;
      state.rating = Math.min(5, state.rating + 0.1);
      log(`Rescue complete: ${r.rescueName}! Reward $${pay}. The marina salutes you.`);
      return { ok: true, success: true, pay };
    }
    state.rescuesFailed += 1;
    state.rating = Math.max(1, state.rating - 0.05);
    log(`Rescue failed: ${r.rescueName}. The coast guard takes over.`);
    return { ok: true, success: false, pay: 0 };
  }

  function buyCargo(cargoId, qty = 1) {
    const item = SEA_CARGO.find((c) => c.id === cargoId);
    if (!item) return { ok: false, reason: 'no-such-cargo' };
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    const cost = item.buy * qty;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.cargo[cargoId] = (state.cargo[cargoId] || 0) + qty;
    if (!item.legal) state.smuggled += qty;
    log(`Loaded ${qty}x ${item.name} for $${cost}.`);
    return { ok: true, cargo: cargoId, qty, cost };
  }

  function sellCargo(cargoId, qty = 1) {
    const item = SEA_CARGO.find((c) => c.id === cargoId);
    if (!item) return { ok: false, reason: 'no-such-cargo' };
    if ((state.cargo[cargoId] || 0) < qty) return { ok: false, reason: 'not-enough-cargo', have: state.cargo[cargoId] || 0 };
    state.cargo[cargoId] -= qty;
    const value = item.sell * qty;
    addCash(value);
    state.totalEarned += value;
    state.dayEarned += value;
    if (!item.legal && rng() < 0.3) {
      const fine = 100;
      addCash(-Math.min(getCash(), fine));
      addHeat(20);
      state.patrolFines += fine;
      log(`Harbor patrol catches the ${item.name} sale! Fine $${fine}, heat +20.`);
      return { ok: true, value: value - fine, fine, heat: 20 };
    }
    log(`Sold ${qty}x ${item.name} for $${value}.`);
    return { ok: true, value };
  }

  function payMarinaFee() {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    const boat = boatInfo();
    const fee = 20 + boat.luxury * 10;
    if (getCash() < fee) return { ok: false, reason: 'no-cash', need: fee };
    addCash(-fee);
    state.marinaFees += fee;
    state.condition = Math.min(100, state.condition + 5);
    log(`Marina berth fee $${fee} paid. The boat is washed and checked.`);
    return { ok: true, fee };
  }

  function tick(dt) {
    // Sea weather drifts every couple of minutes.
    state.weatherTimer -= dt;
    if (state.weatherTimer <= 0) {
      state.weatherTimer = 90 + rng() * 120;
      const roll = rng();
      if (roll < 0.4) state.seaWeather = 'calm';
      else if (roll < 0.7) state.seaWeather = 'breeze';
      else if (roll < 0.85) state.seaWeather = 'rough';
      else if (roll < 0.93) state.seaWeather = 'fog';
      else state.seaWeather = 'storm';
    }
    // Charter clock.
    if (state.charter) {
      state.charter.timeLeft -= dt;
      state.seaMiles += dt * 0.01 * speed();
      // Rough weather strains the boat and the passengers' stomachs.
      const weather = SEA_WEATHER.find((w) => w.id === state.seaWeather);
      if (weather && weather.risk >= 0.3) {
        state.condition = Math.max(0, state.condition - dt * 0.05);
      }
      if (state.charter.timeLeft <= 0) finishCharter();
    }
    // Rescue clock.
    if (state.rescue) {
      state.rescue.timeLeft -= dt;
      if (state.rescue.timeLeft <= 0) completeRescue();
    }
    // Random sea events while out on a charter.
    if (state.charter && rng() < dt * 0.004) {
      const ev = SEA_EVENTS[Math.floor(rng() * SEA_EVENTS.length)];
      state.eventsSeen[ev.id] = (state.eventsSeen[ev.id] || 0) + 1;
      switch (ev.id) {
        case 'dolphins':
          state.rating = Math.min(5, state.rating + 0.05);
          addCash(30);
          state.totalEarned += 30;
          log('Dolphins ride your bow wave! Passengers tip $30.');
          break;
        case 'pirate':
          if (rng() < 0.3) {
            const loss = Math.min(getCash(), 100 + Math.floor(rng() * 200));
            addCash(-loss);
            log(`Pirates! They take $${loss} before the patrol scares them off.`);
          } else {
            log('A suspicious boat shadows you... then peels away.');
          }
          break;
        case 'wave':
          state.condition = Math.max(0, state.condition - 8);
          if (hasUpgrade('hull')) state.condition = Math.min(100, state.condition + 4);
          log('A rogue wave slams the hull! Condition -8.');
          break;
        case 'engine-fail':
          state.charter.timeLeft += 60;
          state.condition = Math.max(0, state.condition - 5);
          log('Engine failure! You drift while the crew fixes it. Charter +60s.');
          break;
        case 'seagull':
          state.rating = Math.max(1, state.rating - 0.03);
          log('Seagulls steal the lunch buffet. Passengers laugh — mostly.');
          break;
        case 'sunset-perfect':
          state.rating = Math.min(5, state.rating + 0.08);
          addCash(50);
          state.totalEarned += 50;
          log('A perfect sunset! Passengers tip $50 and post photos.');
          break;
        case 'patrol': {
          const illegal = Object.entries(state.cargo).filter(([id, q]) => {
            const item = SEA_CARGO.find((c) => c.id === id);
            return item && !item.legal && q > 0;
          });
          if (illegal.length > 0) {
            const fine = 200;
            addCash(-Math.min(getCash(), fine));
            addHeat(25);
            state.patrolFines += fine;
            log(`Harbor patrol boards and finds sealed crates! Fine $${fine}, heat +25.`);
          } else {
            log('Harbor patrol pulls alongside — papers in order, they wave you on.');
          }
          break;
        }
        case 'whale-breach':
          state.rating = Math.min(5, state.rating + 0.1);
          addCash(80);
          state.totalEarned += 80;
          log('A whale breaches beside the boat! Passengers tip $80.');
          break;
        default:
          log(`At sea: ${ev.text}`);
          break;
      }
    }
  }

  function tickDay(day) {
    // Crew wages and marina fees settle overnight.
    let wages = 0;
    for (const c of state.crew) {
      const member = SEA_CREW.find((m) => m.id === c);
      if (member) wages += member.wage;
    }
    if (wages > 0) {
      addCash(-Math.min(getCash(), wages));
      log(`Crew wages paid: $${wages}.`);
    }
    if (state.boat) {
      const fee = 10 + (boatInfo() ? boatInfo().luxury * 5 : 0);
      addCash(-Math.min(getCash(), fee));
      state.marinaFees += fee;
    }
    if (state.dayEarned > state.bestDay) state.bestDay = state.dayEarned;
    state.dayEarned = 0;
    // A new day can bring a rescue call.
    if (state.boat && rng() < 0.5) {
      const rescue = SEA_RESCUES[Math.floor(rng() * SEA_RESCUES.length)];
      log(`Marina radio: ${rescue.name} needs help! Answer it at the marina.`);
    }
    return { day, wages, rating: Number(state.rating.toFixed(1)) };
  }

  function interact() {
    const p = getPlayerPos();
    const d = Math.hypot(MARINA.x - p.x, MARINA.z - p.z);
    if (d > 20) return false;
    if (!state.boat) {
      const res = buyBoat('dinghy');
      return res.ok || res.reason === 'no-cash';
    }
    if (state.charter) return true; // charter runs on its own clock
    if (state.rescue) return true;
    // Default: start the sunset cruise if the boat can take it.
    const res = startCharter('sunset');
    if (res.ok) return true;
    if (res.reason === 'luxury-too-low' || res.reason === 'capacity-too-low') {
      const fish = startCharter('fishing-charter');
      return fish.ok;
    }
    return true;
  }

  function hudLine() {
    if (state.charter) {
      return `SEA ${state.charter.routeName} · ${Math.ceil(state.charter.timeLeft)}s · ${state.seaWeather} · fuel ${Math.round(state.fuel)}%`;
    }
    if (state.rescue) {
      return `RESCUE ${state.rescue.rescueName} · ${Math.ceil(state.rescue.timeLeft)}s left!`;
    }
    const p = getPlayerPos();
    if (Math.hypot(MARINA.x - p.x, MARINA.z - p.z) < 20) {
      const boat = boatInfo();
      return `MARINA · ${boat ? boat.name : 'no boat'} · ${state.seaWeather} · ★${state.rating.toFixed(1)}`;
    }
    if (state.boat && state.fuel < 20) return 'BOAT fuel low — visit the marina!';
    return '';
  }

  function stats() {
    return {
      boat: state.boat,
      ownedBoats: [...state.ownedBoats],
      upgrades: [...state.upgrades],
      crew: [...state.crew],
      fuel: Math.round(state.fuel),
      condition: Math.round(state.condition),
      speed: Number(speed().toFixed(2)),
      luxury: luxury(),
      charter: state.charter ? state.charter.routeId : null,
      rescue: state.rescue ? state.rescue.rescueId : null,
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
      rating: Number(state.rating.toFixed(1)),
      bestDay: state.bestDay,
      dayEarned: state.dayEarned,
      eventsSeen: Object.keys(state.eventsSeen).length,
      photos: state.photos || 0,
      photoLikes: state.photoLikes || 0,
      boatShows: state.boatShows || 0,
      boatShowWins: state.boatShowWins || 0,
      marinaParties: state.marinaParties || 0,
      shanties: state.shanties || 0,
      dives: state.dives || 0,
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
      photos: state.photos || 0,
      photoLikes: state.photoLikes || 0,
      boatShows: state.boatShows || 0,
      boatShowWins: state.boatShowWins || 0,
      marinaParties: state.marinaParties || 0,
      shanties: state.shanties || 0,
      dives: state.dives || 0,
    };
  }

  function deserialize(d) {
    if (!d) return;
    state.boat = d.boat || null;
    state.ownedBoats = [...(d.ownedBoats || [])];
    state.upgrades = [...(d.upgrades || [])];
    state.crew = [...(d.crew || [])];
    state.fuel = d.fuel ?? 100;
    state.condition = d.condition ?? 100;
    state.cargo = { ...(d.cargo || {}) };
    state.totalEarned = d.totalEarned ?? 0;
    state.chartersDone = d.chartersDone ?? 0;
    state.racesWon = d.racesWon ?? 0;
    state.racesRun = d.racesRun ?? 0;
    state.rescuesDone = d.rescuesDone ?? 0;
    state.rescuesFailed = d.rescuesFailed ?? 0;
    state.seaMiles = d.seaMiles ?? 0;
    state.smuggled = d.smuggled ?? 0;
    state.patrolFines = d.patrolFines ?? 0;
    state.tipsEarned = d.tipsEarned ?? 0;
    state.bestRace = d.bestRace ? { ...d.bestRace } : null;
    state.regattaTitles = d.regattaTitles ?? 0;
    state.vipClients = d.vipClients ?? 0;
    state.fishCaught = d.fishCaught ?? 0;
    state.fuelBought = d.fuelBought ?? 0;
    state.repairs = d.repairs ?? 0;
    state.marinaFees = d.marinaFees ?? 0;
    state.rating = d.rating ?? 4.0;
    state.ratingCount = d.ratingCount ?? 12;
    state.bestDay = d.bestDay ?? 0;
    state.lastSailDay = d.lastSailDay ?? 0;
    state.eventsSeen = { ...(d.eventsSeen || {}) };
    state.photos = d.photos ?? 0;
    state.photoLikes = d.photoLikes ?? 0;
    state.boatShows = d.boatShows ?? 0;
    state.boatShowWins = d.boatShowWins ?? 0;
    state.marinaParties = d.marinaParties ?? 0;
    state.shanties = d.shanties ?? 0;
    state.dives = d.dives ?? 0;
    state.charter = null;
    state.rescue = null;
    state.seaWeather = 'calm';
    state.dayEarned = 0;
  }

  // --- Round 7 top-up: sea fishing, photos, boat show, marina party ---
  const SEA_FISH = [
    { id: 'mackerel', name: 'Mackerel', value: 15, weight: 0.35 },
    { id: 'tuna', name: 'Yellowfin Tuna', value: 80, weight: 0.2 },
    { id: 'marlin', name: 'Blue Marlin', value: 300, weight: 0.08 },
    { id: 'squid', name: 'Squid', value: 25, weight: 0.2 },
    { id: 'shark', name: 'Shark (catch & release)', value: 0, weight: 0.1 },
    { id: 'boot', name: 'Old Boot', value: 2, weight: 0.07 },
  ];
  function fishAtSea() {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    if (state.fuel < 5) return { ok: false, reason: 'low-fuel' };
    state.fuel = Math.max(0, state.fuel - 5);
    const roll = rng();
    let acc = 0;
    let fish = SEA_FISH[0];
    for (const f of SEA_FISH) {
      acc += f.weight;
      if (roll <= acc) { fish = f; break; }
    }
    state.fishCaught += 1;
    if (fish.value > 0) {
      addCash(fish.value);
      state.totalEarned += fish.value;
      state.dayEarned += fish.value;
      log(`Caught a ${fish.name}! Sold for $${fish.value}.`);
      return { ok: true, fish: fish.id, value: fish.value };
    }
    log(`Caught a ${fish.name} — released it back. No pay, but a great story.`);
    return { ok: true, fish: fish.id, value: 0 };
  }
  function sunsetPhoto() {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    const hour = getHour();
    if (hour < 17 || hour > 19) return { ok: false, reason: 'wrong-time', window: '17:00–19:00' };
    const likes = 50 + Math.floor(rng() * 200) + luxury() * 30;
    state.photos = (state.photos || 0) + 1;
    state.photoLikes = (state.photoLikes || 0) + likes;
    state.rating = Math.min(5, state.rating + 0.02);
    log(`Golden-hour photo from the boat: ${likes} likes!`);
    return { ok: true, likes };
  }
  function enterBoatShow() {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    const entry = 100;
    if (getCash() < entry) return { ok: false, reason: 'no-cash', need: entry };
    addCash(-entry);
    state.boatShows = (state.boatShows || 0) + 1;
    const score = luxury() * 20 + state.condition * 0.5 + rng() * 30;
    const field = [60, 90, 120, 150].map((f) => f + rng() * 20);
    const place = field.filter((f) => f > score).length + 1;
    if (place === 1) {
      const prize = 1500;
      addCash(prize);
      state.totalEarned += prize;
      state.boatShowWins = (state.boatShowWins || 0) + 1;
      log(`BOAT SHOW WIN! Your ${boatInfo().name} takes first! Prize $${prize}!`);
      return { ok: true, won: true, place: 1, prize, score: Math.round(score) };
    }
    log(`Boat show: placed ${place} of 5. Score ${Math.round(score)}.`);
    return { ok: true, won: false, place, prize: 0, score: Math.round(score) };
  }
  function marinaParty() {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    const cost = 200;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    if (luxury() < 3) return { ok: false, reason: 'luxury-too-low', need: 3 };
    addCash(-cost);
    const guests = 10 + Math.floor(rng() * 20);
    const earned = guests * 15;
    addCash(earned);
    state.totalEarned += earned;
    state.dayEarned += earned;
    state.marinaParties = (state.marinaParties || 0) + 1;
    state.rating = Math.min(5, state.rating + 0.1);
    log(`Marina party on your boat: ${guests} guests, $${earned} in the kitty!`);
    return { ok: true, guests, earned, cost };
  }
  function singSeaShanty() {
    if (!state.charter) return { ok: false, reason: 'no-charter' };
    const tip = 20 + Math.floor(rng() * 40);
    addCash(tip);
    state.totalEarned += tip;
    state.tipsEarned += tip;
    state.shanties = (state.shanties || 0) + 1;
    log(`You sing a sea shanty for the passengers. They tip $${tip}!`);
    return { ok: true, tip };
  }
  function deepSeaDive() {
    if (!state.boat) return { ok: false, reason: 'no-boat' };
    if (!hasCrew('diver')) return { ok: false, reason: 'need-diver' };
    if (state.fuel < 10) return { ok: false, reason: 'low-fuel' };
    state.fuel = Math.max(0, state.fuel - 10);
    const roll = rng();
    if (roll < 0.4) {
      const value = 100 + Math.floor(rng() * 300);
      addCash(value);
      state.totalEarned += value;
      state.dayEarned += value;
      state.dives = (state.dives || 0) + 1;
      log(`Dive finds a sunken chest — $${value} in old coins!`);
      return { ok: true, found: true, value };
    }
    state.dives = (state.dives || 0) + 1;
    log('Dive finds nothing but sand and a curious octopus.');
    return { ok: true, found: false, value: 0 };
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
    speed,
    luxury,
    hasUpgrade,
    hasCrew,
    boatInfo,
    fishAtSea,
    sunsetPhoto,
    enterBoatShow,
    marinaParty,
    singSeaShanty,
    deepSeaDive,
  };
}
