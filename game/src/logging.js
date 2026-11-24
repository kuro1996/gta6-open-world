export const LOGGING_TREES = [
  { id: 'pine', name: 'Pine', value: 14, wood: 5, hardness: 1, rarity: 0.3, stand: 'ridge', regrow: 2, desc: 'Straight, fast-growing, everywhere on the ridge.' },
  { id: 'oak', name: 'Oak', value: 40, wood: 12, hardness: 2, rarity: 0.2, stand: 'valley', regrow: 4, desc: 'Heavy, hard, and worth the sweat.' },
  { id: 'birch', name: 'Birch', value: 18, wood: 6, hardness: 1, rarity: 0.25, stand: 'marsh', regrow: 3, desc: 'Pale bark, light wood, good for pulp.' },
  { id: 'cedar', name: 'Cedar', value: 55, wood: 10, hardness: 2, rarity: 0.15, stand: 'grove', regrow: 5, desc: 'Sweet-smelling wood for fine veneer.' },
  { id: 'maple', name: 'Maple', value: 35, wood: 9, hardness: 2, rarity: 0.18, stand: 'ridge', regrow: 4, desc: 'Sap in spring, good timber all year.' },
  { id: 'willow', name: 'Willow', value: 22, wood: 7, hardness: 1, rarity: 0.22, stand: 'marsh', regrow: 3, desc: 'Bends by the water, easy to fell.' },
  { id: 'walnut', name: 'Walnut', value: 90, wood: 14, hardness: 3, rarity: 0.08, stand: 'valley', regrow: 8, desc: 'Dark, rich wood the furniture makers crave.' },
  { id: 'ash', name: 'Ash', value: 30, wood: 8, hardness: 2, rarity: 0.16, stand: 'ridge', regrow: 4, desc: 'Springy and strong, good for tool handles.' },
  { id: 'elm', name: 'Elm', value: 28, wood: 8, hardness: 2, rarity: 0.14, stand: 'valley', regrow: 4, desc: 'Tough-grained valley timber.' },
  { id: 'redwood', name: 'Redwood', value: 180, wood: 30, hardness: 4, rarity: 0.03, stand: 'grove', regrow: 12, desc: 'An ancient giant. Felling one takes years to replace.' },
];

export const LOGGING_STANDS = [
  { id: 'ridge', name: 'High Ridge', district: 'Hills', trees: 0.8, danger: 1, mult: 1.0, timeMin: 60, desc: 'Windy ridge pines and maples.' },
  { id: 'valley', name: 'Green Valley', district: 'Valley', trees: 0.7, danger: 1, mult: 1.1, timeMin: 60, desc: 'Rich valley oaks and walnuts.' },
  { id: 'marsh', name: 'Wet Marsh', district: 'Lowlands', trees: 0.6, danger: 2, mult: 1.0, timeMin: 45, desc: 'Soggy ground, birch and willow.' },
  { id: 'grove', name: 'Old Grove', district: 'Ancient', trees: 0.4, danger: 2, mult: 1.5, timeMin: 90, desc: 'The old grove. Redwoods. Permits required.' },
];

export const LOGGING_BUYERS = [
  { id: 'sawmill', name: 'The Sawmill', mult: 1.0, likes: ['pine', 'oak'], dislikes: ['willow'], mood: 'steady', minRank: 0, desc: 'Buys logs by the truckload.' },
  { id: 'builder', name: 'The Builder', mult: 1.1, likes: ['oak', 'ash', 'elm'], dislikes: ['birch'], mood: 'busy', minRank: 1, desc: 'Wants strong beams for houses.' },
  { id: 'furniture', name: 'Furniture Maker', mult: 1.3, likes: ['walnut', 'cedar', 'maple'], dislikes: ['pine'], mood: 'picky', minRank: 2, desc: 'Pays top coin for fine hardwoods.' },
  { id: 'paper', name: 'Paper Mill', mult: 0.9, likes: ['birch', 'pine'], dislikes: ['walnut'], mood: 'flat', minRank: 0, desc: 'Turns softwood into pulp, cheaply.' },
  { id: 'exporter', name: 'Timber Exporter', mult: 1.4, likes: ['redwood', 'cedar', 'walnut'], dislikes: ['willow'], mood: 'eager', minRank: 3, desc: 'Ships the best timber overseas.' },
];

export const LOGGING_UPGRADES = [
  { id: 'axe', name: 'Felling Axe', cost: 90, desc: 'A sharp axe that bites deep.', effect: 'fell' },
  { id: 'saw', name: 'Crosscut Saw', cost: 150, desc: 'A two-man saw for faster felling.', effect: 'fell' },
  { id: 'permit', name: 'Felling Permit', cost: 120, desc: 'A stamped permit for the old grove.', effect: 'legal' },
  { id: 'truck', name: 'Log Truck', cost: 380, desc: 'A truck that hauls twice the timber.', effect: 'carry' },
  { id: 'chainsaw', name: 'Chainsaw', cost: 520, desc: 'A roaring chainsaw for the big trees.', effect: 'fell' },
  { id: 'mill', name: 'Sawmill', cost: 750, desc: 'Your own mill for boards and products.', effect: 'saw' },
  { id: 'saplings', name: 'Sapling Nursery', cost: 300, desc: 'Free saplings for replanting.', effect: 'replant' },
  { id: 'crane', name: 'Skidder Crane', cost: 1100, desc: 'A crane that wrestles redwoods down.', effect: 'carry' },
];

export const LOGGING_RANKS = [
  { level: 0, name: 'Brush Cutter', xp: 0, perk: 'Learning which end of the axe to hold.' },
  { level: 1, name: 'Lumberjack', xp: 120, perk: 'A steady swing and a straight fall.' },
  { level: 2, name: 'Feller', xp: 300, perk: 'Trusted with the big trees.' },
  { level: 3, name: 'Timber Boss', xp: 620, perk: 'The grove answers to you.' },
  { level: 4, name: 'Master of Timberline', xp: 1100, perk: 'Every stand in the county is yours.' },
];

