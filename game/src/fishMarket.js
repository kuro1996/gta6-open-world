// Fish Market — Sal the Auctioneer turns the dawn boats into gold.
// Buy twelve catches at the morning auction, ice them before the sun
// climbs, and sell to the restaurants of Solara. The tide decides the
// price, and yesterday's fish is today's discount.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const MARKET_CATCH = [
  {
      id: 'red-snapper',
      name: 'Red Snapper',
      basePrice: 28,
      time: 2,
      difficulty: 2,
      origin: 'reef',
      weight: 1.5,
      freshness: 5,
      desc: 'Bright-eyed reef snapper, sweet flesh, the grill\'s best friend.'
    },
  {
      id: 'sea-bass',
      name: 'Sea Bass',
      basePrice: 32,
      time: 2,
      difficulty: 2,
      origin: 'coastal',
      weight: 1.8,
      freshness: 5,
      desc: 'Silver sea bass, delicate and clean, baked whole with herbs.'
    },
  {
      id: 'tuna-loin',
      name: 'Tuna Loin',
      basePrice: 48,
      time: 3,
      difficulty: 4,
      origin: 'deep sea',
      weight: 3.0,
      freshness: 5,
      desc: 'Deep red loin, sushi-grade, cut thick and eaten rare.'
    },
  {
      id: 'salmon-fillet',
      name: 'Salmon Fillet',
      basePrice: 36,
      time: 2,
      difficulty: 2,
      origin: 'north bay',
      weight: 1.2,
      freshness: 5,
      desc: 'Orange-pink fillets, rich with oil, the city\'s favourite fish.'
    },
  {
      id: 'sardines',
      name: 'Sardines',
      basePrice: 10,
      time: 1,
      difficulty: 1,
      origin: 'inshore',
      weight: 0.4,
      freshness: 4,
      desc: 'Small, oily and cheap — grilled whole with lemon and salt.'
    },
  {
      id: 'mackerel',
      name: 'Mackerel',
      basePrice: 14,
      time: 1,
      difficulty: 1,
      origin: 'inshore',
      weight: 0.6,
      freshness: 4,
      desc: 'Striped and shiny, best smoked or grilled over coals.'
    },
  {
      id: 'prawns',
      name: 'Prawns',
      basePrice: 40,
      time: 2,
      difficulty: 3,
      origin: 'estuary',
      weight: 0.8,
      freshness: 5,
      desc: 'Big estuary prawns, sweet and firm, peeled to order.'
    },
  {
      id: 'lobster',
      name: 'Lobster',
      basePrice: 68,
      time: 3,
      difficulty: 5,
      origin: 'rocky shore',
      weight: 1.6,
      freshness: 5,
      desc: 'Live lobster, claws banded, the luxury of the harbour.'
    },
  {
      id: 'crab',
      name: 'Crab',
      basePrice: 52,
      time: 3,
      difficulty: 4,
      origin: 'rocky shore',
      weight: 1.4,
      freshness: 5,
      desc: 'Blue crab, heavy with meat, cracked at the table.'
    },
  {
      id: 'oysters',
      name: 'Oysters',
      basePrice: 44,
      time: 2,
      difficulty: 3,
      origin: 'oyster beds',
      weight: 0.9,
      freshness: 5,
      desc: 'Cold oysters on ice, shucked to order, lemon and shallot.'
    },
  {
      id: 'squid',
      name: 'Squid',
      basePrice: 22,
      time: 2,
      difficulty: 2,
      origin: 'deep sea',
      weight: 0.7,
      freshness: 4,
      desc: 'Fresh squid, tender if you are quick, rubber if you are not.'
    },
  {
      id: 'cod-fillet',
      name: 'Cod Fillet',
      basePrice: 24,
      time: 2,
      difficulty: 1,
      origin: 'north sea',
      weight: 1.3,
      freshness: 4,
      desc: 'Flaky white cod, the fish-and-chip shop\'s backbone.'
    },
];

