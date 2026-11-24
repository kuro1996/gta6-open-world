// Solara Nights - Hotel (Round 7 mega-rebuild, written fresh).
// The Seaside Rest hotel: open rooms, check guests in, and keep the
// sheets crisp and the reviews five-star. A wedding books the whole
// floor, a burst pipe floods the lobby, and a famous critic checks in
// under a false name. Breakfast, concierge, and a smile at the desk
// turn one night into a lifetime of return visits.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.
// Mechanic: venue.

export const ROOM_TYPES = [
  { id: 'bunk-dorm', name: 'Bunk Dorm', price: 40, rarity: 0.3, difficulty: 1, beds: 8, size: 18, perk: 'Shared bath',
    desc: 'Eight bunks, one bathroom, endless backpacker stories.' },
  { id: 'single-cozy', name: 'Cozy Single', price: 70, rarity: 0.25, difficulty: 1, beds: 1, size: 22, perk: 'City view',
    desc: 'One bed, one window, and the whole city blinking below.' },
  { id: 'double-standard', name: 'Standard Double', price: 110, rarity: 0.2, difficulty: 2, beds: 2, size: 30, perk: 'Mini bar',
    desc: 'Two beds, a kettle, and a television that mostly works.' },
  { id: 'family-suite', name: 'Family Suite', price: 180, rarity: 0.15, difficulty: 2, beds: 4, size: 48, perk: 'Kitchenette',
    desc: 'Room for the kids, the grandparents, and all their luggage.' },
  { id: 'sea-view', name: 'Sea View Room', price: 220, rarity: 0.12, difficulty: 3, beds: 2, size: 36, perk: 'Balcony',
    desc: 'Wake up to the harbour. Fall asleep to the waves.' },
  { id: 'business-room', name: 'Business Room', price: 160, rarity: 0.16, difficulty: 2, beds: 1, size: 28, perk: 'Desk and wifi',
    desc: 'A proper desk, fast wifi, and silence after nine.' },
  { id: 'honeymoon-suite', name: 'Honeymoon Suite', price: 350, rarity: 0.08, difficulty: 3, beds: 2, size: 55, perk: 'Jacuzzi',
    desc: 'Rose petals on arrival, a jacuzzi, and a do-not-disturb sign.' },
  { id: 'penthouse', name: 'The Penthouse', price: 900, rarity: 0.03, difficulty: 5, beds: 4, size: 120, perk: 'Private terrace',
    desc: 'The whole top floor. A terrace above the clouds of Solara.' },
  { id: 'garden-cottage', name: 'Garden Cottage', price: 260, rarity: 0.1, difficulty: 3, beds: 3, size: 60, perk: 'Private garden',
    desc: 'A little house behind the roses with its own front door.' },
  { id: 'capsule-pod', name: 'Capsule Pod', price: 30, rarity: 0.35, difficulty: 1, beds: 1, size: 8, perk: 'Smart pod',
    desc: 'A bed, a light, a charger. Everything a traveller needs.' },
];

export const HOTEL_UPGRADES = [
  { id: 'fresh-linen', name: 'Fresh Linen Service', cost: 100, effect: 'comfort-plus', desc: 'Crisp sheets every day. Guests notice, reviewers mention it.' },
  { id: 'breakfast-bar', name: 'Breakfast Bar', cost: 250, effect: 'food-plus', desc: 'Croissants, coffee and eggs until eleven. Worth the queue.' },
  { id: 'pool', name: 'Swimming Pool', cost: 600, effect: 'leisure-plus', desc: 'A blue rectangle of happiness on the roof.' },
  { id: 'spa', name: 'Spa and Sauna', cost: 900, effect: 'spa-plus', desc: 'Steam, stones and silence. Guests book an extra night.' },
  { id: 'concierge', name: 'Concierge Desk', cost: 400, effect: 'service-plus', desc: 'Tickets, taxis and tables, arranged before breakfast.' },
  { id: 'valet', name: 'Valet Parking', cost: 350, effect: 'valet-plus', desc: 'Keys handed over, cars whisked away, guests impressed.' },
  { id: 'rooftop-bar', name: 'Rooftop Bar', cost: 1200, effect: 'bar-plus', desc: 'Sunset cocktails above the city. The busiest room in the hotel.' },
  { id: 'grand-lobby', name: 'Grand Lobby', cost: 1800, effect: 'capacity-plus', desc: 'Marble, chandeliers and space for two more room types.' },
];

