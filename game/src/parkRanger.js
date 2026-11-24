export const RANGER_PATROLS = [
  { id: 'meadow', name: 'Meadow Loop', difficulty: 1, value: 40, wildlife: 6, incidents: 2, terrain: 'meadow', desc: 'An easy loop through the flower meadows.' },
  { id: 'lake', name: 'Lake Shore', difficulty: 2, value: 60, wildlife: 8, incidents: 3, terrain: 'water', desc: 'The shore path past the beaver dams.' },
  { id: 'forest', name: 'Deep Forest', difficulty: 2, value: 70, wildlife: 9, incidents: 4, terrain: 'woods', desc: 'Dark pines where bears den.' },
  { id: 'ridge', name: 'High Ridge', difficulty: 3, value: 90, wildlife: 5, incidents: 3, terrain: 'rock', desc: 'A steep climb with eagle views.' },
  { id: 'canyon', name: 'Canyon Trail', difficulty: 3, value: 100, wildlife: 4, incidents: 4, terrain: 'rock', desc: 'Narrow ledges above the river.' },
  { id: 'marsh', name: 'Marsh Boardwalk', difficulty: 2, value: 55, wildlife: 7, incidents: 3, terrain: 'wet', desc: 'Boardwalks over the heron marsh.' },
  { id: 'camp', name: 'Campground', difficulty: 1, value: 45, wildlife: 3, incidents: 2, terrain: 'meadow', desc: 'Checking campfires and campers.' },
  { id: 'peak', name: 'Summit Trail', difficulty: 4, value: 120, wildlife: 4, incidents: 2, terrain: 'rock', desc: 'The hardest climb in the park.' },
  { id: 'river', name: 'River Walk', difficulty: 2, value: 65, wildlife: 8, incidents: 3, terrain: 'water', desc: 'The otter river, fast and cold.' },
  { id: 'grove', name: 'Old Grove', difficulty: 3, value: 95, wildlife: 9, incidents: 3, terrain: 'woods', desc: 'Ancient trees, quiet and watchful.' },
];

export const RANGER_INCIDENTS = [
  { id: 'lost-hiker', name: 'Lost Hiker', difficulty: 1, pay: 35, heat: 0, desc: 'A hiker off the trail and out of water.' },
  { id: 'injured-deer', name: 'Injured Deer', difficulty: 2, pay: 60, heat: 0, desc: 'A deer with a broken leg by the path.' },
  { id: 'campfire', name: 'Unattended Campfire', difficulty: 1, pay: 40, heat: 0, desc: 'A campfire left burning with nobody near.' },
  { id: 'poacher', name: 'Poacher', difficulty: 3, pay: 120, heat: 2, desc: 'A poacher with snares in the forest.' },
  { id: 'bear-camp', name: 'Bear in Camp', difficulty: 3, pay: 110, heat: 1, desc: 'A bear raiding the campground bins.' },
  { id: 'brush-fire', name: 'Brush Fire', difficulty: 3, pay: 130, heat: 0, desc: 'Dry brush catching fire on the ridge.' },
  { id: 'fallen-climber', name: 'Fallen Climber', difficulty: 3, pay: 140, heat: 0, desc: 'A climber down on the canyon ledge.' },
  { id: 'flooded-trail', name: 'Flooded Trail', difficulty: 2, pay: 70, heat: 0, desc: 'The river trail is under water.' },
  { id: 'orphan-cub', name: 'Orphan Cub', difficulty: 2, pay: 80, heat: 0, desc: 'A bear cub alone, crying for its mother.' },
  { id: 'litter-dump', name: 'Litter Dump', difficulty: 1, pay: 35, heat: 1, desc: 'A pile of dumped rubbish in the woods.' },
  { id: 'sick-fox', name: 'Sick Fox', difficulty: 2, pay: 65, heat: 0, desc: 'A fox that can barely stand.' },
  { id: 'storm-rescue', name: 'Storm Rescue', difficulty: 4, pay: 150, heat: 0, desc: 'Hikers caught out in a mountain storm.' },
];

export const RANGER_WILDLIFE = [
  { id: 'deer', name: 'Deer', zone: 'meadow', count: 12, desc: 'Grazing herds at dawn.' },
  { id: 'eagle', name: 'Eagle', zone: 'ridge', count: 5, desc: 'Circling high over the ridge.' },
  { id: 'otter', name: 'Otter', zone: 'river', count: 6, desc: 'Playing in the fast river.' },
  { id: 'bear', name: 'Bear', zone: 'forest', count: 4, desc: 'Foraging in the deep forest.' },
  { id: 'heron', name: 'Heron', zone: 'marsh', count: 8, desc: 'Standing still in the shallows.' },
  { id: 'fox', name: 'Fox', zone: 'grove', count: 7, desc: 'Red shadows in the old grove.' },
  { id: 'goat', name: 'Mountain Goat', zone: 'peak', count: 6, desc: 'White goats on the high ledges.' },
  { id: 'beaver', name: 'Beaver', zone: 'lake', count: 5, desc: 'Building dams on the lake shore.' },
  { id: 'owl', name: 'Owl', zone: 'forest', count: 9, desc: 'Silent wings in the night pines.' },
  { id: 'bighorn', name: 'Bighorn Sheep', zone: 'canyon', count: 3, desc: 'Rams on the canyon rims.' },
];

