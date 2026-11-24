export const MINING_ORES = [
  { id: 'coal', name: 'Coal', value: 4, hardness: 1, rarity: 0.3, depth: 1, smelt: 'coal', barValue: 7, desc: 'Black, dusty, and everywhere near the surface.' },
  { id: 'iron', name: 'Iron', value: 10, hardness: 2, rarity: 0.25, depth: 1, smelt: 'iron', barValue: 18, desc: 'The backbone of every forge in town.' },
  { id: 'copper', name: 'Copper', value: 12, hardness: 2, rarity: 0.22, depth: 1, smelt: 'copper', barValue: 20, desc: 'Warm red metal, easy to work.' },
  { id: 'tin', name: 'Tin', value: 9, hardness: 2, rarity: 0.2, depth: 2, smelt: 'tin', barValue: 16, desc: 'Soft grey seams in the second level.' },
  { id: 'silver', name: 'Silver', value: 35, hardness: 3, rarity: 0.12, depth: 2, smelt: 'silver', barValue: 60, desc: 'Bright veins that catch the lamplight.' },
  { id: 'gold', name: 'Gold', value: 80, hardness: 3, rarity: 0.08, depth: 3, smelt: 'gold', barValue: 150, desc: 'Heavy yellow nuggets deep down.' },
  { id: 'quartz', name: 'Quartz', value: 25, hardness: 2, rarity: 0.15, depth: 2, smelt: 'quartz', barValue: 45, desc: 'Clear crystals that cut into fine gems.' },
  { id: 'emerald', name: 'Emerald', value: 120, hardness: 4, rarity: 0.05, depth: 3, smelt: 'emerald', barValue: 260, desc: 'Green fire locked in hard rock.' },
  { id: 'ruby', name: 'Ruby', value: 150, hardness: 4, rarity: 0.04, depth: 3, smelt: 'ruby', barValue: 320, desc: 'Blood-red stones, worth a fortune cut.' },
  { id: 'sapphire', name: 'Sapphire', value: 140, hardness: 4, rarity: 0.04, depth: 4, smelt: 'sapphire', barValue: 300, desc: 'Deep blue, found only in the abyss.' },
  { id: 'diamond', name: 'Diamond', value: 320, hardness: 5, rarity: 0.02, depth: 4, smelt: 'diamond', barValue: 900, desc: 'The hardest stone, and the richest.' },
  { id: 'mithril', name: 'Mithril', value: 200, hardness: 5, rarity: 0.03, depth: 4, smelt: 'mithril', barValue: 600, desc: 'A strange light metal the old miners feared.' },
];

export const MINING_SHAFTS = [
  { id: 'quarry', name: 'Crown Quarry', district: 'Surface', depth: 1, ore: 0.9, danger: 1, mult: 1.0, timeMin: 60, desc: 'Open sky, easy rock, honest pay.' },
  { id: 'shaft1', name: 'Shaft One', district: 'Deep', depth: 2, ore: 0.7, danger: 2, mult: 1.2, timeMin: 90, desc: 'Timbered tunnels under the hill.' },
  { id: 'shaft2', name: 'Shaft Two', district: 'Deeper', depth: 3, ore: 0.5, danger: 3, mult: 1.5, timeMin: 120, desc: 'Hot, damp, and rich.' },
  { id: 'abyss', name: 'The Abyss', district: 'Bottom', depth: 4, ore: 0.3, danger: 4, mult: 2.0, timeMin: 150, desc: 'The bottom of the world. Few come back rich.' },
];

export const MINING_BUYERS = [
  { id: 'foundry', name: 'The Foundry', mult: 1.0, likes: ['iron', 'coal'], dislikes: ['quartz'], mood: 'steady', minRank: 0, desc: 'Buys raw ore by the cartload.' },
  { id: 'smelter', name: 'Smelter Guild', mult: 1.1, likes: ['copper', 'tin', 'iron'], dislikes: ['coal'], mood: 'busy', minRank: 1, desc: 'Pays more for clean smelting ore.' },
  { id: 'jeweler', name: 'The Jeweler', mult: 1.3, likes: ['emerald', 'ruby', 'sapphire', 'diamond'], dislikes: ['coal', 'iron'], mood: 'picky', minRank: 2, desc: 'Wants cut stones and bright gems.' },
  { id: 'collector', name: 'The Collector', mult: 1.5, likes: ['mithril', 'diamond', 'gold'], dislikes: ['tin'], mood: 'eager', minRank: 3, desc: 'Pays silly money for rare stone.' },
  { id: 'market', name: 'Town Market', mult: 0.9, likes: [], dislikes: [], mood: 'flat', minRank: 0, desc: 'Buys anything, cheaply.' },
];

export const MINING_UPGRADES = [
  { id: 'pick', name: 'Steel Pick', cost: 100, desc: 'A proper steel pick that bites deeper.', effect: 'dig' },
  { id: 'lamp', name: 'Bright Lamp', cost: 140, desc: 'A lamp that shows the good seams.', effect: 'find' },
  { id: 'canary', name: 'Canary Cage', cost: 180, desc: 'A canary that warns of bad air.', effect: 'safety' },
  { id: 'drill', name: 'Rock Drill', cost: 300, desc: 'A hand drill that cracks hard ore.', effect: 'dig' },
  { id: 'cart', name: 'Ore Cart', cost: 420, desc: 'A cart that doubles what you can haul.', effect: 'carry' },
  { id: 'dynamite', name: 'Dynamite', cost: 550, desc: 'Sticks of dynamite for big blasts.', effect: 'blast' },
  { id: 'smelter', name: 'Home Smelter', cost: 800, desc: 'Your own smelter for bars and gems.', effect: 'smelt' },
  { id: 'elevator', name: 'Cage Elevator', cost: 1200, desc: 'A cage lift that halves the trip down.', effect: 'carry' },
];

