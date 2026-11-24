// Solara Nights — Tennis (Round 7b-B, written fresh).
// The Solara Bay Tennis Club runs public courts from dawn to midnight:
// practice rallies to sharpen serve and footwork, ranked ladder matches
// against ten local rivals, and six tournaments from the Beach Open to
// the Crown Cup. Points are played shot by shot — flat, topspin, slice,
// lob, drop shot, volley, smash and the risky ace serve — each with its
// own win chance, stamina cost and crowd thrill. Win sets, climb the
// ladder, sign sponsors, buy better rackets, and mind the stamina bar:
// a tired player double-faults at the worst moment. Rain stops play.
// Pure logic: no rendering, no imports. Wired through the standard ctx
// { rng, getDay, getHour, getCash, addCash, addHeat, log, getPlayerPos,
// getSpeed } and driven by tick/tickDay from the main loop.

export const TENNIS_COURTS = [
  { id: 'beach', name: 'Beach Courts', surface: 'sand', speed: 0.8, fee: 0, desc: 'Public sand courts by the surf. Slow, free, windy.' },
  { id: 'park', name: 'Park Courts', surface: 'hard', speed: 1.0, fee: 10, desc: 'Cracked municipal hard courts, floodlit at night.' },
  { id: 'club', name: 'Bay Club', surface: 'clay', speed: 0.9, fee: 25, desc: 'Red clay, white lines, members watching.' },
  { id: 'rooftop', name: 'Rooftop Court', surface: 'hard', speed: 1.1, fee: 40, desc: 'Above the marina, fast balls and sea breeze.' },
  { id: 'arena', name: 'Solara Arena', surface: 'hard', speed: 1.15, fee: 60, desc: 'The show court. Crowds, cameras, pressure.' },
  { id: 'grass', name: 'Old Grass Club', surface: 'grass', speed: 1.25, fee: 50, desc: 'Slick grass, low bounces, old money.' },
  { id: 'indoor', name: 'Indoor Dome', surface: 'carpet', speed: 1.05, fee: 45, desc: 'No wind, no rain, perfect light.' },
  { id: 'school', name: 'School Yard', surface: 'asphalt', speed: 0.95, fee: 5, desc: 'Asphalt after classes. Kids heckle from the fence.' },
];

export const TENNIS_RACKETS = [
  { id: 'wood', name: 'Wooden Classic', cost: 0, power: 50, control: 70, spin: 40, weight: 90, desc: 'The starter racket from the club lost-and-found.' },
  { id: 'alu', name: 'Alu 300', cost: 120, power: 62, control: 66, spin: 48, weight: 75, desc: 'Light alloy, honest all-rounder.' },
  { id: 'graph', name: 'Graphite Pro', cost: 300, power: 74, control: 72, spin: 60, weight: 65, desc: 'Stiff frame, big sweet spot.' },
  { id: 'carbon', name: 'Carbon X9', cost: 650, power: 84, control: 78, spin: 72, weight: 58, desc: 'Tournament frame, whips through the ball.' },
  { id: 'titan', name: 'Titanium Ace', cost: 1100, power: 90, control: 82, spin: 78, weight: 55, desc: 'The racket the pros actually use.' },
  { id: 'vintage', name: 'Vintage Slaz', cost: 220, power: 55, control: 88, spin: 52, weight: 85, desc: 'Old wood, absurd control, no power.' },
  { id: 'spin', name: 'Spin Doctor', cost: 480, power: 68, control: 70, spin: 95, weight: 62, desc: 'Open string pattern, vicious topspin.' },
  { id: 'power', name: 'Sledgehammer', cost: 800, power: 98, control: 55, spin: 50, weight: 80, desc: 'Pure power. Control is your problem.' },
];

export const TENNIS_SHOES = [
  { id: 'sneakers', name: 'Street Sneakers', cost: 0, speed: 50, grip: 50, desc: 'Whatever you walked in wearing.' },
  { id: 'court', name: 'Court Classics', cost: 90, speed: 62, grip: 66, desc: 'Proper court shoes, no more sliding.' },
  { id: 'clay', name: 'Clay Sliders', cost: 160, speed: 68, grip: 80, desc: 'Built to slide and stop on clay.' },
  { id: 'pro', name: 'Pro Sprints', cost: 320, speed: 88, grip: 84, desc: 'Feather light, glued to the court.' },
];

export const TENNIS_SHOTS = [
  { id: 'flat', name: 'Flat Drive', winBase: 0.52, stamina: 6, thrill: 1, risk: 0.1, desc: 'Hard and straight down the line.' },
  { id: 'topspin', name: 'Topspin Loop', winBase: 0.55, stamina: 7, thrill: 1, risk: 0.08, desc: 'Heavy spin, dips inside the line.' },
  { id: 'slice', name: 'Slice', winBase: 0.5, stamina: 4, thrill: 1, risk: 0.06, desc: 'Low skidding ball, buys time.' },
  { id: 'lob', name: 'Lob', winBase: 0.46, stamina: 5, thrill: 2, risk: 0.14, desc: 'Over their head when they charge in.' },
  { id: 'drop', name: 'Drop Shot', winBase: 0.48, stamina: 3, thrill: 3, risk: 0.2, desc: 'Dies just over the net. Crowd gasps.' },
  { id: 'volley', name: 'Volley', winBase: 0.54, stamina: 5, thrill: 2, risk: 0.12, desc: 'Punch it away at the net.' },
  { id: 'smash', name: 'Overhead Smash', winBase: 0.62, stamina: 8, thrill: 3, risk: 0.16, desc: 'Put the lob away. Loud.' },
  { id: 'aceserve', name: 'Ace Serve', winBase: 0.4, stamina: 9, thrill: 3, risk: 0.3, desc: 'Flat out wide. Ace or double fault.' },
];

