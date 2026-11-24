// Solara Nights — Restaurant / Ria's Kitchen (Round 7b-B, written fresh).
// Ria buys a shuttered diner on the marina and turns it into the
// talk of Solara Bay. Mornings are for the market: fresh fish, herbs,
// coffee beans, each with a price that moves daily. Lunch is a rush of
// tickets — take the order, cook it right, serve it hot, and watch the
// rating climb one star at a time. Regulars have favourites and
// patience limits; critics arrive unannounced; a bad night can undo a
// good week. Hire a chef, a waiter, a dishwasher; buy a better stove,
// a bigger dining room, a neon sign the whole bay can see. Five stars
// is not a dream, it is a spreadsheet with feelings.
// Pure logic: no rendering, no imports. Wired through the standard ctx
// { rng, getDay, getHour, getCash, addCash, addHeat, log, getPlayerPos,
// getSpeed } and driven by tick/tickDay from the main loop.

export const RESTAURANT_INGREDIENTS = [
  { id: 'fish', name: 'Fresh Fish', basePrice: 8, shelfLife: 1, desc: 'Caught this morning at the marina.' },
  { id: 'prawns', name: 'Prawns', basePrice: 14, shelfLife: 1, desc: 'Big, pink, expensive, worth it.' },
  { id: 'beef', name: 'Beef Cuts', basePrice: 16, shelfLife: 2, desc: 'From the butcher on Market Street.' },
  { id: 'chicken', name: 'Chicken', basePrice: 9, shelfLife: 2, desc: 'Free-range from the suburbs.' },
  { id: 'veg', name: 'Vegetables', basePrice: 4, shelfLife: 2, desc: 'Market greens, still muddy.' },
  { id: 'rice', name: 'Rice', basePrice: 3, shelfLife: 7, desc: 'Sacks of jasmine rice.' },
  { id: 'pasta', name: 'Pasta', basePrice: 4, shelfLife: 7, desc: 'Dried, keeps forever.' },
  { id: 'spices', name: 'Spices', basePrice: 6, shelfLife: 14, desc: 'Chilli, turmeric, smoked paprika.' },
  { id: 'coffee', name: 'Coffee Beans', basePrice: 10, shelfLife: 7, desc: 'Dark roast from the hills.' },
  { id: 'cheese', name: 'Cheese', basePrice: 11, shelfLife: 3, desc: 'Aged, sharp, smells like money.' },
  { id: 'bread', name: 'Bread', basePrice: 3, shelfLife: 1, desc: 'Baked at dawn, stale by night.' },
  { id: 'fruit', name: 'Fruit', basePrice: 5, shelfLife: 2, desc: 'Mangoes, limes, whatever is ripe.' },
];

export const RESTAURANT_DISHES = [
  { id: 'grilled-fish', name: 'Grilled Fish', price: 28, ingredients: { fish: 1, veg: 1, spices: 1 }, cookTime: 25, difficulty: 2, popularity: 0.9, desc: 'The house signature, lemon and fire.' },
  { id: 'prawn-pasta', name: 'Prawn Pasta', price: 34, ingredients: { prawns: 1, pasta: 1, cheese: 1 }, cookTime: 30, difficulty: 3, popularity: 0.85, desc: 'Garlic butter, fat prawns, parmesan snow.' },
  { id: 'beef-steak', name: 'Bay Steak', price: 46, ingredients: { beef: 1, veg: 1, spices: 1 }, cookTime: 35, difficulty: 4, popularity: 0.8, desc: 'Charred outside, pink inside, always.' },
  { id: 'chicken-rice', name: 'Chicken Rice', price: 22, ingredients: { chicken: 1, rice: 1, veg: 1 }, cookTime: 20, difficulty: 1, popularity: 0.95, desc: 'Comfort in a bowl, the lunch rush favourite.' },
  { id: 'veg-curry', name: 'Market Curry', price: 20, ingredients: { veg: 2, rice: 1, spices: 1 }, cookTime: 22, difficulty: 2, popularity: 0.75, desc: 'Slow-cooked, coconut, a little heat.' },
  { id: 'fish-soup', name: 'Fisherman Soup', price: 18, ingredients: { fish: 1, veg: 1, bread: 1 }, cookTime: 18, difficulty: 1, popularity: 0.7, desc: 'The dock workers swear by it.' },
  { id: 'cheese-pasta', name: 'Three Cheese Pasta', price: 24, ingredients: { pasta: 1, cheese: 2, veg: 1 }, cookTime: 20, difficulty: 2, popularity: 0.8, desc: 'Rich, golden, impossible to finish alone.' },
  { id: 'fruit-tart', name: 'Mango Tart', price: 14, ingredients: { fruit: 1, bread: 1, cheese: 1 }, cookTime: 15, difficulty: 2, popularity: 0.65, desc: 'Sweet ending, torched meringue.' },
  { id: 'coffee-cake', name: 'Coffee Cake', price: 12, ingredients: { coffee: 1, bread: 1, fruit: 1 }, cookTime: 12, difficulty: 1, popularity: 0.6, desc: 'For the 4 p.m. crowd, with extra espresso.' },
  { id: 'surf-turf', name: 'Surf & Turf', price: 58, ingredients: { beef: 1, prawns: 1, veg: 1, spices: 1 }, cookTime: 40, difficulty: 5, popularity: 0.7, desc: 'The celebration plate. The critic orders this.' },
  { id: 'spicy-noodles', name: 'Spicy Noodles', price: 19, ingredients: { pasta: 1, chicken: 1, spices: 1, veg: 1 }, cookTime: 16, difficulty: 2, popularity: 0.88, desc: 'Chilli oil, spring onion, slurp loudly.' },
  { id: 'breakfast-set', name: 'Bay Breakfast', price: 16, ingredients: { bread: 1, chicken: 1, fruit: 1, coffee: 1 }, cookTime: 14, difficulty: 1, popularity: 0.9, desc: 'Eggs, toast, fruit, coffee — mornings only.' },
];

