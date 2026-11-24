// Solara Nights — Park Ranger / Green Patrol (Round 7, written fresh).
// Ria joins the ranger service: patrol the national park zones, rescue
// injured wildlife, clear trails, fight small fires, guide visitors
// and keep poachers out. Every zone has its own trouble — a stranded
// hiker on the ridge, a bear in the campground, a fire in the dry
// scrub. Good patrols earn commendations and a steady wage; sloppy
// ones cost the park its animals. Radios, trucks, fire gear and a
// rescue kit gate the harder zones, and the chief promotes rangers
// who keep the park safe season after season.
// Pure logic: no rendering, no imports. The game wires it through the
// standard ctx { rng, getDay, getHour, getCash, addCash, addHeat, log,
// getPlayerPos, getWeather } and drives tick/tickDay from the main loop.

export const RANGER_PATROLS = [
  { id: 'meadow', name: 'Wildflower Meadow', difficulty: 1, value: 40, wildlife: 8, incidents: 1, terrain: 'flat', desc: 'Easy walking, butterflies, and lost picnickers.' },
  { id: 'lake', name: 'Mirror Lake', difficulty: 1, value: 45, wildlife: 7, incidents: 1, terrain: 'shore', desc: 'Swimmers, anglers, and a very bold otter.' },
  { id: 'forest', name: 'Old Forest', difficulty: 2, value: 60, wildlife: 9, incidents: 2, terrain: 'woods', desc: 'Deep shade, deer trails, and the odd poacher.' },
  { id: 'ridge', name: 'Eagle Ridge', difficulty: 3, value: 85, wildlife: 6, incidents: 2, terrain: 'cliff', desc: 'High, windy, and full of stranded hikers.' },
  { id: 'canyon', name: 'Red Canyon', difficulty: 3, value: 90, wildlife: 5, incidents: 3, terrain: 'rock', desc: 'Hot rock, flash floods, and climbers in trouble.' },
  { id: 'marsh', name: 'Heron Marsh', difficulty: 2, value: 55, wildlife: 9, incidents: 2, terrain: 'wet', desc: 'Boardwalks, herons, and sinking boots.' },
  { id: 'camp', name: 'Campground', difficulty: 1, value: 50, wildlife: 4, incidents: 2, terrain: 'flat', desc: 'Campfires, bears, and campers who feed them.' },
  { id: 'peak', name: 'Summit Trail', difficulty: 4, value: 120, wildlife: 3, incidents: 3, terrain: 'alpine', desc: 'Thin air, sudden storms, and the highest rescue.' },
  { id: 'river', name: 'River Gorge', difficulty: 3, value: 80, wildlife: 6, incidents: 2, terrain: 'water', desc: 'Fast water, slippery rock, and kayakers.' },
  { id: 'grove', name: 'Ancient Grove', difficulty: 2, value: 70, wildlife: 8, incidents: 1, terrain: 'woods', desc: 'The old trees, quiet trails, and rare birds.' },
];

export const RANGER_INCIDENTS = [
  { id: 'lost-hiker', name: 'Lost Hiker', difficulty: 2, pay: 60, heat: 0, desc: 'A hiker off the trail, cold and scared.' },
  { id: 'injured-deer', name: 'Injured Deer', difficulty: 2, pay: 55, heat: 0, desc: 'A deer with a broken leg by the trail.' },
  { id: 'campfire', name: 'Unattended Campfire', difficulty: 1, pay: 40, heat: 0, desc: 'A fire left burning — put it out fast.' },
  { id: 'poacher', name: 'Poacher Spotted', difficulty: 3, pay: 90, heat: 2, desc: 'A poacher with a rifle in the closed zone.' },
  { id: 'bear-camp', name: 'Bear in Camp', difficulty: 3, pay: 85, heat: 1, desc: 'A bear raiding the food lockers.' },
  { id: 'brush-fire', name: 'Brush Fire', difficulty: 4, pay: 140, heat: 0, desc: 'Dry scrub burning — call it in and fight it.' },
  { id: 'fallen-climber', name: 'Fallen Climber', difficulty: 4, pay: 130, heat: 0, desc: 'A climber down on the canyon wall.' },
  { id: 'flooded-trail', name: 'Flooded Trail', difficulty: 2, pay: 50, heat: 0, desc: 'A trail under water — warn the walkers.' },
  { id: 'orphan-cub', name: 'Orphaned Cub', difficulty: 2, pay: 70, heat: 0, desc: 'A bear cub alone — take it to the sanctuary.' },
  { id: 'litter-dump', name: 'Illegal Dumping', difficulty: 1, pay: 35, heat: 1, desc: 'Someone dumped a truckload in the woods.' },
  { id: 'sick-fox', name: 'Sick Fox', difficulty: 2, pay: 60, heat: 0, desc: 'A fox acting strange — the vet needs it.' },
  { id: 'storm-rescue', name: 'Storm Rescue', difficulty: 4, pay: 150, heat: 0, desc: 'Walkers caught in a summit storm.' },
];

export const RANGER_WILDLIFE = [
  { id: 'deer', name: 'Whitetail Deer', zone: 'forest', count: 12, desc: 'Grazes the meadow edges at dawn.' },
  { id: 'eagle', name: 'Golden Eagle', zone: 'ridge', count: 3, desc: 'Circles the ridge on wide wings.' },
  { id: 'otter', name: 'River Otter', zone: 'lake', count: 5, desc: 'Slides down the bank and swims away laughing.' },
  { id: 'bear', name: 'Black Bear', zone: 'camp', count: 4, desc: 'Loves the campground a little too much.' },
  { id: 'heron', name: 'Great Heron', zone: 'marsh', count: 8, desc: 'Stands still as a statue in the reeds.' },
  { id: 'fox', name: 'Red Fox', zone: 'grove', count: 6, desc: 'A russet shadow on the quiet trails.' },
  { id: 'goat', name: 'Mountain Goat', zone: 'peak', count: 7, desc: 'Climbs cliffs like they are stairs.' },
  { id: 'beaver', name: 'Beaver', zone: 'river', count: 6, desc: 'Builds dams and floods the trail.' },
  { id: 'owl', name: 'Great Horned Owl', zone: 'forest', count: 5, desc: 'Hoots at dusk from the old oak.' },
  { id: 'bighorn', name: 'Bighorn Sheep', zone: 'canyon', count: 9, desc: 'Clatters across the red rock.' },
];

