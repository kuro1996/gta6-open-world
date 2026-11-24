// Scuba Diving — Kai's dive boat out of Solara Marina.
// Pay the charter, check your gauge, and drop down to the reefs, the
// wrecks and the deep blue holes where the bay keeps everything it ever
// swallowed: pearls, coins, amphorae, and things nobody can explain.
// Air is the only clock that matters down there. Spend it well, come
// up slow, and sell what the sea gives back to the collectors in town.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const DIVE_SITES = [
  { id: 'coral-gardens', name: 'Coral Gardens', fee: 30, difficulty: 1,
    steps: 4, duration: 25, risk: 0, depth: 12, current: 1,
    desc: 'Shallow, bright, and full of small glittering things.' },
  { id: 'turtle-bay', name: 'Turtle Bay', fee: 42, difficulty: 1,
    steps: 5, duration: 30, risk: 0, depth: 15, current: 1,
    desc: 'Slow turtles and a sandy floor that hides old coins.' },
  { id: 'kelp-forest', name: 'Kelp Forest', fee: 58, difficulty: 2,
    steps: 5, duration: 35, risk: 1, depth: 20, current: 2,
    desc: 'Tall green walls. Easy to lose your bearings inside.' },
  { id: 'pearl-flats', name: 'Pearl Flats', fee: 72, difficulty: 2,
    steps: 6, duration: 35, risk: 1, depth: 18, current: 1,
    desc: 'Oyster beds where the old pearl divers worked.' },
  { id: 'anemone-wall', name: 'Anemone Wall', fee: 88, difficulty: 3,
    steps: 6, duration: 40, risk: 1, depth: 26, current: 2,
    desc: 'A vertical garden of stinging colour.' },
  { id: 'wreck-meridian', name: 'Wreck of the Meridian', fee: 115, difficulty: 3,
    steps: 7, duration: 45, risk: 2, depth: 34, current: 2,
    desc: 'A freighter down since the seventies, holds and all.' },
  { id: 'shark-ledge', name: 'Shark Ledge', fee: 135, difficulty: 4,
    steps: 6, duration: 40, risk: 3, depth: 38, current: 3,
    desc: 'Reef sharks patrol the edge. Keep your hands in.' },
  { id: 'midnight-cave', name: 'Midnight Cave', fee: 155, difficulty: 4,
    steps: 7, duration: 50, risk: 3, depth: 30, current: 1,
    desc: 'Dark as a held breath, lit only by your lamp.' },
  { id: 'blue-hole', name: 'The Blue Hole', fee: 185, difficulty: 5,
    steps: 8, duration: 55, risk: 2, depth: 60, current: 1,
    desc: 'A perfect circle of deep blue. Mind the narcosis.' },
  { id: 'sunken-temple', name: 'Sunken Temple', fee: 225, difficulty: 5,
    steps: 8, duration: 60, risk: 3, depth: 48, current: 2,
    desc: 'Nobody knows who built it, or why it sank.' },
];

export const SCUBA_FINDS = [
  { id: 'coral-fragment', name: 'Coral Fragment', value: 12, rarity: 0.26,
    weight: 0.5, desc: 'A bright broken branch, legal to take here.' },
  { id: 'silver-spoon', name: 'Silver Spoon', value: 28, rarity: 0.14,
    weight: 0.2, desc: 'Ship silver, tarnished green at the edges.' },
  { id: 'message-bottle', name: 'Message Bottle', value: 35, rarity: 0.1,
    weight: 0.6, desc: 'A note inside, dated eleven years ago.' },
  { id: 'brass-compass', name: 'Brass Compass', value: 60, rarity: 0.08,
    weight: 0.4, desc: 'The needle still finds north.' },
  { id: 'dive-watch', name: 'Old Dive Watch', value: 95, rarity: 0.06,
    weight: 0.3, desc: 'Still ticks. Someone lost it on a reef dive.' },
  { id: 'gold-coin', name: 'Gold Coin', value: 140, rarity: 0.05,
    weight: 0.1, desc: 'A doubloon, worn smooth by the sea.' },
  { id: 'pearl', name: 'Wild Pearl', value: 180, rarity: 0.04,
    weight: 0.1, desc: 'Perfectly round, faintly pink.' },
  { id: 'jade-figurine', name: 'Jade Figurine', value: 240, rarity: 0.03,
    weight: 0.5, desc: 'A small carved turtle, older than the town.' },
  { id: 'amphora', name: 'Intact Amphora', value: 320, rarity: 0.02,
    weight: 4.0, desc: 'A wine jar from a wreck nobody has charted.' },
  { id: 'black-pearl', name: 'Black Pearl', value: 450, rarity: 0.01,
    weight: 0.1, desc: 'Dark as the Blue Hole itself.' },
];

