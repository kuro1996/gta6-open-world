export const BALLOON_ROUTES = [
  { id: 'sunrise-valley', name: 'Sunrise Valley', price: 40, difficulty: 1, steps: 6, duration: 150, risk: 0.1, altitude: 300, view: 3, desc: 'Golden light over a sleepy valley.' },
  { id: 'river-bend', name: 'River Bend', price: 35, difficulty: 1, steps: 5, duration: 130, risk: 0.1, altitude: 350, view: 2, desc: 'A slow river curling through fields.' },
  { id: 'vineyard-drift', name: 'Vineyard Drift', price: 55, difficulty: 2, steps: 8, duration: 180, risk: 0.2, altitude: 500, view: 4, desc: 'Neat vineyard rows under the basket.' },
  { id: 'lake-morning', name: 'Lake Morning', price: 45, difficulty: 2, steps: 7, duration: 160, risk: 0.2, altitude: 450, view: 3, desc: 'Mist rising off a still lake.' },
  { id: 'forest-canopy', name: 'Forest Canopy', price: 60, difficulty: 3, steps: 9, duration: 200, risk: 0.3, altitude: 700, view: 4, desc: 'Green treetops as far as the eye sees.' },
  { id: 'castle-view', name: 'Castle View', price: 75, difficulty: 3, steps: 10, duration: 220, risk: 0.3, altitude: 900, view: 5, desc: 'An old castle on its hill.' },
  { id: 'coast-breeze', name: 'Coast Breeze', price: 65, difficulty: 3, steps: 9, duration: 210, risk: 0.4, altitude: 800, view: 4, desc: 'Sea wind carries the balloon along cliffs.' },
  { id: 'desert-dawn', name: 'Desert Dawn', price: 70, difficulty: 4, steps: 10, duration: 230, risk: 0.4, altitude: 1100, view: 4, desc: 'Dunes glowing in first light.' },
  { id: 'mountain-pass', name: 'Mountain Pass', price: 85, difficulty: 4, steps: 11, duration: 250, risk: 0.5, altitude: 1400, view: 5, desc: 'Snow peaks on both sides of the pass.' },
  { id: 'festival-flight', name: 'Festival Flight', price: 95, difficulty: 5, steps: 12, duration: 280, risk: 0.5, altitude: 1500, view: 5, desc: 'Dozens of balloons rise together.' },
];

export const BALLOON_SIGHTS = [
  { id: 'red-roof', name: 'Red Roof', value: 6, rarity: 0.5, weight: 0.1, desc: 'A red roof spotted from above.' },
  { id: 'herd-deer', name: 'Herd of Deer', value: 10, rarity: 0.42, weight: 0.2, desc: 'Deer grazing in the meadow.' },
  { id: 'old-bridge', name: 'Old Bridge', value: 15, rarity: 0.34, weight: 0.3, desc: 'A stone bridge over the river.' },
  { id: 'vineyard-rows', name: 'Vineyard Rows', value: 22, rarity: 0.26, weight: 0.2, desc: 'Perfect rows of vines below.' },
  { id: 'waterfall', name: 'Waterfall', value: 34, rarity: 0.18, weight: 0.4, desc: 'White water falling off a cliff.' },
  { id: 'windmill', name: 'Windmill', value: 50, rarity: 0.13, weight: 0.5, desc: 'A turning windmill on a hill.' },
  { id: 'hot-spring', name: 'Hot Spring', value: 80, rarity: 0.08, weight: 0.3, desc: 'Steam rising from a hidden spring.' },
  { id: 'eagle', name: 'Golden Eagle', value: 120, rarity: 0.05, weight: 0.1, desc: 'An eagle soaring beside the basket.' },
  { id: 'lighthouse', name: 'Lighthouse', value: 200, rarity: 0.03, weight: 0.6, desc: 'A lighthouse beam at dawn.' },
  { id: 'castle-tower', name: 'Castle Tower', value: 350, rarity: 0.02, weight: 0.8, desc: 'The tallest tower of the castle.' },
];

export const BALLOON_UPGRADES = [
  { id: 'envelope', name: 'Pro Envelope', cost: 380, desc: 'A bigger envelope holds more fuel.', effect: 'fuel max +40' },
  { id: 'find-plus', name: 'Sight Spotter', cost: 250, desc: 'Spots rare sights more often.', effect: 'rare sight boost 1.25' },
  { id: 'price-plus', name: 'Photo License', cost: 300, desc: 'Sells sight photos for more cash.', effect: 'sell price +20%' },
  { id: 'carry-plus', name: 'Basket Rack', cost: 200, desc: 'Carry more photos per flight.', effect: 'carry cap +10' },
  { id: 'burner-pro', name: 'Pro Burner', cost: 330, desc: 'A stronger burner climbs faster.', effect: 'fuel use down' },
  { id: 'basket-lux', name: 'Luxury Basket', cost: 290, desc: 'Guests pay more to ride in style.', effect: 'flight value up' },
  { id: 'wind-meter', name: 'Wind Meter', cost: 170, desc: 'Reads the wind before launch.', effect: 'hazard down' },
  { id: 'camera-balloon', name: 'Balloon Camera', cost: 270, desc: 'Shoots every sight in 4K.', effect: 'sight value up' },
];

