// Solara Nights - Car Wash (Round 7 mega-rebuild, written fresh).
// The Gleaming Gull car wash: offer wash packages, run the bays, and
// send every car out shining like a showroom dream. Sunny days bring
// queues around the block; rain sends everyone home. Foam, wax,
// ceramic coats and one very serious vacuum row. A clean car is a
// happy driver, and a happy driver tells the whole street.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.
// Mechanic: venue.

export const WASH_PACKAGES = [
  { id: 'quick-rinse', name: 'Quick Rinse', price: 8, rarity: 0.35, difficulty: 1, minutes: 5, shine: 1, extras: 'Water only',
    desc: 'Five minutes, a splash of water, and off you go.' },
  { id: 'standard-wash', name: 'Standard Wash', price: 15, rarity: 0.3, difficulty: 1, minutes: 10, shine: 2, extras: 'Soap and rinse',
    desc: 'Soap, scrub, rinse, and a wave goodbye.' },
  { id: 'foam-party', name: 'Foam Party Wash', price: 25, rarity: 0.22, difficulty: 2, minutes: 15, shine: 3, extras: 'Thick foam',
    desc: 'A mountain of foam swallows the car whole. Kids love it.' },
  { id: 'wax-shine', name: 'Wax Shine', price: 35, rarity: 0.18, difficulty: 2, minutes: 20, shine: 4, extras: 'Hand wax',
    desc: 'Hand wax, slow circles, and a mirror finish.' },
  { id: 'interior-detail', name: 'Interior Detail', price: 50, rarity: 0.15, difficulty: 3, minutes: 30, shine: 4, extras: 'Vacuum and dash',
    desc: 'Crumbs, dust and mystery smells, all evicted.' },
  { id: 'full-detail', name: 'Full Detail', price: 90, rarity: 0.1, difficulty: 3, minutes: 60, shine: 5, extras: 'Inside and out',
    desc: 'The works: inside, outside, and every forgotten corner.' },
  { id: 'ceramic-coat', name: 'Ceramic Coating', price: 180, rarity: 0.06, difficulty: 4, minutes: 90, shine: 5, extras: '12-month coat',
    desc: 'A glass-hard shield that laughs at bird droppings.' },
  { id: 'engine-bay', name: 'Engine Bay Clean', price: 45, rarity: 0.14, difficulty: 3, minutes: 25, shine: 3, extras: 'Degrease',
    desc: 'Grease gone, engine gleaming like it just left the factory.' },
  { id: 'pet-hair-special', name: 'Pet Hair Special', price: 40, rarity: 0.16, difficulty: 2, minutes: 25, shine: 3, extras: 'Deep vacuum',
    desc: 'Three dogs, one hatchback, zero hair left behind.' },
  { id: 'vip-concours', name: 'VIP Concours Prep', price: 300, rarity: 0.03, difficulty: 5, minutes: 120, shine: 5, extras: 'Show finish',
    desc: 'Two hours of perfection for cars that win trophies.' },
];

export const CARWASH_UPGRADES = [
  { id: 'pressure-washer', name: 'Pressure Washer', cost: 150, effect: 'wash-plus', desc: 'Blasts winter grime off in seconds flat.' },
  { id: 'foam-cannon', name: 'Foam Cannon', cost: 200, effect: 'foam-plus', desc: 'Thicker foam, happier kids, cleaner cars.' },
  { id: 'vacuum-row', name: 'Vacuum Row', cost: 250, effect: 'vacuum-plus', desc: 'Four vacuums, no queue, no crumbs left behind.' },
  { id: 'wax-station', name: 'Wax Station', cost: 400, effect: 'wax-plus', desc: 'Warm wax, perfect shine, every single time.' },
  { id: 'water-recycler', name: 'Water Recycler', cost: 600, effect: 'eco-plus', desc: 'Clean conscience and a smaller water bill.' },
  { id: 'drying-tunnel', name: 'Drying Tunnel', cost: 900, effect: 'dry-plus', desc: 'Warm air tunnels. No drips, no streaks, no towels.' },
  { id: 'ceramic-booth', name: 'Ceramic Booth', cost: 1400, effect: 'coat-plus', desc: 'A dust-free room for perfect ceramic coats.' },
  { id: 'mega-bay', name: 'Mega Bay', cost: 2000, effect: 'capacity-plus', desc: 'Two extra bays. The queue finally moves.' },
];

