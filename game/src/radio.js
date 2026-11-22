// Solara Nights — Radio (round 4 attempt 6, NEW module).
// The in-car radio of Solara Bay: five stations, each with its own
// identity, DJ patter, track list and mood. Switching stations is free
// and instant; the fun is that the radio REACTS to the game. Get into a
// police chase and the tempo climbs, the DJ starts shouting, and the
// station flips to the high-energy channel if the player wants it to.
// Cruise at night and the chill station takes over. The radio also
// carries the city's news: wanted level changes, business raids and
// stunt records all get read out as bulletins between tracks.
//
// Tracks are data (title, artist, length, energy, mood) — the actual
// audio is synthesized by the game's audio engine through the ctx
// hooks, so the module works with no audio at all and never blocks.
// Self-contained: talks to the game only through the optional `ctx`.

export const RADIO_VERSION = 1;

export const STATIONS = [
  {
    id: 'vice-fm', name: 'VICE FM 88.5', genre: 'Synthwave',
    tagline: 'Neon nights, chrome dreams.', color: '#ff2e88',
    dj: 'DJ Neon', energy: 0.7,
    tracks: [
      { title: 'Midnight Chrome', artist: 'Laserhawk Bay', length: 214, energy: 0.8 },
      { title: 'Palm Static', artist: 'The Vectors', length: 187, energy: 0.6 },
      { title: 'Sunset Overdrive', artist: 'Mira Sol', length: 232, energy: 0.9 },
      { title: 'Neon Rain', artist: 'Chrome Coast', length: 198, energy: 0.7 },
    ],
  },
  {
    id: 'bay-beats', name: 'BAY BEATS 102.1', genre: 'Hip-hop',
    tagline: 'The sound of the streets.', color: '#ffb020',
    dj: 'MC Big Wave', energy: 0.8,
    tracks: [
      { title: 'Corner Store Kings', artist: 'Big Wave', length: 176, energy: 0.85 },
      { title: 'Lowrider Anthem', artist: 'Los Reyes', length: 204, energy: 0.8 },
      { title: 'Hustle Season', artist: 'Tasha V', length: 191, energy: 0.9 },
      { title: 'Bay Bridge Bounce', artist: 'DJ Cortez', length: 167, energy: 0.75 },
    ],
  },
  {
    id: 'tropicana', name: 'TROPICANA 95.3', genre: 'Latin / Salsa',
    tagline: 'Baila toda la noche.', color: '#22c55e',
    dj: 'Rosa Mar', energy: 0.75,
    tracks: [
      { title: 'Fuego en la Playa', artist: 'Rosa Mar y Los Soles', length: 221, energy: 0.8 },
      { title: 'Salsa de Medianoche', artist: 'Orquesta Palma', length: 196, energy: 0.7 },
      { title: 'Calle Ocho', artist: 'El Combo Real', length: 183, energy: 0.85 },
      { title: 'Bailando en Vice', artist: 'Marisol', length: 209, energy: 0.75 },
    ],
  },
  {
    id: 'chill', name: 'MOONLIGHT 76.9', genre: 'Lo-fi / Chill',
    tagline: 'Slow down. The bay is listening.', color: '#60a5fa',
    dj: 'Night Owl', energy: 0.35,
    tracks: [
      { title: 'Tide Pools', artist: 'Night Owl', length: 243, energy: 0.3 },
      { title: 'Empty Boardwalk', artist: 'Slow Coast', length: 218, energy: 0.25 },
      { title: 'Static & Stars', artist: 'Luna Waves', length: 256, energy: 0.35 },
      { title: '3AM Ferry', artist: 'Harbor Lights', length: 201, energy: 0.3 },
    ],
  },
  {
    id: 'news', name: 'SOLARA NEWS 640 AM', genre: 'Talk / News',
    tagline: 'All vice, all the time.', color: '#e5e7eb',
    dj: 'Anchor Dana Cross', energy: 0.5,
    tracks: [
      { title: 'Morning Briefing', artist: 'Dana Cross', length: 300, energy: 0.4 },
      { title: 'Vice City Council Hour', artist: 'City Desk', length: 280, energy: 0.35 },
      { title: 'The Bay Report', artist: 'Marcus Hale', length: 265, energy: 0.45 },
      { title: 'Late Night Callers', artist: 'Dana Cross', length: 320, energy: 0.5 },
    ],
  },
];

export const CHASE_STATION = 'bay-beats';
export const NIGHT_STATION = 'chill';

export function stationById(id) {
  return STATIONS.find((s) => s.id === id) || null;
}

export function nextStationId(currentId, dir = 1) {
  const idx = STATIONS.findIndex((s) => s.id === currentId);
  const next = (idx + dir + STATIONS.length) % STATIONS.length;
  return STATIONS[next].id;
}

// Energy target the radio aims for given the game situation.
export function targetEnergy({ wanted = 0, speed = 0, hour = 12, inCar = true }) {
  if (!inCar) return 0;
  if (wanted >= 3) return 0.95;
  if (wanted >= 1) return 0.8;
  if (speed > 28) return 0.85;
  if (speed > 15) return 0.65;
  if (hour >= 22 || hour < 5) return 0.35;
  return 0.55;
}

export function stationForEnergy(energy) {
  let best = STATIONS[0];
  let bestD = Infinity;
  for (const s of STATIONS) {
    if (s.id === 'news') continue;
    const d = Math.abs(s.energy - energy);
    if (d < bestD) { bestD = d; best = s; }
  }
  return best;
}

