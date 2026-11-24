// prisonbreak.js — Prison Break: plan, dig, bribe, and run.
// You are inside Blackgate Prison with a sentence to escape. Build a plan,
// gather contraband, craft tools, dig a tunnel or bribe a guard, and slip
// out during the blind spot in the patrol. Guards patrol on a schedule,
// cameras have blind angles, and every favour costs something. Get caught
// and you lose your tools and gain solitary days. Get out and the whole
// city becomes your hideout. Pure logic, no rendering, no imports.
// Factory: createPrisonBreakSystem(deps) with deps { rng, getHour, getDay,
// getCash, addCash, addHeat, log, getPlayerPos }.

// ---------------------------------------------------------------------------
// Data tables
// ---------------------------------------------------------------------------

// Cell blocks: security level, patrol density, tunnel soil.
export const CELL_BLOCKS = [
  { id: 'block-a', name: 'Block A — Minimum', security: 1, patrol: 2, soil: 'soft', desc: 'White-collar wing. Guards are bored here.' },
  { id: 'block-b', name: 'Block B — Medium', security: 2, patrol: 3, soil: 'soft', desc: 'The general population. Busy, noisy, watchful.' },
  { id: 'block-c', name: 'Block C — High', security: 3, patrol: 4, soil: 'hard', desc: 'Violent offenders. Cameras everywhere.' },
  { id: 'block-d', name: 'Block D — Maximum', security: 4, patrol: 5, soil: 'rock', desc: 'Solitary and lifers. One mistake and you are done.' },
  { id: 'infirmary', name: 'Infirmary Wing', security: 2, patrol: 2, soil: 'soft', desc: 'Sick inmates and sleepy orderlies.' },
  { id: 'kitchen', name: 'Kitchen Wing', security: 2, patrol: 3, soil: 'soft', desc: 'Knives, steam, and a door to the yard.' },
  { id: 'laundry', name: 'Laundry Wing', security: 1, patrol: 2, soil: 'soft', desc: 'Sheets, steam, and the delivery truck.' },
  { id: 'workshop', name: 'Workshop', security: 3, patrol: 3, soil: 'hard', desc: 'Tools everywhere — if you can pocket one.' },
];

// Escape plans: the big strategies, each with stages and difficulty.
export const ESCAPE_PLANS = [
  { id: 'tunnel', name: 'The Tunnel', stages: 5, difficulty: 3, desc: 'Dig from your cell to the sewer. Slow, quiet, classic.' },
  { id: 'laundry-truck', name: 'Laundry Truck', stages: 3, difficulty: 2, desc: 'Hide in the laundry cart and ride out.' },
  { id: 'guard-uniform', name: 'Guard Uniform', stages: 4, difficulty: 4, desc: 'Steal a uniform, walk out the front gate.' },
  { id: 'roof', name: 'Rooftop Run', stages: 4, difficulty: 4, desc: 'Over the roof, down the wall, into the night.' },
  { id: 'infirmary', name: 'Infirmary Swap', stages: 3, difficulty: 3, desc: 'Swap places with a corpse on the way to the morgue.' },
  { id: 'riot', name: 'Riot Cover', stages: 4, difficulty: 5, desc: 'Start a riot and walk out in the chaos.' },
  { id: 'helicopter', name: 'Helicopter Pickup', stages: 5, difficulty: 5, desc: 'A friend lands on the yard at midnight.' },
  { id: 'sewer', name: 'Sewer Crawl', stages: 4, difficulty: 3, desc: 'Through the drains under the kitchen.' },
  { id: 'visit-swap', name: 'Visitor Swap', stages: 3, difficulty: 4, desc: 'Swap clothes with a visitor in the meeting room.' },
  { id: 'kitchen-truck', name: 'Kitchen Truck', stages: 3, difficulty: 2, desc: 'Hide among the food crates on the supply truck.' },
];

// Contraband: what you can smuggle, trade, or craft with.
export const CONTRABAND = [
  { id: 'spoon', name: 'Spoon', value: 5, suspicion: 1, use: 'Digging tool base.', desc: 'A spoon. The oldest escape tool there is.' },
  { id: 'shank', name: 'Shank', value: 20, suspicion: 4, use: 'Weapon / leverage.', desc: 'Do not get caught with this.' },
  { id: 'phone', name: 'Smuggled Phone', value: 200, suspicion: 5, use: 'Call the outside.', desc: 'A phone is worth more than gold in here.' },
  { id: 'cigarettes', name: 'Cigarettes', value: 30, suspicion: 2, use: 'Currency / bribes.', desc: 'The prison currency.' },
  { id: 'rope', name: 'Rope', value: 40, suspicion: 3, use: 'Climbing / tying.', desc: 'Braided from bedsheets.' },
  { id: 'uniform', name: 'Guard Uniform', value: 500, suspicion: 5, use: 'Disguise.', desc: 'Walk out like you own the place.' },
  { id: 'key-copy', name: 'Copied Key', value: 300, suspicion: 4, use: 'Opens cell doors.', desc: 'Wax impression, filed by hand.' },
  { id: 'map', name: 'Prison Map', value: 100, suspicion: 2, use: 'Know the blind spots.', desc: 'Every camera, every patrol, drawn by hand.' },
  { id: 'pills', name: 'Sleeping Pills', value: 80, suspicion: 3, use: 'Drug a guard.', desc: 'For the guard who never sleeps.' },
  { id: 'wire', name: 'Wire Cutter', value: 150, suspicion: 4, use: 'Cut fences.', desc: 'Snips through chain link like paper.' },
  { id: 'disguise-kit', name: 'Disguise Kit', value: 250, suspicion: 3, use: 'Change your face.', desc: 'Wig, glasses, and a new walk.' },
  { id: 'explosive', name: 'Homemade Explosive', value: 400, suspicion: 5, use: 'Blow a wall.', desc: 'Loud, messy, and final.' },
  { id: 'food', name: 'Extra Food', value: 10, suspicion: 0, use: 'Trade / energy.', desc: 'A full stomach thinks better.' },
  { id: 'soap', name: 'Soap', value: 5, suspicion: 0, use: 'Trade / grease.', desc: 'Everybody needs soap.' },
  { id: 'battery', name: 'Battery', value: 25, suspicion: 1, use: 'Power / trade.', desc: 'Powers a phone or a light.' },
];

