// golf.js — Golf: 9-hole rounds, club physics, betting and tournaments.
// Play a round on one of five courses: pick a club, set power and aim,
// fight the wind, then putt. Score under par to win skins and side bets,
// climb the handicap ladder, and enter the Sunday tournament for the big
// purse. Caddies give reads, weather changes the ball, and the 19th hole
// is where the real money moves. Pure logic, no rendering, no imports.
// Factory: createGolfSystem(deps) with deps { rng, getHour, getDay,
// getCash, addCash, addHeat, log, getPlayerPos, getWeather }.

// ---------------------------------------------------------------------------
// Data tables
// ---------------------------------------------------------------------------

// Golf clubs: distance at full power, accuracy, loft behaviour.
export const CLUBS = [
  { id: 'driver', name: 'Driver', maxDist: 280, accuracy: 0.75, loft: 'low', desc: 'Maximum distance off the tee. Wild if you rush it.' },
  { id: 'wood3', name: '3 Wood', maxDist: 230, accuracy: 0.82, loft: 'low', desc: 'Long and a little safer than the driver.' },
  { id: 'hybrid', name: 'Hybrid', maxDist: 200, accuracy: 0.86, loft: 'mid', desc: 'Easy to hit from anywhere.' },
  { id: 'iron5', name: '5 Iron', maxDist: 180, accuracy: 0.88, loft: 'mid', desc: 'A solid mid-iron for long approaches.' },
  { id: 'iron7', name: '7 Iron', maxDist: 160, accuracy: 0.9, loft: 'mid', desc: 'The most trusted club in the bag.' },
  { id: 'iron9', name: '9 Iron', maxDist: 140, accuracy: 0.92, loft: 'high', desc: 'High and soft onto the green.' },
  { id: 'wedge-p', name: 'Pitching Wedge', maxDist: 110, accuracy: 0.94, loft: 'high', desc: 'Short approaches and chips.' },
  { id: 'wedge-s', name: 'Sand Wedge', maxDist: 80, accuracy: 0.93, loft: 'very-high', desc: 'Built for sand. And flops.' },
  { id: 'wedge-l', name: 'Lob Wedge', maxDist: 55, accuracy: 0.9, loft: 'very-high', desc: 'Straight up, straight down.' },
  { id: 'putter', name: 'Putter', maxDist: 30, accuracy: 0.98, loft: 'flat', desc: 'On the green, this is the only club that matters.' },
  { id: 'rescue', name: 'Rescue Club', maxDist: 190, accuracy: 0.84, loft: 'mid', desc: 'For the rough, the trees, the bad lies.' },
  { id: 'chip', name: 'Chipper', maxDist: 40, accuracy: 0.95, loft: 'low', desc: 'Runs the ball along the ground to the hole.' },
];

// Golf balls: distance bonus, spin, price per dozen.
export const GOLF_BALLS = [
  { id: 'range', name: 'Range Balls', price: 0, distBonus: 0, spin: 0, desc: 'Scuffed, old, free. They fly like bricks.' },
  { id: 'standard', name: 'Standard Balls', price: 20, distBonus: 0.02, spin: 0.05, desc: 'A decent ball for a decent round.' },
  { id: 'tour', name: 'Tour Balls', price: 60, distBonus: 0.05, spin: 0.15, desc: 'Soft cover, real spin, real stopping power.' },
  { id: 'distance', name: 'Distance Balls', price: 45, distBonus: 0.1, spin: -0.05, desc: 'Hard cover, extra yards, less control.' },
  { id: 'gold', name: 'Gold Balls', price: 200, distBonus: 0.08, spin: 0.2, desc: 'For the round that matters.' },
];

// Courses: 9 holes each. par / distance (yards) / hazard / dogleg / green.
export const COURSES = [
  {
    id: 'palms', name: 'Palm Greens', fee: 50, difficulty: 1, desc: 'Flat, friendly, and full of water.',
    holes: [
      { par: 4, dist: 380, hazard: 'none', dogleg: 'none', green: 'flat' },
      { par: 3, dist: 160, hazard: 'water', dogleg: 'none', green: 'flat' },
      { par: 5, dist: 520, hazard: 'sand', dogleg: 'left', green: 'sloped' },
      { par: 4, dist: 400, hazard: 'trees', dogleg: 'right', green: 'flat' },
      { par: 3, dist: 180, hazard: 'sand', dogleg: 'none', green: 'sloped' },
      { par: 4, dist: 360, hazard: 'water', dogleg: 'left', green: 'flat' },
      { par: 5, dist: 540, hazard: 'none', dogleg: 'none', green: 'flat' },
      { par: 4, dist: 390, hazard: 'trees', dogleg: 'right', green: 'sloped' },
      { par: 3, dist: 150, hazard: 'water', dogleg: 'none', green: 'flat' },
    ],
  },
  {
    id: 'dunes', name: 'Dune Links', fee: 120, difficulty: 2, desc: 'Wind, sand, and long carries.',
    holes: [
      { par: 4, dist: 420, hazard: 'sand', dogleg: 'left', green: 'sloped' },
      { par: 5, dist: 560, hazard: 'sand', dogleg: 'right', green: 'fast' },
      { par: 3, dist: 200, hazard: 'sand', dogleg: 'none', green: 'fast' },
      { par: 4, dist: 440, hazard: 'trees', dogleg: 'none', green: 'sloped' },
      { par: 4, dist: 380, hazard: 'water', dogleg: 'left', green: 'flat' },
      { par: 3, dist: 170, hazard: 'sand', dogleg: 'none', green: 'fast' },
      { par: 5, dist: 580, hazard: 'sand', dogleg: 'right', green: 'sloped' },
      { par: 4, dist: 410, hazard: 'none', dogleg: 'left', green: 'flat' },
      { par: 4, dist: 430, hazard: 'trees', dogleg: 'none', green: 'fast' },
    ],
  },
  {
    id: 'lakes', name: 'Lakeside Championship', fee: 300, difficulty: 3, desc: 'Water on every hole. Bring spare balls.',
    holes: [
      { par: 4, dist: 450, hazard: 'water', dogleg: 'right', green: 'fast' },
      { par: 3, dist: 210, hazard: 'water', dogleg: 'none', green: 'fast' },
      { par: 5, dist: 600, hazard: 'water', dogleg: 'left', green: 'sloped' },
      { par: 4, dist: 430, hazard: 'water', dogleg: 'none', green: 'fast' },
      { par: 4, dist: 390, hazard: 'sand', dogleg: 'right', green: 'sloped' },
      { par: 3, dist: 190, hazard: 'water', dogleg: 'none', green: 'fast' },
      { par: 5, dist: 590, hazard: 'water', dogleg: 'left', green: 'fast' },
      { par: 4, dist: 460, hazard: 'trees', dogleg: 'right', green: 'sloped' },
      { par: 4, dist: 440, hazard: 'water', dogleg: 'none', green: 'fast' },
    ],
  },
  {
    id: 'mountain', name: 'Mountain Ridge', fee: 250, difficulty: 3, desc: 'Elevation changes everything.',
    holes: [
      { par: 5, dist: 570, hazard: 'trees', dogleg: 'left', green: 'sloped' },
      { par: 4, dist: 410, hazard: 'trees', dogleg: 'right', green: 'fast' },
      { par: 3, dist: 185, hazard: 'sand', dogleg: 'none', green: 'sloped' },
      { par: 4, dist: 400, hazard: 'trees', dogleg: 'none', green: 'fast' },
      { par: 5, dist: 550, hazard: 'water', dogleg: 'left', green: 'sloped' },
      { par: 3, dist: 220, hazard: 'trees', dogleg: 'none', green: 'fast' },
      { par: 4, dist: 430, hazard: 'sand', dogleg: 'right', green: 'sloped' },
      { par: 4, dist: 380, hazard: 'trees', dogleg: 'left', green: 'flat' },
      { par: 5, dist: 610, hazard: 'trees', dogleg: 'none', green: 'fast' },
    ],
  },
  {
    id: 'night', name: 'Neon Night Course', fee: 200, difficulty: 2, desc: 'Glow balls, neon fairways, midnight golf.',
    holes: [
      { par: 4, dist: 370, hazard: 'none', dogleg: 'none', green: 'flat' },
      { par: 3, dist: 155, hazard: 'water', dogleg: 'none', green: 'flat' },
      { par: 5, dist: 510, hazard: 'sand', dogleg: 'left', green: 'sloped' },
      { par: 4, dist: 390, hazard: 'trees', dogleg: 'right', green: 'flat' },
      { par: 3, dist: 175, hazard: 'sand', dogleg: 'none', green: 'sloped' },
      { par: 4, dist: 350, hazard: 'water', dogleg: 'left', green: 'flat' },
      { par: 5, dist: 530, hazard: 'none', dogleg: 'none', green: 'flat' },
      { par: 4, dist: 380, hazard: 'trees', dogleg: 'right', green: 'sloped' },
      { par: 3, dist: 145, hazard: 'water', dogleg: 'none', green: 'flat' },
    ],
  },
];

