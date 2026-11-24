// Brewery — Old Tomas brews twelve recipes in copper kettles, ages barrels
// in the cellar and sells kegs to the taverns of Solara. Pure logic, no
// rendering, no imports. The game wires this file through the standard
// context object; every context field has a safe fallback.

export const BREW_RECIPES = [
  { id: 'golden-lager', name: 'Golden Lager', basePrice: 24, time: 3, difficulty: 1, abv: 4.8, ingredient: 'barley malt', flavor: 'crisp and clean', desc: 'A bright everyday lager, light on the tongue and quick to brew.' },
  { id: 'hoppy-ipa', name: 'Hoppy IPA', basePrice: 34, time: 4, difficulty: 2, abv: 6.5, ingredient: 'cascade hops', flavor: 'citrus bitter', desc: 'A punchy IPA loaded with cascade hops and a grapefruit bite.' },
  { id: 'dark-stout', name: 'Dark Stout', basePrice: 38, time: 5, difficulty: 3, abv: 5.8, ingredient: 'roasted barley', flavor: 'coffee chocolate', desc: 'Near-black stout with roasted coffee and dark chocolate notes.' },
  { id: 'wheat-beer', name: 'Wheat Beer', basePrice: 28, time: 3, difficulty: 2, abv: 5.0, ingredient: 'wheat malt', flavor: 'soft banana spice', desc: 'Cloudy wheat beer with a gentle banana and clove whisper.' },
  { id: 'pilsner', name: 'Pilsner', basePrice: 26, time: 4, difficulty: 2, abv: 4.9, ingredient: 'saaz hops', flavor: 'dry herbal', desc: 'A dry herbal pilsner, noble hops up front and a snappy finish.' },
  { id: 'amber-ale', name: 'Amber Ale', basePrice: 30, time: 4, difficulty: 2, abv: 5.5, ingredient: 'caramel malt', flavor: 'toasty caramel', desc: 'Copper-amber ale, toasty malt and a soft caramel sweetness.' },
  { id: 'smoked-porter', name: 'Smoked Porter', basePrice: 40, time: 6, difficulty: 3, abv: 6.2, ingredient: 'smoked malt', flavor: 'campfire malt', desc: 'A porter kissed with beechwood smoke, like a campfire in a glass.' },
  { id: 'sour-cherry', name: 'Sour Cherry', basePrice: 46, time: 7, difficulty: 4, abv: 5.2, ingredient: 'sour cherries', flavor: 'tart cherry', desc: 'A tart cherry sour, puckering at first then sweet on the finish.' },
  { id: 'honey-mead', name: 'Honey Mead', basePrice: 52, time: 8, difficulty: 4, abv: 8.0, ingredient: 'wildflower honey', flavor: 'sweet floral', desc: 'Golden mead from wildflower honey, floral and dangerously smooth.' },
  { id: 'apple-cider', name: 'Apple Cider', basePrice: 22, time: 3, difficulty: 1, abv: 4.2, ingredient: 'orchard apples', flavor: 'bright apple', desc: 'Bright orchard cider, crisp apple and a little farmhouse funk.' },
  { id: 'brown-ale', name: 'Brown Ale', basePrice: 29, time: 4, difficulty: 2, abv: 5.4, ingredient: 'brown malt', flavor: 'nutty malt', desc: 'A nutty brown ale, easy drinking with a toasted malt core.' },
  { id: 'barleywine', name: 'Barleywine', basePrice: 68, time: 10, difficulty: 5, abv: 10.5, ingredient: 'aged barley', flavor: 'rich dried fruit', desc: 'The cellar king: a slow, strong barleywine of dried fruit and sherry.' },
];

export const BREWERY_UPGRADES = [
  { id: 'copper-kettle', name: 'Copper Kettle', cost: 120, desc: 'A bright copper kettle that heats fast and even.', effect: 'brew-fast' },
  { id: 'oak-barrels', name: 'Oak Barrels', cost: 220, desc: 'Seasoned oak barrels that deepen every aged keg.', effect: 'age-plus' },
  { id: 'hop-garden', name: 'Hop Garden', cost: 180, desc: 'Your own hop bines, cutting the cost of every brew.', effect: 'cost-down' },
  { id: 'cellar-racks', name: 'Cellar Racks', cost: 300, desc: 'Racked cellar shelves that double your stock room.', effect: 'stock-plus' },
  { id: 'thermometer', name: 'Thermometer', cost: 150, desc: 'A precise kettle thermometer that saves batches from spoiling.', effect: 'spoil-down' },
  { id: 'tasting-room', name: 'Tasting Room', cost: 420, desc: 'A warm tasting room where kegs fetch a better price.', effect: 'sell-plus' },
  { id: 'delivery-cart', name: 'Delivery Cart', cost: 520, desc: 'A sturdy cart for hauling bulk orders to the taverns.', effect: 'bulk' },
  { id: 'master-still', name: 'Master Still', cost: 800, desc: 'The master still, coaxing top coin from the strongest brews.', effect: 'strong-plus' },
];

