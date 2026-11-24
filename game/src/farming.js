// Farming on the Solara outskirts: buy a farm, work plots, plant and water
// crops through the seasons, raise animals, sell at markets, craft goods,
// buy upgrades and keep the pests away. Context supplies rng, the day,
// cash access, a logger and the player position. The hour getter, heat
// adder and speed getter are present with defaults but never called.
export const FARM_CROPS = [
  { id: 'wheat', name: 'Wheat', growDays: 3, water: 1, yield: 4, price: 5, season: 'any', xp: 5, desc: 'Grows anywhere, the farm staple.' },
  { id: 'corn', name: 'Corn', growDays: 4, water: 2, yield: 5, price: 8, season: 'summer', xp: 7, desc: 'Tall summer corn.' },
  { id: 'tomato', name: 'Tomato', growDays: 5, water: 2, yield: 6, price: 12, season: 'summer', xp: 9, desc: 'Juicy summer tomatoes.' },
  { id: 'potato', name: 'Potato', growDays: 4, water: 1, yield: 5, price: 7, season: 'spring', xp: 6, desc: 'A spring root crop.' },
  { id: 'carrot', name: 'Carrot', growDays: 3, water: 1, yield: 4, price: 6, season: 'spring', xp: 6, desc: 'Sweet spring carrots.' },
  { id: 'lettuce', name: 'Lettuce', growDays: 2, water: 2, yield: 3, price: 5, season: 'spring', xp: 5, desc: 'Fast spring leaves.' },
  { id: 'strawberry', name: 'Strawberry', growDays: 4, water: 2, yield: 5, price: 15, season: 'spring', xp: 10, desc: 'Sweet spring berries.' },
  { id: 'pumpkin', name: 'Pumpkin', growDays: 6, water: 2, yield: 3, price: 14, season: 'autumn', xp: 10, desc: 'Big autumn pumpkins.' },
  { id: 'sunflower', name: 'Sunflower', growDays: 4, water: 1, yield: 4, price: 9, season: 'summer', xp: 7, desc: 'Sunny summer flowers.' },
  { id: 'cabbage', name: 'Cabbage', growDays: 5, water: 2, yield: 4, price: 8, season: 'autumn', xp: 8, desc: 'A hardy autumn head.' },
  { id: 'eggplant', name: 'Eggplant', growDays: 5, water: 2, yield: 5, price: 11, season: 'summer', xp: 8, desc: 'Purple summer fruit.' },
  { id: 'bean', name: 'Bean', growDays: 3, water: 1, yield: 5, price: 7, season: 'summer', xp: 6, desc: 'Climbing summer beans.' },
  { id: 'onion', name: 'Onion', growDays: 3, water: 1, yield: 4, price: 6, season: 'any', xp: 5, desc: 'Grows anywhere, stores well.' },
  { id: 'coffee', name: 'Coffee', growDays: 7, water: 3, yield: 3, price: 25, season: 'summer', xp: 15, desc: 'Slow summer beans, worth a fortune.' },
];

export const FARM_ANIMALS = [
  { id: 'chicken', name: 'Chicken', cost: 40, produce: 'egg', produceName: 'Eggs', desc: 'Lays an egg a day.' },
  { id: 'cow', name: 'Cow', cost: 250, produce: 'milk', produceName: 'Milk', desc: 'Gives milk every morning.' },
  { id: 'sheep', name: 'Sheep', cost: 180, produce: 'wool', produceName: 'Wool', desc: 'Shear the wool each season.' },
  { id: 'bee-hive', name: 'Bee Hive', cost: 150, produce: 'honey', produceName: 'Honey', desc: 'Busy bees make sweet honey.' },
  { id: 'pig', name: 'Pig', cost: 300, produce: 'truffle', produceName: 'Truffles', desc: 'Sniffs out truffles in the dirt.' },
  { id: 'goat', name: 'Goat', cost: 200, produce: 'milk', produceName: 'Milk', desc: 'A goat that gives good milk.' },
  { id: 'duck', name: 'Duck', cost: 60, produce: 'egg', produceName: 'Eggs', desc: 'Lays eggs by the pond.' },
  { id: 'horse', name: 'Horse', cost: 500, produce: 'ride', produceName: 'Rides', desc: 'Give rides around the farm.' },
];

export const FARM_PLOTS = [
  { id: 'meadow', name: 'Meadow Plot', cost: 0, size: 4, desc: 'The first plot, by the farmhouse.' },
  { id: 'garden', name: 'Garden Plot', cost: 200, size: 6, desc: 'A tidy garden near the house.' },
  { id: 'field', name: 'Big Field', cost: 400, size: 10, desc: 'A wide open field.' },
  { id: 'greenhouse', name: 'Greenhouse', cost: 800, size: 8, desc: 'Grows anything in any season.' },
  { id: 'orchard-plot', name: 'Orchard Plot', cost: 600, size: 8, desc: 'A plot shaded by fruit trees.' },
  { id: 'hill', name: 'Hill Plot', cost: 300, size: 5, desc: 'A sunny slope with good drainage.' },
  { id: 'riverside', name: 'Riverside Plot', cost: 500, size: 7, desc: 'Rich soil by the river.' },
  { id: 'rooftop', name: 'Rooftop Plot', cost: 1000, size: 6, desc: 'A garden on the barn roof.' },
];

