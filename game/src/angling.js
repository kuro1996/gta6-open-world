export const FISH_SPECIES = [
  { id: 'bluegill', name: 'Bluegill', rarity: 'common', weight: 10, basePrice: 5, minKg: 0.2, maxKg: 0.8, depth: 'shallow', bestHours: [6, 7, 17], fight: 2, xp: 5 },
  { id: 'perch', name: 'Perch', rarity: 'common', weight: 10, basePrice: 6, minKg: 0.3, maxKg: 1.1, depth: 'shallow', bestHours: [7, 8, 18], fight: 2, xp: 5 },
  { id: 'catfish', name: 'Catfish', rarity: 'common', weight: 9, basePrice: 9, minKg: 1, maxKg: 6, depth: 'mid', bestHours: [20, 21, 22], fight: 4, xp: 10 },
  { id: 'bass', name: 'Bass', rarity: 'common', weight: 9, basePrice: 12, minKg: 0.5, maxKg: 3, depth: 'shallow', bestHours: [6, 17, 18], fight: 4, xp: 10 },
  { id: 'trout', name: 'Trout', rarity: 'uncommon', weight: 8, basePrice: 18, minKg: 0.5, maxKg: 2.5, depth: 'mid', bestHours: [6, 7, 19], fight: 5, xp: 15 },
  { id: 'salmon', name: 'Salmon', rarity: 'uncommon', weight: 7, basePrice: 25, minKg: 1, maxKg: 5, depth: 'mid', bestHours: [6, 7, 8], fight: 6, xp: 20 },
  { id: 'mackerel', name: 'Mackerel', rarity: 'common', weight: 10, basePrice: 8, minKg: 0.3, maxKg: 1.2, depth: 'shallow', bestHours: [9, 10, 15], fight: 3, xp: 8 },
  { id: 'snapper', name: 'Snapper', rarity: 'uncommon', weight: 7, basePrice: 30, minKg: 0.8, maxKg: 4, depth: 'mid', bestHours: [10, 11, 16], fight: 6, xp: 20 },
  { id: 'tuna', name: 'Tuna', rarity: 'rare', weight: 5, basePrice: 80, minKg: 5, maxKg: 40, depth: 'deep', bestHours: [8, 9, 10], fight: 8, xp: 40 },
  { id: 'marlin', name: 'Marlin', rarity: 'epic', weight: 3, basePrice: 200, minKg: 20, maxKg: 120, depth: 'deep', bestHours: [7, 8, 9], fight: 9, xp: 80 },
  { id: 'swordfish', name: 'Swordfish', rarity: 'epic', weight: 3, basePrice: 250, minKg: 15, maxKg: 90, depth: 'deep', bestHours: [5, 6, 7], fight: 10, xp: 90 },
  { id: 'shark', name: 'Reef Shark', rarity: 'rare', weight: 4, basePrice: 150, minKg: 10, maxKg: 80, depth: 'deep', bestHours: [19, 20, 21], fight: 9, xp: 60 },
  { id: 'eel', name: 'Moray Eel', rarity: 'uncommon', weight: 6, basePrice: 35, minKg: 0.5, maxKg: 3, depth: 'mid', bestHours: [22, 23, 0], fight: 5, xp: 18 },
  { id: 'stingray', name: 'Stingray', rarity: 'rare', weight: 4, basePrice: 60, minKg: 2, maxKg: 15, depth: 'mid', bestHours: [12, 13, 14], fight: 7, xp: 35 },
  { id: 'golden-koi', name: 'Golden Koi', rarity: 'legendary', weight: 1, basePrice: 500, minKg: 1, maxKg: 3, depth: 'shallow', bestHours: [12], fight: 7, xp: 150 },
  { id: 'kraken-calf', name: 'Kraken Calf', rarity: 'mythic', weight: 1, basePrice: 1000, minKg: 30, maxKg: 80, depth: 'deep', bestHours: [0], fight: 10, xp: 300 },
  { id: 'ghost-eel', name: 'Ghost Eel', rarity: 'legendary', weight: 1, basePrice: 700, minKg: 0.5, maxKg: 2, depth: 'mid', bestHours: [1, 2, 3], fight: 8, xp: 200 },
  { id: 'clownfish', name: 'Clownfish', rarity: 'common', weight: 8, basePrice: 15, minKg: 0.1, maxKg: 0.3, depth: 'shallow', bestHours: [11, 12, 13], fight: 1, xp: 5 },
];

export const RARITY_MULT = {
  common: 1,
  uncommon: 1.5,
  rare: 2.5,
  epic: 4,
  legendary: 8,
  mythic: 15,
};

export const FISHING_SPOTS = [
  { id: 'north-pier', name: 'North Pier', depth: 'shallow', crowd: 4, fee: 0, bonus: 0.1, desc: 'A busy public pier' },
  { id: 'rocky-point', name: 'Rocky Point', depth: 'mid', crowd: 2, fee: 10, bonus: 0.2, desc: 'Rocks and strong currents' },
  { id: 'deep-charter', name: 'Deep Charter', depth: 'deep', crowd: 1, fee: 100, bonus: 0.4, desc: 'A charter boat to deep water' },
  { id: 'mangrove', name: 'Mangrove Creek', depth: 'shallow', crowd: 2, fee: 5, bonus: 0.15, desc: 'Calm mangrove water' },
  { id: 'reef-edge', name: 'Reef Edge', depth: 'mid', crowd: 3, fee: 25, bonus: 0.3, desc: 'The edge of the coral reef' },
  { id: 'storm-bay', name: 'Storm Bay', depth: 'deep', crowd: 1, fee: 60, bonus: 0.35, desc: 'Rough water, big fish' },
];

