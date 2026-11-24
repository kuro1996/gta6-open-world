export const FISHING_VERSION = 1;

export const FISH_SPECIES = [
  { id: 'mullet', name: 'Mullet', base: 12, weight: [0.4, 1.2], rarity: 0.34, fight: 0.5, night: false, depth: 'shallow' },
  { id: 'snapper', name: 'Snapper', base: 28, weight: [0.8, 2.4], rarity: 0.26, fight: 0.8, night: false, depth: 'shallow' },
  { id: 'catfish', name: 'Catfish', base: 35, weight: [1.5, 4.5], rarity: 0.16, fight: 1.0, night: true, depth: 'deep' },
  { id: 'barracuda', name: 'Barracuda', base: 60, weight: [2.0, 6.0], rarity: 0.12, fight: 1.4, night: false, depth: 'deep' },
  { id: 'tarpon', name: 'Tarpon', base: 110, weight: [4.0, 12.0], rarity: 0.08, fight: 1.8, night: true, depth: 'deep' },
  { id: 'golden-koi', name: 'Golden Koi', base: 300, weight: [0.5, 1.5], rarity: 0.04, fight: 1.2, night: true, depth: 'shallow' },
];

export const FISHING_SPOTS = [
  { id: 'pier', name: 'Old Pier', x: -120, z: 210, bonus: 0.1, depth: 'deep', desc: 'Deep water off the rotting boards.' },
  { id: 'marina', name: 'Marina', x: 40, z: 190, bonus: 0.15, depth: 'shallow', desc: 'Calm water between the yachts.' },
  { id: 'canal', name: 'Canal Bend', x: 90, z: 60, bonus: 0.05, depth: 'shallow', desc: 'Slow water, patient fish.' },
  { id: 'rocks', name: 'Rocky Point', x: -190, z: 40, bonus: 0.2, depth: 'deep', desc: 'Rough water, big fish.' },
  { id: 'beach', name: 'Beach Shore', x: 180, z: 150, bonus: 0, depth: 'shallow', desc: 'Easy casting from the sand.' },
];

export const BAITS = [
  { id: 'bread', name: 'Bread', cost: 2, attract: 0.8, targets: ['mullet', 'snapper'] },
  { id: 'shrimp', name: 'Shrimp', cost: 6, attract: 1.0, targets: ['snapper', 'catfish', 'barracuda'] },
  { id: 'lure', name: 'Lure', cost: 12, attract: 1.2, targets: ['barracuda', 'tarpon'] },
  { id: 'glow-worm', name: 'Glow Worm', cost: 20, attract: 1.4, targets: ['catfish', 'tarpon', 'golden-koi'] },
];

export function biteChanceForHour(hour) {
  const h = hour ?? 12;
  if (h >= 5 && h < 8) return 1.5;
  if (h >= 17 && h < 20) return 1.35;
  if (h >= 20 || h < 5) return 1.1;
  return 0.85;
}

export function isNightHour(hour) {
  return hour >= 20 || hour < 5;
}

export function pickSpecies(rng, hour, spot, bait) {
  const night = isNightHour(hour ?? 12);
  const pool = FISH_SPECIES.filter((s) => {
    if (s.night && !night) return false;
    if (!s.night && night && s.id !== 'mullet') {
      // night still allows some day fish at lower odds; keep them in pool
    }
    if (spot && spot.depth === 'shallow' && s.depth === 'deep') return false;
    return true;
  });
  const roll = typeof rng === 'function' ? rng : Math.random;
  let total = 0;
  const weighted = pool.map((s) => {
    let w = s.rarity;
    if (bait && bait.targets && bait.targets.includes(s.id)) w *= 1.6;
    if (spot) w *= 1 + (spot.bonus || 0);
    total += w;
    return { s, w };
  });
  let r = roll() * total;
  for (const entry of weighted) {
    r -= entry.w;
    if (r <= 0) return entry.s;
  }
  return weighted.length ? weighted[weighted.length - 1].s : FISH_SPECIES[0];
}

export function rollWeight(rng, species) {
  const roll = typeof rng === 'function' ? rng : Math.random;
  const [lo, hi] = species.weight;
  return lo + roll() * (hi - lo);
}