export const FARM_UPGRADES = [
  { id: 'sprinkler', name: 'Sprinkler', cost: 150, effect: 'Waters plots for you.', desc: 'Automatic watering every morning.' },
  { id: 'tractor', name: 'Tractor', cost: 600, effect: 'Crops grow one day faster.', desc: 'Plough and plant in half the time.' },
  { id: 'scarecrow', name: 'Scarecrow', cost: 80, effect: 'Keeps crows away.', desc: 'A straw friend for the fields.' },
  { id: 'compost', name: 'Compost Heap', cost: 120, effect: 'Soil quality rises faster.', desc: 'Turn scraps into rich soil.' },
  { id: 'greenhouse-heater', name: 'Greenhouse Heater', cost: 300, effect: 'Greenhouse crops grow faster.', desc: 'Warm air all winter long.' },
  { id: 'big-barn', name: 'Big Barn', cost: 500, effect: 'Animal cap rises by six.', desc: 'Room for six more animals.' },
  { id: 'silo', name: 'Silo', cost: 350, effect: 'Stores twice as much grain.', desc: 'A tall silo for the harvest.' },
  { id: 'beehive-kit', name: 'Beehive Kit', cost: 200, effect: 'Honey yields double.', desc: 'Better hives, more honey.' },
  { id: 'irrigation', name: 'Irrigation', cost: 400, effect: 'Plots need one less water.', desc: 'Channels water to every plot.' },
  { id: 'fertilizer', name: 'Fertilizer', cost: 100, effect: 'Yields rise by one.', desc: 'Rich feed for every crop.' },
];

export const FARM_RECIPES = [
  { id: 'bread', name: 'Bread', needs: { wheat: 0 }, price: 20, xp: 8, desc: 'A loaf of fresh bread.' },
  { id: 'jam', name: 'Strawberry Jam', needs: { strawberry: 2 }, price: 40, xp: 10, desc: 'Sweet jam from spring berries.' },
  { id: 'cheese', name: 'Cheese', needs: { milk: 3 }, price: 50, xp: 12, desc: 'Aged farm cheese.' },
  { id: 'salad', name: 'Garden Salad', needs: { lettuce: 2, tomato: 1 }, price: 35, xp: 9, desc: 'Fresh leaves and tomato.' },
  { id: 'pie', name: 'Pumpkin Pie', needs: { pumpkin: 2 }, price: 60, xp: 14, desc: 'A spiced autumn pie.' },
  { id: 'honey-cake', name: 'Honey Cake', needs: { honey: 2, wheat: 1 }, price: 70, xp: 15, desc: 'A cake sweetened with honey.' },
  { id: 'wool-sweater', name: 'Wool Sweater', needs: { wool: 3 }, price: 90, xp: 16, desc: 'A warm sweater from the flock.' },
  { id: 'omelette', name: 'Omelette', needs: { egg: 2 }, price: 30, xp: 8, desc: 'A fluffy farm omelette.' },
];

export const FARM_MARKETS = [
  { id: 'farm-stand', name: 'Farm Stand', mult: 1.0, desc: 'Sell at your own gate.' },
  { id: 'city-market', name: 'City Market', mult: 1.2, desc: 'A busy market in the city.' },
  { id: 'export', name: 'Export Buyer', mult: 1.5, desc: 'Buys coffee and honey only.' },
  { id: 'farmers-market', name: 'Farmers Market', mult: 1.1, desc: 'Neighbours selling together.' },
  { id: 'online', name: 'Online Shop', mult: 1.3, desc: 'Ship orders to the whole city.' },
  { id: 'wholesale', name: 'Wholesale', mult: 0.8, desc: 'Bulk buyers, low prices.' },
];

export const FARM_SEASONS = [
  { id: 'spring', name: 'Spring', days: 30, desc: 'Mild days, new growth.' },
  { id: 'summer', name: 'Summer', days: 30, desc: 'Hot days, fast growth.' },
  { id: 'autumn', name: 'Autumn', days: 30, desc: 'Cool days, harvest time.' },
  { id: 'winter', name: 'Winter', days: 30, desc: 'Cold days, the farm rests.' },
];

export const FARM_RANKS = [
  { level: 0, name: 'Sprout', xp: 0, perk: 'Work your first plot.' },
  { level: 1, name: 'Gardener', xp: 150, perk: 'Buy more plots and animals.' },
  { level: 2, name: 'Farmer', xp: 400, perk: 'Open the city market.' },
  { level: 3, name: 'Harvest Master', xp: 800, perk: 'Export prices and big barns.' },
  { level: 4, name: 'Farm Legend', xp: 1500, perk: 'The best farm in the valley.' },
];

