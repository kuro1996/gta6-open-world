// Bakery — Mama Rosa bakes twelve goods in brick ovens, glazes trays and
// sells loaves, cakes and pies to the cafes and the market of Solara.
// Pure logic only: no rendering, no imports. The game hands this file a
// context object; any missing field falls back to a safe default.

export const BAKED_GOODS = [
  { id: 'sourdough', name: 'Sourdough Loaf', basePrice: 18, time: 4, difficulty: 2, ingredient: 'rye starter', calories: 220, crust: 'crackling', desc: 'A tangy sourdough with a crackling crust and a soft, open crumb.' },
  { id: 'croissant', name: 'Butter Croissant', basePrice: 12, time: 3, difficulty: 3, ingredient: 'french butter', calories: 280, crust: 'flaky', desc: 'Flaky layers of french butter that shatter at the first bite.' },
  { id: 'cinnamon-roll', name: 'Cinnamon Roll', basePrice: 14, time: 3, difficulty: 2, ingredient: 'cinnamon sugar', calories: 310, crust: 'soft', desc: 'A soft swirl of cinnamon sugar under a sweet glaze.' },
  { id: 'baguette', name: 'Baguette', basePrice: 10, time: 3, difficulty: 2, ingredient: 'white flour', calories: 180, crust: 'crusty', desc: 'A long crusty baguette, best eaten warm from the oven.' },
  { id: 'chocolate-cake', name: 'Chocolate Cake', basePrice: 42, time: 6, difficulty: 4, ingredient: 'dark cocoa', calories: 420, crust: 'tender', desc: 'A tall dark-chocolate cake, rich enough for weddings.' },
  { id: 'blueberry-muffin', name: 'Blueberry Muffin', basePrice: 11, time: 2, difficulty: 1, ingredient: 'wild blueberries', calories: 240, crust: 'domed', desc: 'A domed muffin bursting with wild blueberries.' },
  { id: 'pretzel', name: 'Salt Pretzel', basePrice: 9, time: 2, difficulty: 2, ingredient: 'lye dough', calories: 200, crust: 'chewy', desc: 'A chewy salt pretzel, dark-baked and knotted by hand.' },
  { id: 'banana-bread', name: 'Banana Bread', basePrice: 16, time: 3, difficulty: 1, ingredient: 'ripe bananas', calories: 260, crust: 'moist', desc: 'Moist banana bread made from the ripest bananas in the market.' },
  { id: 'apple-pie', name: 'Apple Pie', basePrice: 36, time: 5, difficulty: 3, ingredient: 'orchard apples', calories: 340, crust: 'golden', desc: 'A golden apple pie with a lattice top and a cinnamon heart.' },
  { id: 'focaccia', name: 'Rosemary Focaccia', basePrice: 20, time: 3, difficulty: 2, ingredient: 'olive oil', calories: 230, crust: 'crisp', desc: 'Crisp-edged focaccia dimpled with rosemary and olive oil.' },
  { id: 'lemon-tart', name: 'Lemon Tart', basePrice: 26, time: 4, difficulty: 3, ingredient: 'sicilian lemons', calories: 290, crust: 'buttery', desc: 'A sharp sicilian lemon tart in a buttery shell.' },
  { id: 'rye-bread', name: 'Dark Rye', basePrice: 15, time: 4, difficulty: 2, ingredient: 'rye flour', calories: 210, crust: 'dense', desc: 'A dense dark rye, slow-fermented and deeply flavoured.' },
];

export const BAKERY_UPGRADES = [
  { id: 'brick-oven', name: 'Brick Oven', cost: 120, desc: 'A great brick oven that bakes fast and even.', effect: 'brew-fast' },
  { id: 'butter-churn', name: 'Butter Churn', cost: 180, desc: 'Your own churn, cutting the cost of every bake.', effect: 'cost-down' },
  { id: 'proofing-cabinet', name: 'Proofing Cabinet', cost: 220, desc: 'A warm cabinet that keeps dough from spoiling.', effect: 'spoil-down' },
  { id: 'display-case', name: 'Display Case', cost: 300, desc: 'A glass display case where trays fetch a better price.', effect: 'sell-plus' },
  { id: 'flour-silo', name: 'Flour Silo', cost: 260, desc: 'A tall silo that doubles your stock room.', effect: 'stock-plus' },
  { id: 'pastry-tools', name: 'Pastry Tools', cost: 350, desc: 'Fine tools for glazing and finishing trays.', effect: 'age-plus' },
  { id: 'delivery-bike', name: 'Delivery Bike', cost: 480, desc: 'A sturdy bike for hauling bulk orders to the cafes.', effect: 'bulk' },
  { id: 'master-oven', name: 'Master Oven', cost: 750, desc: 'The master oven, coaxing top coin from the finest bakes.', effect: 'strong-plus' },
];

