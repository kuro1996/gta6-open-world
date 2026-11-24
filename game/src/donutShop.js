// Donut Shop — Bea the Fryer turns dough, sugar and dawn into gold.
// Fry twelve flavours in the hot oil, glaze the morning trays, and
// sell warm rings to the whole street. Freshness is everything: a cold
// donut is a sad donut, and the fryer waits for no one.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const DONUT_FLAVORS = [
  {
      id: 'glazed-ring',
      name: 'Glazed Ring',
      basePrice: 6,
      time: 1,
      difficulty: 1,
      glaze: 'sugar',
      topping: 'none',
      sugar: 18,
      desc: 'The classic — a warm ring under a thin, crackling sugar glaze.'
    },
  {
      id: 'chocolate-frosted',
      name: 'Chocolate Frosted',
      basePrice: 8,
      time: 2,
      difficulty: 1,
      glaze: 'chocolate',
      topping: 'sprinkles',
      sugar: 22,
      desc: 'Milk chocolate frosting and rainbow sprinkles. The kids\' favourite.'
    },
  {
      id: 'strawberry-sprinkle',
      name: 'Strawberry Sprinkle',
      basePrice: 9,
      time: 2,
      difficulty: 2,
      glaze: 'strawberry',
      topping: 'sprinkles',
      sugar: 24,
      desc: 'Pink strawberry glaze, a snowfall of sprinkles, gone by 9am.'
    },
  {
      id: 'boston-cream',
      name: 'Boston Cream',
      basePrice: 11,
      time: 3,
      difficulty: 3,
      glaze: 'chocolate',
      topping: 'custard',
      sugar: 26,
      desc: 'Vanilla custard inside, chocolate on top — a pastry in disguise.'
    },
  {
      id: 'jelly-filled',
      name: 'Jelly Filled',
      basePrice: 9,
      time: 2,
      difficulty: 2,
      glaze: 'sugar',
      topping: 'raspberry jelly',
      sugar: 25,
      desc: 'Powdered sugar outside, raspberry jelly bursting inside.'
    },
  {
      id: 'maple-bar',
      name: 'Maple Bar',
      basePrice: 10,
      time: 2,
      difficulty: 2,
      glaze: 'maple',
      topping: 'bacon bits',
      sugar: 23,
      desc: 'A long bar of maple glaze, salty bacon bits on top. Don\'t knock it.'
    },
  {
      id: 'cinnamon-sugar',
      name: 'Cinnamon Sugar',
      basePrice: 7,
      time: 1,
      difficulty: 1,
      glaze: 'cinnamon',
      topping: 'sugar',
      sugar: 20,
      desc: 'Rolled hot in cinnamon sugar — the smell alone sells them.'
    },
  {
      id: 'blueberry-cake',
      name: 'Blueberry Cake Donut',
      basePrice: 9,
      time: 2,
      difficulty: 2,
      glaze: 'blueberry',
      topping: 'crumb',
      sugar: 21,
      desc: 'A dense cake donut, blueberries inside, crumb on top.'
    },
  {
      id: 'lemon-glazed',
      name: 'Lemon Glazed',
      basePrice: 9,
      time: 2,
      difficulty: 2,
      glaze: 'lemon',
      topping: 'zest',
      sugar: 19,
      desc: 'Sharp lemon glaze and zest — the grown-up donut.'
    },
  {
      id: 'matcha-green-tea',
      name: 'Matcha Green Tea',
      basePrice: 12,
      time: 3,
      difficulty: 3,
      glaze: 'matcha',
      topping: 'white chocolate',
      sugar: 17,
      desc: 'Earthy matcha glaze, white chocolate drizzle. Very photogenic.'
    },
  {
      id: 'salted-caramel',
      name: 'Salted Caramel',
      basePrice: 12,
      time: 3,
      difficulty: 3,
      glaze: 'caramel',
      topping: 'sea salt',
      sugar: 24,
      desc: 'Buttery caramel, flaky sea salt — sweet, salty, gone.'
    },
  {
      id: 'red-velvet',
      name: 'Red Velvet',
      basePrice: 13,
      time: 3,
      difficulty: 4,
      glaze: 'cream cheese',
      topping: 'crumbs',
      sugar: 25,
      desc: 'Crimson cake donut, cream cheese glaze, red crumbs on top.'
    },
];

