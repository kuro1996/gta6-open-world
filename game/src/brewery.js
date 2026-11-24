// Brewery — Old Tomas turns grain, hops and patience into gold.
// Brew twelve recipes in the copper kettles, age barrels in the cellar,
// and sell kegs to the taverns of Solara. Inspectors sniff around the
// strong stuff, and a bad batch can turn the whole cellar sour.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const BREW_RECIPES = [
  {
      id: 'golden-lager',
      name: 'Golden Lager',
      basePrice: 24,
      time: 3,
      difficulty: 1,
      abv: 4.5,
      ingredient: 'barley malt',
      flavor: 'crisp',
      desc: 'Clean, bright and easy — the tavern staple that never lets you down.'
    },
  {
      id: 'hoppy-ipa',
      name: 'Hoppy IPA',
      basePrice: 34,
      time: 4,
      difficulty: 2,
      abv: 6.2,
      ingredient: 'citra hops',
      flavor: 'citrus bite',
      desc: 'Bitter up front, grapefruit on the finish. The dockworkers swear by it.'
    },
  {
      id: 'dark-stout',
      name: 'Dark Stout',
      basePrice: 38,
      time: 5,
      difficulty: 3,
      abv: 5.8,
      ingredient: 'roasted barley',
      flavor: 'coffee roast',
      desc: 'Pours like midnight. Coffee, cocoa and a whisper of smoke.'
    },
  {
      id: 'wheat-beer',
      name: 'Wheat Beer',
      basePrice: 28,
      time: 3,
      difficulty: 2,
      abv: 5.0,
      ingredient: 'wheat malt',
      flavor: 'banana clove',
      desc: 'Cloudy, soft and summery, with a banana-and-clove yeast character.'
    },
  {
      id: 'pilsner',
      name: 'Pilsner',
      basePrice: 26,
      time: 4,
      difficulty: 2,
      abv: 4.8,
      ingredient: 'saaz hops',
      flavor: 'floral snap',
      desc: 'Pale, snappy and floral — the old town\'s favourite with fried fish.'
    },
  {
      id: 'amber-ale',
      name: 'Amber Ale',
      basePrice: 30,
      time: 4,
      difficulty: 2,
      abv: 5.4,
      ingredient: 'caramel malt',
      flavor: 'toffee malt',
      desc: 'Copper-coloured and malty, toffee notes over a gentle hop backbone.'
    },
  {
      id: 'smoked-porter',
      name: 'Smoked Porter',
      basePrice: 40,
      time: 6,
      difficulty: 3,
      abv: 6.0,
      ingredient: 'smoked malt',
      flavor: 'bonfire smoke',
      desc: 'A bonfire in a glass. Smoked malt over dark chocolate and dried fruit.'
    },
  {
      id: 'sour-cherry',
      name: 'Sour Cherry Ale',
      basePrice: 46,
      time: 7,
      difficulty: 4,
      abv: 5.2,
      ingredient: 'sour cherries',
      flavor: 'tart cherry',
      desc: 'Tart, bright and pink — wild yeast and a mountain of sour cherries.'
    },
  {
      id: 'honey-mead',
      name: 'Honey Mead',
      basePrice: 52,
      time: 8,
      difficulty: 4,
      abv: 8.5,
      ingredient: 'wildflower honey',
      flavor: 'floral honey',
      desc: 'Fermented honey, slow and golden. The oldest drink in the city.'
    },
  {
      id: 'apple-cider',
      name: 'Apple Cider',
      basePrice: 22,
      time: 3,
      difficulty: 1,
      abv: 4.2,
      ingredient: 'orchard apples',
      flavor: 'orchard apple',
      desc: 'Pressed from orchard windfalls, lightly sparkling and dangerously easy.'
    },
  {
      id: 'brown-ale',
      name: 'Brown Ale',
      basePrice: 29,
      time: 4,
      difficulty: 2,
      abv: 5.1,
      ingredient: 'brown malt',
      flavor: 'nutty caramel',
      desc: 'Nutty, caramel and calm — the drink of long conversations.'
    },
  {
      id: 'barleywine',
      name: 'Barleywine',
      basePrice: 68,
      time: 10,
      difficulty: 5,
      abv: 10.5,
      ingredient: 'pale malt',
      flavor: 'dark fruit',
      desc: 'A sipping giant: dark fruit, sherry and warmth. One glass is a meal.'
    },
];

