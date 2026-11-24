export const PET_SHELTER = { id: 'harbor-shelter', name: 'Harbor Animal Shelter', x: -170, z: 110, district: 'Harbor' };

export const PET_BREEDS = [
  { id: 'mutt', name: 'Harbor Mutt', price: 0, baseLoyalty: 30, baseSpeed: 6, baseSmell: 5, desc: 'A scruffy stray with a big heart.' },
  { id: 'shepherd', name: 'German Shepherd', price: 400, baseLoyalty: 50, baseSpeed: 8, baseSmell: 8, desc: 'Loyal, sharp and brave.' },
  { id: 'pitbull', name: 'Pit Bull', price: 350, baseLoyalty: 45, baseSpeed: 7, baseSmell: 4, desc: 'Strong and sweet-natured.' },
  { id: 'husky', name: 'Husky', price: 500, baseLoyalty: 40, baseSpeed: 9, baseSmell: 6, desc: 'Fast, loud and full of energy.' },
  { id: 'beagle', name: 'Beagle', price: 300, baseLoyalty: 45, baseSpeed: 6, baseSmell: 10, desc: 'A nose that never misses.' },
  { id: 'doberman', name: 'Doberman', price: 550, baseLoyalty: 55, baseSpeed: 8, baseSmell: 7, desc: 'Sleek, alert and devoted.' },
];

export const PET_FOODS = [
  { id: 'kibble', name: 'Kibble', price: 5, hunger: 25, happiness: 5, health: 2 },
  { id: 'treat', name: 'Treat', price: 8, hunger: 10, happiness: 20, health: 1 },
  { id: 'steak', name: 'Steak', price: 25, hunger: 60, happiness: 25, health: 10 },
  { id: 'bone', name: 'Bone', price: 12, hunger: 15, happiness: 30, health: 3 },
  { id: 'fish', name: 'Fish', price: 15, hunger: 40, happiness: 15, health: 8 },
  { id: 'vet-meal', name: 'Vet Meal', price: 40, hunger: 50, happiness: 10, health: 30 },
];

export const PET_TRICKS = [
  { id: 'sit', name: 'Sit', level: 1, trainTime: 20, desc: 'Sit on command.' },
  { id: 'fetch', name: 'Fetch', level: 1, trainTime: 30, desc: 'Bring back what you throw.' },
  { id: 'shake', name: 'Shake', level: 2, trainTime: 25, desc: 'Offer a paw.' },
  { id: 'roll', name: 'Roll Over', level: 2, trainTime: 35, desc: 'A full happy roll.' },
  { id: 'play-dead', name: 'Play Dead', level: 3, trainTime: 40, desc: 'Flop down and stay still.' },
  { id: 'sniff', name: 'Sniff', level: 3, trainTime: 50, desc: 'Sniff out hidden things.' },
  { id: 'guard', name: 'Guard', level: 4, trainTime: 60, desc: 'Watch the door while you sleep.' },
  { id: 'attack', name: 'Attack', level: 5, trainTime: 80, desc: 'Drive off a threat.' },
  { id: 'dig', name: 'Dig', level: 4, trainTime: 55, desc: 'Dig up buried loot.' },
  { id: 'track', name: 'Track', level: 5, trainTime: 70, desc: 'Follow a scent trail.' },
];

