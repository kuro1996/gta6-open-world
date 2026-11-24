export const WASH_PACKAGES = [
  { id: 'quick-rinse', name: 'Quick Rinse', price: 50, rarity: 0.2, difficulty: 1, minutes: 10, shine: 3, extras: 'Water only', desc: 'A fast spray-down for dusty daily drivers.' },
  { id: 'basic-wash', name: 'Basic Wash', price: 90, rarity: 0.3, difficulty: 1, minutes: 20, shine: 5, extras: 'Soap + rinse', desc: 'Soap, scrub and rinse, the everyday classic.' },
  { id: 'foam-party', name: 'Foam Party', price: 130, rarity: 0.4, difficulty: 2, minutes: 25, shine: 6, extras: 'Foam cannon', desc: 'A thick blanket of foam before the rinse.' },
  { id: 'wax-shine', name: 'Wax Shine', price: 180, rarity: 0.5, difficulty: 2, minutes: 35, shine: 8, extras: 'Wax coat', desc: 'A hand wax that makes the paint glow.' },
  { id: 'interior-detail', name: 'Interior Detail', price: 220, rarity: 0.55, difficulty: 3, minutes: 45, shine: 7, extras: 'Vacuum + wipe', desc: 'Every vent, seam and cup holder, spotless.' },
  { id: 'full-detail', name: 'Full Detail', price: 300, rarity: 0.7, difficulty: 3, minutes: 60, shine: 10, extras: 'Everything inside + out', desc: 'The whole car, inside and out, like new.' },
  { id: 'ceramic-coat', name: 'Ceramic Coat', price: 380, rarity: 0.8, difficulty: 4, minutes: 90, shine: 10, extras: 'Ceramic seal', desc: 'A glass-hard seal that shrugs off rain.' },
  { id: 'engine-bay', name: 'Engine Bay', price: 160, rarity: 0.45, difficulty: 2, minutes: 30, shine: 6, extras: 'Degrease + dress', desc: 'Degrease and dress the heart of the car.' },
  { id: 'pet-hair-special', name: 'Pet Hair Special', price: 140, rarity: 0.35, difficulty: 2, minutes: 40, shine: 6, extras: 'Pet hair removal', desc: 'Every last hair, gone for good.' },
  { id: 'showroom-shine', name: 'Showroom Shine', price: 500, rarity: 0.95, difficulty: 5, minutes: 120, shine: 10, extras: 'Concours finish', desc: 'A concours finish fit for a showroom floor.' },
];

export const CARWASH_UPGRADES = [
  { id: 'foam-cannon', name: 'Foam Cannon', cost: 120, effect: 'crowd +10%', desc: 'Snow-thick foam on every car.' },
  { id: 'mega-bay', name: 'Mega Bay', cost: 320, effect: 'capacity +2', desc: 'A second bay for two more packages.' },
  { id: 'hot-wax', name: 'Hot Wax', cost: 180, effect: 'payout +12%', desc: 'Warm wax that bonds like glass.' },
  { id: 'water-recycle', name: 'Water Recycle', cost: 200, effect: 'earned +5%', desc: 'Clean water, reused and reused.' },
  { id: 'air-dryer', name: 'Air Dryer', cost: 150, effect: 'crowd +12%', desc: 'Spot-free drying in seconds.' },
  { id: 'polish-machine', name: 'Polish Machine', cost: 240, effect: 'payout +10%', desc: 'A buffer that erases swirls.' },
  { id: 'vacuum-wall', name: 'Vacuum Wall', cost: 140, effect: 'visitors +10%', desc: 'Free vacuums for every customer.' },
  { id: 'neon-sign', name: 'Neon Sign', cost: 110, effect: 'crowd +8%', desc: 'A glowing sign drivers can see for miles.' },
];

export const CARWASH_RANKS = [
  { level: 0, name: 'Bucket Boy', xp: 0, perk: 'Still learning the sponge.' },
  { level: 1, name: 'Wash Regular', xp: 150, perk: 'The locals know your name.' },
  { level: 2, name: 'Detail Pro', xp: 400, perk: 'Every car leaves gleaming.' },
  { level: 3, name: 'Shine Master', xp: 800, perk: 'Paint so glossy it mirrors the sky.' },
  { level: 4, name: 'Concours Legend', xp: 1500, perk: 'Show cars queue for your hands.' },
];

export const CARWASH_STAFF = [
  { id: 'washer-dex', name: 'Dex the Washer', wage: 40, skill: 'wash', bonus: 2, desc: 'Fast hands, zero streaks.' },
  { id: 'dryer-ivy', name: 'Ivy the Dryer', wage: 35, skill: 'dry', bonus: 2, desc: 'A chamois wizard, spot-free every time.' },
  { id: 'detailer-ray', name: 'Ray the Detailer', wage: 60, skill: 'detail', bonus: 3, desc: 'Finds dirt nobody else can see.' },
  { id: 'cashier-may', name: 'May the Cashier', wage: 45, skill: 'cashier', bonus: 2, desc: 'Sells memberships with a smile.' },
];