export const RANGER_UPGRADES = [
  { id: 'radio', name: 'Park Radio', cost: 100, desc: 'A radio that reaches every corner of the park.', effect: 'comms' },
  { id: 'boots', name: 'Trail Boots', cost: 90, desc: 'Boots that eat the miles.', effect: 'walk' },
  { id: 'kit', name: 'Rescue Kit', cost: 200, desc: 'A kit for injuries of every kind.', effect: 'rescue' },
  { id: 'truck', name: 'Ranger Truck', cost: 450, desc: 'A truck for the long patrols.', effect: 'drive' },
  { id: 'fire', name: 'Fire Gear', cost: 380, desc: 'Gear for fighting brush fires.', effect: 'fire' },
  { id: 'binoculars', name: 'Binoculars', cost: 160, desc: 'Fine glass for spotting wildlife.', effect: 'spot' },
  { id: 'vet', name: 'Vet Kit', cost: 520, desc: 'A vet kit for sick and injured animals.', effect: 'vet' },
  { id: 'helicopter', name: 'Helicopter Call', cost: 1200, desc: 'A direct line to the rescue helicopter.', effect: 'air' },
];

export const RANGER_RANKS = [
  { level: 0, name: 'Seasonal Ranger', xp: 0, perk: 'Learning the trails.' },
  { level: 1, name: 'Ranger', xp: 120, perk: 'Trusted with the rounds.' },
  { level: 2, name: 'Senior Ranger', xp: 300, perk: 'The park leans on you.' },
  { level: 3, name: 'Head Ranger', xp: 620, perk: 'You run the patrols.' },
  { level: 4, name: 'Chief Ranger', xp: 1100, perk: 'The whole park is yours.' },
];

export const RANGER_TASKS = [
  { id: 'trail-clear', name: 'Trail Clearing', pay: 30, time: 2, desc: 'Clear fallen branches from the trail.' },
  { id: 'sign-repair', name: 'Sign Repair', pay: 25, time: 1, desc: 'Fix a weathered trail sign.' },
  { id: 'litter-pick', name: 'Litter Pick', pay: 20, time: 1, desc: 'Pick up litter along the paths.' },
  { id: 'wildlife-count', name: 'Wildlife Count', pay: 45, time: 3, desc: 'Count the wildlife on a set route.' },
  { id: 'guided-walk', name: 'Guided Walk', pay: 60, time: 2, desc: 'Lead visitors on a nature walk.' },
  { id: 'fire-watch', name: 'Fire Watch', pay: 50, time: 4, desc: 'Watch the ridges for smoke.' },
  { id: 'fence-fix', name: 'Fence Fix', pay: 35, time: 2, desc: 'Mend a broken boundary fence.' },
  { id: 'water-test', name: 'Water Test', pay: 40, time: 1, desc: 'Test the river water quality.' },
];

export const RANGER_EVENTS = [
  { id: 'migration', name: 'Migration', mult: 1.2, zones: ['meadow', 'marsh'], desc: 'Flocks passing through the park.' },
  { id: 'fire-season', name: 'Fire Season', mult: 1.3, zones: ['canyon', 'ridge'], desc: 'Dry grass and high fire risk.' },
  { id: 'bear-season', name: 'Bear Season', mult: 1.1, zones: ['forest', 'grove'], desc: 'Bears are out and hungry.' },
  { id: 'flood', name: 'Flood', mult: 0.9, zones: ['river', 'marsh'], desc: 'The river is up and the trails are wet.' },
  { id: 'festival', name: 'Park Festival', mult: 1.2, zones: ['camp', 'lake'], desc: 'Visitors everywhere for the festival.' },
  { id: 'poacher-ring', name: 'Poacher Ring', mult: 1.0, zones: ['forest'], desc: 'A poacher ring is working the forest.' },
];

export const RANGER_CONTRACTS = [
  { id: 'patrol-5', name: 'Five Meadow Patrols', zone: 'meadow', qty: 5, pay: 300, days: 3, rep: 0, desc: 'Patrol the meadow five times.' },
  { id: 'rescue-3', name: 'Three Rescues', zone: 'ridge', qty: 3, pay: 420, days: 3, rep: 1, desc: 'Three rescues on the ridge.' },
  { id: 'fire-2', name: 'Two Fires', zone: 'canyon', qty: 2, pay: 480, days: 2, rep: 2, desc: 'Fight two fires in the canyon.' },
  { id: 'poacher-2', name: 'Two Poachers', zone: 'forest', qty: 2, pay: 520, days: 3, rep: 2, desc: 'Catch two poachers in the forest.' },
  { id: 'count-10', name: 'Count Ten', zone: 'marsh', qty: 10, pay: 380, days: 3, rep: 1, desc: 'Count ten animals in the marsh.' },
  { id: 'summit-1', name: 'One Summit Rescue', zone: 'peak', qty: 1, pay: 600, days: 2, rep: 3, desc: 'A single rescue on the summit trail.' },
];

export const RANGER_HELPERS = [
  { id: 'trainee', name: 'Trainee', wage: 25, skill: 'patrol', bonus: 0.2, desc: 'A keen trainee learning the rounds.' },
  { id: 'vet', name: 'Vet Soraya', wage: 55, skill: 'rescue', bonus: 0.25, desc: 'A vet who saves what others give up on.' },
  { id: 'firefighter', name: 'Firefighter Bo', wage: 60, skill: 'fire', bonus: 0.3, desc: 'Fights fire like it owes him money.' },
  { id: 'tracker', name: 'Tracker Ash', wage: 50, skill: 'spot', bonus: 0.25, desc: 'Spots a track nobody else sees.' },
];

export const RANGER_CHALLENGES = [
  { id: 'patrols-10', name: 'Ten Patrols', target: 'patrols', goal: 10, xp: 80, desc: 'Finish ten patrols.' },
  { id: 'incidents-15', name: 'Fifteen Solved', target: 'incidentsSolved', goal: 15, xp: 120, desc: 'Solve fifteen incidents.' },
  { id: 'rescues-5', name: 'Five Rescues', target: 'rescues', goal: 5, xp: 110, desc: 'Carry out five rescues.' },
  { id: 'poachers-3', name: 'Three Poachers', target: 'poachersCaught', goal: 3, xp: 130, desc: 'Catch three poachers.' },
  { id: 'fires-3', name: 'Three Fires', target: 'firesFought', goal: 3, xp: 120, desc: 'Fight three fires.' },
  { id: 'wildlife-50', name: 'Fifty Counted', target: 'wildlifeCounted', goal: 50, xp: 100, desc: 'Count fifty wild animals.' },
  { id: 'commend-5', name: 'Five Commendations', target: 'commendations', goal: 5, xp: 140, desc: 'Earn five commendations.' },
  { id: 'earn-1500', name: 'Fifteen Hundred Earned', target: 'earned', goal: 1500, xp: 160, desc: 'Earn fifteen hundred as a ranger.' },
];

