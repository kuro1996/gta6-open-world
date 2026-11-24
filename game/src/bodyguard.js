// Ria works as a bodyguard for rich and at-risk clients: take a job, scout
// the route, advance checkpoint by checkpoint, spot and handle threats, and
// keep the client nerve and patience from collapsing. Context supplies rng,
// cash access, the heat adder, a logger and the player position. The day
// getter, hour getter and speed getter are present with defaults but never
// called. No weather getter exists. This is the only file that calls addHeat.
export const BODYGUARD_CLIENTS = [
  { id: 'mayor', name: 'Mayor Elena', fee: 800, nerve: 70, patience: 80, risk: 5, desc: 'The mayor, loved and hated in equal measure.' },
  { id: 'pop-star', name: 'Pop Star Lulu', fee: 600, nerve: 60, patience: 70, risk: 4, desc: 'A singer with loud fans and louder enemies.' },
  { id: 'banker', name: 'Banker Otto', fee: 500, nerve: 80, patience: 90, risk: 3, desc: 'A calm banker moving serious money.' },
  { id: 'judge', name: 'Judge Mara', fee: 550, nerve: 75, patience: 85, risk: 4, desc: 'A judge in a case nobody wants to lose.' },
  { id: 'chef-ana', name: 'Chef Ana', fee: 300, nerve: 85, patience: 90, risk: 2, desc: 'A chef with a stalker and a new restaurant.' },
  { id: 'doctor', name: 'Doctor Reyes', fee: 350, nerve: 80, patience: 85, risk: 2, desc: 'A doctor testifying against a cartel.' },
  { id: 'heir', name: 'Heir Tomas', fee: 700, nerve: 50, patience: 60, risk: 4, desc: 'A nervous heir to a shipping fortune.' },
  { id: 'reporter', name: 'Reporter Kim', fee: 400, nerve: 65, patience: 75, risk: 3, desc: 'A reporter with a story and a price on it.' },
  { id: 'diplomat', name: 'Diplomat Sara', fee: 650, nerve: 70, patience: 80, risk: 4, desc: 'A diplomat in tense negotiations.' },
  { id: 'shopkeeper', name: 'Shopkeeper Joe', fee: 150, nerve: 90, patience: 95, risk: 1, desc: 'A shopkeeper who got the wrong kind of attention.' },
];

export const BODYGUARD_ROUTES = [
  { id: 'marina-walk', name: 'Marina Walk', checkpoints: 4, danger: 2, timeMin: 20, desc: 'A short walk along the docks.' },
  { id: 'downtown', name: 'Downtown', checkpoints: 5, danger: 3, timeMin: 25, desc: 'Busy streets, many corners.' },
  { id: 'old-town', name: 'Old Town', checkpoints: 4, danger: 3, timeMin: 22, desc: 'Narrow alleys, easy to hide in.' },
  { id: 'harbour-road', name: 'Harbour Road', checkpoints: 6, danger: 4, timeMin: 30, desc: 'A long road past the containers.' },
  { id: 'hills-drive', name: 'Hills Drive', checkpoints: 5, danger: 2, timeMin: 28, desc: 'Winding roads up the hill.' },
  { id: 'beach-front', name: 'Beach Front', checkpoints: 4, danger: 2, timeMin: 18, desc: 'Open sand, nowhere to hide.' },
  { id: 'airport-run', name: 'Airport Run', checkpoints: 6, danger: 4, timeMin: 35, desc: 'A long run through traffic.' },
  { id: 'gala-night', name: 'Gala Night', checkpoints: 7, danger: 5, timeMin: 40, desc: 'The longest, most dangerous route.' },
];

export const BODYGUARD_THREATS = [
  { id: 'papparazzi', name: 'Papparazzi', danger: 2, spotChance: 0.7, desc: 'Cameras everywhere, shouting questions.' },
  { id: 'heckler', name: 'Heckler', danger: 1, spotChance: 0.8, desc: 'A loudmouth in the crowd.' },
  { id: 'stalker', name: 'Stalker', danger: 4, spotChance: 0.4, desc: 'Someone following, too close, too long.' },
  { id: 'pickpocket', name: 'Pickpocket', danger: 2, spotChance: 0.6, desc: 'Quick hands in a busy street.' },
  { id: 'protester', name: 'Protester', danger: 3, spotChance: 0.75, desc: 'A crowd with signs and anger.' },
  { id: 'tail-car', name: 'Tail Car', danger: 3, spotChance: 0.5, desc: 'A car that keeps appearing behind you.' },
  { id: 'sniper', name: 'Sniper', danger: 5, spotChance: 0.3, desc: 'A glint on a rooftop, gone in a second.' },
  { id: 'bomber', name: 'Bomber', danger: 5, spotChance: 0.35, desc: 'A bag left where it should not be.' },
  { id: 'hacker', name: 'Hacker', danger: 2, spotChance: 0.45, desc: 'Someone in the client’s phone.' },
  { id: 'hitman', name: 'Hitman', danger: 5, spotChance: 0.25, desc: 'A professional, patient and close.' },
];

