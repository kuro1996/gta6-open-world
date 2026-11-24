// Coast Guard — Bima runs the cutter out of Solara Harbour.
// Answer the distress calls, search the grid, and bring home
// whatever — and whoever — the sea has taken. Capsized yachts,
// lost divers, a whale on the sandbar, a smuggler running dark with
// no lights: the authority pays for every mission logged and every
// find reported. But the open sea charges interest — fuel is your
// range, the weather lies about its mood, and a wave can stove in
// the bow rail before you even see it coming. Log everything.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const RESCUE_MISSIONS = [
  { id: 'distress-call', name: 'Distress Call', fee: 0, difficulty: 1,
    steps: 4, duration: 30, risk: 1, distance: 5, response: 10,
    desc: 'A mayday from a fishing boat, engine dead.' },
  { id: 'engine-failure', name: 'Engine Failure', fee: 0, difficulty: 1,
    steps: 5, duration: 35, risk: 1, distance: 7, response: 12,
    desc: 'A yacht adrift, crew safe, tide coming in.' },
  { id: 'lost-diver', name: 'Lost Diver', fee: 0, difficulty: 2,
    steps: 5, duration: 40, risk: 2, distance: 9, response: 15,
    desc: 'A diver surfaced somewhere that is not here.' },
  { id: 'capsized-yacht', name: 'Capsized Yacht', fee: 0, difficulty: 2,
    steps: 6, duration: 45, risk: 2, distance: 11, response: 18,
    desc: 'A yacht on its side, crew clinging to the hull.' },
  { id: 'medical-evac', name: 'Medical Evac', fee: 0, difficulty: 2,
    steps: 6, duration: 45, risk: 1, distance: 13, response: 20,
    desc: 'A sick crewman on an island, no doctor there.' },
  { id: 'oil-slick', name: 'Oil Slick', fee: 0, difficulty: 3,
    steps: 6, duration: 50, risk: 2, distance: 15, response: 22,
    desc: 'A slick spreading toward the turtle beach.' },
  { id: 'stranded-whale', name: 'Stranded Whale', fee: 0, difficulty: 3,
    steps: 7, duration: 50, risk: 1, distance: 12, response: 25,
    desc: 'A whale on the sandbar, tide going out.' },
  { id: 'storm-rescue', name: 'Storm Rescue', fee: 0, difficulty: 4,
    steps: 7, duration: 55, risk: 3, distance: 18, response: 30,
    desc: 'A trawler in a storm, taking water.' },
  { id: 'smuggler-chase', name: 'Smuggler Chase', fee: 0, difficulty: 4,
    steps: 8, duration: 60, risk: 3, distance: 20, response: 28,
    desc: 'A fast boat running dark, no lights.' },
  { id: 'fire-aboard', name: 'Fire Aboard', fee: 0, difficulty: 5,
    steps: 8, duration: 60, risk: 3, distance: 16, response: 35,
    desc: 'A ferry with smoke in the engine room.' },
];

export const COASTGUARD_FINDS = [
  { id: 'drifting-crate', name: 'Drifting Crate', value: 25, rarity: 0.26,
    weight: 3.0, desc: 'Stencilled, sealed, and floating free.' },
  { id: 'life-raft', name: 'Empty Life Raft', value: 40, rarity: 0.18,
    weight: 4.0, desc: 'Inflated, empty, and a long way from home.' },
  { id: 'lost-anchor', name: 'Lost Anchor', value: 55, rarity: 0.13,
    weight: 8.0, desc: 'Heavy, rusted, and worth its weight.' },
  { id: 'message-buoy', name: 'Message Buoy', value: 70, rarity: 0.1,
    weight: 1.5, desc: 'A buoy with a waterproof note inside.' },
  { id: 'navigation-chart', name: 'Old Navigation Chart', value: 95, rarity: 0.08,
    weight: 0.5, desc: 'Hand-marked with reefs no chart shows.' },
  { id: 'sealed-barrel', name: 'Sealed Barrel', value: 130, rarity: 0.06,
    weight: 6.0, desc: 'Sealed tight. Open it at the station, not at sea.' },
  { id: 'ship-bell', name: 'Ship’s Bell', value: 180, rarity: 0.05,
    weight: 2.0, desc: 'Engraved with a name nobody remembers.' },
  { id: 'emergency-beacon', name: 'Emergency Beacon', value: 240, rarity: 0.03,
    weight: 1.0, desc: 'Still blinking. Someone is glad you found it.' },
  { id: 'smuggler-cache', name: 'Smuggler Cache', value: 320, rarity: 0.02,
    weight: 5.0, desc: 'Wrapped tight, hidden well, and now yours to report.' },
  { id: 'gold-bar', name: 'Gold Bar', value: 500, rarity: 0.01,
    weight: 2.5, desc: 'Stamped, heavy, and very much not yours to keep quiet about.' },
];

