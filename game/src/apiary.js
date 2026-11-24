export const APIARY_HIVES = [
  { id: 'langstroth', name: 'Langstroth Hive', value: 60, honey: 8, wax: 3, capacity: 8, difficulty: 1, rarity: 0.3, desc: 'The standard box hive, steady and reliable.' },
  { id: 'topbar', name: 'Top-Bar Hive', value: 45, honey: 6, wax: 2, capacity: 6, difficulty: 1, rarity: 0.25, desc: 'Simple bars the bees build on themselves.' },
  { id: 'warre', name: 'Warre Hive', value: 50, honey: 7, wax: 3, capacity: 7, difficulty: 2, rarity: 0.2, desc: 'A tall, quiet hive for patient keepers.' },
  { id: 'skep', name: 'Skep', value: 25, honey: 4, wax: 2, capacity: 4, difficulty: 1, rarity: 0.28, desc: 'A woven straw basket, the old way.' },
  { id: 'flow', name: 'Flow Hive', value: 150, honey: 12, wax: 4, capacity: 10, difficulty: 3, rarity: 0.08, desc: 'Honey on tap, no smoke needed.' },
  { id: 'observation', name: 'Observation Hive', value: 90, honey: 5, wax: 2, capacity: 5, difficulty: 2, rarity: 0.12, desc: 'Glass walls for watching the colony work.' },
  { id: 'nuc', name: 'Nucleus Hive', value: 40, honey: 3, wax: 1, capacity: 3, difficulty: 1, rarity: 0.22, desc: 'A small starter colony in a small box.' },
  { id: 'rooftop', name: 'Rooftop Hive', value: 80, honey: 6, wax: 3, capacity: 6, difficulty: 2, rarity: 0.15, desc: 'Bees above the town, working the gardens.' },
  { id: 'mangrove', name: 'Mangrove Hive', value: 220, honey: 14, wax: 5, capacity: 12, difficulty: 4, rarity: 0.04, desc: 'A great hive in the mangroves, heavy with honey.' },
  { id: 'orchard', name: 'Orchard Hive', value: 110, honey: 10, wax: 4, capacity: 9, difficulty: 3, rarity: 0.07, desc: 'Bees working the blossom rows.' },
];

export const APIARY_FLOWERS = [
  { id: 'clover', name: 'Clover', nectar: 1.2, season: 'spring', desc: 'Low white blossom, steady nectar.' },
  { id: 'lavender', name: 'Lavender', nectar: 1.4, season: 'summer', desc: 'Purple rows that bees adore.' },
  { id: 'orange', name: 'Orange Blossom', nectar: 1.3, season: 'spring', desc: 'Sweet citrus blossom.' },
  { id: 'acacia', name: 'Acacia', nectar: 1.5, season: 'summer', desc: 'Pale blossom with a clear, light honey.' },
  { id: 'sunflower', name: 'Sunflower', nectar: 1.2, season: 'summer', desc: 'Big yellow faces full of pollen.' },
  { id: 'buckwheat', name: 'Buckwheat', nectar: 1.1, season: 'autumn', desc: 'Dark, strong honey from late blossom.' },
  { id: 'mangrove', name: 'Mangrove Bloom', nectar: 2.0, season: 'summer', desc: 'The richest flow in the county.' },
  { id: 'wildflower', name: 'Wildflower', nectar: 1.0, season: 'all', desc: 'Whatever is blooming nearby.' },
];

export const APIARY_BUYERS = [
  { id: 'market', name: 'Town Market', mult: 1.0, likes: ['honey'], dislikes: ['propolis'], mood: 'steady', minRank: 0, desc: 'Buys jars of honey by the dozen.' },
  { id: 'bakery', name: 'The Bakery', mult: 1.1, likes: ['honey', 'mead'], dislikes: ['wax'], mood: 'busy', minRank: 0, desc: 'Honey for buns and sweet bread.' },
  { id: 'apothecary', name: 'The Apothecary', mult: 1.3, likes: ['jelly', 'propolis'], dislikes: ['comb'], mood: 'picky', minRank: 2, desc: 'Pays dearly for royal jelly and propolis.' },
  { id: 'candle', name: 'Candle Maker', mult: 1.2, likes: ['wax', 'comb'], dislikes: ['mead'], mood: 'keen', minRank: 1, desc: 'Wants wax for fine candles.' },
  { id: 'exporter', name: 'Honey Exporter', mult: 1.4, likes: ['honey', 'mead', 'jelly'], dislikes: ['wax'], mood: 'eager', minRank: 3, desc: 'Ships the best honey overseas.' },
];

export const APIARY_UPGRADES = [
  { id: 'veil', name: 'Bee Veil', cost: 50, desc: 'A veil that keeps stings off your face.', effect: 'safety' },
  { id: 'smoker', name: 'Smoker', cost: 90, desc: 'Cool smoke that calms the bees.', effect: 'harvest' },
  { id: 'queen', name: 'Pedigree Queen', cost: 200, desc: 'A fine queen whose daughters work twice as hard.', effect: 'queen' },
  { id: 'extractor', name: 'Honey Extractor', cost: 320, desc: 'A spinner that pulls every drop of honey.', effect: 'harvest' },
  { id: 'mite', name: 'Mite Treatment', cost: 180, desc: 'Treatment that keeps the mites down.', effect: 'health' },
  { id: 'frames', name: 'Extra Frames', cost: 260, desc: 'More frames means roomier hives.', effect: 'capacity' },
  { id: 'apiary', name: 'Apiary Shed', cost: 600, desc: 'A shed that shelters hives from the cold.', effect: 'shelter' },
  { id: 'breeder', name: 'Breeder Kit', cost: 900, desc: 'Everything needed to split colonies free.', effect: 'breed' },
];

