// Solara Nights — Mining / Deep Shaft (Round 7, written fresh).
// Ria works the old Crown Quarry and the deep shafts under the north
// hills: pick, drill, blast and haul ore to the surface, then smelt it
// into bars or sell raw to the foundry. Rich veins hide behind hard
// rock; a careless blast can cave a tunnel, and gas pockets punish
// miners who skip the canary. Upgrades buy better picks, drills, carts
// and a smelter of your own; the foundry pays a premium for pure bars,
// and the gem cutter in Old Town pays wild money for cut stones.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const MINING_ORES = [
  { id: 'coal', name: 'Coal', value: 4, hardness: 1, rarity: 0.3, depth: 1, smelt: 'coke', barValue: 7, desc: 'Black, dusty, and always in demand.' },
  { id: 'iron', name: 'Iron Ore', value: 9, hardness: 2, rarity: 0.24, depth: 1, smelt: 'iron-bar', barValue: 22, desc: 'Rust-red lumps that feed the foundry.' },
  { id: 'copper', name: 'Copper Ore', value: 14, hardness: 2, rarity: 0.18, depth: 1, smelt: 'copper-bar', barValue: 34, desc: 'Green-streaked stone with a warm glint.' },
  { id: 'tin', name: 'Tin Ore', value: 12, hardness: 2, rarity: 0.15, depth: 2, smelt: 'tin-bar', barValue: 28, desc: 'Soft grey ore, easy to work.' },
  { id: 'silver', name: 'Silver Ore', value: 38, hardness: 3, rarity: 0.09, depth: 2, smelt: 'silver-bar', barValue: 95, desc: 'Bright veins that shine in lamplight.' },
  { id: 'gold', name: 'Gold Ore', value: 72, hardness: 3, rarity: 0.06, depth: 3, smelt: 'gold-bar', barValue: 190, desc: 'Heavy yellow flecks — the old dream.' },
  { id: 'quartz', name: 'Quartz Crystal', value: 26, hardness: 3, rarity: 0.1, depth: 2, smelt: 'cut-quartz', barValue: 60, desc: 'Clear points that catch the light.' },
  { id: 'emerald', name: 'Emerald', value: 140, hardness: 4, rarity: 0.03, depth: 3, smelt: 'cut-emerald', barValue: 380, desc: 'Green fire locked in hard rock.' },
  { id: 'ruby', name: 'Ruby', value: 160, hardness: 4, rarity: 0.025, depth: 3, smelt: 'cut-ruby', barValue: 430, desc: 'Red as a warning, worth a fortune.' },
  { id: 'sapphire', name: 'Sapphire', value: 150, hardness: 4, rarity: 0.028, depth: 3, smelt: 'cut-sapphire', barValue: 400, desc: 'Deep blue, cold as the deep shaft.' },
  { id: 'diamond', name: 'Diamond', value: 320, hardness: 5, rarity: 0.012, depth: 4, smelt: 'cut-diamond', barValue: 900, desc: 'The hardest stone, the brightest prize.' },
  { id: 'mithril', name: 'Mithril Vein', value: 240, hardness: 5, rarity: 0.015, depth: 4, smelt: 'mithril-bar', barValue: 640, desc: 'A pale metal the old miners whispered about.' },
];

export const MINING_SHAFTS = [
  { id: 'quarry', name: 'Crown Quarry', district: 'North Hills', depth: 1, ore: 0.8, danger: 0, mult: 1.0, timeMin: 4, desc: 'Open sky, easy rock, honest coal and iron.' },
  { id: 'shaft1', name: 'Shaft One', district: 'North Hills', depth: 2, ore: 0.9, danger: 1, mult: 1.15, timeMin: 6, desc: 'The first deep cut — silver starts here.' },
  { id: 'shaft2', name: 'Shaft Two', district: 'North Hills', depth: 3, ore: 1.0, danger: 2, mult: 1.3, timeMin: 7, desc: 'Hot, dark, and full of gold.' },
  { id: 'abyss', name: 'The Abyss', district: 'North Hills', depth: 4, ore: 1.1, danger: 3, mult: 1.5, timeMin: 9, desc: 'The deepest cut. Diamonds and mithril — and gas.' },
];

export const MINING_BUYERS = [
  { id: 'foundry', name: 'Crown Foundry', mult: 1.0, likes: ['ore'], dislikes: ['gem'], mood: 'steady', minRank: 0, desc: 'Buys raw ore by the cartload.' },
  { id: 'smelter', name: 'Smelter Guild', mult: 1.25, likes: ['bar'], dislikes: ['ore'], mood: 'steady', minRank: 1, desc: 'Pays a premium for clean bars.' },
  { id: 'jeweler', name: 'Jeweler Anselm', mult: 1.5, likes: ['gem'], dislikes: ['ore'], mood: 'fancy', minRank: 2, desc: 'Cut stones only, and he pays for them.' },
  { id: 'collector', name: 'Collector Vane', mult: 1.6, likes: ['rare'], dislikes: [], mood: 'odd', minRank: 3, desc: 'Wants the rarest stones, whatever the price.' },
  { id: 'market', name: 'Night Market Stall', mult: 0.9, likes: [], dislikes: [], mood: 'quick', minRank: 0, desc: 'Fast cash for anything, slightly less money.' },
];