export const LOGGING_PRODUCTS = [
  { id: 'board', name: 'Board', from: 'any', value: 12, desc: 'A plain sawn board.' },
  { id: 'beam', name: 'Beam', from: 'oak', value: 45, desc: 'A heavy oak beam.' },
  { id: 'plank', name: 'Plank', from: 'walnut', value: 90, desc: 'A fine walnut plank.' },
  { id: 'pulp', name: 'Pulp', from: 'birch', value: 6, desc: 'Pulp for the paper mill.' },
  { id: 'firewood', name: 'Firewood', from: 'pine', value: 8, desc: 'Split pine for winter fires.' },
  { id: 'veneer', name: 'Veneer', from: 'cedar', value: 70, desc: 'Thin cedar veneer, sweet-smelling.' },
];

export const LOGGING_EVENTS = [
  { id: 'storm-fall', name: 'Storm Fall', mult: 1.2, trees: ['pine', 'birch', 'willow'], desc: 'A storm dropped trees all over the stands.' },
  { id: 'building-boom', name: 'Building Boom', mult: 1.3, trees: ['oak', 'pine'], desc: 'Everyone is building; timber prices jump.' },
  { id: 'furniture-fair', name: 'Furniture Fair', mult: 1.2, trees: ['walnut', 'cedar'], desc: 'Fine furniture is in fashion this week.' },
  { id: 'warden-crackdown', name: 'Warden Crackdown', mult: 0.8, trees: [], desc: 'The warden is checking permits everywhere.' },
  { id: 'beetle', name: 'Beetle Blight', mult: 0.7, trees: ['pine'], desc: 'Beetles are eating the pines.' },
  { id: 'sap-season', name: 'Sap Season', mult: 1.1, trees: ['maple', 'birch'], desc: 'The sap runs sweet and the maples pay.' },
];

export const LOGGING_CONTRACTS = [
  { id: 'pine-30', name: 'Pine Thirty', tree: 'pine', qty: 15, pay: 280, days: 2, rep: 0, desc: 'Fifteen pines for the sawmill.' },
  { id: 'oak-10', name: 'Oak Ten', tree: 'oak', qty: 6, pay: 420, days: 2, rep: 1, desc: 'Six oaks for the builder.' },
  { id: 'walnut-4', name: 'Walnut Four', tree: 'walnut', qty: 4, pay: 560, days: 3, rep: 2, desc: 'Four walnuts for the furniture maker.' },
  { id: 'cedar-8', name: 'Cedar Eight', tree: 'cedar', qty: 5, pay: 480, days: 2, rep: 1, desc: 'Five cedars for veneer.' },
  { id: 'redwood-1', name: 'One Redwood', tree: 'redwood', qty: 1, pay: 900, days: 3, rep: 3, desc: 'A single redwood, nothing less.' },
  { id: 'firewood-20', name: 'Firewood Twenty', tree: 'pine', qty: 20, pay: 300, days: 1, rep: 0, desc: 'Twenty pines split for firewood.' },
];

export const LOGGING_HAZARDS = [
  { id: 'widowmaker', name: 'Widowmaker', chance: 0.08, damage: 4, desc: 'A dead limb drops from above.' },
  { id: 'kickback', name: 'Kickback', chance: 0.1, damage: 3, desc: 'The saw kicks back hard.' },
  { id: 'bees', name: 'Bees', chance: 0.12, damage: 2, desc: 'A hive hidden in the hollow trunk.' },
  { id: 'slip', name: 'Slip', chance: 0.1, damage: 1, desc: 'Wet bark underfoot.' },
  { id: 'sap', name: 'Sticky Sap', chance: 0.15, damage: 1, desc: 'Sap all over your hands and tools.' },
];

export const LOGGING_HELPERS = [
  { id: 'sawyer', name: 'Sawyer', wage: 35, skill: 'saw', bonus: 0.2, desc: 'Saws boards straight and true.' },
  { id: 'hauler', name: 'Hauler', wage: 50, skill: 'carry', bonus: 0.4, desc: 'Hauls logs you could never lift.' },
  { id: 'forester', name: 'Forester', wage: 55, skill: 'replant', bonus: 0.5, desc: 'Plants a sapling for every stump.' },
  { id: 'climber', name: 'Climber', wage: 45, skill: 'fell', bonus: 0.25, desc: 'Tops trees from the canopy down.' },
];

export const LOGGING_CHALLENGES = [
  { id: 'trees-10', name: 'Ten Trees', target: 'treesFelled', goal: 10, xp: 80, desc: 'Fell ten trees.' },
  { id: 'wood-500', name: 'Five Hundred Wood', target: 'woodCut', goal: 500, xp: 100, desc: 'Cut five hundred wood.' },
  { id: 'boards-100', name: 'A Hundred Boards', target: 'boardsSawn', goal: 100, xp: 110, desc: 'Saw a hundred boards.' },
  { id: 'earn-1000', name: 'A Thousand Earned', target: 'earned', goal: 1000, xp: 120, desc: 'Earn a thousand from timber.' },
  { id: 'replant-50', name: 'Fifty Replanted', target: 'replanted', goal: 50, xp: 130, desc: 'Replant fifty saplings.' },
  { id: 'contracts-5', name: 'Five Contracts', target: 'contractsDone', goal: 5, xp: 140, desc: 'Finish five logging contracts.' },
  { id: 'redwood-1', name: 'One Redwood', target: 'bestValue', goal: 180, xp: 200, desc: 'Fell a tree worth at least 180.' },
  { id: 'rep-90', name: 'Beloved Forester', target: 'reputation', goal: 90, xp: 150, desc: 'Raise reputation to ninety.' },
];

