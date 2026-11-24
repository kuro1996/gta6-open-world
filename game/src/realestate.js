export const PROPERTIES = [
  { id: 'shack', name: 'Dockside Shack', district: 'Docks', price: 900, baseRent: 45, baseValue: 900, blurb: 'Rough around the edges, but it is yours.' },
  { id: 'studio', name: 'Plaza Studio', district: 'Plaza', price: 2500, baseRent: 120, baseValue: 2500, blurb: 'A tidy studio above the plaza buzz.' },
  { id: 'flat', name: 'Marina Flat', district: 'Marina', price: 5200, baseRent: 260, baseValue: 5200, blurb: 'Salt air and a view of the boats.' },
  { id: 'loft', name: 'Downtown Loft', district: 'Downtown', price: 9800, baseRent: 480, baseValue: 9800, blurb: 'Brick walls, high ceilings, big rent.' },
  { id: 'beach-house', name: 'Beach House', district: 'Beach', price: 16000, baseRent: 800, baseValue: 16000, blurb: 'Sand on the doorstep, money in the bank.' },
  { id: 'villa', name: 'Hills Villa', district: 'Hills', price: 30000, baseRent: 1500, baseValue: 30000, blurb: 'The top of the hill, in every sense.' },
];

export const RENOVATIONS = [
  { tier: 1, name: 'Fresh Paint and Fixes', price: 400, valueGain: 0.25, rentGain: 0.3, blurb: 'A coat of paint and working taps.' },
  { tier: 2, name: 'Full Remodel', price: 1200, valueGain: 0.45, rentGain: 0.5, blurb: 'New kitchen, new floors, new tenants.' },
  { tier: 3, name: 'Luxury Finish', price: 3000, valueGain: 0.8, rentGain: 0.7, blurb: 'Marble, brass, and a view worth paying for.' },
];

const DISTRICT_BIAS = { Docks: -0.06, Plaza: 0.02, Marina: 0.06, Downtown: 0.04, Beach: 0.08, Hills: 0.1 };

