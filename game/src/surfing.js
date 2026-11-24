export const SURF_BEACHES = [
  { id: 'sandy-bay', name: 'Sandy Bay', minWave: 2, maxWave: 5, crowd: 6, danger: 1, fee: 0, desc: 'A friendly beginner beach' },
  { id: 'point-break', name: 'Point Break', minWave: 3, maxWave: 7, crowd: 4, danger: 2, fee: 5, desc: 'A long right-hand point' },
  { id: 'reef-pass', name: 'Reef Pass', minWave: 4, maxWave: 9, crowd: 3, danger: 3, fee: 10, desc: 'Fast waves over the reef' },
  { id: 'big-swell', name: 'Big Swell', minWave: 6, maxWave: 12, crowd: 2, danger: 4, fee: 20, desc: 'Huge waves for experts' },
  { id: 'cove', name: 'Hidden Cove', minWave: 2, maxWave: 4, crowd: 1, danger: 1, fee: 0, desc: 'Quiet and sheltered' },
  { id: 'pier-side', name: 'Pier Side', minWave: 3, maxWave: 6, crowd: 7, danger: 2, fee: 0, desc: 'Crowded but consistent' },
  { id: 'north-shore', name: 'North Shore', minWave: 5, maxWave: 10, crowd: 3, danger: 4, fee: 15, desc: 'Powerful winter swell' },
  { id: 'lagoon', name: 'Lagoon', minWave: 1, maxWave: 3, crowd: 2, danger: 0, fee: 0, desc: 'Tiny waves, perfect for learning' },
  { id: 'rock-pool', name: 'Rock Pool', minWave: 2, maxWave: 5, crowd: 2, danger: 3, fee: 0, desc: 'Rocks at low tide' },
  { id: 'sunset-beach', name: 'Sunset Beach', minWave: 3, maxWave: 8, crowd: 5, danger: 2, fee: 5, desc: 'Golden hour waves' },
  { id: 'storm-point', name: 'Storm Point', minWave: 6, maxWave: 14, crowd: 1, danger: 5, fee: 25, desc: 'The heaviest break in the city' },
  { id: 'family-shore', name: 'Family Shore', minWave: 1, maxWave: 3, crowd: 8, danger: 0, fee: 0, desc: 'Kids and longboards' },
];

export const SURFBOARDS = [
  { id: 'foam', name: 'Foam Board', price: 0, length: 8, stability: 9, speed: 0.6, trick: 0.1, desc: 'Big, soft and forgiving' },
  { id: 'funboard', name: 'Funboard', price: 150, length: 7.5, stability: 8, speed: 0.7, trick: 0.2, desc: 'Easy to ride, easy to love' },
  { id: 'fish', name: 'Fish', price: 300, length: 6, stability: 7, speed: 0.8, trick: 0.3, desc: 'Fast in small waves' },
  { id: 'shortboard', name: 'Shortboard', price: 450, length: 6.2, stability: 5, speed: 0.9, trick: 0.6, desc: 'The performance standard' },
  { id: 'pro-short', name: 'Pro Shortboard', price: 700, length: 6, stability: 4, speed: 1.0, trick: 0.8, desc: 'Tour level' },
  { id: 'gun', name: 'Gun', price: 800, length: 7.5, stability: 6, speed: 1.0, trick: 0.2, desc: 'For the biggest waves' },
  { id: 'longboard', name: 'Longboard', price: 400, length: 9, stability: 9, speed: 0.7, trick: 0.3, desc: 'Classic nose riding' },
  { id: 'hybrid', name: 'Hybrid', price: 500, length: 6.8, stability: 6, speed: 0.85, trick: 0.5, desc: 'Best of both worlds' },
  { id: 'softtop', name: 'Softtop', price: 200, length: 7, stability: 8, speed: 0.65, trick: 0.15, desc: 'Soft deck, hard fun' },
  { id: 'twin-fin', name: 'Twin Fin', price: 550, length: 5.8, stability: 5, speed: 0.95, trick: 0.7, desc: 'Loose and fast' },
];

export const SURF_TRICKS = [
  { id: 'bottom-turn', name: 'Bottom Turn', difficulty: 1, base: 50, balance: 5, desc: 'The foundation of every ride' },
  { id: 'cutback', name: 'Cutback', difficulty: 2, base: 80, balance: 8, desc: 'Turn back into the pocket' },
  { id: 'snap', name: 'Snap', difficulty: 3, base: 120, balance: 12, desc: 'A sharp turn at the lip' },
  { id: 'floater', name: 'Floater', difficulty: 3, base: 140, balance: 10, desc: 'Ride over the whitewater' },
  { id: 'tube', name: 'Tube Ride', difficulty: 5, base: 300, balance: 20, desc: 'Inside the barrel' },
  { id: 'barrel-roll', name: 'Barrel Roll', difficulty: 6, base: 350, balance: 25, desc: 'A full roll inside the tube' },
  { id: 'aerial', name: 'Aerial', difficulty: 6, base: 400, balance: 25, desc: 'Launch off the lip' },
  { id: 'air-reverse', name: 'Air Reverse', difficulty: 8, base: 500, balance: 30, desc: 'Spin in the air and land backwards' },
  { id: 'carve', name: 'Carve', difficulty: 2, base: 90, balance: 8, desc: 'A long smooth turn' },
  { id: 'pump', name: 'Pump', difficulty: 1, base: 40, balance: 3, desc: 'Gain speed down the line' },
  { id: 'stall', name: 'Stall', difficulty: 2, base: 70, balance: 10, desc: 'Slow down to sit in the pocket' },
  { id: 're-entry', name: 'Re-entry', difficulty: 4, base: 180, balance: 15, desc: 'Climb back up the face' },
  { id: 'roundhouse', name: 'Roundhouse Cutback', difficulty: 4, base: 200, balance: 15, desc: 'A full circle cutback' },
  { id: 'nose-ride', name: 'Nose Ride', difficulty: 5, base: 250, balance: 20, desc: 'Hang ten on the nose' },
  { id: 'hang-ten', name: 'Hang Ten', difficulty: 6, base: 300, balance: 22, desc: 'Ten toes over the nose' },
  { id: '360', name: '360 Spin', difficulty: 7, base: 450, balance: 28, desc: 'A full spin on the wave' },
  { id: 'kickflip', name: 'Kickflip', difficulty: 9, base: 600, balance: 35, desc: 'Flip the board under your feet' },
  { id: 'superman', name: 'Superman', difficulty: 8, base: 550, balance: 32, desc: 'Fly flat above the board' },
  { id: 'layback', name: 'Layback Snap', difficulty: 5, base: 280, balance: 20, desc: 'Lean back and snap' },
  { id: 'alley-oop', name: 'Alley Oop', difficulty: 7, base: 480, balance: 30, desc: 'An aerial the other way' },
];

