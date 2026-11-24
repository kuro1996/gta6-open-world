export const CAR_MEETS = [
  { id: 'docks', name: 'Docks Drift Night', district: 'Docks', entryFee: 100, purse: 800, crowd: 60, style: 'drift', blurb: 'Tyres screaming on wet concrete.' },
  { id: 'marina', name: 'Marina Sprint', district: 'Marina', entryFee: 200, purse: 1500, crowd: 120, style: 'sprint', blurb: 'A straight shot along the water.' },
  { id: 'plaza', name: 'Plaza Showdown', district: 'Plaza', entryFee: 400, purse: 3000, crowd: 220, style: 'circuit', blurb: 'The whole city watches the plaza.' },
  { id: 'invitational', name: 'Bay Kings Invitational', district: 'Downtown', entryFee: 1000, purse: 8000, crowd: 400, style: 'circuit', blurb: 'Only the best get the invite.' },
];

export const MEET_RIVALS = [
  { id: 'nova', name: 'Nova', car: 'Comet GT', skill: 62, blurb: 'Fast, flashy, and reckless.' },
  { id: 'jinx', name: 'Jinx', car: 'Voss Sedan', skill: 55, blurb: 'Lucky in the worst way.' },
  { id: 'kaito', name: 'Kaito', car: 'Comet GT', skill: 74, blurb: 'Clean lines, cleaner driving.' },
  { id: 'rosa', name: 'Rosa', car: 'Voss Sedan', skill: 68, blurb: 'Knows every kerb in the city.' },
  { id: 'ghost', name: 'Ghost', car: 'Comet GT', skill: 88, blurb: 'Nobody has ever seen him lose.' },
];

const POINTS_FOR_PLACE = [10, 7, 5, 3, 1, 0];
const SEASON_BONUS = 5000;
const MAX_BET = 2000;

