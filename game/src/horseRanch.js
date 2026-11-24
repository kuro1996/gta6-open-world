// Wild Stables: buy foals, train them, breed champions, race them,
// or sell them to buyers who pay for speed, stamina and bloodlines.
// Neglected horses go lame and lose value; wild mustangs can be
// broken for free when a herd runs through the flats.

export const HORSE_BREEDS = [
  { id: 'mustang', name: 'Mustang', value: 120, speed: 7, stamina: 8, temperament: 5, rarity: 0.2, desc: 'A wild horse of the flats, tough and free.' },
  { id: 'thoroughbred', name: 'Thoroughbred', value: 500, speed: 10, stamina: 6, temperament: 3, rarity: 0.08, desc: 'Born to run, the fastest bloodline in Solara.' },
  { id: 'quarter', name: 'Quarter Horse', value: 300, speed: 8, stamina: 7, temperament: 2, rarity: 0.14, desc: 'A calm sprinter with a steady heart.' },
  { id: 'arabian', name: 'Arabian', value: 450, speed: 8, stamina: 10, temperament: 4, rarity: 0.09, desc: 'Desert blood, endless stamina, proud head.' },
  { id: 'clydesdale', name: 'Clydesdale', value: 280, speed: 4, stamina: 9, temperament: 1, rarity: 0.12, desc: 'A gentle giant that pulls and never quits.' },
  { id: 'appaloosa', name: 'Appaloosa', value: 320, speed: 7, stamina: 7, temperament: 3, rarity: 0.11, desc: 'Spotted coat, even temper, honest worker.' },
  { id: 'friesian', name: 'Friesian', value: 480, speed: 7, stamina: 7, temperament: 2, rarity: 0.07, desc: 'Black mane, high step, a show ring star.' },
  { id: 'morgan', name: 'Morgan', value: 260, speed: 6, stamina: 8, temperament: 2, rarity: 0.13, desc: 'A friendly all-rounder, first horse for many.' },
  { id: 'andalusian', name: 'Andalusian', value: 520, speed: 8, stamina: 6, temperament: 3, rarity: 0.06, desc: 'A baroque beauty with fire in its stride.' },
  { id: 'paint', name: 'Paint', value: 290, speed: 7, stamina: 7, temperament: 3, rarity: 0.12, desc: 'A patched coat and a willing spirit.' },
  { id: 'shetland', name: 'Shetland', value: 90, speed: 3, stamina: 5, temperament: 1, rarity: 0.22, desc: 'Small, shaggy and almost impossible to upset.' },
  { id: 'warmblood', name: 'Warmblood', value: 420, speed: 8, stamina: 8, temperament: 3, rarity: 0.08, desc: 'A sport horse built for the derby and the ring.' },
];

export const HORSE_RACES = [
  { id: 'meadow-sprint', name: 'Meadow Sprint', distance: 400, purse: 200, difficulty: 1, desc: 'A short dash across the meadow.' },
  { id: 'river-mile', name: 'River Mile', distance: 1600, purse: 400, difficulty: 2, desc: 'A mile along the river bend.' },
  { id: 'ridge-derby', name: 'Ridge Derby', distance: 2400, purse: 800, difficulty: 3, desc: 'Up and over the ridge, a true test.' },
  { id: 'endurance', name: 'Endurance Run', distance: 5000, purse: 700, difficulty: 3, desc: 'Five thousand metres of grit and lungs.' },
  { id: 'steeplechase', name: 'Steeplechase', distance: 3200, purse: 1000, difficulty: 4, desc: 'Fences, water and nerves of steel.' },
  { id: 'grand-derby', name: 'Solara Grand Derby', distance: 2400, purse: 2500, difficulty: 5, desc: 'The biggest purse in Solara, ranch owners only.' },
];

export const HORSE_BUYERS = [
  { id: 'stable', name: 'Stable Master', mult: 1.0, likes: ['calm'], dislikes: [], mood: 'steady', minRank: 0, desc: 'Buys calm horses for honest work.' },
  { id: 'racer', name: 'Speed Racer', mult: 1.4, likes: ['fast'], dislikes: [], mood: 'fancy', minRank: 2, desc: 'Pays for speed and nothing else.' },
  { id: 'show', name: 'Show Judge', mult: 1.3, likes: ['beauty'], dislikes: [], mood: 'fancy', minRank: 1, desc: 'Buys beautiful horses for the ring.' },
  { id: 'farmer', name: 'Valley Farmer', mult: 0.9, likes: ['strong'], dislikes: [], mood: 'quick', minRank: 0, desc: 'Needs a strong back for the fields.' },
  { id: 'collector', name: 'Rare Collector', mult: 1.6, likes: ['champion'], dislikes: [], mood: 'odd', minRank: 3, desc: 'Collects champions at any price.' },
];

