export const DIVE_SITES = [
  { id: 'coral-garden', name: 'Coral Garden', fee: 20, difficulty: 1, steps: 6, duration: 120, risk: 0.1, depth: 8, current: 1, desc: 'A gentle shallow reef full of bright coral.' },
  { id: 'sandy-flats', name: 'Sandy Flats', fee: 15, difficulty: 1, steps: 5, duration: 100, risk: 0.1, depth: 6, current: 1, desc: 'Flat sand where shells wash up after the tide.' },
  { id: 'kelp-forest', name: 'Kelp Forest', fee: 30, difficulty: 2, steps: 8, duration: 150, risk: 0.2, depth: 14, current: 2, desc: 'Tall kelp swaying over a rocky floor.' },
  { id: 'turtle-reef', name: 'Turtle Reef', fee: 25, difficulty: 2, steps: 7, duration: 140, risk: 0.2, depth: 12, current: 2, desc: 'Turtles glide past the reef ledges here.' },
  { id: 'wreck-bay', name: 'Wreck Bay', fee: 50, difficulty: 3, steps: 10, duration: 220, risk: 0.4, depth: 28, current: 3, desc: 'A sunken freighter hiding old cargo.' },
  { id: 'cave-dive', name: 'Cave Dive', fee: 45, difficulty: 3, steps: 9, duration: 200, risk: 0.4, depth: 24, current: 3, desc: 'Dark caves that reward careful divers.' },
  { id: 'shark-point', name: 'Shark Point', fee: 60, difficulty: 4, steps: 11, duration: 260, risk: 0.5, depth: 32, current: 4, desc: 'Reef sharks patrol the edge of the drop.' },
  { id: 'drop-off', name: 'The Drop-Off', fee: 55, difficulty: 4, steps: 10, duration: 240, risk: 0.5, depth: 36, current: 4, desc: 'A sheer wall falling into deep blue.' },
  { id: 'blue-hole', name: 'Blue Hole', fee: 70, difficulty: 5, steps: 12, duration: 300, risk: 0.6, depth: 40, current: 5, desc: 'A deep sinkhole with rare finds below.' },
  { id: 'night-reef', name: 'Night Reef', fee: 40, difficulty: 3, steps: 8, duration: 180, risk: 0.3, depth: 18, current: 2, desc: 'The reef wakes up after dark.' },
];

export const SCUBA_FINDS = [
  { id: 'shell', name: 'Spiral Shell', value: 5, rarity: 0.5, weight: 0.2, desc: 'A common spiral shell from the sand.' },
  { id: 'starfish', name: 'Orange Starfish', value: 8, rarity: 0.45, weight: 0.3, desc: 'A bright starfish resting on coral.' },
  { id: 'bottle', name: 'Old Bottle', value: 12, rarity: 0.35, weight: 0.6, desc: 'A barnacled bottle with a note inside.' },
  { id: 'coral-frag', name: 'Coral Fragment', value: 20, rarity: 0.28, weight: 0.4, desc: 'A colourful fragment of reef coral.' },
  { id: 'seahorse', name: 'Golden Seahorse', value: 35, rarity: 0.18, weight: 0.1, desc: 'A tiny golden seahorse hiding in kelp.' },
  { id: 'jade-stone', name: 'Jade Stone', value: 60, rarity: 0.12, weight: 0.8, desc: 'A smooth green stone from the deep.' },
  { id: 'anchor-charm', name: 'Anchor Charm', value: 90, rarity: 0.07, weight: 0.5, desc: 'A brass anchor charm from a wreck.' },
  { id: 'pearl', name: 'Black Pearl', value: 150, rarity: 0.05, weight: 0.1, desc: 'A rare black pearl in an old oyster.' },
  { id: 'gold-coin', name: 'Gold Doubloon', value: 250, rarity: 0.03, weight: 0.4, desc: 'A gold coin from a pirate wreck.' },
  { id: 'treasure-chest', name: 'Treasure Chest', value: 500, rarity: 0.02, weight: 3.0, desc: 'A locked chest full of old treasure.' },
];

export const SCUBA_UPGRADES = [
  { id: 'rebreather', name: 'Rebreather', cost: 400, desc: 'Recycles air so dives last longer.', effect: 'air max +50' },
  { id: 'find-plus', name: 'Finders Goggles', cost: 250, desc: 'Spots rare finds more often.', effect: 'rare find boost 1.25' },
  { id: 'price-plus', name: 'Collector License', cost: 300, desc: 'Sells every find for more cash.', effect: 'sell price +20%' },
  { id: 'carry-plus', name: 'Cargo Net', cost: 200, desc: 'Carry more finds on each dive.', effect: 'carry cap +10' },
  { id: 'sonar', name: 'Hand Sonar', cost: 350, desc: 'Pings nearby finds through murk.', effect: 'find chance up' },
  { id: 'dive-light', name: 'Dive Light', cost: 150, desc: 'Lights caves and wrecks.', effect: 'cave finds up' },
  { id: 'wetsuit-pro', name: 'Pro Wetsuit', cost: 220, desc: 'Keeps warm in cold currents.', effect: 'hazard down' },
  { id: 'tank-twin', name: 'Twin Tanks', cost: 320, desc: 'A second tank for long dives.', effect: 'air drain down' },
];