export const COASTGUARD_UPGRADES = [
  { id: 'towline', name: 'Heavy Tow Line', cost: 120,
    desc: 'Tow bigger boats: +10 salvage slots.', effect: 'carry-plus' },
  { id: 'radar', name: 'Search Radar', cost: 300,
    desc: 'Finds are 25% easier to spot.', effect: 'find-plus' },
  { id: 'radio', name: 'Long-Range Radio', cost: 200,
    desc: 'Hear distress calls from further out.', effect: 'range-plus' },
  { id: 'medkit', name: 'Trauma Medkit', cost: 250,
    desc: 'Treat the injured properly at sea.', effect: 'care-plus' },
  { id: 'night-vision', name: 'Night Vision', cost: 420,
    desc: 'See in the dark. Night missions pay better.', effect: 'night-plus' },
  { id: 'sonar', name: 'Towed Sonar', cost: 600,
    desc: 'Salvage pays +20%, fuel lasts longer.', effect: 'price-plus' },
  { id: 'helicopter', name: 'Helicopter Winch', cost: 900,
    desc: 'Lift survivors straight off the deck.', effect: 'lift-plus' },
  { id: 'cutter', name: 'New Cutter', cost: 1200,
    desc: 'Fuel lasts +60, carry +20, faster everywhere.', effect: 'cutter-plus' },
];

export const COASTGUARD_RANKS = [
  { level: 0, name: 'Deck Recruit', xp: 0,
    perk: 'Near-shore calls pay base rate.' },
  { level: 1, name: 'Able Seaman', xp: 120,
    perk: '+10% salvage prices.' },
  { level: 2, name: 'Senior Coxswain', xp: 300,
    perk: 'Offshore missions open up.' },
  { level: 3, name: 'Rescue Skipper', xp: 620,
    perk: '+20% salvage prices, night missions unlocked.' },
  { level: 4, name: 'Station Chief', xp: 1100,
    perk: '+30% salvage prices, rare finds doubled.' },
];

export const COASTGUARD_EVENTS = [
  { id: 'fog-bank', name: 'Fog Bank',
    desc: 'The sea disappears under a white blanket.' },
  { id: 'whale-season', name: 'Whale Season',
    desc: 'Whales cross the shipping lanes.' },
  { id: 'storm-front', name: 'Storm Front',
    desc: 'A front is coming in from the west.' },
  { id: 'fishing-fleet', name: 'Fishing Fleet',
    desc: 'Two hundred boats go out at dawn.' },
  { id: 'smuggler-rumour', name: 'Smuggler Rumour',
    desc: 'A fast boat was seen running dark.' },
  { id: 'calm-sea', name: 'Calm Sea',
    desc: 'Glass water, a rare quiet watch.' },
  { id: 'cruise-season', name: 'Cruise Season',
    desc: 'Big ships pass close to the coast.' },
  { id: 'oil-sheen', name: 'Oil Sheen',
    desc: 'A sheen on the water near the docks.' },
  { id: 'rescue-drill', name: 'Rescue Drill',
    desc: 'The whole station drills at dawn.' },
  { id: 'meteor-shower', name: 'Meteor Shower',
    desc: 'Shooting stars over a black sea.' },
];

export const COASTGUARD_CONTRACTS = [
  { id: 'crates-12', name: 'Crate Recovery', material: 'drifting-crate', qty: 12,
    pay: 340, days: 1, rep: 1,
    desc: 'The authority wants twelve drifting crates recovered.' },
  { id: 'anchors-6', name: 'Anchor Recovery', material: 'lost-anchor', qty: 6,
    pay: 380, days: 2, rep: 2,
    desc: 'Six lost anchors for the harbour museum.' },
  { id: 'beacons-4', name: 'Beacon Hunt', material: 'emergency-beacon', qty: 4,
    pay: 900, days: 2, rep: 3,
    desc: 'Four emergency beacons, still blinking.' },
  { id: 'bells-3', name: 'Bell Collection', material: 'ship-bell', qty: 3,
    pay: 620, days: 3, rep: 3,
    desc: 'Three ship’s bells for the maritime archive.' },
  { id: 'barrels-5', name: 'Barrel Run', material: 'sealed-barrel', qty: 5,
    pay: 700, days: 2, rep: 2,
    desc: 'Five sealed barrels, opened only at the station.' },
  { id: 'mixed-35', name: 'Salvage Lot', material: 'mixed', qty: 35,
    pay: 650, days: 2, rep: 2,
    desc: 'Any thirty-five finds for the salvage auction.' },
];