export const BREWERY_ORDERS = [
  { id: 'tavern-12', name: 'Tavern Dozen', item: 'golden-lager', qty: 12, pay: 360, days: 1, minRank: 0, desc: 'The corner tavern wants a dozen lagers by tonight.' },
  { id: 'festival-ipa', name: 'Festival IPA', item: 'hoppy-ipa', qty: 10, pay: 480, days: 2, minRank: 2, desc: 'The harvest festival needs ten IPAs for the main tent.' },
  { id: 'wedding-mead', name: 'Wedding Mead', item: 'honey-mead', qty: 6, pay: 520, days: 2, minRank: 3, desc: 'A wedding toast calls for six bottles of honey mead.' },
  { id: 'winter-stout', name: 'Winter Stout', item: 'dark-stout', qty: 8, pay: 420, days: 2, minRank: 2, desc: 'Eight stouts to warm the winter market crowd.' },
  { id: 'cider-stand', name: 'Cider Stand', item: 'apple-cider', qty: 15, pay: 300, days: 1, minRank: 1, desc: 'The cider stand needs fifteen bottles before the market opens.' },
  { id: 'barleywine-club', name: 'Barleywine Club', item: 'barleywine', qty: 4, pay: 480, days: 3, minRank: 4, desc: 'The private club wants four barleywines, no substitutes.' },
  { id: 'porter-night', name: 'Porter Night', item: 'smoked-porter', qty: 8, pay: 460, days: 2, minRank: 3, desc: 'Eight smoked porters for the fireside tasting night.' },
  { id: 'mixed-kegs', name: 'Mixed Kegs', item: 'mixed', qty: 20, pay: 600, days: 2, minRank: 3, desc: 'Twenty kegs of anything, for a tavern restock.' },
];

export const BREWERY_EVENTS = [
  { id: 'hop-shortage', name: 'Hop Shortage', text: 'Hops are scarce this week and prices climb.', effect: 'cost-up' },
  { id: 'festival-week', name: 'Festival Week', text: 'Festival crowds are thirsty and paying well.', effect: 'sell-up' },
  { id: 'inspector', name: 'Inspector Visit', text: 'An inspector is sniffing around the strong stuff.', effect: 'heat' },
  { id: 'rainy-week', name: 'Rainy Week', text: 'Rain keeps folk indoors, and orders pile up.', effect: 'orders-up' },
  { id: 'good-harvest', name: 'Good Harvest', text: 'A fine barley harvest makes brewing cheap.', effect: 'cost-down' },
  { id: 'bad-yeast', name: 'Bad Yeast', text: 'A bad yeast batch spoils some of your stock.', effect: 'spoil' },
  { id: 'tavern-brawl', name: 'Tavern Brawl', text: 'A brawl broke the tavern kegs; they need replacements fast.', effect: 'orders-up' },
  { id: 'warm-spell', name: 'Warm Spell', text: 'Warm evenings have everyone out drinking.', effect: 'sell-up' },
  { id: 'cellar-flood', name: 'Cellar Flood', text: 'A leak floods the cellar and ruins some kegs.', effect: 'spoil' },
  { id: 'brewmaster-visit', name: 'Brewmaster Visit', text: 'A travelling brewmaster shares hard-won wisdom.', effect: 'xp' },
];

export const BREWERY_RANKS = [
  { level: 0, name: 'Cellar Hand', xp: 0, perk: 'Learning the ropes of the kettle.' },
  { level: 1, name: 'Kettle Tender', xp: 120, perk: 'Steadier hands, better prices.' },
  { level: 2, name: 'Brewmaster', xp: 300, perk: 'The town knows your name.' },
  { level: 3, name: 'Ale Lord', xp: 620, perk: 'Taverns bid for your kegs.' },
  { level: 4, name: 'Legend of the Kettle', xp: 1100, perk: 'Your brews are sung about in song.' },
];

export const BREWERY_HELPERS = [
  { id: 'malt-boy', name: 'Pip', wage: 25, skill: 'haul', bonus: 0.2, desc: 'Pip the malt boy hauls sacks all day without complaint.' },
  { id: 'cellar-keeper', name: 'Greta', wage: 40, skill: 'age', bonus: 0.25, desc: 'Greta keeps the cellar cool and the barrels honest.' },
  { id: 'tavern-runner', name: 'Jo', wage: 60, skill: 'sell', bonus: 0.15, desc: 'Jo runs kegs to the taverns and charms the landlords.' },
  { id: 'yeast-whisperer', name: 'Old Finn', wage: 80, skill: 'brew', bonus: 0.3, desc: 'Old Finn talks to the yeast, and the yeast listens.' },
];

