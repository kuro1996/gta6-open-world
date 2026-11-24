export const MARKET_GOODS = [
  { id: 'silk', name: 'Silk Scarves', basePrice: 45, volatility: 0.12, blurb: 'Soft scarves dyed in harbour colours.' },
  { id: 'jade', name: 'Jade Charms', basePrice: 120, volatility: 0.15, blurb: 'Small carved charms, said to bring luck.' },
  { id: 'lantern', name: 'Brass Lanterns', basePrice: 85, volatility: 0.10, blurb: 'Warm lanterns for night market stalls.' },
  { id: 'spice', name: 'Spice Bundles', basePrice: 30, volatility: 0.18, blurb: 'Fragrant bundles from the far docks.' },
  { id: 'tea', name: 'Tea Crates', basePrice: 60, volatility: 0.09, blurb: 'Crates of leaf tea, still smelling of rain.' },
  { id: 'vase', name: 'Porcelain Vases', basePrice: 220, volatility: 0.14, blurb: 'Thin porcelain, painted by hand.' },
  { id: 'incense', name: 'Incense Sticks', basePrice: 18, volatility: 0.08, blurb: 'Slow smoke for quiet evenings.' },
  { id: 'fan', name: 'Carved Fans', basePrice: 95, volatility: 0.11, blurb: 'Fans carved with harbour scenes.' },
  { id: 'bangle', name: 'Silver Bangles', basePrice: 180, volatility: 0.16, blurb: 'Bright silver, polished to a shine.' },
  { id: 'wine', name: 'Rice Wine Jars', basePrice: 40, volatility: 0.20, blurb: 'Sealed jars, strong and sweet.' },
];

const STALL_RENT = 400;
const STALL_DAYS = 7;
const STALL_MULT = 1.15;
const HAGGLE_LIMIT = 0.12;
const HAGGLE_WIN = 0.6;
const EVENT_CHANCE = 0.2;
const PRICE_LOW = 0.4;
const PRICE_HIGH = 2.5;
const MAX_TRADE = 99;

function two(n) {
  return Math.round(n * 100) / 100;
}

function findGood(id) {
  for (const g of MARKET_GOODS) if (g.id === id) return g;
  return null;
}

