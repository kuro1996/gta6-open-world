export const RADIO_VERSION = 1;
export const CHASE_STATION = 'bay-beats';
export const NIGHT_STATION = 'chill';

export const STATIONS = [
  {
    id: 'vice-fm', name: 'Vice FM', genre: 'Synthwave', tagline: 'Neon nights, endless drive',
    color: '#ff2e88', dj: 'DJ Neon', energy: 0.7,
    tracks: [
      { title: 'Midnight Chrome', artist: 'Laser Coast', length: 214, energy: 0.7 },
      { title: 'Palm Static', artist: 'Velvet Static', length: 188, energy: 0.65 },
      { title: 'Sunset Run', artist: 'Mira Sol', length: 232, energy: 0.75 },
      { title: 'Glass Highway', artist: 'Night Drive', length: 201, energy: 0.7 },
    ],
  },
  {
    id: 'bay-beats', name: 'Bay Beats', genre: 'Hip-Hop', tagline: 'Hard bars for the bay',
    color: '#ffb020', dj: 'DJ Kova', energy: 0.9,
    tracks: [
      { title: 'Crown Talk', artist: 'Big Marrow', length: 176, energy: 0.9 },
      { title: 'Dockside Hustle', artist: 'Lil Ferry', length: 204, energy: 0.85 },
      { title: 'No Sleep', artist: 'Vex & Co', length: 191, energy: 0.95 },
      { title: 'Gold Chain Summer', artist: 'Ria R', length: 220, energy: 0.88 },
    ],
  },
  {
    id: 'tropicana', name: 'Tropicana', genre: 'Latin Pop', tagline: 'Heat, rhythm, and salt air',
    color: '#2ee6a8', dj: 'DJ Palma', energy: 0.6,
    tracks: [
      { title: 'Baila Solara', artist: 'Lucia Rey', length: 198, energy: 0.6 },
      { title: 'Marina Lights', artist: 'Sol & Mar', length: 210, energy: 0.55 },
      { title: 'Café con Ritmo', artist: 'Tito Verde', length: 184, energy: 0.65 },
      { title: 'Isla Nights', artist: 'Carmen Blue', length: 226, energy: 0.6 },
    ],
  },
  {
    id: 'chill', name: 'Chill Bay', genre: 'Lo-Fi', tagline: 'Slow waves for late hours',
    color: '#5aa9ff', dj: 'DJ Drift', energy: 0.3,
    tracks: [
      { title: 'Low Tide', artist: 'Soft Anchor', length: 240, energy: 0.3 },
      { title: 'Fog Horn Lullaby', artist: 'Harbor Sleep', length: 258, energy: 0.25 },
      { title: 'Moon Over Marina', artist: 'Paper Moon', length: 219, energy: 0.32 },
      { title: 'Slow Current', artist: 'Driftwood', length: 231, energy: 0.28 },
    ],
  },
  {
    id: 'news', name: 'Solara News', genre: 'Talk', tagline: 'The city, as it happens',
    color: '#e8e8e8', dj: 'Anchor Dana', energy: 0.4,
    tracks: [
      { title: 'Morning Briefing', artist: 'Solara News Team', length: 300, energy: 0.4 },
      { title: 'Harbor Report', artist: 'Solara News Team', length: 276, energy: 0.4 },
      { title: 'Night Desk', artist: 'Solara News Team', length: 312, energy: 0.35 },
      { title: 'Weekend Roundup', artist: 'Solara News Team', length: 288, energy: 0.45 },
    ],
  },
];

export function stationById(id) {
  return STATIONS.find((s) => s.id === id) || null;
}

export function nextStationId(currentId, dir = 1) {
  const idx = STATIONS.findIndex((s) => s.id === currentId);
  const base = idx < 0 ? 0 : idx;
  const next = (base + dir + STATIONS.length) % STATIONS.length;
  return STATIONS[next].id;
}

export function targetEnergy(sit) {
  const s = sit || {};
  if (!s.inCar) return 0;
  if ((s.wanted || 0) >= 3) return 0.95;
  if ((s.wanted || 0) >= 1) return 0.8;
  if ((s.speed || 0) > 28) return 0.85;
  if ((s.speed || 0) > 15) return 0.65;
  const h = s.hour ?? 12;
  if (h >= 22 || h < 5) return 0.35;
  return 0.55;
}

export function stationForEnergy(energy) {
  let best = null;
  let gap = Infinity;
  for (const st of STATIONS) {
    if (st.id === 'news') continue;
    const d = Math.abs(st.energy - energy);
    if (d < gap) { gap = d; best = st; }
  }
  return best;
}

function deepCopy(v) {
  return JSON.parse(JSON.stringify(v));
}

