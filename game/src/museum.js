// Solara Nights - Museum of Wonders (Round 7 mega-rebuild, written fresh).
// The Solara Museum of Wonders: buy forgotten treasures, hang them in
// the right wing, and sell tickets to school trips, tourists and the
// occasional film crew. Rainy weekends fill the halls; a leaky roof
// empties the till. Restore exhibits, hire guides, and keep the
// velvet ropes polished.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.
// Mechanic: venue.

export const EXHIBITS = [
  { id: 'sunken-galleon', name: 'The Sunken Galleon', price: 1200, rarity: 0.08, difficulty: 4, era: 'Age of Sail', wing: 'Maritime Hall', crowd: 5,
    desc: 'A galleon raised from the bay floor, barnacles and all.' },
  { id: 'dino-skeleton', name: 'Titanosaur Skeleton', price: 2400, rarity: 0.05, difficulty: 5, era: 'Jurassic', wing: 'Fossil Wing', crowd: 5,
    desc: 'Forty metres of ancient bone, reassembled rib by rib.' },
  { id: 'crown-jewels', name: 'The Meridian Crown Jewels', price: 3000, rarity: 0.03, difficulty: 5, era: 'Royal Era', wing: 'Treasure Vault', crowd: 4,
    desc: 'Rubies the colour of harbour sunsets, under three layers of glass.' },
  { id: 'moon-rock', name: 'Moon Rock Fragment', price: 1800, rarity: 0.06, difficulty: 4, era: 'Space Age', wing: 'Science Wing', crowd: 4,
    desc: 'A grey pebble that has been further from home than anyone alive.' },
  { id: 'pharaoh-mask', name: 'Mask of Pharaoh Seti', price: 2200, rarity: 0.05, difficulty: 5, era: 'Ancient Egypt', wing: 'Antiquities', crowd: 5,
    desc: 'Gold leaf, lapis eyes, and four thousand years of staring back.' },
  { id: 'robot-1920', name: 'The 1920s Automaton', price: 900, rarity: 0.12, difficulty: 3, era: 'Industrial Age', wing: 'Invention Hall', crowd: 3,
    desc: 'A brass gentleman that still tips his hat when wound up.' },
  { id: 'ocean-mural', name: 'The Great Ocean Mural', price: 700, rarity: 0.15, difficulty: 2, era: 'Modern', wing: 'Art Wing', crowd: 4,
    desc: 'Thirty metres of painted tide, whales and weather.' },
  { id: 'war-letters', name: 'Letters from the Front', price: 450, rarity: 0.2, difficulty: 2, era: 'World Wars', wing: 'History Hall', crowd: 3,
    desc: 'Folded paper, faded ink, and the handwriting of the missing.' },
  { id: 'gem-cave', name: 'The Singing Gem Cave', price: 1500, rarity: 0.07, difficulty: 4, era: 'Natural World', wing: 'Earth Gallery', crowd: 4,
    desc: 'Crystals that hum when the hall goes quiet at closing time.' },
  { id: 'flight-pioneer', name: 'Pioneer Biplane', price: 1100, rarity: 0.1, difficulty: 3, era: 'Early Flight', wing: 'Transport Wing', crowd: 3,
    desc: 'Canvas, wire and courage, hanging from the ceiling by threads.' },
  { id: 'deep-sea', name: 'Creatures of the Deep', price: 800, rarity: 0.14, difficulty: 3, era: 'Natural World', wing: 'Ocean Gallery', crowd: 4,
    desc: 'Glass jars of things the sunlight has never met.' },
  { id: 'city-model', name: 'The City in Miniature', price: 600, rarity: 0.18, difficulty: 2, era: 'Modern', wing: 'City Wing', crowd: 3,
    desc: 'Every street of Solara at one to five hundred, lit from within.' },
];

export const MUSEUM_UPGRADES = [
  { id: 'audio-guide', name: 'Audio Guides', cost: 150, effect: 'audio-plus', desc: 'Visitors linger longer: tours pay a little more.' },
  { id: 'velvet-rope', name: 'Velvet Ropes', cost: 250, effect: 'crowd-plus', desc: 'Crowds flow smoothly instead of bunching at the door.' },
  { id: 'climate-control', name: 'Climate Control', cost: 400, effect: 'preserve', desc: 'Exhibits stop fading in the summer heat.' },
  { id: 'security-cameras', name: 'Security Cameras', cost: 550, effect: 'guard', desc: 'Fewer incidents, calmer insurance people.' },
  { id: 'gift-shop', name: 'Gift Shop', cost: 700, effect: 'shop-plus', desc: 'Postcards and tiny dinosaurs pay the electric bill.' },
  { id: 'cafe', name: 'Museum Cafe', cost: 900, effect: 'cafe-plus', desc: 'Coffee and cake keep visitors inside for hours.' },
  { id: 'planetarium-dome', name: 'Planetarium Dome', cost: 1400, effect: 'dome-plus', desc: 'Star shows sell out every Friday night.' },
  { id: 'grand-hall', name: 'Grand Hall', cost: 2000, effect: 'capacity-plus', desc: 'A new wing: room for two more exhibits.' },
];

