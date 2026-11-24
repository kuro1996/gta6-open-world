export const CLUBS = [
  { id: 'driver', name: 'Driver', maxDist: 280, accuracy: 0.7, loft: 'low', desc: 'Maximum distance off the tee' },
  { id: 'wood3', name: '3 Wood', maxDist: 230, accuracy: 0.75, loft: 'low', desc: 'Long fairway shots' },
  { id: 'hybrid', name: 'Hybrid', maxDist: 200, accuracy: 0.8, loft: 'mid', desc: 'Easy long iron replacement' },
  { id: 'iron5', name: '5 Iron', maxDist: 180, accuracy: 0.82, loft: 'mid', desc: 'Solid mid iron' },
  { id: 'iron7', name: '7 Iron', maxDist: 160, accuracy: 0.85, loft: 'mid', desc: 'The most trusted club' },
  { id: 'iron9', name: '9 Iron', maxDist: 140, accuracy: 0.88, loft: 'high', desc: 'High and soft' },
  { id: 'wedge-p', name: 'Pitching Wedge', maxDist: 120, accuracy: 0.9, loft: 'high', desc: 'Approach wedge' },
  { id: 'wedge-s', name: 'Sand Wedge', maxDist: 90, accuracy: 0.9, loft: 'high', desc: 'Escapes the bunker' },
  { id: 'wedge-l', name: 'Lob Wedge', maxDist: 60, accuracy: 0.92, loft: 'very high', desc: 'Floats over trouble' },
  { id: 'putter', name: 'Putter', maxDist: 30, accuracy: 0.98, loft: 'flat', desc: 'For the green' },
  { id: 'iron3', name: '3 Iron', maxDist: 210, accuracy: 0.78, loft: 'low', desc: 'Low piercing shots' },
  { id: 'iron8', name: '8 Iron', maxDist: 150, accuracy: 0.86, loft: 'mid', desc: 'Between seven and nine' },
];

export const GOLF_BALLS = [
  { id: 'range', name: 'Range Ball', price: 0, distBonus: 0, spin: 0, desc: 'Beat up and free' },
  { id: 'distance', name: 'Distance Ball', price: 20, distBonus: 0.05, spin: 0.1, desc: 'Flies further' },
  { id: 'spin', name: 'Spin Ball', price: 25, distBonus: 0, spin: 0.5, desc: 'Stops on a dime' },
  { id: 'pro', name: 'Pro Ball', price: 40, distBonus: 0.08, spin: 0.4, desc: 'Tour quality' },
  { id: 'soft', name: 'Soft Ball', price: 30, distBonus: 0.02, spin: 0.6, desc: 'Soft feel around the green' },
];

function hole(par, dist, hazard, dogleg, green) {
  return { par, dist, hazard, dogleg, green };
}

export const COURSES = [
  {
    id: 'sunny-meadows', name: 'Sunny Meadows', fee: 20, difficulty: 1, desc: 'A friendly beginner course',
    holes: [
      hole(4, 320, 'none', 'straight', 'medium'), hole(3, 150, 'water', 'straight', 'fast'),
      hole(5, 480, 'none', 'left', 'slow'), hole(4, 350, 'bunker', 'right', 'medium'),
      hole(4, 300, 'none', 'straight', 'medium'), hole(3, 170, 'water', 'straight', 'fast'),
      hole(5, 500, 'bunker', 'left', 'slow'), hole(4, 340, 'trees', 'right', 'medium'),
      hole(4, 360, 'none', 'straight', 'medium'),
    ],
  },
  {
    id: 'ocean-cliffs', name: 'Ocean Cliffs', fee: 60, difficulty: 3, desc: 'Wind and cliffs above the sea',
    holes: [
      hole(4, 380, 'water', 'left', 'fast'), hole(3, 190, 'water', 'straight', 'fast'),
      hole(5, 520, 'none', 'right', 'medium'), hole(4, 400, 'bunker', 'left', 'medium'),
      hole(4, 360, 'trees', 'straight', 'slow'), hole(3, 160, 'water', 'straight', 'fast'),
      hole(5, 540, 'water', 'left', 'medium'), hole(4, 390, 'bunker', 'right', 'fast'),
      hole(4, 370, 'none', 'straight', 'medium'),
    ],
  },
  {
    id: 'pine-valley', name: 'Pine Valley', fee: 100, difficulty: 4, desc: 'A championship test',
    holes: [
      hole(4, 420, 'trees', 'right', 'fast'), hole(5, 560, 'bunker', 'left', 'medium'),
      hole(3, 200, 'water', 'straight', 'fast'), hole(4, 410, 'none', 'straight', 'medium'),
      hole(4, 380, 'bunker', 'right', 'fast'), hole(5, 580, 'trees', 'left', 'slow'),
      hole(3, 180, 'water', 'straight', 'fast'), hole(4, 430, 'bunker', 'left', 'medium'),
      hole(4, 400, 'none', 'straight', 'fast'),
    ],
  },
  {
    id: 'desert-dunes', name: 'Desert Dunes', fee: 50, difficulty: 2, desc: 'Sand everywhere, wind always',
    holes: [
      hole(4, 340, 'bunker', 'straight', 'fast'), hole(3, 150, 'none', 'straight', 'fast'),
      hole(5, 500, 'bunker', 'right', 'medium'), hole(4, 360, 'bunker', 'left', 'medium'),
      hole(4, 330, 'none', 'straight', 'fast'), hole(3, 175, 'bunker', 'straight', 'fast'),
      hole(5, 510, 'bunker', 'left', 'slow'), hole(4, 350, 'bunker', 'right', 'medium'),
      hole(4, 370, 'none', 'straight', 'fast'),
    ],
  },
  {
    id: 'royale-links', name: 'Royale Links', fee: 150, difficulty: 5, desc: 'The hardest course in the city',
    holes: [
      hole(4, 440, 'water', 'left', 'fast'), hole(3, 210, 'water', 'straight', 'fast'),
      hole(5, 600, 'bunker', 'right', 'medium'), hole(4, 420, 'trees', 'left', 'fast'),
      hole(4, 400, 'water', 'straight', 'fast'), hole(5, 590, 'bunker', 'left', 'slow'),
      hole(3, 190, 'water', 'straight', 'fast'), hole(4, 450, 'bunker', 'right', 'fast'),
      hole(4, 430, 'trees', 'straight', 'medium'),
    ],
  },
];

