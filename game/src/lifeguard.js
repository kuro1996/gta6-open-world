export const BEACH_PATROLS = [
  { id: 'north-beach', name: 'North Beach', fee: 0, difficulty: 1, steps: 5, duration: 120, risk: 0.1, length: 200, swimmers: 40, desc: 'A quiet beach at the north end.' },
  { id: 'family-cove', name: 'Family Cove', fee: 0, difficulty: 1, steps: 6, duration: 130, risk: 0.1, length: 250, swimmers: 80, desc: 'Families splash in the shallow cove.' },
  { id: 'lagoon-beach', name: 'Lagoon Beach', fee: 0, difficulty: 2, steps: 7, duration: 150, risk: 0.2, length: 300, swimmers: 120, desc: 'Warm lagoon water, gentle waves.' },
  { id: 'pier-beach', name: 'Pier Beach', fee: 0, difficulty: 2, steps: 8, duration: 160, risk: 0.2, length: 350, swimmers: 150, desc: 'Swimmers gather around the pier.' },
  { id: 'surf-beach', name: 'Surf Beach', fee: 0, difficulty: 3, steps: 9, duration: 190, risk: 0.3, length: 500, swimmers: 200, desc: 'Surfers ride the break all day.' },
  { id: 'turtle-bay', name: 'Turtle Bay', fee: 0, difficulty: 3, steps: 9, duration: 200, risk: 0.3, length: 450, swimmers: 180, desc: 'Turtles nest on the quiet bay.' },
  { id: 'rocky-shore', name: 'Rocky Shore', fee: 0, difficulty: 3, steps: 10, duration: 210, risk: 0.4, length: 600, swimmers: 90, desc: 'Rocks and currents make this shore tricky.' },
  { id: 'cliff-beach', name: 'Cliff Beach', fee: 0, difficulty: 4, steps: 10, duration: 230, risk: 0.5, length: 800, swimmers: 60, desc: 'Cliffs shade a wild little beach.' },
  { id: 'sunset-beach', name: 'Sunset Beach', fee: 0, difficulty: 4, steps: 11, duration: 240, risk: 0.4, length: 1000, swimmers: 300, desc: 'Crowds gather for the sunset swim.' },
  { id: 'grand-beach', name: 'Grand Beach', fee: 0, difficulty: 5, steps: 12, duration: 280, risk: 0.5, length: 1500, swimmers: 500, desc: 'The biggest beach, the busiest patrol.' },
];

export const LIFEGUARD_RESCUES = [
  { id: 'tired-swimmer', name: 'Tired Swimmer', value: 6, rarity: 0.55, risk: 0.1, desc: 'A swimmer too tired to reach shore.' },
  { id: 'lost-child', name: 'Lost Child', value: 9, rarity: 0.48, risk: 0.15, desc: 'A child lost in the crowd.' },
  { id: 'cramp-rescue', name: 'Cramp Rescue', value: 14, rarity: 0.36, risk: 0.2, desc: 'A swimmer with a bad cramp.' },
  { id: 'jellyfish-sting', name: 'Jellyfish Sting', value: 20, rarity: 0.28, risk: 0.2, desc: 'A sting that needs quick care.' },
  { id: 'board-rescue', name: 'Board Rescue', value: 28, rarity: 0.2, risk: 0.25, desc: 'A surfer separated from a board.' },
  { id: 'rip-current', name: 'Rip Current', value: 45, rarity: 0.13, risk: 0.35, desc: 'A swimmer caught in a rip current.' },
  { id: 'drift-boat', name: 'Drift Boat', value: 65, rarity: 0.09, risk: 0.3, desc: 'A small boat drifting offshore.' },
  { id: 'drowning-save', name: 'Drowning Save', value: 110, rarity: 0.06, risk: 0.4, desc: 'A life saved in the nick of time.' },
  { id: 'shark-alert', name: 'Shark Alert', value: 180, rarity: 0.04, risk: 0.45, desc: 'A shark sighting cleared the beach.' },
  { id: 'mass-rescue', name: 'Mass Rescue', value: 320, rarity: 0.02, risk: 0.5, desc: 'Many swimmers saved at once.' },
];

export const LIFEGUARD_UPGRADES = [
  { id: 'jet-ski', name: 'Jet Ski', cost: 420, desc: 'A jet ski that holds more energy.', effect: 'energy max +40' },
  { id: 'find-plus', name: 'Rescue Spotter', cost: 260, desc: 'Spots rare rescues more often.', effect: 'rare rescue boost 1.25' },
  { id: 'price-plus', name: 'Award License', cost: 310, desc: 'Rescue awards pay more cash.', effect: 'sell price +20%' },
  { id: 'carry-plus', name: 'Gear Sled', cost: 210, desc: 'Carry more logs per shift.', effect: 'carry cap +10' },
  { id: 'tower-pro', name: 'Pro Tower', cost: 340, desc: 'A taller tower sees further.', effect: 'rescue chance up' },
  { id: 'rescue-board', name: 'Rescue Board', cost: 300, desc: 'A board that reaches swimmers fast.', effect: 'rescue speed up' },
  { id: 'binoculars', name: 'Binoculars', cost: 170, desc: 'Spots trouble from the tower.', effect: 'hazard down' },
  { id: 'first-aid', name: 'First Aid Kit', cost: 200, desc: 'Treats stings and scrapes on the spot.', effect: 'rescue value up' },
];