export const WETSUITS = [
  { id: 'trunks', name: 'Boardshorts', price: 0, warmth: 1, flex: 10, desc: 'Warm water only' },
  { id: 'spring', name: 'Spring Suit', price: 80, warmth: 3, flex: 9, desc: 'Short arms, short legs' },
  { id: 'full-3mm', name: 'Full 3mm Suit', price: 150, warmth: 5, flex: 8, desc: 'The everyday suit' },
  { id: 'full-5mm', name: 'Full 5mm Suit', price: 250, warmth: 8, flex: 6, desc: 'For cold winter swells' },
  { id: 'hooded', name: 'Hooded 6mm Suit', price: 350, warmth: 10, flex: 5, desc: 'Ice water armour' },
];

export const SURF_COMPS = [
  { id: 'bay-open', name: 'Bay Open', beachId: 'sandy-bay', entry: 20, prize: 500, minRank: 'grom', desc: 'A friendly local contest' },
  { id: 'point-classic', name: 'Point Classic', beachId: 'point-break', entry: 50, prize: 1500, minRank: 'intermediate', desc: 'The classic point contest' },
  { id: 'reef-masters', name: 'Reef Masters', beachId: 'reef-pass', entry: 100, prize: 4000, minRank: 'advanced', desc: 'Fast waves, big scores' },
  { id: 'big-swell-pro', name: 'Big Swell Pro', beachId: 'big-swell', entry: 200, prize: 10000, minRank: 'pro', desc: 'Only the brave enter' },
  { id: 'sunset-showdown', name: 'Sunset Showdown', beachId: 'sunset-beach', entry: 80, prize: 2500, minRank: 'intermediate', desc: 'Golden hour glory' },
  { id: 'north-shore-cup', name: 'North Shore Cup', beachId: 'north-shore', entry: 150, prize: 6000, minRank: 'advanced', desc: 'Heavy water contest' },
  { id: 'cove-jam', name: 'Cove Jam', beachId: 'cove', entry: 10, prize: 200, minRank: 'grom', desc: 'A mellow jam session' },
  { id: 'storm-champs', name: 'Storm Championships', beachId: 'storm-point', entry: 300, prize: 20000, minRank: 'pro', desc: 'The heaviest contest of all' },
];

export const SURFER_RANKS = [
  { id: 'grom', name: 'Grom', xpNeeded: 0, perk: 'Beach access' },
  { id: 'intermediate', name: 'Intermediate', xpNeeded: 200, perk: 'Better balance' },
  { id: 'advanced', name: 'Advanced', xpNeeded: 600, perk: 'Bigger waves' },
  { id: 'pro', name: 'Pro', xpNeeded: 1500, perk: 'Sponsor deals' },
  { id: 'legend', name: 'Legend', xpNeeded: 3500, perk: 'Every break respects you' },
];

export const SPONSORS = [
  { id: 'local-shop', name: 'Local Surf Shop', monthly: 100, needWins: 1, needRank: 'intermediate', desc: 'Free wax and stickers' },
  { id: 'wax-co', name: 'Wax Co', monthly: 250, needWins: 3, needRank: 'intermediate', desc: 'A wax deal' },
  { id: 'board-brand', name: 'Board Brand', monthly: 500, needWins: 5, needRank: 'advanced', desc: 'Free boards every season' },
  { id: 'energy-drink', name: 'Energy Drink', monthly: 1000, needWins: 8, needRank: 'pro', desc: 'Big money, big logo' },
  { id: 'surf-legend', name: 'Surf Legend Co', monthly: 2500, needWins: 15, needRank: 'legend', desc: 'The dream deal' },
];