export const MINING_RANKS = [
  { level: 0, name: 'Surface Picker', xp: 0, perk: 'Learning the seams.' },
  { level: 1, name: 'Pit Miner', xp: 120, perk: 'A steady swing.' },
  { level: 2, name: 'Shaft Hand', xp: 300, perk: 'Trusted below ground.' },
  { level: 3, name: 'Deep Miner', xp: 620, perk: 'The abyss knows your name.' },
  { level: 4, name: 'Master of the Deep', xp: 1100, perk: 'No rock resists you.' },
];

export const MINING_GEMS = [
  { id: 'quartz-cut', name: 'Cut Quartz', ore: 'quartz', value: 60, desc: 'A clear, bright cut stone.' },
  { id: 'emerald-cut', name: 'Cut Emerald', ore: 'emerald', value: 260, desc: 'Green fire, neatly faceted.' },
  { id: 'ruby-cut', name: 'Cut Ruby', ore: 'ruby', value: 320, desc: 'A blood-red cut stone.' },
  { id: 'sapphire-cut', name: 'Cut Sapphire', ore: 'sapphire', value: 300, desc: 'Deep blue, cold as a winter night.' },
  { id: 'diamond-cut', name: 'Cut Diamond', ore: 'diamond', value: 900, desc: 'A stone that outshines the sun.' },
  { id: 'mithril-ingot', name: 'Mithril Ingot', ore: 'mithril', value: 600, desc: 'A light ingot that hums faintly.' },
];

export const MINING_EVENTS = [
  { id: 'rich-vein', name: 'Rich Vein', mult: 1.3, ores: ['gold', 'diamond'], desc: 'A fat vein of precious metal.' },
  { id: 'gem-rush', name: 'Gem Rush', mult: 1.4, ores: ['emerald', 'ruby', 'sapphire'], desc: 'Everyone is talking about gems today.' },
  { id: 'gas-pocket', name: 'Gas Pocket', mult: 0.8, ores: ['coal'], desc: 'Bad air seeps from the coal seams.' },
  { id: 'cave-in', name: 'Cave-In Scare', mult: 0.7, ores: [], desc: 'A tunnel collapsed somewhere below.' },
  { id: 'foundry-boom', name: 'Foundry Boom', mult: 1.2, ores: ['iron', 'copper'], desc: 'The foundry is buying everything.' },
  { id: 'coal-shortage', name: 'Coal Shortage', mult: 1.3, ores: ['coal'], desc: 'Coal prices jump as winter bites.' },
];

export const MINING_CONTRACTS = [
  { id: 'iron-20', name: 'Iron Twenty', ore: 'iron', qty: 20, pay: 300, days: 2, rep: 0, desc: 'Twenty iron for the foundry.' },
  { id: 'coal-40', name: 'Coal Forty', ore: 'coal', qty: 40, pay: 260, days: 1, rep: 0, desc: 'Forty coal before the cold sets in.' },
  { id: 'silver-8', name: 'Silver Eight', ore: 'silver', qty: 8, pay: 480, days: 2, rep: 1, desc: 'Eight silver for the mint.' },
  { id: 'gold-4', name: 'Gold Four', ore: 'gold', qty: 4, pay: 560, days: 3, rep: 2, desc: 'Four gold nuggets, no less.' },
  { id: 'gems-3', name: 'Three Emeralds', ore: 'emerald', qty: 3, pay: 700, days: 3, rep: 3, desc: 'Three emeralds for the jeweler.' },
  { id: 'mithril-2', name: 'Two Mithril', ore: 'mithril', qty: 2, pay: 900, days: 3, rep: 3, desc: 'Two pieces of mithril for the collector.' },
];

export const MINING_HAZARDS = [
  { id: 'gas', name: 'Bad Gas', chance: 0.1, damage: 2, desc: 'A pocket of foul air.' },
  { id: 'cave-in', name: 'Cave-In', chance: 0.08, damage: 4, desc: 'The roof comes down.' },
  { id: 'flood', name: 'Flood Water', chance: 0.05, damage: 3, desc: 'Water bursts through the wall.' },
  { id: 'rockfall', name: 'Rockfall', chance: 0.12, damage: 3, desc: 'Loose rock rains from above.' },
  { id: 'dust', name: 'Choking Dust', chance: 0.15, damage: 1, desc: 'Dust thick enough to chew.' },
];

export const MINING_HELPERS = [
  { id: 'timberman', name: 'Timberman', wage: 35, skill: 'safety', bonus: 0.3, desc: 'Shores up tunnels so they stay up.' },
  { id: 'assayer', name: 'Assayer Nell', wage: 50, skill: 'value', bonus: 0.2, desc: 'Knows good ore at a glance.' },
  { id: 'hauler', name: 'Hauler', wage: 45, skill: 'carry', bonus: 0.4, desc: 'Hauls twice what you can.' },
  { id: 'smelter-hand', name: 'Smelter Hand', wage: 60, skill: 'smelt', bonus: 0.25, desc: 'Works the furnace like an artist.' },
];

export const MINING_CHALLENGES = [
  { id: 'ore-100', name: 'A Hundred Ore', target: 'oreMined', goal: 100, xp: 80, desc: 'Mine a hundred pieces of ore.' },
  { id: 'bars-50', name: 'Fifty Bars', target: 'barsSmelted', goal: 50, xp: 100, desc: 'Smelt fifty bars.' },
  { id: 'earn-1000', name: 'A Thousand Earned', target: 'earned', goal: 1000, xp: 120, desc: 'Earn a thousand from mining.' },
  { id: 'gems-5', name: 'Five Gems Cut', target: 'gemsCut', goal: 5, xp: 110, desc: 'Cut five gems.' },
  { id: 'trips-10', name: 'Ten Trips', target: 'trips', goal: 10, xp: 90, desc: 'Finish ten shaft trips.' },
  { id: 'contracts-5', name: 'Five Contracts', target: 'contractsDone', goal: 5, xp: 140, desc: 'Finish five mining contracts.' },
  { id: 'diamond-1', name: 'One Diamond', target: 'bestValue', goal: 320, xp: 200, desc: 'Pull out a stone worth at least 320.' },
  { id: 'deep-4', name: 'Down to Four', target: 'deepest', goal: 4, xp: 150, desc: 'Reach depth four, the abyss.' },
];

