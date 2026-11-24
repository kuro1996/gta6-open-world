// Fish market — Fishmonger Sal buys twelve lots of catch at dawn, ices
// them and sells to restaurants, sushi bars and chip shops. Pure logic,
// no rendering, no imports. The game wires this file through the standard
// context with safe defaults.

export const MARKET_CATCH = [
  { id: 'red-snapper', name: 'Red Snapper', basePrice: 28, time: 2, difficulty: 2, origin: 'reef', weight: 1.1, freshness: 5, desc: 'A rosy red snapper, firm and sweet, straight off the reef.' },
  { id: 'sea-bass', name: 'Sea Bass', basePrice: 32, time: 2, difficulty: 2, origin: 'coast', weight: 1.3, freshness: 5, desc: 'A silver sea bass, the chefs ask for it by name.' },
  { id: 'tuna-loin', name: 'Tuna Loin', basePrice: 48, time: 3, difficulty: 4, origin: 'deep sea', weight: 2.0, freshness: 4, desc: 'A deep-red tuna loin, cut thick for the sushi bars.' },
  { id: 'salmon-fillet', name: 'Salmon Fillet', basePrice: 36, time: 2, difficulty: 2, origin: 'north sea', weight: 1.5, freshness: 5, desc: 'Orange salmon fillets, rich and buttery.' },
  { id: 'sardines', name: 'Sardines', basePrice: 10, time: 1, difficulty: 1, origin: 'bay', weight: 0.3, freshness: 4, desc: 'Little bay sardines, cheap and always moving.' },
  { id: 'mackerel', name: 'Mackerel', basePrice: 14, time: 1, difficulty: 1, origin: 'bay', weight: 0.4, freshness: 4, desc: 'Oily mackerel, best grilled the same day.' },
  { id: 'prawns', name: 'Prawns', basePrice: 40, time: 2, difficulty: 3, origin: 'estuary', weight: 0.8, freshness: 5, desc: 'Sweet estuary prawns, pink and plump.' },
  { id: 'lobster', name: 'Lobster', basePrice: 68, time: 3, difficulty: 5, origin: 'rocky shore', weight: 1.8, freshness: 5, desc: 'A live lobster, the market crown jewel.' },
  { id: 'crab', name: 'Crab', basePrice: 52, time: 3, difficulty: 4, origin: 'rocky shore', weight: 1.2, freshness: 4, desc: 'A heavy crab, full of sweet white meat.' },
  { id: 'oysters', name: 'Oysters', basePrice: 44, time: 2, difficulty: 3, origin: 'oyster beds', weight: 0.9, freshness: 5, desc: 'Briny oysters from the beds, sold by the dozen.' },
  { id: 'squid', name: 'Squid', basePrice: 22, time: 2, difficulty: 2, origin: 'open water', weight: 0.7, freshness: 4, desc: 'Fresh squid, tender if you cook it fast.' },
  { id: 'cod-fillet', name: 'Cod Fillet', basePrice: 24, time: 2, difficulty: 1, origin: 'north sea', weight: 1.4, freshness: 4, desc: 'Flaky cod fillets, the chip shops buy them by the crate.' },
];

export const FISH_MARKET_UPGRADES = [
  { id: 'ice-machine', name: 'Ice Machine', cost: 120, desc: 'A humming ice machine that keeps lots fresh and fast.', effect: 'brew-fast' },
  { id: 'auction-paddle', name: 'Auction Paddle', cost: 180, desc: 'Your own paddle, cutting the cost of every lot.', effect: 'cost-down' },
  { id: 'cold-store', name: 'Cold Store', cost: 220, desc: 'A deep cold store that never lets a lot spoil.', effect: 'spoil-down' },
  { id: 'stall-awning', name: 'Stall Awning', cost: 300, desc: 'A striped awning where lots fetch a better price.', effect: 'sell-plus' },
  { id: 'fish-crates', name: 'Fish Crates', cost: 260, desc: 'Stacked crates that double your stock room.', effect: 'stock-plus' },
  { id: 'ice-tools', name: 'Ice Tools', cost: 350, desc: 'Fine tools for icing and packing lots.', effect: 'age-plus' },
  { id: 'delivery-van', name: 'Delivery Van', cost: 480, desc: 'A sturdy van for hauling bulk orders to restaurants.', effect: 'bulk' },
  { id: 'master-scale', name: 'Master Scale', cost: 750, desc: 'The master scale, coaxing top coin from the finest lots.', effect: 'strong-plus' },
];

