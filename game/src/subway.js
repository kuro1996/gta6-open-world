export const SUBWAY_LINES = [
  { id: 'red', name: 'Red Line', color: '#e33', express: false, nightService: false, baseFare: 4 },
  { id: 'blue', name: 'Blue Line', color: '#36c', express: false, nightService: false, baseFare: 5 },
  { id: 'express', name: 'Express Line', color: '#fc0', express: true, nightService: true, baseFare: 12 },
];

export const SUBWAY_STATIONS = [
  { id: 'central', name: 'Central Station', line: 'red', x: 0, z: 0, district: 'Downtown', shops: ['newsstand', 'coffee'], transfer: ['blue'], busy: 0.9, danger: 0.25 },
  { id: 'harbor', name: 'Harborfront', line: 'red', x: -180, z: 120, district: 'Harbor', shops: ['fish-stall'], transfer: [], busy: 0.55, danger: 0.35 },
  { id: 'voss', name: 'Voss Garage', line: 'red', x: 140, z: -90, district: 'Industrial', shops: ['parts-kiosk'], transfer: [], busy: 0.4, danger: 0.3 },
  { id: 'marina', name: 'Marina Bay', line: 'blue', x: 190, z: 140, district: 'Marina', shops: ['gelato', 'souvenir'], transfer: [], busy: 0.7, danger: 0.15 },
  { id: 'northside', name: 'Northside', line: 'blue', x: -120, z: -160, district: 'Northside', shops: ['bakery'], transfer: [], busy: 0.6, danger: 0.4 },
  { id: 'airport', name: 'Solara Intl Airport', line: 'blue', x: 220, z: -180, district: 'Airport', shops: ['duty-free', 'coffee'], transfer: ['express'], busy: 0.85, danger: 0.2 },
  { id: 'university', name: 'University', line: 'express', x: 60, z: 190, district: 'Campus', shops: ['bookshop'], transfer: [], busy: 0.65, danger: 0.1 },
  { id: 'stadium', name: 'Stadium', line: 'express', x: -200, z: -40, district: 'Stadium', shops: ['merch'], transfer: [], busy: 0.5, danger: 0.3 },
];

export const SUBWAY_PASSES = [
  { id: 'day', name: 'Day Pass', price: 18, days: 1, perks: ['unlimited rides today'] },
  { id: 'week', name: 'Weekly Pass', price: 90, days: 7, perks: ['unlimited rides', 'no inspector fines'] },
  { id: 'gold', name: 'Gold Metro Card', price: 400, days: 30, perks: ['unlimited rides', 'express line free', 'lounge access'] },
];

export const SUBWAY_FARES = { single: 4, transfer: 2, expressSurcharge: 8, inspectorFine: 60, nightSurcharge: 6 };

export const SUBWAY_SHOP_ITEMS = [
  { id: 'coffee', name: 'Metro Coffee', price: 3, effect: 'Energy plus 10 for 1 hour.' },
  { id: 'newspaper', name: 'Solara Times', price: 2, effect: 'Rumor of next delay.' },
  { id: 'snack', name: 'Station Snack', price: 4, effect: 'Hunger handled plus 5 stamina.' },
  { id: 'umbrella', name: 'Cheap Umbrella', price: 8, effect: 'Rain-proof until tomorrow.' },
  { id: 'map', name: 'Metro Map', price: 1, effect: 'Unlocks all station names on HUD.' },
  { id: 'charger', name: 'Phone Charger', price: 12, effect: 'Calls never drop for a day.' },
];

