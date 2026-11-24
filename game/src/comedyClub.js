export const COMEDY_ACTS = [
  { id: 'open-mic-night', name: 'Open Mic Night', price: 80, rarity: 0.2, difficulty: 1, style: 'Stand-up', duration: 60, crowd: 30, desc: 'Brave newcomers testing five minutes of nerves.' },
  { id: 'improv-troupe', name: 'Improv Troupe', price: 140, rarity: 0.35, difficulty: 1, style: 'Improv', duration: 75, crowd: 40, desc: 'A whole show invented from one audience word.' },
  { id: 'one-liner-king', name: 'One-Liner King', price: 160, rarity: 0.4, difficulty: 2, style: 'Stand-up', duration: 70, crowd: 45, desc: 'Ninety jokes an hour, no mercy for the slow.' },
  { id: 'musical-comic', name: 'Musical Comic', price: 190, rarity: 0.45, difficulty: 2, style: 'Musical', duration: 80, crowd: 50, desc: 'Songs about landlords, laundry and lost love.' },
  { id: 'roast-battle', name: 'Roast Battle', price: 240, rarity: 0.55, difficulty: 3, style: 'Roast', duration: 90, crowd: 65, desc: 'Two comics, one stage, no survivors.' },
  { id: 'sketch-crew', name: 'Sketch Crew', price: 210, rarity: 0.5, difficulty: 2, style: 'Sketch', duration: 85, crowd: 55, desc: 'Quick scenes, wild wigs and perfect timing.' },
  { id: 'prop-master', name: 'Prop Master', price: 130, rarity: 0.3, difficulty: 1, style: 'Prop', duration: 65, crowd: 35, desc: 'A suitcase of tricks and a rubber chicken.' },
  { id: 'dark-humor', name: 'Dark Humor', price: 230, rarity: 0.6, difficulty: 3, style: 'Stand-up', duration: 75, crowd: 60, desc: 'Jokes that make the room gasp, then howl.' },
  { id: 'clean-comedy', name: 'Clean Comedy', price: 170, rarity: 0.4, difficulty: 2, style: 'Family', duration: 70, crowd: 48, desc: 'Grandma-approved laughs for the whole family.' },
  { id: 'clown-car', name: 'Clown Car Act', price: 120, rarity: 0.35, difficulty: 1, style: 'Slapstick', duration: 60, crowd: 38, desc: 'Pies, pratfalls and a car that never stops.' },
  { id: 'ventriloquist', name: 'Ventriloquist', price: 260, rarity: 0.65, difficulty: 3, style: 'Ventriloquism', duration: 80, crowd: 62, desc: 'A wooden dummy with a sharper tongue than its owner.' },
  { id: 'headliner-gala', name: 'Headliner Gala', price: 480, rarity: 0.9, difficulty: 5, style: 'Stand-up', duration: 120, crowd: 95, desc: 'The biggest name in comedy, one night only.' },
];

export const COMEDY_UPGRADES = [
  { id: 'brick-wall', name: 'Brick Wall', cost: 100, effect: 'crowd +10%', desc: 'The classic comedy backdrop, freshly painted.' },
  { id: 'grand-stage', name: 'Grand Stage', cost: 300, effect: 'capacity +2', desc: 'A wider stage for bigger bills.' },
  { id: 'spotlight', name: 'Spotlight', cost: 150, effect: 'payout +10%', desc: 'One perfect circle of light.' },
  { id: 'two-drink-min', name: 'Two-Drink Minimum', cost: 180, effect: 'earned +8%', desc: 'Looser crowds laugh louder.' },
  { id: 'late-show', name: 'Late Show', cost: 220, effect: 'crowd +15%', desc: 'A midnight slot for the brave.' },
  { id: 'sound-booth', name: 'Sound Booth', cost: 160, effect: 'visitors +10%', desc: 'Every punchline lands clean.' },
  { id: 'vip-couch', name: 'VIP Couch', cost: 260, effect: 'payout +15%', desc: 'Front-row comfort for big spenders.' },
  { id: 'house-band', name: 'House Band', cost: 240, effect: 'crowd +12%', desc: 'A trio that plays comics on and off.' },
];

export const COMEDY_RANKS = [
  { level: 0, name: 'Open Mic Rookie', xp: 0, perk: 'Still bombing gracefully.' },
  { level: 1, name: 'Club Regular', xp: 150, perk: 'The crowd knows your name.' },
  { level: 2, name: 'Headliner', xp: 400, perk: 'Your face is on the poster.' },
  { level: 3, name: 'Comedy Star', xp: 800, perk: 'Sold-out weekends, every week.' },
  { level: 4, name: 'Comedy Legend', xp: 1500, perk: 'They named the room after you.' },
];

export const COMEDY_STAFF = [
  { id: 'host-milo', name: 'Milo the Host', wage: 45, skill: 'host', bonus: 2, desc: 'Warms the room before every act.' },
  { id: 'bouncer-rae', name: 'Rae the Bouncer', wage: 40, skill: 'security', bonus: 2, desc: 'Handles hecklers with a smile.' },
  { id: 'bartender-kim', name: 'Kim the Bartender', wage: 50, skill: 'bar', bonus: 3, desc: 'Pours fast and remembers every order.' },
  { id: 'tech-sam', name: 'Sam the Sound Tech', wage: 55, skill: 'tech', bonus: 2, desc: 'Keeps the mic live and the feedback dead.' },
];

export const COMEDY_DAILY_EVENTS = [
  { id: 'heckler-night', name: 'Heckler Night', effect: 'heat', amount: 2, text: 'A loud table will not stop talking back.' },
  { id: 'viral-bit', name: 'Viral Bit', effect: 'visitors', amount: 28, text: 'A clip of last night explodes online.' },
  { id: 'corporate-gig', name: 'Corporate Gig', effect: 'earn', amount: 110, text: 'A company books the whole room for a party.' },
  { id: 'mic-failure', name: 'Mic Failure', effect: 'cost', amount: 30, text: 'The main mic dies mid-set; a spare costs money.' },
  { id: 'date-night', name: 'Date Night', effect: 'visitors', amount: 18, text: 'Couples fill the tables for a laugh.' },
  { id: 'review-boost', name: 'Review Boost', effect: 'rep', amount: 3, text: 'A critic calls the club the funniest in town.' },
  { id: 'open-mic-gem', name: 'Open Mic Gem', effect: 'xp', amount: 22, text: 'A nobody steals the night with five perfect minutes.' },
  { id: 'leaky-ceiling', name: 'Leaky Ceiling', effect: 'cost', amount: 25, text: 'Rain drips onto the front row.' },
  { id: 'sold-out', name: 'Sold Out', effect: 'earn', amount: 140, text: 'Every seat taken, standing room only.' },
  { id: 'quiet-tuesday', name: 'Quiet Tuesday', effect: 'rep', amount: 1, text: 'A small crowd, but they laugh at everything.' },
];

