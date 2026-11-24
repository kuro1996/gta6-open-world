// Solara Nights - Comedy Club (Round 7 mega-rebuild, written fresh).
// The Chuckle Cellar comedy club: book acts, fill the brick-walled
// room, and pray the hecklers stay funny. A good night is laughter
// you can feel in the floorboards; a bad night is silence and one
// man coughing. Open mics find the next star, headliners pay the
// rent, and the drink menu quietly does the rest.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.
// Mechanic: venue.

export const COMEDY_ACTS = [
  { id: 'nervous-ned', name: "Nervous Ned's First Mic", price: 100, rarity: 0.35, difficulty: 1, style: 'Awkward charm', duration: 5, crowd: 2,
    desc: 'Shaking hands, brave heart, one great joke about pigeons.' },
  { id: 'sarcastic-sue', name: 'Sarcastic Sue', price: 400, rarity: 0.2, difficulty: 2, style: 'Deadpan', duration: 15, crowd: 3,
    desc: 'She has never smiled on stage. The crowd loves her for it.' },
  { id: 'two-headed-duo', name: 'The Two-Headed Duo', price: 650, rarity: 0.15, difficulty: 3, style: 'Double act', duration: 20, crowd: 4,
    desc: 'Two brains, one microphone, constant interruptions.' },
  { id: 'yes-and-troupe', name: 'The Yes-And Troupe', price: 800, rarity: 0.12, difficulty: 3, style: 'Improv', duration: 25, crowd: 4,
    desc: 'They build a whole play from one word shouted by a stranger.' },
  { id: 'grumpy-gus', name: 'Grumpy Gus', price: 500, rarity: 0.18, difficulty: 2, style: 'Curmudgeon', duration: 15, crowd: 3,
    desc: 'Hates everything, especially the audience. They adore him.' },
  { id: 'musical-mabel', name: 'Musical Mabel', price: 750, rarity: 0.13, difficulty: 3, style: 'Songs and jokes', duration: 20, crowd: 4,
    desc: 'A ukulele, a sharp tongue, and choruses the room sings along to.' },
  { id: 'prop-pete', name: 'Prop Pete', price: 550, rarity: 0.16, difficulty: 2, style: 'Prop comedy', duration: 15, crowd: 3,
    desc: 'A suitcase of impossible objects and perfect timing.' },
  { id: 'dark-dana', name: 'Dark Dana', price: 900, rarity: 0.1, difficulty: 4, style: 'Dark humor', duration: 20, crowd: 3,
    desc: 'Jokes so dark the room laughs and then feels guilty.' },
  { id: 'storyteller-sam', name: 'Storyteller Sam', price: 700, rarity: 0.14, difficulty: 3, style: 'Long tales', duration: 25, crowd: 4,
    desc: 'One story, twenty minutes, and a punchline nobody sees coming.' },
  { id: 'headliner-hugo', name: 'Headliner Hugo', price: 2000, rarity: 0.05, difficulty: 5, style: 'Arena comic', duration: 40, crowd: 5,
    desc: 'The name on the marquee. The reason the room sells out.' },
  { id: 'roast-ralph', name: 'Roast Ralph', price: 1100, rarity: 0.08, difficulty: 4, style: 'Roast master', duration: 25, crowd: 4,
    desc: 'He will roast the front row, the mayor, and himself, in that order.' },
  { id: 'mime-molly', name: 'Mime Molly', price: 300, rarity: 0.25, difficulty: 1, style: 'Silent act', duration: 10, crowd: 2,
    desc: 'Not a word spoken. The invisible box routine kills every time.' },
];

export const COMEDY_UPGRADES = [
  { id: 'brick-wall', name: 'Brick Wall Backdrop', cost: 120, effect: 'room-plus', desc: 'The classic wall. Every comic photographs better against it.' },
  { id: 'spotlight', name: 'Spotlight Rig', cost: 200, effect: 'stage-plus', desc: 'One perfect circle of light. Instant drama.' },
  { id: 'sound-system', name: 'Sound System', cost: 350, effect: 'sound-plus', desc: 'Every mumble in the back row becomes a punchline.' },
  { id: 'drink-menu', name: 'Drink Menu', cost: 300, effect: 'bar-plus', desc: 'Clever cocktails named after the acts. They sell themselves.' },
  { id: 'green-room', name: 'Green Room', cost: 500, effect: 'acts-plus', desc: 'Comics arrive relaxed and stay for the second show.' },
  { id: 'marquee-sign', name: 'Marquee Sign', cost: 700, effect: 'crowd-plus', desc: 'The name in lights pulls walk-ins off the street.' },
  { id: 'late-license', name: 'Late License', cost: 1000, effect: 'hours-plus', desc: 'The last show runs past midnight. So does the bar.' },
  { id: 'grand-stage', name: 'Grand Stage', cost: 1600, effect: 'capacity-plus', desc: 'A bigger stage for bigger names and bigger rooms.' },
];

