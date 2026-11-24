// Solara Nights — Hospital / EMS (Round 7b-B, written fresh).
// Ria moonlights for Solara General: the radio crackles, a call comes
// in, and the ambulance rolls. Each call is a patient with a condition,
// a triage level and a clock that never stops. Stabilise on scene,
// choose the right hospital bay, drive like the city depends on it —
// because it does — then hand over, restock, and take the next call.
// Good triage pays; a missed red tag costs reputation and, sometimes,
// a life the game remembers. Shifts, upgrades, a crew that trusts you,
// and the quiet arithmetic of an emergency department at 3 a.m.
// Pure logic: no rendering, no imports. Wired through the standard ctx
// { rng, getDay, getHour, getCash, addCash, addHeat, log, getPlayerPos,
// getSpeed } and driven by tick/tickDay from the main loop.

export const HOSPITAL_WARDS = [
  { id: 'er', name: 'Emergency', beds: 12, pay: 1.0, desc: 'The front door. Everything arrives here first.' },
  { id: 'trauma', name: 'Trauma Bay', beds: 4, pay: 1.4, desc: 'Red tags only. Fast hands, loud monitors.' },
  { id: 'cardiac', name: 'Cardiac Unit', beds: 6, pay: 1.3, desc: 'Chests and rhythms, quiet and deadly.' },
  { id: 'peds', name: 'Paediatrics', beds: 8, pay: 1.1, desc: 'Small patients, big feelings.' },
  { id: 'surgery', name: 'Surgery', beds: 6, pay: 1.5, desc: 'Straight to theatre when minutes matter.' },
  { id: 'icu', name: 'ICU', beds: 5, pay: 1.6, desc: 'The sickest patients in the city.' },
  { id: 'maternity', name: 'Maternity', beds: 7, pay: 1.2, desc: 'Two patients, one arrival.' },
  { id: 'psych', name: 'Crisis Unit', beds: 6, pay: 1.0, desc: 'Quiet rooms, patient voices.' },
];

export const TRIAGE_LEVELS = [
  { id: 'green', name: 'Green — Minor', priority: 1, payMult: 0.6, timeLimit: 900, color: 'green', desc: 'Walking wounded. Can wait.' },
  { id: 'yellow', name: 'Yellow — Urgent', priority: 2, payMult: 1.0, timeLimit: 600, color: 'yellow', desc: 'Needs care soon, stable for now.' },
  { id: 'orange', name: 'Orange — Severe', priority: 3, payMult: 1.4, timeLimit: 360, color: 'orange', desc: 'Deteriorating. Move fast.' },
  { id: 'red', name: 'Red — Critical', priority: 4, payMult: 2.0, timeLimit: 240, color: 'red', desc: 'Minutes matter. Sirens on.' },
  { id: 'black', name: 'Black — Expectant', priority: 0, payMult: 0.3, timeLimit: 120, color: 'black', desc: 'Comfort care only. The hardest call.' },
];

export const HOSPITAL_CONDITIONS = [
  { id: 'fracture', name: 'Broken Leg', triage: 'yellow', basePay: 90, treatTime: 45, ward: 'er', desc: 'Skatepark casualty, bone at a bad angle.' },
  { id: 'laceration', name: 'Deep Cut', triage: 'yellow', basePay: 80, treatTime: 30, ward: 'er', desc: 'Kitchen accident, bleeding controlled.' },
  { id: 'overdose', name: 'Overdose', triage: 'red', basePay: 260, treatTime: 120, ward: 'icu', desc: 'Unresponsive. Naloxone, airway, go.' },
  { id: 'heart-attack', name: 'Heart Attack', triage: 'red', basePay: 320, treatTime: 150, ward: 'cardiac', desc: 'Crushing chest pain, sweating, pale.' },
  { id: 'stroke', name: 'Stroke', triage: 'red', basePay: 300, treatTime: 140, ward: 'icu', desc: 'Face droop, slurred speech, FAST positive.' },
  { id: 'car-crash', name: 'Car Crash', triage: 'orange', basePay: 220, treatTime: 110, ward: 'trauma', desc: 'Two cars, one trapped driver.' },
  { id: 'burns', name: 'Burns', triage: 'orange', basePay: 200, treatTime: 100, ward: 'trauma', desc: 'Kitchen fire, hands and arms.' },
  { id: 'asthma', name: 'Asthma Attack', triage: 'orange', basePay: 150, treatTime: 60, ward: 'er', desc: 'Wheezing, cannot finish a sentence.' },
  { id: 'child-fever', name: 'Child Fever', triage: 'green', basePay: 60, treatTime: 25, ward: 'peds', desc: 'A scared kid and a calmer parent.' },
  { id: 'labour', name: 'Labour', triage: 'yellow', basePay: 180, treatTime: 90, ward: 'maternity', desc: 'Contractions three minutes apart.' },
  { id: 'panic', name: 'Panic Attack', triage: 'green', basePay: 50, treatTime: 20, ward: 'psych', desc: 'Breathing fast, convinced it is worse.' },
  { id: 'stabbing', name: 'Stab Wound', triage: 'red', basePay: 280, treatTime: 130, ward: 'surgery', desc: 'Alley fight, bleeding into the chest.' },
  { id: 'drowning', name: 'Near Drowning', triage: 'orange', basePay: 210, treatTime: 95, ward: 'icu', desc: 'Pulled from the marina, coughing water.' },
  { id: 'seizure', name: 'Seizure', triage: 'orange', basePay: 170, treatTime: 70, ward: 'er', desc: 'Post-ictal, confused, needs monitoring.' },
  { id: 'food-poison', name: 'Food Poisoning', triage: 'green', basePay: 55, treatTime: 20, ward: 'er', desc: 'The night market strikes again.' },
  { id: 'elder-fall', name: 'Elderly Fall', triage: 'yellow', basePay: 100, treatTime: 50, ward: 'er', desc: 'Hip pain, lives alone, brave face.' },
];