export const COMEDY_TIPS = [
  { id: 'tip-rain', name: 'Rainy Nights', text: 'Rain pushes people indoors and onto your seats.' },
  { id: 'tip-stage', name: 'Grand Stage', text: 'Buy the Grand Stage to book two more acts.' },
  { id: 'tip-mic', name: 'Open Mic', text: 'Host an open mic to boost an act before its show.' },
  { id: 'tip-streak', name: 'Keep Laughing', text: 'Nightly shows grow your streak fast.' },
  { id: 'tip-prices', name: 'Price Watch', text: 'Door prices drift every day, so check the board.' },
  { id: 'tip-staff', name: 'Good Hosts', text: 'A warm host turns a cold room into a hot one.' },
  { id: 'tip-donate', name: 'Give Back', text: 'Free shows for the youth centre build reputation.' },
  { id: 'tip-rank', name: 'Climb Up', text: 'Every show played pushes you toward Headliner.' },
];

export const COMEDY_CHALLENGES = [
  { id: 'ch-runs-5', name: 'Five Shows', target: 'runsDone', goal: 5, xp: 50, desc: 'Run 5 shows.' },
  { id: 'ch-earn-500', name: 'First 500', target: 'earned', goal: 500, xp: 80, desc: 'Earn $500 in total.' },
  { id: 'ch-visitors-200', name: 'Packed Room', target: 'visitors', goal: 200, xp: 60, desc: 'Welcome 200 visitors.' },
  { id: 'ch-items-4', name: 'Four Acts', target: 'itemsOwned', goal: 4, xp: 70, desc: 'Book 4 acts.' },
  { id: 'ch-upgrades-3', name: 'Well Equipped', target: 'upgradesOwned', goal: 3, xp: 60, desc: 'Own 3 upgrades.' },
  { id: 'ch-rep-10', name: 'Respected', target: 'reputation', goal: 10, xp: 50, desc: 'Reach 10 reputation.' },
  { id: 'ch-streak-3', name: 'On a Roll', target: 'streak', goal: 3, xp: 90, desc: 'Reach a 3-show streak.' },
  { id: 'ch-best-300', name: 'Killer Set', target: 'bestRun', goal: 300, xp: 100, desc: 'Earn $300 from a single show.' },
];

export const COMEDY_ACHIEVEMENTS = [
  { id: 'ach-runs-10', name: 'Show Runner', target: 'runsDone', goal: 10, desc: 'Run 10 shows.' },
  { id: 'ach-earn-1000', name: 'Golden Door', target: 'earned', goal: 1000, desc: 'Earn $1,000 in total.' },
  { id: 'ach-visitors-500', name: 'City Favourite', target: 'visitors', goal: 500, desc: 'Welcome 500 visitors.' },
  { id: 'ach-items-6', name: 'Full Lineup', target: 'itemsOwned', goal: 6, desc: 'Book 6 acts.' },
  { id: 'ach-upgrades-5', name: 'Fully Loaded', target: 'upgradesOwned', goal: 5, desc: 'Own 5 upgrades.' },
  { id: 'ach-rep-20', name: 'Beloved', target: 'reputation', goal: 20, desc: 'Reach 20 reputation.' },
  { id: 'ach-streak-5', name: 'Unstoppable', target: 'streak', goal: 5, desc: 'Reach a 5-show streak.' },
  { id: 'ach-best-500', name: 'Record Night', target: 'bestRun', goal: 500, desc: 'Earn $500 from a single show.' },
];

export const COMEDY_LEADERBOARD = [
  { name: 'Laugh Factory', score: 920, desc: 'The old club across town.' },
  { name: 'Joke Joint', score: 700, desc: 'Tiny room, huge laughs.' },
  { name: 'The Giggle Room', score: 480, desc: 'A basement with a big heart.' },
  { name: 'Punchline Pub', score: 190, desc: 'New kids on the block.' },
  { name: 'You', score: 0, desc: 'The new name on the board.' },
];

export const COMEDY_RECORDS = [
  { id: 'rec-runs', name: 'Most Shows', stat: 'runsDone', unit: 'shows', desc: 'Total shows run.' },
  { id: 'rec-earned', name: 'Top Earnings', stat: 'earned', unit: '$', desc: 'Total money earned.' },
  { id: 'rec-visitors', name: 'Biggest Crowd', stat: 'visitors', unit: 'laughers', desc: 'Total visitors welcomed.' },
  { id: 'rec-best', name: 'Best Show', stat: 'bestRun', unit: '$', desc: 'Best single-show payout.' },
  { id: 'rec-streak', name: 'Longest Streak', stat: 'bestStreak', unit: 'shows', desc: 'Longest run of shows.' },
];

export const COMEDY_MARKET_EVENTS = [
  { id: 'me-mic', name: 'Mic Craze', item: 'open-mic-night', mult: 1.35, desc: 'Everyone wants to try five minutes.' },
  { id: 'me-improv', name: 'Improv Dip', item: 'improv-troupe', mult: 0.7, desc: 'Made-up shows cool off.' },
  { id: 'me-liner', name: 'One-Liner Boom', item: 'one-liner-king', mult: 1.35, desc: 'Short jokes are trending hard.' },
  { id: 'me-musical', name: 'Musical Lull', item: 'musical-comic', mult: 0.7, desc: 'The songs go quiet this week.' },
  { id: 'me-roast', name: 'Roast Rush', item: 'roast-battle', mult: 1.35, desc: 'Insults are the hottest ticket.' },
  { id: 'me-sketch', name: 'Sketch Slump', item: 'sketch-crew', mult: 0.7, desc: 'The wigs rest this week.' },
  { id: 'me-prop', name: 'Prop Surge', item: 'prop-master', mult: 1.35, desc: 'Rubber chickens are back in fashion.' },
  { id: 'me-dark', name: 'Dark Dip', item: 'dark-humor', mult: 0.7, desc: 'The room wants lighter laughs.' },
  { id: 'me-clean', name: 'Clean Boom', item: 'clean-comedy', mult: 1.35, desc: 'Family night fills every seat.' },
  { id: 'me-clown', name: 'Clown Cool', item: 'clown-car', mult: 0.7, desc: 'The pies stay in the fridge.' },
  { id: 'me-vent', name: 'Dummy Fever', item: 'ventriloquist', mult: 1.35, desc: 'The dummy is the talk of the town.' },
  { id: 'me-gala', name: 'Gala Fade', item: 'headliner-gala', mult: 0.7, desc: 'The headliner rests between tours.' },
];

