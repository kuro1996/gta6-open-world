// Solara Nights — Recycling / Solara Reclaim (Round 7b-B, written fresh).
// Ria turns the city's trash into cash: run collection routes through the
// districts, sort the haul into the right bins, and sell the sorted bales
// to scrapyard buyers whose prices drift every day. Upgrades speed the
// cart, sharpen the magnet and unlock the crusher; contracts pay a bonus
// for delivering a quota of one material before the day ends. A rare
// "street treasure" can hide in any pile — and so can broken glass.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getSpeed } and drives tick/tickDay from the main loop.

export const RECYCLING_MATERIALS = [
  { id: 'aluminium', name: 'Aluminium Cans', basePrice: 6, weight: 0.4, rarity: 0.22, sortTime: 2, bin: 'metal', hazard: 0, desc: 'Crushed drink cans, light and everywhere.' },
  { id: 'copper', name: 'Copper Wire', basePrice: 34, weight: 1.8, rarity: 0.05, sortTime: 4, bin: 'metal', hazard: 1, desc: 'Stripped wire from dead appliances.' },
  { id: 'steel', name: 'Steel Scrap', basePrice: 9, weight: 3.2, rarity: 0.16, sortTime: 3, bin: 'metal', hazard: 1, desc: 'Rusty offcuts and old fittings.' },
  { id: 'brass', name: 'Brass Fittings', basePrice: 21, weight: 1.1, rarity: 0.07, sortTime: 3, bin: 'metal', hazard: 0, desc: 'Taps, valves and door hardware.' },
  { id: 'glass', name: 'Glass Bottles', basePrice: 3, weight: 1.4, rarity: 0.24, sortTime: 2, bin: 'glass', hazard: 2, desc: 'Green and brown bottles, some already broken.' },
  { id: 'plastic', name: 'PET Plastic', basePrice: 4, weight: 0.3, rarity: 0.26, sortTime: 2, bin: 'plastic', hazard: 0, desc: 'Bottles and tubs, rinsed by the rain.' },
  { id: 'paper', name: 'Cardboard', basePrice: 2, weight: 0.9, rarity: 0.28, sortTime: 1, bin: 'paper', hazard: 0, desc: 'Flattened boxes from the market stalls.' },
  { id: 'ewaste', name: 'E-Waste Boards', basePrice: 48, weight: 0.8, rarity: 0.03, sortTime: 6, bin: 'ewaste', hazard: 2, desc: 'Circuit boards with gold fingers.' },
  { id: 'batteries', name: 'Old Batteries', basePrice: 15, weight: 1.6, rarity: 0.06, sortTime: 4, bin: 'hazard', hazard: 3, desc: 'Leaking cells — gloves strongly advised.' },
  { id: 'tires', name: 'Worn Tires', basePrice: 7, weight: 6.5, rarity: 0.09, sortTime: 5, bin: 'rubber', hazard: 0, desc: 'Bald rubber from the taxi ranks.' },
  { id: 'textiles', name: 'Rag Textiles', basePrice: 3, weight: 0.6, rarity: 0.18, sortTime: 2, bin: 'textile', hazard: 0, desc: 'Torn shirts and hotel linen.' },
  { id: 'furniture', name: 'Broken Furniture', basePrice: 11, weight: 8.0, rarity: 0.08, sortTime: 6, bin: 'wood', hazard: 1, desc: 'Chairs and pallets left on the kerb.' },
];

export const RECYCLING_BINS = [
  { id: 'metal', name: 'Metal Bin', color: 'grey', bonus: 1.0 },
  { id: 'glass', name: 'Glass Bin', color: 'green', bonus: 1.0 },
  { id: 'plastic', name: 'Plastic Bin', color: 'blue', bonus: 1.0 },
  { id: 'paper', name: 'Paper Bin', color: 'yellow', bonus: 1.0 },
  { id: 'ewaste', name: 'E-Waste Cage', color: 'red', bonus: 1.25 },
  { id: 'hazard', name: 'Hazard Drum', color: 'orange', bonus: 1.25 },
  { id: 'rubber', name: 'Rubber Pile', color: 'black', bonus: 1.0 },
  { id: 'textile', name: 'Textile Sack', color: 'purple', bonus: 1.0 },
  { id: 'wood', name: 'Wood Skip', color: 'brown', bonus: 1.0 },
];

export const RECYCLING_ROUTES = [
  { id: 'marina', name: 'Marina Walk', district: 'Marina', piles: 6, density: 0.7, hazard: 0, mult: 1.0, timeMin: 4, desc: 'Bottles and cans along the boardwalk.' },
  { id: 'downtown', name: 'Downtown Loop', district: 'Downtown', piles: 9, density: 1.0, hazard: 1, mult: 1.15, timeMin: 6, desc: 'Office bins, lunch litter, fast turnover.' },
  { id: 'docks', name: 'Crown Docks', district: 'Docks', piles: 8, density: 0.9, hazard: 2, mult: 1.25, timeMin: 6, desc: 'Heavy scrap near the warehouses.' },
  { id: 'beach', name: 'Beach Sweep', district: 'Beach', piles: 7, density: 0.8, hazard: 0, mult: 1.05, timeMin: 5, desc: 'Plastic washed up with the tide.' },
  { id: 'suburbs', name: 'Suburb Kerbs', district: 'Suburbs', piles: 10, density: 0.85, hazard: 0, mult: 1.0, timeMin: 7, desc: 'Bins out on collection day.' },
  { id: 'market', name: 'Night Market', district: 'Market', piles: 8, density: 1.1, hazard: 1, mult: 1.2, timeMin: 5, desc: 'Cardboard mountain after closing.' },
  { id: 'industrial', name: 'Industrial Estate', district: 'Industrial', piles: 7, density: 0.95, hazard: 3, mult: 1.4, timeMin: 6, desc: 'Copper and e-waste, sharp edges.' },
  { id: 'oldtown', name: 'Old Town Alleys', district: 'Old Town', piles: 6, density: 0.75, hazard: 1, mult: 1.1, timeMin: 5, desc: 'Quiet lanes, old furniture, odd finds.' },
];

