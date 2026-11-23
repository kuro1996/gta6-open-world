// Solara Nights — Underground Fight Club (Round 6 attempt 8).
// First rule: you do not talk about it. Second rule: you bet on it.
// Train at the gym to raise your power, study five regulars with very
// different styles, then step into the ring. Fights run in rounds:
// each round you pick a stance — strike, grapple or counter — and the
// dice plus your power decide who lands. Win the purse, lose the bet
// and a little pride; lose three in a row and the crowd turns on you.
// The system owns its state and only touches the game through the small
// ctx hooks below (rng / getCash / addCash / addHeat / log), the same
// factory pattern as arcade.js / bank.js / tuning.js.

export const FIGHTERS = [
  {
    id: 'tiny',
    name: 'Tiny Malone',
    style: 'brawler',
    power: 42,
    stamina: 55,
    purse: 300,
    blurb: 'Six foot six, all shoulders. Swings like a wrecking ball, gasses fast.',
  },
  {
    id: 'viper',
    name: 'Viper Sal',
    style: 'striker',
    power: 58,
    stamina: 62,
    purse: 600,
    blurb: 'Fast hands, faster feet. Never stands still long enough to hit.',
  },
  {
    id: 'ox',
    name: 'Ox Ferreira',
    style: 'grappler',
    power: 66,
    stamina: 70,
    purse: 1000,
    blurb: 'Once he grabs you, the round is a wrestling match on his terms.',
  },
  {
    id: 'ghost-fist',
    name: 'Ghost Fist',
    style: 'counter',
    power: 78,
    stamina: 74,
    purse: 1800,
    blurb: 'Lets you swing first, then makes you pay for every miss.',
  },
  {
    id: 'the-king',
    name: 'King Marrow',
    style: 'brawler',
    power: 92,
    stamina: 85,
    purse: 4000,
    blurb: 'Undefeated in forty-one fights. The belt, the crowd, the legend.',
  },
];

// Stance triangle: strike beats grapple, grapple beats counter, counter
// beats strike. A winning stance adds +12 to your round score; a losing
// stance subtracts 12. Power is your base; stamina drains each round.
const STANCES = ['strike', 'grapple', 'counter'];
const BEATS = { strike: 'grapple', grapple: 'counter', counter: 'strike' };
const TRAIN_COST = 100;
const TRAIN_GAIN = 4;
const MAX_POWER = 100;
const ROUNDS_PER_FIGHT = 3;

export function stanceBeats(a, b) {
  return BEATS[a] === b;
}

