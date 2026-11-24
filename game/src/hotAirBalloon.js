// Hot Air Balloon — Wren's dawn balloon over Solara Valley.
// Pay the gas, rise with the sun, and drift wherever the morning
// wind decides to take you. Passengers pay for the ride, photographers
// pay for what you spot below — deer in the mist, a hidden waterfall,
// a lighthouse beam on the dawn sea. Fuel is your altitude, the wind
// is your steering, and every landing is a small negotiation with a
// farmer whose field you just borrowed. Fly at dawn, land gentle.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const BALLOON_ROUTES = [
  { id: 'dawn-valley', name: 'Dawn Valley', price: 50, difficulty: 1,
    steps: 4, duration: 30, risk: 0, altitude: 300, view: 3,
    desc: 'Mist in the valley, sun on the hills.' },
  { id: 'orchard-float', name: 'Orchard Float', price: 65, difficulty: 1,
    steps: 5, duration: 30, risk: 0, altitude: 250, view: 3,
    desc: 'Rows of blossom below, bees somewhere under you.' },
  { id: 'river-bend', name: 'River Bend', price: 80, difficulty: 2,
    steps: 5, duration: 35, risk: 1, altitude: 400, view: 4,
    desc: 'The river curls like a ribbon in the morning light.' },
  { id: 'lake-mist', name: 'Lake Mist', price: 95, difficulty: 2,
    steps: 5, duration: 35, risk: 1, altitude: 350, view: 4,
    desc: 'A lake that steams at dawn.' },
  { id: 'vineyard-drift', name: 'Vineyard Drift', price: 110, difficulty: 2,
    steps: 6, duration: 40, risk: 1, altitude: 450, view: 4,
    desc: 'Neat green rows and a white farmhouse.' },
  { id: 'castle-loop', name: 'Castle Loop', price: 140, difficulty: 3,
    steps: 6, duration: 45, risk: 1, altitude: 500, view: 5,
    desc: 'Circle the old castle at breakfast time.' },
  { id: 'coast-glide', name: 'Coast Glide', price: 160, difficulty: 3,
    steps: 6, duration: 45, risk: 2, altitude: 600, view: 5,
    desc: 'Sea on one side, cliffs on the other.' },
  { id: 'desert-sunrise', name: 'Desert Sunrise', price: 190, difficulty: 4,
    steps: 7, duration: 50, risk: 2, altitude: 700, view: 5,
    desc: 'Dunes turning gold as the sun comes up.' },
  { id: 'mountain-dawn', name: 'Mountain Dawn', price: 230, difficulty: 4,
    steps: 7, duration: 55, risk: 3, altitude: 900, view: 5,
    desc: 'Peaks catching the first light, one by one.' },
  { id: 'city-skyline', name: 'City Skyline', price: 280, difficulty: 5,
    steps: 8, duration: 60, risk: 2, altitude: 800, view: 5,
    desc: 'The whole city waking up below you.' },
];

export const BALLOON_SIGHTS = [
  { id: 'deer-herd', name: 'Deer Herd', value: 20, rarity: 0.26,
    weight: 0, desc: 'A herd moving through the mist.' },
  { id: 'old-windmill', name: 'Old Windmill', value: 30, rarity: 0.18,
    weight: 0, desc: 'Sails turning slowly in the dawn.' },
  { id: 'rainbow-arc', name: 'Rainbow Arc', value: 45, rarity: 0.12,
    weight: 0, desc: 'A full arc over the valley.' },
  { id: 'hot-spring', name: 'Hidden Hot Spring', value: 60, rarity: 0.1,
    weight: 0, desc: 'Steam rising from a secret pool.' },
  { id: 'eagle-nest', name: 'Eagle Nest', value: 80, rarity: 0.08,
    weight: 0, desc: 'An eagle watches you from its cliff.' },
  { id: 'castle-ruins', name: 'Castle Ruins', value: 110, rarity: 0.06,
    weight: 0, desc: 'Walls no map remembers.' },
  { id: 'hidden-waterfall', name: 'Hidden Waterfall', value: 150, rarity: 0.05,
    weight: 0, desc: 'White water behind a green fold.' },
  { id: 'whale-spout', name: 'Whale Spout', value: 200, rarity: 0.04,
    weight: 0, desc: 'A spout on the horizon, far out at sea.' },
  { id: 'lighthouse-beam', name: 'Lighthouse Beam', value: 260, rarity: 0.02,
    weight: 0, desc: 'The beam sweeping the dawn sea.' },
  { id: 'aurora-wisp', name: 'Aurora Wisp', value: 400, rarity: 0.01,
    weight: 0, desc: 'A green wisp of light, once in a lifetime.' },
];

