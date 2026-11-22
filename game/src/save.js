// Solara Nights — save and continue: mission progress and money in localStorage.
import { SAVE_KEY } from './config.js';

// Saves remember which version wrote them, so a future build can migrate
// instead of choking on a shape it no longer writes.
// v3 (round 4): adds a stats block — kills, missions completed, best Drop
// time left — so Continue can show the player what they have done.
export const SAVE_VERSION = 3;

export function emptyStats() {
  return { kills: 0, missions: 0, bestDrop: 0 };
}

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
    // v2 saves have no stats block either (version 2 added the version
    // field itself); v3 fills it in from an empty block.
    if (typeof data.stats !== 'object' || data.stats === null) data.stats = emptyStats();
    else {
      // A partial stats block (hand-edited, or written by an older build)
      // gets its missing fields back instead of NaN-ing the HUD.
      if (typeof data.stats.kills !== 'number') data.stats.kills = 0;
      if (typeof data.stats.missions !== 'number') data.stats.missions = 0;
      if (typeof data.stats.bestDrop !== 'number') data.stats.bestDrop = 0;
    }
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

/** Reset only the stats block of an existing save, keeping mission/money. */
export function clearStats() {
  try {
    const data = loadGame();
    if (!data) return false;
    data.stats = emptyStats();
    return saveGame(data);
  } catch {
    return false;
  }
}

export function hasSave() {
  return loadGame() !== null;
}
