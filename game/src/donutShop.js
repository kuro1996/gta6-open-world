// Donut shop — Donut Queen Bea fries twelve flavours, glazes trays and
// sells to offices, schools and birthday parties. Pure logic, no rendering,
// no imports. The game wires this file through the standard context with
// safe defaults.

export const DONUT_FLAVORS = [
  { id: 'glazed-ring', name: 'Glazed Ring', desc: 'The classic ring, dipped in vanilla glaze.', basePrice: 6, time: 1, difficulty: 1, glaze: 'vanilla glaze', topping: 'none', sugar: 12 },
  { id: 'chocolate-frosted', name: 'Chocolate Frosted', desc: 'A ring frosted thick with chocolate.', basePrice: 8, time: 2, difficulty: 1, glaze: 'chocolate', topping: 'sprinkles', sugar: 14 },
  { id: 'strawberry-sprinkle', name: 'Strawberry Sprinkle', desc: 'Pink strawberry glaze under a rain of sprinkles.', basePrice: 9, time: 2, difficulty: 2, glaze: 'strawberry', topping: 'sprinkles', sugar: 15 },
  { id: 'boston-cream', name: 'Boston Cream', desc: 'Cream-filled and topped with chocolate ganache.', basePrice: 11, time: 3, difficulty: 3, glaze: 'chocolate', topping: 'cream', sugar: 18 },
  { id: 'jelly-filled', name: 'Jelly Filled', desc: 'A soft round bursting with raspberry jelly.', basePrice: 9, time: 2, difficulty: 2, glaze: 'sugar glaze', topping: 'jelly', sugar: 16 },
  { id: 'maple-bar', name: 'Maple Bar', desc: 'A long maple-glazed bar, sweet and sticky.', basePrice: 10, time: 2, difficulty: 2, glaze: 'maple', topping: 'none', sugar: 17 },
  { id: 'cinnamon-sugar', name: 'Cinnamon Sugar', desc: 'A warm ring rolled in cinnamon sugar.', basePrice: 7, time: 1, difficulty: 1, glaze: 'cinnamon', topping: 'sugar', sugar: 13 },
  { id: 'blueberry-cake', name: 'Blueberry Cake', desc: 'A cakey donut studded with blueberries.', basePrice: 9, time: 2, difficulty: 2, glaze: 'blueberry', topping: 'crumb', sugar: 14 },
  { id: 'lemon-glazed', name: 'Lemon Glazed', desc: 'A bright lemon glaze over a tender ring.', basePrice: 9, time: 2, difficulty: 2, glaze: 'lemon', topping: 'zest', sugar: 14 },
  { id: 'matcha-green-tea', name: 'Matcha Green Tea', desc: 'Earthy matcha glaze, the grown-up favourite.', basePrice: 12, time: 3, difficulty: 3, glaze: 'matcha', topping: 'powder', sugar: 12 },
  { id: 'salted-caramel', name: 'Salted Caramel', desc: 'Caramel glaze with a pinch of sea salt.', basePrice: 12, time: 3, difficulty: 3, glaze: 'caramel', topping: 'sea salt', sugar: 16 },
  { id: 'red-velvet', name: 'Red Velvet', desc: 'A crimson cake donut with cream-cheese glaze.', basePrice: 13, time: 3, difficulty: 4, glaze: 'cream cheese', topping: 'crumbs', sugar: 17 },
];

export const DONUT_SHOP_UPGRADES = [
  { id: 'fryer-second', name: 'Second Fryer', desc: 'A second fryer that fries twice as fast.', cost: 120, effect: 'brew-fast' },
  { id: 'dough-mixer', name: 'Dough Mixer', desc: 'Your own mixer, cutting the cost of every fry.', cost: 180, effect: 'cost-down' },
  { id: 'glaze-station', name: 'Glaze Station', desc: 'A clean glazing station that never lets a tray spoil.', cost: 220, effect: 'spoil-down' },
  { id: 'display-case', name: 'Display Case', desc: 'A glass display case where trays fetch a better price.', cost: 300, effect: 'sell-plus' },
  { id: 'dough-fridge', name: 'Dough Fridge', desc: 'A tall fridge that doubles your stock room.', cost: 260, effect: 'stock-plus' },
  { id: 'piping-tools', name: 'Piping Tools', desc: 'Fine piping tools for glazing and finishing trays.', cost: 350, effect: 'age-plus' },
  { id: 'delivery-bike', name: 'Delivery Bike', desc: 'A sturdy bike for hauling bulk orders to offices.', cost: 480, effect: 'bulk' },
  { id: 'master-fryer', name: 'Master Fryer', desc: 'The master fryer, coaxing top coin from the finest trays.', cost: 750, effect: 'strong-plus' },
];

