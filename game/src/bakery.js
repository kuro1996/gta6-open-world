// Bakery — Mama Rosa turns flour, butter and dawn into gold.
// Bake twelve goods in the brick ovens, glaze the morning trays, and
// sell warm bread to the whole street. Freshness is everything: day-old
// bread is half price, and the oven waits for no one.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const BAKED_GOODS = [
  {
      id: 'sourdough',
      name: 'Sourdough Loaf',
      basePrice: 18,
      time: 4,
      difficulty: 2,
      ingredient: 'wild starter',
      calories: 320,
      crust: 'crackling',
      desc: 'Three days of patience in one loaf — tangy, chewy, crackling crust.'
    },
  {
      id: 'croissant',
      name: 'Butter Croissant',
      basePrice: 12,
      time: 3,
      difficulty: 3,
      ingredient: 'french butter',
      calories: 280,
      crust: 'flaky',
      desc: 'Seventy-two layers of butter and air. Shatters when you bite it.'
    },
  {
      id: 'cinnamon-roll',
      name: 'Cinnamon Roll',
      basePrice: 14,
      time: 3,
      difficulty: 2,
      ingredient: 'ceylon cinnamon',
      calories: 340,
      crust: 'sticky',
      desc: 'Soft spirals, cinnamon sugar and a warm cream-cheese drizzle.'
    },
  {
      id: 'baguette',
      name: 'Baguette',
      basePrice: 10,
      time: 3,
      difficulty: 2,
      ingredient: 'stone-milled flour',
      calories: 260,
      crust: 'crisp',
      desc: 'Long, lean and loud — the crust sings when it comes out of the oven.'
    },
  {
      id: 'chocolate-cake',
      name: 'Chocolate Cake',
      basePrice: 42,
      time: 6,
      difficulty: 4,
      ingredient: 'dark cocoa',
      calories: 480,
      crust: 'ganache',
      desc: 'Three layers of dark chocolate under a glossy ganache coat.'
    },
  {
      id: 'blueberry-muffin',
      name: 'Blueberry Muffin',
      basePrice: 11,
      time: 2,
      difficulty: 1,
      ingredient: 'wild blueberries',
      calories: 290,
      crust: 'domed',
      desc: 'Domed, golden and bursting with berries in every bite.'
    },
  {
      id: 'pretzel',
      name: 'Salted Pretzel',
      basePrice: 9,
      time: 2,
      difficulty: 2,
      ingredient: 'lye dip',
      calories: 240,
      crust: 'chewy',
      desc: 'Dark, chewy and salted — the market stall favourite.'
    },
  {
      id: 'banana-bread',
      name: 'Banana Bread',
      basePrice: 16,
      time: 3,
      difficulty: 1,
      ingredient: 'ripe bananas',
      calories: 310,
      crust: 'moist',
      desc: 'Overripe bananas rescued into a moist, warm-spiced loaf.'
    },
  {
      id: 'apple-pie',
      name: 'Apple Pie',
      basePrice: 36,
      time: 5,
      difficulty: 3,
      ingredient: 'orchard apples',
      calories: 420,
      crust: 'lattice',
      desc: 'Lattice-topped, cinnamon apples, best served still warm.'
    },
  {
      id: 'focaccia',
      name: 'Rosemary Focaccia',
      basePrice: 20,
      time: 3,
      difficulty: 2,
      ingredient: 'olive oil',
      calories: 300,
      crust: 'oily',
      desc: 'Dimpled, oily and fragrant with rosemary and flaky salt.'
    },
  {
      id: 'lemon-tart',
      name: 'Lemon Tart',
      basePrice: 26,
      time: 4,
      difficulty: 3,
      ingredient: 'amalfi lemons',
      calories: 350,
      crust: 'shortcrust',
      desc: 'Sharp lemon curd in a buttery shell, torched meringue on top.'
    },
  {
      id: 'rye-bread',
      name: 'Rye Bread',
      basePrice: 15,
      time: 4,
      difficulty: 2,
      ingredient: 'dark rye',
      calories: 280,
      crust: 'dense',
      desc: 'Dense, dark and malty — the bread of long winters.'
    },
];

