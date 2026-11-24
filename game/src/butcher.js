// Butcher — Butcher Gus cuts ten meat cuts, smokes brisket and roasts,
// and sells to steakhouses, burger joints and barbecues. Pure logic, no
// rendering, no imports. The game wires this file through the standard
// context with safe defaults.

export const MEAT_CUTS = [
  { id: 'ribeye', name: 'Ribeye Steak', basePrice: 46, time: 3, difficulty: 3, animal: 'beef', cut: 'rib', weight: 0.4, desc: 'A marbled ribeye, the steakhouse favourite.' },
  { id: 'sirloin', name: 'Sirloin', basePrice: 34, time: 2, difficulty: 2, animal: 'beef', cut: 'loin', weight: 0.3, desc: 'A lean sirloin, honest and even.' },
  { id: 't-bone', name: 'T-Bone', basePrice: 52, time: 3, difficulty: 4, animal: 'beef', cut: 'short loin', weight: 0.5, desc: 'A thick T-bone, two steaks in one cut.' },
  { id: 'pork-chops', name: 'Pork Chops', basePrice: 26, time: 2, difficulty: 2, animal: 'pork', cut: 'loin', weight: 0.25, desc: 'Thick pork chops, pink and juicy.' },
  { id: 'lamb-leg', name: 'Lamb Leg', basePrice: 58, time: 4, difficulty: 3, animal: 'lamb', cut: 'leg', weight: 1.2, desc: 'A whole lamb leg, made for the Sunday roast.' },
  { id: 'chicken-breast', name: 'Chicken Breast', basePrice: 18, time: 1, difficulty: 1, animal: 'chicken', cut: 'breast', weight: 0.2, desc: 'Plump chicken breasts, the quick seller.' },
  { id: 'ground-beef', name: 'Ground Beef', basePrice: 16, time: 1, difficulty: 1, animal: 'beef', cut: 'trim', weight: 0.5, desc: 'Fresh ground beef for the burger joints.' },
  { id: 'sausages', name: 'Sausages', basePrice: 20, time: 2, difficulty: 2, animal: 'pork', cut: 'sausage', weight: 0.4, desc: 'Hand-linked pork sausages, spiced just right.' },
  { id: 'brisket', name: 'Smoked Brisket', basePrice: 40, time: 5, difficulty: 3, animal: 'beef', cut: 'brisket', weight: 1.0, desc: 'A slow-smoked brisket, dark bark and tender heart.' },
  { id: 'ham-hock', name: 'Ham Hock', basePrice: 24, time: 4, difficulty: 2, animal: 'pork', cut: 'hock', weight: 0.6, desc: 'A cured ham hock, made for slow pots.' },
];

export const BUTCHER_UPGRADES = [
  { id: 'cleaver-set', name: 'Cleaver Set', cost: 120, desc: 'A matched set of cleavers that cut fast and true.', effect: 'brew-fast' },
  { id: 'smokehouse', name: 'Smokehouse', cost: 220, desc: 'A proper smokehouse that deepens every smoked cut.', effect: 'age-plus' },
  { id: 'cold-room', name: 'Cold Room', cost: 180, desc: 'A big cold room that keeps meat cheap to hold.', effect: 'cost-down' },
  { id: 'display-counter', name: 'Display Counter', cost: 300, desc: 'A marble display counter where cuts fetch a better price.', effect: 'sell-plus' },
  { id: 'meat-hooks', name: 'Meat Hooks', cost: 260, desc: 'Rows of hooks that double your stock room.', effect: 'stock-plus' },
  { id: 'sharpening-stone', name: 'Sharpening Stone', cost: 150, desc: 'A fine stone that keeps blades keen and cuts from spoiling.', effect: 'spoil-down' },
  { id: 'delivery-van', name: 'Delivery Van', cost: 520, desc: 'A sturdy van for hauling bulk orders to the steakhouses.', effect: 'bulk' },
  { id: 'master-cleaver', name: 'Master Cleaver', cost: 800, desc: 'The master cleaver, coaxing top coin from the finest cuts.', effect: 'strong-plus' },
];

export const BUTCHER_ORDERS = [
  { id: 'steakhouse-12', name: 'Steakhouse Dozen', item: 'ribeye', qty: 12, pay: 560, days: 1, minRank: 0, desc: 'The steakhouse wants a dozen ribeyes for tonight.' },
  { id: 'sunday-roast', name: 'Sunday Roast', item: 'lamb-leg', qty: 6, pay: 520, days: 2, minRank: 3, desc: 'Six lamb legs for the Sunday roast crowd.' },
  { id: 'burger-joint', name: 'Burger Joint', item: 'ground-beef', qty: 20, pay: 340, days: 1, minRank: 1, desc: 'Twenty packs of ground beef for the burger joint.' },
  { id: 'bbq-party', name: 'BBQ Party', item: 'sausages', qty: 24, pay: 360, days: 1, minRank: 2, desc: 'Two dozen sausages for a backyard barbecue party.' },
  { id: 'brisket-smoke', name: 'Brisket Smoke', item: 'brisket', qty: 8, pay: 460, days: 2, minRank: 3, desc: 'Eight briskets for the smokehouse supper.' },
  { id: 'bistro-chops', name: 'Bistro Chops', item: 'pork-chops', qty: 14, pay: 360, days: 1, minRank: 2, desc: 'Fourteen pork chops for the bistro dinner service.' },
  { id: 'chicken-run', name: 'Chicken Run', item: 'chicken-breast', qty: 30, pay: 340, days: 1, minRank: 1, desc: 'Thirty chicken breasts for the lunch counter.' },
  { id: 'mixed-cuts', name: 'Mixed Cuts', item: 'mixed', qty: 20, pay: 580, days: 2, minRank: 3, desc: 'Twenty cuts of anything, for a restaurant restock.' },
];

