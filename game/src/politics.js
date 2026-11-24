// Solara Nights - Politics (Round 7 mega-rebuild, written fresh).
// The Solara campaign trail: plan events, hold rallies, knock on
// doors, and win the city one voter at a time. Donations fund the
// next rally, volunteers knock on the next street, and the polls
// move with every speech. Sunny days fill the squares; rain sends
// everyone home, and a scandal can undo a month of good work.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.
// Mechanic: politics.

export const CAMPAIGN_EVENTS = [
  { id: 'door-knock', name: 'Door-to-Door Knock', price: 60, rarity: 0.3, difficulty: 1, district: 'Old Town', crowd: 20, impact: 2,
    desc: 'Clipboards, smiles, and twenty front doors an hour.' },
  { id: 'town-hall', name: 'Town Hall Meeting', price: 150, rarity: 0.22, difficulty: 2, district: 'Downtown', crowd: 80, impact: 3,
    desc: 'A hall full of questions and one very long evening.' },
  { id: 'street-rally', name: 'Street Rally', price: 300, rarity: 0.15, difficulty: 3, district: 'Market Square', crowd: 200, impact: 4,
    desc: 'Banners, chanting, and a square that stops to listen.' },
  { id: 'debate-night', name: 'Debate Night', price: 500, rarity: 0.1, difficulty: 4, district: 'Civic Hall', crowd: 150, impact: 5,
    desc: 'Two podiums, one stage, and the whole city watching.' },
  { id: 'fundraiser-gala', name: 'Fundraiser Gala', price: 800, rarity: 0.08, difficulty: 4, district: 'Harbor Club', crowd: 120, impact: 5,
    desc: 'Black ties, big cheques, and speeches between courses.' },
  { id: 'park-picnic', name: 'Park Picnic', price: 120, rarity: 0.25, difficulty: 1, district: 'Green Park', crowd: 60, impact: 2,
    desc: 'Sandwiches, lemonade, and politics under the trees.' },
  { id: 'campus-tour', name: 'Campus Tour', price: 200, rarity: 0.18, difficulty: 2, district: 'University', crowd: 150, impact: 3,
    desc: 'Students ask the hardest questions in the city.' },
  { id: 'factory-visit', name: 'Factory Visit', price: 250, rarity: 0.16, difficulty: 2, district: 'Industrial', crowd: 90, impact: 3,
    desc: 'Hard hats, handshakes, and a tour of the assembly line.' },
  { id: 'beach-cleanup', name: 'Beach Cleanup Rally', price: 180, rarity: 0.2, difficulty: 2, district: 'The Beach', crowd: 100, impact: 3,
    desc: 'Gloves, bags, and a cleaner beach by sunset.' },
  { id: 'grand-parade', name: 'Grand Victory Parade', price: 1500, rarity: 0.04, difficulty: 5, district: 'Main Avenue', crowd: 1000, impact: 6,
    desc: 'The whole avenue, marching, singing, and waving flags.' },
];

export const POLITICS_UPGRADES = [
  { id: 'campaign-office', name: 'Campaign Office', cost: 200, effect: 'base-plus', desc: 'A room with a phone, a map, and a kettle that never stops.' },
  { id: 'volunteer-app', name: 'Volunteer App', cost: 350, effect: 'volunteer-plus', desc: 'Every canvasser knows exactly which doors to knock.' },
  { id: 'billboard-blitz', name: 'Billboard Blitz', cost: 600, effect: 'reach-plus', desc: 'Your face above every main road in Solara.' },
  { id: 'tv-spot', name: 'TV Spot', cost: 900, effect: 'tv-plus', desc: 'Thirty seconds of prime time. The city remembers.' },
  { id: 'pollster-team', name: 'Pollster Team', cost: 700, effect: 'poll-plus', desc: 'Real numbers every morning instead of gut feelings.' },
  { id: 'social-war-room', name: 'Social War Room', cost: 500, effect: 'social-plus', desc: 'Every post, every reply, within minutes.' },
  { id: 'motorcade', name: 'Motorcade', cost: 1300, effect: 'tour-plus', desc: 'Three districts a day instead of one.' },
  { id: 'headquarters', name: 'Headquarters', cost: 2200, effect: 'capacity-plus', desc: 'A real HQ. Room for every event the city can hold.' },
];