export const FISH_MARKET_UPGRADES = [
  { id: 'ice-machine', name: 'Ice Machine', cost: 120, desc: 'Buy 20% faster.', effect: 'brew-fast' },
  { id: 'auction-paddle', name: 'Auction Paddle', cost: 180, desc: 'Ingredient costs -20%.', effect: 'cost-down' },
  { id: 'cold-store', name: 'Cold Store', cost: 220, desc: 'Fewer spoiled lots.', effect: 'spoil-down' },
  { id: 'stall-awning', name: 'Stall Awning', cost: 300, desc: 'Sales pay +15%.', effect: 'sell-plus' },
  { id: 'fish-crates', name: 'Fish Crates', cost: 260, desc: 'Hold +40 lots.', effect: 'stock-plus' },
  { id: 'ice-tools', name: 'Ice Tools', cost: 350, desc: 'Icing pays +25%.', effect: 'age-plus' },
  { id: 'delivery-van', name: 'Delivery Van', cost: 480, desc: 'Sell in bulk to restaurants.', effect: 'bulk' },
  { id: 'master-scale', name: 'Master Scale', cost: 750, desc: 'Perfect lots: +30% on premium catch.', effect: 'strong-plus' },
];

export const FISH_MARKET_ORDERS = [
  { id: 'restaurant-12', name: 'Restaurant Order', item: 'salmon-fillet', qty: 12, pay: 480, days: 1, minRank: 0, desc: 'A restaurant needs 12 salmon fillets for dinner.' },
  { id: 'wedding-lobster', name: 'Wedding Lobster', item: 'lobster', qty: 6, pay: 560, days: 2, minRank: 4, desc: 'A wedding orders 6 lobsters for the feast.' },
  { id: 'fish-chips', name: 'Fish and Chips', item: 'cod-fillet', qty: 20, pay: 340, days: 1, minRank: 1, desc: 'A chip shop needs 20 cod fillets.' },
  { id: 'sushi-bar', name: 'Sushi Bar', item: 'tuna-loin', qty: 8, pay: 520, days: 2, minRank: 3, desc: 'A sushi bar orders 8 tuna loins.' },
  { id: 'oyster-night', name: 'Oyster Night', item: 'oysters', qty: 10, pay: 460, days: 2, minRank: 3, desc: 'A wine bar orders 10 dozen oysters.' },
  { id: 'prawn-party', name: 'Prawn Party', item: 'prawns', qty: 14, pay: 420, days: 1, minRank: 3, desc: 'A beach party orders 14 prawn lots.' },
  { id: 'market-sardines', name: 'Market Sardines', item: 'sardines', qty: 30, pay: 300, days: 1, minRank: 1, desc: 'A grill stall orders 30 sardine lots.' },
  { id: 'mixed-lots', name: 'Mixed Lots', item: 'mixed', qty: 20, pay: 580, days: 2, minRank: 3, desc: 'Any 20 lots for the harbour festival.' },
];

export const FISH_MARKET_EVENTS = [
  { id: 'catch-shortage', name: 'Catch Shortage', text: 'The boats came back light — fish costs more today.', effect: 'cost-up' },
  { id: 'dinner-rush', name: 'Dinner Rush', text: 'Restaurants queue at the stall — sales pay +20%.', effect: 'sell-up' },
  { id: 'health-inspection', name: 'Health Inspection', text: 'An inspector checks the ice. Keep it spotless.', effect: 'heat' },
  { id: 'big-catch', name: 'Big Catch', text: 'The boats brought in a haul — fish is cheap today.', effect: 'cost-down' },
  { id: 'spoiled-lot', name: 'Spoiled Lot', text: 'A lot sat in the sun — one may spoil.', effect: 'spoil' },
  { id: 'street-fair', name: 'Street Fair', text: 'A fair opens outside — stalls order extra.', effect: 'orders-up' },
  { id: 'cold-snap', name: 'Cold Snap', text: 'Cold nights — hot fish soup flies off the shelves.', effect: 'sell-up' },
  { id: 'ice-breakdown', name: 'Ice Breakdown', text: 'The ice machine sputters. Some stock is at risk.', effect: 'spoil' },
  { id: 'market-critic', name: 'Market Critic', text: 'A food critic visits and shares a trick.', effect: 'xp' },
  { id: 'storm-night', name: 'Storm Night', text: 'A storm keeps boats in — orders double tomorrow.', effect: 'orders-up' },
];

