export const ROOM_TYPES = [
  { id: 'dorm-bunk', name: 'Dorm Bunk', price: 60, rarity: 0.2, difficulty: 1, beds: 4, size: 20, perk: 'Shared', desc: 'A friendly bunk in a shared dorm, backpacker favourite.' },
  { id: 'single-room', name: 'Single Room', price: 100, rarity: 0.3, difficulty: 1, beds: 1, size: 25, perk: 'Quiet', desc: 'A calm little room for one, street-facing and sunny.' },
  { id: 'double-room', name: 'Double Room', price: 150, rarity: 0.4, difficulty: 2, beds: 2, size: 35, perk: 'Balcony', desc: 'A double bed, a balcony and a view of the square.' },
  { id: 'family-suite', name: 'Family Suite', price: 220, rarity: 0.5, difficulty: 2, beds: 4, size: 60, perk: 'Kitchen', desc: 'Two rooms, a kitchen and space for the whole family.' },
  { id: 'deluxe-king', name: 'Deluxe King', price: 280, rarity: 0.6, difficulty: 3, beds: 2, size: 45, perk: 'Sea View', desc: 'A king bed, a wide window and the sea beyond.' },
  { id: 'penthouse', name: 'Penthouse', price: 450, rarity: 0.85, difficulty: 4, beds: 3, size: 90, perk: 'Private Pool', desc: 'The top floor, a private pool and the whole skyline.' },
  { id: 'garden-villa', name: 'Garden Villa', price: 380, rarity: 0.75, difficulty: 4, beds: 4, size: 80, perk: 'Garden', desc: 'A villa tucked in the garden, birdsong included.' },
  { id: 'business-room', name: 'Business Room', price: 200, rarity: 0.45, difficulty: 2, beds: 2, size: 30, perk: 'Desk', desc: 'A big desk, fast wifi and blackout curtains.' },
  { id: 'honeymoon-suite', name: 'Honeymoon Suite', price: 320, rarity: 0.7, difficulty: 3, beds: 2, size: 55, perk: 'Spa Bath', desc: 'Candles, a spa bath and rose petals on arrival.' },
  { id: 'presidential', name: 'Presidential Suite', price: 600, rarity: 0.95, difficulty: 5, beds: 5, size: 120, perk: 'Butler', desc: 'Three rooms, a butler and a dining hall of your own.' },
];

export const HOTEL_UPGRADES = [
  { id: 'rooftop-pool', name: 'Rooftop Pool', cost: 280, effect: 'crowd +15%', desc: 'A pool on the roof with sunset views.' },
  { id: 'grand-lobby', name: 'Grand Lobby', cost: 320, effect: 'capacity +2', desc: 'A marble lobby for two more room types.' },
  { id: 'spa', name: 'Spa', cost: 240, effect: 'payout +12%', desc: 'Massages and steam for weary travellers.' },
  { id: 'gym', name: 'Gym', cost: 160, effect: 'visitors +10%', desc: 'Treadmills and weights for early risers.' },
  { id: 'restaurant', name: 'Restaurant', cost: 300, effect: 'earned +8%', desc: 'A dining room that fills every evening.' },
  { id: 'concierge-desk', name: 'Concierge Desk', cost: 180, effect: 'rep +2', desc: 'Tickets, tours and local secrets.' },
  { id: 'valet', name: 'Valet', cost: 140, effect: 'crowd +10%', desc: 'Someone parks the car before you blink.' },
  { id: 'minibar', name: 'Minibar', cost: 100, effect: 'payout +8%', desc: 'Cold drinks and snacks in every room.' },
];

export const HOTEL_RANKS = [
  { level: 0, name: 'Guesthouse', xp: 0, perk: 'A cosy place to rest.' },
  { level: 1, name: 'Boutique Stay', xp: 150, perk: 'Small, stylish and full of charm.' },
  { level: 2, name: 'City Hotel', xp: 400, perk: 'The address everyone knows.' },
  { level: 3, name: 'Luxury Resort', xp: 800, perk: 'Pools, spas and white gloves.' },
  { level: 4, name: 'Five-Star Legend', xp: 1500, perk: 'The finest stay in Solara.' },
];

