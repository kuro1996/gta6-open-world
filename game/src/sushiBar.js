// Sushi Bar — Chef Kenji turns the morning catch into art.
// Prepare twelve dishes at the counter, serve omakase to the regulars,
// and keep the fish ice-cold. Freshness is everything: yesterday's fish
// is today's discount, and a dull knife is a crime.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const SUSHI_MENU = [
  {
      id: 'salmon-nigiri',
      name: 'Salmon Nigiri',
      basePrice: 22,
      time: 2,
      difficulty: 1,
      fish: 'salmon',
      rice: 'shari',
      freshness: 5,
      desc: 'Buttery salmon over warm vinegared rice, a dab of wasabi.'
    },
  {
      id: 'tuna-nigiri',
      name: 'Tuna Nigiri',
      basePrice: 26,
      time: 2,
      difficulty: 2,
      fish: 'bluefin tuna',
      rice: 'shari',
      freshness: 5,
      desc: 'Deep red tuna, clean and rich, cut against the grain.'
    },
  {
      id: 'california-roll',
      name: 'California Roll',
      basePrice: 18,
      time: 3,
      difficulty: 1,
      fish: 'crab',
      rice: 'shari',
      freshness: 4,
      desc: 'Crab, avocado and cucumber — the roll that started it all.'
    },
  {
      id: 'dragon-roll',
      name: 'Dragon Roll',
      basePrice: 34,
      time: 4,
      difficulty: 3,
      fish: 'eel',
      rice: 'shari',
      freshness: 4,
      desc: 'Grilled eel over shrimp tempura, avocado scales on top.'
    },
  {
      id: 'eel-nigiri',
      name: 'Eel Nigiri',
      basePrice: 30,
      time: 3,
      difficulty: 3,
      fish: 'unagi',
      rice: 'shari',
      freshness: 4,
      desc: 'Warm grilled eel brushed with sweet tare sauce.'
    },
  {
      id: 'shrimp-tempura-roll',
      name: 'Shrimp Tempura Roll',
      basePrice: 24,
      time: 3,
      difficulty: 2,
      fish: 'shrimp',
      rice: 'shari',
      freshness: 4,
      desc: 'Crunchy tempura shrimp rolled with cucumber and spicy mayo.'
    },
  {
      id: 'yellowtail-sashimi',
      name: 'Yellowtail Sashimi',
      basePrice: 32,
      time: 2,
      difficulty: 3,
      fish: 'hamachi',
      rice: 'none',
      freshness: 5,
      desc: 'Five slices of yellowtail, no rice, just the fish and the knife.'
    },
  {
      id: 'spicy-tuna-roll',
      name: 'Spicy Tuna Roll',
      basePrice: 22,
      time: 3,
      difficulty: 2,
      fish: 'tuna',
      rice: 'shari',
      freshness: 4,
      desc: 'Chopped tuna with chilli mayo, rolled tight and sliced clean.'
    },
  {
      id: 'salmon-sashimi',
      name: 'Salmon Sashimi',
      basePrice: 28,
      time: 2,
      difficulty: 2,
      fish: 'salmon',
      rice: 'none',
      freshness: 5,
      desc: 'Thick-cut salmon sashimi, cold from the ice, eaten plain.'
    },
  {
      id: 'tamago',
      name: 'Tamago',
      basePrice: 14,
      time: 3,
      difficulty: 2,
      fish: 'egg',
      rice: 'shari',
      freshness: 3,
      desc: 'Sweet layered omelette, the test every apprentice must pass.'
    },
  {
      id: 'uni',
      name: 'Sea Urchin',
      basePrice: 48,
      time: 2,
      difficulty: 5,
      fish: 'uni',
      rice: 'shari',
      freshness: 5,
      desc: 'Golden uni tongues — the sea\'s custard, priced like treasure.'
    },
  {
      id: 'rainbow-roll',
      name: 'Rainbow Roll',
      basePrice: 36,
      time: 4,
      difficulty: 3,
      fish: 'assorted',
      rice: 'shari',
      freshness: 4,
      desc: 'California roll dressed in salmon, tuna and avocado.'
    },
];

