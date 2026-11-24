export const STORM_TYPES = [
  { id: 'gustnado', name: 'Gustnado', value: 40, danger: 2, rarity: 0.2, speed: 4, duration: 3, desc: 'A short-lived spin-up on the plains.' },
  { id: 'rain', name: 'Rain Storm', value: 30, danger: 1, rarity: 0.3, speed: 2, duration: 2, desc: 'Heavy rain and low cloud, easy to chase.' },
  { id: 'hail', name: 'Hail Storm', value: 50, danger: 2, rarity: 0.22, speed: 3, duration: 3, desc: 'Ice the size of golf balls.' },
  { id: 'supercell', name: 'Supercell', value: 90, danger: 3, rarity: 0.12, speed: 4, duration: 4, desc: 'A rotating monster that spawns tornadoes.' },
  { id: 'tornado', name: 'Tornado', value: 140, danger: 4, rarity: 0.06, speed: 5, duration: 5, desc: 'A funnel on the ground, the chaser’s prize.' },
  { id: 'hurricane', name: 'Hurricane', value: 160, danger: 4, rarity: 0.04, speed: 3, duration: 6, desc: 'A storm the size of a state.' },
  { id: 'dust', name: 'Dust Storm', value: 45, danger: 2, rarity: 0.18, speed: 4, duration: 3, desc: 'A wall of dust rolling across the desert.' },
  { id: 'blizzard', name: 'Blizzard', value: 100, danger: 3, rarity: 0.08, speed: 3, duration: 5, desc: 'Whiteout snow and a screaming wind.' },
  { id: 'squall', name: 'Squall Line', value: 55, danger: 2, rarity: 0.2, speed: 5, duration: 2, desc: 'A fast line of storms racing east.' },
  { id: 'ember', name: 'Ember Storm', value: 70, danger: 3, rarity: 0.1, speed: 4, duration: 4, desc: 'Fire-driven winds full of burning embers.' },
];

export const STORM_ZONES = [
  { id: 'plains', name: 'Great Plains', region: 'Central', storms: 0.9, danger: 2, mult: 1.0, desc: 'Flat land where tornadoes are born.' },
  { id: 'coast', name: 'Gulf Coast', region: 'South', storms: 0.7, danger: 3, mult: 1.2, desc: 'Hurricane country, wet and wild.' },
  { id: 'valley', name: 'Storm Valley', region: 'West', storms: 0.6, danger: 2, mult: 1.1, desc: 'A valley that funnels every storm.' },
  { id: 'desert', name: 'Dry Desert', region: 'Southwest', storms: 0.5, danger: 1, mult: 0.9, desc: 'Dust devils and dry lightning.' },
];

export const STORM_BUYERS = [
  { id: 'news', name: 'News Desk', mult: 1.0, likes: ['funnel', 'eye'], dislikes: ['rain'], mood: 'steady', minRank: 0, desc: 'Buys dramatic footage for the evening news.' },
  { id: 'university', name: 'Weather University', mult: 1.2, likes: ['lightning', 'funnel', 'whiteout'], dislikes: ['dust'], mood: 'busy', minRank: 1, desc: 'Pays for footage with real science in it.' },
  { id: 'weather', name: 'Weather Service', mult: 1.3, likes: ['hail', 'rain', 'lightning'], dislikes: ['eye'], mood: 'picky', minRank: 2, desc: 'Wants clean data and clear shots.' },
  { id: 'film', name: 'Film Crew', mult: 1.1, likes: ['eye', 'dust', 'funnel'], dislikes: ['rain'], mood: 'keen', minRank: 0, desc: 'Buys the most cinematic storm shots.' },
  { id: 'storm', name: 'Storm Tour Co.', mult: 1.5, likes: ['funnel', 'eye', 'lightning'], dislikes: ['rain'], mood: 'eager', minRank: 3, desc: 'Pays top coin for tornado footage.' },
];

export const STORM_UPGRADES = [
  { id: 'camera', name: 'Storm Camera', cost: 120, desc: 'A camera that films in any weather.', effect: 'film' },
  { id: 'radio', name: 'Weather Radio', cost: 90, desc: 'A radio that hears every warning.', effect: 'comms' },
  { id: 'radar', name: 'Mobile Radar', cost: 300, desc: 'A radar dish on the truck roof.', effect: 'spot' },
  { id: 'truck', name: 'Chase Truck', cost: 520, desc: 'A truck built to outrun a storm.', effect: 'drive' },
  { id: 'armour', name: 'Armour Plating', cost: 400, desc: 'Steel plates for the truck.', effect: 'safety' },
  { id: 'gps', name: 'Storm GPS', cost: 180, desc: 'A GPS that tracks the cell in real time.', effect: 'nav' },
  { id: 'drone', name: 'Storm Drone', cost: 750, desc: 'A drone that films from inside the storm.', effect: 'film' },
  { id: 'weather', name: 'Weather Station', cost: 1100, desc: 'A full station bolted to the truck.', effect: 'data' },
];

export const STORM_RANKS = [
  { level: 0, name: 'Sky Watcher', xp: 0, perk: 'Learning the clouds.' },
  { level: 1, name: 'Storm Chaser', xp: 120, perk: 'A steady hand on the wheel.' },
  { level: 2, name: 'Sky Hunter', xp: 300, perk: 'The storms know your truck.' },
  { level: 3, name: 'Tornado Alley Master', xp: 620, perk: 'The news calls you first.' },
  { level: 4, name: 'Master of the Sky', xp: 1100, perk: 'No storm outruns you.' },
];

