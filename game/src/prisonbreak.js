export const CELL_BLOCKS = [
  { id: 'block-a', name: 'Block A', security: 2, patrol: 2, soil: 'soft', desc: 'Low security, friendly faces' },
  { id: 'block-b', name: 'Block B', security: 2, patrol: 3, soil: 'soft', desc: 'The general population block' },
  { id: 'block-c', name: 'Block C', security: 3, patrol: 3, soil: 'hard', desc: 'Tougher crowd, thicker walls' },
  { id: 'block-d', name: 'Block D', security: 3, patrol: 4, soil: 'hard', desc: 'Gang territory' },
  { id: 'block-e', name: 'Block E', security: 4, patrol: 4, soil: 'rock', desc: 'High security wing' },
  { id: 'block-f', name: 'Block F', security: 4, patrol: 5, soil: 'rock', desc: 'Maximum security' },
  { id: 'block-g', name: 'Block G', security: 5, patrol: 5, soil: 'rock', desc: 'The hole within the hole' },
  { id: 'block-h', name: 'Block H', security: 1, patrol: 1, soil: 'soft', desc: 'Minimum security, open doors' },
];

export const ESCAPE_PLANS = [
  { id: 'tunnel', name: 'Tunnel Dig', stages: 5, difficulty: 3, desc: 'Dig under the wall, spoon by spoon' },
  { id: 'laundry', name: 'Laundry Truck', stages: 3, difficulty: 2, desc: 'Hide in the laundry truck' },
  { id: 'uniform', name: 'Guard Uniform', stages: 4, difficulty: 4, desc: 'Walk out dressed as a guard' },
  { id: 'rooftop', name: 'Rooftop', stages: 4, difficulty: 4, desc: 'Over the roof and down the wall' },
  { id: 'infirmary', name: 'Infirmary', stages: 3, difficulty: 2, desc: 'Fake sick, slip out the back' },
  { id: 'riot', name: 'Riot', stages: 4, difficulty: 5, desc: 'Start a riot and walk out in the chaos' },
  { id: 'helicopter', name: 'Helicopter', stages: 5, difficulty: 5, desc: 'A chopper on the roof at dawn' },
  { id: 'sewer', name: 'Sewer', stages: 4, difficulty: 3, desc: 'Through the drains and out to the river' },
  { id: 'visitor', name: 'Visitor Swap', stages: 3, difficulty: 4, desc: 'Swap places with a visitor' },
  { id: 'kitchen', name: 'Kitchen Truck', stages: 3, difficulty: 2, desc: 'Hide in the food delivery truck' },
];

export const CONTRABAND = [
  { id: 'spoon', name: 'Spoon', value: 5, suspicion: 1, use: 'digging', desc: 'A sturdy spoon' },
  { id: 'soap', name: 'Soap', value: 3, suspicion: 0, use: 'trade', desc: 'Prison currency' },
  { id: 'cigarettes', name: 'Cigarettes', value: 10, suspicion: 2, use: 'trade', desc: 'The real prison money' },
  { id: 'food', name: 'Extra Food', value: 8, suspicion: 1, use: 'trade', desc: 'Smuggled from the kitchen' },
  { id: 'rope', name: 'Rope', value: 15, suspicion: 3, use: 'climbing', desc: 'Braided from bedsheets' },
  { id: 'lockpick', name: 'Lockpick', value: 25, suspicion: 4, use: 'locks', desc: 'Bent metal, opens most doors' },
  { id: 'phone', name: 'Phone', value: 100, suspicion: 5, use: 'contact', desc: 'A smuggled mobile phone' },
  { id: 'digging-kit', name: 'Digging Kit', value: 40, suspicion: 4, use: 'digging', desc: 'A proper digging set' },
  { id: 'tunnel-supports', name: 'Tunnel Supports', value: 30, suspicion: 3, use: 'digging', desc: 'Wood to hold the tunnel up' },
  { id: 'guard-disguise', name: 'Guard Disguise', value: 60, suspicion: 4, use: 'disguise', desc: 'A full guard uniform' },
  { id: 'copied-key', name: 'Copied Key', value: 50, suspicion: 4, use: 'locks', desc: 'A wax copy of a guard key' },
  { id: 'grappling-hook', name: 'Grappling Hook', value: 35, suspicion: 3, use: 'climbing', desc: 'Hook and rope for the roof' },
  { id: 'rope-ladder', name: 'Rope Ladder', value: 30, suspicion: 3, use: 'climbing', desc: 'A ladder that rolls up small' },
  { id: 'sleeping-pills', name: 'Sleeping Pills', value: 20, suspicion: 3, use: 'drugging', desc: 'Knock out a guard' },
  { id: 'smoke-bomb', name: 'Smoke Bomb', value: 25, suspicion: 3, use: 'distraction', desc: 'A thick cloud of smoke' },
];

export const CRAFT_RECIPES = [
  { id: 'digging-kit', name: 'Digging Kit', needs: { spoon: 2, soap: 1 }, desc: 'A spoon, sharpened and handled' },
  { id: 'rope', name: 'Rope', needs: { soap: 2 }, desc: 'Bedsheets braided into rope' },
  { id: 'lockpick', name: 'Lockpick', needs: { spoon: 1 }, desc: 'A spoon bent into a pick' },
  { id: 'smoke-bomb', name: 'Smoke Bomb', needs: { soap: 1, cigarettes: 2 }, desc: 'Chemicals and a fuse' },
  { id: 'guard-disguise', name: 'Guard Disguise', needs: { soap: 3, food: 2 }, desc: 'Traded piece by piece' },
  { id: 'tunnel-supports', name: 'Tunnel Supports', needs: { spoon: 1, soap: 2 }, desc: 'Wood scraps and wire' },
  { id: 'copied-key', name: 'Copied Key', needs: { soap: 2 }, desc: 'A key pressed into soap' },
  { id: 'rope-ladder', name: 'Rope Ladder', needs: { rope: 1, soap: 1 }, desc: 'Rope with wooden rungs' },
];

