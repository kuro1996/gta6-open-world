// Windsurfing — Sana rides the wind off Solara Bay.
// Pay the beach fee, rig the sail, and let the trade wind pull you
// across the water. Sponsors pay for clean moves on film, the crowd
// pays for air — jumps, loops, spocks, and the forward loop that
// only the brave even try. Every gust is a gift you either catch or
// watch sail past, and every catapult into the drink is a lesson
// paid for in bruises. Read the wind before you rig. Trust the fin.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const WINDSURF_SPOTS = [
  { id: 'flatwater-lagoon', name: 'Flatwater Lagoon', fee: 30, difficulty: 1,
    steps: 4, duration: 25, risk: 0, wind: 2, wave: 0,
    desc: 'Glass water, steady breeze, perfect to learn.' },
  { id: 'sunset-shore', name: 'Sunset Shore', fee: 45, difficulty: 1,
    steps: 5, duration: 30, risk: 0, wind: 2, wave: 1,
    desc: 'Golden light and a gentle onshore wind.' },
  { id: 'harbor-mouth', name: 'Harbour Mouth', fee: 60, difficulty: 2,
    steps: 5, duration: 30, risk: 1, wind: 3, wave: 1,
    desc: 'Boats, buoys, and a wind that funnels through.' },
  { id: 'coral-cove', name: 'Coral Cove', fee: 75, difficulty: 2,
    steps: 5, duration: 35, risk: 1, wind: 3, wave: 2,
    desc: 'Turquoise water over a living reef.' },
  { id: 'tradewind-bay', name: 'Tradewind Bay', fee: 95, difficulty: 2,
    steps: 6, duration: 35, risk: 1, wind: 4, wave: 2,
    desc: 'The classic bay: steady wind, long reaches.' },
  { id: 'gusty-point', name: 'Gusty Point', fee: 120, difficulty: 3,
    steps: 6, duration: 40, risk: 2, wind: 4, wave: 2,
    desc: 'Gusts that arrive like a slap.' },
  { id: 'reef-pass', name: 'Reef Pass', fee: 150, difficulty: 3,
    steps: 7, duration: 40, risk: 2, wind: 4, wave: 3,
    desc: 'A narrow pass with a standing wave.' },
  { id: 'wave-break', name: 'Wave Break', fee: 180, difficulty: 4,
    steps: 7, duration: 45, risk: 3, wind: 5, wave: 4,
    desc: 'Real waves, real air, real consequences.' },
  { id: 'storm-beach', name: 'Storm Beach', fee: 210, difficulty: 4,
    steps: 8, duration: 50, risk: 3, wind: 5, wave: 4,
    desc: 'Wind that howls and water that bites.' },
  { id: 'open-ocean', name: 'Open Ocean', fee: 260, difficulty: 5,
    steps: 8, duration: 60, risk: 3, wind: 5, wave: 5,
    desc: 'No land, no mercy, no better feeling.' },
];

export const WINDSURF_MOVES = [
  { id: 'carve-360', name: 'Carve 360', value: 22, rarity: 0.26,
    risk: 0, desc: 'A full turn on the face of the wave.' },
  { id: 'jump', name: 'Jump', value: 32, rarity: 0.18,
    risk: 1, desc: 'Air off the chop, clean landing.' },
  { id: 'duck-jibe', name: 'Duck Jibe', value: 45, rarity: 0.13,
    risk: 1, desc: 'Duck under the sail and turn.' },
  { id: 'speed-run', name: 'Speed Run', value: 60, rarity: 0.1,
    risk: 1, desc: 'Flat out, sail pinned, spray flying.' },
  { id: 'wave-ride', name: 'Wave Ride', value: 75, rarity: 0.08,
    risk: 2, desc: 'Riding the wave like it was made for you.' },
  { id: 'freestyle-spin', name: 'Freestyle Spin', value: 95, rarity: 0.06,
    risk: 2, desc: 'A spin in the air, sail and all.' },
  { id: 'vulcan', name: 'Vulcan', value: 130, rarity: 0.05,
    risk: 2, desc: 'A sliding 180 that looks impossible.' },
  { id: 'spock', name: 'Spock', value: 170, rarity: 0.04,
    risk: 2, desc: 'A full 360 slide, nose to tail.' },
  { id: 'flaka', name: 'Flaka', value: 230, rarity: 0.02,
    risk: 3, desc: 'Sail flying, body spinning, crowd gasping.' },
  { id: 'loop', name: 'Forward Loop', value: 320, rarity: 0.01,
    risk: 3, desc: 'Over the top and around. The big one.' },
];