export function createRadioSystem(ctx = {}) {
  const c = ctx || {};
  const roll = typeof c.rng === 'function' ? c.rng : () => Math.random();

  const state = {
    version: RADIO_VERSION,
    stationId: 'vice-fm',
    trackIndex: 0,
    trackTime: 0,
    playing: true,
    muted: false,
    volume: 0.8,
    autoDj: true,
    switches: 0,
    tracksPlayed: 0,
    favorites: [],
    newsQueue: [],
    newsRead: 0,
    lastAutoSwitch: 0,
    elapsed: 0,
    log: [],
  };

  function note(msg) {
    state.log.push(msg);
    if (state.log.length > 40) state.log.splice(0, state.log.length - 40);
    if (typeof c.log === 'function') c.log(msg);
  }

  function curStation() {
    return stationById(state.stationId) || STATIONS[0];
  }

  function curTrack() {
    const st = curStation();
    return st.tracks[state.trackIndex % st.tracks.length];
  }

  function applyStation(id, why) {
    const st = stationById(id);
    if (!st) return { ok: false, reason: 'unknown-station' };
    const changed = st.id !== state.stationId;
    state.stationId = st.id;
    state.trackIndex = 0;
    state.trackTime = 0;
    if (changed) {
      state.switches += 1;
      note(`${st.name} — ${st.tagline} with ${st.dj}`);
      if (typeof c.onStationChange === 'function') c.onStationChange(st);
    }
    return { ok: true, station: st.id, stationId: st.id, changed, reason: why || null };
  }

  const sys = {
    name: 'Radio',
    version: RADIO_VERSION,
    state,
    stations: STATIONS,

    currentStation() { return curStation(); },
    currentTrack() { return curTrack(); },

    setStation(id, reason) { return applyStation(id, reason); },

    next(dir = 1) {
      return applyStation(nextStationId(state.stationId, dir), 'next');
    },

    nextTrack() {
      const st = curStation();
      state.trackIndex = (state.trackIndex + 1) % st.tracks.length;
      state.trackTime = 0;
      state.tracksPlayed += 1;
      const tr = curTrack();
      note(`Now playing ${tr.title} by ${tr.artist}`);
      if (typeof c.onTrackChange === 'function') c.onTrackChange(tr);
      return tr;
    },

    togglePlay() {
      state.playing = !state.playing;
      return { ok: true, playing: state.playing };
    },

    toggleMute() {
      state.muted = !state.muted;
      return { ok: true, muted: state.muted };
    },

    setVolume(v) {
      state.volume = Math.max(0, Math.min(1, Number(v) || 0));
      return { ok: true, volume: state.volume };
    },

    toggleFavorite() {
      const tr = curTrack();
      const key = `${state.stationId}:${tr.title}`;
      const at = state.favorites.indexOf(key);
      let fav;
      if (at >= 0) { state.favorites.splice(at, 1); fav = false; }
      else { state.favorites.push(key); fav = true; }
      return { ok: true, favorite: fav, key };
    },

    queueNews(text) {
      if (text) state.newsQueue.push(text);
      if (state.newsQueue.length > 8) state.newsQueue.splice(0, state.newsQueue.length - 8);
      return { ok: true, length: state.newsQueue.length, queued: state.newsQueue.length };
    },

    tick(dt, situation) {
      const step = Number(dt) || 0;
      if (!state.playing || state.muted) return;
      state.elapsed += step;
      state.trackTime += step;
      const tr = curTrack();
      if (state.trackTime >= tr.length) sys.nextTrack();
      const sit = situation || {};
      const wanted = sit.wanted ?? (typeof c.getWanted === 'function' ? c.getWanted() : 0);
      const hour = sit.hour ?? (typeof c.getHour === 'function' ? c.getHour() : 12);
      if (state.autoDj && state.elapsed - state.lastAutoSwitch > 15) {
        if (wanted >= 2) {
          state.lastAutoSwitch = state.elapsed;
          applyStation(CHASE_STATION, 'chase');
        } else if ((hour >= 22 || hour < 5) && roll() < 0.3) {
          state.lastAutoSwitch = state.elapsed;
          applyStation(NIGHT_STATION, 'night');
        }
      }
      if (state.stationId === 'news' && state.trackTime >= 20 && state.newsQueue.length > 0) {
        const bulletin = state.newsQueue.shift();
        state.newsRead += 1;
        note(`News: ${bulletin}`);
      }
    },

    nowPlaying() {
      const st = curStation();
      const tr = curTrack();
      return {
        station: st.name, stationName: st.name, genre: st.genre, dj: st.dj,
        track: tr.title, title: tr.title, artist: tr.artist,
        elapsed: Math.floor(state.trackTime), trackLength: tr.length, length: tr.length,
        playing: state.playing, muted: state.muted, volume: state.volume,
      };
    },

    stats() {
      return {
        station: state.stationId, stationId: state.stationId,
        switches: state.switches, tracksPlayed: state.tracksPlayed,
        favorites: state.favorites.length, favoriteCount: state.favorites.length,
        newsRead: state.newsRead, nowPlaying: sys.nowPlaying(),
      };
    },

    serialize() { return deepCopy(state); },

    deserialize(input) {
      if (!input || typeof input !== 'object') return false;
      if (input.version !== RADIO_VERSION) return false;
      Object.keys(input).forEach((k) => { state[k] = deepCopy(input[k]); });
      return true;
    },

    hudLine() {
      if (!state.playing || state.muted) return 'Radio off';
      const st = curStation();
      const tr = curTrack();
      return `${st.name} — ${tr.title} · ${tr.artist}`;
    },
  };

  return sys;
}

export default createRadioSystem;
