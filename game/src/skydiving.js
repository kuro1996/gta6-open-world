export const DROP_ZONES = [
  { id: 'meadow-drop', name: 'Meadow Drop', price: 30, difficulty: 1, steps: 5, duration: 90, risk: 0.1, altitude: 8000, wind: 2, desc: 'A soft green meadow landing zone.' },
  { id: 'river-drop', name: 'River Drop', price: 35, difficulty: 1, steps: 6, duration: 100, risk: 0.1, altitude: 9000, wind: 3, desc: 'Jump over the winding river below.' },
  { id: 'lake-drop', name: 'Lake Drop', price: 45, difficulty: 2, steps: 7, duration: 120, risk: 0.2, altitude: 10000, wind: 3, desc: 'Blue water sparkles under the drop.' },
  { id: 'canyon-drop', name: 'Canyon Drop', price: 55, difficulty: 2, steps: 8, duration: 140, risk: 0.2, altitude: 11000, wind: 4, desc: 'Red rock walls frame the fall.' },
  { id: 'coastal-drop', name: 'Coastal Drop', price: 60, difficulty: 3, steps: 9, duration: 160, risk: 0.3, altitude: 12000, wind: 5, desc: 'Sea breeze and cliffs at the edge.' },
  { id: 'mountain-drop', name: 'Mountain Drop', price: 70, difficulty: 3, steps: 10, duration: 180, risk: 0.4, altitude: 13000, wind: 6, desc: 'Thin air above the snowy peaks.' },
  { id: 'desert-drop', name: 'Desert Drop', price: 50, difficulty: 3, steps: 8, duration: 150, risk: 0.3, altitude: 11000, wind: 5, desc: 'Golden dunes stretch to the horizon.' },
  { id: 'city-drop', name: 'City Drop', price: 80, difficulty: 4, steps: 11, duration: 200, risk: 0.5, altitude: 13500, wind: 7, desc: 'Skyscrapers rush past as you fall.' },
  { id: 'island-drop', name: 'Island Drop', price: 75, difficulty: 4, steps: 10, duration: 190, risk: 0.4, altitude: 12500, wind: 6, desc: 'A tiny island ringed by reef.' },
  { id: 'sunset-drop', name: 'Sunset Drop', price: 90, difficulty: 5, steps: 12, duration: 220, risk: 0.5, altitude: 14000, wind: 8, desc: 'The famous golden-hour jump.' },
];

export const SKYDIVE_TRICKS = [
  { id: 'belly-fly', name: 'Belly Fly', value: 6, rarity: 0.5, risk: 0.1, desc: 'The classic belly-to-earth fall.' },
  { id: 'back-fly', name: 'Back Fly', value: 9, rarity: 0.45, risk: 0.15, desc: 'Flying on your back, sky above.' },
  { id: 'sit-fly', name: 'Sit Fly', value: 14, rarity: 0.35, risk: 0.2, desc: 'Sitting upright in freefall.' },
  { id: 'head-down', name: 'Head Down', value: 22, rarity: 0.28, risk: 0.3, desc: 'Diving headfirst at top speed.' },
  { id: 'barrel-roll', name: 'Barrel Roll', value: 30, rarity: 0.2, risk: 0.25, desc: 'A full roll through the air.' },
  { id: 'loop', name: 'Loop', value: 45, rarity: 0.14, risk: 0.35, desc: 'A clean loop in freefall.' },
  { id: 'formation-4', name: 'Formation Four', value: 70, rarity: 0.09, risk: 0.2, desc: 'Four jumpers linked in the sky.' },
  { id: 'formation-8', name: 'Formation Eight', value: 110, rarity: 0.06, risk: 0.3, desc: 'Eight jumpers in one pattern.' },
  { id: 'wingsuit-glide', name: 'Wingsuit Glide', value: 180, rarity: 0.04, risk: 0.4, desc: 'Gliding like a bird in a wingsuit.' },
  { id: 'canopy-swoop', name: 'Canopy Swoop', value: 320, rarity: 0.02, risk: 0.45, desc: 'A daring low swoop under canopy.' },
];

export const SKYDIVE_UPGRADES = [
  { id: 'canopy', name: 'Pro Canopy', cost: 420, desc: 'A bigger canopy for higher jumps.', effect: 'altitude max +1000' },
  { id: 'find-plus', name: 'Trick Spotter', cost: 260, desc: 'Spots rare tricks more often.', effect: 'rare trick boost 1.25' },
  { id: 'price-plus', name: 'Footage License', cost: 310, desc: 'Sells footage for more cash.', effect: 'sell price +20%' },
  { id: 'carry-plus', name: 'Gear Bag', cost: 210, desc: 'Carry more footage per jump.', effect: 'carry cap +10' },
  { id: 'altimeter', name: 'Digital Altimeter', cost: 180, desc: 'Exact altitude at a glance.', effect: 'altitude control up' },
  { id: 'rig-pro', name: 'Pro Rig', cost: 340, desc: 'A lighter, faster rig.', effect: 'trick chance up' },
  { id: 'suit-wings', name: 'Wingsuit', cost: 500, desc: 'Wings for long glides.', effect: 'glide time up' },
  { id: 'camera-helmet', name: 'Camera Helmet', cost: 280, desc: 'Films every jump in 4K.', effect: 'footage value up' },
];

