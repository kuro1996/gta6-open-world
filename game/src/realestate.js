// Solara Nights — Real-Estate Flipping (Round 6 attempt 8).
// Buy Solara Bay's worst properties, renovate them, and flip or rent
// them out. The market moves every day — a renovated loft in a hot
// district sells for double, a flop in a dead district barely covers
// the paint. Rent trickles in daily; a flip is one big payday (or one
// big lesson). Three renovation tiers per property, each raising value
// and rent; the market index drifts with the dice, so timing matters.
// The system owns its state and only touches the game through the small
// ctx hooks below (rng / getCash / addCash / log / getDay), the same
// factory pattern as arcade.js / bank.js / tuning.js.

export const PROPERTIES = [
  {
    id: 'dock-shack',
    name: 'Dockside Shack',
    district: 'Docks',
    price: 900,
    baseRent: 45,
    baseValue: 900,
    blurb: 'Four walls, a roof (mostly), and a smell the sea cannot wash out.',
  },
  {
    id: 'plaza-studio',
    name: 'Plaza Studio',
    district: 'Plaza',
    price: 2500,
    baseRent: 120,
    baseValue: 2500,
    blurb: 'One room over the square. Small, sunny, and always in demand.',
  },
  {
    id: 'marina-flat',
    name: 'Marina Flat',
    district: 'Marina',
    price: 5200,
    baseRent: 260,
    baseValue: 5200,
    blurb: 'Water views, salt air, and a balcony made for slow mornings.',
  },
  {
    id: 'downtown-loft',
    name: 'Downtown Loft',
    district: 'Downtown',
    price: 9800,
    baseRent: 480,
    baseValue: 9800,
    blurb: 'Brick, beam and twelve-foot windows. The city’s creative class wants in.',
  },
  {
    id: 'beach-house',
    name: 'Beach House',
    district: 'Beach',
    price: 16000,
    baseRent: 800,
    baseValue: 16000,
    blurb: 'Sand at the door, sunset from the deck. The postcard that pays you.',
  },
  {
    id: 'hills-villa',
    name: 'Hills Villa',
    district: 'Hills',
    price: 30000,
    baseRent: 1500,
    baseValue: 30000,
    blurb: 'Gated, glassed, and глядящий over the whole bay. The endgame address.',
  },
];

export const RENOVATIONS = [
  { tier: 1, name: 'Fresh Paint & Fixes', price: 400, valueGain: 0.25, rentGain: 0.3, blurb: 'Paint, pipes, and a door that locks.' },
  { tier: 2, name: 'Full Remodel', price: 1200, valueGain: 0.45, rentGain: 0.5, blurb: 'New kitchen, new bath, new everything that shows.' },
  { tier: 3, name: 'Luxury Finish', price: 3000, valueGain: 0.8, rentGain: 0.7, blurb: 'Marble, brass, and a smart home that answers back.' },
];

// Market index: 1.00 is flat. Each day it drifts ±6%; districts get a
// small permanent bias so the marina and hills trend up, the docks down.
const DISTRICT_BIAS = { Docks: -0.06, Plaza: 0.02, Marina: 0.06, Downtown: 0.04, Beach: 0.08, Hills: 0.1 };