export const DONUT_SHOP_ORDERS = [
  { id: 'office-20', name: 'Office Twenty', desc: 'The office down the street wants twenty glazed rings.', item: 'glazed-ring', qty: 20, pay: 220, days: 1, minRank: 0 },
  { id: 'birthday-box', name: 'Birthday Box', desc: 'A dozen chocolate frosted for a birthday box.', item: 'chocolate-frosted', qty: 12, pay: 240, days: 1, minRank: 2 },
  { id: 'school-fair', name: 'School Fair', desc: 'Two dozen cinnamon sugar for the school fair.', item: 'cinnamon-sugar', qty: 24, pay: 240, days: 1, minRank: 1 },
  { id: 'wedding-donuts', name: 'Wedding Donuts', desc: 'Eight red velvet for a wedding dessert table.', item: 'red-velvet', qty: 8, pay: 300, days: 2, minRank: 3 },
  { id: 'cafe-box', name: 'Cafe Box', desc: 'Ten boston cream for the cafe counter.', item: 'boston-cream', qty: 10, pay: 280, days: 2, minRank: 2 },
  { id: 'market-stall', name: 'Market Stall', desc: 'Eighteen strawberry sprinkle for the market stall.', item: 'strawberry-sprinkle', qty: 18, pay: 260, days: 1, minRank: 2 },
  { id: 'morning-run', name: 'Morning Run', desc: 'Sixteen maple bars for the morning commuter run.', item: 'maple-bar', qty: 16, pay: 260, days: 1, minRank: 1 },
  { id: 'mixed-trays', name: 'Mixed Trays', desc: 'Twenty-five trays of anything, for an office restock.', item: 'mixed', qty: 25, pay: 480, days: 2, minRank: 3 },
];

export const DONUT_SHOP_EVENTS = [
  { id: 'flour-shortage', name: 'Flour Shortage', text: 'Flour is scarce this week and prices climb.', effect: 'cost-up' },
  { id: 'morning-rush', name: 'Morning Rush', text: 'The morning crowd is hungry and paying well.', effect: 'sell-up' },
  { id: 'health-inspection', name: 'Health Inspection', text: 'An inspector is checking the fryers today.', effect: 'heat' },
  { id: 'rainy-morning', name: 'Rainy Morning', text: 'Rain keeps folk indoors, and orders pile up.', effect: 'orders-up' },
  { id: 'sugar-glut', name: 'Sugar Glut', text: 'Sugar is cheap and plentiful this week.', effect: 'cost-down' },
  { id: 'burnt-tray', name: 'Burnt Tray', text: 'A tray burnt in the fryer and must be tossed.', effect: 'spoil' },
  { id: 'street-fair', name: 'Street Fair', text: 'The street fair wants trays, fast.', effect: 'orders-up' },
  { id: 'cold-snap', name: 'Cold Snap', text: 'Cold mornings have everyone buying warm donuts.', effect: 'sell-up' },
  { id: 'fryer-breakdown', name: 'Fryer Breakdown', text: 'A fryer broke down and ruined some trays.', effect: 'spoil' },
  { id: 'donut-critic', name: 'Donut Critic', text: 'A travelling critic shares hard-won wisdom.', effect: 'xp' },
];

export const DONUT_SHOP_RANKS = [
  { level: 0, name: 'Dough Hand', xp: 0, perk: 'Learning the fryers.' },
  { level: 1, name: 'Fryer Tender', xp: 120, perk: 'Steadier hands, better prices.' },
  { level: 2, name: 'Head Fryer', xp: 300, perk: 'The town knows your name.' },
  { level: 3, name: 'Donut Baron', xp: 620, perk: 'Offices bid for your trays.' },
  { level: 4, name: 'Legend of the Fryer', xp: 1100, perk: 'Your donuts are sung about in song.' },
];

export const DONUT_SHOP_HELPERS = [
  { id: 'apprentice', name: 'Zoe', wage: 25, skill: 'haul', bonus: 0.2, desc: 'Zoe the apprentice hauls flour sacks all day.' },
  { id: 'glaze-keeper', name: 'Mia', wage: 40, skill: 'age', bonus: 0.25, desc: 'Mia keeps the glazes glossy and the trays honest.' },
  { id: 'counter-runner', name: 'Leo', wage: 60, skill: 'sell', bonus: 0.15, desc: 'Leo runs trays to the tables and charms the guests.' },
  { id: 'sugar-artist', name: 'Chef Bea Jr', wage: 80, skill: 'brew', bonus: 0.3, desc: 'Chef Bea Jr pipes sugar art that sells itself.' },
];

export const DONUT_SHOP_CHALLENGES = [
  { id: 'trays-100', name: 'A Hundred Trays', target: 'produced', goal: 100, xp: 80, desc: 'Fry a hundred trays in total.' },
  { id: 'sell-500', name: 'Five Hundred Sold', target: 'earned', goal: 500, xp: 120, desc: 'Earn five hundred from sales.' },
  { id: 'glaze-20', name: 'Glaze Twenty', target: 'aged', goal: 20, xp: 100, desc: 'Glaze twenty trays.' },
  { id: 'orders-10', name: 'Ten Orders Done', target: 'ordersDone', goal: 10, xp: 140, desc: 'Complete ten office orders.' },
  { id: 'streak-10', name: 'Ten Clean Batches', target: 'bestStreak', goal: 10, xp: 110, desc: 'Reach a ten-batch clean streak.' },
  { id: 'rank-3', name: 'Donut Baron', target: 'rank', goal: 3, xp: 150, desc: 'Reach rank three.' },
  { id: 'earn-2000', name: 'Two Thousand Earned', target: 'earned', goal: 2000, xp: 160, desc: 'Earn two thousand in total.' },
  { id: 'batches-50', name: 'Fifty Batches', target: 'batches', goal: 50, xp: 90, desc: 'Fry fifty batches.' },
];

