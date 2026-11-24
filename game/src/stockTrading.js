export const STOCKS = [
  { id: 'solara-bank', name: 'Solara Bank', price: 120, rarity: 0.3, difficulty: 1, sector: 'Finance', dividend: 0.05, trend: 'rising', desc: 'The city\'s oldest bank, steady as a vault.' },
  { id: 'sunpower-energy', name: 'SunPower Energy', price: 180, rarity: 0.45, difficulty: 2, sector: 'Energy', dividend: 0.04, trend: 'rising', desc: 'Solar panels on every roof in town.' },
  { id: 'cloudnine-ai', name: 'CloudNine AI', price: 260, rarity: 0.6, difficulty: 3, sector: 'Tech', dividend: 0, trend: 'rising', desc: 'AI that writes poems and predicts the weather.' },
  { id: 'orbitsat', name: 'OrbitSat', price: 300, rarity: 0.65, difficulty: 3, sector: 'Space', dividend: 0, trend: 'falling', desc: 'Satellites above, losses below, for now.' },
  { id: 'harbor-foods', name: 'Harbor Foods', price: 90, rarity: 0.25, difficulty: 1, sector: 'Food', dividend: 0.03, trend: 'steady', desc: 'Feeds the whole harbour, rain or shine.' },
  { id: 'mediacore', name: 'MediaCore', price: 150, rarity: 0.4, difficulty: 2, sector: 'Media', dividend: 0.02, trend: 'falling', desc: 'Newspapers, radio and a struggling channel.' },
  { id: 'buildit', name: 'BuildIt', price: 200, rarity: 0.5, difficulty: 2, sector: 'Construction', dividend: 0.04, trend: 'steady', desc: 'Cranes over every new quarter of the city.' },
  { id: 'pharmalife', name: 'PharmaLife', price: 240, rarity: 0.55, difficulty: 3, sector: 'Health', dividend: 0.06, trend: 'rising', desc: 'Medicines that keep the city on its feet.' },
  { id: 'ocean-lines', name: 'Ocean Lines', price: 170, rarity: 0.4, difficulty: 2, sector: 'Shipping', dividend: 0.03, trend: 'falling', desc: 'Cargo ships crossing every sea.' },
  { id: 'pixel-games', name: 'Pixel Games', price: 210, rarity: 0.5, difficulty: 2, sector: 'Gaming', dividend: 0.02, trend: 'rising', desc: 'Games the whole town plays after dark.' },
  { id: 'greenfields', name: 'GreenFields', price: 130, rarity: 0.35, difficulty: 1, sector: 'Agriculture', dividend: 0.05, trend: 'steady', desc: 'Farms that feed the city year-round.' },
  { id: 'solara-air', name: 'Solara Air', price: 400, rarity: 0.85, difficulty: 5, sector: 'Travel', dividend: 0.01, trend: 'falling', desc: 'The city airline, flying high and spending higher.' },
];

export const STOCKS_UPGRADES = [
  { id: 'ticker-tape', name: 'Ticker Tape', cost: 100, effect: 'visitors +10%', desc: 'A live ticker scrolling across the wall.' },
  { id: 'trading-floor', name: 'Trading Floor', cost: 320, effect: 'capacity +2', desc: 'A bigger floor for two more stocks.' },
  { id: 'analyst-desk', name: 'Analyst Desk', cost: 200, effect: 'payout +10%', desc: 'Analysts who read every report.' },
  { id: 'news-feed', name: 'News Feed', cost: 150, effect: 'crowd +10%', desc: 'Breaking news before the market moves.' },
  { id: 'stop-loss', name: 'Stop Loss', cost: 180, effect: 'heat -1', desc: 'Automatic brakes on bad trades.' },
  { id: 'margin-account', name: 'Margin Account', cost: 260, effect: 'payout +15%', desc: 'Borrowed power for bigger positions.' },
  { id: 'chart-tools', name: 'Chart Tools', cost: 140, effect: 'earned +5%', desc: 'Charts that show every trend.' },
  { id: 'robo-advisor', name: 'Robo Advisor', cost: 220, effect: 'visitors +15%', desc: 'An algorithm that never sleeps.' },
];

export const STOCKS_RANKS = [
  { level: 0, name: 'First Trade', xp: 0, perk: 'Your first share, your first lesson.' },
  { level: 1, name: 'Day Trader', xp: 150, perk: 'In and out before lunch.' },
  { level: 2, name: 'Portfolio Builder', xp: 400, perk: 'A basket of winners.' },
  { level: 3, name: 'Market Shark', xp: 800, perk: 'The market fears your name.' },
  { level: 4, name: 'Wolf of Solara', xp: 1500, perk: 'The street is yours.' },
];

