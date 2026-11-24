export const STREAM_CATEGORIES = [
  { id: 'gaming-live', name: 'Gaming Live', price: 120, rarity: 0.3, difficulty: 1, format: 'Gameplay', peakViewers: 500, hype: 40, desc: 'Late-night ranked games with a loud chat.' },
  { id: 'just-chatting', name: 'Just Chatting', price: 90, rarity: 0.25, difficulty: 1, format: 'Talk', peakViewers: 400, hype: 35, desc: 'Coffee, questions and whatever the chat wants.' },
  { id: 'music-jam', name: 'Music Jam', price: 160, rarity: 0.4, difficulty: 2, format: 'Music', peakViewers: 600, hype: 50, desc: 'Live songs, requests and the odd wrong note.' },
  { id: 'cooking-show', name: 'Cooking Show', price: 150, rarity: 0.35, difficulty: 2, format: 'Cooking', peakViewers: 550, hype: 45, desc: 'Burnt toast, big flavour, bigger laughs.' },
  { id: 'speedrun-central', name: 'Speedrun Central', price: 220, rarity: 0.5, difficulty: 2, format: 'Speedrun', peakViewers: 800, hype: 60, desc: 'Glitch hunts and world-record attempts, live.' },
  { id: 'art-studio', name: 'Art Studio', price: 180, rarity: 0.45, difficulty: 2, format: 'Art', peakViewers: 650, hype: 55, desc: 'Paint, pixels and chat-drawn challenges.' },
  { id: 'talk-show', name: 'Talk Show', price: 260, rarity: 0.6, difficulty: 3, format: 'Talk', peakViewers: 900, hype: 70, desc: 'Guests, gossip and the question everyone asks.' },
  { id: 'esports-cast', name: 'Esports Cast', price: 300, rarity: 0.65, difficulty: 3, format: 'Gameplay', peakViewers: 1200, hype: 75, desc: 'Pro matches with pro commentary.' },
  { id: 'fitness-live', name: 'Fitness Live', price: 140, rarity: 0.35, difficulty: 1, format: 'Fitness', peakViewers: 500, hype: 42, desc: 'Workouts where the chat counts your reps.' },
  { id: 'travel-vlog', name: 'Travel Vlog', price: 200, rarity: 0.5, difficulty: 2, format: 'Travel', peakViewers: 750, hype: 58, desc: 'Streets, food and sunsets from everywhere.' },
  { id: 'tech-review', name: 'Tech Review', price: 240, rarity: 0.55, difficulty: 3, format: 'Review', peakViewers: 850, hype: 65, desc: 'Gadgets unboxed, tested and honestly judged.' },
  { id: 'mega-event', name: 'Mega Event', price: 500, rarity: 0.9, difficulty: 5, format: 'Special', peakViewers: 2000, hype: 95, desc: 'The once-a-year stream the whole city watches.' },
];

export const STREAMING_UPGRADES = [
  { id: 'ring-light', name: 'Ring Light', cost: 90, effect: 'viewers +10%', desc: 'Flattering light for every angle.' },
  { id: 'studio-room', name: 'Studio Room', cost: 320, effect: 'capacity +2', desc: 'A second room for a second channel.' },
  { id: 'pro-mic', name: 'Pro Mic', cost: 160, effect: 'payout +10%', desc: 'Studio sound, zero echo.' },
  { id: 'dual-pc', name: 'Dual PC', cost: 300, effect: 'crowd +15%', desc: 'One PC plays, one PC streams.' },
  { id: 'chat-bot', name: 'Chat Bot', cost: 120, effect: 'visitors +10%', desc: 'Welcomes every viewer by name.' },
  { id: 'sub-badges', name: 'Sub Badges', cost: 140, effect: 'earned +5%', desc: 'Shiny badges for loyal subs.' },
  { id: 'emote-pack', name: 'Emote Pack', cost: 110, effect: 'crowd +10%', desc: 'Custom emotes the chat spams all night.' },
  { id: 'raid-alerts', name: 'Raid Alerts', cost: 200, effect: 'payout +12%', desc: 'A fanfare for every incoming raid.' },
];

export const STREAMING_RANKS = [
  { level: 0, name: 'New Streamer', xp: 0, perk: 'Still finding your voice.' },
  { level: 1, name: 'Affiliate', xp: 150, perk: 'Subs unlocked, chat is growing.' },
  { level: 2, name: 'Partner', xp: 400, perk: 'The platform promotes your streams.' },
  { level: 3, name: 'Viral Star', xp: 800, perk: 'Clips of you are everywhere.' },
  { level: 4, name: 'Streaming Legend', xp: 1500, perk: 'Your name is on the front page.' },
];

export const STREAMING_STAFF = [
  { id: 'mod-pip', name: 'Pip the Mod', wage: 40, skill: 'mod', bonus: 2, desc: 'Keeps the chat friendly and fast.' },
  { id: 'editor-zoe', name: 'Zoe the Editor', wage: 55, skill: 'editor', bonus: 3, desc: 'Turns streams into viral clips overnight.' },
  { id: 'designer-ash', name: 'Ash the Designer', wage: 50, skill: 'design', bonus: 2, desc: 'Overlays and alerts that pop.' },
  { id: 'manager-kai', name: 'Kai the Manager', wage: 60, skill: 'manager', bonus: 3, desc: 'Books sponsors and keeps the calendar full.' },
];