export const GOLF_OPPONENTS = [
  { id: 'tommy', name: 'Tommy Slice', skill: 2, bet: 50, taunt: 'I never miss a putt. Well, almost never.', desc: 'A friendly hacker' },
  { id: 'sandra', name: 'Sandra Fairway', skill: 3, bet: 100, taunt: 'Keep up, kid.', desc: 'Steady and accurate' },
  { id: 'rex', name: 'Rex Longdrive', skill: 4, bet: 200, taunt: 'Watch this ball fly.', desc: 'Huge off the tee' },
  { id: 'maria', name: 'Maria Chip', skill: 4, bet: 250, taunt: 'The short game is where I live.', desc: 'Deadly around the green' },
  { id: 'old-ben', name: 'Old Ben', skill: 5, bet: 300, taunt: 'I have forgotten more golf than you know.', desc: 'A wily veteran' },
  { id: 'pro-pete', name: 'Pro Pete', skill: 6, bet: 500, taunt: 'You are playing a pro now.', desc: 'A former tour player' },
  { id: 'lucky-lucy', name: 'Lucky Lucy', skill: 3, bet: 150, taunt: 'Luck is a skill, darling.', desc: 'Unbelievably lucky' },
  { id: 'silent-sam', name: 'Silent Sam', skill: 5, bet: 400, taunt: '...', desc: 'Says nothing, shoots low' },
];

export const GOLF_BETS = [
  { id: 'match', name: 'Match Play', desc: 'Lowest total wins', mult: 2 },
  { id: 'skins', name: 'Skins', desc: 'Win a hole, win the skin', mult: 1 },
  { id: 'nassau', name: 'Nassau', desc: 'Front, back and overall', mult: 3 },
  { id: 'closest', name: 'Closest to the Pin', desc: 'Best par three shot wins', mult: 1 },
  { id: 'longest', name: 'Longest Drive', desc: 'Longest drive wins', mult: 1 },
];

export const GOLF_RANKS = [
  { id: 'hacker', name: 'Hacker', handicapMax: 36, perk: 'Just having fun' },
  { id: 'bogey', name: 'Bogey Golfer', handicapMax: 24, perk: 'Breaking 100' },
  { id: 'regular', name: 'Regular', handicapMax: 18, perk: 'Breaking 90' },
  { id: 'single', name: 'Single Digit', handicapMax: 9, perk: 'Breaking 80' },
  { id: 'scratch', name: 'Scratch', handicapMax: 0, perk: 'Par is the target' },
  { id: 'pro', name: 'Pro', handicapMax: -5, perk: 'Under par is normal' },
];

export const GOLF_TOURNAMENTS = [
  { id: 'sunday-open', name: 'Sunday Open', dayOfWeek: 0, entry: 50, purse: 1000, courseId: 'sunny-meadows', desc: 'A relaxed weekly open' },
  { id: 'cliff-classic', name: 'Cliff Classic', dayOfWeek: 3, entry: 150, purse: 5000, courseId: 'ocean-cliffs', desc: 'Wind, cliffs and glory' },
  { id: 'valley-masters', name: 'Valley Masters', dayOfWeek: 5, entry: 300, purse: 15000, courseId: 'pine-valley', desc: 'The big one' },
  { id: 'royale-cup', name: 'Royale Cup', dayOfWeek: 6, entry: 500, purse: 30000, courseId: 'royale-links', desc: 'Only the best need apply' },
];

export const GOLF_MISSIONS = [
  { id: 'first-round', name: 'First Round', desc: 'Finish your first round', reward: 50 },
  { id: 'birdie', name: 'Birdie Time', desc: 'Make a birdie', reward: 100 },
  { id: 'eagle', name: 'Eagle Eye', desc: 'Make an eagle', reward: 300 },
  { id: 'hole-in-one', name: 'Ace!', desc: 'Make a hole in one', reward: 1000 },
  { id: 'break-90', name: 'Break 90', desc: 'Shoot under 90', reward: 200 },
  { id: 'break-80', name: 'Break 80', desc: 'Shoot under 80', reward: 400 },
  { id: 'match-win', name: 'Match Winner', desc: 'Win a match', reward: 150 },
  { id: 'tournament-win', name: 'Tournament Winner', desc: 'Win a tournament', reward: 500 },
  { id: 'skins-5', name: 'Skin Collector', desc: 'Win 5 skins', reward: 200 },
  { id: 'beat-pro', name: 'Beat the Pro', desc: 'Beat Pro Pete', reward: 600 },
];

export const CADDY_TIPS = [
  'Keep your head down through the swing.',
  'The wind is coming off the sea, aim left.',
  'Take one more club, the air is heavy today.',
  'This green breaks toward the water.',
  'Trust the yardage, not your eyes.',
  'A smooth swing beats a hard swing.',
  'Read the grain before you putt.',
  'When in doubt, lay up.',
];