export const BODYGUARD_TACTICS = [
  { id: 'evac', name: 'Emergency Evac', chance: 0.85, nerve: -15, heat: 0, desc: 'Get the client out now, job done at half fee.' },
  { id: 'confront', name: 'Confront', chance: 0.6, nerve: -10, heat: 2, desc: 'Face the threat head on.' },
  { id: 'call-in', name: 'Call In Backup', chance: 0.75, nerve: -5, heat: 0, desc: 'Radio the agency for backup.' },
  { id: 'divert', name: 'Divert Route', chance: 0.7, nerve: -8, heat: 0, desc: 'Take a different street, lose the tail.' },
  { id: 'de-escalate', name: 'De-escalate', chance: 0.65, nerve: -5, heat: 0, desc: 'Talk it down, calm the crowd.' },
  { id: 'shadow', name: 'Shadow', chance: 0.55, nerve: -6, heat: 1, desc: 'Follow the threat from a distance.' },
  { id: 'sweep', name: 'Sweep Area', chance: 0.8, nerve: -4, heat: 0, desc: 'Check the area before the client moves.' },
  { id: 'block', name: 'Body Block', chance: 0.5, nerve: -12, heat: 1, desc: 'Step between the client and danger.' },
];

export const BODYGUARD_GEAR = [
  { id: 'earpiece', name: 'Earpiece', cost: 150, desc: 'Hear the team, spot threats sooner.', effect: 'spot' },
  { id: 'sunglasses', name: 'Sniper Sunglasses', cost: 200, desc: 'Spot glints and movement faster.', effect: 'spot' },
  { id: 'armoured-car', name: 'Armoured Car', cost: 2000, desc: 'Nerve drains slower inside steel.', effect: 'protect' },
  { id: 'suit', name: 'Sharp Suit', cost: 400, desc: 'Look the part, charge more.', effect: 'fee' },
  { id: 'radio', name: 'Secure Radio', cost: 250, desc: 'Call-ins land more often.', effect: 'call' },
  { id: 'jammer', name: 'Signal Jammer', cost: 350, desc: 'Diverts work better with a jammer.', effect: 'divert' },
  { id: 'vest', name: 'Kevlar Vest', cost: 500, desc: 'A vest for the worst days.', effect: 'protect' },
  { id: 'drone', name: 'Scout Drone', cost: 600, desc: 'Scout every checkpoint from above.', effect: 'scout' },
  { id: 'medkit', name: 'Field Medkit', cost: 180, desc: 'Patch up fast on the move.', effect: 'heal' },
  { id: 'training', name: 'Training Manual', cost: 120, desc: 'Tactics work a little better.', effect: 'tactic' },
];

export const BODYGUARD_RANKS = [
  { level: 0, name: 'Rookie Guard', xp: 0, perk: 'Take low-risk jobs.' },
  { level: 1, name: 'Guard', xp: 150, perk: 'Riskier clients open up.' },
  { level: 2, name: 'Protector', xp: 400, perk: 'High-risk clients trust you.' },
  { level: 3, name: 'Elite Guard', xp: 800, perk: 'The mayor’s office calls you.' },
  { level: 4, name: 'Bay Legend', xp: 1500, perk: 'The name every client asks for.' },
];

export const BODYGUARD_TEAM = [
  { id: 'scout-sam', name: 'Sam', role: 'scout', wage: 40, skill: 'scout', value: 12, desc: 'Eyes ahead, always watching.' },
  { id: 'analyst-ana', name: 'Ana', role: 'analyst', wage: 50, skill: 'analyst', value: 10, desc: 'Reads threats before they move.' },
  { id: 'driver-dan', name: 'Dan', role: 'driver', wage: 45, skill: 'driver', value: 10, desc: 'Gets out of anywhere, fast.' },
  { id: 'medic-mia', name: 'Mia', role: 'medic', wage: 55, skill: 'medic', value: 15, desc: 'Keeps everyone standing.' },
];

export const BODYGUARD_INCIDENTS = [
  { id: 'crowd-surge', name: 'Crowd Surge', danger: 2, desc: 'A crowd presses in too close.' },
  { id: 'car-backfire', name: 'Car Backfire', danger: 1, desc: 'A bang that sounds like a shot.' },
  { id: 'lost-child', name: 'Lost Child', danger: 1, desc: 'A child separated from a parent.' },
  { id: 'protest-march', name: 'Protest March', danger: 3, desc: 'A march blocks the route.' },
  { id: 'power-cut', name: 'Power Cut', danger: 2, desc: 'The street goes dark.' },
  { id: 'bomb-scare', name: 'Bomb Scare', danger: 4, desc: 'A scare that stops the whole street.' },
];

export const BODYGUARD_VENUES = [
  { id: 'hotel', name: 'Grand Hotel', danger: 2, exits: 4, desc: 'A big hotel with many doors.' },
  { id: 'theatre', name: 'Bay Theatre', danger: 3, exits: 3, desc: 'A crowded theatre, one main door.' },
  { id: 'stadium', name: 'Stadium', danger: 4, exits: 6, desc: 'Thousands of fans, many exits.' },
  { id: 'gallery', name: 'Art Gallery', danger: 2, exits: 2, desc: 'Quiet rooms, few exits.' },
  { id: 'restaurant', name: 'Harbour Restaurant', danger: 2, exits: 3, desc: 'A busy dining room by the water.' },
  { id: 'office', name: 'Office Tower', danger: 3, exits: 2, desc: 'A tall tower, slow lifts.' },
  { id: 'club', name: 'Night Club', danger: 4, exits: 3, desc: 'Loud, dark and crowded.' },
  { id: 'park', name: 'City Park', danger: 1, exits: 5, desc: 'Open grass, easy to leave.' },
];

