export const KAYAK_RIVERS = [
  { id: 'gentle-creek', name: 'Gentle Creek', fee: 15, difficulty: 1, steps: 5, duration: 110, risk: 0.1, rapids: 1, length: 3, desc: 'A slow creek through meadows.' },
  { id: 'willow-run', name: 'Willow Run', fee: 20, difficulty: 1, steps: 6, duration: 120, risk: 0.1, rapids: 1, length: 4, desc: 'Willows dip over the water.' },
  { id: 'otter-stream', name: 'Otter Stream', fee: 30, difficulty: 2, steps: 7, duration: 140, risk: 0.2, rapids: 2, length: 6, desc: 'Otters play along the banks.' },
  { id: 'pine-river', name: 'Pine River', fee: 35, difficulty: 2, steps: 8, duration: 150, risk: 0.2, rapids: 2, length: 8, desc: 'Pines line both banks.' },
  { id: 'salmon-run', name: 'Salmon Run', fee: 45, difficulty: 3, steps: 9, duration: 180, risk: 0.3, rapids: 3, length: 10, desc: 'Salmon leap up the rapids.' },
  { id: 'rocky-rapid', name: 'Rocky Rapid', fee: 50, difficulty: 3, steps: 9, duration: 190, risk: 0.4, rapids: 3, length: 11, desc: 'Rocks split the river into chutes.' },
  { id: 'misty-river', name: 'Misty River', fee: 55, difficulty: 3, steps: 10, duration: 200, risk: 0.3, rapids: 3, length: 13, desc: 'Mist hangs over the morning water.' },
  { id: 'gorge-pass', name: 'Gorge Pass', fee: 65, difficulty: 4, steps: 10, duration: 220, risk: 0.5, rapids: 4, length: 15, desc: 'A narrow gorge with fast water.' },
  { id: 'whitewater-falls', name: 'Whitewater Falls', fee: 75, difficulty: 4, steps: 11, duration: 240, risk: 0.5, rapids: 5, length: 18, desc: 'Falls and foam below the drop.' },
  { id: 'grand-canyon-river', name: 'Grand Canyon River', fee: 90, difficulty: 5, steps: 12, duration: 280, risk: 0.6, rapids: 5, length: 22, desc: 'The great canyon river run.' },
];

export const KAYAK_CATCHES = [
  { id: 'minnow', name: 'Minnow', value: 4, rarity: 0.55, weight: 0.1, desc: 'A tiny minnow from the shallows.' },
  { id: 'perch', name: 'Perch', value: 8, rarity: 0.45, weight: 0.3, desc: 'A striped perch from the reeds.' },
  { id: 'crayfish', name: 'Crayfish', value: 12, rarity: 0.38, weight: 0.2, desc: 'A crayfish under a river stone.' },
  { id: 'trout', name: 'Trout', value: 18, rarity: 0.3, weight: 0.5, desc: 'A speckled trout from cold water.' },
  { id: 'bass', name: 'Bass', value: 26, rarity: 0.22, weight: 0.8, desc: 'A fighting bass from the deep pool.' },
  { id: 'eel', name: 'River Eel', value: 40, rarity: 0.15, weight: 0.6, desc: 'A slippery eel from the mud.' },
  { id: 'catfish', name: 'Catfish', value: 55, rarity: 0.1, weight: 1.5, desc: 'A whiskered catfish from the bottom.' },
  { id: 'salmon', name: 'Salmon', value: 85, rarity: 0.07, weight: 1.2, desc: 'A leaping salmon on its run.' },
  { id: 'golden-trout', name: 'Golden Trout', value: 150, rarity: 0.04, weight: 0.6, desc: 'A rare golden trout.' },
  { id: 'river-pearl', name: 'River Pearl', value: 320, rarity: 0.02, weight: 0.1, desc: 'A pearl from an old river mussel.' },
];

export const KAYAK_UPGRADES = [
  { id: 'expedition-kayak', name: 'Expedition Kayak', cost: 400, desc: 'A long kayak that holds more stamina.', effect: 'stamina max +40' },
  { id: 'find-plus', name: 'Catch Spotter', cost: 250, desc: 'Spots rare catches more often.', effect: 'rare catch boost 1.25' },
  { id: 'price-plus', name: 'Market License', cost: 300, desc: 'Sells catches for more cash.', effect: 'sell price +20%' },
  { id: 'carry-plus', name: 'Deck Net', cost: 200, desc: 'Carry more catches per run.', effect: 'carry cap +10' },
  { id: 'paddle-carbon', name: 'Carbon Paddle', cost: 320, desc: 'A light paddle that saves stamina.', effect: 'stamina use down' },
  { id: 'spray-skirt', name: 'Spray Skirt', cost: 180, desc: 'Keeps the cockpit dry in rapids.', effect: 'hazard down' },
  { id: 'helmet-pro', name: 'Pro Helmet', cost: 210, desc: 'Protection for rocky rapids.', effect: 'hazard down' },
  { id: 'dry-bag', name: 'Dry Bag', cost: 150, desc: 'Keeps catches fresh and dry.', effect: 'catch value up' },
];

