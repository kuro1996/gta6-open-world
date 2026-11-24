// Solara Nights — Farming / Bayview Farm (Round 7b-B, written fresh).
// Outside the city, past the suburbs, Ria's late uncle left her
// twelve acres of tired soil and a barn with opinions. Farming in
// Solara Bay is a calendar: plant in season, water on time, chase
// the crows off the corn, and sell at the market before the price
// drops. Fourteen crops from fast radishes to slow pumpkins, eight
// kinds of livestock from chickens to a very stubborn goat, and a
// farmhouse kitchen that turns milk into cheese and fruit into jam
// worth three times the raw price. The weather is a business
// partner with a bad temper; the seasons do not negotiate. But a
// good harvest, sold at the right stall, pays better than most jobs
// in the city — and the work is honest, even when the mud is not.
// Pure logic: no rendering, no imports. Wired through the standard ctx
// { rng, getDay, getHour, getCash, addCash, addHeat, log, getPlayerPos,
// getSpeed } and driven by tick/tickDay from the main loop.

export const FARM_CROPS = [
  { id: 'radish', name: 'Radish', growDays: 1, water: 1, yield: 6, price: 3, season: 'any', xp: 4, desc: 'Fast, peppery, first money of spring.' },
  { id: 'lettuce', name: 'Lettuce', growDays: 2, water: 2, yield: 5, price: 4, season: 'spring', xp: 5, desc: 'Crisp heads, market favourite.' },
  { id: 'tomato', name: 'Tomato', growDays: 3, water: 3, yield: 8, price: 6, season: 'summer', xp: 8, desc: 'Sun-ripened, worth the wait.' },
  { id: 'corn', name: 'Corn', growDays: 4, water: 3, yield: 10, price: 5, season: 'summer', xp: 10, desc: 'Tall, golden, crows love it too.' },
  { id: 'pumpkin', name: 'Pumpkin', growDays: 6, water: 4, yield: 4, price: 18, season: 'autumn', xp: 14, desc: 'Slow, heavy, very profitable.' },
  { id: 'carrot', name: 'Carrot', growDays: 2, water: 2, yield: 7, price: 4, season: 'any', xp: 6, desc: 'Sweet, orange, easy to grow.' },
  { id: 'potato', name: 'Potato', growDays: 3, water: 2, yield: 9, price: 3, season: 'any', xp: 7, desc: 'The reliable staple, always sells.' },
  { id: 'chilli', name: 'Chilli', growDays: 3, water: 2, yield: 6, price: 8, season: 'summer', xp: 9, desc: 'Hot, small, and the restaurants pay well.' },
  { id: 'strawberry', name: 'Strawberry', growDays: 3, water: 3, yield: 7, price: 9, season: 'spring', xp: 10, desc: 'Sweet, fragile, jam-makers’ gold.' },
  { id: 'mango', name: 'Mango', growDays: 5, water: 3, yield: 6, price: 12, season: 'summer', xp: 12, desc: 'The bay’s favourite fruit, slow to ripen.' },
  { id: 'cabbage', name: 'Cabbage', growDays: 3, water: 2, yield: 6, price: 5, season: 'autumn', xp: 7, desc: 'Dense heads, keeps for weeks.' },
  { id: 'herbs', name: 'Herbs', growDays: 1, water: 1, yield: 5, price: 7, season: 'any', xp: 5, desc: 'Basil, mint, coriander — chefs pay cash.' },
  { id: 'coffee', name: 'Coffee', growDays: 7, water: 4, yield: 3, price: 25, season: 'any', xp: 18, desc: 'Slowest crop, highest price per kilo.' },
  { id: 'rice', name: 'Rice', growDays: 5, water: 5, yield: 12, price: 4, season: 'any', xp: 11, desc: 'Flooded paddies, heavy sacks, steady money.' },
];

export const FARM_ANIMALS = [
  { id: 'chicken', name: 'Chicken', cost: 40, feed: 2, produce: 'egg', producePerDay: 1, producePrice: 3, desc: 'An egg a day, opinions all day.' },
  { id: 'duck', name: 'Duck', cost: 60, feed: 2, produce: 'egg', producePerDay: 1, producePrice: 4, desc: 'Bigger eggs, louder mornings.' },
  { id: 'goat', name: 'Goat', cost: 180, feed: 4, produce: 'milk', producePerDay: 2, producePrice: 5, desc: 'Milk, mischief, and eaten fences.' },
  { id: 'sheep', name: 'Sheep', cost: 220, feed: 4, produce: 'wool', producePerDay: 1, producePrice: 12, desc: 'Wool every few days, calm company.' },
  { id: 'pig', name: 'Pig', cost: 260, feed: 6, produce: 'truffle', producePerDay: 1, producePrice: 20, desc: 'Finds truffles. Eats everything else.' },
  { id: 'cow', name: 'Cow', cost: 500, feed: 8, produce: 'milk', producePerDay: 4, producePrice: 5, desc: 'Four litres a day and a gentle soul.' },
  { id: 'bee', name: 'Beehive', cost: 150, feed: 1, produce: 'honey', producePerDay: 1, producePrice: 15, desc: 'Honey, wax, and a healthy fear of stings.' },
  { id: 'horse', name: 'Horse', cost: 800, feed: 8, produce: 'ride', producePerDay: 1, producePrice: 30, desc: 'Trail rides for tourists, $30 a head.' },
];

export const FARM_PLOTS = [
  { id: 'plot-1', name: 'North Field', size: 1, cost: 0, desc: 'The first plot, by the farmhouse.' },
  { id: 'plot-2', name: 'South Field', size: 1, cost: 150, desc: 'Flat, sunny, good drainage.' },
  { id: 'plot-3', name: 'Riverside', size: 1, cost: 250, desc: 'Rich soil, thirsty crops love it.' },
  { id: 'plot-4', name: 'Hill Terrace', size: 1, cost: 300, desc: 'Terraced, windy, great for herbs.' },
  { id: 'plot-5', name: 'Orchard Row', size: 2, cost: 500, desc: 'Double size, fruit trees included.' },
  { id: 'plot-6', name: 'Old Paddy', size: 2, cost: 600, desc: 'Double size, built for rice.' },
  { id: 'plot-7', name: 'Greenhouse', size: 2, cost: 900, desc: 'Double size, any season, any crop.' },
  { id: 'plot-8', name: 'Far Acre', size: 3, cost: 1400, desc: 'Triple size, the big leagues.' },
];

