// Ria runs scrap routes, sorts the haul and sells bales to the yard buyers.
// Context supplies rng, day/hour getters, cash access, a logger and the
// player position. Speed is listed in the context contract but unused here.
export const RECYCLING_MATERIALS = [
  { id: 'aluminium', name: 'Aluminium Cans', basePrice: 12, weight: 0.5, rarity: 0.3, sortTime: 4, bin: 'metal', hazard: 1, desc: 'Crushed drink cans, light and quick to sort.' },
  { id: 'copper', name: 'Copper Wire', basePrice: 25, weight: 0.8, rarity: 0.15, sortTime: 5, bin: 'metal', hazard: 2, desc: 'Stripped copper wire, the yard pays well for it.' },
  { id: 'steel', name: 'Steel Scrap', basePrice: 8, weight: 2.5, rarity: 0.5, sortTime: 3, bin: 'metal', hazard: 1, desc: 'Heavy offcuts from the marina workshops.' },
  { id: 'plastic-bottle', name: 'Plastic Bottles', basePrice: 3, weight: 0.2, rarity: 0.7, sortTime: 2, bin: 'plastic', hazard: 0, desc: 'Everywhere on the beach, worth a little each.' },
  { id: 'plastic-bag', name: 'Plastic Bags', basePrice: 1, weight: 0.1, rarity: 0.8, sortTime: 2, bin: 'plastic', hazard: 0, desc: 'Thin bags that tangle the sorter if you rush.' },
  { id: 'cardboard', name: 'Cardboard', basePrice: 2, weight: 0.6, rarity: 0.75, sortTime: 2, bin: 'paper', hazard: 0, desc: 'Flattened boxes from the market stalls.' },
  { id: 'newspaper', name: 'Newspapers', basePrice: 1, weight: 0.3, rarity: 0.8, sortTime: 2, bin: 'paper', hazard: 0, desc: 'Yesterday news, still worth a coin.' },
  { id: 'glass-bottle', name: 'Glass Bottles', basePrice: 4, weight: 0.9, rarity: 0.4, sortTime: 3, bin: 'glass', hazard: 1, desc: 'Green and brown glass, watch the sharp edges.' },
  { id: 'circuit-board', name: 'Circuit Boards', basePrice: 30, weight: 0.4, rarity: 0.1, sortTime: 6, bin: 'e-waste', hazard: 3, desc: 'Dead phones and radios, rich in rare metals.' },
  { id: 'battery', name: 'Old Batteries', basePrice: 15, weight: 0.7, rarity: 0.2, sortTime: 5, bin: 'hazard', hazard: 4, desc: 'Leaking cells, handle with gloves.' },
  { id: 'food-waste', name: 'Food Waste', basePrice: 1, weight: 1.0, rarity: 0.85, sortTime: 2, bin: 'organic', hazard: 0, desc: 'Compost-grade scraps from the diner bins.' },
  { id: 'old-clothes', name: 'Old Clothes', basePrice: 5, weight: 0.8, rarity: 0.45, sortTime: 3, bin: 'textile', hazard: 0, desc: 'Worn shirts and jeans for the rag trade.' },
];

export const RECYCLING_BINS = [
  { id: 'metal', name: 'Metal Bin', colour: 'silver', bonus: 1.1 },
  { id: 'plastic', name: 'Plastic Bin', colour: 'blue', bonus: 1.0 },
  { id: 'paper', name: 'Paper Bin', colour: 'yellow', bonus: 1.0 },
  { id: 'glass', name: 'Glass Bin', colour: 'green', bonus: 1.05 },
  { id: 'e-waste', name: 'E-Waste Bin', colour: 'purple', bonus: 1.2 },
  { id: 'organic', name: 'Organic Bin', colour: 'brown', bonus: 0.9 },
  { id: 'textile', name: 'Textile Bin', colour: 'pink', bonus: 1.0 },
  { id: 'wood', name: 'Wood Bin', colour: 'tan', bonus: 1.0 },
  { id: 'hazard', name: 'Hazard Bin', colour: 'red', bonus: 1.15 },
];

export const RECYCLING_ROUTES = [
  { id: 'marina', name: 'Marina Walk', district: 'Marina', piles: 6, density: 0.7, hazard: 1, mult: 1.0, timeMin: 20, desc: 'Piles along the docks, mostly bottles and cans.' },
  { id: 'downtown', name: 'Downtown Loop', district: 'Downtown', piles: 8, density: 0.8, hazard: 2, mult: 1.1, timeMin: 25, desc: 'Busy streets with rich mixed scrap.' },
  { id: 'old-town', name: 'Old Town Alleys', district: 'Old Town', piles: 5, density: 0.6, hazard: 2, mult: 1.2, timeMin: 18, desc: 'Quiet alleys hiding old metal and glass.' },
  { id: 'harbour', name: 'Harbour Yards', district: 'Harbour', piles: 9, density: 0.9, hazard: 3, mult: 1.3, timeMin: 30, desc: 'Industrial scrap, heavy and sometimes sharp.' },
  { id: 'market', name: 'Market Row', district: 'Market', piles: 7, density: 0.85, hazard: 1, mult: 1.0, timeMin: 22, desc: 'Cardboard and food waste after closing time.' },
  { id: 'suburbs', name: 'Suburb Sweep', district: 'Suburbs', piles: 6, density: 0.5, hazard: 1, mult: 0.9, timeMin: 20, desc: 'Garden clear-outs and old appliances.' },
  { id: 'industrial', name: 'Industrial Park', district: 'Industrial', piles: 10, density: 0.95, hazard: 4, mult: 1.4, timeMin: 35, desc: 'The best paying scrap, and the roughest ground.' },
  { id: 'beach', name: 'Beach Comb', district: 'Beach', piles: 5, density: 0.55, hazard: 1, mult: 1.0, timeMin: 15, desc: 'Plastic and glass washed up with the tide.' },
];

export const SCRAPYARD_BUYERS = [
  { id: 'big-tony', name: 'Big Tony', mult: 1.0, likes: ['metal'], dislikes: ['organic'], mood: 'gruff', minRank: 0, desc: 'Pays fair for metal, scoffs at compost.' },
  { id: 'maria', name: 'Maria Metals', mult: 1.1, likes: ['metal', 'copper'], dislikes: ['plastic'], mood: 'sharp', minRank: 1, desc: 'A sharp dealer who loves clean copper.' },
  { id: 'green-coop', name: 'Green Coop', mult: 0.95, likes: ['plastic', 'paper'], dislikes: ['hazard'], mood: 'friendly', minRank: 0, desc: 'Community buyers, steady prices for clean sorts.' },
  { id: 'electro-eli', name: 'Electro Eli', mult: 1.25, likes: ['e-waste', 'circuit-board'], dislikes: ['organic', 'textile'], mood: 'eager', minRank: 2, desc: 'Pays top coin for boards and old tech.' },
  { id: 'old-joe', name: 'Old Joe', mult: 0.9, likes: ['glass', 'paper'], dislikes: ['hazard'], mood: 'slow', minRank: 0, desc: 'Buys anything, never in a hurry, never generous.' },
  { id: 'hazmat-hana', name: 'Hazmat Hana', mult: 1.3, likes: ['hazard', 'battery'], dislikes: ['organic'], mood: 'careful', minRank: 3, desc: 'Licensed for the dangerous stuff, pays for the risk.' },
];

