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
  { id: 'taco', name: 'Taco', price: 6, cost: 2, cookTime: 8, skill: 1, ingredients: { tortilla: 1, meat: 1, salsa: 1 } },
  { id: 'burrito', name: 'Burrito', price: 10, cost: 4, cookTime: 14, skill: 1, ingredients: { tortilla: 1, meat: 2, rice: 1, salsa: 1 } },
  { id: 'burger', name: 'Burger', price: 12, cost: 5, cookTime: 16, skill: 2, ingredients: { bun: 1, meat: 1, cheese: 1, lettuce: 1 } },
  { id: 'fries', name: 'Loaded Fries', price: 7, cost: 2, cookTime: 10, skill: 1, ingredients: { potato: 2, cheese: 1, salsa: 1 } },
  { id: 'hotdog', name: 'Hot Dog', price: 8, cost: 3, cookTime: 9, skill: 1, ingredients: { bun: 1, meat: 1, salsa: 1 } },
  { id: 'quesadilla', name: 'Quesadilla', price: 9, cost: 3, cookTime: 12, skill: 2, ingredients: { tortilla: 1, cheese: 2, meat: 1 } },
  { id: 'ramen', name: 'Ramen', price: 14, cost: 6, cookTime: 20, skill: 3, ingredients: { noodle: 1, meat: 1, egg: 1, salsa: 1 } },
  { id: 'lobster', name: 'Lobster Roll', price: 22, cost: 10, cookTime: 18, skill: 4, ingredients: { bun: 1, lobster: 1, lettuce: 1 } },
  { id: 'salad', name: 'Garden Salad', price: 9, cost: 3, cookTime: 7, skill: 1, ingredients: { lettuce: 2, tomato: 1, cheese: 1 } },
  { id: 'icecream', name: 'Churro Sundae', price: 8, cost: 3, cookTime: 6, skill: 1, ingredients: { sugar: 1, cheese: 1 } },
];

export const FOOD_INGREDIENTS = [
  { id: 'tortilla', name: 'Tortilla', price: 1, bulk: 20, bulkPrice: 15 },
  { id: 'meat', name: 'Meat', price: 2, bulk: 20, bulkPrice: 30 },
  { id: 'salsa', name: 'Salsa', price: 1, bulk: 20, bulkPrice: 12 },
  { id: 'rice', name: 'Rice', price: 1, bulk: 20, bulkPrice: 10 },
  { id: 'bun', name: 'Bun', price: 1, bulk: 20, bulkPrice: 14 },
  { id: 'cheese', name: 'Cheese', price: 2, bulk: 20, bulkPrice: 28 },
  { id: 'lettuce', name: 'Lettuce', price: 1, bulk: 20, bulkPrice: 8 },
  { id: 'potato', name: 'Potato', price: 1, bulk: 20, bulkPrice: 10 },
  { id: 'noodle', name: 'Noodle', price: 2, bulk: 20, bulkPrice: 26 },
  { id: 'egg', name: 'Egg', price: 1, bulk: 20, bulkPrice: 12 },
  { id: 'lobster', name: 'Lobster', price: 8, bulk: 10, bulkPrice: 60 },
  { id: 'tomato', name: 'Tomato', price: 1, bulk: 20, bulkPrice: 10 },
  { id: 'sugar', name: 'Sugar', price: 2, bulk: 20, bulkPrice: 24 },
];

export const FOOD_CUSTOMER_TYPES = [
  { id: 'hungry', name: 'Hungry Local', patience: 45, tipChance: 0.1, tip: 2 },
  { id: 'foodie', name: 'Foodie', patience: 90, tipChance: 0.5, tip: 8, wantsQuality: true },
  { id: 'family', name: 'Family', patience: 60, tipChance: 0.2, tip: 5, orders: 3 },
  { id: 'critic', name: 'Food Critic', patience: 120, tipChance: 0, tip: 0, review: true },
  { id: 'student', name: 'Student', patience: 50, tipChance: 0.05, tip: 1, cheap: true },
  { id: 'influencer', name: 'Influencer', patience: 40, tipChance: 0.3, tip: 15, viral: true },
  { id: 'cop', name: 'Cop', patience: 30, tipChance: 0.2, tip: 3, heatDown: true },
  { id: 'celebrity', name: 'Celebrity', patience: 35, tipChance: 0.6, tip: 25, viral: true },
];