export const SKYDIVE_RANKS = [
  { level: 0, name: 'Cloud Watcher', xp: 0, perk: 'Tandem jumps unlocked' },
  { level: 1, name: 'Freefall Novice', xp: 120, perk: 'Solo jumps open up' },
  { level: 2, name: 'Formation Flyer', xp: 300, perk: 'Formation tricks pay better' },
  { level: 3, name: 'Wingsuit Pro', xp: 620, perk: 'Rare tricks appear more often' },
  { level: 4, name: 'Stratosphere Legend', xp: 1100, perk: 'The sunset drop holds no fear' },
];

export const SKYDIVE_EVENTS = [
  { id: 'blue-skies', name: 'Blue Skies', desc: 'Not a cloud in the sky.' },
  { id: 'boogie-week', name: 'Boogie Week', desc: 'Jumpers arrive from everywhere.' },
  { id: 'wind-gusts', name: 'Wind Gusts', desc: 'Gusty wind shakes the planes.' },
  { id: 'record-attempt', name: 'Record Attempt', desc: 'A big formation record is tried.' },
  { id: 'cloud-cover', name: 'Cloud Cover', desc: 'Low cloud hides the ground.' },
  { id: 'airshow', name: 'Airshow Day', desc: 'Crowds gather to watch jumps.' },
  { id: 'sunset-special', name: 'Sunset Special', desc: 'Golden light over the zone.' },
  { id: 'rain-delay', name: 'Rain Delay', desc: 'Rain holds the planes on the ground.' },
  { id: 'new-plane', name: 'New Plane', desc: 'A faster jump plane arrives.' },
  { id: 'night-jump', name: 'Night Jump', desc: 'Glow sticks light the night sky.' },
];

export const SKYDIVE_CONTRACTS = [
  { id: 'belly-order', name: 'Belly Footage', material: 'belly-fly', qty: 6, pay: 130, days: 3, rep: 10, desc: 'A school wants belly-fly footage.' },
  { id: 'loop-order', name: 'Loop Footage', material: 'loop', qty: 3, pay: 280, days: 4, rep: 20, desc: 'A channel wants three loops.' },
  { id: 'formation-order', name: 'Formation Footage', material: 'formation-4', qty: 2, pay: 400, days: 4, rep: 25, desc: 'A sponsor wants formation footage.' },
  { id: 'wingsuit-order', name: 'Wingsuit Footage', material: 'wingsuit-glide', qty: 2, pay: 550, days: 5, rep: 30, desc: 'A film wants wingsuit glides.' },
  { id: 'sit-order', name: 'Sit-Fly Footage', material: 'sit-fly', qty: 5, pay: 200, days: 3, rep: 15, desc: 'A magazine wants sit-fly shots.' },
  { id: 'swoop-order', name: 'Swoop Footage', material: 'canopy-swoop', qty: 1, pay: 700, days: 5, rep: 35, desc: 'A brand wants one canopy swoop.' },
];

export const SKYDIVE_CHALLENGES = [
  { id: 'first-jump', name: 'First Jump', target: 'sessions', goal: 1, xp: 20, desc: 'Finish one jump session.' },
  { id: 'five-jumps', name: 'Five Jumps', target: 'sessions', goal: 5, xp: 60, desc: 'Finish five jump sessions.' },
  { id: 'trick-ten', name: 'Trick Ten', target: 'findsFound', goal: 10, xp: 40, desc: 'Perform ten tricks.' },
  { id: 'trick-fifty', name: 'Trick Fifty', target: 'findsFound', goal: 50, xp: 120, desc: 'Perform fifty tricks.' },
  { id: 'earn-five-hundred', name: 'Earn Five Hundred', target: 'earned', goal: 500, xp: 100, desc: 'Earn 500 cash in total.' },
  { id: 'sell-twenty', name: 'Sell Twenty', target: 'findsSold', goal: 20, xp: 80, desc: 'Sell twenty clips.' },
  { id: 'contract-three', name: 'Contract Three', target: 'contractsDone', goal: 3, xp: 90, desc: 'Deliver three contracts.' },
  { id: 'steps-hundred', name: 'Hundred Steps', target: 'stepsDone', goal: 100, xp: 110, desc: 'Take a hundred jump steps.' },
];

export const SKYDIVE_ACHIEVEMENTS = [
  { id: 'feet-off', name: 'Feet Off', check: (s) => s.sessions >= 1, desc: 'Finish your first jump.' },
  { id: 'sky-regular', name: 'Sky Regular', check: (s) => s.sessions >= 10, desc: 'Finish ten jumps.' },
  { id: 'trickster', name: 'Trickster', check: (s) => s.findsFound >= 25, desc: 'Perform twenty-five tricks.' },
  { id: 'air-artist', name: 'Air Artist', check: (s) => s.findsFound >= 100, desc: 'Perform a hundred tricks.' },
  { id: 'rich-jumper', name: 'Rich Jumper', check: (s) => s.earned >= 1000, desc: 'Earn a thousand cash.' },
  { id: 'deal-maker', name: 'Deal Maker', check: (s) => s.contractsDone >= 5, desc: 'Deliver five contracts.' },
  { id: 'streak-five', name: 'Streak Five', check: (s) => s.bestStreak >= 5, desc: 'Reach a streak of five.' },
  { id: 'sky-master', name: 'Sky Master', check: (s) => s.rank >= 4, desc: 'Reach the top rank.' },
];

