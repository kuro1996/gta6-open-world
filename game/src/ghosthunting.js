export const EVIDENCE_TYPES = [
  { id: 'emf', name: 'EMF Level 5', tool: 'emf', desc: 'A spike on the EMF reader', weight: 10 },
  { id: 'freezing', name: 'Freezing Temps', tool: 'thermometer', desc: 'Breath fogs in the room', weight: 10 },
  { id: 'spirit-box', name: 'Spirit Box', tool: 'spirit-box', desc: 'A voice through the static', weight: 10 },
  { id: 'fingerprints', name: 'Fingerprints', tool: 'uv-light', desc: 'Glowing prints on the glass', weight: 10 },
  { id: 'orbs', name: 'Ghost Orbs', tool: 'camera', desc: 'Floating lights in the photo', weight: 10 },
  { id: 'writing', name: 'Ghost Writing', tool: 'book', desc: 'Words appear in the book', weight: 10 },
  { id: 'dots', name: 'D.O.T.S.', tool: 'dots', desc: 'A figure crosses the projector', weight: 10 },
  { id: 'salt', name: 'Salt Disturbed', tool: 'salt', desc: 'Footprints in the salt', weight: 10 },
];

export const GHOST_TYPES = [
  { id: 'spirit', name: 'Spirit', evidence: ['emf', 'spirit-box', 'writing'], aggression: 2, speed: 2, weakness: 'smudge', reward: 200, desc: 'The most common ghost' },
  { id: 'wraith', name: 'Wraith', evidence: ['emf', 'spirit-box', 'dots'], aggression: 3, speed: 4, weakness: 'salt', reward: 250, desc: 'Fast and hard to track' },
  { id: 'phantom', name: 'Phantom', evidence: ['spirit-box', 'fingerprints', 'dots'], aggression: 2, speed: 3, weakness: 'photo', reward: 250, desc: 'Fades when photographed' },
  { id: 'poltergeist', name: 'Poltergeist', evidence: ['spirit-box', 'fingerprints', 'writing'], aggression: 4, speed: 2, weakness: 'empty-room', reward: 300, desc: 'Throws everything it can reach' },
  { id: 'banshee', name: 'Banshee', evidence: ['fingerprints', 'orbs', 'dots'], aggression: 4, speed: 3, weakness: 'crucifix', reward: 300, desc: 'Her scream drains sanity fast' },
  { id: 'jinn', name: 'Jinn', evidence: ['emf', 'fingerprints', 'freezing'], aggression: 4, speed: 4, weakness: 'power-off', reward: 350, desc: 'Fast when the power is on' },
  { id: 'mare', name: 'Mare', evidence: ['spirit-box', 'orbs', 'writing'], aggression: 3, speed: 2, weakness: 'light', reward: 300, desc: 'Strikes in the dark' },
  { id: 'revenant', name: 'Revenant', evidence: ['orbs', 'writing', 'freezing'], aggression: 5, speed: 1, weakness: 'hiding', reward: 350, desc: 'Slow, but it never stops' },
  { id: 'shade', name: 'Shade', evidence: ['emf', 'writing', 'freezing'], aggression: 2, speed: 2, weakness: 'group', reward: 250, desc: 'Shy when watched' },
  { id: 'demon', name: 'Demon', evidence: ['fingerprints', 'writing', 'freezing'], aggression: 5, speed: 4, weakness: 'crucifix', reward: 500, desc: 'The most dangerous ghost' },
  { id: 'yurei', name: 'Yurei', evidence: ['orbs', 'freezing', 'dots'], aggression: 3, speed: 2, weakness: 'smudge', reward: 300, desc: 'Drains sanity faster than any other' },
  { id: 'oni', name: 'Oni', evidence: ['emf', 'freezing', 'dots'], aggression: 5, speed: 3, weakness: 'smudge', reward: 400, desc: 'Aggressive and strong' },
  { id: 'yokai', name: 'Yokai', evidence: ['spirit-box', 'orbs', 'dots'], aggression: 3, speed: 3, weakness: 'talking', reward: 300, desc: 'Angered by voices' },
  { id: 'mimic', name: 'Mimic', evidence: ['freezing', 'spirit-box', 'fingerprints'], aggression: 4, speed: 3, weakness: 'orbs', reward: 450, desc: 'Copies other ghosts, always shows orbs' },
];

export const HAUNTED_LOCATIONS = [
  { id: 'blackgate', name: 'Blackgate Prison', rooms: 12, reward: 400, haunt: 5, desc: 'Cold cells and old chains' },
  { id: 'royale-hotel', name: 'Royale Hotel', rooms: 10, reward: 300, haunt: 4, desc: 'A grand hotel with one locked floor' },
  { id: 'asylum', name: 'Sunnyvale Asylum', rooms: 14, reward: 500, haunt: 5, desc: 'Abandoned wards, whispering halls' },
  { id: 'manor', name: 'Willow Manor', rooms: 9, reward: 250, haunt: 3, desc: 'A dusty old manor' },
  { id: 'school', name: 'Elm Street School', rooms: 8, reward: 200, haunt: 3, desc: 'Chalk dust and cold corridors' },
  { id: 'farmhouse', name: 'Miller Farmhouse', rooms: 7, reward: 180, haunt: 2, desc: 'A quiet farmhouse, mostly' },
  { id: 'hospital', name: 'St. Mary Hospital', rooms: 11, reward: 350, haunt: 4, desc: 'Empty beds, beeping monitors' },
  { id: 'theatre', name: 'Grand Theatre', rooms: 8, reward: 220, haunt: 3, desc: 'The show never ended here' },
  { id: 'lighthouse', name: 'Cape Lighthouse', rooms: 5, reward: 280, haunt: 4, desc: 'The light still turns by itself' },
  { id: 'church', name: 'Old Chapel', rooms: 6, reward: 200, haunt: 3, desc: 'Pews and candle smoke' },
  { id: 'warehouse', name: 'Dock Warehouse', rooms: 7, reward: 150, haunt: 2, desc: 'Crates and cold drafts' },
  { id: 'cabin', name: 'Pine Cabin', rooms: 4, reward: 120, haunt: 1, desc: 'A small cabin in the woods' },
];

