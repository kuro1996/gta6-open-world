// Ferry — Dara's old harbour ferry between Solara's islands and piers.
// Take a route, load whatever the islanders need, and deliver it
// before the tide turns. Passengers pay the fare, cargo pays the
// profit — fish crates, mail sacks, wine cases, and the one gearbox
// the whole island is waiting for. The sea is honest work: a rough
// swell can eat your cargo before you reach the dock, and a calm
// morning can pay for the whole week. Watch the tide, not the clock.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const FERRY_ROUTES = [
  { id: 'marina-oldtown', name: 'Marina to Old Town', price: 40, difficulty: 1,
    steps: 4, duration: 20, risk: 0, from: 'Marina', to: 'Old Town', distance: 3,
    desc: 'The milk run. Calm water, regulars aboard.' },
  { id: 'oldtown-island', name: 'Old Town to Turtle Island', price: 55, difficulty: 1,
    steps: 5, duration: 25, risk: 0, from: 'Old Town', to: 'Turtle Island', distance: 5,
    desc: 'Tourists and school runs to the island.' },
  { id: 'island-lighthouse', name: 'Turtle Island to the Lighthouse', price: 70, difficulty: 2,
    steps: 5, duration: 30, risk: 1, from: 'Turtle Island', to: 'Lighthouse', distance: 7,
    desc: 'Open water and a keeper who loves mail.' },
  { id: 'lighthouse-docks', name: 'Lighthouse to Crown Docks', price: 85, difficulty: 2,
    steps: 5, duration: 30, risk: 1, from: 'Lighthouse', to: 'Crown Docks', distance: 8,
    desc: 'Supplies for the dock crews.' },
  { id: 'docks-market', name: 'Crown Docks to Night Market', price: 90, difficulty: 2,
    steps: 6, duration: 30, risk: 1, from: 'Crown Docks', to: 'Night Market', distance: 6,
    desc: 'Fish straight from the boats to the stalls.' },
  { id: 'market-beach', name: 'Night Market to Sunny Beach', price: 100, difficulty: 2,
    steps: 6, duration: 35, risk: 1, from: 'Night Market', to: 'Sunny Beach', distance: 9,
    desc: 'Beachgoers, ice cream, and one lost dog.' },
  { id: 'beach-cove', name: 'Sunny Beach to Smuggler’s Cove', price: 120, difficulty: 3,
    steps: 6, duration: 35, risk: 2, from: 'Sunny Beach', to: 'Smuggler’s Cove', distance: 11,
    desc: 'A quiet cove with a loud history.' },
  { id: 'cove-fishing', name: 'Smuggler’s Cove to Fishing Village', price: 130, difficulty: 3,
    steps: 7, duration: 40, risk: 2, from: 'Smuggler’s Cove', to: 'Fishing Village', distance: 10,
    desc: 'Nets, buoys, and the best fish stew in the bay.' },
  { id: 'fishing-marina', name: 'Fishing Village to Marina', price: 140, difficulty: 3,
    steps: 7, duration: 40, risk: 2, from: 'Fishing Village', to: 'Marina', distance: 12,
    desc: 'The long way home, past the reef.' },
  { id: 'marina-airport', name: 'Marina to Seaplane Airport', price: 160, difficulty: 4,
    steps: 7, duration: 45, risk: 2, from: 'Marina', to: 'Seaplane Airport', distance: 14,
    desc: 'Hurried travellers and heavy suitcases.' },
  { id: 'airport-island', name: 'Seaplane Airport to Turtle Island', price: 190, difficulty: 4,
    steps: 8, duration: 50, risk: 3, from: 'Seaplane Airport', to: 'Turtle Island', distance: 16,
    desc: 'Open sea, crosswinds, and a tight schedule.' },
  { id: 'night-harbor', name: 'Night Harbour Loop', price: 220, difficulty: 5,
    steps: 8, duration: 60, risk: 3, from: 'Marina', to: 'Marina', distance: 18,
    desc: 'Every pier in the harbour, by lantern light.' },
];

export const FERRY_CARGO = [
  { id: 'fish-crates', name: 'Fish Crates', value: 18, rarity: 0.26,
    weight: 3.0, fragility: 1, desc: 'Still flopping. Deliver fast.' },
  { id: 'market-veg', name: 'Market Vegetables', value: 14, rarity: 0.24,
    weight: 2.0, fragility: 1, desc: 'Greens picked at dawn.' },
  { id: 'mail-sacks', name: 'Mail Sacks', value: 22, rarity: 0.18,
    weight: 2.5, fragility: 0, desc: 'Letters, parcels, and one postcard from 1998.' },
  { id: 'ice-blocks', name: 'Ice Blocks', value: 26, rarity: 0.14,
    weight: 4.0, fragility: 2, desc: 'Melting fast. Do not dawdle.' },
  { id: 'flower-baskets', name: 'Flower Baskets', value: 32, rarity: 0.12,
    weight: 1.0, fragility: 2, desc: 'For the market stalls, still in bloom.' },
  { id: 'tool-crates', name: 'Tool Crates', value: 45, rarity: 0.09,
    weight: 5.0, fragility: 0, desc: 'Spanners and drills for the docks.' },
  { id: 'souvenir-boxes', name: 'Souvenir Boxes', value: 55, rarity: 0.08,
    weight: 1.5, fragility: 1, desc: 'Tiny lighthouses and shell keyrings.' },
  { id: 'wine-cases', name: 'Wine Cases', value: 80, rarity: 0.06,
    weight: 3.5, fragility: 2, desc: 'Island wine, handle like glass.' },
  { id: 'fuel-drums', name: 'Fuel Drums', value: 110, rarity: 0.04,
    weight: 6.0, fragility: 3, desc: 'For the lighthouse generator. No smoking.' },
  { id: 'spare-parts', name: 'Spare Parts', value: 150, rarity: 0.02,
    weight: 4.5, fragility: 1, desc: 'A gearbox the whole island is waiting for.' },
];

