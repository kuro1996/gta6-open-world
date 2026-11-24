// Solara Nights — Hunting / Wild Trails (Round 7, written fresh).
// Ria tracks game across Solara's wild edges: marshes, pine ridges,
// scrub plains and the old orchard belts. Stalk, call, shoot clean —
// a rushed shot spooks the herd and costs you the day. Pelts, meat
// and antlers sell to the butcher, the tannery and the lodge kitchen;
// a clean heart-shot pays a trophy bonus, a wounded animal may charge.
// Licences, blinds, calls and rifles gate the bigger game, and the
// warden fines poachers who hunt out of season or after dark.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const HUNTING_ANIMALS = [
  { id: 'rabbit', name: 'Marsh Rabbit', value: 18, meat: 2, pelt: 1, difficulty: 1, rarity: 0.3, habitat: 'marsh', season: 'all', danger: 0, trackTime: 2, desc: 'Quick, small, everywhere near the reeds.' },
  { id: 'duck', name: 'Pintail Duck', value: 22, meat: 2, pelt: 0, difficulty: 1, rarity: 0.24, habitat: 'marsh', season: 'all', danger: 0, trackTime: 2, desc: 'Dawns over the lagoon in noisy flocks.' },
  { id: 'squirrel', name: 'Grey Squirrel', value: 12, meat: 1, pelt: 1, difficulty: 1, rarity: 0.28, habitat: 'orchard', season: 'all', danger: 0, trackTime: 1, desc: 'Chatters from the orchard branches at noon.' },
  { id: 'pheasant', name: 'Ringneck Pheasant', value: 30, meat: 3, pelt: 1, difficulty: 2, rarity: 0.16, habitat: 'scrub', season: 'autumn', danger: 0, trackTime: 3, desc: 'Bursts out of the scrub with a clatter of wings.' },
  { id: 'raccoon', name: 'Marsh Raccoon', value: 38, meat: 2, pelt: 2, difficulty: 2, rarity: 0.12, habitat: 'marsh', season: 'all', danger: 1, trackTime: 3, desc: 'Washes its food in the shallows after dark.' },
  { id: 'deer', name: 'Whitetail Deer', value: 85, meat: 12, pelt: 3, difficulty: 3, rarity: 0.14, habitat: 'pine', season: 'all', danger: 1, trackTime: 5, desc: 'A careful grazer at the pine edge at dawn.' },
  { id: 'fox', name: 'Red Fox', value: 64, meat: 3, pelt: 4, difficulty: 3, rarity: 0.09, habitat: 'scrub', season: 'all', danger: 1, trackTime: 4, desc: 'A russet shadow that tests every call you make.' },
  { id: 'boar', name: 'Wild Boar', value: 120, meat: 18, pelt: 2, difficulty: 4, rarity: 0.08, habitat: 'pine', season: 'all', danger: 3, trackTime: 5, desc: 'Tusks like knives and a temper to match.' },
  { id: 'goose', name: 'Canada Goose', value: 44, meat: 6, pelt: 0, difficulty: 2, rarity: 0.13, habitat: 'marsh', season: 'winter', danger: 0, trackTime: 3, desc: 'Honks overhead in long winter skeins.' },
  { id: 'elk', name: 'Ridge Elk', value: 210, meat: 30, pelt: 5, difficulty: 5, rarity: 0.05, habitat: 'pine', season: 'autumn', danger: 2, trackTime: 8, desc: 'An antlered king that bugles across the ridge.' },
  { id: 'bear', name: 'Black Bear', value: 260, meat: 35, pelt: 6, difficulty: 5, rarity: 0.03, habitat: 'pine', season: 'all', danger: 4, trackTime: 8, desc: 'Do not miss. Do not run. Shoot straight.' },
  { id: 'turkey', name: 'Wild Turkey', value: 52, meat: 8, pelt: 1, difficulty: 2, rarity: 0.11, habitat: 'orchard', season: 'spring', danger: 0, trackTime: 4, desc: 'Gobbles from the orchard floor at first light.' },
];

export const HUNTING_HABITATS = [
  { id: 'marsh', name: 'Salt Marsh', district: 'Lagoon', game: 0.9, danger: 0, mult: 1.0, timeMin: 5, desc: 'Reeds, mud and dawn mist over black water.' },
  { id: 'pine', name: 'Pine Ridge', district: 'North Hills', game: 0.8, danger: 2, mult: 1.25, timeMin: 7, desc: 'Tall pines, deep shade, big animals.' },
  { id: 'scrub', name: 'Scrub Plains', district: 'East Flats', game: 0.85, danger: 1, mult: 1.1, timeMin: 6, desc: 'Dry brush and long sightlines.' },
  { id: 'orchard', name: 'Old Orchards', district: 'West Farms', game: 0.7, danger: 0, mult: 1.0, timeMin: 4, desc: 'Apple rows and sleepy farm dogs.' },
];

export const HUNTING_BUYERS = [
  { id: 'butcher', name: "Otto's Butcher", mult: 1.0, likes: ['meat'], dislikes: ['pelt'], mood: 'steady', minRank: 0, desc: 'Pays by the kilo for clean meat.' },
  { id: 'tannery', name: 'Tannery Row', mult: 1.1, likes: ['pelt'], dislikes: ['meat'], mood: 'steady', minRank: 0, desc: 'Top coin for unspoiled pelts.' },
  { id: 'lodge', name: 'Lodge Kitchen', mult: 1.2, likes: ['trophy'], dislikes: [], mood: 'fancy', minRank: 2, desc: 'The lodge chef pays for the best cuts.' },
  { id: 'taxidermist', name: 'Taxidermist Voss', mult: 1.4, likes: ['trophy'], dislikes: ['meat'], mood: 'odd', minRank: 3, desc: 'Wants whole specimens, no questions asked.' },
  { id: 'market', name: 'Night Market Stall', mult: 0.95, likes: [], dislikes: [], mood: 'quick', minRank: 0, desc: 'Fast cash, no fuss, slightly less money.' },
];

