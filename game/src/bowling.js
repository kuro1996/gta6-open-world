export const BOWLING_ALLEY = { id: 'lucky-strike', name: 'Lucky Strike Lanes', x: -80, z: -120, district: 'Northside' };

export const BOWLING_LANES = [
  { id: 'lane-1', name: 'Lane 1', condition: 0.9, price: 10 },
  { id: 'lane-2', name: 'Lane 2', condition: 0.8, price: 10 },
  { id: 'lane-3', name: 'Lane 3', condition: 0.7, price: 8 },
  { id: 'lane-4', name: 'Lane 4', condition: 0.95, price: 14 },
  { id: 'lane-5', name: 'Lane 5', condition: 0.6, price: 6 },
  { id: 'lane-6', name: 'VIP Lane', condition: 1.0, price: 25 },
];

export const BOWLING_BALLS = [
  { id: 'house', name: 'House Ball', price: 0, hook: 0, power: 1.0, weight: 12 },
  { id: 'storm', name: 'Storm Ball', price: 180, hook: 2, power: 1.1, weight: 14 },
  { id: 'hammer', name: 'Hammer Ball', price: 260, hook: 3, power: 1.2, weight: 15 },
  { id: 'purple', name: 'Purple Hammer', price: 320, hook: 4, power: 1.15, weight: 13 },
  { id: 'gold', name: 'Gold Ball', price: 500, hook: 5, power: 1.3, weight: 16 },
];

export const POOL_TABLES = [
  { id: 'table-1', name: 'Table 1', condition: 0.9, price: 8 },
  { id: 'table-2', name: 'Table 2', condition: 0.8, price: 8 },
  { id: 'table-3', name: 'VIP Table', condition: 1.0, price: 20 },
];

export const POOL_CUES = [
  { id: 'house-cue', name: 'House Cue', price: 0, accuracy: 1.0 },
  { id: 'players', name: 'Players Cue', price: 120, accuracy: 1.15 },
  { id: 'predator', name: 'Predator Cue', price: 400, accuracy: 1.35 },
  { id: 'meucci', name: 'Meucci Cue', price: 650, accuracy: 1.5 },
];

export const BOWLING_OPPONENTS = [
  { id: 'eddie', name: 'Eddie', skill: 0.55, bet: 20, trash: 'You bowl like my grandma.' },
  { id: 'marla', name: 'Marla', skill: 0.7, bet: 50, trash: 'Watch and learn, kid.' },
  { id: 'big-tony', name: 'Big Tony', skill: 0.8, bet: 120, trash: 'I own this lane.' },
  { id: 'hustler', name: 'The Hustler', skill: 0.92, bet: 300, trash: 'Money on the table, friend.' },
  { id: 'grandma', name: 'Grandma Rose', skill: 0.65, bet: 30, trash: 'I have been bowling since before you were born.' },
  { id: 'pro', name: 'The Pro', skill: 0.95, bet: 500, trash: 'Try to keep up.' },
];

export const POOL_OPPONENTS = [
  { id: 'shark', name: 'Shark', skill: 0.6, bet: 40, trash: 'Easy money.' },
  { id: 'cue-queen', name: 'Cue Queen', skill: 0.75, bet: 100, trash: 'I never miss twice.' },
  { id: 'old-mike', name: 'Old Mike', skill: 0.7, bet: 80, trash: 'Been playing since 1972.' },
  { id: 'hustler-pool', name: 'Silent Sal', skill: 0.9, bet: 250, trash: '...' },
];

export const BOWLING_LEAGUES = [
  { id: 'tuesday', name: 'Tuesday Night League', entry: 50, weeks: 4, prize: 400, minAvg: 0 },
  { id: 'friday', name: 'Friday Pro League', entry: 150, weeks: 4, prize: 1200, minAvg: 120 },
  { id: 'championship', name: 'Solara Championship', entry: 400, weeks: 6, prize: 5000, minAvg: 170 },
];

export const BOWLING_SNACKS = [
  { id: 'beer', name: 'Beer', price: 5, effect: 'Aim minus 5 percent next frame.' },
  { id: 'nachos', name: 'Nachos', price: 8, effect: 'Steady hands plus 5 percent.' },
  { id: 'soda', name: 'Soda', price: 3, effect: 'Nothing.' },
  { id: 'wings', name: 'Hot Wings', price: 10, effect: 'Sweaty palms minus 10 percent.' },
  { id: 'shoes', name: 'Shoe Rental', price: 4, effect: 'Shoe rental, required to bowl.' },
];