export const FISH_MARKET_ORDERS = [
  { id: 'restaurant-12', name: 'Restaurant Dozen', item: 'salmon-fillet', qty: 12, pay: 480, days: 1, minRank: 0, desc: 'The restaurant wants a dozen salmon fillets for tonight.' },
  { id: 'wedding-lobster', name: 'Wedding Lobster', item: 'lobster', qty: 6, pay: 560, days: 2, minRank: 4, desc: 'Six lobsters for a wedding feast, no substitutes.' },
  { id: 'fish-chips', name: 'Fish and Chips', item: 'cod-fillet', qty: 20, pay: 340, days: 1, minRank: 1, desc: 'Twenty cod fillets for the chip shop fryers.' },
  { id: 'sushi-bar', name: 'Sushi Bar', item: 'tuna-loin', qty: 8, pay: 520, days: 2, minRank: 3, desc: 'Eight tuna loins for the sushi bar counter.' },
  { id: 'oyster-night', name: 'Oyster Night', item: 'oysters', qty: 10, pay: 460, days: 2, minRank: 3, desc: 'Ten dozen oysters for the oyster night.' },
  { id: 'prawn-party', name: 'Prawn Party', item: 'prawns', qty: 14, pay: 420, days: 1, minRank: 3, desc: 'Fourteen pounds of prawns for a party platter.' },
  { id: 'market-sardines', name: 'Market Sardines', item: 'sardines', qty: 30, pay: 300, days: 1, minRank: 1, desc: 'Thirty sardines for the morning market stall.' },
  { id: 'mixed-lots', name: 'Mixed Lots', item: 'mixed', qty: 20, pay: 580, days: 2, minRank: 3, desc: 'Twenty lots of anything, for a restaurant restock.' },
];

export const FISH_MARKET_EVENTS = [
  { id: 'catch-shortage', name: 'Catch Shortage', text: 'The boats came in light and prices climb.', effect: 'cost-up' },
  { id: 'dinner-rush', name: 'Dinner Rush', text: 'The dinner crowd is hungry and paying well.', effect: 'sell-up' },
  { id: 'health-inspection', name: 'Health Inspection', text: 'An inspector is checking the stall today.', effect: 'heat' },
  { id: 'big-catch', name: 'Big Catch', text: 'The boats came in heavy and fish is cheap.', effect: 'cost-down' },
  { id: 'spoiled-lot', name: 'Spoiled Lot', text: 'A lot went off in the sun and must be tossed.', effect: 'spoil' },
  { id: 'street-fair', name: 'Street Fair', text: 'The street fair wants lots, fast.', effect: 'orders-up' },
  { id: 'cold-snap', name: 'Cold Snap', text: 'Cold evenings have everyone buying fresh fish.', effect: 'sell-up' },
  { id: 'ice-breakdown', name: 'Ice Breakdown', text: 'The ice machine broke down and ruined some lots.', effect: 'spoil' },
  { id: 'market-critic', name: 'Market Critic', text: 'A travelling critic shares hard-won wisdom.', effect: 'xp' },
  { id: 'storm-night', name: 'Storm Night', text: 'A storm keeps the boats in, and orders pile up.', effect: 'orders-up' },
];

export const FISH_MARKET_RANKS = [
  { level: 0, name: 'Crate Hand', xp: 0, perk: 'Learning the auction.' },
  { level: 1, name: 'Stall Hand', xp: 120, perk: 'Steadier hands, better prices.' },
  { level: 2, name: 'Fishmonger', xp: 300, perk: 'The town knows your name.' },
  { level: 3, name: 'Catch Baron', xp: 620, perk: 'Restaurants bid for your lots.' },
  { level: 4, name: 'Legend of the Tide', xp: 1100, perk: 'Your lots are sung about in song.' },
];

export const FISH_MARKET_HELPERS = [
  { id: 'apprentice', name: 'Finn', wage: 25, skill: 'haul', bonus: 0.2, desc: 'Finn the apprentice hauls crates all day.' },
  { id: 'ice-keeper', name: 'Mara', wage: 40, skill: 'age', bonus: 0.25, desc: 'Mara keeps the ice thick and the lots honest.' },
  { id: 'stall-runner', name: 'Dee', wage: 60, skill: 'sell', bonus: 0.15, desc: 'Dee runs lots to the stalls and charms the chefs.' },
  { id: 'auction-master', name: 'Old Sal Jr', wage: 80, skill: 'brew', bonus: 0.3, desc: 'Old Sal Jr calls the auction like a song.' },
];