// Craftable tools: recipes from contraband.
export const CRAFT_RECIPES = [
  { id: 'dig-kit', name: 'Digging Kit', needs: { spoon: 2, soap: 1 }, desc: 'A spoon sharpened on concrete, greased with soap.' },
  { id: 'rope-ladder', name: 'Rope Ladder', needs: { rope: 2 }, desc: 'For climbing down the wall.' },
  { id: 'fake-key', name: 'Fake Key Set', needs: { 'key-copy': 1, soap: 1 }, desc: 'A moulded key that opens most doors.' },
  { id: 'guard-disguise', name: 'Guard Disguise', needs: { uniform: 1, 'disguise-kit': 1 }, desc: 'A full guard look, down to the walk.' },
  { id: 'distraction-bomb', name: 'Smoke Bomb', needs: { battery: 1, soap: 2 }, desc: 'Smoke and noise. Guards run toward it.' },
  { id: 'tunnel-shore', name: 'Tunnel Supports', needs: { rope: 1, spoon: 1 }, desc: 'Keeps the tunnel from collapsing.' },
  { id: 'lockpick', name: 'Lockpick Set', needs: { wire: 1, spoon: 1 }, desc: 'Opens locks quietly.' },
  { id: 'grapple', name: 'Grappling Hook', needs: { wire: 1, rope: 1 }, desc: 'Hook the roof, climb the wall.' },
];

// Guards: who patrols, how sharp they are, how bribable.
export const GUARDS = [
  { id: 'rookie', name: 'Rookie Guard', alertness: 1, bribable: 0.8, shift: 'day', desc: 'New, nervous, and cheap to bribe.' },
  { id: 'veteran', name: 'Veteran Guard', alertness: 3, bribable: 0.4, shift: 'day', desc: 'Seen it all. Hard to fool.' },
  { id: 'sergeant', name: 'Sergeant', alertness: 4, bribable: 0.2, shift: 'day', desc: 'Runs the block. Almost unbribable.' },
  { id: 'night-owl', name: 'Night Guard', alertness: 2, bribable: 0.6, shift: 'night', desc: 'Sleepy at 3 AM. Very bribable then.' },
  { id: 'warden', name: 'The Warden', alertness: 5, bribable: 0.05, shift: 'day', desc: 'Do not even try.' },
  { id: 'dog-handler', name: 'Dog Handler', alertness: 4, bribable: 0.1, shift: 'night', desc: 'The dogs smell fear. And tunnels.' },
  { id: 'tower', name: 'Tower Guard', alertness: 3, bribable: 0.3, shift: 'night', desc: 'Watches the wall with a spotlight.' },
  { id: 'infirmary-guard', name: 'Infirmary Guard', alertness: 1, bribable: 0.7, shift: 'day', desc: 'Reads magazines all shift.' },
];

// Allies inside: inmates who help, for a price.
export const ALLIES = [
  { id: 'old-joe', name: 'Old Joe', skill: 'maps', cost: 50, desc: 'Knows every blind spot. Sells maps.' },
  { id: 'muscles', name: 'Muscles', skill: 'muscle', cost: 100, desc: 'Starts the riot. Holds the door.' },
  { id: 'doc', name: 'Doc', skill: 'medical', cost: 80, desc: 'Fakes your illness for the infirmary plan.' },
  { id: 'sneaky', name: 'Sneaky Pete', skill: 'stealth', cost: 120, desc: 'Steals anything, from anyone, quietly.' },
  { id: 'tech', name: 'Tech', skill: 'electronics', cost: 150, desc: 'Loops the cameras for exactly four minutes.' },
  { id: 'cook', name: 'The Cook', skill: 'kitchen', cost: 60, desc: 'Hides you in the kitchen truck.' },
  { id: 'librarian', name: 'The Librarian', skill: 'info', cost: 40, desc: 'Knows who is bribable and who is not.' },
  { id: 'ghost', name: 'Ghost', skill: 'tunnel', cost: 200, desc: 'Dug three tunnels. Never caught.' },
];

// Guard patrol schedule: hour -> patrol intensity (0-5) per shift.
export const PATROL_SCHEDULE = [
  { hour: 0, intensity: 2 }, { hour: 1, intensity: 2 }, { hour: 2, intensity: 1 },
  { hour: 3, intensity: 1 }, { hour: 4, intensity: 2 }, { hour: 5, intensity: 3 },
  { hour: 6, intensity: 4 }, { hour: 7, intensity: 4 }, { hour: 8, intensity: 3 },
  { hour: 9, intensity: 3 }, { hour: 10, intensity: 3 }, { hour: 11, intensity: 3 },
  { hour: 12, intensity: 4 }, { hour: 13, intensity: 3 }, { hour: 14, intensity: 3 },
  { hour: 15, intensity: 4 }, { hour: 16, intensity: 4 }, { hour: 17, intensity: 4 },
  { hour: 18, intensity: 3 }, { hour: 19, intensity: 3 }, { hour: 20, intensity: 3 },
  { hour: 21, intensity: 2 }, { hour: 22, intensity: 2 }, { hour: 23, intensity: 2 },
];

// Prison break missions.
export const PRISON_MISSIONS = [
  { id: 'first-contraband', name: 'First Contraband', desc: 'Smuggle in your first contraband item.', reward: 50 },
  { id: 'first-craft', name: 'Craftsman', desc: 'Craft your first escape tool.', reward: 100 },
  { id: 'first-bribe', name: 'Bribe Paid', desc: 'Successfully bribe a guard.', reward: 150 },
  { id: 'tunnel-half', name: 'Halfway Out', desc: 'Dig a tunnel to 50%.', reward: 300 },
  { id: 'tunnel-done', name: 'Tunnel Complete', desc: 'Finish digging a tunnel.', reward: 800 },
  { id: 'first-escape', name: 'Free!', desc: 'Escape Blackgate Prison.', reward: 2000 },
  { id: 'ghost-escape', name: 'Ghost Escape', desc: 'Escape without ever being spotted.', reward: 5000 },
  { id: 'five-escapes', name: 'Repeat Offender', desc: 'Escape 5 times.', reward: 3000 },
  { id: 'riot-escape', name: 'Riot Runner', desc: 'Escape during a riot.', reward: 1500 },
  { id: 'no-solitary', name: 'Clean Record', desc: 'Escape without ever going to solitary.', reward: 1000 },
];

// Solitary punishments and their costs.
export const SOLITARY_TERMS = [
  { days: 1, reason: 'Caught with minor contraband.' },
  { days: 3, reason: 'Caught digging.' },
  { days: 7, reason: 'Caught with a weapon.' },
  { days: 14, reason: 'Caught mid-escape.' },
];