// Opponents for match play and skins.
export const GOLF_OPPONENTS = [
  { id: 'rookie-ron', name: 'Rookie Ron', skill: 1, bet: 50, taunt: 'I just started last week!', desc: 'Enthusiastic, terrible, generous.' },
  { id: 'club-pro', name: 'Club Pro Carla', skill: 3, bet: 200, taunt: 'Watch and learn.', desc: 'The local pro. Solid, not spectacular.' },
  { id: 'old-tom', name: 'Old Tom', skill: 4, bet: 500, taunt: 'I have played this course since before you were born.', desc: 'Seventy years old. Never misses a putt.' },
  { id: 'shark', name: 'The Shark', skill: 5, bet: 2000, taunt: 'You sure you can afford this?', desc: 'A hustler in golf shoes. Plays for blood.' },
  { id: 'influencer', name: 'Influencer Ivy', skill: 2, bet: 300, taunt: 'This is going on my channel!', desc: 'Films every shot. Distracting, beatable.' },
  { id: 'businessman', name: 'Mr. Big', skill: 3, bet: 1000, taunt: 'Loser buys lunch at the clubhouse.', desc: 'Rich, competitive, and a little wild.' },
  { id: 'kid-prodigy', name: 'Kid Prodigy', skill: 5, bet: 800, taunt: 'My dad says I have to let you win sometimes.', desc: 'Twelve years old. Plays like a tour pro.' },
  { id: 'retired-champ', name: 'Retired Champ', skill: 6, bet: 5000, taunt: 'I won this tournament three times.', desc: 'The Sunday legend. Beat him and you are somebody.' },
];

// Bet types for a round.
export const GOLF_BETS = [
  { id: 'match', name: 'Match Play', desc: 'Lowest score wins the pot.', mult: 1 },
  { id: 'skins', name: 'Skins Game', desc: 'Win a hole outright to take the skin ($ per hole).', mult: 1 },
  { id: 'nassau', name: 'Nassau', desc: 'Front 9, back 9, and overall — three bets in one.', mult: 1 },
  { id: 'closest', name: 'Closest to Pin', desc: 'Closest tee shot on par 3s wins a bonus.', mult: 1 },
  { id: 'longest', name: 'Longest Drive', desc: 'Longest drive on the round wins a bonus.', mult: 1 },
];

// Golf ranks (handicap ladder).
export const GOLF_RANKS = [
  { id: 'hacker', name: 'Hacker', handicapMax: 36, perk: 'Everybody starts here.' },
  { id: 'bogey', name: 'Bogey Golfer', handicapMax: 24, perk: 'Breaking 100 regularly.' },
  { id: 'regular', name: 'Regular', handicapMax: 18, perk: 'Breaking 90. Clubhouse respect.' },
  { id: 'single', name: 'Single Digit', handicapMax: 9, perk: 'Breaking 80. Tournament ready.' },
  { id: 'scratch', name: 'Scratch Golfer', handicapMax: 0, perk: 'Par is the expectation.' },
  { id: 'pro', name: 'Tour Pro', handicapMax: -5, perk: 'Under par is normal. Sponsors call.' },
];

// Tournaments: day of week, entry, purse.
export const GOLF_TOURNAMENTS = [
  { id: 'sunday-open', name: 'Sunday Open', dayOfWeek: 0, entry: 200, purse: 5000, courseId: 'palms', desc: 'The weekly open. Everybody plays.' },
  { id: 'links-classic', name: 'Links Classic', dayOfWeek: 3, entry: 500, purse: 15000, courseId: 'dunes', desc: 'Wind, sand, and glory.' },
  { id: 'lakes-masters', name: 'Lakes Masters', dayOfWeek: 6, entry: 1000, purse: 50000, courseId: 'lakes', desc: 'The big one. Green jacket energy.' },
  { id: 'night-glow', name: 'Neon Night Cup', dayOfWeek: 5, entry: 300, purse: 8000, courseId: 'night', desc: 'Glow balls under the lights.' },
];