export const HOTEL_STAFF = [
  { id: 'reception-nia', name: 'Nia the Receptionist', wage: 45, skill: 'reception', bonus: 2, desc: 'Greets every guest like an old friend.' },
  { id: 'housekeeper-jo', name: 'Jo the Housekeeper', wage: 40, skill: 'housekeeping', bonus: 2, desc: 'Rooms so clean they sparkle.' },
  { id: 'chef-omar', name: 'Omar the Chef', wage: 60, skill: 'chef', bonus: 3, desc: 'Breakfasts worth waking up for.' },
  { id: 'concierge-lia', name: 'Lia the Concierge', wage: 55, skill: 'concierge', bonus: 3, desc: 'Knows every table and ticket in town.' },
];

export const HOTEL_DAILY_EVENTS = [
  { id: 'wedding-party', name: 'Wedding Party', effect: 'visitors', amount: 30, text: 'A wedding books the whole second floor.' },
  { id: 'travel-blogger', name: 'Travel Blogger', effect: 'rep', amount: 3, text: 'A famous blogger calls the beds heavenly.' },
  { id: 'burst-pipe', name: 'Burst Pipe', effect: 'cost', amount: 50, text: 'A pipe bursts on the third floor at 2am.' },
  { id: 'conference-booking', name: 'Conference Booking', effect: 'earn', amount: 120, text: 'A company books the hall for a week.' },
  { id: 'festival-crowd', name: 'Festival Crowd', effect: 'visitors', amount: 25, text: 'The festival fills every room in town.' },
  { id: 'noise-complaint', name: 'Noise Complaint', effect: 'heat', amount: 2, text: 'A loud party draws the neighbours ire.' },
  { id: 'hospitality-course', name: 'Hospitality Course', effect: 'xp', amount: 25, text: 'A retired hotelier shares the trade secrets.' },
  { id: 'elevator-down', name: 'Elevator Down', effect: 'cost', amount: 35, text: 'The lift jams; repairs take a day.' },
  { id: 'honeymoon-season', name: 'Honeymoon Season', effect: 'earn', amount: 90, text: 'Newlyweds book the suites for weeks.' },
  { id: 'quiet-week', name: 'Quiet Week', effect: 'rep', amount: 1, text: 'Few guests, but every one leaves a kind note.' },
];

export const HOTEL_TIPS = [
  { id: 'tip-rain', name: 'Rainy Nights', text: 'Rain brings travellers indoors to your rooms.' },
  { id: 'tip-lobby', name: 'Grand Lobby', text: 'Buy the Grand Lobby to ready two more room types.' },
  { id: 'tip-conference', name: 'Conferences', text: 'Host a conference before a big check-in for extra payout.' },
  { id: 'tip-streak', name: 'Full House', text: 'Back-to-back check-ins grow your streak fast.' },
  { id: 'tip-prices', name: 'Price Watch', text: 'Room rates drift every day, so check the board.' },
  { id: 'tip-staff', name: 'Good Staff', text: 'A warm receptionist turns one night into a week.' },
  { id: 'tip-donate', name: 'Give Back', text: 'Free rooms for charity build reputation.' },
  { id: 'tip-rank', name: 'Climb Up', text: 'Every check-in pushes you toward City Hotel.' },
];

export const HOTEL_CHALLENGES = [
  { id: 'ch-runs-5', name: 'Five Check-ins', target: 'runsDone', goal: 5, xp: 50, desc: 'Check in 5 guests.' },
  { id: 'ch-earn-500', name: 'First 500', target: 'earned', goal: 500, xp: 80, desc: 'Earn $500 in total.' },
  { id: 'ch-visitors-200', name: 'Full House', target: 'visitors', goal: 200, xp: 60, desc: 'Welcome 200 visitors.' },
  { id: 'ch-items-4', name: 'Four Rooms', target: 'itemsOwned', goal: 4, xp: 70, desc: 'Ready 4 room types.' },
  { id: 'ch-upgrades-3', name: 'Well Equipped', target: 'upgradesOwned', goal: 3, xp: 60, desc: 'Own 3 upgrades.' },
  { id: 'ch-rep-10', name: 'Respected', target: 'reputation', goal: 10, xp: 50, desc: 'Reach 10 reputation.' },
  { id: 'ch-streak-3', name: 'On a Roll', target: 'streak', goal: 3, xp: 90, desc: 'Reach a 3-stay streak.' },
  { id: 'ch-best-300', name: 'Big Night', target: 'bestRun', goal: 300, xp: 100, desc: 'Earn $300 from a single check-in.' },
];