export const MUSEUM_RANKS = [
  { level: 0, name: 'Docent', xp: 0, perk: 'Tours pay base rate.' },
  { level: 1, name: 'Curator', xp: 150, perk: '+5% prices, visitors trust the labels.' },
  { level: 2, name: 'Keeper', xp: 400, perk: '+10% prices, school trips double.' },
  { level: 3, name: 'Director', xp: 800, perk: '+15% prices, galas pay double.' },
  { level: 4, name: 'Legend', xp: 1500, perk: '+20% prices, the city funds your dreams.' },
];

export const MUSEUM_STAFF = [
  { id: 'guide-ana', name: 'Ana the Guide', wage: 30, skill: 'tour', bonus: 0.15, desc: 'Knows every story behind every plaque.' },
  { id: 'restorer-bo', name: 'Bo the Restorer', wage: 45, skill: 'restore', bonus: 0.2, desc: 'Can fix a cracked vase with patience and glue.' },
  { id: 'guard-milo', name: 'Milo the Guard', wage: 35, skill: 'guard', bonus: 0.15, desc: 'Stands very still. Notices everything.' },
  { id: 'cleaner-ida', name: 'Ida the Cleaner', wage: 25, skill: 'clean', bonus: 0.1, desc: 'The floors gleam before the doors open.' },
];

export const MUSEUM_DAILY_EVENTS = [
  { id: 'school-trip', name: 'School Trip Day', effect: 'visitors', amount: 40,
    text: 'A busload of schoolkids storms the Fossil Wing.' },
  { id: 'critic-visit', name: 'Critic Visit', effect: 'rep', amount: 2,
    text: 'The city critic loved the new wing. Reputation up.' },
  { id: 'leaky-roof', name: 'Leaky Roof', effect: 'cost', amount: 120,
    text: 'Rain found the old roof. Repairs cost money.' },
  { id: 'donation-day', name: 'Donation Day', effect: 'earn', amount: 200,
    text: 'A quiet benefactor leaves an envelope at the desk.' },
  { id: 'film-crew', name: 'Film Crew', effect: 'earn', amount: 350,
    text: 'A documentary crew pays to film the Crown Jewels.' },
  { id: 'power-cut', name: 'Power Cut', effect: 'cost', amount: 80,
    text: 'The lights die for an hour. An electrician is called.' },
  { id: 'vip-gala', name: 'VIP Gala', effect: 'earn', amount: 500,
    text: 'Black ties, champagne, and a very generous auction.' },
  { id: 'school-holiday', name: 'School Holiday', effect: 'visitors', amount: 60,
    text: 'Families pour in all day long.' },
  { id: 'artifact-loan', name: 'Artifact Loan', effect: 'earn', amount: 250,
    text: 'Another museum borrows a piece and pays handsomely.' },
  { id: 'rainy-weekend', name: 'Rainy Weekend', effect: 'visitors', amount: 25,
    text: 'Everyone in Solara decides the museum is the plan.' },
];

export const MUSEUM_TIPS = [
  { id: 'rain-days', name: 'Rain Days', text: 'Rain fills the halls. Open your best exhibit when the forecast turns grey.' },
  { id: 'first-upgrade', name: 'First Upgrade', text: 'Buy the audio guides before anything else. Cheap, and they pay daily.' },
  { id: 'school-lunch', name: 'School Lunch', text: 'School trips arrive hungry for stories. Guides with the tour skill earn more.' },
  { id: 'glass-matters', name: 'Glass Matters', text: 'The Crown Jewels under clean glass are worth more than a dusty dinosaur.' },
  { id: 'gift-shop-math', name: 'Gift Shop Math', text: 'The gift shop turns one visitor into two sales. Build it early.' },
  { id: 'restore-first', name: 'Restore First', text: 'A restored exhibit draws a bigger crowd than a new dusty one.' },
  { id: 'gala-season', name: 'Gala Season', text: 'Save your best tour for gala week. The rich pay double for a story.' },
  { id: 'quiet-mondays', name: 'Quiet Mondays', text: 'Mondays are slow. Use them to restore, upgrade and plan.' },
];

