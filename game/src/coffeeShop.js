// Coffee Shop — Barista Luna turns beans, steam and dawn into gold.
// Brew twelve drinks on the espresso machine, pour latte art for the
// regulars, and keep the morning queue moving. A burnt shot is a dead
// shot, and the 8am rush forgives nothing.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const COFFEE_MENU = [
  {
      id: 'espresso',
      name: 'Espresso',
      basePrice: 8,
      time: 1,
      difficulty: 1,
      caffeine: 64,
      beans: 'arabica',
      milk: 'none',
      desc: 'A single shot, dark and syrupy, drunk standing at the counter.'
    },
  {
      id: 'latte',
      name: 'Caffe Latte',
      basePrice: 14,
      time: 2,
      difficulty: 1,
      caffeine: 64,
      beans: 'arabica',
      milk: 'steamed',
      desc: 'Silky steamed milk over a double shot — the city\'s default order.'
    },
  {
      id: 'cappuccino',
      name: 'Cappuccino',
      basePrice: 13,
      time: 2,
      difficulty: 2,
      caffeine: 64,
      beans: 'arabica',
      milk: 'foamed',
      desc: 'Equal thirds of espresso, milk and foam, dusted with cocoa.'
    },
  {
      id: 'cold-brew',
      name: 'Cold Brew',
      basePrice: 16,
      time: 5,
      difficulty: 2,
      caffeine: 120,
      beans: 'colombian',
      milk: 'none',
      desc: 'Eighteen hours of slow steeping — smooth, sweet and strong.'
    },
  {
      id: 'mocha',
      name: 'Mocha',
      basePrice: 17,
      time: 2,
      difficulty: 2,
      caffeine: 70,
      beans: 'arabica',
      milk: 'chocolate',
      desc: 'Espresso, chocolate and steamed milk — dessert in a cup.'
    },
  {
      id: 'americano',
      name: 'Americano',
      basePrice: 10,
      time: 1,
      difficulty: 1,
      caffeine: 80,
      beans: 'robusta',
      milk: 'none',
      desc: 'Espresso lengthened with hot water — long, dark and honest.'
    },
  {
      id: 'flat-white',
      name: 'Flat White',
      basePrice: 15,
      time: 2,
      difficulty: 3,
      caffeine: 64,
      beans: 'arabica',
      milk: 'microfoam',
      desc: 'Velvet microfoam over a double ristretto — the connoisseur\'s pick.'
    },
  {
      id: 'macchiato',
      name: 'Macchiato',
      basePrice: 11,
      time: 1,
      difficulty: 2,
      caffeine: 64,
      beans: 'arabica',
      milk: 'spoon foam',
      desc: 'An espresso marked with a spoon of foam. Small and fierce.'
    },
  {
      id: 'affogato',
      name: 'Affogato',
      basePrice: 18,
      time: 2,
      difficulty: 3,
      caffeine: 64,
      beans: 'espresso',
      milk: 'gelato',
      desc: 'A hot shot drowned over vanilla gelato — eaten with a spoon.'
    },
  {
      id: 'turkish-coffee',
      name: 'Turkish Coffee',
      basePrice: 12,
      time: 3,
      difficulty: 3,
      caffeine: 60,
      beans: 'arabica',
      milk: 'none',
      desc: 'Finely ground, slow-brewed in a cezve, served with a cube of delight.'
    },
  {
      id: 'iced-latte',
      name: 'Iced Latte',
      basePrice: 15,
      time: 2,
      difficulty: 1,
      caffeine: 64,
      beans: 'arabica',
      milk: 'cold',
      desc: 'Cold milk and ice over a double shot — summer in a glass.'
    },
  {
      id: 'caramel-macchiato',
      name: 'Caramel Macchiato',
      basePrice: 18,
      time: 3,
      difficulty: 2,
      caffeine: 64,
      beans: 'arabica',
      milk: 'vanilla',
      desc: 'Vanilla milk, espresso and a caramel crosshatch on top.'
    },
];

