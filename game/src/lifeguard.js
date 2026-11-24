// Lifeguard — Mira watches the beaches of Solara Bay from the tower.
// Walk the sand, scan the water, and answer every whistle before it
// becomes a siren. Tired swimmers, lost children, jellyfish stings,
// rip currents that take three at once — the beach trust pays for
// every rescue you log, and the town remembers the guards who never
// let a swimmer go under. Trouble is quiet. Scan the water every
// two minutes, drink water, and trust the flags even when nobody else
// does. The sun does not care that you are busy.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const BEACH_PATROLS = [
  { id: 'sunny-sands', name: 'Sunny Sands', fee: 0, difficulty: 1,
    steps: 4, duration: 30, risk: 0, length: 2, swimmers: 120,
    desc: 'The main beach. Families, umbrellas, calm water.' },
  { id: 'family-bay', name: 'Family Bay', fee: 0, difficulty: 1,
    steps: 5, duration: 30, risk: 0, length: 2, swimmers: 150,
    desc: 'Shallow and safe, full of small children.' },
  { id: 'palm-beach', name: 'Palm Beach', fee: 0, difficulty: 1,
    steps: 5, duration: 35, risk: 1, length: 3, swimmers: 100,
    desc: 'Palms, shade, and a gentle shore break.' },
  { id: 'hidden-lagoon', name: 'Hidden Lagoon', fee: 0, difficulty: 2,
    steps: 5, duration: 35, risk: 1, length: 2, swimmers: 60,
    desc: 'A quiet lagoon behind the rocks.' },
  { id: 'coral-sands', name: 'Coral Sands', fee: 0, difficulty: 2,
    steps: 6, duration: 40, risk: 1, length: 3, swimmers: 90,
    desc: 'White sand over a shallow reef.' },
  { id: 'kite-beach', name: 'Kite Beach', fee: 0, difficulty: 2,
    steps: 6, duration: 40, risk: 2, length: 4, swimmers: 80,
    desc: 'Kites overhead, strong wind, strong current.' },
  { id: 'turtle-cove', name: 'Turtle Cove', fee: 0, difficulty: 3,
    steps: 6, duration: 45, risk: 2, length: 3, swimmers: 70,
    desc: 'Turtles nest here. Swimmers drift out fast.' },
  { id: 'rocky-shore', name: 'Rocky Shore', fee: 0, difficulty: 3,
    steps: 7, duration: 45, risk: 2, length: 4, swimmers: 50,
    desc: 'Rocks, urchins, and a deceptive undertow.' },
  { id: 'surfers-point', name: 'Surfers’ Point', fee: 0, difficulty: 4,
    steps: 7, duration: 50, risk: 3, length: 5, swimmers: 110,
    desc: 'Big surf, strong rips, brave swimmers.' },
  { id: 'moonlight-bay', name: 'Moonlight Bay', fee: 0, difficulty: 5,
    steps: 8, duration: 60, risk: 3, length: 6, swimmers: 40,
    desc: 'Night patrols. Dark water, cold wind, few swimmers.' },
];

export const LIFEGUARD_RESCUES = [
  { id: 'tired-swimmer', name: 'Tired Swimmer', value: 20, rarity: 0.26,
    risk: 0, desc: 'Tired arms, fifty metres out. An easy tow.' },
  { id: 'cramp', name: 'Leg Cramp', value: 28, rarity: 0.18,
    risk: 0, desc: 'A cramp in deep water, quickly sorted.' },
  { id: 'jellyfish-sting', name: 'Jellyfish Sting', value: 35, rarity: 0.13,
    risk: 1, desc: 'Vinegar, calm words, and a cold pack.' },
  { id: 'sunstroke', name: 'Sunstroke', value: 45, rarity: 0.1,
    risk: 1, desc: 'Shade, water, and a slow walk to the tent.' },
  { id: 'lost-child', name: 'Lost Child', value: 60, rarity: 0.08,
    risk: 0, desc: 'Found by the ice-cream stand, crying, safe.' },
  { id: 'rip-current', name: 'Rip Current Rescue', value: 90, rarity: 0.06,
    risk: 2, desc: 'Three swimmers caught in the rip.' },
  { id: 'capsized-kayak', name: 'Capsized Kayak', value: 120, rarity: 0.05,
    risk: 2, desc: 'Two kayakers in the water, boat upside down.' },
  { id: 'broken-board', name: 'Broken Board Rescue', value: 150, rarity: 0.04,
    risk: 2, desc: 'A snapped board and a surfer in the impact zone.' },
  { id: 'undertow', name: 'Undertow Rescue', value: 200, rarity: 0.02,
    risk: 3, desc: 'The undertow took a strong swimmer by surprise.' },
  { id: 'stranded-dog', name: 'Stranded Dog', value: 260, rarity: 0.01,
    risk: 1, desc: 'A dog on the far rocks, too scared to swim back.' },
];