export const CARWASH_DAILY_EVENTS = [
  { id: 'mud-season', name: 'Mud Season', effect: 'visitors', amount: 32, text: 'Rain turns every road to mud; the queue wraps around.' },
  { id: 'fleet-deal', name: 'Fleet Deal', effect: 'earn', amount: 110, text: 'A taxi company signs a weekly wash deal.' },
  { id: 'pump-breaks', name: 'Pump Breaks', effect: 'cost', amount: 45, text: 'The main pump dies; repairs are not cheap.' },
  { id: 'car-show', name: 'Car Show', effect: 'rep', amount: 3, text: 'Show cars roll in and praise your shine.' },
  { id: 'sunny-weekend', name: 'Sunny Weekend', effect: 'visitors', amount: 28, text: 'Blue skies bring every car in town.' },
  { id: 'soap-spill', name: 'Soap Spill', effect: 'heat', amount: 2, text: 'A drum of soap floods the bay; inspectors visit.' },
  { id: 'detail-course', name: 'Detail Course', effect: 'xp', amount: 25, text: 'A concours judge shares the secrets of shine.' },
  { id: 'hose-burst', name: 'Hose Burst', effect: 'cost', amount: 30, text: 'A burst hose soaks the whole bay.' },
  { id: 'wedding-convoy', name: 'Wedding Convoy', effect: 'earn', amount: 130, text: 'A wedding convoy needs ten gleaming cars.' },
  { id: 'dusty-day', name: 'Dusty Day', effect: 'rep', amount: 1, text: 'A slow dusty day, but the regulars stop by.' },
];

export const CARWASH_TIPS = [
  { id: 'tip-sun', name: 'Sunny Days', text: 'Sunshine is your best friend; rain halves the crowd.' },
  { id: 'tip-bay', name: 'Mega Bay', text: 'Buy the Mega Bay to offer two more packages.' },
  { id: 'tip-detail', name: 'Detail Cars', text: 'Detail a package before a big wash for extra payout.' },
  { id: 'tip-streak', name: 'Keep Washing', text: 'Back-to-back washes grow your streak fast.' },
  { id: 'tip-prices', name: 'Price Watch', text: 'Wash prices drift every day, so check the board.' },
  { id: 'tip-staff', name: 'Good Crew', text: 'A great detailer turns one wash into a membership.' },
  { id: 'tip-donate', name: 'Give Back', text: 'Free washes for the school bus build reputation.' },
  { id: 'tip-rank', name: 'Climb Up', text: 'Every wash pushes you toward Detail Pro.' },
];

export const CARWASH_CHALLENGES = [
  { id: 'ch-runs-5', name: 'Five Washes', target: 'runsDone', goal: 5, xp: 50, desc: 'Wash 5 cars.' },
  { id: 'ch-earn-500', name: 'First 500', target: 'earned', goal: 500, xp: 80, desc: 'Earn $500 in total.' },
  { id: 'ch-visitors-200', name: 'Busy Bay', target: 'visitors', goal: 200, xp: 60, desc: 'Welcome 200 visitors.' },
  { id: 'ch-items-4', name: 'Four Packages', target: 'itemsOwned', goal: 4, xp: 70, desc: 'Offer 4 packages.' },
  { id: 'ch-upgrades-3', name: 'Well Equipped', target: 'upgradesOwned', goal: 3, xp: 60, desc: 'Own 3 upgrades.' },
  { id: 'ch-rep-10', name: 'Respected', target: 'reputation', goal: 10, xp: 50, desc: 'Reach 10 reputation.' },
  { id: 'ch-streak-3', name: 'On a Roll', target: 'streak', goal: 3, xp: 90, desc: 'Reach a 3-wash streak.' },
  { id: 'ch-best-300', name: 'Big Shine', target: 'bestRun', goal: 300, xp: 100, desc: 'Earn $300 from a single wash.' },
];

export const CARWASH_ACHIEVEMENTS = [
  { id: 'ach-runs-10', name: 'Wash Master', target: 'runsDone', goal: 10, desc: 'Wash 10 cars.' },
  { id: 'ach-earn-1000', name: 'Golden Sponge', target: 'earned', goal: 1000, desc: 'Earn $1,000 in total.' },
  { id: 'ach-visitors-500', name: 'City Favourite', target: 'visitors', goal: 500, desc: 'Welcome 500 visitors.' },
  { id: 'ach-items-6', name: 'Full Menu', target: 'itemsOwned', goal: 6, desc: 'Offer 6 packages.' },
  { id: 'ach-upgrades-5', name: 'Fully Loaded', target: 'upgradesOwned', goal: 5, desc: 'Own 5 upgrades.' },
  { id: 'ach-rep-20', name: 'Beloved', target: 'reputation', goal: 20, desc: 'Reach 20 reputation.' },
  { id: 'ach-streak-5', name: 'Unstoppable', target: 'streak', goal: 5, desc: 'Reach a 5-wash streak.' },
  { id: 'ach-best-500', name: 'Record Shine', target: 'bestRun', goal: 500, desc: 'Earn $500 from a single wash.' },
];

