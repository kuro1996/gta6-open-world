// Solara Nights - Streaming (Round 7 mega-rebuild, written fresh).
// Solara Live: pick a category, hit go-live, and grow a channel from
// five viewers to five thousand. Chat spams, subs train, raids pour
// in from bigger streamers, and one viral clip can change the whole
// month. Keep the energy up, the mods awake, and the internet on.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.
// Mechanic: stream.

export const STREAM_CATEGORIES = [
  { id: 'just-chatting', name: 'Just Chatting', price: 50, rarity: 0.3, difficulty: 1, format: 'Talk', peakViewers: 120, hype: 3,
    desc: 'A chair, a camera, and opinions about everything.' },
  { id: 'speedruns', name: 'Speedruns', price: 150, rarity: 0.18, difficulty: 3, format: 'Games', peakViewers: 300, hype: 4,
    desc: 'The same level, faster, until the timer surrenders.' },
  { id: 'cooking-live', name: 'Cooking Live', price: 200, rarity: 0.15, difficulty: 2, format: 'Food', peakViewers: 250, hype: 4,
    desc: 'Smoke alarms, sharp knives, and surprisingly good soup.' },
  { id: 'music-sessions', name: 'Music Sessions', price: 250, rarity: 0.14, difficulty: 3, format: 'Music', peakViewers: 400, hype: 4,
    desc: 'Live loops, requests, and one very patient neighbour.' },
  { id: 'art-streams', name: 'Art Streams', price: 120, rarity: 0.2, difficulty: 2, format: 'Creative', peakViewers: 180, hype: 3,
    desc: 'A blank canvas becomes a city skyline in three hours.' },
  { id: 'irl-city', name: 'IRL City Walks', price: 300, rarity: 0.12, difficulty: 2, format: 'IRL', peakViewers: 500, hype: 5,
    desc: 'A backpack camera and the whole of Solara as the set.' },
  { id: 'esports-watch', name: 'Esports Watch Parties', price: 400, rarity: 0.1, difficulty: 3, format: 'Games', peakViewers: 800, hype: 5,
    desc: 'Shouting at the screen together, professionally.' },
  { id: 'science-lab', name: 'Science Lab Live', price: 180, rarity: 0.16, difficulty: 3, format: 'Education', peakViewers: 220, hype: 3,
    desc: 'Experiments that fizz, pop, and occasionally work.' },
  { id: 'asmr-nights', name: 'ASMR Nights', price: 220, rarity: 0.13, difficulty: 2, format: 'Relaxation', peakViewers: 350, hype: 4,
    desc: 'Soft voices and softer sounds until chat falls asleep.' },
  { id: 'charity-marathon', name: 'Charity Marathon', price: 500, rarity: 0.08, difficulty: 4, format: 'Charity', peakViewers: 1000, hype: 5,
    desc: 'Twenty-four hours live, every dollar to a good cause.' },
  { id: 'retro-arcade', name: 'Retro Arcade', price: 160, rarity: 0.17, difficulty: 2, format: 'Games', peakViewers: 260, hype: 3,
    desc: 'Cartridges, quarters, and high scores from 1994.' },
  { id: 'late-show', name: 'The Late Solara Show', price: 600, rarity: 0.06, difficulty: 5, format: 'Talk', peakViewers: 1200, hype: 5,
    desc: 'A desk, a band, and guests who never know what is next.' },
];

export const STREAMING_UPGRADES = [
  { id: 'ring-light', name: 'Ring Light', cost: 80, effect: 'look-plus', desc: 'Your face, but lit like a movie star.' },
  { id: 'good-mic', name: 'Studio Mic', cost: 150, effect: 'sound-plus', desc: 'Every whisper lands. Every sneeze too.' },
  { id: 'green-screen', name: 'Green Screen', cost: 220, effect: 'scene-plus', desc: 'Stream from a beach, a spaceship, or nowhere at all.' },
  { id: 'dual-pc', name: 'Dual PC Setup', cost: 600, effect: 'quality-plus', desc: 'One PC plays, one PC streams. Nothing lags.' },
  { id: 'capture-card', name: 'Capture Card', cost: 350, effect: 'console-plus', desc: 'Console games in crisp, clean quality.' },
  { id: 'overlay-pack', name: 'Overlay Pack', cost: 120, effect: 'brand-plus', desc: 'Alerts, borders and a subscribe button that pops.' },
  { id: 'raid-network', name: 'Raid Network', cost: 500, effect: 'raid-plus', desc: 'Other streamers send their viewers your way.' },
  { id: 'studio-room', name: 'Studio Room', cost: 1200, effect: 'capacity-plus', desc: 'A real room with a door that closes and a sign that says LIVE.' },
];