export const GOLF_WEATHER = [
  { weather: 'clear', distMult: 1, wind: 5, note: 'Perfect golf weather' },
  { weather: 'cloudy', distMult: 0.98, wind: 8, note: 'Grey and calm' },
  { weather: 'rain', distMult: 0.95, wind: 12, note: 'Wet fairways, soft greens' },
  { weather: 'storm', distMult: 0.9, wind: 20, note: 'Hold on to your hat' },
  { weather: 'fog', distMult: 0.97, wind: 3, note: 'Hard to see the flag' },
];

export const SCORE_NAMES = {
  '-3': 'Albatross',
  '-2': 'Eagle',
  '-1': 'Birdie',
  '0': 'Par',
  '1': 'Bogey',
  '2': 'Double Bogey',
  '3': 'Triple Bogey',
};

export const GOLF_QUOTES = [
  'Golf is a good walk spoiled.',
  'The most important shot is the next one.',
  'Drive for show, putt for dough.',
  'Golf is the closest game to the game we call life.',
  'A bad day on the course beats a good day in the office.',
  'The harder I practise, the luckier I get.',
];

export const RANGE_DRILLS = [
  { id: 'chip-10', name: 'Chip Ten', dist: 10, xp: 5, desc: 'Chip ten balls close' },
  { id: 'putt-5', name: 'Putt Five', dist: 5, xp: 5, desc: 'Sink five short putts' },
  { id: 'drive-200', name: 'Drive 200', dist: 200, xp: 10, desc: 'Drive past 200 yards' },
  { id: 'iron-150', name: 'Iron 150', dist: 150, xp: 10, desc: 'Hit the 150 target' },
  { id: 'bunker-3', name: 'Bunker Three', dist: 20, xp: 8, desc: 'Escape the bunker three times' },
  { id: 'putt-20', name: 'Putt Twenty', dist: 20, xp: 12, desc: 'Sink a twenty footer' },
  { id: 'draw-shot', name: 'Draw Shot', dist: 180, xp: 15, desc: 'Shape a draw' },
  { id: 'fade-shot', name: 'Fade Shot', dist: 180, xp: 15, desc: 'Shape a fade' },
];

export const CLUB_FITTING = [
  { id: 'grip', name: 'New Grips', price: 50, distBonus: 0, accBonus: 0.02, desc: 'Better grip, better control' },
  { id: 'shaft', name: 'Stiff Shafts', price: 200, distBonus: 0.03, accBonus: 0.02, desc: 'More control at speed' },
  { id: 'lie', name: 'Lie Adjustment', price: 80, distBonus: 0, accBonus: 0.03, desc: 'Clubs fitted to your stance' },
  { id: 'loft', name: 'Loft Tuning', price: 100, distBonus: 0.02, accBonus: 0.01, desc: 'Dial in your distances' },
  { id: 'length', name: 'Length Fitting', price: 120, distBonus: 0.01, accBonus: 0.03, desc: 'Shafts cut to your height' },
  { id: 'full-fit', name: 'Full Fitting', price: 500, distBonus: 0.05, accBonus: 0.05, desc: 'The works, every club dialled' },
];

export const COURSE_RECORDS = [
  { course: 'sunny-meadows', record: 68, holder: 'Old Ben', note: 'Set in 2019' },
  { course: 'ocean-cliffs', record: 70, holder: 'Pro Pete', note: 'Windy day record' },
  { course: 'pine-valley', record: 69, holder: 'Maria Chip', note: 'A flawless round' },
  { course: 'desert-dunes', record: 71, holder: 'Rex Longdrive', note: 'Drove every green' },
  { course: 'royale-links', record: 72, holder: 'Silent Sam', note: 'Nobody has beaten it' },
];

export const GOLF_LORE = [
  'The Royale Links was built on an old smugglers cove.',
  'Old Ben once holed out from the car park.',
  'The eighteenth at Pine Valley has never been birdied in a tournament.',
  'A ball lost in the ocean cliffs is gone forever.',
  'Sunny Meadows hosts a dawn game every single day of the year.',
];

export const GREEN_READS = [
  { slope: 'flat', read: 'Straight putt, trust the line' },
  { slope: 'left', read: 'Breaks left, aim right of the hole' },
  { slope: 'right', read: 'Breaks right, aim left of the hole' },
];

export const CADDY_LEVELS = [
  { level: 1, name: 'Rookie Caddy', desc: 'Carries the bag' },
  { level: 2, name: 'Club Caddy', desc: 'Reads the wind' },
  { level: 3, name: 'Pro Caddy', desc: 'Reads the greens' },
  { level: 4, name: 'Master Caddy', desc: 'Reads your mind' },
  { level: 5, name: 'Legend Caddy', desc: 'Knows the course by heart' },
];

export const PRO_SHOP = [
  { id: 'glove', name: 'Leather Glove', price: 15, desc: 'Grip in any weather' },
  { id: 'hat', name: 'Golf Hat', price: 25, desc: 'Keep the sun off' },
  { id: 'shoes', name: 'Golf Shoes', price: 80, desc: 'Spikes for soft ground' },
  { id: 'bag', name: 'Stand Bag', price: 120, desc: 'Light and sturdy' },
  { id: 'towel', name: 'Club Towel', price: 10, desc: 'Clean grooves, clean shots' },
  { id: 'balls-12', name: 'Dozen Pro Balls', price: 40, desc: 'A dozen tour balls' },
  { id: 'rangefinder', name: 'Rangefinder', price: 200, desc: 'Exact yardages' },
  { id: 'umbrella', name: 'Golf Umbrella', price: 30, desc: 'For the rainy days' },
];

export const FAMOUS_HOLES = [
  { course: 'sunny-meadows', hole: 2, name: 'The Pond', note: 'A short par three over water' },
  { course: 'ocean-cliffs', hole: 2, name: 'The Cliff Edge', note: 'One hundred and ninety yards over the sea' },
  { course: 'pine-valley', hole: 7, name: 'The Island', note: 'A green surrounded by water' },
  { course: 'desert-dunes', hole: 4, name: 'The Dune', note: 'Blind tee shot over a dune' },
  { course: 'royale-links', hole: 9, name: 'The Gauntlet', note: 'The hardest finishing hole in the city' },
];

