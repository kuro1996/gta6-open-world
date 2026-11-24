// Kayaking — Rio paddles the rivers above Solara.
// Pay the put-in, read the water, and ride each bend collecting what
// the river leaves behind: trout, feathers, old lures, driftwood
// carvings, and the odd thing a flood carried down from the hills.
// Rapids pay better, and they charge for it — a rock can flip the
// boat and soak your kit in a second. Scout every rapid you cannot
// see through, rest in the eddies, and let the current do the work.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const KAYAK_RIVERS = [
  { id: 'emerald-creek', name: 'Emerald Creek', fee: 25, difficulty: 1,
    steps: 4, duration: 25, risk: 0, rapids: 'I', length: 4,
    desc: 'Clear, slow, and kind to beginners.' },
  { id: 'willow-bend', name: 'Willow Bend', fee: 35, difficulty: 1,
    steps: 5, duration: 30, risk: 0, rapids: 'I', length: 6,
    desc: 'Willows trail in the water like green hair.' },
  { id: 'quiet-lagoon', name: 'Quiet Lagoon', fee: 45, difficulty: 1,
    steps: 5, duration: 30, risk: 0, rapids: 'I', length: 5,
    desc: 'Still water, herons, and a lot of sky.' },
  { id: 'silver-stream', name: 'Silver Stream', fee: 60, difficulty: 2,
    steps: 5, duration: 35, risk: 1, rapids: 'II', length: 8,
    desc: 'Fast, bright, and full of trout.' },
  { id: 'mangrove-maze', name: 'Mangrove Maze', fee: 75, difficulty: 2,
    steps: 6, duration: 40, risk: 1, rapids: 'II', length: 9,
    desc: 'Roots and tunnels, easy to get turned around.' },
  { id: 'pine-rapids', name: 'Pine Rapids', fee: 95, difficulty: 3,
    steps: 6, duration: 40, risk: 2, rapids: 'III', length: 10,
    desc: 'Pine-scented water with a proper bite.' },
  { id: 'granite-gorge', name: 'Granite Gorge', fee: 120, difficulty: 3,
    steps: 7, duration: 45, risk: 2, rapids: 'III', length: 12,
    desc: 'Grey walls and water that means it.' },
  { id: 'moonlit-channel', name: 'Moonlit Channel', fee: 150, difficulty: 4,
    steps: 7, duration: 50, risk: 2, rapids: 'III', length: 14,
    desc: 'Best paddled at dusk, when the water turns silver.' },
  { id: 'thunder-falls', name: 'Thunder Falls', fee: 180, difficulty: 4,
    steps: 8, duration: 55, risk: 3, rapids: 'IV', length: 15,
    desc: 'You can hear it a kilometre away.' },
  { id: 'rapid-run', name: 'Rapid Run', fee: 220, difficulty: 5,
    steps: 8, duration: 60, risk: 3, rapids: 'IV', length: 18,
    desc: 'The river drops, twists, and does not forgive.' },
];

export const KAYAK_CATCHES = [
  { id: 'smooth-pebble', name: 'Smooth Pebble', value: 8, rarity: 0.28,
    weight: 0.3, desc: 'Polished by a thousand kilometres of river.' },
  { id: 'wild-mint', name: 'Wild Mint', value: 14, rarity: 0.22,
    weight: 0.2, desc: 'Grows on the banks, smells like summer.' },
  { id: 'old-lure', name: 'Old Lure', value: 24, rarity: 0.16,
    weight: 0.1, desc: 'A spinner snagged on a root, still shiny.' },
  { id: 'kingfisher-feather', name: 'Kingfisher Feather', value: 32, rarity: 0.12,
    weight: 0.0, desc: 'Electric blue, dropped on the water.' },
  { id: 'river-trout', name: 'River Trout', value: 45, rarity: 0.1,
    weight: 1.2, desc: 'Fat and fighting, straight from the pool.' },
  { id: 'driftwood-carving', name: 'Driftwood Carving', value: 65, rarity: 0.07,
    weight: 1.0, desc: 'Someone carved a fish into this driftwood.' },
  { id: 'heron-feather', name: 'Heron Feather', value: 80, rarity: 0.05,
    weight: 0.0, desc: 'Grey, long, and lucky to find.' },
  { id: 'silver-minnow', name: 'Silver Minnow', value: 110, rarity: 0.04,
    weight: 0.3, desc: 'A minnow that flashes like a coin.' },
  { id: 'river-pearl', name: 'River Pearl', value: 190, rarity: 0.02,
    weight: 0.1, desc: 'A freshwater pearl, small and perfect.' },
  { id: 'lost-paddle', name: 'Lost Paddle', value: 260, rarity: 0.01,
    weight: 1.5, desc: 'A hand-carved paddle, signed by its maker.' },
];