export const GHOST_EQUIPMENT = [
  { id: 'emf', name: 'EMF Reader', price: 0, detect: 'emf', consumable: false, desc: 'Detects electromagnetic spikes' },
  { id: 'thermometer', name: 'Thermometer', price: 30, detect: 'freezing', consumable: false, desc: 'Finds freezing temperatures' },
  { id: 'spirit-box', name: 'Spirit Box', price: 50, detect: 'spirit-box', consumable: false, desc: 'Hears voices in the static' },
  { id: 'uv-light', name: 'UV Light', price: 35, detect: 'fingerprints', consumable: false, desc: 'Reveals fingerprints' },
  { id: 'camera', name: 'Photo Camera', price: 60, detect: 'orbs', consumable: true, desc: 'Captures orbs and ghosts' },
  { id: 'book', name: 'Ghost Writing Book', price: 40, detect: 'writing', consumable: true, desc: 'The ghost writes in it' },
  { id: 'dots', name: 'D.O.T.S. Projector', price: 65, detect: 'dots', consumable: false, desc: 'Projects a dot grid' },
  { id: 'smudge', name: 'Smudge Sticks', price: 15, detect: null, consumable: true, desc: 'Calms the ghost' },
  { id: 'salt', name: 'Salt', price: 10, detect: 'salt', consumable: true, desc: 'Marks footprints, slows the ghost' },
  { id: 'crucifix', name: 'Crucifix', price: 30, detect: null, consumable: true, desc: 'Stops a hunt' },
  { id: 'candle', name: 'Candle', price: 5, detect: null, consumable: true, desc: 'Restores a little sanity' },
  { id: 'sanity-pills', name: 'Sanity Pills', price: 20, detect: null, consumable: true, desc: 'Restores a lot of sanity' },
  { id: 'trap', name: 'Ghost Trap', price: 100, detect: null, consumable: true, desc: 'Captures the ghost' },
  { id: 'flashlight', name: 'Flashlight', price: 15, detect: null, consumable: false, desc: 'Keeps the dark away' },
];

export const HUNTER_RANKS = [
  { id: 'amateur', name: 'Amateur', xpNeeded: 0, perk: 'Basic contracts' },
  { id: 'investigator', name: 'Investigator', xpNeeded: 150, perk: 'Harder locations' },
  { id: 'professional', name: 'Professional', xpNeeded: 400, perk: 'More equipment' },
  { id: 'expert', name: 'Expert', xpNeeded: 900, perk: 'High reward contracts' },
  { id: 'master', name: 'Master', xpNeeded: 1800, perk: 'Sanity drains slower' },
];

export const GHOST_MISSIONS = [
  { id: 'first-capture', name: 'First Capture', desc: 'Capture your first ghost', reward: 100 },
  { id: 'capture-5', name: 'Five Captures', desc: 'Capture 5 ghosts', reward: 300 },
  { id: 'capture-10', name: 'Ten Captures', desc: 'Capture 10 ghosts', reward: 600 },
  { id: 'identify-5', name: 'Identifier', desc: 'Correctly identify 5 ghosts', reward: 200 },
  { id: 'perfect-contract', name: 'Perfect Contract', desc: 'Finish a contract without losing sanity below 50', reward: 250 },
  { id: 'photo-ghost', name: 'Ghost Photographer', desc: 'Photograph a ghost', reward: 150 },
  { id: 'night-owl', name: 'Night Owl', desc: 'Capture a ghost at night', reward: 200 },
  { id: 'survive-hunt', name: 'Hunt Survivor', desc: 'Survive 3 hunts', reward: 300 },
  { id: 'bestiary-5', name: 'Bestiary Builder', desc: 'Identify 5 different ghosts', reward: 400 },
  { id: 'demon-capture', name: 'Demon Slayer', desc: 'Capture a demon', reward: 800 },
];

export const ROOM_NAMES = [
  'Kitchen', 'Living Room', 'Bedroom', 'Bathroom', 'Basement', 'Attic', 'Hallway',
  'Garage', 'Nursery', 'Library', 'Dining Room', 'Cellar', 'Office', 'Laundry Room',
  'Pantry', 'Guest Room', 'Study', 'Workshop', 'Balcony', 'Storage Room',
];