export const COMEDY_SEASONS = [
  { id: 'summer', name: 'Summer', mult: 1.1, desc: 'Tourists hunt for a laugh.' },
  { id: 'autumn', name: 'Autumn', mult: 1.0, desc: 'Steady weekend crowds.' },
  { id: 'winter', name: 'Winter', mult: 0.9, desc: 'Cold nights, smaller rooms.' },
  { id: 'spring', name: 'Spring', mult: 1.05, desc: 'Fresh acts bloom.' },
];

export const COMEDY_FACTS = [
  { id: 'fact-mic', text: 'The Open Mic Night once launched a TV star.' },
  { id: 'fact-improv', text: 'The Improv Troupe has never repeated a show.' },
  { id: 'fact-liner', text: 'The One-Liner King writes 50 jokes a day.' },
  { id: 'fact-musical', text: 'The Musical Comic tunes his guitar mid-joke.' },
  { id: 'fact-roast', text: 'Roast Battle losers buy the winners dinner.' },
  { id: 'fact-sketch', text: 'The Sketch Crew owns 300 wigs.' },
  { id: 'fact-prop', text: 'The Prop Master chicken is older than the club.' },
  { id: 'fact-dark', text: 'Dark Humor shows always sell out first.' },
  { id: 'fact-clean', text: 'Clean Comedy night is the club\'s oldest tradition.' },
  { id: 'fact-clown', text: 'The Clown Car fits eleven people, somehow.' },
  { id: 'fact-vent', text: 'The Ventriloquist dummy has its own fan club.' },
  { id: 'fact-gala', text: 'The Headliner Gala once ran until 3am.' },
  { id: 'fact-1', text: 'Stand-up comedy started in music halls in the 1800s.' },
  { id: 'fact-2', text: 'A heckler is a loud audience member who talks back.' },
  { id: 'fact-3', text: 'The brick wall is the most famous backdrop in comedy.' },
  { id: 'fact-4', text: 'Comics test new jokes at open mics first.' },
  { id: 'fact-5', text: 'Laughter can burn up to 40 calories an hour.' },
  { id: 'fact-6', text: 'The two-drink minimum is a classic club tradition.' },
  { id: 'fact-7', text: 'Improv was invented as a theatre training game.' },
  { id: 'fact-8', text: 'Some comics keep a notebook by the bed for 3am jokes.' },
  { id: 'fact-9', text: 'A tight five is a perfect five-minute set.' },
  { id: 'fact-10', text: 'The best comedy clubs seat under 200 people.' },
];

export const COMEDY_NPC_LINES = [
  { id: 'npc-1', text: 'That roast was brutal, I loved it!' },
  { id: 'npc-2', text: 'I laughed so hard my drink came out my nose.' },
  { id: 'npc-3', text: 'The dummy is funnier than the man.' },
  { id: 'npc-4', text: 'I came for a date night and stayed for three sets.' },
  { id: 'npc-5', text: 'The host is almost as funny as the acts.' },
  { id: 'npc-6', text: 'That one-liner about landlords killed me.' },
  { id: 'npc-7', text: 'I have never seen a room laugh that hard.' },
  { id: 'npc-8', text: 'The musical comic should release an album.' },
  { id: 'npc-9', text: 'Best Tuesday night in the city.' },
  { id: 'npc-10', text: 'My cheeks hurt from smiling.' },
  { id: 'npc-11', text: 'The clown car bit never gets old.' },
  { id: 'npc-12', text: 'I brought my mum, she laughed the loudest.' },
  { id: 'npc-13', text: 'That dark set was risky and perfect.' },
  { id: 'npc-14', text: 'I am signing up for open mic next week.' },
  { id: 'npc-15', text: 'The bartender knows my order already.' },
  { id: 'npc-16', text: 'We are coming back every Friday now.' },
];

export const COMEDY_GUIDE = [
  { id: 'guide-1', text: 'Step 1: Book an act from the list.' },
  { id: 'guide-2', text: 'Step 2: Pay the booking cost from your cash.' },
  { id: 'guide-3', text: 'Step 3: Run the show to start the set.' },
  { id: 'guide-4', text: 'Step 4: Wait for the show timer to finish.' },
  { id: 'guide-5', text: 'Step 5: Collect the door sales from the till.' },
  { id: 'guide-6', text: 'Step 6: Host an open mic to boost the next act.' },
  { id: 'guide-7', text: 'Step 7: Spend earnings on club upgrades.' },
  { id: 'guide-8', text: 'Step 8: Hire hosts and bouncers for the floor.' },
  { id: 'guide-9', text: 'Step 9: Level up acts to raise their value.' },
  { id: 'guide-10', text: 'Step 10: Watch market events for hot acts.' },
  { id: 'guide-11', text: 'Step 11: Claim challenges as you hit each goal.' },
  { id: 'guide-12', text: 'Step 12: Donate to the youth centre for reputation.' },
  { id: 'guide-13', text: 'Step 13: Check the price board before selling.' },
  { id: 'guide-14', text: 'Step 14: Keep shows running to grow your streak.' },
  { id: 'guide-15', text: 'Step 15: Trade in bulk when the market is hot.' },
  { id: 'guide-16', text: 'Step 16: Become a Comedy Legend.' },
];

export const COMEDY_META = { system: 'comedy', version: '7-B4', author: 'builder-4', mechanic: 'venue', dataCount: 12, dataName: 'COMEDY_ACTS' };