export const MINING_ACHIEVEMENTS = [
  { id: 'first-ore', name: 'First Ore', check: (s) => s.oreMined >= 1, desc: 'Your first piece of ore.' },
  { id: 'first-bar', name: 'First Bar', check: (s) => s.barsSmelted >= 1, desc: 'Your first smelted bar.' },
  { id: 'first-gem', name: 'First Gem', check: (s) => s.gemsCut >= 1, desc: 'Your first cut gem.' },
  { id: 'rank-3', name: 'Deep Miner', check: (s) => s.rank >= 3, desc: 'Reach rank three.' },
  { id: 'rich-miner', name: 'Rich Miner', check: (s) => s.earned >= 1000, desc: 'Earn a thousand from mining.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every mining upgrade.' },
  { id: 'no-cavein', name: 'No Cave-In', check: (s) => s.trips >= 5 && s.caveIns === 0, desc: 'Five trips without a single cave-in.' },
  { id: 'mithril', name: 'Mithril!', check: (s) => s.bestOre === 'mithril', desc: 'You mined mithril.' },
];

export const MINING_TIPS = [
  { id: 'lamp-first', name: 'Lamp First', text: 'A bright lamp shows the rich seams before you swing.' },
  { id: 'canary', name: 'Trust the Canary', text: 'If the canary goes quiet, get out of the tunnel.' },
  { id: 'smelt', name: 'Smelt It', text: 'Bars sell for far more than raw ore.' },
  { id: 'deep-slow', name: 'Deep and Slow', text: 'The deep shafts pay best but punish haste.' },
  { id: 'blast-care', name: 'Blast with Care', text: 'Dynamite frees a lot of ore, and sometimes the roof too.' },
  { id: 'gem-jeweler', name: 'Gems to the Jeweler', text: 'Cut gems belong with the jeweler, nowhere else.' },
  { id: 'coal-winter', name: 'Coal in Winter', text: 'Coal prices jump when the cold comes.' },
  { id: 'timber', name: 'Timber the Roof', text: 'A timbered tunnel is a tunnel that stays open.' },
];

export const MINING_LEADERBOARD = [
  { name: 'Old Bram', kg: 9800, desc: 'Forty years below ground.' },
  { name: 'Assayer Nell', kg: 6400, desc: 'Finds ore where others find rock.' },
  { name: 'Ria', kg: 0, desc: 'The new miner in town.' },
  { name: 'Smelter Gus', kg: 5200, desc: 'Smelts what he digs.' },
  { name: 'Big Dee', kg: 4100, desc: 'Swings the biggest pick.' },
];

export const MINING_RECORDS = [
  { id: 'most-ore', name: 'Most Ore', stat: 'oreMined', unit: 'kg', desc: 'Ore mined in total.' },
  { id: 'most-bars', name: 'Most Bars', stat: 'barsSmelted', unit: 'bars', desc: 'Bars smelted in total.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Coin earned from mining.' },
  { id: 'gems', name: 'Gems Cut', stat: 'gemsCut', unit: 'gems', desc: 'Gems cut from hard ore.' },
  { id: 'deepest', name: 'Deepest Dig', stat: 'deepest', unit: 'level', desc: 'Deepest shaft reached.' },
];

export const MINING_QUICK_START = [
  'Start in the Crown Quarry with a steel pick and a bright lamp.',
  'Swing at the seams the lamp shows you; ignore bare rock.',
  'Haul your ore out before the cart gets too heavy to move.',
  'Smelt iron and copper into bars for double the coin.',
  'Save your emeralds and rubies until you can cut gems.',
  'Cut gems go to the jeweler, never the market.',
];

export const MINING_META = {
  system: 'mining',
  version: '7-B1',
  author: 'builder-1',
  ores: 12,
  shafts: 4,
  note: 'Pick, blast, smelt, sell.',
};

export const MINING_VEINS = [
  { id: 'surface-seam', name: 'Surface Seam', depth: 1, richness: 1.0, desc: 'Thin seams near the daylight.' },
  { id: 'rich-pocket', name: 'Rich Pocket', depth: 2, richness: 1.5, desc: 'A fat pocket of good ore.' },
  { id: 'mother-lode', name: 'Mother Lode', depth: 3, richness: 2.0, desc: 'The main vein, thick and rich.' },
  { id: 'gem-nest', name: 'Gem Nest', depth: 4, richness: 2.5, desc: 'A nest of crystals in the deep dark.' },
];

export const MINING_SAFETY_RULES = [
  { id: 'timber', name: 'Timber the Roof', text: 'Never work under untimbered rock.' },
  { id: 'canary', name: 'Mind the Canary', text: 'A quiet canary means bad air; leave at once.' },
  { id: 'lamp', name: 'Keep the Lamp Lit', text: 'A dead lamp in a deep shaft is a death sentence.' },
  { id: 'blast', name: 'Shout Before Blasting', text: 'Warn the whole level before you light a fuse.' },
  { id: 'water', name: 'Watch for Water', text: 'Seeping walls mean a flood is coming.' },
  { id: 'buddy', name: 'Never Mine Alone', text: 'Always tell someone which shaft you went down.' },
];

export function miningRankFor(xp) {
  let idx = 0;
  let i = 0;
  while (i < MINING_RANKS.length) {
    if (xp >= MINING_RANKS[i].xp) idx = i;
    i += 1;
  }
  return idx;
}