export const LIFEGUARD_RANKS = [
  { level: 0, name: 'Tower Trainee', xp: 0, perk: 'North beach patrol unlocked' },
  { level: 1, name: 'Beach Watcher', xp: 120, perk: 'Surf beach patrols open up' },
  { level: 2, name: 'Rescue Swimmer', xp: 300, perk: 'Grand beach pays better' },
  { level: 3, name: 'Senior Guard', xp: 620, perk: 'Rare rescues appear more often' },
  { level: 4, name: 'Guardian of the Shore', xp: 1100, perk: 'Every beach is safe with you' },
];

export const LIFEGUARD_EVENTS = [
  { id: 'calm-day', name: 'Calm Day', desc: 'A quiet day on the sand.' },
  { id: 'school-trip', name: 'School Trip', desc: 'School kids flood the beach.' },
  { id: 'heatwave', name: 'Heatwave', desc: 'Record crowds beat the heat.' },
  { id: 'rip-warning', name: 'Rip Warning', desc: 'Rip currents flagged all day.' },
  { id: 'surf-comp', name: 'Surf Comp', desc: 'A surf contest draws crowds.' },
  { id: 'beach-clean', name: 'Beach Clean', desc: 'Volunteers clean the beach.' },
  { id: 'sunny-spell', name: 'Sunny Spell', desc: 'Sun and calm seas together.' },
  { id: 'storm-watch', name: 'Storm Watch', desc: 'Guards watch the horizon.' },
  { id: 'new-tower', name: 'New Tower', desc: 'A new watch tower opens.' },
  { id: 'turtle-hatch', name: 'Turtle Hatch', desc: 'Baby turtles reach the sea.' },
];

export const LIFEGUARD_CONTRACTS = [
  { id: 'tired-order', name: 'Tired Swimmer Logs', material: 'tired-swimmer', qty: 6, pay: 130, days: 3, rep: 10, desc: 'The council wants six tired-swimmer logs.' },
  { id: 'cramp-order', name: 'Cramp Logs', material: 'cramp-rescue', qty: 4, pay: 210, days: 3, rep: 15, desc: 'A clinic wants four cramp logs.' },
  { id: 'rip-order', name: 'Rip Logs', material: 'rip-current', qty: 2, pay: 380, days: 4, rep: 25, desc: 'A safety board wants two rip logs.' },
  { id: 'save-order', name: 'Save Logs', material: 'drowning-save', qty: 2, pay: 500, days: 5, rep: 30, desc: 'A charity wants two save logs.' },
  { id: 'child-order', name: 'Child Logs', material: 'lost-child', qty: 5, pay: 180, days: 3, rep: 15, desc: 'A school wants five child logs.' },
  { id: 'mass-order', name: 'Mass Logs', material: 'mass-rescue', qty: 1, pay: 680, days: 5, rep: 35, desc: 'The mayor wants one mass rescue log.' },
];

export const LIFEGUARD_CHALLENGES = [
  { id: 'first-patrol', name: 'First Patrol', target: 'sessions', goal: 1, xp: 20, desc: 'Finish one patrol shift.' },
  { id: 'five-patrols', name: 'Five Patrols', target: 'sessions', goal: 5, xp: 60, desc: 'Finish five patrol shifts.' },
  { id: 'rescue-ten', name: 'Rescue Ten', target: 'findsFound', goal: 10, xp: 40, desc: 'Log ten rescues.' },
  { id: 'rescue-fifty', name: 'Rescue Fifty', target: 'findsFound', goal: 50, xp: 120, desc: 'Log fifty rescues.' },
  { id: 'earn-five-hundred', name: 'Earn Five Hundred', target: 'earned', goal: 500, xp: 100, desc: 'Earn 500 cash in total.' },
  { id: 'sell-twenty', name: 'Sell Twenty', target: 'findsSold', goal: 20, xp: 80, desc: 'File twenty rescue logs.' },
  { id: 'contract-three', name: 'Contract Three', target: 'contractsDone', goal: 3, xp: 90, desc: 'Deliver three contracts.' },
  { id: 'steps-hundred', name: 'Hundred Steps', target: 'stepsDone', goal: 100, xp: 110, desc: 'Take a hundred patrol steps.' },
];