export const FISH_MARKET_RANKS = [
  { level: 0, name: 'Crate Hand', xp: 0, perk: 'Buy at base rate.' },
  { level: 1, name: 'Stall Hand', xp: 120, perk: '+10% sale prices.' },
  { level: 2, name: 'Fishmonger', xp: 300, perk: 'Spoiled lots forgiven once a day.' },
  { level: 3, name: 'Catch Baron', xp: 620, perk: '+20% sale prices, restaurants trust you.' },
  { level: 4, name: 'Legend of the Tide', xp: 1100, perk: '+30% sale prices, iced lots doubled.' },
];

export const FISH_MARKET_HELPERS = [
  { id: 'apprentice', name: 'Finn the Apprentice', wage: 25, skill: 'haul', bonus: 0.15, desc: 'Hauls crates: +15% buy yield.' },
  { id: 'ice-keeper', name: 'Mara the Ice Keeper', wage: 40, skill: 'age', bonus: 0.25, desc: 'Watches the ice: +25% icing speed.' },
  { id: 'stall-runner', name: 'Dee the Runner', wage: 60, skill: 'sell', bonus: 0.12, desc: 'Knows every restaurant: +12% sale prices.' },
  { id: 'auction-master', name: 'Old Sal Jr', wage: 80, skill: 'brew', bonus: 0.2, desc: 'Auction master: +20% buy quality.' },
];

