export const FIGHTERS = [
  { id: 'tiny', name: 'Tiny Malone', style: 'brawler', power: 38, stamina: 82, purse: 300, blurb: 'Small, loud, and swings like a door in a storm.' },
  { id: 'viper', name: 'Viper Sal', style: 'striker', power: 52, stamina: 74, purse: 600, blurb: 'Fast hands, faster mouth, and a jab that never stops coming.' },
  { id: 'ox', name: 'Ox Ferreira', style: 'grappler', power: 64, stamina: 68, purse: 1000, blurb: 'A wall of muscle that drags every fight to the floor.' },
  { id: 'ghost', name: 'Ghost Fist', style: 'counter', power: 76, stamina: 71, purse: 1800, blurb: 'You never see the punch that ends your night.' },
  { id: 'king', name: 'King Marrow', style: 'brawler', power: 90, stamina: 88, purse: 4000, blurb: 'The undefeated champion of the basement circuit.' },
];

export const stanceBeats = {
  strike: 'grapple',
  grapple: 'counter',
  counter: 'strike',
};

const STANCES = ['strike', 'grapple', 'counter'];
const TRAIN_COST = 100;
const TRAIN_GAIN = 4;
const POWER_CAP = 100;
const ROUNDS = 3;
const KING_FEE = 2500;

function stanceForStyle(style) {
  if (style === 'grappler') return 'grapple';
  if (style === 'counter') return 'counter';
  return 'strike';
}

function cloneFight(f) {
  return f ? JSON.parse(JSON.stringify(f)) : null;
}