export const RODS = [
  { id: 'stick', name: 'Stick Rod', price: 0, castBonus: 0, lineStrength: 5, fightBonus: 0, desc: 'A stick with string' },
  { id: 'basic', name: 'Basic Rod', price: 50, castBonus: 0.1, lineStrength: 10, fightBonus: 0.1, desc: 'A decent starter rod' },
  { id: 'carbon', name: 'Carbon Rod', price: 200, castBonus: 0.2, lineStrength: 25, fightBonus: 0.25, desc: 'Light and strong carbon fibre' },
  { id: 'pro', name: 'Pro Rod', price: 500, castBonus: 0.3, lineStrength: 50, fightBonus: 0.4, desc: 'Tournament grade gear' },
  { id: 'legend', name: 'Legend Rod', price: 1500, castBonus: 0.5, lineStrength: 100, fightBonus: 0.6, desc: 'The rod the old anglers whisper about' },
];

export const BAITS = [
  { id: 'bread', name: 'Bread', price: 1, favours: ['bluegill', 'perch', 'clownfish'], desc: 'Simple and cheap' },
  { id: 'worm', name: 'Worm', price: 2, favours: ['bass', 'trout', 'catfish'], desc: 'Wiggly and reliable' },
  { id: 'shrimp', name: 'Shrimp', price: 5, favours: ['snapper', 'mackerel', 'stingray'], desc: 'Fresh sea shrimp' },
  { id: 'squid', name: 'Squid', price: 10, favours: ['tuna', 'swordfish', 'shark'], desc: 'Big bait for big fish' },
  { id: 'lure', name: 'Spinner Lure', price: 8, favours: ['salmon', 'trout', 'bass'], desc: 'Flashy and fast' },
  { id: 'crab', name: 'Crab', price: 12, favours: ['eel', 'stingray', 'catfish'], desc: 'Hard shell, big reward' },
  { id: 'gold-fly', name: 'Golden Fly', price: 25, favours: ['golden-koi', 'marlin', 'ghost-eel'], desc: 'A fly that glints like gold' },
];

export const ANGLER_RANKS = [
  { id: 'novice', name: 'Novice', xpNeeded: 0, perk: 'Pier access' },
  { id: 'angler', name: 'Angler', xpNeeded: 100, perk: 'Better bite rate' },
  { id: 'fisher', name: 'Fisher', xpNeeded: 300, perk: 'Rocky Point access' },
  { id: 'expert', name: 'Expert', xpNeeded: 700, perk: 'Deep Charter access' },
  { id: 'master', name: 'Master', xpNeeded: 1500, perk: 'Storm Bay access' },
  { id: 'legend', name: 'Legend', xpNeeded: 3000, perk: 'Legendary catches pay double' },
];

export const TOURNAMENTS = [
  { id: 'pier-cup', name: 'Pier Cup', dayOfWeek: 6, entryFee: 20, prize: 500, species: null, minRank: 'novice', desc: 'A friendly weekend contest' },
  { id: 'big-catch', name: 'Big Catch Open', dayOfWeek: 0, entryFee: 100, prize: 2000, species: null, minRank: 'angler', desc: 'Biggest fish takes the pot' },
  { id: 'marlin-masters', name: 'Marlin Masters', dayOfWeek: 3, entryFee: 500, prize: 10000, species: 'marlin', minRank: 'expert', desc: 'Only marlin count' },
];

export const ANGLING_MISSIONS = [
  { id: 'first-catch', name: 'First Catch', desc: 'Catch your first fish', reward: 50 },
  { id: 'catch-10', name: 'Ten Fish', desc: 'Catch 10 fish', reward: 100 },
  { id: 'catch-50', name: 'Fifty Fish', desc: 'Catch 50 fish', reward: 300 },
  { id: 'sell-1000', name: 'Thousand Dollar Day', desc: 'Earn 1000 from selling fish', reward: 200 },
  { id: 'rare-catch', name: 'Rare Catch', desc: 'Catch a rare fish', reward: 150 },
  { id: 'epic-catch', name: 'Epic Catch', desc: 'Catch an epic fish', reward: 400 },
  { id: 'legendary-catch', name: 'Legendary Catch', desc: 'Catch a legendary fish', reward: 1000 },
  { id: 'tournament-win', name: 'Tournament Winner', desc: 'Win a fishing tournament', reward: 500 },
  { id: 'mount-trophy', name: 'Trophy Mount', desc: 'Mount your first trophy', reward: 150 },
  { id: 'perfect-fight', name: 'Perfect Fight', desc: 'Land a fish perfectly', reward: 250 },
];

export const MARKET_HOUR_MULT = [
  0.8, 0.8, 0.8, 0.8, 0.8, 0.9, 1.0, 1.1, 1.2, 1.2, 1.1, 1.0,
  1.0, 1.0, 1.0, 1.1, 1.2, 1.3, 1.3, 1.2, 1.1, 1.0, 0.9, 0.8,
];

export const ANGLING_WEATHER = [
  { weather: 'clear', biteMult: 1, note: 'Clear skies, steady fishing' },
  { weather: 'cloudy', biteMult: 1.1, note: 'Cloud cover brings fish up' },
  { weather: 'rain', biteMult: 1.3, note: 'Rain stirs the water' },
  { weather: 'storm', biteMult: 1.5, note: 'Storm feeding frenzy' },
  { weather: 'fog', biteMult: 0.9, note: 'Fog keeps the fish shy' },
];