export const COASTGUARD_CHALLENGES = [
  { id: 'missions-10', name: 'Ten Missions', target: 'sessions', goal: 10, xp: 90,
    desc: 'Finish 10 missions.' },
  { id: 'finds-100', name: 'Century of Finds', target: 'findsFound', goal: 100, xp: 110,
    desc: 'Recover 100 finds.' },
  { id: 'earn-1000', name: 'Grand at Sea', target: 'earned', goal: 1000, xp: 130,
    desc: 'Earn $1,000 from the coast guard.' },
  { id: 'streak-8', name: 'Clean Eight', target: 'bestStreak', goal: 8, xp: 100,
    desc: 'Eight clean steps in a row.' },
  { id: 'contracts-3', name: 'Reliable Coxswain', target: 'contractsDone', goal: 3, xp: 120,
    desc: 'Complete 3 authority contracts.' },
  { id: 'actions-200', name: 'Two Hundred Grids', target: 'actions', goal: 200, xp: 140,
    desc: 'Search 200 grid steps.' },
  { id: 'first-find', name: 'First Find', target: 'findsFound', goal: 1, xp: 60,
    desc: 'Recover your first find.' },
  { id: 'night-5', name: 'Night Five', target: 'sessions', goal: 5, xp: 80,
    desc: 'Finish 5 missions.' },
];

export const COASTGUARD_ACHIEVEMENTS = [
  { id: 'first-mission', name: 'First Mission', check: (s) => s.sessions >= 1,
    desc: 'Finish your first mission.' },
  { id: 'gold-club', name: 'Gold Club', check: (s) => (s.inventory['gold-bar'] || 0) + s.findsSold >= 1,
    desc: 'Recover a gold bar.' },
  { id: 'rank-3', name: 'Rescue Skipper', check: (s) => s.rank >= 3,
    desc: 'Reach rank Rescue Skipper.' },
  { id: 'rich-sea', name: 'Sea Rich', check: (s) => s.earned >= 3000,
    desc: 'Earn $3,000 from the coast guard.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8,
    desc: 'Own every coast guard upgrade.' },
  { id: 'no-hazard', name: 'Calm Watch', check: (s) => s.sessions >= 10 && s.hazardsTaken === 0,
    desc: 'Ten missions with zero hazards.' },
  { id: 'big-yield', name: 'Big Yield', check: (s) => s.bestSessionYield >= 500,
    desc: 'One mission worth $500 or more.' },
  { id: 'grids-50', name: 'Fifty Grids', check: (s) => s.actions >= 50,
    desc: 'Fifty search-grid steps at sea.' },
];

export const COASTGUARD_TIPS = [
  { id: 'fuel-first', name: 'Fuel First',
    text: 'Fuel is your range. Never chase a call on a low tank.' },
  { id: 'sonar-money', name: 'Sonar Money',
    text: 'The towed sonar finds what the eye misses.' },
  { id: 'radar-early', name: 'Radar Early',
    text: 'Save for the search radar — it changes every grid.' },
  { id: 'weather-watch', name: 'Weather Watch',
    text: 'The sea lies about its mood. Check twice.' },
  { id: 'night-vision', name: 'Night Vision',
    text: 'Night missions pay better because they are harder.' },
  { id: 'contract-first', name: 'Contracts First',
    text: 'Take an authority contract, then sail its grid.' },
  { id: 'towline-care', name: 'Towline Care',
    text: 'A good tow line is worth more than a fast boat.' },
  { id: 'log-everything', name: 'Log Everything',
    text: 'The authority pays for paperwork, not heroics.' },
];

export const COASTGUARD_LEADERBOARD = [
  { name: 'Captain Rosa', value: 9800, desc: 'Thirty years, never lost a crew.' },
  { name: 'Old Man Tide', value: 7600, desc: 'Knows the sea better than the charts.' },
  { name: 'Bima', value: 0, desc: 'You. Climbing.' },
  { name: 'Dara', value: 4400, desc: 'Fastest response in the harbour.' },
  { name: 'Finn', value: 2600, desc: 'Young, brave, and learning fast.' },
];