export function priceForCatch(species, weight, soldCount, hour) {
  const sizeFactor = 0.7 + (weight / species.weight[1]) * 0.6;
  const flood = Math.max(0.45, 1 - (soldCount || 0) * 0.06);
  let price = species.base * sizeFactor * flood;
  const h = hour ?? 12;
  if ((h >= 5 && h < 8) || (h >= 17 && h < 20)) price *= 1.1;
  return Math.max(1, Math.round(price));
}

export function nearestSpot(x, z, maxDist = 14) {
  let best = null;
  let bestD = Infinity;
  for (const s of FISHING_SPOTS) {
    const d = Math.hypot(s.x - x, s.z - z);
    if (d < bestD) { bestD = d; best = s; }
  }
  return best && bestD <= maxDist ? best : null;
}

function clone(v) {
  return JSON.parse(JSON.stringify(v));
}

export function createFishingSystem(ctx = {}) {
  const c = ctx || {};
  const roll = typeof c.rng === 'function' ? c.rng : () => Math.random();

  const state = {
    version: FISHING_VERSION,
    phase: 'idle',
    spot: null,
    baitId: 'bread',
    fish: null,
    tension: 0,
    distance: 0,
    waitTimer: 0,
    biteTimer: 0,
    creel: [],
    casts: 0,
    caught: 0,
    lost: 0,
    snapped: 0,
    earned: 0,
    spent: 0,
    sold: {},
    best: null,
  };

  function say(msg) {
    if (typeof c.log === 'function') c.log(msg);
  }

  function cashNow() {
    if (typeof c.getCash === 'function') return c.getCash();
    if (typeof c.cash === 'number') return c.cash;
    return 0;
  }

  function pay(amount) {
    if (typeof c.addCash === 'function') c.addCash(amount);
    else if (typeof c.cash === 'number') c.cash += amount;
  }

  function baitNow() {
    return BAITS.find((b) => b.id === state.baitId) || BAITS[0];
  }

  function hourNow() {
    return typeof c.getHour === 'function' ? c.getHour() : 12;
  }

  const sys = {
    name: 'Fishing',
    version: FISHING_VERSION,
    state,
    spots: FISHING_SPOTS,
    baits: BAITS,

    startFishing(spot) {
      if (state.phase !== 'idle' && state.phase !== 'done') return { ok: false, reason: 'busy', phase: state.phase };
      const bait = baitNow();
      if (cashNow() < bait.cost) return { ok: false, reason: 'no-cash', cost: bait.cost };
      pay(-bait.cost);
      state.spent += bait.cost;
      state.spot = spot || null;
      state.phase = 'waiting';
      const chance = biteChanceForHour(hourNow());
      state.waitTimer = (2 + roll() * 6) / chance;
      state.biteTimer = 0;
      state.fish = null;
      state.casts += 1;
      say(`Cast out at ${spot ? spot.name : 'the water'} with ${bait.name}.`);
      return { ok: true, spot: spot ? spot.id : null, spotId: spot ? spot.id : null, phase: 'waiting' };
    },

    strike() {
      if (state.phase === 'bite') {
        const species = pickSpecies(roll, hourNow(), state.spot, baitNow());
        const weight = rollWeight(roll, species);
        state.fish = { species, weight, tension: 0, distance: 18 + roll() * 10 };
        state.distance = state.fish.distance;
        state.phase = 'fighting';
        if (typeof c.onBite === 'function') c.onBite(species);
        return { ok: true, hooked: true, species: species.id, fish: species.name };
      }
      if (state.phase === 'waiting') {
        state.phase = 'idle';
        state.spot = null;
        say('Struck too early — the fish spooked.');
        return { ok: false, reason: 'too-early', spooked: true };
      }
      return { ok: false, reason: 'not-fishing', phase: state.phase };
    },

    tick(dt, input) {
      const step = Number(dt) || 0;
      const reeling = !!(input && input.reel);
      if (state.phase === 'waiting') {
        state.waitTimer -= step;
        if (state.waitTimer <= 0) {
          state.phase = 'bite';
          state.biteTimer = 1.1 + roll() * 0.9;
          if (typeof c.onBite === 'function') c.onBite(null);
        }
        return;
      }
      if (state.phase === 'bite') {
        state.biteTimer -= step;
        if (state.biteTimer <= 0) {
          state.phase = 'idle';
          state.spot = null;
          state.lost += 1;
          say('The bite passed. Fish gone.');
        }
        return;
      }
      if (state.phase === 'fighting' && state.fish) {
        const f = state.fish;
        const pull = f.species.fight * step * (0.6 + roll() * 0.8);
        f.distance += pull * 0.4;
        if (reeling) {
          f.distance -= step * 3.2;
          f.tension = Math.min(1.4, (f.tension || 0) + step * 0.35 * f.species.fight);
        } else {
          f.tension = Math.max(0, (f.tension || 0) - step * 0.4);
        }
        state.distance = f.distance;
        if ((f.tension || 0) >= 1) {
          state.phase = 'idle';
          state.fish = null;
          state.spot = null;
          state.snapped += 1;
          say('Line snapped!');
          return;
        }
        if (f.distance <= 0) {
          const value = priceForCatch(f.species, f.weight, state.sold[f.species.id] || 0, hourNow());
          const caughtFish = { species: f.species.id, name: f.species.name, weight: Math.round(f.weight * 100) / 100, value };
          state.creel.push(caughtFish);
          state.caught += 1;
          if (!state.best || value > state.best.value) state.best = { ...caughtFish };
          state.phase = 'done';
          state.fish = null;
          if (typeof c.onCatch === 'function') c.onCatch(caughtFish);
          say(`Caught a ${f.species.name} (${caughtFish.weight}kg) worth $${value}.`);
        }
      }
    },

    sellAll() {
      if (state.creel.length === 0) return { ok: false, reason: 'empty-creel' };
      let total = 0;
      for (const fish of state.creel) {
        total += fish.value;
        state.sold[fish.species] = (state.sold[fish.species] || 0) + 1;
      }
      const count = state.creel.length;
      state.creel = [];
      state.earned += total;
      pay(total);
      say(`Sold ${count} fish for $${total}.`);
      return { ok: true, count, total };
    },

    sellOne(index) {
      const fish = state.creel[index];
      if (!fish) return { ok: false, reason: 'no-fish', index };
      state.creel.splice(index, 1);
      state.sold[fish.species] = (state.sold[fish.species] || 0) + 1;
      state.earned += fish.value;
      pay(fish.value);
      say(`Sold a ${fish.name} for $${fish.value}.`);
      return { ok: true, value: fish.value, fish };
    },

    setBait(id) {
      const bait = BAITS.find((b) => b.id === id);
      if (!bait) return { ok: false, reason: 'unknown-bait' };
      state.baitId = id;
      return { ok: true, bait: id, baitId: id };
    },

    resetSpot() {
      state.phase = 'idle';
      state.spot = null;
      state.fish = null;
      return { ok: true, phase: 'idle' };
    },

    hudLine() {
      if (state.phase === 'fighting' && state.fish) {
        return `Fighting ${state.fish.species.name} — tension ${Math.round(state.tension * 100)}% · ${Math.max(0, Math.round(state.distance))}m left`;
      }
      if (state.phase === 'bite') return 'BITE! Strike now!';
      if (state.phase === 'waiting') return 'Waiting for a bite…';
      if (state.creel.length > 0) return `Creel: ${state.creel.length} fish`;
      return '';
    },

    serialize() {
      const copy = clone(state);
      copy.spot = state.spot ? state.spot.id : null;
      copy.fish = null;
      if (copy.phase === 'fighting') copy.phase = 'idle';
      return copy;
    },

    deserialize(input) {
      if (!input || typeof input !== 'object') return false;
      if (input.version !== FISHING_VERSION) return false;
      Object.keys(input).forEach((k) => { state[k] = clone(input[k]); });
      state.spot = typeof input.spot === 'string' ? (FISHING_SPOTS.find((s) => s.id === input.spot) || null) : (input.spot || null);
      state.phase = 'idle';
      state.fish = null;
      return true;
    },

    stats() {
      return {
        phase: state.phase,
        casts: state.casts,
        caught: state.caught,
        lost: state.lost,
        snapped: state.snapped,
        earned: state.earned,
        spent: state.spent,
        profit: state.earned - state.spent,
        creel: state.creel.length,
        creelCount: state.creel.length,
        best: state.best,
        bestCatch: state.best,
      };
    },
  };

  return sys;
}

export default createFishingSystem;