export const STORM_FOOTAGE = [
  { id: 'gust', name: 'Gustnado Clip', value: 30, storm: 'gustnado', desc: 'A brief spin-up caught on film.' },
  { id: 'hail', name: 'Hail Clip', value: 40, storm: 'hail', desc: 'Ice hammering the truck roof.' },
  { id: 'rain', name: 'Rain Clip', value: 25, storm: 'rain', desc: 'Sheets of rain across the plains.' },
  { id: 'lightning', name: 'Lightning Clip', value: 90, storm: 'supercell', desc: 'A bolt splitting the sky.' },
  { id: 'funnel', name: 'Funnel Clip', value: 120, storm: 'tornado', desc: 'A funnel touching down.' },
  { id: 'eye', name: 'Eye Clip', value: 150, storm: 'hurricane', desc: 'Inside the eye of the storm.' },
  { id: 'dust', name: 'Dust Clip', value: 60, storm: 'dust', desc: 'A wall of dust swallowing the road.' },
  { id: 'whiteout', name: 'Whiteout Clip', value: 110, storm: 'blizzard', desc: 'Nothing but white in every direction.' },
];

export const STORM_EVENTS = [
  { id: 'tornado-outbreak', name: 'Tornado Outbreak', mult: 1.3, storms: ['tornado'], desc: 'Tornadoes everywhere today.' },
  { id: 'hurricane-season', name: 'Hurricane Season', mult: 1.2, storms: ['hurricane'], desc: 'The season for big coastal storms.' },
  { id: 'hail-day', name: 'Hail Day', mult: 1.2, storms: ['hail'], desc: 'Ice falling all afternoon.' },
  { id: 'dry-spell', name: 'Dry Spell', mult: 0.8, storms: [], desc: 'Not a cloud worth chasing.' },
  { id: 'tornado-alley', name: 'Tornado Alley', mult: 1.4, storms: ['tornado', 'supercell'], desc: 'The alley is alive with storms.' },
  { id: 'blizzard', name: 'Blizzard', mult: 1.1, storms: ['blizzard'], desc: 'A blizzard rolling down from the north.' },
];

export const STORM_CONTRACTS = [
  { id: 'tornado-2', name: 'Two Tornadoes', storm: 'tornado', qty: 2, pay: 560, days: 3, rep: 2, desc: 'Two tornadoes on film.' },
  { id: 'hail-4', name: 'Four Hail', storm: 'hail', qty: 4, pay: 320, days: 2, rep: 1, desc: 'Four hail clips for the weather service.' },
  { id: 'lightning-3', name: 'Three Lightning', storm: 'supercell', qty: 3, pay: 480, days: 2, rep: 1, desc: 'Three lightning clips from supercells.' },
  { id: 'hurricane-1', name: 'One Hurricane', storm: 'hurricane', qty: 1, pay: 900, days: 3, rep: 3, desc: 'A single hurricane, eye and all.' },
  { id: 'storm-5', name: 'Any Five Storms', storm: 'any', qty: 5, pay: 300, days: 2, rep: 0, desc: 'Any five storms caught.' },
  { id: 'rain-6', name: 'Six Rain', storm: 'rain', qty: 6, pay: 240, days: 2, rep: 0, desc: 'Six rain clips for the news.' },
];

export const STORM_HAZARDS = [
  { id: 'debris', name: 'Flying Debris', chance: 0.12, damage: 3, desc: 'Debris thrown by the wind.' },
  { id: 'hailstone', name: 'Hailstone', chance: 0.1, damage: 2, desc: 'A hailstone through the windshield.' },
  { id: 'lightning', name: 'Lightning Strike', chance: 0.08, damage: 4, desc: 'Lightning hits too close.' },
  { id: 'flash-flood', name: 'Flash Flood', chance: 0.06, damage: 3, desc: 'Water across the road, fast and deep.' },
  { id: 'wind', name: 'Wind Gust', chance: 0.15, damage: 1, desc: 'A gust that rocks the truck.' },
];

export const STORM_HELPERS = [
  { id: 'spotter', name: 'Spotter', wage: 35, skill: 'spot', bonus: 0.25, desc: 'Eyes on the sky at all times.' },
  { id: 'driver', name: 'Driver', wage: 50, skill: 'drive', bonus: 0.3, desc: 'Drives like the storm is behind him.' },
  { id: 'cameraman', name: 'Cameraman', wage: 45, skill: 'film', bonus: 0.2, desc: 'Never misses a shot.' },
  { id: 'scientist', name: 'Scientist', wage: 60, skill: 'report', bonus: 0.3, desc: 'Turns chaos into data.' },
];

export const STORM_CHALLENGES = [
  { id: 'chases-10', name: 'Ten Chases', target: 'chases', goal: 10, xp: 80, desc: 'Start ten chases.' },
  { id: 'intercepts-10', name: 'Ten Intercepts', target: 'intercepts', goal: 10, xp: 120, desc: 'Intercept ten storms.' },
  { id: 'footage-30', name: 'Thirty Footage', target: 'footage', goal: 30, xp: 110, desc: 'Collect thirty footage clips.' },
  { id: 'earn-1000', name: 'A Thousand Earned', target: 'earned', goal: 1000, xp: 120, desc: 'Earn a thousand from storm chasing.' },
  { id: 'tornado-2', name: 'Two Tornadoes', target: 'stormsCaught', goal: 2, xp: 140, desc: 'Catch two storms.' },
  { id: 'reports-10', name: 'Ten Reports', target: 'reports', goal: 10, xp: 100, desc: 'File ten weather reports.' },
  { id: 'contracts-5', name: 'Five Contracts', target: 'contractsDone', goal: 5, xp: 140, desc: 'Finish five storm contracts.' },
  { id: 'hurricane-1', name: 'One Hurricane', target: 'bestValue', goal: 150, xp: 200, desc: 'Catch a storm worth at least 150.' },
];