export const RANGER_ACHIEVEMENTS = [
  { id: 'first-patrol', name: 'First Patrol', check: (s) => s.patrols >= 1, desc: 'Your first finished patrol.' },
  { id: 'first-rescue', name: 'First Rescue', check: (s) => s.rescues >= 1, desc: 'Your first rescue.' },
  { id: 'first-poacher', name: 'First Poacher', check: (s) => s.poachersCaught >= 1, desc: 'Your first caught poacher.' },
  { id: 'rank-3', name: 'Head Ranger', check: (s) => s.rank >= 3, desc: 'Reach rank three.' },
  { id: 'rich-ranger', name: 'Rich Ranger', check: (s) => s.earned >= 1500, desc: 'Earn fifteen hundred as a ranger.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every ranger upgrade.' },
  { id: 'no-fail', name: 'No Fail', check: (s) => s.incidentsSolved >= 5 && s.incidentsFailed === 0, desc: 'Solve five incidents without failing one.' },
  { id: 'summit', name: 'Summit', check: (s) => (s.zonesPatrolled.peak || 0) >= 1, desc: 'Patrol the summit trail.' },
];

export const RANGER_TIPS = [
  { id: 'radio-first', name: 'Radio First', text: 'Buy the radio first; a ranger alone is a ranger lost.' },
  { id: 'fire-season', name: 'Fire Season', text: 'In fire season, check every campfire twice.' },
  { id: 'bear', name: 'Bears', text: 'Make noise in bear country and carry spray.' },
  { id: 'poacher', name: 'Poachers', text: 'Poachers work at night; patrol the forest after dark.' },
  { id: 'rescue-kit', name: 'Rescue Kit', text: 'A rescue kit turns a tragedy into a story.' },
  { id: 'count', name: 'Count Carefully', text: 'Wildlife counts pay, and the park needs the numbers.' },
  { id: 'summit', name: 'Summit Ready', text: 'Do not take the summit trail without rank and kit.' },
  { id: 'commend', name: 'Commendations', text: 'Commendations raise your wage and your name.' },
];

export const RANGER_LEADERBOARD = [
  { name: 'Chief Mara', patrols: 900, desc: 'Runs the whole park.' },
  { name: 'Firefighter Bo', patrols: 620, desc: 'First into every fire.' },
  { name: 'Ria', patrols: 0, desc: 'The new ranger in town.' },
  { name: 'Vet Soraya', patrols: 480, desc: 'Saves animals and rangers alike.' },
  { name: 'Tracker Ash', patrols: 390, desc: 'Knows every track in the park.' },
];

export const RANGER_RECORDS = [
  { id: 'most-patrols', name: 'Most Patrols', stat: 'patrols', unit: 'patrols', desc: 'Patrols finished in total.' },
  { id: 'most-solved', name: 'Most Solved', stat: 'incidentsSolved', unit: 'incidents', desc: 'Incidents solved in total.' },
  { id: 'most-rescues', name: 'Most Rescues', stat: 'rescues', unit: 'rescues', desc: 'Rescues carried out in total.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Coin earned as a ranger.' },
  { id: 'commendations', name: 'Commendations', stat: 'commendations', unit: 'commendations', desc: 'Commendations earned in total.' },
];

export const RANGER_QUICK_START = [
  'Start with meadow patrols; they are short and safe.',
  'Buy the radio before your first long patrol.',
  'Walk slowly and count the wildlife you spot.',
  'Answer every incident; a ignored fire becomes a disaster.',
  'Take the rescue kit before the ridge and canyon trails.',
  'Check every campfire twice in fire season.',
];

export const RANGER_META = {
  system: 'parkRanger',
  version: '7-B1',
  author: 'builder-1',
  zones: 10,
  incidents: 12,
  note: 'Patrol, rescue, protect.',
};

export const RANGER_SEASONS = [
  { id: 'spring', name: 'Spring', months: [3, 4, 5], patrolMult: 1.0, incidentMult: 1.0, desc: 'New growth, gentle trails.' },
  { id: 'summer', name: 'Summer', months: [6, 7, 8], patrolMult: 1.2, incidentMult: 1.3, desc: 'Crowds, heat, and fire risk.' },
  { id: 'autumn', name: 'Autumn', months: [9, 10, 11], patrolMult: 1.1, incidentMult: 1.0, desc: 'Cool air, quiet trails.' },
  { id: 'winter', name: 'Winter', months: [12, 1, 2], patrolMult: 0.8, incidentMult: 0.9, desc: 'Snow, ice, and short days.' },
];

export const RANGER_GEAR = [
  { id: 'pack', name: 'Day Pack', cost: 40, desc: 'A pack for water and first aid.' },
  { id: 'compass', name: 'Compass', cost: 30, desc: 'Never trust the trails alone.' },
  { id: 'bear-spray', name: 'Bear Spray', cost: 60, desc: 'For the day a bear gets too close.' },
  { id: 'rope', name: 'Rope', cost: 50, desc: 'For cliffs, crossings, and rescues.' },
  { id: 'lantern', name: 'Lantern', cost: 35, desc: 'Light for the night patrols.' },
  { id: 'notebook', name: 'Notebook', cost: 15, desc: 'Every sighting goes in the book.' },
  { id: 'camera', name: 'Camera', cost: 120, desc: 'Proof of every rare sighting.' },
  { id: 'gps', name: 'GPS Unit', cost: 140, desc: 'Marks every incident you find.' },
];