export const BAKERY_UPGRADES = [
  { id: 'brick-oven', name: 'Second Brick Oven', cost: 120, desc: 'Bake 20% faster.', effect: 'brew-fast' },
  { id: 'butter-churn', name: 'Butter Churn', cost: 180, desc: 'Ingredient costs -20%.', effect: 'cost-down' },
  { id: 'proofing-cabinet', name: 'Proofing Cabinet', cost: 220, desc: 'Fewer burnt batches.', effect: 'spoil-down' },
  { id: 'display-case', name: 'Glass Display Case', cost: 300, desc: 'Sales pay +15%.', effect: 'sell-plus' },
  { id: 'flour-silo', name: 'Flour Silo', cost: 260, desc: 'Hold +40 trays.', effect: 'stock-plus' },
  { id: 'pastry-tools', name: 'Pastry Tools', cost: 350, desc: 'Glazing pays +25%.', effect: 'age-plus' },
  { id: 'delivery-bike', name: 'Delivery Bike', cost: 480, desc: 'Sell in bulk to cafes.', effect: 'bulk' },
  { id: 'master-oven', name: 'Master Oven', cost: 750, desc: 'Perfect bakes: +30% on fancy goods.', effect: 'strong-plus' },
];

export const BAKERY_ORDERS = [
  { id: 'cafe-20', name: 'Cafe Order', item: 'croissant', qty: 20, pay: 300, days: 1, minRank: 0, desc: 'The corner cafe needs 20 croissants by 8am.' },
  { id: 'wedding-cake', name: 'Wedding Cake', item: 'chocolate-cake', qty: 4, pay: 320, days: 2, minRank: 3, desc: 'A wedding wants 4 chocolate cakes.' },
  { id: 'market-bread', name: 'Market Bread', item: 'sourdough', qty: 15, pay: 340, days: 1, minRank: 1, desc: 'The market stall needs 15 sourdough loaves.' },
  { id: 'school-muffins', name: 'School Muffins', item: 'blueberry-muffin', qty: 24, pay: 300, days: 1, minRank: 2, desc: 'A school fair orders 24 muffins.' },
  { id: 'pie-shop', name: 'Pie Shop', item: 'apple-pie', qty: 8, pay: 360, days: 2, minRank: 2, desc: 'The pie shop is out of apple pie — 8, please.' },
  { id: 'focaccia-lunch', name: 'Lunch Focaccia', item: 'focaccia', qty: 12, pay: 320, days: 1, minRank: 2, desc: 'A deli needs 12 focaccias for lunch service.' },
  { id: 'baguette-run', name: 'Baguette Run', item: 'baguette', qty: 30, pay: 340, days: 1, minRank: 1, desc: 'A bistro orders 30 baguettes for dinner.' },
  { id: 'mixed-trays', name: 'Mixed Trays', item: 'mixed', qty: 25, pay: 560, days: 2, minRank: 3, desc: 'Any 25 trays for the harbour festival.' },
];

export const BAKERY_EVENTS = [
  { id: 'flour-shortage', name: 'Flour Shortage', text: 'Flour is scarce — baking costs more today.', effect: 'cost-up' },
  { id: 'morning-rush', name: 'Morning Rush', text: 'Commuters queue out the door — sales pay +20%.', effect: 'sell-up' },
  { id: 'health-inspection', name: 'Health Inspection', text: 'An inspector checks the ovens. Keep it clean.', effect: 'heat' },
  { id: 'rainy-morning', name: 'Rainy Morning', text: 'Rain drives everyone in for warm bread.', effect: 'orders-up' },
  { id: 'butter-glut', name: 'Butter Glut', text: 'Butter is cheap and plentiful today.', effect: 'cost-down' },
  { id: 'burnt-batch', name: 'Burnt Batch', text: 'An oven runs hot — one tray may burn.', effect: 'spoil' },
  { id: 'street-fair', name: 'Street Fair', text: 'A fair opens outside — stalls order extra.', effect: 'orders-up' },
  { id: 'cold-snap', name: 'Cold Snap', text: 'Cold mornings — bread and pie fly off the shelves.', effect: 'sell-up' },
  { id: 'oven-breakdown', name: 'Oven Breakdown', text: 'An oven sputters. Some stock is at risk.', effect: 'spoil' },
  { id: 'pastry-critic', name: 'Pastry Critic', text: 'A food critic visits and shares a trick.', effect: 'xp' },
];