// Golf missions.
export const GOLF_MISSIONS = [
  { id: 'first-round', name: 'First Round', desc: 'Finish a 9-hole round.', reward: 100 },
  { id: 'under-par', name: 'Under Par', desc: 'Finish a round under par.', reward: 500 },
  { id: 'birdie', name: 'Birdie!', desc: 'Score a birdie on any hole.', reward: 200 },
  { id: 'eagle', name: 'Eagle!', desc: 'Score an eagle.', reward: 800 },
  { id: 'hole-in-one', name: 'Hole in One!', desc: 'Ace a par 3.', reward: 5000 },
  { id: 'win-match', name: 'Match Winner', desc: 'Beat an opponent in match play.', reward: 400 },
  { id: 'beat-shark', name: 'Shark Bait', desc: 'Beat The Shark.', reward: 2000 },
  { id: 'beat-champ', name: 'Champion Slayer', desc: 'Beat the Retired Champ.', reward: 5000 },
  { id: 'tournament-win', name: 'Tournament Champion', desc: 'Win any tournament.', reward: 3000 },
  { id: 'skins-5', name: 'Skins King', desc: 'Win 5 skins in one round.', reward: 600 },
];

// Caddy advice lines.
export const CADDY_TIPS = [
  'Wind is left to right. Aim left edge.',
  'The green slopes to the water. Putt firm.',
  'Take one more club. The air is heavy today.',
  'Lay up short of the water. Par is a good score here.',
  'The pin is tucked behind the bunker. Play safe.',
  'Downhill putt — barely touch it.',
  'Driver is the play. The fairway is wide here.',
  'This hole eats drivers. Take the 3 wood.',
];

// Weather effects on the ball.
export const GOLF_WEATHER = [
  { weather: 'clear', distMult: 1.0, wind: 2, note: 'Perfect golf weather.' },
  { weather: 'clouds', distMult: 0.98, wind: 4, note: 'Overcast, light wind.' },
  { weather: 'rain', distMult: 0.9, wind: 6, note: 'Wet fairways, ball plugs.' },
  { weather: 'storm', distMult: 0.85, wind: 10, note: 'Storm golf. Only madmen play.' },
  { weather: 'fog', distMult: 0.95, wind: 1, note: 'Fog: you cannot see the flag.' },
];