export const RECYCLING_UPGRADES = [
  { id: 'cart', name: 'Hand Cart', cost: 150, desc: 'A sturdy cart for heavier hauls.', effect: 'carry' },
  { id: 'truck', name: 'Pickup Truck', cost: 800, desc: 'A truck that hauls far more, far faster.', effect: 'carry' },
  { id: 'sorter', name: 'Auto Sorter', cost: 400, desc: 'A belt that sorts thirty percent faster.', effect: 'sort' },
  { id: 'gloves', name: 'Work Gloves', cost: 60, desc: 'Thick gloves that stop scrap cuts.', effect: 'safety' },
  { id: 'scanner', name: 'Route Scanner', cost: 250, desc: 'Scans a route for the best finds.', effect: 'scout' },
  { id: 'crusher', name: 'Metal Crusher', cost: 500, desc: 'Melts sorted metal into ingots.', effect: 'melt' },
  { id: 'magnet', name: 'Super Magnet', cost: 200, desc: 'Pulls hidden metal from every pile.', effect: 'find' },
  { id: 'baler', name: 'Bale Press', cost: 350, desc: 'Presses sorted stock into neat bales.', effect: 'sell' },
];

export const RECYCLING_CONTRACTS = [
  { id: 'copper-run', name: 'Copper Run', material: 'copper', qty: 20, pay: 300, days: 3, rep: 5, desc: 'Deliver twenty copper to the yard.' },
  { id: 'bottle-blitz', name: 'Bottle Blitz', material: 'plastic-bottle', qty: 60, pay: 180, days: 2, rep: 3, desc: 'Sixty bottles for the coop drive.' },
  { id: 'steel-stack', name: 'Steel Stack', material: 'steel', qty: 30, pay: 260, days: 4, rep: 5, desc: 'Thirty steel for the harbour rebuild.' },
  { id: 'glass-gather', name: 'Glass Gather', material: 'glass-bottle', qty: 25, pay: 150, days: 3, rep: 3, desc: 'Twenty-five glass bottles, unbroken.' },
  { id: 'board-bounty', name: 'Board Bounty', material: 'circuit-board', qty: 8, pay: 400, days: 5, rep: 8, desc: 'Eight circuit boards for Eli.' },
  { id: 'paper-mountain', name: 'Paper Mountain', material: 'cardboard', qty: 50, pay: 140, days: 2, rep: 2, desc: 'Fifty cardboard for the market.' },
  { id: 'mixed-bag', name: 'Mixed Bag', material: 'mixed', qty: 40, pay: 220, days: 3, rep: 4, desc: 'Any forty sorted units will do.' },
  { id: 'battery-duty', name: 'Battery Duty', material: 'battery', qty: 10, pay: 350, days: 4, rep: 7, desc: 'Ten old batteries, safely handled.' },
];

export const RECYCLING_TREASURES = [
  { id: 'silver-spoon', name: 'Silver Spoon', value: 120, weight: 0.1, desc: 'Tarnished but solid silver.' },
  { id: 'brass-key', name: 'Brass Key', value: 45, weight: 0.1, desc: 'An old harbour-master key.' },
  { id: 'gold-chain', name: 'Gold Chain', value: 400, weight: 0.2, desc: 'A broken chain, still heavy with gold.' },
  { id: 'vintage-coin', name: 'Vintage Coin', value: 90, weight: 0.05, desc: 'A coin from before the marina was built.' },
  { id: 'brass-compass', name: 'Brass Compass', value: 150, weight: 0.3, desc: 'Still points north, more or less.' },
  { id: 'copper-pot', name: 'Copper Pot', value: 80, weight: 1.2, desc: 'Dented, green with age, solid copper.' },
  { id: 'pearl-button', name: 'Pearl Button', value: 60, weight: 0.02, desc: 'One perfect pearl button.' },
  { id: 'old-watch', name: 'Old Watch', value: 220, weight: 0.15, desc: 'A wind-up watch that still ticks.' },
];

export const RECYCLING_RANKS = [
  { level: 0, name: 'Picker', xp: 0, perk: 'Start routes and sort scrap.' },
  { level: 1, name: 'Sorter', xp: 150, perk: 'Better buyers open their doors.' },
  { level: 2, name: 'Hauler', xp: 400, perk: 'Heavier loads and richer contracts.' },
  { level: 3, name: 'Scrap Boss', xp: 800, perk: 'Hazmat buyers and big contracts.' },
  { level: 4, name: 'Yard Legend', xp: 1500, perk: 'The best prices in Solara Bay.' },
];

export const RECYCLING_HELPERS = [
  { id: 'pip', name: 'Pip', wage: 20, skill: 'sorting', bonus: 0.1, desc: 'Fast hands on the sorting belt.' },
  { id: 'gus', name: 'Gus', wage: 30, skill: 'hauling', bonus: 0.15, desc: 'Carries twice what Ria can.' },
  { id: 'nina', name: 'Nina', wage: 25, skill: 'scouting', bonus: 0.1, desc: 'Knows every pile in the city.' },
  { id: 'omar', name: 'Omar', wage: 35, skill: 'selling', bonus: 0.2, desc: 'Talks buyers into better prices.' },
];

export const RECYCLING_CHALLENGES = [
  { id: 'first-route', name: 'First Route', target: 'routesRun', goal: 1, xp: 20, desc: 'Finish one route.' },
  { id: 'sort-hundred', name: 'Sort a Hundred', target: 'unitsSorted', goal: 100, xp: 50, desc: 'Sort one hundred units.' },
  { id: 'sell-fifty', name: 'Sell Fifty', target: 'unitsSold', goal: 50, xp: 40, desc: 'Sell fifty sorted units.' },
  { id: 'treasure-hunter', name: 'Treasure Hunter', target: 'treasuresFound', goal: 3, xp: 60, desc: 'Find three street treasures.' },
  { id: 'contract-pro', name: 'Contract Pro', target: 'contractsDone', goal: 5, xp: 80, desc: 'Complete five contracts.' },
  { id: 'streak-ten', name: 'Streak Ten', target: 'bestStreak', goal: 10, xp: 70, desc: 'Sort ten in a row without a mistake.' },
  { id: 'heavy-hauler', name: 'Heavy Hauler', target: 'totalKg', goal: 500, xp: 90, desc: 'Haul five hundred kilograms.' },
  { id: 'big-earner', name: 'Big Earner', target: 'earned', goal: 1000, xp: 100, desc: 'Earn one thousand from scrap.' },
];

