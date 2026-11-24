// Ria moonlights for Solara General as emergency medical services: take the
// radio call, triage, treat on scene, load the patient and hand over at the
// right ward. Context supplies rng, day/hour getters, cash access, a logger
// and the player position. The heat adder is present with a default but never
// called; the speed getter is mentioned only in the header contract.
export const HOSPITAL_WARDS = [
  { id: 'emergency', name: 'Emergency', beds: 20, payMult: 1.0, desc: 'The front door for every urgent case.' },
  { id: 'surgery', name: 'Surgery', beds: 12, payMult: 1.3, desc: 'Operating theatres for trauma cases.' },
  { id: 'icu', name: 'Intensive Care', beds: 8, payMult: 1.5, desc: 'Critical patients under constant watch.' },
  { id: 'pediatrics', name: 'Pediatrics', beds: 14, payMult: 1.1, desc: 'Care for the youngest patients.' },
  { id: 'cardiology', name: 'Cardiology', beds: 10, payMult: 1.4, desc: 'Heart cases and chest pain.' },
  { id: 'orthopedics', name: 'Orthopedics', beds: 12, payMult: 1.1, desc: 'Broken bones and bad falls.' },
  { id: 'maternity', name: 'Maternity', beds: 10, payMult: 1.2, desc: 'Mothers and newborns.' },
  { id: 'general', name: 'General Ward', beds: 30, payMult: 0.9, desc: 'Stable patients recovering slowly.' },
];

export const TRIAGE_LEVELS = [
  { id: 'red', name: 'Red', priority: 4, payMult: 1.6, timeLimit: 300, colour: 'red', desc: 'Critical, treat immediately.' },
  { id: 'orange', name: 'Orange', priority: 3, payMult: 1.3, timeLimit: 600, colour: 'orange', desc: 'Urgent, treat very soon.' },
  { id: 'yellow', name: 'Yellow', priority: 2, payMult: 1.1, timeLimit: 900, colour: 'yellow', desc: 'Stable but needs care.' },
  { id: 'green', name: 'Green', priority: 1, payMult: 1.0, timeLimit: 1200, colour: 'green', desc: 'Minor, can wait a while.' },
  { id: 'white', name: 'White', priority: 0, payMult: 0.8, timeLimit: 1800, colour: 'white', desc: 'Walking wounded, lowest priority.' },
];

export const HOSPITAL_CONDITIONS = [
  { id: 'heart-attack', name: 'Heart Attack', triage: 'red', basePay: 300, treatTime: 60, ward: 'cardiology', desc: 'Chest pain, sweating, needs the cath lab.' },
  { id: 'car-crash', name: 'Car Crash', triage: 'red', basePay: 320, treatTime: 70, ward: 'surgery', desc: 'Multi-trauma from a bad collision.' },
  { id: 'drowning', name: 'Drowning', triage: 'red', basePay: 280, treatTime: 55, ward: 'icu', desc: 'Pulled from the bay, barely breathing.' },
  { id: 'stroke', name: 'Stroke', triage: 'red', basePay: 290, treatTime: 50, ward: 'icu', desc: 'Slurred speech, one side weak.' },
  { id: 'broken-leg', name: 'Broken Leg', triage: 'orange', basePay: 150, treatTime: 30, ward: 'orthopedics', desc: 'A clean break from a fall.' },
  { id: 'severe-burn', name: 'Severe Burn', triage: 'orange', basePay: 200, treatTime: 45, ward: 'surgery', desc: 'Burns from a kitchen fire.' },
  { id: 'asthma-attack', name: 'Asthma Attack', triage: 'orange', basePay: 140, treatTime: 25, ward: 'emergency', desc: 'Wheezing hard, inhaler empty.' },
  { id: 'labour', name: 'Labour', triage: 'orange', basePay: 180, treatTime: 40, ward: 'maternity', desc: 'A baby on the way, fast.' },
  { id: 'fever-child', name: 'Feverish Child', triage: 'yellow', basePay: 100, treatTime: 20, ward: 'pediatrics', desc: 'A small child burning with fever.' },
  { id: 'sprained-ankle', name: 'Sprained Ankle', triage: 'yellow', basePay: 80, treatTime: 15, ward: 'orthopedics', desc: 'Swollen ankle from the stairs.' },
  { id: 'food-poisoning', name: 'Food Poisoning', triage: 'yellow', basePay: 90, treatTime: 20, ward: 'general', desc: 'Bad shellfish at the market.' },
  { id: 'migraine', name: 'Migraine', triage: 'yellow', basePay: 70, treatTime: 15, ward: 'general', desc: 'A blinding headache, lights hurt.' },
  { id: 'cut-finger', name: 'Cut Finger', triage: 'green', basePay: 50, treatTime: 10, ward: 'emergency', desc: 'A deep cut while filleting fish.' },
  { id: 'sunburn', name: 'Sunburn', triage: 'green', basePay: 40, treatTime: 8, ward: 'general', desc: 'A tourist who forgot the sunscreen.' },
  { id: 'bruised-knee', name: 'Bruised Knee', triage: 'green', basePay: 35, treatTime: 8, ward: 'general', desc: 'A scraped knee from the playground.' },
  { id: 'check-up', name: 'Check Up', triage: 'white', basePay: 30, treatTime: 5, ward: 'general', desc: 'An elderly caller who feels faint.' },
];