// Hideouts after escape: where you lay low, what they cost.
export const HIDEOUTS = [
  { id: 'motel', name: 'Cheap Motel', costPerDay: 30, heatDrop: 1, desc: 'Pay cash, no questions.' },
  { id: 'friend-couch', name: 'Friend Couch', costPerDay: 0, heatDrop: 1, desc: 'Free, but the friend talks.' },
  { id: 'safehouse', name: 'Safehouse', costPerDay: 100, heatDrop: 3, desc: 'Proper hideout. Nobody finds you.' },
  { id: 'boat', name: 'Fishing Boat', costPerDay: 50, heatDrop: 2, desc: 'Out on the water, out of sight.' },
  { id: 'abroad', name: 'Out of Town', costPerDay: 200, heatDrop: 5, desc: 'Leave the city entirely.' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clampNum(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

export function patrolIntensity(hour) {
  const h = Math.floor(hour) % 24;
  const row = PATROL_SCHEDULE.find((p) => p.hour === h);
  return row ? row.intensity : 3;
}

export function bestEscapeHour() {
  let best = PATROL_SCHEDULE[0];
  for (const p of PATROL_SCHEDULE) if (p.intensity < best.intensity) best = p;
  return best.hour;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createPrisonBreakSystem(deps) {
  const d = deps || {};
  const rng = d.rng || Math.random;
  const getHour = d.getHour || (() => 12);
  const getDay = d.getDay || (() => 1);
  const getCash = d.getCash || (() => 0);
  const addCash = d.addCash || (() => {});
  const addHeat = d.addHeat || (() => {});
  const log = d.log || (() => {});

  const state = {
    inPrison: true,
    sentenceDays: 30,
    daysServed: 0,
    blockId: 'block-b',
    planId: null,
    planStage: 0,
    planProgress: 0,
    contraband: { spoon: 1, soap: 2 },
    tools: [],
    alliesHired: [],
    reputation: 0,
    suspicion: 0,
    solitaryDays: 0,
    inSolitary: false,
    detection: 0,
    tunnelProgress: 0,
    tunnelComplete: false,
    bribesPaid: 0,
    escapes: 0,
    escapesUnseen: 0,
    timesCaught: 0,
    hideoutId: null,
    heat: 0,
    missionsDone: {},
    day: 1,
    lastActionDay: 0,
    riotActive: false,
    cameraLoop: 0,
    disguised: false,
  };

  function block() {
    return CELL_BLOCKS.find((b) => b.id === state.blockId) || CELL_BLOCKS[1];
  }

  function plan() {
    return ESCAPE_PLANS.find((p) => p.id === state.planId) || null;
  }

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const m = PRISON_MISSIONS.find((x) => x.id === id);
    if (!m) return;
    let done = false;
    switch (id) {
      case 'first-contraband': done = Object.keys(state.contraband).length >= 2; break;
      case 'first-craft': done = state.tools.length >= 1; break;
      case 'first-bribe': done = state.bribesPaid >= 1; break;
      case 'tunnel-half': done = state.tunnelProgress >= 50; break;
      case 'tunnel-done': done = state.tunnelComplete; break;
      case 'first-escape': done = state.escapes >= 1; break;
      case 'ghost-escape': done = state.escapesUnseen >= 1; break;
      case 'five-escapes': done = state.escapes >= 5; break;
      case 'riot-escape': done = (state.riotEscapes || 0) >= 1; break;
      case 'no-solitary': done = state.escapes >= 1 && state.solitaryDays === 0; break;
      default: done = false;
    }
    if (!done) return;
    state.missionsDone[id] = true;
    addCash(m.reward);
    log(`Prison mission complete: ${m.name} (+$${m.reward}).`);
  }

  function chooseBlock(blockId) {
    const b = CELL_BLOCKS.find((x) => x.id === blockId);
    if (!b) return { ok: false, error: 'unknown block' };
    if (!state.inPrison) return { ok: false, error: 'you are already free' };
    if (b.security >= 4 && state.reputation < 20) return { ok: false, error: 'need 20 reputation for max security' };
    state.blockId = blockId;
    log(`Moved to ${b.name}. ${b.desc}`);
    return { ok: true, block: b };
  }

  function choosePlan(planId) {
    const p = ESCAPE_PLANS.find((x) => x.id === planId);
    if (!p) return { ok: false, error: 'unknown plan' };
    if (!state.inPrison) return { ok: false, error: 'you are already free' };
    state.planId = planId;
    state.planStage = 0;
    state.planProgress = 0;
    log(`Escape plan chosen: ${p.name}. ${p.desc} ${p.stages} stages.`);
    return { ok: true, plan: p };
  }

  function smuggle(itemId, qty) {
    const item = CONTRABAND.find((c) => c.id === itemId);
    if (!item) return { ok: false, error: 'unknown contraband' };
    const n = clampNum(Math.floor(qty) || 1, 1, 5);
    const cost = item.value * n;
    if (getCash() < cost) return { ok: false, error: 'not enough cash' };
    // Smuggling risk: suspicion rises, and a search can catch you.
    const searchChance = 0.1 + item.suspicion * 0.05;
    if (rng() < searchChance) {
      state.suspicion = clampNum(state.suspicion + 20, 0, 100);
      state.timesCaught++;
      log(`Search! The ${item.name} was found. Suspicion up.`);
      return { ok: false, error: 'caught in a search — contraband confiscated', suspicion: state.suspicion };
    }
    addCash(-cost);
    state.contraband[itemId] = (state.contraband[itemId] || 0) + n;
    log(`Smuggled in ${n}x ${item.name} ($${cost}).`);
    checkMission('first-contraband');
    return { ok: true, item, qty: n, stock: state.contraband[itemId] };
  }

  function craftTool(recipeId) {
    const recipe = CRAFT_RECIPES.find((r) => r.id === recipeId);
    if (!recipe) return { ok: false, error: 'unknown recipe' };
    for (const [item, need] of Object.entries(recipe.needs)) {
      if ((state.contraband[item] || 0) < need) return { ok: false, error: `need ${need}x ${item}` };
    }
    for (const [item, need] of Object.entries(recipe.needs)) {
      state.contraband[item] -= need;
      if (state.contraband[item] <= 0) delete state.contraband[item];
    }
    state.tools.push(recipe.id);
    state.reputation += 5;
    log(`Crafted ${recipe.name}. ${recipe.desc}`);
    checkMission('first-craft');
    return { ok: true, tool: recipe };
  }

  function hireAlly(allyId) {
    const ally = ALLIES.find((a) => a.id === allyId);
    if (!ally) return { ok: false, error: 'unknown ally' };
    if (state.alliesHired.includes(allyId)) return { ok: false, error: 'already hired' };
    if (getCash() < ally.cost) return { ok: false, error: 'not enough cash' };
    addCash(-ally.cost);
    state.alliesHired.push(allyId);
    state.reputation += 3;
    log(`Hired ${ally.name} ($${ally.cost}). ${ally.desc}`);
    return { ok: true, ally };
  }

  function bribeGuard(guardId, amount) {
    const guard = GUARDS.find((g) => g.id === guardId);
    if (!guard) return { ok: false, error: 'unknown guard' };
    const amt = Math.floor(amount);
    if (amt <= 0) return { ok: false, error: 'bribe must be positive' };
    if (getCash() < amt) return { ok: false, error: 'not enough cash' };
    const baseChance = guard.bribable * clampNum(amt / 100, 0.3, 1.5);
    const hour = getHour();
    const nightBonus = (hour >= 2 && hour <= 4) ? 1.3 : 1;
    const chance = clampNum(baseChance * nightBonus, 0, 0.95);
    addCash(-amt);
    if (rng() < chance) {
      state.bribesPaid++;
      state.suspicion = clampNum(state.suspicion - 5, 0, 100);
      state.bribedGuard = guardId;
      log(`${guard.name} takes the $${amt}. He will look the other way tonight.`);
      checkMission('first-bribe');
      return { ok: true, accepted: true, guard: guard.name };
    }
    state.suspicion = clampNum(state.suspicion + 25, 0, 100);
    log(`${guard.name} refuses the bribe — and reports you. Suspicion up!`);
    return { ok: true, accepted: false, guard: guard.name, suspicion: state.suspicion };
  }

  function digTunnel() {
    if (!state.inPrison) return { ok: false, error: 'you are already free' };
    if (state.planId !== 'tunnel' && state.planId !== 'sewer') {
      return { ok: false, error: 'digging needs the Tunnel or Sewer plan' };
    }
    if (state.inSolitary) return { ok: false, error: 'in solitary — no digging' };
    const hasKit = state.tools.includes('dig-kit');
    const hasSupports = state.tools.includes('tunnel-shore');
    const b = block();
    const soilMult = b.soil === 'soft' ? 1 : b.soil === 'hard' ? 0.6 : 0.35;
    const digPower = (hasKit ? 8 : 3) * soilMult * (state.alliesHired.includes('ghost') ? 1.5 : 1);
    state.tunnelProgress = clampNum(state.tunnelProgress + digPower, 0, 100);
    state.planProgress = state.tunnelProgress;
    // Digging is noisy: detection rises, faster when patrol is high.
    const intensity = patrolIntensity(getHour());
    state.detection = clampNum(state.detection + intensity * 1.5, 0, 100);
    if (rng() < 0.1 && !hasSupports) {
      state.tunnelProgress = clampNum(state.tunnelProgress - 6, 0, 100);
      log('Tunnel partially collapsed! Lost 6% progress. Craft tunnel supports.');
      return { ok: true, progress: Math.round(state.tunnelProgress), event: 'collapse' };
    }
    if (state.tunnelProgress >= 100 && !state.tunnelComplete) {
      state.tunnelComplete = true;
      state.planStage = plan().stages;
      log('Tunnel complete! It comes out past the wall. Escape tonight.');
      checkMission('tunnel-done');
    } else if (state.tunnelProgress >= 50) {
      checkMission('tunnel-half');
    }
    log(`Digging... tunnel ${Math.round(state.tunnelProgress)}%. Detection ${Math.round(state.detection)}%.`);
    return { ok: true, progress: Math.round(state.tunnelProgress), detection: Math.round(state.detection) };
  }

  function advancePlan() {
    if (!state.inPrison) return { ok: false, error: 'you are already free' };
    const p = plan();
    if (!p) return { ok: false, error: 'choose a plan first' };
    if (state.planStage >= p.stages) return { ok: false, error: 'plan already complete — escape now' };
    // Each plan has stage requirements.
    const stage = state.planStage + 1;
    const needs = planStageNeeds(p.id, stage);
    for (const [item, n] of Object.entries(needs.items || {})) {
      if ((state.contraband[item] || 0) < n && !state.tools.includes(item)) {
        return { ok: false, error: `stage ${stage} needs ${n}x ${item}` };
      }
    }
    if (needs.ally && !state.alliesHired.includes(needs.ally)) {
      return { ok: false, error: `stage ${stage} needs ally: ${needs.ally}` };
    }
    if (needs.tool && !state.tools.includes(needs.tool)) {
      return { ok: false, error: `stage ${stage} needs tool: ${needs.tool}` };
    }
    for (const [item, n] of Object.entries(needs.items || {})) {
      if (state.contraband[item]) {
        state.contraband[item] -= n;
        if (state.contraband[item] <= 0) delete state.contraband[item];
      }
    }
    state.planStage = stage;
    state.planProgress = Math.round((stage / p.stages) * 100);
    state.detection = clampNum(state.detection + p.difficulty * 2, 0, 100);
    log(`Plan stage ${stage}/${p.stages} done: ${needs.desc}`);
    return { ok: true, stage, total: p.stages, desc: needs.desc };
  }

  function planStageNeeds(planId, stage) {
    const table = {
      'tunnel': { 1: { items: { spoon: 1 }, desc: 'Loosen the first bricks behind the poster.' }, 2: { tool: 'dig-kit', desc: 'Digging kit ready. Start the shaft down.' }, 3: { tool: 'tunnel-shore', desc: 'Shore up the tunnel so it does not collapse.' }, 4: { items: { rope: 1 }, desc: 'Rig the rope for the final climb out.' }, 5: { desc: 'Break through to the sewer. Freedom is a crawl away.' } },
      'laundry-truck': { 1: { ally: 'cook', desc: 'The cook agrees to hide you in the cart.' }, 2: { items: { soap: 2 }, desc: 'Smell like laundry. Hide under the sheets.' }, 3: { desc: 'The truck rolls out. Hold still at the gate.' } },
      'guard-uniform': { 1: { ally: 'sneaky', desc: 'Sneaky Pete lifts a uniform from the locker room.' }, 2: { tool: 'guard-disguise', desc: 'The disguise fits. Practice the walk.' }, 3: { items: { 'key-copy': 1 }, desc: 'Copy the gate key while the guard naps.' }, 4: { desc: 'Walk out the front gate at shift change.' } },
      'roof': { 1: { tool: 'grapple', desc: 'Grappling hook ready for the roof.' }, 2: { tool: 'rope-ladder', desc: 'Rope ladder for the way down.' }, 3: { ally: 'tech', desc: 'Tech loops the roof cameras for four minutes.' }, 4: { desc: 'Over the roof, down the wall, gone.' } },
      'infirmary': { 1: { ally: 'doc', desc: 'Doc fakes your illness convincingly.' }, 2: { items: { pills: 1 }, desc: 'Pills for the orderly. He sleeps well.' }, 3: { desc: 'Swap with the body on the morgue trolley.' } },
      'riot': { 1: { ally: 'muscles', desc: 'Muscles agrees to start it in the yard.' }, 2: { items: { cigarettes: 3 }, desc: 'Pay off three blocks to join in.' }, 3: { tool: 'distraction-bomb', desc: 'Smoke bomb for the main gate.' }, 4: { desc: 'Walk out in the chaos. Do not run — walk.' } },
      'helicopter': { 1: { items: { phone: 1 }, desc: 'Call your friend outside. Midnight, yard, no lights.' }, 2: { ally: 'tech', desc: 'Tech kills the yard lights for the landing.' }, 3: { items: { rope: 1 }, desc: 'Rope ladder for the pickup.' }, 4: { tool: 'distraction-bomb', desc: 'Smoke to cover the landing zone.' }, 5: { desc: 'The helicopter lands. Grab the skid and go.' } },
      'sewer': { 1: { tool: 'dig-kit', desc: 'Digging kit for the drain cover.' }, 2: { items: { rope: 1 }, desc: 'Rope to climb down the drain shaft.' }, 3: { tool: 'lockpick', desc: 'Pick the grate lock under the kitchen.' }, 4: { desc: 'Crawl the sewer to the river outlet.' } },
      'visit-swap': { 1: { ally: 'sneaky', desc: 'Sneaky Pete arranges the visitor.' }, 2: { tool: 'guard-disguise', desc: 'Dress as the visitor. Same height, same walk.' }, 3: { desc: 'Walk out with the visiting crowd.' } },
      'kitchen-truck': { 1: { ally: 'cook', desc: 'The cook hides you among the crates.' }, 2: { items: { food: 2 }, desc: 'Extra food to bribe the loader.' }, 3: { desc: 'The truck leaves at dawn. Stay under the crates.' } },
    };
    const planTable = table[planId] || {};
    return planTable[stage] || { desc: 'Work the plan.' };
  }

  function causeDistraction(kind) {
    if (!state.inPrison) return { ok: false, error: 'you are already free' };
    if (kind === 'riot') {
      if (!state.alliesHired.includes('muscles')) return { ok: false, error: 'need Muscles to start a riot' };
      state.riotActive = true;
      state.detection = clampNum(state.detection - 30, 0, 100);
      log('RIOT in the yard! Guards rush to the yard. The gate is thin.');
      return { ok: true, effect: 'detection -30, guards distracted' };
    }
    if (kind === 'smoke') {
      if (!state.tools.includes('distraction-bomb')) return { ok: false, error: 'need a smoke bomb' };
      state.tools = state.tools.filter((t) => t !== 'distraction-bomb');
      state.detection = clampNum(state.detection - 20, 0, 100);
      log('Smoke bomb! Guards run toward the smoke.');
      return { ok: true, effect: 'detection -20' };
    }
    if (kind === 'fight') {
      state.detection = clampNum(state.detection + 10, 0, 100);
      state.reputation += 5;
      log('A fight breaks out in the mess hall. Guards are busy — and angry.');
      return { ok: true, effect: 'guards busy, detection +10' };
    }
    return { ok: false, error: 'unknown distraction' };
  }

  function loopCameras() {
    if (!state.alliesHired.includes('tech')) return { ok: false, error: 'need Tech to loop cameras' };
    state.cameraLoop = 240;
    log('Cameras looped for 4 minutes. Move now.');
    return { ok: true, seconds: 240 };
  }

  function attemptEscape() {
    if (!state.inPrison) return { ok: false, error: 'you are already free' };
    const p = plan();
    if (!p) return { ok: false, error: 'choose a plan first' };
    if (state.planStage < p.stages && !state.tunnelComplete) {
      return { ok: false, error: `plan only ${state.planStage}/${p.stages} stages done` };
    }
    // Success chance: low detection, night hours, camera loop, bribes help.
    const hour = getHour();
    const intensity = patrolIntensity(hour);
    let chance = 0.55;
    chance += (5 - intensity) * 0.06;
    chance -= state.detection / 200;
    chance += state.cameraLoop > 0 ? 0.15 : 0;
    chance += state.bribedGuard ? 0.15 : 0;
    chance += state.riotActive ? 0.15 : 0;
    chance += state.disguised ? 0.1 : 0;
    chance += (p.difficulty <= 2 ? 0.1 : p.difficulty >= 5 ? -0.1 : 0);
    chance = clampNum(chance, 0.05, 0.95);
    const roll = rng();
    const unseen = roll < chance * 0.6;
    if (roll < chance) {
      state.inPrison = false;
      state.escapes++;
      if (unseen) state.escapesUnseen++;
      if (state.riotActive) state.riotEscapes = (state.riotEscapes || 0) + 1;
      state.heat = 50 + p.difficulty * 10;
      addHeat(3);
      const reward = 500 + p.difficulty * 200;
      addCash(reward);
      log(`ESCAPED! You are outside the wall. Heat ${state.heat}. A friend left $${reward} for you.`);
      checkMission('first-escape');
      checkMission('ghost-escape');
      checkMission('five-escapes');
      checkMission('riot-escape');
      checkMission('no-solitary');
      return { ok: true, escaped: true, unseen, heat: state.heat, reward };
    }
    // Caught mid-escape: solitary + lose tools.
    state.timesCaught++;
    state.tools = [];
    state.detection = 100;
    state.suspicion = clampNum(state.suspicion + 30, 0, 100);
    const term = SOLITARY_TERMS[3];
    state.solitaryDays += term.days;
    state.inSolitary = true;
    state.planStage = 0;
    state.planProgress = 0;
    state.tunnelProgress = 0;
    state.tunnelComplete = false;
    log(`CAUGHT at the wall! ${term.days} days in solitary. Tools confiscated. Plan reset.`);
    return { ok: true, escaped: false, solitaryDays: term.days };
  }

  function serveSolitary() {
    if (!state.inSolitary) return { ok: false, error: 'not in solitary' };
    state.solitaryDays--;
    if (state.solitaryDays <= 0) {
      state.inSolitary = false;
      state.solitaryDays = 0;
      state.detection = 40;
      log('Solitary served. Back to the block. They are watching you now.');
    } else {
      log(`Solitary: ${state.solitaryDays} days left.`);
    }
    return { ok: true, daysLeft: state.solitaryDays };
  }

  function layLow(hideoutId, days) {
    if (state.inPrison) return { ok: false, error: 'you are still inside' };
    const h = HIDEOUTS.find((x) => x.id === hideoutId);
    if (!h) return { ok: false, error: 'unknown hideout' };
    const n = clampNum(Math.floor(days) || 1, 1, 7);
    const cost = h.costPerDay * n;
    if (getCash() < cost) return { ok: false, error: 'not enough cash' };
    addCash(-cost);
    state.heat = Math.max(0, state.heat - h.heatDrop * n);
    state.hideoutId = hideoutId;
    log(`Laid low at ${h.name} for ${n} days ($${cost}). Heat now ${state.heat}.`);
    return { ok: true, heat: state.heat, hideout: h.name };
  }

  function getCaughtBySearch() {
    // Random cell search: suspicion decides what they find.
    const items = Object.keys(state.contraband);
    if (items.length === 0) return { ok: true, found: null };
    const roll = rng();
    if (roll < state.suspicion / 150) {
      const found = items[Math.floor(rng() * items.length)];
      const item = CONTRABAND.find((c) => c.id === found);
      delete state.contraband[found];
      state.timesCaught++;
      if (item.suspicion >= 4) {
        state.solitaryDays += 3;
        state.inSolitary = true;
        log(`Cell search found the ${item.name}! 3 days solitary.`);
      } else {
        state.suspicion = clampNum(state.suspicion + 10, 0, 100);
        log(`Cell search found the ${item.name}. Confiscated.`);
      }
      return { ok: true, found: item.name };
    }
    return { ok: true, found: null };
  }

  function tick(dt) {
    const day = getDay();
    if (day !== state.day) {
      state.day = day;
      if (state.inPrison) {
        state.daysServed++;
        if (state.daysServed >= state.sentenceDays) {
          state.inPrison = false;
          log('Sentence served. You walk out the front gate, a free man.');
          return;
        }
        // Daily cell search chance.
        if (rng() < 0.15) getCaughtBySearch();
        // Suspicion decays slowly when you keep your head down.
        state.suspicion = clampNum(state.suspicion - 5, 0, 100);
        state.detection = clampNum(state.detection - 10, 0, 100);
      } else {
        state.heat = Math.max(0, state.heat - 1);
      }
    }
    if (state.cameraLoop > 0) state.cameraLoop -= dt;
    if (state.inSolitary) state.detection = 100;
    // Night is the escape window: detection matters most at 2-4 AM.
    const hour = getHour();
    if (state.inPrison && hour >= 2 && hour < 4) {
      state._nightWindow = true;
    } else {
      state._nightWindow = false;
    }
  }

  function missions() {
    return PRISON_MISSIONS.map((m) => ({ ...m, done: !!state.missionsDone[m.id] }));
  }

  function hudLine() {
    if (!state.inPrison) return `Free! | heat ${state.heat} | escapes ${state.escapes}`;
    const p = plan();
    const planText = p ? ` | plan ${p.name} ${state.planStage}/${p.stages}` : ' | no plan yet';
    return `Prison ${block().name} | day ${state.daysServed}/${state.sentenceDays} | detection ${Math.round(state.detection)}%${planText}${state.inSolitary ? ' | SOLITARY' : ''}`;
  }

  function summary() {
    return {
      inPrison: state.inPrison,
      block: state.blockId,
      plan: state.planId,
      planStage: state.planStage,
      tunnelProgress: Math.round(state.tunnelProgress),
      detection: Math.round(state.detection),
      suspicion: Math.round(state.suspicion),
      escapes: state.escapes,
      timesCaught: state.timesCaught,
      solitaryDays: state.solitaryDays,
      heat: state.heat,
      reputation: state.reputation,
      missionsDone: Object.keys(state.missionsDone).length,
    };
  }

  function serialize() {
    return {
      inPrison: state.inPrison,
      sentenceDays: state.sentenceDays,
      daysServed: state.daysServed,
      blockId: state.blockId,
      planId: state.planId,
      planStage: state.planStage,
      planProgress: state.planProgress,
      contraband: { ...state.contraband },
      tools: [...state.tools],
      alliesHired: [...state.alliesHired],
      reputation: state.reputation,
      suspicion: state.suspicion,
      solitaryDays: state.solitaryDays,
      detection: state.detection,
      tunnelProgress: state.tunnelProgress,
      tunnelComplete: state.tunnelComplete,
      bribesPaid: state.bribesPaid,
      escapes: state.escapes,
      escapesUnseen: state.escapesUnseen,
      timesCaught: state.timesCaught,
      heat: state.heat,
      missionsDone: { ...state.missionsDone },
    };
  }

  function deserialize(s) {
    if (!s || typeof s !== 'object') return;
    if (typeof s.inPrison === 'boolean') state.inPrison = s.inPrison;
    if (typeof s.sentenceDays === 'number') state.sentenceDays = s.sentenceDays;
    if (typeof s.daysServed === 'number') state.daysServed = s.daysServed;
    if (typeof s.blockId === 'string') state.blockId = s.blockId;
    if (typeof s.planId === 'string') state.planId = s.planId;
    for (const k of ['planStage', 'planProgress', 'reputation', 'suspicion', 'solitaryDays', 'detection', 'tunnelProgress', 'bribesPaid', 'escapes', 'escapesUnseen', 'timesCaught', 'heat']) {
      if (typeof s[k] === 'number') state[k] = s[k];
    }
    if (typeof s.tunnelComplete === 'boolean') state.tunnelComplete = s.tunnelComplete;
    if (s.contraband) state.contraband = { ...s.contraband };
    if (Array.isArray(s.tools)) state.tools = [...s.tools];
    if (Array.isArray(s.alliesHired)) state.alliesHired = [...s.alliesHired];
    if (s.missionsDone) state.missionsDone = { ...s.missionsDone };
  }

  return {
    state,
    chooseBlock,
    choosePlan,
    smuggle,
    craftTool,
    hireAlly,
    bribeGuard,
    digTunnel,
    advancePlan,
    causeDistraction,
    loopCameras,
    attemptEscape,
    serveSolitary,
    layLow,
    getCaughtBySearch,
    missions,
    tick,
    hudLine,
    summary,
    serialize,
    deserialize,
  };
}

// ---------------------------------------------------------------------------
// Extra reference data: prison yard wisdom (flavour)
// ---------------------------------------------------------------------------

export const YARD_WISDOM = [
  'Never dig on a full moon. The tower guard can see the dust.',
  'The best time to move is 3 AM. The worst time is any other time.',
  'Bribe the rookie, never the sergeant.',
  'A tunnel without supports is a grave with extra steps.',
  'The dogs know. Always assume the dogs know.',
  'Count the patrols. Then count them again.',
  'Your best tool is patience. Your second best is a spoon.',
];


// ---------------------------------------------------------------------------
// Part 3 — Prison jobs, yard economy, guard roster, escape legends
// ---------------------------------------------------------------------------

// Prison jobs: earn cash and reputation inside.
export const PRISON_JOBS = [
  { id: 'laundry', name: 'Laundry Duty', pay: 15, rep: 1, desc: 'Fold sheets. Learn the truck schedule.' },
  { id: 'kitchen', name: 'Kitchen Duty', pay: 20, rep: 2, desc: 'Peel potatoes. Steal extra food.' },
  { id: 'workshop', name: 'Workshop Duty', pay: 25, rep: 2, desc: 'Make license plates. Pocket a tool.' },
  { id: 'library', name: 'Library Duty', pay: 10, rep: 1, desc: 'Shelve books. Read the maps.' },
  { id: 'cleaning', name: 'Cleaning Duty', pay: 12, rep: 1, desc: 'Mop floors. See every corridor.' },
  { id: 'garden', name: 'Garden Duty', pay: 18, rep: 2, desc: 'Grow vegetables. Dig practice.' },
  { id: 'infirmary-aide', name: 'Infirmary Aide', pay: 22, rep: 3, desc: 'Help Doc. Learn the morgue route.' },
];

// Yard economy: trade rates between inmates.
export const YARD_TRADES = [
  { give: 'cigarettes', giveQty: 2, get: 'spoon', getQty: 1, desc: 'Two packs for a spoon.' },
  { give: 'soap', giveQty: 3, get: 'rope', getQty: 1, desc: 'Three soaps for a rope.' },
  { give: 'food', giveQty: 2, get: 'cigarettes', getQty: 1, desc: 'Extra food for a smoke.' },
  { give: 'battery', giveQty: 1, get: 'cigarettes', getQty: 2, desc: 'A battery for two packs.' },
  { give: 'cigarettes', giveQty: 5, get: 'phone', getQty: 1, desc: 'Five packs for a phone. Expensive.' },
];

// Guard roster by shift.
export const GUARD_ROSTER = [
  { shift: 'day', guards: ['rookie', 'veteran', 'sergeant', 'warden', 'infirmary-guard'], note: 'Day shift: full staff, sharp eyes.' },
  { shift: 'night', guards: ['night-owl', 'tower', 'dog-handler'], note: 'Night shift: fewer guards, sleepier ones.' },
  { shift: 'dawn', guards: ['rookie', 'night-owl', 'tower'], note: 'Dawn: shift change. The blindest hour.' },
];

// Escape legends: famous escapes from Blackgate history.
export const ESCAPE_LEGENDS = [
  { name: 'The Spoon King', year: 1962, plan: 'tunnel', note: 'Dug out with a single spoon over four years.' },
  { name: 'The Laundry Ghost', year: 1978, plan: 'laundry-truck', note: 'Rode out in a laundry cart. Never found.' },
  { name: 'The Warden Wife', year: 1985, plan: 'visit-swap', note: 'Walked out dressed as a visitor. In heels.' },
  { name: 'The Rooftop Kid', year: 1994, plan: 'roof', note: 'Nineteen years old. Over the wall in the rain.' },
  { name: 'The Helicopter Man', year: 2003, plan: 'helicopter', note: 'A friend landed on the yard at midnight.' },
  { name: 'The Morgue Man', year: 2011, plan: 'infirmary', note: 'Played dead so well they almost buried him.' },
];

// Search schedule: when cell searches happen.
export const SEARCH_SCHEDULE = [
  { day: 'monday', chance: 0.2, note: 'Monday searches: thorough.' },
  { day: 'wednesday', chance: 0.15, note: 'Wednesday: random cells.' },
  { day: 'friday', chance: 0.25, note: 'Friday: the big search before the weekend.' },
  { day: 'sunday', chance: 0.1, note: 'Sunday: light search, hungover guards.' },
];

// Contraband prices on the yard (fluctuating market).
export const YARD_PRICES = [
  { item: 'spoon', price: 5 }, { item: 'shank', price: 20 }, { item: 'phone', price: 200 },
  { item: 'cigarettes', price: 30 }, { item: 'rope', price: 40 }, { item: 'uniform', price: 500 },
  { item: 'key-copy', price: 300 }, { item: 'map', price: 100 }, { item: 'pills', price: 80 },
  { item: 'wire', price: 150 }, { item: 'disguise-kit', price: 250 }, { item: 'explosive', price: 400 },
];

// Pure helpers.

export function jobPayFor(jobId, reputation) {
  const job = PRISON_JOBS.find((j) => j.id === jobId);
  if (!job) return 0;
  return job.pay + Math.floor(reputation / 10);
}

export function tradePossible(contraband, trade) {
  return (contraband[trade.give] || 0) >= trade.giveQty;
}

export function applyTrade(contraband, trade) {
  if (!tradePossible(contraband, trade)) return { ok: false, error: 'not enough to trade' };
  const next = { ...contraband };
  next[trade.give] -= trade.giveQty;
  if (next[trade.give] <= 0) delete next[trade.give];
  next[trade.get] = (next[trade.get] || 0) + trade.getQty;
  return { ok: true, contraband: next };
}

export function guardsOnShift(shift) {
  const row = GUARD_ROSTER.find((r) => r.shift === shift);
  return row ? row.guards : [];
}

export function searchChanceFor(dayName) {
  const row = SEARCH_SCHEDULE.find((s) => s.day === dayName.toLowerCase());
  return row ? row.chance : 0.15;
}

export function yardPriceFor(itemId) {
  const row = YARD_PRICES.find((p) => p.item === itemId);
  return row ? row.price : 10;
}

export function escapeChanceEstimate(detection, hour, cameraLoop, bribed, riot, disguised, difficulty) {
  let chance = 0.55;
  chance += (5 - patrolIntensity(hour)) * 0.06;
  chance -= detection / 200;
  if (cameraLoop > 0) chance += 0.15;
  if (bribed) chance += 0.15;
  if (riot) chance += 0.15;
  if (disguised) chance += 0.1;
  if (difficulty <= 2) chance += 0.1;
  if (difficulty >= 5) chance -= 0.1;
  return Math.max(0.05, Math.min(0.95, Math.round(chance * 100) / 100));
}

export function solitaryTermFor(reason) {
  const row = SOLITARY_TERMS.find((t) => t.reason === reason);
  return row ? row.days : 1;
}

export function heatAfterEscape(difficulty) {
  return 50 + difficulty * 10;
}

export function sentenceLeft(sentenceDays, daysServed) {
  return Math.max(0, sentenceDays - daysServed);
}

export function reputationForPlan(planId) {
  const p = ESCAPE_PLANS.find((x) => x.id === planId);
  return p ? p.difficulty * 5 : 0;
}

export function blockSecurityFor(blockId) {
  const b = CELL_BLOCKS.find((x) => x.id === blockId);
  return b ? b.security : 2;
}


// ---------------------------------------------------------------------------
// Part 4 — Prison slang, hiding spots, yard games, visit rules
// ---------------------------------------------------------------------------

// Prison slang (flavour).
export const PRISON_SLANG = [
  'A "fish" is a new inmate. Fresh meat.',
  'A "kite" is a secret note passed between cells.',
  'A "shakedown" is a cell search. Hide everything.',
  'The "hole" is solitary. Nobody wants the hole.',
  'A "lifer" is somebody who will never leave.',
  'A "trusty" is an inmate the guards trust. Rare.',
  'The "yard" is freedom, one hour a day.',
  'A "cellie" is your cellmate. Choose well.',
];

// Contraband hiding spots.
export const HIDING_SPOTS = [
  { id: 'mattress', name: 'Mattress', risk: 2, desc: 'Classic. Guards check it first.' },
  { id: 'toilet', name: 'Toilet Tank', risk: 1, desc: 'Wet, but rarely searched.' },
  { id: 'poster', name: 'Behind the Poster', risk: 3, desc: 'The classic movie spot. Guards know it.' },
  { id: 'book', name: 'Hollow Book', risk: 1, desc: 'Nobody searches the library books.' },
  { id: 'shoe', name: 'Shoe Sole', risk: 2, desc: 'Small items only.' },
  { id: 'vent', name: 'Air Vent', risk: 2, desc: 'Good for flat things.' },
  { id: 'laundry-bag', name: 'Laundry Bag', risk: 1, desc: 'Hides in plain sight.' },
  { id: 'light', name: 'Light Fixture', risk: 3, desc: 'High up. Hard to reach, hard to search.' },
];

// Yard games (flavour + small reputation).
export const YARD_GAMES = [
  { id: 'basketball', name: 'Basketball', rep: 2, desc: 'The yard game. Win respect.' },
  { id: 'chess', name: 'Chess', rep: 3, desc: 'The smart game. The Librarian always wins.' },
  { id: 'cards', name: 'Cards', rep: 1, desc: 'Play for cigarettes. Do not play with the Shark.' },
  { id: 'workout', name: 'Workout', rep: 2, desc: 'Pull-ups. Get strong for the wall.' },
  { id: 'handball', name: 'Handball', rep: 1, desc: 'Fast, loud, and full of arguments.' },
];

// Visit rules (flavour).
export const VISIT_RULES = [
  'Visits are one hour, twice a week.',
  'No touching. No passing items. No exceptions.',
  'Visitors are searched. So are you, after.',
  'The meeting room has cameras. Everywhere.',
  'A visitor swap needs the perfect visitor. And luck.',
];

// Pure helpers.

export function hidingSpotRisk(spotId) {
  const s = HIDING_SPOTS.find((x) => x.id === spotId);
  return s ? s.risk : 2;
}

export function safestHidingSpot() {
  let best = HIDING_SPOTS[0];
  for (const s of HIDING_SPOTS) if (s.risk < best.risk) best = s;
  return best;
}

export function yardGameRep(gameId) {
  const g = YARD_GAMES.find((x) => x.id === gameId);
  return g ? g.rep : 0;
}

export function slangMeaningPrison(term) {
  const row = PRISON_SLANG.find((s) => s.toLowerCase().includes(term.toLowerCase()));
  return row || 'Ask the Librarian. He knows everything.';
}

export function visitHoursLeft(visitsUsed) {
  return Math.max(0, 2 - visitsUsed);
}


// ---------------------------------------------------------------------------
// Part 5 — Famous prisons, escape tools, prison films
// ---------------------------------------------------------------------------

export const FAMOUS_PRISONS = [
  { name: 'Alcatraz', note: 'The Rock. Nobody escaped. Officially.' },
  { name: 'Shawshank', note: 'Fictional, but everybody knows it.' },
  { name: 'Blackgate', note: 'This prison. Your prison. For now.' },
  { name: 'Sing Sing', note: 'Up the river. A hundred years of stories.' },
];

export const ESCAPE_TOOLS_RANKED = [
  { tool: 'spoon', rank: 1, note: 'The oldest tool. Still works.' },
  { tool: 'rope', rank: 2, note: 'For climbing down, not up.' },
  { tool: 'key-copy', rank: 3, note: 'A key opens doors. A copy opens futures.' },
  { tool: 'uniform', rank: 4, note: 'The best disguise is authority.' },
  { tool: 'phone', rank: 5, note: 'The outside world in your pocket.' },
];

export const PRISON_FILMS = [
  { title: 'The Shawshank Redemption', year: 1994, note: 'Hope is a good thing.' },
  { title: 'Escape from Alcatraz', year: 1979, note: 'Based on a true escape.' },
  { title: 'The Great Escape', year: 1963, note: 'Seventy-six men, one tunnel.' },
];

export function prisonForName(name) {
  return FAMOUS_PRISONS.find((p) => p.name.toLowerCase().includes(name.toLowerCase())) || null;
}

export function escapeToolRank(toolId) {
  const t = ESCAPE_TOOLS_RANKED.find((x) => x.tool === toolId);
  return t ? t.rank : 99;
}

export function filmForYearPrison(year) {
  return PRISON_FILMS.find((f) => f.year === year) || null;
}


// ---------------------------------------------------------------------------
// Part 6 — Inmate nicknames, prison mottos
// ---------------------------------------------------------------------------

export const INMATE_NICKNAMES = [
  'Ghost',
  'Muscles',
  'Doc',
  'Sneaky Pete',
  'Tech',
  'The Cook',
  'The Librarian',
  'Old Joe',
];

export const PRISON_MOTTOS = [
  'Count the patrols. Then count them again.',
  'Patience is the sharpest tool in the cell.',
  'The wall is only as strong as the guard watching it.',
  'Freedom is a plan, not a dream.',
];

export function randomInmateNickname(rng) {
  return INMATE_NICKNAMES[Math.floor(rng() * INMATE_NICKNAMES.length)];
}

export function prisonMottoFor(index) {
  return PRISON_MOTTOS[index % PRISON_MOTTOS.length];
}


// ---------------------------------------------------------------------------
// Part 7 — Prison proverbs, famous escapes
// ---------------------------------------------------------------------------

export const PRISON_PROVERBS = [
  'The wall is a suggestion, not a sentence.',
  'Every lock has a key. Every guard has a price.',
  'Freedom tastes better when you earn it.',
  'A plan is a tunnel. A dream is a hole.',
];

export const FAMOUS_ESCAPES = [
  { escape: 'Alcatraz 1962', note: 'Three men, papier-mâché heads, never found.' },
  { escape: 'The Great Escape', year: 1944, note: 'Seventy-six men through a tunnel.' },
  { escape: 'El Chapo tunnel', year: 2015, note: 'A mile-long tunnel with a motorcycle.' },
];

export function proverbPrison(index) {
  return PRISON_PROVERBS[index % PRISON_PROVERBS.length];
}

export function famousEscapeFor(name) {
  return FAMOUS_ESCAPES.find((e) => e.escape === name) || null;
}