export const SKYDIVE_TIPS = [
  { id: 'tip-alt', name: 'Watch Altitude', text: 'Land before your altitude runs out.' },
  { id: 'tip-rare', name: 'Rare Tricks', text: 'High zones hide the rarest tricks.' },
  { id: 'tip-rank', name: 'Rank Up', text: 'Higher rank boosts rare tricks.' },
  { id: 'tip-sell', name: 'Sell Often', text: 'Sell footage before the drift turns.' },
  { id: 'tip-contract', name: 'Contracts Pay', text: 'Contracts pay more than raw sales.' },
  { id: 'tip-weather', name: 'Storm Watch', text: 'Storms and hurricanes block jumps.' },
  { id: 'tip-cap', name: 'Carry Cap', text: 'Upgrade your bag to carry more.' },
  { id: 'tip-season', name: 'Season Prices', text: 'Summer prices beat winter prices.' },
];

export const SKYDIVE_LEADERBOARD = [
  { name: 'Skye', value: 950, desc: 'Top jumper of the season.' },
  { name: 'Jet', value: 720, desc: 'Fastest fall in the club.' },
  { name: 'Aria', value: 540, desc: 'Formation queen of the sky.' },
  { name: 'Marco', value: 310, desc: 'Steady jumper, steady hands.' },
  { name: 'You', value: 0, desc: 'Your score on the board.' },
];

export const SKYDIVE_RECORDS = [
  { id: 'most-jumps', name: 'Most Jumps', stat: 'sessions', unit: 'jumps', desc: 'Most jump sessions finished.' },
  { id: 'most-tricks', name: 'Most Tricks', stat: 'findsFound', unit: 'tricks', desc: 'Most tricks performed.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'cash', desc: 'Most cash earned.' },
  { id: 'best-yield', name: 'Best Yield', stat: 'bestSessionYield', unit: 'cash', desc: 'Best single jump yield.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'streak', desc: 'Longest good streak.' },
];

export const SKYDIVE_MARKET = [
  { id: 'clip-shop', name: 'Clip Shop', finds: ['belly-fly', 'back-fly', 'sit-fly'], mult: 1.1, desc: 'Buys common jump clips.' },
  { id: 'trick-channel', name: 'Trick Channel', finds: ['barrel-roll', 'loop'], mult: 1.25, desc: 'Pays well for trick footage.' },
  { id: 'formation-tv', name: 'Formation TV', finds: ['formation-4', 'formation-8'], mult: 1.4, desc: 'Top price for formations.' },
  { id: 'wingsuit-film', name: 'Wingsuit Film', finds: ['wingsuit-glide'], mult: 1.5, desc: 'Best buyer for wingsuit glides.' },
  { id: 'swoop-brand', name: 'Swoop Brand', finds: ['canopy-swoop'], mult: 1.6, desc: 'Pays a premium for swoops.' },
  { id: 'sky-magazine', name: 'Sky Magazine', finds: ['head-down', 'loop'], mult: 1.3, desc: 'Magazine buys head-down shots.' },
  { id: 'tourist-stall', name: 'Tourist Stall', finds: ['belly-fly', 'back-fly'], mult: 1.05, desc: 'Quick sales to tourists.' },
  { id: 'rare-buyer', name: 'Rare Buyer', finds: ['canopy-swoop', 'wingsuit-glide', 'formation-8'], mult: 1.45, desc: 'Buys only the rarest footage.' },
];

export const SKYDIVE_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.0, desc: 'Mild air, steady prices.' },
  { id: 'summer', name: 'Summer', mult: 1.15, desc: 'Peak season, best prices.' },
  { id: 'autumn', name: 'Autumn', mult: 0.95, desc: 'Cooling air, softer prices.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold air, lowest prices.' },
];

export const SKYDIVE_SEASONAL = [
  { season: 'summer', find: 'canopy-swoop', mult: 1.3 },
  { season: 'summer', find: 'belly-fly', mult: 1.2 },
  { season: 'spring', find: 'formation-4', mult: 1.2 },
  { season: 'spring', find: 'sit-fly', mult: 1.15 },
  { season: 'autumn', find: 'wingsuit-glide', mult: 1.25 },
  { season: 'autumn', find: 'loop', mult: 1.1 },
  { season: 'winter', find: 'formation-8', mult: 1.4 },
  { season: 'winter', find: 'head-down', mult: 1.2 },
];