export const COFFEE_SHOP_UPGRADES = [
  { id: 'espresso-machine', name: 'Second Espresso Machine', cost: 120, desc: 'Brew 20% faster.', effect: 'brew-fast' },
  { id: 'bean-roaster', name: 'Bean Roaster', cost: 180, desc: 'Ingredient costs -20%.', effect: 'cost-down' },
  { id: 'milk-frother', name: 'Milk Frother', cost: 220, desc: 'Fewer burnt shots.', effect: 'spoil-down' },
  { id: 'window-seats', name: 'Window Seats', cost: 300, desc: 'Sales pay +15%.', effect: 'sell-plus' },
  { id: 'bean-silo', name: 'Bean Silo', cost: 260, desc: 'Hold +40 cups.', effect: 'stock-plus' },
  { id: 'latte-tools', name: 'Latte Art Tools', cost: 350, desc: 'Latte art pays +25%.', effect: 'age-plus' },
  { id: 'delivery-bike', name: 'Delivery Bike', cost: 480, desc: 'Sell in bulk to offices.', effect: 'bulk' },
  { id: 'master-grinder', name: 'Master Grinder', cost: 750, desc: 'Perfect shots: +30% on premium drinks.', effect: 'strong-plus' },
];

export const COFFEE_SHOP_ORDERS = [
  { id: 'office-20', name: 'Office Order', item: 'latte', qty: 20, pay: 320, days: 1, minRank: 0, desc: 'An office needs 20 lattes by 9am.' },
  { id: 'wedding-coffee', name: 'Wedding Coffee', item: 'affogato', qty: 6, pay: 320, days: 2, minRank: 3, desc: 'A wedding wants 6 affogatos for dessert.' },
  { id: 'study-group', name: 'Study Group', item: 'cold-brew', qty: 15, pay: 300, days: 1, minRank: 1, desc: 'Students order 15 cold brews for exam night.' },
  { id: 'hotel-lobby', name: 'Hotel Lobby', item: 'cappuccino', qty: 18, pay: 300, days: 1, minRank: 2, desc: 'A hotel needs 18 cappuccinos for breakfast.' },
  { id: 'gym-rush', name: 'Gym Rush', item: 'americano', qty: 24, pay: 320, days: 1, minRank: 1, desc: 'A gym orders 24 Americanos after training.' },
  { id: 'gallery-night', name: 'Gallery Night', item: 'flat-white', qty: 10, pay: 340, days: 2, minRank: 3, desc: 'A gallery opening orders 10 flat whites.' },
  { id: 'morning-run', name: 'Morning Run', item: 'espresso', qty: 30, pay: 320, days: 1, minRank: 1, desc: 'A taxi rank orders 30 espressos for dawn.' },
  { id: 'mixed-cups', name: 'Mixed Cups', item: 'mixed', qty: 25, pay: 560, days: 2, minRank: 3, desc: 'Any 25 cups for the harbour festival.' },
];

export const COFFEE_SHOP_EVENTS = [
  { id: 'bean-shortage', name: 'Bean Shortage', text: 'Beans are scarce — brewing costs more today.', effect: 'cost-up' },
  { id: 'morning-rush', name: 'Morning Rush', text: 'Commuters queue out the door — sales pay +20%.', effect: 'sell-up' },
  { id: 'health-inspection', name: 'Health Inspection', text: 'An inspector checks the machine. Keep it clean.', effect: 'heat' },
  { id: 'rainy-morning', name: 'Rainy Morning', text: 'Rain drives everyone in for hot coffee.', effect: 'orders-up' },
  { id: 'milk-glut', name: 'Milk Glut', text: 'Milk is cheap and plentiful today.', effect: 'cost-down' },
  { id: 'burnt-shot', name: 'Burnt Shot', text: 'The grinder runs hot — one cup may burn.', effect: 'spoil' },
  { id: 'street-fair', name: 'Street Fair', text: 'A fair opens outside — stalls order extra.', effect: 'orders-up' },
  { id: 'cold-snap', name: 'Cold Snap', text: 'Cold mornings — coffee flies off the counter.', effect: 'sell-up' },
  { id: 'machine-breakdown', name: 'Machine Breakdown', text: 'A machine sputters. Some stock is at risk.', effect: 'spoil' },
  { id: 'coffee-critic', name: 'Coffee Critic', text: 'A coffee critic visits and shares a trick.', effect: 'xp' },
];

