// Sushi bar — Chef Kenji prepares twelve plates of nigiri, rolls and
// sashimi at the counter, lands fresh catches and serves offices, hotels
// and festival crowds. Pure logic, no rendering, no imports. The game
// wires this file through the standard context with safe defaults.

export const SUSHI_MENU = [
  { id: 'salmon-nigiri', name: 'Salmon Nigiri', basePrice: 22, time: 2, difficulty: 1, fish: 'salmon', rice: 'sushi rice', freshness: 5, desc: 'Buttery salmon over warm vinegared rice, the house classic.' },
  { id: 'tuna-nigiri', name: 'Tuna Nigiri', basePrice: 26, time: 2, difficulty: 2, fish: 'tuna', rice: 'sushi rice', freshness: 5, desc: 'Deep-red tuna nigiri, cut thick and served at once.' },
  { id: 'california-roll', name: 'California Roll', basePrice: 18, time: 3, difficulty: 1, fish: 'crab', rice: 'sushi rice', freshness: 4, desc: 'Crab, avocado and cucumber rolled inside-out, an easy favourite.' },
  { id: 'dragon-roll', name: 'Dragon Roll', basePrice: 34, time: 4, difficulty: 3, fish: 'eel', rice: 'sushi rice', freshness: 4, desc: 'A dragon of eel and avocado coiled over a shrimp roll.' },
  { id: 'eel-nigiri', name: 'Eel Nigiri', basePrice: 30, time: 3, difficulty: 3, fish: 'eel', rice: 'sushi rice', freshness: 4, desc: 'Warm glazed eel over rice, sweet and smoky.' },
  { id: 'shrimp-tempura-roll', name: 'Shrimp Tempura Roll', basePrice: 24, time: 3, difficulty: 2, fish: 'shrimp', rice: 'sushi rice', freshness: 4, desc: 'Crisp shrimp tempura rolled with cucumber and sauce.' },
  { id: 'yellowtail-sashimi', name: 'Yellowtail Sashimi', basePrice: 32, time: 2, difficulty: 3, fish: 'yellowtail', rice: 'none', freshness: 5, desc: 'Slices of yellowtail, clean and rich, no rice at all.' },
  { id: 'spicy-tuna-roll', name: 'Spicy Tuna Roll', basePrice: 22, time: 3, difficulty: 2, fish: 'tuna', rice: 'sushi rice', freshness: 4, desc: 'Tuna with a chilli kick, rolled tight and cut even.' },
  { id: 'salmon-sashimi', name: 'Salmon Sashimi', basePrice: 28, time: 2, difficulty: 2, fish: 'salmon', rice: 'none', freshness: 5, desc: 'Thick salmon sashimi, the fish doing all the talking.' },
  { id: 'tamago', name: 'Tamago', basePrice: 14, time: 3, difficulty: 2, fish: 'egg', rice: 'sushi rice', freshness: 3, desc: 'Sweet layered omelette over rice, the mark of a real counter.' },
  { id: 'uni', name: 'Uni', basePrice: 48, time: 2, difficulty: 5, fish: 'sea urchin', rice: 'sushi rice', freshness: 5, desc: 'Sea urchin roe, briny and golden, the counter crown jewel.' },
  { id: 'rainbow-roll', name: 'Rainbow Roll', basePrice: 36, time: 4, difficulty: 3, fish: 'mixed fish', rice: 'sushi rice', freshness: 4, desc: 'A rainbow of fish draped over a california roll.' },
];

export const SUSHI_BAR_UPGRADES = [
  { id: 'sharp-knife', name: 'Sharp Knife', cost: 120, desc: 'A razor yanagiba that slices fish in one clean pull.', effect: 'brew-fast' },
  { id: 'ice-box', name: 'Ice Box', cost: 180, desc: 'A deep ice box that keeps the morning catch cheap.', effect: 'cost-down' },
  { id: 'rice-cooker', name: 'Rice Cooker', cost: 220, desc: 'A steady rice cooker that never lets a batch spoil.', effect: 'spoil-down' },
  { id: 'counter-seats', name: 'Counter Seats', cost: 300, desc: 'Polished counter seats where plates fetch a better price.', effect: 'sell-plus' },
  { id: 'fish-fridge', name: 'Fish Fridge', cost: 260, desc: 'A cold fridge that doubles your stock room.', effect: 'stock-plus' },
  { id: 'wasabi-grater', name: 'Wasabi Grater', cost: 350, desc: 'A sharkskin grater for fresh wasabi and finer plates.', effect: 'age-plus' },
  { id: 'delivery-scooter', name: 'Delivery Scooter', cost: 480, desc: 'A zippy scooter for hauling bulk orders to offices.', effect: 'bulk' },
  { id: 'master-knife', name: 'Master Knife', cost: 750, desc: 'The master knife, coaxing top coin from the finest plates.', effect: 'strong-plus' },
];