export const SURF_MISSIONS = [
  { id: 'first-wave', name: 'First Wave', desc: 'Catch your first wave', reward: 50 },
  { id: 'ride-10', name: 'Ten Rides', desc: 'Ride 10 waves', reward: 150 },
  { id: 'tube-ride', name: 'Tube Rider', desc: 'Ride a tube', reward: 200 },
  { id: 'aerial-land', name: 'Air Time', desc: 'Land an aerial', reward: 300 },
  { id: 'perfect-10', name: 'Perfect Ten', desc: 'Score a perfect 10', reward: 500 },
  { id: 'comp-win', name: 'Comp Winner', desc: 'Win a competition', reward: 400 },
  { id: 'sponsor', name: 'Sponsored', desc: 'Sign a sponsor', reward: 300 },
  { id: 'wipeout-10', name: 'Wipeout King', desc: 'Wipe out 10 times', reward: 100 },
  { id: 'score-1000', name: 'Thousand Points', desc: 'Score 1000 total points', reward: 250 },
  { id: 'big-wave', name: 'Big Wave', desc: 'Ride a 10 foot wave', reward: 600 },
];

export const SWELL_FORECAST = [
  { day: 1, mult: 1.0, note: 'Average swell, clean conditions' },
  { day: 2, mult: 1.2, note: 'Building swell' },
  { day: 3, mult: 0.8, note: 'Small and slow' },
  { day: 4, mult: 1.5, note: 'Big swell incoming' },
  { day: 5, mult: 1.1, note: 'Fun sized waves' },
  { day: 6, mult: 0.9, note: 'Dropping swell' },
  { day: 7, mult: 1.3, note: 'Weekend swell peak' },
];

export const SURF_ETIQUETTE = [
  'Do not drop in on another surfer.',
  'The surfer closest to the peak has priority.',
  'Paddle wide around the break, not through it.',
  'Respect the locals.',
  'Do not ditch your board.',
  'Share the waves.',
  'Help a beginner, you were one once.',
];

export const SURF_SHOP = [
  { id: 'wax', name: 'Surf Wax', price: 5, desc: 'Grip for your board' },
  { id: 'leash', name: 'Leash', price: 30, desc: 'Keep your board close' },
  { id: 'fins', name: 'Fins Set', price: 60, desc: 'Fresh fins, fresh turns' },
  { id: 'board-bag', name: 'Board Bag', price: 80, desc: 'Protect your board' },
  { id: 'rashguard', name: 'Rashguard', price: 40, desc: 'Stop the rash' },
  { id: 'sunscreen', name: 'Sunscreen', price: 15, desc: 'The sun is brutal out there' },
  { id: 'repair-kit', name: 'Repair Kit', price: 25, desc: 'Fix dings on the spot' },
  { id: 'towel', name: 'Beach Towel', price: 20, desc: 'Dry off in style' },
];

export const BOARD_DAMAGE = [
  { level: 0, name: 'Pristine', repairCost: 0, perfMult: 1 },
  { level: 1, name: 'Scratched', repairCost: 20, perfMult: 0.95 },
  { level: 2, name: 'Dinged', repairCost: 50, perfMult: 0.9 },
  { level: 3, name: 'Cracked', repairCost: 100, perfMult: 0.8 },
  { level: 4, name: 'Broken', repairCost: 200, perfMult: 0.6 },
];

export const DAWN_PATROL = [
  { hour: 5, bonus: 1.2, note: 'Dawn glass, empty lineup' },
  { hour: 6, bonus: 1.15, note: 'Early morning gold' },
  { hour: 7, bonus: 1.05, note: 'Still quiet' },
];

export const SURF_LEGENDS = [
  { name: 'Duke Kahanamoku', note: 'The father of modern surfing' },
  { name: 'Kelly Slater', note: 'Eleven world titles' },
  { name: 'Laird Hamilton', note: 'The king of big waves' },
  { name: 'Bethany Hamilton', note: 'Came back stronger than ever' },
  { name: 'Gerry Lopez', note: 'Mr Pipeline' },
];

export const WAVE_QUALITY = [
  { min: 0, max: 2, label: 'Poor', desc: 'Mushy and weak' },
  { min: 2, max: 4, label: 'Fair', desc: 'Rideable but soft' },
  { min: 4, max: 6, label: 'Good', desc: 'Clean and fun' },
  { min: 6, max: 9, label: 'Great', desc: 'Pumping waves' },
  { min: 9, max: 20, label: 'Epic', desc: 'The day of days' },
];

export const COMP_SCORE_BANDS = [
  { min: 0, max: 3, label: 'Poor', note: 'A rough heat' },
  { min: 3, max: 5, label: 'Average', note: 'A solid heat' },
  { min: 5, max: 7, label: 'Good', note: 'A strong heat' },
  { min: 7, max: 9, label: 'Excellent', note: 'A great heat' },
  { min: 9, max: 10, label: 'Perfect', note: 'A flawless heat' },
];

export const SURF_SLANG = [
  'Stoked means excited about surfing.',
  'A kook is a beginner who does not know the rules.',
  'Gnarly means intense or impressive.',
  'Shredding means surfing really well.',
  'A wipeout is falling off the board.',
  'The lineup is where surfers wait for waves.',
  'Barrelled means riding inside the tube.',
  'Froth is the excitement before a surf.',
];

export const BEACH_CAFES = [
  { id: 'sunrise-cafe', name: 'Sunrise Cafe', price: 8, desc: 'Coffee and toast' },
  { id: 'wave-bar', name: 'Wave Bar', price: 12, desc: 'Smoothies and bowls' },
  { id: 'taco-shack', name: 'Taco Shack', price: 10, desc: 'Fish tacos, obviously' },
  { id: 'fish-chip', name: 'Fish and Chips', price: 14, desc: 'The post-surf classic' },
];