export const RESTAURANT_CUSTOMERS = [
  { id: 'regular', name: 'Regular', patience: 120, tip: 0.1, frequency: 0.3, favourite: 'chicken-rice', desc: 'Same table, same order, every day.' },
  { id: 'tourist', name: 'Tourist', patience: 90, tip: 0.15, frequency: 0.2, favourite: 'grilled-fish', desc: 'Wants the signature, photographs everything.' },
  { id: 'critic', name: 'Food Critic', patience: 100, tip: 0, frequency: 0.03, favourite: 'surf-turf', desc: 'Unannounced. One bad plate, one star lost.' },
  { id: 'family', name: 'Family', patience: 150, tip: 0.12, frequency: 0.15, favourite: 'cheese-pasta', desc: 'Two kids, one pram, a big order.' },
  { id: 'couple', name: 'Date Couple', patience: 110, tip: 0.2, frequency: 0.12, favourite: 'prawn-pasta', desc: 'Anniversary. Candle optional, perfection required.' },
  { id: 'worker', name: 'Dock Worker', patience: 60, tip: 0.05, frequency: 0.12, favourite: 'fish-soup', desc: 'Thirty minutes, hungry, in a hurry.' },
  { id: 'influencer', name: 'Influencer', patience: 80, tip: 0, frequency: 0.05, favourite: 'fruit-tart', desc: 'Films the food, may post, may destroy you.' },
  { id: 'chef-friend', name: 'Chef Friend', patience: 140, tip: 0.25, frequency: 0.03, favourite: 'beef-steak', desc: 'A rival chef, secretly rooting for you.' },
];

export const RESTAURANT_UPGRADES = [
  { id: 'stove', name: 'Pro Stove', cost: 300, desc: 'Cooking 25% faster.', effect: 'cook-fast' },
  { id: 'fridge', name: 'Walk-in Fridge', cost: 450, desc: 'Ingredients last twice as long.', effect: 'fresh-long' },
  { id: 'tables', name: 'More Tables', cost: 600, desc: '+4 seats, more customers per rush.', effect: 'seats-plus' },
  { id: 'sign', name: 'Neon Sign', cost: 350, desc: 'More customers find you: +20% footfall.', effect: 'footfall' },
  { id: 'espresso', name: 'Espresso Machine', cost: 280, desc: 'Coffee dishes pay +$4.', effect: 'coffee-plus' },
  { id: 'grill', name: 'Charcoal Grill', cost: 520, desc: 'Grilled dishes pay +$6, taste better.', effect: 'grill-plus' },
  { id: 'patio', name: 'Seaside Patio', cost: 900, desc: '+6 seats, tourists love it.', effect: 'patio' },
  { id: 'star', name: 'Michelin Push', cost: 1500, desc: 'Critics visit more, ratings climb faster.', effect: 'critic-plus' },
];

export const RESTAURANT_STAFF = [
  { id: 'chef', name: 'Chef Marco', role: 'Sous Chef', wage: 60, skill: 'cook', value: 0.3, desc: 'Cooks a second dish at the same time.' },
  { id: 'waiter', name: 'Waiter Ana', role: 'Waiter', wage: 40, skill: 'serve', value: 0.25, desc: 'Serves faster, customers wait less.' },
  { id: 'dish', name: 'Dishwasher Bo', role: 'Dishwasher', wage: 25, skill: 'clean', value: 0.2, desc: 'Keeps the kitchen moving, fewer mistakes.' },
  { id: 'host', name: 'Host Lila', role: 'Host', wage: 35, skill: 'seat', value: 0.2, desc: 'Seats customers instantly, no queue.' },
  { id: 'barista', name: 'Barista Ken', role: 'Barista', wage: 45, skill: 'coffee', value: 0.35, desc: 'Coffee dishes cook instantly.' },
  { id: 'manager', name: 'Manager Dee', role: 'Manager', wage: 80, skill: 'all', value: 0.15, desc: 'A little of everything, every day.' },
];

export const RESTAURANT_RANKS = [
  { level: 0, name: 'Street Stall', xp: 0, stars: 1, perk: 'Six dishes on the menu.' },
  { level: 1, name: 'Neighbourhood Diner', xp: 150, stars: 2, perk: 'Regulars start tipping.' },
  { level: 2, name: 'Talk of the Bay', xp: 400, stars: 3, perk: 'Tourists queue at lunch.' },
  { level: 3, name: 'Fine Dining', xp: 800, stars: 4, perk: 'Critics visit, prices can rise.' },
  { level: 4, name: 'Solara Institution', xp: 1500, stars: 5, perk: 'Five stars. Booked out nightly.' },
];

export const RESTAURANT_EVENTS = [
  { id: 'festival', name: 'Food Festival', mult: 1.6, desc: 'The whole city is hungry tonight.' },
  { id: 'storm', name: 'Storm Night', mult: 0.5, desc: 'Nobody goes out in this weather.' },
  { id: 'review', name: 'Glowing Review', mult: 1.4, desc: 'The paper loved you. Bookings surge.' },
  { id: 'health', name: 'Health Inspection', mult: 1.0, desc: 'The inspector is coming. Be clean.' },
  { id: 'wedding', name: 'Wedding Party', mult: 1.5, desc: 'A forty-top books the patio.' },
  { id: 'quiet', name: 'Quiet Tuesday', mult: 0.8, desc: 'Crickets. Even the regulars stay home.' },
];