export const GUARDS = [
  { id: 'jenkins', name: 'Guard Jenkins', alertness: 3, bribable: 0.7, shift: 'day', desc: 'Tired and underpaid' },
  { id: 'martinez', name: 'Guard Martinez', alertness: 4, bribable: 0.4, shift: 'day', desc: 'By the book, mostly' },
  { id: 'oconnor', name: 'Guard O\'Connor', alertness: 2, bribable: 0.8, shift: 'night', desc: 'Falls asleep on shift' },
  { id: 'smith', name: 'Guard Smith', alertness: 5, bribable: 0.1, shift: 'day', desc: 'The warden\'s favourite' },
  { id: 'khan', name: 'Guard Khan', alertness: 3, bribable: 0.6, shift: 'night', desc: 'Looks the other way for a price' },
  { id: 'brown', name: 'Guard Brown', alertness: 4, bribable: 0.3, shift: 'night', desc: 'Sharp eyes at night' },
  { id: 'lee', name: 'Guard Lee', alertness: 2, bribable: 0.75, shift: 'day', desc: 'New and nervous' },
  { id: 'petrov', name: 'Guard Petrov', alertness: 5, bribable: 0.05, shift: 'night', desc: 'Never blinks' },
];

export const ALLIES = [
  { id: 'ghost', name: 'Ghost', skill: 'digging', cost: 100, desc: 'A quiet tunneller' },
  { id: 'muscles', name: 'Muscles', skill: 'strength', cost: 80, desc: 'Starts riots on request' },
  { id: 'sneaky', name: 'Sneaky', skill: 'stealth', cost: 120, desc: 'Nobody ever sees him' },
  { id: 'doc', name: 'Doc', skill: 'medical', cost: 150, desc: 'Runs the infirmary' },
  { id: 'cook', name: 'Cook', skill: 'kitchen', cost: 90, desc: 'Knows every truck schedule' },
  { id: 'tech', name: 'Tech', skill: 'electronics', cost: 200, desc: 'Loops cameras, picks locks' },
  { id: 'old-timer', name: 'Old Timer', skill: 'knowledge', cost: 50, desc: 'Knows every secret of Blackgate' },
  { id: 'fixer', name: 'Fixer', skill: 'trade', cost: 110, desc: 'Can get anything, for a price' },
];

export const PATROL_SCHEDULE = [
  { hour: 0, intensity: 2 }, { hour: 1, intensity: 1 }, { hour: 2, intensity: 1 },
  { hour: 3, intensity: 1 }, { hour: 4, intensity: 2 }, { hour: 5, intensity: 3 },
  { hour: 6, intensity: 4 }, { hour: 7, intensity: 4 }, { hour: 8, intensity: 3 },
  { hour: 9, intensity: 3 }, { hour: 10, intensity: 3 }, { hour: 11, intensity: 3 },
  { hour: 12, intensity: 4 }, { hour: 13, intensity: 4 }, { hour: 14, intensity: 3 },
  { hour: 15, intensity: 3 }, { hour: 16, intensity: 4 }, { hour: 17, intensity: 4 },
  { hour: 18, intensity: 3 }, { hour: 19, intensity: 3 }, { hour: 20, intensity: 3 },
  { hour: 21, intensity: 3 }, { hour: 22, intensity: 2 }, { hour: 23, intensity: 2 },
];

export const PRISON_MISSIONS = [
  { id: 'first-contraband', name: 'First Contraband', desc: 'Smuggle your first item', reward: 50 },
  { id: 'first-craft', name: 'First Craft', desc: 'Craft your first tool', reward: 80 },
  { id: 'first-bribe', name: 'First Bribe', desc: 'Bribe a guard successfully', reward: 100 },
  { id: 'tunnel-50', name: 'Halfway Out', desc: 'Dig the tunnel to 50 percent', reward: 150 },
  { id: 'tunnel-done', name: 'Tunnel Complete', desc: 'Finish the tunnel', reward: 300 },
  { id: 'first-escape', name: 'First Escape', desc: 'Escape Blackgate', reward: 500 },
  { id: 'unseen', name: 'Unseen', desc: 'Escape without being spotted', reward: 800 },
  { id: 'riot-escape', name: 'Riot Escape', desc: 'Escape during a riot', reward: 600 },
  { id: 'rep-50', name: 'Respected', desc: 'Reach 50 reputation', reward: 200 },
  { id: 'no-solitary', name: 'Clean Record', desc: 'Escape without ever going to solitary', reward: 400 },
];

export const SOLITARY_TERMS = [
  { days: 1, reason: 'minor offence' },
  { days: 3, reason: 'contraband found' },
  { days: 7, reason: 'fighting' },
  { days: 14, reason: 'escape attempt' },
];

export const HIDEOUTS = [
  { id: 'motel', name: 'Cheap Motel', costPerDay: 30, heatDrop: 5, desc: 'Nobody asks questions' },
  { id: 'friend', name: 'Friend\'s Couch', costPerDay: 0, heatDrop: 3, desc: 'Free, but risky' },
  { id: 'cabin', name: 'Forest Cabin', costPerDay: 50, heatDrop: 10, desc: 'Off the grid' },
  { id: 'apartment', name: 'Rented Apartment', costPerDay: 80, heatDrop: 8, desc: 'A real address, a real risk' },
  { id: 'boat', name: 'Harbour Boat', costPerDay: 60, heatDrop: 12, desc: 'Sleep on the water' },
];