export const HOSPITAL_CALLERS = [
  'A panicked mother on the phone',
  'A fisherman calling from the pier',
  'A shopkeeper with a customer down',
  'A lifeguard at the beach',
  'A taxi driver stuck in traffic',
  'A teacher at the school gate',
  'A night watchman at the harbour',
  'A tourist with no local words',
  'A grandmother calling for her husband',
  'A construction foreman on site',
  'A hotel receptionist at the desk',
  'A bus driver at the depot',
  'A neighbour who heard a crash',
  'A market stall holder',
  'A coach at the sports field',
  'A sailor radioing from a boat',
];

export const HOSPITAL_DISTRICTS = [
  { id: 'marina', name: 'Marina', distance: 3, traffic: 2, desc: 'Close to the hospital, light traffic.' },
  { id: 'downtown', name: 'Downtown', distance: 5, traffic: 4, desc: 'Busy streets, slow at lunch.' },
  { id: 'old-town', name: 'Old Town', distance: 4, traffic: 3, desc: 'Narrow lanes, tricky turns.' },
  { id: 'harbour', name: 'Harbour', distance: 7, traffic: 3, desc: 'A long haul past the docks.' },
  { id: 'beach', name: 'Beach', distance: 6, traffic: 2, desc: 'Sand roads and holiday crowds.' },
  { id: 'suburbs', name: 'Suburbs', distance: 8, traffic: 2, desc: 'Quiet streets, far from base.' },
  { id: 'industrial', name: 'Industrial Park', distance: 9, traffic: 4, desc: 'Trucks everywhere, heavy traffic.' },
  { id: 'hills', name: 'Hills', distance: 10, traffic: 1, desc: 'Winding roads up the hill.' },
];

export const HOSPITAL_UPGRADES = [
  { id: 'defib', name: 'Defibrillator', cost: 400, desc: 'Shocks a stopped heart back to life.', effect: 'pay' },
  { id: 'radio', name: 'Better Radio', cost: 200, desc: 'Clear calls, no static, faster dispatch.', effect: 'pay' },
  { id: 'trauma-kit', name: 'Trauma Kit', cost: 350, desc: 'Treats patients faster on scene.', effect: 'treat' },
  { id: 'oxygen', name: 'Oxygen Tank', cost: 250, desc: 'Keeps patients stable on the road.', effect: 'stable' },
  { id: 'advanced-training', name: 'Advanced Training', cost: 500, desc: 'One-step triage misses still count.', effect: 'triage' },
  { id: 'stretcher', name: 'Power Stretcher', cost: 300, desc: 'Loads patients in half the time.', effect: 'load' },
  { id: 'siren', name: 'Loud Siren', cost: 150, desc: 'Clears traffic on the way to the scene.', effect: 'travel' },
  { id: 'medkit', name: 'Extra Medkit', cost: 180, desc: 'More supplies per restock.', effect: 'supply' },
];

export const HOSPITAL_RANKS = [
  { level: 0, name: 'Volunteer', xp: 0, perk: 'Take green calls and learn the ropes.' },
  { level: 1, name: 'Medic', xp: 150, perk: 'Orange calls and better pay.' },
  { level: 2, name: 'Paramedic', xp: 400, perk: 'Red calls and advanced gear.' },
  { level: 3, name: 'Senior Medic', xp: 800, perk: 'The hardest calls trust you.' },
  { level: 4, name: 'Bay Legend', xp: 1500, perk: 'The name every caller asks for.' },
];

export const HOSPITAL_CREW = [
  { id: 'medic-maria', name: 'Maria', role: 'medic', bonus: 'medic', value: 15, wage: 40, desc: 'A sharp medic who treats fast.' },
  { id: 'driver-dan', name: 'Dan', role: 'driver', bonus: 'drive', value: 10, wage: 30, desc: 'Knows every shortcut in the city.' },
  { id: 'nurse-nina', name: 'Nina', role: 'nurse', bonus: 'care', value: 12, wage: 35, desc: 'Calm hands, calm patients.' },
  { id: 'rookie-rob', name: 'Rob', role: 'rookie', bonus: 'lift', value: 5, wage: 20, desc: 'Strong back, learning fast.' },
];

export const HOSPITAL_EVENTS = [
  { id: 'flu-season', name: 'Flu Season', calls: 8, desc: 'Coughs and fevers everywhere.' },
  { id: 'heatwave', name: 'Heatwave', calls: 6, desc: 'Heatstroke cases pile up.' },
  { id: 'festival-night', name: 'Festival Night', calls: 10, desc: 'A busy night after the festival.' },
  { id: 'storm-night', name: 'Storm Night', calls: 7, desc: 'Crashes and falls in the storm.' },
  { id: 'quiet-shift', name: 'Quiet Shift', calls: 3, desc: 'A rare calm night.' },
];