export const GOLF_SLANG = [
  'A duff is a terrible shot.',
  'A shank goes sideways off the hosel.',
  'A chunk is a fat shot that goes nowhere.',
  'A thin shot is hit low and hot.',
  'A Mulligan is a free redo.',
  'The yips are the putting shakes.',
  'A gimme is a putt so short it is conceded.',
];

export const CLUBHOUSE_MENU = [
  { item: 'Club Sandwich', price: 12, desc: 'The classic' },
  { item: 'Fish and Chips', price: 14, desc: 'Friday favourite' },
  { item: 'Caesar Salad', price: 10, desc: 'Light and fresh' },
  { item: 'Steak Dinner', price: 28, desc: 'For the winners' },
];

export const FAMOUS_GOLFERS = [
  { name: 'Tiger Woods', note: 'Fifteen majors and counting' },
  { name: 'Jack Nicklaus', note: 'The Golden Bear, eighteen majors' },
  { name: 'Arnold Palmer', note: 'The King who made golf popular' },
  { name: 'Annika Sorenstam', note: 'Ten majors, a legend of the game' },
];

export const GOLF_RULES = [
  'Play the ball as it lies.',
  'Count every stroke, including penalties.',
  'Repair your divots and ball marks.',
  'Let faster groups play through.',
  'A lost ball costs stroke and distance.',
];

export const GOLF_FILMS = [
  { title: 'Caddyshack', year: 1980, note: 'The funniest golf film ever' },
  { title: 'Tin Cup', year: 1996, note: 'A range pro chases the US Open' },
  { title: 'Happy Gilmore', year: 1996, note: 'A hockey player takes up golf' },
];

export const GOLFER_NICKNAMES = ['The Shark', 'Lefty', 'The King', 'The Golden Bear', 'Boom Boom', 'The Big Easy'];

export const GOLF_MOTTOS = [
  'Drive for show, putt for dough.',
  'The course always wins in the end.',
  'Every round is a new story.',
  'Play the course, not the opponent.',
];

export const GOLF_PROVERBS = [
  'Golf is a game of inches.',
  'The ball does not lie, the golfer does.',
  'A smooth sea never made a skilled golfer.',
  'Patience wins more rounds than power.',
];

export const FAMOUS_ROUNDS = [
  { round: 'The 59', player: 'Al Geiberger', year: 1977, note: 'The first 59 on tour' },
  { round: 'The Duel at Troon', player: 'Henrik Stenson', year: 2016, note: 'A legendary Open battle' },
  { round: 'The Tiger Slam', player: 'Tiger Woods', year: 2001, note: 'Four majors in a row' },
];

function courseById(id) {
  return COURSES.find((c) => c.id === id);
}

function clubById(id) {
  return CLUBS.find((c) => c.id === id);
}

function ballById(id) {
  return GOLF_BALLS.find((b) => b.id === id) || GOLF_BALLS[0];
}

function opponentById(id) {
  return GOLF_OPPONENTS.find((o) => o.id === id);
}

function weatherRow(word) {
  return GOLF_WEATHER.find((w) => w.weather === word) || GOLF_WEATHER[0];
}

export function coursePar(course) {
  return course.holes.reduce((s, h) => s + h.par, 0);
}

export function scoreName(diff) {
  if (diff <= -3) return 'Albatross';
  const name = SCORE_NAMES[String(diff)];
  if (name) return name;
  return diff > 0 ? `+${diff}` : `${diff}`;
}

export function opponentHoleScore(rng, par, skill) {
  const r = rng || Math.random;
  const noise = (r() - 0.5) * 2;
  const score = Math.round(par + 3 - skill * 0.4 + noise);
  return Math.max(1, score);
}

export function drillResult(drill, power, accuracy, rng) {
  const r = rng || Math.random;
  const err = Math.round(Math.abs(power - 0.7) * drill.dist * (1 - accuracy) + r() * 5);
  const hit = err <= 5;
  return { hit, xp: hit ? drill.xp : 0, error: err };
}

export function handicapFromRounds(rounds) {
  if (!rounds || rounds.length === 0) return 28;
  const diffs = rounds.map((r) => r.total - r.par);
  const avg = diffs.reduce((s, d) => s + d, 0) / diffs.length;
  return Math.max(-5, Math.min(36, Math.round(18 + avg)));
}

export function courseRecordFor(courseId) {
  return COURSE_RECORDS.find((r) => r.course === courseId) || null;
}

export function isCourseRecord(courseId, total) {
  const rec = courseRecordFor(courseId);
  return rec ? total < rec.record : false;
}

export function skinsPayout(skinsWon, perSkin = 50) {
  return skinsWon * perSkin;
}

export function nassauPayout(frontDiff, backDiff, overallDiff, bet) {
  let won = 0;
  if (frontDiff < 0) won += 1;
  if (backDiff < 0) won += 1;
  if (overallDiff < 0) won += 1;
  return bet * won;
}

export function puttMakeChance(distance, skill, green) {
  let base;
  if (distance <= 3) base = 0.95;
  else if (distance <= 6) base = 0.8;
  else if (distance <= 10) base = 0.6;
  else if (distance <= 20) base = 0.35;
  else base = 0.15;
  let chance = base * (0.8 + skill * 0.05);
  if (green === 'fast') chance *= 0.9;
  return Math.max(0.05, Math.min(0.99, chance));
}

export function driveDistance(club, power, ball, weather) {
  const w = weatherRow(weather);
  const dist = club.maxDist * power * (1 + (ball.distBonus || 0)) * w.distMult;
  return Math.round(dist);
}