export const BAIT_RECIPES = [
  { id: 'chum-mix', name: 'Chum Mix', needs: { bread: 3, worm: 2 }, result: 'shrimp', qty: 2, desc: 'A stinky mix that draws fish in' },
  { id: 'gold-paste', name: 'Gold Paste', needs: { bread: 5, shrimp: 2 }, result: 'gold-fly', qty: 1, desc: 'Shiny paste for shiny fish' },
  { id: 'squid-bait', name: 'Squid Bait', needs: { shrimp: 3, worm: 3 }, result: 'squid', qty: 2, desc: 'Homemade squid bait' },
  { id: 'crab-cake', name: 'Crab Cake', needs: { bread: 2, shrimp: 2 }, result: 'crab', qty: 1, desc: 'A cake no crab can resist' },
];

export const TACKLE_EXTRAS = [
  { id: 'net', name: 'Landing Net', price: 30, desc: 'Scoop fish out with ease' },
  { id: 'tackle-box', name: 'Tackle Box', price: 40, desc: 'Keep your gear organised' },
  { id: 'cooler', name: 'Big Cooler', price: 60, desc: 'Keep the catch fresh longer' },
  { id: 'wading-boots', name: 'Wading Boots', price: 80, desc: 'Wade into the shallows' },
  { id: 'fish-finder', name: 'Fish Finder', price: 250, desc: 'Spot fish under the water' },
  { id: 'rod-holder', name: 'Rod Holder', price: 25, desc: 'Rest your rod between casts' },
  { id: 'bait-bucket', name: 'Bait Bucket', price: 15, desc: 'Keep live bait alive' },
  { id: 'sunglasses', name: 'Polarised Sunglasses', price: 90, desc: 'See through the glare' },
];

export const FISH_LORE = [
  { species: 'golden-koi', note: 'Said to grant luck to whoever catches it at noon.' },
  { species: 'kraken-calf', note: 'Its mother is out there somewhere. Do not linger.' },
  { species: 'ghost-eel', note: 'Only appears in the small hours, glowing faintly.' },
  { species: 'marlin', note: 'The fastest fish in these waters.' },
  { species: 'swordfish', note: 'Its bill can cut a line clean through.' },
  { species: 'shark', note: 'Respect the shark and it respects the boat.' },
  { species: 'catfish', note: 'The old-timers say the biggest one lives under the pier.' },
  { species: 'salmon', note: 'Swims upstream every spring without fail.' },
  { species: 'tuna', note: 'A torpedo with fins.' },
  { species: 'bass', note: 'The pier regulars favourite fight.' },
  { species: 'trout', note: 'Loves cold, clear water at dawn.' },
  { species: 'stingray', note: 'Glides along the bottom like a shadow.' },
];

export const MOON_PHASES = [
  { phase: 'new', biteMult: 0.9, note: 'Dark nights, quiet water' },
  { phase: 'crescent', biteMult: 1.0, note: 'A sliver of moon, steady bites' },
  { phase: 'half', biteMult: 1.1, note: 'Half moon, half luck' },
  { phase: 'gibbous', biteMult: 1.2, note: 'Brightening nights, feeding fish' },
  { phase: 'full', biteMult: 1.4, note: 'Full moon frenzy' },
];

export const FISHING_RECORDS = [
  { species: 'marlin', recordKg: 110, holder: 'Old Man Reyes', note: 'Caught in 1987, still unbeaten' },
  { species: 'tuna', recordKg: 38, holder: 'Captain Diaz', note: 'A monster from the deep charter' },
  { species: 'catfish', recordKg: 5.8, holder: 'Marta Luz', note: 'Pulled from under the pier' },
  { species: 'salmon', recordKg: 4.6, holder: 'Young Pete', note: 'A lucky dawn catch' },
  { species: 'shark', recordKg: 75, holder: 'Captain Diaz', note: 'Released after the photo' },
];

export const FISHING_SEASONS = [
  { season: 'spring', months: [3, 4, 5], note: 'Spawning season, fish are hungry', bonus: ['trout', 'salmon', 'bass'] },
  { season: 'summer', months: [6, 7, 8], note: 'Warm water, deep fish rise', bonus: ['tuna', 'marlin', 'mackerel'] },
  { season: 'autumn', months: [9, 10, 11], note: 'Cooling water, feeding before winter', bonus: ['catfish', 'snapper', 'eel'] },
  { season: 'winter', months: [12, 1, 2], note: 'Cold and slow, but the big ones bite', bonus: ['swordfish', 'shark', 'ghost-eel'] },
];

export const BAIT_SPECIALS = [
  { bait: 'worm', discount: 0.5, day: 1, note: 'Monday worm sale' },
  { bait: 'shrimp', discount: 0.3, day: 3, note: 'Wednesday shrimp deal' },
  { bait: 'squid', discount: 0.25, day: 5, note: 'Friday squid special' },
  { bait: 'bread', discount: 0.5, day: 0, note: 'Sunday bread giveaway' },
];

export const ANGLER_ACHIEVEMENTS = [
  { id: 'first-fish', name: 'First Fish', desc: 'Catch your first fish' },
  { id: 'deep-diver', name: 'Deep Diver', desc: 'Fish the deep charter' },
  { id: 'night-owl', name: 'Night Owl', desc: 'Fish past midnight' },
  { id: 'big-haul', name: 'Big Haul', desc: 'Fill the cooler' },
  { id: 'trophy-room', name: 'Trophy Room', desc: 'Mount five trophies' },
  { id: 'tournament-champ', name: 'Tournament Champ', desc: 'Win a tournament' },
  { id: 'legend-catcher', name: 'Legend Catcher', desc: 'Catch a legendary fish' },
  { id: 'hundred-club', name: 'Hundred Club', desc: 'Catch 100 fish' },
  { id: 'master-angler', name: 'Master Angler', desc: 'Reach master rank' },
  { id: 'full-collection', name: 'Full Collection', desc: 'Catch every species' },
];