export const FARM_UPGRADES = [
  { id: 'sprinkler', name: 'Sprinklers', cost: 300, desc: 'Crops water themselves: +1 water/day.', effect: 'auto-water' },
  { id: 'scarecrow', name: 'Scarecrow Army', cost: 150, desc: 'Crows steal 50% less.', effect: 'crow-down' },
  { id: 'compost', name: 'Compost Heap', cost: 200, desc: 'Crops grow 20% faster.', effect: 'grow-fast' },
  { id: 'barn', name: 'Big Barn', cost: 600, desc: 'Hold +6 animals.', effect: 'animals-plus' },
  { id: 'tractor', name: 'Old Tractor', cost: 1200, desc: 'Plant and harvest twice as fast.', effect: 'work-fast' },
  { id: 'well', name: 'Deep Well', cost: 450, desc: 'Water is free forever.', effect: 'water-free' },
  { id: 'fence', name: 'Good Fences', cost: 250, desc: 'Animals never escape, goats included.', effect: 'escape-down' },
  { id: 'kitchen', name: 'Farm Kitchen', cost: 800, desc: 'Unlocks jams, cheese and baking.', effect: 'craft' },
  { id: 'truck', name: 'Market Truck', cost: 1000, desc: 'Sell at the city market: +20% prices.', effect: 'sell-plus' },
  { id: 'beehive-plus', name: 'Apiary', cost: 350, desc: 'Honey production doubled.', effect: 'honey-plus' },
];

export const FARM_RECIPES = [
  { id: 'jam', name: 'Strawberry Jam', needs: { strawberry: 4 }, time: 1, price: 45, desc: 'Four kilos of berries, one jar of gold.' },
  { id: 'cheese', name: 'Goat Cheese', needs: { milk: 6 }, time: 2, price: 70, desc: 'Aged two days, sharp and creamy.' },
  { id: 'bread', name: 'Farm Bread', needs: { wheat: 0 }, time: 1, price: 18, desc: 'Baked at dawn. (Needs flour — see the mill.)' },
  { id: 'honey-jar', name: 'Honey Jar', needs: { honey: 2 }, time: 1, price: 40, desc: 'Golden, raw, sells itself.' },
  { id: 'salsa', name: 'Garden Salsa', needs: { tomato: 3, chilli: 2 }, time: 1, price: 32, desc: 'Fresh, hot, gone by noon.' },
  { id: 'pumpkin-pie', name: 'Pumpkin Pie', needs: { pumpkin: 2 }, time: 1, price: 55, desc: 'Autumn on a plate.' },
  { id: 'mango-chutney', name: 'Mango Chutney', needs: { mango: 3, chilli: 1 }, time: 1, price: 48, desc: 'Sweet heat in a jar.' },
  { id: 'coffee-roast', name: 'Roasted Coffee', needs: { coffee: 2 }, time: 1, price: 60, desc: 'Roasted beans, café prices.' },
];

export const FARM_MARKETS = [
  { id: 'stall', name: 'Farm Gate Stall', mult: 1.0, desc: 'Sell at your own gate. Slow, honest.' },
  { id: 'market', name: 'Night Market', mult: 1.15, desc: 'Crowds and cash after dark.' },
  { id: 'restaurant', name: 'Restaurant Supply', mult: 1.25, desc: 'Chefs buy in bulk, pay on time.' },
  { id: 'coop', name: 'Farmers Co-op', mult: 1.1, desc: 'Steady prices, shared truck.' },
  { id: 'city', name: 'City Market', mult: 1.3, desc: 'Best prices, needs the truck.' },
  { id: 'export', name: 'Export Buyer', mult: 1.5, desc: 'Coffee and honey only, big orders.' },
];

export const FARM_SEASONS = [
  { id: 'spring', name: 'Spring', days: 30, waterBonus: 1, growth: 1.1, desc: 'Mild, wet, everything grows.' },
  { id: 'summer', name: 'Summer', days: 30, waterBonus: 0.7, growth: 1.0, desc: 'Hot and dry. Water twice.' },
  { id: 'autumn', name: 'Autumn', days: 30, waterBonus: 1, growth: 0.9, desc: 'Cool, pumpkins, harvest moons.' },
  { id: 'winter', name: 'Winter', days: 30, waterBonus: 1.2, growth: 0.7, desc: 'Slow growth, quiet fields.' },
];

export const FARM_RANKS = [
  { level: 0, name: 'Garden Helper', xp: 0, perk: 'Two plots, basic crops.' },
  { level: 1, name: 'Smallholder', xp: 150, perk: 'More plots, animals unlocked.' },
  { level: 2, name: 'Market Farmer', xp: 400, perk: 'City market, better prices.' },
  { level: 3, name: 'Bayview Farmer', xp: 800, perk: 'Greenhouse, export buyers.' },
  { level: 4, name: 'Lord of the Land', xp: 1500, perk: 'The farm feeds the whole bay.' },
];

export const FARM_WEATHER = [
  { id: 'sunny', name: 'Sunny', growth: 1.1, water: 1.2, desc: 'Good growing, thirsty soil.' },
  { id: 'rain', name: 'Rain', growth: 1.0, water: 0, desc: 'Free watering from the sky.' },
  { id: 'storm', name: 'Storm', growth: 0.8, water: 0, desc: 'Crops battered, fences tested.' },
  { id: 'drought', name: 'Drought', growth: 0.7, water: 1.5, desc: 'Water everything, twice.' },
  { id: 'fog', name: 'Fog', growth: 0.9, water: 0.8, desc: 'Cool and damp, slow and steady.' },
];