export const STOCKS_STAFF = [
  { id: 'analyst-nia', name: 'Nia the Analyst', wage: 55, skill: 'analyst', bonus: 3, desc: 'Reads balance sheets like novels.' },
  { id: 'broker-ben', name: 'Ben the Broker', wage: 50, skill: 'broker', bonus: 2, desc: 'Executes trades before the bell rings.' },
  { id: 'accountant-ada', name: 'Ada the Accountant', wage: 45, skill: 'accountant', bonus: 2, desc: 'Every cent tracked, every tax filed.' },
  { id: 'advisor-leo', name: 'Leo the Advisor', wage: 60, skill: 'advisor', bonus: 3, desc: 'Tells you what to buy and when to sell.' },
];

export const STOCKS_DAILY_EVENTS = [
  { id: 'bull-market', name: 'Bull Market', effect: 'earn', amount: 80, text: 'The whole market rallies on good news.' },
  { id: 'market-crash', name: 'Market Crash', effect: 'cost', amount: 60, text: 'A sudden crash wipes out a position.' },
  { id: 'ipo-buzz', name: 'IPO Buzz', effect: 'visitors', amount: 30, text: 'A hot IPO brings new traders to the floor.' },
  { id: 'rate-cut', name: 'Rate Cut', effect: 'rep', amount: 3, text: 'The central bank cuts rates; traders cheer.' },
  { id: 'insider-rumor', name: 'Insider Rumor', effect: 'heat', amount: 2, text: 'A whisper of insider trading draws regulators.' },
  { id: 'earnings-beat', name: 'Earnings Beat', effect: 'xp', amount: 25, text: 'A company smashes earnings; analysts take notes.' },
  { id: 'dividend-day', name: 'Dividend Day', effect: 'earn', amount: 50, text: 'Payouts land in every account.' },
  { id: 'trading-halt', name: 'Trading Halt', effect: 'cost', amount: 35, text: 'A halt freezes the floor for an hour.' },
  { id: 'merger-news', name: 'Merger News', effect: 'visitors', amount: 20, text: 'Two giants merge and the floor buzzes.' },
  { id: 'quiet-session', name: 'Quiet Session', effect: 'rep', amount: 1, text: 'A calm day, steady hands all round.' },
];

export const STOCKS_TIPS = [
  { id: 'tip-div', name: 'Dividends', text: 'Dividend stocks pay you just for holding them.' },
  { id: 'tip-floor', name: 'Trading Floor', text: 'Buy the Trading Floor to watch two more stocks.' },
  { id: 'tip-research', name: 'Research First', text: 'Research a stock before you buy a single share.' },
  { id: 'tip-drift', name: 'Watch Drift', text: 'Prices drift daily; a falling drift means falling prices.' },
  { id: 'tip-prices', name: 'Price Watch', text: 'Check the board before every trade.' },
  { id: 'tip-staff', name: 'Good Analysts', text: 'A sharp analyst is worth more than a hot tip.' },
  { id: 'tip-donate', name: 'Give Back', text: 'Donations to the finance school build reputation.' },
  { id: 'tip-rank', name: 'Climb Up', text: 'Every trade pushes you toward Day Trader.' },
];

export const STOCKS_CHALLENGES = [
  { id: 'ch-runs-5', name: 'Five Researches', target: 'runsDone', goal: 5, xp: 50, desc: 'Research 5 stocks.' },
  { id: 'ch-earn-500', name: 'First 500', target: 'earned', goal: 500, xp: 80, desc: 'Earn $500 in total.' },
  { id: 'ch-visitors-200', name: 'Busy Floor', target: 'visitors', goal: 200, xp: 60, desc: 'Welcome 200 visitors.' },
  { id: 'ch-items-4', name: 'Four Watches', target: 'itemsOwned', goal: 4, xp: 70, desc: 'Watch 4 stocks.' },
  { id: 'ch-upgrades-3', name: 'Well Equipped', target: 'upgradesOwned', goal: 3, xp: 60, desc: 'Own 3 upgrades.' },
  { id: 'ch-rep-10', name: 'Respected', target: 'reputation', goal: 10, xp: 50, desc: 'Reach 10 reputation.' },
  { id: 'ch-streak-3', name: 'On a Roll', target: 'streak', goal: 3, xp: 90, desc: 'Reach a 3-run streak.' },
  { id: 'ch-best-300', name: 'Big Win', target: 'bestRun', goal: 300, xp: 100, desc: 'Earn $300 from a single run.' },
];

export const STOCKS_ACHIEVEMENTS = [
  { id: 'ach-runs-10', name: 'Research Pro', target: 'runsDone', goal: 10, desc: 'Research 10 stocks.' },
  { id: 'ach-earn-1000', name: 'Golden Portfolio', target: 'earned', goal: 1000, desc: 'Earn $1,000 in total.' },
  { id: 'ach-visitors-500', name: 'City Favourite', target: 'visitors', goal: 500, desc: 'Welcome 500 visitors.' },
  { id: 'ach-items-6', name: 'Full Watchlist', target: 'itemsOwned', goal: 6, desc: 'Watch 6 stocks.' },
  { id: 'ach-upgrades-5', name: 'Fully Loaded', target: 'upgradesOwned', goal: 5, desc: 'Own 5 upgrades.' },
  { id: 'ach-rep-20', name: 'Beloved', target: 'reputation', goal: 20, desc: 'Reach 20 reputation.' },
  { id: 'ach-streak-5', name: 'Unstoppable', target: 'streak', goal: 5, desc: 'Reach a 5-run streak.' },
  { id: 'ach-best-500', name: 'Record Win', target: 'bestRun', goal: 500, desc: 'Earn $500 from a single run.' },
];

