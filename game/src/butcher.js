// Butcher — Gus the Cleaver turns whole carcasses into prime cuts.
// Cut ten meats on the block, smoke the slow ones, and sell to the
// restaurants of Solara. The health inspector watches the back room,
// and a dull cleaver wastes good meat.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const MEAT_CUTS = [
  {
      id: 'ribeye',
      name: 'Ribeye Steak',
      basePrice: 46,
      time: 3,
      difficulty: 3,
      animal: 'beef',
      cut: 'rib',
      weight: 1.2,
      desc: 'Marbled, thick and rich — the steakhouse\'s crown cut.'
    },
  {
      id: 'sirloin',
      name: 'Sirloin Steak',
      basePrice: 34,
      time: 2,
      difficulty: 2,
      animal: 'beef',
      cut: 'loin',
      weight: 1.0,
      desc: 'Lean, firm and honest — the everyday steak done right.'
    },
  {
      id: 't-bone',
      name: 'T-Bone Steak',
      basePrice: 52,
      time: 3,
      difficulty: 4,
      animal: 'beef',
      cut: 'short loin',
      weight: 1.4,
      desc: 'Two steaks in one bone — strip and tenderloin together.'
    },
  {
      id: 'pork-chops',
      name: 'Pork Chops',
      basePrice: 26,
      time: 2,
      difficulty: 2,
      animal: 'pork',
      cut: 'loin',
      weight: 0.9,
      desc: 'Thick-cut chops, bone in, ready for the grill.'
    },
  {
      id: 'lamb-leg',
      name: 'Lamb Leg',
      basePrice: 58,
      time: 4,
      difficulty: 3,
      animal: 'lamb',
      cut: 'leg',
      weight: 2.2,
      desc: 'A whole leg for the Sunday roast, rosemary not included.'
    },
  {
      id: 'chicken-breast',
      name: 'Chicken Breast',
      basePrice: 18,
      time: 1,
      difficulty: 1,
      animal: 'chicken',
      cut: 'breast',
      weight: 0.6,
      desc: 'Boneless, skinless and always in demand.'
    },
  {
      id: 'ground-beef',
      name: 'Ground Beef',
      basePrice: 16,
      time: 1,
      difficulty: 1,
      animal: 'beef',
      cut: 'trim',
      weight: 0.8,
      desc: 'Freshly ground this morning — burgers, meatballs, everything.'
    },
  {
      id: 'sausages',
      name: 'Pork Sausages',
      basePrice: 20,
      time: 2,
      difficulty: 2,
      animal: 'pork',
      cut: 'shoulder',
      weight: 0.7,
      desc: 'Hand-linked, sage and pepper, snapped tight in natural casing.'
    },
  {
      id: 'brisket',
      name: 'Beef Brisket',
      basePrice: 40,
      time: 5,
      difficulty: 3,
      animal: 'beef',
      cut: 'brisket',
      weight: 2.5,
      desc: 'Tough until it is not — twelve hours of smoke turns it to silk.'
    },
  {
      id: 'ham-hock',
      name: 'Ham Hock',
      basePrice: 24,
      time: 4,
      difficulty: 2,
      animal: 'pork',
      cut: 'hock',
      weight: 1.1,
      desc: 'Smoky, salty and slow — the base of a hundred soups.'
    },
];

export const BUTCHER_UPGRADES = [
  { id: 'cleaver-set', name: 'Cleaver Set', cost: 120, desc: 'Cut 20% faster.', effect: 'brew-fast' },
  { id: 'smokehouse', name: 'Smokehouse', cost: 220, desc: 'Smoking pays +25%.', effect: 'age-plus' },
  { id: 'cold-room', name: 'Cold Room', cost: 180, desc: 'Ingredient costs -20%.', effect: 'cost-down' },
  { id: 'display-counter', name: 'Display Counter', cost: 300, desc: 'Sales pay +15%.', effect: 'sell-plus' },
  { id: 'meat-hooks', name: 'Meat Hooks', cost: 260, desc: 'Hold +40 cuts.', effect: 'stock-plus' },
  { id: 'sharpening-stone', name: 'Sharpening Stone', cost: 150, desc: 'Fewer wasted cuts.', effect: 'spoil-down' },
  { id: 'delivery-van', name: 'Delivery Van', cost: 520, desc: 'Sell in bulk to restaurants.', effect: 'bulk' },
  { id: 'master-cleaver', name: 'Master Cleaver', cost: 800, desc: 'Perfect cuts: +30% on prime meat.', effect: 'strong-plus' },
];

