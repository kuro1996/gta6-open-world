// Solara Nights — Paleontology / Bone Beds (Round 7, written fresh).
// Ria digs the fossil beds around Solara: the river cut, the chalk
// cliffs, the old tar seeps and the bone cave. Brush, pick and chisel
// fossils out of the rock, clean them in the lab, and assemble whole
// skeletons for the museum — a complete specimen pays a fortune, and
// the university pays a research grant for rare finds. A careless dig
// shatters a priceless skull; a patient one finds the missing jaw.
// Permits, brushes, sieves and a proper lab gate the deeper beds, and
// the black market in Old Town pays cash for anything — at a cost.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const FOSSIL_SITES = [
  { id: 'river', name: 'River Cut', value: 30, difficulty: 1, rarity: 0.3, depth: 1, era: 'Pleistocene', desc: 'The river eats the bank and drops bones.' },
  { id: 'chalk', name: 'Chalk Cliffs', value: 55, difficulty: 2, rarity: 0.2, depth: 1, era: 'Cretaceous', desc: 'White cliffs full of sea creatures.' },
  { id: 'tar', name: 'Tar Seeps', value: 80, difficulty: 2, rarity: 0.14, depth: 2, era: 'Pleistocene', desc: 'Black tar that traps everything that steps in.' },
  { id: 'cave', name: 'Bone Cave', value: 95, difficulty: 3, rarity: 0.1, depth: 2, era: 'Pleistocene', desc: 'A dark cave floored with ancient bones.' },
  { id: 'badlands', name: 'Badlands', value: 120, difficulty: 3, rarity: 0.09, depth: 3, era: 'Jurassic', desc: 'Striped hills where dinosaurs sleep.' },
  { id: 'lakebed', name: 'Dry Lakebed', value: 70, difficulty: 2, rarity: 0.13, depth: 2, era: 'Miocene', desc: 'Cracked mud that hides fish and birds.' },
  { id: 'quarry', name: 'Old Quarry', value: 60, difficulty: 2, rarity: 0.16, depth: 1, era: 'Cretaceous', desc: 'Blasted rock, broken fossils, quick finds.' },
  { id: 'volcano', name: 'Ash Beds', value: 150, difficulty: 4, rarity: 0.05, depth: 3, era: 'Jurassic', desc: 'Volcanic ash that froze a forest in time.' },
  { id: 'glacier', name: 'Glacier Moraine', value: 140, difficulty: 4, rarity: 0.04, depth: 3, era: 'Pleistocene', desc: 'Ice-dropped boulders with mammoth bones.' },
  { id: 'reef', name: 'Fossil Reef', value: 110, difficulty: 3, rarity: 0.07, depth: 2, era: 'Devonian', desc: 'An ancient reef, now high and dry.' },
];

export const FOSSIL_FINDS = [
  { id: 'shell', name: 'Ammonite Shell', value: 25, site: 'chalk', rarity: 0.3, parts: 1, desc: 'A coiled shell, perfect as a pocket stone.' },
  { id: 'fish', name: 'Fossil Fish', value: 45, site: 'lakebed', rarity: 0.2, parts: 1, desc: 'A fish in stone, scales still shining.' },
  { id: 'tooth', name: 'Shark Tooth', value: 40, site: 'chalk', rarity: 0.18, parts: 1, desc: 'A black triangle, sharp after millions of years.' },
  { id: 'trilobite', name: 'Trilobite', value: 70, site: 'reef', rarity: 0.12, parts: 1, desc: 'A segmented sea bug, beautifully preserved.' },
  { id: 'fern', name: 'Fern Imprint', value: 35, site: 'quarry', rarity: 0.22, parts: 1, desc: 'A leaf pressed into stone like a photograph.' },
  { id: 'tusk', name: 'Mammoth Tusk', value: 180, site: 'glacier', rarity: 0.05, parts: 2, desc: 'A curved ivory tusk, heavy as a man.' },
  { id: 'skull', name: 'Sabre-Tooth Skull', value: 220, site: 'tar', rarity: 0.06, parts: 3, desc: 'Fangs like knives, staring out of the tar.' },
  { id: 'femur', name: 'Dinosaur Femur', value: 260, site: 'badlands', rarity: 0.05, parts: 3, desc: 'A thigh bone taller than you are.' },
  { id: 'claw', name: 'Raptor Claw', value: 150, site: 'badlands', rarity: 0.08, parts: 1, desc: 'A curved killing claw, still wicked.' },
  { id: 'egg', name: 'Dinosaur Egg', value: 300, site: 'volcano', rarity: 0.03, parts: 1, desc: 'An egg in ash — did it ever hatch?' },
  { id: 'coral', name: 'Fossil Coral', value: 60, site: 'reef', rarity: 0.14, parts: 1, desc: 'A branching coral, turned to stone.' },
  { id: 'bird', name: 'Ancient Bird', value: 200, site: 'lakebed', rarity: 0.05, parts: 2, desc: 'Feathers in stone — the missing link.' },
];