export const HOSPITAL_PROTOCOLS = [
  { id: 'cpr', name: 'CPR', steps: 5, xp: 20, desc: 'Chest compressions and rescue breaths.' },
  { id: 'bleeding', name: 'Bleeding Control', steps: 4, xp: 15, desc: 'Pressure, packing, tourniquet.' },
  { id: 'airway', name: 'Airway Management', steps: 6, xp: 25, desc: 'Open the airway, keep it open.' },
  { id: 'fracture', name: 'Fracture Splinting', steps: 4, xp: 15, desc: 'Splint it straight, move it gently.' },
  { id: 'burn-care', name: 'Burn Care', steps: 5, xp: 20, desc: 'Cool, cover, and keep them warm.' },
  { id: 'stroke-fast', name: 'Stroke FAST', steps: 3, xp: 15, desc: 'Face, arms, speech, time.' },
  { id: 'overdose', name: 'Overdose Response', steps: 4, xp: 20, desc: 'Naloxone and watchful waiting.' },
  { id: 'childbirth', name: 'Emergency Birth', steps: 7, xp: 30, desc: 'Deliver safely when there is no time.' },
  { id: 'drowning-rescue', name: 'Drowning Rescue', steps: 5, xp: 25, desc: 'Water out, air in, keep them warm.' },
  { id: 'mass-casualty', name: 'Mass Casualty', steps: 8, xp: 40, desc: 'Triage many, treat the worst first.' },
];

export const HOSPITAL_DRILLS = [
  { id: 'drill-cpr', name: 'CPR Drill', patients: 3, reward: 60, desc: 'Three dummies, one timer.' },
  { id: 'drill-multi', name: 'Multi Patient Drill', patients: 6, reward: 120, desc: 'Six patients, one ambulance.' },
  { id: 'drill-night', name: 'Night Drill', patients: 4, reward: 90, desc: 'A drill in the dark.' },
  { id: 'drill-storm', name: 'Storm Drill', patients: 5, reward: 100, desc: 'A drill in bad weather.' },
  { id: 'drill-kids', name: 'Kids Drill', patients: 4, reward: 80, desc: 'Small patients, big care.' },
  { id: 'drill-final', name: 'Final Drill', patients: 8, reward: 200, desc: 'The full exam, eight patients.' },
];

export const HOSPITAL_SHIFTS = [
  { id: 'morning', name: 'Morning Shift', hours: '06:00-14:00', calls: 4, pay: 150, desc: 'The morning rush.' },
  { id: 'afternoon', name: 'Afternoon Shift', hours: '14:00-22:00', calls: 5, pay: 180, desc: 'The busy afternoon.' },
  { id: 'night', name: 'Night Shift', hours: '22:00-06:00', calls: 6, pay: 250, desc: 'Quiet streets, hard calls.' },
  { id: 'weekend', name: 'Weekend Shift', hours: '08:00-20:00', calls: 8, pay: 300, desc: 'The longest, busiest shift.' },
];

export const HOSPITAL_TIPS = [
  { id: 'tip-triage', name: 'Triage First', tip: 'Triage before you treat, the right level pays more.' },
  { id: 'tip-ward', name: 'Right Ward', tip: 'The right ward pays a bonus, the wrong one costs you.' },
  { id: 'tip-timer', name: 'Watch the Timer', tip: 'Red and orange calls cost a life when the timer dies.' },
  { id: 'tip-supplies', name: 'Restock Often', tip: 'Treatment needs ten supplies, keep the box full.' },
  { id: 'tip-fuel', name: 'Keep Fuel Up', tip: 'Every scene costs eight fuel, refuel between calls.' },
  { id: 'tip-crew', name: 'Hire Crew', tip: 'A medic on board treats patients faster.' },
  { id: 'tip-shift', name: 'Shift Bonus', tip: 'Ending a shift pays twenty per call handled.' },
  { id: 'tip-green', name: 'Green Start', tip: 'Low ranks only get green calls, build up slowly.' },
];

export const HOSPITAL_AWARDS = [
  { id: 'first-save', name: 'First Save', need: 'livesSaved', goal: 1, desc: 'Save your first life.' },
  { id: 'ten-calls', name: 'Ten Calls', need: 'callsDone', goal: 10, desc: 'Complete ten calls.' },
  { id: 'red-hero', name: 'Red Hero', need: 'redSaves', goal: 5, desc: 'Save five red-triaged patients.' },
  { id: 'streak-five', name: 'Streak Five', need: 'bestStreak', goal: 5, desc: 'Five perfect handovers in a row.' },
  { id: 'trusted', name: 'Trusted Medic', need: 'reputation', goal: 70, desc: 'Reach seventy reputation.' },
];

export const HOSPITAL_RECORDS = [
  { id: 'calls', name: 'Calls Done', field: 'callsDone', unit: 'calls', desc: 'All calls completed.' },
  { id: 'lives', name: 'Lives Saved', field: 'livesSaved', unit: 'lives', desc: 'All lives saved.' },
  { id: 'perfect', name: 'Perfect Handovers', field: 'perfectHandovers', unit: 'handovers', desc: 'All perfect handovers.' },
  { id: 'reputation', name: 'Reputation', field: 'reputation', unit: 'points', desc: 'Current reputation.' },
  { id: 'earned', name: 'Total Earned', field: 'earned', unit: 'cash', desc: 'All cash earned from shifts.' },
];

