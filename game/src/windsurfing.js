export const WINDSURF_SPOTS = [
  { id: 'calm-bay', name: 'Calm Bay', fee: 15, difficulty: 1, steps: 5, duration: 110, risk: 0.1, wind: 5, wave: 1, desc: 'Flat water for first rides.' },
  { id: 'breeze-beach', name: 'Breeze Beach', fee: 20, difficulty: 1, steps: 6, duration: 120, risk: 0.1, wind: 8, wave: 1, desc: 'A steady breeze over the sand.' },
  { id: 'lagoon', name: 'Lagoon', fee: 30, difficulty: 2, steps: 7, duration: 140, risk: 0.2, wind: 12, wave: 2, desc: 'Warm shallow water in the lagoon.' },
  { id: 'trade-winds', name: 'Trade Winds', fee: 35, difficulty: 2, steps: 8, duration: 150, risk: 0.2, wind: 15, wave: 2, desc: 'Reliable trade winds all day.' },
  { id: 'reef-break', name: 'Reef Break', fee: 45, difficulty: 3, steps: 9, duration: 180, risk: 0.3, wind: 18, wave: 3, desc: 'Waves break over the reef.' },
  { id: 'point-break', name: 'Point Break', fee: 55, difficulty: 3, steps: 9, duration: 190, risk: 0.4, wind: 20, wave: 3, desc: 'A long point break for big rides.' },
  { id: 'cliff-winds', name: 'Cliff Winds', fee: 60, difficulty: 3, steps: 10, duration: 200, risk: 0.4, wind: 22, wave: 4, desc: 'Wind funnels past the cliffs.' },
  { id: 'open-sea', name: 'Open Sea', fee: 70, difficulty: 4, steps: 10, duration: 220, risk: 0.5, wind: 25, wave: 4, desc: 'Open sea swells and strong wind.' },
  { id: 'storm-surf', name: 'Storm Surf', fee: 80, difficulty: 4, steps: 11, duration: 240, risk: 0.5, wind: 28, wave: 5, desc: 'Storm swells for brave riders.' },
  { id: 'sunset-surf', name: 'Sunset Surf', fee: 90, difficulty: 5, steps: 12, duration: 260, risk: 0.5, wind: 30, wave: 5, desc: 'The famous sunset surf session.' },
];

export const WINDSURF_MOVES = [
  { id: 'tack', name: 'Tack', value: 5, rarity: 0.55, risk: 0.1, desc: 'A clean turn through the wind.' },
  { id: 'jibe', name: 'Jibe', value: 8, rarity: 0.48, risk: 0.15, desc: 'A smooth turn downwind.' },
  { id: 'jump', name: 'Jump', value: 13, rarity: 0.36, risk: 0.2, desc: 'Air off a wave lip.' },
  { id: 'spin', name: 'Spin', value: 20, rarity: 0.28, risk: 0.25, desc: 'A fast spin on the board.' },
  { id: 'duck-jibe', name: 'Duck Jibe', value: 28, rarity: 0.2, risk: 0.3, desc: 'Ducking under the sail mid-turn.' },
  { id: 'forward-loop', name: 'Forward Loop', value: 45, rarity: 0.13, risk: 0.35, desc: 'A full forward loop in the air.' },
  { id: 'back-loop', name: 'Back Loop', value: 65, rarity: 0.09, risk: 0.35, desc: 'A backward loop off a wave.' },
  { id: 'vulcan', name: 'Vulcan', value: 100, rarity: 0.06, risk: 0.4, desc: 'A sliding vulcan turn.' },
  { id: 'shaka', name: 'Shaka', value: 170, rarity: 0.04, risk: 0.4, desc: 'The shaka, a freestyle classic.' },
  { id: 'storm-ride', name: 'Storm Ride', value: 300, rarity: 0.02, risk: 0.5, desc: 'Riding a storm wave to the beach.' },
];

export const WINDSURF_UPGRADES = [
  { id: 'board', name: 'Pro Board', cost: 380, desc: 'A lighter board holds more energy.', effect: 'energy max +30' },
  { id: 'find-plus', name: 'Move Spotter', cost: 250, desc: 'Spots rare moves more often.', effect: 'rare move boost 1.25' },
  { id: 'price-plus', name: 'Clip License', cost: 300, desc: 'Sells move clips for more cash.', effect: 'sell price +20%' },
  { id: 'carry-plus', name: 'Gear Rack', cost: 200, desc: 'Carry more clips per session.', effect: 'carry cap +10' },
  { id: 'sail-pro', name: 'Pro Sail', cost: 340, desc: 'A sail that catches every gust.', effect: 'move chance up' },
  { id: 'harness', name: 'Pro Harness', cost: 210, desc: 'A harness that saves energy.', effect: 'energy use down' },
  { id: 'mast-carbon', name: 'Carbon Mast', cost: 320, desc: 'A stiff carbon mast.', effect: 'loop chance up' },
  { id: 'wetsuit-wind', name: 'Wind Wetsuit', cost: 180, desc: 'Warm in cold wind and spray.', effect: 'hazard down' },
];

export const WINDSURF_RANKS = [
  { level: 0, name: 'Beach Starter', xp: 0, perk: 'Bay sessions unlocked' },
  { level: 1, name: 'Breeze Rider', xp: 120, perk: 'Trade wind spots open up' },
  { level: 2, name: 'Wave Dancer', xp: 300, perk: 'Reef breaks pay better' },
  { level: 3, name: 'Storm Sailor', xp: 620, perk: 'Rare moves appear more often' },
  { level: 4, name: 'Wind Master', xp: 1100, perk: 'The sunset surf holds no fear' },
];

