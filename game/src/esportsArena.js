// Solara Nights - Esports Arena (Round 7 mega-rebuild, written fresh).
// The Neon Dome esports arena: book tournaments, fill the seats with
// screaming fans, and sell out the merch stand before the grand final.
// Casters shout, underdogs win, and a sold-out Sunday pays for the
// whole week. Sign sponsors, fix the uplink, and never let the
// stream crash during game five.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.
// Mechanic: venue.

export const TOURNAMENTS = [
  { id: 'rookie-rumble', name: 'Rookie Rumble', price: 800, rarity: 0.3, difficulty: 1, game: 'Street Rivals', teams: 8, duration: 2,
    desc: 'First-timers, shaky aim, enormous heart.' },
  { id: 'midnight-majors', name: 'Midnight Majors', price: 2500, rarity: 0.12, difficulty: 3, game: 'Neon Drift', teams: 16, duration: 3,
    desc: 'The lights go down and the crowd gets loud after midnight.' },
  { id: 'crown-clash', name: 'Crown Clash Invitational', price: 6000, rarity: 0.05, difficulty: 5, game: 'Apex Siege', teams: 32, duration: 4,
    desc: 'Thirty-two teams, one crown, zero mercy.' },
  { id: 'pixel-cup', name: 'Pixel Cup', price: 1200, rarity: 0.2, difficulty: 2, game: 'Retro Rumble', teams: 12, duration: 2,
    desc: 'Eight-bit heroes and controllers older than the players.' },
  { id: 'ocean-open', name: 'Ocean Open', price: 1800, rarity: 0.15, difficulty: 2, game: 'Tide Tactics', teams: 16, duration: 3,
    desc: 'Slow water, fast minds, and a very patient meta.' },
  { id: 'inferno-league', name: 'Inferno League Finals', price: 4500, rarity: 0.07, difficulty: 4, game: 'Ember Strike', teams: 24, duration: 4,
    desc: 'Fire on the screens, fire in the stands.' },
  { id: 'lan-legends', name: 'LAN Party Legends', price: 900, rarity: 0.25, difficulty: 1, game: 'Dungeon Dash', teams: 8, duration: 2,
    desc: 'Eight friends, one room, infinite snacks.' },
  { id: 'sky-series', name: 'Sky Series', price: 3200, rarity: 0.09, difficulty: 4, game: 'Cloud Racers', teams: 20, duration: 3,
    desc: 'Anti-gravity racing at speeds the eyes can barely follow.' },
  { id: 'grand-slam', name: 'Grand Slam Solara', price: 9000, rarity: 0.03, difficulty: 5, game: 'Apex Siege', teams: 64, duration: 5,
    desc: 'Sixty-four teams. The biggest stage Solara has ever built.' },
  { id: 'charity-showdown', name: 'Charity Showdown', price: 1500, rarity: 0.18, difficulty: 2, game: 'Street Rivals', teams: 16, duration: 2,
    desc: 'Every ticket feeds a family. The crowd plays along.' },
];

export const ESPORTS_UPGRADES = [
  { id: 'led-wall', name: 'LED Wall', cost: 300, effect: 'crowd-plus', desc: 'The whole arena sees every clutch play in giant light.' },
  { id: 'caster-booth', name: 'Caster Booth', cost: 450, effect: 'hype-plus', desc: 'Professional voices make every round sound legendary.' },
  { id: 'vip-lounge', name: 'VIP Lounge', cost: 650, effect: 'vip-plus', desc: 'Suites, snacks and soft seats for the big spenders.' },
  { id: 'fiber-uplink', name: 'Fiber Uplink', cost: 800, effect: 'stream-plus', desc: 'The stream never drops, not even in game five.' },
  { id: 'merch-stand', name: 'Merch Stand', cost: 500, effect: 'shop-plus', desc: 'Jerseys and foam fingers sell faster than tickets.' },
  { id: 'practice-rooms', name: 'Practice Rooms', cost: 1100, effect: 'teams-plus', desc: 'Teams warm up properly and play better for the crowd.' },
  { id: 'arena-roof', name: 'Arena Roof', cost: 1800, effect: 'weather-plus', desc: 'Rain or shine, the show goes on under cover.' },
  { id: 'mega-stage', name: 'Mega Stage', cost: 2600, effect: 'capacity-plus', desc: 'A stage so big it needs its own postcode.' },
];

export const ESPORTS_RANKS = [
  { level: 0, name: 'Open Lobby', xp: 0, perk: 'Tournaments pay base rate.' },
  { level: 1, name: 'Ranked Host', xp: 150, perk: '+5% prices, teams answer your calls.' },
  { level: 2, name: 'Arena Regular', xp: 400, perk: '+10% prices, fans buy season passes.' },
  { level: 3, name: 'Major Organizer', xp: 800, perk: '+15% prices, sponsors call you first.' },
  { level: 4, name: 'Esports Legend', xp: 1500, perk: '+20% prices, the Dome is yours.' },
];

export const ESPORTS_STAFF = [
  { id: 'caster-kai', name: 'Kai the Caster', wage: 40, skill: 'hype', bonus: 0.2, desc: 'A voice that turns a 1v1 into a war story.' },
  { id: 'ref-uma', name: 'Uma the Referee', wage: 35, skill: 'fair', bonus: 0.15, desc: 'Calm, exact, and impossible to argue with.' },
  { id: 'tech-rio', name: 'Rio the Tech', wage: 45, skill: 'tech', bonus: 0.2, desc: 'Fixes the uplink before anyone notices it broke.' },
  { id: 'host-lena', name: 'Lena the Host', wage: 30, skill: 'host', bonus: 0.15, desc: 'Keeps the crowd loud between matches.' },
];