export const KAYAK_RANKS = [
  { level: 0, name: 'Paddler', xp: 0, perk: 'Creek runs unlocked' },
  { level: 1, name: 'River Runner', xp: 120, perk: 'Salmon runs open up' },
  { level: 2, name: 'Rapid Rider', xp: 300, perk: 'Gorge runs pay better' },
  { level: 3, name: 'Expedition Leader', xp: 620, perk: 'Rare catches appear more often' },
  { level: 4, name: 'Whitewater Legend', xp: 1100, perk: 'The canyon run holds no fear' },
];

export const KAYAK_EVENTS = [
  { id: 'calm-water', name: 'Calm Water', desc: 'The river runs smooth and slow.' },
  { id: 'fishing-fest', name: 'Fishing Fest', desc: 'Anglers line the riverbanks.' },
  { id: 'rain-swollen', name: 'Rain Swollen', desc: 'Rain swells the river fast.' },
  { id: 'otter-day', name: 'Otter Day', desc: 'Otters follow the kayaks.' },
  { id: 'low-water', name: 'Low Water', desc: 'Rocks show where the river runs low.' },
  { id: 'salmon-leap', name: 'Salmon Leap', desc: 'Salmon leap the rapids in numbers.' },
  { id: 'mist-morning', name: 'Mist Morning', desc: 'Mist curls over the water.' },
  { id: 'sunny-paddle', name: 'Sunny Paddle', desc: 'Warm sun on the river.' },
  { id: 'new-launch', name: 'New Launch', desc: 'A new launch ramp opens.' },
  { id: 'kingfisher', name: 'Kingfisher', desc: 'A kingfisher flashes past.' },
];

export const KAYAK_CONTRACTS = [
  { id: 'trout-order', name: 'Trout Order', material: 'trout', qty: 5, pay: 200, days: 3, rep: 15, desc: 'A restaurant wants five trout.' },
  { id: 'bass-order', name: 'Bass Order', material: 'bass', qty: 4, pay: 240, days: 3, rep: 15, desc: 'A grill wants four bass.' },
  { id: 'salmon-order', name: 'Salmon Order', material: 'salmon', qty: 2, pay: 420, days: 4, rep: 25, desc: 'A smokehouse wants two salmon.' },
  { id: 'pearl-order', name: 'Pearl Order', material: 'river-pearl', qty: 1, pay: 650, days: 5, rep: 35, desc: 'A jeweller wants one river pearl.' },
  { id: 'perch-order', name: 'Perch Order', material: 'perch', qty: 8, pay: 150, days: 2, rep: 10, desc: 'A school wants eight perch.' },
  { id: 'catfish-order', name: 'Catfish Order', material: 'catfish', qty: 3, pay: 320, days: 4, rep: 20, desc: 'A diner wants three catfish.' },
];

export const KAYAK_CHALLENGES = [
  { id: 'first-paddle', name: 'First Paddle', target: 'sessions', goal: 1, xp: 20, desc: 'Finish one kayak run.' },
  { id: 'five-paddles', name: 'Five Paddles', target: 'sessions', goal: 5, xp: 60, desc: 'Finish five kayak runs.' },
  { id: 'catch-ten', name: 'Catch Ten', target: 'findsFound', goal: 10, xp: 40, desc: 'Catch ten river finds.' },
  { id: 'catch-fifty', name: 'Catch Fifty', target: 'findsFound', goal: 50, xp: 120, desc: 'Catch fifty river finds.' },
  { id: 'earn-five-hundred', name: 'Earn Five Hundred', target: 'earned', goal: 500, xp: 100, desc: 'Earn 500 cash in total.' },
  { id: 'sell-twenty', name: 'Sell Twenty', target: 'findsSold', goal: 20, xp: 80, desc: 'Sell twenty catches.' },
  { id: 'contract-three', name: 'Contract Three', target: 'contractsDone', goal: 3, xp: 90, desc: 'Deliver three contracts.' },
  { id: 'steps-hundred', name: 'Hundred Steps', target: 'stepsDone', goal: 100, xp: 110, desc: 'Take a hundred paddle strokes.' },
];

export const KAYAK_ACHIEVEMENTS = [
  { id: 'wet-paddle', name: 'Wet Paddle', check: (s) => s.sessions >= 1, desc: 'Finish your first run.' },
  { id: 'river-regular', name: 'River Regular', check: (s) => s.sessions >= 10, desc: 'Finish ten runs.' },
  { id: 'angler', name: 'Angler', check: (s) => s.findsFound >= 25, desc: 'Catch twenty-five finds.' },
  { id: 'river-master', name: 'River Master', check: (s) => s.findsFound >= 100, desc: 'Catch a hundred finds.' },
  { id: 'rich-paddler', name: 'Rich Paddler', check: (s) => s.earned >= 1000, desc: 'Earn a thousand cash.' },
  { id: 'deal-maker', name: 'Deal Maker', check: (s) => s.contractsDone >= 5, desc: 'Deliver five contracts.' },
  { id: 'streak-five', name: 'Streak Five', check: (s) => s.bestStreak >= 5, desc: 'Reach a streak of five.' },
  { id: 'canyon-master', name: 'Canyon Master', check: (s) => s.rank >= 4, desc: 'Reach the top rank.' },
];

