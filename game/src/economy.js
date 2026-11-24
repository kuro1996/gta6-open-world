export const ECONOMY_VERSION = 1;

export const DAY_PHASES = [
  { id: 'dawn', label: 'Dawn', from: 5, to: 8, demand: 0.9, price: 0.95, light: 0.5 },
  { id: 'day', label: 'Day', from: 8, to: 17, demand: 1.0, price: 1.0, light: 1.0 },
  { id: 'dusk', label: 'Dusk', from: 17, to: 20, demand: 1.1, price: 1.05, light: 0.6 },
  { id: 'night', label: 'Night', from: 20, to: 5, demand: 1.2, price: 1.25, light: 0.2 },
];

export const SHOPS = [
  {
    id: 'voss-garage', name: 'Voss Garage', district: 'Harbor', openFrom: 8, openTo: 20, blurb: 'Parts, paint, and promises.',
    items: [
      { id: 'oil', name: 'Engine Oil', price: 40, stock: 10, effect: 'repair', restockHours: 12 },
      { id: 'tires', name: 'Fresh Tires', price: 120, stock: 6, effect: 'grip', restockHours: 24 },
      { id: 'turbo-part', name: 'Turbo Part', price: 400, stock: 2, effect: 'topSpeed', restockHours: 48 },
      { id: 'paint', name: 'Paint Job', price: 250, stock: 4, effect: 'paint', restockHours: 24 },
    ],
  },
  {
    id: 'marina-market', name: 'Marina Market', district: 'Marina', openFrom: 6, openTo: 22, blurb: 'Snacks, bait, and sunscreen.',
    items: [
      { id: 'snack', name: 'Snack Pack', price: 8, stock: 30, effect: 'heal', restockHours: 6 },
      { id: 'bait-box', name: 'Bait Box', price: 15, stock: 12, effect: 'bait', restockHours: 12 },
      { id: 'drink', name: 'Energy Drink', price: 6, stock: 25, effect: 'stamina', restockHours: 6 },
      { id: 'sunscreen', name: 'Sunscreen', price: 12, stock: 15, effect: 'none', restockHours: 12 },
    ],
  },
  {
    id: 'neon-noodle', name: 'Neon Noodle', district: 'Downtown', openFrom: 11, openTo: 2, blurb: 'Noodles at 2am, no questions.',
    items: [
      { id: 'noodles', name: 'Neon Noodles', price: 14, stock: 20, effect: 'heal', restockHours: 8 },
      { id: 'dumplings', name: 'Dumplings', price: 18, stock: 15, effect: 'heal', restockHours: 8 },
      { id: 'midnight-ramen', name: 'Midnight Ramen', price: 22, stock: 8, effect: 'heal', restockHours: 12, nightOnly: true },
    ],
  },
  {
    id: 'solara-pawn', name: 'Solara Pawn', district: 'Old Town', openFrom: 9, openTo: 19, blurb: 'We buy anything. Almost.',
    items: [
      { id: 'watch', name: 'Gold Watch', price: 300, stock: 2, effect: 'loot', restockHours: 72 },
      { id: 'ring', name: 'Silver Ring', price: 120, stock: 4, effect: 'loot', restockHours: 48 },
      { id: 'camera', name: 'Old Camera', price: 90, stock: 3, effect: 'loot', restockHours: 48 },
      { id: 'lockpick-set', name: 'Lockpick Set', price: 150, stock: 5, effect: 'lockpick', restockHours: 24, illegal: true },
    ],
  },
  {
    id: 'harbor-fuel', name: 'Harbor Fuel', district: 'Harbor', openFrom: 0, openTo: 24, blurb: 'Fuel, day and night.',
    items: [
      { id: 'fuel', name: 'Fuel Can', price: 30, stock: 20, effect: 'fuel', restockHours: 6 },
      { id: 'jerrycan', name: 'Jerrycan', price: 55, stock: 10, effect: 'fuel', restockHours: 12 },
      { id: 'flares', name: 'Flares', price: 25, stock: 8, effect: 'signal', restockHours: 24 },
    ],
  },
  {
    id: 'luna-pharmacy', name: 'Luna Pharmacy', district: 'Downtown', openFrom: 7, openTo: 23, blurb: 'Patch yourself up.',
    items: [
      { id: 'bandage', name: 'Bandages', price: 10, stock: 25, effect: 'heal', restockHours: 6 },
      { id: 'medkit', name: 'Medkit', price: 60, stock: 8, effect: 'heal', restockHours: 12 },
      { id: 'painkillers', name: 'Painkillers', price: 18, stock: 15, effect: 'heal', restockHours: 8 },
    ],
  },
];

