// surfing.js — Surfing: waves, tricks, and competitions.
// Paddle out, catch a wave, and ride it: balance on the board, carve,
// cut back, and throw aerials before the wave closes out. Bigger waves
// mean bigger scores and bigger wipeouts. Win local contests, get a
// sponsor, and chase the perfect 10 at the Pipeline Invitational. The
// swell forecast decides everything — check it before you paddle out.
// Pure logic, no rendering, no imports.
// Factory: createSurfingSystem(deps) with deps { rng, getHour, getDay,
// getCash, addCash, addHeat, log, getPlayerPos, getWeather }.

// ---------------------------------------------------------------------------
// Data tables
// ---------------------------------------------------------------------------

// Surf beaches: wave size range, crowd, danger, local vibe.
export const SURF_BEACHES = [
  { id: 'beginner-bay', name: 'Beginner Bay', minWave: 1, maxWave: 3, crowd: 4, danger: 1, fee: 0, desc: 'Small, soft, forgiving. Learn here.' },
  { id: 'vice-beach', name: 'Vice Beach', minWave: 2, maxWave: 5, crowd: 5, danger: 2, fee: 0, desc: 'The main break. Crowded but consistent.' },
  { id: 'south-point', name: 'South Point', minWave: 3, maxWave: 6, crowd: 2, danger: 2, fee: 0, desc: 'A long right-hander. Locals only, mostly.' },
  { id: 'reef-break', name: 'Reef Break', minWave: 4, maxWave: 8, crowd: 1, danger: 4, fee: 0, desc: 'Shallow reef. Heavy waves, heavy consequences.' },
  { id: 'pipeline', name: 'Pipeline', minWave: 6, maxWave: 12, crowd: 3, danger: 5, fee: 100, desc: 'The wave. Barrels that swallow boards whole.' },
  { id: 'sunset-cliffs', name: 'Sunset Cliffs', minWave: 3, maxWave: 7, crowd: 2, danger: 3, fee: 0, desc: 'Golden light, rocky entry, great sunset sessions.' },
  { id: 'secret-cove', name: 'Secret Cove', minWave: 2, maxWave: 6, crowd: 0, danger: 2, fee: 0, desc: 'A hidden cove. Nobody tells you where it is.' },
  { id: 'storm-surf', name: 'Storm Surf', minWave: 5, maxWave: 10, crowd: 0, danger: 5, fee: 0, desc: 'Only breaks in a storm. Only madmen surf it.' },
  { id: 'river-mouth', name: 'River Mouth', minWave: 2, maxWave: 4, crowd: 1, danger: 2, fee: 0, desc: 'Shifty peaks where the river meets the sea.' },
  { id: 'north-shore', name: 'North Shore', minWave: 4, maxWave: 9, crowd: 2, danger: 4, fee: 50, desc: 'Big winter swell, big reputation.' },
  { id: 'lagoon', name: 'Lagoon', minWave: 1, maxWave: 2, crowd: 3, danger: 1, fee: 0, desc: 'Flat and tiny. Longboard heaven.' },
  { id: 'shipwreck', name: 'Shipwreck', minWave: 3, maxWave: 7, crowd: 1, danger: 3, fee: 0, desc: 'Breaks over a wreck. The wave is worth it.' },
];

// Surfboards: length, stability, speed, trick bonus.
export const SURFBOARDS = [
  { id: 'foam', name: 'Foam Board', price: 0, length: 9, stability: 5, speed: 1, trick: 0, desc: 'Big, soft, impossible to hurt yourself on.' },
  { id: 'longboard', name: 'Longboard', price: 200, length: 9, stability: 4, speed: 1.2, trick: 0.1, desc: 'Glide, cross-step, and hang ten.' },
  { id: 'funboard', name: 'Funboard', price: 350, length: 7.5, stability: 4, speed: 1.3, trick: 0.2, desc: 'The all-rounder. Fun is in the name.' },
  { id: 'shortboard', name: 'Shortboard', price: 500, length: 6, stability: 3, speed: 1.6, trick: 0.5, desc: 'Sharp turns, big airs, real surfing.' },
  { id: 'fish', name: 'Fish', price: 450, length: 5.8, stability: 3, speed: 1.7, trick: 0.4, desc: 'Fast in small waves. Loose and fun.' },
  { id: 'gun', name: 'Big Wave Gun', price: 900, length: 8, stability: 3, speed: 1.8, trick: 0.2, desc: 'For waves that could kill you.' },
  { id: 'hybrid', name: 'Hybrid', price: 650, length: 6.5, stability: 3, speed: 1.5, trick: 0.4, desc: 'Shortboard speed, fish forgiveness.' },
  { id: 'softtop', name: 'Soft Top Pro', price: 300, length: 7, stability: 5, speed: 1.1, trick: 0.1, desc: 'Soft top, pro shape. Best of both.' },
  { id: 'retro', name: 'Retro Single Fin', price: 550, length: 7, stability: 3, speed: 1.4, trick: 0.3, desc: 'Old school style, smooth lines.' },
  { id: 'pro-model', name: 'Pro Model', price: 1500, length: 6.1, stability: 2, speed: 2.0, trick: 0.8, desc: 'The board the pros ride. Unforgiving, unreal.' },
];