export const LIFEGUARD_ACHIEVEMENTS = [
  { id: 'on-duty', name: 'On Duty', check: (s) => s.sessions >= 1, desc: 'Finish your first patrol.' },
  { id: 'beach-regular', name: 'Beach Regular', check: (s) => s.sessions >= 10, desc: 'Finish ten patrols.' },
  { id: 'rescuer', name: 'Rescuer', check: (s) => s.findsFound >= 25, desc: 'Log twenty-five rescues.' },
  { id: 'hero', name: 'Hero', check: (s) => s.findsFound >= 100, desc: 'Log a hundred rescues.' },
  { id: 'rich-guard', name: 'Rich Guard', check: (s) => s.earned >= 1000, desc: 'Earn a thousand cash.' },
  { id: 'deal-maker', name: 'Deal Maker', check: (s) => s.contractsDone >= 5, desc: 'Deliver five contracts.' },
  { id: 'streak-five', name: 'Streak Five', check: (s) => s.bestStreak >= 5, desc: 'Reach a streak of five.' },
  { id: 'shore-master', name: 'Shore Master', check: (s) => s.rank >= 4, desc: 'Reach the top rank.' },
];

export const LIFEGUARD_TIPS = [
  { id: 'tip-energy', name: 'Watch Energy', text: 'End the shift before energy runs out.' },
  { id: 'tip-rare', name: 'Rare Rescues', text: 'Busy beaches hide rare rescues.' },
  { id: 'tip-rank', name: 'Rank Up', text: 'Higher rank boosts rare rescues.' },
  { id: 'tip-sell', name: 'File Often', text: 'File logs before the drift turns.' },
  { id: 'tip-contract', name: 'Contracts Pay', text: 'Contracts pay more than raw logs.' },
  { id: 'tip-duty', name: 'Always On', text: 'Patrols run in any weather, any hour.' },
  { id: 'tip-cap', name: 'Carry Cap', text: 'Upgrade your sled to carry more.' },
  { id: 'tip-season', name: 'Season Prices', text: 'Summer prices beat winter prices.' },
];

export const LIFEGUARD_LEADERBOARD = [
  { name: 'Bay', value: 910, desc: 'Top guard of the season.' },
  { name: 'Sandy', value: 720, desc: 'Fastest swimmer on the beach.' },
  { name: 'Rex', value: 540, desc: 'Rescue king of the shore.' },
  { name: 'Mia', value: 320, desc: 'Steady guard, steady hands.' },
  { name: 'You', value: 0, desc: 'Your score on the board.' },
];

export const LIFEGUARD_RECORDS = [
  { id: 'most-patrols', name: 'Most Patrols', stat: 'sessions', unit: 'patrols', desc: 'Most patrol sessions finished.' },
  { id: 'most-rescues', name: 'Most Rescues', stat: 'findsFound', unit: 'rescues', desc: 'Most rescues logged.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'cash', desc: 'Most cash earned.' },
  { id: 'best-yield', name: 'Best Yield', stat: 'bestSessionYield', unit: 'cash', desc: 'Best single patrol yield.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'streak', desc: 'Longest good streak.' },
];

export const LIFEGUARD_MARKET = [
  { id: 'council', name: 'Beach Council', finds: ['tired-swimmer', 'lost-child', 'cramp-rescue'], mult: 1.1, desc: 'Buys common rescue logs.' },
  { id: 'safety-board', name: 'Safety Board', finds: ['rip-current', 'board-rescue'], mult: 1.25, desc: 'Pays well for rip logs.' },
  { id: 'clinic', name: 'Beach Clinic', finds: ['jellyfish-sting', 'cramp-rescue'], mult: 1.4, desc: 'Top price for treatment logs.' },
  { id: 'charity', name: 'Rescue Charity', finds: ['drowning-save'], mult: 1.5, desc: 'Best buyer for save logs.' },
  { id: 'mayor-office', name: 'Mayor Office', finds: ['mass-rescue', 'shark-alert'], mult: 1.6, desc: 'Pays a premium for big rescues.' },
  { id: 'news-desk', name: 'News Desk', finds: ['shark-alert', 'mass-rescue'], mult: 1.3, desc: 'News buys dramatic rescues.' },
  { id: 'beach-stall', name: 'Beach Stall', finds: ['tired-swimmer', 'lost-child'], mult: 1.05, desc: 'Quick sales to tourists.' },
  { id: 'rare-buyer', name: 'Rare Buyer', finds: ['mass-rescue', 'shark-alert', 'drowning-save'], mult: 1.45, desc: 'Buys only the rarest logs.' },
];

export const LIFEGUARD_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.0, desc: 'Mild crowds, steady prices.' },
  { id: 'summer', name: 'Summer', mult: 1.2, desc: 'Peak season, best prices.' },
  { id: 'autumn', name: 'Autumn', mult: 0.9, desc: 'Cooling crowds, softer prices.' },
  { id: 'winter', name: 'Winter', mult: 0.8, desc: 'Quiet beaches, lowest prices.' },
];

