export const CHOPSHOP_VERSION = 1;
export const DAILY_LIMIT = 4;

export const CAR_VALUES = [
  { model: 'sedan', name: 'Sedan', base: 180, weight: 1.0 },
  { model: 'hatchback', name: 'Hatchback', base: 150, weight: 1.0 },
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
  const found = CAR_VALUES.find((c) => c.model === model);
  return found || CAR_VALUES[0];
}

export function priceForCar(model, condition, heat, soldCount, neon) {
  const entry = carValueByModel(model);
  const condFactor = 0.35 + condition * 0.65;
  const heatBonus = 1 + heat * 0.12;
  const flood = Math.max(0.5, 1 - soldCount * 0.15);
  const neonBonus = neon ? 1.15 : 1;
  const price = Math.round(entry.base * condFactor * heatBonus * flood * neonBonus);
  return Math.max(20, price);
}

export function stripValue(model, condition) {
  return Math.round(priceForCar(model, condition, 0, 0, false) * 1.4);
}

export function resprayCost(model) {
  return Math.round(carValueByModel(model).base * 0.2);
}

export function createChopShopSystem(ctx) {
  const c = ctx || {};
  const state = {
    version: CHOPSHOP_VERSION,
    soldToday: 0,
    dayCount: 1,
    soldByModel: {},
    totalSold: 0,
    totalEarned: 0,
    totalStripped: 0,
    resprays: 0,
    bestSale: 0,
    bestCar: null,
    queue: [],
    log: [],
  };

  function note(msg) {
    state.log.push(msg);
    if (state.log.length > 40) state.log.shift();
    if (typeof c.log === 'function') c.log(msg);
  }
  function cashIn(amount) {
    if (typeof c.addCash === 'function') c.addCash(amount);
    else if (typeof c.cash === 'number') c.cash += amount;
  }
  function cashNow() {
    if (typeof c.getCash === 'function') return c.getCash();
    return typeof c.cash === 'number' ? c.cash : 0;
  }
  function heatNow() {
    if (typeof c.getHeatLevel === 'function') return c.getHeatLevel();
    return typeof c.heat === 'number' ? c.heat : 0;
  }
  function dayNow() {
    return typeof c.getDay === 'function' ? c.getDay() : state.dayCount;
  }
  function refreshDay() {
    const d = dayNow();
    if (d !== state.dayCount) {
      state.dayCount = d;
      state.soldToday = 0;
    }
  }

  const sys = {
    name: 'chopshop',
    version: CHOPSHOP_VERSION,
    state,
    cars: CAR_VALUES,

    quote(model, condition, heat, neon) {
      refreshDay();
      const price = priceForCar(model, condition, heat, state.soldByModel[model] || 0, neon);
      return { ok: true, model, price, condition, heat, soldToday: state.soldToday, limit: DAILY_LIMIT };
    },

    sellCar(car) {
      refreshDay();
      if (state.soldToday >= DAILY_LIMIT) return { ok: false, reason: 'daily-limit' };
      const heat = heatNow();
      const price = priceForCar(car.model, car.condition, car.heat || 0, state.soldByModel[car.model] || 0, car.hasNeon);
      state.soldToday += 1;
      state.soldByModel[car.model] = (state.soldByModel[car.model] || 0) + 1;
      state.totalSold += 1;
      state.totalEarned += price;
      if (price > state.bestSale) {
        state.bestSale = price;
        state.bestCar = car.model;
      }
      cashIn(price);
      if (typeof c.addHeat === 'function') c.addHeat(Math.round(2 + (car.heat || 0) * 2));
      note('Sold ' + car.model + ' for $' + price + ' at the chop shop.');
      if (typeof c.onSellCar === 'function') c.onSellCar(car, price);
      return { ok: true, price, soldToday: state.soldToday };
    },

    stripCar(car) {
      const value = stripValue(car.model, car.condition);
      state.queue.push({ model: car.model, condition: car.condition, hoursLeft: 1, value });
      state.totalStripped += 1;
      note('Stripping ' + car.model + ' for $' + value + ' (1 hour).');
      return { ok: true, value, hoursLeft: 1 };
    },

    tickHour() {
      refreshDay();
      let done = 0;
      let total = 0;
      const remaining = [];
      for (const job of state.queue) {
        job.hoursLeft -= 1;
        if (job.hoursLeft <= 0) {
          done += 1;
          total += job.value;
          state.soldByModel[job.model] = (state.soldByModel[job.model] || 0) + 1;
        } else {
          remaining.push(job);
        }
      }
      state.queue = remaining;
      if (done > 0) {
        cashIn(total);
        state.totalEarned += total;
        note('Strip-down finished: ' + done + ' car(s), $' + total + '.');
      }
      return { ok: true, done, total };
    },

    respray(model) {
      const cost = resprayCost(model);
      if (cashNow() < cost) return { ok: false, reason: 'not-enough-cash', need: cost };
      cashIn(-cost);
      state.resprays += 1;
      note('Resprayed ' + model + ' for $' + cost + '. Heat cleared.');
      return { ok: true, cost, heatCleared: true };
    },

    stats() {
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
    },

    serialize() {
      return JSON.parse(JSON.stringify(state));
    },

    deserialize(data) {
      if (!data || data.version !== CHOPSHOP_VERSION) return false;
      const copy = JSON.parse(JSON.stringify(data));
      for (const k of Object.keys(state)) delete state[k];
      Object.assign(state, copy);
      return true;
    },

    hudLine() {
      if (state.queue.length > 0) return 'CHOPSHOP stripping ' + state.queue.length + ' car(s)';
      if (state.soldToday > 0) return 'CHOPSHOP ' + state.soldToday + '/' + DAILY_LIMIT + ' sold | $' + state.totalEarned;
      return '';
    },
  };
  return sys;
}

export default createChopShopSystem;
