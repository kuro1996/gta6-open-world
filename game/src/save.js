// Solara Nights — save and continue: mission progress and money in localStorage.
import { SAVE_KEY } from './config.js';

export function saveGame(data) {
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(data));
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