export const BALLOON_RANKS = [
  { level: 0, name: 'Basket Rookie', xp: 0, perk: 'Valley flights unlocked' },
  { level: 1, name: 'Drift Pilot', xp: 120, perk: 'Vineyard routes open up' },
  { level: 2, name: 'Cloud Cruiser', xp: 300, perk: 'Castle flights pay better' },
  { level: 3, name: 'Dawn Chaser', xp: 620, perk: 'Rare sights appear more often' },
  { level: 4, name: 'Sky Sovereign', xp: 1100, perk: 'The festival flight holds no fear' },
];

export const BALLOON_EVENTS = [
  { id: 'calm-air', name: 'Calm Air', desc: 'Still air, perfect for drifting.' },
  { id: 'balloon-fest', name: 'Balloon Fest', desc: 'Balloons fill the morning sky.' },
  { id: 'morning-fog', name: 'Morning Fog', desc: 'Fog hides the ground below.' },
  { id: 'tailwind', name: 'Tailwind', desc: 'A friendly wind pushes flights along.' },
  { id: 'headwind', name: 'Headwind', desc: 'A stiff wind fights the balloon.' },
  { id: 'sunrise-glow', name: 'Sunrise Glow', desc: 'The sky turns pink and gold.' },
  { id: 'harvest-view', name: 'Harvest View', desc: 'Fields turn gold below.' },
  { id: 'rain-shower', name: 'Rain Shower', desc: 'A light shower passes through.' },
  { id: 'new-envelope', name: 'New Envelope', desc: 'A bright new envelope arrives.' },
  { id: 'eagle-day', name: 'Eagle Day', desc: 'Eagles circle the balloons.' },
];

export const BALLOON_CONTRACTS = [
  { id: 'roof-order', name: 'Roof Photos', material: 'red-roof', qty: 6, pay: 120, days: 3, rep: 10, desc: 'A postcard firm wants roof photos.' },
  { id: 'waterfall-order', name: 'Waterfall Photos', material: 'waterfall', qty: 3, pay: 260, days: 4, rep: 20, desc: 'A travel guide wants waterfalls.' },
  { id: 'windmill-order', name: 'Windmill Photos', material: 'windmill', qty: 2, pay: 350, days: 4, rep: 25, desc: 'A museum wants windmill shots.' },
  { id: 'eagle-order', name: 'Eagle Photos', material: 'eagle', qty: 2, pay: 500, days: 5, rep: 30, desc: 'A wildlife book wants eagles.' },
  { id: 'bridge-order', name: 'Bridge Photos', material: 'old-bridge', qty: 5, pay: 190, days: 3, rep: 15, desc: 'A history blog wants bridges.' },
  { id: 'tower-order', name: 'Tower Photos', material: 'castle-tower', qty: 1, pay: 650, days: 5, rep: 35, desc: 'A castle trust wants one tower shot.' },
];

export const BALLOON_CHALLENGES = [
  { id: 'first-flight', name: 'First Flight', target: 'sessions', goal: 1, xp: 20, desc: 'Finish one balloon flight.' },
  { id: 'five-flights', name: 'Five Flights', target: 'sessions', goal: 5, xp: 60, desc: 'Finish five balloon flights.' },
  { id: 'sight-ten', name: 'Sight Ten', target: 'findsFound', goal: 10, xp: 40, desc: 'Spot ten sights.' },
  { id: 'sight-fifty', name: 'Sight Fifty', target: 'findsFound', goal: 50, xp: 120, desc: 'Spot fifty sights.' },
  { id: 'earn-five-hundred', name: 'Earn Five Hundred', target: 'earned', goal: 500, xp: 100, desc: 'Earn 500 cash in total.' },
  { id: 'sell-twenty', name: 'Sell Twenty', target: 'findsSold', goal: 20, xp: 80, desc: 'Sell twenty photos.' },
  { id: 'contract-three', name: 'Contract Three', target: 'contractsDone', goal: 3, xp: 90, desc: 'Deliver three contracts.' },
  { id: 'steps-hundred', name: 'Hundred Steps', target: 'stepsDone', goal: 100, xp: 110, desc: 'Take a hundred flight steps.' },
];

export const BALLOON_ACHIEVEMENTS = [
  { id: 'off-ground', name: 'Off the Ground', check: (s) => s.sessions >= 1, desc: 'Finish your first flight.' },
  { id: 'sky-regular', name: 'Sky Regular', check: (s) => s.sessions >= 10, desc: 'Finish ten flights.' },
  { id: 'spotter', name: 'Spotter', check: (s) => s.findsFound >= 25, desc: 'Spot twenty-five sights.' },
  { id: 'eagle-eye', name: 'Eagle Eye', check: (s) => s.findsFound >= 100, desc: 'Spot a hundred sights.' },
  { id: 'rich-pilot', name: 'Rich Pilot', check: (s) => s.earned >= 1000, desc: 'Earn a thousand cash.' },
  { id: 'deal-maker', name: 'Deal Maker', check: (s) => s.contractsDone >= 5, desc: 'Deliver five contracts.' },
  { id: 'streak-five', name: 'Streak Five', check: (s) => s.bestStreak >= 5, desc: 'Reach a streak of five.' },
  { id: 'sky-master', name: 'Sky Master', check: (s) => s.rank >= 4, desc: 'Reach the top rank.' },
];

