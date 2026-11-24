export const SKATE_PARK = { id: 'concrete-kings', name: 'Concrete Kings Skatepark', x: -40, z: 190, district: 'Campus' };

export const SKATE_PARKS = [
  { id: 'concrete-kings', name: 'Concrete Kings', x: -40, z: 190, difficulty: 1, features: ['bowl', 'rail', 'quarter'] },
  { id: 'harbor-diy', name: 'Harbor DIY', x: -180, z: 120, difficulty: 2, features: ['ledge', 'stair', 'rail'] },
  { id: 'stadium-park', name: 'Stadium Park', x: -200, z: -40, difficulty: 3, features: ['half-pipe', 'bowl', 'vert'] },
  { id: 'rooftop', name: 'Rooftop', x: 20, z: -140, difficulty: 4, features: ['gap', 'rail', 'ledge'] },
];

export const SKATE_TRICKS = [
  { id: 'ollie', name: 'Ollie', base: 100, risk: 0.05, level: 1, style: 'flat' },
  { id: 'kickflip', name: 'Kickflip', base: 250, risk: 0.15, level: 1, style: 'flat' },
  { id: 'heelflip', name: 'Heelflip', base: 250, risk: 0.15, level: 1, style: 'flat' },
  { id: 'pop-shove', name: 'Pop Shove-It', base: 200, risk: 0.12, level: 1, style: 'flat' },
  { id: 'grind-50', name: '50-50 Grind', base: 300, risk: 0.2, level: 2, style: 'rail' },
  { id: 'boardslide', name: 'Boardslide', base: 350, risk: 0.22, level: 2, style: 'rail' },
  { id: 'nosegrind', name: 'Nosegrind', base: 450, risk: 0.3, level: 3, style: 'rail' },
  { id: 'tailgrab', name: 'Tailgrab', base: 400, risk: 0.25, level: 2, style: 'air' },
  { id: 'air-360', name: 'Air 360', base: 600, risk: 0.35, level: 3, style: 'air' },
  { id: 'mctwist', name: 'McTwist', base: 900, risk: 0.45, level: 4, style: 'air' },
  { id: 'manual', name: 'Manual', base: 150, risk: 0.08, level: 1, style: 'flat' },
  { id: 'nose-manual', name: 'Nose Manual', base: 250, risk: 0.18, level: 2, style: 'flat' },
  { id: 'rock-roll', name: 'Rock and Roll', base: 500, risk: 0.3, level: 3, style: 'bowl' },
  { id: 'invert', name: 'Invert', base: 800, risk: 0.4, level: 4, style: 'bowl' },
  { id: 'smith', name: 'Smith Grind', base: 550, risk: 0.35, level: 3, style: 'rail' },
  { id: 'bluntslide', name: 'Bluntslide', base: 700, risk: 0.42, level: 4, style: 'rail' },
  { id: 'varial', name: 'Varial Flip', base: 350, risk: 0.2, level: 2, style: 'flat' },
  { id: 'hardflip', name: 'Hardflip', base: 500, risk: 0.32, level: 3, style: 'flat' },
  { id: 'laser', name: 'Laser Flip', base: 750, risk: 0.45, level: 4, style: 'flat' },
  { id: 'darkslide', name: 'Darkslide', base: 850, risk: 0.5, level: 5, style: 'rail' },
];

export const BMX_TRICKS = [
  { id: 'bunnyhop', name: 'Bunnyhop', base: 100, risk: 0.05, level: 1 },
  { id: 'barspin', name: 'Barspin', base: 400, risk: 0.25, level: 2 },
  { id: 'tailwhip', name: 'Tailwhip', base: 600, risk: 0.35, level: 3 },
  { id: 'backflip', name: 'Backflip', base: 900, risk: 0.5, level: 4 },
  { id: 'superman', name: 'Superman', base: 700, risk: 0.4, level: 3 },
  { id: 'x-up', name: 'X-Up', base: 300, risk: 0.18, level: 2 },
  { id: 'feeble', name: 'Feeble Grind', base: 450, risk: 0.3, level: 3 },
  { id: 'double-whip', name: 'Double Tailwhip', base: 1000, risk: 0.55, level: 5 },
];