export const YARD_WISDOM = [
  'Never owe anyone in the yard.',
  'The guards watch the new fish closest.',
  'A spoon is worth more than gold in here.',
  'The best time to move is during shift change.',
  'Trust no one, but make friends anyway.',
  'Solitary is where plans go to die.',
  'The tunnel is only as good as its supports.',
];

export const PRISON_JOBS = [
  { id: 'laundry', name: 'Laundry', pay: 5, rep: 1, desc: 'Fold clothes all day' },
  { id: 'kitchen', name: 'Kitchen', pay: 8, rep: 2, desc: 'Peel potatoes, steal food' },
  { id: 'workshop', name: 'Workshop', pay: 10, rep: 2, desc: 'Make license plates' },
  { id: 'cleaning', name: 'Cleaning', pay: 4, rep: 1, desc: 'Mop the halls' },
  { id: 'library', name: 'Library', pay: 6, rep: 2, desc: 'Quiet work, good gossip' },
  { id: 'garden', name: 'Garden', pay: 7, rep: 1, desc: 'Fresh air and dirt' },
  { id: 'sewing', name: 'Sewing', pay: 9, rep: 2, desc: 'Stitch uniforms' },
];

export const YARD_TRADES = [
  { give: 'soap', giveQty: 2, get: 'cigarettes', getQty: 1, desc: 'Soap for smokes' },
  { give: 'cigarettes', giveQty: 1, get: 'food', getQty: 2, desc: 'Smokes for food' },
  { give: 'food', giveQty: 3, get: 'soap', getQty: 2, desc: 'Food for soap' },
  { give: 'cigarettes', giveQty: 3, get: 'spoon', getQty: 1, desc: 'Smokes for a spoon' },
  { give: 'soap', giveQty: 5, get: 'cigarettes', getQty: 3, desc: 'Bulk soap deal' },
];

export const GUARD_ROSTER = [
  { shift: 'day', guards: ['jenkins', 'martinez', 'smith', 'lee'], note: 'Day shift, full strength' },
  { shift: 'night', guards: ['oconnor', 'khan', 'brown', 'petrov'], note: 'Night shift, half asleep' },
  { shift: 'swing', guards: ['jenkins', 'khan', 'lee'], note: 'Swing shift, changeover' },
];

export const ESCAPE_LEGENDS = [
  { name: 'The Mole', year: 1987, plan: 'tunnel', note: 'Dug for three years with a spoon' },
  { name: 'Silent Sam', year: 1995, plan: 'uniform', note: 'Walked out in a guard uniform' },
  { name: 'The Chef', year: 2001, plan: 'kitchen', note: 'Hid in a soup pot' },
  { name: 'Birdman', year: 2010, plan: 'rooftop', note: 'Flew off the roof on a glider' },
  { name: 'The Doc', year: 2015, plan: 'infirmary', note: 'Faked a heart attack' },
  { name: 'Ghost', year: 2020, plan: 'sewer', note: 'Nobody saw him leave' },
];

export const SEARCH_SCHEDULE = [
  { day: 'Monday', chance: 0.15, note: 'Random cell searches' },
  { day: 'Wednesday', chance: 0.25, note: 'Full block sweep' },
  { day: 'Friday', chance: 0.2, note: 'Contraband crackdown' },
  { day: 'Sunday', chance: 0.1, note: 'Light searches' },
];

export const YARD_PRICES = [
  { item: 'soap', price: 3 },
  { item: 'cigarettes', price: 10 },
  { item: 'food', price: 8 },
  { item: 'spoon', price: 5 },
  { item: 'rope', price: 15 },
  { item: 'phone', price: 100 },
  { item: 'lockpick', price: 25 },
  { item: 'smoke-bomb', price: 25 },
  { item: 'sleeping-pills', price: 20 },
  { item: 'guard-disguise', price: 60 },
  { item: 'copied-key', price: 50 },
  { item: 'digging-kit', price: 40 },
];

export const PRISON_SLANG = [
  'A fish is a new prisoner.',
  'The hole is solitary confinement.',
  'A shank is a homemade knife.',
  'The yard is the only free air in the prison.',
  'A kite is a secret note.',
  'The warden is the boss of everything.',
  'A cellie is your cellmate.',
  'Lockdown means nobody moves.',
];

export const HIDING_SPOTS = [
  { id: 'mattress', name: 'Mattress', risk: 2, desc: 'Under the mattress' },
  { id: 'toilet', name: 'Toilet Tank', risk: 3, desc: 'Inside the cistern' },
  { id: 'vent', name: 'Air Vent', risk: 4, desc: 'Behind the grille' },
  { id: 'floor', name: 'Loose Floorboard', risk: 2, desc: 'Under the floor' },
  { id: 'laundry', name: 'Laundry Pile', risk: 1, desc: 'Buried in dirty clothes' },
  { id: 'book', name: 'Hollow Book', risk: 2, desc: 'Inside a library book' },
  { id: 'shoe', name: 'Shoe Sole', risk: 3, desc: 'Under the insole' },
  { id: 'wall', name: 'Wall Crack', risk: 5, desc: 'Behind a loose brick' },
];