export const LOGGING_ACHIEVEMENTS = [
  { id: 'first-tree', name: 'First Tree', check: (s) => s.treesFelled >= 1, desc: 'Your first felled tree.' },
  { id: 'first-board', name: 'First Board', check: (s) => s.boardsSawn >= 1, desc: 'Your first sawn board.' },
  { id: 'first-redwood', name: 'First Redwood', check: (s) => s.bestTree === 'redwood', desc: 'You felled a redwood.' },
  { id: 'rank-3', name: 'Timber Boss', check: (s) => s.rank >= 3, desc: 'Reach rank three.' },
  { id: 'rich-logger', name: 'Rich Logger', check: (s) => s.earned >= 1000, desc: 'Earn a thousand from timber.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every logging upgrade.' },
  { id: 'no-injury', name: 'No Injury', check: (s) => s.treesFelled >= 10 && s.injuries === 0, desc: 'Ten trees without a single injury.' },
  { id: 'replanter', name: 'Replanter', check: (s) => s.replanted >= 25, desc: 'Replant twenty-five saplings.' },
];

export const LOGGING_TIPS = [
  { id: 'permit-first', name: 'Permit First', text: 'Buy the felling permit before you touch the old grove.' },
  { id: 'lean', name: 'Read the Lean', text: 'A tree falls where it leans; check before the first cut.' },
  { id: 'saw-boards', name: 'Saw Boards', text: 'Boards sell for more than raw logs.' },
  { id: 'replant', name: 'Replant Always', text: 'A stump left bare costs you reputation.' },
  { id: 'storm', name: 'After the Storm', text: 'Storm-fallen trees are free timber, if you are quick.' },
  { id: 'walnut', name: 'Save the Walnut', text: 'Walnut goes to the furniture maker, nowhere else.' },
  { id: 'look-up', name: 'Look Up', text: 'Dead limbs fall without warning. Look up before you chop.' },
  { id: 'grove', name: 'Respect the Grove', text: 'The old grove pays best, and punishes hardest.' },
];

export const LOGGING_LEADERBOARD = [
  { name: 'Forester Ila', kg: 12000, desc: 'Plants two for every one she cuts.' },
  { name: 'Sawyer Jo', kg: 9000, desc: 'The fastest saw in the valley.' },
  { name: 'Ria', kg: 0, desc: 'The new logger in town.' },
  { name: 'Climber Ash', kg: 6100, desc: 'Tops trees from the canopy.' },
  { name: 'Ox Team', kg: 4800, desc: 'Two oxen and a very big cart.' },
];

export const LOGGING_RECORDS = [
  { id: 'most-trees', name: 'Most Trees', stat: 'treesFelled', unit: 'trees', desc: 'Trees felled in total.' },
  { id: 'most-wood', name: 'Most Wood', stat: 'woodCut', unit: 'kg', desc: 'Wood cut in total.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Coin earned from timber.' },
  { id: 'most-replanted', name: 'Most Replanted', stat: 'replanted', unit: 'saplings', desc: 'Saplings replanted in total.' },
  { id: 'best-tree', name: 'Best Tree', stat: 'bestValue', unit: '$', desc: 'Most valuable single tree.' },
];

export const LOGGING_QUICK_START = [
  'Buy the felling permit before you cut anything in the grove.',
  'Start on the ridge with pines; they fall easy and fast.',
  'Mark a tree, then chop until it comes down.',
  'Saw your logs into boards at the mill for better coin.',
  'Replant every stump to keep the forester reputation up.',
  'Never fell a redwood without the skidder crane.',
];

export const LOGGING_META = {
  system: 'logging',
  version: '7-B1',
  author: 'builder-1',
  trees: 10,
  stands: 4,
  note: 'Fell, saw, replant, sell.',
};

export function loggingRankFor(xp) {
  let rank = 0;
  LOGGING_RANKS.forEach((r, i) => {
    if (xp >= r.xp) rank = i;
  });
  return rank;
}

export function loggingPriceFor(tree, rank, upgrades) {
  if (!tree) return 1;
  const owned = upgrades || [];
  let price = tree.value * (1 + 0.1 * rank);
  if (owned.includes('mill')) price *= 1.1;
  return Math.max(1, Math.round(price));
}

export function loggingBuyerPrice(tree, buyerId, rank, upgrades) {
  const buyer = LOGGING_BUYERS.find((b) => b.id === buyerId);
  if (!buyer || !tree) return 0;
  let price = loggingPriceFor(tree, rank, upgrades) * buyer.mult;
  if (buyer.likes.includes(tree.id)) price *= 1.1;
  if (buyer.dislikes.includes(tree.id)) price *= 0.9;
  if (tree.hardness >= 3 && buyer.id === 'furniture') price *= 1.15;
  if (tree.hardness <= 1 && buyer.id === 'paper') price *= 1.1;
  if (tree.wood >= 14 && buyer.id === 'exporter') price *= 1.1;
  return Math.max(1, Math.round(price));
}

export function loggingCarryCap(upgrades) {
  const owned = upgrades || [];
  let cap = 60;
  if (owned.includes('truck')) cap += 60;
  if (owned.includes('crane')) cap += 40;
  return cap;
}

export function loggingAxeTier(upgrades) {
  const owned = upgrades || [];
  let tier = 1;
  if (owned.includes('axe')) tier += 1;
  if (owned.includes('chainsaw')) tier += 2;
  return tier;
}