export function miningPriceFor(ore, rank, upgrades) {
  if (!ore) return 1;
  const owned = upgrades || [];
  let price = ore.value * (1 + 0.1 * rank);
  if (owned.includes('smelter')) price *= 1.1;
  return Math.max(1, Math.round(price));
}

export function miningBarValue(ore, rank, upgrades) {
  if (!ore) return 1;
  const owned = upgrades || [];
  let price = ore.barValue * (1 + 0.1 * rank);
  if (owned.includes('smelter')) price *= 1.25;
  return Math.max(1, Math.round(price));
}

export function miningBuyerPrice(ore, buyerId, rank, upgrades) {
  const buyer = MINING_BUYERS.find((b) => b.id === buyerId);
  if (!buyer || !ore) return 0;
  let price = miningPriceFor(ore, rank, upgrades) * buyer.mult;
  if (buyer.likes.includes(ore.id)) price *= 1.1;
  if (buyer.dislikes.includes(ore.id)) price *= 0.9;
  if (ore.hardness >= 4 && buyer.id === 'jeweler') price *= 1.2;
  if (ore.rarity <= 0.05 && buyer.id === 'collector') price *= 1.25;
  if (ore.hardness <= 2 && buyer.id === 'foundry') price *= 1.05;
  return Math.max(1, Math.round(price));
}

export function miningCarryCap(upgrades) {
  const owned = upgrades || [];
  let cap = 50;
  if (owned.includes('cart')) cap += 50;
  if (owned.includes('elevator')) cap += 40;
  return cap;
}

export function miningPickTier(upgrades) {
  const owned = upgrades || [];
  let tier = 1;
  if (owned.includes('pick')) tier += 1;
  if (owned.includes('drill')) tier += 1;
  return tier;
}

export function miningVeinFor(veinId) {
  return MINING_VEINS.find((v) => v.id === veinId) || null;
}

export function miningVeinRichness(depth) {
  let best = null;
  for (const vein of MINING_VEINS) {
    if (vein.depth <= depth && (!best || vein.depth > best.depth)) best = vein;
  }
  return best ? best.richness : 1;
}

export function miningYieldEstimate(ore, depth, upgrades) {
  const owned = upgrades || [];
  let yieldCount = 1 + Math.floor(miningVeinRichness(depth));
  if (owned.includes('drill')) yieldCount += 1;
  if (owned.includes('lamp')) yieldCount += 1;
  return { ore: ore.id, name: ore.name, yield: yieldCount, depth };
}

export function miningSafetyFor(ruleId) {
  return MINING_SAFETY_RULES.find((r) => r.id === ruleId) || null;
}

export function miningSafetyCheck(state) {
  const issues = [];
  if (state.shaft && state.shaft !== 'quarry' && !(state.upgrades || []).includes('canary')) {
    issues.push('No canary in a deep shaft.');
  }
  if (state.fatigue > 30) issues.push('Fatigue is over thirty; rest soon.');
  if (state.shaft === 'abyss' && !(state.upgrades || []).includes('elevator')) {
    issues.push('The abyss needs an elevator.');
  }
  if (state.truckHealth !== undefined && state.truckHealth < 30) {
    issues.push('Truck health is low.');
  }
  return { safe: issues.length === 0, issues };
}

const MINING_STATE_KEYS = [
  'xp', 'rank', 'trips', 'swings', 'oreMined', 'barsSmelted', 'gemsCut', 'earned',
  'spent', 'hazards', 'caveIns', 'gasHits', 'blasts', 'richVeins', 'ore', 'bars',
  'gems', 'gemsSold', 'upgrades', 'shaft', 'shaftTimeLeft', 'vein', 'veinLeft',
  'lastDay', 'activeContract', 'contractProgress', 'contractsDone', 'contractsFailed',
  'bestOre', 'bestValue', 'dailyMined', 'dailyEarned', 'carryKg', 'totalKg',
  'currentEvent', 'deepest', 'fatigue',
];

function miningChallengeAmount(target, st) {
  if (target === 'oreMined') return st.oreMined;
  if (target === 'barsSmelted') return st.barsSmelted;
  if (target === 'earned') return st.earned;
  if (target === 'gemsCut') return st.gemsCut;
  if (target === 'trips') return st.trips;
  if (target === 'contractsDone') return st.contractsDone;
  if (target === 'bestValue') return st.bestValue;
  if (target === 'deepest') return st.deepest;
  return 0;
}

export function miningHelperBonus(ids, skill) {
  let total = 0;
  const list = ids || [];
  for (let i = 0; i < list.length; i++) {
    const helper = MINING_HELPERS.find((h) => h.id === list[i]);
    if (helper && helper.skill === skill) total += helper.bonus;
  }
  return total;
}

export function miningChallengeProgress(challenge, state) {
  const amount = Math.floor(miningChallengeAmount(challenge.target, state));
  return { id: challenge.id, name: challenge.name, amount, goal: challenge.goal, done: amount >= challenge.goal };
}

export function miningTipFor(day) {
  const idx = ((day || 0) % MINING_TIPS.length + MINING_TIPS.length) % MINING_TIPS.length;
  return MINING_TIPS[idx];
}

export function miningLeaderboardWith(kg) {
  const rows = MINING_LEADERBOARD.map((row) => ({
    name: row.name,
    kg: row.name === 'Ria' ? kg : row.kg,
    desc: row.desc,
  }));
  rows.sort((a, b) => b.kg - a.kg);
  return rows.map((row, i) => ({ rank: i + 1, name: row.name, kg: row.kg, desc: row.desc }));
}

export function miningEfficiency(oreMined, swings) {
  if (!swings) return 0;
  return Math.round((oreMined / swings) * 100) / 100;
}

export function miningProfitPerTrip(earned, trips) {
  if (!trips) return 0;
  return Math.round((earned / trips) * 10) / 10;
}