export const STOCKS_LEADERBOARD = [
  { name: 'Bull Brenda', score: 1200, desc: 'Buys low, sells high, never blinks.' },
  { name: 'Bear Boris', score: 880, desc: 'Shorts the market and sleeps well.' },
  { name: 'Chart Carla', score: 640, desc: 'Reads candles like tea leaves.' },
  { name: 'Penny Pete', score: 250, desc: 'Chases pennies and finds dimes.' },
  { name: 'You', score: 0, desc: 'The new name on the board.' },
];

export const STOCKS_RECORDS = [
  { id: 'rec-runs', name: 'Most Researches', stat: 'runsDone', unit: 'researches', desc: 'Total researches completed.' },
  { id: 'rec-earned', name: 'Top Earnings', stat: 'earned', unit: '$', desc: 'Total money earned.' },
  { id: 'rec-visitors', name: 'Biggest Crowd', stat: 'visitors', unit: 'traders', desc: 'Total visitors welcomed.' },
  { id: 'rec-best', name: 'Best Run', stat: 'bestRun', unit: '$', desc: 'Best single-run payout.' },
  { id: 'rec-streak', name: 'Longest Streak', stat: 'bestStreak', unit: 'runs', desc: 'Longest run of runs.' },
];

export const STOCKS_MARKET_EVENTS = [
  { id: 'me-bank', name: 'Bank Boom', item: 'solara-bank', mult: 1.35, desc: 'Banks rally on rate news.' },
  { id: 'me-sun', name: 'Solar Dip', item: 'sunpower-energy', mult: 0.7, desc: 'Cloudy forecasts dim solar.' },
  { id: 'me-cloud', name: 'AI Surge', item: 'cloudnine-ai', mult: 1.35, desc: 'AI stocks soar on a new model.' },
  { id: 'me-orbit', name: 'Orbit Fall', item: 'orbitsat', mult: 0.7, desc: 'A launch delay drags the stock.' },
  { id: 'me-harbor', name: 'Food Rally', item: 'harbor-foods', mult: 1.35, desc: 'Harvests are strong this year.' },
  { id: 'me-media', name: 'Media Slump', item: 'mediacore', mult: 0.7, desc: 'Ad money dries up.' },
  { id: 'me-build', name: 'Build Boom', item: 'buildit', mult: 1.35, desc: 'A housing wave lifts builders.' },
  { id: 'me-pharma', name: 'Pharma Dip', item: 'pharmalife', mult: 0.7, desc: 'A trial setback cools the stock.' },
  { id: 'me-ocean', name: 'Shipping Surge', item: 'ocean-lines', mult: 1.35, desc: 'Freight rates jump overnight.' },
  { id: 'me-pixel', name: 'Gaming Cool', item: 'pixel-games', mult: 0.7, desc: 'A delayed release hurts the stock.' },
  { id: 'me-green', name: 'Green Rally', item: 'greenfields', mult: 1.35, desc: 'Good rains lift the farms.' },
  { id: 'me-air', name: 'Air Slump', item: 'solara-air', mult: 0.7, desc: 'Fuel prices ground the airline.' },
];

export const STOCKS_SEASONS = [
  { id: 'summer', name: 'Summer', mult: 1.1, desc: 'Summer rallies lift the market.' },
  { id: 'autumn', name: 'Autumn', mult: 1.0, desc: 'Steady trading after the break.' },
  { id: 'winter', name: 'Winter', mult: 0.9, desc: 'Thin volumes, quiet floors.' },
  { id: 'spring', name: 'Spring', mult: 1.05, desc: 'New listings bloom.' },
];