export const BODYGUARD_VEHICLES = [
  { id: 'sedan', name: 'Standard Sedan', cost: 0, armor: 20, speed: 60, desc: 'The agency’s everyday car.' },
  { id: 'suv', name: 'Armoured SUV', cost: 800, armor: 60, speed: 55, desc: 'Heavy, slow, very safe.' },
  { id: 'sports', name: 'Sports Car', cost: 1200, armor: 10, speed: 110, desc: 'Fast enough to outrun anything.' },
  { id: 'van', name: 'Security Van', cost: 600, armor: 45, speed: 50, desc: 'Room for the whole team.' },
  { id: 'limousine', name: 'Limousine', cost: 1500, armor: 40, speed: 65, desc: 'Comfort and steel in one car.' },
  { id: 'motorbike', name: 'Motorbike', cost: 400, armor: 0, speed: 120, desc: 'Fast and exposed.' },
];

export const BODYGUARD_CONVOYS = [
  { id: 'solo', name: 'Solo', cars: 1, safety: 1.0, cost: 0, desc: 'One car, no backup.' },
  { id: 'pair', name: 'Pair', cars: 2, safety: 1.3, cost: 100, desc: 'A lead and a follow car.' },
  { id: 'full', name: 'Full Convoy', cars: 4, safety: 1.6, cost: 300, desc: 'Four cars, the full show.' },
];

export const BODYGUARD_TRAINING = [
  { id: 'first-aid', name: 'First Aid', xp: 20, cost: 50, desc: 'Stop bleeding, save lives.' },
  { id: 'driving', name: 'Evasive Driving', xp: 30, cost: 100, desc: 'Drive out of trouble.' },
  { id: 'surveillance', name: 'Surveillance', xp: 25, cost: 80, desc: 'Spot the watcher.' },
  { id: 'negotiation', name: 'Negotiation', xp: 20, cost: 60, desc: 'Talk your way out.' },
  { id: 'combat', name: 'Close Combat', xp: 35, cost: 120, desc: 'Win the fight you cannot avoid.' },
  { id: 'planning', name: 'Route Planning', xp: 25, cost: 70, desc: 'Plan the route, plan the escape.' },
];

export const BODYGUARD_REPUTATION_EVENTS = [
  { id: 'saved-client', name: 'Saved a Client', rep: 10, desc: 'A client walked away safe.' },
  { id: 'perfect-job', name: 'Perfect Job', rep: 8, desc: 'Not a scratch, not a scare.' },
  { id: 'press-praise', name: 'Press Praise', rep: 5, desc: 'The papers liked the work.' },
  { id: 'client-lost', name: 'Client Lost', rep: -12, desc: 'A client was hurt on your watch.' },
  { id: 'panic', name: 'Client Panicked', rep: -8, desc: 'The client lost their nerve.' },
  { id: 'quiet-week', name: 'Quiet Week', rep: 2, desc: 'Nothing happened, and that is good.' },
];

export const BODYGUARD_TIPS = [
  { id: 'tip-scout', name: 'Scout First', tip: 'Scout the route before the client moves.' },
  { id: 'tip-nerve', name: 'Watch Nerve', tip: 'Every tactic costs nerve, even the good ones.' },
  { id: 'tip-evac', name: 'Evac Early', tip: 'An evac at half fee beats a failed job.' },
  { id: 'tip-heat', name: 'Mind Heat', tip: 'Loud tactics raise heat with the police.' },
  { id: 'tip-timer', name: 'Watch the Timer', tip: 'Slow jobs fail when the timer dies.' },
  { id: 'tip-patience', name: 'Client Patience', tip: 'Patience drains slowly, then all at once.' },
  { id: 'tip-gear', name: 'Buy Gear', tip: 'An earpiece spots threats before they spot you.' },
  { id: 'tip-team', name: 'Hire a Team', tip: 'A scout and an analyst change everything.' },
];

export const BODYGUARD_AWARDS = [
  { id: 'first-job', name: 'First Job', need: 'jobsDone', goal: 1, desc: 'Complete your first job.' },
  { id: 'three-jobs', name: 'Three Jobs', need: 'jobsDone', goal: 3, desc: 'Complete three jobs.' },
  { id: 'perfect-one', name: 'First Perfect', need: 'perfectJobs', goal: 1, desc: 'A perfect job, no threats failed.' },
  { id: 'spotter', name: 'Spotter', need: 'threatsSpotted', goal: 10, desc: 'Spot ten threats.' },
  { id: 'trusted', name: 'Trusted Guard', need: 'reputation', goal: 70, desc: 'Reach seventy reputation.' },
];

