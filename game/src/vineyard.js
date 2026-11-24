// Vineyard — Elena the Grower turns hillside grapes into gold.
// Harvest ten varietals on the terraced slopes, age the wine in oak,
// and sell bottles to the cellars of Solara. A vintage is a gamble:
// the rain decides, the oak forgives, and time is the real winemaker.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const WINE_VARIETALS = [
  {
      id: 'cabernet-sauvignon',
      name: 'Cabernet Sauvignon',
      basePrice: 52,
      time: 5,
      difficulty: 4,
      grape: 'cabernet',
      region: 'north slope',
      vintage: 2021,
      desc: 'Bold, structured and dark — blackcurrant, cedar and time.'
    },
  {
      id: 'merlot',
      name: 'Merlot',
      basePrice: 44,
      time: 4,
      difficulty: 3,
      grape: 'merlot',
      region: 'south slope',
      vintage: 2022,
      desc: 'Soft, plummy and generous — the easy red that never argues.'
    },
  {
      id: 'pinot-noir',
      name: 'Pinot Noir',
      basePrice: 58,
      time: 5,
      difficulty: 5,
      grape: 'pinot noir',
      region: 'east terrace',
      vintage: 2021,
      desc: 'Delicate and difficult — cherry, earth and a whisper of smoke.'
    },
  {
      id: 'chardonnay',
      name: 'Chardonnay',
      basePrice: 46,
      time: 4,
      difficulty: 3,
      grape: 'chardonnay',
      region: 'west terrace',
      vintage: 2022,
      desc: 'Golden and buttery, oak-kissed, with a spine of citrus.'
    },
  {
      id: 'sauvignon-blanc',
      name: 'Sauvignon Blanc',
      basePrice: 38,
      time: 3,
      difficulty: 2,
      grape: 'sauvignon blanc',
      region: 'river flat',
      vintage: 2023,
      desc: 'Crisp, green and bright — gooseberry and fresh-cut grass.'
    },
  {
      id: 'syrah',
      name: 'Syrah',
      basePrice: 50,
      time: 5,
      difficulty: 4,
      grape: 'syrah',
      region: 'north slope',
      vintage: 2021,
      desc: 'Dark, peppery and wild — blackberry over cracked pepper.'
    },
  {
      id: 'riesling',
      name: 'Riesling',
      basePrice: 40,
      time: 3,
      difficulty: 2,
      grape: 'riesling',
      region: 'east terrace',
      vintage: 2023,
      desc: 'Floral and precise, lime and honey, sweet or dry as you like.'
    },
  {
      id: 'rose',
      name: 'Rosé',
      basePrice: 32,
      time: 3,
      difficulty: 1,
      grape: 'grenache',
      region: 'south slope',
      vintage: 2023,
      desc: 'Pale pink and dry — strawberry, rose petals and long lunches.'
    },
  {
      id: 'prosecco',
      name: 'Prosecco',
      basePrice: 36,
      time: 3,
      difficulty: 2,
      grape: 'glera',
      region: 'river flat',
      vintage: 2023,
      desc: 'Light, bubbly and cheerful — green apple and celebration.'
    },
  {
      id: 'zinfandel',
      name: 'Zinfandel',
      basePrice: 48,
      time: 4,
      difficulty: 3,
      grape: 'zinfandel',
      region: 'west terrace',
      vintage: 2022,
      desc: 'Jammy, bold and warm — blackberry jam and baking spice.'
    },
];

export const VINEYARD_UPGRADES = [
  { id: 'oak-barrels', name: 'Oak Barrels', cost: 150, desc: 'Harvest 20% faster.', effect: 'brew-fast' },
  { id: 'pruning-shears', name: 'Pruning Shears', cost: 180, desc: 'Ingredient costs -20%.', effect: 'cost-down' },
  { id: 'irrigation', name: 'Irrigation', cost: 240, desc: 'Fewer spoiled crates.', effect: 'spoil-down' },
  { id: 'tasting-room', name: 'Tasting Room', cost: 320, desc: 'Sales pay +15%.', effect: 'sell-plus' },
  { id: 'wine-cellar', name: 'Wine Cellar', cost: 280, desc: 'Hold +40 crates.', effect: 'stock-plus' },
  { id: 'cork-press', name: 'Cork Press', cost: 360, desc: 'Aging pays +25%.', effect: 'age-plus' },
  { id: 'delivery-cart', name: 'Delivery Cart', cost: 500, desc: 'Sell in bulk to cellars.', effect: 'bulk' },
  { id: 'master-press', name: 'Master Press', cost: 820, desc: 'Perfect pressings: +30% on fine wines.', effect: 'strong-plus' },
];