export const SCUBA_RANKS = [
  { level: 0, name: 'Snorkeler', xp: 0, perk: 'Shallow dives unlocked' },
  { level: 1, name: 'Reef Explorer', xp: 120, perk: 'Kelp and turtle reefs open up' },
  { level: 2, name: 'Deep Diver', xp: 300, perk: 'Wreck dives pay better' },
  { level: 3, name: 'Wreck Hunter', xp: 620, perk: 'Rare finds appear more often' },
  { level: 4, name: 'Abyss Master', xp: 1100, perk: 'The blue hole holds no fear' },
];

export const SCUBA_EVENTS = [
  { id: 'calm-seas', name: 'Calm Seas', desc: 'Flat water and perfect visibility.' },
  { id: 'tourist-rush', name: 'Tourist Rush', desc: 'Visitors crowd the dive boats.' },
  { id: 'algae-bloom', name: 'Algae Bloom', desc: 'Green water clouds the reef.' },
  { id: 'dolphin-visit', name: 'Dolphin Visit', desc: 'Dolphins escort the divers.' },
  { id: 'storm-warning', name: 'Storm Warning', desc: 'Dark clouds gather offshore.' },
  { id: 'festival', name: 'Harbour Festival', desc: 'Music and stalls along the pier.' },
  { id: 'marine-week', name: 'Marine Week', desc: 'Collectors pay extra for finds.' },
  { id: 'low-tide', name: 'Low Tide', desc: 'Rock pools open along the shore.' },
  { id: 'sunny-spell', name: 'Sunny Spell', desc: 'Warm sun and clear water.' },
  { id: 'whale-watch', name: 'Whale Watch', desc: 'A whale passes the bay.' },
];

export const SCUBA_CONTRACTS = [
  { id: 'shell-order', name: 'Shell Order', material: 'shell', qty: 6, pay: 120, days: 3, rep: 10, desc: 'A shop wants six spiral shells.' },
  { id: 'pearl-order', name: 'Pearl Order', material: 'pearl', qty: 2, pay: 450, days: 4, rep: 25, desc: 'A jeweller wants two black pearls.' },
  { id: 'coral-order', name: 'Coral Order', material: 'coral-frag', qty: 5, pay: 200, days: 3, rep: 15, desc: 'An aquarium wants coral fragments.' },
  { id: 'coin-order', name: 'Coin Order', material: 'gold-coin', qty: 2, pay: 600, days: 5, rep: 30, desc: 'A collector wants two doubloons.' },
  { id: 'starfish-order', name: 'Starfish Order', material: 'starfish', qty: 8, pay: 150, days: 2, rep: 10, desc: 'A school wants eight starfish.' },
  { id: 'jade-order', name: 'Jade Order', material: 'jade-stone', qty: 3, pay: 300, days: 4, rep: 20, desc: 'A sculptor wants three jade stones.' },
];

export const SCUBA_CHALLENGES = [
  { id: 'first-dive', name: 'First Dive', target: 'sessions', goal: 1, xp: 20, desc: 'Finish one dive session.' },
  { id: 'five-dives', name: 'Five Dives', target: 'sessions', goal: 5, xp: 60, desc: 'Finish five dive sessions.' },
  { id: 'find-ten', name: 'Find Ten', target: 'findsFound', goal: 10, xp: 40, desc: 'Collect ten finds.' },
  { id: 'find-fifty', name: 'Find Fifty', target: 'findsFound', goal: 50, xp: 120, desc: 'Collect fifty finds.' },
  { id: 'earn-five-hundred', name: 'Earn Five Hundred', target: 'earned', goal: 500, xp: 100, desc: 'Earn 500 cash in total.' },
  { id: 'sell-twenty', name: 'Sell Twenty', target: 'findsSold', goal: 20, xp: 80, desc: 'Sell twenty finds.' },
  { id: 'contract-three', name: 'Contract Three', target: 'contractsDone', goal: 3, xp: 90, desc: 'Deliver three contracts.' },
  { id: 'steps-hundred', name: 'Hundred Steps', target: 'stepsDone', goal: 100, xp: 110, desc: 'Take a hundred dive steps.' },
];

export const SCUBA_ACHIEVEMENTS = [
  { id: 'wet-feet', name: 'Wet Feet', check: (s) => s.sessions >= 1, desc: 'Finish your first dive.' },
  { id: 'reef-regular', name: 'Reef Regular', check: (s) => s.sessions >= 10, desc: 'Finish ten dives.' },
  { id: 'collector', name: 'Collector', check: (s) => s.findsFound >= 25, desc: 'Collect twenty-five finds.' },
  { id: 'treasure-hunter', name: 'Treasure Hunter', check: (s) => s.findsFound >= 100, desc: 'Collect a hundred finds.' },
  { id: 'rich-diver', name: 'Rich Diver', check: (s) => s.earned >= 1000, desc: 'Earn a thousand cash.' },
  { id: 'deal-maker', name: 'Deal Maker', check: (s) => s.contractsDone >= 5, desc: 'Deliver five contracts.' },
  { id: 'streak-five', name: 'Streak Five', check: (s) => s.bestStreak >= 5, desc: 'Reach a streak of five.' },
  { id: 'deep-master', name: 'Deep Master', check: (s) => s.rank >= 4, desc: 'Reach the top rank.' },
];

