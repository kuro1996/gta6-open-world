// Solara Nights — Day/Night Economy (round 4 attempt 5, NEW module).
// A living shop economy for Solara Bay: every shop keeps its own opening
// hours, stock and prices, and prices move with the time of day. Daytime
// is cheap and busy; night is quiet, risky and expensive — the same snack
// costs more at 02:00 than at noon, and some goods only appear after dark.
// The system owns its own ledger (cash in/out) so the HUD can show exactly
// where the player's money went, and it survives a save/load round-trip.
//
// The module is deliberately self-contained: it talks to the rest of the
// game only through the small `ctx` object passed to the factory. Every
// ctx hook is optional and guarded, so the economy keeps working (in a
// degraded, standalone mode) even if the caller wires in nothing at all.

export const ECONOMY_VERSION = 1;

// Four day phases. Boundaries are in 24h clock hours; NIGHT wraps midnight.
export const DAY_PHASES = [
  { id: 'dawn', label: 'Dawn', from: 5, to: 8, demand: 0.9, price: 0.95, light: 0.35 },
  { id: 'day', label: 'Day', from: 8, to: 17, demand: 1.25, price: 1.0, light: 1.0 },
  { id: 'dusk', label: 'Dusk', from: 17, to: 20, demand: 1.1, price: 1.05, light: 0.55 },
  { id: 'night', label: 'Night', from: 20, to: 5, demand: 0.7, price: 1.25, light: 0.12 },
];

// Which phase a clock hour belongs to. Handles the night wrap-around.
export function phaseForHour(hour) {
  const h = ((Math.floor(hour) % 24) + 24) % 24;
  for (const p of DAY_PHASES) {
    if (p.from < p.to) {
      if (h >= p.from && h < p.to) return p;
    } else if (h >= p.from || h < p.to) {
      return p;
    }
  }
  return DAY_PHASES[1];
}

// Price multiplier for a phase: night trade carries a risk premium.
export function priceMultiplierForPhase(phaseId) {
  const p = DAY_PHASES.find((d) => d.id === phaseId);
  return p ? p.price : 1;
}

// ---- Catalogue -----------------------------------------------------------
// price: base daytime price in $. stock: units on the shelf at restock.
// nightOnly: only sold after dark. illegal: sold at the pawn shop only,
// and buying it adds a little wanted heat through the ctx hook.
// restockHours: how often the shelf refills (game hours).