export const HOTEL_ACHIEVEMENTS = [
  { id: 'ach-runs-10', name: 'Hotelier', target: 'runsDone', goal: 10, desc: 'Check in 10 guests.' },
  { id: 'ach-earn-1000', name: 'Golden Keys', target: 'earned', goal: 1000, desc: 'Earn $1,000 in total.' },
  { id: 'ach-visitors-500', name: 'City Favourite', target: 'visitors', goal: 500, desc: 'Welcome 500 visitors.' },
  { id: 'ach-items-6', name: 'Full House', target: 'itemsOwned', goal: 6, desc: 'Ready 6 room types.' },
  { id: 'ach-upgrades-5', name: 'Fully Loaded', target: 'upgradesOwned', goal: 5, desc: 'Own 5 upgrades.' },
  { id: 'ach-rep-20', name: 'Beloved', target: 'reputation', goal: 20, desc: 'Reach 20 reputation.' },
  { id: 'ach-streak-5', name: 'Unstoppable', target: 'streak', goal: 5, desc: 'Reach a 5-stay streak.' },
  { id: 'ach-best-500', name: 'Record Night', target: 'bestRun', goal: 500, desc: 'Earn $500 from a single check-in.' },
];

export const HOTEL_LEADERBOARD = [
  { name: 'Grand Solara', score: 1150, desc: 'The palace hotel by the bay.' },
  { name: 'Seaside Inn', score: 840, desc: 'A breezy inn with a loyal crowd.' },
  { name: 'Old Mill Hotel', score: 620, desc: 'A converted mill with creaky charm.' },
  { name: 'Backpacker Den', score: 260, desc: 'Cheap beds, big stories.' },
  { name: 'You', score: 0, desc: 'The new name on the board.' },
];

export const HOTEL_RECORDS = [
  { id: 'rec-runs', name: 'Most Check-ins', stat: 'runsDone', unit: 'stays', desc: 'Total check-ins completed.' },
  { id: 'rec-earned', name: 'Top Earnings', stat: 'earned', unit: '$', desc: 'Total money earned.' },
  { id: 'rec-visitors', name: 'Biggest Crowd', stat: 'visitors', unit: 'guests', desc: 'Total visitors welcomed.' },
  { id: 'rec-best', name: 'Best Stay', stat: 'bestRun', unit: '$', desc: 'Best single-stay payout.' },
  { id: 'rec-streak', name: 'Longest Streak', stat: 'bestStreak', unit: 'stays', desc: 'Longest run of stays.' },
];

export const HOTEL_MARKET_EVENTS = [
  { id: 'me-dorm', name: 'Backpacker Boom', item: 'dorm-bunk', mult: 1.35, desc: 'Backpackers flood the city.' },
  { id: 'me-single', name: 'Single Slump', item: 'single-room', mult: 0.7, desc: 'Solo travellers stay home.' },
  { id: 'me-double', name: 'Couple Season', item: 'double-room', mult: 1.35, desc: 'Couples book balconies all week.' },
  { id: 'me-family', name: 'Family Dip', item: 'family-suite', mult: 0.7, desc: 'School is back, families stay put.' },
  { id: 'me-deluxe', name: 'Deluxe Rush', item: 'deluxe-king', mult: 1.35, desc: 'Sea-view rooms are the talk of town.' },
  { id: 'me-pent', name: 'Penthouse Cool', item: 'penthouse', mult: 0.7, desc: 'The top floor rests this week.' },
  { id: 'me-garden', name: 'Garden Bloom', item: 'garden-villa', mult: 1.35, desc: 'The villas are in full flower.' },
  { id: 'me-business', name: 'Business Lull', item: 'business-room', mult: 0.7, desc: 'Conferences pause for the holidays.' },
  { id: 'me-honey', name: 'Honeymoon Rush', item: 'honeymoon-suite', mult: 1.35, desc: 'Wedding season fills the suites.' },
  { id: 'me-pres', name: 'Presidential Pause', item: 'presidential', mult: 0.7, desc: 'The big suite waits for its next star.' },
];

export const HOTEL_SEASONS = [
  { id: 'summer', name: 'Summer', mult: 1.15, desc: 'Peak season, every bed full.' },
  { id: 'autumn', name: 'Autumn', mult: 1.0, desc: 'Steady business travel.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Quiet halls and low rates.' },
  { id: 'spring', name: 'Spring', mult: 1.05, desc: 'Spring breaks bring fresh crowds.' },
];

