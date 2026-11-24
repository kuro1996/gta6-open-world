export const HUNTING_ANIMALS = [
  { id: 'rabbit', name: 'Rabbit', value: 15, meat: 2, pelt: 1, difficulty: 1, rarity: 0.3, habitat: 'marsh', season: 'all', danger: 0, trackTime: 1, desc: 'Quick and common, good for a first stalk.' },
  { id: 'duck', name: 'Duck', value: 20, meat: 2, pelt: 1, difficulty: 1, rarity: 0.28, habitat: 'marsh', season: 'all', danger: 0, trackTime: 1, desc: 'Paddles the reeds at dawn and dusk.' },
  { id: 'squirrel', name: 'Squirrel', value: 12, meat: 1, pelt: 1, difficulty: 1, rarity: 0.25, habitat: 'orchard', season: 'all', danger: 0, trackTime: 1, desc: 'Small, twitchy, and always watching the canopy.' },
  { id: 'pheasant', name: 'Pheasant', value: 25, meat: 2, pelt: 1, difficulty: 2, rarity: 0.2, habitat: 'scrub', season: 'autumn', danger: 0, trackTime: 2, desc: 'Bursts out of the brush when you least expect it.' },
  { id: 'raccoon', name: 'Raccoon', value: 30, meat: 2, pelt: 2, difficulty: 2, rarity: 0.18, habitat: 'orchard', season: 'all', danger: 1, trackTime: 2, desc: 'A night raider with a fine striped pelt.' },
  { id: 'deer', name: 'Deer', value: 90, meat: 8, pelt: 2, difficulty: 3, rarity: 0.12, habitat: 'pine', season: 'all', danger: 1, trackTime: 4, desc: 'The classic quarry of the pine ridge.' },
  { id: 'fox', name: 'Fox', value: 45, meat: 2, pelt: 3, difficulty: 3, rarity: 0.1, habitat: 'scrub', season: 'winter', danger: 1, trackTime: 3, desc: 'Clever, fast, and worth more for its coat than its meat.' },
  { id: 'boar', name: 'Boar', value: 120, meat: 10, pelt: 3, difficulty: 4, rarity: 0.08, habitat: 'scrub', season: 'all', danger: 3, trackTime: 5, desc: 'Mean, heavy, and liable to charge when wounded.' },
  { id: 'goose', name: 'Goose', value: 35, meat: 3, pelt: 1, difficulty: 2, rarity: 0.15, habitat: 'marsh', season: 'spring', danger: 0, trackTime: 2, desc: 'Loud flocks that pass through in spring.' },
  { id: 'elk', name: 'Elk', value: 180, meat: 14, pelt: 4, difficulty: 4, rarity: 0.06, habitat: 'pine', season: 'autumn', danger: 2, trackTime: 6, desc: 'A grand rack in the autumn rut.' },
  { id: 'bear', name: 'Bear', value: 260, meat: 12, pelt: 5, difficulty: 5, rarity: 0.03, habitat: 'pine', season: 'spring', danger: 4, trackTime: 8, desc: 'The most dangerous game in these woods.' },
  { id: 'turkey', name: 'Turkey', value: 40, meat: 4, pelt: 1, difficulty: 2, rarity: 0.14, habitat: 'orchard', season: 'autumn', danger: 0, trackTime: 3, desc: 'Struts the orchard rows in autumn.' },
];

export const HUNTING_HABITATS = [
  { id: 'marsh', name: 'Marshlands', district: 'Wetlands', game: 0.8, danger: 1, mult: 1.0, timeMin: 30, desc: 'Reeds, mud, and waterfowl.' },
  { id: 'pine', name: 'Pine Ridge', district: 'Highlands', game: 0.6, danger: 2, mult: 1.2, timeMin: 45, desc: 'Tall pines where deer and elk wander.' },
  { id: 'scrub', name: 'Scrub Plains', district: 'Lowlands', game: 0.7, danger: 1, mult: 1.0, timeMin: 30, desc: 'Open brush, boar country.' },
  { id: 'orchard', name: 'Old Orchard', district: 'Valley', game: 0.5, danger: 0, mult: 0.9, timeMin: 20, desc: 'Quiet rows of old fruit trees.' },
];

export const HUNTING_BUYERS = [
  { id: 'butcher', name: 'The Butcher', mult: 1.0, likes: ['deer', 'boar', 'elk'], dislikes: ['fox'], mood: 'steady', minRank: 0, desc: 'Pays fair for meat, every day.' },
  { id: 'tannery', name: 'The Tannery', mult: 1.1, likes: ['fox', 'bear', 'raccoon'], dislikes: ['duck'], mood: 'keen', minRank: 0, desc: 'Wants pelts, the finer the better.' },
  { id: 'lodge', name: 'Hunting Lodge', mult: 1.2, likes: ['deer', 'elk', 'pheasant'], dislikes: ['squirrel'], mood: 'picky', minRank: 2, desc: 'Buys game for the lodge kitchen.' },
  { id: 'taxidermist', name: 'The Taxidermist', mult: 1.4, likes: ['bear', 'elk', 'boar'], dislikes: ['rabbit'], mood: 'fussy', minRank: 3, desc: 'Pays top coin for trophy animals.' },
  { id: 'market', name: 'Town Market', mult: 0.9, likes: [], dislikes: [], mood: 'flat', minRank: 0, desc: 'Buys anything, but never pays well.' },
];

export const HUNTING_UPGRADES = [
  { id: 'license', name: 'Hunting Licence', cost: 80, desc: 'A stamped licence that keeps the warden off your back.', effect: 'legal' },
  { id: 'boots', name: 'Silent Boots', cost: 120, desc: 'Soft soles for creeping close without a sound.', effect: 'stealth' },
  { id: 'call', name: 'Game Call', cost: 160, desc: 'A reed call that draws animals toward you.', effect: 'lure' },
  { id: 'blind', name: 'Hunting Blind', cost: 240, desc: 'A hidden blind that steadies your aim.', effect: 'accuracy' },
  { id: 'scope', name: 'Rifle Scope', cost: 320, desc: 'A fine scope for long, clean shots.', effect: 'accuracy' },
  { id: 'rifle', name: 'Bolt Rifle', cost: 480, desc: 'A heavy bolt rifle for big game.', effect: 'power' },
  { id: 'dog', name: 'Hunting Dog', cost: 650, desc: 'A loyal dog that tracks wounded game.', effect: 'track' },
  { id: 'freezer', name: 'Deep Freezer', cost: 900, desc: 'Keeps meat from spoiling overnight.', effect: 'preserve' },
];