export const COASTGUARD_RECORDS = [
  { id: 'most-missions', name: 'Most Missions', stat: 'sessions', unit: 'missions',
    desc: 'Most missions finished.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$',
    desc: 'Most money earned from the coast guard.' },
  { id: 'most-finds', name: 'Most Finds', stat: 'findsFound', unit: 'finds',
    desc: 'Most finds recovered.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'steps',
    desc: 'Longest clean streak.' },
  { id: 'best-mission', name: 'Best Mission', stat: 'bestSessionYield', unit: '$',
    desc: 'Best single-mission yield.' },
];

export const COASTGUARD_MARKET = [
  { id: 'crate-boom', name: 'Crate Boom', finds: ['drifting-crate'], mult: 1.3,
    desc: 'The authority wants drifting crates.' },
  { id: 'beacon-rush', name: 'Beacon Rush', finds: ['emergency-beacon'], mult: 1.6,
    desc: 'Beacons are worth double this week.' },
  { id: 'bell-week', name: 'Bell Week', finds: ['ship-bell'], mult: 1.45,
    desc: 'The maritime archive wants bells.' },
  { id: 'barrel-run', name: 'Barrel Run', finds: ['sealed-barrel'], mult: 1.4,
    desc: 'Sealed barrels are in demand.' },
  { id: 'chart-fair', name: 'Chart Fair', finds: ['navigation-chart'], mult: 1.35,
    desc: 'Collectors want old charts.' },
  { id: 'gold-bid', name: 'Gold Bid', finds: ['gold-bar'], mult: 1.7,
    desc: 'A buyer will pay anything for gold.' },
  { id: 'raft-glut', name: 'Raft Glut', finds: ['life-raft'], mult: 0.7,
    desc: 'Too many empty rafts this week.' },
  { id: 'anchor-dip', name: 'Anchor Dip', finds: ['lost-anchor'], mult: 0.75,
    desc: 'Anchors are cheap this week.' },
];

export const COASTGUARD_SEASONS = [
  { id: 'spring', name: 'Spring', mult: 1.1,
    desc: 'Fresh winds and full bookings.' },
  { id: 'summer', name: 'Summer', mult: 1.2,
    desc: 'Peak season, everyone is at sea.' },
  { id: 'autumn', name: 'Autumn', mult: 1.0,
    desc: 'Steady work, thinner crowds.' },
  { id: 'winter', name: 'Winter', mult: 0.85,
    desc: 'Cold water, quiet days.' },
];

export const COASTGUARD_SEASONAL = [
  { season: 'summer', find: 'drifting-crate', mult: 1.25 },
  { season: 'summer', find: 'emergency-beacon', mult: 1.3 },
  { season: 'spring', find: 'navigation-chart', mult: 1.2 },
  { season: 'autumn', find: 'ship-bell', mult: 1.3 },
  { season: 'autumn', find: 'sealed-barrel', mult: 1.25 },
  { season: 'winter', find: 'gold-bar', mult: 1.4 },
  { season: 'winter', find: 'smuggler-cache', mult: 1.35 },
  { season: 'spring', find: 'message-buoy', mult: 1.15 },
];

export const COASTGUARD_QUICK_START = [
  'Answer the near-shore calls first and learn your fuel burn.',
  'Report every find — the authority pays per report.',
  'Buy the tow line before the offshore missions.',
  'Watch the weather twice before you leave harbour.',
  'Take authority contracts for finds on your grid.',
  'Save for the new cutter — it changes every mission.',
];

export const COASTGUARD_HELPERS = [
  { id: 'lookout', name: 'Finn the Lookout', wage: 30, skill: 'collect', bonus: 0.15,
    desc: 'Young eyes on the bow: +15% find yield.' },
  { id: 'veteran', name: 'Old Man Tide', wage: 45, skill: 'find', bonus: 0.25,
    desc: 'Reads the sea: +25% rare finds.' },
  { id: 'engineer', name: 'Tomas the Engineer', wage: 55, skill: 'carry', bonus: 0.4,
    desc: 'Keeps the cutter running: +40% salvage slots.' },
  { id: 'clerk', name: 'Quiet Ana', wage: 75, skill: 'sell', bonus: 0.12,
    desc: 'Files the reports: +12% salvage pay.' },
];