export const BAKERY_ORDERS = [
  { id: 'cafe-20', name: 'Cafe Twenty', item: 'croissant', qty: 20, pay: 300, days: 1, minRank: 0, desc: 'The corner cafe wants twenty croissants before the rush.' },
  { id: 'wedding-cake', name: 'Wedding Cake', item: 'chocolate-cake', qty: 4, pay: 320, days: 2, minRank: 3, desc: 'A wedding cake order: four chocolate cakes, perfect tiers.' },
  { id: 'market-bread', name: 'Market Bread', item: 'sourdough', qty: 15, pay: 340, days: 1, minRank: 1, desc: 'Fifteen sourdough loaves for the morning market stall.' },
  { id: 'school-muffins', name: 'School Muffins', item: 'blueberry-muffin', qty: 24, pay: 300, days: 1, minRank: 2, desc: 'Two dozen muffins for the school fair bake sale.' },
  { id: 'pie-shop', name: 'Pie Shop', item: 'apple-pie', qty: 8, pay: 360, days: 2, minRank: 2, desc: 'Eight apple pies for the pie shop window.' },
  { id: 'focaccia-lunch', name: 'Focaccia Lunch', item: 'focaccia', qty: 12, pay: 320, days: 1, minRank: 2, desc: 'Twelve focaccias for the lunch counter.' },
  { id: 'baguette-run', name: 'Baguette Run', item: 'baguette', qty: 30, pay: 340, days: 1, minRank: 1, desc: 'Thirty baguettes for the bistro dinner service.' },
  { id: 'mixed-trays', name: 'Mixed Trays', item: 'mixed', qty: 25, pay: 560, days: 2, minRank: 3, desc: 'Twenty-five trays of anything, for a cafe restock.' },
];

export const BAKERY_EVENTS = [
  { id: 'flour-shortage', name: 'Flour Shortage', text: 'Flour is scarce this week and prices climb.', effect: 'cost-up' },
  { id: 'morning-rush', name: 'Morning Rush', text: 'The morning crowd is hungry and paying well.', effect: 'sell-up' },
  { id: 'health-inspection', name: 'Health Inspection', text: 'An inspector is checking the ovens today.', effect: 'heat' },
  { id: 'rainy-morning', name: 'Rainy Morning', text: 'Rain keeps folk indoors, and orders pile up.', effect: 'orders-up' },
  { id: 'butter-glut', name: 'Butter Glut', text: 'Butter is cheap and plentiful this week.', effect: 'cost-down' },
  { id: 'burnt-batch', name: 'Burnt Batch', text: 'A batch burned in the oven and must be tossed.', effect: 'spoil' },
  { id: 'street-fair', name: 'Street Fair', text: 'The street fair wants trays, fast.', effect: 'orders-up' },
  { id: 'cold-snap', name: 'Cold Snap', text: 'Cold mornings have everyone buying warm bread.', effect: 'sell-up' },
  { id: 'oven-breakdown', name: 'Oven Breakdown', text: 'An oven broke down and ruined some trays.', effect: 'spoil' },
  { id: 'pastry-critic', name: 'Pastry Critic', text: 'A travelling critic shares hard-won wisdom.', effect: 'xp' },
];

export const BAKERY_RANKS = [
  { level: 0, name: 'Flour Hand', xp: 0, perk: 'Learning the ovens.' },
  { level: 1, name: 'Oven Tender', xp: 120, perk: 'Steadier hands, better prices.' },
  { level: 2, name: 'Head Baker', xp: 300, perk: 'The town knows your name.' },
  { level: 3, name: 'Bread Baron', xp: 620, perk: 'Cafes bid for your trays.' },
  { level: 4, name: 'Legend of the Oven', xp: 1100, perk: 'Your bakes are sung about in song.' },
];

export const BAKERY_HELPERS = [
  { id: 'apprentice', name: 'Nina', wage: 25, skill: 'haul', bonus: 0.2, desc: 'Nina the apprentice hauls flour sacks all day.' },
  { id: 'oven-keeper', name: 'Bruno', wage: 40, skill: 'age', bonus: 0.25, desc: 'Bruno keeps the ovens even and the glazes glossy.' },
  { id: 'market-runner', name: 'Lia', wage: 60, skill: 'sell', bonus: 0.15, desc: 'Lia runs trays to the market and charms the stallholders.' },
  { id: 'sugar-artist', name: 'Chef Odette', wage: 80, skill: 'brew', bonus: 0.3, desc: 'Chef Odette pipes sugar art that sells itself.' },
];