export const HUNTING_RANKS = [
  { level: 0, name: 'Weekend Shooter', xp: 0, perk: 'Learning the trails.' },
  { level: 1, name: 'Trail Walker', xp: 120, perk: 'Steadier on the stalk.' },
  { level: 2, name: 'Stalker', xp: 300, perk: 'Animals rarely hear you coming.' },
  { level: 3, name: 'Big Game Hunter', xp: 620, perk: 'The lodge takes your calls.' },
  { level: 4, name: 'Master of the Wild', xp: 1100, perk: 'The woods are yours.' },
];

export const HUNTING_SEASONS = [
  { id: 'spring', name: 'Spring', months: [3, 4, 5], mult: 1.0, desc: 'New growth, skittish game.' },
  { id: 'summer', name: 'Summer', months: [6, 7, 8], mult: 0.9, desc: 'Thick cover, wary animals.' },
  { id: 'autumn', name: 'Autumn', months: [9, 10, 11], mult: 1.2, desc: 'The rut. Best prices of the year.' },
  { id: 'winter', name: 'Winter', months: [12, 1, 2], mult: 1.1, desc: 'Bare branches, clear shots.' },
];

export const HUNTING_TROPHIES = [
  { id: 'antler-6', name: 'Six-Point Antlers', animal: 'deer', value: 180, desc: 'A fine six-point rack.' },
  { id: 'antler-10', name: 'Ten-Point Antlers', animal: 'elk', value: 420, desc: 'A grand ten-point rack.' },
  { id: 'boar-tusk', name: 'Boar Tusk', animal: 'boar', value: 150, desc: 'A curved, yellowed tusk.' },
  { id: 'bear-claw', name: 'Bear Claw', animal: 'bear', value: 300, desc: 'A heavy claw from a big bear.' },
  { id: 'fox-tail', name: 'Fox Tail', animal: 'fox', value: 90, desc: 'A bushy red tail.' },
  { id: 'goose-feather', name: 'Goose Feather', animal: 'goose', value: 40, desc: 'A long barred feather.' },
];

export const HUNTING_EVENTS = [
  { id: 'rut', name: 'The Rut', mult: 1.3, animals: ['deer', 'elk'], desc: 'Bucks are bold and careless.' },
  { id: 'migration', name: 'Migration', mult: 1.2, animals: ['duck', 'goose'], desc: 'Flocks pass overhead in waves.' },
  { id: 'full-moon', name: 'Full Moon', mult: 1.1, animals: ['fox', 'raccoon'], desc: 'Night hunters stir under bright moonlight.' },
  { id: 'storm-front', name: 'Storm Front', mult: 0.8, animals: ['rabbit', 'squirrel'], desc: 'Wind and rain drive game to cover.' },
  { id: 'warden-patrol', name: 'Warden Patrol', mult: 0.9, animals: [], desc: 'The warden is out walking the trails.' },
  { id: 'acorn-mast', name: 'Acorn Mast', mult: 1.2, animals: ['boar', 'squirrel', 'turkey'], desc: 'A heavy acorn fall fattens the woods.' },
];

export const HUNTING_CONTRACTS = [
  { id: 'venison-10', name: 'Venison Order', animal: 'deer', qty: 3, pay: 300, days: 2, rep: 1, desc: 'Three deer for the lodge table.' },
  { id: 'boar-2', name: 'Boar Cull', animal: 'boar', qty: 2, pay: 380, days: 2, rep: 2, desc: 'Two boars rooting up the fields.' },
  { id: 'pelts-8', name: 'Fox Pelts', animal: 'fox', qty: 4, pay: 420, days: 3, rep: 2, desc: 'Four fine fox pelts for the tannery.' },
  { id: 'rabbit-12', name: 'Rabbit Dozen', animal: 'rabbit', qty: 12, pay: 220, days: 1, rep: 0, desc: 'A dozen rabbits for the market stall.' },
  { id: 'elk-1', name: 'One Great Elk', animal: 'elk', qty: 1, pay: 600, days: 3, rep: 3, desc: 'A single great elk, nothing less.' },
  { id: 'duck-8', name: 'Duck Supper', animal: 'duck', qty: 8, pay: 260, days: 1, rep: 0, desc: 'Eight ducks for the tavern.' },
];

export const HUNTING_WEATHER_MODS = [
  { condition: 'clear', accuracy: 0, encounter: 0, desc: 'Clear skies, fair shooting.' },
  { condition: 'rain', accuracy: -0.1, encounter: -0.05, desc: 'Rain muffles sound but blurs the sight.' },
  { condition: 'fog', accuracy: -0.15, encounter: -0.1, desc: 'Thick fog hides the game.' },
  { condition: 'storm', accuracy: -0.2, encounter: -0.2, desc: 'A storm keeps everything down.' },
  { condition: 'snow', accuracy: -0.05, encounter: -0.1, desc: 'Snow shows tracks but chills the fingers.' },
  { condition: 'wind', accuracy: -0.1, encounter: 0.05, desc: 'Wind carries scent away, but pushes the shot.' },
];

export const HUNTING_HELPERS = [
  { id: 'tracker', name: 'Old Tracker', wage: 30, skill: 'track', bonus: 0.2, desc: 'Reads sign like a book.' },
  { id: 'skinner', name: 'Skinner', wage: 45, skill: 'pelt', bonus: 0.25, desc: 'Never wastes a pelt.' },
  { id: 'cook', name: 'Camp Cook', wage: 55, skill: 'meat', bonus: 0.2, desc: 'Turns game into fine meals.' },
  { id: 'warden-friend', name: 'Warden Friend', wage: 70, skill: 'legal', bonus: 0.5, desc: 'Knows the warden by name.' },
];