export const LIFEGUARD_UPGRADES = [
  { id: 'tower', name: 'High Tower', cost: 100,
    desc: 'See further: +10 rescue slots per shift.', effect: 'carry-plus' },
  { id: 'binoculars', name: 'Pro Binoculars', cost: 160,
    desc: 'Spot trouble early: +25% rare rescues.', effect: 'find-plus' },
  { id: 'rescue-board', name: 'Rescue Board', cost: 200,
    desc: 'Reach swimmers twice as fast.', effect: 'speed-plus' },
  { id: 'radio', name: 'Beach Radio', cost: 180,
    desc: 'Coordinate with every tower at once.', effect: 'coord-plus' },
  { id: 'first-aid', name: 'First Aid Kit', cost: 220,
    desc: 'Treat stings and cramps on the spot.', effect: 'care-plus' },
  { id: 'drone', name: 'Watch Drone', cost: 500,
    desc: 'Eyes over the whole beach: rescues pay +20%.', effect: 'price-plus' },
  { id: 'jetski', name: 'Rescue Jet Ski', cost: 700,
    desc: 'Energy lasts +40, carry +15.', effect: 'energy-plus' },
  { id: 'defibrillator', name: 'Defibrillator', cost: 650,
    desc: 'For the worst days. Worth every cent.', effect: 'life-plus' },
];

export const LIFEGUARD_RANKS = [
  { level: 0, name: 'Trainee Guard', xp: 0,
    perk: 'Calm beaches pay base rate.' },
  { level: 1, name: 'Beach Guard', xp: 120,
    perk: '+10% rescue pay.' },
  { level: 2, name: 'Senior Guard', xp: 300,
    perk: 'Busy beaches open up.' },
  { level: 3, name: 'Head Guard', xp: 620,
    perk: '+20% rescue pay, night patrols unlocked.' },
  { level: 4, name: 'Beach Captain', xp: 1100,
    perk: '+30% rescue pay, rare rescues doubled.' },
];

export const LIFEGUARD_EVENTS = [
  { id: 'school-holiday', name: 'School Holiday',
    desc: 'The beach is full of children by nine.' },
  { id: 'heatwave', name: 'Heatwave',
    desc: 'Forty degrees and everyone is in the water.' },
  { id: 'jellyfish-season', name: 'Jellyfish Season',
    desc: 'Jellies drift in with the tide.' },
  { id: 'surf-comp', name: 'Surf Competition',
    desc: 'The point is packed with surfers.' },
  { id: 'beach-clean', name: 'Beach Clean',
    desc: 'Volunteers comb the sand at dawn.' },
  { id: 'rip-warning', name: 'Rip Warning',
    desc: 'The flags go up: strong rips today.' },
  { id: 'turtle-nesting', name: 'Turtle Nesting',
    desc: 'Turtles come ashore to lay at night.' },
  { id: 'storm-surge', name: 'Storm Surge',
    desc: 'Big surf pushes everyone to the shore.' },
  { id: 'calm-day', name: 'Calm Day',
    desc: 'A rare quiet day on the sand.' },
  { id: 'festival-beach', name: 'Beach Festival',
    desc: 'Music, food stalls, and ten thousand visitors.' },
];

export const LIFEGUARD_CONTRACTS = [
  { id: 'tired-12', name: 'Tow Duty', material: 'tired-swimmer', qty: 12,
    pay: 280, days: 1, rep: 1,
    desc: 'The trust wants twelve tired swimmers towed in.' },
  { id: 'stings-8', name: 'Sting Duty', material: 'jellyfish-sting', qty: 8,
    pay: 320, days: 2, rep: 2,
    desc: 'Treat eight stings before the weekend ends.' },
  { id: 'rips-5', name: 'Rip Watch', material: 'rip-current', qty: 5,
    pay: 520, days: 2, rep: 3,
    desc: 'Five rip rescues, logged and filed.' },
  { id: 'kayaks-4', name: 'Kayak Watch', material: 'capsized-kayak', qty: 4,
    pay: 560, days: 2, rep: 2,
    desc: 'Four capsized kayaks righted and towed.' },
  { id: 'children-6', name: 'Lost and Found', material: 'lost-child', qty: 6,
    pay: 420, days: 2, rep: 2,
    desc: 'Six lost children found and reunited.' },
  { id: 'mixed-30', name: 'Beach Log', material: 'mixed', qty: 30,
    pay: 600, days: 2, rep: 2,
    desc: 'Any thirty rescues for the trust’s log.' },
];