export function restaurantRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < RESTAURANT_RANKS.length; i++) {
    if (xp >= RESTAURANT_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function restaurantDishCost(dish, prices) {
  let cost = 0;
  for (const [ing, qty] of Object.entries(dish.ingredients)) {
    cost += (prices[ing] || 0) * qty;
  }
  return Math.round(cost * 10) / 10;
}

export function restaurantDishMargin(dish, prices, upgrades) {
  let price = dish.price;
  if (upgrades.includes('espresso') && dish.ingredients.coffee) price += 4;
  if (upgrades.includes('grill') && (dish.id === 'grilled-fish' || dish.id === 'beef-steak')) price += 6;
  return Math.round((price - restaurantDishCost(dish, prices)) * 10) / 10;
}

export function restaurantRatingDelta(stars, served, complaints) {
  const target = served > 0 ? (served * 5 - complaints * 2) / served : stars;
  return Math.round(((target - stars) * 0.1) * 100) / 100;
}

export function createRestaurantSystem(ctx) {
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
    stars: 1,
    owned: false,
    open: false,
    seats: 8,
    seated: [],
    queue: [],
    cooking: [],
    servedToday: 0,
    servedTotal: 0,
    complaints: 0,
    compliments: 0,
    tips: 0,
    earned: 0,
    spent: 0,
    ingredients: {},
    prices: {},
    upgrades: [],
    staff: [],
    menuPrices: {},
    dishesCooked: {},
    dishesServed: {},
    bestDish: null,
    bestDishCount: 0,
    ratingHistory: [],
    lastDay: 1,
    dailyRevenue: 0,
    dailyCosts: 0,
    rushHour: false,
    event: null,
    eventMult: 1,
    inspection: 0,
    spoiled: 0,
    regulars: 0,
    criticsServed: 0,
    fiveStarDays: 0,
    perfectDays: 0,
    tablesTurned: 0,
  };
  for (const ing of RESTAURANT_INGREDIENTS) { state.ingredients[ing.id] = 0; state.prices[ing.id] = ing.basePrice; }
  for (const d of RESTAURANT_DISHES) { state.menuPrices[d.id] = d.price; state.dishesCooked[d.id] = 0; state.dishesServed[d.id] = 0; }

  function refreshRank() {
    const r = restaurantRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      state.stars = RESTAURANT_RANKS[r].stars;
      log(`Restaurant rank up: ${RESTAURANT_RANKS[r].name} — ${state.stars} stars!`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function seatCapacity() {
    let cap = state.seats;
    if (state.upgrades.includes('tables')) cap += 4;
    if (state.upgrades.includes('patio')) cap += 6;
    return cap;
  }

  function footfallMult() {
    let m = 1;
    if (state.upgrades.includes('sign')) m += 0.2;
    m *= state.eventMult;
    m *= 0.7 + state.stars * 0.15;
    return m;
  }

  function buyRestaurant() {
    if (state.owned) return { ok: false, reason: 'already-owned' };
    const cost = 2000;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned = true;
    log("You bought the old marina diner — Ria's Kitchen is yours.");
    return { ok: true, cost };
  }

  function openRestaurant() {
    if (!state.owned) return { ok: false, reason: 'not-owned' };
    if (state.open) return { ok: false, reason: 'already-open' };
    state.open = true;
    state.rushHour = getHour() >= 11 && getHour() <= 14;
    log("Ria's Kitchen is open. The smell of garlic hits the marina.");
    return { ok: true };
  }

  function closeRestaurant() {
    if (!state.open) return { ok: false, reason: 'not-open' };
    state.open = false;
    const unserved = state.seated.length + state.queue.length;
    state.seated = [];
    state.queue = [];
    state.cooking = [];
    if (unserved > 0) {
      state.complaints += unserved;
      log(`${unserved} customers left hungry at closing.`);
    }
    log(`Closed. Today: ${state.servedToday} served, $${Math.round(state.dailyRevenue)} taken.`);
    return { ok: true, served: state.servedToday, revenue: Math.round(state.dailyRevenue) };
  }

  function buyIngredient(id, qty) {
    const ing = RESTAURANT_INGREDIENTS.find((x) => x.id === id);
    if (!ing) return { ok: false, reason: 'no-such-ingredient' };
    if (qty <= 0) return { ok: false, reason: 'bad-qty' };
    const cost = Math.round(state.prices[id] * qty * 10) / 10;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.dailyCosts += cost;
    state.ingredients[id] += qty;
    return { ok: true, id, qty, cost };
  }

  function setMenuPrice(dishId, price) {
    const dish = RESTAURANT_DISHES.find((d) => d.id === dishId);
    if (!dish) return { ok: false, reason: 'no-such-dish' };
    if (price < 5 || price > 120) return { ok: false, reason: 'price-out-of-range' };
    state.menuPrices[dishId] = price;
    return { ok: true, dish: dishId, price };
  }

  function seatCustomer(typeId) {
    if (!state.open) return { ok: false, reason: 'not-open' };
    const type = RESTAURANT_CUSTOMERS.find((x) => x.id === typeId);
    if (!type) return { ok: false, reason: 'no-such-customer' };
    if (state.seated.length >= seatCapacity()) {
      state.queue.push({ type: typeId, patience: type.patience });
      return { ok: true, queued: true, position: state.queue.length };
    }
    const cust = { type: typeId, patience: type.patience, order: null, served: false, waiting: 0 };
    state.seated.push(cust);
    if (typeId === 'regular') state.regulars += 1;
    if (typeId === 'critic') state.criticsServed += 1;
    return { ok: true, queued: false, seated: state.seated.length };
  }

  function spawnCustomers(n) {
    let seated = 0;
    let queued = 0;
    for (let i = 0; i < n; i++) {
      let roll = rng();
      let acc = 0;
      let picked = RESTAURANT_CUSTOMERS[0];
      for (const t of RESTAURANT_CUSTOMERS) {
        acc += t.frequency;
        if (roll <= acc) { picked = t; break; }
      }
      const res = seatCustomer(picked.id);
      if (res.ok && res.queued) queued += 1;
      else if (res.ok) seated += 1;
    }
    return { ok: true, seated, queued };
  }

  function takeOrder(seatIdx) {
    const cust = state.seated[seatIdx];
    if (!cust) return { ok: false, reason: 'no-such-seat' };
    if (cust.order) return { ok: false, reason: 'already-ordered' };
    const type = RESTAURANT_CUSTOMERS.find((x) => x.id === cust.type);
    let dishId;
    if (rng() < 0.6) dishId = type.favourite;
    else {
      const menu = RESTAURANT_DISHES.filter((d) => d.popularity > 0.6);
      dishId = menu[Math.floor(rng() * menu.length)].id;
    }
    cust.order = dishId;
    cust.waiting = 0;
    return { ok: true, seat: seatIdx, dish: dishId, customer: cust.type };
  }

  function canCook(dishId) {
    const dish = RESTAURANT_DISHES.find((d) => d.id === dishId);
    if (!dish) return { ok: false, reason: 'no-such-dish' };
    for (const [ing, qty] of Object.entries(dish.ingredients)) {
      if ((state.ingredients[ing] || 0) < qty) return { ok: false, reason: 'missing-ingredient', ingredient: ing };
    }
    return { ok: true, dish };
  }

  function cookDish(dishId, seatIdx) {
    const check = canCook(dishId);
    if (!check.ok) return check;
    const dish = check.dish;
    for (const [ing, qty] of Object.entries(dish.ingredients)) {
      state.ingredients[ing] -= qty;
    }
    let time = dish.cookTime;
    if (state.upgrades.includes('stove')) time *= 0.75;
    if (state.staff.includes('chef') && state.cooking.length >= 1) time *= 0.9;
    if (state.staff.includes('barista') && dish.ingredients.coffee) time = 2;
    const job = { dish: dishId, seat: seatIdx, timeLeft: time, total: time };
    state.cooking.push(job);
    state.dishesCooked[dishId] += 1;
    return { ok: true, dish: dishId, cookTime: Math.round(time) };
  }

  function serveDish(seatIdx) {
    const cust = state.seated[seatIdx];
    if (!cust) return { ok: false, reason: 'no-such-seat' };
    if (!cust.order) return { ok: false, reason: 'no-order' };
    const done = state.cooking.findIndex((j) => j.dish === cust.order && j.timeLeft <= 0 && (j.seat === seatIdx || j.seat === undefined || j.seat === null));
    const anyDone = state.cooking.findIndex((j) => j.dish === cust.order && j.timeLeft <= 0);
    if (anyDone < 0) return { ok: false, reason: 'not-cooked-yet' };
    const job = state.cooking[anyDone];
    void done;
    state.cooking.splice(anyDone, 1);
    const dish = RESTAURANT_DISHES.find((d) => d.id === cust.order);
    let price = state.menuPrices[dish.id];
    if (state.upgrades.includes('espresso') && dish.ingredients.coffee) price += 4;
    if (state.upgrades.includes('grill') && (dish.id === 'grilled-fish' || dish.id === 'beef-steak')) price += 6;
    const type = RESTAURANT_CUSTOMERS.find((x) => x.id === cust.type);
    const waited = cust.waiting;
    const happy = waited < type.patience * 0.5;
    const tip = happy ? Math.round(price * type.tip) : 0;
    const total = price + tip;
    state.earned += total;
    state.dailyRevenue += total;
    state.tips += tip;
    addCash(total);
    state.servedToday += 1;
    state.servedTotal += 1;
    state.dishesServed[dish.id] += 1;
    if (state.dishesServed[dish.id] > state.bestDishCount) {
      state.bestDishCount = state.dishesServed[dish.id];
      state.bestDish = dish.id;
    }
    state.tablesTurned += 1;
    if (happy) { state.compliments += 1; gainXp(8); }
    else { state.complaints += 1; gainXp(2); }
    if (cust.type === 'critic' && happy) {
      state.stars = Math.min(5, state.stars + 0.2);
      log('The critic smiles. That smile is worth a fortune.');
    }
    if (cust.type === 'critic' && !happy) {
      state.stars = Math.max(1, state.stars - 0.3);
      log('The critic writes something down. Slowly. Uh oh.');
    }
    if (cust.type === 'influencer' && happy) {
      gainXp(15);
      log('The influencer posts — bookings spike!');
    }
    state.seated.splice(seatIdx, 1);
    if (state.queue.length > 0) {
      const next = state.queue.shift();
      state.seated.push({ type: next.type, patience: next.patience, order: null, served: false, waiting: 0 });
    }
    return { ok: true, dish: dish.id, price, tip, total, happy };
  }

  function compDish(seatIdx) {
    const cust = state.seated[seatIdx];
    if (!cust) return { ok: false, reason: 'no-such-seat' };
    if (!cust.order) return { ok: false, reason: 'no-order' };
    const idx = state.cooking.findIndex((j) => j.dish === cust.order && j.timeLeft <= 0);
    if (idx < 0) return { ok: false, reason: 'not-cooked-yet' };
    state.cooking.splice(idx, 1);
    state.complaints = Math.max(0, state.complaints - 1);
    state.compliments += 1;
    gainXp(5);
    state.seated.splice(seatIdx, 1);
    log('Dish comped — the customer leaves happy despite the wait.');
    return { ok: true, comped: true };
  }

  function buyUpgrade(id) {
    const u = RESTAURANT_UPGRADES.find((x) => x.id === id);
    if (!u) return { ok: false, reason: 'no-such-upgrade' };
    if (state.upgrades.includes(id)) return { ok: false, reason: 'already-owned' };
    if (!state.owned) return { ok: false, reason: 'not-owned' };
    if (getCash() < u.cost) return { ok: false, reason: 'not-enough-cash', cost: u.cost };
    addCash(-u.cost);
    state.spent += u.cost;
    state.upgrades.push(id);
    if (id === 'tables') state.seats += 4;
    if (id === 'patio') state.seats += 6;
    gainXp(20);
    log(`Bought ${u.name} for $${u.cost}.`);
    return { ok: true, id };
  }

  function hireStaff(id) {
    const s = RESTAURANT_STAFF.find((x) => x.id === id);
    if (!s) return { ok: false, reason: 'no-such-staff' };
    if (state.staff.includes(id)) return { ok: false, reason: 'already-hired' };
    state.staff.push(id);
    log(`Hired ${s.name} (${s.role}) — $${s.wage}/day.`);
    return { ok: true, id };
  }

  function fireStaff(id) {
    const i = state.staff.indexOf(id);
    if (i < 0) return { ok: false, reason: 'not-hired' };
    state.staff.splice(i, 1);
    return { ok: true, id };
  }

  function tick(dt) {
    if (!state.open) return;
    for (const job of state.cooking) {
      if (job.timeLeft > 0) job.timeLeft -= dt;
    }
    for (let i = state.seated.length - 1; i >= 0; i--) {
      const cust = state.seated[i];
      cust.waiting += dt;
      cust.patience -= dt * (state.staff.includes('waiter') ? 0.75 : 1);
      if (cust.patience <= 0) {
        const type = RESTAURANT_CUSTOMERS.find((x) => x.id === cust.type);
        state.complaints += 1;
        if (cust.type === 'critic') state.stars = Math.max(1, state.stars - 0.2);
        log(`${type.name} walked out — waited too long.`);
        state.seated.splice(i, 1);
        if (state.queue.length > 0) {
          const next = state.queue.shift();
          state.seated.push({ type: next.type, patience: next.patience, order: null, served: false, waiting: 0 });
        }
      }
    }
    for (let i = state.queue.length - 1; i >= 0; i--) {
      state.queue[i].patience -= dt;
      if (state.queue[i].patience <= 0) {
        state.queue.splice(i, 1);
        state.complaints += 1;
        log('Someone left the queue — the wait was too long.');
      }
    }
    if (rng() < dt * 0.02 * footfallMult()) {
      spawnCustomers(1);
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    const served = state.servedToday;
    const delta = restaurantRatingDelta(state.stars, served, state.complaints);
    if (served > 0) {
      state.ratingHistory.push({ day: day - 1, stars: Math.round(state.stars * 10) / 10, served, revenue: Math.round(state.dailyRevenue) });
      if (state.ratingHistory.length > 14) state.ratingHistory.shift();
    }
    if (state.stars >= 5 && served >= 10) state.fiveStarDays += 1;
    if (state.complaints === 0 && served >= 5) state.perfectDays += 1;
    state.stars = Math.max(1, Math.min(5, Math.round((state.stars + delta) * 10) / 10));
    let wages = 0;
    for (const id of state.staff) {
      const s = RESTAURANT_STAFF.find((x) => x.id === id);
      wages += s.wage;
    }
    if (wages > 0) {
      state.spent += wages;
      state.dailyCosts += wages;
      addCash(-wages);
    }
    const spoilRate = state.upgrades.includes('fridge') ? 0.5 : 1;
    for (const ing of RESTAURANT_INGREDIENTS) {
      if (ing.shelfLife <= 2 && rng() < 0.3 * spoilRate) {
        const lost = Math.min(state.ingredients[ing.id], 1 + Math.floor(rng() * 2));
        state.ingredients[ing.id] -= lost;
        state.spoiled += lost;
      }
      const drift = (rng() - 0.5) * 2;
      state.prices[ing.id] = Math.max(1, Math.round((ing.basePrice + drift) * 10) / 10);
    }
    const ev = RESTAURANT_EVENTS[Math.floor(rng() * RESTAURANT_EVENTS.length)];
    state.event = ev.id;
    state.eventMult = ev.mult;
    if (ev.id === 'health') {
      state.inspection += 1;
      log('Health inspection today — the kitchen better be spotless.');
    } else {
      log(`Tonight: ${ev.name} — ${ev.desc}`);
    }
    state.servedToday = 0;
    state.dailyRevenue = 0;
    state.dailyCosts = 0;
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, stars: state.stars,
      owned: state.owned, open: state.open, seats: state.seats,
      seated: state.seated, queue: state.queue, cooking: state.cooking,
      servedToday: state.servedToday, servedTotal: state.servedTotal,
      complaints: state.complaints, compliments: state.compliments,
      tips: state.tips, earned: state.earned, spent: state.spent,
      ingredients: state.ingredients, prices: state.prices,
      upgrades: state.upgrades, staff: state.staff,
      menuPrices: state.menuPrices, dishesCooked: state.dishesCooked,
      dishesServed: state.dishesServed, bestDish: state.bestDish,
      bestDishCount: state.bestDishCount,
      ratingHistory: state.ratingHistory, lastDay: state.lastDay,
      dailyRevenue: state.dailyRevenue, dailyCosts: state.dailyCosts,
      rushHour: state.rushHour, event: state.event,
      eventMult: state.eventMult, inspection: state.inspection,
      spoiled: state.spoiled, regulars: state.regulars,
      criticsServed: state.criticsServed, fiveStarDays: state.fiveStarDays,
      perfectDays: state.perfectDays, tablesTurned: state.tablesTurned,
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
      rank: RESTAURANT_RANKS[state.rank].name,
      xp: state.xp,
      stars: Math.round(state.stars * 10) / 10,
      owned: state.owned,
      open: state.open,
      seats: seatCapacity(),
      seated: state.seated.length,
      queue: state.queue.length,
      cooking: state.cooking.length,
      servedToday: state.servedToday,
      servedTotal: state.servedTotal,
      complaints: state.complaints,
      compliments: state.compliments,
      tips: Math.round(state.tips),
      earned: Math.round(state.earned),
      spent: state.spent,
      upgrades: state.upgrades.length,
      staff: state.staff.length,
      bestDish: state.bestDish,
      bestDishCount: state.bestDishCount,
      dailyRevenue: Math.round(state.dailyRevenue),
      event: state.event,
      regulars: state.regulars,
      criticsServed: state.criticsServed,
      fiveStarDays: state.fiveStarDays,
      perfectDays: state.perfectDays,
      tablesTurned: state.tablesTurned,
      spoiled: state.spoiled,
    };
  }

  function hudLine() {
    if (!state.owned) return '';
    if (!state.open) return "Ria's Kitchen: closed — press E at the diner to open";
    const waiting = state.seated.filter((s) => s.order && !s.served).length;
    return `Kitchen: ${state.seated.length}/${seatCapacity()} seated, ${state.cooking.length} cooking, ${waiting} waiting — ${state.stars.toFixed(1)}★`;
  }

  function interact() {
    const pos = getPos();
    const nearDiner = Math.hypot(pos.x + 20, pos.z + 110) < 25;
    if (!nearDiner) return false;
    if (!state.owned) { buyRestaurant(); return true; }
    if (!state.open) { openRestaurant(); return true; }
    if (state.seated.length > 0 && !state.seated[0].order) { takeOrder(0); return true; }
    return false;
  }

  function menu() {
    return RESTAURANT_DISHES.map((d) => ({
      id: d.id, name: d.name, price: state.menuPrices[d.id],
      cost: restaurantDishCost(d, state.prices),
      margin: restaurantDishMargin(d, state.prices, state.upgrades),
      cooked: state.dishesCooked[d.id], served: state.dishesServed[d.id],
      canCook: canCook(d.id).ok,
    }));
  }

  function pantry() {
    return RESTAURANT_INGREDIENTS.map((ing) => ({
      id: ing.id, name: ing.name, have: state.ingredients[ing.id],
      price: state.prices[ing.id], shelfLife: ing.shelfLife,
    }));
  }

  return {
    state, buyRestaurant, openRestaurant, closeRestaurant, buyIngredient,
    setMenuPrice, seatCustomer, spawnCustomers, takeOrder, canCook,
    cookDish, serveDish, compDish, buyUpgrade, hireStaff, fireStaff,
    tick, tickDay, serialize, deserialize, stats, hudLine, interact,
    menu, pantry, seatCapacity, footfallMult,
  };
}

export const RESTAURANT_SPECIALS = [
  { id: 'sunday-roast', name: 'Sunday Roast', day: 0, dish: 'beef-steak', bonus: 1.3, desc: 'Sundays: roast sells 30% better.' },
  { id: 'fish-friday', name: 'Fish Friday', day: 5, dish: 'grilled-fish', bonus: 1.3, desc: 'Fridays: the catch of the day flies.' },
  { id: 'taco-tuesday', name: 'Spicy Tuesday', day: 2, dish: 'spicy-noodles', bonus: 1.25, desc: 'Tuesdays: noodles with extra chilli.' },
  { id: 'brunch-saturday', name: 'Brunch Saturday', day: 6, dish: 'breakfast-set', bonus: 1.4, desc: 'Saturdays: breakfast all day.' },
];

export function restaurantSpecialFor(dayOfWeek) {
  return RESTAURANT_SPECIALS.find((s) => s.day === dayOfWeek % 7) || null;
}

export function restaurantHealthScore(complaints, served, spoiled) {
  if (served === 0) return 100;
  const score = 100 - (complaints / served) * 100 - spoiled * 2;
  return Math.max(0, Math.round(score));
}

export function restaurantRushFactor(hour) {
  if (hour >= 12 && hour <= 14) return 1.8;
  if (hour >= 18 && hour <= 21) return 1.6;
  if (hour >= 7 && hour <= 10) return 1.2;
  return 0.7;
}

export function restaurantTipFor(price, customerType, happy) {
  const type = RESTAURANT_CUSTOMERS.find((x) => x.id === customerType);
  if (!type || !happy) return 0;
  return Math.round(price * type.tip);
}

export const RESTAURANT_CATERING = [
  { id: 'wedding', name: 'Wedding Feast', guests: 80, dishes: 3, pay: 1200, days: 3, desc: 'Eighty guests, three courses, one shot.' },
  { id: 'office', name: 'Office Lunch', guests: 30, dishes: 2, pay: 450, days: 1, desc: 'Thirty boxed lunches by noon.' },
  { id: 'birthday', name: 'Birthday Party', guests: 25, dishes: 2, pay: 380, days: 1, desc: 'Kids, cake, chaos, cash.' },
  { id: 'gala', name: 'Charity Gala', guests: 120, dishes: 4, pay: 2400, days: 5, desc: 'The city’s richest room, all at once.' },
  { id: 'boat', name: 'Yacht Party', guests: 20, dishes: 3, pay: 700, days: 2, desc: 'Cook on a moving yacht. Do not drop the plates.' },
  { id: 'festival', name: 'Festival Stall', guests: 200, dishes: 2, pay: 900, days: 2, desc: 'Two dishes, two hundred hungry people.' },
  { id: 'film', name: 'Film Set Catering', guests: 45, dishes: 3, pay: 800, days: 2, desc: 'Feed the crew between takes.' },
  { id: 'funeral', name: 'Wake Catering', guests: 40, dishes: 2, pay: 500, days: 1, desc: 'Quiet food for a hard day.' },
];

export const RESTAURANT_REVIEWS = [
  { stars: 5, text: 'The best meal in Solara Bay. Full stop.', author: 'Bay Eats' },
  { stars: 5, text: 'I dream about the grilled fish.', author: 'Foodie Fran' },
  { stars: 4, text: 'Lovely room, lovely food, slow dessert.', author: 'Table for Two' },
  { stars: 4, text: 'Worth the queue. Book ahead.', author: 'Marina Mag' },
  { stars: 3, text: 'Good, not great. The soup saved it.', author: 'Honest Eater' },
  { stars: 3, text: 'Loud night, decent plates.', author: 'Weekend Diner' },
  { stars: 2, text: 'Waited an hour. Food was cold.', author: 'Hungry Harold' },
  { stars: 1, text: 'Never again. The critic was right.', author: 'Angry Alan' },
];

export const RESTAURANT_DELIVERY_ZONES = [
  { id: 'marina', name: 'Marina', fee: 5, time: 15, desc: 'Yachts and apartments, quick run.' },
  { id: 'downtown', name: 'Downtown', fee: 6, time: 20, desc: 'Offices and traffic.' },
  { id: 'beach', name: 'Beach', fee: 7, time: 25, desc: 'Sunseekers, sandy hands.' },
  { id: 'docks', name: 'Docks', fee: 8, time: 30, desc: 'Night shifts, big appetites.' },
  { id: 'suburbs', name: 'Suburbs', fee: 9, time: 35, desc: 'Families, far away, worth it.' },
  { id: 'oldtown', name: 'Old Town', fee: 6, time: 18, desc: 'Narrow lanes, careful driving.' },
];

export function restaurantCateringPay(gig, dishesReady, guests) {
  if (dishesReady < gig.dishes) return 0;
  return Math.round(gig.pay * (0.8 + (guests / gig.guests) * 0.2));
}

export function restaurantReviewFor(stars) {
  const pool = RESTAURANT_REVIEWS.filter((r) => r.stars === stars);
  if (pool.length === 0) return RESTAURANT_REVIEWS[4];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function restaurantDeliveryFee(zoneId, orderTotal) {
  const zone = RESTAURANT_DELIVERY_ZONES.find((z) => z.id === zoneId);
  if (!zone) return 0;
  return zone.fee + Math.round(orderTotal * 0.05);
}

export function createRestaurantCatering(system) {
  let activeGig = null;
  let gigsDone = 0;
  let gigsEarned = 0;
  let deliveriesDone = 0;
  let deliveriesEarned = 0;
  const reviews = [];

  function takeGig(gigId) {
    const gig = RESTAURANT_CATERING.find((x) => x.id === gigId);
    if (!gig) return { ok: false, reason: 'no-such-gig' };
    if (activeGig) return { ok: false, reason: 'gig-active' };
    if (system.state.rank < 1 && gig.guests > 50) return { ok: false, reason: 'rank-too-low' };
    activeGig = { ...gig, dayTaken: system.state.lastDay };
    return { ok: true, gig: gigId, guests: gig.guests, pay: gig.pay };
  }

  function completeGig(dishesReady, guestsServed) {
    if (!activeGig) return { ok: false, reason: 'no-gig' };
    const pay = restaurantCateringPay(activeGig, dishesReady, guestsServed);
    gigsDone += 1;
    gigsEarned += pay;
    const done = activeGig;
    activeGig = null;
    return { ok: true, gig: done.id, pay, guests: guestsServed };
  }

  function deliverOrder(zoneId, dishIds) {
    const zone = RESTAURANT_DELIVERY_ZONES.find((z) => z.id === zoneId);
    if (!zone) return { ok: false, reason: 'no-such-zone' };
    let total = 0;
    for (const id of dishIds) {
      const dish = RESTAURANT_DISHES.find((d) => d.id === id);
      if (dish) total += system.state.menuPrices[id] || dish.price;
    }
    const fee = restaurantDeliveryFee(zoneId, total);
    const pay = total + fee;
    deliveriesDone += 1;
    deliveriesEarned += pay;
    return { ok: true, zone: zoneId, total, fee, pay, time: zone.time };
  }

  function addReview(stars) {
    const review = restaurantReviewFor(stars);
    reviews.push({ stars, text: review.text, author: review.author });
    if (reviews.length > 20) reviews.shift();
    return { ok: true, review };
  }

  function cateringRecord() {
    return {
      activeGig: activeGig ? activeGig.id : null,
      gigsDone, gigsEarned,
      deliveriesDone, deliveriesEarned,
      reviews: reviews.length,
    };
  }

  return {
    takeGig, completeGig, deliverOrder, addReview, cateringRecord,
    get gigs() { return gigsDone; },
    get reviewsList() { return [...reviews]; },
  };
}

export const RESTAURANT_SEASONAL_MENUS = [
  { id: 'spring', name: 'Spring Menu', dishes: ['lettuce', 'strawberry'], bonus: 1.15, desc: 'Fresh greens and early berries.' },
  { id: 'summer', name: 'Summer Menu', dishes: ['grilled-fish', 'mango'], bonus: 1.2, desc: 'Grill season, cold drinks, long nights.' },
  { id: 'autumn', name: 'Autumn Menu', dishes: ['pumpkin-pie', 'beef-steak'], bonus: 1.15, desc: 'Rich food for cool nights.' },
  { id: 'winter', name: 'Winter Menu', dishes: ['fish-soup', 'coffee-cake'], bonus: 1.1, desc: 'Soup, warmth, and strong coffee.' },
];

export const RESTAURANT_WINE_LIST = [
  { id: 'house-red', name: 'House Red', cost: 8, price: 22, desc: 'Drinkable, honest, always available.' },
  { id: 'bay-white', name: 'Bay White', cost: 10, price: 26, desc: 'Crisp, local, perfect with fish.' },
  { id: 'sparkling', name: 'Sparkling', cost: 14, price: 38, desc: 'For celebrations and proposals.' },
  { id: 'reserve', name: 'Reserve Red', cost: 25, price: 65, desc: 'The bottle the critic asks about.' },
  { id: 'dessert', name: 'Dessert Wine', cost: 12, price: 30, desc: 'Sweet ending in a small glass.' },
];

export const RESTAURANT_ALLERGENS = [
  { id: 'nuts', name: 'Nuts', dishes: ['fruit-tart', 'coffee-cake'], desc: 'Always ask. Always flag.' },
  { id: 'gluten', name: 'Gluten', dishes: ['prawn-pasta', 'cheese-pasta', 'spicy-noodles'], desc: 'Pasta is the risk.' },
  { id: 'shellfish', name: 'Shellfish', dishes: ['prawn-pasta', 'surf-turf'], desc: 'Prawns are the risk.' },
  { id: 'dairy', name: 'Dairy', dishes: ['cheese-pasta', 'fruit-tart', 'coffee-cake'], desc: 'Cheese and cream.' },
];

export function restaurantSeasonalBonus(menuId, dishId) {
  const menu = RESTAURANT_SEASONAL_MENUS.find((m) => m.id === menuId);
  if (!menu) return 1;
  return menu.dishes.includes(dishId) ? menu.bonus : 1;
}

export function restaurantWineMargin(wineId) {
  const w = RESTAURANT_WINE_LIST.find((x) => x.id === wineId);
  if (!w) return 0;
  return w.price - w.cost;
}

export function restaurantAllergenCheck(dishId, allergenId) {
  const a = RESTAURANT_ALLERGENS.find((x) => x.id === allergenId);
  if (!a) return false;
  return a.dishes.includes(dishId);
}

export function restaurantTableTurnover(served, seats, hours) {
  if (seats === 0 || hours === 0) return 0;
  return Math.round((served / (seats * hours)) * 100) / 100;
}

export function restaurantFoodCostPercent(costs, revenue) {
  if (revenue === 0) return 0;
  return Math.round((costs / revenue) * 100);
}

export function restaurantStaffTipPool(tips, staffCount) {
  if (staffCount === 0) return tips;
  return Math.round(tips / (staffCount + 1));
}

export const RESTAURANT_TIPS = [
  { id: 'fresh-first', name: 'Fresh First', text: 'Buy fish in the morning. Never at night.' },
  { id: 'price-right', name: 'Price Right', text: 'A full room at $20 beats an empty room at $40.' },
  { id: 'critic-ready', name: 'Critic Ready', text: 'Cook every plate like the critic is watching.' },
  { id: 'regulars', name: 'Regulars First', text: 'Regulars pay the rent. Learn their names.' },
  { id: 'waste-not', name: 'Waste Not', text: 'Yesterday’s bread is today’s crouton.' },
  { id: 'rush-ready', name: 'Rush Ready', text: 'Prep before lunch. Cook during lunch.' },
  { id: 'clean-kitchen', name: 'Clean Kitchen', text: 'The inspector visits when you least expect it.' },
  { id: 'season-menu', name: 'Season Menu', text: 'Change the menu with the season.' },
];

export const RESTAURANT_AWARDS = [
  { id: 'michelin', name: 'Michelin Star', need: 'stars', goal: 5, desc: 'Reach five stars.' },
  { id: 'thousand', name: 'Thousand Plates', need: 'servedTotal', goal: 1000, desc: 'Serve 1,000 dishes.' },
  { id: 'critic-fav', name: 'Critic’s Favourite', need: 'criticsServed', goal: 10, desc: 'Serve 10 critics well.' },
  { id: 'perfect-month', name: 'Perfect Month', need: 'perfectDays', goal: 20, desc: 'Twenty perfect days.' },
  { id: 'regular-army', name: 'Regular Army', need: 'regulars', goal: 100, desc: 'Seat 100 regulars.' },
];

export function restaurantDailyTip(day) {
  return RESTAURANT_TIPS[day % RESTAURANT_TIPS.length];
}

export function restaurantAwardProgress(awardId, state) {
  const a = RESTAURANT_AWARDS.find((x) => x.id === awardId);
  if (!a) return null;
  const have = state[a.need] || 0;
  return { id: a.id, name: a.name, have, goal: a.goal, done: have >= a.goal };
}

export function restaurantRushReadiness(cooking, seated, seats) {
  const load = (cooking + seated) / Math.max(1, seats);
  if (load > 1) return 'overloaded';
  if (load > 0.7) return 'busy';
  if (load > 0.3) return 'steady';
  return 'quiet';
}

export function restaurantDailyProfit(revenue, costs, wages) {
  return Math.round((revenue - costs - wages) * 10) / 10;
}

export function restaurantPopularDish(dishesServed) {
  let best = null;
  let bestCount = 0;
  for (const [dish, count] of Object.entries(dishesServed)) {
    if (count > bestCount) { bestCount = count; best = dish; }
  }
  return best ? { dish: best, served: bestCount } : null;
}

export function restaurantWaitTimeEstimate(queue, seats) {
  return Math.round(queue * 8 + (seats > 0 ? 5 : 15));
}

export const RESTAURANT_RECORDS = [
  { id: 'most-served', name: 'Most Served', stat: 'servedTotal', unit: 'dishes', desc: 'Most dishes served.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money earned.' },
  { id: 'best-stars', name: 'Best Stars', stat: 'stars', unit: 'stars', desc: 'Highest star rating.' },
  { id: 'most-tips', name: 'Most Tips', stat: 'tips', unit: '$', desc: 'Most tips collected.' },
  { id: 'most-titles', name: 'Most Titles', stat: 'fiveStarDays', unit: 'days', desc: 'Most five-star days.' },
];

export function restaurantRecordFor(recordId, state) {
  const r = RESTAURANT_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function restaurantAllRecords(state) {
  return RESTAURANT_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function restaurantSatisfaction(compliments, complaints) {
  const total = compliments + complaints;
  if (total === 0) return 100;
  return Math.round((compliments / total) * 100);
}

export function restaurantRevenuePerSeat(revenue, seats) {
  if (seats === 0) return 0;
  return Math.round((revenue / seats) * 10) / 10;
}

export function restaurantChefGrade(served, complaints, stars) {
  const sat = restaurantSatisfaction(served, complaints);
  if (stars >= 4.5 && sat >= 90) return 'S';
  if (stars >= 4) return 'A';
  if (stars >= 3) return 'B';
  if (stars >= 2) return 'C';
  return 'D';
}

export const RESTAURANT_SEASONAL_EVENTS = [
  { id: 'valentine', name: 'Valentine Night', season: 'winter', mult: 1.5, desc: 'Couples, candles, and the surf & turf.' },
  { id: 'summer-terrace', name: 'Summer Terrace', season: 'summer', mult: 1.4, desc: 'The patio is the place to be.' },
  { id: 'harvest-dinner', name: 'Harvest Dinner', season: 'autumn', mult: 1.3, desc: 'Pumpkin everything.' },
  { id: 'spring-brunch', name: 'Spring Brunch', season: 'spring', mult: 1.3, desc: 'Brunch season is back.' },
];

export function restaurantSeasonalEvent(seasonId) {
  return RESTAURANT_SEASONAL_EVENTS.find((x) => x.season === seasonId) || null;
}

export function restaurantSeasonalMult(seasonId) {
  const e = restaurantSeasonalEvent(seasonId);
  return e ? e.mult : 1;
}

export function restaurantCoverCount(seated, queue) {
  return seated + queue;
}

export function restaurantAverageSpend(revenue, served) {
  if (served === 0) return 0;
  return Math.round((revenue / served) * 10) / 10;
}

export const RESTAURANT_QUICK_START = [
  'Buy ingredients in the morning, cook at lunch.',
  'Start with chicken rice — it always sells.',
  'Seat regulars first. They tip and they return.',
  'Never let a critic wait. Ever.',
  'Buy the stove before the tables.',
  'Change the menu with the season.',
];

export function restaurantQuickStart(step) {
  return RESTAURANT_QUICK_START[step] || null;
}

export function restaurantTotalValue(state) {
  return state.upgrades.length * 400 + state.staff.length * 200;
}

export function restaurantProgressPercent(state) {
  if (state.servedTotal === 0) return 0;
  return Math.round((state.compliments / state.servedTotal) * 100);
}

export function restaurantSummary(state) {
  return `${RESTAURANT_RANKS[state.rank].name} (${state.stars.toFixed(1)}★): ${state.servedTotal} served, $${Math.round(state.earned)} earned, ${state.compliments} compliments.`;
}

export function restaurantNextGoal(state) {
  if (!state.owned) return 'Buy the diner.';
  if (state.servedTotal < 20) return 'Serve 20 dishes.';
  if (state.stars < 3) return 'Reach 3 stars.';
  return 'Earn the fifth star.';
}

export const RESTAURANT_META = {
  system: 'restaurant', version: '7b-B', author: 'builder-B',
  files: 1, lines: 972, features: ['cooking', 'serving', 'menu', 'staff', 'catering', 'reviews'],
};

export function restaurantMeta() {
  return { ...RESTAURANT_META };
}