const OIL_PATTERNS = [
  { id: 'house-oil', name: 'House Oil', difficulty: 1, bonus: 0 },
  { id: 'sport', name: 'Sport Shot', difficulty: 3, bonus: 5 },
  { id: 'long', name: 'Long Oil', difficulty: 2, bonus: 3 },
  { id: 'short', name: 'Short Oil', difficulty: 2, bonus: 3 },
  { id: 'flat', name: 'Flat Oil', difficulty: 4, bonus: 8 },
];

const PRO_SHOP_ITEMS = [
  { id: 'glove', name: 'Bowling Glove', price: 40, effect: 'Plus 2 aim.' },
  { id: 'tape', name: 'Finger Tape', price: 10, effect: 'Plus 1 hook.' },
  { id: 'cleaner', name: 'Ball Cleaner', price: 15, effect: 'Cleaner ball, truer roll.' },
  { id: 'bag', name: 'Ball Bag', price: 60, effect: 'Carry two balls.' },
  { id: 'wrist', name: 'Wrist Support', price: 35, effect: 'Steadier release.' },
  { id: 'towel', name: 'Microfiber Towel', price: 12, effect: 'Dry hands, dry ball.' },
];

export function bowlingFrameScore(frames) {
  const rolls = [];
  for (const f of frames) for (const r of f.rolls || []) rolls.push(r);
  let score = 0;
  let idx = 0;
  for (let frame = 0; frame < 10; frame++) {
    const f = frames[frame];
    if (!f) break;
    const r = f.rolls || [];
    if (frame < 9) {
      if (r[0] === 10) {
        score += 10 + (rolls[idx + 1] || 0) + (rolls[idx + 2] || 0);
        idx += 1;
      } else if ((r[0] || 0) + (r[1] || 0) === 10) {
        score += 10 + (rolls[idx + 2] || 0);
        idx += 2;
      } else {
        score += (r[0] || 0) + (r[1] || 0);
        idx += 2;
      }
    } else {
      score += r.reduce((a, b) => a + b, 0);
    }
  }
  return score;
}

export function bowlingIsGameOver(frames) {
  if (!frames || frames.length < 10) return false;
  const tenth = frames[9];
  const rolls = tenth.rolls || [];
  if (rolls.length < 2) return false;
  if (rolls[0] === 10 || rolls[0] + rolls[1] === 10) return rolls.length >= 3;
  return rolls.length >= 2;
}

function laneById(id) {
  for (const l of BOWLING_LANES) if (l.id === id) return l;
  return null;
}

function ballById(id) {
  for (const b of BOWLING_BALLS) if (b.id === id) return b;
  return null;
}

function tableById(id) {
  for (const t of POOL_TABLES) if (t.id === id) return t;
  return null;
}

function cueById(id) {
  for (const c of POOL_CUES) if (c.id === id) return c;
  return null;
}

