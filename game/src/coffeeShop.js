// Coffee shop — Barista Luna brews twelve drinks from espresso to
// affogato, pours latte art and serves offices, hotels and exam-night
// students. Pure logic, no rendering, no imports. The game wires this
// file through the standard context with safe defaults.

export const COFFEE_MENU = [
  { id: 'espresso', name: 'Espresso', basePrice: 8, time: 1, difficulty: 1, caffeine: 63, beans: 'dark roast', milk: 'none', desc: 'A short, sharp espresso with a golden crema.' },
  { id: 'latte', name: 'Latte', basePrice: 14, time: 2, difficulty: 1, caffeine: 63, beans: 'medium roast', milk: 'steamed milk', desc: 'Silky steamed milk over a gentle espresso shot.' },
  { id: 'cappuccino', name: 'Cappuccino', basePrice: 13, time: 2, difficulty: 2, caffeine: 63, beans: 'medium roast', milk: 'foamed milk', desc: 'Equal parts espresso, steamed milk and airy foam.' },
  { id: 'cold-brew', name: 'Cold Brew', basePrice: 16, time: 5, difficulty: 2, caffeine: 200, beans: 'coarse roast', milk: 'none', desc: 'Slow-steeped cold brew, smooth and twice as strong.' },
  { id: 'mocha', name: 'Mocha', basePrice: 17, time: 2, difficulty: 2, caffeine: 95, beans: 'dark roast', milk: 'chocolate milk', desc: 'Espresso and dark chocolate under a cloud of milk.' },
  { id: 'americano', name: 'Americano', basePrice: 10, time: 1, difficulty: 1, caffeine: 94, beans: 'dark roast', milk: 'hot water', desc: 'Espresso lengthened with hot water, black and bold.' },
  { id: 'flat-white', name: 'Flat White', basePrice: 15, time: 2, difficulty: 3, caffeine: 126, beans: 'medium roast', milk: 'microfoam', desc: 'A double shot under velvet microfoam, strong and smooth.' },
  { id: 'macchiato', name: 'Macchiato', basePrice: 11, time: 1, difficulty: 2, caffeine: 63, beans: 'dark roast', milk: 'milk foam', desc: 'An espresso marked with a spoon of foam.' },
  { id: 'affogato', name: 'Affogato', basePrice: 18, time: 2, difficulty: 3, caffeine: 63, beans: 'espresso roast', milk: 'vanilla gelato', desc: 'Hot espresso poured over vanilla gelato, dessert and coffee at once.' },
  { id: 'turkish-coffee', name: 'Turkish Coffee', basePrice: 12, time: 3, difficulty: 3, caffeine: 60, beans: 'fine roast', milk: 'none', desc: 'Fine-ground coffee brewed slow in the cezve, thick and sweet.' },
  { id: 'iced-latte', name: 'Iced Latte', basePrice: 15, time: 2, difficulty: 1, caffeine: 63, beans: 'medium roast', milk: 'cold milk', desc: 'Cold milk and espresso over ice, the summer staple.' },
  { id: 'caramel-macchiato', name: 'Caramel Macchiato', basePrice: 18, time: 3, difficulty: 2, caffeine: 63, beans: 'medium roast', milk: 'caramel milk', desc: 'Vanilla milk and espresso finished with a caramel drizzle.' },
];

export const COFFEE_SHOP_UPGRADES = [
  { id: 'espresso-machine', name: 'Espresso Machine', cost: 120, desc: 'A gleaming machine that pulls shots fast and even.', effect: 'brew-fast' },
  { id: 'bean-roaster', name: 'Bean Roaster', cost: 180, desc: 'Your own roaster, cutting the cost of every brew.', effect: 'cost-down' },
  { id: 'milk-frother', name: 'Milk Frother', cost: 220, desc: 'A steam wand that never lets a shot spoil.', effect: 'spoil-down' },
  { id: 'window-seats', name: 'Window Seats', cost: 300, desc: 'Sunny window seats where cups fetch a better price.', effect: 'sell-plus' },
  { id: 'bean-silo', name: 'Bean Silo', cost: 260, desc: 'A tall silo that doubles your stock room.', effect: 'stock-plus' },
  { id: 'latte-tools', name: 'Latte Tools', cost: 350, desc: 'Fine pitchers and pens for pouring latte art.', effect: 'age-plus' },
  { id: 'delivery-bike', name: 'Delivery Bike', cost: 480, desc: 'A sturdy bike for hauling bulk orders to offices.', effect: 'bulk' },
  { id: 'master-grinder', name: 'Master Grinder', cost: 750, desc: 'The master grinder, coaxing top coin from the finest cups.', effect: 'strong-plus' },
];