export const FARM_WEATHER = [
  { id: 'sunny', name: 'Sunny', growth: 1, water: 0, desc: 'A bright sunny day.' },
  { id: 'rainy', name: 'Rainy', growth: 1, water: 1, desc: 'Rain waters every plot.' },
  { id: 'cloudy', name: 'Cloudy', growth: 1, water: 0, desc: 'A grey but mild day.' },
  { id: 'storm', name: 'Storm', growth: 0, water: 0, desc: 'A storm that wrecks the fields.' },
  { id: 'windy', name: 'Windy', growth: 1, water: -1, desc: 'Wind dries the soil out.' },
];

export const FARM_PESTS = [
  { id: 'aphids', name: 'Aphids', damage: 1, desc: 'Tiny bugs on the leaves.' },
  { id: 'crows', name: 'Crows', damage: 2, desc: 'Crows stealing seeds.' },
  { id: 'rabbits', name: 'Rabbits', damage: 2, desc: 'Rabbits nibbling the shoots.' },
  { id: 'slugs', name: 'Slugs', damage: 1, desc: 'Slugs on the wet leaves.' },
  { id: 'beetles', name: 'Beetles', damage: 3, desc: 'Beetles chewing the stems.' },
];

export const FARM_SEASONAL_TASKS = [
  { id: 'spring-planting', name: 'Spring Planting', season: 'spring', xp: 40, desc: 'Plant five spring crops.' },
  { id: 'summer-water', name: 'Summer Watering', season: 'summer', xp: 40, desc: 'Water every plot on a hot day.' },
  { id: 'autumn-harvest', name: 'Autumn Harvest', season: 'autumn', xp: 50, desc: 'Harvest ten crops in autumn.' },
  { id: 'winter-rest', name: 'Winter Rest', season: 'winter', xp: 30, desc: 'Tend the animals through winter.' },
  { id: 'spring-festival-prep', name: 'Festival Prep', season: 'spring', xp: 35, desc: 'Grow flowers for the festival.' },
  { id: 'summer-jam', name: 'Summer Jam', season: 'summer', xp: 45, desc: 'Make jam from summer berries.' },
  { id: 'autumn-pie', name: 'Autumn Pie', season: 'autumn', xp: 45, desc: 'Bake a pumpkin pie.' },
  { id: 'winter-market', name: 'Winter Market', season: 'winter', xp: 40, desc: 'Sell stored crops at the winter market.' },
];

export const FARM_MARKET_STALLS = [
  { id: 'veg-stall', name: 'Veg Stall', cost: 200, mult: 1.1, desc: 'A stall for fresh vegetables.' },
  { id: 'fruit-stall', name: 'Fruit Stall', cost: 250, mult: 1.15, desc: 'A stall for sweet fruit.' },
  { id: 'baked-stall', name: 'Baked Stall', cost: 300, mult: 1.2, desc: 'A stall for bread and cakes.' },
  { id: 'dairy-stall', name: 'Dairy Stall', cost: 300, mult: 1.2, desc: 'A stall for cheese and milk.' },
  { id: 'flower-stall', name: 'Flower Stall', cost: 150, mult: 1.05, desc: 'A stall for fresh flowers.' },
];

export const FARM_ORCHARD = [
  { id: 'apple', name: 'Apple Tree', cost: 150, yield: 5, price: 10, desc: 'Crisp apples every autumn.' },
  { id: 'orange', name: 'Orange Tree', cost: 180, yield: 5, price: 12, desc: 'Sweet oranges in the sun.' },
  { id: 'lemon', name: 'Lemon Tree', cost: 160, yield: 4, price: 11, desc: 'Sharp lemons for cooking.' },
  { id: 'peach', name: 'Peach Tree', cost: 200, yield: 4, price: 14, desc: 'Soft peaches in summer.' },
  { id: 'plum', name: 'Plum Tree', cost: 170, yield: 5, price: 12, desc: 'Dark plums for jam.' },
];

export const FARM_FESTIVALS = [
  { id: 'harvest-fest', name: 'Harvest Festival', season: 'autumn', prize: 500, desc: 'The big autumn celebration.' },
  { id: 'spring-fair', name: 'Spring Fair', season: 'spring', prize: 300, desc: 'A fair to welcome the spring.' },
  { id: 'summer-fete', name: 'Summer Fete', season: 'summer', prize: 400, desc: 'Music and food in the sun.' },
  { id: 'winter-market-fest', name: 'Winter Market', season: 'winter', prize: 350, desc: 'Lights and stalls in the cold.' },
];

export const FARM_NEIGHBOURS = [
  { id: 'old-joe', name: 'Old Joe', rep: 0, desc: 'The neighbour who knows every trick.' },
  { id: 'maria', name: 'Maria', rep: 0, desc: 'Bakes the best pies in the valley.' },
  { id: 'tom', name: 'Tom', rep: 0, desc: 'Runs the tractor repair shop.' },
  { id: 'lily', name: 'Lily', rep: 0, desc: 'Grows flowers by the river.' },
  { id: 'sam', name: 'Sam', rep: 0, desc: 'Sells seeds at the market.' },
];

