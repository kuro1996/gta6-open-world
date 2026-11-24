// Solara Nights — Logging / Timberline (Round 7, written fresh).
// Ria works the timber stands around Solara: mark, fell, limb, buck
// and haul logs to the sawmill, where boards, beams and fine furniture
// wood pay very different money. Old-growth giants are worth a fortune
// but the forest service watches them; clear-cutting a stand tanks your
// reputation and invites fines, while replanting saplings keeps the
// woods — and the warden — on your side. Storms drop free windfall,
// and the furniture maker in Old Town pays wild money for figured wood.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const LOGGING_TREES = [
  { id: 'pine', name: 'Scots Pine', value: 14, wood: 6, hardness: 1, rarity: 0.3, stand: 'ridge', regrow: 2, desc: 'Straight, tall, and everywhere on the ridge.' },
  { id: 'oak', name: 'Valley Oak', value: 32, wood: 10, hardness: 2, rarity: 0.2, stand: 'valley', regrow: 4, desc: 'Slow, heavy, and worth every swing.' },
  { id: 'birch', name: 'Silver Birch', value: 18, wood: 5, hardness: 1, rarity: 0.24, stand: 'valley', regrow: 2, desc: 'Pale bark, light wood, quick to fell.' },
  { id: 'cedar', name: 'Red Cedar', value: 46, wood: 9, hardness: 2, rarity: 0.12, stand: 'ridge', regrow: 5, desc: 'Sweet-smelling wood the furniture maker loves.' },
  { id: 'maple', name: 'Sugar Maple', value: 38, wood: 8, hardness: 2, rarity: 0.14, stand: 'valley', regrow: 4, desc: 'Hard, figured grain — and syrup in spring.' },
  { id: 'willow', name: 'Weeping Willow', value: 16, wood: 5, hardness: 1, rarity: 0.18, stand: 'marsh', regrow: 2, desc: 'Bends by the water, soft and easy.' },
  { id: 'walnut', name: 'Black Walnut', value: 78, wood: 11, hardness: 3, rarity: 0.07, stand: 'valley', regrow: 6, desc: 'Dark, rich, and priced like treasure.' },
  { id: 'ash', name: 'White Ash', value: 30, wood: 8, hardness: 2, rarity: 0.13, stand: 'ridge', regrow: 3, desc: 'Springy wood for tool handles and bats.' },
  { id: 'elm', name: 'Old Elm', value: 26, wood: 9, hardness: 2, rarity: 0.1, stand: 'marsh', regrow: 4, desc: 'Tough, gnarled, and hard to split.' },
  { id: 'redwood', name: 'Giant Redwood', value: 180, wood: 30, hardness: 4, rarity: 0.02, stand: 'grove', regrow: 12, desc: 'An ancient giant. Felling one is a career event.' },
];

export const LOGGING_STANDS = [
  { id: 'ridge', name: 'Pine Ridge', district: 'North Hills', trees: 0.85, danger: 1, mult: 1.0, timeMin: 5, desc: 'Steep slopes, straight pines, good footing.' },
  { id: 'valley', name: 'Oak Valley', district: 'West Farms', trees: 0.9, danger: 0, mult: 1.15, timeMin: 6, desc: 'Rich bottomland, the best hardwoods.' },
  { id: 'marsh', name: 'Willow Marsh', district: 'Lagoon', trees: 0.7, danger: 1, mult: 0.95, timeMin: 5, desc: 'Soft ground, soft wood, mosquitoes.' },
  { id: 'grove', name: 'Old Grove', district: 'North Hills', trees: 0.5, danger: 2, mult: 1.6, timeMin: 8, desc: 'The ancient grove. Redwoods — and the warden.' },
];

export const LOGGING_BUYERS = [
  { id: 'sawmill', name: 'Crown Sawmill', mult: 1.0, likes: ['log'], dislikes: ['fine'], mood: 'steady', minRank: 0, desc: 'Buys logs by the load, no fuss.' },
  { id: 'builder', name: 'Builders’ Yard', mult: 1.15, likes: ['board'], dislikes: [], mood: 'steady', minRank: 1, desc: 'Pays for sawn boards and beams.' },
  { id: 'furniture', name: 'Furniture Maker', mult: 1.5, likes: ['fine'], dislikes: ['log'], mood: 'fancy', minRank: 2, desc: 'Figured walnut and cedar only — big money.' },
  { id: 'paper', name: 'Paper Mill', mult: 0.85, likes: ['pulp'], dislikes: [], mood: 'quick', minRank: 0, desc: 'Cheap, fast, buys anything pulpy.' },
  { id: 'exporter', name: 'Harbor Exporter', mult: 1.3, likes: ['beam'], dislikes: ['pulp'], mood: 'odd', minRank: 3, desc: 'Ships long beams overseas for top coin.' },
];