export const FERRY_UPGRADES = [
  { id: 'seats', name: 'Extra Seats', cost: 120,
    desc: 'More passengers, +15 cargo slots.', effect: 'carry-plus' },
  { id: 'engine', name: 'Twin Engine', cost: 400,
    desc: 'Fuel lasts +50 on every route.', effect: 'fuel-plus' },
  { id: 'hull', name: 'Reinforced Hull', cost: 350,
    desc: 'Rough seas hurt less, +25 cargo slots.', effect: 'carry-plus-2' },
  { id: 'radar', name: 'Harbour Radar', cost: 300,
    desc: 'Cargo finds are 25% easier to spot.', effect: 'find-plus' },
  { id: 'cafe', name: 'Deck Cafe', cost: 280,
    desc: 'Coffee and buns: cargo pays +20%.', effect: 'price-plus' },
  { id: 'wifi', name: 'Passenger Wi-Fi', cost: 200,
    desc: 'Passengers ride longer and tip more.', effect: 'tip-plus' },
  { id: 'lifeboats', name: 'New Lifeboats', cost: 450,
    desc: 'Hazards cost half as much.', effect: 'safety' },
  { id: 'autopilot', name: 'Autopilot', cost: 800,
    desc: 'Steady hands on the long crossings.', effect: 'steady' },
];

export const FERRY_RANKS = [
  { level: 0, name: 'Deck Hand', xp: 0,
    perk: 'Short runs pay base rate.' },
  { level: 1, name: 'Ferryman', xp: 120,
    perk: '+10% cargo prices.' },
  { level: 2, name: 'Harbour Pilot', xp: 300,
    perk: 'Long crossings open up.' },
  { level: 3, name: 'Harbour Master', xp: 620,
    perk: '+20% cargo prices, night loop unlocked.' },
  { level: 4, name: 'Fleet Admiral', xp: 1100,
    perk: '+30% cargo prices, rare cargo doubled.' },
];

export const FERRY_EVENTS = [
  { id: 'regatta', name: 'Harbour Regatta',
    desc: 'Sailboats everywhere, the ferry weaves through them.' },
  { id: 'fog-morning', name: 'Fog Morning',
    desc: 'The harbour disappears until ten.' },
  { id: 'fish-run', name: 'Fish Run',
    desc: 'The fleet comes in heavy and the market is hungry.' },
  { id: 'cruise-ship', name: 'Cruise Ship Day',
    desc: 'Three thousand tourists want the island.' },
  { id: 'storm-warning', name: 'Storm Warning',
    desc: 'The harbour master eyes the sky.' },
  { id: 'tide-spring', name: 'Spring Tide',
    desc: 'The tide runs fast and the channels shift.' },
  { id: 'festival-night', name: 'Festival Night',
    desc: 'Lanterns on every pier, crowds all evening.' },
  { id: 'calm-sea', name: 'Calm Sea',
    desc: 'Glass water from dawn to dusk.' },
  { id: 'dolphin-escort', name: 'Dolphin Escort',
    desc: 'Dolphins race the bow wave all morning.' },
  { id: 'harbour-strike', name: 'Harbour Strike',
    desc: 'The big boats stay home; the ferry is the only ride.' },
];

export const FERRY_CONTRACTS = [
  { id: 'fish-15', name: 'Fish Run', material: 'fish-crates', qty: 15,
    pay: 300, days: 1, rep: 1,
    desc: 'The market needs fifteen fish crates by noon.' },
  { id: 'mail-12', name: 'Mail Run', material: 'mail-sacks', qty: 12,
    pay: 320, days: 1, rep: 1,
    desc: 'The island post office is behind schedule.' },
  { id: 'wine-6', name: 'Wine Order', material: 'wine-cases', qty: 6,
    pay: 560, days: 2, rep: 2,
    desc: 'A restaurant needs six cases of island wine.' },
  { id: 'fuel-4', name: 'Fuel Run', material: 'fuel-drums', qty: 4,
    pay: 520, days: 2, rep: 3,
    desc: 'The lighthouse generator is running low.' },
  { id: 'parts-2', name: 'Gearbox Run', material: 'spare-parts', qty: 2,
    pay: 450, days: 3, rep: 3,
    desc: 'The whole island waits on two gearboxes.' },
  { id: 'mixed-40', name: 'Harbour Lot', material: 'mixed', qty: 40,
    pay: 650, days: 2, rep: 2,
    desc: 'Any forty cargo for the harbour auction.' },
];