export const COFFEE_SHOP_ORDERS = [
  { id: 'office-20', name: 'Office Twenty', item: 'latte', qty: 20, pay: 320, days: 1, minRank: 0, desc: 'The office upstairs wants twenty lattes before the meeting.' },
  { id: 'wedding-coffee', name: 'Wedding Coffee', item: 'affogato', qty: 6, pay: 320, days: 2, minRank: 3, desc: 'Six affogatos for a wedding dessert table.' },
  { id: 'study-group', name: 'Study Group', item: 'cold-brew', qty: 15, pay: 300, days: 1, minRank: 1, desc: 'Fifteen cold brews for an all-night study group.' },
  { id: 'hotel-lobby', name: 'Hotel Lobby', item: 'cappuccino', qty: 18, pay: 300, days: 1, minRank: 2, desc: 'Eighteen cappuccinos for the hotel lobby rush.' },
  { id: 'gym-rush', name: 'Gym Rush', item: 'americano', qty: 24, pay: 320, days: 1, minRank: 1, desc: 'Twenty-four americanos for the gym morning crowd.' },
  { id: 'gallery-night', name: 'Gallery Night', item: 'flat-white', qty: 10, pay: 340, days: 2, minRank: 3, desc: 'Ten flat whites for the gallery opening night.' },
  { id: 'morning-run', name: 'Morning Run', item: 'espresso', qty: 30, pay: 320, days: 1, minRank: 1, desc: 'Thirty espressos for the morning commuter run.' },
  { id: 'mixed-cups', name: 'Mixed Cups', item: 'mixed', qty: 25, pay: 560, days: 2, minRank: 3, desc: 'Twenty-five cups of anything, for an office restock.' },
];

export const COFFEE_SHOP_EVENTS = [
  { id: 'bean-shortage', name: 'Bean Shortage', text: 'Beans are scarce this week and prices climb.', effect: 'cost-up' },
  { id: 'morning-rush', name: 'Morning Rush', text: 'The morning crowd is thirsty and paying well.', effect: 'sell-up' },
  { id: 'health-inspection', name: 'Health Inspection', text: 'An inspector is checking the machines today.', effect: 'heat' },
  { id: 'rainy-morning', name: 'Rainy Morning', text: 'Rain keeps folk indoors, and orders pile up.', effect: 'orders-up' },
  { id: 'milk-glut', name: 'Milk Glut', text: 'Milk is cheap and plentiful this week.', effect: 'cost-down' },
  { id: 'burnt-shot', name: 'Burnt Shot', text: 'A burnt shot ruined some cups.', effect: 'spoil' },
  { id: 'street-fair', name: 'Street Fair', text: 'The street fair wants cups, fast.', effect: 'orders-up' },
  { id: 'cold-snap', name: 'Cold Snap', text: 'Cold mornings have everyone buying hot coffee.', effect: 'sell-up' },
  { id: 'machine-breakdown', name: 'Machine Breakdown', text: 'A machine broke down and ruined some cups.', effect: 'spoil' },
  { id: 'coffee-critic', name: 'Coffee Critic', text: 'A travelling critic shares hard-won wisdom.', effect: 'xp' },
];

export const COFFEE_SHOP_RANKS = [
  { level: 0, name: 'Bean Grinder', xp: 0, perk: 'Learning the machines.' },
  { level: 1, name: 'Barista', xp: 120, perk: 'Steadier hands, better prices.' },
  { level: 2, name: 'Head Barista', xp: 300, perk: 'The town knows your name.' },
  { level: 3, name: 'Roast Master', xp: 620, perk: 'Offices bid for your cups.' },
  { level: 4, name: 'Legend of the Grind', xp: 1100, perk: 'Your cups are sung about in song.' },
];

export const COFFEE_SHOP_HELPERS = [
  { id: 'apprentice', name: 'Milo', wage: 25, skill: 'haul', bonus: 0.2, desc: 'Milo the apprentice hauls bean sacks all day.' },
  { id: 'roast-keeper', name: 'Ivy', wage: 40, skill: 'age', bonus: 0.25, desc: 'Ivy keeps the roasts even and the art pretty.' },
  { id: 'counter-runner', name: 'Sam', wage: 60, skill: 'sell', bonus: 0.15, desc: 'Sam runs cups to the tables and charms the regulars.' },
  { id: 'milk-artist', name: 'Chef Noor', wage: 80, skill: 'brew', bonus: 0.3, desc: 'Chef Noor pours milk art that sells itself.' },
];

export const COFFEE_SHOP_CHALLENGES = [
  { id: 'cups-100', name: 'A Hundred Cups', target: 'produced', goal: 100, xp: 80, desc: 'Brew a hundred cups in total.' },
  { id: 'sell-500', name: 'Five Hundred Sold', target: 'earned', goal: 500, xp: 120, desc: 'Earn five hundred from sales.' },
  { id: 'art-20', name: 'Art Twenty', target: 'aged', goal: 20, xp: 100, desc: 'Pour twenty latte arts.' },
  { id: 'orders-10', name: 'Ten Orders Done', target: 'ordersDone', goal: 10, xp: 140, desc: 'Complete ten office orders.' },
  { id: 'streak-10', name: 'Ten Clean Batches', target: 'bestStreak', goal: 10, xp: 110, desc: 'Reach a ten-batch clean streak.' },
  { id: 'rank-3', name: 'Roast Master', target: 'rank', goal: 3, xp: 150, desc: 'Reach rank three.' },
  { id: 'earn-2000', name: 'Two Thousand Earned', target: 'earned', goal: 2000, xp: 160, desc: 'Earn two thousand in total.' },
  { id: 'batches-50', name: 'Fifty Batches', target: 'batches', goal: 50, xp: 90, desc: 'Brew fifty batches.' },
];

