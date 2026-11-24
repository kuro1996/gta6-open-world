// Rex — companion dog: adopt, feed, train, fetch, guard and level up.
// Round 7, all-new system. A stray mutt at the harbor follows you home
// if you feed him. Rex is not decoration: he fetches dropped cash, sniffs
// out contraband the cops miss, guards you while you sleep, digs up
// buried loot on the beach, and learns tricks that open new jobs. Keep
// him fed, keep him happy, and he will keep you alive — a maxed-out Rex
// is worth more than a second gun.
export const PET_SHELTER = { id: 'harbor-shelter', name: 'Harbor Animal Shelter', x: -170, z: 110, district: 'Harbor' };

export const PET_BREEDS = [
  { id: 'mutt', name: 'Harbor Mutt', price: 0, baseLoyalty: 30, baseSpeed: 6, baseSmell: 5, desc: 'A scruffy stray with a good nose.' },
  { id: 'shepherd', name: 'German Shepherd', price: 400, baseLoyalty: 50, baseSpeed: 8, baseSmell: 8, desc: 'Loyal, fast, built to guard.' },
  { id: 'pitbull', name: 'Pit Bull', price: 350, baseLoyalty: 45, baseSpeed: 7, baseSmell: 4, desc: 'All muscle, all heart.' },
  { id: 'husky', name: 'Husky', price: 500, baseLoyalty: 40, baseSpeed: 9, baseSmell: 6, desc: 'Fastest paws in Solara.' },
  { id: 'beagle', name: 'Beagle', price: 300, baseLoyalty: 45, baseSpeed: 6, baseSmell: 10, desc: 'Can smell a dollar from a mile away.' },
  { id: 'doberman', name: 'Doberman', price: 550, baseLoyalty: 55, baseSpeed: 8, baseSmell: 7, desc: 'A bodyguard with four legs.' },
];

export const PET_FOODS = [
  { id: 'kibble', name: 'Kibble', price: 5, hunger: 25, happiness: 5, health: 2 },
  { id: 'treat', name: 'Dog Treats', price: 8, hunger: 10, happiness: 20, health: 1 },
  { id: 'steak', name: 'Steak Dinner', price: 25, hunger: 60, happiness: 25, health: 10 },
  { id: 'bone', name: 'Marrow Bone', price: 12, hunger: 15, happiness: 30, health: 3 },
  { id: 'fish', name: 'Fresh Fish', price: 15, hunger: 40, happiness: 15, health: 8 },
  { id: 'vet-meal', name: 'Vet Meal', price: 40, hunger: 50, happiness: 10, health: 30 },
];

export const PET_TRICKS = [
  { id: 'sit', name: 'Sit', level: 1, trainTime: 20, desc: 'The basics. Every good dog sits.' },
  { id: 'fetch', name: 'Fetch', level: 1, trainTime: 30, desc: 'Rex brings back what you throw — and what others drop.' },
  { id: 'shake', name: 'Shake', level: 2, trainTime: 25, desc: 'A paw shake charms strangers and clients.' },
  { id: 'roll', name: 'Roll Over', level: 2, trainTime: 35, desc: 'Crowd-pleaser. Tips at the boardwalk.' },
  { id: 'play-dead', name: 'Play Dead', level: 3, trainTime: 40, desc: 'Oscar-worthy. Distracts guards.' },
  { id: 'sniff', name: 'Sniff Contraband', level: 3, trainTime: 50, desc: 'Rex finds hidden stashes and dropped cash.' },
  { id: 'guard', name: 'Guard', level: 4, trainTime: 60, desc: 'Rex watches your back — attackers think twice.' },
  { id: 'attack', name: 'Attack', level: 5, trainTime: 80, desc: 'On command, Rex takes down a threat.' },
  { id: 'dig', name: 'Dig', level: 4, trainTime: 55, desc: 'Rex digs up buried loot on beaches and lots.' },
  { id: 'track', name: 'Track Scent', level: 5, trainTime: 70, desc: 'Follow a scent trail to a target.' },
];

export const PET_TOYS = [
  { id: 'ball', name: 'Tennis Ball', price: 6, happiness: 15, durability: 20 },
  { id: 'rope', name: 'Rope Toy', price: 10, happiness: 20, durability: 30 },
  { id: 'frisbee', name: 'Frisbee', price: 12, happiness: 25, durability: 15 },
  { id: 'squeaky', name: 'Squeaky Toy', price: 8, happiness: 18, durability: 10 },
  { id: 'vest', name: 'K9 Vest', price: 80, happiness: 5, durability: 100, armor: true },
  { id: 'collar-gold', name: 'Gold Collar', price: 150, happiness: 10, durability: 100, style: true },
];