export const SCUBA_TIPS = [
  { id: 'tip-air', name: 'Watch Your Air', text: 'End the dive before your air runs out.' },
  { id: 'tip-rare', name: 'Rare Finds', text: 'Deep sites hide the rarest finds.' },
  { id: 'tip-rank', name: 'Rank Up', text: 'Higher rank boosts rare finds.' },
  { id: 'tip-sell', name: 'Sell Often', text: 'Sell finds before the drift turns.' },
  { id: 'tip-contract', name: 'Contracts Pay', text: 'Contracts pay more than raw sales.' },
  { id: 'tip-weather', name: 'Storm Watch', text: 'Storms and hurricanes block diving.' },
  { id: 'tip-cap', name: 'Carry Cap', text: 'Upgrade your net to carry more.' },
  { id: 'tip-season', name: 'Season Prices', text: 'Summer prices beat winter prices.' },
];

export const SCUBA_LEADERBOARD = [
  { name: 'Marina', value: 900, desc: 'Top diver of the season.' },
  { name: 'Coral', value: 700, desc: 'Reef queen of the bay.' },
  { name: 'Finn', value: 500, desc: 'Wreck hunter extraordinaire.' },
  { name: 'Dana', value: 300, desc: 'Steady diver, steady hands.' },
  { name: 'You', value: 0, desc: 'Your score on the board.' },
];

export const SCUBA_RECORDS = [
  { id: 'most-dives', name: 'Most Dives', stat: 'sessions', unit: 'dives', desc: 'Most dive sessions finished.' },
  { id: 'most-finds', name: 'Most Finds', stat: 'findsFound', unit: 'finds', desc: 'Most finds collected.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'cash', desc: 'Most cash earned.' },
  { id: 'best-yield', name: 'Best Yield', stat: 'bestSessionYield', unit: 'cash', desc: 'Best single dive yield.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'streak', desc: 'Longest good streak.' },
];

export const SCUBA_MARKET = [
  { id: 'shell-shop', name: 'Shell Shop', finds: ['shell', 'starfish', 'bottle'], mult: 1.1, desc: 'Buys common beach finds.' },
  { id: 'coral-gallery', name: 'Coral Gallery', finds: ['coral-frag', 'seahorse'], mult: 1.25, desc: 'Pays well for coral and seahorses.' },
  { id: 'jade-house', name: 'Jade House', finds: ['jade-stone'], mult: 1.4, desc: 'Top price for jade stones.' },
  { id: 'pearl-dealer', name: 'Pearl Dealer', finds: ['pearl'], mult: 1.5, desc: 'Best buyer for black pearls.' },
  { id: 'coin-collector', name: 'Coin Collector', finds: ['gold-coin', 'treasure-chest'], mult: 1.6, desc: 'Pays a premium for old gold.' },
  { id: 'wreck-museum', name: 'Wreck Museum', finds: ['anchor-charm', 'gold-coin'], mult: 1.3, desc: 'Museum buys wreck relics.' },
  { id: 'tourist-stall', name: 'Tourist Stall', finds: ['shell', 'starfish', 'coral-frag'], mult: 1.05, desc: 'Quick sales to tourists.' },
  { id: 'deep-buyer', name: 'Deep Buyer', finds: ['treasure-chest', 'pearl', 'jade-stone'], mult: 1.45, desc: 'Buys only the rarest deep finds.' },
];

export const SCUBA_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.0, desc: 'Mild water, steady prices.' },
  { id: 'summer', name: 'Summer', mult: 1.2, desc: 'Peak season, best prices.' },
  { id: 'autumn', name: 'Autumn', mult: 0.9, desc: 'Cooling water, softer prices.' },
  { id: 'winter', name: 'Winter', mult: 0.8, desc: 'Cold water, lowest prices.' },
];

export const SCUBA_SEASONAL = [
  { season: 'summer', find: 'pearl', mult: 1.3 },
  { season: 'summer', find: 'shell', mult: 1.2 },
  { season: 'spring', find: 'coral-frag', mult: 1.2 },
  { season: 'spring', find: 'seahorse', mult: 1.15 },
  { season: 'autumn', find: 'gold-coin', mult: 1.25 },
  { season: 'autumn', find: 'jade-stone', mult: 1.1 },
  { season: 'winter', find: 'treasure-chest', mult: 1.4 },
  { season: 'winter', find: 'anchor-charm', mult: 1.2 },
];