export const COMEDY_RANKS = [
  { level: 0, name: 'Open Mic', xp: 0, perk: 'Shows pay base rate.' },
  { level: 1, name: 'Regular', xp: 150, perk: '+5% prices, the room knows your name.' },
  { level: 2, name: 'Club Favorite', xp: 400, perk: '+10% prices, Friday nights sell out.' },
  { level: 3, name: 'Headliner', xp: 800, perk: '+15% prices, agents return your calls.' },
  { level: 4, name: 'Comedy Legend', xp: 1500, perk: '+20% prices, your marquee never goes dark.' },
];

export const COMEDY_STAFF = [
  { id: 'emcee-ed', name: 'Ed the Emcee', wage: 30, skill: 'host', bonus: 0.15, desc: 'Warms the room in ninety seconds flat.' },
  { id: 'bartender-bea', name: 'Bea the Bartender', wage: 35, skill: 'bar', bonus: 0.2, desc: 'Pours fast, remembers orders, laughs at the right jokes.' },
  { id: 'sound-sam', name: 'Sam the Sound Tech', wage: 30, skill: 'sound', bonus: 0.15, desc: 'The mic is always on. The feedback never is.' },
  { id: 'door-dee', name: 'Dee the Door', wage: 25, skill: 'door', bonus: 0.1, desc: 'Counts heads, spots trouble, welcomes regulars by name.' },
];

export const COMEDY_DAILY_EVENTS = [
  { id: 'heckler-night', name: 'Heckler Night', effect: 'visitors', amount: 30,
    text: 'One loud heckler becomes the best part of the show.' },
  { id: 'critic-front-row', name: 'Critic in the Front Row', effect: 'rep', amount: 2,
    text: 'The city critic laughs out loud. Twice.' },
  { id: 'sold-out-friday', name: 'Sold-Out Friday', effect: 'visitors', amount: 70,
    text: 'Not a seat left by seven in the evening.' },
  { id: 'mic-failure', name: 'Mic Failure', effect: 'cost', amount: 60,
    text: 'The mic dies mid-punchline. A spare is fetched, slowly.' },
  { id: 'surprise-celebrity', name: 'Surprise Celebrity', effect: 'earn', amount: 450,
    text: 'A famous comic drops in unannounced. Chaos, joy, queues.' },
  { id: 'drink-spill', name: 'Drink Spill', effect: 'cost', amount: 50,
    text: 'A tray of cocktails meets the front row. Apologies and towels.' },
  { id: 'quiet-monday', name: 'Quiet Monday', effect: 'xp', amount: 15,
    text: 'Twelve people, one dog, and a very brave open mic.' },
  { id: 'radio-plug', name: 'Radio Plug', effect: 'visitors', amount: 45,
    text: 'The morning show mentions the club. Phones ring all day.' },
  { id: 'bachelor-party', name: 'Bachelor Party', effect: 'earn', amount: 280,
    text: 'Fifteen loud guests, one nervous groom, big bar tab.' },
  { id: 'viral-clip', name: 'Viral Clip', effect: 'earn', amount: 320,
    text: 'A thirty-second clip of last night explodes online.' },
];

export const COMEDY_TIPS = [
  { id: 'heckler-gold', name: 'Heckler Gold', text: 'A good comic turns a heckler into the best five minutes of the night.' },
  { id: 'open-mic-farm', name: 'Open Mic Farm', text: 'Cheap open mics find tomorrow\'s headliners. Book them often.' },
  { id: 'bar-math', name: 'Bar Math', text: 'The bar earns while the jokes land. A good drink menu is a second show.' },
  { id: 'friday-peak', name: 'Friday Peak', text: 'Save the headliner for Friday. The room is fullest and loudest.' },
  { id: 'mic-check', name: 'Mic Check', text: 'Check the mic before the doors open. Silence is the only unfunny thing.' },
  { id: 'front-row', name: 'Front Row', text: 'Seat the brave ones up front. Roasts land better on volunteers.' },
  { id: 'late-show', name: 'Late Show', text: 'The late license turns one night into two paydays.' },
  { id: 'clip-it', name: 'Clip It', text: 'Film the best bit every night. One viral clip fills a month of seats.' },
];