export const RANGER_FIELD_SIGNS = [
  { id: 'tracks', name: 'Tracks', text: 'Fresh tracks in the mud tell you what passed by.' },
  { id: 'scat', name: 'Scat', text: 'Droppings tell you what an animal has been eating.' },
  { id: 'rub', name: 'Rub Marks', text: 'Rubbed bark shows where deer and elk pass.' },
  { id: 'nest', name: 'Nest', text: 'A nest means young are nearby; keep your distance.' },
  { id: 'dam', name: 'Dam', text: 'A fresh dam means beavers are working the water.' },
  { id: 'feathers', name: 'Feathers', text: 'Feathers on the trail mean a bird of prey hunts here.' },
];

export function rangerRankFor(xp) {
  let rank = 0;
  let i = 0;
  while (i < RANGER_RANKS.length) {
    if (xp >= RANGER_RANKS[i].xp) rank = i;
    i += 1;
  }
  return rank;
}

export function rangerIncidentPay(incident, rank, upgrades) {
  if (!incident) return 1;
  const owned = upgrades || [];
  let pay = incident.pay * (1 + 0.1 * rank);
  if (owned.includes('radio')) pay *= 1.2;
  if (incident.id === 'brush-fire' && owned.includes('fire')) pay *= 1.3;
  if (incident.id === 'storm-rescue' && owned.includes('helicopter')) pay *= 2;
  return Math.max(1, Math.round(pay));
}

export function rangerPatrolPay(zone, rank, upgrades) {
  if (!zone) return 1;
  const owned = upgrades || [];
  let pay = zone.value * (1 + 0.1 * rank);
  if (owned.includes('boots')) pay *= 1.1;
  return Math.max(1, Math.round(pay));
}

export function rangerSeasonFor(month) {
  const hit = RANGER_SEASONS.find((s) => s.months.includes(month));
  return hit || RANGER_SEASONS[0];
}

export function rangerSeasonMult(seasonId) {
  const season = RANGER_SEASONS.find((s) => s.id === seasonId);
  return season ? season.patrolMult : 1;
}

export function rangerIncidentMult(seasonId) {
  const season = RANGER_SEASONS.find((s) => s.id === seasonId);
  return season ? season.incidentMult : 1;
}

export function rangerGearFor(gearId) {
  return RANGER_GEAR.find((g) => g.id === gearId) || null;
}

export function rangerSeasonalPay(zone, seasonId, rank, upgrades) {
  const base = rangerPatrolPay(zone, rank, upgrades);
  return Math.round(base * rangerSeasonMult(seasonId));
}

export function rangerFieldSignFor(signId) {
  return RANGER_FIELD_SIGNS.find((s) => s.id === signId) || null;
}

export function rangerSignsForZone(zoneId) {
  const zone = RANGER_PATROLS.find((z) => z.id === zoneId);
  if (!zone) return [];
  if (zone.terrain === 'woods') return RANGER_FIELD_SIGNS.slice(0, 4);
  if (zone.terrain === 'water' || zone.terrain === 'wet') return RANGER_FIELD_SIGNS.slice(0, 2);
  return RANGER_FIELD_SIGNS.slice(0, 2);
}

const RANGER_STATE_KEYS = [
  'xp', 'rank', 'patrols', 'incidents', 'incidentsSolved', 'incidentsFailed',
  'rescues', 'poachersCaught', 'firesFought', 'wildlifeCounted', 'tasksDone',
  'commendations', 'earned', 'spent', 'wages', 'upgrades', 'patrol',
  'patrolProgress', 'patrolTarget', 'activeIncident', 'incidentProgress',
  'lastDay', 'activeContract', 'contractProgress', 'contractsDone',
  'contractsFailed', 'bestZone', 'bestPay', 'dailyPatrols', 'dailyEarned',
  'currentEvent', 'wildlifeSeen', 'zonesPatrolled', 'injuries',
];

function rangerChallengeAmount(target, st) {
  const table = {
    patrols: st.patrols,
    incidentsSolved: st.incidentsSolved,
    rescues: st.rescues,
    poachersCaught: st.poachersCaught,
    firesFought: st.firesFought,
    wildlifeCounted: st.wildlifeCounted,
    commendations: st.commendations,
    earned: st.earned,
  };
  return table[target] !== undefined ? table[target] : 0;
}

export function rangerHelperBonus(ids, skill) {
  let sum = 0;
  (ids || []).forEach((id) => {
    const helper = RANGER_HELPERS.find((h) => h.id === id);
    if (helper && helper.skill === skill) sum += helper.bonus;
  });
  return sum;
}

export function rangerChallengeProgress(challenge, state) {
  const amount = Math.floor(rangerChallengeAmount(challenge.target, state));
  return { id: challenge.id, name: challenge.name, amount, goal: challenge.goal, done: amount >= challenge.goal };
}

export function rangerTipFor(day) {
  const idx = ((day || 0) % RANGER_TIPS.length + RANGER_TIPS.length) % RANGER_TIPS.length;
  return RANGER_TIPS[idx];
}

export function rangerLeaderboardWith(patrols) {
  const rows = RANGER_LEADERBOARD.map((row) => ({
    name: row.name,
    patrols: row.name === 'Ria' ? patrols : row.patrols,
    desc: row.desc,
  }));
  rows.sort((a, b) => b.patrols - a.patrols);
  return rows.map((row, i) => ({ rank: i + 1, name: row.name, patrols: row.patrols, desc: row.desc }));
}

export function rangerEfficiency(solved, total) {
  if (!total) return 100;
  return Math.round((solved / total) * 100);
}

export function rangerProfitPerPatrol(earned, patrols) {
  if (!patrols) return 0;
  return Math.round((earned / patrols) * 10) / 10;
}