export const TENNIS_OPPONENTS = [
  { id: 'mia', name: 'Mia Torres', rank: 12, skill: 52, style: 'baseliner', stamina: 70, weakness: 'lob', desc: 'Steady from the back, hates lobs.' },
  { id: 'leo', name: 'Leo Fontaine', rank: 11, skill: 58, style: 'serve-volley', stamina: 65, weakness: 'topspin', desc: 'Charges the net on every point.' },
  { id: 'ana', name: 'Ana Petrova', rank: 10, skill: 63, style: 'counter', stamina: 78, weakness: 'drop', desc: 'Gets everything back. Twice.' },
  { id: 'dario', name: 'Dario Kim', rank: 9, skill: 68, style: 'power', stamina: 72, weakness: 'slice', desc: 'Hits the cover off the ball.' },
  { id: 'sofia', name: 'Sofia Marchetti', rank: 8, skill: 72, style: 'all-court', stamina: 80, weakness: 'aceserve', desc: 'No weakness, except the big serve.' },
  { id: 'omar', name: 'Omar Haddad', rank: 7, skill: 76, style: 'baseliner', stamina: 84, weakness: 'volley', desc: 'Grinds for hours, never tires.' },
  { id: 'elsa', name: 'Elsa Novak', rank: 6, skill: 80, style: 'spin', stamina: 76, weakness: 'flat', desc: 'Topspin that kicks over your head.' },
  { id: 'kenji', name: 'Kenji Sato', rank: 5, skill: 84, style: 'serve-volley', stamina: 70, weakness: 'lob', desc: 'A serve like a gunshot.' },
  { id: 'nina', name: 'Nina Volkov', rank: 4, skill: 88, style: 'power', stamina: 82, weakness: 'drop', desc: 'Number four, hits winners for fun.' },
  { id: 'crown', name: 'Rafael Crown', rank: 1, skill: 95, style: 'all-court', stamina: 90, weakness: 'slice', desc: 'The champion. Beat him and the city is yours.' },
];

export const TENNIS_TOURNAMENTS = [
  { id: 'beach-open', name: 'Beach Open', entry: 0, rounds: 3, prize: 300, minRank: 12, surface: 'sand', desc: 'Open draw on the sand courts.' },
  { id: 'park-cup', name: 'Park Cup', entry: 50, rounds: 3, prize: 600, minRank: 11, surface: 'hard', desc: 'The municipal classic under lights.' },
  { id: 'clay-classic', name: 'Clay Classic', entry: 100, rounds: 4, prize: 1200, minRank: 9, surface: 'clay', desc: 'Long rallies, red dust, patience.' },
  { id: 'grass-invite', name: 'Grass Invitational', entry: 200, rounds: 4, prize: 2500, minRank: 7, surface: 'grass', desc: 'Invite only, white clothes, fast grass.' },
  { id: 'arena-masters', name: 'Arena Masters', entry: 400, rounds: 5, prize: 5000, minRank: 5, surface: 'hard', desc: 'The big indoor show, cameras everywhere.' },
  { id: 'crown-cup', name: 'Crown Cup', entry: 800, rounds: 5, prize: 12000, minRank: 3, surface: 'hard', desc: 'The title that matters. Rafael waits.' },
];

export const TENNIS_TRAINING = [
  { id: 'serve', name: 'Serve Practice', cost: 0, xp: 12, stamina: 10, skill: 'serve', desc: 'A basket of balls and the service line.' },
  { id: 'rally', name: 'Rally Drills', cost: 0, xp: 12, stamina: 12, skill: 'rally', desc: 'Cross-court until your legs burn.' },
  { id: 'footwork', name: 'Footwork Ladder', cost: 0, xp: 10, stamina: 14, skill: 'speed', desc: 'Ladders, cones, sprints, repeat.' },
  { id: 'fitness', name: 'Court Fitness', cost: 20, xp: 14, stamina: 18, skill: 'stamina', desc: 'Sprints and weights with the club coach.' },
  { id: 'coach', name: 'Private Coach', cost: 120, xp: 40, stamina: 15, skill: 'all', desc: 'An hour with ex-pro Dana Cole.' },
  { id: 'video', name: 'Video Analysis', cost: 60, xp: 25, stamina: 0, skill: 'tactics', desc: 'Study your last match frame by frame.' },
];

export const TENNIS_RANKS = [
  { level: 0, name: 'Club Newcomer', xp: 0, ladder: 12, perk: 'Beach Open unlocked.' },
  { level: 1, name: 'Court Regular', xp: 150, ladder: 10, perk: 'Ladder matches pay more.' },
  { level: 2, name: 'Rising Talent', xp: 400, ladder: 8, perk: 'Clay Classic unlocked.' },
  { level: 3, name: 'City Contender', xp: 800, ladder: 5, perk: 'Arena Masters unlocked.' },
  { level: 4, name: 'Solara Champion', xp: 1500, ladder: 1, perk: 'Crown Cup unlocked.' },
];

export const TENNIS_SPONSORS = [
  { id: 'stringco', name: 'StringCo', pay: 120, need: 'matches', goal: 5, desc: '$120 per 5 matches played.' },
  { id: 'baywater', name: 'Bay Water', pay: 200, need: 'wins', goal: 3, desc: '$200 per 3 match wins.' },
  { id: 'solara-tv', name: 'Solara TV', pay: 400, need: 'titles', goal: 1, desc: '$400 per tournament title.' },
  { id: 'voltcorp', name: 'VoltCorp', pay: 300, need: 'aces', goal: 20, desc: '$300 per 20 aces served.' },
];

