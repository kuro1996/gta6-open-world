export const TOURNAMENTS = [
  { id: 'rookie-cup', name: 'Rookie Cup', price: 100, rarity: 0.25, difficulty: 1, game: 'Solara Kart', teams: 8, duration: 120, desc: 'Fresh faces, loud crowds, pure chaos on the track.' },
  { id: 'fps-showdown', name: 'FPS Showdown', price: 180, rarity: 0.45, difficulty: 2, game: 'Strike Zone', teams: 16, duration: 180, desc: 'Sixteen squads, one map, zero mercy.' },
  { id: 'moba-clash', name: 'MOBA Clash', price: 220, rarity: 0.5, difficulty: 2, game: 'Legends Rift', teams: 10, duration: 240, desc: 'Five-versus-five battles that run past midnight.' },
  { id: 'fighting-finals', name: 'Fighting Finals', price: 260, rarity: 0.6, difficulty: 3, game: 'Iron Fist', teams: 8, duration: 150, desc: 'One-on-one duels under the brightest lights.' },
  { id: 'racing-grand-prix', name: 'Racing Grand Prix', price: 200, rarity: 0.5, difficulty: 2, game: 'Turbo Drift', teams: 12, duration: 200, desc: 'Engines screaming around the arena circuit.' },
  { id: 'battle-royale', name: 'Battle Royale', price: 320, rarity: 0.7, difficulty: 3, game: 'Last Squad', teams: 20, duration: 300, desc: 'A hundred players drop in, one squad walks out.' },
  { id: 'strategy-masters', name: 'Strategy Masters', price: 280, rarity: 0.65, difficulty: 3, game: 'Empire Chess', teams: 8, duration: 280, desc: 'Slow, silent, brutal games of pure mind.' },
  { id: 'speedrun-marathon', name: 'Speedrun Marathon', price: 150, rarity: 0.4, difficulty: 2, game: 'Pixel Dash', teams: 32, duration: 360, desc: 'Thirty-two runners chasing the perfect run.' },
  { id: 'vr-arena', name: 'VR Arena', price: 350, rarity: 0.75, difficulty: 4, game: 'Neon Void', teams: 8, duration: 160, desc: 'Players duck and dive inside a glowing void.' },
  { id: 'world-championship', name: 'World Championship', price: 500, rarity: 0.9, difficulty: 5, game: 'Solara Legends', teams: 16, duration: 480, desc: 'The biggest stage in the city, sold out for weeks.' },
];

export const ESPORTS_UPGRADES = [
  { id: 'big-screen', name: 'Big Screen', cost: 120, effect: 'crowd +10%', desc: 'A giant screen so the back row can see every kill.' },
  { id: 'mega-stage', name: 'Mega Stage', cost: 320, effect: 'capacity +2', desc: 'A second stage doubles the bookings.' },
  { id: 'sound-system', name: 'Sound System', cost: 180, effect: 'crowd +15%', desc: 'Bass you can feel in your chest.' },
  { id: 'vip-boxes', name: 'VIP Boxes', cost: 260, effect: 'payout +15%', desc: 'Glass boxes for sponsors and superfans.' },
  { id: 'merch-stall', name: 'Merch Stall', cost: 140, effect: 'earned +5%', desc: 'Jerseys, posters and foam fingers.' },
  { id: 'streaming-rig', name: 'Streaming Rig', cost: 300, effect: 'visitors +20%', desc: 'Broadcast every match to the world.' },
  { id: 'light-show', name: 'Light Show', cost: 220, effect: 'crowd +12%', desc: 'Lasers and smoke for every entrance.' },
  { id: 'pro-coaches', name: 'Pro Coaches', cost: 160, effect: 'payout +10%', desc: 'Coaches who sharpen every team.' },
];

export const ESPORTS_RANKS = [
  { level: 0, name: 'Rookie', xp: 0, perk: 'Still learning the meta.' },
  { level: 1, name: 'Contender', xp: 150, perk: 'Teams start to notice you.' },
  { level: 2, name: 'Pro', xp: 400, perk: 'Sponsors call first.' },
  { level: 3, name: 'Champion', xp: 800, perk: 'Trophies line the lobby.' },
  { level: 4, name: 'Arena Legend', xp: 1500, perk: 'Your name is on the arena.' },
];

export const ESPORTS_STAFF = [
  { id: 'caster-max', name: 'Max the Caster', wage: 50, skill: 'caster', bonus: 3, desc: 'A voice that turns every round into a final.' },
  { id: 'ref-ivy', name: 'Ivy the Referee', wage: 40, skill: 'referee', bonus: 2, desc: 'Keeps every match fair and on time.' },
  { id: 'tech-omar', name: 'Omar the Tech', wage: 55, skill: 'tech', bonus: 2, desc: 'Fixes any rig before the crowd notices.' },
  { id: 'host-lena', name: 'Lena the Host', wage: 45, skill: 'host', bonus: 2, desc: 'Hypes the crowd between games.' },
];

export const ESPORTS_DAILY_EVENTS = [
  { id: 'viral-clip', name: 'Viral Clip', effect: 'visitors', amount: 30, text: 'A clip from last night hits a million views.' },
  { id: 'sponsor-deal', name: 'Sponsor Deal', effect: 'earn', amount: 90, text: 'A headset brand signs a fat cheque.' },
  { id: 'server-crash', name: 'Server Crash', effect: 'cost', amount: 50, text: 'The game servers die mid-match; refunds hurt.' },
  { id: 'fan-meetup', name: 'Fan Meetup', effect: 'rep', amount: 3, text: 'Fans queue for autographs all afternoon.' },
  { id: 'underdog-win', name: 'Underdog Win', effect: 'visitors', amount: 20, text: 'A nobody team beats the champions live.' },
  { id: 'cheating-scandal', name: 'Cheating Scandal', effect: 'heat', amount: 2, text: 'A player is caught with banned software.' },
  { id: 'coach-tips', name: 'Coach Tips', effect: 'xp', amount: 25, text: 'A retired pro shares the secrets of the meta.' },
  { id: 'power-outage', name: 'Power Outage', effect: 'cost', amount: 35, text: 'A blown fuse darkens the arena for an hour.' },
  { id: 'grand-final', name: 'Grand Final', effect: 'earn', amount: 150, text: 'A sold-out final with a roaring crowd.' },
  { id: 'practice-day', name: 'Practice Day', effect: 'rep', amount: 1, text: 'Teams scrimmage while fans watch for free.' },
];