const LOGGING_STATE_KEYS = [
  'xp', 'rank', 'trips', 'treesFelled', 'woodCut', 'boardsSawn', 'earned', 'spent',
  'hazards', 'injuries', 'fines', 'finesPaid', 'replanted', 'reputation', 'logs',
  'boards', 'products', 'upgrades', 'stand', 'standTimeLeft', 'felling',
  'fellProgress', 'lastDay', 'activeContract', 'contractProgress', 'contractsDone',
  'contractsFailed', 'bestTree', 'bestValue', 'dailyFelled', 'dailyEarned',
  'carryKg', 'totalKg', 'currentEvent', 'windfall', 'stumps',
];

function loggingChallengeAmount(target, st) {
  const table = {
    treesFelled: st.treesFelled,
    woodCut: st.woodCut,
    boardsSawn: st.boardsSawn,
    earned: st.earned,
    replanted: st.replanted,
    contractsDone: st.contractsDone,
    bestValue: st.bestValue,
    reputation: st.reputation,
  };
  return table[target] !== undefined ? table[target] : 0;
}

export function loggingHelperBonus(ids, skill) {
  return (ids || []).reduce((sum, id) => {
    const helper = LOGGING_HELPERS.find((h) => h.id === id);
    return helper && helper.skill === skill ? sum + helper.bonus : sum;
  }, 0);
}

export function loggingChallengeProgress(challenge, state) {
  const amount = Math.floor(loggingChallengeAmount(challenge.target, state));
  return { id: challenge.id, name: challenge.name, amount, goal: challenge.goal, done: amount >= challenge.goal };
}

export function loggingTipFor(day) {
  const idx = ((day || 0) % LOGGING_TIPS.length + LOGGING_TIPS.length) % LOGGING_TIPS.length;
  return LOGGING_TIPS[idx];
}

export function loggingLeaderboardWith(kg) {
  const rows = LOGGING_LEADERBOARD.map((row) => ({
    name: row.name,
    kg: row.name === 'Ria' ? kg : row.kg,
    desc: row.desc,
  }));
  rows.sort((a, b) => b.kg - a.kg);
  return rows.map((row, i) => ({ rank: i + 1, name: row.name, kg: row.kg, desc: row.desc }));
}

export function loggingEfficiency(woodCut, treesFelled) {
  if (!treesFelled) return 0;
  return Math.round((woodCut / treesFelled) * 100) / 100;
}

export function loggingProfitPerTrip(earned, trips) {
  if (!trips) return 0;
  return Math.round((earned / trips) * 10) / 10;
}

export function loggingGrade(treesFelled, injuries, replanted) {
  if (!treesFelled) return 'D';
  const score = treesFelled - injuries * 10 + replanted;
  if (score >= 60) return 'S';
  if (score >= 35) return 'A';
  if (score >= 20) return 'B';
  if (score >= 8) return 'C';
  return 'D';
}

function loggingRecordValue(stat, state) {
  const table = {
    treesFelled: state.treesFelled,
    woodCut: state.woodCut,
    earned: Math.round(state.earned),
    replanted: state.replanted,
    bestValue: state.bestValue,
  };
  return table[stat] !== undefined ? table[stat] : 0;
}

export function loggingRecordFor(id, state) {
  const rec = LOGGING_RECORDS.find((r) => r.id === id);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: loggingRecordValue(rec.stat, state), unit: rec.unit };
}

export function loggingAllRecords(state) {
  return LOGGING_RECORDS.map((rec) => ({
    id: rec.id,
    name: rec.name,
    value: loggingRecordValue(rec.stat, state),
    unit: rec.unit,
    desc: rec.desc,
  }));
}

export function loggingSummary(state) {
  const rankName = LOGGING_RANKS[state.rank] ? LOGGING_RANKS[state.rank].name : 'Brush Cutter';
  return `${rankName} — ${state.treesFelled} trees, ${state.woodCut} wood, ${state.boardsSawn} boards, $${Math.round(state.earned)} earned, reputation ${state.reputation}.`;
}

export function loggingNextGoal(state) {
  if (state.treesFelled < 10) return 'Fell ten trees.';
  if (state.boardsSawn < 100) return 'Saw a hundred boards.';
  if (state.rank < 2) return 'Reach rank 2 and become a Feller.';
  return 'Fell a redwood in the old grove.';
}

export function loggingQuickStart(step) {
  if (step < 0 || step >= LOGGING_QUICK_START.length) return null;
  return LOGGING_QUICK_START[step];
}