export function createComedyClubSystem(ctx) {
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
  for (let i = 0; i < COMEDY_ACTS.length; i++) {
    drift[COMEDY_ACTS[i].id] = 0;
    holdings[COMEDY_ACTS[i].id] = 0;
    prices[COMEDY_ACTS[i].id] = COMEDY_ACTS[i].price;
  }

  const state = {
    xp: 0, rank: 0, runsDone: 0, itemsOwned: 0, visitors: 0, earned: 0, spent: 0,
    reputation: 0, heat: 0, upgrades: [], upgradesOwned: 0, staff: [], staffHired: 0,
    owned: {}, levels: {}, boosted: {}, active: null, activeId: null, activeTimer: 0,
    activeBase: 0, pending: 0, dailyEarned: 0, dailyVisitors: 0, bestRun: 0,
    bestRunName: null, streak: 0, bestStreak: 0, failures: 0, donations: 0,
    challengesClaimed: [], lastDay: 1, drift: drift, holdings: holdings, prices: prices,
    viewers: 0, followers: 0, subs: 0, peakViewers: 0, streamMinutes: 0, support: 50,
    volunteers: 0, donors: 0, polls: 50, occupancy: 0, attendanceToday: 0,
    dividendsPaid: 0, wagesPaid: 0,
  };

  function gainXp(n) {
    state.xp += n;
    const lvl = comedyRankFor(state.xp);
    if (lvl > state.rank) {
      state.rank = lvl;
      log('Rank up! You are now ' + comedyRankNameFor(lvl) + '.');
    }
  }

  function bookAct(id) {
    const item = comedyItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id: id };
    if (state.owned[id]) return { ok: false, reason: 'already-owned', id: id };
    const cap = comedyCapacityFor(state.rank, state.upgrades);
    if (state.itemsOwned >= cap) return { ok: false, reason: 'capacity-full', cap: cap };
    const need = item.difficulty - 2 > 0 ? item.difficulty - 2 : 0;
    if (state.rank < need) return { ok: false, reason: 'rank-too-low', rank: need };
    const cost = comedyPriceFor(id, state.drift[id] || 0, 0, []);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost: cost };
    addCash(0 - cost);
    state.spent += cost;
    state.owned[id] = 1;
    state.levels[id] = 1;
    state.itemsOwned += 1;
    gainXp(10);
    log('Booked act ' + item.name + ' for $' + cost + '.');
    return { ok: true, id: id, cost: cost, name: item.name };
  }

  function runShow(id) {
    const item = comedyItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id: id };
    if (state.active) return { ok: false, reason: 'already-running', active: state.activeId };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id: id };
    state.active = 'run';
    state.activeId = id;
    state.activeTimer = 30 + item.difficulty * 10;
    state.activeBase = item.price;
    log('Show started: ' + item.name + '.');
    return { ok: true, id: id, seconds: state.activeTimer };
  }

  function settleRun() {
    const item = comedyItemById(state.activeId);
    const doneId = state.activeId;
    const sky = getWeather();
    const payout = comedyPayoutFor(item, state.rank, state.upgrades, sky, state.boosted[doneId] === true);
    const crowd = comedyCrowdFor(item, state.rank, sky);
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
    log('Show ' + (item ? item.name : doneId) + ' drew ' + crowd + ' laughers and earned $' + payout + '.');
  }

  function collectDoorSales() {
    if (state.pending <= 0) return { ok: false, reason: 'nothing-pending' };
    const amount = state.pending;
    state.pending = 0;
    state.earned += amount;
    addCash(amount);
    log('Collected $' + amount + ' in door sales.');
    return { ok: true, amount: amount };
  }

  function sellDrinks(id) {
    const item = comedyItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id: id };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id: id };
    const refund = Math.round(item.price * 0.5);
    delete state.owned[id];
    delete state.levels[id];
    state.itemsOwned -= 1;
    state.earned += refund;
    addCash(refund);
    gainXp(5);
    log('Sold drink stock from ' + item.name + ' for $' + refund + '.');
    return { ok: true, total: refund, qty: 1 };
  }

  function hostOpenMic(id) {
    const item = comedyItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id: id };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id: id };
    if (getCash() < 40) return { ok: false, reason: 'not-enough-cash', cost: 40 };
    addCash(-40);
    state.spent += 40;
    state.boosted[id] = true;
    state.reputation += 1;
    gainXp(10);
    log('Hosted an open mic for ' + item.name + '.');
    return { ok: true, id: id, boosted: true };
  }

  function buyUpgrade(id) {
    const up = comedyUpgradeById(id);
    if (!up) return { ok: false, reason: 'unknown-upgrade', id: id };
    if (state.upgrades.indexOf(id) >= 0) return { ok: false, reason: 'already-owned', id: id };
    if (getCash() < up.cost) return { ok: false, reason: 'not-enough-cash', cost: up.cost };
    addCash(0 - up.cost);
    state.spent += up.cost;
    state.upgrades.push(id);
    state.upgradesOwned += 1;
    gainXp(20);
    log('Bought upgrade ' + up.name + ' for $' + up.cost + '.');
    return { ok: true, id: id, name: up.name };
  }

  function hireStaff(id) {
    const s = comedyStaffById(id);
    if (!s) return { ok: false, reason: 'unknown-staff', id: id };
    if (state.staff.indexOf(id) >= 0) return { ok: false, reason: 'already-hired', id: id };
    if (getCash() < s.wage) return { ok: false, reason: 'not-enough-cash', cost: s.wage };
    addCash(0 - s.wage);
    state.spent += s.wage;
    state.staff.push(id);
    state.staffHired += 1;
    gainXp(10);
    log('Hired ' + s.name + ' for $' + s.wage + '.');
    return { ok: true, id: id, name: s.name, wage: s.wage };
  }

  function fireStaff(id) {
    const at = state.staff.indexOf(id);
    if (at < 0) return { ok: false, reason: 'not-hired', id: id };
    state.staff.splice(at, 1);
    log('Let go of staff member ' + id + '.');
    return { ok: true, id: id };
  }

  function upgradeItem(id) {
    const item = comedyItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id: id };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id: id };
    const lvl = state.levels[id] || 1;
    if (lvl >= 5) return { ok: false, reason: 'max-level', id: id, level: lvl };
    const cost = Math.round(item.price * 0.4 * lvl);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost: cost };
    addCash(0 - cost);
    state.spent += cost;
    state.levels[id] = lvl + 1;
    gainXp(15);
    log('Upgraded ' + item.name + ' to level ' + (lvl + 1) + '.');
    return { ok: true, id: id, level: lvl + 1 };
  }

  function priceBoard() {
    const rows = [];
    for (let i = 0; i < COMEDY_ACTS.length; i++) {
      const it = COMEDY_ACTS[i];
      rows.push({
        id: it.id, name: it.name, price: state.prices[it.id], basePrice: it.price,
        drift: state.drift[it.id] || 0, owned: state.owned[it.id] ? true : false,
        level: state.levels[it.id] || 0, difficulty: it.difficulty, rarity: it.rarity,
      });
    }
    return rows;
  }

  function listItems() {
    const rows = [];
    for (let i = 0; i < COMEDY_ACTS.length; i++) {
      const it = COMEDY_ACTS[i];
      rows.push({ id: it.id, name: it.name, price: it.price, difficulty: it.difficulty, rarity: it.rarity, desc: it.desc, owned: state.owned[it.id] ? true : false });
    }
    return rows;
  }

  function info(id) {
    const item = comedyItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id: id };
    return { ok: true, item: item, owned: state.owned[id] ? true : false, level: state.levels[id] || 0, price: state.prices[id], holdings: state.holdings[id] || 0 };
  }

  function dailyEvent() {
    if (COMEDY_DAILY_EVENTS.length === 0) return { event: 'none', name: '', effect: '', amount: 0 };
    const ev = COMEDY_DAILY_EVENTS[Math.floor(rng() * COMEDY_DAILY_EVENTS.length)];
    switch (ev.effect) {
      case 'earn':
        state.pending += ev.amount;
        break;
      case 'cost':
        if (getCash() >= ev.amount) {
          addCash(0 - ev.amount);
          state.spent += ev.amount;
        }
        break;
      case 'rep':
        state.reputation += ev.amount;
        break;
      case 'visitors':
        state.visitors += ev.amount;
        state.dailyVisitors += ev.amount;
        break;
      case 'heat':
        state.heat += ev.amount;
        addHeat(ev.amount);
        break;
      case 'xp':
        gainXp(ev.amount);
        break;
      default:
        break;
    }
    log(ev.text);
    return { event: ev.id, name: ev.name, effect: ev.effect, amount: ev.amount };
  }

  function tick(dt) {
    if (!state.active) return;
    state.activeTimer -= dt;
    if (state.activeTimer <= 0) {
      state.activeTimer = 0;
      settleRun();
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return null;
    state.lastDay = day;
    for (let i = 0; i < COMEDY_ACTS.length; i++) {
      const it = COMEDY_ACTS[i];
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
    return dailyEvent();
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    const keys = Object.keys(saved);
    for (let i = 0; i < keys.length; i++) state[keys[i]] = saved[keys[i]];
    if (!state.drift || typeof state.drift !== 'object') state.drift = {};
    if (!state.prices || typeof state.prices !== 'object') state.prices = {};
    if (!state.holdings || typeof state.holdings !== 'object') state.holdings = {};
    for (let i = 0; i < COMEDY_ACTS.length; i++) {
      const id = COMEDY_ACTS[i].id;
      if (state.drift[id] === undefined) state.drift[id] = 0;
      if (state.prices[id] === undefined) state.prices[id] = COMEDY_ACTS[i].price;
      if (state.holdings[id] === undefined) state.holdings[id] = 0;
    }
    if (!state.owned || typeof state.owned !== 'object') state.owned = {};
    if (!state.levels || typeof state.levels !== 'object') state.levels = {};
    if (!state.boosted || typeof state.boosted !== 'object') state.boosted = {};
    state.rank = comedyRankFor(state.xp);
  }

  function stats() {
    let holdingsCount = 0;
    const hkeys = Object.keys(state.holdings);
    for (let i = 0; i < hkeys.length; i++) holdingsCount += state.holdings[hkeys[i]] || 0;
    return {
      name: 'Comedy Club',
      mechanic: 'venue',
      rank: comedyRankNameFor(state.rank),
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
      holdingsCount: holdingsCount,
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
      capacity: comedyCapacityFor(state.rank, state.upgrades),
      hour: getHour(),
      day: getDay(),
    };
  }

  function hudLine() {
    if (state.active) return 'Comedy Club: running ' + state.activeId + ' - ' + Math.ceil(state.activeTimer) + 's left';
    if (state.pending > 0) return 'Comedy Club: $' + state.pending + ' waiting in the till';
    if (state.itemsOwned > 0) return 'Comedy Club: ' + state.itemsOwned + ' entries, $' + state.earned + ' earned';
    return '';
  }

  function interact(action, a, b) {
    if (!action || action === 'status') {
      return { ok: true, stats: stats(), hint: 'open an act to book it, run an act to play the show, collect to empty the till' };
    }
    switch (action) {
      case 'open': return bookAct(a);
      case 'run': return runShow(a);
      case 'collect': return collectDoorSales();
      case 'sell': return sellDrinks(a, b);
      case 'upgrade': case 'levelup': return upgradeItem(a);
      case 'hire': return hireStaff(a);
      case 'fire': return fireStaff(a);
      case 'special': return hostOpenMic(a);
      case 'info': return info(a);
      case 'prices': return { ok: true, prices: priceBoard() };
      case 'list': return { ok: true, items: listItems() };
      case 'event': return dailyEvent();
      default: return { ok: false, reason: 'unknown-action', action: action };
    }
  }

  return {
    name: 'Comedy Club',
    state: state,
    gainXp: gainXp,
    bookAct: bookAct,
    runShow: runShow,
    collectDoorSales: collectDoorSales,
    sellDrinks: sellDrinks,
    hostOpenMic: hostOpenMic,
    buyUpgrade: buyUpgrade,
    hireStaff: hireStaff,
    fireStaff: fireStaff,
    upgradeItem: upgradeItem,
    priceBoard: priceBoard,
    listItems: listItems,
    info: info,
    dailyEvent: dailyEvent,
    tick: tick,
    tickDay: tickDay,
    serialize: serialize,
    deserialize: deserialize,
    stats: stats,
    hudLine: hudLine,
    interact: interact,
    open: bookAct,
    run: runShow,
    collect: collectDoorSales,
    sell: sellDrinks,
    upgrade: upgradeItem,
    hire: hireStaff,
  };
}

export function createComedyClubExtras(system) {
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  function challenges() {
    const out = [];
    for (let i = 0; i < COMEDY_CHALLENGES.length; i++) out.push(comedyChallengeProgress(COMEDY_CHALLENGES[i], system.state));
    return out;
  }

  function claimChallenge(id) {
    let ch = null;
    for (let i = 0; i < COMEDY_CHALLENGES.length; i++) {
      if (COMEDY_CHALLENGES[i].id === id) ch = COMEDY_CHALLENGES[i];
    }
    if (!ch) return { ok: false, reason: 'unknown-challenge', id: id };
    if (claimed.indexOf(id) >= 0) return { ok: false, reason: 'already-claimed', id: id };
    const prog = comedyChallengeProgress(ch, system.state);
    if (!prog.done) return { ok: false, reason: 'not-done', id: id, have: prog.have, goal: prog.goal };
    claimed.push(id);
    system.state.challengesClaimed.push(id);
    system.gainXp(ch.xp);
    return { ok: true, id: id, xp: ch.xp };
  }

  function achievements() {
    const out = [];
    for (let i = 0; i < COMEDY_ACHIEVEMENTS.length; i++) {
      const a = COMEDY_ACHIEVEMENTS[i];
      const have = Math.floor(system.state[a.target] || 0);
      out.push({ id: a.id, name: a.name, desc: a.desc, target: a.target, goal: a.goal, have: have, done: have >= a.goal });
    }
    return out;
  }

  function hireHelper(id) {
    const s = comedyStaffById(id);
    if (!s) return { ok: false, reason: 'unknown-staff', id: id };
    if (helpers.indexOf(id) >= 0) return { ok: false, reason: 'already-hired', id: id };
    helpers.push(id);
    return { ok: true, id: id, name: s.name, wage: s.wage };
  }

  function fireHelper(id) {
    const at = helpers.indexOf(id);
    if (at < 0) return { ok: false, reason: 'not-hired', id: id };
    helpers.splice(at, 1);
    return { ok: true, id: id };
  }

  function payWages() {
    let due = 0;
    for (let i = 0; i < helpers.length; i++) {
      const s = comedyStaffById(helpers[i]);
      if (s) due += s.wage;
    }
    wagesPaid += due;
    system.state.wagesPaid += due;
    return { due: due, helpers: helpers.length, totalPaid: wagesPaid };
  }

  function helperBonus(skill) {
    let total = 0;
    for (let i = 0; i < helpers.length; i++) {
      const s = comedyStaffById(helpers[i]);
      if (s && s.skill === skill) total += s.bonus;
    }
    return total;
  }

  function donate(amount) {
    if (!amount || amount <= 0) return { ok: false, reason: 'bad-amount', amount: amount };
    system.state.donations += amount;
    const rep = Math.floor(amount / 100);
    system.state.reputation += rep;
    return { ok: true, amount: amount, reputation: rep };
  }

  function quickBoost(id) {
    if (!comedyItemById(id)) return { ok: false, reason: 'unknown-item', id: id };
    system.state.boosted[id] = true;
    return { ok: true, id: id, boosted: true };
  }

  function inventoryValue() {
    return comedyInventoryValue(system.state);
  }

  function weeklyReport() {
    return {
      goal: comedyWeeklyGoal(system.state),
      summary: comedySummary(system.state),
      nextGoal: comedyNextGoal(system.state),
      efficiency: comedyEfficiency(system.state),
      profitPerRun: comedyProfitPerRun(system.state),
      records: comedyAllRecords(system.state),
    };
  }

  function staffRoster() {
    const rows = [];
    for (let i = 0; i < COMEDY_STAFF.length; i++) {
      const s = COMEDY_STAFF[i];
      rows.push({ id: s.id, name: s.name, wage: s.wage, skill: s.skill, hired: helpers.indexOf(s.id) >= 0 || system.state.staff.indexOf(s.id) >= 0 });
    }
    return rows;
  }

  function upgradeCatalog() {
    const rows = [];
    for (let i = 0; i < COMEDY_UPGRADES.length; i++) {
      const u = COMEDY_UPGRADES[i];
      rows.push({ id: u.id, name: u.name, cost: u.cost, effect: u.effect, desc: u.desc, owned: system.state.upgrades.indexOf(u.id) >= 0 });
    }
    return rows;
  }

  return {
    challenges: challenges,
    claimChallenge: claimChallenge,
    achievements: achievements,
    hireHelper: hireHelper,
    fireHelper: fireHelper,
    payWages: payWages,
    helperBonus: helperBonus,
    donate: donate,
    quickBoost: quickBoost,
    inventoryValue: inventoryValue,
    weeklyReport: weeklyReport,
    staffRoster: staffRoster,
    upgradeCatalog: upgradeCatalog,
    get helpers() { return helpers.slice(); },
    get claimed() { return claimed.slice(); },
    get wagesPaid() { return wagesPaid; },
  };
}

export function createComedyClubMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  function setEvent(id) {
    let found = null;
    for (let i = 0; i < COMEDY_MARKET_EVENTS.length; i++) {
      if (COMEDY_MARKET_EVENTS[i].id === id) found = COMEDY_MARKET_EVENTS[i];
    }
    if (!found) return { ok: false, reason: 'unknown-event', id: id };
    currentEvent = id;
    return { ok: true, event: id };
  }

  function setSeason(id) {
    let found = null;
    for (let i = 0; i < COMEDY_SEASONS.length; i++) {
      if (COMEDY_SEASONS[i].id === id) found = COMEDY_SEASONS[i];
    }
    if (!found) return { ok: false, reason: 'unknown-season', id: id };
    currentSeason = id;
    return { ok: true, season: id };
  }

  function eventPrice(itemId, basePrice) {
    const mult = comedyMarketEventMult(currentEvent, itemId) * comedySeasonMult(currentSeason);
    return Math.round(basePrice * mult * 10) / 10;
  }

  function bulkDeal(itemId, qty) {
    const item = comedyItemById(itemId);
    if (!item) return { ok: false, reason: 'unknown-item', id: itemId };
    if (!qty || qty < 5) return { ok: false, reason: 'too-few', qty: qty };
    const unit = eventPrice(itemId, item.price);
    const total = Math.round(unit * qty * 1.1 * 10) / 10;
    system.state.pending += total;
    system.state.dailyEarned += total;
    bulkTraded += qty;
    dealsClaimed += 1;
    return { ok: true, total: total, qty: qty, unit: unit, bonus: 'bulk +10%' };
  }

  function dailyDeals() {
    const rows = [];
    for (let i = 0; i < COMEDY_ACTS.length; i++) {
      const it = COMEDY_ACTS[i];
      const mult = comedyMarketEventMult(currentEvent, it.id);
      if (mult !== 1) rows.push({ item: it.id, name: it.name, mult: mult, event: currentEvent });
    }
    return rows;
  }

  function marketSummary() {
    return { event: currentEvent, season: currentSeason, dealsClaimed: dealsClaimed, bulkTraded: bulkTraded, deals: dailyDeals() };
  }

  function seasonPrices() {
    const rows = [];
    for (let i = 0; i < COMEDY_ACTS.length; i++) {
      const it = COMEDY_ACTS[i];
      rows.push({ id: it.id, name: it.name, price: eventPrice(it.id, it.price) });
    }
    return rows;
  }

  return {
    setEvent: setEvent,
    setSeason: setSeason,
    eventPrice: eventPrice,
    bulkDeal: bulkDeal,
    dailyDeals: dailyDeals,
    marketSummary: marketSummary,
    seasonPrices: seasonPrices,
    get event() { return currentEvent; },
    get season() { return currentSeason; },
  };
}

