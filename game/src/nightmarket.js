// Night market system for Solara Nights.
//
// After dark the plaza fills with stalls, lanterns and haggling. The
// player can buy low, sell high, rent a stall of their own for a better
// margin, and haggle a vendor down for a one-off deal. Prices wander
// every day, and now and then a glut, a rush or a raid shakes one good
// up entirely.
//
// Like every other system in this game, this module is self contained:
// no DOM, no rendering, no other game file. Everything it needs arrives
// through the single `deps` object handed to the factory: a random
// number source, the clock, the cash and heat hooks, and a log hook.
// Every dep is optional and falls back to a safe stand-in.
//
// Money never lives here. The balance belongs to the caller; this system
// only reads it through getCash and moves it through addCash. Anything
// worth the player noticing goes out through log.
//
// Every public action answers with a plain object: a success carries
// `ok: true` plus the numbers that describe what happened, and a failure
// carries `ok: false` plus a short kebab-case `reason` string.
//
// Randomness always flows through `deps.rng` and never through
// Math.random directly, so a seeded generator replays a session exactly.
//
// ---------------------------------------------------------------------------
// Market goods
// ---------------------------------------------------------------------------
//
// Ten things change hands at the night market. `basePrice` is the price
// a good drifts back toward over time, in dollars. `volatility` is how
// far a single day's random walk can push it: the daily factor is
// 1 + (rng - 0.5) * 2 * volatility, so a volatility of 0.20 means up to
// twenty percent either way in one night.

export const MARKET_GOODS = [
  {
    id: 'silk-scarves',
    name: 'Silk Scarves',
    basePrice: 45,
    volatility: 0.12,
    blurb: 'Hand-dyed silk, bright enough to spot across the plaza.',
  },
  {
    id: 'jade-charms',
    name: 'Jade Charms',
    basePrice: 120,
    volatility: 0.15,
    blurb: 'Small carved jade, sold as luck and priced as luxury.',
  },
  {
    id: 'brass-lanterns',
    name: 'Brass Lanterns',
    basePrice: 85,
    volatility: 0.1,
    blurb: 'Hammered brass lanterns that throw a warm, low light.',
  },
  {
    id: 'spice-bundles',
    name: 'Spice Bundles',
    basePrice: 30,
    volatility: 0.18,
    blurb: 'Chilli, star anise and dried citrus, tied with twine.',
  },
  {
    id: 'tea-crates',
    name: 'Tea Crates',
    basePrice: 60,
    volatility: 0.09,
    blurb: 'Crates of loose-leaf tea from the hills inland.',
  },
  {
    id: 'porcelain-vases',
    name: 'Porcelain Vases',
    basePrice: 220,
    volatility: 0.14,
    blurb: 'Glazed porcelain, thin as paper and twice as fragile.',
  },
  {
    id: 'incense-sticks',
    name: 'Incense Sticks',
    basePrice: 18,
    volatility: 0.08,
    blurb: 'Cheap, smoky and always in demand after midnight.',
  },
  {
    id: 'carved-fans',
    name: 'Carved Fans',
    basePrice: 95,
    volatility: 0.11,
    blurb: 'Sandalwood fans with the ribs carved by hand.',
  },
  {
    id: 'silver-bangles',
    name: 'Silver Bangles',
    basePrice: 180,
    volatility: 0.16,
    blurb: 'Plain silver bangles, weighed and priced by the gram.',
  },
  {
    id: 'rice-wine',
    name: 'Rice Wine Jars',
    basePrice: 40,
    volatility: 0.2,
    blurb: 'Cloudy rice wine in clay jars, sealed with wax.',
  },
];

// What a stall costs to rent, and how many days the rent covers.
const STALL_COST = 400;
const STALL_DAYS = 7;

// Selling from a stall of your own pays a premium on every sale.
const STALL_SELL_MULTIPLIER = 1.15;

// A haggle only counts when the offer is this close to the asking price
// (as a fraction below it), and even then the vendor only agrees part
// of the time.
const HAGGLE_MAX_BELOW = 0.12;
const HAGGLE_SUCCESS_CHANCE = 0.6;