export const LIFEGUARD_CHALLENGES = [
  { id: 'patrols-10', name: 'Ten Patrols', target: 'sessions', goal: 10, xp: 90,
    desc: 'Finish 10 patrols.' },
  { id: 'rescues-100', name: 'Century of Rescues', target: 'findsFound', goal: 100, xp: 110,
    desc: 'Complete 100 rescues.' },
  { id: 'earn-1000', name: 'Grand on the Beach', target: 'earned', goal: 1000, xp: 130,
    desc: 'Earn $1,000 from lifeguarding.' },
  { id: 'streak-8', name: 'Clean Eight', target: 'bestStreak', goal: 8, xp: 100,
    desc: 'Eight clean steps in a row.' },
  { id: 'contracts-3', name: 'Reliable Guard', target: 'contractsDone', goal: 3, xp: 120,
    desc: 'Complete 3 trust contracts.' },
  { id: 'actions-200', name: 'Two Hundred Responses', target: 'actions', goal: 200, xp: 140,
    desc: 'Take 200 response steps.' },
  { id: 'first-rescue', name: 'First Rescue', target: 'findsFound', goal: 1, xp: 60,
    desc: 'Complete your first rescue.' },
  { id: 'night-5', name: 'Night Five', target: 'sessions', goal: 5, xp: 80,
    desc: 'Finish 5 patrols.' },
];

export const LIFEGUARD_ACHIEVEMENTS = [
  { id: 'first-patrol', name: 'First Patrol', check: (s) => s.sessions >= 1,
    desc: 'Finish your first patrol.' },
  { id: 'dog-club', name: 'Dog Club', check: (s) => (s.inventory['stranded-dog'] || 0) + s.findsSold >= 1,
    desc: 'Rescue the stranded dog.' },
  { id: 'rank-3', name: 'Head Guard', check: (s) => s.rank >= 3,
    desc: 'Reach rank Head Guard.' },
  { id: 'rich-beach', name: 'Beach Rich', check: (s) => s.earned >= 3000,
    desc: 'Earn $3,000 from lifeguarding.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8,
    desc: 'Own every lifeguard upgrade.' },
  { id: 'no-hazard', name: 'Calm Water', check: (s) => s.sessions >= 10 && s.hazardsTaken === 0,
    desc: 'Ten patrols with zero hazards.' },
  { id: 'big-yield', name: 'Big Yield', check: (s) => s.bestSessionYield >= 500,
    desc: 'One patrol worth $500 or more.' },
  { id: 'responses-50', name: 'Fifty Responses', check: (s) => s.actions >= 50,
    desc: 'Fifty response steps on the beach.' },
];

export const LIFEGUARD_TIPS = [
  { id: 'scan-first', name: 'Scan First',
    text: 'Scan the water every two minutes. Trouble is quiet.' },
  { id: 'energy-watch', name: 'Energy Watch',
    text: 'Energy is your shift. Rest between whistles.' },
  { id: 'binoculars-money', name: 'Binoculars Money',
    text: 'Spot trouble early and the rescue is easy.' },
  { id: 'rip-read', name: 'Rip Read',
    text: 'Learn the rip: dark water, no waves, moving out.' },
  { id: 'flags-matter', name: 'Flags Matter',
    text: 'Swimmers ignore flags. Guards do not.' },
  { id: 'contract-first', name: 'Contracts First',
    text: 'Take a trust contract, then patrol its beach.' },
  { id: 'drone-early', name: 'Drone Early',
    text: 'Save for the watch drone — it sees everything.' },
  { id: 'hydration', name: 'Hydration',
    text: 'Drink water. The sun does not care that you are busy.' },
];

export const LIFEGUARD_LEADERBOARD = [
  { name: 'Old Marta', value: 9200, desc: 'Forty summers on the tower.' },
  { name: 'Dario', value: 7100, desc: 'Never lost a swimmer.' },
  { name: 'Mira', value: 0, desc: 'You. Climbing.' },
  { name: 'Sana', value: 4200, desc: 'Fastest board in the bay.' },
  { name: 'Pip', value: 2300, desc: 'Young, keen, always first in.' },
];