export const SCUBA_QUICK_START = [
  'Book the Coral Garden and dive.',
  'Collect finds until your air runs low.',
  'Sell finds at the Shell Shop.',
  'Buy the Cargo Net upgrade early.',
  'Take a shell contract for easy cash.',
  'Save up for the Rebreather.',
];

export const SCUBA_HELPERS = [
  { id: 'dive-buddy', name: 'Dive Buddy', wage: 20, skill: 'diving', bonus: 0.1, desc: 'A steady partner underwater.' },
  { id: 'boat-captain', name: 'Boat Captain', wage: 35, skill: 'navigation', bonus: 0.2, desc: 'Knows every reef by heart.' },
  { id: 'photo-diver', name: 'Photo Diver', wage: 30, skill: 'photography', bonus: 0.15, desc: 'Snaps shots buyers love.' },
  { id: 'medic-diver', name: 'Medic Diver', wage: 40, skill: 'first-aid', bonus: 0.25, desc: 'Keeps every dive safe.' },
];

export const SCUBA_META = { system: 'scuba', version: '7c-B2', author: 'builder-2', dataCount: 10, findCount: 10, upgradeCount: 8, rankCount: 5 };

function diveSite(id) {
  for (const s of DIVE_SITES) if (s.id === id) return s;
  return null;
}

function seaFind(id) {
  for (const f of SCUBA_FINDS) if (f.id === id) return f;
  return null;
}

function asList(v) {
  if (Array.isArray(v)) return v;
  if (v && Array.isArray(v.upgrades)) return v.upgrades;
  return [];
}

function rankNum(v) {
  if (typeof v === 'number') return v;
  if (v && typeof v.rank === 'number') return v.rank;
  return 0;
}

export function scubaRankFor(xp) {
  let lvl = 0;
  for (const r of SCUBA_RANKS) {
    if (xp >= r.xp) lvl = r.level;
  }
  return lvl;
}

export function scubaAirMax(upgrades) {
  const list = asList(upgrades);
  let max = 100;
  if (list.indexOf('rebreather') !== -1) max += 50;
  return max;
}

export function scubaPriceFor(findId, drift, rank, upgrades) {
  const f = seaFind(findId);
  if (!f) return 0;
  const d = typeof drift === 'number' ? drift : 0;
  const rk = rankNum(rank);
  const list = asList(upgrades === undefined ? rank : upgrades);
  const owned = Array.isArray(upgrades) ? upgrades : asList(rank);
  let p = f.value * (1 + d) * (1 + rk * 0.1);
  if (owned.indexOf('price-plus') !== -1) p *= 1.2;
  if (p < 1) p = 1;
  return Math.round(p * 10) / 10;
}

export function scubaCarryCap(rank, upgrades) {
  const rk = rankNum(rank);
  const list = asList(upgrades === undefined ? rank : upgrades);
  const owned = Array.isArray(upgrades) ? upgrades : list;
  let cap = 20 + rk * 2;
  if (owned.indexOf('carry-plus') !== -1) cap += 10;
  return cap;
}

export function scubaScore(sessions, yld, hazards) {
  const v = sessions * 10 + Math.round(yld) - hazards * 5;
  return v > 0 ? v : 0;
}

export function scubaGrade(score) {
  if (score >= 400) return 'S';
  if (score >= 250) return 'A';
  if (score >= 140) return 'B';
  if (score >= 60) return 'C';
  return 'D';
}

export function scubaWeeklyGoal(state) {
  const s = state || {};
  const sessions = { have: s.sessions || 0, goal: 5, done: (s.sessions || 0) >= 5 };
  const sold = { have: s.findsSold || 0, goal: 40, done: (s.findsSold || 0) >= 40 };
  const earned = { have: s.earned || 0, goal: 600, done: (s.earned || 0) >= 600 };
  return { sessions, sold, earned, allDone: sessions.done && sold.done && earned.done };
}

export function scubaEfficiency(state) {
  const s = state || {};
  if (!s.sessions) return 100;
  const ok = Math.max(0, s.sessions - (s.contractsFailed || 0));
  return Math.round((ok / s.sessions) * 100);
}

export function scubaProfitPerDive(state) {
  const s = state || {};
  if (!s.sessions) return 0;
  return Math.round(((s.earned || 0) / s.sessions) * 10) / 10;
}

export function scubaInventoryValue(state) {
  const s = state || {};
  let total = 0;
  const inv = s.inventory || {};
  for (const id of Object.keys(inv)) {
    total += (inv[id] || 0) * scubaPriceFor(id, s.dayDrift || 0, s.rank || 0, s.upgrades || []);
  }
  return Math.round(total * 10) / 10;
}

export function scubaSummary(state) {
  const s = state || {};
  const rn = SCUBA_RANKS[s.rank || 0] ? SCUBA_RANKS[s.rank || 0].name : 'Snorkeler';
  return 'Scuba Diving: ' + rn + ' with ' + (s.sessions || 0) + ' dives, ' + (s.findsFound || 0) + ' finds and ' + (s.earned || 0) + ' cash earned.';
}