function comedySkyCond(weather) {
  if (typeof weather === 'string') return weather;
  if (weather && typeof weather.condition === 'string') return weather.condition;
  return 'clear';
}

function comedySkyFactor(table, weather) {
  const hit = table[comedySkyCond(weather)];
  return hit === undefined ? 1 : hit;
}

export function comedyRankFor(xp) {
  let lvl = 0;
  for (let i = 0; i < COMEDY_RANKS.length; i++) {
    if (xp >= COMEDY_RANKS[i].xp) lvl = COMEDY_RANKS[i].level;
  }
  return lvl;
}

export function comedyItemById(id) {
  for (let i = 0; i < COMEDY_ACTS.length; i++) {
    if (COMEDY_ACTS[i].id === id) return COMEDY_ACTS[i];
  }
  return null;
}

export function comedyPriceFor(id, drift, rank, upgrades) {
  const item = comedyItemById(id);
  if (!item) return 0;
  let p = item.price * (1 + (drift || 0)) * (1 + (rank || 0) * 0.05);
  if (upgrades && upgrades.length >= 3) p = p * 1.1;
  const rounded = Math.round(p * 10) / 10;
  return rounded < 1 ? 1 : rounded;
}

export function comedyCapacityFor(rank, upgrades) {
  let cap = 3 + (rank || 0);
  if (upgrades) {
    for (let i = 0; i < upgrades.length; i++) {
      if (upgrades[i] === 'grand-stage') cap += 2;
    }
  }
  return cap;
}