export const DONUT_SHOP_UPGRADES = [
  { id: 'fryer-second', name: 'Second Fryer', cost: 120, desc: 'Fry 20% faster.', effect: 'brew-fast' },
  { id: 'dough-mixer', name: 'Dough Mixer', cost: 180, desc: 'Ingredient costs -20%.', effect: 'cost-down' },
  { id: 'glaze-station', name: 'Glaze Station', cost: 220, desc: 'Fewer burnt trays.', effect: 'spoil-down' },
  { id: 'display-case', name: 'Glass Display Case', cost: 300, desc: 'Sales pay +15%.', effect: 'sell-plus' },
  { id: 'dough-fridge', name: 'Dough Fridge', cost: 260, desc: 'Hold +40 trays.', effect: 'stock-plus' },
  { id: 'piping-tools', name: 'Piping Tools', cost: 350, desc: 'Glazing pays +25%.', effect: 'age-plus' },
  { id: 'delivery-bike', name: 'Delivery Bike', cost: 480, desc: 'Sell in bulk to offices.', effect: 'bulk' },
  { id: 'master-fryer', name: 'Master Fryer', cost: 750, desc: 'Perfect fries: +30% on fancy flavours.', effect: 'strong-plus' },
];

export const DONUT_SHOP_ORDERS = [
  { id: 'office-20', name: 'Office Order', item: 'glazed-ring', qty: 20, pay: 220, days: 1, minRank: 0, desc: 'An office needs 20 glazed rings by 9am.' },
  { id: 'birthday-box', name: 'Birthday Box', item: 'chocolate-frosted', qty: 12, pay: 240, days: 1, minRank: 2, desc: 'A birthday party orders 12 chocolate frosted.' },
  { id: 'school-fair', name: 'School Fair', item: 'cinnamon-sugar', qty: 24, pay: 240, days: 1, minRank: 1, desc: 'A school fair orders 24 cinnamon sugar rings.' },
  { id: 'wedding-donuts', name: 'Wedding Donuts', item: 'red-velvet', qty: 8, pay: 300, days: 2, minRank: 3, desc: 'A wedding wants 8 red velvet donuts.' },
  { id: 'cafe-box', name: 'Cafe Box', item: 'boston-cream', qty: 10, pay: 280, days: 2, minRank: 2, desc: 'A cafe orders 10 Boston creams.' },
  { id: 'market-stall', name: 'Market Stall', item: 'strawberry-sprinkle', qty: 18, pay: 260, days: 1, minRank: 2, desc: 'A market stall needs 18 strawberry sprinkles.' },
  { id: 'morning-run', name: 'Morning Run', item: 'maple-bar', qty: 16, pay: 260, days: 1, minRank: 1, desc: 'A taxi rank orders 16 maple bars for dawn.' },
  { id: 'mixed-trays', name: 'Mixed Trays', item: 'mixed', qty: 25, pay: 480, days: 2, minRank: 3, desc: 'Any 25 trays for the harbour festival.' },
];

export const DONUT_SHOP_EVENTS = [
  { id: 'flour-shortage', name: 'Flour Shortage', text: 'Flour is scarce — frying costs more today.', effect: 'cost-up' },
  { id: 'morning-rush', name: 'Morning Rush', text: 'Commuters queue out the door — sales pay +20%.', effect: 'sell-up' },
  { id: 'health-inspection', name: 'Health Inspection', text: 'An inspector checks the fryer. Keep it clean.', effect: 'heat' },
  { id: 'rainy-morning', name: 'Rainy Morning', text: 'Rain drives everyone in for warm donuts.', effect: 'orders-up' },
  { id: 'sugar-glut', name: 'Sugar Glut', text: 'Sugar is cheap and plentiful today.', effect: 'cost-down' },
  { id: 'burnt-tray', name: 'Burnt Tray', text: 'The oil runs hot — one tray may burn.', effect: 'spoil' },
  { id: 'street-fair', name: 'Street Fair', text: 'A fair opens outside — stalls order extra.', effect: 'orders-up' },
  { id: 'cold-snap', name: 'Cold Snap', text: 'Cold mornings — donuts and coffee fly off the shelves.', effect: 'sell-up' },
  { id: 'fryer-breakdown', name: 'Fryer Breakdown', text: 'A fryer sputters. Some stock is at risk.', effect: 'spoil' },
  { id: 'donut-critic', name: 'Donut Critic', text: 'A food critic visits and shares a trick.', effect: 'xp' },
];

