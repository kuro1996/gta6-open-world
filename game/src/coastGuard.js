export const RESCUE_MISSIONS = [
  { id: 'near-shore', name: 'Near Shore', fee: 0, difficulty: 1, steps: 5, duration: 120, risk: 0.1, distance: 2, response: 5, desc: 'A quick call just off the beach.' },
  { id: 'harbour-guard', name: 'Harbour Guard', fee: 0, difficulty: 1, steps: 6, duration: 130, risk: 0.1, distance: 3, response: 8, desc: 'Guarding the harbour entrance.' },
  { id: 'reef-search', name: 'Reef Search', fee: 0, difficulty: 2, steps: 7, duration: 150, risk: 0.2, distance: 6, response: 12, desc: 'Searching the reef for a lost boat.' },
  { id: 'island-call', name: 'Island Call', fee: 0, difficulty: 2, steps: 8, duration: 160, risk: 0.2, distance: 9, response: 15, desc: 'A call from the far island.' },
  { id: 'fishing-rescue', name: 'Fishing Rescue', fee: 0, difficulty: 3, steps: 9, duration: 190, risk: 0.3, distance: 12, response: 20, desc: 'A fishing boat in trouble.' },
  { id: 'cargo-search', name: 'Cargo Search', fee: 0, difficulty: 3, steps: 9, duration: 200, risk: 0.3, distance: 15, response: 25, desc: 'Lost cargo drifting at sea.' },
  { id: 'night-patrol', name: 'Night Patrol', fee: 0, difficulty: 3, steps: 10, duration: 210, risk: 0.4, distance: 18, response: 30, desc: 'A night patrol in dark water.' },
  { id: 'storm-search', name: 'Storm Search', fee: 0, difficulty: 4, steps: 10, duration: 230, risk: 0.5, distance: 24, response: 40, desc: 'Searching through storm seas.' },
  { id: 'deep-search', name: 'Deep Search', fee: 0, difficulty: 4, steps: 11, duration: 250, risk: 0.5, distance: 30, response: 50, desc: 'A deep-water search far offshore.' },
  { id: 'grand-sweep', name: 'Grand Sweep', fee: 0, difficulty: 5, steps: 12, duration: 280, risk: 0.6, distance: 40, response: 60, desc: 'A grand sweep of the whole coast.' },
];

export const COASTGUARD_FINDS = [
  { id: 'life-ring', name: 'Life Ring', value: 6, rarity: 0.55, weight: 0.5, desc: 'A life ring pulled from the sea.' },
  { id: 'flare', name: 'Flare', value: 9, rarity: 0.48, weight: 0.2, desc: 'A spent flare from a rescue.' },
  { id: 'rope-coil', name: 'Rope Coil', value: 13, rarity: 0.38, weight: 1.0, desc: 'A coil of salt-stiff rope.' },
  { id: 'drift-crate', name: 'Drift Crate', value: 19, rarity: 0.3, weight: 3.0, desc: 'A crate that drifted for weeks.' },
  { id: 'compass', name: 'Brass Compass', value: 30, rarity: 0.22, weight: 0.4, desc: 'A brass compass from a wreck.' },
  { id: 'logbook', name: 'Logbook', value: 45, rarity: 0.15, weight: 0.8, desc: 'A water-stained ship logbook.' },
  { id: 'anchor', name: 'Small Anchor', value: 65, rarity: 0.1, weight: 5.0, desc: 'A small anchor from a lost boat.' },
  { id: 'gold-bar', name: 'Gold Bar', value: 120, rarity: 0.06, weight: 1.0, desc: 'A gold bar from a smuggler.' },
  { id: 'smuggler-cache', name: 'Smuggler Cache', value: 200, rarity: 0.04, weight: 2.0, desc: 'A hidden cache of contraband.' },
  { id: 'sunken-chest', name: 'Sunken Chest', value: 380, rarity: 0.02, weight: 6.0, desc: 'A chest raised from the deep.' },
];

export const COASTGUARD_UPGRADES = [
  { id: 'new-cutter', name: 'New Cutter', cost: 450, desc: 'A new cutter holds more fuel.', effect: 'fuel max +60' },
  { id: 'find-plus', name: 'Salvage Spotter', cost: 260, desc: 'Spots rare salvage more often.', effect: 'rare salvage boost 1.25' },
  { id: 'price-plus', name: 'Salvage License', cost: 310, desc: 'Sells salvage for more cash.', effect: 'sell price +20%' },
  { id: 'carry-plus', name: 'Hold Extension', cost: 220, desc: 'Carry more salvage per mission.', effect: 'carry cap +10' },
  { id: 'sonar-cg', name: 'Sonar', cost: 350, desc: 'Sonar finds wrecks below.', effect: 'salvage chance up' },
  { id: 'radio-pro', name: 'Pro Radio', cost: 200, desc: 'Reaches ships far offshore.', effect: 'mission chance up' },
  { id: 'life-raft', name: 'Life Raft', cost: 280, desc: 'A raft for many survivors.', effect: 'rescue value up' },
  { id: 'helicopter', name: 'Helicopter', cost: 600, desc: 'A helicopter for the farthest calls.', effect: 'range up' },
];

