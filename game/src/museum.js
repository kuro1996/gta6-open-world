export const EXHIBITS = [
  { id: 'dino-hall', name: 'Dinosaur Hall', price: 120, rarity: 0.3, difficulty: 1, era: 'Jurassic', wing: 'North Wing', crowd: 40, desc: 'Towering skeletons and a roaring animatronic rex.' },
  { id: 'space-gallery', name: 'Space Gallery', price: 200, rarity: 0.5, difficulty: 2, era: 'Modern', wing: 'East Wing', crowd: 55, desc: 'Moon rocks, capsules and a walk-through star map.' },
  { id: 'ocean-room', name: 'Ocean Room', price: 150, rarity: 0.4, difficulty: 2, era: 'Ancient', wing: 'South Wing', crowd: 45, desc: 'A blue-lit hall of whales, reefs and deep-sea light.' },
  { id: 'egypt-wing', name: 'Egypt Wing', price: 260, rarity: 0.6, difficulty: 3, era: 'Ancient', wing: 'West Wing', crowd: 70, desc: 'Sarcophagi, gold masks and a replica burial chamber.' },
  { id: 'art-masters', name: 'Art Masters', price: 300, rarity: 0.7, difficulty: 3, era: 'Renaissance', wing: 'North Wing', crowd: 65, desc: 'Framed masters under soft lamps, velvet ropes included.' },
  { id: 'robot-lab', name: 'Robot Lab', price: 180, rarity: 0.45, difficulty: 2, era: 'Future', wing: 'East Wing', crowd: 50, desc: 'Hands-on robots that wave, draw and answer questions.' },
  { id: 'gem-vault', name: 'Gem Vault', price: 400, rarity: 0.8, difficulty: 4, era: 'Timeless', wing: 'West Wing', crowd: 80, desc: 'Glittering stones behind thick glass and low light.' },
  { id: 'fossil-pit', name: 'Fossil Pit', price: 90, rarity: 0.25, difficulty: 1, era: 'Prehistoric', wing: 'South Wing', crowd: 35, desc: 'A dig pit where kids brush real stone for shells.' },
  { id: 'music-hall', name: 'Music Hall', price: 140, rarity: 0.35, difficulty: 1, era: 'Classical', wing: 'North Wing', crowd: 42, desc: 'Old instruments you can pluck, tap and blow.' },
  { id: 'photo-archive', name: 'Photo Archive', price: 110, rarity: 0.3, difficulty: 1, era: 'Modern', wing: 'East Wing', crowd: 38, desc: 'A century of city life in black and white prints.' },
  { id: 'butterfly-house', name: 'Butterfly House', price: 170, rarity: 0.5, difficulty: 2, era: 'Natural', wing: 'South Wing', crowd: 48, desc: 'A warm glasshouse full of drifting wings.' },
  { id: 'crown-jewels', name: 'Crown Jewels', price: 500, rarity: 0.9, difficulty: 5, era: 'Royal', wing: 'West Wing', crowd: 95, desc: 'The glittering centrepiece every visitor queues to see.' },
];

export const MUSEUM_UPGRADES = [
  { id: 'audio-guide', name: 'Audio Guide', cost: 80, effect: 'visitors +10%', desc: 'Handheld guides that tell every story.' },
  { id: 'grand-hall', name: 'Grand Hall', cost: 300, effect: 'capacity +2', desc: 'A vast hall for blockbuster shows.' },
  { id: 'gift-shop', name: 'Gift Shop', cost: 150, effect: 'payout +10%', desc: 'Souvenirs waiting at the exit.' },
  { id: 'night-tours', name: 'Night Tours', cost: 200, effect: 'crowd +15%', desc: 'After-dark torchlight tours.' },
  { id: 'vip-lounge', name: 'VIP Lounge', cost: 250, effect: 'payout +15%', desc: 'A quiet lounge for patrons.' },
  { id: 'hologram-show', name: 'Hologram Show', cost: 350, effect: 'crowd +20%', desc: 'Ghosts of history in light.' },
  { id: 'security-plus', name: 'Security Plus', cost: 120, effect: 'heat -1', desc: 'Extra guards keeping the galleries calm.' },
  { id: 'cafe-corner', name: 'Cafe Corner', cost: 100, effect: 'earned +5%', desc: 'Coffee and cake by the atrium.' },
];

export const MUSEUM_RANKS = [
  { level: 0, name: 'Docent', xp: 0, perk: 'Knows every label by heart.' },
  { level: 1, name: 'Curator', xp: 150, perk: 'Picks the shows that draw crowds.' },
  { level: 2, name: 'Senior Curator', xp: 400, perk: 'Two wings run at once.' },
  { level: 3, name: 'Museum Director', xp: 800, perk: 'The whole building answers to you.' },
  { level: 4, name: 'Living Legend', xp: 1500, perk: 'Your name is on the door.' },
];

export const MUSEUM_STAFF = [
  { id: 'guide-ana', name: 'Ana the Guide', wage: 40, skill: 'guide', bonus: 2, desc: 'Knows every story in the building.' },
  { id: 'guard-ben', name: 'Ben the Guard', wage: 35, skill: 'security', bonus: 1, desc: 'Keeps the galleries calm and quiet.' },
  { id: 'curator-cleo', name: 'Cleo the Curator', wage: 60, skill: 'curator', bonus: 3, desc: 'Picks the shows that draw the crowds.' },
  { id: 'host-dan', name: 'Dan the Host', wage: 45, skill: 'host', bonus: 2, desc: 'Welcomes every school group with a smile.' },
];