export const STORM_ACHIEVEMENTS = [
  { id: 'first-chase', name: 'First Chase', check: (s) => s.chases >= 1, desc: 'Your first chase.' },
  { id: 'first-intercept', name: 'First Intercept', check: (s) => s.intercepts >= 1, desc: 'Your first intercept.' },
  { id: 'first-tornado', name: 'First Tornado', check: (s) => s.bestStorm === 'tornado', desc: 'You intercepted a tornado.' },
  { id: 'rank-3', name: 'Tornado Alley Master', check: (s) => s.rank >= 3, desc: 'Reach rank three.' },
  { id: 'rich-chaser', name: 'Rich Chaser', check: (s) => s.earned >= 1000, desc: 'Earn a thousand from storm chasing.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every storm upgrade.' },
  { id: 'no-crash', name: 'No Crash', check: (s) => s.chases >= 5 && s.crashes === 0, desc: 'Five chases without a single crash.' },
  { id: 'hurricane', name: 'Hurricane!', check: (s) => s.bestStorm === 'hurricane', desc: 'You intercepted a hurricane.' },
];

export const STORM_TIPS = [
  { id: 'radar-first', name: 'Radar First', text: 'Buy the radar before your first real chase.' },
  { id: 'truck-first', name: 'Truck First', text: 'A fast truck is worth more than a fast camera.' },
  { id: 'intercept', name: 'Intercept Late', text: 'Drive close, but intercept before the storm turns.' },
  { id: 'film', name: 'Film Everything', text: 'Film every storm; even rain sells.' },
  { id: 'report', name: 'File Reports', text: 'Reports pay steady coin between the big chases.' },
  { id: 'hurricane', name: 'Hurricane Rules', text: 'Never chase a hurricane without armour and a full tank.' },
  { id: 'safety', name: 'Safety First', text: 'Keep an escape route open at all times.' },
  { id: 'armour', name: 'Armour Up', text: 'Armour plating saves trucks, and lives.' },
];

export const STORM_LEADERBOARD = [
  { name: 'Reed Timmer', chases: 3200, desc: 'The most famous chaser alive.' },
  { name: 'Storm Kate', chases: 2100, desc: 'Chases storms across three states.' },
  { name: 'Ria', chases: 0, desc: 'The new chaser in town.' },
  { name: 'Dust Devil', chases: 1500, desc: 'Lives in the desert dust.' },
  { name: 'Cloud Sam', chases: 1100, desc: 'Reads clouds like a book.' },
];

export const STORM_RECORDS = [
  { id: 'most-chases', name: 'Most Chases', stat: 'chases', unit: 'chases', desc: 'Chases started in total.' },
  { id: 'most-intercepts', name: 'Most Intercepts', stat: 'intercepts', unit: 'intercepts', desc: 'Storms intercepted in total.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Coin earned from storm chasing.' },
  { id: 'best-footage', name: 'Best Footage', stat: 'bestValue', unit: '$', desc: 'Most valuable single storm.' },
  { id: 'reports', name: 'Reports Filed', stat: 'reports', unit: 'reports', desc: 'Weather reports filed in total.' },
];

export const STORM_QUICK_START = [
  'Buy the camera and radar before your first chase.',
  'Start on the plains; the storms are close and the roads are flat.',
  'Drive toward the storm, but keep an escape route open.',
  'Film every storm you meet; footage is money.',
  'Intercept the storm to get the shot nobody else has.',
  'Always file a report before selling footage.',
];

export const STORM_META = {
  system: 'stormChasing',
  version: '7-B1',
  author: 'builder-1',
  storms: 10,
  zones: 4,
  note: 'Chase, intercept, film, report.',
};

export const STORM_SCALES = [
  { id: 'ef0', name: 'EF0', windMin: 0, windMax: 65, damage: 'Light', desc: 'Light damage, branches down.' },
  { id: 'ef1', name: 'EF1', windMin: 66, windMax: 110, damage: 'Moderate', desc: 'Roofs damaged, trees snapped.' },
  { id: 'ef2', name: 'EF2', windMin: 111, windMax: 135, damage: 'Considerable', desc: 'Roofs torn off, cars moved.' },
  { id: 'ef3', name: 'EF3', windMin: 136, windMax: 165, damage: 'Severe', desc: 'Walls collapse, trains overturned.' },
  { id: 'ef4', name: 'EF4', windMin: 166, windMax: 200, damage: 'Devastating', desc: 'Houses levelled to the ground.' },
  { id: 'ef5', name: 'EF5', windMin: 201, windMax: 300, damage: 'Incredible', desc: 'Nothing above ground survives.' },
];

export const STORM_SAFETY = [
  { id: 'keep-distance', name: 'Keep Your Distance', text: 'Never get closer than you need to for the shot.' },
  { id: 'escape-route', name: 'Escape Route', text: 'Always know which road takes you away from the storm.' },
  { id: 'no-underpass', name: 'No Underpass', text: 'Never shelter under a bridge; the wind is worse there.' },
  { id: 'avoid-water', name: 'Avoid Water', text: 'Never drive through flooded roads.' },
  { id: 'watch-sky', name: 'Watch the Sky', text: 'A green sky means hail is coming.' },
  { id: 'stay-in-car', name: 'Stay in the Car', text: 'The car is safer than the open road.' },
  { id: 'radio', name: 'Keep the Radio On', text: 'Warnings save lives; keep the radio on.' },
  { id: 'park-away', name: 'Park Away', text: 'Park away from trees and power lines.' },
];