export const APIARY_RANKS = [
  { level: 0, name: 'Bee Friend', xp: 0, perk: 'The bees tolerate you.' },
  { level: 1, name: 'Beekeeper', xp: 120, perk: 'A steady hand with the smoker.' },
  { level: 2, name: 'Apiarist', xp: 300, perk: 'Colonies thrive under your care.' },
  { level: 3, name: 'Honey Master', xp: 620, perk: 'The apothecary asks for you by name.' },
  { level: 4, name: 'Queen of Bees', xp: 1100, perk: 'Every hive in the county is yours.' },
];

export const APIARY_PRODUCTS = [
  { id: 'honey', name: 'Honey', value: 8, desc: 'Golden jars of honey.' },
  { id: 'wax', name: 'Beeswax', value: 12, desc: 'Clean yellow wax.' },
  { id: 'jelly', name: 'Royal Jelly', value: 45, desc: 'Precious jelly for queens.' },
  { id: 'propolis', name: 'Propolis', value: 30, desc: 'Sticky resin the bees gather.' },
  { id: 'comb', name: 'Honeycomb', value: 20, desc: 'Sections of comb dripping with honey.' },
  { id: 'mead', name: 'Mead', value: 60, desc: 'Bottled honey wine.' },
];

export const APIARY_EVENTS = [
  { id: 'blossom', name: 'Full Blossom', mult: 1.3, flowers: ['clover', 'lavender'], desc: 'Every blossom in the county is open.' },
  { id: 'swarm', name: 'Swarm Season', mult: 1.0, flowers: [], desc: 'Swarms are on the move; catch one free.' },
  { id: 'mite-outbreak', name: 'Mite Outbreak', mult: 0.7, flowers: [], desc: 'Mites are spreading through the hives.' },
  { id: 'wasp-attack', name: 'Wasp Attack', mult: 0.8, flowers: [], desc: 'Wasps are raiding the weaker colonies.' },
  { id: 'cold-snap', name: 'Cold Snap', mult: 0.6, flowers: [], desc: 'A bitter cold snap chills the hives.' },
  { id: 'mangrove-bloom', name: 'Mangrove Bloom', mult: 1.5, flowers: ['mangrove'], desc: 'The mangroves burst into flower.' },
];

export const APIARY_CONTRACTS = [
  { id: 'honey-20', name: 'Honey Twenty', product: 'honey', qty: 20, pay: 240, days: 2, rep: 0, desc: 'Twenty jars of honey for the market.' },
  { id: 'wax-10', name: 'Wax Ten', product: 'wax', qty: 10, pay: 220, days: 2, rep: 1, desc: 'Ten blocks of wax for the candle maker.' },
  { id: 'jelly-4', name: 'Jelly Four', product: 'jelly', qty: 4, pay: 320, days: 3, rep: 2, desc: 'Four vials of royal jelly.' },
  { id: 'mead-6', name: 'Mead Six', product: 'mead', qty: 6, pay: 480, days: 3, rep: 2, desc: 'Six bottles of mead for the tavern.' },
  { id: 'comb-12', name: 'Comb Twelve', product: 'comb', qty: 12, pay: 360, days: 2, rep: 1, desc: 'Twelve comb sections for the fair.' },
  { id: 'mangrove-5', name: 'Mangrove Five', product: 'honey', qty: 5, pay: 600, days: 3, rep: 3, desc: 'Five jars of rare mangrove honey.' },
];

export const APIARY_PESTS = [
  { id: 'mite', name: 'Varroa Mite', chance: 0.15, damage: 2, desc: 'Tiny mites that weaken the bees.' },
  { id: 'wasp', name: 'Wasp', chance: 0.1, damage: 3, desc: 'Wasps rob honey and kill bees.' },
  { id: 'moth', name: 'Wax Moth', chance: 0.08, damage: 1, desc: 'Moths chew the comb.' },
  { id: 'bear', name: 'Bear', chance: 0.05, damage: 5, desc: 'A bear that smashes hives for honey.' },
  { id: 'foulbrood', name: 'Foulbrood', chance: 0.04, damage: 4, desc: 'A sickness that kills the brood.' },
];

export const APIARY_HELPERS = [
  { id: 'mentor', name: 'Old Mentor', wage: 30, skill: 'tend', bonus: 0.25, desc: 'Sixty years of beekeeping wisdom.' },
  { id: 'smoker-hand', name: 'Smoker Hand', wage: 35, skill: 'harvest', bonus: 0.2, desc: 'Calms bees with a puff of smoke.' },
  { id: 'queen-breeder', name: 'Queen Breeder', wage: 60, skill: 'queen', bonus: 0.5, desc: 'Raises queens worth their weight in gold.' },
  { id: 'seller', name: 'Market Seller', wage: 45, skill: 'sell', bonus: 0.15, desc: 'Sells honey with a smile.' },
];