export const COFFEE_SHOP_RANKS = [
  { level: 0, name: 'Bean Grinder', xp: 0, perk: 'Brew at base rate.' },
  { level: 1, name: 'Barista', xp: 120, perk: '+10% sale prices.' },
  { level: 2, name: 'Head Barista', xp: 300, perk: 'Burnt shots forgiven once a day.' },
  { level: 3, name: 'Roast Master', xp: 620, perk: '+20% sale prices, offices trust you.' },
  { level: 4, name: 'Legend of the Grind', xp: 1100, perk: '+30% sale prices, latte art doubled.' },
];

export const COFFEE_SHOP_HELPERS = [
  { id: 'apprentice', name: 'Milo the Apprentice', wage: 25, skill: 'haul', bonus: 0.15, desc: 'Grinds beans: +15% brew yield.' },
  { id: 'roast-keeper', name: 'Ivy the Roast Keeper', wage: 40, skill: 'age', bonus: 0.25, desc: 'Watches the roast: +25% latte art speed.' },
  { id: 'counter-runner', name: 'Sam the Runner', wage: 60, skill: 'sell', bonus: 0.12, desc: 'Knows every office: +12% sale prices.' },
  { id: 'milk-artist', name: 'Chef Noor', wage: 80, skill: 'brew', bonus: 0.2, desc: 'Milk artist: +20% brew quality.' },
];