export const CARWASH_LEADERBOARD = [
  { name: 'Sparkle Bros', score: 980, desc: 'Twin brothers, twin bays.' },
  { name: 'Aqua Shine', score: 760, desc: 'The old wash by the river.' },
  { name: 'Foam Kings', score: 540, desc: 'Foam so thick you can swim in it.' },
  { name: 'Bucket Buddies', score: 210, desc: 'Two kids and a dream.' },
  { name: 'You', score: 0, desc: 'The new name on the board.' },
];

export const CARWASH_RECORDS = [
  { id: 'rec-runs', name: 'Most Washes', stat: 'runsDone', unit: 'washes', desc: 'Total washes completed.' },
  { id: 'rec-earned', name: 'Top Earnings', stat: 'earned', unit: '$', desc: 'Total money earned.' },
  { id: 'rec-visitors', name: 'Biggest Crowd', stat: 'visitors', unit: 'drivers', desc: 'Total visitors welcomed.' },
  { id: 'rec-best', name: 'Best Wash', stat: 'bestRun', unit: '$', desc: 'Best single-wash payout.' },
  { id: 'rec-streak', name: 'Longest Streak', stat: 'bestStreak', unit: 'washes', desc: 'Longest run of washes.' },
];

export const CARWASH_MARKET_EVENTS = [
  { id: 'me-rinse', name: 'Rinse Rush', item: 'quick-rinse', mult: 1.35, desc: 'Everyone wants a quick spray.' },
  { id: 'me-basic', name: 'Basic Dip', item: 'basic-wash', mult: 0.7, desc: 'The classic cools off.' },
  { id: 'me-foam', name: 'Foam Fever', item: 'foam-party', mult: 1.35, desc: 'Foam parties are trending.' },
  { id: 'me-wax', name: 'Wax Lull', item: 'wax-shine', mult: 0.7, desc: 'Wax waits for dry weather.' },
  { id: 'me-interior', name: 'Interior Boom', item: 'interior-detail', mult: 1.35, desc: 'Spring cleaning hits the cars.' },
  { id: 'me-full', name: 'Full Dip', item: 'full-detail', mult: 0.7, desc: 'Big details slow down.' },
  { id: 'me-ceramic', name: 'Ceramic Craze', item: 'ceramic-coat', mult: 1.35, desc: 'Everyone wants the glass seal.' },
  { id: 'me-engine', name: 'Engine Cool', item: 'engine-bay', mult: 0.7, desc: 'Engine bays rest this week.' },
  { id: 'me-pet', name: 'Pet Season', item: 'pet-hair-special', mult: 1.35, desc: 'Shedding season fills the bay.' },
  { id: 'me-show', name: 'Showroom Pause', item: 'showroom-shine', mult: 0.7, desc: 'The show cars rest between shows.' },
];

export const CARWASH_SEASONS = [
  { id: 'summer', name: 'Summer', mult: 1.15, desc: 'Dust and bugs bring every car in.' },
  { id: 'autumn', name: 'Autumn', mult: 1.0, desc: 'Leaves and rain, steady work.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Salt and slush, fewer washes.' },
  { id: 'spring', name: 'Spring', mult: 1.05, desc: 'Spring cleaning for cars.' },
];

export const CARWASH_FACTS = [
  { id: 'fact-rinse', text: 'The Quick Rinse uses recycled rainwater.' },
  { id: 'fact-basic', text: 'The Basic Wash has not changed its recipe in 20 years.' },
  { id: 'fact-foam', text: 'The Foam Party cannon holds 50 litres of foam.' },
  { id: 'fact-wax', text: 'Wax Shine uses beeswax from a local farm.' },
  { id: 'fact-interior', text: 'Interior Detail once found a lost wedding ring.' },
  { id: 'fact-full', text: 'A Full Detail takes two people a full hour.' },
  { id: 'fact-ceramic', text: 'Ceramic Coat can last two years on paint.' },
  { id: 'fact-engine', text: 'Engine Bay cleaning started with race cars.' },
  { id: 'fact-pet', text: 'Pet Hair Special uses rubber brushes and static.' },
  { id: 'fact-show', text: 'Showroom Shine is judged under white light.' },
  { id: 'fact-1', text: 'The first car wash opened in Detroit in 1914.' },
  { id: 'fact-2', text: 'A sponge can hold 25 times its weight in water.' },
  { id: 'fact-3', text: 'Foam lifts dirt so the sponge never scratches.' },
  { id: 'fact-4', text: 'Ceramic coating was first used on space shuttles.' },
  { id: 'fact-5', text: 'Microfibre cloths were invented for lenses.' },
  { id: 'fact-6', text: 'A dirty car uses more fuel than a clean one.' },
  { id: 'fact-7', text: 'Chamois leather comes from a mountain goat.' },
  { id: 'fact-8', text: 'The shiniest cars are washed in the shade.' },
  { id: 'fact-9', text: 'Wax was first used on carriages, not cars.' },
  { id: 'fact-10', text: 'A good detailer can spot swirl marks in seconds.' },
];