export function createNightMarketSystem(deps) {
  const d = deps || {};
  const rnd = typeof d.rng === 'function' ? d.rng : Math.random;
  const dayOf = typeof d.getDay === 'function' ? d.getDay : () => 1;
  const cashOf = typeof d.getCash === 'function' ? d.getCash : () => 0;
  const moveCash = typeof d.addCash === 'function' ? d.addCash : () => {};
  const say = typeof d.log === 'function' ? d.log : () => {};
  const heatOf = typeof d.getHeatLevel === 'function' ? d.getHeatLevel : () => 0;

  const prices = {};
  for (const g of MARKET_GOODS) prices[g.id] = g.basePrice;

  const state = {
    inventory: {},
    prices,
    haggled: {},
    stallOwned: false,
    stallDaysLeft: 0,
    activeEvent: null,
    recentEvents: [],
    totalSpent: 0,
    totalEarned: 0,
    trades: 0,
    hagglesWon: 0,
    hagglesLost: 0,
    lastTickedDay: 0,
  };

  function priceOf(id) {
    const g = findGood(id);
    if (!g) return null;
    return state.prices[id];
  }

  function buy(id, qty) {
    const g = findGood(id);
    if (!g) return { ok: false, reason: 'unknown-good' };
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_TRADE) return { ok: false, reason: 'bad-quantity' };
    let unit = state.prices[id];
    let wasHaggled = false;
    if (state.haggled[id] !== undefined) {
      unit = state.haggled[id];
      wasHaggled = true;
    }
    const cost = two(unit * qty);
    if (cashOf() < cost) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-cost);
    delete state.haggled[id];
    state.inventory[id] = (state.inventory[id] || 0) + qty;
    state.totalSpent = two(state.totalSpent + cost);
    state.trades += 1;
    say('Bought ' + qty + ' ' + g.name + ' for $' + cost + '.');
    return { ok: true, goodId: id, goodName: g.name, quantity: qty, unitPrice: two(unit), cost, haggled: wasHaggled, held: state.inventory[id] };
  }

  function sell(id, qty) {
    const g = findGood(id);
    if (!g) return { ok: false, reason: 'unknown-good' };
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_TRADE) return { ok: false, reason: 'bad-quantity' };
    const held = state.inventory[id] || 0;
    if (held < qty) return { ok: false, reason: 'not-enough-stock' };
    const mult = state.stallOwned ? STALL_MULT : 1;
    const unit = two(state.prices[id] * mult);
    const revenue = two(unit * qty);
    moveCash(revenue);
    const left = held - qty;
    if (left <= 0) delete state.inventory[id]; else state.inventory[id] = left;
    state.totalEarned = two(state.totalEarned + revenue);
    state.trades += 1;
    say('Sold ' + qty + ' ' + g.name + ' for $' + revenue + '.');
    return { ok: true, goodId: id, goodName: g.name, quantity: qty, unitPrice: unit, multiplier: mult, revenue, held: state.inventory[id] || 0 };
  }

  function haggle(id, offer) {
    const g = findGood(id);
    if (!g) return { ok: false, reason: 'unknown-good' };
    if (!Number.isFinite(offer) || offer <= 0) return { ok: false, reason: 'bad-offer' };
    const asking = state.prices[id];
    if (offer >= asking) return { ok: false, reason: 'offer-too-high' };
    if (offer < asking * (1 - HAGGLE_LIMIT)) return { ok: false, reason: 'offer-too-low' };
    if (rnd() >= HAGGLE_WIN) {
      state.hagglesLost += 1;
      say('The vendor refused your offer on ' + g.name + '.');
      return { ok: false, reason: 'haggle-refused' };
    }
    state.haggled[id] = two(offer);
    state.hagglesWon += 1;
    return { ok: true, goodId: id, goodName: g.name, askingPrice: asking, offerPrice: two(offer), discountedPrice: two(offer) };
  }

  function rentStall() {
    if (state.stallOwned) return { ok: false, reason: 'already-owned' };
    if (cashOf() < STALL_RENT) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-STALL_RENT);
    state.stallOwned = true;
    state.stallDaysLeft = STALL_DAYS;
    say('Rented a market stall for ' + STALL_DAYS + ' days.');
    return { ok: true, cost: STALL_RENT, days: STALL_DAYS, daysLeft: STALL_DAYS };
  }

  function tickDay(day) {
    const today = day !== undefined && day !== null ? day : dayOf();
    if (state.lastTickedDay === today) return { ok: false, reason: 'already-settled' };
    state.lastTickedDay = today;
    const walked = [];
    const snapshot = {};
    for (const g of MARKET_GOODS) {
      const before = state.prices[g.id];
      const factor = 1 + (rnd() - 0.5) * 2 * g.volatility;
      let after = two(before * factor);
      const low = two(g.basePrice * PRICE_LOW);
      const high = two(g.basePrice * PRICE_HIGH);
      if (after < low) after = low;
      if (after > high) after = high;
      state.prices[g.id] = after;
      snapshot[g.id] = after;
      walked.push({ goodId: g.id, before, after, factor: two(factor) });
    }
    let event = null;
    if (rnd() < EVENT_CHANCE) {
      const pick = MARKET_GOODS[Math.floor(rnd() * MARKET_GOODS.length)];
      const kinds = state.stallOwned ? ['glut', 'rush', 'raid'] : ['glut', 'rush'];
      const kind = kinds[Math.floor(rnd() * kinds.length)];
      if (kind === 'glut') {
        state.prices[pick.id] = two(Math.max(two(pick.basePrice * PRICE_LOW), two(state.prices[pick.id] * 0.6)));
      } else if (kind === 'rush') {
        state.prices[pick.id] = two(Math.min(two(pick.basePrice * PRICE_HIGH), two(state.prices[pick.id] * 1.6)));
      } else if (kind === 'raid') {
        state.stallDaysLeft -= 1;
        if (state.stallDaysLeft <= 0) { state.stallDaysLeft = 0; state.stallOwned = false; }
      }
      event = { type: kind, good: pick.id, goodName: pick.name, day: today };
      state.activeEvent = event;
      state.recentEvents.push(event);
      if (state.recentEvents.length > 5) state.recentEvents = state.recentEvents.slice(-5);
      say('Market event: ' + kind + ' on ' + pick.name + '.');
    } else {
      state.activeEvent = null;
    }
    if (state.stallOwned) {
      state.stallDaysLeft -= 1;
      if (state.stallDaysLeft <= 0) { state.stallDaysLeft = 0; state.stallOwned = false; }
    }
    return { ok: true, day: today, prices: snapshot, walked, event, stallOwned: state.stallOwned, stallDaysLeft: state.stallDaysLeft };
  }

  function marketStatus(id) {
    const g = findGood(id);
    if (!g) return { ok: false, reason: 'unknown-good' };
    const price = state.prices[id];
    const ratio = Math.round((price / g.basePrice) * 100) / 100;
    const trend = price < g.basePrice * 0.9 ? 'cheap' : price > g.basePrice * 1.1 ? 'dear' : 'fair';
    return { ok: true, id, name: g.name, basePrice: g.basePrice, price, priceRatio: ratio, trend, held: state.inventory[id] || 0, haggledPrice: state.haggled[id] !== undefined ? state.haggled[id] : null };
  }

  function stallStatus() {
    return { ok: true, owned: state.stallOwned, daysLeft: state.stallDaysLeft, rentCost: STALL_RENT, rentDays: STALL_DAYS, multiplier: state.stallOwned ? STALL_MULT : 1 };
  }

  function portfolio() {
    return MARKET_GOODS.map((g) => {
      const held = state.inventory[g.id] || 0;
      const price = state.prices[g.id];
      const trend = price < g.basePrice * 0.9 ? 'cheap' : price > g.basePrice * 1.1 ? 'dear' : 'fair';
      return { id: g.id, name: g.name, basePrice: g.basePrice, price, trend, held, value: two(held * price) };
    });
  }

  function eventLog() {
    return state.recentEvents.map((e) => ({ type: e.type, goodId: e.good, goodName: e.goodName, day: e.day }));
  }

  function stats() {
    let owned = 0;
    let units = 0;
    let value = 0;
    for (const g of MARKET_GOODS) {
      const held = state.inventory[g.id] || 0;
      if (held > 0) owned += 1;
      units += held;
      value += held * state.prices[g.id];
    }
    return {
      goodsOwned: owned,
      totalUnits: units,
      inventoryValue: two(value),
      stallOwned: state.stallOwned,
      stallDaysLeft: state.stallDaysLeft,
      activeEvent: state.activeEvent ? state.activeEvent.type : 'none',
      eventGood: state.activeEvent ? state.activeEvent.good : '',
      pendingHaggled: Object.keys(state.haggled).length,
      totalSpent: state.totalSpent,
      totalEarned: state.totalEarned,
      trades: state.trades,
      hagglesWon: state.hagglesWon,
      hagglesLost: state.hagglesLost,
      eventsLogged: state.recentEvents.length,
      lastTickedDay: state.lastTickedDay || 0,
      heatLevel: heatOf(),
    };
  }

  function hudLine() {
    const owned = Object.keys(state.inventory).length;
    if (owned === 0 && !state.stallOwned && !state.activeEvent) return '';
    const bits = ['Night Market', owned + ' items'];
    if (state.stallOwned) bits.push('Stall ' + state.stallDaysLeft + 'd');
    if (state.activeEvent) bits.push(state.activeEvent.type + ' ' + state.activeEvent.goodName);
    return bits.join(' · ');
  }

  function serialize() {
    return {
      inventory: { ...state.inventory },
      prices: { ...state.prices },
      haggled: { ...state.haggled },
      stallOwned: state.stallOwned,
      stallDaysLeft: state.stallDaysLeft,
      activeEvent: state.activeEvent ? { ...state.activeEvent } : null,
      recentEvents: state.recentEvents.map((e) => ({ ...e })),
      totalSpent: state.totalSpent,
      totalEarned: state.totalEarned,
      trades: state.trades,
      hagglesWon: state.hagglesWon,
      hagglesLost: state.hagglesLost,
      lastTickedDay: state.lastTickedDay,
    };
  }

  function deserialize(saved) {
    const s = saved || {};
    state.inventory = {};
    if (s.inventory) for (const k of Object.keys(s.inventory)) {
      const v = Math.floor(Number(s.inventory[k]));
      if (Number.isFinite(v) && v > 0) state.inventory[k] = v;
    }
    for (const g of MARKET_GOODS) {
      const raw = s.prices ? Number(s.prices[g.id]) : NaN;
      let p = Number.isFinite(raw) ? raw : g.basePrice;
      const low = g.basePrice * PRICE_LOW;
      const high = g.basePrice * PRICE_HIGH;
      if (p < low) p = low;
      if (p > high) p = high;
      state.prices[g.id] = two(p);
    }
    state.haggled = {};
    if (s.haggled) for (const k of Object.keys(s.haggled)) {
      const v = Number(s.haggled[k]);
      if (Number.isFinite(v) && v > 0) state.haggled[k] = two(v);
    }
    state.stallOwned = s.stallOwned === true;
    state.stallDaysLeft = state.stallOwned ? Math.max(0, Math.floor(Number(s.stallDaysLeft) || 0)) : 0;
    state.activeEvent = s.activeEvent && typeof s.activeEvent.type === 'string' ? { ...s.activeEvent } : null;
    state.recentEvents = Array.isArray(s.recentEvents) ? s.recentEvents.slice(0, 5).map((e) => ({ ...e })) : [];
    state.totalSpent = Number(s.totalSpent) || 0;
    state.totalEarned = Number(s.totalEarned) || 0;
    state.trades = Math.floor(Number(s.trades) || 0);
    state.hagglesWon = Math.floor(Number(s.hagglesWon) || 0);
    state.hagglesLost = Math.floor(Number(s.hagglesLost) || 0);
    state.lastTickedDay = Math.floor(Number(s.lastTickedDay) || 0);
    return { ok: true };
  }

  return {
    name: 'Night Market',
    state,
    priceOf,
    buy,
    sell,
    haggle,
    rentStall,
    tickDay,
    marketStatus,
    stallStatus,
    portfolio,
    eventLog,
    stats,
    hudLine,
    serialize,
    deserialize,
  };
}