export function createFightClubSystem(ctx) {
  const state = {
    power: 40, // Ria's base power; training raises it, max 100
    fights: 0,
    wins: 0,
    losses: 0,
    kos: 0,
    earned: 0,
    spent: 0,
    betsWon: 0,
    betsLost: 0,
    streak: 0,
    bestStreak: 0,
    belt: false,
    active: null, // { fighterId, bet, round, yourScore, oppScore, log: [] }
    lastFight: null,
  };

  function fighterById(id) {
    return FIGHTERS.find((f) => f.id === id) || null;
  }

  function train() {
    if (state.power >= MAX_POWER) return { ok: false, reason: 'max-power' };
    if (ctx.getCash() < TRAIN_COST) return { ok: false, reason: 'no-cash', need: TRAIN_COST };
    ctx.addCash(-TRAIN_COST);
    state.spent += TRAIN_COST;
    state.power = Math.min(MAX_POWER, state.power + TRAIN_GAIN);
    ctx.log(`Trained hard — power now ${state.power}. ($${TRAIN_COST})`);
    return { ok: true, power: state.power, cost: TRAIN_COST };
  }

  function challenge(id, bet) {
    const fighter = fighterById(id);
    if (!fighter) return { ok: false, reason: 'no-such-fighter' };
    if (state.active) return { ok: false, reason: 'fight-active' };
    if (id === 'the-king' && state.wins < 3) {
      return { ok: false, reason: 'not-ready', need: '3 wins before the King will face you' };
    }
    const n = Math.floor(Number(bet) || 0);
    if (n < 0) return { ok: false, reason: 'bad-bet' };
    if (n > 0) {
      if (ctx.getCash() < n) return { ok: false, reason: 'no-cash', need: n };
      ctx.addCash(-n);
      state.spent += n;
    }
    state.active = {
      fighterId: id, bet: n, round: 0,
      yourScore: 0, oppScore: 0, rounds: [],
    };
    ctx.log(`Fight on: Ria vs ${fighter.name} — ${ROUNDS_PER_FIGHT} rounds, purse $${fighter.purse}${n ? `, your bet $${n}` : ''}.`);
    return { ok: true, fighter: fighter.name, purse: fighter.purse, bet: n, rounds: ROUNDS_PER_FIGHT };
  }

  // Fight one round. Your round score: power + stance bonus + dice 0–20.
  // Opponent: their power + dice 0–20, plus a stamina fade in round 3
  // (they lose 5 if their stamina is under 65). Win the round, win the
  // crowd; win 2 of 3 rounds, win the fight.
  function fightRound(stance) {
    if (!state.active) return { ok: false, reason: 'no-fight' };
    if (!STANCES.includes(stance)) return { ok: false, reason: 'bad-stance', stances: STANCES };
    const fighter = fighterById(state.active.fighterId);
    const roundNo = state.active.round + 1;
    const roll = () => (ctx.rng ? ctx.rng() : Math.random()) * 20;
    // The opponent picks a stance too; brawlers favour strike, grapplers
    // favour grapple, counters favour counter.
    const oppStance = fighter.style === 'brawler' ? 'strike'
      : fighter.style === 'grappler' ? 'grapple'
      : fighter.style === 'counter' ? 'counter' : 'strike';
    let bonus = 0;
    if (stanceBeats(stance, oppStance)) bonus = 12;
    else if (stanceBeats(oppStance, stance)) bonus = -12;
    const yourScore = state.power + bonus + roll();
    let oppScore = fighter.power + roll();
    if (roundNo === ROUNDS_PER_FIGHT && fighter.stamina < 65) oppScore -= 5;
    const won = yourScore > oppScore;
    const round = {
      round: roundNo, stance, oppStance, bonus,
      yourScore: Math.round(yourScore), oppScore: Math.round(oppScore), won,
    };
    state.active.rounds.push(round);
    if (won) state.active.yourScore += 1;
    else state.active.oppScore += 1;
    ctx.log(`Round ${roundNo}: ${stance} vs ${oppStance} — ${Math.round(yourScore)} vs ${Math.round(oppScore)} (${won ? 'yours' : 'theirs'}).`);
    // Three rounds, no more: roundNo is 1-based, so the fight ends when
    // the third round is scored — not after a phantom fourth round.
    if (roundNo < ROUNDS_PER_FIGHT) {
      state.active.round += 1;
      return { ok: true, ...round, fightOver: false, score: `${state.active.yourScore}-${state.active.oppScore}` };
    }
    return finishFight();
  }

  function finishFight() {
    const fighter = fighterById(state.active.fighterId);
    const won = state.active.yourScore > state.active.oppScore;
    const ko = won && state.active.oppScore === 0;
    const bet = state.active.bet;
    let payout = 0;
    if (won) {
      payout = fighter.purse + (bet > 0 ? bet * 2 : 0);
      if (bet > 0) state.betsWon += 1;
    } else if (bet > 0) {
      state.betsLost += 1;
    }
    if (payout > 0) ctx.addCash(payout);
    state.fights += 1;
    if (won) {
      state.wins += 1;
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      if (ko) state.kos += 1;
      if (fighter.id === 'the-king' && !state.belt) {
        state.belt = true;
        ctx.addCash(2500);
        payout += 2500;
        state.earned += 2500;
      }
    } else {
      state.losses += 1;
      state.streak = 0;
      if (ctx.addHeat) ctx.addHeat(1); // a loud loss draws the wrong eyes
    }
    state.earned += payout;
    state.lastFight = {
      fighter: fighter.name, won, ko, rounds: state.active.rounds,
      score: `${state.active.yourScore}-${state.active.oppScore}`,
      payout, belt: state.belt,
    };
    state.active = null;
    ctx.log(won
      ? `${fighter.name} beaten ${state.lastFight.score} — +$${payout}${ko ? ' by KNOCKOUT' : ''}${state.belt && fighter.id === 'the-king' ? ' — THE BELT IS YOURS (+$2,500)' : ''}.`
      : `${fighter.name} takes it ${state.lastFight.score}. The crowd moves on.`);
    return { ok: true, fightOver: true, ...state.lastFight };
  }

  function forfeit() {
    if (!state.active) return { ok: false, reason: 'no-fight' };
    const name = fighterById(state.active.fighterId).name;
    state.active = null;
    state.losses += 1;
    state.fights += 1;
    state.streak = 0;
    ctx.log(`Threw in the towel against ${name}. The bet stays with the house.`);
    return { ok: true, fighter: name };
  }

  function fighterStatus(id) {
    const f = fighterById(id);
    if (!f) return null;
    return {
      ...f,
      locked: id === 'the-king' && state.wins < 3,
      lockNote: id === 'the-king' && state.wins < 3 ? `Need ${3 - state.wins} more win(s)` : null,
    };
  }

  function stats() {
    return {
      power: state.power,
      fights: state.fights,
      wins: state.wins,
      losses: state.losses,
      kos: state.kos,
      streak: state.streak,
      bestStreak: state.bestStreak,
      belt: state.belt,
      earned: state.earned,
      spent: state.spent,
      profit: state.earned - state.spent,
      betsWon: state.betsWon,
      betsLost: state.betsLost,
      active: state.active ? { fighter: state.active.fighterId, round: state.active.round, score: `${state.active.yourScore}-${state.active.oppScore}` } : null,
      lastFight: state.lastFight,
    };
  }

  function hudLine() {
    if (state.fights === 0 && state.power === 40) return '';
    return `FIGHT ${state.wins}W/${state.losses}L · power ${state.power}${state.belt ? ' · CHAMPION' : ''}`;
  }

  function serialize() {
    return {
      power: state.power,
      fights: state.fights,
      wins: state.wins,
      losses: state.losses,
      kos: state.kos,
      earned: state.earned,
      spent: state.spent,
      betsWon: state.betsWon,
      betsLost: state.betsLost,
      streak: state.streak,
      bestStreak: state.bestStreak,
      belt: state.belt,
      active: state.active ? JSON.parse(JSON.stringify(state.active)) : null,
      lastFight: state.lastFight ? JSON.parse(JSON.stringify(state.lastFight)) : null,
    };
  }

  function deserialize(data) {
    if (!data || typeof data !== 'object') return;
    if (typeof data.power === 'number') state.power = data.power;
    if (typeof data.fights === 'number') state.fights = data.fights;
    if (typeof data.wins === 'number') state.wins = data.wins;
    if (typeof data.losses === 'number') state.losses = data.losses;
    if (typeof data.kos === 'number') state.kos = data.kos;
    if (typeof data.earned === 'number') state.earned = data.earned;
    if (typeof data.spent === 'number') state.spent = data.spent;
    if (typeof data.betsWon === 'number') state.betsWon = data.betsWon;
    if (typeof data.betsLost === 'number') state.betsLost = data.betsLost;
    if (typeof data.streak === 'number') state.streak = data.streak;
    if (typeof data.bestStreak === 'number') state.bestStreak = data.bestStreak;
    if (typeof data.belt === 'boolean') state.belt = data.belt;
    if (data.active) state.active = JSON.parse(JSON.stringify(data.active));
    if (data.lastFight) state.lastFight = JSON.parse(JSON.stringify(data.lastFight));
  }

  return {
    train, challenge, fightRound, forfeit, fighterStatus,
    stats, hudLine, serialize, deserialize, state,
  };
}
