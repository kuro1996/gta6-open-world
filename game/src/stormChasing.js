// Solara Nights — Storm Chasing / Sky Hunters (Round 7, written fresh).
// Ria chases the weather across Solara's plains: read the radar, drive
// the intercept truck into the storm's path, and film tornadoes,
// lightning, hail and supercells for the news desk and the documentary
// channel. Every storm has a personality — a slow supercell, a fast
// squall line, a hurricane's outer band. Get too close and the hail
// smashes your windshield; get it just right and the footage pays a
// fortune. Radar, armour, cameras and a storm-proof truck gate the
// bigger storms, and the weather service pays a bonus for verified
// reports from inside the storm.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const STORM_TYPES = [
  { id: 'thunder', name: 'Thunderstorm', value: 50, danger: 1, rarity: 0.3, speed: 3, duration: 2, desc: 'A classic summer storm — loud, bright, and common.' },
  { id: 'supercell', name: 'Supercell', value: 150, danger: 3, rarity: 0.12, speed: 2, duration: 4, desc: 'A rotating monster that spawns tornadoes.' },
  { id: 'tornado', name: 'Tornado', value: 300, danger: 5, rarity: 0.05, speed: 4, duration: 1, desc: 'A funnel on the ground. Film it — from a safe distance.' },
  { id: 'hail', name: 'Hailstorm', value: 90, danger: 2, rarity: 0.16, speed: 3, duration: 2, desc: 'Ice the size of golf balls, falling like stones.' },
  { id: 'squall', name: 'Squall Line', value: 80, danger: 2, rarity: 0.18, speed: 5, duration: 3, desc: 'A fast wall of wind and rain that sweeps the plains.' },
  { id: 'hurricane', name: 'Hurricane Band', value: 220, danger: 4, rarity: 0.06, speed: 2, duration: 6, desc: 'The outer band of a hurricane — hours of fury.' },
  { id: 'dust', name: 'Dust Storm', value: 60, danger: 2, rarity: 0.14, speed: 4, duration: 2, desc: 'A brown wall that swallows the horizon.' },
  { id: 'blizzard', name: 'Blizzard', value: 110, danger: 3, rarity: 0.08, speed: 2, duration: 5, desc: 'White-out snow and a wind that cuts like a knife.' },
  { id: 'lightning', name: 'Lightning Show', value: 70, danger: 2, rarity: 0.2, speed: 1, duration: 3, desc: 'A dry storm that paints the sky with bolts.' },
  { id: 'waterspout', name: 'Waterspout', value: 180, danger: 4, rarity: 0.04, speed: 3, duration: 1, desc: 'A tornado over the lagoon — rare and beautiful.' },
];

export const STORM_ZONES = [
  { id: 'plains', name: 'East Plains', district: 'East Flats', storms: 0.9, danger: 1, mult: 1.0, desc: 'Flat, open, and perfect for watching storms form.' },
  { id: 'hills', name: 'North Hills', district: 'North Hills', storms: 0.7, danger: 2, mult: 1.15, desc: 'Storms break over the ridges — dramatic and risky.' },
  { id: 'coast', name: 'South Coast', district: 'Coast', storms: 0.8, danger: 2, mult: 1.2, desc: 'Waterspouts and hurricane bands off the sea.' },
  { id: 'desert', name: 'Dry Flats', district: 'West Flats', storms: 0.6, danger: 1, mult: 1.1, desc: 'Dust storms and dry lightning, far from help.' },
];

export const STORM_BUYERS = [
  { id: 'news', name: 'Solara News Desk', mult: 1.0, likes: ['footage'], dislikes: [], mood: 'steady', minRank: 0, desc: 'Buys storm footage for the evening news.' },
  { id: 'documentary', name: 'Documentary Channel', mult: 1.4, likes: ['rare'], dislikes: [], mood: 'fancy', minRank: 2, desc: 'Pays for the rarest, most dramatic footage.' },
  { id: 'weather', name: 'Weather Service', mult: 1.2, likes: ['report'], dislikes: [], mood: 'steady', minRank: 1, desc: 'Pays for verified storm reports and data.' },
  { id: 'viral', name: 'Viral Clips', mult: 1.6, likes: ['tornado'], dislikes: [], mood: 'odd', minRank: 3, desc: 'Tornado clips go viral — big money, fast.' },
  { id: 'insurance', name: 'Insurance Office', mult: 0.9, likes: ['damage'], dislikes: [], mood: 'quick', minRank: 0, desc: 'Buys damage footage, cheap and fast.' },
];

export const STORM_UPGRADES = [
  { id: 'radar', name: 'Storm Radar', cost: 150, desc: 'See storms coming: +30% intercept chance.', effect: 'radar' },
  { id: 'camera', name: 'Pro Camera', cost: 220, desc: 'Sharp footage: footage value +25%.', effect: 'camera' },
  { id: 'armour', name: 'Hail Armour', cost: 320, desc: 'Hail damage halved on the truck.', effect: 'armour' },
  { id: 'truck', name: 'Intercept Truck', cost: 500, desc: 'Chase faster storms: +2 speed.', effect: 'truck' },
  { id: 'drone', name: 'Storm Drone', cost: 650, desc: 'Film from above: tornado footage +40%.', effect: 'drone' },
  { id: 'anemometer', name: 'Anemometer', cost: 180, desc: 'Measure the wind: reports pay +20%.', effect: 'wind' },
  { id: 'rollcage', name: 'Roll Cage', cost: 420, desc: 'Survive the worst: danger -1 on every storm.', effect: 'cage' },
  { id: 'satellite', name: 'Satellite Link', cost: 1000, desc: 'Live-stream the chase: footage pays double.', effect: 'live' },
];