export const WINDSURF_EVENTS = [
  { id: 'steady-breeze', name: 'Steady Breeze', desc: 'A perfect steady breeze.' },
  { id: 'wind-fest', name: 'Wind Fest', desc: 'Riders arrive from everywhere.' },
  { id: 'glass-off', name: 'Glass Off', desc: 'The wind drops to glass.' },
  { id: 'gust-front', name: 'Gust Front', desc: 'Gusts sweep across the bay.' },
  { id: 'big-swell', name: 'Big Swell', desc: 'A big swell rolls in.' },
  { id: 'sunny-wind', name: 'Sunny Wind', desc: 'Sun and wind together.' },
  { id: 'rain-squall', name: 'Rain Squall', desc: 'A squall passes through fast.' },
  { id: 'new-sail', name: 'New Sail', desc: 'A bright new sail arrives.' },
  { id: 'dolphin-wave', name: 'Dolphin Wave', desc: 'Dolphins surf the same waves.' },
  { id: 'night-wind', name: 'Night Wind', desc: 'Glow boards light the night.' },
];

export const WINDSURF_CONTRACTS = [
  { id: 'tack-order', name: 'Tack Clips', material: 'tack', qty: 6, pay: 120, days: 3, rep: 10, desc: 'A school wants tack clips.' },
  { id: 'jump-order', name: 'Jump Clips', material: 'jump', qty: 4, pay: 200, days: 3, rep: 15, desc: 'A channel wants jump clips.' },
  { id: 'loop-order', name: 'Loop Clips', material: 'forward-loop', qty: 2, pay: 350, days: 4, rep: 25, desc: 'A brand wants forward loops.' },
  { id: 'vulcan-order', name: 'Vulcan Clips', material: 'vulcan', qty: 2, pay: 480, days: 5, rep: 30, desc: 'A film wants vulcan clips.' },
  { id: 'spin-order', name: 'Spin Clips', material: 'spin', qty: 5, pay: 220, days: 3, rep: 15, desc: 'A magazine wants spin clips.' },
  { id: 'storm-order', name: 'Storm Clips', material: 'storm-ride', qty: 1, pay: 650, days: 5, rep: 35, desc: 'A sponsor wants one storm ride.' },
];

export const WINDSURF_CHALLENGES = [
  { id: 'first-ride', name: 'First Ride', target: 'sessions', goal: 1, xp: 20, desc: 'Finish one surf session.' },
  { id: 'five-rides', name: 'Five Rides', target: 'sessions', goal: 5, xp: 60, desc: 'Finish five surf sessions.' },
  { id: 'move-ten', name: 'Move Ten', target: 'findsFound', goal: 10, xp: 40, desc: 'Land ten moves.' },
  { id: 'move-fifty', name: 'Move Fifty', target: 'findsFound', goal: 50, xp: 120, desc: 'Land fifty moves.' },
  { id: 'earn-five-hundred', name: 'Earn Five Hundred', target: 'earned', goal: 500, xp: 100, desc: 'Earn 500 cash in total.' },
  { id: 'sell-twenty', name: 'Sell Twenty', target: 'findsSold', goal: 20, xp: 80, desc: 'Sell twenty clips.' },
  { id: 'contract-three', name: 'Contract Three', target: 'contractsDone', goal: 3, xp: 90, desc: 'Deliver three contracts.' },
  { id: 'steps-hundred', name: 'Hundred Steps', target: 'stepsDone', goal: 100, xp: 110, desc: 'Take a hundred session steps.' },
];

export const WINDSURF_ACHIEVEMENTS = [
  { id: 'wet-board', name: 'Wet Board', check: (s) => s.sessions >= 1, desc: 'Finish your first session.' },
  { id: 'surf-regular', name: 'Surf Regular', check: (s) => s.sessions >= 10, desc: 'Finish ten sessions.' },
  { id: 'mover', name: 'Mover', check: (s) => s.findsFound >= 25, desc: 'Land twenty-five moves.' },
  { id: 'wave-artist', name: 'Wave Artist', check: (s) => s.findsFound >= 100, desc: 'Land a hundred moves.' },
  { id: 'rich-rider', name: 'Rich Rider', check: (s) => s.earned >= 1000, desc: 'Earn a thousand cash.' },
  { id: 'deal-maker', name: 'Deal Maker', check: (s) => s.contractsDone >= 5, desc: 'Deliver five contracts.' },
  { id: 'streak-five', name: 'Streak Five', check: (s) => s.bestStreak >= 5, desc: 'Reach a streak of five.' },
  { id: 'wind-master', name: 'Wind Master', check: (s) => s.rank >= 4, desc: 'Reach the top rank.' },
];

export const WINDSURF_TIPS = [
  { id: 'tip-energy', name: 'Watch Energy', text: 'Beach before your energy runs out.' },
  { id: 'tip-rare', name: 'Rare Moves', text: 'Strong wind spots hide rare moves.' },
  { id: 'tip-rank', name: 'Rank Up', text: 'Higher rank boosts rare moves.' },
  { id: 'tip-sell', name: 'Sell Often', text: 'Sell clips before the drift turns.' },
  { id: 'tip-contract', name: 'Contracts Pay', text: 'Contracts pay more than raw sales.' },
  { id: 'tip-weather', name: 'Storm Watch', text: 'Storms and hurricanes block surfing.' },
  { id: 'tip-cap', name: 'Carry Cap', text: 'Upgrade your rack to carry more.' },
  { id: 'tip-season', name: 'Season Prices', text: 'Summer prices beat winter prices.' },
];