export const SURF_FILMS = [
  { title: 'The Endless Summer', year: 1966, note: 'The surf film that started it all' },
  { title: 'Point Break', year: 1991, note: 'Bank robbers who surf' },
  { title: 'Blue Crush', year: 2002, note: 'Pipeline dreams' },
  { title: 'Riding Giants', year: 2004, note: 'The history of big wave surfing' },
];

export const FORECAST_TIPS = [
  'A rising swell means bigger waves tomorrow.',
  'Offshore wind cleans up the faces.',
  'Onshore wind makes it messy.',
  'The best surf is usually at dawn.',
  'Check the tide, it changes everything.',
];

export const FAMOUS_SURFERS = [
  { name: 'Kelly Slater', note: 'Eleven world titles' },
  { name: 'Duke Kahanamoku', note: 'The father of modern surfing' },
  { name: 'Laird Hamilton', note: 'Big wave pioneer' },
  { name: 'Stephanie Gilmore', note: 'Eight world titles' },
];

export const SURF_HISTORY = [
  { year: 1778, event: 'Captain Cook sees surfing in Hawaii' },
  { year: 1907, event: 'Duke Kahanamoku brings surfing to the mainland' },
  { year: 1966, event: 'The Endless Summer is released' },
  { year: 1976, event: 'The first world tour begins' },
];

export const SURF_FILMS_2 = [
  { title: 'Chasing Mavericks', year: 2012, note: 'A young surfer chases the big wave' },
  { title: 'Soul Surfer', year: 2011, note: 'Bethany Hamilton\'s story' },
];

export const SURFER_NICKNAMES = ['The Shark', 'Wave Rider', 'Barrel King', 'Salt Dog', 'The Grom', 'Pipeline Pete'];

export const SURF_MOTTOS = [
  'The best surfer is the one having the most fun.',
  'You cannot stop the waves, but you can learn to surf.',
  'Life is better in the water.',
  'Salt water cures everything.',
];

export const SURF_PROVERBS = [
  'The ocean does not care about your plans.',
  'A wave ridden is a wave earned.',
  'Paddle hard, surf harder.',
  'The sea gives and the sea takes.',
];

export const FAMOUS_WAVES = [
  { wave: 'Pipeline', place: 'Hawaii', note: 'The most famous wave on earth' },
  { wave: 'Teahupoo', place: 'Tahiti', note: 'The heaviest wave in the world' },
  { wave: 'Bells Beach', place: 'Australia', note: 'Home of the Rip Curl Pro' },
];

function beachById(id) {
  return SURF_BEACHES.find((b) => b.id === id);
}

function boardById(id) {
  return SURFBOARDS.find((b) => b.id === id) || SURFBOARDS[0];
}

function trickById(id) {
  return SURF_TRICKS.find((t) => t.id === id);
}

function rankById(id) {
  return SURFER_RANKS.find((r) => r.id === id) || SURFER_RANKS[0];
}

function rankIndex(id) {
  const i = SURFER_RANKS.findIndex((r) => r.id === id);
  return i < 0 ? 0 : i;
}

export function waveHeight(beach, swellMult, weather) {
  const mid = (beach.minWave + beach.maxWave) / 2;
  let weatherMult = 1;
  if (weather === 'storm') weatherMult = 1.5;
  else if (weather === 'rain') weatherMult = 1.1;
  return Math.round(mid * (swellMult || 1) * weatherMult * 10) / 10;
}

export function trickScore(trick, waveFt, boardTrick, rankMult) {
  const waveBonus = 1 + (waveFt - 2) * 0.08;
  const points = trick.base * waveBonus * (1 + (boardTrick || 0)) * (rankMult || 1);
  return Math.round(points);
}

export function waveQualityLabel(ft) {
  return WAVE_QUALITY.find((q) => ft >= q.min && ft < q.max) || WAVE_QUALITY[WAVE_QUALITY.length - 1];
}

export function compBandLabel(score) {
  return COMP_SCORE_BANDS.find((b) => score >= b.min && score < b.max) || COMP_SCORE_BANDS[COMP_SCORE_BANDS.length - 1];
}

export function dawnBonusFor(hour) {
  const row = DAWN_PATROL.find((d) => d.hour === hour);
  return row ? row.bonus : 1;
}

export function boardPerfMult(damageLevel) {
  const row = BOARD_DAMAGE.find((d) => d.level === damageLevel);
  return row ? row.perfMult : 1;
}

export function repairCostFor(damageLevel) {
  const row = BOARD_DAMAGE.find((d) => d.level === damageLevel);
  return row ? row.repairCost : 0;
}

export function wipeoutDamage(beachDanger, rng) {
  const r = rng || Math.random;
  if (beachDanger >= 3 && r() < 0.3) return 1;
  return 0;
}

export function rideScore10(total) {
  return Math.max(1, Math.min(10, Math.round(total / 60)));
}

export function sponsorMonthly(sponsorId) {
  const s = SPONSORS.find((x) => x.id === sponsorId);
  return s ? s.monthly : 0;
}

export function nextSponsor(compWins, rankId) {
  const rankIdx = rankIndex(rankId);
  let best = null;
  for (const s of SPONSORS) {
    if (compWins >= s.needWins && rankIndex(s.needRank) <= rankIdx) best = s;
  }
  return best;
}

export function bestBeachToday(forecastList) {
  let best = null;
  let bestScore = -Infinity;
  for (const f of forecastList) {
    const score = f.wave * 2 - f.crowd - f.danger * 0.5;
    if (score > bestScore) { bestScore = score; best = f; }
  }
  return best;
}