export const STOCKS_FACTS = [
  { id: 'fact-bank', text: 'Solara Bank has never missed a dividend in 50 years.' },
  { id: 'fact-sun', text: 'SunPower Energy panels cover the stadium roof.' },
  { id: 'fact-cloud', text: 'CloudNine AI pays no dividend; it reinvests everything.' },
  { id: 'fact-orbit', text: 'OrbitSat pays no dividend; space is expensive.' },
  { id: 'fact-harbor', text: 'Harbor Foods started as a single fish stall.' },
  { id: 'fact-media', text: 'MediaCore owns the city\'s oldest newspaper.' },
  { id: 'fact-build', text: 'BuildIt built half the skyline.' },
  { id: 'fact-pharma', text: 'PharmaLife makes the flu jab for the whole region.' },
  { id: 'fact-ocean', text: 'Ocean Lines ships cross the equator weekly.' },
  { id: 'fact-pixel', text: 'Pixel Games sold a million copies in a week.' },
  { id: 'fact-green', text: 'GreenFields grows the wheat for the city bread.' },
  { id: 'fact-air', text: 'Solara Air flies to 30 cities from one runway.' },
  { id: 'fact-1', text: 'A dividend is a share of company profit paid to owners.' },
  { id: 'fact-2', text: 'The first stock exchange opened in Amsterdam in 1602.' },
  { id: 'fact-3', text: 'A bull market rises; a bear market falls.' },
  { id: 'fact-4', text: 'Diversifying means not betting on one stock.' },
  { id: 'fact-5', text: 'A stop loss sells automatically if the price falls.' },
  { id: 'fact-6', text: 'Blue-chip stocks are the biggest, safest companies.' },
  { id: 'fact-7', text: 'The opening bell rings at 9:30 in New York.' },
  { id: 'fact-8', text: 'Some traders hold a stock for minutes, others for decades.' },
  { id: 'fact-9', text: 'A stock split gives you more shares at a lower price.' },
  { id: 'fact-10', text: 'Research beats rumours, every single time.' },
];

export const STOCKS_NPC_LINES = [
  { id: 'npc-1', text: 'Buy low, sell high, that is all there is to it.' },
  { id: 'npc-2', text: 'I bought Solara Bank in 1998 and never sold.' },
  { id: 'npc-3', text: 'The AI stock doubled while I slept.' },
  { id: 'npc-4', text: 'Dividends pay my rent every quarter.' },
  { id: 'npc-5', text: 'I lost on OrbitSat and learned my lesson.' },
  { id: 'npc-6', text: 'This floor buzzes like a beehive.' },
  { id: 'npc-7', text: 'My broker says PharmaLife is the one to watch.' },
  { id: 'npc-8', text: 'I research every stock before I touch it.' },
  { id: 'npc-9', text: 'The ticker never stops, neither do I.' },
  { id: 'npc-10', text: 'GreenFields is the safest bet in town.' },
  { id: 'npc-11', text: 'I sold at the top and bought a boat.' },
  { id: 'npc-12', text: 'The crash taught me to diversify.' },
  { id: 'npc-13', text: 'Pixel Games is my retirement plan.' },
  { id: 'npc-14', text: 'I check the board before my coffee.' },
  { id: 'npc-15', text: 'A good analyst is worth their weight in gold.' },
  { id: 'npc-16', text: 'See you at the bell tomorrow.' },
];

export const STOCKS_GUIDE = [
  { id: 'guide-1', text: 'Step 1: Watch a stock from the list.' },
  { id: 'guide-2', text: 'Step 2: Pay the watching cost from your cash.' },
  { id: 'guide-3', text: 'Step 3: Research the stock to learn its trend.' },
  { id: 'guide-4', text: 'Step 4: Buy shares with the special action.' },
  { id: 'guide-5', text: 'Step 5: Collect dividends from the till.' },
  { id: 'guide-6', text: 'Step 6: Sell shares when the price is right.' },
  { id: 'guide-7', text: 'Step 7: Spend earnings on trading upgrades.' },
  { id: 'guide-8', text: 'Step 8: Hire analysts and brokers for the floor.' },
  { id: 'guide-9', text: 'Step 9: Level up stocks to raise their value.' },
  { id: 'guide-10', text: 'Step 10: Watch market events for hot stocks.' },
  { id: 'guide-11', text: 'Step 11: Claim challenges as you hit each goal.' },
  { id: 'guide-12', text: 'Step 12: Donate to the finance school for reputation.' },
  { id: 'guide-13', text: 'Step 13: Check the price board before trading.' },
  { id: 'guide-14', text: 'Step 14: Keep researching to grow your streak.' },
  { id: 'guide-15', text: 'Step 15: Trade in bulk when the market is hot.' },
  { id: 'guide-16', text: 'Step 16: Become the Wolf of Solara.' },
];

export const STOCKS_META = { system: 'stocks', version: '7-B4', author: 'builder-4', mechanic: 'stocks', dataCount: 12, dataName: 'STOCKS' };