export const APIARY_CHALLENGES = [
  { id: 'hives-5', name: 'Five Hives', target: 'hiveCount', goal: 5, xp: 80, desc: 'Place five hives.' },
  { id: 'honey-100', name: 'A Hundred Honey', target: 'honeyMade', goal: 100, xp: 100, desc: 'Make a hundred honey.' },
  { id: 'harvests-20', name: 'Twenty Harvests', target: 'harvests', goal: 20, xp: 110, desc: 'Harvest twenty times.' },
  { id: 'earn-1000', name: 'A Thousand Earned', target: 'earned', goal: 1000, xp: 120, desc: 'Earn a thousand from the apiary.' },
  { id: 'splits-3', name: 'Three Splits', target: 'splits', goal: 3, xp: 130, desc: 'Split three colonies.' },
  { id: 'swarms-2', name: 'Two Swarms', target: 'swarmsCaught', goal: 2, xp: 140, desc: 'Catch two swarms.' },
  { id: 'mead-10', name: 'Ten Mead', target: 'meadMade', goal: 10, xp: 120, desc: 'Brew ten bottles of mead.' },
  { id: 'contracts-5', name: 'Five Contracts', target: 'contractsDone', goal: 5, xp: 140, desc: 'Finish five apiary contracts.' },
];

export const APIARY_ACHIEVEMENTS = [
  { id: 'first-hive', name: 'First Hive', check: (s) => s.hiveCount >= 1, desc: 'Your first placed hive.' },
  { id: 'first-harvest', name: 'First Harvest', check: (s) => s.harvests >= 1, desc: 'Your first honey harvest.' },
  { id: 'first-mead', name: 'First Mead', check: (s) => s.meadMade >= 1, desc: 'Your first bottle of mead.' },
  { id: 'rank-3', name: 'Honey Master', check: (s) => s.rank >= 3, desc: 'Reach rank three.' },
  { id: 'rich-keeper', name: 'Rich Keeper', check: (s) => s.earned >= 1000, desc: 'Earn a thousand from the apiary.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every apiary upgrade.' },
  { id: 'no-loss', name: 'No Loss', check: (s) => s.hiveCount >= 5 && s.coloniesLost === 0, desc: 'Five hives without losing one.' },
  { id: 'mangrove', name: 'Mangrove Gold', check: (s) => s.bestHive === 'mangrove', desc: 'Your best harvest came from a mangrove hive.' },
];

export const APIARY_TIPS = [
  { id: 'veil-first', name: 'Veil First', text: 'Buy the veil before your first hive; stings add up.' },
  { id: 'blossom', name: 'Follow the Blossom', text: 'Set your flower to whatever is blooming.' },
  { id: 'split', name: 'Split Strong Colonies', text: 'Split a colony at strength eight for a free hive.' },
  { id: 'mite', name: 'Watch the Mites', text: 'Mite treatment saves colonies in an outbreak.' },
  { id: 'mead', name: 'Brew the Spare', text: 'Spare honey brews into mead worth far more.' },
  { id: 'mangrove', name: 'Mangrove Gold', text: 'Mangrove honey is the richest flow in the county.' },
  { id: 'winter', name: 'Winter Care', text: 'Cold snaps kill weak colonies; keep them strong.' },
  { id: 'jelly', name: 'Royal Jelly', text: 'Strong colonies make royal jelly worth a fortune.' },
];

export const APIARY_LEADERBOARD = [
  { name: 'Old Hana', jars: 4200, desc: 'Keeps bees the old way, and well.' },
  { name: 'Breeder Luz', jars: 3100, desc: 'Raises queens for the whole county.' },
  { name: 'Ria', jars: 0, desc: 'The new beekeeper in town.' },
  { name: 'Market Maya', jars: 2200, desc: 'Sells honey at every market.' },
  { name: 'Smoker Sam', jars: 1500, desc: 'Calm hands, calm bees.' },
];

export const APIARY_RECORDS = [
  { id: 'most-honey', name: 'Most Honey', stat: 'honeyMade', unit: 'jars', desc: 'Honey made in total.' },
  { id: 'most-hives', name: 'Most Hives', stat: 'hiveCount', unit: 'hives', desc: 'Hives placed in total.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Coin earned from the apiary.' },
  { id: 'best-harvest', name: 'Best Harvest', stat: 'bestYield', unit: 'jars', desc: 'Biggest single harvest.' },
  { id: 'swarms', name: 'Swarms Caught', stat: 'swarmsCaught', unit: 'swarms', desc: 'Swarms caught in total.' },
];

export const APIARY_QUICK_START = [
  'Place a Langstroth hive in the clover meadow to start.',
  'Tend your colonies often so strength stays high.',
  'Harvest when a hive holds at least two honey.',
  'Split strong colonies instead of buying new hives.',
  'Sell honey to the bakery and jelly to the apothecary.',
  'Brew mead from spare honey; it sells for far more.',
];

export const APIARY_META = {
  system: 'apiary',
  version: '7-B1',
  author: 'builder-1',
  hives: 10,
  flowers: 8,
  note: 'Tend, harvest, brew, sell.',
};

export function apiaryRankFor(xp) {
  let rank = 0;
  for (let i = APIARY_RANKS.length - 1; i >= 0; i--) {
    if (xp >= APIARY_RANKS[i].xp) {
      rank = i;
      break;
    }
  }
  return rank;
}