export const BALLOON_TIPS = [
  { id: 'tip-fuel', name: 'Watch Fuel', text: 'Land before your fuel runs out.' },
  { id: 'tip-rare', name: 'Rare Sights', text: 'High routes hide the rarest sights.' },
  { id: 'tip-rank', name: 'Rank Up', text: 'Higher rank boosts rare sights.' },
  { id: 'tip-sell', name: 'Sell Often', text: 'Sell photos before the drift turns.' },
  { id: 'tip-contract', name: 'Contracts Pay', text: 'Contracts pay more than raw sales.' },
  { id: 'tip-weather', name: 'Storm Watch', text: 'Storms and hurricanes block flights.' },
  { id: 'tip-cap', name: 'Carry Cap', text: 'Upgrade your rack to carry more.' },
  { id: 'tip-season', name: 'Season Prices', text: 'Spring prices beat winter prices.' },
];

export const BALLOON_LEADERBOARD = [
  { name: 'Bree', value: 880, desc: 'Top pilot of the season.' },
  { name: 'Gustav', value: 690, desc: 'Old hand of the dawn flights.' },
  { name: 'Luna', value: 520, desc: 'Festival queen of the sky.' },
  { name: 'Pip', value: 290, desc: 'Steady pilot, steady hands.' },
  { name: 'You', value: 0, desc: 'Your score on the board.' },
];

export const BALLOON_RECORDS = [
  { id: 'most-flights', name: 'Most Flights', stat: 'sessions', unit: 'flights', desc: 'Most flight sessions finished.' },
  { id: 'most-sights', name: 'Most Sights', stat: 'findsFound', unit: 'sights', desc: 'Most sights spotted.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'cash', desc: 'Most cash earned.' },
  { id: 'best-yield', name: 'Best Yield', stat: 'bestSessionYield', unit: 'cash', desc: 'Best single flight yield.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'streak', desc: 'Longest good streak.' },
];

export const BALLOON_MARKET = [
  { id: 'photo-shop', name: 'Photo Shop', finds: ['red-roof', 'herd-deer', 'old-bridge'], mult: 1.1, desc: 'Buys common sight photos.' },
  { id: 'travel-guide', name: 'Travel Guide', finds: ['waterfall', 'vineyard-rows'], mult: 1.25, desc: 'Pays well for travel shots.' },
  { id: 'windmill-museum', name: 'Windmill Museum', finds: ['windmill'], mult: 1.4, desc: 'Top price for windmills.' },
  { id: 'eagle-book', name: 'Eagle Book', finds: ['eagle'], mult: 1.5, desc: 'Best buyer for eagle photos.' },
  { id: 'castle-trust', name: 'Castle Trust', finds: ['castle-tower', 'lighthouse'], mult: 1.6, desc: 'Pays a premium for towers.' },
  { id: 'postcard-firm', name: 'Postcard Firm', finds: ['red-roof', 'waterfall'], mult: 1.3, desc: 'Buys postcard shots.' },
  { id: 'tourist-stall', name: 'Tourist Stall', finds: ['red-roof', 'herd-deer'], mult: 1.05, desc: 'Quick sales to tourists.' },
  { id: 'rare-buyer', name: 'Rare Buyer', finds: ['castle-tower', 'eagle', 'lighthouse'], mult: 1.45, desc: 'Buys only the rarest photos.' },
];

export const BALLOON_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1, desc: 'Mild air, best prices.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Warm air, steady prices.' },
  { id: 'autumn', name: 'Autumn', mult: 0.95, desc: 'Cooling air, softer prices.' },
  { id: 'winter', name: 'Winter', mult: 0.8, desc: 'Cold air, lowest prices.' },
];

export const BALLOON_SEASONAL = [
  { season: 'spring', find: 'eagle', mult: 1.3 },
  { season: 'spring', find: 'red-roof', mult: 1.2 },
  { season: 'summer', find: 'waterfall', mult: 1.2 },
  { season: 'summer', find: 'herd-deer', mult: 1.15 },
  { season: 'autumn', find: 'lighthouse', mult: 1.25 },
  { season: 'autumn', find: 'windmill', mult: 1.1 },
  { season: 'winter', find: 'castle-tower', mult: 1.4 },
  { season: 'winter', find: 'hot-spring', mult: 1.2 },
];

export const BALLOON_QUICK_START = [
  'Launch the Sunrise Valley route.',
  'Drift and spot sights until fuel runs low.',
  'Sell photos at the Photo Shop.',
  'Buy the Basket Rack upgrade early.',
  'Take a roof photos contract.',
  'Save up for the Pro Envelope.',
];

export const BALLOON_HELPERS = [
  { id: 'pilot-mate', name: 'Pilot Mate', wage: 25, skill: 'piloting', bonus: 0.15, desc: 'A second pair of hands in the basket.' },
  { id: 'navigator', name: 'Navigator', wage: 35, skill: 'navigation', bonus: 0.2, desc: 'Reads wind and maps by heart.' },
  { id: 'photographer', name: 'Photographer', wage: 30, skill: 'photography', bonus: 0.15, desc: 'Shoots sights buyers love.' },
  { id: 'host', name: 'Flight Host', wage: 20, skill: 'hospitality', bonus: 0.1, desc: 'Keeps guests happy aloft.' },
];

export const HOTAIRBALLOON_META = { system: 'balloon', version: '7c-B2', author: 'builder-2', dataCount: 10, findCount: 10, upgradeCount: 8, rankCount: 5 };