export const WINDSURF_UPGRADES = [
  { id: 'board', name: 'Carbon Board', cost: 150,
    desc: 'Lighter board, +6 move slots, +30 energy.', effect: 'board-plus' },
  { id: 'sail', name: 'Race Sail', cost: 220,
    desc: 'More power in light wind.', effect: 'power-plus' },
  { id: 'mast', name: 'Stiff Mast', cost: 180,
    desc: 'Holds its shape in the gusts.', effect: 'gust-plus' },
  { id: 'harness', name: 'Pro Harness', cost: 120,
    desc: 'Hook in and rest: +4 move slots.', effect: 'carry-plus' },
  { id: 'wetsuit', name: 'Flex Wetsuit', cost: 140,
    desc: 'Warm and flexible in cold water.', effect: 'warmth' },
  { id: 'helmet', name: 'Impact Helmet', cost: 130,
    desc: 'Hazards hurt half as much.', effect: 'safety' },
  { id: 'gps', name: 'Speed GPS', cost: 400,
    desc: 'Moves pay +20% and are 25% easier to chain.', effect: 'price-plus' },
  { id: 'fin', name: 'Race Fin', cost: 320,
    desc: 'Faster, straighter, higher jumps.', effect: 'speed-plus' },
];

export const WINDSURF_RANKS = [
  { level: 0, name: 'Beach Beginner', xp: 0,
    perk: 'Calm water pays base rate.' },
  { level: 1, name: 'Bay Sailor', xp: 120,
    perk: '+10% move pay.' },
  { level: 2, name: 'Wave Rider', xp: 300,
    perk: 'Wave spots open up.' },
  { level: 3, name: 'Freestyler', xp: 620,
    perk: '+20% move pay, freestyle unlocked.' },
  { level: 4, name: 'Wind Master', xp: 1100,
    perk: '+30% move pay, loops land clean.' },
];

export const WINDSURF_EVENTS = [
  { id: 'tradewind-week', name: 'Tradewind Week',
    desc: 'A week of perfect, steady wind.' },
  { id: 'flat-calm', name: 'Flat Calm',
    desc: 'Not a breath of wind all morning.' },
  { id: 'swell-arrives', name: 'Swell Arrives',
    desc: 'A long-period swell rolls into the bay.' },
  { id: 'squall-line', name: 'Squall Line',
    desc: 'A line of squalls crosses the water.' },
  { id: 'surf-comp', name: 'Surf Competition',
    desc: 'The bay fills with boards and judges.' },
  { id: 'dolphin-day', name: 'Dolphin Day',
    desc: 'Dolphins surf the same waves you do.' },
  { id: 'sunset-session', name: 'Sunset Session',
    desc: 'Everyone stays out for the last light.' },
  { id: 'wind-drops', name: 'Wind Drops',
    desc: 'The wind dies at noon.' },
  { id: 'big-air-day', name: 'Big Air Day',
    desc: 'Gusts to forty knots and brave sailors.' },
  { id: 'glass-morning', name: 'Glass Morning',
    desc: 'The water is a mirror at dawn.' },
];

export const WINDSURF_CONTRACTS = [
  { id: 'jumps-10', name: 'Jump Reel', material: 'jump', qty: 10,
    pay: 360, days: 1, rep: 1,
    desc: 'A sponsor needs ten clean jumps on film.' },
  { id: 'carves-12', name: 'Carve Reel', material: 'carve-360', qty: 12,
    pay: 300, days: 1, rep: 1,
    desc: 'A board brand wants twelve carves.' },
  { id: 'speed-6', name: 'Speed Reel', material: 'speed-run', qty: 6,
    pay: 420, days: 2, rep: 2,
    desc: 'A GPS brand wants six speed runs.' },
  { id: 'spocks-4', name: 'Spock Reel', material: 'spock', qty: 4,
    pay: 700, days: 2, rep: 3,
    desc: 'A freestyle label wants four spocks.' },
  { id: 'loops-2', name: 'Loop Film', material: 'loop', qty: 2,
    pay: 800, days: 3, rep: 4,
    desc: 'A film crew needs two forward loops.' },
  { id: 'mixed-25', name: 'Showreel', material: 'mixed', qty: 25,
    pay: 550, days: 2, rep: 2,
    desc: 'Any twenty-five moves for the season reel.' },
];