export function createLoggingSystem(ctx = {}) {
  const rng = ctx.rng || Math.random;
  const getDay = ctx.getDay || (() => 1);
  const getHour = ctx.getHour || (() => 12);
  const getCash = ctx.getCash || (() => 0);
  const addCash = ctx.addCash || (() => {});
  const addHeat = ctx.addHeat || (() => {});
  const log = ctx.log || (() => {});
  const getPlayerPos = ctx.getPlayerPos || (() => ({ x: 0, z: 0 }));
  const getWeather = ctx.getWeather || (() => ({ condition: 'clear' }));

  const seedMaps = () => {
    const logs = {};
    const boards = {};
    const products = {};
    LOGGING_TREES.forEach((t) => {
      logs[t.id] = 0;
      boards[t.id] = 0;
    });
    LOGGING_PRODUCTS.forEach((p) => {
      products[p.id] = 0;
    });
    return { logs, boards, products };
  };

  const seeded = seedMaps();

  const sys = {
    xp: 0,
    rank: 0,
    trips: 0,
    treesFelled: 0,
    woodCut: 0,
    boardsSawn: 0,
    earned: 0,
    spent: 0,
    hazards: 0,
    injuries: 0,
    fines: 0,
    finesPaid: 0,
    replanted: 0,
    reputation: 50,
    logs: seeded.logs,
    boards: seeded.boards,
    products: seeded.products,
    upgrades: [],
    stand: null,
    standTimeLeft: 0,
    felling: null,
    fellProgress: 0,
    lastDay: 1,
    activeContract: null,
    contractProgress: 0,
    contractsDone: 0,
    contractsFailed: 0,
    bestTree: null,
    bestValue: 0,
    dailyFelled: 0,
    dailyEarned: 0,
    carryKg: 0,
    totalKg: 0,
    currentEvent: null,
    windfall: 0,
    stumps: 0,
  };

  function earnXp(amount) {
    sys.xp += amount;
    const next = loggingRankFor(sys.xp);
    if (next > sys.rank) {
      sys.rank = next;
      log(`Rank up! You are now ${LOGGING_RANKS[next].name}.`);
    }
  }

  function deny(reason) {
    return { ok: false, reason };
  }

  function grant(extra) {
    return { ok: true, ...extra };
  }

  function activeEvent() {
    return sys.currentEvent
      ? LOGGING_EVENTS.find((e) => e.id === sys.currentEvent) || null
      : null;
  }

  function pickTree(standId) {
    const pool = LOGGING_TREES.filter((t) => t.stand === standId);
    if (!pool.length) return null;
    const ev = activeEvent();
    const total = pool.reduce((sum, t) => {
      let w = t.rarity;
      if (ev && ev.trees.includes(t.id)) w *= ev.mult;
      return sum + w;
    }, 0);
    let roll = rng() * total;
    for (const tree of pool) {
      let w = tree.rarity;
      if (ev && ev.trees.includes(tree.id)) w *= ev.mult;
      roll -= w;
      if (roll <= 0) return tree;
    }
    return pool[pool.length - 1];
  }

  function settleContract(treeId) {
    if (!sys.activeContract || sys.activeContract.tree !== treeId) return;
    sys.contractProgress += 1;
    if (sys.contractProgress < sys.activeContract.qty) return;
    const pay = sys.activeContract.pay + 50 * sys.rank;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    sys.contractsDone += 1;
    log(`Contract done: ${sys.activeContract.name} paid $${pay}.`);
    sys.activeContract = null;
    sys.contractProgress = 0;
    earnXp(60);
  }

  sys.enterStand = function enterStand(standId) {
    const stand = LOGGING_STANDS.find((s) => s.id === standId);
    if (!stand) return deny('unknown-stand');
    if (sys.stand) return deny('already-logging');
    if (standId === 'grove' && sys.rank < 3) return deny('rank-too-low');
    const hour = getHour();
    if (hour >= 22 || hour <= 4) return deny('night');
    sys.stand = standId;
    sys.standTimeLeft = stand.timeMin * 60;
    log(`Into the ${stand.name} with your axe.`);
    return grant({ stand: standId });
  };

  sys.markTree = function markTree() {
    if (!sys.stand) return deny('no-stand');
    if (sys.felling) return deny('already-felling');
    const tree = pickTree(sys.stand);
    if (!tree) return deny('no-trees');
    const tier = loggingAxeTier(sys.upgrades);
    let hardness = tree.hardness;
    if (tree.id === 'redwood' && sys.upgrades.includes('crane')) hardness -= 1;
    if (hardness > tier + 1) return deny('too-hard');
    sys.felling = tree.id;
    sys.fellProgress = 0;
    return grant({ tree: tree.id, name: tree.name, hardness: tree.hardness });
  };

  sys.chop = function chop() {
    if (!sys.felling) return deny('no-tree');
    const tree = LOGGING_TREES.find((t) => t.id === sys.felling);
    const step = loggingAxeTier(sys.upgrades) + (sys.upgrades.includes('saw') ? 1 : 0);
    sys.fellProgress += step;
    const need = tree.hardness * 4;
    if (sys.fellProgress < need) {
      if (rng() < 0.12) {
        const hazard = LOGGING_HAZARDS[Math.floor(rng() * LOGGING_HAZARDS.length)];
        sys.hazards += 1;
        sys.injuries += 1;
        if (hazard.damage >= 3) addHeat(1);
        log(`Hazard while chopping: ${hazard.name}!`);
      }
      return grant({ done: false, progress: sys.fellProgress, needed: need });
    }
    const cap = loggingCarryCap(sys.upgrades);
    if (sys.carryKg + tree.wood > cap) {
      sys.felling = null;
      sys.fellProgress = 0;
      return deny('carry-full');
    }
    sys.felling = null;
    sys.fellProgress = 0;
    sys.logs[tree.id] += 1;
    sys.woodCut += tree.wood;
    sys.treesFelled += 1;
    sys.dailyFelled += 1;
    sys.carryKg += tree.wood;
    sys.totalKg += tree.wood;
    sys.stumps += 1;
    earnXp(tree.hardness * 3);
    if (tree.value > sys.bestValue) {
      sys.bestValue = tree.value;
      sys.bestTree = tree.id;
    }
    if (tree.id === 'redwood') {
      sys.reputation = Math.max(0, sys.reputation - 5);
      log('Felling a redwood costs you standing with the foresters.');
    }
    settleContract(tree.id);
    log(`Felled a ${tree.name} (${tree.wood} wood).`);
    return grant({ done: true, tree: tree.id, wood: tree.wood });
  };

  sys.leaveStand = function leaveStand() {
    if (!sys.stand) return deny('no-stand');
    const done = sys.stand;
    sys.stand = null;
    sys.standTimeLeft = 0;
    sys.felling = null;
    sys.fellProgress = 0;
    sys.trips += 1;
    sys.carryKg = 0;
    return grant({ stand: done });
  };

  sys.sawBoards = function sawBoards(treeId, qty) {
    if (!sys.upgrades.includes('mill')) return deny('no-mill');
    const tree = LOGGING_TREES.find((t) => t.id === treeId);
    if (!tree) return deny('unknown-tree');
    if ((sys.logs[treeId] || 0) < qty) return deny('not-enough');
    sys.logs[treeId] -= qty;
    const boards = qty * 2;
    sys.boards[treeId] += boards;
    sys.boardsSawn += boards;
    earnXp(qty);
    return grant({ boards, tree: treeId });
  };

  sys.makeProduct = function makeProduct(productId, qty) {
    if (!sys.upgrades.includes('mill')) return deny('no-mill');
    const product = LOGGING_PRODUCTS.find((p) => p.id === productId);
    if (!product) return deny('unknown-product');
    if (product.from === 'any') {
      let remaining = qty;
      for (const tree of LOGGING_TREES) {
        if (remaining <= 0) break;
        const take = Math.min(sys.boards[tree.id] || 0, remaining);
        sys.boards[tree.id] -= take;
        remaining -= take;
      }
      if (remaining > 0) return deny('not-enough');
    } else {
      if ((sys.boards[product.from] || 0) < qty) return deny('not-enough');
      sys.boards[product.from] -= qty;
    }
    sys.products[productId] += qty;
    earnXp(qty * 2);
    return grant({ product: productId, quantity: qty });
  };

  sys.sellLogs = function sellLogs(buyerId, treeId, qty) {
    const buyer = LOGGING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return deny('unknown-buyer');
    if (sys.rank < buyer.minRank) return deny('rank-too-low');
    const tree = LOGGING_TREES.find((t) => t.id === treeId);
    if (!tree) return deny('unknown-tree');
    if ((sys.logs[treeId] || 0) < qty) return deny('not-enough');
    const unitPrice = loggingBuyerPrice(tree, buyerId, sys.rank, sys.upgrades);
    const total = unitPrice * qty;
    sys.logs[treeId] -= qty;
    sys.earned += total;
    sys.dailyEarned += total;
    addCash(total);
    earnXp(qty);
    return grant({ total, unitPrice, quantity: qty });
  };

  sys.sellBoards = function sellBoards(buyerId, treeId, qty) {
    const buyer = LOGGING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return deny('unknown-buyer');
    if (sys.rank < buyer.minRank) return deny('rank-too-low');
    const tree = LOGGING_TREES.find((t) => t.id === treeId);
    if (!tree) return deny('unknown-tree');
    if ((sys.boards[treeId] || 0) < qty) return deny('not-enough');
    const unitPrice = Math.max(2, Math.floor(loggingBuyerPrice(tree, buyerId, sys.rank, sys.upgrades) * 0.6));
    const total = unitPrice * qty;
    sys.boards[treeId] -= qty;
    sys.earned += total;
    sys.dailyEarned += total;
    addCash(total);
    earnXp(qty * 2);
    return grant({ total, unitPrice, quantity: qty });
  };

  sys.sellProduct = function sellProduct(productId, qty) {
    const product = LOGGING_PRODUCTS.find((p) => p.id === productId);
    if (!product) return deny('unknown-product');
    if ((sys.products[productId] || 0) < qty) return deny('not-enough');
    const unitPrice = product.value + 5 * sys.rank;
    const total = unitPrice * qty;
    sys.products[productId] -= qty;
    sys.earned += total;
    sys.dailyEarned += total;
    addCash(total);
    earnXp(qty);
    return grant({ total, unitPrice, quantity: qty });
  };

  sys.sellAll = function sellAll(buyerId) {
    const buyer = LOGGING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return deny('unknown-buyer');
    if (sys.rank < buyer.minRank) return deny('rank-too-low');
    const lines = [];
    let total = 0;
    let count = 0;
    for (const tree of LOGGING_TREES) {
      const logQty = sys.logs[tree.id] || 0;
      if (logQty > 0) {
        const unitPrice = loggingBuyerPrice(tree, buyerId, sys.rank, sys.upgrades);
        const lineTotal = unitPrice * logQty;
        lines.push({ kind: 'log', id: tree.id, quantity: logQty, total: lineTotal });
        total += lineTotal;
        count += logQty;
        sys.logs[tree.id] = 0;
      }
      const boardQty = sys.boards[tree.id] || 0;
      if (boardQty > 0) {
        const unitPrice = Math.max(2, Math.floor(loggingBuyerPrice(tree, buyerId, sys.rank, sys.upgrades) * 0.6));
        const lineTotal = unitPrice * boardQty;
        lines.push({ kind: 'board', id: tree.id, quantity: boardQty, total: lineTotal });
        total += lineTotal;
        count += boardQty;
        sys.boards[tree.id] = 0;
      }
    }
    if (!lines.length) return deny('nothing-to-sell');
    sys.earned += total;
    sys.dailyEarned += total;
    addCash(total);
    earnXp(count);
    return grant({ total, count, lines });
  };

  sys.replant = function replant(qty) {
    if (!qty || qty <= 0) return deny('bad-quantity');
    if (sys.stumps < qty) return deny('not-enough-stumps');
    const free = sys.upgrades.includes('saplings');
    const cost = free ? 0 : qty * 2;
    if (getCash() < cost) return deny('not-enough-cash');
    if (cost > 0) {
      addCash(-cost);
      sys.spent += cost;
    }
    sys.stumps -= qty;
    sys.replanted += qty;
    sys.reputation = Math.min(100, sys.reputation + qty * 2);
    earnXp(qty);
    return grant({ quantity: qty, cost });
  };

  sys.collectWindfall = function collectWindfall() {
    if (sys.currentEvent !== 'storm-fall') return deny('no-storm');
    const firstThree = LOGGING_TREES.slice(0, 3);
    const tree = firstThree[Math.floor(rng() * firstThree.length)];
    const qty = 2 + Math.floor(rng() * 3);
    sys.logs[tree.id] += qty;
    sys.windfall += 1;
    sys.woodCut += qty;
    earnXp(qty);
    return grant({ tree: tree.id, quantity: qty });
  };

  sys.buyUpgrade = function buyUpgrade(upgradeId) {
    const upgrade = LOGGING_UPGRADES.find((u) => u.id === upgradeId);
    if (!upgrade) return deny('unknown-upgrade');
    if (sys.upgrades.includes(upgradeId)) return deny('already-owned');
    if (getCash() < upgrade.cost) return deny('not-enough-cash');
    addCash(-upgrade.cost);
    sys.spent += upgrade.cost;
    sys.upgrades.push(upgradeId);
    earnXp(20);
    return grant({ id: upgradeId });
  };

  sys.takeContract = function takeContract(contractId) {
    const contract = LOGGING_CONTRACTS.find((c) => c.id === contractId);
    if (!contract) return deny('unknown-contract');
    if (sys.activeContract) return deny('contract-active');
    if (sys.rank < contract.rep) return deny('rank-too-low');
    const day = getDay();
    sys.activeContract = { ...contract, dayTaken: day, deadline: day + contract.days };
    sys.contractProgress = 0;
    return grant({ contract: sys.activeContract });
  };

  sys.deliverContract = function deliverContract() {
    if (!sys.activeContract) return deny('no-contract');
    if (sys.contractProgress < sys.activeContract.qty) return deny('not-ready');
    if ((sys.logs[sys.activeContract.tree] || 0) < sys.activeContract.qty) return deny('not-enough');
    sys.logs[sys.activeContract.tree] -= sys.activeContract.qty;
    const pay = sys.activeContract.pay + 50 * sys.rank;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    sys.contractsDone += 1;
    sys.activeContract = null;
    sys.contractProgress = 0;
    earnXp(60);
    return grant({ pay });
  };

  sys.abandonContract = function abandonContract() {
    if (!sys.activeContract) return deny('no-contract');
    sys.activeContract = null;
    sys.contractProgress = 0;
    sys.contractsFailed += 1;
    return grant({});
  };

  sys.payFine = function payFine() {
    if (sys.fines <= 0) return deny('no-fines');
    if (getCash() < sys.fines) return deny('not-enough-cash');
    const amount = sys.fines;
    addCash(-amount);
    sys.spent += amount;
    sys.finesPaid += amount;
    sys.fines = 0;
    return grant({ amount });
  };

  sys.wardenCheck = function wardenCheck() {
    if (sys.stand === 'grove' && !sys.upgrades.includes('permit') && rng() < 0.4) {
      sys.fines += 200;
      sys.reputation = Math.max(0, sys.reputation - 10);
      addHeat(3);
      log('The warden caught you felling the old grove without a permit: $200 fine.');
      return grant({ caught: true, fine: 200 });
    }
    return grant({ caught: false });
  };

  sys.priceBoard = function priceBoard() {
    return LOGGING_TREES.map((t) => ({
      id: t.id,
      name: t.name,
      price: loggingPriceFor(t, sys.rank, sys.upgrades),
      logs: sys.logs[t.id] || 0,
      boards: sys.boards[t.id] || 0,
      hardness: t.hardness,
      regrow: t.regrow,
    }));
  };

  sys.standReport = function standReport() {
    return LOGGING_STANDS.map((s) => ({
      id: s.id,
      name: s.name,
      district: s.district,
      mult: s.mult,
      danger: s.danger,
      trees: LOGGING_TREES.filter((t) => t.stand === s.id).map((t) => t.id),
    }));
  };

  sys.dailyEvent = function dailyEvent() {
    const roll = rng();
    if (roll < 0.2) {
      const ev = LOGGING_EVENTS[Math.floor(rng() * LOGGING_EVENTS.length)];
      sys.currentEvent = ev.id;
      log(`Today's event: ${ev.name}.`);
      return grant({ event: ev.id, name: ev.name });
    }
    if (roll < 0.3) {
      const tree = LOGGING_TREES[Math.floor(rng() * LOGGING_TREES.length)];
      sys.logs[tree.id] += 2;
      sys.currentEvent = null;
      return grant({ event: 'gift', tree: tree.id, name: 'Gift' });
    }
    sys.currentEvent = null;
    return grant({ event: 'none', name: 'None' });
  };

  sys.tick = function tick(dt) {
    const step = dt || 0;
    if (sys.stand) {
      sys.standTimeLeft -= step;
      if (sys.standTimeLeft <= 0) {
        const done = sys.stand;
        sys.stand = null;
        sys.standTimeLeft = 0;
        sys.felling = null;
        sys.fellProgress = 0;
        sys.trips += 1;
        sys.carryKg = 0;
        log(`Daylight fades in ${done}; time to head home.`);
      }
    }
  };

  sys.tickDay = function tickDay(day) {
    if (day === sys.lastDay) return;
    sys.lastDay = day;
    sys.dailyFelled = 0;
    sys.dailyEarned = 0;
    if (sys.activeContract && day > sys.activeContract.deadline && sys.contractProgress < sys.activeContract.qty) {
      sys.contractsFailed += 1;
      log(`Contract failed: ${sys.activeContract.name}.`);
      sys.activeContract = null;
      sys.contractProgress = 0;
    }
    if (sys.reputation < 30 && rng() < 0.3) {
      sys.fines += 100;
      log('The foresters fined you $100 for your poor reputation.');
    }
    sys.dailyEvent();
  };

  sys.serialize = function serialize() {
    const out = {};
    for (const key of LOGGING_STATE_KEYS) {
      out[key] = JSON.parse(JSON.stringify(sys[key]));
    }
    return out;
  };

  sys.deserialize = function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    for (const key of LOGGING_STATE_KEYS) {
      if (key in saved) sys[key] = JSON.parse(JSON.stringify(saved[key]));
    }
    for (const t of LOGGING_TREES) {
      if (sys.logs[t.id] === undefined) sys.logs[t.id] = 0;
      if (sys.boards[t.id] === undefined) sys.boards[t.id] = 0;
    }
    for (const p of LOGGING_PRODUCTS) {
      if (sys.products[p.id] === undefined) sys.products[p.id] = 0;
    }
    const next = loggingRankFor(sys.xp);
    if (next > sys.rank) sys.rank = next;
  };

  sys.stats = function stats() {
    return {
      rank: LOGGING_RANKS[sys.rank].name,
      xp: sys.xp,
      trips: sys.trips,
      treesFelled: sys.treesFelled,
      woodCut: sys.woodCut,
      boardsSawn: sys.boardsSawn,
      earned: Math.round(sys.earned),
      spent: sys.spent,
      hazards: sys.hazards,
      injuries: sys.injuries,
      fines: sys.fines,
      replanted: sys.replanted,
      reputation: sys.reputation,
      upgrades: sys.upgrades.length,
      stand: sys.stand,
      felling: sys.felling,
      activeContract: sys.activeContract ? sys.activeContract.id : null,
      contractsDone: sys.contractsDone,
      contractsFailed: sys.contractsFailed,
      bestTree: sys.bestTree,
      dailyFelled: sys.dailyFelled,
      dailyEarned: Math.round(sys.dailyEarned),
      carryKg: Math.round(sys.carryKg * 10) / 10,
      carryCap: loggingCarryCap(sys.upgrades),
      windfall: sys.windfall,
      stumps: sys.stumps,
      event: sys.currentEvent,
    };
  };

  sys.hudLine = function hudLine() {
    if (sys.felling) {
      const tree = LOGGING_TREES.find((t) => t.id === sys.felling);
      return `Timber ${tree.name} — ${sys.fellProgress}/${tree.hardness * 4} chops`;
    }
    if (sys.stand) {
      const stand = LOGGING_STANDS.find((s) => s.id === sys.stand);
      return `Timber ${stand.name} — mark a tree to fell`;
    }
    if (sys.activeContract) {
      return `Contract ${sys.activeContract.name} ${sys.contractProgress}/${sys.activeContract.qty}`;
    }
    let logTotal = 0;
    for (const t of LOGGING_TREES) logTotal += sys.logs[t.id] || 0;
    if (logTotal > 0) return `${logTotal} logs to saw or sell`;
    if (sys.stumps > 0) return `${sys.stumps} stumps to replant`;
    return '';
  };

  sys.interact = function interact() {
    const pos = getPlayerPos();
    const dx = (pos.x || 0) - 420;
    const dz = (pos.z || 0) - 180;
    if (Math.hypot(dx, dz) > 40) return false;
    if (!sys.stand) {
      sys.enterStand('ridge');
      return true;
    }
    if (!sys.felling) {
      sys.markTree();
      return true;
    }
    sys.chop();
    return true;
  };

  return sys;
}