export const BODYGUARD_RECORDS = [
  { id: 'jobs', name: 'Jobs Done', field: 'jobsDone', unit: 'jobs', desc: 'All jobs completed.' },
  { id: 'saved', name: 'Clients Saved', field: 'clientsSaved', unit: 'clients', desc: 'All clients kept safe.' },
  { id: 'perfect', name: 'Perfect Jobs', field: 'perfectJobs', unit: 'jobs', desc: 'All perfect jobs.' },
  { id: 'spotted', name: 'Threats Spotted', field: 'threatsSpotted', unit: 'threats', desc: 'All threats spotted.' },
  { id: 'earned', name: 'Total Earned', field: 'earned', unit: 'cash', desc: 'All cash earned from guarding.' },
];

export const BODYGUARD_SEASONAL_CLIENTS = [
  { id: 'summer-star', name: 'Summer Star', season: 'summer', fee: 900, risk: 4, desc: 'A star in town for the summer.' },
  { id: 'winter-diplomat', name: 'Winter Diplomat', season: 'winter', fee: 800, risk: 4, desc: 'A diplomat for the winter talks.' },
  { id: 'spring-heir', name: 'Spring Heir', season: 'spring', fee: 750, risk: 3, desc: 'An heir visiting in spring.' },
  { id: 'autumn-judge', name: 'Autumn Judge', season: 'autumn', fee: 600, risk: 3, desc: 'A judge for the autumn session.' },
];

export const BODYGUARD_QUICK_START = [
  'Take a low-risk job and scout the route first.',
  'Advance checkpoints and watch for threats.',
  'Handle threats with the right tactic.',
  'Keep the client nerve above zero.',
  'Buy gear and hire a team as you earn.',
  'Evac early if the job turns bad.',
];

export const BODYGUARD_GEAR_GUIDE = [
  { id: 'earpiece', advice: 'An earpiece spots threats sooner, buy it first.' },
  { id: 'armoured-car', advice: 'An armoured car slows nerve drain on every job.' },
  { id: 'suit', advice: 'A sharp suit raises your fee on every client.' },
  { id: 'radio', advice: 'A secure radio makes call-ins far more reliable.' },
  { id: 'drone', advice: 'A scout drone maps every checkpoint before you walk it.' },
];

export const BODYGUARD_META = {
  system: 'bodyguard',
  version: '7b-B',
  author: 'builder-B',
  files: 1,
  lines: 905,
  features: ['jobs', 'routes', 'threats', 'tactics', 'gear', 'team'],
};

function findClient(id) { return BODYGUARD_CLIENTS.find((c) => c.id === id); }
function findRoute(id) { return BODYGUARD_ROUTES.find((r) => r.id === id); }
function findThreat(id) { return BODYGUARD_THREATS.find((t) => t.id === id); }
function findTactic(id) { return BODYGUARD_TACTICS.find((t) => t.id === id); }
function teamHasSkill(team, skill) {
  return team.some((id) => {
    const m = BODYGUARD_TEAM.find((x) => x.id === id);
    return m && m.skill === skill;
  });
}

export function bodyguardRankFor(xp) {
  let out = 0;
  for (const r of BODYGUARD_RANKS) if (xp >= r.xp) out = r.level;
  return out;
}

export function bodyguardSpotChance(threat, rank, gear, team) {
  let chance = threat.spotChance + (rank || 0) * 0.03;
  if (gear && gear.includes('earpiece')) chance += 0.1;
  if (gear && gear.includes('sunglasses')) chance += 0.08;
  if (team && teamHasSkill(team, 'scout')) chance += 0.12;
  if (team && teamHasSkill(team, 'analyst')) chance += 0.1;
  return Math.min(0.98, chance);
}

export function bodyguardTacticChance(tactic, rank, gear) {
  let chance = tactic.chance + (rank || 0) * 0.03;
  if (gear && gear.includes('training')) chance += 0.1;
  if (tactic.id === 'call-in' && gear && gear.includes('radio')) chance += 0.15;
  if (tactic.id === 'divert' && gear && gear.includes('jammer')) chance += 0.15;
  return Math.min(0.98, chance);
}

export function bodyguardFeeFor(client, rank, gear) {
  let fee = client.fee * (1 + (rank || 0) * 0.15);
  if (gear && gear.includes('suit')) fee *= 1.2;
  return Math.round(fee);
}

export function bodyguardNerveDrain(threat, gear) {
  let drain = threat.danger * 4;
  if (gear && gear.includes('armoured-car')) drain *= 0.7;
  return Math.round(drain);
}

export function bodyguardIncidentFor(day) {
  return BODYGUARD_INCIDENTS[((day % BODYGUARD_INCIDENTS.length) + BODYGUARD_INCIDENTS.length) % BODYGUARD_INCIDENTS.length];
}

export function bodyguardThreatAssessment(routeId, rank) {
  const route = findRoute(routeId);
  if (!route) return { level: 'unknown', score: 0 };
  const score = route.danger * 10 - (rank || 0) * 2;
  const level = score >= 60 ? 'extreme' : score >= 40 ? 'high' : score >= 20 ? 'moderate' : 'low';
  return { level, score };
}

export function bodyguardClientTrust(reputation, jobsDone, perfectJobs) {
  return Math.min(100, Math.round(reputation * 0.6 + jobsDone * 3 + perfectJobs * 5));
}