export const WINDSURF_CHALLENGES = [
  { id: 'spots-10', name: 'Ten Spots', target: 'sessions', goal: 10, xp: 90,
    desc: 'Finish 10 sessions.' },
  { id: 'moves-100', name: 'Century of Moves', target: 'findsFound', goal: 100, xp: 110,
    desc: 'Land 100 moves.' },
  { id: 'earn-1000', name: 'Grand on the Wind', target: 'earned', goal: 1000, xp: 130,
    desc: 'Earn $1,000 from windsurfing.' },
  { id: 'streak-8', name: 'Clean Eight', target: 'bestStreak', goal: 8, xp: 100,
    desc: 'Eight clean steps in a row.' },
  { id: 'contracts-3', name: 'Reliable Rider', target: 'contractsDone', goal: 3, xp: 120,
    desc: 'Complete 3 sponsor contracts.' },
  { id: 'actions-200', name: 'Two Hundred Moves', target: 'actions', goal: 200, xp: 140,
    desc: 'Take 200 riding steps.' },
  { id: 'first-move', name: 'First Move', target: 'findsFound', goal: 1, xp: 60,
    desc: 'Land your first move.' },
  { id: 'wave-5', name: 'Wave Five', target: 'sessions', goal: 5, xp: 80,
    desc: 'Finish 5 sessions.' },
];

export const WINDSURF_ACHIEVEMENTS = [
  { id: 'first-session', name: 'First Session', check: (s) => s.sessions >= 1,
    desc: 'Finish your first session.' },
  { id: 'loop-club', name: 'Loop Club', check: (s) => (s.inventory.loop || 0) + s.findsSold >= 1,
    desc: 'Land a forward loop.' },
  { id: 'rank-3', name: 'Freestyler', check: (s) => s.rank >= 3,
    desc: 'Reach rank Freestyler.' },
  { id: 'rich-wind', name: 'Wind Rich', check: (s) => s.earned >= 3000,
    desc: 'Earn $3,000 from windsurfing.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8,
    desc: 'Own every windsurfing upgrade.' },
  { id: 'no-hazard', name: 'Dry Sail', check: (s) => s.sessions >= 10 && s.hazardsTaken === 0,
    desc: 'Ten sessions with zero hazards.' },
  { id: 'big-yield', name: 'Big Yield', check: (s) => s.bestSessionYield >= 500,
    desc: 'One session worth $500 or more.' },
  { id: 'moves-50', name: 'Fifty Moves', check: (s) => s.actions >= 50,
    desc: 'Fifty riding steps on the water.' },
];

export const WINDSURF_TIPS = [
  { id: 'wind-first', name: 'Wind First',
    text: 'Read the wind before you rig. The wind decides everything.' },
  { id: 'energy-watch', name: 'Energy Watch',
    text: 'Energy is your session. Rest in the lulls.' },
  { id: 'gps-money', name: 'GPS Money',
    text: 'Sponsors pay for speed numbers. Record everything.' },
  { id: 'gust-catch', name: 'Gust Catch',
    text: 'Catch the gust at its edge, not its middle.' },
  { id: 'wave-read', name: 'Wave Read',
    text: 'Watch three waves before you ride one.' },
  { id: 'contract-first', name: 'Contracts First',
    text: 'Take a sponsor contract, then sail its moves.' },
  { id: 'helmet-early', name: 'Helmet Early',
    text: 'Buy the helmet before the wave spots.' },
  { id: 'harness-rest', name: 'Harness Rest',
    text: 'Hook in and let the harness carry the sail.' },
];

export const WINDSURF_LEADERBOARD = [
  { name: 'Kai the King', value: 8800, desc: 'Loops in his sleep, allegedly.' },
  { name: 'Mara', value: 6600, desc: 'Freestyle queen of the bay.' },
  { name: 'Sana', value: 0, desc: 'You. Climbing.' },
  { name: 'Jett', value: 3900, desc: 'Fastest speed run in the bay.' },
  { name: 'Pip', value: 2000, desc: 'Young, fearless, often wet.' },
];

