// Solara Fire Department — fire calls, the engine truck, water pressure,
// rescues and arson investigation. Round 7, all-new system. Fires break
// out across the city; answer the call, drive the engine (or run on foot),
// spray water until the blaze is out, pull civilians from the smoke, and
// earn your pay per call. Rank up from Probie to Captain, buy better gear,
// and work out which fires were arson — the arsonist pays, one way or
// another.
export const FIRE_STATION = { id: 'station-7', name: 'Station 7', x: -60, z: 80, district: 'Downtown' };

export const FIRE_TYPES = [
  { id: 'kitchen', name: 'Kitchen Fire', baseIntensity: 30, spread: 0.4, smoke: 0.5, pay: 120, civilians: 1 },
  { id: 'car', name: 'Car Fire', baseIntensity: 25, spread: 0.3, smoke: 0.4, pay: 100, civilians: 0 },
  { id: 'warehouse', name: 'Warehouse Fire', baseIntensity: 70, spread: 0.8, smoke: 0.9, pay: 320, civilians: 2 },
  { id: 'apartment', name: 'Apartment Fire', baseIntensity: 55, spread: 0.6, smoke: 0.8, pay: 260, civilians: 3 },
  { id: 'forest', name: 'Brush Fire', baseIntensity: 45, spread: 1.0, smoke: 0.6, pay: 200, civilians: 0 },
  { id: 'gas', name: 'Gas Station Fire', baseIntensity: 85, spread: 0.5, smoke: 1.0, pay: 450, civilians: 2 },
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
  { id: 'hose-pro', name: 'Pro Hose Nozzle', price: 300, power: 0.25, desc: '+25% water power' },
  { id: 'tank-xl', name: 'XL Water Tank', price: 450, power: 0, tank: 150, desc: '+150L tank capacity' },
  { id: 'suit-thermal', name: 'Thermal Suit', price: 600, power: 0, heatResist: 0.4, desc: '40% less heat damage' },
  { id: 'axe', name: 'Rescue Axe', price: 200, power: 0, rescueSpeed: 0.5, desc: 'rescue 50% faster' },
  { id: 'mask', name: 'SCBA Mask', price: 350, power: 0, smokeResist: 0.5, desc: '50% less smoke damage' },
  { id: 'foam', name: 'Foam Cannon', price: 800, power: 0.4, desc: '+40% water power, gas fires' },
  { id: 'ladder', name: 'Extension Ladder', price: 500, power: 0, rescue: 1, desc: 'rescue from upper floors' },
  { id: 'radio', name: 'Command Radio', price: 250, power: 0, callBonus: 0.2, desc: '+20% call pay' },
];

export const FIRE_ARSON_CLUES = [
  { id: 'accelerant', name: 'Accelerant Smell', text: 'Gasoline smell near the origin point.' },
  { id: 'timer', name: 'Timer Device', text: 'A melted timer — someone set this fire.' },
  { id: 'footprints', name: 'Fresh Footprints', text: 'Footprints leading away, still smoking.' },
  { id: 'cut-wire', name: 'Cut Alarm Wire', text: 'The alarm wire was cut before the fire.' },
  { id: 'insurance', name: 'Insurance Papers', text: 'A fresh insurance policy on the building.' },
  { id: 'threat', name: 'Threat Note', text: 'A note: "Pay up or burn."' },
];

export const FIRE_SHIFT_TYPES = [
  { id: 'day', name: 'Day Shift', hourStart: 6, hourEnd: 18, callRate: 1.0, payBonus: 0 },
  { id: 'night', name: 'Night Shift', hourStart: 18, hourEnd: 6, callRate: 1.4, payBonus: 25 },
  { id: 'weekend', name: 'Weekend Duty', hourStart: 0, hourEnd: 24, callRate: 1.2, payBonus: 15 },
];

export function fireRankFor(callsDone) {
  let rank = 0;
  for (let i = 0; i < FIRE_RANKS.length; i++) {
    if (callsDone >= FIRE_RANKS[i].callsNeeded) rank = i;
  }
  return rank;
}