export function bodyguardEscapePlan(routeId, gear) {
  const route = findRoute(routeId);
  if (!route) return null;
  return {
    route: routeId, exits: route.checkpoints,
    armoured: !!(gear && gear.includes('armoured-car')),
    note: `Leave by checkpoint ${route.checkpoints}, keep the client close.`,
  };
}

export function bodyguardVenueRisk(venueId, rank) {
  const v = BODYGUARD_VENUES.find((x) => x.id === venueId);
  if (!v) return 0;
  return Math.max(1, v.danger - Math.floor((rank || 0) / 2));
}

export function bodyguardVehicleArmor(vehicleId) {
  const v = BODYGUARD_VEHICLES.find((x) => x.id === vehicleId);
  return v ? v.armor : 0;
}

export function bodyguardConvoySafety(convoyId) {
  const c = BODYGUARD_CONVOYS.find((x) => x.id === convoyId);
  return c ? c.safety : 1;
}

export function bodyguardTrainingXp(trainingId) {
  const t = BODYGUARD_TRAINING.find((x) => x.id === trainingId);
  return t ? t.xp : 0;
}

export function bodyguardRepEvent(eventId) {
  const e = BODYGUARD_REPUTATION_EVENTS.find((x) => x.id === eventId);
  return e ? e.rep : 0;
}

export function bodyguardJobDifficulty(clientRisk, routeDanger, rank) {
  const sum = clientRisk + routeDanger - (rank || 0);
  if (sum >= 10) return 'extreme';
  if (sum >= 7) return 'hard';
  if (sum >= 4) return 'moderate';
  return 'easy';
}

export function bodyguardPaycheck(jobsDone, perfectJobs, reputation) {
  return Math.round(jobsDone * 100 + perfectJobs * 50 + reputation * 2);
}

export function bodyguardThreatIntel(spotted, missed) {
  const total = spotted + missed;
  if (!total) return 0;
  return Math.round((spotted / total) * 100);
}

export function bodyguardTipFor(day) {
  return BODYGUARD_TIPS[((day % BODYGUARD_TIPS.length) + BODYGUARD_TIPS.length) % BODYGUARD_TIPS.length];
}

export function bodyguardAwardProgress(awardId, state) {
  const a = BODYGUARD_AWARDS.find((x) => x.id === awardId);
  if (!a) return null;
  const current = state[a.need] || 0;
  return { id: a.id, name: a.name, current, goal: a.goal, done: current >= a.goal };
}

export function bodyguardJobReadiness(gear, team, rank) {
  return (gear || []).length * 10 + (team || []).length * 15 + (rank || 0) * 20;
}

export function bodyguardThreatLevel(activeThreats, nerve) {
  if (nerve < 25 || activeThreats >= 3) return 'critical';
  if (nerve < 50 || activeThreats >= 2) return 'danger';
  if (activeThreats >= 1 || nerve < 75) return 'watch';
  return 'clear';
}

export function bodyguardEscapeTime(routeId, vehicleId) {
  const route = findRoute(routeId);
  const vehicle = BODYGUARD_VEHICLES.find((v) => v.id === vehicleId);
  if (!route || !vehicle) return 0;
  return Math.round((route.timeMin * 60 * 50) / vehicle.speed);
}

export function bodyguardClientMood(nerve, patience) {
  if (nerve < 30 || patience < 30) return 'panicking';
  if (nerve < 55 || patience < 55) return 'stressed';
  if (nerve < 80) return 'nervous';
  return 'relaxed';
}

export function bodyguardRecordFor(recordId, state) {
  const rec = BODYGUARD_RECORDS.find((r) => r.id === recordId);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: state[rec.field] || 0, unit: rec.unit };
}

export function bodyguardAllRecords(state) {
  return BODYGUARD_RECORDS.map((r) => ({ id: r.id, name: r.name, value: state[r.field] || 0, unit: r.unit, desc: r.desc }));
}

export function bodyguardSuccessRate(jobsDone, jobsFailed) {
  const total = jobsDone + jobsFailed;
  if (!total) return 100;
  return Math.round((jobsDone / total) * 100);
}

export function bodyguardSpotRate(spotted, missed) {
  const total = spotted + missed;
  if (!total) return 100;
  return Math.round((spotted / total) * 100);
}

export function bodyguardGuardGrade(jobsDone, jobsFailed, perfectJobs) {
  const rate = bodyguardSuccessRate(jobsDone, jobsFailed);
  if (jobsDone >= 10 && jobsFailed === 0 && perfectJobs >= 5) return 'S';
  if (rate >= 80) return 'A';
  if (rate >= 60) return 'B';
  if (rate >= 40) return 'C';
  return 'D';
}

export function bodyguardSeasonalClient(seasonId) {
  return BODYGUARD_SEASONAL_CLIENTS.filter((c) => c.season === seasonId);
}

export function bodyguardSeasonalFee(seasonId) {
  return bodyguardSeasonalClient(seasonId).reduce((s, c) => s + c.fee, 0);
}

export function bodyguardDetailCost(team, gear, hours) {
  return hours * 20 + (team || []).length * 50 + (gear || []).length * 10;
}

export function bodyguardQuickStart(step) {
  if (step < 0 || step >= BODYGUARD_QUICK_START.length) return null;
  return BODYGUARD_QUICK_START[step];
}

export function bodyguardTotalValue(state) {
  return state.gear.length * 300 + state.team.length * 200;
}