export const ESPORTS_DAILY_EVENTS = [
  { id: 'sponsor-call', name: 'Sponsor Call', effect: 'earn', amount: 300,
    text: 'An energy drink brand wants its logo on the stage.' },
  { id: 'stream-crash', name: 'Stream Crash', effect: 'cost', amount: 150,
    text: 'The stream dies mid-final. Tech overtime costs money.' },
  { id: 'sellout-crowd', name: 'Sellout Crowd', effect: 'visitors', amount: 80,
    text: 'Every seat sold before the doors open.' },
  { id: 'player-no-show', name: 'Player No-Show', effect: 'rep', amount: -1,
    text: 'A star player misses the bus. The crowd grumbles.' },
  { id: 'energy-deal', name: 'Energy Drink Deal', effect: 'earn', amount: 220,
    text: 'Free drinks for the crowd, paid for by the brand.' },
  { id: 'patch-day', name: 'Patch Day Chaos', effect: 'cost', amount: 90,
    text: 'A game update breaks the meta hours before play.' },
  { id: 'fan-meetup', name: 'Fan Meetup', effect: 'visitors', amount: 50,
    text: 'Fans queue for autographs and buy everything in sight.' },
  { id: 'qualifier-surge', name: 'Qualifier Surge', effect: 'visitors', amount: 65,
    text: 'Open qualifiers flood the arena with hopefuls.' },
  { id: 'trophy-rush', name: 'Trophy Rush', effect: 'earn', amount: 400,
    text: 'A local team reaches the final. The city goes wild.' },
  { id: 'quiet-tuesday', name: 'Quiet Tuesday', effect: 'xp', amount: 15,
    text: 'An empty Tuesday. Time to polish the stage.' },
];

export const ESPORTS_TIPS = [
  { id: 'sellout-math', name: 'Sellout Math', text: 'A full house on a small tournament beats a half-empty major.' },
  { id: 'uplink-first', name: 'Uplink First', text: 'Buy the fiber uplink before the LED wall. A crashed stream costs more.' },
  { id: 'caster-magic', name: 'Caster Magic', text: 'A great caster makes a boring match feel like a final.' },
  { id: 'merch-timing', name: 'Merch Timing', text: 'Open the merch stand the hour the final starts, not before.' },
  { id: 'sponsor-season', name: 'Sponsor Season', text: 'Sponsors pay most at the start of a split. Sign them then.' },
  { id: 'underdog-story', name: 'Underdog Story', text: 'Crowds love an underdog run. Promote the rookies.' },
  { id: 'sunday-final', name: 'Sunday Final', text: 'Save your biggest tournament for Sunday evening.' },
  { id: 'patch-watch', name: 'Patch Watch', text: 'Check patch notes before booking. A broken meta empties seats.' },
];