export const RECYCLING_ACHIEVEMENTS = [
  { id: 'first-sort', name: 'First Sort', check: (s) => s.unitsSorted >= 1, desc: 'Sort your first unit.' },
  { id: 'first-sale', name: 'First Sale', check: (s) => s.unitsSold >= 1, desc: 'Sell your first bale.' },
  { id: 'first-treasure', name: 'First Treasure', check: (s) => s.treasuresFound >= 1, desc: 'Find a street treasure.' },
  { id: 'first-contract', name: 'First Contract', check: (s) => s.contractsDone >= 1, desc: 'Complete a delivery contract.' },
  { id: 'clean-sorter', name: 'Clean Sorter', check: (s) => s.unitsSorted >= 50 && s.sortMistakes === 0, desc: 'Sort fifty units with no mistakes.' },
  { id: 'full-truck', name: 'Full Truck', check: (s) => s.carryKg >= 180, desc: 'Fill the truck to the brim.' },
  { id: 'yard-legend', name: 'Yard Legend', check: (s) => s.rank >= 4, desc: 'Reach the top rank.' },
  { id: 'rich-picker', name: 'Rich Picker', check: (s) => s.earned >= 2000, desc: 'Earn two thousand from scrap.' },
];

export const RECYCLING_MARKET_EVENTS = [
  { id: 'metal-boom', name: 'Metal Boom', materials: ['aluminium', 'copper', 'steel'], mult: 1.4, desc: 'Metal prices spike across the bay.' },
  { id: 'plastic-dip', name: 'Plastic Dip', materials: ['plastic-bottle', 'plastic-bag'], mult: 0.7, desc: 'Plastic prices slump this week.' },
  { id: 'paper-rally', name: 'Paper Rally', materials: ['cardboard', 'newspaper'], mult: 1.3, desc: 'Paper mills are buying big.' },
  { id: 'glass-glut', name: 'Glass Glut', materials: ['glass-bottle'], mult: 0.8, desc: 'Too much glass, prices fall.' },
  { id: 'tech-rush', name: 'Tech Rush', materials: ['circuit-board', 'battery'], mult: 1.5, desc: 'Old tech is suddenly valuable.' },
  { id: 'compost-week', name: 'Compost Week', materials: ['food-waste'], mult: 1.6, desc: 'Farms pay extra for compost.' },
  { id: 'rag-trade', name: 'Rag Trade', materials: ['old-clothes'], mult: 1.3, desc: 'Textile buyers are in town.' },
  { id: 'copper-spike', name: 'Copper Spike', materials: ['copper'], mult: 1.8, desc: 'Copper hits a record high.' },
  { id: 'steel-slump', name: 'Steel Slump', materials: ['steel'], mult: 0.75, desc: 'Steel demand cools off.' },
  { id: 'bottle-drive', name: 'Bottle Drive', materials: ['plastic-bottle', 'glass-bottle'], mult: 1.25, desc: 'A city bottle drive lifts prices.' },
  { id: 'hazmat-premium', name: 'Hazmat Premium', materials: ['battery'], mult: 1.6, desc: 'Safe disposal pays a premium.' },
  { id: 'quiet-market', name: 'Quiet Market', materials: [], mult: 1.0, desc: 'Nothing moves, prices hold steady.' },
];

export const RECYCLING_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.0, desc: 'Spring cleaning fills the piles.' },
  { id: 'summer', name: 'Summer', mult: 1.15, desc: 'Tourists leave bottles everywhere.' },
  { id: 'autumn', name: 'Autumn', mult: 0.95, desc: 'Rain slows the routes down.' },
  { id: 'winter', name: 'Winter', mult: 0.9, desc: 'Cold streets, thin pickings.' },
];

export const RECYCLING_TIPS = [
  { id: 'tip-sort', name: 'Sort Right', tip: 'Wrong bins destroy half the pile, so check the material first.' },
  { id: 'tip-gloves', name: 'Wear Gloves', tip: 'Gloves stop hazard cuts on rough routes.' },
  { id: 'tip-buyers', name: 'Shop Buyers', tip: 'Each buyer likes different bins, compare before you sell.' },
  { id: 'tip-contracts', name: 'Contracts Pay', tip: 'Contracts pay a rank bonus on top of the listed pay.' },
  { id: 'tip-routes', name: 'Route Choice', tip: 'Industrial routes pay more but hurt more.' },
  { id: 'tip-streak', name: 'Keep Streaks', tip: 'A long sort streak means no mistakes, and buyers notice.' },
  { id: 'tip-drift', name: 'Watch Drift', tip: 'Prices drift daily, sell when your material spikes.' },
  { id: 'tip-treasure', name: 'Treasure Hunt', tip: 'Top ranks find street treasure far more often.' },
];

export const RECYCLING_LEADERBOARD = [
  { name: 'Mama Rosa', kg: 4200, desc: 'The old queen of the yard.' },
  { name: 'Big Tony', kg: 3100, desc: 'Buys and hauls in equal measure.' },
  { name: 'Gus', kg: 2400, desc: 'Hauls for anyone who pays.' },
  { name: 'Nina', kg: 1800, desc: 'Knows every pile in the city.' },
  { name: 'Ria', kg: 0, desc: 'The new picker on the block.' },
];

export const RECYCLING_RECORDS = [
  { id: 'total-kg', name: 'Total Kilograms', field: 'totalKg', unit: 'kg', desc: 'All scrap ever hauled.' },
  { id: 'units-sorted', name: 'Units Sorted', field: 'unitsSorted', unit: 'units', desc: 'All units sorted into bins.' },
  { id: 'earned', name: 'Total Earned', field: 'earned', unit: 'cash', desc: 'All cash earned from scrap.' },
  { id: 'routes-run', name: 'Routes Run', field: 'routesRun', unit: 'routes', desc: 'All routes completed.' },
  { id: 'treasures', name: 'Treasures Found', field: 'treasuresFound', unit: 'items', desc: 'All street treasures found.' },
];