export const COASTGUARD_RANKS = [
  { level: 0, name: 'Cadet', xp: 0, perk: 'Near shore missions unlocked' },
  { level: 1, name: 'Patrol Officer', xp: 120, perk: 'Island calls open up' },
  { level: 2, name: 'Rescue Coxswain', xp: 300, perk: 'Deep searches pay better' },
  { level: 3, name: 'Station Chief', xp: 620, perk: 'Rare salvage appears more often' },
  { level: 4, name: 'Guardian of the Coast', xp: 1100, perk: 'The grand sweep holds no fear' },
];

export const COASTGUARD_EVENTS = [
  { id: 'calm-seas', name: 'Calm Seas', desc: 'Flat water across the coast.' },
  { id: 'mayday-drill', name: 'Mayday Drill', desc: 'A practice rescue for the crew.' },
  { id: 'fog-bank', name: 'Fog Bank', desc: 'Fog hides the horizon.' },
  { id: 'smuggler-tip', name: 'Smuggler Tip', desc: 'A tip about smugglers offshore.' },
  { id: 'rough-seas', name: 'Rough Seas', desc: 'Big seas rock the cutter.' },
  { id: 'harbour-day', name: 'Harbour Day', desc: 'Crowds tour the coast guard station.' },
  { id: 'whale-rescue', name: 'Whale Rescue', desc: 'A beached whale needs help.' },
  { id: 'sunny-patrol', name: 'Sunny Patrol', desc: 'Sun and calm seas together.' },
  { id: 'new-cutter', name: 'New Cutter', desc: 'A new cutter joins the fleet.' },
  { id: 'storm-warning', name: 'Storm Warning', desc: 'A storm builds offshore.' },
];

export const COASTGUARD_CONTRACTS = [
  { id: 'ring-order', name: 'Ring Order', material: 'life-ring', qty: 6, pay: 130, days: 3, rep: 10, desc: 'A museum wants six life rings.' },
  { id: 'crate-order', name: 'Crate Order', material: 'drift-crate', qty: 4, pay: 220, days: 3, rep: 15, desc: 'A trader wants four drift crates.' },
  { id: 'compass-order', name: 'Compass Order', material: 'compass', qty: 3, pay: 300, days: 4, rep: 20, desc: 'A collector wants three compasses.' },
  { id: 'gold-order', name: 'Gold Order', material: 'gold-bar', qty: 2, pay: 520, days: 5, rep: 30, desc: 'A mint wants two gold bars.' },
  { id: 'logbook-order', name: 'Logbook Order', material: 'logbook', qty: 3, pay: 320, days: 4, rep: 20, desc: 'An archive wants three logbooks.' },
  { id: 'chest-order', name: 'Chest Order', material: 'sunken-chest', qty: 1, pay: 700, days: 5, rep: 35, desc: 'A collector wants one sunken chest.' },
];

export const COASTGUARD_CHALLENGES = [
  { id: 'first-mission', name: 'First Mission', target: 'sessions', goal: 1, xp: 20, desc: 'Finish one rescue mission.' },
  { id: 'five-missions', name: 'Five Missions', target: 'sessions', goal: 5, xp: 60, desc: 'Finish five rescue missions.' },
  { id: 'salvage-ten', name: 'Salvage Ten', target: 'findsFound', goal: 10, xp: 40, desc: 'Salvage ten finds.' },
  { id: 'salvage-fifty', name: 'Salvage Fifty', target: 'findsFound', goal: 50, xp: 120, desc: 'Salvage fifty finds.' },
  { id: 'earn-five-hundred', name: 'Earn Five Hundred', target: 'earned', goal: 500, xp: 100, desc: 'Earn 500 cash in total.' },
  { id: 'sell-twenty', name: 'Sell Twenty', target: 'findsSold', goal: 20, xp: 80, desc: 'Sell twenty salvage items.' },
  { id: 'contract-three', name: 'Contract Three', target: 'contractsDone', goal: 3, xp: 90, desc: 'Deliver three contracts.' },
  { id: 'steps-hundred', name: 'Hundred Steps', target: 'stepsDone', goal: 100, xp: 110, desc: 'Take a hundred mission steps.' },
];