export const ESPORTS_TIPS = [
  { id: 'tip-sun', name: 'Sunny Days', text: 'Sunny days pull bigger crowds into the arena.' },
  { id: 'tip-stage', name: 'Mega Stage', text: 'Buy the Mega Stage to book two more tournaments.' },
  { id: 'tip-sponsor', name: 'Sign Sponsors', text: 'Sign a sponsor before a big final for extra payout.' },
  { id: 'tip-streak', name: 'Keep Playing', text: 'Back-to-back tournaments grow your streak fast.' },
  { id: 'tip-prices', name: 'Price Watch', text: 'Ticket prices drift every day, so check the board.' },
  { id: 'tip-staff', name: 'Good Casters', text: 'A great caster can turn a dull match into a classic.' },
  { id: 'tip-donate', name: 'Community', text: 'Donations to the youth league build reputation.' },
  { id: 'tip-rank', name: 'Climb Up', text: 'Every match played pushes you toward Pro.' },
];

export const ESPORTS_CHALLENGES = [
  { id: 'ch-runs-5', name: 'Five Matches', target: 'runsDone', goal: 5, xp: 50, desc: 'Run 5 tournaments.' },
  { id: 'ch-earn-500', name: 'First 500', target: 'earned', goal: 500, xp: 80, desc: 'Earn $500 in total.' },
  { id: 'ch-visitors-200', name: 'Packed House', target: 'visitors', goal: 200, xp: 60, desc: 'Welcome 200 visitors.' },
  { id: 'ch-items-4', name: 'Four Bookings', target: 'itemsOwned', goal: 4, xp: 70, desc: 'Book 4 tournaments.' },
  { id: 'ch-upgrades-3', name: 'Well Equipped', target: 'upgradesOwned', goal: 3, xp: 60, desc: 'Own 3 upgrades.' },
  { id: 'ch-rep-10', name: 'Respected', target: 'reputation', goal: 10, xp: 50, desc: 'Reach 10 reputation.' },
  { id: 'ch-streak-3', name: 'Winning Run', target: 'streak', goal: 3, xp: 90, desc: 'Reach a 3-match streak.' },
  { id: 'ch-best-300', name: 'Big Final', target: 'bestRun', goal: 300, xp: 100, desc: 'Earn $300 from a single tournament.' },
];

export const ESPORTS_ACHIEVEMENTS = [
  { id: 'ach-runs-10', name: 'Tournament King', target: 'runsDone', goal: 10, desc: 'Run 10 tournaments.' },
  { id: 'ach-earn-1000', name: 'Golden Arena', target: 'earned', goal: 1000, desc: 'Earn $1,000 in total.' },
  { id: 'ach-visitors-500', name: 'City Favourite', target: 'visitors', goal: 500, desc: 'Welcome 500 visitors.' },
  { id: 'ach-items-6', name: 'Full Calendar', target: 'itemsOwned', goal: 6, desc: 'Book 6 tournaments.' },
  { id: 'ach-upgrades-5', name: 'Fully Loaded', target: 'upgradesOwned', goal: 5, desc: 'Own 5 upgrades.' },
  { id: 'ach-rep-20', name: 'Beloved', target: 'reputation', goal: 20, desc: 'Reach 20 reputation.' },
  { id: 'ach-streak-5', name: 'Unstoppable', target: 'streak', goal: 5, desc: 'Reach a 5-match streak.' },
  { id: 'ach-best-500', name: 'Record Final', target: 'bestRun', goal: 500, desc: 'Earn $500 from a single tournament.' },
];

export const ESPORTS_LEADERBOARD = [
  { name: 'Team Nova', score: 1050, desc: 'Unbeaten in the spring split.' },
  { name: 'Pixel Kings', score: 780, desc: 'Old rivals with a loud fanbase.' },
  { name: 'Ghost Squad', score: 610, desc: 'Quiet, fast and deadly.' },
  { name: 'Rookie Five', score: 240, desc: 'New kids with big dreams.' },
  { name: 'You', score: 0, desc: 'The new name on the board.' },
];

export const ESPORTS_RECORDS = [
  { id: 'rec-runs', name: 'Most Tournaments', stat: 'runsDone', unit: 'events', desc: 'Total tournaments run.' },
  { id: 'rec-earned', name: 'Top Earnings', stat: 'earned', unit: '$', desc: 'Total money earned.' },
  { id: 'rec-visitors', name: 'Biggest Crowd', stat: 'visitors', unit: 'fans', desc: 'Total visitors welcomed.' },
  { id: 'rec-best', name: 'Best Final', stat: 'bestRun', unit: '$', desc: 'Best single-event payout.' },
  { id: 'rec-streak', name: 'Longest Streak', stat: 'bestStreak', unit: 'events', desc: 'Longest run of events.' },
];

