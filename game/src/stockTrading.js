// Solara Nights - Stock Trading (Round 7 mega-rebuild, written fresh).
// The Solara Exchange, from a desk above the harbour: watch stocks,
// research the charts, buy low, sell high, and collect dividends
// while the city sleeps. Prices drift every day, rumours move faster
// than facts, and one earnings beat can make a month. Never bet the
// rent money, and never trust a tipster who shouts.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.
// Mechanic: stocks.

export const STOCKS = [
  { id: 'solara-bank', name: 'Solara Bank', price: 42, rarity: 0.2, difficulty: 2, sector: 'Finance', dividend: 1.2, trend: 'steady',
    desc: 'The old harbour bank. Boring, steady, and always paying.' },
  { id: 'neon-soft', name: 'NeonSoft', price: 128, rarity: 0.12, difficulty: 3, sector: 'Tech', dividend: 0.4, trend: 'rising',
    desc: 'Software for every shop in Solara, growing fast.' },
  { id: 'harbor-ship', name: 'Harbor Shipping', price: 35, rarity: 0.18, difficulty: 2, sector: 'Logistics', dividend: 1.5, trend: 'steady',
    desc: 'Container ships, cranes, and a dividend like clockwork.' },
  { id: 'sun-foods', name: 'Sun Foods', price: 58, rarity: 0.22, difficulty: 1, sector: 'Food', dividend: 1.8, trend: 'steady',
    desc: 'Bread, fruit and sunshine in every supermarket aisle.' },
  { id: 'cloud-nine', name: 'CloudNine AI', price: 210, rarity: 0.08, difficulty: 4, sector: 'Tech', dividend: 0, trend: 'rising',
    desc: 'The AI darling. No dividend, all dreams.' },
  { id: 'bay-air', name: 'Bay Air', price: 76, rarity: 0.15, difficulty: 3, sector: 'Travel', dividend: 0.6, trend: 'falling',
    desc: 'Small planes, big fuel bills, and a nervous market.' },
  { id: 'green-energy', name: 'GreenVolt Energy', price: 95, rarity: 0.13, difficulty: 3, sector: 'Energy', dividend: 0.9, trend: 'rising',
    desc: 'Solar panels on every roof in the city.' },
  { id: 'retro-toys', name: 'Retro Toys', price: 22, rarity: 0.25, difficulty: 1, sector: 'Retail', dividend: 0.8, trend: 'steady',
    desc: 'Wooden toys and nostalgia, selling steadily since 1987.' },
  { id: 'med-core', name: 'MedCore Labs', price: 310, rarity: 0.06, difficulty: 4, sector: 'Health', dividend: 0.5, trend: 'rising',
    desc: 'A small lab with one very promising medicine.' },
  { id: 'orbit-sat', name: 'OrbitSat', price: 145, rarity: 0.1, difficulty: 4, sector: 'Space', dividend: 0, trend: 'falling',
    desc: 'Satellites above Solara, costs above the clouds.' },
  { id: 'tide-beer', name: 'Tide Brewing', price: 64, rarity: 0.19, difficulty: 2, sector: 'Drinks', dividend: 2.1, trend: 'steady',
    desc: 'The harbour brewery. Thirsty city, thirsty dividend.' },
  { id: 'vault-gold', name: 'Vault Gold Trust', price: 180, rarity: 0.09, difficulty: 2, sector: 'Commodities', dividend: 1.1, trend: 'steady',
    desc: 'A vault of gold bars and a very calm share price.' },
];

export const STOCKS_UPGRADES = [
  { id: 'ticker-feed', name: 'Live Ticker Feed', cost: 100, effect: 'data-plus', desc: 'Prices update by the second instead of by the day.' },
  { id: 'analyst-report', name: 'Analyst Reports', cost: 250, effect: 'research-plus', desc: 'Real research, real numbers, fewer guesses.' },
  { id: 'algo-alerts', name: 'Algo Alerts', cost: 400, effect: 'alert-plus', desc: 'Your phone buzzes the second a price moves.' },
  { id: 'margin-account', name: 'Margin Account', cost: 800, effect: 'margin-plus', desc: 'Borrow to buy more. Careful: it cuts both ways.' },
  { id: 'research-desk', name: 'Research Desk', cost: 600, effect: 'desk-plus', desc: 'A quiet room, three screens, and better decisions.' },
  { id: 'tax-advisor', name: 'Tax Advisor', cost: 300, effect: 'tax-plus', desc: 'Keeps more of your gains out of the taxman\'s hands.' },
  { id: 'insider-news', name: 'Insider News Wire', cost: 1000, effect: 'news-plus', desc: 'News minutes before the rest of the market hears it.' },
  { id: 'trading-floor', name: 'Trading Floor', cost: 2000, effect: 'capacity-plus', desc: 'Your own floor above the harbour. The big leagues.' },
];