export const MUSEUM_DAILY_EVENTS = [
  { id: 'school-trip', name: 'School Trip', effect: 'visitors', amount: 25, text: 'A busload of school kids pours through the doors.' },
  { id: 'vip-donor', name: 'VIP Donor', effect: 'earn', amount: 60, text: 'A wealthy patron leaves a generous gift.' },
  { id: 'broken-ac', name: 'Broken AC', effect: 'cost', amount: 40, text: 'The air conditioning dies on the hottest day.' },
  { id: 'press-visit', name: 'Press Visit', effect: 'rep', amount: 3, text: 'A newspaper critic writes a glowing review.' },
  { id: 'rainy-rush', name: 'Rainy Rush', effect: 'visitors', amount: 15, text: 'Rain drives the whole town indoors to your halls.' },
  { id: 'art-thief-scare', name: 'Art Thief Scare', effect: 'heat', amount: 2, text: 'A false alarm brings the police to the vault.' },
  { id: 'history-buff', name: 'History Buff', effect: 'xp', amount: 20, text: 'A retired professor shares a lifetime of stories.' },
  { id: 'leaky-roof', name: 'Leaky Roof', effect: 'cost', amount: 25, text: 'A drip over the fossils needs urgent patching.' },
  { id: 'gala-night', name: 'Gala Night', effect: 'earn', amount: 120, text: 'Black tie, champagne, and a packed auction hall.' },
  { id: 'quiet-day', name: 'Quiet Day', effect: 'rep', amount: 1, text: 'A slow day, but the few guests leave happy.' },
];

export const MUSEUM_TIPS = [
  { id: 'tip-hours', name: 'Open Hours', text: 'Rainy days bring the biggest crowds indoors.' },
  { id: 'tip-tours', name: 'Tour Timing', text: 'Run tours back to back to keep the streak alive.' },
  { id: 'tip-boost', name: 'Restoration', text: 'Restore an exhibit before a big tour for a payout lift.' },
  { id: 'tip-capacity', name: 'More Halls', text: 'Buy the Grand Hall to hang two more exhibits.' },
  { id: 'tip-staff', name: 'Good Guides', text: 'Hire guides whose skills match your busiest wings.' },
  { id: 'tip-prices', name: 'Watch Prices', text: 'Check the price board daily; drift moves fast.' },
  { id: 'tip-donate', name: 'Give Back', text: 'Small donations build reputation with the city.' },
  { id: 'tip-rank', name: 'Climb Ranks', text: 'Every tour and sale pushes you toward Curator.' },
];

export const MUSEUM_CHALLENGES = [
  { id: 'ch-tours-5', name: 'Five Tours', target: 'runsDone', goal: 5, xp: 50, desc: 'Host 5 tours.' },
  { id: 'ch-earn-500', name: 'First 500', target: 'earned', goal: 500, xp: 80, desc: 'Earn $500 in total.' },
  { id: 'ch-visitors-200', name: 'Crowd Puller', target: 'visitors', goal: 200, xp: 60, desc: 'Welcome 200 visitors.' },
  { id: 'ch-exhibits-4', name: 'Four Wings', target: 'itemsOwned', goal: 4, xp: 70, desc: 'Open 4 exhibits.' },
  { id: 'ch-upgrades-3', name: 'Well Equipped', target: 'upgradesOwned', goal: 3, xp: 60, desc: 'Own 3 upgrades.' },
  { id: 'ch-rep-10', name: 'Respected', target: 'reputation', goal: 10, xp: 50, desc: 'Reach 10 reputation.' },
  { id: 'ch-streak-3', name: 'On a Roll', target: 'streak', goal: 3, xp: 90, desc: 'Reach a 3-tour streak.' },
  { id: 'ch-best-300', name: 'Blockbuster', target: 'bestRun', goal: 300, xp: 100, desc: 'Earn $300 from a single tour.' },
];

export const MUSEUM_ACHIEVEMENTS = [
  { id: 'ach-tours-10', name: 'Tour Master', target: 'runsDone', goal: 10, desc: 'Host 10 tours.' },
  { id: 'ach-earn-1000', name: 'Golden Till', target: 'earned', goal: 1000, desc: 'Earn $1,000 in total.' },
  { id: 'ach-visitors-500', name: 'City Favourite', target: 'visitors', goal: 500, desc: 'Welcome 500 visitors.' },
  { id: 'ach-exhibits-6', name: 'Full House', target: 'itemsOwned', goal: 6, desc: 'Open 6 exhibits.' },
  { id: 'ach-upgrades-5', name: 'Fully Loaded', target: 'upgradesOwned', goal: 5, desc: 'Own 5 upgrades.' },
  { id: 'ach-rep-20', name: 'Beloved', target: 'reputation', goal: 20, desc: 'Reach 20 reputation.' },
  { id: 'ach-streak-5', name: 'Unstoppable', target: 'streak', goal: 5, desc: 'Reach a 5-tour streak.' },
  { id: 'ach-best-500', name: 'Record Night', target: 'bestRun', goal: 500, desc: 'Earn $500 from a single tour.' },
];

