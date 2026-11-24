// Solara Nights — Jet Ski Racing (Round 7b-B, written fresh).
// Dawn on Solara Bay: the water is glass, the buoys are out, and the
// two-stroke scream of a jet ski is the best alarm clock in the city.
// Buy a ski, tune the impeller, and race buoy courses against the
// clock and against rivals who will absolutely try to roost you in
// the turns. Waves are not decoration — a big set can launch you,
// and a bad landing costs speed, style points and sometimes the whole
// race. Tricks off the wake build a combo; freestyle spots pay for
// airtime; the Bay Championship pays for everything. Salt water eats
// engines, so rinse, repair, repeat — and watch the fuel gauge, the
// bay is bigger than it looks.
// Pure logic: no rendering, no imports. Wired through the standard ctx
// { rng, getDay, getHour, getCash, addCash, addHeat, log, getPlayerPos,
// getSpeed } and driven by tick/tickDay from the main loop.

export const JETSKI_MODELS = [
  { id: 'dolphin', name: 'Dolphin 90', cost: 0, topSpeed: 58, accel: 60, handling: 65, stability: 70, fuel: 100, desc: 'The rental fleet survivor. Slow, steady, free.' },
  { id: 'wave', name: 'WaveRunner 130', cost: 400, topSpeed: 72, accel: 70, handling: 70, stability: 68, fuel: 110, desc: 'The bay favourite. Honest speed.' },
  { id: 'spark', name: 'Spark 150', cost: 900, topSpeed: 84, accel: 82, handling: 78, stability: 62, fuel: 100, desc: 'Light, loud, and quick out of the hole.' },
  { id: 'ultra', name: 'Ultra 260', cost: 1700, topSpeed: 96, accel: 80, handling: 74, stability: 66, fuel: 120, desc: 'Supercharged. Drinks fuel, eats buoys.' },
  { id: 'standup', name: 'Stand-Up Pro', cost: 1300, topSpeed: 88, accel: 88, handling: 95, stability: 40, desc: 'No seat. All skill. Huge tricks.' },
  { id: 'tourer', name: 'Tourer 180', cost: 1100, topSpeed: 76, accel: 65, handling: 68, stability: 88, fuel: 160, desc: 'Comfort, range, and a dry box for lunch.' },
  { id: 'race', name: 'Race Factory 300', cost: 3200, topSpeed: 108, accel: 90, handling: 82, stability: 60, fuel: 110, desc: 'The factory race ski. Wins championships.' },
  { id: 'vintage', name: 'Vintage 550', cost: 650, topSpeed: 64, accel: 75, handling: 80, stability: 55, fuel: 90, desc: 'Two-stroke smoke and seventies style.' },
];

export const JETSKI_COURSES = [
  { id: 'marina-slalom', name: 'Marina Slalom', buoys: 10, laps: 3, difficulty: 1, parTime: 160, prize: 140, desc: 'Gentle turns between the yachts.' },
  { id: 'buoy-bay', name: 'Buoy Bay', buoys: 12, laps: 3, difficulty: 2, parTime: 180, prize: 220, desc: 'The classic bay circuit.' },
  { id: 'surf-break', name: 'Surf Break', buoys: 9, laps: 3, difficulty: 3, parTime: 170, prize: 300, desc: 'Real waves. Real airtime. Real risk.' },
  { id: 'harbor-sprint', name: 'Harbor Sprint', buoys: 8, laps: 4, difficulty: 2, parTime: 150, prize: 260, desc: 'Short, sharp, flat-out drag.' },
  { id: 'island-loop', name: 'Island Loop', buoys: 14, laps: 2, difficulty: 3, parTime: 200, prize: 420, desc: 'Around the island, wind on the far side.' },
  { id: 'night-glow', name: 'Night Glow', buoys: 11, laps: 3, difficulty: 3, parTime: 185, prize: 380, desc: 'Lit buoys after dark. Beautiful, blind.' },
  { id: 'storm-run', name: 'Storm Run', buoys: 13, laps: 2, difficulty: 5, parTime: 210, prize: 700, desc: 'Only run when the weather turns.' },
  { id: 'crown-bay', name: 'Crown Bay GP', buoys: 16, laps: 3, difficulty: 5, parTime: 250, prize: 1000, desc: 'The championship course. Everything at once.' },
];

export const JETSKI_TRICKS = [
  { id: 'jump', name: 'Wake Jump', points: 100, risk: 0.08, desc: 'Catch the wake and fly.' },
  { id: 'spin', name: '360 Spin', points: 180, risk: 0.18, desc: 'Full spin in the air, land straight.' },
  { id: 'barrel', name: 'Barrel Roll', points: 240, risk: 0.26, desc: 'Over the top. The crowd holds its breath.' },
  { id: 'sub', name: 'Submarine', points: 160, risk: 0.2, desc: 'Nose under, pop back up, soaked and smiling.' },
  { id: 'nose', name: 'Nose Stand', points: 140, risk: 0.14, desc: 'Stand it on the nose at speed.' },
  { id: 'backflip', name: 'Backflip', points: 320, risk: 0.35, desc: 'The one everyone films.' },
  { id: 'butterfly', name: 'Butterfly', points: 200, risk: 0.22, desc: 'Legs out, arms wide, total control.' },
  { id: 'donut', name: 'Power Donut', points: 120, risk: 0.1, desc: 'Spin in place, spray everywhere.' },
  { id: 'air-roll', name: 'Air Roll', points: 260, risk: 0.3, desc: 'Roll off a wave crest, land clean.' },
  { id: 'tail', name: 'Tail Stand', points: 150, risk: 0.16, desc: 'Ride the tail, nose to the sky.' },
];

