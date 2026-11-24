// angling.js — Deep-Sea Angling: pier fishing, tackle shop, fish market.
// A full fishing loop distinct from the basic rod minigame: buy rods and
// bait, pick a spot and a time of day, fight the fish on the line, then sell
// the catch at the market or mount trophies. Rarity drives price; weather
// and hour drive which species bite. Pure logic, no rendering, no imports.
// Factory: createAnglingSystem(deps) with deps { rng, getHour, getDay,
// getCash, addCash, addHeat, log, getPlayerPos, getWeather }.

// ---------------------------------------------------------------------------
// Data tables
// ---------------------------------------------------------------------------

// Fish species. weight = bite rarity, basePrice = market price per kg,
// depth = preferred water, bestHours = when they bite, fight = difficulty.
export const FISH_SPECIES = [
  { id: 'sardine', name: 'Sardine', rarity: 'common', weight: 30, basePrice: 2, minKg: 0.1, maxKg: 0.4, depth: 'shallow', bestHours: [6, 7, 8, 17, 18], fight: 1, xp: 5 },
  { id: 'mackerel', name: 'Mackerel', rarity: 'common', weight: 26, basePrice: 4, minKg: 0.3, maxKg: 1.2, depth: 'shallow', bestHours: [5, 6, 7, 18, 19], fight: 1, xp: 8 },
  { id: 'anchovy', name: 'Anchovy', rarity: 'common', weight: 24, basePrice: 3, minKg: 0.1, maxKg: 0.3, depth: 'shallow', bestHours: [6, 7, 8, 9], fight: 1, xp: 5 },
  { id: 'bluegill', name: 'Bluegill', rarity: 'common', weight: 20, basePrice: 5, minKg: 0.2, maxKg: 0.8, depth: 'shallow', bestHours: [8, 9, 10, 15, 16], fight: 1, xp: 8 },
  { id: 'catfish', name: 'Catfish', rarity: 'common', weight: 18, basePrice: 6, minKg: 0.5, maxKg: 3.0, depth: 'shallow', bestHours: [19, 20, 21, 22], fight: 2, xp: 12 },
  { id: 'red-snapper', name: 'Red Snapper', rarity: 'uncommon', weight: 14, basePrice: 12, minKg: 0.5, maxKg: 2.5, depth: 'mid', bestHours: [7, 8, 9, 16, 17], fight: 2, xp: 18 },
  { id: 'sea-bass', name: 'Sea Bass', rarity: 'uncommon', weight: 12, basePrice: 14, minKg: 0.8, maxKg: 4.0, depth: 'mid', bestHours: [6, 7, 17, 18, 19], fight: 2, xp: 20 },
  { id: 'flounder', name: 'Flounder', rarity: 'uncommon', weight: 10, basePrice: 11, minKg: 0.4, maxKg: 2.0, depth: 'mid', bestHours: [9, 10, 11, 14, 15], fight: 2, xp: 16 },
  { id: 'squid', name: 'Squid', rarity: 'uncommon', weight: 9, basePrice: 16, minKg: 0.3, maxKg: 1.5, depth: 'mid', bestHours: [20, 21, 22, 23], fight: 3, xp: 22 },
  { id: 'tuna', name: 'Yellowfin Tuna', rarity: 'rare', weight: 7, basePrice: 35, minKg: 5, maxKg: 40, depth: 'deep', bestHours: [5, 6, 7, 17, 18], fight: 4, xp: 40 },
  { id: 'marlin', name: 'Blue Marlin', rarity: 'rare', weight: 5, basePrice: 60, minKg: 20, maxKg: 120, depth: 'deep', bestHours: [6, 7, 8], fight: 5, xp: 60 },
  { id: 'swordfish', name: 'Swordfish', rarity: 'rare', weight: 4, basePrice: 55, minKg: 15, maxKg: 90, depth: 'deep', bestHours: [18, 19, 20], fight: 5, xp: 55 },
  { id: 'mahi', name: 'Mahi-Mahi', rarity: 'rare', weight: 5, basePrice: 40, minKg: 3, maxKg: 18, depth: 'deep', bestHours: [9, 10, 11, 15, 16], fight: 4, xp: 45 },
  { id: 'grouper', name: 'Goliath Grouper', rarity: 'epic', weight: 3, basePrice: 90, minKg: 10, maxKg: 80, depth: 'deep', bestHours: [7, 8, 16, 17], fight: 5, xp: 80 },
  { id: 'sailfish', name: 'Sailfish', rarity: 'epic', weight: 2, basePrice: 120, minKg: 8, maxKg: 45, depth: 'deep', bestHours: [6, 7], fight: 5, xp: 100 },
  { id: 'golden-koi', name: 'Golden Koi', rarity: 'legendary', weight: 1, basePrice: 500, minKg: 1, maxKg: 3, depth: 'shallow', bestHours: [12], fight: 3, xp: 200 },
  { id: 'ghost-eel', name: 'Ghost Eel', rarity: 'legendary', weight: 1, basePrice: 750, minKg: 2, maxKg: 6, depth: 'deep', bestHours: [0, 1, 2, 3], fight: 5, xp: 250 },
  { id: 'kraken-calf', name: 'Kraken Calf', rarity: 'mythic', weight: 1, basePrice: 5000, minKg: 50, maxKg: 200, depth: 'deep', bestHours: [0], fight: 6, xp: 500 },
];

export const RARITY_MULT = { common: 1, uncommon: 1.6, rare: 2.8, epic: 5, legendary: 12, mythic: 40 };

// Fishing spots around the map. depth gates species, crowd affects bite rate.
export const FISHING_SPOTS = [
  { id: 'pier-south', name: 'South Pier', depth: 'shallow', crowd: 3, fee: 0, bonus: 0, desc: 'The free public pier. Crowded but reliable.' },
  { id: 'pier-north', name: 'North Pier', depth: 'shallow', crowd: 1, fee: 0, bonus: 0.1, desc: 'Quieter pier, slightly better bites.' },
  { id: 'marina', name: 'Marina Dock', depth: 'mid', crowd: 2, fee: 20, bonus: 0.15, desc: 'Pay the dock fee, fish the deeper channel.' },
  { id: 'rocky-point', name: 'Rocky Point', depth: 'mid', crowd: 1, fee: 0, bonus: 0.2, desc: 'Rocky shore, strong current, strong fish.' },
  { id: 'deep-charter', name: 'Deep Charter Boat', depth: 'deep', crowd: 0, fee: 300, bonus: 0.5, desc: 'Charter out to the deep water. Big fish only.' },
  { id: 'lagoon', name: 'Hidden Lagoon', depth: 'shallow', crowd: 0, fee: 0, bonus: 0.35, desc: 'A secret lagoon. Rumour says a golden koi lives here.' },
];