export const HUNT_EVENTS = [
  { id: 'lights-flicker', name: 'Lights Flicker', sanity: -5, desc: 'The lights die for a second' },
  { id: 'whisper', name: 'Whisper', sanity: -8, desc: 'A voice whispers your name' },
  { id: 'door-slam', name: 'Door Slam', sanity: -10, desc: 'Every door slams at once' },
  { id: 'cold-spot', name: 'Cold Spot', sanity: -6, desc: 'The air turns freezing' },
  { id: 'shadow', name: 'Shadow Figure', sanity: -12, desc: 'A figure stands in the corner' },
  { id: 'scream', name: 'Distant Scream', sanity: -15, desc: 'A scream echoes through the house' },
  { id: 'objects-move', name: 'Objects Move', sanity: -7, desc: 'Chairs slide across the floor' },
  { id: 'radio-static', name: 'Radio Static', sanity: -4, desc: 'The radio crackles to life' },
];

export const FIELD_NOTES = [
  'The ghost always starts in one room and stays near it.',
  'Three pieces of evidence are enough to name the ghost.',
  'Smudge sticks buy you a minute of calm.',
  'Never let your sanity hit zero.',
  'Orbs can appear anywhere, not just in the ghost room.',
  'A crucifix placed well can end a hunt early.',
  'The mimic always shows orbs, even though they are not its evidence.',
  'Photograph the ghost for a bonus and proof.',
];

export const EMF_LEVELS = [
  { level: 1, desc: 'No activity', danger: 0 },
  { level: 2, desc: 'Faint activity', danger: 1 },
  { level: 3, desc: 'Moderate activity', danger: 2 },
  { level: 4, desc: 'Strong activity', danger: 3 },
  { level: 5, desc: 'Extreme activity', danger: 5 },
];

export const CURSED_OBJECTS = [
  { id: 'doll', name: 'Porcelain Doll', value: 150, curse: 'whispers at night', desc: 'Its eyes follow you' },
  { id: 'mirror', name: 'Black Mirror', value: 300, curse: 'shows the wrong reflection', desc: 'Do not look too long' },
  { id: 'music-box', name: 'Music Box', value: 200, curse: 'plays by itself', desc: 'A tune nobody taught it' },
  { id: 'ring', name: 'Cursed Ring', value: 250, curse: 'cold to the touch', desc: 'It will not come off easily' },
  { id: 'painting', name: 'Haunted Painting', value: 400, curse: 'the face changes', desc: 'The eyes move when you blink' },
  { id: 'tarot', name: 'Tarot Deck', value: 120, curse: 'always draws death', desc: 'Shuffles itself' },
];

export const GHOST_LORE = [
  { ghost: 'spirit', note: 'The first ghost every hunter meets.' },
  { ghost: 'wraith', note: 'It fears salt more than anything.' },
  { ghost: 'phantom', note: 'It vanishes the moment you take its photo.' },
  { ghost: 'poltergeist', note: 'It throws things when it is bored.' },
  { ghost: 'banshee', note: 'Her scream is a warning, not an attack.' },
  { ghost: 'jinn', note: 'It moves faster with the power on.' },
  { ghost: 'mare', note: 'It hunts in the dark and hates the light.' },
  { ghost: 'revenant', note: 'Slow, but it never gives up.' },
  { ghost: 'shade', note: 'It hides when too many people watch.' },
  { ghost: 'demon', note: 'The most dangerous ghost of all.' },
  { ghost: 'yurei', note: 'It drains sanity with every breath.' },
  { ghost: 'oni', note: 'A brute that smashes through walls.' },
  { ghost: 'yokai', note: 'It gets angry when you talk too much.' },
  { ghost: 'mimic', note: 'It copies other ghosts. Trust the orbs.' },
];

export const SANITY_EFFECTS = [
  { min: 80, max: 100, effect: 'Calm and focused', huntChance: 0.01 },
  { min: 60, max: 79, effect: 'Nervous', huntChance: 0.02 },
  { min: 40, max: 59, effect: 'Shaken', huntChance: 0.03 },
  { min: 20, max: 39, effect: 'Terrified', huntChance: 0.05 },
  { min: 0, max: 19, effect: 'Barely holding on', huntChance: 0.1 },
];

export const HUNTER_JOURNAL = [
  'Day one: the house was quiet. Too quiet.',
  'The EMF spiked in the basement again.',
  'I heard my name in the static tonight.',
  'The doll moved. I know it moved.',
  'Smudge sticks are worth every cent.',
  'The mimic fooled me once. Never again.',
  'A photo of the ghost pays for the whole trip.',
];

export const HAUNTED_OBJECTS = [
  { id: 'doll', name: 'Porcelain Doll', value: 150, risk: 3, desc: 'Its eyes follow you' },
  { id: 'mirror', name: 'Black Mirror', value: 300, risk: 5, desc: 'Do not look too long' },
  { id: 'music-box', name: 'Music Box', value: 200, risk: 2, desc: 'Plays by itself' },
  { id: 'ring', name: 'Cursed Ring', value: 250, risk: 4, desc: 'Cold to the touch' },
  { id: 'painting', name: 'Haunted Painting', value: 400, risk: 5, desc: 'The face changes' },
  { id: 'tarot', name: 'Tarot Deck', value: 120, risk: 2, desc: 'Always draws death' },
  { id: 'vase', name: 'Cracked Vase', value: 80, risk: 1, desc: 'Hums when the wind blows' },
  { id: 'clock', name: 'Stopped Clock', value: 180, risk: 3, desc: 'Always shows midnight' },
];