export const DONUT_SHOP_RANKS = [
  { level: 0, name: 'Dough Hand', xp: 0, perk: 'Fry at base rate.' },
  { level: 1, name: 'Fryer Tender', xp: 120, perk: '+10% sale prices.' },
  { level: 2, name: 'Head Fryer', xp: 300, perk: 'Burnt trays forgiven once a day.' },
  { level: 3, name: 'Donut Baron', xp: 620, perk: '+20% sale prices, offices trust you.' },
  { level: 4, name: 'Legend of the Fryer', xp: 1100, perk: '+30% sale prices, glazed trays doubled.' },
];

export const DONUT_SHOP_HELPERS = [
  { id: 'apprentice', name: 'Zoe the Apprentice', wage: 25, skill: 'haul', bonus: 0.15, desc: 'Rolls dough: +15% fry yield.' },
  { id: 'glaze-keeper', name: 'Mia the Glaze Keeper', wage: 40, skill: 'age', bonus: 0.25, desc: 'Watches the glaze: +25% glazing speed.' },
  { id: 'counter-runner', name: 'Leo the Runner', wage: 60, skill: 'sell', bonus: 0.12, desc: 'Knows every office: +12% sale prices.' },
  { id: 'sugar-artist', name: 'Chef Bea Jr', wage: 80, skill: 'brew', bonus: 0.2, desc: 'Sugar artist: +20% fry quality.' },
];