// Score names.
export const SCORE_NAMES = {
  '-3': 'Albatross', '-2': 'Eagle', '-1': 'Birdie', 0: 'Par', 1: 'Bogey', 2: 'Double Bogey', 3: 'Triple Bogey',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clampNum(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

export function coursePar(course) {
  return course.holes.reduce((s, h) => s + h.par, 0);
}

export function scoreName(diff) {
  if (diff <= -3) return 'Albatross';
  return SCORE_NAMES[String(diff)] || `+${diff}`;
}

// Simulate an opponent's hole score: skill 1-6, par +/- noise.
export function opponentHoleScore(rng, par, skill) {
  const mean = par + (3 - skill) * 0.4;
  const roll = mean + (rng() + rng() + rng() - 1.5) * 1.2;
  return Math.max(1, Math.round(roll));
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createGolfSystem(deps) {
  const d = deps || {};
  const rng = d.rng || Math.random;
  const getHour = d.getHour || (() => 12);
  const getDay = d.getDay || (() => 1);
  const getCash = d.getCash || (() => 0);
  const addCash = d.addCash || (() => {});
  const log = d.log || (() => {});
  const getPlayerPos = d.getPlayerPos || (() => ({ x: 0, z: 0 }));
  const getWeather = d.getWeather || (() => 'clear');

  const state = {
    handicap: 28,
    rank: 'hacker',
    ballId: 'range',
    ballsOwned: ['range'],
    ballsLeft: 12,
    clubsOwned: ['driver', 'wood3', 'hybrid', 'iron5', 'iron7', 'iron9', 'wedge-p', 'wedge-s', 'wedge-l', 'putter', 'rescue', 'chip'],
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

  function rank() {
    return GOLF_RANKS.find((r) => r.id === state.rank) || GOLF_RANKS[0];
  }

  function refreshRank() {
    let best = GOLF_RANKS[0];
    for (const r of GOLF_RANKS) {
      if (state.handicap <= r.handicapMax) best = r;
    }
    if (best.id !== state.rank) {
      state.rank = best.id;
      log(`Golf rank up: ${best.name}! Handicap ${state.handicap}. ${best.perk}`);
    }
  }

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const m = GOLF_MISSIONS.find((x) => x.id === id);
    if (!m) return;
    let done = false;
    switch (id) {
      case 'first-round': done = state.totalRounds >= 1; break;
      case 'under-par': done = state.bestRound !== null && state.bestRound.diff < 0; break;
      case 'birdie': done = state.birdies >= 1; break;
      case 'eagle': done = state.eagles >= 1; break;
      case 'hole-in-one': done = state.holeInOnes >= 1; break;
      case 'win-match': done = state.matchWins >= 1; break;
      case 'beat-shark': done = (state.beatOpponents.shark || 0) >= 1; break;
      case 'beat-champ': done = (state.beatOpponents['retired-champ'] || 0) >= 1; break;
      case 'tournament-win': done = state.tournamentWins >= 1; break;
      case 'skins-5': done = (state.bestSkins || 0) >= 5; break;
      default: done = false;
    }
    if (!done) return;
    state.missionsDone[id] = true;
    addCash(m.reward);
    log(`Golf mission complete: ${m.name} (+$${m.reward}).`);
  }

  function buyBalls(ballId, dozens) {
    const b = GOLF_BALLS.find((x) => x.id === ballId);
    if (!b) return { ok: false, error: 'unknown ball' };
    const n = clampNum(Math.floor(dozens) || 1, 1, 10);
    const cost = b.price * n;
    if (getCash() < cost) return { ok: false, error: 'not enough cash' };
    addCash(-cost);
    if (!state.ballsOwned.includes(ballId)) state.ballsOwned.push(ballId);
    state.ballId = ballId;
    state.ballsLeft += n * 12;
    log(`Bought ${n} dozen ${b.name} ($${cost}). ${state.ballsLeft} balls in the bag.`);
    return { ok: true, ball: b, ballsLeft: state.ballsLeft };
  }

  function hireCaddy(level) {
    const cost = level * 100;
    if (level <= state.caddyLevel) return { ok: false, error: 'caddy already at that level' };
    if (getCash() < cost) return { ok: false, error: 'not enough cash' };
    addCash(-cost);
    state.caddyLevel = level;
    log(`Hired a level ${level} caddy ($${cost}). Better reads, better advice.`);
    return { ok: true, level };
  }

  function startRound(courseId, opts) {
    const course = COURSES.find((c) => c.id === courseId);
    if (!course) return { ok: false, error: 'unknown course' };
    if (state.round) return { ok: false, error: 'round already in progress' };
    const o = opts || {};
    if (state.ballsLeft <= 0) return { ok: false, error: 'out of golf balls — buy more' };
    if (getCash() < course.fee) return { ok: false, error: 'not enough cash for the green fee' };
    addCash(-course.fee);
    let bet = 0;
    let opponent = null;
    if (o.opponentId) {
      opponent = GOLF_OPPONENTS.find((x) => x.id === o.opponentId);
      if (!opponent) return { ok: false, error: 'unknown opponent' };
      bet = opponent.bet;
      if (getCash() < bet) return { ok: false, error: 'not enough cash for the bet' };
      addCash(-bet);
    }
    const betType = o.betType || (opponent ? 'match' : 'none');
    state.round = {
      courseId: course.id,
      courseName: course.name,
      par: coursePar(course),
      hole: 0,
      strokes: 0,
      holeStrokes: [],
      opponent: opponent ? { ...opponent } : null,
      opponentStrokes: [],
      bet,
      betType,
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
    log(`Round started at ${course.name} (par ${state.round.par}). Green fee $${course.fee}${opponent ? `, ${betType} vs ${opponent.name} for $${bet}` : ''}.`);
    return { ok: true, round: summary_round() };
  }

  function summary_round() {
    const r = state.round;
    if (!r) return null;
    return {
      course: r.courseName,
      hole: r.hole + 1,
      par: r.par,
      strokes: r.strokes,
      distanceLeft: Math.round(r.distanceLeft),
      lie: r.lie,
      bet: r.bet,
      betType: r.betType,
      opponent: r.opponent ? r.opponent.name : null,
    };
  }

  function caddyRead() {
    const r = state.round;
    if (!r) return { ok: false, error: 'no round in progress' };
    const course = COURSES.find((c) => c.id === r.courseId);
    const hole = course.holes[r.hole];
    const tip = CADDY_TIPS[Math.floor(rng() * CADDY_TIPS.length)];
    const w = GOLF_WEATHER.find((x) => x.weather === getWeather()) || GOLF_WEATHER[0];
    const windDir = ['north', 'south', 'east', 'west'][Math.floor(rng() * 4)];
    const windSpeed = Math.round(w.wind * (0.5 + rng()));
    const suggested = suggestClub(r.distanceLeft, r.lie);
    return {
      ok: true,
      tip,
      wind: `${windSpeed} mph from the ${windDir}`,
      hole: { par: hole.par, dist: hole.dist, hazard: hole.hazard, green: hole.green },
      suggestedClub: suggested,
      distanceLeft: Math.round(r.distanceLeft),
      lie: r.lie,
    };
  }

  function suggestClub(distance, lie) {
    if (lie === 'green') return 'putter';
    if (lie === 'sand') return 'wedge-s';
    if (distance <= 30) return 'putter';
    if (distance <= 55) return 'wedge-l';
    if (distance <= 80) return 'wedge-s';
    if (distance <= 110) return 'wedge-p';
    if (distance <= 140) return 'iron9';
    if (distance <= 160) return 'iron7';
    if (distance <= 180) return 'iron5';
    if (distance <= 200) return 'hybrid';
    if (distance <= 230) return 'wood3';
    return 'driver';
  }

  function playShot(clubId, power, aim) {
    const r = state.round;
    if (!r) return { ok: false, error: 'no round in progress' };
    const club = CLUBS.find((c) => c.id === clubId);
    if (!club) return { ok: false, error: 'unknown club' };
    if (!state.clubsOwned.includes(clubId)) return { ok: false, error: 'club not in your bag' };
    if (r.lie === 'green') return { ok: false, error: 'on the green — putt instead' };
    const p = clampNum(power, 0.1, 1);
    const a = clampNum(aim, -1, 1);
    const ball = GOLF_BALLS.find((b) => b.id === state.ballId) || GOLF_BALLS[0];
    const w = GOLF_WEATHER.find((x) => x.weather === getWeather()) || GOLF_WEATHER[0];
    const course = COURSES.find((c) => c.id === r.courseId);
    const hole = course.holes[r.hole];
    // Distance: club max * power * ball * weather, with skill noise.
    const skill = clampNum(1 - state.handicap / 60, 0.4, 0.95);
    const noise = (rng() - 0.5) * 2 * (1 - club.accuracy) * 30 * (2 - skill);
    let carry = club.maxDist * p * (1 + ball.distBonus) * w.distMult + noise;
    carry = Math.max(5, carry);
    // Wind pushes the ball sideways and shortens/lengthens it.
    const windPush = (rng() - 0.5) * w.wind * 3 + a * 12;
    const lateral = windPush * (1 - club.accuracy * 0.5);
    // Hazard checks.
    const wasLong = carry >= r.distanceLeft + 15;
    const prevDist = r.distanceLeft;
    r.distanceLeft = Math.max(0, r.distanceLeft - carry);
    r.strokes++;
    state.totalStrokes++;
    let outcome = 'fairway';
    let penalty = 0;
    // Order matters: a ball that lands within a yard of the hole is on the
    // green. Only a massive overshoot (40+ yards past the pin) can still
    // find the water beyond it. Using an absolute overshoot threshold (not
    // relative to the remaining distance) prevents a tiny remaining distance
    // from making every normal shot count as "way long".
    const overshotHuge = carry >= prevDist + 40;
    if (hole.hazard === 'water' && overshotHuge) {
      outcome = 'water';
      penalty = 1;
      r.ballsLost++;
      state.ballsLeft--;
      r.distanceLeft = prevDist * 0.5;
      r.strokes += penalty;
      log(`Splash! Into the water. Penalty stroke. Ball lost (${state.ballsLeft} left).`);
    } else if (r.distanceLeft <= 1) {
      outcome = 'green';
      r.lie = 'green';
      r.distanceLeft = Math.abs(carry - prevDist);
      log(`On the green! ${Math.round(r.distanceLeft)} feet from the pin.`);
    } else if (hole.hazard === 'water' && rng() < 0.12) {
      outcome = 'water';
      penalty = 1;
      r.ballsLost++;
      state.ballsLeft--;
      r.distanceLeft = prevDist * 0.5;
      r.strokes += penalty;
      log(`Splash! Into the water. Penalty stroke. Ball lost (${state.ballsLeft} left).`);
    } else if (hole.hazard === 'sand' && Math.abs(lateral) > 18 && rng() < 0.5) {
      outcome = 'sand';
      r.lie = 'sand';
      log(`In the bunker. Sand wedge time.`);
    } else if (hole.hazard === 'trees' && Math.abs(lateral) > 22 && rng() < 0.4) {
      outcome = 'trees';
      r.lie = 'rough';
      log(`Into the trees. Punch out with the rescue club.`);
    } else if (Math.abs(lateral) > 25) {
      outcome = 'rough';
      r.lie = 'rough';
      log(`In the rough. ${Math.round(r.distanceLeft)} yards left.`);
    } else {
      r.lie = 'fairway';
    }
    if (r.hole === 0 && clubId === 'driver') r.longestDrive = Math.max(r.longestDrive, Math.round(carry));
    if (hole.par === 3) r.closestPar3 = Math.min(r.closestPar3, Math.round(r.distanceLeft));
    // Hole-in-one check: par 3, first shot, on the green within 2 feet.
    if (hole.par === 3 && r.strokes === 1 && r.lie === 'green' && r.distanceLeft <= 2) {
      return finishHole(1, 'HOLE IN ONE!');
    }
    return {
      ok: true,
      club: club.name,
      carry: Math.round(carry),
      lateral: Math.round(lateral),
      distanceLeft: Math.round(r.distanceLeft),
      lie: r.lie,
      outcome,
      strokes: r.strokes,
    };
  }

  function putt(power) {
    const r = state.round;
    if (!r) return { ok: false, error: 'no round in progress' };
    if (r.lie !== 'green') return { ok: false, error: 'not on the green yet' };
    const p = clampNum(power, 0.05, 1);
    const course = COURSES.find((c) => c.id === r.courseId);
    const hole = course.holes[r.hole];
    const greenSpeed = hole.green === 'fast' ? 1.3 : hole.green === 'sloped' ? 1.1 : 1;
    const puttDist = p * 30 * greenSpeed;
    const skill = clampNum(1 - state.handicap / 80, 0.5, 0.95);
    const err = (rng() - 0.5) * (1 - skill) * 12 * (hole.green === 'fast' ? 1.5 : 1);
    const remaining = r.distanceLeft - puttDist + Math.abs(err) * 0.5;
    r.strokes++;
    r.putts++;
    state.totalStrokes++;
    if (remaining <= 0.5) {
      return finishHole(r.strokes, 'Sunk the putt!');
    }
    if (remaining < 0) {
      r.distanceLeft = Math.abs(remaining) * 0.7;
      log(`Ran past the hole. ${Math.round(r.distanceLeft)} feet coming back.`);
    } else {
      r.distanceLeft = remaining;
      log(`Putt left ${Math.round(r.distanceLeft)} feet.`);
    }
    return { ok: true, distanceLeft: Math.round(r.distanceLeft), strokes: r.strokes, putts: r.putts };
  }

  function finishHole(strokes, note) {
    const r = state.round;
    const course = COURSES.find((c) => c.id === r.courseId);
    const hole = course.holes[r.hole];
    const diff = strokes - hole.par;
    const name = scoreName(diff);
    r.holeStrokes.push(strokes);
    state.totalHoles++;
    if (diff === -1) state.birdies++;
    if (diff === -2) state.eagles++;
    if (strokes === 1 && hole.par === 3) state.holeInOnes++;
    // Opponent plays the same hole.
    let oppStrokes = null;
    if (r.opponent) {
      oppStrokes = opponentHoleScore(rng, hole.par, r.opponent.skill);
      r.opponentStrokes.push(oppStrokes);
      if (r.betType === 'skins') {
        if (strokes < oppStrokes) { r.skinsWon++; r.skins++; }
        else if (strokes > oppStrokes) r.skins--;
      }
    }
    log(`Hole ${r.hole + 1}: ${strokes} (${name})${note ? ` — ${note}` : ''}${oppStrokes !== null ? ` | ${r.opponent.name}: ${oppStrokes}` : ''}.`);
    checkMission('birdie');
    checkMission('eagle');
    checkMission('hole-in-one');
    r.hole++;
    if (r.hole >= 9) return finishRound();
    const next = course.holes[r.hole];
    r.distanceLeft = next.dist;
    r.lie = 'tee';
    r.strokes = 0;
    r.putts = 0;
    return { ok: true, holeComplete: true, holeScore: strokes, name, nextHole: r.hole + 1, nextPar: next.par, nextDist: next.dist };
  }

  function finishRound() {
    const r = state.round;
    const total = r.holeStrokes.reduce((a, b) => a + b, 0);
    const diff = total - r.par;
    state.totalRounds++;
    state.roundsToday++;
    const record = { course: r.courseName, total, par: r.par, diff, day: getDay(), skins: r.skinsWon };
    if (!state.bestRound || total < state.bestRound.total) state.bestRound = { ...record };
    state.bestSkins = Math.max(state.bestSkins || 0, r.skinsWon);
    // Handicap update: good rounds lower it.
    if (diff <= 0) state.handicap = Math.max(-5, state.handicap - 2);
    else if (diff <= 5) state.handicap = Math.max(-5, state.handicap - 1);
    else if (diff >= 12) state.handicap = Math.min(36, state.handicap + 1);
    // Betting settlement.
    let winnings = 0;
    let betResult = null;
    if (r.opponent) {
      const oppTotal = r.opponentStrokes.reduce((a, b) => a + b, 0);
      if (r.betType === 'match') {
        if (total < oppTotal) { winnings = r.bet * 2; betResult = 'won'; }
        else if (total === oppTotal) { winnings = r.bet; betResult = 'push'; }
        else betResult = 'lost';
      } else if (r.betType === 'skins') {
        winnings = r.bet + r.skinsWon * 50;
        betResult = r.skinsWon > 0 ? 'won' : 'lost';
        if (r.skinsWon <= 0) winnings = 0;
      } else if (r.betType === 'nassau') {
        const front = r.holeStrokes.slice(0, 5).reduce((a, b) => a + b, 0) - r.opponentStrokes.slice(0, 5).reduce((a, b) => a + b, 0);
        const back = r.holeStrokes.slice(5).reduce((a, b) => a + b, 0) - r.opponentStrokes.slice(5).reduce((a, b) => a + b, 0);
        let wins = 0;
        if (front < 0) wins++;
        if (back < 0) wins++;
        if (total < oppTotal) wins++;
        winnings = wins * r.bet;
        betResult = wins > 0 ? 'won' : 'lost';
      }
      if (winnings > 0) {
        addCash(winnings);
        state.totalBetWon += winnings;
        state.totalEarned += winnings;
        state.matchWins++;
        state.beatOpponents[r.opponent.id] = (state.beatOpponents[r.opponent.id] || 0) + 1;
        log(`You beat ${r.opponent.name} ${total} vs ${oppTotal}! Won $${winnings}.`);
      } else {
        state.totalBetLost += r.bet;
        log(`Lost to ${r.opponent.name} ${total} vs ${oppTotal}. Bet $${r.bet} gone.`);
      }
    }
    state.round = null;
    refreshRank();
    checkMission('first-round');
    checkMission('under-par');
    checkMission('win-match');
    checkMission('beat-shark');
    checkMission('beat-champ');
    checkMission('skins-5');
    log(`Round complete at ${record.course}: ${total} (par ${r.par}, ${diff >= 0 ? '+' : ''}${diff}). Handicap now ${state.handicap}.`);
    return { ok: true, roundComplete: true, record, betResult, winnings };
  }

  function giveUpRound() {
    const r = state.round;
    if (!r) return { ok: false, error: 'no round in progress' };
    state.round = null;
    if (r.bet) state.totalBetLost += r.bet;
    log('Walked off the course. The bet is lost.');
    return { ok: true };
  }

  function enterTournament(tournamentId) {
    const t = GOLF_TOURNAMENTS.find((x) => x.id === tournamentId);
    if (!t) return { ok: false, error: 'unknown tournament' };
    const day = getDay();
    const dow = day % 7;
    if (dow !== t.dayOfWeek) return { ok: false, error: `${t.name} runs on day ${t.dayOfWeek} of the week (today is ${dow})` };
    if (getCash() < t.entry) return { ok: false, error: 'not enough cash for entry' };
    addCash(-t.entry);
    state.tournamentEntry = { id: t.id, day };
    log(`Entered ${t.name} ($${t.entry}). Purse $${t.purse} at ${COURSES.find((c) => c.id === t.courseId).name}.`);
    return { ok: true, tournament: t };
  }

  function settleTournament() {
    const entry = state.tournamentEntry;
    if (!entry) return { ok: false, error: 'not entered in a tournament' };
    const t = GOLF_TOURNAMENTS.find((x) => x.id === entry.id);
    // The field: 20 golfers with handicaps near yours.
    const myScore = state.bestRound ? state.bestRound.diff : 5;
    let beaten = 0;
    for (let i = 0; i < 20; i++) {
      const rivalDiff = Math.round((rng() + rng() + rng() - 1.5) * 6 + 2);
      if (myScore < rivalDiff) beaten++;
    }
    const place = 21 - beaten;
    const won = place === 1;
    const prize = won ? t.purse : place <= 3 ? Math.round(t.purse * 0.1) : place <= 10 ? Math.round(t.purse * 0.02) : 0;
    if (prize > 0) {
      addCash(prize);
      state.totalEarned += prize;
    }
    if (won) {
      state.tournamentWins++;
      checkMission('tournament-win');
    }
    state.tournamentEntry = null;
    log(`${t.name}: finished ${place}/21. ${won ? `CHAMPION! Prize $${prize}.` : prize ? `Prize $${prize}.` : 'No prize this time.'}`);
    return { ok: true, place, prize, won };
  }

  function missions() {
    return GOLF_MISSIONS.map((m) => ({ ...m, done: !!state.missionsDone[m.id] }));
  }

  function tick(dt) {
    const day = getDay();
    if (day !== state.day) {
      state.day = day;
      state.roundsToday = 0;
      if (state.tournamentEntry) settleTournament();
    }
  }

  function hudLine() {
    if (!state.round && state.totalRounds === 0) return '';
    if (!state.round) return `Golf ${rank().name} | handicap ${state.handicap} | best ${state.bestRound ? state.bestRound.total : '—'}`;
    const r = state.round;
    return `Golf ${r.courseName} hole ${r.hole + 1}/9 | ${Math.round(r.distanceLeft)}y left | ${r.lie} | strokes ${r.strokes}`;
  }

  function summary() {
    return {
      rank: state.rank,
      handicap: state.handicap,
      totalRounds: state.totalRounds,
      bestRound: state.bestRound,
      birdies: state.birdies,
      eagles: state.eagles,
      holeInOnes: state.holeInOnes,
      matchWins: state.matchWins,
      tournamentWins: state.tournamentWins,
      totalEarned: state.totalEarned,
      ballsLeft: state.ballsLeft,
      missionsDone: Object.keys(state.missionsDone).length,
    };
  }

  function serialize() {
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
  }

  function deserialize(s) {
    if (!s || typeof s !== 'object') return;
    for (const k of ['handicap', 'totalRounds', 'totalStrokes', 'totalHoles', 'birdies', 'eagles', 'holeInOnes', 'skinsWon', 'matchWins', 'tournamentWins', 'totalEarned', 'totalBetWon', 'totalBetLost', 'caddyLevel', 'ballsLeft']) {
      if (typeof s[k] === 'number') state[k] = s[k];
    }
    if (typeof s.rank === 'string') state.rank = s.rank;
    if (typeof s.ballId === 'string') state.ballId = s.ballId;
    if (Array.isArray(s.ballsOwned)) state.ballsOwned = [...s.ballsOwned];
    if (Array.isArray(s.clubsOwned)) state.clubsOwned = [...s.clubsOwned];
    if (s.bestRound) state.bestRound = { ...s.bestRound };
    if (s.missionsDone) state.missionsDone = { ...s.missionsDone };
    if (s.beatOpponents) state.beatOpponents = { ...s.beatOpponents };
  }

  return {
    state,
    buyBalls,
    hireCaddy,
    startRound,
    caddyRead,
    suggestClub,
    playShot,
    putt,
    giveUpRound,
    enterTournament,
    settleTournament,
    missions,
    tick,
    hudLine,
    summary,
    serialize,
    deserialize,
  };
}

// ---------------------------------------------------------------------------
// Extra reference data: famous golf quotes for the clubhouse wall
// ---------------------------------------------------------------------------

export const GOLF_QUOTES = [
  'Golf is a good walk spoiled. — Mark Twain',
  'The most important shot in golf is the next one. — Ben Hogan',
  'Golf is the closest game to the game we call life. — Bob (every clubhouse)',
  'Drive for show, putt for dough.',
  'It is not the club. It is never the club. (It was the club.)',
  'A bad day on the course beats a good day at the office.',
];


// ---------------------------------------------------------------------------
// Part 3 — Driving range, club fitting, course records, golf lore
// ---------------------------------------------------------------------------

// Driving range drills: practice targets with XP rewards.
export const RANGE_DRILLS = [
  { id: 'target-100', name: '100-Yard Target', dist: 100, xp: 10, desc: 'Land five balls inside the circle.' },
  { id: 'target-150', name: '150-Yard Target', dist: 150, xp: 15, desc: 'Mid-iron accuracy drill.' },
  { id: 'target-200', name: '200-Yard Target', dist: 200, xp: 20, desc: 'Long iron precision.' },
  { id: 'drive-250', name: '250-Yard Drive', dist: 250, xp: 25, desc: 'Carry it 250. Straight.' },
  { id: 'drive-300', name: '300-Yard Drive', dist: 300, xp: 40, desc: 'The big one. Pure power.' },
  { id: 'chip-20', name: '20-Yard Chip', dist: 20, xp: 10, desc: 'Soft hands around the green.' },
  { id: 'putt-10', name: '10-Foot Putt', dist: 10, xp: 10, desc: 'Ten putts, ten makes.' },
  { id: 'putt-30', name: '30-Foot Putt', dist: 30, xp: 20, desc: 'Lag it close. Two-putt max.' },
];

// Club fitting options: shafts and grips that tweak stats.
export const CLUB_FITTING = [
  { id: 'shaft-regular', name: 'Regular Shaft', price: 100, distBonus: 0, accBonus: 0.02, desc: 'Standard flex. Standard results.' },
  { id: 'shaft-stiff', name: 'Stiff Shaft', price: 200, distBonus: 0.03, accBonus: 0.03, desc: 'For fast swings. More control.' },
  { id: 'shaft-xstiff', name: 'X-Stiff Shaft', price: 350, distBonus: 0.05, accBonus: 0.02, desc: 'Tour-level stiffness.' },
  { id: 'grip-standard', name: 'Standard Grip', price: 50, distBonus: 0, accBonus: 0.01, desc: 'A fresh grip. Small difference, real feel.' },
  { id: 'grip-tacky', name: 'Tacky Grip', price: 80, distBonus: 0, accBonus: 0.03, desc: 'Stays put in the rain.' },
  { id: 'grip-oversize', name: 'Oversize Grip', price: 70, distBonus: 0, accBonus: 0.02, desc: 'Quiets the hands. Straighter putts.' },
];

// Course records: the numbers to beat.
export const COURSE_RECORDS = [
  { course: 'palms', record: 31, holder: 'Old Tom', note: 'Four under par. Never been beaten.' },
  { course: 'dunes', record: 33, holder: 'Club Pro Carla', note: 'In a gale. Nobody believes it.' },
  { course: 'lakes', record: 34, holder: 'Retired Champ', note: 'The day he won the Lakes Masters.' },
  { course: 'mountain', record: 35, holder: 'Kid Prodigy', note: 'Twelve years old. Thirty-five.' },
  { course: 'night', record: 32, holder: 'The Shark', note: 'Glow balls, midnight, thirty-two.' },
];

// Golf lore (flavour).
export const GOLF_LORE = [
  'The 19th hole is the bar. The real money moves there.',
  'Old Tom has played Palm Greens 4,000 times. He knows every blade of grass.',
  'The Shark once won a car on a single putt. He drove it home that night.',
  'The Lakes Masters trophy is older than the clubhouse.',
  'A hole in one buys drinks for the whole bar. Budget accordingly.',
];

// Putting green reads: slope hints.
export const GREEN_READS = [
  { slope: 'flat', read: 'Straight putt. Trust the line.' },
  { slope: 'sloped', read: 'Breaks toward the water. Play more break than you think.' },
  { slope: 'fast', read: 'Fast green. Barely touch it.' },
];

// Caddy levels and what they unlock.
export const CADDY_LEVELS = [
  { level: 1, name: 'Bag Carrier', desc: 'Carries the bag. That is all.' },
  { level: 2, name: 'Yardage Reader', desc: 'Gives distances. Mostly right.' },
  { level: 3, name: 'Green Reader', desc: 'Reads greens and wind.' },
  { level: 4, name: 'Strategist', desc: 'Picks clubs and lines. Rarely wrong.' },
  { level: 5, name: 'Tour Caddy', desc: 'The full package. Worth every dollar.' },
];

// Pure helpers.

export function drillResult(drill, power, accuracy, rng) {
  const err = Math.abs(power - 0.8) * 40 + (1 - accuracy) * 30;
  const hit = rng() * 50 + err < 35;
  return { hit, xp: hit ? drill.xp : Math.floor(drill.xp / 2), err: Math.round(err) };
}

export function handicapFromRounds(rounds) {
  if (rounds.length === 0) return 28;
  const diffs = rounds.map((r) => r.diff);
  const avg = diffs.reduce((a, b) => a + b, 0) / diffs.length;
  return Math.max(-5, Math.min(36, Math.round(18 + avg)));
}

export function courseRecordFor(courseId) {
  return COURSE_RECORDS.find((r) => r.course === courseId) || null;
}

export function isCourseRecord(courseId, total) {
  const rec = courseRecordFor(courseId);
  return rec ? total < rec.record : false;
}

export function skinsPayout(skinsWon, perSkin) {
  return skinsWon * (perSkin || 50);
}

export function nassauPayout(frontDiff, backDiff, overallDiff, bet) {
  let wins = 0;
  if (frontDiff < 0) wins++;
  if (backDiff < 0) wins++;
  if (overallDiff < 0) wins++;
  return wins * bet;
}

export function puttMakeChance(distanceFt, skill, green) {
  const base = distanceFt <= 3 ? 0.95 : distanceFt <= 6 ? 0.8 : distanceFt <= 10 ? 0.6 : distanceFt <= 20 ? 0.35 : 0.15;
  const greenMult = green === 'fast' ? 0.9 : 1;
  return Math.max(0.05, Math.min(0.99, base * skill * greenMult));
}

export function driveDistance(club, power, ball, weather) {
  const w = GOLF_WEATHER.find((x) => x.weather === weather) || GOLF_WEATHER[0];
  return Math.round(club.maxDist * power * (1 + ball.distBonus) * w.distMult);
}

export function opponentExpectedScore(par, skill) {
  return Math.round(par + (3 - skill) * 0.4 * 9);
}

export function rankForHandicap(handicap) {
  let best = GOLF_RANKS[0];
  for (const r of GOLF_RANKS) if (handicap <= r.handicapMax) best = r;
  return best;
}

export function tournamentPurseFor(place, purse) {
  if (place === 1) return purse;
  if (place <= 3) return Math.round(purse * 0.1);
  if (place <= 10) return Math.round(purse * 0.02);
  return 0;
}

export function caddyAdviceForLevel(level, rng) {
  const pool = CADDY_TIPS.slice(0, level + 2);
  return pool[Math.floor(rng() * pool.length)];
}

export function greenReadFor(green) {
  const row = GREEN_READS.find((g) => g.slope === green);
  return row ? row.read : 'Read it yourself.';
}


// ---------------------------------------------------------------------------
// Part 4 — Pro shop, famous holes, golf slang, clubhouse menu
// ---------------------------------------------------------------------------

// Pro shop stock.
export const PRO_SHOP = [
  { id: 'glove', name: 'Golf Glove', price: 25, desc: 'Grip. Comfort. No blisters.' },
  { id: 'shoes', name: 'Golf Shoes', price: 120, desc: 'Spikes for wet mornings.' },
  { id: 'cap', name: 'Club Cap', price: 30, desc: 'Sun out of your eyes.' },
  { id: 'towel', name: 'Club Towel', price: 15, desc: 'Clean clubs, clean contact.' },
  { id: 'teas', name: 'Tee Pack', price: 10, desc: 'A hundred tees. Lose them slowly.' },
  { id: 'rangefinder', name: 'Rangefinder', price: 300, desc: 'Exact distances. No guessing.' },
  { id: 'bag', name: 'Stand Bag', price: 200, desc: 'Light, with legs that work.' },
  { id: 'umbrella', name: 'Golf Umbrella', price: 40, desc: 'Rain happens. Stay dry.' },
];

// Famous holes (flavour).
export const FAMOUS_HOLES = [
  { course: 'palms', hole: 2, name: 'The Island Green', note: 'Water all around. Bring a spare ball.' },
  { course: 'dunes', hole: 3, name: 'The Dune', note: 'Blind tee shot over a dune.' },
  { course: 'lakes', hole: 6, name: 'The Lake', note: 'Carry 190 yards of water or go home.' },
  { course: 'mountain', hole: 5, name: 'The Drop', note: 'Downhill 200 feet. The ball flies forever.' },
  { course: 'night', hole: 9, name: 'The Glow', note: 'Glow ball, neon green, midnight.' },
];

// Golf slang (flavour).
export const GOLF_SLANG = [
  'A "duff" is a terrible shot. We all duff sometimes.',
  'A "shank" is a shot off the hosel. Do not say the word on the course.',
  'A "fried egg" is a ball buried in sand.',
  'A "gimme" is a putt so short your opponent gives it to you.',
  'A "mulligan" is a do-over. One per round, if your friends are kind.',
  'A "sandbagger" is somebody who plays worse than they are — until money is on the line.',
  'The "19th hole" is the bar.',
];

// Clubhouse menu (flavour).
export const CLUBHOUSE_MENU = [
  { item: 'Club Sandwich', price: 12, desc: 'The classic. Triple decker.' },
  { item: 'Burger', price: 15, desc: 'After a round, nothing else matters.' },
  { item: 'Lemonade', price: 5, desc: 'Cold, sweet, perfect.' },
  { item: 'Beer', price: 7, desc: 'One beer. Maybe two.' },
];

// Pure helpers.

export function proShopPrice(itemId) {
  const item = PRO_SHOP.find((x) => x.id === itemId);
  return item ? item.price : 0;
}

export function famousHoleFor(courseId, holeNum) {
  return FAMOUS_HOLES.find((h) => h.course === courseId && h.hole === holeNum) || null;
}

export function clubhouseTotal(items) {
  return items.reduce((sum, id) => {
    const item = CLUBHOUSE_MENU.find((x) => x.item === id);
    return sum + (item ? item.price : 0);
  }, 0);
}

export function slangMeaning(term) {
  const row = GOLF_SLANG.find((s) => s.toLowerCase().includes(term.toLowerCase()));
  return row || 'No slang for that. Ask Old Tom.';
}


// ---------------------------------------------------------------------------
// Part 5 — Famous golfers, golf rules, golf films
// ---------------------------------------------------------------------------

export const FAMOUS_GOLFERS = [
  { name: 'Tiger Woods', note: '15 majors. The greatest of his generation.' },
  { name: 'Jack Nicklaus', note: '18 majors. The Golden Bear.' },
  { name: 'Arnold Palmer', note: 'The King. Made golf famous.' },
  { name: 'Annika Sorenstam', note: '10 majors. The greatest woman golfer.' },
];

export const GOLF_RULES = [
  'Play the ball as it lies.',
  'Count every stroke. Honesty is the game.',
  'Repair your divots and ball marks.',
  'Let faster groups play through.',
  'Silence while others putt.',
];

export const GOLF_FILMS = [
  { title: 'Caddyshack', year: 1980, note: 'The funniest golf film ever made.' },
  { title: 'Happy Gilmore', year: 1996, note: 'A hockey player becomes a golfer.' },
  { title: 'Tin Cup', year: 1996, note: 'Go for it. Always go for it.' },
];

export function golferForName(name) {
  return FAMOUS_GOLFERS.find((g) => g.name.toLowerCase().includes(name.toLowerCase())) || null;
}

export function golfRuleFor(index) {
  return GOLF_RULES[index % GOLF_RULES.length];
}

export function filmForYearGolf(year) {
  return GOLF_FILMS.find((f) => f.year === year) || null;
}


// ---------------------------------------------------------------------------
// Part 6 — Golfer nicknames, golf mottos
// ---------------------------------------------------------------------------

export const GOLFER_NICKNAMES = [
  'The Shark',
  'The Hawk',
  'Lefty',
  'The Professor',
  'Big Easy',
  'The Kid',
];

export const GOLF_MOTTOS = [
  'Drive for show, putt for dough.',
  'The most important shot is the next one.',
  'Golf is a good walk spoiled — and worth every step.',
  'Par is a good score. Birdie is a great day.',
];

export function randomGolferNickname(rng) {
  return GOLFER_NICKNAMES[Math.floor(rng() * GOLFER_NICKNAMES.length)];
}

export function golfMottoFor(index) {
  return GOLF_MOTTOS[index % GOLF_MOTTOS.length];
}


// ---------------------------------------------------------------------------
// Part 7 — Golf proverbs, famous rounds
// ---------------------------------------------------------------------------

export const GOLF_PROVERBS = [
  'Golf is 90% mental and 10% mental.',
  'The ball does not know how old you are.',
  'A hole in one is luck. A round under par is skill.',
  'Miss the ball, miss the day. Hit the ball, own the day.',
];

export const FAMOUS_ROUNDS = [
  { round: 'The 59', player: 'Al Geiberger', year: 1977, note: 'The first 59 on tour.' },
  { round: 'The Duel in the Sun', player: 'Watson vs Nicklaus', year: 1977, note: 'The greatest duel in golf.' },
  { round: 'Tiger Slam', player: 'Tiger Woods', year: 2001, note: 'All four majors at once.' },
];

export function proverbGolf(index) {
  return GOLF_PROVERBS[index % GOLF_PROVERBS.length];
}

export function famousRoundFor(name) {
  return FAMOUS_ROUNDS.find((r) => r.round === name) || null;
}
