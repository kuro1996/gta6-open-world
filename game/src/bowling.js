// Lucky Strike Lanes — bowling and pool hall: real 10-frame scoring,
// 8-ball pool, bets, leagues and hustlers. Round 7, all-new system. Rent
// a lane, roll ten frames with genuine bowling math (strikes, spares,
// tenth-frame fill balls), or rack the pool table and call your shots.
// Bet on yourself, join the Tuesday league, and watch out for the
// hustlers — they let you win the first game.
export const BOWLING_ALLEY = { id: 'lucky-strike', name: 'Lucky Strike Lanes', x: -80, z: -120, district: 'Northside' };

export const BOWLING_LANES = [
  { id: 'lane-1', name: 'Lane 1', condition: 0.9, price: 10 },
  { id: 'lane-2', name: 'Lane 2', condition: 0.8, price: 10 },
  { id: 'lane-3', name: 'Lane 3', condition: 0.7, price: 8 },
  { id: 'lane-4', name: 'Lane 4', condition: 0.95, price: 14 },
  { id: 'lane-5', name: 'Lane 5', condition: 0.6, price: 6 },
  { id: 'lane-6', name: 'Lane 6 (VIP)', condition: 1.0, price: 25 },
];

export const BOWLING_BALLS = [
  { id: 'house', name: 'House Ball', price: 0, hook: 0, power: 1.0, weight: 12 },
  { id: 'storm', name: 'Storm Surge', price: 180, hook: 2, power: 1.1, weight: 14 },
  { id: 'hammer', name: 'Hammer Black', price: 260, hook: 3, power: 1.2, weight: 15 },
  { id: 'purple', name: 'Purple Pearl', price: 320, hook: 4, power: 1.15, weight: 13 },
  { id: 'gold', name: 'Gold Crown', price: 500, hook: 5, power: 1.3, weight: 16 },
];

export const POOL_TABLES = [
  { id: 'table-1', name: 'Table 1', condition: 0.9, price: 8 },
  { id: 'table-2', name: 'Table 2', condition: 0.8, price: 8 },
  { id: 'table-3', name: 'Table 3 (VIP)', condition: 1.0, price: 20 },
];

export const POOL_CUES = [
  { id: 'house-cue', name: 'House Cue', price: 0, accuracy: 1.0 },
  { id: 'players', name: 'Players Cue', price: 120, accuracy: 1.15 },
  { id: 'predator', name: 'Predator Cue', price: 400, accuracy: 1.35 },
  { id: 'meucci', name: 'Meucci Original', price: 650, accuracy: 1.5 },
];

export const BOWLING_OPPONENTS = [
  { id: 'eddie', name: 'Eddie Pins', skill: 0.55, bet: 20, trash: 'You call that a throw?' },
  { id: 'marla', name: 'Marla Strike', skill: 0.7, bet: 50, trash: 'I bowl 200 in my sleep.' },
  { id: 'big-tony', name: 'Big Tony', skill: 0.8, bet: 120, trash: 'Nice shoes. Shame about the game.' },
  { id: 'hustler', name: 'The Hustler', skill: 0.92, bet: 300, trash: 'First game is free, friend.' },
  { id: 'grandma', name: 'Grandma Rose', skill: 0.65, bet: 30, trash: 'My grandson bowls better than you.' },
  { id: 'pro', name: 'Pro Danny', skill: 0.95, bet: 500, trash: 'I was on TV, kid.' },
];

export const POOL_OPPONENTS = [
  { id: 'shark', name: 'Shark Sam', skill: 0.6, bet: 40, trash: 'Rack em up, rookie.' },
  { id: 'cue-queen', name: 'Cue Queen', skill: 0.75, bet: 100, trash: 'I run tables for breakfast.' },
  { id: 'old-mike', name: 'Old Mike', skill: 0.7, bet: 80, trash: 'Son, I taught your father pool.' },
  { id: 'hustler-pool', name: 'Silent Sal', skill: 0.9, bet: 250, trash: '...' },
];

export const BOWLING_LEAGUES = [
  { id: 'tuesday', name: 'Tuesday Night League', entry: 50, weeks: 4, prize: 400, minAvg: 0 },
  { id: 'friday', name: 'Friday Pro League', entry: 150, weeks: 4, prize: 1200, minAvg: 120 },
  { id: 'championship', name: 'Solara Championship', entry: 400, weeks: 6, prize: 5000, minAvg: 170 },
];