export const VINEYARD_ORDERS = [
  { id: 'cellar-12', name: 'Cellar Order', item: 'cabernet-sauvignon', qty: 12, pay: 620, days: 2, minRank: 0, desc: 'A wine cellar needs 12 Cabernets for winter.' },
  { id: 'wedding-rose', name: 'Wedding Rosé', item: 'rose', qty: 10, pay: 420, days: 1, minRank: 2, desc: 'A wedding orders 10 cases of rosé.' },
  { id: 'restaurant-pinot', name: 'Restaurant Pinot', item: 'pinot-noir', qty: 8, pay: 560, days: 2, minRank: 4, desc: 'A fine restaurant orders 8 Pinots.' },
  { id: 'party-prosecco', name: 'Party Prosecco', item: 'prosecco', qty: 15, pay: 420, days: 1, minRank: 2, desc: 'A New Year party orders 15 Proseccos.' },
  { id: 'chardonnay-lunch', name: 'Chardonnay Lunch', item: 'chardonnay', qty: 12, pay: 480, days: 1, minRank: 0, desc: 'A bistro needs 12 Chardonnays for lunch.' },
  { id: 'syrah-night', name: 'Syrah Night', item: 'syrah', qty: 8, pay: 480, days: 2, minRank: 3, desc: 'A steakhouse orders 8 Syrahs.' },
  { id: 'riesling-run', name: 'Riesling Run', item: 'riesling', qty: 14, pay: 420, days: 1, minRank: 2, desc: 'A wine bar orders 14 Rieslings.' },
  { id: 'mixed-crates', name: 'Mixed Crates', item: 'mixed', qty: 20, pay: 620, days: 2, minRank: 3, desc: 'Any 20 crates for the harbour festival.' },
];

export const VINEYARD_EVENTS = [
  { id: 'grape-shortage', name: 'Grape Shortage', text: 'Grapes are scarce — harvesting costs more today.', effect: 'cost-up' },
  { id: 'harvest-festival', name: 'Harvest Festival', text: 'The whole valley celebrates — sales pay +20%.', effect: 'sell-up' },
  { id: 'vine-inspection', name: 'Vine Inspection', text: 'An inspector walks the rows. Keep the vines clean.', effect: 'heat' },
  { id: 'good-rain', name: 'Good Rain', text: 'Perfect rain — grapes are cheap and plentiful today.', effect: 'cost-down' },
  { id: 'bad-vintage', name: 'Bad Vintage', text: 'A hailstorm bruises the grapes — one crate may spoil.', effect: 'spoil' },
  { id: 'wine-fair', name: 'Wine Fair', text: 'A fair opens — cellars order extra.', effect: 'orders-up' },
  { id: 'frost-night', name: 'Frost Night', text: 'A late frost — the vines need watching.', effect: 'spoil' },
  { id: 'warm-spell', name: 'Warm Spell', text: 'Warm days — rosé and prosecco fly off the shelves.', effect: 'sell-up' },
  { id: 'cellar-flood', name: 'Cellar Flood', text: 'A pipe bursts in the cellar. Some stock is at risk.', effect: 'spoil' },
  { id: 'wine-critic', name: 'Wine Critic', text: 'A wine critic visits and shares a trick.', effect: 'xp' },
];