export const COFFEE_SHOP_ACHIEVEMENTS = [
  { id: 'first-cup', name: 'First Cup', check: 'batches', goal: 1, desc: 'Brew your very first cup.' },
  { id: 'first-sale', name: 'First Sale', check: 'sold', goal: 1, desc: 'Sell your first cup.' },
  { id: 'first-art', name: 'First Art', check: 'aged', goal: 1, desc: 'Pour your first latte art.' },
  { id: 'rank-2', name: 'Head Barista Rank', check: 'rank', goal: 2, desc: 'Reach the Head Barista rank.' },
  { id: 'rich-coffee', name: 'Rich Coffee', check: 'earned', goal: 2000, desc: 'Earn two thousand in total.' },
  { id: 'full-kit', name: 'Full Kit', check: 'upgradesCount', goal: 8, desc: 'Own every coffee shop upgrade.' },
  { id: 'no-burn', name: 'No Burn', check: 'spoiled', goal: 0, desc: 'Brew fifty batches without burning a single shot.' },
  { id: 'big-cup', name: 'Big Cup', check: 'bestBatch', goal: 20, desc: 'Brew a batch of twenty cups.' },
];

export const COFFEE_SHOP_TIPS = [
  { id: 'fresh-first', name: 'Fresh First', text: 'Brew espresso first, it is quick and always sells.' },
  { id: 'art-it', name: 'Art It', text: 'Pour latte art whenever you can afford it; art cups pay far better.' },
  { id: 'bean-care', name: 'Bean Care', text: 'Mind your beans and your frother, or shots burn.' },
  { id: 'fair-stock', name: 'Fair Stock', text: 'Stock up before the street fair; thirsty crowds pay double.' },
  { id: 'grinder-watch', name: 'Grinder Watch', text: 'Watch the grinder setting, or the morning brew turns bitter.' },
  { id: 'order-first', name: 'Order First', text: 'Take the office order first, then brew exactly for it.' },
  { id: 'cold-brew-money', name: 'Cold Brew Money', text: 'Cold brew is slow but it is the best coin per cup.' },
  { id: 'bean-space', name: 'Bean Space', text: 'Watch your stock cap; a silo buys you forty more slots.' },
];