export function coastGuardRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < COASTGUARD_RANKS.length; i++) {
    if (xp >= COASTGUARD_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function coastGuardPriceFor(findId, dayDrift, rank, upgrades) {
  const f = COASTGUARD_FINDS.find((x) => x.id === findId);
  if (!f) return 0;
  let price = f.value;
  price *= 1 + (dayDrift[findId] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('sonar')) price *= 1.2;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function coastGuardCarryCap(upgrades) {
  let cap = 30;
  if (upgrades.includes('towline')) cap += 10;
  if (upgrades.includes('cutter')) cap += 20;
  return cap;
}

export function coastGuardFuelMax(upgrades) {
  let max = 100;
  if (upgrades.includes('cutter')) max += 60;
  return max;
}

export function coastGuardEventMult(eventId, findId) {
  const ev = COASTGUARD_MARKET.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.finds.includes(findId) ? ev.mult : 1;
}

export function coastGuardSeasonMult(seasonId) {
  const s = COASTGUARD_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function coastGuardEventFor(day) {
  return COASTGUARD_MARKET[day % COASTGUARD_MARKET.length];
}

export function coastGuardSeasonalPriceMult(seasonId, findId) {
  const row = COASTGUARD_SEASONAL.find((x) => x.season === seasonId && x.find === findId);
  return row ? row.mult : 1;
}

export function coastGuardBestSeason(findId) {
  let best = null;
  let bestMult = 0;
  for (const row of COASTGUARD_SEASONAL) {
    if (row.find === findId && row.mult > bestMult) { bestMult = row.mult; best = row.season; }
  }
  return best ? { season: best, mult: bestMult } : null;
}

export function coastGuardBestBuyer(findId, dayDrift, rank, upgrades) {
  const base = coastGuardPriceFor(findId, dayDrift, rank, upgrades);
  return { price: base, note: 'The maritime authority pays best for documented salvage.' };
}

export function coastGuardScore(sessions, yieldTotal, hazards) {
  const base = sessions * 10 + Math.round(yieldTotal);
  const penalty = hazards * 5;
  return Math.max(0, base - penalty);
}

export function coastGuardGrade(sessions, yieldTotal, hazards) {
  const score = coastGuardScore(sessions, yieldTotal, hazards);
  if (score >= 400) return 'S';
  if (score >= 250) return 'A';
  if (score >= 140) return 'B';
  if (score >= 60) return 'C';
  return 'D';
}

export function coastGuardWeeklyGoal(sessions, sold, earned) {
  const goal = { sessions: 5, sold: 40, earned: 600 };
  return {
    sessions: { have: sessions, goal: goal.sessions, done: sessions >= goal.sessions },
    sold: { have: sold, goal: goal.sold, done: sold >= goal.sold },
    earned: { have: Math.round(earned), goal: goal.earned, done: earned >= goal.earned },
    allDone: sessions >= goal.sessions && sold >= goal.sold && earned >= goal.earned,
  };
}

export function coastGuardTipFor(day) {
  return COASTGUARD_TIPS[day % COASTGUARD_TIPS.length];
}

export function coastGuardLeaderboardWith(playerValue) {
  const board = COASTGUARD_LEADERBOARD.map((e) => ({
    name: e.name, value: e.name === 'Bima' ? playerValue : e.value, desc: e.desc,
  }));
  board.sort((a, b) => b.value - a.value);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function coastGuardRecordFor(recordId, state) {
  const r = COASTGUARD_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function coastGuardAllRecords(state) {
  return COASTGUARD_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function coastGuardEfficiency(actions, hazards) {
  const total = actions + hazards;
  if (total === 0) return 100;
  return Math.round((actions / total) * 100);
}

export function coastGuardProfitPerMission(earned, sessions) {
  if (sessions === 0) return 0;
  return Math.round((earned / sessions) * 10) / 10;
}

export function coastGuardInventoryValue(inventory) {
  let total = 0;
  for (const [id, qty] of Object.entries(inventory)) {
    const f = COASTGUARD_FINDS.find((x) => x.id === id);
    if (f) total += f.value * qty;
  }
  return Math.round(total * 10) / 10;
}

export function coastGuardTotalValue(state) {
  return coastGuardInventoryValue(state.inventory);
}

export function coastGuardProgressPercent(state) {
  const total = state.actions + state.findsSold;
  if (total === 0) return 0;
  return Math.round((state.actions / total) * 100);
}

export function coastGuardQuickStart(step) {
  return COASTGUARD_QUICK_START[step] || null;
}

export function coastGuardSummary(state) {
  return `Coast Guard ${COASTGUARD_RANKS[state.rank].name}: ${state.sessions} missions, ${state.actions} grids, $${Math.round(state.earned)} earned, ${state.findsFound} finds.`;
}

export function coastGuardNextGoal(state) {
  if (state.sessions < 3) return 'Run 3 missions.';
  if (state.actions < 50) return 'Recover 50 finds.';
  if (state.rank < 2) return 'Reach rank Senior Coxswain.';
  return 'Become the Station Chief.';
}

export function coastGuardChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function coastGuardHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of COASTGUARD_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function coastGuardMissionByDistance(distance) {
  let best = null;
  for (const s of RESCUE_MISSIONS) {
    if (s.distance <= distance && (!best || s.distance > best.distance)) best = s;
  }
  return best;
}

export function coastGuardFindsByRarity(maxRarity) {
  return COASTGUARD_FINDS.filter((f) => f.rarity <= maxRarity).map((f) => f.id);
}

export function createCoastGuardSystem(ctx) {
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
    resource: 100,
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
  for (const f of COASTGUARD_FINDS) { state.inventory[f.id] = 0; state.dayDrift[f.id] = 0; }

  function refreshRank() {
    const r = coastGuardRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Coast Guard rank up: ${COASTGUARD_RANKS[r].name} — ${COASTGUARD_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const f of COASTGUARD_FINDS) {
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

  function pickFind(mission) {
    const bag = [];
    for (const f of COASTGUARD_FINDS) {
      let w = f.rarity;
      if (state.rank >= 3 && f.rarity < 0.08) w *= 1.6;
      if (state.upgrades.includes('radar')) w *= 1.25;
      bag.push({ f, w });
    }
    let total = 0;
    for (const b of bag) total += b.w;
    let roll = rng() * total;
    for (const b of bag) {
      roll -= b.w;
      if (roll <= 0) return b.f;
    }
    return COASTGUARD_FINDS[0];
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
    log(`Coast Guard ${done} ${reason} — yield $${Math.round(state.sessionYield)}, ${state.sessionFinds} finds.`);
    state.sessionYield = 0;
    state.sessionFinds = 0;
  }

  function dispatch(missionId) {
    const mission = RESCUE_MISSIONS.find((s) => s.id === missionId);
    if (!mission) return { ok: false, reason: 'no-such-site' };
    if (state.session) return { ok: false, reason: 'session-active' };
    if (getCash() < mission.fee) return { ok: false, reason: 'not-enough-cash', cost: mission.fee };
    if (mission.fee > 0) { addCash(-mission.fee); state.spent += mission.fee; }
    state.session = missionId;
    state.sessionStepsLeft = mission.steps;
    state.sessionTimeLeft = mission.duration * 60;
    state.resource = coastGuardFuelMax(state.upgrades);
    log(`Coast Guard started: ${mission.name} — ${mission.steps} grids, ${mission.duration} min, ${mission.distance} km out.`);
    return { ok: true, site: missionId, steps: mission.steps, duration: mission.duration };
  }

  function searchGrid() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    if (state.sessionStepsLeft <= 0) return { ok: false, reason: 'session-done' };
    const mission = RESCUE_MISSIONS.find((s) => s.id === state.session);
    state.resource -= 9;
    if (state.resource < 0) state.resource = 0;
    const cap = coastGuardCarryCap(state.upgrades);
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held >= cap) return { ok: false, reason: 'carry-full', cap };
    const f = pickFind(mission);
    const qty = 1 + Math.floor(rng() * 3);
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
      const rare = COASTGUARD_FINDS.filter((x) => x.rarity < 0.06);
      const pick = rare[Math.floor(rng() * rare.length)];
      state.inventory[pick.id] += 1;
      state.findsFound += 1;
      state.sessionYield += pick.value;
      state.totalYield += pick.value;
      got.push({ id: pick.id, name: pick.name, qty: 1, value: pick.value, rare: true });
      log(`Coast Guard rare find! ${pick.name} worth $${pick.value}.`);
    }
    if (rng() < mission.risk * 0.04) {
      state.hazardsTaken += 1;
      state.streak = 0;
      state.resource -= 18;
      addHeat(1);
      state.heatGained += 1;
      log(`Coast Guard hazard at ${mission.name}: a wave stove in the bow rail and the sea came aboard.`);
    }
    if (state.resource <= 0) {
      finishSession('cut short — fuel ran out');
      return { ok: true, got, stepsLeft: 0, ended: 'resource-empty' };
    }
    if (state.sessionStepsLeft <= 0) {
      finishSession('finished');
      return { ok: true, got, stepsLeft: 0, ended: 'done' };
    }
    return { ok: true, got, stepsLeft: state.sessionStepsLeft, resource: state.resource };
  }

  function returnToBase() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    finishSession('ended early');
    return { ok: true, ended: 'early' };
  }

  function pingSonar() {
    if (!state.session) return { ok: false, reason: 'no-session' };
    const cost = 10;
    if (state.resource < cost) return { ok: false, reason: 'not-enough-resource', need: cost };
    state.resource -= cost;
    state.specialsUsed += 1;
    if (rng() < 0.55) {
      const f = pickFind(RESCUE_MISSIONS[0]);
      state.inventory[f.id] += 1;
      state.findsFound += 1;
      state.sessionYield += f.value;
      gainXp(10);
      log(`Coast Guard ping sonar: sonar pinged ${f.name}.`);
      return { ok: true, success: true, find: f.id, name: f.name };
    }
    log('Coast Guard ping sonar: sonar returned only static.');
    return { ok: true, success: false };
  }

  function sellFind(findId, qty) {
    const f = COASTGUARD_FINDS.find((x) => x.id === findId);
    if (!f) return { ok: false, reason: 'no-such-find' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const have = state.inventory[findId] || 0;
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = coastGuardPriceFor(findId, state.dayDrift, state.rank, state.upgrades);
    const total = Math.round(unit * qty * 10) / 10;
    state.inventory[findId] -= qty;
    state.findsSold += qty;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(qty);
    log(`Reported ${qty}x ${f.name} for $${total}.`);
    return { ok: true, total, unit, qty };
  }

  function sellAllFinds() {
    let total = 0;
    let units = 0;
    const lines = [];
    for (const f of COASTGUARD_FINDS) {
      const have = state.inventory[f.id] || 0;
      if (have <= 0) continue;
      const unit = coastGuardPriceFor(f.id, state.dayDrift, state.rank, state.upgrades);
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
    log(`Reported everything (${units} finds) for $${total}.`);
    return { ok: true, total, units, lines };
  }

  function buyUpgrade(id) {
    const u = COASTGUARD_UPGRADES.find((x) => x.id === id);
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
    const ct = COASTGUARD_CONTRACTS.find((x) => x.id === id);
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
      for (const f of COASTGUARD_FINDS) {
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
    return COASTGUARD_FINDS.map((f) => ({
      id: f.id,
      name: f.name,
      price: coastGuardPriceFor(f.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[f.id],
      held: state.inventory[f.id],
    }));
  }

  function siteReport() {
    return RESCUE_MISSIONS.map((s) => ({
      id: s.id, name: s.name, fee: s.fee, difficulty: s.difficulty, steps: s.steps, risk: s.risk,
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.16) {
      const f = COASTGUARD_FINDS[Math.floor(rng() * COASTGUARD_FINDS.length)];
      state.dayDrift[f.id] = Math.round((state.dayDrift[f.id] + 0.3) * 100) / 100;
      log(`Coast Guard news: ${f.name} is in demand — prices up today!`);
      return { event: 'demand-spike', find: f.id };
    }
    if (roll < 0.28) {
      const f = COASTGUARD_FINDS[Math.floor(rng() * COASTGUARD_FINDS.length)];
      state.dayDrift[f.id] = Math.round((state.dayDrift[f.id] - 0.15) * 100) / 100;
      log(`Coast Guard news: too much ${f.name} around — prices dip.`);
      return { event: 'price-dip', find: f.id };
    }
    if (roll < 0.38) {
      const f = COASTGUARD_FINDS[Math.floor(rng() * COASTGUARD_FINDS.length)];
      state.inventory[f.id] += 3;
      state.findsFound += 3;
      log(`Coast Guard gift: a fisherman hands you 3x ${f.name}.`);
      return { event: 'gift', find: f.id };
    }
    if (roll < 0.46) {
      const ev = COASTGUARD_EVENTS[Math.floor(rng() * COASTGUARD_EVENTS.length)];
      log(`Coast Guard event: ${ev.name} — ${ev.desc}`);
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
        finishSession('cut short — fuel ran out');
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
    for (const f of COASTGUARD_FINDS) {
      if (state.inventory[f.id] === undefined) state.inventory[f.id] = 0;
      if (state.dayDrift[f.id] === undefined) state.dayDrift[f.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: COASTGUARD_RANKS[state.rank].name,
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
      resourceMax: coastGuardFuelMax(state.upgrades),
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
    if (state.session) return `Coast Guard: ${state.session} — ${state.sessionStepsLeft} grids left, fuel ${Math.round(state.resource)}`;
    if (state.activeContract) return `Coast Guard: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held > 0) return `Coast Guard: ${held} finds held`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const near = Math.hypot(pos.x - (-250), pos.z - (-500)) < 30;
    if (!near) return false;
    if (state.session) { searchGrid(); return true; }
    const held = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (held > 0) { sellAllFinds(); return true; }
    dispatch(RESCUE_MISSIONS[0].id);
    return true;
  }

  return {
    name: 'Coast Guard',
    state,
    dispatch, searchGrid, returnToBase, pingSonar,
    sellFind, sellAllFinds, buyUpgrade, takeContract,
    deliverContract, abandonContract, priceBoard, siteReport,
    dailyEvent, tick, tickDay, serialize, deserialize,
    stats, hudLine, interact,
  };
}

export function createCoastGuardExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function hireHelper(id) {
    const h = COASTGUARD_HELPERS.find((x) => x.id === id);
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
      const h = COASTGUARD_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    return coastGuardHelperBonus(helpers, skill);
  }

  function challenges() {
    return COASTGUARD_CHALLENGES.map((ch) => coastGuardChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = COASTGUARD_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = coastGuardChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return COASTGUARD_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function donateFinds(findId, qty) {
    const have = system.state.inventory[findId] || 0;
    if (have < qty || qty <= 0) return { ok: false, reason: 'not-enough', have };
    system.state.inventory[findId] -= qty;
    const rep = Math.floor(qty / 5);
    return { ok: true, qty, rep, note: 'The maritime authority thanks you. The sea remembers.' };
  }

  function bundleSale(findId, qty) {
    const have = system.state.inventory[findId] || 0;
    if (have < qty || qty < 10) return { ok: false, reason: 'need-10-plus', have };
    const unit = coastGuardPriceFor(findId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(unit * qty * 1.1 * 10) / 10;
    system.state.inventory[findId] -= qty;
    system.state.findsSold += qty;
    system.state.earned += total;
    return { ok: true, total, qty, bonus: 'bundle +10%' };
  }

  function checkFuel() {
    const max = coastGuardFuelMax(system.state.upgrades);
    return {
      resource: Math.round(system.state.resource * 10) / 10,
      max,
      pct: Math.round((system.state.resource / max) * 100),
    };
  }

  function refuel() {
    system.state.resource = coastGuardFuelMax(system.state.upgrades);
    return { ok: true, resource: system.state.resource };
  }

  function weighSalvage() {
    let kg = 0;
    for (const [id, qty] of Object.entries(system.state.inventory)) {
      const f = COASTGUARD_FINDS.find((x) => x.id === id);
      if (f) kg += f.weight * qty;
    }
    return { kg: Math.round(kg * 10) / 10, cap: coastGuardCarryCap(system.state.upgrades) };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, donateFinds, bundleSale,
    checkFuel, refuel, weighSalvage,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return helperWagesPaid; },
  };
}

export function createCoastGuardMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkSold = 0;

  function setEvent(eventId) {
    const ev = COASTGUARD_MARKET.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = COASTGUARD_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    system.state.season = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(findId, basePrice) {
    let price = basePrice;
    price *= coastGuardEventMult(currentEvent, findId);
    price *= coastGuardSeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(findId, qty) {
    const have = system.state.inventory[findId] || 0;
    if (have < qty || qty < 20) return { ok: false, reason: 'need-20-plus', have };
    const unit = coastGuardPriceFor(findId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(eventPrice(findId, unit) * qty * 1.1 * 10) / 10;
    system.state.inventory[findId] -= qty;
    system.state.findsSold += qty;
    system.state.earned += total;
    bulkSold += qty;
    dealsClaimed += 1;
    return { ok: true, total, qty, bonus: 'bulk +10%' };
  }

  function dailyDeals() {
    const deals = [];
    for (const f of COASTGUARD_FINDS) {
      const mult = coastGuardEventMult(currentEvent, f.id);
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

export const COASTGUARD_META = {
  system: 'coastguard',
  version: '7c-B2',
  author: 'builder-2',
  dataCount: RESCUE_MISSIONS.length,
  findCount: COASTGUARD_FINDS.length,
  upgradeCount: COASTGUARD_UPGRADES.length,
  rankCount: COASTGUARD_RANKS.length,
};