export const WINDSURF_LEADERBOARD = [
  { name: 'Gale', value: 900, desc: 'Top rider of the season.' },
  { name: 'Zoe', value: 700, desc: 'Loop queen of the bay.' },
  { name: 'Kai', value: 520, desc: 'Wave rider extraordinaire.' },
  { name: 'Ana', value: 310, desc: 'Steady rider, steady hands.' },
  { name: 'You', value: 0, desc: 'Your score on the board.' },
];

export const WINDSURF_RECORDS = [
  { id: 'most-sessions', name: 'Most Sessions', stat: 'sessions', unit: 'sessions', desc: 'Most surf sessions finished.' },
  { id: 'most-moves', name: 'Most Moves', stat: 'findsFound', unit: 'moves', desc: 'Most moves landed.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'cash', desc: 'Most cash earned.' },
  { id: 'best-yield', name: 'Best Yield', stat: 'bestSessionYield', unit: 'cash', desc: 'Best single session yield.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'streak', desc: 'Longest good streak.' },
];

export const WINDSURF_MARKET = [
  { id: 'clip-shop', name: 'Clip Shop', finds: ['tack', 'jibe', 'jump'], mult: 1.1, desc: 'Buys common move clips.' },
  { id: 'surf-channel', name: 'Surf Channel', finds: ['spin', 'duck-jibe'], mult: 1.25, desc: 'Pays well for trick clips.' },
  { id: 'loop-brand', name: 'Loop Brand', finds: ['forward-loop', 'back-loop'], mult: 1.4, desc: 'Top price for loops.' },
  { id: 'vulcan-film', name: 'Vulcan Film', finds: ['vulcan'], mult: 1.5, desc: 'Best buyer for vulcans.' },
  { id: 'storm-sponsor', name: 'Storm Sponsor', finds: ['storm-ride', 'shaka'], mult: 1.6, desc: 'Pays a premium for storm rides.' },
  { id: 'surf-magazine', name: 'Surf Magazine', finds: ['jump', 'forward-loop'], mult: 1.3, desc: 'Magazine buys jump shots.' },
  { id: 'beach-stall', name: 'Beach Stall', finds: ['tack', 'jibe'], mult: 1.05, desc: 'Quick sales to tourists.' },
  { id: 'rare-buyer', name: 'Rare Buyer', finds: ['storm-ride', 'shaka', 'vulcan'], mult: 1.45, desc: 'Buys only the rarest clips.' },
];

export const WINDSURF_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.0, desc: 'Mild wind, steady prices.' },
  { id: 'summer', name: 'Summer', mult: 1.2, desc: 'Peak season, best prices.' },
  { id: 'autumn', name: 'Autumn', mult: 0.95, desc: 'Cooling wind, softer prices.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold wind, lowest prices.' },
];

export const WINDSURF_SEASONAL = [
  { season: 'summer', find: 'storm-ride', mult: 1.3 },
  { season: 'summer', find: 'tack', mult: 1.2 },
  { season: 'spring', find: 'forward-loop', mult: 1.2 },
  { season: 'spring', find: 'jump', mult: 1.15 },
  { season: 'autumn', find: 'shaka', mult: 1.25 },
  { season: 'autumn', find: 'spin', mult: 1.1 },
  { season: 'winter', find: 'vulcan', mult: 1.4 },
  { season: 'winter', find: 'back-loop', mult: 1.2 },
];

export const WINDSURF_QUICK_START = [
  'Launch at Calm Bay.',
  'Ride waves until energy runs low.',
  'Sell clips at the Clip Shop.',
  'Buy the Gear Rack upgrade early.',
  'Take a tack clips contract.',
  'Save up for the Pro Board.',
];

export const WINDSURF_HELPERS = [
  { id: 'beach-buddy', name: 'Beach Buddy', wage: 20, skill: 'sailing', bonus: 0.1, desc: 'A steady partner on the beach.' },
  { id: 'surf-coach', name: 'Surf Coach', wage: 40, skill: 'coaching', bonus: 0.25, desc: 'Teaches moves that sell.' },
  { id: 'repair-tech', name: 'Repair Tech', wage: 30, skill: 'repair', bonus: 0.15, desc: 'Fixes boards and sails fast.' },
  { id: 'clip-photographer', name: 'Clip Photographer', wage: 35, skill: 'photography', bonus: 0.2, desc: 'Shoots clips buyers love.' },
];

export const WINDSURFING_META = { system: 'windsurfing', version: '7c-B2', author: 'builder-2', dataCount: 10, findCount: 10, upgradeCount: 8, rankCount: 5 };

let spotOf = (id) => {
  let out = null;
  for (let i = 0; i < WINDSURF_SPOTS.length; i++) if (WINDSURF_SPOTS[i].id === id) out = WINDSURF_SPOTS[i];
  return out;
};
let moveOf = (id) => {
  for (let i = 0; i < WINDSURF_MOVES.length; i++) if (WINDSURF_MOVES[i].id === id) return WINDSURF_MOVES[i];
  return null;
};
let ownedOf = (v) => {
  if (Array.isArray(v)) return v;
  if (v && Array.isArray(v.upgrades)) return v.upgrades;
  return [];
};
let rankOf = (v) => {
  if (typeof v === 'number') return v;
  if (v && typeof v.rank === 'number') return v.rank;
  return 0;
};