export const STORM_RANKS = [
  { level: 0, name: 'Weather Watcher', xp: 0, perk: 'Base prices, base footage.' },
  { level: 1, name: 'Storm Chaser', xp: 120, perk: '+10% footage prices.' },
  { level: 2, name: 'Interceptor', xp: 300, perk: '+10% intercept chance.' },
  { level: 3, name: 'Storm Hunter', xp: 620, perk: '+20% footage prices, the documentary buys.' },
  { level: 4, name: 'Master of the Sky', xp: 1100, perk: '+30% footage prices, tornadoes doubled.' },
];

export const STORM_FOOTAGE = [
  { id: 'bolt', name: 'Lightning Bolt', value: 40, storm: 'lightning', desc: 'A bolt forks across the whole sky.' },
  { id: 'funnel', name: 'Tornado Funnel', value: 200, storm: 'tornado', desc: 'The funnel touches down — the money shot.' },
  { id: 'hailstone', name: 'Giant Hailstone', value: 60, storm: 'hail', desc: 'A hailstone the size of a grapefruit.' },
  { id: 'wall-cloud', name: 'Wall Cloud', value: 90, storm: 'supercell', desc: 'A rotating wall cloud, low and menacing.' },
  { id: 'shelf-cloud', name: 'Shelf Cloud', value: 50, storm: 'squall', desc: 'A shelf cloud rolling in like a wave.' },
  { id: 'spout', name: 'Waterspout Column', value: 150, storm: 'waterspout', desc: 'A column of water and wind over the lagoon.' },
  { id: 'dust-wall', name: 'Dust Wall', value: 45, storm: 'dust', desc: 'A brown wall swallowing the horizon.' },
  { id: 'whiteout', name: 'Whiteout', value: 70, storm: 'blizzard', desc: 'Snow so thick the world disappears.' },
];

export const STORM_EVENTS = [
  { id: 'outbreak', name: 'Tornado Outbreak', mult: 1.6, storms: ['tornado', 'supercell'], desc: 'Multiple tornadoes on the ground at once.' },
  { id: 'hurricane-landfall', name: 'Hurricane Landfall', mult: 1.5, storms: ['hurricane', 'waterspout'], desc: 'The hurricane comes ashore — stay safe, film everything.' },
  { id: 'heat-wave', name: 'Heat Wave', mult: 0.7, storms: [], desc: 'Hot, still air — no storms today.' },
  { id: 'cold-front', name: 'Cold Front', mult: 1.4, storms: ['squall', 'thunder', 'hail'], desc: 'A sharp front sweeps in — storms everywhere.' },
  { id: 'dry-lightning', name: 'Dry Lightning', mult: 1.3, storms: ['lightning', 'dust'], desc: 'Bolts without rain — and fire risk.' },
  { id: 'blizzard-blast', name: 'Blizzard Blast', mult: 1.4, storms: ['blizzard'], desc: 'A blizzard buries the north hills.' },
];

export const STORM_CONTRACTS = [
  { id: 'footage-10', name: 'News Footage', footage: 'bolt', qty: 4, pay: 300, days: 2, rep: 0, desc: 'The news desk needs four lightning clips.' },
  { id: 'funnel-1', name: 'The Funnel', footage: 'funnel', qty: 1, pay: 600, days: 3, rep: 2, desc: 'One tornado funnel, filmed clean.' },
  { id: 'supercell-2', name: 'Supercell Study', footage: 'wall-cloud', qty: 2, pay: 480, days: 3, rep: 1, desc: 'Two wall-cloud clips for the weather service.' },
  { id: 'hail-3', name: 'Hail Report', footage: 'hailstone', qty: 3, pay: 360, days: 2, rep: 1, desc: 'Three hailstone clips for the insurance office.' },
  { id: 'spout-1', name: 'The Spout', footage: 'spout', qty: 1, pay: 700, days: 3, rep: 3, desc: 'One waterspout over the lagoon.' },
  { id: 'storm-5', name: 'Storm Week', footage: 'bolt', qty: 8, pay: 520, days: 3, rep: 2, desc: 'Eight storm clips of any kind this week.' },
];

export const STORM_HAZARDS = [
  { id: 'hail-damage', name: 'Hail Damage', chance: 0.1, damage: 1, desc: 'Hail dents the truck and cracks a window.' },
  { id: 'flash-flood', name: 'Flash Flood', chance: 0.06, damage: 2, desc: 'Water rises fast on the low road.' },
  { id: 'lightning-strike', name: 'Near Strike', chance: 0.05, damage: 2, desc: 'A bolt hits the ground metres away.' },
  { id: 'debris', name: 'Flying Debris', chance: 0.08, damage: 1, desc: 'The wind throws a fence panel at the truck.' },
  { id: 'whiteout-lost', name: 'Lost in Whiteout', chance: 0.07, damage: 1, desc: 'You cannot see the road at all.' },
];