export const BUTCHER_EVENTS = [
  { id: 'meat-shortage', name: 'Meat Shortage', text: 'Meat is scarce this week and prices climb.', effect: 'cost-up' },
  { id: 'dinner-rush', name: 'Dinner Rush', text: 'The dinner crowd is hungry and paying well.', effect: 'sell-up' },
  { id: 'health-inspection', name: 'Health Inspection', text: 'An inspector is checking the cold room today.', effect: 'heat' },
  { id: 'farm-delivery', name: 'Farm Delivery', text: 'The farms delivered heavy and meat is cheap.', effect: 'cost-down' },
  { id: 'wasted-cut', name: 'Wasted Cut', text: 'A bad cut went to waste and must be tossed.', effect: 'spoil' },
  { id: 'street-fair', name: 'Street Fair', text: 'The street fair wants cuts, fast.', effect: 'orders-up' },
  { id: 'cold-snap', name: 'Cold Snap', text: 'Cold evenings have everyone buying roast meat.', effect: 'sell-up' },
  { id: 'coldroom-breakdown', name: 'Cold Room Breakdown', text: 'The cold room broke down and ruined some cuts.', effect: 'spoil' },
  { id: 'butcher-critic', name: 'Butcher Critic', text: 'A travelling critic shares hard-won wisdom.', effect: 'xp' },
  { id: 'rainy-night', name: 'Rainy Night', text: 'Rain keeps folk indoors, and orders pile up.', effect: 'orders-up' },
];

export const BUTCHER_RANKS = [
  { level: 0, name: 'Block Hand', xp: 0, perk: 'Learning the block.' },
  { level: 1, name: 'Cleaver Hand', xp: 120, perk: 'Steadier hands, better prices.' },
  { level: 2, name: 'Master Butcher', xp: 300, perk: 'The town knows your name.' },
  { level: 3, name: 'Meat Baron', xp: 620, perk: 'Steakhouses bid for your cuts.' },
  { level: 4, name: 'Legend of the Block', xp: 1100, perk: 'Your cuts are sung about in song.' },
];

export const BUTCHER_HELPERS = [
  { id: 'apprentice', name: 'Cole', wage: 25, skill: 'haul', bonus: 0.2, desc: 'Cole the apprentice hauls carcasses all day.' },
  { id: 'smoke-keeper', name: 'Ada', wage: 40, skill: 'age', bonus: 0.25, desc: 'Ada keeps the smokehouse even and the brisket honest.' },
  { id: 'counter-runner', name: 'Max', wage: 60, skill: 'sell', bonus: 0.15, desc: 'Max runs cuts to the counters and charms the chefs.' },
  { id: 'cleaver-master', name: 'Old Gus Jr', wage: 80, skill: 'brew', bonus: 0.3, desc: 'Old Gus Jr swings a cleaver that never misses.' },
];

export const BUTCHER_CHALLENGES = [
  { id: 'cuts-100', name: 'A Hundred Cuts', target: 'produced', goal: 100, xp: 80, desc: 'Cut a hundred pieces in total.' },
  { id: 'sell-500', name: 'Five Hundred Sold', target: 'earned', goal: 500, xp: 120, desc: 'Earn five hundred from sales.' },
  { id: 'smoke-20', name: 'Smoke Twenty', target: 'aged', goal: 20, xp: 100, desc: 'Smoke twenty cuts.' },
  { id: 'orders-10', name: 'Ten Orders Done', target: 'ordersDone', goal: 10, xp: 140, desc: 'Complete ten restaurant orders.' },
  { id: 'streak-10', name: 'Ten Clean Batches', target: 'bestStreak', goal: 10, xp: 110, desc: 'Reach a ten-batch clean streak.' },
  { id: 'rank-3', name: 'Meat Baron', target: 'rank', goal: 3, xp: 150, desc: 'Reach rank three.' },
  { id: 'earn-2000', name: 'Two Thousand Earned', target: 'earned', goal: 2000, xp: 160, desc: 'Earn two thousand in total.' },
  { id: 'batches-50', name: 'Fifty Batches', target: 'batches', goal: 50, xp: 90, desc: 'Cut fifty batches.' },
];

export const BUTCHER_ACHIEVEMENTS = [
  { id: 'first-cut', name: 'First Cut', check: 'batches', goal: 1, desc: 'Cut your very first batch.' },
  { id: 'first-sale', name: 'First Sale', check: 'sold', goal: 1, desc: 'Sell your first cut.' },
  { id: 'first-smoke', name: 'First Smoke', check: 'aged', goal: 1, desc: 'Smoke your first cut.' },
  { id: 'rank-2', name: 'Master Butcher Rank', check: 'rank', goal: 2, desc: 'Reach the Master Butcher rank.' },
  { id: 'rich-meat', name: 'Rich Meat', check: 'earned', goal: 2000, desc: 'Earn two thousand in total.' },
  { id: 'full-kit', name: 'Full Kit', check: 'upgradesCount', goal: 8, desc: 'Own every butcher upgrade.' },
  { id: 'no-waste', name: 'No Waste', check: 'spoiled', goal: 0, desc: 'Cut fifty batches without wasting a single cut.' },
  { id: 'big-cut', name: 'Big Cut', check: 'bestBatch', goal: 20, desc: 'Cut a batch of twenty pieces.' },
];

