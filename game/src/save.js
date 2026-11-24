import { SAVE_KEY } from './config.js';

export const SAVE_VERSION = 5;

const STAT_FIELDS = ['kills', 'missions', 'bestDrop', 'sideJobs', 'sideEarned', 'rep', 'nightOps', 'nightBurned', 'storms', 'marketDeals'];

export function emptyStats() {
  const s = {};
  for (const f of STAT_FIELDS) s[f] = 0;
  return s;
}

function fillStats(raw) {
  const out = emptyStats();
  if (raw && typeof raw === 'object') {
    for (const f of STAT_FIELDS) {
      if (typeof raw[f] === 'number') out[f] = raw[f];
    }
  }
  return out;
}

export function saveGame(data) {
  try {
    const payload = Object.assign({}, data, { version: SAVE_VERSION, savedAt: Date.now() });
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    return true;
  } catch (err) {
    return false;
  }
}

export function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (typeof parsed.missionIndex !== 'number' || typeof parsed.money !== 'number') return null;
    if (parsed.version === undefined || parsed.version === null) parsed.version = 1;
    parsed.stats = fillStats(parsed.stats);
    if (typeof parsed.tutorialSeen !== 'boolean') parsed.tutorialSeen = false;
    return parsed;
  } catch (err) {
    return null;
  }
}

export function clearSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (err) {
    // storage unavailable; nothing to clear
  }
}

export function clearStats() {
  const current = loadGame();
  if (!current) return false;
  current.stats = emptyStats();
  return saveGame(current);
}

export function hasSave() {
  return loadGame() !== null;
}