export const SKATE_GEAR = [
  { id: 'board-basic', name: 'Basic Board', price: 0, kind: 'board', skill: 0, style: 0 },
  { id: 'board-pro', name: 'Pro Board', price: 220, kind: 'board', skill: 2, style: 1 },
  { id: 'board-carbon', name: 'Carbon Board', price: 500, kind: 'board', skill: 4, style: 2 },
  { id: 'bmx-basic', name: 'Basic BMX', price: 400, kind: 'bmx', skill: 0, style: 0 },
  { id: 'bmx-pro', name: 'Pro BMX', price: 900, kind: 'bmx', skill: 3, style: 2 },
  { id: 'wheels', name: 'Fast Wheels', price: 120, kind: 'upgrade', skill: 1, style: 0 },
  { id: 'bearings', name: 'Ceramic Bearings', price: 180, kind: 'upgrade', skill: 1, style: 1 },
  { id: 'grip', name: 'Grip Tape', price: 60, kind: 'upgrade', skill: 0, style: 2 },
  { id: 'helmet', name: 'Helmet', price: 80, kind: 'safety', skill: 0, style: 0, protection: 0.5 },
  { id: 'pads', name: 'Pads', price: 70, kind: 'safety', skill: 0, style: 0, protection: 0.4 },
  { id: 'shoes', name: 'Skate Shoes', price: 140, kind: 'upgrade', skill: 2, style: 1 },
  { id: 'camera', name: 'Camera', price: 300, kind: 'video', skill: 0, style: 1 },
];

export const SKATE_SPONSORS = [
  { id: 'local-shop', name: 'Local Shop', needScore: 5000, pay: 100, perks: ['free gear'] },
  { id: 'energy', name: 'Bolt Energy', needScore: 20000, pay: 300, perks: ['free gear', 'travel'] },
  { id: 'shoe-brand', name: 'Kickflip Shoes', needScore: 50000, pay: 700, perks: ['free gear', 'signature shoe'] },
  { id: 'board-brand', name: 'Concrete Kings Co.', needScore: 100000, pay: 1500, perks: ['pro model', 'world tour'] },
];

export const SKATE_COMPS = [
  { id: 'saturday-jam', name: 'Saturday Jam', entry: 20, prize: 150, needLevel: 1, day: 6 },
  { id: 'street-league', name: 'Street League', entry: 100, prize: 800, needLevel: 2, day: 3 },
  { id: 'vert-masters', name: 'Vert Masters', entry: 250, prize: 2500, needLevel: 3, day: 5 },
  { id: 'solara-open', name: 'Solara Open', entry: 500, prize: 8000, needLevel: 4, day: 6 },
];

export const SKATE_EVENTS = [
  { id: 'crowd', name: 'Crowd Gathers', text: 'A crowd gathers to watch.' },
  { id: 'security', name: 'Security', text: 'Security tells you to move along.' },
  { id: 'kid-fan', name: 'Kid Fan', text: 'A kid asks for your autograph.' },
  { id: 'rain-park', name: 'Rain', text: 'Rain starts falling on the park.' },
  { id: 'filmer', name: 'Filmer', text: 'A filmer shows up with a camera.' },
  { id: 'rival-skater', name: 'Rival Skater', text: 'A rival skater challenges you.' },
  { id: 'cop-park', name: 'Cop', text: 'A cop rolls through the park.' },
  { id: 'sponsor-scout', name: 'Sponsor Scout', text: 'A sponsor scout watches from the bench.' },
];

export const SKATE_RANKS = [
  { rank: 0, name: 'Poser', scoreNeeded: 0, mult: 1.0 },
  { rank: 1, name: 'Skater', scoreNeeded: 5000, mult: 1.1 },
  { rank: 2, name: 'Local', scoreNeeded: 20000, mult: 1.25 },
  { rank: 3, name: 'AM', scoreNeeded: 50000, mult: 1.4 },
  { rank: 4, name: 'Pro', scoreNeeded: 120000, mult: 1.6 },
  { rank: 5, name: 'Legend', scoreNeeded: 300000, mult: 2.0 },
];

