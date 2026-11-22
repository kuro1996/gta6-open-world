// Solara Nights — Street Races & Time Trials (round 4 attempt 5, NEW module).
// Illegal midnight racing on the streets of Solara Bay: four routes, each
// a chain of checkpoints the player must hit in order, against a par time.
// Beat par to earn cash and a leaderboard slot; beat your own best to move
// up the local board. Races run in the live world — traffic still crosses,
// cops still notice a speeding car, and a crash costs real seconds.
// Best times persist in localStorage (guarded: the module works fine in
// headless/test environments where storage does not exist).
//
// Self-contained like the other round-4 systems: the game passes a small
// `ctx` (getPosition, getSpeed, addCash, notify, addHeat) and the race
// system owns the rest — state machine, timing, checkpoints, leaderboard.

export const STREETRACE_VERSION = 1;

export const RACE_PHASES = ['idle', 'countdown', 'racing', 'finished', 'aborted'];

// Routes are hand-laid over the city map: start point, ordered checkpoints
// (x, y, radius), laps, par time in seconds, entry fee and reward.
export const ROUTES = [
  {
    id: 'harbor-sprint',
    name: 'Harbor Sprint',
    district: 'Harbor',
    laps: 1,
    parSeconds: 75,
    entryFee: 50,
    reward: 400,
    start: { x: 120, y: 640 },
    checkpoints: [
      { x: 260, y: 620, r: 42, label: 'Pier Gate' },
      { x: 420, y: 560, r: 42, label: 'Fish Market' },
      { x: 520, y: 420, r: 42, label: 'Crane Yard' },
      { x: 380, y: 300, r: 42, label: 'Old Ferry' },
      { x: 120, y: 640, r: 48, label: 'Finish' },
    ],
  },
  {
    id: 'marina-loop',
    name: 'Marina Loop',
    district: 'Marina',
    laps: 2,
    parSeconds: 150,
    entryFee: 150,
    reward: 1100,
    start: { x: 820, y: 180 },
    checkpoints: [
      { x: 700, y: 220, r: 42, label: 'Yacht Club' },
      { x: 560, y: 300, r: 42, label: 'Boardwalk' },
      { x: 620, y: 480, r: 42, label: 'Lighthouse' },
      { x: 800, y: 420, r: 42, label: 'Casino Row' },
      { x: 820, y: 180, r: 48, label: 'Finish' },
    ],
  },
  {
    id: 'downtown-gp',
    name: 'Downtown GP',
    district: 'Downtown',
    laps: 2,
    parSeconds: 180,
    entryFee: 300,
    reward: 2200,
    start: { x: 560, y: 420 },
    checkpoints: [
      { x: 480, y: 300, r: 40, label: 'Neon Plaza' },
      { x: 360, y: 380, r: 40, label: 'Theatre' },
      { x: 420, y: 540, r: 40, label: 'Central Park' },
      { x: 620, y: 560, r: 40, label: 'Tower Bridge' },
      { x: 680, y: 380, r: 40, label: 'Market Sq' },
      { x: 560, y: 420, r: 48, label: 'Finish' },
    ],
  },
  {
    id: 'old-town-rally',
    name: 'Old Town Rally',
    district: 'Old Town',
    laps: 1,
    parSeconds: 95,
    entryFee: 100,
    reward: 750,
    start: { x: 240, y: 300 },
    checkpoints: [
      { x: 340, y: 260, r: 42, label: 'Cobble Lane' },
      { x: 460, y: 340, r: 42, label: 'Chapel' },
      { x: 380, y: 480, r: 42, label: 'Fountain' },
      { x: 220, y: 460, r: 42, label: 'Arch Gate' },
      { x: 240, y: 300, r: 48, label: 'Finish' },
    ],
  },
];

export function routeById(id) {
  return ROUTES.find((r) => r.id === id) || null;
}

// Format seconds as M:SS.cs for the HUD and the leaderboard.
export function formatRaceTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '--:--.--';
  const m = Math.floor(seconds / 60);
  const s = seconds - m * 60;
  return `${m}:${s.toFixed(2).padStart(5, '0')}`;
}

const STORAGE_KEY = 'solara-nights-streetrace-leaderboard-v1';