export const HOSPITAL_CALLERS = [
  'a passerby', 'a worried mother', 'the night market crowd', 'a taxi driver',
  'a lifeguard', 'a bartender', 'a night-shift nurse', 'a police officer',
  'a fisherman', 'a hotel clerk', 'a neighbour', 'a dock worker',
  'a street vendor', 'a teacher', 'a security guard', 'a jogger',
];

export const HOSPITAL_DISTRICTS = [
  { id: 'marina', name: 'Marina', distance: 4, traffic: 1 },
  { id: 'downtown', name: 'Downtown', distance: 6, traffic: 2 },
  { id: 'docks', name: 'Crown Docks', distance: 8, traffic: 2 },
  { id: 'beach', name: 'Beach', distance: 5, traffic: 1 },
  { id: 'suburbs', name: 'Suburbs', distance: 9, traffic: 1 },
  { id: 'market', name: 'Night Market', distance: 3, traffic: 3 },
  { id: 'industrial', name: 'Industrial Estate', distance: 10, traffic: 1 },
  { id: 'oldtown', name: 'Old Town', distance: 7, traffic: 2 },
];

export const HOSPITAL_UPGRADES = [
  { id: 'kit', name: 'Trauma Kit', cost: 150, desc: 'Better bandages, faster stabilisation.', effect: 'treat-fast' },
  { id: 'defib', name: 'Defibrillator', cost: 400, desc: 'Red-tag saves pay +25%.', effect: 'red-plus' },
  { id: 'siren', name: 'Louder Siren', cost: 200, desc: 'Traffic parts: transport is 20% faster.', effect: 'drive-fast' },
  { id: 'stretcher', name: 'Power Stretcher', cost: 300, desc: 'Load patients in half the time.', effect: 'load-fast' },
  { id: 'oxygen', name: 'Oxygen Kit', cost: 250, desc: 'Orange patients stop deteriorating on scene.', effect: 'stable' },
  { id: 'radio', name: 'Hospital Radio', cost: 180, desc: 'Beds reserved ahead: +10% handover pay.', effect: 'handover-plus' },
  { id: 'ambulance', name: 'New Ambulance', cost: 1200, desc: 'Faster, smoother, carries two patients.', effect: 'two-beds' },
  { id: 'training', name: 'ALS Course', cost: 600, desc: 'Advanced life support: +1 triage accuracy.', effect: 'als' },
];

export const HOSPITAL_RANKS = [
  { level: 0, name: 'First Responder', xp: 0, perk: 'Green and yellow calls.' },
  { level: 1, name: 'EMT', xp: 150, perk: 'Orange calls unlocked.' },
  { level: 2, name: 'Paramedic', xp: 400, perk: 'Red calls unlocked, +10% pay.' },
  { level: 3, name: 'Senior Paramedic', xp: 800, perk: '+20% pay, two-bed ambulance.' },
  { level: 4, name: 'Legend of the Night Shift', xp: 1500, perk: '+30% pay, the city trusts you.' },
];

export const HOSPITAL_CREW = [
  { id: 'sam', name: 'Sam Okafor', role: 'Driver', bonus: 'drive', value: 0.15, wage: 30, desc: 'Knows every shortcut in Solara Bay.' },
  { id: 'priya', name: 'Priya Nair', role: 'Medic', bonus: 'treat', value: 0.2, wage: 40, desc: 'Calm hands, faster treatment.' },
  { id: 'tomas', name: 'Tomas Reyes', role: 'Lifter', bonus: 'load', value: 0.3, wage: 25, desc: 'Loads a stretcher like it weighs nothing.' },
  { id: 'lena', name: 'Lena Fischer', role: 'Dispatcher', bonus: 'call', value: 0.25, wage: 35, desc: 'Better calls, earlier warnings.' },
];

