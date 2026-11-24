export const FIRE_STATION = { id: 'station-7', name: 'Station 7', x: -60, z: 80, district: 'Downtown' };

export const FIRE_TYPES = [
  { id: 'kitchen', name: 'Kitchen Fire', baseIntensity: 30, spread: 0.4, smoke: 0.5, pay: 120, civilians: 1 },
  { id: 'car', name: 'Car Fire', baseIntensity: 25, spread: 0.3, smoke: 0.4, pay: 100, civilians: 0 },
  { id: 'warehouse', name: 'Warehouse Fire', baseIntensity: 70, spread: 0.8, smoke: 0.9, pay: 320, civilians: 2 },
  { id: 'apartment', name: 'Apartment Fire', baseIntensity: 55, spread: 0.6, smoke: 0.8, pay: 260, civilians: 3 },
  { id: 'forest', name: 'Brush Fire', baseIntensity: 45, spread: 1.0, smoke: 0.6, pay: 200, civilians: 0 },
  { id: 'gas', name: 'Gas Fire', baseIntensity: 85, spread: 0.5, smoke: 1.0, pay: 450, civilians: 2 },
  { id: 'electrical', name: 'Electrical Fire', baseIntensity: 35, spread: 0.35, smoke: 0.7, pay: 150, civilians: 1 },
  { id: 'dumpster', name: 'Dumpster Fire', baseIntensity: 15, spread: 0.15, smoke: 0.3, pay: 60, civilians: 0 },
];

export const FIRE_LOCATIONS = [
  { id: 'diner', name: "Ria's Diner", x: 40, z: 30, district: 'Downtown' },
  { id: 'garage', name: 'Voss Garage', x: 140, z: -90, district: 'Industrial' },
  { id: 'apartments', name: 'Palm Court Apartments', x: -100, z: -60, district: 'Northside' },
  { id: 'warehouse', name: 'Harbor Warehouse 9', x: -180, z: 120, district: 'Harbor' },
  { id: 'gas', name: 'FuelMax Station', x: 90, z: 150, district: 'Marina' },
  { id: 'mall', name: 'Solara Mall', x: 20, z: -140, district: 'Downtown' },
  { id: 'school', name: 'Northside High', x: -130, z: -170, district: 'Northside' },
  { id: 'park', name: 'Palm Grove Park', x: -40, z: 190, district: 'Campus' },
  { id: 'hotel', name: 'Grand Solara Hotel', x: 160, z: 60, district: 'Marina' },
  { id: 'factory', name: 'Crown Textile Factory', x: 200, z: -60, district: 'Industrial' },
];

export const FIRE_RANKS = [
  { rank: 0, name: 'Probie', callsNeeded: 0, payMult: 1.0, hosePower: 1.0 },
  { rank: 1, name: 'Firefighter', callsNeeded: 5, payMult: 1.15, hosePower: 1.15 },
  { rank: 2, name: 'Engineer', callsNeeded: 12, payMult: 1.3, hosePower: 1.3 },
  { rank: 3, name: 'Lieutenant', callsNeeded: 25, payMult: 1.5, hosePower: 1.5 },
  { rank: 4, name: 'Captain', callsNeeded: 45, payMult: 1.8, hosePower: 1.8 },
];

export const FIRE_GEAR = [
  { id: 'hose-pro', name: 'Pro Hose Nozzle', price: 300, power: 0.25, desc: 'Stronger spray, faster knockdown.' },
  { id: 'tank-xl', name: 'XL Water Tank', price: 450, power: 0, tank: 150, desc: 'Carry much more water.' },
  { id: 'suit-thermal', name: 'Thermal Suit', price: 600, power: 0, heatResist: 0.4, desc: 'Shrug off the worst heat.' },
  { id: 'axe', name: 'Rescue Axe', price: 200, power: 0, rescueSpeed: 0.5, desc: 'Cut through doors fast.' },
  { id: 'mask', name: 'SCBA Mask', price: 350, power: 0, smokeResist: 0.5, desc: 'Breathe easy in thick smoke.' },
  { id: 'foam', name: 'Foam Cannon', price: 800, power: 0.4, desc: 'Smother fuel fires with foam.' },
  { id: 'ladder', name: 'Extension Ladder', price: 500, power: 0, rescue: 1, desc: 'Reach the high windows.' },
  { id: 'radio', name: 'Command Radio', price: 250, power: 0, callBonus: 0.2, desc: 'Hear every call first.' },
];