export const SEANCE_RULES = [
  'Never speak to the dead after midnight.',
  'Always keep a candle lit during the seance.',
  'Do not break the circle.',
  'Thank the spirit before you leave.',
  'If the planchette spins, end the session.',
];

export const GEAR_CHECKLIST = [
  { item: 'emf', why: 'Detects EMF evidence' },
  { item: 'thermometer', why: 'Finds freezing temperatures' },
  { item: 'spirit-box', why: 'Hears spirit box voices' },
  { item: 'uv-light', why: 'Reveals fingerprints' },
  { item: 'camera', why: 'Captures orbs and ghost photos' },
  { item: 'book', why: 'Collects ghost writing' },
  { item: 'dots', why: 'Shows D.O.T.S. figures' },
  { item: 'smudge', why: 'Calms the ghost during a hunt' },
  { item: 'salt', why: 'Slows the ghost and marks footprints' },
  { item: 'crucifix', why: 'Stops a hunt' },
  { item: 'candle', why: 'Restores sanity' },
  { item: 'trap', why: 'Captures the ghost' },
];

export const GHOST_SHOWS = [
  'Ghost Hunters Live',
  'Paranormal Files',
  'The Haunted Hour',
  'Spirits After Dark',
];

export const SPIRIT_BOX_PHRASES = [
  'Leave...',
  'Behind you.',
  'Cold.',
  'Get out.',
  'Help me.',
  'It is here.',
  'Do not trust it.',
  'Run.',
];

export const GHOST_FILMS = [
  { title: 'The Haunting', year: 1963, note: 'A classic haunted house film' },
  { title: 'Poltergeist', year: 1982, note: 'The TV people are here' },
  { title: 'The Conjuring', year: 2013, note: 'Based on a real case' },
  { title: 'Paranormal Activity', year: 2007, note: 'Found footage that started a craze' },
];

export const HAUNTED_GRADES = [
  { grade: 'A', desc: 'Extremely haunted' },
  { grade: 'B', desc: 'Very haunted' },
  { grade: 'C', desc: 'Moderately haunted' },
  { grade: 'D', desc: 'Mildly haunted' },
];

export const HUNTER_CALLSIGNS = ['Ghost', 'Specter', 'Warden', 'Lantern', 'Rook', 'Echo'];

export const HUNTER_MOTTOS = [
  'We go in so you do not have to.',
  'Every ghost has a name.',
  'Fear is just data.',
  'The dark is only dark until you look.',
];

export const GHOST_PROVERBS = [
  'The dead speak to those who listen.',
  'A haunted house is just a house with history.',
  'Salt keeps more than food safe.',
  'Never hunt alone after midnight.',
];

export const FAMOUS_HAUNTINGS = [
  { place: 'Amityville House', year: 1974, note: 'The most famous haunting in America' },
  { place: 'Tower of London', year: 1536, note: 'Ghosts of queens walk the halls' },
  { place: 'Bermuda Triangle', year: 1945, note: 'Ships and planes vanish without a trace' },
];

function ghostById(id) {
  return GHOST_TYPES.find((g) => g.id === id);
}

function locationById(id) {
  return HAUNTED_LOCATIONS.find((l) => l.id === id);
}

function equipmentById(id) {
  return GHOST_EQUIPMENT.find((e) => e.id === id);
}

function rankById(id) {
  return HUNTER_RANKS.find((r) => r.id === id) || HUNTER_RANKS[0];
}

function rankIndex(id) {
  const i = HUNTER_RANKS.findIndex((r) => r.id === id);
  return i < 0 ? 0 : i;
}

export function ghostByEvidence(evidence) {
  return GHOST_TYPES.filter((g) => g.evidence.every((e) => evidence.includes(e)));
}

export function possibleGhosts(evidence) {
  return GHOST_TYPES.filter((g) => {
    const shared = g.evidence.filter((e) => evidence.includes(e));
    const contradicted = evidence.some((e) => !g.evidence.includes(e) && EVIDENCE_TYPES.some((t) => t.id === e));
    return shared.length >= 1 && !contradicted;
  });
}

export function emfMeaning(level) {
  return EMF_LEVELS.find((l) => l.level === level) || EMF_LEVELS[0];
}

export function sanityBand(sanity) {
  return SANITY_EFFECTS.find((b) => sanity >= b.min && sanity <= b.max) || SANITY_EFFECTS[0];
}

export function identifyFromEvidence(evidence) {
  const exact = ghostByEvidence(evidence);
  const possible = GHOST_TYPES.filter((g) => {
    if (exact.includes(g)) return false;
    const shared = g.evidence.filter((e) => evidence.includes(e)).length;
    return shared >= 2;
  });
  return { exact, possible };
}

export function evidenceLeftToFind(ghostId, found) {
  const g = ghostById(ghostId);
  if (!g) return [];
  return g.evidence.filter((e) => !found.includes(e));
}

export function ghostWeakness(ghostId) {
  const g = ghostById(ghostId);
  return g ? g.weakness : 'unknown';
}

