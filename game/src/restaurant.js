// Ria buys a shuttered marina diner and runs it as a restaurant: buy
// ingredients in the morning, seat customers at lunch, cook, serve, and
// build a star rating. Context supplies rng, the hour getter, cash access,
// a logger and the player position. The day getter, heat adder and speed
// getter are present with defaults but never called. No weather getter exists.
export const RESTAURANT_INGREDIENTS = [
  { id: 'tomato', name: 'Tomato', basePrice: 2, shelfLife: 3, desc: 'Ripe bay tomatoes.' },
  { id: 'onion', name: 'Onion', basePrice: 1, shelfLife: 7, desc: 'Sweet onions, keep for a week.' },
  { id: 'fish', name: 'Fresh Fish', basePrice: 12, shelfLife: 1, desc: 'Caught this morning, use it today.' },
  { id: 'shrimp', name: 'Shrimp', basePrice: 15, shelfLife: 1, desc: 'Plump shrimp, spoils fast.' },
  { id: 'rice', name: 'Rice', basePrice: 3, shelfLife: 30, desc: 'Dry rice, keeps for ages.' },
  { id: 'pasta', name: 'Pasta', basePrice: 4, shelfLife: 30, desc: 'Dried pasta, always in stock.' },
  { id: 'beef', name: 'Beef', basePrice: 18, shelfLife: 2, desc: 'Good beef, two days at most.' },
  { id: 'chicken', name: 'Chicken', basePrice: 10, shelfLife: 2, desc: 'Fresh chicken from the market.' },
  { id: 'cheese', name: 'Cheese', basePrice: 8, shelfLife: 10, desc: 'Aged cheese, keeps well.' },
  { id: 'bread', name: 'Bread', basePrice: 3, shelfLife: 2, desc: 'Baked daily at the corner bakery.' },
  { id: 'coffee-beans', name: 'Coffee Beans', basePrice: 9, shelfLife: 20, desc: 'Dark roast beans.' },
  { id: 'lettuce', name: 'Lettuce', basePrice: 2, shelfLife: 2, desc: 'Crisp lettuce, wilts quickly.' },
];

export const RESTAURANT_DISHES = [
  { id: 'marina-salad', name: 'Marina Salad', price: 14, ingredients: { tomato: 2, lettuce: 1, cheese: 1 }, cookTime: 8, difficulty: 1, popularity: 0.6, desc: 'Fresh salad with bay tomatoes.' },
  { id: 'grilled-salmon', name: 'Grilled Salmon', price: 32, ingredients: { fish: 1, tomato: 1, lettuce: 1 }, cookTime: 20, difficulty: 3, popularity: 0.85, desc: 'Salmon off the grill, house favourite.' },
  { id: 'fish-chips', name: 'Fish and Chips', price: 18, ingredients: { fish: 1, bread: 1 }, cookTime: 12, difficulty: 1, popularity: 0.8, desc: 'Crispy fish, thick chips, malt vinegar.' },
  { id: 'clam-chowder', name: 'Clam Chowder', price: 16, ingredients: { shrimp: 1, onion: 1, bread: 1 }, cookTime: 15, difficulty: 2, popularity: 0.55, desc: 'Creamy chowder, warm bread on the side.' },
  { id: 'shrimp-pasta', name: 'Shrimp Pasta', price: 26, ingredients: { shrimp: 1, pasta: 1, tomato: 1 }, cookTime: 18, difficulty: 2, popularity: 0.75, desc: 'Pasta tossed with garlic shrimp.' },
  { id: 'burger', name: 'Bay Burger', price: 20, ingredients: { beef: 1, bread: 1, cheese: 1, lettuce: 1 }, cookTime: 14, difficulty: 1, popularity: 0.9, desc: 'A big beef burger with all the trimmings.' },
  { id: 'grilled-chicken', name: 'Grilled Chicken', price: 22, ingredients: { chicken: 1, rice: 1, tomato: 1 }, cookTime: 16, difficulty: 2, popularity: 0.7, desc: 'Char-grilled chicken over rice.' },
  { id: 'veggie-bowl', name: 'Veggie Bowl', price: 15, ingredients: { rice: 1, tomato: 1, onion: 1, lettuce: 1 }, cookTime: 10, difficulty: 1, popularity: 0.5, desc: 'A light bowl of market vegetables.' },
  { id: 'coffee', name: 'Bay Coffee', price: 6, ingredients: { 'coffee-beans': 1 }, cookTime: 3, difficulty: 1, popularity: 0.95, desc: 'Strong dark coffee, the marina wakes up on it.' },
  { id: 'espresso-cake', name: 'Espresso Cake', price: 12, ingredients: { 'coffee-beans': 1, cheese: 1, bread: 1 }, cookTime: 10, difficulty: 2, popularity: 0.65, desc: 'Coffee-soaked cake, a sweet finish.' },
  { id: 'seafood-rice', name: 'Seafood Rice', price: 28, ingredients: { fish: 1, shrimp: 1, rice: 1, onion: 1 }, cookTime: 22, difficulty: 3, popularity: 0.8, desc: 'The catch of the day over saffron rice.' },
  { id: 'cheese-platter', name: 'Cheese Platter', price: 18, ingredients: { cheese: 2, bread: 1, tomato: 1 }, cookTime: 6, difficulty: 1, popularity: 0.45, desc: 'A board of local cheeses and bread.' },
];

