// ghosthunting.js — Ghost Hunting: paranormal contracts after dark.
// Take contracts from haunted locations, sweep the rooms with detectors,
// collect three pieces of evidence to identify the ghost, then capture it
// before your sanity runs out. Each ghost type has tells, a weakness, and
// a price. Work at night: the veil is thinnest between 00:00 and 04:00.
// Pure logic, no rendering, no imports.
// Factory: createGhostHuntingSystem(deps) with deps { rng, getHour, getDay,
// getCash, addCash, addHeat, log, getPlayerPos }.

// ---------------------------------------------------------------------------
// Data tables
// ---------------------------------------------------------------------------

// Evidence types: what each tool can find, and how strong the signal is.
export const EVIDENCE_TYPES = [
  { id: 'emf5', name: 'EMF Level 5', tool: 'emf', desc: 'Electromagnetic spike off the charts.', weight: 3 },
  { id: 'freezing', name: 'Freezing Temperatures', tool: 'thermo', desc: 'Breath fogs. The room is below zero.', weight: 3 },
  { id: 'spiritbox', name: 'Spirit Box Voice', tool: 'spiritbox', desc: 'A voice answers through the static.', weight: 3 },
  { id: 'writing', name: 'Ghost Writing', tool: 'book', desc: 'Words appear in the notebook by themselves.', weight: 3 },
  { id: 'fingerprints', name: 'Fingerprints', tool: 'uv', desc: 'Handprints glow under UV light.', weight: 3 },
  { id: 'orbs', name: 'Ghost Orbs', tool: 'camera', desc: 'Floating lights on the photo.', weight: 2 },
  { id: 'dots', name: 'DOTS Projection', tool: 'dots', desc: 'A silhouette runs through the laser grid.', weight: 2 },
  { id: 'whisper', name: 'Whisper Recording', tool: 'recorder', desc: 'A whisper on playback that nobody said aloud.', weight: 2 },
];

// Ghost types: evidence triple that identifies them, behaviour, weakness.
export const GHOST_TYPES = [
  { id: 'spirit', name: 'Spirit', evidence: ['emf5', 'spiritbox', 'writing'], aggression: 1, speed: 1, weakness: 'smudge', reward: 300, desc: 'The common ghost. Mostly harmless, mostly curious.' },
  { id: 'wraith', name: 'Wraith', evidence: ['emf5', 'spiritbox', 'dots'], aggression: 2, speed: 2, weakness: 'salt', reward: 400, desc: 'Fast, and it hates salt lines.' },
  { id: 'phantom', name: 'Phantom', evidence: ['spiritbox', 'fingerprints', 'dots'], aggression: 2, speed: 1, weakness: 'photo', reward: 450, desc: 'Stares at you. Drains sanity just by looking.' },
  { id: 'poltergeist', name: 'Poltergeist', evidence: ['spiritbox', 'fingerprints', 'writing'], aggression: 3, speed: 1, weakness: 'empty-room', reward: 500, desc: 'Throws everything that is not nailed down.' },
  { id: 'banshee', name: 'Banshee', evidence: ['fingerprints', 'orbs', 'dots'], aggression: 3, speed: 2, weakness: 'crucifix', reward: 550, desc: 'Screams. Targets one person and does not stop.' },
  { id: 'jinn', name: 'Jinn', evidence: ['emf5', 'fingerprints', 'freezing'], aggression: 3, speed: 3, weakness: 'breaker-off', reward: 600, desc: 'Fast when the power is on. Terrifying either way.' },
  { id: 'mare', name: 'Mare', evidence: ['spiritbox', 'writing', 'orbs'], aggression: 2, speed: 1, weakness: 'lights-on', reward: 500, desc: 'Strongest in the dark. Keep the lights on.' },
  { id: 'revenant', name: 'Revenant', evidence: ['orbs', 'writing', 'freezing'], aggression: 4, speed: 1, weakness: 'hide', reward: 650, desc: 'Slow until it knows where you are. Then it runs.' },
  { id: 'shade', name: 'Shade', evidence: ['emf5', 'writing', 'freezing'], aggression: 1, speed: 1, weakness: 'group', reward: 350, desc: 'Shy. Hides when people gather.' },
  { id: 'demon', name: 'Demon', evidence: ['fingerprints', 'writing', 'freezing'], aggression: 5, speed: 2, weakness: 'crucifix', reward: 900, desc: 'The worst one. Hunts early, hunts often.' },
  { id: 'yurei', name: 'Yurei', evidence: ['orbs', 'freezing', 'dots'], aggression: 3, speed: 2, weakness: 'smudge', reward: 700, desc: 'A vengeful spirit. Sanity drains twice as fast near it.' },
  { id: 'oni', name: 'Oni', evidence: ['emf5', 'freezing', 'dots'], aggression: 4, speed: 2, weakness: 'photo', reward: 750, desc: 'More active when people are near. Loves an audience.' },
  { id: 'mimic', name: 'The Mimic', evidence: ['spiritbox', 'fingerprints', 'freezing'], aggression: 4, speed: 2, weakness: 'orbs', reward: 1000, desc: 'Copies other ghosts. Always shows orbs — the tell.' },
  { id: 'hantu', name: 'Hantu', evidence: ['emf5', 'spiritbox', 'orbs'], aggression: 2, speed: 3, weakness: 'salt', reward: 650, desc: 'A local legend. Moves like the wind between rooms.' },
];