export function scubaNextGoal(state) {
  const s = state || {};
  if (!(s.sessions || 0)) return 'Finish your first dive.';
  if ((s.sessions || 0) < 5) return 'Finish 5 dives.';
  if ((s.earned || 0) < 500) return 'Earn 500 cash in total.';
  if ((s.rank || 0) < 4) return 'Reach rank ' + SCUBA_RANKS[(s.rank || 0) + 1].name + '.';
  return 'Become a legend of Scuba Diving.';
}

export function scubaRecordFor(id, state) {
  const rec = SCUBA_RECORDS.find((r) => r.id === id);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, stat: rec.stat, unit: rec.unit, desc: rec.desc, value: (state && state[rec.stat]) || 0 };
}

export function scubaAllRecords(state) {
  return SCUBA_RECORDS.map((r) => scubaRecordFor(r.id, state));
}

export function scubaLeaderboardWith(playerScore) {
  const board = SCUBA_LEADERBOARD.map((e) => ({ name: e.name, value: e.name === 'You' ? playerScore : e.value, desc: e.desc }));
  board.sort((a, b) => b.value - a.value);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, value: e.value, desc: e.desc }));
}

export function scubaEventFor(day) {
  return SCUBA_MARKET[((day || 0) % SCUBA_MARKET.length + SCUBA_MARKET.length) % SCUBA_MARKET.length];
}

export function scubaEventMult(eventId, findId) {
  const ev = SCUBA_MARKET.find((m) => m.id === eventId);
  if (!ev) return 1;
  return ev.finds.indexOf(findId) !== -1 ? ev.mult : 1;
}

