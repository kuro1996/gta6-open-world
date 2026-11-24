// Solara Nights — Drone Racing (Round 7b-B, written fresh).
// First-person-view quad racing over Solara Bay: buy a starter drone,
// bolt on better motors and batteries, then fly checkpoint tracks
// against the clock and against rival pilots. Tricks mid-air build a
// combo multiplier; a crash costs the combo and a repair bill. Leagues
// pay real money, time trials pay in bragging rights and sponsor cash,
// and the scrapyard of broken props grows with every bad landing.
// Pure logic: no rendering, no imports. Wired through the standard ctx
// { rng, getDay, getHour, getCash, addCash, addHeat, log, getPlayerPos,
// getSpeed } and driven by tick/tickDay from the main loop.

export const DRONE_MODELS = [
  { id: 'sparrow', name: 'Sparrow 2S', cost: 0, topSpeed: 62, agility: 55, battery: 100, durability: 60, desc: 'The loaner everyone starts on. Slow, forgiving.' },
  { id: 'hornet', name: 'Hornet X', cost: 350, topSpeed: 78, agility: 68, battery: 110, durability: 65, desc: 'Club-racer favourite, quick in the turns.' },
  { id: 'falcon', name: 'Falcon 5', cost: 800, topSpeed: 92, agility: 74, battery: 120, durability: 70, desc: 'Carbon frame, hungry motors.' },
  { id: 'viper', name: 'Viper GT', cost: 1500, topSpeed: 108, agility: 82, battery: 130, durability: 72, desc: 'Track-day weapon with a temper.' },
  { id: 'ghost', name: 'Ghost 9', cost: 2600, topSpeed: 121, agility: 88, battery: 140, durability: 78, desc: 'Near-silent, near-invisible, very fast.' },
  { id: 'titan', name: 'Titan Hauler', cost: 1800, topSpeed: 84, agility: 58, battery: 200, durability: 95, desc: 'Slow but flies forever and survives crashes.' },
  { id: 'wasp', name: 'Wasp Nano', cost: 1200, topSpeed: 115, agility: 96, battery: 85, durability: 45, desc: 'Tiny, twitchy, brilliant through gates.' },
  { id: 'phoenix', name: 'Phoenix Pro', cost: 4200, topSpeed: 134, agility: 90, battery: 150, durability: 80, desc: 'The pro rig. Wins leagues, empties wallets.' },
];

export const DRONE_TRACKS = [
  { id: 'marina-loop', name: 'Marina Loop', gates: 8, laps: 3, difficulty: 1, parTime: 150, prize: 120, desc: 'Gentle gates over the yachts.' },
  { id: 'dock-slalom', name: 'Dock Slalom', gates: 10, laps: 3, difficulty: 2, parTime: 170, prize: 200, desc: 'Crates and cranes, tight lines.' },
  { id: 'rooftop-run', name: 'Rooftop Run', gates: 12, laps: 2, difficulty: 3, parTime: 160, prize: 320, desc: 'Between the towers, wind does things.' },
  { id: 'beach-dash', name: 'Beach Dash', gates: 9, laps: 3, difficulty: 2, parTime: 155, prize: 240, desc: 'Low over the surf, gulls included.' },
  { id: 'canyon-cut', name: 'Canyon Cut', gates: 14, laps: 2, difficulty: 4, parTime: 190, prize: 480, desc: 'Rock walls on both sides. No mercy.' },
  { id: 'night-neon', name: 'Night Neon', gates: 11, laps: 3, difficulty: 3, parTime: 175, prize: 400, desc: 'Neon gates after dark, pure glow.' },
  { id: 'storm-drain', name: 'Storm Drain', gates: 13, laps: 2, difficulty: 5, parTime: 200, prize: 650, desc: 'Under the city, water, dark, fast.' },
  { id: 'crown-gauntlet', name: 'Crown Gauntlet', gates: 16, laps: 3, difficulty: 5, parTime: 240, prize: 900, desc: 'The championship course. Everything at once.' },
];

export const DRONE_PARTS = [
  { id: 'motors-1', name: 'Sport Motors', cost: 180, slot: 'motors', speed: 8, agility: 2, battery: -5, desc: '+8 top speed, sips more juice.' },
  { id: 'motors-2', name: 'Race Motors', cost: 420, slot: 'motors', speed: 16, agility: 4, battery: -10, desc: '+16 top speed, thirsty.' },
  { id: 'motors-3', name: 'Pro Motors', cost: 900, slot: 'motors', speed: 26, agility: 6, battery: -15, desc: '+26 top speed, drinks battery.' },
  { id: 'props-1', name: 'Carbon Props', cost: 140, slot: 'props', speed: 4, agility: 8, battery: 0, desc: '+8 agility, crisper turns.' },
  { id: 'props-2', name: 'Bullnose Props', cost: 300, slot: 'props', speed: 7, agility: 12, battery: -3, desc: '+12 agility, more bite.' },
  { id: 'battery-1', name: 'Long Cell', cost: 200, slot: 'battery', speed: 0, agility: -2, battery: 30, desc: '+30 battery life.' },
  { id: 'battery-2', name: 'Race Pack', cost: 480, slot: 'battery', speed: 2, agility: -2, battery: 60, desc: '+60 battery, slight weight.' },
  { id: 'frame-1', name: 'Cage Frame', cost: 260, slot: 'frame', speed: -2, agility: 0, battery: 0, durability: 25, desc: '+25 durability, survives bumps.' },
  { id: 'frame-2', name: 'Titanium Frame', cost: 620, slot: 'frame', speed: 3, agility: 3, battery: 0, durability: 40, desc: '+40 durability, lighter too.' },
  { id: 'camera-1', name: 'HD FPV Cam', cost: 320, slot: 'camera', speed: 0, agility: 5, battery: -5, desc: '+5 agility from seeing clearly.' },
];

