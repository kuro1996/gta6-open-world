export const STREETRACE_VERSION = 1;

export const RACE_PHASES = ['idle', 'countdown', 'racing', 'finished', 'aborted'];

export const ROUTES = [
  {
    id: 'harbor-sprint', name: 'Harbor Sprint', district: 'Harbor', laps: 1, parSeconds: 75, entryFee: 50, reward: 400,
    start: { x: -150, y: 150 },
    checkpoints: [
      { x: -100, y: 120, r: 10, label: 'Dock Gate' },
      { x: -40, y: 90, r: 10, label: 'Crane Row' },
      { x: 20, y: 110, r: 10, label: 'Fish Market' },
      { x: 80, y: 80, r: 10, label: 'Warehouse Bend' },
      { x: 130, y: 130, r: 12, label: 'Harbor Finish' },
    ],
  },
  {
    id: 'marina-loop', name: 'Marina Loop', district: 'Marina', laps: 2, parSeconds: 150, entryFee: 150, reward: 1100,
    start: { x: 40, y: 190 },
    checkpoints: [
      { x: 90, y: 160, r: 10, label: 'Yacht Row' },
      { x: 130, y: 100, r: 10, label: 'Boardwalk' },
      { x: 80, y: 40, r: 10, label: 'Café Corner' },
      { x: 20, y: 80, r: 10, label: 'Palm Bend' },
      { x: 0, y: 160, r: 12, label: 'Marina Finish' },
    ],
  },
  {
    id: 'downtown-gp', name: 'Downtown GP', district: 'Downtown', laps: 2, parSeconds: 180, entryFee: 300, reward: 2200,
    start: { x: 0, y: 0 },
    checkpoints: [
      { x: 60, y: -20, r: 10, label: 'Tower Turn' },
      { x: 100, y: 40, r: 10, label: 'Plaza Cut' },
      { x: 60, y: 100, r: 10, label: 'Neon Strip' },
      { x: -20, y: 90, r: 10, label: 'Hotel Hairpin' },
      { x: -70, y: 30, r: 10, label: 'Mall Sweep' },
      { x: -20, y: -30, r: 12, label: 'Downtown Finish' },
    ],
  },
  {
    id: 'oldtown-rally', name: 'Old Town Rally', district: 'Old Town', laps: 1, parSeconds: 95, entryFee: 100, reward: 750,
    start: { x: 150, y: 170 },
    checkpoints: [
      { x: 120, y: 120, r: 10, label: 'Market Arch' },
      { x: 80, y: 150, r: 10, label: 'Cobble Lane' },
      { x: 40, y: 110, r: 10, label: 'Old Church' },
      { x: 90, y: 60, r: 10, label: 'Basement Alley' },
      { x: 140, y: 90, r: 12, label: 'Old Town Finish' },
    ],
  },
];

export function routeById(id) {
  return ROUTES.find((r) => r.id === id) || null;
}

export function formatRaceTime(seconds) {
  if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds < 0) return '--:--.--';
  const m = Math.floor(seconds / 60);
  const s = seconds - m * 60;
  return `${m}:${s.toFixed(2).padStart(5, '0')}`;
}

function storageKey() {
  return `solara-streetrace-v${STREETRACE_VERSION}`;
}