export const BUTCHER_TIPS = [
  { id: 'fresh-first', name: 'Fresh First', text: 'Cut chicken breast first, it is quick and always sells.' },
  { id: 'smoke-it', name: 'Smoke It', text: 'Smoke everything you can afford; smoked cuts pay far better.' },
  { id: 'cleaver-care', name: 'Cleaver Care', text: 'Mind your cleaver and your stone, or cuts go to waste.' },
  { id: 'fair-stock', name: 'Fair Stock', text: 'Stock up before the street fair; hungry crowds pay double.' },
  { id: 'cold-watch', name: 'Cold Watch', text: 'Watch the cold room temperature, or the morning cuts spoil.' },
  { id: 'order-first', name: 'Order First', text: 'Take the restaurant order first, then cut exactly for it.' },
  { id: 'brisket-money', name: 'Brisket Money', text: 'Brisket is slow but it is the best coin per cut.' },
  { id: 'hook-space', name: 'Hook Space', text: 'Watch your stock cap; hooks buy you forty more slots.' },
];

export const BUTCHER_RECORDS = [
  { id: 'biggest-cut', name: 'Biggest Cut', stat: 'bestBatch', unit: 'cuts', desc: 'Largest single batch ever cut.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'dollars', desc: 'Most coin earned in total.' },
  { id: 'most-cut', name: 'Most Cut', stat: 'produced', unit: 'cuts', desc: 'Most cuts made in total.' },
  { id: 'most-smoked', name: 'Most Smoked', stat: 'aged', unit: 'cuts', desc: 'Most cuts smoked.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'cuts', desc: 'Longest clean cutting streak.' },
];

export const BUTCHER_MARKET_EVENTS = [
  { id: 'ribeye-boom', name: 'Ribeye Boom', items: ['ribeye'], mult: 1.4, desc: 'Everyone wants ribeye this week.' },
  { id: 'ground-glut', name: 'Ground Glut', items: ['ground-beef', 'chicken-breast'], mult: 0.6, desc: 'Too much ground meat on the market, prices sag.' },
  { id: 'brisket-rush', name: 'Brisket Rush', items: ['brisket'], mult: 1.5, desc: 'Brisket is the talk of the town.' },
  { id: 'lamb-season', name: 'Lamb Season', items: ['lamb-leg'], mult: 1.3, desc: 'Lamb season lifts the roast trade.' },
  { id: 'sausage-morning', name: 'Sausage Morning', items: ['sausages'], mult: 1.35, desc: 'Sausage mornings are booming.' },
  { id: 't-bone-night', name: 'T-Bone Night', items: ['t-bone'], mult: 1.3, desc: 'The steakhouses all want T-bones tonight.' },
  { id: 'pork-trend', name: 'Pork Trend', items: ['pork-chops', 'ham-hock'], mult: 1.25, desc: 'Pork cuts are suddenly fashionable.' },
  { id: 'chicken-summer', name: 'Chicken Summer', items: ['chicken-breast'], mult: 1.3, desc: 'Summer grills call for chicken.' },
  { id: 'sirloin-week', name: 'Sirloin Week', items: ['sirloin'], mult: 1.2, desc: 'Sirloin is in demand.' },
  { id: 'meat-tax', name: 'Meat Tax', items: ['ribeye', 't-bone'], mult: 0.7, desc: 'A new tax bites the fine cuts hardest.' },
  { id: 'dry-week', name: 'Dry Week', items: ['ribeye', 'sausages'], mult: 0.75, desc: 'A dry spell cools the everyday cuts.' },
  { id: 'butcher-festival', name: 'Butcher Festival', items: ['ribeye', 'sausages', 'ground-beef'], mult: 1.2, desc: 'The butcher festival lifts every block favourite.' },
];

export const BUTCHER_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Spring crowds return to the counters.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Steady summer hunger.' },
  { id: 'autumn', name: 'Autumn', mult: 1.1, desc: 'Harvest season brings the fairs.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold winter nights thin the crowds.' },
];

export const BUTCHER_LEADERBOARD = [
  { name: 'Gus', total: 4100, desc: 'Butcher Gus still leads the board.' },
  { name: 'Ada', total: 2800, desc: 'Smoke keeper with a steady hand.' },
  { name: 'You', total: 0, desc: 'Your running total.' },
  { name: 'Cole', total: 1500, desc: 'The apprentice is climbing fast.' },
  { name: 'Max', total: 2300, desc: 'Max and his charming counters.' },
];

export const BUTCHER_QUICK_START = [
  'Cut chicken breast first, it is quick and always sells.',
  'Smoke everything affordable, smoked cuts pay far better.',
  'Buy the sharpening stone before the master cleaver, wasted cuts hurt.',
  'Take restaurant orders then cut for them, never the other way round.',
  'Sell the morning cut by noon, while it is still fresh.',
  'Check the price board every morning before you cut.',
];

export const BUTCHER_META = {
  system: 'butcher',
  version: '7b-C',
  author: 'builder-3',
  label: 'Butcher',
  owner: 'Butcher Gus the Cleaver',
  itemCount: 10,
};

// ---- module helpers ----

export function butcherRankFor(xp) {
  let rank = 0;
  for (let i = BUTCHER_RANKS.length - 1; i >= 0; i--) {
    if (xp >= BUTCHER_RANKS[i].xp) {
      rank = i;
      break;
    }
  }
  return rank;
}

function butcherEffectSet(owned) {
  const fx = new Set();
  const list = owned || [];
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < BUTCHER_UPGRADES.length; j++) {
      if (BUTCHER_UPGRADES[j].id === list[i]) fx.add(BUTCHER_UPGRADES[j].effect);
    }
  }
  return fx;
}