export const HUNTING_UPGRADES = [
  { id: 'license', name: 'Hunting Licence', cost: 80, desc: 'Legal hunting — no warden fines.', effect: 'legal' },
  { id: 'boots', name: 'Silent Boots', cost: 120, desc: 'Spook chance -25% on every stalk.', effect: 'quiet' },
  { id: 'call', name: 'Game Call Set', cost: 160, desc: 'Lure animals in: +30% encounter rate.', effect: 'lure' },
  { id: 'blind', name: 'Pop-up Blind', cost: 240, desc: 'Animals approach closer: +15% accuracy.', effect: 'blind' },
  { id: 'scope', name: 'Rifle Scope', cost: 320, desc: 'Long shots land: +20% accuracy.', effect: 'scope' },
  { id: 'rifle', name: 'Bolt Rifle', cost: 480, desc: 'Clean kills on big game: +1 damage tier.', effect: 'rifle' },
  { id: 'dog', name: 'Tracker Dog', cost: 650, desc: 'Finds wounded game and flushes birds.', effect: 'dog' },
  { id: 'freezer', name: 'Chest Freezer', cost: 900, desc: 'Meat never spoils; sell when prices peak.', effect: 'freeze' },
];

export const HUNTING_RANKS = [
  { level: 0, name: 'Weekend Shooter', xp: 0, perk: 'Base prices, base accuracy.' },
  { level: 1, name: 'Trail Walker', xp: 120, perk: '+10% sale prices.' },
  { level: 2, name: 'Stalker', xp: 300, perk: '+10% accuracy.' },
  { level: 3, name: 'Big Game Hunter', xp: 620, perk: '+20% sale prices, lodge buys from you.' },
  { level: 4, name: 'Master of the Wild', xp: 1100, perk: '+30% sale prices, trophy bonus doubled.' },
];

export const HUNTING_SEASONS = [
  { id: 'spring', name: 'Spring', months: [3, 4, 5], mult: 1.0, desc: 'Turkeys gobble, everything wakes up.' },
  { id: 'summer', name: 'Summer', months: [6, 7, 8], mult: 0.9, desc: 'Thick cover, wary animals.' },
  { id: 'autumn', name: 'Autumn', months: [9, 10, 11], mult: 1.2, desc: 'The rut. Elk bugle, pheasants flush.' },
  { id: 'winter', name: 'Winter', months: [12, 1, 2], mult: 1.1, desc: 'Tracks in the snow tell you everything.' },
];

export const HUNTING_TROPHIES = [
  { id: 'antler-6', name: 'Six-Point Antlers', animal: 'deer', value: 180, desc: 'A clean six-pointer, mounted and proud.' },
  { id: 'antler-10', name: 'Ten-Point Antlers', animal: 'elk', value: 420, desc: 'A ridge king, ten points of bone.' },
  { id: 'boar-tusk', name: 'Boar Tusks', animal: 'boar', value: 150, desc: 'Curved ivory from a big old boar.' },
  { id: 'bear-claw', name: 'Bear Claw Necklace', animal: 'bear', value: 300, desc: 'Proof you stood your ground.' },
  { id: 'fox-tail', name: 'Fox Tail', animal: 'fox', value: 90, desc: 'Russet and full, a classic prize.' },
  { id: 'goose-feather', name: 'Goose Feather Quill', animal: 'goose', value: 40, desc: 'A writer’s prize from the winter skein.' },
];

export const HUNTING_EVENTS = [
  { id: 'rut', name: 'The Rut', mult: 1.5, animals: ['elk', 'deer'], desc: 'Bucks and bulls lose all caution.' },
  { id: 'migration', name: 'Migration Flyover', mult: 1.4, animals: ['duck', 'goose'], desc: 'The sky fills with wings at dawn.' },
  { id: 'full-moon', name: 'Full Moon', mult: 0.8, animals: ['rabbit', 'raccoon'], desc: 'Bright nights make small game shy.' },
  { id: 'storm-front', name: 'Storm Front', mult: 1.3, animals: ['boar', 'bear'], desc: 'Big animals feed hard before the storm.' },
  { id: 'warden-patrol', name: 'Warden Patrol', mult: 0.7, animals: [], desc: 'The warden is out — hunt legal or not at all.' },
  { id: 'acorn-mast', name: 'Acorn Mast', mult: 1.3, animals: ['squirrel', 'turkey', 'boar'], desc: 'The oaks drop a feast; the woods are busy.' },
];