export const LIFEGUARD_RECORDS = [
  { id: 'most-patrols', name: 'Most Patrols', stat: 'sessions', unit: 'patrols',
    desc: 'Most patrols finished.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$',
    desc: 'Most money earned from lifeguarding.' },
  { id: 'most-rescues', name: 'Most Rescues', stat: 'findsFound', unit: 'rescues',
    desc: 'Most rescues completed.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'steps',
    desc: 'Longest clean streak.' },
  { id: 'best-patrol', name: 'Best Patrol', stat: 'bestSessionYield', unit: '$',
    desc: 'Best single-patrol yield.' },
];

export const LIFEGUARD_MARKET = [
  { id: 'rip-week', name: 'Rip Week', finds: ['rip-current'], mult: 1.5,
    desc: 'Strong rips all week; the trust pays more.' },
  { id: 'sting-season', name: 'Sting Season', finds: ['jellyfish-sting'], mult: 1.4,
    desc: 'Jellyfish season; sting duty pays up.' },
  { id: 'kayak-rush', name: 'Kayak Rush', finds: ['capsized-kayak'], mult: 1.45,
    desc: 'Kayak rentals boom; capsizes follow.' },
  { id: 'child-week', name: 'Child Week', finds: ['lost-child'], mult: 1.3,
    desc: 'School holidays; lost children pay more.' },
  { id: 'undertow-alert', name: 'Undertow Alert', finds: ['undertow'], mult: 1.6,
    desc: 'An undertow warning doubles the pay.' },
  { id: 'dog-day', name: 'Dog Day', finds: ['stranded-dog'], mult: 1.5,
    desc: 'A dog rescue makes the local news.' },
  { id: 'tired-glut', name: 'Tired Glut', finds: ['tired-swimmer'], mult: 0.7,
    desc: 'Too many tired swimmers, too little pay.' },
  { id: 'cramp-dip', name: 'Cramp Dip', finds: ['cramp'], mult: 0.75,
    desc: 'Cramp duty pays less this week.' },
];

export const LIFEGUARD_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1,
    desc: 'Fresh winds and full bookings.' },
  { id: 'summer', name: 'Summer', mult: 1.2,
    desc: 'Peak season, everyone is swimming.' },
  { id: 'autumn', name: 'Autumn', mult: 1.0,
    desc: 'Steady work, thinner crowds.' },
  { id: 'winter', name: 'Winter', mult: 0.85,
    desc: 'Cold water, quiet days.' },
];

export const LIFEGUARD_SEASONAL = [
  { season: 'summer', find: 'rip-current', mult: 1.35 },
  { season: 'summer', find: 'tired-swimmer', mult: 1.25 },
  { season: 'spring', find: 'jellyfish-sting', mult: 1.3 },
  { season: 'autumn', find: 'capsized-kayak', mult: 1.25 },
  { season: 'autumn', find: 'undertow', mult: 1.3 },
  { season: 'winter', find: 'stranded-dog', mult: 1.4 },
  { season: 'winter', find: 'lost-child', mult: 1.2 },
  { season: 'spring', find: 'sunstroke', mult: 1.15 },
];

export const LIFEGUARD_QUICK_START = [
  'Patrol the calm beaches first and learn your energy burn.',
  'Log every rescue — the trust pays per log.',
  'Buy binoculars before the busy beaches.',
  'Scan the water every two minutes.',
  'Take trust contracts for rescues on your beach.',
  'Save for the rescue jet ski — it changes every shift.',
];

export const LIFEGUARD_HELPERS = [
  { id: 'spotter', name: 'Pip the Spotter', wage: 30, skill: 'collect', bonus: 0.15,
    desc: 'Young eyes on the tower: +15% rescue yield.' },
  { id: 'veteran', name: 'Old Marta', wage: 45, skill: 'find', bonus: 0.25,
    desc: 'Sees trouble coming: +25% rare rescues.' },
  { id: 'driver', name: 'Dario the Driver', wage: 55, skill: 'carry', bonus: 0.4,
    desc: 'Drives the jet ski: +40% rescue slots.' },
  { id: 'clerk', name: 'Quiet Ana', wage: 75, skill: 'sell', bonus: 0.12,
    desc: 'Files the logs: +12% rescue pay.' },
];