export const HOTEL_FACTS = [
  { id: 'fact-dorm', text: 'The Dorm Bunk once hosted a whole football team.' },
  { id: 'fact-single', text: 'The Single Room has the sunniest window in the house.' },
  { id: 'fact-double', text: 'The Double Room balcony faces the old square.' },
  { id: 'fact-family', text: 'The Family Suite kitchen has fed fifty kids.' },
  { id: 'fact-deluxe', text: 'The Deluxe King bed was shipped from overseas.' },
  { id: 'fact-pent', text: 'The Penthouse pool is the highest in the city.' },
  { id: 'fact-garden', text: 'The Garden Villa was once a gardener cottage.' },
  { id: 'fact-business', text: 'The Business Room desk has signed three big deals.' },
  { id: 'fact-honey', text: 'The Honeymoon Suite has seen 200 proposals.' },
  { id: 'fact-pres', text: 'The Presidential Suite once hosted a real prince.' },
  { id: 'fact-1', text: 'The word hotel comes from the French for hostel.' },
  { id: 'fact-2', text: 'The first hotels offered only a bed and a meal.' },
  { id: 'fact-3', text: 'A concierge can get you a table anywhere.' },
  { id: 'fact-4', text: 'Housekeepers change more sheets than anyone.' },
  { id: 'fact-5', text: 'The penthouse is always the top floor.' },
  { id: 'fact-6', text: 'Some hotels keep a guest book going back a century.' },
  { id: 'fact-7', text: 'The minibar was invented in the 1960s.' },
  { id: 'fact-8', text: 'Five-star ratings started with guidebooks.' },
  { id: 'fact-9', text: 'The biggest hotel in the world has 7,000 rooms.' },
  { id: 'fact-10', text: 'Turndown service means fresh sheets at night.' },
];

export const HOTEL_NPC_LINES = [
  { id: 'npc-1', text: 'The bed was so soft I slept twelve hours.' },
  { id: 'npc-2', text: 'Best breakfast I have had in years.' },
  { id: 'npc-3', text: 'The view from the deluxe room is unreal.' },
  { id: 'npc-4', text: 'The concierge got us tickets in minutes.' },
  { id: 'npc-5', text: 'We are booking the villa again next year.' },
  { id: 'npc-6', text: 'The rooftop pool at sunset, wow.' },
  { id: 'npc-7', text: 'My kids loved the dorm, I loved the spa.' },
  { id: 'npc-8', text: 'The butler even remembered my name.' },
  { id: 'npc-9', text: 'Quietest hotel I have ever stayed in.' },
  { id: 'npc-10', text: 'The honeymoon suite was pure magic.' },
  { id: 'npc-11', text: 'I worked from the business room all week.' },
  { id: 'npc-12', text: 'The garden smells like jasmine at night.' },
  { id: 'npc-13', text: 'We came for one night and stayed four.' },
  { id: 'npc-14', text: 'The restaurant deserves a star of its own.' },
  { id: 'npc-15', text: 'Check-in took two minutes, tops.' },
  { id: 'npc-16', text: 'I am telling everyone about this place.' },
];

export const HOTEL_GUIDE = [
  { id: 'guide-1', text: 'Step 1: Open a room type from the list.' },
  { id: 'guide-2', text: 'Step 2: Pay the opening cost from your cash.' },
  { id: 'guide-3', text: 'Step 3: Check a guest in to start the stay.' },
  { id: 'guide-4', text: 'Step 4: Wait for the stay timer to finish.' },
  { id: 'guide-5', text: 'Step 5: Collect the room revenue from the till.' },
  { id: 'guide-6', text: 'Step 6: Host a conference to boost the next stay.' },
  { id: 'guide-7', text: 'Step 7: Spend earnings on hotel upgrades.' },
  { id: 'guide-8', text: 'Step 8: Hire receptionists and chefs for the floor.' },
  { id: 'guide-9', text: 'Step 9: Level up rooms to raise their value.' },
  { id: 'guide-10', text: 'Step 10: Watch market events for hot rooms.' },
  { id: 'guide-11', text: 'Step 11: Claim challenges as you hit each goal.' },
  { id: 'guide-12', text: 'Step 12: Donate free rooms for reputation.' },
  { id: 'guide-13', text: 'Step 13: Check the price board before selling.' },
  { id: 'guide-14', text: 'Step 14: Keep check-ins running to grow your streak.' },
  { id: 'guide-15', text: 'Step 15: Trade in bulk when the market is hot.' },
  { id: 'guide-16', text: 'Step 16: Become a Five-Star Legend.' },
];

export const HOTEL_META = { system: 'hotel', version: '7-B4', author: 'builder-4', mechanic: 'venue', dataCount: 10, dataName: 'ROOM_TYPES' };

