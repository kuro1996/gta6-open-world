export const FERRY_ROUTES = [
  { id: 'north-south', name: 'North to South', price: 25, difficulty: 1, steps: 5, duration: 120, risk: 0.1, from: 'North Harbour', to: 'South Harbour', distance: 4, desc: 'The short hop across the bay.' },
  { id: 'east-west', name: 'East to West', price: 30, difficulty: 1, steps: 6, duration: 130, risk: 0.1, from: 'East Pier', to: 'West Pier', distance: 5, desc: 'A calm crossing between piers.' },
  { id: 'harbour-island', name: 'Harbour to Island', price: 40, difficulty: 2, steps: 7, duration: 150, risk: 0.2, from: 'Main Harbour', to: 'Palm Island', distance: 8, desc: 'Out to the palm-covered island.' },
  { id: 'island-reef', name: 'Island to Reef', price: 45, difficulty: 2, steps: 8, duration: 160, risk: 0.2, from: 'Palm Island', to: 'Reef Point', distance: 9, desc: 'Past the reef to the far point.' },
  { id: 'coast-run', name: 'Coast Run', price: 55, difficulty: 2, steps: 8, duration: 170, risk: 0.2, from: 'South Harbour', to: 'Cliff Town', distance: 11, desc: 'Hugging the coast past the cliffs.' },
  { id: 'bay-crossing', name: 'Bay Crossing', price: 50, difficulty: 3, steps: 9, duration: 190, risk: 0.3, from: 'North Harbour', to: 'Palm Island', distance: 12, desc: 'Straight across the open bay.' },
  { id: 'fishing-loop', name: 'Fishing Loop', price: 60, difficulty: 3, steps: 9, duration: 200, risk: 0.3, from: 'East Pier', to: 'Fishing Village', distance: 13, desc: 'A loop past the fishing boats.' },
  { id: 'lighthouse-run', name: 'Lighthouse Run', price: 65, difficulty: 3, steps: 10, duration: 210, risk: 0.4, from: 'Main Harbour', to: 'Lighthouse Rock', distance: 15, desc: 'Out to the lighthouse on the rock.' },
  { id: 'storm-channel', name: 'Storm Channel', price: 75, difficulty: 4, steps: 10, duration: 230, risk: 0.5, from: 'Cliff Town', to: 'Storm Bay', distance: 18, desc: 'A rough channel between headlands.' },
  { id: 'deep-crossing', name: 'Deep Crossing', price: 80, difficulty: 4, steps: 11, duration: 250, risk: 0.5, from: 'South Harbour', to: 'Far Island', distance: 20, desc: 'The long crossing to the far island.' },
  { id: 'night-ferry', name: 'Night Ferry', price: 70, difficulty: 4, steps: 10, duration: 220, risk: 0.4, from: 'West Pier', to: 'North Harbour', distance: 16, desc: 'Lanterns light the night crossing.' },
  { id: 'grand-tour', name: 'Grand Tour', price: 95, difficulty: 5, steps: 12, duration: 280, risk: 0.5, from: 'Main Harbour', to: 'Far Island', distance: 24, desc: 'Every harbour in one long tour.' },
];

export const FERRY_CARGO = [
  { id: 'fish-crate', name: 'Fish Crate', value: 7, rarity: 0.5, weight: 2.0, fragility: 0.2, desc: 'A crate of fresh-caught fish.' },
  { id: 'fruit-box', name: 'Fruit Box', value: 10, rarity: 0.45, weight: 1.5, fragility: 0.3, desc: 'A box of island fruit.' },
  { id: 'spice-sack', name: 'Spice Sack', value: 16, rarity: 0.35, weight: 1.0, fragility: 0.1, desc: 'A sack of fragrant spices.' },
  { id: 'wine-case', name: 'Wine Case', value: 25, rarity: 0.28, weight: 3.0, fragility: 0.6, desc: 'A case of island wine.' },
  { id: 'cloth-roll', name: 'Cloth Roll', value: 32, rarity: 0.2, weight: 1.2, fragility: 0.2, desc: 'A roll of woven island cloth.' },
  { id: 'toolbox', name: 'Toolbox', value: 48, rarity: 0.14, weight: 4.0, fragility: 0.1, desc: 'Tools for the far island.' },
  { id: 'glass-crate', name: 'Glass Crate', value: 70, rarity: 0.09, weight: 2.5, fragility: 0.9, desc: 'Fragile glassware, handle gently.' },
  { id: 'silk-bundle', name: 'Silk Bundle', value: 110, rarity: 0.06, weight: 0.8, fragility: 0.5, desc: 'Fine silk from the mainland.' },
  { id: 'jewel-box', name: 'Jewel Box', value: 190, rarity: 0.04, weight: 0.5, fragility: 0.7, desc: 'A locked box of island jewels.' },
  { id: 'antique-chest', name: 'Antique Chest', value: 380, rarity: 0.02, weight: 5.0, fragility: 0.8, desc: 'An antique chest bound for a collector.' },
];