export const BUTCHER_ORDERS = [
  { id: 'steakhouse-12', name: 'Steakhouse Order', item: 'ribeye', qty: 12, pay: 560, days: 1, minRank: 0, desc: 'The steakhouse needs 12 ribeyes for Friday.' },
  { id: 'sunday-roast', name: 'Sunday Roast', item: 'lamb-leg', qty: 6, pay: 520, days: 2, minRank: 3, desc: 'A family orders 6 lamb legs for Sunday.' },
  { id: 'burger-joint', name: 'Burger Joint', item: 'ground-beef', qty: 20, pay: 340, days: 1, minRank: 1, desc: 'A burger joint needs 20 packs of ground beef.' },
  { id: 'bbq-party', name: 'BBQ Party', item: 'sausages', qty: 24, pay: 360, days: 1, minRank: 2, desc: 'A street BBQ orders 24 packs of sausages.' },
  { id: 'brisket-smoke', name: 'Brisket Smoke', item: 'brisket', qty: 8, pay: 460, days: 2, minRank: 3, desc: 'A smokehouse orders 8 briskets.' },
  { id: 'bistro-chops', name: 'Bistro Chops', item: 'pork-chops', qty: 14, pay: 360, days: 1, minRank: 2, desc: 'A bistro needs 14 pork chops for dinner.' },
  { id: 'chicken-run', name: 'Chicken Run', item: 'chicken-breast', qty: 30, pay: 340, days: 1, minRank: 1, desc: 'A cafe orders 30 chicken breasts for lunch.' },
  { id: 'mixed-cuts', name: 'Mixed Cuts', item: 'mixed', qty: 20, pay: 580, days: 2, minRank: 3, desc: 'Any 20 cuts for the harbour festival.' },
];

export const BUTCHER_EVENTS = [
  { id: 'meat-shortage', name: 'Meat Shortage', text: 'Carcasses are scarce — cutting costs more today.', effect: 'cost-up' },
  { id: 'dinner-rush', name: 'Dinner Rush', text: 'Restaurants queue at the counter — sales pay +20%.', effect: 'sell-up' },
  { id: 'health-inspection', name: 'Health Inspection', text: 'An inspector checks the cold room. Keep it spotless.', effect: 'heat' },
  { id: 'farm-delivery', name: 'Farm Delivery', text: 'A farm truck arrives — meat is cheap today.', effect: 'cost-down' },
  { id: 'wasted-cut', name: 'Wasted Cut', text: 'A cleaver slips — one cut may be wasted.', effect: 'spoil' },
  { id: 'street-fair', name: 'Street Fair', text: 'A fair opens outside — stalls order extra.', effect: 'orders-up' },
  { id: 'cold-snap', name: 'Cold Snap', text: 'Cold nights — roasts and stews fly off the shelves.', effect: 'sell-up' },
  { id: 'coldroom-breakdown', name: 'Cold Room Breakdown', text: 'The cold room warms up. Some stock is at risk.', effect: 'spoil' },
  { id: 'butcher-critic', name: 'Butcher Critic', text: 'A food critic visits and shares a trick.', effect: 'xp' },
  { id: 'rainy-night', name: 'Rainy Night', text: 'Rain keeps cooks inside — orders double.', effect: 'orders-up' },
];

export const BUTCHER_RANKS = [
  { level: 0, name: 'Block Hand', xp: 0, perk: 'Cut at base rate.' },
  { level: 1, name: 'Cleaver Hand', xp: 120, perk: '+10% sale prices.' },
  { level: 2, name: 'Master Butcher', xp: 300, perk: 'Wasted cuts forgiven once a day.' },
  { level: 3, name: 'Meat Baron', xp: 620, perk: '+20% sale prices, restaurants trust you.' },
  { level: 4, name: 'Legend of the Block', xp: 1100, perk: '+30% sale prices, smoked cuts doubled.' },
];

export const BUTCHER_HELPERS = [
  { id: 'apprentice', name: 'Cole the Apprentice', wage: 25, skill: 'haul', bonus: 0.15, desc: 'Hauls carcasses: +15% cut yield.' },
  { id: 'smoke-keeper', name: 'Ada the Smoke Keeper', wage: 40, skill: 'age', bonus: 0.25, desc: 'Watches the smokehouse: +25% smoking speed.' },
  { id: 'counter-runner', name: 'Max the Runner', wage: 60, skill: 'sell', bonus: 0.12, desc: 'Knows every restaurant: +12% sale prices.' },
  { id: 'cleaver-master', name: 'Old Gus Jr', wage: 80, skill: 'brew', bonus: 0.2, desc: 'Cleaver master: +20% cut quality.' },
];