export function miningGrade(oreMined, hazards, gemsCut) {
  if (!oreMined) return 'D';
  const score = oreMined - hazards * 10 + gemsCut * 20;
  if (score >= 150) return 'S';
  if (score >= 80) return 'A';
  if (score >= 40) return 'B';
  if (score >= 10) return 'C';
  return 'D';
}

function miningRecordValue(stat, state) {
  if (stat === 'oreMined') return state.oreMined;
  if (stat === 'barsSmelted') return state.barsSmelted;
  if (stat === 'earned') return Math.round(state.earned);
  if (stat === 'gemsCut') return state.gemsCut;
  if (stat === 'deepest') return state.deepest;
  return 0;
}

export function miningRecordFor(id, state) {
  const rec = MINING_RECORDS.find((r) => r.id === id);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: miningRecordValue(rec.stat, state), unit: rec.unit };
}

export function miningAllRecords(state) {
  return MINING_RECORDS.map((rec) => ({
    id: rec.id,
    name: rec.name,
    value: miningRecordValue(rec.stat, state),
    unit: rec.unit,
    desc: rec.desc,
  }));
}

export function miningSummary(state) {
  const rankName = MINING_RANKS[state.rank] ? MINING_RANKS[state.rank].name : 'Surface Picker';
  return `${rankName} — ${state.oreMined} ore, ${state.barsSmelted} bars, ${state.gemsCut} gems, $${Math.round(state.earned)} earned, deepest ${state.deepest}.`;
}

export function miningNextGoal(state) {
  if (state.oreMined < 50) return 'Mine fifty pieces of ore.';
  if (state.barsSmelted < 20) return 'Smelt twenty bars.';
  if (state.rank < 2) return 'Reach rank 2 and become a Shaft Hand.';
  return 'Reach the abyss, depth four.';
}

export function miningQuickStart(step) {
  if (step < 0 || step >= MINING_QUICK_START.length) return null;
  return MINING_QUICK_START[step];
}