export const STREAMING_DAILY_EVENTS = [
  { id: 'clip-viral', name: 'Clip Goes Viral', effect: 'visitors', amount: 35, text: 'A ten-second clip hits a million views.' },
  { id: 'brand-deal', name: 'Brand Deal', effect: 'earn', amount: 100, text: 'A snack brand pays for a shout-out.' },
  { id: 'internet-down', name: 'Internet Down', effect: 'cost', amount: 45, text: 'The stream drops; a backup line costs money.' },
  { id: 'shoutout', name: 'Big Shoutout', effect: 'rep', amount: 3, text: 'A huge streamer raids your channel.' },
  { id: 'hype-train', name: 'Hype Train', effect: 'visitors', amount: 25, text: 'Subs rain in faster than the chat can count.' },
  { id: 'troll-raid', name: 'Troll Raid', effect: 'heat', amount: 2, text: 'A wave of trolls floods the chat.' },
  { id: 'collab-call', name: 'Collab Call', effect: 'xp', amount: 25, text: 'A fellow streamer teaches you a new trick.' },
  { id: 'broken-webcam', name: 'Broken Webcam', effect: 'cost', amount: 30, text: 'The camera dies; a replacement is not cheap.' },
  { id: 'charity-stream', name: 'Charity Stream', effect: 'earn', amount: 130, text: 'Viewers donate all night for a good cause.' },
  { id: 'slow-night', name: 'Slow Night', effect: 'rep', amount: 1, text: 'A quiet stream, but the regulars stay loyal.' },
];

export const STREAMING_TIPS = [
  { id: 'tip-raid', name: 'Host Raids', text: 'Raid a friend to win new followers for free.' },
  { id: 'tip-studio', name: 'Studio Room', text: 'Buy the Studio Room to unlock two more categories.' },
  { id: 'tip-subs', name: 'Keep Subs', text: 'Subs drift away over time, so stream often.' },
  { id: 'tip-streak', name: 'Stream Daily', text: 'Daily streams grow your streak fast.' },
  { id: 'tip-prices', name: 'Price Watch', text: 'Category prices drift every day, so check the board.' },
  { id: 'tip-staff', name: 'Good Mods', text: 'A great mod keeps the chat safe and fun.' },
  { id: 'tip-donate', name: 'Give Back', text: 'Charity streams build reputation fast.' },
  { id: 'tip-rank', name: 'Climb Up', text: 'Every stream played pushes you toward Partner.' },
];

export const STREAMING_CHALLENGES = [
  { id: 'ch-runs-5', name: 'Five Streams', target: 'runsDone', goal: 5, xp: 50, desc: 'Go live 5 times.' },
  { id: 'ch-earn-500', name: 'First 500', target: 'earned', goal: 500, xp: 80, desc: 'Earn $500 in total.' },
  { id: 'ch-visitors-200', name: 'Packed Chat', target: 'visitors', goal: 200, xp: 60, desc: 'Welcome 200 visitors.' },
  { id: 'ch-items-4', name: 'Four Channels', target: 'itemsOwned', goal: 4, xp: 70, desc: 'Unlock 4 categories.' },
  { id: 'ch-upgrades-3', name: 'Well Equipped', target: 'upgradesOwned', goal: 3, xp: 60, desc: 'Own 3 upgrades.' },
  { id: 'ch-rep-10', name: 'Respected', target: 'reputation', goal: 10, xp: 50, desc: 'Reach 10 reputation.' },
  { id: 'ch-streak-3', name: 'On a Roll', target: 'streak', goal: 3, xp: 90, desc: 'Reach a 3-stream streak.' },
  { id: 'ch-best-300', name: 'Big Night', target: 'bestRun', goal: 300, xp: 100, desc: 'Earn $300 from a single stream.' },
];

export const STREAMING_ACHIEVEMENTS = [
  { id: 'ach-runs-10', name: 'Stream Machine', target: 'runsDone', goal: 10, desc: 'Go live 10 times.' },
  { id: 'ach-earn-1000', name: 'Golden Stream', target: 'earned', goal: 1000, desc: 'Earn $1,000 in total.' },
  { id: 'ach-visitors-500', name: 'City Favourite', target: 'visitors', goal: 500, desc: 'Welcome 500 visitors.' },
  { id: 'ach-items-6', name: 'Full Lineup', target: 'itemsOwned', goal: 6, desc: 'Unlock 6 categories.' },
  { id: 'ach-upgrades-5', name: 'Fully Loaded', target: 'upgradesOwned', goal: 5, desc: 'Own 5 upgrades.' },
  { id: 'ach-rep-20', name: 'Beloved', target: 'reputation', goal: 20, desc: 'Reach 20 reputation.' },
  { id: 'ach-streak-5', name: 'Unstoppable', target: 'streak', goal: 5, desc: 'Reach a 5-stream streak.' },
  { id: 'ach-best-500', name: 'Record Night', target: 'bestRun', goal: 500, desc: 'Earn $500 from a single stream.' },
];