export function apiaryPriceFor(product, rank, upgrades) {
  if (!product) return 1;
  const owned = upgrades || [];
  let price = product.value * (1 + 0.1 * rank);
  if (product.id === 'honey' && owned.includes('extractor')) price *= 1.15;
  return Math.max(1, Math.round(price));
}

export function apiaryBuyerPrice(product, buyerId, rank, upgrades) {
  const buyer = APIARY_BUYERS.find((b) => b.id === buyerId);
  if (!buyer || !product) return 0;
  let price = apiaryPriceFor(product, rank, upgrades) * buyer.mult;
  if (buyer.likes.includes(product.id)) price *= 1.1;
  if (buyer.dislikes.includes(product.id)) price *= 0.9;
  if (product.id === 'jelly') price *= 1.15;
  return Math.max(1, Math.round(price));
}

export function apiaryHiveCapacity(hive, upgrades) {
  const owned = upgrades || [];
  let cap = hive.capacity;
  if (owned.includes('frames')) cap += 2;
  return cap;
}

const APIARY_STATE_KEYS = [
  'xp', 'rank', 'hives', 'hiveCount', 'harvests', 'honeyMade', 'waxMade',
  'jellyMade', 'earned', 'spent', 'stings', 'coloniesLost', 'swarmsCaught',
  'splits', 'products', 'upgrades', 'lastDay', 'activeContract', 'contractProgress',
  'contractsDone', 'contractsFailed', 'bestHive', 'bestYield', 'dailyHoney',
  'dailyEarned', 'currentEvent', 'flower', 'queens', 'meadMade',
];

function apiaryChallengeAmount(target, st) {
  const table = {
    hiveCount: st.hiveCount,
    honeyMade: st.honeyMade,
    harvests: st.harvests,
    earned: st.earned,
    splits: st.splits,
    swarmsCaught: st.swarmsCaught,
    meadMade: st.meadMade,
    contractsDone: st.contractsDone,
  };
  return table[target] !== undefined ? table[target] : 0;
}

export function apiaryHelperBonus(ids, skill) {
  let sum = 0;
  for (const id of ids || []) {
    const helper = APIARY_HELPERS.find((h) => h.id === id);
    if (helper && helper.skill === skill) sum += helper.bonus;
  }
  return sum;
}

export function apiaryChallengeProgress(challenge, state) {
  const amount = Math.floor(apiaryChallengeAmount(challenge.target, state));
  return { id: challenge.id, name: challenge.name, amount, goal: challenge.goal, done: amount >= challenge.goal };
}

export function apiaryTipFor(day) {
  const idx = ((day || 0) % APIARY_TIPS.length + APIARY_TIPS.length) % APIARY_TIPS.length;
  return APIARY_TIPS[idx];
}

export function apiaryLeaderboardWith(jars) {
  const rows = APIARY_LEADERBOARD.map((row) => ({
    name: row.name,
    jars: row.name === 'Ria' ? jars : row.jars,
    desc: row.desc,
  }));
  rows.sort((a, b) => b.jars - a.jars);
  return rows.map((row, i) => ({ rank: i + 1, name: row.name, jars: row.jars, desc: row.desc }));
}

export function apiaryEfficiency(honeyMade, harvests) {
  if (!harvests) return 0;
  return Math.round((honeyMade / harvests) * 10) / 10;
}

export function apiaryProfitPerHive(earned, hives) {
  if (!hives) return 0;
  return Math.round((earned / hives) * 10) / 10;
}

export function apiaryGrade(honeyMade, coloniesLost, harvests) {
  if (!honeyMade) return 'D';
  const score = honeyMade - coloniesLost * 20 + harvests * 2;
  if (score >= 120) return 'S';
  if (score >= 70) return 'A';
  if (score >= 35) return 'B';
  if (score >= 12) return 'C';
  return 'D';
}

function apiaryRecordValue(stat, state) {
  const table = {
    honeyMade: state.honeyMade,
    hiveCount: state.hiveCount,
    earned: Math.round(state.earned),
    bestYield: state.bestYield,
    swarmsCaught: state.swarmsCaught,
  };
  return table[stat] !== undefined ? table[stat] : 0;
}

export function apiaryRecordFor(id, state) {
  const rec = APIARY_RECORDS.find((r) => r.id === id);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: apiaryRecordValue(rec.stat, state), unit: rec.unit };
}

export function apiaryAllRecords(state) {
  return APIARY_RECORDS.map((rec) => ({
    id: rec.id,
    name: rec.name,
    value: apiaryRecordValue(rec.stat, state),
    unit: rec.unit,
    desc: rec.desc,
  }));
}

export function apiarySummary(state) {
  const rankName = APIARY_RANKS[state.rank] ? APIARY_RANKS[state.rank].name : 'Bee Friend';
  return `${rankName} — ${state.hiveCount} hives, ${Math.round(state.honeyMade)} honey, ${state.harvests} harvests, $${Math.round(state.earned)} earned.`;
}

export function apiaryNextGoal(state) {
  if (state.hiveCount < 5) return 'Place five hives in the meadow.';
  if (state.honeyMade < 100) return 'Make a hundred honey.';
  if (state.rank < 2) return 'Reach rank 2 and become an Apiarist.';
  return 'Brew ten bottles of mead.';
}

