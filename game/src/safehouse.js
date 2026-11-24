export const SAFEHOUSE_VERSION = 1;

export const HEAT_DECAY = {
  hiddenSafehouse: 6.0,
  hiding: 1.2,
  drivingCalm: 0.35,
  inChase: 0,
};

export const SAFEHOUSES = [
  { id: 'harbor-loft', name: 'Harbor Loft', district: 'Harbor', x: -140, y: 120, price: 0, blurb: 'Ria\u2019s first roof over her head.', perks: ['fast-cool'], repairRate: 4, healRate: 6, stashSlots: 4 },
  { id: 'marina-apt', name: 'Marina Apartment', district: 'Marina', x: 60, y: -80, price: 2500, blurb: 'Clean, quiet, and one floor above the gossip.', perks: ['fast-cool'], repairRate: 6, healRate: 8, stashSlots: 6 },
  { id: 'downtown-pent', name: 'Downtown Penthouse', district: 'Downtown', x: 20, y: 30, price: 8000, blurb: 'Glass, gold, and a view of the whole city.', perks: ['fast-cool', 'luxury'], repairRate: 10, healRate: 12, stashSlots: 10 },
  { id: 'oldtown-basement', name: 'Old Town Basement', district: 'Old Town', x: 150, y: 170, price: 1200, blurb: 'Damp, dark, and nobody asks questions.', perks: [], repairRate: 3, healRate: 5, stashSlots: 5 },
];

export function heatToStars(heat) {
  return Math.max(0, Math.min(5, Math.floor((heat || 0) / 20)));
}

export function starsToHeat(stars) {
  return Math.max(0, Math.min(5, stars || 0)) * 20;
}

export function safehouseById(id) {
  return SAFEHOUSES.find((s) => s.id === id) || null;
}

export function nearSafehouse(x, y, range = 48) {
  let best = null;
  let bestD = Infinity;
  for (const s of SAFEHOUSES) {
    const d = Math.hypot(s.x - x, s.y - y);
    if (d < bestD) { bestD = d; best = s; }
  }
  if (best && bestD <= range) return { ...best, distance: bestD };
  return null;
}