export const STREAMING_LEADERBOARD = [
  { name: 'PixelQueen', score: 1100, desc: 'The queen of gaming streams.' },
  { name: 'ChefRex', score: 820, desc: 'Cooks and cracks jokes at once.' },
  { name: 'LoFiLena', score: 590, desc: 'Chill beats and chill chat.' },
  { name: 'NoobNed', score: 230, desc: 'Still learning, still streaming.' },
  { name: 'You', score: 0, desc: 'The new name on the board.' },
];

export const STREAMING_RECORDS = [
  { id: 'rec-runs', name: 'Most Streams', stat: 'runsDone', unit: 'streams', desc: 'Total streams run.' },
  { id: 'rec-earned', name: 'Top Earnings', stat: 'earned', unit: '$', desc: 'Total money earned.' },
  { id: 'rec-visitors', name: 'Biggest Crowd', stat: 'visitors', unit: 'viewers', desc: 'Total visitors welcomed.' },
  { id: 'rec-best', name: 'Best Stream', stat: 'bestRun', unit: '$', desc: 'Best single-stream payout.' },
  { id: 'rec-streak', name: 'Longest Streak', stat: 'bestStreak', unit: 'streams', desc: 'Longest run of streams.' },
];

export const STREAMING_MARKET_EVENTS = [
  { id: 'me-gaming', name: 'Gaming Boom', item: 'gaming-live', mult: 1.35, desc: 'A new game drops and everyone streams it.' },
  { id: 'me-chat', name: 'Chat Slump', item: 'just-chatting', mult: 0.7, desc: 'Talk streams cool off.' },
  { id: 'me-music', name: 'Music Surge', item: 'music-jam', mult: 1.35, desc: 'A festival sends fans to music streams.' },
  { id: 'me-cook', name: 'Cooking Cool', item: 'cooking-show', mult: 0.7, desc: 'The kitchen is quiet this week.' },
  { id: 'me-speed', name: 'Speedrun Fever', item: 'speedrun-central', mult: 1.35, desc: 'A world record falls live on air.' },
  { id: 'me-art', name: 'Art Dip', item: 'art-studio', mult: 0.7, desc: 'The brushes rest this week.' },
  { id: 'me-talk', name: 'Talk Boom', item: 'talk-show', mult: 1.35, desc: 'A celebrity guest draws a huge crowd.' },
  { id: 'me-esports', name: 'Cast Fade', item: 'esports-cast', mult: 0.7, desc: 'The league takes a break.' },
  { id: 'me-fitness', name: 'Fitness Rush', item: 'fitness-live', mult: 1.35, desc: 'New year, new workout streams.' },
  { id: 'me-travel', name: 'Travel Lull', item: 'travel-vlog', mult: 0.7, desc: 'The road is quiet this week.' },
  { id: 'me-tech', name: 'Tech Surge', item: 'tech-review', mult: 1.35, desc: 'A big launch fills the review channels.' },
  { id: 'me-mega', name: 'Mega Cool', item: 'mega-event', mult: 0.7, desc: 'The big event rests until next year.' },
];

export const STREAMING_SEASONS = [
  { id: 'summer', name: 'Summer', mult: 1.1, desc: 'Long nights, big audiences.' },
  { id: 'autumn', name: 'Autumn', mult: 1.0, desc: 'Steady evening streams.' },
  { id: 'winter', name: 'Winter', mult: 0.9, desc: 'Quiet nights indoors.' },
  { id: 'spring', name: 'Spring', mult: 1.05, desc: 'Fresh faces join the chat.' },
];

export const STREAMING_FACTS = [
  { id: 'fact-gaming', text: 'The Gaming Live channel once streamed for 24 hours straight.' },
  { id: 'fact-chat', text: 'Just Chatting started as a test stream with three viewers.' },
  { id: 'fact-music', text: 'Music Jam viewers have requested 10,000 songs.' },
  { id: 'fact-cook', text: 'The Cooking Show once set off the smoke alarm live.' },
  { id: 'fact-speed', text: 'Speedrun Central holds three world records.' },
  { id: 'fact-art', text: 'Art Studio chat once drew a whole mural together.' },
  { id: 'fact-talk', text: 'The Talk Show guest list reads like a phone book.' },
  { id: 'fact-esports', text: 'Esports Cast commentary is clipped daily by fans.' },
  { id: 'fact-fitness', text: 'Fitness Live viewers have done a million squats.' },
  { id: 'fact-travel', text: 'Travel Vlog has filmed in 40 cities.' },
  { id: 'fact-tech', text: 'Tech Review once dropped a phone into a fish tank.' },
  { id: 'fact-mega', text: 'The Mega Event crashed the site twice.' },
  { id: 'fact-1', text: 'The first live stream was a coffee pot camera in 1991.' },
  { id: 'fact-2', text: 'Raids send one channel\'s viewers to another.' },
  { id: 'fact-3', text: 'Emotes started as tiny pictures in chat.' },
  { id: 'fact-4', text: 'A hype train is a burst of subs in a row.' },
  { id: 'fact-5', text: 'Mods are volunteers who keep chat safe.' },
  { id: 'fact-6', text: 'Some streamers earn more from subs than from ads.' },
  { id: 'fact-7', text: 'Clips let fans share the best ten seconds.' },
  { id: 'fact-8', text: 'The longest stream ever ran for over a month.' },
  { id: 'fact-9', text: 'Chat moves so fast that mods read it in slow mode.' },
  { id: 'fact-10', text: 'A good raid can double a small channel overnight.' },
];