export function rangerGrade(solved, total, rescues) {
  if (!total) return 'D';
  const rate = solved / total;
  if (rate >= 0.9 && rescues >= 5) return 'S';
  if (rate >= 0.8) return 'A';
  if (rate >= 0.6) return 'B';
  if (rate >= 0.4) return 'C';
  return 'D';
}

function rangerRecordValue(stat, state) {
  const table = {
    patrols: state.patrols,
    incidentsSolved: state.incidentsSolved,
    rescues: state.rescues,
    earned: Math.round(state.earned),
    commendations: state.commendations,
  };
  return table[stat] !== undefined ? table[stat] : 0;
}

export function rangerRecordFor(id, state) {
  const rec = RANGER_RECORDS.find((r) => r.id === id);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: rangerRecordValue(rec.stat, state), unit: rec.unit };
}

export function rangerAllRecords(state) {
  return RANGER_RECORDS.map((rec) => ({
    id: rec.id,
    name: rec.name,
    value: rangerRecordValue(rec.stat, state),
    unit: rec.unit,
    desc: rec.desc,
  }));
}

export function rangerSummary(state) {
  const rankName = RANGER_RANKS[state.rank] ? RANGER_RANKS[state.rank].name : 'Seasonal Ranger';
  return `${rankName} — ${state.patrols} patrols, ${state.incidentsSolved} incidents solved, ${state.rescues} rescues, $${Math.round(state.earned)} earned, ${state.commendations} commendations.`;
}

export function rangerNextGoal(state) {
  if (state.patrols < 10) return 'Finish ten patrols.';
  if (state.incidentsSolved < 15) return 'Solve fifteen incidents.';
  if (state.rank < 2) return 'Reach rank 2 and become a Senior Ranger.';
  return 'Patrol the summit trail.';
}

export function rangerQuickStart(step) {
  if (step < 0 || step >= RANGER_QUICK_START.length) return null;
  return RANGER_QUICK_START[step];
}