export function createCarMeetSystem(ctx) {
  const c = ctx;
  const state = {
    entered: null,
    meetsRun: 0,
    wins: 0,
    podiums: 0,
    points: 0,
    rep: 0,
    earned: 0,
    spent: 0,
    betsWon: 0,
    betsLost: 0,
    seasonWins: 0,
    seasonPoints: {},
    lastResult: null,
    rivalWins: {},
  };

  function findMeet(id) {
    return CAR_MEETS.find((m) => m.id === id) || null;
  }
  function findRival(id) {
    return MEET_RIVALS.find((r) => r.id === id) || null;
  }
  function say(msg) {
    if (typeof c.log === 'function') c.log(msg);
  }
  function roll() {
    return typeof c.rng === 'function' ? c.rng() : Math.random();
  }
  function hourNow() {
    return typeof c.getHour === 'function' ? c.getHour() : 21;
  }
  function dayNow() {
    return typeof c.getDay === 'function' ? c.getDay() : 1;
  }

  function fieldFor(meet) {
    const sorted = MEET_RIVALS.slice().sort((a, b) => b.skill - a.skill);
    if (meet.id === 'invitational') return sorted.slice(0, 5);
    if (meet.id === 'plaza') return sorted.slice(0, 4);
    return sorted.slice(0, 3);
  }

  const sys = {
    playerSkill() {
      return Math.min(95, 50 + Math.min(30, state.rep * 2) + state.wins);
    },

    enterMeet(id) {
      const meet = findMeet(id);
      if (!meet) return { ok: false, reason: 'no-such-meet' };
      if (state.entered) return { ok: false, reason: 'already-entered', meet: state.entered.meetId };
      const hour = hourNow();
      if (hour >= 5 && hour < 20) return { ok: false, reason: 'not-night' };
      if (c.getCash() < meet.entryFee) return { ok: false, reason: 'no-cash', need: meet.entryFee };
      c.addCash(-meet.entryFee);
      state.spent += meet.entryFee;
      state.entered = { meetId: id, bet: 0, day: dayNow() };
      const field = fieldFor(meet).map((r) => r.name);
      say('Entered ' + meet.name + ' for $' + meet.entryFee + '.');
      return { ok: true, meet: meet.name, entryFee: meet.entryFee, purse: meet.purse, field };
    },

    placeBet(amount) {
      if (!state.entered) return { ok: false, reason: 'not-entered' };
      if (!Number.isFinite(amount) || amount <= 0) return { ok: false, reason: 'bad-bet' };
      if (amount > MAX_BET) return { ok: false, reason: 'bet-too-big', max: MAX_BET };
      if (c.getCash() < amount) return { ok: false, reason: 'no-cash', need: amount };
      c.addCash(-amount);
      state.spent += amount;
      state.entered.bet += amount;
      return { ok: true, bet: state.entered.bet };
    },

    runMeet() {
      if (!state.entered) return { ok: false, reason: 'not-entered' };
      const meet = findMeet(state.entered.meetId);
      const bet = state.entered.bet;
      const field = fieldFor(meet);
      const racers = field.map((r) => ({ name: r.name, score: r.skill + roll() * 30 }));
      const skill = sys.playerSkill();
      racers.push({ name: 'Ria', score: skill + roll() * 30 });
      racers.sort((a, b) => b.score - a.score);
      const place = racers.findIndex((r) => r.name === 'Ria') + 1;
      const pts = POINTS_FOR_PLACE[place - 1] || 0;
      let payout = 0;
      if (place === 1) payout = meet.purse;
      else if (place <= 3) payout = Math.floor(meet.purse / 2);
      let betPayout = 0;
      if (bet > 0) {
        if (place === 1) {
          betPayout = bet * 2;
          state.betsWon += 1;
        } else if (place <= 3) {
          betPayout = bet;
          state.betsWon += 1;
        } else {
          state.betsLost += 1;
        }
      }
      const total = payout + betPayout;
      let heat = 0;
      if (place === racers.length) {
        heat = 1;
        if (typeof c.addHeat === 'function') c.addHeat(1);
      }
      if (total > 0) c.addCash(total);
      state.meetsRun += 1;
      state.points += pts;
      if (place === 1) {
        state.wins += 1;
        state.rep += 2;
      } else if (place <= 3) {
        state.podiums += 1;
        state.rep += 1;
      }
      state.earned += total;
      const prevBest = state.seasonPoints[meet.id] || 0;
      if (pts > prevBest) state.seasonPoints[meet.id] = pts;
      const board = racers.map((r) => ({ name: r.name, score: Math.round(r.score) }));
      state.lastResult = {
        meetId: meet.id,
        meet: meet.name,
        place,
        field: racers.length,
        points: pts,
        payout,
        bet,
        betPayout,
        total,
        heat,
        board,
      };
      state.entered = null;
      say('Finished ' + meet.name + ' in place ' + place + ' — $' + total + '.');
      return Object.assign({ ok: true }, state.lastResult);
    },

    leaveMeet() {
      if (!state.entered) return { ok: false, reason: 'not-entered' };
      const meet = findMeet(state.entered.meetId);
      state.entered = null;
      say('Left ' + (meet ? meet.name : 'the meet') + '. The house keeps the entry fee.');
      return { ok: true, meet: meet ? meet.name : null };
    },

    seasonStatus() {
      let total = 0;
      for (const id of Object.keys(state.seasonPoints)) total += state.seasonPoints[id];
      const done = Object.keys(state.seasonPoints).length;
      const champion = total >= 34 && done >= 4;
      return {
        points: total,
        total,
        meetsDone: done,
        meetsTotal: 4,
        champion,
        seasonWins: state.seasonWins,
        perMeet: Object.assign({}, state.seasonPoints),
      };
    },

    claimSeasonBonus() {
      const status = sys.seasonStatus();
      if (!status.champion) return { ok: false, reason: 'not-champion', points: status.points, meetsDone: status.meetsDone };
      c.addCash(SEASON_BONUS);
      state.earned += SEASON_BONUS;
      state.seasonWins += 1;
      state.seasonPoints = {};
      say('Season champion! Bonus $' + SEASON_BONUS + '.');
      return { ok: true, bonus: SEASON_BONUS, seasonWins: state.seasonWins };
    },

    stats() {
      return {
        entered: state.entered ? state.entered.meetId : null,
        meetsRun: state.meetsRun,
        wins: state.wins,
        podiums: state.podiums,
        points: state.points,
        rep: state.rep,
        earned: state.earned,
        spent: state.spent,
        profit: state.earned - state.spent,
        betsWon: state.betsWon,
        betsLost: state.betsLost,
        seasonWins: state.seasonWins,
        season: sys.seasonStatus(),
        lastResult: state.lastResult,
      };
    },

    hudLine() {
      if (state.entered) {
        const meet = findMeet(state.entered.meetId);
        return 'MEET ' + (meet ? meet.name : state.entered.meetId) + ' | bet $' + state.entered.bet;
      }
      if (state.meetsRun === 0) return '';
      return 'LEAGUE ' + state.points + ' pts | ' + state.wins + 'W ' + state.podiums + 'P | rep ' + state.rep;
    },

    serialize() {
      return {
        entered: state.entered ? JSON.parse(JSON.stringify(state.entered)) : null,
        meetsRun: state.meetsRun,
        wins: state.wins,
        podiums: state.podiums,
        points: state.points,
        rep: state.rep,
        earned: state.earned,
        spent: state.spent,
        betsWon: state.betsWon,
        betsLost: state.betsLost,
        seasonWins: state.seasonWins,
        seasonPoints: JSON.parse(JSON.stringify(state.seasonPoints)),
        lastResult: state.lastResult ? JSON.parse(JSON.stringify(state.lastResult)) : null,
        rivalWins: JSON.parse(JSON.stringify(state.rivalWins)),
      };
    },

    deserialize(data) {
      if (!data || typeof data !== 'object') return;
      if (data.entered !== undefined) state.entered = data.entered ? JSON.parse(JSON.stringify(data.entered)) : null;
      if (typeof data.meetsRun === 'number') state.meetsRun = data.meetsRun;
      if (typeof data.wins === 'number') state.wins = data.wins;
      if (typeof data.podiums === 'number') state.podiums = data.podiums;
      if (typeof data.points === 'number') state.points = data.points;
      if (typeof data.rep === 'number') state.rep = data.rep;
      if (typeof data.earned === 'number') state.earned = data.earned;
      if (typeof data.spent === 'number') state.spent = data.spent;
      if (typeof data.betsWon === 'number') state.betsWon = data.betsWon;
      if (typeof data.betsLost === 'number') state.betsLost = data.betsLost;
      if (typeof data.seasonWins === 'number') state.seasonWins = data.seasonWins;
      if (data.seasonPoints) state.seasonPoints = JSON.parse(JSON.stringify(data.seasonPoints));
      if (data.lastResult !== undefined) state.lastResult = data.lastResult ? JSON.parse(JSON.stringify(data.lastResult)) : null;
      if (data.rivalWins) state.rivalWins = JSON.parse(JSON.stringify(data.rivalWins));
    },
  };
  return sys;
}