export const RESTAURANT_CUSTOMERS = [
  { id: 'regular', name: 'Regular', patience: 120, tip: 0.15, frequency: 0.25, favourite: 'burger', desc: 'Comes every day, orders the usual.' },
  { id: 'tourist', name: 'Tourist', patience: 90, tip: 0.2, frequency: 0.2, favourite: 'fish-chips', desc: 'Hungry after the beach, tips well.' },
  { id: 'critic', name: 'Food Critic', patience: 100, tip: 0.1, frequency: 0.05, favourite: 'grilled-salmon', desc: 'Writes the review that matters.' },
  { id: 'influencer', name: 'Influencer', patience: 80, tip: 0.25, frequency: 0.08, favourite: 'marina-salad', desc: 'Films everything, followers watch.' },
  { id: 'family', name: 'Family', patience: 110, tip: 0.12, frequency: 0.15, favourite: 'seafood-rice', desc: 'Two adults, two kids, one big order.' },
  { id: 'couple', name: 'Couple', patience: 130, tip: 0.18, frequency: 0.12, favourite: 'grilled-chicken', desc: 'A quiet dinner for two.' },
  { id: 'worker', name: 'Dock Worker', patience: 60, tip: 0.05, frequency: 0.1, favourite: 'burger', desc: 'In a hurry, wants it fast and hot.' },
  { id: 'foodie', name: 'Foodie', patience: 140, tip: 0.22, frequency: 0.05, favourite: 'shrimp-pasta', desc: 'Knows the menu better than the staff.' },
];

export const RESTAURANT_UPGRADES = [
  { id: 'tables', name: 'Extra Tables', cost: 400, desc: 'Four more seats for hungry guests.', effect: 'seats' },
  { id: 'patio', name: 'Patio Seating', cost: 600, desc: 'Six seats outside by the water.', effect: 'seats' },
  { id: 'stove', name: 'Pro Stove', cost: 500, desc: 'Cooks everything faster.', effect: 'cook' },
  { id: 'fridge', name: 'Big Fridge', cost: 350, desc: 'Ingredients spoil half as fast.', effect: 'spoil' },
  { id: 'espresso-machine', name: 'Espresso Machine', cost: 450, desc: 'Coffee dishes earn four more.', effect: 'coffee' },
  { id: 'grill', name: 'Charcoal Grill', cost: 550, desc: 'Grilled dishes earn six more.', effect: 'grill' },
  { id: 'neon-sign', name: 'Neon Sign', cost: 250, desc: 'Brings more footfall through the door.', effect: 'footfall' },
  { id: 'sound-system', name: 'Sound System', cost: 200, desc: 'Music that keeps guests lingering.', effect: 'mood' },
];

export const RESTAURANT_STAFF = [
  { id: 'chef', name: 'Chef Marco', role: 'chef', wage: 60, skill: 'cooking', value: 20, desc: 'A fast chef who speeds the whole kitchen.' },
  { id: 'waiter', name: 'Waiter Ana', role: 'waiter', wage: 40, skill: 'serving', value: 15, desc: 'Keeps guests patient while they wait.' },
  { id: 'barista', name: 'Barista Leo', role: 'barista', wage: 45, skill: 'coffee', value: 12, desc: 'Coffee in two seconds flat.' },
  { id: 'host', name: 'Host Bea', role: 'host', wage: 35, skill: 'seating', value: 10, desc: 'Seats guests with a smile.' },
  { id: 'dishwasher', name: 'Dishwasher Sam', role: 'dishwasher', wage: 25, skill: 'cleaning', value: 8, desc: 'Keeps the plates coming.' },
  { id: 'sommelier', name: 'Sommelier Ivy', role: 'sommelier', wage: 55, skill: 'wine', value: 14, desc: 'Pairs the right wine with every dish.' },
];

export const RESTAURANT_RANKS = [
  { level: 0, name: 'Shack', xp: 0, stars: 1, perk: 'A shuttered diner with eight seats.' },
  { level: 1, name: 'Diner', xp: 150, stars: 2, perk: 'Regulars start to show up.' },
  { level: 2, name: 'Bistro', xp: 400, stars: 3, perk: 'Critics take notice.' },
  { level: 3, name: 'Restaurant', xp: 800, stars: 4, perk: 'The guidebooks list you.' },
  { level: 4, name: 'Bay Legend', xp: 1500, stars: 5, perk: 'Five stars, full house, every night.' },
];

export const RESTAURANT_EVENTS = [
  { id: 'festival', name: 'Food Festival', mult: 1.5, desc: 'The whole bay is eating out.' },
  { id: 'rainy-day', name: 'Rainy Day', mult: 0.7, desc: 'Rain keeps the tourists away.' },
  { id: 'inspection', name: 'Health Inspection', mult: 1.0, desc: 'An inspector walks the kitchen.' },
  { id: 'cruise-ship', name: 'Cruise Ship', mult: 1.8, desc: 'A ship docks, a thousand hungry guests.' },
  { id: 'quiet-night', name: 'Quiet Night', mult: 0.8, desc: 'A slow night at the diner.' },
  { id: 'review-boost', name: 'Review Boost', mult: 1.3, desc: 'A glowing review brings a crowd.' },
];

export const RESTAURANT_SPECIALS = [
  { id: 'monday-fish', name: 'Monday Fish', dayOfWeek: 1, dish: 'fish-chips', mult: 1.2, desc: 'Fish and chips, Monday only.' },
  { id: 'wednesday-pasta', name: 'Wednesday Pasta', dayOfWeek: 3, dish: 'shrimp-pasta', mult: 1.25, desc: 'Pasta night, midweek.' },
  { id: 'friday-salmon', name: 'Friday Salmon', dayOfWeek: 5, dish: 'grilled-salmon', mult: 1.3, desc: 'Salmon to start the weekend.' },
  { id: 'sunday-burger', name: 'Sunday Burger', dayOfWeek: 0, dish: 'burger', mult: 1.2, desc: 'Burgers for the Sunday crowd.' },
];