export const SKYDIVE_QUICK_START = [
  'Book the Meadow Drop and jump.',
  'Perform tricks until altitude runs low.',
  'Sell footage at the Clip Shop.',
  'Buy the Gear Bag upgrade early.',
  'Take a belly footage contract.',
  'Save up for the Pro Canopy.',
];

export const SKYDIVE_HELPERS = [
  { id: 'packer', name: 'Packer', wage: 20, skill: 'packing', bonus: 0.1, desc: 'Packs every rig perfectly.' },
  { id: 'coach', name: 'Jump Coach', wage: 40, skill: 'coaching', bonus: 0.25, desc: 'Teaches tricks that sell.' },
  { id: 'cameraman', name: 'Cameraman', wage: 30, skill: 'filming', bonus: 0.15, desc: 'Films jumps from the air.' },
  { id: 'safety-officer', name: 'Safety Officer', wage: 35, skill: 'safety', bonus: 0.2, desc: 'Keeps every jump safe.' },
];

export const SKYDIVING_META = { system: 'skydiving', version: '7c-B2', author: 'builder-2', dataCount: 10, findCount: 10, upgradeCount: 8, rankCount: 5 };

const zoneById = (id) => DROP_ZONES.find((z) => z.id === id) || null;
const trickById = (id) => SKYDIVE_TRICKS.find((t) => t.id === id) || null;
const upList = (v) => (Array.isArray(v) ? v : (v && Array.isArray(v.upgrades) ? v.upgrades : []));
const rkOf = (v) => (typeof v === 'number' ? v : (v && typeof v.rank === 'number' ? v.rank : 0));

export const skydivingRankFor = (xp) => {
  let out = 0;
  SKYDIVE_RANKS.forEach((r) => { if (xp >= r.xp) out = r.level; });
  return out;
};

export const skydivingAltitudeMax = (upgrades) => (upList(upgrades).includes('canopy') ? 5000 : 4000);

export const skydivingPriceFor = (trickId, drift, rank, upgrades) => {
  const t = trickById(trickId);
  if (!t) return 0;
  const d = typeof drift === 'number' ? drift : 0;
  const rk = rkOf(rank);
  const owned = Array.isArray(upgrades) ? upgrades : upList(rank);
  let p = t.value * (1 + d) * (1 + rk * 0.1);
  if (owned.includes('price-plus')) p *= 1.2;
  return Math.max(1, Math.round(p * 10) / 10);
};

export const skydivingCarryCap = (rank, upgrades) => {
  const owned = Array.isArray(upgrades) ? upgrades : upList(rank);
  return 12 + rkOf(rank) * 2 + (owned.includes('carry-plus') ? 10 : 0);
};

export const skydivingScore = (sessions, yld, hazards) => Math.max(0, sessions * 10 + Math.round(yld) - hazards * 5);

export const skydivingGrade = (score) => (score >= 400 ? 'S' : score >= 250 ? 'A' : score >= 140 ? 'B' : score >= 60 ? 'C' : 'D');

export const skydivingWeeklyGoal = (state) => {
  const s = state || {};
  const mk = (have, goal) => ({ have, goal, done: have >= goal });
  const sessions = mk(s.sessions || 0, 5);
  const sold = mk(s.findsSold || 0, 40);
  const earned = mk(s.earned || 0, 600);
  return { sessions, sold, earned, allDone: sessions.done && sold.done && earned.done };
};

export const skydivingEfficiency = (state) => {
  const s = state || {};
  if (!s.sessions) return 100;
  return Math.round((Math.max(0, s.sessions - (s.contractsFailed || 0)) / s.sessions) * 100);
};

export const skydivingProfitPerJump = (state) => {
  const s = state || {};
  return s.sessions ? Math.round(((s.earned || 0) / s.sessions) * 10) / 10 : 0;
};

export const skydivingInventoryValue = (state) => {
  const s = state || {};
  let total = 0;
  Object.keys(s.inventory || {}).forEach((id) => {
    total += (s.inventory[id] || 0) * skydivingPriceFor(id, s.dayDrift || 0, s.rank || 0, s.upgrades || []);
  });
  return Math.round(total * 10) / 10;
};

export const skydivingSummary = (state) => {
  const s = state || {};
  const rn = (SKYDIVE_RANKS[s.rank || 0] || {}).name || 'Cloud Watcher';
  return 'Skydiving: ' + rn + ' with ' + (s.sessions || 0) + ' jumps, ' + (s.findsFound || 0) + ' tricks and ' + (s.earned || 0) + ' cash earned.';
};

export const skydivingNextGoal = (state) => {
  const s = state || {};
  if (!(s.sessions || 0)) return 'Finish your first jump.';
  if ((s.sessions || 0) < 5) return 'Finish 5 jumps.';
  if ((s.earned || 0) < 500) return 'Earn 500 cash in total.';
  if ((s.rank || 0) < 4) return 'Reach rank ' + SKYDIVE_RANKS[(s.rank || 0) + 1].name + '.';
  return 'Become a legend of Skydiving.';
};

export const skydivingRecordFor = (id, state) => {
  const rec = SKYDIVE_RECORDS.find((r) => r.id === id);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, stat: rec.stat, unit: rec.unit, desc: rec.desc, value: (state && state[rec.stat]) || 0 };
};