// Each day, this is the chance that a market event fires at all.
const EVENT_CHANCE = 0.2;

// A glut drops the affected good's price by this fraction; a rush raises
// it by this fraction. A raid shuts the player's stall for a day.
const GLUT_FACTOR = 0.6;
const RUSH_FACTOR = 1.6;

// Prices are clamped to this band around their base price, so no good
// can ever become worthless or absurdly dear.
const PRICE_FLOOR_MULT = 0.4;
const PRICE_CEIL_MULT = 2.5;

// The largest single trade, to keep a typo from draining the wallet in
// one call.
const MAX_TRADE_QTY = 99;

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function findGood(goodId) {
  for (let i = 0; i < MARKET_GOODS.length; i += 1) {
    if (MARKET_GOODS[i].id === goodId) return MARKET_GOODS[i];
  }
  return null;
}

// Whole-number check that also rejects NaN and Infinity.
function isWholeCount(value) {
  return typeof value === 'number' && Number.isFinite(value) && Math.floor(value) === value;
}

// Money is kept to two decimals so a long night of trades never leaves
// a trail of floating-point dust behind it.
function roundMoney(value) {
  return Math.round(value * 100) / 100;
}

// Keep a price inside its legal band around the good's base price.
function clampPrice(good, price) {
  const floor = good.basePrice * PRICE_FLOOR_MULT;
  const ceil = good.basePrice * PRICE_CEIL_MULT;
  if (price < floor) return roundMoney(floor);
  if (price > ceil) return roundMoney(ceil);
  return roundMoney(price);
}