export const JETSKI_PARTS = [
  { id: 'impeller-1', name: 'Sport Impeller', cost: 200, slot: 'impeller', speed: 6, accel: 6, handling: 0, desc: '+6 speed, +6 accel.' },
  { id: 'impeller-2', name: 'Race Impeller', cost: 500, slot: 'impeller', speed: 12, accel: 10, handling: 2, desc: '+12 speed, +10 accel.' },
  { id: 'impeller-3', name: 'Pro Impeller', cost: 950, slot: 'impeller', speed: 20, accel: 14, handling: 4, desc: '+20 speed, +14 accel.' },
  { id: 'sponsons', name: 'Race Sponsons', cost: 260, slot: 'sponsons', speed: 2, accel: 0, handling: 10, desc: '+10 handling in the turns.' },
  { id: 'plate', name: 'Ride Plate', cost: 320, slot: 'plate', speed: 5, accel: 2, handling: 4, desc: '+5 speed, planted at full throttle.' },
  { id: 'intake', name: 'Intake Grate', cost: 180, slot: 'intake', speed: 3, accel: 4, handling: 3, desc: 'Hooks up in chop instead of cavitating.' },
  { id: 'exhaust', name: 'Free-Flow Exhaust', cost: 420, slot: 'exhaust', speed: 8, accel: 8, handling: -2, desc: '+8 speed, louder than the law likes.' },
  { id: 'tank', name: 'Aux Fuel Tank', cost: 240, slot: 'tank', speed: 0, accel: -2, handling: 0, fuel: 50, desc: '+50 fuel range.' },
  { id: 'hull', name: 'Reinforced Hull', cost: 380, slot: 'hull', speed: 0, accel: 0, handling: 2, stability: 20, desc: '+20 stability, survives bad landings.' },
  { id: 'seat', name: 'Race Seat', cost: 150, slot: 'seat', speed: 0, accel: 3, handling: 5, desc: 'Grip where it counts.' },
];

export const JETSKI_RIVALS = [
  { id: 'salty', name: 'Salty Sam', skill: 58, style: 'steady', taunt: 'The bay is mine, kid.' },
  { id: 'marina', name: 'Marina', skill: 70, style: 'technical', taunt: 'Lines, not noise, win races.' },
  { id: 'jet', name: 'Jet Li', skill: 78, style: 'aggressive', taunt: 'Eat my roost.' },
  { id: 'coral', name: 'Coral', skill: 85, style: 'technical', taunt: 'I know every wave on this bay.' },
  { id: 'tide', name: 'Tide Turner', skill: 91, style: 'aggressive', taunt: 'Champion two years running. Good luck.' },
  { id: 'grom', name: 'Grom', skill: 52, style: 'wild', taunt: 'I crash fast and I crash often!' },
];

export const JETSKI_LEAGUES = [
  { id: 'rookie', name: 'Rookie Splash', minRank: 0, entry: 0, races: 3, prize: 500, desc: 'Learn the buoys, win a little.' },
  { id: 'club', name: 'Bay Club Series', minRank: 1, entry: 120, races: 4, prize: 1100, desc: 'Real racers, real money.' },
  { id: 'pro', name: 'Pro Tour', minRank: 2, entry: 350, races: 5, prize: 2800, desc: 'Sponsors watching. No mistakes.' },
  { id: 'crown', name: 'Crown Bay Championship', minRank: 3, entry: 900, races: 6, prize: 7500, desc: 'The title. The money. The crown.' },
];

export const JETSKI_RANKS = [
  { level: 0, name: 'Dock Rat', xp: 0, perk: 'Rookie league open.' },
  { level: 1, name: 'Bay Rider', xp: 150, perk: 'Club series open, +5% prize.' },
  { level: 2, name: 'Wave Regular', xp: 400, perk: 'Pro tour open, +10% prize.' },
  { level: 3, name: 'Pro Racer', xp: 800, perk: 'Crown championship open, +15% prize.' },
  { level: 4, name: 'King of the Bay', xp: 1500, perk: '+25% prize, rivals fear you.' },
];

export const JETSKI_SPONSORS = [
  { id: 'waveco', name: 'WaveCo', pay: 150, need: 'races', goal: 5, desc: '$150 per 5 races ridden.' },
  { id: 'saltlife', name: 'Salt Life', pay: 200, need: 'tricks', goal: 20, desc: '$200 per 20 tricks landed.' },
  { id: 'bayfm', name: 'Bay FM', pay: 300, need: 'wins', goal: 3, desc: '$300 per 3 race wins.' },
  { id: 'suncream', name: 'SunCream Co', pay: 500, need: 'titles', goal: 1, desc: '$500 per league title.' },
];

export const JETSKI_WEATHER = [
  { id: 'glass', name: 'Glass Flat', speed: 1.05, risk: 0.8, desc: 'Perfect water, fast times.' },
  { id: 'chop', name: 'Light Chop', speed: 1.0, risk: 1.0, desc: 'Normal bay conditions.' },
  { id: 'waves', name: 'Big Swell', speed: 0.95, risk: 1.3, desc: 'Great air, hard landings.' },
  { id: 'storm', name: 'Storm Surge', speed: 0.9, risk: 1.6, desc: 'Only the brave launch.' },
  { id: 'fog', name: 'Sea Fog', speed: 0.92, risk: 1.2, desc: 'Buoys appear late. Trust the GPS.' },
];