export const SCRAPYARD_BUYERS = [
  { id: 'marla', name: "Marla's Yard", mult: 1.0, likes: ['metal', 'rubber'], dislikes: ['hazard'], mood: 'steady', minRep: 0, desc: 'Fair prices, pays on the spot.' },
  { id: 'bigjoe', name: 'Big Joe Metals', mult: 1.12, likes: ['metal'], dislikes: ['paper', 'textile'], mood: 'greedy', minRep: 1, desc: 'Top dollar for metal, shrugs at the rest.' },
  { id: 'greenloop', name: 'GreenLoop Co-op', mult: 1.05, likes: ['plastic', 'paper', 'glass'], dislikes: ['ewaste'], mood: 'green', minRep: 0, desc: 'Pays extra for clean recyclables.' },
  { id: 'volt', name: 'Volt Recovery', mult: 1.3, likes: ['ewaste', 'hazard'], dislikes: ['paper', 'wood'], mood: 'specialist', minRep: 2, desc: 'E-waste and batteries only, big money.' },
  { id: 'harbor', name: 'Harbor Salvage', mult: 1.08, likes: ['steel', 'furniture'], dislikes: ['plastic'], mood: 'steady', minRep: 1, desc: 'Buys heavy stuff by the tonne.' },
  { id: 'nightowl', name: 'Night Owl Trader', mult: 1.2, likes: ['copper', 'brass'], dislikes: ['glass', 'paper'], mood: 'shady', minRep: 3, desc: 'Night prices for copper and brass, no questions.' },
];

export const RECYCLING_UPGRADES = [
  { id: 'gloves', name: 'Work Gloves', cost: 60, desc: 'No more cuts: hazard damage halved.', effect: 'hazard-half' },
  { id: 'cart', name: 'Sturdy Cart', cost: 150, desc: 'Carry +40 kg per route.', effect: 'carry-plus' },
  { id: 'magnet', name: 'Junk Magnet', cost: 220, desc: 'Metal finds +35% on every pile.', effect: 'metal-plus' },
  { id: 'sorter', name: 'Sort Table', cost: 320, desc: 'Sorting is 30% faster.', effect: 'sort-fast' },
  { id: 'crusher', name: 'Can Crusher', cost: 450, desc: 'Cans and bottles pay +25%.', effect: 'crush-plus' },
  { id: 'scanner', name: 'Scrap Scanner', cost: 600, desc: 'Reveals the best pile on a route.', effect: 'scan' },
  { id: 'truck', name: 'Flatbed Truck', cost: 900, desc: 'Carry +120 kg, routes finish faster.', effect: 'truck' },
  { id: 'baler', name: 'Bale Press', cost: 1200, desc: 'Sorted bales pay +20% everywhere.', effect: 'bale-plus' },
];

export const RECYCLING_CONTRACTS = [
  { id: 'cans-40', name: 'Can Drive', material: 'aluminium', qty: 40, pay: 320, days: 1, rep: 2, desc: 'A beach bar needs 40 cans by tonight.' },
  { id: 'copper-12', name: 'Copper Call', material: 'copper', qty: 12, pay: 520, days: 2, rep: 3, desc: 'An electrician pays for 12 copper lots.' },
  { id: 'glass-30', name: 'Bottle Return', material: 'glass', qty: 30, pay: 180, days: 1, rep: 1, desc: 'A restaurant chain wants its bottles back.' },
  { id: 'ewaste-6', name: 'Board Hunt', material: 'ewaste', qty: 6, pay: 640, days: 2, rep: 4, desc: 'Volt Recovery needs 6 boards, discreetly.' },
  { id: 'paper-60', name: 'Box Mountain', material: 'paper', qty: 60, pay: 240, days: 1, rep: 1, desc: 'The market co-op drowns in cardboard.' },
  { id: 'steel-20', name: 'Steel Order', material: 'steel', qty: 20, pay: 380, days: 2, rep: 2, desc: 'Harbor Salvage orders 20 steel lots.' },
  { id: 'tires-10', name: 'Tire Pile', material: 'tires', qty: 10, pay: 260, days: 2, rep: 2, desc: 'A garage clears its tire mountain.' },
  { id: 'mixed-50', name: 'Mixed Bale', material: 'mixed', qty: 50, pay: 450, days: 2, rep: 3, desc: 'Any 50 sorted units for the co-op.' },
];

export const RECYCLING_TREASURES = [
  { id: 'watch', name: 'Old Dive Watch', value: 240, weight: 1, desc: 'Still ticks. Someone lost it on the beach.' },
  { id: 'ring', name: 'Silver Ring', value: 310, weight: 1, desc: 'Tarnished, but real silver.' },
  { id: 'camera', name: 'Film Camera', value: 180, weight: 1, desc: 'A vintage rangefinder in a bin bag.' },
  { id: 'coin', name: 'Rare Coin', value: 420, weight: 1, desc: 'A pre-war coin in the gutter.' },
  { id: 'phone', name: 'Cracked Phone', value: 95, weight: 2, desc: 'Screen smashed, board still good.' },
  { id: 'medal', name: 'Service Medal', value: 150, weight: 1, desc: 'Return it or sell it — your call.' },
  { id: 'toolbox', name: 'Brass Toolbox', value: 210, weight: 1, desc: 'Full of old spanners.' },
  { id: 'vinyl', name: 'Rare Vinyl', value: 130, weight: 2, desc: 'A first pressing, sleeve worn.' },
];

export const RECYCLING_RANKS = [
  { level: 0, name: 'Bin Diver', xp: 0, perk: 'Routes pay base rate.' },
  { level: 1, name: 'Kerbside Pro', xp: 120, perk: '+10% sale prices.' },
  { level: 2, name: 'Sort Master', xp: 300, perk: 'Sorting mistakes forgiven once per pile.' },
  { level: 3, name: 'Scrap Baron', xp: 620, perk: '+20% sale prices, buyers trust you.' },
  { level: 4, name: 'Reclaim King', xp: 1100, perk: '+30% sale prices, rare finds doubled.' },
];

