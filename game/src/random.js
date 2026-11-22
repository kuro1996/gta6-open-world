// Solara Nights — small deterministic random helpers (mulberry32).
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRng(seed) {
  const next = mulberry32(seed);
  return {
    next,
    range(min, max) {
      return min + next() * (max - min);
    },
    int(min, max) {
      return Math.floor(min + next() * (max - min + 1));
    },
    pick(list) {
      return list[Math.floor(next() * list.length)];
    },
    /** Pick a [value, weight] entry with probability proportional to weight. */
    weighted(entries) {
      let total = 0;
      for (const [, w] of entries) total += w;
      let roll = next() * total;
      for (const [value, w] of entries) {
        roll -= w;
        if (roll <= 0) return value;
      }
      return entries[entries.length - 1][0];
    },
    chance(p) {
      return next() < p;
    },
    /** Fisher-Yates shuffle, in place, driven by this rng. */
    shuffle(list) {
      for (let i = list.length - 1; i > 0; i -= 1) {
        const j = Math.floor(next() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
      return list;
    },
    /** Approximately normal value (Box-Muller), mean 0, stddev 1. */
    gauss() {
      let u = 0;
      let v = 0;
      while (u === 0) u = next();
      while (v === 0) v = next();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    },
    /** A die roll: an integer from 1 to sides, inclusive. */
    dice(sides) {
      return 1 + Math.floor(next() * sides);
    },
    /** n distinct items from a list, in random order (partial shuffle). */
    sample(list, n) {
      const copy = list.slice();
      this.shuffle(copy);
      return copy.slice(0, Math.max(0, Math.min(n, copy.length)));
    },
    /** A value in [0, 1] — the raw roll, for callers that already scale. */
    unit() {
      return next();
    },
  };
}

export function clamp(value, min, max) {
  return value < min ? min : value > max ? max : value;
}

/** Clamp to [0, 1] — the common case for factors like rain and night. */
export function clamp01(value) {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function dampAngle(current, target, lambda, dt) {
  const diff = wrapAngle(target - current);
  return current + diff * (1 - Math.exp(-lambda * dt));
}

/** Normalise an angle to (-PI, PI]. */
export function wrapAngle(angle) {
  let a = angle;
  while (a > Math.PI) a -= Math.PI * 2;
  while (a <= -Math.PI) a += Math.PI * 2;
  return a;
}

export function angleLerp(a, b, t) {
  let diff = b - a;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return a + diff * t;
}

export function distance2D(ax, az, bx, bz) {
  const dx = ax - bx;
  const dz = az - bz;
  return Math.sqrt(dx * dx + dz * dz);
}