export const FERRY_UPGRADES = [
  { id: 'engine', name: 'Pro Engine', cost: 420, desc: 'A stronger engine holds more fuel.', effect: 'fuel max +50' },
  { id: 'find-plus', name: 'Cargo Spotter', cost: 260, desc: 'Spots rare cargo more often.', effect: 'rare cargo boost 1.25' },
  { id: 'price-plus', name: 'Trade License', cost: 310, desc: 'Sells cargo for more cash.', effect: 'sell price +20%' },
  { id: 'carry-plus', name: 'Hold Extension', cost: 220, desc: 'Carry more cargo per route.', effect: 'carry cap +10' },
  { id: 'hull-steel', name: 'Steel Hull', cost: 360, desc: 'A hull that shrugs off rough seas.', effect: 'hazard down' },
  { id: 'radar', name: 'Radar', cost: 300, desc: 'Spots cargo and weather ahead.', effect: 'cargo chance up' },
  { id: 'crane', name: 'Deck Crane', cost: 340, desc: 'Loads heavy crates with ease.', effect: 'load speed up' },
  { id: 'cabin-lux', name: 'Luxury Cabin', cost: 280, desc: 'Passengers pay more to ride.', effect: 'route value up' },
];

export const FERRY_RANKS = [
  { level: 0, name: 'Deckhand', xp: 0, perk: 'Bay hops unlocked' },
  { level: 1, name: 'First Mate', xp: 120, perk: 'Island routes open up' },
  { level: 2, name: 'Captain', xp: 300, perk: 'Long crossings pay better' },
  { level: 3, name: 'Commodore', xp: 620, perk: 'Rare cargo appears more often' },
  { level: 4, name: 'Fleet Admiral', xp: 1100, perk: 'The grand tour holds no fear' },
];

export const FERRY_EVENTS = [
  { id: 'calm-sea', name: 'Calm Sea', desc: 'Glass-flat water all day.' },
  { id: 'market-day', name: 'Market Day', desc: 'Traders crowd the piers.' },
  { id: 'fog-bank', name: 'Fog Bank', desc: 'Fog rolls over the bay.' },
  { id: 'dolphin-escort', name: 'Dolphin Escort', desc: 'Dolphins ride the bow wave.' },
  { id: 'rough-swell', name: 'Rough Swell', desc: 'Big swells rock the boats.' },
  { id: 'harbour-fest', name: 'Harbour Fest', desc: 'Music and stalls at the harbour.' },
  { id: 'trade-rush', name: 'Trade Rush', desc: 'Cargo prices spike at the docks.' },
  { id: 'low-tide', name: 'Low Tide', desc: 'Boats wait for the tide to turn.' },
  { id: 'sunny-sail', name: 'Sunny Sail', desc: 'Warm sun over the water.' },
  { id: 'whale-pass', name: 'Whale Pass', desc: 'A whale crosses the bay.' },
];

export const FERRY_CONTRACTS = [
  { id: 'fish-order', name: 'Fish Order', material: 'fish-crate', qty: 6, pay: 130, days: 3, rep: 10, desc: 'A market wants six fish crates.' },
  { id: 'spice-order', name: 'Spice Order', material: 'spice-sack', qty: 5, pay: 220, days: 3, rep: 15, desc: 'A cook wants five spice sacks.' },
  { id: 'wine-order', name: 'Wine Order', material: 'wine-case', qty: 3, pay: 300, days: 4, rep: 20, desc: 'A tavern wants three wine cases.' },
  { id: 'silk-order', name: 'Silk Order', material: 'silk-bundle', qty: 2, pay: 480, days: 5, rep: 30, desc: 'A tailor wants two silk bundles.' },
  { id: 'glass-order', name: 'Glass Order', material: 'glass-crate', qty: 2, pay: 380, days: 4, rep: 25, desc: 'A shop wants two glass crates.' },
  { id: 'chest-order', name: 'Chest Order', material: 'antique-chest', qty: 1, pay: 700, days: 5, rep: 35, desc: 'A collector wants one antique chest.' },
];

export const FERRY_CHALLENGES = [
  { id: 'first-route', name: 'First Route', target: 'sessions', goal: 1, xp: 20, desc: 'Finish one ferry route.' },
  { id: 'five-routes', name: 'Five Routes', target: 'sessions', goal: 5, xp: 60, desc: 'Finish five ferry routes.' },
  { id: 'cargo-ten', name: 'Cargo Ten', target: 'findsFound', goal: 10, xp: 40, desc: 'Load ten cargo items.' },
  { id: 'cargo-fifty', name: 'Cargo Fifty', target: 'findsFound', goal: 50, xp: 120, desc: 'Load fifty cargo items.' },
  { id: 'earn-five-hundred', name: 'Earn Five Hundred', target: 'earned', goal: 500, xp: 100, desc: 'Earn 500 cash in total.' },
  { id: 'sell-twenty', name: 'Sell Twenty', target: 'findsSold', goal: 20, xp: 80, desc: 'Sell twenty cargo items.' },
  { id: 'contract-three', name: 'Contract Three', target: 'contractsDone', goal: 3, xp: 90, desc: 'Deliver three contracts.' },
  { id: 'steps-hundred', name: 'Hundred Steps', target: 'stepsDone', goal: 100, xp: 110, desc: 'Take a hundred route steps.' },
];

export const FERRY_ACHIEVEMENTS = [
  { id: 'cast-off', name: 'Cast Off', check: (s) => s.sessions >= 1, desc: 'Finish your first route.' },
  { id: 'sea-regular', name: 'Sea Regular', check: (s) => s.sessions >= 10, desc: 'Finish ten routes.' },
  { id: 'loader', name: 'Loader', check: (s) => s.findsFound >= 25, desc: 'Load twenty-five cargo items.' },
  { id: 'cargo-king', name: 'Cargo King', check: (s) => s.findsFound >= 100, desc: 'Load a hundred cargo items.' },
  { id: 'rich-captain', name: 'Rich Captain', check: (s) => s.earned >= 1000, desc: 'Earn a thousand cash.' },
  { id: 'deal-maker', name: 'Deal Maker', check: (s) => s.contractsDone >= 5, desc: 'Deliver five contracts.' },
  { id: 'streak-five', name: 'Streak Five', check: (s) => s.bestStreak >= 5, desc: 'Reach a streak of five.' },
  { id: 'sea-master', name: 'Sea Master', check: (s) => s.rank >= 4, desc: 'Reach the top rank.' },
];