export const BREWERY_UPGRADES = [
  { id: 'copper-kettle', name: 'Copper Kettle', cost: 120, desc: 'Brew 20% faster.', effect: 'brew-fast' },
  { id: 'oak-barrels', name: 'Oak Barrels', cost: 220, desc: 'Aging pays +25%.', effect: 'age-plus' },
  { id: 'hop-garden', name: 'Hop Garden', cost: 180, desc: 'Ingredient costs -20%.', effect: 'cost-down' },
  { id: 'cellar-racks', name: 'Cellar Racks', cost: 300, desc: 'Hold +40 kegs.', effect: 'stock-plus' },
  { id: 'thermometer', name: 'Brass Thermometer', cost: 150, desc: 'Fewer spoiled batches.', effect: 'spoil-down' },
  { id: 'tasting-room', name: 'Tasting Room', cost: 420, desc: 'Sales pay +15%.', effect: 'sell-plus' },
  { id: 'delivery-cart', name: 'Delivery Cart', cost: 520, desc: 'Sell in bulk to taverns.', effect: 'bulk' },
  { id: 'master-still', name: 'Master Still', cost: 800, desc: 'Unlock the strong stuff: +30% on high ABV.', effect: 'strong-plus' },
];

export const BREWERY_ORDERS = [
  { id: 'tavern-12', name: 'Tavern Order', item: 'golden-lager', qty: 12, pay: 360, days: 1, minRank: 0, desc: 'The Gull tavern needs 12 kegs of lager by tonight.' },
  { id: 'festival-ipa', name: 'Festival IPA', item: 'hoppy-ipa', qty: 10, pay: 480, days: 2, minRank: 2, desc: 'The street festival wants 10 kegs of IPA.' },
  { id: 'wedding-mead', name: 'Wedding Mead', item: 'honey-mead', qty: 6, pay: 520, days: 2, minRank: 3, desc: 'A wedding party orders 6 kegs of mead.' },
  { id: 'winter-stout', name: 'Winter Stout', item: 'dark-stout', qty: 8, pay: 420, days: 2, minRank: 2, desc: 'A dockside inn stocks up on stout for the cold nights.' },
  { id: 'cider-stand', name: 'Cider Stand', item: 'apple-cider', qty: 15, pay: 300, days: 1, minRank: 1, desc: 'The market cider stand needs 15 kegs, quick.' },
  { id: 'barleywine-club', name: 'Barleywine Club', item: 'barleywine', qty: 4, pay: 480, days: 3, minRank: 4, desc: 'A collectors club wants 4 kegs of barleywine.' },
  { id: 'porter-night', name: 'Porter Night', item: 'smoked-porter', qty: 8, pay: 460, days: 2, minRank: 3, desc: 'A smokehouse pairs its menu with 8 kegs of porter.' },
  { id: 'mixed-kegs', name: 'Mixed Keg Run', item: 'mixed', qty: 20, pay: 600, days: 2, minRank: 3, desc: 'Any 20 kegs for the harbour festival.' },
];

export const BREWERY_EVENTS = [
  { id: 'hop-shortage', name: 'Hop Shortage', text: 'Hops are scarce — IPA costs more to brew today.', effect: 'cost-up' },
  { id: 'festival-week', name: 'Festival Week', text: 'The whole city drinks — sales pay +20% today.', effect: 'sell-up' },
  { id: 'inspector', name: 'Health Inspector', text: 'An inspector prowls the cellar. Strong brews draw attention.', effect: 'heat' },
  { id: 'rainy-week', name: 'Rainy Week', text: 'Rain keeps drinkers inside — tavern orders double.', effect: 'orders-up' },
  { id: 'good-harvest', name: 'Good Harvest', text: 'Barley is cheap and plentiful today.', effect: 'cost-down' },
  { id: 'bad-yeast', name: 'Bad Yeast', text: 'A yeast strain turns — one batch may spoil.', effect: 'spoil' },
  { id: 'tavern-brawl', name: 'Tavern Brawl', text: 'A brawl smashes a tavern\'s stock — they order replacements.', effect: 'orders-up' },
  { id: 'warm-spell', name: 'Warm Spell', text: 'Hot nights — lager and cider fly off the shelves.', effect: 'sell-up' },
  { id: 'cellar-flood', name: 'Cellar Flood', text: 'A pipe bursts in the cellar. Some stock is at risk.', effect: 'spoil' },
  { id: 'brewmaster-visit', name: 'Visiting Brewmaster', text: 'A famous brewmaster visits and shares a trick.', effect: 'xp' },
];

