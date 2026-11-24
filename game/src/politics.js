export const CAMPAIGN_EVENTS = [
  { id: 'town-hall', name: 'Town Hall', price: 100, rarity: 0.25, difficulty: 1, district: 'Old Town', crowd: 40, impact: 3, desc: 'A packed hall, hard questions, honest answers.' },
  { id: 'door-knock', name: 'Door Knock', price: 80, rarity: 0.2, difficulty: 1, district: 'Riverside', crowd: 30, impact: 2, desc: 'Knocking on doors, one voter at a time.' },
  { id: 'park-rally', name: 'Park Rally', price: 180, rarity: 0.45, difficulty: 2, district: 'Green Park', crowd: 60, impact: 5, desc: 'Banners, balloons and a thousand cheering supporters.' },
  { id: 'market-stall', name: 'Market Stall', price: 140, rarity: 0.35, difficulty: 2, district: 'Central Market', crowd: 50, impact: 4, desc: 'Leaflets and lemonade at the Saturday market.' },
  { id: 'school-visit', name: 'School Visit', price: 160, rarity: 0.4, difficulty: 2, district: 'North Side', crowd: 55, impact: 4, desc: 'Talking to students about their future.' },
  { id: 'debate-night', name: 'Debate Night', price: 260, rarity: 0.6, difficulty: 3, district: 'City Hall', crowd: 80, impact: 7, desc: 'Two podiums, one stage, no hiding.' },
  { id: 'street-festival', name: 'Street Festival', price: 220, rarity: 0.5, difficulty: 2, district: 'Old Town', crowd: 70, impact: 6, desc: 'Music, food and a float with your face on it.' },
  { id: 'factory-tour', name: 'Factory Tour', price: 200, rarity: 0.5, difficulty: 2, district: 'Industrial', crowd: 45, impact: 5, desc: 'Hard hats and honest talk about jobs.' },
  { id: 'charity-gala', name: 'Charity Gala', price: 320, rarity: 0.7, difficulty: 3, district: 'Uptown', crowd: 90, impact: 8, desc: 'Black tie, big cheques and bigger promises.' },
  { id: 'victory-parade', name: 'Victory Parade', price: 500, rarity: 0.9, difficulty: 5, district: 'City Hall', crowd: 120, impact: 10, desc: 'Confetti, marching bands and the whole city.' },
];

export const POLITICS_UPGRADES = [
  { id: 'megaphone', name: 'Megaphone', cost: 90, effect: 'crowd +10%', desc: 'Your voice, heard three streets away.' },
  { id: 'headquarters', name: 'Headquarters', cost: 320, effect: 'capacity +2', desc: 'A real office for two more events.' },
  { id: 'posters', name: 'Posters', cost: 120, effect: 'visitors +10%', desc: 'Your face on every lamppost.' },
  { id: 'campaign-bus', name: 'Campaign Bus', cost: 280, effect: 'crowd +15%', desc: 'A bus that brings the rally to them.' },
  { id: 'social-team', name: 'Social Team', cost: 200, effect: 'payout +12%', desc: 'Clips and posts that spread overnight.' },
  { id: 'pollsters', name: 'Pollsters', cost: 160, effect: 'rep +2', desc: 'Knows what the city thinks, daily.' },
  { id: 'volunteer-hub', name: 'Volunteer Hub', cost: 180, effect: 'earned +5%', desc: 'A home base for every helper.' },
  { id: 'debate-coach', name: 'Debate Coach', cost: 240, effect: 'payout +10%', desc: 'Turns tough questions into applause.' },
];

export const POLITICS_RANKS = [
  { level: 0, name: 'Volunteer', xp: 0, perk: 'Stuffing envelopes, dreaming big.' },
  { level: 1, name: 'Canvasser', xp: 150, perk: 'Every door knows your knock.' },
  { level: 2, name: 'Campaigner', xp: 400, perk: 'The city starts to listen.' },
  { level: 3, name: 'Frontrunner', xp: 800, perk: 'The polls put you ahead.' },
  { level: 4, name: 'Mayor-in-Waiting', xp: 1500, perk: 'The keys to the city are close.' },
];

export const POLITICS_STAFF = [
  { id: 'canvasser-ana', name: 'Ana the Canvasser', wage: 40, skill: 'canvass', bonus: 2, desc: 'Knocks a hundred doors before lunch.' },
  { id: 'organizer-ben', name: 'Ben the Organizer', wage: 50, skill: 'organize', bonus: 2, desc: 'Rallies run on his clipboards.' },
  { id: 'speechwriter-clio', name: 'Clio the Speechwriter', wage: 60, skill: 'speech', bonus: 3, desc: 'Writes lines the crowd repeats for days.' },
  { id: 'driver-dan', name: 'Dan the Driver', wage: 45, skill: 'drive', bonus: 2, desc: 'Knows every shortcut in the city.' },
];