export const MINING_UPGRADES = [
  { id: 'pick', name: 'Steel Pick', cost: 100, desc: 'Hard rock breaks faster: +1 pick tier.', effect: 'pick' },
  { id: 'lamp', name: 'Brass Lamp', cost: 140, desc: 'See the veins: +20% rich-vein chance.', effect: 'lamp' },
  { id: 'canary', name: 'Canary Cage', cost: 180, desc: 'Gas warnings: cave-ins and gas halved.', effect: 'canary' },
  { id: 'drill', name: 'Hand Drill', cost: 300, desc: 'Drill the hard seams: +30% yield.', effect: 'drill' },
  { id: 'cart', name: 'Ore Cart', cost: 420, desc: 'Haul +50 kg per trip.', effect: 'cart' },
  { id: 'dynamite', name: 'Dynamite Kit', cost: 550, desc: 'Blast rich veins open — risky but fast.', effect: 'blast' },
  { id: 'smelter', name: 'Home Smelter', cost: 800, desc: 'Smelt your own bars, keep the margin.', effect: 'smelt' },
  { id: 'elevator', name: 'Shaft Elevator', cost: 1200, desc: 'Deep trips take half the time.', effect: 'elevator' },
];

export const MINING_RANKS = [
  { level: 0, name: 'Surface Picker', xp: 0, perk: 'Base prices, base yield.' },
  { level: 1, name: 'Pit Miner', xp: 120, perk: '+10% sale prices.' },
  { level: 2, name: 'Shaft Hand', xp: 300, perk: '+10% yield.' },
  { level: 3, name: 'Deep Miner', xp: 620, perk: '+20% sale prices, the Abyss opens.' },
  { level: 4, name: 'Master of the Deep', xp: 1100, perk: '+30% sale prices, gems doubled.' },
];

export const MINING_GEMS = [
  { id: 'quartz-cut', name: 'Cut Quartz', ore: 'quartz', value: 60, desc: 'A clear point, polished bright.' },
  { id: 'emerald-cut', name: 'Cut Emerald', ore: 'emerald', value: 380, desc: 'Green fire, perfectly faceted.' },
  { id: 'ruby-cut', name: 'Cut Ruby', ore: 'ruby', value: 430, desc: 'Red as a warning, cut to sparkle.' },
  { id: 'sapphire-cut', name: 'Cut Sapphire', ore: 'sapphire', value: 400, desc: 'Deep blue, cold and flawless.' },
  { id: 'diamond-cut', name: 'Cut Diamond', ore: 'diamond', value: 900, desc: 'The brightest stone in Solara.' },
  { id: 'mithril-ingot', name: 'Mithril Ingot', ore: 'mithril', value: 640, desc: 'Pale, light, and worth a king’s ransom.' },
];

export const MINING_EVENTS = [
  { id: 'rich-vein', name: 'Rich Vein', mult: 1.6, ores: ['gold', 'silver'], desc: 'A fat vein opens — dig while it lasts.' },
  { id: 'gem-rush', name: 'Gem Rush', mult: 1.5, ores: ['emerald', 'ruby', 'sapphire', 'diamond'], desc: 'The jeweler’s agents are in town, paying double.' },
  { id: 'gas-pocket', name: 'Gas Pocket', mult: 0.7, ores: [], desc: 'Bad air in the deep shafts today.' },
  { id: 'cave-in', name: 'Cave-In Warning', mult: 0.8, ores: [], desc: 'The timbers groan — work careful or not at all.' },
  { id: 'foundry-boom', name: 'Foundry Boom', mult: 1.3, ores: ['iron', 'copper', 'tin'], desc: 'The foundry orders double iron this week.' },
  { id: 'coal-shortage', name: 'Coal Shortage', mult: 1.4, ores: ['coal'], desc: 'Winter bites early — coal pays like gold.' },
];

export const MINING_CONTRACTS = [
  { id: 'iron-20', name: 'Iron Order', ore: 'iron', qty: 20, pay: 300, days: 2, rep: 0, desc: 'The foundry needs twenty iron lots.' },
  { id: 'coal-40', name: 'Coal Run', ore: 'coal', qty: 40, pay: 260, days: 1, rep: 0, desc: 'The bathhouse burns through coal.' },
  { id: 'silver-8', name: 'Silver Call', ore: 'silver', qty: 8, pay: 480, days: 2, rep: 1, desc: 'The mint needs silver for the new coin.' },
  { id: 'gold-4', name: 'Gold Fever', ore: 'gold', qty: 4, pay: 560, days: 3, rep: 2, desc: 'A jeweler orders four gold lots.' },
  { id: 'gems-3', name: 'Gem Order', ore: 'emerald', qty: 3, pay: 700, days: 3, rep: 3, desc: 'Three emeralds for a duchess’s necklace.' },
  { id: 'mithril-2', name: 'Mithril Whisper', ore: 'mithril', qty: 2, pay: 900, days: 3, rep: 3, desc: 'Someone very quiet wants mithril. No questions.' },
];