export const ESPORTS_CHALLENGES = [
  { id: 'first-steps', name: 'First Steps', target: 'runsDone', goal: 3, xp: 40, desc: 'Finish 3 arena runs.' },
  { id: 'regular', name: 'Regular', target: 'runsDone', goal: 10, xp: 90, desc: 'Finish 10 arena runs.' },
  { id: 'collector', name: 'Collector', target: 'itemsOwned', goal: 4, xp: 100, desc: 'Own 4 different arena entries.' },
  { id: 'big-earner', name: 'Big Earner', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from the arena business.' },
  { id: 'crowd-favourite', name: 'Crowd Favourite', target: 'visitors', goal: 200, xp: 110, desc: 'Draw 200 visitors through the arena business.' },
  { id: 'respected', name: 'Respected Name', target: 'reputation', goal: 10, xp: 100, desc: 'Reach 10 reputation in the arena business.' },
  { id: 'best-day', name: 'Best Day Ever', target: 'bestRun', goal: 400, xp: 130, desc: 'Score a single run worth $400 or more.' },
  { id: 'fully-kitted', name: 'Fully Kitted', target: 'upgradesOwned', goal: 6, xp: 150, desc: 'Own 6 upgrades for the arena business.' },
];

export const ESPORTS_ACHIEVEMENTS = [
  { id: 'first-run', name: 'First Run', target: 'runsDone', goal: 1, desc: 'Finish your first arena run.' },
  { id: 'first-sale', name: 'First Payday', target: 'earned', goal: 1, desc: 'Collect your first dollar of arena earnings.' },
  { id: 'ten-runs', name: 'Ten Runs Deep', target: 'runsDone', goal: 10, desc: 'Finish 10 arena runs.' },
  { id: 'thousand-club', name: 'Thousand Club', target: 'earned', goal: 1000, desc: 'Earn $1,000 in total from the arena business.' },
  { id: 'five-hundred-faces', name: 'Five Hundred Faces', target: 'visitors', goal: 500, desc: 'Welcome 500 visitors through the arena business.' },
  { id: 'rank-three', name: 'Rising Star', target: 'rank', goal: 3, desc: 'Reach rank 3 in the arena business.' },
  { id: 'full-shelf', name: 'Full Shelf', target: 'itemsOwned', goal: 8, desc: 'Own 8 different arena entries at once.' },
  { id: 'streak-five', name: 'On A Roll', target: 'bestStreak', goal: 5, desc: 'Build a 5-run streak without a failed arena run.' },
];

export const ESPORTS_LEADERBOARD = [
  { name: 'Neon Dome', score: 4200, desc: 'The original arena across the bay.' },
  { name: 'Pixel Palace', score: 3100, desc: 'Retro games, huge crowds, sticky floors.' },
  { name: 'The Bunker Arena', score: 2400, desc: 'Underground, loud, and always sold out.' },
  { name: 'Harbor Esports Hall', score: 1500, desc: 'Big screens, sea air, serious money.' },
  { name: 'You', score: 0, desc: 'Climbing the arena ladder.' },
];

export const ESPORTS_RECORDS = [
  { id: 'biggest-run', name: 'Biggest Run', stat: 'bestRun', unit: '$', desc: 'Best single-run payout.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money earned overall.' },
  { id: 'most-visitors', name: 'Most Visitors', stat: 'visitors', unit: 'people', desc: 'Most visitors welcomed.' },
  { id: 'most-runs', name: 'Most Runs', stat: 'runsDone', unit: 'runs', desc: 'Most runs finished.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'runs', desc: 'Longest run streak.' },
];

export const ESPORTS_MARKET_EVENTS = [
  { id: 'rookie-rumble-surge', name: 'Rookie Rumble Surge', item: 'rookie-rumble', mult: 1.35, desc: 'Demand for Rookie Rumble swings hard this week.' },
  { id: 'midnight-majors-surge', name: 'Midnight Majors Surge', item: 'midnight-majors', mult: 0.7, desc: 'Demand for Midnight Majors swings hard this week.' },
  { id: 'crown-clash-surge', name: 'Crown Clash Invitational Surge', item: 'crown-clash', mult: 1.35, desc: 'Demand for Crown Clash Invitational swings hard this week.' },
  { id: 'pixel-cup-surge', name: 'Pixel Cup Surge', item: 'pixel-cup', mult: 0.7, desc: 'Demand for Pixel Cup swings hard this week.' },
  { id: 'ocean-open-surge', name: 'Ocean Open Surge', item: 'ocean-open', mult: 1.35, desc: 'Demand for Ocean Open swings hard this week.' },
  { id: 'inferno-league-surge', name: 'Inferno League Finals Surge', item: 'inferno-league', mult: 0.7, desc: 'Demand for Inferno League Finals swings hard this week.' },
  { id: 'lan-legends-surge', name: 'LAN Party Legends Surge', item: 'lan-legends', mult: 1.35, desc: 'Demand for LAN Party Legends swings hard this week.' },
  { id: 'sky-series-surge', name: 'Sky Series Surge', item: 'sky-series', mult: 0.7, desc: 'Demand for Sky Series swings hard this week.' },
  { id: 'grand-slam-surge', name: 'Grand Slam Solara Surge', item: 'grand-slam', mult: 1.35, desc: 'Demand for Grand Slam Solara swings hard this week.' },
  { id: 'charity-showdown-surge', name: 'Charity Showdown Surge', item: 'charity-showdown', mult: 0.7, desc: 'Demand for Charity Showdown swings hard this week.' },
];

export const ESPORTS_SEASONS = [
  { id: 'spring-split', name: 'Spring Split', mult: 1.1, desc: 'New season, new rosters, full houses.' },
  { id: 'summer-smash', name: 'Summer Smash', mult: 1.2, desc: 'School is out and the arena never sleeps.' },
  { id: 'autumn-circuit', name: 'Autumn Circuit', mult: 1.05, desc: 'Playoffs season. Every match matters.' },
  { id: 'winter-finals', name: 'Winter Finals', mult: 1.15, desc: 'The grand final week. The city stops to watch.' },
];

export const ESPORTS_FACTS = [
  { id: 'fact-rookie-rumble', text: 'Rookie Rumble: First-timers, shaky aim, enormous heart.' },
  { id: 'fact-midnight-majors', text: 'Midnight Majors: The lights go down and the crowd gets loud after midnight.' },
  { id: 'fact-crown-clash', text: 'Crown Clash Invitational: Thirty-two teams, one crown, zero mercy.' },
  { id: 'fact-pixel-cup', text: 'Pixel Cup: Eight-bit heroes and controllers older than the players.' },
  { id: 'fact-ocean-open', text: 'Ocean Open: Slow water, fast minds, and a very patient meta.' },
  { id: 'fact-inferno-league', text: 'Inferno League Finals: Fire on the screens, fire in the stands.' },
  { id: 'fact-lan-legends', text: 'LAN Party Legends: Eight friends, one room, infinite snacks.' },
  { id: 'fact-sky-series', text: 'Sky Series: Anti-gravity racing at speeds the eyes can barely follow.' },
  { id: 'fact-grand-slam', text: 'Grand Slam Solara: Sixty-four teams. The biggest stage Solara has ever built.' },
  { id: 'fact-charity-showdown', text: 'Charity Showdown: Every ticket feeds a family. The crowd plays along.' },
  { id: 'fact-general-0', text: 'The best arena operators in Solara check their prices every morning before opening.' },
  { id: 'fact-general-1', text: 'Regulars remember how you treated them yesterday more than what you charged.' },
  { id: 'fact-general-2', text: 'A rainy day changes everything: some crowds grow, others vanish entirely.' },
  { id: 'fact-general-3', text: 'Upgrades pay for themselves if you run the business every single day.' },
  { id: 'fact-general-4', text: 'Reputation is slow to build and fast to lose. Guard it.' },
  { id: 'fact-general-5', text: 'The first run of the day is always the cheapest lesson.' },
  { id: 'fact-general-6', text: 'Staff with the right skill quietly add money to every run.' },
  { id: 'fact-general-7', text: 'A five-run streak without a failure is worth more than any single big payday.' },
  { id: 'fact-general-8', text: 'Prices drift daily. Selling on a surge day can double a quiet week.' },
  { id: 'fact-general-9', text: 'Every rival in town started with one room, one stall, or one microphone.' },
];

export const ESPORTS_NPC_LINES = [
  { id: 'npc-0', text: 'I came all the way across town for the Rookie Rumble. Worth it.' },
  { id: 'npc-1', text: 'My cousin runs a arena place too, but yours is better. Do not tell him.' },
  { id: 'npc-2', text: 'Is the Crown Clash Invitational really as good as everyone says? I am about to find out.' },
  { id: 'npc-3', text: 'I bring my kids here every weekend. They ask for the Midnight Majors by name.' },
  { id: 'npc-4', text: 'You should put the Pixel Cup on a poster. People would come just for that.' },
  { id: 'npc-5', text: 'I heard the Ocean Open here is the best in Solara. The rumour was right.' },
  { id: 'npc-6', text: 'Quiet day today. The Inferno League Finals still made my afternoon.' },
  { id: 'npc-7', text: 'I saved up for weeks to try the LAN Party Legends. No regrets.' },
  { id: 'npc-8', text: 'The staff told me about the Sky Series. Now I tell everyone I meet.' },
  { id: 'npc-9', text: 'I have been to every arena spot in the city. This one wins.' },
  { id: 'npc-10', text: 'One day I want to run a arena place of my own. I am taking notes.' },
  { id: 'npc-11', text: 'The Grand Slam Solara is the reason my friends finally believe my stories.' },
  { id: 'npc-12', text: 'Do you ever get tired of the Rookie Rumble? I never would.' },
  { id: 'npc-13', text: 'I wrote a review about the Midnight Majors last night. Five stars, obviously.' },
  { id: 'npc-14', text: 'My grandmother loved the Crown Clash Invitational. I come here to remember her.' },
  { id: 'npc-15', text: 'If the Charity Showdown gets any better, the whole city will queue around the block.' },
];

export const ESPORTS_GUIDE = [
  { id: 'guide-0', text: 'Open your first arena entry: it costs cash, but it unlocks everything else.' },
  { id: 'guide-1', text: 'Run it once and watch the timer. A finished run parks its payout in the till.' },
  { id: 'guide-2', text: 'Collect the till before you start the next run, or the money just sits there.' },
  { id: 'guide-3', text: 'Check the price board each morning: drift changes what everything is worth.' },
  { id: 'guide-4', text: 'Buy the cheapest upgrade first. Small edges compound faster than big splurges.' },
  { id: 'guide-5', text: 'Hire one staff member with a skill that matches what you do most.' },
  { id: 'guide-6', text: 'Take the daily event as it comes. Some days the city hands you money.' },
  { id: 'guide-7', text: 'Level up your best entry instead of opening a weak new one.' },
  { id: 'guide-8', text: 'A boosted entry pays about a third more on its next run. Boost before big days.' },
  { id: 'guide-9', text: 'Keep a cash buffer. A surprise repair bill on an empty wallet ends runs.' },
  { id: 'guide-10', text: 'Chase the weekly goal: five runs, $500 earned, one hundred visitors.' },
  { id: 'guide-11', text: 'When a run finishes, the streak grows. Protect the streak.' },
  { id: 'guide-12', text: 'Sell an entry you never run. Half its price back beats dust on a shelf.' },
  { id: 'guide-13', text: 'Reputation opens doors: better events, better staff, better prices.' },
  { id: 'guide-14', text: 'Read the leaderboard sometimes. The rivals ahead of you started exactly where you are.' },
  { id: 'guide-15', text: 'Come back tomorrow. Drift resets, events refresh, and the city forgets yesterday.' },
];

export function esportsRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < ESPORTS_RANKS.length; i++) {
    if (xp >= ESPORTS_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function esportsItemById(id) {
  return TOURNAMENTS.find((x) => x.id === id) || null;
}

export function esportsPriceFor(id, drift, rank, upgrades) {
  const item = TOURNAMENTS.find((x) => x.id === id);
  if (!item) return 0;
  let price = item.price;
  price *= 1 + (drift[id] || 0);
  price *= 1 + rank * 0.05;
  if (upgrades && upgrades.length >= 3) price *= 1.1;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function esportsCapacityFor(rank, upgrades) {
  let cap = 3 + rank;
  if (upgrades && upgrades.indexOf('mega-stage') >= 0) cap += 2;
  return cap;
}

export function esportsPayoutFor(item, rank, upgrades, weather, boosted) {
  let mult = 0.6 + rank * 0.1 + (boosted ? 0.3 : 0);
  if (weather === 'rain') mult *= 1.0;
  if (weather === 'sunny') mult *= 1.1;
  if (weather === 'storm') mult *= 0.7;
  if (upgrades && upgrades.length >= 4) mult *= 1.15;
  return Math.max(5, Math.round(item.price * mult));
}

export function esportsCrowdFor(item, rank, weather) {
  let crowd = 10 + item.difficulty * 8 + rank * 5;
  if (weather === 'rain') crowd = Math.round(crowd * 1.0);
  if (weather === 'sunny') crowd = Math.round(crowd * 1.1);
  if (weather === 'storm') crowd = Math.round(crowd * 0.5);
  return Math.max(1, crowd);
}

export function esportsUpgradeById(id) {
  return ESPORTS_UPGRADES.find((x) => x.id === id) || null;
}

export function esportsStaffById(id) {
  return ESPORTS_STAFF.find((x) => x.id === id) || null;
}

export function esportsEventById(id) {
  return ESPORTS_DAILY_EVENTS.find((x) => x.id === id) || null;
}

export function esportsTipFor(day) {
  return ESPORTS_TIPS[day % ESPORTS_TIPS.length];
}

export function esportsFactFor(day) {
  return ESPORTS_FACTS[day % ESPORTS_FACTS.length];
}

export function esportsNpcLineFor(day) {
  return ESPORTS_NPC_LINES[day % ESPORTS_NPC_LINES.length];
}

export function esportsGuideStep(step) {
  return ESPORTS_GUIDE[step] || null;
}

export function esportsSeasonMult(seasonId) {
  const s = ESPORTS_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function esportsMarketEventMult(eventId, itemId) {
  const ev = ESPORTS_MARKET_EVENTS.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.item === itemId ? ev.mult : 1;
}

export function esportsWeeklyGoal(state) {
  const goal = { runs: 5, earned: 500, visitors: 100 };
  const runsDone = state.runsDone >= goal.runs;
  const earnedDone = state.earned >= goal.earned;
  const visitorsDone = state.visitors >= goal.visitors;
  return {
    runs: { have: state.runsDone, goal: goal.runs, done: runsDone },
    earned: { have: Math.round(state.earned), goal: goal.earned, done: earnedDone },
    visitors: { have: state.visitors, goal: goal.visitors, done: visitorsDone },
    allDone: runsDone && earnedDone && visitorsDone,
  };
}

export function esportsEfficiency(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 100;
  return Math.round((state.runsDone / total) * 100);
}

export function esportsProfitPerRun(state) {
  if (state.runsDone === 0) return 0;
  return Math.round((state.earned / state.runsDone) * 10) / 10;
}

export function esportsInventoryValue(state) {
  let total = 0;
  for (const id of Object.keys(state.owned || {})) {
    const item = TOURNAMENTS.find((x) => x.id === id);
    if (item) total += item.price * (state.levels[id] || 1);
  }
  return Math.round(total * 10) / 10;
}

export function esportsSummary(state) {
  const rankName = ESPORTS_RANKS[state.rank] ? ESPORTS_RANKS[state.rank].name : 'Unknown';
  return 'Esports Arena ' + rankName + ': ' + state.runsDone + ' runs, '
    + state.itemsOwned + ' entries, $' + Math.round(state.earned)
    + ' earned, ' + state.visitors + ' visitors.';
}

export function esportsNextGoal(state) {
  if (state.itemsOwned < 1) return 'Open your first entry.';
  if (state.runsDone < 5) return 'Finish 5 runs.';
  if (state.earned < 500) return 'Earn $500 in total.';
  if (state.rank < 2) return 'Reach rank ' + ESPORTS_RANKS[2].name + '.';
  if (state.upgradesOwned < 4) return 'Own 4 upgrades.';
  return 'Become an Esports Arena legend.';
}

export function esportsRecordFor(recordId, state) {
  const r = ESPORTS_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function esportsAllRecords(state) {
  return ESPORTS_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function esportsLeaderboardWith(playerScore) {
  const board = ESPORTS_LEADERBOARD.map((e) => ({
    name: e.name, score: e.name === 'You' ? playerScore : e.score, desc: e.desc,
  }));
  board.sort((a, b) => b.score - a.score);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, score: e.score, desc: e.desc }));
}

export function esportsSeasonReport(state, seasonId) {
  const mult = esportsSeasonMult(seasonId);
  return TOURNAMENTS.map((item) => ({
    id: item.id,
    name: item.name,
    basePrice: item.price,
    seasonPrice: Math.round(item.price * mult * 10) / 10,
    owned: !!state.owned[item.id],
    level: state.levels[item.id] || 0,
  }));
}

export function esportsChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return {
    id: challenge.id, name: challenge.name, have: Math.floor(v),
    goal: challenge.goal, done: v >= challenge.goal, xp: challenge.xp,
  };
}

export function esportsBestEntryFor(rank) {
  let best = null;
  let bestScore = -1;
  for (const item of TOURNAMENTS) {
    if (item.difficulty > rank + 2) continue;
    const score = item.price * (1 + item.rarity * 2) / item.difficulty;
    if (score > bestScore) { bestScore = score; best = item; }
  }
  return best;
}

export function createEsportsArenaSystem(ctx) {
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
  const MECH = 'venue';

  const state = {
    xp: 0,
    rank: 0,
    runsDone: 0,
    itemsOwned: 0,
    visitors: 0,
    earned: 0,
    spent: 0,
    reputation: 0,
    heat: 0,
    upgrades: [],
    upgradesOwned: 0,
    staff: [],
    staffHired: 0,
    owned: {},
    levels: {},
    boosted: {},
    active: null,
    activeId: null,
    activeTimer: 0,
    activeBase: 0,
    pending: 0,
    dailyEarned: 0,
    dailyVisitors: 0,
    bestRun: 0,
    bestRunName: null,
    streak: 0,
    bestStreak: 0,
    failures: 0,
    donations: 0,
    challengesClaimed: [],
    lastDay: 1,
    drift: {},
    holdings: {},
    prices: {},
    viewers: 0,
    followers: 0,
    subs: 0,
    peakViewers: 0,
    streamMinutes: 0,
    support: 50,
    volunteers: 0,
    donors: 0,
    polls: 50,
    occupancy: 0,
    attendanceToday: 0,
    dividendsPaid: 0,
    wagesPaid: 0,
  };
  for (const item of TOURNAMENTS) {
    state.drift[item.id] = 0;
    state.prices[item.id] = item.price;
  }

  function refreshRank() {
    const r = esportsRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log('Esports Arena rank up: ' + ESPORTS_RANKS[r].name + ' - ' + ESPORTS_RANKS[r].perk);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function weatherCond() {
    const w = getWeather();
    if (w && typeof w.condition === 'string') return w.condition;
    return 'clear';
  }

  function staffBonus(skill) {
    let bonus = 0;
    for (const id of state.staff) {
      const s = ESPORTS_STAFF.find((x) => x.id === id);
      if (s && s.skill === skill) bonus += s.bonus;
    }
    return bonus;
  }

  function driftPrices() {
    for (const item of TOURNAMENTS) {
      const roll = rng();
      if (roll < 0.35) {
        const change = Math.round((rng() * 0.24 - 0.12) * 100) / 100;
        state.drift[item.id] = Math.round((state.drift[item.id] + change) * 100) / 100;
        state.prices[item.id] = Math.max(1, Math.round(item.price * (1 + state.drift[item.id]) * 10) / 10);
      }
    }
  }

  function bookTournament(id) {
    const item = TOURNAMENTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-tournament' };
    if (state.owned[id]) return { ok: false, reason: 'already-owned' };
    if (state.itemsOwned >= esportsCapacityFor(state.rank, state.upgrades)) {
      return { ok: false, reason: 'capacity-full', cap: esportsCapacityFor(state.rank, state.upgrades) };
    }
    if (state.rank < Math.max(0, item.difficulty - 2)) {
      return { ok: false, reason: 'rank-too-low', need: Math.max(0, item.difficulty - 2) };
    }
    const cost = esportsPriceFor(id, state.drift, 0, []);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned[id] = 1;
    state.levels[id] = 1;
    state.itemsOwned += 1;
    gainXp(10);
    log('Booked ' + item.name + ' for $' + cost + '. Welcome to the Esports Arena business.');
    return { ok: true, id, cost, name: item.name };
  }

  function runTournament(id) {
    const item = TOURNAMENTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-tournament' };
    if (state.active) return { ok: false, reason: 'already-running', active: state.activeId };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned' };
    state.active = 'run';
    state.activeId = id;
    state.activeTimer = 30 + item.difficulty * 10;
    state.activeBase = item.price;
    log('Tournament live: ' + item.name + ' is under way.');
    return { ok: true, id, seconds: state.activeTimer };
  }

  function settleRun() {
    const id = state.activeId;
    const item = TOURNAMENTS.find((x) => x.id === id);
    state.active = null;
    state.activeId = null;
    state.activeTimer = 0;
    if (!item) return;
    const cond = weatherCond();
    const boosted = !!state.boosted[id];
    const payout = esportsPayoutFor(item, state.rank, state.upgrades, cond, boosted);
    const crowd = esportsCrowdFor(item, state.rank, cond);
    state.visitors += crowd;
    state.dailyVisitors += crowd;
    state.attendanceToday += crowd;
    state.pending += payout;
    state.dailyEarned += payout;
    state.runsDone += 1;
    if (payout > state.bestRun) { state.bestRun = payout; state.bestRunName = item.name; }
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.boosted[id] = false;
    gainXp(15 + item.difficulty * 3);
    log('Tournament over at ' + item.name + ': ' + crowd + ' visitors, $' + payout + ' in the till.');
  }

  function collectTicketSales() {
    if (state.pending <= 0) return { ok: false, reason: 'nothing-pending' };
    const amount = state.pending;
    state.pending = 0;
    state.earned += amount;
    addCash(amount);
    log('Collected $' + amount + ' from the till.');
    return { ok: true, amount };
  }

  function sellMerch(id, qty) {
    const item = TOURNAMENTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-tournament' };
    void qty;
    if (!state.owned[id]) return { ok: false, reason: 'not-owned' };
    const refund = Math.round(item.price * 0.5);
    delete state.owned[id];
    delete state.levels[id];
    state.itemsOwned -= 1;
    addCash(refund);
    state.earned += refund;
    gainXp(5);
    log('Sold off ' + item.name + ' for $' + refund + '. Half price, clean break.');
    return { ok: true, total: refund, qty: 1 };
  }

  function signSponsor(id) {
    const item = TOURNAMENTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-tournament' };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned' };
    if (getCash() < 40) return { ok: false, reason: 'not-enough-cash', cost: 40 };
    addCash(-40);
    state.spent += 40;
    state.boosted[id] = true;
    state.reputation += 1;
    gainXp(10);
    log('Sponsor signed for ' + item.name + ' is boosted for its next run.');
    return { ok: true, id, boosted: true };
  }

  function buyUpgrade(id) {
    const u = ESPORTS_UPGRADES.find((x) => x.id === id);
    if (!u) return { ok: false, reason: 'no-such-upgrade' };
    if (state.upgrades.indexOf(id) >= 0) return { ok: false, reason: 'already-owned' };
    if (getCash() < u.cost) return { ok: false, reason: 'not-enough-cash', cost: u.cost };
    addCash(-u.cost);
    state.spent += u.cost;
    state.upgrades.push(id);
    state.upgradesOwned += 1;
    gainXp(20);
    log('Bought upgrade: ' + u.name + ' for $' + u.cost + '. ' + u.desc);
    return { ok: true, id, name: u.name };
  }

  function hireStaff(id) {
    const s = ESPORTS_STAFF.find((x) => x.id === id);
    if (!s) return { ok: false, reason: 'no-such-staff' };
    if (state.staff.indexOf(id) >= 0) return { ok: false, reason: 'already-hired' };
    if (getCash() < s.wage) return { ok: false, reason: 'not-enough-cash', cost: s.wage };
    addCash(-s.wage);
    state.spent += s.wage;
    state.staff.push(id);
    state.staffHired += 1;
    gainXp(10);
    log('Hired ' + s.name + ' for $' + s.wage + ' signing fee.');
    return { ok: true, id, name: s.name, wage: s.wage };
  }

  function fireStaff(id) {
    const i = state.staff.indexOf(id);
    if (i < 0) return { ok: false, reason: 'not-hired' };
    state.staff.splice(i, 1);
    log('Let go of ' + id + '. The team is smaller now.');
    return { ok: true, id };
  }

  function upgradeItem(id) {
    const item = TOURNAMENTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-tournament' };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned' };
    const lvl = state.levels[id] || 1;
    if (lvl >= 5) return { ok: false, reason: 'max-level' };
    const cost = Math.round(item.price * 0.4 * lvl);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.levels[id] = lvl + 1;
    gainXp(15);
    log(item.name + ' upgraded to level ' + (lvl + 1) + ' for $' + cost + '.');
    return { ok: true, id, level: lvl + 1 };
  }

  function priceBoard() {
    return TOURNAMENTS.map((item) => ({
      id: item.id,
      name: item.name,
      price: esportsPriceFor(item.id, state.drift, state.rank, state.upgrades),
      basePrice: item.price,
      drift: state.drift[item.id],
      owned: !!state.owned[item.id],
      level: state.levels[item.id] || 0,
      difficulty: item.difficulty,
      rarity: item.rarity,
    }));
  }

  function listItems() {
    return TOURNAMENTS.map((item) => ({
      id: item.id, name: item.name, price: item.price,
      difficulty: item.difficulty, rarity: item.rarity, desc: item.desc,
      owned: !!state.owned[item.id],
    }));
  }

  function info(id) {
    const item = TOURNAMENTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-tournament' };
    return {
      ok: true, item,
      owned: !!state.owned[id],
      level: state.levels[id] || 0,
      price: esportsPriceFor(id, state.drift, state.rank, state.upgrades),
      holdings: state.holdings[id] || 0,
    };
  }

  function dailyEvent() {
    const idx = Math.floor(rng() * ESPORTS_DAILY_EVENTS.length);
    const ev = ESPORTS_DAILY_EVENTS[idx];
    if (!ev) return { event: 'none' };
    if (ev.effect === 'earn') {
      state.pending += ev.amount;
      log(ev.text);
    } else if (ev.effect === 'cost') {
      if (getCash() >= ev.amount) {
        addCash(-ev.amount);
        state.spent += ev.amount;
      }
      log(ev.text);
    } else if (ev.effect === 'rep') {
      state.reputation += ev.amount;
      log(ev.text);
    } else if (ev.effect === 'visitors') {
      state.visitors += ev.amount;
      state.dailyVisitors += ev.amount;
      log(ev.text);
    } else if (ev.effect === 'heat') {
      state.heat += ev.amount;
      addHeat(ev.amount);
      log(ev.text);
    } else if (ev.effect === 'xp') {
      gainXp(ev.amount);
      log(ev.text);
    } else {
      log(ev.text);
    }
    return { event: ev.id, name: ev.name, effect: ev.effect, amount: ev.amount };
  }

  function tick(dt) {
    if (!state.active) return;
    state.activeTimer -= dt;
    if (state.activeTimer <= 0) settleRun();
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    driftPrices();
    state.dailyEarned = 0;
    state.dailyVisitors = 0;
    state.attendanceToday = 0;
    state.occupancy = 0;
    dailyEvent();
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(d) {
    if (!d || typeof d !== 'object') return;
    for (const k of Object.keys(state)) {
      if (d[k] !== undefined) state[k] = d[k];
    }
    for (const item of TOURNAMENTS) {
      if (state.drift[item.id] === undefined) state.drift[item.id] = 0;
      if (state.prices[item.id] === undefined) state.prices[item.id] = item.price;
      if (state.holdings[item.id] === undefined) state.holdings[item.id] = 0;
    }
    if (!state.owned) state.owned = {};
    if (!state.levels) state.levels = {};
    if (!state.boosted) state.boosted = {};
    refreshRank();
  }

  function stats() {
    let holdingsCount = 0;
    for (const k of Object.keys(state.holdings)) holdingsCount += state.holdings[k];
    return {
      name: 'Esports Arena',
      mechanic: MECH,
      rank: ESPORTS_RANKS[state.rank] ? ESPORTS_RANKS[state.rank].name : 'Unknown',
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
  }

  function hudLine() {
    if (state.active) {
      return 'Esports Arena: running ' + state.activeId + ' - ' + Math.max(0, Math.ceil(state.activeTimer)) + 's left';
    }
    if (state.pending > 0) {
      return 'Esports Arena: $' + Math.round(state.pending) + ' waiting in the till';
    }
    if (state.itemsOwned > 0) {
      return 'Esports Arena: ' + state.itemsOwned + ' entries, $' + Math.round(state.earned) + ' earned';
    }
    return '';
  }

  function interact(action, a, b) {
    if (!action || action === 'status') return { ok: true, stats: stats(), hint: 'open <tournament> to book it, run <tournament> to play it, collect to empty the till' };
    if (action === 'open') return bookTournament(a);
    if (action === 'run') return runTournament(a);
    if (action === 'collect') return collectTicketSales();
    if (action === 'sell') return sellMerch(a, b);
    if (action === 'upgrade') return buyUpgrade(a);
    if (action === 'levelup') return upgradeItem(a);
    if (action === 'hire') return hireStaff(a);
    if (action === 'fire') return fireStaff(a);
    if (action === 'special') return signSponsor(a, b);
    if (action === 'info') return info(a);
    if (action === 'prices') return { ok: true, prices: priceBoard() };
    if (action === 'list') return { ok: true, items: listItems() };
    if (action === 'event') return dailyEvent();
    return { ok: false, reason: 'unknown-action', action };
  }

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
    upgrade: buyUpgrade,
    hire: hireStaff,
  };
}

export function createEsportsArenaExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function challenges() {
    return ESPORTS_CHALLENGES.map((ch) => esportsChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = ESPORTS_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.indexOf(id) >= 0) return { ok: false, reason: 'already-claimed' };
    const p = esportsChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    system.state.challengesClaimed.push(id);
    if (typeof system.gainXp === 'function') system.gainXp(ch.xp);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return ESPORTS_ACHIEVEMENTS.map((a) => ({
      id: a.id,
      name: a.name,
      desc: a.desc,
      target: a.target,
      goal: a.goal,
      have: Math.floor(system.state[a.target] || 0),
      done: (system.state[a.target] || 0) >= a.goal,
    }));
  }

  function hireHelper(id) {
    const h = ESPORTS_STAFF.find((x) => x.id === id);
    if (!h) return { ok: false, reason: 'no-such-helper' };
    if (helpers.indexOf(id) >= 0) return { ok: false, reason: 'already-hired' };
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
      const h = ESPORTS_STAFF.find((x) => x.id === id);
      if (h) due += h.wage;
    }
    helperWagesPaid += due;
    system.state.wagesPaid += due;
    return { due, helpers: helpers.slice(), totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    let bonus = 0;
    for (const id of helpers) {
      const h = ESPORTS_STAFF.find((x) => x.id === id);
      if (h && h.skill === skill) bonus += h.bonus;
    }
    return bonus;
  }

  function donate(amount) {
    if (!amount || amount <= 0) return { ok: false, reason: 'bad-amount' };
    system.state.donations += amount;
    system.state.reputation += Math.floor(amount / 100);
    return { ok: true, amount, reputation: system.state.reputation };
  }

  function quickBoost(id) {
    const item = TOURNAMENTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-tournament' };
    system.state.boosted[id] = true;
    return { ok: true, id, boosted: true };
  }

  function inventoryValue() {
    return esportsInventoryValue(system.state);
  }

  function weeklyReport() {
    return {
      goal: esportsWeeklyGoal(system.state),
      summary: esportsSummary(system.state),
      nextGoal: esportsNextGoal(system.state),
      efficiency: esportsEfficiency(system.state),
      profitPerRun: esportsProfitPerRun(system.state),
      records: esportsAllRecords(system.state),
    };
  }

  function staffRoster() {
    return ESPORTS_STAFF.map((s) => ({
      id: s.id, name: s.name, wage: s.wage, skill: s.skill,
      hired: helpers.indexOf(s.id) >= 0 || system.state.staff.indexOf(s.id) >= 0,
    }));
  }

  function upgradeCatalog() {
    return ESPORTS_UPGRADES.map((u) => ({
      id: u.id, name: u.name, cost: u.cost, effect: u.effect, desc: u.desc,
      owned: system.state.upgrades.indexOf(u.id) >= 0,
    }));
  }

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
    get wagesPaid() { return helperWagesPaid; },
  };
}

export function createEsportsArenaMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  function setEvent(eventId) {
    const ev = ESPORTS_MARKET_EVENTS.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = ESPORTS_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(itemId, basePrice) {
    let price = basePrice;
    price *= esportsMarketEventMult(currentEvent, itemId);
    price *= esportsSeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(itemId, qty) {
    const item = TOURNAMENTS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-tournament' };
    if (!qty || qty < 5) return { ok: false, reason: 'need-5-plus', qty: qty || 0 };
    const unit = eventPrice(itemId, item.price);
    const total = Math.round(unit * qty * 1.1 * 10) / 10;
    system.state.pending += total;
    system.state.dailyEarned += total;
    bulkTraded += qty;
    dealsClaimed += 1;
    return { ok: true, total, qty, unit, bonus: 'bulk +10%' };
  }

  function dailyDeals() {
    const deals = [];
    for (const item of TOURNAMENTS) {
      const mult = esportsMarketEventMult(currentEvent, item.id);
      if (mult !== 1) {
        deals.push({ item: item.id, name: item.name, mult, event: currentEvent });
      }
    }
    return deals;
  }

  function marketSummary() {
    return {
      event: currentEvent,
      season: currentSeason,
      dealsClaimed,
      bulkTraded,
      deals: dailyDeals(),
    };
  }

  function seasonPrices() {
    return TOURNAMENTS.map((item) => ({
      id: item.id,
      name: item.name,
      price: eventPrice(item.id, item.price),
    }));
  }

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

export function esportsEventFor(day) {
  return ESPORTS_MARKET_EVENTS[day % ESPORTS_MARKET_EVENTS.length];
}

export function esportsDailyEventFor(day) {
  return ESPORTS_DAILY_EVENTS[day % ESPORTS_DAILY_EVENTS.length];
}

export function esportsRankNameFor(rank) {
  const r = ESPORTS_RANKS[rank];
  return r ? r.name : 'Unknown';
}

export function esportsTotalValue(state) {
  const inv = esportsInventoryValue(state);
  return Math.round((inv + state.pending + state.earned) * 10) / 10;
}

export function esportsProgressPercent(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 0;
  return Math.round((state.runsDone / total) * 100);
}

export function esportsStaffBonusFor(staffIds, skill) {
  let bonus = 0;
  for (const id of staffIds) {
    const s = ESPORTS_STAFF.find((x) => x.id === id);
    if (s && s.skill === skill) bonus += s.bonus;
  }
  return bonus;
}

export function esportsCheapestEntry() {
  let best = TOURNAMENTS[0];
  for (const item of TOURNAMENTS) {
    if (item.price < best.price) best = item;
  }
  return best;
}

export function esportsPriciestEntry() {
  let best = TOURNAMENTS[0];
  for (const item of TOURNAMENTS) {
    if (item.price > best.price) best = item;
  }
  return best;
}

export function esportsEntriesByDifficulty(difficulty) {
  return TOURNAMENTS.filter((x) => x.difficulty === difficulty).map((x) => x.id);
}

export function esportsEntriesByRarity(maxRarity) {
  return TOURNAMENTS.filter((x) => x.rarity <= maxRarity).map((x) => x.id);
}

export function esportsGradeFor(runsDone, earned, visitors) {
  const score = runsDone * 10 + Math.round(earned / 10) + Math.floor(visitors / 10);
  if (score >= 500) return 'S';
  if (score >= 300) return 'A';
  if (score >= 150) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}

export const ESPORTS_META = {
  system: 'esports',
  version: '7-B4',
  author: 'builder-4',
  mechanic: 'venue',
  dataCount: TOURNAMENTS.length,
  dataName: 'TOURNAMENTS',
};
