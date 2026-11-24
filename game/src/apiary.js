// Solara Nights — Apiary / Honey & Hive (Round 7, written fresh).
// Ria keeps bees across Solara's meadows, orchards and rooftop gardens:
// place hives, tend the colonies through the seasons, harvest honey,
// wax and royal jelly, and sell to the market, the bakery and the
// apothecary. A strong queen makes a strong hive; mites, wasps and a
// cold snap can wipe a colony out overnight. Breed better bees, split
// strong hives, and chase the rare blossom flows — lavender, orange
// blossom and the fabled black mangrove honey that pays like gold.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const APIARY_HIVES = [
  { id: 'langstroth', name: 'Langstroth Hive', value: 60, honey: 8, wax: 2, capacity: 10, difficulty: 1, rarity: 0.3, desc: 'The classic box hive — reliable and easy.' },
  { id: 'topbar', name: 'Top-Bar Hive', value: 45, honey: 6, wax: 3, capacity: 8, difficulty: 1, rarity: 0.24, desc: 'A long low hive the bees love to build in.' },
  { id: 'warre', name: 'Warré Hive', value: 55, honey: 7, wax: 2, capacity: 9, difficulty: 2, rarity: 0.16, desc: 'Stacked boxes, hands-off, natural comb.' },
  { id: 'skep', name: 'Straw Skep', value: 25, honey: 4, wax: 1, capacity: 5, difficulty: 1, rarity: 0.2, desc: 'The old straw basket — charming, small yield.' },
  { id: 'flow', name: 'Flow Hive', value: 180, honey: 12, wax: 1, capacity: 12, difficulty: 2, rarity: 0.08, desc: 'Turn a tap and honey flows out. Modern magic.' },
  { id: 'observation', name: 'Observation Hive', value: 120, honey: 3, wax: 1, capacity: 4, difficulty: 3, rarity: 0.06, desc: 'Glass walls — visitors pay to watch the bees work.' },
  { id: 'nuc', name: 'Nucleus Hive', value: 40, honey: 2, wax: 1, capacity: 3, difficulty: 2, rarity: 0.18, desc: 'A small starter colony, perfect for splits.' },
  { id: 'rooftop', name: 'Rooftop Hive', value: 90, honey: 9, wax: 2, capacity: 8, difficulty: 2, rarity: 0.1, desc: 'City bees on a sunny roof — strong flow.' },
  { id: 'mangrove', name: 'Mangrove Hive', value: 220, honey: 14, wax: 3, capacity: 12, difficulty: 4, rarity: 0.03, desc: 'Black mangrove honey — dark, rare, priceless.' },
  { id: 'orchard', name: 'Orchard Hive', value: 75, honey: 10, wax: 2, capacity: 9, difficulty: 1, rarity: 0.14, desc: 'Set among the apple rows at blossom time.' },
];

export const APIARY_FLOWERS = [
  { id: 'clover', name: 'Clover Meadow', nectar: 1.0, season: 'spring', desc: 'Sweet white clover, the classic honey.' },
  { id: 'lavender', name: 'Lavender Field', nectar: 1.4, season: 'summer', desc: 'Purple rows that hum with bees.' },
  { id: 'orange', name: 'Orange Grove', nectar: 1.5, season: 'spring', desc: 'Citrus blossom — bright, floral honey.' },
  { id: 'acacia', name: 'Acacia Stand', nectar: 1.3, season: 'summer', desc: 'Pale, clear honey that never crystallises.' },
  { id: 'sunflower', name: 'Sunflower Field', nectar: 1.2, season: 'summer', desc: 'Golden giants, golden honey.' },
  { id: 'buckwheat', name: 'Buckwheat Field', nectar: 1.1, season: 'autumn', desc: 'Dark, malty honey for the bakery.' },
  { id: 'mangrove', name: 'Mangrove Bloom', nectar: 2.0, season: 'autumn', desc: 'The rarest flow in Solara.' },
  { id: 'wildflower', name: 'Wildflower Bank', nectar: 1.0, season: 'all', desc: 'A little of everything, all year.' },
];

export const APIARY_BUYERS = [
  { id: 'market', name: 'Market Stall', mult: 1.0, likes: ['honey'], dislikes: [], mood: 'steady', minRank: 0, desc: 'Jars on the stall, cash in hand.' },
  { id: 'bakery', name: 'Bakery Rosa', mult: 1.2, likes: ['honey', 'wax'], dislikes: [], mood: 'steady', minRank: 0, desc: 'Bakes with your honey every morning.' },
  { id: 'apothecary', name: 'Apothecary Venn', mult: 1.5, likes: ['jelly', 'propolis'], dislikes: ['honey'], mood: 'fancy', minRank: 2, desc: 'Royal jelly and propolis for medicine.' },
  { id: 'candle', name: 'Candle Maker', mult: 1.3, likes: ['wax'], dislikes: ['honey'], mood: 'steady', minRank: 1, desc: 'Pure beeswax candles, top price.' },
  { id: 'exporter', name: 'Honey Exporter', mult: 1.4, likes: ['rare'], dislikes: [], mood: 'odd', minRank: 3, desc: 'Ships Solara honey overseas for big money.' },
];