export const FOSSIL_SKELETONS = [
  { id: 'mammoth', name: 'Woolly Mammoth', parts: ['tusk', 'tusk', 'femur'], value: 1200, desc: 'A giant of the ice age, standing in the hall.' },
  { id: 'sabre', name: 'Sabre-Tooth Cat', parts: ['skull', 'claw', 'claw'], value: 1100, desc: 'Fangs, claws, and a hunter’s grace.' },
  { id: 'raptor', name: 'Velociraptor', parts: ['claw', 'femur', 'skull'], value: 1500, desc: 'Small, fast, and utterly terrifying.' },
  { id: 'fish-school', name: 'Fish School Slab', parts: ['fish', 'fish', 'fish'], value: 400, desc: 'A whole school, frozen mid-swim.' },
  { id: 'ammonite-bed', name: 'Ammonite Bed', parts: ['shell', 'shell', 'shell'], value: 300, desc: 'Three coiled shells on one slab.' },
  { id: 'bird-link', name: 'Feathered Bird', parts: ['bird', 'bird', 'fern'], value: 900, desc: 'Feathers and fern — the dawn of flight.' },
];

export const FOSSIL_BUYERS = [
  { id: 'museum', name: 'Solara Museum', mult: 1.0, likes: ['skeleton'], dislikes: [], mood: 'steady', minRank: 0, desc: 'Buys whole skeletons for the hall.' },
  { id: 'university', name: 'University Lab', mult: 1.2, likes: ['rare'], dislikes: [], mood: 'steady', minRank: 1, desc: 'Pays grants for rare specimens.' },
  { id: 'collector', name: 'Collector Vane', mult: 1.5, likes: ['rare'], dislikes: [], mood: 'odd', minRank: 2, desc: 'Wants the rarest pieces, whatever the price.' },
  { id: 'tourist', name: 'Tourist Shop', mult: 0.9, likes: ['common'], dislikes: ['rare'], mood: 'quick', minRank: 0, desc: 'Sells small fossils to visitors.' },
  { id: 'blackmarket', name: 'Black Market', mult: 1.6, likes: [], dislikes: [], mood: 'shady', minRank: 3, desc: 'Cash, no questions — and heat if you are caught.' },
];

export const FOSSIL_UPGRADES = [
  { id: 'brush', name: 'Soft Brushes', cost: 80, desc: 'Clean finds without breaking them.', effect: 'brush' },
  { id: 'permit', name: 'Dig Permit', cost: 120, desc: 'Legal digging — no warden fines.', effect: 'legal' },
  { id: 'sieve', name: 'Fine Sieve', cost: 160, desc: 'Small finds +30% on every dig.', effect: 'sieve' },
  { id: 'chisel', name: 'Rock Chisel', cost: 240, desc: 'Hard rock opens: +1 dig tier.', effect: 'chisel' },
  { id: 'lab', name: 'Prep Lab', cost: 420, desc: 'Clean fossils at home: +25% value.', effect: 'lab' },
  { id: 'scanner', name: 'Ground Scanner', cost: 550, desc: 'See the bones before you dig.', effect: 'scan' },
  { id: 'crane', name: 'Lift Crane', cost: 800, desc: 'Big bones move easy: mammoth parts +1.', effect: 'crane' },
  { id: 'archive', name: 'Private Archive', cost: 1100, desc: 'Your collection pays a daily grant.', effect: 'archive' },
];

export const FOSSIL_RANKS = [
  { level: 0, name: 'Rock Hound', xp: 0, perk: 'Base prices, base finds.' },
  { level: 1, name: 'Digger', xp: 120, perk: '+10% sale prices.' },
  { level: 2, name: 'Fossil Hunter', xp: 300, perk: '+10% find rate.' },
  { level: 3, name: 'Paleontologist', xp: 620, perk: '+20% sale prices, the university funds you.' },
  { level: 4, name: 'Master of Bone Beds', xp: 1100, perk: '+30% sale prices, rare finds doubled.' },
];

export const FOSSIL_EVENTS = [
  { id: 'flood-exposure', name: 'Flood Exposure', mult: 1.5, sites: ['river', 'lakebed'], desc: 'A flood strips the bank bare — bones everywhere.' },
  { id: 'rockfall', name: 'Cliff Rockfall', mult: 1.4, sites: ['chalk', 'quarry'], desc: 'Fresh rock falls expose new fossils.' },
  { id: 'grant-season', name: 'Grant Season', mult: 1.3, sites: [], desc: 'The university has money — rare finds pay more.' },
  { id: 'expo', name: 'Museum Expo', mult: 1.4, sites: [], desc: 'The expo is in town; skeletons pay double.' },
  { id: 'heat-wave', name: 'Heat Wave', mult: 0.7, sites: [], desc: 'Too hot to dig — the ground bakes hard.' },
  { id: 'tar-bubble', name: 'Tar Bubbles', mult: 1.5, sites: ['tar', 'cave'], desc: 'The tar seeps bubble — something big is surfacing.' },
];

export const FOSSIL_CONTRACTS = [
  { id: 'shells-10', name: 'Shell Order', find: 'shell', qty: 6, pay: 240, days: 2, rep: 0, desc: 'The tourist shop needs six ammonites.' },
  { id: 'fish-6', name: 'Fish Slab', find: 'fish', qty: 4, pay: 320, days: 2, rep: 1, desc: 'The museum wants four fossil fish.' },
  { id: 'tusk-2', name: 'Tusk Call', find: 'tusk', qty: 2, pay: 560, days: 3, rep: 2, desc: 'Two mammoth tusks for the hall.' },
  { id: 'skull-1', name: 'The Skull', find: 'skull', qty: 1, pay: 700, days: 3, rep: 3, desc: 'One sabre-tooth skull, intact.' },
  { id: 'femur-2', name: 'Giant Bones', find: 'femur', qty: 2, pay: 800, days: 3, rep: 3, desc: 'Two dinosaur femurs for the new wing.' },
  { id: 'egg-1', name: 'The Egg', find: 'egg', qty: 1, pay: 1000, days: 3, rep: 3, desc: 'One dinosaur egg, unbroken.' },
];