function routeById(id) {
  let found = null;
  BALLOON_ROUTES.forEach((r) => { if (r.id === id) found = r; });
  return found;
}

function sightById(id) {
  let found = null;
  for (const s of BALLOON_SIGHTS) {
    if (s.id === id) { found = s; break; }
  }
  return found;
}

function ownedList(v) {
  if (Array.isArray(v)) return v;
  if (v && Array.isArray(v.upgrades)) return v.upgrades;
  return [];
}

function rankOf(v) {
  if (typeof v === 'number') return v;
  if (v && typeof v.rank === 'number') return v.rank;
  return 0;
}

export function balloonRankFor(xp) {
  let lvl = 0;
  for (let i = 0; i < BALLOON_RANKS.length; i++) {
    if (xp >= BALLOON_RANKS[i].xp) lvl = BALLOON_RANKS[i].level;
  }
  return lvl;
}

export function balloonFuelMax(upgrades) {
  const list = ownedList(upgrades);
  return list.includes('envelope') ? 140 : 100;
}

export function balloonPriceFor(sightId, drift, rank, upgrades) {
  const s = sightById(sightId);
  if (!s) return 0;
  const d = typeof drift === 'number' ? drift : 0;
  const rk = rankOf(rank);
  const owned = Array.isArray(upgrades) ? upgrades : ownedList(rank);
  let p = s.value * (1 + d) * (1 + rk * 0.1);
  if (owned.includes('price-plus')) p = p * 1.2;
  if (p < 1) p = 1;
  return Math.round(p * 10) / 10;
}

export function balloonCarryCap(rank, upgrades) {
  const owned = Array.isArray(upgrades) ? upgrades : ownedList(rank);
  let cap = 15 + rankOf(rank) * 2;
  if (owned.includes('carry-plus')) cap = cap + 10;
  return cap;
}

export function balloonScore(sessions, yld, hazards) {
  const raw = sessions * 10 + Math.round(yld) - hazards * 5;
  if (raw < 0) return 0;
  return raw;
}

export function balloonGrade(score) {
  switch (true) {
    case score >= 400: return 'S';
    case score >= 250: return 'A';
    case score >= 140: return 'B';
    case score >= 60: return 'C';
    default: return 'D';
  }
}

export function balloonWeeklyGoal(state) {
  const s = state || {};
  const mk = (have, goal) => ({ have, goal, done: have >= goal });
  const sessions = mk(s.sessions || 0, 5);
  const sold = mk(s.findsSold || 0, 40);
  const earned = mk(s.earned || 0, 600);
  const allDone = sessions.done && sold.done && earned.done;
  return { sessions, sold, earned, allDone };
}

export function balloonEfficiency(state) {
  const s = state || {};
  if (!s.sessions) return 100;
  const good = s.sessions - (s.contractsFailed || 0);
  return Math.round((Math.max(0, good) / s.sessions) * 100);
}

export function balloonProfitPerFlight(state) {
  const s = state || {};
  if (!s.sessions) return 0;
  return Math.round(((s.earned || 0) / s.sessions) * 10) / 10;
}

export function balloonInventoryValue(state) {
  const s = state || {};
  let total = 0;
  for (const id in (s.inventory || {})) {
    total += (s.inventory[id] || 0) * balloonPriceFor(id, s.dayDrift || 0, s.rank || 0, s.upgrades || []);
  }
  return Math.round(total * 10) / 10;
}

export function balloonSummary(state) {
  const s = state || {};
  const rn = (BALLOON_RANKS[s.rank || 0] || {}).name || 'Basket Rookie';
  return 'balloon: ' + rn + ' with ' + (s.sessions || 0) + ' flights, ' + (s.findsFound || 0) + ' sights and ' + (s.earned || 0) + ' cash earned.';
}

export function balloonNextGoal(state) {
  const s = state || {};
  if (!(s.sessions || 0)) return 'Finish your first flight.';
  if ((s.sessions || 0) < 5) return 'Finish 5 flights.';
  if ((s.earned || 0) < 500) return 'Earn 500 cash in total.';
  if ((s.rank || 0) < 4) return 'Reach rank ' + BALLOON_RANKS[(s.rank || 0) + 1].name + '.';
  return 'Become a legend of balloon.';
}

export function balloonRecordFor(id, state) {
  let rec = null;
  for (const r of BALLOON_RECORDS) if (r.id === id) rec = r;
  if (!rec) return null;
  return { id: rec.id, name: rec.name, stat: rec.stat, unit: rec.unit, desc: rec.desc, value: (state && state[rec.stat]) || 0 };
}

export function balloonAllRecords(state) {
  const out = [];
  for (const r of BALLOON_RECORDS) out.push(balloonRecordFor(r.id, state));
  return out;
}

export function balloonLeaderboardWith(playerScore) {
  const board = [];
  for (const e of BALLOON_LEADERBOARD) {
    board.push({ name: e.name, value: e.name === 'You' ? playerScore : e.value, desc: e.desc });
  }
  board.sort((a, b) => b.value - a.value);
  const ranked = [];
  board.forEach((e, i) => ranked.push({ rank: i + 1, name: e.name, value: e.value, desc: e.desc }));
  return ranked;
}