export const MUSEUM_LEADERBOARD = [
  { name: 'Curator Ada', score: 980, desc: 'Runs the old city museum.' },
  { name: 'Director Ben', score: 720, desc: 'A strict but fair director.' },
  { name: 'Guide Cleo', score: 540, desc: 'Knows every ghost story.' },
  { name: 'Intern Dan', score: 210, desc: 'Still learning the ropes.' },
  { name: 'You', score: 0, desc: 'The new name on the board.' },
];

export const MUSEUM_RECORDS = [
  { id: 'rec-tours', name: 'Most Tours', stat: 'runsDone', unit: 'tours', desc: 'Total tours hosted.' },
  { id: 'rec-earned', name: 'Top Earnings', stat: 'earned', unit: '$', desc: 'Total money earned.' },
  { id: 'rec-visitors', name: 'Biggest Crowd', stat: 'visitors', unit: 'guests', desc: 'Total visitors welcomed.' },
  { id: 'rec-best', name: 'Best Tour', stat: 'bestRun', unit: '$', desc: 'Best single-tour payout.' },
  { id: 'rec-streak', name: 'Longest Streak', stat: 'bestStreak', unit: 'tours', desc: 'Longest run of tours.' },
];

export const MUSEUM_MARKET_EVENTS = [
  { id: 'me-dino', name: 'Dino Fever', item: 'dino-hall', mult: 1.35, desc: 'Everyone wants dinosaurs this week.' },
  { id: 'me-space', name: 'Space Slump', item: 'space-gallery', mult: 0.7, desc: 'Space fever cools off.' },
  { id: 'me-ocean', name: 'Ocean Boom', item: 'ocean-room', mult: 1.35, desc: 'A viral shark video fills the hall.' },
  { id: 'me-egypt', name: 'Egypt Dip', item: 'egypt-wing', mult: 0.7, desc: 'Mummy fatigue sets in.' },
  { id: 'me-art', name: 'Art Surge', item: 'art-masters', mult: 1.35, desc: 'A famous painting comes to town.' },
  { id: 'me-robot', name: 'Robot Lull', item: 'robot-lab', mult: 0.7, desc: 'The robots need a software update.' },
  { id: 'me-gem', name: 'Gem Rush', item: 'gem-vault', mult: 1.35, desc: 'A new diamond makes the news.' },
  { id: 'me-fossil', name: 'Fossil Fade', item: 'fossil-pit', mult: 0.7, desc: 'The pit is quiet this week.' },
  { id: 'me-music', name: 'Music Week', item: 'music-hall', mult: 1.35, desc: 'A festival brings music lovers.' },
  { id: 'me-photo', name: 'Photo Slump', item: 'photo-archive', mult: 0.7, desc: 'Old photos gather dust.' },
  { id: 'me-butterfly', name: 'Butterfly Season', item: 'butterfly-house', mult: 1.35, desc: 'The glasshouse is in full bloom.' },
  { id: 'me-crown', name: 'Crown Cool', item: 'crown-jewels', mult: 0.7, desc: 'The jewels rest between royal visits.' },
];

export const MUSEUM_SEASONS = [
  { id: 'summer', name: 'Summer', mult: 1.1, desc: 'Tourists flood the city.' },
  { id: 'autumn', name: 'Autumn', mult: 1.0, desc: 'Steady school groups.' },
  { id: 'winter', name: 'Winter', mult: 0.9, desc: 'Quiet halls and cold streets.' },
  { id: 'spring', name: 'Spring', mult: 1.05, desc: 'Fresh crowds return.' },
];

export const MUSEUM_FACTS = [
  { id: 'fact-dino', text: 'The Dinosaur Hall skeleton is a cast of a real T. rex.' },
  { id: 'fact-space', text: 'The Space Gallery moon rock is older than the Earth itself.' },
  { id: 'fact-ocean', text: 'The Ocean Room whale model weighs as much as a bus.' },
  { id: 'fact-egypt', text: 'The Egypt Wing burial chamber took two years to paint.' },
  { id: 'fact-art', text: 'The Art Masters room holds a painting once lost for a century.' },
  { id: 'fact-robot', text: 'The Robot Lab machines were built by local students.' },
  { id: 'fact-gem', text: 'The Gem Vault diamond was found in a riverbed by chance.' },
  { id: 'fact-fossil', text: 'The Fossil Pit shells are 400 million years old.' },
  { id: 'fact-music', text: 'The Music Hall harp was played for a queen.' },
  { id: 'fact-photo', text: 'The Photo Archive holds the first photo ever taken in town.' },
  { id: 'fact-butterfly', text: 'The Butterfly House releases 200 new wings each spring.' },
  { id: 'fact-crown', text: 'The Crown Jewels replica fooled a thief in 1974.' },
  { id: 'fact-1', text: 'Museums keep their galleries cool to protect old paint.' },
  { id: 'fact-2', text: 'The word museum comes from the Greek home of the muses.' },
  { id: 'fact-3', text: 'Some museums lend exhibits to each other like library books.' },
  { id: 'fact-4', text: 'Night tours started as a way to show art by candlelight.' },
  { id: 'fact-5', text: 'A docent is a trained guide who teaches by talking.' },
  { id: 'fact-6', text: 'The largest museum in the world has over 300 rooms.' },
  { id: 'fact-7', text: 'Fossils are often found by farmers, not scientists.' },
  { id: 'fact-8', text: 'Glass cases keep dust and fingers away from treasure.' },
  { id: 'fact-9', text: 'Many gems glow under ultraviolet light.' },
  { id: 'fact-10', text: 'School trips are a museum\'s busiest days of the year.' },
];