export const FIRE_ARSON_CLUES = [
  { id: 'accelerant', name: 'Accelerant', text: 'A sharp chemical smell near the door.' },
  { id: 'timer', name: 'Timer', text: 'A broken timer device in the rubble.' },
  { id: 'footprints', name: 'Footprints', text: 'Fresh prints leading away from the scene.' },
  { id: 'cut-wire', name: 'Cut Wire', text: 'Wires cut clean, not burned through.' },
  { id: 'insurance', name: 'Insurance Papers', text: 'A fresh policy, signed days ago.' },
  { id: 'threat', name: 'Threat Note', text: 'A note warning the owner to pay up.' },
];

export const FIRE_SHIFT_TYPES = [
  { id: 'day', name: 'Day Shift', hourStart: 6, hourEnd: 18, callRate: 1.0, payBonus: 0 },
  { id: 'night', name: 'Night Shift', hourStart: 18, hourEnd: 6, callRate: 1.4, payBonus: 25 },
  { id: 'weekend', name: 'Weekend Duty', hourStart: 0, hourEnd: 24, callRate: 1.2, payBonus: 15 },
];

const INSPECTION_TARGETS = [
  { id: 'diner', name: "Ria's Diner", risk: 0.3 },
  { id: 'mall', name: 'Solara Mall', risk: 0.5 },
  { id: 'hotel', name: 'Grand Solara Hotel', risk: 0.4 },
  { id: 'warehouse', name: 'Harbor Warehouse 9', risk: 0.7 },
  { id: 'factory', name: 'Crown Textile Factory', risk: 0.8 },
  { id: 'school', name: 'Northside High', risk: 0.2 },
  { id: 'apartments', name: 'Palm Court Apartments', risk: 0.45 },
  { id: 'garage', name: 'Voss Garage', risk: 0.6 },
];

const DOG_TRICKS = [
  { id: 'sit', name: 'Sit', difficulty: 1 },
  { id: 'roll', name: 'Roll Over', difficulty: 2 },
  { id: 'fetch', name: 'Fetch Hose', difficulty: 2 },
  { id: 'bark', name: 'Bark Alarm', difficulty: 3 },
];

export function fireRankFor(callsDone) {
  let out = 0;
  for (const r of FIRE_RANKS) if (callsDone >= r.callsNeeded) out = r.rank;
  return out;
}

export function firePayFor(typeId, rank, gearBonus) {
  const type = FIRE_TYPES.find((t) => t.id === typeId);
  if (!type) return 0;
  const rec = FIRE_RANKS[rank] || FIRE_RANKS[0];
  return Math.round(type.pay * rec.payMult * (1 + (gearBonus || 0)));
}

function typeById(id) {
  for (const t of FIRE_TYPES) if (t.id === id) return t;
  return null;
}

function locById(id) {
  for (const l of FIRE_LOCATIONS) if (l.id === id) return l;
  return null;
}

function gearById(id) {
  for (const g of FIRE_GEAR) if (g.id === id) return g;
  return null;
}