export const FISH_MARKET_CHALLENGES = [
  { id: 'lots-100', name: 'A Hundred Lots', target: 'produced', goal: 100, xp: 80, desc: 'Buy a hundred lots in total.' },
  { id: 'sell-500', name: 'Five Hundred Sold', target: 'earned', goal: 500, xp: 120, desc: 'Earn five hundred from sales.' },
  { id: 'ice-20', name: 'Ice Twenty', target: 'aged', goal: 20, xp: 100, desc: 'Ice twenty lots.' },
  { id: 'orders-10', name: 'Ten Orders Done', target: 'ordersDone', goal: 10, xp: 140, desc: 'Complete ten restaurant orders.' },
  { id: 'streak-10', name: 'Ten Clean Batches', target: 'bestStreak', goal: 10, xp: 110, desc: 'Reach a ten-batch clean streak.' },
  { id: 'rank-3', name: 'Catch Baron', target: 'rank', goal: 3, xp: 150, desc: 'Reach rank three.' },
  { id: 'earn-2000', name: 'Two Thousand Earned', target: 'earned', goal: 2000, xp: 160, desc: 'Earn two thousand in total.' },
  { id: 'batches-50', name: 'Fifty Batches', target: 'batches', goal: 50, xp: 90, desc: 'Buy fifty batches.' },
];

export const FISH_MARKET_ACHIEVEMENTS = [
  { id: 'first-lot', name: 'First Lot', check: 'batches', goal: 1, desc: 'Buy your very first lot.' },
  { id: 'first-sale', name: 'First Sale', check: 'sold', goal: 1, desc: 'Sell your first lot.' },
  { id: 'first-ice', name: 'First Ice', check: 'aged', goal: 1, desc: 'Ice your first lot.' },
  { id: 'rank-2', name: 'Fishmonger Rank', check: 'rank', goal: 2, desc: 'Reach the Fishmonger rank.' },
  { id: 'rich-fish', name: 'Rich Fish', check: 'earned', goal: 2000, desc: 'Earn two thousand in total.' },
  { id: 'full-kit', name: 'Full Kit', check: 'upgradesCount', goal: 8, desc: 'Own every fish market upgrade.' },
  { id: 'no-spoil', name: 'No Spoil', check: 'spoiled', goal: 0, desc: 'Buy fifty batches without spoiling a single lot.' },
  { id: 'big-lot', name: 'Big Lot', check: 'bestBatch', goal: 20, desc: 'Buy a batch of twenty lots.' },
];

export const FISH_MARKET_TIPS = [
  { id: 'fresh-first', name: 'Fresh First', text: 'Buy sardines first, they are quick and always sell.' },
  { id: 'ice-it', name: 'Ice It', text: 'Ice everything you can afford; iced lots pay far better.' },
  { id: 'tide-care', name: 'Tide Care', text: 'Mind the tide and your cold store, or lots spoil.' },
  { id: 'fair-stock', name: 'Fair Stock', text: 'Stock up before the street fair; hungry crowds pay double.' },
  { id: 'ice-watch', name: 'Ice Watch', text: 'Watch the ice level, or the morning catch goes off.' },
  { id: 'order-first', name: 'Order First', text: 'Take the restaurant order first, then buy exactly for it.' },
  { id: 'lobster-money', name: 'Lobster Money', text: 'Lobster is slow but it is the best coin per lot.' },
  { id: 'crate-space', name: 'Crate Space', text: 'Watch your stock cap; crates buy you forty more slots.' },
];