export const SUSHI_BAR_UPGRADES = [
  { id: 'sharp-knife', name: 'Yanagiba Knife', cost: 120, desc: 'Prepare 20% faster.', effect: 'brew-fast' },
  { id: 'ice-box', name: 'Ice Box', cost: 180, desc: 'Ingredient costs -20%.', effect: 'cost-down' },
  { id: 'rice-cooker', name: 'Rice Cooker', cost: 220, desc: 'Fewer stale plates.', effect: 'spoil-down' },
  { id: 'counter-seats', name: 'Counter Seats', cost: 300, desc: 'Sales pay +15%.', effect: 'sell-plus' },
  { id: 'fish-fridge', name: 'Fish Fridge', cost: 260, desc: 'Hold +40 plates.', effect: 'stock-plus' },
  { id: 'wasabi-grater', name: 'Wasabi Grater', cost: 350, desc: 'Fresh catch pays +25%.', effect: 'age-plus' },
  { id: 'delivery-scooter', name: 'Delivery Scooter', cost: 480, desc: 'Sell in bulk to offices.', effect: 'bulk' },
  { id: 'master-knife', name: 'Master Knife', cost: 750, desc: 'Perfect cuts: +30% on premium fish.', effect: 'strong-plus' },
];

export const SUSHI_BAR_ORDERS = [
  { id: 'office-20', name: 'Office Lunch', item: 'california-roll', qty: 20, pay: 320, days: 1, minRank: 0, desc: 'An office orders 20 California rolls for lunch.' },
  { id: 'omakase-night', name: 'Omakase Night', item: 'uni', qty: 6, pay: 480, days: 2, minRank: 4, desc: 'A regular books omakase — 6 uni plates.' },
  { id: 'party-platter', name: 'Party Platter', item: 'dragon-roll', qty: 10, pay: 420, days: 2, minRank: 2, desc: 'A birthday party orders 10 dragon rolls.' },
  { id: 'sashimi-set', name: 'Sashimi Set', item: 'salmon-sashimi', qty: 12, pay: 360, days: 1, minRank: 2, desc: 'A hotel needs 12 salmon sashimi plates.' },
  { id: 'tuna-rush', name: 'Tuna Rush', item: 'spicy-tuna-roll', qty: 18, pay: 340, days: 1, minRank: 2, desc: 'A gym orders 18 spicy tuna rolls after training.' },
  { id: 'eel-dinner', name: 'Eel Dinner', item: 'eel-nigiri', qty: 8, pay: 380, days: 2, minRank: 3, desc: 'A family dinner orders 8 eel nigiri.' },
  { id: 'nigiri-run', name: 'Nigiri Run', item: 'salmon-nigiri', qty: 24, pay: 360, days: 1, minRank: 1, desc: 'A bistro orders 24 salmon nigiri for dinner.' },
  { id: 'mixed-plates', name: 'Mixed Plates', item: 'mixed', qty: 25, pay: 580, days: 2, minRank: 3, desc: 'Any 25 plates for the harbour festival.' },
];

export const SUSHI_BAR_EVENTS = [
  { id: 'fish-shortage', name: 'Fish Shortage', text: 'The boats came back light — fish costs more today.', effect: 'cost-up' },
  { id: 'lunch-rush', name: 'Lunch Rush', text: 'Offices queue at the counter — sales pay +20%.', effect: 'sell-up' },
  { id: 'health-inspection', name: 'Health Inspection', text: 'An inspector checks the counter. Keep it spotless.', effect: 'heat' },
  { id: 'big-catch', name: 'Big Catch', text: 'The boats brought in a haul — fish is cheap today.', effect: 'cost-down' },
  { id: 'stale-fish', name: 'Stale Fish', text: 'A delivery sat too long — one plate may go stale.', effect: 'spoil' },
  { id: 'food-festival', name: 'Food Festival', text: 'A festival opens — stalls order extra.', effect: 'orders-up' },
  { id: 'cold-snap', name: 'Cold Snap', text: 'Cold nights — hot soup and sushi both sell.', effect: 'sell-up' },
  { id: 'knife-accident', name: 'Knife Accident', text: 'A knife slips. Some stock is at risk.', effect: 'spoil' },
  { id: 'sushi-critic', name: 'Sushi Critic', text: 'A food critic visits and shares a trick.', effect: 'xp' },
  { id: 'rainy-night', name: 'Rainy Night', text: 'Rain keeps regulars inside — orders double.', effect: 'orders-up' },
];