// Haunted locations: size (rooms), base reward, haunting level.
export const HAUNTED_LOCATIONS = [
  { id: 'farmhouse', name: 'Old Farmhouse', rooms: 6, reward: 200, haunt: 1, desc: 'A farmhouse nobody has lived in for thirty years.' },
  { id: 'apartment', name: 'Apartment 13', rooms: 5, reward: 220, haunt: 1, desc: 'Tenants keep leaving in the middle of the night.' },
  { id: 'school', name: 'Abandoned School', rooms: 10, reward: 350, haunt: 2, desc: 'The bell still rings at 3 AM. There is no bell.' },
  { id: 'hospital', name: 'St. Mercy Hospital', rooms: 12, reward: 450, haunt: 3, desc: 'Wheelchairs move by themselves down the ward.' },
  { id: 'hotel', name: 'Grand Royale Hotel', rooms: 14, reward: 500, haunt: 3, desc: 'Room 666 is always booked. Nobody checks in.' },
  { id: 'prison', name: 'Blackgate Prison', rooms: 16, reward: 600, haunt: 4, desc: 'The cells lock from the inside now.' },
  { id: 'manor', name: 'Blackwood Manor', rooms: 18, reward: 700, haunt: 4, desc: 'Three families vanished here. The portraits watch you.' },
  { id: 'asylum', name: 'Sunnyvale Asylum', rooms: 20, reward: 800, haunt: 5, desc: 'The doctors left in 1974. The patients never did.' },
  { id: 'theatre', name: 'Orpheum Theatre', rooms: 9, reward: 400, haunt: 2, desc: 'A phantom audience applauds every midnight show.' },
  { id: 'church', name: 'St. Agnes Church', rooms: 7, reward: 300, haunt: 2, desc: 'Candles light themselves during the sermon.' },
  { id: 'lighthouse', name: 'Foggy Point Lighthouse', rooms: 8, reward: 380, haunt: 3, desc: 'The keeper still climbs the stairs every night.' },
  { id: 'mall', name: 'Dead Mall', rooms: 15, reward: 550, haunt: 3, desc: 'The food court plays music. The power is off.' },
];

// Equipment: what you can buy, what it detects, consumable or not.
export const GHOST_EQUIPMENT = [
  { id: 'emf', name: 'EMF Reader', price: 100, detect: 'emf5', consumable: false, desc: 'Beeps faster as the ghost gets closer.' },
  { id: 'thermo', name: 'Thermometer', price: 120, detect: 'freezing', consumable: false, desc: 'Reads room temperature. Ghosts bring the cold.' },
  { id: 'spiritbox', name: 'Spirit Box', price: 150, detect: 'spiritbox', consumable: false, desc: 'Scans radio static for voices.' },
  { id: 'book', name: 'Ghost Writing Book', price: 80, detect: 'writing', consumable: true, desc: 'Leave it in the ghost room and wait.' },
  { id: 'uv', name: 'UV Light', price: 90, detect: 'fingerprints', consumable: false, desc: 'Reveals prints on doors and windows.' },
  { id: 'camera', name: 'Photo Camera', price: 200, detect: 'orbs', consumable: true, desc: 'Photos can catch orbs — and the ghost itself.' },
  { id: 'dots', name: 'DOTS Projector', price: 250, detect: 'dots', consumable: false, desc: 'Laser grid. Silhouettes run through it.' },
  { id: 'recorder', name: 'Voice Recorder', price: 110, detect: 'whisper', consumable: false, desc: 'Records whispers nobody said.' },
  { id: 'smudge', name: 'Smudge Sticks', price: 40, detect: null, consumable: true, desc: 'Burn to calm the ghost for 60 seconds.' },
  { id: 'salt', name: 'Salt Bags', price: 30, detect: null, consumable: true, desc: 'A salt line slows most ghosts down.' },
  { id: 'crucifix', name: 'Crucifix', price: 150, detect: null, consumable: true, desc: 'Stops a hunt once. Place it well.' },
  { id: 'candle', name: 'Candle', price: 15, detect: null, consumable: true, desc: 'Light keeps the dark — and the Mare — away.' },
  { id: 'sanity-pills', name: 'Sanity Pills', price: 60, detect: null, consumable: true, desc: 'Restores 25 sanity. Tastes awful.' },
  { id: 'trap', name: 'Ghost Trap', price: 500, detect: null, consumable: true, desc: 'Required to capture a ghost once identified.' },
];

// Hunter ranks.
export const HUNTER_RANKS = [
  { id: 'amateur', name: 'Amateur', xpNeeded: 0, perk: 'Basic contracts only.' },
  { id: 'investigator', name: 'Investigator', xpNeeded: 200, perk: 'Medium locations unlock.' },
  { id: 'professional', name: 'Professional', xpNeeded: 600, perk: 'Hard locations unlock, +10% reward.' },
  { id: 'expert', name: 'Expert', xpNeeded: 1500, perk: '+20% reward, hunts start later.' },
  { id: 'master', name: 'Master Hunter', xpNeeded: 3500, perk: '+35% reward, sanity drains slower.' },
];

// Ghost hunting missions.
export const GHOST_MISSIONS = [
  { id: 'first-evidence', name: 'First Evidence', desc: 'Collect your first piece of evidence.', reward: 100 },
  { id: 'first-id', name: 'First Identification', desc: 'Correctly identify a ghost.', reward: 250 },
  { id: 'first-capture', name: 'First Capture', desc: 'Capture a ghost in the trap.', reward: 500 },
  { id: 'five-captures', name: 'Ghostbuster', desc: 'Capture 5 ghosts.', reward: 1200 },
  { id: 'demon-capture', name: 'Demon Slayer', desc: 'Capture a Demon.', reward: 2000 },
  { id: 'perfect-contract', name: 'Perfect Contract', desc: 'Identify and capture with sanity above 50%.', reward: 800 },
  { id: 'all-ghosts', name: 'Bestiary Complete', desc: 'Identify every ghost type at least once.', reward: 5000 },
  { id: 'no-death', name: 'Survivor', desc: 'Complete 10 contracts without dying.', reward: 1500 },
  { id: 'photo-ghost', name: 'Gotcha!', desc: 'Photograph the ghost itself.', reward: 600 },
  { id: 'night-owl', name: 'Night Owl', desc: 'Complete a contract between 00:00 and 04:00.', reward: 400 },
];

// Room names for the sweep: each location builds rooms from this pool.
export const ROOM_NAMES = ['Living Room', 'Kitchen', 'Bedroom', 'Bathroom', 'Basement', 'Attic', 'Hallway', 'Garage', 'Library', 'Dining Room', 'Nursery', 'Cellar', 'Chapel', 'Ward', 'Cell Block', 'Lobby', 'Stage', 'Office', 'Storage', 'Balcony'];