const condOf = (w) => typeof w === 'string' ? w : (w && w.condition ? w.condition : 'clear');
const skyOf = (table, w) => (table[condOf(w)] === undefined ? 1 : table[condOf(w)]);
const dec1 = (n) => Math.round(n * 10) / 10;

export function hotelRankFor(xp) {
  let lvl = 0;
  HOTEL_RANKS.forEach((r) => { if (xp >= r.xp) lvl = r.level; });
  return lvl;
}

export function hotelItemById(id) {
  const found = ROOM_TYPES.find((i) => i.id === id);
  return found === undefined ? null : found;
}

export function hotelPriceFor(id, drift, rank, upgrades) {
  const item = hotelItemById(id);
  if (!item) return 0;
  const base = item.price * (1 + (drift || 0)) * (1 + (rank || 0) * 0.05);
  const geared = upgrades && upgrades.length >= 3 ? base * 1.1 : base;
  const rounded = dec1(geared);
  return rounded < 1 ? 1 : rounded;
}

export function hotelCapacityFor(rank, upgrades) {
  const extra = upgrades && upgrades.includes('grand-lobby') ? 2 : 0;
  return 3 + (rank || 0) + extra;
}

export function hotelPayoutFor(item, rank, upgrades, weather, boosted) {
  if (!item) return 0;
  const mult = (0.6 + (rank || 0) * 0.1 + (boosted ? 0.3 : 0)) * skyOf({ rain: 1.1, sunny: 1.05, storm: 0.7 }, weather) * (upgrades && upgrades.length >= 4 ? 1.15 : 1);
  const payout = Math.round(item.price * mult);
  return payout < 5 ? 5 : payout;
}

export function hotelCrowdFor(item, rank, weather) {
  const base = 10 + (item ? item.difficulty : 0) * 8 + (rank || 0) * 5;
  const crowd = Math.round(base * skyOf({ rain: 1.1, sunny: 1.05, storm: 0.5 }, weather));
  return crowd < 1 ? 1 : crowd;
}

export function hotelUpgradeById(id) {
  const found = HOTEL_UPGRADES.find((u) => u.id === id);
  return found === undefined ? null : found;
}

export function hotelStaffById(id) {
  const found = HOTEL_STAFF.find((s) => s.id === id);
  return found === undefined ? null : found;
}

export function hotelEventById(id) {
  const daily = HOTEL_DAILY_EVENTS.find((e) => e.id === id);
  if (daily !== undefined) return daily;
  const market = HOTEL_MARKET_EVENTS.find((e) => e.id === id);
  return market === undefined ? null : market;
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
  return step >= 0 && step < HOTEL_GUIDE.length ? HOTEL_GUIDE[step] : null;
}

export function hotelSeasonMult(seasonId) {
  const s = HOTEL_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function hotelMarketEventMult(eventId, itemId) {
  if (!eventId) return 1;
  const e = HOTEL_MARKET_EVENTS.find((x) => x.id === eventId);
  return e && e.item === itemId ? e.mult : 1;
}

export function hotelWeeklyGoal(state) {
  const runs = { have: state.runsDone, goal: 5, done: state.runsDone >= 5 };
  const earned = { have: state.earned, goal: 500, done: state.earned >= 500 };
  const visitors = { have: state.visitors, goal: 100, done: state.visitors >= 100 };
  return { runs, earned, visitors, allDone: runs.done && earned.done && visitors.done };
}

export function hotelEfficiency(state) {
  const total = state.runsDone + state.failures;
  return total === 0 ? 100 : Math.round((state.runsDone / total) * 100);
}

export function hotelProfitPerRun(state) {
  return state.runsDone === 0 ? 0 : dec1(state.earned / state.runsDone);
}

export function hotelInventoryValue(state) {
  return dec1(Object.keys(state.owned).reduce((sum, id) => {
    const item = hotelItemById(id);
    return item ? sum + item.price * (state.levels[id] || 1) : sum;
  }, 0));
}

export function hotelSummary(state) {
  return 'Hotel at rank ' + hotelRankNameFor(state.rank) + ': ' + state.runsDone + ' runs, ' + state.itemsOwned + ' entries, $' + state.earned + ' earned, ' + state.visitors + ' visitors.';
}

export function hotelNextGoal(state) {
  if (state.itemsOwned === 0) return 'Open your first entry.';
  if (state.runsDone < 5) return 'Finish 5 runs.';
  if (state.earned < 500) return 'Earn $500 in total.';
  if (state.rank < 2) return 'Reach rank ' + hotelRankNameFor(2) + '.';
  if (state.upgradesOwned < 4) return 'Own 4 upgrades.';
  return 'Become a legend of the Hotel.';
}

export function hotelRecordFor(id, state) {
  const rec = HOTEL_RECORDS.find((r) => r.id === id);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, stat: rec.stat, unit: rec.unit, desc: rec.desc, value: state[rec.stat] === undefined ? 0 : state[rec.stat] };
}