export const HUNTING_CONTRACTS = [
  { id: 'venison-10', name: 'Venison Order', animal: 'deer', qty: 3, pay: 300, days: 2, rep: 1, desc: 'The lodge needs three deer by the weekend.' },
  { id: 'boar-2', name: 'Boar Cull', animal: 'boar', qty: 2, pay: 380, days: 2, rep: 2, desc: 'Farmers pay to thin the boar damage.' },
  { id: 'pelts-8', name: 'Pelt Run', animal: 'fox', qty: 4, pay: 420, days: 3, rep: 2, desc: 'The tannery wants four prime fox pelts.' },
  { id: 'rabbit-12', name: 'Rabbit Stew', animal: 'rabbit', qty: 12, pay: 220, days: 1, rep: 0, desc: 'A cafe orders a dozen rabbits for stew.' },
  { id: 'elk-1', name: 'The Big Bull', animal: 'elk', qty: 1, pay: 600, days: 3, rep: 3, desc: 'One trophy bull for the lodge wall.' },
  { id: 'duck-8', name: 'Duck Dinner', animal: 'duck', qty: 8, pay: 260, days: 1, rep: 0, desc: 'The market stall needs ducks for the feast.' },
];

export const HUNTING_WEATHER_MODS = [
  { condition: 'clear', accuracy: 0.05, encounter: 0, desc: 'Clear skies, good light.' },
  { condition: 'rain', accuracy: -0.1, encounter: 0.15, desc: 'Rain masks your sound — animals feed on.' },
  { condition: 'fog', accuracy: -0.15, encounter: -0.1, desc: 'Fog swallows the far shots.' },
  { condition: 'storm', accuracy: -0.2, encounter: 0.1, desc: 'Storm light, nervous animals.' },
  { condition: 'snow', accuracy: 0, encounter: 0.2, desc: 'Tracks in fresh snow give the game away.' },
  { condition: 'wind', accuracy: -0.05, encounter: -0.05, desc: 'Wind carries your scent downrange.' },
];