export const BREWERY_RANKS = [
  { level: 0, name: 'Cellar Hand', xp: 0, perk: 'Brew at base rate.' },
  { level: 1, name: 'Kettle Tender', xp: 120, perk: '+10% sale prices.' },
  { level: 2, name: 'Brewmaster', xp: 300, perk: 'Spoiled batches forgiven once a day.' },
  { level: 3, name: 'Ale Lord', xp: 620, perk: '+20% sale prices, taverns trust you.' },
  { level: 4, name: 'Legend of the Kettle', xp: 1100, perk: '+30% sale prices, aged stock doubled.' },
];

export const BREWERY_HELPERS = [
  { id: 'malt-boy', name: 'Pip the Malt Boy', wage: 25, skill: 'haul', bonus: 0.15, desc: 'Hauls grain: +15% brew yield.' },
  { id: 'cellar-keeper', name: 'Greta the Cellar Keeper', wage: 40, skill: 'age', bonus: 0.25, desc: 'Watches the barrels: +25% aging speed.' },
  { id: 'tavern-runner', name: 'Jo the Runner', wage: 60, skill: 'sell', bonus: 0.12, desc: 'Knows every tavern: +12% sale prices.' },
  { id: 'yeast-whisperer', name: 'Old Finn', wage: 80, skill: 'brew', bonus: 0.2, desc: 'Yeast whisperer: +20% brew quality.' },
];