export const POLITICS_DAILY_EVENTS = [
  { id: 'opponent-attack', name: 'Opponent Attack', effect: 'rep', amount: -1, text: 'The opponent calls you inexperienced on live TV.' },
  { id: 'scandal-rumor', name: 'Scandal Rumor', effect: 'heat', amount: 2, text: 'A rumour swirls; the press camp outside.' },
  { id: 'debate-gaffe', name: 'Debate Gaffe', effect: 'heat', amount: 1, text: 'A slip of the tongue becomes the headline.' },
  { id: 'big-donation', name: 'Big Donation', effect: 'earn', amount: 100, text: 'A local business writes a generous cheque.' },
  { id: 'volunteer-surge', name: 'Volunteer Surge', effect: 'visitors', amount: 25, text: 'Students sign up in droves to help.' },
  { id: 'press-praise', name: 'Press Praise', effect: 'rep', amount: 3, text: 'The paper calls your plan the best in years.' },
  { id: 'town-fair', name: 'Town Fair', effect: 'visitors', amount: 20, text: 'The fair crowd stops by your stall.' },
  { id: 'office-leak', name: 'Office Leak', effect: 'cost', amount: 40, text: 'A leak floods the office; repairs cost money.' },
  { id: 'endorsement', name: 'Endorsement', effect: 'xp', amount: 25, text: 'A beloved former mayor backs your campaign.' },
  { id: 'quiet-canvass', name: 'Quiet Canvass', effect: 'earn', amount: 40, text: 'A slow day, but the donations trickle in.' },
];

export const POLITICS_TIPS = [
  { id: 'tip-sun', name: 'Sunny Days', text: 'Sunny days bring the biggest rally crowds.' },
  { id: 'tip-hq', name: 'Headquarters', text: 'Buy the Headquarters to plan two more events.' },
  { id: 'tip-canvass', name: 'Canvass Often', text: 'Canvassing wins volunteers and support.' },
  { id: 'tip-streak', name: 'Keep Rallying', text: 'Back-to-back rallies grow your streak fast.' },
  { id: 'tip-prices', name: 'Price Watch', text: 'Event costs drift every day, so check the board.' },
  { id: 'tip-staff', name: 'Good Canvassers', text: 'A great canvasser turns one door into ten votes.' },
  { id: 'tip-donate', name: 'Give Back', text: 'Community donations build reputation.' },
  { id: 'tip-rank', name: 'Climb Up', text: 'Every rally pushes you toward Canvasser.' },
];

export const POLITICS_CHALLENGES = [
  { id: 'ch-runs-5', name: 'Five Rallies', target: 'runsDone', goal: 5, xp: 50, desc: 'Hold 5 rallies.' },
  { id: 'ch-earn-500', name: 'First 500', target: 'earned', goal: 500, xp: 80, desc: 'Earn $500 in total.' },
  { id: 'ch-visitors-200', name: 'Big Crowd', target: 'visitors', goal: 200, xp: 60, desc: 'Welcome 200 visitors.' },
  { id: 'ch-items-4', name: 'Four Events', target: 'itemsOwned', goal: 4, xp: 70, desc: 'Plan 4 events.' },
  { id: 'ch-upgrades-3', name: 'Well Equipped', target: 'upgradesOwned', goal: 3, xp: 60, desc: 'Own 3 upgrades.' },
  { id: 'ch-rep-10', name: 'Respected', target: 'reputation', goal: 10, xp: 50, desc: 'Reach 10 reputation.' },
  { id: 'ch-streak-3', name: 'On a Roll', target: 'streak', goal: 3, xp: 90, desc: 'Reach a 3-rally streak.' },
  { id: 'ch-best-300', name: 'Big Rally', target: 'bestRun', goal: 300, xp: 100, desc: 'Earn $300 from a single rally.' },
];

export const POLITICS_ACHIEVEMENTS = [
  { id: 'ach-runs-10', name: 'Rally Master', target: 'runsDone', goal: 10, desc: 'Hold 10 rallies.' },
  { id: 'ach-earn-1000', name: 'Golden War Chest', target: 'earned', goal: 1000, desc: 'Earn $1,000 in total.' },
  { id: 'ach-visitors-500', name: 'City Favourite', target: 'visitors', goal: 500, desc: 'Welcome 500 visitors.' },
  { id: 'ach-items-6', name: 'Full Calendar', target: 'itemsOwned', goal: 6, desc: 'Plan 6 events.' },
  { id: 'ach-upgrades-5', name: 'Fully Loaded', target: 'upgradesOwned', goal: 5, desc: 'Own 5 upgrades.' },
  { id: 'ach-rep-20', name: 'Beloved', target: 'reputation', goal: 20, desc: 'Reach 20 reputation.' },
  { id: 'ach-streak-5', name: 'Unstoppable', target: 'streak', goal: 5, desc: 'Reach a 5-rally streak.' },
  { id: 'ach-best-500', name: 'Record Rally', target: 'bestRun', goal: 500, desc: 'Earn $500 from a single rally.' },
];

export const POLITICS_LEADERBOARD = [
  { name: 'Mayor Marta', score: 1300, desc: 'The incumbent, unbeatable so far.' },
  { name: 'Councillor Cole', score: 900, desc: 'A smooth talker with deep pockets.' },
  { name: 'Activist Aya', score: 660, desc: 'A grassroots star on the rise.' },
  { name: 'Newcomer Ned', score: 240, desc: 'Fresh face, big posters.' },
  { name: 'You', score: 0, desc: 'The new name on the board.' },
];

