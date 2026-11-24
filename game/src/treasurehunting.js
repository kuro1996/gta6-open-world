// treasurehunting.js — Treasure Hunting: maps, metal detectors, digging.
// Buy old maps, follow the clues to a dig site, sweep with the metal
// detector until the signal peaks, then dig. Finds range from bottle caps
// to pirate gold; rare finds go to the museum or the black market. The
// deeper the site and the older the map, the richer the haul — and the
// more rivals show up to steal it. Pure logic, no rendering, no imports.
// Factory: createTreasureHuntingSystem(deps) with deps { rng, getHour,
// getDay, getCash, addCash, addHeat, log, getPlayerPos }.

// ---------------------------------------------------------------------------
// Data tables
// ---------------------------------------------------------------------------

// Dig sites: region, depth tier, danger, base find quality.
export const DIG_SITES = [
  { id: 'beach-north', name: 'North Beach', tier: 1, danger: 0, fee: 0, desc: 'Tourists lose jewellery here every summer.' },
  { id: 'beach-south', name: 'South Beach', tier: 1, danger: 0, fee: 0, desc: 'Quiet sand, steady small finds.' },
  { id: 'park', name: 'Central Park', tier: 1, danger: 0, fee: 0, desc: 'Old park, old coins under the benches.' },
  { id: 'riverbank', name: 'Riverbank', tier: 2, danger: 1, fee: 0, desc: 'The river gives up what it takes.' },
  { id: 'old-battlefield', name: 'Old Battlefield', tier: 2, danger: 1, fee: 0, desc: 'Musket balls, buttons, and the odd sword.' },
  { id: 'ghost-town', name: 'Ghost Town', tier: 2, danger: 2, fee: 50, desc: 'A mining town that died in 1910.' },
  { id: 'shipwreck-shore', name: 'Shipwreck Shore', tier: 3, danger: 2, fee: 100, desc: 'Storms throw wreckage onto this beach.' },
  { id: 'jungle-ruins', name: 'Jungle Ruins', tier: 3, danger: 3, fee: 200, desc: 'Vines, snakes, and a temple nobody maps.' },
  { id: 'desert-dunes', name: 'Desert Dunes', tier: 3, danger: 2, fee: 150, desc: 'The sand hides a buried caravan.' },
  { id: 'sunken-cove', name: 'Sunken Cove', tier: 4, danger: 3, fee: 400, desc: 'Dive the cove at low tide for wreck gold.' },
  { id: 'volcano', name: 'Volcano Rim', tier: 4, danger: 4, fee: 500, desc: 'Obsidian and gold where the lava cooled.' },
  { id: 'pirate-isle', name: 'Pirate Isle', tier: 5, danger: 5, fee: 1000, desc: 'X marks the spot. So does the rival crew.' },
];

// Treasure maps: each points at a site tier and hides a specific haul.
export const TREASURE_MAPS = [
  { id: 'map-beach', name: 'Torn Beach Map', price: 25, tier: 1, clue: 'Where the tide kisses the third palm.', desc: 'A map drawn on a napkin.' },
  { id: 'map-park', name: 'Park Bench Map', price: 40, tier: 1, clue: 'Under the bench where the lovers carved initials.', desc: 'Found in a second-hand book.' },
  { id: 'map-river', name: 'River Chart', price: 80, tier: 2, clue: 'Where the river bends like an elbow.', desc: 'Ink on waterproof cloth.' },
  { id: 'map-battle', name: 'Battlefield Sketch', price: 120, tier: 2, clue: 'Ten paces from the fallen oak, north.', desc: 'A soldier drew this in 1863.' },
  { id: 'map-ghost', name: 'Ghost Town Deed', price: 200, tier: 2, clue: 'Beneath the floorboards of the old assay office.', desc: 'A deed with a map on the back.' },
  { id: 'map-wreck', name: 'Wreck Manifest', price: 350, tier: 3, clue: 'The manifest lists a chest that never reached port.', desc: 'Salvaged from a captain log.' },
  { id: 'map-jungle', name: 'Jungle Rubbing', price: 500, tier: 3, clue: 'The temple door opens when the sun hits the idol.', desc: 'A stone rubbing, half translated.' },
  { id: 'map-desert', name: 'Caravan Ledger', price: 450, tier: 3, clue: 'The caravan buried its gold before the storm.', desc: 'A ledger with a route and a cross.' },
  { id: 'map-cove', name: 'Diver Logbook', price: 800, tier: 4, clue: 'Low tide reveals the iron ring in the rock.', desc: 'A diver who never came back wrote this.' },
  { id: 'map-volcano', name: 'Volcano Survey', price: 900, tier: 4, clue: 'Gold cools slowest where the lava ran thickest.', desc: 'A survey nobody believed.' },
  { id: 'map-pirate', name: 'Pirate Captain Map', price: 2000, tier: 5, clue: 'X marks the spot. The parrot knows the rest.', desc: 'The real thing. Signed by Blackbeard.' },
  { id: 'map-crypt', name: 'Crypt Diagram', price: 1500, tier: 5, clue: 'The crypt keeper counts the steps. You should too.', desc: 'Drawn on human skin. Do not ask.' },
];

// Metal detectors: depth, discrimination (junk filtering), sweep speed.
export const DETECTORS = [
  { id: 'toy', name: 'Toy Detector', price: 0, depth: 1, discrimination: 0, sweep: 1, desc: 'Beeps at everything, including your belt.' },
  { id: 'hobby', name: 'Hobby Detector', price: 150, depth: 2, discrimination: 1, sweep: 1.2, desc: 'A real detector for weekend hunters.' },
  { id: 'pro', name: 'Pro Detector', price: 600, depth: 3, discrimination: 2, sweep: 1.5, desc: 'Pinpoints depth and metal type.' },
  { id: 'military', name: 'Military Grade', price: 2000, depth: 4, discrimination: 3, sweep: 2, desc: 'Finds a coin at a metre. Finds gold deeper.' },
  { id: 'ground-pen', name: 'Ground Radar', price: 6000, depth: 5, discrimination: 4, sweep: 2.5, desc: 'Sees through the earth itself.' },
];