export function comedyPayoutFor(item, rank, upgrades, weather, boosted) {
  if (!item) return 0;
  let mult = 0.6 + (rank || 0) * 0.1;
  if (boosted) mult += 0.3;
  mult = mult * comedySkyFactor({ rain: 1.1, sunny: 1.0, storm: 0.7 }, weather);
  if (upgrades && upgrades.length >= 4) mult = mult * 1.15;
  const payout = Math.round(item.price * mult);
  return payout < 5 ? 5 : payout;
}

export function comedyCrowdFor(item, rank, weather) {
  const diff = item ? item.difficulty : 0;
  const base = 10 + diff * 8 + (rank || 0) * 5;
  const crowd = Math.round(base * comedySkyFactor({ rain: 1.1, sunny: 1.0, storm: 0.5 }, weather));
  return crowd < 1 ? 1 : crowd;
}

export function comedyUpgradeById(id) {
  for (let i = 0; i < COMEDY_UPGRADES.length; i++) {
    if (COMEDY_UPGRADES[i].id === id) return COMEDY_UPGRADES[i];
  }
  return null;
}

export function comedyStaffById(id) {
  for (let i = 0; i < COMEDY_STAFF.length; i++) {
    if (COMEDY_STAFF[i].id === id) return COMEDY_STAFF[i];
  }
  return null;
}