export function hotelAllRecords(state) {
  return HOTEL_RECORDS.map((r) => hotelRecordFor(r.id, state));
}

export function hotelLeaderboardWith(score) {
  const board = HOTEL_LEADERBOARD.map((e) => (e.name === 'You' ? { name: e.name, score, desc: e.desc } : { name: e.name, score: e.score, desc: e.desc }));
  board.sort((a, b) => b.score - a.score);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, score: e.score, desc: e.desc }));
}

export function hotelSeasonReport(state, seasonId) {
  const mult = hotelSeasonMult(seasonId);
  return ROOM_TYPES.map((it) => ({
    id: it.id,
    name: it.name,
    basePrice: it.price,
    seasonPrice: dec1(it.price * mult),
    owned: !!state.owned[it.id],
    level: state.levels[it.id] || 0,
  }));
}

export function hotelChallengeProgress(challenge, state) {
  const have = Math.floor(state[challenge.target] || 0);
  return { id: challenge.id, name: challenge.name, have, goal: challenge.goal, done: have >= challenge.goal, xp: challenge.xp };
}

export function hotelBestEntryFor(rank) {
  const pool = ROOM_TYPES.filter((it) => it.difficulty <= rank + 2);
  if (pool.length === 0) return null;
  return pool.reduce((best, it) => {
    const score = (it.price * (1 + it.rarity * 2)) / it.difficulty;
    const bestScore = (best.price * (1 + best.rarity * 2)) / best.difficulty;
    return score > bestScore ? it : best;
  });
}

export function hotelEventFor(day) {
  return HOTEL_MARKET_EVENTS[day % HOTEL_MARKET_EVENTS.length];
}

export function hotelDailyEventFor(day) {
  return HOTEL_DAILY_EVENTS[day % HOTEL_DAILY_EVENTS.length];
}

export function hotelRankNameFor(level) {
  const r = HOTEL_RANKS.find((x) => x.level === level);
  return r ? r.name : 'Unknown';
}

export function hotelTotalValue(state) {
  return dec1(hotelInventoryValue(state) + state.pending + state.earned);
}

export function hotelProgressPercent(state) {
  const total = state.runsDone + state.failures;
  return total === 0 ? 0 : Math.round((state.runsDone / total) * 100);
}

export function hotelStaffBonusFor(staffIds, skill) {
  return staffIds.reduce((total, id) => {
    const s = hotelStaffById(id);
    return s && s.skill === skill ? total + s.bonus : total;
  }, 0);
}

export function hotelCheapestEntry() {
  return ROOM_TYPES.reduce((a, b) => (b.price < a.price ? b : a));
}

export function hotelPriciestEntry() {
  return ROOM_TYPES.reduce((a, b) => (b.price > a.price ? b : a));
}

export function hotelEntriesByDifficulty(difficulty) {
  return ROOM_TYPES.filter((it) => it.difficulty === difficulty).map((it) => it.id);
}

export function hotelEntriesByRarity(maxRarity) {
  return ROOM_TYPES.filter((it) => it.rarity <= maxRarity).map((it) => it.id);
}

export function hotelGradeFor(runsDone, earned, visitors) {
  const score = runsDone * 10 + Math.round(earned / 10) + Math.floor(visitors / 10);
  return score >= 500 ? 'S' : score >= 300 ? 'A' : score >= 150 ? 'B' : score >= 50 ? 'C' : 'D';
}