export function createParkRangerSystem(ctx = {}) {
  const rng = ctx.rng || Math.random;
  const getDay = ctx.getDay || (() => 1);
  const getHour = ctx.getHour || (() => 12);
  const getCash = ctx.getCash || (() => 0);
  const addCash = ctx.addCash || (() => {});
  const addHeat = ctx.addHeat || (() => {});
  const log = ctx.log || (() => {});
  const getPlayerPos = ctx.getPlayerPos || (() => ({ x: 0, z: 0 }));
  const getWeather = ctx.getWeather || (() => ({ condition: 'clear' }));

  const seedMaps = () => {
    const wildlifeSeen = {};
    const zonesPatrolled = {};
    for (const w of RANGER_WILDLIFE) wildlifeSeen[w.id] = 0;
    for (const z of RANGER_PATROLS) zonesPatrolled[z.id] = 0;
    return { wildlifeSeen, zonesPatrolled };
  };

  const seeded = seedMaps();

  const sys = {
    xp: 0,
    rank: 0,
    patrols: 0,
    incidents: 0,
    incidentsSolved: 0,
    incidentsFailed: 0,
    rescues: 0,
    poachersCaught: 0,
    firesFought: 0,
    wildlifeCounted: 0,
    tasksDone: 0,
    commendations: 0,
    earned: 0,
    spent: 0,
    wages: 0,
    upgrades: [],
    patrol: null,
    patrolProgress: 0,
    patrolTarget: null,
    activeIncident: null,
    incidentProgress: 0,
    lastDay: 1,
    activeContract: null,
    contractProgress: 0,
    contractsDone: 0,
    contractsFailed: 0,
    bestZone: null,
    bestPay: 0,
    dailyPatrols: 0,
    dailyEarned: 0,
    currentEvent: null,
    wildlifeSeen: seeded.wildlifeSeen,
    zonesPatrolled: seeded.zonesPatrolled,
    injuries: 0,
  };

  function bankXp(amount) {
    sys.xp += amount;
    const next = rangerRankFor(sys.xp);
    if (next > sys.rank) {
      sys.rank = next;
      log(`Rank up! You are now ${RANGER_RANKS[next].name}.`);
    }
  }

  function fail(reason) {
    return { ok: false, reason };
  }

  function pass(extra) {
    return { ok: true, ...extra };
  }

  function activeEvent() {
    return sys.currentEvent
      ? RANGER_EVENTS.find((e) => e.id === sys.currentEvent) || null
      : null;
  }

  function monthForDay(day) {
    return ((9 - 1 + Math.floor((day - 1) / 30)) % 12) + 1;
  }

  function contractDone() {
    if (!sys.activeContract) return false;
    const c = sys.activeContract;
    if (c.id === 'patrol-5') return (sys.zonesPatrolled[c.zone] || 0) >= c.qty;
    if (c.id === 'count-10') return sys.wildlifeCounted >= c.qty;
    return sys.contractProgress >= c.qty;
  }

  function noteContractProgress(incidentId) {
    if (!sys.activeContract) return;
    const c = sys.activeContract;
    const matched = (c.id === 'rescue-3' && ['injured-deer', 'orphan-cub', 'sick-fox', 'fallen-climber', 'storm-rescue'].includes(incidentId))
      || (c.id === 'fire-2' && incidentId === 'brush-fire')
      || (c.id === 'poacher-2' && incidentId === 'poacher')
      || (c.id === 'summit-1' && incidentId === 'storm-rescue');
    if (matched) sys.contractProgress += 1;
  }

  sys.startPatrol = function startPatrol(zoneId) {
    const zone = RANGER_PATROLS.find((z) => z.id === zoneId);
    if (!zone) return fail('unknown-zone');
    if (sys.patrol) return fail('already-patrolling');
    if (zone.difficulty === 4 && sys.rank < 3) return fail('rank-too-low');
    if (zone.difficulty === 3 && sys.rank < 1) return fail('rank-too-low');
    const hour = getHour();
    if (hour >= 22 || hour <= 4) return fail('night');
    sys.patrol = zoneId;
    sys.patrolProgress = 0;
    sys.patrolTarget = { ...zone };
    log(`Patrol started: ${zone.name}.`);
    return pass({ zone: zoneId });
  };

  sys.walkPatrol = function walkPatrol() {
    if (!sys.patrol) return fail('no-patrol');
    const zone = RANGER_PATROLS.find((z) => z.id === sys.patrol);
    const step = sys.upgrades.includes('boots') ? 2 : 1;
    sys.patrolProgress += step;
    const need = zone.difficulty * 3;
    const local = RANGER_WILDLIFE.filter((w) => w.zone === zone.id);
    if (local.length && rng() < 0.3) {
      const seen = local[Math.floor(rng() * local.length)];
      sys.wildlifeSeen[seen.id] += 1;
      sys.wildlifeCounted += 1;
      bankXp(3);
      log(`Spotted a ${seen.name} in the ${zone.name}.`);
    }
    const incidentChance = 0.05 + zone.incidents * 0.02;
    if (!sys.activeIncident && rng() < incidentChance) {
      const incident = RANGER_INCIDENTS[Math.floor(rng() * RANGER_INCIDENTS.length)];
      sys.activeIncident = { ...incident };
      sys.incidentProgress = 0;
      sys.incidents += 1;
      log(`Incident on patrol: ${incident.name}!`);
      return pass({ incident: incident.id, name: incident.name, progress: sys.patrolProgress, need });
    }
    if (sys.patrolProgress >= need) {
      return sys.finishPatrol();
    }
    return pass({ progress: sys.patrolProgress, need, done: false });
  };

  sys.respondIncident = function respondIncident() {
    if (!sys.activeIncident) return fail('no-incident');
    const incident = sys.activeIncident;
    const need = incident.difficulty;
    sys.incidentProgress += 1;
    if (sys.incidentProgress < need) {
      return pass({ progress: sys.incidentProgress, need, done: false });
    }
    let chance = 0.6 + 0.05 * sys.rank - incident.difficulty * 0.05;
    if (sys.upgrades.includes('kit')) chance += 0.1;
    if (sys.upgrades.includes('vet')) chance += 0.1;
    chance = Math.max(0.05, Math.min(0.95, chance));
    sys.activeIncident = null;
    sys.incidentProgress = 0;
    if (rng() >= chance) {
      sys.incidentsFailed += 1;
      if (incident.id === 'brush-fire') {
        sys.firesFought += 0;
      }
      log(`Failed to resolve the ${incident.name}.`);
      return pass({ solved: false, incident: incident.id });
    }
    const pay = rangerIncidentPay(incident, sys.rank, sys.upgrades);
    sys.incidentsSolved += 1;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    bankXp(15);
    if (incident.id === 'poacher') {
      sys.poachersCaught += 1;
      addHeat(incident.heat);
    }
    if (incident.id === 'brush-fire') sys.firesFought += 1;
    if (['injured-deer', 'orphan-cub', 'sick-fox'].includes(incident.id)) sys.rescues += 1;
    if (incident.id === 'bear-camp' || incident.id === 'litter-dump') addHeat(incident.heat);
    if (pay > sys.bestPay) {
      sys.bestPay = pay;
      sys.bestZone = sys.patrol;
    }
    noteContractProgress(incident.id);
    log(`Resolved the ${incident.name} for $${pay}.`);
    return pass({ solved: true, incident: incident.id, pay });
  };

  sys.finishPatrol = function finishPatrol() {
    if (!sys.patrol) return fail('no-patrol');
    const zone = RANGER_PATROLS.find((z) => z.id === sys.patrol);
    const pay = rangerPatrolPay(zone, sys.rank, sys.upgrades);
    sys.patrols += 1;
    sys.dailyPatrols += 1;
    sys.zonesPatrolled[zone.id] += 1;
    sys.wages += pay;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    bankXp(10);
    sys.patrol = null;
    sys.patrolProgress = 0;
    sys.patrolTarget = null;
    if (rng() < 0.15) {
      sys.commendations += 1;
      log('A visitor wrote a commendation letter for you.');
    }
    return pass({ done: true, zone: zone.id, pay });
  };

  sys.endPatrol = function endPatrol() {
    if (!sys.patrol) return fail('no-patrol');
    const done = sys.patrol;
    sys.patrol = null;
    sys.patrolProgress = 0;
    sys.patrolTarget = null;
    sys.activeIncident = null;
    sys.incidentProgress = 0;
    return pass({ zone: done });
  };

  sys.doTask = function doTask(taskId) {
    const task = RANGER_TASKS.find((t) => t.id === taskId);
    if (!task) return fail('unknown-task');
    const pay = task.pay + 5 * sys.rank;
    sys.tasksDone += 1;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    bankXp(6);
    return pass({ task: taskId, pay });
  };

  sys.countWildlife = function countWildlife(wildlifeId) {
    const animal = RANGER_WILDLIFE.find((w) => w.id === wildlifeId);
    if (!animal) return fail('unknown-wildlife');
    const sightings = 1 + Math.floor(rng() * 3);
    sys.wildlifeSeen[wildlifeId] += sightings;
    sys.wildlifeCounted += sightings;
    bankXp(sightings * 2);
    return pass({ wildlife: wildlifeId, sightings });
  };

  sys.buyUpgrade = function buyUpgrade(upgradeId) {
    const upgrade = RANGER_UPGRADES.find((u) => u.id === upgradeId);
    if (!upgrade) return fail('unknown-upgrade');
    if (sys.upgrades.includes(upgradeId)) return fail('already-owned');
    if (getCash() < upgrade.cost) return fail('not-enough-cash');
    addCash(-upgrade.cost);
    sys.spent += upgrade.cost;
    sys.upgrades.push(upgradeId);
    bankXp(20);
    return pass({ id: upgradeId });
  };

  sys.takeContract = function takeContract(contractId) {
    const contract = RANGER_CONTRACTS.find((c) => c.id === contractId);
    if (!contract) return fail('unknown-contract');
    if (sys.activeContract) return fail('contract-active');
    if (sys.rank < contract.rep) return fail('rank-too-low');
    const day = getDay();
    sys.activeContract = { ...contract, dayTaken: day, deadline: day + contract.days };
    sys.contractProgress = 0;
    return pass({ contract: sys.activeContract });
  };

  sys.deliverContract = function deliverContract() {
    if (!sys.activeContract) return fail('no-contract');
    let held = 0;
    const c = sys.activeContract;
    if (c.id === 'patrol-5') held = sys.zonesPatrolled[c.zone] || 0;
    else if (c.id === 'count-10') held = sys.wildlifeCounted;
    else held = sys.contractProgress;
    if (held < c.qty) return { ok: false, reason: 'not-ready', held, needed: c.qty };
    const pay = c.pay + 50 * sys.rank;
    sys.earned += pay;
    sys.dailyEarned += pay;
    addCash(pay);
    sys.contractsDone += 1;
    sys.activeContract = null;
    sys.contractProgress = 0;
    bankXp(60);
    return pass({ pay });
  };

  sys.abandonContract = function abandonContract() {
    if (!sys.activeContract) return fail('no-contract');
    sys.activeContract = null;
    sys.contractProgress = 0;
    sys.contractsFailed += 1;
    return pass({});
  };

  sys.collectWage = function collectWage() {
    const wage = 40 + 20 * sys.rank + 5 * sys.commendations;
    sys.wages += wage;
    sys.earned += wage;
    sys.dailyEarned += wage;
    addCash(wage);
    return pass({ wage });
  };

  sys.zoneReport = function zoneReport() {
    return RANGER_PATROLS.map((z) => ({
      id: z.id,
      name: z.name,
      difficulty: z.difficulty,
      pay: rangerPatrolPay(z, sys.rank, sys.upgrades),
      wildlife: z.wildlife,
      incidents: z.incidents,
      patrolled: sys.zonesPatrolled[z.id] || 0,
    }));
  };

  sys.wildlifeReport = function wildlifeReport() {
    return RANGER_WILDLIFE.map((w) => ({
      id: w.id,
      name: w.name,
      zone: w.zone,
      sightings: sys.wildlifeSeen[w.id] || 0,
      count: w.count,
    }));
  };

  sys.dailyEvent = function dailyEvent() {
    const roll = rng();
    if (roll < 0.2) {
      const ev = RANGER_EVENTS[Math.floor(rng() * RANGER_EVENTS.length)];
      sys.currentEvent = ev.id;
      log(`Today's event: ${ev.name}.`);
      return pass({ event: ev.id, name: ev.name });
    }
    if (roll < 0.3) {
      sys.commendations += 1;
      sys.currentEvent = null;
      log('A visitor letter brought a commendation.');
      return pass({ event: 'gift', name: 'Gift' });
    }
    sys.currentEvent = null;
    return pass({ event: 'none', name: 'None' });
  };

  sys.tick = function tick(dt) {
    const step = dt || 0;
    if (sys.patrol && rng() < step * 0.02) {
      log('A bird calls somewhere in the trees.');
    }
    if (sys.activeIncident && rng() < step * 0.03) {
      log('The incident still needs a response!');
    }
  };

  sys.tickDay = function tickDay(day) {
    if (day === sys.lastDay) return;
    sys.lastDay = day;
    sys.dailyPatrols = 0;
    sys.dailyEarned = 0;
    if (sys.activeContract && day > sys.activeContract.deadline && !contractDone()) {
      sys.contractsFailed += 1;
      log(`Contract failed: ${sys.activeContract.name}.`);
      sys.activeContract = null;
      sys.contractProgress = 0;
    }
    const season = rangerSeasonFor(monthForDay(day));
    if (season.id === 'summer' && rng() < 0.3) {
      const fire = RANGER_INCIDENTS.find((i) => i.id === 'brush-fire');
      sys.activeIncident = { ...fire };
      sys.incidentProgress = 0;
      sys.incidents += 1;
      log('A brush fire broke out in fire season!');
    }
    sys.dailyEvent();
  };

  sys.serialize = function serialize() {
    const out = {};
    for (const key of RANGER_STATE_KEYS) {
      out[key] = JSON.parse(JSON.stringify(sys[key]));
    }
    return out;
  };

  sys.deserialize = function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    for (const key of RANGER_STATE_KEYS) {
      if (key in saved) sys[key] = JSON.parse(JSON.stringify(saved[key]));
    }
    for (const w of RANGER_WILDLIFE) {
      if (sys.wildlifeSeen[w.id] === undefined) sys.wildlifeSeen[w.id] = 0;
    }
    for (const z of RANGER_PATROLS) {
      if (sys.zonesPatrolled[z.id] === undefined) sys.zonesPatrolled[z.id] = 0;
    }
    const next = rangerRankFor(sys.xp);
    if (next > sys.rank) sys.rank = next;
  };

  sys.stats = function stats() {
    return {
      rank: RANGER_RANKS[sys.rank].name,
      xp: sys.xp,
      patrols: sys.patrols,
      incidents: sys.incidents,
      incidentsSolved: sys.incidentsSolved,
      incidentsFailed: sys.incidentsFailed,
      rescues: sys.rescues,
      poachersCaught: sys.poachersCaught,
      firesFought: sys.firesFought,
      wildlifeCounted: sys.wildlifeCounted,
      tasksDone: sys.tasksDone,
      commendations: sys.commendations,
      earned: Math.round(sys.earned),
      spent: sys.spent,
      wages: sys.wages,
      upgrades: sys.upgrades.length,
      patrol: sys.patrol,
      activeIncident: sys.activeIncident ? sys.activeIncident.id : null,
      activeContract: sys.activeContract ? sys.activeContract.id : null,
      contractsDone: sys.contractsDone,
      contractsFailed: sys.contractsFailed,
      bestZone: sys.bestZone,
      dailyPatrols: sys.dailyPatrols,
      dailyEarned: Math.round(sys.dailyEarned),
      event: sys.currentEvent,
    };
  };

  sys.hudLine = function hudLine() {
    if (sys.activeIncident) {
      return `Ranger — ${sys.activeIncident.name}, respond now`;
    }
    if (sys.patrol) {
      const zone = RANGER_PATROLS.find((z) => z.id === sys.patrol);
      return `Ranger — ${zone.name} ${sys.patrolProgress} walked`;
    }
    if (sys.activeContract) {
      return `Contract ${sys.activeContract.name} ${sys.contractProgress}/${sys.activeContract.qty}`;
    }
    if (sys.commendations > 0) return `${sys.commendations} commendations`;
    return '';
  };

  sys.interact = function interact() {
    const pos = getPlayerPos();
    const dx = (pos.x || 0) - 600;
    const dz = (pos.z || 0) - 100;
    if (Math.hypot(dx, dz) > 40) return false;
    if (sys.activeIncident) {
      sys.respondIncident();
      return true;
    }
    if (!sys.patrol) {
      sys.startPatrol('meadow');
      return true;
    }
    sys.walkPatrol();
    return true;
  };

  return sys;
}