export const HOSPITAL_SEASONAL_SURGE = [
  { id: 'spring-flu', name: 'Spring Flu', season: 'spring', calls: 12, desc: 'Spring brings the flu.' },
  { id: 'summer-heat', name: 'Summer Heat', season: 'summer', calls: 15, desc: 'Heatstroke season.' },
  { id: 'autumn-falls', name: 'Autumn Falls', season: 'autumn', calls: 10, desc: 'Wet leaves, broken bones.' },
  { id: 'winter-cold', name: 'Winter Cold', season: 'winter', calls: 11, desc: 'Cold nights, chest pains.' },
];

export const HOSPITAL_QUICK_START = [
  'Start a shift, then wait for the radio call.',
  'Arrive on scene and triage the patient.',
  'Treat on scene, then load the patient.',
  'Drive to the right ward for the bonus.',
  'Restock supplies and refuel between calls.',
  'End your shift to collect the call bonus.',
];

export const HOSPITAL_GEAR_GUIDE = [
  { id: 'defib', advice: 'A defibrillator pays for itself on red calls.' },
  { id: 'trauma-kit', advice: 'The trauma kit cuts treat time on every call.' },
  { id: 'oxygen', advice: 'Oxygen keeps patients stable on long drives.' },
  { id: 'radio', advice: 'A better radio means clearer calls and more pay.' },
  { id: 'advanced-training', advice: 'Advanced training forgives a one-step triage miss.' },
];

export const HOSPITAL_META = {
  system: 'hospital',
  version: '7b-B',
  author: 'builder-B',
  files: 1,
  lines: 910,
  features: ['calls', 'triage', 'treatment', 'transport', 'wards', 'shifts'],
};

function findWard(id) { return HOSPITAL_WARDS.find((w) => w.id === id); }
function findTriage(id) { return TRIAGE_LEVELS.find((t) => t.id === id); }
function findCondition(id) { return HOSPITAL_CONDITIONS.find((c) => c.id === id); }
function findDistrict(id) { return HOSPITAL_DISTRICTS.find((d) => d.id === id); }

export function hospitalRankFor(xp) {
  let out = 0;
  for (const r of HOSPITAL_RANKS) if (xp >= r.xp) out = r.level;
  return out;
}

export function hospitalTriageFor(conditionId) {
  const cond = findCondition(conditionId);
  if (!cond) return TRIAGE_LEVELS[0];
  return findTriage(cond.triage) || TRIAGE_LEVELS[0];
}

export function hospitalPayFor(call, rank, upgrades) {
  const cond = findCondition(call.condition);
  if (!cond) return 0;
  const triage = findTriage(call.triage) || TRIAGE_LEVELS[0];
  let pay = cond.basePay * triage.payMult * (1 + (rank || 0) * 0.1);
  if (upgrades && upgrades.includes('defib') && triage.id === 'red') pay += 50;
  if (upgrades && upgrades.includes('radio')) pay += 20;
  if (call.onTime) pay += 30;
  return Math.round(pay);
}

export function hospitalTravelTime(districtId, siren) {
  const d = findDistrict(districtId);
  if (!d) return 60;
  const time = d.distance * 12 + d.traffic * 15;
  return Math.round(siren ? time * 0.8 : time);
}

export function hospitalEventFor(day) {
  return HOSPITAL_EVENTS[((day % HOSPITAL_EVENTS.length) + HOSPITAL_EVENTS.length) % HOSPITAL_EVENTS.length];
}

export function hospitalMassCasualty(calls) {
  let red = 0;
  let orange = 0;
  for (const c of calls) {
    if (c.triage === 'red') red += 1;
    if (c.triage === 'orange') orange += 1;
  }
  return { total: calls.length, red, orange, severity: red * 3 + orange * 2 };
}

export function hospitalShiftPay(callsDone, livesSaved, reputation) {
  return callsDone * 20 + livesSaved * 15 + Math.round(reputation / 10) * 5;
}

export function hospitalReputationTier(reputation) {
  if (reputation >= 80) return 'Beloved';
  if (reputation >= 65) return 'Trusted';
  if (reputation >= 50) return 'Respected';
  if (reputation >= 35) return 'Unknown';
  return 'Distrusted';
}

export function hospitalProtocolXp(protocolId) {
  const p = HOSPITAL_PROTOCOLS.find((x) => x.id === protocolId);
  return p ? p.xp : 0;
}

export function hospitalDrillScore(patients, treated, timeLeft) {
  return treated * 20 + Math.max(0, timeLeft);
}

export function hospitalShiftPayFor(shiftId, callsDone) {
  const s = HOSPITAL_SHIFTS.find((x) => x.id === shiftId);
  if (!s) return 0;
  return s.pay + callsDone * 20;
}

export function hospitalTriageQuiz(conditionId, answerId) {
  const cond = findCondition(conditionId);
  const correctLevel = cond ? cond.triage : null;
  return { correct: answerId === correctLevel, correctLevel, condition: conditionId };
}