export const BAKERY_CHALLENGES = [
  { id: 'trays-100', name: 'A Hundred Trays', target: 'produced', goal: 100, xp: 80, desc: 'Bake a hundred trays in total.' },
  { id: 'sell-500', name: 'Five Hundred Sold', target: 'earned', goal: 500, xp: 120, desc: 'Earn five hundred from sales.' },
  { id: 'glaze-20', name: 'Glaze Twenty', target: 'aged', goal: 20, xp: 100, desc: 'Glaze twenty trays.' },
  { id: 'orders-10', name: 'Ten Orders Done', target: 'ordersDone', goal: 10, xp: 140, desc: 'Complete ten cafe orders.' },
  { id: 'streak-10', name: 'Ten Clean Batches', target: 'bestStreak', goal: 10, xp: 110, desc: 'Reach a ten-batch clean streak.' },
  { id: 'rank-3', name: 'Bread Baron', target: 'rank', goal: 3, xp: 150, desc: 'Reach rank three.' },
  { id: 'earn-2000', name: 'Two Thousand Earned', target: 'earned', goal: 2000, xp: 160, desc: 'Earn two thousand in total.' },
  { id: 'batches-50', name: 'Fifty Batches', target: 'batches', goal: 50, xp: 90, desc: 'Bake fifty batches.' },
];

export const BAKERY_ACHIEVEMENTS = [
  { id: 'first-bake', name: 'First Bake', check: 'batches', goal: 1, desc: 'Bake your very first batch.' },
  { id: 'first-sale', name: 'First Sale', check: 'sold', goal: 1, desc: 'Sell your first tray.' },
  { id: 'first-glaze', name: 'First Glaze', check: 'aged', goal: 1, desc: 'Glaze your first tray.' },
  { id: 'rank-2', name: 'Head Baker Rank', check: 'rank', goal: 2, desc: 'Reach the Head Baker rank.' },
  { id: 'rich-bake', name: 'Rich Baker', check: 'earned', goal: 2000, desc: 'Earn two thousand in total.' },
  { id: 'full-kit', name: 'Full Kit', check: 'upgradesCount', goal: 8, desc: 'Own every bakery upgrade.' },
  { id: 'no-burn', name: 'No Burn', check: 'spoiled', goal: 0, desc: 'Bake fifty batches without burning a single tray.' },
  { id: 'big-tray', name: 'Big Tray', check: 'bestBatch', goal: 20, desc: 'Bake a batch of twenty trays.' },
];

export const BAKERY_TIPS = [
  { id: 'fresh-first', name: 'Fresh First', text: 'Bake muffins first, they are quick and always sell.' },
  { id: 'glaze-it', name: 'Glaze It', text: 'Glaze everything you can afford; glazed trays pay far better.' },
  { id: 'butter-care', name: 'Butter Care', text: 'Mind your butter and your proofing cabinet, or batches burn.' },
  { id: 'fair-stock', name: 'Fair Stock', text: 'Stock up before the street fair; hungry crowds pay double.' },
  { id: 'oven-watch', name: 'Oven Watch', text: 'Watch the oven temperature, or the morning bake burns.' },
  { id: 'order-first', name: 'Order First', text: 'Take the cafe order first, then bake exactly for it.' },
  { id: 'cake-money', name: 'Cake Money', text: 'Chocolate cake is slow but it is the best coin per tray.' },
  { id: 'flour-space', name: 'Flour Space', text: 'Watch your stock cap; a silo buys you forty more slots.' },
];

