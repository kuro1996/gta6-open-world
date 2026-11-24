// Skydiving — Jett's drop zone at Solara Airfield.
// Pay the plane, climb to altitude, and step out over the coast with
// nothing between you and the ground but a rig and a plan. Stitch
// tricks together in freefall — spins, flips, formation stars — then
// open the canopy and ride it home. Sponsors pay for clean footage,
// the crowd pays for courage, and every jump spends altitude you
// never get back. Check the windsock, trust your altimeter.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const DROP_ZONES = [
  { id: 'cloud-nine', name: 'Cloud Nine', price: 60, difficulty: 1,
    steps: 4, duration: 20, risk: 0, altitude: 3000, wind: 1,
    desc: 'Gentle air, big sky, perfect first jump.' },
  { id: 'sunset-strip', name: 'Sunset Strip', price: 80, difficulty: 1,
    steps: 5, duration: 25, risk: 0, altitude: 3500, wind: 1,
    desc: 'Golden light over the coast at dusk.' },
  { id: 'lake-mirror', name: 'Lake Mirror', price: 95, difficulty: 2,
    steps: 5, duration: 25, risk: 1, altitude: 4000, wind: 2,
    desc: 'A glass lake below, hard to judge distance.' },
  { id: 'forest-canopy', name: 'Forest Canopy', price: 110, difficulty: 2,
    steps: 5, duration: 30, risk: 1, altitude: 4000, wind: 2,
    desc: 'Green carpet below, thermals that lift you.' },
  { id: 'island-hop', name: 'Island Hop', price: 130, difficulty: 3,
    steps: 6, duration: 30, risk: 1, altitude: 4500, wind: 2,
    desc: 'Jump over one island, land on the next.' },
  { id: 'desert-dunes', name: 'Desert Dunes', price: 150, difficulty: 3,
    steps: 6, duration: 35, risk: 2, altitude: 4500, wind: 3,
    desc: 'Sand seas and hard, shifty air.' },
  { id: 'canyon-edge', name: 'Canyon Edge', price: 180, difficulty: 4,
    steps: 7, duration: 35, risk: 2, altitude: 5000, wind: 3,
    desc: 'Rock walls on both sides, no room for error.' },
  { id: 'mountain-pass', name: 'Mountain Pass', price: 210, difficulty: 4,
    steps: 7, duration: 40, risk: 3, altitude: 5500, wind: 3,
    desc: 'Thin air and a landing strip like a ribbon.' },
  { id: 'city-lights', name: 'City Lights', price: 240, difficulty: 5,
    steps: 8, duration: 40, risk: 2, altitude: 5000, wind: 2,
    desc: 'Night jump over the glittering grid.' },
  { id: 'volcano-rim', name: 'Volcano Rim', price: 300, difficulty: 5,
    steps: 8, duration: 45, risk: 3, altitude: 6000, wind: 3,
    desc: 'Smoke, heat, and the best footage on earth.' },
];

export const SKYDIVE_TRICKS = [
  { id: 'freefall-spin', name: 'Freefall Spin', value: 25, rarity: 0.26,
    risk: 0, desc: 'A clean 360 in freefall.' },
  { id: 'barrel-roll', name: 'Barrel Roll', value: 35, rarity: 0.18,
    risk: 1, desc: 'One full roll, head over heels.' },
  { id: 'backflip', name: 'Backflip', value: 50, rarity: 0.13,
    risk: 1, desc: 'Backwards over the sky.' },
  { id: 'sit-fly', name: 'Sit Fly', value: 65, rarity: 0.1,
    risk: 1, desc: 'Flying seated, like the sky is a chair.' },
  { id: 'angle-fly', name: 'Angle Fly', value: 80, rarity: 0.08,
    risk: 2, desc: 'A steep diagonal dive across the sky.' },
  { id: 'head-down', name: 'Head Down', value: 110, rarity: 0.06,
    risk: 2, desc: 'Straight down, fastest a human can fall.' },
  { id: 'canopy-swoop', name: 'Canopy Swoop', value: 140, rarity: 0.05,
    risk: 2, desc: 'A low, fast pass under canopy.' },
  { id: 'formation-star', name: 'Formation Star', value: 180, rarity: 0.04,
    risk: 1, desc: 'Eight jumpers, one perfect star.' },
  { id: 'wingsuit-glide', name: 'Wingsuit Glide', value: 260, rarity: 0.02,
    risk: 3, desc: 'Flying like a bird past the canyon wall.' },
  { id: 'tandem-flip', name: 'Tandem Flip', value: 340, rarity: 0.01,
    risk: 3, desc: 'Two people, one flip, zero margin.' },
];