export const FERRY_CHALLENGES = [
  { id: 'routes-10', name: 'Ten Routes', target: 'sessions', goal: 10, xp: 90,
    desc: 'Finish 10 ferry routes.' },
  { id: 'cargo-100', name: 'Century of Cargo', target: 'findsFound', goal: 100, xp: 110,
    desc: 'Load 100 cargo.' },
  { id: 'earn-1000', name: 'Grand on the Water', target: 'earned', goal: 1000, xp: 130,
    desc: 'Earn $1,000 from the ferry.' },
  { id: 'streak-8', name: 'Clean Eight', target: 'bestStreak', goal: 8, xp: 100,
    desc: 'Eight clean steps in a row.' },
  { id: 'contracts-3', name: 'Reliable Ferryman', target: 'contractsDone', goal: 3, xp: 120,
    desc: 'Complete 3 delivery contracts.' },
  { id: 'actions-200', name: 'Two Hundred Loads', target: 'actions', goal: 200, xp: 140,
    desc: 'Take 200 loading steps.' },
  { id: 'first-cargo', name: 'First Cargo', target: 'findsFound', goal: 1, xp: 60,
    desc: 'Load your first cargo.' },
  { id: 'night-5', name: 'Night Five', target: 'sessions', goal: 5, xp: 80,
    desc: 'Finish 5 routes.' },
];

export const FERRY_ACHIEVEMENTS = [
  { id: 'first-route', name: 'First Route', check: (s) => s.sessions >= 1,
    desc: 'Finish your first ferry route.' },
  { id: 'gearbox-club', name: 'Gearbox Club', check: (s) => (s.inventory['spare-parts'] || 0) + s.findsSold >= 1,
    desc: 'Deliver a spare-parts crate.' },
  { id: 'rank-3', name: 'Harbour Master', check: (s) => s.rank >= 3,
    desc: 'Reach rank Harbour Master.' },
  { id: 'rich-harbour', name: 'Harbour Rich', check: (s) => s.earned >= 3000,
    desc: 'Earn $3,000 from the ferry.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8,
    desc: 'Own every ferry upgrade.' },
  { id: 'no-hazard', name: 'Calm Water', check: (s) => s.sessions >= 10 && s.hazardsTaken === 0,
    desc: 'Ten routes with zero hazards.' },
  { id: 'big-yield', name: 'Big Yield', check: (s) => s.bestSessionYield >= 500,
    desc: 'One route worth $500 or more.' },
  { id: 'loads-50', name: 'Fifty Loads', check: (s) => s.actions >= 50,
    desc: 'Fifty loading steps aboard.' },
];

export const FERRY_TIPS = [
  { id: 'tide-first', name: 'Tide First',
    text: 'The tide decides your schedule, not the clock.' },
  { id: 'fuel-watch', name: 'Fuel Watch',
    text: 'Fuel is your range. Never cross open sea on a low tank.' },
  { id: 'cafe-money', name: 'Cafe Money',
    text: 'Coffee on deck pays for the engine.' },
  { id: 'fish-morning', name: 'Fish Mornings',
    text: 'The fish run is heaviest before noon.' },
  { id: 'fragile-care', name: 'Fragile Care',
    text: 'Wine and ice break easy. Slow down in a swell.' },
  { id: 'contract-first', name: 'Contracts First',
    text: 'Take a delivery contract, then sail its route.' },
  { id: 'radar-early', name: 'Radar Early',
    text: 'Save for the harbour radar — it finds cargo you miss.' },
  { id: 'night-loop', name: 'Night Loop',
    text: 'The night loop pays best but the sea is black.' },
];

export const FERRY_LEADERBOARD = [
  { name: 'Captain Rosa', value: 9100, desc: 'Thirty years on the harbour.' },
  { name: 'Old Man Tide', value: 7200, desc: 'Knows every current by name.' },
  { name: 'Dara', value: 0, desc: 'You. Climbing.' },
  { name: 'Finn', value: 3800, desc: 'Fastest crossing in the harbour.' },
  { name: 'Luz', value: 2100, desc: 'Sings to the passengers, never late.' },
];

export const FERRY_RECORDS = [
  { id: 'most-routes', name: 'Most Routes', stat: 'sessions', unit: 'routes',
    desc: 'Most routes finished.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$',
    desc: 'Most money earned from the ferry.' },
  { id: 'most-cargo', name: 'Most Cargo', stat: 'findsFound', unit: 'cargo',
    desc: 'Most cargo loaded.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'steps',
    desc: 'Longest clean streak.' },
  { id: 'best-route', name: 'Best Route', stat: 'bestSessionYield', unit: '$',
    desc: 'Best single-route yield.' },
];

export const FERRY_MARKET = [
  { id: 'fish-boom', name: 'Fish Boom', finds: ['fish-crates'], mult: 1.4,
    desc: 'The market is hungry for fish.' },
  { id: 'wine-rush', name: 'Wine Rush', finds: ['wine-cases'], mult: 1.5,
    desc: 'A festival wants island wine.' },
  { id: 'fuel-week', name: 'Fuel Week', finds: ['fuel-drums'], mult: 1.45,
    desc: 'Every generator on the islands is thirsty.' },
  { id: 'flower-fair', name: 'Flower Fair', finds: ['flower-baskets'], mult: 1.35,
    desc: 'A wedding season fills the stalls.' },
  { id: 'parts-rush', name: 'Parts Rush', finds: ['spare-parts'], mult: 1.6,
    desc: 'Two boats broke down at once.' },
  { id: 'mail-day', name: 'Mail Day', finds: ['mail-sacks'], mult: 1.3,
    desc: 'The post boat is late; yours is not.' },
  { id: 'veg-glut', name: 'Veg Glut', finds: ['market-veg'], mult: 0.7,
    desc: 'Too many greens, not enough buyers.' },
  { id: 'ice-dip', name: 'Ice Dip', finds: ['ice-blocks'], mult: 0.75,
    desc: 'A cold snap kills the ice trade.' },
];