export function apiaryQuickStart(step) {
  if (step < 0 || step >= APIARY_QUICK_START.length) return null;
  return APIARY_QUICK_START[step];
}

export function createApiarySystem(ctx = {}) {
  const rng = ctx.rng || Math.random;
  const getDay = ctx.getDay || (() => 1);
  const getCash = ctx.getCash || (() => 0);
  const addCash = ctx.addCash || (() => {});
  const log = ctx.log || (() => {});
  const getPlayerPos = ctx.getPlayerPos || (() => ({ x: 0, z: 0 }));
  const getHour = ctx.getHour || (() => 12);
  const addHeat = ctx.addHeat || (() => {});
  const getWeather = ctx.getWeather || (() => ({ condition: 'clear' }));

  const seedProducts = () => {
    const products = {};
    for (const p of APIARY_PRODUCTS) products[p.id] = 0;
    return products;
  };

  const sys = {
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
    products: seedProducts(),
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

  function giveXp(amount) {
    sys.xp += amount;
    const next = apiaryRankFor(sys.xp);
    if (next > sys.rank) {
      sys.rank = next;
      log(`Rank up! You are now ${APIARY_RANKS[next].name}.`);
    }
  }

  function refuse(reason) {
    return { ok: false, reason };
  }

  function allow(extra) {
    return { ok: true, ...extra };
  }

  function findColony(colonyId) {
    return sys.hives.find((h) => h.id === colonyId) || null;
  }

  function flowerRow() {
    return APIARY_FLOWERS.find((f) => f.id === sys.flower) || APIARY_FLOWERS[APIARY_FLOWERS.length - 1];
  }

  function maybeSting() {
    const chance = sys.upgrades.includes('veil') ? 0.05 : 0.15;
    if (rng() < chance) {
      sys.stings += 1;
      log('Ouch! A bee got you.');
    }
  }

  function settleContract(productId, qty) {
    if (!sys.activeContract || sys.activeContract.product !== productId) return;
    sys.contractProgress += qty;
    if (sys.contractProgress < sys.activeContract.qty) return;
    const pay = sys.activeContract.pay + 40 * sys.rank;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    sys.contractsDone += 1;
    log(`Contract done: ${sys.activeContract.name} paid $${pay}.`);
    sys.activeContract = null;
    sys.contractProgress = 0;
    giveXp(60);
  }

  sys.placeHive = function placeHive(hiveId) {
    const hive = APIARY_HIVES.find((h) => h.id === hiveId);
    if (!hive) return refuse('unknown-hive');
    if (sys.hives.length >= 12) return refuse('apiary-full');
    if (getCash() < hive.value) return refuse('not-enough-cash');
    addCash(-hive.value);
    sys.spent += hive.value;
    sys.hiveCount += 1;
    const colony = {
      id: `${hiveId}-${sys.hiveCount}`,
      type: hiveId,
      strength: 5,
      honey: 0,
      wax: 0,
      queen: true,
      health: 100,
      age: 0,
      flower: sys.flower,
    };
    sys.hives.push(colony);
    sys.queens += 1;
    giveXp(15);
    log(`Placed a ${hive.name} in the meadow.`);
    return allow({ hive: colony.id, type: hiveId });
  };

  sys.tendHive = function tendHive(colonyId) {
    const colony = findColony(colonyId);
    if (!colony) return refuse('unknown-colony');
    colony.health = Math.min(100, colony.health + 15);
    colony.strength = Math.min(10, colony.strength + 1);
    maybeSting();
    giveXp(5);
    return allow({ health: colony.health, strength: colony.strength });
  };

  sys.feedHive = function feedHive(colonyId) {
    const colony = findColony(colonyId);
    if (!colony) return refuse('unknown-colony');
    if (getCash() < 10) return refuse('not-enough-cash');
    addCash(-10);
    sys.spent += 10;
    colony.strength = Math.min(10, colony.strength + 2);
    colony.health = Math.min(100, colony.health + 10);
    giveXp(4);
    return allow({ strength: colony.strength });
  };

  sys.harvestHive = function harvestHive(colonyId) {
    const colony = findColony(colonyId);
    if (!colony) return refuse('unknown-colony');
    if (colony.honey < 2) return refuse('not-ready');
    let honey = colony.honey;
    if (sys.upgrades.includes('smoker')) honey *= 1.25;
    if (sys.upgrades.includes('extractor')) honey *= 1.25;
    honey = Math.round(honey * 10) / 10;
    const wax = colony.wax;
    colony.honey = 0;
    colony.wax = 0;
    sys.products.honey += honey;
    sys.products.wax += wax;
    sys.honeyMade += honey;
    sys.waxMade += wax;
    sys.dailyHoney += honey;
    sys.harvests += 1;
    if (honey > sys.bestYield) {
      sys.bestYield = honey;
      sys.bestHive = colony.type;
    }
    maybeSting();
    giveXp(Math.floor(honey));
    return allow({ honey, wax, hive: colony.id });
  };

  sys.harvestAll = function harvestAll() {
    const ready = sys.hives.filter((h) => h.honey >= 2);
    if (!ready.length) return refuse('none-ready');
    let honey = 0;
    let wax = 0;
    for (const colony of ready) {
      const res = sys.harvestHive(colony.id);
      if (res.ok) {
        honey += res.honey;
        wax += res.wax;
      }
    }
    return allow({ hives: ready.length, honey: Math.round(honey * 10) / 10, wax: Math.round(wax * 10) / 10 });
  };

  sys.splitHive = function splitHive(colonyId) {
    const colony = findColony(colonyId);
    if (!colony) return refuse('unknown-colony');
    if (colony.strength < 8) return refuse('too-weak');
    if (sys.hives.length >= 12) return refuse('apiary-full');
    const free = sys.upgrades.includes('breeder');
    const cost = free ? 0 : 40;
    if (getCash() < cost) return refuse('not-enough-cash');
    if (cost > 0) {
      addCash(-cost);
      sys.spent += cost;
    }
    colony.strength = 5;
    sys.hiveCount += 1;
    const child = {
      id: `${colony.type}-${sys.hiveCount}`,
      type: colony.type,
      strength: 5,
      honey: 0,
      wax: 0,
      queen: true,
      health: 90,
      age: 0,
      flower: sys.flower,
    };
    sys.hives.push(child);
    sys.splits += 1;
    sys.queens += 1;
    giveXp(25);
    return allow({ hive: child.id, cost });
  };

  sys.catchSwarm = function catchSwarm() {
    if (sys.currentEvent !== 'swarm') return refuse('no-swarm');
    if (sys.hives.length >= 12) return refuse('apiary-full');
    sys.hiveCount += 1;
    const colony = {
      id: `skep-${sys.hiveCount}`,
      type: 'skep',
      strength: 4,
      honey: 0,
      wax: 0,
      queen: true,
      health: 80,
      age: 0,
      flower: sys.flower,
    };
    sys.hives.push(colony);
    sys.swarmsCaught += 1;
    sys.queens += 1;
    giveXp(30);
    log('Caught a passing swarm in a skep, free of charge.');
    return allow({ hive: colony.id });
  };

  sys.makeJelly = function makeJelly(colonyId) {
    const colony = findColony(colonyId);
    if (!colony) return refuse('unknown-colony');
    if (colony.strength < 7) return refuse('too-weak');
    const qty = 1 + Math.floor(rng() * 2);
    sys.products.jelly += qty;
    sys.jellyMade += qty;
    colony.strength -= 1;
    giveXp(10);
    return allow({ quantity: qty });
  };

  sys.makePropolis = function makePropolis() {
    const strong = sys.hives.filter((h) => h.strength >= 6);
    if (!strong.length) return refuse('no-strong-colonies');
    const qty = strong.length;
    sys.products.propolis += qty;
    giveXp(qty * 3);
    return allow({ quantity: qty });
  };

  sys.makeComb = function makeComb() {
    const ready = sys.hives.filter((h) => h.honey >= 4);
    if (!ready.length) return refuse('none-ready');
    let qty = 0;
    for (const colony of ready) {
      colony.honey -= 2;
      sys.products.honey += 0;
      sys.products.comb += 1;
      qty += 1;
    }
    giveXp(qty * 5);
    return allow({ quantity: qty });
  };

  sys.makeMead = function makeMead(qty) {
    if (!qty || qty <= 0) return refuse('bad-quantity');
    if ((sys.products.honey || 0) < qty * 3) return refuse('not-enough-honey');
    sys.products.honey -= qty * 3;
    sys.products.mead += qty;
    sys.meadMade += qty;
    giveXp(qty * 8);
    return allow({ quantity: qty });
  };

  sys.sellProduct = function sellProduct(buyerId, productId, qty) {
    const buyer = APIARY_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return refuse('unknown-buyer');
    if (sys.rank < buyer.minRank) return refuse('rank-too-low');
    const product = APIARY_PRODUCTS.find((p) => p.id === productId);
    if (!product) return refuse('unknown-product');
    if ((sys.products[productId] || 0) < qty) return refuse('not-enough');
    const unitPrice = apiaryBuyerPrice(product, buyerId, sys.rank, sys.upgrades);
    const total = unitPrice * qty;
    sys.products[productId] -= qty;
    sys.earned += total;
    sys.dailyEarned += total;
    addCash(total);
    giveXp(qty * 2);
    settleContract(productId, qty);
    return allow({ total, unitPrice, quantity: qty });
  };

  sys.sellAll = function sellAll(buyerId) {
    const buyer = APIARY_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return refuse('unknown-buyer');
    if (sys.rank < buyer.minRank) return refuse('rank-too-low');
    const lines = [];
    let total = 0;
    let count = 0;
    for (const product of APIARY_PRODUCTS) {
      const qty = sys.products[product.id] || 0;
      if (qty > 0) {
        const unitPrice = apiaryBuyerPrice(product, buyerId, sys.rank, sys.upgrades);
        const lineTotal = unitPrice * qty;
        lines.push({ id: product.id, quantity: qty, total: lineTotal });
        total += lineTotal;
        count += qty;
        sys.products[product.id] = 0;
      }
    }
    if (!lines.length) return refuse('nothing-to-sell');
    sys.earned += total;
    sys.dailyEarned += total;
    addCash(total);
    giveXp(count);
    return allow({ total, count, lines });
  };

  sys.setFlower = function setFlower(flowerId) {
    const flower = APIARY_FLOWERS.find((f) => f.id === flowerId);
    if (!flower) return refuse('unknown-flower');
    sys.flower = flowerId;
    for (const colony of sys.hives) colony.flower = flowerId;
    return allow({ flower: flowerId });
  };

  sys.buyUpgrade = function buyUpgrade(upgradeId) {
    const upgrade = APIARY_UPGRADES.find((u) => u.id === upgradeId);
    if (!upgrade) return refuse('unknown-upgrade');
    if (sys.upgrades.includes(upgradeId)) return refuse('already-owned');
    if (getCash() < upgrade.cost) return refuse('not-enough-cash');
    addCash(-upgrade.cost);
    sys.spent += upgrade.cost;
    sys.upgrades.push(upgradeId);
    giveXp(20);
    return allow({ id: upgradeId });
  };

  sys.takeContract = function takeContract(contractId) {
    const contract = APIARY_CONTRACTS.find((c) => c.id === contractId);
    if (!contract) return refuse('unknown-contract');
    if (sys.activeContract) return refuse('contract-active');
    if (sys.rank < contract.rep) return refuse('rank-too-low');
    const day = getDay();
    sys.activeContract = { ...contract, dayTaken: day, deadline: day + contract.days };
    sys.contractProgress = 0;
    return allow({ contract: sys.activeContract });
  };

  sys.deliverContract = function deliverContract() {
    if (!sys.activeContract) return refuse('no-contract');
    if (sys.contractProgress < sys.activeContract.qty) return refuse('not-ready');
    const pay = sys.activeContract.pay + 40 * sys.rank;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    sys.contractsDone += 1;
    sys.activeContract = null;
    sys.contractProgress = 0;
    giveXp(60);
    return allow({ pay });
  };

  sys.abandonContract = function abandonContract() {
    if (!sys.activeContract) return refuse('no-contract');
    sys.activeContract = null;
    sys.contractProgress = 0;
    sys.contractsFailed += 1;
    return allow({});
  };

  sys.priceBoard = function priceBoard() {
    return APIARY_PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      price: apiaryPriceFor(p, sys.rank, sys.upgrades),
      stock: sys.products[p.id] || 0,
    }));
  };

  sys.hiveReport = function hiveReport() {
    return sys.hives.map((c) => {
      const hive = APIARY_HIVES.find((h) => h.id === c.type);
      return {
        id: c.id,
        type: c.type,
        name: hive ? hive.name : c.type,
        strength: c.strength,
        honey: Math.round(c.honey * 10) / 10,
        wax: Math.round(c.wax * 10) / 10,
        health: c.health,
        queen: c.queen,
        flower: c.flower,
      };
    });
  };

  sys.dailyEvent = function dailyEvent() {
    const roll = rng();
    if (roll < 0.2) {
      const ev = APIARY_EVENTS[Math.floor(rng() * APIARY_EVENTS.length)];
      sys.currentEvent = ev.id;
      log(`Today's event: ${ev.name}.`);
      return allow({ event: ev.id, name: ev.name });
    }
    if (roll < 0.3) {
      sys.products.honey += 3;
      sys.currentEvent = null;
      return allow({ event: 'gift', name: 'Gift' });
    }
    sys.currentEvent = null;
    return allow({ event: 'none', name: 'None' });
  };

  sys.tick = function tick(dt) {
    const step = dt || 0;
    const flower = flowerRow();
    for (const colony of sys.hives) {
      if (colony.health <= 0) continue;
      const hive = APIARY_HIVES.find((h) => h.id === colony.type);
      const cap = hive ? apiaryHiveCapacity(hive, sys.upgrades) : 8;
      const gain = (colony.strength / 10) * flower.nectar * step * 0.05;
      colony.honey = Math.min(cap * 2, colony.honey + gain);
      colony.wax = Math.min(cap, colony.wax + gain * 0.2);
      colony.age += step * 0.01;
    }
  };

  sys.tickDay = function tickDay(day) {
    if (day === sys.lastDay) return;
    sys.lastDay = day;
    sys.dailyHoney = 0;
    sys.dailyEarned = 0;
    if (sys.activeContract && day > sys.activeContract.deadline && sys.contractProgress < sys.activeContract.qty) {
      sys.contractsFailed += 1;
      log(`Contract failed: ${sys.activeContract.name}.`);
      sys.activeContract = null;
      sys.contractProgress = 0;
    }
    const survivors = [];
    for (const colony of sys.hives) {
      colony.age += 1;
      const boost = sys.upgrades.includes('queen') ? 1 : 0.5;
      colony.strength = Math.min(10, colony.strength + boost);
      if (sys.currentEvent === 'mite-outbreak') {
        colony.health -= sys.upgrades.includes('mite') ? 5 : 10;
      }
      if (sys.currentEvent === 'wasp-attack') {
        colony.health -= 5;
        colony.honey = Math.max(0, colony.honey - 2);
      }
      if (sys.currentEvent === 'cold-snap') {
        colony.health -= 8;
      }
      if (colony.health <= 0) {
        sys.coloniesLost += 1;
        log(`Lost a ${colony.type} colony.`);
      } else {
        survivors.push(colony);
      }
    }
    sys.hives = survivors;
    sys.dailyEvent();
  };

  sys.serialize = function serialize() {
    const out = {};
    for (const key of APIARY_STATE_KEYS) {
      out[key] = JSON.parse(JSON.stringify(sys[key]));
    }
    return out;
  };

  sys.deserialize = function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    for (const key of APIARY_STATE_KEYS) {
      if (key in saved) sys[key] = JSON.parse(JSON.stringify(saved[key]));
    }
    for (const p of APIARY_PRODUCTS) {
      if (sys.products[p.id] === undefined) sys.products[p.id] = 0;
    }
    const next = apiaryRankFor(sys.xp);
    if (next > sys.rank) sys.rank = next;
  };

  sys.stats = function stats() {
    return {
      rank: APIARY_RANKS[sys.rank].name,
      xp: sys.xp,
      hives: sys.hives.length,
      hiveCount: sys.hiveCount,
      harvests: sys.harvests,
      honeyMade: Math.round(sys.honeyMade * 10) / 10,
      waxMade: Math.round(sys.waxMade * 10) / 10,
      jellyMade: sys.jellyMade,
      meadMade: sys.meadMade,
      earned: Math.round(sys.earned),
      spent: sys.spent,
      stings: sys.stings,
      coloniesLost: sys.coloniesLost,
      swarmsCaught: sys.swarmsCaught,
      splits: sys.splits,
      upgrades: sys.upgrades.length,
      activeContract: sys.activeContract ? sys.activeContract.id : null,
      contractsDone: sys.contractsDone,
      contractsFailed: sys.contractsFailed,
      bestHive: sys.bestHive,
      bestYield: Math.round(sys.bestYield * 10) / 10,
      dailyHoney: Math.round(sys.dailyHoney * 10) / 10,
      dailyEarned: Math.round(sys.dailyEarned),
      flower: sys.flower,
      event: sys.currentEvent,
    };
  };

  sys.hudLine = function hudLine() {
    const ready = sys.hives.filter((h) => h.honey >= 2);
    if (ready.length > 0) {
      return ready.length === 1
        ? '1 hive ready to harvest'
        : `${ready.length} hives ready to harvest`;
    }
    if (sys.hives.length > 0) {
      const flower = flowerRow();
      return `${sys.hives.length} hives on ${flower.name} flow`;
    }
    if (sys.activeContract) {
      return `Contract ${sys.activeContract.name} ${sys.contractProgress}/${sys.activeContract.qty}`;
    }
    return '';
  };

  sys.interact = function interact() {
    const pos = getPlayerPos();
    const dx = (pos.x || 0) - 480;
    const dz = (pos.z || 0) - 260;
    if (Math.hypot(dx, dz) > 40) return false;
    if (!sys.hives.length) {
      sys.placeHive('langstroth');
      return true;
    }
    const ready = sys.hives.find((h) => h.honey >= 2);
    if (ready) {
      sys.harvestHive(ready.id);
      return true;
    }
    sys.tendHive(sys.hives[0].id);
    return true;
  };

  return sys;
}