export function createRadioSystem(ctx = {}) {
  const rng = ctx.rng || Math.random;
  const state = {
    version: RADIO_VERSION,
    stationId: 'vice-fm',
    trackIndex: 0,
    trackTime: 0,
    playing: true,
    volume: 0.8,
    muted: false,
    autoDj: true, // auto-switch on chase / night
    lastAutoSwitch: 0,
    switches: 0,
    tracksPlayed: 0,
    favorites: [],
    newsQueue: [], // bulletins waiting to be read
    newsRead: 0,
    log: [],
  };

  function note(msg) {
    state.log.push(msg);
    if (state.log.length > 40) state.log.shift();
    if (typeof ctx.log === 'function') ctx.log(msg);
  }

  function currentStation() {
    return stationById(state.stationId) || STATIONS[0];
  }

  function currentTrack() {
    const st = currentStation();
    return st.tracks[state.trackIndex % st.tracks.length];
  }

  function setStation(id, reason = 'manual') {
    const st = stationById(id);
    if (!st) return { ok: false, reason: 'unknown-station' };
    if (st.id === state.stationId) return { ok: true, station: st.id, changed: false };
    state.stationId = st.id;
    state.trackIndex = 0;
    state.trackTime = 0;
    state.switches += 1;
    note(`📻 ${st.name} — ${st.tagline} (DJ ${st.dj}) [${reason}]`);
    if (typeof ctx.onStationChange === 'function') ctx.onStationChange(st);
    return { ok: true, station: st.id, changed: true };
  }

  function next(dir = 1) {
    return setStation(nextStationId(state.stationId, dir));
  }

  function nextTrack() {
    const st = currentStation();
    state.trackIndex = (state.trackIndex + 1) % st.tracks.length;
    state.trackTime = 0;
    state.tracksPlayed += 1;
    const track = currentTrack();
    note(`📻 Now playing: ${track.title} — ${track.artist} (${st.name})`);
    if (typeof ctx.onTrackChange === 'function') ctx.onTrackChange(st, track);
    return track;
  }

  function togglePlay() {
    state.playing = !state.playing;
    return { ok: true, playing: state.playing };
  }

  function toggleMute() {
    state.muted = !state.muted;
    return { ok: true, muted: state.muted };
  }

  function setVolume(v) {
    state.volume = Math.max(0, Math.min(1, v));
    return { ok: true, volume: state.volume };
  }

  function toggleFavorite() {
    const track = currentTrack();
    const key = `${state.stationId}:${track.title}`;
    const idx = state.favorites.indexOf(key);
    if (idx >= 0) {
      state.favorites.splice(idx, 1);
      return { ok: true, favorite: false };
    }
    state.favorites.push(key);
    note(`❤️ Favorited ${track.title} — ${track.artist}.`);
    return { ok: true, favorite: true };
  }

  function queueNews(text) {
    state.newsQueue.push(text);
    if (state.newsQueue.length > 8) state.newsQueue.shift();
    return { ok: true, queued: state.newsQueue.length };
  }

  function tick(dt, situation = {}) {
    if (!state.playing || state.muted) return;
    state.trackTime += dt;
    const track = currentTrack();
    if (state.trackTime >= track.length) nextTrack();
    // Auto-DJ: chase flips to the high-energy station, late night to chill.
    if (state.autoDj) {
      const now = typeof ctx.now === 'function' ? ctx.now() : Date.now();
      if (now - state.lastAutoSwitch > 15000) {
        const wanted = situation.wanted ?? (typeof ctx.getWanted === 'function' ? ctx.getWanted() : 0);
        const hour = situation.hour ?? (typeof ctx.getHour === 'function' ? ctx.getHour() : 12);
        if (wanted >= 2) {
          const r = setStation(CHASE_STATION, 'auto-chase');
          if (r.changed) state.lastAutoSwitch = now;
        } else if ((hour >= 23 || hour < 5) && state.stationId !== NIGHT_STATION && rng() < 0.3) {
          const r = setStation(NIGHT_STATION, 'auto-night');
          if (r.changed) state.lastAutoSwitch = now;
        }
      }
    }
    // News bulletins read out between tracks on the news station.
    if (state.stationId === 'news' && state.newsQueue.length && state.trackTime > 20) {
      const item = state.newsQueue.shift();
      state.newsRead += 1;
      note(`📰 SOLARA NEWS: ${item}`);
    }
  }

  function nowPlaying() {
    const st = currentStation();
    const track = currentTrack();
    return {
      station: st.name, genre: st.genre, dj: st.dj,
      title: track.title, artist: track.artist,
      elapsed: Math.floor(state.trackTime), length: track.length,
      playing: state.playing, muted: state.muted, volume: state.volume,
    };
  }

  function stats() {
    return {
      station: state.stationId,
      switches: state.switches,
      tracksPlayed: state.tracksPlayed,
      favorites: state.favorites.length,
      newsRead: state.newsRead,
      nowPlaying: nowPlaying(),
    };
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(data) {
    if (!data || data.version !== RADIO_VERSION) return false;
    Object.assign(state, data);
    return true;
  }

  function hudLine() {
    if (!state.playing || state.muted) return '📻 Radio off';
    const np = nowPlaying();
    return `📻 ${np.station} — ${np.title} · ${np.artist}`;
  }

  return {
    name: 'radio',
    version: RADIO_VERSION,
    state,
    stations: STATIONS,
    currentStation,
    currentTrack,
    setStation,
    next,
    nextTrack,
    togglePlay,
    toggleMute,
    setVolume,
    toggleFavorite,
    queueNews,
    tick,
    nowPlaying,
    stats,
    serialize,
    deserialize,
    hudLine,
  };
}

export default createRadioSystem;