export const APIARY_UPGRADES = [
  { id: 'veil', name: 'Bee Veil', cost: 50, desc: 'No more stings: sting chance halved.', effect: 'veil' },
  { id: 'smoker', name: 'Bee Smoker', cost: 90, desc: 'Calm bees: harvests are 25% bigger.', effect: 'smoker' },
  { id: 'queen', name: 'Pedigree Queen', cost: 200, desc: 'Strong queens: colonies grow twice as fast.', effect: 'queen' },
  { id: 'extractor', name: 'Honey Extractor', cost: 320, desc: 'Spin comb clean: +30% honey per harvest.', effect: 'extractor' },
  { id: 'mite', name: 'Mite Treatment', cost: 180, desc: 'Mite outbreaks cut by two thirds.', effect: 'mite' },
  { id: 'frames', name: 'Extra Frames', cost: 260, desc: 'More comb space: +2 capacity per hive.', effect: 'frames' },
  { id: 'apiary', name: 'Apiary Shed', cost: 600, desc: 'Winter shelter: colonies survive the cold.', effect: 'shed' },
  { id: 'breeder', name: 'Queen Breeder', cost: 900, desc: 'Raise your own queens: splits are free.', effect: 'breeder' },
];

export const APIARY_RANKS = [
  { level: 0, name: 'Bee Friend', xp: 0, perk: 'Base prices, base yield.' },
  { level: 1, name: 'Beekeeper', xp: 120, perk: '+10% sale prices.' },
  { level: 2, name: 'Apiarist', xp: 300, perk: '+10% honey yield.' },
  { level: 3, name: 'Honey Master', xp: 620, perk: '+20% sale prices, the apothecary buys.' },
  { level: 4, name: 'Queen of Bees', xp: 1100, perk: '+30% sale prices, rare honey doubled.' },
];

export const APIARY_PRODUCTS = [
  { id: 'honey', name: 'Honey Jar', value: 8, desc: 'A golden jar of Solara honey.' },
  { id: 'wax', name: 'Beeswax Block', value: 12, desc: 'Clean yellow wax for candles.' },
  { id: 'jelly', name: 'Royal Jelly', value: 45, desc: 'A tiny pot of precious jelly.' },
  { id: 'propolis', name: 'Propolis Tincture', value: 30, desc: 'Sticky bee glue, bottled for medicine.' },
  { id: 'comb', name: 'Honeycomb Section', value: 20, desc: 'Comb still in the frame, ready to eat.' },
  { id: 'mead', name: 'Mead Bottle', value: 60, desc: 'Fermented honey wine, aged a season.' },
];

export const APIARY_EVENTS = [
  { id: 'blossom', name: 'Blossom Rush', mult: 1.5, flowers: ['orange', 'lavender', 'clover'], desc: 'Every flower opens at once — the bees go wild.' },
  { id: 'swarm', name: 'Swarm Season', mult: 1.3, flowers: [], desc: 'Swarms everywhere — catch one and gain a hive.' },
  { id: 'mite-outbreak', name: 'Mite Outbreak', mult: 0.7, flowers: [], desc: 'Mites spread through the apiary.' },
  { id: 'wasp-attack', name: 'Wasp Attack', mult: 0.75, flowers: [], desc: 'Wasps raid the hives — defend them.' },
  { id: 'cold-snap', name: 'Cold Snap', mult: 0.6, flowers: [], desc: 'A sudden frost kills the blossom.' },
  { id: 'mangrove-bloom', name: 'Mangrove Bloom', mult: 2.0, flowers: ['mangrove'], desc: 'The black mangrove flowers — once a year.' },
];

export const APIARY_CONTRACTS = [
  { id: 'honey-20', name: 'Honey Order', product: 'honey', qty: 20, pay: 240, days: 2, rep: 0, desc: 'The market needs twenty jars.' },
  { id: 'wax-10', name: 'Wax Order', product: 'wax', qty: 10, pay: 220, days: 2, rep: 1, desc: 'The candle maker needs ten wax blocks.' },
  { id: 'jelly-4', name: 'Jelly Call', product: 'jelly', qty: 4, pay: 320, days: 3, rep: 2, desc: 'The apothecary wants four pots of jelly.' },
  { id: 'mead-6', name: 'Mead Run', product: 'mead', qty: 6, pay: 480, days: 3, rep: 2, desc: 'The tavern orders six bottles of mead.' },
  { id: 'comb-12', name: 'Comb Order', product: 'comb', qty: 12, pay: 360, days: 2, rep: 1, desc: 'A chef wants twelve comb sections.' },
  { id: 'mangrove-5', name: 'Black Honey', product: 'honey', qty: 5, pay: 600, days: 3, rep: 3, desc: 'Five jars of black mangrove honey.' },
];