export const SKYDIVE_UPGRADES = [
  { id: 'jumpsuit', name: 'Pro Jumpsuit', cost: 90,
    desc: 'Better grip, +4 trick slots per jump.', effect: 'carry-plus' },
  { id: 'altimeter', name: 'Digital Altimeter', cost: 130,
    desc: 'Never lose track of your height.', effect: 'altitude-plus' },
  { id: 'helmetcam', name: 'Helmet Camera', cost: 280,
    desc: 'Filmed tricks pay +20% from sponsors.', effect: 'price-plus' },
  { id: 'rig', name: 'Lightweight Rig', cost: 200,
    desc: 'Lighter rig, +6 trick slots per jump.', effect: 'carry-plus-2' },
  { id: 'gps', name: 'Jump GPS', cost: 420,
    desc: 'Tricks are 25% easier to chain.', effect: 'find-plus' },
  { id: 'canopy', name: 'High-Performance Canopy', cost: 700,
    desc: 'Altitude lasts +1000 on every jump.', effect: 'altitude-plus-2' },
  { id: 'wingsuit', name: 'Wingsuit', cost: 850,
    desc: 'Glide further, land bigger tricks.', effect: 'glide' },
  { id: 'reserve', name: 'Smart Reserve', cost: 950,
    desc: 'Hazards hurt half as much.', effect: 'safety' },
];

export const SKYDIVE_RANKS = [
  { level: 0, name: 'First Timer', xp: 0,
    perk: 'Gentle zones pay base rate.' },
  { level: 1, name: 'Licensed Jumper', xp: 120,
    perk: '+10% sponsor pay.' },
  { level: 2, name: 'Formation Flyer', xp: 300,
    perk: 'Formation tricks open up.' },
  { level: 3, name: 'Freeflyer', xp: 620,
    perk: '+20% sponsor pay, head-down unlocked.' },
  { level: 4, name: 'Sky Master', xp: 1100,
    perk: '+30% sponsor pay, wingsuit glides.' },
];

export const SKYDIVE_EVENTS = [
  { id: 'boogie-week', name: 'Boogie Week',
    desc: 'Two hundred jumpers flood the airfield.' },
  { id: 'thermal-day', name: 'Thermal Day',
    desc: 'Warm air lifts canopies higher than usual.' },
  { id: 'cloud-ceiling', name: 'Low Ceiling',
    desc: 'Clouds sit at two thousand feet.' },
  { id: 'wind-gust', name: 'Wind Gusts',
    desc: 'Gusts to thirty knots across the field.' },
  { id: 'sunset-special', name: 'Sunset Special',
    desc: 'Everyone wants the golden-hour jump.' },
  { id: 'record-attempt', name: 'Record Attempt',
    desc: 'A forty-way formation is forming.' },
  { id: 'camera-day', name: 'Camera Day',
    desc: 'A film crew is shooting at the field.' },
  { id: 'rain-front', name: 'Rain Front',
    desc: 'A front rolls in by noon.' },
  { id: 'clear-blue', name: 'Clear Blue',
    desc: 'Not a cloud from here to the horizon.' },
  { id: 'tandem-rush', name: 'Tandem Rush',
    desc: 'A busload of first-timers arrives.' },
];

export const SKYDIVE_CONTRACTS = [
  { id: 'spins-12', name: 'Spin Reel', material: 'freefall-spin', qty: 12,
    pay: 320, days: 1, rep: 1,
    desc: 'A sponsor needs twelve clean spins on film.' },
  { id: 'flips-8', name: 'Flip Reel', material: 'backflip', qty: 8,
    pay: 480, days: 2, rep: 2,
    desc: 'An energy drink wants eight backflips.' },
  { id: 'swoops-5', name: 'Swoop Reel', material: 'canopy-swoop', qty: 5,
    pay: 700, days: 2, rep: 3,
    desc: 'A canopy brand wants five low swoops.' },
  { id: 'stars-3', name: 'Star Formation', material: 'formation-star', qty: 3,
    pay: 650, days: 3, rep: 3,
    desc: 'A magazine cover needs three formation stars.' },
  { id: 'glides-2', name: 'Wingsuit Film', material: 'wingsuit-glide', qty: 2,
    pay: 800, days: 3, rep: 4,
    desc: 'A documentary crew needs two canyon glides.' },
  { id: 'mixed-25', name: 'Showreel', material: 'mixed', qty: 25,
    pay: 550, days: 2, rep: 2,
    desc: 'Any twenty-five tricks for the season reel.' },
];