export function sessionEnergyCost(waveFt) {
  return Math.round(10 + waveFt * 2);
}

export function trickComboBonus(tricks) {
  if (tricks.length >= 4) return 1.3;
  if (tricks.length === 3) return 1.2;
  if (tricks.length === 2) return 1.1;
  return 1;
}

export function cafePrice(cafeId) {
  const c = BEACH_CAFES.find((x) => x.id === cafeId);
  return c ? c.price : 0;
}

export function slangMeaningSurf(term) {
  const row = SURF_SLANG.find((s) => s.toLowerCase().startsWith(term.toLowerCase()));
  return row || 'No slang for that term.';
}

export function filmForYear(year) {
  return SURF_FILMS.find((f) => f.year === year) || null;
}

export function forecastNote(day) {
  const row = SWELL_FORECAST.find((f) => f.day === day);
  return row ? row.note : '';
}

export function bestForecastDay() {
  return SWELL_FORECAST.slice().sort((a, b) => b.mult - a.mult)[0];
}

export function waveHeightAt(beachId, day, weather) {
  const beach = beachById(beachId);
  if (!beach) return 0;
  const row = SWELL_FORECAST.find((f) => f.day === day) || SWELL_FORECAST[0];
  return waveHeight(beach, row.mult, weather);
}

export function surferForName(name) {
  return FAMOUS_SURFERS.find((s) => s.name === name) || null;
}

export function surfHistoryFor(year) {
  return SURF_HISTORY.find((h) => h.year === year) || null;
}

export function filmForYearSurf(year) {
  return SURF_FILMS_2.find((f) => f.year === year) || null;
}

export function randomSurferNickname(rng) {
  const r = rng || Math.random;
  return SURFER_NICKNAMES[Math.floor(r() * SURFER_NICKNAMES.length)];
}

export function surfMottoFor(index) {
  return SURF_MOTTOS[((index % SURF_MOTTOS.length) + SURF_MOTTOS.length) % SURF_MOTTOS.length];
}

export function proverbSurf(index) {
  return SURF_PROVERBS[((index % SURF_PROVERBS.length) + SURF_PROVERBS.length) % SURF_PROVERBS.length];
}

export function famousWaveFor(waveName) {
  return FAMOUS_WAVES.find((w) => w.wave === waveName) || null;
}