export const BAKERY_RECORDS = [
  { id: 'biggest-tray', name: 'Biggest Tray', stat: 'bestBatch', unit: 'loaves', desc: 'Largest single batch ever baked.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'dollars', desc: 'Most coin earned in total.' },
  { id: 'most-baked', name: 'Most Baked', stat: 'produced', unit: 'trays', desc: 'Most trays baked in total.' },
  { id: 'most-glazed', name: 'Most Glazed', stat: 'aged', unit: 'trays', desc: 'Most trays glazed.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'trays', desc: 'Longest clean baking streak.' },
];

export const BAKERY_MARKET_EVENTS = [
  { id: 'croissant-craze', name: 'Croissant Craze', items: ['croissant'], mult: 1.4, desc: 'Everyone wants croissants this week.' },
  { id: 'bread-glut', name: 'Bread Glut', items: ['sourdough', 'rye-bread'], mult: 0.6, desc: 'Too much bread on the market, prices sag.' },
  { id: 'cake-rush', name: 'Cake Rush', items: ['chocolate-cake'], mult: 1.5, desc: 'Chocolate cake is the talk of the town.' },
  { id: 'pie-season', name: 'Pie Season', items: ['apple-pie'], mult: 1.3, desc: 'Apple season lifts the pie trade.' },
  { id: 'muffin-morning', name: 'Muffin Morning', items: ['blueberry-muffin'], mult: 1.35, desc: 'Muffin mornings are booming.' },
  { id: 'baguette-night', name: 'Baguette Night', items: ['baguette'], mult: 1.3, desc: 'The bistros all want baguettes tonight.' },
  { id: 'cinnamon-trend', name: 'Cinnamon Trend', items: ['cinnamon-roll'], mult: 1.25, desc: 'Cinnamon rolls are suddenly fashionable.' },
  { id: 'focaccia-summer', name: 'Focaccia Summer', items: ['focaccia'], mult: 1.3, desc: 'Summer lunches call for focaccia.' },
  { id: 'tart-week', name: 'Tart Week', items: ['lemon-tart'], mult: 1.2, desc: 'Lemon tarts are in demand.' },
  { id: 'flour-tax', name: 'Flour Tax', items: ['chocolate-cake', 'lemon-tart'], mult: 0.7, desc: 'A new tax bites the fine bakes hardest.' },
  { id: 'dry-week', name: 'Dry Week', items: ['sourdough', 'banana-bread'], mult: 0.75, desc: 'A dry spell cools the everyday loaves.' },
  { id: 'bake-festival', name: 'Bake Festival', items: ['croissant', 'cinnamon-roll', 'blueberry-muffin'], mult: 1.2, desc: 'The bake festival lifts every morning favourite.' },
];

export const BAKERY_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Spring crowds return to the cafes.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Steady summer hunger.' },
  { id: 'autumn', name: 'Autumn', mult: 1.1, desc: 'Harvest season brings the fairs.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold winter mornings thin the crowds.' },
];

export const BAKERY_LEADERBOARD = [
  { name: 'Rosa', total: 3800, desc: 'Mama Rosa still leads the board.' },
  { name: 'Bruno', total: 2600, desc: 'Oven keeper with a steady hand.' },
  { name: 'You', total: 0, desc: 'Your running total.' },
  { name: 'Nina', total: 1400, desc: 'The apprentice is climbing fast.' },
  { name: 'Odette', total: 2100, desc: 'Chef Odette and her sugar art.' },
];

export const BAKERY_QUICK_START = [
  'Bake muffins first, they are quick and always sell.',
  'Glaze everything affordable, glazed trays pay far better.',
  'Buy the proofing cabinet before the master oven, burnt batches hurt.',
  'Take cafe orders then bake for them, never the other way round.',
  'Sell the morning bake by noon, while it is still warm.',
  'Check the price board every morning before you bake.',
];

export const BAKERY_META = {
  system: 'bakery',
  version: '7b-C',
  author: 'builder-3',
  label: 'Bakery',
  owner: 'Mama Rosa the Baker',
  itemCount: 12,
};

// ---- module helpers, arrow style ----

export const bakeryRankFor = (xp) => {
  let idx = 0;
  BAKERY_RANKS.forEach((r, i) => { if (xp >= r.xp) idx = i; });
  return idx;
};

const bakeEffectSet = (owned) => {
  const out = new Set();
  (owned || []).forEach((id) => {
    const found = BAKERY_UPGRADES.find((u) => u.id === id);
    if (found) out.add(found.effect);
  });
  return out;
};

export const bakeryItemById = (id) => BAKED_GOODS.find((g) => g.id === id) || null;

export const bakeryPriceFor = (id, drift, rank, upgrades) => {
  const good = bakeryItemById(id);
  if (!good) return 0;
  const fx = bakeEffectSet(upgrades);
  const d = drift && typeof drift[id] === 'number' ? drift[id] : 0;
  let price = good.basePrice * (1 + d) * (1 + 0.1 * rank);
  if (good.difficulty >= 3 && fx.has('strong-plus')) price *= 1.3;
  if (fx.has('sell-plus')) price *= 1.15;
  return Math.max(1, Math.round(price * 10) / 10);
};

export const bakerySellPriceFor = (id, premium, drift, rank, upgrades) => {
  const regular = bakeryPriceFor(id, drift, rank, upgrades);
  if (regular === 0) return 0;
  return Math.max(1, Math.round((premium ? regular * 1.5 : regular) * 10) / 10);
};

export const bakeryCostFor = (id, qty, upgrades) => {
  const good = bakeryItemById(id);
  if (!good) return 0;
  const fx = bakeEffectSet(upgrades);
  const raw = Math.round(good.basePrice * 0.4 * qty);
  return Math.max(1, fx.has('cost-down') ? Math.round(raw * 0.8) : raw);
};

export const bakeryStockCap = (upgrades) => (bakeEffectSet(upgrades).has('stock-plus') ? 80 : 40);

export const bakerySpoilChance = (item, upgrades) => {
  let chance = 0.04 + item.difficulty * 0.015;
  if (bakeEffectSet(upgrades).has('spoil-down')) chance /= 2;
  return chance;
};

export const bakeryBestSeller = (drift, rank, upgrades) => {
  let best = null;
  BAKED_GOODS.forEach((g) => {
    const price = bakeryPriceFor(g.id, drift, rank, upgrades);
    if (best === null || price > best.price) best = { id: g.id, price };
  });
  return best;
};

export const bakeryCheapest = (drift, rank, upgrades) => {
  let low = null;
  BAKED_GOODS.forEach((g) => {
    const price = bakeryPriceFor(g.id, drift, rank, upgrades);
    if (low === null || price < low.price) low = { id: g.id, price };
  });
  return low;
};

export const bakeryTipFor = (day) => BAKERY_TIPS[((day % BAKERY_TIPS.length) + BAKERY_TIPS.length) % BAKERY_TIPS.length];

export const bakeryLeaderboardWith = (playerTotal) => {
  const rows = BAKERY_LEADERBOARD
    .map((row) => ({ name: row.name, total: row.name === 'You' ? playerTotal : row.total, desc: row.desc }))
    .sort((a, b) => b.total - a.total);
  return rows.map((row, i) => ({ rank: i + 1, name: row.name, total: row.total, desc: row.desc }));
};

// ---- system factory ----

const BAKERY_STATE_KEYS = [
  'xp', 'rank', 'batches', 'produced', 'sold', 'earned', 'spent', 'spoiled', 'aged',
  'ordersDone', 'ordersFailed', 'streak', 'bestStreak', 'bestBatch', 'inventory', 'premium',
  'upgrades', 'activeOrder', 'orderProgress', 'cooldown', 'dayDrift', 'lastDay', 'dailySold',
  'dailyEarned', 'heatTaken', 'eventsSeen', 'lastEvent', 'perfectBatches',
];

export function createBakerySystem(ctx) {
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

  // The live state lives directly on the returned object.
  const sys = { name: 'bakery' };
  const zeroMap = () => {
    const m = {};
    BAKED_GOODS.forEach((g) => { m[g.id] = 0; });
    return m;
  };
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
  sys.inventory = zeroMap();
  sys.premium = zeroMap();
  sys.upgrades = [];
  sys.activeOrder = null;
  sys.orderProgress = 0;
  sys.cooldown = 0;
  sys.dayDrift = zeroMap();
  sys.lastDay = 1;
  sys.dailySold = 0;
  sys.dailyEarned = 0;
  sys.heatTaken = 0;
  sys.eventsSeen = 0;
  sys.lastEvent = 'none';
  sys.perfectBatches = 0;

  const bumpRank = () => {
    const next = bakeryRankFor(sys.xp);
    if (next > sys.rank) {
      sys.rank = next;
      log('Rank up! You are now ' + BAKERY_RANKS[next].name + '.');
    }
  };
  const addXp = (n) => { sys.xp += n; bumpRank(); };
  const allStock = () => BAKED_GOODS.reduce((s, g) => s + sys.inventory[g.id] + sys.premium[g.id], 0);
  const heldOf = (id) => sys.inventory[id] + sys.premium[id];
  const removeStock = (id, qty) => {
    let rest = qty;
    const reg = Math.min(sys.inventory[id], rest);
    sys.inventory[id] -= reg;
    rest -= reg;
    if (rest > 0) sys.premium[id] -= rest;
  };

  const runEvent = (ev) => {
    switch (ev.effect) {
      case 'cost-up':
        BAKED_GOODS.forEach((g) => { sys.dayDrift[g.id] += 0.15; });
        break;
      case 'cost-down':
        BAKED_GOODS.forEach((g) => { sys.dayDrift[g.id] -= 0.1; });
        break;
      case 'sell-up':
        BAKED_GOODS.forEach((g) => { sys.dayDrift[g.id] += 0.2; });
        break;
      case 'xp':
        addXp(25);
        break;
      case 'orders-up':
        addXp(10);
        break;
      case 'heat':
        addHeat(1);
        sys.heatTaken += 1;
        break;
      case 'spoil': {
        const stocked = BAKED_GOODS.filter((g) => heldOf(g.id) > 0);
        if (stocked.length) {
          const pick = stocked[Math.floor(rng() * stocked.length)];
          const lost = Math.min(2, heldOf(pick.id));
          removeStock(pick.id, lost);
          sys.spoiled += lost;
          log('Burnt ' + lost + ' trays of ' + pick.name + '.');
        }
        break;
      }
      default:
        break;
    }
  };

  sys.bake = (id, qty) => {
    const amount = qty === undefined ? 1 : qty;
    const good = bakeryItemById(id);
    if (!good) return { ok: false, reason: 'unknown-item' };
    if (!amount || amount <= 0) return { ok: false, reason: 'bad-quantity' };
    if (sys.cooldown > 0) return { ok: false, reason: 'cooldown' };
    const cost = bakeryCostFor(id, amount, sys.upgrades);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash' };
    if (allStock() + amount > bakeryStockCap(sys.upgrades)) return { ok: false, reason: 'stock-full' };
    addCash(-cost);
    sys.spent += cost;
    let made = amount;
    if (rng() < bakerySpoilChance(good, sys.upgrades)) {
      const lost = 1 + Math.floor(rng() * Math.max(1, Math.floor(amount / 2)));
      made = Math.max(0, amount - lost);
      sys.spoiled += lost;
      sys.streak = 0;
      log('A batch of ' + good.name + ' burnt, ' + lost + ' trays lost.');
    } else {
      sys.streak += 1;
      if (sys.streak > sys.bestStreak) sys.bestStreak = sys.streak;
      if (good.difficulty >= 4) sys.perfectBatches += 1;
    }
    sys.inventory[id] += made;
    sys.batches += 1;
    sys.produced += made;
    if (made > sys.bestBatch) sys.bestBatch = made;
    sys.cooldown = bakeEffectSet(sys.upgrades).has('brew-fast')
      ? Math.max(1, Math.floor(good.time * 0.8))
      : good.time;
    addXp(4 + made + good.difficulty * 2);
    // The heat branch is guarded off in the bakery: baking never adds heat,
    // even for the hardest bakes.
    if (false && good.difficulty >= 4 && rng() < 0.15) {
      addHeat(1);
      sys.heatTaken += 1;
    }
    if (sys.activeOrder) {
      const order = sys.activeOrder;
      if (order.item === 'mixed' || order.item === id) sys.orderProgress += made;
    }
    log('Baked ' + made + ' trays of ' + good.name + '.');
    return { ok: true, item: id, made, cost, cooldown: sys.cooldown };
  };

  sys.glazeBatch = (id, qty) => {
    const amount = qty === undefined ? 1 : qty;
    const good = bakeryItemById(id);
    if (!good) return { ok: false, reason: 'unknown-item' };
    if (!amount || amount <= 0) return { ok: false, reason: 'bad-quantity' };
    if (sys.inventory[id] < amount) return { ok: false, reason: 'not-enough-stock' };
    sys.inventory[id] -= amount;
    sys.premium[id] += amount;
    sys.aged += amount;
    addXp(6 + amount * 2);
    log('Glazed ' + amount + ' trays of ' + good.name + '.');
    return { ok: true, item: id, quantity: amount, premium: sys.premium[id] };
  };

  sys.sell = (id, qty) => {
    const good = bakeryItemById(id);
    if (!good) return { ok: false, reason: 'unknown-item' };
    if (!qty || qty <= 0) return { ok: false, reason: 'bad-quantity' };
    if (heldOf(id) < qty) return { ok: false, reason: 'not-enough-stock' };
    const premQty = Math.min(sys.premium[id], qty);
    const regQty = qty - premQty;
    const total = Math.round((premQty * bakerySellPriceFor(id, true, sys.dayDrift, sys.rank, sys.upgrades)
      + regQty * bakerySellPriceFor(id, false, sys.dayDrift, sys.rank, sys.upgrades)) * 10) / 10;
    sys.premium[id] -= premQty;
    sys.inventory[id] -= regQty;
    sys.sold += qty;
    sys.earned += total;
    sys.dailySold += qty;
    sys.dailyEarned += total;
    addCash(total);
    addXp(qty);
    return { ok: true, total, quantity: qty };
  };

  sys.sellAll = () => {
    let total = 0;
    let units = 0;
    const lines = [];
    BAKED_GOODS.forEach((good) => {
      const qty = heldOf(good.id);
      if (qty <= 0) return;
      const premQty = Math.min(sys.premium[good.id], qty);
      const regQty = qty - premQty;
      const lineTotal = Math.round((premQty * bakerySellPriceFor(good.id, true, sys.dayDrift, sys.rank, sys.upgrades)
        + regQty * bakerySellPriceFor(good.id, false, sys.dayDrift, sys.rank, sys.upgrades)) * 10) / 10;
      sys.premium[good.id] -= premQty;
      sys.inventory[good.id] -= regQty;
      total += lineTotal;
      units += qty;
      lines.push({ id: good.id, quantity: qty, total: lineTotal });
    });
    if (units === 0) return { ok: false, reason: 'nothing-to-sell' };
    total = Math.round(total * 10) / 10;
    sys.sold += units;
    sys.earned += total;
    sys.dailySold += units;
    sys.dailyEarned += total;
    addCash(total);
    addXp(units);
    return { ok: true, total, units, lines };
  };

  sys.buyUpgrade = (id) => {
    const up = BAKERY_UPGRADES.find((u) => u.id === id);
    if (!up) return { ok: false, reason: 'unknown-upgrade' };
    if (sys.upgrades.includes(id)) return { ok: false, reason: 'already-owned' };
    if (getCash() < up.cost) return { ok: false, reason: 'not-enough-cash' };
    addCash(-up.cost);
    sys.spent += up.cost;
    sys.upgrades.push(id);
    addXp(20);
    log('Bought the ' + up.name + ' upgrade.');
    return { ok: true, id };
  };

  sys.takeOrder = (id) => {
    const order = BAKERY_ORDERS.find((o) => o.id === id);
    if (!order) return { ok: false, reason: 'unknown-order' };
    if (sys.activeOrder) return { ok: false, reason: 'order-active' };
    if (sys.rank < order.minRank) return { ok: false, reason: 'rank-too-low' };
    const today = getDay();
    sys.activeOrder = { ...order, takenDay: today, deadline: today + order.days };
    sys.orderProgress = 0;
    log('Took the order: ' + order.name + '.');
    return { ok: true, order: sys.activeOrder };
  };

  sys.deliverOrder = () => {
    const order = sys.activeOrder;
    if (!order) return { ok: false, reason: 'no-active-order' };
    if (order.item === 'mixed') {
      if (allStock() < order.qty) return { ok: false, reason: 'not-enough-stock' };
      let need = order.qty;
      for (const good of BAKED_GOODS) {
        if (need <= 0) break;
        const take = Math.min(heldOf(good.id), need);
        removeStock(good.id, take);
        need -= take;
      }
    } else {
      if (heldOf(order.item) < order.qty) return { ok: false, reason: 'not-enough-stock' };
      removeStock(order.item, order.qty);
      sys.orderProgress = order.qty;
    }
    const pay = order.pay + 40 * sys.rank;
    sys.activeOrder = null;
    sys.orderProgress = 0;
    sys.ordersDone += 1;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    addXp(60);
    log('Delivered ' + order.name + ' for ' + pay + '.');
    return { ok: true, pay };
  };

  sys.abandonOrder = () => {
    if (!sys.activeOrder) return { ok: false, reason: 'no-active-order' };
    sys.activeOrder = null;
    sys.orderProgress = 0;
    sys.ordersFailed += 1;
    return { ok: true };
  };

  sys.haggle = () => {
    if (sys.rank < 1) return { ok: false, reason: 'rank-too-low' };
    const bonus = Math.round((0.05 + 0.03 * sys.rank) * 100) / 100;
    const haggled = rng() < 0.55;
    return { ok: true, haggled, bonus };
  };

  sys.priceBoard = () => BAKED_GOODS.map((good) => ({
    id: good.id,
    name: good.name,
    price: bakeryPriceFor(good.id, sys.dayDrift, sys.rank, sys.upgrades),
    drift: sys.dayDrift[good.id],
    stock: sys.inventory[good.id],
    premium: sys.premium[good.id],
  }));

  sys.orderList = () => BAKERY_ORDERS.map((o) => ({
    id: o.id, name: o.name, item: o.item, quantity: o.qty, pay: o.pay, days: o.days, minRank: o.minRank,
  }));

  sys.dailyEvent = () => {
    sys.eventsSeen += 1;
    const weather = getWeather();
    if (weather && weather.condition === 'rain' && rng() < 0.3) {
      sys.lastEvent = 'rainy-day';
      return { ok: true, event: 'rainy-day', name: 'Rainy Day' };
    }
    if (rng() < 0.18) {
      const ev = BAKERY_EVENTS[Math.floor(rng() * BAKERY_EVENTS.length)];
      runEvent(ev);
      sys.lastEvent = ev.id;
      return { ok: true, event: ev.id, name: ev.name };
    }
    sys.lastEvent = 'none';
    return { ok: true, event: 'none', name: 'No event' };
  };

  sys.tasteTest = (id) => {
    const good = bakeryItemById(id);
    if (!good) return { ok: false, reason: 'unknown-item' };
    if (heldOf(id) <= 0) return { ok: false, reason: 'no-stock' };
    const raw = 0.5 + rng() * 0.5 + sys.rank * 0.02 + good.difficulty * 0.01;
    const quality = Math.round(Math.min(1, raw) * 100) / 100;
    addXp(5);
    const grade = quality >= 0.9 ? 'outstanding' : quality >= 0.7 ? 'solid' : 'needs work';
    return { ok: true, item: id, quality, verdict: grade + ' — says Mama Rosa' };
  };

  sys.tick = (dt) => {
    sys.cooldown = Math.max(0, sys.cooldown - dt);
  };

  sys.tickDay = (day) => {
    if (day === sys.lastDay) return;
    sys.lastDay = day;
    BAKED_GOODS.forEach((g) => {
      const drifted = sys.dayDrift[g.id] + (rng() - 0.5) * 0.1;
      sys.dayDrift[g.id] = Math.max(-0.5, Math.min(0.6, drifted));
    });
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

  sys.serialize = () => {
    const copy = {};
    BAKERY_STATE_KEYS.forEach((key) => {
      copy[key] = JSON.parse(JSON.stringify(sys[key]));
    });
    return copy;
  };

  sys.deserialize = (saved) => {
    if (!saved || typeof saved !== 'object') return;
    BAKERY_STATE_KEYS.forEach((key) => {
      if (key in saved) sys[key] = JSON.parse(JSON.stringify(saved[key]));
    });
    BAKED_GOODS.forEach((g) => {
      if (typeof sys.inventory[g.id] !== 'number') sys.inventory[g.id] = 0;
      if (typeof sys.premium[g.id] !== 'number') sys.premium[g.id] = 0;
      if (typeof sys.dayDrift[g.id] !== 'number') sys.dayDrift[g.id] = 0;
    });
    bumpRank();
  };

  sys.stats = () => {
    const stock = allStock();
    const eff = sys.produced + sys.spoiled === 0
      ? 100
      : Math.round((sys.produced / (sys.produced + sys.spoiled)) * 100);
    return {
      rank: BAKERY_RANKS[sys.rank].name,
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
      stockCap: bakeryStockCap(sys.upgrades),
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

  sys.hudLine = () => {
    if (sys.cooldown > 0) return 'Bakery — baking, ' + Math.ceil(sys.cooldown) + 's left';
    if (sys.activeOrder) return 'Order: ' + sys.activeOrder.name + ' ' + sys.orderProgress + '/' + sys.activeOrder.qty;
    const stock = allStock();
    if (stock > 0) return 'Bakery — ' + stock + ' trays in stock';
    return '';
  };

  sys.interact = () => {
    const pos = getPlayerPos();
    const dist = Math.hypot(pos.x - (-180), pos.z - 90);
    if (dist > 25) return false;
    const stocked = BAKED_GOODS.find((g) => heldOf(g.id) > 0);
    if (stocked) {
      sys.sell(stocked.id, 1);
      return true;
    }
    const cheap = bakeryCheapest(sys.dayDrift, sys.rank, sys.upgrades);
    return sys.bake(cheap.id, 1);
  };

  return sys;
}

// ---- extras factory ----

export function createBakeryExtras(system) {
  const hired = [];
  const claimed = [];
  let wagesPaid = 0;
  let donated = 0;
  let rep = 0;

  const valueOf = (field) => {
    if (field === 'upgradesCount') return system.upgrades.length;
    return system[field] || 0;
  };

  const extras = { helpers: [], claimed: [], wagesPaid: 0, donated: 0, rep: 0 };
  Object.defineProperty(extras, 'helpers', { get: () => hired.map((h) => ({ ...h })) });
  Object.defineProperty(extras, 'claimed', { get: () => [...claimed] });
  Object.defineProperty(extras, 'wagesPaid', { get: () => wagesPaid });
  Object.defineProperty(extras, 'donated', { get: () => donated });
  Object.defineProperty(extras, 'rep', { get: () => rep });

  extras.hireHelper = (id) => {
    const helper = BAKERY_HELPERS.find((h) => h.id === id);
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
    hired.forEach((h) => { due += h.wage; });
    wagesPaid += due;
    return { ok: true, due, helpers: hired.map((h) => ({ ...h })), wagesPaid };
  };

  extras.helperBonus = (skill) => {
    let sum = 0;
    hired.forEach((h) => { if (h.skill === skill) sum += h.bonus; });
    return sum;
  };

  extras.challenges = () => BAKERY_CHALLENGES.map((ch) => {
    const value = Math.floor(valueOf(ch.target));
    return { id: ch.id, name: ch.name, value, goal: ch.goal, done: value >= ch.goal };
  });

  extras.claimChallenge = (id) => {
    const ch = BAKERY_CHALLENGES.find((c) => c.id === id);
    if (!ch) return { ok: false, reason: 'unknown-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const value = Math.floor(valueOf(ch.target));
    if (value < ch.goal) return { ok: false, reason: 'not-done', value, goal: ch.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  };

  extras.achievements = () => BAKERY_ACHIEVEMENTS.map((ach) => {
    const done = ach.check === 'spoiled'
      ? system.batches >= 50 && system.spoiled === 0
      : valueOf(ach.check) >= ach.goal;
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
    return { ok: true, quantity: qty, reputation: rep, note: 'Mama Rosa thanks you for the donation.' };
  };

  extras.clearStale = () => {
    let cleared = 0;
    BAKED_GOODS.forEach((good) => {
      if (good.difficulty <= 1) {
        cleared += system.inventory[good.id];
        system.inventory[good.id] = 0;
      }
    });
    return { ok: true, cleared };
  };

  extras.stockReport = () => {
    let stock = 0;
    let premium = 0;
    BAKED_GOODS.forEach((good) => {
      stock += system.inventory[good.id];
      premium += system.premium[good.id];
    });
    const cap = bakeryStockCap(system.upgrades);
    return { ok: true, stock, premium, cap, free: cap - stock - premium };
  };

  return extras;
}