export const BALLOON_UPGRADES = [
  { id: 'basket', name: 'Bigger Basket', cost: 100,
    desc: 'More passengers, +5 sight slots.', effect: 'carry-plus' },
  { id: 'burner', name: 'Twin Burner', cost: 180,
    desc: 'Climb faster, burn cleaner.', effect: 'climb-plus' },
  { id: 'radio', name: 'Ground Radio', cost: 220,
    desc: 'Spotters call in sights: +25% finds.', effect: 'find-plus' },
  { id: 'camera', name: 'Telephoto Camera', cost: 300,
    desc: 'Sight photos pay +20%.', effect: 'price-plus' },
  { id: 'gps', name: 'Drift GPS', cost: 260,
    desc: 'Know where the wind is taking you.', effect: 'nav-plus' },
  { id: 'ballast', name: 'Ballast Kit', cost: 350,
    desc: 'Steadier flight, +10 sight slots.', effect: 'carry-plus-2' },
  { id: 'envelope', name: 'Silk Envelope', cost: 600,
    desc: 'Fuel lasts +40 on every flight.', effect: 'fuel-plus' },
  { id: 'champagne', name: 'Champagne Kit', cost: 500,
    desc: 'Passengers tip better after a toast.', effect: 'tip-plus' },
];

export const BALLOON_RANKS = [
  { level: 0, name: 'Ground Crew', xp: 0,
    perk: 'Short hops pay base rate.' },
  { level: 1, name: 'Dawn Pilot', xp: 120,
    perk: '+10% sight prices.' },
  { level: 2, name: 'Valley Pilot', xp: 300,
    perk: 'Longer routes open up.' },
  { level: 3, name: 'Cloud Captain', xp: 620,
    perk: '+20% sight prices, high routes unlocked.' },
  { level: 4, name: 'Sky Admiral', xp: 1100,
    perk: '+30% sight prices, rare sights doubled.' },
];

export const BALLOON_EVENTS = [
  { id: 'balloon-fest', name: 'Balloon Festival',
    desc: 'Forty balloons fill the dawn sky.' },
  { id: 'inversion', name: 'Morning Inversion',
    desc: 'Still air and a sea of mist below.' },
  { id: 'wind-shift', name: 'Wind Shift',
    desc: 'The wind turns at mid-flight.' },
  { id: 'fog-bank', name: 'Fog Bank',
    desc: 'Thick fog sits over the river.' },
  { id: 'harvest-fair', name: 'Harvest Fair',
    desc: 'The valley fair is in full swing below.' },
  { id: 'eagle-day', name: 'Eagle Day',
    desc: 'Three eagles circle the launch field.' },
  { id: 'rain-shower', name: 'Rain Shower',
    desc: 'A sharp shower crosses the valley.' },
  { id: 'clear-dawn', name: 'Clear Dawn',
    desc: 'Fifty kilometres of visibility.' },
  { id: 'wedding-flight', name: 'Wedding Flight',
    desc: 'A couple books the balloon for their vows.' },
  { id: 'hot-air-race', name: 'Hot Air Race',
    desc: 'Five balloons race to the far hill.' },
];

export const BALLOON_CONTRACTS = [
  { id: 'deer-10', name: 'Wildlife Shoot', material: 'deer-herd', qty: 10,
    pay: 280, days: 1, rep: 1,
    desc: 'A magazine needs ten deer-herd shots.' },
  { id: 'waterfall-4', name: 'Waterfall Feature', material: 'hidden-waterfall', qty: 4,
    pay: 700, days: 2, rep: 3,
    desc: 'A travel guide wants four waterfall photos.' },
  { id: 'eagle-6', name: 'Eagle Watch', material: 'eagle-nest', qty: 6,
    pay: 560, days: 2, rep: 2,
    desc: 'A nature trust pays for six eagle sightings.' },
  { id: 'rainbow-5', name: 'Rainbow Hunt', material: 'rainbow-arc', qty: 5,
    pay: 320, days: 2, rep: 1,
    desc: 'A calendar company wants five rainbows.' },
  { id: 'whale-2', name: 'Whale Watch', material: 'whale-spout', qty: 2,
    pay: 600, days: 3, rep: 4,
    desc: 'A tour company needs two whale spouts.' },
  { id: 'mixed-25', name: 'Valley Album', material: 'mixed', qty: 25,
    pay: 550, days: 2, rep: 2,
    desc: 'Any twenty-five sights for the valley album.' },
];