function loadBoard() {
  try {
    if (typeof localStorage === 'undefined') return {};
    const raw = localStorage.getItem(storageKey());
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

function saveBoard(board) {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(storageKey(), JSON.stringify(board));
  } catch (err) {}
}

function clone(v) {
  return JSON.parse(JSON.stringify(v));
}

export function createStreetRaceSystem(ctx = {}) {
  const c = ctx || {};
  let phase = 'idle';
  let route = null;
  let countdown = 0;
  let lap = 0;
  let checkpointIndex = 0;
  let raceTime = 0;
  let lapTime = 0;
  let lapTimes = [];
  let bestLap = null;
  let wrongWayTimer = -1;
  let racesRun = 0;
  let racesWon = 0;
  let totalEarned = 0;
  let lastResult = null;
  let board = loadBoard();

  function shout(msg) {
    if (typeof c.notify === 'function') c.notify(msg);
  }

  function posNow() {
    if (typeof c.getPosition === 'function') return c.getPosition();
    return { x: 0, z: 0 };
  }

  function recordResult(routeId, time, won) {
    const name = c.playerName || 'Ria';
    const entries = board[routeId] || [];
    const entry = { name, player: name, time: Math.round(time * 100) / 100, won, date: new Date().toISOString() };
    entries.push(entry);
    entries.sort((a, b) => a.time - b.time);
    const kept = entries.slice(0, 8);
    board[routeId] = kept;
    saveBoard(board);
    const rank = kept.indexOf(entry) + 1;
    return { rank, total: kept.length, entry };
  }

  function finishRace() {
    const time = raceTime;
    const won = time <= route.parSeconds;
    racesRun += 1;
    let payout = 0;
    if (won) {
      racesWon += 1;
      payout = route.reward;
      totalEarned += payout;
      if (typeof c.addCash === 'function') c.addCash(payout);
      if (typeof c.addHeat === 'function') c.addHeat(4);
    }
    const rec = recordResult(route.id, time, won);
    phase = 'finished';
    lastResult = { route: route.id, routeName: route.name, time, formatted: formatRaceTime(time), won, payout, rank: rec.rank, total: rec.total, laps: route.laps };
    shout(`Race done: ${formatRaceTime(time)} vs par ${formatRaceTime(route.parSeconds)} — ${won ? `won $${payout}` : 'no payout'} (local #${rec.rank}).`);
    route = null;
    phase = 'idle';
    return lastResult;
  }

  function hitCheckpoint() {
    const cp = route.checkpoints[checkpointIndex];
    checkpointIndex += 1;
    if (checkpointIndex >= route.checkpoints.length) {
      lapTimes.push(lapTime);
      if (bestLap === null || lapTime < bestLap) bestLap = lapTime;
      lapTime = 0;
      checkpointIndex = 0;
      if (lap + 1 >= route.laps) {
        lap += 1;
        return finishRace();
      }
      lap += 1;
      shout(`Lap ${lap + 1} — go!`);
      return { lap };
    }
    shout(`Checkpoint: ${route.checkpoints[checkpointIndex].label}`);
    return { checkpoint: checkpointIndex };
  }

  const sys = {
    routeById,
    formatRaceTime,

    get phase() { return phase; },
    get lastResult() { return lastResult ? clone(lastResult) : null; },

    startRace(routeId) {
      const r = routeById(routeId);
      if (!r) return { ok: false, reason: 'unknown-route' };
      if (phase === 'racing' || phase === 'countdown') return { ok: false, reason: 'already-racing' };
      const cash = typeof c.getCash === 'function' ? c.getCash() : 0;
      if (cash < r.entryFee) return { ok: false, reason: 'no-cash', fee: r.entryFee, cash };
      if (typeof c.addCash === 'function') c.addCash(-r.entryFee);
      route = r;
      phase = 'countdown';
      countdown = 3;
      lap = 0;
      checkpointIndex = 0;
      raceTime = 0;
      lapTime = 0;
      lapTimes = [];
      bestLap = null;
      wrongWayTimer = -1;
      lastResult = null;
      shout(`${r.name}: ${r.laps} lap(s), par ${formatRaceTime(r.parSeconds)}, entry $${r.entryFee}.`);
      return { ok: true, route: clone(r) };
    },

    abortRace(reason = 'aborted') {
      if (phase !== 'racing' && phase !== 'countdown') return { ok: false, reason: 'not-racing' };
      lastResult = { route: route ? route.id : null, won: false, aborted: true, reason, time: raceTime };
      route = null;
      phase = 'idle';
      shout('Race aborted — entry fee lost.');
      return { ok: true, reason };
    },

    update(dt) {
      const step = Number(dt) || 0;
      if (phase === 'countdown') {
        countdown -= step;
        if (countdown <= 0) {
          phase = 'racing';
          shout('GO!');
        }
        return;
      }
      if (phase !== 'racing' || !route) return;
      raceTime += step;
      lapTime += step;
      if (raceTime > 600) {
        sys.abortRace('timeout');
        return;
      }
      const pos = posNow();
      const cp = route.checkpoints[checkpointIndex];
      if (!cp) return;
      const d = Math.hypot(cp.x - pos.x, cp.y - pos.z);
      if (d <= cp.r) {
        hitCheckpoint();
        return;
      }
      const speed = typeof c.getSpeed === 'function' ? c.getSpeed() : 0;
      if (d > 60 && speed < 1) {
        if (wrongWayTimer < 0) {
          wrongWayTimer = 30;
          shout('Wrong way? Head for the next checkpoint.');
        } else {
          wrongWayTimer -= step;
        }
      } else if (wrongWayTimer > 0) {
        wrongWayTimer -= step;
      }
      if (wrongWayTimer === -1 && d > 60 && raceTime > 10) wrongWayTimer = 0;
    },

    hud() {
      return {
        version: STREETRACE_VERSION,
        phase,
        route: route ? route.id : null,
        routeId: route ? route.id : null,
        routeName: route ? route.name : null,
        lap: route ? lap + 1 : 0,
        laps: route ? route.laps : 0,
        totalLaps: route ? route.laps : 0,
        checkpoint: checkpointIndex,
        checkpointIndex,
        checkpointCount: route ? route.checkpoints.length : 0,
        nextCheckpoint: route ? route.checkpoints[checkpointIndex] : null,
        countdown: Math.max(0, Math.ceil(countdown)),
        raceTime,
        raceTimeFormatted: formatRaceTime(raceTime),
        formattedRaceTime: formatRaceTime(raceTime),
        lapTime,
        lapTimeFormatted: formatRaceTime(lapTime),
        formattedLapTime: formatRaceTime(lapTime),
        bestLap,
        formattedBestLap: bestLap === null ? '--:--.--' : formatRaceTime(bestLap),
        par: route ? formatRaceTime(route.parSeconds) : null,
        formattedPar: route ? formatRaceTime(route.parSeconds) : null,
        racesRun,
        racesWon,
        totalEarned,
        lastResult: lastResult ? clone(lastResult) : null,
      };
    },

    status() {
      return this.hud();
    },

    leaderboard(routeId) {
      const entries = board[routeId] || [];
      return entries.map((e, i) => ({
        rank: i + 1,
        name: e.name,
        time: e.time,
        formatted: formatRaceTime(e.time),
        text: `${i + 1}. ${e.name} — ${formatRaceTime(e.time)}`,
        won: e.won,
      }));
    },

    bestTime(routeId) {
      const entries = board[routeId] || [];
      return entries.length ? clone(entries[0]) : null;
    },

    serialize() {
      return {
        version: STREETRACE_VERSION,
        racesRun,
        racesWon,
        totalEarned,
        board: clone(board),
      };
    },

    deserialize(input) {
      if (!input || typeof input !== 'object') return false;
      if (typeof input.racesRun === 'number') racesRun = input.racesRun;
      if (typeof input.racesWon === 'number') racesWon = input.racesWon;
      if (typeof input.totalEarned === 'number') totalEarned = input.totalEarned;
      if (input.board && typeof input.board === 'object') {
        for (const k of Object.keys(input.board)) {
          const merged = [...(board[k] || []), ...input.board[k]];
          merged.sort((a, b) => a.time - b.time);
          board[k] = merged.slice(0, 8);
        }
        saveBoard(board);
      }
      return true;
    },
  };

  return sys;
}