export const HOTEL_RANKS = [
  { level: 0, name: 'Guesthouse', xp: 0, perk: 'Rooms pay base rate.' },
  { level: 1, name: 'Boutique Stay', xp: 150, perk: '+5% prices, guests leave kind notes.' },
  { level: 2, name: 'City Hotel', xp: 400, perk: '+10% prices, tour buses add your stop.' },
  { level: 3, name: 'Luxury Resort', xp: 800, perk: '+15% prices, honeymooners book months ahead.' },
  { level: 4, name: 'Five-Star Legend', xp: 1500, perk: '+20% prices, the guidebooks fight over you.' },
];

export const HOTEL_STAFF = [
  { id: 'reception-rosa', name: 'Rosa the Receptionist', wage: 35, skill: 'welcome', bonus: 0.15, desc: 'Remembers every returning guest by name and room.' },
  { id: 'housekeeper-han', name: 'Han the Housekeeper', wage: 30, skill: 'clean', bonus: 0.2, desc: 'A room cleaned by Han smells like a fresh morning.' },
  { id: 'concierge-cleo', name: 'Cleo the Concierge', wage: 40, skill: 'service', bonus: 0.15, desc: 'Can get a table anywhere in Solara, even on festival night.' },
  { id: 'chef-omar', name: 'Omar the Chef', wage: 45, skill: 'food', bonus: 0.2, desc: 'His breakfast alone is worth a five-star review.' },
];

export const HOTEL_DAILY_EVENTS = [
  { id: 'wedding-booking', name: 'Wedding Booking', effect: 'earn', amount: 600,
    text: 'A wedding books the whole top floor for the weekend.' },
  { id: 'tour-bus', name: 'Tour Bus Arrival', effect: 'visitors', amount: 80,
    text: 'Forty tourists, forty suitcases, forty check-ins at once.' },
  { id: 'burst-pipe', name: 'Burst Pipe', effect: 'cost', amount: 200,
    text: 'Water in the lobby. A plumber, mops, and apologies.' },
  { id: 'five-star-review', name: 'Five-Star Review', effect: 'rep', amount: 2,
    text: 'A travel writer calls you the best stay in Solara.' },
  { id: 'food-critic', name: 'Food Critic', effect: 'earn', amount: 300,
    text: 'A critic books dinner. The kitchen does not sleep.' },
  { id: 'conference-group', name: 'Conference Group', effect: 'earn', amount: 450,
    text: 'A company books twenty rooms for a three-day summit.' },
  { id: 'quiet-week', name: 'Quiet Week', effect: 'xp', amount: 15,
    text: 'Empty corridors and time to repaint the stairwell.' },
  { id: 'festival-surge', name: 'Festival Surge', effect: 'visitors', amount: 100,
    text: 'The city festival fills every bed in Solara.' },
  { id: 'vip-checkin', name: 'VIP Check-In', effect: 'earn', amount: 350,
    text: 'A film star checks in under a false name. Staff stay calm.' },
  { id: 'plumbing-emergency', name: 'Plumbing Emergency', effect: 'cost', amount: 150,
    text: 'The penthouse jacuzzi overflows at midnight.' },
];

export const HOTEL_TIPS = [
  { id: 'linen-first', name: 'Linen First', text: 'Fresh linen is the cheapest upgrade and the most reviewed.' },
  { id: 'wedding-math', name: 'Wedding Math', text: 'One wedding pays like a week of single rooms. Court the planners.' },
  { id: 'review-reply', name: 'Review Reply', text: 'Answer every review kindly, even the unfair ones. Future guests read them.' },
  { id: 'festival-prices', name: 'Festival Prices', text: 'Festival week is when the penthouse earns its keep.' },
  { id: 'breakfast-hook', name: 'Breakfast Hook', text: 'Guests book for the bed and return for the breakfast.' },
  { id: 'quiet-paint', name: 'Quiet Paint', text: 'Use quiet weeks to upgrade. Never renovate during festival week.' },
  { id: 'concierge-magic', name: 'Concierge Magic', text: 'A concierge who solves problems creates regulars for life.' },
  { id: 'pool-hours', name: 'Pool Hours', text: 'Keep the pool open late in summer. The rooftop bar thanks you.' },
];