export const LIFEGUARD_SEASONAL = [
  { season: 'summer', find: 'mass-rescue', mult: 1.3 },
  { season: 'summer', find: 'tired-swimmer', mult: 1.2 },
  { season: 'spring', find: 'rip-current', mult: 1.2 },
  { season: 'spring', find: 'cramp-rescue', mult: 1.15 },
  { season: 'autumn', find: 'shark-alert', mult: 1.25 },
  { season: 'autumn', find: 'board-rescue', mult: 1.1 },
  { season: 'winter', find: 'drowning-save', mult: 1.4 },
  { season: 'winter', find: 'drift-boat', mult: 1.2 },
];

export const LIFEGUARD_QUICK_START = [
  'Patrol North Beach.',
  'Respond to swimmers until energy runs low.',
  'File logs with the Beach Council.',
  'Buy the Gear Sled upgrade early.',
  'Take a tired swimmer contract.',
  'Save up for the Jet Ski.',
];

export const LIFEGUARD_HELPERS = [
  { id: 'tower-mate', name: 'Tower Mate', wage: 20, skill: 'watching', bonus: 0.1, desc: 'A second pair of eyes in the tower.' },
  { id: 'swim-buddy', name: 'Swim Buddy', wage: 35, skill: 'swimming', bonus: 0.2, desc: 'A strong swimmer at your side.' },
  { id: 'medic', name: 'Medic', wage: 40, skill: 'first-aid', bonus: 0.25, desc: 'Treats every rescue on the sand.' },
  { id: 'rower', name: 'Rower', wage: 25, skill: 'rowing', bonus: 0.15, desc: 'Rows the rescue boat fast.' },
];

export const LIFEGUARD_META = { system: 'lifeguard', version: '7c-B2', author: 'builder-2', dataCount: 10, findCount: 10, upgradeCount: 8, rankCount: 5 };

const beachById = (id) => BEACH_PATROLS.find((b) => b.id === id) || null;
const rescueById = (id) => LIFEGUARD_RESCUES.find((r) => r.id === id) || null;
const listUp = (v) => (Array.isArray(v) ? v : (v && Array.isArray(v.upgrades) ? v.upgrades : []));
const rankVal = (v) => (typeof v === 'number' ? v : (v && typeof v.rank === 'number' ? v.rank : 0));

export function lifeguardRankFor(xp) {
  let lvl = 0;
  LIFEGUARD_RANKS.forEach((r) => { if (xp >= r.xp) lvl = r.level; });
  return lvl;
}

export function lifeguardEnergyMax(upgrades) {
  return listUp(upgrades).includes('jet-ski') ? 140 : 100;
}

export function lifeguardPriceFor(rescueId, drift, rank, upgrades) {
  const r = rescueById(rescueId);
  if (!r) return 0;
  const d = typeof drift === 'number' ? drift : 0;
  const owned = Array.isArray(upgrades) ? upgrades : listUp(rank);
  let p = r.value * (1 + d) * (1 + rankVal(rank) * 0.1);
  if (owned.includes('price-plus')) p *= 1.2;
  return Math.max(1, Math.round(p * 10) / 10);
}

export function lifeguardCarryCap(rank, upgrades) {
  const owned = Array.isArray(upgrades) ? upgrades : listUp(rank);
  return 25 + rankVal(rank) * 2 + (owned.includes('carry-plus') ? 10 : 0);
}

export function lifeguardScore(sessions, yld, hazards) {
  return Math.max(0, sessions * 10 + Math.round(yld) - hazards * 5);
}

export function lifeguardGrade(score) {
  return score >= 400 ? 'S' : score >= 250 ? 'A' : score >= 140 ? 'B' : score >= 60 ? 'C' : 'D';
}

export function lifeguardWeeklyGoal(state) {
  const s = state || {};
  const mk = (have, goal) => ({ have, goal, done: have >= goal });
  const sessions = mk(s.sessions || 0, 5);
  const sold = mk(s.findsSold || 0, 40);
  const earned = mk(s.earned || 0, 600);
  return { sessions, sold, earned, allDone: sessions.done && sold.done && earned.done };
}

export function lifeguardEfficiency(state) {
  const s = state || {};
  if (!s.sessions) return 100;
  return Math.round((Math.max(0, s.sessions - (s.contractsFailed || 0)) / s.sessions) * 100);
}

export function lifeguardProfitPerPatrol(state) {
  const s = state || {};
  return s.sessions ? Math.round(((s.earned || 0) / s.sessions) * 10) / 10 : 0;
}