export const PET_DIG_SITES = [
  { id: 'beach', name: 'Marina Beach', x: 190, z: 140, loot: ['cash', 'jewelry', 'bottle'] },
  { id: 'park', name: 'Palm Grove Park', x: -40, z: 190, loot: ['cash', 'watch', 'bone'] },
  { id: 'lot', name: 'Empty Lot', x: 120, z: -40, loot: ['cash', 'contraband', 'key'] },
  { id: 'harbor', name: 'Harbor Docks', x: -180, z: 120, loot: ['cash', 'jewelry', 'contraband'] },
  { id: 'stadium', name: 'Stadium Grounds', x: -200, z: -40, loot: ['cash', 'ticket', 'watch'] },
];

export const PET_DIG_LOOT = [
  { id: 'cash', name: 'Buried Cash', value: 40, weight: 0.4 },
  { id: 'jewelry', name: 'Lost Jewelry', value: 180, weight: 0.15 },
  { id: 'watch', name: 'Gold Watch', value: 120, weight: 0.15 },
  { id: 'bottle', name: 'Old Bottle', value: 10, weight: 0.1 },
  { id: 'bone', name: 'Ancient Bone', value: 5, weight: 0.05 },
  { id: 'contraband', name: 'Hidden Contraband', value: 250, weight: 0.08, heat: 10 },
  { id: 'key', name: 'Mystery Key', value: 60, weight: 0.05 },
  { id: 'ticket', name: 'Lucky Ticket', value: 90, weight: 0.02 },
];

export const PET_LEVELS = [
  { level: 1, xpNeeded: 0, name: 'Pup' },
  { level: 2, xpNeeded: 100, name: 'Good Boy' },
  { level: 3, xpNeeded: 250, name: 'Trusted Friend' },
  { level: 4, xpNeeded: 500, name: 'Street Smart' },
  { level: 5, xpNeeded: 850, name: 'Top Dog' },
  { level: 6, xpNeeded: 1300, name: 'Legend of Solara' },
];

export const PET_EVENTS = [
  { id: 'stray-fight', name: 'Stray Fight', text: 'A stray challenges Rex. He holds his ground.' },
  { id: 'found-cat', name: 'Cat Chase', text: 'Rex spots a cat and gives chase — pure joy.' },
  { id: 'puddle', name: 'Puddle Splash', text: 'Rex finds the biggest puddle in the city.' },
  { id: 'cop-pet', name: 'Cop Pets Rex', text: 'A cop stops to pet Rex. Heat drops a little.' },
  { id: 'kid-play', name: 'Kids Play', text: 'Neighborhood kids play fetch with Rex.' },
  { id: 'thunder', name: 'Thunder Scare', text: 'Thunder rolls. Rex hides behind your legs.' },
  { id: 'icecream', name: 'Dropped Ice Cream', text: 'Someone drops ice cream. Rex cleans it up.' },
  { id: 'squirrel', name: 'Squirrel!', text: 'SQUIRREL! Rex is gone for a minute, then back.' },
];

export function petLevelFor(xp) {
  let level = 1;
  for (let i = 0; i < PET_LEVELS.length; i++) {
    if (xp >= PET_LEVELS[i].xpNeeded) level = PET_LEVELS[i].level;
  }
  return level;
}

