// Taco Thunder — food truck: cook, serve, chase the lunch rush and the
// late-night crowd. Round 7, all-new system. Buy ingredients, prep the
// menu, park where the people are, and cook to order: every dish has a
// cook timer, a quality roll and a patience clock. Rush hour pays triple,
// the health inspector pays visits, and a five-star truck with a signature
// dish can cater weddings. Burn the food and the crowd walks.
export const FOOD_TRUCK_SPOTS = [
  { id: 'central', name: 'Central Station Plaza', x: 0, z: 0, lunch: 0.9, dinner: 0.5, night: 0.3, rent: 20 },
  { id: 'beach', name: 'Marina Beach', x: 190, z: 140, lunch: 0.7, dinner: 0.8, night: 0.4, rent: 25 },
  { id: 'campus', name: 'University Quad', x: 60, z: 190, lunch: 1.0, dinner: 0.4, night: 0.2, rent: 15 },
  { id: 'stadium', name: 'Stadium Gates', x: -200, z: -40, lunch: 0.4, dinner: 0.6, night: 0.9, rent: 30 },
  { id: 'harbor', name: 'Harbor Docks', x: -180, z: 120, lunch: 0.8, dinner: 0.5, night: 0.2, rent: 10 },
  { id: 'nightclub', name: 'Neon Reef Row', x: 60, z: 120, lunch: 0.2, dinner: 0.5, night: 1.0, rent: 35 },
  { id: 'park', name: 'Palm Grove Park', x: -40, z: 190, lunch: 0.6, dinner: 0.7, night: 0.3, rent: 12 },
];

export const FOOD_MENU = [
  { id: 'taco', name: 'Street Taco', price: 6, cost: 2, cookTime: 8, skill: 1, ingredients: { tortilla: 1, meat: 1, salsa: 1 } },
  { id: 'burrito', name: 'Big Burrito', price: 10, cost: 4, cookTime: 14, skill: 1, ingredients: { tortilla: 1, meat: 2, rice: 1, salsa: 1 } },
  { id: 'burger', name: 'Smash Burger', price: 12, cost: 5, cookTime: 16, skill: 2, ingredients: { bun: 1, meat: 1, cheese: 1, lettuce: 1 } },
  { id: 'fries', name: 'Loaded Fries', price: 7, cost: 2, cookTime: 10, skill: 1, ingredients: { potato: 2, cheese: 1, salsa: 1 } },
  { id: 'hotdog', name: 'Solara Dog', price: 8, cost: 3, cookTime: 9, skill: 1, ingredients: { bun: 1, meat: 1, salsa: 1 } },
  { id: 'quesadilla', name: 'Quesadilla', price: 9, cost: 3, cookTime: 12, skill: 2, ingredients: { tortilla: 1, cheese: 2, meat: 1 } },
  { id: 'ramen', name: 'Truck Ramen', price: 14, cost: 6, cookTime: 20, skill: 3, ingredients: { noodle: 1, meat: 1, egg: 1, salsa: 1 } },
  { id: 'lobster', name: 'Lobster Roll', price: 22, cost: 10, cookTime: 18, skill: 4, ingredients: { bun: 1, lobster: 1, lettuce: 1 } },
  { id: 'salad', name: 'Harbor Salad', price: 9, cost: 3, cookTime: 7, skill: 1, ingredients: { lettuce: 2, tomato: 1, cheese: 1 } },
  { id: 'icecream', name: 'Churro Sundae', price: 8, cost: 3, cookTime: 6, skill: 1, ingredients: { sugar: 1, cheese: 1 } },
];

export const FOOD_INGREDIENTS = [
  { id: 'tortilla', name: 'Tortillas', price: 1, bulk: 20, bulkPrice: 15 },
  { id: 'meat', name: 'Meat', price: 2, bulk: 20, bulkPrice: 30 },
  { id: 'salsa', name: 'Salsa', price: 1, bulk: 20, bulkPrice: 12 },
  { id: 'rice', name: 'Rice', price: 1, bulk: 20, bulkPrice: 10 },
  { id: 'bun', name: 'Buns', price: 1, bulk: 20, bulkPrice: 14 },
  { id: 'cheese', name: 'Cheese', price: 2, bulk: 20, bulkPrice: 28 },
  { id: 'lettuce', name: 'Lettuce', price: 1, bulk: 20, bulkPrice: 8 },
  { id: 'potato', name: 'Potatoes', price: 1, bulk: 20, bulkPrice: 10 },
  { id: 'noodle', name: 'Noodles', price: 2, bulk: 20, bulkPrice: 26 },
  { id: 'egg', name: 'Eggs', price: 1, bulk: 20, bulkPrice: 12 },
  { id: 'lobster', name: 'Lobster', price: 8, bulk: 10, bulkPrice: 60 },
  { id: 'tomato', name: 'Tomatoes', price: 1, bulk: 20, bulkPrice: 10 },
  { id: 'sugar', name: 'Sugar & Churros', price: 2, bulk: 20, bulkPrice: 24 },
];

