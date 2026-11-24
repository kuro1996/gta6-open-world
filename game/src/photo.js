export const PHOTO_VERSION = 1;
export const MAX_GALLERY = 24;

export const FILTERS = [
  { id: 'none', name: 'No Filter', grade: 'neutral', vignette: 0, saturation: 1.0, contrast: 1.0, warmth: 0, description: 'Clean shot, no grading.' },
  { id: 'neon', name: 'Vice Neon', grade: 'magenta-teal', vignette: 0.35, saturation: 1.5, contrast: 1.15, warmth: -0.2, description: 'Magenta and teal neon glow.' },
  { id: 'golden', name: 'Golden Hour', grade: 'warm', vignette: 0.25, saturation: 1.25, contrast: 1.05, warmth: 0.6, description: 'Warm late-afternoon light.' },
  { id: 'noir', name: 'Noir', grade: 'mono', vignette: 0.5, saturation: 0, contrast: 1.35, warmth: 0, description: 'Black and white, hard contrast.' },
  { id: 'vhs', name: 'VHS 1986', grade: 'tape', vignette: 0.4, saturation: 0.9, contrast: 0.95, warmth: 0.15, description: 'Tape grain from another decade.' },
  { id: 'polaroid', name: 'Polaroid', grade: 'faded', vignette: 0.3, saturation: 0.8, contrast: 0.9, warmth: 0.3, description: 'Soft faded instant film.' },
  { id: 'turbo', name: 'Turbo Pop', grade: 'hyper', vignette: 0.15, saturation: 1.9, contrast: 1.25, warmth: 0.1, description: 'Colour turned all the way up.' },
];

export const FRAMES = [
  { id: 'none', name: 'No Frame', border: 0 },
  { id: 'polaroid', name: 'Polaroid Frame', border: 24 },
  { id: 'film', name: 'Film Strip', border: 12 },
  { id: 'gold', name: 'Gold Leaf', border: 8 },
  { id: 'neon-edge', name: 'Neon Edge', border: 6 },
];

const CAPTIONS = [
  'Solara Nights',
  'Vice City never sleeps',
  'Golden hour over the bay',
  'Caught in the act',
  'This city is mine tonight',
  'Chrome, neon, and bad ideas',
];

export function filterById(id) {
  return FILTERS.find((f) => f.id === id) || FILTERS[0];
}

export function frameById(id) {
  return FRAMES.find((f) => f.id === id) || FRAMES[0];
}

export function likesForShot(shot) {
  let likes = 8;
  const wanted = shot.wanted || 0;
  const airborne = shot.airborne || false;
  const speed = shot.speed || 0;
  const hour = shot.hour === undefined ? 12 : shot.hour;
  const caption = shot.caption || '';
  if (wanted >= 2) likes += 40;
  if (airborne) likes += 35;
  if (speed > 25) likes += 15;
  if (hour >= 19 || hour < 6) likes += 12;
  if (shot.filterId === 'neon' || shot.filterId === 'golden') likes += 10;
  if (caption.length > 12) likes += 5;
  likes += Math.floor(Math.random() * 12);
  return likes;
}