export const FARM_TIPS = [
  { id: 'tip-water', name: 'Water Early', tip: 'Water in the morning, before the sun dries the soil.' },
  { id: 'tip-season', name: 'Mind Seasons', tip: 'A summer crop planted in winter will not grow.' },
  { id: 'tip-soil', name: 'Feed Soil', tip: 'Good soil grows more than good seed.' },
  { id: 'tip-animals', name: 'Feed Animals', tip: 'A fed animal gives produce every day.' },
  { id: 'tip-markets', name: 'Pick Markets', tip: 'Export pays more, but only for some crops.' },
  { id: 'tip-craft', name: 'Craft Goods', tip: 'Goods sell for more than raw crops.' },
  { id: 'tip-pests', name: 'Watch Pests', tip: 'Scarecrows keep the crows away.' },
  { id: 'tip-greenhouse', name: 'Greenhouse', tip: 'A greenhouse grows anything, any season.' },
];

export const FARM_AWARDS = [
  { id: 'first-harvest', name: 'First Harvest', need: 'harvests', goal: 1, desc: 'Harvest your first crop.' },
  { id: 'ten-harvests', name: 'Ten Harvests', need: 'harvests', goal: 10, desc: 'Harvest ten crops.' },
  { id: 'first-animal', name: 'First Animal', need: 'animalsBought', goal: 1, desc: 'Buy your first animal.' },
  { id: 'first-good', name: 'First Good', need: 'goodsCrafted', goal: 1, desc: 'Craft your first good.' },
  { id: 'rich-farmer', name: 'Rich Farmer', need: 'harvests', goal: 50, desc: 'Harvest fifty crops.' },
];

export const FARM_RECORDS = [
  { id: 'harvests', name: 'Harvests', field: 'harvests', unit: 'crops', desc: 'All crops harvested.' },
  { id: 'planted', name: 'Planted', field: 'planted', unit: 'crops', desc: 'All crops planted.' },
  { id: 'earned', name: 'Total Earned', field: 'earned', unit: 'cash', desc: 'All cash earned from the farm.' },
  { id: 'animals', name: 'Animals Bought', field: 'animalsBought', unit: 'animals', desc: 'All animals bought.' },
  { id: 'goods', name: 'Goods Crafted', field: 'goodsCrafted', unit: 'goods', desc: 'All goods crafted.' },
];

export const FARM_SEASONAL_PRICES = [
  { id: 'spring-strawberry', crop: 'strawberry', season: 'spring', price: 20, desc: 'Spring berries fetch a premium.' },
  { id: 'summer-tomato', crop: 'tomato', season: 'summer', price: 16, desc: 'Summer tomatoes at their best.' },
  { id: 'autumn-pumpkin', crop: 'pumpkin', season: 'autumn', price: 18, desc: 'Autumn pumpkins for the festival.' },
  { id: 'winter-wheat', crop: 'wheat', season: 'winter', price: 7, desc: 'Winter wheat is scarce.' },
  { id: 'spring-lettuce', crop: 'lettuce', season: 'spring', price: 7, desc: 'Spring leaves, fresh and dear.' },
  { id: 'summer-coffee', crop: 'coffee', season: 'summer', price: 30, desc: 'Summer coffee at top price.' },
  { id: 'autumn-cabbage', crop: 'cabbage', season: 'autumn', price: 10, desc: 'Autumn cabbage for the table.' },
  { id: 'spring-carrot', crop: 'carrot', season: 'spring', price: 8, desc: 'Spring carrots, sweet and small.' },
];

export const FARM_QUICK_START = [
  'Buy the farm and plant wheat in the meadow plot.',
  'Water the plot every day until the crop is ready.',
  'Harvest and sell at the farm stand.',
  'Buy a chicken and feed it for daily eggs.',
  'Craft jam from strawberries for extra cash.',
  'Save for a greenhouse to grow in any season.',
];

export const FARM_META = {
  system: 'farming',
  version: '7b-B',
  author: 'builder-B',
  files: 1,
  lines: 992,
  features: ['crops', 'animals', 'plots', 'crafting', 'markets', 'seasons'],
};

const findById = (list, id) => list.find((x) => x.id === id);
const clampNum = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const SEASON_ORDER = ['spring', 'summer', 'autumn', 'winter'];

export function farmRankFor(xp) {
  let level = 0;
  for (const r of FARM_RANKS) if (xp >= r.xp) level = r.level;
  return level;
}

export function farmSeasonFor(dayInSeason) {
  return SEASON_ORDER[Math.floor((dayInSeason - 1) / 30) % 4];
}

export function farmCropPrice(cropId, marketId, seasonId) {
  const crop = findById(FARM_CROPS, cropId);
  if (!crop) return 0;
  const market = findById(FARM_MARKETS, marketId);
  const seasonal = FARM_SEASONAL_PRICES.find((p) => p.crop === cropId && p.season === seasonId);
  const base = seasonal ? seasonal.price : crop.price;
  return Math.round(base * (market ? market.mult : 1));
}

export function farmAnimalCap(upgrades) {
  return 6 + (upgrades && upgrades.includes('big-barn') ? 6 : 0);
}