export const RECYCLING_SEASONAL_PRICES = [
  { season: 'summer', material: 'plastic-bottle', mult: 1.3 },
  { season: 'summer', material: 'glass-bottle', mult: 1.2 },
  { season: 'spring', material: 'cardboard', mult: 1.2 },
  { season: 'spring', material: 'aluminium', mult: 1.1 },
  { season: 'autumn', material: 'steel', mult: 1.15 },
  { season: 'autumn', material: 'old-clothes', mult: 1.25 },
  { season: 'winter', material: 'copper', mult: 1.2 },
  { season: 'winter', material: 'circuit-board', mult: 1.1 },
];

export const RECYCLING_QUICK_START = [
  'Start a route at the yard and collect every pile.',
  'Sort each material into its matching bin.',
  'Sell sorted bales to the buyer who likes that bin.',
  'Buy a cart early to carry more per route.',
  'Take contracts for bonus pay on top of sales.',
  'Watch the daily drift and sell when prices spike.',
];

export const RECYCLING_META = {
  system: 'recycling',
  version: '7b-B',
  author: 'builder-B',
  files: 1,
  lines: 1135,
  features: ['routes', 'sorting', 'sales', 'contracts', 'upgrades', 'treasures'],
};

function findMat(id) { return RECYCLING_MATERIALS.find((m) => m.id === id); }
function findBin(id) { return RECYCLING_BINS.find((b) => b.id === id); }
function findRoute(id) { return RECYCLING_ROUTES.find((r) => r.id === id); }
function findBuyer(id) { return SCRAPYARD_BUYERS.find((b) => b.id === id); }

export function recyclingRankFor(xp) {
  let out = 0;
  for (const r of RECYCLING_RANKS) if (xp >= r.xp) out = r.level;
  return out;
}

export function recyclingPriceFor(materialId, drift, rank, upgrades) {
  const mat = findMat(materialId);
  if (!mat) return 0;
  const d = (drift && drift[materialId]) || 0;
  let price = mat.basePrice * (1 + d) * (1 + (rank || 0) * 0.05);
  if (upgrades && upgrades.includes('baler')) price *= 1.05;
  const rounded = Math.round(price * 10) / 10;
  return Math.max(1, rounded);
}

export function recyclingBuyerPrice(materialId, buyerId, drift, rank, upgrades) {
  const mat = findMat(materialId);
  const buyer = findBuyer(buyerId);
  if (!mat || !buyer) return 0;
  let price = recyclingPriceFor(materialId, drift, rank, upgrades) * buyer.mult;
  if (buyer.likes.includes(mat.bin) || buyer.likes.includes(materialId)) price *= 1.15;
  if (buyer.dislikes.includes(mat.bin) || buyer.dislikes.includes(materialId)) price *= 0.85;
  return Math.round(price * 10) / 10;
}

export function recyclingCarryCap(upgrades) {
  let cap = 60;
  if (upgrades && upgrades.includes('cart')) cap += 40;
  if (upgrades && upgrades.includes('truck')) cap += 120;
  return cap;
}

export function recyclingSortSpeed(upgrades) {
  return upgrades && upgrades.includes('sorter') ? 0.7 : 1;
}

export function recyclingHelperBonus(hired, skill) {
  let total = 0;
  for (const h of RECYCLING_HELPERS) {
    if (hired.includes(h.id) && h.skill === skill) total += h.bonus;
  }
  return total;
}

export function recyclingChallengeProgress(challenge, state) {
  const current = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, current, goal: challenge.goal, done: current >= challenge.goal };
}

export function recyclingEventMult(eventId, materialId) {
  const ev = RECYCLING_MARKET_EVENTS.find((e) => e.id === eventId);
  if (!ev || !ev.materials.includes(materialId)) return 1;
  return ev.mult;
}

export function recyclingSeasonMult(seasonId) {
  const s = RECYCLING_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function recyclingEventFor(day) {
  return RECYCLING_MARKET_EVENTS[((day % RECYCLING_MARKET_EVENTS.length) + RECYCLING_MARKET_EVENTS.length) % RECYCLING_MARKET_EVENTS.length];
}

export function recyclingRouteScore(routeId, piles, kg, mistakes) {
  if (!findRoute(routeId)) return 0;
  return Math.max(0, piles * 100 + kg * 2 - mistakes * 25);
}

export function recyclingWeeklyGoal(routes, units, earned) {
  const mk = (have, goal) => ({ have, goal, done: have >= goal });
  const out = { routes: mk(routes, 5), units: mk(units, 100), earned: mk(earned, 500) };
  out.allDone = out.routes.done && out.units.done && out.earned.done;
  return out;
}

export function recyclingTipFor(day) {
  return RECYCLING_TIPS[((day % RECYCLING_TIPS.length) + RECYCLING_TIPS.length) % RECYCLING_TIPS.length];
}

export function recyclingLeaderboardWith(playerKg) {
  const rows = RECYCLING_LEADERBOARD.map((r) => ({ ...r, kg: r.name === 'Ria' ? playerKg : r.kg }));
  rows.sort((a, b) => b.kg - a.kg);
  return rows.map((r, i) => ({ ...r, rank: i + 1 }));
}

export function recyclingDailyWage(routes, units) {
  return routes * 10 + Math.floor(units / 10) * 5;
}

export function recyclingBinFor(materialId) {
  const mat = findMat(materialId);
  if (!mat) return null;
  return findBin(mat.bin) || null;
}

export function recyclingMaterialByBin(binId) {
  return RECYCLING_MATERIALS.filter((m) => m.bin === binId).map((m) => m.id);
}

export function recyclingHazardPay(hazards) {
  return hazards * 5;
}

export function recyclingBestBuyer(materialId, drift, rank, upgrades) {
  let best = null;
  for (const b of SCRAPYARD_BUYERS) {
    if (b.minRank > (rank || 0)) continue;
    const price = recyclingBuyerPrice(materialId, b.id, drift, rank, upgrades);
    if (price > 0 && (!best || price > best.price)) best = { buyer: b.id, price };
  }
  return best;
}

export function recyclingSortQuiz(materialId, binId) {
  const mat = findMat(materialId);
  if (!mat) return { correct: false, correctBin: null };
  return { correct: mat.bin === binId, correctBin: mat.bin };
}

export function recyclingRecordFor(recordId, state) {
  const rec = RECYCLING_RECORDS.find((r) => r.id === recordId);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: state[rec.field] || 0, unit: rec.unit };
}

export function recyclingAllRecords(state) {
  return RECYCLING_RECORDS.map((r) => ({ id: r.id, name: r.name, value: state[r.field] || 0, unit: r.unit, desc: r.desc }));
}

export function recyclingEfficiency(sorted, mistakes) {
  const total = sorted + mistakes;
  if (total === 0) return 100;
  return Math.round((sorted / total) * 1000) / 10;
}

export function recyclingProfitPerHour(earnings, routes) {
  if (!routes) return 0;
  return Math.round(earnings / routes);
}