export const KAYAK_UPGRADES = [
  { id: 'paddle', name: 'Carbon Paddle', cost: 90,
    desc: 'Lighter strokes, longer days.', effect: 'stroke-plus' },
  { id: 'pfd', name: 'Pro Life Vest', cost: 110,
    desc: 'Hazards hurt half as much.', effect: 'safety' },
  { id: 'helmet', name: 'River Helmet', cost: 130,
    desc: 'Rocks bounce off. Mostly.', effect: 'safety-plus' },
  { id: 'drybag', name: 'Dry Bag Set', cost: 160,
    desc: 'Keep finds dry: +6 slots, +20% prices.', effect: 'carry-plus' },
  { id: 'spray-skirt', name: 'Spray Skirt', cost: 200,
    desc: 'Stay dry in the rapids.', effect: 'dry-plus' },
  { id: 'gps', name: 'River GPS', cost: 380,
    desc: 'Finds are 25% easier to spot.', effect: 'find-plus' },
  { id: 'kayak', name: 'Expedition Kayak', cost: 650,
    desc: 'Stamina lasts +40, carry +12.', effect: 'stamina-plus' },
  { id: 'roof-rack', name: 'Roof Rack', cost: 300,
    desc: 'Carry the boat anywhere, paddle more rivers.', effect: 'travel-plus' },
];

export const KAYAK_RANKS = [
  { level: 0, name: 'Pond Paddler', xp: 0,
    perk: 'Calm water pays base rate.' },
  { level: 1, name: 'River Runner', xp: 120,
    perk: '+10% find prices.' },
  { level: 2, name: 'Rapid Runner', xp: 300,
    perk: 'Class III rivers open up.' },
  { level: 3, name: 'Gorge Guide', xp: 620,
    perk: '+20% find prices, class IV unlocked.' },
  { level: 4, name: 'River Master', xp: 1100,
    perk: '+30% find prices, rare finds doubled.' },
];

export const KAYAK_EVENTS = [
  { id: 'salmon-run', name: 'Salmon Run',
    desc: 'The river is silver with running fish.' },
  { id: 'rain-swollen', name: 'Rain Swollen',
    desc: 'Rain lifts the river a full metre.' },
  { id: 'low-water', name: 'Low Water',
    desc: 'Rocks show that are usually hidden.' },
  { id: 'kingfisher-day', name: 'Kingfisher Day',
    desc: 'Kingfishers flash on every bend.' },
  { id: 'flood-debris', name: 'Flood Debris',
    desc: 'The last flood left treasure on the banks.' },
  { id: 'mist-morning', name: 'Mist Morning',
    desc: 'The river steams in the cold dawn.' },
  { id: 'otter-family', name: 'Otter Family',
    desc: 'Otters play in the eddy below the falls.' },
  { id: 'dam-release', name: 'Dam Release',
    desc: 'The dam opens and the river rises fast.' },
  { id: 'clear-pool', name: 'Clear Pool',
    desc: 'The pools are glass-clear today.' },
  { id: 'heron-nest', name: 'Heron Nest',
    desc: 'A heron nests on the far bank.' },
];

export const KAYAK_CONTRACTS = [
  { id: 'trout-10', name: 'Trout Order', material: 'river-trout', qty: 10,
    pay: 480, days: 1, rep: 1,
    desc: 'A riverside restaurant needs ten trout.' },
  { id: 'mint-15', name: 'Mint Picking', material: 'wild-mint', qty: 15,
    pay: 220, days: 1, rep: 1,
    desc: 'A tea house wants wild mint from the banks.' },
  { id: 'feathers-8', name: 'Feather Collection', material: 'kingfisher-feather', qty: 8,
    pay: 320, days: 2, rep: 2,
    desc: 'A fly-tier collects kingfisher feathers.' },
  { id: 'pearls-3', name: 'Pearl Hunt', material: 'river-pearl', qty: 3,
    pay: 700, days: 3, rep: 3,
    desc: 'A jeweller wants three river pearls.' },
  { id: 'carvings-4', name: 'Carving Hunt', material: 'driftwood-carving', qty: 4,
    pay: 340, days: 2, rep: 2,
    desc: 'A gallery buys driftwood carvings.' },
  { id: 'mixed-30', name: 'River Lot', material: 'mixed', qty: 30,
    pay: 520, days: 2, rep: 2,
    desc: 'Any thirty river finds for the market.' },
];