export const skydivingAllRecords = (state) => SKYDIVE_RECORDS.map((r) => skydivingRecordFor(r.id, state));

export const skydivingLeaderboardWith = (playerScore) => {
  const board = SKYDIVE_LEADERBOARD.map((e) => ({ name: e.name, value: e.name === 'You' ? playerScore : e.value, desc: e.desc }));
  board.sort((a, b) => b.value - a.value);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, value: e.value, desc: e.desc }));
};

export const skydivingEventFor = (day) => SKYDIVE_MARKET[((day || 0) % SKYDIVE_MARKET.length + SKYDIVE_MARKET.length) % SKYDIVE_MARKET.length];

export const skydivingEventMult = (eventId, trickId) => {
  const ev = SKYDIVE_MARKET.find((m) => m.id === eventId);
  return ev && ev.finds.includes(trickId) ? ev.mult : 1;
};

export const skydivingSeasonMult = (seasonId) => {
  const s = SKYDIVE_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
};

export const skydivingSeasonalPriceMult = (seasonId, trickId) => {
  const row = SKYDIVE_SEASONAL.find((x) => x.season === seasonId && x.find === trickId);
  return row ? row.mult : 1;
};

export const skydivingBestBuyer = () => SKYDIVE_MARKET.reduce((b, m) => (m.mult > b.mult ? m : b), SKYDIVE_MARKET[0]);

export const skydivingBestSeason = () => SKYDIVE_SEASONS.reduce((b, s) => (s.mult > b.mult ? s : b), SKYDIVE_SEASONS[0]);

export const skydivingTipFor = (day) => SKYDIVE_TIPS[((day || 0) % SKYDIVE_TIPS.length + SKYDIVE_TIPS.length) % SKYDIVE_TIPS.length];

export const skydivingQuickStart = () => SKYDIVE_QUICK_START.slice();

export const skydivingChallengeProgress = (challenge, state) => {
  const have = (state && state[challenge.target]) || 0;
  return { id: challenge.id, name: challenge.name, have, goal: challenge.goal, done: have >= challenge.goal, xp: challenge.xp };
};

export const skydivingProgressPercent = (state) => {
  const s = state || {};
  if (!s.sessions) return 0;
  return Math.round((Math.max(0, s.sessions - (s.contractsFailed || 0)) / s.sessions) * 100);
};

export const skydivingTotalValue = (state) => {
  const s = state || {};
  return Math.round((skydivingInventoryValue(s) + (s.earned || 0)) * 10) / 10;
};

export const skydivingHelperBonus = (helperIds, skill) => (helperIds || []).reduce((sum, id) => {
  const h = SKYDIVE_HELPERS.find((x) => x.id === id);
  return sum + (h && h.skill === skill ? h.bonus : 0);
}, 0);

export const skydivingTricksByRarity = (maxRarity) => SKYDIVE_TRICKS.filter((t) => t.rarity <= maxRarity).map((t) => t.id);

export const skydivingZoneByAltitude = (altitude) => {
  let pick = DROP_ZONES[DROP_ZONES.length - 1];
  for (const z of DROP_ZONES) {
    if (z.altitude >= altitude) { pick = z; break; }
  }
  return pick;
};

const blankState = () => ({
  xp: 0, rank: 0, sessions: 0, actions: 0, stepsDone: 0, earned: 0, spent: 0,
  findsFound: 0, findsSold: 0, contractsDone: 0, contractsFailed: 0, hazardsTaken: 0,
  heatGained: 0, inventory: {}, upgrades: [], activeContract: null, contractProgress: 0,
  contractDeadline: null, session: null, sessionStepsLeft: 0, sessionTimeLeft: 0,
  resource: 0, dayDrift: 0, lastDay: 1, bestSession: null, bestSessionYield: 0,
  dailyEarned: 0, dailySessions: 0, totalYield: 0, bestStreak: 0, streak: 0,
  specialsUsed: 0, weatherStops: 0, sessionYield: 0, sessionFinds: [], season: 'summer',
  event: null, wagesPaid: 0, challengesClaimed: [],
});