export const FERRY_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1,
    desc: 'Fresh winds and full bookings.' },
  { id: 'summer', name: 'Summer', mult: 1.2,
    desc: 'Peak season, everyone is crossing.' },
  { id: 'autumn', name: 'Autumn', mult: 1.0,
    desc: 'Steady work, thinner crowds.' },
  { id: 'winter', name: 'Winter', mult: 0.85,
    desc: 'Cold water, quiet days.' },
];

export const FERRY_SEASONAL = [
  { season: 'summer', find: 'fish-crates', mult: 1.3 },
  { season: 'summer', find: 'flower-baskets', mult: 1.25 },
  { season: 'spring', find: 'market-veg', mult: 1.2 },
  { season: 'autumn', find: 'wine-cases', mult: 1.35 },
  { season: 'autumn', find: 'souvenir-boxes', mult: 1.2 },
  { season: 'winter', find: 'fuel-drums', mult: 1.4 },
  { season: 'winter', find: 'spare-parts', mult: 1.25 },
  { season: 'spring', find: 'mail-sacks', mult: 1.15 },
];

export const FERRY_QUICK_START = [
  'Sail the short runs first and learn your fuel burn.',
  'Deliver fish and ice fast — they spoil.',
  'Buy extra seats before the long crossings.',
  'Watch the tide, not the clock.',
  'Take delivery contracts for cargo on your route.',
  'Save for the twin engine — it changes every crossing.',
];

export const FERRY_HELPERS = [
  { id: 'mate', name: 'Finn the Mate', wage: 30, skill: 'collect', bonus: 0.15,
    desc: 'Fast hands on deck: +15% cargo yield.' },
  { id: 'lookout', name: 'Luz the Lookout', wage: 45, skill: 'find', bonus: 0.25,
    desc: 'Spots cargo from the bow: +25% rare cargo.' },
  { id: 'engineer', name: 'Tomas the Engineer', wage: 55, skill: 'carry', bonus: 0.4,
    desc: 'Keeps the engine sweet: +40% cargo slots.' },
  { id: 'purser', name: 'Quiet Ana', wage: 75, skill: 'sell', bonus: 0.12,
    desc: 'Knows the merchants: +12% cargo prices.' },
];