export const HUNTING_CHALLENGES = [
  { id: 'first-blood', name: 'First Blood', target: 'kills', goal: 1, xp: 50, desc: 'Take your first animal.' },
  { id: 'kills-25', name: 'Twenty-Five Down', target: 'kills', goal: 25, xp: 100, desc: 'Take twenty-five animals.' },
  { id: 'heart-10', name: 'Ten Heart Shots', target: 'heartShots', goal: 10, xp: 120, desc: 'Land ten heart shots.' },
  { id: 'earn-1000', name: 'A Thousand Earned', target: 'earned', goal: 1000, xp: 150, desc: 'Earn a thousand from the hunt.' },
  { id: 'trophies-5', name: 'Five Trophies Sold', target: 'trophiesSold', goal: 5, xp: 120, desc: 'Sell five trophies.' },
  { id: 'contracts-5', name: 'Five Contracts', target: 'contractsDone', goal: 5, xp: 140, desc: 'Finish five hunting contracts.' },
  { id: 'elk-1', name: 'An Elk Worthy', target: 'bestValue', goal: 180, xp: 200, desc: 'Take an animal worth at least 180.' },
  { id: 'no-spook', name: 'Ghost in the Woods', target: 'spooked', goal: 0, xp: 100, desc: 'Never spook a single animal.' },
];

export const HUNTING_ACHIEVEMENTS = [
  { id: 'first-kill', name: 'First Kill', check: (s) => s.kills >= 1, desc: 'Your first clean kill.' },
  { id: 'first-trophy', name: 'First Trophy', check: (s) => s.trophies.length >= 1, desc: 'Your first trophy on the wall.' },
  { id: 'bear-down', name: 'Bear Down', check: (s) => s.bestAnimal === 'bear', desc: 'You brought down a bear.' },
  { id: 'rank-3', name: 'Big Game Hunter', check: (s) => s.rank >= 3, desc: 'Reach rank three.' },
  { id: 'rich-hunter', name: 'Rich Hunter', check: (s) => s.earned >= 1000, desc: 'Earn a thousand from hunting.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every hunting upgrade.' },
  { id: 'clean-day', name: 'Clean Day', check: (s) => s.kills >= 5 && s.misses === 0, desc: 'Five kills and not one miss.' },
  { id: 'no-fines', name: 'No Fines', check: (s) => s.kills > 0 && s.fines === 0 && s.finesPaid === 0, desc: 'Hunt clean and never pay a fine.' },
];

export const HUNTING_TIPS = [
  { id: 'dawn', name: 'Dawn Patrol', text: 'Game moves most at first light; start your hunt early.' },
  { id: 'wind', name: 'Mind the Wind', text: 'Keep the wind in your face or the herd will smell you first.' },
  { id: 'heart', name: 'Aim for the Heart', text: 'A heart shot drops game clean and saves the pelt.' },
  { id: 'license-first', name: 'Licence First', text: 'Buy the licence before you hunt; warden fines sting.' },
  { id: 'boar-care', name: 'Boar Care', text: 'A wounded boar charges. Keep your distance and your nerve.' },
  { id: 'freeze', name: 'Freeze the Meat', text: 'A deep freezer stops a fifth of your meat spoiling each day.' },
  { id: 'rut', name: 'Use the Rut', text: 'During the rut, deer and elk grow bold and careless.' },
  { id: 'dog', name: 'Trust the Dog', text: 'A good dog finds wounded game you would lose alone.' },
];

export const HUNTING_LEADERBOARD = [
  { name: 'Old Silas', kills: 1400, desc: 'Forty years on the ridge.' },
  { name: 'Ranger Pete', kills: 900, desc: 'Knows every trail by heart.' },
  { name: 'Ria', kills: 0, desc: 'The new hunter in town.' },
  { name: 'Mara', kills: 620, desc: 'Quiet, patient, deadly.' },
  { name: 'Chef Ansel', kills: 310, desc: 'Hunts only what he can cook.' },
];

export const HUNTING_RECORDS = [
  { id: 'most-kills', name: 'Most Kills', stat: 'kills', unit: 'kills', desc: 'Animals taken in total.' },
  { id: 'best-value', name: 'Best Value', stat: 'bestValue', unit: '$', desc: 'Most valuable single animal.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Coin earned from hunting.' },
  { id: 'heart-shots', name: 'Heart Shots', stat: 'heartShots', unit: 'shots', desc: 'Clean heart shots landed.' },
  { id: 'trophies', name: 'Trophies Sold', stat: 'trophiesSold', unit: 'trophies', desc: 'Trophies sold to buyers.' },
];

export const HUNTING_QUICK_START = [
  'Buy the licence first so the warden never fines you.',
  'Start in the marsh at dawn for easy rabbits and ducks.',
  'Stalk slowly; a spooked animal is a wasted morning.',
  'Aim for the heart to keep the pelt clean and the meat prime.',
  'Sell pelts to the tannery and meat to the butcher for the best coin.',
  'Never hunt a bear without the bolt rifle.',
];

export const HUNTING_META = {
  system: 'hunting',
  version: '7-B1',
  author: 'builder-1',
  animals: 12,
  habitats: 4,
  note: 'Stalk, shoot clean, sell the haul.',
};

export function huntingRankFor(xp) {
  let found = 0;
  for (let i = 0; i < HUNTING_RANKS.length; i++) {
    if (xp >= HUNTING_RANKS[i].xp) found = i;
  }
  return found;
}

export function huntingSeasonFor(month) {
  const hit = HUNTING_SEASONS.find((s) => s.months.includes(month));
  return hit || HUNTING_SEASONS[0];
}

export function huntingInSeason(animal, month) {
  if (!animal) return false;
  if (animal.season === 'all') return true;
  return huntingSeasonFor(month).id === animal.season;
}

export function huntingWeatherMod(condition) {
  const hit = HUNTING_WEATHER_MODS.find((w) => w.condition === condition);
  if (hit) return hit;
  return { condition: 'clear', accuracy: 0, encounter: 0, desc: 'Clear skies, fair shooting.' };
}