export function createSkydivingSystem(ctx) {
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
  const state = blankState();

  const bumpRank = () => {
    const lvl = skydivingRankFor(state.xp);
    if (lvl > state.rank) log('Rank up: ' + SKYDIVE_RANKS[lvl].name);
    state.rank = lvl;
  };

  const closeSession = () => {
    const yld = state.sessionYield;
    const siteId = state.session;
    state.totalYield += yld;
    if (yld > state.bestSessionYield) { state.bestSessionYield = yld; state.bestSession = siteId; }
    if (yld > 0) {
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
    } else state.streak = 0;
    state.session = null;
    state.sessionStepsLeft = 0;
    state.sessionTimeLeft = 0;
  };

  const pickDaily = () => {
    const roll = rng();
    switch (true) {
      case roll < 0.16:
        state.dayDrift = Math.round((state.dayDrift + 0.3) * 100) / 100;
        state.event = 'demand-spike';
        return { ok: true, event: 'demand-spike', name: 'Demand Spike', kind: 'demand' };
      case roll < 0.28:
        state.dayDrift = Math.round((state.dayDrift - 0.15) * 100) / 100;
        state.event = 'price-dip';
        return { ok: true, event: 'price-dip', name: 'Price Dip', kind: 'dip' };
      case roll < 0.38: {
        const pick = SKYDIVE_TRICKS[Math.floor(rng() * SKYDIVE_TRICKS.length)];
        state.inventory[pick.id] = (state.inventory[pick.id] || 0) + 3;
        state.findsFound += 3;
        state.event = 'gift';
        return { ok: true, event: 'gift', name: 'Gift', kind: 'gift', find: pick.id, qty: 3 };
      }
      case roll < 0.46: {
        const ev = SKYDIVE_EVENTS[Math.floor(rng() * SKYDIVE_EVENTS.length)];
        state.event = ev.id;
        return { ok: true, event: ev.id, name: ev.name, kind: 'named' };
      }
      default:
        state.event = null;
        return { ok: true, event: null, name: 'none', kind: 'none' };
    }
  };

  const sys = {
    name: 'Skydiving',
    state,
    jump(zoneId) {
      const zone = zoneById(zoneId);
      if (!zone) return { ok: false, reason: 'no-such-site' };
      if (state.session) return { ok: false, reason: 'already-in-session' };
      const cond = (getWeather() || {}).condition || 'clear';
      if (cond === 'storm' || cond === 'hurricane') {
        state.weatherStops += 1;
        return { ok: false, reason: 'bad-weather', condition: cond };
      }
      const hour = getHour();
      if (hour < 7 || hour >= 18) return { ok: false, reason: 'closed', hour };
      if (getCash() < zone.price) return { ok: false, reason: 'not-enough-cash', cost: zone.price };
      addCash(-zone.price);
      state.spent += zone.price;
      state.session = zone.id;
      state.sessionStepsLeft = zone.steps;
      state.sessionTimeLeft = zone.duration;
      state.resource = skydivingAltitudeMax(state.upgrades);
      state.sessionYield = 0;
      state.sessionFinds = [];
      state.sessions += 1;
      state.dailySessions += 1;
      log('Jumping at ' + zone.name);
      return { ok: true, id: zone.id, name: zone.name, price: zone.price, steps: zone.steps, duration: zone.duration };
    },
    performTrick() {
      if (!state.session) return { ok: false, reason: 'no-session' };
      const zone = zoneById(state.session);
      state.resource -= 400;
      state.sessionStepsLeft -= 1;
      state.stepsDone += 1;
      state.actions += 1;
      const heldTotal = Object.values(state.inventory).reduce((a, b) => a + b, 0);
      const cap = skydivingCarryCap(state.rank, state.upgrades);
      let qty = 1 + Math.floor(rng() * 2);
      qty = Math.min(qty, Math.max(0, cap - heldTotal));
      let trick = null;
      let bonus = false;
      let hazard = false;
      if (qty > 0) {
        const cum = [];
        let run = 0;
        SKYDIVE_TRICKS.forEach((t) => {
          let w = 1 / t.rarity;
          if (t.rarity < 0.08 && state.rank >= 3) w *= 1.6;
          if (t.rarity < 0.08 && state.upgrades.includes('find-plus')) w *= 1.25;
          run += w;
          cum.push(run);
        });
        const roll = rng() * run;
        let i = 0;
        while (i < cum.length - 1 && roll > cum[i]) i++;
        trick = SKYDIVE_TRICKS[i];
        if (rng() < 0.04) { qty += 1; bonus = true; }
        state.inventory[trick.id] = (state.inventory[trick.id] || 0) + qty;
        state.findsFound += qty;
        state.sessionFinds.push(trick.id);
        state.sessionYield += qty * trick.value;
      }
      if (zone && rng() < zone.risk * 0.04) {
        hazard = true;
        state.hazardsTaken += 1;
      }
      let ended = false;
      if (state.resource <= 0 || state.sessionStepsLeft <= 0) {
        state.resource = Math.max(0, state.resource);
        closeSession();
        ended = true;
      }
      return { ok: true, find: trick ? { id: trick.id, name: trick.name, qty } : null, qty, bonus, hazard, stepsLeft: state.sessionStepsLeft, resource: state.resource, ended };
    },
    landEarly() {
      if (!state.session) return { ok: false, reason: 'no-session' };
      const id = state.session;
      closeSession();
      log('Landed early from ' + id);
      return { ok: true, id, yield: state.totalYield };
    },
    trackDive() {
      const zone = state.session ? zoneById(state.session) : null;
      return { ok: true, site: zone ? zone.id : null, siteName: zone ? zone.name : null, weather: (getWeather() || {}).condition || 'clear', hour: getHour(), resource: state.resource, resourceMax: skydivingAltitudeMax(state.upgrades), stepsLeft: state.sessionStepsLeft };
    },
    sellFind(trickId) {
      const t = trickById(trickId);
      if (!t) return { ok: false, reason: 'no-such-find' };
      const held = state.inventory[trickId] || 0;
      if (held <= 0) return { ok: false, reason: 'not-held', id: trickId };
      const price = skydivingPriceFor(trickId, state.dayDrift, state.rank, state.upgrades);
      state.inventory[trickId] = held - 1;
      if (state.inventory[trickId] <= 0) delete state.inventory[trickId];
      state.findsSold += 1;
      state.earned += price;
      state.dailyEarned += price;
      addCash(price);
      return { ok: true, id: trickId, name: t.name, qty: 1, price, total: price };
    },
    sellAllFinds() {
      const ids = Object.keys(state.inventory);
      if (ids.length === 0) return { ok: false, reason: 'nothing-held' };
      let total = 0;
      let count = 0;
      ids.forEach((id) => {
        const price = skydivingPriceFor(id, state.dayDrift, state.rank, state.upgrades);
        total += price * state.inventory[id];
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
      const up = SKYDIVE_UPGRADES.find((u) => u.id === upId);
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
      const ct = SKYDIVE_CONTRACTS.find((x) => x.id === contractId);
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
      const ct = SKYDIVE_CONTRACTS.find((x) => x.id === state.activeContract);
      const have = state.inventory[ct.material] || 0;
      if (have < ct.qty) return { ok: false, reason: 'not-enough', have, need: ct.qty, material: ct.material };
      state.inventory[ct.material] = have - ct.qty;
      if (state.inventory[ct.material] <= 0) delete state.inventory[ct.material];
      state.contractsDone += 1;
      state.earned += ct.pay;
      state.dailyEarned += ct.pay;
      addCash(ct.pay);
      state.xp += ct.rep;
      bumpRank();
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
      return SKYDIVE_TRICKS.map((t) => ({ id: t.id, name: t.name, price: skydivingPriceFor(t.id, state.dayDrift, state.rank, state.upgrades), base: t.value, drift: state.dayDrift, held: state.inventory[t.id] || 0 }));
    },
    siteReport(zoneId) {
      const zone = zoneById(zoneId);
      if (!zone) return { ok: false, reason: 'no-such-site' };
      return { ok: true, id: zone.id, name: zone.name, price: zone.price, difficulty: zone.difficulty, steps: zone.steps, duration: zone.duration, risk: zone.risk, altitude: zone.altitude, wind: zone.wind, desc: zone.desc };
    },
    dailyEvent() {
      return pickDaily();
    },
    tick(dt) {
      if (!state.session) return;
      state.sessionTimeLeft -= dt;
      state.resource -= dt * 0.05;
      if (state.sessionTimeLeft <= 0 || state.resource <= 0) {
        state.resource = Math.max(0, state.resource);
        state.sessionTimeLeft = Math.max(0, state.sessionTimeLeft);
        closeSession();
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
      return pickDaily();
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
      bumpRank();
    },
    stats() {
      return { rank: (SKYDIVE_RANKS[state.rank] || {}).name || 'Cloud Watcher', xp: state.xp, sessions: state.sessions, actions: state.actions, stepsDone: state.stepsDone, earned: state.earned, spent: state.spent, findsFound: state.findsFound, findsSold: state.findsSold, contractsDone: state.contractsDone, contractsFailed: state.contractsFailed, hazardsTaken: state.hazardsTaken, heatGained: state.heatGained, upgrades: state.upgrades.length, activeContract: state.activeContract, contractProgress: state.contractProgress, session: state.session, stepsLeft: state.sessionStepsLeft, resource: state.resource, resourceMax: skydivingAltitudeMax(state.upgrades), dailyEarned: state.dailyEarned, totalYield: state.totalYield, bestStreak: state.bestStreak, bestSession: state.bestSession, bestSessionYield: state.bestSessionYield, specialsUsed: state.specialsUsed, weatherStops: state.weatherStops, season: state.season, event: state.event };
    },
    hudLine() {
      if (!state.session) return '';
      return 'Skydiving: ' + state.session + ' — ' + state.sessionStepsLeft + ' steps left, altitude ' + state.resource;
    },
    interact() {
      const pos = getPlayerPos() || { x: 0, z: 0 };
      const dx = pos.x - 80;
      const dz = pos.z - (-220);
      if (Math.sqrt(dx * dx + dz * dz) > 30) return false;
      if (state.session) { sys.performTrick(); return true; }
      const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
      if (held > 0) { sys.sellAllFinds(); return true; }
      sys.jump(DROP_ZONES[0].id);
      return true;
    },
  };
  return sys;
}

export function createSkydivingExtras(system) {
  const st = system.state;
  let hired = [];
  let claimed = [];
  let wages = 0;
  const bonusFor = (skill) => hired.reduce((sum, id) => {
    const h = SKYDIVE_HELPERS.find((x) => x.id === id);
    return sum + (h && h.skill === skill ? h.bonus : 0);
  }, 0);

  return {
    hireHelper(id) {
      const h = SKYDIVE_HELPERS.find((x) => x.id === id);
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
      const due = hired.reduce((sum, id) => {
        const h = SKYDIVE_HELPERS.find((x) => x.id === id);
        return sum + (h ? h.wage : 0);
      }, 0);
      wages += due;
      st.wagesPaid = (st.wagesPaid || 0) + due;
      return { ok: true, due, helpers: hired.length, totalPaid: due };
    },
    helperBonus(skill) {
      return bonusFor(skill);
    },
    challenges() {
      return SKYDIVE_CHALLENGES.map((ch) => skydivingChallengeProgress(ch, st));
    },
    claimChallenge(id) {
      const ch = SKYDIVE_CHALLENGES.find((x) => x.id === id);
      if (!ch) return { ok: false, reason: 'no-such-challenge' };
      if (claimed.includes(id)) return { ok: false, reason: 'already-claimed', id };
      const prog = skydivingChallengeProgress(ch, st);
      if (!prog.done) return { ok: false, reason: 'not-done', have: prog.have, goal: prog.goal };
      claimed.push(id);
      st.challengesClaimed.push(id);
      st.xp += ch.xp;
      st.rank = skydivingRankFor(st.xp);
      return { ok: true, id: ch.id, xp: ch.xp };
    },
    achievements() {
      return SKYDIVE_ACHIEVEMENTS.map((a) => ({ id: a.id, name: a.name, desc: a.desc, done: !!a.check(st) }));
    },
    donateFinds() {
      const ids = Object.keys(st.inventory);
      const donated = ids.reduce((sum, id) => sum + st.inventory[id], 0);
      st.inventory = {};
      return { ok: true, donated, finds: ids };
    },
    bundleSale() {
      const count = Object.values(st.inventory).reduce((a, b) => a + b, 0);
      if (count < 10) return { ok: false, reason: 'not-enough', have: count, need: 10 };
      let total = 0;
      Object.keys(st.inventory).forEach((id) => {
        total += skydivingPriceFor(id, st.dayDrift, st.rank, st.upgrades) * st.inventory[id];
      });
      total = Math.round(total * 1.1 * 10) / 10;
      st.inventory = {};
      st.findsSold += count;
      st.earned += total;
      st.dailyEarned += total;
      return { ok: true, total, count, bonus: 'bundle +10%' };
    },
    checkAltitude() {
      const max = skydivingAltitudeMax(st.upgrades);
      return { ok: true, resource: st.resource, max, name: 'altitude', percent: max ? Math.round((st.resource / max) * 100) : 0 };
    },
    repackRig() {
      st.resource = skydivingAltitudeMax(st.upgrades);
      return { ok: true, resource: st.resource, max: st.resource };
    },
    countFootage() {
      const count = Object.values(st.inventory).reduce((a, b) => a + b, 0);
      return { ok: true, count, total: count };
    },
    get helpers() { return hired.slice(); },
    get claimed() { return claimed.slice(); },
    get wagesPaid() { return wages; },
  };
}

export function createSkydivingMarket(system) {
  const st = system.state;
  let currentEvent = null;
  let currentSeason = st.season || 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  const priceOf = (itemId, basePrice) => {
    const em = currentEvent ? skydivingEventMult(currentEvent, itemId) : 1;
    const sm = skydivingSeasonMult(currentSeason);
    return Math.round(basePrice * em * sm * 10) / 10;
  };

  return {
    setEvent(id) {
      const ev = SKYDIVE_MARKET.find((m) => m.id === id);
      if (!ev) return { ok: false, reason: 'no-such-event' };
      currentEvent = id;
      st.event = id;
      return { ok: true, event: id };
    },
    setSeason(id) {
      const s = SKYDIVE_SEASONS.find((x) => x.id === id);
      if (!s) return { ok: false, reason: 'no-such-season' };
      currentSeason = id;
      st.season = id;
      return { ok: true, season: id };
    },
    eventPrice(itemId, basePrice) {
      return priceOf(itemId, basePrice);
    },
    bulkDeal(trickId, qty) {
      if (!qty || qty < 20) return { ok: false, reason: 'not-enough', qty: qty || 0, need: 20 };
      const held = st.inventory[trickId] || 0;
      if (held < qty) return { ok: false, reason: 'not-enough-held', have: held, need: qty };
      const t = trickById(trickId);
      if (!t) return { ok: false, reason: 'no-such-find' };
      const unit = priceOf(trickId, t.value);
      const total = Math.round(unit * qty * 1.1 * 10) / 10;
      st.inventory[trickId] = held - qty;
      if (st.inventory[trickId] <= 0) delete st.inventory[trickId];
      st.findsSold += qty;
      st.earned += total;
      st.dailyEarned += total;
      bulkTraded += qty;
      dealsClaimed += 1;
      return { ok: true, total, qty, unit, bonus: 'bulk +10%' };
    },
    dailyDeals() {
      return SKYDIVE_MARKET.map((m) => ({ id: m.id, name: m.name, finds: m.finds.slice(), mult: m.mult, desc: m.desc }));
    },
    marketSummary() {
      return { event: currentEvent, season: currentSeason, dealsClaimed, bulkTraded, deals: this.dailyDeals() };
    },
    get event() { return currentEvent; },
    get season() { return currentSeason; },
  };
}