export const SCUBA_UPGRADES = [
  { id: 'fins', name: 'Carbon Fins', cost: 80,
    desc: 'Kick less, glide further.', effect: 'kick-plus' },
  { id: 'wetsuit', name: 'Thick Wetsuit', cost: 140,
    desc: 'Stay warm on deep, long dives.', effect: 'warmth' },
  { id: 'flashlight', name: 'Dive Flashlight', cost: 120,
    desc: 'See into caves and wrecks.', effect: 'light' },
  { id: 'camera', name: 'Underwater Camera', cost: 260,
    desc: 'Photos of finds pay +20% from collectors.', effect: 'price-plus' },
  { id: 'drybag', name: 'Mesh Dry Bag', cost: 180,
    desc: 'Carry +10 finds per dive.', effect: 'carry-plus' },
  { id: 'sonar', name: 'Hand Sonar', cost: 420,
    desc: 'Finds are 25% easier to spot.', effect: 'find-plus' },
  { id: 'scooter', name: 'Dive Scooter', cost: 650,
    desc: 'Cover more reef, carry +15 finds.', effect: 'carry-plus-2' },
  { id: 'rebreather', name: 'Rebreather', cost: 900,
    desc: 'Air lasts +50 on every dive.', effect: 'air-plus' },
];

export const SCUBA_RANKS = [
  { level: 0, name: 'Snorkeler', xp: 0,
    perk: 'Shallow sites pay base rate.' },
  { level: 1, name: 'Reef Diver', xp: 120,
    perk: '+10% find prices.' },
  { level: 2, name: 'Wreck Diver', xp: 300,
    perk: 'Wrecks open up, rare finds likelier.' },
  { level: 3, name: 'Deep Diver', xp: 620,
    perk: '+20% find prices, deep sites unlocked.' },
  { level: 4, name: 'Abyss Master', xp: 1100,
    perk: '+30% find prices, rare finds doubled.' },
];

export const SCUBA_EVENTS = [
  { id: 'whale-pass', name: 'Whale Pass',
    desc: 'A humpback crosses the bay and every diver books a trip.' },
  { id: 'algae-bloom', name: 'Algae Bloom',
    desc: 'Green water cuts visibility to arm’s length.' },
  { id: 'tide-low', name: 'Low Tide',
    desc: 'The flats are walkable — and full of shells.' },
  { id: 'storm-surge', name: 'Storm Surge',
    desc: 'Rough water keeps the boats in harbour.' },
  { id: 'coral-spawn', name: 'Coral Spawn',
    desc: 'One night a year the reef glows and spawns.' },
  { id: 'dolphin-pod', name: 'Dolphin Pod',
    desc: 'A pod moves in and the tourists follow.' },
  { id: 'jellyfish-drift', name: 'Jellyfish Drift',
    desc: 'A slow drift of jellies crosses the bay.' },
  { id: 'treasure-rumour', name: 'Treasure Rumour',
    desc: 'A fisherman swears he saw gold near the temple.' },
  { id: 'clear-water', name: 'Clear Water',
    desc: 'Forty metres of visibility, the best of the year.' },
  { id: 'shark-sighting', name: 'Shark Sighting',
    desc: 'A big tiger shark cruises the ledge.' },
];

export const SCUBA_CONTRACTS = [
  { id: 'pearls-6', name: 'Pearl Order', material: 'pearl', qty: 6,
    pay: 700, days: 2, rep: 2,
    desc: 'A jeweller needs six wild pearls by the weekend.' },
  { id: 'coins-10', name: 'Coin Hunt', material: 'gold-coin', qty: 10,
    pay: 900, days: 2, rep: 3,
    desc: 'A collector pays for ten doubloons, no questions.' },
  { id: 'coral-20', name: 'Coral Commission', material: 'coral-fragment', qty: 20,
    pay: 260, days: 1, rep: 1,
    desc: 'A hotel lobby wants coral pieces for a display.' },
  { id: 'amphora-2', name: 'Museum Piece', material: 'amphora', qty: 2,
    pay: 800, days: 3, rep: 4,
    desc: 'The maritime museum wants two intact amphorae.' },
  { id: 'watches-4', name: 'Watch Collection', material: 'dive-watch', qty: 4,
    pay: 480, days: 2, rep: 2,
    desc: 'A restorer collects old dive watches.' },
  { id: 'mixed-30', name: 'Salvage Lot', material: 'mixed', qty: 30,
    pay: 550, days: 2, rep: 2,
    desc: 'Any thirty finds for the salvage auction.' },
];