export function phaseForHour(hour) {
  const h = ((hour % 24) + 24) % 24;
  for (const p of DAY_PHASES) {
    if (p.from < p.to) {
      if (h >= p.from && h < p.to) return p;
    } else if (h >= p.from || h < p.to) return p;
  }
  return DAY_PHASES[1];
}

export function priceMultiplierForPhase(phaseId) {
  const p = DAY_PHASES.find((x) => x.id === phaseId);
  return p ? p.price : 1;
}

export function shopById(id) {
  return SHOPS.find((s) => s.id === id) || null;
}

export function itemById(shopId, itemId) {
  const shop = shopById(shopId);
  if (!shop) return null;
  return shop.items.find((i) => i.id === itemId) || null;
}

export function isShopOpen(shop, hour) {
  const s = typeof shop === 'string' ? shopById(shop) : shop;
  if (!s) return false;
  const h = hour ?? 12;
  if (s.openFrom <= s.openTo) return h >= s.openFrom && h < s.openTo;
  return h >= s.openFrom || h < s.openTo;
}

function keyOf(shopId, itemId) {
  return `${shopId}:${itemId}`;
}

export function currentPrice(shopId, itemId, hour, demandMap) {
  const item = itemById(shopId, itemId);
  if (!item) return null;
  const phase = phaseForHour(hour ?? 12);
  const drift = demandMap ? (demandMap[keyOf(shopId, itemId)] || 0) : 0;
  const driftClamped = Math.max(-0.3, Math.min(0.5, drift));
  return Math.max(1, Math.round(item.price * phase.price * (1 + driftClamped)));
}

function clone(v) {
  return JSON.parse(JSON.stringify(v));
}