export const HORSE_UPGRADES = [
  { id: 'stable', name: 'Bigger Stable', cost: 200, desc: 'Room for 4 more horses.', effect: 'stable' },
  { id: 'feed', name: 'Premium Feed', cost: 150, desc: 'Horses train 25 percent faster.', effect: 'feed' },
  { id: 'tack', name: 'Racing Tack', cost: 250, desc: 'Race speed plus 1.', effect: 'tack' },
  { id: 'farrier', name: 'Farrier Kit', cost: 180, desc: 'Lameness risk halved.', effect: 'farrier' },
  { id: 'vet', name: 'Vet Care', cost: 320, desc: 'Sick horses recover in a day.', effect: 'vet' },
  { id: 'track', name: 'Private Track', cost: 600, desc: 'Train at home, plus 1 training per day.', effect: 'track' },
  { id: 'breeder', name: "Breeder's Touch", cost: 500, desc: 'Foals inherit plus 1 speed.', effect: 'stud' },
  { id: 'arena', name: 'Show Arena', cost: 900, desc: 'Show horses earn double.', effect: 'arena' },
];

export const HORSE_RANKS = [
  { level: 0, name: 'Stable Hand', xp: 0, perk: 'Learning the ropes.' },
  { level: 1, name: 'Ranch Hand', xp: 120, perk: 'Plus 10 percent sale prices.' },
  { level: 2, name: 'Horse Trainer', xp: 300, perk: 'Plus 10 percent training speed.' },
  { level: 3, name: 'Ranch Owner', xp: 620, perk: 'Plus 20 percent sale prices, the derby opens.' },
  { level: 4, name: 'Master of Wild Stables', xp: 1100, perk: 'Plus 30 percent sale prices, champion foals.' },
];

export const HORSE_TRAITS = [
  { id: 'swift', name: 'Swift', speed: 2, stamina: 0, desc: 'Quick off the mark.' },
  { id: 'enduring', name: 'Enduring', speed: 0, stamina: 2, desc: 'Never seems to tire.' },
  { id: 'calm', name: 'Calm', speed: 0, stamina: 0, desc: 'Steady under pressure.' },
  { id: 'brave', name: 'Brave', speed: 1, stamina: 1, desc: 'Faces fences without flinching.' },
  { id: 'clever', name: 'Clever', speed: 1, stamina: 0, desc: 'Learns the track fast.' },
  { id: 'strong', name: 'Strong', speed: 0, stamina: 1, desc: 'Power in every stride.' },
];

export const HORSE_EVENTS = [
  { id: 'foaling-season', name: 'Foaling Season', mult: 1.4, breeds: [], desc: 'New foals everywhere, prices rise.' },
  { id: 'derby-week', name: 'Derby Week', mult: 1.5, breeds: ['thoroughbred', 'warmblood'], desc: 'The derby crowd is in town.' },
  { id: 'flu-outbreak', name: 'Flu Outbreak', mult: 0.7, breeds: [], desc: 'Sickness spreads through the stables.' },
  { id: 'mustang-run', name: 'Mustang Run', mult: 1.5, breeds: ['mustang'], desc: 'A wild herd thunders past the flats.' },
  { id: 'show-season', name: 'Show Season', mult: 1.4, breeds: ['friesian', 'andalusian'], desc: 'Judges are looking for beauty.' },
  { id: 'drought', name: 'Drought', mult: 0.8, breeds: [], desc: 'Dry fields, thin purses.' },
];

export const HORSE_CONTRACTS = [
  { id: 'sell-3', name: 'Three Horses', breed: 'any', qty: 3, pay: 400, days: 3, rep: 0, desc: 'Sell three horses to any buyer.' },
  { id: 'win-2', name: 'Two Wins', breed: 'any', qty: 2, pay: 600, days: 3, rep: 1, desc: 'Win two races of any kind.' },
  { id: 'breed-1', name: 'First Foal', breed: 'any', qty: 1, pay: 500, days: 3, rep: 1, desc: 'Breed your first foal.' },
  { id: 'derby-1', name: 'Derby Glory', breed: 'thoroughbred', qty: 1, pay: 1200, days: 3, rep: 3, desc: 'Win the grand derby on a thoroughbred.' },
  { id: 'train-5', name: 'Training Week', breed: 'any', qty: 5, pay: 350, days: 2, rep: 0, desc: 'Train five times before the week ends.' },
  { id: 'mustang-2', name: 'Mustang Pair', breed: 'mustang', qty: 2, pay: 480, days: 3, rep: 2, desc: 'Win two races on mustangs.' },
];

export const HORSE_HELPERS = [
  { id: 'groom', name: 'Groom Ellie', wage: 30, skill: 'groom', bonus: 0.2, desc: 'Keeps every coat shining.' },
  { id: 'trainer', name: 'Trainer Cole', wage: 60, skill: 'train', bonus: 0.3, desc: 'Knows how to build a winner.' },
  { id: 'jockey', name: 'Jockey Pip', wage: 55, skill: 'race', bonus: 0.15, desc: 'Small, fearless and fast.' },
  { id: 'breeder', name: 'Breeder Ana', wage: 65, skill: 'breed', bonus: 0.25, desc: 'Reads bloodlines like a book.' },
];