export function lifeguardInventoryValue(state) {
  const s = state || {};
  let total = 0;
  Object.keys(s.inventory || {}).forEach((id) => {
    total += (s.inventory[id] || 0) * lifeguardPriceFor(id, s.dayDrift || 0, s.rank || 0, s.upgrades || []);
  });
  return Math.round(total * 10) / 10;
}

export function lifeguardSummary(state) {
  const s = state || {};
  const rn = (LIFEGUARD_RANKS[s.rank || 0] || {}).name || 'Tower Trainee';
  return 'Lifeguard: ' + rn + ' with ' + (s.sessions || 0) + ' patrols, ' + (s.findsFound || 0) + ' rescues and ' + (s.earned || 0) + ' cash earned.';
}

export function lifeguardNextGoal(state) {
  const s = state || {};
  if (!(s.sessions || 0)) return 'Finish your first patrol.';
  if ((s.sessions || 0) < 5) return 'Finish 5 patrols.';
  if ((s.earned || 0) < 500) return 'Earn 500 cash in total.';
  if ((s.rank || 0) < 4) return 'Reach rank ' + LIFEGUARD_RANKS[(s.rank || 0) + 1].name + '.';
  return 'Become a legend of Lifeguard.';
}

export function lifeguardRecordFor(id, state) {
  const rec = LIFEGUARD_RECORDS.find((r) => r.id === id);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, stat: rec.stat, unit: rec.unit, desc: rec.desc, value: (state && state[rec.stat]) || 0 };
}

export function lifeguardAllRecords(state) {
  return LIFEGUARD_RECORDS.map((r) => lifeguardRecordFor(r.id, state));
}

export function lifeguardLeaderboardWith(playerScore) {
  const board = LIFEGUARD_LEADERBOARD.map((e) => ({ name: e.name, value: e.name === 'You' ? playerScore : e.value, desc: e.desc }));
  board.sort((a, b) => b.value - a.value);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, value: e.value, desc: e.desc }));
}

export function lifeguardEventFor(day) {
  return LIFEGUARD_MARKET[((day || 0) % LIFEGUARD_MARKET.length + LIFEGUARD_MARKET.length) % LIFEGUARD_MARKET.length];
}

export function lifeguardEventMult(eventId, rescueId) {
  const ev = LIFEGUARD_MARKET.find((m) => m.id === eventId);
  return ev && ev.finds.includes(rescueId) ? ev.mult : 1;
}