export const HOTEL_CHALLENGES = [
  { id: 'first-steps', name: 'First Steps', target: 'runsDone', goal: 3, xp: 40, desc: 'Finish 3 hotel runs.' },
  { id: 'regular', name: 'Regular', target: 'runsDone', goal: 10, xp: 90, desc: 'Finish 10 hotel runs.' },
  { id: 'collector', name: 'Collector', target: 'itemsOwned', goal: 4, xp: 100, desc: 'Own 4 different hotel entries.' },
  { id: 'big-earner', name: 'Big Earner', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from the hotel business.' },
  { id: 'crowd-favourite', name: 'Crowd Favourite', target: 'visitors', goal: 200, xp: 110, desc: 'Draw 200 visitors through the hotel business.' },
  { id: 'respected', name: 'Respected Name', target: 'reputation', goal: 10, xp: 100, desc: 'Reach 10 reputation in the hotel business.' },
  { id: 'best-day', name: 'Best Day Ever', target: 'bestRun', goal: 400, xp: 130, desc: 'Score a single run worth $400 or more.' },
  { id: 'fully-kitted', name: 'Fully Kitted', target: 'upgradesOwned', goal: 6, xp: 150, desc: 'Own 6 upgrades for the hotel business.' },
];

export const HOTEL_ACHIEVEMENTS = [
  { id: 'first-run', name: 'First Run', target: 'runsDone', goal: 1, desc: 'Finish your first hotel run.' },
  { id: 'first-sale', name: 'First Payday', target: 'earned', goal: 1, desc: 'Collect your first dollar of hotel earnings.' },
  { id: 'ten-runs', name: 'Ten Runs Deep', target: 'runsDone', goal: 10, desc: 'Finish 10 hotel runs.' },
  { id: 'thousand-club', name: 'Thousand Club', target: 'earned', goal: 1000, desc: 'Earn $1,000 in total from the hotel business.' },
  { id: 'five-hundred-faces', name: 'Five Hundred Faces', target: 'visitors', goal: 500, desc: 'Welcome 500 visitors through the hotel business.' },
  { id: 'rank-three', name: 'Rising Star', target: 'rank', goal: 3, desc: 'Reach rank 3 in the hotel business.' },
  { id: 'full-shelf', name: 'Full Shelf', target: 'itemsOwned', goal: 8, desc: 'Own 8 different hotel entries at once.' },
  { id: 'streak-five', name: 'On A Roll', target: 'bestStreak', goal: 5, desc: 'Build a 5-run streak without a failed hotel run.' },
];

export const HOTEL_LEADERBOARD = [
  { name: 'The Grand Solara', score: 4200, desc: 'The old palace hotel on the hill.' },
  { name: 'Harbor View Inn', score: 3100, desc: 'Every window faces the water.' },
  { name: 'The Palms', score: 2400, desc: 'Pool, palms and a famous breakfast.' },
  { name: 'Old Town Lodge', score: 1500, desc: 'Creaky floors, warm hearts, full books.' },
  { name: 'You', score: 0, desc: 'Climbing the hotel ladder.' },
];

export const HOTEL_RECORDS = [
  { id: 'biggest-run', name: 'Biggest Run', stat: 'bestRun', unit: '$', desc: 'Best single-run payout.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money earned overall.' },
  { id: 'most-visitors', name: 'Most Visitors', stat: 'visitors', unit: 'people', desc: 'Most visitors welcomed.' },
  { id: 'most-runs', name: 'Most Runs', stat: 'runsDone', unit: 'runs', desc: 'Most runs finished.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'runs', desc: 'Longest run streak.' },
];

export const HOTEL_MARKET_EVENTS = [
  { id: 'bunk-dorm-surge', name: 'Bunk Dorm Surge', item: 'bunk-dorm', mult: 1.35, desc: 'Demand for Bunk Dorm swings hard this week.' },
  { id: 'single-cozy-surge', name: 'Cozy Single Surge', item: 'single-cozy', mult: 0.7, desc: 'Demand for Cozy Single swings hard this week.' },
  { id: 'double-standard-surge', name: 'Standard Double Surge', item: 'double-standard', mult: 1.35, desc: 'Demand for Standard Double swings hard this week.' },
  { id: 'family-suite-surge', name: 'Family Suite Surge', item: 'family-suite', mult: 0.7, desc: 'Demand for Family Suite swings hard this week.' },
  { id: 'sea-view-surge', name: 'Sea View Room Surge', item: 'sea-view', mult: 1.35, desc: 'Demand for Sea View Room swings hard this week.' },
  { id: 'business-room-surge', name: 'Business Room Surge', item: 'business-room', mult: 0.7, desc: 'Demand for Business Room swings hard this week.' },
  { id: 'honeymoon-suite-surge', name: 'Honeymoon Suite Surge', item: 'honeymoon-suite', mult: 1.35, desc: 'Demand for Honeymoon Suite swings hard this week.' },
  { id: 'penthouse-surge', name: 'The Penthouse Surge', item: 'penthouse', mult: 0.7, desc: 'Demand for The Penthouse swings hard this week.' },
  { id: 'garden-cottage-surge', name: 'Garden Cottage Surge', item: 'garden-cottage', mult: 1.35, desc: 'Demand for Garden Cottage swings hard this week.' },
  { id: 'capsule-pod-surge', name: 'Capsule Pod Surge', item: 'capsule-pod', mult: 0.7, desc: 'Demand for Capsule Pod swings hard this week.' },
];

export const HOTEL_SEASONS = [
  { id: 'spring-break', name: 'Spring Break', mult: 1.1, desc: 'Students and families arrive in waves.' },
  { id: 'summer-peak', name: 'Summer Peak', mult: 1.25, desc: 'Every bed full, every night, all summer.' },
  { id: 'autumn-calm', name: 'Autumn Calm', mult: 1.0, desc: 'Business travellers and quiet corridors.' },
  { id: 'winter-holidays', name: 'Winter Holidays', mult: 1.15, desc: 'Festive bookings and long family stays.' },
];

export const HOTEL_FACTS = [
  { id: 'fact-bunk-dorm', text: 'Bunk Dorm: Eight bunks, one bathroom, endless backpacker stories.' },
  { id: 'fact-single-cozy', text: 'Cozy Single: One bed, one window, and the whole city blinking below.' },
  { id: 'fact-double-standard', text: 'Standard Double: Two beds, a kettle, and a television that mostly works.' },
  { id: 'fact-family-suite', text: 'Family Suite: Room for the kids, the grandparents, and all their luggage.' },
  { id: 'fact-sea-view', text: 'Sea View Room: Wake up to the harbour. Fall asleep to the waves.' },
  { id: 'fact-business-room', text: 'Business Room: A proper desk, fast wifi, and silence after nine.' },
  { id: 'fact-honeymoon-suite', text: 'Honeymoon Suite: Rose petals on arrival, a jacuzzi, and a do-not-disturb sign.' },
  { id: 'fact-penthouse', text: 'The Penthouse: The whole top floor. A terrace above the clouds of Solara.' },
  { id: 'fact-garden-cottage', text: 'Garden Cottage: A little house behind the roses with its own front door.' },
  { id: 'fact-capsule-pod', text: 'Capsule Pod: A bed, a light, a charger. Everything a traveller needs.' },
  { id: 'fact-general-0', text: 'The best hotel operators in Solara check their prices every morning before opening.' },
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

export const HOTEL_NPC_LINES = [
  { id: 'npc-0', text: 'I came all the way across town for the Bunk Dorm. Worth it.' },
  { id: 'npc-1', text: 'My cousin runs a hotel place too, but yours is better. Do not tell him.' },
  { id: 'npc-2', text: 'Is the Family Suite really as good as everyone says? I am about to find out.' },
  { id: 'npc-3', text: 'I bring my kids here every weekend. They ask for the Cozy Single by name.' },
  { id: 'npc-4', text: 'You should put the Sea View Room on a poster. People would come just for that.' },
  { id: 'npc-5', text: 'I heard the Business Room here is the best in Solara. The rumour was right.' },
  { id: 'npc-6', text: 'Quiet day today. The Honeymoon Suite still made my afternoon.' },
  { id: 'npc-7', text: 'I saved up for weeks to try the The Penthouse. No regrets.' },
  { id: 'npc-8', text: 'The staff told me about the Garden Cottage. Now I tell everyone I meet.' },
  { id: 'npc-9', text: 'I have been to every hotel spot in the city. This one wins.' },
  { id: 'npc-10', text: 'One day I want to run a hotel place of my own. I am taking notes.' },
  { id: 'npc-11', text: 'The Capsule Pod is the reason my friends finally believe my stories.' },
  { id: 'npc-12', text: 'Do you ever get tired of the Bunk Dorm? I never would.' },
  { id: 'npc-13', text: 'I wrote a review about the Cozy Single last night. Five stars, obviously.' },
  { id: 'npc-14', text: 'My grandmother loved the Standard Double. I come here to remember her.' },
  { id: 'npc-15', text: 'If the Sea View Room gets any better, the whole city will queue around the block.' },
];

export const HOTEL_GUIDE = [
  { id: 'guide-0', text: 'Open your first hotel entry: it costs cash, but it unlocks everything else.' },
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

export function hotelRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < HOTEL_RANKS.length; i++) {
    if (xp >= HOTEL_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function hotelItemById(id) {
  return ROOM_TYPES.find((x) => x.id === id) || null;
}

export function hotelPriceFor(id, drift, rank, upgrades) {
  const item = ROOM_TYPES.find((x) => x.id === id);
  if (!item) return 0;
  let price = item.price;
  price *= 1 + (drift[id] || 0);
  price *= 1 + rank * 0.05;
  if (upgrades && upgrades.length >= 3) price *= 1.1;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function hotelCapacityFor(rank, upgrades) {
  let cap = 3 + rank;
  if (upgrades && upgrades.indexOf('grand-lobby') >= 0) cap += 2;
  return cap;
}

export function hotelPayoutFor(item, rank, upgrades, weather, boosted) {
  let mult = 0.6 + rank * 0.1 + (boosted ? 0.3 : 0);
  if (weather === 'rain') mult *= 1.1;
  if (weather === 'sunny') mult *= 1.05;
  if (weather === 'storm') mult *= 0.7;
  if (upgrades && upgrades.length >= 4) mult *= 1.15;
  return Math.max(5, Math.round(item.price * mult));
}

export function hotelCrowdFor(item, rank, weather) {
  let crowd = 10 + item.difficulty * 8 + rank * 5;
  if (weather === 'rain') crowd = Math.round(crowd * 1.1);
  if (weather === 'sunny') crowd = Math.round(crowd * 1.05);
  if (weather === 'storm') crowd = Math.round(crowd * 0.5);
  return Math.max(1, crowd);
}

export function hotelUpgradeById(id) {
  return HOTEL_UPGRADES.find((x) => x.id === id) || null;
}

export function hotelStaffById(id) {
  return HOTEL_STAFF.find((x) => x.id === id) || null;
}

export function hotelEventById(id) {
  return HOTEL_DAILY_EVENTS.find((x) => x.id === id) || null;
}

export function hotelTipFor(day) {
  return HOTEL_TIPS[day % HOTEL_TIPS.length];
}

export function hotelFactFor(day) {
  return HOTEL_FACTS[day % HOTEL_FACTS.length];
}

export function hotelNpcLineFor(day) {
  return HOTEL_NPC_LINES[day % HOTEL_NPC_LINES.length];
}

export function hotelGuideStep(step) {
  return HOTEL_GUIDE[step] || null;
}

export function hotelSeasonMult(seasonId) {
  const s = HOTEL_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function hotelMarketEventMult(eventId, itemId) {
  const ev = HOTEL_MARKET_EVENTS.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.item === itemId ? ev.mult : 1;
}

export function hotelWeeklyGoal(state) {
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

export function hotelEfficiency(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 100;
  return Math.round((state.runsDone / total) * 100);
}

export function hotelProfitPerRun(state) {
  if (state.runsDone === 0) return 0;
  return Math.round((state.earned / state.runsDone) * 10) / 10;
}

export function hotelInventoryValue(state) {
  let total = 0;
  for (const id of Object.keys(state.owned || {})) {
    const item = ROOM_TYPES.find((x) => x.id === id);
    if (item) total += item.price * (state.levels[id] || 1);
  }
  return Math.round(total * 10) / 10;
}

export function hotelSummary(state) {
  const rankName = HOTEL_RANKS[state.rank] ? HOTEL_RANKS[state.rank].name : 'Unknown';
  return 'Hotel ' + rankName + ': ' + state.runsDone + ' runs, '
    + state.itemsOwned + ' entries, $' + Math.round(state.earned)
    + ' earned, ' + state.visitors + ' visitors.';
}

export function hotelNextGoal(state) {
  if (state.itemsOwned < 1) return 'Open your first entry.';
  if (state.runsDone < 5) return 'Finish 5 runs.';
  if (state.earned < 500) return 'Earn $500 in total.';
  if (state.rank < 2) return 'Reach rank ' + HOTEL_RANKS[2].name + '.';
  if (state.upgradesOwned < 4) return 'Own 4 upgrades.';
  return 'Become a Hotel legend.';
}

export function hotelRecordFor(recordId, state) {
  const r = HOTEL_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function hotelAllRecords(state) {
  return HOTEL_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function hotelLeaderboardWith(playerScore) {
  const board = HOTEL_LEADERBOARD.map((e) => ({
    name: e.name, score: e.name === 'You' ? playerScore : e.score, desc: e.desc,
  }));
  board.sort((a, b) => b.score - a.score);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, score: e.score, desc: e.desc }));
}

export function hotelSeasonReport(state, seasonId) {
  const mult = hotelSeasonMult(seasonId);
  return ROOM_TYPES.map((item) => ({
    id: item.id,
    name: item.name,
    basePrice: item.price,
    seasonPrice: Math.round(item.price * mult * 10) / 10,
    owned: !!state.owned[item.id],
    level: state.levels[item.id] || 0,
  }));
}

export function hotelChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return {
    id: challenge.id, name: challenge.name, have: Math.floor(v),
    goal: challenge.goal, done: v >= challenge.goal, xp: challenge.xp,
  };
}

export function hotelBestEntryFor(rank) {
  let best = null;
  let bestScore = -1;
  for (const item of ROOM_TYPES) {
    if (item.difficulty > rank + 2) continue;
    const score = item.price * (1 + item.rarity * 2) / item.difficulty;
    if (score > bestScore) { bestScore = score; best = item; }
  }
  return best;
}

export function createHotelSystem(ctx) {
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
  for (const item of ROOM_TYPES) {
    state.drift[item.id] = 0;
    state.prices[item.id] = item.price;
  }

  function refreshRank() {
    const r = hotelRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log('Hotel rank up: ' + HOTEL_RANKS[r].name + ' - ' + HOTEL_RANKS[r].perk);
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
      const s = HOTEL_STAFF.find((x) => x.id === id);
      if (s && s.skill === skill) bonus += s.bonus;
    }
    return bonus;
  }

  function driftPrices() {
    for (const item of ROOM_TYPES) {
      const roll = rng();
      if (roll < 0.35) {
        const change = Math.round((rng() * 0.24 - 0.12) * 100) / 100;
        state.drift[item.id] = Math.round((state.drift[item.id] + change) * 100) / 100;
        state.prices[item.id] = Math.max(1, Math.round(item.price * (1 + state.drift[item.id]) * 10) / 10);
      }
    }
  }

  function openRoom(id) {
    const item = ROOM_TYPES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-room' };
    if (state.owned[id]) return { ok: false, reason: 'already-owned' };
    if (state.itemsOwned >= hotelCapacityFor(state.rank, state.upgrades)) {
      return { ok: false, reason: 'capacity-full', cap: hotelCapacityFor(state.rank, state.upgrades) };
    }
    if (state.rank < Math.max(0, item.difficulty - 2)) {
      return { ok: false, reason: 'rank-too-low', need: Math.max(0, item.difficulty - 2) };
    }
    const cost = hotelPriceFor(id, state.drift, 0, []);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned[id] = 1;
    state.levels[id] = 1;
    state.itemsOwned += 1;
    gainXp(10);
    log('Opened ' + item.name + ' for $' + cost + '. Welcome to the Hotel business.');
    return { ok: true, id, cost, name: item.name };
  }

  function checkInGuest(id) {
    const item = ROOM_TYPES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-room' };
    if (state.active) return { ok: false, reason: 'already-running', active: state.activeId };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned' };
    state.active = 'run';
    state.activeId = id;
    state.activeTimer = 30 + item.difficulty * 10;
    state.activeBase = item.price;
    log('Check-in open for ' + item.name + ' is under way.');
    return { ok: true, id, seconds: state.activeTimer };
  }

  function settleRun() {
    const id = state.activeId;
    const item = ROOM_TYPES.find((x) => x.id === id);
    state.active = null;
    state.activeId = null;
    state.activeTimer = 0;
    if (!item) return;
    const cond = weatherCond();
    const boosted = !!state.boosted[id];
    const payout = hotelPayoutFor(item, state.rank, state.upgrades, cond, boosted);
    const crowd = hotelCrowdFor(item, state.rank, cond);
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
    log('Guests settled in ' + item.name + ': ' + crowd + ' visitors, $' + payout + ' in the till.');
  }

  function collectRoomRevenue() {
    if (state.pending <= 0) return { ok: false, reason: 'nothing-pending' };
    const amount = state.pending;
    state.pending = 0;
    state.earned += amount;
    addCash(amount);
    log('Collected $' + amount + ' from the till.');
    return { ok: true, amount };
  }

  function sellUpgrade(id, qty) {
    const item = ROOM_TYPES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-room' };
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

  function hostConference(id) {
    const item = ROOM_TYPES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-room' };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned' };
    if (getCash() < 40) return { ok: false, reason: 'not-enough-cash', cost: 40 };
    addCash(-40);
    state.spent += 40;
    state.boosted[id] = true;
    state.reputation += 1;
    gainXp(10);
    log('Conference booked in ' + item.name + ' is boosted for its next run.');
    return { ok: true, id, boosted: true };
  }

  function buyUpgrade(id) {
    const u = HOTEL_UPGRADES.find((x) => x.id === id);
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
    const s = HOTEL_STAFF.find((x) => x.id === id);
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
    const item = ROOM_TYPES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-room' };
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
    return ROOM_TYPES.map((item) => ({
      id: item.id,
      name: item.name,
      price: hotelPriceFor(item.id, state.drift, state.rank, state.upgrades),
      basePrice: item.price,
      drift: state.drift[item.id],
      owned: !!state.owned[item.id],
      level: state.levels[item.id] || 0,
      difficulty: item.difficulty,
      rarity: item.rarity,
    }));
  }

  function listItems() {
    return ROOM_TYPES.map((item) => ({
      id: item.id, name: item.name, price: item.price,
      difficulty: item.difficulty, rarity: item.rarity, desc: item.desc,
      owned: !!state.owned[item.id],
    }));
  }

  function info(id) {
    const item = ROOM_TYPES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-room' };
    return {
      ok: true, item,
      owned: !!state.owned[id],
      level: state.levels[id] || 0,
      price: hotelPriceFor(id, state.drift, state.rank, state.upgrades),
      holdings: state.holdings[id] || 0,
    };
  }

  function dailyEvent() {
    const idx = Math.floor(rng() * HOTEL_DAILY_EVENTS.length);
    const ev = HOTEL_DAILY_EVENTS[idx];
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
    for (const item of ROOM_TYPES) {
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
      name: 'Hotel',
      mechanic: MECH,
      rank: HOTEL_RANKS[state.rank] ? HOTEL_RANKS[state.rank].name : 'Unknown',
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
      capacity: hotelCapacityFor(state.rank, state.upgrades),
      hour: getHour(),
      day: getDay(),
    };
  }

  function hudLine() {
    if (state.active) {
      return 'Hotel: running ' + state.activeId + ' - ' + Math.max(0, Math.ceil(state.activeTimer)) + 's left';
    }
    if (state.pending > 0) {
      return 'Hotel: $' + Math.round(state.pending) + ' waiting in the till';
    }
    if (state.itemsOwned > 0) {
      return 'Hotel: ' + state.itemsOwned + ' entries, $' + Math.round(state.earned) + ' earned';
    }
    return '';
  }

  function interact(action, a, b) {
    if (!action || action === 'status') return { ok: true, stats: stats(), hint: 'open <room> to ready it, run <room> to check guests in, collect to claim revenue' };
    if (action === 'open') return openRoom(a);
    if (action === 'run') return checkInGuest(a);
    if (action === 'collect') return collectRoomRevenue();
    if (action === 'sell') return sellUpgrade(a, b);
    if (action === 'upgrade') return buyUpgrade(a);
    if (action === 'levelup') return upgradeItem(a);
    if (action === 'hire') return hireStaff(a);
    if (action === 'fire') return fireStaff(a);
    if (action === 'special') return hostConference(a, b);
    if (action === 'info') return info(a);
    if (action === 'prices') return { ok: true, prices: priceBoard() };
    if (action === 'list') return { ok: true, items: listItems() };
    if (action === 'event') return dailyEvent();
    return { ok: false, reason: 'unknown-action', action };
  }

  return {
    name: 'Hotel',
    state,
    gainXp,
    openRoom,
    checkInGuest,
    collectRoomRevenue,
    sellUpgrade,
    hostConference,
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
    open: openRoom,
    run: checkInGuest,
    collect: collectRoomRevenue,
    sell: sellUpgrade,
    upgrade: buyUpgrade,
    hire: hireStaff,
  };
}

export function createHotelExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function challenges() {
    return HOTEL_CHALLENGES.map((ch) => hotelChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = HOTEL_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.indexOf(id) >= 0) return { ok: false, reason: 'already-claimed' };
    const p = hotelChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    system.state.challengesClaimed.push(id);
    if (typeof system.gainXp === 'function') system.gainXp(ch.xp);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return HOTEL_ACHIEVEMENTS.map((a) => ({
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
    const h = HOTEL_STAFF.find((x) => x.id === id);
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
      const h = HOTEL_STAFF.find((x) => x.id === id);
      if (h) due += h.wage;
    }
    helperWagesPaid += due;
    system.state.wagesPaid += due;
    return { due, helpers: helpers.slice(), totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    let bonus = 0;
    for (const id of helpers) {
      const h = HOTEL_STAFF.find((x) => x.id === id);
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
    const item = ROOM_TYPES.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-room' };
    system.state.boosted[id] = true;
    return { ok: true, id, boosted: true };
  }

  function inventoryValue() {
    return hotelInventoryValue(system.state);
  }

  function weeklyReport() {
    return {
      goal: hotelWeeklyGoal(system.state),
      summary: hotelSummary(system.state),
      nextGoal: hotelNextGoal(system.state),
      efficiency: hotelEfficiency(system.state),
      profitPerRun: hotelProfitPerRun(system.state),
      records: hotelAllRecords(system.state),
    };
  }

  function staffRoster() {
    return HOTEL_STAFF.map((s) => ({
      id: s.id, name: s.name, wage: s.wage, skill: s.skill,
      hired: helpers.indexOf(s.id) >= 0 || system.state.staff.indexOf(s.id) >= 0,
    }));
  }

  function upgradeCatalog() {
    return HOTEL_UPGRADES.map((u) => ({
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

export function createHotelMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  function setEvent(eventId) {
    const ev = HOTEL_MARKET_EVENTS.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = HOTEL_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(itemId, basePrice) {
    let price = basePrice;
    price *= hotelMarketEventMult(currentEvent, itemId);
    price *= hotelSeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(itemId, qty) {
    const item = ROOM_TYPES.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-room' };
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
    for (const item of ROOM_TYPES) {
      const mult = hotelMarketEventMult(currentEvent, item.id);
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
    return ROOM_TYPES.map((item) => ({
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

export function hotelEventFor(day) {
  return HOTEL_MARKET_EVENTS[day % HOTEL_MARKET_EVENTS.length];
}

export function hotelDailyEventFor(day) {
  return HOTEL_DAILY_EVENTS[day % HOTEL_DAILY_EVENTS.length];
}

export function hotelRankNameFor(rank) {
  const r = HOTEL_RANKS[rank];
  return r ? r.name : 'Unknown';
}

export function hotelTotalValue(state) {
  const inv = hotelInventoryValue(state);
  return Math.round((inv + state.pending + state.earned) * 10) / 10;
}

export function hotelProgressPercent(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 0;
  return Math.round((state.runsDone / total) * 100);
}

export function hotelStaffBonusFor(staffIds, skill) {
  let bonus = 0;
  for (const id of staffIds) {
    const s = HOTEL_STAFF.find((x) => x.id === id);
    if (s && s.skill === skill) bonus += s.bonus;
  }
  return bonus;
}

export function hotelCheapestEntry() {
  let best = ROOM_TYPES[0];
  for (const item of ROOM_TYPES) {
    if (item.price < best.price) best = item;
  }
  return best;
}

export function hotelPriciestEntry() {
  let best = ROOM_TYPES[0];
  for (const item of ROOM_TYPES) {
    if (item.price > best.price) best = item;
  }
  return best;
}

export function hotelEntriesByDifficulty(difficulty) {
  return ROOM_TYPES.filter((x) => x.difficulty === difficulty).map((x) => x.id);
}

export function hotelEntriesByRarity(maxRarity) {
  return ROOM_TYPES.filter((x) => x.rarity <= maxRarity).map((x) => x.id);
}

export function hotelGradeFor(runsDone, earned, visitors) {
  const score = runsDone * 10 + Math.round(earned / 10) + Math.floor(visitors / 10);
  if (score >= 500) return 'S';
  if (score >= 300) return 'A';
  if (score >= 150) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}

export const HOTEL_META = {
  system: 'hotel',
  version: '7-B4',
  author: 'builder-4',
  mechanic: 'venue',
  dataCount: ROOM_TYPES.length,
  dataName: 'ROOM_TYPES',
};