export const BAKERY_RANKS = [
  { level: 0, name: 'Flour Hand', xp: 0, perk: 'Bake at base rate.' },
  { level: 1, name: 'Oven Tender', xp: 120, perk: '+10% sale prices.' },
  { level: 2, name: 'Head Baker', xp: 300, perk: 'Burnt batches forgiven once a day.' },
  { level: 3, name: 'Bread Baron', xp: 620, perk: '+20% sale prices, cafes trust you.' },
  { level: 4, name: 'Legend of the Oven', xp: 1100, perk: '+30% sale prices, glazed goods doubled.' },
];

export const BAKERY_HELPERS = [
  { id: 'apprentice', name: 'Nina the Apprentice', wage: 25, skill: 'haul', bonus: 0.15, desc: 'Kneads dough: +15% bake yield.' },
  { id: 'oven-keeper', name: 'Bruno the Oven Keeper', wage: 40, skill: 'age', bonus: 0.25, desc: 'Watches the ovens: +25% glazing speed.' },
  { id: 'market-runner', name: 'Lia the Runner', wage: 60, skill: 'sell', bonus: 0.12, desc: 'Knows every cafe: +12% sale prices.' },
  { id: 'sugar-artist', name: 'Chef Odette', wage: 80, skill: 'brew', bonus: 0.2, desc: 'Sugar artist: +20% bake quality.' },
];