export function createRealEstateSystem(ctx) {
  const c = ctx;
  const state = {
    owned: {},
    market: 1.0,
    lastDay: -1,
    bought: 0,
    sold: 0,
    flips: 0,
    rentEarned: 0,
    flipProfit: 0,
    totalSpent: 0,
    bestFlip: 0,
    lastSale: null,
  };

  function findProperty(id) {
    return PROPERTIES.find((p) => p.id === id) || null;
  }
  function findReno(tier) {
    return RENOVATIONS.find((r) => r.tier === tier) || null;
  }
  function say(msg) {
    if (typeof c.log === 'function') c.log(msg);
  }
  function dayNow() {
    return typeof c.getDay === 'function' ? c.getDay() : 1;
  }
  function roll() {
    return typeof c.rng === 'function' ? c.rng() : Math.random();
  }

  const sys = {
    currentValue(id) {
      const prop = findProperty(id);
      if (!prop) return 0;
      const held = state.owned[id];
      let mult = 1;
      if (held) {
        for (let t = 1; t <= held.tier; t++) {
          const reno = findReno(t);
          if (reno) mult += reno.valueGain;
        }
      }
      const bias = DISTRICT_BIAS[prop.district] || 0;
      return Math.floor(prop.baseValue * mult * state.market * (1 + bias));
    },

    currentRent(id) {
      const prop = findProperty(id);
      if (!prop) return 0;
      const held = state.owned[id];
      if (!held) return 0;
      let mult = 1;
      for (let t = 1; t <= held.tier; t++) {
        const reno = findReno(t);
        if (reno) mult += reno.rentGain;
      }
      return Math.floor(prop.baseRent * mult * state.market);
    },

    buyProperty(id) {
      const prop = findProperty(id);
      if (!prop) return { ok: false, reason: 'no-such-property' };
      if (state.owned[id]) return { ok: false, reason: 'already-owned' };
      const price = Math.floor(prop.price * state.market);
      if (c.getCash() < price) return { ok: false, reason: 'no-cash', need: price };
      c.addCash(-price);
      state.totalSpent += price;
      state.bought += 1;
      state.owned[id] = { tier: 0, boughtPrice: price, boughtDay: dayNow(), rentCollected: 0 };
      say('Bought ' + prop.name + ' for $' + price + '.');
      return { ok: true, property: prop.name, price, market: state.market };
    },

    renovate(id) {
      const held = state.owned[id];
      if (!held) return { ok: false, reason: 'not-owned' };
      if (held.tier >= 3) return { ok: false, reason: 'max-tier' };
      const reno = findReno(held.tier + 1);
      if (c.getCash() < reno.price) return { ok: false, reason: 'no-cash', need: reno.price };
      c.addCash(-reno.price);
      state.totalSpent += reno.price;
      held.tier += 1;
      const prop = findProperty(id);
      say('Renovated ' + prop.name + ' to tier ' + held.tier + ' for $' + reno.price + '.');
      return { ok: true, property: prop.name, tier: held.tier, price: reno.price, value: sys.currentValue(id), rent: sys.currentRent(id) };
    },

    sellProperty(id) {
      const held = state.owned[id];
      if (!held) return { ok: false, reason: 'not-owned' };
      const prop = findProperty(id);
      const value = sys.currentValue(id);
      const profit = value - held.boughtPrice;
      c.addCash(value);
      state.sold += 1;
      state.flips += 1;
      state.flipProfit += profit;
      if (profit > state.bestFlip) state.bestFlip = profit;
      state.lastSale = { id, name: prop.name, price: value, profit, tier: held.tier };
      delete state.owned[id];
      say('Sold ' + prop.name + ' for $' + value + ' (profit $' + profit + ').');
      return { ok: true, property: prop.name, price: value, profit };
    },

    tickDay(day) {
      if (day === state.lastDay) return { ok: false, reason: 'already-settled' };
      state.lastDay = day;
      state.market = Math.max(0.7, Math.min(1.5, state.market + (roll() * 0.12 - 0.06)));
      let total = 0;
      const per = [];
      for (const id of Object.keys(state.owned)) {
        const rent = sys.currentRent(id);
        total += rent;
        state.owned[id].rentCollected += rent;
        per.push({ id, rent });
      }
      if (total > 0) {
        c.addCash(total);
        state.rentEarned += total;
      }
      return { ok: true, day, market: state.market, rent: total, perProperty: per };
    },

    propertyStatus(id) {
      const prop = findProperty(id);
      if (!prop) return null;
      const held = state.owned[id];
      if (!held) {
        return { id, name: prop.name, district: prop.district, owned: false, price: Math.floor(prop.price * state.market), baseRent: prop.baseRent };
      }
      return {
        id,
        name: prop.name,
        district: prop.district,
        owned: true,
        tier: held.tier,
        value: sys.currentValue(id),
        rent: sys.currentRent(id),
        boughtPrice: held.boughtPrice,
        rentCollected: held.rentCollected,
      };
    },

    portfolio() {
      return PROPERTIES.map((p) => sys.propertyStatus(p.id));
    },

    stats() {
      let value = 0;
      for (const id of Object.keys(state.owned)) value += sys.currentValue(id);
      return {
        owned: Object.keys(state.owned).length,
        properties: Object.keys(state.owned),
        portfolioValue: value,
        market: state.market,
        bought: state.bought,
        sold: state.sold,
        flips: state.flips,
        rentEarned: state.rentEarned,
        flipProfit: state.flipProfit,
        totalSpent: state.totalSpent,
        bestFlip: state.bestFlip,
        lastSale: state.lastSale,
      };
    },

    hudLine() {
      if (Object.keys(state.owned).length === 0 && state.sold === 0) return '';
      return 'ESTATE ' + Object.keys(state.owned).length + ' owned | market ' + state.market.toFixed(2) + ' | rent $' + state.rentEarned;
    },

    serialize() {
      return {
        owned: JSON.parse(JSON.stringify(state.owned)),
        market: state.market,
        lastDay: state.lastDay,
        bought: state.bought,
        sold: state.sold,
        flips: state.flips,
        rentEarned: state.rentEarned,
        flipProfit: state.flipProfit,
        totalSpent: state.totalSpent,
        bestFlip: state.bestFlip,
        lastSale: state.lastSale ? JSON.parse(JSON.stringify(state.lastSale)) : null,
      };
    },

    deserialize(data) {
      if (!data || typeof data !== 'object') return;
      if (data.owned && typeof data.owned === 'object') state.owned = JSON.parse(JSON.stringify(data.owned));
      if (typeof data.market === 'number') state.market = data.market;
      if (typeof data.lastDay === 'number') state.lastDay = data.lastDay;
      if (typeof data.bought === 'number') state.bought = data.bought;
      if (typeof data.sold === 'number') state.sold = data.sold;
      if (typeof data.flips === 'number') state.flips = data.flips;
      if (typeof data.rentEarned === 'number') state.rentEarned = data.rentEarned;
      if (typeof data.flipProfit === 'number') state.flipProfit = data.flipProfit;
      if (typeof data.totalSpent === 'number') state.totalSpent = data.totalSpent;
      if (typeof data.bestFlip === 'number') state.bestFlip = data.bestFlip;
      if (data.lastSale) state.lastSale = JSON.parse(JSON.stringify(data.lastSale));
    },
  };
  return sys;
}