export const COASTGUARD_ACHIEVEMENTS = [
  { id: 'on-watch', name: 'On Watch', check: (s) => s.sessions >= 1, desc: 'Finish your first mission.' },
  { id: 'coast-regular', name: 'Coast Regular', check: (s) => s.sessions >= 10, desc: 'Finish ten missions.' },
  { id: 'salvager', name: 'Salvager', check: (s) => s.findsFound >= 25, desc: 'Salvage twenty-five finds.' },
  { id: 'deep-diver', name: 'Deep Diver', check: (s) => s.findsFound >= 100, desc: 'Salvage a hundred finds.' },
  { id: 'rich-guard', name: 'Rich Guard', check: (s) => s.earned >= 1000, desc: 'Earn a thousand cash.' },
  { id: 'deal-maker', name: 'Deal Maker', check: (s) => s.contractsDone >= 5, desc: 'Deliver five contracts.' },
  { id: 'streak-five', name: 'Streak Five', check: (s) => s.bestStreak >= 5, desc: 'Reach a streak of five.' },
  { id: 'coast-master', name: 'Coast Master', check: (s) => s.rank >= 4, desc: 'Reach the top rank.' },
];

export const COASTGUARD_TIPS = [
  { id: 'tip-fuel', name: 'Watch Fuel', text: 'Return to base before fuel runs out.' },
  { id: 'tip-rare', name: 'Rare Salvage', text: 'Far missions hide the rarest salvage.' },
  { id: 'tip-rank', name: 'Rank Up', text: 'Higher rank boosts rare salvage.' },
  { id: 'tip-sell', name: 'Sell Often', text: 'Sell salvage before the drift turns.' },
  { id: 'tip-contract', name: 'Contracts Pay', text: 'Contracts pay more than raw sales.' },
  { id: 'tip-duty', name: 'Always On', text: 'Missions run in any weather, any hour.' },
  { id: 'tip-cap', name: 'Carry Cap', text: 'Extend the hold to carry more.' },
  { id: 'tip-season', name: 'Season Prices', text: 'Summer prices beat winter prices.' },
];

export const COASTGUARD_LEADERBOARD = [
  { name: 'Anchor', value: 930, desc: 'Top officer of the season.' },
  { name: 'Storm', value: 730, desc: 'Storm search veteran.' },
  { name: 'Wren', value: 550, desc: 'Salvage queen of the coast.' },
  { name: 'Cole', value: 330, desc: 'Steady officer, steady hands.' },
  { name: 'You', value: 0, desc: 'Your score on the board.' },
];

export const COASTGUARD_RECORDS = [
  { id: 'most-missions', name: 'Most Missions', stat: 'sessions', unit: 'missions', desc: 'Most mission sessions finished.' },
  { id: 'most-salvage', name: 'Most Salvage', stat: 'findsFound', unit: 'salvage', desc: 'Most salvage found.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'cash', desc: 'Most cash earned.' },
  { id: 'best-yield', name: 'Best Yield', stat: 'bestSessionYield', unit: 'cash', desc: 'Best single mission yield.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'streak', desc: 'Longest good streak.' },
];

export const COASTGUARD_MARKET = [
  { id: 'salvage-yard', name: 'Salvage Yard', finds: ['life-ring', 'flare', 'rope-coil'], mult: 1.1, desc: 'Buys common salvage.' },
  { id: 'antique-shop', name: 'Antique Shop', finds: ['compass', 'logbook'], mult: 1.25, desc: 'Pays well for old compasses.' },
  { id: 'mint', name: 'Mint', finds: ['gold-bar'], mult: 1.5, desc: 'Best buyer for gold bars.' },
  { id: 'collector', name: 'Collector', finds: ['sunken-chest'], mult: 1.6, desc: 'Pays a premium for chests.' },
  { id: 'maritime-museum', name: 'Maritime Museum', finds: ['anchor', 'logbook'], mult: 1.4, desc: 'Top price for anchors and logs.' },
  { id: 'trader', name: 'Coast Trader', finds: ['drift-crate', 'smuggler-cache'], mult: 1.3, desc: 'Buys crates and caches.' },
  { id: 'dock-stall', name: 'Dock Stall', finds: ['life-ring', 'flare'], mult: 1.05, desc: 'Quick sales at the docks.' },
  { id: 'rare-buyer', name: 'Rare Buyer', finds: ['sunken-chest', 'gold-bar', 'smuggler-cache'], mult: 1.45, desc: 'Buys only the rarest salvage.' },
];

export const COASTGUARD_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.0, desc: 'Mild seas, steady prices.' },
  { id: 'summer', name: 'Summer', mult: 1.2, desc: 'Peak season, best prices.' },
  { id: 'autumn', name: 'Autumn', mult: 0.9, desc: 'Cooling seas, softer prices.' },
  { id: 'winter', name: 'Winter', mult: 0.8, desc: 'Rough seas, lowest prices.' },
];

export const COASTGUARD_SEASONAL = [
  { season: 'summer', find: 'sunken-chest', mult: 1.3 },
  { season: 'summer', find: 'life-ring', mult: 1.2 },
  { season: 'spring', find: 'compass', mult: 1.2 },
  { season: 'spring', find: 'drift-crate', mult: 1.15 },
  { season: 'autumn', find: 'gold-bar', mult: 1.25 },
  { season: 'autumn', find: 'logbook', mult: 1.1 },
  { season: 'winter', find: 'smuggler-cache', mult: 1.4 },
  { season: 'winter', find: 'anchor', mult: 1.2 },
];