export const FOOD_UPGRADES = [
  { id: 'grill', name: 'Double Grill', price: 600, desc: 'Cook 2 dishes at once.' },
  { id: 'fridge', name: 'Big Fridge', price: 500, desc: 'Ingredients never spoil.' },
  { id: 'awning', name: 'Rain Awning', price: 400, desc: 'Plus 30 percent customers in rain.' },
  { id: 'speaker', name: 'Speaker System', price: 350, desc: 'Plus 20 percent customers and tips.' },
  { id: 'generator', name: 'Generator', price: 700, desc: 'Cook 25 percent faster.' },
  { id: 'wrap', name: 'Truck Wrap', price: 900, desc: 'Plus rating and viral chance.' },
  { id: 'app', name: 'Ordering App', price: 1000, desc: 'Pre-orders queue while driving.' },
  { id: 'second-truck', name: 'Second Truck', price: 8000, desc: 'Passive income 150 dollars per day.' },
];

export const FOOD_CATERING_GIGS = [
  { id: 'birthday', name: 'Birthday Party', dishes: 10, pay: 200, needRating: 3.5 },
  { id: 'wedding', name: 'Wedding', dishes: 30, pay: 700, needRating: 4.2 },
  { id: 'office', name: 'Office Lunch', dishes: 20, pay: 400, needRating: 3.8 },
  { id: 'festival', name: 'Festival', dishes: 50, pay: 1200, needRating: 4.5 },
  { id: 'film', name: 'Film Set', dishes: 25, pay: 550, needRating: 4.0 },
];

export const FOOD_EVENTS = [
  { id: 'inspector', name: 'Health Inspector', text: 'An inspector walks up to the truck.' },
  { id: 'rush', name: 'Rush Hour', text: 'A crowd floods the street.' },
  { id: 'rain', name: 'Rain', text: 'Rain starts falling.' },
  { id: 'rival', name: 'Rival Truck', text: 'A rival truck parks nearby.' },
  { id: 'viral', name: 'Viral Post', text: 'Someone posts your food online.' },
  { id: 'shortage', name: 'Shortage', text: 'A supplier runs out.' },
  { id: 'power', name: 'Power Cut', text: 'The generator sputters.' },
  { id: 'rat', name: 'Rat', text: 'A rat is spotted near the truck.' },
];

export const FOOD_RANKS = [
  { rank: 0, name: 'Street Vendor', dishesNeeded: 0, payMult: 1.0 },
  { rank: 1, name: 'Line Cook', dishesNeeded: 25, payMult: 1.1 },
  { rank: 2, name: 'Truck Chef', dishesNeeded: 75, payMult: 1.25 },
  { rank: 3, name: 'Celebrity Chef', dishesNeeded: 200, payMult: 1.5 },
  { rank: 4, name: 'Solara Food Legend', dishesNeeded: 400, payMult: 1.8 },
];

const SECRET_MENU = [
  { id: 'ghost-taco', name: 'Ghost Pepper Taco', price: 15, cost: 5, cookTime: 10, skill: 3, ingredients: { tortilla: 1, meat: 1, salsa: 2 } },
  { id: 'gold-burger', name: 'Gold Burger', price: 50, cost: 20, cookTime: 20, skill: 4, ingredients: { bun: 1, meat: 2, cheese: 2, lettuce: 1 } },
  { id: 'mega-burrito', name: 'Mega Burrito Challenge', price: 25, cost: 8, cookTime: 25, skill: 3, ingredients: { tortilla: 2, meat: 3, rice: 2, salsa: 1 } },
];

const STAFF_WAGES = { cook: 80, cashier: 50, cleaner: 40 };

export function foodRankFor(dishesServed) {
  let out = 0;
  for (const r of FOOD_RANKS) if (dishesServed >= r.dishesNeeded) out = r.rank;
  return out;
}

function dishById(id) {
  for (const m of FOOD_MENU) if (m.id === id) return m;
  return null;
}

function spotById(id) {
  for (const s of FOOD_TRUCK_SPOTS) if (s.id === id) return s;
  return null;
}

