// Solara Nights — Horse Ranch / Wild Stables (Round 7, written fresh).
// Ria runs a ranch on Solara's west flats: buy foals, train them,
// breed champions, and race them at the track or sell them to buyers
// who pay for speed, stamina and bloodlines. A good horse needs feed,
// grooming, a farrier and a vet; a neglected one goes lame and loses
// its value. Wild mustangs roam the flats — break one and it is yours
// for free, if you can stay in the saddle. The derby pays a fortune
// to the fastest horse in Solara, and the stud book remembers every
// champion's bloodline.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const HORSE_BREEDS = [
  { id: 'mustang', name: 'Wild Mustang', value: 120, speed: 7, stamina: 8, temperament: 5, rarity: 0.2, desc: 'Free on the flats — if you can break it.' },
  { id: 'thoroughbred', name: 'Thoroughbred', value: 500, speed: 10, stamina: 6, temperament: 3, rarity: 0.08, desc: 'Bred for the track. Fast, fragile, expensive.' },
  { id: 'quarter', name: 'Quarter Horse', value: 300, speed: 8, stamina: 7, temperament: 2, rarity: 0.14, desc: 'A sprinter with a calm head.' },
  { id: 'arabian', name: 'Arabian', value: 450, speed: 8, stamina: 10, temperament: 4, rarity: 0.09, desc: 'Endurance royalty — never seems to tire.' },
  { id: 'clydesdale', name: 'Clydesdale', value: 280, speed: 4, stamina: 9, temperament: 1, rarity: 0.12, desc: 'A gentle giant that pulls anything.' },
  { id: 'appaloosa', name: 'Appaloosa', value: 320, speed: 7, stamina: 7, temperament: 3, rarity: 0.11, desc: 'Spotted, sure-footed, and brave.' },
  { id: 'friesian', name: 'Friesian', value: 480, speed: 7, stamina: 7, temperament: 2, rarity: 0.07, desc: 'Black, beautiful, and built for the show ring.' },
  { id: 'morgan', name: 'Morgan', value: 260, speed: 6, stamina: 8, temperament: 2, rarity: 0.13, desc: 'The honest all-rounder of the ranch.' },
  { id: 'andalusian', name: 'Andalusian', value: 520, speed: 8, stamina: 6, temperament: 3, rarity: 0.06, desc: 'A dancer in the dressage ring.' },
  { id: 'paint', name: 'Paint Horse', value: 290, speed: 7, stamina: 7, temperament: 3, rarity: 0.12, desc: 'Colourful, clever, and quick to learn.' },
  { id: 'shetland', name: 'Shetland Pony', value: 90, speed: 3, stamina: 5, temperament: 1, rarity: 0.22, desc: 'Small, stubborn, and adored by children.' },
  { id: 'warmblood', name: 'Warmblood', value: 420, speed: 8, stamina: 8, temperament: 3, rarity: 0.08, desc: 'The sport horse — jumps, gallops, wins.' },
];

export const HORSE_RACES = [
  { id: 'meadow-sprint', name: 'Meadow Sprint', distance: 400, purse: 200, difficulty: 1, desc: 'A short flat sprint for young horses.' },
  { id: 'river-mile', name: 'River Mile', distance: 1600, purse: 400, difficulty: 2, desc: 'A mile along the river — speed and nerve.' },
  { id: 'ridge-derby', name: 'Ridge Derby', distance: 2400, purse: 800, difficulty: 3, desc: 'The big local derby. Everyone watches.' },
  { id: 'endurance', name: 'Endurance Trial', distance: 5000, purse: 700, difficulty: 3, desc: 'Five kilometres of hills. Stamina wins.' },
  { id: 'steeplechase', name: 'Steeplechase', distance: 3200, purse: 1000, difficulty: 4, desc: 'Fences, water, and a long hard run.' },
  { id: 'grand-derby', name: 'Solara Grand Derby', distance: 2400, purse: 2500, difficulty: 5, desc: 'The richest race in Solara. Champions only.' },
];

export const HORSE_BUYERS = [
  { id: 'stable', name: 'Riding Stable', mult: 1.0, likes: ['calm'], dislikes: [], mood: 'steady', minRank: 0, desc: 'Buys calm horses for lessons.' },
  { id: 'racer', name: 'Racing Syndicate', mult: 1.4, likes: ['fast'], dislikes: [], mood: 'fancy', minRank: 2, desc: 'Pays for speed, and only speed.' },
  { id: 'show', name: 'Show Ring', mult: 1.3, likes: ['beauty'], dislikes: [], mood: 'fancy', minRank: 1, desc: 'Buys beautiful horses for the ring.' },
  { id: 'farmer', name: 'Farm Co-op', mult: 0.9, likes: ['strong'], dislikes: [], mood: 'quick', minRank: 0, desc: 'Buys strong horses for work.' },
  { id: 'collector', name: 'Bloodline Collector', mult: 1.6, likes: ['champion'], dislikes: [], mood: 'odd', minRank: 3, desc: 'Pays a fortune for champion bloodlines.' },
];