export const FERRY_TIPS = [
  { id: 'tip-fuel', name: 'Watch Fuel', text: 'Dock before your fuel runs out.' },
  { id: 'tip-rare', name: 'Rare Cargo', text: 'Long routes hide the rarest cargo.' },
  { id: 'tip-rank', name: 'Rank Up', text: 'Higher rank boosts rare cargo.' },
  { id: 'tip-sell', name: 'Sell Often', text: 'Sell cargo before the drift turns.' },
  { id: 'tip-contract', name: 'Contracts Pay', text: 'Contracts pay more than raw sales.' },
  { id: 'tip-weather', name: 'Sail On', text: 'Ferries sail in any weather.' },
  { id: 'tip-cap', name: 'Carry Cap', text: 'Extend the hold to carry more.' },
  { id: 'tip-season', name: 'Season Prices', text: 'Summer prices beat winter prices.' },
];

export const FERRY_LEADERBOARD = [
  { name: 'Harbor', value: 920, desc: 'Top captain of the season.' },
  { name: 'Salty', value: 710, desc: 'Old sea dog of the bay.' },
  { name: 'Mara', value: 530, desc: 'Island trader extraordinaire.' },
  { name: 'Kip', value: 320, desc: 'Steady sailor, steady hands.' },
  { name: 'You', value: 0, desc: 'Your score on the board.' },
];

export const FERRY_RECORDS = [
  { id: 'most-routes', name: 'Most Routes', stat: 'sessions', unit: 'routes', desc: 'Most route sessions finished.' },
  { id: 'most-cargo', name: 'Most Cargo', stat: 'findsFound', unit: 'cargo', desc: 'Most cargo loaded.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'cash', desc: 'Most cash earned.' },
  { id: 'best-yield', name: 'Best Yield', stat: 'bestSessionYield', unit: 'cash', desc: 'Best single route yield.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'streak', desc: 'Longest good streak.' },
];

export const FERRY_MARKET = [
  { id: 'fish-market', name: 'Fish Market', finds: ['fish-crate', 'fruit-box'], mult: 1.1, desc: 'Buys fresh fish and fruit.' },
  { id: 'spice-trader', name: 'Spice Trader', finds: ['spice-sack'], mult: 1.25, desc: 'Pays well for spices.' },
  { id: 'wine-merchant', name: 'Wine Merchant', finds: ['wine-case'], mult: 1.4, desc: 'Top price for wine cases.' },
  { id: 'silk-tailor', name: 'Silk Tailor', finds: ['silk-bundle'], mult: 1.5, desc: 'Best buyer for silk.' },
  { id: 'antique-dealer', name: 'Antique Dealer', finds: ['antique-chest', 'jewel-box'], mult: 1.6, desc: 'Pays a premium for antiques.' },
  { id: 'glass-shop', name: 'Glass Shop', finds: ['glass-crate', 'jewel-box'], mult: 1.3, desc: 'Buys glass and jewels.' },
  { id: 'dock-stall', name: 'Dock Stall', finds: ['fish-crate', 'fruit-box', 'cloth-roll'], mult: 1.05, desc: 'Quick sales at the docks.' },
  { id: 'rare-buyer', name: 'Rare Buyer', finds: ['antique-chest', 'jewel-box', 'silk-bundle'], mult: 1.45, desc: 'Buys only the rarest cargo.' },
];

export const FERRY_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.0, desc: 'Mild seas, steady prices.' },
  { id: 'summer', name: 'Summer', mult: 1.2, desc: 'Peak season, best prices.' },
  { id: 'autumn', name: 'Autumn', mult: 0.9, desc: 'Cooling seas, softer prices.' },
  { id: 'winter', name: 'Winter', mult: 0.8, desc: 'Rough seas, lowest prices.' },
];

export const FERRY_SEASONAL = [
  { season: 'summer', find: 'jewel-box', mult: 1.3 },
  { season: 'summer', find: 'fish-crate', mult: 1.2 },
  { season: 'spring', find: 'spice-sack', mult: 1.2 },
  { season: 'spring', find: 'fruit-box', mult: 1.15 },
  { season: 'autumn', find: 'antique-chest', mult: 1.25 },
  { season: 'autumn', find: 'wine-case', mult: 1.1 },
  { season: 'winter', find: 'silk-bundle', mult: 1.4 },
  { season: 'winter', find: 'glass-crate', mult: 1.2 },
];

export const FERRY_QUICK_START = [
  'Sail the North to South route.',
  'Load cargo until fuel runs low.',
  'Sell cargo at the Fish Market.',
  'Buy the Hold Extension early.',
  'Take a fish order contract.',
  'Save up for the Pro Engine.',
];

export const FERRY_HELPERS = [
  { id: 'deckhand', name: 'Deckhand', wage: 20, skill: 'sailing', bonus: 0.1, desc: 'A steady hand on deck.' },
  { id: 'loader', name: 'Loader', wage: 25, skill: 'loading', bonus: 0.15, desc: 'Loads crates fast and safe.' },
  { id: 'navigator', name: 'Navigator', wage: 35, skill: 'navigation', bonus: 0.2, desc: 'Knows every channel by heart.' },
  { id: 'steward', name: 'Steward', wage: 30, skill: 'hospitality', bonus: 0.15, desc: 'Keeps passengers happy.' },
];