export function windsurfRankFor(xp) {
  let lvl = 0;
  let i = 0;
  while (i < WINDSURF_RANKS.length) {
    if (xp >= WINDSURF_RANKS[i].xp) lvl = WINDSURF_RANKS[i].level;
    i++;
  }
  return lvl;
}

export function windsurfEnergyMax(upgrades) {
  let max = 100;
  if (ownedOf(upgrades).indexOf('board') !== -1) max += 30;
  return max;
}

export function windsurfPriceFor(moveId, drift, rank, upgrades) {
  let mv = moveOf(moveId);
  if (!mv) return 0;
  let d = typeof drift === 'number' ? drift : 0;
  let owned = Array.isArray(upgrades) ? upgrades : ownedOf(rank);
  let p = mv.value * (1 + d) * (1 + rankOf(rank) * 0.1);
  if (owned.indexOf('price-plus') !== -1) p *= 1.2;
  if (p < 1) p = 1;
  return Math.round(p * 10) / 10;
}

export function windsurfCarryCap(rank, upgrades) {
  let owned = Array.isArray(upgrades) ? upgrades : ownedOf(rank);
  let cap = 12 + rankOf(rank) * 2;
  if (owned.indexOf('carry-plus') !== -1) cap += 10;
  return cap;
}

export function windsurfScore(sessions, yld, hazards) {
  let v = sessions * 10 + Math.round(yld) - hazards * 5;
  return v > 0 ? v : 0;
}

export function windsurfGrade(score) {
  if (score >= 400) return 'S';
  else if (score >= 250) return 'A';
  else if (score >= 140) return 'B';
  else if (score >= 60) return 'C';
  else return 'D';
}

export function windsurfWeeklyGoal(state) {
  let s = state || {};
  let mk = (have, goal) => ({ have, goal, done: have >= goal });
  let sessions = mk(s.sessions || 0, 5);
  let sold = mk(s.findsSold || 0, 40);
  let earned = mk(s.earned || 0, 600);
  return { sessions, sold, earned, allDone: sessions.done && sold.done && earned.done };
}

export function windsurfEfficiency(state) {
  let s = state || {};
  if (!s.sessions) return 100;
  let good = s.sessions - (s.contractsFailed || 0);
  if (good < 0) good = 0;
  return Math.round((good / s.sessions) * 100);
}

export function windsurfProfitPerSession(state) {
  let s = state || {};
  if (!s.sessions) return 0;
  return Math.round(((s.earned || 0) / s.sessions) * 10) / 10;
}

export function windsurfInventoryValue(state) {
  let s = state || {};
  let total = 0;
  let entries = Object.entries(s.inventory || {});
  for (let [id, n] of entries) total += (n || 0) * windsurfPriceFor(id, s.dayDrift || 0, s.rank || 0, s.upgrades || []);
  return Math.round(total * 10) / 10;
}

export function windsurfSummary(state) {
  let s = state || {};
  let rn = (WINDSURF_RANKS[s.rank || 0] || {}).name || 'Beach Starter';
  return 'Windsurfing: ' + rn + ' with ' + (s.sessions || 0) + ' sessions, ' + (s.findsFound || 0) + ' moves and ' + (s.earned || 0) + ' cash earned.';
}

export function windsurfNextGoal(state) {
  let s = state || {};
  if (!(s.sessions || 0)) return 'Finish your first session.';
  if ((s.sessions || 0) < 5) return 'Finish 5 sessions.';
  if ((s.earned || 0) < 500) return 'Earn 500 cash in total.';
  if ((s.rank || 0) < 4) return 'Reach rank ' + WINDSURF_RANKS[(s.rank || 0) + 1].name + '.';
  return 'Become a legend of Windsurfing.';
}

export function windsurfRecordFor(id, state) {
  let rec = null;
  for (let r of WINDSURF_RECORDS) if (r.id === id) rec = r;
  if (!rec) return null;
  return { id: rec.id, name: rec.name, stat: rec.stat, unit: rec.unit, desc: rec.desc, value: (state && state[rec.stat]) || 0 };
}

export function windsurfAllRecords(state) {
  let out = [];
  for (let r of WINDSURF_RECORDS) out.push(windsurfRecordFor(r.id, state));
  return out;
}

export function windsurfLeaderboardWith(playerScore) {
  let board = WINDSURF_LEADERBOARD.map((e) => ({ name: e.name, value: e.name === 'You' ? playerScore : e.value, desc: e.desc }));
  board.sort((a, b) => b.value - a.value);
  let out = [];
  board.forEach((e, i) => out.push({ rank: i + 1, name: e.name, value: e.value, desc: e.desc }));
  return out;
}

export function windsurfEventFor(day) {
  let idx = ((day || 0) % WINDSURF_MARKET.length + WINDSURF_MARKET.length) % WINDSURF_MARKET.length;
  return WINDSURF_MARKET[idx];
}

export function windsurfEventMult(eventId, moveId) {
  let ev = WINDSURF_MARKET.find((m) => m.id === eventId);
  if (!ev) return 1;
  return ev.finds.indexOf(moveId) !== -1 ? ev.mult : 1;
}