// Rods: longer cast, stronger line, better fight control.
export const RODS = [
  { id: 'stick', name: 'Bamboo Stick', price: 0, castBonus: 0, lineStrength: 5, fightBonus: 0, desc: 'A stick and some string. It works, barely.' },
  { id: 'basic', name: 'Basic Rod', price: 50, castBonus: 0.1, lineStrength: 12, fightBonus: 0.1, desc: 'A real rod. A real reel. A real start.' },
  { id: 'carbon', name: 'Carbon Pro', price: 300, castBonus: 0.25, lineStrength: 30, fightBonus: 0.25, desc: 'Light, stiff, and hard to snap.' },
  { id: 'tournament', name: 'Tournament Elite', price: 1200, castBonus: 0.4, lineStrength: 60, fightBonus: 0.45, desc: 'The rod the pros use on TV.' },
  { id: 'titan', name: 'Titan Deep-Sea', price: 5000, castBonus: 0.6, lineStrength: 150, fightBonus: 0.7, desc: 'Built for marlin. Built for monsters.' },
];

// Bait: each species has a favourite; matching bait doubles the bite rate.
export const BAITS = [
  { id: 'bread', name: 'Bread Crumbs', price: 2, favours: ['sardine', 'anchovy', 'bluegill'], desc: 'Cheap and cheerful.' },
  { id: 'worm', name: 'Worms', price: 5, favours: ['catfish', 'bluegill', 'flounder'], desc: 'The classic all-rounder.' },
  { id: 'shrimp', name: 'Shrimp', price: 12, favours: ['red-snapper', 'sea-bass', 'squid'], desc: 'Saltwater favourite.' },
  { id: 'squid-bait', name: 'Squid Strips', price: 25, favours: ['tuna', 'grouper', 'swordfish'], desc: 'Big bait for big fish.' },
  { id: 'lure', name: 'Shiny Lure', price: 40, favours: ['marlin', 'sailfish', 'mahi'], desc: 'Flashy. Predators cannot resist.' },
  { id: 'glow', name: 'Glow Bait', price: 80, favours: ['ghost-eel', 'squid', 'kraken-calf'], desc: 'Glows in the dark. Night fish love it.' },
  { id: 'golden', name: 'Golden Corn', price: 150, favours: ['golden-koi'], desc: 'For the one fish that matters.' },
];

// Angler ranks: XP from catches unlocks spots, rods and tournaments.
export const ANGLER_RANKS = [
  { id: 'novice', name: 'Novice', xpNeeded: 0, perk: 'Can fish the piers.' },
  { id: 'hobbyist', name: 'Hobbyist', xpNeeded: 100, perk: 'Marina access unlocked.' },
  { id: 'angler', name: 'Angler', xpNeeded: 300, perk: 'Rocky Point access unlocked.' },
  { id: 'pro', name: 'Pro Angler', xpNeeded: 800, perk: 'Deep charter unlocked, +10% sell price.' },
  { id: 'master', name: 'Master Angler', xpNeeded: 2000, perk: '+20% sell price, tournament entry.' },
  { id: 'legend', name: 'Legend of the Sea', xpNeeded: 5000, perk: '+35% sell price, golden koi odds up.' },
];

// Weekly fishing tournaments: biggest single fish wins.
export const TOURNAMENTS = [
  { id: 'pier-cup', name: 'Pier Cup', dayOfWeek: 6, entryFee: 50, prize: 1000, species: null, minRank: 'novice', desc: 'Biggest fish off any pier wins.' },
  { id: 'tuna-run', name: 'Tuna Run', dayOfWeek: 3, entryFee: 200, prize: 5000, species: 'tuna', minRank: 'pro', desc: 'Biggest yellowfin tuna takes the pot.' },
  { id: 'marlin-masters', name: 'Marlin Masters', dayOfWeek: 0, entryFee: 500, prize: 20000, species: 'marlin', minRank: 'master', desc: 'The big one. Biggest marlin wins $20,000.' },
];

// Angling missions.
export const ANGLING_MISSIONS = [
  { id: 'first-catch', name: 'First Catch', desc: 'Catch any fish.', reward: 50 },
  { id: 'ten-fish', name: 'Ten Fish', desc: 'Catch 10 fish in total.', reward: 150 },
  { id: 'rare-one', name: 'Rare One', desc: 'Catch a rare fish or better.', reward: 400 },
  { id: 'epic-one', name: 'Epic Catch', desc: 'Catch an epic fish.', reward: 1000 },
  { id: 'legendary-one', name: 'Legendary Catch', desc: 'Catch a legendary fish.', reward: 5000 },
  { id: 'collection-8', name: 'Collector', desc: 'Catch 8 different species.', reward: 800 },
  { id: 'collection-all', name: 'Full Collection', desc: 'Catch every species at least once.', reward: 20000 },
  { id: 'sell-1000', name: 'Fishmonger', desc: 'Earn $1,000 total from selling fish.', reward: 500 },
  { id: 'sell-10000', name: 'Fish Baron', desc: 'Earn $10,000 total from selling fish.', reward: 3000 },
  { id: 'tournament-win', name: 'Tournament Champion', desc: 'Win any fishing tournament.', reward: 2000 },
];

