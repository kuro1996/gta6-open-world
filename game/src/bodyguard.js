// Solara Nights — Bodyguard / Crown Protection (Round 7b-B, fresh).
// When the rich and the reckless need to cross Solara Bay alive, they
// call Ria. A bodyguard job is a route, a client, and a list of people
// who would rather the client never arrived. Scout the route first:
// every alley has a story, every rooftop a sightline. On the walk,
// threats pop — a tailing car, a sniper glint, a crowd that closes
// in too fast — and each one is a decision: shield, divert, confront,
// or call it in and let the police earn their pay. The client has a
// nerve meter and a patience meter, and both are your problem. Get
// them there calm, on time, and unperforated, and the money is very
// good. Lose them, and the city talks for weeks.
// Pure logic: no rendering, no imports. Wired through the standard ctx
// { rng, getDay, getHour, getCash, addCash, addHeat, log, getPlayerPos,
// getSpeed } and driven by tick/tickDay from the main loop.

export const BODYGUARD_CLIENTS = [
  { id: 'mayor', name: 'Mayor Elena Ruiz', fee: 800, nerve: 50, patience: 70, risk: 4, desc: 'The mayor. Everyone has an opinion about her.' },
  { id: 'popstar', name: 'Pop Star Lulu', fee: 1200, nerve: 40, patience: 50, risk: 3, desc: 'Famous, followed, and allergic to waiting.' },
  { id: 'banker', name: 'Banker Otto Venn', fee: 950, nerve: 60, patience: 60, risk: 5, desc: 'Carries secrets worth killing for.' },
  { id: 'judge', name: 'Judge Amara Cole', fee: 1000, nerve: 70, patience: 80, risk: 5, desc: 'Sentenced half the syndicate. They remember.' },
  { id: 'chef', name: 'Chef Antoine', fee: 500, nerve: 65, patience: 75, risk: 2, desc: 'A chef with a rival who plays dirty.' },
  { id: 'heiress', name: 'Heiress Bea Sol', fee: 1100, nerve: 45, patience: 55, risk: 4, desc: 'Old money, new enemies, no fear at all.' },
  { id: 'witness', name: 'Witness K. Park', fee: 900, nerve: 30, patience: 65, risk: 5, desc: 'Testifying tomorrow. Someone wants tonight.' },
  { id: 'director', name: 'Director Femi Ojo', fee: 700, nerve: 55, patience: 70, risk: 3, desc: 'Filming on location, fans everywhere.' },
  { id: 'scientist', name: 'Dr. Ines Vale', fee: 850, nerve: 60, patience: 85, risk: 4, desc: 'A vaccine, a patent, and a bidding war.' },
  { id: 'dj', name: 'DJ Neon', fee: 600, nerve: 50, patience: 40, risk: 2, desc: 'Headlining tonight. The crowd is the threat.' },
];

export const BODYGUARD_ROUTES = [
  { id: 'marina-walk', name: 'Marina Walk', checkpoints: 5, danger: 1, timeMin: 8, desc: 'Open water on one side, cafés on the other.' },
  { id: 'downtown', name: 'Downtown Cross', checkpoints: 7, danger: 3, timeMin: 10, desc: 'Crowds, crossings, and a hundred windows.' },
  { id: 'docks', name: 'Dock Run', checkpoints: 6, danger: 4, timeMin: 9, desc: 'Containers hide everything, including people.' },
  { id: 'oldtown', name: 'Old Town Alleys', checkpoints: 6, danger: 3, timeMin: 9, desc: 'Narrow lanes, no sightlines, old grudges.' },
  { id: 'beach', name: 'Beach Promenade', checkpoints: 4, danger: 1, timeMin: 7, desc: 'Open, bright, hard to hide in.' },
  { id: 'market', name: 'Market Weave', checkpoints: 8, danger: 2, timeMin: 11, desc: 'Stalls, steam, and a thousand faces.' },
  { id: 'hill', name: 'Hill District', checkpoints: 6, danger: 2, timeMin: 10, desc: 'Quiet streets, long sightlines, good cover.' },
  { id: 'airport', name: 'Airport Run', checkpoints: 5, danger: 2, timeMin: 8, desc: 'Fast roads, cameras everywhere, one exit.' },
];

export const BODYGUARD_THREATS = [
  { id: 'tail', name: 'Tailing Car', danger: 2, spot: 0.7, desc: 'Same headlights, third turn in a row.' },
  { id: 'sniper', name: 'Sniper Glint', danger: 5, spot: 0.4, desc: 'A flash on a rooftop. Could be glass. Could not.' },
  { id: 'crowd', name: 'Closing Crowd', danger: 2, spot: 0.8, desc: 'Fans — or a mob wearing fan faces.' },
  { id: 'bomber', name: 'Suspicious Package', danger: 4, spot: 0.5, desc: 'A bag nobody owns, ticking or not.' },
  { id: 'ambush', name: 'Alley Ambush', danger: 4, spot: 0.55, desc: 'Three silhouettes, no good intentions.' },
  { id: 'paparazzi', name: 'Paparazzi Swarm', danger: 1, spot: 0.95, desc: 'Flashes everywhere. Nerve damage, not body damage.' },
  { id: 'hacker', name: 'Drone Overhead', danger: 3, spot: 0.6, desc: 'A drone matching your pace, filming everything.' },
  { id: 'insider', name: 'Insider Tip', danger: 3, spot: 0.45, desc: 'Someone on the staff sold the route.' },
  { id: 'protest', name: 'Flash Protest', danger: 2, spot: 0.75, desc: 'A march turns the corner toward you.' },
  { id: 'stalker', name: 'Lone Stalker', danger: 3, spot: 0.65, desc: 'One person, always fifty metres back.' },
];