export const BALLOON_CHALLENGES = [
  { id: 'flights-10', name: 'Ten Flights', target: 'sessions', goal: 10, xp: 90,
    desc: 'Finish 10 balloon flights.' },
  { id: 'sights-100', name: 'Century of Sights', target: 'findsFound', goal: 100, xp: 110,
    desc: 'Spot 100 sights.' },
  { id: 'earn-1000', name: 'Grand in the Sky', target: 'earned', goal: 1000, xp: 130,
    desc: 'Earn $1,000 from ballooning.' },
  { id: 'streak-8', name: 'Clean Eight', target: 'bestStreak', goal: 8, xp: 100,
    desc: 'Eight clean steps in a row.' },
  { id: 'contracts-3', name: 'Reliable Pilot', target: 'contractsDone', goal: 3, xp: 120,
    desc: 'Complete 3 photo contracts.' },
  { id: 'actions-200', name: 'Two Hundred Drifts', target: 'actions', goal: 200, xp: 140,
    desc: 'Take 200 drift steps.' },
  { id: 'first-sight', name: 'First Sight', target: 'findsFound', goal: 1, xp: 60,
    desc: 'Spot your first sight.' },
  { id: 'dawn-5', name: 'Dawn Five', target: 'sessions', goal: 5, xp: 80,
    desc: 'Finish 5 dawn flights.' },
];

export const BALLOON_ACHIEVEMENTS = [
  { id: 'first-flight', name: 'First Flight', check: (s) => s.sessions >= 1,
    desc: 'Finish your first balloon flight.' },
  { id: 'aurora-club', name: 'Aurora Club', check: (s) => (s.inventory['aurora-wisp'] || 0) + s.findsSold >= 1,
    desc: 'Spot the aurora wisp.' },
  { id: 'rank-3', name: 'Cloud Captain', check: (s) => s.rank >= 3,
    desc: 'Reach rank Cloud Captain.' },
  { id: 'rich-sky', name: 'Sky Rich', check: (s) => s.earned >= 3000,
    desc: 'Earn $3,000 from ballooning.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8,
    desc: 'Own every balloon upgrade.' },
  { id: 'no-hazard', name: 'Smooth Air', check: (s) => s.sessions >= 10 && s.hazardsTaken === 0,
    desc: 'Ten flights with zero hazards.' },
  { id: 'big-yield', name: 'Big Yield', check: (s) => s.bestSessionYield >= 500,
    desc: 'One flight worth $500 or more.' },
  { id: 'sights-50', name: 'Fifty Sights', check: (s) => s.actions >= 50,
    desc: 'Fifty drift steps aloft.' },
];

export const BALLOON_TIPS = [
  { id: 'dawn-first', name: 'Dawn First',
    text: 'Fly at dawn. The air is calm and the light is gold.' },
  { id: 'fuel-watch', name: 'Fuel Watch',
    text: 'Fuel is your altitude. Never burn it all on a climb.' },
  { id: 'radio-money', name: 'Radio Money',
    text: 'Ground spotters find what you cannot see.' },
  { id: 'landing-farm', name: 'Landing Farm',
    text: 'Carry a bottle for the farmer. Landings go smoother.' },
  { id: 'wind-check', name: 'Wind Check',
    text: 'The wind at dawn decides where you end up.' },
  { id: 'contract-first', name: 'Contracts First',
    text: 'Take a photo contract, then fly its route.' },
  { id: 'camera-money', name: 'Camera Money',
    text: 'A telephoto lens turns a speck into a sale.' },
  { id: 'envelope-early', name: 'Envelope Early',
    text: 'Save for the silk envelope — it changes every flight.' },
];