export function hospitalBurnoutScore(callsDone, livesLost, restDays) {
  const score = callsDone * 2 + livesLost * 10 - restDays * 15;
  if (score >= 60) return 'burned-out';
  if (score >= 30) return 'tired';
  return 'fresh';
}

export function hospitalTipFor(day) {
  return HOSPITAL_TIPS[((day % HOSPITAL_TIPS.length) + HOSPITAL_TIPS.length) % HOSPITAL_TIPS.length];
}

export function hospitalAwardProgress(awardId, state) {
  const a = HOSPITAL_AWARDS.find((x) => x.id === awardId);
  if (!a) return null;
  const current = state[a.need] || 0;
  return { id: a.id, name: a.name, current, goal: a.goal, done: current >= a.goal };
}

export function hospitalResponseGrade(timeLeft, timeLimit) {
  const frac = timeLimit ? timeLeft / timeLimit : 0;
  if (frac >= 0.6) return 'excellent';
  if (frac >= 0.35) return 'good';
  if (frac > 0) return 'late';
  return 'critical';
}

export function hospitalSuppliesFor(callsToday) {
  return Math.max(0, 100 - callsToday * 10);
}

export function hospitalCrewMorale(compliments, complaints) {
  const total = compliments + complaints;
  if (!total) return 70;
  return Math.round(50 + (compliments / total) * 50);
}

export function hospitalBestWard(callsByWard) {
  const keys = Object.keys(callsByWard || {});
  if (!keys.length) return null;
  let best = keys[0];
  for (const k of keys) if (callsByWard[k] > callsByWard[best]) best = k;
  return { ward: best, count: callsByWard[best] };
}

export function hospitalRecordFor(recordId, state) {
  const rec = HOSPITAL_RECORDS.find((r) => r.id === recordId);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: state[rec.field] || 0, unit: rec.unit };
}

export function hospitalAllRecords(state) {
  return HOSPITAL_RECORDS.map((r) => ({ id: r.id, name: r.name, value: state[r.field] || 0, unit: r.unit, desc: r.desc }));
}

export function hospitalSaveRate(livesSaved, livesLost) {
  const total = livesSaved + livesLost;
  if (!total) return 100;
  return Math.round((livesSaved / total) * 1000) / 10;
}

export function hospitalCallCompletion(callsDone, callsFailed) {
  const total = callsDone + callsFailed;
  if (!total) return 100;
  return Math.round((callsDone / total) * 1000) / 10;
}

export function hospitalMedicGrade(livesSaved, livesLost, reputation) {
  const rate = hospitalSaveRate(livesSaved, livesLost);
  if (rate >= 90 && reputation >= 70) return 'S';
  if (rate >= 80) return 'A';
  if (rate >= 65) return 'B';
  if (rate >= 50) return 'C';
  return 'D';
}

export function hospitalSurgeFor(seasonId) {
  return HOSPITAL_SEASONAL_SURGE.filter((s) => s.season === seasonId);
}

export function hospitalSurgeCalls(seasonId) {
  return hospitalSurgeFor(seasonId).reduce((s, x) => s + x.calls, 0);
}

export function hospitalOvertimePay(hours, rate) {
  return Math.round(hours * rate * 1.5);
}

export function hospitalBedOccupancy(patients, beds) {
  if (!beds) return 0;
  return Math.round((patients / beds) * 100);
}

export function hospitalQuickStart(step) {
  if (step < 0 || step >= HOSPITAL_QUICK_START.length) return null;
  return HOSPITAL_QUICK_START[step];
}

export function hospitalTotalValue(state) {
  return state.upgrades.length * 300 + state.crew.length * 200;
}

export function hospitalProgressPercent(state) {
  const total = state.callsDone + state.callsFailed;
  if (!total) return 0;
  return Math.round((state.callsDone / total) * 1000) / 10;
}

export function hospitalSummary(state) {
  const rankName = HOSPITAL_RANKS[state.rank].name;
  return `${rankName} Ria handled ${state.callsDone} calls, saved ${state.livesSaved} lives, reputation ${state.reputation} and earned ${Math.round(state.earned)}.`;
}

export function hospitalNextGoal(state) {
  if (state.callsDone < 5) return 'Complete 5 calls to hit your first goal.';
  if (state.redSaves < 1) return 'Save your first red patient to hit your next goal.';
  if (state.reputation < 70) return 'Reach 70 reputation to hit your next goal.';
  return 'Reach the top rank and become a Bay Legend.';
}

export function hospitalMeta() {
  return { ...HOSPITAL_META, features: [...HOSPITAL_META.features] };
}

export function hospitalGearAdvice(gearId) {
  const g = HOSPITAL_GEAR_GUIDE.find((x) => x.id === gearId);
  return g ? g.advice : 'Stay safe out there, check your kit before every shift.';
}

export function hospitalUpgradePath(budget) {
  return HOSPITAL_UPGRADES.filter((u) => u.cost <= budget).map((u) => u.id);
}