export const FOOD_CUSTOMER_TYPES = [
  { id: 'hungry', name: 'Hungry Commuter', patience: 45, tipChance: 0.1, tip: 2 },
  { id: 'foodie', name: 'Foodie', patience: 90, tipChance: 0.5, tip: 8, wantsQuality: true },
  { id: 'family', name: 'Family', patience: 60, tipChance: 0.2, tip: 5, orders: 3 },
  { id: 'critic', name: 'Food Critic', patience: 120, tipChance: 0, tip: 0, review: true },
  { id: 'student', name: 'Broke Student', patience: 50, tipChance: 0.05, tip: 1, cheap: true },
  { id: 'influencer', name: 'Influencer', patience: 40, tipChance: 0.3, tip: 15, viral: true },
  { id: 'cop', name: 'Cop on Break', patience: 30, tipChance: 0.2, tip: 3, heatDown: true },
  { id: 'celebrity', name: 'Celebrity', patience: 35, tipChance: 0.6, tip: 25, viral: true },
];

export const FOOD_UPGRADES = [
  { id: 'grill', name: 'Double Grill', price: 600, desc: 'cook 2 dishes at once' },
  { id: 'fridge', name: 'Big Fridge', price: 500, desc: 'ingredients never spoil' },
  { id: 'awning', name: 'Party Awning', price: 400, desc: '+30% customers in rain' },
  { id: 'speaker', name: 'Truck Speakers', price: 350, desc: '+20% customers, +tips' },
  { id: 'generator', name: 'Quiet Generator', price: 700, desc: 'cook 25% faster' },
  { id: 'wrap', name: 'Full Truck Wrap', price: 900, desc: '+rating, +viral chance' },
  { id: 'app', name: 'Ordering App', price: 1000, desc: 'pre-orders queue while you drive' },
  { id: 'second-truck', name: 'Second Truck', price: 8000, desc: 'passive income $150/day' },
];

export const FOOD_CATERING_GIGS = [
  { id: 'birthday', name: 'Birthday Party', dishes: 10, pay: 200, needRating: 3.5 },
  { id: 'wedding', name: 'Wedding Reception', dishes: 30, pay: 700, needRating: 4.2 },
  { id: 'office', name: 'Office Lunch', dishes: 20, pay: 400, needRating: 3.8 },
  { id: 'festival', name: 'Street Festival', dishes: 50, pay: 1200, needRating: 4.5 },
  { id: 'film', name: 'Film Set Catering', dishes: 25, pay: 550, needRating: 4.0 },
];

export const FOOD_EVENTS = [
  { id: 'inspector', name: 'Health Inspector', text: 'The health inspector walks up with a clipboard.' },
  { id: 'rush', name: 'Lunch Rush', text: 'A crowd descends — the lunch rush is on!' },
  { id: 'rain', name: 'Rain', text: 'Rain drives people to the truck for something warm.' },
  { id: 'rival', name: 'Rival Truck', text: 'A rival truck parks across the street.' },
  { id: 'viral', name: 'Viral Post', text: 'Someone posts your truck — the line doubles!' },
  { id: 'shortage', name: 'Shortage', text: 'The supplier is out of your main ingredient.' },
  { id: 'power', name: 'Power Cut', text: 'The generator sputters and dies mid-service.' },
  { id: 'rat', name: 'Rat Sighting', text: 'A rat darts past the truck. Customers notice.' },
];

export const FOOD_RANKS = [
  { rank: 0, name: 'Street Vendor', dishesNeeded: 0, payMult: 1.0 },
  { rank: 1, name: 'Line Cook', dishesNeeded: 25, payMult: 1.1 },
  { rank: 2, name: 'Truck Chef', dishesNeeded: 75, payMult: 1.25 },
  { rank: 3, name: 'Celebrity Chef', dishesNeeded: 200, payMult: 1.5 },
  { rank: 4, name: 'Solara Food Legend', dishesNeeded: 400, payMult: 1.8 },
];

export function foodRankFor(dishesServed) {
  let rank = 0;
  for (let i = 0; i < FOOD_RANKS.length; i++) {
    if (dishesServed >= FOOD_RANKS[i].dishesNeeded) rank = i;
  }
  return rank;
}