export function createPetSystem(deps = {}) {
  const rng = deps.rng || Math.random;
  const getCash = deps.getCash || (() => 0);
  const addCash = deps.addCash || (() => {});
  const addHeat = deps.addHeat || (() => {});
  const log = deps.log || (() => {});
  const getDay = deps.getDay || (() => 1);
  const getHour = deps.getHour || (() => 12);
  const getPlayerPos = deps.getPlayerPos || (() => ({ x: 0, z: 0 }));

  const state = {
    adopted: false,
    name: 'Rex',
    breed: null,
    level: 1,
    xp: 0,
    loyalty: 0,
    hunger: 50,
    happiness: 50,
    energy: 80,
    health: 100,
    tricks: [],
    toys: [],
    training: null, // { trickId, timeLeft }
    fetchCooldown: 0,
    digCooldown: 0,
    sniffCooldown: 0,
    guarding: false,
    following: true,
    position: { x: -170, z: 110 },
    fetches: 0,
    cashFetched: 0,
    digs: 0,
    lootValue: 0,
    sniffs: 0,
    contrabandFound: 0,
    guards: 0,
    attacks: 0,
    tracks: 0,
    vetVisits: 0,
    totalFed: 0,
    playSessions: 0,
    tricksPerformed: 0,
    eventsSeen: {},
    mood: 'content',
    lastFedDay: 0,
    daysOwned: 0,
    bestFetch: 0,
    strayFights: 0,
    baths: 0,
    clean: 100,
  };

  function levelName() {
    return PET_LEVELS[state.level - 1]?.name || 'Pup';
  }
  function hasTrick(id) { return state.tricks.includes(id); }
  function hasToy(id) { return state.toys.includes(id); }
  function moodNow() {
    if (!state.adopted) return 'none';
    if (state.health < 30) return 'sick';
    if (state.hunger < 20) return 'hungry';
    if (state.happiness < 20) return 'sad';
    if (state.energy < 20) return 'tired';
    if (state.happiness > 80 && state.hunger > 60) return 'ecstatic';
    if (state.loyalty > 80) return 'devoted';
    return 'content';
  }
  function gainXp(amount) {
    state.xp += amount;
    const newLevel = petLevelFor(state.xp);
    if (newLevel > state.level) {
      state.level = newLevel;
      state.loyalty = Math.min(100, state.loyalty + 10);
      state.health = Math.min(100, state.health + 20);
      log(`Rex leveled up! Level ${newLevel} — ${levelName()}. Loyalty +10.`);
      return { leveled: true, level: newLevel };
    }
    return { leveled: false, level: state.level };
  }

  function adopt(breedId, name) {
    if (state.adopted) return { ok: false, reason: 'already-adopted' };
    const breed = PET_BREEDS.find((b) => b.id === breedId);
    if (!breed) return { ok: false, reason: 'no-such-breed' };
    if (getCash() < breed.price) return { ok: false, reason: 'no-cash', need: breed.price };
    addCash(-breed.price);
    state.adopted = true;
    state.breed = breedId;
    state.name = name || 'Rex';
    state.loyalty = breed.baseLoyalty;
    state.hunger = 70;
    state.happiness = 70;
    state.energy = 90;
    state.health = 100;
    state.daysOwned = 0;
    log(`You adopted ${state.name} the ${breed.name}! ${breed.desc}`);
    return { ok: true, name: state.name, breed: breedId, price: breed.price };
  }

  function feed(foodId) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const food = PET_FOODS.find((f) => f.id === foodId);
    if (!food) return { ok: false, reason: 'no-such-food' };
    if (getCash() < food.price) return { ok: false, reason: 'no-cash', need: food.price };
    addCash(-food.price);
    state.hunger = Math.min(100, state.hunger + food.hunger);
    state.happiness = Math.min(100, state.happiness + food.happiness);
    state.health = Math.min(100, state.health + food.health);
    state.totalFed += 1;
    state.lastFedDay = getDay();
    state.loyalty = Math.min(100, state.loyalty + 1);
    gainXp(5);
    log(`${state.name} devours the ${food.name}. Hunger ${Math.round(state.hunger)}, happiness ${Math.round(state.happiness)}.`);
    return { ok: true, food: foodId, hunger: Math.round(state.hunger) };
  }

  function play(toyId) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (state.energy < 15) return { ok: false, reason: 'too-tired' };
    let bonus = 10;
    if (toyId) {
      if (!hasToy(toyId)) return { ok: false, reason: 'no-such-toy' };
      const toy = PET_TOYS.find((t) => t.id === toyId);
      bonus = toy.happiness;
    }
    state.energy = Math.max(0, state.energy - 15);
    state.happiness = Math.min(100, state.happiness + bonus);
    state.hunger = Math.max(0, state.hunger - 5);
    state.playSessions += 1;
    state.loyalty = Math.min(100, state.loyalty + 2);
    gainXp(8);
    log(`Playtime with ${state.name}! Happiness +${bonus}.`);
    return { ok: true, happiness: Math.round(state.happiness), energy: Math.round(state.energy) };
  }

  function buyToy(toyId) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const toy = PET_TOYS.find((t) => t.id === toyId);
    if (!toy) return { ok: false, reason: 'no-such-toy' };
    if (hasToy(toyId)) return { ok: false, reason: 'already-owned' };
    if (getCash() < toy.price) return { ok: false, reason: 'no-cash', need: toy.price };
    addCash(-toy.price);
    state.toys.push(toyId);
    log(`Bought ${toy.name} for ${state.name} ($${toy.price}).`);
    return { ok: true, toy: toyId, price: toy.price };
  }

  function startTraining(trickId) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const trick = PET_TRICKS.find((t) => t.id === trickId);
    if (!trick) return { ok: false, reason: 'no-such-trick' };
    if (hasTrick(trickId)) return { ok: false, reason: 'already-known' };
    if (state.level < trick.level) return { ok: false, reason: 'level-too-low', need: trick.level };
    if (state.training) return { ok: false, reason: 'training-active' };
    if (state.energy < 25) return { ok: false, reason: 'too-tired' };
    state.training = { trickId, timeLeft: trick.trainTime };
    log(`Training ${state.name} to ${trick.name} — ${trick.trainTime}s of practice.`);
    return { ok: true, trick: trickId, timeLeft: trick.trainTime };
  }

  function performTrick(trickId) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (!hasTrick(trickId)) return { ok: false, reason: 'not-learned' };
    if (state.energy < 10) return { ok: false, reason: 'too-tired' };
    state.energy = Math.max(0, state.energy - 10);
    state.tricksPerformed += 1;
    const trick = PET_TRICKS.find((t) => t.id === trickId);
    let result = { ok: true, trick: trickId };
    if (trickId === 'roll' || trickId === 'shake') {
      const tip = 5 + Math.floor(rng() * 20);
      addCash(tip);
      result.tip = tip;
      log(`${state.name} does ${trick.name} — a passerby tips $${tip}!`);
    } else if (trickId === 'play-dead') {
      addHeat(-5);
      result.heat = -5;
      log(`${state.name} plays dead so well the cops walk right past. Heat -5.`);
    } else {
      state.happiness = Math.min(100, state.happiness + 5);
      log(`${state.name} does ${trick.name}! Good boy.`);
    }
    gainXp(6);
    return result;
  }

  function fetch() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (!hasTrick('fetch')) return { ok: false, reason: 'not-learned' };
    if (state.fetchCooldown > 0) return { ok: false, reason: 'cooldown', seconds: Math.ceil(state.fetchCooldown) };
    if (state.energy < 10) return { ok: false, reason: 'too-tired' };
    state.fetchCooldown = 45;
    state.energy = Math.max(0, state.energy - 10);
    state.fetches += 1;
    const breed = PET_BREEDS.find((b) => b.id === state.breed);
    const findChance = 0.3 + (breed ? breed.baseSmell * 0.03 : 0) + state.level * 0.02;
    if (rng() < findChance) {
      const amount = 10 + Math.floor(rng() * 60) + state.level * 5;
      addCash(amount);
      state.cashFetched += amount;
      if (amount > state.bestFetch) state.bestFetch = amount;
      gainXp(12);
      log(`${state.name} fetches a dropped wallet — $${amount} inside!`);
      return { ok: true, found: true, amount };
    }
    state.happiness = Math.min(100, state.happiness + 5);
    gainXp(4);
    log(`${state.name} fetches the ball and brings it right back.`);
    return { ok: true, found: false };
  }

  function dig() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (!hasTrick('dig')) return { ok: false, reason: 'not-learned' };
    if (state.digCooldown > 0) return { ok: false, reason: 'cooldown', seconds: Math.ceil(state.digCooldown) };
    const p = getPlayerPos();
    const site = PET_DIG_SITES.find((s) => Math.hypot(s.x - p.x, s.z - p.z) < 20);
    if (!site) return { ok: false, reason: 'no-dig-site' };
    if (state.energy < 20) return { ok: false, reason: 'too-tired' };
    state.digCooldown = 90;
    state.energy = Math.max(0, state.energy - 20);
    state.digs += 1;
    const roll = rng();
    let acc = 0;
    let loot = PET_DIG_LOOT[0];
    for (const l of PET_DIG_LOOT) {
      acc += l.weight;
      if (roll <= acc) { loot = l; break; }
    }
    addCash(loot.value);
    state.lootValue += loot.value;
    if (loot.heat) addHeat(loot.heat);
    gainXp(15);
    log(`${state.name} digs at ${site.name} and unearths ${loot.name} — $${loot.value}!${loot.heat ? ' (The cops might ask questions...)' : ''}`);
    return { ok: true, loot: loot.id, value: loot.value, site: site.id };
  }

  function sniff() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (!hasTrick('sniff')) return { ok: false, reason: 'not-learned' };
    if (state.sniffCooldown > 0) return { ok: false, reason: 'cooldown', seconds: Math.ceil(state.sniffCooldown) };
    state.sniffCooldown = 60;
    state.sniffs += 1;
    const breed = PET_BREEDS.find((b) => b.id === state.breed);
    const chance = 0.25 + (breed ? breed.baseSmell * 0.04 : 0);
    if (rng() < chance) {
      const value = 80 + Math.floor(rng() * 200);
      addCash(value);
      state.contrabandFound += 1;
      state.lootValue += value;
      gainXp(20);
      log(`${state.name} sniffs out a hidden stash — $${value} of contraband!`);
      return { ok: true, found: true, value };
    }
    gainXp(5);
    log(`${state.name} sniffs around... nothing but old sandwiches.`);
    return { ok: true, found: false };
  }

  function guardToggle() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (!hasTrick('guard')) return { ok: false, reason: 'not-learned' };
    state.guarding = !state.guarding;
    if (state.guarding) {
      state.guards += 1;
      log(`${state.name} is on guard. Nobody sneaks up on you now.`);
    } else {
      log(`${state.name} stands down.`);
    }
    return { ok: true, guarding: state.guarding };
  }

  function attack() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (!hasTrick('attack')) return { ok: false, reason: 'not-learned' };
    if (state.energy < 30) return { ok: false, reason: 'too-tired' };
    state.energy = Math.max(0, state.energy - 30);
    state.attacks += 1;
    const success = rng() < 0.6 + state.level * 0.05;
    if (success) {
      addHeat(-10);
      gainXp(25);
      log(`${state.name} takes down the threat! The street clears. Heat -10.`);
      return { ok: true, success: true };
    }
    state.health = Math.max(0, state.health - 15);
    log(`${state.name} lunges but gets knocked back. He needs a vet.`);
    return { ok: true, success: false, health: Math.round(state.health) };
  }

  function track() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (!hasTrick('track')) return { ok: false, reason: 'not-learned' };
    if (state.energy < 25) return { ok: false, reason: 'too-tired' };
    state.energy = Math.max(0, state.energy - 25);
    state.tracks += 1;
    const found = rng() < 0.5 + state.level * 0.04;
    if (found) {
      const value = 50 + Math.floor(rng() * 150);
      addCash(value);
      state.lootValue += value;
      gainXp(22);
      log(`${state.name} follows the scent trail to a stash — $${value}!`);
      return { ok: true, found: true, value };
    }
    gainXp(6);
    log(`${state.name} follows the trail... it goes cold at the river.`);
    return { ok: true, found: false };
  }

  function vetVisit() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const cost = 50 + Math.floor((100 - state.health) * 1.5);
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.health = 100;
    state.vetVisits += 1;
    state.loyalty = Math.min(100, state.loyalty + 3);
    log(`Vet visit: ${state.name} is patched up to full health for $${cost}.`);
    return { ok: true, cost };
  }

  function bath() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const cost = 15;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.clean = 100;
    state.baths += 1;
    state.happiness = Math.min(100, state.happiness + 10);
    log(`${state.name} gets a bath — squeaky clean and smelling like lavender.`);
    return { ok: true, cost };
  }

  function rename(newName) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (!newName || newName.length < 2 || newName.length > 16) return { ok: false, reason: 'bad-name' };
    state.name = newName;
    state.loyalty = Math.min(100, state.loyalty + 1);
    log(`Your dog is now called ${newName}.`);
    return { ok: true, name: newName };
  }

  function tick(dt) {
    if (!state.adopted) return;
    // Needs decay in real time: hunger, energy, cleanliness.
    state.hunger = Math.max(0, state.hunger - dt * 0.08);
    state.clean = Math.max(0, state.clean - dt * 0.02);
    if (state.guarding) {
      state.energy = Math.max(0, state.energy - dt * 0.1);
    } else if (state.energy < 100) {
      state.energy = Math.min(100, state.energy + dt * 0.25);
    }
    if (state.hunger < 15) {
      state.happiness = Math.max(0, state.happiness - dt * 0.2);
      state.loyalty = Math.max(0, state.loyalty - dt * 0.05);
    }
    if (state.hunger <= 0 && state.health > 0) {
      state.health = Math.max(0, state.health - dt * 0.1);
    }
    // Cooldowns tick down.
    if (state.fetchCooldown > 0) state.fetchCooldown = Math.max(0, state.fetchCooldown - dt);
    if (state.digCooldown > 0) state.digCooldown = Math.max(0, state.digCooldown - dt);
    if (state.sniffCooldown > 0) state.sniffCooldown = Math.max(0, state.sniffCooldown - dt);
    // Training progresses; a finished trick is learned.
    if (state.training) {
      state.training.timeLeft -= dt;
      state.energy = Math.max(0, state.energy - dt * 0.2);
      if (state.training.timeLeft <= 0) {
        const trickId = state.training.trickId;
        state.training = null;
        state.tricks.push(trickId);
        state.loyalty = Math.min(100, state.loyalty + 5);
        gainXp(30);
        const trick = PET_TRICKS.find((t) => t.id === trickId);
        log(`${state.name} learned ${trick.name}! Loyalty +5.`);
      }
    }
    // Rex follows the player: he trails a few steps behind.
    if (state.following) {
      const p = getPlayerPos();
      const dx = p.x - state.position.x;
      const dz = p.z - state.position.z;
      const dist = Math.hypot(dx, dz);
      if (dist > 4) {
        const breed = PET_BREEDS.find((b) => b.id === state.breed);
        const speed = (breed ? breed.baseSpeed : 6) * dt;
        const step = Math.min(dist - 3, speed);
        state.position.x += (dx / dist) * step;
        state.position.z += (dz / dist) * step;
      }
    }
    // Random street events, rare.
    if (rng() < dt * 0.002) {
      const ev = PET_EVENTS[Math.floor(rng() * PET_EVENTS.length)];
      state.eventsSeen[ev.id] = (state.eventsSeen[ev.id] || 0) + 1;
      if (ev.id === 'cop-pet') {
        addHeat(-3);
        state.happiness = Math.min(100, state.happiness + 5);
      } else if (ev.id === 'thunder') {
        state.happiness = Math.max(0, state.happiness - 10);
      } else if (ev.id === 'stray-fight') {
        state.strayFights += 1;
        state.health = Math.max(0, state.health - 5);
        state.loyalty = Math.min(100, state.loyalty + 2);
      } else {
        state.happiness = Math.min(100, state.happiness + 8);
      }
      log(`${state.name}: ${ev.text}`);
    }
    state.mood = moodNow();
  }

  function tickDay(day) {
    if (!state.adopted) return { day, adopted: false };
    state.daysOwned += 1;
    // Overnight: hunger drops, energy restores, loyalty settles.
    state.hunger = Math.max(0, state.hunger - 20);
    state.energy = 100;
    state.clean = Math.max(0, state.clean - 10);
    if (state.lastFedDay < day - 1) {
      state.loyalty = Math.max(0, state.loyalty - 5);
      log(`${state.name} went a whole day without food. Loyalty -5.`);
    }
    if (state.health < 50) {
      log(`${state.name} is not feeling well — a vet visit would help.`);
    }
    return { day, daysOwned: state.daysOwned, loyalty: Math.round(state.loyalty), level: state.level };
  }

  function interact() {
    const p = getPlayerPos();
    if (!state.adopted) {
      // At the shelter: adopt the free mutt.
      const d = Math.hypot(PET_SHELTER.x - p.x, PET_SHELTER.z - p.z);
      if (d < 16) {
        const res = adopt('mutt');
        return res.ok;
      }
      return false;
    }
    // Near Rex: play if he is close, whistle if he is in earshot.
    const d = Math.hypot(state.position.x - p.x, state.position.z - p.z);
    if (d < 6) {
      const res = play();
      return res.ok || res.reason === 'too-tired';
    }
    if (d < 30) {
      // Whistle — he runs to you. Only in earshot, so E never hijacks
      // car entry or other interactions elsewhere in the city.
      state.position.x = p.x + 2;
      state.position.z = p.z + 2;
      log(`You whistle. ${state.name} comes running!`);
      return true;
    }
    return false;
  }

  function hudLine() {
    if (!state.adopted) {
      const p = getPlayerPos();
      if (Math.hypot(PET_SHELTER.x - p.x, PET_SHELTER.z - p.z) < 16) {
        return 'SHELTER — adopt a dog (free mutt available)';
      }
      return '';
    }
    const bits = [];
    if (state.training) bits.push(`TRAINING ${state.training.trickId} ${Math.ceil(state.training.timeLeft)}s`);
    if (state.hunger < 20) bits.push('HUNGRY!');
    if (state.health < 30) bits.push('SICK — vet!');
    if (bits.length > 0) return `${state.name.toUpperCase()} Lv${state.level} · ${bits.join(' · ')}`;
    return `${state.name.toUpperCase()} Lv${state.level} ${levelName()} · ${state.mood} · ♥${Math.round(state.happiness)} 🍖${Math.round(state.hunger)}`;
  }

  function stats() {
    return {
      adopted: state.adopted,
      name: state.name,
      breed: state.breed,
      level: state.level,
      levelName: levelName(),
      xp: state.xp,
      xpNext: PET_LEVELS[state.level] ? PET_LEVELS[state.level].xpNeeded : null,
      loyalty: Math.round(state.loyalty),
      hunger: Math.round(state.hunger),
      happiness: Math.round(state.happiness),
      energy: Math.round(state.energy),
      health: Math.round(state.health),
      clean: Math.round(state.clean),
      mood: moodNow(),
      tricks: [...state.tricks],
      toys: [...state.toys],
      training: state.training ? state.training.trickId : null,
      guarding: state.guarding,
      following: state.following,
      fetches: state.fetches,
      cashFetched: state.cashFetched,
      bestFetch: state.bestFetch,
      digs: state.digs,
      lootValue: state.lootValue,
      sniffs: state.sniffs,
      contrabandFound: state.contrabandFound,
      guards: state.guards,
      attacks: state.attacks,
      tracks: state.tracks,
      vetVisits: state.vetVisits,
      totalFed: state.totalFed,
      playSessions: state.playSessions,
      tricksPerformed: state.tricksPerformed,
      daysOwned: state.daysOwned,
      strayFights: state.strayFights,
      baths: state.baths,
      eventsSeen: Object.keys(state.eventsSeen).length,
      showsEntered: state.showsEntered || 0,
      showsWon: state.showsWon || 0,
      fashion: [...(state.fashion || [])],
      words: [...(state.words || [])],
      photos: state.photos || 0,
      photoLikes: state.photoLikes || 0,
    };
  }

  function serialize() {
    return {
      adopted: state.adopted,
      name: state.name,
      breed: state.breed,
      level: state.level,
      xp: state.xp,
      loyalty: state.loyalty,
      hunger: state.hunger,
      happiness: state.happiness,
      energy: state.energy,
      health: state.health,
      clean: state.clean,
      tricks: [...state.tricks],
      toys: [...state.toys],
      fetches: state.fetches,
      cashFetched: state.cashFetched,
      bestFetch: state.bestFetch,
      digs: state.digs,
      lootValue: state.lootValue,
      sniffs: state.sniffs,
      contrabandFound: state.contrabandFound,
      guards: state.guards,
      attacks: state.attacks,
      tracks: state.tracks,
      vetVisits: state.vetVisits,
      totalFed: state.totalFed,
      playSessions: state.playSessions,
      tricksPerformed: state.tricksPerformed,
      daysOwned: state.daysOwned,
      strayFights: state.strayFights,
      baths: state.baths,
      eventsSeen: { ...state.eventsSeen },
      lastFedDay: state.lastFedDay,
      showsEntered: state.showsEntered || 0,
      showsWon: state.showsWon || 0,
      fashion: [...(state.fashion || [])],
      words: [...(state.words || [])],
      photos: state.photos || 0,
      photoLikes: state.photoLikes || 0,
    };
  }

  function deserialize(d) {
    if (!d) return;
    state.adopted = !!d.adopted;
    state.name = d.name || 'Rex';
    state.breed = d.breed || null;
    state.level = d.level ?? 1;
    state.xp = d.xp ?? 0;
    state.loyalty = d.loyalty ?? 0;
    state.hunger = d.hunger ?? 50;
    state.happiness = d.happiness ?? 50;
    state.energy = d.energy ?? 80;
    state.health = d.health ?? 100;
    state.clean = d.clean ?? 100;
    state.tricks = [...(d.tricks || [])];
    state.toys = [...(d.toys || [])];
    state.fetches = d.fetches ?? 0;
    state.cashFetched = d.cashFetched ?? 0;
    state.bestFetch = d.bestFetch ?? 0;
    state.digs = d.digs ?? 0;
    state.lootValue = d.lootValue ?? 0;
    state.sniffs = d.sniffs ?? 0;
    state.contrabandFound = d.contrabandFound ?? 0;
    state.guards = d.guards ?? 0;
    state.attacks = d.attacks ?? 0;
    state.tracks = d.tracks ?? 0;
    state.vetVisits = d.vetVisits ?? 0;
    state.totalFed = d.totalFed ?? 0;
    state.playSessions = d.playSessions ?? 0;
    state.tricksPerformed = d.tricksPerformed ?? 0;
    state.daysOwned = d.daysOwned ?? 0;
    state.strayFights = d.strayFights ?? 0;
    state.baths = d.baths ?? 0;
    state.eventsSeen = { ...(d.eventsSeen || {}) };
    state.lastFedDay = d.lastFedDay ?? 0;
    state.showsEntered = d.showsEntered ?? 0;
    state.showsWon = d.showsWon ?? 0;
    state.fashion = [...(d.fashion || [])];
    state.words = [...(d.words || [])];
    state.photos = d.photos ?? 0;
    state.photoLikes = d.photoLikes ?? 0;
    state.training = null;
    state.guarding = false;
    state.fetchCooldown = 0;
    state.digCooldown = 0;
    state.sniffCooldown = 0;
    state.mood = moodNow();
  }

  // --- Round 7 top-up: dog shows, pet fashion, daycare ---
  const PET_SHOWS = [
    { id: 'harbor-show', name: 'Harbor Dog Show', entry: 30, prize: 200, needLevel: 1 },
    { id: 'city-show', name: 'Solara City Show', entry: 80, prize: 600, needLevel: 2 },
    { id: 'best-in-show', name: 'Best in Show', entry: 200, prize: 2000, needLevel: 4 },
  ];
  const PET_FASHION = [
    { id: 'bandana', name: 'Bandana', price: 15, style: 1, happiness: 5 },
    { id: 'sunglasses', name: 'Dog Sunglasses', price: 25, style: 2, happiness: 10 },
    { id: 'jacket', name: 'Rain Jacket', price: 40, style: 2, happiness: 5 },
    { id: 'tuxedo', name: 'Dog Tuxedo', price: 120, style: 5, happiness: 15 },
    { id: 'crown-pet', name: 'Tiny Crown', price: 90, style: 4, happiness: 10 },
  ];
  function enterDogShow(showId) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const show = PET_SHOWS.find((s) => s.id === showId);
    if (!show) return { ok: false, reason: 'no-such-show' };
    if (state.level < show.needLevel) return { ok: false, reason: 'level-too-low', need: show.needLevel };
    if (getCash() < show.entry) return { ok: false, reason: 'no-cash', need: show.entry };
    addCash(-show.entry);
    state.showsEntered = (state.showsEntered || 0) + 1;
    const score = state.level * 20 + state.loyalty * 0.5 + state.tricks.length * 10 + (state.fashion || []).length * 5 + rng() * 20;
    const rivals = [60, 90, 120, 150].map((r) => r + rng() * 40);
    const place = rivals.filter((r) => r > score).length + 1;
    if (place === 1) {
      addCash(show.prize);
      state.showsWon = (state.showsWon || 0) + 1;
      state.loyalty = Math.min(100, state.loyalty + 5);
      gainXp(50);
      log(`DOG SHOW WIN! ${state.name} takes ${show.name}! Prize $${show.prize}!`);
      return { ok: true, won: true, place: 1, prize: show.prize, score: Math.round(score) };
    }
    gainXp(15);
    log(`${show.name}: ${state.name} places ${place} of 5. Score ${Math.round(score)}.`);
    return { ok: true, won: false, place, prize: 0, score: Math.round(score) };
  }
  function buyFashion(itemId) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const item = PET_FASHION.find((f) => f.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    state.fashion = state.fashion || [];
    if (state.fashion.includes(itemId)) return { ok: false, reason: 'already-owned' };
    if (getCash() < item.price) return { ok: false, reason: 'no-cash', need: item.price };
    addCash(-item.price);
    state.fashion.push(itemId);
    state.happiness = Math.min(100, state.happiness + item.happiness);
    state.loyalty = Math.min(100, state.loyalty + 2);
    log(`${state.name} models the ${item.name}! Style +${item.style}, happiness +${item.happiness}.`);
    return { ok: true, item: itemId, price: item.price };
  }
  function daycare(days = 1) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const cost = 25 * days;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.happiness = Math.min(100, state.happiness + 10 * days);
    state.energy = 100;
    state.hunger = Math.max(0, state.hunger - 10 * days);
    state.loyalty = Math.min(100, state.loyalty + 3 * days);
    gainXp(10 * days);
    log(`${state.name} spends ${days} day(s) at doggy daycare — tired, happy, and well-fed. Cost $${cost}.`);
    return { ok: true, days, cost };
  }
  function teachWord(word) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (!word || word.length < 2 || word.length > 12) return { ok: false, reason: 'bad-word' };
    state.words = state.words || [];
    if (state.words.includes(word)) return { ok: false, reason: 'already-known' };
    if (state.energy < 20) return { ok: false, reason: 'too-tired' };
    state.energy = Math.max(0, state.energy - 20);
    state.words.push(word);
    state.loyalty = Math.min(100, state.loyalty + 3);
    gainXp(12);
    log(`${state.name} learned the word "${word}"!`);
    return { ok: true, word };
  }
  function petPhoto() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const likes = Math.round((state.fans || 0) + state.level * 10 + rng() * 50);
    state.photos = (state.photos || 0) + 1;
    state.photoLikes = (state.photoLikes || 0) + likes;
    log(`Photo of ${state.name} gets ${likes} likes!`);
    return { ok: true, likes, photos: state.photos };
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
    adopt,
    feed,
    play,
    buyToy,
    startTraining,
    performTrick,
    fetch,
    dig,
    sniff,
    guardToggle,
    attack,
    track,
    vetVisit,
    bath,
    rename,
    hasTrick,
    hasToy,
    levelName,
    moodNow,
    gainXp,
    enterDogShow,
    buyFashion,
    daycare,
    teachWord,
    petPhoto,
  };
}