export const MUSEUM_NPC_LINES = [
  { id: 'npc-1', text: 'Is that T. rex real? It looks real!' },
  { id: 'npc-2', text: 'I came for the gems and stayed for the fossils.' },
  { id: 'npc-3', text: 'The guide told the best ghost story in the Egypt Wing.' },
  { id: 'npc-4', text: 'My kids will not stop talking about the robots.' },
  { id: 'npc-5', text: 'This is my third visit this month.' },
  { id: 'npc-6', text: 'The butterfly house is pure magic.' },
  { id: 'npc-7', text: 'Do they really let you touch the instruments?' },
  { id: 'npc-8', text: 'I took forty photos in the Space Gallery.' },
  { id: 'npc-9', text: 'The crown jewels sparkle even in the dark.' },
  { id: 'npc-10', text: 'Best rainy-day plan in the whole city.' },
  { id: 'npc-11', text: 'The cafe cake is worth the ticket alone.' },
  { id: 'npc-12', text: 'I learned more here than in school all year.' },
  { id: 'npc-13', text: 'The night tour gave me goosebumps.' },
  { id: 'npc-14', text: 'That harp sounds like it is singing.' },
  { id: 'npc-15', text: 'We drove two hours just to see the mummies.' },
  { id: 'npc-16', text: 'I am bringing my grandmother next weekend.' },
];

export const MUSEUM_GUIDE = [
  { id: 'guide-1', text: 'Step 1: Pick an exhibit to open from the list.' },
  { id: 'guide-2', text: 'Step 2: Pay the opening cost from your cash.' },
  { id: 'guide-3', text: 'Step 3: Host a tour to welcome visitors.' },
  { id: 'guide-4', text: 'Step 4: Wait for the tour timer to finish.' },
  { id: 'guide-5', text: 'Step 5: Collect the ticket sales from the till.' },
  { id: 'guide-6', text: 'Step 6: Restore an exhibit to boost its next tour.' },
  { id: 'guide-7', text: 'Step 7: Spend earnings on upgrades for the halls.' },
  { id: 'guide-8', text: 'Step 8: Hire staff to help run the museum.' },
  { id: 'guide-9', text: 'Step 9: Level up exhibits to raise their value.' },
  { id: 'guide-10', text: 'Step 10: Watch the market events for hot exhibits.' },
  { id: 'guide-11', text: 'Step 11: Claim challenges as you hit each goal.' },
  { id: 'guide-12', text: 'Step 12: Donate to the city to build reputation.' },
  { id: 'guide-13', text: 'Step 13: Check the price board before selling.' },
  { id: 'guide-14', text: 'Step 14: Keep tours running to grow your streak.' },
  { id: 'guide-15', text: 'Step 15: Trade in bulk when the market is hot.' },
  { id: 'guide-16', text: 'Step 16: Become a Living Legend of the museum.' },
];

export const MUSEUM_META = { system: 'museum', version: '7-B4', author: 'builder-4', mechanic: 'venue', dataCount: 12, dataName: 'EXHIBITS' };

export function museumRankFor(xp) {
  let lvl = 0;
  for (const r of MUSEUM_RANKS) {
    if (xp >= r.xp) lvl = r.level;
  }
  return lvl;
}

export function museumItemById(id) {
  for (const it of EXHIBITS) {
    if (it.id === id) return it;
  }
  return null;
}

export function museumPriceFor(id, drift, rank, upgrades) {
  const item = museumItemById(id);
  if (!item) return 0;
  let p = item.price * (1 + (drift || 0)) * (1 + (rank || 0) * 0.05);
  if (upgrades && upgrades.length >= 3) p = p * 1.1;
  const rounded = Math.round(p * 10) / 10;
  return rounded < 1 ? 1 : rounded;
}

export function museumCapacityFor(rank, upgrades) {
  let cap = 3 + (rank || 0);
  if (upgrades && upgrades.indexOf('grand-hall') >= 0) cap = cap + 2;
  return cap;
}

function museumCondOf(weather) {
  if (typeof weather === 'string') return weather;
  if (weather && typeof weather.condition === 'string') return weather.condition;
  return 'clear';
}

function museumSkyMult(table, weather) {
  const cond = museumCondOf(weather);
  const hit = table[cond];
  return hit === undefined ? 1 : hit;
}

export function museumPayoutFor(item, rank, upgrades, weather, boosted) {
  if (!item) return 0;
  let mult = 0.6 + (rank || 0) * 0.1;
  if (boosted) mult = mult + 0.3;
  mult = mult * museumSkyMult({ rain: 1.2, sunny: 1.0, storm: 0.7 }, weather);
  if (upgrades && upgrades.length >= 4) mult = mult * 1.15;
  const payout = Math.round(item.price * mult);
  return payout < 5 ? 5 : payout;
}