export const CARWASH_NPC_LINES = [
  { id: 'npc-1', text: 'My car has never looked this good!' },
  { id: 'npc-2', text: 'The foam party is my kids favourite part.' },
  { id: 'npc-3', text: 'That wax shine is like a mirror.' },
  { id: 'npc-4', text: 'You got every hair out, amazing.' },
  { id: 'npc-5', text: 'I bring the taxi here every Friday.' },
  { id: 'npc-6', text: 'The ceramic coat survived a whole winter.' },
  { id: 'npc-7', text: 'Fastest wash in town, hands down.' },
  { id: 'npc-8', text: 'My engine bay looks brand new.' },
  { id: 'npc-9', text: 'I can see my face in the paint now.' },
  { id: 'npc-10', text: 'The staff here are so friendly.' },
  { id: 'npc-11', text: 'That showroom shine won me a trophy.' },
  { id: 'npc-12', text: 'I will never wash it myself again.' },
  { id: 'npc-13', text: 'The interior smells like new leather.' },
  { id: 'npc-14', text: 'Worth every cent, every single time.' },
  { id: 'npc-15', text: 'My dog approves of the pet special.' },
  { id: 'npc-16', text: 'See you next week, same time!' },
];

export const CARWASH_GUIDE = [
  { id: 'guide-1', text: 'Step 1: Offer a wash package from the list.' },
  { id: 'guide-2', text: 'Step 2: Pay the offering cost from your cash.' },
  { id: 'guide-3', text: 'Step 3: Wash a car to start the wash.' },
  { id: 'guide-4', text: 'Step 4: Wait for the wash timer to finish.' },
  { id: 'guide-5', text: 'Step 5: Collect the wash revenue from the till.' },
  { id: 'guide-6', text: 'Step 6: Detail a car to boost the next wash.' },
  { id: 'guide-7', text: 'Step 7: Spend earnings on wash upgrades.' },
  { id: 'guide-8', text: 'Step 8: Hire washers and detailers for the bay.' },
  { id: 'guide-9', text: 'Step 9: Level up packages to raise their value.' },
  { id: 'guide-10', text: 'Step 10: Watch market events for hot packages.' },
  { id: 'guide-11', text: 'Step 11: Claim challenges as you hit each goal.' },
  { id: 'guide-12', text: 'Step 12: Donate free washes for reputation.' },
  { id: 'guide-13', text: 'Step 13: Check the price board before selling.' },
  { id: 'guide-14', text: 'Step 14: Keep washing to grow your streak.' },
  { id: 'guide-15', text: 'Step 15: Trade in bulk when the market is hot.' },
  { id: 'guide-16', text: 'Step 16: Become a Concours Legend.' },
];

export const CARWASH_META = { system: 'carwash', version: '7-B4', author: 'builder-4', mechanic: 'venue', dataCount: 10, dataName: 'WASH_PACKAGES' };

function carwashCondName(weather) {
  if (typeof weather === 'string') return weather;
  if (weather && weather.condition) return weather.condition;
  return 'clear';
}

function carwashSky(table, weather) {
  const got = table[carwashCondName(weather)];
  if (got === undefined) return 1;
  return got;
}

function carwashOneDec(n) {
  return Math.round(n * 10) / 10;
}

export function carwashRankFor(xp) {
  let lvl = 0;
  let i = 0;
  while (i < CARWASH_RANKS.length) {
    if (xp >= CARWASH_RANKS[i].xp) lvl = CARWASH_RANKS[i].level;
    i += 1;
  }
  return lvl;
}

export function carwashItemById(id) {
  let i = 0;
  while (i < WASH_PACKAGES.length) {
    if (WASH_PACKAGES[i].id === id) return WASH_PACKAGES[i];
    i += 1;
  }
  return null;
}

export function carwashPriceFor(id, drift, rank, upgrades) {
  const item = carwashItemById(id);
  if (!item) return 0;
  let p = item.price * (1 + (drift || 0)) * (1 + (rank || 0) * 0.05);
  if (upgrades && upgrades.length >= 3) p = p * 1.1;
  const rounded = carwashOneDec(p);
  if (rounded < 1) return 1;
  return rounded;
}

export function carwashCapacityFor(rank, upgrades) {
  let cap = 3 + (rank || 0);
  if (!upgrades) return cap;
  let i = 0;
  while (i < upgrades.length) {
    if (upgrades[i] === 'mega-bay') cap = cap + 2;
    i += 1;
  }
  return cap;
}