export const SKYDIVE_CHALLENGES = [
  { id: 'jumps-10', name: 'Ten Jumps', target: 'sessions', goal: 10, xp: 90,
    desc: 'Finish 10 jumps.' },
  { id: 'tricks-100', name: 'Century of Tricks', target: 'findsFound', goal: 100, xp: 110,
    desc: 'Land 100 tricks.' },
  { id: 'earn-1000', name: 'Grand in the Sky', target: 'earned', goal: 1000, xp: 130,
    desc: 'Earn $1,000 from skydiving.' },
  { id: 'streak-8', name: 'Clean Eight', target: 'bestStreak', goal: 8, xp: 100,
    desc: 'Eight clean steps in a row.' },
  { id: 'contracts-3', name: 'Reliable Jumper', target: 'contractsDone', goal: 3, xp: 120,
    desc: 'Complete 3 sponsor contracts.' },
  { id: 'actions-200', name: 'Two Hundred Tricks', target: 'actions', goal: 200, xp: 140,
    desc: 'Perform 200 trick steps.' },
  { id: 'first-trick', name: 'First Trick', target: 'findsFound', goal: 1, xp: 60,
    desc: 'Land your first trick.' },
  { id: 'night-5', name: 'Night Five', target: 'sessions', goal: 5, xp: 80,
    desc: 'Finish 5 jumps.' },
];

export const SKYDIVE_ACHIEVEMENTS = [
  { id: 'first-jump', name: 'First Jump', check: (s) => s.sessions >= 1,
    desc: 'Finish your first jump.' },
  { id: 'wingsuit-club', name: 'Wingsuit Club', check: (s) => (s.inventory['wingsuit-glide'] || 0) + s.findsSold >= 1,
    desc: 'Land a wingsuit glide.' },
  { id: 'rank-3', name: 'Freeflyer', check: (s) => s.rank >= 3,
    desc: 'Reach rank Freeflyer.' },
  { id: 'rich-sky', name: 'Sky Rich', check: (s) => s.earned >= 3000,
    desc: 'Earn $3,000 from skydiving.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8,
    desc: 'Own every skydiving upgrade.' },
  { id: 'no-hazard', name: 'Clean Canopy', check: (s) => s.sessions >= 10 && s.hazardsTaken === 0,
    desc: 'Ten jumps with zero hazards.' },
  { id: 'big-yield', name: 'Big Yield', check: (s) => s.bestSessionYield >= 500,
    desc: 'One jump worth $500 or more.' },
  { id: 'star-10', name: 'Star Ten', check: (s) => s.actions >= 50,
    desc: 'Fifty trick steps in the air.' },
];

export const SKYDIVE_TIPS = [
  { id: 'altitude-first', name: 'Altitude First',
    text: 'Altitude is your only currency. Spend it on tricks, not panic.' },
  { id: 'morning-air', name: 'Morning Air',
    text: 'The air is calmest before nine. Jump early.' },
  { id: 'helmetcam-money', name: 'Camera Money',
    text: 'Sponsors pay for footage. Film everything.' },
  { id: 'formation-first', name: 'Formation First',
    text: 'Stars pay better than solo spins.' },
  { id: 'wind-check', name: 'Wind Check',
    text: 'Check the windsock before every load.' },
  { id: 'contract-first', name: 'Contracts First',
    text: 'Take a sponsor contract, then jump for its tricks.' },
  { id: 'canopy-early', name: 'Canopy Early',
    text: 'Open high when the wind is up.' },
  { id: 'reserve-check', name: 'Reserve Check',
    text: 'The smart reserve is the cheapest insurance in the sky.' },
];