export const STORM_RADAR_SIGNS = [
  { id: 'hook', name: 'Hook Echo', text: 'A hook on the radar means a tornado may be forming.' },
  { id: 'bow', name: 'Bow Echo', text: 'A bow shape means damaging straight-line winds.' },
  { id: 'cell', name: 'Cell', text: 'A single cell can grow into a supercell.' },
  { id: 'vortex', name: 'Vortex Signature', text: 'A tight vortex on radar is a tornado on the ground.' },
  { id: 'hail-spike', name: 'Hail Spike', text: 'A spike behind the storm means big hail.' },
  { id: 'anvil', name: 'Anvil Top', text: 'An anvil top shows a storm reaching the stratosphere.' },
];

export function stormRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < STORM_RANKS.length; i++) {
    if (xp >= STORM_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function stormPriceFor(footage, rank, upgrades) {
  if (!footage) return 1;
  const owned = upgrades || [];
  let price = footage.value * (1 + 0.1 * rank);
  if (owned.includes('drone')) price *= 1.2;
  return Math.max(1, Math.round(price));
}

export function stormBuyerPrice(footage, buyerId, rank, upgrades) {
  const buyer = STORM_BUYERS.find((b) => b.id === buyerId);
  if (!buyer || !footage) return 0;
  let price = stormPriceFor(footage, rank, upgrades) * buyer.mult;
  if (buyer.likes.includes(footage.id)) price *= 1.1;
  if (buyer.dislikes.includes(footage.id)) price *= 0.9;
  if ((footage.storm === 'tornado' || footage.storm === 'hurricane') && buyer.id === 'storm') price *= 1.2;
  return Math.max(1, Math.round(price));
}

export function stormChaseTier(upgrades) {
  const owned = upgrades || [];
  let tier = 1;
  if (owned.includes('radar')) tier += 1;
  if (owned.includes('truck')) tier += 1;
  return tier;
}

export function stormScaleFor(scaleId) {
  return STORM_SCALES.find((s) => s.id === scaleId) || null;
}

export function stormSafetyFor(safetyId) {
  return STORM_SAFETY.find((s) => s.id === safetyId) || null;
}

export function stormDangerDescription(stormId) {
  const storm = STORM_TYPES.find((s) => s.id === stormId);
  if (!storm) return null;
  const idx = Math.max(0, Math.min(STORM_SCALES.length - 1, storm.danger - 1));
  const scale = STORM_SCALES[idx];
  const wind = scale.id === 'ef5'
    ? `over ${scale.windMin} mph`
    : `${scale.windMin}-${scale.windMax} mph`;
  return { storm: storm.id, name: storm.name, danger: storm.danger, wind, scale: scale.name };
}

export function stormRadarSignFor(signId) {
  return STORM_RADAR_SIGNS.find((s) => s.id === signId) || null;
}

const STORM_STATE_KEYS = [
  'xp', 'rank', 'chases', 'intercepts', 'footage', 'footageSold', 'earned',
  'spent', 'crashes', 'reports', 'truckHealth', 'upgrades', 'storm', 'stormType',
  'stormProgress', 'closest', 'lastDay', 'activeContract', 'contractProgress',
  'contractsDone', 'contractsFailed', 'bestStorm', 'bestValue', 'dailyChases',
  'dailyEarned', 'currentEvent', 'stormsCaught', 'daysChased',
];

function stormChallengeAmount(target, st) {
  if (target === 'chases') return st.chases;
  if (target === 'intercepts') return st.intercepts;
  if (target === 'footage') {
    let total = st.footageSold;
    for (const f of STORM_FOOTAGE) total += st.footage[f.id] || 0;
    return total;
  }
  if (target === 'earned') return st.earned;
  if (target === 'stormsCaught') return st.stormsCaught;
  if (target === 'reports') return st.reports;
  if (target === 'contractsDone') return st.contractsDone;
  if (target === 'bestValue') return st.bestValue;
  return 0;
}

export function stormHelperBonus(ids, skill) {
  let sum = 0;
  for (const id of ids || []) {
    const helper = STORM_HELPERS.find((h) => h.id === id);
    if (helper && helper.skill === skill) sum += helper.bonus;
  }
  return sum;
}

export function stormChallengeProgress(challenge, state) {
  const amount = Math.floor(stormChallengeAmount(challenge.target, state));
  return { id: challenge.id, name: challenge.name, amount, goal: challenge.goal, done: amount >= challenge.goal };
}

export function stormTipFor(day) {
  const idx = ((day || 0) % STORM_TIPS.length + STORM_TIPS.length) % STORM_TIPS.length;
  return STORM_TIPS[idx];
}

export function stormLeaderboardWith(chases) {
  const rows = STORM_LEADERBOARD.map((row) => ({
    name: row.name,
    chases: row.name === 'Ria' ? chases : row.chases,
    desc: row.desc,
  }));
  rows.sort((a, b) => b.chases - a.chases);
  return rows.map((row, i) => ({ rank: i + 1, name: row.name, chases: row.chases, desc: row.desc }));
}

export function stormEfficiency(intercepts, chases) {
  if (!chases) return 0;
  return Math.round((intercepts / chases) * 100) / 100;
}

export function stormProfitPerChase(earned, chases) {
  if (!chases) return 0;
  return Math.round((earned / chases) * 10) / 10;
}

export function stormGrade(intercepts, crashes, reports) {
  if (!intercepts) return 'D';
  const score = intercepts - crashes * 5 + reports;
  if (score >= 20) return 'S';
  if (score >= 12) return 'A';
  if (score >= 7) return 'B';
  if (score >= 3) return 'C';
  return 'D';
}

function stormRecordValue(stat, state) {
  const table = {
    chases: state.chases,
    intercepts: state.intercepts,
    earned: Math.round(state.earned),
    bestValue: state.bestValue,
    reports: state.reports,
  };
  return table[stat] !== undefined ? table[stat] : 0;
}

export function stormRecordFor(id, state) {
  const rec = STORM_RECORDS.find((r) => r.id === id);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: stormRecordValue(rec.stat, state), unit: rec.unit };
}

export function stormAllRecords(state) {
  return STORM_RECORDS.map((rec) => ({
    id: rec.id,
    name: rec.name,
    value: stormRecordValue(rec.stat, state),
    unit: rec.unit,
    desc: rec.desc,
  }));
}

export function stormSummary(state) {
  const rankName = STORM_RANKS[state.rank] ? STORM_RANKS[state.rank].name : 'Sky Watcher';
  return `${rankName} — ${state.chases} chases, ${state.intercepts} intercepts, ${state.reports} reports, $${Math.round(state.earned)} earned, truck ${state.truckHealth}%.`;
}

export function stormNextGoal(state) {
  if (state.chases < 10) return 'Start ten chases.';
  if (state.intercepts < 10) return 'Intercept ten storms.';
  if (state.rank < 2) return 'Reach rank 2 and become a Sky Hunter.';
  return 'Intercept a hurricane.';
}

export function stormQuickStart(step) {
  if (step < 0 || step >= STORM_QUICK_START.length) return null;
  return STORM_QUICK_START[step];
}

export function createStormChasingSystem(ctx = {}) {
  const rng = ctx.rng || Math.random;
  const getDay = ctx.getDay || (() => 1);
  const getHour = ctx.getHour || (() => 12);
  const getCash = ctx.getCash || (() => 0);
  const addCash = ctx.addCash || (() => {});
  const addHeat = ctx.addHeat || (() => {});
  const log = ctx.log || (() => {});
  const getPlayerPos = ctx.getPlayerPos || (() => ({ x: 0, z: 0 }));
  const getWeather = ctx.getWeather || (() => ({ condition: 'clear' }));

  const seedFootage = () => {
    const footage = {};
    for (const f of STORM_FOOTAGE) footage[f.id] = 0;
    return footage;
  };

  const sys = {
    xp: 0,
    rank: 0,
    chases: 0,
    intercepts: 0,
    footage: seedFootage(),
    footageSold: 0,
    earned: 0,
    spent: 0,
    crashes: 0,
    reports: 0,
    truckHealth: 100,
    upgrades: [],
    storm: null,
    stormType: null,
    stormProgress: 0,
    closest: 999,
    lastDay: 1,
    activeContract: null,
    contractProgress: 0,
    contractsDone: 0,
    contractsFailed: 0,
    bestStorm: null,
    bestValue: 0,
    dailyChases: 0,
    dailyEarned: 0,
    currentEvent: null,
    stormsCaught: 0,
    daysChased: 0,
  };

  function scoreXp(amount) {
    sys.xp += amount;
    const next = stormRankFor(sys.xp);
    if (next > sys.rank) {
      sys.rank = next;
      log(`Rank up! You are now ${STORM_RANKS[next].name}.`);
    }
  }

  function miss(reason) {
    return { ok: false, reason };
  }

  function land(extra) {
    return { ok: true, ...extra };
  }

  function activeEvent() {
    return sys.currentEvent
      ? STORM_EVENTS.find((e) => e.id === sys.currentEvent) || null
      : null;
  }

  function pickStorm(zoneId) {
    const zone = STORM_ZONES.find((z) => z.id === zoneId);
    const ev = activeEvent();
    const pool = STORM_TYPES.filter((s) => {
      if (zoneId === 'plains') return ['gustnado', 'rain', 'hail', 'supercell', 'tornado', 'squall'].includes(s.id);
      if (zoneId === 'coast') return ['rain', 'hail', 'hurricane', 'squall'].includes(s.id);
      if (zoneId === 'valley') return ['rain', 'supercell', 'tornado', 'blizzard', 'ember'].includes(s.id);
      return ['dust', 'rain', 'hail', 'ember', 'squall'].includes(s.id);
    });
    if (!pool.length) return STORM_TYPES[1];
    let total = 0;
    const weights = pool.map((s) => {
      let w = s.rarity;
      if (ev && ev.storms.includes(s.id)) w *= ev.mult;
      total += w;
      return w;
    });
    let roll = rng() * total;
    for (let i = 0; i < pool.length; i++) {
      roll -= weights[i];
      if (roll <= 0) return pool[i];
    }
    return pool[pool.length - 1];
  }

  function footageForStorm(stormId) {
    return STORM_FOOTAGE.filter((f) => f.storm === stormId);
  }

  function settleContract(stormId) {
    if (!sys.activeContract) return;
    if (sys.activeContract.storm !== stormId && sys.activeContract.storm !== 'any') return;
    sys.contractProgress += 1;
  }

  sys.startChase = function startChase(zoneId) {
    const zone = STORM_ZONES.find((z) => z.id === zoneId);
    if (!zone) return miss('unknown-zone');
    if (sys.storm) return miss('already-chasing');
    if (sys.truckHealth < 30) return miss('truck-broken');
    const hour = getHour();
    if (hour >= 22 || hour <= 4) return miss('night');
    const storm = pickStorm(zoneId);
    sys.storm = zoneId;
    sys.stormType = { ...storm };
    sys.stormProgress = 0;
    sys.closest = 999;
    log(`Chase started: a ${storm.name} over ${zone.name}.`);
    return land({ storm: storm.id });
  };

  sys.drive = function drive() {
    if (!sys.storm || !sys.stormType) return miss('no-chase');
    const storm = sys.stormType;
    const step = sys.upgrades.includes('truck') ? 2 : 1;
    const firstDrive = sys.stormProgress === 0;
    sys.stormProgress += step;
    if (firstDrive) {
      sys.chases += 1;
      sys.dailyChases += 1;
      sys.daysChased += 1;
    }
    const damage = 2 + Math.floor(rng() * 5);
    sys.truckHealth = Math.max(0, sys.truckHealth - damage);
    if (rng() < 0.12) {
      const hazard = STORM_HAZARDS[Math.floor(rng() * STORM_HAZARDS.length)];
      log(`Hazard on the road: ${hazard.name}!`);
      if (hazard.damage >= 3) addHeat(1);
    }
    if (rng() < 0.4) {
      sys.closest = Math.max(0, sys.closest - (1 + Math.floor(rng() * 10)));
    }
    const need = storm.duration * 2;
    if (sys.stormProgress >= need) {
      return sys.intercept();
    }
    return land({ progress: sys.stormProgress, need, done: false });
  };

  sys.intercept = function intercept() {
    if (!sys.storm || !sys.stormType) return miss('no-chase');
    const storm = sys.stormType;
    let chance = 0.6 + 0.05 * sys.rank - storm.danger * 0.05;
    if (sys.upgrades.includes('radar')) chance += 0.1;
    if (sys.upgrades.includes('armour')) chance += 0.1;
    chance = Math.max(0.05, Math.min(0.95, chance));
    if (rng() >= chance) {
      sys.crashes += 1;
      const damage = 10 + Math.floor(rng() * 21);
      sys.truckHealth = Math.max(0, sys.truckHealth - damage);
      log(`Intercept failed! The ${storm.name} threw the truck around.`);
      return land({ intercepted: false, storm: storm.id });
    }
    sys.intercepts += 1;
    sys.stormsCaught += 1;
    if (storm.value > sys.bestValue) {
      sys.bestValue = storm.value;
      sys.bestStorm = storm.id;
    }
    scoreXp(20 + storm.danger * 5);
    const clips = footageForStorm(storm.id);
    let footageId = null;
    if (clips.length) {
      const clip = clips[Math.floor(rng() * clips.length)];
      sys.footage[clip.id] += 1;
      footageId = clip.id;
    }
    if (storm.danger >= 4) addHeat(2);
    settleContract(storm.id);
    log(`Intercepted the ${storm.name}! Got the shot.`);
    return land({ intercepted: true, storm: storm.id, footage: footageId, score: storm.value });
  };

  sys.film = function film() {
    if (!sys.storm || !sys.stormType) return miss('no-chase');
    const clips = footageForStorm(sys.stormType.id);
    if (!clips.length) return miss('no-footage');
    const clip = clips.length === 1 ? clips[0] : clips[Math.floor(rng() * clips.length)];
    sys.footage[clip.id] += 1;
    scoreXp(15);
    return land({ footage: clip.id, name: clip.name });
  };

  sys.endChase = function endChase() {
    if (!sys.storm) return miss('no-chase');
    const done = sys.storm;
    sys.storm = null;
    sys.stormType = null;
    sys.stormProgress = 0;
    sys.closest = 999;
    return land({ zone: done });
  };

  sys.fileReport = function fileReport() {
    if (!sys.storm || !sys.stormType) return miss('no-chase');
    let pay = 20 + 10 * sys.rank;
    if (sys.stormType.danger >= 3) pay += 10;
    sys.reports += 1;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    scoreXp(10);
    return land({ pay });
  };

  sys.repairTruck = function repairTruck() {
    if (sys.truckHealth >= 100) return miss('already-full');
    const cost = (100 - sys.truckHealth) * 2;
    if (getCash() < cost) return miss('not-enough-cash');
    addCash(-cost);
    sys.spent += cost;
    sys.truckHealth = 100;
    return land({ cost });
  };

  sys.sellFootage = function sellFootage(buyerId, footageId, qty) {
    const buyer = STORM_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return miss('unknown-buyer');
    if (sys.rank < buyer.minRank) return miss('rank-too-low');
    const footage = STORM_FOOTAGE.find((f) => f.id === footageId);
    if (!footage) return miss('unknown-footage');
    if ((sys.footage[footageId] || 0) < qty) return miss('not-enough');
    const unitPrice = stormBuyerPrice(footage, buyerId, sys.rank, sys.upgrades);
    const total = unitPrice * qty;
    sys.footage[footageId] -= qty;
    sys.footageSold += qty;
    sys.earned += total;
    sys.dailyEarned += total;
    addCash(total);
    scoreXp(qty * 2);
    if (sys.activeContract && sys.activeContract.storm === footage.storm) {
      sys.contractProgress += qty;
    }
    return land({ total, unitPrice, quantity: qty });
  };

  sys.sellAll = function sellAll(buyerId) {
    const buyer = STORM_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return miss('unknown-buyer');
    if (sys.rank < buyer.minRank) return miss('rank-too-low');
    const lines = [];
    let total = 0;
    let count = 0;
    for (const footage of STORM_FOOTAGE) {
      const qty = sys.footage[footage.id] || 0;
      if (qty > 0) {
        const unitPrice = stormBuyerPrice(footage, buyerId, sys.rank, sys.upgrades);
        const lineTotal = unitPrice * qty;
        lines.push({ id: footage.id, quantity: qty, total: lineTotal });
        total += lineTotal;
        count += qty;
        sys.footage[footage.id] = 0;
      }
    }
    if (!lines.length) return miss('nothing-to-sell');
    sys.footageSold += count;
    sys.earned += total;
    sys.dailyEarned += total;
    addCash(total);
    scoreXp(count);
    return land({ total, count, lines });
  };

  sys.buyUpgrade = function buyUpgrade(upgradeId) {
    const upgrade = STORM_UPGRADES.find((u) => u.id === upgradeId);
    if (!upgrade) return miss('unknown-upgrade');
    if (sys.upgrades.includes(upgradeId)) return miss('already-owned');
    if (getCash() < upgrade.cost) return miss('not-enough-cash');
    addCash(-upgrade.cost);
    sys.spent += upgrade.cost;
    sys.upgrades.push(upgradeId);
    scoreXp(20);
    return land({ id: upgradeId });
  };

  sys.takeContract = function takeContract(contractId) {
    const contract = STORM_CONTRACTS.find((c) => c.id === contractId);
    if (!contract) return miss('unknown-contract');
    if (sys.activeContract) return miss('contract-active');
    if (sys.rank < contract.rep) return miss('rank-too-low');
    const day = getDay();
    sys.activeContract = { ...contract, dayTaken: day, deadline: day + contract.days };
    sys.contractProgress = 0;
    return land({ contract: sys.activeContract });
  };

  sys.deliverContract = function deliverContract() {
    if (!sys.activeContract) return miss('no-contract');
    let held = 0;
    if (sys.activeContract.storm === 'any') held = sys.stormsCaught;
    else held = sys.contractProgress;
    if (held < sys.activeContract.qty) return miss('not-ready');
    const pay = sys.activeContract.pay + 50 * sys.rank;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    sys.contractsDone += 1;
    sys.activeContract = null;
    sys.contractProgress = 0;
    scoreXp(60);
    return land({ pay });
  };

  sys.abandonContract = function abandonContract() {
    if (!sys.activeContract) return miss('no-contract');
    sys.activeContract = null;
    sys.contractProgress = 0;
    sys.contractsFailed += 1;
    return land({});
  };

  sys.priceBoard = function priceBoard() {
    return STORM_FOOTAGE.map((f) => ({
      id: f.id,
      name: f.name,
      price: stormPriceFor(f, sys.rank, sys.upgrades),
      stock: sys.footage[f.id] || 0,
      storm: f.storm,
      value: f.value,
    }));
  };

  sys.stormReport = function stormReport() {
    return STORM_ZONES.map((z) => ({
      id: z.id,
      name: z.name,
      region: z.region,
      mult: z.mult,
      danger: z.danger,
      storms: STORM_TYPES.filter((s) => {
        if (z.id === 'plains') return ['gustnado', 'rain', 'hail', 'supercell', 'tornado', 'squall'].includes(s.id);
        if (z.id === 'coast') return ['rain', 'hail', 'hurricane', 'squall'].includes(s.id);
        if (z.id === 'valley') return ['rain', 'supercell', 'tornado', 'blizzard', 'ember'].includes(s.id);
        return ['dust', 'rain', 'hail', 'ember', 'squall'].includes(s.id);
      }).map((s) => s.id),
    }));
  };

  sys.dailyEvent = function dailyEvent() {
    const roll = rng();
    if (roll < 0.2) {
      const ev = STORM_EVENTS[Math.floor(rng() * STORM_EVENTS.length)];
      sys.currentEvent = ev.id;
      log(`Today's event: ${ev.name}.`);
      return land({ event: ev.id, name: ev.name });
    }
    if (roll < 0.3) {
      const footage = STORM_FOOTAGE[Math.floor(rng() * STORM_FOOTAGE.length)];
      sys.footage[footage.id] += 1;
      sys.currentEvent = null;
      return land({ event: 'gift', footage: footage.id, name: 'Gift' });
    }
    sys.currentEvent = null;
    return land({ event: 'none', name: 'None' });
  };

  sys.tick = function tick(dt) {
    const step = dt || 0;
    if (sys.storm && rng() < step * 0.05) {
      sys.closest = Math.max(0, sys.closest - Math.floor(rng() * 11));
    }
    if (sys.storm && rng() < step * 0.01) {
      log('A gust of wind rocks the truck.');
    }
  };

  sys.tickDay = function tickDay(day) {
    if (day === sys.lastDay) return;
    sys.lastDay = day;
    sys.dailyChases = 0;
    sys.dailyEarned = 0;
    if (sys.activeContract && day > sys.activeContract.deadline) {
      const held = sys.activeContract.storm === 'any' ? sys.stormsCaught : sys.contractProgress;
      if (held < sys.activeContract.qty) {
        sys.contractsFailed += 1;
        log(`Contract failed: ${sys.activeContract.name}.`);
        sys.activeContract = null;
        sys.contractProgress = 0;
      }
    }
    sys.truckHealth = Math.min(100, sys.truckHealth + 5);
    sys.dailyEvent();
  };

  sys.serialize = function serialize() {
    const out = {};
    for (const key of STORM_STATE_KEYS) {
      out[key] = JSON.parse(JSON.stringify(sys[key]));
    }
    return out;
  };

  sys.deserialize = function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    for (const key of STORM_STATE_KEYS) {
      if (key in saved) sys[key] = JSON.parse(JSON.stringify(saved[key]));
    }
    for (const f of STORM_FOOTAGE) {
      if (sys.footage[f.id] === undefined) sys.footage[f.id] = 0;
    }
    const next = stormRankFor(sys.xp);
    if (next > sys.rank) sys.rank = next;
  };

  sys.stats = function stats() {
    let footageTotal = 0;
    for (const f of STORM_FOOTAGE) footageTotal += sys.footage[f.id] || 0;
    return {
      rank: STORM_RANKS[sys.rank].name,
      xp: sys.xp,
      chases: sys.chases,
      intercepts: sys.intercepts,
      footage: footageTotal,
      footageSold: sys.footageSold,
      earned: Math.round(sys.earned),
      spent: sys.spent,
      crashes: sys.crashes,
      reports: sys.reports,
      truckHealth: sys.truckHealth,
      upgrades: sys.upgrades.length,
      storm: sys.storm,
      activeContract: sys.activeContract ? sys.activeContract.id : null,
      contractsDone: sys.contractsDone,
      contractsFailed: sys.contractsFailed,
      bestStorm: sys.bestStorm,
      dailyChases: sys.dailyChases,
      dailyEarned: Math.round(sys.dailyEarned),
      event: sys.currentEvent,
    };
  };

  sys.hudLine = function hudLine() {
    if (sys.storm && sys.stormType) {
      const zone = STORM_ZONES.find((z) => z.id === sys.storm);
      return `Storm ${sys.stormType.name} — ${zone.name} ${sys.stormProgress} driven`;
    }
    if (sys.activeContract) {
      return `Contract ${sys.activeContract.name} ${sys.contractProgress}/${sys.activeContract.qty}`;
    }
    let footageTotal = 0;
    for (const f of STORM_FOOTAGE) footageTotal += sys.footage[f.id] || 0;
    if (footageTotal > 0) return `${footageTotal} footage to sell or file a report on`;
    return '';
  };

  sys.interact = function interact() {
    const pos = getPlayerPos();
    const dx = (pos.x || 0) - 700;
    const dz = (pos.z || 0) - 500;
    if (Math.hypot(dx, dz) > 40) return false;
    if (!sys.storm) {
      sys.startChase('plains');
      return true;
    }
    sys.drive();
    return true;
  };

  return sys;
}