export const HORSE_CHALLENGES = [
  { id: 'horses-5', name: 'Five Horses', target: 'horseCount', goal: 5, xp: 80, desc: 'Own five horses at once.' },
  { id: 'wins-5', name: 'Five Wins', target: 'wins', goal: 5, xp: 120, desc: 'Win five races.' },
  { id: 'foals-3', name: 'Three Foals', target: 'foals', goal: 3, xp: 120, desc: 'Breed three foals.' },
  { id: 'mustangs-3', name: 'Three Mustangs', target: 'mustangs', goal: 3, xp: 150, desc: 'Catch three wild mustangs.' },
  { id: 'derby-1', name: 'Derby Winner', target: 'derbyWins', goal: 1, xp: 200, desc: 'Win the grand derby.' },
  { id: 'earn-1500', name: 'Earn 1500', target: 'earned', goal: 1500, xp: 120, desc: 'Earn fifteen hundred dollars.' },
  { id: 'train-20', name: 'Twenty Trainings', target: 'trainingDone', goal: 20, xp: 100, desc: 'Train twenty times.' },
  { id: 'contracts-5', name: 'Five Contracts', target: 'contractsDone', goal: 5, xp: 140, desc: 'Finish five contracts.' },
];

export const HORSE_ACHIEVEMENTS = [
  { id: 'first-horse', name: 'First Horse', check: (s) => s.horseCount >= 1, desc: 'Own your first horse.' },
  { id: 'first-win', name: 'First Win', check: (s) => s.wins >= 1, desc: 'Win your first race.' },
  { id: 'first-foal', name: 'First Foal', check: (s) => s.foals >= 1, desc: 'Breed your first foal.' },
  { id: 'first-mustang', name: 'First Mustang', check: (s) => s.mustangs >= 1, desc: 'Catch your first mustang.' },
  { id: 'rank-3', name: 'Ranch Royalty', check: (s) => s.rank >= 3, desc: 'Reach rank 3, Ranch Owner.' },
  { id: 'rich-rancher', name: 'Rich Rancher', check: (s) => s.earned >= 3000, desc: 'Earn three thousand dollars.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every ranch upgrade.' },
  { id: 'champion', name: 'Champion Breeder', check: (s) => s.champions >= 1, desc: 'Raise a champion horse.' },
];

export const HORSE_TIPS = [
  { id: 'tip-1', name: 'Feed Daily', text: 'Feed every horse each day or it loses stamina.' },
  { id: 'tip-2', name: 'Train Slowly', text: 'Training builds speed and stamina over time.' },
  { id: 'tip-3', name: 'Watch Lameness', text: 'A lame horse cannot race, call the vet.' },
  { id: 'tip-4', name: 'Breed For Traits', text: 'Foals inherit traits from both parents.' },
  { id: 'tip-5', name: 'Catch Mustangs', text: 'When a herd runs, a free horse is waiting.' },
  { id: 'tip-6', name: 'Mind The Buyer', text: 'Each buyer pays for a different kind of horse.' },
  { id: 'tip-7', name: 'Save For The Derby', text: 'Only ranch owners may enter the grand derby.' },
  { id: 'tip-8', name: 'Hire Help', text: 'Helpers make training, racing and breeding easier.' },
];

export const HORSE_LEADERBOARD = [
  { name: 'Trainer Cole', wins: 210, desc: 'The old master of the track.' },
  { name: 'Jockey Pip', wins: 180, desc: 'Small, fearless and fast.' },
  { name: 'Ria', wins: 0, desc: 'A newcomer chasing the board.' },
  { name: 'Breeder Ana', wins: 140, desc: 'Reads bloodlines like a book.' },
  { name: 'Groom Ellie', wins: 90, desc: 'Keeps every coat shining.' },
];