export const FERRY_META = { system: 'ferry', version: '7c-B2', author: 'builder-2', dataCount: 12, findCount: 10, upgradeCount: 8, rankCount: 5 };

const findRoute = (id) => FERRY_ROUTES.find((r) => r.id === id) || null;
const findCargo = (id) => FERRY_CARGO.find((x) => x.id === id) || null;
const toList = (v) => (Array.isArray(v) ? v : (v && Array.isArray(v.upgrades) ? v.upgrades : []));
const toRank = (v) => (typeof v === 'number' ? v : (v && typeof v.rank === 'number' ? v.rank : 0));

export function ferryRankFor(xp) {
  return FERRY_RANKS.reduce((lvl, r) => (xp >= r.xp ? r.level : lvl), 0);
}

export function ferryFuelMax(upgrades) {
  return toList(upgrades).includes('engine') ? 150 : 100;
}

export function ferryPriceFor(cargoId, drift, rank, upgrades) {
  const item = findCargo(cargoId);
  if (!item) return 0;
  const d = typeof drift === 'number' ? drift : 0;
  const owned = Array.isArray(upgrades) ? upgrades : toList(rank);
  const raw = item.value * (1 + d) * (1 + toRank(rank) * 0.1) * (owned.includes('price-plus') ? 1.2 : 1);
  return Math.round(Math.max(1, raw) * 10) / 10;
}

export function ferryCarryCap(rank, upgrades) {
  const owned = Array.isArray(upgrades) ? upgrades : toList(rank);
  return 40 + toRank(rank) * 2 + (owned.includes('carry-plus') ? 10 : 0);
}

export function ferryScore(sessions, yld, hazards) {
  return Math.max(0, sessions * 10 + Math.round(yld) - hazards * 5);
}

export function ferryGrade(score) {
  if (score >= 400) return 'S';
  if (score >= 250) return 'A';
  if (score >= 140) return 'B';
  if (score >= 60) return 'C';
  return 'D';
}

export function ferryWeeklyGoal(state) {
  const s = state || {};
  const mk = (have, goal) => ({ have, goal, done: have >= goal });
  const sessions = mk(s.sessions || 0, 5);
  const sold = mk(s.findsSold || 0, 40);
  const earned = mk(s.earned || 0, 600);
  return { sessions, sold, earned, allDone: sessions.done && sold.done && earned.done };
}

export function ferryEfficiency(state) {
  const s = state || {};
  if (!s.sessions) return 100;
  return Math.round((Math.max(0, s.sessions - (s.contractsFailed || 0)) / s.sessions) * 100);
}

export function ferryProfitPerRoute(state) {
  const s = state || {};
  return s.sessions ? Math.round(((s.earned || 0) / s.sessions) * 10) / 10 : 0;
}

export function ferryInventoryValue(state) {
  const s = state || {};
  const total = Object.keys(s.inventory || {}).reduce((sum, id) => sum + (s.inventory[id] || 0) * ferryPriceFor(id, s.dayDrift || 0, s.rank || 0, s.upgrades || []), 0);
  return Math.round(total * 10) / 10;
}

export function ferrySummary(state) {
  const s = state || {};
  const rn = (FERRY_RANKS[s.rank || 0] || {}).name || 'Deckhand';
  return `Ferry: ${rn} with ${s.sessions || 0} routes, ${s.findsFound || 0} cargo and ${s.earned || 0} cash earned.`;
}

export function ferryNextGoal(state) {
  const s = state || {};
  if (!(s.sessions || 0)) return 'Finish your first route.';
  if ((s.sessions || 0) < 5) return 'Finish 5 routes.';
  if ((s.earned || 0) < 500) return 'Earn 500 cash in total.';
  if ((s.rank || 0) < 4) return `Reach rank ${FERRY_RANKS[(s.rank || 0) + 1].name}.`;
  return 'Become a legend of Ferry.';
}

export function ferryRecordFor(id, state) {
  const rec = FERRY_RECORDS.find((r) => r.id === id);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, stat: rec.stat, unit: rec.unit, desc: rec.desc, value: (state && state[rec.stat]) || 0 };
}

export function ferryAllRecords(state) {
  return FERRY_RECORDS.map((r) => ferryRecordFor(r.id, state));
}

export function ferryLeaderboardWith(playerScore) {
  const board = FERRY_LEADERBOARD.map((e) => ({ name: e.name, value: e.name === 'You' ? playerScore : e.value, desc: e.desc }));
  board.sort((a, b) => b.value - a.value);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, value: e.value, desc: e.desc }));
}

export function ferryEventFor(day) {
  return FERRY_MARKET[((day || 0) % FERRY_MARKET.length + FERRY_MARKET.length) % FERRY_MARKET.length];
}

export function ferryEventMult(eventId, cargoId) {
  const ev = FERRY_MARKET.find((m) => m.id === eventId);
  return ev && ev.finds.includes(cargoId) ? ev.mult : 1;
}