export function museumCrowdFor(item, rank, weather) {
  const diff = item ? item.difficulty : 0;
  const base = 10 + diff * 8 + (rank || 0) * 5;
  const crowd = Math.round(base * museumSkyMult({ rain: 1.2, sunny: 1.0, storm: 0.5 }, weather));
  return crowd < 1 ? 1 : crowd;
}

export function museumUpgradeById(id) {
  for (const u of MUSEUM_UPGRADES) {
    if (u.id === id) return u;
  }
  return null;
}

export function museumStaffById(id) {
  for (const s of MUSEUM_STAFF) {
    if (s.id === id) return s;
  }
  return null;
}

export function museumEventById(id) {
  for (const e of MUSEUM_DAILY_EVENTS) {
    if (e.id === id) return e;
  }
  for (const e of MUSEUM_MARKET_EVENTS) {
    if (e.id === id) return e;
  }
  return null;
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
  if (step < 0 || step >= MUSEUM_GUIDE.length) return null;
  return MUSEUM_GUIDE[step];
}

export function museumSeasonMult(seasonId) {
  for (const s of MUSEUM_SEASONS) {
    if (s.id === seasonId) return s.mult;
  }
  return 1;
}

export function museumMarketEventMult(eventId, itemId) {
  if (!eventId) return 1;
  for (const e of MUSEUM_MARKET_EVENTS) {
    if (e.id === eventId) {
      if (e.item === itemId) return e.mult;
      return 1;
    }
  }
  return 1;
}

export function museumWeeklyGoal(state) {
  const runs = { have: state.runsDone, goal: 5, done: state.runsDone >= 5 };
  const earned = { have: state.earned, goal: 500, done: state.earned >= 500 };
  const visitors = { have: state.visitors, goal: 100, done: state.visitors >= 100 };
  return { runs, earned, visitors, allDone: runs.done && earned.done && visitors.done };
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
  let sum = 0;
  for (const id of Object.keys(state.owned)) {
    const item = museumItemById(id);
    if (!item) continue;
    const lvl = state.levels[id] || 1;
    sum = sum + item.price * lvl;
  }
  return Math.round(sum * 10) / 10;
}

export function museumSummary(state) {
  return 'Museum at rank ' + museumRankNameFor(state.rank) + ': ' + state.runsDone + ' runs, ' + state.itemsOwned + ' entries, $' + state.earned + ' earned, ' + state.visitors + ' visitors.';
}

export function museumNextGoal(state) {
  if (state.itemsOwned === 0) return 'Open your first entry.';
  if (state.runsDone < 5) return 'Finish 5 runs.';
  if (state.earned < 500) return 'Earn $500 in total.';
  if (state.rank < 2) return 'Reach rank ' + museumRankNameFor(2) + '.';
  if (state.upgradesOwned < 4) return 'Own 4 upgrades.';
  return 'Become a legend of the Museum.';
}

export function museumRecordFor(id, state) {
  let rec = null;
  for (const r of MUSEUM_RECORDS) {
    if (r.id === id) rec = r;
  }
  if (!rec) return null;
  const value = state[rec.stat] === undefined ? 0 : state[rec.stat];
  return { id: rec.id, name: rec.name, stat: rec.stat, unit: rec.unit, desc: rec.desc, value };
}

export function museumAllRecords(state) {
  const out = [];
  for (const r of MUSEUM_RECORDS) out.push(museumRecordFor(r.id, state));
  return out;
}

