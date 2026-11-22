// Solara Nights — Fishing (round 4 attempt 6, NEW module).
// Shore fishing along the Solara Bay waterfront: find a spot, cast, watch
// the bobber, and strike in the bite window. Catches are worth money at
// the fish market, and the price of each species moves with the in-game
// clock (dawn bites best, night brings the rare ones) and with how many
// of that species the player has already flooded the market with.
// The minigame is a timing duel: the fish fights in pulls, the line has
// tension, and reeling too hard snaps it. Patience pays; greed loses fish.
//
// The module is self-contained and talks to the game only through the
// small `ctx` object passed to the factory. Every ctx hook is optional
// and guarded, so fishing works standalone as well as wired into main.js.

export const FISHING_VERSION = 1;

// --- species ---------------------------------------------------------------
export const FISH_SPECIES = [
  { id: 'mullet', name: 'Mullet', base: 6, weight: [0.3, 1.2], rarity: 0.34, fight: 0.5, night: false, depth: 'shallow' },
  { id: 'snapper', name: 'Bay Snapper', base: 14, weight: [0.5, 2.4], rarity: 0.26, fight: 0.8, night: false, depth: 'shallow' },
  { id: 'catfish', name: 'Canal Catfish', base: 18, weight: [0.8, 4.5], rarity: 0.16, fight: 1.1, night: true, depth: 'deep' },
  { id: 'barracuda', name: 'Barracuda', base: 34, weight: [1.2, 6.0], rarity: 0.12, fight: 1.6, night: false, depth: 'deep' },
  { id: 'tarpon', name: 'Silver Tarpon', base: 60, weight: [3.0, 12.0], rarity: 0.08, fight: 2.2, night: true, depth: 'deep' },
  { id: 'golden', name: 'Golden Koi', base: 150, weight: [0.4, 1.0], rarity: 0.04, fight: 1.0, night: false, depth: 'shallow' },
];

// --- spots -----------------------------------------------------------------
// x/z are world metres. The waterfront runs along the east edge (x ~ 318).
export const FISHING_SPOTS = [
  { id: 'pier', name: 'Old Pier', x: 312, z: -40, bonus: 1.15, depth: 'deep', desc: 'Deep water off the rotten boards.' },
  { id: 'marina', name: 'Marina Steps', x: 310, z: 60, bonus: 1.0, depth: 'shallow', desc: 'Calm water between the moored boats.' },
  { id: 'canal', name: 'Canal Mouth', x: 300, z: 170, bonus: 1.1, depth: 'deep', desc: 'Where the canal meets the bay.' },
  { id: 'rocks', name: 'Breakwater Rocks', x: 314, z: -160, bonus: 1.25, depth: 'deep', desc: 'Exposed rocks, strong current, big fish.' },
  { id: 'beach', name: 'South Beach', x: 306, z: 260, bonus: 0.9, depth: 'shallow', desc: 'Easy casting, small fish, quiet.' },
];

export const BAITS = [
  { id: 'bread', name: 'Bread', cost: 1, attract: 0.8, targets: ['mullet', 'snapper'] },
  { id: 'shrimp', name: 'Shrimp', cost: 3, attract: 1.0, targets: ['snapper', 'catfish', 'barracuda'] },
  { id: 'lure', name: 'Spinner Lure', cost: 8, attract: 1.25, targets: ['barracuda', 'tarpon', 'golden'] },
  { id: 'glow', name: 'Glow Worm', cost: 12, attract: 1.5, targets: ['catfish', 'tarpon', 'golden'] },
];

// Bite windows in game-hours: dawn 5-8 and dusk 17-20 are prime time.
export function biteChanceForHour(hour) {
  if (hour >= 5 && hour < 8) return 1.5;
  if (hour >= 17 && hour < 20) return 1.35;
  if (hour >= 20 || hour < 5) return 1.1;
  return 0.85;
}

export function isNightHour(hour) {
  return hour >= 20 || hour < 5;
}

export function pickSpecies(rng, spot, hour, bait) {
  const night = isNightHour(hour);
  const pool = FISH_SPECIES.filter((s) => {
    if (s.night && !night) return false;
    if (spot && spot.depth === 'shallow' && s.depth === 'deep') return Math.random() < 0.25;
    return true;
  });
  const weighted = pool.map((s) => {
    let w = s.rarity;
    if (bait && bait.targets.includes(s.id)) w *= 1.8;
    if (spot) w *= spot.bonus;
    return { s, w };
  });
  const total = weighted.reduce((a, b) => a + b.w, 0);
  let roll = (rng ? rng() : Math.random()) * total;
  for (const entry of weighted) {
    roll -= entry.w;
    if (roll <= 0) return entry.s;
  }
  return pool[0] || FISH_SPECIES[0];
}