export const POLITICS_RECORDS = [
  { id: 'rec-runs', name: 'Most Rallies', stat: 'runsDone', unit: 'rallies', desc: 'Total rallies held.' },
  { id: 'rec-earned', name: 'Top Earnings', stat: 'earned', unit: '$', desc: 'Total money earned.' },
  { id: 'rec-visitors', name: 'Biggest Crowd', stat: 'visitors', unit: 'supporters', desc: 'Total visitors welcomed.' },
  { id: 'rec-best', name: 'Best Rally', stat: 'bestRun', unit: '$', desc: 'Best single-rally donations.' },
  { id: 'rec-streak', name: 'Longest Streak', stat: 'bestStreak', unit: 'rallies', desc: 'Longest run of rallies.' },
];

export const POLITICS_MARKET_EVENTS = [
  { id: 'me-hall', name: 'Hall Hype', item: 'town-hall', mult: 1.35, desc: 'Town halls are the talk of the town.' },
  { id: 'me-door', name: 'Door Dip', item: 'door-knock', mult: 0.7, desc: 'Door knocking cools off.' },
  { id: 'me-park', name: 'Park Surge', item: 'park-rally', mult: 1.35, desc: 'Park rallies draw the biggest crowds.' },
  { id: 'me-market', name: 'Market Lull', item: 'market-stall', mult: 0.7, desc: 'The market stall is quiet.' },
  { id: 'me-school', name: 'School Buzz', item: 'school-visit', mult: 1.35, desc: 'Students are talking about the visit.' },
  { id: 'me-debate', name: 'Debate Dip', item: 'debate-night', mult: 0.7, desc: 'Debate fever cools down.' },
  { id: 'me-fest', name: 'Festival Boom', item: 'street-festival', mult: 1.35, desc: 'The festival float is a hit.' },
  { id: 'me-factory', name: 'Factory Fade', item: 'factory-tour', mult: 0.7, desc: 'Factory tours pause this week.' },
  { id: 'me-gala', name: 'Gala Glow', item: 'charity-gala', mult: 1.35, desc: 'The gala made the front page.' },
  { id: 'me-parade', name: 'Parade Pause', item: 'victory-parade', mult: 0.7, desc: 'The parade waits for election day.' },
];

export const POLITICS_SEASONS = [
  { id: 'summer', name: 'Summer', mult: 1.1, desc: 'Long days, outdoor rallies.' },
  { id: 'autumn', name: 'Autumn', mult: 1.0, desc: 'Campaign season in full swing.' },
  { id: 'winter', name: 'Winter', mult: 0.9, desc: 'Cold halls, smaller crowds.' },
  { id: 'spring', name: 'Spring', mult: 1.05, desc: 'Fresh energy for the campaign.' },
];

export const POLITICS_FACTS = [
  { id: 'fact-hall', text: 'The Town Hall has hosted debates since 1890.' },
  { id: 'fact-door', text: 'Door knocking wins more votes than any advert.' },
  { id: 'fact-park', text: 'The Park Rally once drew 5,000 people.' },
  { id: 'fact-market', text: 'The Market Stall hands out 2,000 leaflets a week.' },
  { id: 'fact-school', text: 'School Visit students voted on a mock election.' },
  { id: 'fact-debate', text: 'Debate Night answers are timed to the second.' },
  { id: 'fact-fest', text: 'The Street Festival float took a month to build.' },
  { id: 'fact-factory', text: 'The Factory Tour employs 300 local workers.' },
  { id: 'fact-gala', text: 'The Charity Gala raised $50,000 last year.' },
  { id: 'fact-parade', text: 'The Victory Parade route is two miles long.' },
  { id: 'fact-1', text: 'A canvasser is someone who knocks on doors for votes.' },
  { id: 'fact-2', text: 'Polls measure what voters think, not what they do.' },
  { id: 'fact-3', text: 'The first town halls were built for public debate.' },
  { id: 'fact-4', text: 'A rally is a big public meeting to win support.' },
  { id: 'fact-5', text: 'Volunteers power most local campaigns.' },
  { id: 'fact-6', text: 'A gaffe is a small mistake that becomes big news.' },
  { id: 'fact-7', text: 'Endorsements from trusted people move votes.' },
  { id: 'fact-8', text: 'Debates have decided elections for centuries.' },
  { id: 'fact-9', text: 'The mayor is the head of the city government.' },
  { id: 'fact-10', text: 'Support drifts back to the middle over time.' },
];