export const BAKERY_CHALLENGES = [
  { id: 'trays-100', name: 'First Hundred Trays', target: 'produced', goal: 100, xp: 80, desc: 'Bake 100 trays in total.' },
  { id: 'sell-500', name: 'Half Grand', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from bakery sales.' },
  { id: 'glaze-20', name: 'Glaze Master', target: 'aged', goal: 20, xp: 100, desc: 'Glaze 20 trays.' },
  { id: 'orders-10', name: 'Cafe Favourite', target: 'ordersDone', goal: 10, xp: 140, desc: 'Complete 10 cafe orders.' },
  { id: 'streak-10', name: 'Clean Oven', target: 'bestStreak', goal: 10, xp: 110, desc: 'Bake 10 trays in a row without a burnt one.' },
  { id: 'rank-3', name: 'Bread Baron', target: 'rank', goal: 3, xp: 150, desc: 'Reach rank Bread Baron.' },
  { id: 'earn-2000', name: 'Bakery Baron', target: 'earned', goal: 2000, xp: 160, desc: 'Earn $2,000 from the bakery.' },
  { id: 'batches-50', name: 'Busy Ovens', target: 'batches', goal: 50, xp: 90, desc: 'Bake 50 batches.' },
];

export const BAKERY_ACHIEVEMENTS = [
  { id: 'first-bake', name: 'First Bake', check: 'batches', goal: 1, desc: 'Bake your first tray.' },
  { id: 'first-sale', name: 'First Sale', check: 'sold', goal: 1, desc: 'Sell your first loaf.' },
  { id: 'first-glaze', name: 'Glaze On', check: 'aged', goal: 1, desc: 'Glaze your first tray.' },
  { id: 'rank-2', name: 'Head Baker', check: 'rank', goal: 2, desc: 'Reach rank Head Baker.' },
  { id: 'rich-bake', name: 'Bread Rich', check: 'earned', goal: 2000, desc: 'Earn $2,000 from bread.' },
  { id: 'full-kit', name: 'Full Kit', check: 'upgradesCount', goal: 8, desc: 'Own every bakery upgrade.' },
  { id: 'no-burn', name: 'Clean Hands', check: 'spoiled', goal: 0, desc: 'Bake 50 trays with zero burnt — checked at 50.' },
  { id: 'big-tray', name: 'Big Tray', check: 'bestBatch', goal: 20, desc: 'Bake 20 loaves in one tray.' },
];

export const BAKERY_TIPS = [
  { id: 'fresh-first', name: 'Fresh First', text: 'Fresh bread pays double. Sell the morning bake by noon.' },
  { id: 'glaze-it', name: 'Glaze It', text: 'Glazed trays pay far more than plain ones.' },
  { id: 'butter-care', name: 'Butter Care', text: 'Good butter is half the croissant. Never skimp.' },
  { id: 'fair-stock', name: 'Fair Stock', text: 'Stock up before street fairs — prices jump 20%.' },
  { id: 'oven-watch', name: 'Oven Watch', text: 'A proofing cabinet saves more trays than luck ever will.' },
  { id: 'order-first', name: 'Orders First', text: 'Take a cafe order, then bake for it.' },
  { id: 'cake-money', name: 'Cake Money', text: 'Cakes cost the most and pay the most. Save them for weddings.' },
  { id: 'flour-space', name: 'Flour Space', text: 'Buy a silo early — a full shelf is a stuck bakery.' },
];

export const BAKERY_RECORDS = [
  { id: 'biggest-tray', name: 'Biggest Tray', stat: 'bestBatch', unit: 'loaves', desc: 'Most loaves in one tray.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from baking.' },
  { id: 'most-baked', name: 'Most Baked', stat: 'produced', unit: 'trays', desc: 'Most trays baked.' },
  { id: 'most-glazed', name: 'Most Glazed', stat: 'aged', unit: 'trays', desc: 'Most trays glazed.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'trays', desc: 'Longest clean baking streak.' },
];

export const BAKERY_MARKET_EVENTS = [
  { id: 'croissant-craze', name: 'Croissant Craze', items: ["croissant"], mult: 1.4, desc: 'Everyone wants croissants today.' },
  { id: 'bread-glut', name: 'Bread Glut', items: ["sourdough", "rye-bread"], mult: 0.6, desc: 'Too much bread — prices crash.' },
  { id: 'cake-rush', name: 'Cake Rush', items: ["chocolate-cake"], mult: 1.5, desc: 'A cake craze sweeps the city.' },
  { id: 'pie-season', name: 'Pie Season', items: ["apple-pie"], mult: 1.3, desc: 'Autumn makes pie king.' },
  { id: 'muffin-morning', name: 'Muffin Morning', items: ["blueberry-muffin"], mult: 1.35, desc: 'Muffins are the morning favourite.' },
  { id: 'baguette-night', name: 'Baguette Night', items: ["baguette"], mult: 1.3, desc: 'Bistros drive baguettes up.' },
  { id: 'cinnamon-trend', name: 'Cinnamon Trend', items: ["cinnamon-roll"], mult: 1.25, desc: 'Cinnamon rolls are suddenly fashionable.' },
  { id: 'focaccia-summer', name: 'Focaccia Summer', items: ["focaccia"], mult: 1.3, desc: 'Summer lunches love focaccia.' },
  { id: 'tart-week', name: 'Tart Week', items: ["lemon-tart"], mult: 1.2, desc: 'Tarts get their week.' },
  { id: 'flour-tax', name: 'Flour Tax', items: ["chocolate-cake", "lemon-tart"], mult: 0.7, desc: 'A sugar tax hits the fancy stuff.' },
  { id: 'dry-week', name: 'Dry Week', items: ["sourdough", "banana-bread"], mult: 0.75, desc: 'A diet fad dries sales.' },
  { id: 'bake-festival', name: 'Bake Festival', items: ["croissant", "cinnamon-roll", "blueberry-muffin"], mult: 1.2, desc: 'The festival lifts everything.' },
];

export const BAKERY_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Fresh berries, fresh bread.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Festival season, steady hunger.' },
  { id: 'autumn', name: 'Autumn', mult: 1.1, desc: 'Harvest bakes and pies.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold and quiet, but bread sells.' },
];

export const BAKERY_LEADERBOARD = [
  { name: 'Rosa', total: 4200, desc: 'The baker. Untouchable.' },
  { name: 'Bruno', total: 2900, desc: 'Oven keeper for forty years.' },
  { name: 'You', total: 0, desc: 'Climbing.' },
  { name: 'Nina', total: 1500, desc: 'Fast hands, faster ovens.' },
  { name: 'Odette', total: 2400, desc: 'Sugar artist.' },
];

export const BAKERY_QUICK_START = [
  'Bake muffins first — cheap, fast, always sell.',
  'Glaze everything you can afford to wait for.',
  'Buy the proofing cabinet before the master oven.',
  'Take cafe orders, then bake for them.',
  'Sell the morning bake by noon — freshness pays.',
  'Check the price board every morning.',
];

export function bakeryRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < BAKERY_RANKS.length; i++) {
    if (xp >= BAKERY_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function bakeryPriceFor(itemId, dayDrift, rank, upgrades) {
  const item = BAKED_GOODS.find((x) => x.id === itemId);
  if (!item) return 0;
  let price = item.basePrice;
  price *= 1 + (dayDrift[itemId] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('master-oven') && item.difficulty >= 3) price *= 1.3;
  if (upgrades.includes('display-case')) price *= 1.15;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function bakerySellPriceFor(itemId, premium, dayDrift, rank, upgrades) {
  let price = bakeryPriceFor(itemId, dayDrift, rank, upgrades);
  if (premium) price *= 1.5;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function bakeryCostFor(itemId, qty, upgrades) {
  const item = BAKED_GOODS.find((x) => x.id === itemId);
  if (!item) return 0;
  let cost = Math.round(item.basePrice * 0.4 * qty);
  if (upgrades.includes('butter-churn')) cost = Math.round(cost * 0.8);
  return Math.max(1, cost);
}

export function bakeryStockCap(upgrades) {
  let cap = 40;
  if (upgrades.includes('flour-silo')) cap += 40;
  return cap;
}

export function bakerySpoilChance(item, upgrades) {
  let chance = 0.04 + item.difficulty * 0.015;
  if (upgrades.includes('proofing-cabinet')) chance *= 0.5;
  return chance;
}

export function bakeryItemById(itemId) {
  return BAKED_GOODS.find((x) => x.id === itemId) || null;
}

export function bakeryBestSeller(dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = 0;
  for (const item of BAKED_GOODS) {
    const price = bakeryPriceFor(item.id, dayDrift, rank, upgrades);
    if (price > bestPrice) { bestPrice = price; best = item.id; }
  }
  return best ? { id: best, price: bestPrice } : null;
}

export function bakeryCheapest(dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = Infinity;
  for (const item of BAKED_GOODS) {
    const price = bakeryPriceFor(item.id, dayDrift, rank, upgrades);
    if (price < bestPrice) { bestPrice = price; best = item.id; }
  }
  return best ? { id: best, price: bestPrice } : null;
}

export function createBakeryExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;
  let donated = 0;
  let rep = 0;

  function hireHelper(id) {
    const h = BAKERY_HELPERS.find((x) => x.id === id);
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
      const h = BAKERY_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    let bonus = 0;
    for (const h of BAKERY_HELPERS) {
      if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
    }
    return bonus;
  }

  function challenges() {
    return BAKERY_CHALLENGES.map((ch) => {
      const v = system.state[ch.target] !== undefined ? system.state[ch.target] : (ch.target === 'upgradesCount' ? system.state.upgrades.length : 0);
      return { id: ch.id, name: ch.name, have: Math.floor(v), goal: ch.goal, done: v >= ch.goal };
    });
  }

  function claimChallenge(id) {
    const ch = BAKERY_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const v = system.state[ch.target] !== undefined ? system.state[ch.target] : (ch.target === 'upgradesCount' ? system.state.upgrades.length : 0);
    if (v < ch.goal) return { ok: false, reason: 'not-done', have: Math.floor(v), goal: ch.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return BAKERY_ACHIEVEMENTS.map((a) => {
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
    return { ok: true, qty, rep, note: 'The neighbourhood thanks you. Mama Rosa the Baker remembers.' };
  }

  function clearStale() {
    let cleared = 0;
    for (const item of BAKED_GOODS) {
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
    for (const item of BAKED_GOODS) {
      total += system.state.inventory[item.id] || 0;
      premiumTotal += system.state.premium[item.id] || 0;
    }
    const cap = bakeryStockCap(system.state.upgrades);
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

export function bakeryTipFor(day) {
  return BAKERY_TIPS[day % BAKERY_TIPS.length];
}

export function bakeryLeaderboardWith(playerTotal) {
  const board = BAKERY_LEADERBOARD.map((e) => ({
    name: e.name, total: e.name === 'You' ? playerTotal : e.total, desc: e.desc,
  }));
  board.sort((a, b) => b.total - a.total);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export const BAKERY_META = {
  system: 'bakery', version: '7b-C', author: 'builder-3',
  label: 'Bakery', owner: 'Mama Rosa the Baker',
  itemCount: BAKED_GOODS.length,
};

export function createBakerySystem(ctx) {
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
  for (const item of BAKED_GOODS) { state.inventory[item.id] = 0; state.premium[item.id] = 0; state.dayDrift[item.id] = 0; }

  function refreshRank() {
    const r = bakeryRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Bakery rank up: ${BAKERY_RANKS[r].name} — ${BAKERY_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const item of BAKED_GOODS) {
      const roll = rng();
      if (roll < 0.3) state.dayDrift[item.id] = Math.round((rng() * 0.5 - 0.2) * 100) / 100;
      else if (roll < 0.4) state.dayDrift[item.id] = 0;
    }
  }

  function stockTotal() {
    let total = 0;
    for (const item of BAKED_GOODS) total += (state.inventory[item.id] || 0) + (state.premium[item.id] || 0);
    return total;
  }

  function bake(itemId, qty) {
    qty = qty === undefined ? 1 : qty;
    const item = BAKED_GOODS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    if (state.cooldown > 0) return { ok: false, reason: 'cooling-down', cooldown: Math.round(state.cooldown) };
    const cost = bakeryCostFor(itemId, qty, state.upgrades);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    if (stockTotal() + qty > bakeryStockCap(state.upgrades)) return { ok: false, reason: 'stock-full', cap: bakeryStockCap(state.upgrades) };
    addCash(-cost);
    state.spent += cost;
    let made = qty;
    if (rng() < bakerySpoilChance(item, state.upgrades)) {
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
    if (state.upgrades.includes('brick-oven')) speed = Math.max(1, Math.round(speed * 0.8));
    state.cooldown = speed;
    gainXp(4 + made + item.difficulty * 2);
    if (false && item.difficulty >= 4 && rng() < 0.15) {
      addHeat(1);
      state.heatTaken += 1;
      log('Someone official is sniffing around the strong stuff. Careful.');
    }
    if (state.activeOrder) checkOrder(itemId, made);
    log(`Bake ${made}x ${item.name} for $${cost}.`);
    return { ok: true, item: itemId, qty: made, cost, cooldown: state.cooldown };
  }

  function glazeBatch(itemId, qty) {
    qty = qty === undefined ? 1 : qty;
    const item = BAKED_GOODS.find((x) => x.id === itemId);
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
    const item = BAKED_GOODS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = (state.inventory[itemId] || 0) + (state.premium[itemId] || 0);
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    let left = qty;
    let total = 0;
    const takePrem = Math.min(state.premium[itemId] || 0, left);
    if (takePrem > 0) {
      const unit = bakerySellPriceFor(itemId, true, state.dayDrift, state.rank, state.upgrades);
      total += unit * takePrem;
      state.premium[itemId] -= takePrem;
      left -= takePrem;
    }
    if (left > 0) {
      const unit = bakerySellPriceFor(itemId, false, state.dayDrift, state.rank, state.upgrades);
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
    for (const item of BAKED_GOODS) {
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
    const u = BAKERY_UPGRADES.find((x) => x.id === id);
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
    const ord = BAKERY_ORDERS.find((x) => x.id === id);
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
      for (const item of BAKED_GOODS) {
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
      log(`Mama Rosa the Baker nods: +${Math.round(bonus * 100)}% on your next sale.`);
      return { ok: true, haggled: true, bonus: Math.round(bonus * 100) / 100 };
    }
    log('Mama Rosa the Baker shrugs you off — no better price today.');
    return { ok: true, haggled: false, bonus: 0 };
  }

  function priceBoard() {
    return BAKED_GOODS.map((item) => ({
      id: item.id,
      name: item.name,
      price: bakeryPriceFor(item.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[item.id],
      stock: (state.inventory[item.id] || 0) + (state.premium[item.id] || 0),
      premium: state.premium[item.id] || 0,
    }));
  }

  function orderList() {
    return BAKERY_ORDERS.map((o) => ({
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
      const ev = BAKERY_EVENTS[Math.floor(rng() * BAKERY_EVENTS.length)];
      state.lastEvent = ev.id;
      if (ev.effect === 'cost-up') {
        for (const item of BAKED_GOODS) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] + 0.15) * 100) / 100;
      } else if (ev.effect === 'cost-down') {
        for (const item of BAKED_GOODS) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] - 0.1) * 100) / 100;
      } else if (ev.effect === 'sell-up') {
        for (const item of BAKED_GOODS) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] + 0.2) * 100) / 100;
      } else if (ev.effect === 'xp') {
        gainXp(25);
      } else if (ev.effect === 'spoil') {
        const item = BAKED_GOODS[Math.floor(rng() * BAKED_GOODS.length)];
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
      log(`Bakery news: ${ev.name} — ${ev.text}`);
      return { event: ev.id, name: ev.name };
    }
    state.lastEvent = 'none';
    return { event: 'none' };
  }

  function tasteTest(itemId) {
    const item = BAKED_GOODS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    const have = (state.inventory[itemId] || 0) + (state.premium[itemId] || 0);
    if (have <= 0) return { ok: false, reason: 'not-enough', have };
    const roll = rng();
    const quality = Math.round((0.5 + roll * 0.5 + state.rank * 0.05 + item.difficulty * 0.05) * 100) / 100;
    gainXp(5);
    const verdict = quality >= 0.9 ? 'Outstanding — Mama Rosa the Baker would serve this to royalty.' : quality >= 0.7 ? 'Solid work. A good tray.' : 'Needs work. Mama Rosa the Baker raises an eyebrow.';
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
    for (const item of BAKED_GOODS) {
      if (state.inventory[item.id] === undefined) state.inventory[item.id] = 0;
      if (state.premium[item.id] === undefined) state.premium[item.id] = 0;
      if (state.dayDrift[item.id] === undefined) state.dayDrift[item.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: BAKERY_RANKS[state.rank].name,
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
      stockCap: bakeryStockCap(state.upgrades),
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
    if (state.cooldown > 0) return `Bakery: working — ${Math.round(state.cooldown)}s left`;
    if (state.activeOrder) return `Bakery: ${state.activeOrder.name} ${state.orderProgress}/${state.activeOrder.qty}`;
    const total = stockTotal();
    if (total > 0) return `Bakery: ${total} in stock`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearShop = Math.hypot(pos.x - (-180), pos.z - (90)) < 25;
    if (!nearShop) return false;
    const total = stockTotal();
    if (total > 0) {
      const first = BAKED_GOODS.find((item) => (state.inventory[item.id] || 0) + (state.premium[item.id] || 0) > 0);
      if (first) { sell(first.id, 1); return true; }
    }
    const cheapest = bakeryCheapest(state.dayDrift, state.rank, state.upgrades);
    if (cheapest) {
      const res = bake(cheapest.id, 1);
      return res.ok;
    }
    return false;
  }

  return {
    name: 'bakery',
    state, bake, glazeBatch, sell, sellAll, buyUpgrade,
    takeOrder, deliverOrder, abandonOrder, haggle, priceBoard,
    orderList, dailyEvent, tasteTest, tick, tickDay, serialize,
    deserialize, stats, hudLine, interact,
  };
}