export const STREAMING_RANKS = [
  { level: 0, name: 'New Streamer', xp: 0, perk: 'Streams pay base rate.' },
  { level: 1, name: 'Affiliate', xp: 150, perk: '+5% prices, subs start trickling in.' },
  { level: 2, name: 'Partner', xp: 400, perk: '+10% prices, the front page notices you.' },
  { level: 3, name: 'Front Page', xp: 800, perk: '+15% prices, raids arrive uninvited.' },
  { level: 4, name: 'Streaming Star', xp: 1500, perk: '+20% prices, your name is the category.' },
];

export const STREAMING_STAFF = [
  { id: 'mod-max', name: 'Max the Mod', wage: 30, skill: 'mod', bonus: 0.15, desc: 'Bans trolls before the chat even sees them.' },
  { id: 'editor-eve', name: 'Eve the Editor', wage: 40, skill: 'edit', bonus: 0.2, desc: 'Turns three hours of stream into one perfect clip.' },
  { id: 'producer-pam', name: 'Pam the Producer', wage: 45, skill: 'produce', bonus: 0.2, desc: 'Runs the show while you just play.' },
  { id: 'community-cat', name: 'Cat the Community Manager', wage: 35, skill: 'community', bonus: 0.15, desc: 'Keeps the Discord warm and the fans loyal.' },
];

export const STREAMING_DAILY_EVENTS = [
  { id: 'raid-incoming', name: 'Raid Incoming', effect: 'visitors', amount: 90,
    text: 'A big streamer raids you with hundreds of viewers.' },
  { id: 'viral-clip', name: 'Viral Clip', effect: 'earn', amount: 380,
    text: 'Your best moment hits the front page overnight.' },
  { id: 'troll-raid', name: 'Troll Raid', effect: 'rep', amount: -1,
    text: 'Trolls flood the chat. The mods earn their pay.' },
  { id: 'sponsor-offer', name: 'Sponsor Offer', effect: 'earn', amount: 300,
    text: 'A brand wants its logo on your overlay.' },
  { id: 'internet-outage', name: 'Internet Outage', effect: 'cost', amount: 100,
    text: 'The connection dies mid-stream. A technician is called.' },
  { id: 'charity-donor', name: 'Charity Donor', effect: 'earn', amount: 250,
    text: 'A stranger donates big and asks for nothing back.' },
  { id: 'collab-invite', name: 'Collab Invite', effect: 'visitors', amount: 60,
    text: 'A bigger creator wants to stream with you.' },
  { id: 'algorithm-boost', name: 'Algorithm Boost', effect: 'visitors', amount: 75,
    text: 'The recommendation engine smiles on you today.' },
  { id: 'quiet-stream', name: 'Quiet Stream', effect: 'xp', amount: 15,
    text: 'Five loyal viewers and a very calm evening.' },
  { id: 'sub-train', name: 'Sub Train', effect: 'earn', amount: 420,
    text: 'Subs gift subs, who gift subs. The train will not stop.' },
];

export const STREAMING_TIPS = [
  { id: 'mic-first', name: 'Mic First', text: 'Viewers forgive bad video. They never forgive bad audio.' },
  { id: 'clip-everything', name: 'Clip Everything', text: 'One clip a day keeps the algorithm fed.' },
  { id: 'raid-kindness', name: 'Raid Kindness', text: 'Raid smaller streamers after your show. It always comes back.' },
  { id: 'schedule-matters', name: 'Schedule Matters', text: 'Same time, same days. Viewers build their evenings around you.' },
  { id: 'chat-first', name: 'Chat First', text: 'Read the chat out loud. Lurkers become talkers become subs.' },
  { id: 'category-pick', name: 'Category Pick', text: 'A small category with loyal viewers beats a giant one that ignores you.' },
  { id: 'sub-goals', name: 'Sub Goals', text: 'Give the chat a number to chase. They love a progress bar.' },
  { id: 'rest-days', name: 'Rest Days', text: 'A rested streamer is funnier than a tired one. Take the day off.' },
];