export function firePayFor(typeId, rank, gearBonus = 0) {
  const type = FIRE_TYPES.find((t) => t.id === typeId);
  if (!type) return 0;
  const mult = FIRE_RANKS[fireRankFor(rank)].payMult;
  return Math.round(type.pay * mult * (1 + gearBonus));
}

export function createFirefighterSystem(deps = {}) {
  const rng = deps.rng || Math.random;
  const getCash = deps.getCash || (() => 0);
  const addCash = deps.addCash || (() => {});
  const addHeat = deps.addHeat || (() => {});
  const log = deps.log || (() => {});
  const getDay = deps.getDay || (() => 1);
  const getHour = deps.getHour || (() => 12);
  const getPlayerPos = deps.getPlayerPos || (() => ({ x: 0, z: 0 }));

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
    activeFire: null, // { id, typeId, locationId, intensity, maxIntensity, civilians, rescued, arson, cluesFound, timeLeft, spreadTimer }
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
  };

  function rankInfo() { return FIRE_RANKS[state.rank]; }
  function hosePower() {
    let power = rankInfo().hosePower;
    for (const g of state.gear) {
      const def = FIRE_GEAR.find((d) => d.id === g);
      if (def && def.power) power += def.power;
    }
    return power;
  }
  function tankCapacity() {
    let cap = 300;
    for (const g of state.gear) {
      const def = FIRE_GEAR.find((d) => d.id === g);
      if (def && def.tank) cap += def.tank;
    }
    return cap;
  }
  function heatResist() {
    let r = 0;
    for (const g of state.gear) {
      const def = FIRE_GEAR.find((d) => d.id === g);
      if (def && def.heatResist) r += def.heatResist;
    }
    return Math.min(0.8, r);
  }
  function smokeResist() {
    let r = 0;
    for (const g of state.gear) {
      const def = FIRE_GEAR.find((d) => d.id === g);
      if (def && def.smokeResist) r += def.smokeResist;
    }
    return Math.min(0.8, r);
  }
  function rescueSpeed() {
    let s = 1;
    for (const g of state.gear) {
      const def = FIRE_GEAR.find((d) => d.id === g);
      if (def && def.rescueSpeed) s += def.rescueSpeed;
    }
    return s;
  }
  function callPayBonus() {
    let b = 0;
    for (const g of state.gear) {
      const def = FIRE_GEAR.find((d) => d.id === g);
      if (def && def.callBonus) b += def.callBonus;
    }
    return b;
  }
  function hasGear(id) { return state.gear.includes(id); }

  function spawnFire(forceType) {
    const type = forceType
      ? FIRE_TYPES.find((t) => t.id === forceType)
      : FIRE_TYPES[Math.floor(rng() * FIRE_TYPES.length)];
    const loc = FIRE_LOCATIONS[Math.floor(rng() * FIRE_LOCATIONS.length)];
    const isArson = rng() < 0.22;
    const fire = {
      id: `fire-${getDay()}-${state.callsDone + state.callsFailed + 1}`,
      typeId: type.id,
      typeName: type.name,
      locationId: loc.id,
      locationName: loc.name,
      intensity: type.baseIntensity,
      maxIntensity: type.baseIntensity,
      civilians: type.civilians,
      rescued: 0,
      arson: isArson,
      cluesFound: 0,
      cluesTotal: isArson ? 2 + Math.floor(rng() * 2) : 0,
      timeLeft: 240,
      spreadTimer: 0,
      responseStartedAt: Date.now(),
      waterUsed: 0,
      smoke: type.smoke,
    };
    state.callQueue.push(fire);
    log(`FIRE CALL: ${type.name} at ${loc.name}! ${type.civilians > 0 ? `${type.civilians} civilians inside!` : ''}`);
    return fire;
  }

  function answerCall() {
    if (state.activeFire) return { ok: false, reason: 'fire-active' };
    if (state.callQueue.length === 0) return { ok: false, reason: 'no-calls' };
    const fire = state.callQueue.shift();
    state.activeFire = fire;
    state.lastCallDay = getDay();
    log(`Responding to ${fire.typeName} at ${fire.locationName}.`);
    return { ok: true, fire: { ...fire } };
  }

  function sprayWater(seconds = 1) {
    const fire = state.activeFire;
    if (!fire) return { ok: false, reason: 'no-active-fire' };
    if (state.water <= 0) return { ok: false, reason: 'tank-empty' };
    const use = Math.min(state.water, 12 * seconds);
    state.water -= use;
    fire.waterUsed += use;
    const power = hosePower();
    const reduction = use * 0.55 * power;
    fire.intensity = Math.max(0, fire.intensity - reduction);
    // Standing close to a big fire hurts.
    const heatDmg = fire.intensity * 0.02 * seconds * (1 - heatResist());
    state.health = Math.max(0, state.health - heatDmg);
    state.heatDamage += heatDmg;
    const smokeDmg = fire.smoke * 1.5 * seconds * (1 - smokeResist());
    state.smokeExposure += smokeDmg;
    state.health = Math.max(0, state.health - smokeDmg * 0.1);
    if (fire.intensity <= 0) return extinguishFire();
    return { ok: true, intensity: Math.round(fire.intensity), water: Math.round(state.water), health: Math.round(state.health) };
  }

  function extinguishFire() {
    const fire = state.activeFire;
    if (!fire) return { ok: false, reason: 'no-active-fire' };
    state.activeFire = null;
    state.callsDone += 1;
    state.shiftCalls += 1;
    const pay = firePayFor(fire.typeId, state.callsDone, callPayBonus());
    const rescueBonus = fire.rescued * 40;
    const speedBonus = fire.timeLeft > 120 ? 30 : 0;
    const total = pay + rescueBonus + speedBonus;
    addCash(total);
    state.totalEarned += total;
    const responseSecs = Math.round((Date.now() - fire.responseStartedAt) / 1000);
    state.responseTotal += responseSecs;
    state.responseCount += 1;
    if (state.responseBest === null || responseSecs < state.responseBest) state.responseBest = responseSecs;
    const newRank = fireRankFor(state.callsDone);
    let promoted = false;
    if (newRank > state.rank) {
      state.rank = newRank;
      promoted = true;
      state.commendations += 1;
      log(`PROMOTED to ${FIRE_RANKS[newRank].name}! Pay x${FIRE_RANKS[newRank].payMult}, hose x${FIRE_RANKS[newRank].hosePower}.`);
    }
    log(`Fire out at ${fire.locationName}! Pay $${pay} + rescue $${rescueBonus} + speed $${speedBonus} = $${total}.`);
    if (fire.arson) {
      state.arsonCases += 1;
      log('Arson suspected at this scene — look for clues before you leave.');
    }
    return { ok: true, pay: total, base: pay, rescueBonus, speedBonus, promoted, arson: fire.arson, responseSecs };
  }

  function rescueCivilian() {
    const fire = state.activeFire;
    if (!fire) return { ok: false, reason: 'no-active-fire' };
    if (fire.rescued >= fire.civilians) return { ok: false, reason: 'no-civilians-left' };
    if (fire.intensity > 60) return { ok: false, reason: 'too-hot', intensity: Math.round(fire.intensity) };
    fire.rescued += 1;
    state.rescues += 1;
    state.civiliansSaved += 1;
    const dmg = (8 + fire.intensity * 0.1) * (1 - heatResist()) / rescueSpeed();
    state.health = Math.max(0, state.health - dmg);
    log(`Civilian rescued from ${fire.locationName}! (${fire.rescued}/${fire.civilians})`);
    return { ok: true, rescued: fire.rescued, total: fire.civilians, health: Math.round(state.health) };
  }

  function investigateClue() {
    const fire = state.activeFire;
    if (!fire) return { ok: false, reason: 'no-active-fire' };
    if (!fire.arson) return { ok: false, reason: 'not-arson' };
    if (fire.cluesFound >= fire.cluesTotal) return { ok: false, reason: 'all-clues-found' };
    const clue = FIRE_ARSON_CLUES[Math.floor(rng() * FIRE_ARSON_CLUES.length)];
    fire.cluesFound += 1;
    state.clues.push({ fireId: fire.id, clue: clue.id, text: clue.text });
    log(`Clue found: ${clue.text}`);
    if (fire.cluesFound >= fire.cluesTotal) {
      state.arsonSolved += 1;
      const reward = 150 + fire.cluesTotal * 50;
      addCash(reward);
      state.totalEarned += reward;
      state.commendations += 1;
      log(`ARSON CASE SOLVED! The evidence nails the arsonist. Reward $${reward}.`);
      return { ok: true, clue: clue.id, solved: true, reward };
    }
    return { ok: true, clue: clue.id, solved: false, found: fire.cluesFound, total: fire.cluesTotal };
  }

  function refillWater() {
    const p = getPlayerPos();
    const stationD = Math.hypot(FIRE_STATION.x - p.x, FIRE_STATION.z - p.z);
    const nearHydrant = stationD < 20;
    if (!nearHydrant && state.water > 0) return { ok: false, reason: 'no-hydrant-nearby' };
    const missing = tankCapacity() - state.water;
    if (missing <= 0) return { ok: false, reason: 'tank-full' };
    state.water = tankCapacity();
    state.hydrantRefills += 1;
    log(`Water tank refilled to ${tankCapacity()}L at the hydrant.`);
    return { ok: true, refilled: missing, water: state.water };
  }

  function buyGear(gearId) {
    const def = FIRE_GEAR.find((g) => g.id === gearId);
    if (!def) return { ok: false, reason: 'no-such-gear' };
    if (hasGear(gearId)) return { ok: false, reason: 'already-owned' };
    if (getCash() < def.price) return { ok: false, reason: 'no-cash', need: def.price };
    addCash(-def.price);
    state.gear.push(gearId);
    log(`Bought ${def.name} for $${def.price}. ${def.desc}.`);
    return { ok: true, gear: gearId, price: def.price };
  }

  function startShift(shiftId) {
    if (state.onShift) return { ok: false, reason: 'shift-active' };
    const shift = FIRE_SHIFT_TYPES.find((s) => s.id === shiftId) || FIRE_SHIFT_TYPES[0];
    const hour = getHour();
    if (shift.id === 'day' && (hour < 6 || hour >= 18)) return { ok: false, reason: 'wrong-hours', shift: shift.name };
    if (shift.id === 'night' && hour >= 6 && hour < 18) return { ok: false, reason: 'wrong-hours', shift: shift.name };
    state.onShift = true;
    state.shift = { id: shift.id, name: shift.name, calls: 0, startedDay: getDay(), payBonus: shift.payBonus };
    state.shiftCalls = 0;
    log(`${shift.name} started at Station 7. Stay ready — calls come in.`);
    return { ok: true, shift: { ...state.shift } };
  }

  function endShift() {
    if (!state.onShift) return { ok: false, reason: 'no-shift' };
    const calls = state.shiftCalls;
    const bonus = state.shift.payBonus * calls;
    if (bonus > 0) {
      addCash(bonus);
      state.totalEarned += bonus;
    }
    state.onShift = false;
    state.shift = null;
    log(`Shift over: ${calls} calls answered, shift bonus $${bonus}.`);
    return { ok: true, calls, bonus };
  }

  function reportFalseAlarm() {
    if (state.callQueue.length === 0) return { ok: false, reason: 'no-calls' };
    const fire = state.callQueue.shift();
    state.falseAlarms += 1;
    log(`False alarm at ${fire.locationName} — someone burned toast.`);
    return { ok: true, fire: fire.id };
  }

  function tick(dt) {
    // Off-shift, calls trickle in slowly; on shift they come faster.
    const rate = state.onShift ? 1.6 : 0.5;
    state.nextCallIn -= dt * rate;
    if (state.nextCallIn <= 0) {
      state.nextCallIn = 90 + rng() * 180;
      if (state.callQueue.length < 3) spawnFire();
    }
    const fire = state.activeFire;
    if (fire) {
      fire.timeLeft -= dt;
      fire.spreadTimer += dt;
      const type = FIRE_TYPES.find((t) => t.id === fire.typeId);
      // Unattended fire grows: intensity climbs, smoke thickens.
      if (fire.spreadTimer > 8) {
        fire.spreadTimer = 0;
        const growth = type.spread * 2.5;
        fire.intensity = Math.min(fire.maxIntensity * 1.6, fire.intensity + growth);
        if (rng() < 0.25 && fire.civilians > fire.rescued) {
          log(`Smoke thickens at ${fire.locationName} — a civilian is in trouble!`);
        }
      }
      // Out of time: the building is lost, the call fails.
      if (fire.timeLeft <= 0) {
        state.activeFire = null;
        state.callsFailed += 1;
        if (state.onShift) state.shiftCalls = Math.max(0, state.shiftCalls - 1);
        addHeat(0);
        log(`Too late — ${fire.locationName} is a total loss. Call failed.`);
      }
      // Health slowly recovers once the fire is out, never mid-blaze.
      if (fire.intensity < 20 && state.health < 100) {
        state.health = Math.min(100, state.health + dt * 0.5);
      }
    } else if (state.health < 100) {
      // At the station or on the street, you catch your breath.
      state.health = Math.min(100, state.health + dt * 1.2);
    }
    // The engine truck wears down with every call; fix it at the station.
    if (state.truckCondition < 100 && state.callsDone > 0) {
      state.truckCondition = Math.min(100, state.truckCondition + dt * 0.02);
    }
  }

  function tickDay(day) {
    // A new day: a fresh shift board, water topped up, truck serviced.
    state.water = tankCapacity();
    state.truckCondition = 100;
    state.nextCallIn = 30 + rng() * 60;
    if (state.onShift && state.shift && state.shift.startedDay !== day) {
      endShift();
    }
    // Weekend: the city burns more. Monday: quiet.
    if (day % 7 === 0 || day % 7 === 6) {
      spawnFire();
    }
    return { day, water: state.water, callsDone: state.callsDone };
  }

  function repairTruck() {
    const p = getPlayerPos();
    const d = Math.hypot(FIRE_STATION.x - p.x, FIRE_STATION.z - p.z);
    if (d > 20) return { ok: false, reason: 'not-at-station' };
    const missing = 100 - state.truckCondition;
    if (missing <= 0) return { ok: false, reason: 'truck-fine' };
    const cost = Math.ceil(missing * 2);
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.truckCondition = 100;
    log(`Engine truck serviced at Station 7 for $${cost}.`);
    return { ok: true, cost };
  }

  function upgradeStation() {
    const cost = 1000 * (state.stationUpgrades + 1);
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.stationUpgrades += 1;
    state.waterMax += 100;
    log(`Station 7 upgraded (level ${state.stationUpgrades}) — tank +100L, calls come faster.`);
    return { ok: true, level: state.stationUpgrades, cost };
  }

  function interact() {
    const p = getPlayerPos();
    // At the station: refill, or clock in for a shift.
    const stationD = Math.hypot(FIRE_STATION.x - p.x, FIRE_STATION.z - p.z);
    if (stationD < 20) {
      if (state.water < tankCapacity() * 0.5) return refillWater().ok;
      if (!state.onShift) return startShift(getHour() >= 18 || getHour() < 6 ? 'night' : 'day').ok;
      return true;
    }
    // At an active fire: spray, rescue, or investigate.
    const fire = state.activeFire;
    if (fire) {
      const loc = FIRE_LOCATIONS.find((l) => l.id === fire.locationId);
      if (loc && Math.hypot(loc.x - p.x, loc.z - p.z) < 25) {
        if (fire.civilians > fire.rescued && fire.intensity <= 60) {
          const r = rescueCivilian();
          return r.ok;
        }
        if (fire.arson && fire.cluesFound < fire.cluesTotal && fire.intensity <= 10) {
          const r = investigateClue();
          return r.ok;
        }
        const r = sprayWater(1);
        return r.ok;
      }
    }
    // Near a queued call location: answer it.
    if (state.callQueue.length > 0 && !state.activeFire) {
      const next = state.callQueue[0];
      const loc = FIRE_LOCATIONS.find((l) => l.id === next.locationId);
      if (loc && Math.hypot(loc.x - p.x, loc.z - p.z) < 30) {
        return answerCall().ok;
      }
    }
    return false;
  }

  function hudLine() {
    if (state.activeFire) {
      const f = state.activeFire;
      return `FIRE ${f.typeName} @ ${f.locationName} ${Math.round(f.intensity)}% · water ${Math.round(state.water)}L · ${Math.ceil(f.timeLeft)}s`;
    }
    if (state.callQueue.length > 0) {
      const f = state.callQueue[0];
      return `FIRE CALL: ${f.typeName} @ ${f.locationName} — answer it!`;
    }
    if (state.onShift) return `FIRE DEPT on shift · ${state.callsDone} calls · ${FIRE_RANKS[state.rank].name}`;
    const p = getPlayerPos();
    if (Math.hypot(FIRE_STATION.x - p.x, FIRE_STATION.z - p.z) < 20) {
      return `STATION 7 · ${FIRE_RANKS[state.rank].name} · water ${Math.round(state.water)}L`;
    }
    return '';
  }

  function stats() {
    return {
      rank: FIRE_RANKS[state.rank].name,
      rankIndex: state.rank,
      callsDone: state.callsDone,
      callsFailed: state.callsFailed,
      rescues: state.rescues,
      civiliansSaved: state.civiliansSaved,
      totalEarned: state.totalEarned,
      water: Math.round(state.water),
      waterMax: tankCapacity(),
      health: Math.round(state.health),
      gear: [...state.gear],
      hosePower: Number(hosePower().toFixed(2)),
      activeFire: state.activeFire ? state.activeFire.typeId : null,
      queuedCalls: state.callQueue.length,
      onShift: state.onShift,
      shift: state.shift ? state.shift.id : null,
      arsonCases: state.arsonCases,
      arsonSolved: state.arsonSolved,
      cluesFound: state.clues.length,
      smokeExposure: Math.round(state.smokeExposure),
      heatDamage: Math.round(state.heatDamage),
      hydrantRefills: state.hydrantRefills,
      stationUpgrades: state.stationUpgrades,
      truckCondition: Math.round(state.truckCondition),
      responseBest: state.responseBest,
      avgResponse: state.responseCount > 0 ? Math.round(state.responseTotal / state.responseCount) : null,
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
      inspections: state.inspections || 0,
      violationsFound: state.violationsFound || 0,
      alarmsInstalled: state.alarmsInstalled || 0,
      firehouseDog: state.firehouseDog ? { ...state.firehouseDog } : null,
      calendarsSold: state.calendarsSold || 0,
      rookiesTrained: state.rookiesTrained || 0,
      hydrantsChecked: state.hydrantsChecked || 0,
      openHouses: state.openHouses || 0,
      talksGiven: state.talksGiven || 0,
    };
  }

  function deserialize(d) {
    if (!d) return;
    state.rank = d.rank ?? 0;
    state.callsDone = d.callsDone ?? 0;
    state.callsFailed = d.callsFailed ?? 0;
    state.rescues = d.rescues ?? 0;
    state.civiliansSaved = d.civiliansSaved ?? 0;
    state.totalEarned = d.totalEarned ?? 0;
    state.water = d.water ?? 300;
    state.health = d.health ?? 100;
    state.gear = [...(d.gear || [])];
    state.arsonCases = d.arsonCases ?? 0;
    state.arsonSolved = d.arsonSolved ?? 0;
    state.clues = (d.clues || []).map((c) => ({ ...c }));
    state.smokeExposure = d.smokeExposure ?? 0;
    state.heatDamage = d.heatDamage ?? 0;
    state.hydrantRefills = d.hydrantRefills ?? 0;
    state.stationUpgrades = d.stationUpgrades ?? 0;
    state.truckCondition = d.truckCondition ?? 100;
    state.responseBest = d.responseBest ?? null;
    state.responseTotal = d.responseTotal ?? 0;
    state.responseCount = d.responseCount ?? 0;
    state.falseAlarms = d.falseAlarms ?? 0;
    state.commendations = d.commendations ?? 0;
    state.lastCallDay = d.lastCallDay ?? 0;
    state.inspections = d.inspections ?? 0;
    state.violationsFound = d.violationsFound ?? 0;
    state.alarmsInstalled = d.alarmsInstalled ?? 0;
    state.firehouseDog = d.firehouseDog ? { ...d.firehouseDog } : null;
    state.calendarsSold = d.calendarsSold ?? 0;
    state.rookiesTrained = d.rookiesTrained ?? 0;
    state.hydrantsChecked = d.hydrantsChecked ?? 0;
    state.openHouses = d.openHouses ?? 0;
    state.talksGiven = d.talksGiven ?? 0;
    state.activeFire = null;
    state.callQueue = [];
    state.onShift = false;
    state.shift = null;
  }

  // --- Round 7 top-up: prevention inspections, firehouse dog, calendar ---
  const FIRE_INSPECTION_TARGETS = [
    { id: 'diner', name: "Ria's Diner", risk: 0.6 },
    { id: 'mall', name: 'Solara Mall', risk: 0.4 },
    { id: 'school', name: 'Northside High', risk: 0.3 },
    { id: 'hotel', name: 'Grand Solara Hotel', risk: 0.5 },
    { id: 'factory', name: 'Crown Textile Factory', risk: 0.8 },
    { id: 'warehouse', name: 'Harbor Warehouse 9', risk: 0.7 },
    { id: 'gas', name: 'FuelMax Station', risk: 0.9 },
    { id: 'apartments', name: 'Palm Court Apartments', risk: 0.55 },
  ];
  const FIREHOUSE_DOG_TRICKS = [
    { id: 'fetch-hose', name: 'Fetch the Hose', difficulty: 1 },
    { id: 'slide', name: 'Slide Down the Pole', difficulty: 2 },
    { id: 'alarm', name: 'Bark at the Alarm', difficulty: 1 },
    { id: 'rescue-dummy', name: 'Rescue Dummy Drag', difficulty: 3 },
  ];
  function inspectBuilding(targetId) {
    const target = FIRE_INSPECTION_TARGETS.find((t) => t.id === targetId);
    if (!target) return { ok: false, reason: 'no-such-building' };
    const found = [];
    if (rng() < target.risk) found.push('blocked exit');
    if (rng() < target.risk * 0.7) found.push('expired extinguisher');
    if (rng() < target.risk * 0.5) found.push('faulty wiring');
    if (rng() < 0.2) found.push('no smoke alarm');
    const pay = 40 + found.length * 30;
    addCash(pay);
    state.totalEarned += pay;
    state.inspections = (state.inspections || 0) + 1;
    state.violationsFound = (state.violationsFound || 0) + found.length;
    if (found.length === 0) {
      log(`${target.name} passes inspection clean. Pay $${pay}.`);
    } else {
      log(`Inspection at ${target.name}: ${found.join(', ')}. Pay $${pay}.`);
    }
    return { ok: true, building: targetId, violations: found, pay };
  }
  function installSmokeAlarm(targetId) {
    const target = FIRE_INSPECTION_TARGETS.find((t) => t.id === targetId);
    if (!target) return { ok: false, reason: 'no-such-building' };
    const cost = 25;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.alarmsInstalled = (state.alarmsInstalled || 0) + 1;
    state.commendations += 0;
    log(`Smoke alarm installed at ${target.name} for $${cost}. One less fire waiting to happen.`);
    return { ok: true, building: targetId, cost };
  }
  function adoptFirehouseDog(name) {
    if (state.firehouseDog) return { ok: false, reason: 'already-have-dog' };
    state.firehouseDog = { name: name || 'Sparky', tricks: [], morale: 50 };
    log(`Station 7 adopts a firehouse dog: ${state.firehouseDog.name}! Morale at the station jumps.`);
    return { ok: true, dog: state.firehouseDog.name };
  }
  function trainFirehouseDog(trickId) {
    if (!state.firehouseDog) return { ok: false, reason: 'no-dog' };
    const trick = FIREHOUSE_DOG_TRICKS.find((t) => t.id === trickId);
    if (!trick) return { ok: false, reason: 'no-such-trick' };
    if (state.firehouseDog.tricks.includes(trickId)) return { ok: false, reason: 'already-known' };
    if (rng() < 0.3 + trick.difficulty * 0.1) {
      log(`${state.firehouseDog.name} just doesn't get ${trick.name} today. Try again tomorrow.`);
      return { ok: true, learned: false, trick: trickId };
    }
    state.firehouseDog.tricks.push(trickId);
    state.firehouseDog.morale = Math.min(100, state.firehouseDog.morale + 10);
    log(`${state.firehouseDog.name} learned ${trick.name}! Station morale up.`);
    return { ok: true, learned: true, trick: trickId };
  }
  function sellCharityCalendar() {
    if (state.callsDone < 10) return { ok: false, reason: 'need-10-calls', have: state.callsDone };
    const sold = 5 + Math.floor(rng() * 20);
    const earned = sold * 15;
    addCash(earned);
    state.totalEarned += earned;
    state.calendarsSold = (state.calendarsSold || 0) + sold;
    log(`Sold ${sold} firefighter charity calendars for $${earned}! The city loves Station 7.`);
    return { ok: true, sold, earned };
  }
  function trainRookie() {
    if (state.rank < 1) return { ok: false, reason: 'rank-too-low', need: 'Firefighter' };
    const cost = 0;
    const gain = 5 + Math.floor(rng() * 10);
    state.rookiesTrained = (state.rookiesTrained || 0) + 1;
    state.commendations += 1;
    log(`You train a rookie for the day. They learn fast. Commendation +1.`);
    return { ok: true, rookies: state.rookiesTrained, gain, cost };
  }
  function checkHydrants() {
    const count = 4 + Math.floor(rng() * 4);
    let broken = 0;
    for (let i = 0; i < count; i++) {
      if (rng() < 0.25) broken += 1;
    }
    const pay = count * 10;
    addCash(pay);
    state.totalEarned += pay;
    state.hydrantsChecked = (state.hydrantsChecked || 0) + count;
    log(`Checked ${count} hydrants, ${broken} need repair. Pay $${pay}.`);
    return { ok: true, checked: count, broken, pay };
  }
  function hostOpenHouse() {
    const cost = 200;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    if (state.callsDone < 5) return { ok: false, reason: 'need-5-calls', have: state.callsDone };
    addCash(-cost);
    const visitors = 30 + Math.floor(rng() * 70);
    const donations = Math.round(visitors * (2 + rng() * 5));
    addCash(donations);
    state.totalEarned += donations;
    state.openHouses = (state.openHouses || 0) + 1;
    log(`Station 7 open house: ${visitors} visitors, $${donations} in donations!`);
    return { ok: true, visitors, donations, cost };
  }
  function firePreventionTalk() {
    const pay = 60;
    addCash(pay);
    state.totalEarned += pay;
    state.talksGiven = (state.talksGiven || 0) + 1;
    log(`Fire prevention talk at the school. The kids love the truck. Pay $${pay}.`);
    return { ok: true, pay };
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
    repairTruck,
    upgradeStation,
    hosePower,
    tankCapacity,
    hasGear,
    rankInfo,
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