export const POLITICS_RANKS = [
  { level: 0, name: 'Volunteer', xp: 0, perk: 'Events pay base rate.' },
  { level: 1, name: 'Canvasser', xp: 150, perk: '+5% prices, doors open a little easier.' },
  { level: 2, name: 'Campaigner', xp: 400, perk: '+10% prices, the press knows your name.' },
  { level: 3, name: 'Frontrunner', xp: 800, perk: '+15% prices, donors call you first.' },
  { level: 4, name: 'Mayor-in-Waiting', xp: 1500, perk: '+20% prices, the city is listening.' },
];

export const POLITICS_STAFF = [
  { id: 'canvasser-cid', name: 'Cid the Canvasser', wage: 30, skill: 'canvass', bonus: 0.15, desc: 'Knows every street, every dog, and every gate.' },
  { id: 'speechwriter-sana', name: 'Sana the Speechwriter', wage: 45, skill: 'speech', bonus: 0.2, desc: 'Writes lines the crowd repeats on the way home.' },
  { id: 'fundraiser-fay', name: 'Fay the Fundraiser', wage: 40, skill: 'funds', bonus: 0.2, desc: 'Turns a handshake into a cheque with a smile.' },
  { id: 'pollster-pip', name: 'Pip the Pollster', wage: 35, skill: 'polls', bonus: 0.15, desc: 'Asks the right questions and hears the honest answers.' },
];

export const POLITICS_DAILY_EVENTS = [
  { id: 'endorsement-deal', name: 'Endorsement Deal', effect: 'rep', amount: 2,
    text: 'The dockworkers union endorses the campaign.' },
  { id: 'scandal-rumor', name: 'Scandal Rumor', effect: 'heat', amount: 1,
    text: 'A nasty rumour circulates. The press calls all day.' },
  { id: 'viral-speech', name: 'Viral Speech', effect: 'visitors', amount: 80,
    text: 'One line from last night is everywhere this morning.' },
  { id: 'donor-surge', name: 'Donor Surge', effect: 'earn', amount: 400,
    text: 'Small donations flood in from across the city.' },
  { id: 'opponent-attack', name: 'Opponent Attack', effect: 'rep', amount: -1,
    text: 'The rival campaign runs a harsh advert.' },
  { id: 'volunteer-surge', name: 'Volunteer Surge', effect: 'visitors', amount: 50,
    text: 'New volunteers queue at the office door.' },
  { id: 'press-conference', name: 'Press Conference', effect: 'rep', amount: 1,
    text: 'Cameras, questions, and a steady performance.' },
  { id: 'poll-bump', name: 'Poll Bump', effect: 'rep', amount: 2,
    text: 'The morning poll shows a healthy jump.' },
  { id: 'debate-gaffe', name: 'Debate Gaffe', effect: 'heat', amount: 1,
    text: 'A slip of the tongue becomes the evening news.' },
  { id: 'grassroots-wave', name: 'Grassroots Wave', effect: 'earn', amount: 300,
    text: 'Neighbours telling neighbours. The best advertising.' },
];

export const POLITICS_TIPS = [
  { id: 'doors-win', name: 'Doors Win', text: 'Elections are won on doorsteps, not on billboards.' },
  { id: 'sunny-squares', name: 'Sunny Squares', text: 'Hold the big rally when the sun shines. Rain empties squares.' },
  { id: 'volunteer-gold', name: 'Volunteer Gold', text: 'Two volunteers today are two hundred doors tomorrow.' },
  { id: 'speech-line', name: 'Speech Line', text: 'One memorable line beats an hour of policy detail.' },
  { id: 'donor-thanks', name: 'Donor Thanks', text: 'Thank every donor by name. They give twice when thanked.' },
  { id: 'polls-daily', name: 'Polls Daily', text: 'Read the polls every morning. Campaign where they move.' },
  { id: 'scandal-calm', name: 'Scandal Calm', text: 'Answer a rumour once, calmly, and get back to work.' },
  { id: 'parade-last', name: 'Parade Last', text: 'Save the grand parade for the final week. End on a roar.' },
];