export const LOGGING_UPGRADES = [
  { id: 'axe', name: 'Felling Axe', cost: 90, desc: 'Fell trees faster: +1 axe tier.', effect: 'axe' },
  { id: 'saw', name: 'Two-Man Saw', cost: 150, desc: 'Big trees fall quicker: +25% yield.', effect: 'saw' },
  { id: 'permit', name: 'Logging Permit', cost: 120, desc: 'Legal felling — no warden fines.', effect: 'legal' },
  { id: 'truck', name: 'Log Truck', cost: 380, desc: 'Haul +60 kg per trip.', effect: 'truck' },
  { id: 'chainsaw', name: 'Chainsaw', cost: 520, desc: 'Felling is three times faster.', effect: 'chainsaw' },
  { id: 'mill', name: 'Portable Mill', cost: 750, desc: 'Saw boards on site, keep the margin.', effect: 'mill' },
  { id: 'saplings', name: 'Sapling Nursery', cost: 300, desc: 'Replanting is free and regrowth is faster.', effect: 'replant' },
  { id: 'crane', name: 'Skidder Crane', cost: 1100, desc: 'Giants fall easy: redwood hardness -1.', effect: 'crane' },
];

export const LOGGING_RANKS = [
  { level: 0, name: 'Brush Cutter', xp: 0, perk: 'Base prices, base yield.' },
  { level: 1, name: 'Lumberjack', xp: 120, perk: '+10% sale prices.' },
  { level: 2, name: 'Feller', xp: 300, perk: '+10% yield.' },
  { level: 3, name: 'Timber Boss', xp: 620, perk: '+20% sale prices, the grove opens.' },
  { level: 4, name: 'Master of Timberline', xp: 1100, perk: '+30% sale prices, figured wood doubled.' },
];

export const LOGGING_PRODUCTS = [
  { id: 'board', name: 'Sawn Board', from: 'any', value: 12, desc: 'A clean sawn board, ready to build.' },
  { id: 'beam', name: 'Long Beam', from: 'oak', value: 45, desc: 'A heavy beam for roofs and bridges.' },
  { id: 'plank', name: 'Fine Plank', from: 'walnut', value: 90, desc: 'Figured walnut, furniture-grade.' },
  { id: 'pulp', name: 'Pulp Load', from: 'birch', value: 6, desc: 'Chipped wood for the paper mill.' },
  { id: 'firewood', name: 'Firewood Bundle', from: 'pine', value: 8, desc: 'Split and stacked, ready for winter.' },
  { id: 'veneer', name: 'Cedar Veneer', from: 'cedar', value: 70, desc: 'Thin, sweet-smelling, precious.' },
];

export const LOGGING_EVENTS = [
  { id: 'storm-fall', name: 'Storm Windfall', mult: 1.4, trees: ['pine', 'birch', 'willow'], desc: 'A storm dropped trees everywhere — free wood.' },
  { id: 'building-boom', name: 'Building Boom', mult: 1.3, trees: ['oak', 'pine', 'ash'], desc: 'The town builds fast — boards pay more.' },
  { id: 'furniture-fair', name: 'Furniture Fair', mult: 1.5, trees: ['walnut', 'cedar', 'maple'], desc: 'The fair is in town; fine wood pays double.' },
  { id: 'warden-crackdown', name: 'Warden Crackdown', mult: 0.7, trees: [], desc: 'The warden is checking permits in the grove.' },
  { id: 'beetle', name: 'Bark Beetle', mult: 0.8, trees: ['pine', 'ash'], desc: 'Beetles are killing pines — salvage what you can.' },
  { id: 'sap-season', name: 'Sap Season', mult: 1.25, trees: ['maple', 'birch'], desc: 'Maple sap runs — sweet money on the side.' },
];

export const LOGGING_CONTRACTS = [
  { id: 'pine-30', name: 'Pine Order', tree: 'pine', qty: 15, pay: 280, days: 2, rep: 0, desc: 'The sawmill needs fifteen pines.' },
  { id: 'oak-10', name: 'Oak Beams', tree: 'oak', qty: 6, pay: 420, days: 2, rep: 1, desc: 'Six oaks for the new bridge.' },
  { id: 'walnut-4', name: 'Walnut Call', tree: 'walnut', qty: 4, pay: 560, days: 3, rep: 2, desc: 'The furniture maker wants four walnuts.' },
  { id: 'cedar-8', name: 'Cedar Chests', tree: 'cedar', qty: 5, pay: 480, days: 2, rep: 1, desc: 'Cedar for hope chests, five trees.' },
  { id: 'redwood-1', name: 'The Giant', tree: 'redwood', qty: 1, pay: 900, days: 3, rep: 3, desc: 'One redwood for the town hall beam.' },
  { id: 'firewood-20', name: 'Winter Wood', tree: 'pine', qty: 20, pay: 300, days: 1, rep: 0, desc: 'Twenty pines for winter firewood.' },
];

export const LOGGING_HAZARDS = [
  { id: 'widowmaker', name: 'Widowmaker', chance: 0.07, damage: 2, desc: 'A dead limb falls from above — look up.' },
  { id: 'kickback', name: 'Kickback', chance: 0.08, damage: 1, desc: 'The saw kicks back hard.' },
  { id: 'bees', name: 'Bee Nest', chance: 0.05, damage: 1, desc: 'A hive in the hollow trunk — run.' },
  { id: 'slip', name: 'Slope Slip', chance: 0.09, damage: 1, desc: 'Wet leaves on a steep slope.' },
  { id: 'sap', name: 'Sap in the Eyes', chance: 0.1, damage: 0, desc: 'Sticky sap, stinging eyes.' },
];