export const VINEYARD_RANKS = [
  { level: 0, name: 'Vine Hand', xp: 0, perk: 'Harvest at base rate.' },
  { level: 1, name: 'Picker', xp: 120, perk: '+10% sale prices.' },
  { level: 2, name: 'Cellar Master', xp: 300, perk: 'Spoiled crates forgiven once a day.' },
  { level: 3, name: 'Vintner', xp: 620, perk: '+20% sale prices, cellars trust you.' },
  { level: 4, name: 'Legend of the Vine', xp: 1100, perk: '+30% sale prices, aged bottles doubled.' },
];

export const VINEYARD_HELPERS = [
  { id: 'picker', name: 'Theo the Picker', wage: 25, skill: 'haul', bonus: 0.15, desc: 'Picks grapes: +15% harvest yield.' },
  { id: 'cellar-keeper', name: 'Ana the Cellar Keeper', wage: 40, skill: 'age', bonus: 0.25, desc: 'Watches the barrels: +25% aging speed.' },
  { id: 'cart-runner', name: 'Rosa the Runner', wage: 60, skill: 'sell', bonus: 0.12, desc: 'Knows every cellar: +12% sale prices.' },
  { id: 'vine-master', name: 'Old Marco', wage: 80, skill: 'brew', bonus: 0.2, desc: 'Vine master: +20% harvest quality.' },
];