export const HORSE_RECORDS = [
  { id: 'most-wins', name: 'Most Wins', stat: 'wins', unit: 'wins', desc: 'Most races won.' },
  { id: 'most-foals', name: 'Most Foals', stat: 'foals', unit: 'foals', desc: 'Most foals bred.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: 'dollars', desc: 'Most money earned.' },
  { id: 'derby-wins', name: 'Derby Wins', stat: 'derbyWins', unit: 'derbies', desc: 'Grand derby victories.' },
  { id: 'mustangs', name: 'Mustangs Caught', stat: 'mustangs', unit: 'mustangs', desc: 'Wild mustangs broken.' },
];

export const HORSE_META = {
  system: 'horseRanch',
  version: '7-B1',
  author: 'builder-1',
  breeds: 12,
  races: 6,
  note: 'Wild Stables, buy train breed race sell',
};

export const HORSE_QUICK_START = [
  'Buy a cheap mustang foal to start your stable.',
  'Feed it every day so it never loses stamina.',
  'Train it daily to raise speed and stamina.',
  'Enter the meadow sprint once it has some training.',
  'Catch a wild mustang when a herd runs past.',
  'Sell a champion only at the auction for the biggest payout.',
];

export function horseRankFor(xp) {
  let best = 0;
  for (let i = 0; i < HORSE_RANKS.length; i++) {
    if (xp >= HORSE_RANKS[i].xp) best = i;
  }
  return best;
}

export function horseValue(horse, rank, upgrades) {
  const breed = HORSE_BREEDS.find((b) => b.id === horse.breed);
  const base = breed ? breed.value : (typeof horse.value === 'number' ? horse.value : 100);
  const traits = Array.isArray(horse.traits) ? horse.traits.length : 0;
  let v = base + (horse.training || 0) * 15 + (horse.wins || 0) * 80 + traits * 40;
  v = v * (1 + (rank || 0) * 0.1);
  if (horse.champion) v = v * 1.5;
  if (horse.lame) v = v * 0.5;
  return Math.max(10, Math.round(v));
}

export function horseBuyerPrice(horse, buyerId, rank, upgrades) {
  const buyer = HORSE_BUYERS.find((b) => b.id === buyerId);
  if (!buyer) return 0;
  let mult = buyer.mult;
  const likes = buyer.likes || [];
  if ((horse.speed || 0) >= 9 && likes.includes('fast')) mult += 0.2;
  if ((horse.temperament || 0) <= 2 && likes.includes('calm')) mult += 0.15;
  if (horse.champion && likes.includes('champion')) mult += 0.3;
  if ((horse.stamina || 0) >= 9 && likes.includes('strong')) mult += 0.15;
  return Math.max(10, Math.round(horseValue(horse, rank, upgrades) * mult));
}

export function horseRaceChance(horse, race, rank, upgrades) {
  const owned = Array.isArray(upgrades) ? upgrades : [];
  const score = (horse.speed || 0) * 2 + (horse.stamina || 0) + (horse.training || 0) + (owned.includes('tack') ? 2 : 0);
  let chance = 0.3 + score * 0.02 + (rank || 0) * 0.03 - ((race.difficulty || 1) - 1) * 0.08;
  if (horse.lame) chance -= 0.3;
  if (horse.champion) chance += 0.1;
  if (chance < 0.05) chance = 0.05;
  if (chance > 0.95) chance = 0.95;
  return chance;
}

export function horseRaceOdds(horse, race) {
  if (!horse || !race) return 0.05;
  const fair = horseRaceChance(horse, race, 0, []);
  return Math.min(0.95, Math.max(0.05, fair));
}

export function horseStableCap(upgrades) {
  const owned = Array.isArray(upgrades) ? upgrades : [];
  return 6 + (owned.includes('stable') ? 4 : 0);
}

export function horseHelperBonus(helpers, skill) {
  let total = 0;
  for (const h of helpers || []) {
    const entry = typeof h === 'string' ? HORSE_HELPERS.find((x) => x.id === h) : h;
    if (entry && entry.skill === skill) total += entry.bonus || 0;
  }
  return total;
}

export function horseChallengeProgress(challenge, state) {
  const have = Math.floor(state[challenge.target] || 0);
  return { id: challenge.id, name: challenge.name, have, goal: challenge.goal, done: have >= challenge.goal };
}

export function horseTipFor(day) {
  const n = HORSE_TIPS.length;
  const idx = ((day % n) + n) % n;
  return HORSE_TIPS[idx];
}

export function horseLeaderboardWith(playerWins) {
  const rows = HORSE_LEADERBOARD.map((e) => ({
    name: e.name,
    wins: e.name === 'Ria' ? playerWins : e.wins,
    desc: e.desc,
  }));
  rows.sort((a, b) => b.wins - a.wins);
  return rows.map((r, i) => ({ rank: i + 1, name: r.name, wins: r.wins, desc: r.desc }));
}

export function horseEfficiency(wins, races) {
  if (!races) return 0;
  return Math.round((wins / races) * 100);
}

export function horseProfitPerRace(earned, races) {
  if (!races) return 0;
  return Math.round((earned / races) * 10) / 10;
}

export function horseGrade(wins, races, champions) {
  if (!races) return 'D';
  const rate = wins / races;
  if (rate >= 0.7 && champions >= 1) return 'S';
  if (rate >= 0.6) return 'A';
  if (rate >= 0.4) return 'B';
  if (rate >= 0.25) return 'C';
  return 'D';
}

export function horseRecordFor(recordId, state) {
  const rec = HORSE_RECORDS.find((r) => r.id === recordId);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: state[rec.stat] || 0, unit: rec.unit };
}

export function horseAllRecords(state) {
  return HORSE_RECORDS.map((r) => ({
    id: r.id,
    name: r.name,
    value: state[r.stat] || 0,
    unit: r.unit,
    desc: r.desc,
  }));
}

export function horseSummary(state) {
  const rankName = HORSE_RANKS[state.rank] ? HORSE_RANKS[state.rank].name : 'Stable Hand';
  const count = Array.isArray(state.horses) ? state.horses.length : (state.horseCount || 0);
  return `${rankName} - ${count} horses, ${state.wins || 0} wins, ${state.foals || 0} foals, $${Math.round(state.earned || 0)} earned`;
}

export function horseNextGoal(state) {
  const count = Array.isArray(state.horses) ? state.horses.length : (state.horseCount || 0);
  if (count < 3) return 'Own 3 horses';
  if ((state.wins || 0) < 3) return 'Win 3 races';
  if ((state.rank || 0) < 2) return 'Reach rank Horse Trainer';
  return 'Win the Solara Grand Derby';
}

export function horseQuickStart(step) {
  if (step < 0 || step >= HORSE_QUICK_START.length) return null;
  return HORSE_QUICK_START[step];
}