export const DONUT_SHOP_ACHIEVEMENTS = [
  { id: 'first-fry', name: 'First Fry', check: 'batches', goal: 1, desc: 'Fry your very first batch.' },
  { id: 'first-sale', name: 'First Sale', check: 'sold', goal: 1, desc: 'Sell your first tray.' },
  { id: 'first-glaze', name: 'First Glaze', check: 'aged', goal: 1, desc: 'Glaze your first tray.' },
  { id: 'rank-2', name: 'Head Fryer Rank', check: 'rank', goal: 2, desc: 'Reach the Head Fryer rank.' },
  { id: 'rich-donut', name: 'Rich Donut', check: 'earned', goal: 2000, desc: 'Earn two thousand in total.' },
  { id: 'full-kit', name: 'Full Kit', check: 'upgradesCount', goal: 8, desc: 'Own every donut shop upgrade.' },
  { id: 'no-burn', name: 'No Burn', check: 'spoiled', goal: 0, desc: 'Fry fifty batches without burning a single tray.' },
  { id: 'big-tray', name: 'Big Tray', check: 'bestBatch', goal: 20, desc: 'Fry a batch of twenty trays.' },
];

export const DONUT_SHOP_TIPS = [
  { id: 'fresh-first', name: 'Fresh First', text: 'Fry glazed rings first, they are quick and always sell.' },
  { id: 'glaze-it', name: 'Glaze It', text: 'Glaze everything you can afford; glazed trays pay far better.' },
  { id: 'oil-care', name: 'Oil Care', text: 'Mind your oil and your glaze station, or trays burn.' },
  { id: 'fair-stock', name: 'Fair Stock', text: 'Stock up before the street fair; hungry crowds pay double.' },
  { id: 'glaze-watch', name: 'Glaze Watch', text: 'Watch the glaze temperature, or the morning fry suffers.' },
  { id: 'order-first', name: 'Order First', text: 'Take the office order first, then fry exactly for it.' },
  { id: 'velvet-money', name: 'Velvet Money', text: 'Red velvet is slow but it is the best coin per tray.' },
  { id: 'fridge-space', name: 'Fridge Space', text: 'Watch your stock cap; a fridge buys you forty more slots.' },
];