export const KAYAK_TIPS = [
  { id: 'tip-stamina', name: 'Watch Stamina', text: 'Rest before your stamina runs out.' },
  { id: 'tip-rare', name: 'Rare Catches', text: 'Long rivers hide the rarest catches.' },
  { id: 'tip-rank', name: 'Rank Up', text: 'Higher rank boosts rare catches.' },
  { id: 'tip-sell', name: 'Sell Often', text: 'Sell catches before the drift turns.' },
  { id: 'tip-contract', name: 'Contracts Pay', text: 'Contracts pay more than raw sales.' },
  { id: 'tip-weather', name: 'Storm Watch', text: 'Storms and hurricanes block paddling.' },
  { id: 'tip-cap', name: 'Carry Cap', text: 'Upgrade your net to carry more.' },
  { id: 'tip-season', name: 'Season Prices', text: 'Spring prices beat winter prices.' },
];

export const KAYAK_LEADERBOARD = [
  { name: 'Riva', value: 870, desc: 'Top paddler of the season.' },
  { name: 'Brook', value: 680, desc: 'Rapid rider of the gorge.' },
  { name: 'Sal', value: 510, desc: 'Salmon queen of the river.' },
  { name: 'Ned', value: 300, desc: 'Steady paddler, steady hands.' },
  { name: 'You', value: 0, desc: 'Your score on the board.' },
];

export const KAYAK_RECORDS = [
  { id: 'most-runs', name: 'Most Runs', stat: 'sessions', unit: 'runs', desc: 'Most run sessions finished.' },
  { id: 'most-catches', name: 'Most Catches', stat: 'findsFound', unit: 'catches', desc: 'Most catches made.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'cash', desc: 'Most cash earned.' },
  { id: 'best-yield', name: 'Best Yield', stat: 'bestSessionYield', unit: 'cash', desc: 'Best single run yield.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'streak', desc: 'Longest good streak.' },
];

export const KAYAK_MARKET = [
  { id: 'fish-stall', name: 'Fish Stall', finds: ['minnow', 'perch', 'trout'], mult: 1.1, desc: 'Buys common river fish.' },
  { id: 'smokehouse', name: 'Smokehouse', finds: ['salmon', 'trout'], mult: 1.25, desc: 'Pays well for salmon.' },
  { id: 'restaurant', name: 'Riverside Restaurant', finds: ['bass', 'catfish'], mult: 1.4, desc: 'Top price for bass and catfish.' },
  { id: 'pearl-jeweller', name: 'Pearl Jeweller', finds: ['river-pearl'], mult: 1.6, desc: 'Best buyer for river pearls.' },
  { id: 'tackle-shop', name: 'Tackle Shop', finds: ['crayfish', 'eel'], mult: 1.3, desc: 'Buys crayfish and eels.' },
  { id: 'golden-buyer', name: 'Golden Buyer', finds: ['golden-trout'], mult: 1.5, desc: 'Pays a premium for golden trout.' },
  { id: 'market-stall', name: 'Market Stall', finds: ['perch', 'trout', 'bass'], mult: 1.05, desc: 'Quick sales at the market.' },
  { id: 'rare-buyer', name: 'Rare Buyer', finds: ['river-pearl', 'golden-trout', 'salmon'], mult: 1.45, desc: 'Buys only the rarest catches.' },
];

export const KAYAK_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.15, desc: 'High water, best prices.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Warm water, steady prices.' },
  { id: 'autumn', name: 'Autumn', mult: 0.95, desc: 'Cooling water, softer prices.' },
  { id: 'winter', name: 'Winter', mult: 0.8, desc: 'Cold water, lowest prices.' },
];

export const KAYAK_SEASONAL = [
  { season: 'spring', find: 'salmon', mult: 1.3 },
  { season: 'spring', find: 'trout', mult: 1.2 },
  { season: 'summer', find: 'bass', mult: 1.2 },
  { season: 'summer', find: 'perch', mult: 1.15 },
  { season: 'autumn', find: 'river-pearl', mult: 1.25 },
  { season: 'autumn', find: 'catfish', mult: 1.1 },
  { season: 'winter', find: 'golden-trout', mult: 1.4 },
  { season: 'winter', find: 'eel', mult: 1.2 },
];

export const KAYAK_QUICK_START = [
  'Paddle the Gentle Creek run.',
  'Catch finds until stamina runs low.',
  'Sell catches at the Fish Stall.',
  'Buy the Deck Net upgrade early.',
  'Take a perch order contract.',
  'Save up for the Expedition Kayak.',
];

export const KAYAK_HELPERS = [
  { id: 'paddle-buddy', name: 'Paddle Buddy', wage: 20, skill: 'paddling', bonus: 0.1, desc: 'A steady partner on the river.' },
  { id: 'fishing-guide', name: 'Fishing Guide', wage: 35, skill: 'fishing', bonus: 0.2, desc: 'Knows where the fish hide.' },
  { id: 'river-navigator', name: 'River Navigator', wage: 30, skill: 'navigation', bonus: 0.15, desc: 'Reads rapids by heart.' },
  { id: 'safety-kayaker', name: 'Safety Kayaker', wage: 40, skill: 'safety', bonus: 0.25, desc: 'Keeps every run safe.' },
];

export const KAYAK_META = { system: 'kayaking', version: '7c-B2', author: 'builder-2', dataCount: 10, findCount: 10, upgradeCount: 8, rankCount: 5 };