export function bodyguardProgressPercent(state) {
  const total = state.jobsDone + state.jobsFailed;
  if (!total) return 0;
  return Math.round((state.jobsDone / total) * 1000) / 10;
}

export function bodyguardSummary(state) {
  const rankName = BODYGUARD_RANKS[state.rank].name;
  return `${rankName} Ria finished ${state.jobsDone} jobs, saved ${state.clientsSaved} clients, ${state.perfectJobs} perfect, reputation ${state.reputation}.`;
}

export function bodyguardNextGoal(state) {
  if (state.jobsDone < 3) return 'Complete 3 jobs to hit your first goal.';
  if (state.perfectJobs < 1) return 'Finish a perfect job to hit your next goal.';
  if (state.reputation < 70) return 'Reach 70 reputation to hit your next goal.';
  return 'Guard the mayor to hit your final goal.';
}

export function bodyguardMeta() {
  return { ...BODYGUARD_META, features: [...BODYGUARD_META.features] };
}

export function bodyguardGearAdvice(gearId) {
  const g = BODYGUARD_GEAR_GUIDE.find((x) => x.id === gearId);
  return g ? g.advice : 'Stay sharp, watch the crowd and keep the client close.';
}

export function bodyguardGearPath(budget) {
  return BODYGUARD_GEAR.filter((g) => g.cost <= budget).map((g) => g.id);
}

