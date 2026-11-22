// Solara Nights — Businesses (round 4 attempt 6, NEW module).
// Buy a front in Solara Bay and it pays you while you play. A laundromat
// washes cash quietly, a garage fixes cars for the neighbourhood, a bar
// pulls a crowd at night — each business has a price, an hourly income,
// an upkeep cost, and a risk profile. The bigger the earner, the more
// attention it draws: police raids can shut a business down for a while,
// and a business left unvisited slowly loses condition until the player
// pays for repairs. Income accrues per in-game hour and is collected at
// the premises; uncollected cash piles up (and can be stolen in a raid).
//
// Businesses also feed the rest of the game: owning the garage unlocks
// cheap repairs, owning the bar unlocks the late-night crowd (and the
// smuggling contacts in smuggling.js), and owning all three unlocks the
// "King of the Bay" bonus. The module is self-contained and talks to the
// game only through the optional `ctx` hooks.

export const BUSINESS_VERSION = 1;

export const BUSINESS_TYPES = [
  {
    id: 'laundromat', name: 'Spin Cycle Laundromat', price: 800,
    incomePerHour: 12, upkeepPerHour: 2, risk: 0.05,
    x: -120, z: 80, desc: 'Quiet, steady, boring — and boring is safe.',
    perk: 'Wash $200 of heat per visit: cops look the other way.',
  },
  {
    id: 'garage', name: 'Reyes Auto Garage', price: 1500,
    incomePerHour: 22, upkeepPerHour: 5, risk: 0.08,
    x: 60, z: -140, desc: 'Fixes cars by day. Fixes other things by night.',
    perk: 'Repairs cost 50% less; free respray once a day.',
  },
  {
    id: 'bar', name: 'Neon Palms Bar', price: 2500,
    incomePerHour: 40, upkeepPerHour: 9, risk: 0.14,
    x: 180, z: 40, desc: 'The strip crowd drinks here. So do the cops.',
    perk: 'Unlocks smuggling contacts; night income x1.5.',
  },
  {
    id: 'diner', name: 'Sunrise Diner', price: 1200,
    incomePerHour: 16, upkeepPerHour: 3, risk: 0.04,
    x: -200, z: -60, desc: 'Breakfast all day, regulars all week.',
    perk: 'Free health refill once per day.',
  },
  {
    id: 'arcade', name: 'Pixel Palace Arcade', price: 2000,
    incomePerHour: 30, upkeepPerHour: 7, risk: 0.10,
    x: 40, z: 200, desc: 'Kids by day, high rollers by night.',
    perk: 'Stunt score bonus +10% while owned.',
  },
];

export function businessById(id) {
  return BUSINESS_TYPES.find((b) => b.id === id) || null;
}

export function isNightHour(hour) {
  return hour >= 20 || hour < 5;
}

// Income for one game-hour, before upkeep, with night and condition mods.
export function hourlyIncome(biz, hour, condition) {
  let income = biz.incomePerHour;
  if (biz.id === 'bar' && isNightHour(hour)) income *= 1.5;
  if (biz.id === 'arcade' && hour >= 15 && hour < 20) income *= 1.25;
  if (biz.id === 'diner' && hour >= 6 && hour < 11) income *= 1.3;
  income *= 0.5 + condition * 0.5;
  return Math.round(income);
}

export function raidChancePerHour(biz, heatLevel) {
  // Base risk, doubled when the player is hot, halved when ice cold.
  const heatMod = heatLevel >= 3 ? 2 : heatLevel === 0 ? 0.5 : 1;
  return biz.risk * heatMod;
}

export function repairCost(biz, condition) {
  const missing = 1 - condition;
  return Math.round(biz.price * 0.25 * missing);
}