export const BREWERY_CHALLENGES = [
  { id: 'kegs-100', name: 'First Hundred Kegs', target: 'produced', goal: 100, xp: 80, desc: 'Brew 100 kegs in total.' },
  { id: 'sell-500', name: 'Half Grand', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from beer sales.' },
  { id: 'age-20', name: 'Patient Brewer', target: 'aged', goal: 20, xp: 100, desc: 'Age 20 kegs in barrels.' },
  { id: 'orders-10', name: 'Tavern Favourite', target: 'ordersDone', goal: 10, xp: 140, desc: 'Complete 10 tavern orders.' },
  { id: 'streak-10', name: 'Clean Kettle', target: 'bestStreak', goal: 10, xp: 110, desc: 'Brew 10 batches in a row without a spoiled one.' },
  { id: 'rank-3', name: 'Ale Lord', target: 'rank', goal: 3, xp: 150, desc: 'Reach rank Ale Lord.' },
  { id: 'earn-2000', name: 'Beer Baron', target: 'earned', goal: 2000, xp: 160, desc: 'Earn $2,000 from the brewery.' },
  { id: 'batches-50', name: 'Busy Kettles', target: 'batches', goal: 50, xp: 90, desc: 'Brew 50 batches.' },
];

export const BREWERY_ACHIEVEMENTS = [
  { id: 'first-brew', name: 'First Brew', check: 'batches', goal: 1, desc: 'Brew your first batch.' },
  { id: 'first-sale', name: 'First Sale', check: 'sold', goal: 1, desc: 'Sell your first keg.' },
  { id: 'first-age', name: 'Patient One', check: 'aged', goal: 1, desc: 'Age your first barrel.' },
  { id: 'rank-2', name: 'Brewmaster', check: 'rank', goal: 2, desc: 'Reach rank Brewmaster.' },
  { id: 'rich-brew', name: 'Beer Rich', check: 'earned', goal: 2000, desc: 'Earn $2,000 from beer.' },
  { id: 'full-kit', name: 'Full Kit', check: 'upgradesCount', goal: 8, desc: 'Own every brewery upgrade.' },
  { id: 'no-spoil', name: 'Clean Hands', check: 'spoiled', goal: 0, desc: 'Brew 50 batches with zero spoiled — checked at 50.' },
  { id: 'big-batch', name: 'Big Batch', check: 'bestBatch', goal: 20, desc: 'Brew 20 kegs in one batch.' },
];

export const BREWERY_TIPS = [
  { id: 'age-it', name: 'Age It', text: 'Aged kegs pay far more than fresh ones. Patience is profit.' },
  { id: 'lager-morning', name: 'Lager Mornings', text: 'Lager sells best on hot days. Brew ahead of a warm spell.' },
  { id: 'strong-heat', name: 'Strong Stuff', text: 'High ABV draws inspectors. Keep the barleywine quiet.' },
  { id: 'festival-stock', name: 'Festival Stock', text: 'Stock up before festival week — prices jump 20%.' },
  { id: 'yeast-care', name: 'Yeast Care', text: 'A thermometer saves more batches than luck ever will.' },
  { id: 'order-first', name: 'Orders First', text: 'Take a tavern order, then brew for it.' },
  { id: 'mead-money', name: 'Mead Money', text: 'Mead costs the most and pays the most. Save it for weddings.' },
  { id: 'cellar-space', name: 'Cellar Space', text: 'Buy racks early — a full cellar is a stuck brewery.' },
];

export const BREWERY_RECORDS = [
  { id: 'biggest-batch', name: 'Biggest Batch', stat: 'bestBatch', unit: 'kegs', desc: 'Most kegs in one batch.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from beer.' },
  { id: 'most-brewed', name: 'Most Brewed', stat: 'produced', unit: 'kegs', desc: 'Most kegs brewed.' },
  { id: 'most-aged', name: 'Most Aged', stat: 'aged', unit: 'kegs', desc: 'Most kegs aged.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'batches', desc: 'Longest clean brewing streak.' },
];

export const BREWERY_MARKET_EVENTS = [
  { id: 'hop-boom', name: 'Hop Boom', items: ["hoppy-ipa"], mult: 1.4, desc: 'Hop lovers pay 40% more for IPA.' },
  { id: 'lager-glut', name: 'Lager Glut', items: ["golden-lager", "pilsner"], mult: 0.6, desc: 'Too much lager — prices crash.' },
  { id: 'mead-rush', name: 'Mead Rush', items: ["honey-mead"], mult: 1.5, desc: 'A mead craze sweeps the city.' },
  { id: 'stout-season', name: 'Stout Season', items: ["dark-stout", "smoked-porter"], mult: 1.3, desc: 'Cold nights make stout king.' },
  { id: 'cider-harvest', name: 'Cider Harvest', items: ["apple-cider"], mult: 1.35, desc: 'Apple harvest — cider pays more.' },
  { id: 'barleywine-club-night', name: 'Barleywine Night', items: ["barleywine"], mult: 1.3, desc: 'Collectors drive barleywine up.' },
  { id: 'sour-trend', name: 'Sour Trend', items: ["sour-cherry"], mult: 1.25, desc: 'Sour beer is suddenly fashionable.' },
  { id: 'wheat-summer', name: 'Wheat Summer', items: ["wheat-beer"], mult: 1.3, desc: 'Summer heat loves wheat beer.' },
  { id: 'amber-week', name: 'Amber Week', items: ["amber-ale", "brown-ale"], mult: 1.2, desc: 'Malt-forward ales get their week.' },
  { id: 'tax-hike', name: 'Tax Hike', items: ["barleywine", "honey-mead"], mult: 0.7, desc: 'A sin tax hits the strong stuff.' },
  { id: 'dry-week', name: 'Dry Week', items: ["golden-lager", "apple-cider"], mult: 0.75, desc: 'A temperance campaign dries sales.' },
  { id: 'oktoberfest', name: 'Oktoberfest', items: ["golden-lager", "hoppy-ipa", "wheat-beer"], mult: 1.2, desc: 'The festival lifts everything.' },
];

export const BREWERY_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Fresh hops, fresh drinkers.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Festival season, steady thirst.' },
  { id: 'autumn', name: 'Autumn', mult: 1.1, desc: 'Harvest brews and dark beers.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold and quiet, but stout sells.' },
];

export const BREWERY_LEADERBOARD = [
  { name: 'Tomas', total: 4200, desc: 'The brewmaster. Untouchable.' },
  { name: 'Greta', total: 2900, desc: 'Cellar keeper for forty years.' },
  { name: 'You', total: 0, desc: 'Climbing.' },
  { name: 'Pip', total: 1500, desc: 'Fast hands, faster kettles.' },
  { name: 'Finn', total: 2400, desc: 'Yeast whisperer.' },
];

export const BREWERY_QUICK_START = [
  'Brew lager first — cheap, fast, always sells.',
  'Age everything you can afford to wait for.',
  'Buy the thermometer before the still.',
  'Take tavern orders, then brew for them.',
  'Sell strong brews quietly — inspectors watch.',
  'Check the price board every morning.',
];

export function breweryRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < BREWERY_RANKS.length; i++) {
    if (xp >= BREWERY_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function breweryPriceFor(itemId, dayDrift, rank, upgrades) {
  const item = BREW_RECIPES.find((x) => x.id === itemId);
  if (!item) return 0;
  let price = item.basePrice;
  price *= 1 + (dayDrift[itemId] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('master-still') && item.difficulty >= 3) price *= 1.3;
  if (upgrades.includes('tasting-room')) price *= 1.15;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function brewerySellPriceFor(itemId, premium, dayDrift, rank, upgrades) {
  let price = breweryPriceFor(itemId, dayDrift, rank, upgrades);
  if (premium) price *= 1.5;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function breweryCostFor(itemId, qty, upgrades) {
  const item = BREW_RECIPES.find((x) => x.id === itemId);
  if (!item) return 0;
  let cost = Math.round(item.basePrice * 0.4 * qty);
  if (upgrades.includes('hop-garden')) cost = Math.round(cost * 0.8);
  return Math.max(1, cost);
}

export function breweryStockCap(upgrades) {
  let cap = 40;
  if (upgrades.includes('cellar-racks')) cap += 40;
  return cap;
}

export function brewerySpoilChance(item, upgrades) {
  let chance = 0.04 + item.difficulty * 0.015;
  if (upgrades.includes('thermometer')) chance *= 0.5;
  return chance;
}

export function breweryItemById(itemId) {
  return BREW_RECIPES.find((x) => x.id === itemId) || null;
}

export function breweryBestSeller(dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = 0;
  for (const item of BREW_RECIPES) {
    const price = breweryPriceFor(item.id, dayDrift, rank, upgrades);
    if (price > bestPrice) { bestPrice = price; best = item.id; }
  }
  return best ? { id: best, price: bestPrice } : null;
}

export function breweryCheapest(dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = Infinity;
  for (const item of BREW_RECIPES) {
    const price = breweryPriceFor(item.id, dayDrift, rank, upgrades);
    if (price < bestPrice) { bestPrice = price; best = item.id; }
  }
  return best ? { id: best, price: bestPrice } : null;
}

export function createBreweryExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;
  let donated = 0;
  let rep = 0;

  function hireHelper(id) {
    const h = BREWERY_HELPERS.find((x) => x.id === id);
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
      const h = BREWERY_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    let bonus = 0;
    for (const h of BREWERY_HELPERS) {
      if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
    }
    return bonus;
  }

  function challenges() {
    return BREWERY_CHALLENGES.map((ch) => {
      const v = system.state[ch.target] !== undefined ? system.state[ch.target] : (ch.target === 'upgradesCount' ? system.state.upgrades.length : 0);
      return { id: ch.id, name: ch.name, have: Math.floor(v), goal: ch.goal, done: v >= ch.goal };
    });
  }

  function claimChallenge(id) {
    const ch = BREWERY_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const v = system.state[ch.target] !== undefined ? system.state[ch.target] : (ch.target === 'upgradesCount' ? system.state.upgrades.length : 0);
    if (v < ch.goal) return { ok: false, reason: 'not-done', have: Math.floor(v), goal: ch.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return BREWERY_ACHIEVEMENTS.map((a) => {
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
    return { ok: true, qty, rep, note: 'The neighbourhood thanks you. Old Tomas the Brewmaster remembers.' };
  }

  function clearStale() {
    let cleared = 0;
    for (const item of BREW_RECIPES) {
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
    for (const item of BREW_RECIPES) {
      total += system.state.inventory[item.id] || 0;
      premiumTotal += system.state.premium[item.id] || 0;
    }
    const cap = breweryStockCap(system.state.upgrades);
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

export function breweryTipFor(day) {
  return BREWERY_TIPS[day % BREWERY_TIPS.length];
}

export function breweryLeaderboardWith(playerTotal) {
  const board = BREWERY_LEADERBOARD.map((e) => ({
    name: e.name, total: e.name === 'You' ? playerTotal : e.total, desc: e.desc,
  }));
  board.sort((a, b) => b.total - a.total);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export const BREWERY_META = {
  system: 'brewery', version: '7b-C', author: 'builder-3',
  label: 'Brewery', owner: 'Old Tomas the Brewmaster',
  itemCount: BREW_RECIPES.length,
};

export function createBrewerySystem(ctx) {
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
  for (const item of BREW_RECIPES) { state.inventory[item.id] = 0; state.premium[item.id] = 0; state.dayDrift[item.id] = 0; }

  function refreshRank() {
    const r = breweryRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Brewery rank up: ${BREWERY_RANKS[r].name} — ${BREWERY_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const item of BREW_RECIPES) {
      const roll = rng();
      if (roll < 0.3) state.dayDrift[item.id] = Math.round((rng() * 0.5 - 0.2) * 100) / 100;
      else if (roll < 0.4) state.dayDrift[item.id] = 0;
    }
  }

  function stockTotal() {
    let total = 0;
    for (const item of BREW_RECIPES) total += (state.inventory[item.id] || 0) + (state.premium[item.id] || 0);
    return total;
  }

  function brew(itemId, qty) {
    qty = qty === undefined ? 1 : qty;
    const item = BREW_RECIPES.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    if (state.cooldown > 0) return { ok: false, reason: 'cooling-down', cooldown: Math.round(state.cooldown) };
    const cost = breweryCostFor(itemId, qty, state.upgrades);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    if (stockTotal() + qty > breweryStockCap(state.upgrades)) return { ok: false, reason: 'stock-full', cap: breweryStockCap(state.upgrades) };
    addCash(-cost);
    state.spent += cost;
    let made = qty;
    if (rng() < brewerySpoilChance(item, state.upgrades)) {
      const lost = Math.max(1, Math.floor(qty / 2));
      made = qty - lost;
      state.spoiled += lost;
      state.streak = 0;
      log(`A batch of ${item.name} went wrong — ${lost} spoiled.`);
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
    if (state.upgrades.includes('copper-kettle')) speed = Math.max(1, Math.round(speed * 0.8));
    state.cooldown = speed;
    gainXp(4 + made + item.difficulty * 2);
    if (true && item.difficulty >= 4 && rng() < 0.15) {
      addHeat(1);
      state.heatTaken += 1;
      log('Someone official is sniffing around the strong stuff. Careful.');
    }
    if (state.activeOrder) checkOrder(itemId, made);
    log(`Brew ${made}x ${item.name} for $${cost}.`);
    return { ok: true, item: itemId, qty: made, cost, cooldown: state.cooldown };
  }

  function ageBarrel(itemId, qty) {
    qty = qty === undefined ? 1 : qty;
    const item = BREW_RECIPES.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = state.inventory[itemId] || 0;
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    state.inventory[itemId] -= qty;
    state.premium[itemId] += qty;
    state.aged += qty;
    gainXp(6 + qty * 2);
    log(`Age Barrel: ${qty}x ${item.name} set aside as premium stock.`);
    return { ok: true, item: itemId, qty, premium: state.premium[itemId] };
  }

  function sell(itemId, qty) {
    const item = BREW_RECIPES.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = (state.inventory[itemId] || 0) + (state.premium[itemId] || 0);
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    let left = qty;
    let total = 0;
    const takePrem = Math.min(state.premium[itemId] || 0, left);
    if (takePrem > 0) {
      const unit = brewerySellPriceFor(itemId, true, state.dayDrift, state.rank, state.upgrades);
      total += unit * takePrem;
      state.premium[itemId] -= takePrem;
      left -= takePrem;
    }
    if (left > 0) {
      const unit = brewerySellPriceFor(itemId, false, state.dayDrift, state.rank, state.upgrades);
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
    for (const item of BREW_RECIPES) {
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
    const u = BREWERY_UPGRADES.find((x) => x.id === id);
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
    const ord = BREWERY_ORDERS.find((x) => x.id === id);
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
      for (const item of BREW_RECIPES) {
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
      log(`Old Tomas the Brewmaster nods: +${Math.round(bonus * 100)}% on your next sale.`);
      return { ok: true, haggled: true, bonus: Math.round(bonus * 100) / 100 };
    }
    log('Old Tomas the Brewmaster shrugs you off — no better price today.');
    return { ok: true, haggled: false, bonus: 0 };
  }

  function priceBoard() {
    return BREW_RECIPES.map((item) => ({
      id: item.id,
      name: item.name,
      price: breweryPriceFor(item.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[item.id],
      stock: (state.inventory[item.id] || 0) + (state.premium[item.id] || 0),
      premium: state.premium[item.id] || 0,
    }));
  }

  function orderList() {
    return BREWERY_ORDERS.map((o) => ({
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
      const ev = BREWERY_EVENTS[Math.floor(rng() * BREWERY_EVENTS.length)];
      state.lastEvent = ev.id;
      if (ev.effect === 'cost-up') {
        for (const item of BREW_RECIPES) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] + 0.15) * 100) / 100;
      } else if (ev.effect === 'cost-down') {
        for (const item of BREW_RECIPES) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] - 0.1) * 100) / 100;
      } else if (ev.effect === 'sell-up') {
        for (const item of BREW_RECIPES) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] + 0.2) * 100) / 100;
      } else if (ev.effect === 'xp') {
        gainXp(25);
      } else if (ev.effect === 'spoil') {
        const item = BREW_RECIPES[Math.floor(rng() * BREW_RECIPES.length)];
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
      log(`Brewery news: ${ev.name} — ${ev.text}`);
      return { event: ev.id, name: ev.name };
    }
    state.lastEvent = 'none';
    return { event: 'none' };
  }

  function tasteTest(itemId) {
    const item = BREW_RECIPES.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    const have = (state.inventory[itemId] || 0) + (state.premium[itemId] || 0);
    if (have <= 0) return { ok: false, reason: 'not-enough', have };
    const roll = rng();
    const quality = Math.round((0.5 + roll * 0.5 + state.rank * 0.05 + item.difficulty * 0.05) * 100) / 100;
    gainXp(5);
    const verdict = quality >= 0.9 ? 'Outstanding — Old Tomas the Brewmaster would serve this to royalty.' : quality >= 0.7 ? 'Solid work. A good batch.' : 'Needs work. Old Tomas the Brewmaster raises an eyebrow.';
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
    for (const item of BREW_RECIPES) {
      if (state.inventory[item.id] === undefined) state.inventory[item.id] = 0;
      if (state.premium[item.id] === undefined) state.premium[item.id] = 0;
      if (state.dayDrift[item.id] === undefined) state.dayDrift[item.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: BREWERY_RANKS[state.rank].name,
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
      stockCap: breweryStockCap(state.upgrades),
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
    if (state.cooldown > 0) return `Brewery: working — ${Math.round(state.cooldown)}s left`;
    if (state.activeOrder) return `Brewery: ${state.activeOrder.name} ${state.orderProgress}/${state.activeOrder.qty}`;
    const total = stockTotal();
    if (total > 0) return `Brewery: ${total} in stock`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearShop = Math.hypot(pos.x - (210), pos.z - (-140)) < 25;
    if (!nearShop) return false;
    const total = stockTotal();
    if (total > 0) {
      const first = BREW_RECIPES.find((item) => (state.inventory[item.id] || 0) + (state.premium[item.id] || 0) > 0);
      if (first) { sell(first.id, 1); return true; }
    }
    const cheapest = breweryCheapest(state.dayDrift, state.rank, state.upgrades);
    if (cheapest) {
      const res = brew(cheapest.id, 1);
      return res.ok;
    }
    return false;
  }

  return {
    name: 'brewery',
    state, brew, ageBarrel, sell, sellAll, buyUpgrade,
    takeOrder, deliverOrder, abandonOrder, haggle, priceBoard,
    orderList, dailyEvent, tasteTest, tick, tickDay, serialize,
    deserialize, stats, hudLine, interact,
  };
}