export const DRONE_TRICKS = [
  { id: 'barrel', name: 'Barrel Roll', points: 120, risk: 0.12, desc: 'A full roll between gates.' },
  { id: 'flip', name: 'Back Flip', points: 150, risk: 0.16, desc: 'Over the top and onward.' },
  { id: 'dive', name: 'Power Dive', points: 200, risk: 0.22, desc: 'Drop fifty metres, pull out late.' },
  { id: 'split', name: 'Split-S', points: 180, risk: 0.18, desc: 'Half roll, half loop, all style.' },
  { id: 'orbit', name: 'Orbit', points: 100, risk: 0.08, desc: 'Circle a gate post, show off.' },
  { id: 'knife', name: 'Knife Edge', points: 220, risk: 0.26, desc: 'Fly sideways through a gate.' },
  { id: 'limbo', name: 'Limbo Pass', points: 160, risk: 0.15, desc: 'Under the low beam, skids down.' },
  { id: 'matty', name: 'Matty Flip', points: 260, risk: 0.3, desc: 'The double. Crowd goes wild.' },
  { id: 'gap', name: 'Gap Shot', points: 240, risk: 0.28, desc: 'Thread the crane gap at speed.' },
  { id: 'hover', name: 'Dead Hover', points: 80, risk: 0.04, desc: 'Perfectly still, one metre up.' },
];

export const DRONE_RIVALS = [
  { id: 'vex', name: 'Vex', skill: 62, style: 'steady', taunt: 'You fly like my grandma.' },
  { id: 'nova', name: 'Nova', skill: 74, style: 'aggressive', taunt: 'Try keeping up, rookie.' },
  { id: 'dutch', name: 'Dutch', skill: 81, style: 'technical', taunt: 'Lines win races. You have none.' },
  { id: 'kira', name: 'Kira', skill: 88, style: 'aggressive', taunt: 'I already lapped your best time.' },
  { id: 'sable', name: 'Sable', skill: 93, style: 'steady', taunt: 'The crown stays with me.' },
  { id: 'junior', name: 'Junior', skill: 55, style: 'wild', taunt: 'I crash a lot but I crash FAST.' },
];

export const DRONE_LEAGUES = [
  { id: 'rookie', name: 'Rookie League', minRank: 0, entry: 0, races: 3, prize: 400, desc: 'Learn the ropes, win a little.' },
  { id: 'club', name: 'Club League', minRank: 1, entry: 100, races: 4, prize: 900, desc: 'Real pilots, real money.' },
  { id: 'pro', name: 'Pro League', minRank: 2, entry: 300, races: 5, prize: 2200, desc: 'Sponsors watching. No mistakes.' },
  { id: 'crown', name: 'Crown Championship', minRank: 3, entry: 800, races: 6, prize: 6000, desc: 'The title. The money. The crown.' },
];

export const DRONE_RANKS = [
  { level: 0, name: 'Backyard Flyer', xp: 0, perk: 'Rookie league open.' },
  { level: 1, name: 'Club Pilot', xp: 150, perk: 'Club league open, +5% prize.' },
  { level: 2, name: 'Track Regular', xp: 400, perk: 'Pro league open, +10% prize.' },
  { level: 3, name: 'Pro Racer', xp: 800, perk: 'Crown championship open, +15% prize.' },
  { level: 4, name: 'Ace of Solara', xp: 1500, perk: '+25% prize, rivals fear you.' },
];

export const DRONE_SPONSORS = [
  { id: 'voltcorp', name: 'VoltCorp', pay: 150, need: 'races', goal: 5, desc: '$150 per 5 races flown.' },
  { id: 'propco', name: 'PropCo', pay: 200, need: 'tricks', goal: 20, desc: '$200 per 20 tricks landed.' },
  { id: 'bayfm', name: 'Bay FM', pay: 300, need: 'wins', goal: 3, desc: '$300 per 3 race wins.' },
  { id: 'neon', name: 'Neon Energy', pay: 500, need: 'leagues', goal: 1, desc: '$500 per league title.' },
];