export const RESTAURANT_CATERING = [
  { id: 'office-lunch', name: 'Office Lunch', guests: 20, dishes: 20, pay: 300, days: 2, desc: 'Lunch for a small office.' },
  { id: 'wedding', name: 'Wedding Feast', guests: 80, dishes: 80, pay: 1500, days: 5, desc: 'A full wedding dinner.' },
  { id: 'birthday', name: 'Birthday Party', guests: 30, dishes: 30, pay: 450, days: 2, desc: 'A birthday spread for thirty.' },
  { id: 'boat-party', name: 'Boat Party', guests: 40, dishes: 40, pay: 700, days: 3, desc: 'Food for a yacht party.' },
  { id: 'market-stall', name: 'Market Stall', guests: 60, dishes: 60, pay: 900, days: 3, desc: 'A stall at the weekend market.' },
  { id: 'school-lunch', name: 'School Lunch', guests: 50, dishes: 50, pay: 600, days: 2, desc: 'Lunch for the school trip.' },
  { id: 'gala-dinner', name: 'Gala Dinner', guests: 100, dishes: 100, pay: 2200, days: 6, desc: 'The mayor’s gala dinner.' },
  { id: 'picnic', name: 'Beach Picnic', guests: 15, dishes: 15, pay: 200, days: 1, desc: 'A simple picnic, fast money.' },
];

export const RESTAURANT_REVIEWS = [
  { stars: 5, text: 'The best salmon on the whole bay, I dream about it.', author: 'Marta K.' },
  { stars: 4, text: 'Lovely food, a little slow at lunch, worth the wait.', author: 'Jon P.' },
  { stars: 3, text: 'Good enough, nothing to write home about.', author: 'Sam T.' },
  { stars: 2, text: 'Cold chips and a long wait, not coming back soon.', author: 'Lee R.' },
  { stars: 1, text: 'Terrible. My order never arrived.', author: 'Pat D.' },
  { stars: 5, text: 'Five stars, the burger alone is worth the trip.', author: 'Ana G.' },
  { stars: 4, text: 'Great coffee and a warm welcome every morning.', author: 'Ben W.' },
  { stars: 5, text: 'A hidden gem by the marina, book ahead.', author: 'Rosa L.' },
];

export const RESTAURANT_DELIVERY_ZONES = [
  { id: 'marina', name: 'Marina', fee: 5, time: 10, desc: 'Right next door.' },
  { id: 'downtown', name: 'Downtown', fee: 8, time: 20, desc: 'A short ride into town.' },
  { id: 'beach', name: 'Beach', fee: 10, time: 25, desc: 'Down the coast road.' },
  { id: 'suburbs', name: 'Suburbs', fee: 12, time: 30, desc: 'Out past the ring road.' },
  { id: 'harbour', name: 'Harbour', fee: 9, time: 22, desc: 'Through the docks.' },
  { id: 'hills', name: 'Hills', fee: 15, time: 40, desc: 'A long climb up the hill.' },
];

export const RESTAURANT_SEASONAL_MENUS = [
  { id: 'spring-menu', name: 'Spring Menu', dishes: ['marina-salad', 'lettuce-strawberry', 'veggie-bowl'], mult: 1.2, desc: 'Light spring dishes.' },
  { id: 'summer-menu', name: 'Summer Menu', dishes: ['grilled-salmon', 'fish-chips', 'seafood-rice'], mult: 1.3, desc: 'The catch of the summer.' },
  { id: 'autumn-menu', name: 'Autumn Menu', dishes: ['clam-chowder', 'mango', 'pumpkin-pie'], mult: 1.15, desc: 'Warm bowls for cool nights.' },
  { id: 'winter-menu', name: 'Winter Menu', dishes: ['burger', 'grilled-chicken', 'espresso-cake'], mult: 1.1, desc: 'Hearty winter plates.' },
];

export const RESTAURANT_WINE_LIST = [
  { id: 'house-red', name: 'House Red', cost: 8, price: 22, desc: 'A soft red from the hills.' },
  { id: 'house-white', name: 'House White', cost: 7, price: 20, desc: 'Crisp and cold.' },
  { id: 'bay-rose', name: 'Bay Rosé', cost: 9, price: 25, desc: 'Pink as a sunset over the water.' },
  { id: 'sparkling', name: 'Sparkling', cost: 15, price: 40, desc: 'For celebrations.' },
  { id: 'reserve-red', name: 'Reserve Red', cost: 25, price: 70, desc: 'The cellar’s best bottle.' },
];

export const RESTAURANT_ALLERGENS = [
  { id: 'shellfish', name: 'Shellfish', dishes: ['shrimp-pasta', 'seafood-rice', 'clam-chowder'], desc: 'Shrimp and shellfish dishes.' },
  { id: 'gluten', name: 'Gluten', dishes: ['burger', 'fish-chips', 'espresso-cake'], desc: 'Bread and pasta dishes.' },
  { id: 'dairy', name: 'Dairy', dishes: ['marina-salad', 'cheese-platter', 'espresso-cake'], desc: 'Cheese and cream dishes.' },
  { id: 'nuts', name: 'Nuts', dishes: ['espresso-cake'], desc: 'The cake has a nut crumb.' },
];

export const RESTAURANT_TIPS = [
  { id: 'tip-ingredients', name: 'Buy Fresh', tip: 'Fish spoils in a day, buy only what you can cook.' },
  { id: 'tip-critics', name: 'Mind Critics', tip: 'A happy critic lifts your stars, an unhappy one cuts them.' },
  { id: 'tip-waiter', name: 'Hire a Waiter', tip: 'A waiter keeps seated guests patient for longer.' },
  { id: 'tip-prices', name: 'Price Smart', tip: 'Menu prices between five and one hundred twenty only.' },
  { id: 'tip-rush', name: 'Lunch Rush', tip: 'Lunch is the busiest window, staff up for it.' },
  { id: 'tip-events', name: 'Nightly Events', tip: 'Each night brings a new event that shifts footfall.' },
  { id: 'tip-comp', name: 'Comp When Needed', tip: 'A comped dish turns a complaint into a compliment.' },
  { id: 'tip-stars', name: 'Stars Drift', tip: 'Stars drift toward your service record every morning.' },
];