export const WINDSURF_RECORDS = [
  { id: 'most-sessions', name: 'Most Sessions', stat: 'sessions', unit: 'sessions',
    desc: 'Most sessions finished.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$',
    desc: 'Most money earned from windsurfing.' },
  { id: 'most-moves', name: 'Most Moves', stat: 'findsFound', unit: 'moves',
    desc: 'Most moves landed.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'steps',
    desc: 'Longest clean streak.' },
  { id: 'best-session', name: 'Best Session', stat: 'bestSessionYield', unit: '$',
    desc: 'Best single-session yield.' },
];

export const WINDSURF_MARKET = [
  { id: 'jump-boom', name: 'Jump Boom', finds: ['jump'], mult: 1.35,
    desc: 'A sponsor wants jump footage.' },
  { id: 'loop-rush', name: 'Loop Rush', finds: ['loop'], mult: 1.6,
    desc: 'A film crew pays double for loops.' },
  { id: 'spock-week', name: 'Spock Week', finds: ['spock'], mult: 1.45,
    desc: 'Freestyle labels want spocks.' },
  { id: 'wave-season', name: 'Wave Season', finds: ['wave-ride'], mult: 1.4,
    desc: 'Wave riders are in demand.' },
  { id: 'speed-day', name: 'Speed Day', finds: ['speed-run'], mult: 1.35,
    desc: 'GPS brands are bidding up speed.' },
  { id: 'flaka-film', name: 'Flaka Film', finds: ['flaka'], mult: 1.5,
    desc: 'A magazine wants flaka shots.' },
  { id: 'carve-glut', name: 'Carve Glut', finds: ['carve-360'], mult: 0.7,
    desc: 'Everyone carves; sponsors yawn.' },
  { id: 'jibe-dip', name: 'Jibe Dip', finds: ['duck-jibe'], mult: 0.75,
    desc: 'Duck jibes are out of fashion.' },
];

export const WINDSURF_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1,
    desc: 'Fresh winds and full bookings.' },
  { id: 'summer', name: 'Summer', mult: 1.2,
    desc: 'Peak season, everyone is sailing.' },
  { id: 'autumn', name: 'Autumn', mult: 1.0,
    desc: 'Steady work, thinner crowds.' },
  { id: 'winter', name: 'Winter', mult: 0.85,
    desc: 'Cold water, quiet days.' },
];

export const WINDSURF_SEASONAL = [
  { season: 'summer', find: 'wave-ride', mult: 1.3 },
  { season: 'summer', find: 'jump', mult: 1.25 },
  { season: 'spring', find: 'speed-run', mult: 1.2 },
  { season: 'autumn', find: 'loop', mult: 1.35 },
  { season: 'autumn', find: 'flaka', mult: 1.3 },
  { season: 'winter', find: 'freestyle-spin', mult: 1.25 },
  { season: 'winter', find: 'spock', mult: 1.3 },
  { season: 'spring', find: 'carve-360', mult: 1.15 },
];

export const WINDSURF_QUICK_START = [
  'Sail the lagoon first and learn your energy burn.',
  'Film every move — sponsors pay for footage.',
  'Buy the harness before the wave spots.',
  'Read the wind before you rig.',
  'Take sponsor contracts for moves you already land.',
  'Save for the carbon board — it changes every session.',
];

export const WINDSURF_HELPERS = [
  { id: 'coach', name: 'Mara the Coach', wage: 35, skill: 'collect', bonus: 0.15,
    desc: 'Coaching from the beach: +15% move yield.' },
  { id: 'cameraman', name: 'Jett the Cameraman', wage: 45, skill: 'find', bonus: 0.25,
    desc: 'Films from the boat: +25% rare moves.' },
  { id: 'rigger', name: 'Pip the Rigger', wage: 55, skill: 'carry', bonus: 0.4,
    desc: 'Rigs fast: +40% move slots.' },
  { id: 'agent', name: 'Quiet Ana', wage: 75, skill: 'sell', bonus: 0.12,
    desc: 'Knows the sponsors: +12% move pay.' },
];