export const SHOPS = [
  {
    id: 'voss-garage',
    name: 'Voss Garage',
    district: 'Harbor',
    openFrom: 7,
    openTo: 23,
    blurb: 'Parts, repairs and tuning. Ria gets the friends rate.',
    items: [
      { id: 'repair-kit', name: 'Repair Kit', price: 120, stock: 6, effect: 'repairs 35 car HP', restockHours: 6 },
      { id: 'armor-plate', name: 'Armor Plate', price: 450, stock: 2, effect: '+25 max car HP', restockHours: 24 },
      { id: 'nitro-can', name: 'Nitro Can', price: 90, stock: 8, effect: 'one full boost refill', restockHours: 4 },
      { id: 'turbo-chip', name: 'Turbo Chip', price: 800, stock: 1, effect: '+8% top speed', restockHours: 48 },
    ],
  },
  {
    id: 'marina-market',
    name: 'Marina Market',
    district: 'Marina',
    openFrom: 6,
    openTo: 22,
    blurb: 'Food, drinks and everyday supplies for a long night.',
    items: [
      { id: 'noodle-cup', name: 'Noodle Cup', price: 12, stock: 20, effect: 'restores 10 stamina', restockHours: 3 },
      { id: 'energy-drink', name: 'Energy Drink', price: 18, stock: 14, effect: 'restores 25 stamina', restockHours: 3 },
      { id: 'first-aid', name: 'First-Aid Pack', price: 60, stock: 5, effect: 'restores 40 HP', restockHours: 8 },
      { id: 'coffee', name: 'Solara Coffee', price: 8, stock: 30, effect: 'restores 5 stamina', restockHours: 2 },
    ],
  },
  {
    id: 'neon-noodle',
    name: 'Neon Noodle',
    district: 'Downtown',
    openFrom: 18,
    openTo: 4,
    blurb: 'Open late. The noodles are honest; the clientele is not.',
    items: [
      { id: 'midnight-ramen', name: 'Midnight Ramen', price: 22, stock: 12, effect: 'restores 30 stamina', restockHours: 4 },
      { id: 'night-special', name: 'Night Special', price: 45, stock: 4, effect: 'restores 50 stamina', restockHours: 12, nightOnly: true },
      { id: 'hot-tea', name: 'Hot Tea', price: 10, stock: 18, effect: 'restores 12 stamina', restockHours: 2 },
    ],
  },
  {
    id: 'solara-pawn',
    name: 'Solara Pawn',
    district: 'Old Town',
    openFrom: 10,
    openTo: 2,
    blurb: 'Buys what you lifted, sells what others lost. No questions.',
    items: [
      { id: 'lockpick-set', name: 'Lockpick Set', price: 150, stock: 3, effect: 'steal cars 30% faster', restockHours: 24 },
      { id: 'fake-plate', name: 'Fake Plate', price: 300, stock: 2, effect: 'lose 1 wanted star once', restockHours: 48 },
      { id: 'stolen-watch', name: 'Stolen Watch', price: 220, stock: 2, effect: 'sellable loot', restockHours: 24, illegal: true },
      { id: 'jammer', name: 'Signal Jammer', price: 500, stock: 1, effect: 'cops lose you 20% faster', restockHours: 72, illegal: true },
    ],
  },
  {
    id: 'harbor-fuel',
    name: 'Harbor Fuel',
    district: 'Harbor',
    openFrom: 0,
    openTo: 24,
    blurb: 'Open all hours. Fuel, snacks, and a payphone that still works.',
    items: [
      { id: 'fuel-can', name: 'Fuel Can', price: 40, stock: 10, effect: 'refills 25% fuel', restockHours: 4 },
      { id: 'snack-bar', name: 'Snack Bar', price: 6, stock: 25, effect: 'restores 6 stamina', restockHours: 2 },
      { id: 'map', name: 'Folded City Map', price: 25, stock: 5, effect: 'reveals all shops on minimap', restockHours: 24 },
    ],
  },
  {
    id: 'luna-pharmacy',
    name: 'Luna Pharmacy',
    district: 'Downtown',
    openFrom: 8,
    openTo: 20,
    blurb: 'Bandages, painkillers, and discretion.',
    items: [
      { id: 'bandage', name: 'Bandage Roll', price: 15, stock: 15, effect: 'restores 15 HP', restockHours: 4 },
      { id: 'painkiller', name: 'Painkillers', price: 30, stock: 8, effect: 'restores 25 HP', restockHours: 6 },
      { id: 'adrenaline', name: 'Adrenaline Shot', price: 110, stock: 2, effect: 'full stamina + 20 HP', restockHours: 24 },
    ],
  },
];

export function shopById(id) {
  return SHOPS.find((s) => s.id === id) || null;
}

export function itemById(shopId, itemId) {
  const shop = shopById(shopId);
  if (!shop) return null;
  return shop.items.find((i) => i.id === itemId) || null;
}

// Is a shop open at this clock hour? Handles overnight ranges (18 -> 4).
export function isShopOpen(shop, hour) {
  const h = ((Math.floor(hour) % 24) + 24) % 24;
  if (shop.openFrom < shop.openTo) return h >= shop.openFrom && h < shop.openTo;
  return h >= shop.openFrom || h < shop.openTo;
}