export const RESTAURANT_AWARDS = [
  { id: 'first-serve', name: 'First Serve', need: 'servedTotal', goal: 1, desc: 'Serve your first dish.' },
  { id: 'twenty-dishes', name: 'Twenty Dishes', need: 'servedTotal', goal: 20, desc: 'Serve twenty dishes.' },
  { id: 'three-stars', name: 'Three Stars', need: 'stars', goal: 3, desc: 'Reach three stars.' },
  { id: 'regulars-ten', name: 'Ten Regulars', need: 'regulars', goal: 10, desc: 'Seat ten regulars.' },
  { id: 'perfect-week', name: 'Perfect Week', need: 'perfectDays', goal: 7, desc: 'Seven perfect days.' },
];

export const RESTAURANT_RECORDS = [
  { id: 'served', name: 'Dishes Served', field: 'servedTotal', unit: 'dishes', desc: 'All dishes served.' },
  { id: 'earned', name: 'Total Earned', field: 'earned', unit: 'cash', desc: 'All cash earned.' },
  { id: 'compliments', name: 'Compliments', field: 'compliments', unit: 'notes', desc: 'All compliments received.' },
  { id: 'tables', name: 'Tables Turned', field: 'tablesTurned', unit: 'tables', desc: 'All tables turned.' },
  { id: 'stars', name: 'Stars', field: 'stars', unit: 'stars', desc: 'Current star rating.' },
];

export const RESTAURANT_SEASONAL_EVENTS = [
  { id: 'spring-fest', name: 'Spring Festival', season: 'spring', mult: 1.3, desc: 'The spring food festival.' },
  { id: 'summer-rush', name: 'Summer Rush', season: 'summer', mult: 1.5, desc: 'Tourist season peaks.' },
  { id: 'autumn-harvest', name: 'Autumn Harvest', season: 'autumn', mult: 1.2, desc: 'Harvest menus everywhere.' },
  { id: 'winter-quiet', name: 'Winter Quiet', season: 'winter', mult: 0.8, desc: 'Cold nights, empty tables.' },
];

export const RESTAURANT_QUICK_START = [
  'Buy the diner, then open it for lunch.',
  'Buy ingredients every morning before the rush.',
  'Seat customers, take orders, cook and serve.',
  'Keep critics happy, they move your stars.',
  'Hire staff to keep the kitchen moving.',
  'Take catering gigs for big paydays.',
];

export const RESTAURANT_META = {
  system: 'restaurant',
  version: '7b-B',
  author: 'builder-B',
  files: 1,
  lines: 972,
  features: ['cooking', 'serving', 'menu', 'staff', 'catering', 'reviews'],
};

function findDish(id) { return RESTAURANT_DISHES.find((d) => d.id === id); }
function findIngredient(id) { return RESTAURANT_INGREDIENTS.find((i) => i.id === id); }
function findCustomer(id) { return RESTAURANT_CUSTOMERS.find((c) => c.id === id); }
function coffeeBonus(dish, upgrades) {
  return dish.id === 'coffee' && upgrades.includes('espresso-machine') ? 4 : 0;
}
function grillBonus(dish, upgrades) {
  const grilled = ['grilled-salmon', 'grilled-chicken'];
  return grilled.includes(dish.id) && upgrades.includes('grill') ? 6 : 0;
}

export function restaurantRankFor(xp) {
  let out = 0;
  for (const r of RESTAURANT_RANKS) if (xp >= r.xp) out = r.level;
  return out;
}

export function restaurantDishCost(dish, prices) {
  let cost = 0;
  for (const [ing, qty] of Object.entries(dish.ingredients)) cost += (prices[ing] || 0) * qty;
  return Math.round(cost * 10) / 10;
}

export function restaurantDishMargin(dish, prices, upgrades) {
  const cost = restaurantDishCost(dish, prices);
  let margin = dish.price - cost;
  margin += coffeeBonus(dish, upgrades || []);
  margin += grillBonus(dish, upgrades || []);
  return Math.round(margin * 10) / 10;
}

export function restaurantRatingDelta(stars, served, complaints) {
  const total = served + complaints;
  const target = total > 0 ? 1 + (served / total) * 4 : stars;
  return Math.round((target - stars) * 0.1 * 100) / 100;
}

export function restaurantSpecialFor(dayOfWeek) {
  const dow = ((dayOfWeek % 7) + 7) % 7;
  return RESTAURANT_SPECIALS.find((s) => s.dayOfWeek === dow) || null;
}

export function restaurantHealthScore(complaints, served, spoiled) {
  if (!served) return 100;
  return Math.max(0, Math.round(100 - (complaints / served) * 100 - spoiled * 2));
}

export function restaurantRushFactor(hour) {
  if (hour >= 12 && hour < 15) return 1.8;
  if (hour >= 18 && hour < 22) return 1.6;
  if (hour >= 7 && hour < 11) return 1.2;
  return 0.7;
}

export function restaurantTipFor(price, customerTypeId, happy) {
  if (!happy) return 0;
  const c = findCustomer(customerTypeId);
  if (!c) return 0;
  return Math.round(price * c.tip);
}

export function restaurantCateringPay(gig, dishesReady, guestsServed) {
  if (dishesReady < gig.dishes) return 0;
  return Math.round(gig.pay * (guestsServed / gig.guests));
}