export function opponentExpectedScore(par, skill) {
  return Math.round((par + 3 - skill * 0.4) * 9);
}

export function rankForHandicap(handicap) {
  let best = GOLF_RANKS[0];
  for (const r of GOLF_RANKS) {
    if (handicap <= r.handicapMax) best = r;
  }
  return best;
}

export function tournamentPurseFor(place, purse) {
  if (place === 1) return purse;
  if (place <= 3) return Math.floor(purse / 10);
  if (place <= 10) return Math.floor(purse * 0.02);
  return 0;
}

export function caddyAdviceForLevel(level, rng) {
  const r = rng || Math.random;
  const count = Math.min(CADDY_TIPS.length, level + 2);
  const tip = CADDY_TIPS[Math.floor(r() * count)];
  return tip;
}

export function greenReadFor(green) {
  const row = GREEN_READS.find((g) => g.slope === green);
  return row ? row.read : 'A straight putt, trust the line';
}

export function proShopPrice(itemId) {
  const item = PRO_SHOP.find((i) => i.id === itemId);
  return item ? item.price : 0;
}

export function famousHoleFor(courseId, holeNum) {
  return FAMOUS_HOLES.find((h) => h.course === courseId && h.hole === holeNum) || null;
}

export function clubhouseTotal(items) {
  let sum = 0;
  for (const name of items) {
    const row = CLUBHOUSE_MENU.find((m) => m.item === name);
    if (row) sum += row.price;
  }
  return sum;
}

export function slangMeaning(term) {
  const row = GOLF_SLANG.find((s) => s.toLowerCase().startsWith(term.toLowerCase()));
  return row || 'No slang for that term.';
}

export function golferForName(name) {
  return FAMOUS_GOLFERS.find((g) => g.name === name) || null;
}

export function golfRuleFor(index) {
  return GOLF_RULES[((index % GOLF_RULES.length) + GOLF_RULES.length) % GOLF_RULES.length];
}

export function filmForYearGolf(year) {
  return GOLF_FILMS.find((f) => f.year === year) || null;
}

export function randomGolferNickname(rng) {
  const r = rng || Math.random;
  return GOLFER_NICKNAMES[Math.floor(r() * GOLFER_NICKNAMES.length)];
}

export function golfMottoFor(index) {
  return GOLF_MOTTOS[((index % GOLF_MOTTOS.length) + GOLF_MOTTOS.length) % GOLF_MOTTOS.length];
}

export function proverbGolf(index) {
  return GOLF_PROVERBS[((index % GOLF_PROVERBS.length) + GOLF_PROVERBS.length) % GOLF_PROVERBS.length];
}

export function famousRoundFor(roundName) {
  return FAMOUS_ROUNDS.find((r) => r.round === roundName) || null;
}