export const HORSE_UPGRADES = [
  { id: 'stable', name: 'Stable Block', cost: 200, desc: 'Room for 4 more horses.', effect: 'stable' },
  { id: 'feed', name: 'Quality Feed', cost: 150, desc: 'Horses train 25% faster.', effect: 'feed' },
  { id: 'tack', name: 'Racing Tack', cost: 250, desc: 'Race speed +1 for every horse.', effect: 'tack' },
  { id: 'farrier', name: 'Farrier Contract', cost: 180, desc: 'Lameness risk halved.', effect: 'farrier' },
  { id: 'vet', name: 'Vet on Call', cost: 320, desc: 'Sick horses recover in a day.', effect: 'vet' },
  { id: 'track', name: 'Private Track', cost: 600, desc: 'Train at home: +1 training per day.', effect: 'track' },
  { id: 'breeder', name: 'Stud Book', cost: 500, desc: 'Breed champions: foals inherit +1 speed.', effect: 'stud' },
  { id: 'arena', name: 'Show Arena', cost: 900, desc: 'Show horses earn double at the ring.', effect: 'arena' },
];

export const HORSE_RANKS = [
  { level: 0, name: 'Stable Hand', xp: 0, perk: 'Base prices, base training.' },
  { level: 1, name: 'Ranch Hand', xp: 120, perk: '+10% sale prices.' },
  { level: 2, name: 'Horse Trainer', xp: 300, perk: '+10% training speed.' },
  { level: 3, name: 'Ranch Owner', xp: 620, perk: '+20% sale prices, the derby opens.' },
  { level: 4, name: 'Master of Wild Stables', xp: 1100, perk: '+30% sale prices, champion foals.' },
];

export const HORSE_TRAITS = [
  { id: 'swift', name: 'Swift', speed: 2, stamina: 0, desc: 'Born fast.' },
  { id: 'enduring', name: 'Enduring', speed: 0, stamina: 2, desc: 'Never seems to tire.' },
  { id: 'calm', name: 'Calm', speed: 0, stamina: 0, desc: 'A steady head under pressure.' },
  { id: 'brave', name: 'Brave', speed: 1, stamina: 1, desc: 'Jumps anything, fears nothing.' },
  { id: 'clever', name: 'Clever', speed: 1, stamina: 0, desc: 'Learns fast, remembers everything.' },
  { id: 'strong', name: 'Strong', speed: 0, stamina: 1, desc: 'Pulls a plough like it is nothing.' },
];

export const HORSE_EVENTS = [
  { id: 'foaling-season', name: 'Foaling Season', mult: 1.4, breeds: [], desc: 'Mares foal — new life in the stables.' },
  { id: 'derby-week', name: 'Derby Week', mult: 1.5, breeds: ['thoroughbred', 'warmblood'], desc: 'The town talks of nothing but the derby.' },
  { id: 'flu-outbreak', name: 'Flu Outbreak', mult: 0.7, breeds: [], desc: 'A cough spreads through the stables.' },
  { id: 'mustang-run', name: 'Mustang Run', mult: 1.5, breeds: ['mustang'], desc: 'A wild herd crosses the flats — catch one.' },
  { id: 'show-season', name: 'Show Season', mult: 1.4, breeds: ['friesian', 'andalusian'], desc: 'The show ring is in town; beauty pays.' },
  { id: 'drought', name: 'Drought', mult: 0.8, breeds: [], desc: 'Feed is scarce and expensive.' },
];

export const HORSE_CONTRACTS = [
  { id: 'sell-3', name: 'Three Horses', breed: 'any', qty: 3, pay: 400, days: 3, rep: 0, desc: 'Sell three horses to the riding stable.' },
  { id: 'win-2', name: 'Two Wins', breed: 'any', qty: 2, pay: 600, days: 3, rep: 1, desc: 'Win two races this week.' },
  { id: 'breed-1', name: 'First Foal', breed: 'any', qty: 1, pay: 500, days: 3, rep: 1, desc: 'Breed your first foal.' },
  { id: 'derby-1', name: 'Derby Glory', breed: 'thoroughbred', qty: 1, pay: 1200, days: 3, rep: 3, desc: 'Win the Solara Grand Derby.' },
  { id: 'train-5', name: 'Training Week', breed: 'any', qty: 5, pay: 350, days: 2, rep: 0, desc: 'Train five horses this week.' },
  { id: 'mustang-2', name: 'Mustang Pair', breed: 'mustang', qty: 2, pay: 480, days: 3, rep: 2, desc: 'Break two wild mustangs.' },
];