export const APIARY_PESTS = [
  { id: 'mite', name: 'Varroa Mite', chance: 0.08, damage: 1, desc: 'Tiny mites weaken the colony.' },
  { id: 'wasp', name: 'Wasp Raid', chance: 0.05, damage: 2, desc: 'Wasps steal honey and kill bees.' },
  { id: 'moth', name: 'Wax Moth', chance: 0.06, damage: 1, desc: 'Moths eat the comb from inside.' },
  { id: 'bear', name: 'Honey Bear', chance: 0.02, damage: 3, desc: 'A bear smashes a hive for the honey.' },
  { id: 'foulbrood', name: 'Foulbrood', chance: 0.03, damage: 2, desc: 'A brood disease — burn the frames.' },
];

export function apiaryRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < APIARY_RANKS.length; i++) {
    if (xp >= APIARY_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function apiaryPriceFor(product, rank, upgrades) {
  let price = product.value;
  price *= 1 + rank * 0.1;
  if (upgrades.includes('extractor') && product.id === 'honey') price *= 1.1;
  return Math.max(1, Math.round(price));
}

export function apiaryBuyerPrice(product, buyerId, rank, upgrades) {
  const buyer = APIARY_BUYERS.find((b) => b.id === buyerId);
  if (!buyer) return 0;
  let mult = buyer.mult;
  if (buyer.likes.includes(product.id)) mult += 0.2;
  if (product.id === 'jelly' && buyer.likes.includes('rare')) mult += 0.2;
  return Math.max(1, Math.round(apiaryPriceFor(product, rank, upgrades) * mult));
}

export function apiaryHiveCapacity(hive, upgrades) {
  let cap = hive.capacity;
  if (upgrades.includes('frames')) cap += 2;
  return cap;
}

export function createApiarySystem(ctx) {
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
    hives: [],
    hiveCount: 0,
    harvests: 0,
    honeyMade: 0,
    waxMade: 0,
    jellyMade: 0,
    earned: 0,
    spent: 0,
    stings: 0,
    coloniesLost: 0,
    swarmsCaught: 0,
    splits: 0,
    products: {},
    upgrades: [],
    lastDay: 1,
    activeContract: null,
    contractProgress: 0,
    contractsDone: 0,
    contractsFailed: 0,
    bestHive: null,
    bestYield: 0,
    dailyHoney: 0,
    dailyEarned: 0,
    currentEvent: null,
    flower: 'wildflower',
    queens: 0,
    meadMade: 0,
  };
  for (const p of APIARY_PRODUCTS) state.products[p.id] = 0;

  function refreshRank() {
    const r = apiaryRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Apiary rank up: ${APIARY_RANKS[r].name} — ${APIARY_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function flowerNectar() {
    const f = APIARY_FLOWERS.find((x) => x.id === state.flower);
    let n = f ? f.nectar : 1;
    if (state.currentEvent) {
      const ev = APIARY_EVENTS.find((e) => e.id === state.currentEvent);
      if (ev && ev.flowers.includes(state.flower)) n *= ev.mult;
    }
    return n;
  }

  function placeHive(hiveId) {
    const hive = APIARY_HIVES.find((h) => h.id === hiveId);
    if (!hive) return { ok: false, reason: 'no-such-hive' };
    if (state.hives.length >= 12) return { ok: false, reason: 'apiary-full' };
    if (getCash() < hive.value) return { ok: false, reason: 'not-enough-cash', cost: hive.value };
    addCash(-hive.value);
    state.spent += hive.value;
    const colony = {
      id: `${hiveId}-${state.hiveCount + 1}`,
      type: hiveId,
      strength: 5,
      honey: 0,
      wax: 0,
      queen: true,
      health: 100,
      age: 0,
      flower: state.flower,
    };
    state.hives.push(colony);
    state.hiveCount += 1;
    state.queens += 1;
    gainXp(15);
    log(`Placed a ${hive.name} in the apiary — the bees settle in.`);
    return { ok: true, hive: colony.id, type: hiveId };
  }

  function tendHive(hiveId) {
    const colony = state.hives.find((h) => h.id === hiveId);
    if (!colony) return { ok: false, reason: 'no-such-hive' };
    colony.health = Math.min(100, colony.health + 15);
    colony.strength = Math.min(10, colony.strength + 1);
    if (rng() < (state.upgrades.includes('veil') ? 0.05 : 0.15)) {
      state.stings += 1;
      log('Ouch — a guard bee stings your wrist.');
    }
    gainXp(5);
    log(`Tended ${colony.id} — health ${colony.health}, strength ${colony.strength}.`);
    return { ok: true, health: colony.health, strength: colony.strength };
  }

  function feedHive(hiveId) {
    const colony = state.hives.find((h) => h.id === hiveId);
    if (!colony) return { ok: false, reason: 'no-such-hive' };
    const cost = 10;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    colony.strength = Math.min(10, colony.strength + 2);
    colony.health = Math.min(100, colony.health + 10);
    gainXp(4);
    log(`Fed ${colony.id} sugar syrup — the bees hum louder.`);
    return { ok: true, strength: colony.strength };
  }

  function harvestHive(hiveId) {
    const colony = state.hives.find((h) => h.id === hiveId);
    if (!colony) return { ok: false, reason: 'no-such-hive' };
    if (colony.honey < 2) return { ok: false, reason: 'not-ready', honey: colony.honey };
    const hive = APIARY_HIVES.find((x) => x.id === colony.type);
    let honey = colony.honey;
    if (state.upgrades.includes('smoker')) honey = Math.round(honey * 1.25);
    if (state.upgrades.includes('extractor')) honey = Math.round(honey * 1.3);
    const wax = colony.wax;
    colony.honey = 0;
    colony.wax = 0;
    state.products.honey += honey;
    state.products.wax += wax;
    state.honeyMade += honey;
    state.waxMade += wax;
    state.dailyHoney += honey;
    state.harvests += 1;
    if (honey > state.bestYield) { state.bestYield = honey; state.bestHive = colony.id; }
    if (rng() < (state.upgrades.includes('veil') ? 0.05 : 0.2)) {
      state.stings += 1;
      log('The bees object to the harvest — one sting for your trouble.');
    }
    gainXp(8 + honey);
    log(`Harvested ${colony.id}: +${honey} honey, +${wax} wax.`);
    return { ok: true, honey, wax, hive: colony.id };
  }

  function harvestAll() {
    let honey = 0;
    let wax = 0;
    let count = 0;
    for (const colony of state.hives) {
      if (colony.honey < 2) continue;
      const r = harvestHive(colony.id);
      if (r.ok) { honey += r.honey; wax += r.wax; count += 1; }
    }
    if (count === 0) return { ok: false, reason: 'nothing-ready' };
    return { ok: true, hives: count, honey, wax };
  }

  function splitHive(hiveId) {
    const colony = state.hives.find((h) => h.id === hiveId);
    if (!colony) return { ok: false, reason: 'no-such-hive' };
    if (colony.strength < 8) return { ok: false, reason: 'too-weak', strength: colony.strength };
    if (state.hives.length >= 12) return { ok: false, reason: 'apiary-full' };
    const cost = state.upgrades.includes('breeder') ? 0 : 40;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    colony.strength = 5;
    const child = {
      id: `${colony.type}-${state.hiveCount + 1}`,
      type: colony.type,
      strength: 5,
      honey: 0,
      wax: 0,
      queen: true,
      health: 90,
      age: 0,
      flower: state.flower,
    };
    state.hives.push(child);
    state.hiveCount += 1;
    state.queens += 1;
    state.splits += 1;
    gainXp(25);
    log(`Split ${colony.id} — a new colony, ${child.id}, starts life.`);
    return { ok: true, newHive: child.id, cost };
  }

  function catchSwarm() {
    if (state.currentEvent !== 'swarm') return { ok: false, reason: 'no-swarm' };
    if (state.hives.length >= 12) return { ok: false, reason: 'apiary-full' };
    const colony = {
      id: `skep-${state.hiveCount + 1}`,
      type: 'skep',
      strength: 4,
      honey: 0,
      wax: 0,
      queen: true,
      health: 80,
      age: 0,
      flower: state.flower,
    };
    state.hives.push(colony);
    state.hiveCount += 1;
    state.queens += 1;
    state.swarmsCaught += 1;
    gainXp(30);
    log(`Caught a wild swarm! A new skep colony joins the apiary.`);
    return { ok: true, hive: colony.id };
  }

  function makeJelly(hiveId) {
    const colony = state.hives.find((h) => h.id === hiveId);
    if (!colony) return { ok: false, reason: 'no-such-hive' };
    if (colony.strength < 7) return { ok: false, reason: 'too-weak', strength: colony.strength };
    const qty = 1 + Math.floor(rng() * 2);
    state.products.jelly += qty;
    state.jellyMade += qty;
    colony.strength -= 1;
    gainXp(10);
    log(`Collected ${qty} royal jelly from ${colony.id}.`);
    return { ok: true, qty };
  }

  function makePropolis() {
    let total = 0;
    for (const colony of state.hives) {
      if (colony.strength >= 6) total += 1;
    }
    if (total === 0) return { ok: false, reason: 'no-strong-hives' };
    state.products.propolis += total;
    gainXp(total * 3);
    log(`Scraped ${total} propolis from the hive entrances.`);
    return { ok: true, qty: total };
  }

  function makeComb() {
    let made = 0;
    for (const colony of state.hives) {
      if (colony.honey >= 4) {
        colony.honey -= 2;
        state.products.comb += 1;
        state.products.honey = Math.max(0, state.products.honey - 0);
        made += 1;
      }
    }
    if (made === 0) return { ok: false, reason: 'not-enough-honey' };
    gainXp(made * 4);
    log(`Cut ${made} honeycomb sections.`);
    return { ok: true, qty: made };
  }

  function makeMead(qty) {
    const need = qty * 3;
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    if ((state.products.honey || 0) < need) return { ok: false, reason: 'not-enough-honey', have: state.products.honey, need };
    state.products.honey -= need;
    state.products.mead += qty;
    state.meadMade += qty;
    gainXp(qty * 8);
    log(`Brewed ${qty} bottles of mead — they need a season to age.`);
    return { ok: true, qty };
  }

  function sellProduct(buyerId, productId, qty) {
    const buyer = APIARY_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    if (state.rank < buyer.minRank) return { ok: false, reason: 'rank-too-low', need: buyer.minRank };
    const product = APIARY_PRODUCTS.find((p) => p.id === productId);
    if (!product) return { ok: false, reason: 'no-such-product' };
    const have = state.products[productId] || 0;
    if (qty <= 0 || have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = apiaryBuyerPrice(product, buyerId, state.rank, state.upgrades);
    const total = unit * qty;
    state.products[productId] -= qty;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(qty * 2);
    if (state.activeContract) checkContract(productId, qty);
    log(`Sold ${qty}x ${product.name} to ${buyer.name} for $${total}.`);
    return { ok: true, total, unit, qty };
  }

  function sellAll(buyerId) {
    const buyer = APIARY_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    let total = 0;
    let units = 0;
    const lines = [];
    for (const p of APIARY_PRODUCTS) {
      const q = state.products[p.id] || 0;
      if (q <= 0) continue;
      const unit = apiaryBuyerPrice(p, buyerId, state.rank, state.upgrades);
      const line = unit * q;
      total += line; units += q;
      lines.push({ id: p.id, qty: q, total: line });
      state.products[p.id] = 0;
    }
    if (units === 0) return { ok: false, reason: 'nothing-to-sell' };
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(units);
    log(`Sold the whole honey store to ${buyer.name} for $${total}.`);
    return { ok: true, total, units, lines };
  }

  function setFlower(flowerId) {
    const f = APIARY_FLOWERS.find((x) => x.id === flowerId);
    if (!f) return { ok: false, reason: 'no-such-flower' };
    state.flower = flowerId;
    for (const colony of state.hives) colony.flower = flowerId;
    log(`Hives moved to the ${f.name} — nectar ${f.nectar}x.`);
    return { ok: true, flower: flowerId };
  }

  function buyUpgrade(id) {
    const u = APIARY_UPGRADES.find((x) => x.id === id);
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
    const ct = APIARY_CONTRACTS.find((x) => x.id === id);
    if (!ct) return { ok: false, reason: 'no-such-contract' };
    if (state.activeContract) return { ok: false, reason: 'contract-active' };
    if (state.rank < ct.rep) return { ok: false, reason: 'rep-too-low', need: ct.rep };
    state.activeContract = { ...ct, dayTaken: getDay(), deadlineDay: getDay() + ct.days };
    state.contractProgress = 0;
    log(`Contract taken: ${ct.name} — ${ct.qty}x ${ct.product} by day ${state.activeContract.deadlineDay}.`);
    return { ok: true, contract: state.activeContract };
  }

  function checkContract(productId, qty) {
    const ct = state.activeContract;
    if (!ct || ct.product !== productId) return;
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
    if (state.contractProgress < ct.qty) return { ok: false, reason: 'not-enough', have: state.contractProgress, need: ct.qty };
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
    log('Contract abandoned — the buyer will remember that.');
    return { ok: true };
  }

  function priceBoard() {
    return APIARY_PRODUCTS.map((p) => ({
      id: p.id, name: p.name,
      price: apiaryPriceFor(p, state.rank, state.upgrades),
      stock: state.products[p.id],
    }));
  }

  function hiveReport() {
    return state.hives.map((colony) => {
      const hive = APIARY_HIVES.find((h) => h.id === colony.type);
      return {
        id: colony.id, type: colony.type, name: hive ? hive.name : colony.type,
        strength: colony.strength, honey: colony.honey, wax: colony.wax,
        health: colony.health, queen: colony.queen, flower: colony.flower,
      };
    });
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.2) {
      const ev = APIARY_EVENTS[Math.floor(rng() * APIARY_EVENTS.length)];
      state.currentEvent = ev.id;
      log(`Apiary news: ${ev.name} — ${ev.desc}`);
      return { event: ev.id, name: ev.name };
    }
    if (roll < 0.3) {
      state.products.honey += 3;
      state.honeyMade += 3;
      log('A neighbour beekeeper gifts you 3 jars of honey.');
      return { event: 'gift' };
    }
    state.currentEvent = null;
    return { event: 'none' };
  }

  function tick(dt) {
    const nectar = flowerNectar();
    for (const colony of state.hives) {
      if (colony.health <= 0) continue;
      const rate = (colony.strength / 10) * nectar * dt * 0.05;
      const hive = APIARY_HIVES.find((h) => h.id === colony.type);
      const cap = apiaryHiveCapacity(hive, state.upgrades);
      colony.honey = Math.min(cap * 2, colony.honey + rate);
      colony.wax = Math.min(cap, colony.wax + rate * 0.2);
      colony.age += dt * 0.001;
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyHoney = 0;
    state.dailyEarned = 0;
    if (state.activeContract && day >= state.activeContract.deadlineDay && state.contractProgress < state.activeContract.qty) {
      log(`Contract ${state.activeContract.name} expired — the buyer walked away.`);
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractsFailed += 1;
    }
    const survivors = [];
    for (const colony of state.hives) {
      colony.age += 1;
      const growth = state.upgrades.includes('queen') ? 2 : 1;
      colony.strength = Math.min(10, colony.strength + growth * 0.2);
      if (state.currentEvent === 'mite-outbreak' && rng() < (state.upgrades.includes('mite') ? 0.1 : 0.3)) {
        colony.health -= 30;
        log(`Mites hit ${colony.id} — health ${colony.health}.`);
      }
      if (state.currentEvent === 'wasp-attack' && rng() < 0.2) {
        colony.health -= 20;
        colony.honey = Math.max(0, colony.honey - 2);
        log(`Wasps raided ${colony.id} — honey stolen.`);
      }
      if (state.currentEvent === 'cold-snap' && !state.upgrades.includes('shed') && rng() < 0.25) {
        colony.health -= 25;
        log(`Cold snap chills ${colony.id} — health ${colony.health}.`);
      }
      if (colony.health <= 0) {
        state.coloniesLost += 1;
        log(`Colony ${colony.id} has died. A sad, silent hive.`);
        continue;
      }
      survivors.push(colony);
    }
    state.hives = survivors;
    dailyEvent();
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, hives: state.hives, hiveCount: state.hiveCount,
      harvests: state.harvests, honeyMade: state.honeyMade, waxMade: state.waxMade,
      jellyMade: state.jellyMade, earned: state.earned, spent: state.spent,
      stings: state.stings, coloniesLost: state.coloniesLost,
      swarmsCaught: state.swarmsCaught, splits: state.splits,
      products: state.products, upgrades: state.upgrades, lastDay: state.lastDay,
      activeContract: state.activeContract, contractProgress: state.contractProgress,
      contractsDone: state.contractsDone, contractsFailed: state.contractsFailed,
      bestHive: state.bestHive, bestYield: state.bestYield,
      dailyHoney: state.dailyHoney, dailyEarned: state.dailyEarned,
      currentEvent: state.currentEvent, flower: state.flower,
      queens: state.queens, meadMade: state.meadMade,
    }));
  }

  function deserialize(d) {
    if (!d || typeof d !== 'object') return;
    for (const k of Object.keys(state)) {
      if (d[k] !== undefined) state[k] = d[k];
    }
    for (const p of APIARY_PRODUCTS) {
      if (state.products[p.id] === undefined) state.products[p.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: APIARY_RANKS[state.rank].name,
      xp: state.xp,
      hives: state.hives.length,
      hiveCount: state.hiveCount,
      harvests: state.harvests,
      honeyMade: Math.round(state.honeyMade * 10) / 10,
      waxMade: Math.round(state.waxMade * 10) / 10,
      jellyMade: state.jellyMade,
      meadMade: state.meadMade,
      earned: Math.round(state.earned),
      spent: state.spent,
      stings: state.stings,
      coloniesLost: state.coloniesLost,
      swarmsCaught: state.swarmsCaught,
      splits: state.splits,
      upgrades: state.upgrades.length,
      activeContract: state.activeContract ? state.activeContract.id : null,
      contractsDone: state.contractsDone,
      contractsFailed: state.contractsFailed,
      bestHive: state.bestHive,
      bestYield: Math.round(state.bestYield * 10) / 10,
      dailyHoney: Math.round(state.dailyHoney * 10) / 10,
      dailyEarned: Math.round(state.dailyEarned),
      flower: state.flower,
      event: state.currentEvent,
    };
  }

  function hudLine() {
    const ready = state.hives.filter((h) => h.honey >= 2).length;
    if (ready > 0) return `Apiary: ${ready} hive${ready > 1 ? 's' : ''} ready to harvest`;
    if (state.hives.length > 0) return `Apiary: ${state.hives.length} hives working the ${state.flower} flow`;
    if (state.activeContract) return `Apiary: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearMeadow = Math.hypot(pos.x - 480, pos.z - 260) < 40;
    if (!nearMeadow) return false;
    if (state.hives.length === 0) { placeHive('langstroth'); return true; }
    const ready = state.hives.find((h) => h.honey >= 2);
    if (ready) { harvestHive(ready.id); return true; }
    tendHive(state.hives[0].id);
    return true;
  }

  return {
    state, placeHive, tendHive, feedHive, harvestHive, harvestAll,
    splitHive, catchSwarm, makeJelly, makePropolis, makeComb, makeMead,
    sellProduct, sellAll, setFlower, buyUpgrade, takeContract,
    deliverContract, abandonContract, priceBoard, hiveReport, dailyEvent,
    tick, tickDay, serialize, deserialize, stats, hudLine, interact,
  };
}

export const APIARY_HELPERS = [
  { id: 'mentor', name: 'Old Beekeeper Hana', wage: 30, skill: 'tend', bonus: 0.25, desc: 'Forty seasons: colonies grow 25% faster.' },
  { id: 'smoker-hand', name: 'Smoker Sam', wage: 35, skill: 'harvest', bonus: 0.2, desc: 'Calm hands: +20% harvest yield.' },
  { id: 'queen-breeder', name: 'Breeder Luz', wage: 60, skill: 'queen', bonus: 0.5, desc: 'Raises queens: splits always succeed.' },
  { id: 'seller', name: 'Market Maya', wage: 45, skill: 'sell', bonus: 0.15, desc: 'Sells sweet: +15% sale prices.' },
];

export const APIARY_CHALLENGES = [
  { id: 'hives-5', name: 'Five Hives', target: 'hiveCount', goal: 5, xp: 80, desc: 'Place 5 hives in total.' },
  { id: 'honey-100', name: 'Hundred Jars', target: 'honeyMade', goal: 100, xp: 100, desc: 'Make 100 honey in total.' },
  { id: 'harvests-20', name: 'Busy Hands', target: 'harvests', goal: 20, xp: 100, desc: 'Harvest 20 times.' },
  { id: 'earn-1000', name: 'Sweet Purse', target: 'earned', goal: 1000, xp: 120, desc: 'Earn $1,000 from the apiary.' },
  { id: 'splits-3', name: 'Growing Family', target: 'splits', goal: 3, xp: 120, desc: 'Split 3 colonies.' },
  { id: 'swarms-2', name: 'Swarm Catcher', target: 'swarmsCaught', goal: 2, xp: 150, desc: 'Catch 2 wild swarms.' },
  { id: 'mead-10', name: 'Mead Maker', target: 'meadMade', goal: 10, xp: 140, desc: 'Brew 10 bottles of mead.' },
  { id: 'contracts-5', name: 'Reliable Keeper', target: 'contractsDone', goal: 5, xp: 140, desc: 'Complete 5 apiary contracts.' },
];

export const APIARY_ACHIEVEMENTS = [
  { id: 'first-hive', name: 'First Hive', check: (s) => s.hiveCount >= 1, desc: 'Place your first hive.' },
  { id: 'first-harvest', name: 'First Harvest', check: (s) => s.harvests >= 1, desc: 'Harvest your first honey.' },
  { id: 'first-mead', name: 'First Mead', check: (s) => s.meadMade >= 1, desc: 'Brew your first mead.' },
  { id: 'rank-3', name: 'Honey Master', check: (s) => s.rank >= 3, desc: 'Reach rank Honey Master.' },
  { id: 'rich-keeper', name: 'Rich Keeper', check: (s) => s.earned >= 3000, desc: 'Earn $3,000 from the apiary.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every apiary upgrade.' },
  { id: 'no-loss', name: 'Keeper’s Luck', check: (s) => s.hiveCount >= 10 && s.coloniesLost === 0, desc: 'Ten hives placed, none lost.' },
  { id: 'mangrove', name: 'Black Gold', check: (s) => s.bestYield >= 14, desc: 'Harvest 14 honey from one hive.' },
];

export function apiaryHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of APIARY_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function apiaryChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function createApiaryExtras(system) {
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  function hireHelper(id) {
    const h = APIARY_HELPERS.find((x) => x.id === id);
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
      const h = APIARY_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    wagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: wagesPaid };
  }

  function helperBonus(skill) {
    return apiaryHelperBonus(helpers, skill);
  }

  function challenges() {
    return APIARY_CHALLENGES.map((ch) => apiaryChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = APIARY_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = apiaryChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return APIARY_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function inspectHive(hiveId) {
    const colony = system.state.hives.find((h) => h.id === hiveId);
    if (!colony) return { ok: false, reason: 'no-such-hive' };
    return { ok: true, ...colony };
  }

  function inventoryValue() {
    let total = 0;
    for (const p of APIARY_PRODUCTS) {
      total += (system.state.products[p.id] || 0) * p.value;
    }
    return { ok: true, value: Math.round(total) };
  }

  function colonyCount() {
    return { total: system.state.hives.length, strong: system.state.hives.filter((h) => h.strength >= 7).length, weak: system.state.hives.filter((h) => h.strength < 4).length };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, inspectHive, inventoryValue, colonyCount,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return wagesPaid; },
  };
}

export const APIARY_TIPS = [
  { id: 'veil-first', name: 'Veil First', text: 'A veil costs little and saves many stings.' },
  { id: 'blossom', name: 'Follow the Blossom', text: 'Move hives to where the flowers are open.' },
  { id: 'split', name: 'Split Strong Hives', text: 'A strong hive split is a free hive.' },
  { id: 'mite', name: 'Watch for Mites', text: 'Treat mites early or lose the colony.' },
  { id: 'mead', name: 'Mead Pays', text: 'Three jars of honey become one bottle of mead worth more.' },
  { id: 'mangrove', name: 'Black Mangrove', text: 'The mangrove bloom comes once a year. Be ready.' },
  { id: 'winter', name: 'Winter Shelter', text: 'Without a shed, cold snaps kill colonies.' },
  { id: 'jelly', name: 'Royal Jelly', text: 'The apothecary pays a fortune for royal jelly.' },
];

export const APIARY_LEADERBOARD = [
  { name: 'Old Hana', jars: 4200, desc: 'Forty seasons of honey.' },
  { name: 'Breeder Luz', jars: 3100, desc: 'Queens for the whole valley.' },
  { name: 'Ria', jars: 0, desc: 'You. Climbing.' },
  { name: 'Market Maya', jars: 2200, desc: 'Sells every jar she makes.' },
  { name: 'Smoker Sam', jars: 1500, desc: 'Calm hands, full hives.' },
];

export function apiaryTipFor(day) {
  return APIARY_TIPS[day % APIARY_TIPS.length];
}

export function apiaryLeaderboardWith(playerJars) {
  const board = APIARY_LEADERBOARD.map((e) => ({
    name: e.name, jars: e.name === 'Ria' ? playerJars : e.jars, desc: e.desc,
  }));
  board.sort((a, b) => b.jars - a.jars);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function apiaryEfficiency(honeyMade, harvests) {
  if (harvests === 0) return 0;
  return Math.round((honeyMade / harvests) * 10) / 10;
}

export function apiaryProfitPerHive(earned, hiveCount) {
  if (hiveCount === 0) return 0;
  return Math.round((earned / hiveCount) * 10) / 10;
}

export function apiaryGrade(honeyMade, coloniesLost, harvests) {
  if (harvests === 0) return 'D';
  const score = honeyMade - coloniesLost * 20 + harvests * 2;
  if (score >= 400) return 'S';
  if (score >= 250) return 'A';
  if (score >= 120) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}

export const APIARY_RECORDS = [
  { id: 'most-honey', name: 'Most Honey', stat: 'honeyMade', unit: 'honey', desc: 'Most honey made in total.' },
  { id: 'most-hives', name: 'Most Hives', stat: 'hiveCount', unit: 'hives', desc: 'Most hives placed.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from the apiary.' },
  { id: 'best-harvest', name: 'Best Harvest', stat: 'bestYield', unit: 'honey', desc: 'Best single-hive harvest.' },
  { id: 'swarms', name: 'Swarm Catcher', stat: 'swarmsCaught', unit: 'swarms', desc: 'Most wild swarms caught.' },
];

export function apiaryRecordFor(recordId, state) {
  const r = APIARY_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function apiaryAllRecords(state) {
  return APIARY_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function apiarySummary(state) {
  return `Apiary ${APIARY_RANKS[state.rank].name}: ${state.hives.length} hives, ${Math.round(state.honeyMade)} honey, ${state.harvests} harvests, $${Math.round(state.earned)} earned.`;
}

export function apiaryNextGoal(state) {
  if (state.hiveCount < 3) return 'Place 3 hives.';
  if (state.honeyMade < 50) return 'Make 50 honey.';
  if (state.rank < 2) return 'Reach rank Apiarist.';
  return 'Catch a wild swarm in swarm season.';
}

export const APIARY_QUICK_START = [
  'Place a Langstroth hive in the clover meadow first.',
  'Tend hives daily — strong colonies make more honey.',
  'Harvest when a hive holds 2 or more honey.',
  'Sell honey to the bakery, wax to the candle maker.',
  'Split strong hives instead of buying new ones.',
  'Brew mead from spare honey — it pays more per jar.',
];

export function apiaryQuickStart(step) {
  return APIARY_QUICK_START[step] || null;
}

export const APIARY_META = {
  system: 'apiary', version: '7-B1', author: 'builder-1',
  hives: APIARY_HIVES.length, flowers: APIARY_FLOWERS.length,
  note: 'Honey & Hive: tend, harvest, brew, sell.',
};