export const STREAMING_CHALLENGES = [
  { id: 'first-steps', name: 'First Steps', target: 'runsDone', goal: 3, xp: 40, desc: 'Finish 3 stream runs.' },
  { id: 'regular', name: 'Regular', target: 'runsDone', goal: 10, xp: 90, desc: 'Finish 10 stream runs.' },
  { id: 'collector', name: 'Collector', target: 'itemsOwned', goal: 4, xp: 100, desc: 'Own 4 different stream entries.' },
  { id: 'big-earner', name: 'Big Earner', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from the stream business.' },
  { id: 'crowd-favourite', name: 'Crowd Favourite', target: 'visitors', goal: 200, xp: 110, desc: 'Draw 200 visitors through the stream business.' },
  { id: 'respected', name: 'Respected Name', target: 'reputation', goal: 10, xp: 100, desc: 'Reach 10 reputation in the stream business.' },
  { id: 'best-day', name: 'Best Day Ever', target: 'bestRun', goal: 400, xp: 130, desc: 'Score a single run worth $400 or more.' },
  { id: 'fully-kitted', name: 'Fully Kitted', target: 'upgradesOwned', goal: 6, xp: 150, desc: 'Own 6 upgrades for the stream business.' },
];

export const STREAMING_ACHIEVEMENTS = [
  { id: 'first-run', name: 'First Run', target: 'runsDone', goal: 1, desc: 'Finish your first stream run.' },
  { id: 'first-sale', name: 'First Payday', target: 'earned', goal: 1, desc: 'Collect your first dollar of stream earnings.' },
  { id: 'ten-runs', name: 'Ten Runs Deep', target: 'runsDone', goal: 10, desc: 'Finish 10 stream runs.' },
  { id: 'thousand-club', name: 'Thousand Club', target: 'earned', goal: 1000, desc: 'Earn $1,000 in total from the stream business.' },
  { id: 'five-hundred-faces', name: 'Five Hundred Faces', target: 'visitors', goal: 500, desc: 'Welcome 500 visitors through the stream business.' },
  { id: 'rank-three', name: 'Rising Star', target: 'rank', goal: 3, desc: 'Reach rank 3 in the stream business.' },
  { id: 'full-shelf', name: 'Full Shelf', target: 'itemsOwned', goal: 8, desc: 'Own 8 different stream entries at once.' },
  { id: 'streak-five', name: 'On A Roll', target: 'bestStreak', goal: 5, desc: 'Build a 5-run streak without a failed stream run.' },
];

export const STREAMING_LEADERBOARD = [
  { name: 'PixelCast', score: 4200, desc: 'The slick studio channel with too many cameras.' },
  { name: 'WaveLive', score: 3100, desc: 'Surf, sunsets and a million followers.' },
  { name: 'NovaStream', score: 2400, desc: 'The science channel that went supernova.' },
  { name: 'ChatBox TV', score: 1500, desc: 'All talk, all day, all caps.' },
  { name: 'You', score: 0, desc: 'Climbing the stream ladder.' },
];

export const STREAMING_RECORDS = [
  { id: 'biggest-run', name: 'Biggest Run', stat: 'bestRun', unit: '$', desc: 'Best single-run payout.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money earned overall.' },
  { id: 'most-visitors', name: 'Most Visitors', stat: 'visitors', unit: 'people', desc: 'Most visitors welcomed.' },
  { id: 'most-runs', name: 'Most Runs', stat: 'runsDone', unit: 'runs', desc: 'Most runs finished.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'runs', desc: 'Longest run streak.' },
];

export const STREAMING_MARKET_EVENTS = [
  { id: 'just-chatting-surge', name: 'Just Chatting Surge', item: 'just-chatting', mult: 1.35, desc: 'Demand for Just Chatting swings hard this week.' },
  { id: 'speedruns-surge', name: 'Speedruns Surge', item: 'speedruns', mult: 0.7, desc: 'Demand for Speedruns swings hard this week.' },
  { id: 'cooking-live-surge', name: 'Cooking Live Surge', item: 'cooking-live', mult: 1.35, desc: 'Demand for Cooking Live swings hard this week.' },
  { id: 'music-sessions-surge', name: 'Music Sessions Surge', item: 'music-sessions', mult: 0.7, desc: 'Demand for Music Sessions swings hard this week.' },
  { id: 'art-streams-surge', name: 'Art Streams Surge', item: 'art-streams', mult: 1.35, desc: 'Demand for Art Streams swings hard this week.' },
  { id: 'irl-city-surge', name: 'IRL City Walks Surge', item: 'irl-city', mult: 0.7, desc: 'Demand for IRL City Walks swings hard this week.' },
  { id: 'esports-watch-surge', name: 'Esports Watch Parties Surge', item: 'esports-watch', mult: 1.35, desc: 'Demand for Esports Watch Parties swings hard this week.' },
  { id: 'science-lab-surge', name: 'Science Lab Live Surge', item: 'science-lab', mult: 0.7, desc: 'Demand for Science Lab Live swings hard this week.' },
  { id: 'asmr-nights-surge', name: 'ASMR Nights Surge', item: 'asmr-nights', mult: 1.35, desc: 'Demand for ASMR Nights swings hard this week.' },
  { id: 'charity-marathon-surge', name: 'Charity Marathon Surge', item: 'charity-marathon', mult: 0.7, desc: 'Demand for Charity Marathon swings hard this week.' },
  { id: 'retro-arcade-surge', name: 'Retro Arcade Surge', item: 'retro-arcade', mult: 1.35, desc: 'Demand for Retro Arcade swings hard this week.' },
  { id: 'late-show-surge', name: 'The Late Solara Show Surge', item: 'late-show', mult: 0.7, desc: 'Demand for The Late Solara Show swings hard this week.' },
];

export const STREAMING_SEASONS = [
  { id: 'spring-growth', name: 'Spring Growth', mult: 1.1, desc: 'New viewers sprout like spring leaves.' },
  { id: 'summer-grind', name: 'Summer Grind', mult: 1.2, desc: 'School is out and chat never sleeps.' },
  { id: 'autumn-hype', name: 'Autumn Hype', mult: 1.05, desc: 'Big game launches fill every category.' },
  { id: 'winter-marathon', name: 'Winter Marathon', mult: 1.15, desc: 'Holiday streams run long and generous.' },
];

export const STREAMING_FACTS = [
  { id: 'fact-just-chatting', text: 'Just Chatting: A chair, a camera, and opinions about everything.' },
  { id: 'fact-speedruns', text: 'Speedruns: The same level, faster, until the timer surrenders.' },
  { id: 'fact-cooking-live', text: 'Cooking Live: Smoke alarms, sharp knives, and surprisingly good soup.' },
  { id: 'fact-music-sessions', text: 'Music Sessions: Live loops, requests, and one very patient neighbour.' },
  { id: 'fact-art-streams', text: 'Art Streams: A blank canvas becomes a city skyline in three hours.' },
  { id: 'fact-irl-city', text: 'IRL City Walks: A backpack camera and the whole of Solara as the set.' },
  { id: 'fact-esports-watch', text: 'Esports Watch Parties: Shouting at the screen together, professionally.' },
  { id: 'fact-science-lab', text: 'Science Lab Live: Experiments that fizz, pop, and occasionally work.' },
  { id: 'fact-asmr-nights', text: 'ASMR Nights: Soft voices and softer sounds until chat falls asleep.' },
  { id: 'fact-charity-marathon', text: 'Charity Marathon: Twenty-four hours live, every dollar to a good cause.' },
  { id: 'fact-retro-arcade', text: 'Retro Arcade: Cartridges, quarters, and high scores from 1994.' },
  { id: 'fact-late-show', text: 'The Late Solara Show: A desk, a band, and guests who never know what is next.' },
  { id: 'fact-general-0', text: 'The best stream operators in Solara check their prices every morning before opening.' },
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

export const STREAMING_NPC_LINES = [
  { id: 'npc-0', text: 'I came all the way across town for the Just Chatting. Worth it.' },
  { id: 'npc-1', text: 'My cousin runs a stream place too, but yours is better. Do not tell him.' },
  { id: 'npc-2', text: 'Is the Cooking Live really as good as everyone says? I am about to find out.' },
  { id: 'npc-3', text: 'I bring my kids here every weekend. They ask for the Speedruns by name.' },
  { id: 'npc-4', text: 'You should put the Music Sessions on a poster. People would come just for that.' },
  { id: 'npc-5', text: 'I heard the Art Streams here is the best in Solara. The rumour was right.' },
  { id: 'npc-6', text: 'Quiet day today. The IRL City Walks still made my afternoon.' },
  { id: 'npc-7', text: 'I saved up for weeks to try the Esports Watch Parties. No regrets.' },
  { id: 'npc-8', text: 'The staff told me about the Science Lab Live. Now I tell everyone I meet.' },
  { id: 'npc-9', text: 'I have been to every stream spot in the city. This one wins.' },
  { id: 'npc-10', text: 'One day I want to run a stream place of my own. I am taking notes.' },
  { id: 'npc-11', text: 'The ASMR Nights is the reason my friends finally believe my stories.' },
  { id: 'npc-12', text: 'Do you ever get tired of the Charity Marathon? I never would.' },
  { id: 'npc-13', text: 'I wrote a review about the Retro Arcade last night. Five stars, obviously.' },
  { id: 'npc-14', text: 'My grandmother loved the The Late Solara Show. I come here to remember her.' },
  { id: 'npc-15', text: 'If the Just Chatting gets any better, the whole city will queue around the block.' },
];

export const STREAMING_GUIDE = [
  { id: 'guide-0', text: 'Open your first stream entry: it costs cash, but it unlocks everything else.' },
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

export function streamingRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < STREAMING_RANKS.length; i++) {
    if (xp >= STREAMING_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function streamingItemById(id) {
  return STREAM_CATEGORIES.find((x) => x.id === id) || null;
}

export function streamingPriceFor(id, drift, rank, upgrades) {
  const item = STREAM_CATEGORIES.find((x) => x.id === id);
  if (!item) return 0;
  let price = item.price;
  price *= 1 + (drift[id] || 0);
  price *= 1 + rank * 0.05;
  if (upgrades && upgrades.length >= 3) price *= 1.1;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function streamingCapacityFor(rank, upgrades) {
  let cap = 3 + rank;
  if (upgrades && upgrades.indexOf('studio-room') >= 0) cap += 2;
  return cap;
}

export function streamingPayoutFor(item, rank, upgrades, weather, boosted) {
  let mult = 0.6 + rank * 0.1 + (boosted ? 0.3 : 0);
  if (weather === 'rain') mult *= 1.05;
  if (weather === 'sunny') mult *= 1.0;
  if (weather === 'storm') mult *= 0.7;
  if (upgrades && upgrades.length >= 4) mult *= 1.15;
  return Math.max(5, Math.round(item.price * mult));
}

export function streamingCrowdFor(item, rank, weather) {
  let crowd = 10 + item.difficulty * 8 + rank * 5;
  if (weather === 'rain') crowd = Math.round(crowd * 1.05);
  if (weather === 'sunny') crowd = Math.round(crowd * 1.0);
  if (weather === 'storm') crowd = Math.round(crowd * 0.5);
  return Math.max(1, crowd);
}

export function streamingUpgradeById(id) {
  return STREAMING_UPGRADES.find((x) => x.id === id) || null;
}

export function streamingStaffById(id) {
  return STREAMING_STAFF.find((x) => x.id === id) || null;
}

export function streamingEventById(id) {
  return STREAMING_DAILY_EVENTS.find((x) => x.id === id) || null;
}

export function streamingTipFor(day) {
  return STREAMING_TIPS[day % STREAMING_TIPS.length];
}

export function streamingFactFor(day) {
  return STREAMING_FACTS[day % STREAMING_FACTS.length];
}

export function streamingNpcLineFor(day) {
  return STREAMING_NPC_LINES[day % STREAMING_NPC_LINES.length];
}

export function streamingGuideStep(step) {
  return STREAMING_GUIDE[step] || null;
}

export function streamingSeasonMult(seasonId) {
  const s = STREAMING_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function streamingMarketEventMult(eventId, itemId) {
  const ev = STREAMING_MARKET_EVENTS.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.item === itemId ? ev.mult : 1;
}

export function streamingWeeklyGoal(state) {
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

export function streamingEfficiency(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 100;
  return Math.round((state.runsDone / total) * 100);
}

export function streamingProfitPerRun(state) {
  if (state.runsDone === 0) return 0;
  return Math.round((state.earned / state.runsDone) * 10) / 10;
}

export function streamingInventoryValue(state) {
  let total = 0;
  for (const id of Object.keys(state.owned || {})) {
    const item = STREAM_CATEGORIES.find((x) => x.id === id);
    if (item) total += item.price * (state.levels[id] || 1);
  }
  return Math.round(total * 10) / 10;
}

export function streamingSummary(state) {
  const rankName = STREAMING_RANKS[state.rank] ? STREAMING_RANKS[state.rank].name : 'Unknown';
  return 'Streaming ' + rankName + ': ' + state.runsDone + ' runs, '
    + state.itemsOwned + ' entries, $' + Math.round(state.earned)
    + ' earned, ' + state.visitors + ' visitors.';
}

export function streamingNextGoal(state) {
  if (state.itemsOwned < 1) return 'Open your first entry.';
  if (state.runsDone < 5) return 'Finish 5 runs.';
  if (state.earned < 500) return 'Earn $500 in total.';
  if (state.rank < 2) return 'Reach rank ' + STREAMING_RANKS[2].name + '.';
  if (state.upgradesOwned < 4) return 'Own 4 upgrades.';
  return 'Become a Streaming legend.';
}

export function streamingRecordFor(recordId, state) {
  const r = STREAMING_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function streamingAllRecords(state) {
  return STREAMING_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function streamingLeaderboardWith(playerScore) {
  const board = STREAMING_LEADERBOARD.map((e) => ({
    name: e.name, score: e.name === 'You' ? playerScore : e.score, desc: e.desc,
  }));
  board.sort((a, b) => b.score - a.score);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, score: e.score, desc: e.desc }));
}

export function streamingSeasonReport(state, seasonId) {
  const mult = streamingSeasonMult(seasonId);
  return STREAM_CATEGORIES.map((item) => ({
    id: item.id,
    name: item.name,
    basePrice: item.price,
    seasonPrice: Math.round(item.price * mult * 10) / 10,
    owned: !!state.owned[item.id],
    level: state.levels[item.id] || 0,
  }));
}

export function streamingChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return {
    id: challenge.id, name: challenge.name, have: Math.floor(v),
    goal: challenge.goal, done: v >= challenge.goal, xp: challenge.xp,
  };
}

export function streamingBestEntryFor(rank) {
  let best = null;
  let bestScore = -1;
  for (const item of STREAM_CATEGORIES) {
    if (item.difficulty > rank + 2) continue;
    const score = item.price * (1 + item.rarity * 2) / item.difficulty;
    if (score > bestScore) { bestScore = score; best = item; }
  }
  return best;
}

export function createStreamingSystem(ctx) {
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
  const MECH = 'stream';

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
  for (const item of STREAM_CATEGORIES) {
    state.drift[item.id] = 0;
    state.prices[item.id] = item.price;
  }

  function refreshRank() {
    const r = streamingRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log('Streaming rank up: ' + STREAMING_RANKS[r].name + ' - ' + STREAMING_RANKS[r].perk);
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
      const s = STREAMING_STAFF.find((x) => x.id === id);
      if (s && s.skill === skill) bonus += s.bonus;
    }
    return bonus;
  }

  function driftPrices() {
    for (const item of STREAM_CATEGORIES) {
      const roll = rng();
      if (roll < 0.35) {
        const change = Math.round((rng() * 0.24 - 0.12) * 100) / 100;
        state.drift[item.id] = Math.round((state.drift[item.id] + change) * 100) / 100;
        state.prices[item.id] = Math.max(1, Math.round(item.price * (1 + state.drift[item.id]) * 10) / 10);
      }
    }
  }

  function unlockCategory(id) {
    const item = STREAM_CATEGORIES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-category' };
    if (state.owned[id]) return { ok: false, reason: 'already-owned' };
    if (state.itemsOwned >= streamingCapacityFor(state.rank, state.upgrades)) {
      return { ok: false, reason: 'capacity-full', cap: streamingCapacityFor(state.rank, state.upgrades) };
    }
    if (state.rank < Math.max(0, item.difficulty - 2)) {
      return { ok: false, reason: 'rank-too-low', need: Math.max(0, item.difficulty - 2) };
    }
    const cost = streamingPriceFor(id, state.drift, 0, []);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned[id] = 1;
    state.levels[id] = 1;
    state.itemsOwned += 1;
    gainXp(10);
    log('Unlocked ' + item.name + ' for $' + cost + '. Welcome to the Streaming business.');
    return { ok: true, id, cost, name: item.name };
  }

  function goLive(id) {
    const item = STREAM_CATEGORIES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-category' };
    if (state.active) return { ok: false, reason: 'already-running', active: state.activeId };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned' };
    state.active = 'stream';
    state.activeId = id;
    state.activeTimer = 60;
    state.activeBase = item.price;
    state.viewers = 5 + Math.floor(state.followers * 0.1);
    log('You are LIVE: ' + item.name + '. Chat is waking up.');
    return { ok: true, id, seconds: 60 };
  }

  function settleRun() {
    const id = state.activeId;
    const item = STREAM_CATEGORIES.find((x) => x.id === id);
    state.active = null;
    state.activeId = null;
    state.activeTimer = 0;
    if (!item) return;
    const payout = Math.max(5, Math.round(state.viewers * 0.05 + state.subs * 2 + item.price * 0.2));
    const newSubs = Math.floor(state.viewers * 0.02) + (rng() < 0.5 ? 1 : 0);
    const newFollowers = Math.floor(state.viewers * 0.05);
    state.subs += newSubs;
    state.followers += newFollowers;
    state.peakViewers = Math.max(state.peakViewers, state.viewers);
    state.streamMinutes += 1;
    state.viewers = 0;
    state.pending += payout;
    state.runsDone += 1;
    state.visitors += newSubs;
    state.dailyEarned += payout;
    if (payout > state.bestRun) { state.bestRun = payout; state.bestRunName = item.name; }
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    gainXp(20 + newSubs);
    log('Stream ended: ' + item.name + ' earned $' + payout + ' with ' + newSubs + ' new subs.');
  }

  function collectStreamRevenue() {
    if (state.pending <= 0) return { ok: false, reason: 'nothing-pending' };
    const amount = state.pending;
    state.pending = 0;
    state.earned += amount;
    addCash(amount);
    log('Collected $' + amount + ' from the till.');
    return { ok: true, amount };
  }

  function sellMerch(id, qty) {
    const item = STREAM_CATEGORIES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-category' };
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

  function hostRaid(id) {
    void id;
    const gain = 5 + Math.floor(rng() * 20);
    state.followers += gain;
    state.reputation += 1;
    gainXp(10);
    log('Raid hosted! ' + gain + ' new followers found the channel.');
    return { ok: true, followersGained: gain };
  }

  function buyUpgrade(id) {
    const u = STREAMING_UPGRADES.find((x) => x.id === id);
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
    const s = STREAMING_STAFF.find((x) => x.id === id);
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
    const item = STREAM_CATEGORIES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-category' };
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
    return STREAM_CATEGORIES.map((item) => ({
      id: item.id,
      name: item.name,
      price: streamingPriceFor(item.id, state.drift, state.rank, state.upgrades),
      basePrice: item.price,
      drift: state.drift[item.id],
      owned: !!state.owned[item.id],
      level: state.levels[item.id] || 0,
      difficulty: item.difficulty,
      rarity: item.rarity,
    }));
  }

  function listItems() {
    return STREAM_CATEGORIES.map((item) => ({
      id: item.id, name: item.name, price: item.price,
      difficulty: item.difficulty, rarity: item.rarity, desc: item.desc,
      owned: !!state.owned[item.id],
    }));
  }

  function info(id) {
    const item = STREAM_CATEGORIES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-category' };
    return {
      ok: true, item,
      owned: !!state.owned[id],
      level: state.levels[id] || 0,
      price: streamingPriceFor(id, state.drift, state.rank, state.upgrades),
      holdings: state.holdings[id] || 0,
    };
  }

  function dailyEvent() {
    const idx = Math.floor(rng() * STREAMING_DAILY_EVENTS.length);
    const ev = STREAMING_DAILY_EVENTS[idx];
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
    if (MECH === 'stream') {
      const rate = 2 + state.followers * 0.01 + state.rank;
      state.viewers += Math.round(rate * dt);
      if (rng() < 0.1 * dt) state.subs += 1;
    }
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
    if (state.subs > 0 && rng() < 0.3) state.subs -= 1;
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
    for (const item of STREAM_CATEGORIES) {
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
      name: 'Streaming',
      mechanic: MECH,
      rank: STREAMING_RANKS[state.rank] ? STREAMING_RANKS[state.rank].name : 'Unknown',
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
      capacity: streamingCapacityFor(state.rank, state.upgrades),
      hour: getHour(),
      day: getDay(),
    };
  }

  function hudLine() {
    if (state.active) {
      return 'Streaming: running ' + state.activeId + ' - ' + Math.max(0, Math.ceil(state.activeTimer)) + 's left';
    }
    if (state.pending > 0) {
      return 'Streaming: $' + Math.round(state.pending) + ' waiting in the till';
    }
    if (state.itemsOwned > 0) {
      return 'Streaming: ' + state.itemsOwned + ' entries, $' + Math.round(state.earned) + ' earned';
    }
    return '';
  }

  function interact(action, a, b) {
    if (!action || action === 'status') return { ok: true, stats: stats(), hint: 'open <category> to unlock it, run <category> to go live, collect to claim revenue' };
    if (action === 'open') return unlockCategory(a);
    if (action === 'run') return goLive(a);
    if (action === 'collect') return collectStreamRevenue();
    if (action === 'sell') return sellMerch(a, b);
    if (action === 'upgrade') return buyUpgrade(a);
    if (action === 'levelup') return upgradeItem(a);
    if (action === 'hire') return hireStaff(a);
    if (action === 'fire') return fireStaff(a);
    if (action === 'special') return hostRaid(a, b);
    if (action === 'info') return info(a);
    if (action === 'prices') return { ok: true, prices: priceBoard() };
    if (action === 'list') return { ok: true, items: listItems() };
    if (action === 'event') return dailyEvent();
    return { ok: false, reason: 'unknown-action', action };
  }

  return {
    name: 'Streaming',
    state,
    gainXp,
    unlockCategory,
    goLive,
    collectStreamRevenue,
    sellMerch,
    hostRaid,
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
    open: unlockCategory,
    run: goLive,
    collect: collectStreamRevenue,
    sell: sellMerch,
    upgrade: buyUpgrade,
    hire: hireStaff,
  };
}

export function createStreamingExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function challenges() {
    return STREAMING_CHALLENGES.map((ch) => streamingChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = STREAMING_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.indexOf(id) >= 0) return { ok: false, reason: 'already-claimed' };
    const p = streamingChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    system.state.challengesClaimed.push(id);
    if (typeof system.gainXp === 'function') system.gainXp(ch.xp);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return STREAMING_ACHIEVEMENTS.map((a) => ({
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
    const h = STREAMING_STAFF.find((x) => x.id === id);
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
      const h = STREAMING_STAFF.find((x) => x.id === id);
      if (h) due += h.wage;
    }
    helperWagesPaid += due;
    system.state.wagesPaid += due;
    return { due, helpers: helpers.slice(), totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    let bonus = 0;
    for (const id of helpers) {
      const h = STREAMING_STAFF.find((x) => x.id === id);
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
    const item = STREAM_CATEGORIES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-category' };
    system.state.boosted[id] = true;
    return { ok: true, id, boosted: true };
  }

  function inventoryValue() {
    return streamingInventoryValue(system.state);
  }

  function weeklyReport() {
    return {
      goal: streamingWeeklyGoal(system.state),
      summary: streamingSummary(system.state),
      nextGoal: streamingNextGoal(system.state),
      efficiency: streamingEfficiency(system.state),
      profitPerRun: streamingProfitPerRun(system.state),
      records: streamingAllRecords(system.state),
    };
  }

  function staffRoster() {
    return STREAMING_STAFF.map((s) => ({
      id: s.id, name: s.name, wage: s.wage, skill: s.skill,
      hired: helpers.indexOf(s.id) >= 0 || system.state.staff.indexOf(s.id) >= 0,
    }));
  }

  function upgradeCatalog() {
    return STREAMING_UPGRADES.map((u) => ({
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

export function createStreamingMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  function setEvent(eventId) {
    const ev = STREAMING_MARKET_EVENTS.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = STREAMING_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(itemId, basePrice) {
    let price = basePrice;
    price *= streamingMarketEventMult(currentEvent, itemId);
    price *= streamingSeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(itemId, qty) {
    const item = STREAM_CATEGORIES.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-category' };
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
    for (const item of STREAM_CATEGORIES) {
      const mult = streamingMarketEventMult(currentEvent, item.id);
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
    return STREAM_CATEGORIES.map((item) => ({
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

export function streamingEventFor(day) {
  return STREAMING_MARKET_EVENTS[day % STREAMING_MARKET_EVENTS.length];
}

export function streamingDailyEventFor(day) {
  return STREAMING_DAILY_EVENTS[day % STREAMING_DAILY_EVENTS.length];
}

export function streamingRankNameFor(rank) {
  const r = STREAMING_RANKS[rank];
  return r ? r.name : 'Unknown';
}

export function streamingTotalValue(state) {
  const inv = streamingInventoryValue(state);
  return Math.round((inv + state.pending + state.earned) * 10) / 10;
}

export function streamingProgressPercent(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 0;
  return Math.round((state.runsDone / total) * 100);
}

export function streamingStaffBonusFor(staffIds, skill) {
  let bonus = 0;
  for (const id of staffIds) {
    const s = STREAMING_STAFF.find((x) => x.id === id);
    if (s && s.skill === skill) bonus += s.bonus;
  }
  return bonus;
}

export function streamingCheapestEntry() {
  let best = STREAM_CATEGORIES[0];
  for (const item of STREAM_CATEGORIES) {
    if (item.price < best.price) best = item;
  }
  return best;
}

export function streamingPriciestEntry() {
  let best = STREAM_CATEGORIES[0];
  for (const item of STREAM_CATEGORIES) {
    if (item.price > best.price) best = item;
  }
  return best;
}

export function streamingEntriesByDifficulty(difficulty) {
  return STREAM_CATEGORIES.filter((x) => x.difficulty === difficulty).map((x) => x.id);
}

export function streamingEntriesByRarity(maxRarity) {
  return STREAM_CATEGORIES.filter((x) => x.rarity <= maxRarity).map((x) => x.id);
}

export function streamingGradeFor(runsDone, earned, visitors) {
  const score = runsDone * 10 + Math.round(earned / 10) + Math.floor(visitors / 10);
  if (score >= 500) return 'S';
  if (score >= 300) return 'A';
  if (score >= 150) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}

export const STREAMING_META = {
  system: 'streaming',
  version: '7-B4',
  author: 'builder-4',
  mechanic: 'stream',
  dataCount: STREAM_CATEGORIES.length,
  dataName: 'STREAM_CATEGORIES',
};