export function restaurantReviewFor(stars) {
  const pool = RESTAURANT_REVIEWS.filter((r) => r.stars === stars);
  if (!pool.length) return RESTAURANT_REVIEWS[4];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function restaurantDeliveryFee(zoneId, total) {
  const z = RESTAURANT_DELIVERY_ZONES.find((x) => x.id === zoneId);
  if (!z) return 0;
  return Math.round(z.fee + total * 0.05);
}

export function restaurantSeasonalBonus(menuId, dishId) {
  const menu = RESTAURANT_SEASONAL_MENUS.find((m) => m.id === menuId);
  if (!menu) return 1;
  return menu.dishes.includes(dishId) ? menu.mult : 1;
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
  if (!seats || !hours) return 0;
  return Math.round((served / seats / hours) * 100) / 100;
}

export function restaurantFoodCostPercent(costs, revenue) {
  if (!revenue) return 0;
  return Math.round((costs / revenue) * 100);
}

export function restaurantStaffTipPool(tips, staffCount) {
  if (!staffCount) return tips;
  return Math.round(tips / staffCount);
}

export function restaurantDailyTip(day) {
  return RESTAURANT_TIPS[((day % RESTAURANT_TIPS.length) + RESTAURANT_TIPS.length) % RESTAURANT_TIPS.length];
}

export function restaurantAwardProgress(awardId, state) {
  const a = RESTAURANT_AWARDS.find((x) => x.id === awardId);
  if (!a) return null;
  const current = state[a.need] || 0;
  return { id: a.id, name: a.name, current, goal: a.goal, done: current >= a.goal };
}

export function restaurantRushReadiness(cooking, seated, seats) {
  const load = seats ? (cooking + seated) / seats : 0;
  if (load > 1) return 'overloaded';
  if (load > 0.7) return 'busy';
  if (load > 0.3) return 'steady';
  return 'quiet';
}

export function restaurantDailyProfit(revenue, costs, wages) {
  return Math.round((revenue - costs - wages) * 10) / 10;
}

export function restaurantPopularDish(dishesServed) {
  const keys = Object.keys(dishesServed || {});
  if (!keys.length) return null;
  let best = keys[0];
  for (const k of keys) if (dishesServed[k] > dishesServed[best]) best = k;
  return { dish: best, count: dishesServed[best] };
}

export function restaurantWaitTimeEstimate(queue, seats) {
  if (!queue) return 0;
  return Math.ceil(queue / Math.max(1, seats)) * 8;
}

export function restaurantRecordFor(recordId, state) {
  const rec = RESTAURANT_RECORDS.find((r) => r.id === recordId);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: state[rec.field] || 0, unit: rec.unit };
}

export function restaurantAllRecords(state) {
  return RESTAURANT_RECORDS.map((r) => ({ id: r.id, name: r.name, value: state[r.field] || 0, unit: r.unit, desc: r.desc }));
}

export function restaurantSatisfaction(compliments, complaints) {
  const total = compliments + complaints;
  if (!total) return 100;
  return Math.round((compliments / total) * 100);
}

export function restaurantRevenuePerSeat(revenue, seats) {
  if (!seats) return 0;
  return Math.round((revenue / seats) * 10) / 10;
}

export function restaurantChefGrade(served, complaints, stars) {
  const sat = restaurantSatisfaction(served, complaints);
  if (sat >= 90 && stars >= 4.5) return 'S';
  if (sat >= 75 && stars >= 4) return 'A';
  if (sat >= 60 && stars >= 3) return 'B';
  if (sat >= 40) return 'C';
  return 'D';
}

export function restaurantSeasonalEvent(seasonId) {
  return RESTAURANT_SEASONAL_EVENTS.find((e) => e.season === seasonId) || null;
}

export function restaurantSeasonalMult(seasonId) {
  const ev = restaurantSeasonalEvent(seasonId);
  return ev ? ev.mult : 1;
}

export function restaurantCoverCount(seated, queue) {
  return seated + queue;
}

export function restaurantAverageSpend(revenue, served) {
  if (!served) return 0;
  return Math.round((revenue / served) * 10) / 10;
}

export function restaurantQuickStart(step) {
  if (step < 0 || step >= RESTAURANT_QUICK_START.length) return null;
  return RESTAURANT_QUICK_START[step];
}

export function restaurantTotalValue(state) {
  return state.upgrades.length * 400 + state.staff.length * 200;
}

export function restaurantProgressPercent(state) {
  if (!state.servedTotal) return 0;
  return Math.round((state.compliments / state.servedTotal) * 1000) / 10;
}

export function restaurantSummary(state) {
  const rankName = RESTAURANT_RANKS[state.rank].name;
  return `${rankName} Ria runs a ${state.stars}-star diner, served ${state.servedTotal} dishes, earned ${Math.round(state.earned)} and won ${state.compliments} compliments.`;
}

export function restaurantNextGoal(state) {
  if (!state.owned) return 'Buy the diner to hit your first goal.';
  if (state.servedTotal < 20) return 'Serve 20 dishes to hit your next goal.';
  if (state.stars < 3) return 'Reach 3 stars to hit your next goal.';
  return 'Earn the fifth star to hit your final goal.';
}

export function restaurantMeta() {
  return { ...RESTAURANT_META, features: [...RESTAURANT_META.features] };
}