export function createStockTradingSystem(ctx) {
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
  for (const st of STOCKS) {
    drift[st.id] = 0;
    holdings[st.id] = 0;
    prices[st.id] = st.price;
  }

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

  function gainXp(n) {
    state.xp += n;
    const lvl = stocksRankFor(state.xp);
    if (lvl > state.rank) {
      state.rank = lvl;
      log('Rank up! You are now ' + stocksRankNameFor(lvl) + '.');
    }
  }

  function watchStock(id) {
    const item = stocksItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (state.owned[id]) return { ok: false, reason: 'already-owned', id };
    const cap = stocksCapacityFor(state.rank, state.upgrades);
    if (state.itemsOwned >= cap) return { ok: false, reason: 'capacity-full', cap };
    const need = Math.max(0, item.difficulty - 2);
    if (state.rank < need) return { ok: false, reason: 'rank-too-low', rank: need };
    const cost = stocksPriceFor(id, state.drift[id] || 0, 0, []);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned[id] = 1;
    state.levels[id] = 1;
    state.itemsOwned += 1;
    gainXp(10);
    log('Watching stock ' + item.name + ' for $' + cost + '.');
    return { ok: true, id, cost, name: item.name };
  }

  function researchStock(id) {
    const item = stocksItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (state.active) return { ok: false, reason: 'already-running', active: state.activeId };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    if (getCash() < 25) return { ok: false, reason: 'not-enough-cash', cost: 25 };
    addCash(-25);
    state.spent += 25;
    const driftNow = state.drift[id] || 0;
    const tip = driftNow >= 0 ? 'rising' : 'falling';
    state.runsDone += 1;
    gainXp(15);
    log('Researched ' + item.name + ': trend looks ' + tip + '.');
    return { ok: true, id, tip, drift: driftNow, price: state.prices[id] };
  }

  function settleRun() {
    const item = stocksItemById(state.activeId);
    const doneId = state.activeId;
    const sky = getWeather();
    const payout = stocksPayoutFor(item, state.rank, state.upgrades, sky, !!state.boosted[doneId]);
    const crowd = stocksCrowdFor(item, state.rank, sky);
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
    log('Run for ' + (item ? item.name : doneId) + ' drew ' + crowd + ' traders and earned $' + payout + '.');
  }

  function collectDividends() {
    if (state.pending <= 0) return { ok: false, reason: 'nothing-pending' };
    const amount = state.pending;
    state.pending = 0;
    state.earned += amount;
    addCash(amount);
    log('Collected $' + amount + ' in dividends.');
    return { ok: true, amount };
  }

  function sellShares(id, qty) {
    const amount = !qty || qty <= 0 ? 1 : Math.floor(qty);
    const item = stocksItemById(id);
    if (!item) return { ok: false, reason: 'no-such-stock', id };
    const have = state.holdings[id] || 0;
    if (have < amount) return { ok: false, reason: 'not-enough', have };
    const price = state.prices[id];
    const total = Math.round(price * amount * 10) / 10;
    state.holdings[id] = have - amount;
    state.earned += total;
    addCash(total);
    gainXp(5);
    log('Sold ' + amount + ' shares of ' + item.name + ' for $' + total + '.');
    return { ok: true, total, qty: amount, price };
  }

  function buyShares(id, qty) {
    const amount = !qty || qty <= 0 ? 10 : Math.floor(qty);
    const item = stocksItemById(id);
    if (!item) return { ok: false, reason: 'no-such-stock', id };
    const cost = Math.round(state.prices[id] * amount * 10) / 10;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.holdings[id] = (state.holdings[id] || 0) + amount;
    gainXp(5);
    log('Bought ' + amount + ' shares of ' + item.name + ' for $' + cost + '.');
    return { ok: true, id, qty: amount, cost };
  }

  function buyUpgrade(id) {
    const up = stocksUpgradeById(id);
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
    const s = stocksStaffById(id);
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
    const item = stocksItemById(id);
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
    return STOCKS.map((it) => ({
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
    return STOCKS.map((it) => ({
      id: it.id, name: it.name, price: it.price, difficulty: it.difficulty, rarity: it.rarity, desc: it.desc, owned: !!state.owned[it.id],
    }));
  }

  function info(id) {
    const item = stocksItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    return { ok: true, item, owned: !!state.owned[id], level: state.levels[id] || 0, price: state.prices[id], holdings: state.holdings[id] || 0 };
  }

  function dailyEvent() {
    if (STOCKS_DAILY_EVENTS.length === 0) return { event: 'none', name: '', effect: '', amount: 0 };
    const ev = STOCKS_DAILY_EVENTS[Math.floor(rng() * STOCKS_DAILY_EVENTS.length)];
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
    for (const it of STOCKS) {
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
    let divTotal = 0;
    for (const it of STOCKS) {
      const held = state.holdings[it.id] || 0;
      if (held > 0 && it.dividend > 0) divTotal += Math.round(held * it.dividend * 10) / 10;
    }
    if (divTotal > 0) {
      state.pending += divTotal;
      state.dividendsPaid += divTotal;
      log('Dividends paid: $' + divTotal + '.');
    }
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
    for (const it of STOCKS) {
      if (state.drift[it.id] === undefined) state.drift[it.id] = 0;
      if (state.prices[it.id] === undefined) state.prices[it.id] = it.price;
      if (state.holdings[it.id] === undefined) state.holdings[it.id] = 0;
    }
    if (!state.owned || typeof state.owned !== 'object') state.owned = {};
    if (!state.levels || typeof state.levels !== 'object') state.levels = {};
    if (!state.boosted || typeof state.boosted !== 'object') state.boosted = {};
    state.rank = stocksRankFor(state.xp);
  }

  function stats() {
    const holdingsCount = Object.keys(state.holdings).reduce((sum, k) => sum + (state.holdings[k] || 0), 0);
    return {
      name: 'Stock Trading',
      mechanic: 'stocks',
      rank: stocksRankNameFor(state.rank),
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
      capacity: stocksCapacityFor(state.rank, state.upgrades),
      hour: getHour(),
      day: getDay(),
    };
  }

  function hudLine() {
    if (state.active) return 'Stock Trading: running ' + state.activeId + ' - ' + Math.ceil(state.activeTimer) + 's left';
    if (state.pending > 0) return 'Stock Trading: $' + state.pending + ' waiting in the till';
    if (state.itemsOwned > 0) return 'Stock Trading: ' + state.itemsOwned + ' entries, $' + state.earned + ' earned';
    return '';
  }

  function interact(action, a, b) {
    if (!action || action === 'status') {
      return { ok: true, stats: stats(), hint: 'open a stock to watch it, run a stock to research it, special with a stock and a quantity to buy shares' };
    }
    switch (action) {
      case 'open': return watchStock(a);
      case 'run': return researchStock(a);
      case 'collect': return collectDividends();
      case 'sell': return sellShares(a, b);
      case 'upgrade': case 'levelup': return upgradeItem(a);
      case 'hire': return hireStaff(a);
      case 'fire': return fireStaff(a);
      case 'special': return buyShares(a, b);
      case 'info': return info(a);
      case 'prices': return { ok: true, prices: priceBoard() };
      case 'list': return { ok: true, items: listItems() };
      case 'event': return dailyEvent();
      default: return { ok: false, reason: 'unknown-action', action };
    }
  }

  return {
    name: 'Stock Trading',
    state,
    gainXp,
    watchStock,
    researchStock,
    collectDividends,
    sellShares,
    buyShares,
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
    open: watchStock,
    run: researchStock,
    collect: collectDividends,
    sell: sellShares,
    upgrade: upgradeItem,
    hire: hireStaff,
  };
}

export function createStockTradingExtras(system) {
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  function challenges() {
    return STOCKS_CHALLENGES.map((ch) => stocksChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = STOCKS_CHALLENGES.find((c) => c.id === id);
    if (!ch) return { ok: false, reason: 'unknown-challenge', id };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed', id };
    const prog = stocksChallengeProgress(ch, system.state);
    if (!prog.done) return { ok: false, reason: 'not-done', id, have: prog.have, goal: prog.goal };
    claimed.push(id);
    system.state.challengesClaimed.push(id);
    system.gainXp(ch.xp);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return STOCKS_ACHIEVEMENTS.map((a) => {
      const have = Math.floor(system.state[a.target] || 0);
      return { id: a.id, name: a.name, desc: a.desc, target: a.target, goal: a.goal, have, done: have >= a.goal };
    });
  }

  function hireHelper(id) {
    const s = stocksStaffById(id);
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
      const s = stocksStaffById(hid);
      if (s) due += s.wage;
    }
    wagesPaid += due;
    system.state.wagesPaid += due;
    return { due, helpers: helpers.length, totalPaid: wagesPaid };
  }

  function helperBonus(skill) {
    let total = 0;
    for (const hid of helpers) {
      const s = stocksStaffById(hid);
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
    if (!stocksItemById(id)) return { ok: false, reason: 'unknown-item', id };
    system.state.boosted[id] = true;
    return { ok: true, id, boosted: true };
  }

  function inventoryValue() {
    return stocksInventoryValue(system.state);
  }

  function weeklyReport() {
    return {
      goal: stocksWeeklyGoal(system.state),
      summary: stocksSummary(system.state),
      nextGoal: stocksNextGoal(system.state),
      efficiency: stocksEfficiency(system.state),
      profitPerRun: stocksProfitPerRun(system.state),
      records: stocksAllRecords(system.state),
    };
  }

  function staffRoster() {
    return STOCKS_STAFF.map((s) => ({
      id: s.id, name: s.name, wage: s.wage, skill: s.skill, hired: helpers.includes(s.id) || system.state.staff.includes(s.id),
    }));
  }

  function upgradeCatalog() {
    return STOCKS_UPGRADES.map((u) => ({
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

export function createStockTradingMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  function setEvent(id) {
    const found = STOCKS_MARKET_EVENTS.find((e) => e.id === id);
    if (!found) return { ok: false, reason: 'unknown-event', id };
    currentEvent = id;
    return { ok: true, event: id };
  }

  function setSeason(id) {
    const found = STOCKS_SEASONS.find((x) => x.id === id);
    if (!found) return { ok: false, reason: 'unknown-season', id };
    currentSeason = id;
    return { ok: true, season: id };
  }

  function eventPrice(itemId, basePrice) {
    return Math.round(basePrice * stocksMarketEventMult(currentEvent, itemId) * stocksSeasonMult(currentSeason) * 10) / 10;
  }

  function bulkDeal(itemId, qty) {
    const item = stocksItemById(itemId);
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
    for (const it of STOCKS) {
      const mult = stocksMarketEventMult(currentEvent, it.id);
      if (mult !== 1) rows.push({ item: it.id, name: it.name, mult, event: currentEvent });
    }
    return rows;
  }

  function marketSummary() {
    return { event: currentEvent, season: currentSeason, dealsClaimed, bulkTraded, deals: dailyDeals() };
  }

  function seasonPrices() {
    return STOCKS.map((it) => ({ id: it.id, name: it.name, price: eventPrice(it.id, it.price) }));
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

function stocksCond(weather) {
  if (typeof weather === 'string') return weather;
  if (weather && typeof weather.condition === 'string') return weather.condition;
  return 'clear';
}

function stocksSky(table, weather) {
  const hit = table[stocksCond(weather)];
  return hit === undefined ? 1 : hit;
}

function stocksDec(n) {
  return Math.round(n * 10) / 10;
}

export function stocksRankFor(xp) {
  let lvl = 0;
  for (const r of STOCKS_RANKS) {
    if (xp >= r.xp) lvl = r.level;
  }
  return lvl;
}

export function stocksItemById(id) {
  for (const it of STOCKS) {
    if (it.id === id) return it;
  }
  return null;
}

export function stocksPriceFor(id, drift, rank, upgrades) {
  const item = stocksItemById(id);
  if (!item) return 0;
  let p = item.price * (1 + (drift || 0)) * (1 + (rank || 0) * 0.05);
  if (upgrades && upgrades.length >= 3) p = p * 1.1;
  return Math.max(1, stocksDec(p));
}

export function stocksCapacityFor(rank, upgrades) {
  let cap = 3 + (rank || 0);
  if (upgrades && upgrades.indexOf('trading-floor') >= 0) cap = cap + 2;
  return cap;
}

export function stocksPayoutFor(item, rank, upgrades, weather, boosted) {
  if (!item) return 0;
  let mult = 0.6 + (rank || 0) * 0.1;
  if (boosted) mult = mult + 0.3;
  mult = mult * stocksSky({ rain: 1.0, sunny: 1.0, storm: 0.7 }, weather);
  if (upgrades && upgrades.length >= 4) mult = mult * 1.15;
  const payout = Math.round(item.price * mult);
  return payout < 5 ? 5 : payout;
}

export function stocksCrowdFor(item, rank, weather) {
  const base = 10 + (item ? item.difficulty : 0) * 8 + (rank || 0) * 5;
  const crowd = Math.round(base * stocksSky({ rain: 1.0, sunny: 1.0, storm: 0.5 }, weather));
  return crowd < 1 ? 1 : crowd;
}

export function stocksUpgradeById(id) {
  for (const u of STOCKS_UPGRADES) {
    if (u.id === id) return u;
  }
  return null;
}

export function stocksStaffById(id) {
  for (const s of STOCKS_STAFF) {
    if (s.id === id) return s;
  }
  return null;
}

export function stocksEventById(id) {
  for (const e of STOCKS_DAILY_EVENTS) {
    if (e.id === id) return e;
  }
  for (const e of STOCKS_MARKET_EVENTS) {
    if (e.id === id) return e;
  }
  return null;
}

export function stocksTipFor(day) {
  return STOCKS_TIPS[day % STOCKS_TIPS.length];
}

export function stocksFactFor(day) {
  return STOCKS_FACTS[day % STOCKS_FACTS.length];
}

export function stocksNpcLineFor(day) {
  return STOCKS_NPC_LINES[day % STOCKS_NPC_LINES.length];
}

export function stocksGuideStep(step) {
  if (step < 0 || step >= STOCKS_GUIDE.length) return null;
  return STOCKS_GUIDE[step];
}

export function stocksSeasonMult(seasonId) {
  for (const s of STOCKS_SEASONS) {
    if (s.id === seasonId) return s.mult;
  }
  return 1;
}

export function stocksMarketEventMult(eventId, itemId) {
  if (!eventId) return 1;
  for (const e of STOCKS_MARKET_EVENTS) {
    if (e.id === eventId) {
      if (e.item === itemId) return e.mult;
      return 1;
    }
  }
  return 1;
}

export function stocksWeeklyGoal(state) {
  const runs = { have: state.runsDone, goal: 5, done: state.runsDone >= 5 };
  const earned = { have: state.earned, goal: 500, done: state.earned >= 500 };
  const visitors = { have: state.visitors, goal: 100, done: state.visitors >= 100 };
  return { runs, earned, visitors, allDone: runs.done && earned.done && visitors.done };
}

export function stocksEfficiency(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 100;
  return Math.round((state.runsDone / total) * 100);
}

export function stocksProfitPerRun(state) {
  if (state.runsDone === 0) return 0;
  return stocksDec(state.earned / state.runsDone);
}

export function stocksInventoryValue(state) {
  let sum = 0;
  for (const id of Object.keys(state.owned)) {
    const item = stocksItemById(id);
    if (!item) continue;
    sum = sum + item.price * (state.levels[id] || 1);
  }
  return stocksDec(sum);
}

export function stocksSummary(state) {
  return 'Stock Trading at rank ' + stocksRankNameFor(state.rank) + ': ' + state.runsDone + ' runs, ' + state.itemsOwned + ' entries, $' + state.earned + ' earned, ' + state.visitors + ' visitors.';
}

export function stocksNextGoal(state) {
  if (state.itemsOwned === 0) return 'Open your first entry.';
  if (state.runsDone < 5) return 'Finish 5 runs.';
  if (state.earned < 500) return 'Earn $500 in total.';
  if (state.rank < 2) return 'Reach rank ' + stocksRankNameFor(2) + '.';
  if (state.upgradesOwned < 4) return 'Own 4 upgrades.';
  return 'Become a legend of the Stock Trading.';
}

export function stocksRecordFor(id, state) {
  let rec = null;
  for (const r of STOCKS_RECORDS) {
    if (r.id === id) rec = r;
  }
  if (!rec) return null;
  const value = state[rec.stat] === undefined ? 0 : state[rec.stat];
  return { id: rec.id, name: rec.name, stat: rec.stat, unit: rec.unit, desc: rec.desc, value };
}

export function stocksAllRecords(state) {
  const out = [];
  for (const r of STOCKS_RECORDS) out.push(stocksRecordFor(r.id, state));
  return out;
}

export function stocksLeaderboardWith(score) {
  const board = [];
  for (const e of STOCKS_LEADERBOARD) {
    if (e.name === 'You') board.push({ name: e.name, score, desc: e.desc });
    else board.push({ name: e.name, score: e.score, desc: e.desc });
  }
  board.sort((a, b) => b.score - a.score);
  const ranked = [];
  for (let i = 0; i < board.length; i++) {
    ranked.push({ rank: i + 1, name: board[i].name, score: board[i].score, desc: board[i].desc });
  }
  return ranked;
}

export function stocksSeasonReport(state, seasonId) {
  const mult = stocksSeasonMult(seasonId);
  const rows = [];
  for (const it of STOCKS) {
    rows.push({
      id: it.id,
      name: it.name,
      basePrice: it.price,
      seasonPrice: stocksDec(it.price * mult),
      owned: !!state.owned[it.id],
      level: state.levels[it.id] || 0,
    });
  }
  return rows;
}

export function stocksChallengeProgress(challenge, state) {
  const have = Math.floor(state[challenge.target] || 0);
  return { id: challenge.id, name: challenge.name, have, goal: challenge.goal, done: have >= challenge.goal, xp: challenge.xp };
}

export function stocksBestEntryFor(rank) {
  let best = null;
  let bestScore = -1;
  for (const it of STOCKS) {
    if (it.difficulty > rank + 2) continue;
    const score = (it.price * (1 + it.rarity * 2)) / it.difficulty;
    if (score > bestScore) {
      bestScore = score;
      best = it;
    }
  }
  return best;
}

export function stocksEventFor(day) {
  return STOCKS_MARKET_EVENTS[day % STOCKS_MARKET_EVENTS.length];
}

export function stocksDailyEventFor(day) {
  return STOCKS_DAILY_EVENTS[day % STOCKS_DAILY_EVENTS.length];
}

export function stocksRankNameFor(level) {
  for (const r of STOCKS_RANKS) {
    if (r.level === level) return r.name;
  }
  return 'Unknown';
}

export function stocksTotalValue(state) {
  return stocksDec(stocksInventoryValue(state) + state.pending + state.earned);
}

export function stocksProgressPercent(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 0;
  return Math.round((state.runsDone / total) * 100);
}

export function stocksStaffBonusFor(staffIds, skill) {
  let total = 0;
  for (const id of staffIds) {
    const s = stocksStaffById(id);
    if (s && s.skill === skill) total = total + s.bonus;
  }
  return total;
}

export function stocksCheapestEntry() {
  let best = STOCKS[0];
  for (const it of STOCKS) {
    if (it.price < best.price) best = it;
  }
  return best;
}

export function stocksPriciestEntry() {
  let best = STOCKS[0];
  for (const it of STOCKS) {
    if (it.price > best.price) best = it;
  }
  return best;
}

export function stocksEntriesByDifficulty(difficulty) {
  const ids = [];
  for (const it of STOCKS) {
    if (it.difficulty === difficulty) ids.push(it.id);
  }
  return ids;
}

export function stocksEntriesByRarity(maxRarity) {
  const ids = [];
  for (const it of STOCKS) {
    if (it.rarity <= maxRarity) ids.push(it.id);
  }
  return ids;
}

export function stocksGradeFor(runsDone, earned, visitors) {
  const score = runsDone * 10 + Math.round(earned / 10) + Math.floor(visitors / 10);
  if (score >= 500) return 'S';
  if (score >= 300) return 'A';
  if (score >= 150) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}