export function scubaSeasonMult(seasonId) {
  const s = SCUBA_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function scubaSeasonalPriceMult(seasonId, findId) {
  const row = SCUBA_SEASONAL.find((x) => x.season === seasonId && x.find === findId);
  return row ? row.mult : 1;
}

export function scubaBestBuyer() {
  let best = SCUBA_MARKET[0];
  for (const m of SCUBA_MARKET) if (m.mult > best.mult) best = m;
  return best;
}

export function scubaBestSeason() {
  let best = SCUBA_SEASONS[0];
  for (const s of SCUBA_SEASONS) if (s.mult > best.mult) best = s;
  return best;
}

export function scubaTipFor(day) {
  return SCUBA_TIPS[((day || 0) % SCUBA_TIPS.length + SCUBA_TIPS.length) % SCUBA_TIPS.length];
}

export function scubaQuickStart() {
  return SCUBA_QUICK_START.slice();
}

export function scubaChallengeProgress(challenge, state) {
  const have = (state && state[challenge.target]) || 0;
  return { id: challenge.id, name: challenge.name, have, goal: challenge.goal, done: have >= challenge.goal, xp: challenge.xp };
}

export function scubaProgressPercent(state) {
  const s = state || {};
  if (!s.sessions) return 0;
  const ok = Math.max(0, s.sessions - (s.contractsFailed || 0));
  return Math.round((ok / s.sessions) * 100);
}

export function scubaTotalValue(state) {
  const s = state || {};
  return Math.round((scubaInventoryValue(s) + (s.earned || 0)) * 10) / 10;
}

export function scubaHelperBonus(helperIds, skill) {
  let sum = 0;
  for (const id of helperIds || []) {
    const h = SCUBA_HELPERS.find((x) => x.id === id);
    if (h && h.skill === skill) sum += h.bonus;
  }
  return sum;
}

export function scubaFindsByRarity(maxRarity) {
  return SCUBA_FINDS.filter((f) => f.rarity <= maxRarity).map((f) => f.id);
}

export function scubaSiteByDepth(depth) {
  let pick = DIVE_SITES[DIVE_SITES.length - 1];
  for (const s of DIVE_SITES) {
    if (s.depth >= depth) { pick = s; break; }
  }
  return pick;
}

function freshState(season) {
  return {
    xp: 0, rank: 0, sessions: 0, actions: 0, stepsDone: 0, earned: 0, spent: 0,
    findsFound: 0, findsSold: 0, contractsDone: 0, contractsFailed: 0, hazardsTaken: 0,
    heatGained: 0, inventory: {}, upgrades: [], activeContract: null, contractProgress: 0,
    contractDeadline: null, session: null, sessionStepsLeft: 0, sessionTimeLeft: 0,
    resource: 0, dayDrift: 0, lastDay: 1, bestSession: null, bestSessionYield: 0,
    dailyEarned: 0, dailySessions: 0, totalYield: 0, bestStreak: 0, streak: 0,
    specialsUsed: 0, weatherStops: 0, sessionYield: 0, sessionFinds: [], season,
    event: null, wagesPaid: 0, challengesClaimed: [],
  };
}

export function createScubaDivingSystem(ctx) {
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
  const state = freshState('summer');

  function refreshRank() {
    const lvl = scubaRankFor(state.xp);
    if (lvl > state.rank) {
      state.rank = lvl;
      log('Rank up: ' + SCUBA_RANKS[lvl].name);
    } else {
      state.rank = lvl;
    }
  }

  function finishSession() {
    const siteId = state.session;
    const yld = state.sessionYield;
    state.totalYield += yld;
    if (yld > state.bestSessionYield) {
      state.bestSessionYield = yld;
      state.bestSession = siteId;
    }
    if (yld > 0) {
      state.streak += 1;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    } else {
      state.streak = 0;
    }
    state.session = null;
    state.sessionStepsLeft = 0;
    state.sessionTimeLeft = 0;
  }

  function runDailyEvent() {
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
      const pick = SCUBA_FINDS[Math.floor(rng() * SCUBA_FINDS.length)];
      state.inventory[pick.id] = (state.inventory[pick.id] || 0) + 3;
      state.findsFound += 3;
      state.event = 'gift';
      return { ok: true, event: 'gift', name: 'Gift', kind: 'gift', find: pick.id, qty: 3 };
    }
    if (roll < 0.46) {
      const ev = SCUBA_EVENTS[Math.floor(rng() * SCUBA_EVENTS.length)];
      state.event = ev.id;
      return { ok: true, event: ev.id, name: ev.name, kind: 'named' };
    }
    state.event = null;
    return { ok: true, event: null, name: 'none', kind: 'none' };
  }

  const sys = {
    name: 'Scuba Diving',
    state,
    dive(siteId) {
      const site = diveSite(siteId);
      if (!site) return { ok: false, reason: 'no-such-site' };
      if (state.session) return { ok: false, reason: 'already-in-session' };
      const cond = (getWeather() || {}).condition || 'clear';
      if (cond === 'storm' || cond === 'hurricane') {
        state.weatherStops += 1;
        return { ok: false, reason: 'bad-weather', condition: cond };
      }
      const hour = getHour();
      if (hour < 6 || hour >= 20) return { ok: false, reason: 'closed', hour };
      if (getCash() < site.fee) return { ok: false, reason: 'not-enough-cash', cost: site.fee };
      addCash(-site.fee);
      state.spent += site.fee;
      state.session = site.id;
      state.sessionStepsLeft = site.steps;
      state.sessionTimeLeft = site.duration;
      state.resource = scubaAirMax(state.upgrades);
      state.sessionYield = 0;
      state.sessionFinds = [];
      state.sessions += 1;
      state.dailySessions += 1;
      log('Diving at ' + site.name);
      return { ok: true, id: site.id, name: site.name, fee: site.fee, steps: site.steps, duration: site.duration };
    },
    collectFind() {
      if (!state.session) return { ok: false, reason: 'no-session' };
      const site = diveSite(state.session);
      state.resource -= 8;
      state.sessionStepsLeft -= 1;
      state.stepsDone += 1;
      state.actions += 1;
      let totalHeld = 0;
      for (const k of Object.keys(state.inventory)) totalHeld += state.inventory[k];
      const cap = scubaCarryCap(state.rank, state.upgrades);
      let qty = 1 + Math.floor(rng() * 3);
      if (totalHeld + qty > cap) qty = cap - totalHeld;
      let picked = null;
      let bonus = false;
      let hazard = false;
      if (qty > 0) {
        let weights = SCUBA_FINDS.map((f) => {
          let w = 1 / f.rarity;
          if (f.rarity < 0.08 && state.rank >= 3) w *= 1.6;
          if (f.rarity < 0.08 && state.upgrades.indexOf('find-plus') !== -1) w *= 1.25;
          return w;
        });
        let sumW = 0;
        for (const w of weights) sumW += w;
        let roll = rng() * sumW;
        let idx = 0;
        for (let i = 0; i < weights.length; i++) {
          roll -= weights[i];
          if (roll <= 0) { idx = i; break; }
          idx = i;
        }
        picked = SCUBA_FINDS[idx];
        if (rng() < 0.04) { qty += 1; bonus = true; }
        state.inventory[picked.id] = (state.inventory[picked.id] || 0) + qty;
        state.findsFound += qty;
        state.sessionFinds.push(picked.id);
        const gain = qty * picked.value;
        state.sessionYield += gain;
      }
      if (site && rng() < site.risk * 0.04) {
        hazard = true;
        state.hazardsTaken += 1;
        if (rng() < 0.3) {
          state.heatGained += 1;
          addHeat(1);
        }
      }
      let ended = false;
      if (state.resource <= 0 || state.sessionStepsLeft <= 0) {
        if (state.resource < 0) state.resource = 0;
        finishSession();
        ended = true;
      }
      return { ok: true, find: picked ? { id: picked.id, name: picked.name, qty } : null, qty, bonus, hazard, stepsLeft: state.sessionStepsLeft, resource: state.resource, ended };
    },
    surfaceEarly() {
      if (!state.session) return { ok: false, reason: 'no-session' };
      const siteId = state.session;
      finishSession();
      log('Surfaced early from ' + siteId);
      return { ok: true, id: siteId, yield: state.totalYield };
    },
    checkReef() {
      const site = state.session ? diveSite(state.session) : null;
      return { ok: true, site: site ? site.id : null, siteName: site ? site.name : null, weather: (getWeather() || {}).condition || 'clear', hour: getHour(), resource: state.resource, resourceMax: scubaAirMax(state.upgrades), stepsLeft: state.sessionStepsLeft };
    },
    sellFind(findId) {
      const f = seaFind(findId);
      if (!f) return { ok: false, reason: 'no-such-find' };
      const held = state.inventory[findId] || 0;
      if (held <= 0) return { ok: false, reason: 'not-held', id: findId };
      const price = scubaPriceFor(findId, state.dayDrift, state.rank, state.upgrades);
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
        const price = scubaPriceFor(id, state.dayDrift, state.rank, state.upgrades);
        const n = state.inventory[id];
        total += price * n;
        count += n;
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
      const up = SCUBA_UPGRADES.find((u) => u.id === upId);
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
      const ct = SCUBA_CONTRACTS.find((x) => x.id === contractId);
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
      const ct = SCUBA_CONTRACTS.find((x) => x.id === state.activeContract);
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
      return SCUBA_FINDS.map((f) => ({ id: f.id, name: f.name, price: scubaPriceFor(f.id, state.dayDrift, state.rank, state.upgrades), base: f.value, drift: state.dayDrift, held: state.inventory[f.id] || 0 }));
    },
    siteReport(siteId) {
      const site = diveSite(siteId);
      if (!site) return { ok: false, reason: 'no-such-site' };
      return { ok: true, id: site.id, name: site.name, fee: site.fee, difficulty: site.difficulty, steps: site.steps, duration: site.duration, risk: site.risk, depth: site.depth, current: site.current, desc: site.desc };
    },
    dailyEvent() {
      return runDailyEvent();
    },
    tick(dt) {
      if (!state.session) return;
      state.sessionTimeLeft -= dt;
      state.resource -= dt * 0.05;
      if (state.sessionTimeLeft <= 0 || state.resource <= 0) {
        if (state.resource < 0) state.resource = 0;
        if (state.sessionTimeLeft < 0) state.sessionTimeLeft = 0;
        finishSession();
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
      return runDailyEvent();
    },
    serialize() {
      return JSON.parse(JSON.stringify(state));
    },
    deserialize(saved) {
      if (!saved || typeof saved !== 'object') return;
      const keys = Object.keys(saved);
      for (const k of keys) state[k] = saved[k];
      if (!state.inventory || typeof state.inventory !== 'object') state.inventory = {};
      if (!Array.isArray(state.upgrades)) state.upgrades = [];
      if (!Array.isArray(state.sessionFinds)) state.sessionFinds = [];
      if (!Array.isArray(state.challengesClaimed)) state.challengesClaimed = [];
      if (typeof state.wagesPaid !== 'number') state.wagesPaid = 0;
      refreshRank();
    },
    stats() {
      const rn = SCUBA_RANKS[state.rank] ? SCUBA_RANKS[state.rank].name : 'Snorkeler';
      return { rank: rn, xp: state.xp, sessions: state.sessions, actions: state.actions, stepsDone: state.stepsDone, earned: state.earned, spent: state.spent, findsFound: state.findsFound, findsSold: state.findsSold, contractsDone: state.contractsDone, contractsFailed: state.contractsFailed, hazardsTaken: state.hazardsTaken, heatGained: state.heatGained, upgrades: state.upgrades.length, activeContract: state.activeContract, contractProgress: state.contractProgress, session: state.session, stepsLeft: state.sessionStepsLeft, resource: state.resource, resourceMax: scubaAirMax(state.upgrades), dailyEarned: state.dailyEarned, totalYield: state.totalYield, bestStreak: state.bestStreak, bestSession: state.bestSession, bestSessionYield: state.bestSessionYield, specialsUsed: state.specialsUsed, weatherStops: state.weatherStops, season: state.season, event: state.event };
    },
    hudLine() {
      if (!state.session) return '';
      return 'Scuba Diving: ' + state.session + ' — ' + state.sessionStepsLeft + ' steps left, air ' + state.resource;
    },
    interact() {
      const pos = getPlayerPos() || { x: 0, z: 0 };
      const dx = pos.x - (-300);
      const dz = pos.z - 450;
      if (Math.sqrt(dx * dx + dz * dz) > 30) return false;
      if (state.session) { sys.collectFind(); return true; }
      let held = 0;
      for (const k of Object.keys(state.inventory)) held += state.inventory[k];
      if (held > 0) { sys.sellAllFinds(); return true; }
      sys.dive(DIVE_SITES[0].id);
      return true;
    },
  };
  return sys;
}

export function createScubaDivingExtras(system) {
  const sys = system;
  const st = sys.state;
  let hired = [];
  let claimed = [];
  let wages = 0;

  function hiredBonus(skill) {
    let sum = 0;
    for (const id of hired) {
      const h = SCUBA_HELPERS.find((x) => x.id === id);
      if (h && h.skill === skill) sum += h.bonus;
    }
    return sum;
  }

  return {
    hireHelper(id) {
      const h = SCUBA_HELPERS.find((x) => x.id === id);
      if (!h) return { ok: false, reason: 'no-such-helper' };
      if (hired.indexOf(id) !== -1) return { ok: false, reason: 'already-hired', id };
      hired.push(id);
      return { ok: true, id: h.id, name: h.name, wage: h.wage };
    },
    fireHelper(id) {
      const i = hired.indexOf(id);
      if (i === -1) return { ok: false, reason: 'not-hired', id };
      hired.splice(i, 1);
      return { ok: true, id };
    },
    payWages() {
      let due = 0;
      for (const id of hired) {
        const h = SCUBA_HELPERS.find((x) => x.id === id);
        if (h) due += h.wage;
      }
      wages += due;
      st.wagesPaid = (st.wagesPaid || 0) + due;
      return { ok: true, due, helpers: hired.length, totalPaid: due };
    },
    helperBonus(skill) {
      return hiredBonus(skill);
    },
    challenges() {
      return SCUBA_CHALLENGES.map((ch) => scubaChallengeProgress(ch, st));
    },
    claimChallenge(id) {
      const ch = SCUBA_CHALLENGES.find((x) => x.id === id);
      if (!ch) return { ok: false, reason: 'no-such-challenge' };
      if (claimed.indexOf(id) !== -1) return { ok: false, reason: 'already-claimed', id };
      const prog = scubaChallengeProgress(ch, st);
      if (!prog.done) return { ok: false, reason: 'not-done', have: prog.have, goal: prog.goal };
      claimed.push(id);
      st.challengesClaimed.push(id);
      st.xp += ch.xp;
      st.rank = scubaRankFor(st.xp);
      return { ok: true, id: ch.id, xp: ch.xp };
    },
    achievements() {
      return SCUBA_ACHIEVEMENTS.map((a) => ({ id: a.id, name: a.name, desc: a.desc, done: !!a.check(st) }));
    },
    donateFinds() {
      let donated = 0;
      const ids = Object.keys(st.inventory);
      for (const id of ids) donated += st.inventory[id];
      st.inventory = {};
      return { ok: true, donated, finds: ids };
    },
    bundleSale() {
      let count = 0;
      for (const k of Object.keys(st.inventory)) count += st.inventory[k];
      if (count < 10) return { ok: false, reason: 'not-enough', have: count, need: 10 };
      let total = 0;
      for (const id of Object.keys(st.inventory)) {
        total += scubaPriceFor(id, st.dayDrift, st.rank, st.upgrades) * st.inventory[id];
      }
      total = Math.round(total * 1.1 * 10) / 10;
      st.inventory = {};
      st.findsSold += count;
      st.earned += total;
      st.dailyEarned += total;
      return { ok: true, total, count, bonus: 'bundle +10%' };
    },
    checkAir() {
      const max = scubaAirMax(st.upgrades);
      return { ok: true, resource: st.resource, max, name: 'air', percent: max ? Math.round((st.resource / max) * 100) : 0 };
    },
    refillAir() {
      st.resource = scubaAirMax(st.upgrades);
      return { ok: true, resource: st.resource, max: st.resource };
    },
    weighCatch() {
      let count = 0;
      let weight = 0;
      for (const id of Object.keys(st.inventory)) {
        const f = seaFind(id);
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

export function createScubaDivingMarket(system) {
  const sys = system;
  const st = sys.state;
  let currentEvent = null;
  let currentSeason = st.season || 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  return {
    setEvent(id) {
      const ev = SCUBA_MARKET.find((m) => m.id === id);
      if (!ev) return { ok: false, reason: 'no-such-event' };
      currentEvent = id;
      st.event = id;
      return { ok: true, event: id };
    },
    setSeason(id) {
      const s = SCUBA_SEASONS.find((x) => x.id === id);
      if (!s) return { ok: false, reason: 'no-such-season' };
      currentSeason = id;
      st.season = id;
      return { ok: true, season: id };
    },
    eventPrice(itemId, basePrice) {
      const em = currentEvent ? scubaEventMult(currentEvent, itemId) : 1;
      const sm = scubaSeasonMult(currentSeason);
      return Math.round(basePrice * em * sm * 10) / 10;
    },
    bulkDeal(findId, qty) {
      if (!qty || qty < 20) return { ok: false, reason: 'not-enough', qty: qty || 0, need: 20 };
      const held = st.inventory[findId] || 0;
      if (held < qty) return { ok: false, reason: 'not-enough-held', have: held, need: qty };
      const f = seaFind(findId);
      if (!f) return { ok: false, reason: 'no-such-find' };
      const unit = this.eventPrice(findId, f.value);
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
      return SCUBA_MARKET.map((m) => ({ id: m.id, name: m.name, finds: m.finds.slice(), mult: m.mult, desc: m.desc }));
    },
    marketSummary() {
      return { event: currentEvent, season: currentSeason, dealsClaimed, bulkTraded, deals: this.dailyDeals() };
    },
    get event() { return currentEvent; },
    get season() { return currentSeason; },
  };
}