export function comedyEventById(id) {
  for (let i = 0; i < COMEDY_DAILY_EVENTS.length; i++) {
    if (COMEDY_DAILY_EVENTS[i].id === id) return COMEDY_DAILY_EVENTS[i];
  }
  for (let i = 0; i < COMEDY_MARKET_EVENTS.length; i++) {
    if (COMEDY_MARKET_EVENTS[i].id === id) return COMEDY_MARKET_EVENTS[i];
  }
  return null;
}

export function comedyTipFor(day) {
  return COMEDY_TIPS[day % COMEDY_TIPS.length];
}

export function comedyFactFor(day) {
  return COMEDY_FACTS[day % COMEDY_FACTS.length];
}

export function comedyNpcLineFor(day) {
  return COMEDY_NPC_LINES[day % COMEDY_NPC_LINES.length];
}

export function comedyGuideStep(step) {
  if (step < 0 || step >= COMEDY_GUIDE.length) return null;
  return COMEDY_GUIDE[step];
}

export function comedySeasonMult(seasonId) {
  for (let i = 0; i < COMEDY_SEASONS.length; i++) {
    if (COMEDY_SEASONS[i].id === seasonId) return COMEDY_SEASONS[i].mult;
  }
  return 1;
}

export function comedyMarketEventMult(eventId, itemId) {
  if (!eventId) return 1;
  for (let i = 0; i < COMEDY_MARKET_EVENTS.length; i++) {
    const e = COMEDY_MARKET_EVENTS[i];
    if (e.id === eventId) return e.item === itemId ? e.mult : 1;
  }
  return 1;
}

export function comedyWeeklyGoal(state) {
  const runs = { have: state.runsDone, goal: 5, done: state.runsDone >= 5 };
  const earned = { have: state.earned, goal: 500, done: state.earned >= 500 };
  const visitors = { have: state.visitors, goal: 100, done: state.visitors >= 100 };
  return { runs: runs, earned: earned, visitors: visitors, allDone: runs.done && earned.done && visitors.done };
}