export function createBowlingSystem(deps) {
  const d = deps || {};
  const rnd = typeof d.rng === 'function' ? d.rng : Math.random;
  const cashOf = typeof d.getCash === 'function' ? d.getCash : () => 0;
  const moveCash = typeof d.addCash === 'function' ? d.addCash : () => {};
  const say = typeof d.log === 'function' ? d.log : () => {};
  const dayOf = typeof d.getDay === 'function' ? d.getDay : () => 1;
  const hourOf = typeof d.getHour === 'function' ? d.getHour : () => 12;
  const posOf = typeof d.getPlayerPos === 'function' ? d.getPlayerPos : () => ({ x: 0, z: 0 });

  const state = {
    ball: 'house',
    ownedBalls: ['house'],
    cue: 'house-cue',
    ownedCues: ['house-cue'],
    bowling: null,
    pool: null,
    gamesBowled: 0,
    gamesWon: 0,
    totalScore: 0,
    bestScore: 0,
    bestGame: null,
    strikes: 0,
    spares: 0,
    gutters: 0,
    perfectGames: 0,
    poolGames: 0,
    poolWon: 0,
    poolBreaks: 0,
    eightBallWins: 0,
    totalWinnings: 0,
    totalBet: 0,
    league: null,
    leagueWins: 0,
    leagueTitles: 0,
    hustlerBeaten: 0,
    drinks: 0,
    snacks: 0,
    shoesRented: 0,
    alleyRating: 4.2,
    membership: false,
    memberSince: 0,
    practiceFrames: 0,
    tournamentsWon: 0,
    rivalWins: 0,
    cosmicNights: 0,
    proShop: [],
    shoesShined: 0,
    arcadeTokens: 0,
  };

  function ballInfo() {
    return ballById(state.ball) || BOWLING_BALLS[0];
  }

  function cueInfo() {
    return cueById(state.cue) || POOL_CUES[0];
  }

  function hasBall(id) {
    return state.ownedBalls.includes(id);
  }

  function hasCue(id) {
    return state.ownedCues.includes(id);
  }

  function avgScore() {
    if (state.gamesBowled === 0) return 0;
    return Math.round(state.totalScore / state.gamesBowled);
  }

  function aimModifier() {
    const ball = ballInfo();
    let aim = 0.55 + ball.hook * 0.04 + ball.power * 0.05;
    aim -= 0.05 * state.drinks;
    if (state.snacks > 0) aim += 0.03;
    return Math.max(0.2, Math.min(0.95, aim));
  }

  function rentLane(laneId) {
    if (state.bowling) return { ok: false, reason: 'game-active' };
    const lane = laneById(laneId);
    if (!lane) return { ok: false, reason: 'unknown-lane' };
    const price = state.membership ? Math.round(lane.price / 2) : lane.price;
    const total = price + 4;
    if (cashOf() < total) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-total);
    state.shoesRented += 1;
    state.bowling = {
      laneId: lane.id,
      laneName: lane.name,
      condition: lane.condition,
      frames: [],
      frame: 0,
      bet: 0,
      opponent: null,
      opponentScore: 0,
      shoesRented: true,
      aim: aimModifier(),
      gamesPlayed: state.gamesBowled + 1,
    };
    return { ok: true, laneId: lane.id, price: total };
  }

  function rollBall(power, aim) {
    if (!state.bowling) return { ok: false, reason: 'no-game' };
    if (bowlingIsGameOver(state.bowling.frames)) return { ok: false, reason: 'game-over' };
    const game = state.bowling;
    const usePower = power === undefined || power === null ? 0.7 : power;
    const useAim = aim === undefined || aim === null ? 0.5 : aim;
    let frameIdx = game.frames.length - 1;
    let frame = game.frames[frameIdx];
    const isTenth = game.frames.length === 10;
    if (!frame || (frame.rolls.length >= 2 && !isTenth) || (frame.rolls.length >= 1 && frame.rolls[0] === 10 && !isTenth)) {
      if (game.frames.length >= 10) return { ok: false, reason: 'game-over' };
      frame = { rolls: [] };
      game.frames.push(frame);
      frameIdx = game.frames.length - 1;
    }
    const tenth = frameIdx === 9;
    let standing = 10;
    if (!tenth) {
      standing = 10 - frame.rolls.reduce((a, b) => a + b, 0);
    } else if (frame.rolls.length === 1) {
      standing = frame.rolls[0] === 10 ? 10 : 10 - frame.rolls[0];
    } else if (frame.rolls.length === 2) {
      if (frame.rolls[0] === 10 || frame.rolls[0] + frame.rolls[1] === 10) standing = 10;
      else standing = 0;
    }
    const skill = aimModifier() * game.condition * 0.7 + usePower * 0.5;
    const roll = rnd();
    let knocked;
    if (roll < skill * 0.35) knocked = standing;
    else if (roll < skill * 0.7) knocked = Math.max(0, Math.round(standing * 0.8));
    else if (roll < skill) knocked = Math.max(0, Math.round(standing * 0.5));
    else knocked = Math.max(0, Math.round(standing * 0.15));
    knocked = Math.min(standing, knocked);
    const aimError = Math.abs(useAim - 0.5) * 2;
    if (aimError > 0.8 && rnd() < 0.25) {
      knocked = 0;
      state.gutters += 1;
    }
    frame.rolls.push(knocked);
    if (knocked === 10 && frame.rolls.length === 1 && !tenth) state.strikes += 1;
    if (!tenth && frame.rolls.length === 2 && frame.rolls[0] + frame.rolls[1] === 10 && frame.rolls[0] !== 10) state.spares += 1;
    const score = bowlingFrameScore(game.frames);
    if (bowlingIsGameOver(game.frames)) return finishBowlingGame();
    return { ok: true, knocked, frame: frameIdx + 1, score, gameOver: false };
  }

  function finishBowlingGame() {
    if (!state.bowling) return { ok: false, reason: 'no-game' };
    const game = state.bowling;
    state.bowling = null;
    const score = bowlingFrameScore(game.frames);
    state.gamesBowled += 1;
    state.totalScore += score;
    if (score > state.bestScore) {
      state.bestScore = score;
      state.bestGame = JSON.parse(JSON.stringify(game.frames));
    }
    let wonBet = false;
    let betResult = null;
    let opponentScore = 0;
    if (game.opponent) {
      const opp = BOWLING_OPPONENTS.find((o) => o.id === game.opponent);
      opponentScore = Math.round(90 + (opp ? opp.skill : 0.5) * 130 + rnd() * 40);
      if (score > opponentScore) {
        wonBet = true;
        betResult = 'won';
        moveCash(game.bet * 2);
        state.totalWinnings += game.bet * 2;
        state.gamesWon += 1;
        state.rivalWins += 1;
        if (game.opponent === 'hustler') state.hustlerBeaten += 1;
      } else if (score === opponentScore) {
        betResult = 'tie';
        moveCash(game.bet);
      } else {
        betResult = 'lost';
      }
    }
    if (score === 300) {
      state.perfectGames += 1;
      moveCash(500);
      state.totalWinnings += 500;
    }
    if (state.league) {
      state.league.week += 1;
      if (wonBet) state.league.wins += 1;
      else if (game.opponent) state.league.losses += 1;
      state.league.average = avgScore();
      if (state.league.week > state.league.weeks) finishLeague();
    }
    say('Bowled a ' + score + ' on ' + game.laneName + '.');
    return { ok: true, score, gameOver: true, bestScore: state.bestScore, wonBet, betResult, opponentScore };
  }

  function challengeOpponent(opponentId, bet) {
    const opp = BOWLING_OPPONENTS.find((o) => o.id === opponentId);
    if (!opp) return { ok: false, reason: 'unknown-opponent' };
    if (!state.bowling) return { ok: false, reason: 'no-game' };
    if (state.bowling.bet > 0) return { ok: false, reason: 'bet-placed' };
    if (bet !== opp.bet) return { ok: false, reason: 'wrong-bet' };
    if (cashOf() < bet) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-bet);
    state.totalBet += bet;
    state.bowling.bet = bet;
    state.bowling.opponent = opponentId;
    return { ok: true, opponentId, bet };
  }

  function joinLeague(leagueId) {
    const league = BOWLING_LEAGUES.find((l) => l.id === leagueId);
    if (!league) return { ok: false, reason: 'unknown-league' };
    if (state.league) return { ok: false, reason: 'league-active' };
    if (state.gamesBowled >= 3 && avgScore() < league.minAvg) return { ok: false, reason: 'average-too-low' };
    if (cashOf() < league.entry) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-league.entry);
    state.league = { leagueId: league.id, week: 1, wins: 0, losses: 0, average: avgScore(), weeks: league.weeks };
    return { ok: true, leagueId: league.id };
  }

  function finishLeague() {
    if (!state.league) return null;
    const league = state.league;
    const def = BOWLING_LEAGUES.find((l) => l.id === league.leagueId);
    state.league = null;
    const won = league.wins > league.losses;
    let prize = 0;
    if (won) {
      prize = def ? def.prize : 0;
      moveCash(prize);
      state.totalWinnings += prize;
      state.leagueTitles += 1;
      state.leagueWins += 1;
    }
    return { won, prize, record: league.wins + '-' + league.losses };
  }

  function buyBall(ballId) {
    const ball = ballById(ballId);
    if (!ball) return { ok: false, reason: 'unknown-ball' };
    if (cashOf() < ball.price && !hasBall(ballId)) return { ok: false, reason: 'not-enough-cash' };
    if (hasBall(ballId)) {
      state.ball = ballId;
      return { ok: true, ballId, switched: true };
    }
    moveCash(-ball.price);
    state.ownedBalls.push(ballId);
    state.ball = ballId;
    return { ok: true, ballId, price: ball.price };
  }

  function buyMembership() {
    if (state.membership) return { ok: false, reason: 'already-member' };
    if (cashOf() < 200) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-200);
    state.membership = true;
    state.memberSince = dayOf();
    return { ok: true, price: 200 };
  }

  function buySnack(snackId) {
    const snack = BOWLING_SNACKS.find((s) => s.id === snackId);
    if (!snack) return { ok: false, reason: 'unknown-snack' };
    if (cashOf() < snack.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-snack.price);
    if (snackId === 'beer') state.drinks += 1;
    if (snackId === 'nachos') state.snacks += 1;
    return { ok: true, snackId, price: snack.price };
  }

  function rackPool(tableId, opponentId, bet) {
    if (state.pool) return { ok: false, reason: 'pool-active' };
    const table = tableById(tableId);
    if (!table) return { ok: false, reason: 'unknown-table' };
    let opp = null;
    if (opponentId) {
      opp = POOL_OPPONENTS.find((o) => o.id === opponentId);
      if (!opp) return { ok: false, reason: 'unknown-opponent' };
      if (bet !== opp.bet) return { ok: false, reason: 'wrong-bet' };
    }
    const price = state.membership ? Math.round(table.price / 2) : table.price;
    const total = price + (bet || 0);
    if (cashOf() < total) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-total);
    if (bet) state.totalBet += bet;
    state.poolBreaks += 1;
    state.pool = {
      tableId: table.id,
      tableName: table.name,
      condition: table.condition,
      myBalls: 7,
      oppBalls: 7,
      turn: 'you',
      bet: bet || 0,
      opponent: opponentId || null,
      eightBall: false,
      solids: rnd() < 0.5,
      shots: 0,
      fouls: 0,
    };
    return { ok: true, tableId: table.id, opponentId: opponentId || null, bet: bet || 0 };
  }

  function shootPool(calledPocket) {
    if (!state.pool) return { ok: false, reason: 'no-game' };
    if (state.pool.turn !== 'you') return { ok: false, reason: 'not-your-turn' };
    const game = state.pool;
    game.shots += 1;
    const pocket = calledPocket || 'corner';
    void pocket;
    const skill = 0.5 * cueInfo().accuracy * game.condition * (state.drinks > 0 ? 0.9 : 1);
    const roll = rnd();
    let sunk = 0;
    let foul = false;
    if (roll < skill * 0.5) sunk = 2;
    else if (roll < skill) sunk = 1;
    else if (roll > 0.95) foul = true;
    if (game.eightBall) {
      if (foul) return losePool();
      if (sunk > 0) return winPool();
      game.turn = game.opponent ? 'opponent' : 'you';
      return { ok: true, sunk: 0, turn: game.turn, eightBall: true };
    }
    if (foul) {
      game.fouls += 1;
      game.turn = game.opponent ? 'opponent' : 'you';
      return { ok: true, sunk: 0, turn: game.turn, foul: true };
    }
    game.myBalls = Math.max(0, game.myBalls - sunk);
    if (game.myBalls === 0) game.eightBall = true;
    if (sunk > 0) game.turn = 'you';
    else game.turn = game.opponent ? 'opponent' : 'you';
    return { ok: true, sunk, turn: game.turn, eightBall: game.eightBall };
  }

  function opponentPoolShot() {
    if (!state.pool) return { ok: false, reason: 'no-game' };
    if (state.pool.turn !== 'opponent') return { ok: false, reason: 'not-opponent-turn' };
    const game = state.pool;
    if (!game.opponent) {
      game.turn = 'you';
      return { ok: true, sunk: 0, turn: 'you' };
    }
    const opp = POOL_OPPONENTS.find((o) => o.id === game.opponent);
    const skill = (opp ? opp.skill : 0.5) * game.condition;
    const roll = rnd();
    let sunk = 0;
    if (game.eightBall) {
      if (roll < skill) return winPoolForOpponent();
      game.turn = 'you';
      return { ok: true, sunk: 0, turn: 'you', eightBall: true };
    }
    if (roll < skill * 0.5) sunk = 2;
    else if (roll < skill) sunk = 1;
    game.oppBalls = Math.max(0, game.oppBalls - sunk);
    if (game.oppBalls === 0) game.eightBall = true;
    game.turn = sunk > 0 ? 'opponent' : 'you';
    return { ok: true, sunk, turn: game.turn, eightBall: game.eightBall };
  }

  function winPool() {
    const bet = state.pool ? state.pool.bet : 0;
    state.pool = null;
    state.poolGames += 1;
    state.poolWon += 1;
    state.eightBallWins += 1;
    const payout = bet > 0 ? bet * 2 : 0;
    if (payout > 0) {
      moveCash(payout);
      state.totalWinnings += payout;
    }
    return { ok: true, won: true, payout, description: 'You sank the 8-ball!' };
  }

  function winPoolForOpponent() {
    return losePool();
  }

  function losePool() {
    state.pool = null;
    state.poolGames += 1;
    return { ok: true, won: false, description: 'You lost the pool game.' };
  }

  function buyCue(cueId) {
    const cue = cueById(cueId);
    if (!cue) return { ok: false, reason: 'unknown-cue' };
    if (cashOf() < cue.price && !hasCue(cueId)) return { ok: false, reason: 'not-enough-cash' };
    if (hasCue(cueId)) {
      state.cue = cueId;
      return { ok: true, cueId, switched: true };
    }
    moveCash(-cue.price);
    state.ownedCues.push(cueId);
    state.cue = cueId;
    return { ok: true, cueId, price: cue.price };
  }

  function enterTournament() {
    if (state.bowling) return { ok: false, reason: 'game-active' };
    if (state.gamesBowled >= 3 && avgScore() < 140) return { ok: false, reason: 'average-too-low' };
    if (cashOf() < 100) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-100);
    const scores = [];
    for (let g = 0; g < 3; g++) {
      const frames = [];
      for (let f = 0; f < 10; f++) {
        const first = Math.floor(rnd() * 11);
        const second = f < 9 ? Math.floor(rnd() * (11 - first)) : Math.floor(rnd() * 11);
        const rolls = first === 10 && f < 9 ? [10] : [first, second];
        if (f === 9 && (first === 10 || first + second === 10)) rolls.push(Math.floor(rnd() * 11));
        frames.push({ rolls });
      }
      scores.push(bowlingFrameScore(frames));
    }
    const average = Math.round(scores.reduce((a, b) => a + b, 0) / 3);
    const won = average >= 170;
    let prize = 0;
    if (won) {
      prize = 800;
      moveCash(prize);
      state.totalWinnings += prize;
      state.tournamentsWon += 1;
    }
    return { ok: true, won, scores, average, prize };
  }

  function tick(dt) {
    const step = dt || 0;
    if (rnd() < step * 0.001) {
      if (state.drinks > 0) state.drinks -= 1;
      if (state.snacks > 0) state.snacks -= 1;
    }
    if (state.league && !state.bowling && dayOf() % 7 === 2 && hourOf() >= 19) say('League night at Lucky Strike.');
  }

  function tickDay(day) {
    const today = day !== undefined && day !== null ? day : dayOf();
    state.drinks = 0;
    state.snacks = 0;
    return { day: today, average: avgScore(), bestScore: state.bestScore };
  }

  function interact() {
    const pos = posOf();
    if (Math.hypot(pos.x - BOWLING_ALLEY.x, pos.z - BOWLING_ALLEY.z) > 18) return false;
    if (state.bowling) {
      rollBall(0.7, 0.5);
      return true;
    }
    if (state.pool) {
      if (state.pool.turn === 'you') shootPool();
      else opponentPoolShot();
      return true;
    }
    const res = rentLane('lane-2');
    return res.ok || res.reason === 'not-enough-cash';
  }

  function hudLine() {
    if (state.bowling) {
      const g = state.bowling;
      return 'BOWLING ' + g.laneName + ' · ' + g.frames.length + '/10 · ' + bowlingFrameScore(g.frames) + (g.opponent ? ' · vs ' + g.opponent : '');
    }
    if (state.pool) {
      const p = state.pool;
      return 'POOL ' + p.tableName + ' · you ' + p.myBalls + ' · opp ' + p.oppBalls + (p.eightBall ? ' · 8-BALL' : '') + ' · ' + p.turn + ' turn';
    }
    const pos = posOf();
    if (Math.hypot(pos.x - BOWLING_ALLEY.x, pos.z - BOWLING_ALLEY.z) <= 18) {
      return 'LUCKY STRIKE · avg ' + avgScore() + ' · best ' + state.bestScore + (state.league ? ' · week ' + state.league.week : '');
    }
    return '';
  }

  function stats() {
    return {
      ballId: state.ball,
      ownedBalls: [...state.ownedBalls],
      cueId: state.cue,
      ownedCues: [...state.ownedCues],
      gamesBowled: state.gamesBowled,
      gamesWon: state.gamesWon,
      averageScore: avgScore(),
      bestScore: state.bestScore,
      strikes: state.strikes,
      spares: state.spares,
      gutters: state.gutters,
      perfectGames: state.perfectGames,
      poolGames: state.poolGames,
      poolWon: state.poolWon,
      poolBreaks: state.poolBreaks,
      eightBallWins: state.eightBallWins,
      totalWinnings: state.totalWinnings,
      totalBet: state.totalBet,
      league: state.league ? { ...state.league } : null,
      leagueWins: state.leagueWins,
      leagueTitles: state.leagueTitles,
      hustlerBeaten: state.hustlerBeaten,
      tournamentsWon: state.tournamentsWon,
      rivalWins: state.rivalWins,
      membership: state.membership,
      memberSince: state.memberSince,
      alleyRating: state.alleyRating,
      bowlingActive: !!state.bowling,
      poolActive: !!state.pool,
    };
  }

  function serialize() {
    return {
      ball: state.ball,
      ownedBalls: [...state.ownedBalls],
      cue: state.cue,
      ownedCues: [...state.ownedCues],
      gamesBowled: state.gamesBowled,
      gamesWon: state.gamesWon,
      totalScore: state.totalScore,
      bestScore: state.bestScore,
      bestGame: state.bestGame ? JSON.parse(JSON.stringify(state.bestGame)) : null,
      strikes: state.strikes,
      spares: state.spares,
      gutters: state.gutters,
      perfectGames: state.perfectGames,
      poolGames: state.poolGames,
      poolWon: state.poolWon,
      poolBreaks: state.poolBreaks,
      eightBallWins: state.eightBallWins,
      totalWinnings: state.totalWinnings,
      totalBet: state.totalBet,
      league: state.league ? { ...state.league } : null,
      leagueWins: state.leagueWins,
      leagueTitles: state.leagueTitles,
      hustlerBeaten: state.hustlerBeaten,
      tournamentsWon: state.tournamentsWon,
      rivalWins: state.rivalWins,
      membership: state.membership,
      memberSince: state.memberSince,
      alleyRating: state.alleyRating,
      cosmicNights: state.cosmicNights,
      proShop: [...state.proShop],
      shoesShined: state.shoesShined,
      arcadeTokens: state.arcadeTokens,
    };
  }

  function deserialize(saved) {
    const s = saved || {};
    state.ball = typeof s.ball === 'string' ? s.ball : 'house';
    state.ownedBalls = Array.isArray(s.ownedBalls) && s.ownedBalls.length > 0 ? [...s.ownedBalls] : ['house'];
    state.cue = typeof s.cue === 'string' ? s.cue : 'house-cue';
    state.ownedCues = Array.isArray(s.ownedCues) && s.ownedCues.length > 0 ? [...s.ownedCues] : ['house-cue'];
    state.gamesBowled = Math.floor(Number(s.gamesBowled) || 0);
    state.gamesWon = Math.floor(Number(s.gamesWon) || 0);
    state.totalScore = Number(s.totalScore) || 0;
    state.bestScore = Number(s.bestScore) || 0;
    state.bestGame = s.bestGame ? JSON.parse(JSON.stringify(s.bestGame)) : null;
    state.strikes = Math.floor(Number(s.strikes) || 0);
    state.spares = Math.floor(Number(s.spares) || 0);
    state.gutters = Math.floor(Number(s.gutters) || 0);
    state.perfectGames = Math.floor(Number(s.perfectGames) || 0);
    state.poolGames = Math.floor(Number(s.poolGames) || 0);
    state.poolWon = Math.floor(Number(s.poolWon) || 0);
    state.poolBreaks = Math.floor(Number(s.poolBreaks) || 0);
    state.eightBallWins = Math.floor(Number(s.eightBallWins) || 0);
    state.totalWinnings = Number(s.totalWinnings) || 0;
    state.totalBet = Number(s.totalBet) || 0;
    state.league = s.league ? { ...s.league } : null;
    state.leagueWins = Math.floor(Number(s.leagueWins) || 0);
    state.leagueTitles = Math.floor(Number(s.leagueTitles) || 0);
    state.hustlerBeaten = Math.floor(Number(s.hustlerBeaten) || 0);
    state.tournamentsWon = Math.floor(Number(s.tournamentsWon) || 0);
    state.rivalWins = Math.floor(Number(s.rivalWins) || 0);
    state.membership = s.membership === true;
    state.memberSince = Math.floor(Number(s.memberSince) || 0);
    state.alleyRating = Number(s.alleyRating) || 4.2;
    state.cosmicNights = Math.floor(Number(s.cosmicNights) || 0);
    state.proShop = Array.isArray(s.proShop) ? [...s.proShop] : [];
    state.shoesShined = Math.floor(Number(s.shoesShined) || 0);
    state.arcadeTokens = Math.floor(Number(s.arcadeTokens) || 0);
    state.bowling = null;
    state.pool = null;
    state.drinks = 0;
    state.snacks = 0;
    return { ok: true };
  }

  function setOilPattern(patternId) {
    const pattern = OIL_PATTERNS.find((p) => p.id === patternId);
    if (!pattern) return { ok: false, reason: 'unknown-pattern' };
    if (!state.bowling) return { ok: false, reason: 'no-game' };
    state.bowling.oilPattern = patternId;
    state.bowling.oilBonus = pattern.bonus;
    return { ok: true, patternId, bonus: pattern.bonus };
  }

  function cosmicBowling() {
    if (state.bowling) return { ok: false, reason: 'game-active' };
    const hour = hourOf();
    const night = hour >= 21 || hour < 2;
    if (!night) return { ok: false, reason: 'not-night' };
    if (cashOf() < 15) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-15);
    const rented = rentLane('lane-4');
    if (!rented.ok) {
      moveCash(15);
      return rented;
    }
    state.bowling.cosmic = true;
    state.cosmicNights += 1;
    return { ok: true, cosmic: true };
  }

  function buyProShopItem(itemId) {
    const item = PRO_SHOP_ITEMS.find((i) => i.id === itemId);
    if (!item) return { ok: false, reason: 'unknown-item' };
    if (state.proShop.includes(itemId)) return { ok: false, reason: 'already-owned' };
    if (cashOf() < item.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-item.price);
    state.proShop.push(itemId);
    return { ok: true, itemId, price: item.price };
  }

  function shineShoes() {
    if (cashOf() < 5) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-5);
    state.shoesShined += 1;
    return { ok: true, cost: 5 };
  }

  function practiceFrame() {
    if (state.bowling) return { ok: false, reason: 'game-active' };
    if (cashOf() < 2) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-2);
    state.practiceFrames += 1;
    const knocked = Math.floor(rnd() * 11);
    if (knocked === 10) state.strikes += 1;
    return { ok: true, knocked, practiceFrames: state.practiceFrames };
  }

  function challengeRematch() {
    if (!state.bowling) return { ok: false, reason: 'no-game' };
    if (!state.bowling.opponent) return { ok: false, reason: 'no-opponent' };
    const oppId = state.bowling.opponent;
    const bet = state.bowling.bet;
    state.bowling = null;
    const rented = rentLane('lane-2');
    if (!rented.ok) return rented;
    return challengeOpponent(oppId, bet);
  }

  function alleyArcadeToken() {
    if (cashOf() < 5) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-5);
    state.arcadeTokens += 5;
    return { ok: true, tokens: state.arcadeTokens };
  }

  return {
    name: 'Bowling',
    state,
    rentLane,
    rollBall,
    finishBowlingGame,
    challengeOpponent,
    joinLeague,
    finishLeague,
    buyBall,
    buyMembership,
    buySnack,
    rackPool,
    shootPool,
    opponentPoolShot,
    winPool,
    losePool,
    buyCue,
    enterTournament,
    tick,
    tickDay,
    interact,
    hudLine,
    stats,
    serialize,
    deserialize,
    setOilPattern,
    cosmicBowling,
    buyProShopItem,
    shineShoes,
    practiceFrame,
    challengeRematch,
    alleyArcadeToken,
  };
}