export function hospitalRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < HOSPITAL_RANKS.length; i++) {
    if (xp >= HOSPITAL_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function hospitalTriageFor(conditionId) {
  const cond = HOSPITAL_CONDITIONS.find((x) => x.id === conditionId);
  if (!cond) return TRIAGE_LEVELS[0];
  return TRIAGE_LEVELS.find((t) => t.id === cond.triage) || TRIAGE_LEVELS[0];
}

export function hospitalPayFor(call, rank, upgrades) {
  const cond = HOSPITAL_CONDITIONS.find((x) => x.id === call.condition);
  const triage = hospitalTriageFor(call.condition);
  let pay = cond.basePay * triage.payMult;
  pay *= 1 + rank * 0.1;
  if (upgrades.includes('defib') && triage.id === 'red') pay *= 1.25;
  if (upgrades.includes('radio')) pay *= 1.1;
  if (call.onTime) pay *= 1.2;
  return Math.round(pay);
}

export function hospitalTravelTime(districtId, siren) {
  const d = HOSPITAL_DISTRICTS.find((x) => x.id === districtId);
  if (!d) return 60;
  let t = d.distance * 12 + d.traffic * 15;
  if (siren) t *= 0.8;
  return Math.round(t);
}

export function createHospitalSystem(ctx) {
  const c = ctx || {};
  const rng = typeof c.rng === 'function' ? c.rng : Math.random;
  const getCash = typeof c.getCash === 'function' ? c.getCash : () => 0;
  const addCash = typeof c.addCash === 'function' ? c.addCash : () => {};
  const addHeat = typeof c.addHeat === 'function' ? c.addHeat : () => {};
  const log = typeof c.log === 'function' ? c.log : () => {};
  const getDay = typeof c.getDay === 'function' ? c.getDay : () => 1;
  const getHour = typeof c.getHour === 'function' ? c.getHour : () => 12;
  const getPos = typeof c.getPlayerPos === 'function' ? c.getPlayerPos : () => ({ x: 0, z: 0 });

  const state = {
    xp: 0,
    rank: 0,
    reputation: 50,
    callsTaken: 0,
    callsDone: 0,
    callsFailed: 0,
    livesSaved: 0,
    livesLost: 0,
    patientsTransported: 0,
    perfectHandovers: 0,
    earned: 0,
    spent: 0,
    upgrades: [],
    crew: [],
    onShift: false,
    shiftCallsDone: 0,
    shiftStarted: 0,
    call: null,
    callStage: 'idle',
    callTimer: 0,
    patientOnBoard: false,
    patientStable: false,
    triageDone: false,
    treatedOnScene: false,
    supplies: 100,
    fuel: 100,
    lastDay: 1,
    dailyCalls: 0,
    bestStreak: 0,
    streak: 0,
    redSaves: 0,
    greenDone: 0,
    nightCalls: 0,
    compliments: 0,
    complaints: 0,
    restocked: 0,
  };

  function refreshRank() {
    const r = hospitalRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`EMS rank up: ${HOSPITAL_RANKS[r].name} — ${HOSPITAL_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function rep(delta) {
    state.reputation = Math.max(0, Math.min(100, state.reputation + delta));
  }

  function startShift() {
    if (state.onShift) return { ok: false, reason: 'already-on-shift' };
    state.onShift = true;
    state.shiftCallsDone = 0;
    state.shiftStarted = getHour();
    state.supplies = 100;
    state.fuel = 100;
    log('Night shift started at Solara General. Radio on, coffee hot.');
    return { ok: true };
  }

  function endShift() {
    if (!state.onShift) return { ok: false, reason: 'not-on-shift' };
    state.onShift = false;
    const bonus = state.shiftCallsDone * 20;
    if (bonus > 0) {
      state.earned += bonus;
      addCash(bonus);
    }
    log(`Shift over: ${state.shiftCallsDone} calls, $${bonus} shift bonus.`);
    return { ok: true, calls: state.shiftCallsDone, bonus };
  }

  function newCall() {
    if (!state.onShift) return { ok: false, reason: 'not-on-shift' };
    if (state.call) return { ok: false, reason: 'call-active' };
    const cond = HOSPITAL_CONDITIONS[Math.floor(rng() * HOSPITAL_CONDITIONS.length)];
    const triage = hospitalTriageFor(cond.id);
    if (state.rank < 1 && triage.priority >= 3) return newCallGreen();
    if (state.rank < 2 && triage.id === 'red') return newCallGreen();
    const district = HOSPITAL_DISTRICTS[Math.floor(rng() * HOSPITAL_DISTRICTS.length)];
    const caller = HOSPITAL_CALLERS[Math.floor(rng() * HOSPITAL_CALLERS.length)];
    const call = {
      condition: cond.id, triage: triage.id, district: district.id,
      caller, age: 3 + Math.floor(rng() * 85),
      travel: hospitalTravelTime(district.id, state.upgrades.includes('siren')),
      timeLeft: triage.timeLimit, onTime: true, id: `call-${getDay()}-${state.callsTaken + 1}`,
    };
    state.call = call;
    state.callStage = 'dispatched';
    state.callTimer = call.timeLeft;
    state.callsTaken += 1;
    state.dailyCalls += 1;
    if (getHour() >= 22 || getHour() < 6) state.nightCalls += 1;
    log(`EMS call: ${cond.name} (${triage.name}) in ${district.name} — ${caller} called it in.`);
    return { ok: true, call };
  }

  function newCallGreen() {
    const conds = HOSPITAL_CONDITIONS.filter((x) => hospitalTriageFor(x.id).priority <= 2);
    const cond = conds[Math.floor(rng() * conds.length)];
    const triage = hospitalTriageFor(cond.id);
    const district = HOSPITAL_DISTRICTS[Math.floor(rng() * HOSPITAL_DISTRICTS.length)];
    const caller = HOSPITAL_CALLERS[Math.floor(rng() * HOSPITAL_CALLERS.length)];
    const call = {
      condition: cond.id, triage: triage.id, district: district.id,
      caller, age: 3 + Math.floor(rng() * 85),
      travel: hospitalTravelTime(district.id, state.upgrades.includes('siren')),
      timeLeft: triage.timeLimit, onTime: true, id: `call-${getDay()}-${state.callsTaken + 1}`,
    };
    state.call = call;
    state.callStage = 'dispatched';
    state.callTimer = call.timeLeft;
    state.callsTaken += 1;
    state.dailyCalls += 1;
    log(`EMS call: ${cond.name} (${triage.name}) in ${district.name}.`);
    return { ok: true, call };
  }

  function arriveScene() {
    if (!state.call) return { ok: false, reason: 'no-call' };
    if (state.callStage !== 'dispatched') return { ok: false, reason: 'wrong-stage', stage: state.callStage };
    state.callStage = 'onscene';
    state.fuel = Math.max(0, state.fuel - 8);
    log(`On scene in ${state.call.district}. Patient: ${state.call.condition}, age ${state.call.age}.`);
    return { ok: true, stage: 'onscene' };
  }

  function triagePatient(levelId) {
    if (!state.call) return { ok: false, reason: 'no-call' };
    if (state.callStage !== 'onscene') return { ok: false, reason: 'wrong-stage', stage: state.callStage };
    const correct = hospitalTriageFor(state.call.condition).id;
    const picked = TRIAGE_LEVELS.find((t) => t.id === levelId);
    if (!picked) return { ok: false, reason: 'no-such-triage' };
    state.triageDone = true;
    const alsBonus = state.upgrades.includes('training') ? 1 : 0;
    const right = levelId === correct || (alsBonus && Math.abs(picked.priority - hospitalTriageFor(state.call.condition).priority) <= 1);
    if (right) {
      gainXp(10);
      log(`Triage correct: ${picked.name}. The crew nods.`);
      return { ok: true, correct: true, level: levelId };
    }
    rep(-3);
    state.complaints += 1;
    log(`Triage wrong — this patient is ${correct}, not ${levelId}. The hospital notices.`);
    return { ok: true, correct: false, level: levelId, correctLevel: correct };
  }

  function treatOnScene() {
    if (!state.call) return { ok: false, reason: 'no-call' };
    if (state.callStage !== 'onscene') return { ok: false, reason: 'wrong-stage', stage: state.callStage };
    if (!state.triageDone) return { ok: false, reason: 'triage-first' };
    if (state.supplies < 10) return { ok: false, reason: 'no-supplies' };
    const cond = HOSPITAL_CONDITIONS.find((x) => x.id === state.call.condition);
    let time = cond.treatTime;
    if (state.upgrades.includes('kit')) time *= 0.75;
    if (state.crew.includes('priya')) time *= 0.8;
    state.supplies -= 10;
    state.treatedOnScene = true;
    state.patientStable = true;
    if (state.upgrades.includes('oxygen') && state.call.triage === 'orange') state.patientStable = true;
    gainXp(15);
    log(`Treated on scene: ${cond.name} stabilised (${Math.round(time)}s of work).`);
    return { ok: true, treatTime: Math.round(time), stable: true };
  }

  function loadPatient() {
    if (!state.call) return { ok: false, reason: 'no-call' };
    if (state.callStage !== 'onscene') return { ok: false, reason: 'wrong-stage', stage: state.callStage };
    if (!state.triageDone) return { ok: false, reason: 'triage-first' };
    if (state.patientOnBoard) return { ok: false, reason: 'already-loaded' };
    state.patientOnBoard = true;
    state.callStage = 'transport';
    log('Patient loaded. Sirens on — Solara General, fastest safe route.');
    return { ok: true, stage: 'transport' };
  }

  function arriveHospital(wardId) {
    if (!state.call) return { ok: false, reason: 'no-call' };
    if (state.callStage !== 'transport') return { ok: false, reason: 'wrong-stage', stage: state.callStage };
    if (!state.patientOnBoard) return { ok: false, reason: 'no-patient' };
    const cond = HOSPITAL_CONDITIONS.find((x) => x.id === state.call.condition);
    const ward = HOSPITAL_WARDS.find((w) => w.id === wardId);
    if (!ward) return { ok: false, reason: 'no-such-ward' };
    const rightWard = cond.ward === wardId;
    const pay = hospitalPayFor(state.call, state.rank, state.upgrades) * ward.pay * (rightWard ? 1.15 : 0.8);
    const total = Math.round(pay);
    state.callsDone += 1;
    state.shiftCallsDone += 1;
    state.patientsTransported += 1;
    state.earned += total;
    addCash(total);
    if (state.call.triage === 'red') state.redSaves += 1;
    if (state.call.triage === 'green') state.greenDone += 1;
    if (rightWard && state.treatedOnScene) {
      state.perfectHandovers += 1;
      state.livesSaved += 1;
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      rep(4);
      state.compliments += 1;
      gainXp(30);
    } else if (rightWard) {
      state.livesSaved += 1;
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      rep(2);
      gainXp(20);
    } else {
      state.streak = 0;
      rep(-2);
      log(`Wrong ward — ${cond.name} belongs in ${cond.ward}, not ${ward.name}.`);
    }
    log(`Handover at ${ward.name}: $${total}${rightWard ? ' — right ward, clean handover.' : ''}`);
    state.call = null;
    state.callStage = 'idle';
    state.callTimer = 0;
    state.patientOnBoard = false;
    state.patientStable = false;
    state.triageDone = false;
    state.treatedOnScene = false;
    return { ok: true, pay: total, rightWard, ward: wardId };
  }

  function abandonCall() {
    if (!state.call) return { ok: false, reason: 'no-call' };
    const cond = HOSPITAL_CONDITIONS.find((x) => x.id === state.call.condition);
    state.callsFailed += 1;
    state.livesLost += 1;
    state.streak = 0;
    rep(-8);
    log(`Call abandoned: ${cond.name}. The radio goes quiet.`);
    state.call = null;
    state.callStage = 'idle';
    state.callTimer = 0;
    state.patientOnBoard = false;
    state.patientStable = false;
    state.triageDone = false;
    state.treatedOnScene = false;
    return { ok: true };
  }

  function restock() {
    if (state.supplies >= 100) return { ok: false, reason: 'already-full' };
    const cost = Math.ceil((100 - state.supplies) / 5);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.supplies = 100;
    state.restocked += 1;
    log(`Restocked the ambulance for $${cost}.`);
    return { ok: true, cost };
  }

  function refuel() {
    if (state.fuel >= 100) return { ok: false, reason: 'already-full' };
    const cost = Math.ceil((100 - state.fuel) / 10);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.fuel = 100;
    return { ok: true, cost };
  }

  function buyUpgrade(id) {
    const u = HOSPITAL_UPGRADES.find((x) => x.id === id);
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

  function hireCrew(id) {
    const m = HOSPITAL_CREW.find((x) => x.id === id);
    if (!m) return { ok: false, reason: 'no-such-crew' };
    if (state.crew.includes(id)) return { ok: false, reason: 'already-hired' };
    state.crew.push(id);
    log(`Hired ${m.name} (${m.role}) — $${m.wage}/day.`);
    return { ok: true, id };
  }

  function fireCrew(id) {
    const i = state.crew.indexOf(id);
    if (i < 0) return { ok: false, reason: 'not-hired' };
    state.crew.splice(i, 1);
    return { ok: true, id };
  }

  function tick(dt) {
    if (state.call && state.callStage !== 'idle') {
      state.callTimer -= dt;
      const cond = HOSPITAL_CONDITIONS.find((x) => x.id === state.call.condition);
      if (!state.patientStable && state.call.triage === 'red' && rng() < dt * 0.005) {
        log(`Warning: ${cond.name} is deteriorating! Treat on scene or move faster.`);
      }
      if (state.callTimer <= 0) {
        const triage = hospitalTriageFor(state.call.condition);
        state.call.onTime = false;
        if (state.call.triage === 'red' || state.call.triage === 'orange') {
          state.callsFailed += 1;
          state.livesLost += 1;
          state.streak = 0;
          rep(-6);
          log(`Too late — the ${cond.name} patient did not make it. The city feels it.`);
          state.call = null;
          state.callStage = 'idle';
          state.patientOnBoard = false;
          state.patientStable = false;
          state.triageDone = false;
          state.treatedOnScene = false;
        } else {
          log(`The ${cond.name} call timed out — the patient walked to the clinic instead.`);
          state.callsFailed += 1;
          state.call = null;
          state.callStage = 'idle';
          state.patientOnBoard = false;
          state.patientStable = false;
          state.triageDone = false;
          state.treatedOnScene = false;
        }
        void triage;
      }
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyCalls = 0;
    let wages = 0;
    for (const id of state.crew) {
      const m = HOSPITAL_CREW.find((x) => x.id === id);
      wages += m.wage;
    }
    if (wages > 0) {
      state.spent += wages;
      addCash(-wages);
      log(`Crew wages paid: $${wages}.`);
    }
    if (state.onShift) {
      state.supplies = Math.min(100, state.supplies + 20);
      log('New day at Solara General — supplies topped up, radio check done.');
    }
    if (rng() < 0.15) {
      log('Hospital notice: flu season — expect more green calls today.');
    }
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, reputation: state.reputation,
      callsTaken: state.callsTaken, callsDone: state.callsDone,
      callsFailed: state.callsFailed, livesSaved: state.livesSaved,
      livesLost: state.livesLost,
      patientsTransported: state.patientsTransported,
      perfectHandovers: state.perfectHandovers,
      earned: state.earned, spent: state.spent,
      upgrades: state.upgrades, crew: state.crew,
      onShift: state.onShift, shiftCallsDone: state.shiftCallsDone,
      shiftStarted: state.shiftStarted, call: state.call,
      callStage: state.callStage, callTimer: state.callTimer,
      patientOnBoard: state.patientOnBoard,
      patientStable: state.patientStable, triageDone: state.triageDone,
      treatedOnScene: state.treatedOnScene,
      supplies: state.supplies, fuel: state.fuel,
      lastDay: state.lastDay, dailyCalls: state.dailyCalls,
      bestStreak: state.bestStreak, streak: state.streak,
      redSaves: state.redSaves, greenDone: state.greenDone,
      nightCalls: state.nightCalls, compliments: state.compliments,
      complaints: state.complaints, restocked: state.restocked,
    }));
  }

  function deserialize(d) {
    if (!d || typeof d !== 'object') return;
    for (const k of Object.keys(state)) {
      if (d[k] !== undefined) state[k] = d[k];
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: HOSPITAL_RANKS[state.rank].name,
      xp: state.xp,
      reputation: state.reputation,
      callsTaken: state.callsTaken,
      callsDone: state.callsDone,
      callsFailed: state.callsFailed,
      livesSaved: state.livesSaved,
      livesLost: state.livesLost,
      patientsTransported: state.patientsTransported,
      perfectHandovers: state.perfectHandovers,
      earned: Math.round(state.earned),
      spent: state.spent,
      upgrades: state.upgrades.length,
      crew: state.crew.length,
      onShift: state.onShift,
      shiftCallsDone: state.shiftCallsDone,
      callStage: state.callStage,
      call: state.call ? state.call.condition : null,
      triage: state.call ? state.call.triage : null,
      timeLeft: Math.round(state.callTimer),
      supplies: Math.round(state.supplies),
      fuel: Math.round(state.fuel),
      bestStreak: state.bestStreak,
      redSaves: state.redSaves,
      nightCalls: state.nightCalls,
      compliments: state.compliments,
      complaints: state.complaints,
    };
  }

  function hudLine() {
    if (state.call) {
      const cond = HOSPITAL_CONDITIONS.find((x) => x.id === state.call.condition);
      return `EMS: ${cond.name} (${state.call.triage}) — ${state.callStage}, ${Math.round(state.callTimer)}s left`;
    }
    if (state.onShift) return 'EMS: on shift — waiting for the next call';
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearHospital = Math.hypot(pos.x - 90, pos.z - 30) < 30;
    if (!nearHospital) return false;
    if (!state.onShift) { startShift(); return true; }
    if (state.call && state.callStage === 'dispatched') { arriveScene(); return true; }
    if (state.call && state.callStage === 'transport') {
      const cond = HOSPITAL_CONDITIONS.find((x) => x.id === state.call.condition);
      arriveHospital(cond.ward);
      return true;
    }
    return false;
  }

  function shiftReport() {
    return {
      onShift: state.onShift,
      callsDone: state.shiftCallsDone,
      livesSaved: state.livesSaved,
      livesLost: state.livesLost,
      reputation: state.reputation,
      supplies: Math.round(state.supplies),
      fuel: Math.round(state.fuel),
      crew: state.crew.map((id) => HOSPITAL_CREW.find((x) => x.id === id).name),
    };
  }

  function wardList() {
    return HOSPITAL_WARDS.map((w) => ({ id: w.id, name: w.name, beds: w.beds, pay: w.pay }));
  }

  return {
    state, startShift, endShift, newCall, arriveScene, triagePatient,
    treatOnScene, loadPatient, arriveHospital, abandonCall, restock,
    refuel, buyUpgrade, hireCrew, fireCrew, tick, tickDay, serialize,
    deserialize, stats, hudLine, interact, shiftReport, wardList,
  };
}

export const HOSPITAL_EVENTS = [
  { id: 'pileup', name: 'Highway Pile-up', calls: 3, desc: 'Three cars, five patients, one ambulance.' },
  { id: 'concert', name: 'Concert Crush', calls: 2, desc: 'The arena show ends badly for two fans.' },
  { id: 'heatwave', name: 'Heatwave', calls: 2, desc: 'Elderly patients collapsing in the heat.' },
  { id: 'storm', name: 'Storm Injuries', calls: 2, desc: 'Falling signs and branches in the storm.' },
  { id: 'quiet', name: 'Quiet Night', calls: 0, desc: 'Nothing. The radio barely crackles.' },
];

export function hospitalEventFor(day) {
  return HOSPITAL_EVENTS[day % HOSPITAL_EVENTS.length];
}

export function hospitalMassCasualty(calls) {
  let red = 0;
  let orange = 0;
  for (const call of calls) {
    if (call.triage === 'red') red += 1;
    if (call.triage === 'orange') orange += 1;
  }
  return { total: calls.length, red, orange, severity: red * 3 + orange * 2 };
}

export function hospitalShiftPay(callsDone, livesSaved, reputation) {
  const base = callsDone * 20;
  const bonus = livesSaved * 15;
  const repBonus = Math.round(reputation / 10) * 5;
  return base + bonus + repBonus;
}

export function hospitalReputationTier(reputation) {
  if (reputation >= 90) return 'Beloved';
  if (reputation >= 70) return 'Trusted';
  if (reputation >= 50) return 'Respected';
  if (reputation >= 30) return 'Unknown';
  return 'Distrusted';
}

export const HOSPITAL_PROTOCOLS = [
  { id: 'abc', name: 'ABC Assessment', steps: 3, xp: 10, desc: 'Airway, breathing, circulation — always first.' },
  { id: 'cpr', name: 'CPR Protocol', steps: 5, xp: 15, desc: 'Thirty compressions, two breaths, repeat.' },
  { id: 'trauma', name: 'Trauma Survey', steps: 4, xp: 12, desc: 'Primary survey, then secondary, then move.' },
  { id: 'stroke', name: 'Stroke FAST', steps: 4, xp: 12, desc: 'Face, arms, speech, time — call it early.' },
  { id: 'sepsis', name: 'Sepsis Six', steps: 6, xp: 18, desc: 'Six steps inside the golden hour.' },
  { id: 'burns', name: 'Burn Rule of Nines', steps: 3, xp: 10, desc: 'Estimate the burn, cool it, cover it.' },
  { id: 'paeds', name: 'Paediatric Doses', steps: 4, xp: 14, desc: 'Weight-based dosing for small patients.' },
  { id: 'obstetric', name: 'Obstetric Emergency', steps: 5, xp: 16, desc: 'Two patients, one clock, calm hands.' },
  { id: 'hazmat', name: 'Hazmat Response', steps: 5, xp: 16, desc: 'Suit up, decontaminate, then treat.' },
  { id: 'triage-sort', name: 'Mass Triage Sort', steps: 4, xp: 14, desc: 'Sort twenty patients in ten minutes.' },
];

export const HOSPITAL_DRILLS = [
  { id: 'pileup', name: 'Pile-up Drill', patients: 6, reward: 150, desc: 'Six casualties, one ambulance, go.' },
  { id: 'fire', name: 'Fire Drill', patients: 4, reward: 120, desc: 'Smoke, heat, and a full ward to clear.' },
  { id: 'cardiac', name: 'Cardiac Arrest Drill', patients: 2, reward: 100, desc: 'Two arrests, one team, perfect compressions.' },
  { id: 'maternity', name: 'Maternity Drill', patients: 3, reward: 130, desc: 'A birth in the back of the ambulance.' },
  { id: 'hazmat', name: 'Hazmat Drill', patients: 5, reward: 160, desc: 'Unknown powder, suited up, slow and right.' },
  { id: 'quake', name: 'Quake Drill', patients: 8, reward: 200, desc: 'The big one. Everyone at once.' },
];

export const HOSPITAL_SHIFTS = [
  { id: 'day', name: 'Day Shift', hours: '07:00–19:00', calls: 4, pay: 100, desc: 'Busy, bright, endless paperwork.' },
  { id: 'night', name: 'Night Shift', hours: '19:00–07:00', calls: 3, pay: 150, desc: 'Quieter, stranger, better pay.' },
  { id: 'weekend', name: 'Weekend Shift', hours: 'Sat–Sun', calls: 6, pay: 180, desc: 'The city goes out. Then it comes in.' },
  { id: 'holiday', name: 'Holiday Cover', hours: 'All day', calls: 5, pay: 220, desc: 'Nobody else wants it. You do.' },
];

export function hospitalProtocolXp(protocolId) {
  const p = HOSPITAL_PROTOCOLS.find((x) => x.id === protocolId);
  return p ? p.xp : 0;
}

export function hospitalDrillScore(patients, treated, timeLeft) {
  const base = treated * 20;
  const timeBonus = Math.max(0, timeLeft);
  return base + timeBonus;
}

export function hospitalShiftPayFor(shiftId, callsDone) {
  const s = HOSPITAL_SHIFTS.find((x) => x.id === shiftId);
  if (!s) return 0;
  return s.pay + callsDone * 20;
}

export function createHospitalTraining(system) {
  const learned = [];
  const drillsDone = [];
  let drillsPassed = 0;

  function learnProtocol(id) {
    const p = HOSPITAL_PROTOCOLS.find((x) => x.id === id);
    if (!p) return { ok: false, reason: 'no-such-protocol' };
    if (learned.includes(id)) return { ok: false, reason: 'already-learned' };
    learned.push(id);
    return { ok: true, id, name: p.name, xp: p.xp, steps: p.steps };
  }

  function runDrill(drillId, treated) {
    const d = HOSPITAL_DRILLS.find((x) => x.id === drillId);
    if (!d) return { ok: false, reason: 'no-such-drill' };
    const score = hospitalDrillScore(d.patients, treated, 60);
    const passed = treated >= Math.ceil(d.patients * 0.7);
    drillsDone.push({ drill: drillId, treated, score, passed });
    if (passed) {
      drillsPassed += 1;
      return { ok: true, passed: true, score, reward: d.reward };
    }
    return { ok: true, passed: false, score, reward: 0 };
  }

  function protocols() {
    return HOSPITAL_PROTOCOLS.map((p) => ({
      id: p.id, name: p.name, steps: p.steps, learned: learned.includes(p.id),
    }));
  }

  function drills() {
    return HOSPITAL_DRILLS.map((d) => ({
      id: d.id, name: d.name, patients: d.patients, reward: d.reward,
      done: drillsDone.some((x) => x.drill === d.id),
    }));
  }

  return {
    learnProtocol, runDrill, protocols, drills,
    get learned() { return [...learned]; },
    get passed() { return drillsPassed; },
    get history() { return [...drillsDone]; },
  };
}

export function hospitalTriageQuiz(conditionId, answerId) {
  const correct = hospitalTriageFor(conditionId).id;
  return { correct: answerId === correct, correctLevel: correct, condition: conditionId };
}

export function hospitalBurnoutScore(callsDone, livesLost, restDays) {
  const score = callsDone * 2 + livesLost * 10 - restDays * 15;
  if (score > 60) return 'burned-out';
  if (score > 30) return 'tired';
  return 'fresh';
}

export const HOSPITAL_TIPS = [
  { id: 'abc-first', name: 'ABC First', text: 'Airway, breathing, circulation. Every patient, every time.' },
  { id: 'triage-honest', name: 'Triage Honest', text: 'A wrong tag costs more than a slow tag.' },
  { id: 'right-ward', name: 'Right Ward', text: 'The wrong ward wastes the golden hour.' },
  { id: 'supplies', name: 'Restock Early', text: 'Restock before the shift, not during the call.' },
  { id: 'red-fast', name: 'Red Means Now', text: 'Red tags do not wait for paperwork.' },
  { id: 'calm-voice', name: 'Calm Voice', text: 'Your calm is their calm.' },
  { id: 'drive-safe', name: 'Drive Safe', text: 'A crashed ambulance helps nobody.' },
  { id: 'rest-days', name: 'Rest Days', text: 'Burnout kills more medics than trauma does.' },
];

export const HOSPITAL_AWARDS = [
  { id: 'golden-hour', name: 'Golden Hour', need: 'redSaves', goal: 10, desc: 'Save 10 red-tag patients.' },
  { id: 'night-owl', name: 'Night Owl', need: 'nightCalls', goal: 20, desc: 'Answer 20 night calls.' },
  { id: 'perfect-week', name: 'Perfect Week', need: 'bestStreak', goal: 7, desc: 'Seven clean handovers in a row.' },
  { id: 'century', name: 'Century', need: 'callsDone', goal: 100, desc: 'Complete 100 calls.' },
  { id: 'beloved', name: 'Beloved', need: 'reputation', goal: 90, desc: 'Reach 90 reputation.' },
];

export function hospitalTipFor(day) {
  return HOSPITAL_TIPS[day % HOSPITAL_TIPS.length];
}

export function hospitalAwardProgress(awardId, state) {
  const a = HOSPITAL_AWARDS.find((x) => x.id === awardId);
  if (!a) return null;
  const have = state[a.need] || 0;
  return { id: a.id, name: a.name, have, goal: a.goal, done: have >= a.goal };
}

export function hospitalResponseGrade(timeLeft, timeLimit) {
  const frac = timeLeft / timeLimit;
  if (frac > 0.75) return 'excellent';
  if (frac > 0.5) return 'good';
  if (frac > 0.25) return 'late';
  return 'critical';
}

export function hospitalSuppliesFor(callsToday) {
  return Math.max(0, 100 - callsToday * 10);
}

export function hospitalCrewMorale(compliments, complaints) {
  const total = compliments + complaints;
  if (total === 0) return 70;
  return Math.round(50 + ((compliments - complaints) / total) * 50);
}

export function hospitalBestWard(callsByWard) {
  let best = null;
  let bestCount = 0;
  for (const [ward, count] of Object.entries(callsByWard)) {
    if (count > bestCount) { bestCount = count; best = ward; }
  }
  return best ? { ward: best, count: bestCount } : null;
}

export const HOSPITAL_RECORDS = [
  { id: 'most-saves', name: 'Most Saves', stat: 'livesSaved', unit: 'lives', desc: 'Most lives saved.' },
  { id: 'most-calls', name: 'Most Calls', stat: 'callsDone', unit: 'calls', desc: 'Most calls completed.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'calls', desc: 'Longest clean streak.' },
  { id: 'most-reds', name: 'Most Red Saves', stat: 'redSaves', unit: 'saves', desc: 'Most red-tag saves.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money earned.' },
];

export function hospitalRecordFor(recordId, state) {
  const r = HOSPITAL_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function hospitalAllRecords(state) {
  return HOSPITAL_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function hospitalSaveRate(saved, lost) {
  const total = saved + lost;
  if (total === 0) return 100;
  return Math.round((saved / total) * 100);
}

export function hospitalCallCompletion(done, failed) {
  const total = done + failed;
  if (total === 0) return 100;
  return Math.round((done / total) * 100);
}

export function hospitalMedicGrade(saved, lost, reputation) {
  const rate = hospitalSaveRate(saved, lost);
  if (rate >= 95 && reputation >= 80) return 'S';
  if (rate >= 85) return 'A';
  if (rate >= 70) return 'B';
  if (rate >= 50) return 'C';
  return 'D';
}

export const HOSPITAL_SEASONAL_SURGE = [
  { id: 'flu-season', name: 'Flu Season', season: 'winter', calls: 2, desc: 'Coughs, fevers, and full waiting rooms.' },
  { id: 'heatwave', name: 'Heatwave', season: 'summer', calls: 2, desc: 'Dehydration and heatstroke.' },
  { id: 'allergy', name: 'Allergy Season', season: 'spring', calls: 1, desc: 'Pollen, wheezing, and antihistamines.' },
  { id: 'festival-surge', name: 'Festival Surge', season: 'summer', calls: 3, desc: 'The festival ends in the ER.' },
];

export function hospitalSurgeFor(seasonId) {
  return HOSPITAL_SEASONAL_SURGE.filter((x) => x.season === seasonId);
}

export function hospitalSurgeCalls(seasonId) {
  let total = 0;
  for (const s of hospitalSurgeFor(seasonId)) total += s.calls;
  return total;
}

export function hospitalOvertimePay(hours, rate) {
  return Math.round(hours * rate * 1.5);
}

export function hospitalBedOccupancy(patients, beds) {
  if (beds === 0) return 0;
  return Math.round((patients / beds) * 100);
}

export const HOSPITAL_QUICK_START = [
  'Start every shift with full supplies and fuel.',
  'Triage before you treat. Always.',
  'Red tags go to trauma or cardiac, never the ER queue.',
  'Restock after every red call.',
  'Buy the defibrillator before your first red shift.',
  'A calm voice is the best drug you carry.',
];

export function hospitalQuickStart(step) {
  return HOSPITAL_QUICK_START[step] || null;
}

export function hospitalTotalValue(state) {
  return state.upgrades.length * 300 + state.crew.length * 200;
}

export function hospitalProgressPercent(state) {
  const total = state.callsDone + state.callsFailed;
  if (total === 0) return 0;
  return Math.round((state.callsDone / total) * 100);
}

export function hospitalSummary(state) {
  return `${HOSPITAL_RANKS[state.rank].name}: ${state.callsDone} calls, ${state.livesSaved} saved, rep ${state.reputation}, $${Math.round(state.earned)} earned.`;
}

export function hospitalNextGoal(state) {
  if (state.callsDone < 5) return 'Complete 5 calls.';
  if (state.redSaves < 1) return 'Save a red-tag patient.';
  if (state.reputation < 70) return 'Reach 70 reputation.';
  return 'Become a Legend of the Night Shift.';
}

export const HOSPITAL_META = {
  system: 'hospital', version: '7b-B', author: 'builder-B',
  files: 1, lines: 910, features: ['calls', 'triage', 'treatment', 'transport', 'wards', 'shifts'],
};

export function hospitalMeta() {
  return { ...HOSPITAL_META };
}

export const HOSPITAL_GEAR_GUIDE = [
  { id: 'kit', advice: 'Trauma kit first. It pays for itself in a week.' },
  { id: 'defib', advice: 'Red tags pay double with a defib.' },
  { id: 'siren', advice: 'A loud siren is a fast ambulance.' },
  { id: 'radio', advice: 'Reserved beds mean clean handovers.' },
  { id: 'training', advice: 'ALS training never expires.' },
];

export function hospitalGearAdvice(id) {
  const g = HOSPITAL_GEAR_GUIDE.find((x) => x.id === id);
  return g ? g.advice : 'Stay safe out there.';
}

export function hospitalUpgradePath(budget) {
  return HOSPITAL_UPGRADES.filter((u) => u.cost <= budget).map((u) => u.id);
}