export function loggingRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < LOGGING_RANKS.length; i++) {
    if (xp >= LOGGING_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function loggingPriceFor(tree, rank, upgrades) {
  let price = tree.value;
  price *= 1 + rank * 0.1;
  if (upgrades.includes('mill')) price *= 1.05;
  return Math.max(1, Math.round(price));
}

export function loggingBuyerPrice(tree, buyerId, rank, upgrades) {
  const buyer = LOGGING_BUYERS.find((b) => b.id === buyerId);
  if (!buyer) return 0;
  let mult = buyer.mult;
  if (tree.hardness >= 3 && buyer.likes.includes('fine')) mult += 0.2;
  if (tree.hardness <= 1 && buyer.likes.includes('pulp')) mult += 0.1;
  if (tree.wood >= 10 && buyer.likes.includes('beam')) mult += 0.15;
  return Math.max(1, Math.round(loggingPriceFor(tree, rank, upgrades) * mult));
}

export function loggingCarryCap(upgrades) {
  let cap = 60;
  if (upgrades.includes('truck')) cap += 60;
  if (upgrades.includes('crane')) cap += 40;
  return cap;
}

export function loggingAxeTier(upgrades) {
  let tier = 1;
  if (upgrades.includes('axe')) tier += 1;
  if (upgrades.includes('chainsaw')) tier += 2;
  return tier;
}

export function createLoggingSystem(ctx) {
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

  const state = {
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
    logs: {},
    boards: {},
    products: {},
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
  for (const t of LOGGING_TREES) { state.logs[t.id] = 0; state.boards[t.id] = 0; }
  for (const p of LOGGING_PRODUCTS) state.products[p.id] = 0;

  function refreshRank() {
    const r = loggingRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Logging rank up: ${LOGGING_RANKS[r].name} — ${LOGGING_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function pickTree(standId) {
    const bag = [];
    for (const t of LOGGING_TREES) {
      if (t.stand !== standId) continue;
      let w = t.rarity;
      if (state.currentEvent) {
        const ev = LOGGING_EVENTS.find((e) => e.id === state.currentEvent);
        if (ev && ev.trees.includes(t.id)) w *= ev.mult;
      }
      bag.push({ t, w });
    }
    if (bag.length === 0) return null;
    let total = 0;
    for (const b of bag) total += b.w;
    let roll = rng() * total;
    for (const b of bag) {
      roll -= b.w;
      if (roll <= 0) return b.t;
    }
    return bag[0].t;
  }

  function enterStand(standId) {
    const s = LOGGING_STANDS.find((x) => x.id === standId);
    if (!s) return { ok: false, reason: 'no-such-stand' };
    if (state.stand) return { ok: false, reason: 'stand-active' };
    if (standId === 'grove' && state.rank < 3) return { ok: false, reason: 'rank-too-low', need: 3 };
    const hour = getHour();
    if (hour >= 22 || hour < 5) return { ok: false, reason: 'too-late' };
    state.stand = standId;
    state.standTimeLeft = s.timeMin * 60;
    log(`Into ${s.name} — mark your tree, check the lean, fell it clean.`);
    return { ok: true, stand: standId };
  }

  function markTree() {
    if (!state.stand) return { ok: false, reason: 'no-stand' };
    if (state.felling) return { ok: false, reason: 'already-felling' };
    const tree = pickTree(state.stand);
    if (!tree) return { ok: false, reason: 'nothing-here' };
    const tier = loggingAxeTier(state.upgrades);
    const effectiveHardness = tree.hardness - (state.upgrades.includes('crane') && tree.id === 'redwood' ? 1 : 0);
    if (effectiveHardness > tier + 1) {
      log(`The ${tree.name} is too hard for your axe — upgrade first.`);
      return { ok: false, reason: 'too-hard', tree: tree.id };
    }
    state.felling = tree.id;
    state.fellProgress = 0;
    log(`Marked a ${tree.name} — ${tree.desc}`);
    return { ok: true, tree: tree.id, name: tree.name, hardness: tree.hardness };
  }

  function chop() {
    if (!state.felling) return { ok: false, reason: 'not-felling' };
    const tree = LOGGING_TREES.find((t) => t.id === state.felling);
    const tier = loggingAxeTier(state.upgrades);
    const speed = tier + (state.upgrades.includes('saw') ? 1 : 0);
    state.fellProgress += speed;
    const need = tree.hardness * 4;
    if (state.fellProgress < need) {
      if (rng() < 0.08) {
        const h = LOGGING_HAZARDS[Math.floor(rng() * LOGGING_HAZARDS.length)];
        state.hazards += 1;
        if (h.damage >= 1) state.injuries += 1;
        log(`Hazard: ${h.name} — ${h.desc}`);
        if (h.damage >= 2) addHeat(1);
      }
      return { ok: true, progress: state.fellProgress, need, done: false };
    }
    const yieldMult = state.upgrades.includes('saw') ? 1.25 : 1;
    const wood = Math.round(tree.wood * yieldMult);
    const cap = loggingCarryCap(state.upgrades);
    const weight = wood * 2;
    if (state.carryKg + weight > cap) {
      state.felling = null;
      state.fellProgress = 0;
      return { ok: false, reason: 'carry-full', cap };
    }
    state.logs[tree.id] += 1;
    state.woodCut += wood;
    state.treesFelled += 1;
    state.dailyFelled += 1;
    state.carryKg += weight;
    state.totalKg += weight;
    state.stumps += 1;
    gainXp(6 + tree.hardness * 5);
    if (tree.value > state.bestValue) { state.bestValue = tree.value; state.bestTree = tree.id; }
    state.felling = null;
    state.fellProgress = 0;
    if (tree.id === 'redwood') {
      state.reputation -= 5;
      log('TIMBER! The giant falls — the whole valley hears it. Reputation -5.');
    } else {
      log(`TIMBER! ${tree.name} down — +${wood} wood.`);
    }
    if (state.activeContract) checkContract(tree.id, 1);
    return { ok: true, done: true, tree: tree.id, wood };
  }

  function leaveStand() {
    if (!state.stand) return { ok: false, reason: 'no-stand' };
    const s = state.stand;
    state.stand = null;
    state.standTimeLeft = 0;
    state.felling = null;
    state.fellProgress = 0;
    state.trips += 1;
    state.carryKg = 0;
    log(`Out of ${s} with a load of logs — saw them or sell them raw.`);
    return { ok: true, stand: s };
  }

  function sawBoards(treeId, qty) {
    if (!state.upgrades.includes('mill')) return { ok: false, reason: 'need-mill' };
    const tree = LOGGING_TREES.find((t) => t.id === treeId);
    if (!tree) return { ok: false, reason: 'no-such-tree' };
    const have = state.logs[treeId] || 0;
    if (qty <= 0 || have < qty) return { ok: false, reason: 'not-enough', have };
    const boards = qty * 2;
    state.logs[treeId] -= qty;
    state.boards[treeId] += boards;
    state.boardsSawn += boards;
    gainXp(qty * 4);
    log(`Sawed ${qty}x ${tree.name} into ${boards} boards.`);
    return { ok: true, boards, tree: treeId };
  }

  function makeProduct(productId, qty) {
    const p = LOGGING_PRODUCTS.find((x) => x.id === productId);
    if (!p) return { ok: false, reason: 'no-such-product' };
    if (!state.upgrades.includes('mill')) return { ok: false, reason: 'need-mill' };
    const tree = LOGGING_TREES.find((t) => t.id === p.from);
    let have = 0;
    if (p.from === 'any') {
      have = Object.values(state.boards).reduce((a, b) => a + b, 0);
    } else {
      have = state.boards[p.from] || 0;
    }
    if (qty <= 0 || have < qty) return { ok: false, reason: 'not-enough', have };
    if (p.from === 'any') {
      let left = qty;
      for (const t of LOGGING_TREES) {
        if (left <= 0) break;
        const take = Math.min(state.boards[t.id], left);
        state.boards[t.id] -= take;
        left -= take;
      }
    } else {
      state.boards[p.from] -= qty;
    }
    state.products[productId] += qty;
    gainXp(qty * 5);
    log(`Made ${qty}x ${p.name}.`);
    return { ok: true, product: productId, qty };
  }

  function sellLogs(buyerId, treeId, qty) {
    const buyer = LOGGING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    if (state.rank < buyer.minRank) return { ok: false, reason: 'rank-too-low', need: buyer.minRank };
    const tree = LOGGING_TREES.find((t) => t.id === treeId);
    if (!tree) return { ok: false, reason: 'no-such-tree' };
    const have = state.logs[treeId] || 0;
    if (qty <= 0 || have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = loggingBuyerPrice(tree, buyerId, state.rank, state.upgrades);
    const total = unit * qty;
    state.logs[treeId] -= qty;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(qty);
    log(`Sold ${qty}x ${tree.name} logs to ${buyer.name} for $${total}.`);
    return { ok: true, total, unit, qty };
  }

  function sellBoards(buyerId, treeId, qty) {
    const buyer = LOGGING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    if (state.rank < buyer.minRank) return { ok: false, reason: 'rank-too-low', need: buyer.minRank };
    const tree = LOGGING_TREES.find((t) => t.id === treeId);
    if (!tree) return { ok: false, reason: 'no-such-tree' };
    const have = state.boards[treeId] || 0;
    if (qty <= 0 || have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = Math.max(2, Math.round(loggingBuyerPrice(tree, buyerId, state.rank, state.upgrades) * 0.6));
    const total = unit * qty;
    state.boards[treeId] -= qty;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(qty * 2);
    log(`Sold ${qty}x ${tree.name} boards to ${buyer.name} for $${total}.`);
    return { ok: true, total, unit, qty };
  }

  function sellProduct(productId, qty) {
    const p = LOGGING_PRODUCTS.find((x) => x.id === productId);
    if (!p) return { ok: false, reason: 'no-such-product' };
    const have = state.products[productId] || 0;
    if (qty <= 0 || have < qty) return { ok: false, reason: 'not-enough', have };
    const value = p.value + state.rank * 5;
    const total = value * qty;
    state.products[productId] -= qty;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(qty * 3);
    log(`Sold ${qty}x ${p.name} for $${total}.`);
    return { ok: true, total, unit: value, qty };
  }

  function sellAll(buyerId) {
    const buyer = LOGGING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    let total = 0;
    let units = 0;
    const lines = [];
    for (const t of LOGGING_TREES) {
      const lq = state.logs[t.id] || 0;
      if (lq > 0) {
        const unit = loggingBuyerPrice(t, buyerId, state.rank, state.upgrades);
        const line = unit * lq;
        total += line; units += lq;
        lines.push({ kind: 'log', id: t.id, qty: lq, total: line });
        state.logs[t.id] = 0;
      }
      const bq = state.boards[t.id] || 0;
      if (bq > 0) {
        const unit = Math.max(2, Math.round(loggingBuyerPrice(t, buyerId, state.rank, state.upgrades) * 0.6));
        const line = unit * bq;
        total += line; units += bq;
        lines.push({ kind: 'board', id: t.id, qty: bq, total: line });
        state.boards[t.id] = 0;
      }
    }
    if (units === 0) return { ok: false, reason: 'nothing-to-sell' };
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(units);
    log(`Sold the whole timber load to ${buyer.name} for $${total}.`);
    return { ok: true, total, units, lines };
  }

  function replant(qty) {
    const costPer = state.upgrades.includes('saplings') ? 0 : 2;
    const cost = costPer * qty;
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    if (state.stumps < qty) return { ok: false, reason: 'no-stumps', stumps: state.stumps };
    addCash(-cost);
    state.spent += cost;
    state.stumps -= qty;
    state.replanted += qty;
    state.reputation = Math.min(100, state.reputation + qty * 2);
    gainXp(qty * 4);
    log(`Replanted ${qty} saplings — the forest thanks you. Reputation +${qty * 2}.`);
    return { ok: true, qty, cost };
  }

  function collectWindfall() {
    if (state.currentEvent !== 'storm-fall') return { ok: false, reason: 'no-storm' };
    const tree = LOGGING_TREES[Math.floor(rng() * 3)];
    const qty = 2 + Math.floor(rng() * 3);
    state.logs[tree.id] += qty;
    state.windfall += qty;
    state.woodCut += qty * tree.wood;
    gainXp(qty * 3);
    log(`Windfall! Collected ${qty}x fallen ${tree.name}.`);
    return { ok: true, tree: tree.id, qty };
  }

  function buyUpgrade(id) {
    const u = LOGGING_UPGRADES.find((x) => x.id === id);
    if (!u) return { ok: false, reason: 'no-such-upgrade' };
    if (state.upgrades.includes(id)) return { ok: false, reason: 'already-owned' };
    if (getCash() < u.cost) return { ok: false, reason: 'not-enough-cash', cost: u.cost };
    addCash(-u.cost);
    state.spent += u.cost;
    state.upgrades.push(id);
    gainXp(20);
    log(`Bought ${u.name} for $${u.cost}.`);
    return { ok: true, id };
  }

  function takeContract(id) {
    const ct = LOGGING_CONTRACTS.find((x) => x.id === id);
    if (!ct) return { ok: false, reason: 'no-such-contract' };
    if (state.activeContract) return { ok: false, reason: 'contract-active' };
    if (state.rank < ct.rep) return { ok: false, reason: 'rep-too-low', need: ct.rep };
    state.activeContract = { ...ct, dayTaken: getDay(), deadlineDay: getDay() + ct.days };
    state.contractProgress = 0;
    log(`Contract taken: ${ct.name} — ${ct.qty}x ${ct.tree} by day ${state.activeContract.deadlineDay}.`);
    return { ok: true, contract: state.activeContract };
  }

  function checkContract(treeId, qty) {
    const ct = state.activeContract;
    if (!ct || ct.tree !== treeId) return;
    state.contractProgress += qty;
    if (state.contractProgress >= ct.qty) {
      const bonus = ct.pay + state.rank * 50;
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractsDone += 1;
      state.earned += bonus;
      addCash(bonus);
      gainXp(60);
      log(`Contract complete: ${ct.name} paid $${bonus}.`);
    }
  }

  function deliverContract() {
    const ct = state.activeContract;
    if (!ct) return { ok: false, reason: 'no-contract' };
    if (state.contractProgress < ct.qty) return { ok: false, reason: 'not-enough', have: state.contractProgress, need: ct.qty };
    const have = state.logs[ct.tree] || 0;
    if (have < ct.qty) return { ok: false, reason: 'not-enough-logs', have, need: ct.qty };
    state.logs[ct.tree] -= ct.qty;
    const bonus = ct.pay + state.rank * 50;
    state.activeContract = null;
    state.contractProgress = 0;
    state.contractsDone += 1;
    state.earned += bonus;
    addCash(bonus);
    gainXp(60);
    log(`Contract delivered: ${ct.name} paid $${bonus}.`);
    return { ok: true, pay: bonus };
  }

  function abandonContract() {
    if (!state.activeContract) return { ok: false, reason: 'no-contract' };
    state.activeContract = null;
    state.contractProgress = 0;
    state.contractsFailed += 1;
    log('Contract abandoned — the client will remember that.');
    return { ok: true };
  }

  function payFine() {
    if (state.fines <= 0) return { ok: false, reason: 'no-fines' };
    const amount = state.fines;
    if (getCash() < amount) return { ok: false, reason: 'not-enough-cash', amount };
    addCash(-amount);
    state.finesPaid += amount;
    state.fines = 0;
    log(`Forest fines settled: $${amount} paid.`);
    return { ok: true, amount };
  }

  function wardenCheck() {
    const legal = state.upgrades.includes('permit');
    if (!legal && state.stand === 'grove' && rng() < 0.4) {
      const fine = 200;
      state.fines += fine;
      state.reputation -= 10;
      addHeat(3);
      log(`The warden catches you felling in the grove without a permit — fine $${fine}, heat +3.`);
      return { ok: true, caught: true, fine };
    }
    return { ok: true, caught: false };
  }

  function priceBoard() {
    return LOGGING_TREES.map((t) => ({
      id: t.id, name: t.name,
      price: loggingPriceFor(t, state.rank, state.upgrades),
      logs: state.logs[t.id], boards: state.boards[t.id],
      hardness: t.hardness, regrow: t.regrow,
    }));
  }

  function standReport() {
    return LOGGING_STANDS.map((s) => ({
      id: s.id, name: s.name, district: s.district, mult: s.mult, danger: s.danger,
      trees: LOGGING_TREES.filter((t) => t.stand === s.id).map((t) => t.id),
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.2) {
      const ev = LOGGING_EVENTS[Math.floor(rng() * LOGGING_EVENTS.length)];
      state.currentEvent = ev.id;
      log(`Forest news: ${ev.name} — ${ev.desc}`);
      return { event: ev.id, name: ev.name };
    }
    if (roll < 0.3) {
      const free = LOGGING_TREES[Math.floor(rng() * LOGGING_TREES.length)];
      state.logs[free.id] += 2;
      log(`A neighbour drops off 2x ${free.name} logs at your yard.`);
      return { event: 'gift', tree: free.id };
    }
    state.currentEvent = null;
    return { event: 'none' };
  }

  function tick(dt) {
    if (state.stand) {
      state.standTimeLeft -= dt;
      if (state.standTimeLeft <= 0) {
        const s = state.stand;
        state.stand = null;
        state.standTimeLeft = 0;
        state.felling = null;
        state.fellProgress = 0;
        state.trips += 1;
        state.carryKg = 0;
        log(`Daylight fades in ${s} — time to haul out.`);
      }
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyFelled = 0;
    state.dailyEarned = 0;
    if (state.activeContract && day >= state.activeContract.deadlineDay && state.contractProgress < state.activeContract.qty) {
      log(`Contract ${state.activeContract.name} expired — the client walked away.`);
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractsFailed += 1;
    }
    if (state.reputation < 30 && rng() < 0.3) {
      state.fines += 100;
      log('The forest service fines you for clear-cutting — reputation too low.');
    }
    dailyEvent();
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, trips: state.trips,
      treesFelled: state.treesFelled, woodCut: state.woodCut,
      boardsSawn: state.boardsSawn, earned: state.earned, spent: state.spent,
      hazards: state.hazards, injuries: state.injuries, fines: state.fines,
      finesPaid: state.finesPaid, replanted: state.replanted,
      reputation: state.reputation, logs: state.logs, boards: state.boards,
      products: state.products, upgrades: state.upgrades, stand: state.stand,
      standTimeLeft: state.standTimeLeft, felling: state.felling,
      fellProgress: state.fellProgress, lastDay: state.lastDay,
      activeContract: state.activeContract, contractProgress: state.contractProgress,
      contractsDone: state.contractsDone, contractsFailed: state.contractsFailed,
      bestTree: state.bestTree, bestValue: state.bestValue,
      dailyFelled: state.dailyFelled, dailyEarned: state.dailyEarned,
      carryKg: state.carryKg, totalKg: state.totalKg,
      currentEvent: state.currentEvent, windfall: state.windfall, stumps: state.stumps,
    }));
  }

  function deserialize(d) {
    if (!d || typeof d !== 'object') return;
    for (const k of Object.keys(state)) {
      if (d[k] !== undefined) state[k] = d[k];
    }
    for (const t of LOGGING_TREES) {
      if (state.logs[t.id] === undefined) state.logs[t.id] = 0;
      if (state.boards[t.id] === undefined) state.boards[t.id] = 0;
    }
    for (const p of LOGGING_PRODUCTS) {
      if (state.products[p.id] === undefined) state.products[p.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: LOGGING_RANKS[state.rank].name,
      xp: state.xp,
      trips: state.trips,
      treesFelled: state.treesFelled,
      woodCut: state.woodCut,
      boardsSawn: state.boardsSawn,
      earned: Math.round(state.earned),
      spent: state.spent,
      hazards: state.hazards,
      injuries: state.injuries,
      fines: state.fines,
      replanted: state.replanted,
      reputation: state.reputation,
      upgrades: state.upgrades.length,
      stand: state.stand,
      felling: state.felling,
      activeContract: state.activeContract ? state.activeContract.id : null,
      contractsDone: state.contractsDone,
      contractsFailed: state.contractsFailed,
      bestTree: state.bestTree,
      dailyFelled: state.dailyFelled,
      dailyEarned: Math.round(state.dailyEarned),
      carryKg: Math.round(state.carryKg * 10) / 10,
      carryCap: loggingCarryCap(state.upgrades),
      windfall: state.windfall,
      stumps: state.stumps,
      event: state.currentEvent,
    };
  }

  function hudLine() {
    if (state.felling) {
      const t = LOGGING_TREES.find((x) => x.id === state.felling);
      return `Timber: felling ${t ? t.name : state.felling} — ${state.fellProgress}/${t ? t.hardness * 4 : '?'} chops`;
    }
    if (state.stand) return `Timber: ${state.stand} — mark a tree to fell`;
    if (state.activeContract) return `Timber: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    const logTotal = Object.values(state.logs).reduce((a, b) => a + b, 0);
    if (logTotal > 0) return `Timber: ${logTotal} logs to saw or sell`;
    if (state.stumps > 0) return `Timber: ${state.stumps} stumps to replant`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearWoods = Math.hypot(pos.x - 420, pos.z - 180) < 40;
    if (!nearWoods) return false;
    if (!state.stand) { enterStand('ridge'); return true; }
    if (!state.felling) { markTree(); return true; }
    chop();
    return true;
  }

  return {
    state, enterStand, markTree, chop, leaveStand, sawBoards,
    makeProduct, sellLogs, sellBoards, sellProduct, sellAll,
    replant, collectWindfall, buyUpgrade, takeContract,
    deliverContract, abandonContract, payFine, wardenCheck,
    priceBoard, standReport, dailyEvent,
    tick, tickDay, serialize, deserialize, stats, hudLine, interact,
  };
}

export const LOGGING_HELPERS = [
  { id: 'sawyer', name: 'Sawyer Jo', wage: 35, skill: 'saw', bonus: 0.2, desc: 'Saws straight: +20% board yield.' },
  { id: 'hauler', name: 'Ox Team', wage: 50, skill: 'carry', bonus: 0.4, desc: 'Two strong oxen: +40% carry capacity.' },
  { id: 'forester', name: 'Forester Ila', wage: 55, skill: 'replant', bonus: 0.5, desc: 'Plants fast: replanting is half price.' },
  { id: 'climber', name: 'Climber Ash', wage: 45, skill: 'fell', bonus: 0.25, desc: 'Tops trees first: +25% fell speed.' },
];

export const LOGGING_CHALLENGES = [
  { id: 'trees-10', name: 'First Ten', target: 'treesFelled', goal: 10, xp: 80, desc: 'Fell 10 trees.' },
  { id: 'wood-500', name: 'Half a Forest', target: 'woodCut', goal: 500, xp: 100, desc: 'Cut 500 wood in total.' },
  { id: 'boards-100', name: 'Board Maker', target: 'boardsSawn', goal: 100, xp: 100, desc: 'Saw 100 boards.' },
  { id: 'earn-1000', name: 'Timber Purse', target: 'earned', goal: 1000, xp: 120, desc: 'Earn $1,000 from timber.' },
  { id: 'replant-50', name: 'Forest Friend', target: 'replanted', goal: 50, xp: 150, desc: 'Replant 50 saplings.' },
  { id: 'contracts-5', name: 'Reliable Logger', target: 'contractsDone', goal: 5, xp: 140, desc: 'Complete 5 logging contracts.' },
  { id: 'redwood-1', name: 'Giant Feller', target: 'bestValue', goal: 180, xp: 200, desc: 'Fell timber worth $180 or more.' },
  { id: 'rep-90', name: 'Warden’s Favourite', target: 'reputation', goal: 90, xp: 150, desc: 'Reach 90 forest reputation.' },
];

export const LOGGING_ACHIEVEMENTS = [
  { id: 'first-tree', name: 'First Tree', check: (s) => s.treesFelled >= 1, desc: 'Fell your first tree.' },
  { id: 'first-board', name: 'First Board', check: (s) => s.boardsSawn >= 1, desc: 'Saw your first board.' },
  { id: 'first-redwood', name: 'Giant Down', check: (s) => s.bestTree === 'redwood', desc: 'Fell a giant redwood.' },
  { id: 'rank-3', name: 'Timber Boss', check: (s) => s.rank >= 3, desc: 'Reach rank Timber Boss.' },
  { id: 'rich-logger', name: 'Rich Logger', check: (s) => s.earned >= 3000, desc: 'Earn $3,000 from timber.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every logging upgrade.' },
  { id: 'no-injury', name: 'Safe Hands', check: (s) => s.treesFelled >= 50 && s.injuries === 0, desc: 'Fell 50 trees without injury.' },
  { id: 'replanter', name: 'Replanter', check: (s) => s.replanted >= 100, desc: 'Replant 100 saplings.' },
];

export function loggingHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of LOGGING_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function loggingChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function createLoggingExtras(system) {
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  function hireHelper(id) {
    const h = LOGGING_HELPERS.find((x) => x.id === id);
    if (!h) return { ok: false, reason: 'no-such-helper' };
    if (helpers.includes(id)) return { ok: false, reason: 'already-hired' };
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
      const h = LOGGING_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    wagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: wagesPaid };
  }

  function helperBonus(skill) {
    return loggingHelperBonus(helpers, skill);
  }

  function challenges() {
    return LOGGING_CHALLENGES.map((ch) => loggingChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = LOGGING_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = loggingChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return LOGGING_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function survey(treeId) {
    const tree = LOGGING_TREES.find((t) => t.id === treeId);
    if (!tree) return { ok: false, reason: 'no-such-tree' };
    return { ok: true, tree: treeId, value: tree.value, wood: tree.wood, hardness: tree.hardness, regrow: tree.regrow };
  }

  function inventoryValue() {
    let total = 0;
    for (const t of LOGGING_TREES) {
      total += (system.state.logs[t.id] || 0) * t.value;
      total += (system.state.boards[t.id] || 0) * Math.round(t.value * 0.6);
    }
    return { ok: true, value: Math.round(total) };
  }

  function weighIn() {
    const total = Math.round(system.state.carryKg * 10) / 10;
    const cap = loggingCarryCap(system.state.upgrades);
    return { carryKg: total, cap, free: Math.round((cap - system.state.carryKg) * 10) / 10 };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, survey, inventoryValue, weighIn,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return wagesPaid; },
  };
}

export const LOGGING_TIPS = [
  { id: 'permit-first', name: 'Permit First', text: 'One warden fine costs more than the permit.' },
  { id: 'lean', name: 'Read the Lean', text: 'Always check which way the tree leans before you cut.' },
  { id: 'saw-boards', name: 'Saw Your Boards', text: 'Boards pay more than raw logs. Build the mill.' },
  { id: 'replant', name: 'Replant Always', text: 'Replanting keeps the warden happy and the woods full.' },
  { id: 'storm', name: 'After the Storm', text: 'Storms drop free windfall — collect it fast.' },
  { id: 'walnut', name: 'Walnut Is Gold', text: 'Black walnut pays like treasure. Guard it well.' },
  { id: 'look-up', name: 'Look Up', text: 'Widowmakers kill careless fellers. Look up first.' },
  { id: 'grove', name: 'The Grove', text: 'Redwoods pay a fortune — and cost you reputation.' },
];

export const LOGGING_LEADERBOARD = [
  { name: 'Forester Ila', kg: 12000, desc: 'Plants more than she fells.' },
  { name: 'Sawyer Jo', kg: 9000, desc: 'Saws straight, every time.' },
  { name: 'Ria', kg: 0, desc: 'You. Climbing.' },
  { name: 'Climber Ash', kg: 6100, desc: 'Tops the tallest trees.' },
  { name: 'Ox Team', kg: 4800, desc: 'Two oxen, endless loads.' },
];

export function loggingTipFor(day) {
  return LOGGING_TIPS[day % LOGGING_TIPS.length];
}

export function loggingLeaderboardWith(playerKg) {
  const board = LOGGING_LEADERBOARD.map((e) => ({
    name: e.name, kg: e.name === 'Ria' ? playerKg : e.kg, desc: e.desc,
  }));
  board.sort((a, b) => b.kg - a.kg);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function loggingEfficiency(woodCut, treesFelled) {
  if (treesFelled === 0) return 0;
  return Math.round((woodCut / treesFelled) * 100) / 100;
}

export function loggingProfitPerTrip(earned, trips) {
  if (trips === 0) return 0;
  return Math.round((earned / trips) * 10) / 10;
}

export function loggingGrade(treesFelled, injuries, replanted) {
  if (treesFelled === 0) return 'D';
  const score = treesFelled - injuries * 10 + replanted;
  if (score >= 200) return 'S';
  if (score >= 120) return 'A';
  if (score >= 60) return 'B';
  if (score >= 25) return 'C';
  return 'D';
}

export const LOGGING_RECORDS = [
  { id: 'most-trees', name: 'Most Trees', stat: 'treesFelled', unit: 'trees', desc: 'Most trees felled.' },
  { id: 'most-wood', name: 'Most Wood', stat: 'woodCut', unit: 'wood', desc: 'Most wood cut.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from timber.' },
  { id: 'most-replanted', name: 'Most Replanted', stat: 'replanted', unit: 'saplings', desc: 'Most saplings replanted.' },
  { id: 'best-tree', name: 'Best Tree', stat: 'bestValue', unit: '$', desc: 'Most valuable single tree.' },
];

export function loggingRecordFor(recordId, state) {
  const r = LOGGING_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function loggingAllRecords(state) {
  return LOGGING_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function loggingSummary(state) {
  return `Timber ${LOGGING_RANKS[state.rank].name}: ${state.treesFelled} trees, ${state.woodCut} wood, ${state.boardsSawn} boards, $${Math.round(state.earned)} earned, rep ${state.reputation}.`;
}

export function loggingNextGoal(state) {
  if (state.treesFelled < 10) return 'Fell 10 trees.';
  if (state.boardsSawn < 50) return 'Saw 50 boards.';
  if (state.rank < 2) return 'Reach rank Feller.';
  return 'Fell a giant redwood in the Old Grove.';
}

export const LOGGING_QUICK_START = [
  'Buy the logging permit before you fell anything.',
  'Start on Pine Ridge — pines are easy and quick.',
  'Saw boards before selling; the builders pay more.',
  'Replant every stump to keep the warden happy.',
  'Take sawmill contracts for trees you already fell.',
  'Never fell a redwood without the skidder crane.',
];

export function loggingQuickStart(step) {
  return LOGGING_QUICK_START[step] || null;
}

export const LOGGING_META = {
  system: 'logging', version: '7-B1', author: 'builder-1',
  trees: LOGGING_TREES.length, stands: LOGGING_STANDS.length,
  note: 'Timberline: fell, saw, replant, sell.',
};