export function recyclingRouteGrade(piles, kg, mistakes) {
  const score = recyclingRouteScore('marina', piles, kg, mistakes);
  if (score >= 800) return 'S';
  if (score >= 600) return 'A';
  if (score >= 400) return 'B';
  if (score >= 200) return 'C';
  return 'D';
}

export function recyclingSeasonalPriceMult(seasonId, materialId) {
  const row = RECYCLING_SEASONAL_PRICES.find((r) => r.season === seasonId && r.material === materialId);
  return row ? row.mult : 1;
}

export function recyclingBestSeason(materialId) {
  let best = null;
  for (const row of RECYCLING_SEASONAL_PRICES) {
    if (row.material !== materialId) continue;
    if (!best || row.mult > best.mult) best = { season: row.season, mult: row.mult };
  }
  return best;
}

export function recyclingRouteEfficiency(piles, time) {
  if (!time) return 0;
  return Math.round((piles / time) * 100) / 100;
}

export function recyclingInventoryValue(sortedMap) {
  let total = 0;
  for (const mat of RECYCLING_MATERIALS) total += mat.basePrice * (sortedMap[mat.id] || 0);
  return Math.round(total * 10) / 10;
}

export function recyclingQuickStart(step) {
  if (step < 0 || step >= RECYCLING_QUICK_START.length) return null;
  return RECYCLING_QUICK_START[step];
}

export function recyclingTotalValue(state) {
  return Math.round((recyclingInventoryValue(state.sorted) + recyclingInventoryValue(state.unsorted)) * 10) / 10;
}

export function recyclingProgressPercent(state) {
  const total = state.unitsSorted + state.unitsSold;
  if (!total) return 0;
  return Math.round((state.unitsSorted / total) * 1000) / 10;
}

export function recyclingSummary(state) {
  const rankName = RECYCLING_RANKS[state.rank].name;
  return `${rankName} Ria ran ${state.routesRun} routes, sorted ${state.unitsSorted} units, earned ${Math.round(state.earned)} and found ${state.treasuresFound} treasures.`;
}

export function recyclingNextGoal(state) {
  if (state.routesRun < 5) return 'Run 5 routes to hit your first goal.';
  if (state.unitsSorted < 100) return 'Sort 100 units to hit your next goal.';
  if (state.rank < 2) return 'Reach rank 2 to hit your next goal.';
  return 'Reach the top rank and become a Yard Legend.';
}

export function recyclingMeta() {
  return { ...RECYCLING_META, features: [...RECYCLING_META.features] };
}