export const STREAMING_NPC_LINES = [
  { id: 'npc-1', text: 'First time here, this stream is amazing!' },
  { id: 'npc-2', text: 'I have watched every stream this month.' },
  { id: 'npc-3', text: 'That clutch play just broke chat.' },
  { id: 'npc-4', text: 'Can we get some emotes in the chat?' },
  { id: 'npc-5', text: 'I subbed after that last song.' },
  { id: 'npc-6', text: 'The mods here are the best.' },
  { id: 'npc-7', text: 'I came from a raid and I am staying.' },
  { id: 'npc-8', text: 'That recipe actually worked, thank you!' },
  { id: 'npc-9', text: 'My whole class watches this channel.' },
  { id: 'npc-10', text: 'The hype train is unreal tonight.' },
  { id: 'npc-11', text: 'I clipped that, it is going viral.' },
  { id: 'npc-12', text: 'Best way to end the day.' },
  { id: 'npc-13', text: 'That guest was a legend.' },
  { id: 'npc-14', text: 'I learned to draw from this stream.' },
  { id: 'npc-15', text: 'Chat is so fast I can barely read it.' },
  { id: 'npc-16', text: 'See you all tomorrow, same time!' },
];

export const STREAMING_GUIDE = [
  { id: 'guide-1', text: 'Step 1: Unlock a stream category from the list.' },
  { id: 'guide-2', text: 'Step 2: Pay the unlock cost from your cash.' },
  { id: 'guide-3', text: 'Step 3: Go live to start the stream.' },
  { id: 'guide-4', text: 'Step 4: Watch viewers grow while you stream.' },
  { id: 'guide-5', text: 'Step 5: Collect the stream revenue from the till.' },
  { id: 'guide-6', text: 'Step 6: Host a raid to win new followers.' },
  { id: 'guide-7', text: 'Step 7: Spend earnings on studio upgrades.' },
  { id: 'guide-8', text: 'Step 8: Hire mods and editors for the channel.' },
  { id: 'guide-9', text: 'Step 9: Level up categories to raise their value.' },
  { id: 'guide-10', text: 'Step 10: Watch market events for hot categories.' },
  { id: 'guide-11', text: 'Step 11: Claim challenges as you hit each goal.' },
  { id: 'guide-12', text: 'Step 12: Donate to charity streams for reputation.' },
  { id: 'guide-13', text: 'Step 13: Check the price board before selling.' },
  { id: 'guide-14', text: 'Step 14: Keep streaming to grow your streak.' },
  { id: 'guide-15', text: 'Step 15: Trade in bulk when the market is hot.' },
  { id: 'guide-16', text: 'Step 16: Become a Streaming Legend.' },
];

export const STREAMING_META = { system: 'streaming', version: '7-B4', author: 'builder-4', mechanic: 'stream', dataCount: 12, dataName: 'STREAM_CATEGORIES' };