export function createBodyguardSystem(ctx) {
  const {
    rng = Math.random,
    getDay = () => 1,
    getHour = () => 12,
    getCash = () => 0,
    addCash = () => {},
    addHeat = () => {},
    getSpeed = () => 0,
    log = () => {},
    getPlayerPos = () => ({ x: 0, y: 0, z: 0 }),
  } = ctx || {};

  const state = {
    xp: 0, rank: 0, jobsTaken: 0, jobsDone: 0, jobsFailed: 0, clientsSaved: 0,
    clientsLost: 0, threatsSpotted: 0, threatsMissed: 0, threatsHandled: 0,
    threatsFailed: 0, earned: 0, spent: 0, gear: [], team: [], reputation: 50,
    job: null, checkpoint: 0, checkpointsDone: 0, clientNerve: 100,
    clientPatience: 100, threat: null, threatSpotted: false, scouted: false,
    scoutReport: [], jobTimer: 0, lastDay: 1, dailyJobs: 0, bestStreak: 0,
    streak: 0, evacuations: 0, callIns: 0, confrontations: 0, perfectJobs: 0,
    compliments: 0, complaints: 0, intel: 0, safehousesKnown: 0,
  };

  function refreshRank() {
    const next = bodyguardRankFor(state.xp);
    if (next > state.rank) state.rank = next;
  }
  function gainXp(n) { state.xp += n; refreshRank(); }
  function fail(reason) { return { ok: false, reason }; }

  function finishJob(success, mult, reason) {
    const job = state.job;
    if (success) {
      const calm = state.clientNerve >= 50 ? 1.2 : 1;
      const fee = Math.round(job.fee * (mult || 1) * calm);
      state.jobsDone += 1;
      state.clientsSaved += 1;
      state.streak += 1;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
      addCash(fee);
      state.earned += fee;
      gainXp(50);
      state.reputation += 4;
      state.compliments += 1;
      if (state.threatsFailed === 0) {
        state.perfectJobs += 1;
        gainXp(25);
      }
      state.job = null;
      state.threat = null;
      state.threatSpotted = false;
      return { done: true, fee };
    }
    state.jobsFailed += 1;
    state.clientsLost += 1;
    state.streak = 0;
    state.reputation -= 8;
    state.complaints += 1;
    state.job = null;
    state.threat = null;
    state.threatSpotted = false;
    return { done: false, reason: reason || 'job failed' };
  }

  function takeJob(clientId, routeId) {
    const client = findClient(clientId);
    if (!client) return fail('unknown client');
    const route = findRoute(routeId);
    if (!route) return fail('unknown route');
    if (state.job) return fail('job already active');
    if (client.risk >= 4 && state.rank < 1) return fail('rank too low for this client');
    if (client.risk >= 5 && state.rank < 2) return fail('rank too low for this client');
    const fee = bodyguardFeeFor(client, state.rank, state.gear);
    state.job = { client: clientId, route: routeId, fee };
    state.checkpoint = 0;
    state.checkpointsDone = 0;
    state.clientNerve = client.nerve;
    state.clientPatience = client.patience;
    state.threat = null;
    state.threatSpotted = false;
    state.scouted = false;
    state.scoutReport = [];
    state.jobTimer = route.timeMin * 60;
    state.jobsTaken += 1;
    state.dailyJobs += 1;
    return { ok: true, client: clientId, route: routeId, fee };
  }

  function scoutRoute() {
    if (!state.job) return fail('no job active');
    if (state.scouted) return fail('already scouted');
    const route = findRoute(state.job.route);
    const count = state.gear.includes('drone') ? route.checkpoints : 1 + Math.floor(rng() * route.danger);
    const report = [];
    for (let i = 0; i < count; i++) {
      const threat = BODYGUARD_THREATS[Math.floor(rng() * BODYGUARD_THREATS.length)];
      report.push({ checkpoint: i + 1, threat: threat.id });
    }
    state.scoutReport = report;
    state.scouted = true;
    state.intel += report.length;
    gainXp(10 * report.length);
    return { ok: true, report };
  }

  function advanceCheckpoint() {
    if (!state.job) return fail('no job active');
    if (state.threat) return fail('threat active, handle it first');
    const route = findRoute(state.job.route);
    state.checkpoint += 1;
    state.checkpointsDone += 1;
    state.clientPatience -= 3;
    if (state.checkpoint < route.checkpoints) {
      const chance = 0.25 + route.danger * 0.08;
      if (rng() < chance) {
        const threat = BODYGUARD_THREATS[Math.floor(rng() * BODYGUARD_THREATS.length)];
        const spotted = rng() < bodyguardSpotChance(threat, state.rank, state.gear, state.team);
        if (spotted) state.threatsSpotted += 1;
        else state.threatsMissed += 1;
        state.threat = threat.id;
        state.threatSpotted = spotted;
        return { ok: true, checkpoint: state.checkpoint, threat: threat.id, spotted };
      }
      return { ok: true, checkpoint: state.checkpoint, threat: null };
    }
    return finishJob(true, 1);
  }

  function handleThreat(tacticId) {
    if (!state.job) return fail('no job active');
    if (!state.threat) return fail('no threat active');
    const tactic = findTactic(tacticId);
    if (!tactic) return fail('unknown tactic');
    const threat = findThreat(state.threat);
    if (tacticId === 'call-in') state.callIns += 1;
    if (tacticId === 'confront') state.confrontations += 1;
    if (tacticId === 'evac') {
      state.evacuations += 1;
      state.threatsHandled += 1;
      state.threat = null;
      state.threatSpotted = false;
      state.clientNerve += tactic.nerve;
      return finishJob(true, 0.5);
    }
    const chance = bodyguardTacticChance(tactic, state.rank, state.gear);
    if (rng() < chance) {
      state.threatsHandled += 1;
      state.threat = null;
      state.threatSpotted = false;
      state.clientNerve += tactic.nerve;
      if (tactic.heat) addHeat(tactic.heat);
      gainXp(15);
      return { ok: true, handled: true, tactic: tacticId, threat: threat.id, nerve: state.clientNerve };
    }
    state.threatsFailed += 1;
    state.clientNerve -= bodyguardNerveDrain(threat, state.gear);
    state.clientPatience -= 10;
    if (tactic.heat) addHeat(tactic.heat);
    if (state.clientNerve <= 0) return finishJob(false, 1, 'client panicked');
    return { ok: true, handled: false, tactic: tacticId, threat: threat.id, nerve: state.clientNerve };
  }

  function ignoreThreat() {
    if (!state.job) return fail('no job active');
    if (!state.threat) return fail('no threat active');
    const threat = findThreat(state.threat);
    state.clientNerve -= bodyguardNerveDrain(threat, state.gear) + 5;
    state.threatsFailed += 1;
    state.threat = null;
    state.threatSpotted = false;
    if (state.clientNerve <= 0) return finishJob(false, 1, 'client panicked');
    return { ok: true, ignored: true, nerve: state.clientNerve };
  }

  function abandonJob() {
    if (!state.job) return fail('no job active');
    state.job = null;
    state.threat = null;
    state.threatSpotted = false;
    state.jobsFailed += 1;
    state.streak = 0;
    state.reputation -= 5;
    return { ok: true };
  }

  function buyGear(gearId) {
    const g = BODYGUARD_GEAR.find((x) => x.id === gearId);
    if (!g) return fail('unknown gear');
    if (state.gear.includes(gearId)) return fail('already owned');
    if (getCash() < g.cost) return fail('not enough cash');
    addCash(-g.cost);
    state.spent += g.cost;
    state.gear.push(gearId);
    gainXp(20);
    return { ok: true, id: gearId };
  }

  function hireTeam(memberId) {
    const m = BODYGUARD_TEAM.find((x) => x.id === memberId);
    if (!m) return fail('unknown team member');
    if (state.team.includes(memberId)) return fail('already hired');
    state.team.push(memberId);
    return { ok: true, id: memberId };
  }

  function fireTeam(memberId) {
    if (!state.team.includes(memberId)) return fail('not hired');
    state.team = state.team.filter((x) => x !== memberId);
    return { ok: true, id: memberId };
  }

  function trainSkill() {
    if (getCash() < 100) return fail('not enough cash');
    addCash(-100);
    state.spent += 100;
    gainXp(40);
    return { ok: true, xp: 40 };
  }

  function gatherIntel() {
    if (getCash() < 50) return fail('not enough cash');
    addCash(-50);
    state.spent += 50;
    state.intel += 2;
    if (rng() < 0.3) state.safehousesKnown += 1;
    return { ok: true, intel: state.intel };
  }

  function tick(dt) {
    if (!state.job) return;
    state.jobTimer -= dt;
    state.clientPatience -= dt * 0.1;
    if (state.threat && !state.threatSpotted && rng() < dt * 0.02) {
      state.threatSpotted = true;
      state.threatsSpotted += 1;
      log('Spotted the threat late, it is still there.');
    }
    if (state.jobTimer <= 0 && state.job) {
      finishJob(false, 1, 'too slow');
      return;
    }
    if (state.clientPatience <= 0 && state.job) {
      finishJob(false, 1, 'client walked');
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyJobs = 0;
    let wages = 0;
    for (const id of state.team) {
      const m = BODYGUARD_TEAM.find((x) => x.id === id);
      if (m) wages += m.wage;
    }
    if (wages > 0) {
      addCash(-wages);
      state.spent += wages;
    }
    if (rng() < 0.4) {
      const client = BODYGUARD_CLIENTS[Math.floor(rng() * BODYGUARD_CLIENTS.length)];
      log(`Agency wire: ${client.name} may need a guard soon.`);
    }
    if (state.reputation < 30) log('Reputation warning: clients are talking.');
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
      rank: BODYGUARD_RANKS[state.rank].name, xp: state.xp, jobsTaken: state.jobsTaken,
      jobsDone: state.jobsDone, jobsFailed: state.jobsFailed,
      clientsSaved: state.clientsSaved, clientsLost: state.clientsLost,
      threatsSpotted: state.threatsSpotted, threatsMissed: state.threatsMissed,
      threatsHandled: state.threatsHandled, threatsFailed: state.threatsFailed,
      earned: Math.round(state.earned), spent: state.spent, reputation: state.reputation,
      gear: state.gear.length, team: state.team.length,
      jobClient: state.job ? state.job.client : null,
      route: state.job ? state.job.route : null,
      checkpoint: state.checkpoint, clientNerve: Math.round(state.clientNerve),
      clientPatience: Math.round(state.clientPatience), threat: state.threat,
      threatSpotted: state.threatSpotted, scouted: state.scouted,
      bestStreak: state.bestStreak, evacuations: state.evacuations,
      callIns: state.callIns, perfectJobs: state.perfectJobs, intel: state.intel,
      safehousesKnown: state.safehousesKnown,
    };
  }

  function hudLine() {
    if (state.job && state.threat) {
      const threat = findThreat(state.threat);
      return state.threatSpotted
        ? `Threat spotted: ${threat.name}, pick a tactic.`
        : `Unseen threat nearby, ${threat.name} may be watching.`;
    }
    if (state.job) {
      const client = findClient(state.job.client);
      const route = findRoute(state.job.route);
      return `${client.name} on ${route.name}: checkpoint ${state.checkpoint}/${route.checkpoints}, nerve ${Math.round(state.clientNerve)}.`;
    }
    return '';
  }

  function interact() {
    const pos = getPlayerPos() || {};
    const dx = (pos.x || 0) - (-30);
    const dz = (pos.z || 0) - (-60);
    if (Math.sqrt(dx * dx + dz * dz) > 25) return false;
    if (state.job) { advanceCheckpoint(); return true; }
    return false;
  }

  function jobBoard() {
    return BODYGUARD_CLIENTS.map((c) => ({
      id: c.id, name: c.name, fee: bodyguardFeeFor(c, state.rank, state.gear),
      risk: c.risk, nerve: c.nerve,
    }));
  }

  function routeList() {
    return BODYGUARD_ROUTES.map((r) => ({
      id: r.id, name: r.name, checkpoints: r.checkpoints, danger: r.danger,
    }));
  }

  return {
    state, takeJob, scoutRoute, advanceCheckpoint, handleThreat, ignoreThreat,
    abandonJob, buyGear, hireTeam, fireTeam, trainSkill, gatherIntel, tick, tickDay,
    serialize, deserialize, stats, hudLine, interact, jobBoard, routeList,
  };
}