export const KAYAK_CHALLENGES = [
  { id: 'rivers-10', name: 'Ten Rivers', target: 'sessions', goal: 10, xp: 90,
    desc: 'Finish 10 river runs.' },
  { id: 'finds-100', name: 'Century of Finds', target: 'findsFound', goal: 100, xp: 110,
    desc: 'Collect 100 river finds.' },
  { id: 'earn-1000', name: 'Grand on the River', target: 'earned', goal: 1000, xp: 130,
    desc: 'Earn $1,000 from kayaking.' },
  { id: 'streak-8', name: 'Clean Eight', target: 'bestStreak', goal: 8, xp: 100,
    desc: 'Eight clean steps in a row.' },
  { id: 'contracts-3', name: 'Reliable Paddler', target: 'contractsDone', goal: 3, xp: 120,
    desc: 'Complete 3 river contracts.' },
  { id: 'actions-200', name: 'Two Hundred Strokes', target: 'actions', goal: 200, xp: 140,
    desc: 'Take 200 paddle steps.' },
  { id: 'first-find', name: 'First Find', target: 'findsFound', goal: 1, xp: 60,
    desc: 'Collect your first river find.' },
  { id: 'rapids-5', name: 'Rapids Five', target: 'sessions', goal: 5, xp: 80,
    desc: 'Finish 5 river runs.' },
];

export const KAYAK_ACHIEVEMENTS = [
  { id: 'first-river', name: 'First River', check: (s) => s.sessions >= 1,
    desc: 'Finish your first river run.' },
  { id: 'pearl-club', name: 'Pearl Club', check: (s) => (s.inventory['river-pearl'] || 0) + s.findsSold >= 1,
    desc: 'Find a river pearl.' },
  { id: 'rank-3', name: 'Gorge Guide', check: (s) => s.rank >= 3,
    desc: 'Reach rank Gorge Guide.' },
  { id: 'rich-river', name: 'River Rich', check: (s) => s.earned >= 3000,
    desc: 'Earn $3,000 from kayaking.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8,
    desc: 'Own every kayaking upgrade.' },
  { id: 'no-hazard', name: 'Dry Run', check: (s) => s.sessions >= 10 && s.hazardsTaken === 0,
    desc: 'Ten runs with zero hazards.' },
  { id: 'big-yield', name: 'Big Yield', check: (s) => s.bestSessionYield >= 500,
    desc: 'One run worth $500 or more.' },
  { id: 'strokes-50', name: 'Fifty Strokes', check: (s) => s.actions >= 50,
    desc: 'Fifty paddle steps on the river.' },
];

export const KAYAK_TIPS = [
  { id: 'stamina-first', name: 'Stamina First',
    text: 'Stamina is your river. Spend it on rapids, not flat water.' },
  { id: 'scout-first', name: 'Scout First',
    text: 'Always scout a rapid you cannot see through.' },
  { id: 'drybag-money', name: 'Dry Bag Money',
    text: 'Dry finds sell for more. Keep them dry.' },
  { id: 'trout-pools', name: 'Trout Pools',
    text: 'Trout hold in the deep pools below the rapids.' },
  { id: 'rain-check', name: 'Rain Check',
    text: 'Rain lifts the river fast. Check the level first.' },
  { id: 'contract-first', name: 'Contracts First',
    text: 'Take a river contract, then paddle its river.' },
  { id: 'helmet-early', name: 'Helmet Early',
    text: 'Buy the helmet before the gorge.' },
  { id: 'eddy-rest', name: 'Eddy Rest',
    text: 'Rest in the eddies. The river never hurries you.' },
];

export const KAYAK_LEADERBOARD = [
  { name: 'Old Man River', value: 8600, desc: 'Paddled every river in the county.' },
  { name: 'Sana', value: 6400, desc: 'Slalom champion, three years running.' },
  { name: 'Rio', value: 0, desc: 'You. Climbing.' },
  { name: 'Tomas', value: 3500, desc: 'Found the lost paddle, twice.' },
  { name: 'Lena', value: 1800, desc: 'Guides the dawn trips.' },
];