export function createParkRangerExtras(system) {
  const sys = system;
  let hired = [];
  let claimed = [];
  let wagesPaid = 0;

  function fail(reason) {
    return { ok: false, reason };
  }

  function pass(extra) {
    return { ok: true, ...extra };
  }

  const extras = {
    hireHelper(id) {
      const helper = RANGER_HELPERS.find((h) => h.id === id);
      if (!helper) return fail('unknown-helper');
      if (hired.includes(id)) return fail('already-hired');
      hired.push(id);
      return pass({ id, name: helper.name, wage: helper.wage });
    },
    fireHelper(id) {
      if (!hired.includes(id)) return fail('not-hired');
      hired = hired.filter((h) => h !== id);
      return pass({ id });
    },
    payWages() {
      let due = 0;
      for (const id of hired) {
        const helper = RANGER_HELPERS.find((h) => h.id === id);
        if (helper) due += helper.wage;
      }
      wagesPaid += due;
      return pass({ due, helpers: [...hired], wagesPaid });
    },
    helperBonus(skill) {
      let sum = 0;
      for (const id of hired) {
        const helper = RANGER_HELPERS.find((h) => h.id === id);
        if (helper && helper.skill === skill) sum += helper.bonus;
      }
      return sum;
    },
    challenges() {
      return RANGER_CHALLENGES.map((c) => rangerChallengeProgress(c, sys));
    },
    claimChallenge(id) {
      const challenge = RANGER_CHALLENGES.find((c) => c.id === id);
      if (!challenge) return fail('unknown-challenge');
      if (claimed.includes(id)) return fail('already-claimed');
      const progress = rangerChallengeProgress(challenge, sys);
      if (!progress.done) return fail('not-done');
      claimed.push(id);
      return pass({ id, xp: challenge.xp });
    },
    achievements() {
      return RANGER_ACHIEVEMENTS.map((a) => ({
        id: a.id,
        name: a.name,
        desc: a.desc,
        done: !!a.check(sys),
      }));
    },
    incidentInfo(incidentId) {
      const incident = RANGER_INCIDENTS.find((i) => i.id === incidentId);
      if (!incident) return fail('unknown-incident');
      return pass({ ...incident, pay: rangerIncidentPay(incident, sys.rank, sys.upgrades) });
    },
    patrolSummary() {
      return pass({ patrols: sys.patrols, zones: { ...sys.zonesPatrolled } });
    },
    wildlifeSummary() {
      return pass({ wildlifeCounted: sys.wildlifeCounted, seen: { ...sys.wildlifeSeen } });
    },
    get helpers() {
      return [...hired];
    },
    get claimed() {
      return [...claimed];
    },
    get wagesPaid() {
      return wagesPaid;
    },
  };

  return extras;
}