export const SUBWAY_COURIER_JOBS = [
  { id: 'parcel-central', name: 'Parcel to Central', from: 'harbor', to: 'central', pay: 55, deadlineMin: 9, weight: 'light' },
  { id: 'parcel-marina', name: 'Parcel to Marina', from: 'central', to: 'marina', pay: 70, deadlineMin: 11, weight: 'light' },
  { id: 'parcel-airport', name: 'Urgent docs to Airport', from: 'university', to: 'airport', pay: 120, deadlineMin: 8, weight: 'light' },
  { id: 'parcel-north', name: 'Crate to Northside', from: 'voss', to: 'northside', pay: 95, deadlineMin: 12, weight: 'heavy' },
  { id: 'parcel-stadium', name: 'Merch to Stadium', from: 'marina', to: 'stadium', pay: 85, deadlineMin: 10, weight: 'medium' },
  { id: 'parcel-harbor', name: 'Spare parts to Harbor', from: 'airport', to: 'harbor', pay: 110, deadlineMin: 13, weight: 'heavy' },
];

export const SUBWAY_EVENTS = [
  { id: 'busker', name: 'Busker', text: 'A busker plays a sweet tune.', good: true },
  { id: 'delay', name: 'Delay', text: 'The train is delayed.', good: false },
  { id: 'inspector', name: 'Inspector', text: 'A ticket inspector boards.', good: false },
  { id: 'pickpocket', name: 'Pickpocket', text: 'Someone bumps into you.', good: false },
  { id: 'celebrity', name: 'Celebrity', text: 'A celebrity rides your car.', good: true },
  { id: 'lost-item', name: 'Lost Item', text: 'You spot something left behind.', good: true },
  { id: 'blackout', name: 'Blackout', text: 'The lights cut out for a moment.', good: false },
  { id: 'flash-mob', name: 'Flash Mob', text: 'A flash mob breaks into dance.', good: true },
];

export const SUBWAY_REP_TIERS = [
  { rep: 0, name: 'Fare Dodger', perks: [] },
  { rep: 20, name: 'Regular Rider', perks: ['10 percent fare discount'] },
  { rep: 50, name: 'Metro Loyalist', perks: ['20 percent fare discount', 'priority boarding'] },
  { rep: 100, name: 'Metro Legend', perks: ['30 percent fare discount', 'express unlocked', 'free coffee'] },
];

const LOST_ITEMS = [
  { id: 'wallet', name: 'Lost Wallet', value: 60 },
  { id: 'phone', name: 'Lost Phone', value: 120 },
  { id: 'watch', name: 'Lost Watch', value: 90 },
  { id: 'keys', name: 'Lost Keys', value: 20 },
  { id: 'bag', name: 'Lost Bag', value: 45 },
  { id: 'book', name: 'Lost Book', value: 15 },
];

const BUSKER_SONGS = [
  { id: 'ballad', name: 'Harbor Ballad', difficulty: 1 },
  { id: 'jazz', name: 'Midnight Jazz', difficulty: 2 },
  { id: 'rock', name: 'Street Rock', difficulty: 3 },
  { id: 'folk', name: 'Old Folk Song', difficulty: 1 },
];

const SOUVENIRS = [
  { id: 'keychain', name: 'Metro Keychain', price: 8 },
  { id: 'mug', name: 'Metro Mug', price: 15 },
  { id: 'shirt', name: 'Metro Shirt', price: 25 },
  { id: 'model-train', name: 'Model Train', price: 40 },
];

function stationById(id) {
  for (const s of SUBWAY_STATIONS) if (s.id === id) return s;
  return null;
}

function lineById(id) {
  for (const l of SUBWAY_LINES) if (l.id === id) return l;
  return null;
}

export function subwayDistance(fromId, toId) {
  const a = stationById(fromId);
  const b = stationById(toId);
  if (!a || !b) return 0;
  return Math.hypot(a.x - b.x, a.z - b.z);
}

export function subwayRepTier(rep) {
  let out = 0;
  for (let i = 0; i < SUBWAY_REP_TIERS.length; i++) if (rep >= SUBWAY_REP_TIERS[i].rep) out = i;
  return out;
}

export function subwayFare(fromId, toId, options) {
  const a = stationById(fromId);
  const b = stationById(toId);
  if (!a || !b) return null;
  const opts = options || {};
  let fare = SUBWAY_FARES.single;
  if (a.line !== b.line) fare += SUBWAY_FARES.transfer;
  if (a.line === 'express' || b.line === 'express') fare += SUBWAY_FARES.expressSurcharge;
  if (opts.night) fare += SUBWAY_FARES.nightSurcharge;
  const tier = subwayRepTier(opts.rep || 0);
  const discount = tier * 0.1;
  fare = Math.max(1, Math.round(fare * (1 - discount)));
  return fare;
}