export const FISH_MARKET_CHALLENGES = [
  { id: 'lots-100', name: 'First Hundred Lots', target: 'produced', goal: 100, xp: 80, desc: 'Buy 100 lots in total.' },
  { id: 'sell-500', name: 'Half Grand', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from fish sales.' },
  { id: 'ice-20', name: 'Ice Master', target: 'aged', goal: 20, xp: 100, desc: 'Ice 20 lots.' },
  { id: 'orders-10', name: 'Restaurant Favourite', target: 'ordersDone', goal: 10, xp: 140, desc: 'Complete 10 restaurant orders.' },
  { id: 'streak-10', name: 'Clean Stall', target: 'bestStreak', goal: 10, xp: 110, desc: 'Buy 10 lots in a row without a spoiled one.' },
  { id: 'rank-3', name: 'Catch Baron', target: 'rank', goal: 3, xp: 150, desc: 'Reach rank Catch Baron.' },
  { id: 'earn-2000', name: 'Fish Baron', target: 'earned', goal: 2000, xp: 160, desc: 'Earn $2,000 from the fish market.' },
  { id: 'batches-50', name: 'Busy Stall', target: 'batches', goal: 50, xp: 90, desc: 'Buy 50 batches.' },
];

export const FISH_MARKET_ACHIEVEMENTS = [
  { id: 'first-lot', name: 'First Lot', check: 'batches', goal: 1, desc: 'Buy your first lot.' },
  { id: 'first-sale', name: 'First Sale', check: 'sold', goal: 1, desc: 'Sell your first lot.' },
  { id: 'first-ice', name: 'Ice On', check: 'aged', goal: 1, desc: 'Ice your first lot.' },
  { id: 'rank-2', name: 'Fishmonger', check: 'rank', goal: 2, desc: 'Reach rank Fishmonger.' },
  { id: 'rich-fish', name: 'Fish Rich', check: 'earned', goal: 2000, desc: 'Earn $2,000 from fish.' },
  { id: 'full-kit', name: 'Full Kit', check: 'upgradesCount', goal: 8, desc: 'Own every fish market upgrade.' },
  { id: 'no-spoil', name: 'Clean Hands', check: 'spoiled', goal: 0, desc: 'Buy 50 lots with zero spoiled — checked at 50.' },
  { id: 'big-lot', name: 'Big Lot', check: 'bestBatch', goal: 20, desc: 'Buy 20 lots in one batch.' },
];

export const FISH_MARKET_TIPS = [
  { id: 'fresh-first', name: 'Fresh First', text: 'Fresh fish pays double. Sell the morning catch by noon.' },
  { id: 'ice-it', name: 'Ice It', text: 'Iced lots pay far more than warm ones.' },
  { id: 'tide-care', name: 'Tide Care', text: 'The tide decides the price. Buy at dawn, sell by noon.' },
  { id: 'fair-stock', name: 'Fair Stock', text: 'Stock up before street fairs — prices jump 20%.' },
  { id: 'ice-watch', name: 'Ice Watch', text: 'An ice machine saves more fish than luck ever will.' },
  { id: 'order-first', name: 'Orders First', text: 'Take a restaurant order, then buy for it.' },
  { id: 'lobster-money', name: 'Lobster Money', text: 'Lobster costs the most and pays the most. Save it for weddings.' },
  { id: 'crate-space', name: 'Crate Space', text: 'Buy fish crates early — a full stall is a stuck market.' },
];

export const FISH_MARKET_RECORDS = [
  { id: 'biggest-lot', name: 'Biggest Lot', stat: 'bestBatch', unit: 'lots', desc: 'Most lots in one batch.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from fish.' },
  { id: 'most-bought', name: 'Most Bought', stat: 'produced', unit: 'lots', desc: 'Most lots bought.' },
  { id: 'most-iced', name: 'Most Iced', stat: 'aged', unit: 'lots', desc: 'Most lots iced.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'lots', desc: 'Longest clean buy streak.' },
];

export const FISH_MARKET_MARKET_EVENTS = [
  { id: 'lobster-boom', name: 'Lobster Boom', items: ["lobster"], mult: 1.4, desc: 'Restaurants pay 40% more for lobster.' },
  { id: 'sardine-glut', name: 'Sardine Glut', items: ["sardines", "mackerel"], mult: 0.6, desc: 'Too many sardines — prices crash.' },
  { id: 'tuna-rush', name: 'Tuna Rush', items: ["tuna-loin"], mult: 1.5, desc: 'A tuna craze sweeps the city.' },
  { id: 'salmon-season', name: 'Salmon Season', items: ["salmon-fillet"], mult: 1.3, desc: 'Salmon runs make salmon king.' },
  { id: 'prawn-morning', name: 'Prawn Morning', items: ["prawns"], mult: 1.35, desc: 'Prawns are the market favourite.' },
  { id: 'oyster-night', name: 'Oyster Night', items: ["oysters"], mult: 1.3, desc: 'Wine bars drive oysters up.' },
  { id: 'crab-trend', name: 'Crab Trend', items: ["crab"], mult: 1.25, desc: 'Crab is suddenly fashionable.' },
  { id: 'cod-summer', name: 'Cod Summer', items: ["cod-fillet"], mult: 1.3, desc: 'Summer chip shops love cod.' },
  { id: 'bass-week', name: 'Bass Week', items: ["sea-bass", "red-snapper"], mult: 1.2, desc: 'Bass gets its week.' },
  { id: 'fish-tax', name: 'Fish Tax', items: ["lobster", "tuna-loin"], mult: 0.7, desc: 'A luxury tax hits the premium catch.' },
  { id: 'dry-week', name: 'Dry Week', items: ["salmon-fillet", "prawns"], mult: 0.75, desc: 'A diet fad dries sales.' },
  { id: 'harbour-festival', name: 'Harbour Festival', items: ["salmon-fillet", "prawns", "sardines"], mult: 1.2, desc: 'The festival lifts everything.' },
];

export const FISH_MARKET_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Fresh catch, fresh customers.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Festival season, steady hunger.' },
  { id: 'autumn', name: 'Autumn', mult: 1.1, desc: 'Harvest catch and warm soup.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold and quiet, but fish sells.' },
];

export const FISH_MARKET_LEADERBOARD = [
  { name: 'Sal', total: 4200, desc: 'The auctioneer. Untouchable.' },
  { name: 'Mara', total: 2900, desc: 'Ice keeper for forty years.' },
  { name: 'You', total: 0, desc: 'Climbing.' },
  { name: 'Finn', total: 1500, desc: 'Fast hands, faster crates.' },
  { name: 'Dee', total: 2400, desc: 'Stall runner.' },
];

export const FISH_MARKET_QUICK_START = [
  'Buy sardines first — cheap, fast, always sell.',
  'Ice everything you can afford to wait for.',
  'Buy the cold store before the master scale.',
  'Take restaurant orders, then buy for them.',
  'Sell the morning catch by noon — freshness pays.',
  'Check the price board every morning.',
];

export function fishMarketRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < FISH_MARKET_RANKS.length; i++) {
    if (xp >= FISH_MARKET_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function fishMarketPriceFor(itemId, dayDrift, rank, upgrades) {
  const item = MARKET_CATCH.find((x) => x.id === itemId);
  if (!item) return 0;
  let price = item.basePrice;
  price *= 1 + (dayDrift[itemId] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('master-scale') && item.difficulty >= 3) price *= 1.3;
  if (upgrades.includes('stall-awning')) price *= 1.15;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function fishMarketSellPriceFor(itemId, premium, dayDrift, rank, upgrades) {
  let price = fishMarketPriceFor(itemId, dayDrift, rank, upgrades);
  if (premium) price *= 1.5;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function fishMarketCostFor(itemId, qty, upgrades) {
  const item = MARKET_CATCH.find((x) => x.id === itemId);
  if (!item) return 0;
  let cost = Math.round(item.basePrice * 0.4 * qty);
  if (upgrades.includes('auction-paddle')) cost = Math.round(cost * 0.8);
  return Math.max(1, cost);
}

export function fishMarketStockCap(upgrades) {
  let cap = 40;
  if (upgrades.includes('fish-crates')) cap += 40;
  return cap;
}

export function fishMarketSpoilChance(item, upgrades) {
  let chance = 0.04 + item.difficulty * 0.015;
  if (upgrades.includes('cold-store')) chance *= 0.5;
  return chance;
}

export function fishMarketItemById(itemId) {
  return MARKET_CATCH.find((x) => x.id === itemId) || null;
}

export function fishMarketBestSeller(dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = 0;
  for (const item of MARKET_CATCH) {
    const price = fishMarketPriceFor(item.id, dayDrift, rank, upgrades);
    if (price > bestPrice) { bestPrice = price; best = item.id; }
  }
  return best ? { id: best, price: bestPrice } : null;
}

export function fishMarketCheapest(dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = Infinity;
  for (const item of MARKET_CATCH) {
    const price = fishMarketPriceFor(item.id, dayDrift, rank, upgrades);
    if (price < bestPrice) { bestPrice = price; best = item.id; }
  }
  return best ? { id: best, price: bestPrice } : null;
}

export function createFishMarketExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;
  let donated = 0;
  let rep = 0;

  function hireHelper(id) {
    const h = FISH_MARKET_HELPERS.find((x) => x.id === id);
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
      const h = FISH_MARKET_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    let bonus = 0;
    for (const h of FISH_MARKET_HELPERS) {
      if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
    }
    return bonus;
  }

  function challenges() {
    return FISH_MARKET_CHALLENGES.map((ch) => {
      const v = system.state[ch.target] !== undefined ? system.state[ch.target] : (ch.target === 'upgradesCount' ? system.state.upgrades.length : 0);
      return { id: ch.id, name: ch.name, have: Math.floor(v), goal: ch.goal, done: v >= ch.goal };
    });
  }

  function claimChallenge(id) {
    const ch = FISH_MARKET_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const v = system.state[ch.target] !== undefined ? system.state[ch.target] : (ch.target === 'upgradesCount' ? system.state.upgrades.length : 0);
    if (v < ch.goal) return { ok: false, reason: 'not-done', have: Math.floor(v), goal: ch.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return FISH_MARKET_ACHIEVEMENTS.map((a) => {
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
    return { ok: true, qty, rep, note: 'The neighbourhood thanks you. Fishmonger Sal the Auctioneer remembers.' };
  }

  function clearStale() {
    let cleared = 0;
    for (const item of MARKET_CATCH) {
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
    for (const item of MARKET_CATCH) {
      total += system.state.inventory[item.id] || 0;
      premiumTotal += system.state.premium[item.id] || 0;
    }
    const cap = fishMarketStockCap(system.state.upgrades);
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

export function fishMarketTipFor(day) {
  return FISH_MARKET_TIPS[day % FISH_MARKET_TIPS.length];
}

export function fishMarketLeaderboardWith(playerTotal) {
  const board = FISH_MARKET_LEADERBOARD.map((e) => ({
    name: e.name, total: e.name === 'You' ? playerTotal : e.total, desc: e.desc,
  }));
  board.sort((a, b) => b.total - a.total);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export const FISH_MARKET_META = {
  system: 'fishMarket', version: '7b-C', author: 'builder-3',
  label: 'Fish Market', owner: 'Fishmonger Sal the Auctioneer',
  itemCount: MARKET_CATCH.length,
};

export function createFishMarketSystem(ctx) {
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
  for (const item of MARKET_CATCH) { state.inventory[item.id] = 0; state.premium[item.id] = 0; state.dayDrift[item.id] = 0; }

  function refreshRank() {
    const r = fishMarketRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Fish Market rank up: ${FISH_MARKET_RANKS[r].name} — ${FISH_MARKET_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const item of MARKET_CATCH) {
      const roll = rng();
      if (roll < 0.3) state.dayDrift[item.id] = Math.round((rng() * 0.5 - 0.2) * 100) / 100;
      else if (roll < 0.4) state.dayDrift[item.id] = 0;
    }
  }

  function stockTotal() {
    let total = 0;
    for (const item of MARKET_CATCH) total += (state.inventory[item.id] || 0) + (state.premium[item.id] || 0);
    return total;
  }

  function buyCatch(itemId, qty) {
    qty = qty === undefined ? 1 : qty;
    const item = MARKET_CATCH.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    if (state.cooldown > 0) return { ok: false, reason: 'cooling-down', cooldown: Math.round(state.cooldown) };
    const cost = fishMarketCostFor(itemId, qty, state.upgrades);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    if (stockTotal() + qty > fishMarketStockCap(state.upgrades)) return { ok: false, reason: 'stock-full', cap: fishMarketStockCap(state.upgrades) };
    addCash(-cost);
    state.spent += cost;
    let made = qty;
    if (rng() < fishMarketSpoilChance(item, state.upgrades)) {
      const lost = Math.max(1, Math.floor(qty / 2));
      made = qty - lost;
      state.spoiled += lost;
      state.streak = 0;
      log(`A lot of ${item.name} went wrong — ${lost} spoiled.`);
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
    if (state.upgrades.includes('ice-machine')) speed = Math.max(1, Math.round(speed * 0.8));
    state.cooldown = speed;
    gainXp(4 + made + item.difficulty * 2);
    if (false && item.difficulty >= 4 && rng() < 0.15) {
      addHeat(1);
      state.heatTaken += 1;
      log('Someone official is sniffing around the strong stuff. Careful.');
    }
    if (state.activeOrder) checkOrder(itemId, made);
    log(`BuyCatch ${made}x ${item.name} for $${cost}.`);
    return { ok: true, item: itemId, qty: made, cost, cooldown: state.cooldown };
  }

  function iceStock(itemId, qty) {
    qty = qty === undefined ? 1 : qty;
    const item = MARKET_CATCH.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = state.inventory[itemId] || 0;
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    state.inventory[itemId] -= qty;
    state.premium[itemId] += qty;
    state.aged += qty;
    gainXp(6 + qty * 2);
    log(`Ice Stock: ${qty}x ${item.name} set aside as premium stock.`);
    return { ok: true, item: itemId, qty, premium: state.premium[itemId] };
  }

  function sell(itemId, qty) {
    const item = MARKET_CATCH.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = (state.inventory[itemId] || 0) + (state.premium[itemId] || 0);
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    let left = qty;
    let total = 0;
    const takePrem = Math.min(state.premium[itemId] || 0, left);
    if (takePrem > 0) {
      const unit = fishMarketSellPriceFor(itemId, true, state.dayDrift, state.rank, state.upgrades);
      total += unit * takePrem;
      state.premium[itemId] -= takePrem;
      left -= takePrem;
    }
    if (left > 0) {
      const unit = fishMarketSellPriceFor(itemId, false, state.dayDrift, state.rank, state.upgrades);
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
    for (const item of MARKET_CATCH) {
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
    const u = FISH_MARKET_UPGRADES.find((x) => x.id === id);
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
    const ord = FISH_MARKET_ORDERS.find((x) => x.id === id);
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
      for (const item of MARKET_CATCH) {
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
      log(`Fishmonger Sal the Auctioneer nods: +${Math.round(bonus * 100)}% on your next sale.`);
      return { ok: true, haggled: true, bonus: Math.round(bonus * 100) / 100 };
    }
    log('Fishmonger Sal the Auctioneer shrugs you off — no better price today.');
    return { ok: true, haggled: false, bonus: 0 };
  }

  function priceBoard() {
    return MARKET_CATCH.map((item) => ({
      id: item.id,
      name: item.name,
      price: fishMarketPriceFor(item.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[item.id],
      stock: (state.inventory[item.id] || 0) + (state.premium[item.id] || 0),
      premium: state.premium[item.id] || 0,
    }));
  }

  function orderList() {
    return FISH_MARKET_ORDERS.map((o) => ({
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
      const ev = FISH_MARKET_EVENTS[Math.floor(rng() * FISH_MARKET_EVENTS.length)];
      state.lastEvent = ev.id;
      if (ev.effect === 'cost-up') {
        for (const item of MARKET_CATCH) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] + 0.15) * 100) / 100;
      } else if (ev.effect === 'cost-down') {
        for (const item of MARKET_CATCH) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] - 0.1) * 100) / 100;
      } else if (ev.effect === 'sell-up') {
        for (const item of MARKET_CATCH) state.dayDrift[item.id] = Math.round((state.dayDrift[item.id] + 0.2) * 100) / 100;
      } else if (ev.effect === 'xp') {
        gainXp(25);
      } else if (ev.effect === 'spoil') {
        const item = MARKET_CATCH[Math.floor(rng() * MARKET_CATCH.length)];
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
      log(`Fish Market news: ${ev.name} — ${ev.text}`);
      return { event: ev.id, name: ev.name };
    }
    state.lastEvent = 'none';
    return { event: 'none' };
  }

  function tasteTest(itemId) {
    const item = MARKET_CATCH.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    const have = (state.inventory[itemId] || 0) + (state.premium[itemId] || 0);
    if (have <= 0) return { ok: false, reason: 'not-enough', have };
    const roll = rng();
    const quality = Math.round((0.5 + roll * 0.5 + state.rank * 0.05 + item.difficulty * 0.05) * 100) / 100;
    gainXp(5);
    const verdict = quality >= 0.9 ? 'Outstanding — Fishmonger Sal the Auctioneer would serve this to royalty.' : quality >= 0.7 ? 'Solid work. A good lot.' : 'Needs work. Fishmonger Sal the Auctioneer raises an eyebrow.';
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
    for (const item of MARKET_CATCH) {
      if (state.inventory[item.id] === undefined) state.inventory[item.id] = 0;
      if (state.premium[item.id] === undefined) state.premium[item.id] = 0;
      if (state.dayDrift[item.id] === undefined) state.dayDrift[item.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: FISH_MARKET_RANKS[state.rank].name,
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
      stockCap: fishMarketStockCap(state.upgrades),
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
    if (state.cooldown > 0) return `Fish Market: working — ${Math.round(state.cooldown)}s left`;
    if (state.activeOrder) return `Fish Market: ${state.activeOrder.name} ${state.orderProgress}/${state.activeOrder.qty}`;
    const total = stockTotal();
    if (total > 0) return `Fish Market: ${total} in stock`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearShop = Math.hypot(pos.x - (260), pos.z - (180)) < 25;
    if (!nearShop) return false;
    const total = stockTotal();
    if (total > 0) {
      const first = MARKET_CATCH.find((item) => (state.inventory[item.id] || 0) + (state.premium[item.id] || 0) > 0);
      if (first) { sell(first.id, 1); return true; }
    }
    const cheapest = fishMarketCheapest(state.dayDrift, state.rank, state.upgrades);
    if (cheapest) {
      const res = buyCatch(cheapest.id, 1);
      return res.ok;
    }
    return false;
  }

  return {
    name: 'fishMarket',
    state, buyCatch, iceStock, sell, sellAll, buyUpgrade,
    takeOrder, deliverOrder, abandonOrder, haggle, priceBoard,
    orderList, dailyEvent, tasteTest, tick, tickDay, serialize,
    deserialize, stats, hudLine, interact,
  };
}