export function createHorseRanchSystem(ctx) {
  const c = ctx || {};
  const rng = typeof c.rng === 'function' ? c.rng : Math.random;
  const getDay = typeof c.getDay === 'function' ? c.getDay : () => 1;
  const getHour = typeof c.getHour === 'function' ? c.getHour : () => 12;
  const getCash = typeof c.getCash === 'function' ? c.getCash : () => 0;
  const addCash = typeof c.addCash === 'function' ? c.addCash : () => {};
  const addHeat = typeof c.addHeat === 'function' ? c.addHeat : () => {};
  const log = typeof c.log === 'function' ? c.log : () => {};
  const getPlayerPos = typeof c.getPlayerPos === 'function' ? c.getPlayerPos : () => ({ x: 0, z: 0 });
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
    const next = horseRankFor(state.xp);
    if (next > state.rank) {
      state.rank = next;
      log(`Promoted to ${HORSE_RANKS[next].name}.`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function syncCount() {
    state.horseCount = state.horses.length;
  }

  function nextNumber() {
    return state.horses.length + state.sold + 1;
  }

  function makeHorse(breedId, opts) {
    const breed = HORSE_BREEDS.find((b) => b.id === breedId);
    const trait = HORSE_TRAITS[Math.floor(rng() * HORSE_TRAITS.length)];
    const n = nextNumber();
    const horse = {
      id: `${breedId}-${n}`,
      breed: breedId,
      name: `${breed ? breed.name : breedId} ${n}`,
      speed: breed ? breed.speed : 5,
      stamina: breed ? breed.stamina : 5,
      temperament: breed ? breed.temperament : 3,
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
    if (opts) {
      if (typeof opts.speedBonus === 'number') horse.speed = Math.min(12, horse.speed + opts.speedBonus);
      if (typeof opts.speed === 'number') horse.speed = opts.speed;
      if (typeof opts.stamina === 'number') horse.stamina = opts.stamina;
      if (Array.isArray(opts.traits)) horse.traits = opts.traits;
      if (typeof opts.name === 'string') horse.name = opts.name;
    }
    return horse;
  }

  function findHorse(horseId) {
    return state.horses.find((h) => h.id === horseId) || null;
  }

  function advanceInline(contractId) {
    if (state.activeContract && state.activeContract.id === contractId) {
      state.contractProgress += 1;
    }
  }

  function checkContract(horse, raceId) {
    const contract = state.activeContract;
    if (!contract) return;
    let moved = false;
    if (contract.id === 'win-2') {
      state.contractProgress += 1;
      moved = true;
    } else if (contract.id === 'derby-1' && raceId === 'grand-derby') {
      state.contractProgress += 1;
      moved = true;
    } else if (contract.id === 'mustang-2' && horse.breed === 'mustang') {
      state.contractProgress += 1;
      moved = true;
    }
    if (!moved) return;
    if (state.contractProgress >= contract.qty) {
      const bonus = contract.pay + state.rank * 50;
      addCash(bonus);
      state.earned += bonus;
      state.dailyEarned += bonus;
      state.contractsDone += 1;
      state.activeContract = null;
      state.contractProgress = 0;
      gainXp(60);
      log(`Contract ${contract.name} complete, bonus $${bonus}.`);
    }
  }

  function buyHorse(breedId) {
    const breed = HORSE_BREEDS.find((b) => b.id === breedId);
    if (!breed) return { ok: false, reason: 'unknown-breed' };
    if (state.horses.length >= horseStableCap(state.upgrades)) return { ok: false, reason: 'stable-full' };
    if (getCash() < breed.value) return { ok: false, reason: 'not-enough-cash' };
    addCash(-breed.value);
    state.spent += breed.value;
    const horse = makeHorse(breedId);
    state.horses.push(horse);
    syncCount();
    gainXp(15);
    return { ok: true, horseId: horse.id, horse: horse.id, breedId, breed: breedId, name: horse.name, price: breed.value };
  }

  function catchMustang() {
    const running = state.currentEvent && state.currentEvent.id === 'mustang-run';
    if (!running && rng() > 0.3) return { ok: false, reason: 'no-herd' };
    if (state.horses.length >= horseStableCap(state.upgrades)) return { ok: false, reason: 'stable-full' };
    const chance = 0.4 + state.rank * 0.05;
    if (rng() >= chance) {
      log('The mustang broke away and vanished into the flats.');
      return { ok: true, caught: false };
    }
    const horse = makeHorse('mustang', { speedBonus: 1 });
    state.horses.push(horse);
    syncCount();
    state.mustangs += 1;
    gainXp(40);
    return { ok: true, caught: true, horseId: horse.id, horse: horse.id, name: horse.name };
  }

  function trainHorse(horseId) {
    const horse = findHorse(horseId);
    if (!horse) return { ok: false, reason: 'unknown-horse' };
    if (horse.lame) return { ok: false, reason: 'lame' };
    if (horse.sick) return { ok: false, reason: 'sick' };
    let gain = state.upgrades.includes('feed') ? 2 : 1;
    if (state.upgrades.includes('track')) gain += 1;
    horse.training += gain;
    state.dailyTrained += gain;
    state.trainingDone += gain;
    if (rng() < 0.3) horse.speed = Math.min(12, horse.speed + 1);
    if (rng() < 0.2) horse.stamina = Math.min(12, horse.stamina + 1);
    gainXp(5);
    const lameChance = state.upgrades.includes('farrier') ? 0.03 : 0.08;
    if (rng() < lameChance) {
      horse.lame = true;
      state.lameness += 1;
      return { ok: true, trained: true, lame: true, training: horse.training };
    }
    advanceInline('train-5');
    return { ok: true, trained: true, training: horse.training };
  }

  function feedHorse(horseId) {
    const horse = findHorse(horseId);
    if (!horse) return { ok: false, reason: 'unknown-horse' };
    if (getCash() < 5) return { ok: false, reason: 'not-enough-cash' };
    addCash(-5);
    state.spent += 5;
    state.feedCost += 5;
    horse.fed = true;
    horse.stamina = Math.min(12, horse.stamina + 1);
    gainXp(2);
    return { ok: true, horseId, horse: horseId };
  }

  function groomHorse(horseId) {
    const horse = findHorse(horseId);
    if (!horse) return { ok: false, reason: 'unknown-horse' };
    horse.temperament = Math.max(1, horse.temperament - 1);
    gainXp(3);
    return { ok: true, horseId, horse: horseId, temperament: horse.temperament };
  }

  function vetHorse(horseId) {
    const horse = findHorse(horseId);
    if (!horse) return { ok: false, reason: 'unknown-horse' };
    const cost = state.upgrades.includes('vet') ? 20 : 50;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash' };
    addCash(-cost);
    state.spent += cost;
    state.vetCost += cost;
    horse.lame = false;
    horse.sick = false;
    gainXp(5);
    return { ok: true, horseId, horse: horseId, cost };
  }

  function raceHorse(horseId, raceId) {
    const horse = findHorse(horseId);
    if (!horse) return { ok: false, reason: 'unknown-horse' };
    const race = HORSE_RACES.find((r) => r.id === raceId);
    if (!race) return { ok: false, reason: 'unknown-race' };
    if (raceId === 'grand-derby' && state.rank < 3) return { ok: false, reason: 'derby-locked' };
    if (horse.lame || horse.sick) return { ok: false, reason: 'unfit' };
    const entry = 20 + race.difficulty * 10;
    if (getCash() < entry) return { ok: false, reason: 'not-enough-cash' };
    addCash(-entry);
    state.spent += entry;
    const chance = horseRaceChance(horse, race, state.rank, state.upgrades);
    const roll = rng();
    horse.races += 1;
    state.races += 1;
    let won = false;
    let place = 3;
    let prize = 0;
    if (roll < chance) {
      won = true;
      place = 1;
      prize = race.purse + state.rank * 50;
      horse.wins += 1;
      state.wins += 1;
      gainXp(30 + race.difficulty * 10);
      if (raceId === 'grand-derby') {
        horse.champion = true;
        state.derbyWins += 1;
        state.champions += 1;
      }
      if (horse.wins > state.bestWins) {
        state.bestWins = horse.wins;
        state.bestHorse = horse.name;
      }
      checkContract(horse, raceId);
    } else if (roll < chance + 0.15) {
      place = 2;
      prize = Math.round(race.purse * 0.2);
      state.places += 1;
    } else {
      place = 3 + Math.floor(rng() * 3);
    }
    if (prize > 0) {
      addCash(prize);
      state.earned += prize;
      state.dailyEarned += prize;
    }
    return { ok: true, won, place, prize, chance, horseId, horse: horseId, raceId };
  }

  function breedHorses(sireId, damId) {
    const sire = findHorse(sireId);
    const dam = findHorse(damId);
    if (!sire || !dam) return { ok: false, reason: 'unknown-horse' };
    if (sireId === damId) return { ok: false, reason: 'same-horse' };
    if (state.horses.length >= horseStableCap(state.upgrades)) return { ok: false, reason: 'stable-full' };
    const cost = state.upgrades.includes('breeder') ? 0 : 60;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash' };
    if (cost > 0) {
      addCash(-cost);
      state.spent += cost;
    }
    const breedId = rng() < 0.5 ? sire.breed : dam.breed;
    const foal = makeHorse(breedId);
    foal.speed = Math.min(12, Math.round((sire.speed + dam.speed) / 2) + (state.upgrades.includes('stud') ? 1 : 0));
    foal.stamina = Math.min(12, Math.round((sire.stamina + dam.stamina) / 2));
    const merged = [...sire.traits, ...dam.traits].filter((t, i, arr) => arr.indexOf(t) === i);
    foal.traits = merged.slice(0, 2);
    foal.name = `Foal of ${sire.name} and ${dam.name}`;
    state.horses.push(foal);
    syncCount();
    state.foals += 1;
    gainXp(40);
    return { ok: true, foalId: foal.id, foal: foal.id, breedId, breed: breedId, name: foal.name };
  }

  function sellHorse(first, second) {
    let buyerId = first;
    let horseId = second;
    if (second === undefined && findHorse(first)) {
      horseId = first;
      buyerId = 'stable';
    }
    const buyer = HORSE_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'unknown-buyer' };
    if (state.rank < buyer.minRank) return { ok: false, reason: 'rank-too-low' };
    const idx = state.horses.findIndex((h) => h.id === horseId);
    if (idx < 0) return { ok: false, reason: 'unknown-horse' };
    const horse = state.horses[idx];
    const price = horseBuyerPrice(horse, buyerId, state.rank, state.upgrades);
    state.horses.splice(idx, 1);
    syncCount();
    state.sold += 1;
    state.earned += price;
    state.dailyEarned += price;
    addCash(price);
    gainXp(20);
    advanceInline('sell-3');
    return { ok: true, price, horseId, horse: horseId, buyerId };
  }

  function buyUpgrade(upgradeId) {
    const canonicalId = upgradeId === 'breeding' ? 'breeder' : upgradeId;
    const up = HORSE_UPGRADES.find((u) => u.id === canonicalId);
    if (!up) return { ok: false, reason: 'unknown-upgrade' };
    if (state.upgrades.includes(canonicalId)) return { ok: false, reason: 'already-owned' };
    if (getCash() < up.cost) return { ok: false, reason: 'not-enough-cash' };
    addCash(-up.cost);
    state.spent += up.cost;
    state.upgrades.push(canonicalId);
    gainXp(20);
    return { ok: true, id: canonicalId, upgradeId: canonicalId, name: up.name, cost: up.cost };
  }

  function takeContract(contractId) {
    const contract = HORSE_CONTRACTS.find((c) => c.id === contractId);
    if (!contract) return { ok: false, reason: 'unknown-contract' };
    if (state.activeContract) return { ok: false, reason: 'contract-active' };
    if (state.rank < contract.rep) return { ok: false, reason: 'rep-too-low' };
    const day = getDay();
    state.activeContract = { ...contract, dayTaken: day, deadline: day + contract.days };
    state.contractProgress = 0;
    return { ok: true, contract: state.activeContract };
  }

  function deliverContract() {
    const contract = state.activeContract;
    if (!contract) return { ok: false, reason: 'no-contract' };
    if (state.contractProgress < contract.qty) return { ok: false, reason: 'progress-short' };
    const bonus = contract.pay + state.rank * 50;
    addCash(bonus);
    state.earned += bonus;
    state.dailyEarned += bonus;
    state.contractsDone += 1;
    state.activeContract = null;
    state.contractProgress = 0;
    gainXp(60);
    return { ok: true, pay: bonus, bonus, contractId: contract.id };
  }

  function abandonContract() {
    if (!state.activeContract) return { ok: false, reason: 'no-contract' };
    state.activeContract = null;
    state.contractProgress = 0;
    state.contractsFailed += 1;
    return { ok: true };
  }

  function stableReport() {
    return state.horses.map((h) => ({
      id: h.id,
      name: h.name,
      breed: h.breed,
      speed: h.speed,
      stamina: h.stamina,
      temperament: h.temperament,
      training: h.training,
      wins: h.wins,
      races: h.races,
      traits: [...h.traits],
      lame: h.lame,
      sick: h.sick,
      champion: h.champion,
      value: horseValue(h, state.rank, state.upgrades),
    }));
  }

  function raceReport() {
    return HORSE_RACES.map((r) => ({ id: r.id, name: r.name, distance: r.distance, purse: r.purse, difficulty: r.difficulty }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.2) {
      const ev = HORSE_EVENTS[Math.floor(rng() * HORSE_EVENTS.length)];
      state.currentEvent = ev;
      return { ok: true, id: ev.id, name: ev.name, mult: ev.mult };
    }
    if (roll < 0.3 && state.horses.length > 0) {
      const horse = state.horses[Math.floor(rng() * state.horses.length)];
      horse.training += 1;
      return { ok: true, id: 'gift', name: 'Gift Training', horseId: horse.id };
    }
    state.currentEvent = null;
    return { ok: true, id: 'none', name: 'No Event' };
  }

  function tick(dt) {
    if (state.horses.length > 0 && rng() < dt * 0.005) {
      log('The stable is quiet, only hooves on straw.');
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return undefined;
    state.lastDay = day;
    state.dailyTrained = 0;
    state.dailyEarned = 0;
    if (state.activeContract && day > state.activeContract.deadline && state.contractProgress < state.activeContract.qty) {
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractsFailed += 1;
      log('A contract expired unfinished.');
    }
    for (const horse of state.horses) {
      horse.age += 1;
      if (!horse.fed) horse.stamina = Math.max(1, horse.stamina - 1);
      horse.fed = false;
      if (state.currentEvent && state.currentEvent.id === 'flu-outbreak' && rng() < 0.2) horse.sick = true;
      if (horse.sick && state.upgrades.includes('vet')) horse.sick = false;
      if (horse.lame && rng() < 0.3) horse.lame = false;
    }
    const bill = 5 * state.horses.length;
    if (bill > 0) {
      if (getCash() >= bill) {
        addCash(-bill);
        state.spent += bill;
        state.feedCost += bill;
      } else {
        log('Not enough cash, the horses go hungry.');
      }
    }
    const ev = dailyEvent();
    return { ok: true, day, event: ev.id, horses: state.horses.length };
  }

  function interact() {
    const pos = getPlayerPos();
    const yards = [{ x: 800, z: -200 }, { x: 800, z: 200 }];
    const near = yards.some((y) => Math.hypot(pos.x - y.x, pos.z - y.z) <= 40);
    if (!near) return false;
    if (state.horses.length === 0) {
      catchMustang();
      return true;
    }
    trainHorse(state.horses[0].id);
    return true;
  }

  function hudLine() {
    if (state.horses.length === 0) return 'Wild Stables: buy a foal or catch a mustang.';
    const lame = state.horses.filter((h) => h.lame).length;
    if (lame > 0) return `Wild Stables: ${lame} lame horse${lame > 1 ? 's' : ''}, call the vet.`;
    const sick = state.horses.filter((h) => h.sick).length;
    if (sick > 0) return `Wild Stables: ${sick} sick horse${sick > 1 ? 's' : ''}, keep them resting.`;
    if (state.activeContract) return `Wild Stables: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}.`;
    return `Wild Stables: ${state.horses.length} horses, ${state.wins} wins.`;
  }

  function stats() {
    return {
      rankName: HORSE_RANKS[state.rank].name,
      rank: state.rank,
      xp: state.xp,
      horseCount: state.horses.length,
      totalOwned: state.horses.length + state.sold,
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
      upgradesCount: state.upgrades.length,
      stableCap: horseStableCap(state.upgrades),
      activeContractId: state.activeContract ? state.activeContract.id : null,
      contractsDone: state.contractsDone,
      contractsFailed: state.contractsFailed,
      bestHorse: state.bestHorse,
      bestWins: state.bestWins,
      dailyTrained: state.dailyTrained,
      dailyEarned: Math.round(state.dailyEarned),
      trainingDone: state.trainingDone,
      currentEvent: state.currentEvent ? state.currentEvent.id : null,
    };
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(saved) {
    if (!saved) return;
    for (const key of Object.keys(saved)) {
      if (key in state) state[key] = saved[key];
    }
    refreshRank();
  }

  return {
    state,
    get horses() { return state.horses; },
    get foals() { return state.foals; },
    get champions() { return state.champions; },
    get stableSize() { return horseStableCap(state.upgrades); },
    get rank() { return state.rank; },
    set rank(v) { state.rank = v; },
    get contractProgress() { return state.contractProgress; },
    set contractProgress(v) { state.contractProgress = v; },
    buyHorse,
    catchMustang,
    trainHorse,
    feedHorse,
    groomHorse,
    vetHorse,
    raceHorse,
    breedHorses,
    sellHorse,
    buyUpgrade,
    takeContract,
    deliverContract,
    abandonContract,
    stableReport,
    raceReport,
    dailyEvent,
    tick,
    tickDay,
    serialize,
    deserialize,
    stats,
    hudLine,
    interact,
  };
}

export function createHorseRanchExtras(ranch) {
  const sys = ranch && ranch.state ? ranch.state : ranch;
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  function hireHelper(helperId) {
    const helper = HORSE_HELPERS.find((h) => h.id === helperId);
    if (!helper) return { ok: false, reason: 'unknown-helper' };
    if (helpers.some((h) => h.id === helperId)) return { ok: false, reason: 'already-hired' };
    helpers.push(helper);
    return { ok: true, id: helper.id, name: helper.name, wage: helper.wage };
  }

  function fireHelper(helperId) {
    const idx = helpers.findIndex((h) => h.id === helperId);
    if (idx < 0) return { ok: false, reason: 'not-hired' };
    helpers.splice(idx, 1);
    return { ok: true, id: helperId };
  }

  function payWages() {
    const due = helpers.reduce((sum, h) => sum + h.wage, 0);
    wagesPaid += due;
    return { due, helpers: helpers.map((h) => ({ id: h.id, name: h.name, wage: h.wage })), totalPaid: wagesPaid };
  }

  function helperBonus(skill) {
    return horseHelperBonus(helpers, skill);
  }

  function challenges() {
    return HORSE_CHALLENGES.map((c) => horseChallengeProgress(c, sys));
  }

  function claimChallenge(challengeId) {
    const challenge = HORSE_CHALLENGES.find((c) => c.id === challengeId);
    if (!challenge) return { ok: false, reason: 'unknown-challenge' };
    if (claimed.includes(challengeId)) return { ok: false, reason: 'already-claimed' };
    const progress = horseChallengeProgress(challenge, sys);
    if (!progress.done) return { ok: false, reason: 'not-done' };
    claimed.push(challengeId);
    return { ok: true, id: challenge.id, xp: challenge.xp };
  }

  function achievements() {
    return HORSE_ACHIEVEMENTS.map((a) => ({ id: a.id, name: a.name, desc: a.desc, done: !!a.check(sys) }));
  }

  function inspectHorse(horseId) {
    const horse = (sys.horses || []).find((h) => h.id === horseId);
    if (!horse) return { ok: false, reason: 'unknown-horse' };
    return {
      ok: true,
      id: horse.id,
      name: horse.name,
      breed: horse.breed,
      speed: horse.speed,
      stamina: horse.stamina,
      temperament: horse.temperament,
      training: horse.training,
      wins: horse.wins,
      races: horse.races,
      traits: [...horse.traits],
      lame: horse.lame,
      sick: horse.sick,
      age: horse.age,
      champion: horse.champion,
      value: horseValue(horse, sys.rank || 0, sys.upgrades || []),
    };
  }

  function stableValue() {
    const list = sys.horses || [];
    const total = Math.round(list.reduce((sum, h) => sum + horseValue(h, sys.rank || 0, sys.upgrades || []), 0));
    return { ok: true, total, value: total, count: list.length };
  }

  function bloodlines() {
    const held = sys.horses || [];
    return HORSE_BREEDS.map((b) => {
      const owned = held.filter((h) => h.breed === b.id);
      const wins = owned.reduce((sum, h) => sum + (h.wins || 0), 0);
      return { id: b.id, name: b.name, breed: b.id, horses: owned.length, wins };
    });
  }

  return {
    hireHelper,
    fireHelper,
    payWages,
    helperBonus,
    challenges,
    claimChallenge,
    achievements,
    inspectHorse,
    stableValue,
    bloodlines,
    get helpers() { return helpers; },
    get claimed() { return claimed; },
    get wagesPaid() { return wagesPaid; },
  };
}