export function createRestaurantSystem(ctx) {
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

  const zeroIngredients = () => {
    const m = {};
    for (const i of RESTAURANT_INGREDIENTS) m[i.id] = 0;
    return m;
  };
  const basePrices = () => {
    const m = {};
    for (const i of RESTAURANT_INGREDIENTS) m[i.id] = i.basePrice;
    return m;
  };
  const zeroDishes = () => {
    const m = {};
    for (const d of RESTAURANT_DISHES) m[d.id] = 0;
    return m;
  };
  const baseMenu = () => {
    const m = {};
    for (const d of RESTAURANT_DISHES) m[d.id] = d.price;
    return m;
  };

  const state = {
    xp: 0, rank: 0, stars: 1, owned: false, open: false, seats: 8, seated: [],
    queue: [], cooking: [], servedToday: 0, servedTotal: 0, complaints: 0,
    compliments: 0, tips: 0, earned: 0, spent: 0, ingredients: zeroIngredients(),
    prices: basePrices(), upgrades: [], staff: [], menuPrices: baseMenu(),
    dishesCooked: zeroDishes(), dishesServed: zeroDishes(), bestDish: null,
    bestDishCount: 0, ratingHistory: [], lastDay: 1, dailyRevenue: 0, dailyCosts: 0,
    rushHour: false, event: null, eventMult: 1, inspection: 0, spoiled: 0,
    regulars: 0, criticsServed: 0, fiveStarDays: 0, perfectDays: 0, tablesTurned: 0,
  };

  function refreshRank() {
    const next = restaurantRankFor(state.xp);
    if (next > state.rank) state.rank = next;
  }
  function gainXp(n) { state.xp += n; refreshRank(); }
  function fail(reason) { return { ok: false, reason }; }
  function hasUpgrade(id) { return state.upgrades.includes(id); }
  function hasStaff(id) { return state.staff.includes(id); }
  function seatCapacity() {
    let cap = state.seats;
    if (hasUpgrade('tables')) cap += 4;
    if (hasUpgrade('patio')) cap += 6;
    return cap;
  }
  function footfallMult() {
    let mult = 1;
    if (hasUpgrade('neon-sign')) mult += 0.2;
    mult *= state.eventMult;
    mult *= 0.7 + state.stars * 0.15;
    return mult;
  }
  function seatNextQueued() {
    if (!state.queue.length) return;
    if (state.seated.length >= seatCapacity()) return;
    const next = state.queue.shift();
    const type = findCustomer(next.type);
    state.seated.push({ type: next.type, dish: null, waited: 0, patience: type.patience });
    if (next.type === 'regular') state.regulars += 1;
    if (next.type === 'critic') state.criticsServed += 1;
  }

  function buyRestaurant() {
    if (state.owned) return fail('already owned');
    if (getCash() < 2000) return fail('not enough cash');
    addCash(-2000);
    state.spent += 2000;
    state.owned = true;
    return { ok: true, cost: 2000 };
  }

  function openRestaurant() {
    if (!state.owned) return fail('restaurant not owned');
    if (state.open) return fail('already open');
    state.open = true;
    const hour = getHour();
    state.rushHour = hour >= 12 && hour < 15;
    return { ok: true };
  }

  function closeRestaurant() {
    if (!state.open) return fail('not open');
    state.open = false;
    const unserved = state.seated.length + state.queue.length;
    state.complaints += unserved;
    state.seated = [];
    state.queue = [];
    state.cooking = [];
    return { ok: true, servedToday: state.servedToday, revenue: Math.round(state.dailyRevenue) };
  }

  function buyIngredient(ingredientId, qty) {
    const ing = findIngredient(ingredientId);
    if (!ing) return fail('unknown ingredient');
    if (!qty || qty <= 0) return fail('bad quantity');
    const cost = Math.round(state.prices[ingredientId] * qty);
    if (getCash() < cost) return fail('not enough cash');
    addCash(-cost);
    state.spent += cost;
    state.dailyCosts += cost;
    state.ingredients[ingredientId] += qty;
    return { ok: true, id: ingredientId, quantity: qty, cost };
  }

  function setMenuPrice(dishId, price) {
    if (!findDish(dishId)) return fail('unknown dish');
    if (price < 5 || price > 120) return fail('price out of range');
    state.menuPrices[dishId] = price;
    return { ok: true, dish: dishId, price };
  }

  function seatCustomer(typeId) {
    if (!state.open) return fail('restaurant not open');
    const type = findCustomer(typeId);
    if (!type) return fail('unknown customer type');
    if (state.seated.length < seatCapacity()) {
      state.seated.push({ type: typeId, dish: null, waited: 0, patience: type.patience });
      if (typeId === 'regular') state.regulars += 1;
      if (typeId === 'critic') state.criticsServed += 1;
      return { ok: true, queued: false, seated: state.seated.length };
    }
    state.queue.push({ type: typeId, patience: type.patience });
    return { ok: true, queued: true, position: state.queue.length };
  }

  function spawnCustomers(count) {
    let seated = 0;
    let queued = 0;
    for (let i = 0; i < count; i++) {
      const roll = rng();
      let acc = 0;
      let picked = RESTAURANT_CUSTOMERS[RESTAURANT_CUSTOMERS.length - 1];
      for (const c of RESTAURANT_CUSTOMERS) {
        acc += c.frequency;
        if (roll <= acc) { picked = c; break; }
      }
      const res = seatCustomer(picked.id);
      if (!res.ok) break;
      if (res.queued) queued += 1;
      else seated += 1;
    }
    return { ok: true, seated, queued };
  }

  function takeOrder(seatIdx) {
    const seat = state.seated[seatIdx];
    if (!seat) return fail('no customer at that seat');
    if (seat.dish) return fail('already ordered');
    const type = findCustomer(seat.type);
    let dish;
    if (rng() < 0.6) {
      dish = findDish(type.favourite);
    } else {
      const popular = RESTAURANT_DISHES.filter((d) => d.popularity >= 0.5);
      dish = popular[Math.floor(rng() * popular.length)];
    }
    seat.dish = dish.id;
    seat.waited = 0;
    return { ok: true, seat: seatIdx, dish: dish.id, customer: seat.type };
  }

  function canCook(dishId) {
    const dish = findDish(dishId);
    if (!dish) return fail('unknown dish');
    for (const [ing, qty] of Object.entries(dish.ingredients)) {
      if ((state.ingredients[ing] || 0) < qty) return fail(`missing ${ing}`);
    }
    return { ok: true, dish };
  }

  function cookDish(dishId, seatIdx) {
    const check = canCook(dishId);
    if (!check.ok) return check;
    const dish = check.dish;
    for (const [ing, qty] of Object.entries(dish.ingredients)) state.ingredients[ing] -= qty;
    let time = dish.cookTime;
    if (hasUpgrade('stove')) time *= 0.8;
    if (hasStaff('chef') && state.cooking.length > 0) time *= 0.9;
    if (dish.id === 'coffee' && hasStaff('barista')) time = 2;
    state.cooking.push({ dish: dishId, seat: seatIdx, timeLeft: time, total: time });
    state.dishesCooked[dishId] += 1;
    return { ok: true, dish: dishId, cookTime: Math.round(time * 10) / 10 };
  }

  function serveDish(seatIdx) {
    const seat = state.seated[seatIdx];
    if (!seat) return fail('no customer at that seat');
    if (!seat.dish) return fail('no order at that seat');
    const bySeat = state.cooking.find((j) => j.seat === seatIdx);
    const job = state.cooking.find((j) => j.dish === seat.dish && j.timeLeft <= 0);
    if (!job) return fail('dish not ready yet');
    state.cooking = state.cooking.filter((j) => j !== job);
    const dish = findDish(seat.dish);
    const price = state.menuPrices[dish.id] + coffeeBonus(dish, state.upgrades) + grillBonus(dish, state.upgrades);
    const happy = seat.waited < seat.patience / 2;
    const tip = happy ? restaurantTipFor(price, seat.type, true) : 0;
    addCash(price + tip);
    state.earned += price;
    state.tips += tip;
    state.dailyRevenue += price + tip;
    state.servedToday += 1;
    state.servedTotal += 1;
    state.tablesTurned += 1;
    state.dishesServed[dish.id] += 1;
    if (state.dishesServed[dish.id] > state.bestDishCount) {
      state.bestDishCount = state.dishesServed[dish.id];
      state.bestDish = dish.id;
    }
    gainXp(10);
    if (seat.type === 'critic') {
      if (happy) state.stars = Math.min(5, state.stars + 0.2);
      else state.stars = Math.max(1, state.stars - 0.3);
    }
    if (seat.type === 'influencer' && happy) gainXp(15);
    state.seated.splice(seatIdx, 1);
    seatNextQueued();
    return { ok: true, dish: dish.id, price, tip, total: price + tip, happy };
  }

  function compDish(seatIdx) {
    const seat = state.seated[seatIdx];
    if (!seat) return fail('no customer at that seat');
    if (!seat.dish) return fail('no order at that seat');
    const job = state.cooking.find((j) => j.dish === seat.dish && j.timeLeft <= 0);
    if (!job) return fail('dish not ready yet');
    state.cooking = state.cooking.filter((j) => j !== job);
    state.complaints = Math.max(0, state.complaints - 1);
    state.compliments += 1;
    gainXp(5);
    state.seated.splice(seatIdx, 1);
    seatNextQueued();
    return { ok: true, comped: true };
  }

  function buyUpgrade(upgradeId) {
    const up = RESTAURANT_UPGRADES.find((u) => u.id === upgradeId);
    if (!up) return fail('unknown upgrade');
    if (hasUpgrade(upgradeId)) return fail('already owned');
    if (!state.owned) return fail('restaurant not owned');
    if (getCash() < up.cost) return fail('not enough cash');
    addCash(-up.cost);
    state.spent += up.cost;
    state.upgrades.push(upgradeId);
    if (upgradeId === 'tables') state.seats += 4;
    if (upgradeId === 'patio') state.seats += 6;
    gainXp(20);
    return { ok: true, id: upgradeId };
  }

  function hireStaff(staffId) {
    const s = RESTAURANT_STAFF.find((x) => x.id === staffId);
    if (!s) return fail('unknown staff');
    if (hasStaff(staffId)) return fail('already hired');
    state.staff.push(staffId);
    return { ok: true, id: staffId };
  }

  function fireStaff(staffId) {
    if (!hasStaff(staffId)) return fail('not hired');
    state.staff = state.staff.filter((x) => x !== staffId);
    return { ok: true, id: staffId };
  }

  function tick(dt) {
    if (!state.open) return;
    for (const job of state.cooking) job.timeLeft -= dt;
    const drain = hasStaff('waiter') ? 1 : 1.5;
    for (let i = state.seated.length - 1; i >= 0; i--) {
      const seat = state.seated[i];
      seat.waited += dt;
      seat.patience -= dt * drain;
      if (seat.patience <= 0) {
        state.complaints += 1;
        if (seat.type === 'critic') state.stars = Math.max(1, state.stars - 0.2);
        log(`A ${seat.type} walked out, too long a wait.`);
        state.seated.splice(i, 1);
        seatNextQueued();
      }
    }
    for (let i = state.queue.length - 1; i >= 0; i--) {
      const entry = state.queue[i];
      entry.patience -= dt * drain;
      if (entry.patience <= 0) {
        state.complaints += 1;
        state.queue.splice(i, 1);
      }
    }
    if (rng() < dt * 0.05 * footfallMult()) spawnCustomers(1);
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    const delta = restaurantRatingDelta(state.stars, state.servedToday, state.complaints);
    state.stars = Math.max(1, Math.min(5, state.stars + delta));
    if (state.servedToday > 0) {
      state.ratingHistory.push({ day, stars: state.stars });
      if (state.ratingHistory.length > 14) state.ratingHistory = state.ratingHistory.slice(-14);
    }
    if (state.stars >= 5) state.fiveStarDays += 1;
    if (state.complaints === 0 && state.servedToday > 0) state.perfectDays += 1;
    let wages = 0;
    for (const id of state.staff) {
      const s = RESTAURANT_STAFF.find((x) => x.id === id);
      if (s) wages += s.wage;
    }
    if (wages > 0) {
      addCash(-wages);
      state.spent += wages;
      state.dailyCosts += wages;
    }
    const spoilRate = hasUpgrade('fridge') ? 0.1 : 0.2;
    for (const ing of RESTAURANT_INGREDIENTS) {
      if (ing.shelfLife <= 2 && state.ingredients[ing.id] > 0 && rng() < spoilRate) {
        state.ingredients[ing.id] -= 1;
        state.spoiled += 1;
      }
    }
    for (const ing of RESTAURANT_INGREDIENTS) {
      state.prices[ing.id] = Math.round(ing.basePrice * (0.8 + rng() * 0.4) * 10) / 10;
    }
    const event = RESTAURANT_EVENTS[Math.floor(rng() * RESTAURANT_EVENTS.length)];
    state.event = event.id;
    state.eventMult = event.mult;
    if (event.id === 'inspection') state.inspection += 1;
    log(`Tonight: ${event.name}.`);
    state.servedToday = 0;
    state.dailyRevenue = 0;
    state.dailyCosts = 0;
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
      rank: RESTAURANT_RANKS[state.rank].name, xp: state.xp,
      stars: Math.round(state.stars * 10) / 10, owned: state.owned, open: state.open,
      seats: seatCapacity(), seated: state.seated.length, queue: state.queue.length,
      cooking: state.cooking.length, servedToday: state.servedToday,
      servedTotal: state.servedTotal, complaints: state.complaints,
      compliments: state.compliments, tips: Math.round(state.tips),
      earned: Math.round(state.earned), spent: state.spent,
      upgrades: state.upgrades.length, staff: state.staff.length,
      bestDish: state.bestDish, bestDishCount: state.bestDishCount,
      dailyRevenue: Math.round(state.dailyRevenue), event: state.event,
      regulars: state.regulars, criticsServed: state.criticsServed,
      fiveStarDays: state.fiveStarDays, perfectDays: state.perfectDays,
      tablesTurned: state.tablesTurned, spoiled: state.spoiled,
    };
  }

  function hudLine() {
    if (!state.owned) return '';
    if (!state.open) return 'The kitchen is closed, press interact at the diner to open.';
    return `Seated ${state.seated.length}/${seatCapacity()}, ${state.cooking.length} cooking, ${state.queue.length} waiting, ${state.stars.toFixed(1)} stars.`;
  }

  function interact() {
    const pos = getPlayerPos() || {};
    const dx = (pos.x || 0) - (-20);
    const dz = (pos.z || 0) - (-110);
    if (Math.sqrt(dx * dx + dz * dz) > 25) return false;
    if (!state.owned) { buyRestaurant(); return true; }
    if (!state.open) { openRestaurant(); return true; }
    if (state.seated[0] && !state.seated[0].dish) { takeOrder(0); return true; }
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
    return RESTAURANT_INGREDIENTS.map((i) => ({
      id: i.id, name: i.name, qty: state.ingredients[i.id],
      price: state.prices[i.id], shelfLife: i.shelfLife,
    }));
  }

  return {
    state, buyRestaurant, openRestaurant, closeRestaurant, buyIngredient, setMenuPrice,
    seatCustomer, spawnCustomers, takeOrder, canCook, cookDish, serveDish, compDish,
    buyUpgrade, hireStaff, fireStaff, tick, tickDay, serialize, deserialize, stats,
    hudLine, interact, menu, pantry, seatCapacity, footfallMult,
  };
}