export const BODYGUARD_TACTICS = [
  { id: 'shield', name: 'Body Shield', success: 0.75, nerve: -5, heat: 0, desc: 'Step between client and threat. Simple, brave.' },
  { id: 'divert', name: 'Divert Route', success: 0.8, nerve: -10, heat: 0, desc: 'Change the plan mid-walk. Costs time.' },
  { id: 'confront', name: 'Confront', success: 0.6, nerve: -15, heat: 1, desc: 'Walk straight at it. Scares most of them off.' },
  { id: 'callin', name: 'Call It In', success: 0.9, nerve: -5, heat: 0, desc: 'Police handle it. Slow, safe, boring.' },
  { id: 'evac', name: 'Emergency Evac', success: 0.95, nerve: -20, heat: 0, desc: 'Get the client out now. Job over, client alive.' },
  { id: 'blend', name: 'Blend In', success: 0.65, nerve: -5, heat: 0, desc: 'Disappear into the crowd. Works until it does not.' },
  { id: 'sweep', name: 'Sweep Ahead', success: 0.7, nerve: -8, heat: 0, desc: 'Check the next block before the client walks it.' },
  { id: 'decoy', name: 'Decoy Car', success: 0.85, nerve: -10, heat: 0, desc: 'A second car draws the tail away.' },
];

export const BODYGUARD_GEAR = [
  { id: 'vest', name: 'Kevlar Vest', cost: 300, desc: 'Stops the worst of it. You hope.', effect: 'armor' },
  { id: 'earpiece', name: 'Earpiece Set', cost: 180, desc: 'Hear your team: spot threats +15%.', effect: 'spot-plus' },
  { id: 'sunglasses', name: 'Tactical Shades', cost: 120, desc: 'See the glint first: sniper spot +20%.', effect: 'sniper-plus' },
  { id: 'car', name: 'Armoured Sedan', cost: 1500, desc: 'The client rides safe: nerve drains slower.', effect: 'nerve-plus' },
  { id: 'drone', name: 'Scout Drone', cost: 700, desc: 'Eyes above: scout reveals all threats.', effect: 'scout-plus' },
  { id: 'medkit', name: 'Trauma Medkit', cost: 250, desc: 'Stabilise a wounded client on the spot.', effect: 'medic' },
  { id: 'jammer', name: 'Signal Jammer', cost: 500, desc: 'Kills hostile drones and trackers.', effect: 'jammer' },
  { id: 'suit', name: 'Tailored Suit', cost: 400, desc: 'Look the part: clients trust you more.', effect: 'trust-plus' },
  { id: 'radio', name: 'Encrypted Radio', cost: 220, desc: 'Call-ins arrive twice as fast.', effect: 'callin-fast' },
  { id: 'training', name: 'Close Protection Course', cost: 800, desc: 'All tactics +10% success.', effect: 'tactics-plus' },
];

export const BODYGUARD_RANKS = [
  { level: 0, name: 'Hired Muscle', xp: 0, perk: 'Low-risk clients only.' },
  { level: 1, name: 'Close Protection', xp: 150, perk: 'Mid-risk clients, better fees.' },
  { level: 2, name: 'Trusted Guard', xp: 400, perk: 'High-risk clients, police liaison.' },
  { level: 3, name: 'Elite Detail', xp: 800, perk: 'Top fees, the mayor calls you.' },
  { level: 4, name: 'Legend of the Detail', xp: 1500, perk: 'Nobody you guard ever gets touched.' },
];

export const BODYGUARD_TEAM = [
  { id: 'ray', name: 'Ray Delgado', role: 'Driver', wage: 50, skill: 'drive', value: 0.2, desc: 'Escape driving is his love language.' },
  { id: 'nina', name: 'Nina Kaur', role: 'Scout', wage: 60, skill: 'spot', value: 0.2, desc: 'Sees the threat before it sees you.' },
  { id: 'omar', name: 'Omar Haddad', role: 'Medic', wage: 55, skill: 'medic', value: 0.25, desc: 'Keeps clients breathing, whatever happens.' },
  { id: 'june', name: 'June Park', role: 'Analyst', wage: 65, skill: 'intel', value: 0.25, desc: 'Reads the threat board like a newspaper.' },
];