export function createRealEstateSystem(ctx) {
  const state = {
    owned: {}, // propertyId -> { tier, boughtPrice, boughtDay, rentCollected }
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

  function propertyById(id) {
    return PROPERTIES.find((p) => p.id === id) || null;
  }

  function renoByTier(tier) {
    return RENOVATIONS.find((r) => r.tier === tier) || null;
  }

  // Current value: base x (1 + renovation gains) x market x district bias.
  function currentValue(id) {
    const prop = propertyById(id);
    const owned = state.owned[id];
    if (!prop) return 0;
    let mult = 1;
    if (owned) {
      for (let t = 1; t <= owned.tier; t += 1) {
        const r = renoByTier(t);
        if (r) mult += r.valueGain;
      }
    }
    const bias = DISTRICT_BIAS[prop.district] || 0;
    return Math.floor(prop.baseValue * mult * state.market * (1 + bias));
  }

  function currentRent(id) {
    const prop = propertyById(id);
    const owned = state.owned[id];
    if (!prop || !owned) return 0;
    let mult = 1;
    for (let t = 1; t <= owned.tier; t += 1) {
      const r = renoByTier(t);
      if (r) mult += r.rentGain;
    }
    return Math.floor(prop.baseRent * mult * state.market);
  }

  function buyProperty(id) {
    const prop = propertyById(id);
    if (!prop) return { ok: false, reason: 'no-such-property' };
    if (state.owned[id]) return { ok: false, reason: 'already-owned' };
    const price = Math.floor(prop.price * state.market);
    if (ctx.getCash() < price) return { ok: false, reason: 'no-cash', need: price };
    ctx.addCash(-price);
    state.totalSpent += price;
    state.bought += 1;
    state.owned[id] = { tier: 0, boughtPrice: price, boughtDay: ctx.getDay ? ctx.getDay() : 1, rentCollected: 0 };
    ctx.log(`Bought ${prop.name} for $${price} — market index ${state.market.toFixed(2)}.`);
    return { ok: true, property: prop.name, price, market: state.market };
  }

  function renovate(id) {
    const prop = propertyById(id);
    const owned = state.owned[id];
    if (!prop || !owned) return { ok: false, reason: 'not-owned' };
    const nextTier = owned.tier + 1;
    const reno = renoByTier(nextTier);
    if (!reno) return { ok: false, reason: 'max-tier' };
    if (ctx.getCash() < reno.price) return { ok: false, reason: 'no-cash', need: reno.price };
    ctx.addCash(-reno.price);
    state.totalSpent += reno.price;
    owned.tier = nextTier;
    ctx.log(`${reno.name} at ${prop.name} — $${reno.price}. Now worth $${currentValue(id)}.`);
    return { ok: true, property: prop.name, tier: nextTier, price: reno.price, value: currentValue(id), rent: currentRent(id) };
  }

  function sellProperty(id) {
    const prop = propertyById(id);
    const owned = state.owned[id];
    if (!prop || !owned) return { ok: false, reason: 'not-owned' };
    const price = currentValue(id);
    const profit = price - owned.boughtPrice;
    ctx.addCash(price);
    state.sold += 1;
    state.flips += 1;
    state.flipProfit += profit;
    if (profit > state.bestFlip) state.bestFlip = profit;
    state.lastSale = { id, name: prop.name, price, profit, tier: owned.tier };
    delete state.owned[id];
    ctx.log(`Sold ${prop.name} for $${price} (${profit >= 0 ? '+' : ''}$${profit}).`);
    return { ok: true, property: prop.name, price, profit };
  }

  // Daily tick: the market drifts, then every owned property pays rent.
  // Called once per in-game day from main.js.
  function tickDay(day) {
    if (day === state.lastDay) return { ok: false, reason: 'already-settled' };
    state.lastDay = day;
    const drift = (ctx.rng ? ctx.rng() : Math.random()) * 0.12 - 0.06;
    state.market = Math.max(0.7, Math.min(1.5, state.market + drift));
    let rent = 0;
    const perProperty = [];
    for (const id of Object.keys(state.owned)) {
      const r = currentRent(id);
      rent += r;
      state.owned[id].rentCollected += r;
      perProperty.push({ id, rent: r });
    }
    if (rent > 0) {
      ctx.addCash(rent);
      state.rentEarned += rent;
    }
    return { ok: true, day, market: state.market, rent, perProperty };
  }

  function propertyStatus(id) {
    const prop = propertyById(id);
    if (!prop) return null;
    const owned = state.owned[id];
    if (!owned) {
      return { id, name: prop.name, district: prop.district, owned: false, price: Math.floor(prop.price * state.market), baseRent: prop.baseRent };
    }
    return {
      id, name: prop.name, district: prop.district, owned: true,
      tier: owned.tier, value: currentValue(id), rent: currentRent(id),
      boughtPrice: owned.boughtPrice, rentCollected: owned.rentCollected,
    };
  }

  function portfolio() {
    return PROPERTIES.map((p) => propertyStatus(p.id));
  }

  function stats() {
    const ownedCount = Object.keys(state.owned).length;
    const portfolioValue = Object.keys(state.owned).reduce((sum, id) => sum + currentValue(id), 0);
    return {
      owned: ownedCount,
      properties: Object.keys(state.owned),
      portfolioValue,
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
  }

  function hudLine() {
    const n = Object.keys(state.owned).length;
    if (!n && state.sold === 0) return '';
    return `ESTATE ${n} owned · market ${state.market.toFixed(2)} · rent +$${state.rentEarned}`;
  }

  function serialize() {
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
      lastSale: state.lastSale ? { ...state.lastSale } : null,
    };
  }

  function deserialize(data) {
    if (!data || typeof data !== 'object') return;
    if (data.owned) state.owned = JSON.parse(JSON.stringify(data.owned));
    if (typeof data.market === 'number') state.market = data.market;
    if (typeof data.lastDay === 'number') state.lastDay = data.lastDay;
    if (typeof data.bought === 'number') state.bought = data.bought;
    if (typeof data.sold === 'number') state.sold = data.sold;
    if (typeof data.flips === 'number') state.flips = data.flips;
    if (typeof data.rentEarned === 'number') state.rentEarned = data.rentEarned;
    if (typeof data.flipProfit === 'number') state.flipProfit = data.flipProfit;
    if (typeof data.totalSpent === 'number') state.totalSpent = data.totalSpent;
    if (typeof data.bestFlip === 'number') state.bestFlip = data.bestFlip;
    if (data.lastSale) state.lastSale = { ...data.lastSale };
  }

  return {
    buyProperty, renovate, sellProperty, tickDay,
    currentValue, currentRent, propertyStatus, portfolio,
    stats, hudLine, serialize, deserialize, state,
  };
}