export function droneRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < DRONE_RANKS.length; i++) {
    if (xp >= DRONE_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function droneStatsFor(model, parts) {
  const base = DRONE_MODELS.find((m) => m.id === model) || DRONE_MODELS[0];
  const out = { topSpeed: base.topSpeed, agility: base.agility, battery: base.battery, durability: base.durability };
  for (const p of DRONE_PARTS) {
    if (!parts.includes(p.id)) continue;
    out.topSpeed += p.speed || 0;
    out.agility += p.agility || 0;
    out.battery += p.battery || 0;
    if (p.durability) out.durability += p.durability;
  }
  out.topSpeed = Math.max(30, out.topSpeed);
  out.agility = Math.max(10, Math.min(120, out.agility));
  out.battery = Math.max(40, out.battery);
  out.durability = Math.max(20, Math.min(150, out.durability));
  return out;
}

export function droneRaceTime(track, droneStats, rng) {
  const base = track.parTime;
  const speedFactor = 100 / droneStats.topSpeed;
  const agilityFactor = 1 + (80 - droneStats.agility) / 400;
  const wobble = 0.94 + rng() * 0.12;
  return Math.round(base * speedFactor * agilityFactor * wobble * 10) / 10;
}

export function droneRivalTime(rival, track, rng) {
  const base = track.parTime;
  const skillFactor = 1.25 - rival.skill / 100;
  const wobble = 0.95 + rng() * 0.1;
  return Math.round(base * skillFactor * wobble * 10) / 10;
}

export function dronePrizeFor(track, rank, place) {
  const rankBonus = 1 + rank * 0.05;
  const placeMult = place === 1 ? 1 : place === 2 ? 0.5 : place === 3 ? 0.25 : 0.1;
  return Math.round(track.prize * rankBonus * placeMult);
}

export function createDroneRacingSystem(ctx) {
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
    owned: ['sparrow'],
    activeDrone: 'sparrow',
    parts: [],
    installed: {},
    racesFlown: 0,
    wins: 0,
    podiums: 0,
    bestTimes: {},
    totalTricks: 0,
    tricksLanded: 0,
    crashes: 0,
    repairsPaid: 0,
    earned: 0,
    spent: 0,
    combo: 0,
    bestCombo: 0,
    comboPoints: 0,
    race: null,
    gate: 0,
    lap: 1,
    raceTime: 0,
    batteryLeft: 100,
    durability: 100,
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
    repairsNeeded: 0,
  };

  function refreshRank() {
    const r = droneRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Drone rank up: ${DRONE_RANKS[r].name} — ${DRONE_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function currentStats() {
    return droneStatsFor(state.activeDrone, state.parts);
  }

  function buyDrone(id) {
    const d = DRONE_MODELS.find((m) => m.id === id);
    if (!d) return { ok: false, reason: 'no-such-drone' };
    if (state.owned.includes(id)) return { ok: false, reason: 'already-owned' };
    if (getCash() < d.cost) return { ok: false, reason: 'not-enough-cash', cost: d.cost };
    addCash(-d.cost);
    state.spent += d.cost;
    state.owned.push(id);
    gainXp(25);
    log(`Bought the ${d.name} for $${d.cost}.`);
    return { ok: true, id };
  }

  function selectDrone(id) {
    if (!state.owned.includes(id)) return { ok: false, reason: 'not-owned' };
    state.activeDrone = id;
    const st = currentStats();
    state.durability = st.durability;
    state.batteryLeft = 100;
    return { ok: true, id, stats: st };
  }

  function buyPart(id) {
    const p = DRONE_PARTS.find((x) => x.id === id);
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

  function startRace(trackId, rivalId) {
    const track = DRONE_TRACKS.find((t) => t.id === trackId);
    if (!track) return { ok: false, reason: 'no-such-track' };
    if (state.race) return { ok: false, reason: 'race-active' };
    if (state.durability < 30) return { ok: false, reason: 'needs-repair', durability: state.durability };
    if (state.batteryLeft < 40) return { ok: false, reason: 'battery-low', battery: state.batteryLeft };
    const rival = rivalId ? DRONE_RIVALS.find((r) => r.id === rivalId) : null;
    state.race = { track: trackId, rival: rival ? rival.id : null, gatesDone: 0, lapsDone: 0 };
    state.gate = 0;
    state.lap = 1;
    state.raceTime = 0;
    state.combo = 0;
    state.comboPoints = 0;
    log(`Race started: ${track.name}${rival ? ` vs ${rival.name}` : ''} — ${track.laps} laps, ${track.gates} gates.`);
    return { ok: true, track: trackId, rival: rival ? rival.id : null };
  }

  function passGate() {
    if (!state.race) return { ok: false, reason: 'no-race' };
    const track = DRONE_TRACKS.find((t) => t.id === state.race.track) || DRONE_NIGHT_TRACKS.find((t) => t.id === state.race.track);
    state.gate += 1;
    state.race.gatesDone += 1;
    state.batteryLeft = Math.max(0, state.batteryLeft - 2);
    const st = currentStats();
    state.raceTime += track.parTime / (track.gates * track.laps) * (100 / st.topSpeed);
    if (state.gate >= track.gates) {
      state.gate = 0;
      state.lap += 1;
      state.race.lapsDone += 1;
      log(`Lap ${state.lap - 1}/${track.laps} done on ${track.name}.`);
      if (state.lap > track.laps) return finishRace();
    }
    return { ok: true, gate: state.gate, lap: state.lap, time: Math.round(state.raceTime * 10) / 10 };
  }

  function doTrick(trickId) {
    const trick = DRONE_TRICKS.find((t) => t.id === trickId);
    if (!trick) return { ok: false, reason: 'no-such-trick' };
    if (!state.race) return { ok: false, reason: 'no-race' };
    const st = currentStats();
    const risk = trick.risk * (1 - st.agility / 300);
    if (rng() < risk) {
      state.crashes += 1;
      state.combo = 0;
      state.comboPoints = 0;
      state.durability = Math.max(5, state.durability - 15);
      state.repairsNeeded += 1;
      log(`Crashed mid-${trick.name}! Combo lost, airframe bent.`);
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
    const track = DRONE_TRACKS.find((t) => t.id === state.race.track) || DRONE_NIGHT_TRACKS.find((t) => t.id === state.race.track);
    const myTime = droneRaceTime(track, currentStats(), rng);
    const rival = state.race.rival ? DRONE_RIVALS.find((r) => r.id === state.race.rival) : null;
    const rivalTime = rival ? droneRivalTime(rival, track, rng) : null;
    let place = 1;
    if (rivalTime !== null && rivalTime < myTime) place = 2;
    if (rng() < 0.15) place = Math.min(3, place + 1);
    const prize = dronePrizeFor(track, state.rank, place) + Math.floor(state.comboPoints / 10);
    state.race = null;
    state.racesFlown += 1;
    state.dailyRaces += 1;
    state.batteryLeft = Math.max(0, state.batteryLeft - 15);
    if (place === 1) {
      state.wins += 1;
      state.podiums += 1;
      if (rival) state.rivalBeaten[rival.id] = (state.rivalBeaten[rival.id] || 0) + 1;
    } else if (place <= 3) state.podiums += 1;
    if (!state.bestTimes[track.id] || myTime < state.bestTimes[track.id]) state.bestTimes[track.id] = myTime;
    state.earned += prize;
    addCash(prize);
    gainXp(place === 1 ? 50 : 25);
    if (state.league) leagueRaceDone(place);
    checkSponsors();
    log(`Race over: ${track.name} in ${myTime}s — P${place}, $${prize}${rival ? ` (rival ${rivalTime}s)` : ''}.`);
    return { ok: true, time: myTime, rivalTime, place, prize, comboPoints: state.comboPoints };
  }

  function forfeitRace() {
    if (!state.race) return { ok: false, reason: 'no-race' };
    state.race = null;
    state.combo = 0;
    state.comboPoints = 0;
    log('Race forfeited.');
    return { ok: true };
  }

  function startTimeTrial(trackId) {
    const track = DRONE_TRACKS.find((t) => t.id === trackId);
    if (!track) return { ok: false, reason: 'no-such-track' };
    if (state.race) return { ok: false, reason: 'race-active' };
    state.race = { track: trackId, rival: null, gatesDone: 0, lapsDone: 0, trial: true };
    state.gate = 0;
    state.lap = 1;
    state.raceTime = 0;
    log(`Time trial started: ${track.name}. Beat ${state.bestTrial[trackId] || track.parTime}s.`);
    return { ok: true, track: trackId };
  }

  function finishTrial() {
    if (!state.race || !state.race.trial) return { ok: false, reason: 'no-trial' };
    const track = DRONE_TRACKS.find((t) => t.id === state.race.track) || DRONE_NIGHT_TRACKS.find((t) => t.id === state.race.track);
    const myTime = droneRaceTime(track, currentStats(), rng);
    const prev = state.bestTrial[track.id];
    const improved = !prev || myTime < prev;
    if (improved) state.bestTrial[track.id] = myTime;
    state.race = null;
    state.timeTrials += 1;
    const bonus = improved ? 60 + state.rank * 20 : 10;
    state.earned += bonus;
    addCash(bonus);
    gainXp(improved ? 30 : 10);
    log(`Time trial ${track.name}: ${myTime}s ${improved ? '(new best!)' : ''} — $${bonus}.`);
    return { ok: true, time: myTime, improved, bonus };
  }

  function enterLeague(leagueId) {
    const league = DRONE_LEAGUES.find((l) => l.id === leagueId);
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
    const league = DRONE_LEAGUES.find((l) => l.id === state.league);
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
    const s = DRONE_SPONSORS.find((x) => x.id === id);
    if (!s) return { ok: false, reason: 'no-such-sponsor' };
    if (state.sponsors.includes(id)) return { ok: false, reason: 'already-signed' };
    if (state.rank < 1 && s.id !== 'voltcorp') return { ok: false, reason: 'rank-too-low' };
    state.sponsors.push(id);
    state.sponsorProgress[id] = 0;
    log(`Sponsor signed: ${s.name} — ${s.desc}`);
    return { ok: true, id };
  }

  function checkSponsors() {
    for (const s of DRONE_SPONSORS) {
      if (!state.sponsors.includes(s.id)) continue;
      const have = s.need === 'races' ? state.racesFlown : s.need === 'tricks' ? state.tricksLanded : s.need === 'wins' ? state.wins : state.leagueTitles;
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
    const st = currentStats();
    const missing = st.durability - state.durability;
    if (missing <= 0) return { ok: false, reason: 'no-damage' };
    const cost = Math.ceil(missing * 2);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.repairsPaid += cost;
    state.durability = st.durability;
    state.repairsNeeded = 0;
    log(`Drone repaired for $${cost} — airframe good as new.`);
    return { ok: true, cost };
  }

  function recharge() {
    if (state.batteryLeft >= 100) return { ok: false, reason: 'already-full' };
    const cost = Math.ceil((100 - state.batteryLeft) / 10);
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.batteryLeft = 100;
    return { ok: true, cost };
  }

  function tick(dt) {
    if (state.race) {
      state.raceTime += dt;
      const drain = dt * 0.4;
      state.batteryLeft = Math.max(0, state.batteryLeft - drain);
      if (state.batteryLeft <= 0) {
        log('Battery dead mid-race — the drone drops out of the sky.');
        state.crashes += 1;
        state.race = null;
        state.combo = 0;
        state.comboPoints = 0;
        state.durability = Math.max(5, state.durability - 20);
        state.repairsNeeded += 1;
      }
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyRaces = 0;
    state.batteryLeft = 100;
    if (rng() < 0.25) {
      const track = DRONE_TRACKS[Math.floor(rng() * DRONE_TRACKS.length)];
      log(`Drone club notice: ${track.name} runs a double-prize night tonight.`);
    }
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, owned: state.owned,
      activeDrone: state.activeDrone, parts: state.parts,
      installed: state.installed, racesFlown: state.racesFlown,
      wins: state.wins, podiums: state.podiums,
      bestTimes: state.bestTimes, totalTricks: state.totalTricks,
      tricksLanded: state.tricksLanded, crashes: state.crashes,
      repairsPaid: state.repairsPaid, earned: state.earned,
      spent: state.spent, combo: state.combo, bestCombo: state.bestCombo,
      comboPoints: state.comboPoints, race: state.race, gate: state.gate,
      lap: state.lap, raceTime: state.raceTime,
      batteryLeft: state.batteryLeft, durability: state.durability,
      league: state.league, leagueRace: state.leagueRace,
      leaguePoints: state.leaguePoints, leagueWins: state.leagueWins,
      leagueTitles: state.leagueTitles, sponsors: state.sponsors,
      sponsorProgress: state.sponsorProgress,
      timeTrials: state.timeTrials, bestTrial: state.bestTrial,
      lastDay: state.lastDay, dailyRaces: state.dailyRaces,
      rivalBeaten: state.rivalBeaten, repairsNeeded: state.repairsNeeded,
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
      rank: DRONE_RANKS[state.rank].name,
      xp: state.xp,
      drone: state.activeDrone,
      owned: state.owned.length,
      parts: state.parts.length,
      racesFlown: state.racesFlown,
      wins: state.wins,
      podiums: state.podiums,
      tricksLanded: state.tricksLanded,
      bestCombo: state.bestCombo,
      crashes: state.crashes,
      earned: Math.round(state.earned),
      spent: state.spent,
      repairsPaid: state.repairsPaid,
      league: state.league,
      leagueTitles: state.leagueTitles,
      sponsors: state.sponsors.length,
      timeTrials: state.timeTrials,
      battery: Math.round(state.batteryLeft),
      durability: Math.round(state.durability),
      racing: !!state.race,
      gate: state.gate,
      lap: state.lap,
      dailyRaces: state.dailyRaces,
    };
  }

  function hudLine() {
    if (state.race) {
      const track = DRONE_TRACKS.find((t) => t.id === state.race.track);
      return `Drone: ${track.name} L${state.lap}/${track.laps} G${state.gate} — ${Math.round(state.batteryLeft)}% batt`;
    }
    if (state.league) return `Drone: ${state.league} — race ${state.leagueRace + 1}, ${state.leaguePoints} pts`;
    if (state.durability < 40) return `Drone: ${state.activeDrone} needs repair (${Math.round(state.durability)}%)`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearField = Math.hypot(pos.x - 60, pos.z - 140) < 30;
    if (!nearField) return false;
    if (state.race) { passGate(); return true; }
    return false;
  }

  function trackList() {
    return DRONE_TRACKS.map((t) => ({
      id: t.id, name: t.name, gates: t.gates, laps: t.laps,
      difficulty: t.difficulty, prize: t.prize,
      best: state.bestTimes[t.id] || null,
    }));
  }

  function hangar() {
    return DRONE_MODELS.map((m) => ({
      id: m.id, name: m.name, cost: m.cost, owned: state.owned.includes(m.id),
      stats: droneStatsFor(m.id, m.id === state.activeDrone ? state.parts : []),
    }));
  }

  return {
    state, buyDrone, selectDrone, buyPart, removePart, startRace,
    passGate, doTrick, finishRace, forfeitRace, startTimeTrial,
    finishTrial, enterLeague, signSponsor, repair, recharge,
    tick, tickDay, serialize, deserialize, stats, hudLine, interact,
    trackList, hangar, currentStats,
  };
}

export const DRONE_FREESTYLE_SPOTS = [
  { id: 'pier', name: 'Old Pier', bonus: 1.2, desc: 'Tricks pay 20% more here.' },
  { id: 'quarry', name: 'Quarry Bowl', bonus: 1.4, desc: 'A natural amphitheatre for dives.' },
  { id: 'bridge', name: 'Bay Bridge', bonus: 1.3, desc: 'Under the span, wind funnels.' },
  { id: 'tower', name: 'Tower Gap', bonus: 1.5, desc: 'Between the two tallest towers.' },
];

export function droneFreestyleScore(tricks, spotId) {
  const spot = DRONE_FREESTYLE_SPOTS.find((s) => s.id === spotId);
  const mult = spot ? spot.bonus : 1;
  let total = 0;
  for (const t of tricks) {
    const def = DRONE_TRICKS.find((x) => x.id === t);
    if (def) total += def.points;
  }
  return Math.round(total * mult);
}

export function droneSeasonStandings(results) {
  const table = {};
  for (const r of results) {
    if (!table[r.pilot]) table[r.pilot] = 0;
    table[r.pilot] += r.place === 1 ? 10 : r.place === 2 ? 6 : r.place === 3 ? 4 : 1;
  }
  return Object.entries(table)
    .map(([pilot, points]) => ({ pilot, points }))
    .sort((a, b) => b.points - a.points);
}

export function droneWeatherPenalty(condition) {
  if (condition === 'storm') return 0.75;
  if (condition === 'rain') return 0.88;
  if (condition === 'wind') return 0.92;
  return 1;
}

export const DRONE_CHALLENGES = [
  { id: 'first-win', name: 'First Win', target: 'wins', goal: 1, xp: 40, desc: 'Win your first race.' },
  { id: 'ten-races', name: 'Ten Races', target: 'racesFlown', goal: 10, xp: 60, desc: 'Fly 10 races.' },
  { id: 'trick-50', name: 'Trick Master', target: 'tricksLanded', goal: 50, xp: 80, desc: 'Land 50 tricks.' },
  { id: 'combo-10', name: 'Combo King', target: 'bestCombo', goal: 10, xp: 100, desc: 'Build a 10-trick combo.' },
  { id: 'league-title', name: 'Champion', target: 'leagueTitles', goal: 1, xp: 150, desc: 'Win a league title.' },
  { id: 'all-tracks', name: 'Track Explorer', target: 'tracksWon', goal: 8, xp: 120, desc: 'Win on all 8 tracks.' },
  { id: 'sponsor-3', name: 'Sponsored', target: 'sponsors', goal: 3, xp: 70, desc: 'Sign 3 sponsors.' },
  { id: 'trial-5', name: 'Time Trialist', target: 'timeTrials', goal: 5, xp: 60, desc: 'Fly 5 time trials.' },
  { id: 'rival-5', name: 'Rival Slayer', target: 'rivalsBeaten', goal: 5, xp: 90, desc: 'Beat 5 different rivals.' },
  { id: 'rich-pilot', name: 'Rich Pilot', target: 'earned', goal: 5000, xp: 140, desc: 'Earn $5,000 from drone racing.' },
];

export const DRONE_NIGHT_TRACKS = [
  { id: 'neon-alley', name: 'Neon Alley', gates: 9, laps: 3, difficulty: 3, parTime: 165, prize: 350, desc: 'Between the billboards, all glow.' },
  { id: 'dock-lights', name: 'Dock Lights', gates: 10, laps: 3, difficulty: 2, parTime: 170, prize: 280, desc: 'Crane lights and container shadows.' },
  { id: 'casino-roof', name: 'Casino Roof', gates: 12, laps: 2, difficulty: 4, parTime: 175, prize: 520, desc: 'Over the casino, under the searchlights.' },
  { id: 'harbor-fog', name: 'Harbor Fog', gates: 8, laps: 3, difficulty: 4, parTime: 180, prize: 460, desc: 'Fog, fog lights, and faith.' },
  { id: 'midnight-bay', name: 'Midnight Bay', gates: 11, laps: 3, difficulty: 3, parTime: 175, prize: 400, desc: 'The bay at midnight, black glass.' },
  { id: 'ferris', name: 'Ferris Loop', gates: 10, laps: 2, difficulty: 5, parTime: 190, prize: 640, desc: 'Around the pier wheel, twice.' },
];

export const DRONE_WEATHER = [
  { id: 'calm', name: 'Calm', speed: 1.05, risk: 0.8, desc: 'Perfect air, fast times.' },
  { id: 'breeze', name: 'Breeze', speed: 1.0, risk: 1.0, desc: 'Normal flying weather.' },
  { id: 'gusty', name: 'Gusty', speed: 0.95, risk: 1.3, desc: 'Wind grabs the light frames.' },
  { id: 'storm', name: 'Storm', speed: 0.9, risk: 1.6, desc: 'Only the brave fly.' },
  { id: 'night', name: 'Night Calm', speed: 1.0, risk: 1.1, desc: 'Cool, still, dark gates.' },
];

export const DRONE_CREWS = [
  { id: 'pit-crew', name: 'Pit Crew', wage: 40, skill: 'repair', value: 0.3, desc: 'Repairs cost 30% less.' },
  { id: 'spotter', name: 'Spotter', wage: 35, skill: 'spot', value: 0.2, desc: 'Calls the gates early: +10% race pace.' },
  { id: 'tuner', name: 'Tuner', wage: 60, skill: 'tune', value: 0.15, desc: 'Parts work 15% better.' },
  { id: 'manager', name: 'Team Manager', wage: 80, skill: 'money', value: 0.15, desc: 'Prizes pay 15% more.' },
];

export function droneChallengeProgress(challenge, state) {
  const v = challenge.target === 'tracksWon'
    ? Object.keys(state.bestTimes).length
    : challenge.target === 'rivalsBeaten'
      ? Object.keys(state.rivalBeaten).length
      : state[challenge.target] || 0;
  return { id: challenge.id, name: challenge.name, have: Math.floor(v), goal: challenge.goal, done: v >= challenge.goal };
}

export function droneNightRaceTime(track, droneStats, rng) {
  const base = track.parTime;
  const speedFactor = 100 / droneStats.topSpeed;
  const agilityFactor = 1 + (80 - droneStats.agility) / 400;
  const wobble = 0.94 + rng() * 0.12;
  return Math.round(base * speedFactor * agilityFactor * wobble * 1.05 * 10) / 10;
}

export function createDroneCrew(system) {
  const crew = [];
  let wagesPaid = 0;

  function hire(id) {
    const m = DRONE_CREWS.find((x) => x.id === id);
    if (!m) return { ok: false, reason: 'no-such-crew' };
    if (crew.includes(id)) return { ok: false, reason: 'already-hired' };
    crew.push(id);
    return { ok: true, id, name: m.name, wage: m.wage };
  }

  function fire(id) {
    const i = crew.indexOf(id);
    if (i < 0) return { ok: false, reason: 'not-hired' };
    crew.splice(i, 1);
    return { ok: true, id };
  }

  function payWages() {
    let due = 0;
    for (const id of crew) {
      const m = DRONE_CREWS.find((x) => x.id === id);
      due += m.wage;
    }
    wagesPaid += due;
    return { due, crew: [...crew], totalPaid: wagesPaid };
  }

  function bonus(skill) {
    let b = 0;
    for (const id of crew) {
      const m = DRONE_CREWS.find((x) => x.id === id);
      if (m.skill === skill) b += m.value;
    }
    return b;
  }

  function challenges() {
    return DRONE_CHALLENGES.map((ch) => droneChallengeProgress(ch, system.state));
  }

  function nightRace(trackId) {
    const track = DRONE_NIGHT_TRACKS.find((t) => t.id === trackId);
    if (!track) return { ok: false, reason: 'no-such-track' };
    if (system.state.race) return { ok: false, reason: 'race-active' };
    if (system.state.durability < 30) return { ok: false, reason: 'needs-repair' };
    system.state.race = { track: trackId, rival: null, gatesDone: 0, lapsDone: 0, night: true };
    system.state.gate = 0;
    system.state.lap = 1;
    system.state.raceTime = 0;
    system.state.combo = 0;
    system.state.comboPoints = 0;
    return { ok: true, track: trackId, night: true, gates: track.gates, laps: track.laps };
  }

  return {
    hire, fire, payWages, bonus, challenges, nightRace,
    get members() { return [...crew]; },
    get paid() { return wagesPaid; },
  };
}

export function droneRepairCost(durability, maxDurability, crewBonus) {
  const missing = maxDurability - durability;
  if (missing <= 0) return 0;
  const cost = Math.ceil(missing * 2 * (1 - crewBonus));
  return Math.max(0, cost);
}

export function droneSeasonPoints(races, wins, titles) {
  return races * 2 + wins * 10 + titles * 100;
}

export function droneBestTrack(bestTimes) {
  let best = null;
  let bestTime = Infinity;
  for (const [track, time] of Object.entries(bestTimes)) {
    if (time < bestTime) { bestTime = time; best = track; }
  }
  return best ? { track: best, time: bestTime } : null;
}

export const DRONE_TIPS = [
  { id: 'gates-first', name: 'Gates First', text: 'A missed gate costs more than a slow lap.' },
  { id: 'battery-watch', name: 'Watch the Battery', text: 'Land with 20% left or walk home.' },
  { id: 'wind-lines', name: 'Wind Lines', text: 'Fly the wind, do not fight it.' },
  { id: 'tricks-late', name: 'Tricks Late', text: 'Trick on the last lap, when the race is won.' },
  { id: 'props-check', name: 'Check the Props', text: 'A chipped prop is a crash waiting to happen.' },
  { id: 'sponsor-early', name: 'Sponsors Early', text: 'Sign VoltCorp before your first league.' },
  { id: 'night-practice', name: 'Night Practice', text: 'Night tracks teach smooth flying.' },
  { id: 'repair-now', name: 'Repair Now', text: 'A bent frame flies crooked. Fix it today.' },
];

export const DRONE_LEADERBOARD = [
  { pilot: 'Sable', points: 240, desc: 'The reigning champion.' },
  { pilot: 'Kira', points: 210, desc: 'Fast, angry, brilliant.' },
  { pilot: 'Dutch', points: 185, desc: 'Lines like a ruler.' },
  { pilot: 'Ria', points: 0, desc: 'You. Climbing.' },
  { pilot: 'Nova', points: 160, desc: 'All aggression, no brakes.' },
  { pilot: 'Vex', points: 140, desc: 'Steady as a metronome.' },
];

export function droneTipFor(day) {
  return DRONE_TIPS[day % DRONE_TIPS.length];
}

export function droneLeaderboardWith(playerPoints) {
  const board = DRONE_LEADERBOARD.map((e) => ({
    pilot: e.pilot, points: e.pilot === 'Ria' ? playerPoints : e.points, desc: e.desc,
  }));
  board.sort((a, b) => b.points - a.points);
  return board.map((e, i) => ({ rank: i + 1, ...e }));
}

export function droneBatteryDrain(gates, laps, trickCount) {
  return Math.round((gates * laps * 2 + trickCount * 1.5) * 10) / 10;
}

export function droneCrashCost(durabilityLost) {
  return Math.ceil(durabilityLost * 2);
}

export function droneBestPartFor(slot, budget) {
  const options = DRONE_PARTS.filter((p) => p.slot === slot && p.cost <= budget);
  if (options.length === 0) return null;
  options.sort((a, b) => (b.speed + b.agility) - (a.speed + a.agility));
  return options[0];
}

export function droneRivalTaunt(rivalId) {
  const r = DRONE_RIVALS.find((x) => x.id === rivalId);
  return r ? r.taunt : 'Good luck out there.';
}

export function droneTrackDifficultyLabel(difficulty) {
  if (difficulty <= 1) return 'Easy';
  if (difficulty === 2) return 'Medium';
  if (difficulty === 3) return 'Hard';
  if (difficulty === 4) return 'Expert';
  return 'Insane';
}

export const DRONE_RECORDS = [
  { id: 'most-wins', name: 'Most Wins', stat: 'wins', unit: 'wins', desc: 'Most race wins.' },
  { id: 'best-combo', name: 'Best Combo', stat: 'bestCombo', unit: 'tricks', desc: 'Longest trick combo.' },
  { id: 'most-tricks', name: 'Most Tricks', stat: 'tricksLanded', unit: 'tricks', desc: 'Most tricks landed.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money from racing.' },
  { id: 'most-races', name: 'Most Races', stat: 'racesFlown', unit: 'races', desc: 'Most races flown.' },
];

export function droneRecordFor(recordId, state) {
  const r = DRONE_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function droneAllRecords(state) {
  return DRONE_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function droneWinRate(wins, races) {
  if (races === 0) return 0;
  return Math.round((wins / races) * 100);
}

export function droneCrashRate(crashes, races) {
  if (races === 0) return 0;
  return Math.round((crashes / races) * 100) / 100;
}

export function dronePilotGrade(wins, races, bestCombo) {
  const rate = droneWinRate(wins, races);
  if (rate >= 60 && bestCombo >= 8) return 'S';
  if (rate >= 40) return 'A';
  if (rate >= 25) return 'B';
  if (rate >= 10) return 'C';
  return 'D';
}

export const DRONE_SEASONAL_EVENTS = [
  { id: 'spring-cup', name: 'Spring Cup', season: 'spring', prize: 800, desc: 'The season opener.' },
  { id: 'summer-slam', name: 'Summer Slam', season: 'summer', prize: 1200, desc: 'The big summer race.' },
  { id: 'autumn-classic', name: 'Autumn Classic', season: 'autumn', prize: 1000, desc: 'Cool air, fast times.' },
  { id: 'winter-invitational', name: 'Winter Invitational', season: 'winter', prize: 1500, desc: 'Invite only, under lights.' },
];

export function droneSeasonalEvent(seasonId) {
  return DRONE_SEASONAL_EVENTS.find((x) => x.season === seasonId) || null;
}

export function droneEventPrize(eventId, place) {
  const e = DRONE_SEASONAL_EVENTS.find((x) => x.id === eventId);
  if (!e) return 0;
  return place === 1 ? e.prize : place === 2 ? Math.round(e.prize / 2) : Math.round(e.prize / 4);
}

export function droneLapTimeAverage(totalTime, laps) {
  if (laps === 0) return 0;
  return Math.round((totalTime / laps) * 10) / 10;
}

export function droneGateAccuracy(gatesDone, gatesTotal) {
  if (gatesTotal === 0) return 100;
  return Math.round((gatesDone / gatesTotal) * 100);
}

export const DRONE_QUICK_START = [
  'Fly the Sparrow until you can afford the Hornet.',
  'Buy sport motors before your first league.',
  'Practice time trials to learn the gates.',
  'Trick on the last lap, never the first.',
  'Repair after every crash. A bent frame flies crooked.',
  'Sign VoltCorp early for steady sponsor cash.',
];

export function droneQuickStart(step) {
  return DRONE_QUICK_START[step] || null;
}

export function droneTotalValue(state) {
  const owned = state.owned.length;
  const parts = state.parts.length;
  return owned * 500 + parts * 200;
}

export function droneProgressPercent(state) {
  const total = state.racesFlown + state.timeTrials;
  if (total === 0) return 0;
  return Math.round((state.wins / total) * 100);
}

export function droneSummary(state) {
  return `${DRONE_RANKS[state.rank].name}: ${state.racesFlown} races, ${state.wins} wins, ${state.tricksLanded} tricks, $${Math.round(state.earned)} earned.`;
}

export function droneNextGoal(state) {
  if (state.racesFlown < 3) return 'Fly 3 races.';
  if (state.wins < 1) return 'Win your first race.';
  if (state.leagueTitles < 1) return 'Win a league title.';
  return 'Become the Ace of Solara.';
}

export const DRONE_META = {
  system: 'droneRacing', version: '7b-B', author: 'builder-B',
  files: 1, lines: 932, features: ['races', 'tricks', 'leagues', 'sponsors', 'parts', 'trials'],
};

export function droneMeta() {
  return { ...DRONE_META };
}

export const DRONE_GEAR_GUIDE = [
  { slot: 'motors', advice: 'Speed first. Motors win races.' },
  { slot: 'props', advice: 'Agility for tight tracks.' },
  { slot: 'battery', advice: 'Long races need long cells.' },
  { slot: 'frame', advice: 'A cage frame saves repair bills.' },
  { slot: 'camera', advice: 'See the gates early, fly them clean.' },
];

export function droneGearAdvice(slot) {
  const g = DRONE_GEAR_GUIDE.find((x) => x.slot === slot);
  return g ? g.advice : 'Fly safe.';
}

export function droneUpgradePath(budget) {
  return DRONE_PARTS.filter((p) => p.cost <= budget).map((p) => p.id);
}