export function createHotelSystem(ctx) {
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
  ROOM_TYPES.forEach((it) => {
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
    const lvl = hotelRankFor(state.xp);
    if (lvl > state.rank) {
      state.rank = lvl;
      log('Rank up! You are now ' + hotelRankNameFor(lvl) + '.');
    }
  }

  function openRoom(id) {
    const item = hotelItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (state.owned[id]) return { ok: false, reason: 'already-owned', id };
    const cap = hotelCapacityFor(state.rank, state.upgrades);
    if (state.itemsOwned >= cap) return { ok: false, reason: 'capacity-full', cap };
    const need = Math.max(0, item.difficulty - 2);
    if (state.rank < need) return { ok: false, reason: 'rank-too-low', rank: need };
    const cost = hotelPriceFor(id, state.drift[id] || 0, 0, []);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned[id] = 1;
    state.levels[id] = 1;
    state.itemsOwned += 1;
    gainXp(10);
    log('Opened room ' + item.name + ' for $' + cost + '.');
    return { ok: true, id, cost, name: item.name };
  }

  function checkInGuest(id) {
    const item = hotelItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (state.active) return { ok: false, reason: 'already-running', active: state.activeId };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    state.active = 'run';
    state.activeId = id;
    state.activeTimer = 30 + item.difficulty * 10;
    state.activeBase = item.price;
    log('Guest checked in to ' + item.name + '.');
    return { ok: true, id, seconds: state.activeTimer };
  }

  function settleRun() {
    const item = hotelItemById(state.activeId);
    const doneId = state.activeId;
    const sky = getWeather();
    const payout = hotelPayoutFor(item, state.rank, state.upgrades, sky, !!state.boosted[doneId]);
    const crowd = hotelCrowdFor(item, state.rank, sky);
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
    log('Stay at ' + (item ? item.name : doneId) + ' welcomed ' + crowd + ' guests and earned $' + payout + '.');
  }

  function collectRoomRevenue() {
    if (state.pending <= 0) return { ok: false, reason: 'nothing-pending' };
    const amount = state.pending;
    state.pending = 0;
    state.earned += amount;
    addCash(amount);
    log('Collected $' + amount + ' in room revenue.');
    return { ok: true, amount };
  }

  function sellUpgrade(id) {
    const item = hotelItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    const refund = Math.round(item.price * 0.5);
    delete state.owned[id];
    delete state.levels[id];
    state.itemsOwned -= 1;
    state.earned += refund;
    addCash(refund);
    gainXp(5);
    log('Sold the upgrade stock of ' + item.name + ' for $' + refund + '.');
    return { ok: true, total: refund, qty: 1 };
  }

  function hostConference(id) {
    const item = hotelItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    if (getCash() < 40) return { ok: false, reason: 'not-enough-cash', cost: 40 };
    addCash(-40);
    state.spent += 40;
    state.boosted[id] = true;
    state.reputation += 1;
    gainXp(10);
    log('Hosted a conference for ' + item.name + '.');
    return { ok: true, id, boosted: true };
  }

  function buyUpgrade(id) {
    const up = hotelUpgradeById(id);
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
    const s = hotelStaffById(id);
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
    const item = hotelItemById(id);
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
    return ROOM_TYPES.map((it) => ({
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
    return ROOM_TYPES.map((it) => ({
      id: it.id, name: it.name, price: it.price, difficulty: it.difficulty, rarity: it.rarity, desc: it.desc, owned: !!state.owned[it.id],
    }));
  }

  function info(id) {
    const item = hotelItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    return { ok: true, item, owned: !!state.owned[id], level: state.levels[id] || 0, price: state.prices[id], holdings: state.holdings[id] || 0 };
  }

  function dailyEvent() {
    if (HOTEL_DAILY_EVENTS.length === 0) return { event: 'none', name: '', effect: '', amount: 0 };
    const ev = HOTEL_DAILY_EVENTS[Math.floor(rng() * HOTEL_DAILY_EVENTS.length)];
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
    ROOM_TYPES.forEach((it) => {
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
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    Object.keys(saved).forEach((k) => { state[k] = saved[k]; });
    if (!state.drift || typeof state.drift !== 'object') state.drift = {};
    if (!state.prices || typeof state.prices !== 'object') state.prices = {};
    if (!state.holdings || typeof state.holdings !== 'object') state.holdings = {};
    ROOM_TYPES.forEach((it) => {
      if (state.drift[it.id] === undefined) state.drift[it.id] = 0;
      if (state.prices[it.id] === undefined) state.prices[it.id] = it.price;
      if (state.holdings[it.id] === undefined) state.holdings[it.id] = 0;
    });
    if (!state.owned || typeof state.owned !== 'object') state.owned = {};
    if (!state.levels || typeof state.levels !== 'object') state.levels = {};
    if (!state.boosted || typeof state.boosted !== 'object') state.boosted = {};
    state.rank = hotelRankFor(state.xp);
  }

  function stats() {
    const holdingsCount = Object.keys(state.holdings).reduce((sum, k) => sum + (state.holdings[k] || 0), 0);
    return {
      name: 'Hotel',
      mechanic: 'venue',
      rank: hotelRankNameFor(state.rank),
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
    if (state.active) return 'Hotel: running ' + state.activeId + ' - ' + Math.ceil(state.activeTimer) + 's left';
    if (state.pending > 0) return 'Hotel: $' + state.pending + ' waiting in the till';
    if (state.itemsOwned > 0) return 'Hotel: ' + state.itemsOwned + ' entries, $' + state.earned + ' earned';
    return '';
  }

  function interact(action, a, b) {
    if (!action || action === 'status') {
      return { ok: true, stats: stats(), hint: 'open a room to ready it, run a room to check guests in, collect to claim revenue' };
    }
    if (action === 'open') return openRoom(a);
    if (action === 'run') return checkInGuest(a);
    if (action === 'collect') return collectRoomRevenue();
    if (action === 'sell') return sellUpgrade(a, b);
    if (action === 'upgrade' || action === 'levelup') return upgradeItem(a);
    if (action === 'hire') return hireStaff(a);
    if (action === 'fire') return fireStaff(a);
    if (action === 'special') return hostConference(a);
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
    upgrade: upgradeItem,
    hire: hireStaff,
  };
}

export function createHotelExtras(system) {
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  function challenges() {
    return HOTEL_CHALLENGES.map((ch) => hotelChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = HOTEL_CHALLENGES.find((c) => c.id === id);
    if (!ch) return { ok: false, reason: 'unknown-challenge', id };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed', id };
    const prog = hotelChallengeProgress(ch, system.state);
    if (!prog.done) return { ok: false, reason: 'not-done', id, have: prog.have, goal: prog.goal };
    claimed.push(id);
    system.state.challengesClaimed.push(id);
    system.gainXp(ch.xp);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return HOTEL_ACHIEVEMENTS.map((a) => {
      const have = Math.floor(system.state[a.target] || 0);
      return { id: a.id, name: a.name, desc: a.desc, target: a.target, goal: a.goal, have, done: have >= a.goal };
    });
  }

  function hireHelper(id) {
    const s = hotelStaffById(id);
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
    const due = helpers.reduce((sum, hid) => {
      const s = hotelStaffById(hid);
      return s ? sum + s.wage : sum;
    }, 0);
    wagesPaid += due;
    system.state.wagesPaid += due;
    return { due, helpers: helpers.length, totalPaid: wagesPaid };
  }

  function helperBonus(skill) {
    return helpers.reduce((total, hid) => {
      const s = hotelStaffById(hid);
      return s && s.skill === skill ? total + s.bonus : total;
    }, 0);
  }

  function donate(amount) {
    if (!amount || amount <= 0) return { ok: false, reason: 'bad-amount', amount };
    system.state.donations += amount;
    const rep = Math.floor(amount / 100);
    system.state.reputation += rep;
    return { ok: true, amount, reputation: rep };
  }

  function quickBoost(id) {
    if (!hotelItemById(id)) return { ok: false, reason: 'unknown-item', id };
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
      id: s.id, name: s.name, wage: s.wage, skill: s.skill, hired: helpers.includes(s.id) || system.state.staff.includes(s.id),
    }));
  }

  function upgradeCatalog() {
    return HOTEL_UPGRADES.map((u) => ({
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

export function createHotelMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  function setEvent(id) {
    const found = HOTEL_MARKET_EVENTS.find((e) => e.id === id);
    if (!found) return { ok: false, reason: 'unknown-event', id };
    currentEvent = id;
    return { ok: true, event: id };
  }

  function setSeason(id) {
    const found = HOTEL_SEASONS.find((x) => x.id === id);
    if (!found) return { ok: false, reason: 'unknown-season', id };
    currentSeason = id;
    return { ok: true, season: id };
  }

  function eventPrice(itemId, basePrice) {
    return Math.round(basePrice * hotelMarketEventMult(currentEvent, itemId) * hotelSeasonMult(currentSeason) * 10) / 10;
  }

  function bulkDeal(itemId, qty) {
    const item = hotelItemById(itemId);
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
    return ROOM_TYPES
      .filter((it) => hotelMarketEventMult(currentEvent, it.id) !== 1)
      .map((it) => ({ item: it.id, name: it.name, mult: hotelMarketEventMult(currentEvent, it.id), event: currentEvent }));
  }

  function marketSummary() {
    return { event: currentEvent, season: currentSeason, dealsClaimed, bulkTraded, deals: dailyDeals() };
  }

  function seasonPrices() {
    return ROOM_TYPES.map((it) => ({ id: it.id, name: it.name, price: eventPrice(it.id, it.price) }));
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