export function huntingBaseAccuracy(rank, upgrades) {
  const owned = upgrades || [];
  let acc = 0.55 + 0.05 * rank;
  if (owned.includes('blind')) acc += 0.15;
  if (owned.includes('scope')) acc += 0.2;
  if (acc > 0.95) acc = 0.95;
  return acc;
}

export function huntingPriceFor(animal, rank, upgrades, seasonMult) {
  if (!animal) return 1;
  const owned = upgrades || [];
  const mult = seasonMult || 1;
  let price = animal.value * (1 + 0.1 * rank) * mult;
  if (owned.includes('freezer')) price *= 1.1;
  return Math.max(1, Math.round(price));
}

export function huntingBuyerPrice(animal, buyerId, rank, upgrades, seasonMult) {
  const buyer = HUNTING_BUYERS.find((b) => b.id === buyerId);
  if (!buyer || !animal) return 0;
  let price = huntingPriceFor(animal, rank, upgrades, seasonMult) * buyer.mult;
  if (buyer.likes.includes(animal.id)) price *= 1.1;
  if (buyer.dislikes.includes(animal.id)) price *= 0.9;
  if (buyer.id === 'tannery' && animal.pelt >= 3) price *= 1.15;
  if (buyer.id === 'butcher' && animal.meat >= 8) price *= 1.1;
  if (buyer.id === 'taxidermist' && HUNTING_TROPHIES.some((t) => t.animal === animal.id)) price *= 1.2;
  return Math.max(1, Math.round(price));
}

const HUNTING_STATE_KEYS = [
  'xp', 'rank', 'hunts', 'kills', 'cleanKills', 'misses', 'wounded', 'spooked',
  'charged', 'earned', 'spent', 'fines', 'finesPaid', 'meat', 'pelts', 'trophies',
  'trophiesSold', 'upgrades', 'habitat', 'stalk', 'stalkProgress', 'stalkTarget',
  'encounters', 'dayDrift', 'lastDay', 'month', 'activeContract', 'contractProgress',
  'contractsDone', 'contractsFailed', 'bestAnimal', 'bestValue', 'dailyKills',
  'dailyEarned', 'shotsFired', 'heartShots', 'wardenWarnings', 'currentEvent',
  'seasonMult', 'licenses',
];

function huntingChallengeAmount(target, st) {
  switch (target) {
    case 'kills': return st.kills;
    case 'heartShots': return st.heartShots;
    case 'earned': return st.earned;
    case 'trophiesSold': return st.trophiesSold;
    case 'contractsDone': return st.contractsDone;
    case 'bestValue': return st.bestValue;
    case 'spooked': return st.spooked;
    default: return 0;
  }
}

export function huntingHelperBonus(ids, skill) {
  let sum = 0;
  for (const id of ids || []) {
    const helper = HUNTING_HELPERS.find((h) => h.id === id);
    if (helper && helper.skill === skill) sum += helper.bonus;
  }
  return sum;
}

export function huntingChallengeProgress(challenge, state) {
  const amount = Math.floor(huntingChallengeAmount(challenge.target, state));
  const done = challenge.goal === 0 ? amount === 0 : amount >= challenge.goal;
  return { id: challenge.id, name: challenge.name, amount, goal: challenge.goal, done };
}

export function huntingTipFor(day) {
  const idx = ((day || 0) % HUNTING_TIPS.length + HUNTING_TIPS.length) % HUNTING_TIPS.length;
  return HUNTING_TIPS[idx];
}

export function huntingLeaderboardWith(kills) {
  const rows = HUNTING_LEADERBOARD.map((row) => ({
    name: row.name,
    kills: row.name === 'Ria' ? kills : row.kills,
    desc: row.desc,
  }));
  rows.sort((a, b) => b.kills - a.kills);
  return rows.map((row, i) => ({ rank: i + 1, name: row.name, kills: row.kills, desc: row.desc }));
}

export function huntingEfficiency(kills, shots) {
  if (!shots) return 0;
  return Math.round((kills / shots) * 100);
}

export function huntingProfitPerDay(earned, hunts) {
  if (!hunts) return 0;
  return Math.round((earned / hunts) * 10) / 10;
}

export function huntingGrade(kills, misses, heartShots) {
  const shots = kills + misses;
  if (!shots) return 'D';
  const acc = kills / shots;
  if (acc >= 0.9 && heartShots >= 5) return 'S';
  if (acc >= 0.75) return 'A';
  if (acc >= 0.6) return 'B';
  if (acc >= 0.4) return 'C';
  return 'D';
}

function huntingRecordValue(stat, state) {
  switch (stat) {
    case 'kills': return state.kills;
    case 'bestValue': return state.bestValue;
    case 'earned': return Math.round(state.earned);
    case 'heartShots': return state.heartShots;
    case 'trophiesSold': return state.trophiesSold;
    default: return 0;
  }
}

export function huntingRecordFor(id, state) {
  const rec = HUNTING_RECORDS.find((r) => r.id === id);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: huntingRecordValue(rec.stat, state), unit: rec.unit };
}

export function huntingAllRecords(state) {
  return HUNTING_RECORDS.map((rec) => ({
    id: rec.id,
    name: rec.name,
    value: huntingRecordValue(rec.stat, state),
    unit: rec.unit,
    desc: rec.desc,
  }));
}

export function huntingSummary(state) {
  const rankName = HUNTING_RANKS[state.rank] ? HUNTING_RANKS[state.rank].name : 'Weekend Shooter';
  return `${rankName} — ${state.kills} kills, ${state.heartShots} heart shots, $${Math.round(state.earned)} earned, ${state.trophies.length} trophies.`;
}

export function huntingNextGoal(state) {
  if (state.kills < 5) return 'Bag five kills on the trail.';
  if (state.heartShots < 5) return 'Land five heart shots.';
  if (state.rank < 2) return 'Reach rank 2 and become a Stalker.';
  return 'Take a ridge elk with one clean shot.';
}

export function huntingQuickStart(step) {
  if (step < 0 || step >= HUNTING_QUICK_START.length) return null;
  return HUNTING_QUICK_START[step];
}

