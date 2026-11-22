// Solara Nights — save and continue: mission progress and money in localStorage.
import { SAVE_KEY } from './config.js';

// Saves remember which version wrote them, so a future build can migrate
// instead of choking on a shape it no longer writes.
export const SAVE_VERSION = 2;

export function saveGame(data) {
  try {
    window.localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({ ...data, version: SAVE_VERSION, savedAt: Date.now() }),
    );
    return true;
  } catch {
    return false;
  }
}

export function loadGame() {
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (typeof data !== 'object' || data === null) return null;
    // Shape-check the save: a hand-edited or truncated entry must not
    // hand the game a missionIndex/money of the wrong type.
    if (typeof data.missionIndex !== 'number' || typeof data.money !== 'number') return null;
    // v1 saves carry no version and no stats: treat them as version 1 with
    // empty stats instead of rejecting a save the player earned.
    if (typeof data.version !== 'number') data.version = 1;
    if (typeof data.stats !== 'object' || data.stats === null) data.stats = {};
    return data;
  } catch {
    return null;
  }
}

export function clearSave() {
  try {
    window.localStorage.removeItem(SAVE_KEY);
  } catch {
    // Storage can be off; nothing to clear.
  }
}

export function hasSave() {
  return loadGame() !== null;
}