export function comedyEfficiency(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 100;
  return Math.round((state.runsDone / total) * 100);
}

export function comedyProfitPerRun(state) {
  if (state.runsDone === 0) return 0;
  return Math.round((state.earned / state.runsDone) * 10) / 10;
}

export function comedyInventoryValue(state) {
  let sum = 0;
  const keys = Object.keys(state.owned);
  for (let i = 0; i < keys.length; i++) {
    const item = comedyItemById(keys[i]);
    if (item) sum += item.price * (state.levels[keys[i]] || 1);
  }
  return Math.round(sum * 10) / 10;
}

export function comedySummary(state) {
  return 'Comedy Club at rank ' + comedyRankNameFor(state.rank) + ': ' + state.runsDone + ' runs, ' + state.itemsOwned + ' entries, $' + state.earned + ' earned, ' + state.visitors + ' visitors.';
}

export function comedyNextGoal(state) {
  if (state.itemsOwned === 0) return 'Open your first entry.';
  if (state.runsDone < 5) return 'Finish 5 runs.';
  if (state.earned < 500) return 'Earn $500 in total.';
  if (state.rank < 2) return 'Reach rank ' + comedyRankNameFor(2) + '.';
  if (state.upgradesOwned < 4) return 'Own 4 upgrades.';
  return 'Become a legend of the Comedy Club.';
}

export function comedyRecordFor(id, state) {
  let rec = null;
  for (let i = 0; i < COMEDY_RECORDS.length; i++) {
    if (COMEDY_RECORDS[i].id === id) rec = COMEDY_RECORDS[i];
  }
  if (!rec) return null;
  const value = state[rec.stat] === undefined ? 0 : state[rec.stat];
  return { id: rec.id, name: rec.name, stat: rec.stat, unit: rec.unit, desc: rec.desc, value: value };
}

export function comedyAllRecords(state) {
  const out = [];
  for (let i = 0; i < COMEDY_RECORDS.length; i++) out.push(comedyRecordFor(COMEDY_RECORDS[i].id, state));
  return out;
}

export function comedyLeaderboardWith(score) {
  const board = [];
  for (let i = 0; i < COMEDY_LEADERBOARD.length; i++) {
    const e = COMEDY_LEADERBOARD[i];
    board.push(e.name === 'You' ? { name: e.name, score: score, desc: e.desc } : { name: e.name, score: e.score, desc: e.desc });
  }
  board.sort((a, b) => b.score - a.score);
  const ranked = [];
  for (let i = 0; i < board.length; i++) ranked.push({ rank: i + 1, name: board[i].name, score: board[i].score, desc: board[i].desc });
  return ranked;
}

export function comedySeasonReport(state, seasonId) {
  const mult = comedySeasonMult(seasonId);
  const rows = [];
  for (let i = 0; i < COMEDY_ACTS.length; i++) {
    const it = COMEDY_ACTS[i];
    rows.push({ id: it.id, name: it.name, basePrice: it.price, seasonPrice: Math.round(it.price * mult * 10) / 10, owned: state.owned[it.id] ? true : false, level: state.levels[it.id] || 0 });
  }
  return rows;
}

export function comedyChallengeProgress(challenge, state) {
  const have = Math.floor(state[challenge.target] || 0);
  return { id: challenge.id, name: challenge.name, have: have, goal: challenge.goal, done: have >= challenge.goal, xp: challenge.xp };
}

export function comedyBestEntryFor(rank) {
  let best = null;
  let bestScore = -1;
  for (let i = 0; i < COMEDY_ACTS.length; i++) {
    const it = COMEDY_ACTS[i];
    if (it.difficulty > rank + 2) continue;
    const score = (it.price * (1 + it.rarity * 2)) / it.difficulty;
    if (score > bestScore) {
      bestScore = score;
      best = it;
    }
  }
  return best;
}

export function comedyEventFor(day) {
  return COMEDY_MARKET_EVENTS[day % COMEDY_MARKET_EVENTS.length];
}

export function comedyDailyEventFor(day) {
  return COMEDY_DAILY_EVENTS[day % COMEDY_DAILY_EVENTS.length];
}

export function comedyRankNameFor(level) {
  for (let i = 0; i < COMEDY_RANKS.length; i++) {
    if (COMEDY_RANKS[i].level === level) return COMEDY_RANKS[i].name;
  }
  return 'Unknown';
}

export function comedyTotalValue(state) {
  return Math.round((comedyInventoryValue(state) + state.pending + state.earned) * 10) / 10;
}

export function comedyProgressPercent(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 0;
  return Math.round((state.runsDone / total) * 100);
}

export function comedyStaffBonusFor(staffIds, skill) {
  let total = 0;
  for (let i = 0; i < staffIds.length; i++) {
    const s = comedyStaffById(staffIds[i]);
    if (s && s.skill === skill) total += s.bonus;
  }
  return total;
}

export function comedyCheapestEntry() {
  let best = COMEDY_ACTS[0];
  for (let i = 1; i < COMEDY_ACTS.length; i++) {
    if (COMEDY_ACTS[i].price < best.price) best = COMEDY_ACTS[i];
  }
  return best;
}

export function comedyPriciestEntry() {
  let best = COMEDY_ACTS[0];
  for (let i = 1; i < COMEDY_ACTS.length; i++) {
    if (COMEDY_ACTS[i].price > best.price) best = COMEDY_ACTS[i];
  }
  return best;
}

export function comedyEntriesByDifficulty(difficulty) {
  const ids = [];
  for (let i = 0; i < COMEDY_ACTS.length; i++) {
    if (COMEDY_ACTS[i].difficulty === difficulty) ids.push(COMEDY_ACTS[i].id);
  }
  return ids;
}

export function comedyEntriesByRarity(maxRarity) {
  const ids = [];
  for (let i = 0; i < COMEDY_ACTS.length; i++) {
    if (COMEDY_ACTS[i].rarity <= maxRarity) ids.push(COMEDY_ACTS[i].id);
  }
  return ids;
}

export function comedyGradeFor(runsDone, earned, visitors) {
  const score = runsDone * 10 + Math.round(earned / 10) + Math.floor(visitors / 10);
  if (score >= 500) return 'S';
  if (score >= 300) return 'A';
  if (score >= 150) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}