export const MINING_HAZARDS = [
  { id: 'gas', name: 'Gas Pocket', chance: 0.06, damage: 1, desc: 'Bad air — the canary sings its warning.' },
  { id: 'cave-in', name: 'Cave-In', chance: 0.04, damage: 2, desc: 'The roof comes down in a roar of stone.' },
  { id: 'flood', name: 'Flood Water', chance: 0.03, damage: 1, desc: 'Black water rises in the lower drift.' },
  { id: 'rockfall', name: 'Rockfall', chance: 0.08, damage: 1, desc: 'Loose stone from the roof — helmets on.' },
  { id: 'dust', name: 'Stone Dust', chance: 0.1, damage: 0, desc: 'Dust thick enough to chew.' },
];

export function miningRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < MINING_RANKS.length; i++) {
    if (xp >= MINING_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function miningPriceFor(ore, rank, upgrades) {
  let price = ore.value;
  price *= 1 + rank * 0.1;
  if (upgrades.includes('smelter')) price *= 1.05;
  return Math.max(1, Math.round(price));
}

export function miningBarValue(ore, rank, upgrades) {
  let price = ore.barValue;
  price *= 1 + rank * 0.1;
  if (upgrades.includes('smelter')) price *= 1.15;
  return Math.max(1, Math.round(price));
}

export function miningBuyerPrice(ore, buyerId, rank, upgrades) {
  const buyer = MINING_BUYERS.find((b) => b.id === buyerId);
  if (!buyer) return 0;
  let mult = buyer.mult;
  if (ore.hardness >= 4 && buyer.likes.includes('gem')) mult += 0.2;
  if (ore.hardness >= 4 && buyer.likes.includes('rare')) mult += 0.25;
  if (ore.hardness <= 2 && buyer.likes.includes('ore')) mult += 0.1;
  return Math.max(1, Math.round(miningPriceFor(ore, rank, upgrades) * mult));
}

export function miningCarryCap(upgrades) {
  let cap = 50;
  if (upgrades.includes('cart')) cap += 50;
  if (upgrades.includes('elevator')) cap += 40;
  return cap;
}

export function miningPickTier(upgrades) {
  let tier = 1;
  if (upgrades.includes('pick')) tier += 1;
  if (upgrades.includes('drill')) tier += 1;
  return tier;
}

export function createMiningSystem(ctx) {
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
    swings: 0,
    oreMined: 0,
    barsSmelted: 0,
    gemsCut: 0,
    earned: 0,
    spent: 0,
    hazards: 0,
    caveIns: 0,
    gasHits: 0,
    blasts: 0,
    richVeins: 0,
    ore: {},
    bars: {},
    gems: [],
    gemsSold: 0,
    upgrades: [],
    shaft: null,
    shaftTimeLeft: 0,
    vein: null,
    veinLeft: 0,
    lastDay: 1,
    activeContract: null,
    contractProgress: 0,
    contractsDone: 0,
    contractsFailed: 0,
    bestOre: null,
    bestValue: 0,
    dailyMined: 0,
    dailyEarned: 0,
    carryKg: 0,
    totalKg: 0,
    currentEvent: null,
    deepest: 1,
    fatigue: 0,
  };
  for (const o of MINING_ORES) { state.ore[o.id] = 0; state.bars[o.id] = 0; }

  function refreshRank() {
    const r = miningRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Mining rank up: ${MINING_RANKS[r].name} — ${MINING_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function pickOre(shaft) {
    const bag = [];
    for (const o of MINING_ORES) {
      if (o.depth > shaft.depth) continue;
      let w = o.rarity;
      if (state.upgrades.includes('lamp')) w *= 1.2;
      if (state.currentEvent) {
        const ev = MINING_EVENTS.find((e) => e.id === state.currentEvent);
        if (ev && ev.ores.includes(o.id)) w *= ev.mult;
      }
      bag.push({ o, w });
    }
    if (bag.length === 0) return MINING_ORES[0];
    let total = 0;
    for (const b of bag) total += b.w;
    let roll = rng() * total;
    for (const b of bag) {
      roll -= b.w;
      if (roll <= 0) return b.o;
    }
    return bag[0].o;
  }

  function enterShaft(shaftId) {
    const s = MINING_SHAFTS.find((x) => x.id === shaftId);
    if (!s) return { ok: false, reason: 'no-such-shaft' };
    if (state.shaft) return { ok: false, reason: 'shaft-active' };
    if (s.depth >= 4 && state.rank < 3) return { ok: false, reason: 'rank-too-low', need: 3 };
    if (s.depth >= 3 && state.rank < 2) return { ok: false, reason: 'rank-too-low', need: 2 };
    const hour = getHour();
    if (hour >= 23 || hour < 5) return { ok: false, reason: 'too-late' };
    state.shaft = shaftId;
    state.shaftTimeLeft = s.timeMin * 60 * (state.upgrades.includes('elevator') ? 0.5 : 1);
    state.deepest = Math.max(state.deepest, s.depth);
    log(`Down into ${s.name} — lamp lit, pick ready.`);
    return { ok: true, shaft: shaftId, depth: s.depth };
  }

  function swing() {
    if (!state.shaft) return { ok: false, reason: 'no-shaft' };
    const shaft = MINING_SHAFTS.find((x) => x.id === state.shaft);
    const cap = miningCarryCap(state.upgrades);
    if (state.carryKg >= cap) return { ok: false, reason: 'carry-full', cap };
    const tier = miningPickTier(state.upgrades);
    const ore = pickOre(shaft);
    if (ore.hardness > tier + 1) {
      log(`The ${ore.name} is too hard for your pick — upgrade first.`);
      return { ok: false, reason: 'too-hard', ore: ore.id };
    }
    const qty = 1 + Math.floor(rng() * 3) + (state.upgrades.includes('drill') ? 1 : 0);
    const weight = qty * (1 + ore.hardness * 0.5);
    const add = Math.min(qty, Math.max(0, Math.floor((cap - state.carryKg) / (1 + ore.hardness * 0.5))));
    if (add <= 0) return { ok: false, reason: 'carry-full', cap };
    state.ore[ore.id] += add;
    state.carryKg += add * (1 + ore.hardness * 0.5);
    state.totalKg += add * (1 + ore.hardness * 0.5);
    state.oreMined += add;
    state.dailyMined += add;
    state.swings += 1;
    state.fatigue += 1;
    gainXp(3 + ore.hardness * 2);
    if (ore.value > state.bestValue) { state.bestValue = ore.value; state.bestOre = ore.id; }
    if (rng() < 0.08 + (state.upgrades.includes('lamp') ? 0.05 : 0)) {
      state.richVeins += 1;
      const bonus = 2 + Math.floor(rng() * 3);
      state.ore[ore.id] += bonus;
      state.oreMined += bonus;
      log(`Rich vein! +${bonus} extra ${ore.name}.`);
    }
    const hazardRoll = rng();
    if (hazardRoll < shaft.danger * 0.05) {
      const h = MINING_HAZARDS[Math.floor(rng() * MINING_HAZARDS.length)];
      const reduced = state.upgrades.includes('canary') ? 0.5 : 1;
      if (rng() < reduced) {
        state.hazards += 1;
        if (h.id === 'cave-in') state.caveIns += 1;
        if (h.id === 'gas') state.gasHits += 1;
        log(`Hazard: ${h.name} — ${h.desc}`);
        if (h.damage >= 2) addHeat(1);
      }
    }
    if (state.activeContract) checkContract(ore.id, add);
    return { ok: true, ore: ore.id, qty: add, carryKg: Math.round(state.carryKg * 10) / 10 };
  }

  function blast() {
    if (!state.shaft) return { ok: false, reason: 'no-shaft' };
    if (!state.upgrades.includes('dynamite')) return { ok: false, reason: 'need-dynamite' };
    const shaft = MINING_SHAFTS.find((x) => x.id === state.shaft);
    const cap = miningCarryCap(state.upgrades);
    state.blasts += 1;
    const ore = pickOre(shaft);
    const qty = 4 + Math.floor(rng() * 5);
    const add = Math.min(qty, Math.max(0, Math.floor((cap - state.carryKg) / (1 + ore.hardness * 0.5))));
    state.ore[ore.id] += add;
    state.carryKg += add * (1 + ore.hardness * 0.5);
    state.oreMined += add;
    state.dailyMined += add;
    gainXp(10 + ore.hardness * 3);
    if (rng() < 0.25) {
      state.caveIns += 1;
      state.hazards += 1;
      addHeat(2);
      log('The blast brings the roof down! You scramble clear — heat +2.');
      return { ok: true, ore: ore.id, qty: add, caveIn: true };
    }
    log(`Blast! ${add}x ${ore.name} shaken loose.`);
    return { ok: true, ore: ore.id, qty: add, caveIn: false };
  }

  function leaveShaft() {
    if (!state.shaft) return { ok: false, reason: 'no-shaft' };
    const s = state.shaft;
    state.shaft = null;
    state.shaftTimeLeft = 0;
    state.trips += 1;
    state.carryKg = 0;
    state.fatigue = 0;
    log(`Back up from ${s} with a full cart — smelt it or sell it raw.`);
    return { ok: true, shaft: s };
  }

  function smelt(oreId, qty) {
    if (!state.upgrades.includes('smelter')) return { ok: false, reason: 'need-smelter' };
    const ore = MINING_ORES.find((o) => o.id === oreId);
    if (!ore) return { ok: false, reason: 'no-such-ore' };
    const have = state.ore[oreId] || 0;
    if (qty <= 0 || have < qty) return { ok: false, reason: 'not-enough', have };
    const bars = Math.floor(qty / 2);
    if (bars <= 0) return { ok: false, reason: 'need-2-ore' };
    state.ore[oreId] -= bars * 2;
    state.bars[oreId] += bars;
    state.barsSmelted += bars;
    gainXp(bars * 3);
    const isGem = ore.hardness >= 4;
    if (isGem) {
      const gem = MINING_GEMS.find((g) => g.ore === oreId);
      if (gem) {
        for (let i = 0; i < bars; i++) state.gems.push(gem.id);
        state.gemsCut += bars;
        log(`Cut ${bars}x ${gem.name} — they catch the lamplight beautifully.`);
      }
    }
    log(`Smelted ${bars * 2}x ${ore.name} into ${bars} bars.`);
    return { ok: true, bars, ore: oreId };
  }

  function sellOre(buyerId, oreId, qty) {
    const buyer = MINING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    if (state.rank < buyer.minRank) return { ok: false, reason: 'rank-too-low', need: buyer.minRank };
    const ore = MINING_ORES.find((o) => o.id === oreId);
    if (!ore) return { ok: false, reason: 'no-such-ore' };
    const have = state.ore[oreId] || 0;
    if (qty <= 0 || have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = miningBuyerPrice(ore, buyerId, state.rank, state.upgrades);
    const total = unit * qty;
    state.ore[oreId] -= qty;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(qty);
    log(`Sold ${qty}x ${ore.name} to ${buyer.name} for $${total}.`);
    return { ok: true, total, unit, qty };
  }

  function sellBars(buyerId, oreId, qty) {
    const buyer = MINING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    if (state.rank < buyer.minRank) return { ok: false, reason: 'rank-too-low', need: buyer.minRank };
    const ore = MINING_ORES.find((o) => o.id === oreId);
    if (!ore) return { ok: false, reason: 'no-such-ore' };
    const have = state.bars[oreId] || 0;
    if (qty <= 0 || have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = Math.round(miningBarValue(ore, state.rank, state.upgrades) * buyer.mult);
    const total = unit * qty;
    state.bars[oreId] -= qty;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(qty * 2);
    log(`Sold ${qty}x ${ore.smelt} to ${buyer.name} for $${total}.`);
    return { ok: true, total, unit, qty };
  }

  function sellGem(gemId) {
    const idx = state.gems.indexOf(gemId);
    if (idx < 0) return { ok: false, reason: 'no-such-gem' };
    const g = MINING_GEMS.find((x) => x.id === gemId);
    state.gems.splice(idx, 1);
    state.gemsSold += 1;
    const value = g.value + state.rank * 40;
    state.earned += value;
    addCash(value);
    gainXp(30);
    log(`Sold the ${g.name} for $${value}.`);
    return { ok: true, value };
  }

  function sellAll(buyerId) {
    const buyer = MINING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    let total = 0;
    let units = 0;
    const lines = [];
    for (const o of MINING_ORES) {
      const q = state.ore[o.id] || 0;
      if (q > 0) {
        const unit = miningBuyerPrice(o, buyerId, state.rank, state.upgrades);
        const line = unit * q;
        total += line; units += q;
        lines.push({ kind: 'ore', id: o.id, qty: q, total: line });
        state.ore[o.id] = 0;
      }
      const bq = state.bars[o.id] || 0;
      if (bq > 0) {
        const unit = Math.round(miningBarValue(o, state.rank, state.upgrades) * buyer.mult);
        const line = unit * bq;
        total += line; units += bq;
        lines.push({ kind: 'bar', id: o.id, qty: bq, total: line });
        state.bars[o.id] = 0;
      }
    }
    if (units === 0) return { ok: false, reason: 'nothing-to-sell' };
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(units);
    log(`Sold the whole load to ${buyer.name} for $${total}.`);
    return { ok: true, total, units, lines };
  }

  function buyUpgrade(id) {
    const u = MINING_UPGRADES.find((x) => x.id === id);
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
    const ct = MINING_CONTRACTS.find((x) => x.id === id);
    if (!ct) return { ok: false, reason: 'no-such-contract' };
    if (state.activeContract) return { ok: false, reason: 'contract-active' };
    if (state.rank < ct.rep) return { ok: false, reason: 'rep-too-low', need: ct.rep };
    state.activeContract = { ...ct, dayTaken: getDay(), deadlineDay: getDay() + ct.days };
    state.contractProgress = 0;
    log(`Contract taken: ${ct.name} — ${ct.qty}x ${ct.ore} by day ${state.activeContract.deadlineDay}.`);
    return { ok: true, contract: state.activeContract };
  }

  function checkContract(oreId, qty) {
    const ct = state.activeContract;
    if (!ct || ct.ore !== oreId) return;
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
    const have = state.ore[ct.ore] || 0;
    if (have < ct.qty) return { ok: false, reason: 'not-enough-ore', have, need: ct.qty };
    state.ore[ct.ore] -= ct.qty;
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
    log('Contract abandoned — the buyer will remember that.');
    return { ok: true };
  }

  function priceBoard() {
    return MINING_ORES.map((o) => ({
      id: o.id, name: o.name,
      price: miningPriceFor(o, state.rank, state.upgrades),
      barValue: miningBarValue(o, state.rank, state.upgrades),
      ore: state.ore[o.id], bars: state.bars[o.id], depth: o.depth,
    }));
  }

  function shaftReport() {
    return MINING_SHAFTS.map((s) => ({
      id: s.id, name: s.name, depth: s.depth, mult: s.mult, danger: s.danger,
      ores: MINING_ORES.filter((o) => o.depth <= s.depth).map((o) => o.id),
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.2) {
      const ev = MINING_EVENTS[Math.floor(rng() * MINING_EVENTS.length)];
      state.currentEvent = ev.id;
      log(`Mine news: ${ev.name} — ${ev.desc}`);
      return { event: ev.id, name: ev.name };
    }
    if (roll < 0.3) {
      const free = MINING_ORES[Math.floor(rng() * MINING_ORES.length)];
      state.ore[free.id] += 3;
      log(`A retiring miner gifts you 3x ${free.name}.`);
      return { event: 'gift', ore: free.id };
    }
    state.currentEvent = null;
    return { event: 'none' };
  }

  function tick(dt) {
    if (state.shaft) {
      state.shaftTimeLeft -= dt;
      if (state.shaftTimeLeft <= 0) {
        const s = state.shaft;
        state.shaft = null;
        state.shaftTimeLeft = 0;
        state.trips += 1;
        state.carryKg = 0;
        state.fatigue = 0;
        log(`Shift over in ${s} — the lift hauls you up.`);
      }
    }
    if (state.fatigue > 40) {
      state.fatigue = 40;
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyMined = 0;
    state.dailyEarned = 0;
    if (state.activeContract && day >= state.activeContract.deadlineDay && state.contractProgress < state.activeContract.qty) {
      log(`Contract ${state.activeContract.name} expired — the buyer walked away.`);
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractsFailed += 1;
    }
    dailyEvent();
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, trips: state.trips, swings: state.swings,
      oreMined: state.oreMined, barsSmelted: state.barsSmelted, gemsCut: state.gemsCut,
      earned: state.earned, spent: state.spent, hazards: state.hazards,
      caveIns: state.caveIns, gasHits: state.gasHits, blasts: state.blasts,
      richVeins: state.richVeins, ore: state.ore, bars: state.bars, gems: state.gems,
      gemsSold: state.gemsSold, upgrades: state.upgrades, shaft: state.shaft,
      shaftTimeLeft: state.shaftTimeLeft, vein: state.vein, veinLeft: state.veinLeft,
      lastDay: state.lastDay, activeContract: state.activeContract,
      contractProgress: state.contractProgress, contractsDone: state.contractsDone,
      contractsFailed: state.contractsFailed, bestOre: state.bestOre,
      bestValue: state.bestValue, dailyMined: state.dailyMined,
      dailyEarned: state.dailyEarned, carryKg: state.carryKg, totalKg: state.totalKg,
      currentEvent: state.currentEvent, deepest: state.deepest, fatigue: state.fatigue,
    }));
  }

  function deserialize(d) {
    if (!d || typeof d !== 'object') return;
    for (const k of Object.keys(state)) {
      if (d[k] !== undefined) state[k] = d[k];
    }
    for (const o of MINING_ORES) {
      if (state.ore[o.id] === undefined) state.ore[o.id] = 0;
      if (state.bars[o.id] === undefined) state.bars[o.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: MINING_RANKS[state.rank].name,
      xp: state.xp,
      trips: state.trips,
      swings: state.swings,
      oreMined: state.oreMined,
      barsSmelted: state.barsSmelted,
      gemsCut: state.gemsCut,
      gemsSold: state.gemsSold,
      earned: Math.round(state.earned),
      spent: state.spent,
      hazards: state.hazards,
      caveIns: state.caveIns,
      gasHits: state.gasHits,
      blasts: state.blasts,
      richVeins: state.richVeins,
      upgrades: state.upgrades.length,
      shaft: state.shaft,
      deepest: state.deepest,
      activeContract: state.activeContract ? state.activeContract.id : null,
      contractsDone: state.contractsDone,
      contractsFailed: state.contractsFailed,
      bestOre: state.bestOre,
      dailyMined: state.dailyMined,
      dailyEarned: Math.round(state.dailyEarned),
      carryKg: Math.round(state.carryKg * 10) / 10,
      carryCap: miningCarryCap(state.upgrades),
      event: state.currentEvent,
    };
  }

  function hudLine() {
    if (state.shaft) return `Mine: ${state.shaft} — ${Math.round(state.carryKg)}kg in the cart`;
    if (state.activeContract) return `Mine: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    const oreTotal = Object.values(state.ore).reduce((a, b) => a + b, 0);
    if (oreTotal > 0) return `Mine: ${oreTotal} ore to smelt or sell`;
    if (state.gems.length > 0) return `Mine: ${state.gems.length} cut gems to sell`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearQuarry = Math.hypot(pos.x - 350, pos.z - 420) < 40;
    if (!nearQuarry) return false;
    if (!state.shaft) { enterShaft('quarry'); return true; }
    swing();
    return true;
  }

  return {
    state, enterShaft, swing, blast, leaveShaft, smelt,
    sellOre, sellBars, sellGem, sellAll, buyUpgrade,
    takeContract, deliverContract, abandonContract,
    priceBoard, shaftReport, dailyEvent,
    tick, tickDay, serialize, deserialize, stats, hudLine, interact,
  };
}

export const MINING_HELPERS = [
  { id: 'timberman', name: 'Old Bram', wage: 35, skill: 'safety', bonus: 0.3, desc: 'Shores the timbers: hazards -30%.' },
  { id: 'assayer', name: 'Assayer Nell', wage: 50, skill: 'value', bonus: 0.2, desc: 'Grades every lot: +20% sale prices.' },
  { id: 'hauler', name: 'Big Dee', wage: 45, skill: 'carry', bonus: 0.4, desc: 'Hauls the cart: +40% carry capacity.' },
  { id: 'smelter-hand', name: 'Smelter Gus', wage: 60, skill: 'smelt', bonus: 0.25, desc: 'Works the furnace: +25% bar value.' },
];

export const MINING_CHALLENGES = [
  { id: 'ore-100', name: 'First Hundred', target: 'oreMined', goal: 100, xp: 80, desc: 'Mine 100 ore in total.' },
  { id: 'bars-50', name: 'Bar Maker', target: 'barsSmelted', goal: 50, xp: 100, desc: 'Smelt 50 bars.' },
  { id: 'earn-1000', name: 'Deep Purse', target: 'earned', goal: 1000, xp: 120, desc: 'Earn $1,000 from mining.' },
  { id: 'gems-5', name: 'Gem Cutter', target: 'gemsCut', goal: 5, xp: 150, desc: 'Cut 5 gems.' },
  { id: 'trips-10', name: 'Shift Regular', target: 'trips', goal: 10, xp: 90, desc: 'Finish 10 shaft trips.' },
  { id: 'contracts-5', name: 'Reliable Supplier', target: 'contractsDone', goal: 5, xp: 140, desc: 'Complete 5 mining contracts.' },
  { id: 'diamond-1', name: 'Diamond in the Deep', target: 'bestValue', goal: 320, xp: 200, desc: 'Mine ore worth $320 or more.' },
  { id: 'deep-4', name: 'Abyss Diver', target: 'deepest', goal: 4, xp: 150, desc: 'Reach depth 4, the Abyss.' },
];

export const MINING_ACHIEVEMENTS = [
  { id: 'first-ore', name: 'First Ore', check: (s) => s.oreMined >= 1, desc: 'Mine your first ore.' },
  { id: 'first-bar', name: 'First Bar', check: (s) => s.barsSmelted >= 1, desc: 'Smelt your first bar.' },
  { id: 'first-gem', name: 'First Gem', check: (s) => s.gemsCut >= 1, desc: 'Cut your first gem.' },
  { id: 'rank-3', name: 'Deep Miner', check: (s) => s.rank >= 3, desc: 'Reach rank Deep Miner.' },
  { id: 'rich-miner', name: 'Rich Miner', check: (s) => s.earned >= 3000, desc: 'Earn $3,000 from mining.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every mining upgrade.' },
  { id: 'no-cavein', name: 'Safe Hands', check: (s) => s.trips >= 10 && s.caveIns === 0, desc: 'Ten trips, no cave-ins.' },
  { id: 'mithril', name: 'Mithril Whisper', check: (s) => s.bestOre === 'mithril', desc: 'Find a mithril vein.' },
];

export function miningHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of MINING_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function miningChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function createMiningExtras(system) {
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  function hireHelper(id) {
    const h = MINING_HELPERS.find((x) => x.id === id);
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
      const h = MINING_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    wagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: wagesPaid };
  }

  function helperBonus(skill) {
    return miningHelperBonus(helpers, skill);
  }

  function challenges() {
    return MINING_CHALLENGES.map((ch) => miningChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = MINING_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = miningChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return MINING_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function assay(oreId) {
    const ore = MINING_ORES.find((o) => o.id === oreId);
    if (!ore) return { ok: false, reason: 'no-such-ore' };
    return { ok: true, ore: oreId, value: ore.value, barValue: ore.barValue, hardness: ore.hardness, depth: ore.depth };
  }

  function inventoryValue() {
    let total = 0;
    for (const o of MINING_ORES) {
      total += (system.state.ore[o.id] || 0) * o.value;
      total += (system.state.bars[o.id] || 0) * o.barValue;
    }
    return { ok: true, value: Math.round(total) };
  }

  function weighIn() {
    const total = Math.round(system.state.carryKg * 10) / 10;
    const cap = miningCarryCap(system.state.upgrades);
    return { carryKg: total, cap, free: Math.round((cap - system.state.carryKg) * 10) / 10 };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, assay, inventoryValue, weighIn,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return wagesPaid; },
  };
}

export const MINING_TIPS = [
  { id: 'lamp-first', name: 'Lamp First', text: 'A good lamp finds rich veins other miners walk past.' },
  { id: 'canary', name: 'Trust the Canary', text: 'When the canary stops singing, get out of the shaft.' },
  { id: 'smelt', name: 'Smelt Your Own', text: 'Bars pay more than raw ore. Build the smelter.' },
  { id: 'deep-slow', name: 'Deep and Slow', text: 'The Abyss pays best but punishes the careless.' },
  { id: 'blast-care', name: 'Blast Carefully', text: 'Dynamite opens veins — and sometimes the roof.' },
  { id: 'gem-jeweler', name: 'Gems to the Jeweler', text: 'Never sell a cut gem to the foundry. Anselm pays double.' },
  { id: 'coal-winter', name: 'Coal in Winter', text: 'Coal prices spike when the cold comes. Stockpile.' },
  { id: 'timber', name: 'Shore the Timbers', text: 'Hire Old Bram before your first deep trip.' },
];

export const MINING_LEADERBOARD = [
  { name: 'Old Bram', kg: 9800, desc: 'Forty years underground.' },
  { name: 'Assayer Nell', kg: 6400, desc: 'Grades every lot she hauls.' },
  { name: 'Ria', kg: 0, desc: 'You. Climbing.' },
  { name: 'Smelter Gus', kg: 5200, desc: 'Lives by the furnace.' },
  { name: 'Big Dee', kg: 4100, desc: 'Hauls more than he digs.' },
];

export function miningTipFor(day) {
  return MINING_TIPS[day % MINING_TIPS.length];
}

export function miningLeaderboardWith(playerKg) {
  const board = MINING_LEADERBOARD.map((e) => ({
    name: e.name, kg: e.name === 'Ria' ? playerKg : e.kg, desc: e.desc,
  }));
  board.sort((a, b) => b.kg - a.kg);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function miningEfficiency(oreMined, swings) {
  if (swings === 0) return 0;
  return Math.round((oreMined / swings) * 100) / 100;
}

export function miningProfitPerTrip(earned, trips) {
  if (trips === 0) return 0;
  return Math.round((earned / trips) * 10) / 10;
}

export function miningGrade(oreMined, hazards, gemsCut) {
  if (oreMined === 0) return 'D';
  const score = oreMined - hazards * 10 + gemsCut * 20;
  if (score >= 300) return 'S';
  if (score >= 180) return 'A';
  if (score >= 90) return 'B';
  if (score >= 40) return 'C';
  return 'D';
}

export const MINING_RECORDS = [
  { id: 'most-ore', name: 'Most Ore', stat: 'oreMined', unit: 'ore', desc: 'Most ore mined in total.' },
  { id: 'most-bars', name: 'Most Bars', stat: 'barsSmelted', unit: 'bars', desc: 'Most bars smelted.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from mining.' },
  { id: 'gems', name: 'Most Gems', stat: 'gemsCut', unit: 'gems', desc: 'Most gems cut.' },
  { id: 'deepest', name: 'Deepest', stat: 'deepest', unit: 'depth', desc: 'Deepest shaft reached.' },
];

export function miningRecordFor(recordId, state) {
  const r = MINING_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function miningAllRecords(state) {
  return MINING_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function miningSummary(state) {
  return `Mine ${MINING_RANKS[state.rank].name}: ${state.oreMined} ore, ${state.barsSmelted} bars, ${state.gemsCut} gems, $${Math.round(state.earned)} earned, depth ${state.deepest}.`;
}

export function miningNextGoal(state) {
  if (state.oreMined < 50) return 'Mine 50 ore.';
  if (state.barsSmelted < 20) return 'Smelt 20 bars.';
  if (state.rank < 2) return 'Reach rank Shaft Hand.';
  return 'Reach the Abyss at depth 4.';
}

export const MINING_QUICK_START = [
  'Start in the Crown Quarry — coal and iron are easy money.',
  'Buy the steel pick before you chase silver.',
  'Smelt bars before selling; the guild pays a premium.',
  'Never enter the Abyss without the canary.',
  'Take foundry contracts for ore you already mine.',
  'Cut gems go to the jeweler, never the foundry.',
];

export function miningQuickStart(step) {
  return MINING_QUICK_START[step] || null;
}

export const MINING_META = {
  system: 'mining', version: '7-B1', author: 'builder-1',
  ores: MINING_ORES.length, shafts: MINING_SHAFTS.length,
  note: 'Deep Shaft: pick, blast, smelt, sell.',
};

export const MINING_VEINS = [
  { id: 'surface-seam', name: 'Surface Seam', depth: 1, richness: 1.0, desc: 'A thin seam of ore at the surface.' },
  { id: 'rich-pocket', name: 'Rich Pocket', depth: 2, richness: 1.5, desc: 'A fat pocket of ore in the wall.' },
  { id: 'mother-lode', name: 'Mother Lode', depth: 3, richness: 2.0, desc: 'The big one — a vein that runs for metres.' },
  { id: 'gem-nest', name: 'Gem Nest', depth: 4, richness: 2.5, desc: 'A nest of crystals in the deep rock.' },
];

export function miningVeinFor(veinId) {
  return MINING_VEINS.find((v) => v.id === veinId) || null;
}

export function miningVeinRichness(depth) {
  const veins = MINING_VEINS.filter((v) => v.depth <= depth);
  if (veins.length === 0) return 1;
  return veins[veins.length - 1].richness;
}

export function miningYieldEstimate(ore, depth, upgrades) {
  let yield_ = 1 + Math.floor(miningVeinRichness(depth));
  if (upgrades.includes('drill')) yield_ += 1;
  if (upgrades.includes('lamp')) yield_ += 1;
  return { ore: ore.id, name: ore.name, yield: yield_, depth };
}

export const MINING_SAFETY_RULES = [
  { id: 'timber', name: 'Timber First', text: 'Shore the roof before you dig under it.' },
  { id: 'canary', name: 'Watch the Canary', text: 'When the canary stops singing, get out.' },
  { id: 'lamp', name: 'Lamp Check', text: 'A dead lamp in a deep shaft is a death sentence.' },
  { id: 'blast', name: 'Blast Clear', text: 'Shout three times before you light the fuse.' },
  { id: 'water', name: 'Water Rising', text: 'If water rises in the drift, run uphill.' },
  { id: 'buddy', name: 'Buddy System', text: 'Never go down alone. Never.' },
];

export function miningSafetyFor(ruleId) {
  return MINING_SAFETY_RULES.find((r) => r.id === ruleId) || null;
}

export function miningSafetyCheck(state) {
  const issues = [];
  if (state.truckHealth !== undefined) void state.truckHealth;
  if (state.shaft && !state.upgrades.includes('canary')) issues.push('No canary in a deep shaft — gas is a risk.');
  if (state.fatigue > 30) issues.push('Fatigue is high — rest before the next swing.');
  if (state.shaft === 'abyss' && !state.upgrades.includes('elevator')) issues.push('The Abyss without an elevator is a long climb out.');
  return { safe: issues.length === 0, issues };
}