export const KAYAK_RECORDS = [
  { id: 'most-runs', name: 'Most Runs', stat: 'sessions', unit: 'runs',
    desc: 'Most river runs finished.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$',
    desc: 'Most money earned from kayaking.' },
  { id: 'most-finds', name: 'Most Finds', stat: 'findsFound', unit: 'finds',
    desc: 'Most river finds collected.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'steps',
    desc: 'Longest clean streak.' },
  { id: 'best-run', name: 'Best Run', stat: 'bestSessionYield', unit: '$',
    desc: 'Best single-run yield.' },
];

export const KAYAK_MARKET = [
  { id: 'trout-boom', name: 'Trout Boom', finds: ['river-trout'], mult: 1.4,
    desc: 'Restaurants are bidding up trout.' },
  { id: 'pearl-rush', name: 'Pearl Rush', finds: ['river-pearl'], mult: 1.6,
    desc: 'A jeweller wants river pearls.' },
  { id: 'feather-week', name: 'Feather Week', finds: ['kingfisher-feather', 'heron-feather'], mult: 1.35,
    desc: 'Fly-tiers are buying feathers.' },
  { id: 'mint-season', name: 'Mint Season', finds: ['wild-mint'], mult: 1.3,
    desc: 'Tea houses want wild mint.' },
  { id: 'carving-fair', name: 'Carving Fair', finds: ['driftwood-carving'], mult: 1.4,
    desc: 'A gallery is buying driftwood.' },
  { id: 'minnow-day', name: 'Minnow Day', finds: ['silver-minnow'], mult: 1.3,
    desc: 'Aquariums want silver minnows.' },
  { id: 'pebble-glut', name: 'Pebble Glut', finds: ['smooth-pebble'], mult: 0.6,
    desc: 'Everyone has pebbles this week.' },
  { id: 'lure-dip', name: 'Lure Dip', finds: ['old-lure'], mult: 0.75,
    desc: 'Old lures are out of fashion.' },
];

export const KAYAK_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1,
    desc: 'Fresh water and full bookings.' },
  { id: 'summer', name: 'Summer', mult: 1.2,
    desc: 'Peak season, everyone is paddling.' },
  { id: 'autumn', name: 'Autumn', mult: 1.0,
    desc: 'Steady work, thinner crowds.' },
  { id: 'winter', name: 'Winter', mult: 0.85,
    desc: 'Cold water, quiet days.' },
];

export const KAYAK_SEASONAL = [
  { season: 'spring', find: 'wild-mint', mult: 1.3 },
  { season: 'spring', find: 'river-trout', mult: 1.25 },
  { season: 'summer', find: 'kingfisher-feather', mult: 1.3 },
  { season: 'summer', find: 'silver-minnow', mult: 1.2 },
  { season: 'autumn', find: 'driftwood-carving', mult: 1.25 },
  { season: 'autumn', find: 'river-pearl', mult: 1.35 },
  { season: 'winter', find: 'heron-feather', mult: 1.3 },
  { season: 'winter', find: 'lost-paddle', mult: 1.2 },
];

export const KAYAK_QUICK_START = [
  'Paddle the calm rivers first and learn your stamina burn.',
  'Sell pebbles and mint early; keep pearls for contracts.',
  'Buy the helmet before the gorge.',
  'Scout every rapid you cannot see through.',
  'Take river contracts for finds on your river.',
  'Save for the expedition kayak — longer runs, more finds.',
];

export const KAYAK_HELPERS = [
  { id: 'spotter', name: 'Lena the Spotter', wage: 30, skill: 'collect', bonus: 0.15,
    desc: 'Sharp eyes on the bank: +15% find yield.' },
  { id: 'guide', name: 'Sana the Guide', wage: 45, skill: 'find', bonus: 0.25,
    desc: 'Knows every eddy: +25% rare finds.' },
  { id: 'shuttle', name: 'Tomas the Shuttle', wage: 55, skill: 'carry', bonus: 0.4,
    desc: 'Drives the shuttle: +40% carry capacity.' },
  { id: 'trader', name: 'Quiet Ana', wage: 75, skill: 'sell', bonus: 0.12,
    desc: 'Knows the traders: +12% find prices.' },
];