export function createPhotoSystem(ctx) {
  const c = ctx || {};
  const state = {
    version: PHOTO_VERSION,
    active: false,
    filterId: 'neon',
    frameId: 'none',
    camera: { yaw: 0, pitch: -0.25, distance: 8, height: 2.5 },
    fov: 55,
    hideHud: true,
    timeFrozen: true,
    gallery: [],
    shotsTaken: 0,
    totalLikes: 0,
    bestShot: null,
    log: [],
  };

  function note(msg) {
    state.log.push(msg);
    if (state.log.length > 40) state.log.shift();
    if (typeof c.log === 'function') c.log(msg);
  }
  function captionFor() {
    return CAPTIONS[state.shotsTaken % CAPTIONS.length];
  }
  function posNow() {
    if (typeof c.getPlayerPos === 'function') return c.getPlayerPos();
    return { x: 0, y: 0, z: 0 };
  }
  function hourNow() {
    return typeof c.getHour === 'function' ? c.getHour() : 12;
  }
  function wantedNow() {
    return typeof c.getWanted === 'function' ? c.getWanted() : 0;
  }

  const sys = {
    name: 'photo',
    version: PHOTO_VERSION,
    state,
    filters: FILTERS,
    frames: FRAMES,

    enter() {
      if (state.active) return { ok: false, reason: 'already-active' };
      state.active = true;
      if (typeof c.onPhotoEnter === 'function') c.onPhotoEnter();
      note('Photo mode on.');
      return { ok: true };
    },

    exit() {
      if (!state.active) return { ok: false, reason: 'not-active' };
      state.active = false;
      if (typeof c.onPhotoExit === 'function') c.onPhotoExit();
      return { ok: true };
    },

    setFilter(id) {
      const f = FILTERS.find((x) => x.id === id);
      if (!f) return { ok: false, reason: 'unknown-filter' };
      state.filterId = id;
      return { ok: true, filter: f };
    },

    nextFilter(dir) {
      const step = dir === undefined ? 1 : dir;
      const idx = FILTERS.findIndex((x) => x.id === state.filterId);
      const next = FILTERS[(idx + step + FILTERS.length) % FILTERS.length];
      return sys.setFilter(next.id);
    },

    setFrame(id) {
      const f = FRAMES.find((x) => x.id === id);
      if (!f) return { ok: false, reason: 'unknown-frame' };
      state.frameId = id;
      return { ok: true, frame: f };
    },

    moveCamera(dYaw, dPitch, dDist) {
      state.camera.yaw += dYaw || 0;
      state.camera.pitch = Math.max(-1.2, Math.min(0.6, state.camera.pitch + (dPitch || 0)));
      state.camera.distance = Math.max(2, Math.min(30, state.camera.distance + (dDist || 0)));
      return { ok: true, camera: Object.assign({}, state.camera) };
    },

    setFov(fov) {
      state.fov = Math.max(20, Math.min(110, fov));
      return { ok: true, fov: state.fov };
    },

    toggleHud() {
      state.hideHud = !state.hideHud;
      return { ok: true, hideHud: state.hideHud };
    },

    takeShot(caption) {
      if (!state.active) return { ok: false, reason: 'not-in-photo-mode' };
      const p = posNow();
      const hour = hourNow();
      const wanted = wantedNow();
      const airborne = typeof c.isAirborne === 'function' ? c.isAirborne() : false;
      const speed = typeof c.getSpeed === 'function' ? c.getSpeed() : 0;
      const text = caption || captionFor();
      const likes = likesForShot({ filterId: state.filterId, wanted, airborne, speed, hour, caption: text });
      const shot = {
        id: 'shot-' + (state.shotsTaken + 1),
        filterId: state.filterId,
        frameId: state.frameId,
        caption: text,
        x: Math.round(p.x || 0),
        z: Math.round(p.z || 0),
        hour,
        wanted,
        likes,
        takenAt: Date.now(),
      };
      if (typeof c.captureFrame === 'function') {
        const data = c.captureFrame();
        if (typeof data === 'string') shot.dataUrl = data;
      }
      state.gallery.unshift(shot);
      if (state.gallery.length > MAX_GALLERY) state.gallery.length = MAX_GALLERY;
      state.shotsTaken += 1;
      state.totalLikes += likes;
      if (!state.bestShot || likes > state.bestShot.likes) state.bestShot = shot;
      note('Saved a photo: ' + text + ' (' + likes + ' likes).');
      if (typeof c.onShot === 'function') c.onShot(shot);
      return { ok: true, shot };
    },

    deleteShot(id) {
      const idx = state.gallery.findIndex((s) => s.id === id);
      if (idx < 0) return { ok: false, reason: 'no-such-shot' };
      const removed = state.gallery[idx];
      state.gallery.splice(idx, 1);
      state.totalLikes -= removed.likes;
      if (state.bestShot && state.bestShot.id === id) {
        state.bestShot = null;
        for (const s of state.gallery) {
          if (!state.bestShot || s.likes > state.bestShot.likes) state.bestShot = s;
        }
      }
      return { ok: true, id };
    },

    clearGallery() {
      state.gallery = [];
      state.totalLikes = 0;
      state.bestShot = null;
      return { ok: true };
    },

    stats() {
      return {
        shotsTaken: state.shotsTaken,
        gallerySize: state.gallery.length,
        totalLikes: state.totalLikes,
        bestShot: state.bestShot,
        active: state.active,
        filter: state.filterId,
      };
    },

    serialize() {
      const copy = JSON.parse(JSON.stringify(state));
      for (const s of copy.gallery) delete s.dataUrl;
      return copy;
    },

    deserialize(data) {
      if (!data || data.version !== PHOTO_VERSION) return false;
      const copy = JSON.parse(JSON.stringify(data));
      for (const k of Object.keys(state)) delete state[k];
      Object.assign(state, copy);
      state.active = false;
      return true;
    },

    hudLine() {
      if (!state.active) return '';
      const f = filterById(state.filterId);
      return 'PHOTO MODE ' + f.name + ' | ' + state.gallery.length + '/' + MAX_GALLERY;
    },
  };
  return sys;
}

export default createPhotoSystem;