export function farmCanPlant(cropId, seasonId, plotId) {
  const crop = findById(FARM_CROPS, cropId);
  if (!crop) return false;
  if (plotId === 'greenhouse') return true;
  return crop.season === 'any' || crop.season === seasonId;
}

export function farmGrowthDays(cropId, upgrades) {
  const crop = findById(FARM_CROPS, cropId);
  if (!crop) return 0;
  let days = crop.growDays;
  if (upgrades && upgrades.includes('tractor')) days -= 1;
  return Math.max(1, days);
}

export function farmYieldFor(cropId, upgrades) {
  const crop = findById(FARM_CROPS, cropId);
  if (!crop) return 0;
  return crop.yield + (upgrades && upgrades.includes('fertilizer') ? 1 : 0);
}

export function farmProducePrice(produceId) {
  if (produceId === 'egg') return 4;
  if (produceId === 'milk') return 10;
  if (produceId === 'wool') return 12;
  if (produceId === 'honey') return 20;
  if (produceId === 'truffle') return 40;
  if (produceId === 'ride') return 15;
  return 0;
}

export function farmMarketMult(marketId) {
  const m = findById(FARM_MARKETS, marketId);
  return m ? m.mult : 1;
}

export function farmExportAccepts(cropId) {
  return cropId === 'coffee' || cropId === 'strawberry';
}

export function farmPestFor(day) {
  return FARM_PESTS[((day % FARM_PESTS.length) + FARM_PESTS.length) % FARM_PESTS.length];
}

export function farmWeatherFor(day) {
  return FARM_WEATHER[((day % FARM_WEATHER.length) + FARM_WEATHER.length) % FARM_WEATHER.length];
}

export function farmTipFor(day) {
  return FARM_TIPS[((day % FARM_TIPS.length) + FARM_TIPS.length) % FARM_TIPS.length];
}

export function farmAwardProgress(awardId, state) {
  const a = findById(FARM_AWARDS, awardId);
  if (!a) return null;
  const current = state[a.need] || 0;
  return { id: a.id, name: a.name, current, goal: a.goal, done: current >= a.goal };
}

export function farmSeasonalPriceFor(cropId, seasonId) {
  const p = FARM_SEASONAL_PRICES.find((x) => x.crop === cropId && x.season === seasonId);
  return p ? p.price : null;
}

export function farmRecordFor(recordId, state) {
  const rec = findById(FARM_RECORDS, recordId);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: state[rec.field] || 0, unit: rec.unit };
}

export function farmAllRecords(state) {
  return FARM_RECORDS.map((r) => ({ id: r.id, name: r.name, value: state[r.field] || 0, unit: r.unit, desc: r.desc }));
}

export function farmHarvestRate(harvests, planted) {
  if (!planted) return 0;
  return Math.round((harvests / planted) * 1000) / 10;
}

export function farmFarmerGrade(harvests, goodsCrafted, animalsBought) {
  const score = harvests + goodsCrafted * 3 + animalsBought * 2;
  if (score >= 100) return 'S';
  if (score >= 60) return 'A';
  if (score >= 30) return 'B';
  if (score >= 10) return 'C';
  return 'D';
}

export function farmSeasonalTask(seasonId) {
  return FARM_SEASONAL_TASKS.filter((t) => t.season === seasonId);
}

export function farmFestivalFor(seasonId) {
  return FARM_FESTIVALS.find((f) => f.season === seasonId) || null;
}

export function farmNeighbourRep(neighbourId, state) {
  const n = findById(FARM_NEIGHBOURS, neighbourId);
  if (!n) return 0;
  return (state.neighbourRep && state.neighbourRep[neighbourId]) || 0;
}

export function farmQuickStart(step) {
  if (step < 0 || step >= FARM_QUICK_START.length) return null;
  return FARM_QUICK_START[step];
}

export function farmTotalValue(state) {
  return state.plots.length * 300 + state.animals.length * 150 + state.upgrades.length * 200;
}

export function farmProgressPercent(state) {
  const total = state.planted + state.harvests;
  if (!total) return 0;
  return Math.round((state.harvests / total) * 1000) / 10;
}

export function farmSummary(state) {
  const rankName = FARM_RANKS[state.rank].name;
  return `${rankName} Fern planted ${state.planted} crops, harvested ${state.harvests}, owns ${state.animals.length} animals and earned ${Math.round(state.earned)}.`;
}

export function farmNextGoal(state) {
  if (!state.owned) return 'Buy the farm to hit your first goal.';
  if (state.harvests < 1) return 'Harvest your first crop to hit your next goal.';
  if (state.animals.length < 1) return 'Buy your first animal to hit your next goal.';
  if (state.goodsCrafted < 1) return 'Craft your first good to hit your next goal.';
  return 'Reach the top rank and become a Farm Legend.';
}

export function farmMeta() {
  return { ...FARM_META, features: [...FARM_META.features] };
}