export const YARD_GAMES = [
  { id: 'cards', name: 'Cards', rep: 2, desc: 'Poker in the corner' },
  { id: 'chess', name: 'Chess', rep: 3, desc: 'The smart game' },
  { id: 'basketball', name: 'Basketball', rep: 2, desc: 'Run the court' },
  { id: 'weights', name: 'Weights', rep: 1, desc: 'Get strong' },
  { id: 'dominoes', name: 'Dominoes', rep: 1, desc: 'A quiet game' },
];

export const VISIT_RULES = [
  'Two visits per week maximum.',
  'No physical contact beyond a handshake.',
  'All visitors are searched.',
  'Visits last one hour.',
  'No gifts without approval.',
];

export const FAMOUS_PRISONS = [
  { name: 'Alcatraz', note: 'The Rock, escape-proof until it was not' },
  { name: 'Blackgate', note: 'Our home, for now' },
  { name: 'Shawshank', note: 'Famous for one very patient man' },
  { name: 'Sing Sing', note: 'The big house up the river' },
];

export const ESCAPE_TOOLS_RANKED = [
  { tool: 'spoon', rank: 5, note: 'Slow but reliable' },
  { tool: 'digging-kit', rank: 4, note: 'A real digging set' },
  { tool: 'lockpick', rank: 3, note: 'Opens most doors' },
  { tool: 'rope', rank: 2, note: 'Climb anything' },
  { tool: 'phone', rank: 1, note: 'Call the outside world' },
];

export const PRISON_FILMS = [
  { title: 'The Shawshank Redemption', year: 1994, note: 'Hope is a good thing' },
  { title: 'Escape from Alcatraz', year: 1979, note: 'The Rock, beaten' },
  { title: 'The Great Escape', year: 1963, note: 'Seventy-six men, one tunnel' },
];

export const INMATE_NICKNAMES = ['Ghost', 'Spoons', 'Lucky', 'Doc', 'Preacher', 'Tiny', 'Snake', 'Professor'];

export const PRISON_MOTTOS = [
  'Keep your head down and your plan close.',
  'The wall is only as strong as its weakest brick.',
  'Freedom is a tunnel away.',
  'Never trust a guard, never betray a friend.',
];

export const PRISON_PROVERBS = [
  'A spoon a day keeps the warden away.',
  'The patient prisoner walks free.',
  'Stone walls do not a prison make.',
  'Every lock has a key, every wall has a crack.',
];

export const FAMOUS_ESCAPES = [
  { escape: 'The Mole Tunnel', note: 'Three years of digging', year: 1987 },
  { escape: 'The Helicopter Lift', note: 'A chopper on the roof', year: 2012 },
  { escape: 'The Laundry Van', note: 'Hidden under dirty sheets' },
];

function blockById(id) {
  return CELL_BLOCKS.find((b) => b.id === id);
}

function planById(id) {
  return ESCAPE_PLANS.find((p) => p.id === id);
}

function itemById(id) {
  return CONTRABAND.find((c) => c.id === id);
}

function recipeById(id) {
  return CRAFT_RECIPES.find((r) => r.id === id);
}

function guardById(id) {
  return GUARDS.find((g) => g.id === id);
}

function allyById(id) {
  return ALLIES.find((a) => a.id === id);
}

function stageRequirement(planId, stage) {
  const table = {
    tunnel: { 1: { item: 'spoon', qty: 1 }, 2: { item: 'digging-kit', qty: 1 }, 3: { item: 'tunnel-supports', qty: 1 }, 4: { item: 'rope', qty: 1 }, 5: null },
    laundry: { 1: { ally: 'cook' }, 2: { item: 'soap', qty: 2 }, 3: null },
    uniform: { 1: { ally: 'sneaky' }, 2: { item: 'guard-disguise', qty: 1 }, 3: { item: 'copied-key', qty: 1 }, 4: null },
    rooftop: { 1: { item: 'grappling-hook', qty: 1 }, 2: { item: 'rope-ladder', qty: 1 }, 3: { ally: 'tech' }, 4: null },
    infirmary: { 1: { ally: 'doc' }, 2: { item: 'sleeping-pills', qty: 1 }, 3: null },
    riot: { 1: { ally: 'muscles' }, 2: { item: 'cigarettes', qty: 3 }, 3: { item: 'smoke-bomb', qty: 1 }, 4: null },
    helicopter: { 1: { item: 'phone', qty: 1 }, 2: { ally: 'tech' }, 3: { item: 'rope', qty: 1 }, 4: { item: 'smoke-bomb', qty: 1 }, 5: null },
    sewer: { 1: { item: 'digging-kit', qty: 1 }, 2: { item: 'rope', qty: 1 }, 3: { item: 'lockpick', qty: 1 }, 4: null },
    visitor: { 1: { ally: 'sneaky' }, 2: { item: 'guard-disguise', qty: 1 }, 3: null },
    kitchen: { 1: { ally: 'cook' }, 2: { item: 'food', qty: 2 }, 3: null },
  };
  const row = table[planId];
  if (!row) return null;
  return row[stage] === undefined ? null : row[stage];
}

export function patrolIntensity(hour) {
  const row = PATROL_SCHEDULE.find((p) => p.hour === hour);
  return row ? row.intensity : 3;
}

export function bestEscapeHour() {
  let best = PATROL_SCHEDULE[0];
  for (const row of PATROL_SCHEDULE) {
    if (row.intensity < best.intensity) best = row;
  }
  return best.hour;
}

export function jobPayFor(jobId, reputation) {
  const job = PRISON_JOBS.find((j) => j.id === jobId);
  if (!job) return 0;
  return job.pay + Math.floor(reputation / 10);
}