export function lifeguardSeasonMult(seasonId) {
  const s = LIFEGUARD_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function lifeguardSeasonalPriceMult(seasonId, rescueId) {
  const row = LIFEGUARD_SEASONAL.find((x) => x.season === seasonId && x.find === rescueId);
  return row ? row.mult : 1;
}

export function lifeguardBestBuyer() {
  return LIFEGUARD_MARKET.reduce((b, m) => (m.mult > b.mult ? m : b), LIFEGUARD_MARKET[0]);
}

export function lifeguardBestSeason() {
  return LIFEGUARD_SEASONS.reduce((b, s) => (s.mult > b.mult ? s : b), LIFEGUARD_SEASONS[0]);
}

export function lifeguardTipFor(day) {
  return LIFEGUARD_TIPS[((day || 0) % LIFEGUARD_TIPS.length + LIFEGUARD_TIPS.length) % LIFEGUARD_TIPS.length];
}

export function lifeguardQuickStart() {
  return LIFEGUARD_QUICK_START.slice();
}

export function lifeguardChallengeProgress(challenge, state) {
  const have = (state && state[challenge.target]) || 0;
  return { id: challenge.id, name: challenge.name, have, goal: challenge.goal, done: have >= challenge.goal, xp: challenge.xp };
}

export function lifeguardProgressPercent(state) {
  const s = state || {};
  if (!s.sessions) return 0;
  return Math.round((Math.max(0, s.sessions - (s.contractsFailed || 0)) / s.sessions) * 100);
}

export function lifeguardTotalValue(state) {
  const s = state || {};
  return Math.round((lifeguardInventoryValue(s) + (s.earned || 0)) * 10) / 10;
}

export function lifeguardHelperBonus(helperIds, skill) {
  return (helperIds || []).reduce((sum, id) => {
    const h = LIFEGUARD_HELPERS.find((x) => x.id === id);
    return sum + (h && h.skill === skill ? h.bonus : 0);
  }, 0);
}

export function lifeguardRescuesByRarity(maxRarity) {
  return LIFEGUARD_RESCUES.filter((r) => r.rarity <= maxRarity).map((r) => r.id);
}

export function lifeguardBeachBySwimmers(swimmers) {
  let pick = BEACH_PATROLS[BEACH_PATROLS.length - 1];
  for (const b of BEACH_PATROLS) {
    if (b.swimmers >= swimmers) { pick = b; break; }
  }
  return pick;
}

function lifeguardBlank() {
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

export function createLifeguardSystem(ctx) {
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
  const state = lifeguardBlank();

  const refreshRank = () => {
    const lvl = lifeguardRankFor(state.xp);
    if (lvl > state.rank) log('Rank up: ' + LIFEGUARD_RANKS[lvl].name);
    state.rank = lvl;
  };

  const endShiftNow = () => {
    const yld = state.sessionYield;
    const bid = state.session;
    state.totalYield += yld;
    if (yld > state.bestSessionYield) { state.bestSessionYield = yld; state.bestSession = bid; }
    if (yld > 0) {
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
    } else state.streak = 0;
    state.session = null;
    state.sessionStepsLeft = 0;
    state.sessionTimeLeft = 0;
  };

  const rollEvent = () => {
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
      const pick = LIFEGUARD_RESCUES[Math.floor(rng() * LIFEGUARD_RESCUES.length)];
      state.inventory[pick.id] = (state.inventory[pick.id] || 0) + 3;
      state.findsFound += 3;
      state.event = 'gift';
      return { ok: true, event: 'gift', name: 'Gift', kind: 'gift', find: pick.id, qty: 3 };
    } else if (roll < 0.46) {
      const ev = LIFEGUARD_EVENTS[Math.floor(rng() * LIFEGUARD_EVENTS.length)];
      state.event = ev.id;
      return { ok: true, event: ev.id, name: ev.name, kind: 'named' };
    }
    state.event = null;
    return { ok: true, event: null, name: 'none', kind: 'none' };
  };

  const sys = {
    name: 'Lifeguard',
    state,
    patrol(beachId) {
      const beach = beachById(beachId);
      if (!beach) return { ok: false, reason: 'no-such-site' };
      if (state.session) return { ok: false, reason: 'already-in-session' };
      if (getCash() < beach.fee) return { ok: false, reason: 'not-enough-cash', cost: beach.fee };
      addCash(-beach.fee);
      state.spent += beach.fee;
      state.session = beach.id;
      state.sessionStepsLeft = beach.steps;
      state.sessionTimeLeft = beach.duration;
      state.resource = lifeguardEnergyMax(state.upgrades);
      state.sessionYield = 0;
      state.sessionFinds = [];
      state.sessions += 1;
      state.dailySessions += 1;
      log('Patrolling ' + beach.name);
      return { ok: true, id: beach.id, name: beach.name, fee: beach.fee, steps: beach.steps, duration: beach.duration };
    },
    respond() {
      if (!state.session) return { ok: false, reason: 'no-session' };
      const beach = beachById(state.session);
      state.resource -= 8;
      state.sessionStepsLeft -= 1;
      state.stepsDone += 1;
      state.actions += 1;
      const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
      const cap = lifeguardCarryCap(state.rank, state.upgrades);
      let qty = 1 + Math.floor(rng() * 2);
      qty = Math.min(qty, Math.max(0, cap - held));
      let rescue = null;
      let bonus = false;
      let hazard = false;
      if (qty > 0) {
        const cum = [];
        let run = 0;
        LIFEGUARD_RESCUES.forEach((r) => {
          let w = 1 / r.rarity;
          if (r.rarity < 0.08 && state.rank >= 3) w *= 1.6;
          if (r.rarity < 0.08 && state.upgrades.includes('find-plus')) w *= 1.25;
          run += w;
          cum.push(run);
        });
        const roll = rng() * run;
        let i = 0;
        while (i < cum.length - 1 && roll > cum[i]) i++;
        rescue = LIFEGUARD_RESCUES[i];
        if (rng() < 0.04) { qty += 1; bonus = true; }
        state.inventory[rescue.id] = (state.inventory[rescue.id] || 0) + qty;
        state.findsFound += qty;
        state.sessionFinds.push(rescue.id);
        state.sessionYield += qty * rescue.value;
      }
      if (beach && rng() < beach.risk * 0.04) {
        hazard = true;
        state.hazardsTaken += 1;
      }
      let ended = false;
      if (state.resource <= 0 || state.sessionStepsLeft <= 0) {
        state.resource = Math.max(0, state.resource);
        endShiftNow();
        ended = true;
      }
      return { ok: true, find: rescue ? { id: rescue.id, name: rescue.name, qty } : null, qty, bonus, hazard, stepsLeft: state.sessionStepsLeft, resource: state.resource, ended };
    },
    endShift() {
      if (!state.session) return { ok: false, reason: 'no-session' };
      const id = state.session;
      endShiftNow();
      log('Ended shift at ' + id);
      return { ok: true, id, yield: state.totalYield };
    },
    scanWater() {
      const beach = state.session ? beachById(state.session) : null;
      return { ok: true, site: beach ? beach.id : null, siteName: beach ? beach.name : null, weather: (getWeather() || {}).condition || 'clear', hour: getHour(), resource: state.resource, resourceMax: lifeguardEnergyMax(state.upgrades), stepsLeft: state.sessionStepsLeft };
    },
    sellFind(rescueId) {
      const r = rescueById(rescueId);
      if (!r) return { ok: false, reason: 'no-such-find' };
      const held = state.inventory[rescueId] || 0;
      if (held <= 0) return { ok: false, reason: 'not-held', id: rescueId };
      const price = lifeguardPriceFor(rescueId, state.dayDrift, state.rank, state.upgrades);
      state.inventory[rescueId] = held - 1;
      if (state.inventory[rescueId] <= 0) delete state.inventory[rescueId];
      state.findsSold += 1;
      state.earned += price;
      state.dailyEarned += price;
      addCash(price);
      return { ok: true, id: rescueId, name: r.name, qty: 1, price, total: price };
    },
    sellAllFinds() {
      const ids = Object.keys(state.inventory);
      if (ids.length === 0) return { ok: false, reason: 'nothing-held' };
      let total = 0;
      let count = 0;
      ids.forEach((id) => {
        total += lifeguardPriceFor(id, state.dayDrift, state.rank, state.upgrades) * state.inventory[id];
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
      const up = LIFEGUARD_UPGRADES.find((u) => u.id === upId);
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
      const ct = LIFEGUARD_CONTRACTS.find((x) => x.id === contractId);
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
      const ct = LIFEGUARD_CONTRACTS.find((x) => x.id === state.activeContract);
      const have = state.inventory[ct.material] || 0;
      if (have < ct.qty) return { ok: false, reason: 'not-enough', have, need: ct.qty, material: ct.material };
      state.inventory[ct.material] = have - ct.qty;
      if (state.inventory[ct.material] <= 0) delete state.inventory[ct.material];
      state.contractsDone += 1;
      state.earned += ct.pay;
      state.dailyEarned += ct.pay;
      addCash(ct.pay);
      state.xp += ct.rep;
      refreshRank();
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
      return LIFEGUARD_RESCUES.map((r) => ({ id: r.id, name: r.name, price: lifeguardPriceFor(r.id, state.dayDrift, state.rank, state.upgrades), base: r.value, drift: state.dayDrift, held: state.inventory[r.id] || 0 }));
    },
    siteReport(beachId) {
      const beach = beachById(beachId);
      if (!beach) return { ok: false, reason: 'no-such-site' };
      return { ok: true, id: beach.id, name: beach.name, fee: beach.fee, difficulty: beach.difficulty, steps: beach.steps, duration: beach.duration, risk: beach.risk, length: beach.length, swimmers: beach.swimmers, desc: beach.desc };
    },
    dailyEvent() {
      return rollEvent();
    },
    tick(dt) {
      if (!state.session) return;
      state.sessionTimeLeft -= dt;
      state.resource -= dt * 0.05;
      if (state.sessionTimeLeft <= 0 || state.resource <= 0) {
        state.resource = Math.max(0, state.resource);
        state.sessionTimeLeft = Math.max(0, state.sessionTimeLeft);
        endShiftNow();
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
      return rollEvent();
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
      refreshRank();
    },
    stats() {
      return { rank: (LIFEGUARD_RANKS[state.rank] || {}).name || 'Tower Trainee', xp: state.xp, sessions: state.sessions, actions: state.actions, stepsDone: state.stepsDone, earned: state.earned, spent: state.spent, findsFound: state.findsFound, findsSold: state.findsSold, contractsDone: state.contractsDone, contractsFailed: state.contractsFailed, hazardsTaken: state.hazardsTaken, heatGained: state.heatGained, upgrades: state.upgrades.length, activeContract: state.activeContract, contractProgress: state.contractProgress, session: state.session, stepsLeft: state.sessionStepsLeft, resource: state.resource, resourceMax: lifeguardEnergyMax(state.upgrades), dailyEarned: state.dailyEarned, totalYield: state.totalYield, bestStreak: state.bestStreak, bestSession: state.bestSession, bestSessionYield: state.bestSessionYield, specialsUsed: state.specialsUsed, weatherStops: state.weatherStops, season: state.season, event: state.event };
    },
    hudLine() {
      if (!state.session) return '';
      return 'Lifeguard: ' + state.session + ' — ' + state.sessionStepsLeft + ' steps left, energy ' + state.resource;
    },
    interact() {
      const pos = getPlayerPos() || { x: 0, z: 0 };
      const dx = pos.x - 60;
      const dz = pos.z - 500;
      if (Math.sqrt(dx * dx + dz * dz) > 30) return false;
      if (state.session) { sys.respond(); return true; }
      const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
      if (held > 0) { sys.sellAllFinds(); return true; }
      sys.patrol(BEACH_PATROLS[0].id);
      return true;
    },
  };
  return sys;
}

export function createLifeguardExtras(system) {
  const st = system.state;
  let hired = [];
  let claimed = [];
  let wages = 0;
  const bonusFor = (skill) => hired.reduce((sum, id) => {
    const h = LIFEGUARD_HELPERS.find((x) => x.id === id);
    return sum + (h && h.skill === skill ? h.bonus : 0);
  }, 0);

  return {
    hireHelper(id) {
      const h = LIFEGUARD_HELPERS.find((x) => x.id === id);
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
        const h = LIFEGUARD_HELPERS.find((x) => x.id === id);
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
      return LIFEGUARD_CHALLENGES.map((ch) => lifeguardChallengeProgress(ch, st));
    },
    claimChallenge(id) {
      const ch = LIFEGUARD_CHALLENGES.find((x) => x.id === id);
      if (!ch) return { ok: false, reason: 'no-such-challenge' };
      if (claimed.includes(id)) return { ok: false, reason: 'already-claimed', id };
      const prog = lifeguardChallengeProgress(ch, st);
      if (!prog.done) return { ok: false, reason: 'not-done', have: prog.have, goal: prog.goal };
      claimed.push(id);
      st.challengesClaimed.push(id);
      st.xp += ch.xp;
      st.rank = lifeguardRankFor(st.xp);
      return { ok: true, id: ch.id, xp: ch.xp };
    },
    achievements() {
      return LIFEGUARD_ACHIEVEMENTS.map((a) => ({ id: a.id, name: a.name, desc: a.desc, done: !!a.check(st) }));
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
        total += lifeguardPriceFor(id, st.dayDrift, st.rank, st.upgrades) * st.inventory[id];
      });
      total = Math.round(total * 1.1 * 10) / 10;
      st.inventory = {};
      st.findsSold += count;
      st.earned += total;
      st.dailyEarned += total;
      return { ok: true, total, count, bonus: 'bundle +10%' };
    },
    checkEnergy() {
      const max = lifeguardEnergyMax(st.upgrades);
      return { ok: true, resource: st.resource, max, name: 'energy', percent: max ? Math.round((st.resource / max) * 100) : 0 };
    },
    restUp() {
      st.resource = lifeguardEnergyMax(st.upgrades);
      return { ok: true, resource: st.resource, max: st.resource };
    },
    countLogs() {
      const count = Object.values(st.inventory).reduce((a, b) => a + b, 0);
      return { ok: true, count, total: count };
    },
    get helpers() { return hired.slice(); },
    get claimed() { return claimed.slice(); },
    get wagesPaid() { return wages; },
  };
}

export function createLifeguardMarket(system) {
  const st = system.state;
  let currentEvent = null;
  let currentSeason = st.season || 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  const priceOf = (itemId, basePrice) => {
    const em = currentEvent ? lifeguardEventMult(currentEvent, itemId) : 1;
    const sm = lifeguardSeasonMult(currentSeason);
    return Math.round(basePrice * em * sm * 10) / 10;
  };

  return {
    setEvent(id) {
      const ev = LIFEGUARD_MARKET.find((m) => m.id === id);
      if (!ev) return { ok: false, reason: 'no-such-event' };
      currentEvent = id;
      st.event = id;
      return { ok: true, event: id };
    },
    setSeason(id) {
      const s = LIFEGUARD_SEASONS.find((x) => x.id === id);
      if (!s) return { ok: false, reason: 'no-such-season' };
      currentSeason = id;
      st.season = id;
      return { ok: true, season: id };
    },
    eventPrice(itemId, basePrice) {
      return priceOf(itemId, basePrice);
    },
    bulkDeal(rescueId, qty) {
      if (!qty || qty < 20) return { ok: false, reason: 'not-enough', qty: qty || 0, need: 20 };
      const held = st.inventory[rescueId] || 0;
      if (held < qty) return { ok: false, reason: 'not-enough-held', have: held, need: qty };
      const r = rescueById(rescueId);
      if (!r) return { ok: false, reason: 'no-such-find' };
      const unit = priceOf(rescueId, r.value);
      const total = Math.round(unit * qty * 1.1 * 10) / 10;
      st.inventory[rescueId] = held - qty;
      if (st.inventory[rescueId] <= 0) delete st.inventory[rescueId];
      st.findsSold += qty;
      st.earned += total;
      st.dailyEarned += total;
      bulkTraded += qty;
      dealsClaimed += 1;
      return { ok: true, total, qty, unit, bonus: 'bulk +10%' };
    },
    dailyDeals() {
      return LIFEGUARD_MARKET.map((m) => ({ id: m.id, name: m.name, finds: m.finds.slice(), mult: m.mult, desc: m.desc }));
    },
    marketSummary() {
      return { event: currentEvent, season: currentSeason, dealsClaimed, bulkTraded, deals: this.dailyDeals() };
    },
    get event() { return currentEvent; },
    get season() { return currentSeason; },
  };
}