export const BREWERY_CHALLENGES = [
  { id: 'kegs-100', name: 'A Hundred Kegs', target: 'produced', goal: 100, xp: 80, desc: 'Brew a hundred kegs in total.' },
  { id: 'sell-500', name: 'Five Hundred Sold', target: 'earned', goal: 500, xp: 120, desc: 'Earn five hundred from sales.' },
  { id: 'age-20', name: 'Cellar Twenty', target: 'aged', goal: 20, xp: 100, desc: 'Age twenty kegs in the cellar.' },
  { id: 'orders-10', name: 'Ten Orders Done', target: 'ordersDone', goal: 10, xp: 140, desc: 'Complete ten tavern orders.' },
  { id: 'streak-10', name: 'Ten Clean Batches', target: 'bestStreak', goal: 10, xp: 110, desc: 'Reach a ten-batch clean streak.' },
  { id: 'rank-3', name: 'Ale Lord', target: 'rank', goal: 3, xp: 150, desc: 'Reach rank three.' },
  { id: 'earn-2000', name: 'Two Thousand Earned', target: 'earned', goal: 2000, xp: 160, desc: 'Earn two thousand in total.' },
  { id: 'batches-50', name: 'Fifty Batches', target: 'batches', goal: 50, xp: 90, desc: 'Brew fifty batches.' },
];

export const BREWERY_ACHIEVEMENTS = [
  { id: 'first-brew', name: 'First Brew', check: 'batches', goal: 1, desc: 'Brew your very first batch.' },
  { id: 'first-sale', name: 'First Sale', check: 'sold', goal: 1, desc: 'Sell your first keg.' },
  { id: 'first-age', name: 'First Age', check: 'aged', goal: 1, desc: 'Age your first barrel.' },
  { id: 'rank-2', name: 'Brewmaster Rank', check: 'rank', goal: 2, desc: 'Reach the Brewmaster rank.' },
  { id: 'rich-brew', name: 'Rich Brewer', check: 'earned', goal: 2000, desc: 'Earn two thousand in total.' },
  { id: 'full-kit', name: 'Full Kit', check: 'upgradesCount', goal: 8, desc: 'Own every brewery upgrade.' },
  { id: 'no-spoil', name: 'No Spoil', check: 'spoiled', goal: 0, desc: 'Brew fifty batches without spoiling a single keg.' },
  { id: 'big-batch', name: 'Big Batch', check: 'bestBatch', goal: 20, desc: 'Brew a batch of twenty kegs.' },
];

export const BREWERY_TIPS = [
  { id: 'age-it', name: 'Age It', text: 'Age everything you can afford to age; cellar kegs pay far better.' },
  { id: 'lager-morning', name: 'Lager Morning', text: 'Start the day with a lager batch, quick and cheap.' },
  { id: 'strong-heat', name: 'Strong Heat', text: 'Strong brews draw the inspector, so sell them quietly.' },
  { id: 'festival-stock', name: 'Festival Stock', text: 'Stock up before festival week; thirsty crowds pay double.' },
  { id: 'yeast-care', name: 'Yeast Care', text: 'Mind your yeast and your thermometer, or batches spoil.' },
  { id: 'order-first', name: 'Order First', text: 'Take the tavern order first, then brew exactly for it.' },
  { id: 'mead-money', name: 'Mead Money', text: 'Honey mead is slow but it is the best coin per keg.' },
  { id: 'cellar-space', name: 'Cellar Space', text: 'Watch your stock cap; racks buy you forty more slots.' },
];