export const ANGLER_SAYINGS = [
  'A bad day fishing beats a good day working.',
  'The fish are always biting somewhere.',
  'Patience is the angler\'s best tackle.',
  'You should have seen the one that got away.',
  'Early bird gets the worm, early angler gets the fish.',
  'The sea gives, and the sea takes.',
];

export const FISHING_KNOTS = [
  { name: 'Clinch Knot', strength: 0.8, desc: 'The classic all-rounder' },
  { name: 'Palomar Knot', strength: 0.95, desc: 'Strong and simple' },
  { name: 'Blood Knot', strength: 0.85, desc: 'Joins two lines neatly' },
  { name: 'Loop Knot', strength: 0.7, desc: 'Lets the lure move freely' },
  { name: 'Snell Knot', strength: 0.9, desc: 'A hook knot that never slips' },
];

export const TIDE_TABLE = [
  { tide: 'rising', biteMult: 1.2, note: 'Fish move in with the tide' },
  { tide: 'falling', biteMult: 1.1, note: 'Fish feed as the water drops' },
  { tide: 'high', biteMult: 1.0, note: 'Steady water, steady bites' },
  { tide: 'low', biteMult: 0.8, note: 'Shallow water, shy fish' },
];

export const OLD_ANGLER_RECORDS = [
  { angler: 'Old Man Reyes', fish: 'marlin', year: 1987 },
  { angler: 'Captain Diaz', fish: 'shark', year: 1995 },
  { angler: 'Marta Luz', fish: 'catfish', year: 2003 },
  { angler: 'Young Pete', fish: 'salmon', year: 2019 },
];

export const FISHING_BOAT_NAMES = [
  'Sea Breeze', 'Lucky Catch', 'Reel Deal', 'Nauti Buoy', 'Fish On', 'The Wanderer',
];

export const ANGLER_SUPERSTITIONS = [
  'Never whistle on a boat.',
  'Bananas on board bring bad luck.',
  'Always spit on your bait for luck.',
  'A red hat keeps the fish biting.',
];

export const LUCKY_LURES = ['Golden Spoon', 'Silver Minnow', 'Red Devil', 'Blue Flash'];

export const FISHING_PROVERBS = [
  'Give a man a fish and he eats for a day.',
  'Teach a man to fish and he eats for a lifetime.',
  'The best time to fish is whenever you can.',
  'A fisherman\'s luck is written in the water.',
];

function speciesById(id) {
  return FISH_SPECIES.find((s) => s.id === id);
}

function rodById(id) {
  return RODS.find((r) => r.id === id) || RODS[0];
}

function baitById(id) {
  return BAITS.find((b) => b.id === id);
}

function spotById(id) {
  return FISHING_SPOTS.find((s) => s.id === id);
}

function rankById(id) {
  return ANGLER_RANKS.find((r) => r.id === id) || ANGLER_RANKS[0];
}

function rankIndex(id) {
  const i = ANGLER_RANKS.findIndex((r) => r.id === id);
  return i < 0 ? 0 : i;
}

function weatherMult(word) {
  const row = ANGLING_WEATHER.find((w) => w.weather === word);
  return row ? row.biteMult : 1;
}

export function fishPrice(species, kg, hour, rankMult) {
  const hourMult = MARKET_HOUR_MULT[((hour % 24) + 24) % 24] || 1;
  const mult = RARITY_MULT[species.rarity] || 1;
  const price = Math.round(species.basePrice * kg * mult * hourMult * (rankMult || 1));
  return Math.max(1, price);
}

export function speciesForSpot(spot, hour) {
  const out = [];
  for (const sp of FISH_SPECIES) {
    if (sp.depth === 'shallow' && spot.depth !== 'shallow') continue;
    if (sp.depth === 'mid' && spot.depth === 'shallow') continue;
    if (sp.depth === 'deep' && spot.depth !== 'deep') continue;
    const w = sp.bestHours.includes(hour) ? sp.weight * 2.5 : sp.weight * 0.6;
    out.push({ species: sp, weight: w });
  }
  return out;
}

export function moonPhaseFor(day) {
  return MOON_PHASES[((day - 1) % 5 + 5) % 5];
}

export function biteChance(spot, bait, hour, weather) {
  const base = 40 + spot.bonus * 100;
  let hourBonus = 1;
  if (hour >= 5 && hour <= 8) hourBonus = 1.3;
  else if (hour >= 17 && hour <= 20) hourBonus = 1.2;
  const chance = Math.round(base * weatherMult(weather) * hourBonus);
  return Math.min(95, chance);
}

export function bestBaitFor(speciesId) {
  return BAITS.find((b) => b.favours.includes(speciesId)) || BAITS[0];
}

export function bestSpotFor(speciesId) {
  const sp = speciesById(speciesId);
  if (!sp) return spotById('north-pier');
  if (sp.depth === 'deep') return spotById('deep-charter');
  if (sp.depth === 'mid') return spotById('rocky-point');
  return spotById('north-pier');
}

export function bestHourFor(speciesId) {
  const sp = speciesById(speciesId);
  if (!sp || !sp.bestHours.length) return 7;
  return sp.bestHours[0];
}

export function isRecordCatch(speciesId, kg) {
  const rec = FISHING_RECORDS.find((r) => r.species === speciesId);
  return kg > (rec ? rec.recordKg : 50);
}