const RIVER_BY_ID = {};
KAYAK_RIVERS.forEach((r) => { RIVER_BY_ID[r.id] = r; });
const CATCH_BY_ID = {};
KAYAK_CATCHES.forEach((f) => { CATCH_BY_ID[f.id] = f; });
const UP_BY_ID = {};
KAYAK_UPGRADES.forEach((u) => { UP_BY_ID[u.id] = u; });

const listOf = (v) => (Array.isArray(v) ? v : (v && Array.isArray(v.upgrades) ? v.upgrades : []));
const rankOf = (v) => (typeof v === 'number' ? v : (v && typeof v.rank === 'number' ? v.rank : 0));

export function kayakRankFor(xp) {
  let lvl = 0;
  KAYAK_RANKS.forEach((r) => { if (xp >= r.xp) lvl = r.level; });
  return lvl;
}

export function kayakStaminaMax(upgrades) {
  return listOf(upgrades).includes('expedition-kayak') ? 140 : 100;
}

export function kayakPriceFor(catchId, drift, rank, upgrades) {
  const item = CATCH_BY_ID[catchId];
  if (!item) return 0;
  const d = typeof drift === 'number' ? drift : 0;
  const owned = Array.isArray(upgrades) ? upgrades : listOf(rank);
  let p = item.value * (1 + d) * (1 + rankOf(rank) * 0.1);
  if (owned.includes('price-plus')) p *= 1.2;
  return Math.round(Math.max(1, p) * 10) / 10;
}

export function kayakCarryCap(rank, upgrades) {
  const owned = Array.isArray(upgrades) ? upgrades : listOf(rank);
  return 18 + rankOf(rank) * 2 + (owned.includes('carry-plus') ? 10 : 0);
}

export function kayakScore(sessions, yld, hazards) {
  const v = sessions * 10 + Math.round(yld) - hazards * 5;
  return v < 0 ? 0 : v;
}

const GRADE_STEPS = [[400, 'S'], [250, 'A'], [140, 'B'], [60, 'C']];
export function kayakGrade(score) {
  for (const [line, g] of GRADE_STEPS) if (score >= line) return g;
  return 'D';
}

export function kayakWeeklyGoal(state) {
  const s = state || {};
  const sessions = { have: s.sessions || 0, goal: 5, done: (s.sessions || 0) >= 5 };
  const sold = { have: s.findsSold || 0, goal: 40, done: (s.findsSold || 0) >= 40 };
  const earned = { have: s.earned || 0, goal: 600, done: (s.earned || 0) >= 600 };
  return { sessions, sold, earned, allDone: sessions.done && sold.done && earned.done };
}

export function kayakEfficiency(state) {
  const s = state || {};
  if (!s.sessions) return 100;
  return Math.round((Math.max(0, s.sessions - (s.contractsFailed || 0)) / s.sessions) * 100);
}

export function kayakProfitPerRun(state) {
  const s = state || {};
  if (!s.sessions) return 0;
  return Math.round(((s.earned || 0) / s.sessions) * 10) / 10;
}

export function kayakInventoryValue(state) {
  const s = state || {};
  let total = 0;
  for (const id of Object.keys(s.inventory || {})) {
    total += (s.inventory[id] || 0) * kayakPriceFor(id, s.dayDrift || 0, s.rank || 0, s.upgrades || []);
  }
  return Math.round(total * 10) / 10;
}

export function kayakSummary(state) {
  const s = state || {};
  const rn = (KAYAK_RANKS[s.rank || 0] || {}).name || 'Paddler';
  return 'Kayaking: ' + rn + ' with ' + (s.sessions || 0) + ' runs, ' + (s.findsFound || 0) + ' catches and ' + (s.earned || 0) + ' cash earned.';
}

export function kayakNextGoal(state) {
  const s = state || {};
  if (!(s.sessions || 0)) return 'Finish your first run.';
  if ((s.sessions || 0) < 5) return 'Finish 5 runs.';
  if ((s.earned || 0) < 500) return 'Earn 500 cash in total.';
  if ((s.rank || 0) < 4) return 'Reach rank ' + KAYAK_RANKS[(s.rank || 0) + 1].name + '.';
  return 'Become a legend of Kayaking.';
}

export function kayakRecordFor(id, state) {
  const rec = KAYAK_RECORDS.find((r) => r.id === id);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, stat: rec.stat, unit: rec.unit, desc: rec.desc, value: (state && state[rec.stat]) || 0 };
}

export function kayakAllRecords(state) {
  return KAYAK_RECORDS.map((r) => kayakRecordFor(r.id, state));
}

export function kayakLeaderboardWith(playerScore) {
  const board = KAYAK_LEADERBOARD.map((e) => ({ name: e.name, value: e.name === 'You' ? playerScore : e.value, desc: e.desc }));
  board.sort((a, b) => b.value - a.value);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, value: e.value, desc: e.desc }));
}

export function kayakEventFor(day) {
  return KAYAK_MARKET[((day || 0) % KAYAK_MARKET.length + KAYAK_MARKET.length) % KAYAK_MARKET.length];
}

export function kayakEventMult(eventId, catchId) {
  const ev = KAYAK_MARKET.find((m) => m.id === eventId);
  return ev && ev.finds.includes(catchId) ? ev.mult : 1;
}