export function createHuntingSystem(ctx = {}) {
  const rng = ctx.rng || Math.random;
  const getDay = ctx.getDay || (() => 1);
  const getHour = ctx.getHour || (() => 12);
  const getCash = ctx.getCash || (() => 0);
  const addCash = ctx.addCash || (() => {});
  const addHeat = ctx.addHeat || (() => {});
  const log = ctx.log || (() => {});
  const getPlayerPos = ctx.getPlayerPos || (() => ({ x: 0, z: 0 }));
  const getWeather = ctx.getWeather || (() => ({ condition: 'clear' }));

  const zeroMap = () => {
    const m = {};
    for (const a of HUNTING_ANIMALS) m[a.id] = 0;
    return m;
  };

  const sys = {
    xp: 0,
    rank: 0,
    hunts: 0,
    kills: 0,
    cleanKills: 0,
    misses: 0,
    wounded: 0,
    spooked: 0,
    charged: 0,
    earned: 0,
    spent: 0,
    fines: 0,
    finesPaid: 0,
    meat: zeroMap(),
    pelts: zeroMap(),
    trophies: [],
    trophiesSold: 0,
    upgrades: [],
    habitat: null,
    stalkProgress: 0,
    stalkTarget: null,
    encounters: 0,
    dayDrift: zeroMap(),
    lastDay: 1,
    month: 9,
    activeContract: null,
    contractProgress: 0,
    contractsDone: 0,
    contractsFailed: 0,
    bestAnimal: null,
    bestValue: 0,
    dailyKills: 0,
    dailyEarned: 0,
    shotsFired: 0,
    heartShots: 0,
    wardenWarnings: 0,
    currentEvent: null,
    seasonMult: 1.2,
    licenses: 0,
  };

  let stalking = false;

  function gainXp(amount) {
    sys.xp += amount;
    const next = huntingRankFor(sys.xp);
    if (next > sys.rank) {
      sys.rank = next;
      log(`Rank up! You are now ${HUNTING_RANKS[next].name}.`);
    }
  }

  function nope(reason) {
    return { ok: false, reason };
  }

  function yep(extra) {
    return { ok: true, ...extra };
  }

  function currentSeason() {
    return huntingSeasonFor(sys.month);
  }

  function eventRow() {
    if (!sys.currentEvent) return null;
    return HUNTING_EVENTS.find((e) => e.id === sys.currentEvent) || null;
  }

  function pickAnimal(habitatId) {
    const pool = HUNTING_ANIMALS.filter(
      (a) => a.habitat === habitatId && huntingInSeason(a, sys.month),
    );
    if (!pool.length) return null;
    const ev = eventRow();
    const weights = pool.map((a) => {
      let w = a.rarity;
      if (sys.upgrades.includes('call')) w *= 1.4;
      if (ev && ev.animals.includes(a.id)) w *= ev.mult;
      return w;
    });
    let total = 0;
    for (const w of weights) total += w;
    let roll = rng() * total;
    for (let i = 0; i < pool.length; i++) {
      roll -= weights[i];
      if (roll <= 0) return pool[i];
    }
    return pool[pool.length - 1];
  }

  function checkContract(animalId) {
    if (!sys.activeContract || sys.activeContract.animal !== animalId) return;
    sys.contractProgress += 1;
    if (sys.contractProgress < sys.activeContract.qty) return;
    const pay = sys.activeContract.pay + 50 * sys.rank;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    sys.contractsDone += 1;
    log(`Contract done: ${sys.activeContract.name} paid $${pay}.`);
    sys.activeContract = null;
    sys.contractProgress = 0;
    gainXp(60);
  }

  sys.startHunt = function startHunt(habitatId) {
    const habitat = HUNTING_HABITATS.find((h) => h.id === habitatId);
    if (!habitat) return nope('unknown-habitat');
    if (sys.habitat) return nope('already-hunting');
    const hour = getHour();
    if (hour >= 22 || hour <= 3) return nope('night');
    sys.habitat = habitatId;
    stalking = false;
    sys.stalkProgress = 0;
    sys.stalkTarget = null;
    sys.hunts += 1;
    log(`Hunt started in ${habitat.name}.`);
    return yep({ habitat: habitatId });
  };

  sys.stalk = function stalk() {
    if (!sys.habitat) return nope('no-hunt');
    if (stalking) return nope('already-stalking');
    const animal = pickAnimal(sys.habitat);
    if (!animal) return nope('no-game');
    const weather = huntingWeatherMod(getWeather().condition);
    const spookLine = 0.12 + weather.encounter;
    if (rng() < spookLine) {
      sys.spooked += 1;
      log('Something spooked in the brush before you could find it.');
      return nope('spooked');
    }
    stalking = true;
    sys.stalkTarget = animal.id;
    sys.stalkProgress = 0;
    sys.encounters += 1;
    return yep({ found: true, animal: animal.id, name: animal.name, trackTime: animal.trackTime });
  };

  sys.creep = function creep() {
    if (!stalking || !sys.stalkTarget) return nope('no-stalk');
    const animal = HUNTING_ANIMALS.find((a) => a.id === sys.stalkTarget);
    sys.stalkProgress += 1;
    let spookChance = 0.05 + animal.difficulty * 0.04;
    if (sys.upgrades.includes('boots')) spookChance -= 0.05;
    if (rng() < Math.max(0, spookChance)) {
      stalking = false;
      sys.stalkTarget = null;
      sys.stalkProgress = 0;
      sys.spooked += 1;
      log(`The ${animal.name} bolted at a snapped twig.`);
      return nope('spooked');
    }
    return yep({
      progress: sys.stalkProgress,
      needed: animal.trackTime,
      inRange: sys.stalkProgress >= animal.trackTime,
    });
  };

  sys.shoot = function shoot() {
    if (!stalking || !sys.stalkTarget) return nope('no-stalk');
    const animal = HUNTING_ANIMALS.find((a) => a.id === sys.stalkTarget);
    const weather = huntingWeatherMod(getWeather().condition);
    const inRange = sys.stalkProgress >= animal.trackTime;
    let accuracy = huntingBaseAccuracy(sys.rank, sys.upgrades) + weather.accuracy;
    if (!inRange) accuracy -= 0.2;
    accuracy -= animal.difficulty * 0.03;
    if (sys.upgrades.includes('rifle') && animal.danger >= 3) accuracy += 0.1;
    accuracy = Math.max(0.05, Math.min(0.95, accuracy));
    sys.shotsFired += 1;
    stalking = false;
    sys.stalkTarget = null;
    sys.stalkProgress = 0;
    if (rng() >= accuracy) {
      sys.misses += 1;
      sys.spooked += 1;
      log(`Missed the ${animal.name}; it vanished into the trees.`);
      return yep({ hit: false, heart: false, wounded: false, animal: animal.id, meat: 0, pelts: 0 });
    }
    const heart = rng() < 0.25;
    const wounded = !heart && rng() < 0.2;
    sys.kills += 1;
    sys.dailyKills += 1;
    if (heart) {
      sys.heartShots += 1;
      sys.cleanKills += 1;
    }
    if (wounded) sys.wounded += 1;
    if (wounded && animal.danger >= 3 && rng() < 0.5) {
      sys.charged += 1;
      addHeat(2);
      log(`The wounded ${animal.name} charged!`);
    }
    sys.meat[animal.id] += animal.meat;
    sys.pelts[animal.id] += animal.pelt;
    if (animal.value > sys.bestValue) {
      sys.bestValue = animal.value;
      sys.bestAnimal = animal.id;
    }
    if (heart) {
      const trophy = HUNTING_TROPHIES.find((t) => t.animal === animal.id);
      if (trophy && rng() < 0.5) {
        sys.trophies.push(trophy.id);
        log(`Trophy taken: ${trophy.name}.`);
      }
    }
    gainXp(10 + animal.difficulty * 2);
    if (sys.upgrades.includes('dog') && wounded) log('Your dog tracks the wounded animal.');
    checkContract(animal.id);
    log(`Downed a ${animal.name} (${animal.meat} meat, ${animal.pelt} pelts).`);
    return yep({ hit: true, heart, wounded, animal: animal.id, meat: animal.meat, pelts: animal.pelt });
  };

  sys.endHunt = function endHunt() {
    if (!sys.habitat) return nope('no-hunt');
    const done = sys.habitat;
    sys.habitat = null;
    stalking = false;
    sys.stalkProgress = 0;
    sys.stalkTarget = null;
    return yep({ habitat: done });
  };

  sys.sellMeat = function sellMeat(buyerId, animalId, qty) {
    const buyer = HUNTING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return nope('unknown-buyer');
    if (sys.rank < buyer.minRank) return nope('rank-too-low');
    const animal = HUNTING_ANIMALS.find((a) => a.id === animalId);
    if (!animal) return nope('unknown-animal');
    if ((sys.meat[animalId] || 0) < qty) return nope('not-enough');
    const unitPrice = Math.max(1, Math.floor(huntingBuyerPrice(animal, buyerId, sys.rank, sys.upgrades, sys.seasonMult) / animal.meat));
    const total = unitPrice * qty;
    sys.meat[animalId] -= qty;
    sys.earned += total;
    sys.dailyEarned += total;
    addCash(total);
    gainXp(qty);
    return yep({ total, unitPrice, quantity: qty });
  };

  sys.sellPelts = function sellPelts(buyerId, animalId, qty) {
    const buyer = HUNTING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return nope('unknown-buyer');
    if (sys.rank < buyer.minRank) return nope('rank-too-low');
    const animal = HUNTING_ANIMALS.find((a) => a.id === animalId);
    if (!animal) return nope('unknown-animal');
    if ((sys.pelts[animalId] || 0) < qty) return nope('not-enough');
    const unitPrice = Math.max(2, Math.floor(huntingBuyerPrice(animal, buyerId, sys.rank, sys.upgrades, sys.seasonMult) * 0.4));
    const total = unitPrice * qty;
    sys.pelts[animalId] -= qty;
    sys.earned += total;
    sys.dailyEarned += total;
    addCash(total);
    gainXp(qty * 2);
    return yep({ total, unitPrice, quantity: qty });
  };

  sys.sellAll = function sellAll(buyerId) {
    const buyer = HUNTING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return nope('unknown-buyer');
    if (sys.rank < buyer.minRank) return nope('rank-too-low');
    const lines = [];
    let total = 0;
    let count = 0;
    for (const animal of HUNTING_ANIMALS) {
      const meatQty = sys.meat[animal.id] || 0;
      if (meatQty > 0) {
        const unitPrice = Math.max(1, Math.floor(huntingBuyerPrice(animal, buyerId, sys.rank, sys.upgrades, sys.seasonMult) / animal.meat));
        const lineTotal = unitPrice * meatQty;
        lines.push({ kind: 'meat', id: animal.id, quantity: meatQty, total: lineTotal });
        total += lineTotal;
        count += meatQty;
        sys.meat[animal.id] = 0;
      }
      const peltQty = sys.pelts[animal.id] || 0;
      if (peltQty > 0) {
        const unitPrice = Math.max(2, Math.floor(huntingBuyerPrice(animal, buyerId, sys.rank, sys.upgrades, sys.seasonMult) * 0.4));
        const lineTotal = unitPrice * peltQty;
        lines.push({ kind: 'pelt', id: animal.id, quantity: peltQty, total: lineTotal });
        total += lineTotal;
        count += peltQty;
        sys.pelts[animal.id] = 0;
      }
    }
    if (!lines.length) return nope('nothing-to-sell');
    sys.earned += total;
    sys.dailyEarned += total;
    addCash(total);
    gainXp(count);
    return yep({ total, count, lines });
  };

  sys.sellTrophy = function sellTrophy(trophyId) {
    const idx = sys.trophies.indexOf(trophyId);
    if (idx < 0) return nope('not-held');
    const trophy = HUNTING_TROPHIES.find((t) => t.id === trophyId);
    if (!trophy) return nope('unknown-trophy');
    sys.trophies.splice(idx, 1);
    sys.trophiesSold += 1;
    const value = trophy.value + 30 * sys.rank;
    sys.earned += value;
    sys.dailyEarned += value;
    addCash(value);
    gainXp(25);
    return yep({ value });
  };

  sys.buyUpgrade = function buyUpgrade(upgradeId) {
    const upgrade = HUNTING_UPGRADES.find((u) => u.id === upgradeId);
    if (!upgrade) return nope('unknown-upgrade');
    if (sys.upgrades.includes(upgradeId)) return nope('already-owned');
    if (getCash() < upgrade.cost) return nope('not-enough-cash');
    addCash(-upgrade.cost);
    sys.spent += upgrade.cost;
    sys.upgrades.push(upgradeId);
    if (upgradeId === 'license') sys.licenses += 1;
    gainXp(20);
    return yep({ id: upgradeId });
  };

  sys.takeContract = function takeContract(contractId) {
    const contract = HUNTING_CONTRACTS.find((c) => c.id === contractId);
    if (!contract) return nope('unknown-contract');
    if (sys.activeContract) return nope('contract-active');
    if (sys.rank < contract.rep) return nope('rank-too-low');
    const day = getDay();
    sys.activeContract = { ...contract, dayTaken: day, deadline: day + contract.days };
    sys.contractProgress = 0;
    return yep({ contract: sys.activeContract });
  };

  sys.deliverContract = function deliverContract() {
    if (!sys.activeContract) return nope('no-contract');
    if (sys.contractProgress < sys.activeContract.qty) return nope('not-ready');
    const pay = sys.activeContract.pay + 50 * sys.rank;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    sys.contractsDone += 1;
    sys.activeContract = null;
    sys.contractProgress = 0;
    gainXp(60);
    return yep({ pay });
  };

  sys.abandonContract = function abandonContract() {
    if (!sys.activeContract) return nope('no-contract');
    sys.activeContract = null;
    sys.contractProgress = 0;
    sys.contractsFailed += 1;
    return yep({});
  };

  sys.payFine = function payFine() {
    if (sys.fines <= 0) return nope('no-fines');
    if (getCash() < sys.fines) return nope('not-enough-cash');
    const amount = sys.fines;
    addCash(-amount);
    sys.spent += amount;
    sys.finesPaid += amount;
    sys.fines = 0;
    sys.wardenWarnings = 0;
    return yep({ amount });
  };

  sys.wardenCheck = function wardenCheck() {
    const hour = getHour();
    const hasLicence = sys.upgrades.includes('license');
    if (sys.habitat && !hasLicence && rng() < 0.25) {
      const fine = 150 + 100 * sys.wardenWarnings;
      sys.fines += fine;
      sys.wardenWarnings += 1;
      addHeat(3);
      log(`The warden caught you hunting without a licence: $${fine} fine.`);
      return yep({ caught: true, fine });
    }
    if (sys.habitat && (hour >= 22 || hour <= 3)) {
      sys.fines += 100;
      addHeat(2);
      log('The warden caught you hunting at night: $100 fine.');
      return yep({ caught: true, fine: 100 });
    }
    return yep({ caught: false });
  };

  sys.priceBoard = function priceBoard() {
    return HUNTING_ANIMALS.map((a) => ({
      id: a.id,
      name: a.name,
      price: huntingPriceFor(a, sys.rank, sys.upgrades, sys.seasonMult),
      inSeason: huntingInSeason(a, sys.month),
      meat: sys.meat[a.id] || 0,
      pelts: sys.pelts[a.id] || 0,
    }));
  };

  sys.habitatReport = function habitatReport() {
    return HUNTING_HABITATS.map((h) => ({
      id: h.id,
      name: h.name,
      district: h.district,
      mult: h.mult,
      danger: h.danger,
      animals: HUNTING_ANIMALS.filter((a) => a.habitat === h.id).map((a) => a.id),
    }));
  };

  sys.dailyEvent = function dailyEvent() {
    const roll = rng();
    if (roll < 0.2) {
      const ev = HUNTING_EVENTS[Math.floor(rng() * HUNTING_EVENTS.length)];
      sys.currentEvent = ev.id;
      log(`Today's event: ${ev.name}.`);
      return yep({ event: ev.id, name: ev.name });
    }
    if (roll < 0.3) {
      const animal = HUNTING_ANIMALS[Math.floor(rng() * HUNTING_ANIMALS.length)];
      sys.meat[animal.id] += 2;
      sys.currentEvent = null;
      return yep({ event: 'gift', animal: animal.id, name: 'Gift' });
    }
    sys.currentEvent = null;
    return yep({ event: 'none', name: 'None' });
  };

  sys.tick = function tick(dt) {
    const step = dt || 0;
    if (stalking) {
      sys.stalkProgress += step * 0.02;
    } else if (sys.habitat && rng() < step * 0.01) {
      log('A twig snaps somewhere behind you.');
    }
  };

  sys.tickDay = function tickDay(day) {
    if (day === sys.lastDay) return;
    sys.lastDay = day;
    sys.month = ((9 - 1 + Math.floor((day - 1) / 30)) % 12) + 1;
    sys.seasonMult = currentSeason().mult;
    sys.dailyKills = 0;
    sys.dailyEarned = 0;
    if (sys.activeContract && day > sys.activeContract.deadline && sys.contractProgress < sys.activeContract.qty) {
      sys.contractsFailed += 1;
      log(`Contract failed: ${sys.activeContract.name}.`);
      sys.activeContract = null;
      sys.contractProgress = 0;
    }
    if (!sys.upgrades.includes('freezer')) {
      for (const animal of HUNTING_ANIMALS) {
        const spoil = Math.floor((sys.meat[animal.id] || 0) * 0.2);
        sys.meat[animal.id] -= spoil;
      }
      if (day % 3 === 0) log('Some of your meat spoiled overnight.');
    }
    sys.dailyEvent();
  };

  sys.serialize = function serialize() {
    const out = {};
    for (const key of HUNTING_STATE_KEYS) {
      if (key === 'stalk') {
        out[key] = stalking;
        continue;
      }
      out[key] = JSON.parse(JSON.stringify(sys[key]));
    }
    return out;
  };

  sys.deserialize = function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    for (const key of HUNTING_STATE_KEYS) {
      if (key === 'stalk') {
        if (key in saved) stalking = !!saved[key];
        continue;
      }
      if (key in saved) sys[key] = JSON.parse(JSON.stringify(saved[key]));
    }
    for (const a of HUNTING_ANIMALS) {
      if (sys.meat[a.id] === undefined) sys.meat[a.id] = 0;
      if (sys.pelts[a.id] === undefined) sys.pelts[a.id] = 0;
      if (sys.dayDrift[a.id] === undefined) sys.dayDrift[a.id] = 0;
    }
    const next = huntingRankFor(sys.xp);
    if (next > sys.rank) sys.rank = next;
  };

  sys.stats = function stats() {
    const accuracy = sys.shotsFired ? Math.round((sys.kills / sys.shotsFired) * 100) : 0;
    const meatTotal = HUNTING_ANIMALS.reduce((sum, a) => sum + (sys.meat[a.id] || 0), 0);
    return {
      rank: HUNTING_RANKS[sys.rank].name,
      xp: sys.xp,
      hunts: sys.hunts,
      kills: sys.kills,
      cleanKills: sys.cleanKills,
      misses: sys.misses,
      wounded: sys.wounded,
      spooked: sys.spooked,
      charged: sys.charged,
      accuracy,
      heartShots: sys.heartShots,
      earned: Math.round(sys.earned),
      spent: sys.spent,
      fines: sys.fines,
      trophies: sys.trophies.length,
      trophiesSold: sys.trophiesSold,
      upgrades: sys.upgrades.length,
      habitat: sys.habitat,
      stalking: stalking,
      season: currentSeason().name,
      month: sys.month,
      activeContract: sys.activeContract ? sys.activeContract.id : null,
      contractsDone: sys.contractsDone,
      contractsFailed: sys.contractsFailed,
      bestAnimal: sys.bestAnimal,
      dailyKills: sys.dailyKills,
      dailyEarned: Math.round(sys.dailyEarned),
      event: sys.currentEvent,
      meat: meatTotal,
    };
  };

  sys.hudLine = function hudLine() {
    if (stalking && sys.stalkTarget) {
      const animal = HUNTING_ANIMALS.find((a) => a.id === sys.stalkTarget);
      return `Hunting ${sys.habitat} — stalking ${animal.name} ${Math.floor(sys.stalkProgress)}/${animal.trackTime}, close`;
    }
    if (sys.habitat) {
      const habitat = HUNTING_HABITATS.find((h) => h.id === sys.habitat);
      return `Hunting ${habitat.name} — find sign to stalk`;
    }
    if (sys.activeContract) {
      return `Contract ${sys.activeContract.name} ${sys.contractProgress}/${sys.activeContract.qty}`;
    }
    const meatTotal = HUNTING_ANIMALS.reduce((sum, a) => sum + (sys.meat[a.id] || 0), 0);
    if (meatTotal > 0) return `${meatTotal} meat to sell`;
    if (sys.fines > 0) return `$${sys.fines} in fines unpaid`;
    return '';
  };

  sys.interact = function interact() {
    const pos = getPlayerPos();
    const dx = (pos.x || 0) - 200;
    const dz = (pos.z || 0) - 300;
    if (Math.hypot(dx, dz) > 40) return false;
    if (!sys.habitat) {
      sys.startHunt('pine');
      return true;
    }
    if (!stalking) {
      sys.stalk();
      return true;
    }
    sys.creep();
    return true;
  };

  return sys;
}