export const DONUT_SHOP_CHALLENGES = [
  { id: 'trays-100', name: 'First Hundred Trays', target: 'produced', goal: 100, xp: 80, desc: 'Fry 100 trays in total.' },
  { id: 'sell-500', name: 'Half Grand', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from donut sales.' },
  { id: 'glaze-20', name: 'Glaze Master', target: 'aged', goal: 20, xp: 100, desc: 'Glaze 20 trays.' },
  { id: 'orders-10', name: 'Office Favourite', target: 'ordersDone', goal: 10, xp: 140, desc: 'Complete 10 office orders.' },
  { id: 'streak-10', name: 'Clean Fryer', target: 'bestStreak', goal: 10, xp: 110, desc: 'Fry 10 trays in a row without a burnt one.' },
  { id: 'rank-3', name: 'Donut Baron', target: 'rank', goal: 3, xp: 150, desc: 'Reach rank Donut Baron.' },
  { id: 'earn-2000', name: 'Donut Baron', target: 'earned', goal: 2000, xp: 160, desc: 'Earn $2,000 from the donut shop.' },
  { id: 'batches-50', name: 'Busy Fryer', target: 'batches', goal: 50, xp: 90, desc: 'Fry 50 batches.' },
];

export const DONUT_SHOP_ACHIEVEMENTS = [
  { id: 'first-fry', name: 'First Fry', check: 'batches', goal: 1, desc: 'Fry your first tray.' },
  { id: 'first-sale', name: 'First Sale', check: 'sold', goal: 1, desc: 'Sell your first donut.' },
  { id: 'first-glaze', name: 'Glaze On', check: 'aged', goal: 1, desc: 'Glaze your first tray.' },
  { id: 'rank-2', name: 'Head Fryer', check: 'rank', goal: 2, desc: 'Reach rank Head Fryer.' },
  { id: 'rich-donut', name: 'Donut Rich', check: 'earned', goal: 2000, desc: 'Earn $2,000 from donuts.' },
  { id: 'full-kit', name: 'Full Kit', check: 'upgradesCount', goal: 8, desc: 'Own every donut shop upgrade.' },
  { id: 'no-burn', name: 'Clean Hands', check: 'spoiled', goal: 0, desc: 'Fry 50 trays with zero burnt — checked at 50.' },
  { id: 'big-tray', name: 'Big Tray', check: 'bestBatch', goal: 20, desc: 'Fry 20 donuts in one tray.' },
];

export const DONUT_SHOP_TIPS = [
  { id: 'fresh-first', name: 'Fresh First', text: 'Fresh donuts pay double. Sell the morning fry by noon.' },
  { id: 'glaze-it', name: 'Glaze It', text: 'Glazed trays pay far more than plain ones.' },
  { id: 'oil-care', name: 'Oil Care', text: 'Clean oil is half the donut. Never fry in old oil.' },
  { id: 'fair-stock', name: 'Fair Stock', text: 'Stock up before street fairs — prices jump 20%.' },
  { id: 'glaze-watch', name: 'Glaze Watch', text: 'A glaze station saves more trays than luck ever will.' },
  { id: 'order-first', name: 'Orders First', text: 'Take an office order, then fry for it.' },
  { id: 'velvet-money', name: 'Velvet Money', text: 'Red velvet costs the most and pays the most. Save it for weddings.' },
  { id: 'fridge-space', name: 'Fridge Space', text: 'Buy a dough fridge early — a full shelf is a stuck shop.' },
];

export const DONUT_SHOP_RECORDS = [
  { id: 'biggest-tray', name: 'Biggest Tray', stat: 'bestBatch', unit: 'donuts', desc: 'Most donuts in one tray.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from donuts.' },
  { id: 'most-fried', name: 'Most Fried', stat: 'produced', unit: 'trays', desc: 'Most trays fried.' },
  { id: 'most-glazed', name: 'Most Glazed', stat: 'aged', unit: 'trays', desc: 'Most trays glazed.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'trays', desc: 'Longest clean fry streak.' },
];

export const DONUT_SHOP_MARKET_EVENTS = [
  { id: 'glazed-craze', name: 'Glazed Craze', items: ["glazed-ring"], mult: 1.4, desc: 'Everyone wants glazed rings today.' },
  { id: 'chocolate-glut', name: 'Chocolate Glut', items: ["chocolate-frosted", "boston-cream"], mult: 0.6, desc: 'Too much chocolate — prices crash.' },
  { id: 'velvet-rush', name: 'Velvet Rush', items: ["red-velvet"], mult: 1.5, desc: 'A red velvet craze sweeps the city.' },
  { id: 'strawberry-season', name: 'Strawberry Season', items: ["strawberry-sprinkle"], mult: 1.3, desc: 'Summer makes strawberry king.' },
  { id: 'maple-morning', name: 'Maple Morning', items: ["maple-bar"], mult: 1.35, desc: 'Maple bars are the morning favourite.' },
  { id: 'matcha-night', name: 'Matcha Night', items: ["matcha-green-tea"], mult: 1.3, desc: 'Collectors drive matcha up.' },
  { id: 'caramel-trend', name: 'Caramel Trend', items: ["salted-caramel"], mult: 1.25, desc: 'Salted caramel is suddenly fashionable.' },
  { id: 'lemon-summer', name: 'Lemon Summer', items: ["lemon-glazed"], mult: 1.3, desc: 'Summer heat loves lemon glaze.' },
  { id: 'jelly-week', name: 'Jelly Week', items: ["jelly-filled"], mult: 1.2, desc: 'Jelly donuts get their week.' },
  { id: 'sugar-tax', name: 'Sugar Tax', items: ["red-velvet", "salted-caramel"], mult: 0.7, desc: 'A sugar tax hits the fancy flavours.' },
  { id: 'dry-week', name: 'Dry Week', items: ["glazed-ring", "cinnamon-sugar"], mult: 0.75, desc: 'A diet fad dries sales.' },
  { id: 'donut-festival', name: 'Donut Festival', items: ["glazed-ring", "chocolate-frosted", "strawberry-sprinkle"], mult: 1.2, desc: 'The festival lifts everything.' },
];

export const DONUT_SHOP_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Fresh berries, fresh donuts.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Festival season, steady hunger.' },
  { id: 'autumn', name: 'Autumn', mult: 1.1, desc: 'Harvest bakes and warm rings.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold and quiet, but donuts sell.' },
];

export const DONUT_SHOP_LEADERBOARD = [
  { name: 'Bea', total: 4200, desc: 'The fryer. Untouchable.' },
  { name: 'Mia', total: 2900, desc: 'Glaze keeper for forty years.' },
  { name: 'You', total: 0, desc: 'Climbing.' },
  { name: 'Zoe', total: 1500, desc: 'Fast hands, faster fryer.' },
  { name: 'Leo', total: 2400, desc: 'Counter runner.' },
];

export const DONUT_SHOP_QUICK_START = [
  'Fry glazed rings first — cheap, fast, always sell.',
  'Glaze everything you can afford to wait for.',
  'Buy the glaze station before the master fryer.',
  'Take office orders, then fry for them.',
  'Sell the morning fry by noon — freshness pays.',
  'Check the price board every morning.',
];

export function donutShopRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < DONUT_SHOP_RANKS.length; i++) {
    if (xp >= DONUT_SHOP_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function donutShopPriceFor(itemId, dayDrift, rank, upgrades) {
  const item = DONUT_FLAVORS.find((x) => x.id === itemId);
  if (!item) return 0;
  let price = item.basePrice;
  price *= 1 + (dayDrift[itemId] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('master-fryer') && item.difficulty >= 3) price *= 1.3;
  if (upgrades.includes('display-case')) price *= 1.15;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function donutShopSellPriceFor(itemId, premium, dayDrift, rank, upgrades) {
  let price = donutShopPriceFor(itemId, dayDrift, rank, upgrades);
  if (premium) price *= 1.5;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function donutShopCostFor(itemId, qty, upgrades) {
  const item = DONUT_FLAVORS.find((x) => x.id === itemId);
  if (!item) return 0;
  let cost = Math.round(item.basePrice * 0.4 * qty);
  if (upgrades.includes('dough-mixer')) cost = Math.round(cost * 0.8);
  return Math.max(1, cost);
}

export function donutShopStockCap(upgrades) {
  let cap = 40;
  if (upgrades.includes('dough-fridge')) cap += 40;
  return cap;
}

export function donutShopSpoilChance(item, upgrades) {
  let chance = 0.04 + item.difficulty * 0.015;
  if (upgrades.includes('glaze-station')) chance *= 0.5;
  return chance;
}

export function donutShopItemById(itemId) {
  return DONUT_FLAVORS.find((x) => x.id === itemId) || null;
}

export function donutShopBestSeller(dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = 0;
  for (const item of DONUT_FLAVORS) {
    const price = donutShopPriceFor(item.id, dayDrift, rank, upgrades);
    if (price > bestPrice) { bestPrice = price; best = item.id; }
  }
  return best ? { id: best, price: bestPrice } : null;
}

export function donutShopCheapest(dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = Infinity;
  for (const item of DONUT_FLAVORS) {
    const price = donutShopPriceFor(item.id, dayDrift, rank, upgrades);
    if (price < bestPrice) { bestPrice = price; best = item.id; }
  }
  return best ? { id: best, price: bestPrice } : null;
}

export function createDonutShopExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;
  let donated = 0;
  let rep = 0;

  function hireHelper(id) {
    const h = DONUT_SHOP_HELPERS.find((x) => x.id === id);
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
      const h = DONUT_SHOP_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    let bonus = 0;
    for (const h of DONUT_SHOP_HELPERS) {
      if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
    }
    return bonus;
  }

  function challenges() {
    return DONUT_SHOP_CHALLENGES.map((ch) => {
      const v = system.state[ch.target] !== undefined ? system.state[ch.target] : (ch.target === 'upgradesCount' ? system.state.upgrades.length : 0);
      return { id: ch.id, name: ch.name, have: Math.floor(v), goal: ch.goal, done: v >= ch.goal };
    });
  }

  function claimChallenge(id) {
    const ch = DONUT_SHOP_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const v = system.state[ch.target] !== undefined ? system.state[ch.target] : (ch.target === 'upgradesCount' ? system.state.upgrades.length : 0);
    if (v < ch.goal) return { ok: false, reason: 'not-done', have: Math.floor(v), goal: ch.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return DONUT_SHOP_ACHIEVEMENTS.map((a) => {
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
    return { ok: true, qty, rep, note: 'The neighbourhood thanks you. Donut Queen Bea the Fryer remembers.' };
  }

  function clearStale() {
    let cleared = 0;
    for (const item of DONUT_FLAVORS) {
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
    for (const item of DONUT_FLAVORS) {
      total += system.state.inventory[item.id] || 0;
      premiumTotal += system.state.premium[item.id] || 0;
    }
    const cap = donutShopStockCap(system.state.upgrades);
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

export function donutShopTipFor(day) {
  return DONUT_SHOP_TIPS[day % DONUT_SHOP_TIPS.length];
}

export function donutShopLeaderboardWith(playerTotal) {
  const board = DONUT_SHOP_LEADERBOARD.map((e) => ({
    name: e.name, total: e.name === 'You' ? playerTotal : e.total, desc: e.desc,
  }));
  board.sort((a, b) => b.total - a.total);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export const DONUT_SHOP_META = {
  system: 'donutShop', version: '7b-C', author: 'builder-3',
  label: 'Donut Shop', owner: 'Donut Queen Bea the Fryer',
  itemCount: DONUT_FLAVORS.length,
};

export function createDonutShopSystem(ctx) {
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
  for (const item of DONUT_FLAVORS) { state.inventory[item.id] = 0; state.premium[item.id] = 0; state.dayDrift[item.id] = 0; }

  function refreshRank() {
    const r = donutShopRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Donut Shop rank up: ${DONUT_SHOP_RANKS[r].name} — ${DONUT_SHOP_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const item of DONUT_FLAVORS) {
      const roll = rng();
      if (roll < 0.3) state.dayDrift[item.id] = Math.round((rng() * 0.5 - 0.2) * 100) / 100;
      else if (roll < 0.4) state.dayDrift[item.id] = 0;
    }
  }

  function stockTotal() {
    let total = 0;
    for (const item of DONUT_FLAVORS) total += (state.inventory[item.id] || 0) + (state.premium[item.id] || 0);
    return total;
  }

  function fry(itemId, qty) {
    qty = qty === undefined ? 1 : qty;
    const item = DONUT_FLAVORS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    if (state.cooldown > 0) return { ok: false, reason: 'cooling-down', cooldown: Math.round(state.cooldown) };
    const cost = donutShopCostFor(itemId, qty, state.upgrades);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    if (stockTotal() + qty > donutShopStockCap(state.upgrades)) return { ok: false, reason: 'stock-full', cap: donutShopStockCap(state.upgrades) };
    addCash(-cost);
    state.spent += cost;
    let made = qty;
    if (rng() < donutShopSpoilChance(item, state.upgrades)) {
      const lost = Math.max(1, Math.floor(qty / 2));
      made = qty - lost;
      state.spoiled += lost;
      state.streak = 0;
      log(`A tray of ${item.name} went wrong — ${lost} spoiled.`);
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
    if (state.upgrades.includes('fryer-second')) speed = Math.max(1, Math.round(speed * 0.8));
    state.cooldown = speed;
    gainXp(4 + made + item.difficulty * 2);
    if (false && item.difficulty >= 4 && rng() < 0.15) {
      addHeat(1);
      state.heatTaken += 1;
      log('Someone official is sniffing around the strong stuff. Careful.');
    }
    if (state.activeOrder) checkOrder(itemId, made);
    log(`Fry ${made}x ${item.name} for $${cost}.`);
    return { ok: true, item: itemId, qty: made, cost, cooldown: state.cooldown };
  }

  function glazeBatch(itemId, qty) {
    qty = qty === undefined ? 1 : qty;
    const item = DONUT_FLAVORS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = state.inventory[itemId] || 0;
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    state.inventory[itemId] -= qty;
    state.premium[itemId] += qty;
    state.aged += qty;
    gainXp(6 + qty * 2);
    log(`Glaze Batch: ${qty}x ${item.name} set aside as premium stock.`);
    return { ok: true, item: itemId, qty, premium: state.premium[itemId] };
  }

  function sell(itemId, qty) {
    const item = DONUT_FLAVORS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = (state.inventory[itemId] || 0) + (state.premium[itemId] || 0);
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    let left = qty;
    let total = 0;
    const takePrem = Math.min(state.premium[itemId] || 0, left);
    if (takePrem > 0) {
      const unit = donutShopSellPriceFor(itemId, true, state.dayDrift, state.rank, state.upgrades);
      total += unit * takePrem;
      state.premium[itemId] -= takePrem;
      left -= takePrem;
    }
    if (left > 0) {
      const unit = donutShopSellPriceFor(itemId, false, state.dayDrift, state.rank, state.upgrades);
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
    for (const item of DONUT_FLAVORS) {
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
    const u = DONUT_SHOP_UPGRADES.find((x) => x.id === id);
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
    const ord = DONUT_SHOP_ORDERS.find((x) => x.id === id);
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
      for (const item of DONUT_FLAVORS) {
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
      log(`Donut Queen Bea the Fryer nods: +${Math.round(bonus * 100)}% on your next sale.`);
      return { ok: true, haggled: true, bonus: Math.round(bonus * 100) / 100 };
    }
    log('Donut Queen Bea the Fryer shrugs you off — no better price today.');
    return { ok: true, haggled: false, bonus: 0 };
  }

  function priceBoard() {
    return DONUT_FLAVORS.map((item) => ({
      id: item.id,
      name: item.name,
      price: donutShopPriceFor(item.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[item.id],
      stock: (state.inventory[item.id] || 0) + (state.premium[item.id] || 0),
      premium: state.premium[item.id] || 0,
    }));
  }

  function orderList() {
    return DONUT_SHOP_ORDERS.map((o) => ({
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
      const ev = DONUT_SHOP_EVENTS[Math.floor(rng() * DONUT_SHOP_EVENTS.length)];
      state.lastEvent = ev.id;
      if (ev.effect === 'cost-up') {
        for (const item of DONUT_FLAVORS) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] + 0.15) * 100) / 100;
      } else if (ev.effect === 'cost-down') {
        for (const item of DONUT_FLAVORS) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] - 0.1) * 100) / 100;
      } else if (ev.effect === 'sell-up') {
        for (const item of DONUT_FLAVORS) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] + 0.2) * 100) / 100;
      } else if (ev.effect === 'xp') {
        gainXp(25);
      } else if (ev.effect === 'spoil') {
        const item = DONUT_FLAVORS[Math.floor(rng() * DONUT_FLAVORS.length)];
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
      log(`Donut Shop news: ${ev.name} — ${ev.text}`);
      return { event: ev.id, name: ev.name };
    }
    state.lastEvent = 'none';
    return { event: 'none' };
  }

  function tasteTest(itemId) {
    const item = DONUT_FLAVORS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    const have = (state.inventory[itemId] || 0) + (state.premium[itemId] || 0);
    if (have <= 0) return { ok: false, reason: 'not-enough', have };
    const roll = rng();
    const quality = Math.round((0.5 + roll * 0.5 + state.rank * 0.05 + item.difficulty * 0.05) * 100) / 100;
    gainXp(5);
    const verdict = quality >= 0.9 ? 'Outstanding — Donut Queen Bea the Fryer would serve this to royalty.' : quality >= 0.7 ? 'Solid work. A good tray.' : 'Needs work. Donut Queen Bea the Fryer raises an eyebrow.';
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
    for (const item of DONUT_FLAVORS) {
      if (state.inventory[item.id] === undefined) state.inventory[item.id] = 0;
      if (state.premium[item.id] === undefined) state.premium[item.id] = 0;
      if (state.dayDrift[item.id] === undefined) state.dayDrift[item.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: DONUT_SHOP_RANKS[state.rank].name,
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
      stockCap: donutShopStockCap(state.upgrades),
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
    if (state.cooldown > 0) return `Donut Shop: working — ${Math.round(state.cooldown)}s left`;
    if (state.activeOrder) return `Donut Shop: ${state.activeOrder.name} ${state.orderProgress}/${state.activeOrder.qty}`;
    const total = stockTotal();
    if (total > 0) return `Donut Shop: ${total} in stock`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearShop = Math.hypot(pos.x - (-240), pos.z - (-60)) < 25;
    if (!nearShop) return false;
    const total = stockTotal();
    if (total > 0) {
      const first = DONUT_FLAVORS.find((item) => (state.inventory[item.id] || 0) + (state.premium[item.id] || 0) > 0);
      if (first) { sell(first.id, 1); return true; }
    }
    const cheapest = donutShopCheapest(state.dayDrift, state.rank, state.upgrades);
    if (cheapest) {
      const res = fry(cheapest.id, 1);
      return res.ok;
    }
    return false;
  }

  return {
    name: 'donutShop',
    state, fry, glazeBatch, sell, sellAll, buyUpgrade,
    takeOrder, deliverOrder, abandonOrder, haggle, priceBoard,
    orderList, dailyEvent, tasteTest, tick, tickDay, serialize,
    deserialize, stats, hudLine, interact,
  };
}
