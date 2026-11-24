export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRng(seed) {
  const next = mulberry32(seed);
  const api = {
    next,
    range(lo, hi) {
      return lo + next() * (hi - lo);
    },
    int(lo, hi) {
      return Math.floor(lo + next() * (hi - lo + 1));
    },
    pick(list) {
      return list[Math.floor(next() * list.length)];
    },
    weighted(pairs) {
      let total = 0;
      for (const p of pairs) total += p[1];
      let roll = next() * total;
      for (const p of pairs) {
        roll -= p[1];
        if (roll <= 0) return p[0];
      }
      return pairs[pairs.length - 1][0];
    },
    chance(p) {
      return next() < p;
    },
    shuffle(list) {
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        const tmp = list[i];
        list[i] = list[j];
        list[j] = tmp;
      }
      return list;
    },
    gauss() {
      let u = 0;
      let v = 0;
      while (u === 0) u = next();
      while (v === 0) v = next();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    },
    dice(sides) {
      return 1 + Math.floor(next() * sides);
    },
    sample(list, count) {
      const copy = list.slice();
      api.shuffle(copy);
      return copy.slice(0, Math.min(count, copy.length));
    },
    unit() {
      return next();
    },
  };
  return api;
}

export function clamp(v, lo, hi) {
  if (v < lo) return lo;
  if (v > hi) return hi;
  return v;
}

export function clamp01(v) {
  return clamp(v, 0, 1);
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function wrapAngle(a) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a <= -Math.PI) a += Math.PI * 2;
  return a;
}

export function dampAngle(cur, target, rate, dt) {
  const diff = wrapAngle(target - cur);
  return cur + diff * (1 - Math.exp(-rate * dt));
}

export function angleLerp(a, b, t) {
  return a + wrapAngle(b - a) * t;
}

export function distance2D(x1, z1, x2, z2) {
  const dx = x2 - x1;
  const dz = z2 - z1;
  return Math.sqrt(dx * dx + dz * dz);
}

export function weightedChoice(rng, entries) {
  let total = 0;
  for (const e of entries) total += Math.max(0, e.weight);
  if (total <= 0) {
    return entries[Math.floor(rng.next() * entries.length)].item;
  }
  let roll = rng.next() * total;
  for (const e of entries) {
    roll -= Math.max(0, e.weight);
    if (roll <= 0) return e.item;
  }
  return entries[entries.length - 1].item;
}

export function shuffleBag(arr, rng) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

export function pickN(rng, arr, count) {
  return shuffleBag(arr, rng).slice(0, Math.min(count, arr.length));
}

export function ringPoint(rng, cx, cz, inner, outer) {
  const ang = rng.next() * Math.PI * 2;
  const r = inner + rng.next() * (outer - inner);
  return { x: cx + Math.cos(ang) * r, z: cz + Math.sin(ang) * r, angle: ang };
}