// Shovels: dig speed and depth per dig.
export const SHOVELS = [
  { id: 'hands', name: 'Bare Hands', price: 0, digPower: 1, desc: 'Slow, dirty, free.' },
  { id: 'trowel', name: 'Garden Trowel', price: 30, digPower: 2, desc: 'For careful, small holes.' },
  { id: 'shovel', name: 'Steel Shovel', price: 120, digPower: 4, desc: 'The standard digger.' },
  { id: 'pickaxe', name: 'Pickaxe', price: 300, digPower: 7, desc: 'Breaks rock, not just soil.' },
  { id: 'excavator', name: 'Mini Excavator', price: 5000, digPower: 15, desc: 'A digger that digs like a machine. Because it is.' },
];

// Possible finds, grouped by tier. weight = how often, value = base price.
export const FIND_TABLE = [
  { id: 'bottle-cap', name: 'Bottle Cap', tier: 1, weight: 30, value: 1, kind: 'junk', desc: 'A bottle cap. The classic.' },
  { id: 'nail', name: 'Rusty Nail', tier: 1, weight: 25, value: 1, kind: 'junk', desc: 'Older than the park.' },
  { id: 'pull-tab', name: 'Pull Tab', tier: 1, weight: 20, value: 2, kind: 'junk', desc: 'Somebody opened a drink here in 1982.' },
  { id: 'coin-modern', name: 'Modern Coin', tier: 1, weight: 22, value: 5, kind: 'coin', desc: 'A coin from this decade.' },
  { id: 'ring-silver', name: 'Silver Ring', tier: 1, weight: 8, value: 60, kind: 'jewellery', desc: 'Somebody lost this on the beach.' },
  { id: 'coin-1900', name: '1900s Coin', tier: 2, weight: 18, value: 25, kind: 'coin', desc: 'A coin from a century ago.' },
  { id: 'button-brass', name: 'Brass Button', tier: 2, weight: 16, value: 15, kind: 'relic', desc: 'A uniform button, probably military.' },
  { id: 'musket-ball', name: 'Musket Ball', tier: 2, weight: 14, value: 20, kind: 'relic', desc: 'Fired in anger, found in peace.' },
  { id: 'pocket-watch', name: 'Pocket Watch', tier: 2, weight: 6, value: 150, kind: 'relic', desc: 'Still ticks, if you shake it right.' },
  { id: 'coin-gold', name: 'Gold Coin', tier: 2, weight: 4, value: 300, kind: 'coin', desc: 'Real gold. Real money.' },
  { id: 'sword', name: 'Cavalry Sword', tier: 2, weight: 2, value: 500, kind: 'relic', desc: 'Rusty, but the blade remembers.' },
  { id: 'necklace-gold', name: 'Gold Necklace', tier: 3, weight: 6, value: 400, kind: 'jewellery', desc: 'A necklace from a wrecked ship.' },
  { id: 'doubloon', name: 'Spanish Doubloon', tier: 3, weight: 5, value: 800, kind: 'coin', desc: 'Pirate gold, stamped 1715.' },
  { id: 'idol-jade', name: 'Jade Idol', tier: 3, weight: 3, value: 1500, kind: 'artifact', desc: 'A small god from a lost temple.' },
  { id: 'chest-small', name: 'Small Treasure Chest', tier: 3, weight: 2, value: 2500, kind: 'chest', desc: 'Locked. Heavy. Full of something.' },
  { id: 'crown-jewel', name: 'Crown Jewel', tier: 4, weight: 3, value: 5000, kind: 'jewellery', desc: 'A jewel fit for a crown.' },
  { id: 'aztec-gold', name: 'Aztec Gold Mask', tier: 4, weight: 2, value: 8000, kind: 'artifact', desc: 'A mask of beaten gold.' },
  { id: 'chest-large', name: 'Large Treasure Chest', tier: 4, weight: 2, value: 12000, kind: 'chest', desc: 'Two hundred kilos of history.' },
  { id: 'pirate-hoard', name: 'Pirate Hoard', tier: 5, weight: 2, value: 30000, kind: 'chest', desc: 'The whole haul. The legend is real.' },
  { id: 'lost-crown', name: 'The Lost Crown', tier: 5, weight: 1, value: 100000, kind: 'artifact', desc: 'A crown missing for four hundred years.' },
];

// Museum vs black market: museums pay more for artifacts, the market pays
// more for gold and never asks questions.
export const BUYERS = [
  { id: 'museum', name: 'City Museum', coin: 1.0, relic: 1.5, artifact: 2.0, jewellery: 1.1, chest: 1.2, junk: 0.5, desc: 'Pays double for artifacts. Loves paperwork.' },
  { id: 'blackmarket', name: 'Black Market', coin: 1.3, relic: 0.9, artifact: 0.8, jewellery: 1.4, chest: 1.5, junk: 0.2, desc: 'Pays more for gold, no questions asked. Adds heat.' },
  { id: 'collector', name: 'Private Collector', coin: 1.2, relic: 1.3, artifact: 1.6, jewellery: 1.3, chest: 1.1, junk: 0.1, desc: 'Pays well for rare pieces, if you know him.' },
  { id: 'scrap', name: 'Scrap Dealer', coin: 0.8, relic: 0.7, artifact: 0.5, jewellery: 0.9, chest: 0.8, junk: 1.0, desc: 'Buys junk by weight. Honest, at least.' },
];

// Rival hunters who can steal a dig or race you to a site.
export const RIVALS = [
  { id: 'digger-dan', name: 'Digger Dan', skill: 1, aggression: 1, desc: 'A friendly rival who waves when he beats you.' },
  { id: 'gold-digger-gwen', name: 'Gwen the Gold Digger', skill: 2, aggression: 2, desc: 'Fast, loud, and always one site ahead.' },
  { id: 'professor', name: 'The Professor', skill: 3, aggression: 1, desc: 'Knows every map by heart. Slow but thorough.' },
  { id: 'blackjack-crew', name: 'Blackjack Crew', skill: 3, aggression: 4, desc: 'A crew that digs with guns on their hips.' },
  { id: 'lone-wolf', name: 'Lone Wolf', skill: 4, aggression: 3, desc: 'Nobody knows his name. Everybody knows his finds.' },
];

// Hunter ranks.
export const TREASURE_RANKS = [
  { id: 'hobbyist', name: 'Hobbyist', xpNeeded: 0, perk: 'Tier 1-2 sites.' },
  { id: 'digger', name: 'Digger', xpNeeded: 150, perk: 'Tier 3 sites, +5% value.' },
  { id: 'hunter', name: 'Treasure Hunter', xpNeeded: 500, perk: 'Tier 4 sites, +10% value.' },
  { id: 'legend', name: 'Legend Hunter', xpNeeded: 1500, perk: 'Tier 5 sites, +20% value.' },
  { id: 'master', name: 'Master of the Hunt', xpNeeded: 4000, perk: '+35% value, rivals fear you.' },
];