export function lifeguardRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < LIFEGUARD_RANKS.length; i++) {
    if (xp >= LIFEGUARD_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function lifeguardPriceFor(rescueId, dayDrift, rank, upgrades) {
  const f = LIFEGUARD_RESCUES.find((x) => x.id === rescueId);
  if (!f) return 0;
  let price = f.value;
  price *= 1 + (dayDrift[rescueId] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('drone')) price *= 1.2;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function lifeguardCarryCap(upgrades) {
  let cap = 25;
  if (upgrades.includes('tower')) cap += 10;
  if (upgrades.includes('jetski')) cap += 15;
  return cap;
}

export function lifeguardEnergyMax(upgrades) {
  let max = 100;
  if (upgrades.includes('jetski')) max += 40;
  return max;
}

export function lifeguardEventMult(eventId, rescueId) {
  const ev = LIFEGUARD_MARKET.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.finds.includes(rescueId) ? ev.mult : 1;
}

export function lifeguardSeasonMult(seasonId) {
  const s = LIFEGUARD_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function lifeguardEventFor(day) {
  return LIFEGUARD_MARKET[day % LIFEGUARD_MARKET.length];
}

export function lifeguardSeasonalPriceMult(seasonId, rescueId) {
  const row = LIFEGUARD_SEASONAL.find((x) => x.season === seasonId && x.find === rescueId);
  return row ? row.mult : 1;
}

export function lifeguardBestSeason(rescueId) {
  let best = null;
  let bestMult = 0;
  for (const row of LIFEGUARD_SEASONAL) {
    if (row.find === rescueId && row.mult > bestMult) { bestMult = row.mult; best = row.season; }
  }
  return best ? { season: best, mult: bestMult } : null;
}

export function lifeguardBestBuyer(rescueId, dayDrift, rank, upgrades) {
  const base = lifeguardPriceFor(rescueId, dayDrift, rank, upgrades);
  return { price: base, note: 'The beach trust pays best for clean, documented rescues.' };
}

export function lifeguardScore(sessions, yieldTotal, hazards) {
  const base = sessions * 10 + Math.round(yieldTotal);
  const penalty = hazards * 5;
  return Math.max(0, base - penalty);
}

export function lifeguardGrade(sessions, yieldTotal, hazards) {
  const score = lifeguardScore(sessions, yieldTotal, hazards);
  if (score >= 400) return 'S';
  if (score >= 250) return 'A';
  if (score >= 140) return 'B';
  if (score >= 60) return 'C';
  return 'D';
}

export function lifeguardWeeklyGoal(sessions, sold, earned) {
  const goal = { sessions: 5, sold: 40, earned: 600 };
  return {
    sessions: { have: sessions, goal: goal.sessions, done: sessions >= goal.sessions },
    sold: { have: sold, goal: goal.sold, done: sold >= goal.sold },
    earned: { have: Math.round(earned), goal: goal.earned, done: earned >= goal.earned },
    allDone: sessions >= goal.sessions && sold >= goal.sold && earned >= goal.earned,
  };
}

export function lifeguardTipFor(day) {
  return LIFEGUARD_TIPS[day % LIFEGUARD_TIPS.length];
}

export function lifeguardLeaderboardWith(playerValue) {
  const board = LIFEGUARD_LEADERBOARD.map((e) => ({
    name: e.name, value: e.name === 'Mira' ? playerValue : e.value, desc: e.desc,
  }));
  board.sort((a, b) => b.value - a.value);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function lifeguardRecordFor(recordId, state) {
  const r = LIFEGUARD_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function lifeguardAllRecords(state) {
  return LIFEGUARD_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function lifeguardEfficiency(actions, hazards) {
  const total = actions + hazards;
  if (total === 0) return 100;
  return Math.round((actions / total) * 100);
}

export function lifeguardProfitPerPatrol(earned, sessions) {
  if (sessions === 0) return 0;
  return Math.round((earned / sessions) * 10) / 10;
}

export function lifeguardInventoryValue(inventory) {
  let total = 0;
  for (const [id, qty] of Object.entries(inventory)) {
    const f = LIFEGUARD_RESCUES.find((x) => x.id === id);
    if (f) total += f.value * qty;
  }
  return Math.round(total * 10) / 10;
}

export function lifeguardTotalValue(state) {
  return lifeguardInventoryValue(state.inventory);
}

export function lifeguardProgressPercent(state) {
  const total = state.actions + state.findsSold;
  if (total === 0) return 0;
  return Math.round((state.actions / total) * 100);
}

export function lifeguardQuickStart(step) {
  return LIFEGUARD_QUICK_START[step] || null;
}

export function lifeguardSummary(state) {
  return `Lifeguard ${LIFEGUARD_RANKS[state.rank].name}: ${state.sessions} patrols, ${state.actions} responses, $${Math.round(state.earned)} earned, ${state.findsFound} rescues.`;
}

export function lifeguardNextGoal(state) {
  if (state.sessions < 3) return 'Patrol 3 beaches.';
  if (state.actions < 50) return 'Complete 50 rescues.';
  if (state.rank < 2) return 'Reach rank Senior Guard.';
  return 'Become the Beach Captain.';
}

export function lifeguardChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function lifeguardHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of LIFEGUARD_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function lifeguardBeachBySwimmers(swimmers) {
  let best = null;
  for (const s of BEACH_PATROLS) {
    if (s.swimmers <= swimmers && (!best || s.swimmers > best.swimmers)) best = s;
  }
  return best;
}

export function lifeguardRescuesByRarity(maxRarity) {
  return LIFEGUARD_RESCUES.filter((f) => f.rarity <= maxRarity).map((f) => f.id);
}

export function createLifeguardSystem(ctx) {
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
  for (const f of LIFEGUARD_RESCUES) { state.inventory[f.id] = 0; state.dayDrift[f.id] = 0; }

  function refreshRank() {
    const r = lifeguardRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Lifeguard rank up: ${LIFEGUARD_RANKS[r].name} — ${LIFEGUARD_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const f of LIFEGUARD_RESCUES) {
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

  function pickRescue(beach) {
    const bag = [];
    for (const f of LIFEGUARD_RESCUES) {
      let w = f.rarity;
      if (state.rank >= 3 && f.rarity < 0.08) w *= 1.6;
      if (state.upgrades.includes('binoculars')) w *= 1.25;
      bag.push({ f, w });
    }
    let total = 0;
    for (const b of bag) total += b.w;
    let roll = rng() * total;
    for (const b of bag) {
      roll -= b.w;
      if (roll <= 0) return b.f;
    }
    return LIFEGUARD_RESCUES[0];
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
    log(`Lifeguard ${done} ${reason} — yield $${Math.round(state.sessionYield)}, ${state.sessionFinds} rescues.`);
    state.sessionYield = 0;
    state.sessionFinds = 0;
  }

  function patrol(beachId) {
    const beach = BEACH_PATROLS.find((s) => s.id === beachId);
    if (!beach) return { ok: false, reason: 'no-such-site' };
    if (state.session) return { ok: false, reason: 'session-active' };
    if (getCash() < beach.fee) return { ok: false, reason: 'not-enough-cash', cost: beach.fee };
    if (beach.fee > 0) { addCash(-beach.fee); state.spent += beach.fee; }
    state.session = beachId;
    state.sessionStepsLeft = beach.steps;
    state.sessionTimeLeft = beach.duration * 60;
    state.resource = lifeguardEnergyMax(state.upgrades);
    log(`Lifeguard started: ${beach.name} — ${beach.steps} responses, ${beach.duration} min, ${beach.swimmers} swimmers.`);
    return { ok: true, site: beachId, steps: beach.steps, duration: beach.duration };
  }

  function respond() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    if (state.sessionStepsLeft <= 0) return { ok: false, reason: 'session-done' };
    const beach = BEACH_PATROLS.find((s) => s.id === state.session);
    state.resource -= 8;
    if (state.resource < 0) state.resource = 0;
    const cap = lifeguardCarryCap(state.upgrades);
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held >= cap) return { ok: false, reason: 'carry-full', cap };
    const f = pickRescue(beach);
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
    if (rng() < 0.04 + (state.rank >= 4 ? 0.05 : 0)) {
      const rare = LIFEGUARD_RESCUES.filter((x) => x.rarity < 0.06);
      const pick = rare[Math.floor(rng() * rare.length)];
      state.inventory[pick.id] += 1;
      state.findsFound += 1;
      state.sessionYield += pick.value;
      state.totalYield += pick.value;
      got.push({ id: pick.id, name: pick.name, qty: 1, value: pick.value, rare: true });
      log(`Lifeguard rare rescue! ${pick.name} worth $${pick.value}.`);
    }
    if (rng() < beach.risk * 0.04) {
      state.hazardsTaken += 1;
      state.streak = 0;
      state.resource -= 15;
      if (rng() < 0.3) { addCash(-20); state.spent += 20; }
      log(`Lifeguard hazard at ${beach.name}: a rip current grabbed your board and spun you out.`);
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

  function endShift() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    finishSession('ended early');
    return { ok: true, ended: 'early' };
  }

  function scanWater() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    const cost = 8;
    if (state.resource < cost) return { ok: false, reason: 'not-enough-resource', need: cost };
    state.resource -= cost;
    state.specialsUsed += 1;
    if (rng() < 0.55) {
      const f = pickRescue(BEACH_PATROLS[0]);
      state.inventory[f.id] += 1;
      state.findsFound += 1;
      state.sessionYield += f.value;
      gainXp(10);
      log(`Lifeguard scan water: sharp eyes spotted ${f.name}.`);
      return { ok: true, success: true, find: f.id, name: f.name };
    }
    log('Lifeguard scan water: glare on the water hid everything.');
    return { ok: true, success: false };
  }

  function sellFind(rescueId, qty) {
    const f = LIFEGUARD_RESCUES.find((x) => x.id === rescueId);
    if (!f) return { ok: false, reason: 'no-such-find' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = state.inventory[rescueId] || 0;
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = lifeguardPriceFor(rescueId, state.dayDrift, state.rank, state.upgrades);
    const total = Math.round(unit * qty * 10) / 10;
    state.inventory[rescueId] -= qty;
    state.findsSold += qty;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(qty);
    log(`Logged ${qty}x ${f.name} for $${total}.`);
    return { ok: true, total, unit, qty };
  }

  function sellAllFinds() {
    let total = 0;
    let units = 0;
    const lines = [];
    for (const f of LIFEGUARD_RESCUES) {
      const have = state.inventory[f.id] || 0;
      if (have <= 0) continue;
      const unit = lifeguardPriceFor(f.id, state.dayDrift, state.rank, state.upgrades);
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
    log(`Logged everything (${units} rescues) for $${total}.`);
    return { ok: true, total, units, lines };
  }

  function buyUpgrade(id) {
    const u = LIFEGUARD_UPGRADES.find((x) => x.id === id);
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
    const ct = LIFEGUARD_CONTRACTS.find((x) => x.id === id);
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
      for (const f of LIFEGUARD_RESCUES) {
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
    return LIFEGUARD_RESCUES.map((f) => ({
      id: f.id,
      name: f.name,
      price: lifeguardPriceFor(f.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[f.id],
      held: state.inventory[f.id],
    }));
  }

  function siteReport() {
    return BEACH_PATROLS.map((s) => ({
      id: s.id, name: s.name, fee: s.fee, difficulty: s.difficulty, steps: s.steps, risk: s.risk,
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.16) {
      const f = LIFEGUARD_RESCUES[Math.floor(rng() * LIFEGUARD_RESCUES.length)];
      state.dayDrift[f.id] = Math.round((state.dayDrift[f.id] + 0.3) * 100) / 100;
      log(`Lifeguard news: ${f.name} is in demand — the trust pays up today!`);
      return { event: 'demand-spike', find: f.id };
    }
    if (roll < 0.28) {
      const f = LIFEGUARD_RESCUES[Math.floor(rng() * LIFEGUARD_RESCUES.length)];
      state.dayDrift[f.id] = Math.round((state.dayDrift[f.id] - 0.15) * 100) / 100;
      log(`Lifeguard news: too much ${f.name} around — the trust pays less.`);
      return { event: 'price-dip', find: f.id };
    }
    if (roll < 0.38) {
      const f = LIFEGUARD_RESCUES[Math.floor(rng() * LIFEGUARD_RESCUES.length)];
      state.inventory[f.id] += 3;
      state.findsFound += 3;
      log(`Lifeguard gift: a grateful parent hands you 3x ${f.name} to log.`);
      return { event: 'gift', find: f.id };
    }
    if (roll < 0.46) {
      const ev = LIFEGUARD_EVENTS[Math.floor(rng() * LIFEGUARD_EVENTS.length)];
      log(`Lifeguard event: ${ev.name} — ${ev.desc}`);
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
    for (const f of LIFEGUARD_RESCUES) {
      if (state.inventory[f.id] === undefined) state.inventory[f.id] = 0;
      if (state.dayDrift[f.id] === undefined) state.dayDrift[f.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: LIFEGUARD_RANKS[state.rank].name,
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
      resourceMax: lifeguardEnergyMax(state.upgrades),
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
    if (state.session) return `Lifeguard: ${state.session} — ${state.sessionStepsLeft} responses left, energy ${Math.round(state.resource)}`;
    if (state.activeContract) return `Lifeguard: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held > 0) return `Lifeguard: ${held} rescues to log`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const near = Math.hypot(pos.x - 60, pos.z - 500) < 30;
    if (!near) return false;
    if (state.session) { respond(); return true; }
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held > 0) { sellAllFinds(); return true; }
    patrol(BEACH_PATROLS[0].id);
    return true;
  }

  return {
    name: 'Lifeguard',
    state,
    patrol, respond, endShift, scanWater,
    sellFind, sellAllFinds, buyUpgrade, takeContract,
    deliverContract, abandonContract, priceBoard, siteReport,
    dailyEvent, tick, tickDay, serialize, deserialize,
    stats, hudLine, interact,
  };
}

export function createLifeguardExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function hireHelper(id) {
    const h = LIFEGUARD_HELPERS.find((x) => x.id === id);
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
      const h = LIFEGUARD_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    return lifeguardHelperBonus(helpers, skill);
  }

  function challenges() {
    return LIFEGUARD_CHALLENGES.map((ch) => lifeguardChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = LIFEGUARD_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = lifeguardChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return LIFEGUARD_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function donateFinds(rescueId, qty) {
    const have = system.state.inventory[rescueId] || 0;
    if (have < qty || qty <= 0) return { ok: false, reason: 'not-enough', have };
    system.state.inventory[rescueId] -= qty;
    const rep = Math.floor(qty / 5);
    return { ok: true, qty, rep, note: 'The beach trust thanks you. The swimmers remember.' };
  }

  function bundleSale(rescueId, qty) {
    const have = system.state.inventory[rescueId] || 0;
    if (have < qty || qty < 10) return { ok: false, reason: 'need-10-plus', have };
    const unit = lifeguardPriceFor(rescueId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(unit * qty * 1.1 * 10) / 10;
    system.state.inventory[rescueId] -= qty;
    system.state.findsSold += qty;
    system.state.earned += total;
    return { ok: true, total, qty, bonus: 'bundle +10%' };
  }

  function checkEnergy() {
    const max = lifeguardEnergyMax(system.state.upgrades);
    return {
      resource: Math.round(system.state.resource * 10) / 10,
      max,
      pct: Math.round((system.state.resource / max) * 100),
    };
  }

  function restUp() {
    system.state.resource = lifeguardEnergyMax(system.state.upgrades);
    return { ok: true, resource: system.state.resource };
  }

  function countLogs() {
    const held = Object.values(system.state.inventory).reduce((a, b) => a + b, 0);
    return { rescues: held, cap: lifeguardCarryCap(system.state.upgrades) };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, donateFinds, bundleSale,
    checkEnergy, restUp, countLogs,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return helperWagesPaid; },
  };
}

export function createLifeguardMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkSold = 0;

  function setEvent(eventId) {
    const ev = LIFEGUARD_MARKET.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = LIFEGUARD_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    system.state.season = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(rescueId, basePrice) {
    let price = basePrice;
    price *= lifeguardEventMult(currentEvent, rescueId);
    price *= lifeguardSeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(rescueId, qty) {
    const have = system.state.inventory[rescueId] || 0;
    if (have < qty || qty < 20) return { ok: false, reason: 'need-20-plus', have };
    const unit = lifeguardPriceFor(rescueId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(eventPrice(rescueId, unit) * qty * 1.1 * 10) / 10;
    system.state.inventory[rescueId] -= qty;
    system.state.findsSold += qty;
    system.state.earned += total;
    bulkSold += qty;
    dealsClaimed += 1;
    return { ok: true, total, qty, bonus: 'bulk +10%' };
  }

  function dailyDeals() {
    const deals = [];
    for (const f of LIFEGUARD_RESCUES) {
      const mult = lifeguardEventMult(currentEvent, f.id);
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

export const LIFEGUARD_META = {
  system: 'lifeguard',
  version: '7c-B2',
  author: 'builder-2',
  dataCount: BEACH_PATROLS.length,
  findCount: LIFEGUARD_RESCUES.length,
  upgradeCount: LIFEGUARD_UPGRADES.length,
  rankCount: LIFEGUARD_RANKS.length,
};