// Surf tricks: difficulty, base score, balance cost.
export const SURF_TRICKS = [
  { id: 'bottom-turn', name: 'Bottom Turn', difficulty: 1, base: 10, balance: 2, desc: 'The foundation of every good ride.' },
  { id: 'cutback', name: 'Cutback', difficulty: 2, base: 25, balance: 5, desc: 'Turn back to the power source.' },
  { id: 'snap', name: 'Snap', difficulty: 2, base: 30, balance: 6, desc: 'A sharp turn at the lip.' },
  { id: 'floater', name: 'Floater', difficulty: 3, base: 40, balance: 8, desc: 'Float over the breaking section.' },
  { id: 'tube', name: 'Tube Ride', difficulty: 4, base: 80, balance: 12, desc: 'Inside the barrel. The holy grail.' },
  { id: 'aerial', name: 'Aerial', difficulty: 4, base: 70, balance: 14, desc: 'Launch off the lip and land it.' },
  { id: 'air-reverse', name: 'Air Reverse', difficulty: 5, base: 100, balance: 18, desc: 'Spin in the air, land backwards.' },
  { id: 'layback', name: 'Layback Snap', difficulty: 3, base: 45, balance: 9, desc: 'Lean back, snap hard, look good.' },
  { id: 'roundhouse', name: 'Roundhouse Cutback', difficulty: 3, base: 50, balance: 10, desc: 'A full 180 back to the pocket.' },
  { id: 'hang-ten', name: 'Hang Ten', difficulty: 2, base: 35, balance: 7, desc: 'Ten toes over the nose.' },
  { id: 'hang-five', name: 'Hang Five', difficulty: 1, base: 20, balance: 4, desc: 'Five toes. Classic style.' },
  { id: 'cross-step', name: 'Cross Step', difficulty: 2, base: 25, balance: 5, desc: 'Walk the board like a catwalk.' },
  { id: 'tail-slide', name: 'Tail Slide', difficulty: 4, base: 60, balance: 13, desc: 'Slide the tail, stay on your feet.' },
  { id: '360', name: '360 Spin', difficulty: 4, base: 65, balance: 15, desc: 'A full spin on the wave face.' },
  { id: 'superman', name: 'Superman Air', difficulty: 5, base: 110, balance: 20, desc: 'Fly like Superman, land like a pro.' },
  { id: 'barrel-roll', name: 'Barrel Roll', difficulty: 5, base: 120, balance: 22, desc: 'Roll inside the tube. Insane.' },
  { id: 'kickflip', name: 'Kickflip', difficulty: 5, base: 95, balance: 19, desc: 'Flip the board under your feet, mid-air.' },
  { id: 'double-aerial', name: 'Double Aerial', difficulty: 6, base: 150, balance: 25, desc: 'Two airs, one wave. Contest winner.' },
  { id: 'soul-arch', name: 'Soul Arch', difficulty: 3, base: 40, balance: 8, desc: 'Arch your back, ride with style.' },
  { id: 'el-rollo', name: 'El Rollo', difficulty: 4, base: 75, balance: 14, desc: 'Flip over the falls and ride out.' },
];

// Wetsuits: warmth, flexibility, price.
export const WETSUITS = [
  { id: 'trunks', name: 'Boardshorts', price: 0, warmth: 0, flex: 5, desc: 'Warm water only. Maximum freedom.' },
  { id: 'springsuit', name: 'Springsuit', price: 80, warmth: 1, flex: 4, desc: 'Short arms, short legs, a little warmth.' },
  { id: 'full-3mm', name: 'Full 3mm', price: 200, warmth: 2, flex: 4, desc: 'The everyday suit.' },
  { id: 'full-5mm', name: 'Full 5mm', price: 350, warmth: 3, flex: 3, desc: 'Cold water armour.' },
  { id: 'hooded', name: 'Hooded 6mm', price: 500, warmth: 4, flex: 2, desc: 'Storm surf survival gear.' },
];

// Surf competitions: beach, entry, prize, wave requirement.
export const SURF_COMPS = [
  { id: 'grom-cup', name: 'Grom Cup', beachId: 'beginner-bay', entry: 20, prize: 200, minRank: 'grom', desc: 'For the young and the new.' },
  { id: 'beach-open', name: 'Vice Beach Open', beachId: 'vice-beach', entry: 100, prize: 1000, minRank: 'local', desc: 'The weekly open at the main break.' },
  { id: 'point-classic', name: 'South Point Classic', beachId: 'south-point', entry: 250, prize: 3000, minRank: 'local', desc: 'Long rights, long rides.' },
  { id: 'reef-masters', name: 'Reef Masters', beachId: 'reef-break', entry: 500, prize: 8000, minRank: 'pro', desc: 'Heavy reef, heavy scores.' },
  { id: 'pipeline-inv', name: 'Pipeline Invitational', beachId: 'pipeline', entry: 2000, prize: 50000, minRank: 'pro', desc: 'The one that matters. Invite only.' },
  { id: 'north-shore-cup', name: 'North Shore Cup', beachId: 'north-shore', entry: 1000, prize: 20000, minRank: 'pro', desc: 'Winter swell championship.' },
  { id: 'sunset-session', name: 'Sunset Session', beachId: 'sunset-cliffs', entry: 150, prize: 1500, minRank: 'local', desc: 'Golden hour, judged on style.' },
  { id: 'storm-champs', name: 'Storm Championships', beachId: 'storm-surf', entry: 800, prize: 15000, minRank: 'legend', desc: 'Only runs in a storm. Only legends enter.' },
];

// Surfer ranks.
export const SURFER_RANKS = [
  { id: 'grom', name: 'Grom', xpNeeded: 0, perk: 'Learning to stand up.' },
  { id: 'local', name: 'Local', xpNeeded: 150, perk: 'Comps open up, +5% scores.' },
  { id: 'ripper', name: 'Ripper', xpNeeded: 500, perk: 'Bigger waves, +10% scores.' },
  { id: 'pro', name: 'Pro', xpNeeded: 1500, perk: 'Sponsors notice you, +20% scores.' },
  { id: 'legend', name: 'Surf Legend', xpNeeded: 4000, perk: '+35% scores, Pipeline invites.' },
];

// Sponsors: pay per month if you meet the requirements.
export const SPONSORS = [
  { id: 'local-shop', name: 'Local Surf Shop', monthly: 200, needWins: 1, needRank: 'local', desc: 'Free wax and a sticker on your board.' },
  { id: 'board-brand', name: 'Board Brand', monthly: 800, needWins: 3, needRank: 'ripper', desc: 'Free boards, every season.' },
  { id: 'wetsuit-co', name: 'Wetsuit Co', monthly: 1500, needWins: 5, needRank: 'pro', desc: 'Free suits and a travel budget.' },
  { id: 'energy-drink', name: 'Energy Drink', monthly: 5000, needWins: 10, needRank: 'pro', desc: 'Your face on a can. Real money.' },
  { id: 'watch-brand', name: 'Luxury Watch', monthly: 12000, needWins: 20, needRank: 'legend', desc: 'A watch worth more than a car.' },
];