// Treasure missions.
export const TREASURE_MISSIONS = [
  { id: 'first-find', name: 'First Find', desc: 'Dig up anything at all.', reward: 50 },
  { id: 'first-gold', name: 'Gold!', desc: 'Find a gold coin or better.', reward: 300 },
  { id: 'first-chest', name: 'Chest Opener', desc: 'Dig up a treasure chest.', reward: 1000 },
  { id: 'artifact-one', name: 'Artifact Hunter', desc: 'Find an artifact.', reward: 1500 },
  { id: 'ten-finds', name: 'Ten Finds', desc: 'Dig up 10 finds.', reward: 400 },
  { id: 'fifty-finds', name: 'Fifty Finds', desc: 'Dig up 50 finds.', reward: 2000 },
  { id: 'museum-donor', name: 'Museum Donor', desc: 'Sell 5 artifacts to the museum.', reward: 1200 },
  { id: 'rival-beaten', name: 'Rival Beaten', desc: 'Beat a rival to a dig site.', reward: 800 },
  { id: 'lost-crown', name: 'The Lost Crown', desc: 'Find the Lost Crown.', reward: 10000 },
  { id: 'earn-20000', name: 'Treasure Baron', desc: 'Earn $20,000 from treasure sales.', reward: 5000 },
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

export function findValue(find, buyer, rankMult) {
  const b = BUYERS.find((x) => x.id === buyer) || BUYERS[0];
  const mult = b[find.kind] || 1;
  return Math.max(1, Math.round(find.value * mult * rankMult));
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createTreasureHuntingSystem(deps) {
  const d = deps || {};
  const rng = d.rng || Math.random;
  const getHour = d.getHour || (() => 12);
  const getDay = d.getDay || (() => 1);
  const getCash = d.getCash || (() => 0);
  const addCash = d.addCash || (() => {});
  const addHeat = d.addHeat || (() => {});
  const log = d.log || (() => {});
  const getPlayerPos = d.getPlayerPos || (() => ({ x: 0, z: 0 }));

  const state = {
    xp: 0,
    rank: 'hobbyist',
    detectorId: 'toy',
    detectorsOwned: ['toy'],
    shovelId: 'hands',
    shovelsOwned: ['hands'],
    mapsOwned: [],
    activeMap: null,
    currentSite: null,
    sweep: null,
    dig: null,
    inventory: [],
    museumDonations: 0,
    totalFinds: 0,
    totalEarned: 0,
    totalSold: 0,
    rivalsBeaten: 0,
    rivalsLost: 0,
    missionsDone: {},
    day: 1,
    digsToday: 0,
    bestFind: null,
    collection: {},
    sitesVisited: {},
  };

  function rank() {
    return TREASURE_RANKS.find((r) => r.id === state.rank) || TREASURE_RANKS[0];
  }

  function valueMult() {
    if (state.rank === 'master') return 1.35;
    if (state.rank === 'legend') return 1.2;
    if (state.rank === 'hunter') return 1.1;
    if (state.rank === 'digger') return 1.05;
    return 1;
  }

  function detector() {
    return DETECTORS.find((x) => x.id === state.detectorId) || DETECTORS[0];
  }

  function shovel() {
    return SHOVELS.find((x) => x.id === state.shovelId) || SHOVELS[0];
  }

  function refreshRank() {
    let best = TREASURE_RANKS[0];
    for (const r of TREASURE_RANKS) if (state.xp >= r.xpNeeded) best = r;
    if (best.id !== state.rank) {
      state.rank = best.id;
      log(`Treasure rank up: ${best.name}! ${best.perk}`);
    }
  }

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const m = TREASURE_MISSIONS.find((x) => x.id === id);
    if (!m) return;
    let done = false;
    switch (id) {
      case 'first-find': done = state.totalFinds >= 1; break;
      case 'first-gold': done = state.inventory.some((f) => f.id === 'coin-gold') || (state.bestFind && state.bestFind.value >= 300); break;
      case 'first-chest': done = state.collection.chest >= 1; break;
      case 'artifact-one': done = (state.collection.artifact || 0) >= 1; break;
      case 'ten-finds': done = state.totalFinds >= 10; break;
      case 'fifty-finds': done = state.totalFinds >= 50; break;
      case 'museum-donor': done = state.museumDonations >= 5; break;
      case 'rival-beaten': done = state.rivalsBeaten >= 1; break;
      case 'lost-crown': done = (state.collection['lost-crown'] || 0) >= 1; break;
      case 'earn-20000': done = state.totalEarned >= 20000; break;
      default: done = false;
    }
    if (!done) return;
    state.missionsDone[id] = true;
    addCash(m.reward);
    log(`Treasure mission complete: ${m.name} (+$${m.reward}).`);
  }

  function buyDetector(detectorId) {
    const det = DETECTORS.find((x) => x.id === detectorId);
    if (!det) return { ok: false, error: 'unknown detector' };
    if (state.detectorsOwned.includes(detectorId)) {
      state.detectorId = detectorId;
      return { ok: true, equipped: detectorId };
    }
    if (getCash() < det.price) return { ok: false, error: 'not enough cash' };
    addCash(-det.price);
    state.detectorsOwned.push(detectorId);
    state.detectorId = detectorId;
    log(`Bought ${det.name} ($${det.price}). Depth ${det.depth}, discrimination ${det.discrimination}.`);
    return { ok: true, detector: det };
  }

  function buyShovel(shovelId) {
    const s = SHOVELS.find((x) => x.id === shovelId);
    if (!s) return { ok: false, error: 'unknown shovel' };
    if (state.shovelsOwned.includes(shovelId)) {
      state.shovelId = shovelId;
      return { ok: true, equipped: shovelId };
    }
    if (getCash() < s.price) return { ok: false, error: 'not enough cash' };
    addCash(-s.price);
    state.shovelsOwned.push(shovelId);
    state.shovelId = shovelId;
    log(`Bought ${s.name} ($${s.price}). Dig power ${s.digPower}.`);
    return { ok: true, shovel: s };
  }

  function buyMap(mapId) {
    const m = TREASURE_MAPS.find((x) => x.id === mapId);
    if (!m) return { ok: false, error: 'unknown map' };
    if (state.mapsOwned.includes(mapId)) return { ok: false, error: 'already own that map' };
    const rankIdx = TREASURE_RANKS.findIndex((r) => r.id === state.rank);
    const maxTier = rankIdx === 0 ? 2 : rankIdx === 1 ? 3 : rankIdx === 2 ? 4 : 5;
    if (m.tier > maxTier) return { ok: false, error: `needs higher rank (tier ${m.tier} map)` };
    if (getCash() < m.price) return { ok: false, error: 'not enough cash' };
    addCash(-m.price);
    state.mapsOwned.push(mapId);
    log(`Bought map: ${m.name} ($${m.price}). Clue: "${m.clue}"`);
    return { ok: true, map: m };
  }

  function useMap(mapId) {
    if (!state.mapsOwned.includes(mapId)) return { ok: false, error: 'you do not own that map' };
    const m = TREASURE_MAPS.find((x) => x.id === mapId);
    const sites = DIG_SITES.filter((s) => s.tier === m.tier || s.tier === m.tier + 1);
    const site = sites[Math.floor(rng() * sites.length)];
    state.activeMap = { mapId: m.id, siteId: site.id, clue: m.clue, tier: m.tier };
    log(`Map studied: ${m.name} points to ${site.name}. "${m.clue}"`);
    return { ok: true, map: state.activeMap, site };
  }

  function goToSite(siteId) {
    const site = DIG_SITES.find((s) => s.id === siteId);
    if (!site) return { ok: false, error: 'unknown site' };
    const rankIdx = TREASURE_RANKS.findIndex((r) => r.id === state.rank);
    const maxTier = rankIdx === 0 ? 2 : rankIdx === 1 ? 3 : rankIdx === 2 ? 4 : 5;
    if (site.tier > maxTier) return { ok: false, error: `needs higher rank (tier ${site.tier} site)` };
    if (site.fee > 0) {
      if (getCash() < site.fee) return { ok: false, error: 'not enough cash for the site fee' };
      addCash(-site.fee);
    }
    state.currentSite = siteId;
    state.sweep = null;
    state.dig = null;
    state.sitesVisited[siteId] = (state.sitesVisited[siteId] || 0) + 1;
    // A rival may already be here.
    const rivalHere = site.tier >= 3 && rng() < 0.35;
    if (rivalHere) {
      const rival = RIVALS[Math.floor(rng() * RIVALS.length)];
      state.rivalAtSite = rival;
      log(`${rival.name} is already digging here! Beat them to the good spot.`);
    } else {
      state.rivalAtSite = null;
    }
    log(`At ${site.name}. ${site.desc}`);
    return { ok: true, site, rival: state.rivalAtSite };
  }

  function startSweep() {
    if (!state.currentSite) return { ok: false, error: 'go to a dig site first' };
    if (state.sweep) return { ok: false, error: 'already sweeping' };
    const site = DIG_SITES.find((s) => s.id === state.currentSite);
    const det = detector();
    // The find is hidden at a random grid point; sweep narrows it down.
    const target = {
      x: Math.floor(rng() * 10),
      y: Math.floor(rng() * 10),
      depth: 1 + Math.floor(rng() * det.depth),
    };
    state.sweep = {
      siteId: site.id,
      target,
      signal: 0,
      sweeps: 0,
      found: false,
      grid: Array.from({ length: 10 }, () => Array(10).fill(0)),
    };
    log(`Sweeping ${site.name} with the ${det.name}. Watch the signal.`);
    return { ok: true, sweep: { signal: 0, sweeps: 0 } };
  }

  function sweepAt(x, y) {
    const s = state.sweep;
    if (!s) return { ok: false, error: 'start sweeping first' };
    const det = detector();
    const gx = clampNum(Math.floor(x), 0, 9);
    const gy = clampNum(Math.floor(y), 0, 9);
    const d = Math.abs(gx - s.target.x) + Math.abs(gy - s.target.y);
    const signal = clampNum(100 - d * 12, 0, 100);
    s.grid[gy][gx] = signal;
    s.sweeps++;
    s.signal = Math.max(s.signal, signal);
    s.lastX = gx;
    s.lastY = gy;
    let hint = 'Cold. Nothing here.';
    if (signal >= 90) hint = 'RED HOT! Dig here!';
    else if (signal >= 70) hint = 'Very strong signal — close!';
    else if (signal >= 45) hint = 'A clear signal. Getting warmer.';
    else if (signal >= 20) hint = 'A faint beep. Something is near.';
    // Discrimination: good detectors ignore junk signals.
    if (det.discrimination >= 2 && signal < 45 && rng() < 0.3) {
      hint = 'Junk signal filtered out by discrimination.';
    }
    if (signal >= 88) s.found = true;
    return { ok: true, x: gx, y: gy, signal, hint, sweeps: s.sweeps, found: s.found };
  }

  function startDig() {
    const s = state.sweep;
    if (!s || !s.found) return { ok: false, error: 'find the signal peak first (sweep until 88+)' };
    if (state.dig) return { ok: false, error: 'already digging' };
    const site = DIG_SITES.find((x) => x.id === state.currentSite);
    const depthNeeded = s.target.depth * 10;
    state.dig = {
      depthNeeded,
      depthDug: 0,
      siteTier: site.tier,
      target: { ...s.target },
      hits: 0,
    };
    log(`Digging at the signal peak. ${depthNeeded}cm to the find.`);
    return { ok: true, dig: { depthNeeded, depthDug: 0 } };
  }

  function digOnce() {
    const dg = state.dig;
    if (!dg) return { ok: false, error: 'start digging first' };
    const sh = shovel();
    dg.depthDug += sh.digPower;
    dg.hits++;
    state.digsToday++;
    // Danger: deep sites can collapse or bite.
    const site = DIG_SITES.find((x) => x.id === state.currentSite);
    if (site.danger >= 3 && rng() < 0.08) {
      dg.depthDug = Math.max(0, dg.depthDug - 5);
      log('The hole partially collapsed! Lost 5cm of progress.');
      return { ok: true, depthDug: dg.depthDug, depthNeeded: dg.depthNeeded, event: 'collapse' };
    }
    if (dg.depthDug >= dg.depthNeeded) {
      return resolveFind(dg);
    }
    return { ok: true, depthDug: dg.depthDug, depthNeeded: dg.depthNeeded, event: 'digging' };
  }

  function resolveFind(dg) {
    const site = DIG_SITES.find((x) => x.id === state.currentSite);
    const mapBonus = state.activeMap && state.activeMap.siteId === site.id ? 1.5 : 1;
    const pool = FIND_TABLE.filter((f) => f.tier <= site.tier + 1).map((f) => ({
      ...f,
      weight: f.weight * (f.tier === site.tier ? 1.5 : 1) * (f.tier <= site.tier ? 1 : 0.4),
    }));
    const find = pickWeighted(rng, pool);
    const quality = 0.8 + rng() * 0.5;
    const value = Math.round(find.value * quality * mapBonus);
    const entry = {
      ...find,
      value,
      quality: Math.round(quality * 100) / 100,
      siteId: site.id,
      day: getDay(),
    };
    state.inventory.push(entry);
    state.totalFinds++;
    state.collection[find.id] = (state.collection[find.id] || 0) + 1;
    state.collection[find.kind] = (state.collection[find.kind] || 0) + 1;
    const xpGain = find.kind === 'junk' ? 5 : find.kind === 'coin' ? 10 : find.kind === 'relic' ? 20 : find.kind === 'jewellery' ? 25 : find.kind === 'artifact' ? 50 : 80;
    state.xp += xpGain;
    if (!state.bestFind || value > state.bestFind.value) state.bestFind = { ...entry };
    // Rival race: if a rival is here, they may grab the find first.
    if (state.rivalAtSite) {
      const rival = state.rivalAtSite;
      const rivalRoll = rng() * (rival.skill + 1);
      const myRoll = rng() * (TREASURE_RANKS.findIndex((r) => r.id === state.rank) + 2);
      if (rivalRoll > myRoll && find.kind !== 'junk') {
        state.rivalsLost++;
        state.inventory.pop();
        state.totalFinds--;
        log(`${rival.name} snatched the ${find.name} right out of your hole!`);
        state.dig = null;
        state.sweep = null;
        return { ok: true, event: 'stolen', rival: rival.name, find };
      }
      state.rivalsBeaten++;
      log(`You beat ${rival.name} to the ${find.name}!`);
      state.rivalAtSite = null;
      checkMission('rival-beaten');
    }
    state.dig = null;
    state.sweep = null;
    refreshRank();
    checkMission('first-find');
    checkMission('first-gold');
    checkMission('first-chest');
    checkMission('artifact-one');
    checkMission('ten-finds');
    checkMission('fifty-finds');
    checkMission('lost-crown');
    log(`Found ${find.name} (${find.kind}) — worth ~$${value}. ${find.desc}`);
    return { ok: true, event: 'found', find: entry, xp: xpGain };
  }

  function sellFind(index, buyerId) {
    const i = Math.floor(index);
    if (i < 0 || i >= state.inventory.length) return { ok: false, error: 'no such find' };
    const buyer = BUYERS.find((b) => b.id === buyerId);
    if (!buyer) return { ok: false, error: 'unknown buyer' };
    const find = state.inventory.splice(i, 1)[0];
    const price = findValue(find, buyerId, valueMult());
    addCash(price);
    state.totalSold++;
    state.totalEarned += price;
    if (buyerId === 'museum' && find.kind === 'artifact') state.museumDonations++;
    if (buyerId === 'blackmarket') addHeat(1);
    log(`Sold ${find.name} to ${buyer.name} for $${price}.`);
    checkMission('museum-donor');
    checkMission('earn-20000');
    return { ok: true, find, price, buyer: buyer.name };
  }

  function sellAllJunk(buyerId) {
    const buyer = BUYERS.find((b) => b.id === buyerId) || BUYERS[0];
    const junk = state.inventory.filter((f) => f.kind === 'junk');
    if (junk.length === 0) return { ok: false, error: 'no junk to sell' };
    let total = 0;
    for (const f of junk) total += findValue(f, buyer.id, valueMult());
    state.inventory = state.inventory.filter((f) => f.kind !== 'junk');
    addCash(total);
    state.totalSold += junk.length;
    state.totalEarned += total;
    log(`Sold ${junk.length} junk finds to ${buyer.name} for $${total}.`);
    checkMission('earn-20000');
    return { ok: true, sold: junk.length, earned: total };
  }

  function appraise(index) {
    if (typeof index !== 'number' || !Number.isFinite(index)) return { ok: false, error: 'no such find' };
    const i = Math.floor(index);
    if (i < 0 || i >= state.inventory.length) return { ok: false, error: 'no such find' };
    const find = state.inventory[i];
    const prices = BUYERS.map((b) => ({ buyer: b.name, price: findValue(find, b.id, valueMult()) }));
    prices.sort((a, b) => b.price - a.price);
    return { ok: true, find, prices, best: prices[0] };
  }

  function missions() {
    return TREASURE_MISSIONS.map((m) => ({ ...m, done: !!state.missionsDone[m.id] }));
  }

  function tick(dt) {
    const day = getDay();
    if (day !== state.day) {
      state.day = day;
      state.digsToday = 0;
      state.activeMap = null;
    }
    // Night digging is riskier: rivals and danger rise after dark.
    const hour = getHour();
    if ((hour >= 22 || hour < 4) && state.currentSite && !state.sweep && rng() < dt * 0.02) {
      log('You hear footsteps in the dark. Somebody else is hunting tonight.');
    }
  }

  function hudLine() {
    if (state.totalFinds === 0 && !state.currentSite) return '';
    const site = state.currentSite ? (DIG_SITES.find((s) => s.id === state.currentSite) || {}).name : '—';
    const sig = state.sweep ? ` | signal ${state.sweep.signal}%` : '';
    const digging = state.dig ? ` | digging ${state.dig.depthDug}/${state.dig.depthNeeded}cm` : '';
    return `Treasure ${rank().name} | ${site} | finds ${state.totalFinds} | pack ${state.inventory.length}${sig}${digging}`;
  }

  function summary() {
    return {
      rank: state.rank,
      xp: state.xp,
      detector: state.detectorId,
      shovel: state.shovelId,
      totalFinds: state.totalFinds,
      totalEarned: state.totalEarned,
      inventory: state.inventory.length,
      bestFind: state.bestFind,
      rivalsBeaten: state.rivalsBeaten,
      rivalsLost: state.rivalsLost,
      missionsDone: Object.keys(state.missionsDone).length,
      sitesVisited: Object.keys(state.sitesVisited).length,
    };
  }

  function serialize() {
    return {
      xp: state.xp,
      rank: state.rank,
      detectorId: state.detectorId,
      detectorsOwned: [...state.detectorsOwned],
      shovelId: state.shovelId,
      shovelsOwned: [...state.shovelsOwned],
      mapsOwned: [...state.mapsOwned],
      inventory: state.inventory.map((f) => ({ ...f })),
      museumDonations: state.museumDonations,
      totalFinds: state.totalFinds,
      totalEarned: state.totalEarned,
      totalSold: state.totalSold,
      rivalsBeaten: state.rivalsBeaten,
      rivalsLost: state.rivalsLost,
      missionsDone: { ...state.missionsDone },
      bestFind: state.bestFind ? { ...state.bestFind } : null,
      collection: { ...state.collection },
      sitesVisited: { ...state.sitesVisited },
    };
  }

  function deserialize(s) {
    if (!s || typeof s !== 'object') return;
    if (typeof s.xp === 'number') state.xp = s.xp;
    if (typeof s.rank === 'string') state.rank = s.rank;
    if (typeof s.detectorId === 'string') state.detectorId = s.detectorId;
    if (Array.isArray(s.detectorsOwned)) state.detectorsOwned = [...s.detectorsOwned];
    if (typeof s.shovelId === 'string') state.shovelId = s.shovelId;
    if (Array.isArray(s.shovelsOwned)) state.shovelsOwned = [...s.shovelsOwned];
    if (Array.isArray(s.mapsOwned)) state.mapsOwned = [...s.mapsOwned];
    if (Array.isArray(s.inventory)) state.inventory = s.inventory.map((f) => ({ ...f }));
    for (const k of ['museumDonations', 'totalFinds', 'totalEarned', 'totalSold', 'rivalsBeaten', 'rivalsLost']) {
      if (typeof s[k] === 'number') state[k] = s[k];
    }
    if (s.missionsDone) state.missionsDone = { ...s.missionsDone };
    if (s.bestFind) state.bestFind = { ...s.bestFind };
    if (s.collection) state.collection = { ...s.collection };
    if (s.sitesVisited) state.sitesVisited = { ...s.sitesVisited };
  }

  return {
    state,
    buyDetector,
    buyShovel,
    buyMap,
    useMap,
    goToSite,
    startSweep,
    sweepAt,
    startDig,
    digOnce,
    sellFind,
    sellAllJunk,
    appraise,
    missions,
    tick,
    hudLine,
    summary,
    serialize,
    deserialize,
  };
}

// ---------------------------------------------------------------------------
// Extra reference data: famous lost treasures (flavour for the journal)
// ---------------------------------------------------------------------------

export const FAMOUS_TREASURES = [
  { name: 'The Lost Crown', value: 100000, found: false, note: 'Four hundred years missing.' },
  { name: 'Blackbeard Hoard', value: 30000, found: false, note: 'Somewhere on Pirate Isle.' },
  { name: 'Aztec Gold Mask', value: 8000, found: false, note: 'Beaten gold, older than the city.' },
  { name: 'The Sunken Chest', value: 12000, found: false, note: 'A chest that never reached port.' },
  { name: 'The Jade Idol', value: 1500, found: false, note: 'A small god from a lost temple.' },
];


// ---------------------------------------------------------------------------
// Part 3 — Map fragments, appraisal guide, dig-site lore, rival dossiers
// ---------------------------------------------------------------------------

// Map fragments: collect three to assemble a rare map.
export const MAP_FRAGMENTS = [
  { id: 'frag-north', name: 'North Fragment', mapId: 'map-pirate', desc: 'The top of the pirate map. Shows the coastline.' },
  { id: 'frag-east', name: 'East Fragment', mapId: 'map-pirate', desc: 'The right side. Shows the X.' },
  { id: 'frag-south', name: 'South Fragment', mapId: 'map-pirate', desc: 'The bottom. Shows the warning.' },
  { id: 'frag-crypt-a', name: 'Crypt Fragment A', mapId: 'map-crypt', desc: 'The crypt entrance, drawn in ink.' },
  { id: 'frag-crypt-b', name: 'Crypt Fragment B', mapId: 'map-crypt', desc: 'The steps, counted twice.' },
  { id: 'frag-crypt-c', name: 'Crypt Fragment C', mapId: 'map-crypt', desc: 'The keeper note. Do not read it aloud.' },
];

// Appraisal guide: what raises or lowers a find value.
export const APPRAISAL_NOTES = [
  'Condition matters: a clean coin is worth double a corroded one.',
  'Provenance matters: a find with a story sells for more.',
  'The museum pays double for artifacts with a documented site.',
  'The black market pays more for gold and never asks where it came from.',
  'A complete set is worth more than the sum of its pieces.',
  'Junk is junk — unless it is the missing piece of a set.',
  'Never clean a relic with chemicals. Collectors can tell.',
];

// Dig-site lore.
export const SITE_LORE = [
  { site: 'beach-north', note: 'A wedding ring is lost here every summer. Somebody finds it every autumn.' },
  { site: 'park', note: 'The park was a fairground in 1920. Coins everywhere.' },
  { site: 'old-battlefield', note: 'Two armies fought here. Both left things behind.' },
  { site: 'ghost-town', note: 'The assay office safe was never opened. The combination died with the owner.' },
  { site: 'shipwreck-shore', note: 'Eleven ships wrecked on these rocks. The sea gives back slowly.' },
  { site: 'jungle-ruins', note: 'The temple was abandoned in a hurry. They left in the night.' },
  { site: 'desert-dunes', note: 'A caravan buried its gold before a sandstorm. The storm never ended.' },
  { site: 'pirate-isle', note: 'Blackbeard buried something here. Everybody knows. Nobody has found it.' },
];

// Rival dossiers: how to beat each rival.
export const RIVAL_DOSSIERS = [
  { rival: 'digger-dan', tip: 'Dan is slow. Out-dig him.' },
  { rival: 'gold-digger-gwen', tip: 'Gwen is fast but sloppy. Let her miss the deep finds.' },
  { rival: 'professor', tip: 'The Professor knows the maps. Buy better maps.' },
  { rival: 'blackjack-crew', tip: 'The crew is armed. Dig at night, or do not dig at all.' },
  { rival: 'lone-wolf', tip: 'The Wolf never shares a site. Find your own.' },
];

// Extra finds for high tiers (extension of the find table).
export const RARE_FINDS = [
  { id: 'roman-coin', name: 'Roman Coin', tier: 3, weight: 3, value: 1200, kind: 'coin', desc: 'Two thousand years old. Still spends nowhere.' },
  { id: 'viking-axe', name: 'Viking Axe', tier: 3, weight: 2, value: 2000, kind: 'relic', desc: 'Axe head, still sharp enough to respect.' },
  { id: 'emerald', name: 'Raw Emerald', tier: 4, weight: 2, value: 6000, kind: 'jewellery', desc: 'Green as the jungle it came from.' },
  { id: 'pharaoh-mask', name: 'Pharaoh Mask', tier: 5, weight: 1, value: 50000, kind: 'artifact', desc: 'Gold, lapis, and four thousand years.' },
  { id: 'meteorite', name: 'Meteorite', tier: 4, weight: 2, value: 4000, kind: 'relic', desc: 'A rock from space. Worth more than gold.' },
  { id: 'time-capsule', name: 'Time Capsule', tier: 2, weight: 2, value: 300, kind: 'relic', desc: 'Buried in 1975. Full of somebody childhood.' },
];

// Digging tips.
export const DIGGING_TIPS = [
  'Sweep first, dig second. Digging blind wastes the day.',
  'A signal above 88 means dig here. Below 45 means move on.',
  'Discrimination filters junk. Upgrade your detector before your shovel.',
  'Deep sites need deep detectors. A toy detector finds bottle caps.',
  'Maps multiply find value. Always dig where the map points.',
  'Rivals steal finds. Dig fast when one is on your site.',
];

// Pure helpers.

export function assembleMap(fragments, mapId) {
  const need = MAP_FRAGMENTS.filter((f) => f.mapId === mapId);
  const have = need.filter((f) => fragments.includes(f.id));
  return { complete: have.length === need.length, have: have.length, need: need.length, mapId };
}

export function bestBuyerFor(find) {
  let best = BUYERS[0];
  let bestPrice = -1;
  for (const b of BUYERS) {
    const price = find.value * (b[find.kind] || 1);
    if (price > bestPrice) { bestPrice = price; best = b; }
  }
  return { buyer: best, price: Math.round(bestPrice) };
}

export function siteTierForRank(rankId) {
  const idx = TREASURE_RANKS.findIndex((r) => r.id === rankId);
  if (idx === 0) return 2;
  if (idx === 1) return 3;
  if (idx === 2) return 4;
  return 5;
}

export function findRarity(find) {
  if (find.value >= 10000) return 'legendary';
  if (find.value >= 2500) return 'epic';
  if (find.value >= 500) return 'rare';
  if (find.value >= 50) return 'uncommon';
  return 'common';
}

export function inventoryValue(inventory, buyerId, rankMult) {
  return inventory.reduce((sum, f) => sum + findValue(f, buyerId, rankMult), 0);
}

export function collectionKindCount(collection, kind) {
  return collection[kind] || 0;
}

export function detectorRecommendation(cash, targetTier) {
  const ok = DETECTORS.filter((d) => d.depth >= targetTier && d.price <= cash);
  if (ok.length > 0) return ok[0];
  return DETECTORS.filter((d) => d.depth >= targetTier)[0] || DETECTORS[0];
}

export function shovelRecommendation(cash, depthNeeded) {
  const ok = SHOVELS.filter((s) => s.digPower * 3 >= depthNeeded && s.price <= cash);
  if (ok.length > 0) return ok[0];
  return SHOVELS[SHOVELS.length - 1];
}

export function rivalOdds(rivalId, rankId) {
  const rival = RIVALS.find((r) => r.id === rivalId);
  const rankIdx = TREASURE_RANKS.findIndex((r) => r.id === rankId);
  if (!rival) return 0.5;
  return Math.max(0.1, Math.min(0.9, (rankIdx + 2) / (rival.skill + rankIdx + 2)));
}

export function mapValueEstimate(mapId) {
  const m = TREASURE_MAPS.find((x) => x.id === mapId);
  if (!m) return 0;
  const pool = FIND_TABLE.filter((f) => f.tier <= m.tier + 1);
  const avg = pool.reduce((s, f) => s + f.value, 0) / pool.length;
  return Math.round(avg * 3);
}

export function digsToDepth(depthNeeded, shovelId) {
  const s = SHOVELS.find((x) => x.id === shovelId) || SHOVELS[0];
  return Math.ceil(depthNeeded / s.digPower);
}


// ---------------------------------------------------------------------------
// Part 4 — Finds log, map dealers, detecting clubs, treasure slang
// ---------------------------------------------------------------------------

// Famous detecting clubs (flavour + rivals).
export const DETECTING_CLUBS = [
  { id: 'beachcombers', name: 'Beachcombers Club', members: 40, desc: 'Weekend beach hunters. Friendly.' },
  { id: 'relic-hunters', name: 'Relic Hunters Society', members: 25, desc: 'Serious historians with serious detectors.' },
  { id: 'gold-rush', name: 'Gold Rush Crew', members: 12, desc: 'Only interested in gold. Nothing else.' },
  { id: 'night-diggers', name: 'Night Diggers', members: 8, desc: 'Dig at night. Ask no questions.' },
];

// Map dealers: who sells which maps.
export const MAP_DEALERS = [
  { id: 'old-salty', name: 'Old Salty', maps: ['map-beach', 'map-river', 'map-wreck'], desc: 'A sailor who collects maps like stamps.' },
  { id: 'antique-amy', name: 'Antique Amy', maps: ['map-park', 'map-battle', 'map-ghost'], desc: 'Her shop smells of dust and secrets.' },
  { id: 'professor-maps', name: 'Professor Maps', maps: ['map-jungle', 'map-desert', 'map-cove'], desc: 'A scholar who sells what he cannot use.' },
  { id: 'black-market-bob', name: 'Black Market Bob', maps: ['map-pirate', 'map-crypt', 'map-volcano'], desc: 'The maps nobody else will sell you.' },
];

// Treasure slang (flavour).
export const TREASURE_SLANG = [
  'A "hot spot" is ground that keeps paying.',
  'A "ghost signal" is a beep with nothing under it.',
  'A "honey hole" is a spot full of finds.',
  'A "plug" is the neat square of turf you cut and replace.',
  'A "screamer" is a signal so strong it must be big.',
];

// Finds log: notable historical finds (flavour).
export const FINDS_LOG = [
  { find: 'Spanish Doubloon', year: 1715, site: 'shipwreck-shore', note: 'From the 1715 fleet. Still shiny.' },
  { find: 'Cavalry Sword', year: 1863, site: 'old-battlefield', note: 'Found under the fallen oak.' },
  { find: 'Jade Idol', year: 1200, site: 'jungle-ruins', note: 'Older than the city itself.' },
  { find: 'Gold Coin', year: 1849, site: 'ghost-town', note: 'From the gold rush that built the town.' },
  { find: 'Pocket Watch', year: 1910, site: 'park', note: 'Engraved with initials nobody recognises.' },
  { find: 'Aztec Gold Mask', year: 1500, site: 'desert-dunes', note: 'Beaten gold, buried with a king.' },
];

// Metal detecting etiquette.
export const DETECTING_ETIQUETTE = [
  'Fill your holes. Always.',
  'Take the junk with you. Leave the site cleaner.',
  'Ask permission before you dig on private land.',
  'Report significant historical finds to the museum.',
  'Never dig in a graveyard. Ever.',
];

// Pure helpers.

export function dealerForMap(mapId) {
  return MAP_DEALERS.find((d) => d.maps.includes(mapId)) || null;
}

export function clubForSite(siteId) {
  if (siteId.includes('beach')) return DETECTING_CLUBS[0];
  if (siteId.includes('battle') || siteId.includes('ghost')) return DETECTING_CLUBS[1];
  return DETECTING_CLUBS[2];
}

export function findsLogForSite(siteId) {
  return FINDS_LOG.filter((f) => f.site === siteId);
}

export function mapDealerPrice(mapId, dealerId) {
  const m = TREASURE_MAPS.find((x) => x.id === mapId);
  if (!m) return 0;
  const dealer = MAP_DEALERS.find((d) => d.id === dealerId);
  const markup = dealer && dealer.id === 'black-market-bob' ? 1.5 : 1;
  return Math.round(m.price * markup);
}

export function totalClubMembers() {
  return DETECTING_CLUBS.reduce((s, c) => s + c.members, 0);
}


// ---------------------------------------------------------------------------
// Part 5 — Famous treasure hunters, dig permits, treasure films
// ---------------------------------------------------------------------------

export const FAMOUS_HUNTERS = [
  { name: 'Mel Fisher', find: 'Atocha treasure', year: 1985, note: 'Found $450 million in shipwreck gold.' },
  { name: 'Howard Carter', find: 'Tutankhamun tomb', year: 1922, note: 'Found the boy king after seven years of digging.' },
  { name: 'Heinrich Schliemann', find: 'Troy', year: 1873, note: 'Dug up a city everybody said was a myth.' },
  { name: 'Blackbeard', find: 'Pirate hoard', year: 1718, note: 'Buried it. Never told anybody where.' },
];

export const DIG_PERMITS = [
  { site: 'beach-north', permit: 'none', cost: 0, note: 'Public beach. Dig freely.' },
  { site: 'park', permit: 'park', cost: 10, note: 'Park permit. Fill your holes.' },
  { site: 'old-battlefield', permit: 'heritage', cost: 50, note: 'Heritage site. Report all finds.' },
  { site: 'ghost-town', permit: 'private', cost: 100, note: 'Private land. Ask the owner.' },
];

export const TREASURE_FILMS = [
  { title: 'Treasure Island', year: 1950, note: 'X marks the spot.' },
  { title: 'Raiders of the Lost Ark', year: 1981, note: 'It belongs in a museum.' },
  { title: 'National Treasure', year: 2004, note: 'Steal the Declaration of Independence.' },
  { title: 'The Goonies', year: 1985, note: 'Never say die.' },
];

export function permitForSite(siteId) {
  return DIG_PERMITS.find((p) => p.site === siteId) || { site: siteId, permit: 'none', cost: 0, note: 'No permit needed.' };
}

export function hunterForFind(findName) {
  return FAMOUS_HUNTERS.find((h) => h.find.toLowerCase().includes(findName.toLowerCase())) || null;
}

export function filmForYearTreasure(year) {
  return TREASURE_FILMS.find((f) => f.year === year) || null;
}


// ---------------------------------------------------------------------------
// Part 6 — Treasure hunter mottos, famous shipwrecks
// ---------------------------------------------------------------------------

export const TREASURE_MOTTOS = [
  'X marks the spot.',
  'The ground remembers everything.',
  'Dig slow. Think fast.',
  'Every beep is a story.',
];

export const FAMOUS_SHIPWRECKS = [
  { name: 'Nuestra Señora de Atocha', year: 1622, value: 450000000, note: 'Found by Mel Fisher in 1985.' },
  { name: 'SS Central America', year: 1857, value: 150000000, note: 'Gold rush treasure, found in 1988.' },
  { name: 'The 1715 Fleet', year: 1715, value: 400000000, note: 'Eleven ships, one hurricane.' },
];

export function mottoForHunterTreasure(index) {
  return TREASURE_MOTTOS[index % TREASURE_MOTTOS.length];
}

export function shipwreckValue(name) {
  const w = FAMOUS_SHIPWRECKS.find((x) => x.name === name);
  return w ? w.value : 0;
}


// ---------------------------------------------------------------------------
// Part 7 — Treasure proverbs, famous maps
// ---------------------------------------------------------------------------

export const TREASURE_PROVERBS = [
  'Not all treasure is silver and gold.',
  'The map is never the territory. Dig anyway.',
  'A detector beeps. A hunter listens.',
  'Gold hides where nobody looks twice.',
];

export const FAMOUS_MAPS = [
  { name: 'Piri Reis Map', year: 1513, note: 'A map that should not exist.' },
  { name: 'Oak Island Map', year: 1795, note: 'The money pit. Still unsolved.' },
  { name: 'The Copper Scroll', year: 70, note: 'A treasure list written on copper.' },
];

export function proverbTreasure(index) {
  return TREASURE_PROVERBS[index % TREASURE_PROVERBS.length];
}

export function famousMapFor(name) {
  return FAMOUS_MAPS.find((m) => m.name === name) || null;
}
