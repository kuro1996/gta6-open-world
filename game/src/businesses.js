export const BUSINESS_VERSION = 1;

export const BUSINESS_TYPES = [
  { id: 'laundromat', name: 'Spin Cycle Laundromat', price: 800, incomePerHour: 12, upkeepPerHour: 2, risk: 0.05, x: -120, z: 80, description: 'Quiet cash, clean clothes.', perk: 'heat-wash' },
  { id: 'garage', name: 'Reyes Auto Garage', price: 1500, incomePerHour: 22, upkeepPerHour: 5, risk: 0.08, x: 60, z: -140, description: 'Fixes cars and reputations.', perk: 'cheap-repairs' },
  { id: 'bar', name: 'Neon Palms Bar', price: 2500, incomePerHour: 40, upkeepPerHour: 9, risk: 0.14, x: 180, z: 40, description: 'The late-night crowd pays well.', perk: 'smuggling-contacts' },
  { id: 'diner', name: 'Sunrise Diner', price: 1200, incomePerHour: 16, upkeepPerHour: 3, risk: 0.04, x: -200, z: -60, description: 'Breakfast all day, money all night.', perk: 'health-refill' },
  { id: 'arcade', name: 'Pixel Palace Arcade', price: 2000, incomePerHour: 30, upkeepPerHour: 7, risk: 0.1, x: 40, z: 200, description: 'Tokens in, cash out.', perk: 'stunt-bonus' },
];

export function businessById(id) {
  return BUSINESS_TYPES.find((b) => b.id === id) || null;
}

export function isNightHour(hour) {
  return hour >= 20 || hour < 5;
}

export function hourlyIncome(business, hour, condition) {
  let income = business.incomePerHour;
  if (business.id === 'bar' && isNightHour(hour)) income *= 1.5;
  if (business.id === 'arcade' && hour >= 15 && hour <= 19) income *= 1.25;
  if (business.id === 'diner' && hour >= 6 && hour <= 10) income *= 1.3;
  income *= 0.5 + condition * 0.5;
  return Math.round(income);
}

export function raidChancePerHour(business, heat) {
  let mod = 1;
  if (heat >= 3) mod = 2;
  else if (heat === 0) mod = 0.5;
  return business.risk * mod;
}

export function repairCost(business, condition) {
  return Math.round(business.price * 0.25 * (1 - condition));
}