function streamingFreshState() {
  const drift = {};
  const holdings = {};
  const prices = {};
  for (const cat of STREAM_CATEGORIES) {
    drift[cat.id] = 0;
    holdings[cat.id] = 0;
    prices[cat.id] = cat.price;
  }
  return {
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
}

export function createStreamingSystem(ctx) {
  const c = ctx || {};
  const rng = typeof c.rng === 'function' ? c.rng : Math.random;
  const getDay = typeof c.getDay === 'function' ? c.getDay : () => 1;
  const getHour = typeof c.getHour === 'function' ? c.getHour : () => 12;
  const getCash = typeof c.getCash === 'function' ? c.getCash : () => 0;
  const addCash = typeof c.addCash === 'function' ? c.addCash : () => {};
  const addHeat = typeof c.addHeat === 'function' ? c.addHeat : () => {};
  const log = typeof c.log === 'function' ? c.log : () => {};
  const getWeather = typeof c.getWeather === 'function' ? c.getWeather : () => ({ condition: 'clear' });

  const state = streamingFreshState();

  function gainXp(n) {
    state.xp += n;
    const lvl = streamingRankFor(state.xp);
    if (lvl > state.rank) {
      state.rank = lvl;
      log('Rank up! You are now ' + streamingRankNameFor(lvl) + '.');
    }
  }

  function unlockCategory(id) {
    const item = streamingItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (state.owned[id]) return { ok: false, reason: 'already-owned', id };
    const cap = streamingCapacityFor(state.rank, state.upgrades);
    if (state.itemsOwned >= cap) return { ok: false, reason: 'capacity-full', cap };
    const need = Math.max(0, item.difficulty - 2);
    if (state.rank < need) return { ok: false, reason: 'rank-too-low', rank: need };
    const cost = streamingPriceFor(id, state.drift[id] || 0, 0, []);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned[id] = 1;
    state.levels[id] = 1;
    state.itemsOwned += 1;
    gainXp(10);
    log('Unlocked category ' + item.name + ' for $' + cost + '.');
    return { ok: true, id, cost, name: item.name };
  }

  function goLive(id) {
    const item = streamingItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (state.active) return { ok: false, reason: 'already-running', active: state.activeId };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    state.active = 'stream';
    state.activeId = id;
    state.activeTimer = 60;
    state.activeBase = item.price;
    log('You are live with ' + item.name + '!');
    return { ok: true, id, seconds: 60 };
  }

  function settleRun() {
    const item = streamingItemById(state.activeId);
    const doneId = state.activeId;
    const payout = Math.max(5, Math.round(state.viewers * 0.05 + state.subs * 2 + (item ? item.price : 0) * 0.2));
    const newSubs = Math.floor(state.viewers * 0.02) + (rng() < 0.5 ? 1 : 0);
    const newFollowers = Math.floor(state.viewers * 0.05);
    state.active = null;
    state.activeId = null;
    state.activeTimer = 0;
    state.subs += newSubs;
    state.followers += newFollowers;
    if (state.viewers > state.peakViewers) state.peakViewers = state.viewers;
    state.streamMinutes += 60;
    state.visitors += newSubs;
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
    gainXp(20 + newSubs);
    log('Stream ' + (item ? item.name : doneId) + ' ended with ' + state.viewers + ' viewers, ' + newSubs + ' new subs, and $' + payout + '.');
  }

  function collectStreamRevenue() {
    if (state.pending <= 0) return { ok: false, reason: 'nothing-pending' };
    const amount = state.pending;
    state.pending = 0;
    state.earned += amount;
    addCash(amount);
    log('Collected $' + amount + ' in stream revenue.');
    return { ok: true, amount };
  }

  function sellMerch(id) {
    const item = streamingItemById(id);
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
  }

  function hostRaid() {
    const gained = 5 + Math.floor(rng() * 20);
    state.followers += gained;
    state.reputation += 1;
    gainXp(10);
    log('Hosted a raid and gained ' + gained + ' followers.');
    return { ok: true, followers: gained };
  }

  function buyUpgrade(id) {
    const up = streamingUpgradeById(id);
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
  }

  function hireStaff(id) {
    const s = streamingStaffById(id);
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
  }

  function fireStaff(id) {
    const at = state.staff.indexOf(id);
    if (at < 0) return { ok: false, reason: 'not-hired', id };
    state.staff.splice(at, 1);
    log('Let go of staff member ' + id + '.');
    return { ok: true, id };
  }

  function upgradeItem(id) {
    const item = streamingItemById(id);
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
  }

  function priceBoard() {
    return STREAM_CATEGORIES.map((it) => ({
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
  }

  function listItems() {
    return STREAM_CATEGORIES.map((it) => ({
      id: it.id, name: it.name, price: it.price, difficulty: it.difficulty, rarity: it.rarity, desc: it.desc, owned: !!state.owned[it.id],
    }));
  }

  function info(id) {
    const item = streamingItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    return { ok: true, item, owned: !!state.owned[id], level: state.levels[id] || 0, price: state.prices[id], holdings: state.holdings[id] || 0 };
  }

  function dailyEvent() {
    if (STREAMING_DAILY_EVENTS.length === 0) return { event: 'none', name: '', effect: '', amount: 0 };
    const ev = STREAMING_DAILY_EVENTS[Math.floor(rng() * STREAMING_DAILY_EVENTS.length)];
    if (ev.effect === 'earn') state.pending += ev.amount;
    else if (ev.effect === 'cost') {
      if (getCash() >= ev.amount) {
        addCash(-ev.amount);
        state.spent += ev.amount;
      }
    } else if (ev.effect === 'rep') state.reputation += ev.amount;
    else if (ev.effect === 'visitors') {
      state.visitors += ev.amount;
      state.dailyVisitors += ev.amount;
    } else if (ev.effect === 'heat') {
      state.heat += ev.amount;
      addHeat(ev.amount);
    } else if (ev.effect === 'xp') gainXp(ev.amount);
    log(ev.text);
    return { event: ev.id, name: ev.name, effect: ev.effect, amount: ev.amount };
  }

  function tick(dt) {
    if (!state.active) return;
    const growth = 2 + state.followers * 0.01 + state.rank;
    state.viewers += growth * dt;
    let secondsLeft = Math.floor(dt);
    while (secondsLeft > 0) {
      if (rng() < 0.1) state.subs += 1;
      secondsLeft -= 1;
    }
    state.activeTimer -= dt;
    if (state.activeTimer <= 0) {
      state.activeTimer = 0;
      settleRun();
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return null;
    state.lastDay = day;
    for (const it of STREAM_CATEGORIES) {
      if (rng() < 0.35) {
        const shift = Math.round((rng() * 0.24 - 0.12) * 100) / 100;
        const next = Math.round(((state.drift[it.id] || 0) + shift) * 100) / 100;
        state.drift[it.id] = next;
        state.prices[it.id] = Math.max(1, Math.round(it.price * (1 + next) * 10) / 10);
      }
    }
    state.dailyEarned = 0;
    state.dailyVisitors = 0;
    state.attendanceToday = 0;
    state.occupancy = 0;
    if (state.subs > 0 && rng() < 0.3) state.subs -= 1;
    return dailyEvent();
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    for (const k of Object.keys(saved)) state[k] = saved[k];
    if (!state.drift || typeof state.drift !== 'object') state.drift = {};
    if (!state.prices || typeof state.prices !== 'object') state.prices = {};
    if (!state.holdings || typeof state.holdings !== 'object') state.holdings = {};
    for (const it of STREAM_CATEGORIES) {
      if (state.drift[it.id] === undefined) state.drift[it.id] = 0;
      if (state.prices[it.id] === undefined) state.prices[it.id] = it.price;
      if (state.holdings[it.id] === undefined) state.holdings[it.id] = 0;
    }
    if (!state.owned || typeof state.owned !== 'object') state.owned = {};
    if (!state.levels || typeof state.levels !== 'object') state.levels = {};
    if (!state.boosted || typeof state.boosted !== 'object') state.boosted = {};
    state.rank = streamingRankFor(state.xp);
  }

  function stats() {
    const holdingsCount = Object.keys(state.holdings).reduce((sum, k) => sum + (state.holdings[k] || 0), 0);
    return {
      name: 'Streaming',
      mechanic: 'stream',
      rank: streamingRankNameFor(state.rank),
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
    if (state.active) return 'Streaming: running ' + state.activeId + ' - ' + Math.ceil(state.activeTimer) + 's left';
    if (state.pending > 0) return 'Streaming: $' + state.pending + ' waiting in the till';
    if (state.itemsOwned > 0) return 'Streaming: ' + state.itemsOwned + ' entries, $' + state.earned + ' earned';
    return '';
  }

  function interact(action, a, b) {
    if (!action || action === 'status') {
      return { ok: true, stats: stats(), hint: 'open a category to unlock it, run a category to go live, collect to claim revenue' };
    }
    if (action === 'open') return unlockCategory(a);
    if (action === 'run') return goLive(a);
    if (action === 'collect') return collectStreamRevenue();
    if (action === 'sell') return sellMerch(a, b);
    if (action === 'upgrade' || action === 'levelup') return upgradeItem(a);
    if (action === 'hire') return hireStaff(a);
    if (action === 'fire') return fireStaff(a);
    if (action === 'special') return hostRaid(a);
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
    upgrade: upgradeItem,
    hire: hireStaff,
  };
}

export function createStreamingExtras(system) {
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  function challenges() {
    return STREAMING_CHALLENGES.map((ch) => streamingChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = STREAMING_CHALLENGES.find((c) => c.id === id);
    if (!ch) return { ok: false, reason: 'unknown-challenge', id };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed', id };
    const prog = streamingChallengeProgress(ch, system.state);
    if (!prog.done) return { ok: false, reason: 'not-done', id, have: prog.have, goal: prog.goal };
    claimed.push(id);
    system.state.challengesClaimed.push(id);
    system.gainXp(ch.xp);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return STREAMING_ACHIEVEMENTS.map((a) => {
      const have = Math.floor(system.state[a.target] || 0);
      return { id: a.id, name: a.name, desc: a.desc, target: a.target, goal: a.goal, have, done: have >= a.goal };
    });
  }

  function hireHelper(id) {
    const s = streamingStaffById(id);
    if (!s) return { ok: false, reason: 'unknown-staff', id };
    if (helpers.includes(id)) return { ok: false, reason: 'already-hired', id };
    helpers.push(id);
    return { ok: true, id, name: s.name, wage: s.wage };
  }

  function fireHelper(id) {
    const at = helpers.indexOf(id);
    if (at < 0) return { ok: false, reason: 'not-hired', id };
    helpers.splice(at, 1);
    return { ok: true, id };
  }

  function payWages() {
    let due = 0;
    for (const hid of helpers) {
      const s = streamingStaffById(hid);
      if (s) due += s.wage;
    }
    wagesPaid += due;
    system.state.wagesPaid += due;
    return { due, helpers: helpers.length, totalPaid: wagesPaid };
  }

  function helperBonus(skill) {
    let total = 0;
    for (const hid of helpers) {
      const s = streamingStaffById(hid);
      if (s && s.skill === skill) total += s.bonus;
    }
    return total;
  }

  function donate(amount) {
    if (!amount || amount <= 0) return { ok: false, reason: 'bad-amount', amount };
    system.state.donations += amount;
    const rep = Math.floor(amount / 100);
    system.state.reputation += rep;
    return { ok: true, amount, reputation: rep };
  }

  function quickBoost(id) {
    if (!streamingItemById(id)) return { ok: false, reason: 'unknown-item', id };
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
      id: s.id, name: s.name, wage: s.wage, skill: s.skill, hired: helpers.includes(s.id) || system.state.staff.includes(s.id),
    }));
  }

  function upgradeCatalog() {
    return STREAMING_UPGRADES.map((u) => ({
      id: u.id, name: u.name, cost: u.cost, effect: u.effect, desc: u.desc, owned: system.state.upgrades.includes(u.id),
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
    get wagesPaid() { return wagesPaid; },
  };
}

export function createStreamingMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  function setEvent(id) {
    const found = STREAMING_MARKET_EVENTS.find((e) => e.id === id);
    if (!found) return { ok: false, reason: 'unknown-event', id };
    currentEvent = id;
    return { ok: true, event: id };
  }

  function setSeason(id) {
    const found = STREAMING_SEASONS.find((x) => x.id === id);
    if (!found) return { ok: false, reason: 'unknown-season', id };
    currentSeason = id;
    return { ok: true, season: id };
  }

  function eventPrice(itemId, basePrice) {
    return Math.round(basePrice * streamingMarketEventMult(currentEvent, itemId) * streamingSeasonMult(currentSeason) * 10) / 10;
  }

  function bulkDeal(itemId, qty) {
    const item = streamingItemById(itemId);
    if (!item) return { ok: false, reason: 'unknown-item', id: itemId };
    if (!qty || qty < 5) return { ok: false, reason: 'too-few', qty };
    const unit = eventPrice(itemId, item.price);
    const total = Math.round(unit * qty * 1.1 * 10) / 10;
    system.state.pending += total;
    system.state.dailyEarned += total;
    bulkTraded += qty;
    dealsClaimed += 1;
    return { ok: true, total, qty, unit, bonus: 'bulk +10%' };
  }

  function dailyDeals() {
    const rows = [];
    for (const it of STREAM_CATEGORIES) {
      const mult = streamingMarketEventMult(currentEvent, it.id);
      if (mult !== 1) rows.push({ item: it.id, name: it.name, mult, event: currentEvent });
    }
    return rows;
  }

  function marketSummary() {
    return { event: currentEvent, season: currentSeason, dealsClaimed, bulkTraded, deals: dailyDeals() };
  }

  function seasonPrices() {
    return STREAM_CATEGORIES.map((it) => ({ id: it.id, name: it.name, price: eventPrice(it.id, it.price) }));
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

function streamingCondStr(weather) {
  if (typeof weather === 'string') return weather;
  if (weather && typeof weather.condition === 'string') return weather.condition;
  return 'clear';
}

function streamingSky(table, weather) {
  const hit = table[streamingCondStr(weather)];
  return hit === undefined ? 1 : hit;
}

function streamingRoundDec(n) {
  return Math.round(n * 10) / 10;
}

export function streamingRankFor(xp) {
  let lvl = 0;
  STREAMING_RANKS.forEach((r) => {
    if (xp >= r.xp) lvl = r.level;
  });
  return lvl;
}

export function streamingItemById(id) {
  const hit = STREAM_CATEGORIES.filter((i) => i.id === id);
  return hit.length ? hit[0] : null;
}

export function streamingPriceFor(id, drift, rank, upgrades) {
  const item = streamingItemById(id);
  if (!item) return 0;
  let p = item.price * (1 + (drift || 0)) * (1 + (rank || 0) * 0.05);
  if (upgrades && upgrades.length >= 3) p *= 1.1;
  return Math.max(1, streamingRoundDec(p));
}

export function streamingCapacityFor(rank, upgrades) {
  let cap = 3 + (rank || 0);
  if (upgrades && upgrades.indexOf('studio-room') !== -1) cap += 2;
  return cap;
}

export function streamingPayoutFor(item, rank, upgrades, weather, boosted) {
  if (!item) return 0;
  let mult = 0.6 + (rank || 0) * 0.1 + (boosted ? 0.3 : 0);
  mult *= streamingSky({ rain: 1.05, sunny: 1.0, storm: 0.7 }, weather);
  if (upgrades && upgrades.length >= 4) mult *= 1.15;
  return Math.max(5, Math.round(item.price * mult));
}

export function streamingCrowdFor(item, rank, weather) {
  const base = 10 + (item ? item.difficulty : 0) * 8 + (rank || 0) * 5;
  return Math.max(1, Math.round(base * streamingSky({ rain: 1.05, sunny: 1.0, storm: 0.5 }, weather)));
}

export function streamingUpgradeById(id) {
  const hit = STREAMING_UPGRADES.filter((u) => u.id === id);
  return hit.length ? hit[0] : null;
}

export function streamingStaffById(id) {
  const hit = STREAMING_STAFF.filter((s) => s.id === id);
  return hit.length ? hit[0] : null;
}

export function streamingEventById(id) {
  const daily = STREAMING_DAILY_EVENTS.filter((e) => e.id === id);
  if (daily.length) return daily[0];
  const market = STREAMING_MARKET_EVENTS.filter((e) => e.id === id);
  return market.length ? market[0] : null;
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
  return step >= 0 && step < STREAMING_GUIDE.length ? STREAMING_GUIDE[step] : null;
}

export function streamingSeasonMult(seasonId) {
  const hit = STREAMING_SEASONS.filter((s) => s.id === seasonId);
  return hit.length ? hit[0].mult : 1;
}

export function streamingMarketEventMult(eventId, itemId) {
  if (!eventId) return 1;
  const hit = STREAMING_MARKET_EVENTS.filter((e) => e.id === eventId);
  if (!hit.length) return 1;
  return hit[0].item === itemId ? hit[0].mult : 1;
}

export function streamingWeeklyGoal(state) {
  const runs = { have: state.runsDone, goal: 5, done: state.runsDone >= 5 };
  const earned = { have: state.earned, goal: 500, done: state.earned >= 500 };
  const visitors = { have: state.visitors, goal: 100, done: state.visitors >= 100 };
  return { runs, earned, visitors, allDone: runs.done && earned.done && visitors.done };
}

export function streamingEfficiency(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 100;
  return Math.round((state.runsDone / total) * 100);
}

export function streamingProfitPerRun(state) {
  if (state.runsDone === 0) return 0;
  return streamingRoundDec(state.earned / state.runsDone);
}

export function streamingInventoryValue(state) {
  let sum = 0;
  Object.keys(state.owned).forEach((id) => {
    const item = streamingItemById(id);
    if (item) sum += item.price * (state.levels[id] || 1);
  });
  return streamingRoundDec(sum);
}

export function streamingSummary(state) {
  return 'Streaming at rank ' + streamingRankNameFor(state.rank) + ': ' + state.runsDone + ' runs, ' + state.itemsOwned + ' entries, $' + state.earned + ' earned, ' + state.visitors + ' visitors.';
}

export function streamingNextGoal(state) {
  if (state.itemsOwned === 0) return 'Open your first entry.';
  if (state.runsDone < 5) return 'Finish 5 runs.';
  if (state.earned < 500) return 'Earn $500 in total.';
  if (state.rank < 2) return 'Reach rank ' + streamingRankNameFor(2) + '.';
  if (state.upgradesOwned < 4) return 'Own 4 upgrades.';
  return 'Become a legend of the Streaming.';
}

export function streamingRecordFor(id, state) {
  const hit = STREAMING_RECORDS.filter((r) => r.id === id);
  if (!hit.length) return null;
  const rec = hit[0];
  return { id: rec.id, name: rec.name, stat: rec.stat, unit: rec.unit, desc: rec.desc, value: state[rec.stat] === undefined ? 0 : state[rec.stat] };
}

export function streamingAllRecords(state) {
  return STREAMING_RECORDS.map((r) => streamingRecordFor(r.id, state));
}

export function streamingLeaderboardWith(score) {
  const board = STREAMING_LEADERBOARD.map((e) => (e.name === 'You' ? { name: e.name, score, desc: e.desc } : { name: e.name, score: e.score, desc: e.desc }));
  board.sort((a, b) => b.score - a.score);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, score: e.score, desc: e.desc }));
}

export function streamingSeasonReport(state, seasonId) {
  const mult = streamingSeasonMult(seasonId);
  return STREAM_CATEGORIES.map((it) => ({
    id: it.id,
    name: it.name,
    basePrice: it.price,
    seasonPrice: streamingRoundDec(it.price * mult),
    owned: !!state.owned[it.id],
    level: state.levels[it.id] || 0,
  }));
}

export function streamingChallengeProgress(challenge, state) {
  const have = Math.floor(state[challenge.target] || 0);
  return { id: challenge.id, name: challenge.name, have, goal: challenge.goal, done: have >= challenge.goal, xp: challenge.xp };
}

export function streamingBestEntryFor(rank) {
  let best = null;
  let bestScore = -1;
  STREAM_CATEGORIES.forEach((it) => {
    if (it.difficulty > rank + 2) return;
    const score = (it.price * (1 + it.rarity * 2)) / it.difficulty;
    if (score > bestScore) {
      bestScore = score;
      best = it;
    }
  });
  return best;
}

export function streamingEventFor(day) {
  return STREAMING_MARKET_EVENTS[day % STREAMING_MARKET_EVENTS.length];
}

export function streamingDailyEventFor(day) {
  return STREAMING_DAILY_EVENTS[day % STREAMING_DAILY_EVENTS.length];
}

export function streamingRankNameFor(level) {
  const hit = STREAMING_RANKS.filter((r) => r.level === level);
  return hit.length ? hit[0].name : 'Unknown';
}

export function streamingTotalValue(state) {
  return streamingRoundDec(streamingInventoryValue(state) + state.pending + state.earned);
}

export function streamingProgressPercent(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 0;
  return Math.round((state.runsDone / total) * 100);
}

export function streamingStaffBonusFor(staffIds, skill) {
  let total = 0;
  staffIds.forEach((id) => {
    const s = streamingStaffById(id);
    if (s && s.skill === skill) total += s.bonus;
  });
  return total;
}

export function streamingCheapestEntry() {
  let best = STREAM_CATEGORIES[0];
  STREAM_CATEGORIES.forEach((it) => {
    if (it.price < best.price) best = it;
  });
  return best;
}

export function streamingPriciestEntry() {
  let best = STREAM_CATEGORIES[0];
  STREAM_CATEGORIES.forEach((it) => {
    if (it.price > best.price) best = it;
  });
  return best;
}

export function streamingEntriesByDifficulty(difficulty) {
  return STREAM_CATEGORIES.filter((it) => it.difficulty === difficulty).map((it) => it.id);
}

export function streamingEntriesByRarity(maxRarity) {
  return STREAM_CATEGORIES.filter((it) => it.rarity <= maxRarity).map((it) => it.id);
}

export function streamingGradeFor(runsDone, earned, visitors) {
  const score = runsDone * 10 + Math.round(earned / 10) + Math.floor(visitors / 10);
  if (score >= 500) return 'S';
  if (score >= 300) return 'A';
  if (score >= 150) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}