export const CARWASH_RANKS = [
  { level: 0, name: 'Bucket Boy', xp: 0, perk: 'Washes pay base rate.' },
  { level: 1, name: 'Wash Regular', xp: 150, perk: '+5% prices, drivers wave as they pass.' },
  { level: 2, name: 'Detail Pro', xp: 400, perk: '+10% prices, the taxi fleets call you.' },
  { level: 3, name: 'Shine Master', xp: 800, perk: '+15% prices, show cars queue at dawn.' },
  { level: 4, name: 'Concours Legend', xp: 1500, perk: '+20% prices, your shine is famous.' },
];

export const CARWASH_STAFF = [
  { id: 'washer-wes', name: 'Wes the Washer', wage: 25, skill: 'wash', bonus: 0.15, desc: 'Two sponges, one bucket, zero missed spots.' },
  { id: 'dryer-dot', name: 'Dot the Dryer', wage: 25, skill: 'dry', bonus: 0.15, desc: 'Chamois in hand, streaks fear her.' },
  { id: 'detailer-dan', name: 'Dan the Detailer', wage: 40, skill: 'detail', bonus: 0.2, desc: 'Finds dirt the owner did not know existed.' },
  { id: 'cashier-cam', name: 'Cam the Cashier', wage: 30, skill: 'sales', bonus: 0.15, desc: 'Sells the wax upgrade with a smile and a story.' },
];

export const CARWASH_DAILY_EVENTS = [
  { id: 'dusty-convoy', name: 'Dusty Convoy', effect: 'visitors', amount: 50,
    text: 'A convoy of dusty trucks rolls in from the desert road.' },
  { id: 'taxi-fleet', name: 'Taxi Fleet Day', effect: 'earn', amount: 350,
    text: 'The whole taxi fleet books the bays for the morning.' },
  { id: 'muddy-rally', name: 'Muddy Rally', effect: 'visitors', amount: 60,
    text: 'Rally cars arrive caked in mud and glory.' },
  { id: 'broken-pump', name: 'Broken Pump', effect: 'cost', amount: 130,
    text: 'A pump dies mid-queue. A repair van is called.' },
  { id: 'sunny-rush', name: 'Sunny Rush', effect: 'visitors', amount: 90,
    text: 'Blue skies and a queue around the block by nine.' },
  { id: 'bird-plague', name: 'Bird Dropping Plague', effect: 'visitors', amount: 40,
    text: 'The gulls declare war on every parked car in Solara.' },
  { id: 'car-show-prep', name: 'Car Show Prep', effect: 'earn', amount: 400,
    text: 'Show cars arrive for their pre-show shine.' },
  { id: 'rainy-slump', name: 'Rainy Slump', effect: 'cost', amount: 40,
    text: 'Rain washes the cars for free. Nobody visits.' },
  { id: 'vip-limo', name: 'VIP Limo', effect: 'earn', amount: 280,
    text: 'A long black limo books the full detail, twice.' },
  { id: 'soap-shortage', name: 'Soap Shortage', effect: 'cost', amount: 70,
    text: 'The soap delivery is late. The supplier apologises.' },
];

export const CARWASH_TIPS = [
  { id: 'sunny-gold', name: 'Sunny Gold', text: 'Sunny days are paydays. Open your best package when the sky clears.' },
  { id: 'rain-rest', name: 'Rain Rest', text: 'Rain is a day off with pay. Use it to upgrade and repair.' },
  { id: 'wax-upsell', name: 'Wax Upsell', text: 'Every standard wash is a wax shine waiting to be offered.' },
  { id: 'fleet-deals', name: 'Fleet Deals', text: 'Taxi fleets pay weekly and never haggle. Court them.' },
  { id: 'vacuum-queue', name: 'Vacuum Queue', text: 'A short vacuum queue keeps drivers from leaving mid-wash.' },
  { id: 'ceramic-margin', name: 'Ceramic Margin', text: 'One ceramic coat earns like twenty quick rinses.' },
  { id: 'show-season', name: 'Show Season', text: 'Car show weekends are the biggest paydays of the year.' },
  { id: 'shine-sells', name: 'Shine Sells', text: 'A gleaming car in the street is your best advertisement.' },
];