// Surfing missions.
export const SURF_MISSIONS = [
  { id: 'first-wave', name: 'First Wave', desc: 'Catch and ride your first wave.', reward: 50 },
  { id: 'first-tube', name: 'In The Tube', desc: 'Ride inside a barrel.', reward: 300 },
  { id: 'first-aerial', name: 'Air Time', desc: 'Land an aerial.', reward: 400 },
  { id: 'score-100', name: 'Century', desc: 'Score 100+ points on one wave.', reward: 500 },
  { id: 'score-500', name: 'Big Numbers', desc: 'Score 500+ points on one wave.', reward: 1500 },
  { id: 'perfect-10', name: 'Perfect 10', desc: 'Score a perfect 10 ride.', reward: 2000 },
  { id: 'comp-win', name: 'Contest Winner', desc: 'Win any competition.', reward: 1000 },
  { id: 'pipeline-win', name: 'Pipeline Champion', desc: 'Win the Pipeline Invitational.', reward: 10000 },
  { id: 'sponsor-one', name: 'Sponsored', desc: 'Sign your first sponsor.', reward: 800 },
  { id: 'wipeout-10', name: 'Wipeout Survivor', desc: 'Wipe out 10 times and keep surfing.', reward: 300 },
];

// Swell forecast: day -> wave height multiplier per beach tier.
export const SWELL_FORECAST = [
  { day: 1, mult: 0.8, note: 'Small swell, clean conditions.' },
  { day: 2, mult: 1.0, note: 'Average day, fun waves.' },
  { day: 3, mult: 1.3, note: 'Swell building, good waves coming.' },
  { day: 4, mult: 1.6, note: 'Big swell! Overhead sets.' },
  { day: 5, mult: 1.1, note: 'Swell fading, still fun.' },
  { day: 6, mult: 0.9, note: 'Small day, longboard weather.' },
  { day: 7, mult: 1.4, note: 'Weekend swell, crowded lineup.' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clampNum(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

export function waveHeight(beach, swellMult, weather) {
  const base = beach.minWave + (beach.maxWave - beach.minWave) * 0.5;
  const weatherMult = weather === 'storm' ? 1.5 : weather === 'rain' ? 1.1 : 1;
  return Math.round(base * swellMult * weatherMult * 10) / 10;
}

export function trickScore(trick, waveFt, boardTrick, rankMult) {
  const waveBonus = 1 + (waveFt - 2) * 0.08;
  return Math.round(trick.base * waveBonus * (1 + boardTrick) * rankMult);
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createSurfingSystem(deps) {
  const d = deps || {};
  const rng = d.rng || Math.random;
  const getHour = d.getHour || (() => 12);
  const getDay = d.getDay || (() => 1);
  const getCash = d.getCash || (() => 0);
  const addCash = d.addCash || (() => {});
  const log = d.log || (() => {});
  const getPlayerPos = d.getPlayerPos || (() => ({ x: 0, z: 0 }));
  const getWeather = d.getWeather || (() => 'clear');

  const state = {
    xp: 0,
    rank: 'grom',
    boardId: 'foam',
    boardsOwned: ['foam'],
    wetsuitId: 'trunks',
    wetsuitsOwned: ['trunks'],
    wax: 5,
    beachId: null,
    wave: null,
    ride: null,
    totalRides: 0,
    totalWaves: 0,
    totalScore: 0,
    bestRide: null,
    bestWave: 0,
    wipeouts: 0,
    tubes: 0,
    aerials: 0,
    perfectTens: 0,
    compWins: 0,
    compEntries: {},
    sponsorId: null,
    sponsorPaidDay: 0,
    totalEarned: 0,
    missionsDone: {},
    day: 1,
    sessionsToday: 0,
    tricksLanded: {},
    energy: 100,
  };

  function rank() {
    return SURFER_RANKS.find((r) => r.id === state.rank) || SURFER_RANKS[0];
  }

  function scoreMult() {
    if (state.rank === 'legend') return 1.35;
    if (state.rank === 'pro') return 1.2;
    if (state.rank === 'ripper') return 1.1;
    if (state.rank === 'local') return 1.05;
    return 1;
  }

  function board() {
    return SURFBOARDS.find((b) => b.id === state.boardId) || SURFBOARDS[0];
  }

  function wetsuit() {
    return WETSUITS.find((w) => w.id === state.wetsuitId) || WETSUITS[0];
  }

  function swell() {
    const day = getDay();
    return SWELL_FORECAST[(day - 1) % SWELL_FORECAST.length];
  }

  function refreshRank() {
    let best = SURFER_RANKS[0];
    for (const r of SURFER_RANKS) if (state.xp >= r.xpNeeded) best = r;
    if (best.id !== state.rank) {
      state.rank = best.id;
      log(`Surfer rank up: ${best.name}! ${best.perk}`);
    }
  }

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const m = SURF_MISSIONS.find((x) => x.id === id);
    if (!m) return;
    let done = false;
    switch (id) {
      case 'first-wave': done = state.totalRides >= 1; break;
      case 'first-tube': done = state.tubes >= 1; break;
      case 'first-aerial': done = state.aerials >= 1; break;
      case 'score-100': done = state.bestRide !== null && state.bestRide.score >= 100; break;
      case 'score-500': done = state.bestRide !== null && state.bestRide.score >= 500; break;
      case 'perfect-10': done = state.perfectTens >= 1; break;
      case 'comp-win': done = state.compWins >= 1; break;
      case 'pipeline-win': done = (state.compWinsById && state.compWinsById['pipeline-inv']) >= 1; break;
      case 'sponsor-one': done = state.sponsorId !== null; break;
      case 'wipeout-10': done = state.wipeouts >= 10; break;
      default: done = false;
    }
    if (!done) return;
    state.missionsDone[id] = true;
    addCash(m.reward);
    log(`Surf mission complete: ${m.name} (+$${m.reward}).`);
  }

  function buyBoard(boardId) {
    const b = SURFBOARDS.find((x) => x.id === boardId);
    if (!b) return { ok: false, error: 'unknown board' };
    if (state.boardsOwned.includes(boardId)) {
      state.boardId = boardId;
      return { ok: true, equipped: boardId };
    }
    if (getCash() < b.price) return { ok: false, error: 'not enough cash' };
    addCash(-b.price);
    state.boardsOwned.push(boardId);
    state.boardId = boardId;
    log(`Bought ${b.name} ($${b.price}). Speed x${b.speed}, trick +${Math.round(b.trick * 100)}%.`);
    return { ok: true, board: b };
  }

  function buyWetsuit(suitId) {
    const w = WETSUITS.find((x) => x.id === suitId);
    if (!w) return { ok: false, error: 'unknown wetsuit' };
    if (state.wetsuitsOwned.includes(suitId)) {
      state.wetsuitId = suitId;
      return { ok: true, equipped: suitId };
    }
    if (getCash() < w.price) return { ok: false, error: 'not enough cash' };
    addCash(-w.price);
    state.wetsuitsOwned.push(suitId);
    state.wetsuitId = suitId;
    log(`Bought ${w.name} ($${w.price}).`);
    return { ok: true, wetsuit: w };
  }

  function buyWax(qty) {
    const n = clampNum(Math.floor(qty) || 1, 1, 20);
    const cost = n * 5;
    if (getCash() < cost) return { ok: false, error: 'not enough cash' };
    addCash(-cost);
    state.wax += n;
    return { ok: true, wax: state.wax, cost };
  }

  function forecast() {
    const s = swell();
    return SURF_BEACHES.map((b) => ({
      beach: b.name,
      id: b.id,
      waveFt: waveHeight(b, s.mult, getWeather()),
      crowd: b.crowd,
      danger: b.danger,
      note: s.note,
    }));
  }

  function goToBeach(beachId) {
    const beach = SURF_BEACHES.find((b) => b.id === beachId);
    if (!beach) return { ok: false, error: 'unknown beach' };
    if (beach.fee > 0) {
      if (getCash() < beach.fee) return { ok: false, error: 'not enough cash for the beach fee' };
      addCash(-beach.fee);
    }
    state.beachId = beachId;
    state.wave = null;
    state.ride = null;
    const s = swell();
    const height = waveHeight(beach, s.mult, getWeather());
    log(`At ${beach.name}. Swell ${height}ft. ${s.note}`);
    return { ok: true, beach, waveFt: height };
  }

  function paddleOut() {
    if (!state.beachId) return { ok: false, error: 'go to a beach first' };
    if (state.ride) return { ok: false, error: 'already riding' };
    if (state.energy < 20) return { ok: false, error: 'too tired — rest or eat first' };
    if (state.wax <= 0) return { ok: false, error: 'no wax left — buy wax first' };
    state.wax--;
    state.energy -= 10;
    const beach = SURF_BEACHES.find((b) => b.id === state.beachId);
    const s = swell();
    const height = waveHeight(beach, s.mult, getWeather());
    // Wave quality: sets come in groups; sometimes it is flat.
    const setWave = rng() < 0.7;
    const waveFt = setWave ? height * (0.8 + rng() * 0.5) : height * 0.4;
    state.wave = {
      ft: Math.round(waveFt * 10) / 10,
      quality: setWave ? 'set' : 'small',
      length: Math.round(8 + waveFt * 2 + rng() * 5),
      section: 0,
    };
    state.totalWaves++;
    log(`Paddled out. A ${state.wave.ft}ft ${state.wave.quality} wave is coming...`);
    return { ok: true, wave: { ...state.wave } };
  }

  function catchWave() {
    if (!state.wave) return { ok: false, error: 'paddle out first' };
    if (state.ride) return { ok: false, error: 'already riding' };
    const beach = SURF_BEACHES.find((b) => b.id === state.beachId);
    const b = board();
    // Takeoff: timing matters. Big waves on a small board are risky.
    const risk = state.wave.ft / (b.stability * 2 + 2);
    if (rng() < clampNum(risk - 0.4, 0, 0.5)) {
      state.wipeouts++;
      state.wave = null;
      log('Missed the takeoff! The wave rolls you. Wipeout.');
      checkMission('wipeout-10');
      return { ok: true, caught: false, event: 'missed-takeoff' };
    }
    state.ride = {
      waveFt: state.wave.ft,
      length: state.wave.length,
      progress: 0,
      balance: 100,
      score: 0,
      tricks: [],
      sections: state.wave.length,
      timeLeft: 10 + state.wave.ft * 2,
    };
    state.totalRides++;
    state.sessionsToday++;
    log(`Caught a ${state.wave.ft}ft wave! Ride it — balance, tricks, style.`);
    checkMission('first-wave');
    return { ok: true, caught: true, ride: { ...state.ride } };
  }

  function rideTick(dt, input) {
    const r = state.ride;
    if (!r) return { ok: false, error: 'not riding' };
    r.progress += dt;
    r.timeLeft -= dt;
    const b = board();
    // Balance drains over time; steering into the wave restores it.
    const carve = input && input.carve;
    const pump = input && input.pump;
    const drain = (1.5 + r.waveFt * 0.4 - b.stability * 0.3) * dt;
    r.balance = clampNum(r.balance - drain, 0, 100);
    if (carve) r.balance = clampNum(r.balance + 3 * dt, 0, 100);
    if (pump) r.balance = clampNum(r.balance + 1 * dt, 0, 100);
    // The wave closes out section by section.
    r.sections = Math.max(0, r.sections - dt * (0.5 + r.waveFt * 0.05));
    if (r.balance <= 0 || r.timeLeft <= 0 || r.sections <= 0) {
      return wipeout('balance');
    }
    return { ok: true, ride: { ...r, balance: Math.round(r.balance) } };
  }

  function doTrick(trickId) {
    const r = state.ride;
    if (!r) return { ok: false, error: 'not riding' };
    const trick = SURF_TRICKS.find((t) => t.id === trickId);
    if (!trick) return { ok: false, error: 'unknown trick' };
    const b = board();
    // Trick difficulty vs board stability and surfer skill.
    const skill = clampNum(1 - (['grom', 'local', 'ripper', 'pro', 'legend'].indexOf(state.rank)) * -0.12, 0.5, 1.2);
    const successChance = clampNum(0.9 - trick.difficulty * 0.09 + b.stability * 0.03 + (skill - 1) * 0.2, 0.15, 0.97);
    const roll = rng();
    if (roll > successChance) {
      r.balance = clampNum(r.balance - trick.balance, 0, 100);
      log(`Bailed on the ${trick.name}! Balance down.`);
      if (r.balance <= 0) return wipeout('trick');
      return { ok: true, landed: false, trick: trick.name, balance: Math.round(r.balance) };
    }
    const pts = trickScore(trick, r.waveFt, b.trick, scoreMult());
    r.score += pts;
    r.balance = clampNum(r.balance - trick.balance * 0.5, 0, 100);
    r.tricks.push({ name: trick.name, points: pts });
    state.tricksLanded[trickId] = (state.tricksLanded[trickId] || 0) + 1;
    if (trickId === 'tube' || trickId === 'barrel-roll') state.tubes++;
    if (trickId === 'aerial' || trickId === 'air-reverse' || trickId === 'superman' || trickId === 'double-aerial') state.aerials++;
    log(`Landed ${trick.name}! +${pts} points.`);
    checkMission('first-tube');
    checkMission('first-aerial');
    if (r.balance <= 0) return wipeout('trick');
    return { ok: true, landed: true, trick: trick.name, points: pts, score: r.score, balance: Math.round(r.balance) };
  }

  function wipeout(cause) {
    const r = state.ride;
    if (!r) return { ok: false, error: 'not riding' };
    state.wipeouts++;
    state.energy = Math.max(0, state.energy - 15);
    const beach = SURF_BEACHES.find((b) => b.id === state.beachId);
    const danger = beach ? beach.danger : 2;
    // Dangerous beaches hurt more on a wipeout.
    if (danger >= 4 && rng() < 0.3) {
      state.energy = Math.max(0, state.energy - 20);
      log(`Wipeout on the reef! That hurt. Energy ${Math.round(state.energy)}.`);
    } else {
      log(`Wipeout! (${cause}) Score kept: ${r.score}. Paddle back out.`);
    }
    const score = r.score;
    state.totalScore += score;
    state.ride = null;
    state.wave = null;
    checkMission('wipeout-10');
    return { ok: true, event: 'wipeout', score };
  }

  function endRide() {
    const r = state.ride;
    if (!r) return { ok: false, error: 'not riding' };
    // Kick out cleanly: full score counts, plus a style bonus.
    const styleBonus = Math.round(r.score * 0.1 * (r.tricks.length > 2 ? 1.5 : 1));
    const total = r.score + styleBonus;
    const rideScore = Math.min(10, Math.round((total / 60) * 10) / 1);
    const score10 = clampNum(Math.round(total / 60), 1, 10);
    state.totalScore += total;
    const ride = { score: total, tricks: r.tricks.length, waveFt: r.waveFt, score10, day: getDay() };
    if (!state.bestRide || total > state.bestRide.score) state.bestRide = { ...ride };
    if (score10 >= 10) state.perfectTens++;
    const xpGain = 10 + Math.floor(total / 10) + r.tricks.length * 5;
    state.xp += xpGain;
    state.ride = null;
    state.wave = null;
    state.energy = Math.max(0, state.energy - 5);
    log(`Ride finished: ${total} points (${score10}/10), ${r.tricks.length} tricks. +${xpGain} XP.`);
    refreshRank();
    checkMission('score-100');
    checkMission('score-500');
    checkMission('perfect-10');
    return { ok: true, ride, xp: xpGain };
  }

  function rest() {
    state.energy = 100;
    log('Rested on the beach. Energy full.');
    return { ok: true, energy: 100 };
  }

  function enterComp(compId) {
    const comp = SURF_COMPS.find((c) => c.id === compId);
    if (!comp) return { ok: false, error: 'unknown competition' };
    const rankOrder = SURFER_RANKS.map((r) => r.id);
    if (rankOrder.indexOf(state.rank) < rankOrder.indexOf(comp.minRank)) {
      return { ok: false, error: `needs rank ${comp.minRank}` };
    }
    const day = getDay();
    if (state.compEntries[compId] === day) return { ok: false, error: 'already entered today' };
    if (getCash() < comp.entry) return { ok: false, error: 'not enough cash for entry' };
    addCash(-comp.entry);
    state.compEntries[compId] = day;
    state.activeComp = { ...comp, bestScore: 0, rides: 0 };
    log(`Entered ${comp.name} ($${comp.entry}). Prize $${comp.prize}. Best 2 rides count.`);
    return { ok: true, comp };
  }

  function compRideScore() {
    // A competition ride: simulate a full ride from current skill.
    if (!state.activeComp) return { ok: false, error: 'not in a competition' };
    const b = board();
    const beach = SURF_BEACHES.find((x) => x.id === state.activeComp.beachId);
    const s = swell();
    const waveFt = waveHeight(beach, s.mult, getWeather());
    const base = 20 + rng() * 40;
    const skillBonus = ['grom', 'local', 'ripper', 'pro', 'legend'].indexOf(state.rank) * 12;
    const score = Math.round((base + skillBonus) * (1 + b.trick) * scoreMult() * (0.8 + waveFt * 0.05));
    state.activeComp.rides++;
    state.activeComp.bestScore = Math.max(state.activeComp.bestScore, score);
    state.totalScore += score;
    log(`Comp ride: ${score} points at ${state.activeComp.name}.`);
    if (state.activeComp.rides >= 2) return settleComp();
    return { ok: true, score, rides: state.activeComp.rides };
  }

  function settleComp() {
    const comp = state.activeComp;
    if (!comp) return { ok: false, error: 'not in a competition' };
    // Rivals' best scores: random around the expected range.
    const rivalBest = 45 + rng() * 60 + ['grom', 'local', 'ripper', 'pro', 'legend'].indexOf(comp.minRank) * 10;
    const won = comp.bestScore > rivalBest;
    state.activeComp = null;
    if (won) {
      addCash(comp.prize);
      state.totalEarned += comp.prize;
      state.compWins++;
      state.compWinsById = state.compWinsById || {};
      state.compWinsById[comp.id] = (state.compWinsById[comp.id] || 0) + 1;
      state.xp += 100;
      refreshRank();
      checkMission('comp-win');
      checkMission('pipeline-win');
      log(`WON ${comp.name}! ${comp.bestScore} beats ${Math.round(rivalBest)}. Prize $${comp.prize}.`);
      return { ok: true, won: true, score: comp.bestScore, rival: Math.round(rivalBest), prize: comp.prize };
    }
    log(`${comp.name}: your best ${comp.bestScore} lost to ${Math.round(rivalBest)}.`);
    return { ok: true, won: false, score: comp.bestScore, rival: Math.round(rivalBest), prize: 0 };
  }

  function signSponsor(sponsorId) {
    const s = SPONSORS.find((x) => x.id === sponsorId);
    if (!s) return { ok: false, error: 'unknown sponsor' };
    const rankOrder = SURFER_RANKS.map((r) => r.id);
    if (rankOrder.indexOf(state.rank) < rankOrder.indexOf(s.needRank)) {
      return { ok: false, error: `needs rank ${s.needRank}` };
    }
    if (state.compWins < s.needWins) {
      return { ok: false, error: `needs ${s.needWins} comp wins (have ${state.compWins})` };
    }
    state.sponsorId = sponsorId;
    state.sponsorPaidDay = getDay();
    log(`Signed with ${s.name}! $${s.monthly}/month. ${s.desc}`);
    checkMission('sponsor-one');
    return { ok: true, sponsor: s };
  }

  function collectSponsorPay() {
    if (!state.sponsorId) return { ok: false, error: 'no sponsor' };
    const s = SPONSORS.find((x) => x.id === state.sponsorId);
    const day = getDay();
    if (day - state.sponsorPaidDay < 7) return { ok: false, error: 'sponsor pays weekly' };
    state.sponsorPaidDay = day;
    addCash(s.monthly);
    state.totalEarned += s.monthly;
    log(`Sponsor pay: $${s.monthly} from ${s.name}.`);
    return { ok: true, amount: s.monthly };
  }

  function missions() {
    return SURF_MISSIONS.map((m) => ({ ...m, done: !!state.missionsDone[m.id] }));
  }

  function tick(dt) {
    const day = getDay();
    if (day !== state.day) {
      state.day = day;
      state.sessionsToday = 0;
      state.energy = Math.min(100, state.energy + 30);
    }
    // Energy slowly recovers while on the beach, not riding.
    if (!state.ride) state.energy = Math.min(100, state.energy + dt * 0.5);
  }

  function hudLine() {
    if (state.totalRides === 0 && !state.beachId) return '';
    const beach = state.beachId ? (SURF_BEACHES.find((b) => b.id === state.beachId) || {}).name : '—';
    const riding = state.ride ? ` | riding ${state.ride.waveFt}ft, ${state.ride.score} pts, balance ${Math.round(state.ride.balance)}%` : '';
    return `Surf ${rank().name} | ${beach} | rides ${state.totalRides} | best ${state.bestRide ? state.bestRide.score : 0}${riding}`;
  }

  function summary() {
    return {
      rank: state.rank,
      xp: state.xp,
      board: state.boardId,
      totalRides: state.totalRides,
      totalWaves: state.totalWaves,
      totalScore: state.totalScore,
      bestRide: state.bestRide,
      wipeouts: state.wipeouts,
      tubes: state.tubes,
      aerials: state.aerials,
      compWins: state.compWins,
      sponsor: state.sponsorId,
      totalEarned: state.totalEarned,
      missionsDone: Object.keys(state.missionsDone).length,
      energy: Math.round(state.energy),
    };
  }

  function serialize() {
    return {
      xp: state.xp,
      rank: state.rank,
      boardId: state.boardId,
      boardsOwned: [...state.boardsOwned],
      wetsuitId: state.wetsuitId,
      wetsuitsOwned: [...state.wetsuitsOwned],
      wax: state.wax,
      totalRides: state.totalRides,
      totalWaves: state.totalWaves,
      totalScore: state.totalScore,
      bestRide: state.bestRide ? { ...state.bestRide } : null,
      bestWave: state.bestWave,
      wipeouts: state.wipeouts,
      tubes: state.tubes,
      aerials: state.aerials,
      perfectTens: state.perfectTens,
      compWins: state.compWins,
      compWinsById: { ...(state.compWinsById || {}) },
      sponsorId: state.sponsorId,
      totalEarned: state.totalEarned,
      missionsDone: { ...state.missionsDone },
      tricksLanded: { ...state.tricksLanded },
      energy: state.energy,
    };
  }

  function deserialize(s) {
    if (!s || typeof s !== 'object') return;
    if (typeof s.xp === 'number') state.xp = s.xp;
    if (typeof s.rank === 'string') state.rank = s.rank;
    if (typeof s.boardId === 'string') state.boardId = s.boardId;
    if (Array.isArray(s.boardsOwned)) state.boardsOwned = [...s.boardsOwned];
    if (typeof s.wetsuitId === 'string') state.wetsuitId = s.wetsuitId;
    if (Array.isArray(s.wetsuitsOwned)) state.wetsuitsOwned = [...s.wetsuitsOwned];
    for (const k of ['wax', 'totalRides', 'totalWaves', 'totalScore', 'bestWave', 'wipeouts', 'tubes', 'aerials', 'perfectTens', 'compWins', 'totalEarned', 'energy']) {
      if (typeof s[k] === 'number') state[k] = s[k];
    }
    if (s.bestRide) state.bestRide = { ...s.bestRide };
    if (typeof s.sponsorId === 'string') state.sponsorId = s.sponsorId;
    if (s.compWinsById) state.compWinsById = { ...s.compWinsById };
    if (s.missionsDone) state.missionsDone = { ...s.missionsDone };
    if (s.tricksLanded) state.tricksLanded = { ...s.tricksLanded };
  }

  return {
    state,
    buyBoard,
    buyWetsuit,
    buyWax,
    forecast,
    goToBeach,
    paddleOut,
    catchWave,
    rideTick,
    doTrick,
    wipeout,
    endRide,
    rest,
    enterComp,
    compRideScore,
    signSponsor,
    collectSponsorPay,
    missions,
    tick,
    hudLine,
    summary,
    serialize,
    deserialize,
  };
}

// ---------------------------------------------------------------------------
// Extra reference data: surf etiquette (flavour for the beach board)
// ---------------------------------------------------------------------------

export const SURF_ETIQUETTE = [
  'The surfer closest to the peak has the right of way.',
  'Do not drop in on somebody else wave.',
  'Paddle wide around the break, not through it.',
  'One wave, one surfer. Share the stoke, not the wave.',
  'If you lose your board, apologise and buy the wax.',
  'Respect the locals. They were here first.',
  'Never surf alone at a heavy break.',
];


// ---------------------------------------------------------------------------
// Part 3 — Surf shop, board repair, dawn patrol, surf legends
// ---------------------------------------------------------------------------

// Surf shop stock: accessories that improve sessions.
export const SURF_SHOP = [
  { id: 'wax-comb', name: 'Wax Comb', price: 10, desc: 'Roughen the wax. Better grip.' },
  { id: 'leash', name: 'Leash', price: 40, desc: 'Keeps the board close after a wipeout.' },
  { id: 'fins-set', name: 'Fin Set', price: 60, desc: 'Sharper turns, more drive.' },
  { id: 'board-bag', name: 'Board Bag', price: 80, desc: 'Protects the board on the road.' },
  { id: 'sunscreen', name: 'Sunscreen', price: 15, desc: 'Do not surf without it.' },
  { id: 'rashguard', name: 'Rashguard', price: 35, desc: 'No rashes, longer sessions.' },
  { id: 'camera-mount', name: 'Camera Mount', price: 120, desc: 'Film your rides. Sponsors watch.' },
  { id: 'repair-kit', name: 'Repair Kit', price: 50, desc: 'Fix dings on the beach.' },
];

// Board damage states and repair costs.
export const BOARD_DAMAGE = [
  { level: 0, name: 'Pristine', repairCost: 0, perfMult: 1.0 },
  { level: 1, name: 'Light Dings', repairCost: 30, perfMult: 0.97 },
  { level: 2, name: 'Cracked Rail', repairCost: 80, perfMult: 0.92 },
  { level: 3, name: 'Broken Fin', repairCost: 120, perfMult: 0.85 },
  { level: 4, name: 'Snapped', repairCost: 300, perfMult: 0.6 },
];

// Dawn patrol: early sessions have special rules.
export const DAWN_PATROL = [
  { hour: 5, bonus: 1.2, note: 'First light. Glassy water, empty lineup.' },
  { hour: 6, bonus: 1.15, note: 'Dawn patrol. The best waves of the day.' },
  { hour: 7, bonus: 1.05, note: 'Morning glass. Still good.' },
];

// Surf legends (flavour).
export const SURF_LEGENDS = [
  { name: 'Old Salty', note: 'Surfed Pipeline every winter for forty years.' },
  { name: 'Wave Rider Rosa', note: 'First woman to win the Pipeline Invitational.' },
  { name: 'The Kid', note: 'Twelve years old, already sponsored.' },
  { name: 'Big Wave Bill', note: 'Rode a 30-foot wave at North Shore. Once.' },
  { name: 'Sunset Sue', note: 'Never misses a sunset session.' },
];

// Wave quality scale.
export const WAVE_QUALITY = [
  { min: 0, max: 2, label: 'Flat', desc: 'Barely a ripple. Longboard day.' },
  { min: 2, max: 4, label: 'Small', desc: 'Fun little waves.' },
  { min: 4, max: 6, label: 'Good', desc: 'Solid surf. Real turns.' },
  { min: 6, max: 9, label: 'Big', desc: 'Overhead. Serious surfing.' },
  { min: 9, max: 99, label: 'Huge', desc: 'Only for the brave. And the sponsored.' },
];

// Competition scoring bands.
export const COMP_SCORE_BANDS = [
  { min: 0, max: 30, label: 'Poor', note: 'The judges are not impressed.' },
  { min: 30, max: 60, label: 'Average', note: 'Solid, forgettable.' },
  { min: 60, max: 90, label: 'Good', note: 'The crowd notices.' },
  { min: 90, max: 130, label: 'Excellent', note: 'Finals material.' },
  { min: 130, max: 999, label: 'Perfect', note: 'A heat-winning ride.' },
];

// Pure helpers.

export function waveQualityLabel(ft) {
  const row = WAVE_QUALITY.find((q) => ft >= q.min && ft < q.max);
  return row || WAVE_QUALITY[0];
}

export function compBandLabel(score) {
  const row = COMP_SCORE_BANDS.find((b) => score >= b.min && score < b.max);
  return row || COMP_SCORE_BANDS[0];
}

export function dawnBonusFor(hour) {
  const row = DAWN_PATROL.find((d) => d.hour === Math.floor(hour));
  return row ? row.bonus : 1;
}

export function boardPerfMult(damageLevel) {
  const row = BOARD_DAMAGE.find((d) => d.level === damageLevel);
  return row ? row.perfMult : 1;
}

export function repairCostFor(damageLevel) {
  const row = BOARD_DAMAGE.find((d) => d.level === damageLevel);
  return row ? row.repairCost : 0;
}

export function wipeoutDamage(beachDanger, rng) {
  if (beachDanger >= 4 && rng() < 0.3) return 1;
  if (beachDanger >= 3 && rng() < 0.15) return 1;
  return 0;
}

export function rideScore10(totalPoints) {
  return Math.max(1, Math.min(10, Math.round(totalPoints / 60)));
}

export function sponsorMonthly(sponsorId) {
  const s = SPONSORS.find((x) => x.id === sponsorId);
  return s ? s.monthly : 0;
}

export function nextSponsor(compWins, rankId) {
  const rankOrder = SURFER_RANKS.map((r) => r.id);
  const ok = SPONSORS.filter((s) => compWins >= s.needWins && rankOrder.indexOf(rankId) >= rankOrder.indexOf(s.needRank));
  if (ok.length === 0) return null;
  ok.sort((a, b) => b.monthly - a.monthly);
  return ok[0];
}

export function bestBeachToday(forecastList) {
  let best = forecastList[0];
  for (const f of forecastList) {
    const score = f.waveFt * 2 - f.crowd - f.danger * 0.5;
    const bestScore = best.waveFt * 2 - best.crowd - best.danger * 0.5;
    if (score > bestScore) best = f;
  }
  return best;
}

export function sessionEnergyCost(waveFt) {
  return Math.round(10 + waveFt * 2);
}

export function trickComboBonus(tricks) {
  if (tricks.length >= 4) return 1.3;
  if (tricks.length === 3) return 1.2;
  if (tricks.length === 2) return 1.1;
  return 1;
}


// ---------------------------------------------------------------------------
// Part 4 — Surf slang, beach cafés, surf films, wave forecasting
// ---------------------------------------------------------------------------

// Surf slang (flavour).
export const SURF_SLANG = [
  'A "barrel" is the tube. The holy grail.',
  'A "wipeout" is falling off. Everybody does it.',
  'A "set" is a group of bigger waves.',
  'A "lull" is the flat bit between sets.',
  'A "closeout" is a wave that breaks all at once. Bad.',
  'A "shoulder" is the unbroken part of the wave. Surf there.',
  '"Stoked" is how you feel after a great ride.',
  'A "kook" is a beginner who does not know the rules yet.',
];

// Beach cafés (flavour).
export const BEACH_CAFES = [
  { id: 'sunrise-cafe', name: 'Sunrise Café', price: 8, desc: 'Coffee and toast before dawn patrol.' },
  { id: 'boardwalk-burger', name: 'Boardwalk Burger', price: 12, desc: 'Burgers after a long session.' },
  { id: 'taco-shack', name: 'Taco Shack', price: 9, desc: 'Fish tacos. Obviously.' },
  { id: 'smoothie-bar', name: 'Smoothie Bar', price: 7, desc: 'Cold, fruity, perfect.' },
];

// Surf films (flavour).
export const SURF_FILMS = [
  { title: 'The Endless Summer', year: 1966, note: 'The film that made surfing famous.' },
  { title: 'Big Wednesday', year: 1978, note: 'Big waves, big friendships, big wipeouts.' },
  { title: 'Point Break', year: 1991, note: 'Bank robbers who surf. Obviously.' },
  { title: 'Step Into Liquid', year: 2003, note: 'Surfing around the world.' },
];

// Wave forecasting tips.
export const FORECAST_TIPS = [
  'Offshore wind grooms the waves. Onshore wind ruins them.',
  'A rising swell means bigger sets are coming.',
  'The tide matters: some breaks only work at high tide.',
  'After a storm, the swell is big but messy.',
  'Dawn patrol gets the cleanest waves of the day.',
];

// Pure helpers.

export function cafePrice(cafeId) {
  const c = BEACH_CAFES.find((x) => x.id === cafeId);
  return c ? c.price : 0;
}

export function slangMeaningSurf(term) {
  const row = SURF_SLANG.find((s) => s.toLowerCase().includes(term.toLowerCase()));
  return row || 'Ask a local. They love explaining it.';
}

export function filmForYear(year) {
  return SURF_FILMS.find((f) => f.year === year) || null;
}

export function forecastNote(day) {
  const s = SWELL_FORECAST[(day - 1) % SWELL_FORECAST.length];
  return s.note;
}

export function bestForecastDay() {
  let best = SWELL_FORECAST[0];
  for (const s of SWELL_FORECAST) if (s.mult > best.mult) best = s;
  return best;
}

export function waveHeightAt(beachId, day, weather) {
  const beach = SURF_BEACHES.find((b) => b.id === beachId);
  if (!beach) return 0;
  const s = SWELL_FORECAST[(day - 1) % SWELL_FORECAST.length];
  return waveHeight(beach, s.mult, weather);
}


// ---------------------------------------------------------------------------
// Part 5 — Famous surfers, surf history, surf films 2
// ---------------------------------------------------------------------------

export const FAMOUS_SURFERS = [
  { name: 'Kelly Slater', note: '11 world titles. The greatest ever.' },
  { name: 'Duke Kahanamoku', note: 'The father of modern surfing.' },
  { name: 'Stephanie Gilmore', note: '8 world titles. Effortless style.' },
  { name: 'Laird Hamilton', note: 'Big wave pioneer. Rode the unrideable.' },
];

export const SURF_HISTORY = [
  { year: 1778, event: 'Captain Cook sees surfing in Hawaii.' },
  { year: 1912, event: 'Duke spreads surfing to Australia and California.' },
  { year: 1959, event: 'Gidget makes surfing mainstream.' },
  { year: 1976, event: 'The first professional world tour begins.' },
];

export const SURF_FILMS_2 = [
  { title: 'Riding Giants', year: 2004, note: 'The history of big wave surfing.' },
  { title: 'The Endless Summer II', year: 1994, note: 'Thirty years later, still searching.' },
];

export function surferForName(name) {
  return FAMOUS_SURFERS.find((s) => s.name.toLowerCase().includes(name.toLowerCase())) || null;
}

export function surfHistoryFor(year) {
  return SURF_HISTORY.find((h) => h.year === year) || null;
}

export function filmForYearSurf(year) {
  return SURF_FILMS_2.find((f) => f.year === year) || null;
}


// ---------------------------------------------------------------------------
// Part 6 — Surfer nicknames, surf mottos
// ---------------------------------------------------------------------------

export const SURFER_NICKNAMES = [
  'The Kid',
  'Wave Rider',
  'Big Wave Bill',
  'Sunset Sue',
  'Old Salty',
  'Tube Master',
];

export const SURF_MOTTOS = [
  'The best surfer is the one having the most fun.',
  'You cannot stop the waves, but you can learn to surf.',
  'Every wave is a new chance.',
  'Paddle out. The rest takes care of itself.',
];

export function randomSurferNickname(rng) {
  return SURFER_NICKNAMES[Math.floor(rng() * SURFER_NICKNAMES.length)];
}

export function surfMottoFor(index) {
  return SURF_MOTTOS[index % SURF_MOTTOS.length];
}


// ---------------------------------------------------------------------------
// Part 7 — Surf proverbs, famous waves
// ---------------------------------------------------------------------------

export const SURF_PROVERBS = [
  'You cannot stop the waves, but you can learn to surf.',
  'The ocean is the only place where time stands still.',
  'A bad day surfing beats a good day anywhere else.',
  'Ride the wave you have, not the wave you want.',
];

export const FAMOUS_WAVES = [
  { wave: 'Pipeline', place: 'Hawaii', note: 'The most famous wave on Earth.' },
  { wave: 'Teahupoo', place: 'Tahiti', note: 'Heavy, thick, terrifying.' },
  { wave: 'Bells Beach', place: 'Australia', note: 'The home of the Rip Curl Pro.' },
];

export function proverbSurf(index) {
  return SURF_PROVERBS[index % SURF_PROVERBS.length];
}

export function famousWaveFor(name) {
  return FAMOUS_WAVES.find((w) => w.wave === name) || null;
}