export function windsurfRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < WINDSURF_RANKS.length; i++) {
    if (xp >= WINDSURF_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function windsurfPriceFor(moveId, dayDrift, rank, upgrades) {
  const f = WINDSURF_MOVES.find((x) => x.id === moveId);
  if (!f) return 0;
  let price = f.value;
  price *= 1 + (dayDrift[moveId] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('gps')) price *= 1.2;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function windsurfCarryCap(upgrades) {
  let cap = 12;
  if (upgrades.includes('harness')) cap += 4;
  if (upgrades.includes('board')) cap += 6;
  return cap;
}

export function windsurfEnergyMax(upgrades) {
  let max = 100;
  if (upgrades.includes('board')) max += 30;
  return max;
}

export function windsurfEventMult(eventId, moveId) {
  const ev = WINDSURF_MARKET.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.finds.includes(moveId) ? ev.mult : 1;
}

export function windsurfSeasonMult(seasonId) {
  const s = WINDSURF_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function windsurfEventFor(day) {
  return WINDSURF_MARKET[day % WINDSURF_MARKET.length];
}

export function windsurfSeasonalPriceMult(seasonId, moveId) {
  const row = WINDSURF_SEASONAL.find((x) => x.season === seasonId && x.find === moveId);
  return row ? row.mult : 1;
}

export function windsurfBestSeason(moveId) {
  let best = null;
  let bestMult = 0;
  for (const row of WINDSURF_SEASONAL) {
    if (row.find === moveId && row.mult > bestMult) { bestMult = row.mult; best = row.season; }
  }
  return best ? { season: best, mult: bestMult } : null;
}

export function windsurfBestBuyer(moveId, dayDrift, rank, upgrades) {
  const base = windsurfPriceFor(moveId, dayDrift, rank, upgrades);
  return { price: base, note: 'Sponsors pay best for filmed moves in strong wind.' };
}

export function windsurfScore(sessions, yieldTotal, hazards) {
  const base = sessions * 10 + Math.round(yieldTotal);
  const penalty = hazards * 5;
  return Math.max(0, base - penalty);
}

export function windsurfGrade(sessions, yieldTotal, hazards) {
  const score = windsurfScore(sessions, yieldTotal, hazards);
  if (score >= 400) return 'S';
  if (score >= 250) return 'A';
  if (score >= 140) return 'B';
  if (score >= 60) return 'C';
  return 'D';
}

export function windsurfWeeklyGoal(sessions, sold, earned) {
  const goal = { sessions: 5, sold: 40, earned: 600 };
  return {
    sessions: { have: sessions, goal: goal.sessions, done: sessions >= goal.sessions },
    sold: { have: sold, goal: goal.sold, done: sold >= goal.sold },
    earned: { have: Math.round(earned), goal: goal.earned, done: earned >= goal.earned },
    allDone: sessions >= goal.sessions && sold >= goal.sold && earned >= goal.earned,
  };
}

export function windsurfTipFor(day) {
  return WINDSURF_TIPS[day % WINDSURF_TIPS.length];
}

export function windsurfLeaderboardWith(playerValue) {
  const board = WINDSURF_LEADERBOARD.map((e) => ({
    name: e.name, value: e.name === 'Sana' ? playerValue : e.value, desc: e.desc,
  }));
  board.sort((a, b) => b.value - a.value);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function windsurfRecordFor(recordId, state) {
  const r = WINDSURF_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function windsurfAllRecords(state) {
  return WINDSURF_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function windsurfEfficiency(actions, hazards) {
  const total = actions + hazards;
  if (total === 0) return 100;
  return Math.round((actions / total) * 100);
}

export function windsurfProfitPerSession(earned, sessions) {
  if (sessions === 0) return 0;
  return Math.round((earned / sessions) * 10) / 10;
}

export function windsurfInventoryValue(inventory) {
  let total = 0;
  for (const [id, qty] of Object.entries(inventory)) {
    const f = WINDSURF_MOVES.find((x) => x.id === id);
    if (f) total += f.value * qty;
  }
  return Math.round(total * 10) / 10;
}

export function windsurfTotalValue(state) {
  return windsurfInventoryValue(state.inventory);
}

export function windsurfProgressPercent(state) {
  const total = state.actions + state.findsSold;
  if (total === 0) return 0;
  return Math.round((state.actions / total) * 100);
}

export function windsurfQuickStart(step) {
  return WINDSURF_QUICK_START[step] || null;
}

export function windsurfSummary(state) {
  return `Windsurfing ${WINDSURF_RANKS[state.rank].name}: ${state.sessions} sessions, ${state.actions} moves, $${Math.round(state.earned)} earned, ${state.findsFound} moves landed.`;
}

export function windsurfNextGoal(state) {
  if (state.sessions < 3) return 'Sail 3 spots.';
  if (state.actions < 50) return 'Land 50 moves.';
  if (state.rank < 2) return 'Reach rank Wave Rider.';
  return 'Become the Wind Master.';
}

export function windsurfChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function windsurfHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of WINDSURF_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function windsurfSpotByWind(wind) {
  let best = null;
  for (const s of WINDSURF_SPOTS) {
    if (s.wind <= wind && (!best || s.wind > best.wind)) best = s;
  }
  return best;
}

export function windsurfMovesByRarity(maxRarity) {
  return WINDSURF_MOVES.filter((f) => f.rarity <= maxRarity).map((f) => f.id);
}

export function createWindsurfingSystem(ctx) {
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
  for (const f of WINDSURF_MOVES) { state.inventory[f.id] = 0; state.dayDrift[f.id] = 0; }

  function refreshRank() {
    const r = windsurfRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Windsurfing rank up: ${WINDSURF_RANKS[r].name} — ${WINDSURF_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const f of WINDSURF_MOVES) {
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

  function pickMove(spot) {
    const bag = [];
    for (const f of WINDSURF_MOVES) {
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
    return WINDSURF_MOVES[0];
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
    log(`Windsurfing ${done} ${reason} — yield $${Math.round(state.sessionYield)}, ${state.sessionFinds} moves.`);
    state.sessionYield = 0;
    state.sessionFinds = 0;
  }

  function launch(spotId) {
    const spot = WINDSURF_SPOTS.find((s) => s.id === spotId);
    if (!spot) return { ok: false, reason: 'no-such-site' };
    if (state.session) return { ok: false, reason: 'session-active' };
    if (weatherBlocks()) {
      state.weatherStops += 1;
      return { ok: false, reason: 'bad-weather', condition: weather() };
    }
    const hour = getHour();
    if (hour < 8 || hour >= 18) return { ok: false, reason: 'too-late', hour };
    if (getCash() < spot.fee) return { ok: false, reason: 'not-enough-cash', cost: spot.fee };
    if (spot.fee > 0) { addCash(-spot.fee); state.spent += spot.fee; }
    state.session = spotId;
    state.sessionStepsLeft = spot.steps;
    state.sessionTimeLeft = spot.duration * 60;
    state.resource = windsurfEnergyMax(state.upgrades);
    log(`Windsurfing started: ${spot.name} — ${spot.steps} moves, ${spot.duration} min, wind ${spot.wind}, waves ${spot.wave}.`);
    return { ok: true, site: spotId, steps: spot.steps, duration: spot.duration };
  }

  function rideWave() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    if (state.sessionStepsLeft <= 0) return { ok: false, reason: 'session-done' };
    const spot = WINDSURF_SPOTS.find((s) => s.id === state.session);
    state.resource -= 8;
    if (state.resource < 0) state.resource = 0;
    const cap = windsurfCarryCap(state.upgrades);
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held >= cap) return { ok: false, reason: 'carry-full', cap };
    const f = pickMove(spot);
    const qty = 1 + Math.floor(rng() * 2);
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
    if (rng() < 0.05 + (state.rank >= 4 ? 0.05 : 0)) {
      const rare = WINDSURF_MOVES.filter((x) => x.rarity < 0.06);
      const pick = rare[Math.floor(rng() * rare.length)];
      state.inventory[pick.id] += 1;
      state.findsFound += 1;
      state.sessionYield += pick.value;
      state.totalYield += pick.value;
      got.push({ id: pick.id, name: pick.name, qty: 1, value: pick.value, rare: true });
      log(`Windsurfing rare move! ${pick.name} worth $${pick.value}.`);
    }
    if (rng() < spot.risk * 0.04) {
      state.hazardsTaken += 1;
      state.streak = 0;
      state.resource -= 15;
      if (rng() < 0.25) { addCash(-20); state.spent += 20; }
      log(`Windsurfing hazard at ${spot.name}: a gust catapulted you over the sail and into the drink.`);
    }
    if (state.resource <= 0) {
      finishSession('cut short — energy ran out');
      return { ok: true, got, stepsLeft: 0, ended: 'resource-empty' };
    }
    if (state.sessionStepsLeft <= 0) {
      finishSession('finished');
      return { ok: true, got, stepsLeft: 0, ended: 'done' };
    }
    return { ok: true, got, stepsLeft: state.sessionStepsLeft, resource: state.resource };
  }

  function beachEarly() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    finishSession('ended early');
    return { ok: true, ended: 'early' };
  }

  function catchGust() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    const cost = 12;
    if (state.resource < cost) return { ok: false, reason: 'not-enough-resource', need: cost };
    state.resource -= cost;
    state.specialsUsed += 1;
    if (rng() < 0.55) {
      const f = pickMove(WINDSURF_SPOTS[0]);
      state.inventory[f.id] += 1;
      state.findsFound += 1;
      state.sessionYield += f.value;
      gainXp(10);
      log(`Windsurfing catch gust: caught a perfect gust and rode past ${f.name}.`);
      return { ok: true, success: true, find: f.id, name: f.name };
    }
    log('Windsurfing catch gust: the gust died before you could use it.');
    return { ok: true, success: false };
  }

  function sellFind(moveId, qty) {
    const f = WINDSURF_MOVES.find((x) => x.id === moveId);
    if (!f) return { ok: false, reason: 'no-such-find' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = state.inventory[moveId] || 0;
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = windsurfPriceFor(moveId, state.dayDrift, state.rank, state.upgrades);
    const total = Math.round(unit * qty * 10) / 10;
    state.inventory[moveId] -= qty;
    state.findsSold += qty;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(qty);
    log(`Cashed in ${qty}x ${f.name} for $${total}.`);
    return { ok: true, total, unit, qty };
  }

  function sellAllFinds() {
    let total = 0;
    let units = 0;
    const lines = [];
    for (const f of WINDSURF_MOVES) {
      const have = state.inventory[f.id] || 0;
      if (have <= 0) continue;
      const unit = windsurfPriceFor(f.id, state.dayDrift, state.rank, state.upgrades);
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
    log(`Cashed in everything (${units} moves) for $${total}.`);
    return { ok: true, total, units, lines };
  }

  function buyUpgrade(id) {
    const u = WINDSURF_UPGRADES.find((x) => x.id === id);
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
    const ct = WINDSURF_CONTRACTS.find((x) => x.id === id);
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
      for (const f of WINDSURF_MOVES) {
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
    return WINDSURF_MOVES.map((f) => ({
      id: f.id,
      name: f.name,
      price: windsurfPriceFor(f.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[f.id],
      held: state.inventory[f.id],
    }));
  }

  function siteReport() {
    return WINDSURF_SPOTS.map((s) => ({
      id: s.id, name: s.name, fee: s.fee, difficulty: s.difficulty, steps: s.steps, risk: s.risk,
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.16) {
      const f = WINDSURF_MOVES[Math.floor(rng() * WINDSURF_MOVES.length)];
      state.dayDrift[f.id] = Math.round((state.dayDrift[f.id] + 0.3) * 100) / 100;
      log(`Windsurfing news: ${f.name} is in demand — sponsors pay up today!`);
      return { event: 'demand-spike', find: f.id };
    }
    if (roll < 0.28) {
      const f = WINDSURF_MOVES[Math.floor(rng() * WINDSURF_MOVES.length)];
      state.dayDrift[f.id] = Math.round((state.dayDrift[f.id] - 0.15) * 100) / 100;
      log(`Windsurfing news: too much ${f.name} around — sponsors pay less.`);
      return { event: 'price-dip', find: f.id };
    }
    if (roll < 0.38) {
      const f = WINDSURF_MOVES[Math.floor(rng() * WINDSURF_MOVES.length)];
      state.inventory[f.id] += 3;
      state.findsFound += 3;
      log(`Windsurfing gift: a coach gifts you 3x ${f.name} on film.`);
      return { event: 'gift', find: f.id };
    }
    if (roll < 0.46) {
      const ev = WINDSURF_EVENTS[Math.floor(rng() * WINDSURF_EVENTS.length)];
      log(`Windsurfing event: ${ev.name} — ${ev.desc}`);
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
        finishSession('cut short — energy ran out');
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
    for (const f of WINDSURF_MOVES) {
      if (state.inventory[f.id] === undefined) state.inventory[f.id] = 0;
      if (state.dayDrift[f.id] === undefined) state.dayDrift[f.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: WINDSURF_RANKS[state.rank].name,
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
      resourceMax: windsurfEnergyMax(state.upgrades),
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
    if (state.session) return `Windsurfing: ${state.session} — ${state.sessionStepsLeft} moves left, energy ${Math.round(state.resource)}`;
    if (state.activeContract) return `Windsurfing: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held > 0) return `Windsurfing: ${held} moves on film`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const near = Math.hypot(pos.x - (-420), pos.z - 300) < 30;
    if (!near) return false;
    if (state.session) { rideWave(); return true; }
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held > 0) { sellAllFinds(); return true; }
    launch(WINDSURF_SPOTS[0].id);
    return true;
  }

  return {
    name: 'Windsurfing',
    state,
    launch, rideWave, beachEarly, catchGust,
    sellFind, sellAllFinds, buyUpgrade, takeContract,
    deliverContract, abandonContract, priceBoard, siteReport,
    dailyEvent, tick, tickDay, serialize, deserialize,
    stats, hudLine, interact,
  };
}

export function createWindsurfingExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function hireHelper(id) {
    const h = WINDSURF_HELPERS.find((x) => x.id === id);
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
      const h = WINDSURF_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    return windsurfHelperBonus(helpers, skill);
  }

  function challenges() {
    return WINDSURF_CHALLENGES.map((ch) => windsurfChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = WINDSURF_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = windsurfChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return WINDSURF_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function donateFinds(moveId, qty) {
    const have = system.state.inventory[moveId] || 0;
    if (have < qty || qty <= 0) return { ok: false, reason: 'not-enough', have };
    system.state.inventory[moveId] -= qty;
    const rep = Math.floor(qty / 5);
    return { ok: true, qty, rep, note: 'The surf club thanks you. The wind remembers.' };
  }

  function bundleSale(moveId, qty) {
    const have = system.state.inventory[moveId] || 0;
    if (have < qty || qty < 10) return { ok: false, reason: 'need-10-plus', have };
    const unit = windsurfPriceFor(moveId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(unit * qty * 1.1 * 10) / 10;
    system.state.inventory[moveId] -= qty;
    system.state.findsSold += qty;
    system.state.earned += total;
    return { ok: true, total, qty, bonus: 'bundle +10%' };
  }

  function checkEnergy() {
    const max = windsurfEnergyMax(system.state.upgrades);
    return {
      resource: Math.round(system.state.resource * 10) / 10,
      max,
      pct: Math.round((system.state.resource / max) * 100),
    };
  }

  function restUp() {
    system.state.resource = windsurfEnergyMax(system.state.upgrades);
    return { ok: true, resource: system.state.resource };
  }

  function countMoves() {
    const held = Object.values(system.state.inventory).reduce((a, b) => a + b, 0);
    return { moves: held, cap: windsurfCarryCap(system.state.upgrades) };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, donateFinds, bundleSale,
    checkEnergy, restUp, countMoves,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return helperWagesPaid; },
  };
}

export function createWindsurfingMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkSold = 0;

  function setEvent(eventId) {
    const ev = WINDSURF_MARKET.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = WINDSURF_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    system.state.season = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(moveId, basePrice) {
    let price = basePrice;
    price *= windsurfEventMult(currentEvent, moveId);
    price *= windsurfSeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(moveId, qty) {
    const have = system.state.inventory[moveId] || 0;
    if (have < qty || qty < 20) return { ok: false, reason: 'need-20-plus', have };
    const unit = windsurfPriceFor(moveId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(eventPrice(moveId, unit) * qty * 1.1 * 10) / 10;
    system.state.inventory[moveId] -= qty;
    system.state.findsSold += qty;
    system.state.earned += total;
    bulkSold += qty;
    dealsClaimed += 1;
    return { ok: true, total, qty, bonus: 'bulk +10%' };
  }

  function dailyDeals() {
    const deals = [];
    for (const f of WINDSURF_MOVES) {
      const mult = windsurfEventMult(currentEvent, f.id);
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

export const WINDSURFING_META = {
  system: 'windsurfing',
  version: '7c-B2',
  author: 'builder-2',
  dataCount: WINDSURF_SPOTS.length,
  findCount: WINDSURF_MOVES.length,
  upgradeCount: WINDSURF_UPGRADES.length,
  rankCount: WINDSURF_RANKS.length,
};