export function createMiningSystem(ctx = {}) {
  const rng = ctx.rng || Math.random;
  const getDay = ctx.getDay || (() => 1);
  const getHour = ctx.getHour || (() => 12);
  const getCash = ctx.getCash || (() => 0);
  const addCash = ctx.addCash || (() => {});
  const addHeat = ctx.addHeat || (() => {});
  const log = ctx.log || (() => {});
  const getPlayerPos = ctx.getPlayerPos || (() => ({ x: 0, z: 0 }));
  const getWeather = ctx.getWeather || (() => ({ condition: 'clear' }));

  const blankMaps = () => {
    const ore = {};
    const bars = {};
    for (const o of MINING_ORES) {
      ore[o.id] = 0;
      bars[o.id] = 0;
    }
    return { ore, bars };
  };

  const maps = blankMaps();

  const sys = {
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
    ore: maps.ore,
    bars: maps.bars,
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

  function addXp(amount) {
    sys.xp += amount;
    const next = miningRankFor(sys.xp);
    if (next > sys.rank) {
      sys.rank = next;
      log(`Rank up! You are now ${MINING_RANKS[next].name}.`);
    }
  }

  function bad(reason) {
    return { ok: false, reason };
  }

  function good(extra) {
    return { ok: true, ...extra };
  }

  function activeEvent() {
    if (!sys.currentEvent) return null;
    return MINING_EVENTS.find((e) => e.id === sys.currentEvent) || null;
  }

  function pickOre(depth) {
    const pool = MINING_ORES.filter((o) => o.depth <= depth);
    if (!pool.length) return null;
    const ev = activeEvent();
    let total = 0;
    const weights = [];
    for (const ore of pool) {
      let w = ore.rarity;
      if (sys.upgrades.includes('lamp')) w *= 1.3;
      if (ev && ev.ores.includes(ore.id)) w *= ev.mult;
      weights.push(w);
      total += w;
    }
    let roll = rng() * total;
    let idx = 0;
    while (idx < pool.length - 1 && roll > weights[idx]) {
      roll -= weights[idx];
      idx += 1;
    }
    return pool[idx];
  }

  function settleContract(oreId, qty) {
    if (!sys.activeContract) return;
    if (sys.activeContract.ore !== oreId) return;
    sys.contractProgress += qty;
    if (sys.contractProgress < sys.activeContract.qty) return;
    const pay = sys.activeContract.pay + 50 * sys.rank;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    sys.contractsDone += 1;
    log(`Contract done: ${sys.activeContract.name} paid $${pay}.`);
    sys.activeContract = null;
    sys.contractProgress = 0;
    addXp(60);
  }

  sys.enterShaft = function enterShaft(shaftId) {
    const shaft = MINING_SHAFTS.find((s) => s.id === shaftId);
    if (!shaft) return bad('unknown-shaft');
    if (sys.shaft) return bad('already-mining');
    if (shaft.depth === 4 && sys.rank < 3) return bad('rank-too-low');
    if (shaft.depth === 3 && sys.rank < 2) return bad('rank-too-low');
    const hour = getHour();
    if (hour >= 23 || hour <= 4) return bad('night');
    sys.shaft = shaftId;
    let seconds = shaft.timeMin * 60;
    if (sys.upgrades.includes('elevator')) seconds = Math.floor(seconds / 2);
    sys.shaftTimeLeft = seconds;
    if (shaft.depth > sys.deepest) sys.deepest = shaft.depth;
    log(`Down into ${shaft.name}.`);
    return good({ shaft: shaftId, depth: shaft.depth });
  };

  sys.swing = function swing() {
    if (!sys.shaft) return bad('no-shaft');
    const cap = miningCarryCap(sys.upgrades);
    if (sys.carryKg >= cap) return bad('carry-full');
    const shaft = MINING_SHAFTS.find((s) => s.id === sys.shaft);
    const ore = pickOre(shaft.depth);
    if (!ore) return bad('no-ore');
    const tier = miningPickTier(sys.upgrades);
    if (ore.hardness > tier + 1) return bad('too-hard');
    let qty = 1 + Math.floor(rng() * 3);
    if (sys.upgrades.includes('drill')) qty += 1;
    const room = Math.max(0, Math.floor(cap - sys.carryKg));
    if (qty > room) qty = room;
    if (qty <= 0) return bad('carry-full');
    sys.ore[ore.id] += qty;
    sys.oreMined += qty;
    sys.dailyMined += qty;
    sys.swings += 1;
    sys.carryKg += qty * ore.hardness;
    sys.totalKg += qty * ore.hardness;
    sys.fatigue += 1;
    addXp(ore.hardness);
    if (ore.value > sys.bestValue) {
      sys.bestValue = ore.value;
      sys.bestOre = ore.id;
    }
    if (rng() < 0.1) {
      sys.ore[ore.id] += 1;
      sys.oreMined += 1;
      sys.richVeins += 1;
      log('A rich vein! An extra piece of ore.');
    }
    let hazardChance = shaft.danger * 0.05;
    if (sys.upgrades.includes('canary')) hazardChance *= 0.5;
    if (rng() < hazardChance) {
      const hazard = MINING_HAZARDS[Math.floor(rng() * MINING_HAZARDS.length)];
      sys.hazards += 1;
      if (hazard.id === 'gas') sys.gasHits += 1;
      if (hazard.damage >= 3) addHeat(1);
      log(`Hazard: ${hazard.name}!`);
    }
    settleContract(ore.id, qty);
    return good({ ore: ore.id, quantity: qty, carryKg: Math.round(sys.carryKg * 10) / 10 });
  };

  sys.blast = function blast() {
    if (!sys.shaft) return bad('no-shaft');
    if (!sys.upgrades.includes('dynamite')) return bad('no-dynamite');
    const cap = miningCarryCap(sys.upgrades);
    const shaft = MINING_SHAFTS.find((s) => s.id === sys.shaft);
    const ore = pickOre(shaft.depth);
    if (!ore) return bad('no-ore');
    let qty = 4 + Math.floor(rng() * 5);
    const room = Math.max(0, Math.floor(cap - sys.carryKg));
    if (qty > room) qty = room;
    if (qty <= 0) return bad('carry-full');
    sys.ore[ore.id] += qty;
    sys.oreMined += qty;
    sys.dailyMined += qty;
    sys.blasts += 1;
    sys.carryKg += qty * ore.hardness;
    sys.totalKg += qty * ore.hardness;
    addXp(ore.hardness * 2);
    let caveIn = false;
    if (rng() < 0.25) {
      caveIn = true;
      sys.caveIns += 1;
      addHeat(2);
      log('Cave-in! The blast brought the roof down.');
    }
    settleContract(ore.id, qty);
    return good({ ore: ore.id, quantity: qty, caveIn });
  };

  sys.leaveShaft = function leaveShaft() {
    if (!sys.shaft) return bad('no-shaft');
    const done = sys.shaft;
    sys.shaft = null;
    sys.shaftTimeLeft = 0;
    sys.trips += 1;
    sys.carryKg = 0;
    sys.fatigue = 0;
    return good({ shaft: done });
  };

  sys.smelt = function smelt(oreId, qty) {
    if (!sys.upgrades.includes('smelter')) return bad('no-smelter');
    const ore = MINING_ORES.find((o) => o.id === oreId);
    if (!ore) return bad('unknown-ore');
    if ((sys.ore[oreId] || 0) < qty) return bad('not-enough');
    if (qty < 2) return bad('need-two');
    const bars = Math.floor(qty / 2);
    const used = bars * 2;
    sys.ore[oreId] -= used;
    sys.bars[oreId] += bars;
    sys.barsSmelted += bars;
    if (ore.hardness >= 4) {
      const gem = MINING_GEMS.find((g) => g.ore === oreId);
      if (gem) {
        for (let i = 0; i < bars; i++) sys.gems.push(gem.id);
        sys.gemsCut += bars;
      }
    }
    addXp(bars * 3);
    return good({ bars, ore: oreId });
  };

  sys.sellOre = function sellOre(buyerId, oreId, qty) {
    const buyer = MINING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return bad('unknown-buyer');
    if (sys.rank < buyer.minRank) return bad('rank-too-low');
    const ore = MINING_ORES.find((o) => o.id === oreId);
    if (!ore) return bad('unknown-ore');
    if ((sys.ore[oreId] || 0) < qty) return bad('not-enough');
    const unitPrice = miningBuyerPrice(ore, buyerId, sys.rank, sys.upgrades);
    const total = unitPrice * qty;
    sys.ore[oreId] -= qty;
    sys.earned += total;
    sys.dailyEarned += total;
    addCash(total);
    addXp(qty);
    return good({ total, unitPrice, quantity: qty });
  };

  sys.sellBars = function sellBars(buyerId, oreId, qty) {
    const buyer = MINING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return bad('unknown-buyer');
    if (sys.rank < buyer.minRank) return bad('rank-too-low');
    const ore = MINING_ORES.find((o) => o.id === oreId);
    if (!ore) return bad('unknown-ore');
    if ((sys.bars[oreId] || 0) < qty) return bad('not-enough');
    const unitPrice = Math.max(1, Math.round(miningBarValue(ore, sys.rank, sys.upgrades) * buyer.mult));
    const total = unitPrice * qty;
    sys.bars[oreId] -= qty;
    sys.earned += total;
    sys.dailyEarned += total;
    addCash(total);
    addXp(qty * 2);
    return good({ total, unitPrice, quantity: qty });
  };

  sys.sellGem = function sellGem(gemId) {
    const idx = sys.gems.indexOf(gemId);
    if (idx < 0) return bad('not-held');
    const gem = MINING_GEMS.find((g) => g.id === gemId);
    if (!gem) return bad('unknown-gem');
    sys.gems.splice(idx, 1);
    sys.gemsSold += 1;
    const value = gem.value + 40 * sys.rank;
    sys.earned += value;
    sys.dailyEarned += value;
    addCash(value);
    addXp(30);
    return good({ value });
  };

  sys.sellAll = function sellAll(buyerId) {
    const buyer = MINING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return bad('unknown-buyer');
    if (sys.rank < buyer.minRank) return bad('rank-too-low');
    const lines = [];
    let total = 0;
    let count = 0;
    for (const ore of MINING_ORES) {
      const oreQty = sys.ore[ore.id] || 0;
      if (oreQty > 0) {
        const unitPrice = miningBuyerPrice(ore, buyerId, sys.rank, sys.upgrades);
        const lineTotal = unitPrice * oreQty;
        lines.push({ kind: 'ore', id: ore.id, quantity: oreQty, total: lineTotal });
        total += lineTotal;
        count += oreQty;
        sys.ore[ore.id] = 0;
      }
      const barQty = sys.bars[ore.id] || 0;
      if (barQty > 0) {
        const unitPrice = Math.max(1, Math.round(miningBarValue(ore, sys.rank, sys.upgrades) * buyer.mult));
        const lineTotal = unitPrice * barQty;
        lines.push({ kind: 'bar', id: ore.id, quantity: barQty, total: lineTotal });
        total += lineTotal;
        count += barQty;
        sys.bars[ore.id] = 0;
      }
    }
    if (!lines.length) return bad('nothing-to-sell');
    sys.earned += total;
    sys.dailyEarned += total;
    addCash(total);
    addXp(count);
    return good({ total, count, lines });
  };

  sys.buyUpgrade = function buyUpgrade(upgradeId) {
    const upgrade = MINING_UPGRADES.find((u) => u.id === upgradeId);
    if (!upgrade) return bad('unknown-upgrade');
    if (sys.upgrades.includes(upgradeId)) return bad('already-owned');
    if (getCash() < upgrade.cost) return bad('not-enough-cash');
    addCash(-upgrade.cost);
    sys.spent += upgrade.cost;
    sys.upgrades.push(upgradeId);
    addXp(20);
    return good({ id: upgradeId });
  };

  sys.takeContract = function takeContract(contractId) {
    const contract = MINING_CONTRACTS.find((c) => c.id === contractId);
    if (!contract) return bad('unknown-contract');
    if (sys.activeContract) return bad('contract-active');
    if (sys.rank < contract.rep) return bad('rank-too-low');
    const day = getDay();
    sys.activeContract = { ...contract, dayTaken: day, deadline: day + contract.days };
    sys.contractProgress = 0;
    return good({ contract: sys.activeContract });
  };

  sys.deliverContract = function deliverContract() {
    if (!sys.activeContract) return bad('no-contract');
    if (sys.contractProgress < sys.activeContract.qty) return bad('not-ready');
    if ((sys.ore[sys.activeContract.ore] || 0) < sys.activeContract.qty) return bad('not-enough');
    sys.ore[sys.activeContract.ore] -= sys.activeContract.qty;
    const pay = sys.activeContract.pay + 50 * sys.rank;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    sys.contractsDone += 1;
    sys.activeContract = null;
    sys.contractProgress = 0;
    addXp(60);
    return good({ pay });
  };

  sys.abandonContract = function abandonContract() {
    if (!sys.activeContract) return bad('no-contract');
    sys.activeContract = null;
    sys.contractProgress = 0;
    sys.contractsFailed += 1;
    return good({});
  };

  sys.priceBoard = function priceBoard() {
    return MINING_ORES.map((o) => ({
      id: o.id,
      name: o.name,
      price: miningPriceFor(o, sys.rank, sys.upgrades),
      barValue: miningBarValue(o, sys.rank, sys.upgrades),
      ore: sys.ore[o.id] || 0,
      bars: sys.bars[o.id] || 0,
      depth: o.depth,
    }));
  };

  sys.shaftReport = function shaftReport() {
    return MINING_SHAFTS.map((s) => ({
      id: s.id,
      name: s.name,
      depth: s.depth,
      mult: s.mult,
      danger: s.danger,
      ores: MINING_ORES.filter((o) => o.depth <= s.depth).map((o) => o.id),
    }));
  };

  sys.dailyEvent = function dailyEvent() {
    const roll = rng();
    if (roll < 0.2) {
      const ev = MINING_EVENTS[Math.floor(rng() * MINING_EVENTS.length)];
      sys.currentEvent = ev.id;
      log(`Today's event: ${ev.name}.`);
      return good({ event: ev.id, name: ev.name });
    }
    if (roll < 0.3) {
      const ore = MINING_ORES[Math.floor(rng() * MINING_ORES.length)];
      sys.ore[ore.id] += 3;
      sys.currentEvent = null;
      return good({ event: 'gift', ore: ore.id, name: 'Gift' });
    }
    sys.currentEvent = null;
    return good({ event: 'none', name: 'None' });
  };

  sys.tick = function tick(dt) {
    const step = dt || 0;
    if (sys.shaft) {
      sys.shaftTimeLeft -= step;
      if (sys.shaftTimeLeft <= 0) {
        const done = sys.shaft;
        sys.shaft = null;
        sys.shaftTimeLeft = 0;
        sys.trips += 1;
        sys.carryKg = 0;
        sys.fatigue = 0;
        log(`Shift over in ${done}; the foreman waves you out.`);
      }
    }
    if (sys.fatigue > 40) sys.fatigue = 40;
  };

  sys.tickDay = function tickDay(day) {
    if (day === sys.lastDay) return;
    sys.lastDay = day;
    sys.dailyMined = 0;
    sys.dailyEarned = 0;
    if (sys.activeContract && day > sys.activeContract.deadline && sys.contractProgress < sys.activeContract.qty) {
      sys.contractsFailed += 1;
      log(`Contract failed: ${sys.activeContract.name}.`);
      sys.activeContract = null;
      sys.contractProgress = 0;
    }
    sys.dailyEvent();
  };

  sys.serialize = function serialize() {
    const out = {};
    for (const key of MINING_STATE_KEYS) {
      out[key] = JSON.parse(JSON.stringify(sys[key]));
    }
    return out;
  };

  sys.deserialize = function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    for (const key of MINING_STATE_KEYS) {
      if (key in saved) sys[key] = JSON.parse(JSON.stringify(saved[key]));
    }
    for (const o of MINING_ORES) {
      if (sys.ore[o.id] === undefined) sys.ore[o.id] = 0;
      if (sys.bars[o.id] === undefined) sys.bars[o.id] = 0;
    }
    const next = miningRankFor(sys.xp);
    if (next > sys.rank) sys.rank = next;
  };

  sys.stats = function stats() {
    return {
      rank: MINING_RANKS[sys.rank].name,
      xp: sys.xp,
      trips: sys.trips,
      swings: sys.swings,
      oreMined: sys.oreMined,
      barsSmelted: sys.barsSmelted,
      gemsCut: sys.gemsCut,
      gemsSold: sys.gemsSold,
      earned: Math.round(sys.earned),
      spent: sys.spent,
      hazards: sys.hazards,
      caveIns: sys.caveIns,
      gasHits: sys.gasHits,
      blasts: sys.blasts,
      richVeins: sys.richVeins,
      upgrades: sys.upgrades.length,
      shaft: sys.shaft,
      deepest: sys.deepest,
      activeContract: sys.activeContract ? sys.activeContract.id : null,
      contractsDone: sys.contractsDone,
      contractsFailed: sys.contractsFailed,
      bestOre: sys.bestOre,
      dailyMined: sys.dailyMined,
      dailyEarned: Math.round(sys.dailyEarned),
      carryKg: Math.round(sys.carryKg * 10) / 10,
      carryCap: miningCarryCap(sys.upgrades),
      event: sys.currentEvent,
    };
  };

  sys.hudLine = function hudLine() {
    if (sys.shaft) {
      const shaft = MINING_SHAFTS.find((s) => s.id === sys.shaft);
      return `Mining ${shaft.name} — ${Math.round(sys.carryKg)}kg in the cart`;
    }
    if (sys.activeContract) {
      return `Contract ${sys.activeContract.name} ${sys.contractProgress}/${sys.activeContract.qty}`;
    }
    let oreTotal = 0;
    for (const o of MINING_ORES) oreTotal += sys.ore[o.id] || 0;
    if (oreTotal > 0) return `${oreTotal} ore to smelt or sell`;
    if (sys.gems.length > 0) return `${sys.gems.length} cut gems to sell`;
    return '';
  };

  sys.interact = function interact() {
    const pos = getPlayerPos();
    const dx = (pos.x || 0) - 350;
    const dz = (pos.z || 0) - 420;
    if (Math.hypot(dx, dz) > 40) return false;
    if (!sys.shaft) {
      sys.enterShaft('quarry');
      return true;
    }
    sys.swing();
    return true;
  };

  return sys;
}