// Market price modifiers by time of day (fresh catch sells best at dawn).
export const MARKET_HOUR_MULT = [
  1.0, 1.0, 1.0, 1.0, 1.0, 1.1, 1.25, 1.2, 1.1, 1.0, 1.0, 1.0,
  1.0, 1.0, 1.0, 1.0, 1.05, 1.15, 1.1, 1.0, 1.0, 1.0, 1.0, 1.0,
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clampNum(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

function pickWeighted(rng, items) {
  let total = 0;
  for (const it of items) total += it.weight;
  let roll = rng() * total;
  for (const it of items) {
    roll -= it.weight;
    if (roll <= 0) return it;
  }
  return items[items.length - 1];
}

export function fishPrice(species, kg, hour, rankMult) {
  const hourMult = MARKET_HOUR_MULT[Math.floor(hour) % 24] || 1;
  const rarityMult = RARITY_MULT[species.rarity] || 1;
  return Math.max(1, Math.round(species.basePrice * kg * rarityMult * hourMult * rankMult));
}

export function speciesForSpot(spot, hour) {
  const h = Math.floor(hour) % 24;
  return FISH_SPECIES.filter((s) => {
    if (s.depth === 'shallow' && spot.depth !== 'shallow') return false;
    if (s.depth === 'mid' && spot.depth === 'shallow') return false;
    if (s.depth === 'deep' && spot.depth !== 'deep') return false;
    return true;
  }).map((s) => ({
    ...s,
    weight: s.weight * (s.bestHours.includes(h) ? 2.5 : 0.6),
  }));
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createAnglingSystem(deps) {
  const d = deps || {};
  const rng = d.rng || Math.random;
  const getHour = d.getHour || (() => 12);
  const getDay = d.getDay || (() => 1);
  const getCash = d.getCash || (() => 0);
  const addCash = d.addCash || (() => {});
  const log = d.log || (() => {});
  const getWeather = d.getWeather || (() => 'clear');

  const state = {
    xp: 0,
    rank: 'novice',
    rodId: 'stick',
    rodsOwned: ['stick'],
    baitStock: { bread: 10 },
    tackle: 0,
    currentSpot: null,
    casting: false,
    biteTimer: 0,
    biteActive: false,
    fight: null,
    cooler: [],
    collection: {},
    biggestCatch: null,
    totalCaught: 0,
    totalSold: 0,
    totalEarned: 0,
    tournamentsEntered: {},
    tournamentBest: {},
    missionsDone: {},
    recentCatches: [],
    day: 1,
    castsToday: 0,
    lineSnaps: 0,
    perfectFights: 0,
  };

  function rank() {
    return ANGLER_RANKS.find((r) => r.id === state.rank) || ANGLER_RANKS[0];
  }

  function rankSellMult() {
    if (state.rank === 'legend') return 1.35;
    if (state.rank === 'master') return 1.2;
    if (state.rank === 'pro') return 1.1;
    return 1;
  }

  function refreshRank() {
    let best = ANGLER_RANKS[0];
    for (const r of ANGLER_RANKS) {
      if (state.xp >= r.xpNeeded) best = r;
    }
    if (best.id !== state.rank) {
      state.rank = best.id;
      log(`Angler rank up: ${best.name}! ${best.perk}`);
    }
  }

  function rod() {
    return RODS.find((r) => r.id === state.rodId) || RODS[0];
  }

  function spotUnlocked(spot) {
    if (spot.id === 'marina') return ['hobbyist', 'angler', 'pro', 'master', 'legend'].includes(state.rank);
    if (spot.id === 'rocky-point') return ['angler', 'pro', 'master', 'legend'].includes(state.rank);
    if (spot.id === 'deep-charter') return ['pro', 'master', 'legend'].includes(state.rank);
    return true;
  }

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const m = ANGLING_MISSIONS.find((x) => x.id === id);
    if (!m) return;
    let done = false;
    switch (id) {
      case 'first-catch': done = state.totalCaught >= 1; break;
      case 'ten-fish': done = state.totalCaught >= 10; break;
      case 'rare-one': done = Object.keys(state.collection).some((k) => ['rare', 'epic', 'legendary', 'mythic'].includes((FISH_SPECIES.find((s) => s.id === k) || {}).rarity)); break;
      case 'epic-one': done = Object.keys(state.collection).some((k) => ['epic', 'legendary', 'mythic'].includes((FISH_SPECIES.find((s) => s.id === k) || {}).rarity)); break;
      case 'legendary-one': done = Object.keys(state.collection).some((k) => ['legendary', 'mythic'].includes((FISH_SPECIES.find((s) => s.id === k) || {}).rarity)); break;
      case 'collection-8': done = Object.keys(state.collection).length >= 8; break;
      case 'collection-all': done = Object.keys(state.collection).length >= FISH_SPECIES.length; break;
      case 'sell-1000': done = state.totalEarned >= 1000; break;
      case 'sell-10000': done = state.totalEarned >= 10000; break;
      case 'tournament-win': done = (state.missionProgressWin || 0) >= 1; break;
      default: done = false;
    }
    if (!done) return;
    state.missionsDone[id] = true;
    addCash(m.reward);
    log(`Angling mission complete: ${m.name} (+$${m.reward}).`);
  }

  function buyRod(rodId) {
    const r = RODS.find((x) => x.id === rodId);
    if (!r) return { ok: false, error: 'unknown rod' };
    if (state.rodsOwned.includes(rodId)) {
      state.rodId = rodId;
      return { ok: true, equipped: rodId, chips: null };
    }
    if (getCash() < r.price) return { ok: false, error: 'not enough cash' };
    addCash(-r.price);
    state.rodsOwned.push(rodId);
    state.rodId = rodId;
    log(`Bought rod: ${r.name} ($${r.price}).`);
    return { ok: true, rod: r };
  }

  function buyBait(baitId, qty) {
    const b = BAITS.find((x) => x.id === baitId);
    if (!b) return { ok: false, error: 'unknown bait' };
    const n = clampNum(Math.floor(qty) || 1, 1, 99);
    const cost = b.price * n;
    if (getCash() < cost) return { ok: false, error: 'not enough cash' };
    addCash(-cost);
    state.baitStock[baitId] = (state.baitStock[baitId] || 0) + n;
    return { ok: true, bait: b, qty: n, stock: state.baitStock[baitId] };
  }

  function goToSpot(spotId) {
    const spot = FISHING_SPOTS.find((s) => s.id === spotId);
    if (!spot) return { ok: false, error: 'unknown spot' };
    if (!spotUnlocked(spot)) return { ok: false, error: `needs higher angler rank (${spot.id})` };
    if (spot.fee > 0) {
      if (getCash() < spot.fee) return { ok: false, error: 'not enough cash for the fee' };
      addCash(-spot.fee);
    }
    state.currentSpot = spotId;
    state.casting = false;
    state.biteActive = false;
    state.fight = null;
    log(`At ${spot.name}. ${spot.desc}`);
    return { ok: true, spot };
  }

  function cast(baitId) {
    if (!state.currentSpot) return { ok: false, error: 'go to a fishing spot first' };
    if (state.casting || state.fight) return { ok: false, error: 'already fishing' };
    const bait = BAITS.find((b) => b.id === baitId);
    if (!bait) return { ok: false, error: 'unknown bait' };
    if ((state.baitStock[baitId] || 0) <= 0) return { ok: false, error: 'no bait of that type' };
    state.baitStock[baitId]--;
    state.casting = true;
    state.castsToday++;
    const spot = FISHING_SPOTS.find((s) => s.id === state.currentSpot);
    const weather = getWeather();
    const baseWait = 4 + rng() * 8;
    const crowdSlow = spot.crowd * 1.5;
    const weatherMod = weather === 'rain' ? 0.7 : weather === 'storm' ? 0.5 : 1;
    state.biteTimer = (baseWait + crowdSlow) * weatherMod * (1 - spot.bonus * 0.5);
    state.pendingBait = baitId;
    return { ok: true, wait: state.biteTimer, bait: bait.name };
  }

  function rollBite() {
    const spot = FISHING_SPOTS.find((s) => s.id === state.currentSpot);
    const hour = getHour();
    const pool = speciesForSpot(spot, hour);
    const bait = BAITS.find((b) => b.id === state.pendingBait);
    const weighted = pool.map((s) => {
      let w = s.weight;
      if (bait && bait.favours.includes(s.id)) w *= 2;
      if (state.rank === 'legend' && s.rarity === 'legendary') w *= 1.5;
      if (getWeather() === 'rain' && s.id === 'catfish') w *= 2;
      return { ...s, weight: w };
    });
    const species = pickWeighted(rng, weighted);
    const kg = species.minKg + rng() * (species.maxKg - species.minKg);
    const r = rod();
    const fightPower = species.fight * (1 + kg / species.maxKg);
    state.fight = {
      speciesId: species.id,
      name: species.name,
      rarity: species.rarity,
      kg: Math.round(kg * 100) / 100,
      power: fightPower,
      line: 100,
      tension: 50,
      progress: 0,
      rodBreakAt: r.lineStrength,
      reeling: false,
      pulls: 0,
      perfects: 0,
      elapsed: 0,
    };
    state.biteActive = true;
    state.casting = false;
    log(`BITE! Something is on the line...`);
    return state.fight;
  }

  function fightTick(dt, input) {
    const f = state.fight;
    if (!f) return { ok: false, error: 'no fish on the line' };
    f.elapsed += dt;
    const r = rod();
    const reel = input && input.reel;
    const slack = input && input.slack;
    // The fish pulls in bursts; reeling while it pulls spikes tension.
    const pulling = Math.sin(f.elapsed * 2.1 + f.pulls) > 0.2;
    if (pulling) {
      f.pulls++;
      f.tension += (6 + f.power * 2) * dt * 2;
      if (reel) f.tension += 10 * dt * 2;
    } else {
      f.tension -= 8 * dt;
      if (reel) {
        f.progress += (14 + r.fightBonus * 20) * dt;
        f.perfects += 1;
      }
    }
    if (slack) f.tension -= 14 * dt;
    f.tension = clampNum(f.tension, 0, 100);
    // Line strain: tension near max wears the line; over max it snaps.
    if (f.tension > 92) f.line -= (f.tension - 92) * 3 * dt;
    if (f.tension > 98 || f.line <= 0) {
      state.lineSnaps++;
      const lost = { ...f };
      state.fight = null;
      state.biteActive = false;
      log(`Line snapped! The ${lost.name} got away.`);
      return { ok: true, event: 'snapped', fish: lost };
    }
    if (f.progress >= 100) {
      return landFish(f);
    }
    // Fish tires over time; big fish take longer.
    if (f.elapsed > 25 + f.power * 8) {
      f.tension -= 2 * dt;
    }
    return { ok: true, event: 'fighting', fight: { ...f, pulling } };
  }

  function landFish(f) {
    const species = FISH_SPECIES.find((s) => s.id === f.speciesId);
    const perfect = f.perfects >= 10 && state.lineSnaps === 0;
    const catchEntry = {
      speciesId: species.id,
      name: species.name,
      rarity: species.rarity,
      kg: f.kg,
      value: fishPrice(species, f.kg, getHour(), rankSellMult()),
      day: getDay(),
      perfect,
    };
    state.cooler.push(catchEntry);
    state.totalCaught++;
    state.xp += species.xp;
    state.collection[species.id] = (state.collection[species.id] || 0) + 1;
    if (perfect) state.perfectFights++;
    if (!state.biggestCatch || f.kg > state.biggestCatch.kg) {
      state.biggestCatch = { ...catchEntry };
    }
    state.recentCatches.unshift(`${species.name} ${f.kg}kg (${species.rarity})`);
    if (state.recentCatches.length > 10) state.recentCatches.pop();
    // Tournament scoring: biggest fish of the target species today.
    for (const t of TOURNAMENTS) {
      if (state.tournamentsEntered[t.id] && (!t.species || t.species === species.id)) {
        const prev = state.tournamentBest[t.id] || 0;
        if (f.kg > prev) state.tournamentBest[t.id] = f.kg;
      }
    }
    state.fight = null;
    state.biteActive = false;
    refreshRank();
    checkMission('first-catch');
    checkMission('ten-fish');
    checkMission('rare-one');
    checkMission('epic-one');
    checkMission('legendary-one');
    checkMission('collection-8');
    checkMission('collection-all');
    log(`Caught ${species.name} — ${f.kg}kg (${species.rarity})! Worth ~$${catchEntry.value}.`);
    return { ok: true, event: 'caught', catch: catchEntry, xp: species.xp };
  }

  function giveUpFight() {
    if (!state.fight) return { ok: false, error: 'no fish on the line' };
    const f = state.fight;
    state.fight = null;
    state.biteActive = false;
    log(`Let the ${f.name} go.`);
    return { ok: true, released: f.name };
  }

  function sellCatch(index) {
    if (index === 'all') {
      let total = 0;
      let count = state.cooler.length;
      for (const c of state.cooler) total += c.value;
      state.cooler = [];
      state.totalSold += count;
      state.totalEarned += total;
      addCash(total);
      checkMission('sell-1000');
      checkMission('sell-10000');
      log(`Sold ${count} fish for $${total}.`);
      return { ok: true, sold: count, earned: total };
    }
    const i = Math.floor(index);
    if (i < 0 || i >= state.cooler.length) return { ok: false, error: 'no such fish in cooler' };
    const c = state.cooler.splice(i, 1)[0];
    state.totalSold++;
    state.totalEarned += c.value;
    addCash(c.value);
    checkMission('sell-1000');
    checkMission('sell-10000');
    log(`Sold ${c.name} ${c.kg}kg for $${c.value}.`);
    return { ok: true, sold: 1, earned: c.value, fish: c };
  }

  function mountTrophy(index) {
    const i = Math.floor(index);
    if (i < 0 || i >= state.cooler.length) return { ok: false, error: 'no such fish in cooler' };
    const c = state.cooler[i];
    if (c.rarity === 'common') return { ok: false, error: 'only uncommon or better can be mounted' };
    state.cooler.splice(i, 1);
    state.trophies = state.trophies || [];
    state.trophies.push({ ...c, mountedDay: getDay() });
    state.xp += 25;
    refreshRank();
    log(`Mounted ${c.name} (${c.kg}kg) as a trophy. +25 XP.`);
    return { ok: true, trophy: c };
  }

  function enterTournament(tournamentId) {
    const t = TOURNAMENTS.find((x) => x.id === tournamentId);
    if (!t) return { ok: false, error: 'unknown tournament' };
    const rankOrder = ANGLER_RANKS.map((r) => r.id);
    if (rankOrder.indexOf(state.rank) < rankOrder.indexOf(t.minRank)) {
      return { ok: false, error: `needs rank ${t.minRank}` };
    }
    const day = getDay();
    if (state.tournamentsEntered[tournamentId] === day) return { ok: false, error: 'already entered today' };
    if (getCash() < t.entryFee) return { ok: false, error: 'not enough cash for entry' };
    addCash(-t.entryFee);
    state.tournamentsEntered[tournamentId] = day;
    state.tournamentBest[tournamentId] = 0;
    log(`Entered ${t.name} ($${t.entryFee}). Biggest fish wins $${t.prize}.`);
    return { ok: true, tournament: t };
  }

  function settleTournament(tournamentId) {
    const t = TOURNAMENTS.find((x) => x.id === tournamentId);
    if (!t) return { ok: false, error: 'unknown tournament' };
    const best = state.tournamentBest[tournamentId] || 0;
    if (!state.tournamentsEntered[tournamentId]) return { ok: false, error: 'not entered' };
    // Rival anglers' best catches: random 60-110% of a typical big fish.
    const rivalBest = (t.species
      ? (FISH_SPECIES.find((s) => s.id === t.species) || { maxKg: 10 }).maxKg * (0.35 + rng() * 0.4)
      : 8 + rng() * 14);
    const won = best > 0 && best >= rivalBest;
    delete state.tournamentsEntered[tournamentId];
    delete state.tournamentBest[tournamentId];
    if (won) {
      addCash(t.prize);
      state.missionProgressWin = (state.missionProgressWin || 0) + 1;
      checkMission('tournament-win');
      log(`Won ${t.name} with a ${best.toFixed(1)}kg fish! Prize $${t.prize}.`);
      return { ok: true, won: true, best, rivalBest, prize: t.prize };
    }
    log(`${t.name}: your best ${best.toFixed(1)}kg lost to ${rivalBest.toFixed(1)}kg.`);
    return { ok: true, won: false, best, rivalBest, prize: 0 };
  }

  function collectionLog() {
    return FISH_SPECIES.map((s) => ({
      ...s,
      caught: state.collection[s.id] || 0,
    }));
  }

  function missions() {
    return ANGLING_MISSIONS.map((m) => ({ ...m, done: !!state.missionsDone[m.id] }));
  }

  function tick(dt) {
    const day = getDay();
    if (day !== state.day) {
      state.day = day;
      state.castsToday = 0;
      // Tournaments settle at day rollover if still entered.
      for (const t of TOURNAMENTS) {
        if (state.tournamentsEntered[t.id]) settleTournament(t.id);
      }
    }
    if (state.casting && !state.fight) {
      state.biteTimer -= dt;
      if (state.biteTimer <= 0) {
        state.casting = false;
        rollBite();
      }
    }
    // A bite waits up to 6 seconds before the fish steals the bait.
    if (state.biteActive && state.fight) {
      state.fight.waitLeft = (state.fight.waitLeft === undefined ? 6 : state.fight.waitLeft) - dt;
      if (state.fight.waitLeft <= 0) {
        log(`Too slow — the ${state.fight.name} stole the bait.`);
        state.fight = null;
        state.biteActive = false;
      }
    }
  }

  function hudLine() {
    if (state.totalCaught === 0 && state.cooler.length === 0) return '';
    const spot = state.currentSpot ? (FISHING_SPOTS.find((s) => s.id === state.currentSpot) || {}).name : '—';
    const fighting = state.fight ? ` | Fighting ${state.fight.name} ${Math.floor(state.fight.progress)}%` : state.casting ? ' | Waiting for a bite…' : '';
    return `Angling ${rank().name} | ${spot} | cooler ${state.cooler.length} fish${fighting}`;
  }

  function summary() {
    return {
      rank: state.rank,
      xp: state.xp,
      rod: state.rodId,
      totalCaught: state.totalCaught,
      totalSold: state.totalSold,
      totalEarned: state.totalEarned,
      cooler: state.cooler.length,
      speciesCaught: Object.keys(state.collection).length,
      biggestCatch: state.biggestCatch,
      trophies: (state.trophies || []).length,
      missionsDone: Object.keys(state.missionsDone).length,
      recentCatches: [...state.recentCatches],
    };
  }

  function serialize() {
    return {
      xp: state.xp,
      rank: state.rank,
      rodId: state.rodId,
      rodsOwned: [...state.rodsOwned],
      baitStock: { ...state.baitStock },
      cooler: state.cooler.map((c) => ({ ...c })),
      collection: { ...state.collection },
      biggestCatch: state.biggestCatch ? { ...state.biggestCatch } : null,
      totalCaught: state.totalCaught,
      totalSold: state.totalSold,
      totalEarned: state.totalEarned,
      trophies: (state.trophies || []).map((t) => ({ ...t })),
      missionsDone: { ...state.missionsDone },
      lineSnaps: state.lineSnaps,
      perfectFights: state.perfectFights,
    };
  }

  function deserialize(s) {
    if (!s || typeof s !== 'object') return;
    if (typeof s.xp === 'number') state.xp = s.xp;
    if (typeof s.rank === 'string') state.rank = s.rank;
    if (typeof s.rodId === 'string') state.rodId = s.rodId;
    if (Array.isArray(s.rodsOwned)) state.rodsOwned = [...s.rodsOwned];
    if (s.baitStock) state.baitStock = { ...s.baitStock };
    if (Array.isArray(s.cooler)) state.cooler = s.cooler.map((c) => ({ ...c }));
    if (s.collection) state.collection = { ...s.collection };
    if (s.biggestCatch) state.biggestCatch = { ...s.biggestCatch };
    for (const k of ['totalCaught', 'totalSold', 'totalEarned', 'lineSnaps', 'perfectFights']) {
      if (typeof s[k] === 'number') state[k] = s[k];
    }
    if (Array.isArray(s.trophies)) state.trophies = s.trophies.map((t) => ({ ...t }));
    if (s.missionsDone) state.missionsDone = { ...s.missionsDone };
  }

  return {
    state,
    buyRod,
    buyBait,
    goToSpot,
    cast,
    fightTick,
    giveUpFight,
    sellCatch,
    mountTrophy,
    enterTournament,
    settleTournament,
    collectionLog,
    missions,
    tick,
    hudLine,
    summary,
    serialize,
    deserialize,
  };
}


// ---------------------------------------------------------------------------
// Part 3 — Weather tables, bait craft, angler logbook, tackle extras
// ---------------------------------------------------------------------------

// Weather effects on fishing: bite rate and species behaviour.
export const ANGLING_WEATHER = [
  { weather: 'clear', biteMult: 1.0, note: 'Clear skies. Normal fishing.' },
  { weather: 'clouds', biteMult: 1.1, note: 'Overcast — fish feel safe near the surface.' },
  { weather: 'rain', biteMult: 1.4, note: 'Rain washes food into the water. Great fishing.' },
  { weather: 'storm', biteMult: 0.6, note: 'Storm — dangerous, but the big ones feed.' },
  { weather: 'fog', biteMult: 0.9, note: 'Foggy and quiet. Fish are cautious.' },
];

// Bait crafting: combine cheap bait into better bait.
export const BAIT_RECIPES = [
  { id: 'dough', name: 'Dough Ball', needs: { bread: 3 }, result: 'bread', qty: 1, desc: 'Kneaded bread. Holds on the hook longer.' },
  { id: 'worm-shrimp', name: 'Worm-Shrimp Combo', needs: { worm: 1, shrimp: 1 }, result: 'shrimp', qty: 2, desc: 'Two baits on one hook. Double the scent.' },
  { id: 'glow-worm', name: 'Glow Worm', needs: { worm: 2, glow: 1 }, result: 'glow', qty: 2, desc: 'A worm that glows. Night fish cannot resist.' },
  { id: 'golden-lure', name: 'Golden Lure', needs: { lure: 1, golden: 1 }, result: 'golden', qty: 2, desc: 'Shiny and golden. For the koi.' },
];

// Tackle extras: consumables and upgrades for the tackle box.
export const TACKLE_EXTRAS = [
  { id: 'line-spool', name: 'Line Spool', price: 30, desc: 'Fresh line. Fewer snaps.' },
  { id: 'hook-set', name: 'Hook Set', price: 25, desc: 'Sharp hooks. Better hookups.' },
  { id: 'bobber', name: 'Bobber Set', price: 15, desc: 'See the bite sooner.' },
  { id: 'net', name: 'Landing Net', price: 80, desc: 'Land big fish without losing them at the edge.' },
  { id: 'cooler-upgrade', name: 'Big Cooler', price: 150, desc: 'Holds 20 fish instead of 10.' },
  { id: 'chair', name: 'Fishing Chair', price: 60, desc: 'Comfort. Patience. More bites.' },
  { id: 'tackle-box', name: 'Tackle Box', price: 120, desc: 'Organised bait, faster swaps.' },
  { id: 'sonar', name: 'Fish Sonar', price: 400, desc: 'Shows where the fish are. Almost cheating.' },
];

// Angler logbook entries: lore for each species.
export const FISH_LORE = [
  { species: 'sardine', note: 'Schools of thousands. The sea is made of sardines.' },
  { species: 'mackerel', note: 'Fast, shiny, and always hungry at dawn.' },
  { species: 'catfish', note: 'Lives in the dark water. Tastes like the river.' },
  { species: 'red-snapper', note: 'The reef fish every restaurant wants.' },
  { species: 'tuna', note: 'A torpedo with fins. Fights like a truck.' },
  { species: 'marlin', note: 'The king. Jumps clear out of the water.' },
  { species: 'swordfish', note: 'A sword for a nose and a temper to match.' },
  { species: 'grouper', note: 'Sits on the bottom and inhales whatever passes.' },
  { species: 'sailfish', note: 'The fastest fish in the sea. Good luck.' },
  { species: 'golden-koi', note: 'One fish, one lagoon, one legend.' },
  { species: 'ghost-eel', note: 'Seen only at 3 AM. Glows faintly.' },
  { species: 'kraken-calf', note: 'If the calf is this big, do not meet the mother.' },
];

// Moon phases and their effect on night fishing.
export const MOON_PHASES = [
  { phase: 'new', biteMult: 0.9, note: 'Dark nights. Fish feed by feel.' },
  { phase: 'crescent', biteMult: 1.0, note: 'A sliver of moon. Normal night fishing.' },
  { phase: 'half', biteMult: 1.1, note: 'Half moon. Good night bites.' },
  { phase: 'gibbous', biteMult: 1.2, note: 'Bright nights. Predators hunt.' },
  { phase: 'full', biteMult: 1.4, note: 'Full moon. The best night fishing of the month.' },
];

// Fishing records board (flavour + targets).
export const FISHING_RECORDS = [
  { species: 'tuna', recordKg: 42, holder: 'Old Salty', note: 'Caught off the charter boat, 1989.' },
  { species: 'marlin', recordKg: 118, holder: 'Captain Rosa', note: 'Took six hours to land.' },
  { species: 'catfish', recordKg: 8.5, holder: 'Kid with a stick', note: 'Nobody believed him until the photo.' },
  { species: 'golden-koi', recordKg: 2.8, holder: 'Unknown', note: 'The photo is blurry. The fish is real.' },
  { species: 'sailfish', recordKg: 44, holder: 'Marina Mike', note: 'Jumped seven times before the net.' },
];

// Pure helpers.

export function moonPhaseFor(day) {
  return MOON_PHASES[(day - 1) % MOON_PHASES.length];
}

export function biteChance(spot, bait, hour, weather) {
  const w = ANGLING_WEATHER.find((x) => x.weather === weather) || ANGLING_WEATHER[0];
  const hourBonus = spot && hour >= 5 && hour <= 8 ? 1.3 : hour >= 17 && hour <= 19 ? 1.2 : 1;
  return Math.round(w.biteMult * hourBonus * 100) / 100;
}

export function bestBaitFor(speciesId) {
  const bait = BAITS.find((b) => b.favours.includes(speciesId));
  return bait || BAITS[0];
}

export function bestSpotFor(speciesId) {
  const species = FISH_SPECIES.find((s) => s.id === speciesId);
  if (!species) return FISHING_SPOTS[0];
  if (species.depth === 'deep') return FISHING_SPOTS.find((s) => s.id === 'deep-charter');
  if (species.depth === 'mid') return FISHING_SPOTS.find((s) => s.id === 'rocky-point');
  return FISHING_SPOTS.find((s) => s.id === 'pier-north');
}

export function bestHourFor(speciesId) {
  const species = FISH_SPECIES.find((s) => s.id === speciesId);
  return species ? species.bestHours[0] : 7;
}

export function isRecordCatch(speciesId, kg) {
  const rec = FISHING_RECORDS.find((r) => r.species === speciesId);
  return rec ? kg > rec.recordKg : kg > 50;
}

export function coolerValue(cooler) {
  return cooler.reduce((sum, c) => sum + c.value, 0);
}

export function collectionProgress(collection) {
  const caught = Object.keys(collection).filter((k) => FISH_SPECIES.some((s) => s.id === k)).length;
  return { caught, total: FISH_SPECIES.length, pct: Math.round((caught / FISH_SPECIES.length) * 100) };
}

export function rankProgress(xp) {
  let current = ANGLER_RANKS[0];
  let next = null;
  for (let i = 0; i < ANGLER_RANKS.length; i++) {
    if (xp >= ANGLER_RANKS[i].xpNeeded) current = ANGLER_RANKS[i];
    else { next = ANGLER_RANKS[i]; break; }
  }
  return { current, next, toNext: next ? next.xpNeeded - xp : 0 };
}

export function fightDifficulty(species, kg, rod) {
  const base = species.fight * (1 + kg / species.maxKg);
  return Math.round(base * (1 - rod.fightBonus) * 10) / 10;
}

export function sellPriceBreakdown(cooler, hour, rankMult) {
  return cooler.map((c) => {
    const species = FISH_SPECIES.find((s) => s.id === c.speciesId);
    return { name: c.name, kg: c.kg, value: species ? fishPrice(species, c.kg, hour, rankMult) : c.value };
  });
}

export function tournamentStandings(playerBest, rivalCount, rng) {
  const rivals = [];
  for (let i = 0; i < rivalCount; i++) rivals.push(Math.round((5 + rng() * 20) * 10) / 10);
  const all = [...rivals, playerBest].sort((a, b) => b - a);
  return { place: all.indexOf(playerBest) + 1, rivals };
}

export function baitStockValue(baitStock) {
  let total = 0;
  for (const [id, qty] of Object.entries(baitStock)) {
    const b = BAITS.find((x) => x.id === id);
    if (b) total += b.price * qty;
  }
  return total;
}

export function rodRecommendation(targetSpeciesId, cash) {
  const species = FISH_SPECIES.find((s) => s.id === targetSpeciesId);
  if (!species) return RODS[0];
  const need = species.fight * 10;
  const affordable = RODS.filter((r) => r.lineStrength >= need && r.price <= cash);
  if (affordable.length > 0) return affordable[0];
  return RODS.filter((r) => r.lineStrength >= need)[0] || RODS[RODS.length - 1];
}


// ---------------------------------------------------------------------------
// Part 4 — Fishing seasons, bait shop, angler achievements
// ---------------------------------------------------------------------------

// Fishing seasons: what is biting each season.
export const FISHING_SEASONS = [
  { season: 'spring', months: [3, 4, 5], note: 'Fish spawn in the shallows. Great for beginners.', bonus: ['sardine', 'bluegill', 'catfish'] },
  { season: 'summer', months: [6, 7, 8], note: 'Warm water, hungry fish, crowded piers.', bonus: ['mackerel', 'sea-bass', 'mahi'] },
  { season: 'autumn', months: [9, 10, 11], note: 'Tuna run. The big fish come close to shore.', bonus: ['tuna', 'red-snapper', 'flounder'] },
  { season: 'winter', months: [12, 1, 2], note: 'Cold water, slow fish, but the marlin still run.', bonus: ['marlin', 'swordfish', 'squid'] },
];

// Bait shop weekly specials.
export const BAIT_SPECIALS = [
  { bait: 'worm', discount: 0.5, day: 1, note: 'Monday: worms half price.' },
  { bait: 'shrimp', discount: 0.3, day: 3, note: 'Wednesday: shrimp 30% off.' },
  { bait: 'lure', discount: 0.25, day: 5, note: 'Friday: lures 25% off.' },
  { bait: 'glow', discount: 0.4, day: 6, note: 'Saturday: glow bait 40% off for night fishing.' },
];

// Angler achievements (beyond missions).
export const ANGLER_ACHIEVEMENTS = [
  { id: 'dawn-catch', name: 'Dawn Catch', desc: 'Catch a fish before 6 AM.' },
  { id: 'midnight-catch', name: 'Midnight Catch', desc: 'Catch a fish after midnight.' },
  { id: 'rain-catch', name: 'Rain Catch', desc: 'Catch a fish in the rain.' },
  { id: 'storm-catch', name: 'Storm Catch', desc: 'Catch a fish in a storm.' },
  { id: 'biggest-tuna', name: 'Biggest Tuna', desc: 'Catch a tuna over 30kg.' },
  { id: 'five-species-day', name: 'Five Species Day', desc: 'Catch 5 species in one day.' },
  { id: 'no-snap-day', name: 'No Snap Day', desc: 'Fish all day without a line snap.' },
  { id: 'trophy-wall', name: 'Trophy Wall', desc: 'Mount 5 trophies.' },
  { id: 'deep-sea-first', name: 'Deep Sea First', desc: 'First catch from the charter boat.' },
  { id: 'golden-hour', name: 'Golden Hour', desc: 'Catch the golden koi.' },
];

// Old angler sayings.
export const ANGLER_SAYINGS = [
  'The fish are always biting somewhere. Find where.',
  'A bad day fishing beats a good day working.',
  'The best bait is the one the fish want today, not yesterday.',
  'Patience is the hook. The fish does the rest.',
  'If the line goes slack, reel fast. If it goes tight, let it run.',
  'The one that got away is always the biggest.',
];

// Pure helpers.

export function seasonFor(month) {
  const m = ((month - 1) % 12) + 1;
  return FISHING_SEASONS.find((s) => s.months.includes(m)) || FISHING_SEASONS[0];
}

export function seasonBonusFor(speciesId, month) {
  const s = seasonFor(month);
  return s.bonus.includes(speciesId) ? 1.5 : 1;
}

export function baitSpecialFor(baitId, dayOfWeek) {
  return BAIT_SPECIALS.find((x) => x.bait === baitId && x.day === dayOfWeek) || null;
}

export function baitPriceWithSpecial(baitId, dayOfWeek) {
  const b = BAITS.find((x) => x.id === baitId);
  if (!b) return 0;
  const sp = baitSpecialFor(baitId, dayOfWeek);
  return sp ? Math.round(b.price * (1 - sp.discount)) : b.price;
}

export function achievementList() {
  return ANGLER_ACHIEVEMENTS.map((a) => ({ ...a }));
}

export function totalTackleValue(rodsOwned, baitStock) {
  let total = 0;
  for (const id of rodsOwned) {
    const r = RODS.find((x) => x.id === id);
    if (r) total += r.price;
  }
  total += baitStockValue(baitStock);
  return total;
}

export function catchRateFor(species, spot, hour, weather, bait) {
  const pool = speciesForSpot(spot, hour);
  const entry = pool.find((s) => s.id === species.id);
  if (!entry) return 0;
  const w = ANGLING_WEATHER.find((x) => x.weather === weather) || ANGLING_WEATHER[0];
  const baitMult = bait && bait.favours.includes(species.id) ? 2 : 1;
  return Math.round(entry.weight * w.biteMult * baitMult * 10) / 10;
}


// ---------------------------------------------------------------------------
// Part 5 — Fishing knots, tide table, old angler records
// ---------------------------------------------------------------------------

export const FISHING_KNOTS = [
  { name: 'Clinch Knot', strength: 0.9, desc: 'The standard knot. Learn it first.' },
  { name: 'Palomar Knot', strength: 0.95, desc: 'Strong and simple. The best all-rounder.' },
  { name: 'Blood Knot', strength: 0.85, desc: 'Joins two lines together.' },
  { name: 'Loop Knot', strength: 0.8, desc: 'Lets the lure move freely.' },
  { name: 'Snell Knot', strength: 0.92, desc: 'For hooks that need to sit straight.' },
];

export const TIDE_TABLE = [
  { tide: 'high', biteMult: 1.2, note: 'High tide pushes fish close to shore.' },
  { tide: 'low', biteMult: 0.9, note: 'Low tide. Fish move deeper.' },
  { tide: 'rising', biteMult: 1.3, note: 'Rising tide. The best fishing.' },
  { tide: 'falling', biteMult: 1.0, note: 'Falling tide. Fish feed on the move.' },
];

export const OLD_ANGLER_RECORDS = [
  { angler: 'Old Salty', fish: 'Marlin 118kg', year: 1989 },
  { angler: 'Captain Rosa', fish: 'Tuna 42kg', year: 1995 },
  { angler: 'Marina Mike', fish: 'Sailfish 44kg', year: 2001 },
  { angler: 'Kid with a stick', fish: 'Catfish 8.5kg', year: 2010 },
];

export function knotStrength(knotName) {
  const k = FISHING_KNOTS.find((x) => x.name === knotName);
  return k ? k.strength : 0.8;
}

export function tideBiteMult(tide) {
  const t = TIDE_TABLE.find((x) => x.tide === tide);
  return t ? t.biteMult : 1;
}

export function bestKnot() {
  let best = FISHING_KNOTS[0];
  for (const k of FISHING_KNOTS) if (k.strength > best.strength) best = k;
  return best;
}


// ---------------------------------------------------------------------------
// Part 6 — Fishing boat names, angler superstitions
// ---------------------------------------------------------------------------

export const FISHING_BOAT_NAMES = [
  'The Lucky Catch',
  'Reel Deal',
  'Fishy Business',
  'The Old Salty',
  'Hook Line Sinker',
  'Gone Fishing',
];

export const ANGLER_SUPERSTITIONS = [
  'Never say "good luck" before a cast. Say "tight lines".',
  'A banana on the boat is bad luck. Everybody knows it.',
  'The first cast of the day decides the day.',
  'Never whistle on a boat. The fish hear it.',
];

export function randomBoatName(rng) {
  return FISHING_BOAT_NAMES[Math.floor(rng() * FISHING_BOAT_NAMES.length)];
}

export function superstitionFor(index) {
  return ANGLER_SUPERSTITIONS[index % ANGLER_SUPERSTITIONS.length];
}


// ---------------------------------------------------------------------------
// Part 7 — Lucky lures, fishing proverbs
// ---------------------------------------------------------------------------

export const LUCKY_LURES = ['Gold Spoon', 'Red Devil', 'Silver Minnow', 'Blue Fox'];
export const FISHING_PROVERBS = [
  'Give a man a fish, feed him for a day. Teach him to fish, feed him forever.',
  'The charm of fishing is that it is the pursuit of what is elusive.',
  'Many men go fishing all their lives without knowing it is not fish they are after.',
  'A reel scream is the best sound in the world.',
];

export function isLuckyLure(name) {
  return LUCKY_LURES.includes(name);
}

export function proverbFishing(index) {
  return FISHING_PROVERBS[index % FISHING_PROVERBS.length];
}