export function huntDurationFor(ghostId) {
  const g = ghostById(ghostId);
  if (!g) return 25;
  return 20 + g.aggression * 5;
}

export function rewardEstimate(locationId, ghostId, rankMult) {
  const loc = locationById(locationId);
  const ghost = ghostById(ghostId);
  if (!loc || !ghost) return 0;
  return Math.round((loc.reward + ghost.reward) * (rankMult || 1));
}

export function bestiaryProgress(bestiary) {
  const found = Object.keys(bestiary).filter((k) => bestiary[k]).length;
  const total = GHOST_TYPES.length;
  return { found, total, pct: Math.round((found / total) * 100) };
}

export function rankProgressHunter(xp) {
  let current = HUNTER_RANKS[0];
  let next = null;
  for (let i = 0; i < HUNTER_RANKS.length; i++) {
    if (xp >= HUNTER_RANKS[i].xpNeeded) current = HUNTER_RANKS[i];
    else { next = HUNTER_RANKS[i]; break; }
  }
  const needed = next ? Math.max(0, next.xpNeeded - xp) : 0;
  return { current, next, needed };
}

export function equipmentValue(owned, consumables) {
  let sum = 0;
  for (const id of owned) {
    const item = equipmentById(id);
    if (item) sum += item.price;
  }
  for (const id of Object.keys(consumables || {})) {
    const item = equipmentById(id);
    if (item) sum += item.price * consumables[id];
  }
  return sum;
}

export function nightBonusFor(hour) {
  return hour >= 0 && hour < 4 ? 1.25 : 1;
}

export function recommendedEquipment(ghostId) {
  const g = ghostById(ghostId);
  if (!g) return [];
  const tools = [];
  for (const evId of g.evidence) {
    const ev = EVIDENCE_TYPES.find((e) => e.id === evId);
    if (ev) tools.push(ev.tool);
  }
  return tools;
}

export function hauntedObjectValue(objectId) {
  const o = HAUNTED_OBJECTS.find((x) => x.id === objectId);
  return o ? o.value : 0;
}

export function hauntedObjectRisk(objectId) {
  const o = HAUNTED_OBJECTS.find((x) => x.id === objectId);
  return o ? o.risk : 0;
}

export function gearChecklistFor(evidence) {
  return GEAR_CHECKLIST.filter((g) => {
    if (g.item === 'smudge' || g.item === 'salt' || g.item === 'crucifix' || g.item === 'candle' || g.item === 'trap') return true;
    const ev = EVIDENCE_TYPES.find((e) => e.tool === g.item);
    return ev && evidence.includes(ev.id);
  });
}

export function seanceRisk(hour, aggression) {
  const night = hour >= 0 && hour < 4 ? 2 : 1;
  return Math.min(10, aggression * night);
}

export function cursedSalePrice(objectId, rankMult) {
  const o = CURSED_OBJECTS.find((x) => x.id === objectId);
  if (!o) return 0;
  return Math.round(o.value * (rankMult || 1));
}

export function randomSpiritPhrase(rng) {
  const r = rng || Math.random;
  return SPIRIT_BOX_PHRASES[Math.floor(r() * SPIRIT_BOX_PHRASES.length)];
}

export function hauntedGradeFor(haunt) {
  if (haunt >= 5) return 'A';
  if (haunt >= 4) return 'B';
  if (haunt >= 2) return 'C';
  return 'D';
}

export function filmForYearGhost(year) {
  return GHOST_FILMS.find((f) => f.year === year) || null;
}

export function randomCallsign(rng) {
  const r = rng || Math.random;
  return HUNTER_CALLSIGNS[Math.floor(r() * HUNTER_CALLSIGNS.length)];
}

export function mottoForHunter(index) {
  return HUNTER_MOTTOS[((index % HUNTER_MOTTOS.length) + HUNTER_MOTTOS.length) % HUNTER_MOTTOS.length];
}

export function proverbGhost(index) {
  return GHOST_PROVERBS[((index % GHOST_PROVERBS.length) + GHOST_PROVERBS.length) % GHOST_PROVERBS.length];
}

export function hauntingFor(place) {
  return FAMOUS_HAUNTINGS.find((h) => h.place === place) || null;
}