export function createParkRangerJournal(system) {
  const sys = system;
  const entries = [];
  let pages = 0;

  function fail(reason) {
    return { ok: false, reason };
  }

  function pass(extra) {
    return { ok: true, ...extra };
  }

  const journal = {
    addEntry(text) {
      entries.push({ day: sys.lastDay || 1, text });
      pages += 1;
      return pass({ count: entries.length });
    },
    logPatrol(zoneId) {
      const zone = RANGER_PATROLS.find((z) => z.id === zoneId);
      if (!zone) return fail('unknown-zone');
      return journal.addEntry(`Patrolled ${zone.name}: ${zone.desc}`);
    },
    logIncident(incidentId) {
      const incident = RANGER_INCIDENTS.find((i) => i.id === incidentId);
      if (!incident) return fail('unknown-incident');
      return journal.addEntry(`Incident: ${incident.name} — ${incident.desc}`);
    },
    logWildlife(wildlifeId, count) {
      const animal = RANGER_WILDLIFE.find((w) => w.id === wildlifeId);
      if (!animal) return fail('unknown-wildlife');
      return journal.addEntry(`Counted ${count} ${animal.name} in the ${animal.zone}.`);
    },
    readEntries(limit) {
      const n = limit === undefined ? entries.length : limit;
      return entries.slice(-n);
    },
    seasonSummary(month) {
      const season = rangerSeasonFor(month);
      return {
        season: season.id,
        name: season.name,
        patrolMult: season.patrolMult,
        incidentMult: season.incidentMult,
        desc: season.desc,
        patrols: sys.patrols,
        incidentsSolved: sys.incidentsSolved,
      };
    },
    get entries() {
      return [...entries];
    },
    get pages() {
      return pages;
    },
  };

  return journal;
}