export const SUSHI_BAR_ORDERS = [
  { id: 'office-20', name: 'Office Twenty', item: 'california-roll', qty: 20, pay: 320, days: 1, minRank: 0, desc: 'The office down the street wants twenty california rolls for lunch.' },
  { id: 'omakase-night', name: 'Omakase Night', item: 'uni', qty: 6, pay: 480, days: 2, minRank: 4, desc: 'Six uni for a private omakase night, no substitutes.' },
  { id: 'party-platter', name: 'Party Platter', item: 'dragon-roll', qty: 10, pay: 420, days: 2, minRank: 2, desc: 'Ten dragon rolls for a birthday party platter.' },
  { id: 'sashimi-set', name: 'Sashimi Set', item: 'salmon-sashimi', qty: 12, pay: 360, days: 1, minRank: 2, desc: 'Twelve salmon sashimi sets for the hotel dinner.' },
  { id: 'tuna-rush', name: 'Tuna Rush', item: 'spicy-tuna-roll', qty: 18, pay: 340, days: 1, minRank: 2, desc: 'Eighteen spicy tuna rolls for the lunch rush.' },
  { id: 'eel-dinner', name: 'Eel Dinner', item: 'eel-nigiri', qty: 8, pay: 380, days: 2, minRank: 3, desc: 'Eight eel nigiri for a quiet anniversary dinner.' },
  { id: 'nigiri-run', name: 'Nigiri Run', item: 'salmon-nigiri', qty: 24, pay: 360, days: 1, minRank: 1, desc: 'Twenty-four salmon nigiri for the festival stall.' },
  { id: 'mixed-plates', name: 'Mixed Plates', item: 'mixed', qty: 25, pay: 580, days: 2, minRank: 3, desc: 'Twenty-five plates of anything, for a counter restock.' },
];

export const SUSHI_BAR_EVENTS = [
  { id: 'fish-shortage', name: 'Fish Shortage', text: 'Fish is scarce this week and prices climb.', effect: 'cost-up' },
  { id: 'lunch-rush', name: 'Lunch Rush', text: 'The lunch crowd is hungry and paying well.', effect: 'sell-up' },
  { id: 'health-inspection', name: 'Health Inspection', text: 'An inspector is checking the counter today.', effect: 'heat' },
  { id: 'big-catch', name: 'Big Catch', text: 'The boats came in heavy and fish is cheap.', effect: 'cost-down' },
  { id: 'stale-fish', name: 'Stale Fish', text: 'Some fish went stale and must be tossed.', effect: 'spoil' },
  { id: 'food-festival', name: 'Food Festival', text: 'The food festival wants plates, fast.', effect: 'orders-up' },
  { id: 'cold-snap', name: 'Cold Snap', text: 'Cold evenings have everyone eating at the counter.', effect: 'sell-up' },
  { id: 'knife-accident', name: 'Knife Accident', text: 'A slipped knife ruined some plates.', effect: 'spoil' },
  { id: 'sushi-critic', name: 'Sushi Critic', text: 'A travelling critic shares hard-won wisdom.', effect: 'xp' },
  { id: 'rainy-night', name: 'Rainy Night', text: 'Rain keeps folk indoors, and orders pile up.', effect: 'orders-up' },
];

export const SUSHI_BAR_RANKS = [
  { level: 0, name: 'Rice Washer', xp: 0, perk: 'Learning the counter.' },
  { level: 1, name: 'Counter Hand', xp: 120, perk: 'Steadier hands, better prices.' },
  { level: 2, name: 'Itamae', xp: 300, perk: 'The town knows your name.' },
  { level: 3, name: 'Sushi Master', xp: 620, perk: 'Hotels bid for your plates.' },
  { level: 4, name: 'Legend of the Counter', xp: 1100, perk: 'Your plates are sung about in song.' },
];

export const SUSHI_BAR_HELPERS = [
  { id: 'rice-apprentice', name: 'Yuki', wage: 25, skill: 'haul', bonus: 0.2, desc: 'Yuki the apprentice hauls rice sacks all day.' },
  { id: 'fish-monger', name: 'Hana', wage: 40, skill: 'age', bonus: 0.25, desc: 'Hana keeps the fish cold and the catch honest.' },
  { id: 'counter-runner', name: 'Ren', wage: 60, skill: 'sell', bonus: 0.15, desc: 'Ren runs plates to the tables and charms the guests.' },
  { id: 'knife-master', name: 'Master Sato', wage: 80, skill: 'brew', bonus: 0.3, desc: 'Master Sato sharpens knives that slice like wind.' },
];

export const SUSHI_BAR_CHALLENGES = [
  { id: 'plates-100', name: 'A Hundred Plates', target: 'produced', goal: 100, xp: 80, desc: 'Prepare a hundred plates in total.' },
  { id: 'sell-500', name: 'Five Hundred Sold', target: 'earned', goal: 500, xp: 120, desc: 'Earn five hundred from sales.' },
  { id: 'catch-20', name: 'Catch Twenty', target: 'aged', goal: 20, xp: 100, desc: 'Land twenty fresh catches.' },
  { id: 'orders-10', name: 'Ten Orders Done', target: 'ordersDone', goal: 10, xp: 140, desc: 'Complete ten counter orders.' },
  { id: 'streak-10', name: 'Ten Clean Batches', target: 'bestStreak', goal: 10, xp: 110, desc: 'Reach a ten-batch clean streak.' },
  { id: 'rank-3', name: 'Sushi Master', target: 'rank', goal: 3, xp: 150, desc: 'Reach rank three.' },
  { id: 'earn-2000', name: 'Two Thousand Earned', target: 'earned', goal: 2000, xp: 160, desc: 'Earn two thousand in total.' },
  { id: 'batches-50', name: 'Fifty Batches', target: 'batches', goal: 50, xp: 90, desc: 'Prepare fifty batches.' },
];