export const RANGER_UPGRADES = [
  { id: 'radio', name: 'Ranger Radio', cost: 100, desc: 'Call for backup: incidents pay +20%.', effect: 'radio' },
  { id: 'boots', name: 'Trail Boots', cost: 90, desc: 'Patrols finish 25% faster.', effect: 'boots' },
  { id: 'kit', name: 'Rescue Kit', cost: 200, desc: 'Treat injured animals: rescues succeed more.', effect: 'kit' },
  { id: 'truck', name: 'Ranger Truck', cost: 450, desc: 'Reach far zones fast: +2 zones per day.', effect: 'truck' },
  { id: 'fire', name: 'Fire Gear', cost: 380, desc: 'Fight brush fires safely: fire pay +30%.', effect: 'fire' },
  { id: 'binoculars', name: 'Binoculars', cost: 160, desc: 'Spot wildlife and poachers from far off.', effect: 'spot' },
  { id: 'vet', name: 'Vet Training', cost: 520, desc: 'Treat sick animals: rescue pay +25%.', effect: 'vet' },
  { id: 'helicopter', name: 'Helicopter Call', cost: 1200, desc: 'Air rescues: summit incidents pay double.', effect: 'heli' },
];

export const RANGER_RANKS = [
  { level: 0, name: 'Seasonal Ranger', xp: 0, perk: 'Base wage, base patrols.' },
  { level: 1, name: 'Ranger', xp: 120, perk: '+10% incident pay.' },
  { level: 2, name: 'Senior Ranger', xp: 300, perk: '+10% rescue success.' },
  { level: 3, name: 'Head Ranger', xp: 620, perk: '+20% incident pay, the summit opens.' },
  { level: 4, name: 'Chief Ranger', xp: 1100, perk: '+30% incident pay, commendations doubled.' },
];

export const RANGER_TASKS = [
  { id: 'trail-clear', name: 'Clear Trail', pay: 30, time: 2, desc: 'Saw the fallen tree, clear the path.' },
  { id: 'sign-repair', name: 'Repair Signs', pay: 25, time: 1, desc: 'Straighten the signs and paint the blazes.' },
  { id: 'litter-pick', name: 'Litter Pick', pay: 20, time: 1, desc: 'Fill a bag with trail litter.' },
  { id: 'wildlife-count', name: 'Wildlife Count', pay: 45, time: 3, desc: 'Count the deer at dawn for the survey.' },
  { id: 'guided-walk', name: 'Guided Walk', pay: 60, time: 2, desc: 'Lead visitors on the nature walk.' },
  { id: 'fire-watch', name: 'Fire Watch', pay: 50, time: 4, desc: 'Watch the dry scrub from the tower.' },
  { id: 'fence-fix', name: 'Fix Fence', pay: 35, time: 2, desc: 'Mend the fence where the deer broke through.' },
  { id: 'water-test', name: 'Water Test', pay: 40, time: 1, desc: 'Test the lake water for the report.' },
];

export const RANGER_EVENTS = [
  { id: 'migration', name: 'Bird Migration', mult: 1.3, zones: ['marsh', 'lake'], desc: 'Thousands of birds pass through the park.' },
  { id: 'fire-season', name: 'Fire Season', mult: 1.4, zones: ['canyon', 'camp'], desc: 'Dry and hot — every spark is a threat.' },
  { id: 'bear-season', name: 'Bear Season', mult: 1.3, zones: ['camp', 'forest'], desc: 'Bears are hungry and bold near camp.' },
  { id: 'flood', name: 'Flash Flood', mult: 0.7, zones: ['river', 'canyon'], desc: 'Rain in the hills — the gorge floods.' },
  { id: 'festival', name: 'Park Festival', mult: 1.5, zones: ['meadow', 'camp'], desc: 'Visitors everywhere — guided walks pay double.' },
  { id: 'poacher-ring', name: 'Poacher Ring', mult: 1.4, zones: ['forest', 'grove'], desc: 'A poacher ring is working the closed zones.' },
];

export const RANGER_CONTRACTS = [
  { id: 'patrol-5', name: 'Five Patrols', zone: 'meadow', qty: 5, pay: 300, days: 3, rep: 0, desc: 'Patrol the meadow five times this week.' },
  { id: 'rescue-3', name: 'Rescue Run', zone: 'ridge', qty: 3, pay: 420, days: 3, rep: 1, desc: 'Three rescues on the ridge.' },
  { id: 'fire-2', name: 'Fire Duty', zone: 'canyon', qty: 2, pay: 480, days: 2, rep: 2, desc: 'Two brush fires in the canyon.' },
  { id: 'poacher-2', name: 'Poacher Hunt', zone: 'forest', qty: 2, pay: 520, days: 3, rep: 2, desc: 'Catch two poachers in the forest.' },
  { id: 'count-10', name: 'Wildlife Survey', zone: 'marsh', qty: 10, pay: 380, days: 3, rep: 1, desc: 'Count ten wildlife sightings in the marsh.' },
  { id: 'summit-1', name: 'Summit Rescue', zone: 'peak', qty: 1, pay: 600, days: 2, rep: 3, desc: 'One summit rescue — the hardest call.' },
];