export function createRestaurantCatering(system) {
  const st = system.state;
  let activeGig = null;
  let gigsDone = 0;
  let gigsEarned = 0;
  let deliveriesDone = 0;
  let deliveriesEarned = 0;
  let reviews = [];

  function fail(reason) { return { ok: false, reason }; }

  function takeGig(gigId) {
    const gig = RESTAURANT_CATERING.find((g) => g.id === gigId);
    if (!gig) return fail('unknown gig');
    if (activeGig) return fail('gig already active');
    if (gig.guests > 50 && st.rank < 1) return fail('rank too low for this gig');
    activeGig = { ...gig, dayTaken: st.lastDay };
    return { ok: true, gig: gigId, guests: gig.guests, pay: gig.pay };
  }

  function completeGig() {
    if (!activeGig) return fail('no active gig');
    const dishesReady = st.servedToday;
    const guestsServed = Math.min(activeGig.guests, st.servedToday);
    const pay = restaurantCateringPay(activeGig, dishesReady, guestsServed);
    gigsDone += 1;
    gigsEarned += pay;
    const gig = activeGig;
    activeGig = null;
    return { ok: true, gig: gig.id, pay, guestsServed };
  }

  function deliverOrder(zoneId, dishIds) {
    const zone = RESTAURANT_DELIVERY_ZONES.find((z) => z.id === zoneId);
    if (!zone) return fail('unknown zone');
    let total = 0;
    for (const id of dishIds || []) total += st.menuPrices[id] || 0;
    const fee = restaurantDeliveryFee(zoneId, total);
    const pay = total + fee;
    deliveriesDone += 1;
    deliveriesEarned += pay;
    return { ok: true, zone: zoneId, total, fee, pay, time: zone.time };
  }

  function addReview(stars) {
    const review = restaurantReviewFor(stars);
    reviews.push(review);
    if (reviews.length > 20) reviews = reviews.slice(-20);
    return { ok: true, review };
  }

  function cateringRecord() {
    return {
      gig: activeGig ? activeGig.id : null, gigsDone, gigsEarned,
      deliveriesDone, deliveriesEarned, reviews: reviews.length,
    };
  }

  return {
    takeGig, completeGig, deliverOrder, addReview, cateringRecord,
    get gigs() { return gigsDone; },
    get reviews() { return [...reviews]; },
  };
}
