// Solara Nights — Photo Mode (round 4 attempt 6, NEW module).
// Freeze the action, frame the shot, pick a filter, and save it to the
// gallery. Photo mode pauses the simulation (the world waits while the
// player composes), frees the camera from the car, and offers a set of
// film-style filters — Vice Neon, Golden Hour, Noir, VHS, Polaroid —
// each with its own colour grade and vignette. Shots are stored as
// gallery entries with the in-game location, time, wanted level and a
// caption; the best shots earn "likes" from the city's fictional social
// feed, and a shot taken during a chase or a stunt is worth more.
//
// The gallery is capped (24 shots) and survives save/load as metadata;
// the actual pixels live in the browser (canvas data URL) when the
// renderer hands them over through the ctx hook, otherwise the entry
// is metadata-only and still counts. Self-contained: talks to the game
// only through the optional `ctx` hooks.

export const PHOTO_VERSION = 1;
export const MAX_GALLERY = 24;

export const FILTERS = [
  { id: 'none', name: 'No Filter', grade: 'neutral', vignette: 0, saturation: 1.0, contrast: 1.0, warmth: 0, desc: 'The bay, exactly as it is.' },
  { id: 'neon', name: 'Vice Neon', grade: 'magenta-teal', vignette: 0.35, saturation: 1.5, contrast: 1.15, warmth: -0.2, desc: 'Pink skies, teal streets. The postcard look.' },
  { id: 'golden', name: 'Golden Hour', grade: 'warm', vignette: 0.25, saturation: 1.25, contrast: 1.05, warmth: 0.6, desc: 'Everything drenched in sunset honey.' },
  { id: 'noir', name: 'Noir', grade: 'mono', vignette: 0.5, saturation: 0, contrast: 1.35, warmth: 0, desc: 'Black, white, and trouble.' },
  { id: 'vhs', name: 'VHS 1986', grade: 'tape', vignette: 0.4, saturation: 0.9, contrast: 0.95, warmth: 0.15, desc: 'Tracking lines and bad decisions.' },
  { id: 'polaroid', name: 'Polaroid', grade: 'faded', vignette: 0.3, saturation: 0.8, contrast: 0.9, warmth: 0.3, desc: 'Soft, square, slightly out of focus.' },
  { id: 'turbo', name: 'Turbo Pop', grade: 'hyper', vignette: 0.15, saturation: 1.9, contrast: 1.25, warmth: 0.1, desc: 'Colours turned up until they hurt.' },
];

export const FRAMES = [
  { id: 'none', name: 'No Frame', border: 0 },
  { id: 'polaroid-frame', name: 'Polaroid Frame', border: 24 },
  { id: 'film', name: 'Film Strip', border: 12 },
  { id: 'gold', name: 'Gold Leaf', border: 8 },
  { id: 'neon-frame', name: 'Neon Edge', border: 6 },
];

export function filterById(id) {
  return FILTERS.find((f) => f.id === id) || FILTERS[0];
}

export function frameById(id) {
  return FRAMES.find((f) => f.id === id) || FRAMES[0];
}

// Likes: a chase or stunt shot is worth more; night shots trend better.
export function likesForShot({ filterId, wanted = 0, airborne = false, speed = 0, hour = 12, caption = '' }) {
  let likes = 8;
  if (wanted >= 2) likes += 40;
  if (airborne) likes += 35;
  if (speed > 25) likes += 15;
  if (hour >= 19 || hour < 6) likes += 12;
  if (filterId === 'neon' || filterId === 'golden') likes += 10;
  if (caption.length > 12) likes += 5;
  return likes + Math.floor(Math.random() * 12);
}