export function createSafehouseSystem(ctx = {}) {
  const c = ctx || {};
  let heat = 0;
  let owned = new Set(['harbor-loft']);
  let insideId = null;
  let stash = {};
  let stashCount = 0;
  let searchTimer = 0;
  let timesHidden = 0;
  let totalShed = 0;
  let lastStars = 0;

  function shout(msg) {
    if (typeof c.notify === 'function') c.notify(msg);
  }

  function pushStars() {
    const stars = heatToStars(heat);
    if (stars !== lastStars) {
      lastStars = stars;
      if (typeof c.setStars === 'function') c.setStars(stars);
      if (typeof c.onHeatChange === 'function') c.onHeatChange(heat, stars);
    }
  }

  function chased() {
    return typeof c.isChased === 'function' ? !!c.isChased() : false;
  }

  const sys = {
    heatToStars,
    safehouseById,
    nearSafehouse,

    get heat() { return heat; },
    get stash() { return { ...stash }; },

    addHeat(amount) {
      const a = Math.max(0, amount || 0);
      heat = Math.min(100, heat + a);
      if (searchTimer < 20) searchTimer = 20;
      if (heat >= 80) shout('FIVE STARS — get to a safehouse now!');
      else if (heat >= 60) shout('Heat is climbing. Find a safehouse.');
      pushStars();
      return heatToStars(heat);
    },

    shedHeat(amount) {
      const a = Math.max(0, amount || 0);
      heat = Math.max(0, heat - a);
      totalShed += a;
      pushStars();
      shout(`Heat down to ${Math.round(heat)}.`);
      return heatToStars(heat);
    },

    syncHeat(outside) {
      heat = Math.max(0, Math.min(100, Number(outside) || 0));
      pushStars();
      return heatToStars(heat);
    },

    buySafehouse(id) {
      const house = safehouseById(id);
      if (!house) return { ok: false, reason: 'unknown-house' };
      if (owned.has(id)) return { ok: false, reason: 'already-owned', house };
      const cash = typeof c.getCash === 'function' ? c.getCash() : 0;
      if (cash < house.price) return { ok: false, reason: 'no-cash', price: house.price, cash };
      if (typeof c.addCash === 'function') c.addCash(-house.price);
      owned.add(id);
      shout(`${house.name} is yours.`);
      return { ok: true, house, price: house.price };
    },

    enterSafehouse(id) {
      const house = safehouseById(id);
      if (!house) return { ok: false, reason: 'unknown-house' };
      if (!owned.has(id)) return { ok: false, reason: 'not-owned' };
      if (chased()) return { ok: false, reason: 'chased' };
      insideId = id;
      timesHidden += 1;
      shout(`Hiding out at ${house.name}.`);
      return { ok: true, house };
    },

    exitSafehouse() {
      if (!insideId) return { ok: false, reason: 'not-inside' };
      const house = safehouseById(insideId);
      insideId = null;
      if (heat >= 40) searchTimer = 8;
      return { ok: true, house };
    },

    inside() {
      return insideId ? safehouseById(insideId) : null;
    },

    depositStash(itemId, qty = 1) {
      const house = sys.inside();
      if (!house) return { ok: false, reason: 'not-inside' };
      if (stashCount + qty > house.stashSlots) return { ok: false, reason: 'stash-full', slots: house.stashSlots };
      stash[itemId] = (stash[itemId] || 0) + qty;
      stashCount += qty;
      return { ok: true, item: itemId, stored: stash[itemId], count: stashCount };
    },

    withdrawStash(itemId, qty = 1) {
      const held = stash[itemId] || 0;
      if (held < qty) return { ok: false, reason: 'not-enough', held, left: held };
      stash[itemId] = held - qty;
      stashCount -= qty;
      if (stash[itemId] <= 0) delete stash[itemId];
      return { ok: true, item: itemId, left: stash[itemId] || 0, withdrawn: qty };
    },

    update(dt) {
      const step = Number(dt) || 0;
      const house = sys.inside();
      if (house) {
        const rate = HEAT_DECAY.hiddenSafehouse * (house.perks.includes('fast-cool') ? 1.5 : 1);
        const shed = rate * step;
        heat = Math.max(0, heat - shed);
        totalShed += shed;
        searchTimer = Math.max(0, searchTimer - step * 2);
        pushStars();
        return;
      }
      if (chased()) {
        searchTimer = Math.max(0, searchTimer - step);
        return;
      }
      if (searchTimer > 0) {
        searchTimer = Math.max(0, searchTimer - step);
        return;
      }
      const shed = HEAT_DECAY.drivingCalm * step;
      heat = Math.max(0, heat - shed);
      totalShed += shed;
      pushStars();
    },

    sleep(hours = 8) {
      const house = sys.inside();
      if (!house) return { ok: false, reason: 'not-inside' };
      const h = Number(hours) || 8;
      const healed = Math.min(100, house.healRate * h);
      const repaired = Math.min(100, house.repairRate * h);
      const shed = HEAT_DECAY.hiddenSafehouse * 30;
      heat = Math.max(0, heat - shed);
      totalShed += shed;
      searchTimer = 0;
      pushStars();
      shout(`Rested at ${house.name}.`);
      return { ok: true, healed, repaired, house: house.id, houseId: house.id };
    },

    status() {
      const house = sys.inside();
      return {
        version: SAFEHOUSE_VERSION,
        heat: Math.round(heat),
        stars: heatToStars(heat),
        inside: insideId,
        insideId,
        owned: [...owned],
        stashCount,
        stashSlots: house ? house.stashSlots : 0,
        searchTimer: Math.round(searchTimer),
        timesHidden,
        totalShed: Math.round(totalShed),
      };
    },

    serialize() {
      return {
        version: SAFEHOUSE_VERSION,
        heat,
        owned: [...owned],
        inside: insideId,
        insideId,
        stash: { ...stash },
        stashCount,
        searchTimer,
        timesHidden,
        totalShed,
      };
    },

    deserialize(input) {
      if (!input || typeof input !== 'object') return false;
      heat = typeof input.heat === 'number' ? Math.max(0, Math.min(100, input.heat)) : heat;
      if (Array.isArray(input.owned)) owned = new Set(input.owned);
      if (owned.size === 0) owned.add('harbor-loft');
      insideId = typeof input.inside === 'string' ? input.inside : (typeof input.insideId === 'string' ? input.insideId : null);
      if (input.stash && typeof input.stash === 'object') stash = { ...input.stash };
      stashCount = typeof input.stashCount === 'number' ? input.stashCount : Object.values(stash).reduce((a, b) => a + b, 0);
      searchTimer = typeof input.searchTimer === 'number' ? input.searchTimer : 0;
      timesHidden = typeof input.timesHidden === 'number' ? input.timesHidden : 0;
      totalShed = typeof input.totalShed === 'number' ? input.totalShed : 0;
      lastStars = heatToStars(heat);
      return true;
    },
  };

  return sys;
}