export const SKYDIVE_LEADERBOARD = [
  { name: 'Vera the Vet', value: 9400, desc: 'Nine thousand jumps, zero bad landings.' },
  { name: 'Dario', value: 6800, desc: 'Formation captain, forty-way regular.' },
  { name: 'Jett', value: 0, desc: 'You. Climbing.' },
  { name: 'Sana', value: 4100, desc: 'Wingsuit pilot, canyon regular.' },
  { name: 'Milo', value: 2200, desc: 'Films everything, lands most of it.' },
];

export const SKYDIVE_RECORDS = [
  { id: 'most-jumps', name: 'Most Jumps', stat: 'sessions', unit: 'jumps',
    desc: 'Most jumps finished.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$',
    desc: 'Most money earned from skydiving.' },
  { id: 'most-tricks', name: 'Most Tricks', stat: 'findsFound', unit: 'tricks',
    desc: 'Most tricks landed.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'steps',
    desc: 'Longest clean streak.' },
  { id: 'best-jump', name: 'Best Jump', stat: 'bestSessionYield', unit: '$',
    desc: 'Best single-jump yield.' },
];

export const SKYDIVE_MARKET = [
  { id: 'spin-boom', name: 'Spin Boom', finds: ['freefall-spin'], mult: 1.3,
    desc: 'A viral reel makes spins hot.' },
  { id: 'flip-rush', name: 'Flip Rush', finds: ['backflip'], mult: 1.4,
    desc: 'An ad campaign wants backflips.' },
  { id: 'swoop-week', name: 'Swoop Week', finds: ['canopy-swoop'], mult: 1.5,
    desc: 'Canopy brands are bidding up swoops.' },
  { id: 'star-season', name: 'Star Season', finds: ['formation-star'], mult: 1.45,
    desc: 'Formation season is here.' },
  { id: 'wingsuit-film', name: 'Wingsuit Film', finds: ['wingsuit-glide'], mult: 1.6,
    desc: 'A film crew pays double for glides.' },
  { id: 'head-down-day', name: 'Head Down Day', finds: ['head-down'], mult: 1.35,
    desc: 'Speed week at the field.' },
  { id: 'roll-glut', name: 'Roll Glut', finds: ['barrel-roll'], mult: 0.7,
    desc: 'Everyone is rolling; sponsors yawn.' },
  { id: 'sit-dip', name: 'Sit Dip', finds: ['sit-fly'], mult: 0.75,
    desc: 'Sit-fly is out of fashion this week.' },
];

export const SKYDIVE_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1,
    desc: 'Fresh winds and full bookings.' },
  { id: 'summer', name: 'Summer', mult: 1.2,
    desc: 'Peak season, everyone is jumping.' },
  { id: 'autumn', name: 'Autumn', mult: 1.0,
    desc: 'Steady work, thinner crowds.' },
  { id: 'winter', name: 'Winter', mult: 0.85,
    desc: 'Cold air, quiet days.' },
];

export const SKYDIVE_SEASONAL = [
  { season: 'summer', find: 'formation-star', mult: 1.3 },
  { season: 'summer', find: 'freefall-spin', mult: 1.2 },
  { season: 'spring', find: 'canopy-swoop', mult: 1.25 },
  { season: 'autumn', find: 'wingsuit-glide', mult: 1.35 },
  { season: 'autumn', find: 'head-down', mult: 1.2 },
  { season: 'winter', find: 'backflip', mult: 1.25 },
  { season: 'winter', find: 'angle-fly', mult: 1.3 },
  { season: 'spring', find: 'sit-fly', mult: 1.15 },
];

export const SKYDIVE_QUICK_START = [
  'Jump the gentle zones first and learn your altitude burn.',
  'Film every trick — sponsors pay for footage.',
  'Buy the altimeter before the high zones.',
  'Check the wind before every load.',
  'Take sponsor contracts for tricks you already fly.',
  'Save for the high-performance canopy.',
];

export const SKYDIVE_HELPERS = [
  { id: 'coach', name: 'Vera the Coach', wage: 35, skill: 'collect', bonus: 0.15,
    desc: 'A coach in the plane: +15% trick yield.' },
  { id: 'cameraman', name: 'Milo the Cameraman', wage: 45, skill: 'find', bonus: 0.25,
    desc: 'Flies with you: +25% rare tricks filmed.' },
  { id: 'rigger', name: 'Dario the Rigger', wage: 55, skill: 'carry', bonus: 0.4,
    desc: 'Packs fast: +40% trick slots.' },
  { id: 'agent', name: 'Quiet Ana', wage: 75, skill: 'sell', bonus: 0.12,
    desc: 'Knows the sponsors: +12% sponsor pay.' },
];