export function kayakRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < KAYAK_RANKS.length; i++) {
    if (xp >= KAYAK_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function kayakPriceFor(catchId, dayDrift, rank, upgrades) {
  const f = KAYAK_CATCHES.find((x) => x.id === catchId);
  if (!f) return 0;
  let price = f.value;
  price *= 1 + (dayDrift[catchId] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('drybag')) price *= 1.2;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function kayakCarryCap(upgrades) {
  let cap = 18;
  if (upgrades.includes('drybag')) cap += 6;
  if (upgrades.includes('kayak')) cap += 12;
  return cap;
}

export function kayakStaminaMax(upgrades) {
  let max = 100;
  if (upgrades.includes('kayak')) max += 40;
  return max;
}

export function kayakEventMult(eventId, catchId) {
  const ev = KAYAK_MARKET.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.finds.includes(catchId) ? ev.mult : 1;
}

export function kayakSeasonMult(seasonId) {
  const s = KAYAK_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function kayakEventFor(day) {
  return KAYAK_MARKET[day % KAYAK_MARKET.length];
}

export function kayakSeasonalPriceMult(seasonId, catchId) {
  const row = KAYAK_SEASONAL.find((x) => x.season === seasonId && x.find === catchId);
  return row ? row.mult : 1;
}

export function kayakBestSeason(catchId) {
  let best = null;
  let bestMult = 0;
  for (const row of KAYAK_SEASONAL) {
    if (row.find === catchId && row.mult > bestMult) { bestMult = row.mult; best = row.season; }
  }
  return best ? { season: best, mult: bestMult } : null;
}

export function kayakBestBuyer(catchId, dayDrift, rank, upgrades) {
  const base = kayakPriceFor(catchId, dayDrift, rank, upgrades);
  return { price: base, note: 'River traders pay best for rare, dry river finds.' };
}

export function kayakScore(sessions, yieldTotal, hazards) {
  const base = sessions * 10 + Math.round(yieldTotal);
  const penalty = hazards * 5;
  return Math.max(0, base - penalty);
}

export function kayakGrade(sessions, yieldTotal, hazards) {
  const score = kayakScore(sessions, yieldTotal, hazards);
  if (score >= 400) return 'S';
  if (score >= 250) return 'A';
  if (score >= 140) return 'B';
  if (score >= 60) return 'C';
  return 'D';
}

export function kayakWeeklyGoal(sessions, sold, earned) {
  const goal = { sessions: 5, sold: 40, earned: 600 };
  return {
    sessions: { have: sessions, goal: goal.sessions, done: sessions >= goal.sessions },
    sold: { have: sold, goal: goal.sold, done: sold >= goal.sold },
    earned: { have: Math.round(earned), goal: goal.earned, done: earned >= goal.earned },
    allDone: sessions >= goal.sessions && sold >= goal.sold && earned >= goal.earned,
  };
}

export function kayakTipFor(day) {
  return KAYAK_TIPS[day % KAYAK_TIPS.length];
}

export function kayakLeaderboardWith(playerValue) {
  const board = KAYAK_LEADERBOARD.map((e) => ({
    name: e.name, value: e.name === 'Rio' ? playerValue : e.value, desc: e.desc,
  }));
  board.sort((a, b) => b.value - a.value);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function kayakRecordFor(recordId, state) {
  const r = KAYAK_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function kayakAllRecords(state) {
  return KAYAK_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function kayakEfficiency(actions, hazards) {
  const total = actions + hazards;
  if (total === 0) return 100;
  return Math.round((actions / total) * 100);
}

export function kayakProfitPerRun(earned, sessions) {
  if (sessions === 0) return 0;
  return Math.round((earned / sessions) * 10) / 10;
}

export function kayakInventoryValue(inventory) {
  let total = 0;
  for (const [id, qty] of Object.entries(inventory)) {
    const f = KAYAK_CATCHES.find((x) => x.id === id);
    if (f) total += f.value * qty;
  }
  return Math.round(total * 10) / 10;
}

export function kayakTotalValue(state) {
  return kayakInventoryValue(state.inventory);
}

export function kayakProgressPercent(state) {
  const total = state.actions + state.findsSold;
  if (total === 0) return 0;
  return Math.round((state.actions / total) * 100);
}

export function kayakQuickStart(step) {
  return KAYAK_QUICK_START[step] || null;
}

export function kayakSummary(state) {
  return `Kayaking ${KAYAK_RANKS[state.rank].name}: ${state.sessions} runs, ${state.actions} strokes, $${Math.round(state.earned)} earned, ${state.findsFound} finds.`;
}

export function kayakNextGoal(state) {
  if (state.sessions < 3) return 'Paddle 3 rivers.';
  if (state.actions < 50) return 'Collect 50 river finds.';
  if (state.rank < 2) return 'Reach rank Rapid Runner.';
  return 'Become the River Master.';
}

export function kayakChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function kayakHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of KAYAK_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function kayakRiverByLength(length) {
  let best = null;
  for (const s of KAYAK_RIVERS) {
    if (s.length <= length && (!best || s.length > best.length)) best = s;
  }
  return best;
}

export function kayakCatchesByRarity(maxRarity) {
  return KAYAK_CATCHES.filter((f) => f.rarity <= maxRarity).map((f) => f.id);
}

export function createKayakingSystem(ctx) {
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
    season: 'spring',
    event: null,
  };
  for (const f of KAYAK_CATCHES) { state.inventory[f.id] = 0; state.dayDrift[f.id] = 0; }

  function refreshRank() {
    const r = kayakRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Kayaking rank up: ${KAYAK_RANKS[r].name} — ${KAYAK_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const f of KAYAK_CATCHES) {
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

  function weatherBlocks() {
    const cond = weather();
    return cond === 'storm' || cond === 'hurricane';
  }

  function pickCatch(river) {
    const bag = [];
    for (const f of KAYAK_CATCHES) {
      let w = f.rarity;
      if (state.rank >= 3 && f.rarity < 0.08) w *= 1.6;
      if (state.upgrades.includes('gps')) w *= 1.25;
      bag.push({ f, w });
    }
    let total = 0;
    for (const b of bag) total += b.w;
    let roll = rng() * total;
    for (const b of bag) {
      roll -= b.w;
      if (roll <= 0) return b.f;
    }
    return KAYAK_CATCHES[0];
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
    log(`Kayaking ${done} ${reason} — yield $${Math.round(state.sessionYield)}, ${state.sessionFinds} finds.`);
    state.sessionYield = 0;
    state.sessionFinds = 0;
  }

  function paddle(riverId) {
    const river = KAYAK_RIVERS.find((s) => s.id === riverId);
    if (!river) return { ok: false, reason: 'no-such-site' };
    if (state.session) return { ok: false, reason: 'session-active' };
    if (weatherBlocks()) {
      state.weatherStops += 1;
      return { ok: false, reason: 'bad-weather', condition: weather() };
    }
    const hour = getHour();
    if (hour < 6 || hour >= 20) return { ok: false, reason: 'too-late', hour };
    if (getCash() < river.fee) return { ok: false, reason: 'not-enough-cash', cost: river.fee };
    if (river.fee > 0) { addCash(-river.fee); state.spent += river.fee; }
    state.session = riverId;
    state.sessionStepsLeft = river.steps;
    state.sessionTimeLeft = river.duration * 60;
    state.resource = kayakStaminaMax(state.upgrades);
    log(`Kayaking started: ${river.name} — ${river.steps} strokes, ${river.duration} min, class ${river.rapids} rapids.`);
    return { ok: true, site: riverId, steps: river.steps, duration: river.duration };
  }

  function paddleStroke() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    if (state.sessionStepsLeft <= 0) return { ok: false, reason: 'session-done' };
    const river = KAYAK_RIVERS.find((s) => s.id === state.session);
    state.resource -= 9;
    if (state.resource < 0) state.resource = 0;
    const cap = kayakCarryCap(state.upgrades);
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held >= cap) return { ok: false, reason: 'carry-full', cap };
    const f = pickCatch(river);
    const qty = 1 + Math.floor(rng() * 3);
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
      const rare = KAYAK_CATCHES.filter((x) => x.rarity < 0.06);
      const pick = rare[Math.floor(rng() * rare.length)];
      state.inventory[pick.id] += 1;
      state.findsFound += 1;
      state.sessionYield += pick.value;
      state.totalYield += pick.value;
      got.push({ id: pick.id, name: pick.name, qty: 1, value: pick.value, rare: true });
      log(`Kayaking rare find! ${pick.name} worth $${pick.value}.`);
    }
    if (rng() < river.risk * 0.04) {
      state.hazardsTaken += 1;
      state.streak = 0;
      state.resource -= 18;
      if (rng() < 0.3) { addCash(-20); state.spent += 20; }
      log(`Kayaking hazard at ${river.name}: a rock flipped the boat and soaked your kit.`);
    }
    if (state.resource <= 0) {
      finishSession('cut short — stamina ran out');
      return { ok: true, got, stepsLeft: 0, ended: 'resource-empty' };
    }
    if (state.sessionStepsLeft <= 0) {
      finishSession('finished');
      return { ok: true, got, stepsLeft: 0, ended: 'done' };
    }
    return { ok: true, got, stepsLeft: state.sessionStepsLeft, resource: state.resource };
  }

  function portageOut() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    finishSession('ended early');
    return { ok: true, ended: 'early' };
  }

  function scoutRapid() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    const cost = 10;
    if (state.resource < cost) return { ok: false, reason: 'not-enough-resource', need: cost };
    state.resource -= cost;
    state.specialsUsed += 1;
    if (rng() < 0.55) {
      const f = pickCatch(KAYAK_RIVERS[0]);
      state.inventory[f.id] += 1;
      state.findsFound += 1;
      state.sessionYield += f.value;
      gainXp(10);
      log(`Kayaking scout rapid: scouted the rapid and found ${f.name}.`);
      return { ok: true, success: true, find: f.id, name: f.name };
    }
    log('Kayaking scout rapid: the eddy spun you in circles.');
    return { ok: true, success: false };
  }

  function sellFind(catchId, qty) {
    const f = KAYAK_CATCHES.find((x) => x.id === catchId);
    if (!f) return { ok: false, reason: 'no-such-find' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = state.inventory[catchId] || 0;
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = kayakPriceFor(catchId, state.dayDrift, state.rank, state.upgrades);
    const total = Math.round(unit * qty * 10) / 10;
    state.inventory[catchId] -= qty;
    state.findsSold += qty;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(qty);
    log(`Sold ${qty}x ${f.name} for $${total}.`);
    return { ok: true, total, unit, qty };
  }

  function sellAllFinds() {
    let total = 0;
    let units = 0;
    const lines = [];
    for (const f of KAYAK_CATCHES) {
      const have = state.inventory[f.id] || 0;
      if (have <= 0) continue;
      const unit = kayakPriceFor(f.id, state.dayDrift, state.rank, state.upgrades);
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
    log(`Sold everything (${units} finds) for $${total}.`);
    return { ok: true, total, units, lines };
  }

  function buyUpgrade(id) {
    const u = KAYAK_UPGRADES.find((x) => x.id === id);
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
    const ct = KAYAK_CONTRACTS.find((x) => x.id === id);
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
      for (const f of KAYAK_CATCHES) {
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
    return KAYAK_CATCHES.map((f) => ({
      id: f.id,
      name: f.name,
      price: kayakPriceFor(f.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[f.id],
      held: state.inventory[f.id],
    }));
  }

  function siteReport() {
    return KAYAK_RIVERS.map((s) => ({
      id: s.id, name: s.name, fee: s.fee, difficulty: s.difficulty, steps: s.steps, risk: s.risk,
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.16) {
      const f = KAYAK_CATCHES[Math.floor(rng() * KAYAK_CATCHES.length)];
      state.dayDrift[f.id] = Math.round((state.dayDrift[f.id] + 0.3) * 100) / 100;
      log(`Kayaking news: ${f.name} is in demand — prices up today!`);
      return { event: 'demand-spike', find: f.id };
    }
    if (roll < 0.28) {
      const f = KAYAK_CATCHES[Math.floor(rng() * KAYAK_CATCHES.length)];
      state.dayDrift[f.id] = Math.round((state.dayDrift[f.id] - 0.15) * 100) / 100;
      log(`Kayaking news: too much ${f.name} around — prices dip.`);
      return { event: 'price-dip', find: f.id };
    }
    if (roll < 0.38) {
      const f = KAYAK_CATCHES[Math.floor(rng() * KAYAK_CATCHES.length)];
      state.inventory[f.id] += 3;
      state.findsFound += 3;
      log(`Kayaking gift: a fellow paddler hands you 3x ${f.name}.`);
      return { event: 'gift', find: f.id };
    }
    if (roll < 0.46) {
      const ev = KAYAK_EVENTS[Math.floor(rng() * KAYAK_EVENTS.length)];
      log(`Kayaking event: ${ev.name} — ${ev.desc}`);
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
        finishSession('cut short — stamina ran out');
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
    for (const f of KAYAK_CATCHES) {
      if (state.inventory[f.id] === undefined) state.inventory[f.id] = 0;
      if (state.dayDrift[f.id] === undefined) state.dayDrift[f.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: KAYAK_RANKS[state.rank].name,
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
      resourceMax: kayakStaminaMax(state.upgrades),
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
    if (state.session) return `Kayaking: ${state.session} — ${state.sessionStepsLeft} strokes left, stamina ${Math.round(state.resource)}`;
    if (state.activeContract) return `Kayaking: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held > 0) return `Kayaking: ${held} finds held`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const near = Math.hypot(pos.x - 420, pos.z - (-60)) < 30;
    if (!near) return false;
    if (state.session) { paddleStroke(); return true; }
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held > 0) { sellAllFinds(); return true; }
    paddle(KAYAK_RIVERS[0].id);
    return true;
  }

  return {
    name: 'Kayaking',
    state,
    paddle, paddleStroke, portageOut, scoutRapid,
    sellFind, sellAllFinds, buyUpgrade, takeContract,
    deliverContract, abandonContract, priceBoard, siteReport,
    dailyEvent, tick, tickDay, serialize, deserialize,
    stats, hudLine, interact,
  };
}

export function createKayakingExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function hireHelper(id) {
    const h = KAYAK_HELPERS.find((x) => x.id === id);
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
      const h = KAYAK_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    return kayakHelperBonus(helpers, skill);
  }

  function challenges() {
    return KAYAK_CHALLENGES.map((ch) => kayakChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = KAYAK_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = kayakChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return KAYAK_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function donateFinds(catchId, qty) {
    const have = system.state.inventory[catchId] || 0;
    if (have < qty || qty <= 0) return { ok: false, reason: 'not-enough', have };
    system.state.inventory[catchId] -= qty;
    const rep = Math.floor(qty / 5);
    return { ok: true, qty, rep, note: 'The river keepers thank you. The current remembers.' };
  }

  function bundleSale(catchId, qty) {
    const have = system.state.inventory[catchId] || 0;
    if (have < qty || qty < 10) return { ok: false, reason: 'need-10-plus', have };
    const unit = kayakPriceFor(catchId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(unit * qty * 1.1 * 10) / 10;
    system.state.inventory[catchId] -= qty;
    system.state.findsSold += qty;
    system.state.earned += total;
    return { ok: true, total, qty, bonus: 'bundle +10%' };
  }

  function checkStamina() {
    const max = kayakStaminaMax(system.state.upgrades);
    return {
      resource: Math.round(system.state.resource * 10) / 10,
      max,
      pct: Math.round((system.state.resource / max) * 100),
    };
  }

  function restUp() {
    system.state.resource = kayakStaminaMax(system.state.upgrades);
    return { ok: true, resource: system.state.resource };
  }

  function weighCatch() {
    let kg = 0;
    for (const [id, qty] of Object.entries(system.state.inventory)) {
      const f = KAYAK_CATCHES.find((x) => x.id === id);
      if (f) kg += f.weight * qty;
    }
    return { kg: Math.round(kg * 10) / 10, cap: kayakCarryCap(system.state.upgrades) };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, donateFinds, bundleSale,
    checkStamina, restUp, weighCatch,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return helperWagesPaid; },
  };
}

export function createKayakingMarket(system) {
  let currentEvent = null;
  let currentSeason = 'spring';
  let dealsClaimed = 0;
  let bulkSold = 0;

  function setEvent(eventId) {
    const ev = KAYAK_MARKET.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = KAYAK_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    system.state.season = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(catchId, basePrice) {
    let price = basePrice;
    price *= kayakEventMult(currentEvent, catchId);
    price *= kayakSeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(catchId, qty) {
    const have = system.state.inventory[catchId] || 0;
    if (have < qty || qty < 20) return { ok: false, reason: 'need-20-plus', have };
    const unit = kayakPriceFor(catchId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(eventPrice(catchId, unit) * qty * 1.1 * 10) / 10;
    system.state.inventory[catchId] -= qty;
    system.state.findsSold += qty;
    system.state.earned += total;
    bulkSold += qty;
    dealsClaimed += 1;
    return { ok: true, total, qty, bonus: 'bulk +10%' };
  }

  function dailyDeals() {
    const deals = [];
    for (const f of KAYAK_CATCHES) {
      const mult = kayakEventMult(currentEvent, f.id);
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

export const KAYAK_META = {
  system: 'kayaking',
  version: '7c-B2',
  author: 'builder-2',
  dataCount: KAYAK_RIVERS.length,
  findCount: KAYAK_CATCHES.length,
  upgradeCount: KAYAK_UPGRADES.length,
  rankCount: KAYAK_RANKS.length,
};