export function balloonEventFor(day) {
  const idx = ((day || 0) % BALLOON_MARKET.length + BALLOON_MARKET.length) % BALLOON_MARKET.length;
  return BALLOON_MARKET[idx];
}

export function balloonEventMult(eventId, sightId) {
  let ev = null;
  for (const m of BALLOON_MARKET) if (m.id === eventId) ev = m;
  if (!ev) return 1;
  return ev.finds.includes(sightId) ? ev.mult : 1;
}

export function balloonSeasonMult(seasonId) {
  let found = null;
  for (const s of BALLOON_SEASONS) if (s.id === seasonId) found = s;
  return found ? found.mult : 1;
}

export function balloonSeasonalPriceMult(seasonId, sightId) {
  for (const row of BALLOON_SEASONAL) {
    if (row.season === seasonId && row.find === sightId) return row.mult;
  }
  return 1;
}

export function balloonBestBuyer() {
  let best = BALLOON_MARKET[0];
  for (let i = 1; i < BALLOON_MARKET.length; i++) {
    if (BALLOON_MARKET[i].mult > best.mult) best = BALLOON_MARKET[i];
  }
  return best;
}

export function balloonBestSeason() {
  let best = BALLOON_SEASONS[0];
  for (let i = 1; i < BALLOON_SEASONS.length; i++) {
    if (BALLOON_SEASONS[i].mult > best.mult) best = BALLOON_SEASONS[i];
  }
  return best;
}

export function balloonTipFor(day) {
  const idx = ((day || 0) % BALLOON_TIPS.length + BALLOON_TIPS.length) % BALLOON_TIPS.length;
  return BALLOON_TIPS[idx];
}

export function balloonQuickStart() {
  return BALLOON_QUICK_START.slice();
}

export function balloonChallengeProgress(challenge, state) {
  const have = (state && state[challenge.target]) || 0;
  return { id: challenge.id, name: challenge.name, have, goal: challenge.goal, done: have >= challenge.goal, xp: challenge.xp };
}

export function balloonProgressPercent(state) {
  const s = state || {};
  if (!s.sessions) return 0;
  return Math.round((Math.max(0, s.sessions - (s.contractsFailed || 0)) / s.sessions) * 100);
}

export function balloonTotalValue(state) {
  const s = state || {};
  return Math.round((balloonInventoryValue(s) + (s.earned || 0)) * 10) / 10;
}

export function balloonHelperBonus(helperIds, skill) {
  let sum = 0;
  for (const id of (helperIds || [])) {
    for (const h of BALLOON_HELPERS) {
      if (h.id === id && h.skill === skill) sum += h.bonus;
    }
  }
  return sum;
}

export function balloonSightsByRarity(maxRarity) {
  const out = [];
  for (const s of BALLOON_SIGHTS) if (s.rarity <= maxRarity) out.push(s.id);
  return out;
}

export function balloonRouteByAltitude(altitude) {
  let pick = BALLOON_ROUTES[BALLOON_ROUTES.length - 1];
  for (const r of BALLOON_ROUTES) {
    if (r.altitude >= altitude) { pick = r; break; }
  }
  return pick;
}

function newBalloonState() {
  return {
    xp: 0, rank: 0, sessions: 0, actions: 0, stepsDone: 0, earned: 0, spent: 0,
    findsFound: 0, findsSold: 0, contractsDone: 0, contractsFailed: 0, hazardsTaken: 0,
    heatGained: 0, inventory: {}, upgrades: [], activeContract: null, contractProgress: 0,
    contractDeadline: null, session: null, sessionStepsLeft: 0, sessionTimeLeft: 0,
    resource: 0, dayDrift: 0, lastDay: 1, bestSession: null, bestSessionYield: 0,
    dailyEarned: 0, dailySessions: 0, totalYield: 0, bestStreak: 0, streak: 0,
    specialsUsed: 0, weatherStops: 0, sessionYield: 0, sessionFinds: [], season: 'spring',
    event: null, wagesPaid: 0, challengesClaimed: [],
  };
}