export function createStormChasingExtras(system) {
  const sys = system;
  let hired = [];
  let claimed = [];
  let wagesPaid = 0;

  function miss(reason) {
    return { ok: false, reason };
  }

  function land(extra) {
    return { ok: true, ...extra };
  }

  const extras = {
    hireHelper(id) {
      const helper = STORM_HELPERS.find((h) => h.id === id);
      if (!helper) return miss('unknown-helper');
      if (hired.includes(id)) return miss('already-hired');
      hired.push(id);
      return land({ id, name: helper.name, wage: helper.wage });
    },
    fireHelper(id) {
      if (!hired.includes(id)) return miss('not-hired');
      hired = hired.filter((h) => h !== id);
      return land({ id });
    },
    payWages() {
      let due = 0;
      for (const id of hired) {
        const helper = STORM_HELPERS.find((h) => h.id === id);
        if (helper) due += helper.wage;
      }
      wagesPaid += due;
      return land({ due, helpers: [...hired], wagesPaid });
    },
    helperBonus(skill) {
      let sum = 0;
      for (const id of hired) {
        const helper = STORM_HELPERS.find((h) => h.id === id);
        if (helper && helper.skill === skill) sum += helper.bonus;
      }
      return sum;
    },
    challenges() {
      return STORM_CHALLENGES.map((c) => stormChallengeProgress(c, sys));
    },
    claimChallenge(id) {
      const challenge = STORM_CHALLENGES.find((c) => c.id === id);
      if (!challenge) return miss('unknown-challenge');
      if (claimed.includes(id)) return miss('already-claimed');
      const progress = stormChallengeProgress(challenge, sys);
      if (!progress.done) return miss('not-done');
      claimed.push(id);
      return land({ id, xp: challenge.xp });
    },
    achievements() {
      return STORM_ACHIEVEMENTS.map((a) => ({
        id: a.id,
        name: a.name,
        desc: a.desc,
        done: !!a.check(sys),
      }));
    },
    forecast(stormId) {
      const storm = STORM_TYPES.find((s) => s.id === stormId);
      if (!storm) return miss('unknown-storm');
      const danger = stormDangerDescription(stormId);
      const tip = STORM_SAFETY[Math.floor(0)];
      return land({
        storm: storm.id,
        danger: storm.danger,
        scale: danger.scale,
        wind: danger.wind,
        safety: tip.text,
      });
    },
    inventoryValue() {
      let value = 0;
      for (const f of STORM_FOOTAGE) {
        value += (sys.footage[f.id] || 0) * f.value;
      }
      return land({ value: Math.round(value) });
    },
    truckStatus() {
      const cost = (100 - sys.truckHealth) * 2;
      return land({ truckHealth: sys.truckHealth, ready: sys.truckHealth >= 30, repairCost: cost });
    },
    get helpers() {
      return [...hired];
    },
    get claimed() {
      return [...claimed];
    },
    get wagesPaid() {
      return wagesPaid;
    },
  };

  return extras;
}