export const SUSHI_BAR_RANKS = [
  { level: 0, name: 'Rice Washer', xp: 0, perk: 'Prepare at base rate.' },
  { level: 1, name: 'Counter Hand', xp: 120, perk: '+10% sale prices.' },
  { level: 2, name: 'Itamae', xp: 300, perk: 'Stale plates forgiven once a day.' },
  { level: 3, name: 'Sushi Master', xp: 620, perk: '+20% sale prices, regulars trust you.' },
  { level: 4, name: 'Legend of the Counter', xp: 1100, perk: '+30% sale prices, fresh catch doubled.' },
];

export const SUSHI_BAR_HELPERS = [
  { id: 'rice-apprentice', name: 'Yuki the Apprentice', wage: 25, skill: 'haul', bonus: 0.15, desc: 'Washes rice: +15% prepare yield.' },
  { id: 'fish-monger', name: 'Hana the Monger', wage: 40, skill: 'age', bonus: 0.25, desc: 'Picks the best fish: +25% fresh catch speed.' },
  { id: 'counter-runner', name: 'Ren the Runner', wage: 60, skill: 'sell', bonus: 0.12, desc: 'Knows every office: +12% sale prices.' },
  { id: 'knife-master', name: 'Master Sato', wage: 80, skill: 'brew', bonus: 0.2, desc: 'Knife master: +20% prepare quality.' },
];