export const ESPORTS_MARKET_EVENTS = [
  { id: 'me-rookie', name: 'Kart Craze', item: 'rookie-cup', mult: 1.35, desc: 'Everyone is racing karts this week.' },
  { id: 'me-fps', name: 'FPS Fatigue', item: 'fps-showdown', mult: 0.7, desc: 'Shooter crowds thin out.' },
  { id: 'me-moba', name: 'MOBA Mania', item: 'moba-clash', mult: 1.35, desc: 'The rift is packed every night.' },
  { id: 'me-fight', name: 'Fighting Fade', item: 'fighting-finals', mult: 0.7, desc: 'The ring is quiet this week.' },
  { id: 'me-race', name: 'Racing Rush', item: 'racing-grand-prix', mult: 1.35, desc: 'Drift fever sweeps the city.' },
  { id: 'me-royale', name: 'Royale Dip', item: 'battle-royale', mult: 0.7, desc: 'The drop is less crowded.' },
  { id: 'me-strategy', name: 'Strategy Surge', item: 'strategy-masters', mult: 1.35, desc: 'Chess is cool again.' },
  { id: 'me-speed', name: 'Speedrun Slump', item: 'speedrun-marathon', mult: 0.7, desc: 'Runners take a breather.' },
  { id: 'me-vr', name: 'VR Boom', item: 'vr-arena', mult: 1.35, desc: 'The void is the hottest ticket.' },
  { id: 'me-world', name: 'World Cool', item: 'world-championship', mult: 0.7, desc: 'The big final rests between seasons.' },
];

export const ESPORTS_SEASONS = [
  { id: 'summer', name: 'Summer', mult: 1.15, desc: 'Summer split brings huge crowds.' },
  { id: 'autumn', name: 'Autumn', mult: 1.0, desc: 'Steady league nights.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold nights, smaller halls.' },
  { id: 'spring', name: 'Spring', mult: 1.05, desc: 'The new season kicks off.' },
];

export const ESPORTS_FACTS = [
  { id: 'fact-rookie', text: 'The Rookie Cup once had a 12-year-old finalist.' },
  { id: 'fact-fps', text: 'The FPS Showdown map was designed by a fan.' },
  { id: 'fact-moba', text: 'MOBA Clash finals have run past 2am three times.' },
  { id: 'fact-fight', text: 'The Fighting Finals trophy weighs 9 kilos.' },
  { id: 'fact-race', text: 'The Racing Grand Prix track is modelled on the city streets.' },
  { id: 'fact-royale', text: 'Battle Royale started as a joke mode at a lan party.' },
  { id: 'fact-strategy', text: 'Strategy Masters games can last six hours.' },
  { id: 'fact-speed', text: 'The Speedrun Marathon record was set on a broken controller.' },
  { id: 'fact-vr', text: 'VR Arena players burn 400 calories per match.' },
  { id: 'fact-world', text: 'The World Championship final sold out in nine minutes.' },
  { id: 'fact-1', text: 'Esports arenas can hold more fans than football stadiums.' },
  { id: 'fact-2', text: 'The first esports tournament was held in 1972.' },
  { id: 'fact-3', text: 'Pro players train up to 12 hours a day.' },
  { id: 'fact-4', text: 'Casters rehearse player names for hours before a match.' },
  { id: 'fact-5', text: 'A single match can be watched by 100 million people.' },
  { id: 'fact-6', text: 'Many pros retire before they turn 30.' },
  { id: 'fact-7', text: 'Team houses have chefs, coaches and analysts.' },
  { id: 'fact-8', text: 'The loudest arena crowds reach 120 decibels.' },
  { id: 'fact-9', text: 'Referees in esports watch replays from six angles.' },
  { id: 'fact-10', text: 'Merch sales spike the night a team wins a final.' },
];

export const ESPORTS_NPC_LINES = [
  { id: 'npc-1', text: 'Did you see that clutch play? Unreal!' },
  { id: 'npc-2', text: 'I queued three hours for this final.' },
  { id: 'npc-3', text: 'Team Nova is going to sweep them.' },
  { id: 'npc-4', text: 'The caster makes every round sound epic.' },
  { id: 'npc-5', text: 'I got the last jersey in my size!' },
  { id: 'npc-6', text: 'My voice is gone from screaming.' },
  { id: 'npc-7', text: 'That underdog win broke the arena.' },
  { id: 'npc-8', text: 'The light show alone is worth the ticket.' },
  { id: 'npc-9', text: 'I met my favourite player at the meetup.' },
  { id: 'npc-10', text: 'Best night out in the city, hands down.' },
  { id: 'npc-11', text: 'The VR matches make me dizzy just watching.' },
  { id: 'npc-12', text: 'I have been to every final this season.' },
  { id: 'npc-13', text: 'That comeback in game five was legendary.' },
  { id: 'npc-14', text: 'The food here is actually good.' },
  { id: 'npc-15', text: 'I am saving up for the world final already.' },
  { id: 'npc-16', text: 'Next year I am trying out for Rookie Cup.' },
];

export const ESPORTS_GUIDE = [
  { id: 'guide-1', text: 'Step 1: Book a tournament from the list.' },
  { id: 'guide-2', text: 'Step 2: Pay the booking cost from your cash.' },
  { id: 'guide-3', text: 'Step 3: Run the tournament to start the match.' },
  { id: 'guide-4', text: 'Step 4: Wait for the match timer to finish.' },
  { id: 'guide-5', text: 'Step 5: Collect the ticket sales from the till.' },
  { id: 'guide-6', text: 'Step 6: Sign a sponsor to boost the next event.' },
  { id: 'guide-7', text: 'Step 7: Spend earnings on arena upgrades.' },
  { id: 'guide-8', text: 'Step 8: Hire casters and referees for the floor.' },
  { id: 'guide-9', text: 'Step 9: Level up tournaments to raise their value.' },
  { id: 'guide-10', text: 'Step 10: Watch market events for hot games.' },
  { id: 'guide-11', text: 'Step 11: Claim challenges as you hit each goal.' },
  { id: 'guide-12', text: 'Step 12: Donate to the youth league for reputation.' },
  { id: 'guide-13', text: 'Step 13: Check the price board before selling.' },
  { id: 'guide-14', text: 'Step 14: Keep events running to grow your streak.' },
  { id: 'guide-15', text: 'Step 15: Trade in bulk when the market is hot.' },
  { id: 'guide-16', text: 'Step 16: Become an Arena Legend.' },
];