export const BREWERY_RECORDS = [
  { id: 'biggest-batch', name: 'Biggest Batch', stat: 'bestBatch', unit: 'kegs', desc: 'Largest single batch ever brewed.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'dollars', desc: 'Most coin earned in total.' },
  { id: 'most-brewed', name: 'Most Brewed', stat: 'produced', unit: 'kegs', desc: 'Most kegs brewed in total.' },
  { id: 'most-aged', name: 'Most Aged', stat: 'aged', unit: 'kegs', desc: 'Most kegs aged in the cellar.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'batches', desc: 'Longest clean brewing streak.' },
];

export const BREWERY_MARKET_EVENTS = [
  { id: 'hop-boom', name: 'Hop Boom', items: ['hoppy-ipa'], mult: 1.4, desc: 'Everyone wants hoppy IPA this week.' },
  { id: 'lager-glut', name: 'Lager Glut', items: ['golden-lager', 'pilsner'], mult: 0.6, desc: 'Too much lager on the market, prices sag.' },
  { id: 'mead-rush', name: 'Mead Rush', items: ['honey-mead'], mult: 1.5, desc: 'Mead is the talk of the town.' },
  { id: 'stout-season', name: 'Stout Season', items: ['dark-stout', 'smoked-porter'], mult: 1.3, desc: 'Cold nights make dark beer king.' },
  { id: 'cider-harvest', name: 'Cider Harvest', items: ['apple-cider'], mult: 1.35, desc: 'Apple season lifts the cider trade.' },
  { id: 'barleywine-club-night', name: 'Barleywine Club Night', items: ['barleywine'], mult: 1.3, desc: 'The club meets and barleywine flies.' },
  { id: 'sour-trend', name: 'Sour Trend', items: ['sour-cherry'], mult: 1.25, desc: 'Sours are suddenly fashionable.' },
  { id: 'wheat-summer', name: 'Wheat Summer', items: ['wheat-beer'], mult: 1.3, desc: 'Summer afternoons call for wheat beer.' },
  { id: 'amber-week', name: 'Amber Week', items: ['amber-ale', 'brown-ale'], mult: 1.2, desc: 'Amber ales are in demand.' },
  { id: 'tax-hike', name: 'Tax Hike', items: ['barleywine', 'honey-mead'], mult: 0.7, desc: 'A new tax bites the strong stuff hardest.' },
  { id: 'dry-week', name: 'Dry Week', items: ['golden-lager', 'apple-cider'], mult: 0.75, desc: 'A dry spell cools the easy drinkers.' },
  { id: 'oktoberfest', name: 'Oktoberfest', items: ['golden-lager', 'hoppy-ipa', 'wheat-beer'], mult: 1.2, desc: 'Oktoberfest lifts every festival favourite.' },
];

export const BREWERY_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Spring crowds return to the beer gardens.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Steady summer thirst.' },
  { id: 'autumn', name: 'Autumn', mult: 1.1, desc: 'Harvest season brings the festivals.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold winter nights thin the crowds.' },
];

export const BREWERY_LEADERBOARD = [
  { name: 'Tomas', total: 4200, desc: 'The old master still leads the board.' },
  { name: 'Greta', total: 2900, desc: 'Cellar keeper with a steady hand.' },
  { name: 'You', total: 0, desc: 'Your running total.' },
  { name: 'Pip', total: 1500, desc: 'The malt boy is climbing fast.' },
  { name: 'Finn', total: 2400, desc: 'Old Finn and his whispering yeast.' },
];

export const BREWERY_QUICK_START = [
  'Brew lager first, it is quick and cheap.',
  'Age everything affordable, cellar kegs pay far better.',
  'Buy the thermometer before the still, spoiled batches hurt.',
  'Take tavern orders then brew for them, never the other way round.',
  'Sell strong brews quietly, the inspector is always watching.',
  'Check the price board every morning before you brew.',
];

export const BREWERY_META = {
  system: 'brewery',
  version: '7b-C',
  author: 'builder-3',
  label: 'Brewery',
  owner: 'Old Tomas the Brewmaster',
  itemCount: 12,
};

// ---- module helpers ----

export function breweryRankFor(xp) {
  let found = 0;
  for (let i = 0; i < BREWERY_RANKS.length; i++) {
    if (xp >= BREWERY_RANKS[i].xp) found = i;
  }
  return found;
}

function brewEffects(owned) {
  const set = new Set();
  for (const id of owned) {
    const up = BREWERY_UPGRADES.find((u) => u.id === id);
    if (up) set.add(up.effect);
  }
  return set;
}

export function breweryItemById(id) {
  return BREW_RECIPES.find((r) => r.id === id) || null;
}

export function breweryPriceFor(id, drift, rank, upgrades) {
  const item = breweryItemById(id);
  if (!item) return 0;
  const effects = brewEffects(upgrades || []);
  const driftNow = (drift && typeof drift[id] === 'number') ? drift[id] : 0;
  let price = item.basePrice * (1 + driftNow) * (1 + 0.1 * rank);
  if (item.difficulty >= 3 && effects.has('strong-plus')) price *= 1.3;
  if (effects.has('sell-plus')) price *= 1.15;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function brewerySellPriceFor(id, premium, drift, rank, upgrades) {
  const base = breweryPriceFor(id, drift, rank, upgrades);
  if (base === 0) return 0;
  const priced = premium ? base * 1.5 : base;
  return Math.max(1, Math.round(priced * 10) / 10);
}

export function breweryCostFor(id, qty, upgrades) {
  const item = breweryItemById(id);
  if (!item) return 0;
  const effects = brewEffects(upgrades || []);
  let cost = Math.round(item.basePrice * 0.4 * qty);
  if (effects.has('cost-down')) cost = Math.round(cost * 0.8);
  return Math.max(1, cost);
}

export function breweryStockCap(upgrades) {
  const effects = brewEffects(upgrades || []);
  return effects.has('stock-plus') ? 80 : 40;
}

export function brewerySpoilChance(item, upgrades) {
  const effects = brewEffects(upgrades || []);
  let chance = 0.04 + item.difficulty * 0.015;
  if (effects.has('spoil-down')) chance /= 2;
  return chance;
}

export function breweryBestSeller(drift, rank, upgrades) {
  let best = null;
  for (const item of BREW_RECIPES) {
    const price = breweryPriceFor(item.id, drift, rank, upgrades);
    if (!best || price > best.price) best = { id: item.id, price };
  }
  return best;
}

export function breweryCheapest(drift, rank, upgrades) {
  let low = null;
  for (const item of BREW_RECIPES) {
    const price = breweryPriceFor(item.id, drift, rank, upgrades);
    if (!low || price < low.price) low = { id: item.id, price };
  }
  return low;
}

export function breweryTipFor(day) {
  return BREWERY_TIPS[((day % BREWERY_TIPS.length) + BREWERY_TIPS.length) % BREWERY_TIPS.length];
}

export function breweryLeaderboardWith(playerTotal) {
  const rows = BREWERY_LEADERBOARD.map((row) => ({
    name: row.name,
    total: row.name === 'You' ? playerTotal : row.total,
    desc: row.desc,
  }));
  rows.sort((a, b) => b.total - a.total);
  return rows.map((row, i) => ({ rank: i + 1, name: row.name, total: row.total, desc: row.desc }));
}

// ---- system factory ----

export function createBrewerySystem(ctx) {
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

  const blankMap = () => {
    const m = {};
    for (const r of BREW_RECIPES) m[r.id] = 0;
    return m;
  };

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
    inventory: blankMap(),
    premium: blankMap(),
    upgrades: [],
    activeOrder: null,
    orderProgress: 0,
    cooldown: 0,
    dayDrift: blankMap(),
    lastDay: 1,
    dailySold: 0,
    dailyEarned: 0,
    heatTaken: 0,
    eventsSeen: 0,
    lastEvent: 'none',
    perfectBatches: 0,
  };

  const STATE_KEYS = Object.keys(state);

  function refreshRank() {
    const next = breweryRankFor(state.xp);
    if (next > state.rank) {
      state.rank = next;
      log('Rank up! You are now ' + BREWERY_RANKS[next].name + '.');
    }
  }

  function gainXp(amount) {
    state.xp += amount;
    refreshRank();
  }

  function totalStock() {
    let sum = 0;
    for (const r of BREW_RECIPES) sum += state.inventory[r.id] + state.premium[r.id];
    return sum;
  }

  function stockOf(id) {
    return state.inventory[id] + state.premium[id];
  }

  function takeStock(id, qty) {
    let left = qty;
    const fromRegular = Math.min(state.inventory[id], left);
    state.inventory[id] -= fromRegular;
    left -= fromRegular;
    if (left > 0) state.premium[id] -= left;
  }

  function applyEventEffect(ev) {
    if (ev.effect === 'cost-up') {
      for (const r of BREW_RECIPES) state.dayDrift[r.id] += 0.15;
    } else if (ev.effect === 'cost-down') {
      for (const r of BREW_RECIPES) state.dayDrift[r.id] -= 0.1;
    } else if (ev.effect === 'sell-up') {
      for (const r of BREW_RECIPES) state.dayDrift[r.id] += 0.2;
    } else if (ev.effect === 'xp') {
      gainXp(25);
    } else if (ev.effect === 'orders-up') {
      gainXp(10);
    } else if (ev.effect === 'heat') {
      addHeat(1);
      state.heatTaken += 1;
    } else if (ev.effect === 'spoil') {
      const stocked = BREW_RECIPES.filter((r) => stockOf(r.id) > 0);
      if (stocked.length > 0) {
        const pick = stocked[Math.floor(rng() * stocked.length)];
        const lost = Math.min(2, stockOf(pick.id));
        takeStock(pick.id, lost);
        state.spoiled += lost;
        log('Spoiled ' + lost + ' kegs of ' + pick.name + '.');
      }
    }
  }

  const system = {
    name: 'brewery',
    ...state,

    brew(id, qty) {
      const amount = qty === undefined ? 1 : qty;
      const item = breweryItemById(id);
      if (!item) return { ok: false, reason: 'unknown-item' };
      if (!amount || amount <= 0) return { ok: false, reason: 'bad-quantity' };
      if (state.cooldown > 0) return { ok: false, reason: 'cooldown' };
      const cost = breweryCostFor(id, amount, state.upgrades);
      if (getCash() < cost) return { ok: false, reason: 'not-enough-cash' };
      if (totalStock() + amount > breweryStockCap(state.upgrades)) return { ok: false, reason: 'stock-full' };
      addCash(-cost);
      state.spent += cost;
      let made = amount;
      if (rng() < brewerySpoilChance(item, state.upgrades)) {
        const half = Math.floor(amount / 2);
        const lost = 1 + Math.floor(rng() * Math.max(1, half));
        made = Math.max(0, amount - lost);
        state.spoiled += lost;
        state.streak = 0;
        log('A batch of ' + item.name + ' spoiled, ' + lost + ' kegs lost.');
      } else {
        state.streak += 1;
        if (state.streak > state.bestStreak) state.bestStreak = state.streak;
        if (item.difficulty >= 4) state.perfectBatches += 1;
      }
      state.inventory[id] += made;
      state.batches += 1;
      state.produced += made;
      if (made > state.bestBatch) state.bestBatch = made;
      const effects = brewEffects(state.upgrades);
      state.cooldown = effects.has('brew-fast') ? Math.max(1, Math.floor(item.time * 0.8)) : item.time;
      gainXp(4 + made + item.difficulty * 2);
      if (item.difficulty >= 4 && rng() < 0.15) {
        addHeat(1);
        state.heatTaken += 1;
        log('The strong brew drew an inspector\'s eye.');
      }
      if (state.activeOrder) {
        const order = state.activeOrder;
        if (order.item === 'mixed' || order.item === id) state.orderProgress += made;
      }
      log('Brewed ' + made + ' kegs of ' + item.name + '.');
      return { ok: true, item: id, made, cost, cooldown: state.cooldown };
    },

    ageBarrel(id, qty) {
      const amount = qty === undefined ? 1 : qty;
      const item = breweryItemById(id);
      if (!item) return { ok: false, reason: 'unknown-item' };
      if (!amount || amount <= 0) return { ok: false, reason: 'bad-quantity' };
      if (state.inventory[id] < amount) return { ok: false, reason: 'not-enough-stock' };
      state.inventory[id] -= amount;
      state.premium[id] += amount;
      state.aged += amount;
      gainXp(6 + amount * 2);
      log('Aged ' + amount + ' kegs of ' + item.name + ' in oak.');
      return { ok: true, item: id, quantity: amount, premium: state.premium[id] };
    },

    sell(id, qty) {
      const item = breweryItemById(id);
      if (!item) return { ok: false, reason: 'unknown-item' };
      if (!qty || qty <= 0) return { ok: false, reason: 'bad-quantity' };
      if (stockOf(id) < qty) return { ok: false, reason: 'not-enough-stock' };
      const fromPremium = Math.min(state.premium[id], qty);
      const fromRegular = qty - fromPremium;
      const total = Math.round((fromPremium * brewerySellPriceFor(id, true, state.dayDrift, state.rank, state.upgrades)
        + fromRegular * brewerySellPriceFor(id, false, state.dayDrift, state.rank, state.upgrades)) * 10) / 10;
      state.premium[id] -= fromPremium;
      state.inventory[id] -= fromRegular;
      state.sold += qty;
      state.earned += total;
      state.dailySold += qty;
      state.dailyEarned += total;
      addCash(total);
      gainXp(qty);
      return { ok: true, total, quantity: qty };
    },

    sellAll() {
      let total = 0;
      let units = 0;
      const lines = [];
      for (const item of BREW_RECIPES) {
        const qty = stockOf(item.id);
        if (qty <= 0) continue;
        const fromPremium = Math.min(state.premium[item.id], qty);
        const fromRegular = qty - fromPremium;
        const lineTotal = Math.round((fromPremium * brewerySellPriceFor(item.id, true, state.dayDrift, state.rank, state.upgrades)
          + fromRegular * brewerySellPriceFor(item.id, false, state.dayDrift, state.rank, state.upgrades)) * 10) / 10;
        state.premium[item.id] -= fromPremium;
        state.inventory[item.id] -= fromRegular;
        total += lineTotal;
        units += qty;
        lines.push({ id: item.id, quantity: qty, total: lineTotal });
      }
      if (units === 0) return { ok: false, reason: 'nothing-to-sell' };
      total = Math.round(total * 10) / 10;
      state.sold += units;
      state.earned += total;
      state.dailySold += units;
      state.dailyEarned += total;
      addCash(total);
      gainXp(units);
      return { ok: true, total, units, lines };
    },

    buyUpgrade(id) {
      const up = BREWERY_UPGRADES.find((u) => u.id === id);
      if (!up) return { ok: false, reason: 'unknown-upgrade' };
      if (state.upgrades.includes(id)) return { ok: false, reason: 'already-owned' };
      if (getCash() < up.cost) return { ok: false, reason: 'not-enough-cash' };
      addCash(-up.cost);
      state.spent += up.cost;
      state.upgrades.push(id);
      gainXp(20);
      log('Bought the ' + up.name + ' upgrade.');
      return { ok: true, id };
    },

    takeOrder(id) {
      const order = BREWERY_ORDERS.find((o) => o.id === id);
      if (!order) return { ok: false, reason: 'unknown-order' };
      if (state.activeOrder) return { ok: false, reason: 'order-active' };
      if (state.rank < order.minRank) return { ok: false, reason: 'rank-too-low' };
      const today = getDay();
      state.activeOrder = { ...order, takenDay: today, deadline: today + order.days };
      state.orderProgress = 0;
      log('Took the order: ' + order.name + '.');
      return { ok: true, order: state.activeOrder };
    },

    deliverOrder() {
      const order = state.activeOrder;
      if (!order) return { ok: false, reason: 'no-active-order' };
      if (order.item === 'mixed') {
        if (totalStock() < order.qty) return { ok: false, reason: 'not-enough-stock' };
        let need = order.qty;
        for (const item of BREW_RECIPES) {
          if (need <= 0) break;
          const take = Math.min(stockOf(item.id), need);
          takeStock(item.id, take);
          need -= take;
        }
      } else {
        if (stockOf(order.item) < order.qty) return { ok: false, reason: 'not-enough-stock' };
        takeStock(order.item, order.qty);
        state.orderProgress = order.qty;
      }
      const pay = order.pay + 40 * state.rank;
      state.activeOrder = null;
      state.orderProgress = 0;
      state.ordersDone += 1;
      state.earned += pay;
      state.dailyEarned += pay;
      addCash(pay);
      gainXp(60);
      log('Delivered ' + order.name + ' for ' + pay + '.');
      return { ok: true, pay };
    },

    abandonOrder() {
      if (!state.activeOrder) return { ok: false, reason: 'no-active-order' };
      state.activeOrder = null;
      state.orderProgress = 0;
      state.ordersFailed += 1;
      return { ok: true };
    },

    haggle() {
      if (state.rank < 1) return { ok: false, reason: 'rank-too-low' };
      const bonus = Math.round((0.05 + 0.03 * state.rank) * 100) / 100;
      const haggled = rng() < 0.55;
      return { ok: true, haggled, bonus };
    },

    priceBoard() {
      return BREW_RECIPES.map((item) => ({
        id: item.id,
        name: item.name,
        price: breweryPriceFor(item.id, state.dayDrift, state.rank, state.upgrades),
        drift: state.dayDrift[item.id],
        stock: state.inventory[item.id],
        premium: state.premium[item.id],
      }));
    },

    orderList() {
      return BREWERY_ORDERS.map((o) => ({
        id: o.id, name: o.name, item: o.item, quantity: o.qty, pay: o.pay, days: o.days, minRank: o.minRank,
      }));
    },

    dailyEvent() {
      state.eventsSeen += 1;
      const weather = getWeather();
      if (weather && weather.condition === 'rain' && rng() < 0.3) {
        state.lastEvent = 'rainy-day';
        return { ok: true, event: 'rainy-day', name: 'Rainy Day' };
      }
      if (rng() < 0.18) {
        const ev = BREWERY_EVENTS[Math.floor(rng() * BREWERY_EVENTS.length)];
        applyEventEffect(ev);
        state.lastEvent = ev.id;
        return { ok: true, event: ev.id, name: ev.name };
      }
      state.lastEvent = 'none';
      return { ok: true, event: 'none', name: 'No event' };
    },

    tasteTest(id) {
      const item = breweryItemById(id);
      if (!item) return { ok: false, reason: 'unknown-item' };
      if (stockOf(id) <= 0) return { ok: false, reason: 'no-stock' };
      const raw = 0.5 + rng() * 0.5 + state.rank * 0.02 + item.difficulty * 0.01;
      const quality = Math.round(Math.min(1, raw) * 100) / 100;
      gainXp(5);
      const grade = quality >= 0.9 ? 'outstanding' : quality >= 0.7 ? 'solid' : 'needs work';
      return { ok: true, item: id, quality, verdict: grade + ' — says Old Tomas' };
    },

    tick(dt) {
      state.cooldown = Math.max(0, state.cooldown - dt);
    },

    tickDay(day) {
      if (day === state.lastDay) return;
      state.lastDay = day;
      for (const r of BREW_RECIPES) {
        const next = state.dayDrift[r.id] + (rng() - 0.5) * 0.1;
        state.dayDrift[r.id] = Math.max(-0.5, Math.min(0.6, next));
      }
      state.dailySold = 0;
      state.dailyEarned = 0;
      if (state.activeOrder && day > state.activeOrder.deadline && state.orderProgress < state.activeOrder.qty) {
        state.activeOrder = null;
        state.orderProgress = 0;
        state.ordersFailed += 1;
        log('An order expired undelivered.');
      }
      system.dailyEvent();
    },

    serialize() {
      const copy = {};
      for (const key of STATE_KEYS) {
        copy[key] = JSON.parse(JSON.stringify(state[key]));
      }
      return copy;
    },

    deserialize(saved) {
      if (!saved || typeof saved !== 'object') return;
      for (const key of STATE_KEYS) {
        if (key in saved) state[key] = JSON.parse(JSON.stringify(saved[key]));
      }
      for (const r of BREW_RECIPES) {
        if (typeof state.inventory[r.id] !== 'number') state.inventory[r.id] = 0;
        if (typeof state.premium[r.id] !== 'number') state.premium[r.id] = 0;
        if (typeof state.dayDrift[r.id] !== 'number') state.dayDrift[r.id] = 0;
      }
      refreshRank();
    },

    stats() {
      const stock = totalStock();
      const eff = state.produced + state.spoiled === 0
        ? 100
        : Math.round((state.produced / (state.produced + state.spoiled)) * 100);
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
        stock,
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
        efficiency: eff,
      };
    },

    hudLine() {
      if (state.cooldown > 0) return 'Brewery — working, ' + Math.ceil(state.cooldown) + 's left';
      if (state.activeOrder) return 'Order: ' + state.activeOrder.name + ' ' + state.orderProgress + '/' + state.activeOrder.qty;
      const stock = totalStock();
      if (stock > 0) return 'Brewery — ' + stock + ' kegs in stock';
      return '';
    },

    interact() {
      const pos = getPlayerPos();
      const dx = pos.x - 210;
      const dz = pos.z - (-140);
      if (Math.hypot(dx, dz) > 25) return false;
      for (const item of BREW_RECIPES) {
        if (stockOf(item.id) > 0) {
          system.sell(item.id, 1);
          return true;
        }
      }
      const cheap = breweryCheapest(state.dayDrift, state.rank, state.upgrades);
      return system.brew(cheap.id, 1);
    },
  };

  // Keep the returned object's state fields live: methods above close over
  // the private state, so mirror it onto the object through accessors.
  for (const key of STATE_KEYS) {
    Object.defineProperty(system, key, {
      get() { return state[key]; },
      set(v) { state[key] = v; },
      enumerable: true,
      configurable: true,
    });
  }

  return system;
}