export function createHuntingExtras(system) {
  const sys = system;
  let hired = [];
  let claimed = [];
  let wagesPaid = 0;

  function nope(reason) {
    return { ok: false, reason };
  }

  function yep(extra) {
    return { ok: true, ...extra };
  }

  const extras = {
    hireHelper(id) {
      const helper = HUNTING_HELPERS.find((h) => h.id === id);
      if (!helper) return nope('unknown-helper');
      if (hired.includes(id)) return nope('already-hired');
      hired.push(id);
      return yep({ id, name: helper.name, wage: helper.wage });
    },
    fireHelper(id) {
      if (!hired.includes(id)) return nope('not-hired');
      hired = hired.filter((h) => h !== id);
      return yep({ id });
    },
    payWages() {
      let due = 0;
      for (const id of hired) {
        const helper = HUNTING_HELPERS.find((h) => h.id === id);
        if (helper) due += helper.wage;
      }
      wagesPaid += due;
      return yep({ due, helpers: [...hired], wagesPaid });
    },
    helperBonus(skill) {
      let sum = 0;
      for (const id of hired) {
        const helper = HUNTING_HELPERS.find((h) => h.id === id);
        if (helper && helper.skill === skill) sum += helper.bonus;
      }
      return sum;
    },
    challenges() {
      return HUNTING_CHALLENGES.map((c) => huntingChallengeProgress(c, sys));
    },
    claimChallenge(id) {
      const challenge = HUNTING_CHALLENGES.find((c) => c.id === id);
      if (!challenge) return nope('unknown-challenge');
      if (claimed.includes(id)) return nope('already-claimed');
      const progress = huntingChallengeProgress(challenge, sys);
      if (!progress.done) return nope('not-done');
      claimed.push(id);
      return yep({ id, xp: challenge.xp });
    },
    achievements() {
      return HUNTING_ACHIEVEMENTS.map((a) => ({
        id: a.id,
        name: a.name,
        desc: a.desc,
        done: !!a.check(sys),
      }));
    },
    butcherAll() {
      let total = 0;
      for (const a of HUNTING_ANIMALS) total += sys.meat[a.id] || 0;
      return yep({ total, note: 'The butcher weighs the lot and nods at the haul.' });
    },
    tanAll() {
      let total = 0;
      for (const a of HUNTING_ANIMALS) total += sys.pelts[a.id] || 0;
      return yep({ total, note: 'The tannery salts the lot and hangs it to cure.' });
    },
    inventoryValue() {
      let meatTotal = 0;
      let peltTotal = 0;
      for (const a of HUNTING_ANIMALS) {
        meatTotal += sys.meat[a.id] || 0;
        peltTotal += sys.pelts[a.id] || 0;
      }
      return yep({ value: Math.round(meatTotal * 3 + peltTotal * 8) });
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