export const ESPORTS_META = { system: 'esports', version: '7-B4', author: 'builder-4', mechanic: 'venue', dataCount: 10, dataName: 'TOURNAMENTS' };

const wxOf = (weather) => (typeof weather === 'string' ? weather : (weather && weather.condition) || 'clear');
const wxMult = (table, weather) => {
  const hit = table[wxOf(weather)];
  return hit === undefined ? 1 : hit;
};
const r1 = (n) => Math.round(n * 10) / 10;

export const esportsRankFor = (xp) => ESPORTS_RANKS.reduce((lvl, r) => (xp >= r.xp ? r.level : lvl), 0);

export const esportsItemById = (id) => TOURNAMENTS.find((i) => i.id === id) || null;

export const esportsPriceFor = (id, drift, rank, upgrades) => {
  const item = esportsItemById(id);
  if (!item) return 0;
  const withRank = item.price * (1 + (drift || 0)) * (1 + (rank || 0) * 0.05);
  const bumped = upgrades && upgrades.length >= 3 ? withRank * 1.1 : withRank;
  return Math.max(1, r1(bumped));
};

export const esportsCapacityFor = (rank, upgrades) =>
  3 + (rank || 0) + (upgrades && upgrades.includes('mega-stage') ? 2 : 0);

export const esportsPayoutFor = (item, rank, upgrades, weather, boosted) => {
  if (!item) return 0;
  const base = 0.6 + (rank || 0) * 0.1 + (boosted ? 0.3 : 0);
  const weathered = base * wxMult({ rain: 1.0, sunny: 1.1, storm: 0.7 }, weather);
  const geared = upgrades && upgrades.length >= 4 ? weathered * 1.15 : weathered;
  return Math.max(5, Math.round(item.price * geared));
};

export const esportsCrowdFor = (item, rank, weather) => {
  const raw = 10 + (item ? item.difficulty : 0) * 8 + (rank || 0) * 5;
  return Math.max(1, Math.round(raw * wxMult({ rain: 1.0, sunny: 1.1, storm: 0.5 }, weather)));
};

export const esportsUpgradeById = (id) => ESPORTS_UPGRADES.find((u) => u.id === id) || null;

export const esportsStaffById = (id) => ESPORTS_STAFF.find((s) => s.id === id) || null;

export const esportsEventById = (id) =>
  ESPORTS_DAILY_EVENTS.find((e) => e.id === id) || ESPORTS_MARKET_EVENTS.find((e) => e.id === id) || null;

export const esportsTipFor = (day) => ESPORTS_TIPS[day % ESPORTS_TIPS.length];

export const esportsFactFor = (day) => ESPORTS_FACTS[day % ESPORTS_FACTS.length];

export const esportsNpcLineFor = (day) => ESPORTS_NPC_LINES[day % ESPORTS_NPC_LINES.length];

export const esportsGuideStep = (step) => (step >= 0 && step < ESPORTS_GUIDE.length ? ESPORTS_GUIDE[step] : null);

export const esportsSeasonMult = (seasonId) => {
  const s = ESPORTS_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
};

export const esportsMarketEventMult = (eventId, itemId) => {
  if (!eventId) return 1;
  const e = ESPORTS_MARKET_EVENTS.find((x) => x.id === eventId);
  return e && e.item === itemId ? e.mult : 1;
};

export const esportsWeeklyGoal = (state) => {
  const runs = { have: state.runsDone, goal: 5, done: state.runsDone >= 5 };
  const earned = { have: state.earned, goal: 500, done: state.earned >= 500 };
  const visitors = { have: state.visitors, goal: 100, done: state.visitors >= 100 };
  return { runs, earned, visitors, allDone: runs.done && earned.done && visitors.done };
};

export const esportsEfficiency = (state) => {
  const total = state.runsDone + state.failures;
  return total === 0 ? 100 : Math.round((state.runsDone / total) * 100);
};

export const esportsProfitPerRun = (state) => (state.runsDone === 0 ? 0 : r1(state.earned / state.runsDone));

export const esportsInventoryValue = (state) =>
  r1(Object.keys(state.owned).reduce((sum, id) => {
    const item = esportsItemById(id);
    return item ? sum + item.price * (state.levels[id] || 1) : sum;
  }, 0));

export const esportsSummary = (state) =>
  'Esports Arena at rank ' + esportsRankNameFor(state.rank) + ': ' + state.runsDone + ' runs, ' + state.itemsOwned + ' entries, $' + state.earned + ' earned, ' + state.visitors + ' visitors.';

export const esportsNextGoal = (state) => {
  if (state.itemsOwned === 0) return 'Open your first entry.';
  if (state.runsDone < 5) return 'Finish 5 runs.';
  if (state.earned < 500) return 'Earn $500 in total.';
  if (state.rank < 2) return 'Reach rank ' + esportsRankNameFor(2) + '.';
  if (state.upgradesOwned < 4) return 'Own 4 upgrades.';
  return 'Become a legend of the Esports Arena.';
};

export const esportsRecordFor = (id, state) => {
  const rec = ESPORTS_RECORDS.find((r) => r.id === id);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, stat: rec.stat, unit: rec.unit, desc: rec.desc, value: state[rec.stat] === undefined ? 0 : state[rec.stat] };
};

export const esportsAllRecords = (state) => ESPORTS_RECORDS.map((r) => esportsRecordFor(r.id, state));

export const esportsLeaderboardWith = (score) => {
  const board = ESPORTS_LEADERBOARD.map((e) => (e.name === 'You' ? { name: e.name, score, desc: e.desc } : { name: e.name, score: e.score, desc: e.desc }));
  board.sort((a, b) => b.score - a.score);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, score: e.score, desc: e.desc }));
};