export const FOSSIL_HAZARDS = [
  { id: 'break', name: 'Shattered Find', chance: 0.08, damage: 1, desc: 'The pick slips — a fossil shatters.' },
  { id: 'collapse', name: 'Bank Collapse', chance: 0.04, damage: 2, desc: 'The river bank gives way under you.' },
  { id: 'tar-burn', name: 'Tar Burn', chance: 0.05, damage: 1, desc: 'Hot tar sticks and burns.' },
  { id: 'dust', name: 'Chalk Dust', chance: 0.1, damage: 0, desc: 'White dust in the lungs.' },
  { id: 'snake', name: 'Cave Snake', chance: 0.03, damage: 1, desc: 'Something hisses in the dark.' },
];

export function paleontologyRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < FOSSIL_RANKS.length; i++) {
    if (xp >= FOSSIL_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function paleontologyPriceFor(find, rank, upgrades) {
  let price = find.value;
  price *= 1 + rank * 0.1;
  if (upgrades.includes('lab')) price *= 1.25;
  return Math.max(1, Math.round(price));
}

export function paleontologyBuyerPrice(find, buyerId, rank, upgrades) {
  const buyer = FOSSIL_BUYERS.find((b) => b.id === buyerId);
  if (!buyer) return 0;
  let mult = buyer.mult;
  if (find.rarity <= 0.06 && buyer.likes.includes('rare')) mult += 0.25;
  if (find.rarity >= 0.18 && buyer.likes.includes('common')) mult += 0.1;
  return Math.max(1, Math.round(paleontologyPriceFor(find, rank, upgrades) * mult));
}

export function paleontologyDigTier(upgrades) {
  let tier = 1;
  if (upgrades.includes('chisel')) tier += 1;
  if (upgrades.includes('scanner')) tier += 1;
  return tier;
}

export function createPaleontologySystem(ctx) {
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
    digs: 0,
    finds: 0,
    broken: 0,
    skeletons: 0,
    skeletonsSold: 0,
    earned: 0,
    spent: 0,
    grants: 0,
    fines: 0,
    finesPaid: 0,
    inventory: {},
    upgrades: [],
    site: null,
    siteTimeLeft: 0,
    digging: null,
    digProgress: 0,
    lastDay: 1,
    activeContract: null,
    contractProgress: 0,
    contractsDone: 0,
    contractsFailed: 0,
    bestFind: null,
    bestValue: 0,
    dailyFinds: 0,
    dailyEarned: 0,
    currentEvent: null,
    archiveValue: 0,
    deepest: 1,
  };
  for (const f of FOSSIL_FINDS) state.inventory[f.id] = 0;

  function refreshRank() {
    const r = paleontologyRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Paleontology rank up: ${FOSSIL_RANKS[r].name} — ${FOSSIL_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function pickFind(site) {
    const bag = [];
    for (const f of FOSSIL_FINDS) {
      if (f.site !== site.id) continue;
      let w = f.rarity;
      if (state.upgrades.includes('sieve')) w *= 1.3;
      if (state.currentEvent) {
        const ev = FOSSIL_EVENTS.find((e) => e.id === state.currentEvent);
        if (ev && ev.sites.includes(site.id)) w *= ev.mult;
      }
      bag.push({ f, w });
    }
    if (bag.length === 0) return null;
    let total = 0;
    for (const b of bag) total += b.w;
    let roll = rng() * total;
    for (const b of bag) {
      roll -= b.w;
      if (roll <= 0) return b.f;
    }
    return bag[0].f;
  }

  function enterSite(siteId) {
    const s = FOSSIL_SITES.find((x) => x.id === siteId);
    if (!s) return { ok: false, reason: 'no-such-site' };
    if (state.site) return { ok: false, reason: 'site-active' };
    if (s.depth >= 3 && state.rank < 2) return { ok: false, reason: 'rank-too-low', need: 2 };
    const hour = getHour();
    if (hour >= 22 || hour < 5) return { ok: false, reason: 'too-late' };
    state.site = siteId;
    state.siteTimeLeft = 6 * 60;
    state.deepest = Math.max(state.deepest, s.depth);
    log(`At ${s.name} — ${s.desc} Brush slow, dig careful.`);
    return { ok: true, site: siteId, era: s.era };
  }

  function startDig() {
    if (!state.site) return { ok: false, reason: 'no-site' };
    if (state.digging) return { ok: false, reason: 'already-digging' };
    const site = FOSSIL_SITES.find((x) => x.id === state.site);
    const find = pickFind(site);
    if (!find) return { ok: false, reason: 'nothing-here' };
    const tier = paleontologyDigTier(state.upgrades);
    if (site.difficulty > tier + 1) {
      log(`The rock at ${site.name} is too hard for your tools — upgrade first.`);
      return { ok: false, reason: 'too-hard', site: site.id };
    }
    state.digging = find.id;
    state.digProgress = 0;
    log(`Sign in the rock — something is buried here. Dig carefully.`);
    return { ok: true, find: find.id, name: find.name, difficulty: site.difficulty };
  }

  function dig() {
    if (!state.digging) return { ok: false, reason: 'not-digging' };
    const find = FOSSIL_FINDS.find((f) => f.id === state.digging);
    const site = FOSSIL_SITES.find((x) => x.id === state.site);
    const tier = paleontologyDigTier(state.upgrades);
    state.digProgress += tier;
    const need = site.difficulty * 3;
    if (state.digProgress < need) {
      if (rng() < 0.08) {
        const h = FOSSIL_HAZARDS[Math.floor(rng() * FOSSIL_HAZARDS.length)];
        if (h.id === 'break' && !state.upgrades.includes('brush')) {
          state.broken += 1;
          state.digging = null;
          state.digProgress = 0;
          log(`Hazard: ${h.name} — the fossil shatters. Gone.`);
          return { ok: true, broken: true };
        }
        log(`Hazard: ${h.name} — ${h.desc}`);
        if (h.damage >= 2) addHeat(1);
      }
      return { ok: true, progress: state.digProgress, need, done: false };
    }
    state.inventory[find.id] += 1;
    state.finds += 1;
    state.dailyFinds += 1;
    state.digs += 1;
    gainXp(10 + Math.round((1 - find.rarity) * 20));
    if (find.value > state.bestValue) { state.bestValue = find.value; state.bestFind = find.id; }
    state.digging = null;
    state.digProgress = 0;
    if (find.rarity <= 0.06) {
      state.grants += 50;
      addCash(50);
      state.earned += 50;
      log(`RARE FIND! ${find.name} — the university pays a $50 grant on the spot.`);
    } else {
      log(`Found a ${find.name} — ${find.desc}`);
    }
    if (state.activeContract) checkContract(find.id, 1);
    return { ok: true, done: true, find: find.id, name: find.name, value: find.value };
  }

  function leaveSite() {
    if (!state.site) return { ok: false, reason: 'no-site' };
    const s = state.site;
    state.site = null;
    state.siteTimeLeft = 0;
    state.digging = null;
    state.digProgress = 0;
    log(`Back from ${s} — clean the finds in the lab.`);
    return { ok: true, site: s };
  }

  function cleanFind(findId, qty) {
    const find = FOSSIL_FINDS.find((f) => f.id === findId);
    if (!find) return { ok: false, reason: 'no-such-find' };
    const have = state.inventory[findId] || 0;
    if (qty <= 0 || have < qty) return { ok: false, reason: 'not-enough', have };
    const bonus = state.upgrades.includes('lab') ? 1.25 : 1.1;
    const value = Math.round(find.value * bonus);
    gainXp(qty * 3);
    log(`Cleaned ${qty}x ${find.name} — now worth $${value} each.`);
    return { ok: true, qty, value };
  }

  function assembleSkeleton(skeletonId) {
    const sk = FOSSIL_SKELETONS.find((x) => x.id === skeletonId);
    if (!sk) return { ok: false, reason: 'no-such-skeleton' };
    const needed = {};
    for (const part of sk.parts) needed[part] = (needed[part] || 0) + 1;
    for (const [part, qty] of Object.entries(needed)) {
      if ((state.inventory[part] || 0) < qty) return { ok: false, reason: 'missing-part', part, have: state.inventory[part] || 0, need: qty };
    }
    for (const [part, qty] of Object.entries(needed)) state.inventory[part] -= qty;
    state.skeletons += 1;
    state.archiveValue += sk.value;
    gainXp(100);
    log(`Assembled the ${sk.name}! A complete skeleton — the museum will want this.`);
    return { ok: true, skeleton: skeletonId, value: sk.value };
  }

  function sellSkeleton(skeletonId) {
    const sk = FOSSIL_SKELETONS.find((x) => x.id === skeletonId);
    if (!sk) return { ok: false, reason: 'no-such-skeleton' };
    if (state.skeletons <= 0) return { ok: false, reason: 'no-skeleton' };
    const value = sk.value + state.rank * 100;
    state.skeletons -= 1;
    state.skeletonsSold += 1;
    state.earned += value;
    state.dailyEarned += value;
    addCash(value);
    gainXp(80);
    log(`Sold the ${sk.name} skeleton to the museum for $${value}.`);
    return { ok: true, value, skeleton: skeletonId };
  }

  function sellFind(buyerId, findId, qty) {
    const buyer = FOSSIL_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    if (state.rank < buyer.minRank) return { ok: false, reason: 'rank-too-low', need: buyer.minRank };
    const find = FOSSIL_FINDS.find((f) => f.id === findId);
    if (!find) return { ok: false, reason: 'no-such-find' };
    const have = state.inventory[findId] || 0;
    if (qty <= 0 || have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = paleontologyBuyerPrice(find, buyerId, state.rank, state.upgrades);
    const total = unit * qty;
    state.inventory[findId] -= qty;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(qty * 2);
    if (buyerId === 'blackmarket') {
      addHeat(3);
      log(`Sold ${qty}x ${find.name} on the black market for $${total} — heat +3.`);
    } else {
      log(`Sold ${qty}x ${find.name} to ${buyer.name} for $${total}.`);
    }
    return { ok: true, total, unit, qty };
  }

  function sellAll(buyerId) {
    const buyer = FOSSIL_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    let total = 0;
    let units = 0;
    const lines = [];
    for (const f of FOSSIL_FINDS) {
      const q = state.inventory[f.id] || 0;
      if (q <= 0) continue;
      const unit = paleontologyBuyerPrice(f, buyerId, state.rank, state.upgrades);
      const line = unit * q;
      total += line; units += q;
      lines.push({ id: f.id, qty: q, total: line });
      state.inventory[f.id] = 0;
    }
    if (units === 0) return { ok: false, reason: 'nothing-to-sell' };
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(units);
    if (buyerId === 'blackmarket') addHeat(3);
    log(`Sold the whole collection to ${buyer.name} for $${total}.`);
    return { ok: true, total, units, lines };
  }

  function buyUpgrade(id) {
    const u = FOSSIL_UPGRADES.find((x) => x.id === id);
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
    const ct = FOSSIL_CONTRACTS.find((x) => x.id === id);
    if (!ct) return { ok: false, reason: 'no-such-contract' };
    if (state.activeContract) return { ok: false, reason: 'contract-active' };
    if (state.rank < ct.rep) return { ok: false, reason: 'rep-too-low', need: ct.rep };
    state.activeContract = { ...ct, dayTaken: getDay(), deadlineDay: getDay() + ct.days };
    state.contractProgress = 0;
    log(`Contract taken: ${ct.name} — ${ct.qty}x ${ct.find} by day ${state.activeContract.deadlineDay}.`);
    return { ok: true, contract: state.activeContract };
  }

  function checkContract(findId, qty) {
    const ct = state.activeContract;
    if (!ct || ct.find !== findId) return;
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
    const have = state.inventory[ct.find] || 0;
    if (have < ct.qty) return { ok: false, reason: 'not-enough-finds', have, need: ct.qty };
    state.inventory[ct.find] -= ct.qty;
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
    log(`Dig fines settled: $${amount} paid.`);
    return { ok: true, amount };
  }

  function collectGrant() {
    if (!state.upgrades.includes('archive')) return { ok: false, reason: 'need-archive' };
    const grant = Math.floor(state.archiveValue * 0.05);
    if (grant <= 0) return { ok: false, reason: 'no-archive-value' };
    state.grants += grant;
    state.earned += grant;
    addCash(grant);
    log(`Archive grant: $${grant} for your collection.`);
    return { ok: true, grant };
  }

  function priceBoard() {
    return FOSSIL_FINDS.map((f) => ({
      id: f.id, name: f.name,
      price: paleontologyPriceFor(f, state.rank, state.upgrades),
      stock: state.inventory[f.id], rarity: f.rarity, site: f.site,
    }));
  }

  function siteReport() {
    return FOSSIL_SITES.map((s) => ({
      id: s.id, name: s.name, era: s.era, difficulty: s.difficulty, depth: s.depth,
      finds: FOSSIL_FINDS.filter((f) => f.site === s.id).map((f) => f.id),
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.2) {
      const ev = FOSSIL_EVENTS[Math.floor(rng() * FOSSIL_EVENTS.length)];
      state.currentEvent = ev.id;
      log(`Dig news: ${ev.name} — ${ev.desc}`);
      return { event: ev.id, name: ev.name };
    }
    if (roll < 0.3) {
      const free = FOSSIL_FINDS[Math.floor(rng() * FOSSIL_FINDS.length)];
      state.inventory[free.id] += 1;
      state.finds += 1;
      log(`A fellow digger gifts you a ${free.name}.`);
      return { event: 'gift', find: free.id };
    }
    state.currentEvent = null;
    return { event: 'none' };
  }

  function tick(dt) {
    if (state.site) {
      state.siteTimeLeft -= dt;
      if (state.siteTimeLeft <= 0) {
        const s = state.site;
        state.site = null;
        state.siteTimeLeft = 0;
        state.digging = null;
        state.digProgress = 0;
        log(`The light fails at ${s} — pack up the tools.`);
      }
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyFinds = 0;
    state.dailyEarned = 0;
    if (state.activeContract && day >= state.activeContract.deadlineDay && state.contractProgress < state.activeContract.qty) {
      log(`Contract ${state.activeContract.name} expired — the client walked away.`);
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractsFailed += 1;
    }
    if (!state.upgrades.includes('permit') && state.site && rng() < 0.2) {
      state.fines += 150;
      addHeat(2);
      log('The warden fines you for digging without a permit — $150.');
    }
    dailyEvent();
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, digs: state.digs, finds: state.finds,
      broken: state.broken, skeletons: state.skeletons,
      skeletonsSold: state.skeletonsSold, earned: state.earned, spent: state.spent,
      grants: state.grants, fines: state.fines, finesPaid: state.finesPaid,
      inventory: state.inventory, upgrades: state.upgrades, site: state.site,
      siteTimeLeft: state.siteTimeLeft, digging: state.digging,
      digProgress: state.digProgress, lastDay: state.lastDay,
      activeContract: state.activeContract, contractProgress: state.contractProgress,
      contractsDone: state.contractsDone, contractsFailed: state.contractsFailed,
      bestFind: state.bestFind, bestValue: state.bestValue,
      dailyFinds: state.dailyFinds, dailyEarned: state.dailyEarned,
      currentEvent: state.currentEvent, archiveValue: state.archiveValue,
      deepest: state.deepest,
    }));
  }

  function deserialize(d) {
    if (!d || typeof d !== 'object') return;
    for (const k of Object.keys(state)) {
      if (d[k] !== undefined) state[k] = d[k];
    }
    for (const f of FOSSIL_FINDS) {
      if (state.inventory[f.id] === undefined) state.inventory[f.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: FOSSIL_RANKS[state.rank].name,
      xp: state.xp,
      digs: state.digs,
      finds: state.finds,
      broken: state.broken,
      skeletons: state.skeletons,
      skeletonsSold: state.skeletonsSold,
      earned: Math.round(state.earned),
      spent: state.spent,
      grants: state.grants,
      fines: state.fines,
      upgrades: state.upgrades.length,
      site: state.site,
      digging: state.digging,
      activeContract: state.activeContract ? state.activeContract.id : null,
      contractsDone: state.contractsDone,
      contractsFailed: state.contractsFailed,
      bestFind: state.bestFind,
      bestValue: state.bestValue,
      dailyFinds: state.dailyFinds,
      dailyEarned: Math.round(state.dailyEarned),
      archiveValue: state.archiveValue,
      deepest: state.deepest,
      event: state.currentEvent,
    };
  }

  function hudLine() {
    if (state.digging) {
      const f = FOSSIL_FINDS.find((x) => x.id === state.digging);
      return `Dig: uncovering ${f ? f.name : state.digging} — ${state.digProgress} done`;
    }
    if (state.site) return `Dig: ${state.site} — start a dig`;
    if (state.skeletons > 0) return `Dig: ${state.skeletons} skeleton${state.skeletons > 1 ? 's' : ''} ready to sell`;
    if (state.activeContract) return `Dig: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    const total = Object.values(state.inventory).reduce((a, b) => a + b, 0);
    if (total > 0) return `Dig: ${total} fossils to clean or sell`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearBeds = Math.hypot(pos.x - 520, pos.z - 480) < 40;
    if (!nearBeds) return false;
    if (!state.site) { enterSite('river'); return true; }
    if (!state.digging) { startDig(); return true; }
    dig();
    return true;
  }

  return {
    state, enterSite, startDig, dig, leaveSite, cleanFind,
    assembleSkeleton, sellSkeleton, sellFind, sellAll, buyUpgrade,
    takeContract, deliverContract, abandonContract, payFine,
    collectGrant, priceBoard, siteReport, dailyEvent,
    tick, tickDay, serialize, deserialize, stats, hudLine, interact,
  };
}

export const FOSSIL_HELPERS = [
  { id: 'prepper', name: 'Prepper Ana', wage: 35, skill: 'clean', bonus: 0.25, desc: 'Cleans fossils fast: +25% clean value.' },
  { id: 'scout', name: 'Scout Ben', wage: 40, skill: 'find', bonus: 0.2, desc: 'Spots sign: +20% find rate.' },
  { id: 'hauler', name: 'Hauler Gus', wage: 45, skill: 'carry', bonus: 0.4, desc: 'Moves big bones: +40% carry.' },
  { id: 'professor', name: 'Professor Ives', wage: 70, skill: 'grant', bonus: 0.3, desc: 'Writes grants: +30% grant money.' },
];

export const FOSSIL_CHALLENGES = [
  { id: 'finds-10', name: 'First Ten', target: 'finds', goal: 10, xp: 80, desc: 'Find 10 fossils.' },
  { id: 'finds-50', name: 'Bone Collector', target: 'finds', goal: 50, xp: 120, desc: 'Find 50 fossils.' },
  { id: 'skeleton-1', name: 'First Skeleton', target: 'skeletons', goal: 1, xp: 150, desc: 'Assemble your first skeleton.' },
  { id: 'earn-1000', name: 'Dig Purse', target: 'earned', goal: 1000, xp: 120, desc: 'Earn $1,000 from fossils.' },
  { id: 'grants-500', name: 'Grant Winner', target: 'grants', goal: 500, xp: 140, desc: 'Win $500 in grants.' },
  { id: 'contracts-5', name: 'Reliable Digger', target: 'contractsDone', goal: 5, xp: 140, desc: 'Complete 5 fossil contracts.' },
  { id: 'egg-1', name: 'The Egg', target: 'bestValue', goal: 300, xp: 200, desc: 'Find a fossil worth $300 or more.' },
  { id: 'deep-3', name: 'Deep Digger', target: 'deepest', goal: 3, xp: 150, desc: 'Reach depth 3 sites.' },
];

export const FOSSIL_ACHIEVEMENTS = [
  { id: 'first-find', name: 'First Find', check: (s) => s.finds >= 1, desc: 'Find your first fossil.' },
  { id: 'first-skeleton', name: 'First Skeleton', check: (s) => s.skeletons >= 1 || s.skeletonsSold >= 1, desc: 'Assemble your first skeleton.' },
  { id: 'first-egg', name: 'The Egg', check: (s) => s.bestFind === 'egg', desc: 'Find a dinosaur egg.' },
  { id: 'rank-3', name: 'Paleontologist', check: (s) => s.rank >= 3, desc: 'Reach rank Paleontologist.' },
  { id: 'rich-digger', name: 'Rich Digger', check: (s) => s.earned >= 3000, desc: 'Earn $3,000 from fossils.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every fossil upgrade.' },
  { id: 'no-break', name: 'Gentle Hands', check: (s) => s.finds >= 30 && s.broken === 0, desc: 'Find 30 fossils without breaking one.' },
  { id: 'mammoth', name: 'Mammoth Hunter', check: (s) => s.bestFind === 'tusk', desc: 'Find a mammoth tusk.' },
];

export function paleontologyHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of FOSSIL_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function paleontologyChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function createPaleontologyExtras(system) {
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  function hireHelper(id) {
    const h = FOSSIL_HELPERS.find((x) => x.id === id);
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
      const h = FOSSIL_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    wagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: wagesPaid };
  }

  function helperBonus(skill) {
    return paleontologyHelperBonus(helpers, skill);
  }

  function challenges() {
    return FOSSIL_CHALLENGES.map((ch) => paleontologyChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = FOSSIL_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = paleontologyChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return FOSSIL_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function identify(findId) {
    const find = FOSSIL_FINDS.find((f) => f.id === findId);
    if (!find) return { ok: false, reason: 'no-such-find' };
    return { ok: true, find: findId, value: find.value, rarity: find.rarity, site: find.site, desc: find.desc };
  }

  function inventoryValue() {
    let total = 0;
    for (const f of FOSSIL_FINDS) {
      total += (system.state.inventory[f.id] || 0) * f.value;
    }
    return { ok: true, value: Math.round(total) };
  }

  function skeletonOptions() {
    return FOSSIL_SKELETONS.map((sk) => {
      const needed = {};
      for (const part of sk.parts) needed[part] = (needed[part] || 0) + 1;
      const ready = Object.entries(needed).every(([part, qty]) => (system.state.inventory[part] || 0) >= qty);
      return { id: sk.id, name: sk.name, value: sk.value, ready, needed };
    });
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, identify, inventoryValue, skeletonOptions,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return wagesPaid; },
  };
}

export const FOSSIL_TIPS = [
  { id: 'brush-first', name: 'Brush First', text: 'Soft brushes save fossils that picks would shatter.' },
  { id: 'permit-first', name: 'Permit First', text: 'One warden fine costs more than the permit.' },
  { id: 'skeleton', name: 'Build Skeletons', text: 'A whole skeleton pays more than its parts.' },
  { id: 'river', name: 'After the Flood', text: 'Floods strip the river bank bare — dig then.' },
  { id: 'lab', name: 'Clean in the Lab', text: 'A prep lab adds 25% to every fossil’s value.' },
  { id: 'egg', name: 'The Egg', text: 'The ash beds hide dinosaur eggs. Dig slow there.' },
  { id: 'black-market', name: 'Black Market', text: 'The black market pays double — and the heat is real.' },
  { id: 'grant', name: 'Grants', text: 'Rare finds win university grants on the spot.' },
];

export const FOSSIL_LEADERBOARD = [
  { name: 'Professor Ives', finds: 2400, desc: 'A lifetime in the bone beds.' },
  { name: 'Scout Ben', finds: 1600, desc: 'Spots sign nobody else sees.' },
  { name: 'Ria', finds: 0, desc: 'You. Climbing.' },
  { name: 'Prepper Ana', finds: 1100, desc: 'Cleans what others break.' },
  { name: 'Collector Vane', finds: 900, desc: 'Buys what others find.' },
];

export function paleontologyTipFor(day) {
  return FOSSIL_TIPS[day % FOSSIL_TIPS.length];
}

export function paleontologyLeaderboardWith(playerFinds) {
  const board = FOSSIL_LEADERBOARD.map((e) => ({
    name: e.name, finds: e.name === 'Ria' ? playerFinds : e.finds, desc: e.desc,
  }));
  board.sort((a, b) => b.finds - a.finds);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function paleontologyEfficiency(finds, digs) {
  if (digs === 0) return 0;
  return Math.round((finds / digs) * 100) / 100;
}

export function paleontologyProfitPerDay(earned, digs) {
  if (digs === 0) return 0;
  return Math.round((earned / digs) * 10) / 10;
}

export function paleontologyGrade(finds, broken, skeletons) {
  if (finds === 0) return 'D';
  const score = finds - broken * 10 + skeletons * 30;
  if (score >= 200) return 'S';
  if (score >= 120) return 'A';
  if (score >= 60) return 'B';
  if (score >= 25) return 'C';
  return 'D';
}

export const FOSSIL_RECORDS = [
  { id: 'most-finds', name: 'Most Finds', stat: 'finds', unit: 'finds', desc: 'Most fossils found.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from fossils.' },
  { id: 'skeletons', name: 'Most Skeletons', stat: 'skeletonsSold', unit: 'sold', desc: 'Most skeletons sold.' },
  { id: 'best-find', name: 'Best Find', stat: 'bestValue', unit: '$', desc: 'Most valuable single find.' },
  { id: 'grants', name: 'Most Grants', stat: 'grants', unit: '$', desc: 'Most grant money won.' },
];

export function paleontologyRecordFor(recordId, state) {
  const r = FOSSIL_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function paleontologyAllRecords(state) {
  return FOSSIL_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function paleontologySummary(state) {
  return `Dig ${FOSSIL_RANKS[state.rank].name}: ${state.finds} finds, ${state.skeletons} skeletons, $${Math.round(state.earned)} earned, ${state.grants} grants.`;
}

export function paleontologyNextGoal(state) {
  if (state.finds < 10) return 'Find 10 fossils.';
  if (state.skeletons < 1) return 'Assemble your first skeleton.';
  if (state.rank < 2) return 'Reach rank Fossil Hunter.';
  return 'Find a dinosaur egg in the ash beds.';
}

export const FOSSIL_QUICK_START = [
  'Buy the dig permit before your first dig.',
  'Start at the River Cut — easy finds, easy money.',
  'Clean fossils in the lab before selling them.',
  'Save matching parts to assemble whole skeletons.',
  'Take museum contracts for fossils you already find.',
  'Never sell a rare find to the tourist shop.',
];

export function paleontologyQuickStart(step) {
  return FOSSIL_QUICK_START[step] || null;
}

export const FOSSIL_META = {
  system: 'paleontology', version: '7-B1', author: 'builder-1',
  sites: FOSSIL_SITES.length, finds: FOSSIL_FINDS.length,
  note: 'Bone Beds: dig, clean, assemble, sell.',
};

export const FOSSIL_ERAS = [
  { id: 'devonian', name: 'Devonian', yearsAgo: '419–359M', desc: 'The age of fishes — reefs and early seas.' },
  { id: 'jurassic', name: 'Jurassic', yearsAgo: '201–145M', desc: 'The age of giant dinosaurs.' },
  { id: 'cretaceous', name: 'Cretaceous', yearsAgo: '145–66M', desc: 'The last dinosaurs, and the first flowers.' },
  { id: 'miocene', name: 'Miocene', yearsAgo: '23–5M', desc: 'Grasslands spread; horses and apes appear.' },
  { id: 'pleistocene', name: 'Pleistocene', yearsAgo: '2.6M–11k', desc: 'The ice age — mammoths and sabre-tooths.' },
];

export const FOSSIL_TOOLS = [
  { id: 'trowel', name: 'Hand Trowel', cost: 20, desc: 'The digger’s best friend.' },
  { id: 'pick', name: 'Geologist Pick', cost: 60, desc: 'Breaks rock without breaking fossils.' },
  { id: 'brush-set', name: 'Brush Set', cost: 40, desc: 'Soft brushes for delicate cleaning.' },
  { id: 'sieve-set', name: 'Sieve Set', cost: 50, desc: 'Wash sediment and find the small stuff.' },
  { id: 'plaster', name: 'Plaster Jackets', cost: 70, desc: 'Wrap big bones in plaster for the trip home.' },
  { id: 'field-kit', name: 'Field Kit', cost: 90, desc: 'Glue, labels, and bags for every find.' },
  { id: 'lamp', name: 'Cave Lamp', cost: 45, desc: 'Light for the bone cave.' },
  { id: 'gps', name: 'Site GPS', cost: 110, desc: 'Mark every find on the map.' },
];

export function fossilEraFor(eraId) {
  return FOSSIL_ERAS.find((e) => e.id === eraId) || null;
}

export function fossilToolFor(toolId) {
  return FOSSIL_TOOLS.find((t) => t.id === toolId) || null;
}

export function fossilEraOfSite(siteId) {
  const site = FOSSIL_SITES.find((s) => s.id === siteId);
  if (!site) return null;
  return FOSSIL_ERAS.find((e) => e.name === site.era) || null;
}

export function fossilAgeDescription(findId) {
  const find = FOSSIL_FINDS.find((f) => f.id === findId);
  if (!find) return null;
  const site = FOSSIL_SITES.find((s) => s.id === find.site);
  const era = site ? fossilEraOfSite(site.id) : null;
  return { find: findId, name: find.name, site: find.site, era: era ? era.name : site ? site.era : 'unknown', yearsAgo: era ? era.yearsAgo : 'unknown' };
}

export function createPaleontologyJournal(system) {
  const entries = [];
  let pages = 0;

  function addEntry(text) {
    entries.push({ day: system.state.lastDay, site: system.state.site, text });
    pages += 1;
    return { ok: true, entries: entries.length };
  }

  function logFind(findId) {
    const find = FOSSIL_FINDS.find((f) => f.id === findId);
    if (!find) return { ok: false, reason: 'no-such-find' };
    const age = fossilAgeDescription(findId);
    return addEntry(`Found a ${find.name} — ${age.era}, ${age.yearsAgo} years ago.`);
  }

  function logSkeleton(skeletonId) {
    const sk = FOSSIL_SKELETONS.find((x) => x.id === skeletonId);
    if (!sk) return { ok: false, reason: 'no-such-skeleton' };
    return addEntry(`Assembled the ${sk.name} — a complete skeleton!`);
  }

  function readEntries(limit) {
    const n = limit || entries.length;
    return entries.slice(-n);
  }

  function collectionSummary() {
    const total = Object.values(system.state.inventory).reduce((a, b) => a + b, 0);
    return {
      finds: system.state.finds, skeletons: system.state.skeletons,
      total, bestFind: system.state.bestFind,
      archiveValue: system.state.archiveValue,
    };
  }

  return {
    addEntry, logFind, logSkeleton, readEntries, collectionSummary,
    get entries() { return [...entries]; },
    get pages() { return pages; },
  };
}

export const FOSSIL_FIELD_NOTES = [
  { id: 'layer', name: 'Read the Layers', text: 'Fossils sit in layers — deeper is older. Never dig through a layer blind.' },
  { id: 'label', name: 'Label Everything', text: 'A fossil without a label is just a rock. Write it down.' },
  { id: 'plaster', name: 'Jacket Big Bones', text: 'Wrap a big bone in plaster before you lift it, or it falls apart.' },
  { id: 'sieve', name: 'Sieve the Dirt', text: 'The smallest fossils — teeth, claws, fish scales — hide in the sieve.' },
  { id: 'patience', name: 'Patience', text: 'A good dig takes days. A rushed dig breaks everything.' },
  { id: 'rain', name: 'After Rain', text: 'Rain washes the dust off and exposes new bone.' },
];

export function fossilFieldNoteFor(noteId) {
  return FOSSIL_FIELD_NOTES.find((n) => n.id === noteId) || null;
}