export const POLITICS_NPC_LINES = [
  { id: 'npc-1', text: 'That town hall speech gave me goosebumps.' },
  { id: 'npc-2', text: 'A volunteer knocked on my door yesterday.' },
  { id: 'npc-3', text: 'The park rally was the biggest I have seen.' },
  { id: 'npc-4', text: 'I am voting for the one who listens.' },
  { id: 'npc-5', text: 'The debate last night was electric.' },
  { id: 'npc-6', text: 'That gala raised so much for the shelter.' },
  { id: 'npc-7', text: 'The posters are everywhere now.' },
  { id: 'npc-8', text: 'My kids loved the street festival float.' },
  { id: 'npc-9', text: 'The factory tour changed my mind.' },
  { id: 'npc-10', text: 'I have never seen so many volunteers.' },
  { id: 'npc-11', text: 'The school visit inspired my daughter.' },
  { id: 'npc-12', text: 'That speechwriter deserves a raise.' },
  { id: 'npc-13', text: 'The parade is going to be huge.' },
  { id: 'npc-14', text: 'I donated because the plan makes sense.' },
  { id: 'npc-15', text: 'The bus came to our street last week.' },
  { id: 'npc-16', text: 'See you at the next rally!' },
];

export const POLITICS_GUIDE = [
  { id: 'guide-1', text: 'Step 1: Plan a campaign event from the list.' },
  { id: 'guide-2', text: 'Step 2: Pay the planning cost from your cash.' },
  { id: 'guide-3', text: 'Step 3: Hold the rally to start the event.' },
  { id: 'guide-4', text: 'Step 4: Wait for the rally timer to finish.' },
  { id: 'guide-5', text: 'Step 5: Collect the donations from the till.' },
  { id: 'guide-6', text: 'Step 6: Canvass a district to win volunteers.' },
  { id: 'guide-7', text: 'Step 7: Spend earnings on campaign upgrades.' },
  { id: 'guide-8', text: 'Step 8: Hire canvassers and organizers.' },
  { id: 'guide-9', text: 'Step 9: Level up events to raise their value.' },
  { id: 'guide-10', text: 'Step 10: Watch market events for hot events.' },
  { id: 'guide-11', text: 'Step 11: Claim challenges as you hit each goal.' },
  { id: 'guide-12', text: 'Step 12: Donate to the community for reputation.' },
  { id: 'guide-13', text: 'Step 13: Check the price board before selling.' },
  { id: 'guide-14', text: 'Step 14: Keep rallying to grow your streak.' },
  { id: 'guide-15', text: 'Step 15: Trade in bulk when the market is hot.' },
  { id: 'guide-16', text: 'Step 16: Become Mayor-in-Waiting.' },
];

export const POLITICS_META = { system: 'politics', version: '7-B4', author: 'builder-4', mechanic: 'politics', dataCount: 10, dataName: 'CAMPAIGN_EVENTS' };