export function carwashPayoutFor(item, rank, upgrades, weather, boosted) {
  if (!item) return 0;
  let mult = 0.6 + (rank || 0) * 0.1;
  if (boosted) mult = mult + 0.3;
  mult = mult * carwashSky({ rain: 0.6, sunny: 1.2, storm: 0.7 }, weather);
  if (upgrades && upgrades.length >= 4) mult = mult * 1.15;
  const payout = Math.round(item.price * mult);
  if (payout < 5) return 5;
  return payout;
}

export function carwashCrowdFor(item, rank, weather) {
  const diff = item ? item.difficulty : 0;
  const base = 10 + diff * 8 + (rank || 0) * 5;
  const crowd = Math.round(base * carwashSky({ rain: 0.6, sunny: 1.2, storm: 0.5 }, weather));
  if (crowd < 1) return 1;
  return crowd;
}

export function carwashUpgradeById(id) {
  let i = 0;
  while (i < CARWASH_UPGRADES.length) {
    if (CARWASH_UPGRADES[i].id === id) return CARWASH_UPGRADES[i];
    i += 1;
  }
  return null;
}

export function carwashStaffById(id) {
  let i = 0;
  while (i < CARWASH_STAFF.length) {
    if (CARWASH_STAFF[i].id === id) return CARWASH_STAFF[i];
    i += 1;
  }
  return null;
}

export function carwashEventById(id) {
  let i = 0;
  while (i < CARWASH_DAILY_EVENTS.length) {
    if (CARWASH_DAILY_EVENTS[i].id === id) return CARWASH_DAILY_EVENTS[i];
    i += 1;
  }
  let j = 0;
  while (j < CARWASH_MARKET_EVENTS.length) {
    if (CARWASH_MARKET_EVENTS[j].id === id) return CARWASH_MARKET_EVENTS[j];
    j += 1;
  }
  return null;
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
  if (step < 0) return null;
  if (step >= CARWASH_GUIDE.length) return null;
  return CARWASH_GUIDE[step];
}

export function carwashSeasonMult(seasonId) {
  let i = 0;
  while (i < CARWASH_SEASONS.length) {
    if (CARWASH_SEASONS[i].id === seasonId) return CARWASH_SEASONS[i].mult;
    i += 1;
  }
  return 1;
}

export function carwashMarketEventMult(eventId, itemId) {
  if (!eventId) return 1;
  let i = 0;
  while (i < CARWASH_MARKET_EVENTS.length) {
    const e = CARWASH_MARKET_EVENTS[i];
    if (e.id === eventId) {
      if (e.item === itemId) return e.mult;
      return 1;
    }
    i += 1;
  }
  return 1;
}

export function carwashWeeklyGoal(state) {
  const runs = { have: state.runsDone, goal: 5, done: state.runsDone >= 5 };
  const earned = { have: state.earned, goal: 500, done: state.earned >= 500 };
  const visitors = { have: state.visitors, goal: 100, done: state.visitors >= 100 };
  return { runs, earned, visitors, allDone: runs.done && earned.done && visitors.done };
}

export function carwashEfficiency(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 100;
  return Math.round((state.runsDone / total) * 100);
}

export function carwashProfitPerRun(state) {
  if (state.runsDone === 0) return 0;
  return carwashOneDec(state.earned / state.runsDone);
}

export function carwashInventoryValue(state) {
  let sum = 0;
  const keys = Object.keys(state.owned);
  let i = 0;
  while (i < keys.length) {
    const item = carwashItemById(keys[i]);
    if (item) sum = sum + item.price * (state.levels[keys[i]] || 1);
    i += 1;
  }
  return carwashOneDec(sum);
}

export function carwashSummary(state) {
  return 'Car Wash at rank ' + carwashRankNameFor(state.rank) + ': ' + state.runsDone + ' runs, ' + state.itemsOwned + ' entries, $' + state.earned + ' earned, ' + state.visitors + ' visitors.';
}

export function carwashNextGoal(state) {
  if (state.itemsOwned === 0) return 'Open your first entry.';
  if (state.runsDone < 5) return 'Finish 5 runs.';
  if (state.earned < 500) return 'Earn $500 in total.';
  if (state.rank < 2) return 'Reach rank ' + carwashRankNameFor(2) + '.';
  if (state.upgradesOwned < 4) return 'Own 4 upgrades.';
  return 'Become a legend of the Car Wash.';
}

export function carwashRecordFor(id, state) {
  let rec = null;
  let i = 0;
  while (i < CARWASH_RECORDS.length) {
    if (CARWASH_RECORDS[i].id === id) rec = CARWASH_RECORDS[i];
    i += 1;
  }
  if (!rec) return null;
  const value = state[rec.stat] === undefined ? 0 : state[rec.stat];
  return { id: rec.id, name: rec.name, stat: rec.stat, unit: rec.unit, desc: rec.desc, value };
}

export function carwashAllRecords(state) {
  const out = [];
  let i = 0;
  while (i < CARWASH_RECORDS.length) {
    out.push(carwashRecordFor(CARWASH_RECORDS[i].id, state));
    i += 1;
  }
  return out;
}