// Current unit price: base * phase multiplier * demand drift, rounded to $.
export function currentPrice(shopId, itemId, hour, demandDrift = 0) {
  const item = itemById(shopId, itemId);
  if (!item) return null;
  const phase = phaseForHour(hour);
  const drift = 1 + Math.max(-0.3, Math.min(0.5, demandDrift));
  return Math.max(1, Math.round(item.price * phase.price * drift));
}

export function createEconomySystem(ctx = {}) {
  const hooks = {
    getHour: typeof ctx.getHour === 'function' ? ctx.getHour : () => 12,
    getCash: typeof ctx.getCash === 'function' ? ctx.getCash : null,
    addCash: typeof ctx.addCash === 'function' ? ctx.addCash : null,
    notify: typeof ctx.notify === 'function' ? ctx.notify : () => {},
    addHeat: typeof ctx.addHeat === 'function' ? ctx.addHeat : () => {},
    onBuy: typeof ctx.onBuy === 'function' ? ctx.onBuy : () => {},
  };

  // Mutable per-shop stock, keyed `${shopId}:${itemId}`.
  const stock = new Map();
  const restockTimers = new Map();
  for (const shop of SHOPS) {
    for (const item of shop.items) {
      stock.set(`${shop.id}:${item.id}`, item.stock);
      restockTimers.set(`${shop.id}:${item.id}`, 0);
    }
  }

  // Demand drift per item, -0.3..0.5. Buying pushes it up, time pulls it back.
  const demand = new Map();
  const state = {
    day: 1,
    cashMirror: typeof ctx.startingCash === 'number' ? ctx.startingCash : 0,
    ledger: [], // { day, hour, shopId, itemId, name, qty, total, kind }
    spent: 0,
    earned: 0,
    purchases: 0,
    nightPurchases: 0,
    shopsVisited: new Set(),
  };

  function hour() {
    return hooks.getHour();
  }

  function cash() {
    if (hooks.getCash) return hooks.getCash();
    return state.cashMirror;
  }

  function setCash(next) {
    if (hooks.addCash) hooks.addCash(next - cash());
    state.cashMirror = next;
  }

  function driftFor(shopId, itemId) {
    return demand.get(`${shopId}:${itemId}`) || 0;
  }

  function priceOf(shopId, itemId) {
    return currentPrice(shopId, itemId, hour(), driftFor(shopId, itemId));
  }

  function stockOf(shopId, itemId) {
    return stock.get(`${shopId}:${itemId}`) ?? 0;
  }

  function openShops() {
    const h = hour();
    return SHOPS.filter((s) => isShopOpen(s, h));
  }

  // Buy qty units. Returns { ok, reason?, total?, item? }.
  function buy(shopId, itemId, qty = 1) {
    const shop = shopById(shopId);
    const item = itemById(shopId, itemId);
    if (!shop || !item) return { ok: false, reason: 'unknown-item' };
    if (!isShopOpen(shop, hour())) return { ok: false, reason: 'shop-closed' };
    if (item.nightOnly && phaseForHour(hour()).id !== 'night') {
      return { ok: false, reason: 'night-only' };
    }
    const have = stockOf(shopId, itemId);
    if (have < qty) return { ok: false, reason: 'out-of-stock', have };
    const unit = priceOf(shopId, itemId);
    const total = unit * qty;
    if (cash() < total) return { ok: false, reason: 'not-enough-cash', total, cash: cash() };
    setCash(cash() - total);
    stock.set(`${shopId}:${itemId}`, have - qty);
    demand.set(`${shopId}:${itemId}`, Math.min(0.5, driftFor(shopId, itemId) + 0.04 * qty));
    state.spent += total;
    state.purchases += qty;
    if (phaseForHour(hour()).id === 'night') state.nightPurchases += qty;
    state.shopsVisited.add(shopId);
    state.ledger.push({ day: state.day, hour: hour(), shopId, itemId, name: item.name, qty, total, kind: 'buy' });
    if (state.ledger.length > 200) state.ledger.splice(0, state.ledger.length - 200);
    if (item.illegal) hooks.addHeat(6);
    hooks.notify(`Bought ${qty}x ${item.name} for $${total} at ${shop.name}.`);
    hooks.onBuy({ shopId, itemId, qty, total, item });
    return { ok: true, total, unit, item };
  }

  // Sell loot back to the pawn shop for 55% of base price (night: 65%).
  function sellLoot(itemId, qty = 1) {
    const item = SHOPS.flatMap((s) => s.items).find((i) => i.id === itemId);
    if (!item) return { ok: false, reason: 'unknown-item' };
    const night = phaseForHour(hour()).id === 'night';
    const rate = night ? 0.65 : 0.55;
    const total = Math.max(1, Math.round(item.price * rate)) * qty;
    setCash(cash() + total);
    state.earned += total;
    state.ledger.push({ day: state.day, hour: hour(), shopId: 'solara-pawn', itemId, name: item.name, qty, total, kind: 'sell' });
    hooks.notify(`Sold ${qty}x ${item.name} for $${total} (${night ? 'night rate' : 'day rate'}).`);
    return { ok: true, total };
  }

  // Advance restock timers and decay demand. dt is game hours.
  function update(dtHours) {
    if (!(dtHours > 0)) return;
    for (const shop of SHOPS) {
      for (const item of shop.items) {
        const key = `${shop.id}:${item.id}`;
        const timer = (restockTimers.get(key) || 0) + dtHours;
        if (timer >= item.restockHours) {
          stock.set(key, item.stock);
          restockTimers.set(key, 0);
        } else {
          restockTimers.set(key, timer);
        }
        const d = demand.get(key) || 0;
        if (d !== 0) demand.set(key, d * Math.pow(0.5, dtHours / 6));
      }
    }
  }

  function advanceDay() {
    state.day += 1;
    // Overnight, every shelf refills and demand resets: a new day in Solara.
    for (const shop of SHOPS) {
      for (const item of shop.items) stock.set(`${shop.id}:${item.id}`, item.stock);
    }
    demand.clear();
    hooks.notify(`Day ${state.day} in Solara Bay. Shops restocked.`);
  }

  function summary() {
    const phase = phaseForHour(hour());
    return {
      version: ECONOMY_VERSION,
      day: state.day,
      hour: hour(),
      phase: phase.id,
      phaseLabel: phase.label,
      cash: cash(),
      spent: state.spent,
      earned: state.earned,
      purchases: state.purchases,
      nightPurchases: state.nightPurchases,
      shopsVisited: state.shopsVisited.size,
      openNow: openShops().map((s) => s.id),
    };
  }

  function serialize() {
    return {
      version: ECONOMY_VERSION,
      day: state.day,
      spent: state.spent,
      earned: state.earned,
      purchases: state.purchases,
      nightPurchases: state.nightPurchases,
      shopsVisited: [...state.shopsVisited],
      stock: [...stock.entries()],
      demand: [...demand.entries()],
      ledger: state.ledger.slice(-50),
    };
  }

  function deserialize(data) {
    if (!data || typeof data !== 'object') return false;
    state.day = data.day || 1;
    state.spent = data.spent || 0;
    state.earned = data.earned || 0;
    state.purchases = data.purchases || 0;
    state.nightPurchases = data.nightPurchases || 0;
    state.shopsVisited = new Set(data.shopsVisited || []);
    if (Array.isArray(data.stock)) for (const [k, v] of data.stock) stock.set(k, v);
    if (Array.isArray(data.demand)) for (const [k, v] of data.demand) demand.set(k, v);
    if (Array.isArray(data.ledger)) state.ledger = data.ledger.slice(-200);
    return true;
  }

  return {
    buy, sellLoot, update, advanceDay, summary, serialize, deserialize,
    priceOf, stockOf, openShops, shopById, itemById, phaseForHour,
    get ledger() { return state.ledger.slice(); },
    get day() { return state.day; },
  };
}