export function butcherItemById(id) {
  for (let i = 0; i < MEAT_CUTS.length; i++) {
    if (MEAT_CUTS[i].id === id) return MEAT_CUTS[i];
  }
  return null;
}

export function butcherPriceFor(id, drift, rank, upgrades) {
  const cut = butcherItemById(id);
  if (!cut) return 0;
  const fx = butcherEffectSet(upgrades);
  const d = drift && typeof drift[id] === 'number' ? drift[id] : 0;
  let price = cut.basePrice * (1 + d) * (1 + 0.1 * rank);
  if (cut.difficulty >= 3 && fx.has('strong-plus')) price *= 1.3;
  if (fx.has('sell-plus')) price *= 1.15;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function butcherSellPriceFor(id, premium, drift, rank, upgrades) {
  const regular = butcherPriceFor(id, drift, rank, upgrades);
  if (regular === 0) return 0;
  return Math.max(1, Math.round((premium ? regular * 1.5 : regular) * 10) / 10);
}

export function butcherCostFor(id, qty, upgrades) {
  const cut = butcherItemById(id);
  if (!cut) return 0;
  const raw = Math.round(cut.basePrice * 0.4 * qty);
  return Math.max(1, butcherEffectSet(upgrades).has('cost-down') ? Math.round(raw * 0.8) : raw);
}

export function butcherStockCap(upgrades) {
  return butcherEffectSet(upgrades).has('stock-plus') ? 80 : 40;
}

export function butcherSpoilChance(item, upgrades) {
  const chance = 0.04 + item.difficulty * 0.015;
  return butcherEffectSet(upgrades).has('spoil-down') ? chance / 2 : chance;
}

export function butcherBestSeller(drift, rank, upgrades) {
  let best = null;
  for (let i = 0; i < MEAT_CUTS.length; i++) {
    const price = butcherPriceFor(MEAT_CUTS[i].id, drift, rank, upgrades);
    if (best === null || price > best.price) best = { id: MEAT_CUTS[i].id, price };
  }
  return best;
}

export function butcherCheapest(drift, rank, upgrades) {
  let low = null;
  for (let i = 0; i < MEAT_CUTS.length; i++) {
    const price = butcherPriceFor(MEAT_CUTS[i].id, drift, rank, upgrades);
    if (low === null || price < low.price) low = { id: MEAT_CUTS[i].id, price };
  }
  return low;
}

export function butcherTipFor(day) {
  const n = BUTCHER_TIPS.length;
  return BUTCHER_TIPS[((day % n) + n) % n];
}

export function butcherLeaderboardWith(playerTotal) {
  const rows = BUTCHER_LEADERBOARD.map((row) => ({
    name: row.name,
    total: row.name === 'You' ? playerTotal : row.total,
    desc: row.desc,
  }));
  rows.sort((a, b) => b.total - a.total);
  return rows.map((row, i) => ({ rank: i + 1, name: row.name, total: row.total, desc: row.desc }));
}

// ---- system factory ----

const BUTCHER_STATE_KEYS = [
  'xp', 'rank', 'batches', 'produced', 'sold', 'earned', 'spent', 'spoiled', 'aged',
  'ordersDone', 'ordersFailed', 'streak', 'bestStreak', 'bestBatch', 'inventory', 'premium',
  'upgrades', 'activeOrder', 'orderProgress', 'cooldown', 'dayDrift', 'lastDay', 'dailySold',
  'dailyEarned', 'heatTaken', 'eventsSeen', 'lastEvent', 'perfectBatches',
];

export function createButcherSystem(ctx) {
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

  const sys = { name: 'butcher' };
  sys.xp = 0;
  sys.rank = 0;
  sys.batches = 0;
  sys.produced = 0;
  sys.sold = 0;
  sys.earned = 0;
  sys.spent = 0;
  sys.spoiled = 0;
  sys.aged = 0;
  sys.ordersDone = 0;
  sys.ordersFailed = 0;
  sys.streak = 0;
  sys.bestStreak = 0;
  sys.bestBatch = 0;
  sys.inventory = {};
  sys.premium = {};
  sys.upgrades = [];
  sys.activeOrder = null;
  sys.orderProgress = 0;
  sys.cooldown = 0;
  sys.dayDrift = {};
  sys.lastDay = 1;
  sys.dailySold = 0;
  sys.dailyEarned = 0;
  sys.heatTaken = 0;
  sys.eventsSeen = 0;
  sys.lastEvent = 'none';
  sys.perfectBatches = 0;
  for (let i = 0; i < MEAT_CUTS.length; i++) {
    sys.inventory[MEAT_CUTS[i].id] = 0;
    sys.premium[MEAT_CUTS[i].id] = 0;
    sys.dayDrift[MEAT_CUTS[i].id] = 0;
  }

  wireButcher(sys, { rng, getDay, getHour, getCash, addCash, addHeat, log, getPlayerPos, getWeather });
  return sys;
}

function wireButcher(sys, wire) {
  const rng = wire.rng;
  const getDay = wire.getDay;
  const getCash = wire.getCash;
  const addCash = wire.addCash;
  const addHeat = wire.addHeat;
  const log = wire.log;
  const getPlayerPos = wire.getPlayerPos;
  const getWeather = wire.getWeather;

  function checkRank() {
    const next = butcherRankFor(sys.xp);
    if (next > sys.rank) {
      sys.rank = next;
      log('Rank up! You are now ' + BUTCHER_RANKS[next].name + '.');
    }
  }
  function grantXp(n) {
    sys.xp += n;
    checkRank();
  }
  function stockCount() {
    let total = 0;
    for (let i = 0; i < MEAT_CUTS.length; i++) {
      total += sys.inventory[MEAT_CUTS[i].id] + sys.premium[MEAT_CUTS[i].id];
    }
    return total;
  }
  function onHand(id) {
    return sys.inventory[id] + sys.premium[id];
  }
  function pullStock(id, qty) {
    let rest = qty;
    while (rest > 0 && sys.inventory[id] > 0) {
      sys.inventory[id] -= 1;
      rest -= 1;
    }
    while (rest > 0 && sys.premium[id] > 0) {
      sys.premium[id] -= 1;
      rest -= 1;
    }
  }
  function shiftDrift(amount) {
    for (let i = 0; i < MEAT_CUTS.length; i++) sys.dayDrift[MEAT_CUTS[i].id] += amount;
  }

  sys.cut = function (id, qty) {
    const amount = qty === undefined ? 1 : qty;
    const cut = butcherItemById(id);
    if (!cut) return { ok: false, reason: 'unknown-item' };
    if (!amount || amount <= 0) return { ok: false, reason: 'bad-quantity' };
    if (sys.cooldown > 0) return { ok: false, reason: 'cooldown' };
    const cost = butcherCostFor(id, amount, sys.upgrades);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash' };
    if (stockCount() + amount > butcherStockCap(sys.upgrades)) return { ok: false, reason: 'stock-full' };
    addCash(-cost);
    sys.spent += cost;
    let made = amount;
    if (rng() < butcherSpoilChance(cut, sys.upgrades)) {
      const lost = 1 + Math.floor(rng() * Math.max(1, Math.floor(amount / 2)));
      made = amount - lost;
      if (made < 0) made = 0;
      sys.spoiled += lost;
      sys.streak = 0;
      log('A batch of ' + cut.name + ' went to waste, ' + lost + ' cuts lost.');
    } else {
      sys.streak += 1;
      if (sys.streak > sys.bestStreak) sys.bestStreak = sys.streak;
      if (cut.difficulty >= 4) sys.perfectBatches += 1;
    }
    sys.inventory[id] += made;
    sys.batches += 1;
    sys.produced += made;
    if (made > sys.bestBatch) sys.bestBatch = made;
    sys.cooldown = butcherEffectSet(sys.upgrades).has('brew-fast')
      ? Math.max(1, Math.floor(cut.time * 0.8))
      : cut.time;
    grantXp(4 + made + cut.difficulty * 2);
    // The heat branch is live at the butcher: cutting a hard cut can draw
    // the inspector, one heat on a fifteen percent roll.
    if (cut.difficulty >= 4 && rng() < 0.15) {
      addHeat(1);
      sys.heatTaken += 1;
      log('The hard cut drew an inspector\'s eye.');
    }
    if (sys.activeOrder) {
      const order = sys.activeOrder;
      if (order.item === 'mixed' || order.item === id) sys.orderProgress += made;
    }
    log('Cut ' + made + ' pieces of ' + cut.name + '.');
    return { ok: true, item: id, made, cost, cooldown: sys.cooldown };
  };

  sys.smokeMeat = function (id, qty) {
    const amount = qty === undefined ? 1 : qty;
    const cut = butcherItemById(id);
    if (!cut) return { ok: false, reason: 'unknown-item' };
    if (!amount || amount <= 0) return { ok: false, reason: 'bad-quantity' };
    if (sys.inventory[id] < amount) return { ok: false, reason: 'not-enough-stock' };
    sys.inventory[id] -= amount;
    sys.premium[id] += amount;
    sys.aged += amount;
    grantXp(6 + amount * 2);
    log('Smoked ' + amount + ' cuts of ' + cut.name + '.');
    return { ok: true, item: id, quantity: amount, premium: sys.premium[id] };
  };

  sys.sell = function (id, qty) {
    const cut = butcherItemById(id);
    if (!cut) return { ok: false, reason: 'unknown-item' };
    if (!qty || qty <= 0) return { ok: false, reason: 'bad-quantity' };
    if (onHand(id) < qty) return { ok: false, reason: 'not-enough-stock' };
    const premQty = Math.min(sys.premium[id], qty);
    const regQty = qty - premQty;
    const total = Math.round((premQty * butcherSellPriceFor(id, true, sys.dayDrift, sys.rank, sys.upgrades)
      + regQty * butcherSellPriceFor(id, false, sys.dayDrift, sys.rank, sys.upgrades)) * 10) / 10;
    sys.premium[id] -= premQty;
    sys.inventory[id] -= regQty;
    sys.sold += qty;
    sys.earned += total;
    sys.dailySold += qty;
    sys.dailyEarned += total;
    addCash(total);
    grantXp(qty);
    return { ok: true, total, quantity: qty };
  };

  sys.sellAll = function () {
    let total = 0;
    let units = 0;
    const lines = [];
    for (let i = 0; i < MEAT_CUTS.length; i++) {
      const cut = MEAT_CUTS[i];
      const qty = onHand(cut.id);
      if (qty <= 0) continue;
      const premQty = Math.min(sys.premium[cut.id], qty);
      const regQty = qty - premQty;
      const lineTotal = Math.round((premQty * butcherSellPriceFor(cut.id, true, sys.dayDrift, sys.rank, sys.upgrades)
        + regQty * butcherSellPriceFor(cut.id, false, sys.dayDrift, sys.rank, sys.upgrades)) * 10) / 10;
      sys.premium[cut.id] -= premQty;
      sys.inventory[cut.id] -= regQty;
      total += lineTotal;
      units += qty;
      lines.push({ id: cut.id, quantity: qty, total: lineTotal });
    }
    if (units === 0) return { ok: false, reason: 'nothing-to-sell' };
    total = Math.round(total * 10) / 10;
    sys.sold += units;
    sys.earned += total;
    sys.dailySold += units;
    sys.dailyEarned += total;
    addCash(total);
    grantXp(units);
    return { ok: true, total, units, lines };
  };

  sys.buyUpgrade = function (id) {
    const up = BUTCHER_UPGRADES.find((u) => u.id === id);
    if (!up) return { ok: false, reason: 'unknown-upgrade' };
    if (sys.upgrades.includes(id)) return { ok: false, reason: 'already-owned' };
    if (getCash() < up.cost) return { ok: false, reason: 'not-enough-cash' };
    addCash(-up.cost);
    sys.spent += up.cost;
    sys.upgrades.push(id);
    grantXp(20);
    log('Bought the ' + up.name + ' upgrade.');
    return { ok: true, id };
  };

  sys.takeOrder = function (id) {
    const order = BUTCHER_ORDERS.find((o) => o.id === id);
    if (!order) return { ok: false, reason: 'unknown-order' };
    if (sys.activeOrder) return { ok: false, reason: 'order-active' };
    if (sys.rank < order.minRank) return { ok: false, reason: 'rank-too-low' };
    const today = getDay();
    sys.activeOrder = { ...order, takenDay: today, deadline: today + order.days };
    sys.orderProgress = 0;
    log('Took the order: ' + order.name + '.');
    return { ok: true, order: sys.activeOrder };
  };

  sys.deliverOrder = function () {
    const order = sys.activeOrder;
    if (!order) return { ok: false, reason: 'no-active-order' };
    if (order.item === 'mixed') {
      if (stockCount() < order.qty) return { ok: false, reason: 'not-enough-stock' };
      let need = order.qty;
      let i = 0;
      while (need > 0 && i < MEAT_CUTS.length) {
        const take = Math.min(onHand(MEAT_CUTS[i].id), need);
        pullStock(MEAT_CUTS[i].id, take);
        need -= take;
        i += 1;
      }
    } else {
      if (onHand(order.item) < order.qty) return { ok: false, reason: 'not-enough-stock' };
      pullStock(order.item, order.qty);
      sys.orderProgress = order.qty;
    }
    const pay = order.pay + 40 * sys.rank;
    sys.activeOrder = null;
    sys.orderProgress = 0;
    sys.ordersDone += 1;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    grantXp(60);
    log('Delivered ' + order.name + ' for ' + pay + '.');
    return { ok: true, pay };
  };

  sys.abandonOrder = function () {
    if (!sys.activeOrder) return { ok: false, reason: 'no-active-order' };
    sys.activeOrder = null;
    sys.orderProgress = 0;
    sys.ordersFailed += 1;
    return { ok: true };
  };

  sys.haggle = function () {
    if (sys.rank < 1) return { ok: false, reason: 'rank-too-low' };
    const bonus = Math.round((0.05 + 0.03 * sys.rank) * 100) / 100;
    const haggled = rng() < 0.55;
    return { ok: true, haggled, bonus };
  };

  sys.priceBoard = function () {
    const rows = [];
    for (let i = 0; i < MEAT_CUTS.length; i++) {
      const cut = MEAT_CUTS[i];
      rows.push({
        id: cut.id,
        name: cut.name,
        price: butcherPriceFor(cut.id, sys.dayDrift, sys.rank, sys.upgrades),
        drift: sys.dayDrift[cut.id],
        stock: sys.inventory[cut.id],
        premium: sys.premium[cut.id],
      });
    }
    return rows;
  };

  sys.orderList = function () {
    return BUTCHER_ORDERS.map((o) => ({
      id: o.id, name: o.name, item: o.item, quantity: o.qty, pay: o.pay, days: o.days, minRank: o.minRank,
    }));
  };

  sys.dailyEvent = function () {
    sys.eventsSeen += 1;
    const weather = getWeather();
    if (weather && weather.condition === 'rain' && rng() < 0.3) {
      sys.lastEvent = 'rainy-day';
      return { ok: true, event: 'rainy-day', name: 'Rainy Day' };
    }
    if (rng() < 0.18) {
      const ev = BUTCHER_EVENTS[Math.floor(rng() * BUTCHER_EVENTS.length)];
      switch (ev.effect) {
        case 'cost-up': shiftDrift(0.15); break;
        case 'cost-down': shiftDrift(-0.1); break;
        case 'sell-up': shiftDrift(0.2); break;
        case 'xp': grantXp(25); break;
        case 'orders-up': grantXp(10); break;
        case 'heat': addHeat(1); sys.heatTaken += 1; break;
        case 'spoil': {
          const stocked = MEAT_CUTS.filter((cut) => onHand(cut.id) > 0);
          if (stocked.length > 0) {
            const pick = stocked[Math.floor(rng() * stocked.length)];
            const lost = Math.min(2, onHand(pick.id));
            pullStock(pick.id, lost);
            sys.spoiled += lost;
            log('Wasted ' + lost + ' cuts of ' + pick.name + '.');
          }
          break;
        }
        default: break;
      }
      sys.lastEvent = ev.id;
      return { ok: true, event: ev.id, name: ev.name };
    }
    sys.lastEvent = 'none';
    return { ok: true, event: 'none', name: 'No event' };
  };

  sys.tasteTest = function (id) {
    const cut = butcherItemById(id);
    if (!cut) return { ok: false, reason: 'unknown-item' };
    if (onHand(id) <= 0) return { ok: false, reason: 'no-stock' };
    const raw = 0.5 + rng() * 0.5 + sys.rank * 0.02 + cut.difficulty * 0.01;
    const quality = Math.round(Math.min(1, raw) * 100) / 100;
    grantXp(5);
    const grade = quality >= 0.9 ? 'outstanding' : quality >= 0.7 ? 'solid' : 'needs work';
    return { ok: true, item: id, quality, verdict: grade + ' — says Butcher Gus' };
  };

  sys.tick = function (dt) {
    sys.cooldown = Math.max(0, sys.cooldown - dt);
  };

  sys.tickDay = function (day) {
    if (day === sys.lastDay) return;
    sys.lastDay = day;
    for (let i = 0; i < MEAT_CUTS.length; i++) {
      const drifted = sys.dayDrift[MEAT_CUTS[i].id] + (rng() - 0.5) * 0.1;
      sys.dayDrift[MEAT_CUTS[i].id] = Math.max(-0.5, Math.min(0.6, drifted));
    }
    sys.dailySold = 0;
    sys.dailyEarned = 0;
    if (sys.activeOrder && day > sys.activeOrder.deadline && sys.orderProgress < sys.activeOrder.qty) {
      sys.activeOrder = null;
      sys.orderProgress = 0;
      sys.ordersFailed += 1;
      log('An order expired undelivered.');
    }
    sys.dailyEvent();
  };

  sys.serialize = function () {
    const copy = {};
    for (let i = 0; i < BUTCHER_STATE_KEYS.length; i++) {
      copy[BUTCHER_STATE_KEYS[i]] = JSON.parse(JSON.stringify(sys[BUTCHER_STATE_KEYS[i]]));
    }
    return copy;
  };

  sys.deserialize = function (saved) {
    if (!saved || typeof saved !== 'object') return;
    for (let i = 0; i < BUTCHER_STATE_KEYS.length; i++) {
      const key = BUTCHER_STATE_KEYS[i];
      if (key in saved) sys[key] = JSON.parse(JSON.stringify(saved[key]));
    }
    for (let i = 0; i < MEAT_CUTS.length; i++) {
      if (typeof sys.inventory[MEAT_CUTS[i].id] !== 'number') sys.inventory[MEAT_CUTS[i].id] = 0;
      if (typeof sys.premium[MEAT_CUTS[i].id] !== 'number') sys.premium[MEAT_CUTS[i].id] = 0;
      if (typeof sys.dayDrift[MEAT_CUTS[i].id] !== 'number') sys.dayDrift[MEAT_CUTS[i].id] = 0;
    }
    checkRank();
  };

  sys.stats = function () {
    const stock = stockCount();
    const eff = sys.produced + sys.spoiled === 0
      ? 100
      : Math.round((sys.produced / (sys.produced + sys.spoiled)) * 100);
    return {
      rank: BUTCHER_RANKS[sys.rank].name,
      xp: sys.xp,
      batches: sys.batches,
      produced: sys.produced,
      sold: sys.sold,
      earned: Math.round(sys.earned),
      spent: sys.spent,
      spoiled: sys.spoiled,
      aged: sys.aged,
      ordersDone: sys.ordersDone,
      ordersFailed: sys.ordersFailed,
      streak: sys.streak,
      bestStreak: sys.bestStreak,
      bestBatch: sys.bestBatch,
      stock,
      stockCap: butcherStockCap(sys.upgrades),
      upgrades: sys.upgrades.length,
      activeOrder: sys.activeOrder ? sys.activeOrder.id : null,
      orderProgress: sys.orderProgress,
      cooldown: Math.round(sys.cooldown * 10) / 10,
      dailyEarned: Math.round(sys.dailyEarned),
      heatTaken: sys.heatTaken,
      eventsSeen: sys.eventsSeen,
      lastEvent: sys.lastEvent,
      perfectBatches: sys.perfectBatches,
      efficiency: eff,
    };
  };

  sys.hudLine = function () {
    if (sys.cooldown > 0) return 'Butcher — cutting, ' + Math.ceil(sys.cooldown) + 's left';
    if (sys.activeOrder) return 'Order: ' + sys.activeOrder.name + ' ' + sys.orderProgress + '/' + sys.activeOrder.qty;
    const stock = stockCount();
    if (stock > 0) return 'Butcher — ' + stock + ' cuts in stock';
    return '';
  };

  sys.interact = function () {
    const pos = getPlayerPos();
    if (Math.hypot(pos.x - 140, pos.z - 60) > 25) return false;
    for (let i = 0; i < MEAT_CUTS.length; i++) {
      if (onHand(MEAT_CUTS[i].id) > 0) {
        sys.sell(MEAT_CUTS[i].id, 1);
        return true;
      }
    }
    const cheap = butcherCheapest(sys.dayDrift, sys.rank, sys.upgrades);
    return sys.cut(cheap.id, 1);
  };
}

// ---- extras factory ----

export function createButcherExtras(system) {
  const hired = [];
  const claimed = [];
  let wagesPaid = 0;
  let donated = 0;
  let rep = 0;

  function readStat(field) {
    if (field === 'upgradesCount') return system.upgrades.length;
    return system[field] || 0;
  }

  const extras = {};

  extras.hireHelper = function (id) {
    const helper = BUTCHER_HELPERS.find((h) => h.id === id);
    if (!helper) return { ok: false, reason: 'unknown-helper' };
    for (let i = 0; i < hired.length; i++) {
      if (hired[i].id === id) return { ok: false, reason: 'already-hired' };
    }
    hired.push(helper);
    return { ok: true, id: helper.id, name: helper.name, wage: helper.wage };
  };

  extras.fireHelper = function (id) {
    for (let i = 0; i < hired.length; i++) {
      if (hired[i].id === id) {
        hired.splice(i, 1);
        return { ok: true, id };
      }
    }
    return { ok: false, reason: 'not-hired' };
  };

  extras.payWages = function () {
    let due = 0;
    for (let i = 0; i < hired.length; i++) due += hired[i].wage;
    wagesPaid += due;
    return { ok: true, due, helpers: hired.map((h) => ({ ...h })), wagesPaid };
  };

  extras.helperBonus = function (skill) {
    let sum = 0;
    for (let i = 0; i < hired.length; i++) {
      if (hired[i].skill === skill) sum += hired[i].bonus;
    }
    return sum;
  };

  extras.challenges = function () {
    const rows = [];
    for (let i = 0; i < BUTCHER_CHALLENGES.length; i++) {
      const ch = BUTCHER_CHALLENGES[i];
      const value = Math.floor(readStat(ch.target));
      rows.push({ id: ch.id, name: ch.name, value, goal: ch.goal, done: value >= ch.goal });
    }
    return rows;
  };

  extras.claimChallenge = function (id) {
    const ch = BUTCHER_CHALLENGES.find((c) => c.id === id);
    if (!ch) return { ok: false, reason: 'unknown-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const value = Math.floor(readStat(ch.target));
    if (value < ch.goal) return { ok: false, reason: 'not-done', value, goal: ch.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  };

  extras.achievements = function () {
    const rows = [];
    for (let i = 0; i < BUTCHER_ACHIEVEMENTS.length; i++) {
      const ach = BUTCHER_ACHIEVEMENTS[i];
      const done = ach.check === 'spoiled'
        ? system.batches >= 50 && system.spoiled === 0
        : readStat(ach.check) >= ach.goal;
      rows.push({ id: ach.id, name: ach.name, desc: ach.desc, done });
    }
    return rows;
  };

  extras.donate = function (id, qty) {
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
    return { ok: true, quantity: qty, reputation: rep, note: 'Butcher Gus thanks you for the donation.' };
  };

  extras.clearStale = function () {
    let cleared = 0;
    for (let i = 0; i < MEAT_CUTS.length; i++) {
      const cut = MEAT_CUTS[i];
      if (cut.difficulty <= 1) {
        cleared += system.inventory[cut.id];
        system.inventory[cut.id] = 0;
      }
    }
    return { ok: true, cleared };
  };

  extras.stockReport = function () {
    let stock = 0;
    let premium = 0;
    for (let i = 0; i < MEAT_CUTS.length; i++) {
      stock += system.inventory[MEAT_CUTS[i].id];
      premium += system.premium[MEAT_CUTS[i].id];
    }
    const cap = butcherStockCap(system.upgrades);
    return { ok: true, stock, premium, cap, free: cap - stock - premium };
  };

  Object.defineProperty(extras, 'helpers', { get: function () { return hired.map((h) => ({ ...h })); } });
  Object.defineProperty(extras, 'claimed', { get: function () { return [...claimed]; } });
  Object.defineProperty(extras, 'wagesPaid', { get: function () { return wagesPaid; } });
  Object.defineProperty(extras, 'donated', { get: function () { return donated; } });
  Object.defineProperty(extras, 'rep', { get: function () { return rep; } });

  return extras;
}