export const COASTGUARD_QUICK_START = [
  'Dispatch the Near Shore mission.',
  'Search grids until fuel runs low.',
  'Sell salvage at the Salvage Yard.',
  'Buy the Hold Extension early.',
  'Take a ring order contract.',
  'Save up for the New Cutter.',
];

export const COASTGUARD_HELPERS = [
  { id: 'crew-mate', name: 'Crew Mate', wage: 20, skill: 'sailing', bonus: 0.1, desc: 'A steady hand on the cutter.' },
  { id: 'rescue-diver', name: 'Rescue Diver', wage: 40, skill: 'rescue', bonus: 0.25, desc: 'Dives for salvage in deep water.' },
  { id: 'navigator', name: 'Navigator', wage: 35, skill: 'navigation', bonus: 0.2, desc: 'Charts every search grid.' },
  { id: 'medic', name: 'Medic', wage: 30, skill: 'medical', bonus: 0.15, desc: 'Treats survivors on board.' },
];

export const COASTGUARD_META = { system: 'coastguard', version: '7c-B2', author: 'builder-2', dataCount: 10, findCount: 10, upgradeCount: 8, rankCount: 5 };

const MISSION_MAP = new Map(RESCUE_MISSIONS.map((m) => [m.id, m]));
const FIND_MAP = new Map(COASTGUARD_FINDS.map((f) => [f.id, f]));
const missionById = (id) => MISSION_MAP.get(id) || null;
const findById = (id) => FIND_MAP.get(id) || null;
const asUpgrades = (v) => (Array.isArray(v) ? v : (v && Array.isArray(v.upgrades) ? v.upgrades : []));
const asRank = (v) => (typeof v === 'number' ? v : (v && typeof v.rank === 'number' ? v.rank : 0));

export function coastGuardRankFor(xp) {
  let lvl = 0;
  for (const r of COASTGUARD_RANKS) if (xp >= r.xp) lvl = r.level;
  return lvl;
}

export function coastGuardFuelMax(upgrades) {
  return asUpgrades(upgrades).includes('new-cutter') ? 160 : 100;
}

export function coastGuardPriceFor(findId, drift, rank, upgrades) {
  const f = findById(findId);
  if (!f) return 0;
  const d = typeof drift === 'number' ? drift : 0;
  const owned = Array.isArray(upgrades) ? upgrades : asUpgrades(rank);
  let p = f.value * (1 + d) * (1 + asRank(rank) * 0.1);
  if (owned.includes('price-plus')) p *= 1.2;
  return Math.round(Math.max(1, p) * 10) / 10;
}

export function coastGuardCarryCap(rank, upgrades) {
  const owned = Array.isArray(upgrades) ? upgrades : asUpgrades(rank);
  let cap = 30 + asRank(rank) * 2;
  if (owned.includes('carry-plus')) cap += 10;
  return cap;
}

export function coastGuardScore(sessions, yld, hazards) {
  const v = sessions * 10 + Math.round(yld) - hazards * 5;
  return v < 0 ? 0 : v;
}

export function coastGuardGrade(score) {
  switch (true) {
    case score >= 400: return 'S';
    case score >= 250: return 'A';
    case score >= 140: return 'B';
    case score >= 60: return 'C';
    default: return 'D';
  }
}

export function coastGuardWeeklyGoal(state) {
  const s = state || {};
  const sessions = { have: s.sessions || 0, goal: 5, done: (s.sessions || 0) >= 5 };
  const sold = { have: s.findsSold || 0, goal: 40, done: (s.findsSold || 0) >= 40 };
  const earned = { have: s.earned || 0, goal: 600, done: (s.earned || 0) >= 600 };
  return { sessions, sold, earned, allDone: sessions.done && sold.done && earned.done };
}

export function coastGuardEfficiency(state) {
  const s = state || {};
  if (!s.sessions) return 100;
  return Math.round((Math.max(0, s.sessions - (s.contractsFailed || 0)) / s.sessions) * 100);
}

export function coastGuardProfitPerMission(state) {
  const s = state || {};
  if (!s.sessions) return 0;
  return Math.round(((s.earned || 0) / s.sessions) * 10) / 10;
}

export function coastGuardInventoryValue(state) {
  const s = state || {};
  let total = 0;
  for (const id of Object.keys(s.inventory || {})) {
    total += (s.inventory[id] || 0) * coastGuardPriceFor(id, s.dayDrift || 0, s.rank || 0, s.upgrades || []);
  }
  return Math.round(total * 10) / 10;
}

export function coastGuardSummary(state) {
  const s = state || {};
  const rn = (COASTGUARD_RANKS[s.rank || 0] || {}).name || 'Cadet';
  return 'Coast Guard: ' + rn + ' with ' + (s.sessions || 0) + ' missions, ' + (s.findsFound || 0) + ' salvage and ' + (s.earned || 0) + ' cash earned.';
}

