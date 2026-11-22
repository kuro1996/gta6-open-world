// Solara Nights — Wanted Heat + Safehouses (round 4 attempt 5, NEW module).
// Heat is the memory of the police. It rises when Ria steals, rams or is
// spotted, and it does NOT melt away just because she drives fast — it only
// really falls when she is out of sight, and it falls fastest inside a
// safehouse she owns. Safehouses are bought with cash, each with its own
// perks: a garage that repairs, a stash that hides loot, a bed that heals.
// While hidden inside, the search timer ticks down; step outside too early
// and the hunt resumes where it left off.
//
// Like the economy module this one is self-contained and talks to the game
// only through optional `ctx` hooks (getStars, setStars, getCash, addCash,
// notify, isInVehicle, getPosition). Every hook is guarded.

export const SAFEHOUSE_VERSION = 1;

// Heat 0..100. Stars are derived: 20 heat per star, capped at 5.
export function heatToStars(heat) {
  return Math.max(0, Math.min(5, Math.floor(heat / 20)));
}

export function starsToHeat(stars) {
  return Math.max(0, Math.min(5, stars)) * 20;
}

// How fast heat decays per game second, by situation.
export const HEAT_DECAY = {
  hiddenSafehouse: 6.0, // inside an owned safehouse: gone in ~17s from max
  hiding: 1.2, // out of sight, on foot, no cops in range
  drivingCalm: 0.35, // driving normally, no recent crime
  inChase: 0, // heat never decays while actively chased
};

export const SAFEHOUSES = [
  {
    id: 'harbor-loft',
    name: 'Harbor Loft',
    district: 'Harbor',
    x: 120,
    y: 640,
    price: 0,
    blurb: 'Ria\u2019s first roof. Free, cramped, and already hers.',
    perks: ['stash:10', 'sleep:heal-25'],
    repairRate: 0,
    healRate: 25,
    stashSlots: 10,
  },
  {
    id: 'marina-apartment',
    name: 'Marina Apartment',
    district: 'Marina',
    x: 820,
    y: 180,
    price: 2500,
    blurb: 'Sea view, thin walls, a garage that fits one car.',
    perks: ['stash:20', 'sleep:heal-50', 'garage:repair-10'],
    repairRate: 10,
    healRate: 50,
    stashSlots: 20,
  },
  {
    id: 'downtown-penthouse',
    name: 'Downtown Penthouse',
    district: 'Downtown',
    x: 560,
    y: 420,
    price: 8000,
    blurb: 'Top floor, blackout glass. Nobody looks up here.',
    perks: ['stash:40', 'sleep:heal-full', 'garage:repair-25', 'heat:fast-cool'],
    repairRate: 25,
    healRate: 100,
    stashSlots: 40,
  },
  {
    id: 'old-town-basement',
    name: 'Old Town Basement',
    district: 'Old Town',
    x: 240,
    y: 300,
    price: 1200,
    blurb: 'A basement with two exits. Smells of rain and diesel.',
    perks: ['stash:15', 'sleep:heal-40', 'heat:fast-cool'],
    repairRate: 0,
    healRate: 40,
    stashSlots: 15,
  },
];

export function safehouseById(id) {
  return SAFEHOUSES.find((s) => s.id === id) || null;
}

// Distance check: close enough to slip inside (game units).
export function nearSafehouse(x, y, range = 48) {
  let best = null;
  let bestDist = Infinity;
  for (const s of SAFEHOUSES) {
    const d = Math.hypot(s.x - x, s.y - y);
    if (d < bestDist) {
      bestDist = d;
      best = s;
    }
  }
  return best && bestDist <= range ? { safehouse: best, dist: bestDist } : null;
}