export function recyclingRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < RECYCLING_RANKS.length; i++) {
    if (xp >= RECYCLING_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function recyclingPriceFor(material, dayDrift, rank, upgrades) {
  const m = RECYCLING_MATERIALS.find((x) => x.id === material);
  if (!m) return 0;
  let price = m.basePrice;
  price *= 1 + (dayDrift[material] || 0);
  price *= 1 + rank * 0.1;
  if (upgrades.includes('crusher') && (material === 'aluminium' || material === 'glass')) price *= 1.25;
  if (upgrades.includes('baler')) price *= 1.2;
  return Math.max(1, Math.round(price * 10) / 10);
}

export function recyclingBuyerPrice(material, buyerId, dayDrift, rank, upgrades) {
  const buyer = SCRAPYARD_BUYERS.find((b) => b.id === buyerId);
  if (!buyer) return 0;
  const m = RECYCLING_MATERIALS.find((x) => x.id === material);
  if (!m) return 0;
  let mult = buyer.mult;
  if (buyer.likes.includes(m.bin) || buyer.likes.includes(m.id)) mult += 0.15;
  if (buyer.dislikes.includes(m.bin) || buyer.dislikes.includes(m.id)) mult -= 0.2;
  return Math.max(1, Math.round(recyclingPriceFor(material, dayDrift, rank, upgrades) * mult * 10) / 10);
}

export function recyclingCarryCap(upgrades) {
  let cap = 60;
  if (upgrades.includes('cart')) cap += 40;
  if (upgrades.includes('truck')) cap += 120;
  return cap;
}

export function recyclingSortSpeed(upgrades) {
  return upgrades.includes('sorter') ? 0.7 : 1;
}

export function createRecyclingSystem(ctx) {
  const c = ctx || {};
  const rng = typeof c.rng === 'function' ? c.rng : Math.random;
  const getCash = typeof c.getCash === 'function' ? c.getCash : () => 0;
  const addCash = typeof c.addCash === 'function' ? c.addCash : () => {};
  const addHeat = typeof c.addHeat === 'function' ? c.addHeat : () => {};
  const log = typeof c.log === 'function' ? c.log : () => {};
  const getDay = typeof c.getDay === 'function' ? c.getDay : () => 1;
  const getHour = typeof c.getHour === 'function' ? c.getHour : () => 12;
  const getPos = typeof c.getPlayerPos === 'function' ? c.getPlayerPos : () => ({ x: 0, z: 0 });

  const state = {
    xp: 0,
    rank: 0,
    routesRun: 0,
    pilesCleared: 0,
    unitsSorted: 0,
    sortStreak: 0,
    bestStreak: 0,
    sortMistakes: 0,
    unitsSold: 0,
    earned: 0,
    spent: 0,
    treasuresFound: 0,
    treasuresSold: 0,
    contractsDone: 0,
    contractsFailed: 0,
    hazardsTaken: 0,
    carryKg: 0,
    unsorted: {},
    sorted: {},
    treasures: [],
    upgrades: [],
    activeContract: null,
    contractProgress: 0,
    route: null,
    routePilesLeft: 0,
    routeTimeLeft: 0,
    sorting: null,
    sortTimer: 0,
    dayDrift: {},
    lastDay: 1,
    bestRoute: null,
    bestRouteKg: 0,
    buyerRep: {},
    dailySold: 0,
    dailyEarned: 0,
    totalKg: 0,
  };
  for (const m of RECYCLING_MATERIALS) { state.unsorted[m.id] = 0; state.sorted[m.id] = 0; state.dayDrift[m.id] = 0; }
  for (const b of SCRAPYARD_BUYERS) state.buyerRep[b.id] = 0;

  function refreshRank() {
    const r = recyclingRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Recycling rank up: ${RECYCLING_RANKS[r].name} — ${RECYCLING_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function driftPrices() {
    for (const m of RECYCLING_MATERIALS) {
      const roll = rng();
      if (roll < 0.3) state.dayDrift[m.id] = Math.round((rng() * 0.5 - 0.2) * 100) / 100;
      else if (roll < 0.4) state.dayDrift[m.id] = 0;
    }
  }

  function pickMaterial(route) {
    const bag = [];
    for (const m of RECYCLING_MATERIALS) {
      const w = m.rarity * (m.bin === 'metal' && state.upgrades.includes('magnet') ? 1.35 : 1);
      bag.push({ m, w });
    }
    let total = 0;
    for (const b of bag) total += b.w;
    let roll = rng() * total;
    for (const b of bag) {
      roll -= b.w;
      if (roll <= 0) return b.m;
    }
    return RECYCLING_MATERIALS[0];
  }

  function startRoute(routeId) {
    const route = RECYCLING_ROUTES.find((r) => r.id === routeId);
    if (!route) return { ok: false, reason: 'no-such-route' };
    if (state.route) return { ok: false, reason: 'route-active' };
    if (getHour() >= 23 || getHour() < 5) return { ok: false, reason: 'too-late' };
    state.route = routeId;
    state.routePilesLeft = route.piles;
    state.routeTimeLeft = route.timeMin * 60 * (state.upgrades.includes('truck') ? 0.75 : 1);
    log(`Recycling route started: ${route.name} — ${route.piles} piles.`);
    return { ok: true, route: routeId, piles: route.piles };
  }

  function collectPile() {
    if (!state.route) return { ok: false, reason: 'no-route' };
    if (state.routePilesLeft <= 0) return { ok: false, reason: 'route-done' };
    const route = RECYCLING_ROUTES.find((r) => r.id === state.route);
    const cap = recyclingCarryCap(state.upgrades);
    if (state.carryKg >= cap) return { ok: false, reason: 'carry-full', cap };
    const finds = 1 + Math.floor(rng() * 3);
    const got = [];
    let kg = 0;
    for (let i = 0; i < finds; i++) {
      const m = pickMaterial(route);
      const qty = 1 + Math.floor(rng() * 3);
      const add = Math.min(qty, Math.max(0, Math.floor((cap - state.carryKg - kg) / m.weight)));
      if (add <= 0) break;
      state.unsorted[m.id] += add;
      state.carryKg += add * m.weight;
      state.totalKg += add * m.weight;
      kg += add * m.weight;
      got.push({ id: m.id, qty: add });
    }
    state.routePilesLeft -= 1;
    state.pilesCleared += 1;
    gainXp(4 + got.length);
    if (rng() < 0.06 + (state.rank >= 4 ? 0.06 : 0)) {
      const t = RECYCLING_TREASURES[Math.floor(rng() * RECYCLING_TREASURES.length)];
      state.treasures.push(t.id);
      state.treasuresFound += 1;
      log(`Street treasure! Found a ${t.name} worth $${t.value}.`);
    }
    if (rng() < route.hazard * 0.05) {
      const hurt = state.upgrades.includes('gloves') ? 0 : 1;
      state.hazardsTaken += hurt;
      if (hurt) log('Cut on broken glass while collecting — be careful out there.');
    }
    if (state.routePilesLeft <= 0) {
      const done = state.route;
      state.route = null;
      state.routesRun += 1;
      if (state.carryKg > state.bestRouteKg) { state.bestRouteKg = state.carryKg; state.bestRoute = done; }
      log(`Route ${done} cleared — ${kg.toFixed(1)} kg in the cart. Sort it before selling.`);
    }
    return { ok: true, got, pilesLeft: state.routePilesLeft, carryKg: Math.round(state.carryKg * 10) / 10 };
  }

  function beginSort(materialId) {
    const m = RECYCLING_MATERIALS.find((x) => x.id === materialId);
    if (!m) return { ok: false, reason: 'no-such-material' };
    if (state.sorting) return { ok: false, reason: 'already-sorting' };
    if ((state.unsorted[materialId] || 0) <= 0) return { ok: false, reason: 'none-unsorted' };
    state.sorting = materialId;
    state.sortTimer = m.sortTime * recyclingSortSpeed(state.upgrades);
    return { ok: true, material: materialId, bin: m.bin, sortTime: state.sortTimer };
  }

  function sortInto(binId) {
    if (!state.sorting) return { ok: false, reason: 'not-sorting' };
    const m = RECYCLING_MATERIALS.find((x) => x.id === state.sorting);
    const correct = m.bin === binId;
    const qty = state.unsorted[m.id];
    state.unsorted[m.id] = 0;
    state.carryKg = Math.max(0, state.carryKg - qty * m.weight);
    state.sorting = null;
    state.sortTimer = 0;
    if (correct) {
      state.sorted[m.id] += qty;
      state.unitsSorted += qty;
      state.sortStreak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.sortStreak);
      gainXp(2 + qty);
      if (state.activeContract) checkContract(m.id, qty);
      return { ok: true, correct: true, qty, bin: binId };
    }
    state.sortMistakes += 1;
    state.sortStreak = 0;
    const lost = Math.floor(qty / 2);
    state.sorted[m.id] += qty - lost;
    state.unitsSorted += qty - lost;
    log(`Wrong bin! ${m.name} belongs in ${m.bin} — half the pile was ruined.`);
    return { ok: true, correct: false, qty, kept: qty - lost, bin: binId };
  }

  function cancelSort() {
    if (!state.sorting) return { ok: false, reason: 'not-sorting' };
    state.sorting = null;
    state.sortTimer = 0;
    return { ok: true };
  }

  function sellTo(buyerId, materialId, qty) {
    const buyer = SCRAPYARD_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    if (state.rank < buyer.minRep) return { ok: false, reason: 'rep-too-low', need: buyer.minRep };
    const have = state.sorted[materialId] || 0;
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = recyclingBuyerPrice(materialId, buyerId, state.dayDrift, state.rank, state.upgrades);
    const total = Math.round(unit * qty * 10) / 10;
    state.sorted[materialId] -= qty;
    state.unitsSold += qty;
    state.earned += total;
    state.dailySold += qty;
    state.dailyEarned += total;
    state.buyerRep[buyerId] += 1;
    addCash(total);
    gainXp(qty);
    log(`Sold ${qty}x ${materialId} to ${buyer.name} for $${total}.`);
    return { ok: true, total, unit, qty };
  }

  function sellAllTo(buyerId) {
    const buyer = SCRAPYARD_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    let total = 0;
    let units = 0;
    const lines = [];
    for (const m of RECYCLING_MATERIALS) {
      const have = state.sorted[m.id] || 0;
      if (have <= 0) continue;
      const unit = recyclingBuyerPrice(m.id, buyerId, state.dayDrift, state.rank, state.upgrades);
      const line = Math.round(unit * have * 10) / 10;
      total += line;
      units += have;
      lines.push({ id: m.id, qty: have, total: line });
      state.sorted[m.id] = 0;
    }
    if (units === 0) return { ok: false, reason: 'nothing-sorted' };
    total = Math.round(total * 10) / 10;
    state.unitsSold += units;
    state.earned += total;
    state.dailySold += units;
    state.dailyEarned += total;
    state.buyerRep[buyerId] += 2;
    addCash(total);
    gainXp(units);
    log(`Sold everything (${units} units) to ${buyer.name} for $${total}.`);
    return { ok: true, total, units, lines };
  }

  function sellTreasure(treasureId) {
    const idx = state.treasures.indexOf(treasureId);
    if (idx < 0) return { ok: false, reason: 'no-such-treasure' };
    const t = RECYCLING_TREASURES.find((x) => x.id === treasureId);
    state.treasures.splice(idx, 1);
    state.treasuresSold += 1;
    const value = t.value + state.rank * 20;
    state.earned += value;
    addCash(value);
    gainXp(15);
    log(`Sold the ${t.name} for $${value}.`);
    return { ok: true, value };
  }

  function buyUpgrade(id) {
    const u = RECYCLING_UPGRADES.find((x) => x.id === id);
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
    const ct = RECYCLING_CONTRACTS.find((x) => x.id === id);
    if (!ct) return { ok: false, reason: 'no-such-contract' };
    if (state.activeContract) return { ok: false, reason: 'contract-active' };
    state.activeContract = { ...ct, dayTaken: getDay(), deadlineDay: getDay() + ct.days };
    state.contractProgress = 0;
    log(`Contract taken: ${ct.name} — deliver ${ct.qty}x ${ct.material} by day ${state.activeContract.deadlineDay}.`);
    return { ok: true, contract: state.activeContract };
  }

  function checkContract(materialId, qty) {
    const ct = state.activeContract;
    if (!ct) return;
    if (ct.material !== 'mixed' && ct.material !== materialId) return;
    state.contractProgress += qty;
    if (state.contractProgress >= ct.qty) {
      const bonus = ct.pay + state.rank * 40;
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
    if (ct.material === 'mixed') {
      const total = Object.values(state.sorted).reduce((a, b) => a + b, 0);
      if (total < ct.qty) return { ok: false, reason: 'not-enough', have: total, need: ct.qty };
      let left = ct.qty;
      for (const m of RECYCLING_MATERIALS) {
        if (left <= 0) break;
        const take = Math.min(state.sorted[m.id], left);
        state.sorted[m.id] -= take;
        left -= take;
      }
    } else {
      const have = state.sorted[ct.material] || 0;
      if (have < ct.qty) return { ok: false, reason: 'not-enough', have, need: ct.qty };
      state.sorted[ct.material] -= have;
      state.contractProgress = ct.qty;
    }
    const bonus = ct.pay + state.rank * 40;
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

  function haggle(buyerId) {
    const buyer = SCRAPYARD_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    if (state.rank < 1) return { ok: false, reason: 'rank-too-low' };
    const roll = rng();
    const bonus = 0.05 + state.rank * 0.03;
    if (roll < 0.55) {
      state.buyerRep[buyerId] += 1;
      log(`${buyer.name} agrees: +${Math.round(bonus * 100)}% on your next sale there.`);
      return { ok: true, haggled: true, bonus: Math.round(bonus * 100) / 100 };
    }
    log(`${buyer.name} shrugs you off — no better price today.`);
    return { ok: true, haggled: false, bonus: 0 };
  }

  function scoutRoute(routeId) {
    if (!state.upgrades.includes('scanner')) return { ok: false, reason: 'need-scanner' };
    const route = RECYCLING_ROUTES.find((r) => r.id === routeId);
    if (!route) return { ok: false, reason: 'no-such-route' };
    const best = pickMaterial(route);
    return { ok: true, route: routeId, bestFind: best.id, hint: `Scanner pings ${best.name} here.` };
  }

  function priceBoard() {
    return RECYCLING_MATERIALS.map((m) => ({
      id: m.id,
      name: m.name,
      price: recyclingPriceFor(m.id, state.dayDrift, state.rank, state.upgrades),
      drift: state.dayDrift[m.id],
      sorted: state.sorted[m.id],
      unsorted: state.unsorted[m.id],
    }));
  }

  function routeReport() {
    return RECYCLING_ROUTES.map((r) => ({
      id: r.id, name: r.name, district: r.district, piles: r.piles, mult: r.mult, hazard: r.hazard,
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.18) {
      for (const m of RECYCLING_MATERIALS) {
        if (m.bin === 'metal') state.dayDrift[m.id] = Math.round((state.dayDrift[m.id] + 0.25) * 100) / 100;
      }
      log('Market news: metal prices spike today!');
      return { event: 'metal-spike' };
    }
    if (roll < 0.3) {
      state.dayDrift.plastic = Math.round((state.dayDrift.plastic - 0.15) * 100) / 100;
      log('Market news: plastic glut — plastic prices dip.');
      return { event: 'plastic-dip' };
    }
    if (roll < 0.4) {
      const free = RECYCLING_MATERIALS[Math.floor(rng() * RECYCLING_MATERIALS.length)];
      state.unsorted[free.id] += 5;
      state.carryKg += 5 * free.weight;
      log(`A neighbour drops off 5x ${free.name} at your cart.`);
      return { event: 'gift', material: free.id };
    }
    return { event: 'none' };
  }

  function tick(dt) {
    if (state.sorting) {
      state.sortTimer -= dt;
      if (state.sortTimer <= 0) {
        const m = RECYCLING_MATERIALS.find((x) => x.id === state.sorting);
        log(`Sorting finished: ${m.name} is ready — pick a bin.`);
        state.sortTimer = 0;
      }
    }
    if (state.route) {
      state.routeTimeLeft -= dt;
      if (state.routeTimeLeft <= 0) {
        const route = state.route;
        state.route = null;
        state.routePilesLeft = 0;
        state.routesRun += 1;
        log(`Route ${route} timed out — the shift ended.`);
      }
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    driftPrices();
    state.dailySold = 0;
    state.dailyEarned = 0;
    if (state.activeContract && day >= state.activeContract.deadlineDay && state.contractProgress < state.activeContract.qty) {
      log(`Contract ${state.activeContract.name} expired — the client walked away.`);
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractsFailed += 1;
    }
    dailyEvent();
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, routesRun: state.routesRun,
      pilesCleared: state.pilesCleared, unitsSorted: state.unitsSorted,
      sortStreak: state.sortStreak, bestStreak: state.bestStreak,
      sortMistakes: state.sortMistakes, unitsSold: state.unitsSold,
      earned: state.earned, spent: state.spent,
      treasuresFound: state.treasuresFound, treasuresSold: state.treasuresSold,
      contractsDone: state.contractsDone, contractsFailed: state.contractsFailed,
      hazardsTaken: state.hazardsTaken, carryKg: state.carryKg,
      unsorted: state.unsorted, sorted: state.sorted, treasures: state.treasures,
      upgrades: state.upgrades, activeContract: state.activeContract,
      contractProgress: state.contractProgress, route: state.route,
      routePilesLeft: state.routePilesLeft, routeTimeLeft: state.routeTimeLeft,
      sorting: state.sorting, sortTimer: state.sortTimer,
      dayDrift: state.dayDrift, lastDay: state.lastDay,
      bestRoute: state.bestRoute, bestRouteKg: state.bestRouteKg,
      buyerRep: state.buyerRep, dailySold: state.dailySold,
      dailyEarned: state.dailyEarned, totalKg: state.totalKg,
    }));
  }

  function deserialize(d) {
    if (!d || typeof d !== 'object') return;
    for (const k of Object.keys(state)) {
      if (d[k] !== undefined) state[k] = d[k];
    }
    for (const m of RECYCLING_MATERIALS) {
      if (state.unsorted[m.id] === undefined) state.unsorted[m.id] = 0;
      if (state.sorted[m.id] === undefined) state.sorted[m.id] = 0;
      if (state.dayDrift[m.id] === undefined) state.dayDrift[m.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: RECYCLING_RANKS[state.rank].name,
      xp: state.xp,
      routesRun: state.routesRun,
      pilesCleared: state.pilesCleared,
      unitsSorted: state.unitsSorted,
      bestStreak: state.bestStreak,
      sortMistakes: state.sortMistakes,
      unitsSold: state.unitsSold,
      earned: Math.round(state.earned),
      spent: state.spent,
      treasuresFound: state.treasuresFound,
      treasuresSold: state.treasuresSold,
      contractsDone: state.contractsDone,
      contractsFailed: state.contractsFailed,
      hazardsTaken: state.hazardsTaken,
      carryKg: Math.round(state.carryKg * 10) / 10,
      carryCap: recyclingCarryCap(state.upgrades),
      upgrades: state.upgrades.length,
      activeContract: state.activeContract ? state.activeContract.id : null,
      contractProgress: state.contractProgress,
      route: state.route,
      pilesLeft: state.routePilesLeft,
      sorting: state.sorting,
      dailyEarned: Math.round(state.dailyEarned),
      totalKg: Math.round(state.totalKg * 10) / 10,
      bestRoute: state.bestRoute,
    };
  }

  function hudLine() {
    if (state.route) return `Reclaim: ${state.route} — ${state.routePilesLeft} piles left, ${Math.round(state.carryKg)}kg`;
    if (state.sorting) return `Reclaim: sorting ${state.sorting} — pick a bin!`;
    if (state.activeContract) return `Reclaim: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    const unsortedTotal = Object.values(state.unsorted).reduce((a, b) => a + b, 0);
    if (unsortedTotal > 0) return `Reclaim: ${unsortedTotal} units unsorted`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearYard = Math.hypot(pos.x - 120, pos.z + 80) < 25;
    if (!nearYard) return false;
    if (state.route) { collectPile(); return true; }
    const unsortedTotal = Object.values(state.unsorted).reduce((a, b) => a + b, 0);
    if (unsortedTotal > 0) {
      const first = RECYCLING_MATERIALS.find((m) => state.unsorted[m.id] > 0);
      beginSort(first.id);
      return true;
    }
    return false;
  }

  return {
    state, startRoute, collectPile, beginSort, sortInto, cancelSort,
    sellTo, sellAllTo, sellTreasure, buyUpgrade, takeContract,
    deliverContract, abandonContract, haggle, scoutRoute, priceBoard,
    routeReport, dailyEvent, tick, tickDay, serialize, deserialize,
    stats, hudLine, interact,
  };
}

export const RECYCLING_HELPERS = [
  { id: 'kid', name: 'Rafi the Runner', wage: 25, skill: 'collect', bonus: 0.15, desc: 'Fast legs: +15% pile yield on routes.' },
  { id: 'sorter', name: 'Old Marta', wage: 40, skill: 'sort', bonus: 0.25, desc: 'Forty years sorting: +25% sort speed.' },
  { id: 'driver', name: 'Big Dee', wage: 60, skill: 'carry', bonus: 0.4, desc: 'Drives the truck: +40% carry capacity.' },
  { id: 'fence', name: 'Quiet Lou', wage: 80, skill: 'sell', bonus: 0.12, desc: 'Knows every buyer: +12% sale prices.' },
];

export const RECYCLING_CHALLENGES = [
  { id: 'kilo-100', name: 'First Tonne', target: 'totalKg', goal: 100, xp: 80, desc: 'Haul 100 kg of scrap in total.' },
  { id: 'sort-200', name: 'Sorting Machine', target: 'unitsSorted', goal: 200, xp: 100, desc: 'Sort 200 units correctly.' },
  { id: 'sell-500', name: 'Half Grand', target: 'earned', goal: 500, xp: 120, desc: 'Earn $500 from scrap sales.' },
  { id: 'routes-10', name: 'Route Regular', target: 'routesRun', goal: 10, xp: 90, desc: 'Finish 10 collection routes.' },
  { id: 'streak-10', name: 'Clean Streak', target: 'bestStreak', goal: 10, xp: 110, desc: 'Sort 10 piles in a row without a mistake.' },
  { id: 'treasure-5', name: 'Treasure Hunter', target: 'treasuresFound', goal: 5, xp: 150, desc: 'Find 5 street treasures.' },
  { id: 'contracts-5', name: 'Reliable Hands', target: 'contractsDone', goal: 5, xp: 140, desc: 'Complete 5 scrap contracts.' },
  { id: 'piles-100', name: 'Pile Driver', target: 'pilesCleared', goal: 100, xp: 100, desc: 'Clear 100 trash piles.' },
];

export const RECYCLING_ACHIEVEMENTS = [
  { id: 'first-route', name: 'First Route', check: (s) => s.routesRun >= 1, desc: 'Finish your first collection route.' },
  { id: 'first-sale', name: 'First Sale', check: (s) => s.unitsSold >= 1, desc: 'Sell your first sorted unit.' },
  { id: 'first-treasure', name: 'Lucky Find', check: (s) => s.treasuresFound >= 1, desc: 'Find your first street treasure.' },
  { id: 'rank-2', name: 'Sort Master', check: (s) => s.rank >= 2, desc: 'Reach rank Sort Master.' },
  { id: 'rich-scrap', name: 'Scrap Rich', check: (s) => s.earned >= 2000, desc: 'Earn $2,000 from recycling.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every recycling upgrade.' },
  { id: 'no-mistake-day', name: 'Clean Hands', check: (s) => s.unitsSorted >= 50 && s.sortMistakes === 0, desc: 'Sort 50 units with zero mistakes.' },
  { id: 'big-haul', name: 'Big Haul', check: (s) => s.bestRouteKg >= 120, desc: 'Haul 120 kg on a single route.' },
];

export function recyclingHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of RECYCLING_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function recyclingChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function createRecyclingExtras(system) {
  // Extra crew / challenge / achievement layer bolted onto a recycling
  // system instance without touching its core state shape.
  const helpers = [];
  const claimed = [];
  let helperWagesPaid = 0;

  function hireHelper(id) {
    const h = RECYCLING_HELPERS.find((x) => x.id === id);
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
      const h = RECYCLING_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    helperWagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: helperWagesPaid };
  }

  function helperBonus(skill) {
    return recyclingHelperBonus(helpers, skill);
  }

  function challenges() {
    return RECYCLING_CHALLENGES.map((ch) => recyclingChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = RECYCLING_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = recyclingChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return RECYCLING_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function meltDown(materialId, qty) {
    const m = RECYCLING_MATERIALS.find((x) => x.id === materialId);
    if (!m) return { ok: false, reason: 'no-such-material' };
    if (m.bin !== 'metal') return { ok: false, reason: 'not-metal' };
    if (!system.state.upgrades.includes('crusher')) return { ok: false, reason: 'need-crusher' };
    const have = system.state.sorted[materialId] || 0;
    if (have < qty || qty <= 0) return { ok: false, reason: 'not-enough', have };
    system.state.sorted[materialId] -= qty;
    const ingots = Math.floor(qty / 5);
    const value = ingots * Math.round(m.basePrice * 6);
    return { ok: true, ingots, value, material: materialId };
  }

  function sellIngots(materialId, ingots) {
    const m = RECYCLING_MATERIALS.find((x) => x.id === materialId);
    if (!m || m.bin !== 'metal') return { ok: false, reason: 'not-metal' };
    if (ingots <= 0) return { ok: false, reason: 'bad-qty' };
    const value = ingots * Math.round(m.basePrice * 6);
    return { ok: true, value, ingots };
  }

  function donateToCoop(materialId, qty) {
    const have = system.state.sorted[materialId] || 0;
    if (have < qty || qty <= 0) return { ok: false, reason: 'not-enough', have };
    system.state.sorted[materialId] -= qty;
    const rep = Math.floor(qty / 10);
    return { ok: true, qty, rep, note: 'The co-op thanks you. GreenLoop remembers.' };
  }

  function sortAll() {
    let sorted = 0;
    let mistakes = 0;
    for (const m of RECYCLING_MATERIALS) {
      const qty = system.state.unsorted[m.id] || 0;
      if (qty <= 0) continue;
      system.state.unsorted[m.id] = 0;
      system.state.carryKg = Math.max(0, system.state.carryKg - qty * m.weight);
      system.state.sorted[m.id] += qty;
      system.state.unitsSorted += qty;
      sorted += qty;
      void mistakes;
    }
    system.state.sortStreak += 1;
    return { ok: true, sorted };
  }

  function weighIn() {
    const total = Math.round(system.state.carryKg * 10) / 10;
    const cap = recyclingCarryCap(system.state.upgrades);
    return { carryKg: total, cap, free: Math.round((cap - system.state.carryKg) * 10) / 10 };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, meltDown, sellIngots, donateToCoop,
    sortAll, weighIn,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return helperWagesPaid; },
  };
}

export const RECYCLING_MARKET_EVENTS = [
  { id: 'metal-boom', name: 'Metal Boom', materials: ['aluminium', 'copper', 'steel', 'brass'], mult: 1.4, desc: 'Construction surge — metal pays 40% more.' },
  { id: 'plastic-glut', name: 'Plastic Glut', materials: ['plastic'], mult: 0.6, desc: 'Too much plastic — prices crash.' },
  { id: 'ewaste-rush', name: 'E-Waste Rush', materials: ['ewaste', 'batteries'], mult: 1.5, desc: 'A chip shortage makes old boards gold.' },
  { id: 'glass-drive', name: 'Glass Drive', materials: ['glass'], mult: 1.3, desc: 'The bottle bill passes — glass pays more.' },
  { id: 'paper-shortage', name: 'Paper Shortage', materials: ['paper'], mult: 1.35, desc: 'Cardboard is scarce this week.' },
  { id: 'tire-recall', name: 'Tire Recall', materials: ['tires'], mult: 1.3, desc: 'A recall floods the market with old tires.' },
  { id: 'textile-week', name: 'Textile Week', materials: ['textiles'], mult: 1.25, desc: 'Fashion week leftovers flood the bins.' },
  { id: 'furniture-fair', name: 'Furniture Fair', materials: ['furniture'], mult: 1.3, desc: 'Everyone renovates at once.' },
  { id: 'copper-theft', name: 'Copper Crackdown', materials: ['copper'], mult: 0.7, desc: 'Police checks — buyers pay less for copper.' },
  { id: 'green-week', name: 'Green Week', materials: ['plastic', 'paper', 'glass'], mult: 1.2, desc: 'The city celebrates recycling.' },
  { id: 'scrap-crash', name: 'Scrap Crash', materials: ['steel', 'aluminium'], mult: 0.75, desc: 'Global prices dip hard.' },
  { id: 'battery-boom', name: 'Battery Boom', materials: ['batteries'], mult: 1.6, desc: 'EV factories need lithium — old cells pay.' },
];

export const RECYCLING_SEASONS = [
  { id: 'spring-clean', name: 'Spring Clean', mult: 1.2, desc: 'Everyone clears the garage. Piles everywhere.' },
  { id: 'summer', name: 'Summer', mult: 1.0, desc: 'Festival litter, steady work.' },
  { id: 'autumn', name: 'Autumn Clearout', mult: 1.1, desc: 'Students move out, furniture floods the kerbs.' },
  { id: 'winter', name: 'Winter', mult: 0.85, desc: 'Cold, quiet, fewer piles.' },
];

export function recyclingEventMult(eventId, materialId) {
  const ev = RECYCLING_MARKET_EVENTS.find((x) => x.id === eventId);
  if (!ev) return 1;
  return ev.materials.includes(materialId) ? ev.mult : 1;
}

export function recyclingSeasonMult(seasonId) {
  const s = RECYCLING_SEASONS.find((x) => x.id === seasonId);
  return s ? s.mult : 1;
}

export function recyclingEventFor(day) {
  return RECYCLING_MARKET_EVENTS[day % RECYCLING_MARKET_EVENTS.length];
}

export function createRecyclingMarket(system) {
  let currentEvent = null;
  let currentSeason = 'summer';
  let dealsClaimed = 0;
  let bulkSold = 0;

  function setEvent(eventId) {
    const ev = RECYCLING_MARKET_EVENTS.find((x) => x.id === eventId);
    if (!ev) return { ok: false, reason: 'no-such-event' };
    currentEvent = eventId;
    return { ok: true, event: eventId, name: ev.name };
  }

  function setSeason(seasonId) {
    const s = RECYCLING_SEASONS.find((x) => x.id === seasonId);
    if (!s) return { ok: false, reason: 'no-such-season' };
    currentSeason = seasonId;
    return { ok: true, season: seasonId };
  }

  function eventPrice(materialId, basePrice) {
    let price = basePrice;
    price *= recyclingEventMult(currentEvent, materialId);
    price *= recyclingSeasonMult(currentSeason);
    return Math.round(price * 10) / 10;
  }

  function bulkDeal(materialId, qty) {
    const have = system.state.sorted[materialId] || 0;
    if (have < qty || qty < 20) return { ok: false, reason: 'need-20-plus', have };
    const m = RECYCLING_MATERIALS.find((x) => x.id === materialId);
    const unit = recyclingPriceFor(materialId, system.state.dayDrift, system.state.rank, system.state.upgrades);
    const total = Math.round(eventPrice(materialId, unit) * qty * 1.1 * 10) / 10;
    system.state.sorted[materialId] -= qty;
    system.state.unitsSold += qty;
    system.state.earned += total;
    bulkSold += qty;
    dealsClaimed += 1;
    return { ok: true, total, qty, bonus: 'bulk +10%' };
  }

  function dailyDeals() {
    const deals = [];
    for (const m of RECYCLING_MATERIALS) {
      const mult = recyclingEventMult(currentEvent, m.id);
      if (mult !== 1) {
        deals.push({ material: m.id, name: m.name, mult, event: currentEvent });
      }
    }
    return deals;
  }

  function marketSummary() {
    return {
      event: currentEvent,
      season: currentSeason,
      dealsClaimed,
      bulkSold,
      deals: dailyDeals(),
    };
  }

  return {
    setEvent, setSeason, eventPrice, bulkDeal, dailyDeals, marketSummary,
    get event() { return currentEvent; },
    get season() { return currentSeason; },
  };
}

export function recyclingRouteScore(routeId, pilesCleared, kg, mistakes) {
  const route = RECYCLING_ROUTES.find((r) => r.id === routeId);
  if (!route) return 0;
  const base = pilesCleared * 10 + Math.round(kg);
  const mult = route.mult;
  const penalty = mistakes * 5;
  return Math.max(0, Math.round(base * mult - penalty));
}

export function recyclingWeeklyGoal(routesRun, unitsSold, earned) {
  const goal = { routes: 5, units: 100, earned: 500 };
  return {
    routes: { have: routesRun, goal: goal.routes, done: routesRun >= goal.routes },
    units: { have: unitsSold, goal: goal.units, done: unitsSold >= goal.units },
    earned: { have: Math.round(earned), goal: goal.earned, done: earned >= goal.earned },
    allDone: routesRun >= goal.routes && unitsSold >= goal.units && earned >= goal.earned,
  };
}

export const RECYCLING_TIPS = [
  { id: 'sort-first', name: 'Sort First, Sell Later', text: 'Sorted bales pay more than mixed bags. Always.' },
  { id: 'metal-morning', name: 'Metal Mornings', text: 'Metal prices spike most mornings. Sell early.' },
  { id: 'gloves-matter', name: 'Gloves Matter', text: 'Broken glass is not a bonus. Buy gloves first.' },
  { id: 'copper-eyes', name: 'Copper Eyes', text: 'Learn the glint of copper wire. It pays for lunch.' },
  { id: 'route-rain', name: 'Rain Routes', text: 'After rain, the beach route is full of plastic.' },
  { id: 'contract-first', name: 'Contracts First', text: 'Take a contract, then route for its material.' },
  { id: 'treasure-alleys', name: 'Alley Treasures', text: 'Old Town alleys hide the best street treasure.' },
  { id: 'baler-late', name: 'Baler Late', text: 'Save the baler for last — it multiplies everything.' },
];

export const RECYCLING_LEADERBOARD = [
  { name: 'Marla', kg: 4200, desc: 'The yard owner. Untouchable.' },
  { name: 'Big Joe', kg: 3800, desc: 'Lifts more than he sorts.' },
  { name: 'Ria', kg: 0, desc: 'You. Climbing.' },
  { name: 'Old Marta', kg: 2900, desc: 'Forty years of sorting.' },
  { name: 'Rafi', kg: 1500, desc: 'Fast legs, faster hands.' },
];

export function recyclingTipFor(day) {
  return RECYCLING_TIPS[day % RECYCLING_TIPS.length];
}

export function recyclingLeaderboardWith(playerKg) {
  const board = RECYCLING_LEADERBOARD.map((e) => ({
    name: e.name, kg: e.name === 'Ria' ? playerKg : e.kg, desc: e.desc,
  }));
  board.sort((a, b) => b.kg - a.kg);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function recyclingDailyWage(routesRun, unitsSold) {
  return routesRun * 10 + Math.floor(unitsSold / 10) * 5;
}

export function recyclingBinFor(materialId) {
  const m = RECYCLING_MATERIALS.find((x) => x.id === materialId);
  if (!m) return null;
  return RECYCLING_BINS.find((b) => b.id === m.bin) || null;
}

export function recyclingMaterialByBin(binId) {
  return RECYCLING_MATERIALS.filter((m) => m.bin === binId).map((m) => m.id);
}

export function recyclingHazardPay(hazardsTaken) {
  return hazardsTaken * 5;
}

export function recyclingBestBuyer(materialId, dayDrift, rank, upgrades) {
  let best = null;
  let bestPrice = 0;
  for (const b of SCRAPYARD_BUYERS) {
    if (rank < b.minRep) continue;
    const price = recyclingBuyerPrice(materialId, b.id, dayDrift, rank, upgrades);
    if (price > bestPrice) { bestPrice = price; best = b.id; }
  }
  return best ? { buyer: best, price: bestPrice } : null;
}

export function recyclingSortQuiz(materialId, binId) {
  const m = RECYCLING_MATERIALS.find((x) => x.id === materialId);
  if (!m) return { correct: false, correctBin: null };
  return { correct: m.bin === binId, correctBin: m.bin };
}

export const RECYCLING_RECORDS = [
  { id: 'biggest-haul', name: 'Biggest Haul', stat: 'bestRouteKg', unit: 'kg', desc: 'Most kilos on one route.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'piles', desc: 'Longest clean sorting streak.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from scrap.' },
  { id: 'most-sorted', name: 'Most Sorted', stat: 'unitsSorted', unit: 'units', desc: 'Most units sorted.' },
  { id: 'treasure-king', name: 'Treasure King', stat: 'treasuresFound', unit: 'finds', desc: 'Most street treasures found.' },
];

export function recyclingRecordFor(recordId, state) {
  const r = RECYCLING_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function recyclingAllRecords(state) {
  return RECYCLING_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function recyclingEfficiency(unitsSorted, sortMistakes) {
  const total = unitsSorted + sortMistakes;
  if (total === 0) return 100;
  return Math.round((unitsSorted / total) * 100);
}

export function recyclingProfitPerHour(earned, routesRun) {
  if (routesRun === 0) return 0;
  return Math.round((earned / routesRun) * 10) / 10;
}

export function recyclingRouteGrade(pilesCleared, kg, mistakes) {
  const score = recyclingRouteScore('marina', pilesCleared, kg, mistakes);
  if (score >= 150) return 'S';
  if (score >= 100) return 'A';
  if (score >= 60) return 'B';
  if (score >= 30) return 'C';
  return 'D';
}

export const RECYCLING_SEASONAL_PRICES = [
  { season: 'spring-clean', material: 'furniture', mult: 1.3 },
  { season: 'spring-clean', material: 'textiles', mult: 1.2 },
  { season: 'summer', material: 'aluminium', mult: 1.15 },
  { season: 'summer', material: 'plastic', mult: 1.1 },
  { season: 'autumn', material: 'furniture', mult: 1.25 },
  { season: 'autumn', material: 'paper', mult: 1.15 },
  { season: 'winter', material: 'ewaste', mult: 1.2 },
  { season: 'winter', material: 'batteries', mult: 1.15 },
];

export function recyclingSeasonalPriceMult(seasonId, materialId) {
  const row = RECYCLING_SEASONAL_PRICES.find((x) => x.season === seasonId && x.material === materialId);
  return row ? row.mult : 1;
}

export function recyclingBestSeason(materialId) {
  let best = null;
  let bestMult = 0;
  for (const row of RECYCLING_SEASONAL_PRICES) {
    if (row.material === materialId && row.mult > bestMult) { bestMult = row.mult; best = row.season; }
  }
  return best ? { season: best, mult: bestMult } : null;
}

export function recyclingRouteEfficiency(pilesCleared, timeSpent) {
  if (timeSpent === 0) return 0;
  return Math.round((pilesCleared / timeSpent) * 100) / 100;
}

export function recyclingInventoryValue(sorted) {
  let total = 0;
  for (const [id, qty] of Object.entries(sorted)) {
    const m = RECYCLING_MATERIALS.find((x) => x.id === id);
    if (m) total += m.basePrice * qty;
  }
  return Math.round(total * 10) / 10;
}

export const RECYCLING_QUICK_START = [
  'Start a route in the morning, when piles are fresh.',
  'Sort everything before you sell anything.',
  'Buy gloves first, then the cart, then the magnet.',
  'Take contracts for materials you already collect.',
  'Sell metal to Big Joe, e-waste to Volt Recovery.',
  'Check the price board every morning.',
];

export function recyclingQuickStart(step) {
  return RECYCLING_QUICK_START[step] || null;
}

export function recyclingTotalValue(state) {
  const sorted = recyclingInventoryValue(state.sorted);
  const unsorted = recyclingInventoryValue(state.unsorted);
  return Math.round((sorted + unsorted) * 10) / 10;
}

export function recyclingProgressPercent(state) {
  const total = state.unitsSorted + state.unitsSold;
  if (total === 0) return 0;
  return Math.round((state.unitsSorted / total) * 100);
}

export function recyclingSummary(state) {
  return `Reclaim ${RECYCLING_RANKS[state.rank].name}: ${state.routesRun} routes, ${state.unitsSorted} sorted, $${Math.round(state.earned)} earned, ${state.treasuresFound} treasures.`;
}

export function recyclingNextGoal(state) {
  if (state.routesRun < 5) return 'Finish 5 routes.';
  if (state.unitsSorted < 100) return 'Sort 100 units.';
  if (state.rank < 2) return 'Reach rank Sort Master.';
  return 'Become the Reclaim King.';
}

export const RECYCLING_META = {
  system: 'recycling', version: '7b-B', author: 'builder-B',
  files: 1, lines: 1135, features: ['routes', 'sorting', 'sales', 'contracts', 'upgrades', 'treasures'],
};

export function recyclingMeta() {
  return { ...RECYCLING_META };
}