export function createBodyguardDetail(system) {
  const st = system.state;
  let vehicle = 'sedan';
  let venue = null;
  let convoy = null;
  let detailsDone = 0;

  function fail(reason) { return { ok: false, reason }; }

  function pickVehicle(vehicleId) {
    const v = BODYGUARD_VEHICLES.find((x) => x.id === vehicleId);
    if (!v) return fail('unknown vehicle');
    vehicle = vehicleId;
    return { ok: true, vehicle: vehicleId, armor: v.armor, speed: v.speed };
  }

  function pickVenue(venueId) {
    const v = BODYGUARD_VENUES.find((x) => x.id === venueId);
    if (!v) return fail('unknown venue');
    venue = venueId;
    return { ok: true, venue: venueId, exits: v.exits, risk: bodyguardVenueRisk(venueId, st.rank) };
  }

  function pickConvoy(convoyId) {
    const c = BODYGUARD_CONVOYS.find((x) => x.id === convoyId);
    if (!c) return fail('unknown convoy');
    convoy = convoyId;
    return { ok: true, convoy: convoyId, cars: c.cars, safety: c.safety };
  }

  function runDetail() {
    if (!st.job) return fail('no job active');
    const armor = bodyguardVehicleArmor(vehicle);
    const safety = Math.round(bodyguardConvoySafety(convoy) * (1 + armor / 200) * 100) / 100;
    detailsDone += 1;
    return { ok: true, vehicle, venue, convoy, safety, details: detailsDone };
  }

  function detailRecord() {
    return { vehicle, venue, convoy, detailsDone };
  }

  return { pickVehicle, pickVenue, pickConvoy, runDetail, detailRecord };
}