export const esportsSeasonReport = (state, seasonId) => {
  const mult = esportsSeasonMult(seasonId);
  return TOURNAMENTS.map((it) => ({
    id: it.id,
    name: it.name,
    basePrice: it.price,
    seasonPrice: r1(it.price * mult),
    owned: !!state.owned[it.id],
    level: state.levels[it.id] || 0,
  }));
};

export const esportsChallengeProgress = (challenge, state) => {
  const have = Math.floor(state[challenge.target] || 0);
  return { id: challenge.id, name: challenge.name, have, goal: challenge.goal, done: have >= challenge.goal, xp: challenge.xp };
};

export const esportsBestEntryFor = (rank) => {
  const pool = TOURNAMENTS.filter((it) => it.difficulty <= rank + 2);
  if (pool.length === 0) return null;
  return pool.reduce((best, it) => {
    const score = (it.price * (1 + it.rarity * 2)) / it.difficulty;
    const bestScore = (best.price * (1 + best.rarity * 2)) / best.difficulty;
    return score > bestScore ? it : best;
  });
};

export const esportsEventFor = (day) => ESPORTS_MARKET_EVENTS[day % ESPORTS_MARKET_EVENTS.length];

export const esportsDailyEventFor = (day) => ESPORTS_DAILY_EVENTS[day % ESPORTS_DAILY_EVENTS.length];

export const esportsRankNameFor = (level) => {
  const r = ESPORTS_RANKS.find((x) => x.level === level);
  return r ? r.name : 'Unknown';
};

export const esportsTotalValue = (state) => r1(esportsInventoryValue(state) + state.pending + state.earned);

export const esportsProgressPercent = (state) => {
  const total = state.runsDone + state.failures;
  return total === 0 ? 0 : Math.round((state.runsDone / total) * 100);
};

export const esportsStaffBonusFor = (staffIds, skill) =>
  staffIds.reduce((total, id) => {
    const s = esportsStaffById(id);
    return s && s.skill === skill ? total + s.bonus : total;
  }, 0);

export const esportsCheapestEntry = () => TOURNAMENTS.reduce((a, b) => (b.price < a.price ? b : a));

export const esportsPriciestEntry = () => TOURNAMENTS.reduce((a, b) => (b.price > a.price ? b : a));

export const esportsEntriesByDifficulty = (difficulty) => TOURNAMENTS.filter((it) => it.difficulty === difficulty).map((it) => it.id);

export const esportsEntriesByRarity = (maxRarity) => TOURNAMENTS.filter((it) => it.rarity <= maxRarity).map((it) => it.id);

export const esportsGradeFor = (runsDone, earned, visitors) => {
  const score = runsDone * 10 + Math.round(earned / 10) + Math.floor(visitors / 10);
  return score >= 500 ? 'S' : score >= 300 ? 'A' : score >= 150 ? 'B' : score >= 50 ? 'C' : 'D';
};