export function horseRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < HORSE_RANKS.length; i++) {
    if (xp >= HORSE_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function horseValue(horse, rank, upgrades) {
  const breed = HORSE_BREEDS.find((b) => b.id === horse.breed);
  let value = breed ? breed.value : 100;
  value += horse.training * 15;
  value += horse.wins * 80;
  value += horse.traits.length * 40;
  value *= 1 + rank * 0.1;
  if (horse.champion) value *= 1.5;
  if (horse.lame) value *= 0.5;
  return Math.max(10, Math.round(value));
}

export function horseBuyerPrice(horse, buyerId, rank, upgrades) {
  const buyer = HORSE_BUYERS.find((b) => b.id === buyerId);
  if (!buyer) return 0;
  let mult = buyer.mult;
  if (horse.speed >= 9 && buyer.likes.includes('fast')) mult += 0.2;
  if (horse.temperament <= 2 && buyer.likes.includes('calm')) mult += 0.15;
  if (horse.champion && buyer.likes.includes('champion')) mult += 0.3;
  if (horse.stamina >= 9 && buyer.likes.includes('strong')) mult += 0.15;
  return Math.max(10, Math.round(horseValue(horse, rank, upgrades) * mult));
}

export function horseRaceChance(horse, race, rank, upgrades) {
  let score = horse.speed * 2 + horse.stamina + horse.training;
  if (upgrades.includes('tack')) score += 2;
  let chance = 0.3 + score * 0.02 + rank * 0.03;
  chance -= (race.difficulty - 1) * 0.08;
  if (horse.lame) chance -= 0.3;
  if (horse.champion) chance += 0.1;
  return Math.max(0.05, Math.min(0.95, chance));
}

export function horseStableCap(upgrades) {
  let cap = 6;
  if (upgrades.includes('stable')) cap += 4;
  return cap;
}

export function createHorseRanchSystem(ctx) {
  const c = ctx || {};
  const rng = typeof c.rng === 'function' ? c.rng : Math.random;
  const getCash = typeof c.getCash === 'function' ? c.getCash : () => 0;
  const addCash = typeof c.addCash === 'function' ? c.addCash : () => {};
  const addHeat = typeof c.addHeat === 'function' ? c.addHeat : () => {};
  const log = typeof c.log === 'function' ? c.log : () => {};
  const getDay = typeof c.getDay === 'function' ? c.getDay : () => 1;
  const getHour = typeof c.getHour === 'function' ? c.getHour : () => 12;
  const getPos = typeof c.getPlayerPos === 'function' ? c.getPlayerPos : () => ({ x: 0, z: 0 });
  const getWeather = typeof c.getWeather === 'function' ? c.getWeather : () => ({ condition: 'clear' });

  const state = {
    xp: 0,
    rank: 0,
    horses: [],
    horseCount: 0,
    races: 0,
    wins: 0,
    places: 0,
    foals: 0,
    mustangs: 0,
    sold: 0,
    earned: 0,
    spent: 0,
    feedCost: 0,
    vetCost: 0,
    lameness: 0,
    champions: 0,
    upgrades: [],
    lastDay: 1,
    activeContract: null,
    contractProgress: 0,
    contractsDone: 0,
    contractsFailed: 0,
    bestHorse: null,
    bestWins: 0,
    dailyTrained: 0,
    dailyEarned: 0,
    currentEvent: null,
    trainingDone: 0,
    derbyWins: 0,
  };

  function refreshRank() {
    const r = horseRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Ranch rank up: ${HORSE_RANKS[r].name} — ${HORSE_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function makeHorse(breedId) {
    const breed = HORSE_BREEDS.find((b) => b.id === breedId);
    const trait = HORSE_TRAITS[Math.floor(rng() * HORSE_TRAITS.length)];
    return {
      id: `${breedId}-${state.horseCount + 1}`,
      breed: breedId,
      name: `${breed.name} ${state.horseCount + 1}`,
      speed: breed.speed,
      stamina: breed.stamina,
      temperament: breed.temperament,
      training: 0,
      wins: 0,
      races: 0,
      traits: [trait.id],
      lame: false,
      sick: false,
      age: 0,
      champion: false,
      fed: true,
    };
  }

  function buyHorse(breedId) {
    const breed = HORSE_BREEDS.find((b) => b.id === breedId);
    if (!breed) return { ok: false, reason: 'no-such-breed' };
    if (state.horses.length >= horseStableCap(state.upgrades)) return { ok: false, reason: 'stable-full' };
    if (getCash() < breed.value) return { ok: false, reason: 'not-enough-cash', cost: breed.value };
    addCash(-breed.value);
    state.spent += breed.value;
    const horse = makeHorse(breedId);
    state.horses.push(horse);
    state.horseCount += 1;
    gainXp(15);
    log(`Bought a ${breed.name} for $${breed.value} — welcome to the ranch.`);
    return { ok: true, horse: horse.id, breed: breedId };
  }

  function catchMustang() {
    if (state.currentEvent !== 'mustang-run' && rng() > 0.3) {
      log('No wild herd on the flats today — try again tomorrow.');
      return { ok: false, reason: 'no-herd' };
    }
    if (state.horses.length >= horseStableCap(state.upgrades)) return { ok: false, reason: 'stable-full' };
    const breakChance = 0.4 + state.rank * 0.05;
    if (rng() > breakChance) {
      log('The mustang throws you in the dust — it gallops away laughing.');
      return { ok: true, caught: false };
    }
    const horse = makeHorse('mustang');
    horse.speed += 1;
    state.horses.push(horse);
    state.horseCount += 1;
    state.mustangs += 1;
    gainXp(40);
    log(`You broke a wild mustang! It is yours now — free, fast, and proud.`);
    return { ok: true, caught: true, horse: horse.id };
  }

  function trainHorse(horseId) {
    const horse = state.horses.find((h) => h.id === horseId);
    if (!horse) return { ok: false, reason: 'no-such-horse' };
    if (horse.lame) return { ok: false, reason: 'lame' };
    if (horse.sick) return { ok: false, reason: 'sick' };
    const gain = state.upgrades.includes('feed') ? 2 : 1;
    const extra = state.upgrades.includes('track') ? 1 : 0;
    horse.training += gain + extra;
    horse.speed = Math.min(12, horse.speed + (rng() < 0.3 ? 1 : 0));
    horse.stamina = Math.min(12, horse.stamina + (rng() < 0.2 ? 1 : 0));
    state.trainingDone += 1;
    state.dailyTrained += 1;
    gainXp(5);
    if (rng() < (state.upgrades.includes('farrier') ? 0.03 : 0.08)) {
      horse.lame = true;
      state.lameness += 1;
      log(`${horse.name} goes lame during training — rest and the farrier.`);
      return { ok: true, trained: true, lame: true, training: horse.training };
    }
    if (state.activeContract && state.activeContract.id === 'train-5') {
      state.contractProgress += 1;
      if (state.contractProgress >= state.activeContract.qty) {
        const bonus = state.activeContract.pay + state.rank * 50;
        const name = state.activeContract.name;
        state.activeContract = null;
        state.contractProgress = 0;
        state.contractsDone += 1;
        state.earned += bonus;
        addCash(bonus);
        gainXp(60);
        log(`Contract complete: ${name} paid $${bonus}.`);
      }
    }
    log(`Trained ${horse.name} — training ${horse.training}, speed ${horse.speed}.`);
    return { ok: true, trained: true, training: horse.training };
  }

  function feedHorse(horseId) {
    const horse = state.horses.find((h) => h.id === horseId);
    if (!horse) return { ok: false, reason: 'no-such-horse' };
    const cost = 5;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.feedCost += cost;
    horse.fed = true;
    horse.stamina = Math.min(12, horse.stamina + 1);
    gainXp(2);
    log(`Fed ${horse.name} — it nickers happily.`);
    return { ok: true, horse: horseId };
  }

  function groomHorse(horseId) {
    const horse = state.horses.find((h) => h.id === horseId);
    if (!horse) return { ok: false, reason: 'no-such-horse' };
    horse.temperament = Math.max(1, horse.temperament - 1);
    gainXp(3);
    log(`Groomed ${horse.name} — it stands calm and glossy.`);
    return { ok: true, horse: horseId, temperament: horse.temperament };
  }

  function vetHorse(horseId) {
    const horse = state.horses.find((h) => h.id === horseId);
    if (!horse) return { ok: false, reason: 'no-such-horse' };
    const cost = state.upgrades.includes('vet') ? 20 : 50;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.vetCost += cost;
    horse.lame = false;
    horse.sick = false;
    gainXp(5);
    log(`The vet treats ${horse.name} — sound again.`);
    return { ok: true, horse: horseId, cost };
  }

  function raceHorse(horseId, raceId) {
    const horse = state.horses.find((h) => h.id === horseId);
    if (!horse) return { ok: false, reason: 'no-such-horse' };
    const race = HORSE_RACES.find((r) => r.id === raceId);
    if (!race) return { ok: false, reason: 'no-such-race' };
    if (raceId === 'grand-derby' && state.rank < 3) return { ok: false, reason: 'rank-too-low', need: 3 };
    if (horse.lame || horse.sick) return { ok: false, reason: 'not-fit' };
    const entry = 20 + race.difficulty * 10;
    if (getCash() < entry) return { ok: false, reason: 'not-enough-cash', entry };
    addCash(-entry);
    state.spent += entry;
    const chance = horseRaceChance(horse, race, state.rank, state.upgrades);
    const roll = rng();
    horse.races += 1;
    state.races += 1;
    if (roll > chance) {
      const place = roll < chance + 0.15 ? 2 : 3 + Math.floor(rng() * 3);
      if (place === 2) {
        state.places += 1;
        const prize = Math.round(race.purse * 0.2);
        state.earned += prize;
        addCash(prize);
        log(`${horse.name} places 2nd in the ${race.name} — $${prize}.`);
        return { ok: true, won: false, place: 2, prize };
      }
      log(`${horse.name} finishes ${place}th in the ${race.name} — no prize.`);
      return { ok: true, won: false, place, prize: 0 };
    }
    horse.wins += 1;
    state.wins += 1;
    const prize = race.purse + state.rank * 50;
    state.earned += prize;
    state.dailyEarned += prize;
    addCash(prize);
    gainXp(30 + race.difficulty * 10);
    if (raceId === 'grand-derby') {
      state.derbyWins += 1;
      horse.champion = true;
      state.champions += 1;
      log(`CHAMPION! ${horse.name} wins the Solara Grand Derby — $${prize}!`);
    } else {
      log(`${horse.name} WINS the ${race.name} — $${prize}!`);
    }
    if (horse.wins > state.bestWins) { state.bestWins = horse.wins; state.bestHorse = horse.id; }
    if (state.activeContract) checkContract(horse, race);
    return { ok: true, won: true, place: 1, prize };
  }

  function breedHorses(sireId, damId) {
    const sire = state.horses.find((h) => h.id === sireId);
    const dam = state.horses.find((h) => h.id === damId);
    if (!sire || !dam) return { ok: false, reason: 'no-such-horse' };
    if (sireId === damId) return { ok: false, reason: 'same-horse' };
    if (state.horses.length >= horseStableCap(state.upgrades)) return { ok: false, reason: 'stable-full' };
    const cost = state.upgrades.includes('breeder') ? 0 : 60;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    const breedId = rng() < 0.5 ? sire.breed : dam.breed;
    const foal = makeHorse(breedId);
    foal.speed = Math.min(12, Math.round((sire.speed + dam.speed) / 2) + (state.upgrades.includes('stud') ? 1 : 0));
    foal.stamina = Math.min(12, Math.round((sire.stamina + dam.stamina) / 2));
    foal.traits = [...new Set([...sire.traits, ...dam.traits])].slice(0, 2);
    foal.name = `Foal of ${sire.name} & ${dam.name}`;
    state.horses.push(foal);
    state.horseCount += 1;
    state.foals += 1;
    gainXp(40);
    log(`A foal is born! ${foal.name} — speed ${foal.speed}, stamina ${foal.stamina}.`);
    return { ok: true, foal: foal.id, breed: breedId };
  }

  function sellHorse(buyerId, horseId) {
    const buyer = HORSE_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    if (state.rank < buyer.minRank) return { ok: false, reason: 'rank-too-low', need: buyer.minRank };
    const idx = state.horses.findIndex((h) => h.id === horseId);
    if (idx < 0) return { ok: false, reason: 'no-such-horse' };
    const horse = state.horses[idx];
    const price = horseBuyerPrice(horse, buyerId, state.rank, state.upgrades);
    state.horses.splice(idx, 1);
    state.sold += 1;
    state.earned += price;
    state.dailyEarned += price;
    addCash(price);
    gainXp(20);
    if (state.activeContract && state.activeContract.id === 'sell-3') {
      state.contractProgress += 1;
      if (state.contractProgress >= state.activeContract.qty) {
        const bonus = state.activeContract.pay + state.rank * 50;
        const name = state.activeContract.name;
        state.activeContract = null;
        state.contractProgress = 0;
        state.contractsDone += 1;
        state.earned += bonus;
        addCash(bonus);
        gainXp(60);
        log(`Contract complete: ${name} paid $${bonus}.`);
      }
    }
    log(`Sold ${horse.name} to ${buyer.name} for $${price}.`);
    return { ok: true, price, horse: horseId };
  }

  function buyUpgrade(id) {
    const u = HORSE_UPGRADES.find((x) => x.id === id);
    if (!u) return { ok: false, reason: 'no-such-upgrade' };
    if (state.upgrades.includes(id)) return { ok: false, reason: 'already-owned' };
    if (getCash() < u.cost) return { ok: false, reason: 'not-enough-cash', cost: u.cost };
    addCash(-u.cost);
    state.spent += u.cost;
    state.upgrades.push(id);
    gainXp(20);
    log(`Bought ${u.name} for $${u.cost}.`);
    return { ok: true, id };
  }

  function takeContract(id) {
    const ct = HORSE_CONTRACTS.find((x) => x.id === id);
    if (!ct) return { ok: false, reason: 'no-such-contract' };
    if (state.activeContract) return { ok: false, reason: 'contract-active' };
    if (state.rank < ct.rep) return { ok: false, reason: 'rep-too-low', need: ct.rep };
    state.activeContract = { ...ct, dayTaken: getDay(), deadlineDay: getDay() + ct.days };
    state.contractProgress = 0;
    log(`Contract taken: ${ct.name} — ${ct.qty}x by day ${state.activeContract.deadlineDay}.`);
    return { ok: true, contract: state.activeContract };
  }

  function checkContract(horse, race) {
    const ct = state.activeContract;
    if (!ct) return;
    if (ct.id === 'win-2') {
      state.contractProgress += 1;
    } else if (ct.id === 'derby-1' && race.id === 'grand-derby') {
      state.contractProgress += 1;
    } else if (ct.id === 'mustang-2' && horse.breed === 'mustang') {
      state.contractProgress += 1;
    } else {
      return;
    }
    if (state.contractProgress >= ct.qty) {
      const bonus = ct.pay + state.rank * 50;
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractsDone += 1;
      state.earned += bonus;
      addCash(bonus);
      gainXp(60);
      log(`Contract complete: ${ct.name} paid $${bonus}.`);
    }
  }

  function deliverContract() {
    const ct = state.activeContract;
    if (!ct) return { ok: false, reason: 'no-contract' };
    if (state.contractProgress < ct.qty) return { ok: false, reason: 'not-enough', have: state.contractProgress, need: ct.qty };
    const bonus = ct.pay + state.rank * 50;
    state.activeContract = null;
    state.contractProgress = 0;
    state.contractsDone += 1;
    state.earned += bonus;
    addCash(bonus);
    gainXp(60);
    log(`Contract delivered: ${ct.name} paid $${bonus}.`);
    return { ok: true, pay: bonus };
  }

  function abandonContract() {
    if (!state.activeContract) return { ok: false, reason: 'no-contract' };
    state.activeContract = null;
    state.contractProgress = 0;
    state.contractsFailed += 1;
    log('Contract abandoned — the client will remember that.');
    return { ok: true };
  }

  function stableReport() {
    return state.horses.map((h) => ({
      id: h.id, name: h.name, breed: h.breed, speed: h.speed,
      stamina: h.stamina, temperament: h.temperament, training: h.training,
      wins: h.wins, races: h.races, traits: [...h.traits],
      lame: h.lame, sick: h.sick, champion: h.champion,
      value: horseValue(h, state.rank, state.upgrades),
    }));
  }

  function raceReport() {
    return HORSE_RACES.map((r) => ({
      id: r.id, name: r.name, distance: r.distance, purse: r.purse, difficulty: r.difficulty,
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.2) {
      const ev = HORSE_EVENTS[Math.floor(rng() * HORSE_EVENTS.length)];
      state.currentEvent = ev.id;
      log(`Ranch news: ${ev.name} — ${ev.desc}`);
      return { event: ev.id, name: ev.name };
    }
    if (roll < 0.3) {
      const horse = state.horses[Math.floor(rng() * state.horses.length)];
      if (horse) {
        horse.training += 1;
        log(`${horse.name} learns something new on its own.`);
        return { event: 'gift', horse: horse.id };
      }
    }
    state.currentEvent = null;
    return { event: 'none' };
  }

  function tick(dt) {
    if (state.horses.length > 0 && rng() < dt * 0.005) {
      log('A horse nickers from the stable. The ranch is quiet.');
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyTrained = 0;
    state.dailyEarned = 0;
    if (state.activeContract && day >= state.activeContract.deadlineDay && state.contractProgress < state.activeContract.qty) {
      log(`Contract ${state.activeContract.name} expired — the client walked away.`);
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractsFailed += 1;
    }
    for (const horse of state.horses) {
      horse.age += 1;
      if (!horse.fed) {
        horse.stamina = Math.max(1, horse.stamina - 1);
      }
      horse.fed = false;
      if (state.currentEvent === 'flu-outbreak' && rng() < 0.2) {
        horse.sick = true;
        log(`${horse.name} catches the flu — call the vet.`);
      }
      if (horse.sick && state.upgrades.includes('vet')) {
        horse.sick = false;
        log(`${horse.name} recovers with the vet on call.`);
      }
      if (horse.lame && rng() < 0.3) {
        horse.lame = false;
        log(`${horse.name} recovers from lameness with rest.`);
      }
    }
    const feedBill = state.horses.length * 5;
    if (feedBill > 0) {
      if (getCash() >= feedBill) {
        addCash(-feedBill);
        state.spent += feedBill;
        state.feedCost += feedBill;
      } else {
        log(`Cannot afford feed ($${feedBill}) — horses go hungry.`);
      }
    }
    dailyEvent();
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, horses: state.horses,
      horseCount: state.horseCount, races: state.races, wins: state.wins,
      places: state.places, foals: state.foals, mustangs: state.mustangs,
      sold: state.sold, earned: state.earned, spent: state.spent,
      feedCost: state.feedCost, vetCost: state.vetCost,
      lameness: state.lameness, champions: state.champions,
      upgrades: state.upgrades, lastDay: state.lastDay,
      activeContract: state.activeContract, contractProgress: state.contractProgress,
      contractsDone: state.contractsDone, contractsFailed: state.contractsFailed,
      bestHorse: state.bestHorse, bestWins: state.bestWins,
      dailyTrained: state.dailyTrained, dailyEarned: state.dailyEarned,
      currentEvent: state.currentEvent, trainingDone: state.trainingDone,
      derbyWins: state.derbyWins,
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
      rank: HORSE_RANKS[state.rank].name,
      xp: state.xp,
      horses: state.horses.length,
      horseCount: state.horseCount,
      races: state.races,
      wins: state.wins,
      places: state.places,
      foals: state.foals,
      mustangs: state.mustangs,
      sold: state.sold,
      earned: Math.round(state.earned),
      spent: state.spent,
      feedCost: state.feedCost,
      vetCost: state.vetCost,
      lameness: state.lameness,
      champions: state.champions,
      derbyWins: state.derbyWins,
      upgrades: state.upgrades.length,
      stableCap: horseStableCap(state.upgrades),
      activeContract: state.activeContract ? state.activeContract.id : null,
      contractsDone: state.contractsDone,
      contractsFailed: state.contractsFailed,
      bestHorse: state.bestHorse,
      bestWins: state.bestWins,
      dailyTrained: state.dailyTrained,
      dailyEarned: Math.round(state.dailyEarned),
      trainingDone: state.trainingDone,
      event: state.currentEvent,
    };
  }

  function hudLine() {
    if (state.horses.length === 0) return 'Ranch: no horses yet — buy or catch one';
    const lame = state.horses.filter((h) => h.lame).length;
    if (lame > 0) return `Ranch: ${lame} lame horse${lame > 1 ? 's' : ''} — call the vet`;
    const sick = state.horses.filter((h) => h.sick).length;
    if (sick > 0) return `Ranch: ${sick} sick horse${sick > 1 ? 's' : ''} — call the vet`;
    if (state.activeContract) return `Ranch: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    return `Ranch: ${state.horses.length} horses, ${state.wins} wins`;
  }

  function interact() {
    const pos = getPos();
    const nearRanch = Math.hypot(pos.x - 800, pos.z - 200) < 40;
    if (!nearRanch) return false;
    if (state.horses.length === 0) { catchMustang(); return true; }
    trainHorse(state.horses[0].id);
    return true;
  }

  return {
    state, buyHorse, catchMustang, trainHorse, feedHorse, groomHorse,
    vetHorse, raceHorse, breedHorses, sellHorse, buyUpgrade,
    takeContract, deliverContract, abandonContract, stableReport,
    raceReport, dailyEvent,
    tick, tickDay, serialize, deserialize, stats, hudLine, interact,
  };
}

export const HORSE_HELPERS = [
  { id: 'groom', name: 'Groom Ellie', wage: 30, skill: 'groom', bonus: 0.2, desc: 'Keeps coats glossy: horses train 20% faster.' },
  { id: 'trainer', name: 'Trainer Cole', wage: 60, skill: 'train', bonus: 0.3, desc: 'A real trainer: +30% training speed.' },
  { id: 'jockey', name: 'Jockey Pip', wage: 55, skill: 'race', bonus: 0.15, desc: 'Rides like the wind: +15% race chance.' },
  { id: 'breeder', name: 'Breeder Ana', wage: 65, skill: 'breed', bonus: 0.25, desc: 'Foals inherit the best of both parents.' },
];

export const HORSE_CHALLENGES = [
  { id: 'horses-5', name: 'Five Horses', target: 'horseCount', goal: 5, xp: 80, desc: 'Own 5 horses in total.' },
  { id: 'wins-5', name: 'Five Wins', target: 'wins', goal: 5, xp: 120, desc: 'Win 5 races.' },
  { id: 'foals-3', name: 'Foal Maker', target: 'foals', goal: 3, xp: 120, desc: 'Breed 3 foals.' },
  { id: 'mustangs-3', name: 'Mustang Tamer', target: 'mustangs', goal: 3, xp: 150, desc: 'Break 3 wild mustangs.' },
  { id: 'derby-1', name: 'Derby Champion', target: 'derbyWins', goal: 1, xp: 200, desc: 'Win the Solara Grand Derby.' },
  { id: 'earn-1500', name: 'Ranch Purse', target: 'earned', goal: 1500, xp: 120, desc: 'Earn $1,500 from the ranch.' },
  { id: 'train-20', name: 'Training Pro', target: 'trainingDone', goal: 20, xp: 100, desc: 'Train horses 20 times.' },
  { id: 'contracts-5', name: 'Reliable Rancher', target: 'contractsDone', goal: 5, xp: 140, desc: 'Complete 5 ranch contracts.' },
];

export const HORSE_ACHIEVEMENTS = [
  { id: 'first-horse', name: 'First Horse', check: (s) => s.horseCount >= 1, desc: 'Own your first horse.' },
  { id: 'first-win', name: 'First Win', check: (s) => s.wins >= 1, desc: 'Win your first race.' },
  { id: 'first-foal', name: 'First Foal', check: (s) => s.foals >= 1, desc: 'Breed your first foal.' },
  { id: 'first-mustang', name: 'First Mustang', check: (s) => s.mustangs >= 1, desc: 'Break your first wild mustang.' },
  { id: 'rank-3', name: 'Ranch Owner', check: (s) => s.rank >= 3, desc: 'Reach rank Ranch Owner.' },
  { id: 'rich-rancher', name: 'Rich Rancher', check: (s) => s.earned >= 3000, desc: 'Earn $3,000 from the ranch.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every ranch upgrade.' },
  { id: 'champion', name: 'Champion Maker', check: (s) => s.champions >= 1, desc: 'Raise a Grand Derby champion.' },
];

export function horseHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of HORSE_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function horseChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function createHorseRanchExtras(system) {
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  function hireHelper(id) {
    const h = HORSE_HELPERS.find((x) => x.id === id);
    if (!h) return { ok: false, reason: 'no-such-helper' };
    if (helpers.includes(id)) return { ok: false, reason: 'already-hired' };
    helpers.push(id);
    return { ok: true, id, name: h.name, wage: h.wage };
  }

  function fireHelper(id) {
    const i = helpers.indexOf(id);
    if (i < 0) return { ok: false, reason: 'not-hired' };
    helpers.splice(i, 1);
    return { ok: true, id };
  }

  function payWages() {
    let due = 0;
    for (const id of helpers) {
      const h = HORSE_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    wagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: wagesPaid };
  }

  function helperBonus(skill) {
    return horseHelperBonus(helpers, skill);
  }

  function challenges() {
    return HORSE_CHALLENGES.map((ch) => horseChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = HORSE_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = horseChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return HORSE_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function inspectHorse(horseId) {
    const horse = system.state.horses.find((h) => h.id === horseId);
    if (!horse) return { ok: false, reason: 'no-such-horse' };
    return { ok: true, ...horse, value: horseValue(horse, system.state.rank, system.state.upgrades) };
  }

  function stableValue() {
    let total = 0;
    for (const h of system.state.horses) {
      total += horseValue(h, system.state.rank, system.state.upgrades);
    }
    return { ok: true, value: Math.round(total), horses: system.state.horses.length };
  }

  function bloodlines() {
    return system.state.horses
      .filter((h) => h.champion || h.wins >= 3)
      .map((h) => ({ id: h.id, name: h.name, breed: h.breed, wins: h.wins, champion: h.champion }));
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, inspectHorse, stableValue, bloodlines,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return wagesPaid; },
  };
}

export const HORSE_TIPS = [
  { id: 'feed-first', name: 'Feed First', text: 'A hungry horse cannot train. Feed every day.' },
  { id: 'mustang', name: 'Mustangs', text: 'Wild mustangs are free — if you can stay in the saddle.' },
  { id: 'train', name: 'Train Daily', text: 'A little training every day beats a hard week once.' },
  { id: 'breed', name: 'Breed Champions', text: 'Breed your two best horses — foals inherit both.' },
  { id: 'derby', name: 'The Derby', text: 'The Grand Derby pays $2,500. Train for it all season.' },
  { id: 'vet', name: 'Vet on Call', text: 'Lameness ruins a horse’s value. Call the vet fast.' },
  { id: 'groom', name: 'Groom Daily', text: 'Grooming calms a horse and builds trust.' },
  { id: 'sell', name: 'Sell Smart', text: 'Sell fast horses to the syndicate, calm ones to the stable.' },
];

export const HORSE_LEADERBOARD = [
  { name: 'Trainer Cole', wins: 210, desc: 'Trains champions for the syndicate.' },
  { name: 'Jockey Pip', wins: 180, desc: 'Rides like the wind.' },
  { name: 'Ria', wins: 0, desc: 'You. Climbing.' },
  { name: 'Breeder Ana', wins: 140, desc: 'Breeds winners, not losers.' },
  { name: 'Groom Ellie', wins: 90, desc: 'Knows every horse by name.' },
];

export function horseTipFor(day) {
  return HORSE_TIPS[day % HORSE_TIPS.length];
}

export function horseLeaderboardWith(playerWins) {
  const board = HORSE_LEADERBOARD.map((e) => ({
    name: e.name, wins: e.name === 'Ria' ? playerWins : e.wins, desc: e.desc,
  }));
  board.sort((a, b) => b.wins - a.wins);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function horseEfficiency(wins, races) {
  if (races === 0) return 0;
  return Math.round((wins / races) * 100);
}

export function horseProfitPerRace(earned, races) {
  if (races === 0) return 0;
  return Math.round((earned / races) * 10) / 10;
}

export function horseGrade(wins, races, champions) {
  if (races === 0) return 'D';
  const rate = wins / races;
  if (rate >= 0.7 && champions >= 1) return 'S';
  if (rate >= 0.6) return 'A';
  if (rate >= 0.4) return 'B';
  if (rate >= 0.25) return 'C';
  return 'D';
}

export const HORSE_RECORDS = [
  { id: 'most-wins', name: 'Most Wins', stat: 'wins', unit: 'wins', desc: 'Most races won.' },
  { id: 'most-foals', name: 'Most Foals', stat: 'foals', unit: 'foals', desc: 'Most foals bred.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from the ranch.' },
  { id: 'derby-wins', name: 'Derby Wins', stat: 'derbyWins', unit: 'derbies', desc: 'Most Grand Derby wins.' },
  { id: 'mustangs', name: 'Mustang Tamer', stat: 'mustangs', unit: 'mustangs', desc: 'Most wild mustangs broken.' },
];

export function horseRecordFor(recordId, state) {
  const r = HORSE_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function horseAllRecords(state) {
  return HORSE_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function horseSummary(state) {
  return `Ranch ${HORSE_RANKS[state.rank].name}: ${state.horses.length} horses, ${state.wins} wins, ${state.foals} foals, $${Math.round(state.earned)} earned.`;
}

export function horseNextGoal(state) {
  if (state.horseCount < 3) return 'Own 3 horses.';
  if (state.wins < 3) return 'Win 3 races.';
  if (state.rank < 2) return 'Reach rank Horse Trainer.';
  return 'Win the Solara Grand Derby.';
}

export const HORSE_QUICK_START = [
  'Catch a wild mustang first — it is free.',
  'Feed and groom your horses every day.',
  'Train daily; a little every day wins races.',
  'Sell fast horses to the racing syndicate.',
  'Breed your two best horses for a champion foal.',
  'Save your best horse for the Grand Derby.',
];

export function horseQuickStart(step) {
  return HORSE_QUICK_START[step] || null;
}

export const HORSE_META = {
  system: 'horseRanch', version: '7-B1', author: 'builder-1',
  breeds: HORSE_BREEDS.length, races: HORSE_RACES.length,
  note: 'Wild Stables: buy, train, breed, race, sell.',
};