export function createHospitalSystem(ctx) {
  const {
    rng = Math.random,
    getDay = () => 1,
    getHour = () => 12,
    getCash = () => 0,
    addCash = () => {},
    addHeat = () => {},
    log = () => {},
    getPlayerPos = () => ({ x: 0, y: 0, z: 0 }),
  } = ctx || {};

  const state = {
    xp: 0, rank: 0, reputation: 50, callsTaken: 0, callsDone: 0, callsFailed: 0,
    livesSaved: 0, livesLost: 0, patientsTransported: 0, perfectHandovers: 0,
    earned: 0, spent: 0, upgrades: [], crew: [], onShift: false, shiftCallsDone: 0,
    shiftStarted: 0, call: null, callStage: 'idle', callTimer: 0, patientOnBoard: false,
    patientStable: false, triageDone: false, treatedOnScene: false, supplies: 100,
    fuel: 100, lastDay: 1, dailyCalls: 0, bestStreak: 0, streak: 0, redSaves: 0,
    greenDone: 0, nightCalls: 0, compliments: 0, complaints: 0, restocked: 0,
  };

  function refreshRank() {
    const next = hospitalRankFor(state.xp);
    if (next > state.rank) state.rank = next;
  }
  function gainXp(n) { state.xp += n; refreshRank(); }
  function fail(reason) { return { ok: false, reason }; }
  function hasUpgrade(id) { return state.upgrades.includes(id); }
  function hasMedic() { return state.crew.some((id) => { const c = HOSPITAL_CREW.find((x) => x.id === id); return c && c.role === 'medic'; }); }

  function clearCall() {
    state.call = null;
    state.callStage = 'idle';
    state.callTimer = 0;
    state.patientOnBoard = false;
    state.patientStable = false;
    state.triageDone = false;
    state.treatedOnScene = false;
  }

  function buildCall(condition, district, caller) {
    const triage = findTriage(condition.triage);
    return {
      id: `call-${getDay()}-${state.callsTaken}`,
      condition: condition.id, triage: triage.id, district: district.id,
      caller, age: 3 + Math.floor(rng() * 85),
      travelTime: hospitalTravelTime(district.id, hasUpgrade('siren')),
      timeLeft: triage.timeLimit, onTime: true,
    };
  }

  function buildGreenCall() {
    const green = HOSPITAL_CONDITIONS.filter((c) => {
      const t = findTriage(c.triage);
      return t && t.priority <= 2;
    });
    const condition = green[Math.floor(rng() * green.length)];
    const district = HOSPITAL_DISTRICTS[Math.floor(rng() * HOSPITAL_DISTRICTS.length)];
    const caller = HOSPITAL_CALLERS[Math.floor(rng() * HOSPITAL_CALLERS.length)];
    return buildCall(condition, district, caller);
  }

  function startShift() {
    if (state.onShift) return fail('already on shift');
    state.onShift = true;
    state.shiftCallsDone = 0;
    state.shiftStarted = getHour();
    state.supplies = 100;
    state.fuel = 100;
    return { ok: true };
  }

  function endShift() {
    if (!state.onShift) return fail('not on shift');
    state.onShift = false;
    const bonus = state.shiftCallsDone * 20;
    if (bonus > 0) {
      addCash(bonus);
      state.earned += bonus;
    }
    return { ok: true, calls: state.shiftCallsDone, bonus };
  }

  function newCall() {
    if (!state.onShift) return fail('not on shift');
    if (state.call) return fail('call already active');
    const condition = HOSPITAL_CONDITIONS[Math.floor(rng() * HOSPITAL_CONDITIONS.length)];
    const triage = findTriage(condition.triage);
    let call;
    if ((state.rank < 1 && triage.priority >= 3) || (state.rank < 2 && triage.id === 'red')) {
      call = buildGreenCall();
    } else {
      const district = HOSPITAL_DISTRICTS[Math.floor(rng() * HOSPITAL_DISTRICTS.length)];
      const caller = HOSPITAL_CALLERS[Math.floor(rng() * HOSPITAL_CALLERS.length)];
      call = buildCall(condition, district, caller);
    }
    state.call = call;
    state.callStage = 'dispatched';
    state.callTimer = call.timeLeft;
    state.callsTaken += 1;
    state.dailyCalls += 1;
    const hour = getHour();
    if (hour >= 22 || hour < 6) state.nightCalls += 1;
    return { ok: true, call };
  }

  function arriveScene() {
    if (!state.call) return fail('no call active');
    if (state.callStage !== 'dispatched') return fail('not dispatched');
    state.callStage = 'on-scene';
    state.fuel = Math.max(0, state.fuel - 8);
    return { ok: true, stage: 'on-scene' };
  }

  function triagePatient(levelId) {
    if (!state.call) return fail('no call active');
    if (state.callStage !== 'on-scene') return fail('not on scene');
    const level = findTriage(levelId);
    if (!level) return fail('unknown triage level');
    state.triageDone = true;
    const correctLevel = findTriage(state.call.triage);
    let correct = levelId === state.call.triage;
    if (!correct && hasUpgrade('advanced-training')) {
      if (Math.abs(level.priority - correctLevel.priority) <= 1) correct = true;
    }
    if (correct) {
      gainXp(10);
      return { ok: true, correct: true, level: levelId };
    }
    state.reputation -= 3;
    state.complaints += 1;
    return { ok: true, correct: false, picked: levelId, correctLevel: state.call.triage };
  }

  function treatOnScene() {
    if (!state.call) return fail('no call active');
    if (state.callStage !== 'on-scene') return fail('not on scene');
    if (!state.triageDone) return fail('triage not done');
    if (state.supplies < 10) return fail('not enough supplies');
    state.supplies -= 10;
    state.treatedOnScene = true;
    state.patientStable = true;
    if (hasUpgrade('oxygen')) state.patientStable = true;
    const cond = findCondition(state.call.condition);
    let treatTime = cond.treatTime;
    if (hasUpgrade('trauma-kit')) treatTime *= 0.75;
    if (hasMedic()) treatTime *= 0.9;
    gainXp(15);
    return { ok: true, treatTime: Math.round(treatTime), stable: true };
  }

  function loadPatient() {
    if (!state.call) return fail('no call active');
    if (state.callStage !== 'on-scene') return fail('not on scene');
    if (!state.triageDone) return fail('triage not done');
    if (state.patientOnBoard) return fail('patient already loaded');
    state.patientOnBoard = true;
    state.callStage = 'transport';
    return { ok: true, stage: 'transport' };
  }

  function arriveHospital(wardId) {
    if (!state.call) return fail('no call active');
    if (state.callStage !== 'transport') return fail('not transporting');
    if (!state.patientOnBoard) return fail('no patient on board');
    const ward = findWard(wardId);
    if (!ward) return fail('unknown ward');
    const cond = findCondition(state.call.condition);
    const rightWard = cond.ward === wardId;
    const pay = Math.round(hospitalPayFor(state.call, state.rank, state.upgrades) * ward.payMult * (rightWard ? 1.15 : 0.8));
    state.callsDone += 1;
    state.shiftCallsDone += 1;
    state.patientsTransported += 1;
    addCash(pay);
    state.earned += pay;
    if (rightWard) {
      if (state.call.triage === 'red') state.redSaves += 1;
      if (state.call.triage === 'green') state.greenDone += 1;
      if (state.treatedOnScene) {
        state.perfectHandovers += 1;
        state.livesSaved += 1;
        state.streak += 1;
        if (state.streak > state.bestStreak) state.bestStreak = state.streak;
        state.reputation += 4;
        state.compliments += 1;
        gainXp(30);
      } else {
        state.livesSaved += 1;
        state.streak += 1;
        if (state.streak > state.bestStreak) state.bestStreak = state.streak;
        state.reputation += 2;
        gainXp(20);
      }
    } else {
      state.streak = 0;
      state.reputation -= 2;
    }
    clearCall();
    return { ok: true, pay, rightWard, ward: wardId };
  }

  function abandonCall() {
    if (!state.call) return fail('no call active');
    state.callsFailed += 1;
    state.livesLost += 1;
    state.streak = 0;
    state.reputation -= 8;
    clearCall();
    return { ok: true };
  }

  function restock() {
    if (state.supplies >= 100) return fail('supplies already full');
    const cost = Math.ceil((100 - state.supplies) / 5);
    if (getCash() < cost) return fail('not enough cash');
    addCash(-cost);
    state.spent += cost;
    state.supplies = 100;
    state.restocked += 1;
    return { ok: true, cost };
  }

  function refuel() {
    if (state.fuel >= 100) return fail('fuel already full');
    const cost = Math.ceil((100 - state.fuel) / 10);
    if (getCash() < cost) return fail('not enough cash');
    addCash(-cost);
    state.spent += cost;
    state.fuel = 100;
    return { ok: true, cost };
  }

  function buyUpgrade(upgradeId) {
    const up = HOSPITAL_UPGRADES.find((u) => u.id === upgradeId);
    if (!up) return fail('unknown upgrade');
    if (hasUpgrade(upgradeId)) return fail('already owned');
    if (getCash() < up.cost) return fail('not enough cash');
    addCash(-up.cost);
    state.spent += up.cost;
    state.upgrades.push(upgradeId);
    gainXp(20);
    return { ok: true, id: upgradeId };
  }

  function hireCrew(crewId) {
    const c = HOSPITAL_CREW.find((x) => x.id === crewId);
    if (!c) return fail('unknown crew');
    if (state.crew.includes(crewId)) return fail('already hired');
    state.crew.push(crewId);
    return { ok: true, id: crewId };
  }

  function fireCrew(crewId) {
    if (!state.crew.includes(crewId)) return fail('not hired');
    state.crew = state.crew.filter((x) => x !== crewId);
    return { ok: true, id: crewId };
  }

  function tick(dt) {
    if (!state.call || state.callStage === 'idle') return;
    state.callTimer -= dt;
    state.call.timeLeft = Math.max(0, state.callTimer);
    const triage = findTriage(state.call.triage);
    if (!state.patientStable && triage.id === 'red' && rng() < dt * 0.05) {
      log('Patient is deteriorating, hurry.');
    }
    if (state.callTimer <= 0) {
      state.call.onTime = false;
      state.callsFailed += 1;
      if (triage.id === 'red' || triage.id === 'orange') {
        state.livesLost += 1;
        state.reputation -= 6;
        log('Call timed out, a life was lost.');
      } else {
        log('Call timed out.');
      }
      clearCall();
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyCalls = 0;
    let wages = 0;
    for (const id of state.crew) {
      const c = HOSPITAL_CREW.find((x) => x.id === id);
      if (c) wages += c.wage;
    }
    if (wages > 0) {
      addCash(-wages);
      state.spent += wages;
    }
    if (state.onShift) state.supplies = Math.min(100, state.supplies + 20);
    if (rng() < 0.3) log('Flu season notice: expect more calls today.');
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    for (const key of Object.keys(saved)) {
      if (key in state) state[key] = saved[key];
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: HOSPITAL_RANKS[state.rank].name, xp: state.xp, reputation: state.reputation,
      callsTaken: state.callsTaken, callsDone: state.callsDone, callsFailed: state.callsFailed,
      livesSaved: state.livesSaved, livesLost: state.livesLost,
      patientsTransported: state.patientsTransported, perfectHandovers: state.perfectHandovers,
      earned: Math.round(state.earned), spent: state.spent, upgrades: state.upgrades.length,
      crew: state.crew.length, onShift: state.onShift, shiftCallsDone: state.shiftCallsDone,
      callStage: state.callStage, callCondition: state.call ? state.call.condition : null,
      triage: state.call ? state.call.triage : null,
      timeLeft: Math.round(state.callTimer), supplies: Math.round(state.supplies),
      fuel: Math.round(state.fuel), bestStreak: state.bestStreak, redSaves: state.redSaves,
      nightCalls: state.nightCalls, compliments: state.compliments, complaints: state.complaints,
    };
  }

  function hudLine() {
    if (state.call) {
      const cond = findCondition(state.call.condition);
      return `${cond.name} (${state.call.triage}), ${state.callStage}, ${Math.round(state.callTimer)}s left.`;
    }
    if (state.onShift) return 'On shift, waiting for the next call.';
    return '';
  }

  function interact() {
    const pos = getPlayerPos() || {};
    const dx = (pos.x || 0) - 90;
    const dz = (pos.z || 0) - (-30);
    if (Math.sqrt(dx * dx + dz * dz) > 30) return false;
    if (!state.onShift) { startShift(); return true; }
    if (state.call && state.callStage === 'dispatched') { arriveScene(); return true; }
    if (state.call && state.callStage === 'transport') {
      const cond = findCondition(state.call.condition);
      arriveHospital(cond.ward);
      return true;
    }
    return false;
  }

  function shiftReport() {
    const crewNames = state.crew.map((id) => {
      const c = HOSPITAL_CREW.find((x) => x.id === id);
      return c ? c.name : id;
    });
    return {
      onShift: state.onShift, shiftCalls: state.shiftCallsDone, livesSaved: state.livesSaved,
      livesLost: state.livesLost, reputation: state.reputation,
      supplies: Math.round(state.supplies), fuel: Math.round(state.fuel), crew: crewNames,
    };
  }

  function wardList() {
    return HOSPITAL_WARDS.map((w) => ({ id: w.id, name: w.name, beds: w.beds, payMult: w.payMult }));
  }

  return {
    state, startShift, endShift, newCall, arriveScene, triagePatient, treatOnScene,
    loadPatient, arriveHospital, abandonCall, restock, refuel, buyUpgrade, hireCrew,
    fireCrew, tick, tickDay, serialize, deserialize, stats, hudLine, interact,
    shiftReport, wardList,
  };
}

export function createHospitalTraining(system) {
  const st = system.state;
  let learned = [];
  let drillsDone = [];
  let drillsPassed = 0;

  function fail(reason) { return { ok: false, reason }; }

  function learnProtocol(protocolId) {
    const p = HOSPITAL_PROTOCOLS.find((x) => x.id === protocolId);
    if (!p) return fail('unknown protocol');
    if (learned.includes(protocolId)) return fail('already learned');
    learned.push(protocolId);
    return { ok: true, id: protocolId, name: p.name, xp: p.xp, steps: p.steps };
  }

  function runDrill(drillId) {
    const d = HOSPITAL_DRILLS.find((x) => x.id === drillId);
    if (!d) return fail('unknown drill');
    const treated = d.patients - Math.floor(Math.random() * Math.ceil(d.patients * 0.3));
    const score = hospitalDrillScore(d.patients, treated, 60);
    const passed = treated >= Math.ceil(d.patients * 0.7);
    drillsDone.push(drillId);
    if (passed) drillsPassed += 1;
    return { ok: true, passed, score, reward: passed ? d.reward : 0 };
  }

  function protocols() {
    return HOSPITAL_PROTOCOLS.map((p) => ({ id: p.id, name: p.name, steps: p.steps, learned: learned.includes(p.id) }));
  }

  function drills() {
    return HOSPITAL_DRILLS.map((d) => ({ id: d.id, name: d.name, patients: d.patients, reward: d.reward, done: drillsDone.includes(d.id) }));
  }

  return {
    learnProtocol, runDrill, protocols, drills,
    get learned() { return [...learned]; },
    get passed() { return drillsPassed; },
    get history() { return [...drillsDone]; },
  };
}