export const BOWLING_SNACKS = [
  { id: 'beer', name: 'Cold Beer', price: 5, effect: 'aim -5% next frame, +fun' },
  { id: 'nachos', name: 'Nachos', price: 8, effect: 'steady hands +5%' },
  { id: 'soda', name: 'Soda', price: 3, effect: 'nothing, but refreshing' },
  { id: 'wings', name: 'Hot Wings', price: 10, effect: 'sweaty palms -10% next frame' },
  { id: 'shoes', name: 'Shoe Rental', price: 4, effect: 'required to bowl' },
];

export function bowlingFrameScore(frames) {
  // Genuine ten-pin scoring: strikes and spares borrow the next balls.
  const rolls = [];
  for (const f of frames) {
    for (const r of f.rolls) rolls.push(r);
  }
  let score = 0;
  let rollIdx = 0;
  for (let frame = 0; frame < 10; frame++) {
    const f = frames[frame];
    if (!f) break;
    if (frame < 9) {
      if (f.rolls[0] === 10) {
        score += 10 + (rolls[rollIdx + 1] || 0) + (rolls[rollIdx + 2] || 0);
        rollIdx += 1;
      } else if ((f.rolls[0] || 0) + (f.rolls[1] || 0) === 10) {
        score += 10 + (rolls[rollIdx + 2] || 0);
        rollIdx += 2;
      } else {
        score += (f.rolls[0] || 0) + (f.rolls[1] || 0);
        rollIdx += 2;
      }
    } else {
      score += f.rolls.reduce((a, b) => a + b, 0);
    }
  }
  return score;
}

export function bowlingIsGameOver(frames) {
  if (frames.length < 10) return false;
  const tenth = frames[9];
  if (!tenth) return false;
  if (tenth.rolls.length < 2) return false;
  if (tenth.rolls[0] === 10 || tenth.rolls[0] + tenth.rolls[1] === 10) {
    return tenth.rolls.length >= 3;
  }
  return tenth.rolls.length >= 2;
}