export function createPhotoSystem(ctx = {}) {
  const state = {
    version: PHOTO_VERSION,
    active: false,
    filterId: 'neon',
    frameId: 'none',
    camera: { yaw: 0, pitch: -0.25, dist: 8, height: 2.5 },
    fov: 55,
    hideHud: true,
    timeFrozen: true,
    gallery: [], // { id, filterId, frameId, caption, x, z, hour, wanted, likes, takenAt, dataUrl? }
    shotsTaken: 0,
    totalLikes: 0,
    bestShot: null,
    log: [],
  };

  function note(msg) {
    state.log.push(msg);
    if (state.log.length > 40) state.log.shift();
    if (typeof ctx.log === 'function') ctx.log(msg);
  }

  function playerPos() {
    if (typeof ctx.getPlayerPos === 'function') return ctx.getPlayerPos();
    return { x: 0, z: 0 };
  }

  function hourNow() {
    if (typeof ctx.getHour === 'function') return ctx.getHour();
    return 12;
  }

  function wantedNow() {
    if (typeof ctx.getWanted === 'function') return ctx.getWanted();
    return 0;
  }

  function enter() {
    if (state.active) return { ok: false, reason: 'already-active' };
    state.active = true;
    if (typeof ctx.onPhotoEnter === 'function') ctx.onPhotoEnter();
    note('📷 Photo mode — world paused. Frame it, filter it, shoot it.');
    return { ok: true };
  }

  function exit() {
    if (!state.active) return { ok: false, reason: 'not-active' };
    state.active = false;
    if (typeof ctx.onPhotoExit === 'function') ctx.onPhotoExit();
    return { ok: true };
  }

  function setFilter(id) {
    const f = filterById(id);
    if (!FILTERS.some((x) => x.id === id)) return { ok: false, reason: 'unknown-filter' };
    state.filterId = id;
    return { ok: true, filter: f };
  }

  function nextFilter(dir = 1) {
    const idx = FILTERS.findIndex((f) => f.id === state.filterId);
    const next = FILTERS[(idx + dir + FILTERS.length) % FILTERS.length];
    return setFilter(next.id);
  }

  function setFrame(id) {
    if (!FRAMES.some((x) => x.id === id)) return { ok: false, reason: 'unknown-frame' };
    state.frameId = id;
    return { ok: true, frame: frameById(id) };
  }

  function moveCamera(dYaw, dPitch, dDist) {
    state.camera.yaw += dYaw || 0;
    state.camera.pitch = Math.max(-1.2, Math.min(0.6, state.camera.pitch + (dPitch || 0)));
    state.camera.dist = Math.max(2, Math.min(30, state.camera.dist + (dDist || 0)));
    return { ok: true, camera: { ...state.camera } };
  }

  function setFov(fov) {
    state.fov = Math.max(20, Math.min(110, fov));
    return { ok: true, fov: state.fov };
  }

  function toggleHud() {
    state.hideHud = !state.hideHud;
    return { ok: true, hideHud: state.hideHud };
  }

  function takeShot(caption = '') {
    if (!state.active) return { ok: false, reason: 'not-in-photo-mode' };
    const p = playerPos();
    const likes = likesForShot({
      filterId: state.filterId,
      wanted: wantedNow(),
      airborne: typeof ctx.isAirborne === 'function' ? ctx.isAirborne() : false,
      speed: typeof ctx.getSpeed === 'function' ? ctx.getSpeed() : 0,
      hour: hourNow(),
      caption,
    });
    const shot = {
      id: `shot-${state.shotsTaken + 1}`,
      filterId: state.filterId,
      frameId: state.frameId,
      caption: caption || defaultCaption(),
      x: Math.round(p.x), z: Math.round(p.z),
      hour: hourNow(), wanted: wantedNow(),
      likes, takenAt: Date.now(),
    };
    if (typeof ctx.captureFrame === 'function') {
      try {
        const dataUrl = ctx.captureFrame(shot);
        if (typeof dataUrl === 'string') shot.dataUrl = dataUrl;
      } catch (e) { /* metadata-only shot still counts */ }
    }
    state.gallery.unshift(shot);
    if (state.gallery.length > MAX_GALLERY) state.gallery.length = MAX_GALLERY;
    state.shotsTaken += 1;
    state.totalLikes += likes;
    if (!state.bestShot || likes > state.bestShot.likes) state.bestShot = shot;
    note(`📷 Shot saved — "${shot.caption}" (+${likes} likes). Gallery ${state.gallery.length}/${MAX_GALLERY}.`);
    if (typeof ctx.onShot === 'function') ctx.onShot(shot);
    return { ok: true, shot };
  }

  function defaultCaption() {
    const captions = [
      'Solara Nights.',
      'Vice City never sleeps.',
      'Golden hour over the bay.',
      'Caught in the act.',
      'This city is mine tonight.',
      'Chrome, neon, and bad ideas.',
    ];
    return captions[state.shotsTaken % captions.length];
  }

  function deleteShot(id) {
    const idx = state.gallery.findIndex((s) => s.id === id);
    if (idx < 0) return { ok: false, reason: 'no-such-shot' };
    const [removed] = state.gallery.splice(idx, 1);
    state.totalLikes -= removed.likes;
    if (state.bestShot && state.bestShot.id === id) {
      state.bestShot = state.gallery.reduce((best, s) => (!best || s.likes > best.likes ? s : best), null);
    }
    return { ok: true, removed: id };
  }

  function clearGallery() {
    state.gallery = [];
    state.totalLikes = 0;
    state.bestShot = null;
    return { ok: true };
  }

  function stats() {
    return {
      shotsTaken: state.shotsTaken,
      gallerySize: state.gallery.length,
      totalLikes: state.totalLikes,
      bestShot: state.bestShot,
      active: state.active,
      filter: state.filterId,
    };
  }

  function serialize() {
    const gallery = state.gallery.map(({ dataUrl, ...rest }) => rest);
    return JSON.parse(JSON.stringify({ ...state, gallery }));
  }

  function deserialize(data) {
    if (!data || data.version !== PHOTO_VERSION) return false;
    Object.assign(state, data);
    state.active = false;
    return true;
  }

  function hudLine() {
    if (state.active) {
      const f = filterById(state.filterId);
      return `📷 PHOTO MODE — ${f.name} — gallery ${state.gallery.length}/${MAX_GALLERY}`;
    }
    return '';
  }

  return {
    name: 'photo',
    version: PHOTO_VERSION,
    state,
    filters: FILTERS,
    frames: FRAMES,
    enter,
    exit,
    setFilter,
    nextFilter,
    setFrame,
    moveCamera,
    setFov,
    toggleHud,
    takeShot,
    deleteShot,
    clearGallery,
    stats,
    serialize,
    deserialize,
    hudLine,
  };
}

export default createPhotoSystem;