export const STOCKS_RANKS = [
  { level: 0, name: 'First Trade', xp: 0, perk: 'Trades pay base rate.' },
  { level: 1, name: 'Day Trader', xp: 150, perk: '+5% prices, the ticker feels friendly.' },
  { level: 2, name: 'Portfolio Builder', xp: 400, perk: '+10% prices, dividends start to matter.' },
  { level: 3, name: 'Market Shark', xp: 800, perk: '+15% prices, rumours reach you early.' },
  { level: 4, name: 'Wolf of Solara', xp: 1500, perk: '+20% prices, the market moves when you do.' },
];

export const STOCKS_STAFF = [
  { id: 'broker-ben', name: 'Ben the Broker', wage: 40, skill: 'trade', bonus: 0.15, desc: 'Executes orders before the price can blink.' },
  { id: 'analyst-ada', name: 'Ada the Analyst', wage: 45, skill: 'research', bonus: 0.2, desc: 'Reads balance sheets like other people read novels.' },
  { id: 'accountant-al', name: 'Al the Accountant', wage: 35, skill: 'tax', bonus: 0.15, desc: 'Finds deductions you did not know existed.' },
  { id: 'tipster-tom', name: 'Tom the Tipster', wage: 30, skill: 'tips', bonus: 0.1, desc: 'Half his tips are gold. The other half are lessons.' },
];

export const STOCKS_DAILY_EVENTS = [
  { id: 'market-rally', name: 'Market Rally', effect: 'earn', amount: 300,
    text: 'Everything rises at once. The whole city is smiling.' },
  { id: 'tech-crash', name: 'Tech Crash', effect: 'cost', amount: 150,
    text: 'Tech stocks tumble on a gloomy forecast.' },
  { id: 'dividend-day', name: 'Dividend Day', effect: 'earn', amount: 200,
    text: 'Dividends land in accounts across Solara.' },
  { id: 'ipo-buzz', name: 'IPO Buzz', effect: 'visitors', amount: 30,
    text: 'A hot new listing has everyone talking.' },
  { id: 'rumor-mill', name: 'Rumor Mill', effect: 'xp', amount: 20,
    text: 'A wild rumour moves prices before lunch.' },
  { id: 'rate-hike', name: 'Rate Hike', effect: 'cost', amount: 120,
    text: 'The central bank raises rates. Borrowers groan.' },
  { id: 'earnings-beat', name: 'Earnings Beat', effect: 'earn', amount: 350,
    text: 'Your watched stocks beat expectations across the board.' },
  { id: 'short-squeeze', name: 'Short Squeeze', effect: 'earn', amount: 400,
    text: 'Short sellers scramble. Prices spike like fireworks.' },
  { id: 'quiet-market', name: 'Quiet Market', effect: 'xp', amount: 15,
    text: 'A flat, sleepy day. Time to read annual reports.' },
  { id: 'whale-buy', name: 'Whale Buy', effect: 'earn', amount: 250,
    text: 'A big buyer sweeps in and lifts the whole market.' },
];

export const STOCKS_TIPS = [
  { id: 'dividend-sleep', name: 'Dividend Sleep', text: 'Dividend stocks pay you while you sleep. Buy them first.' },
  { id: 'never-all-in', name: 'Never All-In', text: 'One stock should never be your whole portfolio.' },
  { id: 'research-first', name: 'Research First', text: 'Research before you buy. The chart tells you what the tipster will not.' },
  { id: 'drift-days', name: 'Drift Days', text: 'Prices drift daily. A stock cheap today may be dearer tomorrow.' },
  { id: 'earnings-calendar', name: 'Earnings Calendar', text: 'Know the earnings dates. Surprises move prices hardest.' },
  { id: 'rumor-rule', name: 'Rumor Rule', text: 'Buy the rumour, sell the news, and never marry a stock.' },
  { id: 'tax-note', name: 'Tax Note', text: 'An accountant costs money and saves more. Hire one early.' },
  { id: 'calm-hands', name: 'Calm Hands', text: 'The market rewards patience more than panic.' },
];