export function rangerRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < RANGER_RANKS.length; i++) {
    if (xp >= RANGER_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function rangerIncidentPay(incident, rank, upgrades) {
  let pay = incident.pay;
  pay *= 1 + rank * 0.1;
  if (upgrades.includes('radio')) pay *= 1.2;
  if (incident.id === 'brush-fire' && upgrades.includes('fire')) pay *= 1.3;
  if (incident.id === 'storm-rescue' && upgrades.includes('helicopter')) pay *= 2;
  return Math.max(1, Math.round(pay));
}

export function rangerPatrolPay(zone, rank, upgrades) {
  let pay = zone.value;
  pay *= 1 + rank * 0.1;
  if (upgrades.includes('boots')) pay *= 1.1;
  return Math.max(1, Math.round(pay));
}

export function createParkRangerSystem(ctx) {
  const c = ctx || {};
  const rng = typeof c.rng === 'function' ? c.rng : Math.random;
  const getCash = typeof c.getCash === 'function' ? c.getCash : () => 0;
  const addCash = typeof c.addCash === 'function' ? c.addCash : () => {};
  const addHeat = typeof c.addHeat === 'function' ? c.addHeat : () => {};
  const log = typeof c.log === 'function' ? c.log : () => {};
  const getDay = typeof c.getDay === 'function' ? c.getDay : () => 1;
  const getHour = typeof c.getHour === 'function' ? c.getHour : () => 12;
  const getPos = typeof c.getPlayerPos === 'function' ? c.getPlayerPos : () => ({ x: 0, z: 0 });
  const getWeather = typeof c.getWeather === 'function' ? c.getWeather : () => ({ condition: 'clear' });

  const state = {
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
    wildlifeSeen: {},
    zonesPatrolled: {},
    injuries: 0,
  };
  for (const w of RANGER_WILDLIFE) state.wildlifeSeen[w.id] = 0;
  for (const z of RANGER_PATROLS) state.zonesPatrolled[z.id] = 0;

  function refreshRank() {
    const r = rangerRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Ranger rank up: ${RANGER_RANKS[r].name} — ${RANGER_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function pickIncident(zone) {
    const bag = [];
    for (const inc of RANGER_INCIDENTS) {
      let w = 1;
      if (zone.id === 'peak' && inc.difficulty >= 4) w = 2;
      if (zone.id === 'camp' && (inc.id === 'bear-camp' || inc.id === 'campfire')) w = 2;
      if (zone.id === 'canyon' && inc.id === 'brush-fire') w = 2;
      if (zone.id === 'forest' && inc.id === 'poacher') w = 2;
      bag.push({ inc, w });
    }
    let total = 0;
    for (const b of bag) total += b.w;
    let roll = rng() * total;
    for (const b of bag) {
      roll -= b.w;
      if (roll <= 0) return b.inc;
    }
    return bag[0].inc;
  }

  function startPatrol(zoneId) {
    const zone = RANGER_PATROLS.find((z) => z.id === zoneId);
    if (!zone) return { ok: false, reason: 'no-such-zone' };
    if (state.patrol) return { ok: false, reason: 'patrol-active' };
    if (zone.difficulty >= 4 && state.rank < 3) return { ok: false, reason: 'rank-too-low', need: 3 };
    if (zone.difficulty >= 3 && state.rank < 1) return { ok: false, reason: 'rank-too-low', need: 1 };
    const hour = getHour();
    if (hour >= 22 || hour < 5) return { ok: false, reason: 'too-late' };
    state.patrol = zoneId;
    state.patrolProgress = 0;
    state.patrolTarget = zone;
    log(`Patrol started: ${zone.name} — ${zone.desc}`);
    return { ok: true, zone: zoneId };
  }

  function walkPatrol() {
    if (!state.patrol) return { ok: false, reason: 'no-patrol' };
    const zone = RANGER_PATROLS.find((z) => z.id === state.patrol);
    const speed = state.upgrades.includes('boots') ? 2 : 1;
    state.patrolProgress += speed;
    const need = zone.difficulty * 3;
    if (rng() < 0.25) {
      const animals = RANGER_WILDLIFE.filter((w) => w.zone === zone.id);
      if (animals.length > 0) {
        const seen = animals[Math.floor(rng() * animals.length)];
        state.wildlifeSeen[seen.id] += 1;
        state.wildlifeCounted += 1;
        gainXp(3);
        log(`Wildlife: a ${seen.name} — ${seen.desc}`);
      }
    }
    if (rng() < 0.2 + zone.incidents * 0.05) {
      const inc = pickIncident(zone);
      state.activeIncident = inc.id;
      state.incidentProgress = 0;
      state.incidents += 1;
      log(`Incident! ${inc.name} — ${inc.desc}`);
      return { ok: true, incident: inc.id, name: inc.name, progress: state.patrolProgress, need };
    }
    if (state.patrolProgress >= need) {
      return finishPatrol();
    }
    return { ok: true, progress: state.patrolProgress, need, done: false };
  }

  function respondIncident() {
    if (!state.activeIncident) return { ok: false, reason: 'no-incident' };
    const inc = RANGER_INCIDENTS.find((x) => x.id === state.activeIncident);
    const kitBonus = state.upgrades.includes('kit') ? 0.15 : 0;
    const vetBonus = state.upgrades.includes('vet') ? 0.15 : 0;
    const successChance = 0.6 + state.rank * 0.05 + kitBonus + vetBonus - (inc.difficulty - 1) * 0.08;
    state.incidentProgress += 1;
    const need = inc.difficulty;
    if (state.incidentProgress < need) {
      return { ok: true, progress: state.incidentProgress, need, done: false };
    }
    const roll = rng();
    state.activeIncident = null;
    state.incidentProgress = 0;
    if (roll > successChance) {
      state.incidentsFailed += 1;
      if (inc.id === 'brush-fire') state.firesFought += 0;
      log(`The ${inc.name} got away from you — the chief will hear about this.`);
      return { ok: true, solved: false, incident: inc.id };
    }
    const pay = rangerIncidentPay(inc, state.rank, state.upgrades);
    state.incidentsSolved += 1;
    state.earned += pay;
    state.dailyEarned += pay;
    addCash(pay);
    gainXp(15 + inc.difficulty * 8);
    if (inc.id === 'poacher') { state.poachersCaught += 1; addHeat(inc.heat); }
    if (inc.id === 'brush-fire') state.firesFought += 1;
    if (inc.id === 'injured-deer' || inc.id === 'orphan-cub' || inc.id === 'sick-fox') state.rescues += 1;
    if (pay > state.bestPay) { state.bestPay = pay; state.bestZone = state.patrol; }
    if (state.activeContract) checkContract(inc.id, 1);
    log(`Solved: ${inc.name} — paid $${pay}.`);
    return { ok: true, solved: true, incident: inc.id, pay };
  }

  function finishPatrol() {
    if (!state.patrol) return { ok: false, reason: 'no-patrol' };
    const zone = RANGER_PATROLS.find((z) => z.id === state.patrol);
    const pay = rangerPatrolPay(zone, state.rank, state.upgrades);
    state.patrols += 1;
    state.dailyPatrols += 1;
    state.zonesPatrolled[zone.id] += 1;
    state.earned += pay;
    state.dailyEarned += pay;
    state.wages += pay;
    addCash(pay);
    gainXp(10 + zone.difficulty * 5);
    state.patrol = null;
    state.patrolProgress = 0;
    state.patrolTarget = null;
    if (rng() < 0.15) {
      state.commendations += 1;
      log(`Patrol of ${zone.name} complete — $${pay} wage. The chief notes your good work.`);
    } else {
      log(`Patrol of ${zone.name} complete — $${pay} wage.`);
    }
    return { ok: true, done: true, zone: zone.id, pay };
  }

  function endPatrol() {
    if (!state.patrol) return { ok: false, reason: 'no-patrol' };
    const z = state.patrol;
    state.patrol = null;
    state.patrolProgress = 0;
    state.patrolTarget = null;
    state.activeIncident = null;
    state.incidentProgress = 0;
    log(`Patrol of ${z} cut short — back to the station.`);
    return { ok: true, zone: z };
  }

  function doTask(taskId) {
    const task = RANGER_TASKS.find((t) => t.id === taskId);
    if (!task) return { ok: false, reason: 'no-such-task' };
    const pay = task.pay + state.rank * 5;
    state.tasksDone += 1;
    state.earned += pay;
    state.dailyEarned += pay;
    addCash(pay);
    gainXp(6);
    log(`Task done: ${task.name} — $${pay}.`);
    return { ok: true, task: taskId, pay };
  }

  function countWildlife(wildlifeId) {
    const w = RANGER_WILDLIFE.find((x) => x.id === wildlifeId);
    if (!w) return { ok: false, reason: 'no-such-wildlife' };
    const seen = Math.floor(rng() * 3) + 1;
    state.wildlifeSeen[wildlifeId] += seen;
    state.wildlifeCounted += seen;
    gainXp(seen * 2);
    log(`Counted ${seen}x ${w.name} for the survey.`);
    return { ok: true, wildlife: wildlifeId, seen };
  }

  function buyUpgrade(id) {
    const u = RANGER_UPGRADES.find((x) => x.id === id);
    if (!u) return { ok: false, reason: 'no-such-upgrade' };
    if (state.upgrades.includes(id)) return { ok: false, reason: 'already-owned' };
    if (getCash() < u.cost) return { ok: false, reason: 'not-enough-cash', cost: u.cost };
    addCash(-u.cost);
    state.spent += u.cost;
    state.upgrades.push(id);
    gainXp(20);
    log(`Bought ${u.name} for $${u.cost}.`);
    return { ok: true, id };
  }

  function takeContract(id) {
    const ct = RANGER_CONTRACTS.find((x) => x.id === id);
    if (!ct) return { ok: false, reason: 'no-such-contract' };
    if (state.activeContract) return { ok: false, reason: 'contract-active' };
    if (state.rank < ct.rep) return { ok: false, reason: 'rep-too-low', need: ct.rep };
    state.activeContract = { ...ct, dayTaken: getDay(), deadlineDay: getDay() + ct.days };
    state.contractProgress = 0;
    log(`Contract taken: ${ct.name} — ${ct.qty}x in ${ct.zone} by day ${state.activeContract.deadlineDay}.`);
    return { ok: true, contract: state.activeContract };
  }

  function checkContract(incidentId, qty) {
    const ct = state.activeContract;
    if (!ct) return;
    const match =
      (ct.id === 'rescue-3' && (incidentId === 'lost-hiker' || incidentId === 'fallen-climber' || incidentId === 'storm-rescue')) ||
      (ct.id === 'fire-2' && incidentId === 'brush-fire') ||
      (ct.id === 'poacher-2' && incidentId === 'poacher') ||
      (ct.id === 'summit-1' && incidentId === 'storm-rescue');
    if (!match) return;
    state.contractProgress += qty;
    if (state.contractProgress >= ct.qty) {
      const bonus = ct.pay + state.rank * 50;
      state.activeContract = null;
      state.contractProgress = 0;
      state.contractsDone += 1;
      state.earned += bonus;
      addCash(bonus);
      gainXp(60);
      log(`Contract complete: ${ct.name} paid $${bonus}.`);
    }
  }

  function deliverContract() {
    const ct = state.activeContract;
    if (!ct) return { ok: false, reason: 'no-contract' };
    if (ct.id === 'patrol-5') {
      const done = state.zonesPatrolled[ct.zone] || 0;
      if (done < ct.qty) return { ok: false, reason: 'not-enough', have: done, need: ct.qty };
    } else if (ct.id === 'count-10') {
      if (state.wildlifeCounted < ct.qty) return { ok: false, reason: 'not-enough', have: state.wildlifeCounted, need: ct.qty };
    } else if (state.contractProgress < ct.qty) {
      return { ok: false, reason: 'not-enough', have: state.contractProgress, need: ct.qty };
    }
    const bonus = ct.pay + state.rank * 50;
    state.activeContract = null;
    state.contractProgress = 0;
    state.contractsDone += 1;
    state.earned += bonus;
    addCash(bonus);
    gainXp(60);
    log(`Contract delivered: ${ct.name} paid $${bonus}.`);
    return { ok: true, pay: bonus };
  }

  function abandonContract() {
    if (!state.activeContract) return { ok: false, reason: 'no-contract' };
    state.activeContract = null;
    state.contractProgress = 0;
    state.contractsFailed += 1;
    log('Contract abandoned — the chief will remember that.');
    return { ok: true };
  }

  function collectWage() {
    const wage = 40 + state.rank * 20 + state.commendations * 5;
    state.wages += wage;
    state.earned += wage;
    addCash(wage);
    log(`Daily wage collected: $${wage}.`);
    return { ok: true, wage };
  }

  function zoneReport() {
    return RANGER_PATROLS.map((z) => ({
      id: z.id, name: z.name, difficulty: z.difficulty, pay: rangerPatrolPay(z, state.rank, state.upgrades),
      wildlife: z.wildlife, incidents: z.incidents, patrolled: state.zonesPatrolled[z.id],
    }));
  }

  function wildlifeReport() {
    return RANGER_WILDLIFE.map((w) => ({
      id: w.id, name: w.name, zone: w.zone, seen: state.wildlifeSeen[w.id], count: w.count,
    }));
  }

  function dailyEvent() {
    const roll = rng();
    if (roll < 0.2) {
      const ev = RANGER_EVENTS[Math.floor(rng() * RANGER_EVENTS.length)];
      state.currentEvent = ev.id;
      log(`Park news: ${ev.name} — ${ev.desc}`);
      return { event: ev.id, name: ev.name };
    }
    if (roll < 0.3) {
      state.commendations += 1;
      log('A visitor writes a glowing letter about your patrols. Commendation +1.');
      return { event: 'commendation' };
    }
    state.currentEvent = null;
    return { event: 'none' };
  }

  function tick(dt) {
    if (state.patrol && rng() < dt * 0.005) {
      log('A bird calls from the treeline. The park is quiet today.');
    }
    if (state.activeIncident && rng() < dt * 0.01) {
      log('The incident needs you — respond before it gets worse.');
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyPatrols = 0;
    state.dailyEarned = 0;
    if (state.activeContract && day >= state.activeContract.deadlineDay) {
      const ct = state.activeContract;
      let done = false;
      if (ct.id === 'patrol-5') done = (state.zonesPatrolled[ct.zone] || 0) >= ct.qty;
      else if (ct.id === 'count-10') done = state.wildlifeCounted >= ct.qty;
      else done = state.contractProgress >= ct.qty;
      if (!done) {
        log(`Contract ${ct.name} expired — the chief is disappointed.`);
        state.activeContract = null;
        state.contractProgress = 0;
        state.contractsFailed += 1;
      }
    }
    if (state.currentEvent === 'fire-season' && rng() < 0.3) {
      state.activeIncident = 'brush-fire';
      state.incidentProgress = 0;
      state.incidents += 1;
      log('Fire season: a brush fire starts in the dry scrub!');
    }
    dailyEvent();
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, patrols: state.patrols,
      incidents: state.incidents, incidentsSolved: state.incidentsSolved,
      incidentsFailed: state.incidentsFailed, rescues: state.rescues,
      poachersCaught: state.poachersCaught, firesFought: state.firesFought,
      wildlifeCounted: state.wildlifeCounted, tasksDone: state.tasksDone,
      commendations: state.commendations, earned: state.earned, spent: state.spent,
      wages: state.wages, upgrades: state.upgrades, patrol: state.patrol, patrolProgress: state.patrolProgress,
      patrolTarget: state.patrolTarget, activeIncident: state.activeIncident,
      incidentProgress: state.incidentProgress, lastDay: state.lastDay,
      activeContract: state.activeContract, contractProgress: state.contractProgress,
      contractsDone: state.contractsDone, contractsFailed: state.contractsFailed,
      bestZone: state.bestZone, bestPay: state.bestPay,
      dailyPatrols: state.dailyPatrols, dailyEarned: state.dailyEarned,
      currentEvent: state.currentEvent, wildlifeSeen: state.wildlifeSeen,
      zonesPatrolled: state.zonesPatrolled, injuries: state.injuries,
    }));
  }

  function deserialize(d) {
    if (!d || typeof d !== 'object') return;
    for (const k of Object.keys(state)) {
      if (d[k] !== undefined) state[k] = d[k];
    }
    for (const w of RANGER_WILDLIFE) {
      if (state.wildlifeSeen[w.id] === undefined) state.wildlifeSeen[w.id] = 0;
    }
    for (const z of RANGER_PATROLS) {
      if (state.zonesPatrolled[z.id] === undefined) state.zonesPatrolled[z.id] = 0;
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: RANGER_RANKS[state.rank].name,
      xp: state.xp,
      patrols: state.patrols,
      incidents: state.incidents,
      incidentsSolved: state.incidentsSolved,
      incidentsFailed: state.incidentsFailed,
      rescues: state.rescues,
      poachersCaught: state.poachersCaught,
      firesFought: state.firesFought,
      wildlifeCounted: state.wildlifeCounted,
      tasksDone: state.tasksDone,
      commendations: state.commendations,
      earned: Math.round(state.earned),
      spent: state.spent,
      wages: state.wages,
      upgrades: state.upgrades.length,
      patrol: state.patrol,
      activeIncident: state.activeIncident,
      activeContract: state.activeContract ? state.activeContract.id : null,
      contractsDone: state.contractsDone,
      contractsFailed: state.contractsFailed,
      bestZone: state.bestZone,
      dailyPatrols: state.dailyPatrols,
      dailyEarned: Math.round(state.dailyEarned),
      event: state.currentEvent,
    };
  }

  function hudLine() {
    if (state.activeIncident) {
      const inc = RANGER_INCIDENTS.find((x) => x.id === state.activeIncident);
      return `Ranger: ${inc ? inc.name : state.activeIncident} — respond now!`;
    }
    if (state.patrol) return `Ranger: patrolling ${state.patrol} — ${state.patrolProgress} walked`;
    if (state.activeContract) return `Ranger: ${state.activeContract.name} ${state.contractProgress}/${state.activeContract.qty}`;
    if (state.commendations > 0) return `Ranger: ${state.commendations} commendations`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearStation = Math.hypot(pos.x - 600, pos.z - 100) < 40;
    if (!nearStation) return false;
    if (state.activeIncident) { respondIncident(); return true; }
    if (!state.patrol) { startPatrol('meadow'); return true; }
    walkPatrol();
    return true;
  }

  return {
    state, startPatrol, walkPatrol, respondIncident, finishPatrol,
    endPatrol, doTask, countWildlife, buyUpgrade, takeContract,
    deliverContract, abandonContract, collectWage, zoneReport,
    wildlifeReport, dailyEvent,
    tick, tickDay, serialize, deserialize, stats, hudLine, interact,
  };
}

export const RANGER_HELPERS = [
  { id: 'trainee', name: 'Trainee Kip', wage: 25, skill: 'patrol', bonus: 0.2, desc: 'Eager legs: patrols finish 20% faster.' },
  { id: 'vet', name: 'Vet Soraya', wage: 55, skill: 'rescue', bonus: 0.25, desc: 'Treats animals on the spot: +25% rescue pay.' },
  { id: 'firefighter', name: 'Firefighter Bo', wage: 60, skill: 'fire', bonus: 0.3, desc: 'Fights fire like a pro: +30% fire pay.' },
  { id: 'tracker', name: 'Tracker Ash', wage: 50, skill: 'spot', bonus: 0.25, desc: 'Spots poachers early: +25% poacher pay.' },
];

export const RANGER_CHALLENGES = [
  { id: 'patrols-10', name: 'Ten Patrols', target: 'patrols', goal: 10, xp: 80, desc: 'Finish 10 patrols.' },
  { id: 'incidents-15', name: 'Incident Pro', target: 'incidentsSolved', goal: 15, xp: 120, desc: 'Solve 15 incidents.' },
  { id: 'rescues-5', name: 'Lifesaver', target: 'rescues', goal: 5, xp: 120, desc: 'Rescue 5 animals or people.' },
  { id: 'poachers-3', name: 'Poacher Hunter', target: 'poachersCaught', goal: 3, xp: 150, desc: 'Catch 3 poachers.' },
  { id: 'fires-3', name: 'Firefighter', target: 'firesFought', goal: 3, xp: 150, desc: 'Fight 3 brush fires.' },
  { id: 'wildlife-50', name: 'Wildlife Watcher', target: 'wildlifeCounted', goal: 50, xp: 100, desc: 'Count 50 wildlife sightings.' },
  { id: 'commend-5', name: 'People’s Ranger', target: 'commendations', goal: 5, xp: 140, desc: 'Earn 5 commendations.' },
  { id: 'earn-1500', name: 'Ranger’s Purse', target: 'earned', goal: 1500, xp: 120, desc: 'Earn $1,500 as a ranger.' },
];

export const RANGER_ACHIEVEMENTS = [
  { id: 'first-patrol', name: 'First Patrol', check: (s) => s.patrols >= 1, desc: 'Finish your first patrol.' },
  { id: 'first-rescue', name: 'First Rescue', check: (s) => s.rescues >= 1, desc: 'Rescue your first animal or person.' },
  { id: 'first-poacher', name: 'First Poacher', check: (s) => s.poachersCaught >= 1, desc: 'Catch your first poacher.' },
  { id: 'rank-3', name: 'Head Ranger', check: (s) => s.rank >= 3, desc: 'Reach rank Head Ranger.' },
  { id: 'rich-ranger', name: 'Rich Ranger', check: (s) => s.earned >= 3000, desc: 'Earn $3,000 as a ranger.' },
  { id: 'full-kit', name: 'Full Kit', check: (s) => s.upgrades.length >= 8, desc: 'Own every ranger upgrade.' },
  { id: 'no-fail', name: 'Perfect Record', check: (s) => s.incidentsSolved >= 20 && s.incidentsFailed === 0, desc: 'Solve 20 incidents without failing one.' },
  { id: 'summit', name: 'Summit Hero', check: (s) => s.bestZone === 'peak', desc: 'Earn your best pay on the summit.' },
];

export function rangerHelperBonus(helpers, skill) {
  let bonus = 0;
  for (const h of RANGER_HELPERS) {
    if (helpers.includes(h.id) && h.skill === skill) bonus += h.bonus;
  }
  return bonus;
}

export function rangerChallengeProgress(challenge, state) {
  const v = state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function createParkRangerExtras(system) {
  const helpers = [];
  const claimed = [];
  let wagesPaid = 0;

  function hireHelper(id) {
    const h = RANGER_HELPERS.find((x) => x.id === id);
    if (!h) return { ok: false, reason: 'no-such-helper' };
    if (helpers.includes(id)) return { ok: false, reason: 'already-hired' };
    helpers.push(id);
    return { ok: true, id, name: h.name, wage: h.wage };
  }

  function fireHelper(id) {
    const i = helpers.indexOf(id);
    if (i < 0) return { ok: false, reason: 'not-hired' };
    helpers.splice(i, 1);
    return { ok: true, id };
  }

  function payWages() {
    let due = 0;
    for (const id of helpers) {
      const h = RANGER_HELPERS.find((x) => x.id === id);
      due += h.wage;
    }
    wagesPaid += due;
    return { due, helpers: [...helpers], totalPaid: wagesPaid };
  }

  function helperBonus(skill) {
    return rangerHelperBonus(helpers, skill);
  }

  function challenges() {
    return RANGER_CHALLENGES.map((ch) => rangerChallengeProgress(ch, system.state));
  }

  function claimChallenge(id) {
    const ch = RANGER_CHALLENGES.find((x) => x.id === id);
    if (!ch) return { ok: false, reason: 'no-such-challenge' };
    if (claimed.includes(id)) return { ok: false, reason: 'already-claimed' };
    const p = rangerChallengeProgress(ch, system.state);
    if (!p.done) return { ok: false, reason: 'not-done', have: p.have, goal: p.goal };
    claimed.push(id);
    return { ok: true, id, xp: ch.xp };
  }

  function achievements() {
    return RANGER_ACHIEVEMENTS.map((a) => ({
      id: a.id, name: a.name, desc: a.desc, done: !!a.check(system.state),
    }));
  }

  function incidentInfo(incidentId) {
    const inc = RANGER_INCIDENTS.find((x) => x.id === incidentId);
    if (!inc) return { ok: false, reason: 'no-such-incident' };
    return { ok: true, ...inc, pay: rangerIncidentPay(inc, system.state.rank, system.state.upgrades) };
  }

  function patrolSummary() {
    return { patrols: system.state.patrols, zones: { ...system.state.zonesPatrolled } };
  }

  function wildlifeSummary() {
    return { counted: system.state.wildlifeCounted, seen: { ...system.state.wildlifeSeen } };
  }

  return {
    hireHelper, fireHelper, payWages, helperBonus, challenges,
    claimChallenge, achievements, incidentInfo, patrolSummary, wildlifeSummary,
    get helpers() { return [...helpers]; },
    get claimed() { return [...claimed]; },
    get wagesPaid() { return wagesPaid; },
  };
}

export const RANGER_TIPS = [
  { id: 'radio-first', name: 'Radio First', text: 'A radio turns a lonely patrol into a team effort.' },
  { id: 'fire-season', name: 'Fire Season', text: 'In fire season, check every campfire twice.' },
  { id: 'bear', name: 'Bears', text: 'Never feed a bear. Never run from one either.' },
  { id: 'poacher', name: 'Poachers', text: 'Poachers work the closed zones at dawn. Be there.' },
  { id: 'rescue-kit', name: 'Rescue Kit', text: 'A rescue kit turns a tragedy into a story.' },
  { id: 'count', name: 'Count Everything', text: 'Wildlife counts win the park its funding.' },
  { id: 'summit', name: 'The Summit', text: 'Summit rescues pay double — and demand the best.' },
  { id: 'commend', name: 'Commendations', text: 'Kind words from visitors become promotions.' },
];

export const RANGER_LEADERBOARD = [
  { name: 'Chief Mara', patrols: 900, desc: 'Thirty years on the trails.' },
  { name: 'Firefighter Bo', patrols: 620, desc: 'Fights fire like a pro.' },
  { name: 'Ria', patrols: 0, desc: 'You. Climbing.' },
  { name: 'Vet Soraya', patrols: 480, desc: 'Saves every animal she can.' },
  { name: 'Tracker Ash', patrols: 390, desc: 'Reads the ground like a book.' },
];

export function rangerTipFor(day) {
  return RANGER_TIPS[day % RANGER_TIPS.length];
}

export function rangerLeaderboardWith(playerPatrols) {
  const board = RANGER_LEADERBOARD.map((e) => ({
    name: e.name, patrols: e.name === 'Ria' ? playerPatrols : e.patrols, desc: e.desc,
  }));
  board.sort((a, b) => b.patrols - a.patrols);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function rangerEfficiency(incidentsSolved, incidents) {
  if (incidents === 0) return 100;
  return Math.round((incidentsSolved / incidents) * 100);
}

export function rangerProfitPerPatrol(earned, patrols) {
  if (patrols === 0) return 0;
  return Math.round((earned / patrols) * 10) / 10;
}

export function rangerGrade(incidentsSolved, incidentsFailed, rescues) {
  const total = incidentsSolved + incidentsFailed;
  if (total === 0) return 'D';
  const rate = incidentsSolved / total;
  if (rate >= 0.95 && rescues >= 3) return 'S';
  if (rate >= 0.85) return 'A';
  if (rate >= 0.7) return 'B';
  if (rate >= 0.5) return 'C';
  return 'D';
}

export const RANGER_RECORDS = [
  { id: 'most-patrols', name: 'Most Patrols', stat: 'patrols', unit: 'patrols', desc: 'Most patrols finished.' },
  { id: 'most-solved', name: 'Most Solved', stat: 'incidentsSolved', unit: 'incidents', desc: 'Most incidents solved.' },
  { id: 'most-rescues', name: 'Most Rescues', stat: 'rescues', unit: 'rescues', desc: 'Most rescues made.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money as a ranger.' },
  { id: 'commendations', name: 'Most Commendations', stat: 'commendations', unit: 'notes', desc: 'Most commendations earned.' },
];

export function rangerRecordFor(recordId, state) {
  const r = RANGER_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function rangerAllRecords(state) {
  return RANGER_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function rangerSummary(state) {
  return `Ranger ${RANGER_RANKS[state.rank].name}: ${state.patrols} patrols, ${state.incidentsSolved} incidents solved, ${state.rescues} rescues, $${Math.round(state.earned)} earned.`;
}

export function rangerNextGoal(state) {
  if (state.patrols < 5) return 'Finish 5 patrols.';
  if (state.incidentsSolved < 10) return 'Solve 10 incidents.';
  if (state.rank < 2) return 'Reach rank Senior Ranger.';
  return 'Earn a summit rescue on the peak.';
}

export const RANGER_QUICK_START = [
  'Start patrols in the meadow — easy and safe.',
  'Buy the radio before you chase poachers.',
  'Respond to incidents fast — they get worse with time.',
  'Rescue animals: the vet training pays for itself.',
  'Count wildlife on every patrol for the survey.',
  'Fire season means checking every campfire twice.',
];

export function rangerQuickStart(step) {
  return RANGER_QUICK_START[step] || null;
}

export const RANGER_META = {
  system: 'parkRanger', version: '7-B1', author: 'builder-1',
  zones: RANGER_PATROLS.length, incidents: RANGER_INCIDENTS.length,
  note: 'Green Patrol: patrol, rescue, protect.',
};

export const RANGER_SEASONS = [
  { id: 'spring', name: 'Spring', months: [3, 4, 5], patrolMult: 1.0, incidentMult: 1.0, desc: 'Wildflowers, newborn animals, and muddy trails.' },
  { id: 'summer', name: 'Summer', months: [6, 7, 8], patrolMult: 1.2, incidentMult: 1.3, desc: 'Crowds, campfires, and fire season.' },
  { id: 'autumn', name: 'Autumn', months: [9, 10, 11], patrolMult: 1.1, incidentMult: 1.0, desc: 'Golden leaves, migrating birds, and hunters.' },
  { id: 'winter', name: 'Winter', months: [12, 1, 2], patrolMult: 0.8, incidentMult: 0.9, desc: 'Snow, silence, and the occasional lost skier.' },
];

export const RANGER_GEAR = [
  { id: 'pack', name: 'Trail Pack', cost: 40, desc: 'Water, food, and a first-aid kit in one pack.' },
  { id: 'compass', name: 'Compass', cost: 30, desc: 'Never get lost on the back trails.' },
  { id: 'bear-spray', name: 'Bear Spray', cost: 60, desc: 'A last resort that works — keep it handy.' },
  { id: 'rope', name: 'Rescue Rope', cost: 50, desc: 'Fifty metres of climbing rope.' },
  { id: 'lantern', name: 'Storm Lantern', cost: 35, desc: 'Light for night patrols and cave checks.' },
  { id: 'notebook', name: 'Field Notebook', cost: 15, desc: 'Record every sighting for the survey.' },
  { id: 'camera', name: 'Trail Camera', cost: 120, desc: 'Photograph wildlife and poachers alike.' },
  { id: 'gps', name: 'Handheld GPS', cost: 140, desc: 'Pin every incident to the map.' },
];

export function rangerSeasonFor(month) {
  for (const s of RANGER_SEASONS) {
    if (s.months.includes(month)) return s;
  }
  return RANGER_SEASONS[0];
}

export function rangerSeasonMult(seasonId) {
  const s = RANGER_SEASONS.find((x) => x.id === seasonId);
  return s ? s.patrolMult : 1;
}

export function rangerIncidentMult(seasonId) {
  const s = RANGER_SEASONS.find((x) => x.id === seasonId);
  return s ? s.incidentMult : 1;
}

export function rangerGearFor(gearId) {
  return RANGER_GEAR.find((g) => g.id === gearId) || null;
}

export function rangerSeasonalPay(zone, seasonId, rank, upgrades) {
  return Math.round(rangerPatrolPay(zone, rank, upgrades) * rangerSeasonMult(seasonId));
}

export function createParkRangerJournal(system) {
  const entries = [];
  let pages = 0;

  function addEntry(text) {
    entries.push({ day: system.state.lastDay, text });
    pages += 1;
    return { ok: true, entries: entries.length };
  }

  function logPatrol(zoneId) {
    const zone = RANGER_PATROLS.find((z) => z.id === zoneId);
    if (!zone) return { ok: false, reason: 'no-such-zone' };
    return addEntry(`Patrolled ${zone.name} — ${zone.desc}`);
  }

  function logIncident(incidentId) {
    const inc = RANGER_INCIDENTS.find((x) => x.id === incidentId);
    if (!inc) return { ok: false, reason: 'no-such-incident' };
    return addEntry(`Incident: ${inc.name} — ${inc.desc}`);
  }

  function logWildlife(wildlifeId, count) {
    const w = RANGER_WILDLIFE.find((x) => x.id === wildlifeId);
    if (!w) return { ok: false, reason: 'no-such-wildlife' };
    return addEntry(`Saw ${count}x ${w.name} in ${w.zone}.`);
  }

  function readEntries(limit) {
    const n = limit || entries.length;
    return entries.slice(-n);
  }

  function seasonSummary(month) {
    const season = rangerSeasonFor(month);
    return {
      season: season.id, name: season.name,
      patrolMult: season.patrolMult, incidentMult: season.incidentMult,
      desc: season.desc, patrols: system.state.patrols,
      incidentsSolved: system.state.incidentsSolved,
    };
  }

  return {
    addEntry, logPatrol, logIncident, logWildlife, readEntries, seasonSummary,
    get entries() { return [...entries]; },
    get pages() { return pages; },
  };
}

export const RANGER_FIELD_SIGNS = [
  { id: 'tracks', name: 'Fresh Tracks', text: 'Something large passed here within the hour.' },
  { id: 'scat', name: 'Fresh Scat', text: 'Bear scat, still warm. Be alert.' },
  { id: 'rub', name: 'Rub Tree', text: 'A bear rubbed its back here — territory marked.' },
  { id: 'nest', name: 'Eagle Nest', text: 'A huge nest in the pine — eagles are home.' },
  { id: 'dam', name: 'Beaver Dam', text: 'A new dam floods the lower trail.' },
  { id: 'feathers', name: 'Scattered Feathers', text: 'A kill site — a hawk ate here.' },
];

export function rangerFieldSignFor(signId) {
  return RANGER_FIELD_SIGNS.find((s) => s.id === signId) || null;
}

export function rangerSignsForZone(zoneId) {
  const zone = RANGER_PATROLS.find((z) => z.id === zoneId);
  if (!zone) return [];
  if (zone.terrain === 'woods') return RANGER_FIELD_SIGNS.filter((s) => ['tracks', 'rub', 'nest', 'feathers'].includes(s.id));
  if (zone.terrain === 'water' || zone.terrain === 'wet') return RANGER_FIELD_SIGNS.filter((s) => ['dam', 'tracks'].includes(s.id));
  return RANGER_FIELD_SIGNS.slice(0, 2);
}