export const BUTCHER_CHALLENGES = [
  { id: 'cuts-100', name: 'First Hundred Cuts', target: 'produced', goal: 100, xp: 80, desc: 'Cut 100 pieces in total.' },
  { id: 'sell-500', name: 'Half Grand', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from meat sales.' },
  { id: 'smoke-20', name: 'Smoke Master', target: 'aged', goal: 20, xp: 100, desc: 'Smoke 20 cuts.' },
  { id: 'orders-10', name: 'Restaurant Favourite', target: 'ordersDone', goal: 10, xp: 140, desc: 'Complete 10 restaurant orders.' },
  { id: 'streak-10', name: 'Clean Block', target: 'bestStreak', goal: 10, xp: 110, desc: 'Cut 10 pieces in a row without a wasted one.' },
  { id: 'rank-3', name: 'Meat Baron', target: 'rank', goal: 3, xp: 150, desc: 'Reach rank Meat Baron.' },
  { id: 'earn-2000', name: 'Butcher Baron', target: 'earned', goal: 2000, xp: 160, desc: 'Earn $2,000 from the butcher shop.' },
  { id: 'batches-50', name: 'Busy Block', target: 'batches', goal: 50, xp: 90, desc: 'Cut 50 batches.' },
];

export const BUTCHER_ACHIEVEMENTS = [
  { id: 'first-cut', name: 'First Cut', check: 'batches', goal: 1, desc: 'Cut your first piece.' },
  { id: 'first-sale', name: 'First Sale', check: 'sold', goal: 1, desc: 'Sell your first cut.' },
  { id: 'first-smoke', name: 'Smoke On', check: 'aged', goal: 1, desc: 'Smoke your first cut.' },
  { id: 'rank-2', name: 'Master Butcher', check: 'rank', goal: 2, desc: 'Reach rank Master Butcher.' },
  { id: 'rich-meat', name: 'Meat Rich', check: 'earned', goal: 2000, desc: 'Earn $2,000 from meat.' },
  { id: 'full-kit', name: 'Full Kit', check: 'upgradesCount', goal: 8, desc: 'Own every butcher upgrade.' },
  { id: 'no-waste', name: 'Clean Hands', check: 'spoiled', goal: 0, desc: 'Cut 50 pieces with zero wasted — checked at 50.' },
  { id: 'big-cut', name: 'Big Cut', check: 'bestBatch', goal: 20, desc: 'Cut 20 pieces in one batch.' },
];

export const BUTCHER_TIPS = [
  { id: 'fresh-first', name: 'Fresh First', text: 'Fresh meat pays double. Sell the morning cut by noon.' },
  { id: 'smoke-it', name: 'Smoke It', text: 'Smoked cuts pay far more than fresh ones.' },
  { id: 'cleaver-care', name: 'Cleaver Care', text: 'A sharp cleaver is half the butcher. Never cut with a dull blade.' },
  { id: 'fair-stock', name: 'Fair Stock', text: 'Stock up before street fairs — prices jump 20%.' },
  { id: 'cold-watch', name: 'Cold Watch', text: 'A cold room saves more meat than luck ever will.' },
  { id: 'order-first', name: 'Orders First', text: 'Take a restaurant order, then cut for it.' },
  { id: 'brisket-money', name: 'Brisket Money', text: 'Brisket costs the most and pays the most. Save it for smokehouses.' },
  { id: 'hook-space', name: 'Hook Space', text: 'Buy meat hooks early — a full rail is a stuck shop.' },
];

export const BUTCHER_RECORDS = [
  { id: 'biggest-cut', name: 'Biggest Cut', stat: 'bestBatch', unit: 'cuts', desc: 'Most cuts in one batch.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from meat.' },
  { id: 'most-cut', name: 'Most Cut', stat: 'produced', unit: 'cuts', desc: 'Most cuts made.' },
  { id: 'most-smoked', name: 'Most Smoked', stat: 'aged', unit: 'cuts', desc: 'Most cuts smoked.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'cuts', desc: 'Longest clean cut streak.' },
];

export const BUTCHER_MARKET_EVENTS = [
  { id: 'ribeye-boom', name: 'Ribeye Boom', items: ["ribeye"], mult: 1.4, desc: 'Steakhouses pay 40% more for ribeye.' },
  { id: 'ground-glut', name: 'Ground Glut', items: ["ground-beef", "chicken-breast"], mult: 0.6, desc: 'Too much ground meat — prices crash.' },
  { id: 'brisket-rush', name: 'Brisket Rush', items: ["brisket"], mult: 1.5, desc: 'A brisket craze sweeps the city.' },
  { id: 'lamb-season', name: 'Lamb Season', items: ["lamb-leg"], mult: 1.3, desc: 'Spring makes lamb king.' },
  { id: 'sausage-morning', name: 'Sausage Morning', items: ["sausages"], mult: 1.35, desc: 'Sausages are the market favourite.' },
  { id: 't-bone-night', name: 'T-Bone Night', items: ["t-bone"], mult: 1.3, desc: 'Collectors drive T-bones up.' },
  { id: 'pork-trend', name: 'Pork Trend', items: ["pork-chops", "ham-hock"], mult: 1.25, desc: 'Pork is suddenly fashionable.' },
  { id: 'chicken-summer', name: 'Chicken Summer', items: ["chicken-breast"], mult: 1.3, desc: 'Summer grills love chicken.' },
  { id: 'sirloin-week', name: 'Sirloin Week', items: ["sirloin"], mult: 1.2, desc: 'Sirloin gets its week.' },
  { id: 'meat-tax', name: 'Meat Tax', items: ["ribeye", "t-bone"], mult: 0.7, desc: 'A luxury tax hits the prime cuts.' },
  { id: 'dry-week', name: 'Dry Week', items: ["ribeye", "sausages"], mult: 0.75, desc: 'A diet fad dries sales.' },
  { id: 'butcher-festival', name: 'Butcher Festival', items: ["ribeye", "sausages", "ground-beef"], mult: 1.2, desc: 'The festival lifts everything.' },
];

export const BUTCHER_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Fresh lamb, fresh customers.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Festival season, steady hunger.' },
  { id: 'autumn', name: 'Autumn', mult: 1.1, desc: 'Harvest roasts and stews.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold and quiet, but roasts sell.' },
];

export const BUTCHER_LEADERBOARD = [
  { name: 'Gus', total: 4200, desc: 'The butcher. Untouchable.' },
  { name: 'Ada', total: 2900, desc: 'Smoke keeper for forty years.' },
  { name: 'You', total: 0, desc: 'Climbing.' },
  { name: 'Cole', total: 1500, desc: 'Fast hands, faster cleaver.' },
  { name: 'Max', total: 2400, desc: 'Counter runner.' },
];

export const BUTCHER_QUICK_START = [
  'Cut chicken breast first — cheap, fast, always sells.',
  'Smoke everything you can afford to wait for.',
  'Buy the sharpening stone before the master cleaver.',
  'Take restaurant orders, then cut for them.',
  'Sell the morning cut by noon — freshness pays.',
  'Check the price board every morning.',
];

export function butcherRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < BUTCHER_RANKS.length; i++) {
    if (xp >= BUTCHER_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function butcherPriceFor(itemId, dayDrift, rank, upgrades) {
  const item = MEAT_CUTS.find((x) => x.id === itemId);
  if (!item) return 0;
  let price = item.basePrice;
  price *= 1 + (dayDrift[itemId] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('master-cleaver') && item.difficulty >= 3) price *= 1.3;
  if (upgrades.includes('display-counter')) price *= 1.15;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function butcherSellPriceFor(itemId, premium, dayDrift, rank, upgrades) {
  let price = butcherPriceFor(itemId, dayDrift, rank, upgrades);
  if (premium) price *= 1.5;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function butcherCostFor(itemId, qty, upgrades) {
  const item = MEAT_CUTS.find((x) => x.id === itemId);
  if (!item) return 0;
  let cost = Math.round(item.basePrice * 0.4 * qty);
  if (upgrades.includes('cold-room')) cost = Math.round(cost * 0.8);
  return Math.max(1, cost);
}

export function butcherStockCap(upgrades) {
  let cap = 40;
  if (upgrades.includes('meat-hooks')) cap += 40;
  return cap;
}

export function butcherSpoilChance(item, upgrades) {
  let chance = 0.04 + item.difficulty * 0.015;
  if (upgrades.includes('sharpening-stone')) chance *= 0.5;
  return chance;
}

export function butcherItemById(itemId) {
  return MEAT_CUTS.find((x) => x.id === itemId) || null;
}

export function butcherBestSeller(dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = 0;
  for (const item of MEAT_CUTS) {
    const price = butcherPriceFor(item.id, dayDrift, rank, upgrades);
    if (price > bestPrice) { bestPrice = price; best = item.id; }
  }
  return best ? { id: best, price: bestPrice } : null;
}

export function butcherCheapest(dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = Infinity;
  for (const item of MEAT_CUTS) {
    const price = butcherPriceFor(item.id, dayDrift, rank, upgrades);
    if (price < bestPrice) { bestPrice = price; best = item.id; }
  }
  return best ? { id: best, price: bestPrice } : null;
}

export function createButcherExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;
  let donated = 0;
  let rep = 0;

  function hireHelper(id) {
    const h = BUTCHER_HELPERS.find((x) => x.id === id);
    if (!h) return { ok: false, reason: 'no-such-helper' };
    if (helpers.includes(id)) return { ok: false, reason: 'already-hired' };
    helpers.push(id);
    return { ok: true, id, name: h.name, wage: h.wage };
  }

  function fireHelper(id) {
    const i = helpers.indexOf(id);
    if (i < 0) return { ok: false, reason: 'not-hired' };
    helpers.splice(i, 1);
    return { ok: true, id };
  }

  function payWages() {
    let due = 0;
    for (const id of helpers) {
      const h = BUTCHER_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    let bonus = 0;
    for (const h of BUTCHER_HELPERS) {
      if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
    }
    return bonus;
  }

  function challenges() {
    return BUTCHER_CHALLENGES.map((ch) => {
      const v = system.state[ch.target] !== undefined ? system.state[ch.target] : (ch.target === 'upgradesCount' ? system.state.upgrades.length : 0);
      return { id: ch.id, name: ch.name, have: Math.floor(v), goal: ch.goal, done: v >= ch.goal };
    });
  }

  function claimChallenge(id) {
    const ch = BUTCHER_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const v = system.state[ch.target] !== undefined ? system.state[ch.target] : (ch.target === 'upgradesCount' ? system.state.upgrades.length : 0);
    if (v < ch.goal) return { ok: false, reason: 'not-done', have: Math.floor(v), goal: ch.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return BUTCHER_ACHIEVEMENTS.map((a) => {
      let done = false;
      if (a.check === 'spoiled' && a.goal === 0) done = system.state.batches >= 50 && system.state.spoiled === 0;
      else {
        const v = system.state[a.check] !== undefined ? system.state[a.check] : (a.check === 'upgradesCount' ? system.state.upgrades.length : 0);
        done = v >= a.goal;
      }
      return { id: a.id, name: a.name, desc: a.desc, done };
    });
  }

  function donate(itemId, qty) {
    const have = (system.state.inventory[itemId] || 0) + (system.state.premium[itemId] || 0);
    if (have < qty || qty <= 0) return { ok: false, reason: 'not-enough', have };
    let left = qty;
    const takeInv = Math.min(system.state.inventory[itemId] || 0, left);
    system.state.inventory[itemId] -= takeInv;
    left -= takeInv;
    if (left > 0) system.state.premium[itemId] -= left;
    donated += qty;
    rep += Math.floor(qty / 10);
    return { ok: true, qty, rep, note: 'The neighbourhood thanks you. Butcher Gus the Cleaver remembers.' };
  }

  function clearStale() {
    let cleared = 0;
    for (const item of MEAT_CUTS) {
      const qty = system.state.inventory[item.id] || 0;
      if (qty > 0 && item.difficulty <= 1) {
        system.state.inventory[item.id] = 0;
        cleared += qty;
      }
    }
    return { ok: true, cleared };
  }

  function stockReport() {
    let total = 0;
    let premiumTotal = 0;
    for (const item of MEAT_CUTS) {
      total += system.state.inventory[item.id] || 0;
      premiumTotal += system.state.premium[item.id] || 0;
    }
    const cap = butcherStockCap(system.state.upgrades);
    return { total, premium: premiumTotal, cap, free: cap - total - premiumTotal };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, donate, clearStale, stockReport,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return helperWagesPaid; },
    get donated() { return donated; },
    get rep() { return rep; },
  };
}

export function butcherTipFor(day) {
  return BUTCHER_TIPS[day % BUTCHER_TIPS.length];
}

export function butcherLeaderboardWith(playerTotal) {
  const board = BUTCHER_LEADERBOARD.map((e) => ({
    name: e.name, total: e.name === 'You' ? playerTotal : e.total, desc: e.desc,
  }));
  board.sort((a, b) => b.total - a.total);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export const BUTCHER_META = {
  system: 'butcher', version: '7b-C', author: 'builder-3',
  label: 'Butcher', owner: 'Butcher Gus the Cleaver',
  itemCount: MEAT_CUTS.length,
};

export function createButcherSystem(ctx) {
  const c = ctx || {};
  const rng = typeof c.rng === 'function' ? c.rng : Math.random;
  const getCash = typeof c.getCash === 'function' ? c.getCash : () => 0;
  const addCash = typeof c.addCash === 'function' ? c.addCash : () => {};
  const addHeat = typeof c.addHeat === 'function' ? c.addHeat : () => {};
  const log = typeof c.log === 'function' ? c.log : () => {};
  const getDay = typeof c.getDay === 'function' ? c.getDay : () => 1;
  const getHour = typeof c.getHour === 'function' ? c.getHour : () => 12;
  const getPos = typeof c.getPlayerPos === 'function' ? c.getPlayerPos : () => ({ x: 0, z: 0 });
  const getWeather = typeof c.getWeather === 'function' ? c.getWeather : () => ({ condition: 'clear' });

  const state = {
    xp: 0,
    rank: 0,
    batches: 0,
    produced: 0,
    sold: 0,
    earned: 0,
    spent: 0,
    spoiled: 0,
    aged: 0,
    ordersDone: 0,
    ordersFailed: 0,
    streak: 0,
    bestStreak: 0,
    bestBatch: 0,
    inventory: {},
    premium: {},
    upgrades: [],
    activeOrder: null,
    orderProgress: 0,
    cooldown: 0,
    dayDrift: {},
    lastDay: 1,
    dailySold: 0,
    dailyEarned: 0,
    heatTaken: 0,
    eventsSeen: 0,
    lastEvent: null,
    perfectBatches: 0,
  };
  for (const item of MEAT_CUTS) { state.inventory[item.id] = 0; state.premium[item.id] = 0; state.dayDrift[item.id] = 0; }

  function refreshRank() {
    const r = butcherRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Butcher rank up: ${BUTCHER_RANKS[r].name} — ${BUTCHER_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const item of MEAT_CUTS) {
      const roll = rng();
      if (roll < 0.3) state.dayDrift[item.id] = Math.round((rng() * 0.5 - 0.2) * 100) / 100;
      else if (roll < 0.4) state.dayDrift[item.id] = 0;
    }
  }

  function stockTotal() {
    let total = 0;
    for (const item of MEAT_CUTS) total += (state.inventory[item.id] || 0) + (state.premium[item.id] || 0);
    return total;
  }

  function cut(itemId, qty) {
    qty = qty === undefined ? 1 : qty;
    const item = MEAT_CUTS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    if (state.cooldown > 0) return { ok: false, reason: 'cooling-down', cooldown: Math.round(state.cooldown) };
    const cost = butcherCostFor(itemId, qty, state.upgrades);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    if (stockTotal() + qty > butcherStockCap(state.upgrades)) return { ok: false, reason: 'stock-full', cap: butcherStockCap(state.upgrades) };
    addCash(-cost);
    state.spent += cost;
    let made = qty;
    if (rng() < butcherSpoilChance(item, state.upgrades)) {
      const lost = Math.max(1, Math.floor(qty / 2));
      made = qty - lost;
      state.spoiled += lost;
      state.streak = 0;
      log(`A cut of ${item.name} went wrong — ${lost} spoiled.`);
    } else {
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      if (item.difficulty >= 4) state.perfectBatches += 1;
    }
    state.inventory[itemId] += made;
    state.batches += 1;
    state.produced += made;
    state.bestBatch = Math.max(state.bestBatch, made);
    let speed = item.time;
    if (state.upgrades.includes('cleaver-set')) speed = Math.max(1, Math.round(speed * 0.8));
    state.cooldown = speed;
    gainXp(4 + made + item.difficulty * 2);
    if (true && item.difficulty >= 4 && rng() < 0.15) {
      addHeat(1);
      state.heatTaken += 1;
      log('Someone official is sniffing around the strong stuff. Careful.');
    }
    if (state.activeOrder) checkOrder(itemId, made);
    log(`Cut ${made}x ${item.name} for $${cost}.`);
    return { ok: true, item: itemId, qty: made, cost, cooldown: state.cooldown };
  }

  function smokeMeat(itemId, qty) {
    qty = qty === undefined ? 1 : qty;
    const item = MEAT_CUTS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = state.inventory[itemId] || 0;
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    state.inventory[itemId] -= qty;
    state.premium[itemId] += qty;
    state.aged += qty;
    gainXp(6 + qty * 2);
    log(`Smoke Meat: ${qty}x ${item.name} set aside as premium stock.`);
    return { ok: true, item: itemId, qty, premium: state.premium[itemId] };
  }

  function sell(itemId, qty) {
    const item = MEAT_CUTS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = (state.inventory[itemId] || 0) + (state.premium[itemId] || 0);
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    let left = qty;
    let total = 0;
    const takePrem = Math.min(state.premium[itemId] || 0, left);
    if (takePrem > 0) {
      const unit = butcherSellPriceFor(itemId, true, state.dayDrift, state.rank, state.upgrades);
      total += unit * takePrem;
      state.premium[itemId] -= takePrem;
      left -= takePrem;
    }
    if (left > 0) {
      const unit = butcherSellPriceFor(itemId, false, state.dayDrift, state.rank, state.upgrades);
      total += unit * left;
      state.inventory[itemId] -= left;
    }
    total = Math.round(total * 10) / 10;
    state.sold += qty;
    state.earned += total;
    state.dailySold += qty;
    state.dailyEarned += total;
    addCash(total);
    gainXp(qty);
    log(`Sold ${qty}x ${item.name} for $${total}.`);
    return { ok: true, total, qty };
  }

  function sellAll() {
    let total = 0;
    let units = 0;
    const lines = [];
    for (const item of MEAT_CUTS) {
      const have = (state.inventory[item.id] || 0) + (state.premium[item.id] || 0);
      if (have <= 0) continue;
      const res = sell(item.id, have);
      if (res.ok) {
        total += res.total;
        units += have;
        lines.push({ id: item.id, qty: have, total: res.total });
      }
    }
    if (units === 0) return { ok: false, reason: 'nothing-in-stock' };
    total = Math.round(total * 10) / 10;
    log(`Sold everything (${units} units) for $${total}.`);
    return { ok: true, total, units, lines };
  }

  function buyUpgrade(id) {
    const u = BUTCHER_UPGRADES.find((x) => x.id === id);
    if (!u) return { ok: false, reason: 'no-such-upgrade' };
    if (state.upgrades.includes(id)) return { ok: false, reason: 'already-owned' };
    if (getCash() < u.cost) return { ok: false, reason: 'not-enough-cash', cost: u.cost };
    addCash(-u.cost);
    state.spent += u.cost;
    state.upgrades.push(id);
    gainXp(20);
    log(`Bought ${u.name} for $${u.cost}.`);
    return { ok: true, id };
  }

  function takeOrder(id) {
    const ord = BUTCHER_ORDERS.find((x) => x.id === id);
    if (!ord) return { ok: false, reason: 'no-such-order' };
    if (state.activeOrder) return { ok: false, reason: 'order-active' };
    if (state.rank < ord.minRank) return { ok: false, reason: 'rank-too-low', need: ord.minRank };
    state.activeOrder = { ...ord, dayTaken: getDay(), deadlineDay: getDay() + ord.days };
    state.orderProgress = 0;
    log(`Order taken: ${ord.name} — deliver ${ord.qty}x ${ord.item} by day ${state.activeOrder.deadlineDay}.`);
    return { ok: true, order: state.activeOrder };
  }

  function checkOrder(itemId, qty) {
    const ord = state.activeOrder;
    if (!ord) return;
    if (ord.item !== 'mixed' && ord.item !== itemId) return;
    state.orderProgress += qty;
  }

  function deliverOrder() {
    const ord = state.activeOrder;
    if (!ord) return { ok: false, reason: 'no-order' };
    if (ord.item === 'mixed') {
      const total = stockTotal();
      if (total < ord.qty) return { ok: false, reason: 'not-enough', have: total, need: ord.qty };
      let left = ord.qty;
      for (const item of MEAT_CUTS) {
        if (left <= 0) break;
        const takeInv = Math.min(state.inventory[item.id] || 0, left);
        state.inventory[item.id] -= takeInv;
        left -= takeInv;
        if (left > 0) {
          const takePrem = Math.min(state.premium[item.id] || 0, left);
          state.premium[item.id] -= takePrem;
          left -= takePrem;
        }
      }
    } else {
      const have = (state.inventory[ord.item] || 0) + (state.premium[ord.item] || 0);
      if (have < ord.qty) return { ok: false, reason: 'not-enough', have, need: ord.qty };
      let left = ord.qty;
      const takeInv = Math.min(state.inventory[ord.item] || 0, left);
      state.inventory[ord.item] -= takeInv;
      left -= takeInv;
      if (left > 0) state.premium[ord.item] -= left;
      state.orderProgress = ord.qty;
    }
    const pay = ord.pay + state.rank * 40;
    state.activeOrder = null;
    state.orderProgress = 0;
    state.ordersDone += 1;
    state.earned += pay;
    addCash(pay);
    gainXp(60);
    log(`Order delivered: ${ord.name} paid $${pay}.`);
    return { ok: true, pay };
  }

  function abandonOrder() {
    if (!state.activeOrder) return { ok: false, reason: 'no-order' };
    state.activeOrder = null;
    state.orderProgress = 0;
    state.ordersFailed += 1;
    log('Order abandoned — the client will remember that.');
    return { ok: true };
  }

  function haggle() {
    if (state.rank < 1) return { ok: false, reason: 'rank-too-low' };
    const roll = rng();
    const bonus = 0.05 + state.rank * 0.03;
    if (roll < 0.55) {
      log(`Butcher Gus the Cleaver nods: +${Math.round(bonus * 100)}% on your next sale.`);
      return { ok: true, haggled: true, bonus: Math.round(bonus * 100) / 100 };
    }
    log('Butcher Gus the Cleaver shrugs you off — no better price today.');
    return { ok: true, haggled: false, bonus: 0 };
  }

  function priceBoard() {
    return MEAT_CUTS.map((item) => ({
      id: item.id,
      name: item.name,
      price: butcherPriceFor(item.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[item.id],
      stock: (state.inventory[item.id] || 0) + (state.premium[item.id] || 0),
      premium: state.premium[item.id] || 0,
    }));
  }

  function orderList() {
    return BUTCHER_ORDERS.map((o) => ({
      id: o.id, name: o.name, item: o.item, qty: o.qty, pay: o.pay, days: o.days, minRank: o.minRank,
    }));
  }

  function dailyEvent() {
    const roll = rng();
    state.eventsSeen += 1;
    const weather = getWeather();
    const condition = (weather && weather.condition) || 'clear';
    if (condition === 'rain' && roll < 0.3) {
      state.lastEvent = 'rainy-day';
      log('Rain hammers the street — everyone comes inside for something warm.');
      return { event: 'rainy-day' };
    }
    if (roll < 0.18) {
      const ev = BUTCHER_EVENTS[Math.floor(rng() * BUTCHER_EVENTS.length)];
      state.lastEvent = ev.id;
      if (ev.effect === 'cost-up') {
        for (const item of MEAT_CUTS) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] + 0.15) * 100) / 100;
      } else if (ev.effect === 'cost-down') {
        for (const item of MEAT_CUTS) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] - 0.1) * 100) / 100;
      } else if (ev.effect === 'sell-up') {
        for (const item of MEAT_CUTS) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] + 0.2) * 100) / 100;
      } else if (ev.effect === 'xp') {
        gainXp(25);
      } else if (ev.effect === 'spoil') {
        const item = MEAT_CUTS[Math.floor(rng() * MEAT_CUTS.length)];
        const have = state.inventory[item.id] || 0;
        if (have > 0) {
          const lost = Math.min(have, 2);
          state.inventory[item.id] -= lost;
          state.spoiled += lost;
          log(`Lost ${lost}x ${item.name} to a bad day.`);
        }
      } else if (ev.effect === 'orders-up') {
        gainXp(10);
      } else if (ev.effect === 'heat') {
        addHeat(1);
        state.heatTaken += 1;
      }
      log(`Butcher news: ${ev.name} — ${ev.text}`);
      return { event: ev.id, name: ev.name };
    }
    state.lastEvent = 'none';
    return { event: 'none' };
  }

  function tasteTest(itemId) {
    const item = MEAT_CUTS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    const have = (state.inventory[itemId] || 0) + (state.premium[itemId] || 0);
    if (have <= 0) return { ok: false, reason: 'not-enough', have };
    const roll = rng();
    const quality = Math.round((0.5 + roll * 0.5 + state.rank * 0.05 + item.difficulty * 0.05) * 100) / 100;
    gainXp(5);
    const verdict = quality >= 0.9 ? 'Outstanding — Butcher Gus the Cleaver would serve this to royalty.' : quality >= 0.7 ? 'Solid work. A good cut.' : 'Needs work. Butcher Gus the Cleaver raises an eyebrow.';
    return { ok: true, item: itemId, quality, verdict };
  }

  function tick(dt) {
    if (state.cooldown > 0) {
      state.cooldown -= dt;
      if (state.cooldown < 0) state.cooldown = 0;
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    driftPrices();
    state.dailySold = 0;
    state.dailyEarned = 0;
    if (state.activeOrder && day >= state.activeOrder.deadlineDay && state.orderProgress < state.activeOrder.qty) {
      log(`Order ${state.activeOrder.name} expired — the client walked away.`);
      state.activeOrder = null;
      state.orderProgress = 0;
      state.ordersFailed += 1;
    }
    dailyEvent();
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, batches: state.batches,
      produced: state.produced, sold: state.sold,
      earned: state.earned, spent: state.spent,
      spoiled: state.spoiled, aged: state.aged,
      ordersDone: state.ordersDone, ordersFailed: state.ordersFailed,
      streak: state.streak, bestStreak: state.bestStreak,
      bestBatch: state.bestBatch,
      inventory: state.inventory, premium: state.premium,
      upgrades: state.upgrades, activeOrder: state.activeOrder,
      orderProgress: state.orderProgress, cooldown: state.cooldown,
      dayDrift: state.dayDrift, lastDay: state.lastDay,
      dailySold: state.dailySold, dailyEarned: state.dailyEarned,
      heatTaken: state.heatTaken, eventsSeen: state.eventsSeen,
      lastEvent: state.lastEvent, perfectBatches: state.perfectBatches,
    }));
  }

  function deserialize(d) {
    if (!d || typeof d !== 'object') return;
    for (const k of Object.keys(state)) {
      if (d[k] !== undefined) state[k] = d[k];
    }
    for (const item of MEAT_CUTS) {
      if (state.inventory[item.id] === undefined) state.inventory[item.id] = 0;
      if (state.premium[item.id] === undefined) state.premium[item.id] = 0;
      if (state.dayDrift[item.id] === undefined) state.dayDrift[item.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: BUTCHER_RANKS[state.rank].name,
      xp: state.xp,
      batches: state.batches,
      produced: state.produced,
      sold: state.sold,
      earned: Math.round(state.earned),
      spent: state.spent,
      spoiled: state.spoiled,
      aged: state.aged,
      ordersDone: state.ordersDone,
      ordersFailed: state.ordersFailed,
      streak: state.streak,
      bestStreak: state.bestStreak,
      bestBatch: state.bestBatch,
      stock: stockTotal(),
      stockCap: butcherStockCap(state.upgrades),
      upgrades: state.upgrades.length,
      activeOrder: state.activeOrder ? state.activeOrder.id : null,
      orderProgress: state.orderProgress,
      cooldown: Math.round(state.cooldown * 10) / 10,
      dailyEarned: Math.round(state.dailyEarned),
      heatTaken: state.heatTaken,
      eventsSeen: state.eventsSeen,
      lastEvent: state.lastEvent,
      perfectBatches: state.perfectBatches,
      efficiency: state.produced + state.spoiled === 0 ? 100 : Math.round((state.produced / (state.produced + state.spoiled)) * 100),
    };
  }

  function hudLine() {
    if (state.cooldown > 0) return `Butcher: working — ${Math.round(state.cooldown)}s left`;
    if (state.activeOrder) return `Butcher: ${state.activeOrder.name} ${state.orderProgress}/${state.activeOrder.qty}`;
    const total = stockTotal();
    if (total > 0) return `Butcher: ${total} in stock`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearShop = Math.hypot(pos.x - (140), pos.z - (60)) < 25;
    if (!nearShop) return false;
    const total = stockTotal();
    if (total > 0) {
      const first = MEAT_CUTS.find((item) => (state.inventory[item.id] || 0) + (state.premium[item.id] || 0) > 0);
      if (first) { sell(first.id, 1); return true; }
    }
    const cheapest = butcherCheapest(state.dayDrift, state.rank, state.upgrades);
    if (cheapest) {
      const res = cut(cheapest.id, 1);
      return res.ok;
    }
    return false;
  }

  return {
    name: 'butcher',
    state, cut, smokeMeat, sell, sellAll, buyUpgrade,
    takeOrder, deliverOrder, abandonOrder, haggle, priceBoard,
    orderList, dailyEvent, tasteTest, tick, tickDay, serialize,
    deserialize, stats, hudLine, interact,
  };
}