export function kayakSeasonMult(seasonId) {
  const s = KAYAK_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function kayakSeasonalPriceMult(seasonId, catchId) {
  const row = KAYAK_SEASONAL.find((x) => x.season === seasonId && x.find === catchId);
  return row ? row.mult : 1;
}

export function kayakBestBuyer() {
  let best = KAYAK_MARKET[0];
  KAYAK_MARKET.forEach((m) => { if (m.mult > best.mult) best = m; });
  return best;
}

export function kayakBestSeason() {
  let best = KAYAK_SEASONS[0];
  KAYAK_SEASONS.forEach((s) => { if (s.mult > best.mult) best = s; });
  return best;
}

export function kayakTipFor(day) {
  return KAYAK_TIPS[((day || 0) % KAYAK_TIPS.length + KAYAK_TIPS.length) % KAYAK_TIPS.length];
}

export function kayakQuickStart() {
  return KAYAK_QUICK_START.slice();
}

export function kayakChallengeProgress(challenge, state) {
  const have = (state && state[challenge.target]) || 0;
  return { id: challenge.id, name: challenge.name, have, goal: challenge.goal, done: have >= challenge.goal, xp: challenge.xp };
}

export function kayakProgressPercent(state) {
  const s = state || {};
  if (!s.sessions) return 0;
  return Math.round((Math.max(0, s.sessions - (s.contractsFailed || 0)) / s.sessions) * 100);
}

export function kayakTotalValue(state) {
  const s = state || {};
  return Math.round((kayakInventoryValue(s) + (s.earned || 0)) * 10) / 10;
}

export function kayakHelperBonus(helperIds, skill) {
  let sum = 0;
  (helperIds || []).forEach((id) => {
    const h = KAYAK_HELPERS.find((x) => x.id === id);
    if (h && h.skill === skill) sum += h.bonus;
  });
  return sum;
}

export function kayakCatchesByRarity(maxRarity) {
  return KAYAK_CATCHES.filter((f) => f.rarity <= maxRarity).map((f) => f.id);
}

export function kayakRiverByLength(length) {
  let pick = KAYAK_RIVERS[KAYAK_RIVERS.length - 1];
  for (const r of KAYAK_RIVERS) {
    if (r.length >= length) { pick = r; break; }
  }
  return pick;
}

function kayakBlank() {
  const base = {
    xp: 0, rank: 0, sessions: 0, actions: 0, stepsDone: 0, earned: 0, spent: 0,
    findsFound: 0, findsSold: 0, contractsDone: 0, contractsFailed: 0, hazardsTaken: 0,
    heatGained: 0, inventory: {}, upgrades: [], activeContract: null, contractProgress: 0,
    contractDeadline: null, session: null, sessionStepsLeft: 0, sessionTimeLeft: 0,
    resource: 0, dayDrift: 0, lastDay: 1, bestSession: null, bestSessionYield: 0,
    dailyEarned: 0, dailySessions: 0, totalYield: 0, bestStreak: 0, streak: 0,
    specialsUsed: 0, weatherStops: 0, sessionYield: 0, sessionFinds: [], season: 'spring',
    event: null, wagesPaid: 0, challengesClaimed: [],
  };
  return base;
}

export function createKayakingSystem(ctx) {
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
  const state = kayakBlank();

  const levelUp = () => {
    const lvl = kayakRankFor(state.xp);
    if (lvl > state.rank) log('Rank up: ' + KAYAK_RANKS[lvl].name);
    state.rank = lvl;
  };

  const endRun = () => {
    const yld = state.sessionYield;
    const rid = state.session;
    state.totalYield += yld;
    if (yld > state.bestSessionYield) { state.bestSessionYield = yld; state.bestSession = rid; }
    if (yld > 0) {
      state.streak += 1;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    } else state.streak = 0;
    state.session = null;
    state.sessionStepsLeft = 0;
    state.sessionTimeLeft = 0;
  };

  const dayEvent = () => {
    const roll = rng();
    if (roll < 0.16) {
      state.dayDrift = Math.round((state.dayDrift + 0.3) * 100) / 100;
      state.event = 'demand-spike';
      return { ok: true, event: 'demand-spike', name: 'Demand Spike', kind: 'demand' };
    }
    if (roll < 0.28) {
      state.dayDrift = Math.round((state.dayDrift - 0.15) * 100) / 100;
      state.event = 'price-dip';
      return { ok: true, event: 'price-dip', name: 'Price Dip', kind: 'dip' };
    }
    if (roll < 0.38) {
      const pick = KAYAK_CATCHES[Math.floor(rng() * KAYAK_CATCHES.length)];
      state.inventory[pick.id] = (state.inventory[pick.id] || 0) + 3;
      state.findsFound += 3;
      state.event = 'gift';
      return { ok: true, event: 'gift', name: 'Gift', kind: 'gift', find: pick.id, qty: 3 };
    }
    if (roll < 0.46) {
      const ev = KAYAK_EVENTS[Math.floor(rng() * KAYAK_EVENTS.length)];
      state.event = ev.id;
      return { ok: true, event: ev.id, name: ev.name, kind: 'named' };
    }
    state.event = null;
    return { ok: true, event: null, name: 'none', kind: 'none' };
  };

  const sys = {
    name: 'Kayaking',
    state,
    paddle(riverId) {
      const river = RIVER_BY_ID[riverId] || null;
      if (!river) return { ok: false, reason: 'no-such-site' };
      if (state.session) return { ok: false, reason: 'already-in-session' };
      const cond = (getWeather() || {}).condition || 'clear';
      if (cond === 'storm' || cond === 'hurricane') {
        state.weatherStops += 1;
        return { ok: false, reason: 'bad-weather', condition: cond };
      }
      const hour = getHour();
      if (hour < 6 || hour >= 20) return { ok: false, reason: 'closed', hour };
      if (getCash() < river.fee) return { ok: false, reason: 'not-enough-cash', cost: river.fee };
      addCash(-river.fee);
      state.spent += river.fee;
      state.session = river.id;
      state.sessionStepsLeft = river.steps;
      state.sessionTimeLeft = river.duration;
      state.resource = kayakStaminaMax(state.upgrades);
      state.sessionYield = 0;
      state.sessionFinds = [];
      state.sessions += 1;
      state.dailySessions += 1;
      log('Paddling ' + river.name);
      return { ok: true, id: river.id, name: river.name, fee: river.fee, steps: river.steps, duration: river.duration };
    },
    paddleStroke() {
      if (!state.session) return { ok: false, reason: 'no-session' };
      const river = RIVER_BY_ID[state.session] || null;
      state.resource -= 9;
      state.sessionStepsLeft -= 1;
      state.stepsDone += 1;
      state.actions += 1;
      let held = 0;
      Object.keys(state.inventory).forEach((k) => { held += state.inventory[k]; });
      const cap = kayakCarryCap(state.rank, state.upgrades);
      let qty = 1 + Math.floor(rng() * 3);
      if (held + qty > cap) qty = cap - held;
      let caught = null;
      let bonus = false;
      let hazard = false;
      if (qty > 0) {
        let totalW = 0;
        const ws = KAYAK_CATCHES.map((f) => {
          let w = 1 / f.rarity;
          if (f.rarity < 0.08 && state.rank >= 3) w *= 1.6;
          if (f.rarity < 0.08 && state.upgrades.includes('find-plus')) w *= 1.25;
          totalW += w;
          return w;
        });
        let roll = rng() * totalW;
        let idx = 0;
        for (let i = 0; i < ws.length; i++) {
          roll -= ws[i];
          if (roll <= 0) { idx = i; break; }
          idx = i;
        }
        caught = KAYAK_CATCHES[idx];
        if (rng() < 0.04) { qty += 1; bonus = true; }
        state.inventory[caught.id] = (state.inventory[caught.id] || 0) + qty;
        state.findsFound += qty;
        state.sessionFinds.push(caught.id);
        state.sessionYield += qty * caught.value;
      }
      if (river && rng() < river.risk * 0.04) {
        hazard = true;
        state.hazardsTaken += 1;
        if (rng() < 0.3) addCash(-20);
      }
      let ended = false;
      if (state.resource <= 0 || state.sessionStepsLeft <= 0) {
        state.resource = Math.max(0, state.resource);
        endRun();
        ended = true;
      }
      return { ok: true, find: caught ? { id: caught.id, name: caught.name, qty } : null, qty, bonus, hazard, stepsLeft: state.sessionStepsLeft, resource: state.resource, ended };
    },
    portageOut() {
      if (!state.session) return { ok: false, reason: 'no-session' };
      const id = state.session;
      endRun();
      log('Portaged out from ' + id);
      return { ok: true, id, yield: state.totalYield };
    },
    scoutRapid() {
      const river = state.session ? (RIVER_BY_ID[state.session] || null) : null;
      return { ok: true, site: river ? river.id : null, siteName: river ? river.name : null, weather: (getWeather() || {}).condition || 'clear', hour: getHour(), resource: state.resource, resourceMax: kayakStaminaMax(state.upgrades), stepsLeft: state.sessionStepsLeft };
    },
    sellFind(catchId) {
      const item = CATCH_BY_ID[catchId];
      if (!item) return { ok: false, reason: 'no-such-find' };
      const held = state.inventory[catchId] || 0;
      if (held <= 0) return { ok: false, reason: 'not-held', id: catchId };
      const price = kayakPriceFor(catchId, state.dayDrift, state.rank, state.upgrades);
      state.inventory[catchId] = held - 1;
      if (state.inventory[catchId] <= 0) delete state.inventory[catchId];
      state.findsSold += 1;
      state.earned += price;
      state.dailyEarned += price;
      addCash(price);
      return { ok: true, id: catchId, name: item.name, qty: 1, price, total: price };
    },
    sellAllFinds() {
      const ids = Object.keys(state.inventory);
      if (ids.length === 0) return { ok: false, reason: 'nothing-held' };
      let total = 0;
      let count = 0;
      ids.forEach((id) => {
        total += kayakPriceFor(id, state.dayDrift, state.rank, state.upgrades) * state.inventory[id];
        count += state.inventory[id];
      });
      total = Math.round(total * 10) / 10;
      state.inventory = {};
      state.findsSold += count;
      state.earned += total;
      state.dailyEarned += total;
      addCash(total);
      return { ok: true, total, sold: count, count };
    },
    buyUpgrade(upId) {
      const up = UP_BY_ID[upId];
      if (!up) return { ok: false, reason: 'no-such-upgrade' };
      if (state.upgrades.includes(upId)) return { ok: false, reason: 'already-owned', id: upId };
      if (getCash() < up.cost) return { ok: false, reason: 'not-enough-cash', cost: up.cost };
      addCash(-up.cost);
      state.spent += up.cost;
      state.upgrades.push(upId);
      log('Bought upgrade ' + up.name);
      return { ok: true, id: up.id, name: up.name, cost: up.cost };
    },
    takeContract(contractId) {
      const ct = KAYAK_CONTRACTS.find((x) => x.id === contractId);
      if (!ct) return { ok: false, reason: 'no-such-contract' };
      if (state.activeContract) return { ok: false, reason: 'already-active', id: state.activeContract };
      state.activeContract = ct.id;
      state.contractProgress = 0;
      state.contractDeadline = getDay() + ct.days;
      log('Took contract ' + ct.name);
      return { ok: true, id: ct.id, name: ct.name, qty: ct.qty, pay: ct.pay };
    },
    deliverContract() {
      if (!state.activeContract) return { ok: false, reason: 'no-active-contract' };
      const ct = KAYAK_CONTRACTS.find((x) => x.id === state.activeContract);
      const have = state.inventory[ct.material] || 0;
      if (have < ct.qty) return { ok: false, reason: 'not-enough', have, need: ct.qty, material: ct.material };
      state.inventory[ct.material] = have - ct.qty;
      if (state.inventory[ct.material] <= 0) delete state.inventory[ct.material];
      state.contractsDone += 1;
      state.earned += ct.pay;
      state.dailyEarned += ct.pay;
      addCash(ct.pay);
      state.xp += ct.rep;
      levelUp();
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
      return KAYAK_CATCHES.map((f) => ({ id: f.id, name: f.name, price: kayakPriceFor(f.id, state.dayDrift, state.rank, state.upgrades), base: f.value, drift: state.dayDrift, held: state.inventory[f.id] || 0 }));
    },
    siteReport(riverId) {
      const river = RIVER_BY_ID[riverId] || null;
      if (!river) return { ok: false, reason: 'no-such-site' };
      return { ok: true, id: river.id, name: river.name, fee: river.fee, difficulty: river.difficulty, steps: river.steps, duration: river.duration, risk: river.risk, rapids: river.rapids, length: river.length, desc: river.desc };
    },
    dailyEvent() {
      return dayEvent();
    },
    tick(dt) {
      if (!state.session) return;
      state.sessionTimeLeft -= dt;
      state.resource -= dt * 0.05;
      if (state.sessionTimeLeft <= 0 || state.resource <= 0) {
        state.resource = Math.max(0, state.resource);
        state.sessionTimeLeft = Math.max(0, state.sessionTimeLeft);
        endRun();
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
      return dayEvent();
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
      levelUp();
    },
    stats() {
      return { rank: (KAYAK_RANKS[state.rank] || {}).name || 'Paddler', xp: state.xp, sessions: state.sessions, actions: state.actions, stepsDone: state.stepsDone, earned: state.earned, spent: state.spent, findsFound: state.findsFound, findsSold: state.findsSold, contractsDone: state.contractsDone, contractsFailed: state.contractsFailed, hazardsTaken: state.hazardsTaken, heatGained: state.heatGained, upgrades: state.upgrades.length, activeContract: state.activeContract, contractProgress: state.contractProgress, session: state.session, stepsLeft: state.sessionStepsLeft, resource: state.resource, resourceMax: kayakStaminaMax(state.upgrades), dailyEarned: state.dailyEarned, totalYield: state.totalYield, bestStreak: state.bestStreak, bestSession: state.bestSession, bestSessionYield: state.bestSessionYield, specialsUsed: state.specialsUsed, weatherStops: state.weatherStops, season: state.season, event: state.event };
    },
    hudLine() {
      if (!state.session) return '';
      return 'Kayaking: ' + state.session + ' — ' + state.sessionStepsLeft + ' steps left, stamina ' + state.resource;
    },
    interact() {
      const pos = getPlayerPos() || { x: 0, z: 0 };
      const dx = pos.x - 420;
      const dz = pos.z - (-60);
      if (Math.sqrt(dx * dx + dz * dz) > 30) return false;
      if (state.session) { sys.paddleStroke(); return true; }
      let held = 0;
      Object.keys(state.inventory).forEach((k) => { held += state.inventory[k]; });
      if (held > 0) { sys.sellAllFinds(); return true; }
      sys.paddle(KAYAK_RIVERS[0].id);
      return true;
    },
  };
  return sys;
}

export function createKayakingExtras(system) {
  const st = system.state;
  let hired = [];
  let claimed = [];
  let wages = 0;

  return {
    hireHelper(id) {
      const h = KAYAK_HELPERS.find((x) => x.id === id);
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
      let due = 0;
      hired.forEach((id) => {
        const h = KAYAK_HELPERS.find((x) => x.id === id);
        if (h) due += h.wage;
      });
      wages += due;
      st.wagesPaid = (st.wagesPaid || 0) + due;
      return { ok: true, due, helpers: hired.length, totalPaid: due };
    },
    helperBonus(skill) {
      let sum = 0;
      hired.forEach((id) => {
        const h = KAYAK_HELPERS.find((x) => x.id === id);
        if (h && h.skill === skill) sum += h.bonus;
      });
      return sum;
    },
    challenges() {
      return KAYAK_CHALLENGES.map((ch) => kayakChallengeProgress(ch, st));
    },
    claimChallenge(id) {
      const ch = KAYAK_CHALLENGES.find((x) => x.id === id);
      if (!ch) return { ok: false, reason: 'no-such-challenge' };
      if (claimed.includes(id)) return { ok: false, reason: 'already-claimed', id };
      const prog = kayakChallengeProgress(ch, st);
      if (!prog.done) return { ok: false, reason: 'not-done', have: prog.have, goal: prog.goal };
      claimed.push(id);
      st.challengesClaimed.push(id);
      st.xp += ch.xp;
      st.rank = kayakRankFor(st.xp);
      return { ok: true, id: ch.id, xp: ch.xp };
    },
    achievements() {
      return KAYAK_ACHIEVEMENTS.map((a) => ({ id: a.id, name: a.name, desc: a.desc, done: !!a.check(st) }));
    },
    donateFinds() {
      const ids = Object.keys(st.inventory);
      let donated = 0;
      ids.forEach((id) => { donated += st.inventory[id]; });
      st.inventory = {};
      return { ok: true, donated, finds: ids };
    },
    bundleSale() {
      let count = 0;
      Object.keys(st.inventory).forEach((k) => { count += st.inventory[k]; });
      if (count < 10) return { ok: false, reason: 'not-enough', have: count, need: 10 };
      let total = 0;
      Object.keys(st.inventory).forEach((id) => {
        total += kayakPriceFor(id, st.dayDrift, st.rank, st.upgrades) * st.inventory[id];
      });
      total = Math.round(total * 1.1 * 10) / 10;
      st.inventory = {};
      st.findsSold += count;
      st.earned += total;
      st.dailyEarned += total;
      return { ok: true, total, count, bonus: 'bundle +10%' };
    },
    checkStamina() {
      const max = kayakStaminaMax(st.upgrades);
      return { ok: true, resource: st.resource, max, name: 'stamina', percent: max ? Math.round((st.resource / max) * 100) : 0 };
    },
    restUp() {
      st.resource = kayakStaminaMax(st.upgrades);
      return { ok: true, resource: st.resource, max: st.resource };
    },
    weighCatch() {
      let count = 0;
      let weight = 0;
      Object.keys(st.inventory).forEach((id) => {
        const f = CATCH_BY_ID[id];
        count += st.inventory[id];
        if (f) weight += st.inventory[id] * f.weight;
      });
      return { ok: true, count, weight: Math.round(weight * 10) / 10, total: count };
    },
    get helpers() { return hired.slice(); },
    get claimed() { return claimed.slice(); },
    get wagesPaid() { return wages; },
  };
}

export function createKayakingMarket(system) {
  const st = system.state;
  let currentEvent = null;
  let currentSeason = st.season || 'spring';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  const calc = (itemId, basePrice) => {
    const em = currentEvent ? kayakEventMult(currentEvent, itemId) : 1;
    return Math.round(basePrice * em * kayakSeasonMult(currentSeason) * 10) / 10;
  };

  return {
    setEvent(id) {
      const ev = KAYAK_MARKET.find((m) => m.id === id);
      if (!ev) return { ok: false, reason: 'no-such-event' };
      currentEvent = id;
      st.event = id;
      return { ok: true, event: id };
    },
    setSeason(id) {
      const s = KAYAK_SEASONS.find((x) => x.id === id);
      if (!s) return { ok: false, reason: 'no-such-season' };
      currentSeason = id;
      st.season = id;
      return { ok: true, season: id };
    },
    eventPrice(itemId, basePrice) {
      return calc(itemId, basePrice);
    },
    bulkDeal(catchId, qty) {
      if (!qty || qty < 20) return { ok: false, reason: 'not-enough', qty: qty || 0, need: 20 };
      const held = st.inventory[catchId] || 0;
      if (held < qty) return { ok: false, reason: 'not-enough-held', have: held, need: qty };
      const item = CATCH_BY_ID[catchId];
      if (!item) return { ok: false, reason: 'no-such-find' };
      const unit = calc(catchId, item.value);
      const total = Math.round(unit * qty * 1.1 * 10) / 10;
      st.inventory[catchId] = held - qty;
      if (st.inventory[catchId] <= 0) delete st.inventory[catchId];
      st.findsSold += qty;
      st.earned += total;
      st.dailyEarned += total;
      bulkTraded += qty;
      dealsClaimed += 1;
      return { ok: true, total, qty, unit, bonus: 'bulk +10%' };
    },
    dailyDeals() {
      return KAYAK_MARKET.map((m) => ({ id: m.id, name: m.name, finds: m.finds.slice(), mult: m.mult, desc: m.desc }));
    },
    marketSummary() {
      return { event: currentEvent, season: currentSeason, dealsClaimed, bulkTraded, deals: this.dailyDeals() };
    },
    get event() { return currentEvent; },
    get season() { return currentSeason; },
  };
}