export const SUSHI_BAR_ACHIEVEMENTS = [
  { id: 'first-plate', name: 'First Plate', check: 'batches', goal: 1, desc: 'Prepare your very first plate.' },
  { id: 'first-sale', name: 'First Sale', check: 'sold', goal: 1, desc: 'Sell your first plate.' },
  { id: 'first-catch', name: 'First Catch', check: 'aged', goal: 1, desc: 'Land your first fresh catch.' },
  { id: 'rank-2', name: 'Itamae Rank', check: 'rank', goal: 2, desc: 'Reach the Itamae rank.' },
  { id: 'rich-sushi', name: 'Rich Sushi', check: 'earned', goal: 2000, desc: 'Earn two thousand in total.' },
  { id: 'full-kit', name: 'Full Kit', check: 'upgradesCount', goal: 8, desc: 'Own every sushi bar upgrade.' },
  { id: 'no-stale', name: 'No Stale', check: 'spoiled', goal: 0, desc: 'Prepare fifty batches without a single stale plate.' },
  { id: 'big-plate', name: 'Big Plate', check: 'bestBatch', goal: 20, desc: 'Prepare a batch of twenty plates.' },
];

export const SUSHI_BAR_TIPS = [
  { id: 'fresh-first', name: 'Fresh First', text: 'Prepare salmon nigiri first, it is quick and always sells.' },
  { id: 'uni-money', name: 'Uni Money', text: 'Uni is slow but it is the best coin per plate.' },
  { id: 'knife-care', name: 'Knife Care', text: 'Mind your knife and your rice cooker, or plates go stale.' },
  { id: 'festival-stock', name: 'Festival Stock', text: 'Stock up before the food festival; hungry crowds pay double.' },
  { id: 'rice-watch', name: 'Rice Watch', text: 'Watch the rice temperature, or the morning plates suffer.' },
  { id: 'order-first', name: 'Order First', text: 'Take the counter order first, then prepare exactly for it.' },
  { id: 'tuna-talk', name: 'Tuna Talk', text: 'Tuna sells itself when the boats come in fresh.' },
  { id: 'fridge-space', name: 'Fridge Space', text: 'Watch your stock cap; a fridge buys you forty more slots.' },
];