export function bodyguardRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < BODYGUARD_RANKS.length; i++) {
    if (xp >= BODYGUARD_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function bodyguardSpotChance(threat, rank, gear, team) {
  let chance = threat.spot + rank * 0.05;
  if (gear.includes('earpiece')) chance += 0.15;
  if (gear.includes('sunglasses') && threat.id === 'sniper') chance += 0.2;
  if (team.includes('nina')) chance += 0.2;
  if (team.includes('june')) chance += 0.1;
  return Math.min(0.98, chance);
}

export function bodyguardTacticChance(tactic, rank, gear) {
  let chance = tactic.success + rank * 0.03;
  if (gear.includes('training')) chance += 0.1;
  if (gear.includes('radio') && tactic.id === 'callin') chance += 0.1;
  if (gear.includes('jammer') && tactic.id === 'divert') chance += 0.05;
  return Math.min(0.98, chance);
}

export function bodyguardFeeFor(client, rank, gear) {
  let fee = client.fee;
  fee *= 1 + rank * 0.1;
  if (gear.includes('suit')) fee *= 1.1;
  return Math.round(fee);
}

export function bodyguardNerveDrain(threat, gear) {
  let drain = threat.danger * 4;
  if (gear.includes('car')) drain *= 0.7;
  return Math.round(drain);
}

export function createBodyguardSystem(ctx) {
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
    jobsTaken: 0,
    jobsDone: 0,
    jobsFailed: 0,
    clientsSaved: 0,
    clientsLost: 0,
    threatsSpotted: 0,
    threatsMissed: 0,
    threatsHandled: 0,
    threatsFailed: 0,
    earned: 0,
    spent: 0,
    gear: [],
    team: [],
    reputation: 50,
    job: null,
    checkpoint: 0,
    checkpointsDone: 0,
    clientNerve: 100,
    clientPatience: 100,
    threat: null,
    threatSpotted: false,
    scouted: false,
    scoutReport: [],
    jobTimer: 0,
    lastDay: 1,
    dailyJobs: 0,
    bestStreak: 0,
    streak: 0,
    evacuations: 0,
    callins: 0,
    confrontations: 0,
    perfectJobs: 0,
    compliments: 0,
    complaints: 0,
    intel: 0,
    safehousesKnown: 0,
  };

  function refreshRank() {
    const r = bodyguardRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Bodyguard rank up: ${BODYGUARD_RANKS[r].name} — ${BODYGUARD_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function rep(delta) {
    state.reputation = Math.max(0, Math.min(100, state.reputation + delta));
  }

  function takeJob(clientId, routeId) {
    const client = BODYGUARD_CLIENTS.find((x) => x.id === clientId);
    if (!client) return { ok: false, reason: 'no-such-client' };
    const route = BODYGUARD_ROUTES.find((x) => x.id === routeId);
    if (!route) return { ok: false, reason: 'no-such-route' };
    if (state.job) return { ok: false, reason: 'job-active' };
    if (state.rank < 1 && client.risk >= 4) return { ok: false, reason: 'rank-too-low', need: 1 };
    if (state.rank < 2 && client.risk >= 5) return { ok: false, reason: 'rank-too-low', need: 2 };
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
    log(`Job taken: guard ${client.name} along ${route.name} — $${fee} if they arrive calm.`);
    return { ok: true, client: clientId, route: routeId, fee };
  }

  function scoutRoute() {
    if (!state.job) return { ok: false, reason: 'no-job' };
    if (state.scouted) return { ok: false, reason: 'already-scouted' };
    const route = BODYGUARD_ROUTES.find((x) => x.id === state.job.route);
    const count = state.gear.includes('drone') ? route.checkpoints : 1 + Math.floor(rng() * route.danger);
    const report = [];
    for (let i = 0; i < count; i++) {
      const t = BODYGUARD_THREATS[Math.floor(rng() * BODYGUARD_THREATS.length)];
      report.push({ checkpoint: 1 + Math.floor(rng() * route.checkpoints), threat: t.id, name: t.name });
    }
    state.scouted = true;
    state.scoutReport = report;
    state.intel += report.length;
    gainXp(10 * report.length);
    log(`Route scouted: ${report.length} risk point(s) flagged on ${route.name}.`);
    return { ok: true, report };
  }

  function advanceCheckpoint() {
    if (!state.job) return { ok: false, reason: 'no-job' };
    if (state.threat) return { ok: false, reason: 'threat-active' };
    const route = BODYGUARD_ROUTES.find((x) => x.id === state.job.route);
    state.checkpoint += 1;
    state.checkpointsDone += 1;
    state.clientPatience = Math.max(0, state.clientPatience - 3);
    const threatRoll = rng();
    const threatChance = 0.25 + route.danger * 0.08;
    if (threatRoll < threatChance && state.checkpoint < route.checkpoints) {
      const threat = BODYGUARD_THREATS[Math.floor(rng() * BODYGUARD_THREATS.length)];
      state.threat = threat.id;
      const spotted = rng() < bodyguardSpotChance(threat, state.rank, state.gear, state.team);
      state.threatSpotted = spotted;
      if (spotted) {
        state.threatsSpotted += 1;
        log(`Threat spotted: ${threat.name}! Choose a tactic.`);
      } else {
        state.threatsMissed += 1;
        log('Something feels wrong. Your neck itches. A threat is here — unseen.');
      }
      return { ok: true, checkpoint: state.checkpoint, threat: threat.id, spotted };
    }
    if (state.checkpoint >= route.checkpoints) {
      return finishJob(true);
    }
    return { ok: true, checkpoint: state.checkpoint, threat: null };
  }

  function handleThreat(tacticId) {
    if (!state.job) return { ok: false, reason: 'no-job' };
    if (!state.threat) return { ok: false, reason: 'no-threat' };
    const threat = BODYGUARD_THREATS.find((x) => x.id === state.threat);
    const tactic = BODYGUARD_TACTICS.find((x) => x.id === tacticId);
    if (!tactic) return { ok: false, reason: 'no-such-tactic' };
    const chance = bodyguardTacticChance(tactic, state.rank, state.gear);
    const success = rng() < chance;
    if (tacticId === 'callin') state.callins += 1;
    if (tacticId === 'confront') state.confrontations += 1;
    if (tacticId === 'evac') {
      state.evacuations += 1;
      state.threatsHandled += 1;
      state.threat = null;
      state.threatSpotted = false;
      state.clientNerve = Math.max(0, state.clientNerve + tactic.nerve);
      log('Emergency evac — client safe, job over early, fee halved.');
      return finishJob(true, 0.5);
    }
    if (success) {
      state.threatsHandled += 1;
      state.threat = null;
      state.threatSpotted = false;
      state.clientNerve = Math.max(0, state.clientNerve + tactic.nerve);
      if (tactic.heat) addHeat(tactic.heat);
      gainXp(15);
      log(`${tactic.name} worked — the ${threat.name} backs off.`);
      return { ok: true, handled: true, tactic: tacticId, threat: threat.id };
    }
    state.threatsFailed += 1;
    const drain = bodyguardNerveDrain(threat, state.gear);
    state.clientNerve = Math.max(0, state.clientNerve - drain);
    state.clientPatience = Math.max(0, state.clientPatience - 10);
    if (tactic.heat) addHeat(tactic.heat);
    log(`${tactic.name} FAILED against the ${threat.name}. The client is rattled.`);
    if (state.clientNerve <= 0) {
      return finishJob(false, 0, 'client-panicked');
    }
    return { ok: true, handled: false, tactic: tacticId, threat: threat.id, nerve: state.clientNerve };
  }

  function ignoreThreat() {
    if (!state.job || !state.threat) return { ok: false, reason: 'no-threat' };
    const threat = BODYGUARD_THREATS.find((x) => x.id === state.threat);
    const drain = bodyguardNerveDrain(threat, state.gear) + 5;
    state.clientNerve = Math.max(0, state.clientNerve - drain);
    state.threatsFailed += 1;
    log(`You walk past the ${threat.name}. The client noticed. So did it.`);
    state.threat = null;
    state.threatSpotted = false;
    if (state.clientNerve <= 0) return finishJob(false, 0, 'client-panicked');
    return { ok: true, ignored: true, nerve: state.clientNerve };
  }

  function finishJob(success, feeMult, reason) {
    const job = state.job;
    const client = BODYGUARD_CLIENTS.find((x) => x.id === job.client);
    const route = BODYGUARD_ROUTES.find((x) => x.id === job.route);
    state.job = null;
    state.threat = null;
    state.threatSpotted = false;
    if (success) {
      const mult = feeMult || 1;
      const calmBonus = state.clientNerve >= 50 ? 1.2 : 1;
      const fee = Math.round(job.fee * mult * calmBonus);
      state.jobsDone += 1;
      state.clientsSaved += 1;
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      state.earned += fee;
      addCash(fee);
      gainXp(50);
      rep(4);
      state.compliments += 1;
      if (state.threatsFailed === 0) {
        state.perfectJobs += 1;
        gainXp(25);
        log(`Flawless: ${client.name} arrives without a single scare. $${fee}.`);
      } else {
        log(`${client.name} arrives at ${route.name} — shaken but safe. $${fee}.`);
      }
      return { ok: true, done: true, fee, client: client.id };
    }
    state.jobsFailed += 1;
    state.clientsLost += 1;
    state.streak = 0;
    rep(-8);
    state.complaints += 1;
    log(`Job FAILED: ${client.name} (${reason || 'job-lost'}). The city talks for weeks.`);
    return { ok: true, done: false, reason: reason || 'job-lost' };
  }

  function abandonJob() {
    if (!state.job) return { ok: false, reason: 'no-job' };
    const client = BODYGUARD_CLIENTS.find((x) => x.id === state.job.client);
    state.job = null;
    state.threat = null;
    state.threatSpotted = false;
    state.jobsFailed += 1;
    state.streak = 0;
    rep(-5);
    log(`You walk away from ${client.name}. The agency will hear about it.`);
    return { ok: true };
  }

  function buyGear(id) {
    const g = BODYGUARD_GEAR.find((x) => x.id === id);
    if (!g) return { ok: false, reason: 'no-such-gear' };
    if (state.gear.includes(id)) return { ok: false, reason: 'already-owned' };
    if (getCash() < g.cost) return { ok: false, reason: 'not-enough-cash', cost: g.cost };
    addCash(-g.cost);
    state.spent += g.cost;
    state.gear.push(id);
    gainXp(20);
    log(`Bought ${g.name} for $${g.cost}.`);
    return { ok: true, id };
  }

  function hireTeam(id) {
    const m = BODYGUARD_TEAM.find((x) => x.id === id);
    if (!m) return { ok: false, reason: 'no-such-member' };
    if (state.team.includes(id)) return { ok: false, reason: 'already-hired' };
    state.team.push(id);
    log(`Hired ${m.name} (${m.role}) — $${m.wage}/day.`);
    return { ok: true, id };
  }

  function fireTeam(id) {
    const i = state.team.indexOf(id);
    if (i < 0) return { ok: false, reason: 'not-hired' };
    state.team.splice(i, 1);
    return { ok: true, id };
  }

  function trainSkill() {
    const cost = 100;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    gainXp(40);
    log('Close-protection drills: footwork, cover, comms. Sharper already.');
    return { ok: true, xp: 40 };
  }

  function gatherIntel() {
    const cost = 50;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.intel += 2;
    state.safehousesKnown += rng() < 0.5 ? 1 : 0;
    log('Intel bought: two fresh threat reports, one safehouse location.');
    return { ok: true, intel: state.intel };
  }

  function tick(dt) {
    if (state.job) {
      state.jobTimer -= dt;
      state.clientPatience = Math.max(0, state.clientPatience - dt * 0.05);
      if (state.threat && !state.threatSpotted && rng() < dt * 0.01) {
        const threat = BODYGUARD_THREATS.find((x) => x.id === state.threat);
        state.threatSpotted = true;
        state.threatsSpotted += 1;
        log(`There it is — the ${threat.name}, finally in the open.`);
      }
      if (state.jobTimer <= 0) {
        log('The window closed — the client missed the event. Job over.');
        finishJob(false, 0, 'too-slow');
      }
      if (state.clientPatience <= 0 && state.job) {
        log('The client loses patience and cancels on the spot.');
        finishJob(false, 0, 'client-walked');
      }
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyJobs = 0;
    let wages = 0;
    for (const id of state.team) {
      const m = BODYGUARD_TEAM.find((x) => x.id === id);
      wages += m.wage;
    }
    if (wages > 0) {
      state.spent += wages;
      addCash(-wages);
      log(`Team wages paid: $${wages}.`);
    }
    if (rng() < 0.2) {
      const client = BODYGUARD_CLIENTS[Math.floor(rng() * BODYGUARD_CLIENTS.length)];
      log(`Agency wire: ${client.name} may need a detail this week. Fees are up.`);
    }
    if (state.reputation < 30) {
      log('Agency warning: your reputation is slipping. Take clean jobs.');
    }
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, jobsTaken: state.jobsTaken,
      jobsDone: state.jobsDone, jobsFailed: state.jobsFailed,
      clientsSaved: state.clientsSaved, clientsLost: state.clientsLost,
      threatsSpotted: state.threatsSpotted,
      threatsMissed: state.threatsMissed,
      threatsHandled: state.threatsHandled,
      threatsFailed: state.threatsFailed,
      earned: state.earned, spent: state.spent,
      gear: state.gear, team: state.team,
      reputation: state.reputation, job: state.job,
      checkpoint: state.checkpoint,
      checkpointsDone: state.checkpointsDone,
      clientNerve: state.clientNerve,
      clientPatience: state.clientPatience,
      threat: state.threat, threatSpotted: state.threatSpotted,
      scouted: state.scouted, scoutReport: state.scoutReport,
      jobTimer: state.jobTimer, lastDay: state.lastDay,
      dailyJobs: state.dailyJobs, bestStreak: state.bestStreak,
      streak: state.streak, evacuations: state.evacuations,
      callins: state.callins, confrontations: state.confrontations,
      perfectJobs: state.perfectJobs,
      compliments: state.compliments, complaints: state.complaints,
      intel: state.intel, safehousesKnown: state.safehousesKnown,
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
      rank: BODYGUARD_RANKS[state.rank].name,
      xp: state.xp,
      jobsTaken: state.jobsTaken,
      jobsDone: state.jobsDone,
      jobsFailed: state.jobsFailed,
      clientsSaved: state.clientsSaved,
      clientsLost: state.clientsLost,
      threatsSpotted: state.threatsSpotted,
      threatsMissed: state.threatsMissed,
      threatsHandled: state.threatsHandled,
      threatsFailed: state.threatsFailed,
      earned: Math.round(state.earned),
      spent: state.spent,
      reputation: state.reputation,
      gear: state.gear.length,
      team: state.team.length,
      job: state.job ? state.job.client : null,
      route: state.job ? state.job.route : null,
      checkpoint: state.checkpoint,
      clientNerve: Math.round(state.clientNerve),
      clientPatience: Math.round(state.clientPatience),
      threat: state.threat,
      threatSpotted: state.threatSpotted,
      scouted: state.scouted,
      bestStreak: state.bestStreak,
      evacuations: state.evacuations,
      callins: state.callins,
      perfectJobs: state.perfectJobs,
      intel: state.intel,
      safehousesKnown: state.safehousesKnown,
    };
  }

  function hudLine() {
    if (state.job) {
      const client = BODYGUARD_CLIENTS.find((x) => x.id === state.job.client);
      const route = BODYGUARD_ROUTES.find((x) => x.id === state.job.route);
      if (state.threat) {
        const threat = BODYGUARD_THREATS.find((x) => x.id === state.threat);
        return `Guard: ${threat.name} — ${state.threatSpotted ? 'spotted, pick a tactic' : 'UNSEEN, something is wrong'}`;
      }
      return `Guard: ${client.name} — ${route.name} CP ${state.checkpoint}/${route.checkpoints}, nerve ${Math.round(state.clientNerve)}`;
    }
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearAgency = Math.hypot(pos.x - 30, pos.z - 60) < 25;
    if (!nearAgency) return false;
    if (state.job) { advanceCheckpoint(); return true; }
    return false;
  }

  function jobBoard() {
    return BODYGUARD_CLIENTS.map((cl) => ({
      id: cl.id, name: cl.name, fee: bodyguardFeeFor(cl, state.rank, state.gear),
      risk: cl.risk, nerve: cl.nerve,
    }));
  }

  function routeList() {
    return BODYGUARD_ROUTES.map((r) => ({
      id: r.id, name: r.name, checkpoints: r.checkpoints, danger: r.danger,
    }));
  }

  return {
    state, takeJob, scoutRoute, advanceCheckpoint, handleThreat,
    ignoreThreat, abandonJob, buyGear, hireTeam, fireTeam, trainSkill,
    gatherIntel, tick, tickDay, serialize, deserialize, stats, hudLine,
    interact, jobBoard, routeList,
  };
}

export const BODYGUARD_INCIDENTS = [
  { id: 'fan-rush', name: 'Fan Rush', danger: 1, desc: 'A crowd breaks the barrier for a selfie.' },
  { id: 'car-bomb', name: 'Car Bomb Scare', danger: 5, desc: 'A parked car, a wire, a very bad morning.' },
  { id: 'kidnap', name: 'Kidnap Attempt', danger: 5, desc: 'A van, a door sliding open, four hands.' },
  { id: 'heckler', name: 'Heckler', danger: 1, desc: 'Loud, drunk, harmless — probably.' },
  { id: 'press', name: 'Press Ambush', danger: 2, desc: 'Cameras and questions at the worst moment.' },
  { id: 'fire', name: 'Venue Fire', danger: 4, desc: 'Smoke in the hall. Evacuate, now.' },
];

export function bodyguardIncidentFor(day) {
  return BODYGUARD_INCIDENTS[day % BODYGUARD_INCIDENTS.length];
}

export function bodyguardThreatAssessment(routeId, rank) {
  const route = BODYGUARD_ROUTES.find((r) => r.id === routeId);
  if (!route) return { level: 'unknown', score: 0 };
  const score = route.danger * 2 - rank;
  if (score <= 1) return { level: 'low', score };
  if (score <= 4) return { level: 'moderate', score };
  if (score <= 7) return { level: 'high', score };
  return { level: 'extreme', score };
}

export function bodyguardClientTrust(reputation, jobsDone, perfectJobs) {
  const trust = reputation * 0.5 + jobsDone * 2 + perfectJobs * 5;
  return Math.round(Math.min(100, trust));
}

export function bodyguardEscapePlan(routeId, gear) {
  const route = BODYGUARD_ROUTES.find((r) => r.id === routeId);
  if (!route) return null;
  const exits = route.checkpoints >= 6 ? 3 : 2;
  const armoured = gear.includes('car');
  return { route: routeId, exits, armoured, note: armoured ? 'Armoured exit ready.' : 'On foot exits only.' };
}

export const BODYGUARD_VENUES = [
  { id: 'arena', name: 'Solara Arena', danger: 3, exits: 4, desc: 'Ten thousand seats, four exits, one stage door.' },
  { id: 'hotel', name: 'Grand Hotel', danger: 2, exits: 3, desc: 'Lobby, lifts, and a service tunnel.' },
  { id: 'casino', name: 'Crown Casino', danger: 4, exits: 2, desc: 'Cameras everywhere, cash everywhere.' },
  { id: 'studio', name: 'Film Studio', danger: 2, exits: 5, desc: 'Sets, trailers, and a hundred crew.' },
  { id: 'yacht', name: 'Yacht Marina', danger: 3, exits: 1, desc: 'One gangway. Water on every side.' },
  { id: 'court', name: 'Courthouse', danger: 4, exits: 3, desc: 'Metal detectors and very angry people.' },
  { id: 'club', name: 'Nightclub Neon', danger: 3, exits: 2, desc: 'Dark, loud, and full of strangers.' },
  { id: 'market', name: 'Night Market', danger: 2, exits: 6, desc: 'A maze of stalls and steam.' },
];

export const BODYGUARD_VEHICLES = [
  { id: 'sedan', name: 'Armoured Sedan', cost: 0, armor: 60, speed: 70, desc: 'The standard detail car.' },
  { id: 'suv', name: 'Armoured SUV', cost: 800, armor: 80, speed: 65, desc: 'Bigger, heavier, safer.' },
  { id: 'limo', name: 'Stretch Limo', cost: 1500, armor: 70, speed: 60, desc: 'Comfort and a very long target.' },
  { id: 'van', name: 'Tactical Van', cost: 1200, armor: 90, speed: 75, desc: 'Fast, armoured, anonymous.' },
  { id: 'bike', name: 'Escort Bike', cost: 400, armor: 20, speed: 95, desc: 'Fast scout, no protection at all.' },
  { id: 'heli', name: 'Helicopter', cost: 3000, armor: 50, speed: 100, desc: 'Over everything. Very visible.' },
];

export const BODYGUARD_CONVOYS = [
  { id: 'two-car', name: 'Two-Car Convoy', cars: 2, safety: 1.2, cost: 200, desc: 'Lead and follow. Simple.' },
  { id: 'three-car', name: 'Three-Car Convoy', cars: 3, safety: 1.4, cost: 400, desc: 'Decoy in the middle.' },
  { id: 'motorcade', name: 'Full Motorcade', cars: 5, safety: 1.7, cost: 900, desc: 'Bikes, cars, and a very loud siren.' },
];

export function bodyguardVenueRisk(venueId, rank) {
  const v = BODYGUARD_VENUES.find((x) => x.id === venueId);
  if (!v) return 0;
  return Math.max(1, v.danger - Math.floor(rank / 2));
}

export function bodyguardVehicleArmor(vehicleId) {
  const v = BODYGUARD_VEHICLES.find((x) => x.id === vehicleId);
  return v ? v.armor : 0;
}

export function bodyguardConvoySafety(convoyId) {
  const cv = BODYGUARD_CONVOYS.find((x) => x.id === convoyId);
  return cv ? cv.safety : 1;
}

export function createBodyguardDetail(system) {
  let vehicle = 'sedan';
  let venue = null;
  let convoy = null;
  let detailsDone = 0;

  function pickVehicle(vehicleId) {
    const v = BODYGUARD_VEHICLES.find((x) => x.id === vehicleId);
    if (!v) return { ok: false, reason: 'no-such-vehicle' };
    vehicle = vehicleId;
    return { ok: true, vehicle: vehicleId, armor: v.armor, speed: v.speed };
  }

  function pickVenue(venueId) {
    const v = BODYGUARD_VENUES.find((x) => x.id === venueId);
    if (!v) return { ok: false, reason: 'no-such-venue' };
    venue = venueId;
    const risk = bodyguardVenueRisk(venueId, system.state.rank);
    return { ok: true, venue: venueId, exits: v.exits, risk };
  }

  function pickConvoy(convoyId) {
    const cv = BODYGUARD_CONVOYS.find((x) => x.id === convoyId);
    if (!cv) return { ok: false, reason: 'no-such-convoy' };
    convoy = convoyId;
    return { ok: true, convoy: convoyId, cars: cv.cars, safety: cv.safety };
  }

  function runDetail() {
    if (!system.state.job) return { ok: false, reason: 'no-job' };
    const v = BODYGUARD_VEHICLES.find((x) => x.id === vehicle);
    const safety = bodyguardConvoySafety(convoy) * (1 + v.armor / 200);
    detailsDone += 1;
    return { ok: true, vehicle, venue, convoy, safety: Math.round(safety * 100) / 100, details: detailsDone };
  }

  function detailRecord() {
    return { vehicle, venue, convoy, detailsDone };
  }

  return { pickVehicle, pickVenue, pickConvoy, runDetail, detailRecord };
}

export const BODYGUARD_TRAINING = [
  { id: 'driving', name: 'Evasive Driving', xp: 30, cost: 150, desc: 'J-turns, rams, and getting out alive.' },
  { id: 'combat', name: 'Hand-to-Hand', xp: 30, cost: 150, desc: 'Disarm, restrain, walk away.' },
  { id: 'medic', name: 'Tactical Medicine', xp: 35, cost: 200, desc: 'Stop the bleeding, keep them breathing.' },
  { id: 'intel', name: 'Threat Analysis', xp: 25, cost: 120, desc: 'Read a room before you enter it.' },
  { id: 'comms', name: 'Comms Discipline', xp: 20, cost: 100, desc: 'Short words, clear words, no panic.' },
  { id: 'shooting', name: 'Range Time', xp: 30, cost: 180, desc: 'Accurate under pressure. Or do not shoot.' },
];

export const BODYGUARD_REPUTATION_EVENTS = [
  { id: 'saved-mayor', name: 'Saved the Mayor', rep: 15, desc: 'Front page. The agency glows.' },
  { id: 'lost-client', name: 'Lost a Client', rep: -20, desc: 'The worst day in the business.' },
  { id: 'quiet-week', name: 'Quiet Week', rep: 3, desc: 'No incidents. Boring is good.' },
  { id: 'press-praise', name: 'Press Praise', rep: 8, desc: 'A journalist saw the good work.' },
  { id: 'lawsuit', name: 'Lawsuit Threat', rep: -10, desc: 'A shoved paparazzo lawyers up.' },
  { id: 'award', name: 'Agency Award', rep: 12, desc: 'Guard of the year. A small trophy.' },
];

export function bodyguardTrainingXp(trainingId) {
  const t = BODYGUARD_TRAINING.find((x) => x.id === trainingId);
  return t ? t.xp : 0;
}

export function bodyguardRepEvent(eventId) {
  const e = BODYGUARD_REPUTATION_EVENTS.find((x) => x.id === eventId);
  return e ? e.rep : 0;
}

export function bodyguardJobDifficulty(clientRisk, routeDanger, rank) {
  const raw = clientRisk + routeDanger - rank;
  if (raw <= 2) return 'easy';
  if (raw <= 4) return 'moderate';
  if (raw <= 6) return 'hard';
  return 'extreme';
}

export function bodyguardPaycheck(jobsDone, perfectJobs, reputation) {
  const base = jobsDone * 100;
  const perfect = perfectJobs * 50;
  const repBonus = Math.round(reputation * 2);
  return base + perfect + repBonus;
}

export function bodyguardThreatIntel(threatsSpotted, threatsMissed) {
  const total = threatsSpotted + threatsMissed;
  if (total === 0) return 0;
  return Math.round((threatsSpotted / total) * 100);
}

export const BODYGUARD_TIPS = [
  { id: 'scout-first', name: 'Scout First', text: 'Walk the route before the client does.' },
  { id: 'eyes-up', name: 'Eyes Up', text: 'Rooftops first, doorways second.' },
  { id: 'calm-client', name: 'Calm Client', text: 'Your calm is their calm.' },
  { id: 'call-early', name: 'Call Early', text: 'Call it in before it becomes a problem.' },
  { id: 'never-alone', name: 'Never Alone', text: 'A detail of one is a detail of none.' },
  { id: 'exits-known', name: 'Know the Exits', text: 'Always know two ways out of every room.' },
  { id: 'nerve-watch', name: 'Watch the Nerve', text: 'A panicked client is a lost client.' },
  { id: 'debrief', name: 'Debrief', text: 'After every job, write down what went wrong.' },
];

export const BODYGUARD_AWARDS = [
  { id: 'hundred-jobs', name: 'Hundred Jobs', need: 'jobsDone', goal: 100, desc: 'Complete 100 jobs.' },
  { id: 'flawless-ten', name: 'Flawless Ten', need: 'perfectJobs', goal: 10, desc: 'Ten perfect jobs.' },
  { id: 'threat-spotter', name: 'Threat Spotter', need: 'threatsSpotted', goal: 50, desc: 'Spot 50 threats.' },
  { id: 'mayor-friend', name: 'Mayor’s Friend', need: 'reputation', goal: 90, desc: 'Reach 90 reputation.' },
  { id: 'streak-ten', name: 'Ten Streak', need: 'bestStreak', goal: 10, desc: 'Ten jobs in a row, clean.' },
];

export function bodyguardTipFor(day) {
  return BODYGUARD_TIPS[day % BODYGUARD_TIPS.length];
}

export function bodyguardAwardProgress(awardId, state) {
  const a = BODYGUARD_AWARDS.find((x) => x.id === awardId);
  if (!a) return null;
  const have = state[a.need] || 0;
  return { id: a.id, name: a.name, have, goal: a.goal, done: have >= a.goal };
}

export function bodyguardJobReadiness(gear, team, rank) {
  return gear.length * 10 + team.length * 15 + rank * 20;
}

export function bodyguardThreatLevel(threatsActive, nerve) {
  if (threatsActive === 0) return 'clear';
  if (nerve > 60) return 'watch';
  if (nerve > 30) return 'danger';
  return 'critical';
}

export function bodyguardEscapeTime(routeId, vehicleId) {
  const route = BODYGUARD_ROUTES.find((r) => r.id === routeId);
  const vehicle = BODYGUARD_VEHICLES.find((v) => v.id === vehicleId);
  if (!route || !vehicle) return 0;
  return Math.round(route.timeMin * 60 * (100 / vehicle.speed));
}

export function bodyguardClientMood(nerve, patience) {
  if (nerve > 70 && patience > 70) return 'relaxed';
  if (nerve > 40 && patience > 40) return 'nervous';
  if (nerve > 20 || patience > 20) return 'stressed';
  return 'panicking';
}

export const BODYGUARD_RECORDS = [
  { id: 'most-jobs', name: 'Most Jobs', stat: 'jobsDone', unit: 'jobs', desc: 'Most jobs completed.' },
  { id: 'most-saved', name: 'Most Saved', stat: 'clientsSaved', unit: 'clients', desc: 'Most clients kept safe.' },
  { id: 'most-perfect', name: 'Most Perfect', stat: 'perfectJobs', unit: 'jobs', desc: 'Most flawless jobs.' },
  { id: 'best-streak', name: 'Best Streak', stat: 'bestStreak', unit: 'jobs', desc: 'Longest clean streak.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money earned.' },
];

export function bodyguardRecordFor(recordId, state) {
  const r = BODYGUARD_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function bodyguardAllRecords(state) {
  return BODYGUARD_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function bodyguardSuccessRate(done, failed) {
  const total = done + failed;
  if (total === 0) return 100;
  return Math.round((done / total) * 100);
}

export function bodyguardSpotRate(spotted, missed) {
  const total = spotted + missed;
  if (total === 0) return 100;
  return Math.round((spotted / total) * 100);
}

export function bodyguardGuardGrade(done, failed, perfectJobs) {
  const rate = bodyguardSuccessRate(done, failed);
  if (rate >= 95 && perfectJobs >= 5) return 'S';
  if (rate >= 85) return 'A';
  if (rate >= 70) return 'B';
  if (rate >= 50) return 'C';
  return 'D';
}

export const BODYGUARD_SEASONAL_CLIENTS = [
  { id: 'festival-star', name: 'Festival Headliner', season: 'summer', fee: 1500, risk: 3, desc: 'The summer festival needs a detail.' },
  { id: 'new-year-mayor', name: 'New Year Mayor', season: 'winter', fee: 1200, risk: 4, desc: 'The mayor’s New Year speech.' },
  { id: 'spring-gala', name: 'Spring Gala Guest', season: 'spring', fee: 1000, risk: 2, desc: 'A gala, a gown, a guard.' },
  { id: 'autumn-director', name: 'Autumn Film Director', season: 'autumn', fee: 900, risk: 3, desc: 'Location shooting in the old town.' },
];

export function bodyguardSeasonalClient(seasonId) {
  return BODYGUARD_SEASONAL_CLIENTS.filter((x) => x.season === seasonId);
}

export function bodyguardSeasonalFee(seasonId) {
  let total = 0;
  for (const cl of bodyguardSeasonalClient(seasonId)) total += cl.fee;
  return total;
}

export function bodyguardDetailCost(team, gear, hours) {
  let cost = hours * 20;
  cost += team.length * 50;
  cost += gear.length * 10;
  return cost;
}

export const BODYGUARD_QUICK_START = [
  'Scout the route before the client walks it.',
  'Eyes up — rooftops first, doorways second.',
  'Call it in early. Police are free, funerals are not.',
  'Watch the client’s nerve, not just the threat.',
  'Buy the earpiece before the vest.',
  'Never take a job alone if you can take a team.',
];

export function bodyguardQuickStart(step) {
  return BODYGUARD_QUICK_START[step] || null;
}

export function bodyguardTotalValue(state) {
  return state.gear.length * 300 + state.team.length * 200;
}

export function bodyguardProgressPercent(state) {
  const total = state.jobsDone + state.jobsFailed;
  if (total === 0) return 0;
  return Math.round((state.jobsDone / total) * 100);
}

export function bodyguardSummary(state) {
  return `${BODYGUARD_RANKS[state.rank].name}: ${state.jobsDone} jobs, ${state.clientsSaved} saved, ${state.perfectJobs} perfect, rep ${state.reputation}.`;
}

export function bodyguardNextGoal(state) {
  if (state.jobsDone < 3) return 'Complete 3 jobs.';
  if (state.perfectJobs < 1) return 'Finish a flawless job.';
  if (state.reputation < 70) return 'Reach 70 reputation.';
  return 'Guard the mayor herself.';
}

export const BODYGUARD_META = {
  system: 'bodyguard', version: '7b-B', author: 'builder-B',
  files: 1, lines: 905, features: ['jobs', 'routes', 'threats', 'tactics', 'gear', 'team'],
};

export function bodyguardMeta() {
  return { ...BODYGUARD_META };
}

export const BODYGUARD_GEAR_GUIDE = [
  { id: 'vest', advice: 'The vest is not optional. Ever.' },
  { id: 'earpiece', advice: 'Hear the team, see the threat.' },
  { id: 'car', advice: 'An armoured car is a moving safe room.' },
  { id: 'drone', advice: 'Eyes above beat eyes on the street.' },
  { id: 'suit', advice: 'Look the part. Clients trust the suit.' },
];

export function bodyguardGearAdvice(id) {
  const g = BODYGUARD_GEAR_GUIDE.find((x) => x.id === id);
  return g ? g.advice : 'Stay sharp.';
}

export function bodyguardGearPath(budget) {
  return BODYGUARD_GEAR.filter((g) => g.cost <= budget).map((g) => g.id);
}