export function createEsportsArenaSystem(ctx) {
  const c = ctx || {};
  const rng = typeof c.rng === 'function' ? c.rng : Math.random;
  const getDay = typeof c.getDay === 'function' ? c.getDay : () => 1;
  const getHour = typeof c.getHour === 'function' ? c.getHour : () => 12;
  const getCash = typeof c.getCash === 'function' ? c.getCash : () => 0;
  const addCash = typeof c.addCash === 'function' ? c.addCash : () => {};
  const addHeat = typeof c.addHeat === 'function' ? c.addHeat : () => {};
  const log = typeof c.log === 'function' ? c.log : () => {};
  const getWeather = typeof c.getWeather === 'function' ? c.getWeather : () => ({ condition: 'clear' });

  const drift = {};
  const holdings = {};
  const prices = {};
  TOURNAMENTS.forEach((it) => {
    drift[it.id] = 0;
    holdings[it.id] = 0;
    prices[it.id] = it.price;
  });

  const state = {
    xp: 0, rank: 0, runsDone: 0, itemsOwned: 0, visitors: 0, earned: 0, spent: 0,
    reputation: 0, heat: 0, upgrades: [], upgradesOwned: 0, staff: [], staffHired: 0,
    owned: {}, levels: {}, boosted: {}, active: null, activeId: null, activeTimer: 0,
    activeBase: 0, pending: 0, dailyEarned: 0, dailyVisitors: 0, bestRun: 0,
    bestRunName: null, streak: 0, bestStreak: 0, failures: 0, donations: 0,
    challengesClaimed: [], lastDay: 1, drift, holdings, prices, viewers: 0,
    followers: 0, subs: 0, peakViewers: 0, streamMinutes: 0, support: 50,
    volunteers: 0, donors: 0, polls: 50, occupancy: 0, attendanceToday: 0,
    dividendsPaid: 0, wagesPaid: 0,
  };

  const gainXp = (n) => {
    state.xp += n;
    const lvl = esportsRankFor(state.xp);
    if (lvl > state.rank) {
      state.rank = lvl;
      log('Rank up! You are now ' + esportsRankNameFor(lvl) + '.');
    }
  };

  const bookTournament = (id) => {
    const item = esportsItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (state.owned[id]) return { ok: false, reason: 'already-owned', id };
    const cap = esportsCapacityFor(state.rank, state.upgrades);
    if (state.itemsOwned >= cap) return { ok: false, reason: 'capacity-full', cap };
    const need = Math.max(0, item.difficulty - 2);
    if (state.rank < need) return { ok: false, reason: 'rank-too-low', rank: need };
    const cost = esportsPriceFor(id, state.drift[id] || 0, 0, []);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned[id] = 1;
    state.levels[id] = 1;
    state.itemsOwned += 1;
    gainXp(10);
    log('Booked tournament ' + item.name + ' for $' + cost + '.');
    return { ok: true, id, cost, name: item.name };
  };

  const runTournament = (id) => {
    const item = esportsItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (state.active) return { ok: false, reason: 'already-running', active: state.activeId };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    state.active = 'run';
    state.activeId = id;
    state.activeTimer = 30 + item.difficulty * 10;
    state.activeBase = item.price;
    log('Tournament started: ' + item.name + '.');
    return { ok: true, id, seconds: state.activeTimer };
  };

  const settleRun = () => {
    const item = esportsItemById(state.activeId);
    const doneId = state.activeId;
    const payout = esportsPayoutFor(item, state.rank, state.upgrades, getWeather(), !!state.boosted[doneId]);
    const crowd = esportsCrowdFor(item, state.rank, getWeather());
    state.active = null;
    state.activeId = null;
    state.activeTimer = 0;
    state.visitors += crowd;
    state.dailyVisitors += crowd;
    state.attendanceToday += crowd;
    state.pending += payout;
    state.dailyEarned += payout;
    state.runsDone += 1;
    if (payout > state.bestRun) {
      state.bestRun = payout;
      state.bestRunName = item ? item.name : doneId;
    }
    state.streak += 1;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    state.boosted[doneId] = false;
    gainXp(15 + (item ? item.difficulty : 0) * 3);
    log('Tournament ' + (item ? item.name : doneId) + ' drew ' + crowd + ' fans and earned $' + payout + '.');
  };

  const collectTicketSales = () => {
    if (state.pending <= 0) return { ok: false, reason: 'nothing-pending' };
    const amount = state.pending;
    state.pending = 0;
    state.earned += amount;
    addCash(amount);
    log('Collected $' + amount + ' in ticket sales.');
    return { ok: true, amount };
  };

  const sellMerch = (id) => {
    const item = esportsItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    const refund = Math.round(item.price * 0.5);
    delete state.owned[id];
    delete state.levels[id];
    state.itemsOwned -= 1;
    state.earned += refund;
    addCash(refund);
    gainXp(5);
    log('Sold merch stock from ' + item.name + ' for $' + refund + '.');
    return { ok: true, total: refund, qty: 1 };
  };

  const signSponsor = (id) => {
    const item = esportsItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    if (getCash() < 40) return { ok: false, reason: 'not-enough-cash', cost: 40 };
    addCash(-40);
    state.spent += 40;
    state.boosted[id] = true;
    state.reputation += 1;
    gainXp(10);
    log('Signed a sponsor for ' + item.name + '.');
    return { ok: true, id, boosted: true };
  };

  const buyUpgrade = (id) => {
    const up = esportsUpgradeById(id);
    if (!up) return { ok: false, reason: 'unknown-upgrade', id };
    if (state.upgrades.includes(id)) return { ok: false, reason: 'already-owned', id };
    if (getCash() < up.cost) return { ok: false, reason: 'not-enough-cash', cost: up.cost };
    addCash(-up.cost);
    state.spent += up.cost;
    state.upgrades.push(id);
    state.upgradesOwned += 1;
    gainXp(20);
    log('Bought upgrade ' + up.name + ' for $' + up.cost + '.');
    return { ok: true, id, name: up.name };
  };

  const hireStaff = (id) => {
    const s = esportsStaffById(id);
    if (!s) return { ok: false, reason: 'unknown-staff', id };
    if (state.staff.includes(id)) return { ok: false, reason: 'already-hired', id };
    if (getCash() < s.wage) return { ok: false, reason: 'not-enough-cash', cost: s.wage };
    addCash(-s.wage);
    state.spent += s.wage;
    state.staff.push(id);
    state.staffHired += 1;
    gainXp(10);
    log('Hired ' + s.name + ' for $' + s.wage + '.');
    return { ok: true, id, name: s.name, wage: s.wage };
  };

  const fireStaff = (id) => {
    const at = state.staff.indexOf(id);
    if (at < 0) return { ok: false, reason: 'not-hired', id };
    state.staff.splice(at, 1);
    log('Let go of staff member ' + id + '.');
    return { ok: true, id };
  };

  const upgradeItem = (id) => {
    const item = esportsItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    const lvl = state.levels[id] || 1;
    if (lvl >= 5) return { ok: false, reason: 'max-level', id, level: lvl };
    const cost = Math.round(item.price * 0.4 * lvl);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.levels[id] = lvl + 1;
    gainXp(15);
    log('Upgraded ' + item.name + ' to level ' + (lvl + 1) + '.');
    return { ok: true, id, level: lvl + 1 };
  };

  const priceBoard = () => TOURNAMENTS.map((it) => ({
    id: it.id,
    name: it.name,
    price: state.prices[it.id],
    basePrice: it.price,
    drift: state.drift[it.id] || 0,
    owned: !!state.owned[it.id],
    level: state.levels[it.id] || 0,
    difficulty: it.difficulty,
    rarity: it.rarity,
  }));

  const listItems = () => TOURNAMENTS.map((it) => ({
    id: it.id, name: it.name, price: it.price, difficulty: it.difficulty, rarity: it.rarity, desc: it.desc, owned: !!state.owned[it.id],
  }));

  const info = (id) => {
    const item = esportsItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    return { ok: true, item, owned: !!state.owned[id], level: state.levels[id] || 0, price: state.prices[id], holdings: state.holdings[id] || 0 };
  };

  const dailyEvent = () => {
    if (ESPORTS_DAILY_EVENTS.length === 0) return { event: 'none', name: '', effect: '', amount: 0 };
    const ev = ESPORTS_DAILY_EVENTS[Math.floor(rng() * ESPORTS_DAILY_EVENTS.length)];
    switch (ev.effect) {
      case 'earn': state.pending += ev.amount; break;
      case 'cost':
        if (getCash() >= ev.amount) {
          addCash(-ev.amount);
          state.spent += ev.amount;
        }
        break;
      case 'rep': state.reputation += ev.amount; break;
      case 'visitors':
        state.visitors += ev.amount;
        state.dailyVisitors += ev.amount;
        break;
      case 'heat':
        state.heat += ev.amount;
        addHeat(ev.amount);
        break;
      case 'xp': gainXp(ev.amount); break;
      default: break;
    }
    log(ev.text);
    return { event: ev.id, name: ev.name, effect: ev.effect, amount: ev.amount };
  };

  const tick = (dt) => {
    if (!state.active) return;
    state.activeTimer -= dt;
    if (state.activeTimer <= 0) {
      state.activeTimer = 0;
      settleRun();
    }
  };

  const tickDay = (day) => {
    if (day === state.lastDay) return null;
    state.lastDay = day;
    TOURNAMENTS.forEach((it) => {
      if (rng() < 0.35) {
        const shift = Math.round((rng() * 0.24 - 0.12) * 100) / 100;
        const next = Math.round(((state.drift[it.id] || 0) + shift) * 100) / 100;
        state.drift[it.id] = next;
        state.prices[it.id] = Math.max(1, Math.round(it.price * (1 + next) * 10) / 10);
      }
    });
    state.dailyEarned = 0;
    state.dailyVisitors = 0;
    state.attendanceToday = 0;
    state.occupancy = 0;
    return dailyEvent();
  };

  const serialize = () => JSON.parse(JSON.stringify(state));

  const deserialize = (saved) => {
    if (!saved || typeof saved !== 'object') return;
    Object.keys(saved).forEach((k) => { state[k] = saved[k]; });
    if (!state.drift || typeof state.drift !== 'object') state.drift = {};
    if (!state.prices || typeof state.prices !== 'object') state.prices = {};
    if (!state.holdings || typeof state.holdings !== 'object') state.holdings = {};
    TOURNAMENTS.forEach((it) => {
      if (state.drift[it.id] === undefined) state.drift[it.id] = 0;
      if (state.prices[it.id] === undefined) state.prices[it.id] = it.price;
      if (state.holdings[it.id] === undefined) state.holdings[it.id] = 0;
    });
    if (!state.owned || typeof state.owned !== 'object') state.owned = {};
    if (!state.levels || typeof state.levels !== 'object') state.levels = {};
    if (!state.boosted || typeof state.boosted !== 'object') state.boosted = {};
    state.rank = esportsRankFor(state.xp);
  };

  const stats = () => {
    const holdingsCount = Object.keys(state.holdings).reduce((sum, k) => sum + (state.holdings[k] || 0), 0);
    return {
      name: 'Esports Arena',
      mechanic: 'venue',
      rank: esportsRankNameFor(state.rank),
      rankLevel: state.rank,
      xp: state.xp,
      runsDone: state.runsDone,
      itemsOwned: state.itemsOwned,
      visitors: state.visitors,
      earned: Math.round(state.earned),
      spent: state.spent,
      pending: Math.round(state.pending * 10) / 10,
      reputation: state.reputation,
      heat: state.heat,
      upgrades: state.upgrades.length,
      upgradesOwned: state.upgradesOwned,
      staff: state.staff.length,
      active: state.active,
      activeId: state.activeId,
      activeTimer: Math.max(0, Math.round(state.activeTimer)),
      dailyEarned: Math.round(state.dailyEarned),
      dailyVisitors: state.dailyVisitors,
      bestRun: Math.round(state.bestRun),
      bestRunName: state.bestRunName,
      streak: state.streak,
      bestStreak: state.bestStreak,
      failures: state.failures,
      donations: Math.round(state.donations),
      holdingsCount,
      viewers: state.viewers,
      followers: state.followers,
      subs: state.subs,
      peakViewers: state.peakViewers,
      streamMinutes: state.streamMinutes,
      support: state.support,
      volunteers: state.volunteers,
      donors: state.donors,
      polls: state.polls,
      occupancy: state.occupancy,
      dividendsPaid: Math.round(state.dividendsPaid * 10) / 10,
      wagesPaid: state.wagesPaid,
      capacity: esportsCapacityFor(state.rank, state.upgrades),
      hour: getHour(),
      day: getDay(),
    };
  };

  const hudLine = () => {
    if (state.active) return 'Esports Arena: running ' + state.activeId + ' - ' + Math.ceil(state.activeTimer) + 's left';
    if (state.pending > 0) return 'Esports Arena: $' + state.pending + ' waiting in the till';
    if (state.itemsOwned > 0) return 'Esports Arena: ' + state.itemsOwned + ' entries, $' + state.earned + ' earned';
    return '';
  };

  const interact = (action, a, b) => {
    if (!action || action === 'status') {
      return { ok: true, stats: stats(), hint: 'open a tournament to book it, run a tournament to play it, collect to empty the till' };
    }
    switch (action) {
      case 'open': return bookTournament(a);
      case 'run': return runTournament(a);
      case 'collect': return collectTicketSales();
      case 'sell': return sellMerch(a, b);
      case 'upgrade': case 'levelup': return upgradeItem(a);
      case 'hire': return hireStaff(a);
      case 'fire': return fireStaff(a);
      case 'special': return signSponsor(a);
      case 'info': return info(a);
      case 'prices': return { ok: true, prices: priceBoard() };
      case 'list': return { ok: true, items: listItems() };
      case 'event': return dailyEvent();
      default: return { ok: false, reason: 'unknown-action', action };
    }
  };

  return {
    name: 'Esports Arena',
    state,
    gainXp,
    bookTournament,
    runTournament,
    collectTicketSales,
    sellMerch,
    signSponsor,
    buyUpgrade,
    hireStaff,
    fireStaff,
    upgradeItem,
    priceBoard,
    listItems,
    info,
    dailyEvent,
    tick,
    tickDay,
    serialize,
    deserialize,
    stats,
    hudLine,
    interact,
    open: bookTournament,
    run: runTournament,
    collect: collectTicketSales,
    sell: sellMerch,
    upgrade: upgradeItem,
    hire: hireStaff,
  };
}

