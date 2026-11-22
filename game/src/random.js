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

/** Pick one entry from [{ item, weight }] by weight. A zero total
 * weight falls back to a uniform pick instead of returning nothing. */
export function weightedChoice(rng, entries) {
  let total = 0;
  for (const e of entries) total += Math.max(0, e.weight || 0);
  if (total <= 0) return entries[Math.floor(rng.range(0, entries.length))].item;
  let roll = rng.range(0, total);
  for (const e of entries) {
    roll -= Math.max(0, e.weight || 0);
    if (roll <= 0) return e.item;
  }
  return entries[entries.length - 1].item;
}

/** Fisher–Yates shuffle that returns a new array, leaving the input
 * untouched — the caller's deck stays in order for the next draw. */
export function shuffleBag(array, rng) {
  const out = [...array];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng.range(0, i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Draw n distinct items from an array without replacement. Asking for
 * more than the array holds just returns the whole array, shuffled. */
export function pickN(rng, array, n) {
  return shuffleBag(array, rng).slice(0, Math.max(0, Math.min(n, array.length)));
}

/** A random point on a ring: radius between inner and outer, angle
 * anywhere. Used to scatter watchers, puddles and stalls around a spot
 * without ever landing on top of it. */
export function ringPoint(rng, cx, cz, inner, outer) {
  const angle = rng.range(0, Math.PI * 2);
  const radius = rng.range(inner, outer);
  return { x: cx + Math.sin(angle) * radius, z: cz + Math.cos(angle) * radius, angle };
}