export const PET_TOYS = [
  { id: 'ball', name: 'Ball', price: 6, happiness: 15, durability: 20 },
  { id: 'rope', name: 'Rope', price: 10, happiness: 20, durability: 30 },
  { id: 'frisbee', name: 'Frisbee', price: 12, happiness: 25, durability: 15 },
  { id: 'squeaky', name: 'Squeaky Toy', price: 8, happiness: 18, durability: 10 },
  { id: 'vest', name: 'Protective Vest', price: 80, happiness: 5, durability: 100, armor: true },
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
  { id: 'jewelry', name: 'Jewelry', value: 180, weight: 0.15 },
  { id: 'watch', name: 'Watch', value: 120, weight: 0.15 },
  { id: 'bottle', name: 'Old Bottle', value: 10, weight: 0.1 },
  { id: 'bone', name: 'Old Bone', value: 5, weight: 0.05 },
  { id: 'contraband', name: 'Contraband', value: 250, weight: 0.08, heat: 10 },
  { id: 'key', name: 'Old Key', value: 60, weight: 0.05 },
  { id: 'ticket', name: 'Old Ticket', value: 90, weight: 0.02 },
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
  { id: 'stray-fight', name: 'Stray Fight', text: 'A stray challenges Rex.' },
  { id: 'found-cat', name: 'Found Cat', text: 'Rex finds a cat and chases it.' },
  { id: 'puddle', name: 'Puddle', text: 'Rex splashes through a puddle.' },
  { id: 'cop-pet', name: 'Cop Pet', text: 'A cop stops to pet Rex.' },
  { id: 'kid-play', name: 'Kid Play', text: 'Kids play with Rex in the park.' },
  { id: 'thunder', name: 'Thunder', text: 'Thunder rolls and Rex hides.' },
  { id: 'icecream', name: 'Ice Cream', text: 'Someone shares ice cream with Rex.' },
  { id: 'squirrel', name: 'Squirrel', text: 'Rex spots a squirrel.' },
];

const DOG_SHOWS = [
  { id: 'local-show', name: 'Local Dog Show', entry: 20, prize: 150, needLevel: 1 },
  { id: 'city-show', name: 'City Dog Show', entry: 60, prize: 400, needLevel: 3 },
  { id: 'grand-show', name: 'Grand Dog Show', entry: 150, prize: 1000, needLevel: 5 },
];

const FASHION_ITEMS = [
  { id: 'bandana', name: 'Bandana', price: 15, style: 2, happiness: 10 },
  { id: 'sunglasses', name: 'Dog Sunglasses', price: 30, style: 3, happiness: 12 },
  { id: 'cape', name: 'Hero Cape', price: 45, style: 4, happiness: 15 },
  { id: 'bowtie', name: 'Bow Tie', price: 25, style: 3, happiness: 10 },
  { id: 'raincoat', name: 'Raincoat', price: 35, style: 2, happiness: 8 },
];

export function petLevelFor(xp) {
  let out = 1;
  for (const l of PET_LEVELS) if (xp >= l.xpNeeded) out = l.level;
  return out;
}

function breedById(id) {
  for (const b of PET_BREEDS) if (b.id === id) return b;
  return null;
}

function foodById(id) {
  for (const f of PET_FOODS) if (f.id === id) return f;
  return null;
}

function trickById(id) {
  for (const t of PET_TRICKS) if (t.id === id) return t;
  return null;
}

function toyById(id) {
  for (const t of PET_TOYS) if (t.id === id) return t;
  return null;
}