export function createHotAirBalloonSystem(ctx) {
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
  const state = newBalloonState();

  function syncRank() {
    const lvl = balloonRankFor(state.xp);
    if (lvl > state.rank) log('Rank up: ' + BALLOON_RANKS[lvl].name);
    state.rank = lvl;
  }

  function endFlight() {
    const yld = state.sessionYield;
    const rid = state.session;
    state.totalYield += yld;
    if (yld > state.bestSessionYield) {
      state.bestSessionYield = yld;
      state.bestSession = rid;
    }
    if (yld > 0) {
      state.streak = state.streak + 1;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    } else {
      state.streak = 0;
    }
    state.session = null;
    state.sessionStepsLeft = 0;
    state.sessionTimeLeft = 0;
  }

  function todaysEvent() {
    const roll = rng();
    if (roll < 0.16) {
      state.dayDrift = Math.round((state.dayDrift + 0.3) * 100) / 100;
      state.event = 'demand-spike';
      return { ok: true, event: 'demand-spike', name: 'Demand Spike', kind: 'demand' };
    } else if (roll < 0.28) {
      state.dayDrift = Math.round((state.dayDrift - 0.15) * 100) / 100;
      state.event = 'price-dip';
      return { ok: true, event: 'price-dip', name: 'Price Dip', kind: 'dip' };
    } else if (roll < 0.38) {
      const pick = BALLOON_SIGHTS[Math.floor(rng() * BALLOON_SIGHTS.length)];
      state.inventory[pick.id] = (state.inventory[pick.id] || 0) + 3;
      state.findsFound += 3;
      state.event = 'gift';
      return { ok: true, event: 'gift', name: 'Gift', kind: 'gift', find: pick.id, qty: 3 };
    } else if (roll < 0.46) {
      const ev = BALLOON_EVENTS[Math.floor(rng() * BALLOON_EVENTS.length)];
      state.event = ev.id;
      return { ok: true, event: ev.id, name: ev.name, kind: 'named' };
    }
    state.event = null;
    return { ok: true, event: null, name: 'none', kind: 'none' };
  }

  const sys = {
    name: 'balloon',
    state,
    launch(routeId) {
      const route = routeById(routeId);
      if (!route) return { ok: false, reason: 'no-such-site' };
      if (state.session) return { ok: false, reason: 'already-in-session' };
      const cond = (getWeather() || {}).condition || 'clear';
      if (cond === 'storm' || cond === 'hurricane') {
        state.weatherStops += 1;
        return { ok: false, reason: 'bad-weather', condition: cond };
      }
      const hour = getHour();
      if (hour < 5 || hour >= 12) return { ok: false, reason: 'closed', hour };
      if (getCash() < route.price) return { ok: false, reason: 'not-enough-cash', cost: route.price };
      addCash(-route.price);
      state.spent += route.price;
      state.session = route.id;
      state.sessionStepsLeft = route.steps;
      state.sessionTimeLeft = route.duration;
      state.resource = balloonFuelMax(state.upgrades);
      state.sessionYield = 0;
      state.sessionFinds = [];
      state.sessions += 1;
      state.dailySessions += 1;
      log('Launching on ' + route.name);
      return { ok: true, id: route.id, name: route.name, price: route.price, steps: route.steps, duration: route.duration };
    },
    drift() {
      if (!state.session) return { ok: false, reason: 'no-session' };
      const route = routeById(state.session);
      state.resource -= 10;
      state.sessionStepsLeft -= 1;
      state.stepsDone += 1;
      state.actions += 1;
      let held = 0;
      for (const k in state.inventory) held += state.inventory[k];
      const cap = balloonCarryCap(state.rank, state.upgrades);
      let qty = 1 + Math.floor(rng() * 3);
      if (held + qty > cap) qty = cap - held;
      let sight = null;
      let bonus = false;
      let hazard = false;
      if (qty > 0) {
        const weights = [];
        let total = 0;
        for (const s of BALLOON_SIGHTS) {
          let w = 1 / s.rarity;
          if (s.rarity < 0.08 && state.rank >= 3) w *= 1.6;
          if (s.rarity < 0.08 && state.upgrades.includes('find-plus')) w *= 1.25;
          weights.push(w);
          total += w;
        }
        let roll = rng() * total;
        let idx = BALLOON_SIGHTS.length - 1;
        for (let i = 0; i < weights.length; i++) {
          roll -= weights[i];
          if (roll <= 0) { idx = i; break; }
        }
        sight = BALLOON_SIGHTS[idx];
        if (rng() < 0.04) { qty += 1; bonus = true; }
        state.inventory[sight.id] = (state.inventory[sight.id] || 0) + qty;
        state.findsFound += qty;
        state.sessionFinds.push(sight.id);
        state.sessionYield += qty * sight.value;
      }
      if (route && rng() < route.risk * 0.04) {
        hazard = true;
        state.hazardsTaken += 1;
        if (rng() < 0.3) addCash(-20);
      }
      let ended = false;
      if (state.resource <= 0 || state.sessionStepsLeft <= 0) {
        if (state.resource < 0) state.resource = 0;
        endFlight();
        ended = true;
      }
      return { ok: true, find: sight ? { id: sight.id, name: sight.name, qty } : null, qty, bonus, hazard, stepsLeft: state.sessionStepsLeft, resource: state.resource, ended };
    },
    landEarly() {
      if (!state.session) return { ok: false, reason: 'no-session' };
      const id = state.session;
      endFlight();
      log('Landed early from ' + id);
      return { ok: true, id, yield: state.totalYield };
    },
    spotLandmark() {
      const route = state.session ? routeById(state.session) : null;
      return { ok: true, site: route ? route.id : null, siteName: route ? route.name : null, weather: (getWeather() || {}).condition || 'clear', hour: getHour(), resource: state.resource, resourceMax: balloonFuelMax(state.upgrades), stepsLeft: state.sessionStepsLeft };
    },
    sellFind(sightId) {
      const s = sightById(sightId);
      if (!s) return { ok: false, reason: 'no-such-find' };
      const held = state.inventory[sightId] || 0;
      if (held <= 0) return { ok: false, reason: 'not-held', id: sightId };
      const price = balloonPriceFor(sightId, state.dayDrift, state.rank, state.upgrades);
      state.inventory[sightId] = held - 1;
      if (state.inventory[sightId] <= 0) delete state.inventory[sightId];
      state.findsSold += 1;
      state.earned += price;
      state.dailyEarned += price;
      addCash(price);
      return { ok: true, id: sightId, name: s.name, qty: 1, price, total: price };
    },
    sellAllFinds() {
      const ids = Object.keys(state.inventory);
      if (ids.length === 0) return { ok: false, reason: 'nothing-held' };
      let total = 0;
      let count = 0;
      for (const id of ids) {
        total += balloonPriceFor(id, state.dayDrift, state.rank, state.upgrades) * state.inventory[id];
        count += state.inventory[id];
      }
      total = Math.round(total * 10) / 10;
      state.inventory = {};
      state.findsSold += count;
      state.earned += total;
      state.dailyEarned += total;
      addCash(total);
      return { ok: true, total, sold: count, count };
    },
    buyUpgrade(upId) {
      let up = null;
      for (const u of BALLOON_UPGRADES) if (u.id === upId) up = u;
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
      let ct = null;
      for (const x of BALLOON_CONTRACTS) if (x.id === contractId) ct = x;
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
      let ct = null;
      for (const x of BALLOON_CONTRACTS) if (x.id === state.activeContract) ct = x;
      const have = state.inventory[ct.material] || 0;
      if (have < ct.qty) return { ok: false, reason: 'not-enough', have, need: ct.qty, material: ct.material };
      state.inventory[ct.material] = have - ct.qty;
      if (state.inventory[ct.material] <= 0) delete state.inventory[ct.material];
      state.contractsDone += 1;
      state.earned += ct.pay;
      state.dailyEarned += ct.pay;
      addCash(ct.pay);
      state.xp += ct.rep;
      syncRank();
      const done = ct;
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractDeadline = null;
      return { ok: true, id: done.id, name: done.name, pay: done.pay, rep: done.rep };
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
      const rows = [];
      for (const s of BALLOON_SIGHTS) {
        rows.push({ id: s.id, name: s.name, price: balloonPriceFor(s.id, state.dayDrift, state.rank, state.upgrades), base: s.value, drift: state.dayDrift, held: state.inventory[s.id] || 0 });
      }
      return rows;
    },
    siteReport(routeId) {
      const route = routeById(routeId);
      if (!route) return { ok: false, reason: 'no-such-site' };
      return { ok: true, id: route.id, name: route.name, price: route.price, difficulty: route.difficulty, steps: route.steps, duration: route.duration, risk: route.risk, altitude: route.altitude, view: route.view, desc: route.desc };
    },
    dailyEvent() {
      return todaysEvent();
    },
    tick(dt) {
      if (!state.session) return;
      state.sessionTimeLeft -= dt;
      state.resource -= dt * 0.05;
      if (state.sessionTimeLeft <= 0 || state.resource <= 0) {
        if (state.resource < 0) state.resource = 0;
        if (state.sessionTimeLeft < 0) state.sessionTimeLeft = 0;
        endFlight();
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
      return todaysEvent();
    },
    serialize() {
      return JSON.parse(JSON.stringify(state));
    },
    deserialize(saved) {
      if (!saved || typeof saved !== 'object') return;
      for (const k of Object.keys(saved)) state[k] = saved[k];
      if (!state.inventory || typeof state.inventory !== 'object') state.inventory = {};
      if (!Array.isArray(state.upgrades)) state.upgrades = [];
      if (!Array.isArray(state.sessionFinds)) state.sessionFinds = [];
      if (!Array.isArray(state.challengesClaimed)) state.challengesClaimed = [];
      if (typeof state.wagesPaid !== 'number') state.wagesPaid = 0;
      syncRank();
    },
    stats() {
      const rn = (BALLOON_RANKS[state.rank] || {}).name || 'Basket Rookie';
      return { rank: rn, xp: state.xp, sessions: state.sessions, actions: state.actions, stepsDone: state.stepsDone, earned: state.earned, spent: state.spent, findsFound: state.findsFound, findsSold: state.findsSold, contractsDone: state.contractsDone, contractsFailed: state.contractsFailed, hazardsTaken: state.hazardsTaken, heatGained: state.heatGained, upgrades: state.upgrades.length, activeContract: state.activeContract, contractProgress: state.contractProgress, session: state.session, stepsLeft: state.sessionStepsLeft, resource: state.resource, resourceMax: balloonFuelMax(state.upgrades), dailyEarned: state.dailyEarned, totalYield: state.totalYield, bestStreak: state.bestStreak, bestSession: state.bestSession, bestSessionYield: state.bestSessionYield, specialsUsed: state.specialsUsed, weatherStops: state.weatherStops, season: state.season, event: state.event };
    },
    hudLine() {
      if (!state.session) return '';
      return 'balloon: ' + state.session + ' — ' + state.sessionStepsLeft + ' steps left, fuel ' + state.resource;
    },
    interact() {
      const pos = getPlayerPos() || { x: 0, z: 0 };
      const dx = pos.x - 200;
      const dz = pos.z - 150;
      if (Math.sqrt(dx * dx + dz * dz) > 30) return false;
      if (state.session) { sys.drift(); return true; }
      let held = 0;
      for (const k in state.inventory) held += state.inventory[k];
      if (held > 0) { sys.sellAllFinds(); return true; }
      sys.launch(BALLOON_ROUTES[0].id);
      return true;
    },
  };
  return sys;
}

export function createHotAirBalloonExtras(system) {
  const st = system.state;
  let hired = [];
  let claimed = [];
  let wages = 0;

  function bonusFor(skill) {
    let sum = 0;
    for (const id of hired) {
      for (const h of BALLOON_HELPERS) {
        if (h.id === id && h.skill === skill) sum += h.bonus;
      }
    }
    return sum;
  }

  return {
    hireHelper(id) {
      let h = null;
      for (const x of BALLOON_HELPERS) if (x.id === id) h = x;
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
      for (const id of hired) {
        for (const h of BALLOON_HELPERS) if (h.id === id) due += h.wage;
      }
      wages += due;
      st.wagesPaid = (st.wagesPaid || 0) + due;
      return { ok: true, due, helpers: hired.length, totalPaid: due };
    },
    helperBonus(skill) {
      return bonusFor(skill);
    },
    challenges() {
      const out = [];
      for (const ch of BALLOON_CHALLENGES) out.push(balloonChallengeProgress(ch, st));
      return out;
    },
    claimChallenge(id) {
      let ch = null;
      for (const x of BALLOON_CHALLENGES) if (x.id === id) ch = x;
      if (!ch) return { ok: false, reason: 'no-such-challenge' };
      if (claimed.includes(id)) return { ok: false, reason: 'already-claimed', id };
      const prog = balloonChallengeProgress(ch, st);
      if (!prog.done) return { ok: false, reason: 'not-done', have: prog.have, goal: prog.goal };
      claimed.push(id);
      st.challengesClaimed.push(id);
      st.xp += ch.xp;
      st.rank = balloonRankFor(st.xp);
      return { ok: true, id: ch.id, xp: ch.xp };
    },
    achievements() {
      const out = [];
      for (const a of BALLOON_ACHIEVEMENTS) out.push({ id: a.id, name: a.name, desc: a.desc, done: !!a.check(st) });
      return out;
    },
    donateFinds() {
      const ids = Object.keys(st.inventory);
      let donated = 0;
      for (const id of ids) donated += st.inventory[id];
      st.inventory = {};
      return { ok: true, donated, finds: ids };
    },
    bundleSale() {
      let count = 0;
      for (const k in st.inventory) count += st.inventory[k];
      if (count < 10) return { ok: false, reason: 'not-enough', have: count, need: 10 };
      let total = 0;
      for (const id in st.inventory) total += balloonPriceFor(id, st.dayDrift, st.rank, st.upgrades) * st.inventory[id];
      total = Math.round(total * 1.1 * 10) / 10;
      st.inventory = {};
      st.findsSold += count;
      st.earned += total;
      st.dailyEarned += total;
      return { ok: true, total, count, bonus: 'bundle +10%' };
    },
    checkFuel() {
      const max = balloonFuelMax(st.upgrades);
      return { ok: true, resource: st.resource, max, name: 'fuel', percent: max ? Math.round((st.resource / max) * 100) : 0 };
    },
    refillFuel() {
      st.resource = balloonFuelMax(st.upgrades);
      return { ok: true, resource: st.resource, max: st.resource };
    },
    countSights() {
      let count = 0;
      for (const k in st.inventory) count += st.inventory[k];
      return { ok: true, count, total: count };
    },
    get helpers() { return hired.slice(); },
    get claimed() { return claimed.slice(); },
    get wagesPaid() { return wages; },
  };
}

export function createHotAirBalloonMarket(system) {
  const st = system.state;
  let currentEvent = null;
  let currentSeason = st.season || 'spring';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  function priced(itemId, basePrice) {
    const em = currentEvent ? balloonEventMult(currentEvent, itemId) : 1;
    const sm = balloonSeasonMult(currentSeason);
    return Math.round(basePrice * em * sm * 10) / 10;
  }

  return {
    setEvent(id) {
      let ev = null;
      for (const m of BALLOON_MARKET) if (m.id === id) ev = m;
      if (!ev) return { ok: false, reason: 'no-such-event' };
      currentEvent = id;
      st.event = id;
      return { ok: true, event: id };
    },
    setSeason(id) {
      let s = null;
      for (const x of BALLOON_SEASONS) if (x.id === id) s = x;
      if (!s) return { ok: false, reason: 'no-such-season' };
      currentSeason = id;
      st.season = id;
      return { ok: true, season: id };
    },
    eventPrice(itemId, basePrice) {
      return priced(itemId, basePrice);
    },
    bulkDeal(sightId, qty) {
      if (!qty || qty < 20) return { ok: false, reason: 'not-enough', qty: qty || 0, need: 20 };
      const held = st.inventory[sightId] || 0;
      if (held < qty) return { ok: false, reason: 'not-enough-held', have: held, need: qty };
      const s = sightById(sightId);
      if (!s) return { ok: false, reason: 'no-such-find' };
      const unit = priced(sightId, s.value);
      const total = Math.round(unit * qty * 1.1 * 10) / 10;
      st.inventory[sightId] = held - qty;
      if (st.inventory[sightId] <= 0) delete st.inventory[sightId];
      st.findsSold += qty;
      st.earned += total;
      st.dailyEarned += total;
      bulkTraded += qty;
      dealsClaimed += 1;
      return { ok: true, total, qty, unit, bonus: 'bulk +10%' };
    },
    dailyDeals() {
      const out = [];
      for (const m of BALLOON_MARKET) out.push({ id: m.id, name: m.name, finds: m.finds.slice(), mult: m.mult, desc: m.desc });
      return out;
    },
    marketSummary() {
      return { event: currentEvent, season: currentSeason, dealsClaimed, bulkTraded, deals: this.dailyDeals() };
    },
    get event() { return currentEvent; },
    get season() { return currentSeason; },
  };
}
