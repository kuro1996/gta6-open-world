// Vineyard — Vintner Elena harvests ten varietals, ages crates in the
// cellar and sells bottles to cellars, restaurants and weddings. Pure
// logic, no rendering, no imports. The game wires this file through the
// standard context with safe defaults.

export const WINE_VARIETALS = [
  { id: 'cabernet-sauvignon', name: 'Cabernet Sauvignon', basePrice: 52, time: 5, difficulty: 4, grape: 'cabernet', region: 'north slope', vintage: 2021, desc: 'A bold cabernet from the north slope, dark fruit and cedar.' },
  { id: 'merlot', name: 'Merlot', basePrice: 44, time: 4, difficulty: 3, grape: 'merlot', region: 'south slope', vintage: 2022, desc: 'A soft merlot from the south slope, plum and velvet.' },
  { id: 'pinot-noir', name: 'Pinot Noir', basePrice: 58, time: 5, difficulty: 5, grape: 'pinot noir', region: 'east terrace', vintage: 2020, desc: 'A delicate pinot from the east terrace, the cellar jewel.' },
  { id: 'chardonnay', name: 'Chardonnay', basePrice: 46, time: 4, difficulty: 3, grape: 'chardonnay', region: 'river flat', vintage: 2022, desc: 'A golden chardonnay from the river flat, butter and oak.' },
  { id: 'sauvignon-blanc', name: 'Sauvignon Blanc', basePrice: 38, time: 3, difficulty: 2, grape: 'sauvignon blanc', region: 'hilltop', vintage: 2023, desc: 'A crisp sauvignon blanc from the hilltop, grass and citrus.' },
  { id: 'syrah', name: 'Syrah', basePrice: 50, time: 5, difficulty: 4, grape: 'syrah', region: 'west ridge', vintage: 2021, desc: 'A spicy syrah from the west ridge, pepper and blackberry.' },
  { id: 'riesling', name: 'Riesling', basePrice: 40, time: 3, difficulty: 2, grape: 'riesling', region: 'cool valley', vintage: 2023, desc: 'A bright riesling from the cool valley, lime and stone.' },
  { id: 'rose', name: 'Rosé', basePrice: 32, time: 3, difficulty: 1, grape: 'grenache', region: 'sunny field', vintage: 2024, desc: 'A pale rosé from the sunny field, strawberry and summer.' },
  { id: 'prosecco', name: 'Prosecco', basePrice: 36, time: 3, difficulty: 2, grape: 'glera', region: 'valley floor', vintage: 2024, desc: 'A lively prosecco from the valley floor, bubbles and green apple.' },
  { id: 'zinfandel', name: 'Zinfandel', basePrice: 48, time: 4, difficulty: 3, grape: 'zinfandel', region: 'old vines', vintage: 2021, desc: 'A jammy zinfandel from the old vines, bramble and spice.' },
];

export const VINEYARD_UPGRADES = [
  { id: 'oak-barrels', name: 'Oak Barrels', cost: 150, desc: 'Seasoned oak barrels that deepen every aged crate.', effect: 'brew-fast' },
  { id: 'pruning-shears', name: 'Pruning Shears', cost: 180, desc: 'Sharp shears that keep the vines cheap to tend.', effect: 'cost-down' },
  { id: 'irrigation', name: 'Irrigation', cost: 240, desc: 'Drip irrigation that never lets a vintage spoil.', effect: 'spoil-down' },
  { id: 'tasting-room', name: 'Tasting Room', cost: 320, desc: 'A warm tasting room where bottles fetch a better price.', effect: 'sell-plus' },
  { id: 'wine-cellar', name: 'Wine Cellar', cost: 280, desc: 'A deep cellar that doubles your stock room.', effect: 'stock-plus' },
  { id: 'cork-press', name: 'Cork Press', cost: 360, desc: 'A fine press for corking and finishing crates.', effect: 'age-plus' },
  { id: 'delivery-cart', name: 'Delivery Cart', cost: 500, desc: 'A sturdy cart for hauling bulk orders to the cellars.', effect: 'bulk' },
  { id: 'master-press', name: 'Master Press', cost: 820, desc: 'The master press, coaxing top coin from the finest bottles.', effect: 'strong-plus' },
];

export const VINEYARD_ORDERS = [
  { id: 'cellar-12', name: 'Cellar Dozen', item: 'cabernet-sauvignon', qty: 12, pay: 620, days: 2, minRank: 0, desc: 'The cellar wants a dozen cabernets for the winter list.' },
  { id: 'wedding-rose', name: 'Wedding Rosé', item: 'rose', qty: 10, pay: 420, days: 1, minRank: 2, desc: 'Ten rosés for a wedding toast at sunset.' },
  { id: 'restaurant-pinot', name: 'Restaurant Pinot', item: 'pinot-noir', qty: 8, pay: 560, days: 2, minRank: 4, desc: 'Eight pinots for the restaurant reserve list, no substitutes.' },
  { id: 'party-prosecco', name: 'Party Prosecco', item: 'prosecco', qty: 15, pay: 420, days: 1, minRank: 2, desc: 'Fifteen proseccos for a party night.' },
  { id: 'chardonnay-lunch', name: 'Chardonnay Lunch', item: 'chardonnay', qty: 12, pay: 480, days: 1, minRank: 0, desc: 'Twelve chardonnays for the lunch terrace.' },
  { id: 'syrah-night', name: 'Syrah Night', item: 'syrah', qty: 8, pay: 480, days: 2, minRank: 3, desc: 'Eight syrahs for the tasting night.' },
  { id: 'riesling-run', name: 'Riesling Run', item: 'riesling', qty: 14, pay: 420, days: 1, minRank: 2, desc: 'Fourteen rieslings for the summer fair.' },
  { id: 'mixed-crates', name: 'Mixed Crates', item: 'mixed', qty: 20, pay: 620, days: 2, minRank: 3, desc: 'Twenty crates of anything, for a cellar restock.' },
];