export const COFFEE_SHOP_RECORDS = [
  { id: 'biggest-cup', name: 'Biggest Cup', stat: 'bestBatch', unit: 'cups', desc: 'Largest single batch ever brewed.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'dollars', desc: 'Most coin earned in total.' },
  { id: 'most-brewed', name: 'Most Brewed', stat: 'produced', unit: 'cups', desc: 'Most cups brewed in total.' },
  { id: 'most-art', name: 'Most Art', stat: 'aged', unit: 'arts', desc: 'Most latte arts poured.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'cups', desc: 'Longest clean brewing streak.' },
];

export const COFFEE_SHOP_MARKET_EVENTS = [
  { id: 'latte-craze', name: 'Latte Craze', items: ['latte'], mult: 1.4, desc: 'Everyone wants lattes this week.' },
  { id: 'espresso-glut', name: 'Espresso Glut', items: ['espresso', 'americano'], mult: 0.6, desc: 'Too much espresso on the market, prices sag.' },
  { id: 'coldbrew-rush', name: 'Cold Brew Rush', items: ['cold-brew'], mult: 1.5, desc: 'Cold brew is the talk of the town.' },
  { id: 'cappuccino-season', name: 'Cappuccino Season', items: ['cappuccino'], mult: 1.3, desc: 'Cappuccino season is here.' },
  { id: 'mocha-morning', name: 'Mocha Morning', items: ['mocha'], mult: 1.35, desc: 'Mocha mornings are booming.' },
  { id: 'flatwhite-night', name: 'Flat White Night', items: ['flat-white'], mult: 1.3, desc: 'The galleries all want flat whites tonight.' },
  { id: 'affogato-trend', name: 'Affogato Trend', items: ['affogato'], mult: 1.25, desc: 'Affogatos are suddenly fashionable.' },
  { id: 'iced-summer', name: 'Iced Summer', items: ['iced-latte'], mult: 1.3, desc: 'Summer afternoons call for iced lattes.' },
  { id: 'turkish-week', name: 'Turkish Week', items: ['turkish-coffee'], mult: 1.2, desc: 'Turkish coffee is in demand.' },
  { id: 'bean-tax', name: 'Bean Tax', items: ['cold-brew', 'affogato'], mult: 0.7, desc: 'A new tax bites the fine cups hardest.' },
  { id: 'dry-week', name: 'Dry Week', items: ['latte', 'mocha'], mult: 0.75, desc: 'A dry spell cools the everyday cups.' },
  { id: 'coffee-festival', name: 'Coffee Festival', items: ['latte', 'cappuccino', 'cold-brew'], mult: 1.2, desc: 'The coffee festival lifts every morning favourite.' },
];

export const COFFEE_SHOP_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Spring crowds return to the window seats.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Steady summer thirst.' },
  { id: 'autumn', name: 'Autumn', mult: 1.1, desc: 'Harvest season brings the fairs.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold winter mornings thin the crowds.' },
];

export const COFFEE_SHOP_LEADERBOARD = [
  { name: 'Luna', total: 3600, desc: 'Barista Luna still leads the board.' },
  { name: 'Ivy', total: 2400, desc: 'Roast keeper with a steady hand.' },
  { name: 'You', total: 0, desc: 'Your running total.' },
  { name: 'Milo', total: 1200, desc: 'The apprentice is climbing fast.' },
  { name: 'Noor', total: 2000, desc: 'Chef Noor and her milk art.' },
];

export const COFFEE_SHOP_QUICK_START = [
  'Brew espresso first, it is quick and always sells.',
  'Pour latte art whenever affordable, art cups pay far better.',
  'Buy the milk frother before the master grinder, burnt shots hurt.',
  'Take office orders then brew for them, never the other way round.',
  'Serve the morning brew by 10am, while the rush is hot.',
  'Check the price board every morning before you brew.',
];

export const COFFEE_SHOP_META = {
  system: 'coffeeShop',
  version: '7b-C',
  author: 'builder-3',
  label: 'Coffee Shop',
  owner: 'Barista Luna the Roaster',
  itemCount: 12,
};

// ---- module helpers ----

const COFFEE_UPGRADE_EFFECTS = new Map(COFFEE_SHOP_UPGRADES.map((u) => [u.id, u.effect]));

export function coffeeShopRankFor(xp) {
  return COFFEE_SHOP_RANKS.reduce((rank, r, i) => (xp >= r.xp ? i : rank), 0);
}

function coffeeEffects(owned) {
  const fx = new Set();
  for (const id of owned || []) {
    const eff = COFFEE_UPGRADE_EFFECTS.get(id);
    if (eff) fx.add(eff);
  }
  return fx;
}

export function coffeeShopItemById(id) {
  for (const drink of COFFEE_MENU) {
    if (drink.id === id) return drink;
  }
  return null;
}

export function coffeeShopPriceFor(id, drift, rank, upgrades) {
  const drink = coffeeShopItemById(id);
  if (!drink) return 0;
  const fx = coffeeEffects(upgrades);
  const d = drift && typeof drift[id] === 'number' ? drift[id] : 0;
  let price = drink.basePrice * (1 + d) * (1 + 0.1 * rank);
  if (drink.difficulty >= 3 && fx.has('strong-plus')) price *= 1.3;
  if (fx.has('sell-plus')) price *= 1.15;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function coffeeShopSellPriceFor(id, premium, drift, rank, upgrades) {
  const regular = coffeeShopPriceFor(id, drift, rank, upgrades);
  return regular === 0 ? 0 : Math.max(1, Math.round((premium ? regular * 1.5 : regular) * 10) / 10);
}

export function coffeeShopCostFor(id, qty, upgrades) {
  const drink = coffeeShopItemById(id);
  if (!drink) return 0;
  const raw = Math.round(drink.basePrice * 0.4 * qty);
  return Math.max(1, coffeeEffects(upgrades).has('cost-down') ? Math.round(raw * 0.8) : raw);
}

export function coffeeShopStockCap(upgrades) {
  return coffeeEffects(upgrades).has('stock-plus') ? 80 : 40;
}

export function coffeeShopSpoilChance(item, upgrades) {
  const chance = 0.04 + item.difficulty * 0.015;
  return coffeeEffects(upgrades).has('spoil-down') ? chance / 2 : chance;
}

export function coffeeShopBestSeller(drift, rank, upgrades) {
  let best = null;
  let bestPrice = -Infinity;
  for (const drink of COFFEE_MENU) {
    const price = coffeeShopPriceFor(drink.id, drift, rank, upgrades);
    if (price > bestPrice) {
      bestPrice = price;
      best = { id: drink.id, price };
    }
  }
  return best;
}

export function coffeeShopCheapest(drift, rank, upgrades) {
  let low = null;
  let lowPrice = Infinity;
  for (const drink of COFFEE_MENU) {
    const price = coffeeShopPriceFor(drink.id, drift, rank, upgrades);
    if (price < lowPrice) {
      lowPrice = price;
      low = { id: drink.id, price };
    }
  }
  return low;
}

export function coffeeShopTipFor(day) {
  const n = COFFEE_SHOP_TIPS.length;
  return COFFEE_SHOP_TIPS[((day % n) + n) % n];
}

export function coffeeShopLeaderboardWith(playerTotal) {
  const rows = [];
  for (const row of COFFEE_SHOP_LEADERBOARD) {
    rows.push({ name: row.name, total: row.name === 'You' ? playerTotal : row.total, desc: row.desc });
  }
  rows.sort((a, b) => b.total - a.total);
  return rows.map((row, i) => ({ rank: i + 1, name: row.name, total: row.total, desc: row.desc }));
}

// ---- system factory ----

export function createCoffeeShopSystem(ctx) {
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

  const st = {
    xp: 0, rank: 0, batches: 0, produced: 0, sold: 0, earned: 0, spent: 0, spoiled: 0,
    aged: 0, ordersDone: 0, ordersFailed: 0, streak: 0, bestStreak: 0, bestBatch: 0,
    inventory: {}, premium: {}, upgrades: [], activeOrder: null, orderProgress: 0,
    cooldown: 0, dayDrift: {}, lastDay: 1, dailySold: 0, dailyEarned: 0, heatTaken: 0,
    eventsSeen: 0, lastEvent: 'none', perfectBatches: 0,
  };
  for (const drink of COFFEE_MENU) {
    st.inventory[drink.id] = 0;
    st.premium[drink.id] = 0;
    st.dayDrift[drink.id] = 0;
  }
  const KEYS = Object.keys(st);

  function rankUp() {
    const next = coffeeShopRankFor(st.xp);
    if (next > st.rank) {
      st.rank = next;
      log('Rank up! You are now ' + COFFEE_SHOP_RANKS[next].name + '.');
    }
  }
  function giveXp(n) {
    st.xp += n;
    rankUp();
  }
  function stockSum() {
    let total = 0;
    for (const drink of COFFEE_MENU) total += st.inventory[drink.id] + st.premium[drink.id];
    return total;
  }
  function held(id) {
    return st.inventory[id] + st.premium[id];
  }
  function consume(id, qty) {
    let rest = qty;
    const reg = st.inventory[id] < rest ? st.inventory[id] : rest;
    st.inventory[id] -= reg;
    rest -= reg;
    if (rest > 0) st.premium[id] -= rest;
  }
  function driftAll(amount) {
    for (const drink of COFFEE_MENU) st.dayDrift[drink.id] += amount;
  }
  function spoilStocked() {
    const stocked = [];
    for (const drink of COFFEE_MENU) {
      if (held(drink.id) > 0) stocked.push(drink);
    }
    if (stocked.length === 0) return;
    const pick = stocked[Math.floor(rng() * stocked.length)];
    const lost = Math.min(2, held(pick.id));
    consume(pick.id, lost);
    st.spoiled += lost;
    log('Burnt ' + lost + ' cups of ' + pick.name + '.');
  }

  const sys = { name: 'coffeeShop' };
  for (const k of KEYS) {
    Object.defineProperty(sys, k, {
      get() { return st[k]; },
      set(v) { st[k] = v; },
      enumerable: true,
      configurable: true,
    });
  }

  function brew(id, qty) {
    const amount = qty === undefined ? 1 : qty;
    const drink = coffeeShopItemById(id);
    if (!drink) return { ok: false, reason: 'unknown-item' };
    if (!amount || amount <= 0) return { ok: false, reason: 'bad-quantity' };
    if (st.cooldown > 0) return { ok: false, reason: 'cooldown' };
    const cost = coffeeShopCostFor(id, amount, st.upgrades);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash' };
    if (stockSum() + amount > coffeeShopStockCap(st.upgrades)) return { ok: false, reason: 'stock-full' };
    addCash(-cost);
    st.spent += cost;
    let made = amount;
    if (rng() < coffeeShopSpoilChance(drink, st.upgrades)) {
      const lost = 1 + Math.floor(rng() * Math.max(1, Math.floor(amount / 2)));
      made = amount - lost < 0 ? 0 : amount - lost;
      st.spoiled += lost;
      st.streak = 0;
      log('A batch of ' + drink.name + ' burnt, ' + lost + ' cups lost.');
    } else {
      st.streak += 1;
      st.bestStreak = st.streak > st.bestStreak ? st.streak : st.bestStreak;
      if (drink.difficulty >= 4) st.perfectBatches += 1;
    }
    st.inventory[id] += made;
    st.batches += 1;
    st.produced += made;
    st.bestBatch = made > st.bestBatch ? made : st.bestBatch;
    st.cooldown = coffeeEffects(st.upgrades).has('brew-fast')
      ? Math.max(1, Math.floor(drink.time * 0.8))
      : drink.time;
    giveXp(4 + made + drink.difficulty * 2);
    // The heat branch is guarded off in the coffee shop: brewing never
    // adds heat, whatever the difficulty.
    if (false && drink.difficulty >= 4 && rng() < 0.15) {
      addHeat(1);
      st.heatTaken += 1;
    }
    if (st.activeOrder) {
      const order = st.activeOrder;
      if (order.item === 'mixed' || order.item === id) st.orderProgress += made;
    }
    log('Brewed ' + made + ' cups of ' + drink.name + '.');
    return { ok: true, item: id, made, cost, cooldown: st.cooldown };
  }

  function latteArt(id, qty) {
    const amount = qty === undefined ? 1 : qty;
    const drink = coffeeShopItemById(id);
    if (!drink) return { ok: false, reason: 'unknown-item' };
    if (!amount || amount <= 0) return { ok: false, reason: 'bad-quantity' };
    if (st.inventory[id] < amount) return { ok: false, reason: 'not-enough-stock' };
    st.inventory[id] -= amount;
    st.premium[id] += amount;
    st.aged += amount;
    giveXp(6 + amount * 2);
    log('Poured latte art on ' + amount + ' cups of ' + drink.name + '.');
    return { ok: true, item: id, quantity: amount, premium: st.premium[id] };
  }

  function sell(id, qty) {
    const drink = coffeeShopItemById(id);
    if (!drink) return { ok: false, reason: 'unknown-item' };
    if (!qty || qty <= 0) return { ok: false, reason: 'bad-quantity' };
    if (held(id) < qty) return { ok: false, reason: 'not-enough-stock' };
    const premQty = st.premium[id] < qty ? st.premium[id] : qty;
    const regQty = qty - premQty;
    const total = Math.round((premQty * coffeeShopSellPriceFor(id, true, st.dayDrift, st.rank, st.upgrades)
      + regQty * coffeeShopSellPriceFor(id, false, st.dayDrift, st.rank, st.upgrades)) * 10) / 10;
    st.premium[id] -= premQty;
    st.inventory[id] -= regQty;
    st.sold += qty;
    st.earned += total;
    st.dailySold += qty;
    st.dailyEarned += total;
    addCash(total);
    giveXp(qty);
    return { ok: true, total, quantity: qty };
  }

  function sellAll() {
    let total = 0;
    let units = 0;
    const lines = [];
    for (const drink of COFFEE_MENU) {
      const qty = held(drink.id);
      if (qty <= 0) continue;
      const premQty = st.premium[drink.id] < qty ? st.premium[drink.id] : qty;
      const regQty = qty - premQty;
      const lineTotal = Math.round((premQty * coffeeShopSellPriceFor(drink.id, true, st.dayDrift, st.rank, st.upgrades)
        + regQty * coffeeShopSellPriceFor(drink.id, false, st.dayDrift, st.rank, st.upgrades)) * 10) / 10;
      st.premium[drink.id] -= premQty;
      st.inventory[drink.id] -= regQty;
      total += lineTotal;
      units += qty;
      lines.push({ id: drink.id, quantity: qty, total: lineTotal });
    }
    if (units === 0) return { ok: false, reason: 'nothing-to-sell' };
    total = Math.round(total * 10) / 10;
    st.sold += units;
    st.earned += total;
    st.dailySold += units;
    st.dailyEarned += total;
    addCash(total);
    giveXp(units);
    return { ok: true, total, units, lines };
  }

  function buyUpgrade(id) {
    const up = COFFEE_SHOP_UPGRADES.find((u) => u.id === id);
    if (!up) return { ok: false, reason: 'unknown-upgrade' };
    if (st.upgrades.includes(id)) return { ok: false, reason: 'already-owned' };
    if (getCash() < up.cost) return { ok: false, reason: 'not-enough-cash' };
    addCash(-up.cost);
    st.spent += up.cost;
    st.upgrades.push(id);
    giveXp(20);
    log('Bought the ' + up.name + ' upgrade.');
    return { ok: true, id };
  }

  function takeOrder(id) {
    const order = COFFEE_SHOP_ORDERS.find((o) => o.id === id);
    if (!order) return { ok: false, reason: 'unknown-order' };
    if (st.activeOrder) return { ok: false, reason: 'order-active' };
    if (st.rank < order.minRank) return { ok: false, reason: 'rank-too-low' };
    const today = getDay();
    st.activeOrder = { ...order, takenDay: today, deadline: today + order.days };
    st.orderProgress = 0;
    log('Took the order: ' + order.name + '.');
    return { ok: true, order: st.activeOrder };
  }

  function deliverOrder() {
    const order = st.activeOrder;
    if (!order) return { ok: false, reason: 'no-active-order' };
    if (order.item === 'mixed') {
      if (stockSum() < order.qty) return { ok: false, reason: 'not-enough-stock' };
      let need = order.qty;
      for (const drink of COFFEE_MENU) {
        if (need <= 0) break;
        const take = held(drink.id) < need ? held(drink.id) : need;
        consume(drink.id, take);
        need -= take;
      }
    } else {
      if (held(order.item) < order.qty) return { ok: false, reason: 'not-enough-stock' };
      consume(order.item, order.qty);
      st.orderProgress = order.qty;
    }
    const pay = order.pay + 40 * st.rank;
    st.activeOrder = null;
    st.orderProgress = 0;
    st.ordersDone += 1;
    st.earned += pay;
    st.dailyEarned += pay;
    addCash(pay);
    giveXp(60);
    log('Delivered ' + order.name + ' for ' + pay + '.');
    return { ok: true, pay };
  }

  function abandonOrder() {
    if (!st.activeOrder) return { ok: false, reason: 'no-active-order' };
    st.activeOrder = null;
    st.orderProgress = 0;
    st.ordersFailed += 1;
    return { ok: true };
  }

  function haggle() {
    if (st.rank < 1) return { ok: false, reason: 'rank-too-low' };
    const bonus = Math.round((0.05 + 0.03 * st.rank) * 100) / 100;
    const haggled = rng() < 0.55;
    return { ok: true, haggled, bonus };
  }

  function priceBoard() {
    const rows = [];
    for (const drink of COFFEE_MENU) {
      rows.push({
        id: drink.id,
        name: drink.name,
        price: coffeeShopPriceFor(drink.id, st.dayDrift, st.rank, st.upgrades),
        drift: st.dayDrift[drink.id],
        stock: st.inventory[drink.id],
        premium: st.premium[drink.id],
      });
    }
    return rows;
  }

  function orderList() {
    const rows = [];
    for (const o of COFFEE_SHOP_ORDERS) {
      rows.push({ id: o.id, name: o.name, item: o.item, quantity: o.qty, pay: o.pay, days: o.days, minRank: o.minRank });
    }
    return rows;
  }

  function dailyEvent() {
    st.eventsSeen += 1;
    const weather = getWeather();
    if (weather && weather.condition === 'rain' && rng() < 0.3) {
      st.lastEvent = 'rainy-day';
      return { ok: true, event: 'rainy-day', name: 'Rainy Day' };
    }
    if (rng() < 0.18) {
      const ev = COFFEE_SHOP_EVENTS[Math.floor(rng() * COFFEE_SHOP_EVENTS.length)];
      if (ev.effect === 'cost-up') driftAll(0.15);
      else if (ev.effect === 'cost-down') driftAll(-0.1);
      else if (ev.effect === 'sell-up') driftAll(0.2);
      else if (ev.effect === 'xp') giveXp(25);
      else if (ev.effect === 'orders-up') giveXp(10);
      else if (ev.effect === 'heat') { addHeat(1); st.heatTaken += 1; }
      else if (ev.effect === 'spoil') spoilStocked();
      st.lastEvent = ev.id;
      return { ok: true, event: ev.id, name: ev.name };
    }
    st.lastEvent = 'none';
    return { ok: true, event: 'none', name: 'No event' };
  }

  function tasteTest(id) {
    const drink = coffeeShopItemById(id);
    if (!drink) return { ok: false, reason: 'unknown-item' };
    if (held(id) <= 0) return { ok: false, reason: 'no-stock' };
    const raw = 0.5 + rng() * 0.5 + st.rank * 0.02 + drink.difficulty * 0.01;
    const quality = Math.round(Math.min(1, raw) * 100) / 100;
    giveXp(5);
    const grade = quality >= 0.9 ? 'outstanding' : quality >= 0.7 ? 'solid' : 'needs work';
    return { ok: true, item: id, quality, verdict: grade + ' — says Barista Luna' };
  }

  function tick(dt) {
    st.cooldown = st.cooldown - dt < 0 ? 0 : st.cooldown - dt;
  }

  function tickDay(day) {
    if (day === st.lastDay) return;
    st.lastDay = day;
    for (const drink of COFFEE_MENU) {
      const drifted = st.dayDrift[drink.id] + (rng() - 0.5) * 0.1;
      st.dayDrift[drink.id] = drifted < -0.5 ? -0.5 : drifted > 0.6 ? 0.6 : drifted;
    }
    st.dailySold = 0;
    st.dailyEarned = 0;
    if (st.activeOrder && day > st.activeOrder.deadline && st.orderProgress < st.activeOrder.qty) {
      st.activeOrder = null;
      st.orderProgress = 0;
      st.ordersFailed += 1;
      log('An order expired undelivered.');
    }
    dailyEvent();
  }

  function serialize() {
    const copy = {};
    for (const key of KEYS) copy[key] = JSON.parse(JSON.stringify(st[key]));
    return copy;
  }

  function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    for (const key of KEYS) {
      if (key in saved) st[key] = JSON.parse(JSON.stringify(saved[key]));
    }
    for (const drink of COFFEE_MENU) {
      if (typeof st.inventory[drink.id] !== 'number') st.inventory[drink.id] = 0;
      if (typeof st.premium[drink.id] !== 'number') st.premium[drink.id] = 0;
      if (typeof st.dayDrift[drink.id] !== 'number') st.dayDrift[drink.id] = 0;
    }
    rankUp();
  }

  function stats() {
    const stock = stockSum();
    const eff = st.produced + st.spoiled === 0
      ? 100
      : Math.round((st.produced / (st.produced + st.spoiled)) * 100);
    return {
      rank: COFFEE_SHOP_RANKS[st.rank].name,
      xp: st.xp,
      batches: st.batches,
      produced: st.produced,
      sold: st.sold,
      earned: Math.round(st.earned),
      spent: st.spent,
      spoiled: st.spoiled,
      aged: st.aged,
      ordersDone: st.ordersDone,
      ordersFailed: st.ordersFailed,
      streak: st.streak,
      bestStreak: st.bestStreak,
      bestBatch: st.bestBatch,
      stock,
      stockCap: coffeeShopStockCap(st.upgrades),
      upgrades: st.upgrades.length,
      activeOrder: st.activeOrder ? st.activeOrder.id : null,
      orderProgress: st.orderProgress,
      cooldown: Math.round(st.cooldown * 10) / 10,
      dailyEarned: Math.round(st.dailyEarned),
      heatTaken: st.heatTaken,
      eventsSeen: st.eventsSeen,
      lastEvent: st.lastEvent,
      perfectBatches: st.perfectBatches,
      efficiency: eff,
    };
  }

  function hudLine() {
    if (st.cooldown > 0) return 'Coffee Shop — brewing, ' + Math.ceil(st.cooldown) + 's left';
    if (st.activeOrder) return 'Order: ' + st.activeOrder.name + ' ' + st.orderProgress + '/' + st.activeOrder.qty;
    const stock = stockSum();
    if (stock > 0) return 'Coffee Shop — ' + stock + ' cups in stock';
    return '';
  }

  function interact() {
    const pos = getPlayerPos();
    if (Math.hypot(pos.x - (-90), pos.z - (-200)) > 25) return false;
    for (const drink of COFFEE_MENU) {
      if (held(drink.id) > 0) {
        sell(drink.id, 1);
        return true;
      }
    }
    const cheap = coffeeShopCheapest(st.dayDrift, st.rank, st.upgrades);
    return brew(cheap.id, 1);
  }

  sys.brew = brew;
  sys.latteArt = latteArt;
  sys.sell = sell;
  sys.sellAll = sellAll;
  sys.buyUpgrade = buyUpgrade;
  sys.takeOrder = takeOrder;
  sys.deliverOrder = deliverOrder;
  sys.abandonOrder = abandonOrder;
  sys.haggle = haggle;
  sys.priceBoard = priceBoard;
  sys.orderList = orderList;
  sys.dailyEvent = dailyEvent;
  sys.tasteTest = tasteTest;
  sys.tick = tick;
  sys.tickDay = tickDay;
  sys.serialize = serialize;
  sys.deserialize = deserialize;
  sys.stats = stats;
  sys.hudLine = hudLine;
  sys.interact = interact;

  return sys;
}

// ---- extras factory ----

export function createCoffeeShopExtras(system) {
  const hired = [];
  const claimed = [];
  let wagesPaid = 0;
  let donated = 0;
  let rep = 0;

  function fieldValue(field) {
    if (field === 'upgradesCount') return system.upgrades.length;
    const v = system[field];
    return typeof v === 'number' ? v : 0;
  }

  const extras = {};

  extras.hireHelper = function (id) {
    const helper = COFFEE_SHOP_HELPERS.find((h) => h.id === id);
    if (!helper) return { ok: false, reason: 'unknown-helper' };
    for (const h of hired) {
      if (h.id === id) return { ok: false, reason: 'already-hired' };
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
    for (const h of hired) due += h.wage;
    wagesPaid += due;
    return { ok: true, due, helpers: hired.map((h) => ({ ...h })), wagesPaid };
  };

  extras.helperBonus = function (skill) {
    let sum = 0;
    for (const h of hired) {
      if (h.skill === skill) sum += h.bonus;
    }
    return sum;
  };

  extras.challenges = function () {
    const rows = [];
    for (const ch of COFFEE_SHOP_CHALLENGES) {
      const value = Math.floor(fieldValue(ch.target));
      rows.push({ id: ch.id, name: ch.name, value, goal: ch.goal, done: value >= ch.goal });
    }
    return rows;
  };

  extras.claimChallenge = function (id) {
    const ch = COFFEE_SHOP_CHALLENGES.find((c) => c.id === id);
    if (!ch) return { ok: false, reason: 'unknown-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const value = Math.floor(fieldValue(ch.target));
    if (value < ch.goal) return { ok: false, reason: 'not-done', value, goal: ch.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  };

  extras.achievements = function () {
    const rows = [];
    for (const ach of COFFEE_SHOP_ACHIEVEMENTS) {
      const done = ach.check === 'spoiled'
        ? system.batches >= 50 && system.spoiled === 0
        : fieldValue(ach.check) >= ach.goal;
      rows.push({ id: ach.id, name: ach.name, desc: ach.desc, done });
    }
    return rows;
  };

  extras.donate = function (id, qty) {
    if (!qty || qty <= 0) return { ok: false, reason: 'bad-quantity' };
    const held = (system.inventory[id] || 0) + (system.premium[id] || 0);
    if (held < qty) return { ok: false, reason: 'not-enough-stock', held };
    let left = qty;
    const reg = system.inventory[id] < left ? system.inventory[id] : left;
    system.inventory[id] -= reg;
    left -= reg;
    if (left > 0) system.premium[id] -= left;
    donated += qty;
    rep += Math.floor(qty / 10);
    return { ok: true, quantity: qty, reputation: rep, note: 'Barista Luna thanks you for the donation.' };
  };

  extras.clearStale = function () {
    let cleared = 0;
    for (const drink of COFFEE_MENU) {
      if (drink.difficulty <= 1) {
        cleared += system.inventory[drink.id];
        system.inventory[drink.id] = 0;
      }
    }
    return { ok: true, cleared };
  };

  extras.stockReport = function () {
    let stock = 0;
    let premium = 0;
    for (const drink of COFFEE_MENU) {
      stock += system.inventory[drink.id];
      premium += system.premium[drink.id];
    }
    const cap = coffeeShopStockCap(system.upgrades);
    return { ok: true, stock, premium, cap, free: cap - stock - premium };
  };

  Object.defineProperty(extras, 'helpers', { get: () => hired.map((h) => ({ ...h })) });
  Object.defineProperty(extras, 'claimed', { get: () => [...claimed] });
  Object.defineProperty(extras, 'wagesPaid', { get: () => wagesPaid });
  Object.defineProperty(extras, 'donated', { get: () => donated });
  Object.defineProperty(extras, 'rep', { get: () => rep });

  return extras;
}