export const DONUT_SHOP_RECORDS = [
  { id: 'biggest-tray', name: 'Biggest Tray', stat: 'bestBatch', unit: 'donuts', desc: 'Largest single batch ever fried.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'dollars', desc: 'Most coin earned in total.' },
  { id: 'most-fried', name: 'Most Fried', stat: 'produced', unit: 'trays', desc: 'Most trays fried in total.' },
  { id: 'most-glazed', name: 'Most Glazed', stat: 'aged', unit: 'trays', desc: 'Most trays glazed.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'trays', desc: 'Longest clean frying streak.' },
];

export const DONUT_SHOP_MARKET_EVENTS = [
  { id: 'glazed-craze', name: 'Glazed Craze', items: ['glazed-ring'], mult: 1.4, desc: 'Everyone wants glazed rings this week.' },
  { id: 'chocolate-glut', name: 'Chocolate Glut', items: ['chocolate-frosted', 'boston-cream'], mult: 0.6, desc: 'Too much chocolate on the market, prices sag.' },
  { id: 'velvet-rush', name: 'Velvet Rush', items: ['red-velvet'], mult: 1.5, desc: 'Red velvet is the talk of the town.' },
  { id: 'strawberry-season', name: 'Strawberry Season', items: ['strawberry-sprinkle'], mult: 1.3, desc: 'Strawberry season lifts the whole shop.' },
  { id: 'maple-morning', name: 'Maple Morning', items: ['maple-bar'], mult: 1.35, desc: 'Maple mornings are booming.' },
  { id: 'matcha-night', name: 'Matcha Night', items: ['matcha-green-tea'], mult: 1.3, desc: 'The cafes all want matcha tonight.' },
  { id: 'caramel-trend', name: 'Caramel Trend', items: ['salted-caramel'], mult: 1.25, desc: 'Salted caramel is suddenly fashionable.' },
  { id: 'lemon-summer', name: 'Lemon Summer', items: ['lemon-glazed'], mult: 1.3, desc: 'Summer afternoons call for lemon glaze.' },
  { id: 'jelly-week', name: 'Jelly Week', items: ['jelly-filled'], mult: 1.2, desc: 'Jelly donuts are in demand.' },
  { id: 'sugar-tax', name: 'Sugar Tax', items: ['red-velvet', 'salted-caramel'], mult: 0.7, desc: 'A new tax bites the fine trays hardest.' },
  { id: 'dry-week', name: 'Dry Week', items: ['glazed-ring', 'cinnamon-sugar'], mult: 0.75, desc: 'A dry spell cools the everyday trays.' },
  { id: 'donut-festival', name: 'Donut Festival', items: ['glazed-ring', 'chocolate-frosted', 'strawberry-sprinkle'], mult: 1.2, desc: 'The donut festival lifts every morning favourite.' },
];

export const DONUT_SHOP_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Spring crowds return to the shop.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Steady summer hunger.' },
  { id: 'autumn', name: 'Autumn', mult: 1.1, desc: 'Harvest season brings the fairs.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold winter mornings thin the crowds.' },
];

export const DONUT_SHOP_LEADERBOARD = [
  { name: 'Bea', total: 3500, desc: 'Donut Queen Bea still leads the board.' },
  { name: 'Mia', total: 2300, desc: 'Glaze keeper with a steady hand.' },
  { name: 'You', total: 0, desc: 'Your running total.' },
  { name: 'Zoe', total: 1100, desc: 'The apprentice is climbing fast.' },
  { name: 'Leo', total: 1900, desc: 'Leo and his charming counters.' },
];

export const DONUT_SHOP_QUICK_START = [
  'Fry glazed rings first, they are quick and always sell.',
  'Glaze everything affordable, glazed trays pay far better.',
  'Buy the glaze station before the master fryer, burnt trays hurt.',
  'Take office orders then fry for them, never the other way round.',
  'Sell the morning fry by noon, while it is still warm.',
  'Check the price board every morning before you fry.',
];

export const DONUT_SHOP_META = {
  system: 'donutShop',
  version: '7b-C',
  author: 'builder-3',
  label: 'Donut Shop',
  owner: 'Donut Queen Bea the Fryer',
  itemCount: 12,
};

// ---- module helpers ----

export function donutShopRankFor(xp) {
  const cutoffs = DONUT_SHOP_RANKS.map((r) => r.xp);
  let rank = 0;
  for (let i = 0; i < cutoffs.length; i++) {
    if (xp >= cutoffs[i]) rank = i;
  }
  return rank;
}

const donutEffectLookup = (owned) => {
  const fx = new Set();
  for (const id of owned || []) {
    const up = DONUT_SHOP_UPGRADES.find((u) => u.id === id);
    if (up) fx.add(up.effect);
  }
  return fx;
};

export function donutShopItemById(id) {
  for (const flavor of DONUT_FLAVORS) {
    if (flavor.id === id) return flavor;
  }
  return null;
}

export function donutShopPriceFor(id, drift, rank, upgrades) {
  const flavor = donutShopItemById(id);
  if (!flavor) return 0;
  const fx = donutEffectLookup(upgrades);
  const d = drift && typeof drift[id] === 'number' ? drift[id] : 0;
  let price = flavor.basePrice * (1 + d) * (1 + 0.1 * rank);
  if (flavor.difficulty >= 3 && fx.has('strong-plus')) price *= 1.3;
  if (fx.has('sell-plus')) price *= 1.15;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function donutShopSellPriceFor(id, premium, drift, rank, upgrades) {
  const regular = donutShopPriceFor(id, drift, rank, upgrades);
  if (regular === 0) return 0;
  return Math.max(1, Math.round((premium ? regular * 1.5 : regular) * 10) / 10);
}

export function donutShopCostFor(id, qty, upgrades) {
  const flavor = donutShopItemById(id);
  if (!flavor) return 0;
  const raw = Math.round(flavor.basePrice * 0.4 * qty);
  return Math.max(1, donutEffectLookup(upgrades).has('cost-down') ? Math.round(raw * 0.8) : raw);
}

export function donutShopStockCap(upgrades) {
  return donutEffectLookup(upgrades).has('stock-plus') ? 80 : 40;
}

export function donutShopSpoilChance(item, upgrades) {
  const chance = 0.04 + item.difficulty * 0.015;
  return donutEffectLookup(upgrades).has('spoil-down') ? chance / 2 : chance;
}

export function donutShopBestSeller(drift, rank, upgrades) {
  let best = null;
  for (const flavor of DONUT_FLAVORS) {
    const price = donutShopPriceFor(flavor.id, drift, rank, upgrades);
    if (best === null || price > best.price) best = { id: flavor.id, price };
  }
  return best;
}

export function donutShopCheapest(drift, rank, upgrades) {
  let low = null;
  for (const flavor of DONUT_FLAVORS) {
    const price = donutShopPriceFor(flavor.id, drift, rank, upgrades);
    if (low === null || price < low.price) low = { id: flavor.id, price };
  }
  return low;
}

export function donutShopTipFor(day) {
  const n = DONUT_SHOP_TIPS.length;
  return DONUT_SHOP_TIPS[((day % n) + n) % n];
}

export function donutShopLeaderboardWith(playerTotal) {
  const rows = DONUT_SHOP_LEADERBOARD.map((row) => ({
    name: row.name,
    total: row.name === 'You' ? playerTotal : row.total,
    desc: row.desc,
  }));
  rows.sort((a, b) => b.total - a.total);
  return rows.map((row, i) => ({ rank: i + 1, name: row.name, total: row.total, desc: row.desc }));
}

// ---- system factory ----

const DONUT_STATE_KEYS = [
  'xp', 'rank', 'batches', 'produced', 'sold', 'earned', 'spent', 'spoiled', 'aged',
  'ordersDone', 'ordersFailed', 'streak', 'bestStreak', 'bestBatch', 'inventory', 'premium',
  'upgrades', 'activeOrder', 'orderProgress', 'cooldown', 'dayDrift', 'lastDay', 'dailySold',
  'dailyEarned', 'heatTaken', 'eventsSeen', 'lastEvent', 'perfectBatches',
];

export function createDonutShopSystem(ctx) {
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

  const S = {
    xp: 0, rank: 0, batches: 0, produced: 0, sold: 0, earned: 0, spent: 0, spoiled: 0,
    aged: 0, ordersDone: 0, ordersFailed: 0, streak: 0, bestStreak: 0, bestBatch: 0,
    inventory: {}, premium: {}, upgrades: [], activeOrder: null, orderProgress: 0,
    cooldown: 0, dayDrift: {}, lastDay: 1, dailySold: 0, dailyEarned: 0, heatTaken: 0,
    eventsSeen: 0, lastEvent: 'none', perfectBatches: 0,
  };
  for (const flavor of DONUT_FLAVORS) {
    S.inventory[flavor.id] = 0;
    S.premium[flavor.id] = 0;
    S.dayDrift[flavor.id] = 0;
  }

  const levelUp = () => {
    const next = donutShopRankFor(S.xp);
    if (next > S.rank) {
      S.rank = next;
      log('Rank up! You are now ' + DONUT_SHOP_RANKS[next].name + '.');
    }
  };
  const awardXp = (n) => { S.xp += n; levelUp(); };
  const totalHeld = () => {
    let total = 0;
    for (const flavor of DONUT_FLAVORS) total += S.inventory[flavor.id] + S.premium[flavor.id];
    return total;
  };
  const held = (id) => S.inventory[id] + S.premium[id];
  const remove = (id, qty) => {
    let rest = qty;
    const reg = Math.min(S.inventory[id], rest);
    S.inventory[id] -= reg;
    rest -= reg;
    if (rest > 0) S.premium[id] -= rest;
  };
  const nudgeDrift = (amount) => {
    for (const flavor of DONUT_FLAVORS) S.dayDrift[flavor.id] += amount;
  };
  const spoilOne = () => {
    const stocked = DONUT_FLAVORS.filter((f) => held(f.id) > 0);
    if (!stocked.length) return;
    const pick = stocked[Math.trunc(rng() * stocked.length)];
    const lost = Math.min(2, held(pick.id));
    remove(pick.id, lost);
    S.spoiled += lost;
    log('Burnt ' + lost + ' trays of ' + pick.name + '.');
  };

  const EFFECT_RUNNERS = [
    ['cost-up', () => nudgeDrift(0.15)],
    ['cost-down', () => nudgeDrift(-0.1)],
    ['sell-up', () => nudgeDrift(0.2)],
    ['xp', () => awardXp(25)],
    ['orders-up', () => awardXp(10)],
    ['heat', () => { addHeat(1); S.heatTaken += 1; }],
    ['spoil', () => spoilOne()],
  ];

  const methods = {
    fry(id, qty) {
      const amount = qty === undefined ? 1 : qty;
      const flavor = donutShopItemById(id);
      if (!flavor) return { ok: false, reason: 'unknown-item' };
      if (!amount || amount <= 0) return { ok: false, reason: 'bad-quantity' };
      if (S.cooldown > 0) return { ok: false, reason: 'cooldown' };
      const cost = donutShopCostFor(id, amount, S.upgrades);
      if (getCash() < cost) return { ok: false, reason: 'not-enough-cash' };
      if (totalHeld() + amount > donutShopStockCap(S.upgrades)) return { ok: false, reason: 'stock-full' };
      addCash(-cost);
      S.spent += cost;
      let made = amount;
      if (rng() < donutShopSpoilChance(flavor, S.upgrades)) {
        const lost = 1 + Math.trunc(rng() * Math.max(1, Math.trunc(amount / 2)));
        made = Math.max(0, amount - lost);
        S.spoiled += lost;
        S.streak = 0;
        log('A batch of ' + flavor.name + ' burnt, ' + lost + ' trays lost.');
      } else {
        S.streak += 1;
        S.bestStreak = Math.max(S.bestStreak, S.streak);
        if (flavor.difficulty >= 4) S.perfectBatches += 1;
      }
      S.inventory[id] += made;
      S.batches += 1;
      S.produced += made;
      S.bestBatch = Math.max(S.bestBatch, made);
      S.cooldown = donutEffectLookup(S.upgrades).has('brew-fast')
        ? Math.max(1, Math.trunc(flavor.time * 0.8))
        : flavor.time;
      awardXp(4 + made + flavor.difficulty * 2);
      // The heat branch is guarded off in the donut shop: frying never
      // adds heat, whatever the difficulty.
      if (false && flavor.difficulty >= 4 && rng() < 0.15) {
        addHeat(1);
        S.heatTaken += 1;
      }
      if (S.activeOrder) {
        const order = S.activeOrder;
        if (order.item === 'mixed' || order.item === id) S.orderProgress += made;
      }
      log('Fried ' + made + ' trays of ' + flavor.name + '.');
      return { ok: true, item: id, made, cost, cooldown: S.cooldown };
    },

    glazeBatch(id, qty) {
      const amount = qty === undefined ? 1 : qty;
      const flavor = donutShopItemById(id);
      if (!flavor) return { ok: false, reason: 'unknown-item' };
      if (!amount || amount <= 0) return { ok: false, reason: 'bad-quantity' };
      if (S.inventory[id] < amount) return { ok: false, reason: 'not-enough-stock' };
      S.inventory[id] -= amount;
      S.premium[id] += amount;
      S.aged += amount;
      awardXp(6 + amount * 2);
      log('Glazed ' + amount + ' trays of ' + flavor.name + '.');
      return { ok: true, item: id, quantity: amount, premium: S.premium[id] };
    },

    sell(id, qty) {
      const flavor = donutShopItemById(id);
      if (!flavor) return { ok: false, reason: 'unknown-item' };
      if (!qty || qty <= 0) return { ok: false, reason: 'bad-quantity' };
      if (held(id) < qty) return { ok: false, reason: 'not-enough-stock' };
      const premQty = Math.min(S.premium[id], qty);
      const regQty = qty - premQty;
      const total = Math.round((premQty * donutShopSellPriceFor(id, true, S.dayDrift, S.rank, S.upgrades)
        + regQty * donutShopSellPriceFor(id, false, S.dayDrift, S.rank, S.upgrades)) * 10) / 10;
      S.premium[id] -= premQty;
      S.inventory[id] -= regQty;
      S.sold += qty;
      S.earned += total;
      S.dailySold += qty;
      S.dailyEarned += total;
      addCash(total);
      awardXp(qty);
      return { ok: true, total, quantity: qty };
    },

    sellAll() {
      let total = 0;
      let units = 0;
      const lines = [];
      for (const flavor of DONUT_FLAVORS) {
        const qty = held(flavor.id);
        if (qty <= 0) continue;
        const premQty = Math.min(S.premium[flavor.id], qty);
        const regQty = qty - premQty;
        const lineTotal = Math.round((premQty * donutShopSellPriceFor(flavor.id, true, S.dayDrift, S.rank, S.upgrades)
          + regQty * donutShopSellPriceFor(flavor.id, false, S.dayDrift, S.rank, S.upgrades)) * 10) / 10;
        S.premium[flavor.id] -= premQty;
        S.inventory[flavor.id] -= regQty;
        total += lineTotal;
        units += qty;
        lines.push({ id: flavor.id, quantity: qty, total: lineTotal });
      }
      if (units === 0) return { ok: false, reason: 'nothing-to-sell' };
      total = Math.round(total * 10) / 10;
      S.sold += units;
      S.earned += total;
      S.dailySold += units;
      S.dailyEarned += total;
      addCash(total);
      awardXp(units);
      return { ok: true, total, units, lines };
    },

    buyUpgrade(id) {
      const up = DONUT_SHOP_UPGRADES.find((u) => u.id === id);
      if (!up) return { ok: false, reason: 'unknown-upgrade' };
      if (S.upgrades.includes(id)) return { ok: false, reason: 'already-owned' };
      if (getCash() < up.cost) return { ok: false, reason: 'not-enough-cash' };
      addCash(-up.cost);
      S.spent += up.cost;
      S.upgrades.push(id);
      awardXp(20);
      log('Bought the ' + up.name + ' upgrade.');
      return { ok: true, id };
    },

    takeOrder(id) {
      const order = DONUT_SHOP_ORDERS.find((o) => o.id === id);
      if (!order) return { ok: false, reason: 'unknown-order' };
      if (S.activeOrder) return { ok: false, reason: 'order-active' };
      if (S.rank < order.minRank) return { ok: false, reason: 'rank-too-low' };
      const today = getDay();
      S.activeOrder = { ...order, takenDay: today, deadline: today + order.days };
      S.orderProgress = 0;
      log('Took the order: ' + order.name + '.');
      return { ok: true, order: S.activeOrder };
    },

    deliverOrder() {
      const order = S.activeOrder;
      if (!order) return { ok: false, reason: 'no-active-order' };
      if (order.item === 'mixed') {
        if (totalHeld() < order.qty) return { ok: false, reason: 'not-enough-stock' };
        let need = order.qty;
        for (const flavor of DONUT_FLAVORS) {
          if (need <= 0) break;
          const take = Math.min(held(flavor.id), need);
          remove(flavor.id, take);
          need -= take;
        }
      } else {
        if (held(order.item) < order.qty) return { ok: false, reason: 'not-enough-stock' };
        remove(order.item, order.qty);
        S.orderProgress = order.qty;
      }
      const pay = order.pay + 40 * S.rank;
      S.activeOrder = null;
      S.orderProgress = 0;
      S.ordersDone += 1;
      S.earned += pay;
      S.dailyEarned += pay;
      addCash(pay);
      awardXp(60);
      log('Delivered ' + order.name + ' for ' + pay + '.');
      return { ok: true, pay };
    },

    abandonOrder() {
      if (!S.activeOrder) return { ok: false, reason: 'no-active-order' };
      S.activeOrder = null;
      S.orderProgress = 0;
      S.ordersFailed += 1;
      return { ok: true };
    },

    haggle() {
      if (S.rank < 1) return { ok: false, reason: 'rank-too-low' };
      const bonus = Math.round((0.05 + 0.03 * S.rank) * 100) / 100;
      const haggled = rng() < 0.55;
      return { ok: true, haggled, bonus };
    },

    priceBoard() {
      const rows = [];
      for (const flavor of DONUT_FLAVORS) {
        rows.push({
          id: flavor.id,
          name: flavor.name,
          price: donutShopPriceFor(flavor.id, S.dayDrift, S.rank, S.upgrades),
          drift: S.dayDrift[flavor.id],
          stock: S.inventory[flavor.id],
          premium: S.premium[flavor.id],
        });
      }
      return rows;
    },

    orderList() {
      return DONUT_SHOP_ORDERS.map((o) => ({
        id: o.id, name: o.name, item: o.item, quantity: o.qty, pay: o.pay, days: o.days, minRank: o.minRank,
      }));
    },

    dailyEvent() {
      S.eventsSeen += 1;
      const weather = getWeather();
      if (weather && weather.condition === 'rain' && rng() < 0.3) {
        S.lastEvent = 'rainy-day';
        return { ok: true, event: 'rainy-day', name: 'Rainy Day' };
      }
      if (rng() < 0.18) {
        const ev = DONUT_SHOP_EVENTS[Math.trunc(rng() * DONUT_SHOP_EVENTS.length)];
        const runner = EFFECT_RUNNERS.find(([effect]) => effect === ev.effect);
        if (runner) runner[1]();
        S.lastEvent = ev.id;
        return { ok: true, event: ev.id, name: ev.name };
      }
      S.lastEvent = 'none';
      return { ok: true, event: 'none', name: 'No event' };
    },

    tasteTest(id) {
      const flavor = donutShopItemById(id);
      if (!flavor) return { ok: false, reason: 'unknown-item' };
      if (held(id) <= 0) return { ok: false, reason: 'no-stock' };
      const raw = 0.5 + rng() * 0.5 + S.rank * 0.02 + flavor.difficulty * 0.01;
      const quality = Math.round(Math.min(1, raw) * 100) / 100;
      awardXp(5);
      const grade = quality >= 0.9 ? 'outstanding' : quality >= 0.7 ? 'solid' : 'needs work';
      return { ok: true, item: id, quality, verdict: grade + ' — says Donut Queen Bea' };
    },

    tick(dt) {
      S.cooldown = Math.max(0, S.cooldown - dt);
    },

    tickDay(day) {
      if (day === S.lastDay) return;
      S.lastDay = day;
      for (const flavor of DONUT_FLAVORS) {
        const drifted = S.dayDrift[flavor.id] + (rng() - 0.5) * 0.1;
        S.dayDrift[flavor.id] = Math.max(-0.5, Math.min(0.6, drifted));
      }
      S.dailySold = 0;
      S.dailyEarned = 0;
      if (S.activeOrder && day > S.activeOrder.deadline && S.orderProgress < S.activeOrder.qty) {
        S.activeOrder = null;
        S.orderProgress = 0;
        S.ordersFailed += 1;
        log('An order expired undelivered.');
      }
      methods.dailyEvent();
    },

    serialize() {
      const copy = {};
      for (const key of DONUT_STATE_KEYS) copy[key] = JSON.parse(JSON.stringify(S[key]));
      return copy;
    },

    deserialize(saved) {
      if (!saved || typeof saved !== 'object') return;
      for (const key of DONUT_STATE_KEYS) {
        if (key in saved) S[key] = JSON.parse(JSON.stringify(saved[key]));
      }
      for (const flavor of DONUT_FLAVORS) {
        if (typeof S.inventory[flavor.id] !== 'number') S.inventory[flavor.id] = 0;
        if (typeof S.premium[flavor.id] !== 'number') S.premium[flavor.id] = 0;
        if (typeof S.dayDrift[flavor.id] !== 'number') S.dayDrift[flavor.id] = 0;
      }
      levelUp();
    },

    stats() {
      const stock = totalHeld();
      const eff = S.produced + S.spoiled === 0
        ? 100
        : Math.round((S.produced / (S.produced + S.spoiled)) * 100);
      return {
        rank: DONUT_SHOP_RANKS[S.rank].name,
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
        stockCap: donutShopStockCap(S.upgrades),
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
    },

    hudLine() {
      if (S.cooldown > 0) return 'Donut Shop — frying, ' + Math.ceil(S.cooldown) + 's left';
      if (S.activeOrder) return 'Order: ' + S.activeOrder.name + ' ' + S.orderProgress + '/' + S.activeOrder.qty;
      const stock = totalHeld();
      if (stock > 0) return 'Donut Shop — ' + stock + ' trays in stock';
      return '';
    },

    interact() {
      const pos = getPlayerPos();
      if (Math.hypot(pos.x - (-240), pos.z - (-60)) > 25) return false;
      for (const flavor of DONUT_FLAVORS) {
        if (held(flavor.id) > 0) {
          methods.sell(flavor.id, 1);
          return true;
        }
      }
      const cheap = donutShopCheapest(S.dayDrift, S.rank, S.upgrades);
      return methods.fry(cheap.id, 1);
    },
  };

  const sys = { name: 'donutShop' };
  for (const key of DONUT_STATE_KEYS) {
    Object.defineProperty(sys, key, {
      get() { return S[key]; },
      set(v) { S[key] = v; },
      enumerable: true,
      configurable: true,
    });
  }
  Object.assign(sys, methods);
  return sys;
}

// ---- extras factory ----

export function createDonutShopExtras(system) {
  const hired = [];
  const claimed = [];
  let wagesPaid = 0;
  let donated = 0;
  let rep = 0;

  const lookup = (field) => {
    if (field === 'upgradesCount') return system.upgrades.length;
    return system[field] || 0;
  };

  const extras = {};

  extras.hireHelper = (id) => {
    const helper = DONUT_SHOP_HELPERS.find((h) => h.id === id);
    if (!helper) return { ok: false, reason: 'unknown-helper' };
    if (hired.some((h) => h.id === id)) return { ok: false, reason: 'already-hired' };
    hired.push(helper);
    return { ok: true, id: helper.id, name: helper.name, wage: helper.wage };
  };

  extras.fireHelper = (id) => {
    const at = hired.findIndex((h) => h.id === id);
    if (at < 0) return { ok: false, reason: 'not-hired' };
    hired.splice(at, 1);
    return { ok: true, id };
  };

  extras.payWages = () => {
    let due = 0;
    for (const h of hired) due += h.wage;
    wagesPaid += due;
    return { ok: true, due, helpers: hired.map((h) => ({ ...h })), wagesPaid };
  };

  extras.helperBonus = (skill) => {
    let sum = 0;
    for (const h of hired) if (h.skill === skill) sum += h.bonus;
    return sum;
  };

  extras.challenges = () => DONUT_SHOP_CHALLENGES.map((ch) => {
    const value = Math.floor(lookup(ch.target));
    return { id: ch.id, name: ch.name, value, goal: ch.goal, done: value >= ch.goal };
  });

  extras.claimChallenge = (id) => {
    const ch = DONUT_SHOP_CHALLENGES.find((c) => c.id === id);
    if (!ch) return { ok: false, reason: 'unknown-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const value = Math.floor(lookup(ch.target));
    if (value < ch.goal) return { ok: false, reason: 'not-done', value, goal: ch.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  };

  extras.achievements = () => DONUT_SHOP_ACHIEVEMENTS.map((ach) => {
    const done = ach.check === 'spoiled'
      ? system.batches >= 50 && system.spoiled === 0
      : lookup(ach.check) >= ach.goal;
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
    return { ok: true, quantity: qty, reputation: rep, note: 'Donut Queen Bea thanks you for the donation.' };
  };

  extras.clearStale = () => {
    let cleared = 0;
    for (const flavor of DONUT_FLAVORS) {
      if (flavor.difficulty <= 1) {
        cleared += system.inventory[flavor.id];
        system.inventory[flavor.id] = 0;
      }
    }
    return { ok: true, cleared };
  };

  extras.stockReport = () => {
    let stock = 0;
    let premium = 0;
    for (const flavor of DONUT_FLAVORS) {
      stock += system.inventory[flavor.id];
      premium += system.premium[flavor.id];
    }
    const cap = donutShopStockCap(system.upgrades);
    return { ok: true, stock, premium, cap, free: cap - stock - premium };
  };

  Object.defineProperty(extras, 'helpers', { get: () => hired.map((h) => ({ ...h })) });
  Object.defineProperty(extras, 'claimed', { get: () => [...claimed] });
  Object.defineProperty(extras, 'wagesPaid', { get: () => wagesPaid });
  Object.defineProperty(extras, 'donated', { get: () => donated });
  Object.defineProperty(extras, 'rep', { get: () => rep });

  return extras;
}