export function stormRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < STORM_RANKS.length; i++) {
    if (xp >= STORM_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function stormFootageValue(footage, rank, upgrades) {
  let price = footage.value;
  price *= 1 + rank * 0.1;
  if (upgrades.includes('camera')) price *= 1.25;
  if (upgrades.includes('live')) price *= 2;
  if (footage.storm === 'tornado' && upgrades.includes('drone')) price *= 1.4;
  return Math.max(1, Math.round(price));
}

export function stormBuyerPrice(footage, buyerId, rank, upgrades) {
  const buyer = STORM_BUYERS.find((b) => b.id === buyerId);
  if (!buyer) return 0;
  let mult = buyer.mult;
  if (footage.storm === 'tornado' && buyer.likes.includes('tornado')) mult += 0.3;
  if (footage.value >= 150 && buyer.likes.includes('rare')) mult += 0.2;
  if (buyer.likes.includes('footage')) mult += 0.1;
  return Math.max(1, Math.round(stormFootageValue(footage, rank, upgrades) * mult));
}

export function stormInterceptChance(storm, rank, upgrades) {
  let chance = 0.6 + rank * 0.05;
  if (upgrades.includes('radar')) chance += 0.3;
  if (upgrades.includes('truck')) chance += 0.1;
  chance -= (storm.speed - 1) * 0.05;
  return Math.max(0.1, Math.min(0.95, chance));
}

export function createStormChasingSystem(ctx) {
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
    chases: 0,
    intercepts: 0,
    misses: 0,
    footageShot: 0,
    footageSold: 0,
    reports: 0,
    earned: 0,
    spent: 0,
    damage: 0,
    repairs: 0,
    repairCost: 0,
    truckHealth: 100,
    footage: {},
    upgrades: [],
    storm: null,
    stormTimeLeft: 0,
    chaseProgress: 0,
    lastDay: 1,
    activeContract: null,
    contractProgress: 0,
    contractsDone: 0,
    contractsFailed: 0,
    bestStorm: null,
    bestValue: 0,
    dailyChases: 0,
    dailyEarned: 0,
    currentEvent: null,
    closest: 999,
    zone: null,
  };
  for (const f of STORM_FOOTAGE) state.footage[f.id] = 0;

  function refreshRank() {
    const r = stormRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Storm rank up: ${STORM_RANKS[r].name} — ${STORM_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function pickStorm(zoneId) {
    const bag = [];
    for (const s of STORM_TYPES) {
      let w = s.rarity;
      if (state.currentEvent) {
        const ev = STORM_EVENTS.find((e) => e.id === state.currentEvent);
        if (ev && ev.storms.includes(s.id)) w *= ev.mult;
      }
      bag.push({ s, w });
    }
    let total = 0;
    for (const b of bag) total += b.w;
    let roll = rng() * total;
    for (const b of bag) {
      roll -= b.w;
      if (roll <= 0) return b.s;
    }
    return bag[0].s;
  }

  function startChase(zoneId) {
    const zone = STORM_ZONES.find((z) => z.id === zoneId);
    if (!zone) return { ok: false, reason: 'no-such-zone' };
    if (state.storm) return { ok: false, reason: 'chase-active' };
    if (state.truckHealth < 30) return { ok: false, reason: 'truck-damaged', health: state.truckHealth };
    const storm = pickStorm(zoneId);
    state.storm = storm.id;
    state.zone = zoneId;
    state.chaseProgress = 0;
    state.stormTimeLeft = storm.duration * 60;
    log(`Storm spotted over ${zone.name}: a ${storm.name} — ${storm.desc} Chase it!`);
    return { ok: true, storm: storm.id, name: storm.name, zone: zoneId };
  }

  function drive() {
    if (!state.storm) return { ok: false, reason: 'no-storm' };
    const storm = STORM_TYPES.find((s) => s.id === state.storm);
    const speed = 1 + (state.upgrades.includes('truck') ? 1 : 0);
    state.chaseProgress += speed;
    const need = storm.speed * 2;
    if (rng() < 0.12) {
      const h = STORM_HAZARDS[Math.floor(rng() * STORM_HAZARDS.length)];
      let dmg = h.damage * 10;
      if (state.upgrades.includes('armour') && h.id === 'hail-damage') dmg = Math.floor(dmg / 2);
      if (state.upgrades.includes('rollcage')) dmg = Math.floor(dmg * 0.7);
      state.truckHealth = Math.max(0, state.truckHealth - dmg);
      state.damage += dmg;
      log(`Hazard: ${h.name} — ${h.desc} Truck -${dmg}%.`);
      if (state.truckHealth <= 0) {
        state.storm = null;
        state.stormTimeLeft = 0;
        state.chaseProgress = 0;
        state.misses += 1;
        log('The truck is wrecked — the chase is over. Repair it.');
        return { ok: true, wrecked: true };
      }
    }
    if (state.chaseProgress >= need) {
      return intercept();
    }
    return { ok: true, progress: state.chaseProgress, need, done: false };
  }

  function intercept() {
    if (!state.storm) return { ok: false, reason: 'no-storm' };
    const storm = STORM_TYPES.find((s) => s.id === state.storm);
    const chance = stormInterceptChance(storm, state.rank, state.upgrades);
    const roll = rng();
    state.chases += 1;
    state.dailyChases += 1;
    if (roll > chance) {
      state.misses += 1;
      state.storm = null;
      state.stormTimeLeft = 0;
      state.chaseProgress = 0;
      log(`The ${storm.name} outran you — it dissolves over the hills.`);
      return { ok: true, intercepted: false, storm: storm.id };
    }
    state.intercepts += 1;
    const distance = Math.floor(rng() * 5) + 1;
    state.closest = Math.min(state.closest, distance);
    gainXp(15 + storm.danger * 10);
    log(`INTERCEPT! You are ${distance} km from the ${storm.name} — film everything.`);
    return { ok: true, intercepted: true, storm: storm.id, distance };
  }

  function film() {
    if (!state.storm) return { ok: false, reason: 'no-storm' };
    const storm = STORM_TYPES.find((s) => s.id === state.storm);
    const clips = STORM_FOOTAGE.filter((f) => f.storm === storm.id);
    const clip = clips.length > 0 ? clips[Math.floor(rng() * clips.length)] : STORM_FOOTAGE[0];
    const danger = storm.danger - (state.upgrades.includes('rollcage') ? 1 : 0);
    if (rng() < danger * 0.05) {
      const h = STORM_HAZARDS[Math.floor(rng() * STORM_HAZARDS.length)];
      state.truckHealth = Math.max(0, state.truckHealth - h.damage * 8);
      state.damage += h.damage * 8;
      log(`Too close! ${h.name} — ${h.desc}`);
    }
    state.footage[clip.id] += 1;
    state.footageShot += 1;
    gainXp(8 + storm.danger * 3);
    if (storm.value > state.bestValue) { state.bestValue = storm.value; state.bestStorm = storm.id; }
    if (state.activeContract) checkContract(clip.id, 1);
    log(`Filmed: ${clip.name} — ${clip.desc}`);
    return { ok: true, footage: clip.id, name: clip.name, storm: storm.id };
  }

  function endChase() {
    if (!state.storm) return { ok: false, reason: 'no-storm' };
    const s = state.storm;
    state.storm = null;
    state.stormTimeLeft = 0;
    state.chaseProgress = 0;
    state.zone = null;
    log(`Chase over — the ${s} moves on. Sell the footage.`);
    return { ok: true, storm: s };
  }

  function fileReport() {
    if (!state.storm) return { ok: false, reason: 'no-storm' };
    const storm = STORM_TYPES.find((s) => s.id === state.storm);
    const pay = Math.round(storm.value * 0.5 * (1 + state.rank * 0.1) * (state.upgrades.includes('wind') ? 1.2 : 1));
    state.reports += 1;
    state.earned += pay;
    state.dailyEarned += pay;
    addCash(pay);
    gainXp(10);
    log(`Filed a verified report on the ${storm.name} — the weather service pays $${pay}.`);
    return { ok: true, pay, storm: storm.id };
  }

  function repairTruck() {
    if (state.truckHealth >= 100) return { ok: false, reason: 'no-damage' };
    const missing = 100 - state.truckHealth;
    const cost = Math.round(missing * 2);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.repairCost += cost;
    state.repairs += 1;
    state.truckHealth = 100;
    log(`Truck repaired for $${cost} — good as new.`);
    return { ok: true, cost };
  }

  function sellFootage(buyerId, footageId, qty) {
    const buyer = STORM_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    if (state.rank < buyer.minRank) return { ok: false, reason: 'rank-too-low', need: buyer.minRank };
    const footage = STORM_FOOTAGE.find((f) => f.id === footageId);
    if (!footage) return { ok: false, reason: 'no-such-footage' };
    const have = state.footage[footageId] || 0;
    if (qty <= 0 || have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = stormBuyerPrice(footage, buyerId, state.rank, state.upgrades);
    const total = unit * qty;
    state.footage[footageId] -= qty;
    state.footageSold += qty;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(qty * 3);
    log(`Sold ${qty}x ${footage.name} to ${buyer.name} for $${total}.`);
    return { ok: true, total, unit, qty };
  }

  function sellAll(buyerId) {
    const buyer = STORM_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    let total = 0;
    let units = 0;
    const lines = [];
    for (const f of STORM_FOOTAGE) {
      const q = state.footage[f.id] || 0;
      if (q <= 0) continue;
      const unit = stormBuyerPrice(f, buyerId, state.rank, state.upgrades);
      const line = unit * q;
      total += line; units += q;
      lines.push({ id: f.id, qty: q, total: line });
      state.footage[f.id] = 0;
    }
    if (units === 0) return { ok: false, reason: 'nothing-to-sell' };
    state.footageSold += units;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(units);
    log(`Sold all footage to ${buyer.name} for $${total}.`);
    return { ok: true, total, units, lines };
  }

  function buyUpgrade(id) {
    const u = STORM_UPGRADES.find((x) => x.id === id);
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
    const ct = STORM_CONTRACTS.find((x) => x.id === id);
    if (!ct) return { ok: false, reason: 'no-such-contract' };
    if (state.activeContract) return { ok: false, reason: 'contract-active' };
    if (state.rank < ct.rep) return { ok: false, reason: 'rep-too-low', need: ct.rep };
    state.activeContract = { ...ct, dayTaken: getDay(), deadlineDay: getDay() + ct.days };
    state.contractProgress = 0;
    log(`Contract taken: ${ct.name} — ${ct.qty}x ${ct.footage} by day ${state.activeContract.deadlineDay}.`);
    return { ok: true, contract: state.activeContract };
  }

  function checkContract(footageId, qty) {
    const ct = state.activeContract;
    if (!ct) return;
    if (ct.id === 'storm-5') {
      state.contractProgress += qty;
    } else if (ct.footage !== footageId) {
      return;
    } else {
      state.contractProgress += qty;
    }
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

  function priceBoard() {
    return STORM_FOOTAGE.map((f) => ({
      id: f.id, name: f.name,
      price: stormFootageValue(f, state.rank, state.upgrades),
      stock: state.footage[f.id], storm: f.storm,
    }));
  }

  function stormReport() {
    return STORM_TYPES.map((s) => ({
      id: s.id, name: s.name, value: s.value, danger: s.danger,
      speed: s.speed, duration: s.duration,
      interceptChance: Math.round(stormInterceptChance(s, state.rank, state.upgrades) * 100) / 100,
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.2) {
      const ev = STORM_EVENTS[Math.floor(rng() * STORM_EVENTS.length)];
      state.currentEvent = ev.id;
      log(`Weather news: ${ev.name} — ${ev.desc}`);
      return { event: ev.id, name: ev.name };
    }
    if (roll < 0.3) {
      const free = STORM_FOOTAGE[Math.floor(rng() * STORM_FOOTAGE.length)];
      state.footage[free.id] += 1;
      state.footageShot += 1;
      log(`A fellow chaser shares a clip: ${free.name}.`);
      return { event: 'gift', footage: free.id };
    }
    state.currentEvent = null;
    return { event: 'none' };
  }

  function tick(dt) {
    if (state.storm) {
      state.stormTimeLeft -= dt;
      if (state.stormTimeLeft <= 0) {
        const s = state.storm;
        state.storm = null;
        state.stormTimeLeft = 0;
        state.chaseProgress = 0;
        state.zone = null;
        state.misses += 1;
        log(`The ${s} dissipates before you reach it — too slow.`);
      }
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyChases = 0;
    state.dailyEarned = 0;
    if (state.activeContract && day >= state.activeContract.deadlineDay && state.contractProgress < state.activeContract.qty) {
      log(`Contract ${state.activeContract.name} expired — the client walked away.`);
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractsFailed += 1;
    }
    if (state.truckHealth < 100) {
      state.truckHealth = Math.min(100, state.truckHealth + 5);
    }
    dailyEvent();
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, chases: state.chases,
      intercepts: state.intercepts, misses: state.misses,
      footageShot: state.footageShot, footageSold: state.footageSold,
      reports: state.reports, earned: state.earned, spent: state.spent,
      damage: state.damage, repairs: state.repairs, repairCost: state.repairCost,
      truckHealth: state.truckHealth, footage: state.footage,
      upgrades: state.upgrades, storm: state.storm,
      stormTimeLeft: state.stormTimeLeft, chaseProgress: state.chaseProgress,
      lastDay: state.lastDay, activeContract: state.activeContract,
      contractProgress: state.contractProgress, contractsDone: state.contractsDone,
      contractsFailed: state.contractsFailed, bestStorm: state.bestStorm,
      bestValue: state.bestValue, dailyChases: state.dailyChases,
      dailyEarned: state.dailyEarned, currentEvent: state.currentEvent,
      closest: state.closest, zone: state.zone,
    }));
  }

  function deserialize(d) {
    if (!d || typeof d !== 'object') return;
    for (const k of Object.keys(state)) {
      if (d[k] !== undefined) state[k] = d[k];
    }
    for (const f of STORM_FOOTAGE) {
      if (state.footage[f.id] === undefined) state.footage[f.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: STORM_RANKS[state.rank].name,
      xp: state.xp,
      chases: state.chases,
      intercepts: state.intercepts,
      misses: state.misses,
      footageShot: state.footageShot,
      footageSold: state.footageSold,
      reports: state.reports,
      earned: Math.round(state.earned),
      spent: state.spent,
      damage: state.damage,
      repairs: state.repairs,
      truckHealth: state.truckHealth,
      upgrades: state.upgrades.length,
      storm: state.storm,
      zone: state.zone,
      activeContract: state.activeContract ? state.activeContract.id : null,
      contractsDone: state.contractsDone,
      contractsFailed: state.contractsFailed,
      bestStorm: state.bestStorm,
      dailyChases: state.dailyChases,
      dailyEarned: Math.round(state.dailyEarned),
      closest: state.closest === 999 ? null : state.closest,
      event: state.currentEvent,
    };
  }

  function hudLine() {
    if (state.storm) {
      const s = STORM_TYPES.find((x) => x.id === state.storm);
      return `Storm: chasing ${s ? s.name : state.storm} — ${state.chaseProgress} driven`;
    }
    if (state.activeContract) return `Storm: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    const total = Object.values(state.footage).reduce((a, b) => a + b, 0);
    if (total > 0) return `Storm: ${total} clips to sell`;
    if (state.truckHealth < 100) return `Storm: truck ${state.truckHealth}% — repair it`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearPlains = Math.hypot(pos.x - 700, pos.z - 500) < 40;
    if (!nearPlains) return false;
    if (!state.storm) { startChase('plains'); return true; }
    drive();
    return true;
  }

  return {
    state, startChase, drive, intercept, film, endChase,
    fileReport, repairTruck, sellFootage, sellAll, buyUpgrade,
    takeContract, deliverContract, abandonContract,
    priceBoard, stormReport, dailyEvent,
    tick, tickDay, serialize, deserialize, stats, hudLine, interact,
  };
}

export const STORM_HELPERS = [
  { id: 'spotter', name: 'Spotter June', wage: 35, skill: 'spot', bonus: 0.25, desc: 'Spots storms early: +25% intercept chance.' },
  { id: 'driver', name: 'Driver Max', wage: 50, skill: 'drive', bonus: 0.2, desc: 'Drives fast and smooth: chases finish quicker.' },
  { id: 'cameraman', name: 'Cameraman Lee', wage: 55, skill: 'film', bonus: 0.25, desc: 'Steady hands: +25% footage value.' },
  { id: 'mechanic', name: 'Mechanic Rosa', wage: 45, skill: 'repair', bonus: 0.3, desc: 'Fixes the truck cheap: repairs -30%.' },
];

export const STORM_CHALLENGES = [
  { id: 'chases-10', name: 'Ten Chases', target: 'chases', goal: 10, xp: 80, desc: 'Start 10 storm chases.' },
  { id: 'intercepts-8', name: 'Interceptor', target: 'intercepts', goal: 8, xp: 120, desc: 'Intercept 8 storms.' },
  { id: 'footage-20', name: 'Footage Pro', target: 'footageShot', goal: 20, xp: 100, desc: 'Shoot 20 clips of footage.' },
  { id: 'earn-1000', name: 'Sky Purse', target: 'earned', goal: 1000, xp: 120, desc: 'Earn $1,000 from storm chasing.' },
  { id: 'tornado-1', name: 'Tornado Hunter', target: 'bestValue', goal: 300, xp: 200, desc: 'Chase a storm worth $300 or more.' },
  { id: 'reports-5', name: 'Weather Reporter', target: 'reports', goal: 5, xp: 120, desc: 'File 5 verified storm reports.' },
  { id: 'close-1', name: 'Too Close', target: 'closest', goal: 1, xp: 150, desc: 'Get within 1 km of a storm.' },
  { id: 'contracts-5', name: 'Reliable Chaser', target: 'contractsDone', goal: 5, xp: 140, desc: 'Complete 5 storm contracts.' },
];

export const STORM_ACHIEVEMENTS = [
  { id: 'first-chase', name: 'First Chase', check: (s) => s.chases >= 1, desc: 'Start your first storm chase.' },
  { id: 'first-intercept', name: 'First Intercept', check: (s) => s.intercepts >= 1, desc: 'Intercept your first storm.' },
  { id: 'first-tornado', name: 'Tornado!', check: (s) => s.bestStorm === 'tornado', desc: 'Intercept a tornado.' },
  { id: 'rank-3', name: 'Storm Hunter', check: (s) => s.rank >= 3, desc: 'Reach rank Storm Hunter.' },
  { id: 'rich-chaser', name: 'Rich Chaser', check: (s) => s.earned >= 3000, desc: 'Earn $3,000 from storm chasing.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every storm upgrade.' },
  { id: 'no-wreck', name: 'Careful Driver', check: (s) => s.chases >= 15 && s.damage === 0, desc: 'Chase 15 storms without truck damage.' },
  { id: 'viral', name: 'Viral Clip', check: (s) => s.footageSold >= 10, desc: 'Sell 10 clips of footage.' },
];

export function stormHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of STORM_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function stormChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  if (challenge.id === 'close-1') {
    return { id: challenge.id, name: challenge.name, have: state.closest === 999 ? 0 : state.closest, goal: challenge.goal, done: state.closest <= 1 };
  }
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function createStormChasingExtras(system) {
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  function hireHelper(id) {
    const h = STORM_HELPERS.find((x) => x.id === id);
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
      const h = STORM_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    wagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: wagesPaid };
  }

  function helperBonus(skill) {
    return stormHelperBonus(helpers, skill);
  }

  function challenges() {
    return STORM_CHALLENGES.map((ch) => stormChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = STORM_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = stormChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return STORM_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function forecast() {
    return { storm: system.state.storm, zone: system.state.zone, event: system.state.currentEvent, truckHealth: system.state.truckHealth };
  }

  function inventoryValue() {
    let total = 0;
    for (const f of STORM_FOOTAGE) {
      total += (system.state.footage[f.id] || 0) * f.value;
    }
    return { ok: true, value: Math.round(total) };
  }

  function truckStatus() {
    return { health: system.state.truckHealth, damage: system.state.damage, repairs: system.state.repairs, repairCost: system.state.repairCost };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, forecast, inventoryValue, truckStatus,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return wagesPaid; },
  };
}

export const STORM_TIPS = [
  { id: 'radar-first', name: 'Radar First', text: 'A storm radar turns guessing into chasing.' },
  { id: 'distance', name: 'Keep Distance', text: 'The money shot is close — but not too close.' },
  { id: 'tornado', name: 'Tornadoes', text: 'Film a tornado from the side, never from the path.' },
  { id: 'hail', name: 'Hail', text: 'Armour first, then chase the hail core.' },
  { id: 'report', name: 'File Reports', text: 'The weather service pays for every verified report.' },
  { id: 'live', name: 'Go Live', text: 'A satellite link doubles every clip’s value.' },
  { id: 'front', name: 'Cold Fronts', text: 'Cold fronts bring the best storms of the season.' },
  { id: 'repair', name: 'Repair Often', text: 'A damaged truck cannot chase. Fix it early.' },
];

export const STORM_LEADERBOARD = [
  { name: 'Spotter June', intercepts: 320, desc: 'Sees storms before the radar does.' },
  { name: 'Driver Max', intercepts: 240, desc: 'Outruns every squall line.' },
  { name: 'Ria', intercepts: 0, desc: 'You. Climbing.' },
  { name: 'Cameraman Lee', intercepts: 190, desc: 'Films what others miss.' },
  { name: 'Mechanic Rosa', intercepts: 140, desc: 'Keeps the fleet rolling.' },
];

export function stormTipFor(day) {
  return STORM_TIPS[day % STORM_TIPS.length];
}

export function stormLeaderboardWith(playerIntercepts) {
  const board = STORM_LEADERBOARD.map((e) => ({
    name: e.name, intercepts: e.name === 'Ria' ? playerIntercepts : e.intercepts, desc: e.desc,
  }));
  board.sort((a, b) => b.intercepts - a.intercepts);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function stormEfficiency(intercepts, chases) {
  if (chases === 0) return 0;
  return Math.round((intercepts / chases) * 100);
}

export function stormProfitPerChase(earned, chases) {
  if (chases === 0) return 0;
  return Math.round((earned / chases) * 10) / 10;
}

export function stormGrade(intercepts, misses, footageShot) {
  const total = intercepts + misses;
  if (total === 0) return 'D';
  const rate = intercepts / total;
  if (rate >= 0.9 && footageShot >= 10) return 'S';
  if (rate >= 0.75) return 'A';
  if (rate >= 0.6) return 'B';
  if (rate >= 0.4) return 'C';
  return 'D';
}

export const STORM_RECORDS = [
  { id: 'most-intercepts', name: 'Most Intercepts', stat: 'intercepts', unit: 'storms', desc: 'Most storms intercepted.' },
  { id: 'most-footage', name: 'Most Footage', stat: 'footageShot', unit: 'clips', desc: 'Most clips filmed.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from storm chasing.' },
  { id: 'closest', name: 'Closest Approach', stat: 'closest', unit: 'km', desc: 'Closest you ever got to a storm.' },
  { id: 'reports', name: 'Most Reports', stat: 'reports', unit: 'reports', desc: 'Most verified storm reports.' },
];

export function stormRecordFor(recordId, state) {
  const r = STORM_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function stormAllRecords(state) {
  return STORM_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function stormSummary(state) {
  return `Storm ${STORM_RANKS[state.rank].name}: ${state.intercepts} intercepts, ${state.footageShot} clips, $${Math.round(state.earned)} earned, truck ${state.truckHealth}%.`;
}

export function stormNextGoal(state) {
  if (state.chases < 5) return 'Start 5 storm chases.';
  if (state.intercepts < 5) return 'Intercept 5 storms.';
  if (state.rank < 2) return 'Reach rank Interceptor.';
  return 'Film a tornado funnel up close.';
}

export const STORM_QUICK_START = [
  'Buy the storm radar before your first chase.',
  'Start on the East Plains — flat, open, and safe.',
  'Film every storm you intercept — footage is money.',
  'File a report after every intercept for extra pay.',
  'Repair the truck before it drops below 30%.',
  'Never chase a tornado without the roll cage.',
];

export function stormQuickStart(step) {
  return STORM_QUICK_START[step] || null;
}

export const STORM_META = {
  system: 'stormChasing', version: '7-B1', author: 'builder-1',
  storms: STORM_TYPES.length, zones: STORM_ZONES.length,
  note: 'Sky Hunters: chase, intercept, film, sell.',
};

export const STORM_SCALES = [
  { id: 'ef0', name: 'EF0', windMin: 105, windMax: 137, damage: 'Light — branches down, shingles off.', desc: 'A weak tornado, still dangerous.' },
  { id: 'ef1', name: 'EF1', windMin: 138, windMax: 177, damage: 'Moderate — roofs damaged, cars moved.', desc: 'A serious tornado.' },
  { id: 'ef2', name: 'EF2', windMin: 178, windMax: 217, damage: 'Considerable — roofs torn off, trees snapped.', desc: 'A strong tornado.' },
  { id: 'ef3', name: 'EF3', windMin: 218, windMax: 266, damage: 'Severe — houses destroyed, trains overturned.', desc: 'A violent tornado.' },
  { id: 'ef4', name: 'EF4', windMin: 267, windMax: 322, damage: 'Devastating — houses levelled, cars thrown.', desc: 'A devastating tornado.' },
  { id: 'ef5', name: 'EF5', windMin: 323, windMax: 500, damage: 'Incredible — everything in its path destroyed.', desc: 'The strongest tornado on Earth.' },
];

export const STORM_SAFETY = [
  { id: 'distance', name: 'Keep Your Distance', text: 'Stay at least 2 km from a tornado. The money shot is not worth your life.' },
  { id: 'escape', name: 'Always Have an Escape', text: 'Never let the storm cut off your road out. Plan two exits.' },
  { id: 'hail', name: 'Hail Means Leave', text: 'Golf-ball hail means the core is on you. Drive away, now.' },
  { id: 'flood', name: 'Never Drive Through Water', text: 'Six inches of water can float a truck. Turn around.' },
  { id: 'lightning', name: 'Lightning Kills', text: 'If you can hear thunder, you can be struck. Stay in the truck.' },
  { id: 'night', name: 'Night Chasing', text: 'Tornadoes at night are invisible. Do not chase after dark.' },
  { id: 'fuel', name: 'Fuel Up', text: 'A chase can run for hours. Never start with less than half a tank.' },
  { id: 'radio', name: 'Listen to the Radio', text: 'The weather service sees more than you do. Listen.' },
];

export function stormScaleFor(windKmh) {
  for (const s of STORM_SCALES) {
    if (windKmh >= s.windMin && windKmh <= s.windMax) return s;
  }
  if (windKmh > 500) return STORM_SCALES[STORM_SCALES.length - 1];
  return STORM_SCALES[0];
}

export function stormSafetyFor(ruleId) {
  return STORM_SAFETY.find((r) => r.id === ruleId) || null;
}

export function stormSafetyCheck(state) {
  const issues = [];
  if (state.truckHealth < 50) issues.push('Truck health below 50% — repair before chasing.');
  if (state.storm && STORM_TYPES.find((s) => s.id === state.storm && s.danger >= 5)) {
    issues.push('Tornado on the ground — keep at least 2 km away.');
  }
  if (!state.upgrades.includes('radar')) issues.push('No storm radar — you are chasing blind.');
  return { safe: issues.length === 0, issues };
}

export function stormWindEstimate(stormId, rank) {
  const storm = STORM_TYPES.find((s) => s.id === stormId);
  if (!storm) return 0;
  return Math.round(60 + storm.danger * 40 + rank * 10);
}

export function createStormChasingLog(system) {
  const entries = [];
  let clips = 0;

  function addEntry(text) {
    entries.push({ day: system.state.lastDay, storm: system.state.storm, text });
    return { ok: true, entries: entries.length };
  }

  function logChase(stormId) {
    const storm = STORM_TYPES.find((s) => s.id === stormId);
    if (!storm) return { ok: false, reason: 'no-such-storm' };
    return addEntry(`Chased a ${storm.name} in ${system.state.zone || 'unknown zone'}.`);
  }

  function logIntercept(stormId, distance) {
    const storm = STORM_TYPES.find((s) => s.id === stormId);
    if (!storm) return { ok: false, reason: 'no-such-storm' };
    clips += 1;
    return addEntry(`Intercepted a ${storm.name} at ${distance} km — filmed it.`);
  }

  function readEntries(limit) {
    const n = limit || entries.length;
    return entries.slice(-n);
  }

  function chaseSummary() {
    return {
      chases: system.state.chases,
      intercepts: system.state.intercepts,
      footageShot: system.state.footageShot,
      clips,
      bestStorm: system.state.bestStorm,
      closest: system.state.closest,
    };
  }

  return {
    addEntry, logChase, logIntercept, readEntries, chaseSummary,
    get entries() { return [...entries]; },
    get clips() { return clips; },
  };
}

export const STORM_RADAR_SIGNS = [
  { id: 'hook', name: 'Hook Echo', text: 'A hook on the radar — a tornado may be forming.' },
  { id: 'bow', name: 'Bow Echo', text: 'A bow shape means damaging straight-line winds.' },
  { id: 'bwer', name: 'Bounded Weak Echo', text: 'A hole in the storm — a strong updraft, a supercell.' },
  { id: 'debris', name: 'Debris Ball', text: 'Debris on radar — a tornado is on the ground.' },
  { id: 'hail-core', name: 'Hail Core', text: 'A bright core — large hail is falling there.' },
  { id: 'gust-front', name: 'Gust Front', text: 'A thin line ahead of the storm — wind is coming.' },
];

export function stormRadarSignFor(signId) {
  return STORM_RADAR_SIGNS.find((s) => s.id === signId) || null;
}

export function stormRadarSignsFor(stormId) {
  const storm = STORM_TYPES.find((s) => s.id === stormId);
  if (!storm) return [];
  if (storm.id === 'tornado' || storm.id === 'supercell') return STORM_RADAR_SIGNS.filter((s) => ['hook', 'bwer', 'debris'].includes(s.id));
  if (storm.id === 'squall') return STORM_RADAR_SIGNS.filter((s) => ['bow', 'gust-front'].includes(s.id));
  if (storm.id === 'hail') return STORM_RADAR_SIGNS.filter((s) => ['hail-core'].includes(s.id));
  return STORM_RADAR_SIGNS.slice(0, 2);
}