export function tradePossible(contraband, trade) {
  return (contraband[trade.give] || 0) >= trade.giveQty;
}

export function applyTrade(contraband, trade) {
  if (!tradePossible(contraband, trade)) return { ok: false, error: 'trade not possible' };
  const next = { ...contraband };
  next[trade.give] -= trade.giveQty;
  if (next[trade.give] <= 0) delete next[trade.give];
  next[trade.get] = (next[trade.get] || 0) + trade.getQty;
  return { ok: true, contraband: next };
}

export function guardsOnShift(shift) {
  const row = GUARD_ROSTER.find((r) => r.shift === shift);
  return row ? [...row.guards] : [];
}

export function searchChanceFor(dayName) {
  const row = SEARCH_SCHEDULE.find((s) => s.day === dayName);
  return row ? row.chance : 0.15;
}

export function yardPriceFor(itemId) {
  const row = YARD_PRICES.find((p) => p.item === itemId);
  return row ? row.price : 10;
}

export function escapeChanceEstimate(detection, hour, cameraLoop, bribed, riot, disguised, difficulty) {
  let chance = 0.55;
  chance += (5 - patrolIntensity(hour)) * 0.06;
  chance -= detection / 200;
  if (cameraLoop > 0) chance += 0.15;
  if (bribed) chance += 0.15;
  if (riot) chance += 0.15;
  if (disguised) chance += 0.1;
  if (difficulty <= 2) chance += 0.1;
  if (difficulty >= 5) chance -= 0.1;
  return Math.max(0.05, Math.min(0.95, Math.round(chance * 100) / 100));
}

export function solitaryTermFor(reason) {
  const row = SOLITARY_TERMS.find((t) => t.reason === reason);
  return row ? row.days : 1;
}

export function heatAfterEscape(difficulty) {
  return 50 + difficulty * 10;
}

export function sentenceLeft(sentenceDays, daysServed) {
  return Math.max(0, sentenceDays - daysServed);
}

export function reputationForPlan(planId) {
  const plan = planById(planId);
  return plan ? plan.difficulty * 5 : 0;
}

export function blockSecurityFor(blockId) {
  const block = blockById(blockId);
  return block ? block.security : 2;
}

export function hidingSpotRisk(spotId) {
  const spot = HIDING_SPOTS.find((s) => s.id === spotId);
  return spot ? spot.risk : 2;
}

export function safestHidingSpot() {
  return HIDING_SPOTS.slice().sort((a, b) => a.risk - b.risk)[0];
}

export function yardGameRep(gameId) {
  const game = YARD_GAMES.find((g) => g.id === gameId);
  return game ? game.rep : 0;
}

export function slangMeaningPrison(term) {
  const row = PRISON_SLANG.find((s) => s.toLowerCase().startsWith(term.toLowerCase()));
  return row || 'No slang for that term.';
}

export function visitHoursLeft(used) {
  return Math.max(0, 2 - used);
}

export function prisonForName(name) {
  return FAMOUS_PRISONS.find((p) => p.name === name) || null;
}

export function escapeToolRank(toolId) {
  const row = ESCAPE_TOOLS_RANKED.find((t) => t.tool === toolId);
  return row ? row.rank : 99;
}

export function filmForYearPrison(year) {
  return PRISON_FILMS.find((f) => f.year === year) || null;
}

export function randomInmateNickname(rng) {
  const r = rng || Math.random;
  return INMATE_NICKNAMES[Math.floor(r() * INMATE_NICKNAMES.length)];
}

export function prisonMottoFor(index) {
  return PRISON_MOTTOS[((index % PRISON_MOTTOS.length) + PRISON_MOTTOS.length) % PRISON_MOTTOS.length];
}

export function proverbPrison(index) {
  return PRISON_PROVERBS[((index % PRISON_PROVERBS.length) + PRISON_PROVERBS.length) % PRISON_PROVERBS.length];
}

export function famousEscapeFor(name) {
  return FAMOUS_ESCAPES.find((e) => e.escape === name) || null;
}