export function createFarmSystem(ctx) {
  const {
    rng = Math.random,
    getDay = () => 1,
    getHour = () => 12,
    getCash = () => 0,
    addCash = () => {},
    addHeat = () => {},
    getSpeed = () => 0,
    log = () => {},
    getPlayerPos = () => ({ x: 0, y: 0, z: 0 }),
  } = ctx || {};

  const storage = {};
  for (const c of FARM_CROPS) storage[c.id] = 0;
  const produce = { egg: 0, milk: 0, wool: 0, honey: 0, truffle: 0, ride: 0 };

  const state = {
    xp: 0, rank: 0, owned: false, plots: [], animals: [], storage, produce,
    upgrades: [], goods: {}, season: 'spring', weather: 'sunny', dayInSeason: 1,
    soilQuality: 50, hands: [], perfectDays: 0, marketDay: 1, planted: 0,
    harvests: 0, animalsBought: 0, goodsCrafted: 0, earned: 0, spent: 0,
    lastDay: 1, neighbourRep: {}, pestLevel: 0,
  };

  const refreshRank = () => {
    const next = farmRankFor(state.xp);
    if (next > state.rank) state.rank = next;
  };
  const gainXp = (n) => { state.xp += n; refreshRank(); };
  const fail = (reason) => ({ ok: false, reason });
  const plotByIndex = (i) => state.plots[i] || null;

  function buyFarm() {
    if (state.owned) return fail('farm already owned');
    if (getCash() < 1500) return fail('not enough cash');
    addCash(-1500);
    state.spent += 1500;
    state.owned = true;
    const first = FARM_PLOTS[0];
    state.plots.push({ plotId: first.id, crop: null, growth: 0, water: 0, ready: false });
    gainXp(50);
    return { ok: true, plot: first.id };
  }

  function buyPlot(plotId) {
    const def = findById(FARM_PLOTS, plotId);
    if (!def) return fail('unknown plot');
    if (!state.owned) return fail('no farm yet');
    if (state.plots.some((p) => p.plotId === plotId)) return fail('plot already owned');
    if (getCash() < def.cost) return fail('not enough cash');
    addCash(-def.cost);
    state.spent += def.cost;
    state.plots.push({ plotId, crop: null, growth: 0, water: 0, ready: false });
    gainXp(20);
    return { ok: true, plot: plotId };
  }

  function plantCrop(plotIndex, cropId) {
    const plot = plotByIndex(plotIndex);
    if (!plot) return fail('unknown plot');
    const crop = findById(FARM_CROPS, cropId);
    if (!crop) return fail('unknown crop');
    if (plot.crop) return fail('plot already planted');
    if (!farmCanPlant(cropId, state.season, plot.plotId)) return fail('wrong season for this crop');
    plot.crop = cropId;
    plot.growth = 0;
    plot.water = 0;
    plot.ready = false;
    state.planted += 1;
    gainXp(3);
    return { ok: true, plot: plotIndex, crop: cropId };
  }

  function waterCrop(plotIndex) {
    const plot = plotByIndex(plotIndex);
    if (!plot) return fail('unknown plot');
    if (!plot.crop) return fail('nothing planted');
    const crop = findById(FARM_CROPS, plot.crop);
    const need = Math.max(1, crop.water - (state.upgrades.includes('irrigation') ? 1 : 0));
    if (plot.water >= need) return fail('already watered enough');
    plot.water += 1;
    return { ok: true, plot: plotIndex, water: plot.water, need };
  }

  function harvestCrop(plotIndex) {
    const plot = plotByIndex(plotIndex);
    if (!plot) return fail('unknown plot');
    if (!plot.crop) return fail('nothing planted');
    if (!plot.ready) return fail('not ready yet');
    const crop = findById(FARM_CROPS, plot.crop);
    const amount = farmYieldFor(plot.crop, state.upgrades);
    state.storage[plot.crop] += amount;
    state.harvests += 1;
    gainXp(crop.xp);
    const got = plot.crop;
    plot.crop = null;
    plot.growth = 0;
    plot.water = 0;
    plot.ready = false;
    return { ok: true, crop: got, amount };
  }

  function clearPlot(plotIndex) {
    const plot = plotByIndex(plotIndex);
    if (!plot) return fail('unknown plot');
    plot.crop = null;
    plot.growth = 0;
    plot.water = 0;
    plot.ready = false;
    return { ok: true, plot: plotIndex };
  }

  function buyAnimal(animalId) {
    const def = findById(FARM_ANIMALS, animalId);
    if (!def) return fail('unknown animal');
    if (!state.owned) return fail('no farm yet');
    if (state.animals.length >= farmAnimalCap(state.upgrades)) return fail('animal cap reached');
    if (getCash() < def.cost) return fail('not enough cash');
    addCash(-def.cost);
    state.spent += def.cost;
    state.animals.push({ id: animalId, fed: false, produceReady: false });
    state.animalsBought += 1;
    gainXp(15);
    return { ok: true, animal: animalId };
  }

  function feedAnimal(index) {
    const a = state.animals[index];
    if (!a) return fail('unknown animal');
    if (a.fed) return fail('already fed today');
    a.fed = true;
    a.produceReady = true;
    return { ok: true, animal: a.id };
  }

  function collectProduce(index) {
    const a = state.animals[index];
    if (!a) return fail('unknown animal');
    if (!a.produceReady) return fail('no produce ready');
    const def = findById(FARM_ANIMALS, a.id);
    let amount = 1;
    if (def.produce === 'honey' && state.upgrades.includes('beehive-kit')) amount = 2;
    state.produce[def.produce] += amount;
    a.produceReady = false;
    a.fed = false;
    gainXp(4);
    return { ok: true, produce: def.produce, amount };
  }

  function sellCrop(cropId, qty, marketId) {
    const crop = findById(FARM_CROPS, cropId);
    if (!crop) return fail('unknown crop');
    if (marketId === 'export' && !farmExportAccepts(cropId)) return fail('export does not buy this crop');
    if ((state.storage[cropId] || 0) < qty) return fail('not enough in storage');
    const price = farmCropPrice(cropId, marketId, state.season);
    const total = price * qty;
    state.storage[cropId] -= qty;
    addCash(total);
    state.earned += total;
    gainXp(2);
    return { ok: true, crop: cropId, qty, price, total };
  }

  function sellProduce(produceId, qty, marketId) {
    if (!(produceId in state.produce)) return fail('unknown produce');
    if (state.produce[produceId] < qty) return fail('not enough produce');
    const price = farmProducePrice(produceId);
    const total = price * qty;
    state.produce[produceId] -= qty;
    addCash(total);
    state.earned += total;
    gainXp(2);
    return { ok: true, produce: produceId, qty, price, total };
  }

  function craftGood(recipeId) {
    const recipe = findById(FARM_RECIPES, recipeId);
    if (!recipe) return fail('unknown recipe');
    if (recipeId === 'bread') return fail('needs-flour');
    for (const [item, qty] of Object.entries(recipe.needs)) {
      const have = (state.storage[item] || 0) + (state.produce[item] || 0);
      if (have < qty) return fail('missing ingredients');
    }
    for (const [item, qty] of Object.entries(recipe.needs)) {
      let left = qty;
      const fromStorage = Math.min(state.storage[item] || 0, left);
      state.storage[item] = (state.storage[item] || 0) - fromStorage;
      left -= fromStorage;
      if (left > 0) state.produce[item] = (state.produce[item] || 0) - left;
    }
    state.goods[recipeId] = (state.goods[recipeId] || 0) + 1;
    state.goodsCrafted += 1;
    gainXp(recipe.xp);
    return { ok: true, good: recipeId, price: recipe.price };
  }

  function buyUpgrade(upgradeId) {
    const up = findById(FARM_UPGRADES, upgradeId);
    if (!up) return fail('unknown upgrade');
    if (state.upgrades.includes(upgradeId)) return fail('already owned');
    if (getCash() < up.cost) return fail('not enough cash');
    addCash(-up.cost);
    state.spent += up.cost;
    state.upgrades.push(upgradeId);
    gainXp(20);
    return { ok: true, upgrade: upgradeId };
  }

  function scareCrows() {
    if (getCash() < 20) return fail('not enough cash');
    addCash(-20);
    state.spent += 20;
    state.pestLevel = Math.max(0, state.pestLevel - 1);
    return { ok: true, cost: 20, pestLevel: state.pestLevel };
  }

  function improveSoil() {
    if (getCash() < 30) return fail('not enough cash');
    addCash(-30);
    state.spent += 30;
    state.soilQuality = clampNum(state.soilQuality + 5, 0, 100);
    return { ok: true, cost: 30, soilQuality: state.soilQuality };
  }

  function tick(dt) {
    if (!dt || dt <= 0) return;
    for (const plot of state.plots) {
      if (plot.crop && !plot.ready) plot.growth += dt * 0.01;
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dayInSeason += 1;
    if (state.dayInSeason > 30) {
      state.dayInSeason = 1;
      const idx = SEASON_ORDER.indexOf(state.season);
      state.season = SEASON_ORDER[(idx + 1) % 4];
      log(`A new season begins: ${state.season}.`);
    }
    const roll = rng();
    state.weather = roll < 0.5 ? 'sunny' : roll < 0.7 ? 'cloudy' : roll < 0.85 ? 'rainy' : roll < 0.95 ? 'windy' : 'storm';
    const w = findById(FARM_WEATHER, state.weather);
    if (state.weather === 'storm') {
      for (const plot of state.plots) {
        if (plot.crop && rng() < 0.2) {
          plot.crop = null;
          plot.growth = 0;
          plot.water = 0;
          plot.ready = false;
          log('A storm wrecked a plot.');
        }
      }
    }
    for (const plot of state.plots) {
      if (!plot.crop) continue;
      if (state.weather === 'rainy') plot.water += 1;
      if (state.weather === 'windy') plot.water = Math.max(0, plot.water - 1);
      if (state.upgrades.includes('sprinkler')) plot.water += 1;
      const crop = findById(FARM_CROPS, plot.crop);
      const need = Math.max(1, crop.water - (state.upgrades.includes('irrigation') ? 1 : 0));
      if (plot.water >= need) {
        plot.growth += w.growth;
        plot.water -= need;
      }
      if (plot.growth >= farmGrowthDays(plot.crop, state.upgrades)) plot.ready = true;
    }
    for (const a of state.animals) a.fed = false;
    if (rng() < 0.1) {
      state.pestLevel += 1;
      log(`Pests spotted: ${farmPestFor(day).name}.`);
    }
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    for (const key of Object.keys(saved)) {
      if (key in state) state[key] = saved[key];
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: FARM_RANKS[state.rank].name, xp: state.xp, owned: state.owned,
      plots: state.plots.length, animals: state.animals.length,
      planted: state.planted, harvests: state.harvests,
      goodsCrafted: state.goodsCrafted, upgrades: state.upgrades.length,
      earned: Math.round(state.earned), spent: state.spent,
      season: state.season, weather: state.weather, dayInSeason: state.dayInSeason,
      soilQuality: state.soilQuality, pestLevel: state.pestLevel,
      animalCap: farmAnimalCap(state.upgrades),
    };
  }

  function hudLine() {
    if (!state.owned) return 'Buy the farm to start farming.';
    const ready = state.plots.filter((p) => p.ready).length;
    if (ready > 0) return `${ready} plot${ready > 1 ? 's' : ''} ready to harvest.`;
    const growing = state.plots.filter((p) => p.crop).length;
    if (growing > 0) return `${growing} crop${growing > 1 ? 's' : ''} growing in ${state.season}.`;
    return '';
  }

  function interact() {
    const pos = getPlayerPos() || {};
    const dx = (pos.x || 0) - (-200);
    const dz = (pos.z || 0) - (-200);
    if (Math.sqrt(dx * dx + dz * dz) > 40) return false;
    const ready = state.plots.findIndex((p) => p.ready);
    if (ready >= 0) { harvestCrop(ready); return true; }
    return false;
  }

  function plotList() {
    return state.plots.map((p, i) => ({
      index: i, plot: p.plotId, crop: p.crop, growth: Math.round(p.growth * 10) / 10,
      water: p.water, ready: p.ready,
    }));
  }

  function storageList() {
    return FARM_CROPS.filter((c) => (state.storage[c.id] || 0) > 0)
      .map((c) => ({ crop: c.id, name: c.name, qty: state.storage[c.id] }));
  }

  function animalCap() {
    return farmAnimalCap(state.upgrades);
  }

  function currentSeason() {
    return state.season;
  }

  function currentWeather() {
    return state.weather;
  }

  return {
    state, buyFarm, buyPlot, plantCrop, waterCrop, harvestCrop, clearPlot,
    buyAnimal, feedAnimal, collectProduce, sellCrop, sellProduce, craftGood,
    buyUpgrade, scareCrows, improveSoil, tick, tickDay, serialize, deserialize,
    stats, hudLine, interact, plotList, storageList, animalCap, currentSeason,
    currentWeather,
  };
}

export function createFarmTasks(system) {
  const st = system.state;
  const claimed = [];
  const stalls = [];
  const trees = [];
  let tasksDone = 0;
  let tasksEarned = 0;
  let stallsBought = 0;
  let treesPlanted = 0;

  const fail = (reason) => ({ ok: false, reason });

  function doTask(taskId) {
    const task = findById(FARM_SEASONAL_TASKS, taskId);
    if (!task) return fail('unknown task');
    if (claimed.includes(taskId)) return fail('task already done');
    if (task.season !== st.season) return fail('wrong season for this task');
    claimed.push(taskId);
    tasksDone += 1;
    tasksEarned += task.xp;
    return { ok: true, task: taskId, xp: task.xp };
  }

  function buyStall(stallId) {
    const stall = findById(FARM_MARKET_STALLS, stallId);
    if (!stall) return fail('unknown stall');
    if (stalls.includes(stallId)) return fail('stall already owned');
    stalls.push(stallId);
    stallsBought += 1;
    return { ok: true, stall: stallId, cost: stall.cost };
  }

  function plantTree(treeId) {
    const tree = findById(FARM_ORCHARD, treeId);
    if (!tree) return fail('unknown tree');
    if (trees.some((t) => t.id === treeId)) return fail('tree already planted');
    trees.push({ id: treeId, growth: 0, ready: false });
    treesPlanted += 1;
    return { ok: true, tree: treeId, cost: tree.cost };
  }

  function harvestTree(treeId) {
    const tree = trees.find((t) => t.id === treeId);
    if (!tree) return fail('tree not planted');
    if (!tree.ready) return fail('tree not ready');
    const def = findById(FARM_ORCHARD, treeId);
    tree.ready = false;
    tree.growth = 0;
    const pay = def.yield * def.price;
    tasksEarned += pay;
    return { ok: true, tree: treeId, yield: def.yield, pay };
  }

  function taskRecord() {
    return { tasksDone, tasksEarned, stallsBought, treesPlanted, claimed: [...claimed], stalls: [...stalls] };
  }

  return { doTask, buyStall, plantTree, harvestTree, taskRecord };
}

// Alias matching the name main.js imports (brief: createFarmingSystem);
// the factory itself is createFarmSystem above.
export const createFarmingSystem = createFarmSystem;