export const VINEYARD_EVENTS = [
  { id: 'grape-shortage', name: 'Grape Shortage', text: 'Grapes are scarce this week and prices climb.', effect: 'cost-up' },
  { id: 'harvest-festival', name: 'Harvest Festival', text: 'The harvest festival crowd is thirsty and paying well.', effect: 'sell-up' },
  { id: 'vine-inspection', name: 'Vine Inspection', text: 'An inspector is walking the vines today.', effect: 'heat' },
  { id: 'good-rain', name: 'Good Rain', text: 'Good rain fell and the vines are cheap to tend.', effect: 'cost-down' },
  { id: 'bad-vintage', name: 'Bad Vintage', text: 'A bad vintage spoiled some crates.', effect: 'spoil' },
  { id: 'wine-fair', name: 'Wine Fair', text: 'The wine fair wants bottles, fast.', effect: 'orders-up' },
  { id: 'frost-night', name: 'Frost Night', text: 'A frost night nipped the vines and ruined some crates.', effect: 'spoil' },
  { id: 'warm-spell', name: 'Warm Spell', text: 'Warm evenings have everyone drinking outside.', effect: 'sell-up' },
  { id: 'cellar-flood', name: 'Cellar Flood', text: 'A leak flooded the cellar and ruined some crates.', effect: 'spoil' },
  { id: 'wine-critic', name: 'Wine Critic', text: 'A travelling critic shares hard-won wisdom.', effect: 'xp' },
];

export const VINEYARD_RANKS = [
  { level: 0, name: 'Vine Hand', xp: 0, perk: 'Learning the vines.' },
  { level: 1, name: 'Picker', xp: 120, perk: 'Steadier hands, better prices.' },
  { level: 2, name: 'Cellar Master', xp: 300, perk: 'The town knows your name.' },
  { level: 3, name: 'Vintner', xp: 620, perk: 'Cellars bid for your bottles.' },
  { level: 4, name: 'Legend of the Vine', xp: 1100, perk: 'Your wines are sung about in song.' },
];

export const VINEYARD_HELPERS = [
  { id: 'picker', name: 'Theo', wage: 25, skill: 'haul', bonus: 0.2, desc: 'Theo the picker hauls grape baskets all day.' },
  { id: 'cellar-keeper', name: 'Ana', wage: 40, skill: 'age', bonus: 0.25, desc: 'Ana keeps the cellar cool and the crates honest.' },
  { id: 'cart-runner', name: 'Rosa', wage: 60, skill: 'sell', bonus: 0.15, desc: 'Rosa runs crates to the cellars and charms the buyers.' },
  { id: 'vine-master', name: 'Old Marco', wage: 80, skill: 'brew', bonus: 0.3, desc: 'Old Marco prunes vines that yield like magic.' },
];

export const VINEYARD_CHALLENGES = [
  { id: 'crates-100', name: 'A Hundred Crates', target: 'produced', goal: 100, xp: 80, desc: 'Harvest a hundred crates in total.' },
  { id: 'sell-500', name: 'Five Hundred Sold', target: 'earned', goal: 500, xp: 120, desc: 'Earn five hundred from sales.' },
  { id: 'age-20', name: 'Age Twenty', target: 'aged', goal: 20, xp: 100, desc: 'Age twenty crates in the cellar.' },
  { id: 'orders-10', name: 'Ten Orders Done', target: 'ordersDone', goal: 10, xp: 140, desc: 'Complete ten cellar orders.' },
  { id: 'streak-10', name: 'Ten Clean Batches', target: 'bestStreak', goal: 10, xp: 110, desc: 'Reach a ten-batch clean streak.' },
  { id: 'rank-3', name: 'Vintner', target: 'rank', goal: 3, xp: 150, desc: 'Reach rank three.' },
  { id: 'earn-2000', name: 'Two Thousand Earned', target: 'earned', goal: 2000, xp: 160, desc: 'Earn two thousand in total.' },
  { id: 'batches-50', name: 'Fifty Batches', target: 'batches', goal: 50, xp: 90, desc: 'Harvest fifty batches.' },
];

export const VINEYARD_ACHIEVEMENTS = [
  { id: 'first-harvest', name: 'First Harvest', check: 'batches', goal: 1, desc: 'Harvest your very first batch.' },
  { id: 'first-sale', name: 'First Sale', check: 'sold', goal: 1, desc: 'Sell your first bottle.' },
  { id: 'first-age', name: 'First Age', check: 'aged', goal: 1, desc: 'Age your first crate.' },
  { id: 'rank-2', name: 'Cellar Master Rank', check: 'rank', goal: 2, desc: 'Reach the Cellar Master rank.' },
  { id: 'rich-wine', name: 'Rich Wine', check: 'earned', goal: 2000, desc: 'Earn two thousand in total.' },
  { id: 'full-kit', name: 'Full Kit', check: 'upgradesCount', goal: 8, desc: 'Own every vineyard upgrade.' },
  { id: 'no-spoil', name: 'No Spoil', check: 'spoiled', goal: 0, desc: 'Harvest fifty batches without spoiling a single crate.' },
  { id: 'big-crate', name: 'Big Crate', check: 'bestBatch', goal: 20, desc: 'Harvest a batch of twenty crates.' },
];