// ---- extras factory ----

export function createBreweryExtras(system) {
  const hired = [];
  const claimed = [];
  let wagesPaid = 0;
  let donated = 0;
  let rep = 0;

  function challengeValue(ch) {
    if (ch.target === 'upgradesCount') return system.upgrades.length;
    return system[ch.target] || 0;
  }

  function achievementValue(ach) {
    if (ach.check === 'upgradesCount') return system.upgrades.length;
    return system[ach.check] || 0;
  }

  const extras = {
    hireHelper(id) {
      const helper = BREWERY_HELPERS.find((h) => h.id === id);
      if (!helper) return { ok: false, reason: 'unknown-helper' };
      if (hired.some((h) => h.id === id)) return { ok: false, reason: 'already-hired' };
      hired.push(helper);
      return { ok: true, id: helper.id, name: helper.name, wage: helper.wage };
    },

    fireHelper(id) {
      const at = hired.findIndex((h) => h.id === id);
      if (at < 0) return { ok: false, reason: 'not-hired' };
      hired.splice(at, 1);
      return { ok: true, id };
    },

    payWages() {
      const due = hired.reduce((sum, h) => sum + h.wage, 0);
      wagesPaid += due;
      return { ok: true, due, helpers: hired.map((h) => ({ ...h })), wagesPaid };
    },

    helperBonus(skill) {
      return hired.reduce((sum, h) => sum + (h.skill === skill ? h.bonus : 0), 0);
    },

    challenges() {
      return BREWERY_CHALLENGES.map((ch) => {
        const value = Math.floor(challengeValue(ch));
        return { id: ch.id, name: ch.name, value, goal: ch.goal, done: value >= ch.goal };
      });
    },

    claimChallenge(id) {
      const ch = BREWERY_CHALLENGES.find((c) => c.id === id);
      if (!ch) return { ok: false, reason: 'unknown-challenge' };
      if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
      const value = Math.floor(challengeValue(ch));
      if (value < ch.goal) return { ok: false, reason: 'not-done', value, goal: ch.goal };
      claimed.push(id);
      return { ok: true, id, xp: ch.xp };
    },

    achievements() {
      return BREWERY_ACHIEVEMENTS.map((ach) => {
        let done;
        if (ach.check === 'spoiled') {
          done = system.batches >= 50 && system.spoiled === 0;
        } else {
          done = achievementValue(ach) >= ach.goal;
        }
        return { id: ach.id, name: ach.name, desc: ach.desc, done };
      });
    },

    donate(id, qty) {
      if (!qty || qty <= 0) return { ok: false, reason: 'bad-quantity' };
      const held = (system.inventory[id] || 0) + (system.premium[id] || 0);
      if (held < qty) return { ok: false, reason: 'not-enough-stock', held };
      let left = qty;
      const fromRegular = Math.min(system.inventory[id], left);
      system.inventory[id] -= fromRegular;
      left -= fromRegular;
      if (left > 0) system.premium[id] -= left;
      donated += qty;
      rep += Math.floor(qty / 10);
      return { ok: true, quantity: qty, reputation: rep, note: 'Old Tomas thanks you for the donation.' };
    },

    clearStale() {
      let cleared = 0;
      for (const item of BREW_RECIPES) {
        if (item.difficulty <= 1) {
          cleared += system.inventory[item.id];
          system.inventory[item.id] = 0;
        }
      }
      return { ok: true, cleared };
    },

    stockReport() {
      let stock = 0;
      let premium = 0;
      for (const item of BREW_RECIPES) {
        stock += system.inventory[item.id];
        premium += system.premium[item.id];
      }
      const cap = breweryStockCap(system.upgrades);
      return { ok: true, stock, premium, cap, free: cap - stock - premium };
    },

    get helpers() { return hired.map((h) => ({ ...h })); },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return wagesPaid; },
    get donated() { return donated; },
    get rep() { return rep; },
  };

  return extras;
}