export const SCUBA_CHALLENGES = [
  { id: 'dives-10', name: 'Ten Dives', target: 'sessions', goal: 10, xp: 90,
    desc: 'Finish 10 dives.' },
  { id: 'finds-100', name: 'Century of Finds', target: 'findsFound', goal: 100, xp: 110,
    desc: 'Bring up 100 finds.' },
  { id: 'earn-1000', name: 'Grand in Gold', target: 'earned', goal: 1000, xp: 130,
    desc: 'Earn $1,000 from the sea.' },
  { id: 'deep-5', name: 'Deep Five', target: 'sessions', goal: 5, xp: 80,
    desc: 'Finish 5 dives at depth.' },
  { id: 'streak-8', name: 'Clean Eight', target: 'bestStreak', goal: 8, xp: 100,
    desc: 'Eight clean steps in a row.' },
  { id: 'contracts-3', name: 'Reliable Diver', target: 'contractsDone', goal: 3, xp: 120,
    desc: 'Complete 3 salvage contracts.' },
  { id: 'first-find', name: 'First Find', target: 'findsFound', goal: 1, xp: 60,
    desc: 'Bring up your first find.' },
  { id: 'actions-200', name: 'Two Hundred Steps', target: 'actions', goal: 200, xp: 140,
    desc: 'Take 200 collection steps underwater.' },
];

export const SCUBA_ACHIEVEMENTS = [
  { id: 'first-dive', name: 'First Dive', check: (s) => s.sessions >= 1,
    desc: 'Finish your first dive.' },
  { id: 'first-pearl', name: 'Pearl Diver', check: (s) => (s.inventory.pearl || 0) + s.findsSold >= 1,
    desc: 'Hold or sell a wild pearl.' },
  { id: 'black-pearl', name: 'Black Pearl Club', check: (s) => (s.inventory['black-pearl'] || 0) + s.findsSold >= 1,
    desc: 'Find the black pearl.' },
  { id: 'rank-3', name: 'Deep Diver', check: (s) => s.rank >= 3,
    desc: 'Reach rank Deep Diver.' },
  { id: 'rich-sea', name: 'Sea Rich', check: (s) => s.earned >= 3000,
    desc: 'Earn $3,000 from diving.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8,
    desc: 'Own every dive upgrade.' },
  { id: 'no-hazard', name: 'Calm Water', check: (s) => s.sessions >= 10 && s.hazardsTaken === 0,
    desc: 'Ten dives with zero hazards.' },
  { id: 'big-yield', name: 'Big Yield', check: (s) => s.bestSessionYield >= 500,
    desc: 'One dive worth $500 or more.' },
];

export const SCUBA_TIPS = [
  { id: 'air-first', name: 'Air First',
    text: 'Watch your gauge, not your bag. Air runs out first.' },
  { id: 'wreck-morning', name: 'Wreck Mornings',
    text: 'The Meridian is calmest before ten in the morning.' },
  { id: 'sonar-early', name: 'Sonar Early',
    text: 'Save for the hand sonar — it pays for itself in a week.' },
  { id: 'pearl-flats', name: 'Pearl Flats',
    text: 'The flats are boring and rich. Go boring.' },
  { id: 'current-check', name: 'Current Check',
    text: 'Strong current means fewer finds and more air burned.' },
  { id: 'contract-first', name: 'Contracts First',
    text: 'Take a contract, then dive for its material.' },
  { id: 'camera-money', name: 'Camera Money',
    text: 'Photograph every rare find before you sell it.' },
  { id: 'cave-lamp', name: 'Cave Lamp',
    text: 'Never enter Midnight Cave without the flashlight.' },
];