export function ferrySeasonMult(seasonId) {
  const s = FERRY_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function ferrySeasonalPriceMult(seasonId, cargoId) {
  const row = FERRY_SEASONAL.find((x) => x.season === seasonId && x.find === cargoId);
  return row ? row.mult : 1;
}

export function ferryBestBuyer() {
  return FERRY_MARKET.reduce((b, m) => (m.mult > b.mult ? m : b), FERRY_MARKET[0]);
}

export function ferryBestSeason() {
  return FERRY_SEASONS.reduce((b, s) => (s.mult > b.mult ? s : b), FERRY_SEASONS[0]);
}

export function ferryTipFor(day) {
  return FERRY_TIPS[((day || 0) % FERRY_TIPS.length + FERRY_TIPS.length) % FERRY_TIPS.length];
}

export function ferryQuickStart() {
  return FERRY_QUICK_START.slice();
}

export function ferryChallengeProgress(challenge, state) {
  const have = (state && state[challenge.target]) || 0;
  return { id: challenge.id, name: challenge.name, have, goal: challenge.goal, done: have >= challenge.goal, xp: challenge.xp };
}

export function ferryProgressPercent(state) {
  const s = state || {};
  if (!s.sessions) return 0;
  return Math.round((Math.max(0, s.sessions - (s.contractsFailed || 0)) / s.sessions) * 100);
}

export function ferryTotalValue(state) {
  const s = state || {};
  return Math.round((ferryInventoryValue(s) + (s.earned || 0)) * 10) / 10;
}

export function ferryHelperBonus(helperIds, skill) {
  return (helperIds || []).reduce((sum, id) => {
    const h = FERRY_HELPERS.find((x) => x.id === id);
    return sum + (h && h.skill === skill ? h.bonus : 0);
  }, 0);
}

export function ferryCargoByRarity(maxRarity) {
  return FERRY_CARGO.filter((x) => x.rarity <= maxRarity).map((x) => x.id);
}

export function ferryRouteByDistance(distance) {
  let pick = FERRY_ROUTES[FERRY_ROUTES.length - 1];
  for (const r of FERRY_ROUTES) {
    if (r.distance >= distance) { pick = r; break; }
  }
  return pick;
}

function ferryState() {
  return Object.assign({}, {
    xp: 0, rank: 0, sessions: 0, actions: 0, stepsDone: 0, earned: 0, spent: 0,
    findsFound: 0, findsSold: 0, contractsDone: 0, contractsFailed: 0, hazardsTaken: 0,
    heatGained: 0, inventory: {}, upgrades: [], activeContract: null, contractProgress: 0,
    contractDeadline: null, session: null, sessionStepsLeft: 0, sessionTimeLeft: 0,
    resource: 0, dayDrift: 0, lastDay: 1, bestSession: null, bestSessionYield: 0,
    dailyEarned: 0, dailySessions: 0, totalYield: 0, bestStreak: 0, streak: 0,
    specialsUsed: 0, weatherStops: 0, sessionYield: 0, sessionFinds: [], season: 'summer',
    event: null, wagesPaid: 0, challengesClaimed: [],
  });
}

export function createFerrySystem(ctx) {
  const c = ctx || {};
  const rng = c.rng || Math.random;
  const getDay = c.getDay || (() => 1);
  const getHour = c.getHour || (() => 12);
  const getCash = c.getCash || (() => 0);
  const addCash = c.addCash || (() => {});
  const addHeat = c.addHeat || (() => {});
  const log = c.log || (() => {});
  const getPlayerPos = c.getPlayerPos || (() => ({ x: 0, z: 0 }));
  const getWeather = c.getWeather || (() => ({ condition: 'clear' }));
  const state = ferryState();

  const refresh = () => {
    const lvl = ferryRankFor(state.xp);
    if (lvl > state.rank) log(`Rank up: ${FERRY_RANKS[lvl].name}`);
    state.rank = lvl;
  };

  const dock = () => {
    const yld = state.sessionYield;
    const rid = state.session;
    state.totalYield += yld;
    if (yld > state.bestSessionYield) { state.bestSessionYield = yld; state.bestSession = rid; }
    if (yld > 0) {
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
    } else state.streak = 0;
    state.session = null;
    state.sessionStepsLeft = 0;
    state.sessionTimeLeft = 0;
  };

  const daily = () => {
    const roll = rng();
    const bucket = roll < 0.16 ? 0 : roll < 0.28 ? 1 : roll < 0.38 ? 2 : roll < 0.46 ? 3 : 4;
    if (bucket === 0) {
      state.dayDrift = Math.round((state.dayDrift + 0.3) * 100) / 100;
      state.event = 'demand-spike';
      return { ok: true, event: 'demand-spike', name: 'Demand Spike', kind: 'demand' };
    }
    if (bucket === 1) {
      state.dayDrift = Math.round((state.dayDrift - 0.15) * 100) / 100;
      state.event = 'price-dip';
      return { ok: true, event: 'price-dip', name: 'Price Dip', kind: 'dip' };
    }
    if (bucket === 2) {
      const pick = FERRY_CARGO[Math.floor(rng() * FERRY_CARGO.length)];
      state.inventory[pick.id] = (state.inventory[pick.id] || 0) + 3;
      state.findsFound += 3;
      state.event = 'gift';
      return { ok: true, event: 'gift', name: 'Gift', kind: 'gift', find: pick.id, qty: 3 };
    }
    if (bucket === 3) {
      const ev = FERRY_EVENTS[Math.floor(rng() * FERRY_EVENTS.length)];
      state.event = ev.id;
      return { ok: true, event: ev.id, name: ev.name, kind: 'named' };
    }
    state.event = null;
    return { ok: true, event: null, name: 'none', kind: 'none' };
  };

  const sys = {
    name: 'Ferry',
    state,
    sail(routeId) {
      const route = findRoute(routeId);
      if (!route) return { ok: false, reason: 'no-such-site' };
      if (state.session) return { ok: false, reason: 'already-in-session' };
      const hour = getHour();
      if (hour < 5 || hour >= 23) return { ok: false, reason: 'closed', hour };
      if (getCash() < route.price) return { ok: false, reason: 'not-enough-cash', cost: route.price };
      addCash(-route.price);
      state.spent += route.price;
      state.session = route.id;
      state.sessionStepsLeft = route.steps;
      state.sessionTimeLeft = route.duration;
      state.resource = ferryFuelMax(state.upgrades);
      state.sessionYield = 0;
      state.sessionFinds = [];
      state.sessions += 1;
      state.dailySessions += 1;
      log(`Sailing ${route.name}`);
      return { ok: true, id: route.id, name: route.name, price: route.price, steps: route.steps, duration: route.duration };
    },
    loadCargo() {
      if (!state.session) return { ok: false, reason: 'no-session' };
      const route = findRoute(state.session);
      state.resource -= 7;
      state.sessionStepsLeft -= 1;
      state.stepsDone += 1;
      state.actions += 1;
      const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
      const cap = ferryCarryCap(state.rank, state.upgrades);
      let qty = 1 + Math.floor(rng() * 4);
      qty = Math.min(qty, Math.max(0, cap - held));
      let item = null;
      let bonus = false;
      let hazard = false;
      if (qty > 0) {
        const weights = FERRY_CARGO.map((x) => {
          let w = 1 / x.rarity;
          if (x.rarity < 0.08 && state.rank >= 3) w *= 1.6;
          if (x.rarity < 0.08 && state.upgrades.includes('find-plus')) w *= 1.25;
          return w;
        });
        const totalW = weights.reduce((a, b) => a + b, 0);
        let roll = rng() * totalW;
        let idx = weights.length - 1;
        for (let i = 0; i < weights.length; i++) {
          roll -= weights[i];
          if (roll <= 0) { idx = i; break; }
        }
        item = FERRY_CARGO[idx];
        if (rng() < 0.04) { qty += 1; bonus = true; }
        state.inventory[item.id] = (state.inventory[item.id] || 0) + qty;
        state.findsFound += qty;
        state.sessionFinds.push(item.id);
        state.sessionYield += qty * item.value;
      }
      if (route && rng() < route.risk * 0.04) {
        hazard = true;
        state.hazardsTaken += 1;
        addCash(-25);
        if (rng() < 0.3) {
          state.heatGained += 1;
          addHeat(1);
        }
      }
      let ended = false;
      if (state.resource <= 0 || state.sessionStepsLeft <= 0) {
        state.resource = Math.max(0, state.resource);
        dock();
        ended = true;
      }
      return { ok: true, find: item ? { id: item.id, name: item.name, qty } : null, qty, bonus, hazard, stepsLeft: state.sessionStepsLeft, resource: state.resource, ended };
    },
    dockEarly() {
      if (!state.session) return { ok: false, reason: 'no-session' };
      const id = state.session;
      dock();
      log(`Docked early from ${id}`);
      return { ok: true, id, yield: state.totalYield };
    },
    announceTour() {
      const route = state.session ? findRoute(state.session) : null;
      return { ok: true, site: route ? route.id : null, siteName: route ? route.name : null, weather: (getWeather() || {}).condition || 'clear', hour: getHour(), resource: state.resource, resourceMax: ferryFuelMax(state.upgrades), stepsLeft: state.sessionStepsLeft };
    },
    sellFind(cargoId) {
      const item = findCargo(cargoId);
      if (!item) return { ok: false, reason: 'no-such-find' };
      const held = state.inventory[cargoId] || 0;
      if (held <= 0) return { ok: false, reason: 'not-held', id: cargoId };
      const price = ferryPriceFor(cargoId, state.dayDrift, state.rank, state.upgrades);
      state.inventory[cargoId] = held - 1;
      if (state.inventory[cargoId] <= 0) delete state.inventory[cargoId];
      state.findsSold += 1;
      state.earned += price;
      state.dailyEarned += price;
      addCash(price);
      return { ok: true, id: cargoId, name: item.name, qty: 1, price, total: price };
    },
    sellAllFinds() {
      const ids = Object.keys(state.inventory);
      if (ids.length === 0) return { ok: false, reason: 'nothing-held' };
      let total = 0;
      let count = 0;
      for (const id of ids) {
        total += ferryPriceFor(id, state.dayDrift, state.rank, state.upgrades) * state.inventory[id];
        count += state.inventory[id];
      }
      total = Math.round(total * 10) / 10;
      state.inventory = {};
      state.findsSold += count;
      state.earned += total;
      state.dailyEarned += total;
      addCash(total);
      return { ok: true, total, sold: count, count };
    },
    buyUpgrade(upId) {
      const up = FERRY_UPGRADES.find((u) => u.id === upId);
      if (!up) return { ok: false, reason: 'no-such-upgrade' };
      if (state.upgrades.includes(upId)) return { ok: false, reason: 'already-owned', id: upId };
      if (getCash() < up.cost) return { ok: false, reason: 'not-enough-cash', cost: up.cost };
      addCash(-up.cost);
      state.spent += up.cost;
      state.upgrades.push(upId);
      log(`Bought upgrade ${up.name}`);
      return { ok: true, id: up.id, name: up.name, cost: up.cost };
    },
    takeContract(contractId) {
      const ct = FERRY_CONTRACTS.find((x) => x.id === contractId);
      if (!ct) return { ok: false, reason: 'no-such-contract' };
      if (state.activeContract) return { ok: false, reason: 'already-active', id: state.activeContract };
      state.activeContract = ct.id;
      state.contractProgress = 0;
      state.contractDeadline = getDay() + ct.days;
      log(`Took contract ${ct.name}`);
      return { ok: true, id: ct.id, name: ct.name, qty: ct.qty, pay: ct.pay };
    },
    deliverContract() {
      if (!state.activeContract) return { ok: false, reason: 'no-active-contract' };
      const ct = FERRY_CONTRACTS.find((x) => x.id === state.activeContract);
      const have = state.inventory[ct.material] || 0;
      if (have < ct.qty) return { ok: false, reason: 'not-enough', have, need: ct.qty, material: ct.material };
      state.inventory[ct.material] = have - ct.qty;
      if (state.inventory[ct.material] <= 0) delete state.inventory[ct.material];
      state.contractsDone += 1;
      state.earned += ct.pay;
      state.dailyEarned += ct.pay;
      addCash(ct.pay);
      state.xp += ct.rep;
      refresh();
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractDeadline = null;
      return { ok: true, id: ct.id, name: ct.name, pay: ct.pay, rep: ct.rep };
    },
    abandonContract() {
      if (!state.activeContract) return { ok: false, reason: 'no-active-contract' };
      const id = state.activeContract;
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractDeadline = null;
      state.contractsFailed += 1;
      return { ok: true, id };
    },
    priceBoard() {
      return FERRY_CARGO.map((x) => ({ id: x.id, name: x.name, price: ferryPriceFor(x.id, state.dayDrift, state.rank, state.upgrades), base: x.value, drift: state.dayDrift, held: state.inventory[x.id] || 0 }));
    },
    siteReport(routeId) {
      const route = findRoute(routeId);
      if (!route) return { ok: false, reason: 'no-such-site' };
      return { ok: true, id: route.id, name: route.name, price: route.price, difficulty: route.difficulty, steps: route.steps, duration: route.duration, risk: route.risk, from: route.from, to: route.to, distance: route.distance, desc: route.desc };
    },
    dailyEvent() {
      return daily();
    },
    tick(dt) {
      if (!state.session) return;
      state.sessionTimeLeft -= dt;
      state.resource -= dt * 0.05;
      if (state.sessionTimeLeft <= 0 || state.resource <= 0) {
        state.resource = Math.max(0, state.resource);
        state.sessionTimeLeft = Math.max(0, state.sessionTimeLeft);
        dock();
      }
    },
    tickDay(day) {
      if (day === state.lastDay) return null;
      state.lastDay = day;
      state.dayDrift = Math.round((state.dayDrift + (rng() * 0.24 - 0.12)) * 100) / 100;
      state.dailyEarned = 0;
      state.dailySessions = 0;
      if (state.activeContract && state.contractDeadline !== null && day >= state.contractDeadline) {
        state.activeContract = null;
        state.contractProgress = 0;
        state.contractDeadline = null;
        state.contractsFailed += 1;
        log('Contract expired.');
      }
      return daily();
    },
    serialize() {
      return JSON.parse(JSON.stringify(state));
    },
    deserialize(saved) {
      if (!saved || typeof saved !== 'object') return;
      Object.keys(saved).forEach((k) => { state[k] = saved[k]; });
      if (!state.inventory || typeof state.inventory !== 'object') state.inventory = {};
      if (!Array.isArray(state.upgrades)) state.upgrades = [];
      if (!Array.isArray(state.sessionFinds)) state.sessionFinds = [];
      if (!Array.isArray(state.challengesClaimed)) state.challengesClaimed = [];
      if (typeof state.wagesPaid !== 'number') state.wagesPaid = 0;
      refresh();
    },
    stats() {
      return { rank: (FERRY_RANKS[state.rank] || {}).name || 'Deckhand', xp: state.xp, sessions: state.sessions, actions: state.actions, stepsDone: state.stepsDone, earned: state.earned, spent: state.spent, findsFound: state.findsFound, findsSold: state.findsSold, contractsDone: state.contractsDone, contractsFailed: state.contractsFailed, hazardsTaken: state.hazardsTaken, heatGained: state.heatGained, upgrades: state.upgrades.length, activeContract: state.activeContract, contractProgress: state.contractProgress, session: state.session, stepsLeft: state.sessionStepsLeft, resource: state.resource, resourceMax: ferryFuelMax(state.upgrades), dailyEarned: state.dailyEarned, totalYield: state.totalYield, bestStreak: state.bestStreak, bestSession: state.bestSession, bestSessionYield: state.bestSessionYield, specialsUsed: state.specialsUsed, weatherStops: state.weatherStops, season: state.season, event: state.event };
    },
    hudLine() {
      if (!state.session) return '';
      return `Ferry: ${state.session} — ${state.sessionStepsLeft} steps left, fuel ${state.resource}`;
    },
    interact() {
      const pos = getPlayerPos() || { x: 0, z: 0 };
      const dx = pos.x - (-150);
      const dz = pos.z - (-350);
      if (Math.sqrt(dx * dx + dz * dz) > 30) return false;
      if (state.session) { sys.loadCargo(); return true; }
      const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
      if (held > 0) { sys.sellAllFinds(); return true; }
      sys.sail(FERRY_ROUTES[0].id);
      return true;
    },
  };
  return sys;
}

export function createFerryExtras(system) {
  const st = system.state;
  let hired = [];
  let claimed = [];
  let wages = 0;

  return {
    hireHelper(id) {
      const h = FERRY_HELPERS.find((x) => x.id === id);
      if (!h) return { ok: false, reason: 'no-such-helper' };
      if (hired.includes(id)) return { ok: false, reason: 'already-hired', id };
      hired.push(id);
      return { ok: true, id: h.id, name: h.name, wage: h.wage };
    },
    fireHelper(id) {
      if (!hired.includes(id)) return { ok: false, reason: 'not-hired', id };
      hired = hired.filter((x) => x !== id);
      return { ok: true, id };
    },
    payWages() {
      const due = hired.reduce((sum, id) => {
        const h = FERRY_HELPERS.find((x) => x.id === id);
        return sum + (h ? h.wage : 0);
      }, 0);
      wages += due;
      st.wagesPaid = (st.wagesPaid || 0) + due;
      return { ok: true, due, helpers: hired.length, totalPaid: due };
    },
    helperBonus(skill) {
      return hired.reduce((sum, id) => {
        const h = FERRY_HELPERS.find((x) => x.id === id);
        return sum + (h && h.skill === skill ? h.bonus : 0);
      }, 0);
    },
    challenges() {
      return FERRY_CHALLENGES.map((ch) => ferryChallengeProgress(ch, st));
    },
    claimChallenge(id) {
      const ch = FERRY_CHALLENGES.find((x) => x.id === id);
      if (!ch) return { ok: false, reason: 'no-such-challenge' };
      if (claimed.includes(id)) return { ok: false, reason: 'already-claimed', id };
      const prog = ferryChallengeProgress(ch, st);
      if (!prog.done) return { ok: false, reason: 'not-done', have: prog.have, goal: prog.goal };
      claimed.push(id);
      st.challengesClaimed.push(id);
      st.xp += ch.xp;
      st.rank = ferryRankFor(st.xp);
      return { ok: true, id: ch.id, xp: ch.xp };
    },
    achievements() {
      return FERRY_ACHIEVEMENTS.map((a) => ({ id: a.id, name: a.name, desc: a.desc, done: !!a.check(st) }));
    },
    donateFinds() {
      const ids = Object.keys(st.inventory);
      const donated = ids.reduce((sum, id) => sum + st.inventory[id], 0);
      st.inventory = {};
      return { ok: true, donated, finds: ids };
    },
    bundleSale() {
      const count = Object.values(st.inventory).reduce((a, b) => a + b, 0);
      if (count < 10) return { ok: false, reason: 'not-enough', have: count, need: 10 };
      const total = Math.round(Object.keys(st.inventory).reduce((sum, id) => sum + ferryPriceFor(id, st.dayDrift, st.rank, st.upgrades) * st.inventory[id], 0) * 1.1 * 10) / 10;
      st.inventory = {};
      st.findsSold += count;
      st.earned += total;
      st.dailyEarned += total;
      return { ok: true, total, count, bonus: 'bulk +10%' };
    },
    checkFuel() {
      const max = ferryFuelMax(st.upgrades);
      return { ok: true, resource: st.resource, max, name: 'fuel', percent: max ? Math.round((st.resource / max) * 100) : 0 };
    },
    refuel() {
      st.resource = ferryFuelMax(st.upgrades);
      return { ok: true, resource: st.resource, max: st.resource };
    },
    weighHold() {
      let count = 0;
      let weight = 0;
      Object.keys(st.inventory).forEach((id) => {
        const item = findCargo(id);
        count += st.inventory[id];
        if (item) weight += st.inventory[id] * item.weight;
      });
      return { ok: true, count, weight: Math.round(weight * 10) / 10, total: count };
    },
    get helpers() { return hired.slice(); },
    get claimed() { return claimed.slice(); },
    get wagesPaid() { return wages; },
  };
}

export function createFerryMarket(system) {
  const st = system.state;
  let currentEvent = null;
  let currentSeason = st.season || 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  const priced = (itemId, basePrice) => {
    const em = currentEvent ? ferryEventMult(currentEvent, itemId) : 1;
    return Math.round(basePrice * em * ferrySeasonMult(currentSeason) * 10) / 10;
  };

  return {
    setEvent(id) {
      const ev = FERRY_MARKET.find((m) => m.id === id);
      if (!ev) return { ok: false, reason: 'no-such-event' };
      currentEvent = id;
      st.event = id;
      return { ok: true, event: id };
    },
    setSeason(id) {
      const s = FERRY_SEASONS.find((x) => x.id === id);
      if (!s) return { ok: false, reason: 'no-such-season' };
      currentSeason = id;
      st.season = id;
      return { ok: true, season: id };
    },
    eventPrice(itemId, basePrice) {
      return priced(itemId, basePrice);
    },
    bulkDeal(cargoId, qty) {
      if (!qty || qty < 20) return { ok: false, reason: 'not-enough', qty: qty || 0, need: 20 };
      const held = st.inventory[cargoId] || 0;
      if (held < qty) return { ok: false, reason: 'not-enough-held', have: held, need: qty };
      const item = findCargo(cargoId);
      if (!item) return { ok: false, reason: 'no-such-find' };
      const unit = priced(cargoId, item.value);
      const total = Math.round(unit * qty * 1.1 * 10) / 10;
      st.inventory[cargoId] = held - qty;
      if (st.inventory[cargoId] <= 0) delete st.inventory[cargoId];
      st.findsSold += qty;
      st.earned += total;
      st.dailyEarned += total;
      bulkTraded += qty;
      dealsClaimed += 1;
      return { ok: true, total, qty, unit, bonus: 'bulk +10%' };
    },
    dailyDeals() {
      return FERRY_MARKET.map((m) => ({ id: m.id, name: m.name, finds: m.finds.slice(), mult: m.mult, desc: m.desc }));
    },
    marketSummary() {
      return { event: currentEvent, season: currentSeason, dealsClaimed, bulkTraded, deals: this.dailyDeals() };
    },
    get event() { return currentEvent; },
    get season() { return currentSeason; },
  };
}