export function createPoliticsSystem(ctx) {
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
  CAMPAIGN_EVENTS.forEach((it) => {
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

  const gainXp = (n) => {
    state.xp += n;
    const lvl = politicsRankFor(state.xp);
    if (lvl > state.rank) {
      state.rank = lvl;
      log('Rank up! You are now ' + politicsRankNameFor(lvl) + '.');
    }
  };

  const planEvent = (id) => {
    const item = politicsItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (state.owned[id]) return { ok: false, reason: 'already-owned', id };
    const cap = politicsCapacityFor(state.rank, state.upgrades);
    if (state.itemsOwned >= cap) return { ok: false, reason: 'capacity-full', cap };
    const need = Math.max(0, item.difficulty - 2);
    if (state.rank < need) return { ok: false, reason: 'rank-too-low', rank: need };
    const cost = politicsPriceFor(id, state.drift[id] || 0, 0, []);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned[id] = 1;
    state.levels[id] = 1;
    state.itemsOwned += 1;
    gainXp(10);
    log('Planned event ' + item.name + ' for $' + cost + '.');
    return { ok: true, id, cost, name: item.name };
  };

  const holdRally = (id) => {
    const item = politicsItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (state.active) return { ok: false, reason: 'already-running', active: state.activeId };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    const cost = Math.round(item.price * 0.5);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.active = 'rally';
    state.activeId = id;
    state.activeTimer = 20;
    state.activeBase = cost;
    log('Rally started for ' + item.name + '.');
    return { ok: true, id, cost, seconds: 20 };
  };

  const settleRun = () => {
    const item = politicsItemById(state.activeId);
    const doneId = state.activeId;
    const diff = item ? item.difficulty : 0;
    const basePrice = item ? item.price : 0;
    state.active = null;
    state.activeId = null;
    state.activeTimer = 0;
    state.support = Math.min(100, state.support + 2 + diff);
    state.polls = state.support;
    const donations = Math.round(basePrice * 0.3 + state.volunteers * 5 + rng() * 50);
    state.donations += donations;
    state.pending += donations;
    state.dailyEarned += donations;
    state.runsDone += 1;
    state.visitors += Math.round(basePrice / 10);
    if (donations > state.bestRun) {
      state.bestRun = donations;
      state.bestRunName = item ? item.name : doneId;
    }
    state.streak += 1;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    state.boosted[doneId] = false;
    gainXp(20);
    if (rng() < 0.15) {
      state.heat += 1;
      addHeat(1);
      log('A heckler disrupted the rally at ' + (item ? item.name : doneId) + '.');
    } else {
      log('Rally at ' + (item ? item.name : doneId) + ' raised $' + donations + ' in donations; support is now ' + state.support + '%.');
    }
  };

  const collectDonations = () => {
    if (state.pending <= 0) return { ok: false, reason: 'nothing-pending' };
    const amount = state.pending;
    state.pending = 0;
    state.earned += amount;
    addCash(amount);
    log('Collected $' + amount + ' in donations.');
    return { ok: true, amount };
  };

  const sellMerch = (id) => {
    const item = politicsItemById(id);
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
  };

  const canvassDistrict = () => {
    if (getCash() < 30) return { ok: false, reason: 'not-enough-cash', cost: 30 };
    addCash(-30);
    state.spent += 30;
    state.volunteers += 2;
    state.support = Math.min(100, state.support + 1);
    gainXp(10);
    if (rng() < 0.1) {
      state.heat += 1;
      addHeat(1);
      log('Knocked on the wrong door during canvassing.');
    } else {
      log('Canvassed a district: ' + state.volunteers + ' volunteers, support at ' + state.support + '%.');
    }
    return { ok: true, volunteers: state.volunteers, support: state.support };
  };

  const buyUpgrade = (id) => {
    const up = politicsUpgradeById(id);
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
  };

  const hireStaff = (id) => {
    const s = politicsStaffById(id);
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
  };

  const fireStaff = (id) => {
    const at = state.staff.indexOf(id);
    if (at < 0) return { ok: false, reason: 'not-hired', id };
    state.staff.splice(at, 1);
    log('Let go of staff member ' + id + '.');
    return { ok: true, id };
  };

  const upgradeItem = (id) => {
    const item = politicsItemById(id);
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
  };

  const priceBoard = () => CAMPAIGN_EVENTS.map((it) => ({
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

  const listItems = () => CAMPAIGN_EVENTS.map((it) => ({
    id: it.id, name: it.name, price: it.price, difficulty: it.difficulty, rarity: it.rarity, desc: it.desc, owned: !!state.owned[it.id],
  }));

  const info = (id) => {
    const item = politicsItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    return { ok: true, item, owned: !!state.owned[id], level: state.levels[id] || 0, price: state.prices[id], holdings: state.holdings[id] || 0 };
  };

  const dailyEvent = () => {
    if (POLITICS_DAILY_EVENTS.length === 0) return { event: 'none', name: '', effect: '', amount: 0 };
    const ev = POLITICS_DAILY_EVENTS[Math.floor(rng() * POLITICS_DAILY_EVENTS.length)];
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
  };

  const tick = (dt) => {
    if (!state.active) return;
    state.activeTimer -= dt;
    if (state.activeTimer <= 0) {
      state.activeTimer = 0;
      settleRun();
    }
  };

  const tickDay = (day) => {
    if (day === state.lastDay) return null;
    state.lastDay = day;
    CAMPAIGN_EVENTS.forEach((it) => {
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
    if (state.support > 50) state.support -= 1;
    else if (state.support < 50) state.support += 1;
    state.polls = state.support;
    return dailyEvent();
  };

  const serialize = () => JSON.parse(JSON.stringify(state));

  const deserialize = (saved) => {
    if (!saved || typeof saved !== 'object') return;
    Object.keys(saved).forEach((k) => { state[k] = saved[k]; });
    if (!state.drift || typeof state.drift !== 'object') state.drift = {};
    if (!state.prices || typeof state.prices !== 'object') state.prices = {};
    if (!state.holdings || typeof state.holdings !== 'object') state.holdings = {};
    CAMPAIGN_EVENTS.forEach((it) => {
      if (state.drift[it.id] === undefined) state.drift[it.id] = 0;
      if (state.prices[it.id] === undefined) state.prices[it.id] = it.price;
      if (state.holdings[it.id] === undefined) state.holdings[it.id] = 0;
    });
    if (!state.owned || typeof state.owned !== 'object') state.owned = {};
    if (!state.levels || typeof state.levels !== 'object') state.levels = {};
    if (!state.boosted || typeof state.boosted !== 'object') state.boosted = {};
    state.rank = politicsRankFor(state.xp);
  };

  const stats = () => {
    const holdingsCount = Object.keys(state.holdings).reduce((sum, k) => sum + (state.holdings[k] || 0), 0);
    return {
      name: 'Politics',
      mechanic: 'politics',
      rank: politicsRankNameFor(state.rank),
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
      capacity: politicsCapacityFor(state.rank, state.upgrades),
      hour: getHour(),
      day: getDay(),
    };
  };

  const hudLine = () => {
    if (state.active) return 'Politics: running ' + state.activeId + ' - ' + Math.ceil(state.activeTimer) + 's left';
    if (state.pending > 0) return 'Politics: $' + state.pending + ' waiting in the till';
    if (state.itemsOwned > 0) return 'Politics: ' + state.itemsOwned + ' entries, $' + state.earned + ' earned';
    return '';
  };

  const interact = (action, a, b) => {
    if (!action || action === 'status') {
      return { ok: true, stats: stats(), hint: 'open an event to plan it, run an event to hold the rally, collect to claim donations' };
    }
    switch (action) {
      case 'open': return planEvent(a);
      case 'run': return holdRally(a);
      case 'collect': return collectDonations();
      case 'sell': return sellMerch(a, b);
      case 'upgrade': case 'levelup': return upgradeItem(a);
      case 'hire': return hireStaff(a);
      case 'fire': return fireStaff(a);
      case 'special': return canvassDistrict(a);
      case 'info': return info(a);
      case 'prices': return { ok: true, prices: priceBoard() };
      case 'list': return { ok: true, items: listItems() };
      case 'event': return dailyEvent();
      default: return { ok: false, reason: 'unknown-action', action };
    }
  };

  return {
    name: 'Politics',
    state,
    gainXp,
    planEvent,
    holdRally,
    collectDonations,
    sellMerch,
    canvassDistrict,
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
    open: planEvent,
    run: holdRally,
    collect: collectDonations,
    sell: sellMerch,
    upgrade: upgradeItem,
    hire: hireStaff,
  };
}

export function createPoliticsExtras(system) {
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  const challenges = () => POLITICS_CHALLENGES.map((ch) => politicsChallengeProgress(ch, system.state));

  const claimChallenge = (id) => {
    const ch = POLITICS_CHALLENGES.find((c) => c.id === id);
    if (!ch) return { ok: false, reason: 'unknown-challenge', id };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed', id };
    const prog = politicsChallengeProgress(ch, system.state);
    if (!prog.done) return { ok: false, reason: 'not-done', id, have: prog.have, goal: prog.goal };
    claimed.push(id);
    system.state.challengesClaimed.push(id);
    system.gainXp(ch.xp);
    return { ok: true, id, xp: ch.xp };
  };

  const achievements = () => POLITICS_ACHIEVEMENTS.map((a) => {
    const have = Math.floor(system.state[a.target] || 0);
    return { id: a.id, name: a.name, desc: a.desc, target: a.target, goal: a.goal, have, done: have >= a.goal };
  });

  const hireHelper = (id) => {
    const s = politicsStaffById(id);
    if (!s) return { ok: false, reason: 'unknown-staff', id };
    if (helpers.includes(id)) return { ok: false, reason: 'already-hired', id };
    helpers.push(id);
    return { ok: true, id, name: s.name, wage: s.wage };
  };

  const fireHelper = (id) => {
    const at = helpers.indexOf(id);
    if (at < 0) return { ok: false, reason: 'not-hired', id };
    helpers.splice(at, 1);
    return { ok: true, id };
  };

  const payWages = () => {
    const due = helpers.reduce((sum, hid) => {
      const s = politicsStaffById(hid);
      return s ? sum + s.wage : sum;
    }, 0);
    wagesPaid += due;
    system.state.wagesPaid += due;
    return { due, helpers: helpers.length, totalPaid: wagesPaid };
  };

  const helperBonus = (skill) => helpers.reduce((total, hid) => {
    const s = politicsStaffById(hid);
    return s && s.skill === skill ? total + s.bonus : total;
  }, 0);

  const donate = (amount) => {
    if (!amount || amount <= 0) return { ok: false, reason: 'bad-amount', amount };
    system.state.donations += amount;
    const rep = Math.floor(amount / 100);
    system.state.reputation += rep;
    return { ok: true, amount, reputation: rep };
  };

  const quickBoost = (id) => {
    if (!politicsItemById(id)) return { ok: false, reason: 'unknown-item', id };
    system.state.boosted[id] = true;
    return { ok: true, id, boosted: true };
  };

  const inventoryValue = () => politicsInventoryValue(system.state);

  const weeklyReport = () => ({
    goal: politicsWeeklyGoal(system.state),
    summary: politicsSummary(system.state),
    nextGoal: politicsNextGoal(system.state),
    efficiency: politicsEfficiency(system.state),
    profitPerRun: politicsProfitPerRun(system.state),
    records: politicsAllRecords(system.state),
  });

  const staffRoster = () => POLITICS_STAFF.map((s) => ({
    id: s.id, name: s.name, wage: s.wage, skill: s.skill, hired: helpers.includes(s.id) || system.state.staff.includes(s.id),
  }));

  const upgradeCatalog = () => POLITICS_UPGRADES.map((u) => ({
    id: u.id, name: u.name, cost: u.cost, effect: u.effect, desc: u.desc, owned: system.state.upgrades.includes(u.id),
  }));

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

export function createPoliticsMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  const setEvent = (id) => {
    const found = POLITICS_MARKET_EVENTS.find((e) => e.id === id);
    if (!found) return { ok: false, reason: 'unknown-event', id };
    currentEvent = id;
    return { ok: true, event: id };
  };

  const setSeason = (id) => {
    const found = POLITICS_SEASONS.find((x) => x.id === id);
    if (!found) return { ok: false, reason: 'unknown-season', id };
    currentSeason = id;
    return { ok: true, season: id };
  };

  const eventPrice = (itemId, basePrice) => Math.round(basePrice * politicsMarketEventMult(currentEvent, itemId) * politicsSeasonMult(currentSeason) * 10) / 10;

  const bulkDeal = (itemId, qty) => {
    const item = politicsItemById(itemId);
    if (!item) return { ok: false, reason: 'unknown-item', id: itemId };
    if (!qty || qty < 5) return { ok: false, reason: 'too-few', qty };
    const unit = eventPrice(itemId, item.price);
    const total = Math.round(unit * qty * 1.1 * 10) / 10;
    system.state.pending += total;
    system.state.dailyEarned += total;
    bulkTraded += qty;
    dealsClaimed += 1;
    return { ok: true, total, qty, unit, bonus: 'bulk +10%' };
  };

  const dailyDeals = () => CAMPAIGN_EVENTS
    .filter((it) => politicsMarketEventMult(currentEvent, it.id) !== 1)
    .map((it) => ({ item: it.id, name: it.name, mult: politicsMarketEventMult(currentEvent, it.id), event: currentEvent }));

  const marketSummary = () => ({ event: currentEvent, season: currentSeason, dealsClaimed, bulkTraded, deals: dailyDeals() });

  const seasonPrices = () => CAMPAIGN_EVENTS.map((it) => ({ id: it.id, name: it.name, price: eventPrice(it.id, it.price) }));

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

function politicsCondKey(weather) {
  if (typeof weather === 'string') return weather;
  if (weather && typeof weather.condition === 'string') return weather.condition;
  return 'clear';
}

function politicsSky(table, weather) {
  const hit = table[politicsCondKey(weather)];
  return hit === undefined ? 1 : hit;
}

function politicsOneDp(n) {
  return Math.round(n * 10) / 10;
}

export function politicsRankFor(xp) {
  let lvl = 0;
  POLITICS_RANKS.forEach((r) => {
    if (xp >= r.xp) lvl = r.level;
  });
  return lvl;
}

export function politicsItemById(id) {
  const hit = CAMPAIGN_EVENTS.filter((i) => i.id === id);
  return hit.length ? hit[0] : null;
}

export function politicsPriceFor(id, drift, rank, upgrades) {
  const item = politicsItemById(id);
  if (!item) return 0;
  let p = item.price * (1 + (drift || 0)) * (1 + (rank || 0) * 0.05);
  if (upgrades && upgrades.length >= 3) p *= 1.1;
  return Math.max(1, politicsOneDp(p));
}

export function politicsCapacityFor(rank, upgrades) {
  let cap = 3 + (rank || 0);
  if (upgrades && upgrades.indexOf('headquarters') !== -1) cap += 2;
  return cap;
}

export function politicsPayoutFor(item, rank, upgrades, weather, boosted) {
  if (!item) return 0;
  let mult = 0.6 + (rank || 0) * 0.1 + (boosted ? 0.3 : 0);
  mult *= politicsSky({ rain: 0.7, sunny: 1.15, storm: 0.7 }, weather);
  if (upgrades && upgrades.length >= 4) mult *= 1.15;
  return Math.max(5, Math.round(item.price * mult));
}

export function politicsCrowdFor(item, rank, weather) {
  const base = 10 + (item ? item.difficulty : 0) * 8 + (rank || 0) * 5;
  return Math.max(1, Math.round(base * politicsSky({ rain: 0.7, sunny: 1.15, storm: 0.5 }, weather)));
}

export function politicsUpgradeById(id) {
  const hit = POLITICS_UPGRADES.filter((u) => u.id === id);
  return hit.length ? hit[0] : null;
}

export function politicsStaffById(id) {
  const hit = POLITICS_STAFF.filter((s) => s.id === id);
  return hit.length ? hit[0] : null;
}

export function politicsEventById(id) {
  const daily = POLITICS_DAILY_EVENTS.filter((e) => e.id === id);
  if (daily.length) return daily[0];
  const market = POLITICS_MARKET_EVENTS.filter((e) => e.id === id);
  return market.length ? market[0] : null;
}

export function politicsTipFor(day) {
  return POLITICS_TIPS[day % POLITICS_TIPS.length];
}

export function politicsFactFor(day) {
  return POLITICS_FACTS[day % POLITICS_FACTS.length];
}

export function politicsNpcLineFor(day) {
  return POLITICS_NPC_LINES[day % POLITICS_NPC_LINES.length];
}

export function politicsGuideStep(step) {
  return step >= 0 && step < POLITICS_GUIDE.length ? POLITICS_GUIDE[step] : null;
}

export function politicsSeasonMult(seasonId) {
  const hit = POLITICS_SEASONS.filter((s) => s.id === seasonId);
  return hit.length ? hit[0].mult : 1;
}

export function politicsMarketEventMult(eventId, itemId) {
  if (!eventId) return 1;
  const hit = POLITICS_MARKET_EVENTS.filter((e) => e.id === eventId);
  if (!hit.length) return 1;
  return hit[0].item === itemId ? hit[0].mult : 1;
}

export function politicsWeeklyGoal(state) {
  const runs = { have: state.runsDone, goal: 5, done: state.runsDone >= 5 };
  const earned = { have: state.earned, goal: 500, done: state.earned >= 500 };
  const visitors = { have: state.visitors, goal: 100, done: state.visitors >= 100 };
  return { runs, earned, visitors, allDone: runs.done && earned.done && visitors.done };
}

export function politicsEfficiency(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 100;
  return Math.round((state.runsDone / total) * 100);
}

export function politicsProfitPerRun(state) {
  if (state.runsDone === 0) return 0;
  return politicsOneDp(state.earned / state.runsDone);
}

export function politicsInventoryValue(state) {
  let sum = 0;
  Object.keys(state.owned).forEach((id) => {
    const item = politicsItemById(id);
    if (item) sum += item.price * (state.levels[id] || 1);
  });
  return politicsOneDp(sum);
}

export function politicsSummary(state) {
  return 'Politics at rank ' + politicsRankNameFor(state.rank) + ': ' + state.runsDone + ' runs, ' + state.itemsOwned + ' entries, $' + state.earned + ' earned, ' + state.visitors + ' visitors.';
}

export function politicsNextGoal(state) {
  if (state.itemsOwned === 0) return 'Open your first entry.';
  if (state.runsDone < 5) return 'Finish 5 runs.';
  if (state.earned < 500) return 'Earn $500 in total.';
  if (state.rank < 2) return 'Reach rank ' + politicsRankNameFor(2) + '.';
  if (state.upgradesOwned < 4) return 'Own 4 upgrades.';
  return 'Become a legend of the Politics.';
}

export function politicsRecordFor(id, state) {
  const hit = POLITICS_RECORDS.filter((r) => r.id === id);
  if (!hit.length) return null;
  const rec = hit[0];
  return { id: rec.id, name: rec.name, stat: rec.stat, unit: rec.unit, desc: rec.desc, value: state[rec.stat] === undefined ? 0 : state[rec.stat] };
}

export function politicsAllRecords(state) {
  return POLITICS_RECORDS.map((r) => politicsRecordFor(r.id, state));
}

export function politicsLeaderboardWith(score) {
  const board = POLITICS_LEADERBOARD.map((e) => (e.name === 'You' ? { name: e.name, score, desc: e.desc } : { name: e.name, score: e.score, desc: e.desc }));
  board.sort((a, b) => b.score - a.score);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, score: e.score, desc: e.desc }));
}

export function politicsSeasonReport(state, seasonId) {
  const mult = politicsSeasonMult(seasonId);
  return CAMPAIGN_EVENTS.map((it) => ({
    id: it.id,
    name: it.name,
    basePrice: it.price,
    seasonPrice: politicsOneDp(it.price * mult),
    owned: !!state.owned[it.id],
    level: state.levels[it.id] || 0,
  }));
}

export function politicsChallengeProgress(challenge, state) {
  const have = Math.floor(state[challenge.target] || 0);
  return { id: challenge.id, name: challenge.name, have, goal: challenge.goal, done: have >= challenge.goal, xp: challenge.xp };
}

export function politicsBestEntryFor(rank) {
  let best = null;
  let bestScore = -1;
  CAMPAIGN_EVENTS.forEach((it) => {
    if (it.difficulty > rank + 2) return;
    const score = (it.price * (1 + it.rarity * 2)) / it.difficulty;
    if (score > bestScore) {
      bestScore = score;
      best = it;
    }
  });
  return best;
}

export function politicsEventFor(day) {
  return POLITICS_MARKET_EVENTS[day % POLITICS_MARKET_EVENTS.length];
}

export function politicsDailyEventFor(day) {
  return POLITICS_DAILY_EVENTS[day % POLITICS_DAILY_EVENTS.length];
}

export function politicsRankNameFor(level) {
  const hit = POLITICS_RANKS.filter((r) => r.level === level);
  return hit.length ? hit[0].name : 'Unknown';
}

export function politicsTotalValue(state) {
  return politicsOneDp(politicsInventoryValue(state) + state.pending + state.earned);
}

export function politicsProgressPercent(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 0;
  return Math.round((state.runsDone / total) * 100);
}

export function politicsStaffBonusFor(staffIds, skill) {
  let total = 0;
  staffIds.forEach((id) => {
    const s = politicsStaffById(id);
    if (s && s.skill === skill) total += s.bonus;
  });
  return total;
}

export function politicsCheapestEntry() {
  let best = CAMPAIGN_EVENTS[0];
  CAMPAIGN_EVENTS.forEach((it) => {
    if (it.price < best.price) best = it;
  });
  return best;
}

export function politicsPriciestEntry() {
  let best = CAMPAIGN_EVENTS[0];
  CAMPAIGN_EVENTS.forEach((it) => {
    if (it.price > best.price) best = it;
  });
  return best;
}

export function politicsEntriesByDifficulty(difficulty) {
  return CAMPAIGN_EVENTS.filter((it) => it.difficulty === difficulty).map((it) => it.id);
}

export function politicsEntriesByRarity(maxRarity) {
  return CAMPAIGN_EVENTS.filter((it) => it.rarity <= maxRarity).map((it) => it.id);
}

export function politicsGradeFor(runsDone, earned, visitors) {
  const score = runsDone * 10 + Math.round(earned / 10) + Math.floor(visitors / 10);
  if (score >= 500) return 'S';
  if (score >= 300) return 'A';
  if (score >= 150) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}