export function rollWeight(species, rng) {
  const r = rng ? rng() : Math.random();
  return species.weight[0] + r * (species.weight[1] - species.weight[0]);
}

// Price falls as the player floods the market with one species.
export function priceForCatch(species, weightKg, soldCount, hour) {
  const sizeFactor = 0.7 + (weightKg / species.weight[1]) * 0.9;
  const flood = Math.max(0.45, 1 - soldCount * 0.06);
  const prime = biteChanceForHour(hour) > 1.2 ? 1.1 : 1.0;
  return Math.max(1, Math.round(species.base * sizeFactor * flood * prime));
}

export function nearestSpot(x, z, maxDist = 14) {
  let best = null;
  let bestD = maxDist;
  for (const spot of FISHING_SPOTS) {
    const d = Math.hypot(spot.x - x, spot.z - z);
    if (d < bestD) { bestD = d; best = spot; }
  }
  return best;
}

// --- system ----------------------------------------------------------------
export function createFishingSystem(ctx = {}) {
  const rng = ctx.rng || Math.random;
  const state = {
    version: FISHING_VERSION,
    activeSpot: null,
    phase: 'idle', // idle | waiting | bite | fighting | done
    baitId: 'shrimp',
    waitTimer: 0,
    biteWindow: 0,
    biteTimer: 0,
    fish: null, // { species, weightKg, distance, tension }
    tension: 0,
    reeling: false,
    casts: 0,
    caught: 0,
    lost: 0,
    snapped: 0,
    sold: {}, // speciesId -> count
    earned: 0,
    spent: 0,
    inventory: [], // { species, weightKg, value }
    bestCatch: null,
    log: [],
  };

  function note(msg) {
    state.log.push(msg);
    if (state.log.length > 40) state.log.shift();
    if (typeof ctx.log === 'function') ctx.log(msg);
  }

  function cash() {
    return typeof ctx.getCash === 'function' ? ctx.getCash() : (ctx.cash ?? 0);
  }

  function addCash(amount) {
    if (typeof ctx.addCash === 'function') ctx.addCash(amount);
    else if (typeof ctx.cash === 'number') ctx.cash += amount;
  }

  function hourNow() {
    if (typeof ctx.getHour === 'function') return ctx.getHour();
    return 12;
  }

  function startFishing(spot) {
    if (state.phase !== 'idle') return { ok: false, reason: 'already-fishing' };
    const bait = BAITS.find((b) => b.id === state.baitId);
    if (cash() < bait.cost) return { ok: false, reason: 'no-bait-money' };
    addCash(-bait.cost);
    state.spent += bait.cost;
    state.activeSpot = spot;
    state.phase = 'waiting';
    state.waitTimer = 2 + rng() * 6 / biteChanceForHour(hourNow());
    state.casts += 1;
    note(`Cast ${bait.name} at ${spot.name}. Waiting for a bite…`);
    return { ok: true, spot: spot.id };
  }

  function strike() {
    if (state.phase === 'bite') {
      const species = pickSpecies(rng, state.activeSpot, hourNow(),
        BAITS.find((b) => b.id === state.baitId));
      const weightKg = rollWeight(species, rng);
      state.fish = { species, weightKg, distance: 18 + rng() * 14, tension: 0.35 };
      state.phase = 'fighting';
      note(`Hooked a ${species.name}! Reel it in — watch the tension.`);
      return { ok: true, species: species.id };
    }
    if (state.phase === 'waiting') {
      note('Too early — no bite yet. The fish spooked.');
      state.phase = 'idle';
      state.activeSpot = null;
      return { ok: false, reason: 'too-early' };
    }
    return { ok: false, reason: 'not-fishing' };
  }

  function tick(dt, input = {}) {
    if (state.phase === 'waiting') {
      state.waitTimer -= dt;
      if (state.waitTimer <= 0) {
        state.phase = 'bite';
        state.biteTimer = 0;
        state.biteWindow = 1.1 + rng() * 0.9;
        note('BITE! Strike now!');
        if (typeof ctx.onBite === 'function') ctx.onBite();
      }
      return;
    }
    if (state.phase === 'bite') {
      state.biteTimer += dt;
      if (state.biteTimer > state.biteWindow) {
        note('The fish got away — too slow.');
        state.phase = 'idle';
        state.activeSpot = null;
        state.lost += 1;
      }
      return;
    }
    if (state.phase === 'fighting' && state.fish) {
      const f = state.fish;
      // The fish pulls in bursts; reeling gains distance but adds tension.
      const pull = (0.4 + rng() * 0.8) * f.species.fight;
      state.reeling = !!input.reel;
      if (state.reeling) {
        f.distance -= dt * (2.2 + f.species.fight);
        f.tension += dt * 0.28 * f.species.fight;
      } else {
        f.tension -= dt * 0.45;
      }
      f.tension += pull * dt * 0.35;
      f.tension = Math.max(0, Math.min(1.4, f.tension));
      if (f.tension >= 1) {
        note(`Line snapped! The ${f.species.name} is gone.`);
        state.snapped += 1;
        state.phase = 'idle';
        state.fish = null;
        state.activeSpot = null;
        return;
      }
      if (f.distance <= 0) {
        const value = priceForCatch(f.species, f.weightKg, state.sold[f.species.id] || 0, hourNow());
        const caughtFish = { species: f.species.id, name: f.species.name, weightKg: +f.weightKg.toFixed(2), value };
        state.inventory.push(caughtFish);
        state.caught += 1;
        if (!state.bestCatch || f.weightKg > state.bestCatch.weightKg) state.bestCatch = caughtFish;
        note(`Caught ${f.species.name} (${f.weightKg.toFixed(1)} kg) — worth $${value}.`);
        state.phase = 'done';
        state.fish = null;
        if (typeof ctx.onCatch === 'function') ctx.onCatch(caughtFish);
      }
    }
  }

  function sellAll() {
    if (state.inventory.length === 0) return { ok: false, reason: 'empty-creel' };
    let total = 0;
    for (const fish of state.inventory) {
      total += fish.value;
      state.sold[fish.species] = (state.sold[fish.species] || 0) + 1;
    }
    const count = state.inventory.length;
    state.inventory = [];
    state.earned += total;
    addCash(total);
    note(`Sold ${count} fish at the market for $${total}.`);
    return { ok: true, count, total };
  }

  function sellOne(index) {
    const fish = state.inventory[index];
    if (!fish) return { ok: false, reason: 'no-such-fish' };
    state.inventory.splice(index, 1);
    state.sold[fish.species] = (state.sold[fish.species] || 0) + 1;
    state.earned += fish.value;
    addCash(fish.value);
    note(`Sold ${fish.name} for $${fish.value}.`);
    return { ok: true, value: fish.value };
  }

  function setBait(baitId) {
    const bait = BAITS.find((b) => b.id === baitId);
    if (!bait) return { ok: false, reason: 'unknown-bait' };
    state.baitId = baitId;
    return { ok: true, bait: baitId };
  }

  function resetSpot() {
    state.phase = 'idle';
    state.activeSpot = null;
    state.fish = null;
  }

  function hudLine() {
    if (state.phase === 'fighting' && state.fish) {
      return `FISHING ${state.fish.species.name} — tension ${Math.round(state.tension * 100)}% — ${Math.max(0, state.fish.distance).toFixed(0)}m`;
    }
    if (state.phase === 'bite') return 'FISHING: BITE! Strike now!';
    if (state.phase === 'waiting') return 'FISHING: waiting for a bite…';
    if (state.inventory.length) return `FISHING: ${state.inventory.length} fish in creel — sell at the market`;
    return '';
  }

  function serialize() {
    return JSON.parse(JSON.stringify({ ...state, activeSpot: state.activeSpot ? state.activeSpot.id : null, fish: null, phase: state.phase === 'fighting' ? 'idle' : state.phase }));
  }

  function deserialize(data) {
    if (!data || data.version !== FISHING_VERSION) return false;
    Object.assign(state, data);
    state.activeSpot = FISHING_SPOTS.find((s) => s.id === data.activeSpot) || null;
    state.phase = 'idle';
    state.fish = null;
    return true;
  }

  function stats() {
    return {
      phase: state.phase,
      casts: state.casts,
      caught: state.caught,
      lost: state.lost,
      snapped: state.snapped,
      earned: state.earned,
      spent: state.spent,
      profit: state.earned - state.spent,
      creel: state.inventory.length,
      bestCatch: state.bestCatch,
    };
  }

  return {
    name: 'fishing',
    version: FISHING_VERSION,
    state,
    spots: FISHING_SPOTS,
    baits: BAITS,
    startFishing,
    strike,
    tick,
    sellAll,
    sellOne,
    setBait,
    resetSpot,
    hudLine,
    serialize,
    deserialize,
    stats,
  };
}

export default createFishingSystem;