export const CARWASH_CHALLENGES = [
  { id: 'first-steps', name: 'First Steps', target: 'runsDone', goal: 3, xp: 40, desc: 'Finish 3 car wash runs.' },
  { id: 'regular', name: 'Regular', target: 'runsDone', goal: 10, xp: 90, desc: 'Finish 10 car wash runs.' },
  { id: 'collector', name: 'Collector', target: 'itemsOwned', goal: 4, xp: 100, desc: 'Own 4 different car wash entries.' },
  { id: 'big-earner', name: 'Big Earner', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from the car wash business.' },
  { id: 'crowd-favourite', name: 'Crowd Favourite', target: 'visitors', goal: 200, xp: 110, desc: 'Draw 200 visitors through the car wash business.' },
  { id: 'respected', name: 'Respected Name', target: 'reputation', goal: 10, xp: 100, desc: 'Reach 10 reputation in the car wash business.' },
  { id: 'best-day', name: 'Best Day Ever', target: 'bestRun', goal: 400, xp: 130, desc: 'Score a single run worth $400 or more.' },
  { id: 'fully-kitted', name: 'Fully Kitted', target: 'upgradesOwned', goal: 6, xp: 150, desc: 'Own 6 upgrades for the car wash business.' },
];

export const CARWASH_ACHIEVEMENTS = [
  { id: 'first-run', name: 'First Run', target: 'runsDone', goal: 1, desc: 'Finish your first car wash run.' },
  { id: 'first-sale', name: 'First Payday', target: 'earned', goal: 1, desc: 'Collect your first dollar of car wash earnings.' },
  { id: 'ten-runs', name: 'Ten Runs Deep', target: 'runsDone', goal: 10, desc: 'Finish 10 car wash runs.' },
  { id: 'thousand-club', name: 'Thousand Club', target: 'earned', goal: 1000, desc: 'Earn $1,000 in total from the car wash business.' },
  { id: 'five-hundred-faces', name: 'Five Hundred Faces', target: 'visitors', goal: 500, desc: 'Welcome 500 visitors through the car wash business.' },
  { id: 'rank-three', name: 'Rising Star', target: 'rank', goal: 3, desc: 'Reach rank 3 in the car wash business.' },
  { id: 'full-shelf', name: 'Full Shelf', target: 'itemsOwned', goal: 8, desc: 'Own 8 different car wash entries at once.' },
  { id: 'streak-five', name: 'On A Roll', target: 'bestStreak', goal: 5, desc: 'Build a 5-run streak without a failed car wash run.' },
];

export const CARWASH_LEADERBOARD = [
  { name: 'Splash and Dash', score: 4200, desc: 'Fast, cheap, and always busy.' },
  { name: 'The Gleam Team', score: 3100, desc: 'Matching shirts, matching shine.' },
  { name: 'Turbo Wash', score: 2400, desc: 'In and out in four minutes flat.' },
  { name: 'Bubble Bay', score: 1500, desc: 'Foam parties every single Saturday.' },
  { name: 'You', score: 0, desc: 'Climbing the car wash ladder.' },
];

export const CARWASH_RECORDS = [
  { id: 'biggest-run', name: 'Biggest Run', stat: 'bestRun', unit: '$', desc: 'Best single-run payout.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money earned overall.' },
  { id: 'most-visitors', name: 'Most Visitors', stat: 'visitors', unit: 'people', desc: 'Most visitors welcomed.' },
  { id: 'most-runs', name: 'Most Runs', stat: 'runsDone', unit: 'runs', desc: 'Most runs finished.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'runs', desc: 'Longest run streak.' },
];

export const CARWASH_MARKET_EVENTS = [
  { id: 'quick-rinse-surge', name: 'Quick Rinse Surge', item: 'quick-rinse', mult: 1.35, desc: 'Demand for Quick Rinse swings hard this week.' },
  { id: 'standard-wash-surge', name: 'Standard Wash Surge', item: 'standard-wash', mult: 0.7, desc: 'Demand for Standard Wash swings hard this week.' },
  { id: 'foam-party-surge', name: 'Foam Party Wash Surge', item: 'foam-party', mult: 1.35, desc: 'Demand for Foam Party Wash swings hard this week.' },
  { id: 'wax-shine-surge', name: 'Wax Shine Surge', item: 'wax-shine', mult: 0.7, desc: 'Demand for Wax Shine swings hard this week.' },
  { id: 'interior-detail-surge', name: 'Interior Detail Surge', item: 'interior-detail', mult: 1.35, desc: 'Demand for Interior Detail swings hard this week.' },
  { id: 'full-detail-surge', name: 'Full Detail Surge', item: 'full-detail', mult: 0.7, desc: 'Demand for Full Detail swings hard this week.' },
  { id: 'ceramic-coat-surge', name: 'Ceramic Coating Surge', item: 'ceramic-coat', mult: 1.35, desc: 'Demand for Ceramic Coating swings hard this week.' },
  { id: 'engine-bay-surge', name: 'Engine Bay Clean Surge', item: 'engine-bay', mult: 0.7, desc: 'Demand for Engine Bay Clean swings hard this week.' },
  { id: 'pet-hair-special-surge', name: 'Pet Hair Special Surge', item: 'pet-hair-special', mult: 1.35, desc: 'Demand for Pet Hair Special swings hard this week.' },
  { id: 'vip-concours-surge', name: 'VIP Concours Prep Surge', item: 'vip-concours', mult: 0.7, desc: 'Demand for VIP Concours Prep swings hard this week.' },
];

export const CARWASH_SEASONS = [
  { id: 'spring-pollen', name: 'Spring Pollen', mult: 1.05, desc: 'Yellow dust on every bonnet in Solara.' },
  { id: 'summer-dust', name: 'Summer Dust', mult: 1.2, desc: 'Dry roads, dusty cars, endless queues.' },
  { id: 'autumn-leaves', name: 'Autumn Leaves', mult: 1.0, desc: 'Leaves in the gutters, mud on the wheels.' },
  { id: 'winter-salt', name: 'Winter Salt', mult: 1.1, desc: 'Road salt eats paint. Drivers wash twice as often.' },
];

export const CARWASH_FACTS = [
  { id: 'fact-quick-rinse', text: 'Quick Rinse: Five minutes, a splash of water, and off you go.' },
  { id: 'fact-standard-wash', text: 'Standard Wash: Soap, scrub, rinse, and a wave goodbye.' },
  { id: 'fact-foam-party', text: 'Foam Party Wash: A mountain of foam swallows the car whole. Kids love it.' },
  { id: 'fact-wax-shine', text: 'Wax Shine: Hand wax, slow circles, and a mirror finish.' },
  { id: 'fact-interior-detail', text: 'Interior Detail: Crumbs, dust and mystery smells, all evicted.' },
  { id: 'fact-full-detail', text: 'Full Detail: The works: inside, outside, and every forgotten corner.' },
  { id: 'fact-ceramic-coat', text: 'Ceramic Coating: A glass-hard shield that laughs at bird droppings.' },
  { id: 'fact-engine-bay', text: 'Engine Bay Clean: Grease gone, engine gleaming like it just left the factory.' },
  { id: 'fact-pet-hair-special', text: 'Pet Hair Special: Three dogs, one hatchback, zero hair left behind.' },
  { id: 'fact-vip-concours', text: 'VIP Concours Prep: Two hours of perfection for cars that win trophies.' },
  { id: 'fact-general-0', text: 'The best car wash operators in Solara check their prices every morning before opening.' },
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

export const CARWASH_NPC_LINES = [
  { id: 'npc-0', text: 'I came all the way across town for the Quick Rinse. Worth it.' },
  { id: 'npc-1', text: 'My cousin runs a car wash place too, but yours is better. Do not tell him.' },
  { id: 'npc-2', text: 'Is the Foam Party Wash really as good as everyone says? I am about to find out.' },
  { id: 'npc-3', text: 'I bring my kids here every weekend. They ask for the Standard Wash by name.' },
  { id: 'npc-4', text: 'You should put the Wax Shine on a poster. People would come just for that.' },
  { id: 'npc-5', text: 'I heard the Interior Detail here is the best in Solara. The rumour was right.' },
  { id: 'npc-6', text: 'Quiet day today. The Full Detail still made my afternoon.' },
  { id: 'npc-7', text: 'I saved up for weeks to try the Ceramic Coating. No regrets.' },
  { id: 'npc-8', text: 'The staff told me about the Engine Bay Clean. Now I tell everyone I meet.' },
  { id: 'npc-9', text: 'I have been to every car wash spot in the city. This one wins.' },
  { id: 'npc-10', text: 'One day I want to run a car wash place of my own. I am taking notes.' },
  { id: 'npc-11', text: 'The Pet Hair Special is the reason my friends finally believe my stories.' },
  { id: 'npc-12', text: 'Do you ever get tired of the VIP Concours Prep? I never would.' },
  { id: 'npc-13', text: 'I wrote a review about the Quick Rinse last night. Five stars, obviously.' },
  { id: 'npc-14', text: 'My grandmother loved the Standard Wash. I come here to remember her.' },
  { id: 'npc-15', text: 'If the Foam Party Wash gets any better, the whole city will queue around the block.' },
];

export const CARWASH_GUIDE = [
  { id: 'guide-0', text: 'Open your first car wash entry: it costs cash, but it unlocks everything else.' },
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

export function carwashRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < CARWASH_RANKS.length; i++) {
    if (xp >= CARWASH_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function carwashItemById(id) {
  return WASH_PACKAGES.find((x) => x.id === id) || null;
}

export function carwashPriceFor(id, drift, rank, upgrades) {
  const item = WASH_PACKAGES.find((x) => x.id === id);
  if (!item) return 0;
  let price = item.price;
  price *= 1 + (drift[id] || 0);
  price *= 1 + rank * 0.05;
  if (upgrades && upgrades.length >= 3) price *= 1.1;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function carwashCapacityFor(rank, upgrades) {
  let cap = 3 + rank;
  if (upgrades && upgrades.indexOf('mega-bay') >= 0) cap += 2;
  return cap;
}

export function carwashPayoutFor(item, rank, upgrades, weather, boosted) {
  let mult = 0.6 + rank * 0.1 + (boosted ? 0.3 : 0);
  if (weather === 'rain') mult *= 0.6;
  if (weather === 'sunny') mult *= 1.2;
  if (weather === 'storm') mult *= 0.7;
  if (upgrades && upgrades.length >= 4) mult *= 1.15;
  return Math.max(5, Math.round(item.price * mult));
}

export function carwashCrowdFor(item, rank, weather) {
  let crowd = 10 + item.difficulty * 8 + rank * 5;
  if (weather === 'rain') crowd = Math.round(crowd * 0.6);
  if (weather === 'sunny') crowd = Math.round(crowd * 1.2);
  if (weather === 'storm') crowd = Math.round(crowd * 0.5);
  return Math.max(1, crowd);
}

export function carwashUpgradeById(id) {
  return CARWASH_UPGRADES.find((x) => x.id === id) || null;
}

export function carwashStaffById(id) {
  return CARWASH_STAFF.find((x) => x.id === id) || null;
}

export function carwashEventById(id) {
  return CARWASH_DAILY_EVENTS.find((x) => x.id === id) || null;
}

export function carwashTipFor(day) {
  return CARWASH_TIPS[day % CARWASH_TIPS.length];
}

export function carwashFactFor(day) {
  return CARWASH_FACTS[day % CARWASH_FACTS.length];
}

export function carwashNpcLineFor(day) {
  return CARWASH_NPC_LINES[day % CARWASH_NPC_LINES.length];
}

export function carwashGuideStep(step) {
  return CARWASH_GUIDE[step] || null;
}

export function carwashSeasonMult(seasonId) {
  const s = CARWASH_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function carwashMarketEventMult(eventId, itemId) {
  const ev = CARWASH_MARKET_EVENTS.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.item === itemId ? ev.mult : 1;
}

export function carwashWeeklyGoal(state) {
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

export function carwashEfficiency(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 100;
  return Math.round((state.runsDone / total) * 100);
}

export function carwashProfitPerRun(state) {
  if (state.runsDone === 0) return 0;
  return Math.round((state.earned / state.runsDone) * 10) / 10;
}

export function carwashInventoryValue(state) {
  let total = 0;
  for (const id of Object.keys(state.owned || {})) {
    const item = WASH_PACKAGES.find((x) => x.id === id);
    if (item) total += item.price * (state.levels[id] || 1);
  }
  return Math.round(total * 10) / 10;
}

export function carwashSummary(state) {
  const rankName = CARWASH_RANKS[state.rank] ? CARWASH_RANKS[state.rank].name : 'Unknown';
  return 'Car Wash ' + rankName + ': ' + state.runsDone + ' runs, '
    + state.itemsOwned + ' entries, $' + Math.round(state.earned)
    + ' earned, ' + state.visitors + ' visitors.';
}

export function carwashNextGoal(state) {
  if (state.itemsOwned < 1) return 'Open your first entry.';
  if (state.runsDone < 5) return 'Finish 5 runs.';
  if (state.earned < 500) return 'Earn $500 in total.';
  if (state.rank < 2) return 'Reach rank ' + CARWASH_RANKS[2].name + '.';
  if (state.upgradesOwned < 4) return 'Own 4 upgrades.';
  return 'Become a Car Wash legend.';
}

export function carwashRecordFor(recordId, state) {
  const r = CARWASH_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function carwashAllRecords(state) {
  return CARWASH_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function carwashLeaderboardWith(playerScore) {
  const board = CARWASH_LEADERBOARD.map((e) => ({
    name: e.name, score: e.name === 'You' ? playerScore : e.score, desc: e.desc,
  }));
  board.sort((a, b) => b.score - a.score);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, score: e.score, desc: e.desc }));
}

export function carwashSeasonReport(state, seasonId) {
  const mult = carwashSeasonMult(seasonId);
  return WASH_PACKAGES.map((item) => ({
    id: item.id,
    name: item.name,
    basePrice: item.price,
    seasonPrice: Math.round(item.price * mult * 10) / 10,
    owned: !!state.owned[item.id],
    level: state.levels[item.id] || 0,
  }));
}

export function carwashChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return {
    id: challenge.id, name: challenge.name, have: Math.floor(v),
    goal: challenge.goal, done: v >= challenge.goal, xp: challenge.xp,
  };
}

export function carwashBestEntryFor(rank) {
  let best = null;
  let bestScore = -1;
  for (const item of WASH_PACKAGES) {
    if (item.difficulty > rank + 2) continue;
    const score = item.price * (1 + item.rarity * 2) / item.difficulty;
    if (score > bestScore) { bestScore = score; best = item; }
  }
  return best;
}

export function createCarWashSystem(ctx) {
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
  for (const item of WASH_PACKAGES) {
    state.drift[item.id] = 0;
    state.prices[item.id] = item.price;
  }

  function refreshRank() {
    const r = carwashRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log('Car Wash rank up: ' + CARWASH_RANKS[r].name + ' - ' + CARWASH_RANKS[r].perk);
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
      const s = CARWASH_STAFF.find((x) => x.id === id);
      if (s && s.skill === skill) bonus += s.bonus;
    }
    return bonus;
  }

  function driftPrices() {
    for (const item of WASH_PACKAGES) {
      const roll = rng();
      if (roll < 0.35) {
        const change = Math.round((rng() * 0.24 - 0.12) * 100) / 100;
        state.drift[item.id] = Math.round((state.drift[item.id] + change) * 100) / 100;
        state.prices[item.id] = Math.max(1, Math.round(item.price * (1 + state.drift[item.id]) * 10) / 10);
      }
    }
  }

  function offerPackage(id) {
    const item = WASH_PACKAGES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-package' };
    if (state.owned[id]) return { ok: false, reason: 'already-owned' };
    if (state.itemsOwned >= carwashCapacityFor(state.rank, state.upgrades)) {
      return { ok: false, reason: 'capacity-full', cap: carwashCapacityFor(state.rank, state.upgrades) };
    }
    if (state.rank < Math.max(0, item.difficulty - 2)) {
      return { ok: false, reason: 'rank-too-low', need: Math.max(0, item.difficulty - 2) };
    }
    const cost = carwashPriceFor(id, state.drift, 0, []);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned[id] = 1;
    state.levels[id] = 1;
    state.itemsOwned += 1;
    gainXp(10);
    log('Offered ' + item.name + ' for $' + cost + '. Welcome to the Car Wash business.');
    return { ok: true, id, cost, name: item.name };
  }

  function washCar(id) {
    const item = WASH_PACKAGES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-package' };
    if (state.active) return { ok: false, reason: 'already-running', active: state.activeId };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned' };
    state.active = 'run';
    state.activeId = id;
    state.activeTimer = 30 + item.difficulty * 10;
    state.activeBase = item.price;
    log('Wash started: ' + item.name + ' is under way.');
    return { ok: true, id, seconds: state.activeTimer };
  }

  function settleRun() {
    const id = state.activeId;
    const item = WASH_PACKAGES.find((x) => x.id === id);
    state.active = null;
    state.activeId = null;
    state.activeTimer = 0;
    if (!item) return;
    const cond = weatherCond();
    const boosted = !!state.boosted[id];
    const payout = carwashPayoutFor(item, state.rank, state.upgrades, cond, boosted);
    const crowd = carwashCrowdFor(item, state.rank, cond);
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
    log('Car gleaming after ' + item.name + ': ' + crowd + ' visitors, $' + payout + ' in the till.');
  }

  function collectWashRevenue() {
    if (state.pending <= 0) return { ok: false, reason: 'nothing-pending' };
    const amount = state.pending;
    state.pending = 0;
    state.earned += amount;
    addCash(amount);
    log('Collected $' + amount + ' from the till.');
    return { ok: true, amount };
  }

  function sellMembership(id, qty) {
    const item = WASH_PACKAGES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-package' };
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

  function detailCar(id) {
    const item = WASH_PACKAGES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-package' };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned' };
    if (getCash() < 40) return { ok: false, reason: 'not-enough-cash', cost: 40 };
    addCash(-40);
    state.spent += 40;
    state.boosted[id] = true;
    state.reputation += 1;
    gainXp(10);
    log('Detailing crew on ' + item.name + ' is boosted for its next run.');
    return { ok: true, id, boosted: true };
  }

  function buyUpgrade(id) {
    const u = CARWASH_UPGRADES.find((x) => x.id === id);
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
    const s = CARWASH_STAFF.find((x) => x.id === id);
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
    const item = WASH_PACKAGES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-package' };
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
    return WASH_PACKAGES.map((item) => ({
      id: item.id,
      name: item.name,
      price: carwashPriceFor(item.id, state.drift, state.rank, state.upgrades),
      basePrice: item.price,
      drift: state.drift[item.id],
      owned: !!state.owned[item.id],
      level: state.levels[item.id] || 0,
      difficulty: item.difficulty,
      rarity: item.rarity,
    }));
  }

  function listItems() {
    return WASH_PACKAGES.map((item) => ({
      id: item.id, name: item.name, price: item.price,
      difficulty: item.difficulty, rarity: item.rarity, desc: item.desc,
      owned: !!state.owned[item.id],
    }));
  }

  function info(id) {
    const item = WASH_PACKAGES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-package' };
    return {
      ok: true, item,
      owned: !!state.owned[id],
      level: state.levels[id] || 0,
      price: carwashPriceFor(id, state.drift, state.rank, state.upgrades),
      holdings: state.holdings[id] || 0,
    };
  }

  function dailyEvent() {
    const idx = Math.floor(rng() * CARWASH_DAILY_EVENTS.length);
    const ev = CARWASH_DAILY_EVENTS[idx];
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
    for (const item of WASH_PACKAGES) {
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
      name: 'Car Wash',
      mechanic: MECH,
      rank: CARWASH_RANKS[state.rank] ? CARWASH_RANKS[state.rank].name : 'Unknown',
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
      capacity: carwashCapacityFor(state.rank, state.upgrades),
      hour: getHour(),
      day: getDay(),
    };
  }

  function hudLine() {
    if (state.active) {
      return 'Car Wash: running ' + state.activeId + ' - ' + Math.max(0, Math.ceil(state.activeTimer)) + 's left';
    }
    if (state.pending > 0) {
      return 'Car Wash: $' + Math.round(state.pending) + ' waiting in the till';
    }
    if (state.itemsOwned > 0) {
      return 'Car Wash: ' + state.itemsOwned + ' entries, $' + Math.round(state.earned) + ' earned';
    }
    return '';
  }

  function interact(action, a, b) {
    if (!action || action === 'status') return { ok: true, stats: stats(), hint: 'open <package> to offer it, run <package> to wash a car, collect to empty the till' };
    if (action === 'open') return offerPackage(a);
    if (action === 'run') return washCar(a);
    if (action === 'collect') return collectWashRevenue();
    if (action === 'sell') return sellMembership(a, b);
    if (action === 'upgrade') return buyUpgrade(a);
    if (action === 'levelup') return upgradeItem(a);
    if (action === 'hire') return hireStaff(a);
    if (action === 'fire') return fireStaff(a);
    if (action === 'special') return detailCar(a, b);
    if (action === 'info') return info(a);
    if (action === 'prices') return { ok: true, prices: priceBoard() };
    if (action === 'list') return { ok: true, items: listItems() };
    if (action === 'event') return dailyEvent();
    return { ok: false, reason: 'unknown-action', action };
  }

  return {
    name: 'Car Wash',
    state,
    gainXp,
    offerPackage,
    washCar,
    collectWashRevenue,
    sellMembership,
    detailCar,
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
    open: offerPackage,
    run: washCar,
    collect: collectWashRevenue,
    sell: sellMembership,
    upgrade: buyUpgrade,
    hire: hireStaff,
  };
}

export function createCarWashExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function challenges() {
    return CARWASH_CHALLENGES.map((ch) => carwashChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = CARWASH_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.indexOf(id) >= 0) return { ok: false, reason: 'already-claimed' };
    const p = carwashChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    system.state.challengesClaimed.push(id);
    if (typeof system.gainXp === 'function') system.gainXp(ch.xp);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return CARWASH_ACHIEVEMENTS.map((a) => ({
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
    const h = CARWASH_STAFF.find((x) => x.id === id);
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
      const h = CARWASH_STAFF.find((x) => x.id === id);
      if (h) due += h.wage;
    }
    helperWagesPaid += due;
    system.state.wagesPaid += due;
    return { due, helpers: helpers.slice(), totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    let bonus = 0;
    for (const id of helpers) {
      const h = CARWASH_STAFF.find((x) => x.id === id);
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
    const item = WASH_PACKAGES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-package' };
    system.state.boosted[id] = true;
    return { ok: true, id, boosted: true };
  }

  function inventoryValue() {
    return carwashInventoryValue(system.state);
  }

  function weeklyReport() {
    return {
      goal: carwashWeeklyGoal(system.state),
      summary: carwashSummary(system.state),
      nextGoal: carwashNextGoal(system.state),
      efficiency: carwashEfficiency(system.state),
      profitPerRun: carwashProfitPerRun(system.state),
      records: carwashAllRecords(system.state),
    };
  }

  function staffRoster() {
    return CARWASH_STAFF.map((s) => ({
      id: s.id, name: s.name, wage: s.wage, skill: s.skill,
      hired: helpers.indexOf(s.id) >= 0 || system.state.staff.indexOf(s.id) >= 0,
    }));
  }

  function upgradeCatalog() {
    return CARWASH_UPGRADES.map((u) => ({
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

export function createCarWashMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  function setEvent(eventId) {
    const ev = CARWASH_MARKET_EVENTS.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = CARWASH_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(itemId, basePrice) {
    let price = basePrice;
    price *= carwashMarketEventMult(currentEvent, itemId);
    price *= carwashSeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(itemId, qty) {
    const item = WASH_PACKAGES.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-package' };
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
    for (const item of WASH_PACKAGES) {
      const mult = carwashMarketEventMult(currentEvent, item.id);
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
    return WASH_PACKAGES.map((item) => ({
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

export function carwashEventFor(day) {
  return CARWASH_MARKET_EVENTS[day % CARWASH_MARKET_EVENTS.length];
}

export function carwashDailyEventFor(day) {
  return CARWASH_DAILY_EVENTS[day % CARWASH_DAILY_EVENTS.length];
}

export function carwashRankNameFor(rank) {
  const r = CARWASH_RANKS[rank];
  return r ? r.name : 'Unknown';
}

export function carwashTotalValue(state) {
  const inv = carwashInventoryValue(state);
  return Math.round((inv + state.pending + state.earned) * 10) / 10;
}

export function carwashProgressPercent(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 0;
  return Math.round((state.runsDone / total) * 100);
}

export function carwashStaffBonusFor(staffIds, skill) {
  let bonus = 0;
  for (const id of staffIds) {
    const s = CARWASH_STAFF.find((x) => x.id === id);
    if (s && s.skill === skill) bonus += s.bonus;
  }
  return bonus;
}

export function carwashCheapestEntry() {
  let best = WASH_PACKAGES[0];
  for (const item of WASH_PACKAGES) {
    if (item.price < best.price) best = item;
  }
  return best;
}

export function carwashPriciestEntry() {
  let best = WASH_PACKAGES[0];
  for (const item of WASH_PACKAGES) {
    if (item.price > best.price) best = item;
  }
  return best;
}

export function carwashEntriesByDifficulty(difficulty) {
  return WASH_PACKAGES.filter((x) => x.difficulty === difficulty).map((x) => x.id);
}

export function carwashEntriesByRarity(maxRarity) {
  return WASH_PACKAGES.filter((x) => x.rarity <= maxRarity).map((x) => x.id);
}

export function carwashGradeFor(runsDone, earned, visitors) {
  const score = runsDone * 10 + Math.round(earned / 10) + Math.floor(visitors / 10);
  if (score >= 500) return 'S';
  if (score >= 300) return 'A';
  if (score >= 150) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}

export const CARWASH_META = {
  system: 'carwash',
  version: '7-B4',
  author: 'builder-4',
  mechanic: 'venue',
  dataCount: WASH_PACKAGES.length,
  dataName: 'WASH_PACKAGES',
};