export const POLITICS_CHALLENGES = [
  { id: 'first-steps', name: 'First Steps', target: 'runsDone', goal: 3, xp: 40, desc: 'Finish 3 campaign runs.' },
  { id: 'regular', name: 'Regular', target: 'runsDone', goal: 10, xp: 90, desc: 'Finish 10 campaign runs.' },
  { id: 'collector', name: 'Collector', target: 'itemsOwned', goal: 4, xp: 100, desc: 'Own 4 different campaign entries.' },
  { id: 'big-earner', name: 'Big Earner', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from the campaign business.' },
  { id: 'crowd-favourite', name: 'Crowd Favourite', target: 'visitors', goal: 200, xp: 110, desc: 'Draw 200 visitors through the campaign business.' },
  { id: 'respected', name: 'Respected Name', target: 'reputation', goal: 10, xp: 100, desc: 'Reach 10 reputation in the campaign business.' },
  { id: 'best-day', name: 'Best Day Ever', target: 'bestRun', goal: 400, xp: 130, desc: 'Score a single run worth $400 or more.' },
  { id: 'fully-kitted', name: 'Fully Kitted', target: 'upgradesOwned', goal: 6, xp: 150, desc: 'Own 6 upgrades for the campaign business.' },
];

export const POLITICS_ACHIEVEMENTS = [
  { id: 'first-run', name: 'First Run', target: 'runsDone', goal: 1, desc: 'Finish your first campaign run.' },
  { id: 'first-sale', name: 'First Payday', target: 'earned', goal: 1, desc: 'Collect your first dollar of campaign earnings.' },
  { id: 'ten-runs', name: 'Ten Runs Deep', target: 'runsDone', goal: 10, desc: 'Finish 10 campaign runs.' },
  { id: 'thousand-club', name: 'Thousand Club', target: 'earned', goal: 1000, desc: 'Earn $1,000 in total from the campaign business.' },
  { id: 'five-hundred-faces', name: 'Five Hundred Faces', target: 'visitors', goal: 500, desc: 'Welcome 500 visitors through the campaign business.' },
  { id: 'rank-three', name: 'Rising Star', target: 'rank', goal: 3, desc: 'Reach rank 3 in the campaign business.' },
  { id: 'full-shelf', name: 'Full Shelf', target: 'itemsOwned', goal: 8, desc: 'Own 8 different campaign entries at once.' },
  { id: 'streak-five', name: 'On A Roll', target: 'bestStreak', goal: 5, desc: 'Build a 5-run streak without a failed campaign run.' },
];

export const POLITICS_LEADERBOARD = [
  { name: 'Councillor Voss', score: 4200, desc: 'Twenty years in office and a very sharp suit.' },
  { name: 'The Old Guard', score: 3100, desc: 'The establishment, the money, and the machine.' },
  { name: 'Populist Pete', score: 2400, desc: 'Loud, funny, and dangerously popular.' },
  { name: 'The Machine', score: 1500, desc: 'The party apparatus. It never sleeps.' },
  { name: 'You', score: 0, desc: 'Climbing the campaign ladder.' },
];

export const POLITICS_RECORDS = [
  { id: 'biggest-run', name: 'Biggest Run', stat: 'bestRun', unit: '$', desc: 'Best single-run payout.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money earned overall.' },
  { id: 'most-visitors', name: 'Most Visitors', stat: 'visitors', unit: 'people', desc: 'Most visitors welcomed.' },
  { id: 'most-runs', name: 'Most Runs', stat: 'runsDone', unit: 'runs', desc: 'Most runs finished.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'runs', desc: 'Longest run streak.' },
];

export const POLITICS_MARKET_EVENTS = [
  { id: 'door-knock-surge', name: 'Door-to-Door Knock Surge', item: 'door-knock', mult: 1.35, desc: 'Demand for Door-to-Door Knock swings hard this week.' },
  { id: 'town-hall-surge', name: 'Town Hall Meeting Surge', item: 'town-hall', mult: 0.7, desc: 'Demand for Town Hall Meeting swings hard this week.' },
  { id: 'street-rally-surge', name: 'Street Rally Surge', item: 'street-rally', mult: 1.35, desc: 'Demand for Street Rally swings hard this week.' },
  { id: 'debate-night-surge', name: 'Debate Night Surge', item: 'debate-night', mult: 0.7, desc: 'Demand for Debate Night swings hard this week.' },
  { id: 'fundraiser-gala-surge', name: 'Fundraiser Gala Surge', item: 'fundraiser-gala', mult: 1.35, desc: 'Demand for Fundraiser Gala swings hard this week.' },
  { id: 'park-picnic-surge', name: 'Park Picnic Surge', item: 'park-picnic', mult: 0.7, desc: 'Demand for Park Picnic swings hard this week.' },
  { id: 'campus-tour-surge', name: 'Campus Tour Surge', item: 'campus-tour', mult: 1.35, desc: 'Demand for Campus Tour swings hard this week.' },
  { id: 'factory-visit-surge', name: 'Factory Visit Surge', item: 'factory-visit', mult: 0.7, desc: 'Demand for Factory Visit swings hard this week.' },
  { id: 'beach-cleanup-surge', name: 'Beach Cleanup Rally Surge', item: 'beach-cleanup', mult: 1.35, desc: 'Demand for Beach Cleanup Rally swings hard this week.' },
  { id: 'grand-parade-surge', name: 'Grand Victory Parade Surge', item: 'grand-parade', mult: 0.7, desc: 'Demand for Grand Victory Parade swings hard this week.' },
];

export const POLITICS_SEASONS = [
  { id: 'spring-primary', name: 'Spring Primary', mult: 1.1, desc: 'The race begins and the city starts choosing.' },
  { id: 'summer-campaign', name: 'Summer Campaign', mult: 1.2, desc: 'Long evenings, full squares, endless handshakes.' },
  { id: 'autumn-debates', name: 'Autumn Debates', mult: 1.05, desc: 'Debate season. Every word is weighed.' },
  { id: 'winter-election', name: 'Winter Election', mult: 1.15, desc: 'Election week. Everything counts now.' },
];

export const POLITICS_FACTS = [
  { id: 'fact-door-knock', text: 'Door-to-Door Knock: Clipboards, smiles, and twenty front doors an hour.' },
  { id: 'fact-town-hall', text: 'Town Hall Meeting: A hall full of questions and one very long evening.' },
  { id: 'fact-street-rally', text: 'Street Rally: Banners, chanting, and a square that stops to listen.' },
  { id: 'fact-debate-night', text: 'Debate Night: Two podiums, one stage, and the whole city watching.' },
  { id: 'fact-fundraiser-gala', text: 'Fundraiser Gala: Black ties, big cheques, and speeches between courses.' },
  { id: 'fact-park-picnic', text: 'Park Picnic: Sandwiches, lemonade, and politics under the trees.' },
  { id: 'fact-campus-tour', text: 'Campus Tour: Students ask the hardest questions in the city.' },
  { id: 'fact-factory-visit', text: 'Factory Visit: Hard hats, handshakes, and a tour of the assembly line.' },
  { id: 'fact-beach-cleanup', text: 'Beach Cleanup Rally: Gloves, bags, and a cleaner beach by sunset.' },
  { id: 'fact-grand-parade', text: 'Grand Victory Parade: The whole avenue, marching, singing, and waving flags.' },
  { id: 'fact-general-0', text: 'The best campaign operators in Solara check their prices every morning before opening.' },
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

export const POLITICS_NPC_LINES = [
  { id: 'npc-0', text: 'I came all the way across town for the Door-to-Door Knock. Worth it.' },
  { id: 'npc-1', text: 'My cousin runs a campaign place too, but yours is better. Do not tell him.' },
  { id: 'npc-2', text: 'Is the Street Rally really as good as everyone says? I am about to find out.' },
  { id: 'npc-3', text: 'I bring my kids here every weekend. They ask for the Town Hall Meeting by name.' },
  { id: 'npc-4', text: 'You should put the Debate Night on a poster. People would come just for that.' },
  { id: 'npc-5', text: 'I heard the Fundraiser Gala here is the best in Solara. The rumour was right.' },
  { id: 'npc-6', text: 'Quiet day today. The Park Picnic still made my afternoon.' },
  { id: 'npc-7', text: 'I saved up for weeks to try the Campus Tour. No regrets.' },
  { id: 'npc-8', text: 'The staff told me about the Factory Visit. Now I tell everyone I meet.' },
  { id: 'npc-9', text: 'I have been to every campaign spot in the city. This one wins.' },
  { id: 'npc-10', text: 'One day I want to run a campaign place of my own. I am taking notes.' },
  { id: 'npc-11', text: 'The Beach Cleanup Rally is the reason my friends finally believe my stories.' },
  { id: 'npc-12', text: 'Do you ever get tired of the Grand Victory Parade? I never would.' },
  { id: 'npc-13', text: 'I wrote a review about the Door-to-Door Knock last night. Five stars, obviously.' },
  { id: 'npc-14', text: 'My grandmother loved the Town Hall Meeting. I come here to remember her.' },
  { id: 'npc-15', text: 'If the Street Rally gets any better, the whole city will queue around the block.' },
];

export const POLITICS_GUIDE = [
  { id: 'guide-0', text: 'Open your first campaign entry: it costs cash, but it unlocks everything else.' },
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

export function politicsRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < POLITICS_RANKS.length; i++) {
    if (xp >= POLITICS_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function politicsItemById(id) {
  return CAMPAIGN_EVENTS.find((x) => x.id === id) || null;
}

export function politicsPriceFor(id, drift, rank, upgrades) {
  const item = CAMPAIGN_EVENTS.find((x) => x.id === id);
  if (!item) return 0;
  let price = item.price;
  price *= 1 + (drift[id] || 0);
  price *= 1 + rank * 0.05;
  if (upgrades && upgrades.length >= 3) price *= 1.1;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function politicsCapacityFor(rank, upgrades) {
  let cap = 3 + rank;
  if (upgrades && upgrades.indexOf('headquarters') >= 0) cap += 2;
  return cap;
}

export function politicsPayoutFor(item, rank, upgrades, weather, boosted) {
  let mult = 0.6 + rank * 0.1 + (boosted ? 0.3 : 0);
  if (weather === 'rain') mult *= 0.7;
  if (weather === 'sunny') mult *= 1.15;
  if (weather === 'storm') mult *= 0.7;
  if (upgrades && upgrades.length >= 4) mult *= 1.15;
  return Math.max(5, Math.round(item.price * mult));
}

export function politicsCrowdFor(item, rank, weather) {
  let crowd = 10 + item.difficulty * 8 + rank * 5;
  if (weather === 'rain') crowd = Math.round(crowd * 0.7);
  if (weather === 'sunny') crowd = Math.round(crowd * 1.15);
  if (weather === 'storm') crowd = Math.round(crowd * 0.5);
  return Math.max(1, crowd);
}

export function politicsUpgradeById(id) {
  return POLITICS_UPGRADES.find((x) => x.id === id) || null;
}

export function politicsStaffById(id) {
  return POLITICS_STAFF.find((x) => x.id === id) || null;
}

export function politicsEventById(id) {
  return POLITICS_DAILY_EVENTS.find((x) => x.id === id) || null;
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
  return POLITICS_GUIDE[step] || null;
}

export function politicsSeasonMult(seasonId) {
  const s = POLITICS_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function politicsMarketEventMult(eventId, itemId) {
  const ev = POLITICS_MARKET_EVENTS.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.item === itemId ? ev.mult : 1;
}

export function politicsWeeklyGoal(state) {
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

export function politicsEfficiency(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 100;
  return Math.round((state.runsDone / total) * 100);
}

export function politicsProfitPerRun(state) {
  if (state.runsDone === 0) return 0;
  return Math.round((state.earned / state.runsDone) * 10) / 10;
}

export function politicsInventoryValue(state) {
  let total = 0;
  for (const id of Object.keys(state.owned || {})) {
    const item = CAMPAIGN_EVENTS.find((x) => x.id === id);
    if (item) total += item.price * (state.levels[id] || 1);
  }
  return Math.round(total * 10) / 10;
}

export function politicsSummary(state) {
  const rankName = POLITICS_RANKS[state.rank] ? POLITICS_RANKS[state.rank].name : 'Unknown';
  return 'Politics ' + rankName + ': ' + state.runsDone + ' runs, '
    + state.itemsOwned + ' entries, $' + Math.round(state.earned)
    + ' earned, ' + state.visitors + ' visitors.';
}

export function politicsNextGoal(state) {
  if (state.itemsOwned < 1) return 'Open your first entry.';
  if (state.runsDone < 5) return 'Finish 5 runs.';
  if (state.earned < 500) return 'Earn $500 in total.';
  if (state.rank < 2) return 'Reach rank ' + POLITICS_RANKS[2].name + '.';
  if (state.upgradesOwned < 4) return 'Own 4 upgrades.';
  return 'Become a Politics legend.';
}

export function politicsRecordFor(recordId, state) {
  const r = POLITICS_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function politicsAllRecords(state) {
  return POLITICS_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function politicsLeaderboardWith(playerScore) {
  const board = POLITICS_LEADERBOARD.map((e) => ({
    name: e.name, score: e.name === 'You' ? playerScore : e.score, desc: e.desc,
  }));
  board.sort((a, b) => b.score - a.score);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, score: e.score, desc: e.desc }));
}

export function politicsSeasonReport(state, seasonId) {
  const mult = politicsSeasonMult(seasonId);
  return CAMPAIGN_EVENTS.map((item) => ({
    id: item.id,
    name: item.name,
    basePrice: item.price,
    seasonPrice: Math.round(item.price * mult * 10) / 10,
    owned: !!state.owned[item.id],
    level: state.levels[item.id] || 0,
  }));
}

export function politicsChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return {
    id: challenge.id, name: challenge.name, have: Math.floor(v),
    goal: challenge.goal, done: v >= challenge.goal, xp: challenge.xp,
  };
}

export function politicsBestEntryFor(rank) {
  let best = null;
  let bestScore = -1;
  for (const item of CAMPAIGN_EVENTS) {
    if (item.difficulty > rank + 2) continue;
    const score = item.price * (1 + item.rarity * 2) / item.difficulty;
    if (score > bestScore) { bestScore = score; best = item; }
  }
  return best;
}

export function createPoliticsSystem(ctx) {
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
  const MECH = 'politics';

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
  for (const item of CAMPAIGN_EVENTS) {
    state.drift[item.id] = 0;
    state.prices[item.id] = item.price;
  }

  function refreshRank() {
    const r = politicsRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log('Politics rank up: ' + POLITICS_RANKS[r].name + ' - ' + POLITICS_RANKS[r].perk);
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
      const s = POLITICS_STAFF.find((x) => x.id === id);
      if (s && s.skill === skill) bonus += s.bonus;
    }
    return bonus;
  }

  function driftPrices() {
    for (const item of CAMPAIGN_EVENTS) {
      const roll = rng();
      if (roll < 0.35) {
        const change = Math.round((rng() * 0.24 - 0.12) * 100) / 100;
        state.drift[item.id] = Math.round((state.drift[item.id] + change) * 100) / 100;
        state.prices[item.id] = Math.max(1, Math.round(item.price * (1 + state.drift[item.id]) * 10) / 10);
      }
    }
  }

  function planEvent(id) {
    const item = CAMPAIGN_EVENTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-event' };
    if (state.owned[id]) return { ok: false, reason: 'already-owned' };
    if (state.itemsOwned >= politicsCapacityFor(state.rank, state.upgrades)) {
      return { ok: false, reason: 'capacity-full', cap: politicsCapacityFor(state.rank, state.upgrades) };
    }
    if (state.rank < Math.max(0, item.difficulty - 2)) {
      return { ok: false, reason: 'rank-too-low', need: Math.max(0, item.difficulty - 2) };
    }
    const cost = politicsPriceFor(id, state.drift, 0, []);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned[id] = 1;
    state.levels[id] = 1;
    state.itemsOwned += 1;
    gainXp(10);
    log('Planned ' + item.name + ' for $' + cost + '. Welcome to the Politics business.');
    return { ok: true, id, cost, name: item.name };
  }

  function holdRally(id) {
    const item = CAMPAIGN_EVENTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-event' };
    if (state.active) return { ok: false, reason: 'already-running', active: state.activeId };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned' };
    const cost = Math.round(item.price * 0.5);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.active = 'rally';
    state.activeId = id;
    state.activeTimer = 20;
    state.activeBase = cost;
    log('Rally started: ' + item.name + ' is under way. The crowd is listening.');
    return { ok: true, id, cost, seconds: 20 };
  }

  function settleRun() {
    const id = state.activeId;
    const item = CAMPAIGN_EVENTS.find((x) => x.id === id);
    state.active = null;
    state.activeId = null;
    state.activeTimer = 0;
    if (!item) return;
    const gain = 2 + item.difficulty;
    state.support = Math.min(100, state.support + gain);
    state.polls = state.support;
    const donations = Math.round(item.price * 0.3 + state.volunteers * 5 + rng() * 50);
    state.donations += donations;
    state.pending += donations;
    state.dailyEarned += donations;
    state.runsDone += 1;
    state.visitors += Math.round(item.price / 10);
    if (donations > state.bestRun) { state.bestRun = donations; state.bestRunName = item.name; }
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    if (rng() < 0.15) {
      state.heat += 1;
      addHeat(1);
      log('A heckler at ' + item.name + ' made the evening news. Heat +1.');
    }
    gainXp(20);
    log('Rally done: ' + item.name + ' raised $' + donations + ' and support is now ' + state.support + '%.');
  }

  function collectDonations() {
    if (state.pending <= 0) return { ok: false, reason: 'nothing-pending' };
    const amount = state.pending;
    state.pending = 0;
    state.earned += amount;
    addCash(amount);
    log('Collected $' + amount + ' from the till.');
    return { ok: true, amount };
  }

  function sellMerch(id, qty) {
    const item = CAMPAIGN_EVENTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-event' };
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

  function canvassDistrict(id) {
    void id;
    if (getCash() < 30) return { ok: false, reason: 'not-enough-cash', cost: 30 };
    addCash(-30);
    state.spent += 30;
    state.volunteers += 2;
    state.support = Math.min(100, state.support + 1);
    gainXp(10);
    if (rng() < 0.1) {
      state.heat += 1;
      addHeat(1);
      log('A canvasser knocked on the wrong door. Heat +1.');
    } else {
      log('Canvassing done: 2 new volunteers, support ' + state.support + '%.');
    }
    return { ok: true, volunteers: state.volunteers, support: state.support };
  }

  function buyUpgrade(id) {
    const u = POLITICS_UPGRADES.find((x) => x.id === id);
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
    const s = POLITICS_STAFF.find((x) => x.id === id);
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
    const item = CAMPAIGN_EVENTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-event' };
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
    return CAMPAIGN_EVENTS.map((item) => ({
      id: item.id,
      name: item.name,
      price: politicsPriceFor(item.id, state.drift, state.rank, state.upgrades),
      basePrice: item.price,
      drift: state.drift[item.id],
      owned: !!state.owned[item.id],
      level: state.levels[item.id] || 0,
      difficulty: item.difficulty,
      rarity: item.rarity,
    }));
  }

  function listItems() {
    return CAMPAIGN_EVENTS.map((item) => ({
      id: item.id, name: item.name, price: item.price,
      difficulty: item.difficulty, rarity: item.rarity, desc: item.desc,
      owned: !!state.owned[item.id],
    }));
  }

  function info(id) {
    const item = CAMPAIGN_EVENTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-event' };
    return {
      ok: true, item,
      owned: !!state.owned[id],
      level: state.levels[id] || 0,
      price: politicsPriceFor(id, state.drift, state.rank, state.upgrades),
      holdings: state.holdings[id] || 0,
    };
  }

  function dailyEvent() {
    const idx = Math.floor(rng() * POLITICS_DAILY_EVENTS.length);
    const ev = POLITICS_DAILY_EVENTS[idx];
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
    if (state.support > 50) state.support -= 1;
    else if (state.support < 50) state.support += 1;
    state.polls = state.support;
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
    for (const item of CAMPAIGN_EVENTS) {
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
      name: 'Politics',
      mechanic: MECH,
      rank: POLITICS_RANKS[state.rank] ? POLITICS_RANKS[state.rank].name : 'Unknown',
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
  }

  function hudLine() {
    if (state.active) {
      return 'Politics: running ' + state.activeId + ' - ' + Math.max(0, Math.ceil(state.activeTimer)) + 's left';
    }
    if (state.pending > 0) {
      return 'Politics: $' + Math.round(state.pending) + ' waiting in the till';
    }
    if (state.itemsOwned > 0) {
      return 'Politics: ' + state.itemsOwned + ' entries, $' + Math.round(state.earned) + ' earned';
    }
    return '';
  }

  function interact(action, a, b) {
    if (!action || action === 'status') return { ok: true, stats: stats(), hint: 'open <event> to plan it, run <event> to hold the rally, collect to claim donations' };
    if (action === 'open') return planEvent(a);
    if (action === 'run') return holdRally(a);
    if (action === 'collect') return collectDonations();
    if (action === 'sell') return sellMerch(a, b);
    if (action === 'upgrade') return buyUpgrade(a);
    if (action === 'levelup') return upgradeItem(a);
    if (action === 'hire') return hireStaff(a);
    if (action === 'fire') return fireStaff(a);
    if (action === 'special') return canvassDistrict(a, b);
    if (action === 'info') return info(a);
    if (action === 'prices') return { ok: true, prices: priceBoard() };
    if (action === 'list') return { ok: true, items: listItems() };
    if (action === 'event') return dailyEvent();
    return { ok: false, reason: 'unknown-action', action };
  }

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
    upgrade: buyUpgrade,
    hire: hireStaff,
  };
}

export function createPoliticsExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function challenges() {
    return POLITICS_CHALLENGES.map((ch) => politicsChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = POLITICS_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.indexOf(id) >= 0) return { ok: false, reason: 'already-claimed' };
    const p = politicsChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    system.state.challengesClaimed.push(id);
    if (typeof system.gainXp === 'function') system.gainXp(ch.xp);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return POLITICS_ACHIEVEMENTS.map((a) => ({
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
    const h = POLITICS_STAFF.find((x) => x.id === id);
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
      const h = POLITICS_STAFF.find((x) => x.id === id);
      if (h) due += h.wage;
    }
    helperWagesPaid += due;
    system.state.wagesPaid += due;
    return { due, helpers: helpers.slice(), totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    let bonus = 0;
    for (const id of helpers) {
      const h = POLITICS_STAFF.find((x) => x.id === id);
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
    const item = CAMPAIGN_EVENTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-event' };
    system.state.boosted[id] = true;
    return { ok: true, id, boosted: true };
  }

  function inventoryValue() {
    return politicsInventoryValue(system.state);
  }

  function weeklyReport() {
    return {
      goal: politicsWeeklyGoal(system.state),
      summary: politicsSummary(system.state),
      nextGoal: politicsNextGoal(system.state),
      efficiency: politicsEfficiency(system.state),
      profitPerRun: politicsProfitPerRun(system.state),
      records: politicsAllRecords(system.state),
    };
  }

  function staffRoster() {
    return POLITICS_STAFF.map((s) => ({
      id: s.id, name: s.name, wage: s.wage, skill: s.skill,
      hired: helpers.indexOf(s.id) >= 0 || system.state.staff.indexOf(s.id) >= 0,
    }));
  }

  function upgradeCatalog() {
    return POLITICS_UPGRADES.map((u) => ({
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

export function createPoliticsMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  function setEvent(eventId) {
    const ev = POLITICS_MARKET_EVENTS.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = POLITICS_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(itemId, basePrice) {
    let price = basePrice;
    price *= politicsMarketEventMult(currentEvent, itemId);
    price *= politicsSeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(itemId, qty) {
    const item = CAMPAIGN_EVENTS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-event' };
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
    for (const item of CAMPAIGN_EVENTS) {
      const mult = politicsMarketEventMult(currentEvent, item.id);
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
    return CAMPAIGN_EVENTS.map((item) => ({
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

export function politicsEventFor(day) {
  return POLITICS_MARKET_EVENTS[day % POLITICS_MARKET_EVENTS.length];
}

export function politicsDailyEventFor(day) {
  return POLITICS_DAILY_EVENTS[day % POLITICS_DAILY_EVENTS.length];
}

export function politicsRankNameFor(rank) {
  const r = POLITICS_RANKS[rank];
  return r ? r.name : 'Unknown';
}

export function politicsTotalValue(state) {
  const inv = politicsInventoryValue(state);
  return Math.round((inv + state.pending + state.earned) * 10) / 10;
}

export function politicsProgressPercent(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 0;
  return Math.round((state.runsDone / total) * 100);
}

export function politicsStaffBonusFor(staffIds, skill) {
  let bonus = 0;
  for (const id of staffIds) {
    const s = POLITICS_STAFF.find((x) => x.id === id);
    if (s && s.skill === skill) bonus += s.bonus;
  }
  return bonus;
}

export function politicsCheapestEntry() {
  let best = CAMPAIGN_EVENTS[0];
  for (const item of CAMPAIGN_EVENTS) {
    if (item.price < best.price) best = item;
  }
  return best;
}

export function politicsPriciestEntry() {
  let best = CAMPAIGN_EVENTS[0];
  for (const item of CAMPAIGN_EVENTS) {
    if (item.price > best.price) best = item;
  }
  return best;
}

export function politicsEntriesByDifficulty(difficulty) {
  return CAMPAIGN_EVENTS.filter((x) => x.difficulty === difficulty).map((x) => x.id);
}

export function politicsEntriesByRarity(maxRarity) {
  return CAMPAIGN_EVENTS.filter((x) => x.rarity <= maxRarity).map((x) => x.id);
}

export function politicsGradeFor(runsDone, earned, visitors) {
  const score = runsDone * 10 + Math.round(earned / 10) + Math.floor(visitors / 10);
  if (score >= 500) return 'S';
  if (score >= 300) return 'A';
  if (score >= 150) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}

export const POLITICS_META = {
  system: 'politics',
  version: '7-B4',
  author: 'builder-4',
  mechanic: 'politics',
  dataCount: CAMPAIGN_EVENTS.length,
  dataName: 'CAMPAIGN_EVENTS',
};