export const COMEDY_CHALLENGES = [
  { id: 'first-steps', name: 'First Steps', target: 'runsDone', goal: 3, xp: 40, desc: 'Finish 3 comedy club runs.' },
  { id: 'regular', name: 'Regular', target: 'runsDone', goal: 10, xp: 90, desc: 'Finish 10 comedy club runs.' },
  { id: 'collector', name: 'Collector', target: 'itemsOwned', goal: 4, xp: 100, desc: 'Own 4 different comedy club entries.' },
  { id: 'big-earner', name: 'Big Earner', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from the comedy club business.' },
  { id: 'crowd-favourite', name: 'Crowd Favourite', target: 'visitors', goal: 200, xp: 110, desc: 'Draw 200 visitors through the comedy club business.' },
  { id: 'respected', name: 'Respected Name', target: 'reputation', goal: 10, xp: 100, desc: 'Reach 10 reputation in the comedy club business.' },
  { id: 'best-day', name: 'Best Day Ever', target: 'bestRun', goal: 400, xp: 130, desc: 'Score a single run worth $400 or more.' },
  { id: 'fully-kitted', name: 'Fully Kitted', target: 'upgradesOwned', goal: 6, xp: 150, desc: 'Own 6 upgrades for the comedy club business.' },
];

export const COMEDY_ACHIEVEMENTS = [
  { id: 'first-run', name: 'First Run', target: 'runsDone', goal: 1, desc: 'Finish your first comedy club run.' },
  { id: 'first-sale', name: 'First Payday', target: 'earned', goal: 1, desc: 'Collect your first dollar of comedy club earnings.' },
  { id: 'ten-runs', name: 'Ten Runs Deep', target: 'runsDone', goal: 10, desc: 'Finish 10 comedy club runs.' },
  { id: 'thousand-club', name: 'Thousand Club', target: 'earned', goal: 1000, desc: 'Earn $1,000 in total from the comedy club business.' },
  { id: 'five-hundred-faces', name: 'Five Hundred Faces', target: 'visitors', goal: 500, desc: 'Welcome 500 visitors through the comedy club business.' },
  { id: 'rank-three', name: 'Rising Star', target: 'rank', goal: 3, desc: 'Reach rank 3 in the comedy club business.' },
  { id: 'full-shelf', name: 'Full Shelf', target: 'itemsOwned', goal: 8, desc: 'Own 8 different comedy club entries at once.' },
  { id: 'streak-five', name: 'On A Roll', target: 'bestStreak', goal: 5, desc: 'Build a 5-run streak without a failed comedy club run.' },
];

export const COMEDY_LEADERBOARD = [
  { name: 'The Laugh Factory', score: 4200, desc: 'Big room, big names, big queues.' },
  { name: 'Chuckle Hut', score: 3100, desc: 'Small, scruffy, and strangely beloved.' },
  { name: 'The Joke Joint', score: 2400, desc: 'Cheap beer, brave comics, loyal crowd.' },
  { name: 'Basement Banter', score: 1500, desc: 'Underground in every sense of the word.' },
  { name: 'You', score: 0, desc: 'Climbing the comedy club ladder.' },
];

export const COMEDY_RECORDS = [
  { id: 'biggest-run', name: 'Biggest Run', stat: 'bestRun', unit: '$', desc: 'Best single-run payout.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money earned overall.' },
  { id: 'most-visitors', name: 'Most Visitors', stat: 'visitors', unit: 'people', desc: 'Most visitors welcomed.' },
  { id: 'most-runs', name: 'Most Runs', stat: 'runsDone', unit: 'runs', desc: 'Most runs finished.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'runs', desc: 'Longest run streak.' },
];

export const COMEDY_MARKET_EVENTS = [
  { id: 'nervous-ned-surge', name: "Nervous Ned's First Mic Surge", item: 'nervous-ned', mult: 1.35, desc: "Demand for Nervous Ned's First Mic swings hard this week." },
  { id: 'sarcastic-sue-surge', name: 'Sarcastic Sue Surge', item: 'sarcastic-sue', mult: 0.7, desc: 'Demand for Sarcastic Sue swings hard this week.' },
  { id: 'two-headed-duo-surge', name: 'The Two-Headed Duo Surge', item: 'two-headed-duo', mult: 1.35, desc: 'Demand for The Two-Headed Duo swings hard this week.' },
  { id: 'yes-and-troupe-surge', name: 'The Yes-And Troupe Surge', item: 'yes-and-troupe', mult: 0.7, desc: 'Demand for The Yes-And Troupe swings hard this week.' },
  { id: 'grumpy-gus-surge', name: 'Grumpy Gus Surge', item: 'grumpy-gus', mult: 1.35, desc: 'Demand for Grumpy Gus swings hard this week.' },
  { id: 'musical-mabel-surge', name: 'Musical Mabel Surge', item: 'musical-mabel', mult: 0.7, desc: 'Demand for Musical Mabel swings hard this week.' },
  { id: 'prop-pete-surge', name: 'Prop Pete Surge', item: 'prop-pete', mult: 1.35, desc: 'Demand for Prop Pete swings hard this week.' },
  { id: 'dark-dana-surge', name: 'Dark Dana Surge', item: 'dark-dana', mult: 0.7, desc: 'Demand for Dark Dana swings hard this week.' },
  { id: 'storyteller-sam-surge', name: 'Storyteller Sam Surge', item: 'storyteller-sam', mult: 1.35, desc: 'Demand for Storyteller Sam swings hard this week.' },
  { id: 'headliner-hugo-surge', name: 'Headliner Hugo Surge', item: 'headliner-hugo', mult: 0.7, desc: 'Demand for Headliner Hugo swings hard this week.' },
  { id: 'roast-ralph-surge', name: 'Roast Ralph Surge', item: 'roast-ralph', mult: 1.35, desc: 'Demand for Roast Ralph swings hard this week.' },
  { id: 'mime-molly-surge', name: 'Mime Molly Surge', item: 'mime-molly', mult: 0.7, desc: 'Demand for Mime Molly swings hard this week.' },
];

export const COMEDY_SEASONS = [
  { id: 'spring-laughs', name: 'Spring Laughs', mult: 1.1, desc: 'New acts bloom and the room feels fresh.' },
  { id: 'summer-festival', name: 'Summer Festival', mult: 1.2, desc: 'Festival crowds spill into every late show.' },
  { id: 'autumn-nights', name: 'Autumn Nights', mult: 1.05, desc: 'Long dark evenings, full warm rooms.' },
  { id: 'winter-specials', name: 'Winter Specials', mult: 1.15, desc: 'Holiday shows sell out weeks ahead.' },
];

export const COMEDY_FACTS = [
  { id: 'fact-nervous-ned', text: "Nervous Ned's First Mic: Shaking hands, brave heart, one great joke about pigeons." },
  { id: 'fact-sarcastic-sue', text: 'Sarcastic Sue: She has never smiled on stage. The crowd loves her for it.' },
  { id: 'fact-two-headed-duo', text: 'The Two-Headed Duo: Two brains, one microphone, constant interruptions.' },
  { id: 'fact-yes-and-troupe', text: 'The Yes-And Troupe: They build a whole play from one word shouted by a stranger.' },
  { id: 'fact-grumpy-gus', text: 'Grumpy Gus: Hates everything, especially the audience. They adore him.' },
  { id: 'fact-musical-mabel', text: 'Musical Mabel: A ukulele, a sharp tongue, and choruses the room sings along to.' },
  { id: 'fact-prop-pete', text: 'Prop Pete: A suitcase of impossible objects and perfect timing.' },
  { id: 'fact-dark-dana', text: 'Dark Dana: Jokes so dark the room laughs and then feels guilty.' },
  { id: 'fact-storyteller-sam', text: 'Storyteller Sam: One story, twenty minutes, and a punchline nobody sees coming.' },
  { id: 'fact-headliner-hugo', text: 'Headliner Hugo: The name on the marquee. The reason the room sells out.' },
  { id: 'fact-roast-ralph', text: 'Roast Ralph: He will roast the front row, the mayor, and himself, in that order.' },
  { id: 'fact-mime-molly', text: 'Mime Molly: Not a word spoken. The invisible box routine kills every time.' },
  { id: 'fact-general-0', text: 'The best comedy club operators in Solara check their prices every morning before opening.' },
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

export const COMEDY_NPC_LINES = [
  { id: 'npc-0', text: "I came all the way across town for the Nervous Ned's First Mic. Worth it." },
  { id: 'npc-1', text: 'My cousin runs a comedy club place too, but yours is better. Do not tell him.' },
  { id: 'npc-2', text: 'Is the The Two-Headed Duo really as good as everyone says? I am about to find out.' },
  { id: 'npc-3', text: 'I bring my kids here every weekend. They ask for the Sarcastic Sue by name.' },
  { id: 'npc-4', text: 'You should put the The Yes-And Troupe on a poster. People would come just for that.' },
  { id: 'npc-5', text: 'I heard the Grumpy Gus here is the best in Solara. The rumour was right.' },
  { id: 'npc-6', text: 'Quiet day today. The Musical Mabel still made my afternoon.' },
  { id: 'npc-7', text: 'I saved up for weeks to try the Prop Pete. No regrets.' },
  { id: 'npc-8', text: 'The staff told me about the Dark Dana. Now I tell everyone I meet.' },
  { id: 'npc-9', text: 'I have been to every comedy club spot in the city. This one wins.' },
  { id: 'npc-10', text: 'One day I want to run a comedy club place of my own. I am taking notes.' },
  { id: 'npc-11', text: 'The Storyteller Sam is the reason my friends finally believe my stories.' },
  { id: 'npc-12', text: 'Do you ever get tired of the Headliner Hugo? I never would.' },
  { id: 'npc-13', text: 'I wrote a review about the Roast Ralph last night. Five stars, obviously.' },
  { id: 'npc-14', text: 'My grandmother loved the Mime Molly. I come here to remember her.' },
  { id: 'npc-15', text: 'If the Nervous Ned\'s First Mic gets any better, the whole city will queue around the block.' },
];

export const COMEDY_GUIDE = [
  { id: 'guide-0', text: 'Open your first comedy club entry: it costs cash, but it unlocks everything else.' },
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

export function comedyRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < COMEDY_RANKS.length; i++) {
    if (xp >= COMEDY_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function comedyItemById(id) {
  return COMEDY_ACTS.find((x) => x.id === id) || null;
}

export function comedyPriceFor(id, drift, rank, upgrades) {
  const item = COMEDY_ACTS.find((x) => x.id === id);
  if (!item) return 0;
  let price = item.price;
  price *= 1 + (drift[id] || 0);
  price *= 1 + rank * 0.05;
  if (upgrades && upgrades.length >= 3) price *= 1.1;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function comedyCapacityFor(rank, upgrades) {
  let cap = 3 + rank;
  if (upgrades && upgrades.indexOf('grand-stage') >= 0) cap += 2;
  return cap;
}

export function comedyPayoutFor(item, rank, upgrades, weather, boosted) {
  let mult = 0.6 + rank * 0.1 + (boosted ? 0.3 : 0);
  if (weather === 'rain') mult *= 1.1;
  if (weather === 'sunny') mult *= 1.0;
  if (weather === 'storm') mult *= 0.7;
  if (upgrades && upgrades.length >= 4) mult *= 1.15;
  return Math.max(5, Math.round(item.price * mult));
}

export function comedyCrowdFor(item, rank, weather) {
  let crowd = 10 + item.difficulty * 8 + rank * 5;
  if (weather === 'rain') crowd = Math.round(crowd * 1.1);
  if (weather === 'sunny') crowd = Math.round(crowd * 1.0);
  if (weather === 'storm') crowd = Math.round(crowd * 0.5);
  return Math.max(1, crowd);
}

export function comedyUpgradeById(id) {
  return COMEDY_UPGRADES.find((x) => x.id === id) || null;
}

export function comedyStaffById(id) {
  return COMEDY_STAFF.find((x) => x.id === id) || null;
}

export function comedyEventById(id) {
  return COMEDY_DAILY_EVENTS.find((x) => x.id === id) || null;
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
  return COMEDY_GUIDE[step] || null;
}

export function comedySeasonMult(seasonId) {
  const s = COMEDY_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function comedyMarketEventMult(eventId, itemId) {
  const ev = COMEDY_MARKET_EVENTS.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.item === itemId ? ev.mult : 1;
}

export function comedyWeeklyGoal(state) {
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
  let total = 0;
  for (const id of Object.keys(state.owned || {})) {
    const item = COMEDY_ACTS.find((x) => x.id === id);
    if (item) total += item.price * (state.levels[id] || 1);
  }
  return Math.round(total * 10) / 10;
}

export function comedySummary(state) {
  const rankName = COMEDY_RANKS[state.rank] ? COMEDY_RANKS[state.rank].name : 'Unknown';
  return 'Comedy Club ' + rankName + ': ' + state.runsDone + ' runs, '
    + state.itemsOwned + ' entries, $' + Math.round(state.earned)
    + ' earned, ' + state.visitors + ' visitors.';
}

export function comedyNextGoal(state) {
  if (state.itemsOwned < 1) return 'Open your first entry.';
  if (state.runsDone < 5) return 'Finish 5 runs.';
  if (state.earned < 500) return 'Earn $500 in total.';
  if (state.rank < 2) return 'Reach rank ' + COMEDY_RANKS[2].name + '.';
  if (state.upgradesOwned < 4) return 'Own 4 upgrades.';
  return 'Become a Comedy Club legend.';
}

export function comedyRecordFor(recordId, state) {
  const r = COMEDY_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function comedyAllRecords(state) {
  return COMEDY_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function comedyLeaderboardWith(playerScore) {
  const board = COMEDY_LEADERBOARD.map((e) => ({
    name: e.name, score: e.name === 'You' ? playerScore : e.score, desc: e.desc,
  }));
  board.sort((a, b) => b.score - a.score);
  return board.map((e, i) => ({ rank: i + 1, name: e.name, score: e.score, desc: e.desc }));
}

export function comedySeasonReport(state, seasonId) {
  const mult = comedySeasonMult(seasonId);
  return COMEDY_ACTS.map((item) => ({
    id: item.id,
    name: item.name,
    basePrice: item.price,
    seasonPrice: Math.round(item.price * mult * 10) / 10,
    owned: !!state.owned[item.id],
    level: state.levels[item.id] || 0,
  }));
}

export function comedyChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return {
    id: challenge.id, name: challenge.name, have: Math.floor(v),
    goal: challenge.goal, done: v >= challenge.goal, xp: challenge.xp,
  };
}

export function comedyBestEntryFor(rank) {
  let best = null;
  let bestScore = -1;
  for (const item of COMEDY_ACTS) {
    if (item.difficulty > rank + 2) continue;
    const score = item.price * (1 + item.rarity * 2) / item.difficulty;
    if (score > bestScore) { bestScore = score; best = item; }
  }
  return best;
}

export function createComedyClubSystem(ctx) {
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
  for (const item of COMEDY_ACTS) {
    state.drift[item.id] = 0;
    state.prices[item.id] = item.price;
  }

  function refreshRank() {
    const r = comedyRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log('Comedy Club rank up: ' + COMEDY_RANKS[r].name + ' - ' + COMEDY_RANKS[r].perk);
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
      const s = COMEDY_STAFF.find((x) => x.id === id);
      if (s && s.skill === skill) bonus += s.bonus;
    }
    return bonus;
  }

  function driftPrices() {
    for (const item of COMEDY_ACTS) {
      const roll = rng();
      if (roll < 0.35) {
        const change = Math.round((rng() * 0.24 - 0.12) * 100) / 100;
        state.drift[item.id] = Math.round((state.drift[item.id] + change) * 100) / 100;
        state.prices[item.id] = Math.max(1, Math.round(item.price * (1 + state.drift[item.id]) * 10) / 10);
      }
    }
  }

  function bookAct(id) {
    const item = COMEDY_ACTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-act' };
    if (state.owned[id]) return { ok: false, reason: 'already-owned' };
    if (state.itemsOwned >= comedyCapacityFor(state.rank, state.upgrades)) {
      return { ok: false, reason: 'capacity-full', cap: comedyCapacityFor(state.rank, state.upgrades) };
    }
    if (state.rank < Math.max(0, item.difficulty - 2)) {
      return { ok: false, reason: 'rank-too-low', need: Math.max(0, item.difficulty - 2) };
    }
    const cost = comedyPriceFor(id, state.drift, 0, []);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned[id] = 1;
    state.levels[id] = 1;
    state.itemsOwned += 1;
    gainXp(10);
    log('Booked ' + item.name + ' for $' + cost + '. Welcome to the Comedy Club business.');
    return { ok: true, id, cost, name: item.name };
  }

  function runShow(id) {
    const item = COMEDY_ACTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-act' };
    if (state.active) return { ok: false, reason: 'already-running', active: state.activeId };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned' };
    state.active = 'run';
    state.activeId = id;
    state.activeTimer = 30 + item.difficulty * 10;
    state.activeBase = item.price;
    log('Showtime: ' + item.name + ' is under way.');
    return { ok: true, id, seconds: state.activeTimer };
  }

  function settleRun() {
    const id = state.activeId;
    const item = COMEDY_ACTS.find((x) => x.id === id);
    state.active = null;
    state.activeId = null;
    state.activeTimer = 0;
    if (!item) return;
    const cond = weatherCond();
    const boosted = !!state.boosted[id];
    const payout = comedyPayoutFor(item, state.rank, state.upgrades, cond, boosted);
    const crowd = comedyCrowdFor(item, state.rank, cond);
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
    log('Curtain call for ' + item.name + ': ' + crowd + ' visitors, $' + payout + ' in the till.');
  }

  function collectDoorSales() {
    if (state.pending <= 0) return { ok: false, reason: 'nothing-pending' };
    const amount = state.pending;
    state.pending = 0;
    state.earned += amount;
    addCash(amount);
    log('Collected $' + amount + ' from the till.');
    return { ok: true, amount };
  }

  function sellDrinks(id, qty) {
    const item = COMEDY_ACTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-act' };
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

  function hostOpenMic(id) {
    const item = COMEDY_ACTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-act' };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned' };
    if (getCash() < 40) return { ok: false, reason: 'not-enough-cash', cost: 40 };
    addCash(-40);
    state.spent += 40;
    state.boosted[id] = true;
    state.reputation += 1;
    gainXp(10);
    log('Open mic spotlight on ' + item.name + ' is boosted for its next run.');
    return { ok: true, id, boosted: true };
  }

  function buyUpgrade(id) {
    const u = COMEDY_UPGRADES.find((x) => x.id === id);
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
    const s = COMEDY_STAFF.find((x) => x.id === id);
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
    const item = COMEDY_ACTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-act' };
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
    return COMEDY_ACTS.map((item) => ({
      id: item.id,
      name: item.name,
      price: comedyPriceFor(item.id, state.drift, state.rank, state.upgrades),
      basePrice: item.price,
      drift: state.drift[item.id],
      owned: !!state.owned[item.id],
      level: state.levels[item.id] || 0,
      difficulty: item.difficulty,
      rarity: item.rarity,
    }));
  }

  function listItems() {
    return COMEDY_ACTS.map((item) => ({
      id: item.id, name: item.name, price: item.price,
      difficulty: item.difficulty, rarity: item.rarity, desc: item.desc,
      owned: !!state.owned[item.id],
    }));
  }

  function info(id) {
    const item = COMEDY_ACTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-act' };
    return {
      ok: true, item,
      owned: !!state.owned[id],
      level: state.levels[id] || 0,
      price: comedyPriceFor(id, state.drift, state.rank, state.upgrades),
      holdings: state.holdings[id] || 0,
    };
  }

  function dailyEvent() {
    const idx = Math.floor(rng() * COMEDY_DAILY_EVENTS.length);
    const ev = COMEDY_DAILY_EVENTS[idx];
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
    for (const item of COMEDY_ACTS) {
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
      name: 'Comedy Club',
      mechanic: MECH,
      rank: COMEDY_RANKS[state.rank] ? COMEDY_RANKS[state.rank].name : 'Unknown',
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
      capacity: comedyCapacityFor(state.rank, state.upgrades),
      hour: getHour(),
      day: getDay(),
    };
  }

  function hudLine() {
    if (state.active) {
      return 'Comedy Club: running ' + state.activeId + ' - ' + Math.max(0, Math.ceil(state.activeTimer)) + 's left';
    }
    if (state.pending > 0) {
      return 'Comedy Club: $' + Math.round(state.pending) + ' waiting in the till';
    }
    if (state.itemsOwned > 0) {
      return 'Comedy Club: ' + state.itemsOwned + ' entries, $' + Math.round(state.earned) + ' earned';
    }
    return '';
  }

  function interact(action, a, b) {
    if (!action || action === 'status') return { ok: true, stats: stats(), hint: 'open <act> to book it, run <act> to play the show, collect to empty the till' };
    if (action === 'open') return bookAct(a);
    if (action === 'run') return runShow(a);
    if (action === 'collect') return collectDoorSales();
    if (action === 'sell') return sellDrinks(a, b);
    if (action === 'upgrade') return buyUpgrade(a);
    if (action === 'levelup') return upgradeItem(a);
    if (action === 'hire') return hireStaff(a);
    if (action === 'fire') return fireStaff(a);
    if (action === 'special') return hostOpenMic(a, b);
    if (action === 'info') return info(a);
    if (action === 'prices') return { ok: true, prices: priceBoard() };
    if (action === 'list') return { ok: true, items: listItems() };
    if (action === 'event') return dailyEvent();
    return { ok: false, reason: 'unknown-action', action };
  }

  return {
    name: 'Comedy Club',
    state,
    gainXp,
    bookAct,
    runShow,
    collectDoorSales,
    sellDrinks,
    hostOpenMic,
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
    open: bookAct,
    run: runShow,
    collect: collectDoorSales,
    sell: sellDrinks,
    upgrade: buyUpgrade,
    hire: hireStaff,
  };
}

export function createComedyClubExtras(system) {
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function challenges() {
    return COMEDY_CHALLENGES.map((ch) => comedyChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = COMEDY_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.indexOf(id) >= 0) return { ok: false, reason: 'already-claimed' };
    const p = comedyChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    system.state.challengesClaimed.push(id);
    if (typeof system.gainXp === 'function') system.gainXp(ch.xp);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return COMEDY_ACHIEVEMENTS.map((a) => ({
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
    const h = COMEDY_STAFF.find((x) => x.id === id);
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
      const h = COMEDY_STAFF.find((x) => x.id === id);
      if (h) due += h.wage;
    }
    helperWagesPaid += due;
    system.state.wagesPaid += due;
    return { due, helpers: helpers.slice(), totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    let bonus = 0;
    for (const id of helpers) {
      const h = COMEDY_STAFF.find((x) => x.id === id);
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
    const item = COMEDY_ACTS.find((x) => x.id === id);
    if (!item) return { ok: false, reason: 'no-such-act' };
    system.state.boosted[id] = true;
    return { ok: true, id, boosted: true };
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
    return COMEDY_STAFF.map((s) => ({
      id: s.id, name: s.name, wage: s.wage, skill: s.skill,
      hired: helpers.indexOf(s.id) >= 0 || system.state.staff.indexOf(s.id) >= 0,
    }));
  }

  function upgradeCatalog() {
    return COMEDY_UPGRADES.map((u) => ({
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

export function createComedyClubMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  function setEvent(eventId) {
    const ev = COMEDY_MARKET_EVENTS.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = COMEDY_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(itemId, basePrice) {
    let price = basePrice;
    price *= comedyMarketEventMult(currentEvent, itemId);
    price *= comedySeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(itemId, qty) {
    const item = COMEDY_ACTS.find((x) => x.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-act' };
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
    for (const item of COMEDY_ACTS) {
      const mult = comedyMarketEventMult(currentEvent, item.id);
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
    return COMEDY_ACTS.map((item) => ({
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

export function comedyEventFor(day) {
  return COMEDY_MARKET_EVENTS[day % COMEDY_MARKET_EVENTS.length];
}

export function comedyDailyEventFor(day) {
  return COMEDY_DAILY_EVENTS[day % COMEDY_DAILY_EVENTS.length];
}

export function comedyRankNameFor(rank) {
  const r = COMEDY_RANKS[rank];
  return r ? r.name : 'Unknown';
}

export function comedyTotalValue(state) {
  const inv = comedyInventoryValue(state);
  return Math.round((inv + state.pending + state.earned) * 10) / 10;
}

export function comedyProgressPercent(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 0;
  return Math.round((state.runsDone / total) * 100);
}

export function comedyStaffBonusFor(staffIds, skill) {
  let bonus = 0;
  for (const id of staffIds) {
    const s = COMEDY_STAFF.find((x) => x.id === id);
    if (s && s.skill === skill) bonus += s.bonus;
  }
  return bonus;
}

export function comedyCheapestEntry() {
  let best = COMEDY_ACTS[0];
  for (const item of COMEDY_ACTS) {
    if (item.price < best.price) best = item;
  }
  return best;
}

export function comedyPriciestEntry() {
  let best = COMEDY_ACTS[0];
  for (const item of COMEDY_ACTS) {
    if (item.price > best.price) best = item;
  }
  return best;
}

export function comedyEntriesByDifficulty(difficulty) {
  return COMEDY_ACTS.filter((x) => x.difficulty === difficulty).map((x) => x.id);
}

export function comedyEntriesByRarity(maxRarity) {
  return COMEDY_ACTS.filter((x) => x.rarity <= maxRarity).map((x) => x.id);
}

export function comedyGradeFor(runsDone, earned, visitors) {
  const score = runsDone * 10 + Math.round(earned / 10) + Math.floor(visitors / 10);
  if (score >= 500) return 'S';
  if (score >= 300) return 'A';
  if (score >= 150) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}

export const COMEDY_META = {
  system: 'comedy',
  version: '7-B4',
  author: 'builder-4',
  mechanic: 'venue',
  dataCount: COMEDY_ACTS.length,
  dataName: 'COMEDY_ACTS',
};