export function createLoggingExtras(system) {
  const sys = system;
  let hired = [];
  let claimed = [];
  let wagesPaid = 0;

  function deny(reason) {
    return { ok: false, reason };
  }

  function grant(extra) {
    return { ok: true, ...extra };
  }

  const extras = {
    hireHelper(id) {
      const helper = LOGGING_HELPERS.find((h) => h.id === id);
      if (!helper) return deny('unknown-helper');
      if (hired.includes(id)) return deny('already-hired');
      hired.push(id);
      return grant({ id, name: helper.name, wage: helper.wage });
    },
    fireHelper(id) {
      if (!hired.includes(id)) return deny('not-hired');
      hired = hired.filter((h) => h !== id);
      return grant({ id });
    },
    payWages() {
      const due = hired.reduce((sum, id) => {
        const helper = LOGGING_HELPERS.find((h) => h.id === id);
        return helper ? sum + helper.wage : sum;
      }, 0);
      wagesPaid += due;
      return grant({ due, helpers: [...hired], wagesPaid });
    },
    helperBonus(skill) {
      return hired.reduce((sum, id) => {
        const helper = LOGGING_HELPERS.find((h) => h.id === id);
        return helper && helper.skill === skill ? sum + helper.bonus : sum;
      }, 0);
    },
    challenges() {
      return LOGGING_CHALLENGES.map((c) => loggingChallengeProgress(c, sys));
    },
    claimChallenge(id) {
      const challenge = LOGGING_CHALLENGES.find((c) => c.id === id);
      if (!challenge) return deny('unknown-challenge');
      if (claimed.includes(id)) return deny('already-claimed');
      const progress = loggingChallengeProgress(challenge, sys);
      if (!progress.done) return deny('not-done');
      claimed.push(id);
      return grant({ id, xp: challenge.xp });
    },
    achievements() {
      return LOGGING_ACHIEVEMENTS.map((a) => ({
        id: a.id,
        name: a.name,
        desc: a.desc,
        done: !!a.check(sys),
      }));
    },
    survey(treeId) {
      const tree = LOGGING_TREES.find((t) => t.id === treeId);
      if (!tree) return deny('unknown-tree');
      return grant({ tree: tree.id, value: tree.value, wood: tree.wood, hardness: tree.hardness, regrow: tree.regrow });
    },
    inventoryValue() {
      let value = 0;
      for (const t of LOGGING_TREES) {
        value += (sys.logs[t.id] || 0) * t.value;
        value += (sys.boards[t.id] || 0) * Math.round(t.value * 0.6);
      }
      return grant({ value: Math.round(value) });
    },
    weighIn() {
      const cap = loggingCarryCap(sys.upgrades);
      return grant({
        carryKg: Math.round(sys.carryKg * 10) / 10,
        carryCap: cap,
        free: Math.round((cap - sys.carryKg) * 10) / 10,
      });
    },
    get helpers() {
      return [...hired];
    },
    get claimed() {
      return [...claimed];
    },
    get wagesPaid() {
      return wagesPaid;
    },
  };

  return extras;
}