export function createFoodTruckSystem(deps) {
  const d = deps || {};
  const rnd = typeof d.rng === 'function' ? d.rng : Math.random;
  const cashOf = typeof d.getCash === 'function' ? d.getCash : () => 0;
  const moveCash = typeof d.addCash === 'function' ? d.addCash : () => {};
  const pushHeat = typeof d.addHeat === 'function' ? d.addHeat : () => {};
  const say = typeof d.log === 'function' ? d.log : () => {};
  const dayOf = typeof d.getDay === 'function' ? d.getDay : () => 1;
  const hourOf = typeof d.getHour === 'function' ? d.getHour : () => 12;
  const posOf = typeof d.getPlayerPos === 'function' ? d.getPlayerPos : () => ({ x: 0, z: 0 });

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
    cooking: [],
    queue: [],
    nextCustomerIn: 15,
    upgrades: [],
    catering: null,
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
    loyaltyProgram: false,
    loyaltyStamps: 0,
    festivalsEntered: 0,
    festivalsWon: 0,
    washes: 0,
    staff: {},
    special: null,
  };

  function rankInfo() {
    return FOOD_RANKS[state.rank] || FOOD_RANKS[0];
  }

  function hasUpgrade(id) {
    return state.upgrades.includes(id);
  }

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
    return state.spot ? spotById(state.spot) : null;
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
    const roll = rnd();
    if (roll < base * 0.25) return 'perfect';
    if (roll < base) return 'good';
    if (roll < base + 0.15) return 'okay';
    return 'burnt';
  }

  function findDish(dishId) {
    const main = dishById(dishId);
    if (main) return main;
    for (const s of SECRET_MENU) if (s.id === dishId) return s;
    return undefined;
  }

  function canCook(dishId) {
    const dish = findDish(dishId);
    if (!dish) return { ok: false, reason: 'unknown-dish' };
    for (const ing of Object.keys(dish.ingredients)) {
      if ((state.inventory[ing] || 0) < dish.ingredients[ing]) return { ok: false, reason: 'missing-ingredient', ingredient: ing };
    }
    return { ok: true, dish };
  }

  function buyTruck() {
    if (state.owned) return { ok: false, reason: 'already-owned' };
    if (cashOf() < 2500) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-2500);
    state.owned = true;
    state.inventory = { tortilla: 20, meat: 20, salsa: 20, bun: 10, cheese: 10 };
    say('Bought the Taco Thunder food truck.');
    return { ok: true, price: 2500 };
  }

  function buyIngredient(ingredientId, bulk) {
    const ing = FOOD_INGREDIENTS.find((i) => i.id === ingredientId);
    if (!ing) return { ok: false, reason: 'unknown-ingredient' };
    const isBulk = !!bulk;
    const price = isBulk ? ing.bulkPrice : ing.price;
    const qty = isBulk ? ing.bulk : 1;
    if (cashOf() < price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-price);
    state.inventory[ingredientId] = (state.inventory[ingredientId] || 0) + qty;
    return { ok: true, ingredientId, quantity: qty, price };
  }

  function parkAt(spotId) {
    if (!state.owned) return { ok: false, reason: 'no-truck' };
    const spot = spotById(spotId);
    if (!spot) return { ok: false, reason: 'unknown-spot' };
    const pos = posOf();
    if (Math.hypot(pos.x - spot.x, pos.z - spot.z) > 25) return { ok: false, reason: 'too-far' };
    if (cashOf() < spot.rent) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-spot.rent);
    state.spot = spotId;
    state.parked = true;
    state.lastSpotDay = dayOf();
    state.nextCustomerIn = 8;
    say('Parked at ' + spot.name + '.');
    return { ok: true, spotId, rent: spot.rent };
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
    state.rushLeft = 0;
    return { ok: true, earned };
  }

  function addMenuItem(dishId) {
    const dish = dishById(dishId);
    if (!dish) return { ok: false, reason: 'unknown-dish' };
    if (state.menu.includes(dishId)) return { ok: false, reason: 'already-on-menu' };
    if (dish.skill > state.rank + 1) return { ok: false, reason: 'skill-too-high' };
    state.menu.push(dishId);
    return { ok: true, dishId };
  }

  function removeMenuItem(dishId) {
    if (!state.menu.includes(dishId)) return { ok: false, reason: 'not-on-menu' };
    if (state.menu.length <= 1) return { ok: false, reason: 'menu-too-small' };
    state.menu = state.menu.filter((m) => m !== dishId);
    return { ok: true, dishId };
  }

  function setSignature(dishId) {
    const dish = dishById(dishId);
    if (!dish) return { ok: false, reason: 'unknown-dish' };
    if (!state.menu.includes(dishId)) return { ok: false, reason: 'not-on-menu' };
    if (state.dishesServed < 50) return { ok: false, reason: 'not-enough-dishes' };
    state.signature = dishId;
    return { ok: true, signatureId: dishId };
  }

  function startCooking(dishId, customerId) {
    if (!state.parked) return { ok: false, reason: 'not-parked' };
    if (state.cooking.length >= cookSlots()) return { ok: false, reason: 'grill-full' };
    const check = canCook(dishId);
    if (!check.ok) return check;
    const dish = check.dish;
    for (const ing of Object.keys(dish.ingredients)) {
      state.inventory[ing] -= dish.ingredients[ing];
      if (state.inventory[ing] <= 0) delete state.inventory[ing];
    }
    const quality = dishQuality(dish.skill);
    state.cooking.push({ dishId, timeLeft: dish.cookTime / cookSpeed(), quality, customerId: customerId || null, startedDay: dayOf() });
    return { ok: true, dishId, quality };
  }

  function finishDish(record) {
    state.cooking = state.cooking.filter((c) => c !== record);
    const dish = findDish(record.dishId);
    const customer = record.customerId ? state.queue.find((c) => c.id === record.customerId) : null;
    if (record.quality === 'burnt') {
      state.dishesBurned += 1;
      state.rating = Math.max(1, state.rating - 0.08);
      state.refunds += 1;
      if (customer) state.queue = state.queue.filter((c) => c.id !== customer.id);
      return { ok: true, quality: 'burnt', paid: 0 };
    }
    let mult = rankInfo().payMult;
    if (record.quality === 'perfect') mult *= 1.5;
    if (state.signature === record.dishId) mult *= 1.3;
    const price = Math.round(dish.price * mult);
    let tip = 0;
    if (customer) {
      const type = FOOD_CUSTOMER_TYPES.find((t) => t.id === customer.typeId);
      let chance = type ? type.tipChance : 0;
      if (record.quality === 'perfect') chance *= 2;
      if (rnd() < chance) tip = type ? type.tip : 0;
    }
    const paid = price + tip;
    moveCash(paid);
    state.totalEarned += paid;
    state.dayEarned += paid;
    state.tipsEarned += tip;
    state.dishesServed += 1;
    if (record.quality === 'perfect') {
      state.perfectDishes += 1;
      state.rating = Math.min(5, state.rating + 0.02);
    }
    if (customer) {
      const type = FOOD_CUSTOMER_TYPES.find((t) => t.id === customer.typeId);
      if (type && type.review) {
        const score = record.quality === 'perfect' ? 5 : record.quality === 'good' ? 4 : 3;
        state.reviews.push({ score, dishId: record.dishId, day: dayOf() });
        state.rating = Math.max(1, Math.min(5, state.rating + (score - state.rating) * 0.1));
        state.ratingCount += 1;
      }
      if (type && type.viral) {
        state.viralCount += 1;
        state.nextCustomerIn = Math.min(state.nextCustomerIn, 2);
      }
      if (type && type.heatDown) pushHeat(-5);
      customer.ordersLeft -= 1;
      if (customer.ordersLeft <= 0) {
        state.queue = state.queue.filter((c) => c.id !== customer.id);
        state.customersServed += 1;
      }
    } else {
      state.customersServed += 1;
    }
    const oldRank = state.rank;
    const newRank = foodRankFor(state.dishesServed);
    const promoted = newRank > oldRank;
    if (promoted) state.rank = newRank;
    return { ok: true, quality: record.quality, paid, price, tip, promoted };
  }

  function serveDish(customerId) {
    const record = state.cooking.find((c) => c.customerId === customerId && c.timeLeft <= 0);
    if (record) return finishDish(record);
    const cookingFor = state.cooking.find((c) => c.customerId === customerId);
    if (cookingFor) return { ok: false, reason: 'not-ready', secondsLeft: Math.ceil(cookingFor.timeLeft) };
    const ready = state.cooking.find((c) => c.timeLeft <= 0);
    if (ready) return finishDish(ready);
    return { ok: false, reason: 'nothing-ready' };
  }

  function spawnCustomer() {
    const type = FOOD_CUSTOMER_TYPES[Math.floor(rnd() * FOOD_CUSTOMER_TYPES.length)];
    let dishId;
    if (type.cheap) {
      let cheapest = null;
      for (const id of state.menu) {
        const dish = dishById(id);
        if (dish && (!cheapest || dish.price < cheapest.price)) cheapest = dish;
      }
      dishId = cheapest ? cheapest.id : state.menu[0];
    } else if (state.signature && rnd() < 0.35) {
      dishId = state.signature;
    } else {
      dishId = state.menu[Math.floor(rnd() * state.menu.length)];
    }
    const orders = type.orders || 1;
    const customer = {
      id: 'cust-' + dayOf() + '-' + (state.customersServed + state.queue.length + 1),
      typeId: type.id,
      typeName: type.name,
      dishId,
      patience: type.patience * (hasUpgrade('speaker') ? 1.2 : 1),
      ordersLeft: orders,
      ordersTotal: orders,
    };
    state.queue.push(customer);
    return { ...customer };
  }

  function buyUpgrade(upgradeId) {
    const up = FOOD_UPGRADES.find((u) => u.id === upgradeId);
    if (!up) return { ok: false, reason: 'unknown-upgrade' };
    if (hasUpgrade(upgradeId)) return { ok: false, reason: 'already-owned' };
    if (!state.owned) return { ok: false, reason: 'no-truck' };
    if (cashOf() < up.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-up.price);
    state.upgrades.push(upgradeId);
    return { ok: true, upgradeId, price: up.price };
  }

  function takeCatering(gigId) {
    const gig = FOOD_CATERING_GIGS.find((g) => g.id === gigId);
    if (!gig) return { ok: false, reason: 'unknown-gig' };
    if (state.catering) return { ok: false, reason: 'gig-active' };
    if (state.rating < gig.needRating) return { ok: false, reason: 'rating-too-low' };
    if (!state.owned) return { ok: false, reason: 'no-truck' };
    state.catering = { gigId: gig.id, gigName: gig.name, dishesLeft: gig.dishes, pay: gig.pay, startedDay: dayOf() };
    return { ok: true, gig: { ...state.catering } };
  }

  function deliverCateringDish(dishId) {
    if (!state.catering) return { ok: false, reason: 'no-gig' };
    const check = canCook(dishId);
    if (!check.ok) return check;
    const dish = check.dish;
    for (const ing of Object.keys(dish.ingredients)) {
      state.inventory[ing] -= dish.ingredients[ing];
      if (state.inventory[ing] <= 0) delete state.inventory[ing];
    }
    state.dishesServed += 1;
    state.catering.dishesLeft -= 1;
    if (state.catering.dishesLeft <= 0) {
      const gig = state.catering;
      state.catering = null;
      moveCash(gig.pay);
      state.totalEarned += gig.pay;
      state.dayEarned += gig.pay;
      state.cateringDone += 1;
      state.rating = Math.min(5, state.rating + 0.1);
      return { ok: true, done: true, pay: gig.pay, gigName: gig.name };
    }
    return { ok: true, done: false, dishesLeft: state.catering.dishesLeft };
  }

  function fixGenerator() {
    if (!state.generatorBroken) return { ok: false, reason: 'generator-fine' };
    if (cashOf() < 120) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-120);
    state.generatorBroken = false;
    return { ok: true, cost: 120 };
  }

  function passInspection() {
    state.inspectorVisits += 1;
    if (state.healthScore >= 80) {
      state.rating = Math.min(5, state.rating + 0.1);
      return { ok: true, passed: true, score: state.healthScore };
    }
    state.violations += 1;
    const fine = Math.min(cashOf(), 150);
    moveCash(-fine);
    state.rating = Math.max(1, state.rating - 0.3);
    return { ok: true, passed: false, score: state.healthScore, fine };
  }

  function cleanTruck() {
    if (cashOf() < 40) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-40);
    state.healthScore = 100;
    return { ok: true, cost: 40 };
  }

  function applyFoodEvent(eventId) {
    state.eventsSeen[eventId] = (state.eventsSeen[eventId] || 0) + 1;
    if (eventId === 'inspector') passInspection();
    else if (eventId === 'rush') {
      state.rushActive = true;
      state.rushLeft = 90;
    } else if (eventId === 'rain') {
      if (hasUpgrade('awning')) state.nextCustomerIn = Math.max(1, state.nextCustomerIn - 5);
      else state.nextCustomerIn += 10;
    } else if (eventId === 'rival') {
      state.rivalActive = true;
    } else if (eventId === 'viral') {
      state.viralCount += 1;
      state.nextCustomerIn = 2;
    } else if (eventId === 'shortage') {
      const stocked = Object.keys(state.inventory).filter((k) => state.inventory[k] > 0);
      if (stocked.length > 0) {
        const victim = stocked[Math.floor(rnd() * stocked.length)];
        state.inventory[victim] = 0;
        delete state.inventory[victim];
      }
    } else if (eventId === 'power') {
      state.generatorBroken = true;
    } else if (eventId === 'rat') {
      state.healthScore = Math.max(0, state.healthScore - 15);
      state.rating = Math.max(1, state.rating - 0.1);
    }
    return eventId;
  }

  function tick(dt) {
    if (!state.owned) return;
    const step = dt || 0;
    if (!hasUpgrade('fridge') && rnd() < step * 0.005) {
      const stocked = Object.keys(state.inventory).filter((k) => state.inventory[k] > 0);
      if (stocked.length > 0) {
        const victim = stocked[Math.floor(rnd() * stocked.length)];
        state.inventory[victim] -= 1;
        if (state.inventory[victim] <= 0) delete state.inventory[victim];
        state.spoiled += 1;
        state.healthScore = Math.max(0, state.healthScore - 1);
      }
    }
    if (!state.parked) return;
    for (const c of state.cooking) c.timeLeft -= step;
    const demand = demandAt(hourOf());
    let interval = 30 / Math.max(0.1, demand);
    if (state.rushActive) interval *= 0.4;
    if (state.viralCount > 0) interval *= 0.6;
    if (state.rivalActive) interval *= 1.5;
    state.nextCustomerIn -= step;
    if (state.nextCustomerIn <= 0) {
      state.nextCustomerIn = interval;
      if (state.queue.length < 6) spawnCustomer();
    }
    for (const c of [...state.queue]) {
      c.patience -= step;
      if (c.patience <= 0) {
        state.queue = state.queue.filter((x) => x.id !== c.id);
        state.rating = Math.max(1, state.rating - 0.05);
      }
    }
    const hour = hourOf();
    const inRush = (hour >= 11.5 && hour < 13.5) || (hour >= 18 && hour < 20);
    if (inRush && demand >= 0.7 && !state.rushActive) {
      state.rushActive = true;
      state.rushLeft = 120;
    }
    if (state.rushActive) {
      state.rushLeft -= step;
      if (state.rushLeft <= 0) state.rushActive = false;
    }
    if (rnd() < step * 0.003) {
      const ev = FOOD_EVENTS[Math.floor(rnd() * FOOD_EVENTS.length)];
      applyFoodEvent(ev.id);
    }
  }

  function tickDay(day) {
    const today = day !== undefined && day !== null ? day : dayOf();
    if (!state.owned) return { day: today, owned: false };
    state.rivalActive = false;
    state.viralCount = Math.max(0, state.viralCount - 1);
    state.healthScore = Math.min(100, state.healthScore + 5);
    state.dayEarned = 0;
    if (hasUpgrade('second-truck')) {
      moveCash(150);
      state.totalEarned += 150;
    }
    if (state.catering && today - state.catering.startedDay >= 2) state.catering = null;
    return { day: today, rating: Math.round(state.rating * 10) / 10, dishesServed: state.dishesServed };
  }

  function interact() {
    if (!state.owned) return false;
    if (!state.parked) {
      const pos = posOf();
      for (const spot of FOOD_TRUCK_SPOTS) {
        if (Math.hypot(pos.x - spot.x, pos.z - spot.z) <= 25) {
          parkAt(spot.id);
          return true;
        }
      }
      return false;
    }
    if (state.queue.length > 0) {
      const first = state.queue[0];
      const cooking = state.cooking.find((c) => c.customerId === first.id);
      if (!cooking) {
        const res = startCooking(first.dishId, first.id);
        return res.ok;
      }
      if (cooking.timeLeft <= 0) {
        serveDish(first.id);
        return true;
      }
      return true;
    }
    const res = startCooking('taco', null);
    return res.ok || res.reason === 'grill-full';
  }

  function hudLine() {
    if (!state.owned) return '';
    if (state.parked) {
      const spot = spotInfo();
      return 'TRUCK ' + (spot ? spot.name : '') + ' · queue ' + state.queue.length + ' · cooking ' + state.cooking.length + ' · ' + Math.round(state.rating * 10) / 10 + '★ · $' + state.dayEarned + ' today';
    }
    if (state.catering) return 'CATERING ' + state.catering.gigName + ' · ' + state.catering.dishesLeft + ' dishes left';
    return 'Find a pitch — Central, Marina or Campus';
  }

  function stats() {
    return {
      owned: state.owned,
      truckName: state.truckName,
      rankName: rankInfo().name,
      rank: state.rank,
      dishesServed: state.dishesServed,
      dishesBurned: state.dishesBurned,
      perfectDishes: state.perfectDishes,
      totalEarned: state.totalEarned,
      tipsEarned: state.tipsEarned,
      rating: Math.round(state.rating * 10) / 10,
      ratingCount: state.ratingCount,
      menu: [...state.menu],
      signature: state.signature,
      spot: state.spot,
      parked: state.parked,
      queueLength: state.queue.length,
      cookingLength: state.cooking.length,
      upgrades: [...state.upgrades],
      cateringGigId: state.catering ? state.catering.gigId : null,
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
      loyaltyProgram: state.loyaltyProgram,
      festivalsEntered: state.festivalsEntered,
      festivalsWon: state.festivalsWon,
      washes: state.washes,
      staff: { ...state.staff },
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
      loyaltyProgram: state.loyaltyProgram,
      festivalsEntered: state.festivalsEntered,
      festivalsWon: state.festivalsWon,
      washes: state.washes,
      staff: { ...state.staff },
      special: state.special ? { ...state.special } : null,
    };
  }

  function deserialize(saved) {
    const s = saved || {};
    state.owned = s.owned === true;
    state.truckName = typeof s.truckName === 'string' ? s.truckName : 'Taco Thunder';
    state.rank = Math.floor(Number(s.rank) || 0);
    state.dishesServed = Math.floor(Number(s.dishesServed) || 0);
    state.dishesBurned = Math.floor(Number(s.dishesBurned) || 0);
    state.perfectDishes = Math.floor(Number(s.perfectDishes) || 0);
    state.totalEarned = Number(s.totalEarned) || 0;
    state.tipsEarned = Number(s.tipsEarned) || 0;
    state.rating = Number(s.rating) || 3.5;
    state.ratingCount = Math.floor(Number(s.ratingCount) || 0);
    state.inventory = s.inventory && typeof s.inventory === 'object' ? { ...s.inventory } : {};
    state.menu = Array.isArray(s.menu) && s.menu.length > 0 ? [...s.menu] : ['taco', 'burrito', 'fries', 'hotdog'];
    state.signature = s.signature || null;
    state.upgrades = Array.isArray(s.upgrades) ? [...s.upgrades] : [];
    state.cateringDone = Math.floor(Number(s.cateringDone) || 0);
    state.reviews = Array.isArray(s.reviews) ? s.reviews.map((r) => ({ ...r })) : [];
    state.viralCount = Math.floor(Number(s.viralCount) || 0);
    state.inspectorVisits = Math.floor(Number(s.inspectorVisits) || 0);
    state.violations = Math.floor(Number(s.violations) || 0);
    state.healthScore = Number(s.healthScore) || 100;
    state.spoiled = Math.floor(Number(s.spoiled) || 0);
    state.customersServed = Math.floor(Number(s.customersServed) || 0);
    state.bestDay = Number(s.bestDay) || 0;
    state.refunds = Math.floor(Number(s.refunds) || 0);
    state.loyaltyCards = Math.floor(Number(s.loyaltyCards) || 0);
    state.eventsSeen = s.eventsSeen && typeof s.eventsSeen === 'object' ? { ...s.eventsSeen } : {};
    state.loyaltyProgram = s.loyaltyProgram === true;
    state.festivalsEntered = Math.floor(Number(s.festivalsEntered) || 0);
    state.festivalsWon = Math.floor(Number(s.festivalsWon) || 0);
    state.washes = Math.floor(Number(s.washes) || 0);
    state.staff = s.staff && typeof s.staff === 'object' ? { ...s.staff } : {};
    state.special = s.special ? { ...s.special } : null;
    state.parked = false;
    state.spot = null;
    state.queue = [];
    state.cooking = [];
    state.catering = null;
    state.rushActive = false;
    state.dayEarned = 0;
    return { ok: true };
  }

  function unlockSecretDish(dishId) {
    const dish = SECRET_MENU.find((x) => x.id === dishId);
    if (!dish) return { ok: false, reason: 'unknown-dish' };
    if (state.dishesServed < 100) return { ok: false, reason: 'not-enough-dishes' };
    if (state.menu.includes(dishId)) return { ok: false, reason: 'already-on-menu' };
    state.menu.push(dishId);
    return { ok: true, dishId };
  }

  function startLoyaltyProgram() {
    if (state.loyaltyProgram) return { ok: false, reason: 'already-active' };
    if (cashOf() < 100) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-100);
    state.loyaltyProgram = true;
    return { ok: true, cost: 100 };
  }

  function stampLoyaltyCard() {
    if (!state.loyaltyProgram) return { ok: false, reason: 'no-program' };
    state.loyaltyStamps += 1;
    if (state.loyaltyStamps % 5 === 0) {
      moveCash(10);
      state.tipsEarned += 10;
      state.totalEarned += 10;
      return { ok: true, stamps: state.loyaltyStamps, free: true, tip: 10 };
    }
    return { ok: true, stamps: state.loyaltyStamps, free: false };
  }

  function washTruck() {
    if (cashOf() < 30) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-30);
    state.healthScore = Math.min(100, state.healthScore + 10);
    state.rating = Math.min(5, state.rating + 0.05);
    state.washes += 1;
    return { ok: true, cost: 30 };
  }

  function enterFoodFestival() {
    if (state.rating < 4.0) return { ok: false, reason: 'rating-too-low' };
    if (cashOf() < 150) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-150);
    state.festivalsEntered += 1;
    const score = Math.round(state.rating * 20 + state.dishesServed * 0.05 + rnd() * 20);
    const field = [70, 85, 95, 110].map((base) => base + Math.floor(rnd() * 15));
    const beaten = field.filter((s) => s > score).length;
    const place = beaten + 1;
    const won = place === 1;
    let prize = 0;
    if (won) {
      prize = 1000;
      moveCash(prize);
      state.totalEarned += prize;
      state.festivalsWon += 1;
      state.rating = Math.min(5, state.rating + 0.2);
    }
    return { ok: true, won, place, prize, score };
  }

  function hireFoodTruckStaff(role) {
    if (!(role in STAFF_WAGES)) return { ok: false, reason: 'unknown-role' };
    if (state.staff[role]) return { ok: false, reason: 'already-hired' };
    state.staff[role] = STAFF_WAGES[role];
    return { ok: true, role, wage: STAFF_WAGES[role] };
  }

  function fireFoodTruckStaff(role) {
    if (!state.staff[role]) return { ok: false, reason: 'not-hired' };
    delete state.staff[role];
    return { ok: true, role };
  }

  function foodTruckSpecial() {
    const dish = FOOD_MENU[Math.floor(rnd() * FOOD_MENU.length)];
    state.special = { dishId: dish.id, price: Math.round(dish.price * 1.5), day: dayOf() };
    return { ok: true, special: { ...state.special } };
  }

  return {
    name: 'Food Truck',
    state,
    buyTruck,
    buyIngredient,
    parkAt,
    closeTruck,
    addMenuItem,
    removeMenuItem,
    setSignature,
    findDish,
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
    tick,
    tickDay,
    interact,
    hudLine,
    stats,
    serialize,
    deserialize,
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