export function carwashLeaderboardWith(score) {
  const board = [];
  let i = 0;
  while (i < CARWASH_LEADERBOARD.length) {
    const e = CARWASH_LEADERBOARD[i];
    if (e.name === 'You') board.push({ name: e.name, score, desc: e.desc });
    else board.push({ name: e.name, score: e.score, desc: e.desc });
    i += 1;
  }
  board.sort((a, b) => b.score - a.score);
  const ranked = [];
  let j = 0;
  while (j < board.length) {
    ranked.push({ rank: j + 1, name: board[j].name, score: board[j].score, desc: board[j].desc });
    j += 1;
  }
  return ranked;
}

export function carwashSeasonReport(state, seasonId) {
  const mult = carwashSeasonMult(seasonId);
  const rows = [];
  let i = 0;
  while (i < WASH_PACKAGES.length) {
    const it = WASH_PACKAGES[i];
    rows.push({ id: it.id, name: it.name, basePrice: it.price, seasonPrice: carwashOneDec(it.price * mult), owned: !!state.owned[it.id], level: state.levels[it.id] || 0 });
    i += 1;
  }
  return rows;
}

export function carwashChallengeProgress(challenge, state) {
  const have = Math.floor(state[challenge.target] || 0);
  return { id: challenge.id, name: challenge.name, have, goal: challenge.goal, done: have >= challenge.goal, xp: challenge.xp };
}

export function carwashBestEntryFor(rank) {
  let best = null;
  let bestScore = -1;
  let i = 0;
  while (i < WASH_PACKAGES.length) {
    const it = WASH_PACKAGES[i];
    if (it.difficulty <= rank + 2) {
      const score = (it.price * (1 + it.rarity * 2)) / it.difficulty;
      if (score > bestScore) {
        bestScore = score;
        best = it;
      }
    }
    i += 1;
  }
  return best;
}

export function carwashEventFor(day) {
  return CARWASH_MARKET_EVENTS[day % CARWASH_MARKET_EVENTS.length];
}

export function carwashDailyEventFor(day) {
  return CARWASH_DAILY_EVENTS[day % CARWASH_DAILY_EVENTS.length];
}

export function carwashRankNameFor(level) {
  let i = 0;
  while (i < CARWASH_RANKS.length) {
    if (CARWASH_RANKS[i].level === level) return CARWASH_RANKS[i].name;
    i += 1;
  }
  return 'Unknown';
}

export function carwashTotalValue(state) {
  return carwashOneDec(carwashInventoryValue(state) + state.pending + state.earned);
}

export function carwashProgressPercent(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 0;
  return Math.round((state.runsDone / total) * 100);
}

export function carwashStaffBonusFor(staffIds, skill) {
  let total = 0;
  let i = 0;
  while (i < staffIds.length) {
    const s = carwashStaffById(staffIds[i]);
    if (s && s.skill === skill) total = total + s.bonus;
    i += 1;
  }
  return total;
}

export function carwashCheapestEntry() {
  let best = WASH_PACKAGES[0];
  let i = 1;
  while (i < WASH_PACKAGES.length) {
    if (WASH_PACKAGES[i].price < best.price) best = WASH_PACKAGES[i];
    i += 1;
  }
  return best;
}

export function carwashPriciestEntry() {
  let best = WASH_PACKAGES[0];
  let i = 1;
  while (i < WASH_PACKAGES.length) {
    if (WASH_PACKAGES[i].price > best.price) best = WASH_PACKAGES[i];
    i += 1;
  }
  return best;
}

export function carwashEntriesByDifficulty(difficulty) {
  const ids = [];
  let i = 0;
  while (i < WASH_PACKAGES.length) {
    if (WASH_PACKAGES[i].difficulty === difficulty) ids.push(WASH_PACKAGES[i].id);
    i += 1;
  }
  return ids;
}

export function carwashEntriesByRarity(maxRarity) {
  const ids = [];
  let i = 0;
  while (i < WASH_PACKAGES.length) {
    if (WASH_PACKAGES[i].rarity <= maxRarity) ids.push(WASH_PACKAGES[i].id);
    i += 1;
  }
  return ids;
}

export function carwashGradeFor(runsDone, earned, visitors) {
  const score = runsDone * 10 + Math.round(earned / 10) + Math.floor(visitors / 10);
  if (score >= 500) return 'S';
  if (score >= 300) return 'A';
  if (score >= 150) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}