export const SCUBA_LEADERBOARD = [
  { name: 'Old Salim', value: 8200, desc: 'Forty years on the reef.' },
  { name: 'Dive Shop Dara', value: 6100, desc: 'Runs the shop, dives every dawn.' },
  { name: 'Kai', value: 0, desc: 'You. Climbing.' },
  { name: 'Mira', value: 3400, desc: 'Free-dives deeper than most tanks.' },
  { name: 'Tomas', value: 1900, desc: 'Found one amphora and never stopped.' },
];

export const SCUBA_RECORDS = [
  { id: 'most-dives', name: 'Most Dives', stat: 'sessions', unit: 'dives',
    desc: 'Most dives finished.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$',
    desc: 'Most money earned from diving.' },
  { id: 'most-finds', name: 'Most Finds', stat: 'findsFound', unit: 'finds',
    desc: 'Most finds brought up.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'steps',
    desc: 'Longest clean streak.' },
  { id: 'best-dive', name: 'Best Dive', stat: 'bestSessionYield', unit: '$',
    desc: 'Best single-dive yield.' },
];

export const SCUBA_MARKET = [
  { id: 'pearl-boom', name: 'Pearl Boom', finds: ['pearl', 'black-pearl'], mult: 1.5,
    desc: 'Jewellers are bidding up pearls.' },
  { id: 'coin-rush', name: 'Coin Rush', finds: ['gold-coin'], mult: 1.4,
    desc: 'A museum exhibit drives coin prices up.' },
  { id: 'coral-craze', name: 'Coral Craze', finds: ['coral-fragment'], mult: 1.3,
    desc: 'Hotels all want coral displays.' },
  { id: 'watch-fair', name: 'Watch Fair', finds: ['dive-watch'], mult: 1.35,
    desc: 'Collectors gather for the annual fair.' },
  { id: 'jade-week', name: 'Jade Week', finds: ['jade-figurine'], mult: 1.45,
    desc: 'An auction house is buying jade.' },
  { id: 'amphora-bid', name: 'Amphora Bid', finds: ['amphora'], mult: 1.4,
    desc: 'A private buyer wants amphorae.' },
  { id: 'bottle-glut', name: 'Bottle Glut', finds: ['message-bottle'], mult: 0.6,
    desc: 'Too many bottles, nobody reads them.' },
  { id: 'spoon-dip', name: 'Spoon Dip', finds: ['silver-spoon'], mult: 0.7,
    desc: 'Silver softens this week.' },
];

export const SCUBA_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1,
    desc: 'Fresh water and full bookings.' },
  { id: 'summer', name: 'Summer', mult: 1.2,
    desc: 'Peak season, everyone is diving.' },
  { id: 'autumn', name: 'Autumn', mult: 1.0,
    desc: 'Steady work, thinner crowds.' },
  { id: 'winter', name: 'Winter', mult: 0.85,
    desc: 'Cold water, quiet days.' },
];

export const SCUBA_SEASONAL = [
  { season: 'summer', find: 'pearl', mult: 1.3 },
  { season: 'summer', find: 'coral-fragment', mult: 1.2 },
  { season: 'spring', find: 'gold-coin', mult: 1.25 },
  { season: 'autumn', find: 'amphora', mult: 1.3 },
  { season: 'autumn', find: 'dive-watch', mult: 1.2 },
  { season: 'winter', find: 'black-pearl', mult: 1.35 },
  { season: 'winter', find: 'jade-figurine', mult: 1.25 },
  { season: 'spring', find: 'message-bottle', mult: 1.15 },
];

export const SCUBA_QUICK_START = [
  'Book a shallow site first and learn your air burn.',
  'Sell coral and spoons early; keep pearls for contracts.',
  'Buy the flashlight before Midnight Cave.',
  'Check the price board every morning.',
  'Take contracts for materials you already dive for.',
  'Save for the rebreather — it changes deep diving.',
];

export const SCUBA_HELPERS = [
  { id: 'buddy', name: 'Lena the Buddy', wage: 30, skill: 'collect', bonus: 0.15,
    desc: 'A second pair of eyes: +15% find yield.' },
  { id: 'spotter', name: 'Old Salim', wage: 45, skill: 'find', bonus: 0.25,
    desc: 'Knows every reef: +25% rare finds.' },
  { id: 'boatman', name: 'Rudi the Boatman', wage: 55, skill: 'carry', bonus: 0.4,
    desc: 'Bigger boat: +40% carry capacity.' },
  { id: 'dealer', name: 'Quiet Ana', wage: 75, skill: 'sell', bonus: 0.12,
    desc: 'Knows the collectors: +12% sale prices.' },
];