// Hunt events: things that happen while you sweep.
export const HUNT_EVENTS = [
  { id: 'flicker', name: 'Lights Flicker', sanity: -2, desc: 'The lights flicker. Something is near.' },
  { id: 'whisper', name: 'Whisper', sanity: -3, desc: 'A whisper right behind your ear.' },
  { id: 'footsteps', name: 'Footsteps', sanity: -4, desc: 'Footsteps in the next room. Nobody is there.' },
  { id: 'object-thrown', name: 'Object Thrown', sanity: -5, desc: 'A chair slides across the floor by itself.' },
  { id: 'apparition', name: 'Apparition', sanity: -8, desc: 'A figure stands at the end of the hall — then it is gone.' },
  { id: 'cold-spot', name: 'Cold Spot', sanity: -2, desc: 'Your breath fogs. The temperature just dropped.' },
  { id: 'radio', name: 'Radio Static', sanity: -3, desc: 'The radio turns itself on, tuned to static.' },
  { id: 'door-slam', name: 'Door Slam', sanity: -5, desc: 'Every door in the house slams at once.' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clampNum(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

export function ghostByEvidence(evidenceIds) {
  const set = new Set(evidenceIds);
  return GHOST_TYPES.filter((g) => g.evidence.every((e) => set.has(e)));
}

export function possibleGhosts(evidenceIds) {
  const set = new Set(evidenceIds);
  return GHOST_TYPES.filter((g) => g.evidence.every((e) => set.has(e) || !evidenceIds.includes(e)) && g.evidence.some((e) => set.has(e)));
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createGhostHuntingSystem(deps) {
  const d = deps || {};
  const rng = d.rng || Math.random;
  const getHour = d.getHour || (() => 0);
  const getDay = d.getDay || (() => 1);
  const getCash = d.getCash || (() => 0);
  const addCash = d.addCash || (() => {});
  const log = d.log || (() => {});
  const getPlayerPos = d.getPlayerPos || (() => ({ x: 0, z: 0 }));

  const state = {
    xp: 0,
    rank: 'amateur',
    equipmentOwned: ['emf'],
    consumables: { smudge: 1 },
    contracts: [],
    contractDay: 0,
    active: null,
    sanity: 100,
    evidenceFound: [],
    identified: {},
    captured: {},
    totalCaptures: 0,
    totalContracts: 0,
    totalDeaths: 0,
    perfectContracts: 0,
    photosTaken: 0,
    ghostPhotos: 0,
    missionsDone: {},
    day: 1,
    contractsToday: 0,
    huntsSurvived: 0,
    bestiary: {},
  };

  function rank() {
    return HUNTER_RANKS.find((r) => r.id === state.rank) || HUNTER_RANKS[0];
  }

  function rewardMult() {
    if (state.rank === 'master') return 1.35;
    if (state.rank === 'expert') return 1.2;
    if (state.rank === 'professional') return 1.1;
    return 1;
  }

  function refreshRank() {
    let best = HUNTER_RANKS[0];
    for (const r of HUNTER_RANKS) if (state.xp >= r.xpNeeded) best = r;
    if (best.id !== state.rank) {
      state.rank = best.id;
      log(`Hunter rank up: ${best.name}! ${best.perk}`);
    }
  }

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const m = GHOST_MISSIONS.find((x) => x.id === id);
    if (!m) return;
    let done = false;
    switch (id) {
      case 'first-evidence': done = state.evidenceFound.length >= 1; break;
      case 'first-id': done = Object.keys(state.identified).length >= 1; break;
      case 'first-capture': done = state.totalCaptures >= 1; break;
      case 'five-captures': done = state.totalCaptures >= 5; break;
      case 'demon-capture': done = (state.captured.demon || 0) >= 1; break;
      case 'perfect-contract': done = state.perfectContracts >= 1; break;
      case 'all-ghosts': done = Object.keys(state.bestiary).length >= GHOST_TYPES.length; break;
      case 'no-death': done = state.huntsSurvived >= 10 && state.totalDeaths === 0; break;
      case 'photo-ghost': done = state.ghostPhotos >= 1; break;
      case 'night-owl': done = (state.nightOwlDone || 0) >= 1; break;
      default: done = false;
    }
    if (!done) return;
    state.missionsDone[id] = true;
    addCash(m.reward);
    log(`Ghost mission complete: ${m.name} (+$${m.reward}).`);
  }

  function buyEquipment(itemId, qty) {
    const item = GHOST_EQUIPMENT.find((e) => e.id === itemId);
    if (!item) return { ok: false, error: 'unknown item' };
    const n = item.consumable ? clampNum(Math.floor(qty) || 1, 1, 10) : 1;
    if (!item.consumable && state.equipmentOwned.includes(itemId)) {
      return { ok: false, error: 'already owned' };
    }
    const cost = item.price * n;
    if (getCash() < cost) return { ok: false, error: 'not enough cash' };
    addCash(-cost);
    if (item.consumable) {
      state.consumables[itemId] = (state.consumables[itemId] || 0) + n;
      // Consumable detection tools (book, camera) must also count as owned
      // so sweepRoom accepts them.
      if (item.detect && !state.equipmentOwned.includes(itemId)) state.equipmentOwned.push(itemId);
    } else {
      state.equipmentOwned.push(itemId);
    }
    log(`Bought ${item.name}${n > 1 ? ` x${n}` : ''} ($${cost}).`);
    return { ok: true, item, qty: n };
  }

  function generateContract() {
    const loc = HAUNTED_LOCATIONS[Math.floor(rng() * HAUNTED_LOCATIONS.length)];
    const ghost = GHOST_TYPES[Math.floor(rng() * GHOST_TYPES.length)];
    const rankIdx = HUNTER_RANKS.findIndex((r) => r.id === state.rank);
    const maxHaunt = rankIdx === 0 ? 2 : rankIdx === 1 ? 3 : 5;
    const location = loc.haunt <= maxHaunt ? loc : HAUNTED_LOCATIONS[0];
    const rooms = [];
    const shuffled = [...ROOM_NAMES].sort(() => rng() - 0.5);
    for (let i = 0; i < location.rooms; i++) rooms.push({ name: shuffled[i % shuffled.length], searched: false, ghostRoom: false });
    const ghostRoomIdx = Math.floor(rng() * rooms.length);
    rooms[ghostRoomIdx].ghostRoom = true;
    return {
      id: `contract-${Date.now()}-${Math.floor(rng() * 1e6)}`,
      locationId: location.id,
      locationName: location.name,
      ghostId: ghost.id,
      ghostName: ghost.name,
      reward: Math.round((location.reward + ghost.reward) * rewardMult()),
      rooms,
      ghostRoomIdx,
      status: 'offered',
      createdDay: getDay(),
    };
  }

  function refreshContracts() {
    const day = getDay();
    state.contracts = [];
    const count = 3 + HUNTER_RANKS.findIndex((r) => r.id === state.rank);
    for (let i = 0; i < count; i++) state.contracts.push(generateContract());
    state.contractDay = day;
    return state.contracts;
  }

  function contracts() {
    if (state.contractDay !== getDay() || state.contracts.length === 0) refreshContracts();
    return state.contracts.filter((c) => c.status === 'offered');
  }

  function acceptContract(contractId) {
    const c = state.contracts.find((x) => x.id === contractId && x.status === 'offered');
    if (!c) return { ok: false, error: 'contract not available' };
    if (state.active) return { ok: false, error: 'already on a contract' };
    c.status = 'active';
    const hour = getHour();
    const nightBonus = (hour >= 0 && hour < 4) ? 1.25 : 1;
    state.active = {
      contractId: c.id,
      locationId: c.locationId,
      locationName: c.locationName,
      ghostId: c.ghostId,
      ghostName: c.ghostName,
      reward: Math.round(c.reward * nightBonus),
      rooms: c.rooms,
      ghostRoomIdx: c.ghostRoomIdx,
      evidence: [],
      huntActive: false,
      huntTimer: 0,
      smudgeTimer: 0,
      crucifixUsed: false,
      startedHour: hour,
      photos: 0,
    };
    state.sanity = 100;
    state.contractsToday++;
    log(`Contract accepted: ${c.locationName}. Find 3 evidence, identify the ghost, trap it. Reward $${state.active.reward}.`);
    return { ok: true, contract: state.active };
  }

  function sweepRoom(roomIdx, toolId) {
    const a = state.active;
    if (!a) return { ok: false, error: 'no active contract' };
    if (roomIdx < 0 || roomIdx >= a.rooms.length) return { ok: false, error: 'no such room' };
    const tool = GHOST_EQUIPMENT.find((e) => e.id === toolId);
    if (!tool) return { ok: false, error: 'unknown tool' };
    if (!state.equipmentOwned.includes(toolId)) return { ok: false, error: `you do not own a ${tool.name}` };
    const room = a.rooms[roomIdx];
    const ghost = GHOST_TYPES.find((g) => g.id === a.ghostId);
    const isGhostRoom = roomIdx === a.ghostRoomIdx;
    let found = null;
    let reading = null;
    // Each tool only finds its own evidence type, and only in the ghost room
    // (except orbs, which can appear anywhere at low odds).
    if (tool.detect) {
      const canFind = ghost.evidence.includes(tool.detect);
      const inRoom = isGhostRoom || (tool.detect === 'orbs' && rng() < 0.15);
      if (canFind && inRoom && !a.evidence.includes(tool.detect)) {
        a.evidence.push(tool.detect);
        state.evidenceFound.push(tool.detect);
        found = tool.detect;
        const ev = EVIDENCE_TYPES.find((e) => e.id === tool.detect);
        log(`Evidence found: ${ev.name} in the ${room.name}!`);
        checkMission('first-evidence');
      } else if (canFind && inRoom) {
        reading = 'You already recorded that evidence here.';
      } else if (!canFind) {
        reading = `No ${tool.detect} here. This ghost does not leave that trace.`;
      } else {
        reading = 'Nothing here. The ghost is in another room.';
      }
    } else {
      reading = 'That item is for protection, not detection.';
    }
    room.searched = true;
    // Searching the ghost room drains sanity and can trigger a hunt event.
    if (isGhostRoom) {
      state.sanity = clampNum(state.sanity - (2 + ghost.aggression), 0, 100);
      if (rng() < 0.35) triggerHuntEvent();
    }
    // Sanity check: at 0 the ghost hunts.
    if (state.sanity <= 0 && !a.huntActive) startHunt();
    return { ok: true, room: room.name, found, reading, evidence: [...a.evidence], sanity: Math.round(state.sanity) };
  }

  function triggerHuntEvent() {
    const ev = HUNT_EVENTS[Math.floor(rng() * HUNT_EVENTS.length)];
    const a = state.active;
    const ghost = a ? GHOST_TYPES.find((g) => g.id === a.ghostId) : null;
    const drain = ghost && ghost.id === 'yurei' ? ev.sanity * 2 : ev.sanity;
    state.sanity = clampNum(state.sanity + drain, 0, 100);
    log(`${ev.name}: ${ev.desc} (sanity ${drain})`);
    return { ok: true, event: ev, sanity: Math.round(state.sanity) };
  }

  function startHunt() {
    const a = state.active;
    if (!a || a.huntActive) return { ok: false, error: 'no hunt to start' };
    a.huntActive = true;
    a.huntTimer = 20 + (GHOST_TYPES.find((g) => g.id === a.ghostId) || { aggression: 1 }).aggression * 5;
    log('THE GHOST IS HUNTING! Hide or break line of sight!');
    return { ok: true, duration: a.huntTimer };
  }

  function useConsumable(itemId) {
    const a = state.active;
    const count = state.consumables[itemId] || 0;
    if (count <= 0) return { ok: false, error: `no ${itemId} left` };
    state.consumables[itemId]--;
    switch (itemId) {
      case 'smudge':
        if (a) { a.smudgeTimer = 60; a.huntActive = false; }
        log('Smudge sticks burned. The ghost calms down.');
        return { ok: true, effect: 'ghost calmed for 60s' };
      case 'salt':
        if (a) a.huntTimer = Math.max(0, (a.huntTimer || 0) - 10);
        log('Salt line laid. The ghost slows down.');
        return { ok: true, effect: 'hunt shortened by 10s' };
      case 'crucifix':
        if (a && a.huntActive) {
          a.huntActive = false;
          a.crucifixUsed = true;
          log('The crucifix burns bright — the hunt ends!');
          return { ok: true, effect: 'hunt stopped' };
        }
        log('Crucifix placed. It will stop one hunt.');
        if (a) a.crucifixPlaced = true;
        return { ok: true, effect: 'crucifix placed' };
      case 'candle':
        state.sanity = clampNum(state.sanity + 5, 0, 100);
        log('Candle lit. The dark feels less heavy.');
        return { ok: true, effect: '+5 sanity' };
      case 'sanity-pills':
        state.sanity = clampNum(state.sanity + 25, 0, 100);
        log('Sanity pills taken. +25 sanity.');
        return { ok: true, effect: '+25 sanity' };
      case 'trap':
        return placeTrap();
      default:
        return { ok: false, error: 'cannot use that here' };
    }
  }

  function identifyGhost(ghostId) {
    const a = state.active;
    if (!a) return { ok: false, error: 'no active contract' };
    if (a.evidence.length < 3) return { ok: false, error: 'need 3 evidence first' };
    const guess = GHOST_TYPES.find((g) => g.id === ghostId);
    if (!guess) return { ok: false, error: 'unknown ghost' };
    const correct = guess.id === a.ghostId;
    a.identifiedAs = ghostId;
    a.identifiedCorrect = correct;
    if (correct) {
      state.identified[ghostId] = (state.identified[ghostId] || 0) + 1;
      state.bestiary[ghostId] = true;
      state.xp += 60;
      refreshRank();
      checkMission('first-id');
      checkMission('all-ghosts');
      log(`Identified: ${guess.name}! ${guess.desc} Weakness: ${guess.weakness}.`);
      return { ok: true, correct: true, ghost: guess };
    }
    state.sanity = clampNum(state.sanity - 10, 0, 100);
    log(`Wrong guess — that is not a ${guess.name}. The ghost is angry. (-10 sanity)`);
    return { ok: true, correct: false, hint: 'Two of your three evidence point elsewhere. Re-check the rooms.' };
  }

  function placeTrap() {
    const a = state.active;
    if (!a) return { ok: false, error: 'no active contract' };
    if (!a.identifiedCorrect) return { ok: false, error: 'identify the ghost first' };
    if (a.huntActive) return { ok: false, error: 'cannot trap during a hunt' };
    const ghost = GHOST_TYPES.find((g) => g.id === a.ghostId);
    const inGhostRoom = a.lastRoom === a.ghostRoomIdx;
    const chance = inGhostRoom ? 0.95 : 0.6;
    const roll = rng();
    if (roll > chance) {
      log('The trap snapped shut on empty air. The ghost was not here.');
      return { ok: true, captured: false, reason: 'wrong room — try the ghost room' };
    }
    return captureGhost(ghost);
  }

  function captureGhost(ghost) {
    const a = state.active;
    state.totalCaptures++;
    state.captured[ghost.id] = (state.captured[ghost.id] || 0) + 1;
    state.totalContracts++;
    state.xp += 100 + ghost.aggression * 20;
    const perfect = state.sanity >= 50;
    if (perfect) state.perfectContracts++;
    const hour = getHour();
    if (hour >= 0 && hour < 4) state.nightOwlDone = (state.nightOwlDone || 0) + 1;
    const reward = a.reward;
    addCash(reward);
    state.huntsSurvived++;
    log(`CAPTURED the ${ghost.name}! Contract complete: +$${reward}${perfect ? ' (perfect — sanity above 50%)' : ''}.`);
    state.active = null;
    state.sanity = 100;
    refreshRank();
    checkMission('first-capture');
    checkMission('five-captures');
    checkMission('demon-capture');
    checkMission('perfect-contract');
    checkMission('no-death');
    checkMission('night-owl');
    return { ok: true, captured: true, ghost: ghost.name, reward, perfect };
  }

  function takePhoto(roomIdx) {
    const a = state.active;
    if (!a) return { ok: false, error: 'no active contract' };
    if ((state.consumables.camera || 0) <= 0 && !state.equipmentOwned.includes('camera')) {
      return { ok: false, error: 'you need a camera' };
    }
    state.photosTaken++;
    a.photos++;
    const isGhostRoom = roomIdx === a.ghostRoomIdx;
    const ghostVisible = isGhostRoom && rng() < 0.4;
    if (ghostVisible) {
      state.ghostPhotos++;
      state.xp += 40;
      log('PHOTO: the ghost itself is in the frame! +$100 photo bonus.');
      addCash(100);
      checkMission('photo-ghost');
      return { ok: true, subject: 'ghost', xp: 40 };
    }
    if (isGhostRoom && rng() < 0.5) {
      log('Photo: ghost orbs floating in the frame.');
      if (!a.evidence.includes('orbs') && GHOST_TYPES.find((g) => g.id === a.ghostId).evidence.includes('orbs')) {
        a.evidence.push('orbs');
        state.evidenceFound.push('orbs');
        checkMission('first-evidence');
      }
      return { ok: true, subject: 'orbs' };
    }
    log('Photo: an empty room. Nothing unusual.');
    return { ok: true, subject: 'nothing' };
  }

  function abandonContract() {
    const a = state.active;
    if (!a) return { ok: false, error: 'no active contract' };
    state.active = null;
    state.sanity = 100;
    state.totalDeaths += 0;
    log(`Abandoned the ${a.locationName} contract. The ghost keeps the house.`);
    return { ok: true };
  }

  function dieInHunt() {
    const a = state.active;
    state.totalDeaths++;
    state.huntsSurvived = 0;
    if (a) {
      log(`The ${a.ghostName} caught you in ${a.locationName}. You wake up outside, equipment lost.`);
      state.active = null;
    }
    state.sanity = 100;
    // Death costs the consumables carried in.
    state.consumables = {};
    return { ok: true, deaths: state.totalDeaths };
  }

  function tick(dt) {
    const day = getDay();
    if (day !== state.day) {
      state.day = day;
      state.contractsToday = 0;
      refreshContracts();
    }
    const a = state.active;
    if (!a) return;
    // Sanity slowly drains while inside; faster at night, faster for Yurei.
    const hour = getHour();
    const night = hour >= 0 && hour < 5 ? 1.5 : 1;
    const drain = (a.ghostId === 'yurei' ? 0.5 : 0.3) * night * (state.rank === 'master' ? 0.7 : 1);
    state.sanity = clampNum(state.sanity - drain * dt, 0, 100);
    if (a.smudgeTimer > 0) a.smudgeTimer -= dt;
    if (a.huntActive) {
      a.huntTimer -= dt;
      state.sanity = clampNum(state.sanity - 1.5 * dt, 0, 100);
      if (a.huntTimer <= 0) {
        if (a.crucifixPlaced && !a.crucifixUsed) {
          a.crucifixPlaced = false;
          a.crucifixUsed = true;
          a.huntActive = false;
          log('The crucifix stops the hunt!');
        } else {
          a.huntActive = false;
          dieInHunt();
          return;
        }
      }
    } else if (state.sanity <= 25 && rng() < dt * 0.05) {
      startHunt();
    }
    if (state.sanity <= 0 && !a.huntActive) startHunt();
  }

  function missions() {
    return GHOST_MISSIONS.map((m) => ({ ...m, done: !!state.missionsDone[m.id] }));
  }

  function hudLine() {
    if (!state.active && state.totalCaptures === 0) return '';
    if (!state.active) return `Ghost Hunter ${rank().name} | ${state.totalCaptures} captured`;
    return `Ghost ${state.active.locationName} | sanity ${Math.round(state.sanity)}% | evidence ${state.active.evidence.length}/3${state.active.huntActive ? ' | HUNTING — HIDE!' : ''}`;
  }

  function summary() {
    return {
      rank: state.rank,
      xp: state.xp,
      totalCaptures: state.totalCaptures,
      totalContracts: state.totalContracts,
      totalDeaths: state.totalDeaths,
      bestiary: Object.keys(state.bestiary).length,
      ghostTypes: GHOST_TYPES.length,
      missionsDone: Object.keys(state.missionsDone).length,
      sanity: Math.round(state.sanity),
      active: state.active ? state.active.locationName : null,
    };
  }

  function serialize() {
    return {
      xp: state.xp,
      rank: state.rank,
      equipmentOwned: [...state.equipmentOwned],
      consumables: { ...state.consumables },
      totalCaptures: state.totalCaptures,
      totalContracts: state.totalContracts,
      totalDeaths: state.totalDeaths,
      perfectContracts: state.perfectContracts,
      ghostPhotos: state.ghostPhotos,
      photosTaken: state.photosTaken,
      identified: { ...state.identified },
      captured: { ...state.captured },
      bestiary: { ...state.bestiary },
      missionsDone: { ...state.missionsDone },
      huntsSurvived: state.huntsSurvived,
    };
  }

  function deserialize(s) {
    if (!s || typeof s !== 'object') return;
    if (typeof s.xp === 'number') state.xp = s.xp;
    if (typeof s.rank === 'string') state.rank = s.rank;
    if (Array.isArray(s.equipmentOwned)) state.equipmentOwned = [...s.equipmentOwned];
    if (s.consumables) state.consumables = { ...s.consumables };
    for (const k of ['totalCaptures', 'totalContracts', 'totalDeaths', 'perfectContracts', 'ghostPhotos', 'photosTaken', 'huntsSurvived']) {
      if (typeof s[k] === 'number') state[k] = s[k];
    }
    for (const k of ['identified', 'captured', 'bestiary', 'missionsDone']) {
      if (s[k]) state[k] = { ...s[k] };
    }
  }

  return {
    state,
    buyEquipment,
    contracts,
    refreshContracts,
    acceptContract,
    sweepRoom,
    triggerHuntEvent,
    startHunt,
    useConsumable,
    identifyGhost,
    placeTrap,
    takePhoto,
    abandonContract,
    dieInHunt,
    missions,
    tick,
    hudLine,
    summary,
    serialize,
    deserialize,
  };
}

// ---------------------------------------------------------------------------
// Extra reference data: hunter field notes (flavour for the journal)
// ---------------------------------------------------------------------------

export const FIELD_NOTES = [
  'EMF 5 plus freezing temps? Check the writing. It is probably a Shade.',
  'If the lights keep dying, the ghost is a Mare. Keep a candle lit.',
  'A Demon hunts early. Never stay below 50% sanity in its house.',
  'The Mimic always shows orbs. If you see orbs, suspect the Mimic.',
  'Salt buys you seconds. Smudge buys you a minute.',
  'Photograph the ghost room twice — the second photo is often the proof.',
  'Spirit Box voices lie about their name. Trust the evidence, not the voice.',
  'The ghost room is always the coldest room in the house.',
];


// ---------------------------------------------------------------------------
// Part 3 — EMF readings, ghost lore, cursed objects, hunter journal
// ---------------------------------------------------------------------------

// EMF reading scale: what each level means.
export const EMF_LEVELS = [
  { level: 1, desc: 'Background noise. Nothing here.', danger: 0 },
  { level: 2, desc: 'A flicker. Could be wiring.', danger: 0 },
  { level: 3, desc: 'A real reading. Something is in this room.', danger: 1 },
  { level: 4, desc: 'Strong activity. The ghost is close.', danger: 2 },
  { level: 5, desc: 'EMF 5! The ghost is right here!', danger: 3 },
];

// Cursed objects: rare finds inside haunted houses.
export const CURSED_OBJECTS = [
  { id: 'doll', name: 'Porcelain Doll', value: 300, curse: 'Moves when you blink.', desc: 'Its eyes follow you around the room.' },
  { id: 'mirror', name: 'Black Mirror', value: 500, curse: 'Shows a room that is not yours.', desc: 'Do not look into it after midnight.' },
  { id: 'music-box', name: 'Music Box', value: 250, curse: 'Plays by itself at 3 AM.', desc: 'The tune is one nobody wrote.' },
  { id: 'painting', name: 'Weeping Painting', value: 400, curse: 'The painted eyes cry real tears.', desc: 'The artist vanished the day he finished it.' },
  { id: 'ring', name: 'Cursed Ring', value: 800, curse: 'Wearing it brings bad luck.', desc: 'Three owners. Three accidents.' },
  { id: 'diary', name: 'Haunted Diary', value: 200, curse: 'New entries appear every night.', desc: 'The last entry is always tomorrow date.' },
];

// Ghost lore: field notes for each ghost type.
export const GHOST_LORE = [
  { ghost: 'spirit', note: 'The most common ghost. Died peacefully, stayed anyway.' },
  { ghost: 'wraith', note: 'Died in a car crash. Hates salt because the road was salted that winter.' },
  { ghost: 'phantom', note: 'Watches. Always watches. Never blinks.' },
  { ghost: 'poltergeist', note: 'A angry teenager, forever. Throws things when ignored.' },
  { ghost: 'banshee', note: 'Her scream was heard three streets away the night she died.' },
  { ghost: 'jinn', note: 'Older than the house. Older than the city. Be careful.' },
  { ghost: 'mare', note: 'Feeds on fear in the dark. Light is its enemy.' },
  { ghost: 'revenant', note: 'Came back for revenge. It is still looking.' },
  { ghost: 'shade', note: 'Shy in life, shy in death. Hides from crowds.' },
  { ghost: 'demon', note: 'Do not say its name three times. Do not say it once.' },
  { ghost: 'yurei', note: 'A vengeful spirit in white. Sanity drains twice as fast near it.' },
  { ghost: 'oni', note: 'A demon of the mountains. Loves an audience.' },
  { ghost: 'mimic', note: 'Copies other ghosts to hide. Always shows orbs — the tell.' },
  { ghost: 'hantu', note: 'A local legend. Moves like wind between rooms.' },
];

// Sanity effects: what happens at each sanity band.
export const SANITY_EFFECTS = [
  { min: 80, max: 100, effect: 'Clear-headed. Steady hands.', huntChance: 0.01 },
  { min: 60, max: 79, effect: 'Nervous. You hear things.', huntChance: 0.03 },
  { min: 40, max: 59, effect: 'Shaky. Shadows move at the edge of sight.', huntChance: 0.06 },
  { min: 20, max: 39, effect: 'Panicking. The ghost knows you are afraid.', huntChance: 0.12 },
  { min: 0, max: 19, effect: 'Breaking. The hunt is coming.', huntChance: 0.25 },
];

// Hunter journal prompts (flavour).
export const HUNTER_JOURNAL = [
  'Always check the coldest room first.',
  'Three evidence, then identify. Never guess early.',
  'A crucifix stops one hunt. Place it where you will run.',
  'Smudge sticks buy you sixty seconds. Use them well.',
  'If the ghost is a Mare, keep the lights on.',
  'Photograph the ghost room twice. The second photo tells the truth.',
  'Sanity pills taste awful. Take them anyway.',
];

// Pure helpers.

export function emfMeaning(level) {
  const row = EMF_LEVELS.find((e) => e.level === level);
  return row || EMF_LEVELS[0];
}

export function sanityBand(sanity) {
  const s = Math.max(0, Math.min(100, sanity));
  return SANITY_EFFECTS.find((e) => s >= e.min && s <= e.max) || SANITY_EFFECTS[0];
}

export function identifyFromEvidence(evidenceIds) {
  const matches = GHOST_TYPES.filter((g) => g.evidence.every((e) => evidenceIds.includes(e)));
  const possible = GHOST_TYPES.filter((g) => g.evidence.filter((e) => evidenceIds.includes(e)).length >= 2);
  return { exact: matches, possible };
}

export function evidenceLeftToFind(ghostId, foundIds) {
  const ghost = GHOST_TYPES.find((g) => g.id === ghostId);
  if (!ghost) return [];
  return ghost.evidence.filter((e) => !foundIds.includes(e));
}

export function ghostWeakness(ghostId) {
  const ghost = GHOST_TYPES.find((g) => g.id === ghostId);
  return ghost ? ghost.weakness : 'unknown';
}

export function huntDurationFor(ghostId) {
  const ghost = GHOST_TYPES.find((g) => g.id === ghostId);
  return ghost ? 20 + ghost.aggression * 5 : 25;
}

export function rewardEstimate(locationId, ghostId, rankMult) {
  const loc = HAUNTED_LOCATIONS.find((l) => l.id === locationId);
  const ghost = GHOST_TYPES.find((g) => g.id === ghostId);
  if (!loc || !ghost) return 0;
  return Math.round((loc.reward + ghost.reward) * (rankMult || 1));
}

export function bestiaryProgress(bestiary) {
  const found = Object.keys(bestiary).length;
  return { found, total: GHOST_TYPES.length, pct: Math.round((found / GHOST_TYPES.length) * 100) };
}

export function rankProgressHunter(xp) {
  let current = HUNTER_RANKS[0];
  let next = null;
  for (let i = 0; i < HUNTER_RANKS.length; i++) {
    if (xp >= HUNTER_RANKS[i].xpNeeded) current = HUNTER_RANKS[i];
    else { next = HUNTER_RANKS[i]; break; }
  }
  return { current, next, toNext: next ? next.xpNeeded - xp : 0 };
}

export function equipmentValue(equipmentOwned, consumables) {
  let total = 0;
  for (const id of equipmentOwned) {
    const item = GHOST_EQUIPMENT.find((e) => e.id === id);
    if (item) total += item.price;
  }
  for (const [id, qty] of Object.entries(consumables)) {
    const item = GHOST_EQUIPMENT.find((e) => e.id === id);
    if (item) total += item.price * qty;
  }
  return total;
}

export function nightBonusFor(hour) {
  return hour >= 0 && hour < 4 ? 1.25 : 1;
}

export function recommendedEquipment(ghostId) {
  const ghost = GHOST_TYPES.find((g) => g.id === ghostId);
  if (!ghost) return [];
  return ghost.evidence.map((e) => {
    const ev = EVIDENCE_TYPES.find((x) => x.id === e);
    return ev ? ev.tool : null;
  }).filter(Boolean);
}


// ---------------------------------------------------------------------------
// Part 4 — Haunted objects, séance rules, hunter gear checklist
// ---------------------------------------------------------------------------

// Haunted objects found in houses (sellable, but cursed).
export const HAUNTED_OBJECTS = [
  { id: 'cursed-doll', name: 'Cursed Doll', value: 300, risk: 2, desc: 'Its head turns when you leave the room.' },
  { id: 'old-radio', name: 'Old Radio', value: 150, risk: 1, desc: 'Plays stations that do not exist.' },
  { id: 'antique-clock', name: 'Antique Clock', value: 400, risk: 2, desc: 'Ticks backwards at midnight.' },
  { id: 'wedding-dress', name: 'Wedding Dress', value: 350, risk: 3, desc: 'The bride never wore it. She still wants to.' },
  { id: 'toy-train', name: 'Toy Train', value: 100, risk: 1, desc: 'Runs around the track by itself.' },
  { id: 'typewriter', name: 'Typewriter', value: 250, risk: 2, desc: 'Types messages from the dead.' },
  { id: 'cradle', name: 'Empty Cradle', value: 200, risk: 3, desc: 'Rocks gently. There is no wind.' },
  { id: 'chess-set', name: 'Chess Set', value: 180, risk: 1, desc: 'The pieces move overnight.' },
];

// Séance rules (flavour + a real mechanic hook).
export const SEANCE_RULES = [
  'Never hold a séance alone.',
  'Never ask the ghost its name. It will tell you anyway.',
  'If the candle goes out, leave the room.',
  'Always say goodbye before you close the circle.',
  'A séance at 3 AM is the strongest. And the most dangerous.',
];

// Hunter gear checklist (what to pack per contract).
export const GEAR_CHECKLIST = [
  { item: 'emf', why: 'Find the ghost room.' },
  { item: 'thermo', why: 'Confirm freezing temps.' },
  { item: 'spiritbox', why: 'Hear the voice.' },
  { item: 'book', why: 'Ghost writing evidence.' },
  { item: 'uv', why: 'Fingerprints on doors.' },
  { item: 'camera', why: 'Orbs and ghost photos.' },
  { item: 'dots', why: 'Silhouettes in the laser grid.' },
  { item: 'smudge', why: 'Calm the ghost for 60 seconds.' },
  { item: 'crucifix', why: 'Stop one hunt.' },
  { item: 'sanity-pills', why: 'Stay sane enough to finish.' },
  { item: 'trap', why: 'Catch the ghost once identified.' },
  { item: 'salt', why: 'Slow the ghost down.' },
];

// Ghost hunting TV shows (flavour).
export const GHOST_SHOWS = [
  'Ghost Hunters Live',
  'The Haunted Files',
  'Night Shift Paranormal',
  'The Séance Hour',
];

// Pure helpers.

export function hauntedObjectValue(objectId) {
  const o = HAUNTED_OBJECTS.find((x) => x.id === objectId);
  return o ? o.value : 0;
}

export function hauntedObjectRisk(objectId) {
  const o = HAUNTED_OBJECTS.find((x) => x.id === objectId);
  return o ? o.risk : 0;
}

export function gearChecklistFor(evidenceIds) {
  return GEAR_CHECKLIST.filter((g) => {
    if (!g.item) return false;
    const ev = EVIDENCE_TYPES.find((e) => e.tool === g.item);
    if (!ev) return ['smudge', 'crucifix', 'sanity-pills', 'trap', 'salt'].includes(g.item);
    return evidenceIds.includes(ev.id);
  });
}

export function seanceRisk(hour, ghostAggression) {
  const night = hour >= 0 && hour < 4 ? 2 : 1;
  return Math.min(10, ghostAggression * night);
}

export function cursedSalePrice(objectId, rankMult) {
  const o = HAUNTED_OBJECTS.find((x) => x.id === objectId);
  if (!o) return 0;
  return Math.round(o.value * (rankMult || 1));
}


// ---------------------------------------------------------------------------
// Part 5 — Spirit box phrases, ghost films, haunted house grades
// ---------------------------------------------------------------------------

export const SPIRIT_BOX_PHRASES = [
  'Get out.',
  'Behind you.',
  'Cold.',
  'Leave.',
  'Help me.',
  'It is dark here.',
  'Three.',
  'Do not.',
];

export const GHOST_FILMS = [
  { title: 'The Haunting', year: 1963, note: 'The classic. Still scary.' },
  { title: 'Poltergeist', year: 1982, note: 'They are here.' },
  { title: 'The Others', year: 2001, note: 'The twist changes everything.' },
  { title: 'Paranormal Activity', year: 2007, note: 'Found footage. Real fear.' },
];

export const HAUNTED_GRADES = [
  { grade: 'A', desc: 'Active haunting. Daily events.' },
  { grade: 'B', desc: 'Frequent activity. Weekly events.' },
  { grade: 'C', desc: 'Occasional activity. Monthly events.' },
  { grade: 'D', desc: 'Dormant. Mostly quiet.' },
];

export function randomSpiritPhrase(rng) {
  return SPIRIT_BOX_PHRASES[Math.floor(rng() * SPIRIT_BOX_PHRASES.length)];
}

export function hauntedGradeFor(hauntLevel) {
  if (hauntLevel >= 5) return 'A';
  if (hauntLevel >= 4) return 'B';
  if (hauntLevel >= 2) return 'C';
  return 'D';
}

export function filmForYearGhost(year) {
  return GHOST_FILMS.find((f) => f.year === year) || null;
}


// ---------------------------------------------------------------------------
// Part 6 — Hunter callsigns, ghost hunter mottos
// ---------------------------------------------------------------------------

export const HUNTER_CALLSIGNS = [
  'Ghost',
  'Spook',
  'Shadow',
  'Wraith',
  'Spectre',
  'Phantom',
];

export const HUNTER_MOTTOS = [
  'We find what hides.',
  'Three evidence. One truth.',
  'The dark is just a room without lights.',
  'Every ghost has a story. We listen.',
];

export function randomCallsign(rng) {
  return HUNTER_CALLSIGNS[Math.floor(rng() * HUNTER_CALLSIGNS.length)];
}

export function mottoForHunter(index) {
  return HUNTER_MOTTOS[index % HUNTER_MOTTOS.length];
}


// ---------------------------------------------------------------------------
// Part 7 — Ghost hunter proverbs, famous hauntings
// ---------------------------------------------------------------------------

export const GHOST_PROVERBS = [
  'The dead do not rest. They wait.',
  'Every house has a story. Some houses tell it.',
  'Fear is the ghost real weapon.',
  'Listen first. The evidence speaks.',
];

export const FAMOUS_HAUNTINGS = [
  { place: 'Amityville', year: 1975, note: 'The house on Ocean Avenue.' },
  { place: 'The Tower of London', year: 1483, note: 'The princes in the tower.' },
  { place: 'Bodmin Jail', year: 1779, note: 'Cornwall most haunted jail.' },
];

export function proverbGhost(index) {
  return GHOST_PROVERBS[index % GHOST_PROVERBS.length];
}

export function hauntingFor(place) {
  return FAMOUS_HAUNTINGS.find((h) => h.place === place) || null;
}