export function createEsportsArenaExtras(system) {
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  const challenges = () => ESPORTS_CHALLENGES.map((ch) => esportsChallengeProgress(ch, system.state));

  const claimChallenge = (id) => {
    const ch = ESPORTS_CHALLENGES.find((c) => c.id === id);
    if (!ch) return { ok: false, reason: 'unknown-challenge', id };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed', id };
    const prog = esportsChallengeProgress(ch, system.state);
    if (!prog.done) return { ok: false, reason: 'not-done', id, have: prog.have, goal: prog.goal };
    claimed.push(id);
    system.state.challengesClaimed.push(id);
    system.gainXp(ch.xp);
    return { ok: true, id, xp: ch.xp };
  };

  const achievements = () => ESPORTS_ACHIEVEMENTS.map((a) => {
    const have = Math.floor(system.state[a.target] || 0);
    return { id: a.id, name: a.name, desc: a.desc, target: a.target, goal: a.goal, have, done: have >= a.goal };
  });

  const hireHelper = (id) => {
    const s = esportsStaffById(id);
    if (!s) return { ok: false, reason: 'unknown-staff', id };
    if (helpers.includes(id)) return { ok: false, reason: 'already-hired', id };
    helpers.push(id);
    return { ok: true, id, name: s.name, wage: s.wage };
  };

  const fireHelper = (id) => {
    const at = helpers.indexOf(id);
    if (at < 0) return { ok: false, reason: 'not-hired', id };
    helpers.splice(at, 1);
    return { ok: true, id };
  };

  const payWages = () => {
    const due = helpers.reduce((sum, hid) => {
      const s = esportsStaffById(hid);
      return s ? sum + s.wage : sum;
    }, 0);
    wagesPaid += due;
    system.state.wagesPaid += due;
    return { due, helpers: helpers.length, totalPaid: wagesPaid };
  };

  const helperBonus = (skill) => helpers.reduce((total, hid) => {
    const s = esportsStaffById(hid);
    return s && s.skill === skill ? total + s.bonus : total;
  }, 0);

  const donate = (amount) => {
    if (!amount || amount <= 0) return { ok: false, reason: 'bad-amount', amount };
    system.state.donations += amount;
    const rep = Math.floor(amount / 100);
    system.state.reputation += rep;
    return { ok: true, amount, reputation: rep };
  };

  const quickBoost = (id) => {
    if (!esportsItemById(id)) return { ok: false, reason: 'unknown-item', id };
    system.state.boosted[id] = true;
    return { ok: true, id, boosted: true };
  };

  const inventoryValue = () => esportsInventoryValue(system.state);

  const weeklyReport = () => ({
    goal: esportsWeeklyGoal(system.state),
    summary: esportsSummary(system.state),
    nextGoal: esportsNextGoal(system.state),
    efficiency: esportsEfficiency(system.state),
    profitPerRun: esportsProfitPerRun(system.state),
    records: esportsAllRecords(system.state),
  });

  const staffRoster = () => ESPORTS_STAFF.map((s) => ({
    id: s.id, name: s.name, wage: s.wage, skill: s.skill, hired: helpers.includes(s.id) || system.state.staff.includes(s.id),
  }));

  const upgradeCatalog = () => ESPORTS_UPGRADES.map((u) => ({
    id: u.id, name: u.name, cost: u.cost, effect: u.effect, desc: u.desc, owned: system.state.upgrades.includes(u.id),
  }));

  return {
    challenges,
    claimChallenge,
    achievements,
    hireHelper,
    fireHelper,
    payWages,
    helperBonus,
    donate,
    quickBoost,
    inventoryValue,
    weeklyReport,
    staffRoster,
    upgradeCatalog,
    get helpers() { return helpers.slice(); },
    get claimed() { return claimed.slice(); },
    get wagesPaid() { return wagesPaid; },
  };
}