function loadBoard() {
  try {
    if (typeof localStorage === 'undefined') return {};
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveBoard(board) {
  try {
    if (typeof localStorage === 'undefined') return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
    return true;
  } catch {
    return false;
  }
}

export function createStreetRaceSystem(ctx = {}) {
  const hooks = {
    getPosition: typeof ctx.getPosition === 'function' ? ctx.getPosition : () => ({ x: 0, y: 0 }),
    getSpeed: typeof ctx.getSpeed === 'function' ? ctx.getSpeed : () => 0,
    getCash: typeof ctx.getCash === 'function' ? ctx.getCash : null,
    addCash: typeof ctx.addCash === 'function' ? ctx.addCash : null,
    notify: typeof ctx.notify === 'function' ? ctx.notify : () => {},
    addHeat: typeof ctx.addHeat === 'function' ? ctx.addHeat : () => {},
    playerName: typeof ctx.playerName === 'string' ? ctx.playerName : 'Ria',
  };

  const board = loadBoard();
  const state = {
    phase: 'idle',
    routeId: null,
    lap: 1,
    checkpointIndex: 0,
    countdown: 0,
    raceTime: 0,
    lapTime: 0,
    bestLap: Infinity,
    lastLapTimes: [],
    wrongWayTimer: 0,
    racesRun: 0,
    racesWon: 0,
    totalEarned: 0,
    lastResult: null,
  };

  function route() {
    return state.routeId ? routeById(state.routeId) : null;
  }

  function cash() {
    if (hooks.getCash) return hooks.getCash();
    return 0;
  }

  function startRace(routeId) {
    const r = routeById(routeId);
    if (!r) return { ok: false, reason: 'unknown-route' };
    if (state.phase === 'racing' || state.phase === 'countdown') {
      return { ok: false, reason: 'already-racing' };
    }
    if (hooks.getCash && cash() < r.entryFee) {
      return { ok: false, reason: 'not-enough-cash', fee: r.entryFee, cash: cash() };
    }
    if (hooks.addCash) hooks.addCash(-r.entryFee);
    state.phase = 'countdown';
    state.routeId = routeId;
    state.lap = 1;
    state.checkpointIndex = 0;
    state.countdown = 3;
    state.raceTime = 0;
    state.lapTime = 0;
    state.lastLapTimes = [];
    state.wrongWayTimer = 0;
    state.lastResult = null;
    hooks.notify(`${r.name}: ${r.laps} lap${r.laps > 1 ? 's' : ''}, par ${formatRaceTime(r.parSeconds)}. $${r.entryFee} entry. Go on green!`);
    return { ok: true, route: r };
  }

  function abortRace(reason = 'aborted') {
    if (state.phase !== 'racing' && state.phase !== 'countdown') {
      return { ok: false, reason: 'not-racing' };
    }
    state.phase = 'aborted';
    state.lastResult = { routeId: state.routeId, time: state.raceTime, won: false, reason };
    hooks.notify(`Race ${reason}. Entry fee lost.`);
    state.phase = 'idle';
    state.routeId = null;
    return { ok: true };
  }

  // Record a finished race on the local leaderboard (top 8 per route).
  function recordResult(routeId, seconds, won) {
    const entry = { name: hooks.playerName, time: Math.round(seconds * 100) / 100, won, day: Date.now() };
    const list = Array.isArray(board[routeId]) ? board[routeId].slice() : [];
    list.push(entry);
    list.sort((a, b) => a.time - b.time);
    board[routeId] = list.slice(0, 8);
    saveBoard(board);
    const rank = board[routeId].indexOf(entry) + 1;
    return { rank, total: board[routeId].length, entry };
  }

  function finishRace() {
    const r = route();
    state.phase = 'finished';
    state.racesRun += 1;
    const time = state.raceTime;
    const won = time <= r.parSeconds;
    let payout = 0;
    if (won) {
      state.racesWon += 1;
      payout = r.reward;
      if (hooks.addCash) hooks.addCash(payout);
      state.totalEarned += payout;
    }
    const placed = recordResult(r.id, time, won);
    state.lastResult = {
      routeId: r.id, routeName: r.name, time, won, payout,
      rank: placed.rank, laps: r.laps, par: r.parSeconds,
      bestLap: Number.isFinite(state.bestLap) ? state.bestLap : null,
    };
    hooks.notify(
      won
        ? `${r.name} WON in ${formatRaceTime(time)} (par ${formatRaceTime(r.parSeconds)}). +$${payout}, rank #${placed.rank} locally.`
        : `${r.name} finished in ${formatRaceTime(time)} — par was ${formatRaceTime(r.parSeconds)}. No payout.`,
    );
    // Winning a loud illegal race draws attention: a little heat.
    if (won) hooks.addHeat(4);
    state.phase = 'idle';
    state.routeId = null;
    return { ...state.lastResult };
  }

  // Advance one checkpoint. Returns the new lap/checkpoint or null.
  function hitCheckpoint() {
    const r = route();
    if (!r) return null;
    state.checkpointIndex += 1;
    if (state.checkpointIndex >= r.checkpoints.length) {
      // Lap complete.
      state.lastLapTimes.push(state.lapTime);
      if (state.lapTime < state.bestLap) state.bestLap = state.lapTime;
      state.lapTime = 0;
      state.checkpointIndex = 0;
      if (state.lap >= r.laps) return finishRace();
      state.lap += 1;
      hooks.notify(`Lap ${state.lap}/${r.laps} — keep pushing!`);
    } else {
      const next = r.checkpoints[state.checkpointIndex];
      hooks.notify(`Checkpoint: ${next.label} (${state.checkpointIndex + 1}/${r.checkpoints.length})`);
    }
    return { lap: state.lap, checkpointIndex: state.checkpointIndex };
  }

  // Per-frame update. dt is real seconds. The caller passes the car (or
  // player) position; checkpoints are circles the player must drive through.
  function update(dt) {
    if (!(dt > 0)) return;
    if (state.phase === 'countdown') {
      state.countdown -= dt;
      if (state.countdown <= 0) {
        state.phase = 'racing';
        state.countdown = 0;
        hooks.notify('GO!');
      }
      return;
    }
    if (state.phase !== 'racing') return;
    const r = route();
    if (!r) return;
    state.raceTime += dt;
    state.lapTime += dt;
    const pos = hooks.getPosition();
    const cp = r.checkpoints[state.checkpointIndex];
    // Checkpoints store the map's second axis as `y` (matching the route
    // tables); the live position carries it as `z`.
    const dist = Math.hypot(pos.x - cp.x, pos.z - cp.y);
    if (dist <= cp.r) {
      hitCheckpoint();
      return;
    }
    // Wrong-way warning: standing still far from the next checkpoint while
    // the clock runs is how races are lost.
    if (hooks.getSpeed() < 2 && dist > cp.r * 3) {
      state.wrongWayTimer += dt;
      if (state.wrongWayTimer > 10) {
        hooks.notify('You are barely moving — the race clock is running!');
        state.wrongWayTimer = -20; // nag at most every 30s
      }
    } else if (state.wrongWayTimer > 0) {
      state.wrongWayTimer = Math.max(0, state.wrongWayTimer - dt);
    }
    // Give up after 10 minutes: the street has moved on.
    if (state.raceTime > 600) abortRace('timed-out');
  }

  function nextCheckpoint() {
    const r = route();
    if (!r || state.phase !== 'racing') return null;
    return r.checkpoints[state.checkpointIndex];
  }

  function hud() {
    const r = route();
    return {
      version: STREETRACE_VERSION,
      phase: state.phase,
      routeId: state.routeId,
      routeName: r ? r.name : null,
      lap: state.lap,
      laps: r ? r.laps : 0,
      checkpointIndex: state.checkpointIndex,
      checkpoints: r ? r.checkpoints.length : 0,
      nextCheckpoint: nextCheckpoint(),
      countdown: Math.max(0, Math.ceil(state.countdown)),
      raceTime: Math.round(state.raceTime * 100) / 100,
      raceTimeText: formatRaceTime(state.raceTime),
      lapTimeText: formatRaceTime(state.lapTime),
      bestLapText: Number.isFinite(state.bestLap) ? formatRaceTime(state.bestLap) : '--:--.--',
      parText: r ? formatRaceTime(r.parSeconds) : null,
      racesRun: state.racesRun,
      racesWon: state.racesWon,
      totalEarned: state.totalEarned,
      lastResult: state.lastResult,
    };
  }

  function leaderboard(routeId) {
    const list = Array.isArray(board[routeId]) ? board[routeId] : [];
    return list.map((e, i) => ({ rank: i + 1, name: e.name, time: e.time, text: formatRaceTime(e.time), won: e.won }));
  }

  function bestTime(routeId) {
    const list = leaderboard(routeId);
    return list.length ? list[0] : null;
  }

  function serialize() {
    return {
      version: STREETRACE_VERSION,
      racesRun: state.racesRun,
      racesWon: state.racesWon,
      totalEarned: state.totalEarned,
      board,
    };
  }

  function deserialize(data) {
    if (!data || typeof data !== 'object') return false;
    state.racesRun = data.racesRun || 0;
    state.racesWon = data.racesWon || 0;
    state.totalEarned = data.totalEarned || 0;
    if (data.board && typeof data.board === 'object') {
      for (const [k, v] of Object.entries(data.board)) board[k] = v;
      saveBoard(board);
    }
    return true;
  }

  return {
    startRace, abortRace, update, hud, leaderboard, bestTime,
    serialize, deserialize, routeById, formatRaceTime,
    get phase() { return state.phase; },
    get lastResult() { return state.lastResult; },
  };
}