export function createMiningExtras(system) {
  const sys = system;
  let hired = [];
  let claimed = [];
  let wagesPaid = 0;

  function bad(reason) {
    return { ok: false, reason };
  }

  function good(extra) {
    return { ok: true, ...extra };
  }

  const extras = {
    hireHelper(id) {
      const helper = MINING_HELPERS.find((h) => h.id === id);
      if (!helper) return bad('unknown-helper');
      if (hired.includes(id)) return bad('already-hired');
      hired.push(id);
      return good({ id, name: helper.name, wage: helper.wage });
    },
    fireHelper(id) {
      if (!hired.includes(id)) return bad('not-hired');
      hired = hired.filter((h) => h !== id);
      return good({ id });
    },
    payWages() {
      let due = 0;
      for (const id of hired) {
        const helper = MINING_HELPERS.find((h) => h.id === id);
        if (helper) due += helper.wage;
      }
      wagesPaid += due;
      return good({ due, helpers: [...hired], wagesPaid });
    },
    helperBonus(skill) {
      let sum = 0;
      for (const id of hired) {
        const helper = MINING_HELPERS.find((h) => h.id === id);
        if (helper && helper.skill === skill) sum += helper.bonus;
      }
      return sum;
    },
    challenges() {
      return MINING_CHALLENGES.map((c) => miningChallengeProgress(c, sys));
    },
    claimChallenge(id) {
      const challenge = MINING_CHALLENGES.find((c) => c.id === id);
      if (!challenge) return bad('unknown-challenge');
      if (claimed.includes(id)) return bad('already-claimed');
      const progress = miningChallengeProgress(challenge, sys);
      if (!progress.done) return bad('not-done');
      claimed.push(id);
      return good({ id, xp: challenge.xp });
    },
    achievements() {
      return MINING_ACHIEVEMENTS.map((a) => ({
        id: a.id,
        name: a.name,
        desc: a.desc,
        done: !!a.check(sys),
      }));
    },
    assay(oreId) {
      const ore = MINING_ORES.find((o) => o.id === oreId);
      if (!ore) return bad('unknown-ore');
      return good({
        ore: ore.id,
        value: ore.value,
        barValue: ore.barValue,
        hardness: ore.hardness,
        depth: ore.depth,
      });
    },
    inventoryValue() {
      let value = 0;
      for (const o of MINING_ORES) {
        value += (sys.ore[o.id] || 0) * o.value;
        value += (sys.bars[o.id] || 0) * o.barValue;
      }
      return good({ value: Math.round(value) });
    },
    weighIn() {
      const cap = miningCarryCap(sys.upgrades);
      return good({
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