export const VINEYARD_CHALLENGES = [
  { id: 'crates-100', name: 'First Hundred Crates', target: 'produced', goal: 100, xp: 80, desc: 'Harvest 100 crates in total.' },
  { id: 'sell-500', name: 'Half Grand', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from wine sales.' },
  { id: 'age-20', name: 'Patient Vintner', target: 'aged', goal: 20, xp: 100, desc: 'Age 20 crates.' },
  { id: 'orders-10', name: 'Cellar Favourite', target: 'ordersDone', goal: 10, xp: 140, desc: 'Complete 10 cellar orders.' },
  { id: 'streak-10', name: 'Clean Vine', target: 'bestStreak', goal: 10, xp: 110, desc: 'Harvest 10 crates in a row without a spoiled one.' },
  { id: 'rank-3', name: 'Vintner', target: 'rank', goal: 3, xp: 150, desc: 'Reach rank Vintner.' },
  { id: 'earn-2000', name: 'Wine Baron', target: 'earned', goal: 2000, xp: 160, desc: 'Earn $2,000 from the vineyard.' },
  { id: 'batches-50', name: 'Busy Vines', target: 'batches', goal: 50, xp: 90, desc: 'Harvest 50 batches.' },
];

export const VINEYARD_ACHIEVEMENTS = [
  { id: 'first-harvest', name: 'First Harvest', check: 'batches', goal: 1, desc: 'Harvest your first crate.' },
  { id: 'first-sale', name: 'First Sale', check: 'sold', goal: 1, desc: 'Sell your first bottle.' },
  { id: 'first-age', name: 'Patient One', check: 'aged', goal: 1, desc: 'Age your first crate.' },
  { id: 'rank-2', name: 'Cellar Master', check: 'rank', goal: 2, desc: 'Reach rank Cellar Master.' },
  { id: 'rich-wine', name: 'Wine Rich', check: 'earned', goal: 2000, desc: 'Earn $2,000 from wine.' },
  { id: 'full-kit', name: 'Full Kit', check: 'upgradesCount', goal: 8, desc: 'Own every vineyard upgrade.' },
  { id: 'no-spoil', name: 'Clean Hands', check: 'spoiled', goal: 0, desc: 'Harvest 50 crates with zero spoiled — checked at 50.' },
  { id: 'big-crate', name: 'Big Crate', check: 'bestBatch', goal: 20, desc: 'Harvest 20 bottles in one crate.' },
];

export const VINEYARD_TIPS = [
  { id: 'age-it', name: 'Age It', text: 'Aged bottles pay far more than young ones. Time is profit.' },
  { id: 'pinot-money', name: 'Pinot Money', text: 'Pinot costs the most and pays the most. Save it for fine dining.' },
  { id: 'vine-care', name: 'Vine Care', text: 'Pruning is half the wine. Never neglect the vines.' },
  { id: 'fair-stock', name: 'Fair Stock', text: 'Stock up before wine fairs — prices jump 20%.' },
  { id: 'irrigation-watch', name: 'Irrigation Watch', text: 'Irrigation saves more crates than luck ever will.' },
  { id: 'order-first', name: 'Orders First', text: 'Take a cellar order, then harvest for it.' },
  { id: 'rose-summer', name: 'Rosé Summer', text: 'Rosé sells best in summer. Harvest ahead of the heat.' },
  { id: 'cellar-space', name: 'Cellar Space', text: 'Buy a wine cellar early — a full rack is a stuck vineyard.' },
];

export const VINEYARD_RECORDS = [
  { id: 'biggest-crate', name: 'Biggest Crate', stat: 'bestBatch', unit: 'bottles', desc: 'Most bottles in one crate.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from wine.' },
  { id: 'most-harvested', name: 'Most Harvested', stat: 'produced', unit: 'crates', desc: 'Most crates harvested.' },
  { id: 'most-aged', name: 'Most Aged', stat: 'aged', unit: 'crates', desc: 'Most crates aged.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'crates', desc: 'Longest clean harvest streak.' },
];

export const VINEYARD_MARKET_EVENTS = [
  { id: 'pinot-boom', name: 'Pinot Boom', items: ["pinot-noir"], mult: 1.4, desc: 'Collectors pay 40% more for Pinot.' },
  { id: 'rose-glut', name: 'Rosé Glut', items: ["rose", "prosecco"], mult: 0.6, desc: 'Too much rosé — prices crash.' },
  { id: 'cabernet-rush', name: 'Cabernet Rush', items: ["cabernet-sauvignon"], mult: 1.5, desc: 'A Cabernet craze sweeps the city.' },
  { id: 'chardonnay-season', name: 'Chardonnay Season', items: ["chardonnay"], mult: 1.3, desc: 'Autumn makes Chardonnay king.' },
  { id: 'syrah-morning', name: 'Syrah Morning', items: ["syrah"], mult: 1.35, desc: 'Syrah is the steakhouse favourite.' },
  { id: 'riesling-night', name: 'Riesling Night', items: ["riesling"], mult: 1.3, desc: 'Wine bars drive Riesling up.' },
  { id: 'merlot-trend', name: 'Merlot Trend', items: ["merlot"], mult: 1.25, desc: 'Merlot is suddenly fashionable.' },
  { id: 'zinfandel-summer', name: 'Zinfandel Summer', items: ["zinfandel"], mult: 1.3, desc: 'Summer grills love Zinfandel.' },
  { id: 'sauvignon-week', name: 'Sauvignon Week', items: ["sauvignon-blanc"], mult: 1.2, desc: 'Sauvignon Blanc gets its week.' },
  { id: 'wine-tax', name: 'Wine Tax', items: ["pinot-noir", "cabernet-sauvignon"], mult: 0.7, desc: 'A luxury tax hits the fine wines.' },
  { id: 'dry-week', name: 'Dry Week', items: ["rose", "prosecco"], mult: 0.75, desc: 'A temperance campaign dries sales.' },
  { id: 'harvest-festival', name: 'Harvest Festival', items: ["cabernet-sauvignon", "merlot", "chardonnay"], mult: 1.2, desc: 'The festival lifts everything.' },
];

export const VINEYARD_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Bud break, fresh vines.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Festival season, steady thirst.' },
  { id: 'autumn', name: 'Autumn', mult: 1.1, desc: 'Harvest time and dark reds.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold and quiet, but cellars buy.' },
];

export const VINEYARD_LEADERBOARD = [
  { name: 'Elena', total: 4200, desc: 'The vintner. Untouchable.' },
  { name: 'Marco', total: 2900, desc: 'Vine master for forty years.' },
  { name: 'You', total: 0, desc: 'Climbing.' },
  { name: 'Theo', total: 1500, desc: 'Fast hands, faster vines.' },
  { name: 'Ana', total: 2400, desc: 'Cellar keeper.' },
];

export const VINEYARD_QUICK_START = [
  'Harvest rosé first — cheap, fast, always sells.',
  'Age everything you can afford to wait for.',
  'Buy irrigation before the master press.',
  'Take cellar orders, then harvest for them.',
  'Sell the young wine by noon — freshness pays.',
  'Check the price board every morning.',
];

export function vineyardRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < VINEYARD_RANKS.length; i++) {
    if (xp >= VINEYARD_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function vineyardPriceFor(itemId, dayDrift, rank, upgrades) {
  const item = WINE_VARIETALS.find((x) => x.id === itemId);
  if (!item) return 0;
  let price = item.basePrice;
  price *= 1 + (dayDrift[itemId] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('master-press') && item.difficulty >= 3) price *= 1.3;
  if (upgrades.includes('tasting-room')) price *= 1.15;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function vineyardSellPriceFor(itemId, premium, dayDrift, rank, upgrades) {
  let price = vineyardPriceFor(itemId, dayDrift, rank, upgrades);
  if (premium) price *= 1.5;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function vineyardCostFor(itemId, qty, upgrades) {
  const item = WINE_VARIETALS.find((x) => x.id === itemId);
  if (!item) return 0;
  let cost = Math.round(item.basePrice * 0.4 * qty);
  if (upgrades.includes('pruning-shears')) cost = Math.round(cost * 0.8);
  return Math.max(1, cost);
}

export function vineyardStockCap(upgrades) {
  let cap = 40;
  if (upgrades.includes('wine-cellar')) cap += 40;
  return cap;
}

export function vineyardSpoilChance(item, upgrades) {
  let chance = 0.04 + item.difficulty * 0.015;
  if (upgrades.includes('irrigation')) chance *= 0.5;
  return chance;
}

export function vineyardItemById(itemId) {
  return WINE_VARIETALS.find((x) => x.id === itemId) || null;
}

export function vineyardBestSeller(dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = 0;
  for (const item of WINE_VARIETALS) {
    const price = vineyardPriceFor(item.id, dayDrift, rank, upgrades);
    if (price > bestPrice) { bestPrice = price; best = item.id; }
  }
  return best ? { id: best, price: bestPrice } : null;
}

export function vineyardCheapest(dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = Infinity;
  for (const item of WINE_VARIETALS) {
    const price = vineyardPriceFor(item.id, dayDrift, rank, upgrades);
    if (price < bestPrice) { bestPrice = price; best = item.id; }
  }
  return best ? { id: best, price: bestPrice } : null;
}

export function createVineyardExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;
  let donated = 0;
  let rep = 0;

  function hireHelper(id) {
    const h = VINEYARD_HELPERS.find((x) => x.id === id);
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
      const h = VINEYARD_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    let bonus = 0;
    for (const h of VINEYARD_HELPERS) {
      if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
    }
    return bonus;
  }

  function challenges() {
    return VINEYARD_CHALLENGES.map((ch) => {
      const v = system.state[ch.target] !== undefined ? system.state[ch.target] : (ch.target === 'upgradesCount' ? system.state.upgrades.length : 0);
      return { id: ch.id, name: ch.name, have: Math.floor(v), goal: ch.goal, done: v >= ch.goal };
    });
  }

  function claimChallenge(id) {
    const ch = VINEYARD_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const v = system.state[ch.target] !== undefined ? system.state[ch.target] : (ch.target === 'upgradesCount' ? system.state.upgrades.length : 0);
    if (v < ch.goal) return { ok: false, reason: 'not-done', have: Math.floor(v), goal: ch.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return VINEYARD_ACHIEVEMENTS.map((a) => {
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
    return { ok: true, qty, rep, note: 'The neighbourhood thanks you. Vintner Elena the Grower remembers.' };
  }

  function clearStale() {
    let cleared = 0;
    for (const item of WINE_VARIETALS) {
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
    for (const item of WINE_VARIETALS) {
      total += system.state.inventory[item.id] || 0;
      premiumTotal += system.state.premium[item.id] || 0;
    }
    const cap = vineyardStockCap(system.state.upgrades);
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

export function vineyardTipFor(day) {
  return VINEYARD_TIPS[day % VINEYARD_TIPS.length];
}

export function vineyardLeaderboardWith(playerTotal) {
  const board = VINEYARD_LEADERBOARD.map((e) => ({
    name: e.name, total: e.name === 'You' ? playerTotal : e.total, desc: e.desc,
  }));
  board.sort((a, b) => b.total - a.total);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export const VINEYARD_META = {
  system: 'vineyard', version: '7b-C', author: 'builder-3',
  label: 'Vineyard', owner: 'Vintner Elena the Grower',
  itemCount: WINE_VARIETALS.length,
};

export function createVineyardSystem(ctx) {
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
  for (const item of WINE_VARIETALS) { state.inventory[item.id] = 0; state.premium[item.id] = 0; state.dayDrift[item.id] = 0; }

  function refreshRank() {
    const r = vineyardRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Vineyard rank up: ${VINEYARD_RANKS[r].name} — ${VINEYARD_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const item of WINE_VARIETALS) {
      const roll = rng();
      if (roll < 0.3) state.dayDrift[item.id] = Math.round((rng() * 0.5 - 0.2) * 100) / 100;
      else if (roll < 0.4) state.dayDrift[item.id] = 0;
    }
  }

  function stockTotal() {
    let total = 0;
    for (const item of WINE_VARIETALS) total += (state.inventory[item.id] || 0) + (state.premium[item.id] || 0);
    return total;
  }

  function harvest(itemId, qty) {
    qty = qty === undefined ? 1 : qty;
    const item = WINE_VARIETALS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    if (state.cooldown > 0) return { ok: false, reason: 'cooling-down', cooldown: Math.round(state.cooldown) };
    const cost = vineyardCostFor(itemId, qty, state.upgrades);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    if (stockTotal() + qty > vineyardStockCap(state.upgrades)) return { ok: false, reason: 'stock-full', cap: vineyardStockCap(state.upgrades) };
    addCash(-cost);
    state.spent += cost;
    let made = qty;
    if (rng() < vineyardSpoilChance(item, state.upgrades)) {
      const lost = Math.max(1, Math.floor(qty / 2));
      made = qty - lost;
      state.spoiled += lost;
      state.streak = 0;
      log(`A crate of ${item.name} went wrong — ${lost} spoiled.`);
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
    if (state.upgrades.includes('oak-barrels')) speed = Math.max(1, Math.round(speed * 0.8));
    state.cooldown = speed;
    gainXp(4 + made + item.difficulty * 2);
    if (false && item.difficulty >= 4 && rng() < 0.15) {
      addHeat(1);
      state.heatTaken += 1;
      log('Someone official is sniffing around the strong stuff. Careful.');
    }
    if (state.activeOrder) checkOrder(itemId, made);
    log(`Harvest ${made}x ${item.name} for $${cost}.`);
    return { ok: true, item: itemId, qty: made, cost, cooldown: state.cooldown };
  }

  function ageWine(itemId, qty) {
    qty = qty === undefined ? 1 : qty;
    const item = WINE_VARIETALS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = state.inventory[itemId] || 0;
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    state.inventory[itemId] -= qty;
    state.premium[itemId] += qty;
    state.aged += qty;
    gainXp(6 + qty * 2);
    log(`Age Wine: ${qty}x ${item.name} set aside as premium stock.`);
    return { ok: true, item: itemId, qty, premium: state.premium[itemId] };
  }

  function sell(itemId, qty) {
    const item = WINE_VARIETALS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = (state.inventory[itemId] || 0) + (state.premium[itemId] || 0);
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    let left = qty;
    let total = 0;
    const takePrem = Math.min(state.premium[itemId] || 0, left);
    if (takePrem > 0) {
      const unit = vineyardSellPriceFor(itemId, true, state.dayDrift, state.rank, state.upgrades);
      total += unit * takePrem;
      state.premium[itemId] -= takePrem;
      left -= takePrem;
    }
    if (left > 0) {
      const unit = vineyardSellPriceFor(itemId, false, state.dayDrift, state.rank, state.upgrades);
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
    for (const item of WINE_VARIETALS) {
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
    const u = VINEYARD_UPGRADES.find((x) => x.id === id);
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
    const ord = VINEYARD_ORDERS.find((x) => x.id === id);
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
      for (const item of WINE_VARIETALS) {
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
      log(`Vintner Elena the Grower nods: +${Math.round(bonus * 100)}% on your next sale.`);
      return { ok: true, haggled: true, bonus: Math.round(bonus * 100) / 100 };
    }
    log('Vintner Elena the Grower shrugs you off — no better price today.');
    return { ok: true, haggled: false, bonus: 0 };
  }

  function priceBoard() {
    return WINE_VARIETALS.map((item) => ({
      id: item.id,
      name: item.name,
      price: vineyardPriceFor(item.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[item.id],
      stock: (state.inventory[item.id] || 0) + (state.premium[item.id] || 0),
      premium: state.premium[item.id] || 0,
    }));
  }

  function orderList() {
    return VINEYARD_ORDERS.map((o) => ({
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
      const ev = VINEYARD_EVENTS[Math.floor(rng() * VINEYARD_EVENTS.length)];
      state.lastEvent = ev.id;
      if (ev.effect === 'cost-up') {
        for (const item of WINE_VARIETALS) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] + 0.15) * 100) / 100;
      } else if (ev.effect === 'cost-down') {
        for (const item of WINE_VARIETALS) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] - 0.1) * 100) / 100;
      } else if (ev.effect === 'sell-up') {
        for (const item of WINE_VARIETALS) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] + 0.2) * 100) / 100;
      } else if (ev.effect === 'xp') {
        gainXp(25);
      } else if (ev.effect === 'spoil') {
        const item = WINE_VARIETALS[Math.floor(rng() * WINE_VARIETALS.length)];
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
      log(`Vineyard news: ${ev.name} — ${ev.text}`);
      return { event: ev.id, name: ev.name };
    }
    state.lastEvent = 'none';
    return { event: 'none' };
  }

  function tasteTest(itemId) {
    const item = WINE_VARIETALS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    const have = (state.inventory[itemId] || 0) + (state.premium[itemId] || 0);
    if (have <= 0) return { ok: false, reason: 'not-enough', have };
    const roll = rng();
    const quality = Math.round((0.5 + roll * 0.5 + state.rank * 0.05 + item.difficulty * 0.05) * 100) / 100;
    gainXp(5);
    const verdict = quality >= 0.9 ? 'Outstanding — Vintner Elena the Grower would serve this to royalty.' : quality >= 0.7 ? 'Solid work. A good crate.' : 'Needs work. Vintner Elena the Grower raises an eyebrow.';
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
    for (const item of WINE_VARIETALS) {
      if (state.inventory[item.id] === undefined) state.inventory[item.id] = 0;
      if (state.premium[item.id] === undefined) state.premium[item.id] = 0;
      if (state.dayDrift[item.id] === undefined) state.dayDrift[item.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: VINEYARD_RANKS[state.rank].name,
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
      stockCap: vineyardStockCap(state.upgrades),
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
    if (state.cooldown > 0) return `Vineyard: working — ${Math.round(state.cooldown)}s left`;
    if (state.activeOrder) return `Vineyard: ${state.activeOrder.name} ${state.orderProgress}/${state.activeOrder.qty}`;
    const total = stockTotal();
    if (total > 0) return `Vineyard: ${total} in stock`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearShop = Math.hypot(pos.x - (320), pos.z - (-260)) < 25;
    if (!nearShop) return false;
    const total = stockTotal();
    if (total > 0) {
      const first = WINE_VARIETALS.find((item) => (state.inventory[item.id] || 0) + (state.premium[item.id] || 0) > 0);
      if (first) { sell(first.id, 1); return true; }
    }
    const cheapest = vineyardCheapest(state.dayDrift, state.rank, state.upgrades);
    if (cheapest) {
      const res = harvest(cheapest.id, 1);
      return res.ok;
    }
    return false;
  }

  return {
    name: 'vineyard',
    state, harvest, ageWine, sell, sellAll, buyUpgrade,
    takeOrder, deliverOrder, abandonOrder, haggle, priceBoard,
    orderList, dailyEvent, tasteTest, tick, tickDay, serialize,
    deserialize, stats, hudLine, interact,
  };
}