export function createPrisonBreakSystem(deps = {}) {
  const rng = typeof deps.rng === 'function' ? deps.rng : Math.random;
  const getHour = typeof deps.getHour === 'function' ? deps.getHour : () => 12;
  const getDay = typeof deps.getDay === 'function' ? deps.getDay : () => 1;
  const getCash = typeof deps.getCash === 'function' ? deps.getCash : () => 0;
  const addCash = typeof deps.addCash === 'function' ? deps.addCash : () => {};
  const addHeat = typeof deps.addHeat === 'function' ? deps.addHeat : () => {};
  const log = typeof deps.log === 'function' ? deps.log : () => {};
  const getPlayerPos = typeof deps.getPlayerPos === 'function' ? deps.getPlayerPos : () => ({ x: 0, z: 0 });

  const state = {
    inPrison: true,
    sentenceDays: 30,
    daysServed: 0,
    blockId: 'block-b',
    planId: null,
    planStage: 0,
    planProgress: 0,
    contraband: { spoon: 1, soap: 2 },
    tools: [],
    alliesHired: [],
    reputation: 0,
    suspicion: 0,
    solitaryDays: 0,
    inSolitary: false,
    detection: 0,
    tunnelProgress: 0,
    tunnelComplete: false,
    bribesPaid: 0,
    escapes: 0,
    escapesUnseen: 0,
    timesCaught: 0,
    hideoutId: null,
    heat: 0,
    missionsDone: {},
    day: 1,
    lastActionDay: 0,
    riotActive: false,
    cameraLoop: 0,
    disguised: false,
  };

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const mission = PRISON_MISSIONS.find((m) => m.id === id);
    if (!mission) return;
    let done = false;
    if (id === 'first-contraband') done = Object.keys(state.contraband).length > 0;
    else if (id === 'first-craft') done = state.tools.length >= 1;
    else if (id === 'first-bribe') done = state.bribesPaid >= 1;
    else if (id === 'tunnel-50') done = state.tunnelProgress >= 50;
    else if (id === 'tunnel-done') done = state.tunnelComplete;
    else if (id === 'first-escape') done = state.escapes >= 1;
    else if (id === 'unseen') done = state.escapesUnseen >= 1;
    else if (id === 'riot-escape') done = (state.riotEscapes || 0) >= 1;
    else if (id === 'rep-50') done = state.reputation >= 50;
    else if (id === 'no-solitary') done = state.escapes >= 1 && state.timesCaught === 0;
    if (!done) return;
    state.missionsDone[id] = true;
    addCash(mission.reward);
    log(`Mission complete: ${mission.name}`);
  }

  const system = {
    state,

    chooseBlock(blockId) {
      const block = blockById(blockId);
      if (!block) return { ok: false, error: 'unknown block' };
      if (!state.inPrison) return { ok: false, error: 'already free' };
      if (block.security >= 4 && state.reputation < 20) return { ok: false, error: 'need 20 reputation' };
      state.blockId = blockId;
      log(`Moved to ${block.name}`);
      return { ok: true, block };
    },

    choosePlan(planId) {
      const plan = planById(planId);
      if (!plan) return { ok: false, error: 'unknown plan' };
      if (!state.inPrison) return { ok: false, error: 'already free' };
      state.planId = planId;
      state.planStage = 0;
      state.planProgress = 0;
      log(`Chose plan: ${plan.name}`);
      return { ok: true, plan };
    },

    smuggle(itemId, qty) {
      const item = itemById(itemId);
      if (!item) return { ok: false, error: 'unknown contraband' };
      const quantity = Math.max(1, Math.min(5, qty || 1));
      const total = item.value * quantity;
      if (getCash() < total) return { ok: false, error: 'not enough cash' };
      const catchChance = 0.1 + item.suspicion * 0.05;
      if (rng() < catchChance) {
        state.suspicion += 20;
        state.timesCaught += 1;
        return { ok: false, error: 'caught smuggling', suspicion: state.suspicion };
      }
      addCash(-total);
      state.contraband[itemId] = (state.contraband[itemId] || 0) + quantity;
      checkMission('first-contraband');
      log(`Smuggled ${quantity}x ${item.name}`);
      return { ok: true, item, qty: quantity, stock: state.contraband[itemId] };
    },

    craftTool(recipeId) {
      const recipe = recipeById(recipeId);
      if (!recipe) return { ok: false, error: 'unknown recipe' };
      for (const needId of Object.keys(recipe.needs)) {
        if ((state.contraband[needId] || 0) < recipe.needs[needId]) {
          return { ok: false, error: 'missing contraband' };
        }
      }
      for (const needId of Object.keys(recipe.needs)) {
        state.contraband[needId] -= recipe.needs[needId];
        if (state.contraband[needId] <= 0) delete state.contraband[needId];
      }
      state.tools.push(recipeId);
      state.reputation += 5;
      checkMission('first-craft');
      log(`Crafted ${recipe.name}`);
      return { ok: true, recipe };
    },

    hireAlly(allyId) {
      const ally = allyById(allyId);
      if (!ally) return { ok: false, error: 'unknown ally' };
      if (state.alliesHired.includes(allyId)) return { ok: false, error: 'already hired' };
      if (getCash() < ally.cost) return { ok: false, error: 'not enough cash' };
      addCash(-ally.cost);
      state.alliesHired.push(allyId);
      state.reputation += 3;
      log(`Hired ${ally.name}`);
      return { ok: true, ally };
    },

    bribeGuard(guardId, amount) {
      const guard = guardById(guardId);
      if (!guard) return { ok: false, error: 'unknown guard' };
      if (!amount || amount <= 0) return { ok: false, error: 'amount must be positive' };
      if (getCash() < amount) return { ok: false, error: 'not enough cash' };
      const hour = getHour();
      let chance = guard.bribable * Math.max(0.3, Math.min(1.5, amount / 100));
      if (hour >= 2 && hour < 4) chance *= 1.3;
      chance = Math.max(0, Math.min(0.95, chance));
      addCash(-amount);
      if (rng() < chance) {
        state.bribesPaid += 1;
        state.suspicion = Math.max(0, state.suspicion - 5);
        state.bribedGuard = guardId;
        checkMission('first-bribe');
        log(`${guard.name} accepted the bribe`);
        return { ok: true, accepted: true, guard: guard.name };
      }
      state.suspicion += 25;
      log(`${guard.name} refused the bribe`);
      return { ok: true, accepted: false, guard: guard.name, suspicion: state.suspicion };
    },

    digTunnel() {
      if (!state.inPrison) return { ok: false, error: 'already free' };
      if (state.planId !== 'tunnel' && state.planId !== 'sewer') return { ok: false, error: 'plan is not a tunnel plan' };
      if (state.inSolitary) return { ok: false, error: 'in solitary' };
      const block = blockById(state.blockId);
      let power = state.tools.includes('digging-kit') ? 8 : 3;
      const soilMult = block.soil === 'soft' ? 1 : block.soil === 'hard' ? 0.6 : 0.35;
      power *= soilMult;
      if (state.alliesHired.includes('ghost')) power *= 1.5;
      state.tunnelProgress = Math.max(0, Math.min(100, state.tunnelProgress + power));
      const plan = planById(state.planId);
      state.planProgress = state.tunnelProgress;
      state.detection += patrolIntensity(getHour()) * 1.5;
      if (rng() < 0.1 && !state.tools.includes('tunnel-supports')) {
        state.tunnelProgress = Math.max(0, state.tunnelProgress - 6);
        return { ok: true, progress: Math.round(state.tunnelProgress), detection: Math.round(state.detection), event: 'collapse' };
      }
      if (state.tunnelProgress >= 100) {
        state.tunnelComplete = true;
        state.planStage = plan.stages;
        checkMission('tunnel-done');
      }
      checkMission('tunnel-50');
      return { ok: true, progress: Math.round(state.tunnelProgress), detection: Math.round(state.detection) };
    },

    advancePlan() {
      if (!state.inPrison) return { ok: false, error: 'already free' };
      if (!state.planId) return { ok: false, error: 'no plan chosen' };
      const plan = planById(state.planId);
      if (state.planStage >= plan.stages) return { ok: false, error: 'plan already complete' };
      const next = state.planStage + 1;
      const req = stageRequirement(state.planId, next);
      let desc = `Worked on the ${plan.name} plan, stage ${next}`;
      if (req) {
        if (req.item) {
          const haveItem = (state.contraband[req.item] || 0) >= req.qty;
          const haveTool = state.tools.includes(req.item);
          if (!haveItem && !haveTool) return { ok: false, error: `need ${req.qty}x ${req.item}` };
          if (haveItem) {
            state.contraband[req.item] -= req.qty;
            if (state.contraband[req.item] <= 0) delete state.contraband[req.item];
          }
        }
        if (req.ally && !state.alliesHired.includes(req.ally)) {
          return { ok: false, error: `need ally ${req.ally}` };
        }
      }
      state.planStage = next;
      state.planProgress = Math.round((state.planStage / plan.stages) * 100);
      state.detection += plan.difficulty * 2;
      log(desc);
      return { ok: true, stage: state.planStage, totalStages: plan.stages, desc };
    },

    causeDistraction(kind) {
      if (kind === 'riot') {
        if (!state.alliesHired.includes('muscles')) return { ok: false, error: 'need the muscles ally' };
        state.riotActive = true;
        state.detection = Math.max(0, state.detection - 30);
        return { ok: true, effect: 'A riot breaks out in the yard!' };
      }
      if (kind === 'smoke') {
        if (!state.tools.includes('smoke-bomb')) return { ok: false, error: 'need a smoke bomb' };
        state.tools = state.tools.filter((t) => t !== 'smoke-bomb');
        state.detection = Math.max(0, state.detection - 20);
        return { ok: true, effect: 'Smoke fills the corridor!' };
      }
      if (kind === 'fight') {
        state.detection += 10;
        state.reputation += 5;
        return { ok: true, effect: 'A fight breaks out, everyone is watching!' };
      }
      return { ok: false, error: 'unknown distraction' };
    },

    loopCameras() {
      if (!state.alliesHired.includes('tech')) return { ok: false, error: 'need the tech ally' };
      state.cameraLoop = 240;
      log('Cameras looped for 240 seconds');
      return { ok: true, seconds: 240 };
    },

    attemptEscape() {
      if (!state.inPrison) return { ok: false, error: 'already free' };
      if (!state.planId) return { ok: false, error: 'no plan chosen' };
      const plan = planById(state.planId);
      if (state.planStage < plan.stages && !state.tunnelComplete) {
        return { ok: false, error: 'plan not complete' };
      }
      const chance = escapeChanceEstimate(
        state.detection,
        getHour(),
        state.cameraLoop,
        !!state.bribedGuard,
        state.riotActive,
        state.disguised,
        plan.difficulty,
      );
      const roll = rng();
      if (roll < chance) {
        state.inPrison = false;
        state.escapes += 1;
        const unseen = roll < chance * 0.6;
        if (unseen) state.escapesUnseen += 1;
        if (state.riotActive) state.riotEscapes = (state.riotEscapes || 0) + 1;
        state.heat = heatAfterEscape(plan.difficulty);
        addHeat(3);
        const reward = 500 + plan.difficulty * 200;
        addCash(reward);
        checkMission('first-escape');
        checkMission('unseen');
        checkMission('riot-escape');
        checkMission('no-solitary');
        log(`Escaped Blackgate! Heat ${state.heat}`);
        return { ok: true, escaped: true, unseen, heat: state.heat, reward };
      }
      state.timesCaught += 1;
      state.tools = [];
      state.detection = 100;
      state.suspicion += 30;
      state.solitaryDays = 14;
      state.inSolitary = true;
      state.planStage = 0;
      state.planProgress = 0;
      state.tunnelProgress = 0;
      state.tunnelComplete = false;
      log('Caught escaping! Fourteen days in solitary.');
      return { ok: true, escaped: false, solitaryDays: 14 };
    },

    serveSolitary() {
      if (!state.inSolitary) return { ok: false, error: 'not in solitary' };
      state.solitaryDays -= 1;
      if (state.solitaryDays <= 0) {
        state.solitaryDays = 0;
        state.inSolitary = false;
        state.detection = 40;
        log('Released from solitary');
      } else {
        log(`${state.solitaryDays} days left in solitary`);
      }
      return { ok: true, daysLeft: state.solitaryDays };
    },

    layLow(hideoutId, days) {
      if (state.inPrison) return { ok: false, error: 'still in prison' };
      const hideout = HIDEOUTS.find((h) => h.id === hideoutId);
      if (!hideout) return { ok: false, error: 'unknown hideout' };
      const count = Math.max(1, Math.min(7, days || 1));
      const cost = hideout.costPerDay * count;
      if (getCash() < cost) return { ok: false, error: 'not enough cash' };
      addCash(-cost);
      state.heat = Math.max(0, state.heat - hideout.heatDrop * count);
      state.hideoutId = hideoutId;
      log(`Laying low at ${hideout.name} for ${count} days`);
      return { ok: true, heat: state.heat, hideout: hideout.name };
    },

    getCaughtBySearch() {
      const ids = Object.keys(state.contraband);
      if (ids.length === 0) return { ok: true, found: null };
      if (rng() < state.suspicion / 150) {
        const foundId = ids[Math.floor(rng() * ids.length)];
        const item = itemById(foundId);
        state.contraband[foundId] -= 1;
        if (state.contraband[foundId] <= 0) delete state.contraband[foundId];
        state.timesCaught += 1;
        if (item.suspicion >= 4) {
          state.solitaryDays += 3;
          state.inSolitary = true;
        } else {
          state.suspicion += 10;
        }
        return { ok: true, found: item.name };
      }
      return { ok: true, found: null };
    },

    missions() {
      return PRISON_MISSIONS.map((m) => ({ ...m, done: !!state.missionsDone[m.id] }));
    },

    tick(dt) {
      const day = getDay();
      if (day !== state.day) {
        state.day = day;
        if (state.inPrison) {
          state.daysServed += 1;
          if (state.daysServed >= state.sentenceDays) {
            state.inPrison = false;
            log('Sentence served, you are free!');
          }
          if (rng() < 0.15) this.getCaughtBySearch();
          state.suspicion = Math.max(0, state.suspicion - 5);
          state.detection = Math.max(0, state.detection - 10);
        } else {
          state.heat = Math.max(0, state.heat - 1);
        }
      }
      if (state.cameraLoop > 0) state.cameraLoop = Math.max(0, state.cameraLoop - (dt || 0));
      if (state.inSolitary) state.detection = 100;
      const hour = getHour();
      state._nightWindow = hour >= 2 && hour < 4;
    },

    hudLine() {
      if (!state.inPrison) {
        return `Free! | heat ${state.heat} | escapes ${state.escapes}`;
      }
      const block = blockById(state.blockId);
      let line = `Prison ${block.name} | day ${state.daysServed}/${state.sentenceDays} | detection ${Math.round(state.detection)}%`;
      if (state.planId) {
        const plan = planById(state.planId);
        line += ` | ${plan.name} stage ${state.planStage}/${plan.stages}`;
      } else {
        line += ' | no plan yet';
      }
      if (state.inSolitary) line += ' | SOLITARY';
      return line;
    },

    summary() {
      return {
        inPrison: state.inPrison,
        daysServed: state.daysServed,
        sentenceDays: state.sentenceDays,
        planId: state.planId,
        planStage: state.planStage,
        reputation: state.reputation,
        suspicion: state.suspicion,
        escapes: state.escapes,
        heat: state.heat,
        missionsDone: Object.keys(state.missionsDone).length,
      };
    },

    serialize() {
      return {
        inPrison: state.inPrison,
        sentenceDays: state.sentenceDays,
        daysServed: state.daysServed,
        blockId: state.blockId,
        planId: state.planId,
        planStage: state.planStage,
        planProgress: state.planProgress,
        contraband: { ...state.contraband },
        tools: [...state.tools],
        alliesHired: [...state.alliesHired],
        reputation: state.reputation,
        suspicion: state.suspicion,
        solitaryDays: state.solitaryDays,
        detection: state.detection,
        tunnelProgress: state.tunnelProgress,
        tunnelComplete: state.tunnelComplete,
        bribesPaid: state.bribesPaid,
        escapes: state.escapes,
        escapesUnseen: state.escapesUnseen,
        timesCaught: state.timesCaught,
        heat: state.heat,
        missionsDone: { ...state.missionsDone },
      };
    },

    deserialize(saved) {
      if (!saved || typeof saved !== 'object') return;
      if (typeof saved.inPrison === 'boolean') state.inPrison = saved.inPrison;
      if (typeof saved.tunnelComplete === 'boolean') state.tunnelComplete = saved.tunnelComplete;
      if (typeof saved.sentenceDays === 'number') state.sentenceDays = saved.sentenceDays;
      if (typeof saved.daysServed === 'number') state.daysServed = saved.daysServed;
      if (typeof saved.blockId === 'string') state.blockId = saved.blockId;
      if (typeof saved.planId === 'string' || saved.planId === null) state.planId = saved.planId;
      const numeric = ['planStage', 'planProgress', 'reputation', 'suspicion', 'solitaryDays', 'detection', 'tunnelProgress', 'bribesPaid', 'escapes', 'escapesUnseen', 'timesCaught', 'heat'];
      for (const key of numeric) {
        if (typeof saved[key] === 'number') state[key] = saved[key];
      }
      if (saved.contraband && typeof saved.contraband === 'object') state.contraband = { ...saved.contraband };
      if (Array.isArray(saved.tools)) state.tools = [...saved.tools];
      if (Array.isArray(saved.alliesHired)) state.alliesHired = [...saved.alliesHired];
      if (saved.missionsDone && typeof saved.missionsDone === 'object') state.missionsDone = { ...saved.missionsDone };
    },
  };

  return system;
}