export const BALLOON_LEADERBOARD = [
  { name: 'Old Henri', value: 7800, desc: 'Flew the valley for thirty years.' },
  { name: 'Mara', value: 5900, desc: 'Festival pilot, never missed a dawn.' },
  { name: 'Wren', value: 0, desc: 'You. Climbing.' },
  { name: 'Pip', value: 3100, desc: 'Youngest pilot in the valley.' },
  { name: 'Gus', value: 1700, desc: 'Landed in every farm in the county.' },
];

export const BALLOON_RECORDS = [
  { id: 'most-flights', name: 'Most Flights', stat: 'sessions', unit: 'flights',
    desc: 'Most flights finished.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$',
    desc: 'Most money earned from ballooning.' },
  { id: 'most-sights', name: 'Most Sights', stat: 'findsFound', unit: 'sights',
    desc: 'Most sights spotted.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'steps',
    desc: 'Longest clean streak.' },
  { id: 'best-flight', name: 'Best Flight', stat: 'bestSessionYield', unit: '$',
    desc: 'Best single-flight yield.' },
];

export const BALLOON_MARKET = [
  { id: 'deer-boom', name: 'Deer Boom', finds: ['deer-herd'], mult: 1.3,
    desc: 'A wildlife magazine is buying deer shots.' },
  { id: 'waterfall-rush', name: 'Waterfall Rush', finds: ['hidden-waterfall'], mult: 1.5,
    desc: 'A travel guide wants waterfalls.' },
  { id: 'eagle-week', name: 'Eagle Week', finds: ['eagle-nest'], mult: 1.45,
    desc: 'A nature trust is paying for eagles.' },
  { id: 'rainbow-season', name: 'Rainbow Season', finds: ['rainbow-arc'], mult: 1.35,
    desc: 'Rainy mornings, rainbows everywhere.' },
  { id: 'whale-film', name: 'Whale Film', finds: ['whale-spout'], mult: 1.6,
    desc: 'A film crew pays double for spouts.' },
  { id: 'windmill-fair', name: 'Windmill Fair', finds: ['old-windmill'], mult: 1.3,
    desc: 'A heritage fair wants windmill shots.' },
  { id: 'spring-glut', name: 'Spring Glut', finds: ['hot-spring'], mult: 0.7,
    desc: 'Everyone found the hot spring this week.' },
  { id: 'aurora-bid', name: 'Aurora Bid', finds: ['aurora-wisp'], mult: 1.7,
    desc: 'A collector will pay anything for the wisp.' },
];

export const BALLOON_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1,
    desc: 'Fresh winds and full bookings.' },
  { id: 'summer', name: 'Summer', mult: 1.2,
    desc: 'Peak season, everyone is flying.' },
  { id: 'autumn', name: 'Autumn', mult: 1.0,
    desc: 'Steady work, thinner crowds.' },
  { id: 'winter', name: 'Winter', mult: 0.85,
    desc: 'Cold air, quiet days.' },
];

export const BALLOON_SEASONAL = [
  { season: 'spring', find: 'deer-herd', mult: 1.3 },
  { season: 'spring', find: 'rainbow-arc', mult: 1.25 },
  { season: 'summer', find: 'hidden-waterfall', mult: 1.3 },
  { season: 'summer', find: 'whale-spout', mult: 1.2 },
  { season: 'autumn', find: 'old-windmill', mult: 1.25 },
  { season: 'autumn', find: 'castle-ruins', mult: 1.3 },
  { season: 'winter', find: 'aurora-wisp', mult: 1.4 },
  { season: 'winter', find: 'lighthouse-beam', mult: 1.25 },
];

export const BALLOON_QUICK_START = [
  'Fly at dawn — calm air, golden light, happy passengers.',
  'Sell common sights early; keep rare ones for contracts.',
  'Buy the ground radio before the long routes.',
  'Watch your fuel gauge, not the view.',
  'Take photo contracts for sights on your route.',
  'Save for the silk envelope — longer flights, more sights.',
];

export const BALLOON_HELPERS = [
  { id: 'spotter', name: 'Pip the Spotter', wage: 30, skill: 'collect', bonus: 0.15,
    desc: 'Sharp eyes on the ground: +15% sight yield.' },
  { id: 'photog', name: 'Mara the Photographer', wage: 45, skill: 'find', bonus: 0.25,
    desc: 'Never misses a shot: +25% rare sights.' },
  { id: 'crew', name: 'Gus the Crew Chief', wage: 55, skill: 'carry', bonus: 0.4,
    desc: 'Fast setup: +40% sight slots.' },
  { id: 'agent', name: 'Quiet Ana', wage: 75, skill: 'sell', bonus: 0.12,
    desc: 'Knows the buyers: +12% sight prices.' },
];