export function coolerValue(cooler) {
  return cooler.reduce((s, f) => s + (f.value || 0), 0);
}

export function collectionProgress(collection) {
  const caught = Object.keys(collection).filter((k) => collection[k] > 0).length;
  const total = FISH_SPECIES.length;
  return { caught, total, pct: Math.round((caught / total) * 100) };
}

export function rankProgress(xp) {
  let current = ANGLER_RANKS[0];
  let next = null;
  for (let i = 0; i < ANGLER_RANKS.length; i++) {
    if (xp >= ANGLER_RANKS[i].xpNeeded) current = ANGLER_RANKS[i];
    else { next = ANGLER_RANKS[i]; break; }
  }
  const needed = next ? Math.max(0, next.xpNeeded - xp) : 0;
  return { current, next, needed };
}

export function fightDifficulty(species, kg, rod) {
  const size = kg / species.maxKg;
  const diff = species.fight * (0.5 + size) * (1 - (rod.fightBonus || 0));
  return Math.round(diff * 10) / 10;
}

export function sellPriceBreakdown(cooler, hour, rankMult) {
  return cooler.map((f) => {
    const sp = speciesById(f.speciesId) || speciesById(f.id);
    const value = sp ? fishPrice(sp, f.kg, hour, rankMult) : f.value || 0;
    return { name: f.name, kg: f.kg, value };
  });
}

export function tournamentStandings(playerBest, rivalCount, rng) {
  const r = rng || Math.random;
  const rivals = [];
  for (let i = 0; i < rivalCount; i++) rivals.push(Math.round(r() * 40 * 10) / 10);
  rivals.sort((a, b) => b - a);
  const beaten = rivals.filter((x) => playerBest > x).length;
  return { place: rivalCount + 1 - beaten, rivals };
}

export function baitStockValue(stock) {
  let sum = 0;
  for (const id of Object.keys(stock)) {
    const bait = baitById(id);
    if (bait) sum += bait.price * stock[id];
  }
  return sum;
}

export function rodRecommendation(speciesId, cash) {
  const sp = speciesById(speciesId);
  const need = sp ? Math.ceil(sp.maxKg / 2) : 5;
  const fitting = RODS.filter((r) => r.lineStrength >= need);
  const afford = fitting.filter((r) => r.price <= cash);
  if (afford.length) return afford.sort((a, b) => a.price - b.price)[0];
  if (fitting.length) return fitting.sort((a, b) => a.price - b.price)[0];
  return RODS.slice().sort((a, b) => b.lineStrength - a.lineStrength)[0];
}

export function seasonFor(month) {
  return FISHING_SEASONS.find((s) => s.months.includes(month)) || FISHING_SEASONS[0];
}

export function seasonBonusFor(speciesId, month) {
  const season = seasonFor(month);
  return season.bonus.includes(speciesId) ? 1.5 : 1;
}

export function baitSpecialFor(baitId, weekday) {
  return BAIT_SPECIALS.find((s) => s.bait === baitId && s.day === weekday) || null;
}

export function baitPriceWithSpecial(baitId, weekday) {
  const bait = baitById(baitId);
  if (!bait) return 0;
  const special = baitSpecialFor(baitId, weekday);
  if (special) return Math.round(bait.price * (1 - special.discount));
  return bait.price;
}

export function achievementList() {
  return ANGLER_ACHIEVEMENTS.map((a) => ({ ...a }));
}

export function totalTackleValue(rodIds, stock) {
  let sum = baitStockValue(stock);
  for (const id of rodIds) {
    const rod = rodById(id);
    sum += rod.price;
  }
  return sum;
}

export function catchRateFor(species, spot, hour, weather, bait) {
  const pool = speciesForSpot(spot, hour);
  const entry = pool.find((p) => p.species.id === species.id);
  const weight = entry ? entry.weight : 0;
  const baitMult = bait && bait.favours.includes(species.id) ? 2 : 1;
  return Math.round(weight * weatherMult(weather) * baitMult);
}

export function knotStrength(name) {
  const k = FISHING_KNOTS.find((x) => x.name === name);
  return k ? k.strength : 0.8;
}

export function tideBiteMult(tide) {
  const row = TIDE_TABLE.find((t) => t.tide === tide);
  return row ? row.biteMult : 1;
}

export function bestKnot() {
  return FISHING_KNOTS.slice().sort((a, b) => b.strength - a.strength)[0];
}

export function randomBoatName(rng) {
  const r = rng || Math.random;
  return FISHING_BOAT_NAMES[Math.floor(r() * FISHING_BOAT_NAMES.length)];
}

export function superstitionFor(index) {
  return ANGLER_SUPERSTITIONS[((index % ANGLER_SUPERSTITIONS.length) + ANGLER_SUPERSTITIONS.length) % ANGLER_SUPERSTITIONS.length];
}

export function isLuckyLure(name) {
  return LUCKY_LURES.includes(name);
}

export function proverbFishing(index) {
  return FISHING_PROVERBS[((index % FISHING_PROVERBS.length) + FISHING_PROVERBS.length) % FISHING_PROVERBS.length];
}