export const STOCKS_CHALLENGES = [
  { id: 'first-steps', name: 'First Steps', target: 'runsDone', goal: 3, xp: 40, desc: 'Finish 3 stock market runs.' },
  { id: 'regular', name: 'Regular', target: 'runsDone', goal: 10, xp: 90, desc: 'Finish 10 stock market runs.' },
  { id: 'collector', name: 'Collector', target: 'itemsOwned', goal: 4, xp: 100, desc: 'Own 4 different stock market entries.' },
  { id: 'big-earner', name: 'Big Earner', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from the stock market business.' },
  { id: 'crowd-favourite', name: 'Crowd Favourite', target: 'visitors', goal: 200, xp: 110, desc: 'Draw 200 visitors through the stock market business.' },
  { id: 'respected', name: 'Respected Name', target: 'reputation', goal: 10, xp: 100, desc: 'Reach 10 reputation in the stock market business.' },
  { id: 'best-day', name: 'Best Day Ever', target: 'bestRun', goal: 400, xp: 130, desc: 'Score a single run worth $400 or more.' },
  { id: 'fully-kitted', name: 'Fully Kitted', target: 'upgradesOwned', goal: 6, xp: 150, desc: 'Own 6 upgrades for the stock market business.' },
];

export const STOCKS_ACHIEVEMENTS = [
  { id: 'first-run', name: 'First Run', target: 'runsDone', goal: 1, desc: 'Finish your first stock market run.' },
  { id: 'first-sale', name: 'First Payday', target: 'earned', goal: 1, desc: 'Collect your first dollar of stock market earnings.' },
  { id: 'ten-runs', name: 'Ten Runs Deep', target: 'runsDone', goal: 10, desc: 'Finish 10 stock market runs.' },
  { id: 'thousand-club', name: 'Thousand Club', target: 'earned', goal: 1000, desc: 'Earn $1,000 in total from the stock market business.' },
  { id: 'five-hundred-faces', name: 'Five Hundred Faces', target: 'visitors', goal: 500, desc: 'Welcome 500 visitors through the stock market business.' },
  { id: 'rank-three', name: 'Rising Star', target: 'rank', goal: 3, desc: 'Reach rank 3 in the stock market business.' },
  { id: 'full-shelf', name: 'Full Shelf', target: 'itemsOwned', goal: 8, desc: 'Own 8 different stock market entries at once.' },
  { id: 'streak-five', name: 'On A Roll', target: 'bestStreak', goal: 5, desc: 'Build a 5-run streak without a failed stock market run.' },
];

export const STOCKS_LEADERBOARD = [
  { name: 'Big Bull Bruno', score: 4200, desc: 'Buys everything, sells nothing, somehow wins.' },
  { name: 'The Quant Queen', score: 3100, desc: 'Algorithms, spreadsheets, and zero emotions.' },
  { name: 'Old Man Market', score: 2400, desc: 'Forty years in the market. Never in a hurry.' },
  { name: 'Penny-Stock Pete', score: 1500, desc: 'Lives on tips, luck, and very cheap shares.' },
  { name: 'You', score: 0, desc: 'Climbing the stock market ladder.' },
];

export const STOCKS_RECORDS = [
  { id: 'biggest-run', name: 'Biggest Run', stat: 'bestRun', unit: '$', desc: 'Best single-run payout.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money earned overall.' },
  { id: 'most-visitors', name: 'Most Visitors', stat: 'visitors', unit: 'people', desc: 'Most visitors welcomed.' },
  { id: 'most-runs', name: 'Most Runs', stat: 'runsDone', unit: 'runs', desc: 'Most runs finished.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'runs', desc: 'Longest run streak.' },
];

export const STOCKS_MARKET_EVENTS = [
  { id: 'solara-bank-surge', name: 'Solara Bank Surge', item: 'solara-bank', mult: 1.35, desc: 'Demand for Solara Bank swings hard this week.' },
  { id: 'neon-soft-surge', name: 'NeonSoft Surge', item: 'neon-soft', mult: 0.7, desc: 'Demand for NeonSoft swings hard this week.' },
  { id: 'harbor-ship-surge', name: 'Harbor Shipping Surge', item: 'harbor-ship', mult: 1.35, desc: 'Demand for Harbor Shipping swings hard this week.' },
  { id: 'sun-foods-surge', name: 'Sun Foods Surge', item: 'sun-foods', mult: 0.7, desc: 'Demand for Sun Foods swings hard this week.' },
  { id: 'cloud-nine-surge', name: 'CloudNine AI Surge', item: 'cloud-nine', mult: 1.35, desc: 'Demand for CloudNine AI swings hard this week.' },
  { id: 'bay-air-surge', name: 'Bay Air Surge', item: 'bay-air', mult: 0.7, desc: 'Demand for Bay Air swings hard this week.' },
  { id: 'green-energy-surge', name: 'GreenVolt Energy Surge', item: 'green-energy', mult: 1.35, desc: 'Demand for GreenVolt Energy swings hard this week.' },
  { id: 'retro-toys-surge', name: 'Retro Toys Surge', item: 'retro-toys', mult: 0.7, desc: 'Demand for Retro Toys swings hard this week.' },
  { id: 'med-core-surge', name: 'MedCore Labs Surge', item: 'med-core', mult: 1.35, desc: 'Demand for MedCore Labs swings hard this week.' },
  { id: 'orbit-sat-surge', name: 'OrbitSat Surge', item: 'orbit-sat', mult: 0.7, desc: 'Demand for OrbitSat swings hard this week.' },
  { id: 'tide-beer-surge', name: 'Tide Brewing Surge', item: 'tide-beer', mult: 1.35, desc: 'Demand for Tide Brewing swings hard this week.' },
  { id: 'vault-gold-surge', name: 'Vault Gold Trust Surge', item: 'vault-gold', mult: 0.7, desc: 'Demand for Vault Gold Trust swings hard this week.' },
];

export const STOCKS_SEASONS = [
  { id: 'bull-spring', name: 'Bull Spring', mult: 1.1, desc: 'New year, new money, rising prices.' },
  { id: 'summer-rally', name: 'Summer Rally', mult: 1.15, desc: 'Holiday spending lifts the whole market.' },
  { id: 'autumn-correction', name: 'Autumn Correction', mult: 0.95, desc: 'Profit-taking trims the summer gains.' },
  { id: 'winter-bear', name: 'Winter Bear', mult: 0.9, desc: 'Cold markets, cautious buyers, cheap stocks.' },
];

export const STOCKS_FACTS = [
  { id: 'fact-solara-bank', text: 'Solara Bank: The old harbour bank. Boring, steady, and always paying.' },
  { id: 'fact-neon-soft', text: 'NeonSoft: Software for every shop in Solara, growing fast.' },
  { id: 'fact-harbor-ship', text: 'Harbor Shipping: Container ships, cranes, and a dividend like clockwork.' },
  { id: 'fact-sun-foods', text: 'Sun Foods: Bread, fruit and sunshine in every supermarket aisle.' },
  { id: 'fact-cloud-nine', text: 'CloudNine AI: The AI darling. No dividend, all dreams.' },
  { id: 'fact-bay-air', text: 'Bay Air: Small planes, big fuel bills, and a nervous market.' },
  { id: 'fact-green-energy', text: 'GreenVolt Energy: Solar panels on every roof in the city.' },
  { id: 'fact-retro-toys', text: 'Retro Toys: Wooden toys and nostalgia, selling steadily since 1987.' },
  { id: 'fact-med-core', text: 'MedCore Labs: A small lab with one very promising medicine.' },
  { id: 'fact-orbit-sat', text: 'OrbitSat: Satellites above Solara, costs above the clouds.' },
  { id: 'fact-tide-beer', text: 'Tide Brewing: The harbour brewery. Thirsty city, thirsty dividend.' },
  { id: 'fact-vault-gold', text: 'Vault Gold Trust: A vault of gold bars and a very calm share price.' },
  { id: 'fact-general-0', text: 'The best stock market operators in Solara check their prices every morning before opening.' },
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

export const STOCKS_NPC_LINES = [
  { id: 'npc-0', text: 'I came all the way across town for the Solara Bank. Worth it.' },
  { id: 'npc-1', text: 'My cousin runs a stock market place too, but yours is better. Do not tell him.' },
  { id: 'npc-2', text: 'Is the Harbor Shipping really as good as everyone says? I am about to find out.' },
  { id: 'npc-3', text: 'I bring my kids here every weekend. They ask for the NeonSoft by name.' },
  { id: 'npc-4', text: 'You should put the Sun Foods on a poster. People would come just for that.' },
  { id: 'npc-5', text: 'I heard the CloudNine AI here is the best in Solara. The rumour was right.' },
  { id: 'npc-6', text: 'Quiet day today. The Bay Air still made my afternoon.' },
  { id: 'npc-7', text: 'I saved up for weeks to try the GreenVolt Energy. No regrets.' },
  { id: 'npc-8', text: 'The staff told me about the Retro Toys. Now I tell everyone I meet.' },
  { id: 'npc-9', text: 'I have been to every stock market spot in the city. This one wins.' },
  { id: 'npc-10', text: 'One day I want to run a stock market place of my own. I am taking notes.' },
  { id: 'npc-11', text: 'The MedCore Labs is the reason my friends finally believe my stories.' },
  { id: 'npc-12', text: 'Do you ever get tired of the OrbitSat? I never would.' },
  { id: 'npc-13', text: 'I wrote a review about the Tide Brewing last night. Five stars, obviously.' },
  { id: 'npc-14', text: 'My grandmother loved the Vault Gold Trust. I come here to remember her.' },
  { id: 'npc-15', text: 'If the Solara Bank gets any better, the whole city will queue around the block.' },
];

export const STOCKS_GUIDE = [
  { id: 'guide-0', text: 'Open your first stock market entry: it costs cash, but it unlocks everything else.' },
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

export function stocksRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < STOCKS_RANKS.length; i++) {
    if (xp >= STOCKS_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function stocksItemById(id) {
  return STOCKS.find((x) => x.id === id) || null;
}

export function stocksPriceFor(id, drift, rank, upgrades) {
  const item = STOCKS.find((x) => x.id === id);
  if (!item) return 0;
  let price = item.price;
  price *= 1 + (drift[id] || 0);
  price *= 1 + rank * 0.05;
  if (upgrades && upgrades.length >= 3) price *= 1.1;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function stocksCapacityFor(rank, upgrades) {
  let cap = 3 + rank;
  if (upgrades && upgrades.indexOf('trading-floor') >= 0) cap += 2;
  return cap;
}

export function stocksPayoutFor(item, rank, upgrades, weather, boosted) {
  let mult = 0.6 + rank * 0.1 + (boosted ? 0.3 : 0);
  if (weather === 'rain') mult *= 1.0;
  if (weather === 'sunny') mult *= 1.0;
  if (weather === 'storm') mult *= 0.7;
  if (upgrades && upgrades.length >= 4) mult *= 1.15;
  return Math.max(5, Math.round(item.price * mult));
}

export function stocksCrowdFor(item, rank, weather) {
  let crowd = 10 + item.difficulty * 8 + rank * 5;
  if (weather === 'rain') crowd = Math.round(crowd * 1.0);
  if (weather === 'sunny') crowd = Math.round(crowd * 1.0);
  if (weather === 'storm') crowd = Math.round(crowd * 0.5);
  return Math.max(1, crowd);
}

export function stocksUpgradeById(id) {
  return STOCKS_UPGRADES.find((x) => x.id === id) || null;
}

export function stocksStaffById(id) {
  return STOCKS_STAFF.find((x) => x.id === id) || null;
}

export function stocksEventById(id) {
  return STOCKS_DAILY_EVENTS.find((x) => x.id === id) || null;
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
  return STOCKS_GUIDE[step] || null;
}

export function stocksSeasonMult(seasonId) {
  const s = STOCKS_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function stocksMarketEventMult(eventId, itemId) {
  const ev = STOCKS_MARKET_EVENTS.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.item === itemId ? ev.mult : 1;
}

export function stocksWeeklyGoal(state) {
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

export function stocksEfficiency(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 100;
  return Math.round((state.runsDone / total) * 100);
}

export function stocksProfitPerRun(state) {
  if (state.runsDone === 0) return 0;
  return Math.round((state.earned / state.runsDone) * 10) / 10;
}

export function stocksInventoryValue(state) {
  let total = 0;
  for (const id of Object.keys(state.owned || {})) {
    const item = STOCKS.find((x) => x.id === id);
    if (item) total += item.price * (state.levels[id] || 1);
  }
  return Math.round(total * 10) / 10;
}

export function stocksSummary(state) {
  const rankName = STOCKS_RANKS[state.rank] ? STOCKS_RANKS[state.rank].name : 'Unknown';
  return 'Stock Trading ' + rankName + ': ' + state.runsDone + ' runs, '
    + state.itemsOwned + ' entries, $' + Math.round(state.earned)
    + ' earned, ' + state.visitors + ' visitors.';
}

export function stocksNextGoal(state) {
  if (state.itemsOwned < 1) return 'Open your first entry.';
  if (state.runsDone < 5) return 'Finish 5 runs.';
  if (state.earned < 500) return 'Earn $500 in total.';
  if (state.rank < 2) return 'Reach rank ' + STOCKS_RANKS[2].name + '.';
  if (state.upgradesOwned < 4) return 'Own 4 upgrades.';
  return 'Become a Stock Trading legend.';
}

export function stocksRecordFor(recordId, state) {
  const r = STOCKS_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function stocksAllRecords(state) {
  return STOCKS_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function stocksLeaderboardWith(playerScore) {
  const board = STOCKS_LEADERBOARD.map((e) => ({
    name: e.name, score: e.name === 'You' ? playerScore : e.score, desc: e.desc,
  }));
  board.sort((a, b) => b.score - a.score);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, score: e.score, desc: e.desc }));
}

export function stocksSeasonReport(state, seasonId) {
  const mult = stocksSeasonMult(seasonId);
  return STOCKS.map((item) => ({
    id: item.id,
    name: item.name,
    basePrice: item.price,
    seasonPrice: Math.round(item.price * mult * 10) / 10,
    owned: !!state.owned[item.id],
    level: state.levels[item.id] || 0,
  }));
}

export function stocksChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return {
    id: challenge.id, name: challenge.name, have: Math.floor(v),
    goal: challenge.goal, done: v >= challenge.goal, xp: challenge.xp,
  };
}

export function stocksBestEntryFor(rank) {
  let best = null;
  let bestScore = -1;
  for (const item of STOCKS) {
    if (item.difficulty > rank + 2) continue;
    const score = item.price * (1 + item.rarity * 2) / item.difficulty;
    if (score > bestScore) { bestScore = score; best = item; }
  }
  return best;
}

export function createStockTradingSystem(ctx) {
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
  const MECH = 'stocks';

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
  for (const item of STOCKS) {
    state.drift[item.id] = 0;
    state.prices[item.id] = item.price;
  }

  function refreshRank() {
    const r = stocksRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log('Stock Trading rank up: ' + STOCKS_RANKS[r].name + ' - ' + STOCKS_RANKS[r].perk);
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
      const s = STOCKS_STAFF.find((x) => x.id === id);
      if (s && s.skill === skill) bonus += s.bonus;
    }
    return bonus;
  }

  function driftPrices() {
    for (const item of STOCKS) {
      const roll = rng();
      if (roll < 0.35) {
        const change = Math.round((rng() * 0.24 - 0.12) * 100) / 100;
        state.drift[item.id] = Math.round((state.drift[item.id] + change) * 100) / 100;
        state.prices[item.id] = Math.max(1, Math.round(item.price * (1 + state.drift[item.id]) * 10) / 10);
      }
    }
  }

  function watchStock(id) {
    const item = STOCKS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-stock' };
    if (state.owned[id]) return { ok: false, reason: 'already-owned' };
    if (state.itemsOwned >= stocksCapacityFor(state.rank, state.upgrades)) {
      return { ok: false, reason: 'capacity-full', cap: stocksCapacityFor(state.rank, state.upgrades) };
    }
    if (state.rank < Math.max(0, item.difficulty - 2)) {
      return { ok: false, reason: 'rank-too-low', need: Math.max(0, item.difficulty - 2) };
    }
    const cost = stocksPriceFor(id, state.drift, 0, []);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned[id] = 1;
    state.levels[id] = 1;
    state.itemsOwned += 1;
    gainXp(10);
    log('Watching ' + item.name + ' for $' + cost + '. Welcome to the Stock Trading business.');
    return { ok: true, id, cost, name: item.name };
  }

  function researchStock(id) {
    const item = STOCKS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-stock' };
    if (state.active) return { ok: false, reason: 'already-running', active: state.activeId };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned' };
    if (getCash() < 25) return { ok: false, reason: 'not-enough-cash', cost: 25 };
    addCash(-25);
    state.spent += 25;
    const tip = state.drift[id] >= 0 ? 'rising' : 'falling';
    state.runsDone += 1;
    gainXp(15);
    log('Research done on ' + item.name + ': the chart looks ' + tip + ' today.');
    return { ok: true, id, tip, drift: state.drift[id], price: state.prices[id] };
  }

  function settleRun() {
    const id = state.activeId;
    const item = STOCKS.find((x) => x.id === id);
    state.active = null;
    state.activeId = null;
    state.activeTimer = 0;
    if (!item) return;
    const cond = weatherCond();
    const boosted = !!state.boosted[id];
    const payout = stocksPayoutFor(item, state.rank, state.upgrades, cond, boosted);
    const crowd = stocksCrowdFor(item, state.rank, cond);
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
    log('Research filed on ' + item.name + ': ' + crowd + ' visitors, $' + payout + ' in the till.');
  }

  function collectDividends() {
    if (state.pending <= 0) return { ok: false, reason: 'nothing-pending' };
    const amount = state.pending;
    state.pending = 0;
    state.earned += amount;
    addCash(amount);
    log('Collected $' + amount + ' from the till.');
    return { ok: true, amount };
  }

  function sellShares(id, qty) {
    const item = STOCKS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-stock' };
    const n = qty && qty > 0 ? Math.floor(qty) : 1;
    const held = state.holdings[id] || 0;
    if (held < n) return { ok: false, reason: 'not-enough', have: held };
    const price = state.prices[id];
    const total = Math.round(price * n * 10) / 10;
    state.holdings[id] = held - n;
    addCash(total);
    state.earned += total;
    gainXp(5);
    log('Sold ' + n + ' shares of ' + item.name + ' for $' + total + '.');
    return { ok: true, total, qty: n, price };
  }

  function buyShares(id, qty) {
    const item = STOCKS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-stock' };
    const n = qty && qty > 0 ? Math.floor(qty) : 10;
    const cost = Math.round(state.prices[item.id] * n * 10) / 10;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.holdings[item.id] = (state.holdings[item.id] || 0) + n;
    gainXp(5);
    log('Bought ' + n + ' shares of ' + item.name + ' for $' + cost + '.');
    return { ok: true, id, qty: n, cost };
  }

  function buyUpgrade(id) {
    const u = STOCKS_UPGRADES.find((x) => x.id === id);
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
    const s = STOCKS_STAFF.find((x) => x.id === id);
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
    const item = STOCKS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-stock' };
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
    return STOCKS.map((item) => ({
      id: item.id,
      name: item.name,
      price: stocksPriceFor(item.id, state.drift, state.rank, state.upgrades),
      basePrice: item.price,
      drift: state.drift[item.id],
      owned: !!state.owned[item.id],
      level: state.levels[item.id] || 0,
      difficulty: item.difficulty,
      rarity: item.rarity,
    }));
  }

  function listItems() {
    return STOCKS.map((item) => ({
      id: item.id, name: item.name, price: item.price,
      difficulty: item.difficulty, rarity: item.rarity, desc: item.desc,
      owned: !!state.owned[item.id],
    }));
  }

  function info(id) {
    const item = STOCKS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-stock' };
    return {
      ok: true, item,
      owned: !!state.owned[id],
      level: state.levels[id] || 0,
      price: stocksPriceFor(id, state.drift, state.rank, state.upgrades),
      holdings: state.holdings[id] || 0,
    };
  }

  function dailyEvent() {
    const idx = Math.floor(rng() * STOCKS_DAILY_EVENTS.length);
    const ev = STOCKS_DAILY_EVENTS[idx];
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
    let div = 0;
    for (const item of STOCKS) {
      const held = state.holdings[item.id] || 0;
      if (held > 0 && item.dividend) div += Math.round(held * item.dividend * 10) / 10;
    }
    if (div > 0) {
      state.pending += div;
      state.dividendsPaid += div;
      log('Dividends paid: $' + div + ' waiting in the till.');
    }
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
    for (const item of STOCKS) {
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
      name: 'Stock Trading',
      mechanic: MECH,
      rank: STOCKS_RANKS[state.rank] ? STOCKS_RANKS[state.rank].name : 'Unknown',
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
    if (state.active) {
      return 'Stock Trading: running ' + state.activeId + ' - ' + Math.max(0, Math.ceil(state.activeTimer)) + 's left';
    }
    if (state.pending > 0) {
      return 'Stock Trading: $' + Math.round(state.pending) + ' waiting in the till';
    }
    if (state.itemsOwned > 0) {
      return 'Stock Trading: ' + state.itemsOwned + ' entries, $' + Math.round(state.earned) + ' earned';
    }
    return '';
  }

  function interact(action, a, b) {
    if (!action || action === 'status') return { ok: true, stats: stats(), hint: 'open <stock> to watch it, run <stock> to research it, special <stock> <qty> to buy shares' };
    if (action === 'open') return watchStock(a);
    if (action === 'run') return researchStock(a);
    if (action === 'collect') return collectDividends();
    if (action === 'sell') return sellShares(a, b);
    if (action === 'upgrade') return buyUpgrade(a);
    if (action === 'levelup') return upgradeItem(a);
    if (action === 'hire') return hireStaff(a);
    if (action === 'fire') return fireStaff(a);
    if (action === 'special') return buyShares(a, b);
    if (action === 'info') return info(a);
    if (action === 'prices') return { ok: true, prices: priceBoard() };
    if (action === 'list') return { ok: true, items: listItems() };
    if (action === 'event') return dailyEvent();
    return { ok: false, reason: 'unknown-action', action };
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
    upgrade: buyUpgrade,
    hire: hireStaff,
  };
}

export function createStockTradingExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function challenges() {
    return STOCKS_CHALLENGES.map((ch) => stocksChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = STOCKS_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.indexOf(id) >= 0) return { ok: false, reason: 'already-claimed' };
    const p = stocksChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    system.state.challengesClaimed.push(id);
    if (typeof system.gainXp === 'function') system.gainXp(ch.xp);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return STOCKS_ACHIEVEMENTS.map((a) => ({
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
    const h = STOCKS_STAFF.find((x) => x.id === id);
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
      const h = STOCKS_STAFF.find((x) => x.id === id);
      if (h) due += h.wage;
    }
    helperWagesPaid += due;
    system.state.wagesPaid += due;
    return { due, helpers: helpers.slice(), totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    let bonus = 0;
    for (const id of helpers) {
      const h = STOCKS_STAFF.find((x) => x.id === id);
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
    const item = STOCKS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-stock' };
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
      id: s.id, name: s.name, wage: s.wage, skill: s.skill,
      hired: helpers.indexOf(s.id) >= 0 || system.state.staff.indexOf(s.id) >= 0,
    }));
  }

  function upgradeCatalog() {
    return STOCKS_UPGRADES.map((u) => ({
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

export function createStockTradingMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  function setEvent(eventId) {
    const ev = STOCKS_MARKET_EVENTS.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = STOCKS_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(itemId, basePrice) {
    let price = basePrice;
    price *= stocksMarketEventMult(currentEvent, itemId);
    price *= stocksSeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(itemId, qty) {
    const item = STOCKS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-stock' };
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
    for (const item of STOCKS) {
      const mult = stocksMarketEventMult(currentEvent, item.id);
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
    return STOCKS.map((item) => ({
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

export function stocksEventFor(day) {
  return STOCKS_MARKET_EVENTS[day % STOCKS_MARKET_EVENTS.length];
}

export function stocksDailyEventFor(day) {
  return STOCKS_DAILY_EVENTS[day % STOCKS_DAILY_EVENTS.length];
}

export function stocksRankNameFor(rank) {
  const r = STOCKS_RANKS[rank];
  return r ? r.name : 'Unknown';
}

export function stocksTotalValue(state) {
  const inv = stocksInventoryValue(state);
  return Math.round((inv + state.pending + state.earned) * 10) / 10;
}

export function stocksProgressPercent(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 0;
  return Math.round((state.runsDone / total) * 100);
}

export function stocksStaffBonusFor(staffIds, skill) {
  let bonus = 0;
  for (const id of staffIds) {
    const s = STOCKS_STAFF.find((x) => x.id === id);
    if (s && s.skill === skill) bonus += s.bonus;
  }
  return bonus;
}

export function stocksCheapestEntry() {
  let best = STOCKS[0];
  for (const item of STOCKS) {
    if (item.price < best.price) best = item;
  }
  return best;
}

export function stocksPriciestEntry() {
  let best = STOCKS[0];
  for (const item of STOCKS) {
    if (item.price > best.price) best = item;
  }
  return best;
}

export function stocksEntriesByDifficulty(difficulty) {
  return STOCKS.filter((x) => x.difficulty === difficulty).map((x) => x.id);
}

export function stocksEntriesByRarity(maxRarity) {
  return STOCKS.filter((x) => x.rarity <= maxRarity).map((x) => x.id);
}

export function stocksGradeFor(runsDone, earned, visitors) {
  const score = runsDone * 10 + Math.round(earned / 10) + Math.floor(visitors / 10);
  if (score >= 500) return 'S';
  if (score >= 300) return 'A';
  if (score >= 150) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}

export const STOCKS_META = {
  system: 'stocks',
  version: '7-B4',
  author: 'builder-4',
  mechanic: 'stocks',
  dataCount: STOCKS.length,
  dataName: 'STOCKS',
};
