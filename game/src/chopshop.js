// Solara Nights — Chop Shop (round 4 attempt 6, NEW module).
// Bring a stolen car to Vinnie's Chop Shop and it disappears into
// parts — and parts are money. The payout depends on the car: its
// model, its condition, and how hot it is. A pristine sports car pays
// thousands; a dented sedan pays pocket change; a car the whole city
// is looking for pays a premium because Vinnie has to move fast —
// but selling a hot car also raises the player's heat, and Vinnie
// only takes so many cars a day before he tells the player to come
// back tomorrow. Selling the same model over and over floods his
// market and the price drops, so variety pays.
//
// The shop also offers a strip-down service: instead of selling the
// whole car, the player can strip it for parts (takes time, pays
// more, but the car is gone either way) or order a respray to cool
// a hot car down before selling it clean. The module is self-contained
// and talks to the game only through the optional `ctx` hooks.

export const CHOPSHOP_VERSION = 1;
export const DAILY_LIMIT = 4;

export const CAR_VALUES = [
  { model: 'sedan', name: 'Sedan', base: 180, weight: 1.0 },
  { model: 'hatch', name: 'Hatchback', base: 150, weight: 1.0 },
  { model: 'van', name: 'Van', base: 220, weight: 1.2 },
  { model: 'taxi', name: 'Taxi', base: 200, weight: 1.0 },
  { model: 'muscle', name: 'Muscle Car', base: 650, weight: 1.4 },
  { model: 'convertible', name: 'Convertible', base: 800, weight: 1.3 },
  { model: 'sports', name: 'Sports Car', base: 1400, weight: 1.5 },
  { model: 'supercar', name: 'Supercar', base: 2600, weight: 1.8 },
  { model: 'pickup', name: 'Pickup Truck', base: 320, weight: 1.2 },
  { model: 'limo', name: 'Limo', base: 1100, weight: 1.6 },
];

export function carValueByModel(model) {
  return CAR_VALUES.find((c) => c.model === model) || CAR_VALUES[0];
}

// Condition 0..1 (1 = showroom), heat 0..5 (wanted level at sale time).
export function priceForCar(model, condition, heat, soldSameModel, hasNeon) {
  const car = carValueByModel(model);
  const condFactor = 0.35 + condition * 0.65;
  const heatBonus = 1 + heat * 0.12; // hot cars pay more — risk premium
  const flood = Math.max(0.5, 1 - soldSameModel * 0.15);
  const neonBonus = hasNeon ? 1.15 : 1;
  return Math.max(20, Math.round(car.base * condFactor * heatBonus * flood * neonBonus));
}

export function stripValue(model, condition) {
  // Stripping pays ~40% more but takes a full in-game hour.
  return Math.round(priceForCar(model, condition, 0, 0, false) * 1.4);
}

export function resprayCost(model) {
  return Math.round(carValueByModel(model).base * 0.2);
}