export function createFirefighterSystem(deps) {
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
    rank: 0,
    callsDone: 0,
    callsFailed: 0,
    rescues: 0,
    civiliansSaved: 0,
    totalEarned: 0,
    water: 300,
    waterMax: 300,
    health: 100,
    gear: [],
    activeFire: null,
    callQueue: [],
    nextCallIn: 45,
    onShift: false,
    shift: null,
    shiftCalls: 0,
    arsonCases: 0,
    arsonSolved: 0,
    clues: [],
    smokeExposure: 0,
    heatDamage: 0,
    hydrantRefills: 0,
    stationUpgrades: 0,
    truckCondition: 100,
    responseBest: null,
    responseTotal: 0,
    responseCount: 0,
    falseAlarms: 0,
    commendations: 0,
    lastCallDay: 0,
    inspections: 0,
    violationsFound: 0,
    alarmsInstalled: 0,
    firehouseDog: null,
    calendarsSold: 0,
    rookiesTrained: 0,
    hydrantsChecked: 0,
    openHouses: 0,
    talksGiven: 0,
  };

  function rankInfo() {
    return FIRE_RANKS[state.rank] || FIRE_RANKS[0];
  }

  function hasGear(id) {
    return state.gear.includes(id);
  }

  function hosePower() {
    let p = rankInfo().hosePower;
    for (const id of state.gear) {
      const g = gearById(id);
      if (g) p += g.power || 0;
    }
    return p;
  }

  function tankCapacity() {
    let cap = 300;
    for (const id of state.gear) {
      const g = gearById(id);
      if (g && g.tank) cap += g.tank;
    }
    return cap;
  }

  function heatResist() {
    let r = 0;
    for (const id of state.gear) {
      const g = gearById(id);
      if (g && g.heatResist) r += g.heatResist;
    }
    return Math.min(0.8, r);
  }

  function smokeResist() {
    let r = 0;
    for (const id of state.gear) {
      const g = gearById(id);
      if (g && g.smokeResist) r += g.smokeResist;
    }
    return Math.min(0.8, r);
  }

  function rescueSpeed() {
    let s = 1;
    for (const id of state.gear) {
      const g = gearById(id);
      if (g && g.rescueSpeed) s += g.rescueSpeed;
    }
    return s;
  }

  function callPayBonus() {
    let b = 0;
    for (const id of state.gear) {
      const g = gearById(id);
      if (g && g.callBonus) b += g.callBonus;
    }
    return b;
  }

  function spawnFire(forcedType) {
    const type = forcedType ? typeById(forcedType) : FIRE_TYPES[Math.floor(rnd() * FIRE_TYPES.length)];
    const picked = type || FIRE_TYPES[Math.floor(rnd() * FIRE_TYPES.length)];
    const loc = FIRE_LOCATIONS[Math.floor(rnd() * FIRE_LOCATIONS.length)];
    const arson = rnd() < 0.22;
    const fire = {
      id: 'fire-' + dayOf() + '-' + (state.callsDone + state.callsFailed + state.callQueue.length + 1),
      typeId: picked.id,
      typeName: picked.name,
      locationId: loc.id,
      locationName: loc.name,
      intensity: picked.baseIntensity,
      maxIntensity: picked.baseIntensity,
      civilians: picked.civilians,
      rescued: 0,
      arson,
      cluesFound: 0,
      cluesTotal: arson ? 2 + Math.floor(rnd() * 2) : 0,
      timeLeft: 240,
      spreadTimer: 0,
      responseStart: Date.now(),
      waterUsed: 0,
      smoke: picked.smoke,
    };
    state.callQueue.push(fire);
    say('Fire call: ' + picked.name + ' at ' + loc.name + '.');
    return fire;
  }

  function answerCall() {
    if (state.activeFire) return { ok: false, reason: 'fire-active' };
    if (state.callQueue.length === 0) return { ok: false, reason: 'no-calls' };
    const fire = state.callQueue.shift();
    state.activeFire = fire;
    state.lastCallDay = dayOf();
    return { ok: true, fire: { ...fire } };
  }

  function sprayWater(seconds) {
    const secs = seconds === undefined || seconds === null ? 1 : seconds;
    if (!state.activeFire) return { ok: false, reason: 'no-active-fire' };
    if (state.water <= 0) return { ok: false, reason: 'tank-empty' };
    const used = Math.min(state.water, 12 * secs);
    state.water -= used;
    const fire = state.activeFire;
    fire.waterUsed += used;
    fire.intensity -= used * 0.55 * hosePower();
    const heatDmg = fire.intensity * 0.02 * secs * (1 - heatResist());
    const smokeDmg = fire.smoke * 1.5 * secs * (1 - smokeResist());
    state.heatDamage += heatDmg;
    state.smokeExposure += smokeDmg;
    state.health = Math.max(0, state.health - smokeDmg * 0.1);
    if (fire.intensity <= 0) return extinguishFire();
    return { ok: true, intensity: Math.round(fire.intensity), water: Math.round(state.water), health: Math.round(state.health) };
  }

  function extinguishFire() {
    if (!state.activeFire) return { ok: false, reason: 'no-active-fire' };
    const fire = state.activeFire;
    state.activeFire = null;
    state.callsDone += 1;
    state.shiftCalls += 1;
    const base = firePayFor(fire.typeId, state.callsDone, callPayBonus());
    const rescueBonus = fire.rescued * 40;
    const speedBonus = fire.timeLeft > 120 ? 30 : 0;
    const pay = base + rescueBonus + speedBonus;
    moveCash(pay);
    state.totalEarned += pay;
    const responseSecs = Math.round((Date.now() - fire.responseStart) / 1000);
    state.responseTotal += responseSecs;
    state.responseCount += 1;
    if (state.responseBest === null || responseSecs < state.responseBest) state.responseBest = responseSecs;
    const oldRank = state.rank;
    const newRank = fireRankFor(state.callsDone);
    const promoted = newRank > oldRank;
    if (promoted) { state.rank = newRank; state.commendations += 1; }
    if (fire.arson) state.arsonCases += 1;
    say('Fire out at ' + fire.locationName + ' — $' + pay + '.');
    return { ok: true, pay, basePay: base, rescueBonus, speedBonus, promoted, arson: fire.arson, responseSeconds: responseSecs };
  }

  function rescueCivilian() {
    if (!state.activeFire) return { ok: false, reason: 'no-active-fire' };
    const fire = state.activeFire;
    if (fire.rescued >= fire.civilians) return { ok: false, reason: 'no-civilians' };
    if (fire.intensity > 60) return { ok: false, reason: 'too-hot' };
    fire.rescued += 1;
    state.rescues += 1;
    state.civiliansSaved += 1;
    const dmg = (8 + fire.intensity * 0.1) * (1 - heatResist()) / rescueSpeed();
    state.health = Math.max(0, state.health - dmg);
    say('Rescued a civilian from ' + fire.locationName + '.');
    return { ok: true, rescued: fire.rescued, civilians: fire.civilians, health: Math.round(state.health) };
  }

  function investigateClue() {
    if (!state.activeFire) return { ok: false, reason: 'no-active-fire' };
    const fire = state.activeFire;
    if (!fire.arson) return { ok: false, reason: 'not-arson' };
    if (fire.cluesFound >= fire.cluesTotal) return { ok: false, reason: 'all-clues-found' };
    const clue = FIRE_ARSON_CLUES[Math.floor(rnd() * FIRE_ARSON_CLUES.length)];
    state.clues.push({ ...clue });
    fire.cluesFound += 1;
    if (fire.cluesFound >= fire.cluesTotal) {
      state.arsonSolved += 1;
      const reward = 150 + fire.cluesTotal * 50;
      moveCash(reward);
      state.totalEarned += reward;
      state.commendations += 1;
      return { ok: true, clueId: clue.id, solved: true, reward };
    }
    return { ok: true, clueId: clue.id, solved: false, found: fire.cluesFound, total: fire.cluesTotal };
  }

  function refillWater() {
    const pos = posOf();
    const near = Math.hypot(pos.x - FIRE_STATION.x, pos.z - FIRE_STATION.z) <= 20;
    if (!near && state.water > 0) return { ok: false, reason: 'no-hydrant-nearby' };
    if (state.water >= tankCapacity()) return { ok: false, reason: 'tank-full' };
    const refilled = tankCapacity() - state.water;
    state.water = tankCapacity();
    state.hydrantRefills += 1;
    return { ok: true, refilled: Math.round(refilled), water: Math.round(state.water) };
  }

  function buyGear(gearId) {
    const gear = gearById(gearId);
    if (!gear) return { ok: false, reason: 'unknown-gear' };
    if (hasGear(gearId)) return { ok: false, reason: 'already-owned' };
    if (cashOf() < gear.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-gear.price);
    state.gear.push(gearId);
    return { ok: true, gearId, price: gear.price };
  }

  function hourInShift(shift, hour) {
    if (shift.hourStart <= shift.hourEnd) return hour >= shift.hourStart && hour < shift.hourEnd;
    return hour >= shift.hourStart || hour < shift.hourEnd;
  }

  function startShift(shiftId) {
    const id = shiftId || 'day';
    const shift = FIRE_SHIFT_TYPES.find((s) => s.id === id);
    if (!shift) return { ok: false, reason: 'unknown-shift' };
    if (state.onShift) return { ok: false, reason: 'already-on-shift' };
    if (!hourInShift(shift, hourOf())) return { ok: false, reason: 'wrong-hour' };
    state.shift = { id: shift.id, name: shift.name, calls: 0, startedDay: dayOf(), payBonus: shift.payBonus };
    state.onShift = true;
    state.shiftCalls = 0;
    return { ok: true, shift: { ...state.shift } };
  }

  function endShift() {
    if (!state.onShift || !state.shift) return { ok: false, reason: 'no-shift' };
    const calls = state.shiftCalls;
    const bonus = state.shift.payBonus * calls;
    if (bonus > 0) {
      moveCash(bonus);
      state.totalEarned += bonus;
    }
    state.shift = null;
    state.onShift = false;
    return { ok: true, calls, bonus };
  }

  function reportFalseAlarm() {
    if (state.callQueue.length === 0) return { ok: false, reason: 'no-calls' };
    const fire = state.callQueue.shift();
    state.falseAlarms += 1;
    return { ok: true, fireId: fire.id };
  }

  function tick(dt) {
    const step = dt || 0;
    const rate = state.onShift ? 1.6 : 0.5;
    state.nextCallIn -= step * rate;
    if (state.nextCallIn <= 0) {
      state.nextCallIn = 90 + rnd() * 180;
      if (state.callQueue.length < 3) spawnFire();
    }
    if (state.activeFire) {
      const fire = state.activeFire;
      const type = typeById(fire.typeId);
      fire.timeLeft -= step;
      fire.spreadTimer += step;
      if (fire.spreadTimer >= 8) {
        fire.spreadTimer = 0;
        fire.intensity = Math.min(fire.maxIntensity * 1.6, fire.intensity + (type ? type.spread : 0.5) * 2.5);
      }
      if (fire.civilians - fire.rescued > 0 && rnd() < 0.25 * step) say('Smoke thickens — civilians still inside!');
      if (fire.timeLeft <= 0) {
        state.activeFire = null;
        state.callsFailed += 1;
        state.shiftCalls = Math.max(0, state.shiftCalls - 1);
        pushHeat(0);
        say('The fire at ' + fire.locationName + ' got away.');
      }
    }
    if (!state.activeFire) {
      state.health = Math.min(100, state.health + step * 0.5);
    } else if (state.activeFire.intensity < 20) {
      state.health = Math.min(100, state.health + step * 0.1);
    }
    if (state.truckCondition < 100 && state.callsDone > 0) {
      state.truckCondition = Math.min(100, state.truckCondition + 0.02 * step);
    }
  }

  function tickDay(day) {
    const today = day !== undefined && day !== null ? day : dayOf();
    state.water = tankCapacity();
    state.truckCondition = 100;
    state.nextCallIn = 30 + rnd() * 60;
    if (state.shift && state.shift.startedDay !== today) {
      state.shift = null;
      state.onShift = false;
    }
    if (today % 7 === 0 || today % 7 === 6) spawnFire();
    return { day: today, water: Math.round(state.water), callsDone: state.callsDone };
  }

  function repairTruck() {
    const pos = posOf();
    if (Math.hypot(pos.x - FIRE_STATION.x, pos.z - FIRE_STATION.z) > 20) return { ok: false, reason: 'too-far' };
    if (state.truckCondition >= 100) return { ok: false, reason: 'truck-fine' };
    const cost = Math.ceil((100 - state.truckCondition) * 2);
    if (cashOf() < cost) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-cost);
    state.truckCondition = 100;
    return { ok: true, cost };
  }

  function upgradeStation() {
    const level = state.stationUpgrades + 1;
    const cost = 1000 * level;
    if (cashOf() < cost) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-cost);
    state.stationUpgrades = level;
    state.waterMax += 100;
    return { ok: true, level, cost };
  }

  function interact() {
    const pos = posOf();
    if (Math.hypot(pos.x - FIRE_STATION.x, pos.z - FIRE_STATION.z) <= 20) {
      if (state.water < tankCapacity() / 2) {
        refillWater();
        return true;
      }
      if (!state.onShift) {
        const hour = hourOf();
        const res = startShift(hour >= 18 || hour < 6 ? 'night' : 'day');
        return res.ok;
      }
      return true;
    }
    if (state.activeFire) {
      const loc = locById(state.activeFire.locationId);
      if (loc && Math.hypot(pos.x - loc.x, pos.z - loc.z) <= 25) {
        const fire = state.activeFire;
        if (fire.rescued < fire.civilians && fire.intensity <= 60) { rescueCivilian(); return true; }
        if (fire.arson && fire.cluesFound < fire.cluesTotal && fire.intensity <= 10) { investigateClue(); return true; }
        sprayWater(1);
        return true;
      }
    }
    if (!state.activeFire) {
      for (const call of state.callQueue) {
        const loc = locById(call.locationId);
        if (loc && Math.hypot(pos.x - loc.x, pos.z - loc.z) <= 30) {
          answerCall();
          return true;
        }
      }
    }
    return false;
  }

  function hudLine() {
    if (state.activeFire) {
      const f = state.activeFire;
      return 'FIRE ' + f.typeName + ' at ' + f.locationName + ' · ' + Math.round(f.intensity) + '% · ' + Math.round(state.water) + 'L · ' + Math.ceil(f.timeLeft) + 's';
    }
    if (state.callQueue.length > 0) {
      const f = state.callQueue[0];
      return 'FIRE CALL ' + f.typeName + ' at ' + f.locationName + ' — answer it!';
    }
    if (state.onShift) return 'FIRE DEPT on shift · ' + state.callsDone + ' calls · ' + rankInfo().name;
    const pos = posOf();
    if (Math.hypot(pos.x - FIRE_STATION.x, pos.z - FIRE_STATION.z) <= 20) {
      return 'STATION 7 · ' + rankInfo().name + ' · ' + Math.round(state.water) + 'L water';
    }
    return '';
  }

  function stats() {
    const avg = state.responseCount > 0 ? Math.round(state.responseTotal / state.responseCount) : null;
    return {
      rankName: rankInfo().name,
      rank: state.rank,
      callsDone: state.callsDone,
      callsFailed: state.callsFailed,
      rescues: state.rescues,
      civiliansSaved: state.civiliansSaved,
      totalEarned: state.totalEarned,
      water: Math.round(state.water),
      waterMax: tankCapacity(),
      health: Math.round(state.health),
      gear: [...state.gear],
      hosePower: Math.round(hosePower() * 100) / 100,
      activeFireType: state.activeFire ? state.activeFire.typeId : null,
      queuedCalls: state.callQueue.length,
      onShift: state.onShift,
      shiftId: state.shift ? state.shift.id : null,
      arsonCases: state.arsonCases,
      arsonSolved: state.arsonSolved,
      cluesFound: state.clues.length,
      smokeExposure: Math.round(state.smokeExposure),
      heatDamage: Math.round(state.heatDamage),
      hydrantRefills: state.hydrantRefills,
      stationUpgrades: state.stationUpgrades,
      truckCondition: Math.round(state.truckCondition),
      bestResponse: state.responseBest,
      averageResponse: avg,
      falseAlarms: state.falseAlarms,
      commendations: state.commendations,
    };
  }

  function serialize() {
    return {
      rank: state.rank,
      callsDone: state.callsDone,
      callsFailed: state.callsFailed,
      rescues: state.rescues,
      civiliansSaved: state.civiliansSaved,
      totalEarned: state.totalEarned,
      water: state.water,
      health: state.health,
      gear: [...state.gear],
      arsonCases: state.arsonCases,
      arsonSolved: state.arsonSolved,
      clues: state.clues.map((c) => ({ ...c })),
      smokeExposure: state.smokeExposure,
      heatDamage: state.heatDamage,
      hydrantRefills: state.hydrantRefills,
      stationUpgrades: state.stationUpgrades,
      truckCondition: state.truckCondition,
      responseBest: state.responseBest,
      responseTotal: state.responseTotal,
      responseCount: state.responseCount,
      falseAlarms: state.falseAlarms,
      commendations: state.commendations,
      lastCallDay: state.lastCallDay,
      inspections: state.inspections,
      violationsFound: state.violationsFound,
      alarmsInstalled: state.alarmsInstalled,
      firehouseDog: state.firehouseDog ? { ...state.firehouseDog, tricks: [...(state.firehouseDog.tricks || [])] } : null,
      calendarsSold: state.calendarsSold,
      rookiesTrained: state.rookiesTrained,
      hydrantsChecked: state.hydrantsChecked,
      openHouses: state.openHouses,
      talksGiven: state.talksGiven,
    };
  }

  function deserialize(saved) {
    const s = saved || {};
    state.rank = Math.floor(Number(s.rank) || 0);
    state.callsDone = Math.floor(Number(s.callsDone) || 0);
    state.callsFailed = Math.floor(Number(s.callsFailed) || 0);
    state.rescues = Math.floor(Number(s.rescues) || 0);
    state.civiliansSaved = Math.floor(Number(s.civiliansSaved) || 0);
    state.totalEarned = Number(s.totalEarned) || 0;
    state.water = Number(s.water) || 300;
    state.health = Number(s.health) || 100;
    state.gear = Array.isArray(s.gear) ? [...s.gear] : [];
    state.arsonCases = Math.floor(Number(s.arsonCases) || 0);
    state.arsonSolved = Math.floor(Number(s.arsonSolved) || 0);
    state.clues = Array.isArray(s.clues) ? s.clues.map((c) => ({ ...c })) : [];
    state.smokeExposure = Number(s.smokeExposure) || 0;
    state.heatDamage = Number(s.heatDamage) || 0;
    state.hydrantRefills = Math.floor(Number(s.hydrantRefills) || 0);
    state.stationUpgrades = Math.floor(Number(s.stationUpgrades) || 0);
    state.truckCondition = Number(s.truckCondition) || 100;
    state.responseBest = s.responseBest === null || s.responseBest === undefined ? null : Number(s.responseBest);
    state.responseTotal = Number(s.responseTotal) || 0;
    state.responseCount = Math.floor(Number(s.responseCount) || 0);
    state.falseAlarms = Math.floor(Number(s.falseAlarms) || 0);
    state.commendations = Math.floor(Number(s.commendations) || 0);
    state.lastCallDay = Math.floor(Number(s.lastCallDay) || 0);
    state.inspections = Math.floor(Number(s.inspections) || 0);
    state.violationsFound = Math.floor(Number(s.violationsFound) || 0);
    state.alarmsInstalled = Math.floor(Number(s.alarmsInstalled) || 0);
    state.firehouseDog = s.firehouseDog ? { ...s.firehouseDog } : null;
    state.calendarsSold = Math.floor(Number(s.calendarsSold) || 0);
    state.rookiesTrained = Math.floor(Number(s.rookiesTrained) || 0);
    state.hydrantsChecked = Math.floor(Number(s.hydrantsChecked) || 0);
    state.openHouses = Math.floor(Number(s.openHouses) || 0);
    state.talksGiven = Math.floor(Number(s.talksGiven) || 0);
    state.activeFire = null;
    state.callQueue = [];
    state.onShift = false;
    state.shift = null;
    return { ok: true };
  }

  function inspectBuilding(targetId) {
    const target = INSPECTION_TARGETS.find((t) => t.id === targetId);
    if (!target) return { ok: false, reason: 'unknown-building' };
    const violations = [];
    if (rnd() < target.risk) violations.push('blocked-exit');
    if (rnd() < target.risk) violations.push('expired-extinguisher');
    if (rnd() < target.risk) violations.push('faulty-wiring');
    if (rnd() < target.risk) violations.push('no-smoke-alarm');
    const pay = 40 + violations.length * 30;
    moveCash(pay);
    state.totalEarned += pay;
    state.inspections += 1;
    state.violationsFound += violations.length;
    return { ok: true, buildingId: targetId, violations, pay };
  }

  function installSmokeAlarm(targetId) {
    const target = INSPECTION_TARGETS.find((t) => t.id === targetId);
    if (!target) return { ok: false, reason: 'unknown-building' };
    if (cashOf() < 25) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-25);
    state.alarmsInstalled += 1;
    return { ok: true, buildingId: targetId, cost: 25 };
  }

  function adoptFirehouseDog(name) {
    if (state.firehouseDog) return { ok: false, reason: 'already-has-dog' };
    const dogName = name || 'Sparky';
    state.firehouseDog = { name: dogName, tricks: [], morale: 50 };
    return { ok: true, dogName };
  }

  function trainFirehouseDog(trickId) {
    if (!state.firehouseDog) return { ok: false, reason: 'no-dog' };
    const trick = DOG_TRICKS.find((t) => t.id === trickId);
    if (!trick) return { ok: false, reason: 'unknown-trick' };
    if (state.firehouseDog.tricks.includes(trickId)) return { ok: false, reason: 'already-known' };
    if (rnd() < 0.3 + trick.difficulty * 0.1) return { ok: true, learned: false, trickId };
    state.firehouseDog.tricks.push(trickId);
    state.firehouseDog.morale = Math.min(100, state.firehouseDog.morale + 10);
    return { ok: true, learned: true, trickId };
  }

  function sellCharityCalendar() {
    if (state.callsDone < 10) return { ok: false, reason: 'not-enough-calls' };
    const sold = 5 + Math.floor(rnd() * 20);
    const earned = sold * 15;
    moveCash(earned);
    state.totalEarned += earned;
    state.calendarsSold += sold;
    return { ok: true, sold, earned };
  }

  function trainRookie() {
    if (state.rank < 1) return { ok: false, reason: 'rank-too-low' };
    state.rookiesTrained += 1;
    state.commendations += 1;
    const gain = 5 + Math.floor(rnd() * 10);
    return { ok: true, rookies: state.rookiesTrained, gain, cost: 0 };
  }

  function checkHydrants() {
    const checked = 4 + Math.floor(rnd() * 4);
    const broken = Math.floor(checked / 4);
    const pay = checked * 10;
    moveCash(pay);
    state.totalEarned += pay;
    state.hydrantsChecked += checked;
    return { ok: true, checked, broken, pay };
  }

  function hostOpenHouse() {
    if (cashOf() < 200) return { ok: false, reason: 'not-enough-cash' };
    if (state.callsDone < 5) return { ok: false, reason: 'not-enough-calls' };
    moveCash(-200);
    const visitors = 30 + Math.floor(rnd() * 70);
    const donations = visitors * 2 + Math.floor(rnd() * 6);
    moveCash(donations);
    state.totalEarned += donations;
    state.openHouses += 1;
    return { ok: true, visitors, donations, cost: 200 };
  }

  function firePreventionTalk() {
    moveCash(60);
    state.totalEarned += 60;
    state.talksGiven += 1;
    return { ok: true, pay: 60 };
  }

  return {
    name: 'Firefighter',
    state,
    spawnFire,
    answerCall,
    sprayWater,
    extinguishFire,
    rescueCivilian,
    investigateClue,
    refillWater,
    buyGear,
    startShift,
    endShift,
    reportFalseAlarm,
    tick,
    tickDay,
    repairTruck,
    upgradeStation,
    interact,
    hudLine,
    stats,
    serialize,
    deserialize,
    inspectBuilding,
    installSmokeAlarm,
    adoptFirehouseDog,
    trainFirehouseDog,
    sellCharityCalendar,
    trainRookie,
    checkHydrants,
    hostOpenHouse,
    firePreventionTalk,
  };
}