export function createCarWashSystem(ctx) {
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
  WASH_PACKAGES.forEach((it) => {
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

  function gainXp(n) {
    state.xp += n;
    const lvl = carwashRankFor(state.xp);
    if (lvl > state.rank) {
      state.rank = lvl;
      log('Rank up! You are now ' + carwashRankNameFor(lvl) + '.');
    }
  }

  function offerPackage(id) {
    const item = carwashItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (state.owned[id]) return { ok: false, reason: 'already-owned', id };
    const cap = carwashCapacityFor(state.rank, state.upgrades);
    if (state.itemsOwned >= cap) return { ok: false, reason: 'capacity-full', cap };
    const need = Math.max(0, item.difficulty - 2);
    if (state.rank < need) return { ok: false, reason: 'rank-too-low', rank: need };
    const cost = carwashPriceFor(id, state.drift[id] || 0, 0, []);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned[id] = 1;
    state.levels[id] = 1;
    state.itemsOwned += 1;
    gainXp(10);
    log('Offered package ' + item.name + ' for $' + cost + '.');
    return { ok: true, id, cost, name: item.name };
  }

  function washCar(id) {
    const item = carwashItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (state.active) return { ok: false, reason: 'already-running', active: state.activeId };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    state.active = 'run';
    state.activeId = id;
    state.activeTimer = 30 + item.difficulty * 10;
    state.activeBase = item.price;
    log('Wash started: ' + item.name + '.');
    return { ok: true, id, seconds: state.activeTimer };
  }

  function settleRun() {
    const item = carwashItemById(state.activeId);
    const doneId = state.activeId;
    const sky = getWeather();
    const payout = carwashPayoutFor(item, state.rank, state.upgrades, sky, !!state.boosted[doneId]);
    const crowd = carwashCrowdFor(item, state.rank, sky);
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
    log('Wash ' + (item ? item.name : doneId) + ' drew ' + crowd + ' drivers and earned $' + payout + '.');
  }

  function collectWashRevenue() {
    if (state.pending <= 0) return { ok: false, reason: 'nothing-pending' };
    const amount = state.pending;
    state.pending = 0;
    state.earned += amount;
    addCash(amount);
    log('Collected $' + amount + ' in wash revenue.');
    return { ok: true, amount };
  }

  function sellMembership(id) {
    const item = carwashItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    const refund = Math.round(item.price * 0.5);
    delete state.owned[id];
    delete state.levels[id];
    state.itemsOwned -= 1;
    state.earned += refund;
    addCash(refund);
    gainXp(5);
    log('Sold membership stock from ' + item.name + ' for $' + refund + '.');
    return { ok: true, total: refund, qty: 1 };
  }

  function detailCar(id) {
    const item = carwashItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    if (getCash() < 40) return { ok: false, reason: 'not-enough-cash', cost: 40 };
    addCash(-40);
    state.spent += 40;
    state.boosted[id] = true;
    state.reputation += 1;
    gainXp(10);
    log('Detailed a car for ' + item.name + '.');
    return { ok: true, id, boosted: true };
  }

  function buyUpgrade(id) {
    const up = carwashUpgradeById(id);
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
    const s = carwashStaffById(id);
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
    const item = carwashItemById(id);
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
    const rows = [];
    for (const it of WASH_PACKAGES) {
      rows.push({
        id: it.id,
        name: it.name,
        price: state.prices[it.id],
        basePrice: it.price,
        drift: state.drift[it.id] || 0,
        owned: !!state.owned[it.id],
        level: state.levels[it.id] || 0,
        difficulty: it.difficulty,
        rarity: it.rarity,
      });
    }
    return rows;
  }

  function listItems() {
    const rows = [];
    for (const it of WASH_PACKAGES) {
      rows.push({ id: it.id, name: it.name, price: it.price, difficulty: it.difficulty, rarity: it.rarity, desc: it.desc, owned: !!state.owned[it.id] });
    }
    return rows;
  }

  function info(id) {
    const item = carwashItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    return { ok: true, item, owned: !!state.owned[id], level: state.levels[id] || 0, price: state.prices[id], holdings: state.holdings[id] || 0 };
  }

  function dailyEvent() {
    if (CARWASH_DAILY_EVENTS.length === 0) return { event: 'none', name: '', effect: '', amount: 0 };
    const ev = CARWASH_DAILY_EVENTS[Math.floor(rng() * CARWASH_DAILY_EVENTS.length)];
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
    state.activeTimer -= dt;
    if (state.activeTimer <= 0) {
      state.activeTimer = 0;
      settleRun();
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return null;
    state.lastDay = day;
    for (const it of WASH_PACKAGES) {
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
    for (const k of Object.keys(saved)) state[k] = saved[k];
    if (!state.drift || typeof state.drift !== 'object') state.drift = {};
    if (!state.prices || typeof state.prices !== 'object') state.prices = {};
    if (!state.holdings || typeof state.holdings !== 'object') state.holdings = {};
    for (const it of WASH_PACKAGES) {
      if (state.drift[it.id] === undefined) state.drift[it.id] = 0;
      if (state.prices[it.id] === undefined) state.prices[it.id] = it.price;
      if (state.holdings[it.id] === undefined) state.holdings[it.id] = 0;
    }
    if (!state.owned || typeof state.owned !== 'object') state.owned = {};
    if (!state.levels || typeof state.levels !== 'object') state.levels = {};
    if (!state.boosted || typeof state.boosted !== 'object') state.boosted = {};
    state.rank = carwashRankFor(state.xp);
  }

  function stats() {
    let holdingsCount = 0;
    for (const k of Object.keys(state.holdings)) holdingsCount += state.holdings[k] || 0;
    return {
      name: 'Car Wash',
      mechanic: 'venue',
      rank: carwashRankNameFor(state.rank),
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
    if (state.active) return 'Car Wash: running ' + state.activeId + ' - ' + Math.ceil(state.activeTimer) + 's left';
    if (state.pending > 0) return 'Car Wash: $' + state.pending + ' waiting in the till';
    if (state.itemsOwned > 0) return 'Car Wash: ' + state.itemsOwned + ' entries, $' + state.earned + ' earned';
    return '';
  }

  function interact(action, a, b) {
    if (!action || action === 'status') {
      return { ok: true, stats: stats(), hint: 'open a package to offer it, run a package to wash a car, collect to empty the till' };
    }
    if (action === 'open') return offerPackage(a);
    if (action === 'run') return washCar(a);
    if (action === 'collect') return collectWashRevenue();
    if (action === 'sell') return sellMembership(a, b);
    if (action === 'upgrade' || action === 'levelup') return upgradeItem(a);
    if (action === 'hire') return hireStaff(a);
    if (action === 'fire') return fireStaff(a);
    if (action === 'special') return detailCar(a);
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
    upgrade: upgradeItem,
    hire: hireStaff,
  };
}

export function createCarWashExtras(system) {
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  function challenges() {
    const out = [];
    for (const ch of CARWASH_CHALLENGES) out.push(carwashChallengeProgress(ch, system.state));
    return out;
  }

  function claimChallenge(id) {
    let ch = null;
    for (const c of CARWASH_CHALLENGES) {
      if (c.id === id) ch = c;
    }
    if (!ch) return { ok: false, reason: 'unknown-challenge', id };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed', id };
    const prog = carwashChallengeProgress(ch, system.state);
    if (!prog.done) return { ok: false, reason: 'not-done', id, have: prog.have, goal: prog.goal };
    claimed.push(id);
    system.state.challengesClaimed.push(id);
    system.gainXp(ch.xp);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    const out = [];
    for (const a of CARWASH_ACHIEVEMENTS) {
      const have = Math.floor(system.state[a.target] || 0);
      out.push({ id: a.id, name: a.name, desc: a.desc, target: a.target, goal: a.goal, have, done: have >= a.goal });
    }
    return out;
  }

  function hireHelper(id) {
    const s = carwashStaffById(id);
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
      const s = carwashStaffById(hid);
      if (s) due += s.wage;
    }
    wagesPaid += due;
    system.state.wagesPaid += due;
    return { due, helpers: helpers.length, totalPaid: wagesPaid };
  }

  function helperBonus(skill) {
    let total = 0;
    for (const hid of helpers) {
      const s = carwashStaffById(hid);
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
    if (!carwashItemById(id)) return { ok: false, reason: 'unknown-item', id };
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
    const rows = [];
    for (const s of CARWASH_STAFF) {
      rows.push({ id: s.id, name: s.name, wage: s.wage, skill: s.skill, hired: helpers.includes(s.id) || system.state.staff.includes(s.id) });
    }
    return rows;
  }

  function upgradeCatalog() {
    const rows = [];
    for (const u of CARWASH_UPGRADES) {
      rows.push({ id: u.id, name: u.name, cost: u.cost, effect: u.effect, desc: u.desc, owned: system.state.upgrades.includes(u.id) });
    }
    return rows;
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

export function createCarWashMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  function setEvent(id) {
    let found = null;
    for (const e of CARWASH_MARKET_EVENTS) {
      if (e.id === id) found = e;
    }
    if (!found) return { ok: false, reason: 'unknown-event', id };
    currentEvent = id;
    return { ok: true, event: id };
  }

  function setSeason(id) {
    let found = null;
    for (const s of CARWASH_SEASONS) {
      if (s.id === id) found = s;
    }
    if (!found) return { ok: false, reason: 'unknown-season', id };
    currentSeason = id;
    return { ok: true, season: id };
  }

  function eventPrice(itemId, basePrice) {
    const mult = carwashMarketEventMult(currentEvent, itemId) * carwashSeasonMult(currentSeason);
    return Math.round(basePrice * mult * 10) / 10;
  }

  function bulkDeal(itemId, qty) {
    const item = carwashItemById(itemId);
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
    for (const it of WASH_PACKAGES) {
      const mult = carwashMarketEventMult(currentEvent, it.id);
      if (mult !== 1) rows.push({ item: it.id, name: it.name, mult, event: currentEvent });
    }
    return rows;
  }

  function marketSummary() {
    return { event: currentEvent, season: currentSeason, dealsClaimed, bulkTraded, deals: dailyDeals() };
  }

  function seasonPrices() {
    const rows = [];
    for (const it of WASH_PACKAGES) {
      rows.push({ id: it.id, name: it.name, price: eventPrice(it.id, it.price) });
    }
    return rows;
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