export function createPetSystem(deps) {
  const d = deps || {};
  const rnd = typeof d.rng === 'function' ? d.rng : Math.random;
  const cashOf = typeof d.getCash === 'function' ? d.getCash : () => 0;
  const moveCash = typeof d.addCash === 'function' ? d.addCash : () => {};
  const pushHeat = typeof d.addHeat === 'function' ? d.addHeat : () => {};
  const say = typeof d.log === 'function' ? d.log : () => {};
  const dayOf = typeof d.getDay === 'function' ? d.getDay : () => 1;
  const posOf = typeof d.getPlayerPos === 'function' ? d.getPlayerPos : () => ({ x: 0, z: 0 });

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
    training: null,
    fetchCooldown: 0,
    digCooldown: 0,
    sniffCooldown: 0,
    guarding: false,
    following: true,
    position: { x: PET_SHELTER.x, z: PET_SHELTER.z },
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
    showsEntered: 0,
    showsWon: 0,
    fashion: [],
    words: [],
    photos: 0,
    photoLikes: 0,
  };

  function levelName() {
    const rec = PET_LEVELS.find((l) => l.level === state.level);
    return rec ? rec.name : 'Pup';
  }

  function hasTrick(id) {
    return state.tricks.includes(id);
  }

  function hasToy(id) {
    return state.toys.includes(id);
  }

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
      say('Rex leveled up to ' + levelName() + '!');
      return { leveled: true, level: newLevel };
    }
    return { leveled: false, level: state.level };
  }

  function clampStat(v) {
    return Math.max(0, Math.min(100, v));
  }

  function adopt(breedId, name) {
    if (state.adopted) return { ok: false, reason: 'already-adopted' };
    const breed = breedById(breedId);
    if (!breed) return { ok: false, reason: 'unknown-breed' };
    if (cashOf() < breed.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-breed.price);
    state.adopted = true;
    state.breed = breed.id;
    state.name = name || 'Rex';
    state.loyalty = breed.baseLoyalty;
    state.hunger = 70;
    state.happiness = 70;
    state.energy = 90;
    state.health = 100;
    say('Adopted ' + state.name + ' the ' + breed.name + '.');
    return { ok: true, name: state.name, breedId: breed.id, price: breed.price };
  }

  function feed(foodId) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const food = foodById(foodId);
    if (!food) return { ok: false, reason: 'unknown-food' };
    if (cashOf() < food.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-food.price);
    state.hunger = clampStat(state.hunger + food.hunger);
    state.happiness = clampStat(state.happiness + food.happiness);
    state.health = clampStat(state.health + food.health);
    state.totalFed += 1;
    state.lastFedDay = dayOf();
    state.loyalty = Math.min(100, state.loyalty + 1);
    gainXp(5);
    return { ok: true, foodId, hunger: Math.round(state.hunger) };
  }

  function play(toyId) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (state.energy < 15) return { ok: false, reason: 'too-tired' };
    let bonus = 10;
    if (toyId) {
      if (!hasToy(toyId)) return { ok: false, reason: 'toy-not-owned' };
      const toy = toyById(toyId);
      bonus = toy ? toy.happiness : 10;
    }
    state.energy -= 15;
    state.happiness = clampStat(state.happiness + bonus);
    state.hunger = clampStat(state.hunger - 5);
    state.playSessions += 1;
    state.loyalty = Math.min(100, state.loyalty + 2);
    gainXp(8);
    return { ok: true, happiness: Math.round(state.happiness), energy: Math.round(state.energy) };
  }

  function buyToy(toyId) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const toy = toyById(toyId);
    if (!toy) return { ok: false, reason: 'unknown-toy' };
    if (hasToy(toyId)) return { ok: false, reason: 'already-owned' };
    if (cashOf() < toy.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-toy.price);
    state.toys.push(toyId);
    return { ok: true, toyId, price: toy.price };
  }

  function startTraining(trickId) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const trick = trickById(trickId);
    if (!trick) return { ok: false, reason: 'unknown-trick' };
    if (hasTrick(trickId)) return { ok: false, reason: 'already-known' };
    if (state.level < trick.level) return { ok: false, reason: 'level-too-low' };
    if (state.training) return { ok: false, reason: 'already-training' };
    if (state.energy < 25) return { ok: false, reason: 'too-tired' };
    state.training = { trickId, timeLeft: trick.trainTime };
    return { ok: true, trickId, timeLeft: trick.trainTime };
  }

  function performTrick(trickId) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (!hasTrick(trickId)) return { ok: false, reason: 'not-learned' };
    if (state.energy < 10) return { ok: false, reason: 'too-tired' };
    state.energy -= 10;
    state.tricksPerformed += 1;
    gainXp(6);
    if (trickId === 'roll' || trickId === 'shake') {
      const tip = 5 + Math.floor(rnd() * 20);
      moveCash(tip);
      return { ok: true, trickId, tip };
    }
    if (trickId === 'play-dead') {
      pushHeat(-5);
      return { ok: true, trickId, heat: -5 };
    }
    state.happiness = clampStat(state.happiness + 5);
    return { ok: true, trickId };
  }

  function breedRec() {
    return state.breed ? breedById(state.breed) : null;
  }

  function fetch() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (!hasTrick('fetch')) return { ok: false, reason: 'not-learned' };
    if (state.fetchCooldown > 0) return { ok: false, reason: 'on-cooldown' };
    if (state.energy < 10) return { ok: false, reason: 'too-tired' };
    state.fetchCooldown = 45;
    state.energy -= 10;
    state.fetches += 1;
    const breed = breedRec();
    const smell = breed ? breed.baseSmell : 5;
    const chance = 0.3 + smell * 0.03 + state.level * 0.02;
    if (rnd() < chance) {
      const amount = 10 + Math.floor(rnd() * 60) + state.level * 5;
      moveCash(amount);
      state.cashFetched += amount;
      if (amount > state.bestFetch) state.bestFetch = amount;
      gainXp(12);
      return { ok: true, found: true, amount };
    }
    state.happiness = clampStat(state.happiness + 5);
    gainXp(4);
    return { ok: true, found: false, amount: 0 };
  }

  function rollLoot(site) {
    const allowed = site.loot;
    const pool = PET_DIG_LOOT.filter((l) => allowed.includes(l.id));
    const total = pool.reduce((a, l) => a + l.weight, 0);
    let roll = rnd() * total;
    for (const l of pool) {
      roll -= l.weight;
      if (roll <= 0) return l;
    }
    return pool[pool.length - 1];
  }

  function dig() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (!hasTrick('dig')) return { ok: false, reason: 'not-learned' };
    if (state.digCooldown > 0) return { ok: false, reason: 'on-cooldown' };
    const pos = posOf();
    let site = null;
    for (const s of PET_DIG_SITES) {
      if (Math.hypot(pos.x - s.x, pos.z - s.z) <= 20) { site = s; break; }
    }
    if (!site) return { ok: false, reason: 'no-site-nearby' };
    if (state.energy < 20) return { ok: false, reason: 'too-tired' };
    state.digCooldown = 90;
    state.energy -= 20;
    state.digs += 1;
    const loot = rollLoot(site);
    moveCash(loot.value);
    state.lootValue += loot.value;
    if (loot.heat) pushHeat(loot.heat);
    gainXp(15);
    return { ok: true, lootId: loot.id, value: loot.value, siteId: site.id };
  }

  function sniff() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (!hasTrick('sniff')) return { ok: false, reason: 'not-learned' };
    if (state.sniffCooldown > 0) return { ok: false, reason: 'on-cooldown' };
    state.sniffCooldown = 60;
    state.sniffs += 1;
    const breed = breedRec();
    const smell = breed ? breed.baseSmell : 5;
    const chance = 0.25 + smell * 0.04;
    if (rnd() < chance) {
      const value = 80 + Math.floor(rnd() * 200);
      moveCash(value);
      state.contrabandFound += 1;
      gainXp(20);
      return { ok: true, found: true, value };
    }
    gainXp(5);
    return { ok: true, found: false, value: 0 };
  }

  function guardToggle() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (!hasTrick('guard')) return { ok: false, reason: 'not-learned' };
    state.guarding = !state.guarding;
    if (state.guarding) state.guards += 1;
    return { ok: true, guarding: state.guarding };
  }

  function attack() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (!hasTrick('attack')) return { ok: false, reason: 'not-learned' };
    if (state.energy < 30) return { ok: false, reason: 'too-tired' };
    state.energy -= 30;
    state.attacks += 1;
    const chance = 0.6 + state.level * 0.05;
    if (rnd() < chance) {
      pushHeat(-10);
      gainXp(25);
      return { ok: true, success: true };
    }
    state.health = Math.max(0, state.health - 15);
    return { ok: true, success: false, health: Math.round(state.health) };
  }

  function track() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (!hasTrick('track')) return { ok: false, reason: 'not-learned' };
    if (state.energy < 25) return { ok: false, reason: 'too-tired' };
    state.energy -= 25;
    state.tracks += 1;
    const chance = 0.5 + state.level * 0.04;
    if (rnd() < chance) {
      const value = 50 + Math.floor(rnd() * 150);
      moveCash(value);
      gainXp(22);
      return { ok: true, found: true, value };
    }
    gainXp(6);
    return { ok: true, found: false, value: 0 };
  }

  function vetVisit() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const cost = Math.floor(50 + (100 - state.health) * 1.5);
    if (cashOf() < cost) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-cost);
    state.health = 100;
    state.vetVisits += 1;
    state.loyalty = Math.min(100, state.loyalty + 3);
    return { ok: true, cost };
  }

  function bath() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (cashOf() < 15) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-15);
    state.clean = 100;
    state.baths += 1;
    state.happiness = clampStat(state.happiness + 10);
    return { ok: true, cost: 15 };
  }

  function rename(name) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (typeof name !== 'string' || name.length < 2 || name.length > 16) return { ok: false, reason: 'bad-name' };
    state.name = name;
    state.loyalty = Math.min(100, state.loyalty + 1);
    return { ok: true, name };
  }

  function applyPetEvent(eventId) {
    state.eventsSeen[eventId] = (state.eventsSeen[eventId] || 0) + 1;
    if (eventId === 'cop-pet') {
      pushHeat(-3);
      state.happiness = clampStat(state.happiness + 5);
    } else if (eventId === 'thunder') {
      state.happiness = clampStat(state.happiness - 10);
    } else if (eventId === 'stray-fight') {
      state.strayFights += 1;
      state.health = Math.max(0, state.health - 5);
      state.loyalty = Math.min(100, state.loyalty + 2);
    } else {
      state.happiness = clampStat(state.happiness + 8);
    }
  }

  function tick(dt) {
    if (!state.adopted) return;
    const step = dt || 0;
    state.hunger = clampStat(state.hunger - 0.08 * step);
    state.clean = clampStat(state.clean - 0.02 * step);
    if (state.guarding) state.energy = clampStat(state.energy - 0.1 * step);
    else state.energy = clampStat(state.energy + 0.25 * step);
    if (state.hunger < 15) {
      state.happiness = clampStat(state.happiness - 0.2 * step);
      state.loyalty = clampStat(state.loyalty - 0.05 * step);
    }
    if (state.hunger <= 0) state.health = Math.max(0, state.health - 0.1 * step);
    state.fetchCooldown = Math.max(0, state.fetchCooldown - step);
    state.digCooldown = Math.max(0, state.digCooldown - step);
    state.sniffCooldown = Math.max(0, state.sniffCooldown - step);
    if (state.training) {
      state.training.timeLeft -= step;
      state.energy = clampStat(state.energy - 0.2 * step);
      if (state.training.timeLeft <= 0) {
        const trickId = state.training.trickId;
        state.training = null;
        state.tricks.push(trickId);
        state.loyalty = Math.min(100, state.loyalty + 5);
        gainXp(30);
        say('Rex learned ' + trickId + '!');
      }
    }
    if (state.following) {
      const pos = posOf();
      const dx = pos.x - state.position.x;
      const dz = pos.z - state.position.z;
      const dist = Math.hypot(dx, dz);
      if (dist > 4) {
        const breed = breedRec();
        const speed = breed ? breed.baseSpeed : 6;
        const move = Math.min(dist - 3, speed * step);
        state.position.x += (dx / dist) * move;
        state.position.z += (dz / dist) * move;
      }
    }
    if (rnd() < step * 0.002) {
      const ev = PET_EVENTS[Math.floor(rnd() * PET_EVENTS.length)];
      applyPetEvent(ev.id);
    }
    state.mood = moodNow();
  }

  function tickDay(day) {
    const today = day !== undefined && day !== null ? day : dayOf();
    if (!state.adopted) return { day: today, adopted: false };
    state.daysOwned += 1;
    state.hunger = clampStat(state.hunger - 20);
    state.energy = 100;
    state.clean = clampStat(state.clean - 10);
    if (today - state.lastFedDay > 1) state.loyalty = clampStat(state.loyalty - 5);
    if (state.health < 50) say('Rex looks unwell — visit the vet.');
    return { day: today, daysOwned: state.daysOwned, loyalty: Math.round(state.loyalty), level: state.level };
  }

  function interact() {
    const pos = posOf();
    if (!state.adopted) {
      if (Math.hypot(pos.x - PET_SHELTER.x, pos.z - PET_SHELTER.z) <= 16) {
        return adopt('mutt');
      }
      return false;
    }
    const dist = Math.hypot(pos.x - state.position.x, pos.z - state.position.z);
    if (dist <= 6) {
      const res = play();
      return res.ok || res.reason === 'too-tired';
    }
    if (dist <= 30) {
      state.position.x = pos.x + 2;
      state.position.z = pos.z;
      say('Rex comes running at your whistle.');
      return true;
    }
    return false;
  }

  function hudLine() {
    if (!state.adopted) {
      const pos = posOf();
      if (Math.hypot(pos.x - PET_SHELTER.x, pos.z - PET_SHELTER.z) <= 16) return 'ADOPT A DOG at Harbor Animal Shelter';
      return '';
    }
    const bits = [];
    if (state.training) bits.push('TRAINING ' + state.training.trickId);
    if (state.hunger < 20) bits.push('HUNGRY');
    if (state.health < 30) bits.push('SICK');
    bits.push(state.name.toUpperCase() + ' Lv' + state.level + ' ' + levelName() + ' · ' + state.mood + ' · ♥' + Math.round(state.happiness) + ' · 🍖' + Math.round(state.hunger));
    return bits.join(' · ');
  }

  function stats() {
    const next = PET_LEVELS.find((l) => l.level === state.level + 1);
    return {
      adopted: state.adopted,
      name: state.name,
      breed: state.breed,
      level: state.level,
      levelName: levelName(),
      xp: state.xp,
      xpNeeded: next ? next.xpNeeded : null,
      loyalty: Math.round(state.loyalty),
      hunger: Math.round(state.hunger),
      happiness: Math.round(state.happiness),
      energy: Math.round(state.energy),
      health: Math.round(state.health),
      clean: Math.round(state.clean),
      mood: state.mood,
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
      showsEntered: state.showsEntered,
      showsWon: state.showsWon,
      fashion: [...state.fashion],
      words: [...state.words],
      photos: state.photos,
      photoLikes: state.photoLikes,
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
      showsEntered: state.showsEntered,
      showsWon: state.showsWon,
      fashion: [...state.fashion],
      words: [...state.words],
      photos: state.photos,
      photoLikes: state.photoLikes,
    };
  }

  function deserialize(saved) {
    const s = saved || {};
    state.adopted = s.adopted === true;
    state.name = typeof s.name === 'string' ? s.name : 'Rex';
    state.breed = s.breed || null;
    state.level = Math.floor(Number(s.level) || 1);
    state.xp = Number(s.xp) || 0;
    state.loyalty = Number(s.loyalty) || 0;
    state.hunger = Number(s.hunger) || 50;
    state.happiness = Number(s.happiness) || 50;
    state.energy = Number(s.energy) || 80;
    state.health = Number(s.health) || 100;
    state.clean = Number(s.clean) || 100;
    state.tricks = Array.isArray(s.tricks) ? [...s.tricks] : [];
    state.toys = Array.isArray(s.toys) ? [...s.toys] : [];
    state.fetches = Math.floor(Number(s.fetches) || 0);
    state.cashFetched = Number(s.cashFetched) || 0;
    state.bestFetch = Number(s.bestFetch) || 0;
    state.digs = Math.floor(Number(s.digs) || 0);
    state.lootValue = Number(s.lootValue) || 0;
    state.sniffs = Math.floor(Number(s.sniffs) || 0);
    state.contrabandFound = Math.floor(Number(s.contrabandFound) || 0);
    state.guards = Math.floor(Number(s.guards) || 0);
    state.attacks = Math.floor(Number(s.attacks) || 0);
    state.tracks = Math.floor(Number(s.tracks) || 0);
    state.vetVisits = Math.floor(Number(s.vetVisits) || 0);
    state.totalFed = Math.floor(Number(s.totalFed) || 0);
    state.playSessions = Math.floor(Number(s.playSessions) || 0);
    state.tricksPerformed = Math.floor(Number(s.tricksPerformed) || 0);
    state.daysOwned = Math.floor(Number(s.daysOwned) || 0);
    state.strayFights = Math.floor(Number(s.strayFights) || 0);
    state.baths = Math.floor(Number(s.baths) || 0);
    state.eventsSeen = s.eventsSeen && typeof s.eventsSeen === 'object' ? { ...s.eventsSeen } : {};
    state.lastFedDay = Math.floor(Number(s.lastFedDay) || 0);
    state.showsEntered = Math.floor(Number(s.showsEntered) || 0);
    state.showsWon = Math.floor(Number(s.showsWon) || 0);
    state.fashion = Array.isArray(s.fashion) ? [...s.fashion] : [];
    state.words = Array.isArray(s.words) ? [...s.words] : [];
    state.photos = Math.floor(Number(s.photos) || 0);
    state.photoLikes = Math.floor(Number(s.photoLikes) || 0);
    state.training = null;
    state.guarding = false;
    state.fetchCooldown = 0;
    state.digCooldown = 0;
    state.sniffCooldown = 0;
    state.mood = moodNow();
    return { ok: true };
  }

  function enterDogShow(showId) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const show = DOG_SHOWS.find((s) => s.id === showId);
    if (!show) return { ok: false, reason: 'unknown-show' };
    if (state.level < show.needLevel) return { ok: false, reason: 'level-too-low' };
    if (cashOf() < show.entry) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-show.entry);
    state.showsEntered += 1;
    const score = Math.round(state.level * 20 + state.loyalty * 0.5 + state.tricks.length * 10 + state.fashion.length * 5 + rnd() * 20);
    const rivals = [60, 90, 120, 150].map((base) => base + Math.floor(rnd() * 40));
    const beaten = rivals.filter((r) => r > score).length;
    const place = beaten + 1;
    const won = place === 1;
    let prize = 0;
    if (won) {
      prize = show.prize;
      moveCash(prize);
      state.showsWon += 1;
      state.loyalty = Math.min(100, state.loyalty + 5);
      gainXp(50);
    } else {
      gainXp(15);
    }
    return { ok: true, won, place, prize, score };
  }

  function buyFashion(itemId) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const item = FASHION_ITEMS.find((f) => f.id === itemId);
    if (!item) return { ok: false, reason: 'unknown-item' };
    if (state.fashion.includes(itemId)) return { ok: false, reason: 'already-owned' };
    if (cashOf() < item.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-item.price);
    state.fashion.push(itemId);
    state.happiness = clampStat(state.happiness + item.happiness);
    state.loyalty = Math.min(100, state.loyalty + 2);
    return { ok: true, itemId, price: item.price };
  }

  function daycare(days) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const n = days === undefined || days === null ? 1 : days;
    const cost = 25 * n;
    if (cashOf() < cost) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-cost);
    state.happiness = clampStat(state.happiness + 10 * n);
    state.loyalty = Math.min(100, state.loyalty + 3 * n);
    state.energy = 100;
    state.hunger = clampStat(state.hunger - 10 * n);
    gainXp(10 * n);
    return { ok: true, days: n, cost };
  }

  function teachWord(word) {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    if (typeof word !== 'string' || word.length < 2 || word.length > 12) return { ok: false, reason: 'bad-word' };
    if (state.words.includes(word)) return { ok: false, reason: 'already-known' };
    if (state.energy < 20) return { ok: false, reason: 'too-tired' };
    state.energy -= 20;
    state.words.push(word);
    state.loyalty = Math.min(100, state.loyalty + 3);
    gainXp(12);
    return { ok: true, word };
  }

  function petPhoto() {
    if (!state.adopted) return { ok: false, reason: 'no-pet' };
    const fans = state.fans || 0;
    const likes = fans + state.level * 10 + Math.floor(rnd() * 50);
    state.photos += 1;
    state.photoLikes += likes;
    return { ok: true, likes, photos: state.photos };
  }

  return {
    name: 'Pet',
    state,
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
    tick,
    tickDay,
    interact,
    hudLine,
    stats,
    serialize,
    deserialize,
    enterDogShow,
    buyFashion,
    daycare,
    teachWord,
    petPhoto,
  };
}