export function museumLeaderboardWith(score) {
  const board = [];
  for (const e of MUSEUM_LEADERBOARD) {
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

export function museumSeasonReport(state, seasonId) {
  const mult = museumSeasonMult(seasonId);
  const rows = [];
  for (const it of EXHIBITS) {
    rows.push({
      id: it.id,
      name: it.name,
      basePrice: it.price,
      seasonPrice: Math.round(it.price * mult * 10) / 10,
      owned: !!state.owned[it.id],
      level: state.levels[it.id] || 0,
    });
  }
  return rows;
}

export function museumChallengeProgress(challenge, state) {
  const have = Math.floor(state[challenge.target] || 0);
  return { id: challenge.id, name: challenge.name, have, goal: challenge.goal, done: have >= challenge.goal, xp: challenge.xp };
}

export function museumBestEntryFor(rank) {
  let best = null;
  let bestScore = -1;
  for (const it of EXHIBITS) {
    if (it.difficulty > rank + 2) continue;
    const score = (it.price * (1 + it.rarity * 2)) / it.difficulty;
    if (score > bestScore) {
      bestScore = score;
      best = it;
    }
  }
  return best;
}

export function museumEventFor(day) {
  return MUSEUM_MARKET_EVENTS[day % MUSEUM_MARKET_EVENTS.length];
}

export function museumDailyEventFor(day) {
  return MUSEUM_DAILY_EVENTS[day % MUSEUM_DAILY_EVENTS.length];
}

export function museumRankNameFor(level) {
  for (const r of MUSEUM_RANKS) {
    if (r.level === level) return r.name;
  }
  return 'Unknown';
}

export function museumTotalValue(state) {
  return Math.round((museumInventoryValue(state) + state.pending + state.earned) * 10) / 10;
}

export function museumProgressPercent(state) {
  const total = state.runsDone + state.failures;
  if (total === 0) return 0;
  return Math.round((state.runsDone / total) * 100);
}

export function museumStaffBonusFor(staffIds, skill) {
  let total = 0;
  for (const id of staffIds) {
    const s = museumStaffById(id);
    if (s && s.skill === skill) total = total + s.bonus;
  }
  return total;
}

export function museumCheapestEntry() {
  let best = EXHIBITS[0];
  for (const it of EXHIBITS) {
    if (it.price < best.price) best = it;
  }
  return best;
}

export function museumPriciestEntry() {
  let best = EXHIBITS[0];
  for (const it of EXHIBITS) {
    if (it.price > best.price) best = it;
  }
  return best;
}

export function museumEntriesByDifficulty(difficulty) {
  const ids = [];
  for (const it of EXHIBITS) {
    if (it.difficulty === difficulty) ids.push(it.id);
  }
  return ids;
}

export function museumEntriesByRarity(maxRarity) {
  const ids = [];
  for (const it of EXHIBITS) {
    if (it.rarity <= maxRarity) ids.push(it.id);
  }
  return ids;
}

export function museumGradeFor(runsDone, earned, visitors) {
  const score = runsDone * 10 + Math.round(earned / 10) + Math.floor(visitors / 10);
  if (score >= 500) return 'S';
  if (score >= 300) return 'A';
  if (score >= 150) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}

export function createMuseumSystem(ctx) {
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
  for (const it of EXHIBITS) {
    drift[it.id] = 0;
    holdings[it.id] = 0;
    prices[it.id] = it.price;
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
    state.xp = state.xp + n;
    const lvl = museumRankFor(state.xp);
    if (lvl > state.rank) {
      state.rank = lvl;
      log('Rank up! You are now ' + museumRankNameFor(lvl) + '.');
    }
  }

  function openExhibit(id) {
    const item = museumItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (state.owned[id]) return { ok: false, reason: 'already-owned', id };
    const cap = museumCapacityFor(state.rank, state.upgrades);
    if (state.itemsOwned >= cap) return { ok: false, reason: 'capacity-full', cap };
    const need = Math.max(0, item.difficulty - 2);
    if (state.rank < need) return { ok: false, reason: 'rank-too-low', rank: need };
    const cost = museumPriceFor(id, state.drift[id] || 0, 0, []);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent = state.spent + cost;
    state.owned[id] = 1;
    state.levels[id] = 1;
    state.itemsOwned = state.itemsOwned + 1;
    gainXp(10);
    log('Opened exhibit ' + item.name + ' for $' + cost + '.');
    return { ok: true, id, cost, name: item.name };
  }

  function hostTour(id) {
    const item = museumItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (state.active) return { ok: false, reason: 'already-running', active: state.activeId };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    state.active = 'run';
    state.activeId = id;
    state.activeTimer = 30 + item.difficulty * 10;
    state.activeBase = item.price;
    log('Tour started at ' + item.name + '.');
    return { ok: true, id, seconds: state.activeTimer };
  }

  function settleRun() {
    const item = museumItemById(state.activeId);
    const doneId = state.activeId;
    const weather = getWeather();
    const payout = museumPayoutFor(item, state.rank, state.upgrades, weather, !!state.boosted[doneId]);
    const crowd = museumCrowdFor(item, state.rank, weather);
    state.active = null;
    state.activeId = null;
    state.activeTimer = 0;
    state.visitors = state.visitors + crowd;
    state.dailyVisitors = state.dailyVisitors + crowd;
    state.attendanceToday = state.attendanceToday + crowd;
    state.pending = state.pending + payout;
    state.dailyEarned = state.dailyEarned + payout;
    state.runsDone = state.runsDone + 1;
    if (payout > state.bestRun) {
      state.bestRun = payout;
      state.bestRunName = item ? item.name : doneId;
    }
    state.streak = state.streak + 1;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    state.boosted[doneId] = false;
    gainXp(15 + (item ? item.difficulty : 0) * 3);
    log('Tour at ' + (item ? item.name : doneId) + ' drew ' + crowd + ' visitors and earned $' + payout + '.');
  }

  function collectTicketSales() {
    if (state.pending <= 0) return { ok: false, reason: 'nothing-pending' };
    const amount = state.pending;
    state.pending = 0;
    state.earned = state.earned + amount;
    addCash(amount);
    log('Collected $' + amount + ' in ticket sales.');
    return { ok: true, amount };
  }

  function sellSouvenir(id) {
    const item = museumItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    const refund = Math.round(item.price * 0.5);
    delete state.owned[id];
    delete state.levels[id];
    state.itemsOwned = state.itemsOwned - 1;
    state.earned = state.earned + refund;
    addCash(refund);
    gainXp(5);
    log('Sold souvenir stock from ' + item.name + ' for $' + refund + '.');
    return { ok: true, total: refund, qty: 1 };
  }

  function restoreExhibit(id) {
    const item = museumItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    if (getCash() < 40) return { ok: false, reason: 'not-enough-cash', cost: 40 };
    addCash(-40);
    state.spent = state.spent + 40;
    state.boosted[id] = true;
    state.reputation = state.reputation + 1;
    gainXp(10);
    log('Restored ' + item.name + ' to sparkling condition.');
    return { ok: true, id, boosted: true };
  }

  function buyUpgrade(id) {
    const up = museumUpgradeById(id);
    if (!up) return { ok: false, reason: 'unknown-upgrade', id };
    if (state.upgrades.indexOf(id) >= 0) return { ok: false, reason: 'already-owned', id };
    if (getCash() < up.cost) return { ok: false, reason: 'not-enough-cash', cost: up.cost };
    addCash(-up.cost);
    state.spent = state.spent + up.cost;
    state.upgrades.push(id);
    state.upgradesOwned = state.upgradesOwned + 1;
    gainXp(20);
    log('Bought upgrade ' + up.name + ' for $' + up.cost + '.');
    return { ok: true, id, name: up.name };
  }

  function hireStaff(id) {
    const s = museumStaffById(id);
    if (!s) return { ok: false, reason: 'unknown-staff', id };
    if (state.staff.indexOf(id) >= 0) return { ok: false, reason: 'already-hired', id };
    if (getCash() < s.wage) return { ok: false, reason: 'not-enough-cash', cost: s.wage };
    addCash(-s.wage);
    state.spent = state.spent + s.wage;
    state.staff.push(id);
    state.staffHired = state.staffHired + 1;
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
    const item = museumItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    if (!state.owned[id]) return { ok: false, reason: 'not-owned', id };
    const lvl = state.levels[id] || 1;
    if (lvl >= 5) return { ok: false, reason: 'max-level', id, level: lvl };
    const cost = Math.round(item.price * 0.4 * lvl);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent = state.spent + cost;
    state.levels[id] = lvl + 1;
    gainXp(15);
    log('Upgraded ' + item.name + ' to level ' + (lvl + 1) + '.');
    return { ok: true, id, level: lvl + 1 };
  }

  function priceBoard() {
    const rows = [];
    for (const it of EXHIBITS) {
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
    for (const it of EXHIBITS) {
      rows.push({ id: it.id, name: it.name, price: it.price, difficulty: it.difficulty, rarity: it.rarity, desc: it.desc, owned: !!state.owned[it.id] });
    }
    return rows;
  }

  function info(id) {
    const item = museumItemById(id);
    if (!item) return { ok: false, reason: 'unknown-item', id };
    return { ok: true, item, owned: !!state.owned[id], level: state.levels[id] || 0, price: state.prices[id], holdings: state.holdings[id] || 0 };
  }

  function dailyEvent() {
    if (MUSEUM_DAILY_EVENTS.length === 0) return { event: 'none', name: '', effect: '', amount: 0 };
    const ev = MUSEUM_DAILY_EVENTS[Math.floor(rng() * MUSEUM_DAILY_EVENTS.length)];
    if (ev.effect === 'earn') state.pending = state.pending + ev.amount;
    else if (ev.effect === 'cost') {
      if (getCash() >= ev.amount) {
        addCash(-ev.amount);
        state.spent = state.spent + ev.amount;
      }
    } else if (ev.effect === 'rep') state.reputation = state.reputation + ev.amount;
    else if (ev.effect === 'visitors') {
      state.visitors = state.visitors + ev.amount;
      state.dailyVisitors = state.dailyVisitors + ev.amount;
    } else if (ev.effect === 'heat') {
      state.heat = state.heat + ev.amount;
      addHeat(ev.amount);
    } else if (ev.effect === 'xp') gainXp(ev.amount);
    log(ev.text);
    return { event: ev.id, name: ev.name, effect: ev.effect, amount: ev.amount };
  }

  function tick(dt) {
    if (!state.active) return;
    state.activeTimer = state.activeTimer - dt;
    if (state.activeTimer <= 0) {
      state.activeTimer = 0;
      settleRun();
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return null;
    state.lastDay = day;
    for (const it of EXHIBITS) {
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
    for (const it of EXHIBITS) {
      if (state.drift[it.id] === undefined) state.drift[it.id] = 0;
      if (state.prices[it.id] === undefined) state.prices[it.id] = it.price;
      if (state.holdings[it.id] === undefined) state.holdings[it.id] = 0;
    }
    if (!state.owned || typeof state.owned !== 'object') state.owned = {};
    if (!state.levels || typeof state.levels !== 'object') state.levels = {};
    if (!state.boosted || typeof state.boosted !== 'object') state.boosted = {};
    state.rank = museumRankFor(state.xp);
  }

  function stats() {
    let holdingsCount = 0;
    for (const k of Object.keys(state.holdings)) holdingsCount = holdingsCount + (state.holdings[k] || 0);
    return {
      name: 'Museum',
      mechanic: 'venue',
      rank: museumRankNameFor(state.rank),
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
    if (state.active) return 'Museum: running ' + state.activeId + ' - ' + Math.ceil(state.activeTimer) + 's left';
    if (state.pending > 0) return 'Museum: $' + state.pending + ' waiting in the till';
    if (state.itemsOwned > 0) return 'Museum: ' + state.itemsOwned + ' entries, $' + state.earned + ' earned';
    return '';
  }

  function interact(action, a, b) {
    if (!action || action === 'status') {
      return { ok: true, stats: stats(), hint: 'open an exhibit to hang it, run an exhibit to host a tour, collect to empty the till' };
    }
    if (action === 'open') return openExhibit(a);
    if (action === 'run') return hostTour(a);
    if (action === 'collect') return collectTicketSales();
    if (action === 'sell') return sellSouvenir(a, b);
    if (action === 'upgrade' || action === 'levelup') return upgradeItem(a);
    if (action === 'hire') return hireStaff(a);
    if (action === 'fire') return fireStaff(a);
    if (action === 'special') return restoreExhibit(a);
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
    upgrade: upgradeItem,
    hire: hireStaff,
  };
}

export function createMuseumExtras(system) {
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  function challenges() {
    const out = [];
    for (const ch of MUSEUM_CHALLENGES) out.push(museumChallengeProgress(ch, system.state));
    return out;
  }

  function claimChallenge(id) {
    let ch = null;
    for (const c of MUSEUM_CHALLENGES) {
      if (c.id === id) ch = c;
    }
    if (!ch) return { ok: false, reason: 'unknown-challenge', id };
    if (claimed.indexOf(id) >= 0) return { ok: false, reason: 'already-claimed', id };
    const prog = museumChallengeProgress(ch, system.state);
    if (!prog.done) return { ok: false, reason: 'not-done', id, have: prog.have, goal: prog.goal };
    claimed.push(id);
    system.state.challengesClaimed.push(id);
    system.gainXp(ch.xp);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    const out = [];
    for (const a of MUSEUM_ACHIEVEMENTS) {
      const have = Math.floor(system.state[a.target] || 0);
      out.push({ id: a.id, name: a.name, desc: a.desc, target: a.target, goal: a.goal, have, done: have >= a.goal });
    }
    return out;
  }

  function hireHelper(id) {
    const s = museumStaffById(id);
    if (!s) return { ok: false, reason: 'unknown-staff', id };
    if (helpers.indexOf(id) >= 0) return { ok: false, reason: 'already-hired', id };
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
      const s = museumStaffById(hid);
      if (s) due = due + s.wage;
    }
    wagesPaid = wagesPaid + due;
    system.state.wagesPaid = system.state.wagesPaid + due;
    return { due, helpers: helpers.length, totalPaid: wagesPaid };
  }

  function helperBonus(skill) {
    let total = 0;
    for (const hid of helpers) {
      const s = museumStaffById(hid);
      if (s && s.skill === skill) total = total + s.bonus;
    }
    return total;
  }

  function donate(amount) {
    if (!amount || amount <= 0) return { ok: false, reason: 'bad-amount', amount };
    system.state.donations = system.state.donations + amount;
    const rep = Math.floor(amount / 100);
    system.state.reputation = system.state.reputation + rep;
    return { ok: true, amount, reputation: rep };
  }

  function quickBoost(id) {
    if (!museumItemById(id)) return { ok: false, reason: 'unknown-item', id };
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
    const rows = [];
    for (const s of MUSEUM_STAFF) {
      rows.push({ id: s.id, name: s.name, wage: s.wage, skill: s.skill, hired: helpers.indexOf(s.id) >= 0 || system.state.staff.indexOf(s.id) >= 0 });
    }
    return rows;
  }

  function upgradeCatalog() {
    const rows = [];
    for (const u of MUSEUM_UPGRADES) {
      rows.push({ id: u.id, name: u.name, cost: u.cost, effect: u.effect, desc: u.desc, owned: system.state.upgrades.indexOf(u.id) >= 0 });
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

export function createMuseumMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkTraded = 0;

  function setEvent(id) {
    let found = null;
    for (const e of MUSEUM_MARKET_EVENTS) {
      if (e.id === id) found = e;
    }
    if (!found) return { ok: false, reason: 'unknown-event', id };
    currentEvent = id;
    return { ok: true, event: id };
  }

  function setSeason(id) {
    let found = null;
    for (const s of MUSEUM_SEASONS) {
      if (s.id === id) found = s;
    }
    if (!found) return { ok: false, reason: 'unknown-season', id };
    currentSeason = id;
    return { ok: true, season: id };
  }

  function eventPrice(itemId, basePrice) {
    const mult = museumMarketEventMult(currentEvent, itemId) * museumSeasonMult(currentSeason);
    return Math.round(basePrice * mult * 10) / 10;
  }

  function bulkDeal(itemId, qty) {
    const item = museumItemById(itemId);
    if (!item) return { ok: false, reason: 'unknown-item', id: itemId };
    if (!qty || qty < 5) return { ok: false, reason: 'too-few', qty };
    const unit = eventPrice(itemId, item.price);
    const total = Math.round(unit * qty * 1.1 * 10) / 10;
    system.state.pending = system.state.pending + total;
    system.state.dailyEarned = system.state.dailyEarned + total;
    bulkTraded = bulkTraded + qty;
    dealsClaimed = dealsClaimed + 1;
    return { ok: true, total, qty, unit, bonus: 'bulk +10%' };
  }

  function dailyDeals() {
    const rows = [];
    for (const it of EXHIBITS) {
      const mult = museumMarketEventMult(currentEvent, it.id);
      if (mult !== 1) rows.push({ item: it.id, name: it.name, mult, event: currentEvent });
    }
    return rows;
  }

  function marketSummary() {
    return { event: currentEvent, season: currentSeason, dealsClaimed, bulkTraded, deals: dailyDeals() };
  }

  function seasonPrices() {
    const rows = [];
    for (const it of EXHIBITS) {
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