export const VINEYARD_TIPS = [
  { id: 'age-it', name: 'Age It', text: 'Age everything you can afford; cellar crates pay far better.' },
  { id: 'pinot-money', name: 'Pinot Money', text: 'Pinot noir is slow but it is the best coin per bottle.' },
  { id: 'vine-care', name: 'Vine Care', text: 'Mind your vines and your irrigation, or vintages spoil.' },
  { id: 'fair-stock', name: 'Fair Stock', text: 'Stock up before the wine fair; thirsty crowds pay double.' },
  { id: 'irrigation-watch', name: 'Irrigation Watch', text: 'Watch the water, or the morning harvest suffers.' },
  { id: 'order-first', name: 'Order First', text: 'Take the cellar order first, then harvest exactly for it.' },
  { id: 'rose-summer', name: 'Rosé Summer', text: 'Rosé sells itself on a summer afternoon.' },
  { id: 'cellar-space', name: 'Cellar Space', text: 'Watch your stock cap; a cellar buys you forty more slots.' },
];

export const VINEYARD_RECORDS = [
  { id: 'biggest-crate', name: 'Biggest Crate', stat: 'bestBatch', unit: 'bottles', desc: 'Largest single batch ever harvested.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'dollars', desc: 'Most coin earned in total.' },
  { id: 'most-harvested', name: 'Most Harvested', stat: 'produced', unit: 'crates', desc: 'Most crates harvested in total.' },
  { id: 'most-aged', name: 'Most Aged', stat: 'aged', unit: 'crates', desc: 'Most crates aged in the cellar.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'crates', desc: 'Longest clean harvesting streak.' },
];

export const VINEYARD_MARKET_EVENTS = [
  { id: 'pinot-boom', name: 'Pinot Boom', items: ['pinot-noir'], mult: 1.4, desc: 'Everyone wants pinot noir this week.' },
  { id: 'rose-glut', name: 'Rosé Glut', items: ['rose', 'prosecco'], mult: 0.6, desc: 'Too much rosé on the market, prices sag.' },
  { id: 'cabernet-rush', name: 'Cabernet Rush', items: ['cabernet-sauvignon'], mult: 1.5, desc: 'Cabernet is the talk of the town.' },
  { id: 'chardonnay-season', name: 'Chardonnay Season', items: ['chardonnay'], mult: 1.3, desc: 'Chardonnay season lifts the whole vineyard.' },
  { id: 'syrah-morning', name: 'Syrah Morning', items: ['syrah'], mult: 1.35, desc: 'Syrah mornings are booming.' },
  { id: 'riesling-night', name: 'Riesling Night', items: ['riesling'], mult: 1.3, desc: 'The restaurants all want riesling tonight.' },
  { id: 'merlot-trend', name: 'Merlot Trend', items: ['merlot'], mult: 1.25, desc: 'Merlot is suddenly fashionable.' },
  { id: 'zinfandel-summer', name: 'Zinfandel Summer', items: ['zinfandel'], mult: 1.3, desc: 'Summer evenings call for zinfandel.' },
  { id: 'sauvignon-week', name: 'Sauvignon Week', items: ['sauvignon-blanc'], mult: 1.2, desc: 'Sauvignon blanc is in demand.' },
  { id: 'wine-tax', name: 'Wine Tax', items: ['pinot-noir', 'cabernet-sauvignon'], mult: 0.7, desc: 'A new tax bites the fine wines hardest.' },
  { id: 'dry-week', name: 'Dry Week', items: ['rose', 'prosecco'], mult: 0.75, desc: 'A dry spell cools the everyday bottles.' },
  { id: 'harvest-festival', name: 'Harvest Festival', items: ['cabernet-sauvignon', 'merlot', 'chardonnay'], mult: 1.2, desc: 'The harvest festival lifts every vineyard favourite.' },
];

export const VINEYARD_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Spring crowds return to the tasting room.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Steady summer thirst.' },
  { id: 'autumn', name: 'Autumn', mult: 1.1, desc: 'Harvest season brings the festivals.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold winter nights thin the crowds.' },
];

export const VINEYARD_LEADERBOARD = [
  { name: 'Elena', total: 4300, desc: 'Vintner Elena still leads the board.' },
  { name: 'Marco', total: 2900, desc: 'Old Marco and his magic vines.' },
  { name: 'You', total: 0, desc: 'Your running total.' },
  { name: 'Theo', total: 1600, desc: 'The picker is climbing fast.' },
  { name: 'Ana', total: 2400, desc: 'Ana and her honest cellar.' },
];

export const VINEYARD_QUICK_START = [
  'Harvest rosé first, it is quick and always sells.',
  'Age everything affordable, cellar crates pay far better.',
  'Buy irrigation before the master press, spoiled vintages hurt.',
  'Take cellar orders then harvest for them, never the other way round.',
  'Sell the young wine by noon, while the buyers are out.',
  'Check the price board every morning before you harvest.',
];

export const VINEYARD_META = {
  system: 'vineyard',
  version: '7b-C',
  author: 'builder-3',
  label: 'Vineyard',
  owner: 'Vintner Elena the Grower',
  itemCount: 10,
};

// ---- module helpers ----

export function vineyardRankFor(xp) {
  let rank = 0;
  let i = 0;
  while (i < VINEYARD_RANKS.length) {
    if (xp >= VINEYARD_RANKS[i].xp) rank = i;
    i++;
  }
  return rank;
}

function vineyardEffectSet(owned) {
  const fx = new Set();
  const list = owned || [];
  let i = 0;
  while (i < list.length) {
    const up = VINEYARD_UPGRADES.find((u) => u.id === list[i]);
    if (up) fx.add(up.effect);
    i++;
  }
  return fx;
}

export function vineyardItemById(id) {
  let i = 0;
  while (i < WINE_VARIETALS.length) {
    if (WINE_VARIETALS[i].id === id) return WINE_VARIETALS[i];
    i++;
  }
  return null;
}

export function vineyardPriceFor(id, drift, rank, upgrades) {
  const wine = vineyardItemById(id);
  if (!wine) return 0;
  const fx = vineyardEffectSet(upgrades);
  const d = drift && typeof drift[id] === 'number' ? drift[id] : 0;
  let price = wine.basePrice * (1 + d) * (1 + 0.1 * rank);
  if (wine.difficulty >= 3 && fx.has('strong-plus')) price *= 1.3;
  if (fx.has('sell-plus')) price *= 1.15;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function vineyardSellPriceFor(id, premium, drift, rank, upgrades) {
  const regular = vineyardPriceFor(id, drift, rank, upgrades);
  if (regular === 0) return 0;
  return Math.max(1, Math.round((premium ? regular * 1.5 : regular) * 10) / 10);
}

export function vineyardCostFor(id, qty, upgrades) {
  const wine = vineyardItemById(id);
  if (!wine) return 0;
  const raw = Math.round(wine.basePrice * 0.4 * qty);
  return Math.max(1, vineyardEffectSet(upgrades).has('cost-down') ? Math.round(raw * 0.8) : raw);
}

export function vineyardStockCap(upgrades) {
  return vineyardEffectSet(upgrades).has('stock-plus') ? 80 : 40;
}

export function vineyardSpoilChance(item, upgrades) {
  const chance = 0.04 + item.difficulty * 0.015;
  return vineyardEffectSet(upgrades).has('spoil-down') ? chance / 2 : chance;
}

export function vineyardBestSeller(drift, rank, upgrades) {
  let best = null;
  let i = 0;
  while (i < WINE_VARIETALS.length) {
    const price = vineyardPriceFor(WINE_VARIETALS[i].id, drift, rank, upgrades);
    if (best === null || price > best.price) best = { id: WINE_VARIETALS[i].id, price };
    i++;
  }
  return best;
}

export function vineyardCheapest(drift, rank, upgrades) {
  let low = null;
  let i = 0;
  while (i < WINE_VARIETALS.length) {
    const price = vineyardPriceFor(WINE_VARIETALS[i].id, drift, rank, upgrades);
    if (low === null || price < low.price) low = { id: WINE_VARIETALS[i].id, price };
    i++;
  }
  return low;
}

export function vineyardTipFor(day) {
  const n = VINEYARD_TIPS.length;
  return VINEYARD_TIPS[((day % n) + n) % n];
}

export function vineyardLeaderboardWith(playerTotal) {
  const rows = VINEYARD_LEADERBOARD.map((row) => ({
    name: row.name,
    total: row.name === 'You' ? playerTotal : row.total,
    desc: row.desc,
  }));
  rows.sort((a, b) => b.total - a.total);
  const out = [];
  let i = 0;
  while (i < rows.length) {
    out.push({ rank: i + 1, name: rows[i].name, total: rows[i].total, desc: rows[i].desc });
    i++;
  }
  return out;
}

// ---- system: constructor + prototype ----

const VINEYARD_STATE_KEYS = [
  'xp', 'rank', 'batches', 'produced', 'sold', 'earned', 'spent', 'spoiled', 'aged',
  'ordersDone', 'ordersFailed', 'streak', 'bestStreak', 'bestBatch', 'inventory', 'premium',
  'upgrades', 'activeOrder', 'orderProgress', 'cooldown', 'dayDrift', 'lastDay', 'dailySold',
  'dailyEarned', 'heatTaken', 'eventsSeen', 'lastEvent', 'perfectBatches',
];

function VineyardSystem(wire) {
  this.name = 'vineyard';
  this._wire = wire;
  this.xp = 0;
  this.rank = 0;
  this.batches = 0;
  this.produced = 0;
  this.sold = 0;
  this.earned = 0;
  this.spent = 0;
  this.spoiled = 0;
  this.aged = 0;
  this.ordersDone = 0;
  this.ordersFailed = 0;
  this.streak = 0;
  this.bestStreak = 0;
  this.bestBatch = 0;
  this.inventory = {};
  this.premium = {};
  this.upgrades = [];
  this.activeOrder = null;
  this.orderProgress = 0;
  this.cooldown = 0;
  this.dayDrift = {};
  this.lastDay = 1;
  this.dailySold = 0;
  this.dailyEarned = 0;
  this.heatTaken = 0;
  this.eventsSeen = 0;
  this.lastEvent = 'none';
  this.perfectBatches = 0;
  let i = 0;
  while (i < WINE_VARIETALS.length) {
    this.inventory[WINE_VARIETALS[i].id] = 0;
    this.premium[WINE_VARIETALS[i].id] = 0;
    this.dayDrift[WINE_VARIETALS[i].id] = 0;
    i++;
  }
}

VineyardSystem.prototype._rankUp = function () {
  const next = vineyardRankFor(this.xp);
  if (next > this.rank) {
    this.rank = next;
    this._wire.log('Rank up! You are now ' + VINEYARD_RANKS[next].name + '.');
  }
};

VineyardSystem.prototype._gainXp = function (n) {
  this.xp += n;
  this._rankUp();
};

VineyardSystem.prototype._stockTotal = function () {
  let total = 0;
  let i = 0;
  while (i < WINE_VARIETALS.length) {
    total += this.inventory[WINE_VARIETALS[i].id] + this.premium[WINE_VARIETALS[i].id];
    i++;
  }
  return total;
};

VineyardSystem.prototype._onHand = function (id) {
  return this.inventory[id] + this.premium[id];
};

VineyardSystem.prototype._take = function (id, qty) {
  let rest = qty;
  const reg = Math.min(this.inventory[id], rest);
  this.inventory[id] -= reg;
  rest -= reg;
  if (rest > 0) this.premium[id] -= rest;
};

VineyardSystem.prototype._shiftDrift = function (amount) {
  let i = 0;
  while (i < WINE_VARIETALS.length) {
    this.dayDrift[WINE_VARIETALS[i].id] += amount;
    i++;
  }
};

VineyardSystem.prototype._spoilOne = function () {
  const stocked = WINE_VARIETALS.filter((w) => this._onHand(w.id) > 0);
  if (stocked.length === 0) return;
  const pick = stocked[Math.floor(this._wire.rng() * stocked.length)];
  const lost = Math.min(2, this._onHand(pick.id));
  this._take(pick.id, lost);
  this.spoiled += lost;
  this._wire.log('Spoiled ' + lost + ' crates of ' + pick.name + '.');
};

VineyardSystem.prototype.harvest = function (id, qty) {
  const amount = qty === undefined ? 1 : qty;
  const wine = vineyardItemById(id);
  if (!wine) return { ok: false, reason: 'unknown-item' };
  if (!amount || amount <= 0) return { ok: false, reason: 'bad-quantity' };
  if (this.cooldown > 0) return { ok: false, reason: 'cooldown' };
  const cost = vineyardCostFor(id, amount, this.upgrades);
  if (this._wire.getCash() < cost) return { ok: false, reason: 'not-enough-cash' };
  if (this._stockTotal() + amount > vineyardStockCap(this.upgrades)) return { ok: false, reason: 'stock-full' };
  this._wire.addCash(-cost);
  this.spent += cost;
  let made = amount;
  if (this._wire.rng() < vineyardSpoilChance(wine, this.upgrades)) {
    const lost = 1 + Math.floor(this._wire.rng() * Math.max(1, Math.floor(amount / 2)));
    made = Math.max(0, amount - lost);
    this.spoiled += lost;
    this.streak = 0;
    this._wire.log('A batch of ' + wine.name + ' spoiled, ' + lost + ' crates lost.');
  } else {
    this.streak += 1;
    if (this.streak > this.bestStreak) this.bestStreak = this.streak;
    if (wine.difficulty >= 4) this.perfectBatches += 1;
  }
  this.inventory[id] += made;
  this.batches += 1;
  this.produced += made;
  if (made > this.bestBatch) this.bestBatch = made;
  this.cooldown = vineyardEffectSet(this.upgrades).has('brew-fast')
    ? Math.max(1, Math.floor(wine.time * 0.8))
    : wine.time;
  this._gainXp(4 + made + wine.difficulty * 2);
  // The heat branch is guarded off in the vineyard: harvesting never
  // adds heat, not even for the difficulty five pinot noir.
  if (false && wine.difficulty >= 4 && this._wire.rng() < 0.15) {
    this._wire.addHeat(1);
    this.heatTaken += 1;
  }
  if (this.activeOrder) {
    const order = this.activeOrder;
    if (order.item === 'mixed' || order.item === id) this.orderProgress += made;
  }
  this._wire.log('Harvested ' + made + ' crates of ' + wine.name + '.');
  return { ok: true, item: id, made, cost, cooldown: this.cooldown };
};

VineyardSystem.prototype.ageWine = function (id, qty) {
  const amount = qty === undefined ? 1 : qty;
  const wine = vineyardItemById(id);
  if (!wine) return { ok: false, reason: 'unknown-item' };
  if (!amount || amount <= 0) return { ok: false, reason: 'bad-quantity' };
  if (this.inventory[id] < amount) return { ok: false, reason: 'not-enough-stock' };
  this.inventory[id] -= amount;
  this.premium[id] += amount;
  this.aged += amount;
  this._gainXp(6 + amount * 2);
  this._wire.log('Aged ' + amount + ' crates of ' + wine.name + ' in the cellar.');
  return { ok: true, item: id, quantity: amount, premium: this.premium[id] };
};

VineyardSystem.prototype.sell = function (id, qty) {
  const wine = vineyardItemById(id);
  if (!wine) return { ok: false, reason: 'unknown-item' };
  if (!qty || qty <= 0) return { ok: false, reason: 'bad-quantity' };
  if (this._onHand(id) < qty) return { ok: false, reason: 'not-enough-stock' };
  const premQty = Math.min(this.premium[id], qty);
  const regQty = qty - premQty;
  const total = Math.round((premQty * vineyardSellPriceFor(id, true, this.dayDrift, this.rank, this.upgrades)
    + regQty * vineyardSellPriceFor(id, false, this.dayDrift, this.rank, this.upgrades)) * 10) / 10;
  this.premium[id] -= premQty;
  this.inventory[id] -= regQty;
  this.sold += qty;
  this.earned += total;
  this.dailySold += qty;
  this.dailyEarned += total;
  this._wire.addCash(total);
  this._gainXp(qty);
  return { ok: true, total, quantity: qty };
};

VineyardSystem.prototype.sellAll = function () {
  let total = 0;
  let units = 0;
  const lines = [];
  let i = 0;
  while (i < WINE_VARIETALS.length) {
    const wine = WINE_VARIETALS[i];
    const qty = this._onHand(wine.id);
    if (qty > 0) {
      const premQty = Math.min(this.premium[wine.id], qty);
      const regQty = qty - premQty;
      const lineTotal = Math.round((premQty * vineyardSellPriceFor(wine.id, true, this.dayDrift, this.rank, this.upgrades)
        + regQty * vineyardSellPriceFor(wine.id, false, this.dayDrift, this.rank, this.upgrades)) * 10) / 10;
      this.premium[wine.id] -= premQty;
      this.inventory[wine.id] -= regQty;
      total += lineTotal;
      units += qty;
      lines.push({ id: wine.id, quantity: qty, total: lineTotal });
    }
    i++;
  }
  if (units === 0) return { ok: false, reason: 'nothing-to-sell' };
  total = Math.round(total * 10) / 10;
  this.sold += units;
  this.earned += total;
  this.dailySold += units;
  this.dailyEarned += total;
  this._wire.addCash(total);
  this._gainXp(units);
  return { ok: true, total, units, lines };
};

VineyardSystem.prototype.buyUpgrade = function (id) {
  const up = VINEYARD_UPGRADES.find((u) => u.id === id);
  if (!up) return { ok: false, reason: 'unknown-upgrade' };
  if (this.upgrades.includes(id)) return { ok: false, reason: 'already-owned' };
  if (this._wire.getCash() < up.cost) return { ok: false, reason: 'not-enough-cash' };
  this._wire.addCash(-up.cost);
  this.spent += up.cost;
  this.upgrades.push(id);
  this._gainXp(20);
  this._wire.log('Bought the ' + up.name + ' upgrade.');
  return { ok: true, id };
};

VineyardSystem.prototype.takeOrder = function (id) {
  const order = VINEYARD_ORDERS.find((o) => o.id === id);
  if (!order) return { ok: false, reason: 'unknown-order' };
  if (this.activeOrder) return { ok: false, reason: 'order-active' };
  if (this.rank < order.minRank) return { ok: false, reason: 'rank-too-low' };
  const today = this._wire.getDay();
  this.activeOrder = { ...order, takenDay: today, deadline: today + order.days };
  this.orderProgress = 0;
  this._wire.log('Took the order: ' + order.name + '.');
  return { ok: true, order: this.activeOrder };
};

VineyardSystem.prototype.deliverOrder = function () {
  const order = this.activeOrder;
  if (!order) return { ok: false, reason: 'no-active-order' };
  if (order.item === 'mixed') {
    if (this._stockTotal() < order.qty) return { ok: false, reason: 'not-enough-stock' };
    let need = order.qty;
    let i = 0;
    while (need > 0 && i < WINE_VARIETALS.length) {
      const take = Math.min(this._onHand(WINE_VARIETALS[i].id), need);
      this._take(WINE_VARIETALS[i].id, take);
      need -= take;
      i++;
    }
  } else {
    if (this._onHand(order.item) < order.qty) return { ok: false, reason: 'not-enough-stock' };
    this._take(order.item, order.qty);
    this.orderProgress = order.qty;
  }
  const pay = order.pay + 40 * this.rank;
  this.activeOrder = null;
  this.orderProgress = 0;
  this.ordersDone += 1;
  this.earned += pay;
  this.dailyEarned += pay;
  this._wire.addCash(pay);
  this._gainXp(60);
  this._wire.log('Delivered ' + order.name + ' for ' + pay + '.');
  return { ok: true, pay };
};

VineyardSystem.prototype.abandonOrder = function () {
  if (!this.activeOrder) return { ok: false, reason: 'no-active-order' };
  this.activeOrder = null;
  this.orderProgress = 0;
  this.ordersFailed += 1;
  return { ok: true };
};

VineyardSystem.prototype.haggle = function () {
  if (this.rank < 1) return { ok: false, reason: 'rank-too-low' };
  const bonus = Math.round((0.05 + 0.03 * this.rank) * 100) / 100;
  const haggled = this._wire.rng() < 0.55;
  return { ok: true, haggled, bonus };
};

VineyardSystem.prototype.priceBoard = function () {
  const rows = [];
  let i = 0;
  while (i < WINE_VARIETALS.length) {
    const wine = WINE_VARIETALS[i];
    rows.push({
      id: wine.id,
      name: wine.name,
      price: vineyardPriceFor(wine.id, this.dayDrift, this.rank, this.upgrades),
      drift: this.dayDrift[wine.id],
      stock: this.inventory[wine.id],
      premium: this.premium[wine.id],
    });
    i++;
  }
  return rows;
};

VineyardSystem.prototype.orderList = function () {
  return VINEYARD_ORDERS.map((o) => ({
    id: o.id, name: o.name, item: o.item, quantity: o.qty, pay: o.pay, days: o.days, minRank: o.minRank,
  }));
};

VineyardSystem.prototype.dailyEvent = function () {
  this.eventsSeen += 1;
  const weather = this._wire.getWeather();
  if (weather && weather.condition === 'rain' && this._wire.rng() < 0.3) {
    this.lastEvent = 'rainy-day';
    return { ok: true, event: 'rainy-day', name: 'Rainy Day' };
  }
  if (this._wire.rng() < 0.18) {
    const ev = VINEYARD_EVENTS[Math.floor(this._wire.rng() * VINEYARD_EVENTS.length)];
    if (ev.effect === 'cost-up') this._shiftDrift(0.15);
    else if (ev.effect === 'cost-down') this._shiftDrift(-0.1);
    else if (ev.effect === 'sell-up') this._shiftDrift(0.2);
    else if (ev.effect === 'xp') this._gainXp(25);
    else if (ev.effect === 'orders-up') this._gainXp(10);
    else if (ev.effect === 'heat') { this._wire.addHeat(1); this.heatTaken += 1; }
    else if (ev.effect === 'spoil') this._spoilOne();
    this.lastEvent = ev.id;
    return { ok: true, event: ev.id, name: ev.name };
  }
  this.lastEvent = 'none';
  return { ok: true, event: 'none', name: 'No event' };
};

VineyardSystem.prototype.tasteTest = function (id) {
  const wine = vineyardItemById(id);
  if (!wine) return { ok: false, reason: 'unknown-item' };
  if (this._onHand(id) <= 0) return { ok: false, reason: 'no-stock' };
  const raw = 0.5 + this._wire.rng() * 0.5 + this.rank * 0.02 + wine.difficulty * 0.01;
  const quality = Math.round(Math.min(1, raw) * 100) / 100;
  this._gainXp(5);
  const grade = quality >= 0.9 ? 'outstanding' : quality >= 0.7 ? 'solid' : 'needs work';
  return { ok: true, item: id, quality, verdict: grade + ' — says Vintner Elena' };
};

VineyardSystem.prototype.tick = function (dt) {
  this.cooldown = Math.max(0, this.cooldown - dt);
};

VineyardSystem.prototype.tickDay = function (day) {
  if (day === this.lastDay) return;
  this.lastDay = day;
  let i = 0;
  while (i < WINE_VARIETALS.length) {
    const drifted = this.dayDrift[WINE_VARIETALS[i].id] + (this._wire.rng() - 0.5) * 0.1;
    this.dayDrift[WINE_VARIETALS[i].id] = Math.max(-0.5, Math.min(0.6, drifted));
    i++;
  }
  this.dailySold = 0;
  this.dailyEarned = 0;
  if (this.activeOrder && day > this.activeOrder.deadline && this.orderProgress < this.activeOrder.qty) {
    this.activeOrder = null;
    this.orderProgress = 0;
    this.ordersFailed += 1;
    this._wire.log('An order expired undelivered.');
  }
  this.dailyEvent();
};

VineyardSystem.prototype.serialize = function () {
  const copy = {};
  let i = 0;
  while (i < VINEYARD_STATE_KEYS.length) {
    copy[VINEYARD_STATE_KEYS[i]] = JSON.parse(JSON.stringify(this[VINEYARD_STATE_KEYS[i]]));
    i++;
  }
  return copy;
};

VineyardSystem.prototype.deserialize = function (saved) {
  if (!saved || typeof saved !== 'object') return;
  let i = 0;
  while (i < VINEYARD_STATE_KEYS.length) {
    const key = VINEYARD_STATE_KEYS[i];
    if (key in saved) this[key] = JSON.parse(JSON.stringify(saved[key]));
    i++;
  }
  let j = 0;
  while (j < WINE_VARIETALS.length) {
    if (typeof this.inventory[WINE_VARIETALS[j].id] !== 'number') this.inventory[WINE_VARIETALS[j].id] = 0;
    if (typeof this.premium[WINE_VARIETALS[j].id] !== 'number') this.premium[WINE_VARIETALS[j].id] = 0;
    if (typeof this.dayDrift[WINE_VARIETALS[j].id] !== 'number') this.dayDrift[WINE_VARIETALS[j].id] = 0;
    j++;
  }
  this._rankUp();
};

VineyardSystem.prototype.stats = function () {
  const stock = this._stockTotal();
  const eff = this.produced + this.spoiled === 0
    ? 100
    : Math.round((this.produced / (this.produced + this.spoiled)) * 100);
  return {
    rank: VINEYARD_RANKS[this.rank].name,
    xp: this.xp,
    batches: this.batches,
    produced: this.produced,
    sold: this.sold,
    earned: Math.round(this.earned),
    spent: this.spent,
    spoiled: this.spoiled,
    aged: this.aged,
    ordersDone: this.ordersDone,
    ordersFailed: this.ordersFailed,
    streak: this.streak,
    bestStreak: this.bestStreak,
    bestBatch: this.bestBatch,
    stock,
    stockCap: vineyardStockCap(this.upgrades),
    upgrades: this.upgrades.length,
    activeOrder: this.activeOrder ? this.activeOrder.id : null,
    orderProgress: this.orderProgress,
    cooldown: Math.round(this.cooldown * 10) / 10,
    dailyEarned: Math.round(this.dailyEarned),
    heatTaken: this.heatTaken,
    eventsSeen: this.eventsSeen,
    lastEvent: this.lastEvent,
    perfectBatches: this.perfectBatches,
    efficiency: eff,
  };
};

VineyardSystem.prototype.hudLine = function () {
  if (this.cooldown > 0) return 'Vineyard — harvesting, ' + Math.ceil(this.cooldown) + 's left';
  if (this.activeOrder) return 'Order: ' + this.activeOrder.name + ' ' + this.orderProgress + '/' + this.activeOrder.qty;
  const stock = this._stockTotal();
  if (stock > 0) return 'Vineyard — ' + stock + ' crates in stock';
  return '';
};

VineyardSystem.prototype.interact = function () {
  const pos = this._wire.getPlayerPos();
  if (Math.hypot(pos.x - 320, pos.z - (-260)) > 25) return false;
  let i = 0;
  while (i < WINE_VARIETALS.length) {
    if (this._onHand(WINE_VARIETALS[i].id) > 0) {
      this.sell(WINE_VARIETALS[i].id, 1);
      return true;
    }
    i++;
  }
  const cheap = vineyardCheapest(this.dayDrift, this.rank, this.upgrades);
  return this.harvest(cheap.id, 1);
};

export function createVineyardSystem(ctx) {
  const c = ctx || {};
  const wire = {
    rng: typeof c.rng === 'function' ? c.rng : Math.random,
    getDay: typeof c.getDay === 'function' ? c.getDay : () => 1,
    getHour: typeof c.getHour === 'function' ? c.getHour : () => 12,
    getCash: typeof c.getCash === 'function' ? c.getCash : () => 0,
    addCash: typeof c.addCash === 'function' ? c.addCash : () => {},
    addHeat: typeof c.addHeat === 'function' ? c.addHeat : () => {},
    log: typeof c.log === 'function' ? c.log : () => {},
    getPlayerPos: typeof c.getPlayerPos === 'function' ? c.getPlayerPos : () => ({ x: 0, z: 0 }),
    getWeather: typeof c.getWeather === 'function' ? c.getWeather : () => ({ condition: 'clear' }),
  };
  return new VineyardSystem(wire);
}

// ---- extras factory ----

export function createVineyardExtras(system) {
  const hired = [];
  const claimed = [];
  let wagesPaid = 0;
  let donated = 0;
  let rep = 0;

  const statValue = (field) => {
    if (field === 'upgradesCount') return system.upgrades.length;
    const v = system[field];
    return typeof v === 'number' ? v : 0;
  };

  const extras = {
    hireHelper(id) {
      const helper = VINEYARD_HELPERS.find((h) => h.id === id);
      if (!helper) return { ok: false, reason: 'unknown-helper' };
      let dup = false;
      let i = 0;
      while (i < hired.length) {
        if (hired[i].id === id) dup = true;
        i++;
      }
      if (dup) return { ok: false, reason: 'already-hired' };
      hired.push(helper);
      return { ok: true, id: helper.id, name: helper.name, wage: helper.wage };
    },

    fireHelper(id) {
      let at = -1;
      let i = 0;
      while (i < hired.length) {
        if (hired[i].id === id) at = i;
        i++;
      }
      if (at < 0) return { ok: false, reason: 'not-hired' };
      hired.splice(at, 1);
      return { ok: true, id };
    },

    payWages() {
      let due = 0;
      let i = 0;
      while (i < hired.length) {
        due += hired[i].wage;
        i++;
      }
      wagesPaid += due;
      return { ok: true, due, helpers: hired.map((h) => ({ ...h })), wagesPaid };
    },

    helperBonus(skill) {
      let sum = 0;
      let i = 0;
      while (i < hired.length) {
        if (hired[i].skill === skill) sum += hired[i].bonus;
        i++;
      }
      return sum;
    },

    challenges() {
      const rows = [];
      let i = 0;
      while (i < VINEYARD_CHALLENGES.length) {
        const ch = VINEYARD_CHALLENGES[i];
        const value = Math.floor(statValue(ch.target));
        rows.push({ id: ch.id, name: ch.name, value, goal: ch.goal, done: value >= ch.goal });
        i++;
      }
      return rows;
    },

    claimChallenge(id) {
      const ch = VINEYARD_CHALLENGES.find((c) => c.id === id);
      if (!ch) return { ok: false, reason: 'unknown-challenge' };
      if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
      const value = Math.floor(statValue(ch.target));
      if (value < ch.goal) return { ok: false, reason: 'not-done', value, goal: ch.goal };
      claimed.push(id);
      return { ok: true, id, xp: ch.xp };
    },

    achievements() {
      const rows = [];
      let i = 0;
      while (i < VINEYARD_ACHIEVEMENTS.length) {
        const ach = VINEYARD_ACHIEVEMENTS[i];
        const done = ach.check === 'spoiled'
          ? system.batches >= 50 && system.spoiled === 0
          : statValue(ach.check) >= ach.goal;
        rows.push({ id: ach.id, name: ach.name, desc: ach.desc, done });
        i++;
      }
      return rows;
    },

    donate(id, qty) {
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
      return { ok: true, quantity: qty, reputation: rep, note: 'Vintner Elena thanks you for the donation.' };
    },

    clearStale() {
      let cleared = 0;
      let i = 0;
      while (i < WINE_VARIETALS.length) {
        const wine = WINE_VARIETALS[i];
        if (wine.difficulty <= 1) {
          cleared += system.inventory[wine.id];
          system.inventory[wine.id] = 0;
        }
        i++;
      }
      return { ok: true, cleared };
    },

    stockReport() {
      let stock = 0;
      let premium = 0;
      let i = 0;
      while (i < WINE_VARIETALS.length) {
        stock += system.inventory[WINE_VARIETALS[i].id];
        premium += system.premium[WINE_VARIETALS[i].id];
        i++;
      }
      const cap = vineyardStockCap(system.upgrades);
      return { ok: true, stock, premium, cap, free: cap - stock - premium };
    },

    get helpers() { return hired.map((h) => ({ ...h })); },
    get claimed() { return claimed.slice(); },
    get wagesPaid() { return wagesPaid; },
    get donated() { return donated; },
    get rep() { return rep; },
  };

  return extras;
}