export function createSurfingSystem(deps = {}) {
  const rng = typeof deps.rng === 'function' ? deps.rng : Math.random;
  const getHour = typeof deps.getHour === 'function' ? deps.getHour : () => 12;
  const getDay = typeof deps.getDay === 'function' ? deps.getDay : () => 1;
  const getCash = typeof deps.getCash === 'function' ? deps.getCash : () => 0;
  const addCash = typeof deps.addCash === 'function' ? deps.addCash : () => {};
  const log = typeof deps.log === 'function' ? deps.log : () => {};
  const getPlayerPos = typeof deps.getPlayerPos === 'function' ? deps.getPlayerPos : () => ({ x: 0, z: 0 });
  const getWeather = typeof deps.getWeather === 'function' ? deps.getWeather : () => ({ condition: 'clear' });

  const state = {
    xp: 0,
    rank: 'grom',
    boardId: 'foam',
    boardsOwned: ['foam'],
    wetsuitId: 'trunks',
    wetsuitsOwned: ['trunks'],
    wax: 5,
    beachId: null,
    wave: null,
    ride: null,
    totalRides: 0,
    totalWaves: 0,
    totalScore: 0,
    bestRide: null,
    bestWave: 0,
    wipeouts: 0,
    tubes: 0,
    aerials: 0,
    perfectTens: 0,
    compWins: 0,
    compEntries: {},
    sponsorId: null,
    sponsorPaidDay: 0,
    totalEarned: 0,
    missionsDone: {},
    day: 1,
    sessionsToday: 0,
    tricksLanded: {},
    energy: 100,
  };

  function weatherWord() {
    const w = getWeather();
    return w && w.condition ? w.condition : 'clear';
  }

  function swellToday() {
    const day = getDay();
    const row = SWELL_FORECAST.find((f) => f.day === ((day - 1) % 7) + 1) || SWELL_FORECAST[0];
    return row.mult;
  }

  function rankMult() {
    return 1 + rankIndex(state.rank) * 0.1;
  }

  function refreshRank() {
    let current = SURFER_RANKS[0];
    for (const r of SURFER_RANKS) {
      if (state.xp >= r.xpNeeded) current = r;
    }
    state.rank = current.id;
  }

  function gainXp(amount) {
    state.xp += amount;
    refreshRank();
  }

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const mission = SURF_MISSIONS.find((m) => m.id === id);
    if (!mission) return;
    let done = false;
    if (id === 'first-wave') done = state.totalRides >= 1;
    else if (id === 'ride-10') done = state.totalRides >= 10;
    else if (id === 'tube-ride') done = state.tubes >= 1;
    else if (id === 'aerial-land') done = state.aerials >= 1;
    else if (id === 'perfect-10') done = state.perfectTens >= 1;
    else if (id === 'comp-win') done = state.compWins >= 1;
    else if (id === 'sponsor') done = state.sponsorId !== null;
    else if (id === 'wipeout-10') done = state.wipeouts >= 10;
    else if (id === 'score-1000') done = state.totalScore >= 1000;
    else if (id === 'big-wave') done = state.bestRide !== null && state.bestRide.waveFt >= 10;
    if (!done) return;
    state.missionsDone[id] = true;
    addCash(mission.reward);
    log(`Mission complete: ${mission.name}`);
  }

  function doWipeout(cause) {
    const ride = state.ride;
    const kept = ride ? ride.score : 0;
    state.wipeouts += 1;
    state.energy = Math.max(0, state.energy - 15);
    const beach = state.beachId ? beachById(state.beachId) : null;
    if (beach && beach.danger >= 3 && rng() < 0.3) state.energy = Math.max(0, state.energy - 20);
    if (ride) state.totalScore += ride.score;
    state.ride = null;
    state.wave = null;
    checkMission('wipeout-10');
    log(`Wipeout! ${cause}`);
    return { ok: true, event: 'wipeout', cause, score: kept };
  }

  function settleComp() {
    const comp = state.activeComp;
    if (!comp) return { ok: false, error: 'no active competition' };
    const rivalBest = Math.round((rng() * 8 + 2) * 10) / 10;
    const won = comp.best > rivalBest;
    let prize = 0;
    if (won) {
      prize = comp.prize;
      addCash(prize);
      state.totalEarned += prize;
      state.compWins += 1;
      if (!state.compWinsById) state.compWinsById = {};
      state.compWinsById[comp.id] = (state.compWinsById[comp.id] || 0) + 1;
      gainXp(100);
      checkMission('comp-win');
    }
    state.activeComp = null;
    log(won ? `Won ${comp.name}!` : `Lost ${comp.name}`);
    return { ok: true, won, score: comp.best, rivalBest, prize };
  }

  const system = {
    state,

    buyBoard(boardId) {
      const board = SURFBOARDS.find((b) => b.id === boardId);
      if (!board) return { ok: false, error: 'unknown board' };
      if (state.boardsOwned.includes(boardId)) {
        state.boardId = boardId;
        return { ok: true, equipped: boardId };
      }
      if (getCash() < board.price) return { ok: false, error: 'not enough cash' };
      addCash(-board.price);
      state.boardsOwned.push(boardId);
      state.boardId = boardId;
      log(`Bought board: ${board.name}`);
      return { ok: true, board };
    },

    buyWetsuit(wetsuitId) {
      const suit = WETSUITS.find((w) => w.id === wetsuitId);
      if (!suit) return { ok: false, error: 'unknown wetsuit' };
      if (state.wetsuitsOwned.includes(wetsuitId)) {
        state.wetsuitId = wetsuitId;
        return { ok: true, equipped: wetsuitId };
      }
      if (getCash() < suit.price) return { ok: false, error: 'not enough cash' };
      addCash(-suit.price);
      state.wetsuitsOwned.push(wetsuitId);
      state.wetsuitId = wetsuitId;
      log(`Bought wetsuit: ${suit.name}`);
      return { ok: true, wetsuit: suit };
    },

    buyWax(qty) {
      const quantity = Math.max(1, Math.min(20, qty || 1));
      const cost = 5 * quantity;
      if (getCash() < cost) return { ok: false, error: 'not enough cash' };
      addCash(-cost);
      state.wax += quantity;
      return { ok: true, wax: state.wax, cost };
    },

    forecast() {
      return SURF_BEACHES.map((b) => {
        const ft = waveHeight(b, swellToday(), weatherWord());
        const row = SWELL_FORECAST.find((f) => f.day === ((getDay() - 1) % 7) + 1) || SWELL_FORECAST[0];
        return { beach: b.name, beachId: b.id, wave: ft, crowd: b.crowd, danger: b.danger, note: row.note };
      });
    },

    goToBeach(beachId) {
      const beach = beachById(beachId);
      if (!beach) return { ok: false, error: 'unknown beach' };
      if (getCash() < beach.fee) return { ok: false, error: 'not enough cash' };
      if (beach.fee > 0) addCash(-beach.fee);
      state.beachId = beachId;
      state.wave = null;
      state.ride = null;
      const ft = waveHeight(beach, swellToday(), weatherWord());
      log(`Arrived at ${beach.name}`);
      return { ok: true, beach, wave: ft };
    },

    paddleOut() {
      if (!state.beachId) return { ok: false, error: 'no beach chosen' };
      if (state.ride) return { ok: false, error: 'already riding' };
      if (state.energy < 20) return { ok: false, error: 'too tired' };
      if (state.wax <= 0) return { ok: false, error: 'no wax left' };
      state.wax -= 1;
      state.energy -= 10;
      const beach = beachById(state.beachId);
      const isSet = rng() < 0.7;
      const ft = isSet
        ? waveHeight(beach, swellToday(), weatherWord())
        : Math.round(waveHeight(beach, swellToday(), weatherWord()) * 0.5 * 10) / 10;
      const quality = waveQualityLabel(ft).label;
      const length = Math.round(20 + ft * 5);
      state.wave = { ft, quality, length, section: 0 };
      state.totalWaves += 1;
      log(`Paddled out, ${ft}ft wave incoming`);
      return { ok: true, wave: { ...state.wave } };
    },

    catchWave() {
      if (!state.wave) return { ok: false, error: 'no wave waiting' };
      if (state.ride) return { ok: false, error: 'already riding' };
      const board = boardById(state.boardId);
      const risk = state.wave.ft / board.stability * 2 + 2;
      const threshold = Math.max(0, Math.min(0.5, risk - 0.4));
      if (rng() < threshold) {
        state.wipeouts += 1;
        state.wave = null;
        return { ok: true, caught: false, event: 'missed-takeoff' };
      }
      const ride = {
        waveFt: state.wave.ft,
        length: state.wave.length,
        progress: 0,
        balance: 100,
        score: 0,
        tricks: [],
        sections: state.wave.length,
        timeLeft: 10 + state.wave.ft * 2,
      };
      state.ride = ride;
      state.totalRides += 1;
      state.sessionsToday += 1;
      log('Caught the wave!');
      checkMission('first-wave');
      return { ok: true, caught: true, ride: { ...ride } };
    },

    rideTick(dt, input) {
      const ride = state.ride;
      if (!ride) return { ok: false, error: 'not riding' };
      const act = (input && input.action) || 'pump';
      const board = boardById(state.boardId);
      ride.progress += (dt || 0) * 2;
      ride.timeLeft -= dt || 0;
      const drain = 1.5 + ride.waveFt * 0.4 - board.stability * 0.3;
      ride.balance -= drain * (dt || 0);
      if (act === 'carve') ride.balance += 3 * (dt || 0);
      else if (act === 'pump') ride.balance += 1 * (dt || 0);
      ride.balance = Math.max(0, Math.min(100, ride.balance));
      ride.sections -= (dt || 0) * 0.5;
      if (ride.balance <= 0 || ride.timeLeft <= 0 || ride.sections <= 0) {
        return doWipeout('lost balance');
      }
      return { ok: true, ride: { ...ride, balance: Math.round(ride.balance) } };
    },

    doTrick(trickId) {
      const ride = state.ride;
      if (!ride) return { ok: false, error: 'not riding' };
      const trick = trickById(trickId);
      if (!trick) return { ok: false, error: 'unknown trick' };
      const board = boardById(state.boardId);
      const skillTerm = rankIndex(state.rank) * 0.05;
      let chance = 0.9 - trick.difficulty * 0.09 + board.stability * 0.03 - -skillTerm;
      chance = Math.max(0.15, Math.min(0.97, chance));
      if (rng() >= chance) {
        ride.balance -= trick.balance;
        log(`Bailed on ${trick.name}`);
        if (ride.balance <= 0) return doWipeout('failed trick');
        return { ok: true, landed: false, trick: trick.name, balance: Math.round(ride.balance) };
      }
      const points = trickScore(trick, ride.waveFt, board.trick, rankMult());
      ride.score += points;
      ride.balance -= trick.balance / 2;
      ride.tricks.push({ id: trick.id, name: trick.name, points });
      state.tricksLanded[trick.id] = (state.tricksLanded[trick.id] || 0) + 1;
      if (trick.id === 'tube' || trick.id === 'barrel-roll') state.tubes += 1;
      if (trick.id === 'aerial' || trick.id === 'air-reverse' || trick.id === 'alley-oop') state.aerials += 1;
      log(`Landed ${trick.name} for ${points}`);
      checkMission('tube-ride');
      checkMission('aerial-land');
      if (ride.balance <= 0) return doWipeout('failed trick');
      return { ok: true, landed: true, trick: trick.name, points, score: ride.score, balance: Math.round(ride.balance) };
    },

    wipeout(cause) {
      if (!state.ride) return { ok: false, error: 'not riding' };
      return doWipeout(cause || 'wipeout');
    },

    endRide() {
      const ride = state.ride;
      if (!ride) return { ok: false, error: 'not riding' };
      const bonusRate = ride.tricks.length > 2 ? 0.15 : 0.1;
      const total = Math.round(ride.score * (1 + bonusRate));
      const rideScore = Math.round((total / 60) * 10) / 10;
      const score10 = Math.max(1, Math.min(10, Math.round(total / 60)));
      state.totalScore += total;
      if (!state.bestRide || total > state.bestRide.score) {
        state.bestRide = { ...ride, score: total, score10 };
      }
      if (score10 >= 10) state.perfectTens += 1;
      const xp = 10 + Math.floor(total / 10) + ride.tricks.length * 5;
      gainXp(xp);
      state.ride = null;
      state.wave = null;
      state.energy = Math.max(0, state.energy - 5);
      refreshRank();
      checkMission('perfect-10');
      checkMission('score-1000');
      checkMission('big-wave');
      log(`Ride finished: ${total} points`);
      return { ok: true, ride: { ...ride, score: total, score10 }, xp };
    },

    rest() {
      state.energy = 100;
      log('Rested, energy restored');
      return { ok: true, energy: 100 };
    },

    enterComp(compId) {
      const comp = SURF_COMPS.find((c) => c.id === compId);
      if (!comp) return { ok: false, error: 'unknown competition' };
      if (rankIndex(state.rank) < rankIndex(comp.minRank)) return { ok: false, error: 'rank too low' };
      if (state.compEntries[compId] === getDay()) return { ok: false, error: 'already entered today' };
      if (getCash() < comp.entry) return { ok: false, error: 'not enough cash' };
      addCash(-comp.entry);
      state.compEntries[compId] = getDay();
      state.activeComp = { id: comp.id, name: comp.name, prize: comp.prize, best: 0, rides: 0 };
      log(`Entered competition: ${comp.name}`);
      return { ok: true, comp };
    },

    compRideScore() {
      if (!state.activeComp) return { ok: false, error: 'not in a competition' };
      const board = boardById(state.boardId);
      const beach = state.beachId ? beachById(state.beachId) : SURF_BEACHES[0];
      const ft = waveHeight(beach, swellToday(), weatherWord());
      const base = 3 + board.speed * 3 + rankIndex(state.rank) * 0.5;
      const score = Math.round((base * (0.7 + rng() * 0.6) * dawnBonusFor(getHour())) * 10) / 10;
      const comp = state.activeComp;
      comp.rides += 1;
      if (score > comp.best) comp.best = score;
      state.totalScore += Math.round(score * 10);
      log(`Competition ride scored ${score}`);
      if (comp.rides >= 2) return settleComp();
      return { ok: true, score, rides: comp.rides };
    },

    signSponsor(sponsorId) {
      const sponsor = SPONSORS.find((s) => s.id === sponsorId);
      if (!sponsor) return { ok: false, error: 'unknown sponsor' };
      if (rankIndex(state.rank) < rankIndex(sponsor.needRank)) return { ok: false, error: 'rank too low' };
      if (state.compWins < sponsor.needWins) return { ok: false, error: 'not enough competition wins' };
      state.sponsorId = sponsorId;
      state.sponsorPaidDay = getDay();
      log(`Signed sponsor: ${sponsor.name}`);
      checkMission('sponsor');
      return { ok: true, sponsor };
    },

    collectSponsorPay() {
      if (!state.sponsorId) return { ok: false, error: 'no sponsor' };
      if (getDay() - state.sponsorPaidDay < 7) return { ok: false, error: 'too soon since last payment' };
      const sponsor = SPONSORS.find((s) => s.id === state.sponsorId);
      state.sponsorPaidDay = getDay();
      addCash(sponsor.monthly);
      state.totalEarned += sponsor.monthly;
      log(`Sponsor paid ${sponsor.monthly}`);
      return { ok: true, amount: sponsor.monthly };
    },

    missions() {
      return SURF_MISSIONS.map((m) => ({ ...m, done: !!state.missionsDone[m.id] }));
    },

    tick(dt) {
      const day = getDay();
      if (day !== state.day) {
        state.day = day;
        state.sessionsToday = 0;
        state.energy = Math.min(100, state.energy + 30);
      }
      if (!state.ride) {
        state.energy = Math.min(100, state.energy + 0.5 * (dt || 0));
      }
    },

    hudLine() {
      if (state.totalRides === 0 && !state.beachId) return '';
      const rank = rankById(state.rank);
      const beach = state.beachId ? beachById(state.beachId).name : '-';
      const best = state.bestRide ? state.bestRide.score : 0;
      let line = `Surf ${rank.name} | ${beach} | rides ${state.totalRides} | best ${best}`;
      if (state.ride) {
        line += ` | riding ${state.ride.waveFt}ft, ${state.ride.score} pts, ${Math.round(state.ride.balance)}% balance`;
      }
      return line;
    },

    summary() {
      return {
        xp: state.xp,
        rank: state.rank,
        totalRides: state.totalRides,
        totalWaves: state.totalWaves,
        totalScore: state.totalScore,
        bestRide: state.bestRide,
        wipeouts: state.wipeouts,
        compWins: state.compWins,
        sponsorId: state.sponsorId,
        missionsDone: Object.keys(state.missionsDone).length,
      };
    },

    serialize() {
      return {
        xp: state.xp,
        rank: state.rank,
        boardId: state.boardId,
        boardsOwned: [...state.boardsOwned],
        wetsuitId: state.wetsuitId,
        wetsuitsOwned: [...state.wetsuitsOwned],
        wax: state.wax,
        totalRides: state.totalRides,
        totalWaves: state.totalWaves,
        totalScore: state.totalScore,
        bestRide: state.bestRide ? { ...state.bestRide } : null,
        bestWave: state.bestWave,
        wipeouts: state.wipeouts,
        tubes: state.tubes,
        aerials: state.aerials,
        perfectTens: state.perfectTens,
        compWins: state.compWins,
        compWinsById: state.compWinsById ? { ...state.compWinsById } : {},
        sponsorId: state.sponsorId,
        totalEarned: state.totalEarned,
        missionsDone: { ...state.missionsDone },
        tricksLanded: { ...state.tricksLanded },
        energy: state.energy,
      };
    },

    deserialize(saved) {
      if (!saved || typeof saved !== 'object') return;
      if (typeof saved.xp === 'number') state.xp = saved.xp;
      if (typeof saved.rank === 'string') state.rank = saved.rank;
      if (typeof saved.boardId === 'string') state.boardId = saved.boardId;
      if (typeof saved.wetsuitId === 'string') state.wetsuitId = saved.wetsuitId;
      if (Array.isArray(saved.boardsOwned)) state.boardsOwned = [...saved.boardsOwned];
      if (Array.isArray(saved.wetsuitsOwned)) state.wetsuitsOwned = [...saved.wetsuitsOwned];
      const numeric = ['wax', 'totalRides', 'totalWaves', 'totalScore', 'bestWave', 'wipeouts', 'tubes', 'aerials', 'perfectTens', 'compWins', 'totalEarned', 'energy'];
      for (const key of numeric) {
        if (typeof saved[key] === 'number') state[key] = saved[key];
      }
      if (saved.bestRide && typeof saved.bestRide === 'object') state.bestRide = { ...saved.bestRide };
      if (typeof saved.sponsorId === 'string' || saved.sponsorId === null) state.sponsorId = saved.sponsorId;
      for (const key of ['compWinsById', 'missionsDone', 'tricksLanded']) {
        if (saved[key] && typeof saved[key] === 'object') state[key] = { ...saved[key] };
      }
    },
  };

  return system;
}
