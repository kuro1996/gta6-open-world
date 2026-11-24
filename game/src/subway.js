// Solara Metro — subway fast travel, fares, passes and metro jobs.
// Round 7, all-new system. Two lines (Red / Blue), six stations, a live
// train that actually runs the tunnels: buy a ticket or a weekly pass,
// ride between stations, take courier shifts, dodge fare inspectors and
// pickpockets, and keep the metro's own reputation (Metro Rep) high to
// unlock the express line and the night service.
export const SUBWAY_LINES = [
  { id: 'red', name: 'Red Line', color: '#e5484d', express: false, nightService: false, baseFare: 4 },
  { id: 'blue', name: 'Blue Line', color: '#3e8ef7', express: false, nightService: false, baseFare: 5 },
  { id: 'express', name: 'Express Line', color: '#f5a524', express: true, nightService: true, baseFare: 12 },
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

export const SUBWAY_FARES = {
  single: 4,
  transfer: 2,
  expressSurcharge: 8,
  inspectorFine: 60,
  nightSurcharge: 6,
};

export const SUBWAY_SHOP_ITEMS = [
  { id: 'coffee', name: 'Metro Coffee', price: 3, effect: 'energy +10 for 1h' },
  { id: 'newspaper', name: 'Solara Times', price: 2, effect: 'rumor: next delay revealed' },
  { id: 'snack', name: 'Station Snack', price: 4, effect: 'hunger handled, +5 stamina' },
  { id: 'umbrella', name: 'Cheap Umbrella', price: 8, effect: 'rain-proof until tomorrow' },
  { id: 'map', name: 'Metro Map', price: 1, effect: 'unlocks all station names on HUD' },
  { id: 'charger', name: 'Phone Charger', price: 12, effect: 'calls never drop for a day' },
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
  { id: 'busker', name: 'Busker', text: 'A busker plays a killer set. The crowd tips generously.', good: true },
  { id: 'delay', name: 'Signal Failure', text: 'Signal failure! The next train is delayed 3 minutes.', good: false },
  { id: 'inspector', name: 'Fare Inspector', text: 'A fare inspector boards and checks tickets.', good: false },
  { id: 'pickpocket', name: 'Pickpocket', text: 'Someone bumps into you — your pocket feels lighter.', good: false },
  { id: 'celebrity', name: 'Celebrity Sighting', text: 'A film star rides the metro! Fans go wild.', good: true },
  { id: 'lost-item', name: 'Lost Item', text: 'You spot a lost wallet on the seat.', good: true },
  { id: 'blackout', name: 'Tunnel Blackout', text: 'Lights flicker out in the tunnel. Eerie silence.', good: false },
  { id: 'flash-mob', name: 'Flash Mob', text: 'A flash mob dances through the carriage!', good: true },
];

export const SUBWAY_REP_TIERS = [
  { rep: 0, name: 'Fare Dodger', perks: [] },
  { rep: 20, name: 'Regular Rider', perks: ['10% fare discount'] },
  { rep: 50, name: 'Metro Loyalist', perks: ['20% fare discount', 'priority boarding'] },
  { rep: 100, name: 'Metro Legend', perks: ['30% fare discount', 'express unlocked', 'free coffee'] },
];

export function subwayDistance(a, b) {
  const sa = SUBWAY_STATIONS.find((s) => s.id === a);
  const sb = SUBWAY_STATIONS.find((s) => s.id === b);
  if (!sa || !sb) return 0;
  return Math.hypot(sa.x - sb.x, sa.z - sb.z);
}

export function subwayFare(fromId, toId, opts = {}) {
  const from = SUBWAY_STATIONS.find((s) => s.id === fromId);
  const to = SUBWAY_STATIONS.find((s) => s.id === toId);
  if (!from || !to) return null;
  const sameLine = from.line === to.line;
  let fare = SUBWAY_FARES.single;
  if (!sameLine) fare += SUBWAY_FARES.transfer;
  if (to.line === 'express' || from.line === 'express') fare += SUBWAY_FARES.expressSurcharge;
  if (opts.night) fare += SUBWAY_FARES.nightSurcharge;
  if (opts.repTier >= 1) fare = Math.max(1, Math.round(fare * (1 - 0.1 * opts.repTier)));
  return fare;
}

export function subwayRepTier(rep) {
  let tier = 0;
  for (let i = 0; i < SUBWAY_REP_TIERS.length; i++) {
    if (rep >= SUBWAY_REP_TIERS[i].rep) tier = i;
  }
  return tier;
}

export function createSubwaySystem(deps = {}) {
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
    tickets: 0,
    pass: null, // { id, expiresDay }
    rep: 0,
    rides: 0,
    totalSpent: 0,
    finesPaid: 0,
    currentStation: 'central',
    onTrain: false,
    train: { line: 'red', atStation: 'central', nextStation: 'harbor', progress: 0, direction: 1, delay: 0, speed: 1 },
    riding: null, // { from, to, line, timeLeft, fare }
    courier: null, // active courier job
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
    shift: null, // metro courier shift { jobsLeft, bonus }
    lastRideDay: 0,
    lostFound: [],
    souvenirs: [],
    coffeeSub: null,
  };

  function repTier() { return subwayRepTier(state.rep); }
  function tierName() { return SUBWAY_REP_TIERS[repTier()].name; }
  function hasValidPass() {
    if (!state.pass) return false;
    return getDay() <= state.pass.expiresDay;
  }
  function passCoversExpress() {
    return state.pass && state.pass.id === 'gold' && hasValidPass();
  }
  function fareFor(fromId, toId) {
    const hour = getHour();
    const night = hour >= 23 || hour < 5;
    let fare = subwayFare(fromId, toId, { night, repTier: repTier() });
    if (fare === null) return null;
    if (hasValidPass()) fare = 0;
    return fare;
  }
  function nearestStation(maxDist = 16) {
    const p = getPlayerPos();
    let best = null;
    let bestD = Infinity;
    for (const s of SUBWAY_STATIONS) {
      const d = Math.hypot(s.x - p.x, s.z - p.z);
      if (d < bestD) { bestD = d; best = s; }
    }
    return bestD <= maxDist ? { station: best, dist: bestD } : null;
  }
  function visitStation(id) {
    state.stationVisits[id] = (state.stationVisits[id] || 0) + 1;
    let top = null;
    let topN = 0;
    for (const [k, v] of Object.entries(state.stationVisits)) {
      if (v > topN) { topN = v; top = k; }
    }
    state.favoriteStation = top;
  }
  function maybeEvent() {
    const roll = rng();
    if (roll > 0.34) return null;
    const ev = SUBWAY_EVENTS[Math.floor(rng() * SUBWAY_EVENTS.length)];
    state.eventsSeen[ev.id] = (state.eventsSeen[ev.id] || 0) + 1;
    return ev;
  }
  function applyEvent(ev) {
    if (!ev) return null;
    switch (ev.id) {
      case 'pickpocket': {
        const loss = Math.min(getCash(), 5 + Math.floor(rng() * 20));
        if (loss > 0) { addCash(-loss); state.pickpocketLoss += loss; }
        log(`Pickpocket on the metro! Lost $${loss}.`);
        return { event: ev.id, loss };
      }
      case 'lost-item': {
        const found = 10 + Math.floor(rng() * 40);
        addCash(found);
        log(`Found a lost wallet on the metro seat: +$${found}.`);
        return { event: ev.id, found };
      }
      case 'inspector': {
        if (hasValidPass()) { log('Fare inspector checks your pass — all good.'); return { event: ev.id, fined: false }; }
        if (state.tickets > 0) { state.tickets -= 1; log('Fare inspector checks your ticket — valid.'); return { event: ev.id, fined: false }; }
        const fine = SUBWAY_FARES.inspectorFine;
        if (getCash() >= fine) {
          addCash(-fine);
          state.finesPaid += fine;
          state.inspectorStrikes += 1;
          state.rep = Math.max(0, state.rep - 5);
          log(`Fare inspector caught you without a ticket! Fine $${fine}.`);
          return { event: ev.id, fined: true, fine };
        }
        state.inspectorStrikes += 1;
        addHeat(15);
        state.rep = Math.max(0, state.rep - 10);
        log('No ticket, no cash for the fine — the inspector calls transit police!');
        return { event: ev.id, fined: true, fine: 0, heat: 15 };
      }
      case 'delay': {
        state.train.delay = 120 + Math.floor(rng() * 120);
        log('Signal failure — the next train is delayed.');
        return { event: ev.id, delay: state.train.delay };
      }
      case 'celebrity': {
        state.rep += 2;
        log('A film star rides your carriage! Metro Rep +2.');
        return { event: ev.id, rep: 2 };
      }
      case 'busker': {
        const tip = 3 + Math.floor(rng() * 12);
        addCash(tip);
        log(`A busker plays your favorite tune. A stranger tips you $${tip}.`);
        return { event: ev.id, tip };
      }
      case 'flash-mob': {
        state.rep += 3;
        log('Flash mob on the train! Metro Rep +3.');
        return { event: ev.id, rep: 3 };
      }
      case 'blackout': {
        state.rep = Math.max(0, state.rep - 1);
        log('Tunnel blackout — the lights die for a long minute.');
        return { event: ev.id };
      }
      default:
        return { event: ev.id };
    }
  }

  function buyTicket(count = 1) {
    const price = SUBWAY_FARES.single * count;
    if (getCash() < price) return { ok: false, reason: 'no-cash', need: price };
    addCash(-price);
    state.tickets += count;
    state.totalSpent += price;
    log(`Bought ${count} metro ticket${count > 1 ? 's' : ''} for $${price}.`);
    return { ok: true, tickets: state.tickets, price };
  }

  function buyPass(passId) {
    const pass = SUBWAY_PASSES.find((p) => p.id === passId);
    if (!pass) return { ok: false, reason: 'no-such-pass' };
    if (getCash() < pass.price) return { ok: false, reason: 'no-cash', need: pass.price };
    if (hasValidPass() && state.pass.id === passId) return { ok: false, reason: 'already-active' };
    addCash(-pass.price);
    state.pass = { id: pass.id, expiresDay: getDay() + pass.days - 1 };
    state.totalSpent += pass.price;
    log(`Bought ${pass.name} for $${pass.price} — valid until day ${state.pass.expiresDay}.`);
    return { ok: true, pass: state.pass, price: pass.price };
  }

  function boardTrain(toId) {
    if (state.onTrain) return { ok: false, reason: 'already-riding' };
    const from = SUBWAY_STATIONS.find((s) => s.id === state.currentStation);
    const to = SUBWAY_STATIONS.find((s) => s.id === toId);
    if (!to) return { ok: false, reason: 'no-such-station' };
    if (toId === state.currentStation) return { ok: false, reason: 'already-there' };
    const hour = getHour();
    const night = hour >= 23 || hour < 5;
    if (night && to.line === 'express' && !passCoversExpress() && repTier() < 3) {
      return { ok: false, reason: 'express-locked', need: 'Gold pass or Metro Legend' };
    }
    if (night && from.line !== 'express' && to.line !== 'express') {
      const line = SUBWAY_LINES.find((l) => l.id === from.line);
      if (!line.nightService) return { ok: false, reason: 'no-night-service' };
    }
    const fare = fareFor(state.currentStation, toId);
    if (fare === null) return { ok: false, reason: 'no-route' };
    if (fare > 0) {
      if (state.tickets > 0) {
        state.tickets -= 1;
      } else if (getCash() >= fare) {
        addCash(-fare);
        state.totalSpent += fare;
      } else {
        return { ok: false, reason: 'no-ticket-or-cash', need: fare };
      }
    }
    const dist = subwayDistance(state.currentStation, toId);
    const rideTime = 6 + dist / 28 + (state.train.delay > 0 ? state.train.delay / 60 : 0);
    state.riding = { from: state.currentStation, to: toId, line: to.line, timeLeft: rideTime, fare, startedDay: getDay() };
    state.onTrain = true;
    if (to.line === 'express') state.expressRides += 1;
    if (night) state.nightRides += 1;
    log(`Boarded the ${to.line === 'express' ? 'Express' : to.line} train to ${to.name}.`);
    return { ok: true, ride: { ...state.riding }, fare };
  }

  function arrive() {
    if (!state.riding) return null;
    const dest = state.riding.to;
    const station = SUBWAY_STATIONS.find((s) => s.id === dest);
    state.currentStation = dest;
    state.onTrain = false;
    state.riding = null;
    state.rides += 1;
    state.rep += 1;
    state.lastRideDay = getDay();
    visitStation(dest);
    log(`Arrived at ${station.name}. Metro Rep +1.`);
    const ev = maybeEvent();
    const applied = ev ? applyEvent(ev) : null;
    // Courier delivery check: arriving at the job destination completes it.
    let courierResult = null;
    if (state.courier && state.courier.to === dest) {
      courierResult = completeCourier(true);
    } else if (state.courier && state.courier.timeLeft <= 0) {
      courierResult = completeCourier(false);
    }
    return { station: dest, event: applied, courier: courierResult };
  }

  function offerJobs() {
    const here = state.currentStation;
    const pool = SUBWAY_COURIER_JOBS.filter((j) => j.from === here);
    const extra = SUBWAY_COURIER_JOBS.filter((j) => j.from !== here);
    const picks = [...pool];
    while (picks.length < 3 && extra.length > 0) {
      const idx = Math.floor(rng() * extra.length);
      picks.push(extra.splice(idx, 1)[0]);
    }
    state.jobsOffered = picks.slice(0, 3).map((j) => j.id);
    return picks.slice(0, 3);
  }

  function takeCourierJob(jobId) {
    if (state.courier) return { ok: false, reason: 'job-active' };
    const job = SUBWAY_COURIER_JOBS.find((j) => j.id === jobId);
    if (!job) return { ok: false, reason: 'no-such-job' };
    const heavy = job.weight === 'heavy';
    const pay = job.pay + (state.shift ? state.shift.bonus : 0);
    state.courier = { ...job, pay, timeLeft: job.deadlineMin * 60, heavy, startedDay: getDay() };
    log(`Courier job accepted: ${job.name} — $${pay} if you arrive in ${job.deadlineMin} min.`);
    return { ok: true, job: { ...state.courier } };
  }

  function completeCourier(onTime) {
    if (!state.courier) return null;
    const job = state.courier;
    state.courier = null;
    if (!onTime) {
      state.courierFailed += 1;
      state.rep = Math.max(0, state.rep - 4);
      log(`Courier job failed — ${job.name} arrived too late. Rep -4.`);
      return { ok: false, reason: 'late', job: job.id };
    }
    const tip = Math.floor(rng() * 15);
    const total = job.pay + tip;
    addCash(total);
    state.courierDone += 1;
    state.rep += 3;
    if (state.shift) {
      state.shift.jobsLeft -= 1;
      if (state.shift.jobsLeft <= 0) {
        const shiftBonus = 60 + state.shift.jobsDone * 10;
        addCash(shiftBonus);
        log(`Metro courier shift complete! Shift bonus $${shiftBonus}.`);
        state.shift = null;
        return { ok: true, pay: total, tip, shiftBonus, job: job.id };
      }
    }
    log(`Courier delivered: ${job.name} — $${total} (incl. $${tip} tip). Rep +3.`);
    return { ok: true, pay: total, tip, job: job.id };
  }

  function startShift() {
    if (state.shift) return { ok: false, reason: 'shift-active' };
    if (state.rep < 10) return { ok: false, reason: 'rep-too-low', need: 10 };
    const jobs = 3 + Math.floor(rng() * 3);
    state.shift = { jobsLeft: jobs, jobsDone: 0, bonus: 10, startedDay: getDay() };
    log(`Metro courier shift started — ${jobs} deliveries, +$10 per job.`);
    return { ok: true, shift: { ...state.shift } };
  }

  function buyShopItem(itemId) {
    const item = SUBWAY_SHOP_ITEMS.find((i) => i.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (getCash() < item.price) return { ok: false, reason: 'no-cash', need: item.price };
    addCash(-item.price);
    state.itemsBought[itemId] = (state.itemsBought[itemId] || 0) + 1;
    state.totalSpent += item.price;
    if (itemId === 'map') state.hasMap = true;
    log(`Bought ${item.name} for $${item.price}. ${item.effect}.`);
    return { ok: true, item: item.id, price: item.price };
  }

  function dodgeInspector() {
    if (state.inspectorStrikes <= 0) return { ok: false, reason: 'no-inspector' };
    if (rng() < 0.55) {
      state.inspectorStrikes = Math.max(0, state.inspectorStrikes - 1);
      state.rep += 1;
      log('You slipped past the inspector at the next stop. Rep +1.');
      return { ok: true, dodged: true };
    }
    addHeat(10);
    log('The inspector caught you dodging — transit police alerted!');
    return { ok: true, dodged: false, heat: 10 };
  }

  function reportPickpocket() {
    if (state.pickpocketLoss <= 0) return { ok: false, reason: 'nothing-to-report' };
    const recovered = Math.floor(state.pickpocketLoss * 0.4);
    addCash(recovered);
    state.pickpocketLoss = 0;
    state.rep += 2;
    log(`Transit police recovered $${recovered} of your stolen cash. Rep +2.`);
    return { ok: true, recovered };
  }

  function tick(dt) {
    // The live train crawls its line: progress 0..1 between stations,
    // then it dwells, picks the next station and rolls on.
    const train = state.train;
    if (train.delay > 0) {
      train.delay = Math.max(0, train.delay - dt);
    } else {
      train.progress += dt * 0.02 * (1 + repTier() * 0.05);
      if (train.progress >= 1) {
        train.progress = 0;
        const lineStations = SUBWAY_STATIONS.filter((s) => s.line === train.line);
        const idx = lineStations.findIndex((s) => s.id === train.atStation);
        let nextIdx = idx + train.direction;
        if (nextIdx >= lineStations.length || nextIdx < 0) {
          train.direction *= -1;
          nextIdx = idx + train.direction;
        }
        train.atStation = lineStations[nextIdx].id;
        train.nextStation = lineStations[Math.min(lineStations.length - 1, Math.max(0, nextIdx + train.direction))].id;
        if (rng() < 0.08) {
          train.delay = 45 + Math.floor(rng() * 90);
        }
      }
    }
    // Riding: the clock ticks down; arrival is automatic.
    if (state.onTrain && state.riding) {
      state.riding.timeLeft -= dt;
      if (state.riding.timeLeft <= 0) arrive();
    }
    // Courier deadline ticks in real seconds while a job is active.
    if (state.courier) {
      state.courier.timeLeft -= dt;
      if (state.courier.timeLeft <= 0) {
        completeCourier(false);
      }
    }
    // A shift left overnight expires at dawn.
    if (state.shift && getDay() !== state.shift.startedDay && getHour() < 6) {
      log('Metro courier shift expired overnight.');
      state.shift = null;
    }
    // A pass that expired yesterday is quietly dropped from the wallet.
    if (state.pass && getDay() > state.pass.expiresDay + 1) {
      state.pass = null;
    }
  }

  function tickDay(day) {
    if (state.lastDelayDay !== day && rng() < 0.5) {
      state.lastDelayDay = day;
      state.train.delay = 60 + Math.floor(rng() * 180);
      log('Metro control reports signal works today — expect delays.');
    }
    // Weekly pass holders get a loyalty bump each Monday (day % 7 === 1).
    if (day % 7 === 1 && hasValidPass()) {
      state.rep += 2;
    }
    // Courier demand resets; fresh jobs appear at every station.
    state.jobsOffered = [];
    return { day, delay: state.train.delay, rep: state.rep };
  }

  function interact() {
    const near = nearestStation(16);
    if (!near) return false;
    // Standing on a platform: if a ride is already running, E does nothing
    // (the train arrives on its own); otherwise open the station by riding
    // to the next station on the same line, or start a courier shift.
    if (state.onTrain) return false;
    if (state.currentStation !== near.station.id) {
      state.currentStation = near.station.id;
      visitStation(near.station.id);
      log(`You are at ${near.station.name} (${near.station.line} line).`);
    }
    if (!state.courier && state.rep >= 10 && rng() < 0.4) {
      const jobs = offerJobs();
      if (jobs.length > 0) {
        const job = jobs[0];
        return takeCourierJob(job.id).ok;
      }
    }
    // Default: ride one hop along the line to the next station.
    const lineStations = SUBWAY_STATIONS.filter((s) => s.line === near.station.line);
    const idx = lineStations.findIndex((s) => s.id === near.station.id);
    const next = lineStations[(idx + 1) % lineStations.length];
    const res = boardTrain(next.id);
    if (!res.ok) {
      log(`Metro: ${res.reason}${res.need ? ` (need ${res.need})` : ''}.`);
      return true;
    }
    return true;
  }

  function hudLine() {
    if (state.onTrain && state.riding) {
      const dest = SUBWAY_STATIONS.find((s) => s.id === state.riding.to);
      return `METRO → ${dest ? dest.name : state.riding.to} ${Math.max(0, Math.ceil(state.riding.timeLeft))}s`;
    }
    if (state.courier) {
      const dest = SUBWAY_STATIONS.find((s) => s.id === state.courier.to);
      return `COURIER → ${dest ? dest.name : state.courier.to} $${state.courier.pay} ${Math.max(0, Math.ceil(state.courier.timeLeft))}s`;
    }
    const near = nearestStation(16);
    if (near) return `METRO ${near.station.name} — tickets ${state.tickets} · Rep ${state.rep} (${tierName()})`;
    if (state.pass) return `METRO pass ${state.pass.id} until day ${state.pass.expiresDay}`;
    return '';
  }

  function stats() {
    return {
      tickets: state.tickets,
      pass: state.pass ? state.pass.id : null,
      passExpiresDay: state.pass ? state.pass.expiresDay : null,
      rep: state.rep,
      tier: tierName(),
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
      pass: state.pass,
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
      lostFound: [...state.lostFound],
      souvenirs: [...state.souvenirs],
      coffeeSub: state.coffeeSub ? { ...state.coffeeSub } : null,
    };
  }

  function deserialize(d) {
    if (!d) return;
    state.tickets = d.tickets ?? 0;
    state.pass = d.pass ?? null;
    state.rep = d.rep ?? 0;
    state.rides = d.rides ?? 0;
    state.totalSpent = d.totalSpent ?? 0;
    state.finesPaid = d.finesPaid ?? 0;
    state.currentStation = d.currentStation ?? 'central';
    state.courierDone = d.courierDone ?? 0;
    state.courierFailed = d.courierFailed ?? 0;
    state.inspectorStrikes = d.inspectorStrikes ?? 0;
    state.pickpocketLoss = d.pickpocketLoss ?? 0;
    state.nightRides = d.nightRides ?? 0;
    state.expressRides = d.expressRides ?? 0;
    state.favoriteStation = d.favoriteStation ?? null;
    state.stationVisits = { ...(d.stationVisits || {}) };
    state.eventsSeen = { ...(d.eventsSeen || {}) };
    state.itemsBought = { ...(d.itemsBought || {}) };
    state.hasMap = !!d.hasMap;
    state.lastRideDay = d.lastRideDay ?? 0;
    state.lostFound = [...(d.lostFound || [])];
    state.souvenirs = [...(d.souvenirs || [])];
    state.coffeeSub = d.coffeeSub ? { ...d.coffeeSub } : null;
    state.onTrain = false;
    state.riding = null;
    state.courier = null;
    state.shift = null;
  }

  // --- Round 7 top-up: lost & found, busking, souvenirs, transfers ---
  const SUBWAY_LOST_ITEMS = [
    { id: 'umbrella-lost', name: 'Lost Umbrella', value: 8 },
    { id: 'wallet-lost', name: 'Lost Wallet', value: 45 },
    { id: 'phone-lost', name: 'Lost Phone', value: 120 },
    { id: 'guitar-lost', name: 'Lost Guitar', value: 200 },
    { id: 'briefcase', name: 'Lost Briefcase', value: 90 },
    { id: 'backpack', name: 'Lost Backpack', value: 35 },
  ];
  const SUBWAY_SOUVENIRS = [
    { id: 'metro-mug', name: 'Metro Mug', price: 12 },
    { id: 'metro-cap', name: 'Metro Cap', price: 18 },
    { id: 'metro-model', name: 'Model Train', price: 45 },
    { id: 'metro-poster', name: 'Vintage Poster', price: 25 },
  ];
  const SUBWAY_BUSKER_SONGS = [
    { id: 'blues', name: 'Harbor Blues', difficulty: 1 },
    { id: 'jazz', name: 'Midnight Jazz', difficulty: 2 },
    { id: 'rock', name: 'Subway Rock', difficulty: 2 },
    { id: 'classical', name: 'Tunnel Sonata', difficulty: 3 },
  ];
  function checkSchedule(stationId) {
    const station = SUBWAY_STATIONS.find((s) => s.id === stationId);
    if (!station) return { ok: false, reason: 'no-such-station' };
    const train = state.train;
    const nextIn = Math.max(0, Math.round((1 - train.progress) * 50));
    return {
      ok: true, station: station.id, line: station.line,
      nextTrainIn: nextIn + Math.round(train.delay),
      delayed: train.delay > 0, atStation: train.atStation,
    };
  }
  function transferLines(toLine) {
    const line = SUBWAY_LINES.find((l) => l.id === toLine);
    if (!line) return { ok: false, reason: 'no-such-line' };
    const station = SUBWAY_STATIONS.find((s) => s.id === state.currentStation);
    if (!station || !station.transfer.includes(toLine)) {
      return { ok: false, reason: 'no-transfer-here', station: state.currentStation };
    }
    if (toLine === 'express' && !passCoversExpress() && repTier() < 3) {
      return { ok: false, reason: 'express-locked' };
    }
    state.train.line = toLine;
    log(`Transferred to the ${line.name} at ${station.name}.`);
    return { ok: true, line: toLine, station: station.id };
  }
  function findLostItem() {
    const roll = rng();
    if (roll > 0.4) return { ok: false, reason: 'nothing-found' };
    const item = SUBWAY_LOST_ITEMS[Math.floor(rng() * SUBWAY_LOST_ITEMS.length)];
    state.lostFound = state.lostFound || [];
    state.lostFound.push(item.id);
    log(`You found a ${item.name} left on the train! Hand it in for a reward, or keep it...`);
    return { ok: true, item: item.id, value: item.value };
  }
  function handInLostItem(itemId) {
    const item = SUBWAY_LOST_ITEMS.find((i) => i.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (!state.lostFound || !state.lostFound.includes(itemId)) return { ok: false, reason: 'not-found' };
    state.lostFound = state.lostFound.filter((x) => x !== itemId);
    const reward = Math.round(item.value * 0.5);
    addCash(reward);
    state.rep += 2;
    log(`Handed in the ${item.name}. Reward $${reward}, Rep +2. Honesty pays.`);
    return { ok: true, reward, rep: state.rep };
  }
  function keepLostItem(itemId) {
    const item = SUBWAY_LOST_ITEMS.find((i) => i.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (!state.lostFound || !state.lostFound.includes(itemId)) return { ok: false, reason: 'not-found' };
    state.lostFound = state.lostFound.filter((x) => x !== itemId);
    addCash(item.value);
    state.rep = Math.max(0, state.rep - 3);
    addHeat(5);
    log(`Kept the ${item.name} and sold it for $${item.value}. Rep -3, heat +5.`);
    return { ok: true, value: item.value };
  }
  function busk(songId, minutes = 5) {
    const song = SUBWAY_BUSKER_SONGS.find((s) => s.id === songId);
    if (!song) return { ok: false, reason: 'no-such-song' };
    const station = SUBWAY_STATIONS.find((s) => s.id === state.currentStation);
    const crowd = Math.round(station.busy * 20);
    const skill = 0.4 + repTier() * 0.1 + state.rides * 0.001;
    const earned = Math.round(crowd * skill * minutes * (0.5 + rng()));
    addCash(earned);
    state.rep += 1;
    state.totalSpent -= 0;
    log(`Busking ${song.name} at ${station.name} for ${minutes} min — $${earned} in the hat! Rep +1.`);
    return { ok: true, earned, song: songId, station: station.id };
  }
  function buySouvenir(souvId) {
    const item = SUBWAY_SOUVENIRS.find((s) => s.id === souvId);
    if (!item) return { ok: false, reason: 'no-such-souvenir' };
    if (getCash() < item.price) return { ok: false, reason: 'no-cash', need: item.price };
    addCash(-item.price);
    state.souvenirs = state.souvenirs || [];
    state.souvenirs.push(souvId);
    state.totalSpent += item.price;
    log(`Bought ${item.name} for $${item.price} at the metro gift shop.`);
    return { ok: true, souvenir: souvId, price: item.price };
  }
  function buyCoffeeSubscription() {
    const price = 30;
    if (getCash() < price) return { ok: false, reason: 'no-cash', need: price };
    if (state.coffeeSub && getDay() <= state.coffeeSub.expiresDay) return { ok: false, reason: 'already-active' };
    addCash(-price);
    state.coffeeSub = { expiresDay: getDay() + 6 };
    state.totalSpent += price;
    log('Metro coffee subscription: free coffee at every station for 7 days!');
    return { ok: true, expiresDay: state.coffeeSub.expiresDay, price };
  }
  function helpTourist() {
    const station = SUBWAY_STATIONS.find((s) => s.id === state.currentStation);
    if (rng() < 0.5) {
      const tip = 5 + Math.floor(rng() * 15);
      addCash(tip);
      state.rep += 2;
      log(`Helped a lost tourist at ${station.name}. They tip $${tip}. Rep +2.`);
      return { ok: true, tip };
    }
    state.rep += 1;
    log(`Helped a tourist find the ${station.line} line. Rep +1.`);
    return { ok: true, tip: 0 };
  }
  function nightRideBonus() {
    const hour = getHour();
    if (hour < 23 && hour >= 5) return { ok: false, reason: 'not-night' };
    if (state.nightRides <= 0) return { ok: false, reason: 'no-night-rides' };
    const bonus = state.nightRides * 2;
    addCash(bonus);
    log(`Night Owl bonus: $${bonus} for riding the metro after dark.`);
    return { ok: true, bonus };
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
    nearestStation,
    fareFor,
    hasValidPass,
    repTier,
    tierName,
    visitStation,
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