export function coastGuardNextGoal(state) {
  const s = state || {};
  if (!(s.sessions || 0)) return 'Finish your first mission.';
  if ((s.sessions || 0) < 5) return 'Finish 5 missions.';
  if ((s.earned || 0) < 500) return 'Earn 500 cash in total.';
  if ((s.rank || 0) < 4) return 'Reach rank ' + COASTGUARD_RANKS[(s.rank || 0) + 1].name + '.';
  return 'Become a legend of Coast Guard.';
}

export function coastGuardRecordFor(id, state) {
  const rec = COASTGUARD_RECORDS.find((r) => r.id === id);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, stat: rec.stat, unit: rec.unit, desc: rec.desc, value: (state && state[rec.stat]) || 0 };
}

export function coastGuardAllRecords(state) {
  return COASTGUARD_RECORDS.map((r) => coastGuardRecordFor(r.id, state));
}

export function coastGuardLeaderboardWith(playerScore) {
  const board = COASTGUARD_LEADERBOARD.map((e) => ({ name: e.name, value: e.name === 'You' ? playerScore : e.value, desc: e.desc }));
  board.sort((a, b) => b.value - a.value);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, value: e.value, desc: e.desc }));
}

export function coastGuardEventFor(day) {
  return COASTGUARD_MARKET[((day || 0) % COASTGUARD_MARKET.length + COASTGUARD_MARKET.length) % COASTGUARD_MARKET.length];
}

export function coastGuardEventMult(eventId, findId) {
  const ev = COASTGUARD_MARKET.find((m) => m.id === eventId);
  return ev && ev.finds.includes(findId) ? ev.mult : 1;
}