export function createEsportsArenaMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  const setEvent = (id) => {
    const found = ESPORTS_MARKET_EVENTS.find((e) => e.id === id);
    if (!found) return { ok: false, reason: 'unknown-event', id };
    currentEvent = id;
    return { ok: true, event: id };
  };

  const setSeason = (id) => {
    const found = ESPORTS_SEASONS.find((x) => x.id === id);
    if (!found) return { ok: false, reason: 'unknown-season', id };
    currentSeason = id;
    return { ok: true, season: id };
  };

  const eventPrice = (itemId, basePrice) => Math.round(basePrice * esportsMarketEventMult(currentEvent, itemId) * esportsSeasonMult(currentSeason) * 10) / 10;

  const bulkDeal = (itemId, qty) => {
    const item = esportsItemById(itemId);
    if (!item) return { ok: false, reason: 'unknown-item', id: itemId };
    if (!qty || qty < 5) return { ok: false, reason: 'too-few', qty };
    const unit = eventPrice(itemId, item.price);
    const total = Math.round(unit * qty * 1.1 * 10) / 10;
    system.state.pending += total;
    system.state.dailyEarned += total;
    bulkTraded += qty;
    dealsClaimed += 1;
    return { ok: true, total, qty, unit, bonus: 'bulk +10%' };
  };

  const dailyDeals = () => TOURNAMENTS
    .filter((it) => esportsMarketEventMult(currentEvent, it.id) !== 1)
    .map((it) => ({ item: it.id, name: it.name, mult: esportsMarketEventMult(currentEvent, it.id), event: currentEvent }));

  const marketSummary = () => ({ event: currentEvent, season: currentSeason, dealsClaimed, bulkTraded, deals: dailyDeals() });

  const seasonPrices = () => TOURNAMENTS.map((it) => ({ id: it.id, name: it.name, price: eventPrice(it.id, it.price) }));

  return {
    setEvent,
    setSeason,
    eventPrice,
    bulkDeal,
    dailyDeals,
    marketSummary,
    seasonPrices,
    get event() { return currentEvent; },
    get season() { return currentSeason; },
  };
}