// The three event kinds, in the order the daily roll picks between them.
// A raid only appears when the player actually owns a stall.
const EVENT_TYPES = ['glut', 'rush', 'raid'];

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createNightMarketSystem(deps = {}) {
  const rng = typeof deps.rng === 'function' ? deps.rng : Math.random;
  const getDay = typeof deps.getDay === 'function' ? deps.getDay : () => 1;
  const getHour = typeof deps.getHour === 'function' ? deps.getHour : () => 12;
  const getCash = typeof deps.getCash === 'function' ? deps.getCash : () => 0;
  const addCash = typeof deps.addCash === 'function' ? deps.addCash : () => {};
  const addHeat = typeof deps.addHeat === 'function' ? deps.addHeat : () => {};
  const log = typeof deps.log === 'function' ? deps.log : () => {};
  const getHeatLevel = typeof deps.getHeatLevel === 'function' ? deps.getHeatLevel : () => 0;

  // --- state ---------------------------------------------------------------
  // inventory: good id -> units held.
  // prices: good id -> current asking price per unit.
  // haggled: good id -> one-time discounted price for the next buy.
  const inventory = {};
  const prices = {};
  const haggled = {};
  for (let i = 0; i < MARKET_GOODS.length; i += 1) {
    prices[MARKET_GOODS[i].id] = MARKET_GOODS[i].basePrice;
  }

  let stallOwned = false;
  let stallDaysLeft = 0;
  let activeEvent = null;
  let recentEvents = [];
  let totalSpent = 0;
  let totalEarned = 0;
  let trades = 0;
  let hagglesWon = 0;
  let hagglesLost = 0;
  let lastTickedDay = null;

  // --- private helpers -----------------------------------------------------

  function totalUnits() {
    let total = 0;
    const ids = Object.keys(inventory);
    for (let i = 0; i < ids.length; i += 1) total += inventory[ids[i]];
    return total;
  }

  function goodsOwnedCount() {
    let count = 0;
    const ids = Object.keys(inventory);
    for (let i = 0; i < ids.length; i += 1) {
      if (inventory[ids[i]] > 0) count += 1;
    }
    return count;
  }

  function inventoryValue() {
    let value = 0;
    const ids = Object.keys(inventory);
    for (let i = 0; i < ids.length; i += 1) {
      value += inventory[ids[i]] * (prices[ids[i]] || 0);
    }
    return roundMoney(value);
  }

  // A snapshot of every current price, for the daily tick's report.
  function priceSnapshot() {
    const out = {};
    for (let i = 0; i < MARKET_GOODS.length; i += 1) {
      out[MARKET_GOODS[i].id] = prices[MARKET_GOODS[i].id];
    }
    return out;
  }

  // -------------------------------------------------------------------------
  // Public actions
  // -------------------------------------------------------------------------

  // The current asking price for one unit of a good, or null when the
  // good does not exist.
  function priceOf(goodId) {
    const good = findGood(goodId);
    if (!good) return null;
    return prices[goodId];
  }

  // Buy units of a good at the current price. A haggled price, when one
  // is waiting for this good, replaces the asking price for this one
  // purchase and is then spent.
  function buy(goodId, qty) {
    const good = findGood(goodId);
    if (!good) return { ok: false, reason: 'unknown-good' };
    if (!isWholeCount(qty) || qty < 1 || qty > MAX_TRADE_QTY) {
      return { ok: false, reason: 'bad-quantity' };
    }
    const unitPrice = haggled[goodId] !== undefined ? haggled[goodId] : prices[goodId];
    const usedHaggle = haggled[goodId] !== undefined;
    const cost = roundMoney(unitPrice * qty);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash' };
    if (usedHaggle) delete haggled[goodId];
    addCash(-cost);
    inventory[goodId] = (inventory[goodId] || 0) + qty;
    totalSpent = roundMoney(totalSpent + cost);
    trades += 1;
    log(`Bought ${qty}x ${good.name} at $${unitPrice} each ($${cost}).`);
    return {
      ok: true,
      good: good.id,
      goodName: good.name,
      qty,
      unitPrice,
      cost,
      haggled: usedHaggle,
      held: inventory[goodId],
    };
  }

  // Sell units of a good at the current price. Owning a stall pays a
  // premium on the whole sale, which is where the rent earns itself back.
  function sell(goodId, qty) {
    const good = findGood(goodId);
    if (!good) return { ok: false, reason: 'unknown-good' };
    if (!isWholeCount(qty) || qty < 1 || qty > MAX_TRADE_QTY) {
      return { ok: false, reason: 'bad-quantity' };
    }
    const held = inventory[goodId] || 0;
    if (held < qty) return { ok: false, reason: 'not-enough-stock' };
    const unitPrice = prices[goodId];
    const multiplier = stallOwned ? STALL_SELL_MULTIPLIER : 1;
    const revenue = roundMoney(unitPrice * qty * multiplier);
    addCash(revenue);
    inventory[goodId] = held - qty;
    if (inventory[goodId] === 0) delete inventory[goodId];
    totalEarned = roundMoney(totalEarned + revenue);
    trades += 1;
    log(`Sold ${qty}x ${good.name} for $${revenue}${stallOwned ? ' (stall premium)' : ''}.`);
    return {
      ok: true,
      good: good.id,
      goodName: good.name,
      qty,
      unitPrice,
      multiplier,
      revenue,
      held: inventory[goodId] || 0,
    };
  }

  // Haggle over one good. The offer has to sit within twelve percent
  // below the asking price, and even a fair offer only lands when the
  // vendor is in a good mood (a roll under 0.6). A win locks the offered
  // price in for the next buy of that good, once only. A failed haggle
  // costs nothing but pride.
  function haggle(goodId, offerPrice) {
    const good = findGood(goodId);
    if (!good) return { ok: false, reason: 'unknown-good' };
    const asking = prices[goodId];
    if (typeof offerPrice !== 'number' || !Number.isFinite(offerPrice) || offerPrice <= 0 || offerPrice >= asking) {
      return { ok: false, reason: 'bad-offer' };
    }
    if (offerPrice < asking * (1 - HAGGLE_MAX_BELOW)) {
      return { ok: false, reason: 'offer-too-low' };
    }
    const roll = rng();
    if (roll >= HAGGLE_SUCCESS_CHANCE) {
      hagglesLost += 1;
      log(`The ${good.name} vendor laughed off $${offerPrice}.`);
      return { ok: false, reason: 'haggle-failed', good: good.id, askingPrice: asking, offerPrice, roll };
    }
    haggled[goodId] = roundMoney(offerPrice);
    hagglesWon += 1;
    log(`Haggled ${good.name} down to $${roundMoney(offerPrice)} for the next buy.`);
    return {
      ok: true,
      good: good.id,
      goodName: good.name,
      askingPrice: asking,
      offerPrice: roundMoney(offerPrice),
      discountedPrice: roundMoney(offerPrice),
    };
  }

  // Rent a stall for seven days. The stall pays for itself through the
  // selling premium, and it is the only thing a raid can shut down.
  function rentStall() {
    if (stallOwned) return { ok: false, reason: 'stall-owned' };
    if (getCash() < STALL_COST) return { ok: false, reason: 'not-enough-cash' };
    addCash(-STALL_COST);
    stallOwned = true;
    stallDaysLeft = STALL_DAYS;
    log(`Rented a night market stall for $${STALL_COST} (${STALL_DAYS} days).`);
    return { ok: true, cost: STALL_COST, days: STALL_DAYS, stallDaysLeft };
  }

  // Daily tick, run once per in-game day. Every price takes a random
  // walk inside its band. Then, with a one-in-five chance, a market
  // event fires on one good picked with the rng: a glut drops it forty
  // percent, a rush raises it sixty percent, and a raid closes the
  // player's stall for a day when one is owned. Rent also ticks down by
  // a day here, and a stall whose rent runs out closes on its own.
  function tickDay(day) {
    const dayNumber = typeof day === 'number' ? day : getDay();
    if (lastTickedDay !== null && dayNumber === lastTickedDay) {
      return { ok: false, reason: 'already-settled' };
    }
    lastTickedDay = dayNumber;

    const walked = [];
    for (let i = 0; i < MARKET_GOODS.length; i += 1) {
      const good = MARKET_GOODS[i];
      const before = prices[good.id];
      const factor = 1 + (rng() - 0.5) * 2 * good.volatility;
      const after = clampPrice(good, before * factor);
      prices[good.id] = after;
      walked.push({ good: good.id, before, after, factor: Math.round(factor * 10000) / 10000 });
    }

    let event = null;
    const eventRoll = rng();
    if (eventRoll < EVENT_CHANCE) {
      const pick = Math.floor(rng() * MARKET_GOODS.length);
      const good = MARKET_GOODS[pick];
      const typeCount = stallOwned ? EVENT_TYPES.length : EVENT_TYPES.length - 1;
      const type = EVENT_TYPES[Math.floor(rng() * typeCount)];
      if (type === 'glut') {
        prices[good.id] = clampPrice(good, prices[good.id] * GLUT_FACTOR);
        log(`Glut! ${good.name} flooded the market and the price fell.`);
      } else if (type === 'rush') {
        prices[good.id] = clampPrice(good, prices[good.id] * RUSH_FACTOR);
        log(`Rush! Everyone wants ${good.name} tonight and the price jumped.`);
      } else {
        stallDaysLeft -= 1;
        if (stallDaysLeft <= 0) {
          stallOwned = false;
          stallDaysLeft = 0;
        }
        log('Raid! Inspectors swept the plaza and the stall lost a day.');
      }
      event = { type, good: good.id, goodName: good.name, day: dayNumber };
      activeEvent = event;
      recentEvents.push(event);
      if (recentEvents.length > 5) recentEvents.shift();
    } else {
      activeEvent = null;
    }

    // Rent ticks down by a day; a stall with no days left closes.
    if (stallOwned) {
      stallDaysLeft -= 1;
      if (stallDaysLeft <= 0) {
        stallOwned = false;
        stallDaysLeft = 0;
        log('The stall rent ran out and the stall closed.');
      }
    }

    return {
      ok: true,
      day: dayNumber,
      prices: priceSnapshot(),
      walked,
      event,
      stallOwned,
      stallDaysLeft,
    };
  }

  // --- reporting -----------------------------------------------------------

  // A read-only snapshot of one good: its base price, its price tonight,
  // how far tonight's price sits from base, and how many units the
  // player holds. The trend word is a quick read for the player: a good
  // is 'cheap' below ninety percent of base, 'dear' above a hundred and
  // ten percent, and 'fair' anywhere in between.
  function marketStatus(goodId) {
    const good = findGood(goodId);
    if (!good) return { ok: false, reason: 'unknown-good' };
    const price = prices[goodId];
    const ratio = price / good.basePrice;
    let trend = 'fair';
    if (ratio < 0.9) trend = 'cheap';
    if (ratio > 1.1) trend = 'dear';
    return {
      ok: true,
      id: good.id,
      name: good.name,
      basePrice: good.basePrice,
      price,
      ratio: Math.round(ratio * 100) / 100,
      trend,
      held: inventory[goodId] || 0,
      haggledPrice: haggled[goodId] !== undefined ? haggled[goodId] : null,
    };
  }

  // A read-only snapshot of the player's stall: whether one is held, how
  // many days of rent are left, and what the selling premium is worth
  // tonight on a single unit of each good the player holds.
  function stallStatus() {
    return {
      ok: true,
      owned: stallOwned,
      daysLeft: stallDaysLeft,
      rentCost: STALL_COST,
      rentDays: STALL_DAYS,
      sellMultiplier: stallOwned ? STALL_SELL_MULTIPLIER : 1,
    };
  }

  // The whole market on one page: every good with its base price, its
  // price tonight, its trend, and how many units the player holds. The
  // list follows the MARKET_GOODS order, so a caller can line it up
  // against the constants.
  function portfolio() {
    const out = [];
    for (let i = 0; i < MARKET_GOODS.length; i += 1) {
      const good = MARKET_GOODS[i];
      const price = prices[good.id];
      const ratio = price / good.basePrice;
      let trend = 'fair';
      if (ratio < 0.9) trend = 'cheap';
      if (ratio > 1.1) trend = 'dear';
      out.push({
        id: good.id,
        name: good.name,
        basePrice: good.basePrice,
        price,
        trend,
        held: inventory[good.id] || 0,
        value: roundMoney((inventory[good.id] || 0) * price),
      });
    }
    return out;
  }

  // The last few market events, newest last, capped at five entries so
  // the list never grows without bound across a long campaign.
  function eventLog() {
    const out = [];
    for (let i = 0; i < recentEvents.length; i += 1) {
      out.push({
        type: recentEvents[i].type,
        good: recentEvents[i].good,
        goodName: recentEvents[i].goodName,
        day: recentEvents[i].day,
      });
    }
    return out;
  }

  function stats() {
    return {
      goodsOwned: goodsOwnedCount(),
      totalUnits: totalUnits(),
      inventoryValue: inventoryValue(),
      stallOwned,
      stallDaysLeft,
      activeEvent: activeEvent ? activeEvent.type : 'none',
      eventGood: activeEvent ? activeEvent.good : '',
      haggledPending: Object.keys(haggled).length,
      totalSpent,
      totalEarned,
      trades,
      hagglesWon,
      hagglesLost,
      eventsLogged: recentEvents.length,
      lastTickedDay: lastTickedDay === null ? 0 : lastTickedDay,
      heatLevel: getHeatLevel(),
    };
  }

  function hudLine() {
    if (totalUnits() === 0 && !stallOwned && !activeEvent) return '';
    const parts = [`Night Market: ${totalUnits()} items`];
    if (stallOwned) parts.push(`stall ${stallDaysLeft}d`);
    if (activeEvent) parts.push(`${activeEvent.type} on ${activeEvent.goodName}`);
    return parts.join(' · ');
  }

  // --- persistence ---------------------------------------------------------

  function serialize() {
    const inventoryOut = {};
    const invIds = Object.keys(inventory);
    for (let i = 0; i < invIds.length; i += 1) inventoryOut[invIds[i]] = inventory[invIds[i]];
    const pricesOut = {};
    const priceIds = Object.keys(prices);
    for (let i = 0; i < priceIds.length; i += 1) pricesOut[priceIds[i]] = prices[priceIds[i]];
    const haggledOut = {};
    const hagIds = Object.keys(haggled);
    for (let i = 0; i < hagIds.length; i += 1) haggledOut[hagIds[i]] = haggled[hagIds[i]];
    return {
      inventory: inventoryOut,
      prices: pricesOut,
      haggled: haggledOut,
      stallOwned,
      stallDaysLeft,
      activeEvent: activeEvent ? { type: activeEvent.type, good: activeEvent.good, goodName: activeEvent.goodName, day: activeEvent.day } : null,
      recentEvents: eventLog(),
      totalSpent,
      totalEarned,
      trades,
      hagglesWon,
      hagglesLost,
      lastTickedDay,
    };
  }

  function deserialize(d) {
    const data = d && typeof d === 'object' ? d : {};
    const savedInventory = data.inventory && typeof data.inventory === 'object' ? data.inventory : {};
    const savedPrices = data.prices && typeof data.prices === 'object' ? data.prices : {};
    const savedHaggled = data.haggled && typeof data.haggled === 'object' ? data.haggled : {};

    const invIds = Object.keys(inventory);
    for (let i = 0; i < invIds.length; i += 1) delete inventory[invIds[i]];
    const savedInvKeys = Object.keys(savedInventory);
    for (let i = 0; i < savedInvKeys.length; i += 1) {
      const amount = savedInventory[savedInvKeys[i]];
      if (typeof amount === 'number' && amount > 0) inventory[savedInvKeys[i]] = Math.floor(amount);
    }

    for (let i = 0; i < MARKET_GOODS.length; i += 1) {
      const good = MARKET_GOODS[i];
      const saved = savedPrices[good.id];
      prices[good.id] = typeof saved === 'number' && Number.isFinite(saved) && saved > 0
        ? clampPrice(good, saved)
        : good.basePrice;
    }

    const hagIds = Object.keys(haggled);
    for (let i = 0; i < hagIds.length; i += 1) delete haggled[hagIds[i]];
    const savedHagKeys = Object.keys(savedHaggled);
    for (let i = 0; i < savedHagKeys.length; i += 1) {
      const amount = savedHaggled[savedHagKeys[i]];
      if (typeof amount === 'number' && amount > 0) haggled[savedHagKeys[i]] = roundMoney(amount);
    }

    stallOwned = data.stallOwned === true;
    stallDaysLeft = typeof data.stallDaysLeft === 'number' && data.stallDaysLeft > 0
      ? Math.floor(data.stallDaysLeft)
      : 0;
    if (!stallOwned) stallDaysLeft = 0;
    activeEvent = data.activeEvent && typeof data.activeEvent === 'object' && typeof data.activeEvent.type === 'string'
      ? { type: data.activeEvent.type, good: data.activeEvent.good || '', goodName: data.activeEvent.goodName || '', day: data.activeEvent.day || 0 }
      : null;
    recentEvents = [];
    if (Array.isArray(data.recentEvents)) {
      for (let i = 0; i < data.recentEvents.length && recentEvents.length < 5; i += 1) {
        const entry = data.recentEvents[i];
        if (entry && typeof entry === 'object' && typeof entry.type === 'string') {
          recentEvents.push({
            type: entry.type,
            good: entry.good || '',
            goodName: entry.goodName || '',
            day: typeof entry.day === 'number' ? entry.day : 0,
          });
        }
      }
    }
    totalSpent = typeof data.totalSpent === 'number' ? roundMoney(data.totalSpent) : 0;
    totalEarned = typeof data.totalEarned === 'number' ? roundMoney(data.totalEarned) : 0;
    trades = typeof data.trades === 'number' ? data.trades : 0;
    hagglesWon = typeof data.hagglesWon === 'number' ? data.hagglesWon : 0;
    hagglesLost = typeof data.hagglesLost === 'number' ? data.hagglesLost : 0;
    lastTickedDay = typeof data.lastTickedDay === 'number' ? data.lastTickedDay : null;
    return { ok: true };
  }

  return {
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