export function createFoodTruckSystem(deps = {}) {
  const rng = deps.rng || Math.random;
  const getCash = deps.getCash || (() => 0);
  const addCash = deps.addCash || (() => {});
  const addHeat = deps.addHeat || (() => {});
  const log = deps.log || (() => {});
  const getDay = deps.getDay || (() => 1);
  const getHour = deps.getHour || (() => 12);
  const getPlayerPos = deps.getPlayerPos || (() => ({ x: 0, z: 0 }));

  const state = {
    owned: false,
    truckName: 'Taco Thunder',
    rank: 0,
    dishesServed: 0,
    dishesBurned: 0,
    totalEarned: 0,
    tipsEarned: 0,
    rating: 3.5,
    ratingCount: 8,
    inventory: {},
    menu: ['taco', 'burrito', 'fries', 'hotdog'],
    signature: null,
    spot: null,
    parked: false,
    cooking: [], // { dishId, timeLeft, quality, customerId }
    queue: [], // waiting customers { id, type, dishId, patience, ordersLeft }
    nextCustomerIn: 15,
    upgrades: [],
    catering: null, // { gigId, dishesLeft, pay }
    cateringDone: 0,
    reviews: [],
    viralCount: 0,
    inspectorVisits: 0,
    violations: 0,
    healthScore: 100,
    spoiled: 0,
    rushActive: false,
    rushLeft: 0,
    customersServed: 0,
    bestDay: 0,
    dayEarned: 0,
    eventsSeen: {},
    rivalActive: false,
    generatorBroken: false,
    lastSpotDay: 0,
    perfectDishes: 0,
    refunds: 0,
    loyaltyCards: 0,
  };

  function rankInfo() { return FOOD_RANKS[state.rank]; }
  function hasUpgrade(id) { return state.upgrades.includes(id); }
  function cookSpeed() {
    let s = 1;
    if (hasUpgrade('generator')) s *= 1.25;
    if (state.generatorBroken) s *= 0.5;
    return s;
  }
  function cookSlots() {
    return hasUpgrade('grill') ? 2 : 1;
  }
  function spotInfo() {
    return FOOD_TRUCK_SPOTS.find((s) => s.id === state.spot) || null;
  }
  function demandAt(hour) {
    const spot = spotInfo();
    if (!spot) return 0;
    if (hour >= 11 && hour < 14) return spot.lunch;
    if (hour >= 17 && hour < 21) return spot.dinner;
    if (hour >= 21 || hour < 2) return spot.night;
    return 0.3;
  }
  function dishQuality(skill) {
    const base = 0.6 + state.rank * 0.07 + skill * 0.03;
    const roll = rng();
    if (roll < base * 0.25) return 'perfect';
    if (roll < base) return 'good';
    if (roll < base + 0.15) return 'okay';
    return 'burnt';
  }

  function buyTruck() {
    if (state.owned) return { ok: false, reason: 'already-owned' };
    const price = 2500;
    if (getCash() < price) return { ok: false, reason: 'no-cash', need: price };
    addCash(-price);
    state.owned = true;
    state.inventory = { tortilla: 20, meat: 20, salsa: 20, bun: 10, cheese: 10 };
    log(`Bought the Taco Thunder food truck for $${price}! Stocked with starter ingredients.`);
    return { ok: true, price };
  }

  function buyIngredient(ingId, bulk = false) {
    const ing = FOOD_INGREDIENTS.find((i) => i.id === ingId);
    if (!ing) return { ok: false, reason: 'no-such-ingredient' };
    const qty = bulk ? ing.bulk : 1;
    const price = bulk ? ing.bulkPrice : ing.price;
    if (getCash() < price) return { ok: false, reason: 'no-cash', need: price };
    addCash(-price);
    state.inventory[ingId] = (state.inventory[ingId] || 0) + qty;
    log(`Bought ${qty}x ${ing.name} for $${price}.`);
    return { ok: true, ingredient: ingId, qty, price };
  }

  function parkAt(spotId) {
    if (!state.owned) return { ok: false, reason: 'no-truck' };
    const spot = FOOD_TRUCK_SPOTS.find((s) => s.id === spotId);
    if (!spot) return { ok: false, reason: 'no-such-spot' };
    const p = getPlayerPos();
    if (Math.hypot(spot.x - p.x, spot.z - p.z) > 25) {
      return { ok: false, reason: 'not-at-spot', spot: spot.name };
    }
    if (getCash() < spot.rent) return { ok: false, reason: 'no-cash', need: spot.rent };
    addCash(-spot.rent);
    state.spot = spotId;
    state.parked = true;
    state.lastSpotDay = getDay();
    state.nextCustomerIn = 8;
    log(`Parked at ${spot.name} — pitch fee $${spot.rent}. Open for business!`);
    return { ok: true, spot: spotId, rent: spot.rent };
  }

  function closeTruck() {
    if (!state.parked) return { ok: false, reason: 'not-parked' };
    const earned = state.dayEarned;
    if (earned > state.bestDay) state.bestDay = earned;
    state.dayEarned = 0;
    state.parked = false;
    state.spot = null;
    state.queue = [];
    state.cooking = [];
    state.rushActive = false;
    log(`Truck closed. Today's take: $${earned}.`);
    return { ok: true, earned };
  }

  function addMenuItem(dishId) {
    const dish = FOOD_MENU.find((d) => d.id === dishId);
    if (!dish) return { ok: false, reason: 'no-such-dish' };
    if (state.menu.includes(dishId)) return { ok: false, reason: 'already-on-menu' };
    if (dish.skill > state.rank + 1) return { ok: false, reason: 'skill-too-low', need: dish.skill };
    state.menu.push(dishId);
    log(`Added ${dish.name} to the menu.`);
    return { ok: true, dish: dishId };
  }

  function removeMenuItem(dishId) {
    if (!state.menu.includes(dishId)) return { ok: false, reason: 'not-on-menu' };
    if (state.menu.length <= 1) return { ok: false, reason: 'menu-too-small' };
    state.menu = state.menu.filter((d) => d !== dishId);
    log(`Removed ${dishId} from the menu.`);
    return { ok: true, dish: dishId };
  }

  function setSignature(dishId) {
    const dish = FOOD_MENU.find((d) => d.id === dishId);
    if (!dish) return { ok: false, reason: 'no-such-dish' };
    if (!state.menu.includes(dishId)) return { ok: false, reason: 'not-on-menu' };
    if (state.dishesServed < 50) return { ok: false, reason: 'need-50-dishes', have: state.dishesServed };
    state.signature = dishId;
    log(`Signature dish set: ${dish.name}! Customers come from across the city for it.`);
    return { ok: true, signature: dishId };
  }

  function findDish(dishId) {
    return FOOD_MENU.find((d) => d.id === dishId) || FOOD_SECRET_MENU.find((d) => d.id === dishId);
  }
  function canCook(dishId) {
    const dish = findDish(dishId);
    if (!dish) return { ok: false, reason: 'no-such-dish' };
    for (const [ing, qty] of Object.entries(dish.ingredients)) {
      if ((state.inventory[ing] || 0) < qty) return { ok: false, reason: 'missing-ingredient', ingredient: ing };
    }
    return { ok: true, dish };
  }

  function startCooking(dishId, customerId = null) {
    if (!state.parked) return { ok: false, reason: 'not-parked' };
    if (state.cooking.length >= cookSlots()) return { ok: false, reason: 'grill-full' };
    const check = canCook(dishId);
    if (!check.ok) return check;
    const dish = check.dish;
    for (const [ing, qty] of Object.entries(dish.ingredients)) {
      state.inventory[ing] -= qty;
    }
    const quality = dishQuality(dish.skill);
    state.cooking.push({ dishId, timeLeft: dish.cookTime / cookSpeed(), quality, customerId, startedDay: getDay() });
    log(`Cooking ${dish.name}... (${dish.cookTime}s)`);
    return { ok: true, dish: dishId, quality };
  }

  function serveDish(customerId) {
    const cooking = state.cooking.find((c) => c.customerId === customerId);
    if (!cooking) {
      // No customer: sell a fresh dish off the grill to the next in line.
      const ready = state.cooking.find((c) => c.timeLeft <= 0);
      if (!ready) return { ok: false, reason: 'nothing-ready' };
      return finishDish(ready, null);
    }
    if (cooking.timeLeft > 0) return { ok: false, reason: 'not-ready', seconds: Math.ceil(cooking.timeLeft) };
    return finishDish(cooking, customerId);
  }

  function finishDish(cooking, customerId) {
    state.cooking = state.cooking.filter((c) => c !== cooking);
    const dish = findDish(cooking.dishId);
    const customer = customerId ? state.queue.find((q) => q.id === customerId) : null;
    if (cooking.quality === 'burnt') {
      state.dishesBurned += 1;
      state.rating = Math.max(1, state.rating - 0.08);
      if (customer) {
        state.queue = state.queue.filter((q) => q.id !== customerId);
        state.refunds += 1;
        log(`Burnt ${dish.name} served — ${customer.type} walks out and demands a refund. Rating drops.`);
      } else {
        log(`Burnt the ${dish.name}. Straight in the bin.`);
      }
      return { ok: true, quality: 'burnt', paid: 0 };
    }
    const mult = rankInfo().payMult * (cooking.quality === 'perfect' ? 1.5 : 1) * (state.signature === dish.id ? 1.3 : 1);
    let price = Math.round(dish.price * mult);
    let tip = 0;
    if (customer) {
      const type = FOOD_CUSTOMER_TYPES.find((t) => t.id === customer.type);
      if (type && rng() < type.tipChance * (cooking.quality === 'perfect' ? 2 : 1)) {
        tip = type.tip;
      }
      if (type && type.review) {
        const score = cooking.quality === 'perfect' ? 5 : cooking.quality === 'good' ? 4 : 3;
        state.reviews.push({ score, day: getDay(), dish: dish.id });
        state.rating = (state.rating * state.ratingCount + score) / (state.ratingCount + 1);
        state.ratingCount += 1;
        log(`Food critic reviews your ${dish.name}: ${score}/5 stars!`);
      }
      if (type && type.viral) {
        state.viralCount += 1;
        state.nextCustomerIn = 2;
        log(`${type.name} posts your truck — the line doubles!`);
      }
      if (type && type.heatDown) {
        addHeat(-5);
      }
      customer.ordersLeft -= 1;
      if (customer.ordersLeft <= 0) {
        state.queue = state.queue.filter((q) => q.id !== customerId);
        state.customersServed += 1;
      }
    }
    addCash(price + tip);
    state.totalEarned += price + tip;
    state.dayEarned += price + tip;
    state.tipsEarned += tip;
    state.dishesServed += 1;
    if (cooking.quality === 'perfect') {
      state.perfectDishes += 1;
      state.rating = Math.min(5, state.rating + 0.02);
    }
    const newRank = foodRankFor(state.dishesServed);
    let promoted = false;
    if (newRank > state.rank) {
      state.rank = newRank;
      promoted = true;
      log(`PROMOTED to ${FOOD_RANKS[newRank].name}! Prices x${FOOD_RANKS[newRank].payMult}.`);
    }
    log(`Served ${dish.name} (${cooking.quality}) — $${price}${tip ? ` + $${tip} tip` : ''}.`);
    return { ok: true, quality: cooking.quality, paid: price + tip, price, tip, promoted };
  }

  function spawnCustomer() {
    const type = FOOD_CUSTOMER_TYPES[Math.floor(rng() * FOOD_CUSTOMER_TYPES.length)];
    let dishId = state.menu[Math.floor(rng() * state.menu.length)];
    if (type.cheap) {
      const cheap = state.menu
        .map((id) => FOOD_MENU.find((d) => d.id === id))
        .sort((a, b) => a.price - b.price)[0];
      if (cheap) dishId = cheap.id;
    }
    if (state.signature && rng() < 0.35) dishId = state.signature;
    const orders = type.orders || 1;
    const customer = {
      id: `cust-${getDay()}-${state.customersServed + state.queue.length + 1}`,
      type: type.id,
      typeName: type.name,
      dishId,
      patience: type.patience * (hasUpgrade('speaker') ? 1.2 : 1),
      ordersLeft: orders,
      ordersTotal: orders,
    };
    state.queue.push(customer);
    return customer;
  }

  function buyUpgrade(upId) {
    const up = FOOD_UPGRADES.find((u) => u.id === upId);
    if (!up) return { ok: false, reason: 'no-such-upgrade' };
    if (hasUpgrade(upId)) return { ok: false, reason: 'already-owned' };
    if (!state.owned) return { ok: false, reason: 'no-truck' };
    if (getCash() < up.price) return { ok: false, reason: 'no-cash', need: up.price };
    addCash(-up.price);
    state.upgrades.push(upId);
    log(`Truck upgrade: ${up.name} for $${up.price}. ${up.desc}.`);
    return { ok: true, upgrade: upId, price: up.price };
  }

  function takeCatering(gigId) {
    const gig = FOOD_CATERING_GIGS.find((g) => g.id === gigId);
    if (!gig) return { ok: false, reason: 'no-such-gig' };
    if (state.catering) return { ok: false, reason: 'gig-active' };
    if (state.rating < gig.needRating) return { ok: false, reason: 'rating-too-low', need: gig.needRating };
    if (!state.owned) return { ok: false, reason: 'no-truck' };
    state.catering = { gigId, gigName: gig.name, dishesLeft: gig.dishes, pay: gig.pay, startedDay: getDay() };
    log(`Catering booked: ${gig.name} — ${gig.dishes} dishes for $${gig.pay}.`);
    return { ok: true, gig: { ...state.catering } };
  }

  function deliverCateringDish(dishId) {
    if (!state.catering) return { ok: false, reason: 'no-gig' };
    const check = canCook(dishId);
    if (!check.ok) return check;
    const dish = check.dish;
    for (const [ing, qty] of Object.entries(dish.ingredients)) {
      state.inventory[ing] -= qty;
    }
    state.catering.dishesLeft -= 1;
    state.dishesServed += 1;
    if (state.catering.dishesLeft <= 0) {
      const pay = state.catering.pay;
      const name = state.catering.gigName;
      state.catering = null;
      state.cateringDone += 1;
      addCash(pay);
      state.totalEarned += pay;
      state.dayEarned += pay;
      state.rating = Math.min(5, state.rating + 0.1);
      log(`Catering complete: ${name}! Paid $${pay}. Rating up.`);
      return { ok: true, done: true, pay, gig: name };
    }
    return { ok: true, done: false, dishesLeft: state.catering.dishesLeft };
  }

  function fixGenerator() {
    if (!state.generatorBroken) return { ok: false, reason: 'generator-fine' };
    const cost = 120;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.generatorBroken = false;
    log(`Generator repaired for $${cost}. Back to full cooking speed.`);
    return { ok: true, cost };
  }

  function passInspection() {
    const score = state.healthScore;
    state.inspectorVisits += 1;
    if (score >= 80) {
      state.rating = Math.min(5, state.rating + 0.1);
      log(`Health inspection passed with ${score}/100! Rating up.`);
      return { ok: true, passed: true, score };
    }
    state.violations += 1;
    const fine = 150;
    addCash(-Math.min(getCash(), fine));
    state.rating = Math.max(1, state.rating - 0.3);
    log(`Health inspection FAILED (${score}/100)! Fine $${fine}, rating drops. Clean up the truck!`);
    return { ok: true, passed: false, score, fine };
  }

  function cleanTruck() {
    const cost = 40;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.healthScore = 100;
    log('Truck deep-cleaned for $40. Health score back to 100.');
    return { ok: true, cost };
  }

  function tick(dt) {
    if (!state.owned) return;
    // Ingredients spoil slowly unless the big fridge is installed.
    if (!hasUpgrade('fridge') && rng() < dt * 0.005) {
      const keys = Object.keys(state.inventory).filter((k) => state.inventory[k] > 0);
      if (keys.length > 0) {
        const key = keys[Math.floor(rng() * keys.length)];
        state.inventory[key] -= 1;
        state.spoiled += 1;
        state.healthScore = Math.max(0, state.healthScore - 1);
      }
    }
    if (!state.parked) return;
    // Cooking progresses; a finished dish waits to be served.
    for (const c of state.cooking) {
      c.timeLeft -= dt;
    }
    // Customers arrive based on spot demand, rush and viral buzz.
    const demand = demandAt(getHour());
    let interval = 30 / Math.max(0.2, demand);
    if (state.rushActive) interval *= 0.4;
    if (state.viralCount > 0) interval *= 0.6;
    if (state.rivalActive) interval *= 1.5;
    state.nextCustomerIn -= dt;
    if (state.nextCustomerIn <= 0) {
      state.nextCustomerIn = interval * (0.7 + rng() * 0.6);
      if (state.queue.length < 6) {
        const cust = spawnCustomer();
        const dishName = findDish(cust.dishId)?.name || cust.dishId;
        log(`${cust.typeName} wants a ${dishName}.`);
      }
    }
    // Waiting customers lose patience and leave.
    for (const q of [...state.queue]) {
      q.patience -= dt;
      if (q.patience <= 0) {
        state.queue = state.queue.filter((x) => x !== q);
        state.rating = Math.max(1, state.rating - 0.05);
        log(`${q.typeName} got tired of waiting and left. Rating dips.`);
      }
    }
    // Rush hour: 11:30–13:30 and 18:00–20:00 at the right spots.
    const hour = getHour();
    const inRush = (hour >= 11.5 && hour < 13.5) || (hour >= 18 && hour < 20);
    if (inRush && !state.rushActive && demand >= 0.7) {
      state.rushActive = true;
      state.rushLeft = 120;
      log('LUNCH RUSH! The line is out the door!');
    }
    if (state.rushActive) {
      state.rushLeft -= dt;
      if (state.rushLeft <= 0) {
        state.rushActive = false;
        log('The rush is over. The truck breathes again.');
      }
    }
    // Random truck events, rare.
    if (rng() < dt * 0.003) {
      const ev = FOOD_EVENTS[Math.floor(rng() * FOOD_EVENTS.length)];
      state.eventsSeen[ev.id] = (state.eventsSeen[ev.id] || 0) + 1;
      switch (ev.id) {
        case 'inspector':
          passInspection();
          break;
        case 'rush':
          state.rushActive = true;
          state.rushLeft = 90;
          log('A crowd descends — the lunch rush is on!');
          break;
        case 'rain':
          if (hasUpgrade('awning')) {
            state.nextCustomerIn = 3;
            log('Rain drives people to your awning-covered truck!');
          } else {
            state.nextCustomerIn += 20;
            log('Rain scatters the lunch crowd.');
          }
          break;
        case 'rival':
          state.rivalActive = true;
          log('A rival truck parks across the street and steals your crowd.');
          break;
        case 'viral':
          state.viralCount += 1;
          state.nextCustomerIn = 2;
          log('Someone posts your truck — the line doubles!');
          break;
        case 'shortage': {
          const keys = Object.keys(state.inventory);
          if (keys.length > 0) {
            const key = keys[Math.floor(rng() * keys.length)];
            state.inventory[key] = 0;
            log(`Supplier shortage: you are out of ${key}!`);
          }
          break;
        }
        case 'power':
          state.generatorBroken = true;
          log('The generator sputters and dies mid-service! Cooking is slow until repaired.');
          break;
        case 'rat':
          state.healthScore = Math.max(0, state.healthScore - 15);
          state.rating = Math.max(1, state.rating - 0.1);
          log('A rat darts past the truck. Customers notice. Health score -15.');
          break;
        default:
          log(`Truck: ${ev.text}`);
          break;
      }
    }
  }

  function tickDay(day) {
    if (!state.owned) return { day, owned: false };
    // Overnight: rival leaves, viral buzz fades, health score recovers a bit.
    state.rivalActive = false;
    state.viralCount = Math.max(0, state.viralCount - 1);
    state.healthScore = Math.min(100, state.healthScore + 5);
    state.dayEarned = 0;
    if (hasUpgrade('second-truck')) {
      addCash(150);
      state.totalEarned += 150;
      log('Second truck paid out $150 in passive income.');
    }
    if (state.catering && day - state.catering.startedDay >= 2) {
      log(`Catering gig ${state.catering.gigName} expired — the client found another truck.`);
      state.catering = null;
    }
    return { day, rating: Number(state.rating.toFixed(1)), dishesServed: state.dishesServed };
  }

  function interact() {
    const p = getPlayerPos();
    if (!state.owned) return false;
    // At a spot: park, or serve the next customer.
    if (!state.parked) {
      const spot = FOOD_TRUCK_SPOTS.find((s) => Math.hypot(s.x - p.x, s.z - p.z) < 25);
      if (spot) return parkAt(spot.id).ok;
      return false;
    }
    // Parked: cook the first waiting customer's dish, then serve it.
    if (state.queue.length > 0) {
      const cust = state.queue[0];
      const cooking = state.cooking.find((c) => c.customerId === cust.id);
      if (!cooking) {
        const res = startCooking(cust.dishId, cust.id);
        return res.ok || res.reason === 'grill-full';
      }
      if (cooking.timeLeft > 0) return true;
      return serveDish(cust.id).ok;
    }
    // No customers: cook a taco for the walk-up crowd.
    const res = startCooking('taco');
    return res.ok || res.reason === 'grill-full';
  }

  function hudLine() {
    if (!state.owned) return '';
    if (state.parked) {
      const spot = spotInfo();
      const waiting = state.queue.length;
      const cooking = state.cooking.length;
      return `TRUCK ${spot ? spot.name : ''} · queue ${waiting} · cooking ${cooking} · ★${state.rating.toFixed(1)} · $${state.dayEarned} today`;
    }
    if (state.catering) return `CATERING ${state.catering.gigName} — ${state.catering.dishesLeft} dishes left`;
    return 'TRUCK parked? Find a pitch (Central, Marina, Campus...)';
  }

  function stats() {
    return {
      owned: state.owned,
      truckName: state.truckName,
      rank: FOOD_RANKS[state.rank].name,
      rankIndex: state.rank,
      dishesServed: state.dishesServed,
      dishesBurned: state.dishesBurned,
      perfectDishes: state.perfectDishes,
      totalEarned: state.totalEarned,
      tipsEarned: state.tipsEarned,
      rating: Number(state.rating.toFixed(1)),
      ratingCount: state.ratingCount,
      menu: [...state.menu],
      signature: state.signature,
      spot: state.spot,
      parked: state.parked,
      queue: state.queue.length,
      cooking: state.cooking.length,
      upgrades: [...state.upgrades],
      catering: state.catering ? state.catering.gigId : null,
      cateringDone: state.cateringDone,
      reviews: state.reviews.length,
      viralCount: state.viralCount,
      inspectorVisits: state.inspectorVisits,
      violations: state.violations,
      healthScore: state.healthScore,
      spoiled: state.spoiled,
      rushActive: state.rushActive,
      customersServed: state.customersServed,
      bestDay: state.bestDay,
      dayEarned: state.dayEarned,
      refunds: state.refunds,
      loyaltyCards: state.loyaltyCards,
      inventory: { ...state.inventory },
      eventsSeen: Object.keys(state.eventsSeen).length,
      loyaltyProgram: !!state.loyaltyProgram,
      festivalsEntered: state.festivalsEntered || 0,
      festivalsWon: state.festivalsWon || 0,
      washes: state.washes || 0,
      staff: { ...(state.staff || {}) },
      special: state.special ? { ...state.special } : null,
    };
  }

  function serialize() {
    return {
      owned: state.owned,
      truckName: state.truckName,
      rank: state.rank,
      dishesServed: state.dishesServed,
      dishesBurned: state.dishesBurned,
      perfectDishes: state.perfectDishes,
      totalEarned: state.totalEarned,
      tipsEarned: state.tipsEarned,
      rating: state.rating,
      ratingCount: state.ratingCount,
      inventory: { ...state.inventory },
      menu: [...state.menu],
      signature: state.signature,
      upgrades: [...state.upgrades],
      cateringDone: state.cateringDone,
      reviews: state.reviews.map((r) => ({ ...r })),
      viralCount: state.viralCount,
      inspectorVisits: state.inspectorVisits,
      violations: state.violations,
      healthScore: state.healthScore,
      spoiled: state.spoiled,
      customersServed: state.customersServed,
      bestDay: state.bestDay,
      refunds: state.refunds,
      loyaltyCards: state.loyaltyCards,
      eventsSeen: { ...state.eventsSeen },
      loyaltyProgram: !!state.loyaltyProgram,
      festivalsEntered: state.festivalsEntered || 0,
      festivalsWon: state.festivalsWon || 0,
      washes: state.washes || 0,
      staff: { ...(state.staff || {}) },
      special: state.special ? { ...state.special } : null,
    };
  }

  function deserialize(d) {
    if (!d) return;
    state.owned = !!d.owned;
    state.truckName = d.truckName || 'Taco Thunder';
    state.rank = d.rank ?? 0;
    state.dishesServed = d.dishesServed ?? 0;
    state.dishesBurned = d.dishesBurned ?? 0;
    state.perfectDishes = d.perfectDishes ?? 0;
    state.totalEarned = d.totalEarned ?? 0;
    state.tipsEarned = d.tipsEarned ?? 0;
    state.rating = d.rating ?? 3.5;
    state.ratingCount = d.ratingCount ?? 8;
    state.inventory = { ...(d.inventory || {}) };
    state.menu = [...(d.menu || ['taco', 'burrito', 'fries', 'hotdog'])];
    state.signature = d.signature ?? null;
    state.upgrades = [...(d.upgrades || [])];
    state.cateringDone = d.cateringDone ?? 0;
    state.reviews = (d.reviews || []).map((r) => ({ ...r }));
    state.viralCount = d.viralCount ?? 0;
    state.inspectorVisits = d.inspectorVisits ?? 0;
    state.violations = d.violations ?? 0;
    state.healthScore = d.healthScore ?? 100;
    state.spoiled = d.spoiled ?? 0;
    state.customersServed = d.customersServed ?? 0;
    state.bestDay = d.bestDay ?? 0;
    state.refunds = d.refunds ?? 0;
    state.loyaltyCards = d.loyaltyCards ?? 0;
    state.eventsSeen = { ...(d.eventsSeen || {}) };
    state.loyaltyProgram = !!d.loyaltyProgram;
    state.festivalsEntered = d.festivalsEntered ?? 0;
    state.festivalsWon = d.festivalsWon ?? 0;
    state.washes = d.washes ?? 0;
    state.staff = { ...(d.staff || {}) };
    state.special = d.special ? { ...d.special } : null;
    state.parked = false;
    state.spot = null;
    state.queue = [];
    state.cooking = [];
    state.catering = null;
    state.rushActive = false;
    state.dayEarned = 0;
  }

  // --- Round 7 top-up: secret menu, loyalty, festivals, truck wash ---
  const FOOD_SECRET_MENU = [
    { id: 'ghost-pepper', name: 'Ghost Pepper Taco', price: 15, cost: 5, cookTime: 10, skill: 3, ingredients: { tortilla: 1, meat: 1, salsa: 2 } },
    { id: 'gold-burger', name: '24K Gold Burger', price: 50, cost: 20, cookTime: 20, skill: 4, ingredients: { bun: 1, meat: 2, cheese: 2, lettuce: 1 } },
    { id: 'mega-burrito', name: 'Mega Burrito Challenge', price: 25, cost: 8, cookTime: 25, skill: 3, ingredients: { tortilla: 2, meat: 3, rice: 2, salsa: 1 } },
  ];
  function unlockSecretDish(dishId) {
    const dish = FOOD_SECRET_MENU.find((d) => d.id === dishId);
    if (!dish) return { ok: false, reason: 'no-such-dish' };
    if (state.dishesServed < 100) return { ok: false, reason: 'need-100-dishes', have: state.dishesServed };
    if (state.menu.includes(dishId)) return { ok: false, reason: 'already-on-menu' };
    state.menu.push(dishId);
    log(`Secret menu unlocked: ${dish.name}! Only the regulars know about it.`);
    return { ok: true, dish: dishId };
  }
  function startLoyaltyProgram() {
    if (state.loyaltyProgram) return { ok: false, reason: 'already-active' };
    const cost = 100;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.loyaltyProgram = true;
    log('Loyalty program started! Every 5th dish is free for regulars — and they keep coming back.');
    return { ok: true, cost };
  }
  function stampLoyaltyCard() {
    if (!state.loyaltyProgram) return { ok: false, reason: 'no-program' };
    state.loyaltyCards += 1;
    if (state.loyaltyCards % 5 === 0) {
      const free = 10;
      addCash(free);
      state.totalEarned += free;
      log(`Loyalty card full! A regular pays it forward — $${free} tip.`);
      return { ok: true, stamps: state.loyaltyCards, free: true, tip: free };
    }
    return { ok: true, stamps: state.loyaltyCards, free: false };
  }
  function washTruck() {
    const cost = 30;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.healthScore = Math.min(100, state.healthScore + 10);
    state.rating = Math.min(5, state.rating + 0.05);
    state.washes = (state.washes || 0) + 1;
    log(`Truck washed for $${cost}. It gleams. Health +10, rating up.`);
    return { ok: true, cost };
  }
  function enterFoodFestival() {
    const entry = 150;
    if (state.rating < 4.0) return { ok: false, reason: 'rating-too-low', need: 4.0 };
    if (getCash() < entry) return { ok: false, reason: 'no-cash', need: entry };
    addCash(-entry);
    state.festivalsEntered = (state.festivalsEntered || 0) + 1;
    const score = state.rating * 20 + state.dishesServed * 0.05 + rng() * 20;
    const field = [70, 85, 95, 110].map((f) => f + rng() * 15);
    const place = field.filter((f) => f > score).length + 1;
    if (place === 1) {
      const prize = 1000;
      addCash(prize);
      state.totalEarned += prize;
      state.festivalsWon = (state.festivalsWon || 0) + 1;
      state.rating = Math.min(5, state.rating + 0.2);
      log(`FOOD FESTIVAL WIN! First place! Prize $${prize}, rating up!`);
      return { ok: true, won: true, place: 1, prize, score: Math.round(score) };
    }
    log(`Food festival: placed ${place} of 5. Score ${Math.round(score)}.`);
    return { ok: true, won: false, place, prize: 0, score: Math.round(score) };
  }
  function hireFoodTruckStaff(role) {
    const roles = { cook: 80, cashier: 50, cleaner: 40 };
    if (!roles[role]) return { ok: false, reason: 'no-such-role' };
    state.staff = state.staff || {};
    if (state.staff[role]) return { ok: false, reason: 'already-hired' };
    state.staff[role] = true;
    log(`Hired a ${role} ($${roles[role]}/day). The truck runs smoother.`);
    return { ok: true, role, wage: roles[role] };
  }
  function fireFoodTruckStaff(role) {
    state.staff = state.staff || {};
    if (!state.staff[role]) return { ok: false, reason: 'not-hired' };
    delete state.staff[role];
    log(`Let go of the ${role}.`);
    return { ok: true, role };
  }
  function foodTruckSpecial() {
    const dish = FOOD_MENU[Math.floor(rng() * FOOD_MENU.length)];
    const price = Math.round(dish.price * 1.5);
    state.special = { dishId: dish.id, price, day: getDay() };
    log(`Today's special: ${dish.name} for $${price}!`);
    return { ok: true, special: { ...state.special } };
  }

  return {
    state,
    tick,
    tickDay,
    interact,
    hudLine,
    stats,
    serialize,
    deserialize,
    buyTruck,
    buyIngredient,
    parkAt,
    closeTruck,
    addMenuItem,
    removeMenuItem,
    setSignature,
    canCook,
    startCooking,
    serveDish,
    finishDish,
    spawnCustomer,
    buyUpgrade,
    takeCatering,
    deliverCateringDish,
    fixGenerator,
    passInspection,
    cleanTruck,
    hasUpgrade,
    rankInfo,
    spotInfo,
    demandAt,
    unlockSecretDish,
    startLoyaltyProgram,
    stampLoyaltyCard,
    washTruck,
    enterFoodFestival,
    hireFoodTruckStaff,
    fireFoodTruckStaff,
    foodTruckSpecial,
  };
}