export const COFFEE_SHOP_CHALLENGES = [
  { id: 'cups-100', name: 'First Hundred Cups', target: 'produced', goal: 100, xp: 80, desc: 'Brew 100 cups in total.' },
  { id: 'sell-500', name: 'Half Grand', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from coffee sales.' },
  { id: 'art-20', name: 'Latte Artist', target: 'aged', goal: 20, xp: 100, desc: 'Pour 20 latte arts.' },
  { id: 'orders-10', name: 'Office Favourite', target: 'ordersDone', goal: 10, xp: 140, desc: 'Complete 10 office orders.' },
  { id: 'streak-10', name: 'Clean Machine', target: 'bestStreak', goal: 10, xp: 110, desc: 'Brew 10 cups in a row without a burnt shot.' },
  { id: 'rank-3', name: 'Roast Master', target: 'rank', goal: 3, xp: 150, desc: 'Reach rank Roast Master.' },
  { id: 'earn-2000', name: 'Coffee Baron', target: 'earned', goal: 2000, xp: 160, desc: 'Earn $2,000 from the coffee shop.' },
  { id: 'batches-50', name: 'Busy Machine', target: 'batches', goal: 50, xp: 90, desc: 'Brew 50 batches.' },
];

export const COFFEE_SHOP_ACHIEVEMENTS = [
  { id: 'first-cup', name: 'First Cup', check: 'batches', goal: 1, desc: 'Brew your first cup.' },
  { id: 'first-sale', name: 'First Sale', check: 'sold', goal: 1, desc: 'Sell your first cup.' },
  { id: 'first-art', name: 'Art On', check: 'aged', goal: 1, desc: 'Pour your first latte art.' },
  { id: 'rank-2', name: 'Head Barista', check: 'rank', goal: 2, desc: 'Reach rank Head Barista.' },
  { id: 'rich-coffee', name: 'Coffee Rich', check: 'earned', goal: 2000, desc: 'Earn $2,000 from coffee.' },
  { id: 'full-kit', name: 'Full Kit', check: 'upgradesCount', goal: 8, desc: 'Own every coffee shop upgrade.' },
  { id: 'no-burn', name: 'Clean Hands', check: 'spoiled', goal: 0, desc: 'Brew 50 cups with zero burnt — checked at 50.' },
  { id: 'big-cup', name: 'Big Cup', check: 'bestBatch', goal: 20, desc: 'Brew 20 cups in one batch.' },
];

export const COFFEE_SHOP_TIPS = [
  { id: 'fresh-first', name: 'Fresh First', text: 'Fresh coffee pays double. Serve the morning brew by 10am.' },
  { id: 'art-it', name: 'Art It', text: 'Latte art pays far more than plain cups.' },
  { id: 'bean-care', name: 'Bean Care', text: 'Fresh beans are half the coffee. Never brew stale.' },
  { id: 'fair-stock', name: 'Fair Stock', text: 'Stock up before street fairs — prices jump 20%.' },
  { id: 'grinder-watch', name: 'Grinder Watch', text: 'A milk frother saves more cups than luck ever will.' },
  { id: 'order-first', name: 'Orders First', text: 'Take an office order, then brew for it.' },
  { id: 'cold-brew-money', name: 'Cold Brew Money', text: 'Cold brew costs the most and pays the most. Save it for exam nights.' },
  { id: 'bean-space', name: 'Bean Space', text: 'Buy a bean silo early — a full shelf is a stuck shop.' },
];

export const COFFEE_SHOP_RECORDS = [
  { id: 'biggest-cup', name: 'Biggest Cup', stat: 'bestBatch', unit: 'cups', desc: 'Most cups in one batch.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from coffee.' },
  { id: 'most-brewed', name: 'Most Brewed', stat: 'produced', unit: 'cups', desc: 'Most cups brewed.' },
  { id: 'most-art', name: 'Most Art', stat: 'aged', unit: 'arts', desc: 'Most latte arts poured.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'cups', desc: 'Longest clean brew streak.' },
];

export const COFFEE_SHOP_MARKET_EVENTS = [
  { id: 'latte-craze', name: 'Latte Craze', items: ["latte"], mult: 1.4, desc: 'Everyone wants lattes today.' },
  { id: 'espresso-glut', name: 'Espresso Glut', items: ["espresso", "americano"], mult: 0.6, desc: 'Too much espresso — prices crash.' },
  { id: 'coldbrew-rush', name: 'Cold Brew Rush', items: ["cold-brew"], mult: 1.5, desc: 'A cold brew craze sweeps the city.' },
  { id: 'cappuccino-season', name: 'Cappuccino Season', items: ["cappuccino"], mult: 1.3, desc: 'Cold mornings make cappuccino king.' },
  { id: 'mocha-morning', name: 'Mocha Morning', items: ["mocha"], mult: 1.35, desc: 'Mocha is the morning favourite.' },
  { id: 'flatwhite-night', name: 'Flat White Night', items: ["flat-white"], mult: 1.3, desc: 'Connoisseurs drive flat whites up.' },
  { id: 'affogato-trend', name: 'Affogato Trend', items: ["affogato"], mult: 1.25, desc: 'Affogato is suddenly fashionable.' },
  { id: 'iced-summer', name: 'Iced Summer', items: ["iced-latte"], mult: 1.3, desc: 'Summer heat loves iced lattes.' },
  { id: 'turkish-week', name: 'Turkish Week', items: ["turkish-coffee"], mult: 1.2, desc: 'Turkish coffee gets its week.' },
  { id: 'bean-tax', name: 'Bean Tax', items: ["cold-brew", "affogato"], mult: 0.7, desc: 'A luxury tax hits the premium drinks.' },
  { id: 'dry-week', name: 'Dry Week', items: ["latte", "mocha"], mult: 0.75, desc: 'A diet fad dries sales.' },
  { id: 'coffee-festival', name: 'Coffee Festival', items: ["latte", "cappuccino", "cold-brew"], mult: 1.2, desc: 'The festival lifts everything.' },
];

export const COFFEE_SHOP_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Fresh roast, fresh customers.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Festival season, steady thirst.' },
  { id: 'autumn', name: 'Autumn', mult: 1.1, desc: 'Harvest roasts and warm cups.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold and quiet, but coffee sells.' },
];

export const COFFEE_SHOP_LEADERBOARD = [
  { name: 'Luna', total: 4200, desc: 'The roaster. Untouchable.' },
  { name: 'Ivy', total: 2900, desc: 'Roast keeper for forty years.' },
  { name: 'You', total: 0, desc: 'Climbing.' },
  { name: 'Milo', total: 1500, desc: 'Fast hands, faster grinder.' },
  { name: 'Noor', total: 2400, desc: 'Milk artist.' },
];

export const COFFEE_SHOP_QUICK_START = [
  'Brew espresso first — cheap, fast, always sells.',
  'Pour latte art whenever you can afford the time.',
  'Buy the milk frother before the master grinder.',
  'Take office orders, then brew for them.',
  'Serve the morning brew by 10am — freshness pays.',
  'Check the price board every morning.',
];

export function coffeeShopRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < COFFEE_SHOP_RANKS.length; i++) {
    if (xp >= COFFEE_SHOP_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function coffeeShopPriceFor(itemId, dayDrift, rank, upgrades) {
  const item = COFFEE_MENU.find((x) => x.id === itemId);
  if (!item) return 0;
  let price = item.basePrice;
  price *= 1 + (dayDrift[itemId] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('master-grinder') && item.difficulty >= 3) price *= 1.3;
  if (upgrades.includes('window-seats')) price *= 1.15;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function coffeeShopSellPriceFor(itemId, premium, dayDrift, rank, upgrades) {
  let price = coffeeShopPriceFor(itemId, dayDrift, rank, upgrades);
  if (premium) price *= 1.5;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function coffeeShopCostFor(itemId, qty, upgrades) {
  const item = COFFEE_MENU.find((x) => x.id === itemId);
  if (!item) return 0;
  let cost = Math.round(item.basePrice * 0.4 * qty);
  if (upgrades.includes('bean-roaster')) cost = Math.round(cost * 0.8);
  return Math.max(1, cost);
}

export function coffeeShopStockCap(upgrades) {
  let cap = 40;
  if (upgrades.includes('bean-silo')) cap += 40;
  return cap;
}

export function coffeeShopSpoilChance(item, upgrades) {
  let chance = 0.04 + item.difficulty * 0.015;
  if (upgrades.includes('milk-frother')) chance *= 0.5;
  return chance;
}

export function coffeeShopItemById(itemId) {
  return COFFEE_MENU.find((x) => x.id === itemId) || null;
}

export function coffeeShopBestSeller(dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = 0;
  for (const item of COFFEE_MENU) {
    const price = coffeeShopPriceFor(item.id, dayDrift, rank, upgrades);
    if (price > bestPrice) { bestPrice = price; best = item.id; }
  }
  return best ? { id: best, price: bestPrice } : null;
}

export function coffeeShopCheapest(dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = Infinity;
  for (const item of COFFEE_MENU) {
    const price = coffeeShopPriceFor(item.id, dayDrift, rank, upgrades);
    if (price < bestPrice) { bestPrice = price; best = item.id; }
  }
  return best ? { id: best, price: bestPrice } : null;
}

export function createCoffeeShopExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;
  let donated = 0;
  let rep = 0;

  function hireHelper(id) {
    const h = COFFEE_SHOP_HELPERS.find((x) => x.id === id);
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
      const h = COFFEE_SHOP_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    let bonus = 0;
    for (const h of COFFEE_SHOP_HELPERS) {
      if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
    }
    return bonus;
  }

  function challenges() {
    return COFFEE_SHOP_CHALLENGES.map((ch) => {
      const v = system.state[ch.target] !== undefined ? system.state[ch.target] : (ch.target === 'upgradesCount' ? system.state.upgrades.length : 0);
      return { id: ch.id, name: ch.name, have: Math.floor(v), goal: ch.goal, done: v >= ch.goal };
    });
  }

  function claimChallenge(id) {
    const ch = COFFEE_SHOP_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const v = system.state[ch.target] !== undefined ? system.state[ch.target] : (ch.target === 'upgradesCount' ? system.state.upgrades.length : 0);
    if (v < ch.goal) return { ok: false, reason: 'not-done', have: Math.floor(v), goal: ch.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return COFFEE_SHOP_ACHIEVEMENTS.map((a) => {
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
    return { ok: true, qty, rep, note: 'The neighbourhood thanks you. Barista Luna the Roaster remembers.' };
  }

  function clearStale() {
    let cleared = 0;
    for (const item of COFFEE_MENU) {
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
    for (const item of COFFEE_MENU) {
      total += system.state.inventory[item.id] || 0;
      premiumTotal += system.state.premium[item.id] || 0;
    }
    const cap = coffeeShopStockCap(system.state.upgrades);
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

export function coffeeShopTipFor(day) {
  return COFFEE_SHOP_TIPS[day % COFFEE_SHOP_TIPS.length];
}

export function coffeeShopLeaderboardWith(playerTotal) {
  const board = COFFEE_SHOP_LEADERBOARD.map((e) => ({
    name: e.name, total: e.name === 'You' ? playerTotal : e.total, desc: e.desc,
  }));
  board.sort((a, b) => b.total - a.total);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export const COFFEE_SHOP_META = {
  system: 'coffeeShop', version: '7b-C', author: 'builder-3',
  label: 'Coffee Shop', owner: 'Barista Luna the Roaster',
  itemCount: COFFEE_MENU.length,
};

export function createCoffeeShopSystem(ctx) {
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
  for (const item of COFFEE_MENU) { state.inventory[item.id] = 0; state.premium[item.id] = 0; state.dayDrift[item.id] = 0; }

  function refreshRank() {
    const r = coffeeShopRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Coffee Shop rank up: ${COFFEE_SHOP_RANKS[r].name} — ${COFFEE_SHOP_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const item of COFFEE_MENU) {
      const roll = rng();
      if (roll < 0.3) state.dayDrift[item.id] = Math.round((rng() * 0.5 - 0.2) * 100) / 100;
      else if (roll < 0.4) state.dayDrift[item.id] = 0;
    }
  }

  function stockTotal() {
    let total = 0;
    for (const item of COFFEE_MENU) total += (state.inventory[item.id] || 0) + (state.premium[item.id] || 0);
    return total;
  }

  function brew(itemId, qty) {
    qty = qty === undefined ? 1 : qty;
    const item = COFFEE_MENU.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    if (state.cooldown > 0) return { ok: false, reason: 'cooling-down', cooldown: Math.round(state.cooldown) };
    const cost = coffeeShopCostFor(itemId, qty, state.upgrades);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    if (stockTotal() + qty > coffeeShopStockCap(state.upgrades)) return { ok: false, reason: 'stock-full', cap: coffeeShopStockCap(state.upgrades) };
    addCash(-cost);
    state.spent += cost;
    let made = qty;
    if (rng() < coffeeShopSpoilChance(item, state.upgrades)) {
      const lost = Math.max(1, Math.floor(qty / 2));
      made = qty - lost;
      state.spoiled += lost;
      state.streak = 0;
      log(`A cup of ${item.name} went wrong — ${lost} spoiled.`);
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
    if (state.upgrades.includes('espresso-machine')) speed = Math.max(1, Math.round(speed * 0.8));
    state.cooldown = speed;
    gainXp(4 + made + item.difficulty * 2);
    if (false && item.difficulty >= 4 && rng() < 0.15) {
      addHeat(1);
      state.heatTaken += 1;
      log('Someone official is sniffing around the strong stuff. Careful.');
    }
    if (state.activeOrder) checkOrder(itemId, made);
    log(`Brew ${made}x ${item.name} for $${cost}.`);
    return { ok: true, item: itemId, qty: made, cost, cooldown: state.cooldown };
  }

  function latteArt(itemId, qty) {
    qty = qty === undefined ? 1 : qty;
    const item = COFFEE_MENU.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = state.inventory[itemId] || 0;
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    state.inventory[itemId] -= qty;
    state.premium[itemId] += qty;
    state.aged += qty;
    gainXp(6 + qty * 2);
    log(`Latte Art: ${qty}x ${item.name} set aside as premium stock.`);
    return { ok: true, item: itemId, qty, premium: state.premium[itemId] };
  }

  function sell(itemId, qty) {
    const item = COFFEE_MENU.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = (state.inventory[itemId] || 0) + (state.premium[itemId] || 0);
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    let left = qty;
    let total = 0;
    const takePrem = Math.min(state.premium[itemId] || 0, left);
    if (takePrem > 0) {
      const unit = coffeeShopSellPriceFor(itemId, true, state.dayDrift, state.rank, state.upgrades);
      total += unit * takePrem;
      state.premium[itemId] -= takePrem;
      left -= takePrem;
    }
    if (left > 0) {
      const unit = coffeeShopSellPriceFor(itemId, false, state.dayDrift, state.rank, state.upgrades);
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
    for (const item of COFFEE_MENU) {
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
    const u = COFFEE_SHOP_UPGRADES.find((x) => x.id === id);
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
    const ord = COFFEE_SHOP_ORDERS.find((x) => x.id === id);
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
      for (const item of COFFEE_MENU) {
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
      log(`Barista Luna the Roaster nods: +${Math.round(bonus * 100)}% on your next sale.`);
      return { ok: true, haggled: true, bonus: Math.round(bonus * 100) / 100 };
    }
    log('Barista Luna the Roaster shrugs you off — no better price today.');
    return { ok: true, haggled: false, bonus: 0 };
  }

  function priceBoard() {
    return COFFEE_MENU.map((item) => ({
      id: item.id,
      name: item.name,
      price: coffeeShopPriceFor(item.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[item.id],
      stock: (state.inventory[item.id] || 0) + (state.premium[item.id] || 0),
      premium: state.premium[item.id] || 0,
    }));
  }

  function orderList() {
    return COFFEE_SHOP_ORDERS.map((o) => ({
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
      const ev = COFFEE_SHOP_EVENTS[Math.floor(rng() * COFFEE_SHOP_EVENTS.length)];
      state.lastEvent = ev.id;
      if (ev.effect === 'cost-up') {
        for (const item of COFFEE_MENU) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] + 0.15) * 100) / 100;
      } else if (ev.effect === 'cost-down') {
        for (const item of COFFEE_MENU) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] - 0.1) * 100) / 100;
      } else if (ev.effect === 'sell-up') {
        for (const item of COFFEE_MENU) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] + 0.2) * 100) / 100;
      } else if (ev.effect === 'xp') {
        gainXp(25);
      } else if (ev.effect === 'spoil') {
        const item = COFFEE_MENU[Math.floor(rng() * COFFEE_MENU.length)];
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
      log(`Coffee Shop news: ${ev.name} — ${ev.text}`);
      return { event: ev.id, name: ev.name };
    }
    state.lastEvent = 'none';
    return { event: 'none' };
  }

  function tasteTest(itemId) {
    const item = COFFEE_MENU.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    const have = (state.inventory[itemId] || 0) + (state.premium[itemId] || 0);
    if (have <= 0) return { ok: false, reason: 'not-enough', have };
    const roll = rng();
    const quality = Math.round((0.5 + roll * 0.5 + state.rank * 0.05 + item.difficulty * 0.05) * 100) / 100;
    gainXp(5);
    const verdict = quality >= 0.9 ? 'Outstanding — Barista Luna the Roaster would serve this to royalty.' : quality >= 0.7 ? 'Solid work. A good cup.' : 'Needs work. Barista Luna the Roaster raises an eyebrow.';
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
    for (const item of COFFEE_MENU) {
      if (state.inventory[item.id] === undefined) state.inventory[item.id] = 0;
      if (state.premium[item.id] === undefined) state.premium[item.id] = 0;
      if (state.dayDrift[item.id] === undefined) state.dayDrift[item.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: COFFEE_SHOP_RANKS[state.rank].name,
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
      stockCap: coffeeShopStockCap(state.upgrades),
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
    if (state.cooldown > 0) return `Coffee Shop: working — ${Math.round(state.cooldown)}s left`;
    if (state.activeOrder) return `Coffee Shop: ${state.activeOrder.name} ${state.orderProgress}/${state.activeOrder.qty}`;
    const total = stockTotal();
    if (total > 0) return `Coffee Shop: ${total} in stock`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearShop = Math.hypot(pos.x - (-90), pos.z - (-200)) < 25;
    if (!nearShop) return false;
    const total = stockTotal();
    if (total > 0) {
      const first = COFFEE_MENU.find((item) => (state.inventory[item.id] || 0) + (state.premium[item.id] || 0) > 0);
      if (first) { sell(first.id, 1); return true; }
    }
    const cheapest = coffeeShopCheapest(state.dayDrift, state.rank, state.upgrades);
    if (cheapest) {
      const res = brew(cheapest.id, 1);
      return res.ok;
    }
    return false;
  }

  return {
    name: 'coffeeShop',
    state, brew, latteArt, sell, sellAll, buyUpgrade,
    takeOrder, deliverOrder, abandonOrder, haggle, priceBoard,
    orderList, dailyEvent, tasteTest, tick, tickDay, serialize,
    deserialize, stats, hudLine, interact,
  };
}