export function jetskiRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < JETSKI_RANKS.length; i++) {
    if (xp >= JETSKI_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function jetskiStatsFor(model, parts) {
  const base = JETSKI_MODELS.find((m) => m.id === model) || JETSKI_MODELS[0];
  const out = { topSpeed: base.topSpeed, accel: base.accel, handling: base.handling, stability: base.stability, fuel: base.fuel };
  for (const p of JETSKI_PARTS) {
    if (!parts.includes(p.id)) continue;
    out.topSpeed += p.speed || 0;
    out.accel += p.accel || 0;
    out.handling += p.handling || 0;
    if (p.stability) out.stability += p.stability;
    if (p.fuel) out.fuel += p.fuel;
  }
  out.topSpeed = Math.max(30, out.topSpeed);
  out.accel = Math.max(10, Math.min(120, out.accel));
  out.handling = Math.max(10, Math.min(120, out.handling));
  out.stability = Math.max(20, Math.min(130, out.stability));
  out.fuel = Math.max(50, out.fuel);
  return out;
}

export function jetskiRaceTime(course, skiStats, weather, rng) {
  const base = course.parTime;
  const speedFactor = 100 / skiStats.topSpeed;
  const handlingFactor = 1 + (80 - skiStats.handling) / 500;
  const wobble = 0.94 + rng() * 0.12;
  return Math.round(base * speedFactor * handlingFactor * wobble * weather.speed * 10) / 10;
}

export function jetskiRivalTime(rival, course, rng) {
  const base = course.parTime;
  const skillFactor = 1.25 - rival.skill / 100;
  const wobble = 0.95 + rng() * 0.1;
  return Math.round(base * skillFactor * wobble * 10) / 10;
}

export function jetskiPrizeFor(course, rank, place) {
  const rankBonus = 1 + rank * 0.05;
  const placeMult = place === 1 ? 1 : place === 2 ? 0.5 : place === 3 ? 0.25 : 0.1;
  return Math.round(course.prize * rankBonus * placeMult);
}

export function createJetskiSystem(ctx) {
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
    owned: ['dolphin'],
    activeSki: 'dolphin',
    parts: [],
    installed: {},
    racesRidden: 0,
    wins: 0,
    podiums: 0,
    bestTimes: {},
    totalTricks: 0,
    tricksLanded: 0,
    crashes: 0,
    wipeouts: 0,
    repairsPaid: 0,
    earned: 0,
    spent: 0,
    combo: 0,
    bestCombo: 0,
    comboPoints: 0,
    race: null,
    buoy: 0,
    lap: 1,
    raceTime: 0,
    fuelLeft: 100,
    condition: 100,
    weather: 'chop',
    league: null,
    leagueRace: 0,
    leaguePoints: 0,
    leagueWins: 0,
    leagueTitles: 0,
    sponsors: [],
    sponsorProgress: {},
    timeTrials: 0,
    bestTrial: {},
    lastDay: 1,
    dailyRaces: 0,
    rivalBeaten: {},
    freestyleScore: 0,
    bestFreestyle: 0,
    rinses: 0,
    fuelBought: 0,
  };

  function refreshRank() {
    const r = jetskiRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Jet ski rank up: ${JETSKI_RANKS[r].name} — ${JETSKI_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function currentStats() {
    return jetskiStatsFor(state.activeSki, state.parts);
  }

  function currentWeather() {
    return JETSKI_WEATHER.find((w) => w.id === state.weather) || JETSKI_WEATHER[1];
  }

  function buySki(id) {
    const s = JETSKI_MODELS.find((m) => m.id === id);
    if (!s) return { ok: false, reason: 'no-such-ski' };
    if (state.owned.includes(id)) return { ok: false, reason: 'already-owned' };
    if (getCash() < s.cost) return { ok: false, reason: 'not-enough-cash', cost: s.cost };
    addCash(-s.cost);
    state.spent += s.cost;
    state.owned.push(id);
    gainXp(25);
    log(`Bought the ${s.name} for $${s.cost}.`);
    return { ok: true, id };
  }

  function selectSki(id) {
    if (!state.owned.includes(id)) return { ok: false, reason: 'not-owned' };
    state.activeSki = id;
    const st = currentStats();
    state.condition = 100;
    state.fuelLeft = st.fuel;
    return { ok: true, id, stats: st };
  }

  function buyPart(id) {
    const p = JETSKI_PARTS.find((x) => x.id === id);
    if (!p) return { ok: false, reason: 'no-such-part' };
    if (state.parts.includes(id)) return { ok: false, reason: 'already-owned' };
    if (getCash() < p.cost) return { ok: false, reason: 'not-enough-cash', cost: p.cost };
    addCash(-p.cost);
    state.spent += p.cost;
    state.parts.push(id);
    state.installed[p.slot] = id;
    gainXp(15);
    log(`Installed ${p.name} for $${p.cost}.`);
    return { ok: true, id, stats: currentStats() };
  }

  function removePart(slot) {
    if (!state.installed[slot]) return { ok: false, reason: 'nothing-installed' };
    const id = state.installed[slot];
    delete state.installed[slot];
    state.parts = state.parts.filter((x) => x !== id);
    return { ok: true, id, stats: currentStats() };
  }

  function startRace(courseId, rivalId) {
    const course = JETSKI_COURSES.find((x) => x.id === courseId);
    if (!course) return { ok: false, reason: 'no-such-course' };
    if (state.race) return { ok: false, reason: 'race-active' };
    if (state.condition < 30) return { ok: false, reason: 'needs-repair', condition: state.condition };
    if (state.fuelLeft < 30) return { ok: false, reason: 'fuel-low', fuel: state.fuelLeft };
    const rival = rivalId ? JETSKI_RIVALS.find((r) => r.id === rivalId) : null;
    state.race = { course: courseId, rival: rival ? rival.id : null, buoysDone: 0, lapsDone: 0 };
    state.buoy = 0;
    state.lap = 1;
    state.raceTime = 0;
    state.combo = 0;
    state.comboPoints = 0;
    log(`Race started: ${course.name}${rival ? ` vs ${rival.name}` : ''} — ${course.laps} laps, ${course.buoys} buoys. Water: ${currentWeather().name}.`);
    return { ok: true, course: courseId, rival: rival ? rival.id : null, weather: state.weather };
  }

  function passBuoy() {
    if (!state.race) return { ok: false, reason: 'no-race' };
    const course = JETSKI_COURSES.find((x) => x.id === state.race.course);
    state.buoy += 1;
    state.race.buoysDone += 1;
    state.fuelLeft = Math.max(0, state.fuelLeft - 2);
    const st = currentStats();
    state.raceTime += course.parTime / (course.buoys * course.laps) * (100 / st.topSpeed);
    if (rng() < 0.08 * currentWeather().risk) {
      state.wipeouts += 1;
      state.combo = 0;
      state.comboPoints = 0;
      state.condition = Math.max(5, state.condition - 8);
      log('A wave slaps the ski sideways — wipeout! Combo lost.');
      return { ok: true, wipeout: true, buoy: state.buoy, lap: state.lap };
    }
    if (state.buoy >= course.buoys) {
      state.buoy = 0;
      state.lap += 1;
      state.race.lapsDone += 1;
      log(`Lap ${state.lap - 1}/${course.laps} done on ${course.name}.`);
      if (state.lap > course.laps) return finishRace();
    }
    return { ok: true, buoy: state.buoy, lap: state.lap, time: Math.round(state.raceTime * 10) / 10 };
  }

  function doTrick(trickId) {
    const trick = JETSKI_TRICKS.find((t) => t.id === trickId);
    if (!trick) return { ok: false, reason: 'no-such-trick' };
    if (!state.race) return { ok: false, reason: 'no-race' };
    const st = currentStats();
    const risk = trick.risk * currentWeather().risk * (1 - st.stability / 400);
    if (rng() < risk) {
      state.crashes += 1;
      state.wipeouts += 1;
      state.combo = 0;
      state.comboPoints = 0;
      state.condition = Math.max(5, state.condition - 12);
      log(`Crashed mid-${trick.name}! The ski flips, you swim. Combo lost.`);
      return { ok: true, crashed: true, trick: trickId };
    }
    state.combo += 1;
    state.bestCombo = Math.max(state.bestCombo, state.combo);
    const pts = Math.round(trick.points * (1 + state.combo * 0.1));
    state.comboPoints += pts;
    state.totalTricks += 1;
    state.tricksLanded += 1;
    gainXp(6);
    return { ok: true, crashed: false, trick: trickId, points: pts, combo: state.combo };
  }

  function finishRace() {
    const course = JETSKI_COURSES.find((x) => x.id === state.race.course);
    const myTime = jetskiRaceTime(course, currentStats(), currentWeather(), rng);
    const rival = state.race.rival ? JETSKI_RIVALS.find((r) => r.id === state.race.rival) : null;
    const rivalTime = rival ? jetskiRivalTime(rival, course, rng) : null;
    let place = 1;
    if (rivalTime !== null && rivalTime < myTime) place = 2;
    if (rng() < 0.15) place = Math.min(3, place + 1);
    const prize = jetskiPrizeFor(course, state.rank, place) + Math.floor(state.comboPoints / 10);
    state.race = null;
    state.racesRidden += 1;
    state.dailyRaces += 1;
    state.fuelLeft = Math.max(0, state.fuelLeft - 12);
    state.condition = Math.max(5, state.condition - 5);
    if (place === 1) {
      state.wins += 1;
      state.podiums += 1;
      if (rival) state.rivalBeaten[rival.id] = (state.rivalBeaten[rival.id] || 0) + 1;
    } else if (place <= 3) state.podiums += 1;
    if (!state.bestTimes[course.id] || myTime < state.bestTimes[course.id]) state.bestTimes[course.id] = myTime;
    state.earned += prize;
    addCash(prize);
    gainXp(place === 1 ? 50 : 25);
    if (state.league) leagueRaceDone(place);
    checkSponsors();
    log(`Race over: ${course.name} in ${myTime}s — P${place}, $${prize}${rival ? ` (rival ${rivalTime}s)` : ''}.`);
    return { ok: true, time: myTime, rivalTime, place, prize, comboPoints: state.comboPoints };
  }

  function forfeitRace() {
    if (!state.race) return { ok: false, reason: 'no-race' };
    state.race = null;
    state.combo = 0;
    state.comboPoints = 0;
    log('Race forfeited — towed back to the dock.');
    return { ok: true };
  }

  function startTimeTrial(courseId) {
    const course = JETSKI_COURSES.find((x) => x.id === courseId);
    if (!course) return { ok: false, reason: 'no-such-course' };
    if (state.race) return { ok: false, reason: 'race-active' };
    state.race = { course: courseId, rival: null, buoysDone: 0, lapsDone: 0, trial: true };
    state.buoy = 0;
    state.lap = 1;
    state.raceTime = 0;
    log(`Time trial started: ${course.name}. Beat ${state.bestTrial[courseId] || course.parTime}s.`);
    return { ok: true, course: courseId };
  }

  function finishTrial() {
    if (!state.race || !state.race.trial) return { ok: false, reason: 'no-trial' };
    const course = JETSKI_COURSES.find((x) => x.id === state.race.course);
    const myTime = jetskiRaceTime(course, currentStats(), currentWeather(), rng);
    const prev = state.bestTrial[course.id];
    const improved = !prev || myTime < prev;
    if (improved) state.bestTrial[course.id] = myTime;
    state.race = null;
    state.timeTrials += 1;
    const bonus = improved ? 60 + state.rank * 20 : 10;
    state.earned += bonus;
    addCash(bonus);
    gainXp(improved ? 30 : 10);
    log(`Time trial ${course.name}: ${myTime}s ${improved ? '(new best!)' : ''} — $${bonus}.`);
    return { ok: true, time: myTime, improved, bonus };
  }

  function freestyle(trickIds) {
    if (state.race) return { ok: false, reason: 'race-active' };
    let total = 0;
    let landed = 0;
    for (const id of trickIds) {
      const trick = JETSKI_TRICKS.find((t) => t.id === id);
      if (!trick) continue;
      const st = currentStats();
      const risk = trick.risk * (1 - st.stability / 400);
      if (rng() < risk) {
        state.crashes += 1;
        log(`Freestyle: crashed on the ${trick.name}.`);
        break;
      }
      total += trick.points;
      landed += 1;
      state.tricksLanded += 1;
      state.totalTricks += 1;
    }
    state.freestyleScore = total;
    state.bestFreestyle = Math.max(state.bestFreestyle, total);
    const pay = Math.round(total / 5);
    state.earned += pay;
    addCash(pay);
    gainXp(landed * 8);
    log(`Freestyle session: ${landed} tricks, ${total} points, $${pay} from the beach crowd.`);
    return { ok: true, landed, points: total, pay };
  }

  function enterLeague(leagueId) {
    const league = JETSKI_LEAGUES.find((l) => l.id === leagueId);
    if (!league) return { ok: false, reason: 'no-such-league' };
    if (state.league) return { ok: false, reason: 'league-active' };
    if (state.rank < league.minRank) return { ok: false, reason: 'rank-too-low', need: league.minRank };
    if (getCash() < league.entry) return { ok: false, reason: 'not-enough-cash', cost: league.entry };
    addCash(-league.entry);
    state.spent += league.entry;
    state.league = leagueId;
    state.leagueRace = 0;
    state.leaguePoints = 0;
    state.leagueWins = 0;
    log(`Entered the ${league.name} — ${league.races} races, $${league.prize} to the champion.`);
    return { ok: true, league: leagueId };
  }

  function leagueRaceDone(place) {
    if (!state.league) return;
    state.leagueRace += 1;
    const pts = place === 1 ? 10 : place === 2 ? 6 : place === 3 ? 4 : 1;
    state.leaguePoints += pts;
    if (place === 1) state.leagueWins += 1;
    const league = JETSKI_LEAGUES.find((l) => l.id === state.league);
    if (state.leagueRace >= league.races) {
      const champion = state.leaguePoints >= league.races * 6;
      if (champion) {
        state.leagueTitles += 1;
        state.earned += league.prize;
        addCash(league.prize);
        gainXp(150);
        log(`CHAMPION of the ${league.name}! $${league.prize} prize.`);
      } else {
        log(`${league.name} over — ${state.leaguePoints} points, not enough for the title.`);
      }
      state.league = null;
      state.leagueRace = 0;
      state.leaguePoints = 0;
      state.leagueWins = 0;
    }
  }

  function signSponsor(id) {
    const s = JETSKI_SPONSORS.find((x) => x.id === id);
    if (!s) return { ok: false, reason: 'no-such-sponsor' };
    if (state.sponsors.includes(id)) return { ok: false, reason: 'already-signed' };
    if (state.rank < 1 && s.id !== 'waveco') return { ok: false, reason: 'rank-too-low' };
    state.sponsors.push(id);
    state.sponsorProgress[id] = 0;
    log(`Sponsor signed: ${s.name} — ${s.desc}`);
    return { ok: true, id };
  }

  function checkSponsors() {
    for (const s of JETSKI_SPONSORS) {
      if (!state.sponsors.includes(s.id)) continue;
      const have = s.need === 'races' ? state.racesRidden : s.need === 'tricks' ? state.tricksLanded : s.need === 'wins' ? state.wins : state.leagueTitles;
      const done = Math.floor(have / s.goal);
      const paid = state.sponsorProgress[s.id] || 0;
      if (done > paid) {
        const bonus = (done - paid) * s.pay;
        state.sponsorProgress[s.id] = done;
        state.earned += bonus;
        addCash(bonus);
        log(`Sponsor ${s.name} paid $${bonus}.`);
      }
    }
  }

  function repair() {
    const missing = 100 - state.condition;
    if (missing <= 0) return { ok: false, reason: 'no-damage' };
    const cost = Math.ceil(missing * 2);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.repairsPaid += cost;
    state.condition = 100;
    log(`Ski repaired for $${cost} — hull smooth, engine purring.`);
    return { ok: true, cost };
  }

  function refuel() {
    const st = currentStats();
    if (state.fuelLeft >= st.fuel) return { ok: false, reason: 'already-full' };
    const cost = Math.ceil((st.fuel - state.fuelLeft) / 10);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.fuelBought += cost;
    state.fuelLeft = st.fuel;
    return { ok: true, cost };
  }

  function rinse() {
    const cost = 10;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.rinses += 1;
    state.condition = Math.min(100, state.condition + 5);
    log('Fresh-water rinse. The salt never wins today.');
    return { ok: true, cost };
  }

  function tick(dt) {
    if (state.race) {
      state.raceTime += dt;
      const drain = dt * 0.35;
      state.fuelLeft = Math.max(0, state.fuelLeft - drain);
      if (state.fuelLeft <= 0) {
        log('Fuel gone mid-race — the ski dies and drifts. Tow back to the dock.');
        state.race = null;
        state.combo = 0;
        state.comboPoints = 0;
        state.condition = Math.max(5, state.condition - 10);
      }
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyRaces = 0;
    state.fuelLeft = currentStats().fuel;
    const roll = rng();
    if (roll < 0.3) state.weather = 'glass';
    else if (roll < 0.6) state.weather = 'chop';
    else if (roll < 0.8) state.weather = 'waves';
    else if (roll < 0.9) state.weather = 'fog';
    else state.weather = 'storm';
    log(`Bay forecast: ${currentWeather().name} — ${currentWeather().desc}`);
    state.condition = Math.max(5, state.condition - 2);
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, owned: state.owned,
      activeSki: state.activeSki, parts: state.parts,
      installed: state.installed, racesRidden: state.racesRidden,
      wins: state.wins, podiums: state.podiums,
      bestTimes: state.bestTimes, totalTricks: state.totalTricks,
      tricksLanded: state.tricksLanded, crashes: state.crashes,
      wipeouts: state.wipeouts, repairsPaid: state.repairsPaid,
      earned: state.earned, spent: state.spent, combo: state.combo,
      bestCombo: state.bestCombo, comboPoints: state.comboPoints,
      race: state.race, buoy: state.buoy, lap: state.lap,
      raceTime: state.raceTime, fuelLeft: state.fuelLeft,
      condition: state.condition, weather: state.weather,
      league: state.league, leagueRace: state.leagueRace,
      leaguePoints: state.leaguePoints, leagueWins: state.leagueWins,
      leagueTitles: state.leagueTitles, sponsors: state.sponsors,
      sponsorProgress: state.sponsorProgress,
      timeTrials: state.timeTrials, bestTrial: state.bestTrial,
      lastDay: state.lastDay, dailyRaces: state.dailyRaces,
      rivalBeaten: state.rivalBeaten,
      freestyleScore: state.freestyleScore,
      bestFreestyle: state.bestFreestyle, rinses: state.rinses,
      fuelBought: state.fuelBought,
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
      rank: JETSKI_RANKS[state.rank].name,
      xp: state.xp,
      ski: state.activeSki,
      owned: state.owned.length,
      parts: state.parts.length,
      racesRidden: state.racesRidden,
      wins: state.wins,
      podiums: state.podiums,
      tricksLanded: state.tricksLanded,
      bestCombo: state.bestCombo,
      crashes: state.crashes,
      wipeouts: state.wipeouts,
      earned: Math.round(state.earned),
      spent: state.spent,
      repairsPaid: state.repairsPaid,
      league: state.league,
      leagueTitles: state.leagueTitles,
      sponsors: state.sponsors.length,
      timeTrials: state.timeTrials,
      weather: state.weather,
      fuel: Math.round(state.fuelLeft),
      condition: Math.round(state.condition),
      racing: !!state.race,
      buoy: state.buoy,
      lap: state.lap,
      dailyRaces: state.dailyRaces,
      bestFreestyle: state.bestFreestyle,
      rinses: state.rinses,
    };
  }

  function hudLine() {
    if (state.race) {
      const course = JETSKI_COURSES.find((x) => x.id === state.race.course);
      return `Jet ski: ${course.name} L${state.lap}/${course.laps} B${state.buoy} — fuel ${Math.round(state.fuelLeft)}`;
    }
    if (state.league) return `Jet ski: ${state.league} — race ${state.leagueRace + 1}, ${state.leaguePoints} pts`;
    if (state.condition < 40) return `Jet ski: ${state.activeSki} needs repair (${Math.round(state.condition)}%)`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearDock = Math.hypot(pos.x - 150, pos.z - 170) < 30;
    if (!nearDock) return false;
    if (state.race) { passBuoy(); return true; }
    return false;
  }

  function courseList() {
    return JETSKI_COURSES.map((t) => ({
      id: t.id, name: t.name, buoys: t.buoys, laps: t.laps,
      difficulty: t.difficulty, prize: t.prize,
      best: state.bestTimes[t.id] || null,
    }));
  }

  function garage() {
    return JETSKI_MODELS.map((m) => ({
      id: m.id, name: m.name, cost: m.cost, owned: state.owned.includes(m.id),
      stats: jetskiStatsFor(m.id, m.id === state.activeSki ? state.parts : []),
    }));
  }

  return {
    state, buySki, selectSki, buyPart, removePart, startRace,
    passBuoy, doTrick, finishRace, forfeitRace, startTimeTrial,
    finishTrial, freestyle, enterLeague, signSponsor, repair, refuel,
    rinse, tick, tickDay, serialize, deserialize, stats, hudLine,
    interact, courseList, garage, currentStats,
  };
}

export const JETSKI_FREESTYLE_SPOTS = [
  { id: 'pier', name: 'Old Pier', bonus: 1.2, desc: 'Tricks pay 20% more here.' },
  { id: 'breakwater', name: 'Breakwater', bonus: 1.4, desc: 'Big waves, big air.' },
  { id: 'sandbar', name: 'Sandbar', bonus: 1.3, desc: 'Shallow water, soft landings.' },
  { id: 'bridge', name: 'Bay Bridge', bonus: 1.5, desc: 'Under the span, the crowd watches.' },
];

export function jetskiFreestyleScore(tricks, spotId) {
  const spot = JETSKI_FREESTYLE_SPOTS.find((s) => s.id === spotId);
  const mult = spot ? spot.bonus : 1;
  let total = 0;
  for (const t of tricks) {
    const def = JETSKI_TRICKS.find((x) => x.id === t);
    if (def) total += def.points;
  }
  return Math.round(total * mult);
}

export function jetskiSeasonStandings(results) {
  const table = {};
  for (const r of results) {
    if (!table[r.pilot]) table[r.pilot] = 0;
    table[r.pilot] += r.place === 1 ? 10 : r.place === 2 ? 6 : r.place === 3 ? 4 : 1;
  }
  return Object.entries(table)
    .map(([pilot, points]) => ({ pilot, points }))
    .sort((a, b) => b.points - a.points);
}

export function jetskiWaveHeight(weatherId) {
  const w = JETSKI_WEATHER.find((x) => x.id === weatherId);
  if (!w) return 0.5;
  if (w.id === 'glass') return 0.1;
  if (w.id === 'chop') return 0.4;
  if (w.id === 'waves') return 1.2;
  if (w.id === 'storm') return 2.0;
  return 0.3;
}

export const JETSKI_TOURS = [
  { id: 'sunset', name: 'Sunset Tour', duration: 60, price: 80, guests: 6, desc: 'Golden hour, slow cruise, big tips.' },
  { id: 'island', name: 'Island Hop', duration: 120, price: 150, guests: 4, desc: 'Three islands, a swim stop, lunch.' },
  { id: 'dolphin', name: 'Dolphin Watch', duration: 90, price: 120, guests: 8, desc: 'Find the pod. They usually cooperate.' },
  { id: 'fishing', name: 'Fishing Run', duration: 180, price: 200, guests: 2, desc: 'Out to the reef, rods ready.' },
  { id: 'night', name: 'Night Lights Tour', duration: 60, price: 100, guests: 6, desc: 'The city from the water, all lit up.' },
  { id: 'adventure', name: 'Adventure Day', duration: 240, price: 300, guests: 4, desc: 'The full bay, caves and all.' },
  { id: 'photo', name: 'Photo Safari', duration: 90, price: 140, guests: 4, desc: 'Slow passes for the perfect shot.' },
  { id: 'beginner', name: 'Beginner Lesson', duration: 45, price: 60, guests: 2, desc: 'Teach the tourists not to fall off.' },
];

export const JETSKI_RENTAL_RATES = [
  { id: 'hour', name: 'One Hour', price: 50, fuel: 20, desc: 'Quick spin around the marina.' },
  { id: 'half', name: 'Half Day', price: 150, fuel: 50, desc: 'Four hours, the whole bay.' },
  { id: 'day', name: 'Full Day', price: 250, fuel: 90, desc: 'Sunrise to sunset, fuel included.' },
  { id: 'weekend', name: 'Weekend', price: 450, fuel: 160, desc: 'Two days, one very happy tourist.' },
];

export const JETSKI_MAINTENANCE = [
  { id: 'oil', name: 'Oil Change', cost: 40, interval: 10, desc: 'Every 10 races, or the engine complains.' },
  { id: 'plugs', name: 'Spark Plugs', cost: 25, interval: 15, desc: 'Fresh plugs, clean starts.' },
  { id: 'pump', name: 'Pump Service', cost: 80, interval: 20, desc: 'The jet pump, inspected and sealed.' },
  { id: 'hull', name: 'Hull Polish', cost: 60, interval: 30, desc: 'Smooth hull, faster ski.' },
  { id: 'battery', name: 'Battery Check', cost: 30, interval: 25, desc: 'Starts first time, every time.' },
];

export function jetskiTourPay(tourId, guests, rank) {
  const t = JETSKI_TOURS.find((x) => x.id === tourId);
  if (!t) return 0;
  const base = t.price * guests;
  return Math.round(base * (1 + rank * 0.05));
}

export function jetskiRentalPay(rateId, days) {
  const r = JETSKI_RENTAL_RATES.find((x) => x.id === rateId);
  if (!r) return 0;
  return r.price * days;
}

export function jetskiMaintenanceDue(racesRidden, itemId) {
  const m = JETSKI_MAINTENANCE.find((x) => x.id === itemId);
  if (!m) return false;
  return racesRidden % m.interval === 0 && racesRidden > 0;
}

export function createJetskiTours(system) {
  let toursDone = 0;
  let toursEarned = 0;
  let rentalsDone = 0;
  let rentalsEarned = 0;
  let maintenanceDone = 0;

  function runTour(tourId, guests) {
    const t = JETSKI_TOURS.find((x) => x.id === tourId);
    if (!t) return { ok: false, reason: 'no-such-tour' };
    if (guests > t.guests) return { ok: false, reason: 'too-many-guests', max: t.guests };
    if (system.state.fuelLeft < 30) return { ok: false, reason: 'fuel-low' };
    const pay = jetskiTourPay(tourId, guests, system.state.rank);
    toursDone += 1;
    toursEarned += pay;
    system.state.fuelLeft = Math.max(0, system.state.fuelLeft - 25);
    return { ok: true, tour: tourId, guests, pay, duration: t.duration };
  }

  function rentOut(rateId, days) {
    const r = JETSKI_RENTAL_RATES.find((x) => x.id === rateId);
    if (!r) return { ok: false, reason: 'no-such-rate' };
    const pay = jetskiRentalPay(rateId, days);
    rentalsDone += 1;
    rentalsEarned += pay;
    return { ok: true, rate: rateId, days, pay };
  }

  function doMaintenance(itemId) {
    const m = JETSKI_MAINTENANCE.find((x) => x.id === itemId);
    if (!m) return { ok: false, reason: 'no-such-item' };
    maintenanceDone += 1;
    system.state.condition = Math.min(100, system.state.condition + 10);
    return { ok: true, item: itemId, cost: m.cost, condition: Math.round(system.state.condition) };
  }

  function tourRecord() {
    return { toursDone, toursEarned, rentalsDone, rentalsEarned, maintenanceDone };
  }

  return { runTour, rentOut, doMaintenance, tourRecord };
}

export const JETSKI_BEACH_EVENTS = [
  { id: 'race-day', name: 'Beach Race Day', mult: 1.5, desc: 'Crowds, prizes, and a loudspeaker.' },
  { id: 'festival', name: 'Bay Festival', mult: 1.4, desc: 'The whole beach is a party.' },
  { id: 'calm-day', name: 'Calm Day', mult: 1.0, desc: 'Glass water, quiet beach.' },
  { id: 'storm-day', name: 'Storm Day', mult: 0.5, desc: 'Nobody rents in a storm.' },
  { id: 'holiday', name: 'Holiday Crowd', mult: 1.6, desc: 'Tourists everywhere, skis fully booked.' },
  { id: 'competition', name: 'Freestyle Comp', mult: 1.3, desc: 'Judges, points, and a trophy.' },
];

export const JETSKI_SAFETY = [
  { id: 'lifejacket', name: 'Life Jackets', cost: 80, desc: 'Every rider, every time. No exceptions.' },
  { id: 'briefing', name: 'Safety Briefing', cost: 0, desc: 'Five minutes that save lives.' },
  { id: 'kill-switch', name: 'Kill Switch Lanyards', cost: 40, desc: 'Fall off, engine stops.' },
  { id: 'radio', name: 'Marine Radio', cost: 120, desc: 'Call for help from anywhere on the bay.' },
  { id: 'first-aid', name: 'First Aid Kit', cost: 60, desc: 'On the dock, always stocked.' },
];

export function jetskiBeachMult(eventId) {
  const e = JETSKI_BEACH_EVENTS.find((x) => x.id === eventId);
  return e ? e.mult : 1;
}

export function jetskiSafetyScore(itemsOwned) {
  let score = 0;
  for (const item of JETSKI_SAFETY) {
    if (itemsOwned.includes(item.id)) score += 20;
  }
  return score;
}

export function jetskiFuelCost(distanceKm, consumption) {
  return Math.ceil(distanceKm * consumption);
}

export function jetskiRacePurse(prize, place, sponsors) {
  const base = jetskiPrizeFor({ prize }, 0, place);
  return base + sponsors * 50;
}

export function jetskiTopSpeedWithParts(modelId, partIds) {
  const stats = jetskiStatsFor(modelId, partIds);
  return stats.topSpeed;
}

export const JETSKI_TIPS = [
  { id: 'buoys-first', name: 'Buoys First', text: 'A missed buoy costs more than a slow lap.' },
  { id: 'fuel-watch', name: 'Watch the Fuel', text: 'The bay is bigger than it looks.' },
  { id: 'waves-air', name: 'Ride the Waves', text: 'Big swell means big air. Land flat.' },
  { id: 'rinse-always', name: 'Rinse Always', text: 'Salt water eats engines. Rinse every day.' },
  { id: 'tricks-late', name: 'Tricks Late', text: 'Trick on the last lap, when the race is won.' },
  { id: 'tour-money', name: 'Tour Money', text: 'Sunset tours pay steady money between races.' },
  { id: 'storm-never', name: 'Storm Never', text: 'Never race a storm surge. The bay always wins.' },
  { id: 'repair-now', name: 'Repair Now', text: 'A cracked hull sinks. Fix it today.' },
];

export const JETSKI_AWARDS = [
  { id: 'first-win', name: 'First Win', need: 'wins', goal: 1, desc: 'Win your first race.' },
  { id: 'ten-races', name: 'Ten Races', need: 'racesRidden', goal: 10, desc: 'Ride 10 races.' },
  { id: 'trick-fifty', name: 'Trick Fifty', need: 'tricksLanded', goal: 50, desc: 'Land 50 tricks.' },
  { id: 'champion', name: 'Champion', need: 'leagueTitles', goal: 1, desc: 'Win a league title.' },
  { id: 'tour-guide', name: 'Tour Guide', need: 'racesRidden', goal: 25, desc: 'Ride 25 races.' },
];

export function jetskiTipFor(day) {
  return JETSKI_TIPS[day % JETSKI_TIPS.length];
}

export function jetskiAwardProgress(awardId, state) {
  const a = JETSKI_AWARDS.find((x) => x.id === awardId);
  if (!a) return null;
  const have = state[a.need] || 0;
  return { id: a.id, name: a.name, have, goal: a.goal, done: have >= a.goal };
}

export function jetskiFuelRange(fuelLeft, consumption) {
  if (consumption <= 0) return 0;
  return Math.round(fuelLeft / consumption);
}

export function jetskiWaveRisk(weatherId) {
  const w = JETSKI_WEATHER.find((x) => x.id === weatherId);
  return w ? w.risk : 1;
}

export function jetskiBestCourse(bestTimes) {
  let best = null;
  let bestTime = Infinity;
  for (const [course, time] of Object.entries(bestTimes)) {
    if (time < bestTime) { bestTime = time; best = course; }
  }
  return best ? { course: best, time: bestTime } : null;
}

export function jetskiConditionLabel(condition) {
  if (condition >= 80) return 'excellent';
  if (condition >= 60) return 'good';
  if (condition >= 40) return 'worn';
  if (condition >= 20) return 'poor';
  return 'critical';
}

export const JETSKI_RECORDS = [
  { id: 'most-wins', name: 'Most Wins', stat: 'wins', unit: 'wins', desc: 'Most race wins.' },
  { id: 'best-combo', name: 'Best Combo', stat: 'bestCombo', unit: 'tricks', desc: 'Longest trick combo.' },
  { id: 'most-tricks', name: 'Most Tricks', stat: 'tricksLanded', unit: 'tricks', desc: 'Most tricks landed.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money earned.' },
  { id: 'best-freestyle', name: 'Best Freestyle', stat: 'bestFreestyle', unit: 'pts', desc: 'Best freestyle score.' },
];

export function jetskiRecordFor(recordId, state) {
  const r = JETSKI_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function jetskiAllRecords(state) {
  return JETSKI_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function jetskiWinRate(wins, races) {
  if (races === 0) return 0;
  return Math.round((wins / races) * 100);
}

export function jetskiWipeoutRate(wipeouts, races) {
  if (races === 0) return 0;
  return Math.round((wipeouts / races) * 100) / 100;
}

export function jetskiRiderGrade(wins, races, bestCombo) {
  const rate = jetskiWinRate(wins, races);
  if (rate >= 60 && bestCombo >= 8) return 'S';
  if (rate >= 40) return 'A';
  if (rate >= 25) return 'B';
  if (rate >= 10) return 'C';
  return 'D';
}

export const JETSKI_SEASONAL_EVENTS = [
  { id: 'summer-gp', name: 'Summer Grand Prix', season: 'summer', prize: 2000, desc: 'The biggest race of the year.' },
  { id: 'spring-splash', name: 'Spring Splash', season: 'spring', prize: 800, desc: 'The season opener.' },
  { id: 'autumn-cup', name: 'Autumn Cup', season: 'autumn', prize: 1000, desc: 'Cool water, hot racing.' },
  { id: 'winter-series', name: 'Winter Series', season: 'winter', prize: 1200, desc: 'Wetsuits required.' },
];

export function jetskiSeasonalEvent(seasonId) {
  return JETSKI_SEASONAL_EVENTS.find((x) => x.season === seasonId) || null;
}

export function jetskiSeasonalPrize(seasonId, place) {
  const e = jetskiSeasonalEvent(seasonId);
  if (!e) return 0;
  return place === 1 ? e.prize : place === 2 ? Math.round(e.prize / 2) : Math.round(e.prize / 4);
}

export function jetskiTourSeasonMult(seasonId) {
  if (seasonId === 'summer') return 1.5;
  if (seasonId === 'spring' || seasonId === 'autumn') return 1.2;
  return 0.8;
}

export const JETSKI_QUICK_START = [
  'Start on the Dolphin. It forgives everything.',
  'Learn the buoys before you learn the tricks.',
  'Watch the fuel gauge — the bay is big.',
  'Rinse the ski after every session.',
  'Trick on the last lap, never the first.',
  'Sunset tours pay steady money between races.',
];

export function jetskiQuickStart(step) {
  return JETSKI_QUICK_START[step] || null;
}

export function jetskiTotalValue(state) {
  return state.owned.length * 500 + state.parts.length * 200;
}

export function jetskiProgressPercent(state) {
  const total = state.racesRidden + state.timeTrials;
  if (total === 0) return 0;
  return Math.round((state.wins / total) * 100);
}

export function jetskiSummary(state) {
  return `${JETSKI_RANKS[state.rank].name}: ${state.racesRidden} races, ${state.wins} wins, ${state.tricksLanded} tricks, $${Math.round(state.earned)} earned.`;
}

export function jetskiNextGoal(state) {
  if (state.racesRidden < 3) return 'Ride 3 races.';
  if (state.wins < 1) return 'Win your first race.';
  if (state.leagueTitles < 1) return 'Win a league title.';
  return 'Become King of the Bay.';
}

export const JETSKI_META = {
  system: 'jetski', version: '7b-B', author: 'builder-B',
  files: 1, lines: 1003, features: ['races', 'tricks', 'leagues', 'tours', 'rentals', 'trials'],
};

export function jetskiMeta() {
  return { ...JETSKI_META };
}