export function tennisRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < TENNIS_RANKS.length; i++) {
    if (xp >= TENNIS_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function tennisPointLabel(points) {
  return ['0', '15', '30', '40'][Math.min(points, 3)];
}

export function tennisGameScore(p, o) {
  if (p >= 3 && o >= 3) {
    if (p === o) return 'deuce';
    if (p === o + 1) return 'advantage you';
    if (o === p + 1) return 'advantage opponent';
  }
  return `${tennisPointLabel(p)}-${tennisPointLabel(o)}`;
}

export function tennisShotWinChance(shot, racket, shoes, playerSkill, oppSkill, stamina01, surfaceSpeed) {
  const powerFactor = (racket.power - 50) / 200;
  const controlFactor = (racket.control - 50) / 300;
  const speedFactor = (shoes.speed - 50) / 400;
  const skillGap = (playerSkill - oppSkill) / 200;
  let chance = shot.winBase + powerFactor + controlFactor + speedFactor + skillGap;
  chance *= surfaceSpeed;
  chance *= 0.75 + stamina01 * 0.35;
  return Math.max(0.05, Math.min(0.95, chance));
}

export function tennisMatchPrize(opponent, rank, isTournament) {
  const base = 40 + opponent.skill * 2;
  const rankBonus = 1 + rank * 0.1;
  return Math.round(base * rankBonus * (isTournament ? 1.5 : 1));
}

export function createTennisSystem(ctx) {
  const c = ctx || {};
  const rng = typeof c.rng === 'function' ? c.rng : Math.random;
  const getCash = typeof c.getCash === 'function' ? c.getCash : () => 0;
  const addCash = typeof c.addCash === 'function' ? c.addCash : () => {};
  const addHeat = typeof c.addHeat === 'function' ? c.addHeat : () => {};
  const log = typeof c.log === 'function' ? c.log : () => {};
  const getDay = typeof c.getDay === 'function' ? c.getDay : () => 1;
  const getHour = typeof c.getHour === 'function' ? c.getHour : () => 12;
  const getPos = typeof c.getPlayerPos === 'function' ? c.getPlayerPos : () => ({ x: 0, z: 0 });

  const state = {
    xp: 0,
    rank: 0,
    ladder: 12,
    serve: 50,
    rally: 50,
    speed: 50,
    stamina: 70,
    tactics: 50,
    staminaNow: 100,
    ownedRackets: ['wood'],
    racket: 'wood',
    ownedShoes: ['sneakers'],
    shoes: 'sneakers',
    matchesPlayed: 0,
    matchesWon: 0,
    setsWon: 0,
    gamesWon: 0,
    pointsWon: 0,
    aces: 0,
    doubleFaults: 0,
    titles: 0,
    finalsLost: 0,
    earned: 0,
    spent: 0,
    match: null,
    tournament: null,
    tourneyRound: 0,
    tourneyWins: 0,
    sponsors: [],
    sponsorProgress: {},
    practiceToday: 0,
    bestWinStreak: 0,
    winStreak: 0,
    rainDelay: false,
    lastDay: 1,
    dailyMatches: 0,
    beaten: {},
    rivalries: {},
    crowdFav: 0,
    injuries: 0,
    restDays: 0,
  };

  function refreshRank() {
    const r = tennisRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      state.ladder = Math.min(state.ladder, TENNIS_RANKS[r].ladder);
      log(`Tennis rank up: ${TENNIS_RANKS[r].name} — ladder #${state.ladder}.`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function playerSkill() {
    return Math.round((state.serve + state.rally + state.speed + state.tactics) / 4);
  }

  function currentRacket() {
    return TENNIS_RACKETS.find((r) => r.id === state.racket) || TENNIS_RACKETS[0];
  }

  function currentShoes() {
    return TENNIS_SHOES.find((s) => s.id === state.shoes) || TENNIS_SHOES[0];
  }

  function currentCourt() {
    if (!state.match) return TENNIS_COURTS[0];
    return TENNIS_COURTS.find((x) => x.id === state.match.court) || TENNIS_COURTS[0];
  }

  function buyRacket(id) {
    const r = TENNIS_RACKETS.find((x) => x.id === id);
    if (!r) return { ok: false, reason: 'no-such-racket' };
    if (state.ownedRackets.includes(id)) return { ok: false, reason: 'already-owned' };
    if (getCash() < r.cost) return { ok: false, reason: 'not-enough-cash', cost: r.cost };
    addCash(-r.cost);
    state.spent += r.cost;
    state.ownedRackets.push(id);
    gainXp(15);
    log(`Bought the ${r.name} for $${r.cost}.`);
    return { ok: true, id };
  }

  function selectRacket(id) {
    if (!state.ownedRackets.includes(id)) return { ok: false, reason: 'not-owned' };
    state.racket = id;
    return { ok: true, id, racket: currentRacket() };
  }

  function buyShoes(id) {
    const s = TENNIS_SHOES.find((x) => x.id === id);
    if (!s) return { ok: false, reason: 'no-such-shoes' };
    if (state.ownedShoes.includes(id)) return { ok: false, reason: 'already-owned' };
    if (getCash() < s.cost) return { ok: false, reason: 'not-enough-cash', cost: s.cost };
    addCash(-s.cost);
    state.spent += s.cost;
    state.ownedShoes.push(id);
    gainXp(10);
    log(`Bought ${s.name} for $${s.cost}.`);
    return { ok: true, id };
  }

  function selectShoes(id) {
    if (!state.ownedShoes.includes(id)) return { ok: false, reason: 'not-owned' };
    state.shoes = id;
    return { ok: true, id };
  }

  function train(trainingId) {
    const t = TENNIS_TRAINING.find((x) => x.id === trainingId);
    if (!t) return { ok: false, reason: 'no-such-training' };
    if (state.staminaNow < t.stamina + 5) return { ok: false, reason: 'too-tired', stamina: Math.round(state.staminaNow) };
    if (getCash() < t.cost) return { ok: false, reason: 'not-enough-cash', cost: t.cost };
    if (state.practiceToday >= 6) return { ok: false, reason: 'practice-cap' };
    addCash(-t.cost);
    state.spent += t.cost;
    state.staminaNow -= t.stamina;
    state.practiceToday += 1;
    const gain = t.xp;
    gainXp(gain);
    if (t.skill === 'serve') state.serve = Math.min(99, state.serve + 2);
    else if (t.skill === 'rally') state.rally = Math.min(99, state.rally + 2);
    else if (t.skill === 'speed') state.speed = Math.min(99, state.speed + 2);
    else if (t.skill === 'stamina') state.stamina = Math.min(99, state.stamina + 2);
    else if (t.skill === 'tactics') state.tactics = Math.min(99, state.tactics + 2);
    else if (t.skill === 'all') {
      state.serve = Math.min(99, state.serve + 1);
      state.rally = Math.min(99, state.rally + 1);
      state.speed = Math.min(99, state.speed + 1);
      state.tactics = Math.min(99, state.tactics + 1);
    }
    return { ok: true, id: trainingId, xp: gain, skill: playerSkill() };
  }

  function startMatch(opponentId, courtId) {
    const opp = TENNIS_OPPONENTS.find((o) => o.id === opponentId);
    if (!opp) return { ok: false, reason: 'no-such-opponent' };
    if (state.match) return { ok: false, reason: 'match-active' };
    if (state.staminaNow < 25) return { ok: false, reason: 'too-tired', stamina: Math.round(state.staminaNow) };
    if (state.rainDelay) return { ok: false, reason: 'rain-delay' };
    const court = TENNIS_COURTS.find((x) => x.id === (courtId || 'park')) || TENNIS_COURTS[1];
    if (getCash() < court.fee) return { ok: false, reason: 'not-enough-cash', cost: court.fee };
    addCash(-court.fee);
    state.spent += court.fee;
    state.match = {
      opponent: opponentId, court: court.id, points: 0, oppPoints: 0,
      games: 0, oppGames: 0, sets: 0, oppSets: 0, serving: true,
      log: [], tournament: !!state.tournament,
    };
    log(`Match started vs ${opp.name} on ${court.name} (${court.surface}).`);
    return { ok: true, opponent: opponentId, court: court.id };
  }

  function playPoint(shotId) {
    if (!state.match) return { ok: false, reason: 'no-match' };
    const shot = TENNIS_SHOTS.find((s) => s.id === shotId);
    if (!shot) return { ok: false, reason: 'no-such-shot' };
    const opp = TENNIS_OPPONENTS.find((o) => o.id === state.match.opponent);
    const court = currentCourt();
    const stamina01 = state.staminaNow / 100;
    let chance = tennisShotWinChance(shot, currentRacket(), currentShoes(), playerSkill(), opp.skill, stamina01, court.speed);
    if (shot.id === opp.weakness) chance += 0.12;
    if (shot.id === 'aceserve' && state.match.serving) chance += 0.05;
    chance = Math.max(0.05, Math.min(0.95, chance));
    state.staminaNow = Math.max(0, state.staminaNow - shot.stamina * (100 / state.stamina));
    const won = rng() < chance;
    let ace = false;
    let df = false;
    if (shot.id === 'aceserve' && state.match.serving) {
      if (won && rng() < 0.4) { ace = true; state.aces += 1; }
      if (!won && rng() < 0.3) { df = true; state.doubleFaults += 1; }
    }
    if (won) { state.match.points += 1; state.pointsWon += 1; }
    else state.match.oppPoints += 1;
    state.match.log.push({ shot: shotId, won, ace, df });
    if (state.match.log.length > 40) state.match.log.shift();
    const gameResult = checkGame();
    return {
      ok: true, won, ace, doubleFault: df, chance: Math.round(chance * 100) / 100,
      score: tennisGameScore(state.match.points, state.match.oppPoints),
      games: `${state.match.games}-${state.match.oppGames}`,
      sets: `${state.match.sets}-${state.match.oppSets}`,
      gameResult, stamina: Math.round(state.staminaNow),
    };
  }

  function checkGame() {
    const m = state.match;
    if (!m) return null;
    const p = m.points;
    const o = m.oppPoints;
    if ((p >= 4 || o >= 4) && Math.abs(p - o) >= 2) {
      const iWon = p > o;
      if (iWon) { m.games += 1; state.gamesWon += 1; }
      else m.oppGames += 1;
      m.points = 0;
      m.oppPoints = 0;
      m.serving = !m.serving;
      const setResult = checkSet();
      return { game: iWon ? 'you' : 'opponent', setResult };
    }
    return null;
  }

  function checkSet() {
    const m = state.match;
    if (!m) return null;
    const g = m.games;
    const o = m.oppGames;
    if ((g >= 6 || o >= 6) && Math.abs(g - o) >= 2) {
      const iWon = g > o;
      if (iWon) { m.sets += 1; state.setsWon += 1; }
      else m.oppSets += 1;
      m.games = 0;
      m.oppGames = 0;
      const matchResult = checkMatch();
      return { set: iWon ? 'you' : 'opponent', matchResult };
    }
    return null;
  }

  function checkMatch() {
    const m = state.match;
    if (!m) return null;
    if (m.sets >= 2 || m.oppSets >= 2) {
      const iWon = m.sets > m.oppSets;
      return finishMatch(iWon);
    }
    return null;
  }

  function finishMatch(iWon) {
    const m = state.match;
    const opp = TENNIS_OPPONENTS.find((o) => o.id === m.opponent);
    const isTourney = !!m.tournament;
    state.match = null;
    state.matchesPlayed += 1;
    state.dailyMatches += 1;
    state.staminaNow = Math.max(10, state.staminaNow - 15);
    if (iWon) {
      state.matchesWon += 1;
      state.winStreak += 1;
      state.bestWinStreak = Math.max(state.bestWinStreak, state.winStreak);
      state.beaten[opp.id] = (state.beaten[opp.id] || 0) + 1;
      state.rivalries[opp.id] = (state.rivalries[opp.id] || 0) + 1;
      state.ladder = Math.max(1, Math.min(state.ladder, opp.rank));
      if (opp.rank < state.ladder) state.ladder = opp.rank;
      const prize = tennisMatchPrize(opp, state.rank, isTourney);
      state.earned += prize;
      addCash(prize);
      gainXp(40);
      state.crowdFav += 2;
      log(`You beat ${opp.name} ${m.sets}-${m.oppSets}! Ladder #${state.ladder}, $${prize}.`);
      if (state.tournament) tourneyMatchWon();
      checkSponsors();
      return { match: 'won', sets: `${m.sets}-${m.oppSets}`, prize };
    }
    state.winStreak = 0;
    gainXp(12);
    if (state.tournament) tourneyMatchLost();
    log(`Lost to ${opp.name} ${m.sets}-${m.oppSets}. The crowd still claps.`);
    return { match: 'lost', sets: `${m.sets}-${m.oppSets}`, prize: 0 };
  }

  function forfeitMatch() {
    if (!state.match) return { ok: false, reason: 'no-match' };
    const opp = TENNIS_OPPONENTS.find((o) => o.id === state.match.opponent);
    state.match = null;
    state.matchesPlayed += 1;
    state.dailyMatches += 1;
    state.winStreak = 0;
    log(`Match vs ${opp.name} forfeited.`);
    return { ok: true };
  }

  function enterTournament(id) {
    const t = TENNIS_TOURNAMENTS.find((x) => x.id === id);
    if (!t) return { ok: false, reason: 'no-such-tournament' };
    if (state.tournament) return { ok: false, reason: 'tournament-active' };
    if (state.ladder > t.minRank) return { ok: false, reason: 'ladder-too-low', need: t.minRank, ladder: state.ladder };
    if (getCash() < t.entry) return { ok: false, reason: 'not-enough-cash', cost: t.entry };
    addCash(-t.entry);
    state.spent += t.entry;
    state.tournament = { ...t };
    state.tourneyRound = 1;
    state.tourneyWins = 0;
    log(`Entered the ${t.name} — ${t.rounds} rounds, $${t.prize} to the winner.`);
    return { ok: true, tournament: id, rounds: t.rounds };
  }

  function tourneyNextOpponent() {
    if (!state.tournament) return { ok: false, reason: 'no-tournament' };
    const pool = TENNIS_OPPONENTS.filter((o) => o.rank >= state.ladder - 2 && o.rank <= state.ladder + 4);
    const pick = pool[Math.floor(rng() * pool.length)] || TENNIS_OPPONENTS[0];
    const courtId = state.tournament.surface === 'sand' ? 'beach' : state.tournament.surface === 'clay' ? 'club' : state.tournament.surface === 'grass' ? 'grass' : 'arena';
    return startMatch(pick.id, courtId);
  }

  function tourneyMatchWon() {
    if (!state.tournament) return;
    state.tourneyWins += 1;
    if (state.tourneyWins >= state.tournament.rounds) {
      const prize = state.tournament.prize;
      state.titles += 1;
      state.earned += prize;
      addCash(prize);
      gainXp(200);
      log(`TOURNAMENT CHAMPION: ${state.tournament.name}! $${prize} and the trophy.`);
      state.tournament = null;
      state.tourneyRound = 0;
      state.tourneyWins = 0;
      checkSponsors();
    } else {
      state.tourneyRound += 1;
      log(`Through to round ${state.tourneyRound} of the ${state.tournament.name}.`);
    }
  }

  function tourneyMatchLost() {
    if (!state.tournament) return;
    state.finalsLost += 1;
    log(`Out of the ${state.tournament.name} in round ${state.tourneyRound}.`);
    state.tournament = null;
    state.tourneyRound = 0;
    state.tourneyWins = 0;
  }

  function signSponsor(id) {
    const s = TENNIS_SPONSORS.find((x) => x.id === id);
    if (!s) return { ok: false, reason: 'no-such-sponsor' };
    if (state.sponsors.includes(id)) return { ok: false, reason: 'already-signed' };
    if (state.rank < 1 && s.id !== 'stringco') return { ok: false, reason: 'rank-too-low' };
    state.sponsors.push(id);
    state.sponsorProgress[id] = 0;
    log(`Sponsor signed: ${s.name} — ${s.desc}`);
    return { ok: true, id };
  }

  function checkSponsors() {
    for (const s of TENNIS_SPONSORS) {
      if (!state.sponsors.includes(s.id)) continue;
      const have = s.need === 'matches' ? state.matchesPlayed : s.need === 'wins' ? state.matchesWon : s.need === 'titles' ? state.titles : state.aces;
      const done = Math.floor(have / s.goal);
      const paid = state.sponsorProgress[s.id] || 0;
      if (done > paid) {
        const bonus = (done - paid) * s.pay;
        state.sponsorProgress[s.id] = done;
        state.earned += bonus;
        addCash(bonus);
        log(`Sponsor ${s.name} paid $${bonus}.`);
      }
    }
  }

  function rest() {
    state.staminaNow = 100;
    state.restDays += 1;
    log('A rest day. Legs fresh, mind clear.');
    return { ok: true, stamina: 100 };
  }

  function setRainDelay(on) {
    state.rainDelay = !!on;
    if (on) log('Rain stops play — matches paused until it clears.');
    return { ok: true, rainDelay: state.rainDelay };
  }

  function tick(dt) {
    if (state.match) {
      state.staminaNow = Math.max(0, state.staminaNow - dt * 0.05);
    } else {
      state.staminaNow = Math.min(100, state.staminaNow + dt * 0.2);
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.practiceToday = 0;
    state.dailyMatches = 0;
    state.staminaNow = 100;
    if (rng() < 0.2) {
      state.rainDelay = true;
      log('Rain is forecast — outdoor courts are soaked today.');
    } else if (state.rainDelay) {
      state.rainDelay = false;
      log('The sun is back — courts are dry and fast.');
    }
    if (state.tournament && rng() < 0.1) {
      log(`Tournament note: the ${state.tournament.name} draw moves to the indoor dome.`);
    }
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, ladder: state.ladder,
      serve: state.serve, rally: state.rally, speed: state.speed,
      stamina: state.stamina, tactics: state.tactics,
      staminaNow: state.staminaNow,
      ownedRackets: state.ownedRackets, racket: state.racket,
      ownedShoes: state.ownedShoes, shoes: state.shoes,
      matchesPlayed: state.matchesPlayed, matchesWon: state.matchesWon,
      setsWon: state.setsWon, gamesWon: state.gamesWon,
      pointsWon: state.pointsWon, aces: state.aces,
      doubleFaults: state.doubleFaults, titles: state.titles,
      finalsLost: state.finalsLost, earned: state.earned,
      spent: state.spent, match: state.match,
      tournament: state.tournament, tourneyRound: state.tourneyRound,
      tourneyWins: state.tourneyWins, sponsors: state.sponsors,
      sponsorProgress: state.sponsorProgress,
      practiceToday: state.practiceToday,
      bestWinStreak: state.bestWinStreak, winStreak: state.winStreak,
      rainDelay: state.rainDelay, lastDay: state.lastDay,
      dailyMatches: state.dailyMatches, beaten: state.beaten,
      rivalries: state.rivalries, crowdFav: state.crowdFav,
      injuries: state.injuries, restDays: state.restDays,
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
      rank: TENNIS_RANKS[state.rank].name,
      xp: state.xp,
      ladder: state.ladder,
      skill: playerSkill(),
      serve: state.serve,
      rally: state.rally,
      speed: state.speed,
      stamina: state.stamina,
      tactics: state.tactics,
      staminaNow: Math.round(state.staminaNow),
      racket: state.racket,
      shoes: state.shoes,
      matchesPlayed: state.matchesPlayed,
      matchesWon: state.matchesWon,
      setsWon: state.setsWon,
      gamesWon: state.gamesWon,
      pointsWon: state.pointsWon,
      aces: state.aces,
      doubleFaults: state.doubleFaults,
      titles: state.titles,
      finalsLost: state.finalsLost,
      earned: Math.round(state.earned),
      spent: state.spent,
      winStreak: state.winStreak,
      bestWinStreak: state.bestWinStreak,
      tournament: state.tournament ? state.tournament.id : null,
      tourneyRound: state.tourneyRound,
      sponsors: state.sponsors.length,
      crowdFav: state.crowdFav,
      rainDelay: state.rainDelay,
      inMatch: !!state.match,
      score: state.match ? tennisGameScore(state.match.points, state.match.oppPoints) : null,
    };
  }

  function hudLine() {
    if (state.match) {
      const opp = TENNIS_OPPONENTS.find((o) => o.id === state.match.opponent);
      return `Tennis vs ${opp.name}: ${tennisGameScore(state.match.points, state.match.oppPoints)} — ${state.match.games}-${state.match.oppGames} games, ${state.match.sets}-${state.match.oppSets} sets`;
    }
    if (state.tournament) return `Tennis: ${state.tournament.name} — round ${state.tourneyRound}`;
    if (state.rainDelay) return 'Tennis: rain delay — courts closed';
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearCourts = Math.hypot(pos.x + 40, pos.z - 90) < 30;
    if (!nearCourts) return false;
    if (state.match) { playPoint('topspin'); return true; }
    return false;
  }

  function ladderBoard() {
    return TENNIS_OPPONENTS.map((o) => ({
      rank: o.rank, name: o.name, skill: o.skill, style: o.style,
      beaten: state.beaten[o.id] || 0, rivalry: state.rivalries[o.id] || 0,
    })).sort((a, b) => a.rank - b.rank);
  }

  function courtList() {
    return TENNIS_COURTS.map((ct) => ({
      id: ct.id, name: ct.name, surface: ct.surface, fee: ct.fee,
    }));
  }

  return {
    state, buyRacket, selectRacket, buyShoes, selectShoes, train,
    startMatch, playPoint, forfeitMatch, enterTournament,
    tourneyNextOpponent, signSponsor, rest, setRainDelay,
    tick, tickDay, serialize, deserialize, stats, hudLine, interact,
    ladderBoard, courtList, playerSkill, currentRacket, currentShoes,
  };
}

export const TENNIS_DRILLS = [
  { id: 'wall', name: 'Wall Rally', xp: 8, stamina: 8, desc: 'Against the practice wall, 100 balls.' },
  { id: 'serve-ace', name: 'Ace Challenge', xp: 10, stamina: 10, desc: 'Ten serves, count the aces.' },
  { id: 'sprint', name: 'Baseline Sprints', xp: 8, stamina: 16, desc: 'Suicides until the whistle.' },
  { id: 'shadow', name: 'Shadow Swings', xp: 6, stamina: 5, desc: 'Footwork without a ball.' },
  { id: 'tiebreak', name: 'Tiebreak Sim', xp: 15, stamina: 12, desc: 'Practice the 6-6 pressure cooker.' },
];

export function tennisDrillXp(drillId, streak) {
  const d = TENNIS_DRILLS.find((x) => x.id === drillId);
  if (!d) return 0;
  return d.xp + Math.min(streak, 5);
}

export function tennisSurfaceBonus(surface, shotId) {
  if (surface === 'grass' && (shotId === 'volley' || shotId === 'aceserve')) return 0.08;
  if (surface === 'clay' && shotId === 'topspin') return 0.08;
  if (surface === 'sand' && shotId === 'drop') return 0.06;
  if (surface === 'carpet' && shotId === 'flat') return 0.06;
  return 0;
}

export function tennisLadderAfterWin(currentLadder, oppRank) {
  if (oppRank < currentLadder) return oppRank;
  return currentLadder;
}

export function tennisSeasonPoints(wins, titles, finals) {
  return wins * 10 + titles * 100 + finals * 25;
}

export function tennisCrowdReaction(thrill, won) {
  if (!won) return 'A murmur ripples through the stands.';
  if (thrill >= 3) return 'The crowd ERUPTS — what a shot!';
  if (thrill === 2) return 'Applause rolls around the court.';
  return 'Polite applause from the members.';
}

export const TENNIS_PARTNERS = [
  { id: 'mia', name: 'Mia Torres', skill: 55, style: 'baseliner', chemistry: 0.7, desc: 'Steady, never misses, never rushes.' },
  { id: 'leo', name: 'Leo Fontaine', skill: 62, style: 'serve-volley', chemistry: 0.6, desc: 'Lives at the net. So does the ball.' },
  { id: 'ana', name: 'Ana Petrova', skill: 66, style: 'counter', chemistry: 0.8, desc: 'Gets everything back, twice, smiling.' },
  { id: 'dario', name: 'Dario Kim', skill: 70, style: 'power', chemistry: 0.5, desc: 'Hits huge. Sometimes at you.' },
  { id: 'sofia', name: 'Sofia Marchetti', skill: 74, style: 'all-court', chemistry: 0.9, desc: 'The perfect partner. Costs the most.' },
  { id: 'omar', name: 'Omar Haddad', skill: 72, style: 'baseliner', chemistry: 0.75, desc: 'Grinds, covers, never complains.' },
  { id: 'elsa', name: 'Elsa Novak', skill: 78, style: 'spin', chemistry: 0.65, desc: 'Topspin that kicks over heads.' },
  { id: 'kenji', name: 'Kenji Sato', skill: 80, style: 'serve-volley', chemistry: 0.55, desc: 'A serve like a gunshot, at the net.' },
];

export const TENNIS_DOUBLES_TEAMS = [
  { id: 'twins', name: 'The Twins', skill: 68, style: 'mirror', desc: 'Identical. Confusing. Very good.' },
  { id: 'veterans', name: 'The Veterans', skill: 74, style: 'crafty', desc: 'Slow legs, fast brains, dirty tricks.' },
  { id: 'rockets', name: 'The Rockets', skill: 80, style: 'power', desc: 'Two big servers, no rallies.' },
  { id: 'poachers', name: 'The Poachers', skill: 76, style: 'net', desc: 'Both at the net, all the time.' },
  { id: 'grinders', name: 'The Grinders', skill: 72, style: 'baseline', desc: 'They will still be running at midnight.' },
  { id: 'champs', name: 'The Champions', skill: 90, style: 'all-court', desc: 'Holders of the doubles crown.' },
];

export const TENNIS_EXHIBITIONS = [
  { id: 'charity', name: 'Charity Exhibition', fee: 200, crowd: 500, desc: 'Play for the children’s hospital. Cameras love it.' },
  { id: 'legends', name: 'Legends Night', fee: 400, crowd: 1200, desc: 'You versus a retired champion. Lose gracefully.' },
  { id: 'street', name: 'Street Tennis', fee: 100, crowd: 300, desc: 'A court painted on the market square.' },
  { id: 'midnight', name: 'Midnight Match', fee: 350, crowd: 800, desc: 'Under lights, after the bars close.' },
  { id: 'kids', name: 'Kids Clinic', fee: 150, crowd: 200, desc: 'Teach the kids. They teach you humility.' },
];

export const TENNIS_COURT_SLOTS = [
  { id: 'dawn', name: 'Dawn (06:00)', hour: 6, price: 0.8, desc: 'Cheap, cold, empty courts.' },
  { id: 'morning', name: 'Morning (09:00)', hour: 9, price: 1.0, desc: 'The standard slot.' },
  { id: 'noon', name: 'Noon (12:00)', hour: 12, price: 1.2, desc: 'Hot sun, fast balls.' },
  { id: 'evening', name: 'Evening (18:00)', hour: 18, price: 1.4, desc: 'Prime time, floodlights, crowds.' },
  { id: 'night', name: 'Night (21:00)', hour: 21, price: 1.1, desc: 'Cool air, bright lights.' },
];

export function tennisDoublesWinChance(playerSkill, partnerSkill, chemistry, teamSkill) {
  const pair = (playerSkill + partnerSkill) / 2;
  const chemBonus = chemistry * 10;
  const gap = (pair + chemBonus - teamSkill) / 100;
  return Math.max(0.1, Math.min(0.9, 0.5 + gap));
}

export function tennisSlotPrice(courtFee, slotId) {
  const slot = TENNIS_COURT_SLOTS.find((s) => s.id === slotId);
  if (!slot) return courtFee;
  return Math.round(courtFee * slot.price);
}

export function tennisExhibitionPay(exhibition, crowdFav) {
  return Math.round(exhibition.fee * (1 + crowdFav / 100));
}

export function createTennisDoubles(system) {
  let partner = null;
  let doublesMatches = 0;
  let doublesWins = 0;
  let doublesTitles = 0;
  let exhibitionsPlayed = 0;
  let exhibitionsEarned = 0;
  const bookings = [];

  function pickPartner(partnerId) {
    const p = TENNIS_PARTNERS.find((x) => x.id === partnerId);
    if (!p) return { ok: false, reason: 'no-such-partner' };
    partner = partnerId;
    return { ok: true, partner: partnerId, name: p.name };
  }

  function playDoubles(teamId) {
    const team = TENNIS_DOUBLES_TEAMS.find((x) => x.id === teamId);
    if (!team) return { ok: false, reason: 'no-such-team' };
    if (!partner) return { ok: false, reason: 'no-partner' };
    const p = TENNIS_PARTNERS.find((x) => x.id === partner);
    const chance = tennisDoublesWinChance(system.playerSkill(), p.skill, p.chemistry, team.skill);
    const won = Math.random() < chance;
    doublesMatches += 1;
    if (won) {
      doublesWins += 1;
      const prize = 150 + team.skill * 2;
      return { ok: true, won: true, prize, chance: Math.round(chance * 100) / 100 };
    }
    return { ok: true, won: false, prize: 0, chance: Math.round(chance * 100) / 100 };
  }

  function playExhibition(exhibitionId) {
    const ex = TENNIS_EXHIBITIONS.find((x) => x.id === exhibitionId);
    if (!ex) return { ok: false, reason: 'no-such-exhibition' };
    const pay = tennisExhibitionPay(ex, system.state.crowdFav);
    exhibitionsPlayed += 1;
    exhibitionsEarned += pay;
    return { ok: true, exhibition: exhibitionId, pay, crowd: ex.crowd };
  }

  function bookCourt(courtId, slotId) {
    const court = TENNIS_COURTS.find((x) => x.id === courtId);
    if (!court) return { ok: false, reason: 'no-such-court' };
    const slot = TENNIS_COURT_SLOTS.find((s) => s.id === slotId);
    if (!slot) return { ok: false, reason: 'no-such-slot' };
    const price = tennisSlotPrice(court.fee, slotId);
    const booking = { court: courtId, slot: slotId, price, day: system.state.lastDay };
    bookings.push(booking);
    return { ok: true, booking };
  }

  function doublesRecord() {
    return {
      partner,
      matches: doublesMatches,
      wins: doublesWins,
      titles: doublesTitles,
      exhibitionsPlayed,
      exhibitionsEarned,
      bookings: bookings.length,
    };
  }

  function winDoublesTitle() {
    doublesTitles += 1;
    return { ok: true, titles: doublesTitles };
  }

  return {
    pickPartner, playDoubles, playExhibition, bookCourt,
    doublesRecord, winDoublesTitle,
    get partner() { return partner; },
  };
}

export function tennisPracticeMatch(playerSkill, oppSkill, rng) {
  const chance = Math.max(0.1, Math.min(0.9, 0.5 + (playerSkill - oppSkill) / 100));
  const won = rng() < chance;
  return { won, chance: Math.round(chance * 100) / 100 };
}

export function tennisFitnessScore(stamina, speed, serve) {
  return Math.round((stamina * 0.4 + speed * 0.3 + serve * 0.3));
}

export function tennisRivalryLevel(matchesPlayed, wins) {
  if (matchesPlayed < 3) return 'new';
  if (wins / matchesPlayed > 0.7) return 'dominant';
  if (wins / matchesPlayed < 0.3) return 'nemesis';
  return 'even';
}

export function tennisSeasonSummary(matches, wins, titles, aces) {
  return {
    matches, wins, titles, aces,
    winRate: matches > 0 ? Math.round((wins / matches) * 100) : 0,
    points: wins * 10 + titles * 100 + Math.floor(aces / 10),
  };
}

export const TENNIS_TIPS = [
  { id: 'serve-wide', name: 'Serve Wide', text: 'Wide serves open the court. Use them.' },
  { id: 'lob-net', name: 'Lob the Net-Rusher', text: 'They charge in, you go over them.' },
  { id: 'drop-change', name: 'Change the Pace', text: 'A drop shot after five hard balls wins points.' },
  { id: 'breathe', name: 'Breathe', text: 'Between points, breathe. The next one is new.' },
  { id: 'feet-first', name: 'Feet First', text: 'Move your feet before your racket.' },
  { id: 'second-serve', name: 'Safe Second Serve', text: 'A safe second serve beats a double fault.' },
  { id: 'watch-ball', name: 'Watch the Ball', text: 'Until it hits your strings. Then watch it leave.' },
  { id: 'crowd-fuel', name: 'Crowd Fuel', text: 'The crowd wants a show. Give them one.' },
];

export const TENNIS_RECORDS = [
  { name: 'Rafael Crown', wins: 214, titles: 18, desc: 'The champion. Untouchable.' },
  { name: 'Nina Volkov', wins: 178, titles: 12, desc: 'Number four, rising fast.' },
  { name: 'Kenji Sato', wins: 165, titles: 9, desc: 'A serve like a gunshot.' },
  { name: 'Ria', wins: 0, titles: 0, desc: 'You. Climbing.' },
  { name: 'Elsa Novak', wins: 150, titles: 8, desc: 'Topspin that kicks.' },
  { name: 'Omar Haddad', wins: 142, titles: 6, desc: 'Never, ever tires.' },
];

export function tennisTipFor(day) {
  return TENNIS_TIPS[day % TENNIS_TIPS.length];
}

export function tennisRecordsWith(playerWins, playerTitles) {
  const board = TENNIS_RECORDS.map((e) => ({
    name: e.name, wins: e.name === 'Ria' ? playerWins : e.wins,
    titles: e.name === 'Ria' ? playerTitles : e.titles, desc: e.desc,
  }));
  board.sort((a, b) => b.wins - a.wins);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function tennisMatchLengthEstimate(sets, gamesPerSet) {
  return sets * gamesPerSet * 6;
}

export function tennisStaminaCost(shotId, rallies) {
  const shot = TENNIS_SHOTS.find((x) => x.id === shotId);
  if (!shot) return 0;
  return shot.stamina * rallies;
}

export function tennisBestShotFor(opponentId) {
  const opp = TENNIS_OPPONENTS.find((x) => x.id === opponentId);
  if (!opp) return null;
  return opp.weakness;
}

export function tennisCourtSpeedLabel(surface) {
  if (surface === 'grass') return 'Very fast';
  if (surface === 'hard') return 'Fast';
  if (surface === 'carpet') return 'Medium-fast';
  if (surface === 'clay') return 'Slow';
  return 'Very slow';
}

export const TENNIS_RECORDS_TABLE = [
  { id: 'most-wins', name: 'Most Wins', stat: 'matchesWon', unit: 'wins', desc: 'Most matches won.' },
  { id: 'most-aces', name: 'Most Aces', stat: 'aces', unit: 'aces', desc: 'Most aces served.' },
  { id: 'most-titles', name: 'Most Titles', stat: 'titles', unit: 'titles', desc: 'Most tournaments won.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestWinStreak', unit: 'wins', desc: 'Longest win streak.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most prize money.' },
];

export function tennisRecordFor(recordId, state) {
  const r = TENNIS_RECORDS_TABLE.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function tennisAllRecords(state) {
  return TENNIS_RECORDS_TABLE.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function tennisWinRate(wins, played) {
  if (played === 0) return 0;
  return Math.round((wins / played) * 100);
}

export function tennisAceRate(aces, matches) {
  if (matches === 0) return 0;
  return Math.round((aces / matches) * 10) / 10;
}

export function tennisPlayerGrade(wins, played, titles) {
  const rate = tennisWinRate(wins, played);
  if (rate >= 70 && titles >= 3) return 'S';
  if (rate >= 55) return 'A';
  if (rate >= 40) return 'B';
  if (rate >= 25) return 'C';
  return 'D';
}

export const TENNIS_SEASONAL_EVENTS = [
  { id: 'spring-open', name: 'Spring Open', season: 'spring', prize: 800, desc: 'Clay season begins.' },
  { id: 'summer-slam', name: 'Summer Slam', season: 'summer', prize: 1500, desc: 'Grass and glory.' },
  { id: 'autumn-masters', name: 'Autumn Masters', season: 'autumn', prize: 1200, desc: 'Indoor hard courts.' },
  { id: 'winter-cup', name: 'Winter Cup', season: 'winter', prize: 900, desc: 'The dome, the lights, the crowd.' },
];

export function tennisSeasonalEvent(seasonId) {
  return TENNIS_SEASONAL_EVENTS.find((x) => x.season === seasonId) || null;
}

export function tennisEventPrize(eventId, place) {
  const e = TENNIS_SEASONAL_EVENTS.find((x) => x.id === eventId);
  if (!e) return 0;
  return place === 1 ? e.prize : place === 2 ? Math.round(e.prize / 2) : Math.round(e.prize / 4);
}

export function tennisSetLengthEstimate(gamesWon, gamesLost) {
  return (gamesWon + gamesLost) * 5;
}

export function tennisBreakPoints(won, total) {
  if (total === 0) return 0;
  return Math.round((won / total) * 100);
}

export const TENNIS_QUICK_START = [
  'Train serve first — it wins free points.',
  'Play Mia before you play Rafael.',
  'Use the lob against net-rushers.',
  'Rest when stamina drops below 30.',
  'Buy the Graphite Pro before the Clay Classic.',
  'Enter the Beach Open as soon as you can.',
];

export function tennisQuickStart(step) {
  return TENNIS_QUICK_START[step] || null;
}

export function tennisTotalValue(state) {
  return state.ownedRackets.length * 300 + state.ownedShoes.length * 150;
}

export function tennisProgressPercent(state) {
  if (state.matchesPlayed === 0) return 0;
  return Math.round((state.matchesWon / state.matchesPlayed) * 100);
}

export function tennisSummary(state) {
  return `${TENNIS_RANKS[state.rank].name} (ladder #${state.ladder}): ${state.matchesWon}/${state.matchesPlayed} won, ${state.titles} titles, ${state.aces} aces.`;
}

export function tennisNextGoal(state) {
  if (state.matchesPlayed < 3) return 'Play 3 matches.';
  if (state.matchesWon < 1) return 'Win your first match.';
  if (state.titles < 1) return 'Win a tournament.';
  return 'Beat Rafael Crown.';
}

export const TENNIS_META = {
  system: 'tennis', version: '7b-B', author: 'builder-B',
  files: 1, lines: 1003, features: ['matches', 'tournaments', 'training', 'rackets', 'doubles', 'sponsors'],
};

export function tennisMeta() {
  return { ...TENNIS_META };
}