export const FISH_MARKET_RECORDS = [
  { id: 'biggest-lot', name: 'Biggest Lot', stat: 'bestBatch', unit: 'lots', desc: 'Largest single batch ever bought.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'dollars', desc: 'Most coin earned in total.' },
  { id: 'most-bought', name: 'Most Bought', stat: 'produced', unit: 'lots', desc: 'Most lots bought in total.' },
  { id: 'most-iced', name: 'Most Iced', stat: 'aged', unit: 'lots', desc: 'Most lots iced.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'lots', desc: 'Longest clean buying streak.' },
];

export const FISH_MARKET_MARKET_EVENTS = [
  { id: 'lobster-boom', name: 'Lobster Boom', items: ['lobster'], mult: 1.4, desc: 'Everyone wants lobster this week.' },
  { id: 'sardine-glut', name: 'Sardine Glut', items: ['sardines', 'mackerel'], mult: 0.6, desc: 'Too many sardines on the market, prices sag.' },
  { id: 'tuna-rush', name: 'Tuna Rush', items: ['tuna-loin'], mult: 1.5, desc: 'Tuna is the talk of the town.' },
  { id: 'salmon-season', name: 'Salmon Season', items: ['salmon-fillet'], mult: 1.3, desc: 'Salmon season lifts the whole market.' },
  { id: 'prawn-morning', name: 'Prawn Morning', items: ['prawns'], mult: 1.35, desc: 'Prawn mornings are booming.' },
  { id: 'oyster-night', name: 'Oyster Night', items: ['oysters'], mult: 1.3, desc: 'The restaurants all want oysters tonight.' },
  { id: 'crab-trend', name: 'Crab Trend', items: ['crab'], mult: 1.25, desc: 'Crab is suddenly fashionable.' },
  { id: 'cod-summer', name: 'Cod Summer', items: ['cod-fillet'], mult: 1.3, desc: 'Summer fryers call for cod.' },
  { id: 'bass-week', name: 'Bass Week', items: ['sea-bass', 'red-snapper'], mult: 1.2, desc: 'Bass and snapper are in demand.' },
  { id: 'fish-tax', name: 'Fish Tax', items: ['lobster', 'tuna-loin'], mult: 0.7, desc: 'A new tax bites the fine lots hardest.' },
  { id: 'dry-week', name: 'Dry Week', items: ['salmon-fillet', 'prawns'], mult: 0.75, desc: 'A dry spell cools the everyday lots.' },
  { id: 'harbour-festival', name: 'Harbour Festival', items: ['salmon-fillet', 'prawns', 'sardines'], mult: 1.2, desc: 'The harbour festival lifts every market favourite.' },
];

export const FISH_MARKET_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Spring crowds return to the harbour.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Steady summer hunger.' },
  { id: 'autumn', name: 'Autumn', mult: 1.1, desc: 'Harvest season brings the fairs.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold winter nights thin the crowds.' },
];

export const FISH_MARKET_LEADERBOARD = [
  { name: 'Sal', total: 4000, desc: 'Fishmonger Sal still leads the board.' },
  { name: 'Mara', total: 2700, desc: 'Ice keeper with a steady hand.' },
  { name: 'You', total: 0, desc: 'Your running total.' },
  { name: 'Finn', total: 1400, desc: 'The apprentice is climbing fast.' },
  { name: 'Dee', total: 2100, desc: 'Dee and her charming stalls.' },
];

export const FISH_MARKET_QUICK_START = [
  'Buy sardines first, they are quick and always sell.',
  'Ice everything affordable, iced lots pay far better.',
  'Buy the cold store before the master scale, spoiled lots hurt.',
  'Take restaurant orders then buy for them, never the other way round.',
  'Sell the morning catch by noon, while it is still fresh.',
  'Check the price board every morning before you buy.',
];

export const FISH_MARKET_META = {
  system: 'fishMarket',
  version: '7b-C',
  author: 'builder-3',
  label: 'Fish Market',
  owner: 'Fishmonger Sal the Auctioneer',
  itemCount: 12,
};

// ---- module helpers ----

const FISH_EFFECT_MAP = Object.fromEntries(FISH_MARKET_UPGRADES.map((u) => [u.id, u.effect]));

export function fishMarketRankFor(xp) {
  let rank = 0;
  FISH_MARKET_RANKS.forEach((r, i) => {
    if (xp >= r.xp) rank = i;
  });
  return rank;
}

function fishEffects(owned) {
  const fx = new Set();
  (owned || []).forEach((id) => {
    const eff = FISH_EFFECT_MAP[id];
    if (eff) fx.add(eff);
  });
  return fx;
}

export function fishMarketItemById(id) {
  const found = MARKET_CATCH.filter((c) => c.id === id);
  return found.length ? found[0] : null;
}

export function fishMarketPriceFor(id, drift, rank, upgrades) {
  const lot = fishMarketItemById(id);
  if (!lot) return 0;
  const fx = fishEffects(upgrades);
  const d = drift && typeof drift[id] === 'number' ? drift[id] : 0;
  let price = lot.basePrice * (1 + d) * (1 + 0.1 * rank);
  if (lot.difficulty >= 3 && fx.has('strong-plus')) price *= 1.3;
  if (fx.has('sell-plus')) price *= 1.15;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function fishMarketSellPriceFor(id, premium, drift, rank, upgrades) {
  const regular = fishMarketPriceFor(id, drift, rank, upgrades);
  if (regular === 0) return 0;
  return Math.max(1, Math.round((premium ? regular * 1.5 : regular) * 10) / 10);
}

export function fishMarketCostFor(id, qty, upgrades) {
  const lot = fishMarketItemById(id);
  if (!lot) return 0;
  const raw = Math.round(lot.basePrice * 0.4 * qty);
  return Math.max(1, fishEffects(upgrades).has('cost-down') ? Math.round(raw * 0.8) : raw);
}

export function fishMarketStockCap(upgrades) {
  return fishEffects(upgrades).has('stock-plus') ? 80 : 40;
}

export function fishMarketSpoilChance(item, upgrades) {
  const chance = 0.04 + item.difficulty * 0.015;
  return fishEffects(upgrades).has('spoil-down') ? chance / 2 : chance;
}

export function fishMarketBestSeller(drift, rank, upgrades) {
  let best = null;
  MARKET_CATCH.forEach((lot) => {
    const price = fishMarketPriceFor(lot.id, drift, rank, upgrades);
    if (best === null || price > best.price) best = { id: lot.id, price };
  });
  return best;
}

export function fishMarketCheapest(drift, rank, upgrades) {
  let low = null;
  MARKET_CATCH.forEach((lot) => {
    const price = fishMarketPriceFor(lot.id, drift, rank, upgrades);
    if (low === null || price < low.price) low = { id: lot.id, price };
  });
  return low;
}

export function fishMarketTipFor(day) {
  const n = FISH_MARKET_TIPS.length;
  return FISH_MARKET_TIPS[((day % n) + n) % n];
}

export function fishMarketLeaderboardWith(playerTotal) {
  const rows = FISH_MARKET_LEADERBOARD.map((row) => ({
    name: row.name,
    total: row.name === 'You' ? playerTotal : row.total,
    desc: row.desc,
  }));
  rows.sort((a, b) => b.total - a.total);
  const out = [];
  rows.forEach((row, i) => out.push({ rank: i + 1, name: row.name, total: row.total, desc: row.desc }));
  return out;
}

// ---- system factory ----

const FISH_STATE_KEYS = [
  'xp', 'rank', 'batches', 'produced', 'sold', 'earned', 'spent', 'spoiled', 'aged',
  'ordersDone', 'ordersFailed', 'streak', 'bestStreak', 'bestBatch', 'inventory', 'premium',
  'upgrades', 'activeOrder', 'orderProgress', 'cooldown', 'dayDrift', 'lastDay', 'dailySold',
  'dailyEarned', 'heatTaken', 'eventsSeen', 'lastEvent', 'perfectBatches',
];

export function createFishMarketSystem(ctx) {
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

  const emptyMaps = () => {
    const inv = {};
    const prem = {};
    const drift = {};
    MARKET_CATCH.forEach((lot) => {
      inv[lot.id] = 0;
      prem[lot.id] = 0;
      drift[lot.id] = 0;
    });
    return { inv, prem, drift };
  };
  const maps = emptyMaps();

  // Methods below read and write state through `this`, so the returned
  // object is the state itself.
  const sys = {
    name: 'fishMarket',
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
    inventory: maps.inv,
    premium: maps.prem,
    upgrades: [],
    activeOrder: null,
    orderProgress: 0,
    cooldown: 0,
    dayDrift: maps.drift,
    lastDay: 1,
    dailySold: 0,
    dailyEarned: 0,
    heatTaken: 0,
    eventsSeen: 0,
    lastEvent: 'none',
    perfectBatches: 0,

    _rankUp() {
      const next = fishMarketRankFor(this.xp);
      if (next > this.rank) {
        this.rank = next;
        log('Rank up! You are now ' + FISH_MARKET_RANKS[next].name + '.');
      }
    },
    _gainXp(n) {
      this.xp += n;
      this._rankUp();
    },
    _stockTotal() {
      let total = 0;
      MARKET_CATCH.forEach((lot) => {
        total += this.inventory[lot.id] + this.premium[lot.id];
      });
      return total;
    },
    _onHand(id) {
      return this.inventory[id] + this.premium[id];
    },
    _take(id, qty) {
      let rest = qty;
      const reg = Math.min(this.inventory[id], rest);
      this.inventory[id] -= reg;
      rest -= reg;
      if (rest > 0) this.premium[id] -= rest;
    },
    _driftAll(amount) {
      MARKET_CATCH.forEach((lot) => {
        this.dayDrift[lot.id] += amount;
      });
    },
    _spoilOne() {
      const stocked = MARKET_CATCH.filter((lot) => this._onHand(lot.id) > 0);
      if (stocked.length === 0) return;
      const pick = stocked[Math.floor(rng() * stocked.length)];
      const lost = Math.min(2, this._onHand(pick.id));
      this._take(pick.id, lost);
      this.spoiled += lost;
      log('Tossed ' + lost + ' spoiled lots of ' + pick.name + '.');
    },

    buyCatch(id, qty) {
      const amount = qty === undefined ? 1 : qty;
      const lot = fishMarketItemById(id);
      if (!lot) return { ok: false, reason: 'unknown-item' };
      if (!amount || amount <= 0) return { ok: false, reason: 'bad-quantity' };
      if (this.cooldown > 0) return { ok: false, reason: 'cooldown' };
      const cost = fishMarketCostFor(id, amount, this.upgrades);
      if (getCash() < cost) return { ok: false, reason: 'not-enough-cash' };
      if (this._stockTotal() + amount > fishMarketStockCap(this.upgrades)) return { ok: false, reason: 'stock-full' };
      addCash(-cost);
      this.spent += cost;
      let made = amount;
      if (rng() < fishMarketSpoilChance(lot, this.upgrades)) {
        const lost = 1 + Math.floor(rng() * Math.max(1, Math.floor(amount / 2)));
        made = Math.max(0, amount - lost);
        this.spoiled += lost;
        this.streak = 0;
        log('A lot of ' + lot.name + ' went off, ' + lost + ' lost.');
      } else {
        this.streak += 1;
        if (this.streak > this.bestStreak) this.bestStreak = this.streak;
        if (lot.difficulty >= 4) this.perfectBatches += 1;
      }
      this.inventory[id] += made;
      this.batches += 1;
      this.produced += made;
      if (made > this.bestBatch) this.bestBatch = made;
      this.cooldown = fishEffects(this.upgrades).has('brew-fast')
        ? Math.max(1, Math.floor(lot.time * 0.8))
        : lot.time;
      this._gainXp(4 + made + lot.difficulty * 2);
      // The heat branch is guarded off at the fish market: buying catch
      // never adds heat, not even for the difficulty five lobster.
      if (false && lot.difficulty >= 4 && rng() < 0.15) {
        addHeat(1);
        this.heatTaken += 1;
      }
      if (this.activeOrder) {
        const order = this.activeOrder;
        if (order.item === 'mixed' || order.item === id) this.orderProgress += made;
      }
      log('Bought ' + made + ' lots of ' + lot.name + '.');
      return { ok: true, item: id, made, cost, cooldown: this.cooldown };
    },

    iceStock(id, qty) {
      const amount = qty === undefined ? 1 : qty;
      const lot = fishMarketItemById(id);
      if (!lot) return { ok: false, reason: 'unknown-item' };
      if (!amount || amount <= 0) return { ok: false, reason: 'bad-quantity' };
      if (this.inventory[id] < amount) return { ok: false, reason: 'not-enough-stock' };
      this.inventory[id] -= amount;
      this.premium[id] += amount;
      this.aged += amount;
      this._gainXp(6 + amount * 2);
      log('Iced ' + amount + ' lots of ' + lot.name + '.');
      return { ok: true, item: id, quantity: amount, premium: this.premium[id] };
    },

    sell(id, qty) {
      const lot = fishMarketItemById(id);
      if (!lot) return { ok: false, reason: 'unknown-item' };
      if (!qty || qty <= 0) return { ok: false, reason: 'bad-quantity' };
      if (this._onHand(id) < qty) return { ok: false, reason: 'not-enough-stock' };
      const premQty = Math.min(this.premium[id], qty);
      const regQty = qty - premQty;
      const total = Math.round((premQty * fishMarketSellPriceFor(id, true, this.dayDrift, this.rank, this.upgrades)
        + regQty * fishMarketSellPriceFor(id, false, this.dayDrift, this.rank, this.upgrades)) * 10) / 10;
      this.premium[id] -= premQty;
      this.inventory[id] -= regQty;
      this.sold += qty;
      this.earned += total;
      this.dailySold += qty;
      this.dailyEarned += total;
      addCash(total);
      this._gainXp(qty);
      return { ok: true, total, quantity: qty };
    },

    sellAll() {
      let total = 0;
      let units = 0;
      const lines = [];
      MARKET_CATCH.forEach((lot) => {
        const qty = this._onHand(lot.id);
        if (qty <= 0) return;
        const premQty = Math.min(this.premium[lot.id], qty);
        const regQty = qty - premQty;
        const lineTotal = Math.round((premQty * fishMarketSellPriceFor(lot.id, true, this.dayDrift, this.rank, this.upgrades)
          + regQty * fishMarketSellPriceFor(lot.id, false, this.dayDrift, this.rank, this.upgrades)) * 10) / 10;
        this.premium[lot.id] -= premQty;
        this.inventory[lot.id] -= regQty;
        total += lineTotal;
        units += qty;
        lines.push({ id: lot.id, quantity: qty, total: lineTotal });
      });
      if (units === 0) return { ok: false, reason: 'nothing-to-sell' };
      total = Math.round(total * 10) / 10;
      this.sold += units;
      this.earned += total;
      this.dailySold += units;
      this.dailyEarned += total;
      addCash(total);
      this._gainXp(units);
      return { ok: true, total, units, lines };
    },

    buyUpgrade(id) {
      const up = FISH_MARKET_UPGRADES.find((u) => u.id === id);
      if (!up) return { ok: false, reason: 'unknown-upgrade' };
      if (this.upgrades.includes(id)) return { ok: false, reason: 'already-owned' };
      if (getCash() < up.cost) return { ok: false, reason: 'not-enough-cash' };
      addCash(-up.cost);
      this.spent += up.cost;
      this.upgrades.push(id);
      this._gainXp(20);
      log('Bought the ' + up.name + ' upgrade.');
      return { ok: true, id };
    },

    takeOrder(id) {
      const order = FISH_MARKET_ORDERS.find((o) => o.id === id);
      if (!order) return { ok: false, reason: 'unknown-order' };
      if (this.activeOrder) return { ok: false, reason: 'order-active' };
      if (this.rank < order.minRank) return { ok: false, reason: 'rank-too-low' };
      const today = getDay();
      this.activeOrder = { ...order, takenDay: today, deadline: today + order.days };
      this.orderProgress = 0;
      log('Took the order: ' + order.name + '.');
      return { ok: true, order: this.activeOrder };
    },

    deliverOrder() {
      const order = this.activeOrder;
      if (!order) return { ok: false, reason: 'no-active-order' };
      if (order.item === 'mixed') {
        if (this._stockTotal() < order.qty) return { ok: false, reason: 'not-enough-stock' };
        let need = order.qty;
        for (const lot of MARKET_CATCH) {
          if (need <= 0) break;
          const take = Math.min(this._onHand(lot.id), need);
          this._take(lot.id, take);
          need -= take;
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
      addCash(pay);
      this._gainXp(60);
      log('Delivered ' + order.name + ' for ' + pay + '.');
      return { ok: true, pay };
    },

    abandonOrder() {
      if (!this.activeOrder) return { ok: false, reason: 'no-active-order' };
      this.activeOrder = null;
      this.orderProgress = 0;
      this.ordersFailed += 1;
      return { ok: true };
    },

    haggle() {
      if (this.rank < 1) return { ok: false, reason: 'rank-too-low' };
      const bonus = Math.round((0.05 + 0.03 * this.rank) * 100) / 100;
      const haggled = rng() < 0.55;
      return { ok: true, haggled, bonus };
    },

    priceBoard() {
      return MARKET_CATCH.map((lot) => ({
        id: lot.id,
        name: lot.name,
        price: fishMarketPriceFor(lot.id, this.dayDrift, this.rank, this.upgrades),
        drift: this.dayDrift[lot.id],
        stock: this.inventory[lot.id],
        premium: this.premium[lot.id],
      }));
    },

    orderList() {
      return FISH_MARKET_ORDERS.map((o) => ({
        id: o.id, name: o.name, item: o.item, quantity: o.qty, pay: o.pay, days: o.days, minRank: o.minRank,
      }));
    },

    dailyEvent() {
      this.eventsSeen += 1;
      const weather = getWeather();
      if (weather && weather.condition === 'rain' && rng() < 0.3) {
        this.lastEvent = 'rainy-day';
        return { ok: true, event: 'rainy-day', name: 'Rainy Day' };
      }
      if (rng() < 0.18) {
        const ev = FISH_MARKET_EVENTS[Math.floor(rng() * FISH_MARKET_EVENTS.length)];
        if (ev.effect === 'cost-up') this._driftAll(0.15);
        else if (ev.effect === 'cost-down') this._driftAll(-0.1);
        else if (ev.effect === 'sell-up') this._driftAll(0.2);
        else if (ev.effect === 'xp') this._gainXp(25);
        else if (ev.effect === 'orders-up') this._gainXp(10);
        else if (ev.effect === 'heat') { addHeat(1); this.heatTaken += 1; }
        else if (ev.effect === 'spoil') this._spoilOne();
        this.lastEvent = ev.id;
        return { ok: true, event: ev.id, name: ev.name };
      }
      this.lastEvent = 'none';
      return { ok: true, event: 'none', name: 'No event' };
    },

    tasteTest(id) {
      const lot = fishMarketItemById(id);
      if (!lot) return { ok: false, reason: 'unknown-item' };
      if (this._onHand(id) <= 0) return { ok: false, reason: 'no-stock' };
      const raw = 0.5 + rng() * 0.5 + this.rank * 0.02 + lot.difficulty * 0.01;
      const quality = Math.round(Math.min(1, raw) * 100) / 100;
      this._gainXp(5);
      const grade = quality >= 0.9 ? 'outstanding' : quality >= 0.7 ? 'solid' : 'needs work';
      return { ok: true, item: id, quality, verdict: grade + ' — says Fishmonger Sal' };
    },

    tick(dt) {
      this.cooldown = Math.max(0, this.cooldown - dt);
    },

    tickDay(day) {
      if (day === this.lastDay) return;
      this.lastDay = day;
      MARKET_CATCH.forEach((lot) => {
        const drifted = this.dayDrift[lot.id] + (rng() - 0.5) * 0.1;
        this.dayDrift[lot.id] = Math.max(-0.5, Math.min(0.6, drifted));
      });
      this.dailySold = 0;
      this.dailyEarned = 0;
      if (this.activeOrder && day > this.activeOrder.deadline && this.orderProgress < this.activeOrder.qty) {
        this.activeOrder = null;
        this.orderProgress = 0;
        this.ordersFailed += 1;
        log('An order expired undelivered.');
      }
      this.dailyEvent();
    },

    serialize() {
      const copy = {};
      FISH_STATE_KEYS.forEach((key) => {
        copy[key] = JSON.parse(JSON.stringify(this[key]));
      });
      return copy;
    },

    deserialize(saved) {
      if (!saved || typeof saved !== 'object') return;
      FISH_STATE_KEYS.forEach((key) => {
        if (key in saved) this[key] = JSON.parse(JSON.stringify(saved[key]));
      });
      MARKET_CATCH.forEach((lot) => {
        if (typeof this.inventory[lot.id] !== 'number') this.inventory[lot.id] = 0;
        if (typeof this.premium[lot.id] !== 'number') this.premium[lot.id] = 0;
        if (typeof this.dayDrift[lot.id] !== 'number') this.dayDrift[lot.id] = 0;
      });
      this._rankUp();
    },

    stats() {
      const stock = this._stockTotal();
      const eff = this.produced + this.spoiled === 0
        ? 100
        : Math.round((this.produced / (this.produced + this.spoiled)) * 100);
      return {
        rank: FISH_MARKET_RANKS[this.rank].name,
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
        stockCap: fishMarketStockCap(this.upgrades),
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
    },

    hudLine() {
      if (this.cooldown > 0) return 'Fish Market — buying, ' + Math.ceil(this.cooldown) + 's left';
      if (this.activeOrder) return 'Order: ' + this.activeOrder.name + ' ' + this.orderProgress + '/' + this.activeOrder.qty;
      const stock = this._stockTotal();
      if (stock > 0) return 'Fish Market — ' + stock + ' lots in stock';
      return '';
    },

    interact() {
      const pos = getPlayerPos();
      if (Math.hypot(pos.x - 260, pos.z - 180) > 25) return false;
      const stocked = MARKET_CATCH.find((lot) => this._onHand(lot.id) > 0);
      if (stocked) {
        this.sell(stocked.id, 1);
        return true;
      }
      const cheap = fishMarketCheapest(this.dayDrift, this.rank, this.upgrades);
      return this.buyCatch(cheap.id, 1);
    },
  };

  return sys;
}

// ---- extras factory ----

export function createFishMarketExtras(system) {
  const hired = [];
  const claimed = [];
  let wagesPaid = 0;
  let donated = 0;
  let rep = 0;

  const statOf = (field) => (field === 'upgradesCount' ? system.upgrades.length : system[field] || 0);

  const extras = {
    hireHelper(id) {
      const helper = FISH_MARKET_HELPERS.find((h) => h.id === id);
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
      return FISH_MARKET_CHALLENGES.map((ch) => {
        const value = Math.floor(statOf(ch.target));
        return { id: ch.id, name: ch.name, value, goal: ch.goal, done: value >= ch.goal };
      });
    },

    claimChallenge(id) {
      const ch = FISH_MARKET_CHALLENGES.find((c) => c.id === id);
      if (!ch) return { ok: false, reason: 'unknown-challenge' };
      if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
      const value = Math.floor(statOf(ch.target));
      if (value < ch.goal) return { ok: false, reason: 'not-done', value, goal: ch.goal };
      claimed.push(id);
      return { ok: true, id, xp: ch.xp };
    },

    achievements() {
      return FISH_MARKET_ACHIEVEMENTS.map((ach) => {
        const done = ach.check === 'spoiled'
          ? system.batches >= 50 && system.spoiled === 0
          : statOf(ach.check) >= ach.goal;
        return { id: ach.id, name: ach.name, desc: ach.desc, done };
      });
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
      return { ok: true, quantity: qty, reputation: rep, note: 'Fishmonger Sal thanks you for the donation.' };
    },

    clearStale() {
      let cleared = 0;
      MARKET_CATCH.forEach((lot) => {
        if (lot.difficulty <= 1) {
          cleared += system.inventory[lot.id];
          system.inventory[lot.id] = 0;
        }
      });
      return { ok: true, cleared };
    },

    stockReport() {
      let stock = 0;
      let premium = 0;
      MARKET_CATCH.forEach((lot) => {
        stock += system.inventory[lot.id];
        premium += system.premium[lot.id];
      });
      const cap = fishMarketStockCap(system.upgrades);
      return { ok: true, stock, premium, cap, free: cap - stock - premium };
    },
  };

  Object.defineProperties(extras, {
    helpers: { get: () => hired.map((h) => ({ ...h })) },
    claimed: { get: () => [...claimed] },
    wagesPaid: { get: () => wagesPaid },
    donated: { get: () => donated },
    rep: { get: () => rep },
  });

  return extras;
}