export function createAnglingSystem(deps = {}) {
  const rng = typeof deps.rng === 'function' ? deps.rng : Math.random;
  const getHour = typeof deps.getHour === 'function' ? deps.getHour : () => 12;
  const getDay = typeof deps.getDay === 'function' ? deps.getDay : () => 1;
  const getCash = typeof deps.getCash === 'function' ? deps.getCash : () => 0;
  const addCash = typeof deps.addCash === 'function' ? deps.addCash : () => {};
  const log = typeof deps.log === 'function' ? deps.log : () => {};
  const getWeather = typeof deps.getWeather === 'function' ? deps.getWeather : () => ({ condition: 'clear' });

  const state = {
    xp: 0,
    rank: 'novice',
    rodId: 'stick',
    rodsOwned: ['stick'],
    baitStock: { bread: 10 },
    tackle: 0,
    currentSpot: null,
    casting: false,
    biteTimer: 0,
    biteActive: false,
    fight: null,
    cooler: [],
    collection: {},
    biggestCatch: null,
    totalCaught: 0,
    totalSold: 0,
    totalEarned: 0,
    tournamentsEntered: {},
    tournamentBest: {},
    missionsDone: {},
    recentCatches: [],
    day: 1,
    castsToday: 0,
    lineSnaps: 0,
    perfectFights: 0,
  };

  function weatherWord() {
    const w = getWeather();
    return w && w.condition ? w.condition : 'clear';
  }

  function rankMult() {
    return 1 + rankIndex(state.rank) * 0.1;
  }

  function refreshRank() {
    state.rank = rankProgress(state.xp).current.id;
  }

  function gainXp(amount) {
    state.xp += amount;
    refreshRank();
  }

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const mission = ANGLING_MISSIONS.find((m) => m.id === id);
    if (!mission) return;
    let done = false;
    if (id === 'first-catch') done = state.totalCaught >= 1;
    else if (id === 'catch-10') done = state.totalCaught >= 10;
    else if (id === 'catch-50') done = state.totalCaught >= 50;
    else if (id === 'sell-1000') done = state.totalEarned >= 1000;
    else if (id === 'rare-catch') done = Object.keys(state.collection).some((k) => {
      const sp = speciesById(k);
      return sp && sp.rarity === 'rare' && state.collection[k] > 0;
    });
    else if (id === 'epic-catch') done = Object.keys(state.collection).some((k) => {
      const sp = speciesById(k);
      return sp && sp.rarity === 'epic' && state.collection[k] > 0;
    });
    else if (id === 'legendary-catch') done = Object.keys(state.collection).some((k) => {
      const sp = speciesById(k);
      return sp && (sp.rarity === 'legendary' || sp.rarity === 'mythic') && state.collection[k] > 0;
    });
    else if (id === 'tournament-win') done = (state.tournamentWins || 0) >= 1;
    else if (id === 'mount-trophy') done = (state.trophies || []).length >= 1;
    else if (id === 'perfect-fight') done = state.perfectFights >= 1;
    if (!done) return;
    state.missionsDone[id] = true;
    addCash(mission.reward);
    log(`Mission complete: ${mission.name}`);
  }

  function rollSpecies() {
    const spot = spotById(state.currentSpot);
    const hour = getHour();
    const pool = speciesForSpot(spot, hour);
    const total = pool.reduce((s, p) => s + p.weight, 0);
    let roll = rng() * total;
    for (const entry of pool) {
      roll -= entry.weight;
      if (roll <= 0) return entry.species;
    }
    return pool[0].species;
  }

  function startFight(species) {
    const rod = rodById(state.rodId);
    const kg = Math.round((species.minKg + rng() * (species.maxKg - species.minKg)) * 10) / 10;
    state.fight = {
      speciesId: species.id,
      name: species.name,
      kg,
      difficulty: fightDifficulty(species, kg, rod),
      progress: 0,
      tension: 30,
      line: 100,
      elapsed: 0,
      reels: 0,
      pulling: false,
      biteWait: undefined,
    };
    state.biteActive = true;
    state.casting = false;
  }

  function landFish() {
    const fight = state.fight;
    const species = speciesById(fight.speciesId);
    const value = fishPrice(species, fight.kg, getHour(), rankMult());
    const fish = {
      speciesId: species.id,
      name: species.name,
      kg: fight.kg,
      value,
      rarity: species.rarity,
      day: getDay(),
    };
    state.cooler.push(fish);
    state.collection[species.id] = (state.collection[species.id] || 0) + 1;
    state.totalCaught += 1;
    if (!state.biggestCatch || fight.kg > state.biggestCatch.kg) state.biggestCatch = fish;
    state.recentCatches.push(`${species.name} ${fight.kg}kg`);
    if (state.recentCatches.length > 10) state.recentCatches.shift();
    if (fight.reels >= 10 && state.lineSnaps === 0) state.perfectFights += 1;
    gainXp(species.xp);
    state.fight = null;
    log(`Caught ${species.name} (${fight.kg}kg)`);
    checkMission('first-catch');
    checkMission('catch-10');
    checkMission('catch-50');
    checkMission('rare-catch');
    checkMission('epic-catch');
    checkMission('legendary-catch');
    checkMission('perfect-fight');
    return { ok: true, event: 'landed', fish, xp: species.xp };
  }

  const system = {
    state,

    buyRod(rodId) {
      const rod = rodById(rodId);
      if (!RODS.find((r) => r.id === rodId)) return { ok: false, error: 'unknown rod' };
      if (state.rodsOwned.includes(rodId)) {
        state.rodId = rodId;
        return { ok: true, rod, equipped: rodId, chips: null };
      }
      if (getCash() < rod.price) return { ok: false, error: 'not enough cash' };
      addCash(-rod.price);
      state.rodsOwned.push(rodId);
      state.rodId = rodId;
      log(`Bought rod: ${rod.name}`);
      return { ok: true, rod };
    },

    buyBait(baitId, qty) {
      const bait = baitById(baitId);
      if (!bait) return { ok: false, error: 'unknown bait' };
      const quantity = Math.max(1, Math.min(99, qty || 1));
      const total = bait.price * quantity;
      if (getCash() < total) return { ok: false, error: 'not enough cash' };
      addCash(-total);
      state.baitStock[baitId] = (state.baitStock[baitId] || 0) + quantity;
      return { ok: true, bait, qty: quantity, stock: state.baitStock[baitId] };
    },

    goToSpot(spotId) {
      const spot = spotById(spotId);
      if (!spot) return { ok: false, error: 'unknown spot' };
      const locked = {
        'rocky-point': ['fisher', 'expert', 'master', 'legend'],
        'deep-charter': ['expert', 'master', 'legend'],
        'storm-bay': ['master', 'legend'],
        'reef-edge': ['angler', 'fisher', 'expert', 'master', 'legend'],
      };
      const allowed = locked[spotId];
      if (allowed && !allowed.includes(state.rank)) return { ok: false, error: 'rank too low for this spot' };
      if (getCash() < spot.fee) return { ok: false, error: 'not enough cash' };
      if (spot.fee > 0) addCash(-spot.fee);
      state.currentSpot = spotId;
      state.casting = false;
      state.biteActive = false;
      state.fight = null;
      log(`Arrived at ${spot.name}`);
      return { ok: true, spot };
    },

    cast(baitId) {
      if (!state.currentSpot) return { ok: false, error: 'no spot chosen' };
      if (state.casting || state.fight) return { ok: false, error: 'already fishing' };
      const bait = baitById(baitId);
      if (!bait) return { ok: false, error: 'unknown bait' };
      if ((state.baitStock[baitId] || 0) <= 0) return { ok: false, error: 'no bait of that type' };
      state.baitStock[baitId] -= 1;
      state.casting = true;
      state.castsToday += 1;
      const spot = spotById(state.currentSpot);
      let wait = 4 + rng() * 8 + spot.crowd * 0.5;
      const weather = weatherWord();
      if (weather === 'rain') wait *= 0.8;
      else if (weather === 'storm') wait *= 0.6;
      wait *= 1 - spot.bonus * 0.5;
      state.biteTimer = wait;
      state._pendingBait = baitId;
      return { ok: true, wait: Math.round(wait * 10) / 10, bait: bait.name };
    },

    fightTick(dt, input) {
      const fight = state.fight;
      if (!fight) return { ok: false, error: 'no fish on the line' };
      state.biteActive = false;
      const act = (input && input.action) || 'reel';
      fight.elapsed += dt || 0;
      const pulling = Math.sin(fight.elapsed * 1.2) > 0.2;
      fight.pulling = pulling;
      if (pulling) {
        fight.tension += (act === 'reel' ? 12 : 6) * (dt || 1);
      } else if (act === 'reel') {
        fight.tension -= 8 * (dt || 1);
        fight.progress += 12 * (dt || 1);
        fight.reels += 1;
      } else if (act === 'slack') {
        fight.tension -= 15 * (dt || 1);
      } else {
        fight.tension -= 3 * (dt || 1);
      }
      fight.tension = Math.max(0, Math.min(100, fight.tension));
      if (fight.tension > 92) fight.line -= (fight.tension - 92) * (dt || 1);
      if (fight.tension > 98 || fight.line <= 0) {
        state.lineSnaps += 1;
        state.fight = null;
        state.biteActive = false;
        log('Line snapped!');
        return { ok: true, event: 'snapped', fight: { ...fight, pulling } };
      }
      if (fight.progress >= 100) return landFish();
      return { ok: true, event: 'fighting', fight: { ...fight, pulling } };
    },

    giveUpFight() {
      if (!state.fight) return { ok: false, error: 'no fish on the line' };
      const name = state.fight.name;
      state.fight = null;
      state.biteActive = false;
      log(`Released ${name}`);
      return { ok: true, released: name };
    },

    sellCatch(index) {
      if (index === 'all') {
        const count = state.cooler.length;
        const earned = coolerValue(state.cooler);
        state.cooler = [];
        state.totalSold += count;
        state.totalEarned += earned;
        addCash(earned);
        log(`Sold ${count} fish for ${earned}`);
        checkMission('sell-1000');
        return { ok: true, sold: count, earned };
      }
      if (typeof index !== 'number' || index < 0 || index >= state.cooler.length) {
        return { ok: false, error: 'invalid catch index' };
      }
      const fish = state.cooler.splice(index, 1)[0];
      addCash(fish.value);
      state.totalSold += 1;
      state.totalEarned += fish.value;
      log(`Sold ${fish.name} for ${fish.value}`);
      checkMission('sell-1000');
      return { ok: true, sold: 1, earned: fish.value, fish };
    },

    mountTrophy(index) {
      if (typeof index !== 'number' || index < 0 || index >= state.cooler.length) {
        return { ok: false, error: 'invalid catch index' };
      }
      const fish = state.cooler[index];
      if (fish.rarity === 'common') return { ok: false, error: 'common fish cannot be mounted' };
      state.cooler.splice(index, 1);
      if (!state.trophies) state.trophies = [];
      const trophy = { ...fish, mountedDay: getDay() };
      state.trophies.push(trophy);
      gainXp(25);
      log(`Mounted trophy: ${fish.name}`);
      checkMission('mount-trophy');
      return { ok: true, trophy };
    },

    enterTournament(tournamentId) {
      const t = TOURNAMENTS.find((x) => x.id === tournamentId);
      if (!t) return { ok: false, error: 'unknown tournament' };
      if (rankIndex(state.rank) < rankIndex(t.minRank)) return { ok: false, error: 'rank too low' };
      if (state.tournamentsEntered[tournamentId] === getDay()) return { ok: false, error: 'already entered today' };
      if (getCash() < t.entryFee) return { ok: false, error: 'not enough cash' };
      addCash(-t.entryFee);
      state.tournamentsEntered[tournamentId] = getDay();
      state.tournamentBest[tournamentId] = 0;
      log(`Entered tournament: ${t.name}`);
      return { ok: true, tournament: t };
    },

    settleTournament(tournamentId) {
      const t = TOURNAMENTS.find((x) => x.id === tournamentId);
      if (!t) return { ok: false, error: 'unknown tournament' };
      if (state.tournamentsEntered[tournamentId] === undefined) return { ok: false, error: 'not entered' };
      const playerBest = state.tournamentBest[tournamentId] || 0;
      const rivalBest = Math.round((rng() * 30 + 5) * 10) / 10;
      const won = playerBest > 0 && playerBest >= rivalBest;
      let prize = 0;
      if (won) {
        prize = t.prize;
        addCash(prize);
        state.tournamentWins = (state.tournamentWins || 0) + 1;
        checkMission('tournament-win');
      }
      delete state.tournamentsEntered[tournamentId];
      return { ok: true, won, playerBest, rivalBest, prize };
    },

    collectionLog() {
      return FISH_SPECIES.map((sp) => ({ ...sp, caught: state.collection[sp.id] || 0 }));
    },

    missions() {
      return ANGLING_MISSIONS.map((m) => ({ ...m, done: !!state.missionsDone[m.id] }));
    },

    tick(dt) {
      const day = getDay();
      if (day !== state.day) {
        state.day = day;
        state.castsToday = 0;
        for (const id of Object.keys(state.tournamentsEntered)) {
          if (state.tournamentsEntered[id] !== day) delete state.tournamentsEntered[id];
        }
      }
      if (state.casting && !state.fight) {
        state.biteTimer -= dt || 0;
        if (state.biteTimer <= 0) {
          state.casting = false;
          const species = rollSpecies();
          const hour = getHour();
          if (species.id === 'golden-koi' && hour !== 12) {
            state.biteActive = false;
            return;
          }
          if (species.id === 'kraken-calf' && hour !== 0) {
            state.biteActive = false;
            return;
          }
          if (species.id === 'ghost-eel' && !(hour >= 1 && hour <= 3)) {
            state.biteActive = false;
            return;
          }
          state.biteActive = true;
          startFight(species);
        }
      } else if (state.biteActive && state.fight) {
        if (state.fight.biteWait === undefined) state.fight.biteWait = 6;
        state.fight.biteWait -= dt || 0;
        if (state.fight.biteWait <= 0) {
          state.fight = null;
          state.biteActive = false;
          log('The fish stole the bait');
        }
      }
    },

    hudLine() {
      if (state.totalCaught === 0 && state.cooler.length === 0) return '';
      const rank = rankById(state.rank);
      const spot = state.currentSpot ? spotById(state.currentSpot).name : '-';
      let line = `Angling ${rank.name} | ${spot} | cooler ${state.cooler.length} fish`;
      if (state.fight) line += ` | fighting ${state.fight.name} ${Math.round(state.fight.progress)}%`;
      else if (state.casting) line += ' | waiting for a bite';
      return line;
    },

    summary() {
      return {
        xp: state.xp,
        rank: state.rank,
        totalCaught: state.totalCaught,
        totalSold: state.totalSold,
        totalEarned: state.totalEarned,
        cooler: state.cooler.length,
        biggestCatch: state.biggestCatch,
        missionsDone: Object.keys(state.missionsDone).length,
      };
    },

    serialize() {
      return {
        xp: state.xp,
        rank: state.rank,
        rodId: state.rodId,
        rodsOwned: [...state.rodsOwned],
        baitStock: { ...state.baitStock },
        cooler: state.cooler.map((f) => ({ ...f })),
        collection: { ...state.collection },
        biggestCatch: state.biggestCatch ? { ...state.biggestCatch } : null,
        totalCaught: state.totalCaught,
        totalSold: state.totalSold,
        totalEarned: state.totalEarned,
        trophies: state.trophies ? state.trophies.map((t) => ({ ...t })) : [],
        missionsDone: { ...state.missionsDone },
        lineSnaps: state.lineSnaps,
        perfectFights: state.perfectFights,
      };
    },

    deserialize(saved) {
      if (!saved || typeof saved !== 'object') return;
      if (typeof saved.xp === 'number') state.xp = saved.xp;
      if (typeof saved.rank === 'string') state.rank = saved.rank;
      if (typeof saved.rodId === 'string') state.rodId = saved.rodId;
      if (Array.isArray(saved.rodsOwned)) state.rodsOwned = [...saved.rodsOwned];
      if (saved.baitStock && typeof saved.baitStock === 'object') state.baitStock = { ...saved.baitStock };
      if (Array.isArray(saved.cooler)) state.cooler = saved.cooler.map((f) => ({ ...f }));
      if (saved.collection && typeof saved.collection === 'object') state.collection = { ...saved.collection };
      if (saved.biggestCatch && typeof saved.biggestCatch === 'object') state.biggestCatch = { ...saved.biggestCatch };
      if (Array.isArray(saved.trophies)) state.trophies = saved.trophies.map((t) => ({ ...t }));
      if (saved.missionsDone && typeof saved.missionsDone === 'object') state.missionsDone = { ...saved.missionsDone };
      const numeric = ['totalCaught', 'totalSold', 'totalEarned', 'lineSnaps', 'perfectFights'];
      for (const key of numeric) {
        if (typeof saved[key] === 'number') state[key] = saved[key];
      }
    },
  };

  return system;
}