export const SUSHI_BAR_CHALLENGES = [
  { id: 'plates-100', name: 'First Hundred Plates', target: 'produced', goal: 100, xp: 80, desc: 'Prepare 100 plates in total.' },
  { id: 'sell-500', name: 'Half Grand', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from sushi sales.' },
  { id: 'catch-20', name: 'Fresh Catch Pro', target: 'aged', goal: 20, xp: 100, desc: 'Land 20 fresh catches.' },
  { id: 'orders-10', name: 'Counter Favourite', target: 'ordersDone', goal: 10, xp: 140, desc: 'Complete 10 counter orders.' },
  { id: 'streak-10', name: 'Clean Counter', target: 'bestStreak', goal: 10, xp: 110, desc: 'Prepare 10 plates in a row without a stale one.' },
  { id: 'rank-3', name: 'Sushi Master', target: 'rank', goal: 3, xp: 150, desc: 'Reach rank Sushi Master.' },
  { id: 'earn-2000', name: 'Sushi Baron', target: 'earned', goal: 2000, xp: 160, desc: 'Earn $2,000 from the sushi bar.' },
  { id: 'batches-50', name: 'Busy Counter', target: 'batches', goal: 50, xp: 90, desc: 'Prepare 50 batches.' },
];

export const SUSHI_BAR_ACHIEVEMENTS = [
  { id: 'first-plate', name: 'First Plate', check: 'batches', goal: 1, desc: 'Prepare your first plate.' },
  { id: 'first-sale', name: 'First Sale', check: 'sold', goal: 1, desc: 'Sell your first plate.' },
  { id: 'first-catch', name: 'Fresh One', check: 'aged', goal: 1, desc: 'Land your first fresh catch.' },
  { id: 'rank-2', name: 'Itamae', check: 'rank', goal: 2, desc: 'Reach rank Itamae.' },
  { id: 'rich-sushi', name: 'Sushi Rich', check: 'earned', goal: 2000, desc: 'Earn $2,000 from sushi.' },
  { id: 'full-kit', name: 'Full Kit', check: 'upgradesCount', goal: 8, desc: 'Own every sushi bar upgrade.' },
  { id: 'no-stale', name: 'Clean Hands', check: 'spoiled', goal: 0, desc: 'Prepare 50 plates with zero stale — checked at 50.' },
  { id: 'big-plate', name: 'Big Plate', check: 'bestBatch', goal: 20, desc: 'Prepare 20 plates in one batch.' },
];

export const SUSHI_BAR_TIPS = [
  { id: 'fresh-first', name: 'Fresh First', text: 'Fresh fish pays double. Serve the morning catch by noon.' },
  { id: 'uni-money', name: 'Uni Money', text: 'Uni costs the most and pays the most. Save it for omakase.' },
  { id: 'knife-care', name: 'Knife Care', text: 'A sharp knife is half the sushi. Never cut with a dull blade.' },
  { id: 'festival-stock', name: 'Festival Stock', text: 'Stock up before food festivals — prices jump 20%.' },
  { id: 'rice-watch', name: 'Rice Watch', text: 'A rice cooker saves more plates than luck ever will.' },
  { id: 'order-first', name: 'Orders First', text: 'Take a counter order, then prepare for it.' },
  { id: 'tuna-talk', name: 'Tuna Talk', text: 'Tuna sells best at lunch. Prep ahead of noon.' },
  { id: 'fridge-space', name: 'Fridge Space', text: 'Buy a fish fridge early — a full counter is a stuck bar.' },
];

export const SUSHI_BAR_RECORDS = [
  { id: 'biggest-plate', name: 'Biggest Plate', stat: 'bestBatch', unit: 'plates', desc: 'Most plates in one batch.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from sushi.' },
  { id: 'most-prepared', name: 'Most Prepared', stat: 'produced', unit: 'plates', desc: 'Most plates prepared.' },
  { id: 'most-caught', name: 'Most Caught', stat: 'aged', unit: 'catches', desc: 'Most fresh catches.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'plates', desc: 'Longest clean prep streak.' },
];

export const SUSHI_BAR_MARKET_EVENTS = [
  { id: 'uni-boom', name: 'Uni Boom', items: ["uni"], mult: 1.4, desc: 'Uni lovers pay 40% more.' },
  { id: 'tuna-glut', name: 'Tuna Glut', items: ["tuna-nigiri", "spicy-tuna-roll"], mult: 0.6, desc: 'Too much tuna — prices crash.' },
  { id: 'eel-rush', name: 'Eel Rush', items: ["eel-nigiri", "dragon-roll"], mult: 1.5, desc: 'An eel craze sweeps the city.' },
  { id: 'salmon-season', name: 'Salmon Season', items: ["salmon-nigiri", "salmon-sashimi"], mult: 1.3, desc: 'Salmon runs make salmon king.' },
  { id: 'roll-harvest', name: 'Roll Harvest', items: ["california-roll"], mult: 1.35, desc: 'Rolls are the lunch favourite.' },
  { id: 'sashimi-night', name: 'Sashimi Night', items: ["yellowtail-sashimi"], mult: 1.3, desc: 'Collectors drive sashimi up.' },
  { id: 'tempura-trend', name: 'Tempura Trend', items: ["shrimp-tempura-roll"], mult: 1.25, desc: 'Tempura rolls are suddenly fashionable.' },
  { id: 'rainbow-summer', name: 'Rainbow Summer', items: ["rainbow-roll"], mult: 1.3, desc: 'Summer parties love rainbow rolls.' },
  { id: 'tamago-week', name: 'Tamago Week', items: ["tamago"], mult: 1.2, desc: 'Tamago gets its week.' },
  { id: 'fish-tax', name: 'Fish Tax', items: ["uni", "yellowtail-sashimi"], mult: 0.7, desc: 'A luxury tax hits the premium fish.' },
  { id: 'dry-week', name: 'Dry Week', items: ["salmon-nigiri", "california-roll"], mult: 0.75, desc: 'A diet fad dries sales.' },
  { id: 'sushi-festival', name: 'Sushi Festival', items: ["salmon-nigiri", "tuna-nigiri", "dragon-roll"], mult: 1.2, desc: 'The festival lifts everything.' },
];

export const SUSHI_BAR_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Fresh catch, fresh customers.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Festival season, steady hunger.' },
  { id: 'autumn', name: 'Autumn', mult: 1.1, desc: 'Harvest rolls and warm sake.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold and quiet, but sushi sells.' },
];

export const SUSHI_BAR_LEADERBOARD = [
  { name: 'Kenji', total: 4200, desc: 'The itamae. Untouchable.' },
  { name: 'Sato', total: 2900, desc: 'Knife master for forty years.' },
  { name: 'You', total: 0, desc: 'Climbing.' },
  { name: 'Yuki', total: 1500, desc: 'Fast hands, faster rice.' },
  { name: 'Hana', total: 2400, desc: 'Fish monger.' },
];

export const SUSHI_BAR_QUICK_START = [
  'Prepare salmon nigiri first — cheap, fast, always sells.',
  'Land fresh catches whenever the boats come in.',
  'Buy the rice cooker before the master knife.',
  'Take counter orders, then prepare for them.',
  'Serve the morning catch by noon — freshness pays.',
  'Check the price board every morning.',
];

export function sushiBarRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < SUSHI_BAR_RANKS.length; i++) {
    if (xp >= SUSHI_BAR_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function sushiBarPriceFor(itemId, dayDrift, rank, upgrades) {
  const item = SUSHI_MENU.find((x) => x.id === itemId);
  if (!item) return 0;
  let price = item.basePrice;
  price *= 1 + (dayDrift[itemId] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('master-knife') && item.difficulty >= 3) price *= 1.3;
  if (upgrades.includes('counter-seats')) price *= 1.15;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function sushiBarSellPriceFor(itemId, premium, dayDrift, rank, upgrades) {
  let price = sushiBarPriceFor(itemId, dayDrift, rank, upgrades);
  if (premium) price *= 1.5;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function sushiBarCostFor(itemId, qty, upgrades) {
  const item = SUSHI_MENU.find((x) => x.id === itemId);
  if (!item) return 0;
  let cost = Math.round(item.basePrice * 0.4 * qty);
  if (upgrades.includes('ice-box')) cost = Math.round(cost * 0.8);
  return Math.max(1, cost);
}

export function sushiBarStockCap(upgrades) {
  let cap = 40;
  if (upgrades.includes('fish-fridge')) cap += 40;
  return cap;
}

export function sushiBarSpoilChance(item, upgrades) {
  let chance = 0.04 + item.difficulty * 0.015;
  if (upgrades.includes('rice-cooker')) chance *= 0.5;
  return chance;
}

export function sushiBarItemById(itemId) {
  return SUSHI_MENU.find((x) => x.id === itemId) || null;
}

export function sushiBarBestSeller(dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = 0;
  for (const item of SUSHI_MENU) {
    const price = sushiBarPriceFor(item.id, dayDrift, rank, upgrades);
    if (price > bestPrice) { bestPrice = price; best = item.id; }
  }
  return best ? { id: best, price: bestPrice } : null;
}

export function sushiBarCheapest(dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = Infinity;
  for (const item of SUSHI_MENU) {
    const price = sushiBarPriceFor(item.id, dayDrift, rank, upgrades);
    if (price < bestPrice) { bestPrice = price; best = item.id; }
  }
  return best ? { id: best, price: bestPrice } : null;
}

export function createSushiBarExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;
  let donated = 0;
  let rep = 0;

  function hireHelper(id) {
    const h = SUSHI_BAR_HELPERS.find((x) => x.id === id);
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
      const h = SUSHI_BAR_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    let bonus = 0;
    for (const h of SUSHI_BAR_HELPERS) {
      if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
    }
    return bonus;
  }

  function challenges() {
    return SUSHI_BAR_CHALLENGES.map((ch) => {
      const v = system.state[ch.target] !== undefined ? system.state[ch.target] : (ch.target === 'upgradesCount' ? system.state.upgrades.length : 0);
      return { id: ch.id, name: ch.name, have: Math.floor(v), goal: ch.goal, done: v >= ch.goal };
    });
  }

  function claimChallenge(id) {
    const ch = SUSHI_BAR_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const v = system.state[ch.target] !== undefined ? system.state[ch.target] : (ch.target === 'upgradesCount' ? system.state.upgrades.length : 0);
    if (v < ch.goal) return { ok: false, reason: 'not-done', have: Math.floor(v), goal: ch.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return SUSHI_BAR_ACHIEVEMENTS.map((a) => {
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
    return { ok: true, qty, rep, note: 'The neighbourhood thanks you. Chef Kenji the Itamae remembers.' };
  }

  function clearStale() {
    let cleared = 0;
    for (const item of SUSHI_MENU) {
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
    for (const item of SUSHI_MENU) {
      total += system.state.inventory[item.id] || 0;
      premiumTotal += system.state.premium[item.id] || 0;
    }
    const cap = sushiBarStockCap(system.state.upgrades);
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

export function sushiBarTipFor(day) {
  return SUSHI_BAR_TIPS[day % SUSHI_BAR_TIPS.length];
}

export function sushiBarLeaderboardWith(playerTotal) {
  const board = SUSHI_BAR_LEADERBOARD.map((e) => ({
    name: e.name, total: e.name === 'You' ? playerTotal : e.total, desc: e.desc,
  }));
  board.sort((a, b) => b.total - a.total);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export const SUSHI_BAR_META = {
  system: 'sushiBar', version: '7b-C', author: 'builder-3',
  label: 'Sushi Bar', owner: 'Chef Kenji the Itamae',
  itemCount: SUSHI_MENU.length,
};

export function createSushiBarSystem(ctx) {
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
  for (const item of SUSHI_MENU) { state.inventory[item.id] = 0; state.premium[item.id] = 0; state.dayDrift[item.id] = 0; }

  function refreshRank() {
    const r = sushiBarRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Sushi Bar rank up: ${SUSHI_BAR_RANKS[r].name} — ${SUSHI_BAR_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const item of SUSHI_MENU) {
      const roll = rng();
      if (roll < 0.3) state.dayDrift[item.id] = Math.round((rng() * 0.5 - 0.2) * 100) / 100;
      else if (roll < 0.4) state.dayDrift[item.id] = 0;
    }
  }

  function stockTotal() {
    let total = 0;
    for (const item of SUSHI_MENU) total += (state.inventory[item.id] || 0) + (state.premium[item.id] || 0);
    return total;
  }

  function prepare(itemId, qty) {
    qty = qty === undefined ? 1 : qty;
    const item = SUSHI_MENU.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    if (state.cooldown > 0) return { ok: false, reason: 'cooling-down', cooldown: Math.round(state.cooldown) };
    const cost = sushiBarCostFor(itemId, qty, state.upgrades);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    if (stockTotal() + qty > sushiBarStockCap(state.upgrades)) return { ok: false, reason: 'stock-full', cap: sushiBarStockCap(state.upgrades) };
    addCash(-cost);
    state.spent += cost;
    let made = qty;
    if (rng() < sushiBarSpoilChance(item, state.upgrades)) {
      const lost = Math.max(1, Math.floor(qty / 2));
      made = qty - lost;
      state.spoiled += lost;
      state.streak = 0;
      log(`A plate of ${item.name} went wrong — ${lost} spoiled.`);
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
    if (state.upgrades.includes('sharp-knife')) speed = Math.max(1, Math.round(speed * 0.8));
    state.cooldown = speed;
    gainXp(4 + made + item.difficulty * 2);
    if (false && item.difficulty >= 4 && rng() < 0.15) {
      addHeat(1);
      state.heatTaken += 1;
      log('Someone official is sniffing around the strong stuff. Careful.');
    }
    if (state.activeOrder) checkOrder(itemId, made);
    log(`Prepare ${made}x ${item.name} for $${cost}.`);
    return { ok: true, item: itemId, qty: made, cost, cooldown: state.cooldown };
  }

  function freshCatch(itemId, qty) {
    qty = qty === undefined ? 1 : qty;
    const item = SUSHI_MENU.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = state.inventory[itemId] || 0;
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    state.inventory[itemId] -= qty;
    state.premium[itemId] += qty;
    state.aged += qty;
    gainXp(6 + qty * 2);
    log(`Fresh Catch: ${qty}x ${item.name} set aside as premium stock.`);
    return { ok: true, item: itemId, qty, premium: state.premium[itemId] };
  }

  function sell(itemId, qty) {
    const item = SUSHI_MENU.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = (state.inventory[itemId] || 0) + (state.premium[itemId] || 0);
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    let left = qty;
    let total = 0;
    const takePrem = Math.min(state.premium[itemId] || 0, left);
    if (takePrem > 0) {
      const unit = sushiBarSellPriceFor(itemId, true, state.dayDrift, state.rank, state.upgrades);
      total += unit * takePrem;
      state.premium[itemId] -= takePrem;
      left -= takePrem;
    }
    if (left > 0) {
      const unit = sushiBarSellPriceFor(itemId, false, state.dayDrift, state.rank, state.upgrades);
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
    for (const item of SUSHI_MENU) {
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
    const u = SUSHI_BAR_UPGRADES.find((x) => x.id === id);
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
    const ord = SUSHI_BAR_ORDERS.find((x) => x.id === id);
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
      for (const item of SUSHI_MENU) {
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
      log(`Chef Kenji the Itamae nods: +${Math.round(bonus * 100)}% on your next sale.`);
      return { ok: true, haggled: true, bonus: Math.round(bonus * 100) / 100 };
    }
    log('Chef Kenji the Itamae shrugs you off — no better price today.');
    return { ok: true, haggled: false, bonus: 0 };
  }

  function priceBoard() {
    return SUSHI_MENU.map((item) => ({
      id: item.id,
      name: item.name,
      price: sushiBarPriceFor(item.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[item.id],
      stock: (state.inventory[item.id] || 0) + (state.premium[item.id] || 0),
      premium: state.premium[item.id] || 0,
    }));
  }

  function orderList() {
    return SUSHI_BAR_ORDERS.map((o) => ({
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
      const ev = SUSHI_BAR_EVENTS[Math.floor(rng() * SUSHI_BAR_EVENTS.length)];
      state.lastEvent = ev.id;
      if (ev.effect === 'cost-up') {
        for (const item of SUSHI_MENU) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] + 0.15) * 100) / 100;
      } else if (ev.effect === 'cost-down') {
        for (const item of SUSHI_MENU) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] - 0.1) * 100) / 100;
      } else if (ev.effect === 'sell-up') {
        for (const item of SUSHI_MENU) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] + 0.2) * 100) / 100;
      } else if (ev.effect === 'xp') {
        gainXp(25);
      } else if (ev.effect === 'spoil') {
        const item = SUSHI_MENU[Math.floor(rng() * SUSHI_MENU.length)];
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
      log(`Sushi Bar news: ${ev.name} — ${ev.text}`);
      return { event: ev.id, name: ev.name };
    }
    state.lastEvent = 'none';
    return { event: 'none' };
  }

  function tasteTest(itemId) {
    const item = SUSHI_MENU.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    const have = (state.inventory[itemId] || 0) + (state.premium[itemId] || 0);
    if (have <= 0) return { ok: false, reason: 'not-enough', have };
    const roll = rng();
    const quality = Math.round((0.5 + roll * 0.5 + state.rank * 0.05 + item.difficulty * 0.05) * 100) / 100;
    gainXp(5);
    const verdict = quality >= 0.9 ? 'Outstanding — Chef Kenji the Itamae would serve this to royalty.' : quality >= 0.7 ? 'Solid work. A good plate.' : 'Needs work. Chef Kenji the Itamae raises an eyebrow.';
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
    for (const item of SUSHI_MENU) {
      if (state.inventory[item.id] === undefined) state.inventory[item.id] = 0;
      if (state.premium[item.id] === undefined) state.premium[item.id] = 0;
      if (state.dayDrift[item.id] === undefined) state.dayDrift[item.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: SUSHI_BAR_RANKS[state.rank].name,
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
      stockCap: sushiBarStockCap(state.upgrades),
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
    if (state.cooldown > 0) return `Sushi Bar: working — ${Math.round(state.cooldown)}s left`;
    if (state.activeOrder) return `Sushi Bar: ${state.activeOrder.name} ${state.orderProgress}/${state.activeOrder.qty}`;
    const total = stockTotal();
    if (total > 0) return `Sushi Bar: ${total} in stock`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearShop = Math.hypot(pos.x - (60), pos.z - (200)) < 25;
    if (!nearShop) return false;
    const total = stockTotal();
    if (total > 0) {
      const first = SUSHI_MENU.find((item) => (state.inventory[item.id] || 0) + (state.premium[item.id] || 0) > 0);
      if (first) { sell(first.id, 1); return true; }
    }
    const cheapest = sushiBarCheapest(state.dayDrift, state.rank, state.upgrades);
    if (cheapest) {
      const res = prepare(cheapest.id, 1);
      return res.ok;
    }
    return false;
  }

  return {
    name: 'sushiBar',
    state, prepare, freshCatch, sell, sellAll, buyUpgrade,
    takeOrder, deliverOrder, abandonOrder, haggle, priceBoard,
    orderList, dailyEvent, tasteTest, tick, tickDay, serialize,
    deserialize, stats, hudLine, interact,
  };
}