export function huntingRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < HUNTING_RANKS.length; i++) {
    if (xp >= HUNTING_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function huntingSeasonFor(month) {
  for (const s of HUNTING_SEASONS) {
    if (s.months.includes(month)) return s;
  }
  return HUNTING_SEASONS[0];
}

export function huntingInSeason(animal, month) {
  if (animal.season === 'all') return true;
  const s = huntingSeasonFor(month);
  return s.id === animal.season;
}

export function huntingWeatherMod(condition) {
  const row = HUNTING_WEATHER_MODS.find((w) => w.condition === condition);
  return row || { condition: 'clear', accuracy: 0, encounter: 0, desc: '' };
}

export function huntingBaseAccuracy(rank, upgrades) {
  let acc = 0.55 + rank * 0.05;
  if (upgrades.includes('blind')) acc += 0.15;
  if (upgrades.includes('scope')) acc += 0.2;
  return Math.min(0.95, acc);
}

export function huntingPriceFor(animal, rank, upgrades, seasonMult) {
  let price = animal.value;
  price *= 1 + rank * 0.1;
  price *= seasonMult || 1;
  if (upgrades.includes('freezer')) price *= 1.1;
  return Math.max(1, Math.round(price));
}

export function huntingBuyerPrice(animal, buyerId, rank, upgrades, seasonMult) {
  const buyer = HUNTING_BUYERS.find((b) => b.id === buyerId);
  if (!buyer) return 0;
  let mult = buyer.mult;
  if (animal.pelt >= 3 && buyer.likes.includes('pelt')) mult += 0.15;
  if (animal.meat >= 10 && buyer.likes.includes('meat')) mult += 0.15;
  if (buyer.likes.includes('trophy') && animal.difficulty >= 4) mult += 0.2;
  return Math.max(1, Math.round(huntingPriceFor(animal, rank, upgrades, seasonMult) * mult));
}

export function createHuntingSystem(ctx) {
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
    hunts: 0,
    kills: 0,
    cleanKills: 0,
    misses: 0,
    wounded: 0,
    spooked: 0,
    charged: 0,
    earned: 0,
    spent: 0,
    fines: 0,
    finesPaid: 0,
    meat: {},
    pelts: {},
    trophies: [],
    trophiesSold: 0,
    upgrades: [],
    habitat: null,
    stalk: null,
    stalkProgress: 0,
    stalkTarget: null,
    encounters: 0,
    dayDrift: {},
    lastDay: 1,
    month: 9,
    activeContract: null,
    contractProgress: 0,
    contractsDone: 0,
    contractsFailed: 0,
    bestAnimal: null,
    bestValue: 0,
    dailyKills: 0,
    dailyEarned: 0,
    shotsFired: 0,
    heartShots: 0,
    wardenWarnings: 0,
    currentEvent: null,
    seasonMult: 1.2,
    licenses: 0,
  };
  for (const a of HUNTING_ANIMALS) { state.meat[a.id] = 0; state.pelts[a.id] = 0; state.dayDrift[a.id] = 0; }

  function refreshRank() {
    const r = huntingRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Hunting rank up: ${HUNTING_RANKS[r].name} — ${HUNTING_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function seasonOf(day) {
    const month = ((Math.floor((day - 1) / 30) + 8) % 12) + 1;
    state.month = month;
    const s = huntingSeasonFor(month);
    state.seasonMult = s.mult;
    return s;
  }

  function pickAnimal(habitatId) {
    const season = seasonOf(getDay());
    const bag = [];
    for (const a of HUNTING_ANIMALS) {
      if (a.habitat !== habitatId) continue;
      if (!huntingInSeason(a, state.month)) continue;
      let w = a.rarity;
      if (state.upgrades.includes('call')) w *= 1.3;
      if (state.currentEvent) {
        const ev = HUNTING_EVENTS.find((e) => e.id === state.currentEvent);
        if (ev && ev.animals.includes(a.id)) w *= ev.mult;
      }
      bag.push({ a, w });
    }
    if (bag.length === 0) return null;
    let total = 0;
    for (const b of bag) total += b.w;
    let roll = rng() * total;
    for (const b of bag) {
      roll -= b.w;
      if (roll <= 0) return b.a;
    }
    return bag[0].a;
  }

  function startHunt(habitatId) {
    const h = HUNTING_HABITATS.find((x) => x.id === habitatId);
    if (!h) return { ok: false, reason: 'no-such-habitat' };
    if (state.habitat) return { ok: false, reason: 'hunt-active' };
    const hour = getHour();
    if (hour >= 22 || hour < 4) return { ok: false, reason: 'too-dark' };
    state.habitat = habitatId;
    state.stalk = null;
    state.stalkTarget = null;
    state.stalkProgress = 0;
    log(`Hunt started in ${h.name} — move slow, watch the wind.`);
    return { ok: true, habitat: habitatId };
  }

  function stalk() {
    if (!state.habitat) return { ok: false, reason: 'no-hunt' };
    if (state.stalk) return { ok: false, reason: 'already-stalking' };
    const animal = pickAnimal(state.habitat);
    if (!animal) return { ok: false, reason: 'nothing-here' };
    const weather = huntingWeatherMod((getWeather() || {}).condition || 'clear');
    const encounterRoll = rng() + weather.encounter;
    if (encounterRoll < 0.25) {
      state.spooked += 1;
      log('The woods go quiet — something spooked before you saw it.');
      return { ok: true, found: false, note: 'spooked' };
    }
    state.stalk = animal.id;
    state.stalkTarget = animal.id;
    state.stalkProgress = 0;
    state.encounters += 1;
    log(`Sign found: ${animal.name} — ${animal.desc} Stalk it close.`);
    return { ok: true, found: true, animal: animal.id, name: animal.name, trackTime: animal.trackTime };
  }

  function creep() {
    if (!state.stalk) return { ok: false, reason: 'not-stalking' };
    const animal = HUNTING_ANIMALS.find((a) => a.id === state.stalk);
    state.stalkProgress += 1;
    const spookChance = 0.12 * animal.difficulty - (state.upgrades.includes('boots') ? 0.06 : 0);
    if (rng() < Math.max(0.02, spookChance)) {
      state.stalk = null;
      state.stalkTarget = null;
      state.stalkProgress = 0;
      state.spooked += 1;
      log(`The ${animal.name} caught your movement and bolted.`);
      return { ok: true, spooked: true };
    }
    const ready = state.stalkProgress >= animal.trackTime;
    if (ready) log(`You are in range of the ${animal.name}. Take the shot.`);
    return { ok: true, progress: state.stalkProgress, need: animal.trackTime, ready };
  }

  function shoot() {
    if (!state.stalk) return { ok: false, reason: 'not-stalking' };
    const animal = HUNTING_ANIMALS.find((a) => a.id === state.stalk);
    const weather = huntingWeatherMod((getWeather() || {}).condition || 'clear');
    const inRange = state.stalkProgress >= animal.trackTime;
    let acc = huntingBaseAccuracy(state.rank, state.upgrades) + weather.accuracy;
    if (!inRange) acc -= 0.25;
    acc -= (animal.difficulty - 1) * 0.06;
    if (state.upgrades.includes('rifle') && animal.difficulty >= 4) acc += 0.1;
    state.shotsFired += 1;
    const roll = rng();
    if (roll > acc) {
      state.misses += 1;
      state.stalk = null;
      state.stalkTarget = null;
      state.stalkProgress = 0;
      state.spooked += 1;
      log(`Missed the ${animal.name} — the shot echoes and the woods empty.`);
      return { ok: true, hit: false };
    }
    const heart = rng() < 0.25 + state.rank * 0.03;
    const wounded = !heart && rng() < 0.2;
    state.stalk = null;
    state.stalkTarget = null;
    state.stalkProgress = 0;
    state.kills += 1;
    state.dailyKills += 1;
    state.hunts += 1;
    if (heart) {
      state.heartShots += 1;
      state.cleanKills += 1;
      gainXp(20 + animal.difficulty * 8);
    } else if (wounded) {
      state.wounded += 1;
      gainXp(8 + animal.difficulty * 4);
      if (animal.danger >= 3 && rng() < 0.4) {
        state.charged += 1;
        addHeat(2);
        log(`The wounded ${animal.name} CHARGED! You barely got clear — heat +2.`);
      } else {
        log(`The ${animal.name} is wounded and limping. The dog would help here.`);
      }
    } else {
      state.cleanKills += 1;
      gainXp(12 + animal.difficulty * 6);
    }
    state.meat[animal.id] += animal.meat;
    state.pelts[animal.id] += animal.pelt;
    if (animal.value > state.bestValue) { state.bestValue = animal.value; state.bestAnimal = animal.id; }
    const trophy = HUNTING_TROPHIES.find((t) => t.animal === animal.id);
    if (trophy && heart && rng() < 0.35) {
      state.trophies.push(trophy.id);
      log(`Trophy! ${trophy.name} recovered from the ${animal.name}.`);
    }
    if (state.activeContract) checkContract(animal.id, 1);
    log(`${heart ? 'Heart shot! ' : ''}${animal.name} down — +${animal.meat} meat, +${animal.pelt} pelts.`);
    return { ok: true, hit: true, heart, wounded, animal: animal.id, meat: animal.meat, pelts: animal.pelt };
  }

  function endHunt() {
    if (!state.habitat) return { ok: false, reason: 'no-hunt' };
    const h = state.habitat;
    state.habitat = null;
    state.stalk = null;
    state.stalkTarget = null;
    state.stalkProgress = 0;
    log(`Hunt over in ${h} — head back and sell the haul.`);
    return { ok: true, habitat: h };
  }

  function sellMeat(buyerId, animalId, qty) {
    const buyer = HUNTING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    if (state.rank < buyer.minRank) return { ok: false, reason: 'rank-too-low', need: buyer.minRank };
    const animal = HUNTING_ANIMALS.find((a) => a.id === animalId);
    if (!animal) return { ok: false, reason: 'no-such-animal' };
    const have = state.meat[animalId] || 0;
    if (qty <= 0 || have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = Math.max(1, Math.round(huntingBuyerPrice(animal, buyerId, state.rank, state.upgrades, state.seasonMult) / Math.max(1, animal.meat)));
    const total = unit * qty;
    state.meat[animalId] -= qty;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(qty);
    log(`Sold ${qty} meat (${animal.name}) to ${buyer.name} for $${total}.`);
    return { ok: true, total, unit, qty };
  }

  function sellPelts(buyerId, animalId, qty) {
    const buyer = HUNTING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    if (state.rank < buyer.minRank) return { ok: false, reason: 'rank-too-low', need: buyer.minRank };
    const animal = HUNTING_ANIMALS.find((a) => a.id === animalId);
    if (!animal) return { ok: false, reason: 'no-such-animal' };
    const have = state.pelts[animalId] || 0;
    if (qty <= 0 || have < qty) return { ok: false, reason: 'not-enough', have };
    const unit = Math.max(2, Math.round(huntingBuyerPrice(animal, buyerId, state.rank, state.upgrades, state.seasonMult) * 0.4));
    const total = unit * qty;
    state.pelts[animalId] -= qty;
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(qty * 2);
    log(`Sold ${qty} pelts (${animal.name}) to ${buyer.name} for $${total}.`);
    return { ok: true, total, unit, qty };
  }

  function sellAll(buyerId) {
    const buyer = HUNTING_BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, reason: 'no-such-buyer' };
    let total = 0;
    let units = 0;
    const lines = [];
    for (const a of HUNTING_ANIMALS) {
      const mQty = state.meat[a.id] || 0;
      if (mQty > 0) {
        const unit = Math.max(1, Math.round(huntingBuyerPrice(a, buyerId, state.rank, state.upgrades, state.seasonMult) / Math.max(1, a.meat)));
        const line = unit * mQty;
        total += line; units += mQty;
        lines.push({ kind: 'meat', id: a.id, qty: mQty, total: line });
        state.meat[a.id] = 0;
      }
      const pQty = state.pelts[a.id] || 0;
      if (pQty > 0) {
        const unit = Math.max(2, Math.round(huntingBuyerPrice(a, buyerId, state.rank, state.upgrades, state.seasonMult) * 0.4));
        const line = unit * pQty;
        total += line; units += pQty;
        lines.push({ kind: 'pelt', id: a.id, qty: pQty, total: line });
        state.pelts[a.id] = 0;
      }
    }
    if (units === 0) return { ok: false, reason: 'nothing-to-sell' };
    state.earned += total;
    state.dailyEarned += total;
    addCash(total);
    gainXp(units);
    log(`Sold the whole haul to ${buyer.name} for $${total}.`);
    return { ok: true, total, units, lines };
  }

  function sellTrophy(trophyId) {
    const idx = state.trophies.indexOf(trophyId);
    if (idx < 0) return { ok: false, reason: 'no-such-trophy' };
    const t = HUNTING_TROPHIES.find((x) => x.id === trophyId);
    state.trophies.splice(idx, 1);
    state.trophiesSold += 1;
    const value = t.value + state.rank * 30;
    state.earned += value;
    addCash(value);
    gainXp(25);
    log(`Sold the ${t.name} for $${value}.`);
    return { ok: true, value };
  }

  function buyUpgrade(id) {
    const u = HUNTING_UPGRADES.find((x) => x.id === id);
    if (!u) return { ok: false, reason: 'no-such-upgrade' };
    if (state.upgrades.includes(id)) return { ok: false, reason: 'already-owned' };
    if (getCash() < u.cost) return { ok: false, reason: 'not-enough-cash', cost: u.cost };
    addCash(-u.cost);
    state.spent += u.cost;
    state.upgrades.push(id);
    if (id === 'license') state.licenses += 1;
    gainXp(20);
    log(`Bought ${u.name} for $${u.cost}.`);
    return { ok: true, id };
  }

  function takeContract(id) {
    const ct = HUNTING_CONTRACTS.find((x) => x.id === id);
    if (!ct) return { ok: false, reason: 'no-such-contract' };
    if (state.activeContract) return { ok: false, reason: 'contract-active' };
    if (state.rank < ct.rep) return { ok: false, reason: 'rep-too-low', need: ct.rep };
    state.activeContract = { ...ct, dayTaken: getDay(), deadlineDay: getDay() + ct.days };
    state.contractProgress = 0;
    log(`Contract taken: ${ct.name} — ${ct.qty}x ${ct.animal} by day ${state.activeContract.deadlineDay}.`);
    return { ok: true, contract: state.activeContract };
  }

  function checkContract(animalId, qty) {
    const ct = state.activeContract;
    if (!ct || ct.animal !== animalId) return;
    state.contractProgress += qty;
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
    log('Contract abandoned — the client will not call again soon.');
    return { ok: true };
  }

  function payFine() {
    if (state.fines <= 0) return { ok: false, reason: 'no-fines' };
    const amount = state.fines;
    if (getCash() < amount) return { ok: false, reason: 'not-enough-cash', amount };
    addCash(-amount);
    state.finesPaid += amount;
    state.fines = 0;
    state.wardenWarnings = 0;
    log(`Warden fines settled: $${amount} paid.`);
    return { ok: true, amount };
  }

  function wardenCheck() {
    const hour = getHour();
    const legal = state.upgrades.includes('license');
    const night = hour >= 22 || hour < 4;
    if (!legal && state.habitat && rng() < 0.25) {
      const fine = 150 + state.wardenWarnings * 100;
      state.fines += fine;
      state.wardenWarnings += 1;
      addHeat(3);
      log(`The warden catches you hunting without a licence — fine $${fine}, heat +3.`);
      return { ok: true, caught: true, fine };
    }
    if (night && state.habitat) {
      state.fines += 100;
      addHeat(2);
      log('Night hunting is illegal — the warden notes your plates.');
      return { ok: true, caught: true, fine: 100 };
    }
    return { ok: true, caught: false };
  }

  function priceBoard() {
    return HUNTING_ANIMALS.map((a) => ({
      id: a.id, name: a.name,
      price: huntingPriceFor(a, state.rank, state.upgrades, state.seasonMult),
      inSeason: huntingInSeason(a, state.month),
      meat: state.meat[a.id], pelts: state.pelts[a.id],
    }));
  }

  function habitatReport() {
    return HUNTING_HABITATS.map((h) => ({
      id: h.id, name: h.name, district: h.district, mult: h.mult, danger: h.danger,
      animals: HUNTING_ANIMALS.filter((a) => a.habitat === h.id).map((a) => a.id),
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.2) {
      const ev = HUNTING_EVENTS[Math.floor(rng() * HUNTING_EVENTS.length)];
      state.currentEvent = ev.id;
      log(`Wild news: ${ev.name} — ${ev.desc}`);
      return { event: ev.id, name: ev.name };
    }
    if (roll < 0.3) {
      const free = HUNTING_ANIMALS[Math.floor(rng() * HUNTING_ANIMALS.length)];
      state.meat[free.id] += 2;
      log(`A fellow hunter gifts you 2 meat from a ${free.name}.`);
      return { event: 'gift', animal: free.id };
    }
    state.currentEvent = null;
    return { event: 'none' };
  }

  function tick(dt) {
    if (state.stalk) {
      state.stalkProgress += dt * 0.02;
    }
    if (state.habitat && !state.stalk && rng() < dt * 0.01) {
      log('A twig snaps somewhere ahead. Stay low.');
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    seasonOf(day);
    state.dailyKills = 0;
    state.dailyEarned = 0;
    if (state.activeContract && day >= state.activeContract.deadlineDay && state.contractProgress < state.activeContract.qty) {
      log(`Contract ${state.activeContract.name} expired — the client walked away.`);
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractsFailed += 1;
    }
    if (!state.upgrades.includes('freezer')) {
      for (const a of HUNTING_ANIMALS) {
        const spoiled = Math.floor((state.meat[a.id] || 0) * 0.2);
        if (spoiled > 0) {
          state.meat[a.id] -= spoiled;
          if (day % 3 === 0) log(`${spoiled} meat (${a.name}) spoiled overnight — buy a freezer.`);
        }
      }
    }
    dailyEvent();
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, hunts: state.hunts, kills: state.kills,
      cleanKills: state.cleanKills, misses: state.misses, wounded: state.wounded,
      spooked: state.spooked, charged: state.charged, earned: state.earned,
      spent: state.spent, fines: state.fines, finesPaid: state.finesPaid,
      meat: state.meat, pelts: state.pelts, trophies: state.trophies,
      trophiesSold: state.trophiesSold, upgrades: state.upgrades,
      habitat: state.habitat, stalk: state.stalk, stalkProgress: state.stalkProgress,
      stalkTarget: state.stalkTarget, encounters: state.encounters,
      dayDrift: state.dayDrift, lastDay: state.lastDay, month: state.month,
      activeContract: state.activeContract, contractProgress: state.contractProgress,
      contractsDone: state.contractsDone, contractsFailed: state.contractsFailed,
      bestAnimal: state.bestAnimal, bestValue: state.bestValue,
      dailyKills: state.dailyKills, dailyEarned: state.dailyEarned,
      shotsFired: state.shotsFired, heartShots: state.heartShots,
      wardenWarnings: state.wardenWarnings, currentEvent: state.currentEvent,
      seasonMult: state.seasonMult, licenses: state.licenses,
    }));
  }

  function deserialize(d) {
    if (!d || typeof d !== 'object') return;
    for (const k of Object.keys(state)) {
      if (d[k] !== undefined) state[k] = d[k];
    }
    for (const a of HUNTING_ANIMALS) {
      if (state.meat[a.id] === undefined) state.meat[a.id] = 0;
      if (state.pelts[a.id] === undefined) state.pelts[a.id] = 0;
      if (state.dayDrift[a.id] === undefined) state.dayDrift[a.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: HUNTING_RANKS[state.rank].name,
      xp: state.xp,
      hunts: state.hunts,
      kills: state.kills,
      cleanKills: state.cleanKills,
      misses: state.misses,
      wounded: state.wounded,
      spooked: state.spooked,
      charged: state.charged,
      accuracy: state.shotsFired ? Math.round((state.kills / state.shotsFired) * 100) : 0,
      heartShots: state.heartShots,
      earned: Math.round(state.earned),
      spent: state.spent,
      fines: state.fines,
      trophies: state.trophies.length,
      trophiesSold: state.trophiesSold,
      upgrades: state.upgrades.length,
      habitat: state.habitat,
      stalking: state.stalk,
      season: huntingSeasonFor(state.month).name,
      month: state.month,
      activeContract: state.activeContract ? state.activeContract.id : null,
      contractsDone: state.contractsDone,
      contractsFailed: state.contractsFailed,
      bestAnimal: state.bestAnimal,
      dailyKills: state.dailyKills,
      dailyEarned: Math.round(state.dailyEarned),
      event: state.currentEvent,
    };
  }

  function hudLine() {
    if (state.stalk) {
      const a = HUNTING_ANIMALS.find((x) => x.id === state.stalk);
      return `Hunt: stalking ${a ? a.name : state.stalk} — ${Math.floor(state.stalkProgress)}/${a ? a.trackTime : '?'} close`;
    }
    if (state.habitat) return `Hunt: ${state.habitat} — find sign to stalk`;
    if (state.activeContract) return `Hunt: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    const meatTotal = Object.values(state.meat).reduce((a, b) => a + b, 0);
    if (meatTotal > 0) return `Hunt: ${meatTotal} meat to sell`;
    if (state.fines > 0) return `Hunt: warden fines $${state.fines} unpaid`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearWoods = Math.hypot(pos.x - 200, pos.z - 300) < 40;
    if (!nearWoods) return false;
    if (!state.habitat) { startHunt('pine'); return true; }
    if (!state.stalk) { stalk(); return true; }
    creep();
    return true;
  }

  return {
    state, startHunt, stalk, creep, shoot, endHunt,
    sellMeat, sellPelts, sellAll, sellTrophy, buyUpgrade,
    takeContract, deliverContract, abandonContract, payFine,
    wardenCheck, priceBoard, habitatReport, dailyEvent,
    tick, tickDay, serialize, deserialize, stats, hudLine, interact,
  };
}

export const HUNTING_HELPERS = [
  { id: 'tracker', name: 'Old Silas', wage: 30, skill: 'track', bonus: 0.2, desc: 'Reads sign like a book: +20% encounters.' },
  { id: 'skinner', name: 'Mara the Skinner', wage: 45, skill: 'pelt', bonus: 0.25, desc: 'Clean skins: +25% pelt value.' },
  { id: 'cook', name: 'Chef Ansel', wage: 55, skill: 'meat', bonus: 0.2, desc: 'Butchers neat: +20% meat value.' },
  { id: 'warden-friend', name: 'Ranger Pete', wage: 70, skill: 'legal', bonus: 0.5, desc: 'Knows the warden: fines halved.' },
];

export const HUNTING_CHALLENGES = [
  { id: 'first-blood', name: 'First Blood', target: 'kills', goal: 1, xp: 40, desc: 'Take your first animal.' },
  { id: 'kills-25', name: 'Seasoned Hunter', target: 'kills', goal: 25, xp: 100, desc: 'Take 25 animals.' },
  { id: 'heart-10', name: 'Dead Eye', target: 'heartShots', goal: 10, xp: 120, desc: 'Land 10 heart shots.' },
  { id: 'earn-1000', name: 'Hunter’s Purse', target: 'earned', goal: 1000, xp: 120, desc: 'Earn $1,000 from the hunt.' },
  { id: 'trophies-5', name: 'Trophy Wall', target: 'trophiesSold', goal: 5, xp: 150, desc: 'Sell 5 trophies.' },
  { id: 'contracts-5', name: 'Reliable Gun', target: 'contractsDone', goal: 5, xp: 140, desc: 'Complete 5 hunting contracts.' },
  { id: 'elk-1', name: 'Ridge King', target: 'bestValue', goal: 210, xp: 150, desc: 'Take game worth $210 or more.' },
  { id: 'no-spook', name: 'Ghost in the Woods', target: 'spooked', goal: 0, xp: 80, desc: 'Finish a day with zero spooks.' },
];

export const HUNTING_ACHIEVEMENTS = [
  { id: 'first-kill', name: 'First Kill', check: (s) => s.kills >= 1, desc: 'Take your first animal.' },
  { id: 'first-trophy', name: 'First Trophy', check: (s) => s.trophiesSold >= 1 || s.trophies.length >= 1, desc: 'Recover your first trophy.' },
  { id: 'bear-down', name: 'Bear Down', check: (s) => s.bestAnimal === 'bear', desc: 'Take down a black bear.' },
  { id: 'rank-3', name: 'Big Game Hunter', check: (s) => s.rank >= 3, desc: 'Reach rank Big Game Hunter.' },
  { id: 'rich-hunter', name: 'Rich Hunter', check: (s) => s.earned >= 3000, desc: 'Earn $3,000 from hunting.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every hunting upgrade.' },
  { id: 'clean-day', name: 'Clean Day', check: (s) => s.dailyKills >= 5 && s.misses === 0, desc: 'Five kills, no misses, one day.' },
  { id: 'no-fines', name: 'Clean Record', check: (s) => s.kills >= 20 && s.finesPaid === 0 && s.fines === 0, desc: 'Twenty kills, never fined.' },
];

export function huntingHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of HUNTING_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function huntingChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function createHuntingExtras(system) {
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  function hireHelper(id) {
    const h = HUNTING_HELPERS.find((x) => x.id === id);
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
      const h = HUNTING_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    wagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: wagesPaid };
  }

  function helperBonus(skill) {
    return huntingHelperBonus(helpers, skill);
  }

  function challenges() {
    return HUNTING_CHALLENGES.map((ch) => huntingChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = HUNTING_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = huntingChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return HUNTING_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function butcherAll() {
    let meat = 0;
    for (const a of HUNTING_ANIMALS) meat += system.state.meat[a.id] || 0;
    return { ok: true, meat, note: 'The butcher weighs the lot.' };
  }

  function tanAll() {
    let pelts = 0;
    for (const a of HUNTING_ANIMALS) pelts += system.state.pelts[a.id] || 0;
    return { ok: true, pelts, note: 'The tannery salts the lot.' };
  }

  function inventoryValue() {
    let total = 0;
    for (const a of HUNTING_ANIMALS) {
      total += (system.state.meat[a.id] || 0) * 3;
      total += (system.state.pelts[a.id] || 0) * 8;
    }
    return { ok: true, value: Math.round(total) };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, butcherAll, tanAll, inventoryValue,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return wagesPaid; },
  };
}

export const HUNTING_TIPS = [
  { id: 'dawn', name: 'Dawn Is Gold', text: 'Animals feed at dawn. Be in the woods before first light.' },
  { id: 'wind', name: 'Mind the Wind', text: 'Wind carries your scent. Approach from downwind.' },
  { id: 'heart', name: 'Aim for the Heart', text: 'A heart shot pays a trophy bonus and wastes no meat.' },
  { id: 'license-first', name: 'Licence First', text: 'One warden fine costs more than the licence.' },
  { id: 'boar-care', name: 'Boar Care', text: 'A wounded boar charges. Keep your distance and your nerve.' },
  { id: 'freeze', name: 'Freeze It', text: 'Meat spoils in three days without a freezer.' },
  { id: 'rut', name: 'The Rut', text: 'During the rut, elk and deer forget to be careful.' },
  { id: 'dog', name: 'A Good Dog', text: 'A tracker dog finds wounded game you would lose.' },
];

export const HUNTING_LEADERBOARD = [
  { name: 'Old Silas', kills: 1400, desc: 'Sixty seasons in these woods.' },
  { name: 'Ranger Pete', kills: 900, desc: 'The warden who hunts too.' },
  { name: 'Ria', kills: 0, desc: 'You. Climbing.' },
  { name: 'Mara', kills: 620, desc: 'Skins everything she shoots.' },
  { name: 'Chef Ansel', kills: 310, desc: 'Hunts what he cooks.' },
];

export function huntingTipFor(day) {
  return HUNTING_TIPS[day % HUNTING_TIPS.length];
}

export function huntingLeaderboardWith(playerKills) {
  const board = HUNTING_LEADERBOARD.map((e) => ({
    name: e.name, kills: e.name === 'Ria' ? playerKills : e.kills, desc: e.desc,
  }));
  board.sort((a, b) => b.kills - a.kills);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function huntingEfficiency(kills, shotsFired) {
  if (shotsFired === 0) return 0;
  return Math.round((kills / shotsFired) * 100);
}

export function huntingProfitPerDay(earned, hunts) {
  if (hunts === 0) return 0;
  return Math.round((earned / hunts) * 10) / 10;
}

export function huntingGrade(kills, misses, heartShots) {
  const total = kills + misses;
  if (total === 0) return 'D';
  const acc = kills / total;
  if (acc >= 0.9 && heartShots >= 3) return 'S';
  if (acc >= 0.8) return 'A';
  if (acc >= 0.6) return 'B';
  if (acc >= 0.4) return 'C';
  return 'D';
}

export const HUNTING_RECORDS = [
  { id: 'most-kills', name: 'Most Kills', stat: 'kills', unit: 'kills', desc: 'Most animals taken.' },
  { id: 'best-value', name: 'Best Animal', stat: 'bestValue', unit: '$', desc: 'Most valuable single animal.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from hunting.' },
  { id: 'heart-shots', name: 'Heart Shots', stat: 'heartShots', unit: 'shots', desc: 'Most clean heart shots.' },
  { id: 'trophies', name: 'Trophies', stat: 'trophiesSold', unit: 'sold', desc: 'Most trophies sold.' },
];

export function huntingRecordFor(recordId, state) {
  const r = HUNTING_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function huntingAllRecords(state) {
  return HUNTING_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function huntingSummary(state) {
  return `Hunt ${HUNTING_RANKS[state.rank].name}: ${state.kills} kills, ${state.heartShots} heart shots, $${Math.round(state.earned)} earned, ${state.trophies.length} trophies.`;
}

export function huntingNextGoal(state) {
  if (state.kills < 5) return 'Take 5 animals.';
  if (state.heartShots < 5) return 'Land 5 heart shots.';
  if (state.rank < 2) return 'Reach rank Stalker.';
  return 'Take down a ridge elk.';
}

export const HUNTING_QUICK_START = [
  'Buy the hunting licence before your first hunt.',
  'Start in the marsh at dawn — rabbits and ducks are easy.',
  'Creep close before you shoot; a long shot usually misses.',
  'Sell meat to the butcher and pelts to the tannery.',
  'Take contracts for animals you already hunt.',
  'Never hunt a bear without the bolt rifle.',
];

export function huntingQuickStart(step) {
  return HUNTING_QUICK_START[step] || null;
}

export const HUNTING_META = {
  system: 'hunting', version: '7-B1', author: 'builder-1',
  animals: HUNTING_ANIMALS.length, habitats: HUNTING_HABITATS.length,
  note: 'Wild Trails: stalk, shoot clean, sell the haul.',
};