export function skydivingRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < SKYDIVE_RANKS.length; i++) {
    if (xp >= SKYDIVE_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function skydivingPriceFor(trickId, dayDrift, rank, upgrades) {
  const f = SKYDIVE_TRICKS.find((x) => x.id === trickId);
  if (!f) return 0;
  let price = f.value;
  price *= 1 + (dayDrift[trickId] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('helmetcam')) price *= 1.2;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function skydivingCarryCap(upgrades) {
  let cap = 12;
  if (upgrades.includes('jumpsuit')) cap += 4;
  if (upgrades.includes('rig')) cap += 6;
  return cap;
}

export function skydivingAltitudeMax(upgrades) {
  let max = 4000;
  if (upgrades.includes('canopy')) max += 1000;
  return max;
}

export function skydivingEventMult(eventId, trickId) {
  const ev = SKYDIVE_MARKET.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.finds.includes(trickId) ? ev.mult : 1;
}

export function skydivingSeasonMult(seasonId) {
  const s = SKYDIVE_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function skydivingEventFor(day) {
  return SKYDIVE_MARKET[day % SKYDIVE_MARKET.length];
}

export function skydivingSeasonalPriceMult(seasonId, trickId) {
  const row = SKYDIVE_SEASONAL.find((x) => x.season === seasonId && x.find === trickId);
  return row ? row.mult : 1;
}

export function skydivingBestSeason(trickId) {
  let best = null;
  let bestMult = 0;
  for (const row of SKYDIVE_SEASONAL) {
    if (row.find === trickId && row.mult > bestMult) { bestMult = row.mult; best = row.season; }
  }
  return best ? { season: best, mult: bestMult } : null;
}

export function skydivingBestBuyer(trickId, dayDrift, rank, upgrades) {
  const base = skydivingPriceFor(trickId, dayDrift, rank, upgrades);
  return { price: base, note: 'Sponsors pay best for clean, filmed tricks.' };
}

export function skydivingScore(sessions, yieldTotal, hazards) {
  const base = sessions * 10 + Math.round(yieldTotal);
  const penalty = hazards * 5;
  return Math.max(0, base - penalty);
}

export function skydivingGrade(sessions, yieldTotal, hazards) {
  const score = skydivingScore(sessions, yieldTotal, hazards);
  if (score >= 400) return 'S';
  if (score >= 250) return 'A';
  if (score >= 140) return 'B';
  if (score >= 60) return 'C';
  return 'D';
}

export function skydivingWeeklyGoal(sessions, sold, earned) {
  const goal = { sessions: 5, sold: 40, earned: 600 };
  return {
    sessions: { have: sessions, goal: goal.sessions, done: sessions >= goal.sessions },
    sold: { have: sold, goal: goal.sold, done: sold >= goal.sold },
    earned: { have: Math.round(earned), goal: goal.earned, done: earned >= goal.earned },
    allDone: sessions >= goal.sessions && sold >= goal.sold && earned >= goal.earned,
  };
}

export function skydivingTipFor(day) {
  return SKYDIVE_TIPS[day % SKYDIVE_TIPS.length];
}

export function skydivingLeaderboardWith(playerValue) {
  const board = SKYDIVE_LEADERBOARD.map((e) => ({
    name: e.name, value: e.name === 'Jett' ? playerValue : e.value, desc: e.desc,
  }));
  board.sort((a, b) => b.value - a.value);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function skydivingRecordFor(recordId, state) {
  const r = SKYDIVE_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function skydivingAllRecords(state) {
  return SKYDIVE_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function skydivingEfficiency(actions, hazards) {
  const total = actions + hazards;
  if (total === 0) return 100;
  return Math.round((actions / total) * 100);
}

export function skydivingProfitPerJump(earned, sessions) {
  if (sessions === 0) return 0;
  return Math.round((earned / sessions) * 10) / 10;
}

export function skydivingInventoryValue(inventory) {
  let total = 0;
  for (const [id, qty] of Object.entries(inventory)) {
    const f = SKYDIVE_TRICKS.find((x) => x.id === id);
    if (f) total += f.value * qty;
  }
  return Math.round(total * 10) / 10;
}

export function skydivingTotalValue(state) {
  return skydivingInventoryValue(state.inventory);
}

export function skydivingProgressPercent(state) {
  const total = state.actions + state.findsSold;
  if (total === 0) return 0;
  return Math.round((state.actions / total) * 100);
}

export function skydivingQuickStart(step) {
  return SKYDIVE_QUICK_START[step] || null;
}

export function skydivingSummary(state) {
  return `Skydiving ${SKYDIVE_RANKS[state.rank].name}: ${state.sessions} jumps, ${state.actions} tricks, $${Math.round(state.earned)} earned, ${state.findsFound} tricks landed.`;
}

export function skydivingNextGoal(state) {
  if (state.sessions < 3) return 'Make 3 jumps.';
  if (state.actions < 50) return 'Land 50 tricks.';
  if (state.rank < 2) return 'Reach rank Formation Flyer.';
  return 'Become the Sky Master.';
}

export function skydivingChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function skydivingHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of SKYDIVE_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function skydivingZoneByAltitude(altitude) {
  let best = null;
  for (const s of DROP_ZONES) {
    if (s.altitude <= altitude && (!best || s.altitude > best.altitude)) best = s;
  }
  return best;
}

export function skydivingTricksByRarity(maxRarity) {
  return SKYDIVE_TRICKS.filter((f) => f.rarity <= maxRarity).map((f) => f.id);
}

export function createSkydivingSystem(ctx) {
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
    resource: 4000,
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
  for (const f of SKYDIVE_TRICKS) { state.inventory[f.id] = 0; state.dayDrift[f.id] = 0; }

  function refreshRank() {
    const r = skydivingRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Skydiving rank up: ${SKYDIVE_RANKS[r].name} — ${SKYDIVE_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const f of SKYDIVE_TRICKS) {
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

  function pickTrick(zone) {
    const bag = [];
    for (const f of SKYDIVE_TRICKS) {
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
    return SKYDIVE_TRICKS[0];
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
    log(`Skydiving ${done} ${reason} — yield $${Math.round(state.sessionYield)}, ${state.sessionFinds} tricks.`);
    state.sessionYield = 0;
    state.sessionFinds = 0;
  }

  function jump(zoneId) {
    const zone = DROP_ZONES.find((s) => s.id === zoneId);
    if (!zone) return { ok: false, reason: 'no-such-site' };
    if (state.session) return { ok: false, reason: 'session-active' };
    if (weatherBlocks()) {
      state.weatherStops += 1;
      return { ok: false, reason: 'bad-weather', condition: weather() };
    }
    const hour = getHour();
    if (hour < 7 || hour >= 18) return { ok: false, reason: 'too-late', hour };
    if (getCash() < zone.price) return { ok: false, reason: 'not-enough-cash', cost: zone.price };
    if (zone.price > 0) { addCash(-zone.price); state.spent += zone.price; }
    state.session = zoneId;
    state.sessionStepsLeft = zone.steps;
    state.sessionTimeLeft = zone.duration * 60;
    state.resource = skydivingAltitudeMax(state.upgrades);
    log(`Skydiving started: ${zone.name} — ${zone.steps} tricks, ${zone.duration} min, ${zone.altitude}m up.`);
    return { ok: true, site: zoneId, steps: zone.steps, duration: zone.duration };
  }

  function performTrick() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    if (state.sessionStepsLeft <= 0) return { ok: false, reason: 'session-done' };
    const zone = DROP_ZONES.find((s) => s.id === state.session);
    state.resource -= 400;
    if (state.resource < 0) state.resource = 0;
    const cap = skydivingCarryCap(state.upgrades);
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held >= cap) return { ok: false, reason: 'carry-full', cap };
    const f = pickTrick(zone);
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
      const rare = SKYDIVE_TRICKS.filter((x) => x.rarity < 0.06);
      const pick = rare[Math.floor(rng() * rare.length)];
      state.inventory[pick.id] += 1;
      state.findsFound += 1;
      state.sessionYield += pick.value;
      state.totalYield += pick.value;
      got.push({ id: pick.id, name: pick.name, qty: 1, value: pick.value, rare: true });
      log(`Skydiving rare trick! ${pick.name} worth $${pick.value}.`);
    }
    if (rng() < zone.risk * 0.04) {
      state.hazardsTaken += 1;
      state.streak = 0;
      state.resource -= 500;
      if (rng() < 0.25) { addHeat(1); state.heatGained += 1; }
      log(`Skydiving hazard at ${zone.name}: a line twist spun you hard and cost you altitude.`);
    }
    if (state.resource <= 0) {
      finishSession('cut short — out of altitude');
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

  function trackDive() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    const cost = 300;
    if (state.resource < cost) return { ok: false, reason: 'not-enough-resource', need: cost };
    state.resource -= cost;
    state.specialsUsed += 1;
    if (rng() < 0.55) {
      const f = pickTrick(DROP_ZONES[0]);
      state.inventory[f.id] += 1;
      state.findsFound += 1;
      state.sessionYield += f.value;
      gainXp(10);
      log(`Skydiving tracking run: clean tracking run — caught a ${f.name}.`);
      return { ok: true, success: true, find: f.id, name: f.name };
    }
    log('Skydiving tracking run: tumbled out of formation.');
    return { ok: true, success: false };
  }

  function sellFind(trickId, qty) {
    const f = SKYDIVE_TRICKS.find((x) => x.id === trickId);
    if (!f) return { ok: false, reason: 'no-such-find' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = state.inventory[trickId] || 0;
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = skydivingPriceFor(trickId, state.dayDrift, state.rank, state.upgrades);
    const total = Math.round(unit * qty * 10) / 10;
    state.inventory[trickId] -= qty;
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
    for (const f of SKYDIVE_TRICKS) {
      const have = state.inventory[f.id] || 0;
      if (have <= 0) continue;
      const unit = skydivingPriceFor(f.id, state.dayDrift, state.rank, state.upgrades);
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
    log(`Cashed in everything (${units} tricks) for $${total}.`);
    return { ok: true, total, units, lines };
  }

  function buyUpgrade(id) {
    const u = SKYDIVE_UPGRADES.find((x) => x.id === id);
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
    const ct = SKYDIVE_CONTRACTS.find((x) => x.id === id);
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
      for (const f of SKYDIVE_TRICKS) {
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
    return SKYDIVE_TRICKS.map((f) => ({
      id: f.id,
      name: f.name,
      price: skydivingPriceFor(f.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[f.id],
      held: state.inventory[f.id],
    }));
  }

  function siteReport() {
    return DROP_ZONES.map((s) => ({
      id: s.id, name: s.name, fee: s.price, difficulty: s.difficulty, steps: s.steps, risk: s.risk,
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.16) {
      const f = SKYDIVE_TRICKS[Math.floor(rng() * SKYDIVE_TRICKS.length)];
      state.dayDrift[f.id] = Math.round((state.dayDrift[f.id] + 0.3) * 100) / 100;
      log(`Skydiving news: ${f.name} is in demand — sponsors pay up today!`);
      return { event: 'demand-spike', find: f.id };
    }
    if (roll < 0.28) {
      const f = SKYDIVE_TRICKS[Math.floor(rng() * SKYDIVE_TRICKS.length)];
      state.dayDrift[f.id] = Math.round((state.dayDrift[f.id] - 0.15) * 100) / 100;
      log(`Skydiving news: too much ${f.name} around — sponsors pay less.`);
      return { event: 'price-dip', find: f.id };
    }
    if (roll < 0.38) {
      const f = SKYDIVE_TRICKS[Math.floor(rng() * SKYDIVE_TRICKS.length)];
      state.inventory[f.id] += 3;
      state.findsFound += 3;
      log(`Skydiving gift: a coach gifts you 3x ${f.name} on film.`);
      return { event: 'gift', find: f.id };
    }
    if (roll < 0.46) {
      const ev = SKYDIVE_EVENTS[Math.floor(rng() * SKYDIVE_EVENTS.length)];
      log(`Skydiving event: ${ev.name} — ${ev.desc}`);
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
        finishSession('cut short — out of altitude');
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
    for (const f of SKYDIVE_TRICKS) {
      if (state.inventory[f.id] === undefined) state.inventory[f.id] = 0;
      if (state.dayDrift[f.id] === undefined) state.dayDrift[f.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: SKYDIVE_RANKS[state.rank].name,
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
      resourceMax: skydivingAltitudeMax(state.upgrades),
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
    if (state.session) return `Skydiving: ${state.session} — ${state.sessionStepsLeft} tricks left, altitude ${Math.round(state.resource)}`;
    if (state.activeContract) return `Skydiving: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held > 0) return `Skydiving: ${held} tricks on film`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const near = Math.hypot(pos.x - 80, pos.z - (-220)) < 30;
    if (!near) return false;
    if (state.session) { performTrick(); return true; }
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held > 0) { sellAllFinds(); return true; }
    jump(DROP_ZONES[0].id);
    return true;
  }

  return {
    name: 'Skydiving',
    state,
    jump, performTrick, landEarly, trackDive,
    sellFind, sellAllFinds, buyUpgrade, takeContract,
    deliverContract, abandonContract, priceBoard, siteReport,
    dailyEvent, tick, tickDay, serialize, deserialize,
    stats, hudLine, interact,
  };
}

export function createSkydivingExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function hireHelper(id) {
    const h = SKYDIVE_HELPERS.find((x) => x.id === id);
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
      const h = SKYDIVE_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    return skydivingHelperBonus(helpers, skill);
  }

  function challenges() {
    return SKYDIVE_CHALLENGES.map((ch) => skydivingChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = SKYDIVE_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = skydivingChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return SKYDIVE_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function donateFinds(trickId, qty) {
    const have = system.state.inventory[trickId] || 0;
    if (have < qty || qty <= 0) return { ok: false, reason: 'not-enough', have };
    system.state.inventory[trickId] -= qty;
    const rep = Math.floor(qty / 5);
    return { ok: true, qty, rep, note: 'The jump club thanks you. Blue skies.' };
  }

  function bundleSale(trickId, qty) {
    const have = system.state.inventory[trickId] || 0;
    if (have < qty || qty < 10) return { ok: false, reason: 'need-10-plus', have };
    const unit = skydivingPriceFor(trickId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(unit * qty * 1.1 * 10) / 10;
    system.state.inventory[trickId] -= qty;
    system.state.findsSold += qty;
    system.state.earned += total;
    return { ok: true, total, qty, bonus: 'bundle +10%' };
  }

  function checkAltitude() {
    const max = skydivingAltitudeMax(system.state.upgrades);
    return {
      resource: Math.round(system.state.resource * 10) / 10,
      max,
      pct: Math.round((system.state.resource / max) * 100),
    };
  }

  function repackRig() {
    system.state.resource = skydivingAltitudeMax(system.state.upgrades);
    return { ok: true, resource: system.state.resource };
  }

  function countFootage() {
    const held = Object.values(system.state.inventory).reduce((a, b) => a + b, 0);
    return { tricks: held, cap: skydivingCarryCap(system.state.upgrades) };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, donateFinds, bundleSale,
    checkAltitude, repackRig, countFootage,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return helperWagesPaid; },
  };
}

export function createSkydivingMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkSold = 0;

  function setEvent(eventId) {
    const ev = SKYDIVE_MARKET.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = SKYDIVE_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    system.state.season = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(trickId, basePrice) {
    let price = basePrice;
    price *= skydivingEventMult(currentEvent, trickId);
    price *= skydivingSeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(trickId, qty) {
    const have = system.state.inventory[trickId] || 0;
    if (have < qty || qty < 20) return { ok: false, reason: 'need-20-plus', have };
    const unit = skydivingPriceFor(trickId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(eventPrice(trickId, unit) * qty * 1.1 * 10) / 10;
    system.state.inventory[trickId] -= qty;
    system.state.findsSold += qty;
    system.state.earned += total;
    bulkSold += qty;
    dealsClaimed += 1;
    return { ok: true, total, qty, bonus: 'bulk +10%' };
  }

  function dailyDeals() {
    const deals = [];
    for (const f of SKYDIVE_TRICKS) {
      const mult = skydivingEventMult(currentEvent, f.id);
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

export const SKYDIVING_META = {
  system: 'skydiving',
  version: '7c-B2',
  author: 'builder-2',
  dataCount: DROP_ZONES.length,
  findCount: SKYDIVE_TRICKS.length,
  upgradeCount: SKYDIVE_UPGRADES.length,
  rankCount: SKYDIVE_RANKS.length,
};