export const MUSEUM_CHALLENGES = [
  { id: 'first-steps', name: 'First Steps', target: 'runsDone', goal: 3, xp: 40, desc: 'Finish 3 museum runs.' },
  { id: 'regular', name: 'Regular', target: 'runsDone', goal: 10, xp: 90, desc: 'Finish 10 museum runs.' },
  { id: 'collector', name: 'Collector', target: 'itemsOwned', goal: 4, xp: 100, desc: 'Own 4 different museum entries.' },
  { id: 'big-earner', name: 'Big Earner', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from the museum business.' },
  { id: 'crowd-favourite', name: 'Crowd Favourite', target: 'visitors', goal: 200, xp: 110, desc: 'Draw 200 visitors through the museum business.' },
  { id: 'respected', name: 'Respected Name', target: 'reputation', goal: 10, xp: 100, desc: 'Reach 10 reputation in the museum business.' },
  { id: 'best-day', name: 'Best Day Ever', target: 'bestRun', goal: 400, xp: 130, desc: 'Score a single run worth $400 or more.' },
  { id: 'fully-kitted', name: 'Fully Kitted', target: 'upgradesOwned', goal: 6, xp: 150, desc: 'Own 6 upgrades for the museum business.' },
];

export const MUSEUM_ACHIEVEMENTS = [
  { id: 'first-run', name: 'First Run', target: 'runsDone', goal: 1, desc: 'Finish your first museum run.' },
  { id: 'first-sale', name: 'First Payday', target: 'earned', goal: 1, desc: 'Collect your first dollar of museum earnings.' },
  { id: 'ten-runs', name: 'Ten Runs Deep', target: 'runsDone', goal: 10, desc: 'Finish 10 museum runs.' },
  { id: 'thousand-club', name: 'Thousand Club', target: 'earned', goal: 1000, desc: 'Earn $1,000 in total from the museum business.' },
  { id: 'five-hundred-faces', name: 'Five Hundred Faces', target: 'visitors', goal: 500, desc: 'Welcome 500 visitors through the museum business.' },
  { id: 'rank-three', name: 'Rising Star', target: 'rank', goal: 3, desc: 'Reach rank 3 in the museum business.' },
  { id: 'full-shelf', name: 'Full Shelf', target: 'itemsOwned', goal: 8, desc: 'Own 8 different museum entries at once.' },
  { id: 'streak-five', name: 'On A Roll', target: 'bestStreak', goal: 5, desc: 'Build a 5-run streak without a failed museum run.' },
];

export const MUSEUM_LEADERBOARD = [
  { name: 'The National Museum', score: 4200, desc: 'The big one downtown. Marble everything.' },
  { name: 'The Maritime Archive', score: 3100, desc: 'Ships, charts and salty old captains.' },
  { name: 'The Modern Wing', score: 2400, desc: 'White walls, strange art, long queues.' },
  { name: 'The Old Library', score: 1500, desc: 'Books, dust, and a very loyal crowd.' },
  { name: 'You', score: 0, desc: 'Climbing the museum ladder.' },
];

export const MUSEUM_RECORDS = [
  { id: 'biggest-run', name: 'Biggest Run', stat: 'bestRun', unit: '$', desc: 'Best single-run payout.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money earned overall.' },
  { id: 'most-visitors', name: 'Most Visitors', stat: 'visitors', unit: 'people', desc: 'Most visitors welcomed.' },
  { id: 'most-runs', name: 'Most Runs', stat: 'runsDone', unit: 'runs', desc: 'Most runs finished.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'runs', desc: 'Longest run streak.' },
];

export const MUSEUM_MARKET_EVENTS = [
  { id: 'sunken-galleon-surge', name: 'The Sunken Galleon Surge', item: 'sunken-galleon', mult: 1.35, desc: 'Demand for The Sunken Galleon swings hard this week.' },
  { id: 'dino-skeleton-surge', name: 'Titanosaur Skeleton Surge', item: 'dino-skeleton', mult: 0.7, desc: 'Demand for Titanosaur Skeleton swings hard this week.' },
  { id: 'crown-jewels-surge', name: 'The Meridian Crown Jewels Surge', item: 'crown-jewels', mult: 1.35, desc: 'Demand for The Meridian Crown Jewels swings hard this week.' },
  { id: 'moon-rock-surge', name: 'Moon Rock Fragment Surge', item: 'moon-rock', mult: 0.7, desc: 'Demand for Moon Rock Fragment swings hard this week.' },
  { id: 'pharaoh-mask-surge', name: 'Mask of Pharaoh Seti Surge', item: 'pharaoh-mask', mult: 1.35, desc: 'Demand for Mask of Pharaoh Seti swings hard this week.' },
  { id: 'robot-1920-surge', name: 'The 1920s Automaton Surge', item: 'robot-1920', mult: 0.7, desc: 'Demand for The 1920s Automaton swings hard this week.' },
  { id: 'ocean-mural-surge', name: 'The Great Ocean Mural Surge', item: 'ocean-mural', mult: 1.35, desc: 'Demand for The Great Ocean Mural swings hard this week.' },
  { id: 'war-letters-surge', name: 'Letters from the Front Surge', item: 'war-letters', mult: 0.7, desc: 'Demand for Letters from the Front swings hard this week.' },
  { id: 'gem-cave-surge', name: 'The Singing Gem Cave Surge', item: 'gem-cave', mult: 1.35, desc: 'Demand for The Singing Gem Cave swings hard this week.' },
  { id: 'flight-pioneer-surge', name: 'Pioneer Biplane Surge', item: 'flight-pioneer', mult: 0.7, desc: 'Demand for Pioneer Biplane swings hard this week.' },
  { id: 'deep-sea-surge', name: 'Creatures of the Deep Surge', item: 'deep-sea', mult: 1.35, desc: 'Demand for Creatures of the Deep swings hard this week.' },
  { id: 'city-model-surge', name: 'The City in Miniature Surge', item: 'city-model', mult: 0.7, desc: 'Demand for The City in Miniature swings hard this week.' },
];

export const MUSEUM_SEASONS = [
  { id: 'spring-showers', name: 'Spring Showers', mult: 1.1, desc: 'Rain drives everyone indoors, into the museum.' },
  { id: 'summer-crowds', name: 'Summer Crowds', mult: 1.2, desc: 'Tourists fill every wing from open to close.' },
  { id: 'autumn-schools', name: 'Autumn Schools', mult: 1.05, desc: 'School groups book the whole term.' },
  { id: 'winter-quiet', name: 'Winter Quiet', mult: 0.85, desc: 'Cold streets, empty halls, time to restore.' },
];

export const MUSEUM_FACTS = [
  { id: 'fact-sunken-galleon', text: 'The Sunken Galleon: A galleon raised from the bay floor, barnacles and all.' },
  { id: 'fact-dino-skeleton', text: 'Titanosaur Skeleton: Forty metres of ancient bone, reassembled rib by rib.' },
  { id: 'fact-crown-jewels', text: 'The Meridian Crown Jewels: Rubies the colour of harbour sunsets, under three layers of glass.' },
  { id: 'fact-moon-rock', text: 'Moon Rock Fragment: A grey pebble that has been further from home than anyone alive.' },
  { id: 'fact-pharaoh-mask', text: 'Mask of Pharaoh Seti: Gold leaf, lapis eyes, and four thousand years of staring back.' },
  { id: 'fact-robot-1920', text: 'The 1920s Automaton: A brass gentleman that still tips his hat when wound up.' },
  { id: 'fact-ocean-mural', text: 'The Great Ocean Mural: Thirty metres of painted tide, whales and weather.' },
  { id: 'fact-war-letters', text: 'Letters from the Front: Folded paper, faded ink, and the handwriting of the missing.' },
  { id: 'fact-gem-cave', text: 'The Singing Gem Cave: Crystals that hum when the hall goes quiet at closing time.' },
  { id: 'fact-flight-pioneer', text: 'Pioneer Biplane: Canvas, wire and courage, hanging from the ceiling by threads.' },
  { id: 'fact-deep-sea', text: 'Creatures of the Deep: Glass jars of things the sunlight has never met.' },
  { id: 'fact-city-model', text: 'The City in Miniature: Every street of Solara at one to five hundred, lit from within.' },
  { id: 'fact-general-0', text: 'The best museum operators in Solara check their prices every morning before opening.' },
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

export const MUSEUM_NPC_LINES = [
  { id: 'npc-0', text: 'I came all the way across town for the The Sunken Galleon. Worth it.' },
  { id: 'npc-1', text: 'My cousin runs a museum place too, but yours is better. Do not tell him.' },
  { id: 'npc-2', text: 'Is the The Meridian Crown Jewels really as good as everyone says? I am about to find out.' },
  { id: 'npc-3', text: 'I bring my kids here every weekend. They ask for the Moon Rock Fragment by name.' },
  { id: 'npc-4', text: 'You should put the Mask of Pharaoh Seti on a poster. People would come just for that.' },
  { id: 'npc-5', text: 'I heard the The 1920s Automaton here is the best in Solara. The rumour was right.' },
  { id: 'npc-6', text: 'Quiet day today. The The Great Ocean Mural still made my afternoon.' },
  { id: 'npc-7', text: 'I saved up for weeks to try the Letters from the Front. No regrets.' },
  { id: 'npc-8', text: 'The staff told me about the The Singing Gem Cave. Now I tell everyone I meet.' },
  { id: 'npc-9', text: 'I have been to every museum spot in the city. This one wins.' },
  { id: 'npc-10', text: 'One day I want to run a museum place of my own. I am taking notes.' },
  { id: 'npc-11', text: 'The Creatures of the Deep is the reason my friends finally believe my stories.' },
  { id: 'npc-12', text: 'Do you ever get tired of the The Sunken Galleon? I never would.' },
  { id: 'npc-13', text: 'I wrote a review about the Titanosaur Skeleton last night. Five stars, obviously.' },
  { id: 'npc-14', text: 'My grandmother loved the The Meridian Crown Jewels. I come here to remember her.' },
  { id: 'npc-15', text: 'If the Pioneer Biplane gets any better, the whole city will queue around the block.' },
];

export const MUSEUM_GUIDE = [
  { id: 'guide-0', text: 'Open your first museum entry: it costs cash, but it unlocks everything else.' },
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

export function museumRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < MUSEUM_RANKS.length; i++) {
    if (xp >= MUSEUM_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function museumItemById(id) {
  return EXHIBITS.find((x) => x.id === id) || null;
}

export function museumPriceFor(id, drift, rank, upgrades) {
  const item = EXHIBITS.find((x) => x.id === id);
  if (!item) return 0;
  let price = item.price;
  price *= 1 + (drift[id] || 0);
  price *= 1 + rank * 0.05;
  if (upgrades && upgrades.length >= 3) price *= 1.1;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function museumCapacityFor(rank, upgrades) {
  let cap = 3 + rank;
  if (upgrades && upgrades.indexOf('grand-hall') >= 0) cap += 2;
  return cap;
}

export function museumPayoutFor(item, rank, upgrades, weather, boosted) {
  let mult = 0.6 + rank * 0.1 + (boosted ? 0.3 : 0);
  if (weather === 'rain') mult *= 1.2;
  if (weather === 'sunny') mult *= 1.0;
  if (weather === 'storm') mult *= 0.7;
  if (upgrades && upgrades.length >= 4) mult *= 1.15;
  return Math.max(5, Math.round(item.price * mult));
}

export function museumCrowdFor(item, rank, weather) {
  let crowd = 10 + item.difficulty * 8 + rank * 5;
  if (weather === 'rain') crowd = Math.round(crowd * 1.2);
  if (weather === 'sunny') crowd = Math.round(crowd * 1.0);
  if (weather === 'storm') crowd = Math.round(crowd * 0.5);
  return Math.max(1, crowd);
}

export function museumUpgradeById(id) {
  return MUSEUM_UPGRADES.find((x) => x.id === id) || null;
}

export function museumStaffById(id) {
  return MUSEUM_STAFF.find((x) => x.id === id) || null;
}

export function museumEventById(id) {
  return MUSEUM_DAILY_EVENTS.find((x) => x.id === id) || null;
}

export function museumTipFor(day) {
  return MUSEUM_TIPS[day % MUSEUM_TIPS.length];
}

export function museumFactFor(day) {
  return MUSEUM_FACTS[day % MUSEUM_FACTS.length];
}

export function museumNpcLineFor(day) {
  return MUSEUM_NPC_LINES[day % MUSEUM_NPC_LINES.length];
}

export function museumGuideStep(step) {
  return MUSEUM_GUIDE[step] || null;
}

export function museumSeasonMult(seasonId) {
  const s = MUSEUM_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function museumMarketEventMult(eventId, itemId) {
  const ev = MUSEUM_MARKET_EVENTS.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.item === itemId ? ev.mult : 1;
}

export function museumWeeklyGoal(state) {
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

export function museumEfficiency(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 100;
  return Math.round((state.runsDone / total) * 100);
}

export function museumProfitPerRun(state) {
  if (state.runsDone === 0) return 0;
  return Math.round((state.earned / state.runsDone) * 10) / 10;
}

export function museumInventoryValue(state) {
  let total = 0;
  for (const id of Object.keys(state.owned || {})) {
    const item = EXHIBITS.find((x) => x.id === id);
    if (item) total += item.price * (state.levels[id] || 1);
  }
  return Math.round(total * 10) / 10;
}

export function museumSummary(state) {
  const rankName = MUSEUM_RANKS[state.rank] ? MUSEUM_RANKS[state.rank].name : 'Unknown';
  return 'Museum ' + rankName + ': ' + state.runsDone + ' runs, '
    + state.itemsOwned + ' entries, $' + Math.round(state.earned)
    + ' earned, ' + state.visitors + ' visitors.';
}

export function museumNextGoal(state) {
  if (state.itemsOwned < 1) return 'Open your first entry.';
  if (state.runsDone < 5) return 'Finish 5 runs.';
  if (state.earned < 500) return 'Earn $500 in total.';
  if (state.rank < 2) return 'Reach rank ' + MUSEUM_RANKS[2].name + '.';
  if (state.upgradesOwned < 4) return 'Own 4 upgrades.';
  return 'Become a Museum legend.';
}

export function museumRecordFor(recordId, state) {
  const r = MUSEUM_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function museumAllRecords(state) {
  return MUSEUM_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function museumLeaderboardWith(playerScore) {
  const board = MUSEUM_LEADERBOARD.map((e) => ({
    name: e.name, score: e.name === 'You' ? playerScore : e.score, desc: e.desc,
  }));
  board.sort((a, b) => b.score - a.score);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, score: e.score, desc: e.desc }));
}

export function museumSeasonReport(state, seasonId) {
  const mult = museumSeasonMult(seasonId);
  return EXHIBITS.map((item) => ({
    id: item.id,
    name: item.name,
    basePrice: item.price,
    seasonPrice: Math.round(item.price * mult * 10) / 10,
    owned: !!state.owned[item.id],
    level: state.levels[item.id] || 0,
  }));
}

export function museumChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return {
    id: challenge.id, name: challenge.name, have: Math.floor(v),
    goal: challenge.goal, done: v >= challenge.goal, xp: challenge.xp,
  };
}

export function museumBestEntryFor(rank) {
  let best = null;
  let bestScore = -1;
  for (const item of EXHIBITS) {
    if (item.difficulty > rank + 2) continue;
    const score = item.price * (1 + item.rarity * 2) / item.difficulty;
    if (score > bestScore) { bestScore = score; best = item; }
  }
  return best;
}

export function createMuseumSystem(ctx) {
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
  for (const item of EXHIBITS) {
    state.drift[item.id] = 0;
    state.prices[item.id] = item.price;
  }

  function refreshRank() {
    const r = museumRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log('Museum rank up: ' + MUSEUM_RANKS[r].name + ' - ' + MUSEUM_RANKS[r].perk);
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
      const s = MUSEUM_STAFF.find((x) => x.id === id);
      if (s && s.skill === skill) bonus += s.bonus;
    }
    return bonus;
  }

  function driftPrices() {
    for (const item of EXHIBITS) {
      const roll = rng();
      if (roll < 0.35) {
        const change = Math.round((rng() * 0.24 - 0.12) * 100) / 100;
        state.drift[item.id] = Math.round((state.drift[item.id] + change) * 100) / 100;
        state.prices[item.id] = Math.max(1, Math.round(item.price * (1 + state.drift[item.id]) * 10) / 10);
      }
    }
  }

  function openExhibit(id) {
    const item = EXHIBITS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-exhibit' };
    if (state.owned[id]) return { ok: false, reason: 'already-owned' };
    if (state.itemsOwned >= museumCapacityFor(state.rank, state.upgrades)) {
      return { ok: false, reason: 'capacity-full', cap: museumCapacityFor(state.rank, state.upgrades) };
    }
    if (state.rank < Math.max(0, item.difficulty - 2)) {
      return { ok: false, reason: 'rank-too-low', need: Math.max(0, item.difficulty - 2) };
    }
    const cost = museumPriceFor(id, state.drift, 0, []);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned[id] = 1;
    state.levels[id] = 1;
    state.itemsOwned += 1;
    gainXp(10);
    log('Opened ' + item.name + ' for $' + cost + '. Welcome to the Museum business.');
    return { ok: true, id, cost, name: item.name };
  }

  function hostTour(id) {
    const item = EXHIBITS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-exhibit' };
    if (state.active) return { ok: false, reason: 'already-running', active: state.activeId };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned' };
    state.active = 'run';
    state.activeId = id;
    state.activeTimer = 30 + item.difficulty * 10;
    state.activeBase = item.price;
    log('Tour started: ' + item.name + ' is under way.');
    return { ok: true, id, seconds: state.activeTimer };
  }

  function settleRun() {
    const id = state.activeId;
    const item = EXHIBITS.find((x) => x.id === id);
    state.active = null;
    state.activeId = null;
    state.activeTimer = 0;
    if (!item) return;
    const cond = weatherCond();
    const boosted = !!state.boosted[id];
    const payout = museumPayoutFor(item, state.rank, state.upgrades, cond, boosted);
    const crowd = museumCrowdFor(item, state.rank, cond);
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
    log('Tour finished at ' + item.name + ': ' + crowd + ' visitors, $' + payout + ' in the till.');
  }

  function collectTicketSales() {
    if (state.pending <= 0) return { ok: false, reason: 'nothing-pending' };
    const amount = state.pending;
    state.pending = 0;
    state.earned += amount;
    addCash(amount);
    log('Collected $' + amount + ' from the till.');
    return { ok: true, amount };
  }

  function sellSouvenir(id, qty) {
    const item = EXHIBITS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-exhibit' };
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

  function restoreExhibit(id) {
    const item = EXHIBITS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-exhibit' };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned' };
    if (getCash() < 40) return { ok: false, reason: 'not-enough-cash', cost: 40 };
    addCash(-40);
    state.spent += 40;
    state.boosted[id] = true;
    state.reputation += 1;
    gainXp(10);
    log('Restoration team on ' + item.name + ' is boosted for its next run.');
    return { ok: true, id, boosted: true };
  }

  function buyUpgrade(id) {
    const u = MUSEUM_UPGRADES.find((x) => x.id === id);
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
    const s = MUSEUM_STAFF.find((x) => x.id === id);
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
    const item = EXHIBITS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-exhibit' };
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
    return EXHIBITS.map((item) => ({
      id: item.id,
      name: item.name,
      price: museumPriceFor(item.id, state.drift, state.rank, state.upgrades),
      basePrice: item.price,
      drift: state.drift[item.id],
      owned: !!state.owned[item.id],
      level: state.levels[item.id] || 0,
      difficulty: item.difficulty,
      rarity: item.rarity,
    }));
  }

  function listItems() {
    return EXHIBITS.map((item) => ({
      id: item.id, name: item.name, price: item.price,
      difficulty: item.difficulty, rarity: item.rarity, desc: item.desc,
      owned: !!state.owned[item.id],
    }));
  }

  function info(id) {
    const item = EXHIBITS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-exhibit' };
    return {
      ok: true, item,
      owned: !!state.owned[id],
      level: state.levels[id] || 0,
      price: museumPriceFor(id, state.drift, state.rank, state.upgrades),
      holdings: state.holdings[id] || 0,
    };
  }

  function dailyEvent() {
    const idx = Math.floor(rng() * MUSEUM_DAILY_EVENTS.length);
    const ev = MUSEUM_DAILY_EVENTS[idx];
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
    for (const item of EXHIBITS) {
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
      name: 'Museum',
      mechanic: MECH,
      rank: MUSEUM_RANKS[state.rank] ? MUSEUM_RANKS[state.rank].name : 'Unknown',
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
      capacity: museumCapacityFor(state.rank, state.upgrades),
      hour: getHour(),
      day: getDay(),
    };
  }

  function hudLine() {
    if (state.active) {
      return 'Museum: running ' + state.activeId + ' - ' + Math.max(0, Math.ceil(state.activeTimer)) + 's left';
    }
    if (state.pending > 0) {
      return 'Museum: $' + Math.round(state.pending) + ' waiting in the till';
    }
    if (state.itemsOwned > 0) {
      return 'Museum: ' + state.itemsOwned + ' entries, $' + Math.round(state.earned) + ' earned';
    }
    return '';
  }

  function interact(action, a, b) {
    if (!action || action === 'status') return { ok: true, stats: stats(), hint: 'open <exhibit> to hang it, run <exhibit> to host a tour, collect to empty the till' };
    if (action === 'open') return openExhibit(a);
    if (action === 'run') return hostTour(a);
    if (action === 'collect') return collectTicketSales();
    if (action === 'sell') return sellSouvenir(a, b);
    if (action === 'upgrade') return buyUpgrade(a);
    if (action === 'levelup') return upgradeItem(a);
    if (action === 'hire') return hireStaff(a);
    if (action === 'fire') return fireStaff(a);
    if (action === 'special') return restoreExhibit(a, b);
    if (action === 'info') return info(a);
    if (action === 'prices') return { ok: true, prices: priceBoard() };
    if (action === 'list') return { ok: true, items: listItems() };
    if (action === 'event') return dailyEvent();
    return { ok: false, reason: 'unknown-action', action };
  }

  return {
    name: 'Museum',
    state,
    gainXp,
    openExhibit,
    hostTour,
    collectTicketSales,
    sellSouvenir,
    restoreExhibit,
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
    open: openExhibit,
    run: hostTour,
    collect: collectTicketSales,
    sell: sellSouvenir,
    upgrade: buyUpgrade,
    hire: hireStaff,
  };
}

export function createMuseumExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function challenges() {
    return MUSEUM_CHALLENGES.map((ch) => museumChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = MUSEUM_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.indexOf(id) >= 0) return { ok: false, reason: 'already-claimed' };
    const p = museumChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    system.state.challengesClaimed.push(id);
    if (typeof system.gainXp === 'function') system.gainXp(ch.xp);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return MUSEUM_ACHIEVEMENTS.map((a) => ({
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
    const h = MUSEUM_STAFF.find((x) => x.id === id);
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
      const h = MUSEUM_STAFF.find((x) => x.id === id);
      if (h) due += h.wage;
    }
    helperWagesPaid += due;
    system.state.wagesPaid += due;
    return { due, helpers: helpers.slice(), totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    let bonus = 0;
    for (const id of helpers) {
      const h = MUSEUM_STAFF.find((x) => x.id === id);
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
    const item = EXHIBITS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-exhibit' };
    system.state.boosted[id] = true;
    return { ok: true, id, boosted: true };
  }

  function inventoryValue() {
    return museumInventoryValue(system.state);
  }

  function weeklyReport() {
    return {
      goal: museumWeeklyGoal(system.state),
      summary: museumSummary(system.state),
      nextGoal: museumNextGoal(system.state),
      efficiency: museumEfficiency(system.state),
      profitPerRun: museumProfitPerRun(system.state),
      records: museumAllRecords(system.state),
    };
  }

  function staffRoster() {
    return MUSEUM_STAFF.map((s) => ({
      id: s.id, name: s.name, wage: s.wage, skill: s.skill,
      hired: helpers.indexOf(s.id) >= 0 || system.state.staff.indexOf(s.id) >= 0,
    }));
  }

  function upgradeCatalog() {
    return MUSEUM_UPGRADES.map((u) => ({
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

export function createMuseumMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  function setEvent(eventId) {
    const ev = MUSEUM_MARKET_EVENTS.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = MUSEUM_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(itemId, basePrice) {
    let price = basePrice;
    price *= museumMarketEventMult(currentEvent, itemId);
    price *= museumSeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(itemId, qty) {
    const item = EXHIBITS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-exhibit' };
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
    for (const item of EXHIBITS) {
      const mult = museumMarketEventMult(currentEvent, item.id);
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
    return EXHIBITS.map((item) => ({
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

export function museumEventFor(day) {
  return MUSEUM_MARKET_EVENTS[day % MUSEUM_MARKET_EVENTS.length];
}

export function museumDailyEventFor(day) {
  return MUSEUM_DAILY_EVENTS[day % MUSEUM_DAILY_EVENTS.length];
}

export function museumRankNameFor(rank) {
  const r = MUSEUM_RANKS[rank];
  return r ? r.name : 'Unknown';
}

export function museumTotalValue(state) {
  const inv = museumInventoryValue(state);
  return Math.round((inv + state.pending + state.earned) * 10) / 10;
}

export function museumProgressPercent(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 0;
  return Math.round((state.runsDone / total) * 100);
}

export function museumStaffBonusFor(staffIds, skill) {
  let bonus = 0;
  for (const id of staffIds) {
    const s = MUSEUM_STAFF.find((x) => x.id === id);
    if (s && s.skill === skill) bonus += s.bonus;
  }
  return bonus;
}

export function museumCheapestEntry() {
  let best = EXHIBITS[0];
  for (const item of EXHIBITS) {
    if (item.price < best.price) best = item;
  }
  return best;
}

export function museumPriciestEntry() {
  let best = EXHIBITS[0];
  for (const item of EXHIBITS) {
    if (item.price > best.price) best = item;
  }
  return best;
}

export function museumEntriesByDifficulty(difficulty) {
  return EXHIBITS.filter((x) => x.difficulty === difficulty).map((x) => x.id);
}

export function museumEntriesByRarity(maxRarity) {
  return EXHIBITS.filter((x) => x.rarity <= maxRarity).map((x) => x.id);
}

export function museumGradeFor(runsDone, earned, visitors) {
  const score = runsDone * 10 + Math.round(earned / 10) + Math.floor(visitors / 10);
  if (score >= 500) return 'S';
  if (score >= 300) return 'A';
  if (score >= 150) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}

export const MUSEUM_META = {
  system: 'museum',
  version: '7-B4',
  author: 'builder-4',
  mechanic: 'venue',
  dataCount: EXHIBITS.length,
  dataName: 'EXHIBITS',
};