export const SUSHI_BAR_RECORDS = [
  { id: 'biggest-plate', name: 'Biggest Plate', stat: 'bestBatch', unit: 'plates', desc: 'Largest single batch ever prepared.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'dollars', desc: 'Most coin earned in total.' },
  { id: 'most-prepared', name: 'Most Prepared', stat: 'produced', unit: 'plates', desc: 'Most plates prepared in total.' },
  { id: 'most-caught', name: 'Most Caught', stat: 'aged', unit: 'catches', desc: 'Most fresh catches landed.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'plates', desc: 'Longest clean preparing streak.' },
];

export const SUSHI_BAR_MARKET_EVENTS = [
  { id: 'uni-boom', name: 'Uni Boom', items: ['uni'], mult: 1.4, desc: 'Everyone wants uni this week.' },
  { id: 'tuna-glut', name: 'Tuna Glut', items: ['tuna-nigiri', 'spicy-tuna-roll'], mult: 0.6, desc: 'Too much tuna on the market, prices sag.' },
  { id: 'eel-rush', name: 'Eel Rush', items: ['eel-nigiri', 'dragon-roll'], mult: 1.5, desc: 'Eel is the talk of the town.' },
  { id: 'salmon-season', name: 'Salmon Season', items: ['salmon-nigiri', 'salmon-sashimi'], mult: 1.3, desc: 'Salmon season lifts the whole counter.' },
  { id: 'roll-harvest', name: 'Roll Harvest', items: ['california-roll'], mult: 1.35, desc: 'Rolls are booming this week.' },
  { id: 'sashimi-night', name: 'Sashimi Night', items: ['yellowtail-sashimi'], mult: 1.3, desc: 'The hotels all want sashimi tonight.' },
  { id: 'tempura-trend', name: 'Tempura Trend', items: ['shrimp-tempura-roll'], mult: 1.25, desc: 'Tempura rolls are suddenly fashionable.' },
  { id: 'rainbow-summer', name: 'Rainbow Summer', items: ['rainbow-roll'], mult: 1.3, desc: 'Summer evenings call for rainbow rolls.' },
  { id: 'tamago-week', name: 'Tamago Week', items: ['tamago'], mult: 1.2, desc: 'Tamago is in demand.' },
  { id: 'fish-tax', name: 'Fish Tax', items: ['uni', 'yellowtail-sashimi'], mult: 0.7, desc: 'A new tax bites the fine fish hardest.' },
  { id: 'dry-week', name: 'Dry Week', items: ['salmon-nigiri', 'california-roll'], mult: 0.75, desc: 'A dry spell cools the everyday plates.' },
  { id: 'sushi-festival', name: 'Sushi Festival', items: ['salmon-nigiri', 'tuna-nigiri', 'dragon-roll'], mult: 1.2, desc: 'The sushi festival lifts every counter favourite.' },
];

export const SUSHI_BAR_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Spring crowds return to the counter.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Steady summer hunger.' },
  { id: 'autumn', name: 'Autumn', mult: 1.1, desc: 'Harvest season brings the festivals.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold winter nights thin the crowds.' },
];

export const SUSHI_BAR_LEADERBOARD = [
  { name: 'Kenji', total: 3900, desc: 'Chef Kenji still leads the board.' },
  { name: 'Sato', total: 2700, desc: 'Master Sato and his wind-sharp knives.' },
  { name: 'You', total: 0, desc: 'Your running total.' },
  { name: 'Yuki', total: 1300, desc: 'The apprentice is climbing fast.' },
  { name: 'Hana', total: 2200, desc: 'Hana and her honest fish.' },
];

export const SUSHI_BAR_QUICK_START = [
  'Prepare salmon nigiri first, it is quick and always sells.',
  'Land fresh catches whenever the boats come in, they pay far better.',
  'Buy the rice cooker before the master knife, stale plates hurt.',
  'Take counter orders then prepare for them, never the other way round.',
  'Serve the morning catch by noon, while it is still fresh.',
  'Check the price board every morning before you prepare.',
];

export const SUSHI_BAR_META = {
  system: 'sushiBar',
  version: '7b-C',
  author: 'builder-3',
  label: 'Sushi Bar',
  owner: 'Chef Kenji the Itamae',
  itemCount: 12,
};

// ---- module helpers ----

export function sushiBarRankFor(xp) {
  let rank = 0;
  let i = 0;
  while (i < SUSHI_BAR_RANKS.length) {
    if (xp >= SUSHI_BAR_RANKS[i].xp) rank = i;
    i += 1;
  }
  return rank;
}

const sushiEffectsOf = (owned) => {
  const found = new Set();
  const list = owned || [];
  let i = 0;
  while (i < list.length) {
    const up = SUSHI_BAR_UPGRADES.find((u) => u.id === list[i]);
    if (up) found.add(up.effect);
    i += 1;
  }
  return found;
};

export function sushiBarItemById(id) {
  let i = 0;
  while (i < SUSHI_MENU.length) {
    if (SUSHI_MENU[i].id === id) return SUSHI_MENU[i];
    i += 1;
  }
  return null;
}

export function sushiBarPriceFor(id, drift, rank, upgrades) {
  const plate = sushiBarItemById(id);
  if (!plate) return 0;
  const fx = sushiEffectsOf(upgrades);
  const d = drift && typeof drift[id] === 'number' ? drift[id] : 0;
  let price = plate.basePrice * (1 + d) * (1 + 0.1 * rank);
  if (plate.difficulty >= 3 && fx.has('strong-plus')) price *= 1.3;
  if (fx.has('sell-plus')) price *= 1.15;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function sushiBarSellPriceFor(id, premium, drift, rank, upgrades) {
  const regular = sushiBarPriceFor(id, drift, rank, upgrades);
  if (regular === 0) return 0;
  return Math.max(1, Math.round((premium ? regular * 1.5 : regular) * 10) / 10);
}

export function sushiBarCostFor(id, qty, upgrades) {
  const plate = sushiBarItemById(id);
  if (!plate) return 0;
  const fx = sushiEffectsOf(upgrades);
  const raw = Math.round(plate.basePrice * 0.4 * qty);
  return Math.max(1, fx.has('cost-down') ? Math.round(raw * 0.8) : raw);
}

export function sushiBarStockCap(upgrades) {
  return sushiEffectsOf(upgrades).has('stock-plus') ? 80 : 40;
}

export function sushiBarSpoilChance(item, upgrades) {
  let chance = 0.04 + item.difficulty * 0.015;
  if (sushiEffectsOf(upgrades).has('spoil-down')) chance /= 2;
  return chance;
}

export function sushiBarBestSeller(drift, rank, upgrades) {
  return SUSHI_MENU.reduce((best, plate) => {
    const price = sushiBarPriceFor(plate.id, drift, rank, upgrades);
    return best === null || price > best.price ? { id: plate.id, price } : best;
  }, null);
}

export function sushiBarCheapest(drift, rank, upgrades) {
  return SUSHI_MENU.reduce((low, plate) => {
    const price = sushiBarPriceFor(plate.id, drift, rank, upgrades);
    return low === null || price < low.price ? { id: plate.id, price } : low;
  }, null);
}

export function sushiBarTipFor(day) {
  const n = SUSHI_BAR_TIPS.length;
  return SUSHI_BAR_TIPS[((day % n) + n) % n];
}

export function sushiBarLeaderboardWith(playerTotal) {
  const rows = SUSHI_BAR_LEADERBOARD.map((row) => ({
    name: row.name,
    total: row.name === 'You' ? playerTotal : row.total,
    desc: row.desc,
  }));
  rows.sort((a, b) => b.total - a.total);
  const out = [];
  rows.forEach((row, i) => out.push({ rank: i + 1, name: row.name, total: row.total, desc: row.desc }));
  return out;
}

// ---- system factory ----

const SUSHI_STATE_KEYS = [
  'xp', 'rank', 'batches', 'produced', 'sold', 'earned', 'spent', 'spoiled', 'aged',
  'ordersDone', 'ordersFailed', 'streak', 'bestStreak', 'bestBatch', 'inventory', 'premium',
  'upgrades', 'activeOrder', 'orderProgress', 'cooldown', 'dayDrift', 'lastDay', 'dailySold',
  'dailyEarned', 'heatTaken', 'eventsSeen', 'lastEvent', 'perfectBatches',
];

function freshSushiState() {
  const map = {};
  SUSHI_MENU.forEach((p) => { map[p.id] = 0; });
  return {
    xp: 0, rank: 0, batches: 0, produced: 0, sold: 0, earned: 0, spent: 0, spoiled: 0,
    aged: 0, ordersDone: 0, ordersFailed: 0, streak: 0, bestStreak: 0, bestBatch: 0,
    inventory: { ...map }, premium: { ...map }, upgrades: [], activeOrder: null,
    orderProgress: 0, cooldown: 0, dayDrift: { ...map }, lastDay: 1, dailySold: 0,
    dailyEarned: 0, heatTaken: 0, eventsSeen: 0, lastEvent: 'none', perfectBatches: 0,
  };
}

export function createSushiBarSystem(ctx) {
  const c = ctx || {};
  const rng = typeof c.rng === 'function' ? c.rng : Math.random;
  const getDay = typeof c.getDay === 'function' ? c.getDay : () => 1;
  const getHour = typeof c.getHour === 'function' ? c.getHour : () => 12;
  const getCash = typeof c.getCash === 'function' ? c.getCash : () => 0;
  const addCash = typeof c.addCash === 'function' ? c.addCash : () => {};
  const addHeat = typeof c.addHeat === 'function' ? c.addHeat : () => {};
  const log = typeof c.log === 'function' ? c.log : () => {};
  const getPlayerPos = typeof c.getPlayerPos === 'function' ? c.getPlayerPos : () => ({ x: 0, z: 0 });
  const getWeather = typeof c.getWeather === 'function' ? c.getWeather : () => ({ condition: 'clear' });

  const S = freshSushiState();
  const sys = Object.assign({ name: 'sushiBar' }, S);

  const sync = (key) => { sys[key] = S[key]; };
  const syncAll = () => SUSHI_STATE_KEYS.forEach(sync);

  const refreshRank = () => {
    const next = sushiBarRankFor(S.xp);
    if (next > S.rank) {
      S.rank = next;
      sync('rank');
      log('Rank up! You are now ' + SUSHI_BAR_RANKS[next].name + '.');
    }
  };
  const earnXp = (n) => { S.xp += n; sync('xp'); refreshRank(); };
  const stockTotal = () => SUSHI_MENU.reduce((s, p) => s + S.inventory[p.id] + S.premium[p.id], 0);
  const stockOf = (id) => S.inventory[id] + S.premium[id];
  const drawStock = (id, qty) => {
    let rest = qty;
    const reg = Math.min(S.inventory[id], rest);
    S.inventory[id] -= reg;
    rest -= reg;
    if (rest > 0) S.premium[id] -= rest;
    sync('inventory');
    sync('premium');
  };

  const EVENT_HANDLERS = {
    'cost-up': () => { SUSHI_MENU.forEach((p) => { S.dayDrift[p.id] += 0.15; }); sync('dayDrift'); },
    'cost-down': () => { SUSHI_MENU.forEach((p) => { S.dayDrift[p.id] -= 0.1; }); sync('dayDrift'); },
    'sell-up': () => { SUSHI_MENU.forEach((p) => { S.dayDrift[p.id] += 0.2; }); sync('dayDrift'); },
    xp: () => earnXp(25),
    'orders-up': () => earnXp(10),
    heat: () => { addHeat(1); S.heatTaken += 1; sync('heatTaken'); },
    spoil: () => {
      const stocked = SUSHI_MENU.filter((p) => stockOf(p.id) > 0);
      if (stocked.length === 0) return;
      const pick = stocked[Math.floor(rng() * stocked.length)];
      const lost = Math.min(2, stockOf(pick.id));
      drawStock(pick.id, lost);
      S.spoiled += lost;
      sync('spoiled');
      log('Tossed ' + lost + ' stale plates of ' + pick.name + '.');
    },
  };

  sys.prepare = (id, qty) => {
    const amount = qty === undefined ? 1 : qty;
    const plate = sushiBarItemById(id);
    if (!plate) return { ok: false, reason: 'unknown-item' };
    if (!amount || amount <= 0) return { ok: false, reason: 'bad-quantity' };
    if (S.cooldown > 0) return { ok: false, reason: 'cooldown' };
    const cost = sushiBarCostFor(id, amount, S.upgrades);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash' };
    if (stockTotal() + amount > sushiBarStockCap(S.upgrades)) return { ok: false, reason: 'stock-full' };
    addCash(-cost);
    S.spent += cost;
    sync('spent');
    let made = amount;
    if (rng() < sushiBarSpoilChance(plate, S.upgrades)) {
      const lost = 1 + Math.floor(rng() * Math.max(1, Math.floor(amount / 2)));
      made = Math.max(0, amount - lost);
      S.spoiled += lost;
      S.streak = 0;
      sync('spoiled');
      sync('streak');
      log('A batch of ' + plate.name + ' went stale, ' + lost + ' plates lost.');
    } else {
      S.streak += 1;
      if (S.streak > S.bestStreak) S.bestStreak = S.streak;
      if (plate.difficulty >= 4) S.perfectBatches += 1;
      sync('streak');
      sync('bestStreak');
      sync('perfectBatches');
    }
    S.inventory[id] += made;
    S.batches += 1;
    S.produced += made;
    if (made > S.bestBatch) S.bestBatch = made;
    S.cooldown = sushiEffectsOf(S.upgrades).has('brew-fast')
      ? Math.max(1, Math.floor(plate.time * 0.8))
      : plate.time;
    sync('inventory');
    sync('batches');
    sync('produced');
    sync('bestBatch');
    sync('cooldown');
    earnXp(4 + made + plate.difficulty * 2);
    // The heat branch is guarded off at the sushi bar: preparing never
    // adds heat, not even for the difficulty five uni.
    if (false && plate.difficulty >= 4 && rng() < 0.15) {
      addHeat(1);
      S.heatTaken += 1;
      sync('heatTaken');
    }
    if (S.activeOrder) {
      const order = S.activeOrder;
      if (order.item === 'mixed' || order.item === id) {
        S.orderProgress += made;
        sync('orderProgress');
      }
    }
    log('Prepared ' + made + ' plates of ' + plate.name + '.');
    return { ok: true, item: id, made, cost, cooldown: S.cooldown };
  };

  sys.freshCatch = (id, qty) => {
    const amount = qty === undefined ? 1 : qty;
    const plate = sushiBarItemById(id);
    if (!plate) return { ok: false, reason: 'unknown-item' };
    if (!amount || amount <= 0) return { ok: false, reason: 'bad-quantity' };
    if (S.inventory[id] < amount) return { ok: false, reason: 'not-enough-stock' };
    S.inventory[id] -= amount;
    S.premium[id] += amount;
    S.aged += amount;
    sync('inventory');
    sync('premium');
    sync('aged');
    earnXp(6 + amount * 2);
    log('Landed ' + amount + ' fresh catches of ' + plate.name + '.');
    return { ok: true, item: id, quantity: amount, premium: S.premium[id] };
  };

  sys.sell = (id, qty) => {
    const plate = sushiBarItemById(id);
    if (!plate) return { ok: false, reason: 'unknown-item' };
    if (!qty || qty <= 0) return { ok: false, reason: 'bad-quantity' };
    if (stockOf(id) < qty) return { ok: false, reason: 'not-enough-stock' };
    const premQty = Math.min(S.premium[id], qty);
    const regQty = qty - premQty;
    const total = Math.round((premQty * sushiBarSellPriceFor(id, true, S.dayDrift, S.rank, S.upgrades)
      + regQty * sushiBarSellPriceFor(id, false, S.dayDrift, S.rank, S.upgrades)) * 10) / 10;
    S.premium[id] -= premQty;
    S.inventory[id] -= regQty;
    S.sold += qty;
    S.earned += total;
    S.dailySold += qty;
    S.dailyEarned += total;
    addCash(total);
    sync('premium');
    sync('inventory');
    sync('sold');
    sync('earned');
    sync('dailySold');
    sync('dailyEarned');
    earnXp(qty);
    return { ok: true, total, quantity: qty };
  };

  sys.sellAll = () => {
    let total = 0;
    let units = 0;
    const lines = [];
    SUSHI_MENU.forEach((plate) => {
      const qty = stockOf(plate.id);
      if (qty <= 0) return;
      const premQty = Math.min(S.premium[plate.id], qty);
      const regQty = qty - premQty;
      const lineTotal = Math.round((premQty * sushiBarSellPriceFor(plate.id, true, S.dayDrift, S.rank, S.upgrades)
        + regQty * sushiBarSellPriceFor(plate.id, false, S.dayDrift, S.rank, S.upgrades)) * 10) / 10;
      S.premium[plate.id] -= premQty;
      S.inventory[plate.id] -= regQty;
      total += lineTotal;
      units += qty;
      lines.push({ id: plate.id, quantity: qty, total: lineTotal });
    });
    if (units === 0) return { ok: false, reason: 'nothing-to-sell' };
    total = Math.round(total * 10) / 10;
    S.sold += units;
    S.earned += total;
    S.dailySold += units;
    S.dailyEarned += total;
    addCash(total);
    sync('premium');
    sync('inventory');
    sync('sold');
    sync('earned');
    sync('dailySold');
    sync('dailyEarned');
    earnXp(units);
    return { ok: true, total, units, lines };
  };

  sys.buyUpgrade = (id) => {
    const up = SUSHI_BAR_UPGRADES.find((u) => u.id === id);
    if (!up) return { ok: false, reason: 'unknown-upgrade' };
    if (S.upgrades.includes(id)) return { ok: false, reason: 'already-owned' };
    if (getCash() < up.cost) return { ok: false, reason: 'not-enough-cash' };
    addCash(-up.cost);
    S.spent += up.cost;
    S.upgrades.push(id);
    sync('spent');
    sync('upgrades');
    earnXp(20);
    log('Bought the ' + up.name + ' upgrade.');
    return { ok: true, id };
  };

  sys.takeOrder = (id) => {
    const order = SUSHI_BAR_ORDERS.find((o) => o.id === id);
    if (!order) return { ok: false, reason: 'unknown-order' };
    if (S.activeOrder) return { ok: false, reason: 'order-active' };
    if (S.rank < order.minRank) return { ok: false, reason: 'rank-too-low' };
    const today = getDay();
    S.activeOrder = { ...order, takenDay: today, deadline: today + order.days };
    S.orderProgress = 0;
    sync('activeOrder');
    sync('orderProgress');
    log('Took the order: ' + order.name + '.');
    return { ok: true, order: S.activeOrder };
  };

  sys.deliverOrder = () => {
    const order = S.activeOrder;
    if (!order) return { ok: false, reason: 'no-active-order' };
    if (order.item === 'mixed') {
      if (stockTotal() < order.qty) return { ok: false, reason: 'not-enough-stock' };
      let need = order.qty;
      let i = 0;
      while (need > 0 && i < SUSHI_MENU.length) {
        const take = Math.min(stockOf(SUSHI_MENU[i].id), need);
        drawStock(SUSHI_MENU[i].id, take);
        need -= take;
        i += 1;
      }
    } else {
      if (stockOf(order.item) < order.qty) return { ok: false, reason: 'not-enough-stock' };
      drawStock(order.item, order.qty);
      S.orderProgress = order.qty;
      sync('orderProgress');
    }
    const pay = order.pay + 40 * S.rank;
    S.activeOrder = null;
    S.orderProgress = 0;
    S.ordersDone += 1;
    S.earned += pay;
    S.dailyEarned += pay;
    addCash(pay);
    sync('activeOrder');
    sync('orderProgress');
    sync('ordersDone');
    sync('earned');
    sync('dailyEarned');
    earnXp(60);
    log('Delivered ' + order.name + ' for ' + pay + '.');
    return { ok: true, pay };
  };

  sys.abandonOrder = () => {
    if (!S.activeOrder) return { ok: false, reason: 'no-active-order' };
    S.activeOrder = null;
    S.orderProgress = 0;
    S.ordersFailed += 1;
    sync('activeOrder');
    sync('orderProgress');
    sync('ordersFailed');
    return { ok: true };
  };

  sys.haggle = () => {
    if (S.rank < 1) return { ok: false, reason: 'rank-too-low' };
    const bonus = Math.round((0.05 + 0.03 * S.rank) * 100) / 100;
    const haggled = rng() < 0.55;
    return { ok: true, haggled, bonus };
  };

  sys.priceBoard = () => SUSHI_MENU.map((plate) => ({
    id: plate.id,
    name: plate.name,
    price: sushiBarPriceFor(plate.id, S.dayDrift, S.rank, S.upgrades),
    drift: S.dayDrift[plate.id],
    stock: S.inventory[plate.id],
    premium: S.premium[plate.id],
  }));

  sys.orderList = () => SUSHI_BAR_ORDERS.map((o) => ({
    id: o.id, name: o.name, item: o.item, quantity: o.qty, pay: o.pay, days: o.days, minRank: o.minRank,
  }));

  sys.dailyEvent = () => {
    S.eventsSeen += 1;
    sync('eventsSeen');
    const weather = getWeather();
    if (weather && weather.condition === 'rain' && rng() < 0.3) {
      S.lastEvent = 'rainy-day';
      sync('lastEvent');
      return { ok: true, event: 'rainy-day', name: 'Rainy Day' };
    }
    if (rng() < 0.18) {
      const ev = SUSHI_BAR_EVENTS[Math.floor(rng() * SUSHI_BAR_EVENTS.length)];
      const handler = EVENT_HANDLERS[ev.effect];
      if (handler) handler();
      S.lastEvent = ev.id;
      sync('lastEvent');
      return { ok: true, event: ev.id, name: ev.name };
    }
    S.lastEvent = 'none';
    sync('lastEvent');
    return { ok: true, event: 'none', name: 'No event' };
  };

  sys.tasteTest = (id) => {
    const plate = sushiBarItemById(id);
    if (!plate) return { ok: false, reason: 'unknown-item' };
    if (stockOf(id) <= 0) return { ok: false, reason: 'no-stock' };
    const raw = 0.5 + rng() * 0.5 + S.rank * 0.02 + plate.difficulty * 0.01;
    const quality = Math.round(Math.min(1, raw) * 100) / 100;
    earnXp(5);
    const grade = quality >= 0.9 ? 'outstanding' : quality >= 0.7 ? 'solid' : 'needs work';
    return { ok: true, item: id, quality, verdict: grade + ' — says Chef Kenji' };
  };

  sys.tick = (dt) => {
    S.cooldown = Math.max(0, S.cooldown - dt);
    sync('cooldown');
  };

  sys.tickDay = (day) => {
    if (day === S.lastDay) return;
    S.lastDay = day;
    sync('lastDay');
    SUSHI_MENU.forEach((p) => {
      const drifted = S.dayDrift[p.id] + (rng() - 0.5) * 0.1;
      S.dayDrift[p.id] = Math.max(-0.5, Math.min(0.6, drifted));
    });
    sync('dayDrift');
    S.dailySold = 0;
    S.dailyEarned = 0;
    sync('dailySold');
    sync('dailyEarned');
    if (S.activeOrder && day > S.activeOrder.deadline && S.orderProgress < S.activeOrder.qty) {
      S.activeOrder = null;
      S.orderProgress = 0;
      S.ordersFailed += 1;
      sync('activeOrder');
      sync('orderProgress');
      sync('ordersFailed');
      log('An order expired undelivered.');
    }
    sys.dailyEvent();
  };

  sys.serialize = () => {
    const copy = {};
    SUSHI_STATE_KEYS.forEach((key) => {
      copy[key] = JSON.parse(JSON.stringify(S[key]));
    });
    return copy;
  };

  sys.deserialize = (saved) => {
    if (!saved || typeof saved !== 'object') return;
    SUSHI_STATE_KEYS.forEach((key) => {
      if (key in saved) S[key] = JSON.parse(JSON.stringify(saved[key]));
    });
    SUSHI_MENU.forEach((p) => {
      if (typeof S.inventory[p.id] !== 'number') S.inventory[p.id] = 0;
      if (typeof S.premium[p.id] !== 'number') S.premium[p.id] = 0;
      if (typeof S.dayDrift[p.id] !== 'number') S.dayDrift[p.id] = 0;
    });
    syncAll();
    refreshRank();
  };

  sys.stats = () => {
    const stock = stockTotal();
    const eff = S.produced + S.spoiled === 0
      ? 100
      : Math.round((S.produced / (S.produced + S.spoiled)) * 100);
    return {
      rank: SUSHI_BAR_RANKS[S.rank].name,
      xp: S.xp,
      batches: S.batches,
      produced: S.produced,
      sold: S.sold,
      earned: Math.round(S.earned),
      spent: S.spent,
      spoiled: S.spoiled,
      aged: S.aged,
      ordersDone: S.ordersDone,
      ordersFailed: S.ordersFailed,
      streak: S.streak,
      bestStreak: S.bestStreak,
      bestBatch: S.bestBatch,
      stock,
      stockCap: sushiBarStockCap(S.upgrades),
      upgrades: S.upgrades.length,
      activeOrder: S.activeOrder ? S.activeOrder.id : null,
      orderProgress: S.orderProgress,
      cooldown: Math.round(S.cooldown * 10) / 10,
      dailyEarned: Math.round(S.dailyEarned),
      heatTaken: S.heatTaken,
      eventsSeen: S.eventsSeen,
      lastEvent: S.lastEvent,
      perfectBatches: S.perfectBatches,
      efficiency: eff,
    };
  };

  sys.hudLine = () => {
    if (S.cooldown > 0) return 'Sushi Bar — preparing, ' + Math.ceil(S.cooldown) + 's left';
    if (S.activeOrder) return 'Order: ' + S.activeOrder.name + ' ' + S.orderProgress + '/' + S.activeOrder.qty;
    const stock = stockTotal();
    if (stock > 0) return 'Sushi Bar — ' + stock + ' plates in stock';
    return '';
  };

  sys.interact = () => {
    const pos = getPlayerPos();
    if (Math.hypot(pos.x - 60, pos.z - 200) > 25) return false;
    const stocked = SUSHI_MENU.find((p) => stockOf(p.id) > 0);
    if (stocked) {
      sys.sell(stocked.id, 1);
      return true;
    }
    const cheap = sushiBarCheapest(S.dayDrift, S.rank, S.upgrades);
    return sys.prepare(cheap.id, 1);
  };

  return sys;
}

// ---- extras factory ----

export function createSushiBarExtras(system) {
  const hired = [];
  const claimed = [];
  let wagesPaid = 0;
  let donated = 0;
  let rep = 0;

  const readField = (field) => (field === 'upgradesCount' ? system.upgrades.length : system[field] || 0);

  const extras = {};

  extras.hireHelper = (id) => {
    const helper = SUSHI_BAR_HELPERS.find((h) => h.id === id);
    if (!helper) return { ok: false, reason: 'unknown-helper' };
    let dup = false;
    hired.forEach((h) => { if (h.id === id) dup = true; });
    if (dup) return { ok: false, reason: 'already-hired' };
    hired.push(helper);
    return { ok: true, id: helper.id, name: helper.name, wage: helper.wage };
  };

  extras.fireHelper = (id) => {
    let at = -1;
    hired.forEach((h, i) => { if (h.id === id) at = i; });
    if (at < 0) return { ok: false, reason: 'not-hired' };
    hired.splice(at, 1);
    return { ok: true, id };
  };

  extras.payWages = () => {
    const due = hired.reduce((sum, h) => sum + h.wage, 0);
    wagesPaid += due;
    return { ok: true, due, helpers: hired.map((h) => ({ ...h })), wagesPaid };
  };

  extras.helperBonus = (skill) => hired.reduce((sum, h) => (h.skill === skill ? sum + h.bonus : sum), 0);

  extras.challenges = () => SUSHI_BAR_CHALLENGES.map((ch) => {
    const value = Math.floor(readField(ch.target));
    return { id: ch.id, name: ch.name, value, goal: ch.goal, done: value >= ch.goal };
  });

  extras.claimChallenge = (id) => {
    const ch = SUSHI_BAR_CHALLENGES.find((c) => c.id === id);
    if (!ch) return { ok: false, reason: 'unknown-challenge' };
    if (claimed.indexOf(id) >= 0) return { ok: false, reason: 'already-claimed' };
    const value = Math.floor(readField(ch.target));
    if (value < ch.goal) return { ok: false, reason: 'not-done', value, goal: ch.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  };

  extras.achievements = () => SUSHI_BAR_ACHIEVEMENTS.map((ach) => {
    let done;
    if (ach.check === 'spoiled') {
      done = system.batches >= 50 && system.spoiled === 0;
    } else {
      done = readField(ach.check) >= ach.goal;
    }
    return { id: ach.id, name: ach.name, desc: ach.desc, done };
  });

  extras.donate = (id, qty) => {
    if (!qty || qty <= 0) return { ok: false, reason: 'bad-quantity' };
    const held = (system.inventory[id] || 0) + (system.premium[id] || 0);
    if (held < qty) return { ok: false, reason: 'not-enough-stock', held };
    let left = qty;
    const reg = Math.min(system.inventory[id], left);
    system.inventory[id] -= reg;
    left -= reg;
    if (left > 0) system.premium[id] -= left;
    donated += qty;
    rep += Math.floor(qty / 10);
    return { ok: true, quantity: qty, reputation: rep, note: 'Chef Kenji thanks you for the donation.' };
  };

  extras.clearStale = () => {
    let cleared = 0;
    SUSHI_MENU.forEach((plate) => {
      if (plate.difficulty <= 1) {
        cleared += system.inventory[plate.id];
        system.inventory[plate.id] = 0;
      }
    });
    return { ok: true, cleared };
  };

  extras.stockReport = () => {
    let stock = 0;
    let premium = 0;
    SUSHI_MENU.forEach((plate) => {
      stock += system.inventory[plate.id];
      premium += system.premium[plate.id];
    });
    const cap = sushiBarStockCap(system.upgrades);
    return { ok: true, stock, premium, cap, free: cap - stock - premium };
  };

  Object.defineProperties(extras, {
    helpers: { get: () => hired.map((h) => ({ ...h })) },
    claimed: { get: () => claimed.slice() },
    wagesPaid: { get: () => wagesPaid },
    donated: { get: () => donated },
    rep: { get: () => rep },
  });

  return extras;
}
