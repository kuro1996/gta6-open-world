// Solara Nights — Midnight Car Meet / Import League (Round 6 attempt 8).
// When the sun goes down the import scene takes over: four weekly meets
// around the bay, each with its own crowd, entry fee and purse. Enter a
// meet, size up the field, place a side bet, then run it — your league
// points and reputation decide the odds, the night's dice decide the
// rest. Win the season (most points across all four meets) and the
// champion's purse is yours.
// The system owns its state and only touches the game through the small
// ctx hooks below (rng / getCash / addCash / addHeat / log / getHour /
// getDay), the same factory pattern as arcade.js / bank.js / tuning.js.

export const CAR_MEETS = [
  {
    id: 'docks-drift',
    name: 'Docks Drift Night',
    district: 'Docks',
    entryFee: 100,
    purse: 800,
    crowd: 60,
    style: 'drift',
    blurb: 'Container-yard slides under the cranes. Style counts double here.',
  },
  {
    id: 'marina-sprint',
    name: 'Marina Sprint',
    district: 'Marina',
    entryFee: 200,
    purse: 1500,
    crowd: 120,
    style: 'sprint',
    blurb: 'A straight shot down the waterfront. Pure speed, no excuses.',
  },
  {
    id: 'plaza-showdown',
    name: 'Plaza Showdown',
    district: 'Plaza',
    entryFee: 400,
    purse: 3000,
    crowd: 220,
    style: 'circuit',
    blurb: 'Three laps round the plaza. The whole city watches from the steps.',
  },
  {
    id: 'bay-kings',
    name: 'Bay Kings Invitational',
    district: 'Downtown',
    entryFee: 1000,
    purse: 8000,
    crowd: 400,
    style: 'circuit',
    blurb: 'Invite only. The fastest cars in Solara Bay, one crown, one night.',
  },
];

export const MEET_RIVALS = [
  { id: 'nova', name: 'Nova', car: 'Comet GT', skill: 62, blurb: 'Drift queen of the docks.' },
  { id: 'jinx', name: 'Jinx', car: 'Voss Sedan', skill: 55, blurb: 'Talks trash, backs it up.' },
  { id: 'kaito', name: 'Kaito', car: 'Comet GT', skill: 74, blurb: 'Marina sprint record holder.' },
  { id: 'rosa', name: 'Rosa', car: 'Voss Sedan', skill: 68, blurb: 'Plaza circuit veteran.' },
  { id: 'ghost-ride', name: 'Ghost', car: 'Comet GT', skill: 88, blurb: 'Nobody knows his real name. Everybody knows his taillights.' },
];

const POINTS_FOR_PLACE = [10, 7, 5, 3, 1, 0];
const SEASON_BONUS = 5000;
const MAX_BET = 2000;