const LESSONS = [
  { id: 'basics', name: 'Basics Lesson', price: 50, gain: 1, time: 30 },
  { id: 'flip', name: 'Flip Tricks', price: 120, gain: 2, time: 45 },
  { id: 'vert', name: 'Vert Riding', price: 200, gain: 3, time: 60 },
];

export function skateRankFor(totalScore) {
  let out = 0;
  for (const r of SKATE_RANKS) if (totalScore >= r.scoreNeeded) out = r.rank;
  return out;
}

function trickById(id) {
  for (const t of SKATE_TRICKS) if (t.id === id) return t;
  for (const t of BMX_TRICKS) if (t.id === id) return t;
  return null;
}

function gearById(id) {
  for (const g of SKATE_GEAR) if (g.id === id) return g;
  return null;
}

function parkById(id) {
  for (const p of SKATE_PARKS) if (p.id === id) return p;
  return null;
}

export function createSkateparkSystem(deps) {
  const d = deps || {};
  const rnd = typeof d.rng === 'function' ? d.rng : Math.random;
  const cashOf = typeof d.getCash === 'function' ? d.getCash : () => 0;
  const moveCash = typeof d.addCash === 'function' ? d.addCash : () => {};
  const pushHeat = typeof d.addHeat === 'function' ? d.addHeat : () => {};
  const say = typeof d.log === 'function' ? d.log : () => {};
  const dayOf = typeof d.getDay === 'function' ? d.getDay : () => 1;
  const posOf = typeof d.getPlayerPos === 'function' ? d.getPlayerPos : () => ({ x: 0, z: 0 });

  const state = {
    rank: 0,
    totalScore: 0,
    bestRun: 0,
    bestCombo: 0,
    runs: 0,
    runsLanded: 0,
    bails: 0,
    injuries: 0,
    health: 100,
    energy: 100,
    gear: ['board-basic'],
    activeGear: 'board-basic',
    tricksLanded: {},
    tricksLearned: ['ollie'],
    run: null,
    sponsor: null,
    sponsorPay: 0,
    clips: [],
    clipsViral: 0,
    compsWon: 0,
    compsEntered: 0,
    skateGamesWon: 0,
    skateGamesLost: 0,
    style: 0,
    skillBonus: 0,
    totalEarned: 0,
    tipsEarned: 0,
    fans: 0,
    eventsSeen: {},
    dayScore: 0,
    bestDay: 0,
    lastParkDay: 0,
    protection: 0,
    videoViews: 0,
    currentPark: 'concrete-kings',
    lessonsTaken: 0,
    videosEdited: 0,
    parksCleaned: 0,
    ledgesWaxed: 0,
    rivalBeaten: 0,
    marathons: 0,
    rampsBuilt: 0,
  };

  function rankInfo() {
    return SKATE_RANKS[state.rank] || SKATE_RANKS[0];
  }

  function gearInfo() {
    return gearById(state.activeGear) || SKATE_GEAR[0];
  }

  function hasGear(id) {
    return state.gear.includes(id);
  }

  function skillBonus() {
    let s = state.skillBonus + state.rank;
    for (const id of state.gear) {
      const g = gearById(id);
      if (g) s += g.skill || 0;
    }
    return s;
  }

  function styleBonus() {
    let s = 0;
    for (const id of state.gear) {
      const g = gearById(id);
      if (g) s += g.style || 0;
    }
    return s;
  }

  function protection() {
    let p = 0;
    for (const id of state.gear) {
      const g = gearById(id);
      if (g && g.protection) p += g.protection;
    }
    return Math.min(0.8, p);
  }

  function bailChance(trick) {
    return Math.max(0.02, trick.risk - skillBonus() * 0.02);
  }

  function startRun(parkId, mode) {
    const useMode = mode || 'skate';
    if (state.run) return { ok: false, reason: 'run-active' };
    const park = parkById(parkId);
    if (!park) return { ok: false, reason: 'unknown-park' };
    if (state.energy < 20) return { ok: false, reason: 'too-tired' };
    const active = gearInfo();
    if (useMode === 'bmx' && !state.gear.some((id) => (gearById(id) || {}).kind === 'bmx')) return { ok: false, reason: 'no-bmx' };
    if (useMode === 'skate' && active.kind === 'bmx') return { ok: false, reason: 'wrong-gear' };
    state.run = { parkId: park.id, parkName: park.name, mode: useMode, tricks: [], combo: 0, score: 0, timeLeft: 60, startedDay: dayOf(), bestTrick: null };
    state.currentPark = park.id;
    state.lastParkDay = dayOf();
    return { ok: true, run: { ...state.run, tricks: [] } };
  }

  function bail(trick) {
    const run = state.run;
    state.run = null;
    state.bails += 1;
    state.runs += 1;
    const pointsLost = run ? run.score : 0;
    let injury = 0;
    if (rnd() < 0.3) {
      injury = Math.round((10 + rnd() * 25) * (1 - protection()));
      state.health = Math.max(0, state.health - injury);
      state.injuries += 1;
      say('Bailed hard — injured for ' + injury + '.');
    } else {
      say('Bailed, but walked away clean.');
    }
    state.energy = Math.max(0, state.energy - 10);
    return { ok: true, bailed: true, pointsLost, injury, health: Math.round(state.health) };
  }

  function landTrick(trickId) {
    if (!state.run) return { ok: false, reason: 'no-run' };
    const trick = trickById(trickId);
    if (!trick) return { ok: false, reason: 'unknown-trick' };
    if (!state.tricksLearned.includes(trickId) && trick.level > 1) return { ok: false, reason: 'not-learned' };
    if (state.energy < 5) return { ok: false, reason: 'too-tired' };
    state.energy -= 4;
    if (rnd() < bailChance(trick)) return bail(trick);
    const run = state.run;
    run.combo += 1;
    const comboMult = 1 + (run.combo - 1) * 0.25;
    const styleMult = 1 + styleBonus() * 0.05;
    const points = Math.round(trick.base * comboMult * styleMult * rankInfo().mult);
    run.score += points;
    run.tricks.push({ trickId, points, combo: run.combo });
    state.tricksLanded[trickId] = (state.tricksLanded[trickId] || 0) + 1;
    if (!run.bestTrick || points > run.bestTrick.points) run.bestTrick = { trickId, points };
    if (run.combo > state.bestCombo) state.bestCombo = run.combo;
    say('Landed ' + trick.name + ' for ' + points + ' pts.');
    return { ok: true, trickId, points, combo: run.combo, score: run.score };
  }

  function endRun() {
    if (!state.run) return { ok: false, reason: 'no-run' };
    const run = state.run;
    state.run = null;
    state.runs += 1;
    state.runsLanded += 1;
    state.totalScore += run.score;
    state.dayScore += run.score;
    if (run.score > state.bestRun) state.bestRun = run.score;
    const cash = Math.round(run.score / 50);
    moveCash(cash);
    state.totalEarned += cash;
    state.tipsEarned += cash;
    const fans = Math.floor(run.score / 1000);
    state.fans += fans;
    const oldRank = state.rank;
    const newRank = skateRankFor(state.totalScore);
    const promoted = newRank > oldRank;
    if (promoted) state.rank = newRank;
    if (state.runsLanded % 3 === 0) {
      const pool = SKATE_TRICKS.filter((t) => !state.tricksLearned.includes(t.id) && t.level <= state.rank + 1);
      if (pool.length > 0) {
        const learned = pool[Math.floor(rnd() * pool.length)];
        state.tricksLearned.push(learned.id);
        say('Learned a new trick: ' + learned.name + '.');
      }
    }
    say('Run finished — ' + run.score + ' pts, $' + cash + '.');
    return { ok: true, score: run.score, trickCount: run.tricks.length, cash, fans, promoted, bestTrick: run.bestTrick };
  }

  function buyGear(gearId) {
    const gear = gearById(gearId);
    if (!gear) return { ok: false, reason: 'unknown-gear' };
    if (cashOf() < gear.price && !hasGear(gearId)) return { ok: false, reason: 'not-enough-cash' };
    if (hasGear(gearId)) {
      state.activeGear = gearId;
      return { ok: true, gearId, switched: true };
    }
    moveCash(-gear.price);
    state.gear.push(gearId);
    if (gear.kind === 'board' || gear.kind === 'bmx') state.activeGear = gearId;
    return { ok: true, gearId, price: gear.price };
  }

  function filmClip() {
    if (!state.run) return { ok: false, reason: 'no-run' };
    if (!hasGear('camera')) return { ok: false, reason: 'no-camera' };
    const run = state.run;
    const views = Math.round(run.score * 2 + rnd() * 5 * (1 + state.fans * 0.01));
    const clip = { day: dayOf(), score: run.score, views, park: run.parkId };
    state.clips.push(clip);
    state.videoViews += views;
    if (views > 50000) {
      state.clipsViral += 1;
      moveCash(200);
      state.totalEarned += 200;
      return { ok: true, views, viral: true, bonus: 200 };
    }
    return { ok: true, views, viral: false };
  }

  function signSponsor(sponsorId) {
    const sp = SKATE_SPONSORS.find((s) => s.id === sponsorId);
    if (!sp) return { ok: false, reason: 'unknown-sponsor' };
    if (state.sponsor) return { ok: false, reason: 'already-sponsored' };
    if (state.totalScore < sp.needScore) return { ok: false, reason: 'score-too-low' };
    state.sponsor = sponsorId;
    state.sponsorPay = sp.pay;
    return { ok: true, sponsorId, pay: sp.pay };
  }

  function enterComp(compId) {
    const comp = SKATE_COMPS.find((c) => c.id === compId);
    if (!comp) return { ok: false, reason: 'unknown-comp' };
    if (state.rank < comp.needLevel) return { ok: false, reason: 'rank-too-low' };
    if (cashOf() < comp.entry) return { ok: false, reason: 'not-enough-cash' };
    if (state.energy < 30) return { ok: false, reason: 'too-tired' };
    moveCash(-comp.entry);
    state.compsEntered += 1;
    state.energy -= 30;
    const myBest = state.bestRun + rnd() * 2000;
    const field = [];
    for (let i = 0; i < 5; i++) field.push(Math.round(3000 + rnd() * 4000 + comp.needLevel * 3000));
    const beaten = field.filter((s) => s > myBest).length;
    const place = beaten + 1;
    const won = place === 1;
    let prize = 0;
    if (won) {
      prize = comp.prize;
      moveCash(prize);
      state.totalEarned += prize;
      state.compsWon += 1;
      state.fans += 100;
    }
    return { ok: true, won, place, score: Math.round(myBest), prize, field };
  }

  function playSkate(opponentSkill) {
    const opp = opponentSkill === undefined || opponentSkill === null ? 0.5 : opponentSkill;
    if (state.run) return { ok: false, reason: 'run-active' };
    if (state.energy < 15) return { ok: false, reason: 'too-tired' };
    state.energy -= 15;
    let myLetters = 0;
    let oppLetters = 0;
    const rounds = [];
    for (let r = 0; r < 20 && myLetters < 5 && oppLetters < 5; r++) {
      const trick = SKATE_TRICKS[Math.floor(rnd() * SKATE_TRICKS.length)];
      const iLand = rnd() > bailChance(trick);
      const oLand = rnd() < opp;
      if (!iLand) myLetters += 1;
      if (!oLand) oppLetters += 1;
      rounds.push({ round: r + 1, trickId: trick.id, playerLanded: iLand, opponentLanded: oLand, playerLetters: myLetters, opponentLetters: oppLetters });
    }
    const won = oppLetters >= 5 && myLetters < 5;
    if (won) {
      moveCash(30);
      state.totalEarned += 30;
      state.fans += 10;
      state.skateGamesWon += 1;
    } else {
      state.skateGamesLost += 1;
    }
    const scoreStr = 'S'.repeat(myLetters) + '.' + 'K'.repeat(oppLetters);
    return { ok: true, won, rounds, score: scoreStr, playerLetters: myLetters, opponentLetters: oppLetters };
  }

  function heal() {
    if (state.health >= 100) return { ok: false, reason: 'full-health' };
    if (cashOf() < 30) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-30);
    state.health = 100;
    return { ok: true, cost: 30 };
  }

  function rest() {
    state.energy = 100;
    state.health = Math.min(100, state.health + 10);
    return { ok: true, energy: 100 };
  }

  function applyParkEvent(eventId) {
    state.eventsSeen[eventId] = (state.eventsSeen[eventId] || 0) + 1;
    if (eventId === 'crowd') state.fans += 5;
    else if (eventId === 'security') pushHeat(5);
    else if (eventId === 'kid-fan') state.fans += 15;
    else if (eventId === 'rain-park') { if (state.run) say('Rain makes the park slick.'); }
    else if (eventId === 'filmer') { if (state.run && hasGear('camera')) filmClip(); }
    else if (eventId === 'rival-skater') playSkate(0.5 + state.rank * 0.05);
    else if (eventId === 'cop-park') pushHeat(3);
    else if (eventId === 'sponsor-scout') { if (state.totalScore > 20000 && !state.sponsor) say('A sponsor scout is watching you.'); }
    return eventId;
  }

  function tick(dt) {
    const step = dt || 0;
    if (state.run) {
      state.run.timeLeft -= step;
      if (state.run.timeLeft <= 0) endRun();
    } else {
      state.energy = Math.min(100, state.energy + 0.8 * step);
      state.health = Math.min(100, state.health + 0.2 * step);
    }
    if (rnd() < step * 0.002) {
      const ev = SKATE_EVENTS[Math.floor(rnd() * SKATE_EVENTS.length)];
      applyParkEvent(ev.id);
    }
  }

  function tickDay(day) {
    const today = day !== undefined && day !== null ? day : dayOf();
    if (state.sponsor) {
      moveCash(state.sponsorPay);
      state.totalEarned += state.sponsorPay;
    }
    state.energy = 100;
    if (state.dayScore > state.bestDay) state.bestDay = state.dayScore;
    state.dayScore = 0;
    return { day: today, totalScore: state.totalScore, rankName: rankInfo().name };
  }

  function interact() {
    const pos = posOf();
    let near = null;
    for (const p of SKATE_PARKS) {
      if (Math.hypot(pos.x - p.x, pos.z - p.z) <= 20) { near = p; break; }
    }
    if (!near) return false;
    if (state.run) {
      const last = state.tricksLearned[state.tricksLearned.length - 1];
      const res = landTrick(last);
      return res.ok || res.reason === 'no-run';
    }
    const res = startRun(near.id, 'skate');
    return res.ok || res.reason === 'too-tired';
  }

  function hudLine() {
    if (state.run) {
      const r = state.run;
      return 'SKATE ' + r.parkName + ' · ' + r.score + ' pts · combo ' + r.combo + ' · ' + Math.ceil(r.timeLeft) + 's';
    }
    const pos = posOf();
    for (const p of SKATE_PARKS) {
      if (Math.hypot(pos.x - p.x, pos.z - p.z) <= 20) {
        return 'SKATEPARK ' + p.name + ' · ' + rankInfo().name + ' · best ' + state.bestRun + ' · ' + state.fans + ' fans';
      }
    }
    if (state.health < 30) return 'You are hurt — heal up before skating.';
    return '';
  }

  function stats() {
    return {
      rankName: rankInfo().name,
      rank: state.rank,
      totalScore: state.totalScore,
      bestRun: state.bestRun,
      bestCombo: state.bestCombo,
      runs: state.runs,
      runsLanded: state.runsLanded,
      bails: state.bails,
      injuries: state.injuries,
      health: Math.round(state.health),
      energy: Math.round(state.energy),
      gear: [...state.gear],
      activeGear: state.activeGear,
      tricksLearned: [...state.tricksLearned],
      tricksLanded: { ...state.tricksLanded },
      runActive: !!state.run,
      sponsor: state.sponsor,
      sponsorPay: state.sponsorPay,
      clips: state.clips.length,
      clipsViral: state.clipsViral,
      videoViews: state.videoViews,
      compsWon: state.compsWon,
      compsEntered: state.compsEntered,
      skateGamesWon: state.skateGamesWon,
      skateGamesLost: state.skateGamesLost,
      styleBonus: styleBonus(),
      skillBonus: skillBonus(),
      totalEarned: state.totalEarned,
      tipsEarned: state.tipsEarned,
      fans: state.fans,
      dayScore: state.dayScore,
      bestDay: state.bestDay,
      currentPark: state.currentPark,
      eventsSeen: Object.keys(state.eventsSeen).length,
    };
  }

  function serialize() {
    return {
      rank: state.rank,
      totalScore: state.totalScore,
      bestRun: state.bestRun,
      bestCombo: state.bestCombo,
      runs: state.runs,
      runsLanded: state.runsLanded,
      bails: state.bails,
      injuries: state.injuries,
      health: state.health,
      energy: state.energy,
      gear: [...state.gear],
      activeGear: state.activeGear,
      tricksLanded: { ...state.tricksLanded },
      tricksLearned: [...state.tricksLearned],
      sponsor: state.sponsor,
      sponsorPay: state.sponsorPay,
      clips: state.clips.map((c) => ({ ...c })),
      clipsViral: state.clipsViral,
      videoViews: state.videoViews,
      compsWon: state.compsWon,
      compsEntered: state.compsEntered,
      skateGamesWon: state.skateGamesWon,
      skateGamesLost: state.skateGamesLost,
      totalEarned: state.totalEarned,
      tipsEarned: state.tipsEarned,
      fans: state.fans,
      bestDay: state.bestDay,
      lastParkDay: state.lastParkDay,
      currentPark: state.currentPark,
      eventsSeen: { ...state.eventsSeen },
      lessonsTaken: state.lessonsTaken,
      videosEdited: state.videosEdited,
      parksCleaned: state.parksCleaned,
      ledgesWaxed: state.ledgesWaxed,
      rivalBeaten: state.rivalBeaten,
      marathons: state.marathons,
      rampsBuilt: state.rampsBuilt,
      skillBonus: state.skillBonus,
    };
  }

  function deserialize(saved) {
    const s = saved || {};
    state.rank = Math.floor(Number(s.rank) || 0);
    state.totalScore = Number(s.totalScore) || 0;
    state.bestRun = Math.floor(Number(s.bestRun) || 0);
    state.bestCombo = Math.floor(Number(s.bestCombo) || 0);
    state.runs = Math.floor(Number(s.runs) || 0);
    state.runsLanded = Math.floor(Number(s.runsLanded) || 0);
    state.bails = Math.floor(Number(s.bails) || 0);
    state.injuries = Math.floor(Number(s.injuries) || 0);
    state.health = Number(s.health) || 100;
    state.energy = Number(s.energy) || 100;
    state.gear = Array.isArray(s.gear) && s.gear.length > 0 ? [...s.gear] : ['board-basic'];
    state.activeGear = typeof s.activeGear === 'string' ? s.activeGear : 'board-basic';
    state.tricksLanded = s.tricksLanded && typeof s.tricksLanded === 'object' ? { ...s.tricksLanded } : {};
    state.tricksLearned = Array.isArray(s.tricksLearned) && s.tricksLearned.length > 0 ? [...s.tricksLearned] : ['ollie'];
    state.sponsor = s.sponsor || null;
    state.sponsorPay = Number(s.sponsorPay) || 0;
    state.clips = Array.isArray(s.clips) ? s.clips.map((c) => ({ ...c })) : [];
    state.clipsViral = Math.floor(Number(s.clipsViral) || 0);
    state.videoViews = Math.floor(Number(s.videoViews) || 0);
    state.compsWon = Math.floor(Number(s.compsWon) || 0);
    state.compsEntered = Math.floor(Number(s.compsEntered) || 0);
    state.skateGamesWon = Math.floor(Number(s.skateGamesWon) || 0);
    state.skateGamesLost = Math.floor(Number(s.skateGamesLost) || 0);
    state.totalEarned = Number(s.totalEarned) || 0;
    state.tipsEarned = Number(s.tipsEarned) || 0;
    state.fans = Math.floor(Number(s.fans) || 0);
    state.bestDay = Math.floor(Number(s.bestDay) || 0);
    state.lastParkDay = Math.floor(Number(s.lastParkDay) || 0);
    state.currentPark = typeof s.currentPark === 'string' ? s.currentPark : 'concrete-kings';
    state.eventsSeen = s.eventsSeen && typeof s.eventsSeen === 'object' ? { ...s.eventsSeen } : {};
    state.lessonsTaken = Math.floor(Number(s.lessonsTaken) || 0);
    state.videosEdited = Math.floor(Number(s.videosEdited) || 0);
    state.parksCleaned = Math.floor(Number(s.parksCleaned) || 0);
    state.ledgesWaxed = Math.floor(Number(s.ledgesWaxed) || 0);
    state.rivalBeaten = Math.floor(Number(s.rivalBeaten) || 0);
    state.marathons = Math.floor(Number(s.marathons) || 0);
    state.rampsBuilt = Math.floor(Number(s.rampsBuilt) || 0);
    state.skillBonus = Number(s.skillBonus) || 0;
    state.run = null;
    state.dayScore = 0;
    return { ok: true };
  }

  function takeLesson(lessonId) {
    const lesson = LESSONS.find((l) => l.id === lessonId);
    if (!lesson) return { ok: false, reason: 'unknown-lesson' };
    if (cashOf() < lesson.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-lesson.price);
    state.lessonsTaken += 1;
    state.skillBonus += lesson.gain;
    state.totalScore += 100 * lesson.gain;
    return { ok: true, lessonId, gain: lesson.gain };
  }

  function editVideo(clipIndex) {
    const clip = state.clips[clipIndex];
    if (!clip) return { ok: false, reason: 'no-clip' };
    const boost = Math.round(clip.views * 0.5);
    clip.views += boost;
    state.videoViews += boost;
    state.videosEdited += 1;
    return { ok: true, clipIndex, views: clip.views, boost };
  }

  function cleanPark() {
    if (cashOf() < 40) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-40);
    state.parksCleaned += 1;
    state.fans += 5;
    return { ok: true, pay: 40 };
  }

  function waxLedge() {
    if (cashOf() < 10) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-10);
    state.ledgesWaxed += 1;
    return { ok: true, cost: 10 };
  }

  function challengeRivalSkater() {
    const res = playSkate(0.6 + state.rank * 0.05);
    if (!res.ok) return res;
    if (res.won) {
      state.rivalBeaten += 1;
      moveCash(50);
      state.totalEarned += 50;
      return { ...res, prize: 50 };
    }
    return { ...res, prize: 0 };
  }

  function skateMarathon() {
    if (state.energy < 50) return { ok: false, reason: 'too-tired' };
    state.energy -= 50;
    const distance = 5 + Math.floor(rnd() * 10);
    const earned = distance * 8;
    moveCash(earned);
    state.totalEarned += earned;
    state.totalScore += distance * 50;
    state.marathons += 1;
    return { ok: true, distance, earned };
  }

  function buildRamp() {
    if (cashOf() < 300) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-300);
    state.rampsBuilt += 1;
    state.fans += 20;
    return { ok: true, cost: 300, ramps: state.rampsBuilt };
  }

  return {
    name: 'Skatepark',
    state,
    startRun,
    landTrick,
    bail,
    endRun,
    buyGear,
    filmClip,
    signSponsor,
    enterComp,
    playSkate,
    heal,
    rest,
    tick,
    tickDay,
    interact,
    hudLine,
    stats,
    serialize,
    deserialize,
    takeLesson,
    editVideo,
    cleanPark,
    waxLedge,
    challengeRivalSkater,
    skateMarathon,
    buildRamp,
  };
}