export function scubaRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < SCUBA_RANKS.length; i++) {
    if (xp >= SCUBA_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function scubaPriceFor(findId, dayDrift, rank, upgrades) {
  const f = SCUBA_FINDS.find((x) => x.id === findId);
  if (!f) return 0;
  let price = f.value;
  price *= 1 + (dayDrift[findId] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('camera')) price *= 1.2;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function scubaCarryCap(upgrades) {
  let cap = 20;
  if (upgrades.includes('drybag')) cap += 10;
  if (upgrades.includes('scooter')) cap += 15;
  return cap;
}

export function scubaAirMax(upgrades) {
  let max = 100;
  if (upgrades.includes('rebreather')) max += 50;
  return max;
}

export function scubaEventMult(eventId, findId) {
  const ev = SCUBA_MARKET.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.finds.includes(findId) ? ev.mult : 1;
}

export function scubaSeasonMult(seasonId) {
  const s = SCUBA_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function scubaEventFor(day) {
  return SCUBA_MARKET[day % SCUBA_MARKET.length];
}

export function scubaSeasonalPriceMult(seasonId, findId) {
  const row = SCUBA_SEASONAL.find((x) => x.season === seasonId && x.find === findId);
  return row ? row.mult : 1;
}

export function scubaBestSeason(findId) {
  let best = null;
  let bestMult = 0;
  for (const row of SCUBA_SEASONAL) {
    if (row.find === findId && row.mult > bestMult) { bestMult = row.mult; best = row.season; }
  }
  return best ? { season: best, mult: bestMult } : null;
}

export function scubaBestBuyer(findId, dayDrift, rank, upgrades) {
  const base = scubaPriceFor(findId, dayDrift, rank, upgrades);
  return { price: base, note: 'Collectors pay top dollar for rare reef finds.' };
}

export function scubaScore(sessions, yieldTotal, hazards) {
  const base = sessions * 10 + Math.round(yieldTotal);
  const penalty = hazards * 5;
  return Math.max(0, base - penalty);
}

export function scubaGrade(sessions, yieldTotal, hazards) {
  const score = scubaScore(sessions, yieldTotal, hazards);
  if (score >= 400) return 'S';
  if (score >= 250) return 'A';
  if (score >= 140) return 'B';
  if (score >= 60) return 'C';
  return 'D';
}

export function scubaWeeklyGoal(sessions, sold, earned) {
  const goal = { sessions: 5, sold: 40, earned: 600 };
  return {
    sessions: { have: sessions, goal: goal.sessions, done: sessions >= goal.sessions },
    sold: { have: sold, goal: goal.sold, done: sold >= goal.sold },
    earned: { have: Math.round(earned), goal: goal.earned, done: earned >= goal.earned },
    allDone: sessions >= goal.sessions && sold >= goal.sold && earned >= goal.earned,
  };
}

export function scubaTipFor(day) {
  return SCUBA_TIPS[day % SCUBA_TIPS.length];
}

export function scubaLeaderboardWith(playerValue) {
  const board = SCUBA_LEADERBOARD.map((e) => ({
    name: e.name, value: e.name === 'Kai' ? playerValue : e.value, desc: e.desc,
  }));
  board.sort((a, b) => b.value - a.value);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function scubaRecordFor(recordId, state) {
  const r = SCUBA_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function scubaAllRecords(state) {
  return SCUBA_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function scubaEfficiency(actions, hazards) {
  const total = actions + hazards;
  if (total === 0) return 100;
  return Math.round((actions / total) * 100);
}

export function scubaProfitPerDive(earned, sessions) {
  if (sessions === 0) return 0;
  return Math.round((earned / sessions) * 10) / 10;
}

export function scubaInventoryValue(inventory) {
  let total = 0;
  for (const [id, qty] of Object.entries(inventory)) {
    const f = SCUBA_FINDS.find((x) => x.id === id);
    if (f) total += f.value * qty;
  }
  return Math.round(total * 10) / 10;
}

export function scubaTotalValue(state) {
  return scubaInventoryValue(state.inventory);
}

export function scubaProgressPercent(state) {
  const total = state.actions + state.findsSold;
  if (total === 0) return 0;
  return Math.round((state.actions / total) * 100);
}

export function scubaQuickStart(step) {
  return SCUBA_QUICK_START[step] || null;
}

export function scubaSummary(state) {
  return `Scuba Diving ${SCUBA_RANKS[state.rank].name}: ${state.sessions} dives, ${state.actions} steps, $${Math.round(state.earned)} earned, ${state.findsFound} finds.`;
}

export function scubaNextGoal(state) {
  if (state.sessions < 3) return 'Run 3 dives.';
  if (state.actions < 50) return 'Collect 50 finds.';
  if (state.rank < 2) return 'Reach rank Wreck Diver.';
  return 'Become the Abyss Master.';
}

export function scubaChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function scubaHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of SCUBA_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function scubaSiteByDepth(depth) {
  let best = null;
  for (const s of DIVE_SITES) {
    if (s.depth <= depth && (!best || s.depth > best.depth)) best = s;
  }
  return best;
}

export function scubaFindsByRarity(maxRarity) {
  return SCUBA_FINDS.filter((f) => f.rarity <= maxRarity).map((f) => f.id);
}

export function createScubaDivingSystem(ctx) {
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
  for (const f of SCUBA_FINDS) { state.inventory[f.id] = 0; state.dayDrift[f.id] = 0; }

  function refreshRank() {
    const r = scubaRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Scuba Diving rank up: ${SCUBA_RANKS[r].name} — ${SCUBA_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const f of SCUBA_FINDS) {
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

  function pickFind(site) {
    const bag = [];
    for (const f of SCUBA_FINDS) {
      let w = f.rarity;
      if (state.rank >= 3 && f.rarity < 0.08) w *= 1.6;
      if (state.upgrades.includes('sonar')) w *= 1.25;
      bag.push({ f, w });
    }
    let total = 0;
    for (const b of bag) total += b.w;
    let roll = rng() * total;
    for (const b of bag) {
      roll -= b.w;
      if (roll <= 0) return b.f;
    }
    return SCUBA_FINDS[0];
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
    log(`Scuba Diving ${done} ${reason} — yield $${Math.round(state.sessionYield)}, ${state.sessionFinds} finds.`);
    state.sessionYield = 0;
    state.sessionFinds = 0;
  }

  function dive(siteId) {
    const site = DIVE_SITES.find((s) => s.id === siteId);
    if (!site) return { ok: false, reason: 'no-such-site' };
    if (state.session) return { ok: false, reason: 'session-active' };
    if (weatherBlocks()) {
      state.weatherStops += 1;
      return { ok: false, reason: 'bad-weather', condition: weather() };
    }
    const hour = getHour();
    if (hour < 6 || hour >= 20) return { ok: false, reason: 'too-late', hour };
    if (getCash() < site.fee) return { ok: false, reason: 'not-enough-cash', cost: site.fee };
    if (site.fee > 0) { addCash(-site.fee); state.spent += site.fee; }
    state.session = siteId;
    state.sessionStepsLeft = site.steps;
    state.sessionTimeLeft = site.duration * 60;
    state.resource = scubaAirMax(state.upgrades);
    log(`Scuba Diving started: ${site.name} — ${site.steps} steps, ${site.duration} min, ${site.depth}m deep.`);
    return { ok: true, site: siteId, steps: site.steps, duration: site.duration };
  }

  function collectFind() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    if (state.sessionStepsLeft <= 0) return { ok: false, reason: 'session-done' };
    const site = DIVE_SITES.find((s) => s.id === state.session);
    state.resource -= 8;
    if (state.resource < 0) state.resource = 0;
    const cap = scubaCarryCap(state.upgrades);
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held >= cap) return { ok: false, reason: 'carry-full', cap };
    const f = pickFind(site);
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
      const rare = SCUBA_FINDS.filter((x) => x.rarity < 0.06);
      const pick = rare[Math.floor(rng() * rare.length)];
      state.inventory[pick.id] += 1;
      state.findsFound += 1;
      state.sessionYield += pick.value;
      state.totalYield += pick.value;
      got.push({ id: pick.id, name: pick.name, qty: 1, value: pick.value, rare: true });
      log(`Scuba Diving rare find! ${pick.name} worth $${pick.value}.`);
    }
    if (rng() < site.risk * 0.04) {
      state.hazardsTaken += 1;
      state.streak = 0;
      state.resource -= 15;
      if (rng() < 0.3) { addHeat(1); state.heatGained += 1; }
      log(`Scuba Diving hazard at ${site.name}: a moray snapped at your glove and your air hissed out.`);
    }
    if (state.resource <= 0) {
      finishSession('cut short — air ran out');
      return { ok: true, got, stepsLeft: 0, ended: 'resource-empty' };
    }
    if (state.sessionStepsLeft <= 0) {
      finishSession('finished');
      return { ok: true, got, stepsLeft: 0, ended: 'done' };
    }
    return { ok: true, got, stepsLeft: state.sessionStepsLeft, resource: state.resource };
  }

  function surfaceEarly() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    finishSession('ended early');
    return { ok: true, ended: 'early' };
  }

  function checkReef() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    const cost = 10;
    if (state.resource < cost) return { ok: false, reason: 'not-enough-resource', need: cost };
    state.resource -= cost;
    state.specialsUsed += 1;
    if (rng() < 0.55) {
      const f = pickFind(DIVE_SITES[0]);
      state.inventory[f.id] += 1;
      state.findsFound += 1;
      state.sessionYield += f.value;
      gainXp(10);
      log(`Scuba Diving check reef: spotted something glinting on the reef: ${f.name}.`);
      return { ok: true, success: true, find: f.id, name: f.name };
    }
    log('Scuba Diving check reef: nothing but sand and a curious eel.');
    return { ok: true, success: false };
  }

  function sellFind(findId, qty) {
    const f = SCUBA_FINDS.find((x) => x.id === findId);
    if (!f) return { ok: false, reason: 'no-such-find' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = state.inventory[findId] || 0;
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = scubaPriceFor(findId, state.dayDrift, state.rank, state.upgrades);
    const total = Math.round(unit * qty * 10) / 10;
    state.inventory[findId] -= qty;
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
    for (const f of SCUBA_FINDS) {
      const have = state.inventory[f.id] || 0;
      if (have <= 0) continue;
      const unit = scubaPriceFor(f.id, state.dayDrift, state.rank, state.upgrades);
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
    const u = SCUBA_UPGRADES.find((x) => x.id === id);
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
    const ct = SCUBA_CONTRACTS.find((x) => x.id === id);
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
      for (const f of SCUBA_FINDS) {
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
    return SCUBA_FINDS.map((f) => ({
      id: f.id,
      name: f.name,
      price: scubaPriceFor(f.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[f.id],
      held: state.inventory[f.id],
    }));
  }

  function siteReport() {
    return DIVE_SITES.map((s) => ({
      id: s.id, name: s.name, fee: s.fee, difficulty: s.difficulty, steps: s.steps, risk: s.risk,
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.16) {
      const f = SCUBA_FINDS[Math.floor(rng() * SCUBA_FINDS.length)];
      state.dayDrift[f.id] = Math.round((state.dayDrift[f.id] + 0.3) * 100) / 100;
      log(`Scuba Diving news: ${f.name} is in demand — prices up today!`);
      return { event: 'demand-spike', find: f.id };
    }
    if (roll < 0.28) {
      const f = SCUBA_FINDS[Math.floor(rng() * SCUBA_FINDS.length)];
      state.dayDrift[f.id] = Math.round((state.dayDrift[f.id] - 0.15) * 100) / 100;
      log(`Scuba Diving news: too much ${f.name} around — prices dip.`);
      return { event: 'price-dip', find: f.id };
    }
    if (roll < 0.38) {
      const f = SCUBA_FINDS[Math.floor(rng() * SCUBA_FINDS.length)];
      state.inventory[f.id] += 3;
      state.findsFound += 3;
      log(`Scuba Diving gift: someone hands you 3x ${f.name}.`);
      return { event: 'gift', find: f.id };
    }
    if (roll < 0.46) {
      const ev = SCUBA_EVENTS[Math.floor(rng() * SCUBA_EVENTS.length)];
      log(`Scuba Diving event: ${ev.name} — ${ev.desc}`);
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
        finishSession('cut short — air ran out');
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
    for (const f of SCUBA_FINDS) {
      if (state.inventory[f.id] === undefined) state.inventory[f.id] = 0;
      if (state.dayDrift[f.id] === undefined) state.dayDrift[f.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: SCUBA_RANKS[state.rank].name,
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
      resourceMax: scubaAirMax(state.upgrades),
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
    if (state.session) return `Scuba Diving: ${state.session} — ${state.sessionStepsLeft} steps left, air ${Math.round(state.resource)}`;
    if (state.activeContract) return `Scuba Diving: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held > 0) return `Scuba Diving: ${held} finds held`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const near = Math.hypot(pos.x - (-300), pos.z - 450) < 30;
    if (!near) return false;
    if (state.session) { collectFind(); return true; }
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held > 0) { sellAllFinds(); return true; }
    dive(DIVE_SITES[0].id);
    return true;
  }

  return {
    name: 'Scuba Diving',
    state,
    dive, collectFind, surfaceEarly, checkReef,
    sellFind, sellAllFinds, buyUpgrade, takeContract,
    deliverContract, abandonContract, priceBoard, siteReport,
    dailyEvent, tick, tickDay, serialize, deserialize,
    stats, hudLine, interact,
  };
}

export function createScubaDivingExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function hireHelper(id) {
    const h = SCUBA_HELPERS.find((x) => x.id === id);
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
      const h = SCUBA_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    return scubaHelperBonus(helpers, skill);
  }

  function challenges() {
    return SCUBA_CHALLENGES.map((ch) => scubaChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = SCUBA_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = scubaChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return SCUBA_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function donateFinds(findId, qty) {
    const have = system.state.inventory[findId] || 0;
    if (have < qty || qty <= 0) return { ok: false, reason: 'not-enough', have };
    system.state.inventory[findId] -= qty;
    const rep = Math.floor(qty / 5);
    return { ok: true, qty, rep, note: 'The marine centre thanks you. The reef remembers.' };
  }

  function bundleSale(findId, qty) {
    const have = system.state.inventory[findId] || 0;
    if (have < qty || qty < 10) return { ok: false, reason: 'need-10-plus', have };
    const unit = scubaPriceFor(findId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(unit * qty * 1.1 * 10) / 10;
    system.state.inventory[findId] -= qty;
    system.state.findsSold += qty;
    system.state.earned += total;
    return { ok: true, total, qty, bonus: 'bundle +10%' };
  }

  function checkAir() {
    const max = scubaAirMax(system.state.upgrades);
    return {
      resource: Math.round(system.state.resource * 10) / 10,
      max,
      pct: Math.round((system.state.resource / max) * 100),
    };
  }

  function refillAir() {
    system.state.resource = scubaAirMax(system.state.upgrades);
    return { ok: true, resource: system.state.resource };
  }

  function weighCatch() {
    let kg = 0;
    for (const [id, qty] of Object.entries(system.state.inventory)) {
      const f = SCUBA_FINDS.find((x) => x.id === id);
      if (f) kg += f.weight * qty;
    }
    return { kg: Math.round(kg * 10) / 10, cap: scubaCarryCap(system.state.upgrades) };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, donateFinds, bundleSale,
    checkAir, refillAir, weighCatch,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return helperWagesPaid; },
  };
}

export function createScubaDivingMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkSold = 0;

  function setEvent(eventId) {
    const ev = SCUBA_MARKET.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = SCUBA_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    system.state.season = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(findId, basePrice) {
    let price = basePrice;
    price *= scubaEventMult(currentEvent, findId);
    price *= scubaSeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(findId, qty) {
    const have = system.state.inventory[findId] || 0;
    if (have < qty || qty < 20) return { ok: false, reason: 'need-20-plus', have };
    const unit = scubaPriceFor(findId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(eventPrice(findId, unit) * qty * 1.1 * 10) / 10;
    system.state.inventory[findId] -= qty;
    system.state.findsSold += qty;
    system.state.earned += total;
    bulkSold += qty;
    dealsClaimed += 1;
    return { ok: true, total, qty, bonus: 'bulk +10%' };
  }

  function dailyDeals() {
    const deals = [];
    for (const f of SCUBA_FINDS) {
      const mult = scubaEventMult(currentEvent, f.id);
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

export const SCUBA_META = {
  system: 'scuba',
  version: '7c-B2',
  author: 'builder-2',
  dataCount: DIVE_SITES.length,
  findCount: SCUBA_FINDS.length,
  upgradeCount: SCUBA_UPGRADES.length,
  rankCount: SCUBA_RANKS.length,
};