export function createRecyclingSystem(ctx) {
  const {
    rng = Math.random,
    getDay = () => 1,
    getHour = () => 12,
    getCash = () => 0,
    addCash = () => {},
    addHeat = () => {},
    log = () => {},
    getPlayerPos = () => ({ x: 0, y: 0, z: 0 }),
  } = ctx || {};

  const zeroMap = () => {
    const m = {};
    for (const mat of RECYCLING_MATERIALS) m[mat.id] = 0;
    return m;
  };
  const zeroRep = () => {
    const m = {};
    for (const b of SCRAPYARD_BUYERS) m[b.id] = 0;
    return m;
  };

  const state = {
    xp: 0, rank: 0, routesRun: 0, pilesCleared: 0, unitsSorted: 0, sortStreak: 0,
    bestStreak: 0, sortMistakes: 0, unitsSold: 0, earned: 0, spent: 0,
    treasuresFound: 0, treasuresSold: 0, contractsDone: 0, contractsFailed: 0,
    hazardsTaken: 0, carryKg: 0, unsorted: zeroMap(), sorted: zeroMap(),
    treasures: [], upgrades: [], activeContract: null, contractProgress: 0,
    route: null, routePilesLeft: 0, routeTimeLeft: 0, sorting: null, sortTimer: 0,
    dailyDrift: zeroMap(), lastDay: 1, bestRoute: null, bestRouteKg: 0,
    buyerRep: zeroRep(), dailySold: 0, dailyEarned: 0, totalKg: 0,
  };
  let routeKg = 0;

  function refreshRank() {
    const next = recyclingRankFor(state.xp);
    if (next > state.rank) state.rank = next;
  }
  function gainXp(n) { state.xp += n; refreshRank(); }
  function fail(reason) { return { ok: false, reason }; }
  function hasUpgrade(id) { return state.upgrades.includes(id); }
  function cap() { return recyclingCarryCap(state.upgrades); }

  function checkContract(materialId, qty) {
    const c = state.activeContract;
    if (!c) return;
    if (c.material !== 'mixed' && c.material !== materialId) return;
    state.contractProgress += qty;
    if (state.contractProgress >= c.qty) {
      const pay = c.pay + 40 * state.rank;
      addCash(pay);
      state.earned += pay;
      state.dailyEarned += pay;
      state.contractsDone += 1;
      state.activeContract = null;
      state.contractProgress = 0;
      gainXp(60);
      log(`Contract ${c.name} completed while sorting, paid ${pay}.`);
    }
  }

  function closeRoute(finished) {
    state.routesRun += 1;
    if (routeKg > state.bestRouteKg) { state.bestRouteKg = routeKg; state.bestRoute = state.route; }
    if (finished) log(`Route ${state.route} finished.`);
    state.route = null;
    state.routePilesLeft = 0;
    state.routeTimeLeft = 0;
    routeKg = 0;
  }

  function startRoute(routeId) {
    const route = findRoute(routeId);
    if (!route) return fail('unknown route');
    if (state.route) return fail('route already active');
    const hour = getHour();
    if (hour >= 23 || hour < 5) return fail('too late to start a route');
    state.route = routeId;
    state.routePilesLeft = route.piles;
    state.routeTimeLeft = route.timeMin * 60 * (hasUpgrade('truck') ? 0.75 : 1);
    routeKg = 0;
    log(`Started route ${route.name}.`);
    return { ok: true, route: routeId, piles: route.piles };
  }

  function collectPile() {
    if (!state.route) return fail('no route active');
    if (state.routePilesLeft <= 0) return fail('no piles left');
    if (state.carryKg >= cap()) return fail('carry full');
    const route = findRoute(state.route);
    const found = [];
    const finds = 1 + Math.floor(rng() * 3);
    for (let i = 0; i < finds; i++) {
      const roll = rng();
      let acc = 0;
      let picked = RECYCLING_MATERIALS[RECYCLING_MATERIALS.length - 1];
      for (const mat of RECYCLING_MATERIALS) {
        acc += (1 - mat.rarity) / RECYCLING_MATERIALS.length;
        if (roll <= acc) { picked = mat; break; }
      }
      let qty = 1 + Math.floor(rng() * 3);
      const room = Math.floor((cap() - state.carryKg) / picked.weight);
      if (room <= 0) break;
      if (qty > room) qty = room;
      state.unsorted[picked.id] += qty;
      state.carryKg = Math.round((state.carryKg + qty * picked.weight) * 10) / 10;
      state.totalKg = Math.round((state.totalKg + qty * picked.weight) * 10) / 10;
      routeKg = Math.round((routeKg + qty * picked.weight) * 10) / 10;
      found.push({ material: picked.id, qty });
    }
    state.pilesCleared += 1;
    state.routePilesLeft -= 1;
    gainXp(5);
    if (rng() < 0.05 + state.rank * 0.02) {
      const treasure = RECYCLING_TREASURES[Math.floor(rng() * RECYCLING_TREASURES.length)];
      state.treasures.push(treasure.id);
      state.treasuresFound += 1;
      log(`Found a street treasure: ${treasure.name}.`);
    }
    if (!hasUpgrade('gloves') && rng() < route.hazard * 0.08) {
      state.hazardsTaken += 1;
      log('Scrap cut on a sharp edge, no gloves on.');
    }
    if (state.routePilesLeft <= 0) closeRoute(true);
    return { ok: true, found, pilesLeft: state.routePilesLeft, carryKg: Math.round(state.carryKg * 10) / 10 };
  }

  function beginSort(materialId) {
    const mat = findMat(materialId);
    if (!mat) return fail('unknown material');
    if (state.sorting) return fail('already sorting');
    if (!state.unsorted[materialId] || state.unsorted[materialId] <= 0) return fail('nothing to sort');
    state.sorting = materialId;
    state.sortTimer = mat.sortTime * recyclingSortSpeed(state.upgrades);
    return { ok: true, material: materialId, bin: mat.bin, sortTime: state.sortTimer };
  }

  function sortInto(binId) {
    if (!state.sorting) return fail('nothing sorting');
    const mat = findMat(state.sorting);
    const qty = state.unsorted[mat.id];
    state.unsorted[mat.id] = 0;
    state.carryKg = Math.max(0, Math.round((state.carryKg - qty * mat.weight) * 10) / 10);
    state.sorting = null;
    state.sortTimer = 0;
    if (mat.bin === binId) {
      state.sorted[mat.id] += qty;
      state.unitsSorted += qty;
      state.sortStreak += 1;
      if (state.sortStreak > state.bestStreak) state.bestStreak = state.sortStreak;
      checkContract(mat.id, qty);
      return { ok: true, correct: true, quantity: qty, bin: binId };
    }
    state.sortMistakes += 1;
    state.sortStreak = 0;
    const lost = Math.floor(qty / 2);
    const kept = qty - lost;
    state.sorted[mat.id] += kept;
    state.unitsSorted += kept;
    return { ok: true, correct: false, quantity: qty, kept, bin: binId };
  }

  function cancelSort() {
    if (!state.sorting) return fail('nothing sorting');
    state.sorting = null;
    state.sortTimer = 0;
    return { ok: true };
  }

  function sellTo(buyerId, materialId, qty) {
    const buyer = findBuyer(buyerId);
    if (!buyer) return fail('unknown buyer');
    if (state.rank < buyer.minRank) return fail('rank too low for this buyer');
    if (!qty || qty <= 0) return fail('bad quantity');
    if (!state.sorted[materialId] || state.sorted[materialId] < qty) return fail('not enough sorted stock');
    const unit = recyclingBuyerPrice(materialId, buyerId, state.dailyDrift, state.rank, state.upgrades);
    const total = Math.round(unit * qty * 10) / 10;
    state.sorted[materialId] -= qty;
    addCash(total);
    state.earned += total;
    state.dailyEarned += total;
    state.unitsSold += qty;
    state.dailySold += qty;
    state.buyerRep[buyerId] += 1;
    gainXp(qty);
    return { ok: true, total, unitPrice: unit, quantity: qty };
  }

  function sellAllTo(buyerId) {
    const buyer = findBuyer(buyerId);
    if (!buyer) return fail('unknown buyer');
    let units = 0;
    const lines = [];
    for (const mat of RECYCLING_MATERIALS) {
      const qty = state.sorted[mat.id];
      if (!qty) continue;
      const unit = recyclingBuyerPrice(mat.id, buyerId, state.dailyDrift, state.rank, state.upgrades);
      const total = Math.round(unit * qty * 10) / 10;
      lines.push({ material: mat.id, quantity: qty, unitPrice: unit, total });
      units += qty;
      state.sorted[mat.id] = 0;
    }
    if (!units) return fail('no sorted stock');
    const total = Math.round(lines.reduce((s, l) => s + l.total, 0) * 10) / 10;
    addCash(total);
    state.earned += total;
    state.dailyEarned += total;
    state.unitsSold += units;
    state.dailySold += units;
    state.buyerRep[buyerId] += 2;
    gainXp(units);
    return { ok: true, total, units, lines };
  }

  function sellTreasure(treasureId) {
    const idx = state.treasures.indexOf(treasureId);
    if (idx < 0) return fail('treasure not held');
    const treasure = RECYCLING_TREASURES.find((t) => t.id === treasureId);
    const value = treasure.value + 20 * state.rank;
    state.treasures.splice(idx, 1);
    addCash(value);
    state.earned += value;
    state.treasuresSold += 1;
    gainXp(15);
    return { ok: true, value };
  }

  function buyUpgrade(upgradeId) {
    const up = RECYCLING_UPGRADES.find((u) => u.id === upgradeId);
    if (!up) return fail('unknown upgrade');
    if (hasUpgrade(upgradeId)) return fail('already owned');
    if (getCash() < up.cost) return fail('not enough cash');
    addCash(-up.cost);
    state.spent += up.cost;
    state.upgrades.push(upgradeId);
    gainXp(20);
    return { ok: true, id: upgradeId };
  }

  function takeContract(contractId) {
    const c = RECYCLING_CONTRACTS.find((x) => x.id === contractId);
    if (!c) return fail('unknown contract');
    if (state.activeContract) return fail('contract already active');
    state.activeContract = { ...c, dayTaken: getDay(), deadlineDay: getDay() + c.days };
    state.contractProgress = 0;
    return { ok: true, contract: state.activeContract };
  }

  function deliverContract() {
    const c = state.activeContract;
    if (!c) return fail('no active contract');
    if (c.material === 'mixed') {
      let have = 0;
      for (const mat of RECYCLING_MATERIALS) have += state.sorted[mat.id];
      if (have < c.qty) return fail('not enough sorted stock');
      let left = c.qty;
      for (const mat of RECYCLING_MATERIALS) {
        if (left <= 0) break;
        const take = Math.min(state.sorted[mat.id], left);
        state.sorted[mat.id] -= take;
        left -= take;
      }
    } else {
      if (!state.sorted[c.material] || state.sorted[c.material] < c.qty) return fail('not enough sorted stock');
      state.sorted[c.material] -= c.qty;
    }
    const pay = c.pay + 40 * state.rank;
    addCash(pay);
    state.earned += pay;
    state.dailyEarned += pay;
    state.contractsDone += 1;
    state.activeContract = null;
    state.contractProgress = 0;
    gainXp(60);
    return { ok: true, pay };
  }

  function abandonContract() {
    if (!state.activeContract) return fail('no active contract');
    state.activeContract = null;
    state.contractProgress = 0;
    state.contractsFailed += 1;
    return { ok: true };
  }

  function haggle(buyerId) {
    const buyer = findBuyer(buyerId);
    if (!buyer) return fail('unknown buyer');
    if (state.rank < 1) return fail('rank too low to haggle');
    const won = rng() < 0.55;
    if (won) {
      state.buyerRep[buyerId] += 1;
      return { ok: true, haggled: true, bonus: 5 + state.rank * 5 };
    }
    return { ok: true, haggled: false, bonus: 0 };
  }

  function scoutRoute(routeId) {
    if (!hasUpgrade('scanner')) return fail('scanner upgrade needed');
    const route = findRoute(routeId);
    if (!route) return fail('unknown route');
    const best = RECYCLING_MATERIALS[Math.floor(rng() * RECYCLING_MATERIALS.length)];
    return { ok: true, route: routeId, bestFind: best.id, hint: `Look for ${best.name} on ${route.name}.` };
  }

  function priceBoard() {
    return RECYCLING_MATERIALS.map((m) => ({
      id: m.id, name: m.name,
      price: recyclingPriceFor(m.id, state.dailyDrift, state.rank, state.upgrades),
      drift: state.dailyDrift[m.id], sorted: state.sorted[m.id], unsorted: state.unsorted[m.id],
    }));
  }

  function routeReport() {
    return RECYCLING_ROUTES.map((r) => ({
      id: r.id, name: r.name, district: r.district, piles: r.piles, mult: r.mult, hazard: r.hazard,
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.25) {
      for (const mat of RECYCLING_MATERIALS) {
        if (mat.bin === 'metal') state.dailyDrift[mat.id] = Math.round((state.dailyDrift[mat.id] + 0.25) * 100) / 100;
      }
      return { id: 'metal-spike', name: 'Metal Spike', desc: 'Metal prices spike.' };
    }
    if (roll < 0.5) {
      for (const mat of RECYCLING_MATERIALS) {
        if (mat.bin === 'plastic') state.dailyDrift[mat.id] = Math.round((state.dailyDrift[mat.id] - 0.2) * 100) / 100;
      }
      return { id: 'plastic-dip', name: 'Plastic Dip', desc: 'Plastic prices dip.' };
    }
    if (roll < 0.7) {
      const mat = RECYCLING_MATERIALS[Math.floor(rng() * RECYCLING_MATERIALS.length)];
      state.unsorted[mat.id] += 5;
      state.carryKg = Math.round((state.carryKg + 5 * mat.weight) * 10) / 10;
      return { id: 'gift', name: 'Street Gift', desc: `Someone left five ${mat.name} by the yard.` };
    }
    return { id: 'none', name: 'Quiet Day', desc: 'Nothing special happens.' };
  }

  function tick(dt) {
    if (state.sorting) {
      state.sortTimer -= dt;
      if (state.sortTimer <= 0) {
        state.sortTimer = 0;
        log(`Sorting of ${state.sorting} is done, pick a bin.`);
      }
    }
    if (state.route) {
      state.routeTimeLeft -= dt;
      if (state.routeTimeLeft <= 0) {
        log('Route timed out.');
        closeRoute(true);
      }
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    for (const mat of RECYCLING_MATERIALS) {
      state.dailyDrift[mat.id] = Math.round(((rng() - 0.5) * 0.2) * 100) / 100;
    }
    state.dailySold = 0;
    state.dailyEarned = 0;
    if (state.activeContract && day > state.activeContract.deadlineDay) {
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractsFailed += 1;
      log('A contract expired.');
    }
    dailyEvent();
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    for (const key of Object.keys(saved)) {
      if (key in state) state[key] = saved[key];
    }
    for (const mat of RECYCLING_MATERIALS) {
      if (state.unsorted[mat.id] === undefined) state.unsorted[mat.id] = 0;
      if (state.sorted[mat.id] === undefined) state.sorted[mat.id] = 0;
      if (state.dailyDrift[mat.id] === undefined) state.dailyDrift[mat.id] = 0;
    }
    for (const b of SCRAPYARD_BUYERS) {
      if (state.buyerRep[b.id] === undefined) state.buyerRep[b.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    const unsortedTotal = RECYCLING_MATERIALS.reduce((s, m) => s + state.unsorted[m.id], 0);
    return {
      rank: RECYCLING_RANKS[state.rank].name, xp: state.xp, routesRun: state.routesRun,
      pilesCleared: state.pilesCleared, unitsSorted: state.unitsSorted,
      bestStreak: state.bestStreak, sortMistakes: state.sortMistakes, unitsSold: state.unitsSold,
      earned: Math.round(state.earned), spent: state.spent, treasuresFound: state.treasuresFound,
      treasuresSold: state.treasuresSold, contractsDone: state.contractsDone,
      contractsFailed: state.contractsFailed, hazardsTaken: state.hazardsTaken,
      carryKg: Math.round(state.carryKg * 10) / 10, carryCap: cap(),
      upgrades: state.upgrades.length,
      activeContract: state.activeContract ? state.activeContract.id : null,
      contractProgress: state.contractProgress, route: state.route,
      pilesLeft: state.routePilesLeft, sorting: state.sorting,
      dailyEarned: Math.round(state.dailyEarned), totalKg: Math.round(state.totalKg * 10) / 10,
      bestRoute: state.bestRoute, unsortedTotal,
    };
  }

  function hudLine() {
    if (state.route) return `Route ${state.route}: ${state.routePilesLeft} piles left, ${Math.round(state.carryKg * 10) / 10}kg carried.`;
    if (state.sorting) return `Sorting ${state.sorting}, pick a bin.`;
    if (state.activeContract) return `Contract ${state.activeContract.name}: ${state.contractProgress}/${state.activeContract.qty}.`;
    const unsortedTotal = RECYCLING_MATERIALS.reduce((s, m) => s + state.unsorted[m.id], 0);
    if (unsortedTotal > 0) return `${unsortedTotal} unsorted units waiting at the yard.`;
    return '';
  }

  function interact() {
    const pos = getPlayerPos() || {};
    const dx = (pos.x || 0) - 120;
    const dz = (pos.z || 0) - (-80);
    if (Math.sqrt(dx * dx + dz * dz) > 25) return false;
    if (state.route) { collectPile(); return true; }
    for (const mat of RECYCLING_MATERIALS) {
      if (state.unsorted[mat.id] > 0) { beginSort(mat.id); return true; }
    }
    return false;
  }

  return {
    state, startRoute, collectPile, beginSort, sortInto, cancelSort, sellTo, sellAllTo,
    sellTreasure, buyUpgrade, takeContract, deliverContract, abandonContract, haggle,
    scoutRoute, priceBoard, routeReport, dailyEvent, tick, tickDay, serialize,
    deserialize, stats, hudLine, interact,
  };
}

export function createRecyclingExtras(system) {
  const st = system.state;
  let helpers = [];
  let claimed = [];
  let wagesPaid = 0;

  function fail(reason) { return { ok: false, reason }; }

  function hireHelper(helperId) {
    const h = RECYCLING_HELPERS.find((x) => x.id === helperId);
    if (!h) return fail('unknown helper');
    if (helpers.includes(helperId)) return fail('already hired');
    helpers.push(helperId);
    return { ok: true, id: helperId, name: h.name, wage: h.wage };
  }

  function fireHelper(helperId) {
    if (!helpers.includes(helperId)) return fail('not hired');
    helpers = helpers.filter((x) => x !== helperId);
    return { ok: true, id: helperId };
  }

  function payWages() {
    let due = 0;
    for (const id of helpers) {
      const h = RECYCLING_HELPERS.find((x) => x.id === id);
      if (h) due += h.wage;
    }
    wagesPaid += due;
    return { ok: true, due, helpers: [...helpers], totalPaid: wagesPaid };
  }

  function helperBonus(skill) {
    return recyclingHelperBonus(helpers, skill);
  }

  function challenges() {
    return RECYCLING_CHALLENGES.map((c) => recyclingChallengeProgress(c, st));
  }

  function claimChallenge(challengeId) {
    const c = RECYCLING_CHALLENGES.find((x) => x.id === challengeId);
    if (!c) return fail('unknown challenge');
    if (claimed.includes(challengeId)) return fail('already claimed');
    const prog = recyclingChallengeProgress(c, st);
    if (!prog.done) return fail('challenge not finished');
    claimed.push(challengeId);
    return { ok: true, id: challengeId, xp: c.xp };
  }

  function achievements() {
    return RECYCLING_ACHIEVEMENTS.map((a) => ({ id: a.id, name: a.name, desc: a.desc, done: !!a.check(st) }));
  }

  function meltDown(materialId, qty) {
    const mat = RECYCLING_MATERIALS.find((m) => m.id === materialId);
    if (!mat || mat.bin !== 'metal') return fail('not a metal material');
    if (!st.upgrades.includes('crusher')) return fail('crusher upgrade needed');
    if (!st.sorted[materialId] || st.sorted[materialId] < qty) return fail('not enough sorted stock');
    st.sorted[materialId] -= qty;
    const ingots = Math.floor(qty / 5);
    const value = ingots * 6 * mat.basePrice;
    return { ok: true, ingots, value };
  }

  function sellIngots(materialId, count) {
    const mat = RECYCLING_MATERIALS.find((m) => m.id === materialId);
    if (!mat || mat.bin !== 'metal') return fail('not a metal material');
    if (!count || count <= 0) return fail('bad count');
    return count * 6 * mat.basePrice;
  }

  function donateToCoop(materialId, qty) {
    if (!st.sorted[materialId] || st.sorted[materialId] < qty) return fail('not enough sorted stock');
    st.sorted[materialId] -= qty;
    return { ok: true, quantity: qty, reputation: Math.floor(qty / 10) };
  }

  function sortAll() {
    let total = 0;
    for (const mat of RECYCLING_MATERIALS) {
      const qty = st.unsorted[mat.id];
      if (!qty) continue;
      st.unsorted[mat.id] = 0;
      st.sorted[mat.id] += qty;
      st.unitsSorted += qty;
      total += qty;
    }
    st.carryKg = 0;
    st.sortStreak += 1;
    if (st.sortStreak > st.bestStreak) st.bestStreak = st.sortStreak;
    return { ok: true, sorted: total };
  }

  function weighIn() {
    const capacity = recyclingCarryCap(st.upgrades);
    return { carryKg: Math.round(st.carryKg * 10) / 10, capacity, free: Math.round((capacity - st.carryKg) * 10) / 10 };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges, claimChallenge,
    achievements, meltDown, sellIngots, donateToCoop, sortAll, weighIn,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return wagesPaid; },
  };
}

export function createRecyclingMarket(system) {
  const st = system.state;
  let currentEvent = 'quiet-market';
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkSold = 0;

  function fail(reason) { return { ok: false, reason }; }

  function setEvent(eventId) {
    if (!RECYCLING_MARKET_EVENTS.find((e) => e.id === eventId)) return fail('unknown event');
    currentEvent = eventId;
    return { ok: true, event: eventId };
  }

  function setSeason(seasonId) {
    if (!RECYCLING_SEASONS.find((s) => s.id === seasonId)) return fail('unknown season');
    currentSeason = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(materialId, basePrice) {
    return Math.round(basePrice * recyclingEventMult(currentEvent, materialId) * recyclingSeasonMult(currentSeason) * 10) / 10;
  }

  function bulkDeal(materialId, qty) {
    if (!st.sorted[materialId] || st.sorted[materialId] < qty) return fail('not enough sorted stock');
    if (qty < 20) return fail('bulk deals need at least twenty units');
    const mat = RECYCLING_MATERIALS.find((m) => m.id === materialId);
    const unit = eventPrice(materialId, mat.basePrice);
    const total = Math.round(unit * qty * 1.1 * 10) / 10;
    st.sorted[materialId] -= qty;
    st.unitsSold += qty;
    st.earned += total;
    st.dailyEarned += total;
    bulkSold += 1;
    dealsClaimed += 1;
    return { ok: true, total, units: qty, note: 'Includes a ten percent bulk bonus.' };
  }

  function dailyDeals() {
    const out = [];
    for (const mat of RECYCLING_MATERIALS) {
      const mult = recyclingEventMult(currentEvent, mat.id);
      if (mult !== 1) out.push({ material: mat.id, multiplier: mult });
    }
    return out;
  }

  function marketSummary() {
    return { event: currentEvent, season: currentSeason, dealsClaimed, bulkSold, deals: dailyDeals() };
  }

  return {
    setEvent, setSeason, eventPrice, bulkDeal, dailyDeals, marketSummary,
    get event() { return currentEvent; },
    get season() { return currentSeason; },
  };
}