export function createSafehouseSystem(ctx = {}) {
  const hooks = {
    getStars: typeof ctx.getStars === 'function' ? ctx.getStars : null,
    setStars: typeof ctx.setStars === 'function' ? ctx.setStars : null,
    getCash: typeof ctx.getCash === 'function' ? ctx.getCash : null,
    addCash: typeof ctx.addCash === 'function' ? ctx.addCash : null,
    notify: typeof ctx.notify === 'function' ? ctx.notify : () => {},
    getPosition: typeof ctx.getPosition === 'function' ? ctx.getPosition : null,
    isChased: typeof ctx.isChased === 'function' ? ctx.isChased : () => false,
    onHeatChange: typeof ctx.onHeatChange === 'function' ? ctx.onHeatChange : () => {},
  };

  const state = {
    heat: 0,
    owned: new Set(['harbor-loft']),
    insideId: null,
    stash: {}, // itemId -> qty, capped per safehouse stashSlots
    stashCount: 0,
    searchTimer: 0, // seconds the police keep searching after losing sight
    timesHidden: 0,
    timesBusted: 0,
    heatShedTotal: 0,
    lastStars: 0,
  };

  function cash() {
    if (hooks.getCash) return hooks.getCash();
    return 0;
  }

  function stars() {
    if (hooks.getStars) return hooks.getStars();
    return heatToStars(state.heat);
  }

  function pushStars() {
    const s = heatToStars(state.heat);
    if (s !== state.lastStars) {
      state.lastStars = s;
      if (hooks.setStars) hooks.setStars(s);
      hooks.onHeatChange(state.heat, s);
    }
  }

  // Add heat from a crime. Returns the new star level.
  function addHeat(amount, reason = 'crime') {
    if (!(amount > 0)) return stars();
    state.heat = Math.min(100, state.heat + amount);
    // Fresh crime restarts the search clock: cops hunt for at least 20s.
    state.searchTimer = Math.max(state.searchTimer, 20);
    pushStars();
    if (state.heat >= 80) hooks.notify('5 stars! The whole city is looking for you.');
    else if (state.heat >= 60) hooks.notify(`Heat rising (${reason}). Find a safehouse.`);
    return stars();
  }

  // Instantly shed heat (fake plate, bribe, mission reward).
  function shedHeat(amount, reason = 'cooled off') {
    if (!(amount > 0)) return stars();
    const before = state.heat;
    state.heat = Math.max(0, state.heat - amount);
    state.heatShedTotal += before - state.heat;
    pushStars();
    hooks.notify(`Heat down: ${reason}.`);
    return stars();
  }

  // Mirror the game's wanted heat into this system (called once per frame
  // by main.js; the game stays the source of truth for crimes, the
  // safehouse only adds its own decay while the player hides inside).
  function syncHeat(heat) {
    state.heat = Math.max(0, Math.min(100, heat || 0));
    pushStars();
  }

  function buySafehouse(id) {
    const house = safehouseById(id);
    if (!house) return { ok: false, reason: 'unknown-safehouse' };
    if (state.owned.has(id)) return { ok: false, reason: 'already-owned' };
    if (cash() < house.price) return { ok: false, reason: 'not-enough-cash', price: house.price, cash: cash() };
    if (hooks.addCash) hooks.addCash(-house.price);
    state.owned.add(id);
    hooks.notify(`Bought ${house.name} for $${house.price}. It is yours now.`);
    return { ok: true, house };
  }

  function enterSafehouse(id) {
    const house = safehouseById(id);
    if (!house) return { ok: false, reason: 'unknown-safehouse' };
    if (!state.owned.has(id)) return { ok: false, reason: 'not-owned', price: house.price };
    if (hooks.isChased()) return { ok: false, reason: 'chased' };
    state.insideId = id;
    state.timesHidden += 1;
    hooks.notify(`Inside ${house.name}. Lay low — heat is falling fast.`);
    return { ok: true, house };
  }

  function exitSafehouse() {
    if (!state.insideId) return { ok: false, reason: 'not-inside' };
    const house = safehouseById(state.insideId);
    state.insideId = null;
    // Leaving while still hot is a risk: a short search resumes outside.
    if (state.heat >= 40) state.searchTimer = Math.max(state.searchTimer, 8);
    return { ok: true, house };
  }

  function inside() {
    return state.insideId ? safehouseById(state.insideId) : null;
  }

  // Stash loot in the current safehouse. Returns { ok, reason? }.
  function depositStash(itemId, qty = 1) {
    const house = inside();
    if (!house) return { ok: false, reason: 'not-inside' };
    if (state.stashCount + qty > house.stashSlots) {
      return { ok: false, reason: 'stash-full', slots: house.stashSlots, used: state.stashCount };
    }
    state.stash[itemId] = (state.stash[itemId] || 0) + qty;
    state.stashCount += qty;
    return { ok: true, stored: state.stash[itemId] };
  }

  function withdrawStash(itemId, qty = 1) {
    const have = state.stash[itemId] || 0;
    if (have < qty) return { ok: false, reason: 'not-enough-stashed', have };
    state.stash[itemId] = have - qty;
    if (state.stash[itemId] === 0) delete state.stash[itemId];
    state.stashCount -= qty;
    return { ok: true, left: state.stash[itemId] || 0 };
  }

  // Per-frame heat simulation. dt is real seconds; situation is derived
  // from the hooks and the safehouse state.
  function update(dt) {
    if (!(dt > 0)) return;
    const house = inside();
    if (house) {
      const rate = HEAT_DECAY.hiddenSafehouse * (house.perks.includes('heat:fast-cool') ? 1.5 : 1);
      const before = state.heat;
      state.heat = Math.max(0, state.heat - rate * dt);
      state.heatShedTotal += before - state.heat;
      if (state.searchTimer > 0) state.searchTimer = Math.max(0, state.searchTimer - dt * 2);
      pushStars();
      return;
    }
    if (hooks.isChased()) {
      if (state.searchTimer > 0) state.searchTimer = Math.max(0, state.searchTimer - dt);
      return; // chased: no decay at all
    }
    if (state.searchTimer > 0) {
      state.searchTimer = Math.max(0, state.searchTimer - dt);
      return; // still being searched: hold heat
    }
    // Nobody actively hunting: slow calm decay.
    const before = state.heat;
    state.heat = Math.max(0, state.heat - HEAT_DECAY.drivingCalm * dt);
    state.heatShedTotal += before - state.heat;
    pushStars();
  }

  // Sleeping in a safehouse heals (and repairs the parked car, if the
  // house has a garage). Returns what was restored.
  function sleep(hours = 8) {
    const house = inside();
    if (!house) return { ok: false, reason: 'not-inside' };
    const healed = Math.min(100, house.healRate * Math.max(1, hours / 8));
    const repaired = house.repairRate * Math.max(1, hours / 8);
    const before = state.heat;
    state.heat = Math.max(0, state.heat - HEAT_DECAY.hiddenSafehouse * 30);
    state.heatShedTotal += before - state.heat;
    state.searchTimer = 0;
    pushStars();
    hooks.notify(`Slept ${hours}h at ${house.name}. Rested, heat gone.`);
    return { ok: true, healed, repaired, house: house.id };
  }

  function status() {
    return {
      version: SAFEHOUSE_VERSION,
      heat: Math.round(state.heat * 10) / 10,
      stars: stars(),
      insideId: state.insideId,
      owned: [...state.owned],
      stashCount: state.stashCount,
      stashSlots: inside() ? inside().stashSlots : 0,
      searchTimer: Math.round(state.searchTimer),
      timesHidden: state.timesHidden,
      heatShedTotal: Math.round(state.heatShedTotal),
    };
  }

  function serialize() {
    return {
      version: SAFEHOUSE_VERSION,
      heat: state.heat,
      owned: [...state.owned],
      insideId: state.insideId,
      stash: { ...state.stash },
      stashCount: state.stashCount,
      searchTimer: state.searchTimer,
      timesHidden: state.timesHidden,
      heatShedTotal: state.heatShedTotal,
    };
  }

  function deserialize(data) {
    if (!data || typeof data !== 'object') return false;
    state.heat = Math.max(0, Math.min(100, data.heat || 0));
    state.owned = new Set(data.owned || ['harbor-loft']);
    state.insideId = data.insideId || null;
    state.stash = { ...(data.stash || {}) };
    state.stashCount = data.stashCount || 0;
    state.searchTimer = data.searchTimer || 0;
    state.timesHidden = data.timesHidden || 0;
    state.heatShedTotal = data.heatShedTotal || 0;
    state.lastStars = heatToStars(state.heat);
    return true;
  }

  return {
    addHeat, shedHeat, syncHeat, buySafehouse, enterSafehouse, exitSafehouse, inside,
    depositStash, withdrawStash, update, sleep, status, serialize, deserialize,
    heatToStars, safehouseById, nearSafehouse,
    get heat() { return state.heat; },
    get stash() { return { ...state.stash }; },
  };
}