export function createBusinessSystem(ctx = {}) {
  const rng = ctx.rng || Math.random;
  const state = {
    version: BUSINESS_VERSION,
    owned: {}, // id -> { condition, uncollected, hoursOwned, raids, lastVisitHour, shutdownUntil }
    totalEarned: 0,
    totalSpent: 0,
    totalRaids: 0,
    totalCollected: 0,
    log: [],
  };

  function note(msg) {
    state.log.push(msg);
    if (state.log.length > 40) state.log.shift();
    if (typeof ctx.log === 'function') ctx.log(msg);
  }

  function cash() {
    return typeof ctx.getCash === 'function' ? ctx.getCash() : (ctx.cash ?? 0);
  }

  function addCash(amount) {
    if (typeof ctx.addCash === 'function') ctx.addCash(amount);
    else if (typeof ctx.cash === 'number') ctx.cash += amount;
  }

  function heatLevel() {
    if (typeof ctx.getHeatLevel === 'function') return ctx.getHeatLevel();
    return typeof ctx.heat === 'number' ? ctx.heat : 0;
  }

  function hourNow() {
    if (typeof ctx.getHour === 'function') return ctx.getHour();
    return 12;
  }

  function buy(bizId) {
    const biz = businessById(bizId);
    if (!biz) return { ok: false, reason: 'unknown-business' };
    if (state.owned[bizId]) return { ok: false, reason: 'already-owned' };
    if (cash() < biz.price) return { ok: false, reason: 'not-enough-cash' };
    addCash(-biz.price);
    state.totalSpent += biz.price;
    state.owned[bizId] = {
      condition: 1, uncollected: 0, hoursOwned: 0,
      raids: 0, shutdownUntil: 0, visits: 1,
    };
    note(`Bought ${biz.name} for $${biz.price}. ${biz.perk}`);
    if (typeof ctx.onBuyBusiness === 'function') ctx.onBuyBusiness(biz);
    return { ok: true, business: bizId };
  }

  function sell(bizId) {
    const biz = businessById(bizId);
    const owned = state.owned[bizId];
    if (!biz || !owned) return { ok: false, reason: 'not-owned' };
    const refund = Math.round(biz.price * 0.6 * owned.condition) + owned.uncollected;
    delete state.owned[bizId];
    addCash(refund);
    note(`Sold ${biz.name} for $${refund}.`);
    return { ok: true, refund };
  }

  // Advance one in-game hour for every owned business.
  function tickHour(hour = hourNow()) {
    for (const [id, owned] of Object.entries(state.owned)) {
      const biz = businessById(id);
      if (!biz) continue;
      owned.hoursOwned += 1;
      if (hour < owned.shutdownUntil) continue; // raided: closed this hour.
      const income = hourlyIncome(biz, hour, owned.condition);
      const upkeep = biz.upkeepPerHour;
      owned.uncollected += Math.max(0, income - upkeep);
      state.totalEarned += Math.max(0, income - upkeep);
      // Condition decays slowly; faster when the business is raided or hot.
      owned.condition = Math.max(0.2, owned.condition - 0.004 - heatLevel() * 0.001);
      // Raid roll.
      if (rng() < raidChancePerHour(biz, heatLevel())) {
        const stolen = Math.floor(owned.uncollected * 0.5);
        owned.uncollected -= stolen;
        owned.condition = Math.max(0.2, owned.condition - 0.25);
        owned.raids += 1;
        owned.shutdownUntil = hour + 4;
        state.totalRaids += 1;
        note(`🚨 RAID at ${biz.name}! Cops seized $${stolen} and shut it down for 4 hours.`);
        if (typeof ctx.onRaid === 'function') ctx.onRaid(biz, stolen);
      }
    }
  }

  function collect(bizId) {
    const owned = state.owned[bizId];
    if (!owned) return { ok: false, reason: 'not-owned' };
    const amount = owned.uncollected;
    if (amount <= 0) return { ok: false, reason: 'nothing-to-collect' };
    owned.uncollected = 0;
    owned.visits += 1;
    state.totalCollected += amount;
    addCash(amount);
    const biz = businessById(bizId);
    note(`Collected $${amount} from ${biz.name}.`);
    // Visiting the laundromat washes a little heat.
    if (bizId === 'laundromat' && typeof ctx.reduceHeat === 'function') ctx.reduceHeat(10);
    return { ok: true, amount };
  }

  function collectAll() {
    let total = 0;
    let count = 0;
    for (const id of Object.keys(state.owned)) {
      const r = collect(id);
      if (r.ok) { total += r.amount; count += 1; }
    }
    return { ok: count > 0, total, count };
  }

  function repair(bizId) {
    const biz = businessById(bizId);
    const owned = state.owned[bizId];
    if (!biz || !owned) return { ok: false, reason: 'not-owned' };
    const cost = repairCost(biz, owned.condition);
    if (cost <= 0) return { ok: false, reason: 'already-perfect' };
    if (cash() < cost) return { ok: false, reason: 'not-enough-cash' };
    addCash(-cost);
    owned.condition = 1;
    note(`Repaired ${biz.name} to perfect condition for $${cost}.`);
    return { ok: true, cost };
  }

  function visit(bizId) {
    const owned = state.owned[bizId];
    if (!owned) return { ok: false, reason: 'not-owned' };
    owned.visits += 1;
    return { ok: true, owned };
  }

  function ownedCount() {
    return Object.keys(state.owned).length;
  }

  function hasPerk(perkId) {
    return !!state.owned[perkId];
  }

  function kingOfTheBay() {
    return ownedCount() >= 3;
  }

  function projectedHourly(hour = hourNow()) {
    let total = 0;
    for (const [id, owned] of Object.entries(state.owned)) {
      const biz = businessById(id);
      if (biz) total += Math.max(0, hourlyIncome(biz, hour, owned.condition) - biz.upkeepPerHour);
    }
    if (kingOfTheBay()) total = Math.round(total * 1.15);
    return total;
  }

  function stats() {
    return {
      owned: ownedCount(),
      totalEarned: state.totalEarned,
      totalSpent: state.totalSpent,
      totalCollected: state.totalCollected,
      totalRaids: state.totalRaids,
      projectedHourly: projectedHourly(),
      kingOfTheBay: kingOfTheBay(),
      uncollected: Object.values(state.owned).reduce((a, o) => a + o.uncollected, 0),
    };
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(data) {
    if (!data || data.version !== BUSINESS_VERSION) return false;
    Object.assign(state, data);
    return true;
  }

  function hudLine() {
    const s = stats();
    if (!s.owned) return '';
    return `BUSINESS: ${s.owned} owned — $${s.uncollected} uncollected — ~$${s.projectedHourly}/h`;
  }

  return {
    name: 'businesses',
    version: BUSINESS_VERSION,
    state,
    types: BUSINESS_TYPES,
    buy,
    sell,
    tickHour,
    collect,
    collectAll,
    repair,
    visit,
    ownedCount,
    hasPerk,
    kingOfTheBay,
    projectedHourly,
    stats,
    serialize,
    deserialize,
    hudLine,
  };
}

export default createBusinessSystem;