export function createSubwaySystem(deps) {
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
    tickets: 0,
    pass: null,
    rep: 0,
    rides: 0,
    totalSpent: 0,
    finesPaid: 0,
    currentStation: 'central',
    onTrain: false,
    train: { line: 'red', atStation: 'central', nextStation: 'harbor', progress: 0, direction: 1, delay: 0, speed: 1 },
    riding: null,
    courier: null,
    courierDone: 0,
    courierFailed: 0,
    jobsOffered: [],
    eventsSeen: {},
    itemsBought: {},
    hasMap: false,
    inspectorStrikes: 0,
    pickpocketLoss: 0,
    lastDelayDay: 0,
    nightRides: 0,
    expressRides: 0,
    favoriteStation: null,
    stationVisits: {},
    shift: null,
    lastRideDay: 0,
    lostFound: [],
    souvenirs: [],
    coffeeSub: null,
  };

  function repTier() {
    return subwayRepTier(state.rep);
  }

  function tierName() {
    return SUBWAY_REP_TIERS[repTier()].name;
  }

  function hasValidPass() {
    return !!state.pass && dayOf() <= state.pass.expiryDay;
  }

  function passCoversExpress() {
    return hasValidPass() && state.pass.id === 'gold';
  }

  function isNight() {
    const h = hourOf();
    return h >= 23 || h < 5;
  }

  function fareFor(fromId, toId) {
    if (hasValidPass()) return 0;
    return subwayFare(fromId, toId, { night: isNight(), rep: state.rep });
  }

  function nearestStation(maxDist) {
    const limit = maxDist === undefined || maxDist === null ? 16 : maxDist;
    const pos = posOf();
    let best = null;
    let bestD = Infinity;
    for (const s of SUBWAY_STATIONS) {
      const dist = Math.hypot(pos.x - s.x, pos.z - s.z);
      if (dist <= limit && dist < bestD) { best = s; bestD = dist; }
    }
    return best ? { station: best, distance: bestD } : null;
  }

  function visitStation(stationId) {
    state.stationVisits[stationId] = (state.stationVisits[stationId] || 0) + 1;
    let fav = null;
    let favCount = 0;
    for (const k of Object.keys(state.stationVisits)) {
      if (state.stationVisits[k] > favCount) { favCount = state.stationVisits[k]; fav = k; }
    }
    state.favoriteStation = fav;
  }

  function maybeEvent() {
    if (rnd() >= 0.34) return null;
    const ev = SUBWAY_EVENTS[Math.floor(rnd() * SUBWAY_EVENTS.length)];
    return applyEvent(ev.id);
  }

  function applyEvent(eventId) {
    state.eventsSeen[eventId] = (state.eventsSeen[eventId] || 0) + 1;
    if (eventId === 'pickpocket') {
      const loss = Math.min(cashOf(), 5 + Math.floor(rnd() * 20));
      moveCash(-loss);
      state.pickpocketLoss += loss;
      say('Pickpocket! Lost $' + loss + '.');
      return { eventId, loss };
    }
    if (eventId === 'lost-item') {
      const found = 10 + Math.floor(rnd() * 40);
      moveCash(found);
      say('Found $' + found + ' left behind.');
      return { eventId, found };
    }
    if (eventId === 'inspector') {
      if (hasValidPass() || state.tickets > 0) {
        if (state.tickets > 0 && !hasValidPass()) state.tickets -= 1;
        return { eventId, passed: true };
      }
      state.inspectorStrikes += 1;
      if (cashOf() >= 60) {
        moveCash(-60);
        state.finesPaid += 60;
        state.totalSpent += 60;
        state.rep = Math.max(0, state.rep - 5);
        return { eventId, fined: true, fine: 60 };
      }
      pushHeat(15);
      state.rep = Math.max(0, state.rep - 10);
      return { eventId, fined: false, heat: 15 };
    }
    if (eventId === 'delay') {
      state.train.delay = 120 + Math.floor(rnd() * 120);
      return { eventId, delay: state.train.delay };
    }
    if (eventId === 'celebrity') {
      state.rep += 2;
      return { eventId, rep: 2 };
    }
    if (eventId === 'busker') {
      const tip = 3 + Math.floor(rnd() * 12);
      moveCash(tip);
      return { eventId, tip };
    }
    if (eventId === 'flash-mob') {
      state.rep += 3;
      return { eventId, rep: 3 };
    }
    if (eventId === 'blackout') {
      state.rep = Math.max(0, state.rep - 1);
      return { eventId, rep: -1 };
    }
    return { eventId };
  }

  function buyTicket(count) {
    const n = count === undefined || count === null ? 1 : count;
    const cost = 4 * n;
    if (cashOf() < cost) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-cost);
    state.tickets += n;
    state.totalSpent += cost;
    return { ok: true, tickets: state.tickets, price: cost };
  }

  function buyPass(passId) {
    const pass = SUBWAY_PASSES.find((p) => p.id === passId);
    if (!pass) return { ok: false, reason: 'unknown-pass' };
    if (cashOf() < pass.price) return { ok: false, reason: 'not-enough-cash' };
    if (state.pass && state.pass.id === passId && hasValidPass()) return { ok: false, reason: 'already-active' };
    moveCash(-pass.price);
    state.pass = { ...pass, expiryDay: dayOf() + pass.days - 1 };
    state.totalSpent += pass.price;
    return { ok: true, pass: { ...state.pass }, price: pass.price };
  }

  function boardTrain(destId) {
    if (state.riding) return { ok: false, reason: 'already-riding' };
    const dest = stationById(destId);
    if (!dest) return { ok: false, reason: 'unknown-station' };
    if (destId === state.currentStation) return { ok: false, reason: 'already-there' };
    const night = isNight();
    const destLine = lineById(dest.line);
    if (dest.line === 'express' && night && !passCoversExpress() && repTier() < 3) return { ok: false, reason: 'express-locked' };
    if (night && destLine && !destLine.nightService && dest.line !== 'express') return { ok: false, reason: 'no-night-service' };
    const fare = fareFor(state.currentStation, destId);
    if (fare > 0) {
      if (state.tickets > 0) {
        state.tickets -= 1;
      } else if (cashOf() >= fare) {
        moveCash(-fare);
        state.totalSpent += fare;
      } else {
        return { ok: false, reason: 'no-ticket' };
      }
    }
    const dist = subwayDistance(state.currentStation, destId);
    const rideTime = 6 + dist / 28 + state.train.delay / 60;
    const ride = {
      from: state.currentStation,
      to: destId,
      line: dest.line,
      timeLeft: Math.round(rideTime * 60),
      fare,
      startedDay: dayOf(),
    };
    state.riding = ride;
    state.onTrain = true;
    if (dest.line === 'express') state.expressRides += 1;
    if (night) state.nightRides += 1;
    return { ok: true, ride: { ...ride }, fare };
  }

  function arrive() {
    if (!state.riding) return { ok: false, reason: 'not-riding' };
    const ride = state.riding;
    state.riding = null;
    state.onTrain = false;
    state.currentStation = ride.to;
    state.rides += 1;
    state.rep += 1;
    state.lastRideDay = dayOf();
    visitStation(ride.to);
    say('Arrived at ' + (stationById(ride.to) || {}).name + '.');
    const eventResult = maybeEvent();
    let courierResult = null;
    if (state.courier) {
      if (state.courier.to === ride.to) courierResult = completeCourier(true);
      else if (state.courier.timeLeft <= 0) courierResult = completeCourier(false);
    }
    return { ok: true, station: ride.to, event: eventResult, courier: courierResult };
  }

  function offerJobs() {
    const atHere = SUBWAY_COURIER_JOBS.filter((j) => j.from === state.currentStation);
    const others = SUBWAY_COURIER_JOBS.filter((j) => j.from !== state.currentStation);
    const picked = [...atHere];
    while (picked.length < 3 && others.length > 0) {
      const idx = Math.floor(rnd() * others.length);
      picked.push(others.splice(idx, 1)[0]);
    }
    const jobs = picked.slice(0, 3);
    state.jobsOffered = jobs.map((j) => j.id);
    return jobs.map((j) => ({ ...j }));
  }

  function takeCourierJob(jobId) {
    if (state.courier) return { ok: false, reason: 'job-active' };
    const job = SUBWAY_COURIER_JOBS.find((j) => j.id === jobId);
    if (!job) return { ok: false, reason: 'unknown-job' };
    const bonus = state.shift ? state.shift.bonus : 0;
    state.courier = { ...job, pay: job.pay + bonus, timeLeft: job.deadlineMin * 60, heavy: job.weight === 'heavy', startedDay: dayOf() };
    return { ok: true, job: { ...state.courier } };
  }

  function completeCourier(onTime) {
    if (!state.courier) return null;
    const job = state.courier;
    state.courier = null;
    if (!onTime) {
      state.courierFailed += 1;
      state.rep = Math.max(0, state.rep - 4);
      return { ok: true, onTime: false, pay: 0, tip: 0, jobId: job.id };
    }
    const tip = Math.floor(rnd() * 15);
    const pay = job.pay + tip;
    moveCash(pay);
    state.courierDone += 1;
    state.rep += 3;
    let shiftBonus = 0;
    if (state.shift) {
      state.shift.jobsLeft -= 1;
      if (state.shift.jobsLeft <= 0) {
        shiftBonus = 60 + state.shift.jobsDone * 10;
        moveCash(shiftBonus);
        state.shift = null;
      }
    }
    const out = { ok: true, onTime: true, pay, tip, jobId: job.id };
    if (shiftBonus > 0) out.shiftBonus = shiftBonus;
    return out;
  }

  function startShift() {
    if (state.shift) return { ok: false, reason: 'shift-active' };
    if (state.rep < 10) return { ok: false, reason: 'rep-too-low' };
    state.shift = { jobsLeft: 3 + Math.floor(rnd() * 3), jobsDone: 0, bonus: 10, startedDay: dayOf() };
    return { ok: true, shift: { ...state.shift } };
  }

  function buyShopItem(itemId) {
    const item = SUBWAY_SHOP_ITEMS.find((i) => i.id === itemId);
    if (!item) return { ok: false, reason: 'unknown-item' };
    if (cashOf() < item.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-item.price);
    state.itemsBought[itemId] = (state.itemsBought[itemId] || 0) + 1;
    state.totalSpent += item.price;
    if (itemId === 'map') state.hasMap = true;
    return { ok: true, itemId, price: item.price };
  }

  function dodgeInspector() {
    if (state.inspectorStrikes <= 0) return { ok: false, reason: 'no-strikes' };
    if (rnd() < 0.55) {
      state.inspectorStrikes -= 1;
      state.rep += 1;
      return { ok: true, dodged: true };
    }
    pushHeat(10);
    return { ok: true, dodged: false, heat: 10 };
  }

  function reportPickpocket() {
    if (state.pickpocketLoss <= 0) return { ok: false, reason: 'nothing-lost' };
    const recovered = Math.floor(state.pickpocketLoss * 0.4);
    moveCash(recovered);
    state.pickpocketLoss = 0;
    state.rep += 2;
    return { ok: true, recovered };
  }

  function tick(dt) {
    const step = dt || 0;
    if (state.train.delay > 0) {
      state.train.delay = Math.max(0, state.train.delay - step);
    } else {
      state.train.progress += step * 0.02 * (1 + repTier() * 0.05);
      if (state.train.progress >= 1) {
        state.train.progress = 0;
        const lineStations = SUBWAY_STATIONS.filter((s) => s.line === state.train.line);
        const idx = lineStations.findIndex((s) => s.id === state.train.atStation);
        let next = idx + state.train.direction;
        if (next >= lineStations.length || next < 0) {
          state.train.direction *= -1;
          next = idx + state.train.direction;
        }
        if (lineStations[next]) {
          state.train.atStation = state.train.atStation;
          state.train.nextStation = lineStations[next].id;
          state.train.atStation = lineStations[next].id;
        }
      }
      if (rnd() < 0.08 * step) state.train.delay = 45 + Math.floor(rnd() * 90);
    }
    if (state.riding) {
      state.riding.timeLeft -= step;
      if (state.riding.timeLeft <= 0) arrive();
    }
    if (state.courier) {
      state.courier.timeLeft -= step;
      if (state.courier.timeLeft <= 0) completeCourier(false);
    }
    if (state.shift && state.shift.startedDay !== dayOf() && hourOf() < 6) state.shift = null;
    if (state.pass && dayOf() > state.pass.expiryDay + 1) state.pass = null;
  }

  function tickDay(day) {
    const today = day !== undefined && day !== null ? day : dayOf();
    let delay = 0;
    if (rnd() < 0.5) {
      delay = 60 + Math.floor(rnd() * 180);
      state.train.delay = delay;
      state.lastDelayDay = today;
    }
    if (today % 7 === 1 && hasValidPass()) state.rep += 2;
    state.jobsOffered = [];
    return { day: today, delay, rep: state.rep };
  }

  function interact() {
    const near = nearestStation(16);
    if (!near) return false;
    if (state.onTrain) return false;
    if (state.currentStation !== near.station.id) {
      state.currentStation = near.station.id;
      visitStation(near.station.id);
      say('Now at ' + near.station.name + '.');
    }
    if (!state.courier && state.rep >= 10 && rnd() < 0.4) {
      const jobs = offerJobs();
      if (jobs.length > 0) {
        takeCourierJob(jobs[0].id);
        return true;
      }
    }
    const lineStations = SUBWAY_STATIONS.filter((s) => s.line === state.train.line);
    const idx = lineStations.findIndex((s) => s.id === state.currentStation);
    const next = lineStations[idx + state.train.direction] || lineStations[idx - state.train.direction];
    if (!next) return true;
    const res = boardTrain(next.id);
    if (!res.ok) say('Could not board: ' + res.reason + '.');
    return true;
  }

  function hudLine() {
    if (state.riding) {
      const dest = stationById(state.riding.to);
      return 'METRO → ' + (dest ? dest.name : state.riding.to) + ' · ' + Math.ceil(state.riding.timeLeft) + 's';
    }
    if (state.courier) {
      const dest = stationById(state.courier.to);
      return 'COURIER → ' + (dest ? dest.name : state.courier.to) + ' · $' + state.courier.pay + ' · ' + Math.ceil(state.courier.timeLeft) + 's';
    }
    const near = nearestStation(16);
    if (near) {
      return 'METRO ' + near.station.name + ' · ' + state.tickets + ' tickets · ' + state.rep + ' rep (' + tierName() + ')';
    }
    if (state.pass) return 'METRO ' + state.pass.id + ' pass until day ' + state.pass.expiryDay;
    return '';
  }

  function stats() {
    return {
      tickets: state.tickets,
      passId: state.pass ? state.pass.id : null,
      passExpiryDay: state.pass ? state.pass.expiryDay : null,
      rep: state.rep,
      tierName: tierName(),
      rides: state.rides,
      nightRides: state.nightRides,
      expressRides: state.expressRides,
      totalSpent: state.totalSpent,
      finesPaid: state.finesPaid,
      inspectorStrikes: state.inspectorStrikes,
      pickpocketLoss: state.pickpocketLoss,
      courierDone: state.courierDone,
      courierFailed: state.courierFailed,
      courierActive: !!state.courier,
      onTrain: state.onTrain,
      currentStation: state.currentStation,
      favoriteStation: state.favoriteStation,
      stationVisits: { ...state.stationVisits },
      shiftActive: !!state.shift,
      eventsSeen: Object.keys(state.eventsSeen).length,
      itemsBought: Object.values(state.itemsBought).reduce((a, b) => a + b, 0),
    };
  }

  function serialize() {
    return {
      tickets: state.tickets,
      pass: state.pass ? { ...state.pass } : null,
      rep: state.rep,
      rides: state.rides,
      totalSpent: state.totalSpent,
      finesPaid: state.finesPaid,
      currentStation: state.currentStation,
      courierDone: state.courierDone,
      courierFailed: state.courierFailed,
      inspectorStrikes: state.inspectorStrikes,
      pickpocketLoss: state.pickpocketLoss,
      nightRides: state.nightRides,
      expressRides: state.expressRides,
      favoriteStation: state.favoriteStation,
      stationVisits: { ...state.stationVisits },
      eventsSeen: { ...state.eventsSeen },
      itemsBought: { ...state.itemsBought },
      hasMap: state.hasMap,
      lastRideDay: state.lastRideDay,
      lostFound: state.lostFound.map((x) => ({ ...x })),
      souvenirs: [...state.souvenirs],
      coffeeSub: state.coffeeSub ? { ...state.coffeeSub } : null,
    };
  }

  function deserialize(saved) {
    const s = saved || {};
    state.tickets = Math.floor(Number(s.tickets) || 0);
    state.pass = s.pass && typeof s.pass.id === 'string' ? { ...s.pass } : null;
    state.rep = Math.floor(Number(s.rep) || 0);
    state.rides = Math.floor(Number(s.rides) || 0);
    state.totalSpent = Number(s.totalSpent) || 0;
    state.finesPaid = Number(s.finesPaid) || 0;
    state.currentStation = typeof s.currentStation === 'string' ? s.currentStation : 'central';
    state.courierDone = Math.floor(Number(s.courierDone) || 0);
    state.courierFailed = Math.floor(Number(s.courierFailed) || 0);
    state.inspectorStrikes = Math.floor(Number(s.inspectorStrikes) || 0);
    state.pickpocketLoss = Number(s.pickpocketLoss) || 0;
    state.nightRides = Math.floor(Number(s.nightRides) || 0);
    state.expressRides = Math.floor(Number(s.expressRides) || 0);
    state.favoriteStation = s.favoriteStation || null;
    state.stationVisits = s.stationVisits && typeof s.stationVisits === 'object' ? { ...s.stationVisits } : {};
    state.eventsSeen = s.eventsSeen && typeof s.eventsSeen === 'object' ? { ...s.eventsSeen } : {};
    state.itemsBought = s.itemsBought && typeof s.itemsBought === 'object' ? { ...s.itemsBought } : {};
    state.hasMap = s.hasMap === true;
    state.lastRideDay = Math.floor(Number(s.lastRideDay) || 0);
    state.lostFound = Array.isArray(s.lostFound) ? s.lostFound.map((x) => ({ ...x })) : [];
    state.souvenirs = Array.isArray(s.souvenirs) ? [...s.souvenirs] : [];
    state.coffeeSub = s.coffeeSub ? { ...s.coffeeSub } : null;
    state.onTrain = false;
    state.riding = null;
    state.courier = null;
    state.shift = null;
    return { ok: true };
  }

  function checkSchedule(stationId) {
    const st = stationById(stationId);
    if (!st) return { ok: false, reason: 'unknown-station' };
    const nextIn = Math.round((1 - state.train.progress) * 60 + state.train.delay);
    return { ok: true, stationId, line: st.line, nextTrainIn: nextIn, delayed: state.train.delay > 0, trainAt: state.train.atStation };
  }

  function transferLines(lineId) {
    const line = lineById(lineId);
    if (!line) return { ok: false, reason: 'unknown-line' };
    const st = stationById(state.currentStation);
    if (!st || !st.transfer.includes(lineId)) return { ok: false, reason: 'no-transfer' };
    if (lineId === 'express' && !passCoversExpress() && repTier() < 3) return { ok: false, reason: 'express-locked' };
    state.train.line = lineId;
    return { ok: true, line: lineId, stationId: state.currentStation };
  }

  function findLostItem() {
    if (rnd() < 0.6) return { ok: false, reason: 'nothing-found' };
    const item = LOST_ITEMS[Math.floor(rnd() * LOST_ITEMS.length)];
    state.lostFound.push({ ...item });
    return { ok: true, itemId: item.id, value: item.value };
  }

  function handInLostItem(itemId) {
    const item = LOST_ITEMS.find((i) => i.id === itemId);
    if (!item) return { ok: false, reason: 'unknown-item' };
    const idx = state.lostFound.findIndex((x) => x.id === itemId);
    if (idx < 0) return { ok: false, reason: 'not-found' };
    state.lostFound.splice(idx, 1);
    const reward = Math.round(item.value / 2);
    moveCash(reward);
    state.rep += 2;
    return { ok: true, reward, rep: 2 };
  }

  function keepLostItem(itemId) {
    const item = LOST_ITEMS.find((i) => i.id === itemId);
    if (!item) return { ok: false, reason: 'unknown-item' };
    const idx = state.lostFound.findIndex((x) => x.id === itemId);
    if (idx < 0) return { ok: false, reason: 'not-found' };
    state.lostFound.splice(idx, 1);
    moveCash(item.value);
    state.rep = Math.max(0, state.rep - 3);
    pushHeat(5);
    return { ok: true, value: item.value };
  }

  function busk(songId, minutes) {
    const song = BUSKER_SONGS.find((s) => s.id === songId);
    if (!song) return { ok: false, reason: 'unknown-song' };
    const mins = minutes === undefined || minutes === null ? 5 : minutes;
    const st = stationById(state.currentStation);
    const crowd = st ? st.busy * 20 : 10;
    const skill = 0.4 + repTier() * 0.1 + state.rides * 0.001;
    const earned = Math.round(crowd * skill * mins * 0.5 + rnd());
    moveCash(earned);
    state.rep += 1;
    return { ok: true, earned, songId, stationId: state.currentStation };
  }

  function buySouvenir(souvenirId) {
    const item = SOUVENIRS.find((s) => s.id === souvenirId);
    if (!item) return { ok: false, reason: 'unknown-souvenir' };
    if (cashOf() < item.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-item.price);
    state.souvenirs.push(souvenirId);
    return { ok: true, souvenirId, price: item.price };
  }

  function buyCoffeeSubscription() {
    if (cashOf() < 30) return { ok: false, reason: 'not-enough-cash' };
    if (state.coffeeSub && dayOf() <= state.coffeeSub.expiryDay) return { ok: false, reason: 'already-active' };
    moveCash(-30);
    state.coffeeSub = { expiryDay: dayOf() + 6 };
    return { ok: true, expiryDay: state.coffeeSub.expiryDay, price: 30 };
  }

  function helpTourist() {
    if (rnd() < 0.5) {
      const tip = 5 + Math.floor(rnd() * 15);
      moveCash(tip);
      state.rep += 2;
      return { ok: true, tip };
    }
    state.rep += 1;
    return { ok: true, tip: 0 };
  }

  function nightRideBonus() {
    if (!isNight()) return { ok: false, reason: 'not-night' };
    if (state.nightRides <= 0) return { ok: false, reason: 'no-night-rides' };
    const bonus = state.nightRides * 2;
    moveCash(bonus);
    return { ok: true, bonus };
  }

  return {
    name: 'Subway',
    state,
    buyTicket,
    buyPass,
    boardTrain,
    arrive,
    offerJobs,
    takeCourierJob,
    completeCourier,
    startShift,
    buyShopItem,
    dodgeInspector,
    reportPickpocket,
    tick,
    tickDay,
    interact,
    hudLine,
    stats,
    serialize,
    deserialize,
    checkSchedule,
    transferLines,
    findLostItem,
    handInLostItem,
    keepLostItem,
    busk,
    buySouvenir,
    buyCoffeeSubscription,
    helpTourist,
    nightRideBonus,
  };
}