export function coastGuardSeasonMult(seasonId) {
  const s = COASTGUARD_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function coastGuardSeasonalPriceMult(seasonId, findId) {
  const row = COASTGUARD_SEASONAL.find((x) => x.season === seasonId && x.find === findId);
  return row ? row.mult : 1;
}

export function coastGuardBestBuyer() {
  let best = COASTGUARD_MARKET[0];
  for (const m of COASTGUARD_MARKET) if (m.mult > best.mult) best = m;
  return best;
}

export function coastGuardBestSeason() {
  let best = COASTGUARD_SEASONS[0];
  for (const s of COASTGUARD_SEASONS) if (s.mult > best.mult) best = s;
  return best;
}

export function coastGuardTipFor(day) {
  return COASTGUARD_TIPS[((day || 0) % COASTGUARD_TIPS.length + COASTGUARD_TIPS.length) % COASTGUARD_TIPS.length];
}

export function coastGuardQuickStart() {
  return COASTGUARD_QUICK_START.slice();
}

export function coastGuardChallengeProgress(challenge, state) {
  const have = (state && state[challenge.target]) || 0;
  return { id: challenge.id, name: challenge.name, have, goal: challenge.goal, done: have >= challenge.goal, xp: challenge.xp };
}

export function coastGuardProgressPercent(state) {
  const s = state || {};
  if (!s.sessions) return 0;
  return Math.round((Math.max(0, s.sessions - (s.contractsFailed || 0)) / s.sessions) * 100);
}

export function coastGuardTotalValue(state) {
  const s = state || {};
  return Math.round((coastGuardInventoryValue(s) + (s.earned || 0)) * 10) / 10;
}

export function coastGuardHelperBonus(helperIds, skill) {
  let sum = 0;
  for (const id of (helperIds || [])) {
    const h = COASTGUARD_HELPERS.find((x) => x.id === id);
    if (h && h.skill === skill) sum += h.bonus;
  }
  return sum;
}

export function coastGuardFindsByRarity(maxRarity) {
  return COASTGUARD_FINDS.filter((f) => f.rarity <= maxRarity).map((f) => f.id);
}

export function coastGuardMissionByDistance(distance) {
  let pick = RESCUE_MISSIONS[RESCUE_MISSIONS.length - 1];
  for (const m of RESCUE_MISSIONS) {
    if (m.distance >= distance) { pick = m; break; }
  }
  return pick;
}

function coastBlank() {
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

export function createCoastGuardSystem(ctx) {
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
  const state = coastBlank();

  function rankSync() {
    const lvl = coastGuardRankFor(state.xp);
    if (lvl > state.rank) log('Rank up: ' + COASTGUARD_RANKS[lvl].name);
    state.rank = lvl;
  }

  function endMission() {
    const yld = state.sessionYield;
    const mid = state.session;
    state.totalYield += yld;
    if (yld > state.bestSessionYield) {
      state.bestSessionYield = yld;
      state.bestSession = mid;
    }
    if (yld > 0) {
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
    } else {
      state.streak = 0;
    }
    state.session = null;
    state.sessionStepsLeft = 0;
    state.sessionTimeLeft = 0;
  }

  function dayRoll() {
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
      const pick = COASTGUARD_FINDS[Math.floor(rng() * COASTGUARD_FINDS.length)];
      state.inventory[pick.id] = (state.inventory[pick.id] || 0) + 3;
      state.findsFound += 3;
      state.event = 'gift';
      return { ok: true, event: 'gift', name: 'Gift', kind: 'gift', find: pick.id, qty: 3 };
    }
    if (roll < 0.46) {
      const ev = COASTGUARD_EVENTS[Math.floor(rng() * COASTGUARD_EVENTS.length)];
      state.event = ev.id;
      return { ok: true, event: ev.id, name: ev.name, kind: 'named' };
    }
    state.event = null;
    return { ok: true, event: null, name: 'none', kind: 'none' };
  }

  const sys = {
    name: 'Coast Guard',
    state,
    dispatch(missionId) {
      const mission = missionById(missionId);
      if (!mission) return { ok: false, reason: 'no-such-site' };
      if (state.session) return { ok: false, reason: 'already-in-session' };
      if (getCash() < mission.fee) return { ok: false, reason: 'not-enough-cash', cost: mission.fee };
      addCash(-mission.fee);
      state.spent += mission.fee;
      state.session = mission.id;
      state.sessionStepsLeft = mission.steps;
      state.sessionTimeLeft = mission.duration;
      state.resource = coastGuardFuelMax(state.upgrades);
      state.sessionYield = 0;
      state.sessionFinds = [];
      state.sessions += 1;
      state.dailySessions += 1;
      log('Dispatching ' + mission.name);
      return { ok: true, id: mission.id, name: mission.name, fee: mission.fee, steps: mission.steps, duration: mission.duration };
    },
    searchGrid() {
      if (!state.session) return { ok: false, reason: 'no-session' };
      const mission = missionById(state.session);
      state.resource -= 9;
      state.sessionStepsLeft -= 1;
      state.stepsDone += 1;
      state.actions += 1;
      let held = 0;
      for (const k of Object.keys(state.inventory)) held += state.inventory[k];
      const cap = coastGuardCarryCap(state.rank, state.upgrades);
      let qty = 1 + Math.floor(rng() * 3);
      if (held + qty > cap) qty = cap - held;
      let found = null;
      let bonus = false;
      let hazard = false;
      if (qty > 0) {
        const weights = COASTGUARD_FINDS.map((f) => {
          let w = 1 / f.rarity;
          if (f.rarity < 0.08 && state.rank >= 3) w *= 1.6;
          if (f.rarity < 0.08 && state.upgrades.includes('find-plus')) w *= 1.25;
          return w;
        });
        const totalW = weights.reduce((a, b) => a + b, 0);
        let roll = rng() * totalW;
        let idx = weights.length - 1;
        for (let i = 0; i < weights.length; i++) {
          roll -= weights[i];
          if (roll <= 0) { idx = i; break; }
        }
        found = COASTGUARD_FINDS[idx];
        if (rng() < 0.05) { qty += 1; bonus = true; }
        state.inventory[found.id] = (state.inventory[found.id] || 0) + qty;
        state.findsFound += qty;
        state.sessionFinds.push(found.id);
        state.sessionYield += qty * found.value;
      }
      if (mission && rng() < mission.risk * 0.04) {
        hazard = true;
        state.hazardsTaken += 1;
        state.heatGained += 1;
        addHeat(1);
        state.resource -= 18;
      }
      let ended = false;
      if (state.resource <= 0 || state.sessionStepsLeft <= 0) {
        state.resource = Math.max(0, state.resource);
        endMission();
        ended = true;
      }
      return { ok: true, find: found ? { id: found.id, name: found.name, qty } : null, qty, bonus, hazard, stepsLeft: state.sessionStepsLeft, resource: state.resource, ended };
    },
    returnToBase() {
      if (!state.session) return { ok: false, reason: 'no-session' };
      const id = state.session;
      endMission();
      log('Returned to base from ' + id);
      return { ok: true, id, yield: state.totalYield };
    },
    pingSonar() {
      const mission = state.session ? missionById(state.session) : null;
      return { ok: true, site: mission ? mission.id : null, siteName: mission ? mission.name : null, weather: (getWeather() || {}).condition || 'clear', hour: getHour(), resource: state.resource, resourceMax: coastGuardFuelMax(state.upgrades), stepsLeft: state.sessionStepsLeft };
    },
    sellFind(findId) {
      const f = findById(findId);
      if (!f) return { ok: false, reason: 'no-such-find' };
      const held = state.inventory[findId] || 0;
      if (held <= 0) return { ok: false, reason: 'not-held', id: findId };
      const price = coastGuardPriceFor(findId, state.dayDrift, state.rank, state.upgrades);
      state.inventory[findId] = held - 1;
      if (state.inventory[findId] <= 0) delete state.inventory[findId];
      state.findsSold += 1;
      state.earned += price;
      state.dailyEarned += price;
      addCash(price);
      return { ok: true, id: findId, name: f.name, qty: 1, price, total: price };
    },
    sellAllFinds() {
      const ids = Object.keys(state.inventory);
      if (ids.length === 0) return { ok: false, reason: 'nothing-held' };
      let total = 0;
      let count = 0;
      for (const id of ids) {
        total += coastGuardPriceFor(id, state.dayDrift, state.rank, state.upgrades) * state.inventory[id];
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
      const up = COASTGUARD_UPGRADES.find((u) => u.id === upId);
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
      const ct = COASTGUARD_CONTRACTS.find((x) => x.id === contractId);
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
      const ct = COASTGUARD_CONTRACTS.find((x) => x.id === state.activeContract);
      const have = state.inventory[ct.material] || 0;
      if (have < ct.qty) return { ok: false, reason: 'not-enough', have, need: ct.qty, material: ct.material };
      state.inventory[ct.material] = have - ct.qty;
      if (state.inventory[ct.material] <= 0) delete state.inventory[ct.material];
      state.contractsDone += 1;
      state.earned += ct.pay;
      state.dailyEarned += ct.pay;
      addCash(ct.pay);
      state.xp += ct.rep;
      rankSync();
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
      return COASTGUARD_FINDS.map((f) => ({ id: f.id, name: f.name, price: coastGuardPriceFor(f.id, state.dayDrift, state.rank, state.upgrades), base: f.value, drift: state.dayDrift, held: state.inventory[f.id] || 0 }));
    },
    siteReport(missionId) {
      const mission = missionById(missionId);
      if (!mission) return { ok: false, reason: 'no-such-site' };
      return { ok: true, id: mission.id, name: mission.name, fee: mission.fee, difficulty: mission.difficulty, steps: mission.steps, duration: mission.duration, risk: mission.risk, distance: mission.distance, response: mission.response, desc: mission.desc };
    },
    dailyEvent() {
      return dayRoll();
    },
    tick(dt) {
      if (!state.session) return;
      state.sessionTimeLeft -= dt;
      state.resource -= dt * 0.05;
      if (state.sessionTimeLeft <= 0 || state.resource <= 0) {
        state.resource = Math.max(0, state.resource);
        state.sessionTimeLeft = Math.max(0, state.sessionTimeLeft);
        endMission();
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
      return dayRoll();
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
      rankSync();
    },
    stats() {
      return { rank: (COASTGUARD_RANKS[state.rank] || {}).name || 'Cadet', xp: state.xp, sessions: state.sessions, actions: state.actions, stepsDone: state.stepsDone, earned: state.earned, spent: state.spent, findsFound: state.findsFound, findsSold: state.findsSold, contractsDone: state.contractsDone, contractsFailed: state.contractsFailed, hazardsTaken: state.hazardsTaken, heatGained: state.heatGained, upgrades: state.upgrades.length, activeContract: state.activeContract, contractProgress: state.contractProgress, session: state.session, stepsLeft: state.sessionStepsLeft, resource: state.resource, resourceMax: coastGuardFuelMax(state.upgrades), dailyEarned: state.dailyEarned, totalYield: state.totalYield, bestStreak: state.bestStreak, bestSession: state.bestSession, bestSessionYield: state.bestSessionYield, specialsUsed: state.specialsUsed, weatherStops: state.weatherStops, season: state.season, event: state.event };
    },
    hudLine() {
      if (!state.session) return '';
      return 'Coast Guard: ' + state.session + ' — ' + state.sessionStepsLeft + ' steps left, fuel ' + state.resource;
    },
    interact() {
      const pos = getPlayerPos() || { x: 0, z: 0 };
      const dx = pos.x - (-250);
      const dz = pos.z - (-500);
      if (Math.sqrt(dx * dx + dz * dz) > 30) return false;
      if (state.session) { sys.searchGrid(); return true; }
      let held = 0;
      for (const k of Object.keys(state.inventory)) held += state.inventory[k];
      if (held > 0) { sys.sellAllFinds(); return true; }
      sys.dispatch(RESCUE_MISSIONS[0].id);
      return true;
    },
  };
  return sys;
}

export function createCoastGuardExtras(system) {
  const st = system.state;
  let hired = [];
  let claimed = [];
  let wages = 0;

  function bonusFor(skill) {
    let sum = 0;
    for (const id of hired) {
      const h = COASTGUARD_HELPERS.find((x) => x.id === id);
      if (h && h.skill === skill) sum += h.bonus;
    }
    return sum;
  }

  return {
    hireHelper(id) {
      const h = COASTGUARD_HELPERS.find((x) => x.id === id);
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
        const h = COASTGUARD_HELPERS.find((x) => x.id === id);
        if (h) due += h.wage;
      }
      wages += due;
      st.wagesPaid = (st.wagesPaid || 0) + due;
      return { ok: true, due, helpers: hired.length, totalPaid: due };
    },
    helperBonus(skill) {
      return bonusFor(skill);
    },
    challenges() {
      return COASTGUARD_CHALLENGES.map((ch) => coastGuardChallengeProgress(ch, st));
    },
    claimChallenge(id) {
      const ch = COASTGUARD_CHALLENGES.find((x) => x.id === id);
      if (!ch) return { ok: false, reason: 'no-such-challenge' };
      if (claimed.includes(id)) return { ok: false, reason: 'already-claimed', id };
      const prog = coastGuardChallengeProgress(ch, st);
      if (!prog.done) return { ok: false, reason: 'not-done', have: prog.have, goal: prog.goal };
      claimed.push(id);
      st.challengesClaimed.push(id);
      st.xp += ch.xp;
      st.rank = coastGuardRankFor(st.xp);
      return { ok: true, id: ch.id, xp: ch.xp };
    },
    achievements() {
      return COASTGUARD_ACHIEVEMENTS.map((a) => ({ id: a.id, name: a.name, desc: a.desc, done: !!a.check(st) }));
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
      for (const k of Object.keys(st.inventory)) count += st.inventory[k];
      if (count < 10) return { ok: false, reason: 'not-enough', have: count, need: 10 };
      let total = 0;
      for (const id of Object.keys(st.inventory)) total += coastGuardPriceFor(id, st.dayDrift, st.rank, st.upgrades) * st.inventory[id];
      total = Math.round(total * 1.1 * 10) / 10;
      st.inventory = {};
      st.findsSold += count;
      st.earned += total;
      st.dailyEarned += total;
      return { ok: true, total, count, bonus: 'bundle +10%' };
    },
    checkFuel() {
      const max = coastGuardFuelMax(st.upgrades);
      return { ok: true, resource: st.resource, max, name: 'fuel', percent: max ? Math.round((st.resource / max) * 100) : 0 };
    },
    refuel() {
      st.resource = coastGuardFuelMax(st.upgrades);
      return { ok: true, resource: st.resource, max: st.resource };
    },
    weighSalvage() {
      let count = 0;
      let weight = 0;
      for (const id of Object.keys(st.inventory)) {
        const f = findById(id);
        count += st.inventory[id];
        if (f) weight += st.inventory[id] * f.weight;
      }
      return { ok: true, count, weight: Math.round(weight * 10) / 10, total: count };
    },
    get helpers() { return hired.slice(); },
    get claimed() { return claimed.slice(); },
    get wagesPaid() { return wages; },
  };
}

export function createCoastGuardMarket(system) {
  const st = system.state;
  let currentEvent = null;
  let currentSeason = st.season || 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  function calcPrice(itemId, basePrice) {
    const em = currentEvent ? coastGuardEventMult(currentEvent, itemId) : 1;
    const sm = coastGuardSeasonMult(currentSeason);
    return Math.round(basePrice * em * sm * 10) / 10;
  }

  return {
    setEvent(id) {
      const ev = COASTGUARD_MARKET.find((m) => m.id === id);
      if (!ev) return { ok: false, reason: 'no-such-event' };
      currentEvent = id;
      st.event = id;
      return { ok: true, event: id };
    },
    setSeason(id) {
      const s = COASTGUARD_SEASONS.find((x) => x.id === id);
      if (!s) return { ok: false, reason: 'no-such-season' };
      currentSeason = id;
      st.season = id;
      return { ok: true, season: id };
    },
    eventPrice(itemId, basePrice) {
      return calcPrice(itemId, basePrice);
    },
    bulkDeal(findId, qty) {
      if (!qty || qty < 20) return { ok: false, reason: 'not-enough', qty: qty || 0, need: 20 };
      const held = st.inventory[findId] || 0;
      if (held < qty) return { ok: false, reason: 'not-enough-held', have: held, need: qty };
      const f = findById(findId);
      if (!f) return { ok: false, reason: 'no-such-find' };
      const unit = calcPrice(findId, f.value);
      const total = Math.round(unit * qty * 1.1 * 10) / 10;
      st.inventory[findId] = held - qty;
      if (st.inventory[findId] <= 0) delete st.inventory[findId];
      st.findsSold += qty;
      st.earned += total;
      st.dailyEarned += total;
      bulkTraded += qty;
      dealsClaimed += 1;
      return { ok: true, total, qty, unit, bonus: 'bulk +10%' };
    },
    dailyDeals() {
      return COASTGUARD_MARKET.map((m) => ({ id: m.id, name: m.name, finds: m.finds.slice(), mult: m.mult, desc: m.desc }));
    },
    marketSummary() {
      return { event: currentEvent, season: currentSeason, dealsClaimed, bulkTraded, deals: this.dailyDeals() };
    },
    get event() { return currentEvent; },
    get season() { return currentSeason; },
  };
}