export function balloonRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < BALLOON_RANKS.length; i++) {
    if (xp >= BALLOON_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function balloonPriceFor(sightId, dayDrift, rank, upgrades) {
  const f = BALLOON_SIGHTS.find((x) => x.id === sightId);
  if (!f) return 0;
  let price = f.value;
  price *= 1 + (dayDrift[sightId] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('camera')) price *= 1.2;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function balloonCarryCap(upgrades) {
  let cap = 15;
  if (upgrades.includes('basket')) cap += 5;
  if (upgrades.includes('ballast')) cap += 10;
  return cap;
}

export function balloonFuelMax(upgrades) {
  let max = 100;
  if (upgrades.includes('envelope')) max += 40;
  return max;
}

export function balloonEventMult(eventId, sightId) {
  const ev = BALLOON_MARKET.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.finds.includes(sightId) ? ev.mult : 1;
}

export function balloonSeasonMult(seasonId) {
  const s = BALLOON_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function balloonEventFor(day) {
  return BALLOON_MARKET[day % BALLOON_MARKET.length];
}

export function balloonSeasonalPriceMult(seasonId, sightId) {
  const row = BALLOON_SEASONAL.find((x) => x.season === seasonId && x.find === sightId);
  return row ? row.mult : 1;
}

export function balloonBestSeason(sightId) {
  let best = null;
  let bestMult = 0;
  for (const row of BALLOON_SEASONAL) {
    if (row.find === sightId && row.mult > bestMult) { bestMult = row.mult; best = row.season; }
  }
  return best ? { season: best, mult: bestMult } : null;
}

export function balloonBestBuyer(sightId, dayDrift, rank, upgrades) {
  const base = balloonPriceFor(sightId, dayDrift, rank, upgrades);
  return { price: base, note: 'Tourists pay best for rare sightings with photos.' };
}

export function balloonScore(sessions, yieldTotal, hazards) {
  const base = sessions * 10 + Math.round(yieldTotal);
  const penalty = hazards * 5;
  return Math.max(0, base - penalty);
}

export function balloonGrade(sessions, yieldTotal, hazards) {
  const score = balloonScore(sessions, yieldTotal, hazards);
  if (score >= 400) return 'S';
  if (score >= 250) return 'A';
  if (score >= 140) return 'B';
  if (score >= 60) return 'C';
  return 'D';
}

export function balloonWeeklyGoal(sessions, sold, earned) {
  const goal = { sessions: 5, sold: 40, earned: 600 };
  return {
    sessions: { have: sessions, goal: goal.sessions, done: sessions >= goal.sessions },
    sold: { have: sold, goal: goal.sold, done: sold >= goal.sold },
    earned: { have: Math.round(earned), goal: goal.earned, done: earned >= goal.earned },
    allDone: sessions >= goal.sessions && sold >= goal.sold && earned >= goal.earned,
  };
}

export function balloonTipFor(day) {
  return BALLOON_TIPS[day % BALLOON_TIPS.length];
}

export function balloonLeaderboardWith(playerValue) {
  const board = BALLOON_LEADERBOARD.map((e) => ({
    name: e.name, value: e.name === 'Wren' ? playerValue : e.value, desc: e.desc,
  }));
  board.sort((a, b) => b.value - a.value);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function balloonRecordFor(recordId, state) {
  const r = BALLOON_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function balloonAllRecords(state) {
  return BALLOON_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function balloonEfficiency(actions, hazards) {
  const total = actions + hazards;
  if (total === 0) return 100;
  return Math.round((actions / total) * 100);
}

export function balloonProfitPerFlight(earned, sessions) {
  if (sessions === 0) return 0;
  return Math.round((earned / sessions) * 10) / 10;
}

export function balloonInventoryValue(inventory) {
  let total = 0;
  for (const [id, qty] of Object.entries(inventory)) {
    const f = BALLOON_SIGHTS.find((x) => x.id === id);
    if (f) total += f.value * qty;
  }
  return Math.round(total * 10) / 10;
}

export function balloonTotalValue(state) {
  return balloonInventoryValue(state.inventory);
}

export function balloonProgressPercent(state) {
  const total = state.actions + state.findsSold;
  if (total === 0) return 0;
  return Math.round((state.actions / total) * 100);
}

export function balloonQuickStart(step) {
  return BALLOON_QUICK_START[step] || null;
}

export function balloonSummary(state) {
  return `Hot Air Balloon ${BALLOON_RANKS[state.rank].name}: ${state.sessions} flights, ${state.actions} drifts, $${Math.round(state.earned)} earned, ${state.findsFound} sights.`;
}

export function balloonNextGoal(state) {
  if (state.sessions < 3) return 'Fly 3 routes.';
  if (state.actions < 50) return 'Spot 50 sights.';
  if (state.rank < 2) return 'Reach rank Cloud Captain.';
  return 'Become the Sky Admiral.';
}

export function balloonChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function balloonHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of BALLOON_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function balloonRouteByAltitude(altitude) {
  let best = null;
  for (const s of BALLOON_ROUTES) {
    if (s.altitude <= altitude && (!best || s.altitude > best.altitude)) best = s;
  }
  return best;
}

export function balloonSightsByRarity(maxRarity) {
  return BALLOON_SIGHTS.filter((f) => f.rarity <= maxRarity).map((f) => f.id);
}

export function createHotAirBalloonSystem(ctx) {
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
  for (const f of BALLOON_SIGHTS) { state.inventory[f.id] = 0; state.dayDrift[f.id] = 0; }

  function refreshRank() {
    const r = balloonRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Hot Air Balloon rank up: ${BALLOON_RANKS[r].name} — ${BALLOON_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const f of BALLOON_SIGHTS) {
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

  function pickSight(route) {
    const bag = [];
    for (const f of BALLOON_SIGHTS) {
      let w = f.rarity;
      if (state.rank >= 3 && f.rarity < 0.08) w *= 1.6;
      if (state.upgrades.includes('radio')) w *= 1.25;
      bag.push({ f, w });
    }
    let total = 0;
    for (const b of bag) total += b.w;
    let roll = rng() * total;
    for (const b of bag) {
      roll -= b.w;
      if (roll <= 0) return b.f;
    }
    return BALLOON_SIGHTS[0];
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
    log(`Hot Air Balloon ${done} ${reason} — yield $${Math.round(state.sessionYield)}, ${state.sessionFinds} sights.`);
    state.sessionYield = 0;
    state.sessionFinds = 0;
  }

  function launch(routeId) {
    const route = BALLOON_ROUTES.find((s) => s.id === routeId);
    if (!route) return { ok: false, reason: 'no-such-site' };
    if (state.session) return { ok: false, reason: 'session-active' };
    if (weatherBlocks()) {
      state.weatherStops += 1;
      return { ok: false, reason: 'bad-weather', condition: weather() };
    }
    const hour = getHour();
    if (hour < 5 || hour >= 12) return { ok: false, reason: 'too-late', hour };
    if (getCash() < route.price) return { ok: false, reason: 'not-enough-cash', cost: route.price };
    if (route.price > 0) { addCash(-route.price); state.spent += route.price; }
    state.session = routeId;
    state.sessionStepsLeft = route.steps;
    state.sessionTimeLeft = route.duration * 60;
    state.resource = balloonFuelMax(state.upgrades);
    log(`Hot Air Balloon started: ${route.name} — ${route.steps} drifts, ${route.duration} min, ${route.altitude}m up.`);
    return { ok: true, site: routeId, steps: route.steps, duration: route.duration };
  }

  function drift() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    if (state.sessionStepsLeft <= 0) return { ok: false, reason: 'session-done' };
    const route = BALLOON_ROUTES.find((s) => s.id === state.session);
    state.resource -= 10;
    if (state.resource < 0) state.resource = 0;
    const cap = balloonCarryCap(state.upgrades);
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held >= cap) return { ok: false, reason: 'carry-full', cap };
    const f = pickSight(route);
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
      const rare = BALLOON_SIGHTS.filter((x) => x.rarity < 0.06);
      const pick = rare[Math.floor(rng() * rare.length)];
      state.inventory[pick.id] += 1;
      state.findsFound += 1;
      state.sessionYield += pick.value;
      state.totalYield += pick.value;
      got.push({ id: pick.id, name: pick.name, qty: 1, value: pick.value, rare: true });
      log(`Hot Air Balloon rare sight! ${pick.name} worth $${pick.value}.`);
    }
    if (rng() < route.risk * 0.04) {
      state.hazardsTaken += 1;
      state.streak = 0;
      state.resource -= 12;
      if (rng() < 0.3) { addCash(-20); state.spent += 20; }
      log(`Hot Air Balloon hazard at ${route.name}: a sudden downdraft dropped the basket and burned extra fuel.`);
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

  function landEarly() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    finishSession('ended early');
    return { ok: true, ended: 'early' };
  }

  function spotLandmark() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    const cost = 8;
    if (state.resource < cost) return { ok: false, reason: 'not-enough-resource', need: cost };
    state.resource -= cost;
    state.specialsUsed += 1;
    if (rng() < 0.55) {
      const f = pickSight(BALLOON_ROUTES[0]);
      state.inventory[f.id] += 1;
      state.findsFound += 1;
      state.sessionYield += f.value;
      gainXp(10);
      log(`Hot Air Balloon spot landmark: spotted from the basket: ${f.name}.`);
      return { ok: true, success: true, find: f.id, name: f.name };
    }
    log('Hot Air Balloon spot landmark: clouds hid everything below.');
    return { ok: true, success: false };
  }

  function sellFind(sightId, qty) {
    const f = BALLOON_SIGHTS.find((x) => x.id === sightId);
    if (!f) return { ok: false, reason: 'no-such-find' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = state.inventory[sightId] || 0;
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = balloonPriceFor(sightId, state.dayDrift, state.rank, state.upgrades);
    const total = Math.round(unit * qty * 10) / 10;
    state.inventory[sightId] -= qty;
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
    for (const f of BALLOON_SIGHTS) {
      const have = state.inventory[f.id] || 0;
      if (have <= 0) continue;
      const unit = balloonPriceFor(f.id, state.dayDrift, state.rank, state.upgrades);
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
    log(`Sold everything (${units} sights) for $${total}.`);
    return { ok: true, total, units, lines };
  }

  function buyUpgrade(id) {
    const u = BALLOON_UPGRADES.find((x) => x.id === id);
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
    const ct = BALLOON_CONTRACTS.find((x) => x.id === id);
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
      for (const f of BALLOON_SIGHTS) {
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
    return BALLOON_SIGHTS.map((f) => ({
      id: f.id,
      name: f.name,
      price: balloonPriceFor(f.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[f.id],
      held: state.inventory[f.id],
    }));
  }

  function siteReport() {
    return BALLOON_ROUTES.map((s) => ({
      id: s.id, name: s.name, fee: s.price, difficulty: s.difficulty, steps: s.steps, risk: s.risk,
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.16) {
      const f = BALLOON_SIGHTS[Math.floor(rng() * BALLOON_SIGHTS.length)];
      state.dayDrift[f.id] = Math.round((state.dayDrift[f.id] + 0.3) * 100) / 100;
      log(`Hot Air Balloon news: ${f.name} is in demand — prices up today!`);
      return { event: 'demand-spike', find: f.id };
    }
    if (roll < 0.28) {
      const f = BALLOON_SIGHTS[Math.floor(rng() * BALLOON_SIGHTS.length)];
      state.dayDrift[f.id] = Math.round((state.dayDrift[f.id] - 0.15) * 100) / 100;
      log(`Hot Air Balloon news: too much ${f.name} around — prices dip.`);
      return { event: 'price-dip', find: f.id };
    }
    if (roll < 0.38) {
      const f = BALLOON_SIGHTS[Math.floor(rng() * BALLOON_SIGHTS.length)];
      state.inventory[f.id] += 3;
      state.findsFound += 3;
      log(`Hot Air Balloon gift: a spotter hands you 3x ${f.name} on film.`);
      return { event: 'gift', find: f.id };
    }
    if (roll < 0.46) {
      const ev = BALLOON_EVENTS[Math.floor(rng() * BALLOON_EVENTS.length)];
      log(`Hot Air Balloon event: ${ev.name} — ${ev.desc}`);
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
    for (const f of BALLOON_SIGHTS) {
      if (state.inventory[f.id] === undefined) state.inventory[f.id] = 0;
      if (state.dayDrift[f.id] === undefined) state.dayDrift[f.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: BALLOON_RANKS[state.rank].name,
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
      resourceMax: balloonFuelMax(state.upgrades),
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
    if (state.session) return `Hot Air Balloon: ${state.session} — ${state.sessionStepsLeft} drifts left, fuel ${Math.round(state.resource)}`;
    if (state.activeContract) return `Hot Air Balloon: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held > 0) return `Hot Air Balloon: ${held} sights held`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const near = Math.hypot(pos.x - 200, pos.z - 150) < 30;
    if (!near) return false;
    if (state.session) { drift(); return true; }
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held > 0) { sellAllFinds(); return true; }
    launch(BALLOON_ROUTES[0].id);
    return true;
  }

  return {
    name: 'Hot Air Balloon',
    state,
    launch, drift, landEarly, spotLandmark,
    sellFind, sellAllFinds, buyUpgrade, takeContract,
    deliverContract, abandonContract, priceBoard, siteReport,
    dailyEvent, tick, tickDay, serialize, deserialize,
    stats, hudLine, interact,
  };
}

export function createHotAirBalloonExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function hireHelper(id) {
    const h = BALLOON_HELPERS.find((x) => x.id === id);
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
      const h = BALLOON_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    return balloonHelperBonus(helpers, skill);
  }

  function challenges() {
    return BALLOON_CHALLENGES.map((ch) => balloonChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = BALLOON_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = balloonChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return BALLOON_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function donateFinds(sightId, qty) {
    const have = system.state.inventory[sightId] || 0;
    if (have < qty || qty <= 0) return { ok: false, reason: 'not-enough', have };
    system.state.inventory[sightId] -= qty;
    const rep = Math.floor(qty / 5);
    return { ok: true, qty, rep, note: 'The valley trust thanks you. The view remembers.' };
  }

  function bundleSale(sightId, qty) {
    const have = system.state.inventory[sightId] || 0;
    if (have < qty || qty < 10) return { ok: false, reason: 'need-10-plus', have };
    const unit = balloonPriceFor(sightId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(unit * qty * 1.1 * 10) / 10;
    system.state.inventory[sightId] -= qty;
    system.state.findsSold += qty;
    system.state.earned += total;
    return { ok: true, total, qty, bonus: 'bundle +10%' };
  }

  function checkFuel() {
    const max = balloonFuelMax(system.state.upgrades);
    return {
      resource: Math.round(system.state.resource * 10) / 10,
      max,
      pct: Math.round((system.state.resource / max) * 100),
    };
  }

  function refillFuel() {
    system.state.resource = balloonFuelMax(system.state.upgrades);
    return { ok: true, resource: system.state.resource };
  }

  function countSights() {
    const held = Object.values(system.state.inventory).reduce((a, b) => a + b, 0);
    return { sights: held, cap: balloonCarryCap(system.state.upgrades) };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, donateFinds, bundleSale,
    checkFuel, refillFuel, countSights,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return helperWagesPaid; },
  };
}

export function createHotAirBalloonMarket(system) {
  let currentEvent = null;
  let currentSeason = 'spring';
  let dealsClaimed = 0;
  let bulkSold = 0;

  function setEvent(eventId) {
    const ev = BALLOON_MARKET.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = BALLOON_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    system.state.season = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(sightId, basePrice) {
    let price = basePrice;
    price *= balloonEventMult(currentEvent, sightId);
    price *= balloonSeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(sightId, qty) {
    const have = system.state.inventory[sightId] || 0;
    if (have < qty || qty < 20) return { ok: false, reason: 'need-20-plus', have };
    const unit = balloonPriceFor(sightId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(eventPrice(sightId, unit) * qty * 1.1 * 10) / 10;
    system.state.inventory[sightId] -= qty;
    system.state.findsSold += qty;
    system.state.earned += total;
    bulkSold += qty;
    dealsClaimed += 1;
    return { ok: true, total, qty, bonus: 'bulk +10%' };
  }

  function dailyDeals() {
    const deals = [];
    for (const f of BALLOON_SIGHTS) {
      const mult = balloonEventMult(currentEvent, f.id);
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

export const HOTAIRBALLOON_META = {
  system: 'balloon',
  version: '7c-B2',
  author: 'builder-2',
  dataCount: BALLOON_ROUTES.length,
  findCount: BALLOON_SIGHTS.length,
  upgradeCount: BALLOON_UPGRADES.length,
  rankCount: BALLOON_RANKS.length,
};