export function farmRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < FARM_RANKS.length; i++) {
    if (xp >= FARM_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function farmSeasonFor(day) {
  const idx = Math.floor((day - 1) / 30) % 4;
  return FARM_SEASONS[idx];
}

export function farmCropPrice(crop, market, rank, upgrades) {
  let price = crop.price;
  const m = FARM_MARKETS.find((x) => x.id === market);
  if (m) price *= m.mult;
  price *= 1 + rank * 0.05;
  if (upgrades.includes('truck') && market === 'city') price *= 1.2;
  return Math.round(price * 10) / 10;
}

export function farmGrowTime(crop, season, weather, upgrades) {
  let days = crop.growDays;
  days /= season.growth;
  days /= weather.growth;
  if (upgrades.includes('compost')) days *= 0.8;
  return Math.max(1, Math.round(days * 10) / 10);
}

export function farmAnimalDaily(animal, upgrades) {
  let n = animal.producePerDay;
  if (animal.id === 'bee' && upgrades.includes('beehive-plus')) n *= 2;
  return n;
}

export function createFarmingSystem(ctx) {
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
    owned: false,
    plots: [],
    animals: [],
    storage: {},
    produce: {},
    earned: 0,
    spent: 0,
    upgrades: [],
    hands: [],
    cropsPlanted: 0,
    cropsHarvested: 0,
    cropsLost: 0,
    waterUsed: 0,
    feedBought: 0,
    animalsBought: 0,
    produceCollected: 0,
    craftsMade: 0,
    salesMade: 0,
    bestHarvest: 0,
    bestHarvestCrop: null,
    bestSale: 0,
    season: 'spring',
    weather: 'sunny',
    dayInSeason: 1,
    lastDay: 1,
    dailySales: 0,
    dailyRevenue: 0,
    crowsScared: 0,
    escapes: 0,
    perfectDays: 0,
    marketDay: 0,
    soilQuality: 50,
  };
  for (const crop of FARM_CROPS) { state.storage[crop.id] = 0; }
  for (const a of FARM_ANIMALS) { state.produce[a.produce] = state.produce[a.produce] || 0; }
  state.produce.milk = state.produce.milk || 0;
  state.produce.egg = state.produce.egg || 0;
  state.produce.wool = state.produce.wool || 0;
  state.produce.honey = state.produce.honey || 0;
  state.produce.truffle = state.produce.truffle || 0;
  state.produce.ride = state.produce.ride || 0;

  function refreshRank() {
    const r = farmRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Farming rank up: ${FARM_RANKS[r].name} — ${FARM_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function currentSeason() {
    return farmSeasonFor(getDay());
  }

  function currentWeather() {
    return FARM_WEATHER.find((w) => w.id === state.weather) || FARM_WEATHER[0];
  }

  function animalCap() {
    return 6 + (state.upgrades.includes('barn') ? 6 : 0);
  }

  function buyFarm() {
    if (state.owned) return { ok: false, reason: 'already-owned' };
    const cost = 1500;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned = true;
    state.plots.push({ id: 'plot-1', crop: null, water: 0, growth: 0, plantedDay: 0, ready: false });
    log('You bought Bayview Farm — twelve acres, a barn, and a lot of weeds.');
    return { ok: true, cost };
  }

  function buyPlot(plotId) {
    const def = FARM_PLOTS.find((p) => p.id === plotId);
    if (!def) return { ok: false, reason: 'no-such-plot' };
    if (!state.owned) return { ok: false, reason: 'not-owned' };
    if (state.plots.find((p) => p.id === plotId)) return { ok: false, reason: 'already-owned' };
    if (getCash() < def.cost) return { ok: false, reason: 'not-enough-cash', cost: def.cost };
    addCash(-def.cost);
    state.spent += def.cost;
    state.plots.push({ id: plotId, crop: null, water: 0, growth: 0, plantedDay: 0, ready: false });
    gainXp(20);
    log(`Bought the ${def.name} for $${def.cost}.`);
    return { ok: true, id: plotId };
  }

  function plantCrop(plotId, cropId) {
    const plot = state.plots.find((p) => p.id === plotId);
    if (!plot) return { ok: false, reason: 'no-such-plot' };
    if (plot.crop) return { ok: false, reason: 'plot-busy', crop: plot.crop };
    const crop = FARM_CROPS.find((x) => x.id === cropId);
    if (!crop) return { ok: false, reason: 'no-such-crop' };
    const season = currentSeason();
    if (crop.season !== 'any' && crop.season !== season.id && plotId !== 'plot-7') {
      return { ok: false, reason: 'wrong-season', season: season.id, need: crop.season };
    }
    plot.crop = cropId;
    plot.water = 0;
    plot.growth = 0;
    plot.plantedDay = getDay();
    plot.ready = false;
    state.cropsPlanted += 1;
    gainXp(3);
    return { ok: true, plot: plotId, crop: cropId };
  }

  function waterCrop(plotId) {
    const plot = state.plots.find((p) => p.id === plotId);
    if (!plot) return { ok: false, reason: 'no-such-plot' };
    if (!plot.crop) return { ok: false, reason: 'plot-empty' };
    if (plot.ready) return { ok: false, reason: 'already-ready' };
    const crop = FARM_CROPS.find((x) => x.id === plot.crop);
    const cost = state.upgrades.includes('well') ? 0 : 2;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    if (cost > 0) { addCash(-cost); state.spent += cost; }
    plot.water += 1;
    state.waterUsed += 1;
    const weather = currentWeather();
    const need = Math.max(1, Math.round(crop.water * weather.water));
    if (plot.water >= need) {
      plot.growth += 1;
      plot.water = 0;
    }
    const season = currentSeason();
    const total = farmGrowTime(crop, season, weather, state.upgrades);
    if (plot.growth >= total) {
      plot.ready = true;
      log(`The ${crop.name} on ${plotId} is ready to harvest!`);
    }
    return { ok: true, plot: plotId, growth: plot.growth, ready: plot.ready };
  }

  function harvestCrop(plotId) {
    const plot = state.plots.find((p) => p.id === plotId);
    if (!plot) return { ok: false, reason: 'no-such-plot' };
    if (!plot.crop) return { ok: false, reason: 'plot-empty' };
    if (!plot.ready) return { ok: false, reason: 'not-ready', growth: plot.growth };
    const crop = FARM_CROPS.find((x) => x.id === plot.crop);
    let qty = crop.yield;
    if (state.soilQuality > 70) qty += 1;
    if (rng() < 0.1) {
      qty = Math.max(1, qty - 2);
      log('Crows got some of the harvest. The scarecrow needs work.');
    }
    state.storage[crop.id] += qty;
    state.cropsHarvested += 1;
    if (qty > state.bestHarvest) { state.bestHarvest = qty; state.bestHarvestCrop = crop.id; }
    gainXp(crop.xp);
    log(`Harvested ${qty}x ${crop.name} from ${plotId}.`);
    plot.crop = null;
    plot.water = 0;
    plot.growth = 0;
    plot.ready = false;
    return { ok: true, crop: crop.id, qty };
  }

  function clearPlot(plotId) {
    const plot = state.plots.find((p) => p.id === plotId);
    if (!plot) return { ok: false, reason: 'no-such-plot' };
    if (!plot.crop) return { ok: false, reason: 'plot-empty' };
    const crop = plot.crop;
    plot.crop = null;
    plot.water = 0;
    plot.growth = 0;
    plot.ready = false;
    state.cropsLost += 1;
    log(`Cleared the ${crop} from ${plotId}.`);
    return { ok: true, crop };
  }

  function buyAnimal(animalId) {
    const a = FARM_ANIMALS.find((x) => x.id === animalId);
    if (!a) return { ok: false, reason: 'no-such-animal' };
    if (!state.owned) return { ok: false, reason: 'not-owned' };
    if (state.animals.length >= animalCap()) return { ok: false, reason: 'barn-full', cap: animalCap() };
    if (getCash() < a.cost) return { ok: false, reason: 'not-enough-cash', cost: a.cost };
    addCash(-a.cost);
    state.spent += a.cost;
    state.animals.push({ id: animalId, fed: 0, happiness: 70, daysOld: 0 });
    state.animalsBought += 1;
    gainXp(15);
    log(`Bought a ${a.name} for $${a.cost}.`);
    return { ok: true, id: animalId };
  }

  function feedAnimal(idx) {
    const animal = state.animals[idx];
    if (!animal) return { ok: false, reason: 'no-such-animal' };
    const def = FARM_ANIMALS.find((x) => x.id === animal.id);
    const cost = def.feed;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.feedBought += cost;
    animal.fed += 1;
    animal.happiness = Math.min(100, animal.happiness + 10);
    return { ok: true, animal: animal.id, happiness: animal.happiness };
  }

  function collectProduce() {
    let collected = {};
    for (const animal of state.animals) {
      const def = FARM_ANIMALS.find((x) => x.id === animal.id);
      if (animal.fed <= 0) continue;
      if (animal.happiness < 40) continue;
      const n = farmAnimalDaily(def, state.upgrades);
      state.produce[def.produce] = (state.produce[def.produce] || 0) + n;
      collected[def.produce] = (collected[def.produce] || 0) + n;
      animal.fed = 0;
    }
    const total = Object.values(collected).reduce((a, b) => a + b, 0);
    if (total === 0) return { ok: false, reason: 'nothing-to-collect' };
    state.produceCollected += total;
    gainXp(total * 2);
    log(`Collected produce: ${JSON.stringify(collected)}.`);
    return { ok: true, collected, total };
  }

  function sellCrop(cropId, qty, marketId) {
    const have = state.storage[cropId] || 0;
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    const crop = FARM_CROPS.find((x) => x.id === cropId);
    if (!crop) return { ok: false, reason: 'no-such-crop' };
    if (marketId === 'city' && !state.upgrades.includes('truck')) {
      return { ok: false, reason: 'need-truck' };
    }
    if (marketId === 'export' && cropId !== 'coffee' && cropId !== 'strawberry') {
      return { ok: false, reason: 'export-only-coffee' };
    }
    const unit = farmCropPrice(crop, marketId, state.rank, state.upgrades);
    const total = Math.round(unit * qty * 10) / 10;
    state.storage[cropId] -= qty;
    state.salesMade += 1;
    state.dailySales += qty;
    state.dailyRevenue += total;
    state.earned += total;
    addCash(total);
    gainXp(qty);
    if (total > state.bestSale) state.bestSale = total;
    log(`Sold ${qty}x ${crop.name} at the ${marketId} market for $${total}.`);
    return { ok: true, total, unit, qty };
  }

  function sellProduce(produceId, qty, marketId) {
    const have = state.produce[produceId] || 0;
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    if (have < qty) return { ok: false, reason: 'not-enough', have };
    const animal = FARM_ANIMALS.find((x) => x.produce === produceId);
    const unit = animal ? animal.producePrice * 1.2 : 5;
    const total = Math.round(unit * qty * 10) / 10;
    state.produce[produceId] -= qty;
    state.salesMade += 1;
    state.dailyRevenue += total;
    state.earned += total;
    addCash(total);
    gainXp(qty);
    log(`Sold ${qty}x ${produceId} for $${total}.`);
    return { ok: true, total, unit, qty };
  }

  function craftGood(recipeId) {
    const recipe = FARM_RECIPES.find((x) => x.id === recipeId);
    if (!recipe) return { ok: false, reason: 'no-such-recipe' };
    if (recipeId === 'bread') return { ok: false, reason: 'needs-flour' };
    if (!state.upgrades.includes('kitchen')) return { ok: false, reason: 'need-kitchen' };
    for (const [need, qty] of Object.entries(recipe.needs)) {
      const have = (state.storage[need] || 0) + (state.produce[need] || 0);
      if (have < qty) return { ok: false, reason: 'missing-ingredient', ingredient: need, have };
    }
    for (const [need, qty] of Object.entries(recipe.needs)) {
      let left = qty;
      const fromStorage = Math.min(state.storage[need] || 0, left);
      state.storage[need] -= fromStorage;
      left -= fromStorage;
      if (left > 0) state.produce[need] -= left;
    }
    state.craftsMade += 1;
    state.earned += recipe.price;
    addCash(recipe.price);
    gainXp(20);
    log(`Crafted ${recipe.name} — sold for $${recipe.price}.`);
    return { ok: true, recipe: recipeId, price: recipe.price };
  }

  function buyUpgrade(id) {
    const u = FARM_UPGRADES.find((x) => x.id === id);
    if (!u) return { ok: false, reason: 'no-such-upgrade' };
    if (state.upgrades.includes(id)) return { ok: false, reason: 'already-owned' };
    if (!state.owned) return { ok: false, reason: 'not-owned' };
    if (getCash() < u.cost) return { ok: false, reason: 'not-enough-cash', cost: u.cost };
    addCash(-u.cost);
    state.spent += u.cost;
    state.upgrades.push(id);
    gainXp(20);
    log(`Bought ${u.name} for $${u.cost}.`);
    return { ok: true, id };
  }

  function scareCrows() {
    const plot = state.plots.find((p) => p.crop && !p.ready);
    if (!plot) return { ok: false, reason: 'nothing-to-scare' };
    state.crowsScared += 1;
    gainXp(2);
    return { ok: true, plot: plot.id };
  }

  function improveSoil() {
    const cost = 100;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.soilQuality = Math.min(100, state.soilQuality + 10);
    log(`Compost worked into the soil. Quality now ${state.soilQuality}.`);
    return { ok: true, soil: state.soilQuality };
  }

  function tick(dt) {
    if (!state.owned) return;
    if (state.upgrades.includes('sprinkler')) {
      for (const plot of state.plots) {
        if (plot.crop && !plot.ready && rng() < dt * 0.05) {
          plot.water += 1;
        }
      }
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailySales = 0;
    state.dailyRevenue = 0;
    state.dayInSeason = ((day - 1) % 30) + 1;
    state.season = currentSeason().id;
    const roll = rng();
    if (roll < 0.35) state.weather = 'sunny';
    else if (roll < 0.6) state.weather = 'rain';
    else if (roll < 0.75) state.weather = 'fog';
    else if (roll < 0.9) state.weather = 'drought';
    else state.weather = 'storm';
    const weather = currentWeather();
    if (weather.id === 'rain') {
      for (const plot of state.plots) {
        if (plot.crop && !plot.ready) plot.water += 1;
      }
      log('Rain overnight — the fields drank for free.');
    }
    if (weather.id === 'storm') {
      for (const plot of state.plots) {
        if (plot.crop && rng() < 0.2) {
          plot.crop = null;
          plot.water = 0;
          plot.growth = 0;
          plot.ready = false;
          state.cropsLost += 1;
        }
      }
      log('Storm damage — some crops did not survive the night.');
    }
    if (weather.id === 'drought') {
      log('Drought warning — water everything twice today.');
    }
    const crowChance = state.upgrades.includes('scarecrow') ? 0.05 : 0.12;
    for (const plot of state.plots) {
      if (plot.crop && !plot.ready && rng() < crowChance) {
        plot.growth = Math.max(0, plot.growth - 1);
        log(`Crows picked at the ${plot.crop} on ${plot.id}.`);
      }
    }
    for (const animal of state.animals) {
      animal.daysOld += 1;
      animal.happiness = Math.max(20, animal.happiness - 5);
      if (animal.fed <= 0 && rng() < 0.05 && !state.upgrades.includes('fence')) {
        state.escapes += 1;
        log(`A ${animal.id} escaped the fence! It came back by dinner. Mostly.`);
      }
    }
    if (state.dayInSeason === 1) {
      log(`New season: ${currentSeason().name} — ${currentSeason().desc}`);
    }
    state.marketDay += 1;
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, owned: state.owned,
      plots: state.plots, animals: state.animals,
      storage: state.storage, produce: state.produce,
      earned: state.earned, spent: state.spent,
      upgrades: state.upgrades, hands: state.hands,
      cropsPlanted: state.cropsPlanted,
      cropsHarvested: state.cropsHarvested,
      cropsLost: state.cropsLost, waterUsed: state.waterUsed,
      feedBought: state.feedBought,
      animalsBought: state.animalsBought,
      produceCollected: state.produceCollected,
      craftsMade: state.craftsMade, salesMade: state.salesMade,
      bestHarvest: state.bestHarvest,
      bestHarvestCrop: state.bestHarvestCrop,
      bestSale: state.bestSale, season: state.season,
      weather: state.weather, dayInSeason: state.dayInSeason,
      lastDay: state.lastDay, dailySales: state.dailySales,
      dailyRevenue: state.dailyRevenue,
      crowsScared: state.crowsScared, escapes: state.escapes,
      perfectDays: state.perfectDays, marketDay: state.marketDay,
      soilQuality: state.soilQuality,
    }));
  }

  function deserialize(d) {
    if (!d || typeof d !== 'object') return;
    for (const k of Object.keys(state)) {
      if (d[k] !== undefined) state[k] = d[k];
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: FARM_RANKS[state.rank].name,
      xp: state.xp,
      owned: state.owned,
      plots: state.plots.length,
      planted: state.plots.filter((p) => p.crop).length,
      ready: state.plots.filter((p) => p.ready).length,
      animals: state.animals.length,
      animalCap: animalCap(),
      cropsPlanted: state.cropsPlanted,
      cropsHarvested: state.cropsHarvested,
      cropsLost: state.cropsLost,
      waterUsed: state.waterUsed,
      produceCollected: state.produceCollected,
      craftsMade: state.craftsMade,
      salesMade: state.salesMade,
      earned: Math.round(state.earned),
      spent: state.spent,
      upgrades: state.upgrades.length,
      bestHarvest: state.bestHarvest,
      bestHarvestCrop: state.bestHarvestCrop,
      bestSale: Math.round(state.bestSale),
      season: state.season,
      weather: state.weather,
      dayInSeason: state.dayInSeason,
      soilQuality: state.soilQuality,
      crowsScared: state.crowsScared,
      escapes: state.escapes,
      dailyRevenue: Math.round(state.dailyRevenue),
    };
  }

  function hudLine() {
    if (!state.owned) return '';
    const ready = state.plots.filter((p) => p.ready).length;
    const planted = state.plots.filter((p) => p.crop).length;
    if (ready > 0) return `Farm: ${ready} crop(s) ready to harvest! (${state.season}, ${state.weather})`;
    if (planted > 0) return `Farm: ${planted} crop(s) growing — ${state.season}, ${state.weather}`;
    return `Farm: ${state.animals.length} animals, ${state.plots.length} plots — ${state.season}`;
  }

  function interact() {
    const pos = getPos();
    const nearFarm = Math.hypot(pos.x + 200, pos.z - 200) < 40;
    if (!nearFarm) return false;
    if (!state.owned) { buyFarm(); return true; }
    const ready = state.plots.find((p) => p.ready);
    if (ready) { harvestCrop(ready.id); return true; }
    const thirsty = state.plots.find((p) => p.crop && !p.ready);
    if (thirsty) { waterCrop(thirsty.id); return true; }
    return false;
  }

  function plotList() {
    return state.plots.map((p) => ({
      id: p.id, crop: p.crop, water: p.water, growth: p.growth, ready: p.ready,
    }));
  }

  function storageList() {
    return FARM_CROPS.map((c) => ({
      id: c.id, name: c.name, stored: state.storage[c.id] || 0, price: c.price,
    })).filter((x) => x.stored > 0);
  }

  return {
    state, buyFarm, buyPlot, plantCrop, waterCrop, harvestCrop,
    clearPlot, buyAnimal, feedAnimal, collectProduce, sellCrop,
    sellProduce, craftGood, buyUpgrade, scareCrows, improveSoil,
    tick, tickDay, serialize, deserialize, stats, hudLine, interact,
    plotList, storageList, animalCap, currentSeason, currentWeather,
  };
}

export const FARM_PESTS = [
  { id: 'aphids', name: 'Aphids', damage: 1, cure: 'Spray soap water.', desc: 'Tiny green pests on the leaves.' },
  { id: 'slugs', name: 'Slugs', damage: 1, cure: 'Beer traps at dusk.', desc: 'Slow, slimy, hungry.' },
  { id: 'mildew', name: 'Powdery Mildew', damage: 2, cure: 'More air, less water.', desc: 'White dust on the leaves.' },
  { id: 'locusts', name: 'Locusts', damage: 3, cure: 'Scare them off fast.', desc: 'A cloud with teeth.' },
  { id: 'rats', name: 'Rats', damage: 2, cure: 'A good barn cat.', desc: 'They eat the stored grain.' },
];

export function farmPestFor(day) {
  return FARM_PESTS[day % FARM_PESTS.length];
}

export function farmHarvestValue(cropId, qty, marketId, rank, upgrades) {
  const crop = FARM_CROPS.find((x) => x.id === cropId);
  if (!crop) return 0;
  return Math.round(farmCropPrice(crop, marketId, rank, upgrades) * qty * 10) / 10;
}

export function farmSeasonCropBonus(crop, seasonId) {
  if (crop.season === seasonId) return 1.2;
  if (crop.season === 'any') return 1.0;
  return 0.8;
}

export function farmAnimalHappiness(daysOld, fed, escapes) {
  let h = 70 + fed * 5 - escapes * 10 - Math.floor(daysOld / 30);
  return Math.max(0, Math.min(100, h));
}

export const FARM_SEASONAL_TASKS = [
  { id: 'spring-plant', name: 'Spring Planting', season: 'spring', xp: 30, pay: 100, desc: 'Get everything in the ground before the rains end.' },
  { id: 'summer-water', name: 'Summer Watering', season: 'summer', xp: 25, pay: 80, desc: 'Water twice a day or lose the crop.' },
  { id: 'autumn-harvest', name: 'Autumn Harvest', season: 'autumn', xp: 40, pay: 150, desc: 'Bring it all in before the first frost.' },
  { id: 'winter-repair', name: 'Winter Repairs', season: 'winter', xp: 20, pay: 60, desc: 'Fix fences, mend the barn, sharpen the tools.' },
  { id: 'market-prep', name: 'Market Prep', season: 'any', xp: 15, pay: 50, desc: 'Wash, weigh, and pack for the morning market.' },
  { id: 'orchard-prune', name: 'Orchard Pruning', season: 'winter', xp: 25, pay: 90, desc: 'Cut back the trees for a bigger spring.' },
  { id: 'soil-rest', name: 'Soil Rest', season: 'winter', xp: 15, pay: 40, desc: 'Cover crops and compost for next year.' },
  { id: 'festival-prep', name: 'Harvest Festival', season: 'autumn', xp: 35, pay: 120, desc: 'The farm hosts the whole village.' },
];

export const FARM_MARKET_STALLS = [
  { id: 'veg-stall', name: 'Veg Stall', cost: 100, mult: 1.1, desc: 'Your own stall at the morning market.' },
  { id: 'fruit-stall', name: 'Fruit Stall', cost: 150, mult: 1.15, desc: 'Fruit sells itself when it smells this good.' },
  { id: 'honey-stall', name: 'Honey Stall', cost: 120, mult: 1.2, desc: 'Honey, wax, and a lot of questions.' },
  { id: 'flower-stall', name: 'Flower Stall', cost: 80, mult: 1.1, desc: 'Cut flowers for the city crowd.' },
  { id: 'egg-stall', name: 'Egg Stall', cost: 60, mult: 1.05, desc: 'Fresh eggs, every morning.' },
];

export const FARM_ORCHARD = [
  { id: 'mango-tree', name: 'Mango Tree', cost: 200, yield: 8, days: 5, desc: 'A tree that pays every summer.' },
  { id: 'lime-tree', name: 'Lime Tree', cost: 120, yield: 10, days: 4, desc: 'Limes for the restaurants.' },
  { id: 'banana', name: 'Banana Grove', cost: 180, yield: 12, days: 4, desc: 'Fast, heavy, always hungry for water.' },
  { id: 'coconut', name: 'Coconut Palm', cost: 250, yield: 6, days: 6, desc: 'Slow, tall, and very profitable.' },
  { id: 'papaya', name: 'Papaya Tree', cost: 150, yield: 9, days: 3, desc: 'Quick fruit, sweet flesh.' },
];

export function farmTaskFor(seasonId) {
  return FARM_SEASONAL_TASKS.filter((t) => t.season === seasonId || t.season === 'any');
}

export function farmStallMult(stallId) {
  const s = FARM_MARKET_STALLS.find((x) => x.id === stallId);
  return s ? s.mult : 1;
}

export function farmOrchardYield(treeId, daysGrown) {
  const t = FARM_ORCHARD.find((x) => x.id === treeId);
  if (!t) return 0;
  if (daysGrown < t.days) return 0;
  return t.yield;
}

export function createFarmTasks(system) {
  const done = [];
  let tasksPay = 0;
  const stalls = [];
  const trees = [];

  function doTask(taskId) {
    const t = FARM_SEASONAL_TASKS.find((x) => x.id === taskId);
    if (!t) return { ok: false, reason: 'no-such-task' };
    if (done.includes(taskId)) return { ok: false, reason: 'already-done' };
    if (t.season !== 'any' && t.season !== system.state.season) {
      return { ok: false, reason: 'wrong-season', season: system.state.season, need: t.season };
    }
    done.push(taskId);
    tasksPay += t.pay;
    return { ok: true, task: taskId, xp: t.xp, pay: t.pay };
  }

  function buyStall(stallId) {
    const s = FARM_MARKET_STALLS.find((x) => x.id === stallId);
    if (!s) return { ok: false, reason: 'no-such-stall' };
    if (stalls.includes(stallId)) return { ok: false, reason: 'already-owned' };
    stalls.push(stallId);
    return { ok: true, stall: stallId, mult: s.mult };
  }

  function plantTree(treeId) {
    const t = FARM_ORCHARD.find((x) => x.id === treeId);
    if (!t) return { ok: false, reason: 'no-such-tree' };
    trees.push({ id: treeId, plantedDay: system.state.lastDay });
    return { ok: true, tree: treeId, cost: t.cost };
  }

  function harvestTree(idx) {
    const tree = trees[idx];
    if (!tree) return { ok: false, reason: 'no-such-tree' };
    const def = FARM_ORCHARD.find((x) => x.id === tree.id);
    const grown = system.state.lastDay - tree.plantedDay;
    const qty = farmOrchardYield(tree.id, grown);
    if (qty <= 0) return { ok: false, reason: 'not-ready', grown, need: def.days };
    trees.splice(idx, 1);
    return { ok: true, tree: tree.id, qty };
  }

  function taskRecord() {
    return { done: [...done], tasksPay, stalls: [...stalls], trees: trees.length };
  }

  return { doTask, buyStall, plantTree, harvestTree, taskRecord };
}

export const FARM_FESTIVALS = [
  { id: 'harvest', name: 'Harvest Festival', season: 'autumn', prize: 300, desc: 'Biggest pumpkin wins the ribbon.' },
  { id: 'flower', name: 'Flower Show', season: 'spring', prize: 200, desc: 'The prettiest plot takes the prize.' },
  { id: 'honey', name: 'Honey Fair', season: 'summer', prize: 250, desc: 'Sweetest honey, judged blind.' },
  { id: 'cook', name: 'Cook-Off', season: 'winter', prize: 200, desc: 'Best dish from your own produce.' },
];

export const FARM_NEIGHBOURS = [
  { id: 'old-joe', name: 'Old Joe', trade: 'tools', desc: 'Lends tools, tells stories, never hurries.' },
  { id: 'maria', name: 'Maria', trade: 'seeds', desc: 'Rare seeds for a fair price.' },
  { id: 'sam', name: 'Sam the Vet', trade: 'animals', desc: 'Healthy animals, honest prices.' },
  { id: 'lily', name: 'Lily', trade: 'flowers', desc: 'Buys your flowers for the city shops.' },
  { id: 'pete', name: 'Pete the Miller', trade: 'flour', desc: 'Turns grain into flour, cheap.' },
];

export function farmFestivalPrize(festivalId, place) {
  const f = FARM_FESTIVALS.find((x) => x.id === festivalId);
  if (!f) return 0;
  return place === 1 ? f.prize : place === 2 ? Math.round(f.prize / 2) : Math.round(f.prize / 4);
}

export function farmNeighbourTrade(neighbourId) {
  const n = FARM_NEIGHBOURS.find((x) => x.id === neighbourId);
  return n ? n.trade : null;
}

export function farmSoilHealth(soilQuality, compost, waterUsed) {
  let score = soilQuality;
  score += compost * 5;
  score -= Math.max(0, waterUsed - 100) / 10;
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function farmYearSummary(seasons) {
  let total = 0;
  for (const s of seasons) total += s.revenue || 0;
  return { seasons: seasons.length, totalRevenue: Math.round(total) };
}

export const FARM_TIPS = [
  { id: 'water-morning', name: 'Water Mornings', text: 'Water at dawn. The sun steals the rest.' },
  { id: 'season-right', name: 'Right Season', text: 'Plant in season or plant twice.' },
  { id: 'compost-always', name: 'Compost Always', text: 'Good soil is the whole farm.' },
  { id: 'crows-watch', name: 'Watch the Crows', text: 'Scarecrows work until they do not.' },
  { id: 'sell-fresh', name: 'Sell Fresh', text: 'Fresh produce sells. Wilted produce rots.' },
  { id: 'jam-value', name: 'Jam Value', text: 'Jam sells for three times the berries.' },
  { id: 'animals-happy', name: 'Happy Animals', text: 'Fed animals produce. Hungry ones escape.' },
  { id: 'rain-free', name: 'Rain Is Free', text: 'Let the rain water for you.' },
];

export const FARM_AWARDS = [
  { id: 'first-harvest', name: 'First Harvest', need: 'cropsHarvested', goal: 1, desc: 'Harvest your first crop.' },
  { id: 'hundred-crops', name: 'Hundred Crops', need: 'cropsHarvested', goal: 100, desc: 'Harvest 100 crops.' },
  { id: 'big-barn', name: 'Big Barn', need: 'animalsBought', goal: 10, desc: 'Buy 10 animals.' },
  { id: 'market-king', name: 'Market King', need: 'salesMade', goal: 50, desc: 'Make 50 sales.' },
  { id: 'master-chef', name: 'Master Chef', need: 'craftsMade', goal: 20, desc: 'Craft 20 farm goods.' },
];

export function farmTipFor(day) {
  return FARM_TIPS[day % FARM_TIPS.length];
}

export function farmAwardProgress(awardId, state) {
  const a = FARM_AWARDS.find((x) => x.id === awardId);
  if (!a) return null;
  const have = state[a.need] || 0;
  return { id: a.id, name: a.name, have, goal: a.goal, done: have >= a.goal };
}

export function farmWaterNeed(cropId, weatherId) {
  const crop = FARM_CROPS.find((x) => x.id === cropId);
  const weather = FARM_WEATHER.find((x) => x.id === weatherId);
  if (!crop || !weather) return 0;
  return Math.max(1, Math.round(crop.water * weather.water));
}

export function farmFeedCost(animals) {
  let total = 0;
  for (const animal of animals) {
    const def = FARM_ANIMALS.find((x) => x.id === animal.id);
    if (def) total += def.feed;
  }
  return total;
}

export function farmStorageValue(storage) {
  let total = 0;
  for (const [cropId, qty] of Object.entries(storage)) {
    const crop = FARM_CROPS.find((x) => x.id === cropId);
    if (crop) total += crop.price * qty;
  }
  return Math.round(total * 10) / 10;
}

export function farmBestPlot(plots) {
  let best = null;
  let bestGrowth = -1;
  for (const plot of plots) {
    if (plot.crop && plot.growth > bestGrowth) { bestGrowth = plot.growth; best = plot.id; }
  }
  return best ? { plot: best, growth: bestGrowth } : null;
}

export const FARM_RECORDS = [
  { id: 'most-harvested', name: 'Most Harvested', stat: 'cropsHarvested', unit: 'crops', desc: 'Most crops harvested.' },
  { id: 'best-harvest', name: 'Best Harvest', stat: 'bestHarvest', unit: 'units', desc: 'Biggest single harvest.' },
  { id: 'most-sales', name: 'Most Sales', stat: 'salesMade', unit: 'sales', desc: 'Most sales made.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money earned.' },
  { id: 'most-crafts', name: 'Most Crafts', stat: 'craftsMade', unit: 'goods', desc: 'Most farm goods crafted.' },
];

export function farmRecordFor(recordId, state) {
  const r = FARM_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function farmAllRecords(state) {
  return FARM_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function farmYieldPerPlot(harvested, plots) {
  if (plots === 0) return 0;
  return Math.round((harvested / plots) * 10) / 10;
}

export function farmLossRate(lost, planted) {
  if (planted === 0) return 0;
  return Math.round((lost / planted) * 100);
}

export function farmFarmerGrade(harvested, planted, earned) {
  const loss = farmLossRate(0, planted);
  void loss;
  if (harvested >= 100 && earned >= 5000) return 'S';
  if (harvested >= 50) return 'A';
  if (harvested >= 25) return 'B';
  if (harvested >= 10) return 'C';
  return 'D';
}

export const FARM_SEASONAL_PRICES = [
  { season: 'spring', crop: 'strawberry', mult: 1.3 },
  { season: 'summer', crop: 'tomato', mult: 1.25 },
  { season: 'summer', crop: 'mango', mult: 1.2 },
  { season: 'autumn', crop: 'pumpkin', mult: 1.4 },
  { season: 'autumn', crop: 'cabbage', mult: 1.15 },
  { season: 'winter', crop: 'coffee', mult: 1.2 },
  { season: 'winter', crop: 'potato', mult: 1.1 },
  { season: 'spring', crop: 'lettuce', mult: 1.2 },
];

export function farmSeasonalPriceMult(seasonId, cropId) {
  const row = FARM_SEASONAL_PRICES.find((x) => x.season === seasonId && x.crop === cropId);
  return row ? row.mult : 1;
}

export function farmBestSeasonFor(cropId) {
  let best = null;
  let bestMult = 0;
  for (const row of FARM_SEASONAL_PRICES) {
    if (row.crop === cropId && row.mult > bestMult) { bestMult = row.mult; best = row.season; }
  }
  return best ? { season: best, mult: bestMult } : null;
}

export function farmSeasonRevenue(sales, seasonId) {
  let total = 0;
  for (const sale of sales) {
    if (sale.season === seasonId) total += sale.total || 0;
  }
  return Math.round(total);
}

export const FARM_QUICK_START = [
  'Plant radishes first — cash in one day.',
  'Water at dawn, before the sun steals it.',
  'Plant in season or plant twice.',
  'Feed animals daily. Hungry animals escape.',
  'Turn berries into jam. It pays triple.',
  'Sell at the city market once you own the truck.',
];

export function farmQuickStart(step) {
  return FARM_QUICK_START[step] || null;
}

export function farmTotalValue(state) {
  return farmStorageValue(state.storage) + state.upgrades.length * 300;
}

export function farmProgressPercent(state) {
  if (state.cropsPlanted === 0) return 0;
  return Math.round((state.cropsHarvested / state.cropsPlanted) * 100);
}

export function farmingSummary(state) {
  return `${FARM_RANKS[state.rank].name}: ${state.cropsHarvested} harvested, ${state.animals.length} animals, $${Math.round(state.earned)} earned, ${state.season}.`;
}

export function farmingNextGoal(state) {
  if (!state.owned) return 'Buy the farm.';
  if (state.cropsHarvested < 10) return 'Harvest 10 crops.';
  if (state.animals.length < 3) return 'Keep 3 animals.';
  return 'Become Lord of the Land.';
}

export const FARMING_META = {
  system: 'farming', version: '7b-B', author: 'builder-B',
  files: 1, lines: 992, features: ['crops', 'animals', 'harvest', 'crafting', 'markets', 'seasons'],
};

export function farmingMeta() {
  return { ...FARMING_META };
}