export function createStormChasingLog(system) {
  const sys = system;
  const entries = [];
  let clips = 0;

  function miss(reason) {
    return { ok: false, reason };
  }

  function land(extra) {
    return { ok: true, ...extra };
  }

  const chaseLog = {
    addEntry(text) {
      entries.push({ day: sys.lastDay || 1, zone: sys.storm || null, text });
      clips += 1;
      return land({ count: entries.length });
    },
    logChase(zoneId) {
      const zone = STORM_ZONES.find((z) => z.id === zoneId);
      if (!zone) return miss('unknown-zone');
      return chaseLog.addEntry(`Chased storms over ${zone.name}: ${zone.desc}`);
    },
    logIntercept(stormId) {
      const storm = STORM_TYPES.find((s) => s.id === stormId);
      if (!storm) return miss('unknown-storm');
      const danger = stormDangerDescription(stormId);
      return chaseLog.addEntry(`Intercepted a ${storm.name} (${danger.scale}, ${danger.wind}).`);
    },
    readEntries(limit) {
      const n = limit === undefined ? entries.length : limit;
      return entries.slice(-n);
    },
    chaseSummary() {
      let footageTotal = 0;
      for (const f of STORM_FOOTAGE) footageTotal += sys.footage[f.id] || 0;
      return {
        chases: sys.chases,
        intercepts: sys.intercepts,
        footage: footageTotal,
        bestStorm: sys.bestStorm,
        truckHealth: sys.truckHealth,
      };
    },
    get entries() {
      return [...entries];
    },
    get clips() {
      return clips;
    },
  };

  return chaseLog;
}