export function ferryRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < FERRY_RANKS.length; i++) {
    if (xp >= FERRY_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function ferryPriceFor(cargoId, dayDrift, rank, upgrades) {
  const f = FERRY_CARGO.find((x) => x.id === cargoId);
  if (!f) return 0;
  let price = f.value;
  price *= 1 + (dayDrift[cargoId] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('cafe')) price *= 1.2;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function ferryCarryCap(upgrades) {
  let cap = 40;
  if (upgrades.includes('seats')) cap += 15;
  if (upgrades.includes('hull')) cap += 25;
  return cap;
}

export function ferryFuelMax(upgrades) {
  let max = 100;
  if (upgrades.includes('engine')) max += 50;
  return max;
}

export function ferryEventMult(eventId, cargoId) {
  const ev = FERRY_MARKET.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.finds.includes(cargoId) ? ev.mult : 1;
}

export function ferrySeasonMult(seasonId) {
  const s = FERRY_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function ferryEventFor(day) {
  return FERRY_MARKET[day % FERRY_MARKET.length];
}

export function ferrySeasonalPriceMult(seasonId, cargoId) {
  const row = FERRY_SEASONAL.find((x) => x.season === seasonId && x.find === cargoId);
  return row ? row.mult : 1;
}

export function ferryBestSeason(cargoId) {
  let best = null;
  let bestMult = 0;
  for (const row of FERRY_SEASONAL) {
    if (row.find === cargoId && row.mult > bestMult) { bestMult = row.mult; best = row.season; }
  }
  return best ? { season: best, mult: bestMult } : null;
}

export function ferryBestBuyer(cargoId, dayDrift, rank, upgrades) {
  const base = ferryPriceFor(cargoId, dayDrift, rank, upgrades);
  return { price: base, note: 'Harbour merchants pay best for fresh, intact cargo.' };
}

export function ferryScore(sessions, yieldTotal, hazards) {
  const base = sessions * 10 + Math.round(yieldTotal);
  const penalty = hazards * 5;
  return Math.max(0, base - penalty);
}

export function ferryGrade(sessions, yieldTotal, hazards) {
  const score = ferryScore(sessions, yieldTotal, hazards);
  if (score >= 400) return 'S';
  if (score >= 250) return 'A';
  if (score >= 140) return 'B';
  if (score >= 60) return 'C';
  return 'D';
}

export function ferryWeeklyGoal(sessions, sold, earned) {
  const goal = { sessions: 5, sold: 40, earned: 600 };
  return {
    sessions: { have: sessions, goal: goal.sessions, done: sessions >= goal.sessions },
    sold: { have: sold, goal: goal.sold, done: sold >= goal.sold },
    earned: { have: Math.round(earned), goal: goal.earned, done: earned >= goal.earned },
    allDone: sessions >= goal.sessions && sold >= goal.sold && earned >= goal.earned,
  };
}

export function ferryTipFor(day) {
  return FERRY_TIPS[day % FERRY_TIPS.length];
}

export function ferryLeaderboardWith(playerValue) {
  const board = FERRY_LEADERBOARD.map((e) => ({
    name: e.name, value: e.name === 'Dara' ? playerValue : e.value, desc: e.desc,
  }));
  board.sort((a, b) => b.value - a.value);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function ferryRecordFor(recordId, state) {
  const r = FERRY_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function ferryAllRecords(state) {
  return FERRY_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function ferryEfficiency(actions, hazards) {
  const total = actions + hazards;
  if (total === 0) return 100;
  return Math.round((actions / total) * 100);
}

export function ferryProfitPerRoute(earned, sessions) {
  if (sessions === 0) return 0;
  return Math.round((earned / sessions) * 10) / 10;
}

export function ferryInventoryValue(inventory) {
  let total = 0;
  for (const [id, qty] of Object.entries(inventory)) {
    const f = FERRY_CARGO.find((x) => x.id === id);
    if (f) total += f.value * qty;
  }
  return Math.round(total * 10) / 10;
}

export function ferryTotalValue(state) {
  return ferryInventoryValue(state.inventory);
}

export function ferryProgressPercent(state) {
  const total = state.actions + state.findsSold;
  if (total === 0) return 0;
  return Math.round((state.actions / total) * 100);
}

export function ferryQuickStart(step) {
  return FERRY_QUICK_START[step] || null;
}

export function ferrySummary(state) {
  return `Ferry ${FERRY_RANKS[state.rank].name}: ${state.sessions} routes, ${state.actions} loads, $${Math.round(state.earned)} earned, ${state.findsFound} cargo.`;
}

export function ferryNextGoal(state) {
  if (state.sessions < 3) return 'Sail 3 routes.';
  if (state.actions < 50) return 'Deliver 50 cargo.';
  if (state.rank < 2) return 'Reach rank Harbour Master.';
  return 'Become the Fleet Admiral.';
}

export function ferryChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function ferryHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of FERRY_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function ferryRouteByDistance(distance) {
  let best = null;
  for (const s of FERRY_ROUTES) {
    if (s.distance <= distance && (!best || s.distance > best.distance)) best = s;
  }
  return best;
}

export function ferryCargoByRarity(maxRarity) {
  return FERRY_CARGO.filter((f) => f.rarity <= maxRarity).map((f) => f.id);
}

export function createFerrySystem(ctx) {
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
    sessions: 0,
    actions: 0,
    stepsDone: 0,
    earned: 0,
    spent: 0,
    findsFound: 0,
    findsSold: 0,
    contractsDone: 0,
    contractsFailed: 0,
    hazardsTaken: 0,
    heatGained: 0,
    inventory: {},
    upgrades: [],
    activeContract: null,
    contractProgress: 0,
    session: null,
    sessionStepsLeft: 0,
    sessionTimeLeft: 0,
    resource: 100,
    dayDrift: {},
    lastDay: 1,
    bestSession: null,
    bestSessionYield: 0,
    dailyEarned: 0,
    dailySessions: 0,
    totalYield: 0,
    bestStreak: 0,
    streak: 0,
    specialsUsed: 0,
    weatherStops: 0,
    sessionYield: 0,
    sessionFinds: 0,
    season: 'summer',
    event: null,
  };
  for (const f of FERRY_CARGO) { state.inventory[f.id] = 0; state.dayDrift[f.id] = 0; }

  function refreshRank() {
    const r = ferryRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Ferry rank up: ${FERRY_RANKS[r].name} — ${FERRY_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const f of FERRY_CARGO) {
      const roll = rng();
      if (roll < 0.3) state.dayDrift[f.id] = Math.round((rng() * 0.5 - 0.2) * 100) / 100;
      else if (roll < 0.4) state.dayDrift[f.id] = 0;
    }
  }

  function weather() {
    try {
      const w = getWeather();
      if (w && typeof w.condition === 'string') return w.condition;
    } catch (e) { /* ignore */ }
    return 'clear';
  }

  function pickCargo(route) {
    const bag = [];
    for (const f of FERRY_CARGO) {
      let w = f.rarity;
      if (state.rank >= 3 && f.rarity < 0.08) w *= 1.6;
      if (state.upgrades.includes('radar')) w *= 1.25;
      bag.push({ f, w });
    }
    let total = 0;
    for (const b of bag) total += b.w;
    let roll = rng() * total;
    for (const b of bag) {
      roll -= b.w;
      if (roll <= 0) return b.f;
    }
    return FERRY_CARGO[0];
  }

  function finishSession(reason) {
    const done = state.session;
    state.session = null;
    state.sessionStepsLeft = 0;
    state.sessionTimeLeft = 0;
    state.sessions += 1;
    state.dailySessions += 1;
    if (state.sessionYield > state.bestSessionYield) {
      state.bestSessionYield = state.sessionYield;
      state.bestSession = done;
    }
    log(`Ferry ${done} ${reason} — yield $${Math.round(state.sessionYield)}, ${state.sessionFinds} cargo.`);
    state.sessionYield = 0;
    state.sessionFinds = 0;
  }

  function sail(routeId) {
    const route = FERRY_ROUTES.find((s) => s.id === routeId);
    if (!route) return { ok: false, reason: 'no-such-site' };
    if (state.session) return { ok: false, reason: 'session-active' };
    const hour = getHour();
    if (hour < 5 || hour >= 23) return { ok: false, reason: 'too-late', hour };
    if (getCash() < route.price) return { ok: false, reason: 'not-enough-cash', cost: route.price };
    if (route.price > 0) { addCash(-route.price); state.spent += route.price; }
    state.session = routeId;
    state.sessionStepsLeft = route.steps;
    state.sessionTimeLeft = route.duration * 60;
    state.resource = ferryFuelMax(state.upgrades);
    log(`Ferry started: ${route.name} — ${route.steps} loads, ${route.duration} min, ${route.distance} km.`);
    return { ok: true, site: routeId, steps: route.steps, duration: route.duration };
  }

  function loadCargo() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    if (state.sessionStepsLeft <= 0) return { ok: false, reason: 'session-done' };
    const route = FERRY_ROUTES.find((s) => s.id === state.session);
    state.resource -= 7;
    if (state.resource < 0) state.resource = 0;
    const cap = ferryCarryCap(state.upgrades);
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held >= cap) return { ok: false, reason: 'carry-full', cap };
    const f = pickCargo(route);
    const qty = 1 + Math.floor(rng() * 4);
    const add = Math.min(qty, Math.max(0, cap - held));
    if (add <= 0) return { ok: false, reason: 'carry-full', cap };
    state.inventory[f.id] += add;
    state.findsFound += add;
    state.totalYield += f.value * add;
    state.sessionYield += f.value * add;
    state.sessionFinds += add;
    state.actions += 1;
    state.stepsDone += 1;
    state.sessionStepsLeft -= 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    gainXp(4 + add);
    const got = [{ id: f.id, name: f.name, qty: add, value: f.value }];
    if (rng() < 0.04 + (state.rank >= 4 ? 0.05 : 0)) {
      const rare = FERRY_CARGO.filter((x) => x.rarity < 0.06);
      const pick = rare[Math.floor(rng() * rare.length)];
      state.inventory[pick.id] += 1;
      state.findsFound += 1;
      state.sessionYield += pick.value;
      state.totalYield += pick.value;
      got.push({ id: pick.id, name: pick.name, qty: 1, value: pick.value, rare: true });
      log(`Ferry rare cargo! ${pick.name} worth $${pick.value}.`);
    }
    if (rng() < route.risk * 0.04) {
      state.hazardsTaken += 1;
      state.streak = 0;
      addCash(-25);
      state.spent += 25;
      if (rng() < 0.3) { addHeat(1); state.heatGained += 1; }
      log(`Ferry hazard at ${route.name}: a swell slammed the hold and a crate went overboard.`);
    }
    if (state.resource <= 0) {
      finishSession('cut short — fuel ran out');
      return { ok: true, got, stepsLeft: 0, ended: 'resource-empty' };
    }
    if (state.sessionStepsLeft <= 0) {
      finishSession('finished');
      return { ok: true, got, stepsLeft: 0, ended: 'done' };
    }
    return { ok: true, got, stepsLeft: state.sessionStepsLeft, resource: state.resource };
  }

  function dockEarly() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    finishSession('ended early');
    return { ok: true, ended: 'early' };
  }

  function announceTour() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    const cost = 5;
    if (state.resource < cost) return { ok: false, reason: 'not-enough-resource', need: cost };
    state.resource -= cost;
    state.specialsUsed += 1;
    if (rng() < 0.55) {
      const f = pickCargo(FERRY_ROUTES[0]);
      state.inventory[f.id] += 1;
      state.findsFound += 1;
      state.sessionYield += f.value;
      gainXp(10);
      log(`Ferry tour announcement: passengers loved the commentary and tipped for ${f.name}.`);
      return { ok: true, success: true, find: f.id, name: f.name };
    }
    log('Ferry tour announcement: the PA crackled and died mid-sentence.');
    return { ok: true, success: false };
  }

  function sellFind(cargoId, qty) {
    const f = FERRY_CARGO.find((x) => x.id === cargoId);
    if (!f) return { ok: false, reason: 'no-such-find' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = state.inventory[cargoId] || 0;
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = ferryPriceFor(cargoId, state.dayDrift, state.rank, state.upgrades);
    const total = Math.round(unit * qty * 10) / 10;
    state.inventory[cargoId] -= qty;
    state.findsSold += qty;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(qty);
    log(`Delivered ${qty}x ${f.name} for $${total}.`);
    return { ok: true, total, unit, qty };
  }

  function sellAllFinds() {
    let total = 0;
    let units = 0;
    const lines = [];
    for (const f of FERRY_CARGO) {
      const have = state.inventory[f.id] || 0;
      if (have <= 0) continue;
      const unit = ferryPriceFor(f.id, state.dayDrift, state.rank, state.upgrades);
      const line = Math.round(unit * have * 10) / 10;
      total += line;
      units += have;
      lines.push({ id: f.id, qty: have, total: line });
      state.inventory[f.id] = 0;
    }
    if (units === 0) return { ok: false, reason: 'nothing-to-sell' };
    total = Math.round(total * 10) / 10;
    state.findsSold += units;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(units);
    log(`Delivered everything (${units} cargo) for $${total}.`);
    return { ok: true, total, units, lines };
  }

  function buyUpgrade(id) {
    const u = FERRY_UPGRADES.find((x) => x.id === id);
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

  function takeContract(id) {
    const ct = FERRY_CONTRACTS.find((x) => x.id === id);
    if (!ct) return { ok: false, reason: 'no-such-contract' };
    if (state.activeContract) return { ok: false, reason: 'contract-active' };
    state.activeContract = { ...ct, dayTaken: getDay(), deadlineDay: getDay() + ct.days };
    state.contractProgress = 0;
    log(`Contract taken: ${ct.name} — deliver ${ct.qty}x ${ct.material} by day ${state.activeContract.deadlineDay}.`);
    return { ok: true, contract: state.activeContract };
  }

  function deliverContract() {
    const ct = state.activeContract;
    if (!ct) return { ok: false, reason: 'no-contract' };
    if (ct.material === 'mixed') {
      const total = Object.values(state.inventory).reduce((a, b) => a + b, 0);
      if (total < ct.qty) return { ok: false, reason: 'not-enough', have: total, need: ct.qty };
      let left = ct.qty;
      for (const f of FERRY_CARGO) {
        if (left <= 0) break;
        const take = Math.min(state.inventory[f.id], left);
        state.inventory[f.id] -= take;
        left -= take;
      }
    } else {
      const have = state.inventory[ct.material] || 0;
      if (have < ct.qty) return { ok: false, reason: 'not-enough', have, need: ct.qty };
      state.inventory[ct.material] -= ct.qty;
      state.contractProgress = ct.qty;
    }
    const bonus = ct.pay + state.rank * 40;
    state.activeContract = null;
    state.contractProgress = 0;
    state.contractsDone += 1;
    state.earned += bonus;
    addCash(bonus);
    gainXp(60);
    log(`Contract delivered: ${ct.name} paid $${bonus}.`);
    return { ok: true, pay: bonus };
  }

  function abandonContract() {
    if (!state.activeContract) return { ok: false, reason: 'no-contract' };
    state.activeContract = null;
    state.contractProgress = 0;
    state.contractsFailed += 1;
    log('Contract abandoned — the client will remember that.');
    return { ok: true };
  }

  function priceBoard() {
    return FERRY_CARGO.map((f) => ({
      id: f.id,
      name: f.name,
      price: ferryPriceFor(f.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[f.id],
      held: state.inventory[f.id],
    }));
  }

  function siteReport() {
    return FERRY_ROUTES.map((s) => ({
      id: s.id, name: s.name, fee: s.price, difficulty: s.difficulty, steps: s.steps, risk: s.risk,
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.16) {
      const f = FERRY_CARGO[Math.floor(rng() * FERRY_CARGO.length)];
      state.dayDrift[f.id] = Math.round((state.dayDrift[f.id] + 0.3) * 100) / 100;
      log(`Ferry news: ${f.name} is in demand — prices up today!`);
      return { event: 'demand-spike', find: f.id };
    }
    if (roll < 0.28) {
      const f = FERRY_CARGO[Math.floor(rng() * FERRY_CARGO.length)];
      state.dayDrift[f.id] = Math.round((state.dayDrift[f.id] - 0.15) * 100) / 100;
      log(`Ferry news: too much ${f.name} around — prices dip.`);
      return { event: 'price-dip', find: f.id };
    }
    if (roll < 0.38) {
      const f = FERRY_CARGO[Math.floor(rng() * FERRY_CARGO.length)];
      state.inventory[f.id] += 3;
      state.findsFound += 3;
      log(`Ferry gift: a dock worker hands you 3x ${f.name}.`);
      return { event: 'gift', find: f.id };
    }
    if (roll < 0.46) {
      const ev = FERRY_EVENTS[Math.floor(rng() * FERRY_EVENTS.length)];
      log(`Ferry event: ${ev.name} — ${ev.desc}`);
      return { event: ev.id, name: ev.name };
    }
    return { event: 'none' };
  }

  function tick(dt) {
    if (state.session) {
      state.sessionTimeLeft -= dt;
      state.resource -= dt * 0.05;
      if (state.sessionTimeLeft <= 0) {
        finishSession('timed out — the shift ended');
      } else if (state.resource <= 0) {
        state.resource = 0;
        finishSession('cut short — fuel ran out');
      }
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    driftPrices();
    state.dailyEarned = 0;
    state.dailySessions = 0;
    if (state.activeContract && day >= state.activeContract.deadlineDay && state.contractProgress < state.activeContract.qty) {
      log(`Contract ${state.activeContract.name} expired — the client walked away.`);
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractsFailed += 1;
    }
    dailyEvent();
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, sessions: state.sessions,
      actions: state.actions, stepsDone: state.stepsDone,
      earned: state.earned, spent: state.spent,
      findsFound: state.findsFound, findsSold: state.findsSold,
      contractsDone: state.contractsDone, contractsFailed: state.contractsFailed,
      hazardsTaken: state.hazardsTaken, heatGained: state.heatGained,
      inventory: state.inventory, upgrades: state.upgrades,
      activeContract: state.activeContract,
      contractProgress: state.contractProgress, session: state.session,
      sessionStepsLeft: state.sessionStepsLeft,
      sessionTimeLeft: state.sessionTimeLeft, resource: state.resource,
      dayDrift: state.dayDrift, lastDay: state.lastDay,
      bestSession: state.bestSession,
      bestSessionYield: state.bestSessionYield,
      dailyEarned: state.dailyEarned, dailySessions: state.dailySessions,
      totalYield: state.totalYield, bestStreak: state.bestStreak,
      streak: state.streak, specialsUsed: state.specialsUsed,
      weatherStops: state.weatherStops, sessionYield: state.sessionYield,
      sessionFinds: state.sessionFinds, season: state.season,
      event: state.event,
    }));
  }

  function deserialize(d) {
    if (!d || typeof d !== 'object') return;
    for (const k of Object.keys(state)) {
      if (d[k] !== undefined) state[k] = d[k];
    }
    for (const f of FERRY_CARGO) {
      if (state.inventory[f.id] === undefined) state.inventory[f.id] = 0;
      if (state.dayDrift[f.id] === undefined) state.dayDrift[f.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: FERRY_RANKS[state.rank].name,
      xp: state.xp,
      sessions: state.sessions,
      actions: state.actions,
      stepsDone: state.stepsDone,
      earned: Math.round(state.earned),
      spent: state.spent,
      findsFound: state.findsFound,
      findsSold: state.findsSold,
      contractsDone: state.contractsDone,
      contractsFailed: state.contractsFailed,
      hazardsTaken: state.hazardsTaken,
      heatGained: state.heatGained,
      upgrades: state.upgrades.length,
      activeContract: state.activeContract ? state.activeContract.id : null,
      contractProgress: state.contractProgress,
      session: state.session,
      stepsLeft: state.sessionStepsLeft,
      resource: Math.round(state.resource * 10) / 10,
      resourceMax: ferryFuelMax(state.upgrades),
      dailyEarned: Math.round(state.dailyEarned),
      totalYield: Math.round(state.totalYield),
      bestStreak: state.bestStreak,
      bestSession: state.bestSession,
      bestSessionYield: Math.round(state.bestSessionYield),
      specialsUsed: state.specialsUsed,
      weatherStops: state.weatherStops,
      season: state.season,
      event: state.event,
    };
  }

  function hudLine() {
    if (state.session) return `Ferry: ${state.session} — ${state.sessionStepsLeft} loads left, fuel ${Math.round(state.resource)}`;
    if (state.activeContract) return `Ferry: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held > 0) return `Ferry: ${held} cargo held`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const near = Math.hypot(pos.x - (-150), pos.z - (-350)) < 30;
    if (!near) return false;
    if (state.session) { loadCargo(); return true; }
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held > 0) { sellAllFinds(); return true; }
    sail(FERRY_ROUTES[0].id);
    return true;
  }

  return {
    name: 'Ferry',
    state,
    sail, loadCargo, dockEarly, announceTour,
    sellFind, sellAllFinds, buyUpgrade, takeContract,
    deliverContract, abandonContract, priceBoard, siteReport,
    dailyEvent, tick, tickDay, serialize, deserialize,
    stats, hudLine, interact,
  };
}

export function createFerryExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function hireHelper(id) {
    const h = FERRY_HELPERS.find((x) => x.id === id);
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
      const h = FERRY_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    return ferryHelperBonus(helpers, skill);
  }

  function challenges() {
    return FERRY_CHALLENGES.map((ch) => ferryChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = FERRY_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = ferryChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return FERRY_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function donateFinds(cargoId, qty) {
    const have = system.state.inventory[cargoId] || 0;
    if (have < qty || qty <= 0) return { ok: false, reason: 'not-enough', have };
    system.state.inventory[cargoId] -= qty;
    const rep = Math.floor(qty / 5);
    return { ok: true, qty, rep, note: 'The harbour trust thanks you. The tide remembers.' };
  }

  function bundleSale(cargoId, qty) {
    const have = system.state.inventory[cargoId] || 0;
    if (have < qty || qty < 10) return { ok: false, reason: 'need-10-plus', have };
    const unit = ferryPriceFor(cargoId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(unit * qty * 1.1 * 10) / 10;
    system.state.inventory[cargoId] -= qty;
    system.state.findsSold += qty;
    system.state.earned += total;
    return { ok: true, total, qty, bonus: 'bundle +10%' };
  }

  function checkFuel() {
    const max = ferryFuelMax(system.state.upgrades);
    return {
      resource: Math.round(system.state.resource * 10) / 10,
      max,
      pct: Math.round((system.state.resource / max) * 100),
    };
  }

  function refuel() {
    system.state.resource = ferryFuelMax(system.state.upgrades);
    return { ok: true, resource: system.state.resource };
  }

  function weighHold() {
    let kg = 0;
    for (const [id, qty] of Object.entries(system.state.inventory)) {
      const f = FERRY_CARGO.find((x) => x.id === id);
      if (f) kg += f.weight * qty;
    }
    return { kg: Math.round(kg * 10) / 10, cap: ferryCarryCap(system.state.upgrades) };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, donateFinds, bundleSale,
    checkFuel, refuel, weighHold,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return helperWagesPaid; },
  };
}

export function createFerryMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkSold = 0;

  function setEvent(eventId) {
    const ev = FERRY_MARKET.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = FERRY_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    system.state.season = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(cargoId, basePrice) {
    let price = basePrice;
    price *= ferryEventMult(currentEvent, cargoId);
    price *= ferrySeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(cargoId, qty) {
    const have = system.state.inventory[cargoId] || 0;
    if (have < qty || qty < 20) return { ok: false, reason: 'need-20-plus', have };
    const unit = ferryPriceFor(cargoId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(eventPrice(cargoId, unit) * qty * 1.1 * 10) / 10;
    system.state.inventory[cargoId] -= qty;
    system.state.findsSold += qty;
    system.state.earned += total;
    bulkSold += qty;
    dealsClaimed += 1;
    return { ok: true, total, qty, bonus: 'bulk +10%' };
  }

  function dailyDeals() {
    const deals = [];
    for (const f of FERRY_CARGO) {
      const mult = ferryEventMult(currentEvent, f.id);
      if (mult !== 1) {
        deals.push({ find: f.id, name: f.name, mult, event: currentEvent });
      }
    }
    return deals;
  }

  function marketSummary() {
    return {
      event: currentEvent,
      season: currentSeason,
      dealsClaimed,
      bulkSold,
      deals: dailyDeals(),
    };
  }

  return {
    setEvent, setSeason, eventPrice, bulkDeal, dailyDeals, marketSummary,
    get event() { return currentEvent; },
    get season() { return currentSeason; },
  };
}

export const FERRY_META = {
  system: 'ferry',
  version: '7c-B2',
  author: 'builder-2',
  dataCount: FERRY_ROUTES.length,
  findCount: FERRY_CARGO.length,
  upgradeCount: FERRY_UPGRADES.length,
  rankCount: FERRY_RANKS.length,
};