export function createChopShopSystem(ctx = {}) {
  const state = {
    version: CHOPSHOP_VERSION,
    soldToday: 0,
    dayCount: 1,
    soldByModel: {}, // model -> count (lifetime, for flood pricing)
    totalSold: 0,
    totalEarned: 0,
    totalStripped: 0,
    resprays: 0,
    bestSale: 0,
    bestCar: null,
    queue: [], // cars waiting to be stripped: { model, condition, hoursLeft, value }
    log: [],
  };

  function note(msg) {
    state.log.push(msg);
    if (state.log.length > 40) state.log.shift();
    if (typeof ctx.log === 'function') ctx.log(msg);
  }

  function addCash(amount) {
    if (typeof ctx.addCash === 'function') ctx.addCash(amount);
    else if (typeof ctx.cash === 'number') ctx.cash += amount;
  }

  function cash() {
    return typeof ctx.getCash === 'function' ? ctx.getCash() : (ctx.cash ?? 0);
  }

  function addHeat(amount) {
    if (typeof ctx.addHeat === 'function') ctx.addHeat(amount);
  }

  function heatLevel() {
    if (typeof ctx.getHeatLevel === 'function') return ctx.getHeatLevel();
    return typeof ctx.heat === 'number' ? ctx.heat : 0;
  }

  function dayNow() {
    if (typeof ctx.getDay === 'function') return ctx.getDay();
    return state.dayCount;
  }

  function refreshDay() {
    const day = dayNow();
    if (day !== state.dayCount) {
      state.dayCount = day;
      state.soldToday = 0;
      note(`🔧 Vinnie's is open again — daily limit reset (${DAILY_LIMIT} cars/day).`);
    }
  }

  function quote(model, condition, heat, hasNeon = false) {
    refreshDay();
    const price = priceForCar(model, condition, heat, state.soldByModel[model] || 0, hasNeon);
    return { model, price, condition, heat, soldToday: state.soldToday, limit: DAILY_LIMIT };
  }

  function sellCar(car) {
    // car: { model, condition (0..1), heat (0..5), hasNeon }
    refreshDay();
    if (state.soldToday >= DAILY_LIMIT) {
      return { ok: false, reason: 'daily-limit', limit: DAILY_LIMIT };
    }
    const price = priceForCar(car.model, car.condition ?? 1, car.heat ?? 0,
      state.soldByModel[car.model] || 0, !!car.hasNeon);
    state.soldToday += 1;
    state.totalSold += 1;
    state.totalEarned += price;
    state.soldByModel[car.model] = (state.soldByModel[car.model] || 0) + 1;
    if (price > state.bestSale) {
      state.bestSale = price;
      state.bestCar = car.model;
    }
    addCash(price);
    const heatGain = Math.round(2 + (car.heat || 0) * 2);
    addHeat(heatGain);
    note(`🔧 Sold ${carValueByModel(car.model).name} to Vinnie for $${price} (heat +${heatGain}). ${DAILY_LIMIT - state.soldToday} slots left today.`);
    if (typeof ctx.onSellCar === 'function') ctx.onSellCar(car, price);
    return { ok: true, price, soldToday: state.soldToday };
  }

  function stripCar(car) {
    // Queue the car for stripping: pays more, takes 1 in-game hour.
    const value = stripValue(car.model, car.condition ?? 1);
    state.queue.push({
      model: car.model, condition: car.condition ?? 1,
      hoursLeft: 1, value,
    });
    state.totalStripped += 1;
    note(`🔧 ${carValueByModel(car.model).name} on the lift — strip-down pays $${value} in an hour.`);
    return { ok: true, value, hoursLeft: 1 };
  }

  function tickHour() {
    refreshDay();
    for (const item of state.queue) item.hoursLeft -= 1;
    const done = state.queue.filter((i) => i.hoursLeft <= 0);
    state.queue = state.queue.filter((i) => i.hoursLeft > 0);
    let total = 0;
    for (const item of done) {
      total += item.value;
      state.totalEarned += item.value;
      state.soldByModel[item.model] = (state.soldByModel[item.model] || 0) + 1;
    }
    if (done.length) {
      addCash(total);
      note(`🔧 Strip-down finished: ${done.length} car(s), $${total} in parts.`);
    }
    return { done: done.length, total };
  }

  function respray(model) {
    const cost = resprayCost(model);
    if (cash() < cost) return { ok: false, reason: 'not-enough-cash' };
    addCash(-cost);
    state.resprays += 1;
    note(`🔧 Respray on the ${carValueByModel(model).name} — $${cost}. The heat is off this one.`);
    return { ok: true, cost, heatCleared: true };
  }

  function stats() {
    return {
      soldToday: state.soldToday,
      limit: DAILY_LIMIT,
      totalSold: state.totalSold,
      totalEarned: state.totalEarned,
      totalStripped: state.totalStripped,
      bestSale: state.bestSale,
      bestCar: state.bestCar,
      queue: state.queue.length,
      resprays: state.resprays,
    };
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(data) {
    if (!data || data.version !== CHOPSHOP_VERSION) return false;
    Object.assign(state, data);
    return true;
  }

  function hudLine() {
    if (state.queue.length) return `🔧 Chop shop: ${state.queue.length} car(s) being stripped`;
    if (state.soldToday > 0) return `🔧 Chop shop: ${state.soldToday}/${DAILY_LIMIT} sold today — $${state.totalEarned} total`;
    return '';
  }

  return {
    name: 'chopshop',
    version: CHOPSHOP_VERSION,
    state,
    cars: CAR_VALUES,
    quote,
    sellCar,
    stripCar,
    tickHour,
    respray,
    stats,
    serialize,
    deserialize,
    hudLine,
  };
}

export default createChopShopSystem;