export function createCarMeetSystem(ctx) {
  const state = {
    entered: null, // { meetId, bet, day }
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
    seasonPoints: {}, // meetId -> best points this season
    lastResult: null,
    rivalWins: {},
  };

  function meetById(id) {
    return CAR_MEETS.find((m) => m.id === id) || null;
  }

  function rivalById(id) {
    return MEET_RIVALS.find((r) => r.id === id) || null;
  }

  // Your racing skill: base 50 + 2 per league rep point (capped at +30)
  // + 1 per meet won before. The field is 5 rivals picked by meet style.
  function playerSkill() {
    return Math.min(95, 50 + Math.min(30, state.rep * 2) + state.wins);
  }

  function fieldFor(meet) {
    const sorted = [...MEET_RIVALS].sort((a, b) => b.skill - a.skill);
    // The invitational only invites the top of the field; the docks take
    // whoever shows up.
    const count = meet.id === 'bay-kings' ? 5 : meet.id === 'plaza-showdown' ? 4 : 3;
    return sorted.slice(0, count);
  }

  function enterMeet(id) {
    const meet = meetById(id);
    if (!meet) return { ok: false, reason: 'no-such-meet' };
    if (state.entered) return { ok: false, reason: 'already-entered', meet: state.entered.meetId };
    const hour = ctx.getHour ? ctx.getHour() : 23;
    if (hour < 20 && hour >= 5) return { ok: false, reason: 'not-night' };
    if (ctx.getCash() < meet.entryFee) return { ok: false, reason: 'no-cash', need: meet.entryFee };
    ctx.addCash(-meet.entryFee);
    state.spent += meet.entryFee;
    state.entered = { meetId: id, bet: 0, day: ctx.getDay ? ctx.getDay() : 1 };
    ctx.log(`Entered ${meet.name} — $${meet.entryFee} entry, purse $${meet.purse}.`);
    return { ok: true, meet: meet.name, entryFee: meet.entryFee, purse: meet.purse, field: fieldFor(meet).map((r) => r.name) };
  }

  function placeBet(amount) {
    if (!state.entered) return { ok: false, reason: 'not-entered' };
    const n = Math.floor(Number(amount));
    if (!Number.isFinite(n) || n <= 0) return { ok: false, reason: 'bad-bet' };
    if (n > MAX_BET) return { ok: false, reason: 'bet-too-big', max: MAX_BET };
    if (ctx.getCash() < n) return { ok: false, reason: 'no-cash', need: n };
    ctx.addCash(-n);
    state.spent += n;
    state.entered.bet += n;
    return { ok: true, bet: state.entered.bet };
  }

  // Run the meet. Each racer scores skill + a dice roll (0–30); places
  // are sorted by score. Win = purse, podium = half purse, last place =
  // the crowd laughs and the cops notice (small heat). A winning side bet
  // pays 2:1 on a win, 1:1 on a podium.
  function runMeet() {
    if (!state.entered) return { ok: false, reason: 'not-entered' };
    const meet = meetById(state.entered.meetId);
    const bet = state.entered.bet;
    const skill = playerSkill();
    const roll = () => (ctx.rng ? ctx.rng() : Math.random()) * 30;
    const field = fieldFor(meet);
    const results = [{ name: 'Ria (you)', skill, score: skill + roll(), you: true }];
    for (const r of field) results.push({ name: r.name, skill: r.skill, score: r.skill + roll(), you: false });
    results.sort((a, b) => b.score - a.score);
    const place = results.findIndex((r) => r.you) + 1;
    const points = POINTS_FOR_PLACE[place - 1] || 0;
    let payout = 0;
    if (place === 1) payout = meet.purse;
    else if (place <= 3) payout = Math.floor(meet.purse / 2);
    let betPayout = 0;
    if (bet > 0) {
      if (place === 1) { betPayout = bet * 2; state.betsWon += 1; }
      else if (place <= 3) { betPayout = bet; state.betsWon += 1; }
      else state.betsLost += 1;
    }
    const total = payout + betPayout;
    if (total > 0) ctx.addCash(total);
    let heat = 0;
    if (place === results.length && ctx.addHeat) {
      heat = 1;
      ctx.addHeat(heat);
    }
    state.meetsRun += 1;
    state.points += points;
    if (place === 1) { state.wins += 1; state.rep += 2; }
    else if (place <= 3) { state.podiums += 1; state.rep += 1; }
    state.earned += total;
    const prev = state.seasonPoints[meet.id] || 0;
    state.seasonPoints[meet.id] = Math.max(prev, points);
    state.lastResult = {
      meet: meet.id, name: meet.name, place, of: results.length,
      points, payout, bet, betPayout, total, heat,
      board: results.map((r) => ({ name: r.name, score: Math.round(r.score) })),
    };
    state.entered = null;
    ctx.log(`${meet.name}: P${place}/${results.length} — +${points} pts, +$${total}${heat ? `, +${heat} heat` : ''}.`);
    return { ok: true, ...state.lastResult };
  }

  function leaveMeet() {
    if (!state.entered) return { ok: false, reason: 'not-entered' };
    const name = meetById(state.entered.meetId).name;
    state.entered = null;
    ctx.log(`Left ${name} before the flag dropped — entry fee kept by the house.`);
    return { ok: true, meet: name };
  }

  // Season: best points across all four meets. Win the season (40+ pts
  // with every meet run at least once) and the champion's purse pays out.
  function seasonStatus() {
    const total = Object.values(state.seasonPoints).reduce((a, b) => a + b, 0);
    const meetsDone = Object.keys(state.seasonPoints).length;
    return {
      points: total,
      meetsDone,
      meetsTotal: CAR_MEETS.length,
      champion: total >= 34 && meetsDone === CAR_MEETS.length,
      seasonWins: state.seasonWins,
      perMeet: { ...state.seasonPoints },
    };
  }

  function claimSeasonBonus() {
    const s = seasonStatus();
    if (!s.champion) return { ok: false, reason: 'not-champion', points: s.points, meetsDone: s.meetsDone };
    ctx.addCash(SEASON_BONUS);
    state.earned += SEASON_BONUS;
    state.seasonWins += 1;
    state.seasonPoints = {};
    ctx.log(`SEASON CHAMPION — the Bay Kings crown is yours. +$${SEASON_BONUS}.`);
    return { ok: true, bonus: SEASON_BONUS, seasonWins: state.seasonWins };
  }

  function stats() {
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
      season: seasonStatus(),
      lastResult: state.lastResult,
    };
  }

  function hudLine() {
    if (state.meetsRun === 0 && !state.entered) return '';
    return state.entered
      ? `MEET ${meetById(state.entered.meetId).name} · bet $${state.entered.bet}`
      : `LEAGUE ${state.points} pts · ${state.wins}W/${state.podiums}P · rep ${state.rep}`;
  }

  function serialize() {
    return {
      entered: state.entered ? { ...state.entered } : null,
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
      seasonPoints: { ...state.seasonPoints },
      lastResult: state.lastResult ? JSON.parse(JSON.stringify(state.lastResult)) : null,
      rivalWins: { ...state.rivalWins },
    };
  }

  function deserialize(data) {
    if (!data || typeof data !== 'object') return;
    if (data.entered) state.entered = { ...data.entered };
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
    if (data.seasonPoints) state.seasonPoints = { ...data.seasonPoints };
    if (data.lastResult) state.lastResult = JSON.parse(JSON.stringify(data.lastResult));
    if (data.rivalWins) state.rivalWins = { ...data.rivalWins };
  }

  return {
    enterMeet, placeBet, runMeet, leaveMeet, seasonStatus, claimSeasonBonus,
    playerSkill, stats, hudLine, serialize, deserialize, state,
  };
}