export function createEconomySystem(ctx = {}) {
  const c = ctx || {};
  let day = 1;
  let spent = 0;
  let earned = 0;
  let purchases = 0;
  let nightPurchases = 0;
  let visited = new Set();
  let stock = {};
  let demand = {};
  let ledger = [];
  let restockTimers = {};
  let localCash = typeof c.startingCash === 'number' ? c.startingCash : 0;

  for (const shop of SHOPS) {
    for (const item of shop.items) {
      stock[keyOf(shop.id, item.id)] = item.stock;
      restockTimers[keyOf(shop.id, item.id)] = 0;
    }
  }

  function hourNow() {
    return typeof c.getHour === 'function' ? c.getHour() : 12;
  }

  function cashNow() {
    if (typeof c.getCash === 'function') return c.getCash();
    return localCash;
  }

  function moveCash(amount) {
    if (typeof c.addCash === 'function') c.addCash(amount);
    else localCash += amount;
  }

  function shout(msg) {
    if (typeof c.notify === 'function') c.notify(msg);
  }

  const sys = {
    shopById,
    itemById,
    phaseForHour,

    get ledger() { return clone(ledger); },
    get day() { return day; },

    priceOf(shopId, itemId) {
      return currentPrice(shopId, itemId, hourNow(), demand);
    },

    stockOf(shopId, itemId) {
      const k = keyOf(shopId, itemId);
      return stock[k] ?? 0;
    },

    openShops() {
      const h = hourNow();
      return SHOPS.filter((s) => isShopOpen(s, h));
    },

    buy(shopId, itemId, qty = 1) {
      const shop = shopById(shopId);
      const item = itemById(shopId, itemId);
      if (!shop || !item) return { ok: false, reason: 'unknown-item' };
      const hour = hourNow();
      if (!isShopOpen(shop, hour)) return { ok: false, reason: 'closed', shop: shop.name };
      const phase = phaseForHour(hour);
      if (item.nightOnly && phase.id !== 'night') return { ok: false, reason: 'night-only' };
      const k = keyOf(shopId, itemId);
      if ((stock[k] || 0) < qty) return { ok: false, reason: 'no-stock', stock: stock[k] || 0 };
      const unit = currentPrice(shopId, itemId, hour, demand);
      const total = unit * qty;
      if (cashNow() < total) return { ok: false, reason: 'no-cash', total, cash: cashNow() };
      moveCash(-total);
      stock[k] -= qty;
      demand[k] = Math.min(0.5, (demand[k] || 0) + 0.04 * qty);
      spent += total;
      purchases += qty;
      if (phase.id === 'night') nightPurchases += qty;
      visited.add(shopId);
      ledger.push({ day, hour, shop: shopId, item: itemId, name: item.name, quantity: qty, total, kind: 'buy' });
      if (ledger.length > 200) ledger.splice(0, ledger.length - 200);
      if (item.illegal) {
        if (typeof c.addHeat === 'function') c.addHeat(6);
        shout('Illegal goods — heat rising.');
      }
      shout(`Bought ${qty}× ${item.name} for $${total}.`);
      if (typeof c.onBuy === 'function') c.onBuy(shop, item, qty, total);
      return { ok: true, total, unit, unitPrice: unit, item: clone(item), shop: shop.name };
    },

    sellLoot(itemId, qty = 1) {
      let found = null;
      let foundShop = null;
      for (const shop of SHOPS) {
        const it = shop.items.find((i) => i.id === itemId);
        if (it) { found = it; foundShop = shop; break; }
      }
      if (!found) return { ok: false, reason: 'unknown-item' };
      const hour = hourNow();
      const phase = phaseForHour(hour);
      const rate = phase.id === 'night' ? 0.65 : 0.55;
      const total = Math.round(found.price * rate * qty);
      moveCash(total);
      earned += total;
      ledger.push({ day, hour, shop: foundShop.id, item: itemId, name: found.name, quantity: qty, total, kind: 'sell' });
      if (ledger.length > 200) ledger.splice(0, ledger.length - 200);
      shout(`Sold loot for $${total}.`);
      return { ok: true, total, item: clone(found) };
    },

    update(dtHours) {
      const step = Number(dtHours) || 0;
      for (const shop of SHOPS) {
        for (const item of shop.items) {
          const k = keyOf(shop.id, item.id);
          restockTimers[k] = (restockTimers[k] || 0) + step;
          if (restockTimers[k] >= item.restockHours) {
            stock[k] = item.stock;
            restockTimers[k] = 0;
          }
          if (demand[k]) {
            demand[k] *= Math.pow(0.5, step / 6);
            if (Math.abs(demand[k]) < 0.001) demand[k] = 0;
          }
        }
      }
    },

    advanceDay() {
      day += 1;
      for (const shop of SHOPS) {
        for (const item of shop.items) {
          const k = keyOf(shop.id, item.id);
          stock[k] = item.stock;
          restockTimers[k] = 0;
        }
      }
      demand = {};
      shout(`Day ${day} — shelves restocked.`);
      return { ok: true, day };
    },

    summary() {
      const hour = hourNow();
      const phase = phaseForHour(hour);
      return {
        version: ECONOMY_VERSION,
        day,
        hour,
        phase: phase.id,
        phaseId: phase.id,
        phaseLabel: phase.label,
        cash: cashNow(),
        spent,
        earned,
        purchases,
        nightPurchases,
        visitedCount: visited.size,
        visited: [...visited],
        openShops: sys.openShops().map((s) => s.id),
      };
    },

    serialize() {
      return {
        version: ECONOMY_VERSION,
        day,
        spent,
        earned,
        purchases,
        nightPurchases,
        visited: [...visited],
        stock: { ...stock },
        demand: { ...demand },
        ledger: clone(ledger.slice(-50)),
      };
    },

    deserialize(input) {
      if (!input || typeof input !== 'object') return false;
      if (typeof input.day === 'number') day = input.day;
      if (typeof input.spent === 'number') spent = input.spent;
      if (typeof input.earned === 'number') earned = input.earned;
      if (typeof input.purchases === 'number') purchases = input.purchases;
      if (typeof input.nightPurchases === 'number') nightPurchases = input.nightPurchases;
      if (Array.isArray(input.visited)) visited = new Set(input.visited);
      if (input.stock && typeof input.stock === 'object') stock = { ...input.stock };
      if (input.demand && typeof input.demand === 'object') demand = { ...input.demand };
      if (Array.isArray(input.ledger)) ledger = clone(input.ledger.slice(-200));
      return true;
    },
  };

  return sys;
}