export function createBusinessSystem(ctx) {
  const c = ctx || {};
  const state = {
    version: BUSINESS_VERSION,
    owned: {},
    totalEarned: 0,
    totalSpent: 0,
    totalRaids: 0,
    totalCollected: 0,
    log: [],
  };

  function say(msg) {
    state.log.push(msg);
    if (state.log.length > 40) state.log.shift();
    if (typeof c.log === 'function') c.log(msg);
  }
  function roll() {
    return typeof c.rng === 'function' ? c.rng() : Math.random();
  }
  function cashIn(amount) {
    if (typeof c.addCash === 'function') c.addCash(amount);
    else if (typeof c.cash === 'number') c.cash += amount;
  }
  function cashNow() {
    return typeof c.getCash === 'function' ? c.getCash() : 0;
  }
  function heatNow() {
    if (typeof c.getHeatLevel === 'function') return c.getHeatLevel();
    return typeof c.heat === 'number' ? c.heat : 0;
  }
  function hourNow() {
    return typeof c.getHour === 'function' ? c.getHour() : 12;
  }
  function uncollectedTotal() {
    let sum = 0;
    for (const id of Object.keys(state.owned)) sum += state.owned[id].uncollected;
    return sum;
  }

  const sys = {
    name: 'businesses',
    version: BUSINESS_VERSION,
    state,
    types: BUSINESS_TYPES,

    buy(id) {
      const biz = businessById(id);
      if (!biz) return { ok: false, reason: 'unknown-business' };
      if (state.owned[id]) return { ok: false, reason: 'already-owned' };
      if (cashNow() < biz.price) return { ok: false, reason: 'not-enough-cash', need: biz.price };
      cashIn(-biz.price);
      state.totalSpent += biz.price;
      state.owned[id] = { condition: 1, uncollected: 0, hoursOwned: 0, raids: 0, shutdownUntil: 0, visits: 1 };
      say('Bought ' + biz.name + ' for $' + biz.price + '. Perk: ' + biz.perk + '.');
      if (typeof c.onBuyBusiness === 'function') c.onBuyBusiness(biz);
      return { ok: true, business: id };
    },

    sell(id) {
      const held = state.owned[id];
      if (!held) return { ok: false, reason: 'not-owned' };
      const biz = businessById(id);
      const refund = Math.round(biz.price * 0.6 * held.condition) + held.uncollected;
      delete state.owned[id];
      cashIn(refund);
      say('Sold ' + biz.name + ' for $' + refund + '.');
      return { ok: true, refund };
    },

    tickHour(hour) {
      const h = hour === undefined ? hourNow() : hour;
      const heat = heatNow();
      for (const id of Object.keys(state.owned)) {
        const held = state.owned[id];
        const biz = businessById(id);
        held.hoursOwned += 1;
        if (h < held.shutdownUntil) continue;
        const net = Math.max(0, hourlyIncome(biz, h, held.condition) - biz.upkeepPerHour);
        held.uncollected += net;
        state.totalEarned += net;
        held.condition = Math.max(0.2, held.condition - (0.004 + heat * 0.001));
        if (roll() < raidChancePerHour(biz, heat)) {
          const stolen = Math.floor(held.uncollected / 2);
          held.uncollected -= stolen;
          held.condition = Math.max(0.2, held.condition - 0.25);
          held.raids += 1;
          held.shutdownUntil = h + 4;
          state.totalRaids += 1;
          say('Raid at ' + biz.name + '! Lost $' + stolen + ', shut down for 4 hours.');
          if (typeof c.onRaid === 'function') c.onRaid(biz);
        }
      }
    },

    collect(id) {
      const held = state.owned[id];
      if (!held) return { ok: false, reason: 'not-owned' };
      if (held.uncollected <= 0) return { ok: false, reason: 'nothing-to-collect' };
      const amount = held.uncollected;
      held.uncollected = 0;
      held.visits += 1;
      state.totalCollected += amount;
      cashIn(amount);
      say('Collected $' + amount + ' from ' + id + '.');
      if (id === 'laundromat' && typeof c.reduceHeat === 'function') c.reduceHeat(10);
      return { ok: true, amount };
    },

    collectAll() {
      let total = 0;
      let count = 0;
      for (const id of Object.keys(state.owned)) {
        const res = sys.collect(id);
        if (res.ok) {
          total += res.amount;
          count += 1;
        }
      }
      return { ok: count > 0, total, count };
    },

    repair(id) {
      const held = state.owned[id];
      if (!held) return { ok: false, reason: 'not-owned' };
      const biz = businessById(id);
      const cost = repairCost(biz, held.condition);
      if (cost <= 0) return { ok: false, reason: 'already-perfect' };
      if (cashNow() < cost) return { ok: false, reason: 'not-enough-cash', need: cost };
      cashIn(-cost);
      held.condition = 1;
      say('Repaired ' + biz.name + ' for $' + cost + '.');
      return { ok: true, cost };
    },

    visit(id) {
      const held = state.owned[id];
      if (!held) return { ok: false, reason: 'not-owned' };
      held.visits += 1;
      return { ok: true, business: held };
    },

    ownedCount() {
      return Object.keys(state.owned).length;
    },

    hasPerk(perkId) {
      return !!state.owned[perkId];
    },

    kingOfTheBay() {
      return sys.ownedCount() >= 3;
    },

    projectedHourly(hour) {
      const h = hour === undefined ? hourNow() : hour;
      let sum = 0;
      for (const id of Object.keys(state.owned)) {
        const biz = businessById(id);
        sum += Math.max(0, hourlyIncome(biz, h, state.owned[id].condition) - biz.upkeepPerHour);
      }
      if (sys.kingOfTheBay()) sum = Math.round(sum * 1.15);
      return sum;
    },

    stats() {
      return {
        owned: sys.ownedCount(),
        totalEarned: state.totalEarned,
        totalSpent: state.totalSpent,
        totalCollected: state.totalCollected,
        totalRaids: state.totalRaids,
        projectedHourly: sys.projectedHourly(),
        kingOfTheBay: sys.kingOfTheBay(),
        uncollected: uncollectedTotal(),
      };
    },

    serialize() {
      return JSON.parse(JSON.stringify(state));
    },

    deserialize(data) {
      if (!data || data.version !== BUSINESS_VERSION) return false;
      const copy = JSON.parse(JSON.stringify(data));
      for (const k of Object.keys(state)) delete state[k];
      Object.assign(state, copy);
      return true;
    },

    hudLine() {
      if (sys.ownedCount() === 0) return '';
      return 'BUSINESS ' + sys.ownedCount() + ' owned | $' + uncollectedTotal() + ' uncollected | $' + sys.projectedHourly() + '/hr';
    },
  };
  return sys;
}

export default createBusinessSystem;