export function windsurfSeasonMult(seasonId) {
  let s = WINDSURF_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function windsurfSeasonalPriceMult(seasonId, moveId) {
  let row = WINDSURF_SEASONAL.find((x) => x.season === seasonId && x.find === moveId);
  return row ? row.mult : 1;
}

export function windsurfBestBuyer() {
  let best = WINDSURF_MARKET[0];
  for (let m of WINDSURF_MARKET) if (m.mult > best.mult) best = m;
  return best;
}

export function windsurfBestSeason() {
  let best = WINDSURF_SEASONS[0];
  for (let s of WINDSURF_SEASONS) if (s.mult > best.mult) best = s;
  return best;
}

export function windsurfTipFor(day) {
  let idx = ((day || 0) % WINDSURF_TIPS.length + WINDSURF_TIPS.length) % WINDSURF_TIPS.length;
  return WINDSURF_TIPS[idx];
}

export function windsurfQuickStart() {
  return WINDSURF_QUICK_START.slice();
}

export function windsurfChallengeProgress(challenge, state) {
  let have = (state && state[challenge.target]) || 0;
  return { id: challenge.id, name: challenge.name, have, goal: challenge.goal, done: have >= challenge.goal, xp: challenge.xp };
}

export function windsurfProgressPercent(state) {
  let s = state || {};
  if (!s.sessions) return 0;
  let good = s.sessions - (s.contractsFailed || 0);
  if (good < 0) good = 0;
  return Math.round((good / s.sessions) * 100);
}

export function windsurfTotalValue(state) {
  let s = state || {};
  return Math.round((windsurfInventoryValue(s) + (s.earned || 0)) * 10) / 10;
}

export function windsurfHelperBonus(helperIds, skill) {
  let sum = 0;
  for (let id of (helperIds || [])) {
    let h = WINDSURF_HELPERS.find((x) => x.id === id);
    if (h && h.skill === skill) sum += h.bonus;
  }
  return sum;
}

export function windsurfMovesByRarity(maxRarity) {
  let out = [];
  for (let mv of WINDSURF_MOVES) if (mv.rarity <= maxRarity) out.push(mv.id);
  return out;
}

export function windsurfSpotByWind(wind) {
  let pick = WINDSURF_SPOTS[WINDSURF_SPOTS.length - 1];
  for (let s of WINDSURF_SPOTS) {
    if (s.wind >= wind) { pick = s; break; }
  }
  return pick;
}

function windState() {
  return {
    xp: 0, rank: 0, sessions: 0, actions: 0, stepsDone: 0, earned: 0, spent: 0,
    findsFound: 0, findsSold: 0, contractsDone: 0, contractsFailed: 0, hazardsTaken: 0,
    heatGained: 0, inventory: {}, upgrades: [], activeContract: null, contractProgress: 0,
    contractDeadline: null, session: null, sessionStepsLeft: 0, sessionTimeLeft: 0,
    resource: 0, dayDrift: 0, lastDay: 1, bestSession: null, bestSessionYield: 0,
    dailyEarned: 0, dailySessions: 0, totalYield: 0, bestStreak: 0, streak: 0,
    specialsUsed: 0, weatherStops: 0, sessionYield: 0, sessionFinds: [], season: 'summer',
    event: null, wagesPaid: 0, challengesClaimed: [],
  };
}

export function createWindsurfingSystem(ctx) {
  let c = ctx || {};
  let rng = c.rng || Math.random;
  let getDay = c.getDay || (() => 1);
  let getHour = c.getHour || (() => 12);
  let getCash = c.getCash || (() => 0);
  let addCash = c.addCash || (() => {});
  let addHeat = c.addHeat || (() => {});
  let log = c.log || (() => {});
  let getPlayerPos = c.getPlayerPos || (() => ({ x: 0, z: 0 }));
  let getWeather = c.getWeather || (() => ({ condition: 'clear' }));
  let state = windState();

  let sync = () => {
    let lvl = windsurfRankFor(state.xp);
    if (lvl > state.rank) log('Rank up: ' + WINDSURF_RANKS[lvl].name);
    state.rank = lvl;
  };

  let close = () => {
    let yld = state.sessionYield;
    let sid = state.session;
    state.totalYield += yld;
    if (yld > state.bestSessionYield) { state.bestSessionYield = yld; state.bestSession = sid; }
    if (yld > 0) {
      state.streak += 1;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    } else state.streak = 0;
    state.session = null;
    state.sessionStepsLeft = 0;
    state.sessionTimeLeft = 0;
  };

  let handlers = [
    () => {
      state.dayDrift = Math.round((state.dayDrift + 0.3) * 100) / 100;
      state.event = 'demand-spike';
      return { ok: true, event: 'demand-spike', name: 'Demand Spike', kind: 'demand' };
    },
    () => {
      state.dayDrift = Math.round((state.dayDrift - 0.15) * 100) / 100;
      state.event = 'price-dip';
      return { ok: true, event: 'price-dip', name: 'Price Dip', kind: 'dip' };
    },
    () => {
      let pick = WINDSURF_MOVES[Math.floor(rng() * WINDSURF_MOVES.length)];
      state.inventory[pick.id] = (state.inventory[pick.id] || 0) + 3;
      state.findsFound += 3;
      state.event = 'gift';
      return { ok: true, event: 'gift', name: 'Gift', kind: 'gift', find: pick.id, qty: 3 };
    },
    () => {
      let ev = WINDSURF_EVENTS[Math.floor(rng() * WINDSURF_EVENTS.length)];
      state.event = ev.id;
      return { ok: true, event: ev.id, name: ev.name, kind: 'named' };
    },
    () => {
      state.event = null;
      return { ok: true, event: null, name: 'none', kind: 'none' };
    },
  ];

  let runEvent = () => {
    let roll = rng();
    let idx = roll < 0.16 ? 0 : roll < 0.28 ? 1 : roll < 0.38 ? 2 : roll < 0.46 ? 3 : 4;
    return handlers[idx]();
  };

  let sys = {
    name: 'Windsurfing',
    state,
    launch(spotId) {
      let spot = spotOf(spotId);
      if (!spot) return { ok: false, reason: 'no-such-site' };
      if (state.session) return { ok: false, reason: 'already-in-session' };
      let cond = (getWeather() || {}).condition || 'clear';
      if (cond === 'storm' || cond === 'hurricane') {
        state.weatherStops += 1;
        return { ok: false, reason: 'bad-weather', condition: cond };
      }
      let hour = getHour();
      if (hour < 8 || hour >= 18) return { ok: false, reason: 'closed', hour };
      if (getCash() < spot.fee) return { ok: false, reason: 'not-enough-cash', cost: spot.fee };
      addCash(-spot.fee);
      state.spent += spot.fee;
      state.session = spot.id;
      state.sessionStepsLeft = spot.steps;
      state.sessionTimeLeft = spot.duration;
      state.resource = windsurfEnergyMax(state.upgrades);
      state.sessionYield = 0;
      state.sessionFinds = [];
      state.sessions += 1;
      state.dailySessions += 1;
      log('Launching at ' + spot.name);
      return { ok: true, id: spot.id, name: spot.name, fee: spot.fee, steps: spot.steps, duration: spot.duration };
    },
    rideWave() {
      if (!state.session) return { ok: false, reason: 'no-session' };
      let spot = spotOf(state.session);
      state.resource -= 8;
      state.sessionStepsLeft -= 1;
      state.stepsDone += 1;
      state.actions += 1;
      let held = 0;
      for (let k of Object.keys(state.inventory)) held += state.inventory[k];
      let cap = windsurfCarryCap(state.rank, state.upgrades);
      let qty = 1 + Math.floor(rng() * 2);
      if (held + qty > cap) qty = cap - held;
      let mv = null;
      let bonus = false;
      let hazard = false;
      if (qty > 0) {
        let ws = [];
        let tot = 0;
        for (let m of WINDSURF_MOVES) {
          let w = 1 / m.rarity;
          if (m.rarity < 0.08 && state.rank >= 3) w *= 1.6;
          if (m.rarity < 0.08 && state.upgrades.indexOf('find-plus') !== -1) w *= 1.25;
          ws.push(w);
          tot += w;
        }
        let roll = rng() * tot;
        let idx = WINDSURF_MOVES.length - 1;
        for (let i = 0; i < ws.length; i++) {
          roll -= ws[i];
          if (roll <= 0) { idx = i; break; }
        }
        mv = WINDSURF_MOVES[idx];
        if (rng() < 0.05) { qty += 1; bonus = true; }
        state.inventory[mv.id] = (state.inventory[mv.id] || 0) + qty;
        state.findsFound += qty;
        state.sessionFinds.push(mv.id);
        state.sessionYield += qty * mv.value;
      }
      if (spot && rng() < spot.risk * 0.04) {
        hazard = true;
        state.hazardsTaken += 1;
        if (rng() < 0.25) addCash(-20);
      }
      let ended = false;
      if (state.resource <= 0 || state.sessionStepsLeft <= 0) {
        if (state.resource < 0) state.resource = 0;
        close();
        ended = true;
      }
      return { ok: true, find: mv ? { id: mv.id, name: mv.name, qty } : null, qty, bonus, hazard, stepsLeft: state.sessionStepsLeft, resource: state.resource, ended };
    },
    beachEarly() {
      if (!state.session) return { ok: false, reason: 'no-session' };
      let id = state.session;
      close();
      log('Beached early from ' + id);
      return { ok: true, id, yield: state.totalYield };
    },
    catchGust() {
      let spot = state.session ? spotOf(state.session) : null;
      return { ok: true, site: spot ? spot.id : null, siteName: spot ? spot.name : null, weather: (getWeather() || {}).condition || 'clear', hour: getHour(), resource: state.resource, resourceMax: windsurfEnergyMax(state.upgrades), stepsLeft: state.sessionStepsLeft };
    },
    sellFind(moveId) {
      let mv = moveOf(moveId);
      if (!mv) return { ok: false, reason: 'no-such-find' };
      let held = state.inventory[moveId] || 0;
      if (held <= 0) return { ok: false, reason: 'not-held', id: moveId };
      let price = windsurfPriceFor(moveId, state.dayDrift, state.rank, state.upgrades);
      state.inventory[moveId] = held - 1;
      if (state.inventory[moveId] <= 0) delete state.inventory[moveId];
      state.findsSold += 1;
      state.earned += price;
      state.dailyEarned += price;
      addCash(price);
      return { ok: true, id: moveId, name: mv.name, qty: 1, price, total: price };
    },
    sellAllFinds() {
      let ids = Object.keys(state.inventory);
      if (ids.length === 0) return { ok: false, reason: 'nothing-held' };
      let total = 0;
      let count = 0;
      for (let id of ids) {
        total += windsurfPriceFor(id, state.dayDrift, state.rank, state.upgrades) * state.inventory[id];
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
      let up = WINDSURF_UPGRADES.find((u) => u.id === upId);
      if (!up) return { ok: false, reason: 'no-such-upgrade' };
      if (state.upgrades.indexOf(upId) !== -1) return { ok: false, reason: 'already-owned', id: upId };
      if (getCash() < up.cost) return { ok: false, reason: 'not-enough-cash', cost: up.cost };
      addCash(-up.cost);
      state.spent += up.cost;
      state.upgrades.push(upId);
      log('Bought upgrade ' + up.name);
      return { ok: true, id: up.id, name: up.name, cost: up.cost };
    },
    takeContract(contractId) {
      let ct = WINDSURF_CONTRACTS.find((x) => x.id === contractId);
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
      let ct = WINDSURF_CONTRACTS.find((x) => x.id === state.activeContract);
      let have = state.inventory[ct.material] || 0;
      if (have < ct.qty) return { ok: false, reason: 'not-enough', have, need: ct.qty, material: ct.material };
      state.inventory[ct.material] = have - ct.qty;
      if (state.inventory[ct.material] <= 0) delete state.inventory[ct.material];
      state.contractsDone += 1;
      state.earned += ct.pay;
      state.dailyEarned += ct.pay;
      addCash(ct.pay);
      state.xp += ct.rep;
      sync();
      let done = ct;
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractDeadline = null;
      return { ok: true, id: done.id, name: done.name, pay: done.pay, rep: done.rep };
    },
    abandonContract() {
      if (!state.activeContract) return { ok: false, reason: 'no-active-contract' };
      let id = state.activeContract;
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractDeadline = null;
      state.contractsFailed += 1;
      return { ok: true, id };
    },
    priceBoard() {
      let rows = [];
      for (let mv of WINDSURF_MOVES) rows.push({ id: mv.id, name: mv.name, price: windsurfPriceFor(mv.id, state.dayDrift, state.rank, state.upgrades), base: mv.value, drift: state.dayDrift, held: state.inventory[mv.id] || 0 });
      return rows;
    },
    siteReport(spotId) {
      let spot = spotOf(spotId);
      if (!spot) return { ok: false, reason: 'no-such-site' };
      return { ok: true, id: spot.id, name: spot.name, fee: spot.fee, difficulty: spot.difficulty, steps: spot.steps, duration: spot.duration, risk: spot.risk, wind: spot.wind, wave: spot.wave, desc: spot.desc };
    },
    dailyEvent() {
      return runEvent();
    },
    tick(dt) {
      if (!state.session) return;
      state.sessionTimeLeft -= dt;
      state.resource -= dt * 0.05;
      if (state.sessionTimeLeft <= 0 || state.resource <= 0) {
        if (state.resource < 0) state.resource = 0;
        if (state.sessionTimeLeft < 0) state.sessionTimeLeft = 0;
        close();
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
      return runEvent();
    },
    serialize() {
      return JSON.parse(JSON.stringify(state));
    },
    deserialize(saved) {
      if (!saved || typeof saved !== 'object') return;
      for (let k of Object.keys(saved)) state[k] = saved[k];
      if (!state.inventory || typeof state.inventory !== 'object') state.inventory = {};
      if (!Array.isArray(state.upgrades)) state.upgrades = [];
      if (!Array.isArray(state.sessionFinds)) state.sessionFinds = [];
      if (!Array.isArray(state.challengesClaimed)) state.challengesClaimed = [];
      if (typeof state.wagesPaid !== 'number') state.wagesPaid = 0;
      sync();
    },
    stats() {
      let rn = (WINDSURF_RANKS[state.rank] || {}).name || 'Beach Starter';
      return { rank: rn, xp: state.xp, sessions: state.sessions, actions: state.actions, stepsDone: state.stepsDone, earned: state.earned, spent: state.spent, findsFound: state.findsFound, findsSold: state.findsSold, contractsDone: state.contractsDone, contractsFailed: state.contractsFailed, hazardsTaken: state.hazardsTaken, heatGained: state.heatGained, upgrades: state.upgrades.length, activeContract: state.activeContract, contractProgress: state.contractProgress, session: state.session, stepsLeft: state.sessionStepsLeft, resource: state.resource, resourceMax: windsurfEnergyMax(state.upgrades), dailyEarned: state.dailyEarned, totalYield: state.totalYield, bestStreak: state.bestStreak, bestSession: state.bestSession, bestSessionYield: state.bestSessionYield, specialsUsed: state.specialsUsed, weatherStops: state.weatherStops, season: state.season, event: state.event };
    },
    hudLine() {
      if (!state.session) return '';
      return 'Windsurfing: ' + state.session + ' — ' + state.sessionStepsLeft + ' steps left, energy ' + state.resource;
    },
    interact() {
      let pos = getPlayerPos() || { x: 0, z: 0 };
      let dx = pos.x - (-420);
      let dz = pos.z - 300;
      if (Math.sqrt(dx * dx + dz * dz) > 30) return false;
      if (state.session) { sys.rideWave(); return true; }
      let held = 0;
      for (let k of Object.keys(state.inventory)) held += state.inventory[k];
      if (held > 0) { sys.sellAllFinds(); return true; }
      sys.launch(WINDSURF_SPOTS[0].id);
      return true;
    },
  };
  return sys;
}

export function createWindsurfingExtras(system) {
  let st = system.state;
  let hired = [];
  let claimed = [];
  let wages = 0;

  let bonusOf = (skill) => {
    let sum = 0;
    for (let id of hired) {
      let h = WINDSURF_HELPERS.find((x) => x.id === id);
      if (h && h.skill === skill) sum += h.bonus;
    }
    return sum;
  };

  return {
    hireHelper(id) {
      let h = WINDSURF_HELPERS.find((x) => x.id === id);
      if (!h) return { ok: false, reason: 'no-such-helper' };
      if (hired.indexOf(id) !== -1) return { ok: false, reason: 'already-hired', id };
      hired.push(id);
      return { ok: true, id: h.id, name: h.name, wage: h.wage };
    },
    fireHelper(id) {
      if (hired.indexOf(id) === -1) return { ok: false, reason: 'not-hired', id };
      hired = hired.filter((x) => x !== id);
      return { ok: true, id };
    },
    payWages() {
      let due = 0;
      for (let id of hired) {
        let h = WINDSURF_HELPERS.find((x) => x.id === id);
        if (h) due += h.wage;
      }
      wages += due;
      st.wagesPaid = (st.wagesPaid || 0) + due;
      return { ok: true, due, helpers: hired.length, totalPaid: due };
    },
    helperBonus(skill) {
      return bonusOf(skill);
    },
    challenges() {
      let out = [];
      for (let ch of WINDSURF_CHALLENGES) out.push(windsurfChallengeProgress(ch, st));
      return out;
    },
    claimChallenge(id) {
      let ch = WINDSURF_CHALLENGES.find((x) => x.id === id);
      if (!ch) return { ok: false, reason: 'no-such-challenge' };
      if (claimed.indexOf(id) !== -1) return { ok: false, reason: 'already-claimed', id };
      let prog = windsurfChallengeProgress(ch, st);
      if (!prog.done) return { ok: false, reason: 'not-done', have: prog.have, goal: prog.goal };
      claimed.push(id);
      st.challengesClaimed.push(id);
      st.xp += ch.xp;
      st.rank = windsurfRankFor(st.xp);
      return { ok: true, id: ch.id, xp: ch.xp };
    },
    achievements() {
      let out = [];
      for (let a of WINDSURF_ACHIEVEMENTS) out.push({ id: a.id, name: a.name, desc: a.desc, done: !!a.check(st) });
      return out;
    },
    donateFinds() {
      let ids = Object.keys(st.inventory);
      let donated = 0;
      for (let id of ids) donated += st.inventory[id];
      st.inventory = {};
      return { ok: true, donated, finds: ids };
    },
    bundleSale() {
      let count = 0;
      for (let k of Object.keys(st.inventory)) count += st.inventory[k];
      if (count < 10) return { ok: false, reason: 'not-enough', have: count, need: 10 };
      let total = 0;
      for (let id of Object.keys(st.inventory)) total += windsurfPriceFor(id, st.dayDrift, st.rank, st.upgrades) * st.inventory[id];
      total = Math.round(total * 1.1 * 10) / 10;
      st.inventory = {};
      st.findsSold += count;
      st.earned += total;
      st.dailyEarned += total;
      return { ok: true, total, count, bonus: 'bundle +10%' };
    },
    checkEnergy() {
      let max = windsurfEnergyMax(st.upgrades);
      return { ok: true, resource: st.resource, max, name: 'energy', percent: max ? Math.round((st.resource / max) * 100) : 0 };
    },
    restUp() {
      st.resource = windsurfEnergyMax(st.upgrades);
      return { ok: true, resource: st.resource, max: st.resource };
    },
    countMoves() {
      let count = 0;
      for (let k of Object.keys(st.inventory)) count += st.inventory[k];
      return { ok: true, count, total: count };
    },
    get helpers() { return hired.slice(); },
    get claimed() { return claimed.slice(); },
    get wagesPaid() { return wages; },
  };
}

export function createWindsurfingMarket(system) {
  let st = system.state;
  let currentEvent = null;
  let currentSeason = st.season || 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  let calcPrice = (itemId, basePrice) => {
    let em = currentEvent ? windsurfEventMult(currentEvent, itemId) : 1;
    let sm = windsurfSeasonMult(currentSeason);
    return Math.round(basePrice * em * sm * 10) / 10;
  };

  return {
    setEvent(id) {
      let ev = WINDSURF_MARKET.find((m) => m.id === id);
      if (!ev) return { ok: false, reason: 'no-such-event' };
      currentEvent = id;
      st.event = id;
      return { ok: true, event: id };
    },
    setSeason(id) {
      let s = WINDSURF_SEASONS.find((x) => x.id === id);
      if (!s) return { ok: false, reason: 'no-such-season' };
      currentSeason = id;
      st.season = id;
      return { ok: true, season: id };
    },
    eventPrice(itemId, basePrice) {
      return calcPrice(itemId, basePrice);
    },
    bulkDeal(moveId, qty) {
      if (!qty || qty < 20) return { ok: false, reason: 'not-enough', qty: qty || 0, need: 20 };
      let held = st.inventory[moveId] || 0;
      if (held < qty) return { ok: false, reason: 'not-enough-held', have: held, need: qty };
      let mv = moveOf(moveId);
      if (!mv) return { ok: false, reason: 'no-such-find' };
      let unit = calcPrice(moveId, mv.value);
      let total = Math.round(unit * qty * 1.1 * 10) / 10;
      st.inventory[moveId] = held - qty;
      if (st.inventory[moveId] <= 0) delete st.inventory[moveId];
      st.findsSold += qty;
      st.earned += total;
      st.dailyEarned += total;
      bulkTraded += qty;
      dealsClaimed += 1;
      return { ok: true, total, qty, unit, bonus: 'bulk +10%' };
    },
    dailyDeals() {
      let out = [];
      for (let m of WINDSURF_MARKET) out.push({ id: m.id, name: m.name, finds: m.finds.slice(), mult: m.mult, desc: m.desc });
      return out;
    },
    marketSummary() {
      return { event: currentEvent, season: currentSeason, dealsClaimed, bulkTraded, deals: this.dailyDeals() };
    },
    get event() { return currentEvent; },
    get season() { return currentSeason; },
  };
}