export function createGolfSystem(deps = {}) {
  const rng = typeof deps.rng === 'function' ? deps.rng : Math.random;
  const getHour = typeof deps.getHour === 'function' ? deps.getHour : () => 12;
  const getDay = typeof deps.getDay === 'function' ? deps.getDay : () => 1;
  const getCash = typeof deps.getCash === 'function' ? deps.getCash : () => 0;
  const addCash = typeof deps.addCash === 'function' ? deps.addCash : () => {};
  const log = typeof deps.log === 'function' ? deps.log : () => {};
  const getPlayerPos = typeof deps.getPlayerPos === 'function' ? deps.getPlayerPos : () => ({ x: 0, z: 0 });
  const getWeather = typeof deps.getWeather === 'function' ? deps.getWeather : () => ({ condition: 'clear' });

  const state = {
    handicap: 28,
    rank: 'hacker',
    ballId: 'range',
    ballsOwned: ['range'],
    ballsLeft: 12,
    clubsOwned: CLUBS.map((c) => c.id),
    round: null,
    totalRounds: 0,
    totalStrokes: 0,
    totalHoles: 0,
    birdies: 0,
    eagles: 0,
    holeInOnes: 0,
    bestRound: null,
    skinsWon: 0,
    matchWins: 0,
    tournamentWins: 0,
    totalEarned: 0,
    totalBetWon: 0,
    totalBetLost: 0,
    missionsDone: {},
    day: 1,
    roundsToday: 0,
    caddyLevel: 1,
    beatOpponents: {},
  };

  function weatherWord() {
    const w = getWeather();
    return w && w.condition ? w.condition : 'clear';
  }

  function skillLevel() {
    return Math.max(1, Math.min(10, 10 - Math.floor(state.handicap / 4)));
  }

  function refreshRank() {
    state.rank = rankForHandicap(state.handicap).id;
  }

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const mission = GOLF_MISSIONS.find((m) => m.id === id);
    if (!mission) return;
    let done = false;
    if (id === 'first-round') done = state.totalRounds >= 1;
    else if (id === 'birdie') done = state.birdies >= 1;
    else if (id === 'eagle') done = state.eagles >= 1;
    else if (id === 'hole-in-one') done = state.holeInOnes >= 1;
    else if (id === 'break-90') done = state.bestRound !== null && state.bestRound.total < 90;
    else if (id === 'break-80') done = state.bestRound !== null && state.bestRound.total < 80;
    else if (id === 'match-win') done = state.matchWins >= 1;
    else if (id === 'tournament-win') done = state.tournamentWins >= 1;
    else if (id === 'skins-5') done = state.skinsWon >= 5;
    else if (id === 'beat-pro') done = (state.beatOpponents['pro-pete'] || 0) >= 1;
    if (!done) return;
    state.missionsDone[id] = true;
    addCash(mission.reward);
    log(`Mission complete: ${mission.name}`);
  }

  function windNow() {
    const w = weatherRow(weatherWord());
    const dirs = ['north', 'south', 'east', 'west'];
    return { speed: w.wind, direction: dirs[Math.floor(rng() * dirs.length)] };
  }

  function finishHole() {
    const round = state.round;
    const course = courseById(round.courseId);
    const holeRec = course.holes[round.hole];
    const diff = round.strokes - holeRec.par;
    const name = scoreName(diff);
    round.holeStrokes.push(round.strokes);
    state.totalStrokes += round.strokes;
    state.totalHoles += 1;
    if (diff === -1) state.birdies += 1;
    if (diff <= -2) state.eagles += 1;
    if (round.strokes === 1) state.holeInOnes += 1;
    if (round.opponent) {
      const oppScore = opponentHoleScore(rng, holeRec.par, round.opponent.skill);
      round.opponentStrokes.push(oppScore);
      if (round.strokes < oppScore) {
        round.skins += 1;
        round.skinsWon += 1;
        state.skinsWon += 1;
      }
    }
    checkMission('birdie');
    checkMission('eagle');
    checkMission('hole-in-one');
    checkMission('skins-5');
    if (round.hole >= 8) return finishRound();
    round.hole += 1;
    round.strokes = 0;
    round.putts = 0;
    const nextHole = course.holes[round.hole];
    round.distanceLeft = nextHole.dist;
    round.lie = 'tee';
    return { ok: true, holeComplete: true, name, strokes: round.holeStrokes[round.holeStrokes.length - 1] };
  }

  function finishRound() {
    const round = state.round;
    const course = courseById(round.courseId);
    const par = coursePar(course);
    const total = round.holeStrokes.reduce((s, n) => s + n, 0);
    const diff = total - par;
    if (!state.bestRound || total < state.bestRound.total) {
      state.bestRound = { courseId: round.courseId, total, par, day: getDay() };
    }
    if (state.bestSkins === undefined) state.bestSkins = 0;
    if (round.skinsWon > state.bestSkins) state.bestSkins = round.skinsWon;
    if (diff <= 0) state.handicap = Math.max(-5, state.handicap - 2);
    else if (diff <= 5) state.handicap = Math.max(-5, state.handicap - 1);
    else if (diff >= 12) state.handicap = Math.min(36, state.handicap + 1);
    let winnings = 0;
    if (round.opponent && round.bet > 0) {
      const oppTotal = round.opponentStrokes.reduce((s, n) => s + n, 0);
      if (round.betType === 'skins') {
        if (round.skinsWon > 0) {
          winnings = round.bet + round.skinsWon * 50;
        }
      } else if (round.betType === 'nassau') {
        const front = round.holeStrokes.slice(0, 5).reduce((s, n) => s + n, 0) - course.holes.slice(0, 5).reduce((s, h) => s + h.par, 0);
        const back = round.holeStrokes.slice(5).reduce((s, n) => s + n, 0) - course.holes.slice(5).reduce((s, h) => s + h.par, 0);
        winnings = nassauPayout(front, back, diff, round.bet);
        if (winnings > 0) winnings += round.bet;
      } else {
        if (total < oppTotal) winnings = round.bet * 2;
        else if (total === oppTotal) winnings = round.bet;
      }
      if (total < oppTotal) {
        state.matchWins += 1;
        state.beatOpponents[round.opponent.id] = (state.beatOpponents[round.opponent.id] || 0) + 1;
        checkMission('match-win');
        checkMission('beat-pro');
      }
    }
    if (winnings > 0) {
      addCash(winnings);
      state.totalEarned += winnings;
      state.totalBetWon += winnings;
    } else if (round.bet > 0) {
      state.totalBetLost += round.bet;
    }
    state.totalRounds += 1;
    state.roundsToday += 1;
    const result = {
      ok: true,
      roundComplete: true,
      course: course.name,
      total,
      par,
      diff,
      name: scoreName(diff),
      winnings,
    };
    state.round = null;
    refreshRank();
    checkMission('first-round');
    checkMission('break-90');
    checkMission('break-80');
    return result;
  }

  const system = {
    state,

    buyBalls(ballId, dozens) {
      const ball = GOLF_BALLS.find((b) => b.id === ballId);
      if (!ball) return { ok: false, error: 'unknown ball' };
      const count = Math.max(1, Math.min(10, dozens || 1));
      const total = ball.price * count;
      if (getCash() < total) return { ok: false, error: 'not enough cash' };
      addCash(-total);
      if (!state.ballsOwned.includes(ballId)) state.ballsOwned.push(ballId);
      state.ballId = ballId;
      state.ballsLeft += 12 * count;
      log(`Bought ${count} dozen ${ball.name}`);
      return { ok: true, ball, ballsLeft: state.ballsLeft };
    },

    hireCaddy(level) {
      if (!level || level <= state.caddyLevel) return { ok: false, error: 'level must be above current caddy level' };
      const cost = level * 100;
      if (getCash() < cost) return { ok: false, error: 'not enough cash' };
      addCash(-cost);
      state.caddyLevel = level;
      log(`Hired caddy level ${level}`);
      return { ok: true, level };
    },

    startRound(courseId, options = {}) {
      const course = courseById(courseId);
      if (!course) return { ok: false, error: 'unknown course' };
      if (state.round) return { ok: false, error: 'round already in progress' };
      if (state.ballsLeft <= 0) return { ok: false, error: 'no balls left' };
      if (getCash() < course.fee) return { ok: false, error: 'not enough cash for green fee' };
      let opponent = null;
      let bet = 0;
      if (options.opponentId) {
        opponent = opponentById(options.opponentId);
        if (!opponent) return { ok: false, error: 'unknown opponent' };
        bet = options.bet || opponent.bet;
        if (getCash() < course.fee + bet) return { ok: false, error: 'not enough cash for the bet' };
      }
      addCash(-course.fee);
      if (bet > 0) addCash(-bet);
      const round = {
        courseId,
        courseName: course.name,
        par: coursePar(course),
        hole: 0,
        strokes: 0,
        holeStrokes: [],
        opponent: opponent ? { ...opponent } : null,
        opponentStrokes: [],
        bet,
        betType: options.betType || 'match',
        skins: 0,
        skinsWon: 0,
        distanceLeft: course.holes[0].dist,
        lie: 'tee',
        putts: 0,
        longestDrive: 0,
        closestPar3: Infinity,
        ballsLost: 0,
        startedDay: getDay(),
      };
      state.round = round;
      log(`Started round at ${course.name}`);
      return {
        ok: true,
        round: {
          course: course.name,
          hole: 0,
          par: course.holes[0].par,
          strokes: 0,
          distanceLeft: round.distanceLeft,
          lie: round.lie,
          bet,
          betType: round.betType,
          opponent: opponent ? opponent.name : null,
        },
      };
    },

    caddyRead() {
      const round = state.round;
      if (!round) return { ok: false, error: 'no round in progress' };
      const course = courseById(round.courseId);
      const wind = windNow();
      const tip = CADDY_TIPS[Math.floor(rng() * CADDY_TIPS.length)];
      const club = this.suggestClub(round.distanceLeft, round.lie);
      return {
        ok: true,
        tip,
        wind: `Wind ${wind.speed} mph from the ${wind.direction}`,
        hole: course.holes[round.hole],
        club,
        distanceLeft: round.distanceLeft,
        lie: round.lie,
      };
    },

    suggestClub(distance, lie) {
      if (lie === 'green' || distance <= 30) return 'putter';
      if (lie === 'sand') return 'wedge-s';
      if (distance <= 60) return 'wedge-l';
      if (distance <= 90) return 'wedge-s';
      if (distance <= 120) return 'wedge-p';
      if (distance <= 140) return 'iron9';
      if (distance <= 160) return 'iron7';
      if (distance <= 180) return 'iron5';
      if (distance <= 200) return 'hybrid';
      if (distance <= 230) return 'wood3';
      return 'driver';
    },

    playShot(clubId, power, aim) {
      const round = state.round;
      if (!round) return { ok: false, error: 'no round in progress' };
      const club = clubById(clubId);
      if (!club) return { ok: false, error: 'unknown club' };
      if (!state.clubsOwned.includes(clubId)) return { ok: false, error: 'club not owned' };
      if (round.lie === 'green') return { ok: false, error: 'putt instead' };
      const p = Math.max(0, Math.min(1, power === undefined ? 0.8 : power));
      const a = Math.max(-1, Math.min(1, aim || 0));
      const ball = ballById(state.ballId);
      const wind = windNow();
      const course = courseById(round.courseId);
      const holeRec = course.holes[round.hole];
      const noise = (rng() - 0.5) * 2 * (1 - club.accuracy) * 40;
      const carry = Math.round(club.maxDist * p * (1 + ball.distBonus) * weatherRow(weatherWord()).distMult + noise);
      const lateral = Math.round(a * 30 + (rng() - 0.5) * 10 + wind.speed * 0.5);
      round.strokes += 1;
      const before = round.distanceLeft;
      let distanceLeft = Math.max(0, before - carry);
      let lie = round.lie;
      let outcome = 'fairway';
      const overshoot = carry - before;
      if (overshoot > 40 && holeRec.hazard === 'water') {
        round.strokes += 1;
        round.ballsLost += 1;
        state.ballsLeft = Math.max(0, state.ballsLeft - 1);
        distanceLeft = 40;
        lie = 'fairway';
        outcome = 'water';
      } else if (distanceLeft <= 0) {
        distanceLeft = 5 + Math.floor(rng() * 20);
        lie = 'green';
        outcome = 'green';
        if (holeRec.par === 3 && round.strokes === 1 && Math.abs(lateral) <= 2) {
          round.closestPar3 = 0;
          return finishHole();
        }
      } else if (rng() < 0.05 && holeRec.hazard === 'water') {
        outcome = 'water';
        round.strokes += 1;
        round.ballsLost += 1;
        state.ballsLeft = Math.max(0, state.ballsLeft - 1);
        distanceLeft = 30;
        lie = 'fairway';
      } else if (holeRec.hazard === 'bunker' && rng() < 0.2) {
        lie = 'sand';
        outcome = 'bunker';
      } else if (holeRec.hazard === 'trees' && rng() < 0.15) {
        lie = 'trees';
        outcome = 'trees';
      } else if (Math.abs(lateral) > 25) {
        lie = 'rough';
        outcome = 'rough';
      }
      round.distanceLeft = distanceLeft;
      round.lie = lie;
      if (carry > round.longestDrive) round.longestDrive = carry;
      return {
        ok: true,
        club: club.name,
        carry,
        lateral,
        distanceLeft,
        lie,
        outcome,
        strokes: round.strokes,
      };
    },

    putt(power) {
      const round = state.round;
      if (!round) return { ok: false, error: 'no round in progress' };
      if (round.lie !== 'green') return { ok: false, error: 'not on the green' };
      const course = courseById(round.courseId);
      const holeRec = course.holes[round.hole];
      const p = Math.max(0, Math.min(1, power === undefined ? 0.5 : power));
      const greenSpeed = holeRec.green === 'fast' ? 1.2 : holeRec.green === 'slow' ? 0.8 : 1;
      const dist = p * 30 * greenSpeed;
      const err = (rng() - 0.5) * 2 * (1 - skillLevel() / 12) * 4;
      round.strokes += 1;
      round.putts += 1;
      let remaining = round.distanceLeft - dist + err;
      if (Math.abs(remaining) <= 0.5) {
        return finishHole();
      }
      if (remaining < 0) remaining = Math.abs(remaining) * 0.7;
      round.distanceLeft = Math.round(Math.max(1, remaining));
      return { ok: true, distanceLeft: round.distanceLeft, strokes: round.strokes, putts: round.putts };
    },

    giveUpRound() {
      if (!state.round) return { ok: false, error: 'no round in progress' };
      if (state.round.bet > 0) state.totalBetLost += state.round.bet;
      state.round = null;
      log('Walked off the course');
      return { ok: true };
    },

    enterTournament(tournamentId) {
      const t = GOLF_TOURNAMENTS.find((x) => x.id === tournamentId);
      if (!t) return { ok: false, error: 'unknown tournament' };
      const weekday = getDay() % 7;
      if (weekday !== t.dayOfWeek) return { ok: false, error: 'wrong day for this tournament' };
      if (getCash() < t.entry) return { ok: false, error: 'not enough cash' };
      addCash(-t.entry);
      state.tournamentEntry = { tournamentId, day: getDay() };
      log(`Entered tournament: ${t.name}`);
      return { ok: true, tournament: t };
    },

    settleTournament() {
      if (!state.tournamentEntry) return { ok: false, error: 'not entered in a tournament' };
      const t = GOLF_TOURNAMENTS.find((x) => x.id === state.tournamentEntry.tournamentId);
      const playerDiff = state.bestRound ? state.bestRound.total - state.bestRound.par : 20;
      let beaten = 0;
      for (let i = 0; i < 20; i++) {
        const rivalDiff = Math.round((rng() - 0.5) * 20);
        if (playerDiff < rivalDiff) beaten += 1;
      }
      const place = 21 - beaten;
      const prize = tournamentPurseFor(place, t.purse);
      const won = place === 1;
      if (prize > 0) {
        addCash(prize);
        state.totalEarned += prize;
      }
      if (won) {
        state.tournamentWins += 1;
        checkMission('tournament-win');
      }
      state.tournamentEntry = null;
      log(`Tournament finished: place ${place}`);
      return { ok: true, place, prize, won };
    },

    missions() {
      return GOLF_MISSIONS.map((m) => ({ ...m, done: !!state.missionsDone[m.id] }));
    },

    tick(dt) {
      const day = getDay();
      if (day !== state.day) {
        state.day = day;
        state.roundsToday = 0;
        if (state.tournamentEntry) this.settleTournament();
      }
    },

    hudLine() {
      if (!state.round && state.totalRounds === 0) return '';
      if (!state.round) {
        const rank = rankForHandicap(state.handicap);
        const best = state.bestRound ? state.bestRound.total : '-';
        return `Golf ${rank.name} | handicap ${state.handicap} | best ${best}`;
      }
      const round = state.round;
      return `Golf ${round.courseName} hole ${round.hole + 1}/9 | ${round.distanceLeft} yards | ${round.lie} | strokes ${round.strokes}`;
    },

    summary() {
      return {
        handicap: state.handicap,
        rank: state.rank,
        totalRounds: state.totalRounds,
        totalStrokes: state.totalStrokes,
        birdies: state.birdies,
        eagles: state.eagles,
        holeInOnes: state.holeInOnes,
        bestRound: state.bestRound,
        skinsWon: state.skinsWon,
        matchWins: state.matchWins,
        tournamentWins: state.tournamentWins,
        missionsDone: Object.keys(state.missionsDone).length,
      };
    },

    serialize() {
      return {
        handicap: state.handicap,
        rank: state.rank,
        ballId: state.ballId,
        ballsOwned: [...state.ballsOwned],
        ballsLeft: state.ballsLeft,
        clubsOwned: [...state.clubsOwned],
        totalRounds: state.totalRounds,
        totalStrokes: state.totalStrokes,
        totalHoles: state.totalHoles,
        birdies: state.birdies,
        eagles: state.eagles,
        holeInOnes: state.holeInOnes,
        bestRound: state.bestRound ? { ...state.bestRound } : null,
        skinsWon: state.skinsWon,
        matchWins: state.matchWins,
        tournamentWins: state.tournamentWins,
        totalEarned: state.totalEarned,
        totalBetWon: state.totalBetWon,
        totalBetLost: state.totalBetLost,
        missionsDone: { ...state.missionsDone },
        caddyLevel: state.caddyLevel,
        beatOpponents: { ...state.beatOpponents },
      };
    },

    deserialize(saved) {
      if (!saved || typeof saved !== 'object') return;
      const numeric = ['handicap', 'ballsLeft', 'totalRounds', 'totalStrokes', 'totalHoles', 'birdies', 'eagles', 'holeInOnes', 'skinsWon', 'matchWins', 'tournamentWins', 'totalEarned', 'totalBetWon', 'totalBetLost', 'caddyLevel'];
      for (const key of numeric) {
        if (typeof saved[key] === 'number') state[key] = saved[key];
      }
      if (typeof saved.rank === 'string') state.rank = saved.rank;
      if (typeof saved.ballId === 'string') state.ballId = saved.ballId;
      if (Array.isArray(saved.ballsOwned)) state.ballsOwned = [...saved.ballsOwned];
      if (Array.isArray(saved.clubsOwned)) state.clubsOwned = [...saved.clubsOwned];
      if (saved.bestRound && typeof saved.bestRound === 'object') state.bestRound = { ...saved.bestRound };
      if (saved.missionsDone && typeof saved.missionsDone === 'object') state.missionsDone = { ...saved.missionsDone };
      if (saved.beatOpponents && typeof saved.beatOpponents === 'object') state.beatOpponents = { ...saved.beatOpponents };
    },
  };

  return system;
}