export function createGhostHuntingSystem(deps = {}) {
  const rng = typeof deps.rng === 'function' ? deps.rng : Math.random;
  const getHour = typeof deps.getHour === 'function' ? deps.getHour : () => 12;
  const getDay = typeof deps.getDay === 'function' ? deps.getDay : () => 1;
  const getCash = typeof deps.getCash === 'function' ? deps.getCash : () => 0;
  const addCash = typeof deps.addCash === 'function' ? deps.addCash : () => {};
  const log = typeof deps.log === 'function' ? deps.log : () => {};
  const getPlayerPos = typeof deps.getPlayerPos === 'function' ? deps.getPlayerPos : () => ({ x: 0, z: 0 });

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

  function refreshRank() {
    state.rank = rankProgressHunter(state.xp).current.id;
  }

  function gainXp(amount) {
    state.xp += amount;
    refreshRank();
  }

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const mission = GHOST_MISSIONS.find((m) => m.id === id);
    if (!mission) return;
    let done = false;
    if (id === 'first-capture') done = state.totalCaptures >= 1;
    else if (id === 'capture-5') done = state.totalCaptures >= 5;
    else if (id === 'capture-10') done = state.totalCaptures >= 10;
    else if (id === 'identify-5') done = Object.values(state.identified).reduce((s, n) => s + n, 0) >= 5;
    else if (id === 'perfect-contract') done = state.perfectContracts >= 1;
    else if (id === 'photo-ghost') done = state.ghostPhotos >= 1;
    else if (id === 'night-owl') done = (state.nightOwlCaptures || 0) >= 1;
    else if (id === 'survive-hunt') done = state.huntsSurvived >= 3;
    else if (id === 'bestiary-5') done = bestiaryProgress(state.bestiary).found >= 5;
    else if (id === 'demon-capture') done = (state.captured.demon || 0) >= 1;
    if (!done) return;
    state.missionsDone[id] = true;
    addCash(mission.reward);
    log(`Mission complete: ${mission.name}`);
  }

  function makeContract() {
    const cap = Math.min(5, 1 + rankIndex(state.rank));
    const pool = HAUNTED_LOCATIONS.filter((l) => l.haunt <= cap);
    const loc = pool.length ? pool[Math.floor(rng() * pool.length)] : HAUNTED_LOCATIONS[0];
    const ghost = GHOST_TYPES[Math.floor(rng() * GHOST_TYPES.length)];
    const roomCount = Math.min(loc.rooms, 8);
    const ghostRoomIdx = Math.floor(rng() * roomCount);
    const rooms = [];
    for (let i = 0; i < roomCount; i++) {
      rooms.push({ name: ROOM_NAMES[Math.floor(rng() * ROOM_NAMES.length)], searched: false, ghostRoom: i === ghostRoomIdx });
    }
    return {
      id: `contract-${Date.now()}-${Math.floor(rng() * 100000)}`,
      locationId: loc.id,
      locationName: loc.name,
      ghostId: ghost.id,
      ghostName: ghost.name,
      reward: loc.reward + ghost.reward,
      rooms,
      ghostRoomIdx,
      status: 'offered',
      createdDay: getDay(),
    };
  }

  function drainSanity(amount) {
    state.sanity = Math.max(0, Math.min(100, state.sanity - amount));
    if (state.sanity <= 0 && state.active && !state.active.huntActive) {
      startHuntInternal();
    }
  }

  function startHuntInternal() {
    const active = state.active;
    if (!active) return;
    active.huntActive = true;
    active.huntTimer = huntDurationFor(active.ghostId);
    log('A hunt has begun!');
  }

  function runCapture() {
    const active = state.active;
    const ghost = ghostById(active.ghostId);
    state.totalCaptures += 1;
    state.captured[ghost.id] = (state.captured[ghost.id] || 0) + 1;
    state.totalContracts += 1;
    const hour = getHour();
    if (hour >= 0 && hour < 4) {
      state.nightOwlCaptures = (state.nightOwlCaptures || 0) + 1;
    }
    if (state.sanity >= 50) state.perfectContracts += 1;
    const reward = Math.round(active.reward * nightBonusFor(hour));
    addCash(reward);
    gainXp(100);
    log(`Captured ${ghost.name}! Earned ${reward}`);
    state.active = null;
    state.sanity = 100;
    state.evidenceFound = [];
    checkMission('first-capture');
    checkMission('capture-5');
    checkMission('capture-10');
    checkMission('perfect-contract');
    checkMission('night-owl');
    checkMission('demon-capture');
    return { ok: true, captured: true, ghost, reward };
  }

  const system = {
    state,

    buyEquipment(itemId, qty) {
      const item = equipmentById(itemId);
      if (!item) return { ok: false, error: 'unknown item' };
      if (!item.consumable && state.equipmentOwned.includes(itemId)) {
        return { ok: false, error: 'already owned' };
      }
      const quantity = item.consumable ? Math.max(1, Math.min(10, qty || 1)) : 1;
      const total = item.price * quantity;
      if (getCash() < total) return { ok: false, error: 'not enough cash' };
      addCash(-total);
      if (item.consumable) {
        state.consumables[itemId] = (state.consumables[itemId] || 0) + quantity;
        if (item.detect) state.equipmentOwned.push(itemId);
      } else {
        state.equipmentOwned.push(itemId);
      }
      log(`Bought ${item.name}`);
      return { ok: true, item, qty: quantity };
    },

    contracts() {
      if (state.contractDay !== getDay() || state.contracts.length === 0) this.refreshContracts();
      return state.contracts;
    },

    refreshContracts() {
      state.contracts = [];
      const count = 3 + rankIndex(state.rank);
      for (let i = 0; i < count; i++) state.contracts.push(makeContract());
      state.contractDay = getDay();
      return state.contracts;
    },

    acceptContract(contractId) {
      const contract = state.contracts.find((c) => c.id === contractId);
      if (!contract) return { ok: false, error: 'contract not offered' };
      if (state.active) return { ok: false, error: 'contract already active' };
      const hour = getHour();
      const reward = Math.round(contract.reward * nightBonusFor(hour));
      const active = {
        contractId: contract.id,
        locationId: contract.locationId,
        locationName: contract.locationName,
        ghostId: contract.ghostId,
        ghostName: contract.ghostName,
        reward,
        rooms: contract.rooms.map((r) => ({ ...r })),
        ghostRoomIdx: contract.ghostRoomIdx,
        evidence: [],
        huntActive: false,
        huntTimer: 0,
        smudgeTimer: 0,
        crucifixUsed: false,
        startedHour: hour,
        photos: 0,
      };
      state.contracts = state.contracts.filter((c) => c.id !== contractId);
      state.active = active;
      state.sanity = 100;
      state.evidenceFound = [];
      state.contractsToday += 1;
      log(`Accepted contract at ${contract.locationName}`);
      return { ok: true, active };
    },

    sweepRoom(roomIdx, toolId) {
      const active = state.active;
      if (!active) return { ok: false, error: 'no active contract' };
      if (typeof roomIdx !== 'number' || roomIdx < 0 || roomIdx >= active.rooms.length) {
        return { ok: false, error: 'invalid room' };
      }
      const tool = equipmentById(toolId);
      if (!tool) return { ok: false, error: 'unknown tool' };
      if (!state.equipmentOwned.includes(toolId)) return { ok: false, error: 'tool not owned' };
      const room = active.rooms[roomIdx];
      const ghost = ghostById(active.ghostId);
      let found = null;
      let reading = 'No activity here.';
      if (tool.detect) {
        const inGhostRoom = roomIdx === active.ghostRoomIdx;
        const matches = ghost.evidence.includes(tool.detect);
        if (matches && inGhostRoom && !active.evidence.includes(tool.detect)) {
          found = tool.detect;
        } else if (tool.detect === 'orbs' && !active.evidence.includes('orbs') && rng() < 0.15) {
          found = 'orbs';
        }
        if (found) {
          active.evidence.push(found);
          state.evidenceFound.push(found);
          reading = `Evidence found: ${found}`;
        } else if (matches && inGhostRoom) {
          reading = 'The readings are strong here.';
        } else {
          reading = 'Faint readings only.';
        }
      }
      room.searched = true;
      if (roomIdx === active.ghostRoomIdx) drainSanity(2 + ghost.aggression);
      if (rng() < 0.35) this.triggerHuntEvent();
      if (state.sanity <= 0 && active && !active.huntActive) startHuntInternal();
      return { ok: true, room: room.name, found, reading, evidence: [...active.evidence], sanity: Math.round(state.sanity) };
    },

    triggerHuntEvent() {
      const event = HUNT_EVENTS[Math.floor(rng() * HUNT_EVENTS.length)];
      let drain = -event.sanity;
      const active = state.active;
      if (active && active.ghostId === 'yurei') drain *= 2;
      state.sanity = Math.max(0, Math.min(100, state.sanity - drain));
      log(`Hunt event: ${event.name}`);
      return { ok: true, event, sanity: Math.round(state.sanity) };
    },

    startHunt() {
      if (!state.active) return { ok: false, error: 'no active contract' };
      if (state.active.huntActive) return { ok: false, error: 'hunt already active' };
      startHuntInternal();
      return { ok: true, duration: state.active.huntTimer };
    },

    useConsumable(itemId) {
      if ((state.consumables[itemId] || 0) <= 0) return { ok: false, error: 'none held' };
      const active = state.active;
      if (itemId === 'trap') {
        state.consumables[itemId] -= 1;
        return this.placeTrap();
      }
      state.consumables[itemId] -= 1;
      let effect = 'Used.';
      if (itemId === 'smudge') {
        if (active) {
          active.smudgeTimer = 60;
          active.huntActive = false;
        }
        effect = 'The ghost calms down for a minute.';
      } else if (itemId === 'salt') {
        if (active) active.huntTimer = Math.max(0, active.huntTimer - 10);
        effect = 'Salt slows the hunt.';
      } else if (itemId === 'crucifix') {
        if (active) {
          if (active.huntActive) {
            active.huntActive = false;
            active.crucifixUsed = true;
            effect = 'The crucifix ends the hunt.';
          } else {
            active.crucifixPlaced = true;
            effect = 'Crucifix placed.';
          }
        }
      } else if (itemId === 'candle') {
        state.sanity = Math.min(100, state.sanity + 5);
        effect = 'Sanity restored a little.';
      } else if (itemId === 'sanity-pills') {
        state.sanity = Math.min(100, state.sanity + 25);
        effect = 'Sanity restored a lot.';
      } else {
        return { ok: false, error: 'cannot use this item' };
      }
      return { ok: true, effect };
    },

    identifyGhost(ghostId) {
      const active = state.active;
      if (!active) return { ok: false, error: 'no active contract' };
      if (active.evidence.length < 3) return { ok: false, error: 'need three evidence' };
      const ghost = ghostById(ghostId);
      if (!ghost) return { ok: false, error: 'unknown ghost' };
      if (ghostId === active.ghostId) {
        active.identifiedGuess = ghostId;
        active.identifiedCorrect = true;
        state.identified[ghostId] = (state.identified[ghostId] || 0) + 1;
        state.bestiary[ghostId] = true;
        gainXp(60);
        log(`${ghost.name}: ${ghost.desc} Weakness: ${ghost.weakness}`);
        checkMission('identify-5');
        checkMission('bestiary-5');
        return { ok: true, correct: true, ghost };
      }
      drainSanity(10);
      log('Wrong identification!');
      return { ok: true, correct: false, hint: 'That does not match the evidence.' };
    },

    placeTrap() {
      const active = state.active;
      if (!active) return { ok: false, error: 'no active contract' };
      if (!active.identifiedCorrect) return { ok: false, error: 'identify the ghost first' };
      if (active.huntActive) return { ok: false, error: 'cannot place a trap during a hunt' };
      const inGhostRoom = active.lastRoom === active.ghostRoomIdx;
      const chance = inGhostRoom ? 0.95 : 0.6;
      if (rng() >= chance) {
        log('Trap failed!');
        return { ok: true, captured: false, reason: 'wrong-room' };
      }
      return runCapture();
    },

    takePhoto(roomIdx) {
      const active = state.active;
      if (!active) return { ok: false, error: 'no active contract' };
      if (!state.equipmentOwned.includes('camera')) return { ok: false, error: 'no camera' };
      state.photosTaken += 1;
      active.photos += 1;
      const ghost = ghostById(active.ghostId);
      let subject = 'nothing';
      let xp = 0;
      if (roomIdx === active.ghostRoomIdx && rng() < 0.4) {
        subject = 'ghost';
        state.ghostPhotos += 1;
        addCash(100);
        gainXp(40);
        xp = 40;
        checkMission('photo-ghost');
      } else if (rng() < 0.5) {
        subject = 'orbs';
        if (ghost.evidence.includes('orbs') && !active.evidence.includes('orbs')) {
          active.evidence.push('orbs');
          state.evidenceFound.push('orbs');
        }
      }
      return { ok: true, subject, xp };
    },

    abandonContract() {
      if (!state.active) return { ok: false, error: 'no active contract' };
      state.active = null;
      state.sanity = 100;
      state.evidenceFound = [];
      log('Contract abandoned');
      return { ok: true };
    },

    dieInHunt() {
      state.totalDeaths += 1;
      state.huntsSurvived = 0;
      state.active = null;
      state.sanity = 100;
      state.evidenceFound = [];
      state.consumables = {};
      log('You died in the hunt');
      return { ok: true, deaths: state.totalDeaths };
    },

    missions() {
      return GHOST_MISSIONS.map((m) => ({ ...m, done: !!state.missionsDone[m.id] }));
    },

    tick(dt) {
      const day = getDay();
      if (day !== state.day) {
        state.day = day;
        state.contractsToday = 0;
        this.refreshContracts();
      }
      const active = state.active;
      if (!active) return;
      const hour = getHour();
      const night = hour >= 0 && hour < 4;
      let rate = night ? 0.3 * 1.5 : 0.3;
      if (active.ghostId === 'yurei') rate = 0.5;
      if (state.rank === 'master') rate *= 0.7;
      state.sanity = Math.max(0, state.sanity - rate * (dt || 0));
      if (active.smudgeTimer > 0) active.smudgeTimer = Math.max(0, active.smudgeTimer - (dt || 0));
      if (active.huntActive) {
        active.huntTimer -= dt || 0;
        state.sanity = Math.max(0, state.sanity - 1.5 * (dt || 0));
        if (active.huntTimer <= 0) {
          if (active.crucifixPlaced) {
            active.huntActive = false;
            active.crucifixPlaced = false;
            log('The crucifix ended the hunt');
          } else {
            this.dieInHunt();
            return;
          }
        }
      } else {
        if (state.sanity <= 25 && rng() < 0.05 * (dt || 0)) startHuntInternal();
        if (state.sanity <= 0) startHuntInternal();
      }
    },

    hudLine() {
      if (!state.active && state.totalCaptures === 0) return '';
      const rank = rankById(state.rank);
      if (!state.active) return `Ghost Hunter ${rank.name} | ${state.totalCaptures} captured`;
      const active = state.active;
      let line = `Ghost ${active.locationName} | sanity ${Math.round(state.sanity)}% | evidence ${active.evidence.length}/3`;
      if (active.huntActive) line += ' | HUNTING!';
      return line;
    },

    summary() {
      return {
        xp: state.xp,
        rank: state.rank,
        totalCaptures: state.totalCaptures,
        totalContracts: state.totalContracts,
        totalDeaths: state.totalDeaths,
        sanity: Math.round(state.sanity),
        bestiary: bestiaryProgress(state.bestiary).found,
        missionsDone: Object.keys(state.missionsDone).length,
      };
    },

    serialize() {
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
    },

    deserialize(saved) {
      if (!saved || typeof saved !== 'object') return;
      if (typeof saved.xp === 'number') state.xp = saved.xp;
      if (typeof saved.rank === 'string') state.rank = saved.rank;
      if (Array.isArray(saved.equipmentOwned)) state.equipmentOwned = [...saved.equipmentOwned];
      if (saved.consumables && typeof saved.consumables === 'object') state.consumables = { ...saved.consumables };
      const numeric = ['totalCaptures', 'totalContracts', 'totalDeaths', 'perfectContracts', 'ghostPhotos', 'photosTaken', 'huntsSurvived'];
      for (const key of numeric) {
        if (typeof saved[key] === 'number') state[key] = saved[key];
      }
      for (const key of ['identified', 'captured', 'bestiary', 'missionsDone']) {
        if (saved[key] && typeof saved[key] === 'object') state[key] = { ...saved[key] };
      }
    },
  };

  return system;
}