export function createFightClubSystem(ctx) {
  const c = ctx || {};
  const die = typeof c.rng === 'function' ? c.rng : () => Math.random();

  const state = {
    power: 40,
    fights: 0,
    wins: 0,
    losses: 0,
    knockouts: 0,
    earned: 0,
    spent: 0,
    betsWon: 0,
    betsLost: 0,
    streak: 0,
    bestStreak: 0,
    belt: false,
    active: null,
    last: null,
  };

  function tell(msg) {
    if (typeof c.log === 'function') c.log(msg);
  }

  function settleFight(won, roundsWon, roundsLost) {
    const f = state.active;
    state.fights += 1;
    if (won) {
      state.wins += 1;
      state.streak += 1;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
      if (roundsLost === 0) state.knockouts += 1;
      let payout = f.purse + f.bet * 2;
      if (f.fighterId === 'king') {
        state.belt = true;
        payout += KING_FEE;
        if (typeof c.addCash === 'function') c.addCash(KING_FEE);
      }
      if (typeof c.addCash === 'function') c.addCash(f.purse + f.bet * 2);
      state.earned += payout;
      if (f.bet > 0) state.betsWon += 1;
      tell(`Ria beats ${f.fighterName} and banks ${payout}.`);
    } else {
      state.losses += 1;
      state.streak = 0;
      if (f.bet > 0) state.betsLost += 1;
      if (typeof c.addHeat === 'function') c.addHeat(1);
      tell(`Ria loses to ${f.fighterName}.`);
    }
    state.last = { fighterId: f.fighterId, fighterName: f.fighterName, won, roundsWon, roundsLost, purse: f.purse, bet: f.bet };
    state.active = null;
    return state.last;
  }

  return {
    state,

    train() {
      if (state.power >= POWER_CAP) return { ok: false, reason: 'max-power', power: state.power };
      const cash = typeof c.getCash === 'function' ? c.getCash() : 0;
      if (cash < TRAIN_COST) return { ok: false, reason: 'no-cash', power: state.power, cost: TRAIN_COST };
      if (typeof c.addCash === 'function') c.addCash(-TRAIN_COST);
      state.spent += TRAIN_COST;
      state.power = Math.min(POWER_CAP, state.power + TRAIN_GAIN);
      tell(`Ria trains hard. Power is now ${state.power}.`);
      return { ok: true, power: state.power, cost: TRAIN_COST };
    },

    challenge(fighterId, bet = 0) {
      const fighter = FIGHTERS.find((x) => x.id === fighterId);
      if (!fighter) return { ok: false, reason: 'unknown-fighter' };
      if (state.active) return { ok: false, reason: 'fight-active' };
      if (bet < 0) return { ok: false, reason: 'bad-bet' };
      const cash = typeof c.getCash === 'function' ? c.getCash() : 0;
      if (bet > cash) return { ok: false, reason: 'bet-too-high', bet, cash };
      if (fighterId === 'king' && state.wins < 3) return { ok: false, reason: 'king-locked', winsNeeded: 3 - state.wins };
      if (bet > 0 && typeof c.addCash === 'function') c.addCash(-bet);
      state.active = {
        fighterId: fighter.id,
        fighterName: fighter.name,
        purse: fighter.purse,
        bet,
        rounds: ROUNDS,
        round: 0,
        riaScore: 0,
        oppScore: 0,
        roundsWon: 0,
        roundsLost: 0,
        log: [],
      };
      tell(`Fight booked: Ria vs ${fighter.name} for a ${fighter.purse} purse.`);
      return { ok: true, fighter: fighter.name, fighterName: fighter.name, purse: fighter.purse, bet, rounds: ROUNDS };
    },

    fightRound(stance) {
      if (!state.active) return { ok: false, reason: 'no-fight' };
      const f = state.active;
      const fighter = FIGHTERS.find((x) => x.id === f.fighterId);
      const picked = STANCES.includes(stance) ? stance : 'strike';
      const oppStance = stanceForStyle(fighter.style);
      let bonus = 0;
      if (stanceBeats[picked] === oppStance) bonus = 12;
      else if (stanceBeats[oppStance] === picked) bonus = -12;
      const riaScore = state.power + bonus + die() * 20;
      let oppScore = fighter.power + die() * 20;
      if (f.round === 2 && fighter.stamina < 65) oppScore -= 5;
      f.round += 1;
      let winner = 'draw';
      if (riaScore > oppScore) { f.riaScore += 1; f.roundsWon += 1; winner = 'ria'; }
      else if (oppScore > riaScore) { f.oppScore += 1; f.roundsLost += 1; winner = fighter.name; }
      const detail = { round: f.round, stance: picked, oppStance, riaScore, oppScore, winner, ria: f.riaScore, opp: f.oppScore, score: [f.riaScore, f.oppScore] };
      f.log.push(detail);
      if (f.round >= ROUNDS) {
        const won = f.riaScore > f.oppScore;
        const final = settleFight(won, f.roundsWon, f.roundsLost);
        return { ok: true, finished: true, round: detail, score: [f.riaScore, f.oppScore], won, result: final, last: final };
      }
      return { ok: true, finished: false, round: detail, score: [f.riaScore, f.oppScore] };
    },

    forfeit() {
      if (!state.active) return { ok: false, reason: 'no-fight' };
      const name = state.active.fighterName;
      const bet = state.active.bet;
      state.fights += 1;
      state.losses += 1;
      state.streak = 0;
      if (bet > 0) state.betsLost += 1;
      state.last = { fighterId: state.active.fighterId, fighterName: name, won: false, roundsWon: state.active.roundsWon, roundsLost: state.active.roundsLost, purse: state.active.purse, bet, forfeit: true };
      state.active = null;
      if (typeof c.addHeat === 'function') c.addHeat(1);
      tell(`Ria forfeits against ${name}.`);
      return { ok: true, fighter: name, fighterName: name, forfeit: true };
    },

    fighterStatus(id) {
      const fighter = FIGHTERS.find((x) => x.id === id);
      if (!fighter) return null;
      const locked = fighter.id === 'king' && state.wins < 3;
      return { ...fighter, locked, lockNote: locked ? `Win ${3 - state.wins} more fight(s) to face the King.` : null };
    },

    stats() {
      return {
        power: state.power,
        fights: state.fights,
        wins: state.wins,
        losses: state.losses,
        knockouts: state.knockouts,
        streak: state.streak,
        bestStreak: state.bestStreak,
        belt: state.belt,
        earned: state.earned,
        spent: state.spent,
        profit: state.earned - state.spent,
        betsWon: state.betsWon,
        betsLost: state.betsLost,
        active: state.active ? { fighter: state.active.fighterName, fighterName: state.active.fighterName, round: state.active.round, score: [state.active.riaScore, state.active.oppScore] } : null,
        last: cloneFight(state.last),
      };
    },

    hudLine() {
      if (state.fights === 0 && state.power === 40) return '';
      const champ = state.belt ? ' CHAMPION' : '';
      return `Fight Club ${state.wins}W-${state.losses}L · Power ${state.power}${champ}`;
    },

    serialize() {
      return {
        power: state.power,
        fights: state.fights,
        wins: state.wins,
        losses: state.losses,
        knockouts: state.knockouts,
        earned: state.earned,
        spent: state.spent,
        betsWon: state.betsWon,
        betsLost: state.betsLost,
        streak: state.streak,
        bestStreak: state.bestStreak,
        belt: state.belt,
        active: cloneFight(state.active),
        last: cloneFight(state.last),
      };
    },

    deserialize(input) {
      if (!input || typeof input !== 'object') return;
      const num = (k) => { if (typeof input[k] === 'number') state[k] = input[k]; };
      ['power', 'fights', 'wins', 'losses', 'knockouts', 'earned', 'spent', 'betsWon', 'betsLost', 'streak', 'bestStreak'].forEach(num);
      if (typeof input.belt === 'boolean') state.belt = input.belt;
      if (input.active) state.active = cloneFight(input.active);
      if (input.last) state.last = cloneFight(input.last);
    },
  };
}