export function createApiaryExtras(system) {
  const sys = system;
  let hired = [];
  let claimed = [];
  let wagesPaid = 0;

  function refuse(reason) {
    return { ok: false, reason };
  }

  function allow(extra) {
    return { ok: true, ...extra };
  }

  const extras = {
    hireHelper(id) {
      const helper = APIARY_HELPERS.find((h) => h.id === id);
      if (!helper) return refuse('unknown-helper');
      if (hired.includes(id)) return refuse('already-hired');
      hired.push(id);
      return allow({ id, name: helper.name, wage: helper.wage });
    },
    fireHelper(id) {
      if (!hired.includes(id)) return refuse('not-hired');
      hired = hired.filter((h) => h !== id);
      return allow({ id });
    },
    payWages() {
      let due = 0;
      for (const id of hired) {
        const helper = APIARY_HELPERS.find((h) => h.id === id);
        if (helper) due += helper.wage;
      }
      wagesPaid += due;
      return allow({ due, helpers: [...hired], wagesPaid });
    },
    helperBonus(skill) {
      let sum = 0;
      for (const id of hired) {
        const helper = APIARY_HELPERS.find((h) => h.id === id);
        if (helper && helper.skill === skill) sum += helper.bonus;
      }
      return sum;
    },
    challenges() {
      return APIARY_CHALLENGES.map((c) => apiaryChallengeProgress(c, sys));
    },
    claimChallenge(id) {
      const challenge = APIARY_CHALLENGES.find((c) => c.id === id);
      if (!challenge) return refuse('unknown-challenge');
      if (claimed.includes(id)) return refuse('already-claimed');
      const progress = apiaryChallengeProgress(challenge, sys);
      if (!progress.done) return refuse('not-done');
      claimed.push(id);
      return allow({ id, xp: challenge.xp });
    },
    achievements() {
      return APIARY_ACHIEVEMENTS.map((a) => ({
        id: a.id,
        name: a.name,
        desc: a.desc,
        done: !!a.check(sys),
      }));
    },
    inspectHive(colonyId) {
      const colony = sys.hives.find((h) => h.id === colonyId);
      if (!colony) return refuse('unknown-colony');
      return allow({ colony: JSON.parse(JSON.stringify(colony)) });
    },
    inventoryValue() {
      let value = 0;
      for (const p of APIARY_PRODUCTS) {
        value += (sys.products[p.id] || 0) * p.value;
      }
      return allow({ value: Math.round(value) });
    },
    colonyCount() {
      const strong = sys.hives.filter((h) => h.strength >= 7).length;
      const weak = sys.hives.filter((h) => h.strength < 4).length;
      return allow({ total: sys.hives.length, strong, weak });
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