export function createBowlingSystem(deps = {}) {
  const rng = deps.rng || Math.random;
  const getCash = deps.getCash || (() => 0);
  const addCash = deps.addCash || (() => {});
  const addHeat = deps.addHeat || (() => {});
  const log = deps.log || (() => {});
  const getDay = deps.getDay || (() => 1);
  const getHour = deps.getHour || (() => 12);
  const getPlayerPos = deps.getPlayerPos || (() => ({ x: 0, z: 0 }));

  const state = {
    ball: 'house',
    ownedBalls: ['house'],
    cue: 'house-cue',
    ownedCues: ['house-cue'],
    bowling: null, // { laneId, frames, frame, bet, opponent, opponentScore, shoesRented, aim, gamesPlayed }
    pool: null, // { tableId, myBalls, oppBalls, turn, bet, opponent, eightBall, solids }
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
    league: null, // { leagueId, week, wins, losses, avg }
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
  };

  function ballInfo() { return BOWLING_BALLS.find((b) => b.id === state.ball) || BOWLING_BALLS[0]; }
  function cueInfo() { return POOL_CUES.find((c) => c.id === state.cue) || POOL_CUES[0]; }
  function hasBall(id) { return state.ownedBalls.includes(id); }
  function hasCue(id) { return state.ownedCues.includes(id); }
  function avgScore() {
    return state.gamesBowled > 0 ? Math.round(state.totalScore / state.gamesBowled) : 0;
  }
  function aimModifier() {
    const ball = ballInfo();
    let aim = 0.55 + ball.hook * 0.04 + ball.power * 0.05;
    if (state.drinks > 0) aim -= 0.05 * state.drinks;
    if (state.snacks > 0) aim += 0.03;
    return Math.max(0.2, Math.min(0.95, aim));
  }

  function rentLane(laneId) {
    if (state.bowling) return { ok: false, reason: 'game-active' };
    const lane = BOWLING_LANES.find((l) => l.id === laneId);
    if (!lane) return { ok: false, reason: 'no-such-lane' };
    const price = state.membership ? Math.round(lane.price * 0.5) : lane.price;
    if (getCash() < price + 4) return { ok: false, reason: 'no-cash', need: price + 4 };
    addCash(-(price + 4));
    state.shoesRented += 1;
    state.bowling = {
      laneId, laneName: lane.name, condition: lane.condition,
      frames: [], frame: 0, bet: 0, opponent: null, opponentScore: 0,
      shoesRented: true, aim: aimModifier(), gamesPlayed: state.gamesBowled,
    };
    log(`Lane rented: ${lane.name} ($${price} + $4 shoes). Roll when ready!`);
    return { ok: true, lane: laneId, price };
  }

  function currentFrameIndex(game) {
    const frames = game.frames;
    if (frames.length === 0) return 0;
    const idx = frames.length - 1;
    const last = frames[idx];
    if (idx < 9) {
      if (last.rolls.length === 0) return idx;
      if (last.rolls[0] === 10) return idx + 1; // strike ends the frame
      if (last.rolls.length < 2) return idx; // second ball still pending
      return idx + 1;
    }
    // Tenth frame: two balls, plus a fill ball after a strike or spare.
    if (last.rolls.length < 2) return idx;
    if (last.rolls[0] === 10 || last.rolls[0] + last.rolls[1] === 10) {
      return last.rolls.length < 3 ? idx : idx + 1;
    }
    return idx + 1;
  }

  function pinsStandingFor(frame, isTenth) {
    const r = frame.rolls;
    if (!isTenth) return 10 - r.reduce((a, b) => a + b, 0);
    if (r.length === 0) return 10;
    if (r.length === 1) return r[0] === 10 ? 10 : 10 - r[0];
    if (r.length === 2) {
      if (r[0] === 10) return r[1] === 10 ? 10 : 10 - r[1];
      return 10; // spare earns a fresh rack for the fill ball
    }
    return 0;
  }

  function rollBall(power = 0.7, aim = 0.5) {
    const game = state.bowling;
    if (!game) return { ok: false, reason: 'no-game' };
    if (bowlingIsGameOver(game.frames)) return { ok: false, reason: 'game-over' };
    const frameIdx = currentFrameIndex(game);
    const isTenth = frameIdx === 9;
    let frame = game.frames[frameIdx];
    if (!frame) {
      frame = { rolls: [] };
      game.frames.push(frame);
    }
    const pinsStanding = pinsStandingFor(frame, isTenth);
    const laneFactor = game.condition;
    const aimErr = Math.abs(aim - 0.5) * 2;
    const skill = aimModifier() * laneFactor * (0.7 + power * 0.5);
    const roll = rng();
    let knocked = 0;
    if (roll < skill * 0.28) {
      knocked = pinsStanding; // strike-ish luck
    } else if (roll < skill * 0.75) {
      knocked = Math.max(1, Math.round(pinsStanding * (0.55 + rng() * 0.4)));
    } else if (roll < skill + 0.15) {
      knocked = Math.max(0, Math.round(pinsStanding * (0.2 + rng() * 0.3)));
    } else {
      knocked = rng() < 0.12 ? 0 : Math.max(0, Math.round(pinsStanding * rng() * 0.25));
    }
    knocked = Math.min(pinsStanding, knocked);
    // Aim error can gutter the ball entirely.
    if (aimErr > 0.8 && rng() < 0.25) {
      knocked = 0;
      state.gutters += 1;
      log('GUTTER BALL! The ball slides into the gutter.');
    }
    frame.rolls.push(knocked);
    if (knocked === 10 && frame.rolls.length === 1 && !isTenth) state.strikes += 1;
    if (!isTenth && frame.rolls.length === 2 && frame.rolls[0] + frame.rolls[1] === 10) state.spares += 1;
    if (isTenth && knocked === 10) state.strikes += 1;
    const score = bowlingFrameScore(game.frames);
    const over = bowlingIsGameOver(game.frames);
    let msg = `Frame ${frameIdx + 1}, ball ${frame.rolls.length}: ${knocked} pins! Score ${score}.`;
    if (knocked === 10 && frame.rolls.length === 1) msg = `STRIKE! Frame ${frameIdx + 1}. Score ${score}.`;
    else if (!isTenth && frame.rolls.length === 2 && frame.rolls[0] + frame.rolls[1] === 10) msg = `SPARE! Frame ${frameIdx + 1}. Score ${score}.`;
    log(msg);
    if (over) return finishBowlingGame();
    return { ok: true, knocked, frame: frameIdx + 1, score, gameOver: false };
  }

  function finishBowlingGame() {
    const game = state.bowling;
    if (!game) return { ok: false, reason: 'no-game' };
    const score = bowlingFrameScore(game.frames);
    state.bowling = null;
    state.gamesBowled += 1;
    state.totalScore += score;
    if (score > state.bestScore) {
      state.bestScore = score;
      state.bestGame = game.frames.map((f) => [...f.rolls]);
    }
    if (score === 300) {
      state.perfectGames += 1;
      addCash(500);
      state.totalWinnings += 500;
      log('PERFECT GAME — 300! The alley erupts! $500 bonus!');
    }
    let wonBet = false;
    let betResult = 0;
    if (game.opponent) {
      const opp = BOWLING_OPPONENTS.find((o) => o.id === game.opponent);
      const oppScore = Math.round(90 + opp.skill * 130 + rng() * 40);
      game.opponentScore = oppScore;
      if (score > oppScore) {
        wonBet = true;
        betResult = game.bet * 2;
        addCash(betResult);
        state.totalWinnings += betResult;
        state.gamesWon += 1;
        state.rivalWins += 1;
        if (opp.id === 'hustler') state.hustlerBeaten += 1;
        log(`You beat ${opp.name} ${score}–${oppScore}! Won $${betResult}.`);
      } else if (score === oppScore) {
        addCash(game.bet);
        log(`Tie with ${opp.name} at ${score}! Your bet is returned.`);
        betResult = game.bet;
      } else {
        log(`${opp.name} beats you ${oppScore}–${score}. "${opp.trash}"`);
      }
    }
    // League scoring.
    if (state.league) {
      const lg = state.league;
      if (score >= 150) { lg.wins += 1; state.leagueWins += 1; }
      else lg.losses += 1;
      lg.week += 1;
      lg.avg = Math.round(state.totalScore / state.gamesBowled);
      const def = BOWLING_LEAGUES.find((l) => l.id === lg.leagueId);
      if (lg.week > def.weeks) {
        finishLeague();
      }
    }
    log(`Game over: ${score} (avg ${avgScore()}, best ${state.bestScore}).`);
    return { ok: true, score, gameOver: true, best: state.bestScore, wonBet, betResult, opponentScore: game.opponentScore };
  }

  function challengeOpponent(oppId, bet) {
    const opp = BOWLING_OPPONENTS.find((o) => o.id === oppId);
    if (!opp) return { ok: false, reason: 'no-such-opponent' };
    if (!state.bowling) return { ok: false, reason: 'no-game' };
    if (state.bowling.bet > 0) return { ok: false, reason: 'bet-placed' };
    if (bet !== opp.bet) return { ok: false, reason: 'wrong-bet', need: opp.bet };
    if (getCash() < bet) return { ok: false, reason: 'no-cash', need: bet };
    addCash(-bet);
    state.totalBet += bet;
    state.bowling.bet = bet;
    state.bowling.opponent = oppId;
    log(`${opp.name} accepts your $${bet} bet. "${opp.trash}"`);
    return { ok: true, opponent: oppId, bet };
  }

  function joinLeague(leagueId) {
    const league = BOWLING_LEAGUES.find((l) => l.id === leagueId);
    if (!league) return { ok: false, reason: 'no-such-league' };
    if (state.league) return { ok: false, reason: 'league-active' };
    if (avgScore() < league.minAvg && state.gamesBowled >= 3) return { ok: false, reason: 'avg-too-low', need: league.minAvg };
    if (getCash() < league.entry) return { ok: false, reason: 'no-cash', need: league.entry };
    addCash(-league.entry);
    state.league = { leagueId, week: 1, wins: 0, losses: 0, avg: avgScore() };
    log(`Joined the ${league.name}! Entry $${league.entry}, ${league.weeks} weeks, prize $${league.prize}.`);
    return { ok: true, league: leagueId };
  }

  function finishLeague() {
    const lg = state.league;
    if (!lg) return null;
    const def = BOWLING_LEAGUES.find((l) => l.id === lg.leagueId);
    state.league = null;
    const won = lg.wins > lg.losses;
    if (won) {
      addCash(def.prize);
      state.totalWinnings += def.prize;
      state.leagueTitles += 1;
      log(`LEAGUE CHAMPIONS! ${def.name} — ${lg.wins}–${lg.losses}. Prize $${def.prize}!`);
      return { won: true, prize: def.prize, record: `${lg.wins}–${lg.losses}` };
    }
    log(`${def.name} over: ${lg.wins}–${lg.losses}. Better luck next season.`);
    return { won: false, prize: 0, record: `${lg.wins}–${lg.losses}` };
  }

  function buyBall(ballId) {
    const ball = BOWLING_BALLS.find((b) => b.id === ballId);
    if (!ball) return { ok: false, reason: 'no-such-ball' };
    if (hasBall(ballId)) {
      state.ball = ballId;
      return { ok: true, ball: ballId, switched: true };
    }
    if (getCash() < ball.price) return { ok: false, reason: 'no-cash', need: ball.price };
    addCash(-ball.price);
    state.ownedBalls.push(ballId);
    state.ball = ballId;
    log(`Bought the ${ball.name} for $${ball.price}! Hook ${ball.hook}, power x${ball.power}.`);
    return { ok: true, ball: ballId, price: ball.price };
  }

  function buyMembership() {
    if (state.membership) return { ok: false, reason: 'already-member' };
    const price = 200;
    if (getCash() < price) return { ok: false, reason: 'no-cash', need: price };
    addCash(-price);
    state.membership = true;
    state.memberSince = getDay();
    log('Lucky Strike membership! Half-price lanes forever.');
    return { ok: true, price };
  }

  function buySnack(snackId) {
    const snack = BOWLING_SNACKS.find((s) => s.id === snackId);
    if (!snack) return { ok: false, reason: 'no-such-snack' };
    if (getCash() < snack.price) return { ok: false, reason: 'no-cash', need: snack.price };
    addCash(-snack.price);
    if (snackId === 'beer') state.drinks += 1;
    else if (snackId === 'nachos') state.snacks += 1;
    log(`Bought ${snack.name} for $${snack.price}. ${snack.effect}.`);
    return { ok: true, snack: snackId, price: snack.price };
  }

  function rackPool(tableId, oppId, bet) {
    if (state.pool) return { ok: false, reason: 'game-active' };
    const table = POOL_TABLES.find((t) => t.id === tableId);
    if (!table) return { ok: false, reason: 'no-such-table' };
    const price = state.membership ? Math.round(table.price * 0.5) : table.price;
    if (getCash() < price) return { ok: false, reason: 'no-cash', need: price };
    let opp = null;
    if (oppId) {
      opp = POOL_OPPONENTS.find((o) => o.id === oppId);
      if (!opp) return { ok: false, reason: 'no-such-opponent' };
      if (bet !== opp.bet) return { ok: false, reason: 'wrong-bet', need: opp.bet };
      if (getCash() < price + bet) return { ok: false, reason: 'no-cash', need: price + bet };
      addCash(-bet);
      state.totalBet += bet;
    }
    addCash(-price);
    state.poolBreaks += 1;
    state.pool = {
      tableId, tableName: table.name, condition: table.condition,
      myBalls: 7, oppBalls: 7, turn: 'you', bet: bet || 0,
      opponent: oppId || null, eightBall: false, solids: rng() < 0.5,
      shots: 0, fouls: 0,
    };
    log(`Racked on ${table.name} ($${price}).${opp ? ` ${opp.name} plays for $${bet}. "${opp.trash}"` : ' Practice game.'}`);
    return { ok: true, table: tableId, opponent: oppId || null, bet: bet || 0 };
  }

  function shootPool(calledPocket = 'corner') {
    const game = state.pool;
    if (!game) return { ok: false, reason: 'no-game' };
    if (game.turn !== 'you') return { ok: false, reason: 'not-your-turn' };
    game.shots += 1;
    const cue = cueInfo();
    const skill = 0.5 * cue.accuracy * game.condition * (state.drinks > 0 ? 0.9 : 1);
    const roll = rng();
    let sunk = 0;
    let foul = false;
    if (roll < skill * 0.55) {
      sunk = 1 + (rng() < 0.2 ? 1 : 0);
    } else if (roll < skill + 0.2) {
      sunk = 1;
    } else if (roll < skill + 0.35) {
      sunk = 0;
    } else {
      foul = true;
      game.fouls += 1;
    }
    if (game.eightBall) {
      // Shooting at the 8-ball: make it and win, miss/scratch and lose.
      if (foul) {
        return losePool('Scratched on the 8-ball!');
      }
      if (sunk > 0) {
        return winPool(`Sank the 8-ball in the ${calledPocket} pocket!`);
      }
      game.turn = 'opponent';
      log('Missed the 8-ball... your opponent steps up.');
      return { ok: true, sunk: 0, turn: 'opponent', eightBall: true };
    }
    if (foul) {
      log('FOUL! Cue ball scratched. Ball in hand for your opponent.');
      game.turn = 'opponent';
      return { ok: true, sunk: 0, foul: true, turn: 'opponent' };
    }
    game.myBalls = Math.max(0, game.myBalls - sunk);
    if (game.myBalls === 0) {
      game.eightBall = true;
      log(`Cleared your ${game.solids ? 'solids' : 'stripes'}! Now the 8-ball — call your pocket.`);
      return { ok: true, sunk, eightBall: true, turn: 'you' };
    }
    if (sunk > 0) {
      log(`Sank ${sunk} ball${sunk > 1 ? 's' : ''}! Shoot again. (${game.myBalls} left)`);
      return { ok: true, sunk, turn: 'you' };
    }
    game.turn = 'opponent';
    log('Missed. Your opponent takes the table.');
    return { ok: true, sunk: 0, turn: 'opponent' };
  }

  function opponentPoolShot() {
    const game = state.pool;
    if (!game) return { ok: false, reason: 'no-game' };
    if (game.turn !== 'opponent') return { ok: false, reason: 'not-opponent-turn' };
    if (!game.opponent) {
      game.turn = 'you';
      return { ok: true, turn: 'you', practice: true };
    }
    const opp = POOL_OPPONENTS.find((o) => o.id === game.opponent);
    const skill = opp.skill * game.condition;
    const roll = rng();
    if (game.eightBall) {
      if (roll < skill * 0.7) {
        return losePool(`${opp.name} sinks the 8-ball. Game over.`);
      }
      game.turn = 'you';
      log(`${opp.name} misses the 8-ball! Your turn.`);
      return { ok: true, turn: 'you' };
    }
    let sunk = 0;
    if (roll < skill * 0.6) sunk = 1 + (rng() < 0.15 ? 1 : 0);
    else if (roll < skill + 0.2) sunk = 1;
    game.oppBalls = Math.max(0, game.oppBalls - sunk);
    if (game.oppBalls === 0) {
      game.eightBall = true;
      log(`${opp.name} cleared their balls! Now the 8-ball — don't let them make it.`);
      game.turn = 'you';
      return { ok: true, sunk, turn: 'you', eightBall: true };
    }
    if (sunk > 0) {
      log(`${opp.name} sinks ${sunk}. They shoot again.`);
      return { ok: true, sunk, turn: 'opponent' };
    }
    game.turn = 'you';
    log(`${opp.name} misses. Your turn.`);
    return { ok: true, sunk: 0, turn: 'you' };
  }

  function winPool(how) {
    const game = state.pool;
    state.pool = null;
    state.poolGames += 1;
    state.poolWon += 1;
    state.eightBallWins += 1;
    let payout = 0;
    if (game.bet > 0) {
      payout = game.bet * 2;
      addCash(payout);
      state.totalWinnings += payout;
    }
    log(`POOL WIN! ${how} ${payout ? `Won $${payout}.` : ''}`);
    return { ok: true, won: true, payout, how };
  }

  function losePool(how) {
    const game = state.pool;
    state.pool = null;
    state.poolGames += 1;
    log(`POOL LOSS. ${how}`);
    return { ok: true, won: false, how };
  }

  function buyCue(cueId) {
    const cue = POOL_CUES.find((c) => c.id === cueId);
    if (!cue) return { ok: false, reason: 'no-such-cue' };
    if (hasCue(cueId)) {
      state.cue = cueId;
      return { ok: true, cue: cueId, switched: true };
    }
    if (getCash() < cue.price) return { ok: false, reason: 'no-cash', need: cue.price };
    addCash(-cue.price);
    state.ownedCues.push(cueId);
    state.cue = cueId;
    log(`Bought the ${cue.name} for $${cue.price}! Accuracy x${cue.accuracy}.`);
    return { ok: true, cue: cueId, price: cue.price };
  }

  function enterTournament() {
    if (state.bowling) return { ok: false, reason: 'game-active' };
    const entry = 100;
    if (avgScore() < 140 && state.gamesBowled >= 3) return { ok: false, reason: 'avg-too-low', need: 140 };
    if (getCash() < entry) return { ok: false, reason: 'no-cash', need: entry };
    addCash(-entry);
    // A tournament is three games back to back, simulated frame by frame.
    const scores = [];
    for (let g = 0; g < 3; g++) {
      const frames = [];
      for (let f = 0; f < 10; f++) {
        const frame = { rolls: [] };
        const first = rng() < aimModifier() * 0.4 ? 10 : Math.floor(rng() * 8) + 1;
        frame.rolls.push(Math.min(10, first));
        if (first < 10) {
          frame.rolls.push(Math.min(10 - first, Math.floor(rng() * (10 - first + 1))));
        } else if (f === 9) {
          frame.rolls.push(Math.floor(rng() * 11));
          frame.rolls.push(Math.floor(rng() * 11));
        }
        if (f === 9 && (frame.rolls[0] === 10 || frame.rolls[0] + frame.rolls[1] === 10) && frame.rolls.length < 3) {
          frame.rolls.push(Math.floor(rng() * 11));
        }
        frames.push(frame);
      }
      scores.push(bowlingFrameScore(frames));
    }
    const total = scores.reduce((a, b) => a + b, 0);
    const avg = Math.round(total / 3);
    const won = avg >= 170;
    if (won) {
      const prize = 800;
      addCash(prize);
      state.totalWinnings += prize;
      state.tournamentsWon += 1;
      log(`TOURNAMENT WIN! Games ${scores.join(', ')} (avg ${avg}). Prize $${prize}!`);
      return { ok: true, won: true, scores, avg, prize };
    }
    log(`Tournament over: games ${scores.join(', ')} (avg ${avg}). Not enough to win.`);
    return { ok: true, won: false, scores, avg, prize: 0 };
  }

  function tick(dt) {
    // Drinks wear off; the alley never closes.
    if (state.drinks > 0 && rng() < dt * 0.02) state.drinks = Math.max(0, state.drinks - 1);
    if (state.snacks > 0 && rng() < dt * 0.01) state.snacks = Math.max(0, state.snacks - 1);
    // A league night happens automatically on Tuesdays at the alley.
    if (state.league && getDay() % 7 === 2 && getHour() >= 19 && !state.bowling) {
      log('League night! Your league game is waiting — rent a lane.');
    }
  }

  function tickDay(day) {
    // New day: the alley resets, drinks wear off, league weeks tick.
    state.drinks = 0;
    state.snacks = 0;
    return { day, avg: avgScore(), best: state.bestScore };
  }

  function interact() {
    const p = getPlayerPos();
    const d = Math.hypot(BOWLING_ALLEY.x - p.x, BOWLING_ALLEY.z - p.z);
    if (d > 18) return false;
    if (state.bowling) {
      const res = rollBall(0.7, 0.5);
      return res.ok;
    }
    if (state.pool) {
      if (state.pool.turn === 'you') return shootPool('corner').ok;
      return opponentPoolShot().ok;
    }
    const res = rentLane('lane-2');
    return res.ok || res.reason === 'no-cash';
  }

  function hudLine() {
    if (state.bowling) {
      const g = state.bowling;
      const score = bowlingFrameScore(g.frames);
      return `BOWLING ${g.laneName} · frame ${g.frames.length + 1}/10 · score ${score}${g.opponent ? ` · vs ${g.opponent}` : ''}`;
    }
    if (state.pool) {
      const g = state.pool;
      return `POOL ${g.tableName} · you ${g.myBalls} · opp ${g.oppBalls}${g.eightBall ? ' · 8-BALL!' : ''} · ${g.turn}`;
    }
    const p = getPlayerPos();
    if (Math.hypot(BOWLING_ALLEY.x - p.x, BOWLING_ALLEY.z - p.z) < 18) {
      return `LUCKY STRIKE · avg ${avgScore()} · best ${state.bestScore}${state.league ? ` · league wk ${state.league.week}` : ''}`;
    }
    return '';
  }

  function stats() {
    return {
      ball: state.ball,
      ownedBalls: [...state.ownedBalls],
      cue: state.cue,
      ownedCues: [...state.ownedCues],
      gamesBowled: state.gamesBowled,
      gamesWon: state.gamesWon,
      avgScore: avgScore(),
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
      bestGame: state.bestGame ? state.bestGame.map((f) => [...f]) : null,
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
      cosmicNights: state.cosmicNights || 0,
      proShop: [...(state.proShop || [])],
      shoesShined: state.shoesShined || 0,
      arcadeTokens: state.arcadeTokens || 0,
    };
  }

  function deserialize(d) {
    if (!d) return;
    state.ball = d.ball || 'house';
    state.ownedBalls = [...(d.ownedBalls || ['house'])];
    state.cue = d.cue || 'house-cue';
    state.ownedCues = [...(d.ownedCues || ['house-cue'])];
    state.gamesBowled = d.gamesBowled ?? 0;
    state.gamesWon = d.gamesWon ?? 0;
    state.totalScore = d.totalScore ?? 0;
    state.bestScore = d.bestScore ?? 0;
    state.bestGame = d.bestGame ? d.bestGame.map((f) => [...f]) : null;
    state.strikes = d.strikes ?? 0;
    state.spares = d.spares ?? 0;
    state.gutters = d.gutters ?? 0;
    state.perfectGames = d.perfectGames ?? 0;
    state.poolGames = d.poolGames ?? 0;
    state.poolWon = d.poolWon ?? 0;
    state.poolBreaks = d.poolBreaks ?? 0;
    state.eightBallWins = d.eightBallWins ?? 0;
    state.totalWinnings = d.totalWinnings ?? 0;
    state.totalBet = d.totalBet ?? 0;
    state.league = d.league ? { ...d.league } : null;
    state.leagueWins = d.leagueWins ?? 0;
    state.leagueTitles = d.leagueTitles ?? 0;
    state.hustlerBeaten = d.hustlerBeaten ?? 0;
    state.tournamentsWon = d.tournamentsWon ?? 0;
    state.rivalWins = d.rivalWins ?? 0;
    state.membership = !!d.membership;
    state.memberSince = d.memberSince ?? 0;
    state.alleyRating = d.alleyRating ?? 4.2;
    state.cosmicNights = d.cosmicNights ?? 0;
    state.proShop = [...(d.proShop || [])];
    state.shoesShined = d.shoesShined ?? 0;
    state.arcadeTokens = d.arcadeTokens ?? 0;
    state.bowling = null;
    state.pool = null;
    state.drinks = 0;
    state.snacks = 0;
  }

  // --- Round 7 top-up: cosmic bowling, pro shop, oil patterns ---
  const BOWLING_OIL_PATTERNS = [
    { id: 'house-shot', name: 'House Shot', difficulty: 1, bonus: 0 },
    { id: 'sport', name: 'Sport Pattern', difficulty: 2, bonus: 10 },
    { id: 'shark', name: 'Shark Pattern', difficulty: 3, bonus: 25 },
    { id: 'cheetah', name: 'Cheetah Pattern', difficulty: 2, bonus: 15 },
    { id: 'scorpion', name: 'Scorpion Pattern', difficulty: 4, bonus: 40 },
  ];
  const BOWLING_PRO_SHOP = [
    { id: 'drilling', name: 'Custom Drilling', price: 60, effect: '+5% aim' },
    { id: 'polish', name: 'Ball Polish', price: 25, effect: '+3% hook' },
    { id: 'glove', name: 'Bowling Glove', price: 45, effect: '+5% aim' },
    { id: 'wrist', name: 'Wrist Support', price: 55, effect: '+4% power' },
    { id: 'towel', name: 'Microfiber Towel', price: 15, effect: '+2% aim' },
    { id: 'bag', name: 'Triple Ball Bag', price: 120, effect: 'carry 3 balls, +style' },
  ];
  function setOilPattern(patternId) {
    const pattern = BOWLING_OIL_PATTERNS.find((p) => p.id === patternId);
    if (!pattern) return { ok: false, reason: 'no-such-pattern' };
    if (!state.bowling) return { ok: false, reason: 'no-game' };
    state.bowling.oilPattern = patternId;
    state.bowling.oilBonus = pattern.bonus;
    log(`Lane oiled with the ${pattern.name} pattern. Difficulty ${pattern.difficulty}, score bonus +${pattern.bonus}.`);
    return { ok: true, pattern: patternId, bonus: pattern.bonus };
  }
  function cosmicBowling() {
    if (state.bowling) return { ok: false, reason: 'game-active' };
    const hour = getHour();
    if (hour < 21 && hour >= 2) return { ok: false, reason: 'not-night', open: '21:00' };
    const price = 15;
    if (getCash() < price) return { ok: false, reason: 'no-cash', need: price };
    addCash(-price);
    const res = rentLane('lane-4');
    if (!res.ok) {
      addCash(price);
      return res;
    }
    state.bowling.cosmic = true;
    state.cosmicNights = (state.cosmicNights || 0) + 1;
    log('COSMIC BOWLING! Black lights, neon pins, loud music. Double the fun!');
    return { ok: true, cosmic: true };
  }
  function buyProShopItem(itemId) {
    const item = BOWLING_PRO_SHOP.find((i) => i.id === itemId);
    if (!item) return { ok: false, reason: 'no-such-item' };
    state.proShop = state.proShop || [];
    if (state.proShop.includes(itemId)) return { ok: false, reason: 'already-owned' };
    if (getCash() < item.price) return { ok: false, reason: 'no-cash', need: item.price };
    addCash(-item.price);
    state.proShop.push(itemId);
    log(`Pro shop: ${item.name} for $${item.price}. ${item.effect}.`);
    return { ok: true, item: itemId, price: item.price };
  }
  function shineShoes() {
    const cost = 5;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.shoesShined = (state.shoesShined || 0) + 1;
    log(`Shoes shined for $${cost}. You slide like a pro.`);
    return { ok: true, cost };
  }
  function practiceFrame() {
    if (state.bowling) return { ok: false, reason: 'game-active' };
    const cost = 2;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.practiceFrames += 1;
    const knocked = Math.floor(rng() * 11);
    if (knocked === 10) state.strikes += 1;
    log(`Practice frame: ${knocked} pins.`);
    return { ok: true, knocked, practiceFrames: state.practiceFrames };
  }
  function challengeRematch() {
    if (!state.bowling || !state.bowling.opponent) return { ok: false, reason: 'no-opponent' };
    const oppId = state.bowling.opponent;
    const bet = state.bowling.bet;
    state.bowling = null;
    const lane = rentLane('lane-2');
    if (!lane.ok) return lane;
    return challengeOpponent(oppId, bet);
  }
  function alleyArcadeToken() {
    const cost = 5;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.arcadeTokens = (state.arcadeTokens || 0) + 5;
    log(`Bought 5 arcade tokens for $${cost} at the alley counter.`);
    return { ok: true, tokens: state.arcadeTokens };
  }

  return {
    state,
    tick,
    tickDay,
    interact,
    hudLine,
    stats,
    serialize,
    deserialize,
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
    avgScore,
    aimModifier,
    hasBall,
    hasCue,
    setOilPattern,
    cosmicBowling,
    buyProShopItem,
    shineShoes,
    practiceFrame,
    challengeRematch,
    alleyArcadeToken,
  };
}
