// Concrete Kings — skatepark and BMX: tricks, combos, competitions,
// sponsors and video clips. Round 7, all-new system. The park has bowls,
/// rails and a half-pipe; your board (or BMX) has a trick list, and your
// run has a combo meter that multiplies everything — until you bail.
// Land clean runs, enter the Saturday comp, get a sponsor, and film clips
// that go viral. Concrete doesn't forgive, but it remembers.
export const SKATE_PARK = { id: 'concrete-kings', name: 'Concrete Kings Skatepark', x: -40, z: 190, district: 'Campus' };

export const SKATE_PARKS = [
  { id: 'concrete-kings', name: 'Concrete Kings', x: -40, z: 190, difficulty: 1, features: ['bowl', 'rail', 'quarter'] },
  { id: 'harbor-diy', name: 'Harbor DIY', x: -180, z: 120, difficulty: 2, features: ['ledge', 'stair', 'rail'] },
  { id: 'stadium-park', name: 'Stadium Skatepark', x: -200, z: -40, difficulty: 3, features: ['half-pipe', 'bowl', 'vert'] },
  { id: 'rooftop', name: 'Rooftop Spot', x: 20, z: -140, difficulty: 4, features: ['gap', 'rail', 'ledge'] },
];

export const SKATE_TRICKS = [
  { id: 'ollie', name: 'Ollie', base: 100, risk: 0.05, level: 1, style: 'flat' },
  { id: 'kickflip', name: 'Kickflip', base: 250, risk: 0.15, level: 1, style: 'flat' },
  { id: 'heelflip', name: 'Heelflip', base: 250, risk: 0.15, level: 1, style: 'flat' },
  { id: 'pop-shove', name: 'Pop Shove-It', base: 200, risk: 0.12, level: 1, style: 'flat' },
  { id: 'grind-50', name: '50-50 Grind', base: 300, risk: 0.2, level: 2, style: 'rail' },
  { id: 'boardslide', name: 'Boardslide', base: 350, risk: 0.22, level: 2, style: 'rail' },
  { id: 'nosegrind', name: 'Nose Grind', base: 450, risk: 0.3, level: 3, style: 'rail' },
  { id: 'tailgrab', name: 'Tail Grab', base: 400, risk: 0.25, level: 2, style: 'air' },
  { id: 'air-360', name: '360 Air', base: 600, risk: 0.35, level: 3, style: 'air' },
  { id: 'mctwist', name: 'McTwist', base: 900, risk: 0.45, level: 4, style: 'air' },
  { id: 'manual', name: 'Manual', base: 150, risk: 0.08, level: 1, style: 'flat' },
  { id: 'nose-manual', name: 'Nose Manual', base: 250, risk: 0.18, level: 2, style: 'flat' },
  { id: 'rock-roll', name: 'Rock to Fakie', base: 500, risk: 0.3, level: 3, style: 'bowl' },
  { id: 'invert', name: 'Invert', base: 800, risk: 0.4, level: 4, style: 'bowl' },
  { id: 'smith', name: 'Smith Grind', base: 550, risk: 0.35, level: 3, style: 'rail' },
  { id: 'bluntslide', name: 'Bluntslide', base: 700, risk: 0.42, level: 4, style: 'rail' },
  { id: 'varial', name: 'Varial Flip', base: 350, risk: 0.2, level: 2, style: 'flat' },
  { id: 'hardflip', name: 'Hardflip', base: 500, risk: 0.32, level: 3, style: 'flat' },
  { id: 'laser', name: 'Laser Flip', base: 750, risk: 0.45, level: 4, style: 'flat' },
  { id: 'darkslide', name: 'Darkslide', base: 850, risk: 0.5, level: 5, style: 'rail' },
];

export const BMX_TRICKS = [
  { id: 'bunnyhop', name: 'Bunny Hop', base: 100, risk: 0.05, level: 1 },
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
  { id: 'board-pro', name: 'Pro Deck', price: 220, kind: 'board', skill: 2, style: 1 },
  { id: 'board-carbon', name: 'Carbon Deck', price: 500, kind: 'board', skill: 4, style: 2 },
  { id: 'bmx-basic', name: 'BMX Bike', price: 400, kind: 'bmx', skill: 0, style: 0 },
  { id: 'bmx-pro', name: 'Pro BMX', price: 900, kind: 'bmx', skill: 3, style: 2 },
  { id: 'wheels', name: 'Fast Wheels', price: 120, kind: 'upgrade', skill: 1, style: 0 },
  { id: 'bearings', name: 'Ceramic Bearings', price: 180, kind: 'upgrade', skill: 1, style: 1 },
  { id: 'grip', name: 'Grip Tape Art', price: 60, kind: 'upgrade', skill: 0, style: 2 },
  { id: 'helmet', name: 'Helmet', price: 80, kind: 'safety', skill: 0, style: 0, protection: 0.5 },
  { id: 'pads', name: 'Pad Set', price: 70, kind: 'safety', skill: 0, style: 0, protection: 0.4 },
  { id: 'shoes', name: 'Skate Shoes', price: 140, kind: 'upgrade', skill: 2, style: 1 },
  { id: 'camera', name: 'Action Camera', price: 300, kind: 'video', skill: 0, style: 1 },
];

export const SKATE_SPONSORS = [
  { id: 'local-shop', name: 'Local Skate Shop', needScore: 5000, pay: 100, perks: ['free gear'] },
  { id: 'energy', name: 'Bolt Energy', needScore: 20000, pay: 300, perks: ['free gear', 'travel'] },
  { id: 'shoe-brand', name: 'Kickflip Shoes', needScore: 50000, pay: 700, perks: ['free gear', 'signature shoe'] },
  { id: 'board-brand', name: 'Concrete Kings Co.', needScore: 100000, pay: 1500, perks: ['pro model', 'world tour'] },
];

export const SKATE_COMPS = [
  { id: 'saturday-jam', name: 'Saturday Jam', entry: 20, prize: 150, needLevel: 1, day: 6 },
  { id: 'street-league', name: 'Street League Qualifier', entry: 100, prize: 800, needLevel: 2, day: 3 },
  { id: 'vert-masters', name: 'Vert Masters', entry: 250, prize: 2500, needLevel: 3, day: 5 },
  { id: 'solara-open', name: 'Solara Open', entry: 500, prize: 8000, needLevel: 4, day: 6 },
];

export const SKATE_EVENTS = [
  { id: 'crowd', name: 'Crowd Gathers', text: 'A crowd gathers to watch you ride.' },
  { id: 'security', name: 'Security', text: 'Security tells you to move along.' },
  { id: 'kid-fan', name: 'Kid Fan', text: 'A kid asks for your autograph!' },
  { id: 'rain-park', name: 'Rain', text: 'Rain makes the concrete slick and dangerous.' },
  { id: 'filmer', name: 'Filmer', text: 'A filmer shows up — land something big!' },
  { id: 'rival-skater', name: 'Rival Skater', text: 'A rival skater challenges you to a game of S.K.A.T.E.' },
  { id: 'cop-park', name: 'Cop', text: 'A cop watches you from the edge of the park.' },
  { id: 'sponsor-scout', name: 'Sponsor Scout', text: 'A sponsor scout is watching from the bleachers.' },
];

export const SKATE_RANKS = [
  { rank: 0, name: 'Poser', scoreNeeded: 0, mult: 1.0 },
  { rank: 1, name: 'Skater', scoreNeeded: 5000, mult: 1.1 },
  { rank: 2, name: 'Local', scoreNeeded: 20000, mult: 1.25 },
  { rank: 3, name: 'AM', scoreNeeded: 50000, mult: 1.4 },
  { rank: 4, name: 'Pro', scoreNeeded: 120000, mult: 1.6 },
  { rank: 5, name: 'Legend', scoreNeeded: 300000, mult: 2.0 },
];

export function skateRankFor(totalScore) {
  let rank = 0;
  for (let i = 0; i < SKATE_RANKS.length; i++) {
    if (totalScore >= SKATE_RANKS[i].scoreNeeded) rank = i;
  }
  return rank;
}

export function createSkateparkSystem(deps = {}) {
  const rng = deps.rng || Math.random;
  const getCash = deps.getCash || (() => 0);
  const addCash = deps.addCash || (() => {});
  const addHeat = deps.addHeat || (() => {});
  const log = deps.log || (() => {});
  const getDay = deps.getDay || (() => 1);
  const getHour = deps.getHour || (() => 12);
  const getPlayerPos = deps.getPlayerPos || (() => ({ x: 0, z: 0 }));

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
    run: null, // { parkId, tricks: [], combo, score, timeLeft, mode }
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
  };

  function rankInfo() { return SKATE_RANKS[state.rank]; }
  function gearInfo() {
    return SKATE_GEAR.find((g) => g.id === state.activeGear) || SKATE_GEAR[0];
  }
  function hasGear(id) { return state.gear.includes(id); }
  function skillBonus() {
    let s = 0;
    for (const g of state.gear) {
      const def = SKATE_GEAR.find((x) => x.id === g);
      if (def && def.skill) s += def.skill;
    }
    return s + state.rank + (state.skillBonus || 0);
  }
  function styleBonus() {
    let s = 0;
    for (const g of state.gear) {
      const def = SKATE_GEAR.find((x) => x.id === g);
      if (def && def.style) s += def.style;
    }
    return s;
  }
  function protection() {
    let p = 0;
    for (const g of state.gear) {
      const def = SKATE_GEAR.find((x) => x.id === g);
      if (def && def.protection) p += def.protection;
    }
    return Math.min(0.8, p);
  }
  function bailChance(trick) {
    const base = trick.risk;
    const skill = skillBonus() * 0.02;
    return Math.max(0.02, base - skill);
  }

  function startRun(parkId, mode = 'skate') {
    if (state.run) return { ok: false, reason: 'run-active' };
    const park = SKATE_PARKS.find((p) => p.id === parkId);
    if (!park) return { ok: false, reason: 'no-such-park' };
    if (state.energy < 20) return { ok: false, reason: 'too-tired' };
    if (mode === 'bmx' && !hasGear('bmx-basic') && !hasGear('bmx-pro')) {
      return { ok: false, reason: 'no-bmx' };
    }
    if (mode === 'skate' && gearInfo().kind === 'bmx') {
      return { ok: false, reason: 'wrong-gear' };
    }
    state.run = {
      parkId, parkName: park.name, mode,
      tricks: [], combo: 0, score: 0, timeLeft: 60,
      startedDay: getDay(), bestTrick: null,
    };
    state.currentPark = parkId;
    state.lastParkDay = getDay();
    log(`Run started at ${park.name} (${mode})! 60 seconds — chain tricks, don't bail!`);
    return { ok: true, run: { ...state.run, tricks: [] } };
  }

  function landTrick(trickId) {
    const run = state.run;
    if (!run) return { ok: false, reason: 'no-run' };
    const list = run.mode === 'bmx' ? BMX_TRICKS : SKATE_TRICKS;
    const trick = list.find((t) => t.id === trickId);
    if (!trick) return { ok: false, reason: 'no-such-trick' };
    if (!state.tricksLearned.includes(trickId) && trick.level > 1) {
      return { ok: false, reason: 'not-learned', trick: trickId };
    }
    if (state.energy < 5) return { ok: false, reason: 'too-tired' };
    state.energy = Math.max(0, state.energy - 4);
    // Bail check: the combo dies with you.
    if (rng() < bailChance(trick)) {
      return bail(trick);
    }
    run.combo += 1;
    const comboMult = 1 + (run.combo - 1) * 0.25;
    const styleMult = 1 + styleBonus() * 0.05;
    const rankMult = rankInfo().mult;
    const points = Math.round(trick.base * comboMult * styleMult * rankMult);
    run.score += points;
    run.tricks.push({ trick: trickId, points, combo: run.combo });
    state.tricksLanded[trickId] = (state.tricksLanded[trickId] || 0) + 1;
    if (!run.bestTrick || points > run.bestTrick.points) run.bestTrick = { trick: trickId, points };
    if (run.combo > state.bestCombo) state.bestCombo = run.combo;
    log(`${trick.name}! +${points} (combo x${run.combo}, total ${run.score})`);
    return { ok: true, trick: trickId, points, combo: run.combo, score: run.score };
  }

  function bail(trick) {
    const run = state.run;
    const lost = run ? run.score : 0;
    state.run = null;
    state.bails += 1;
    state.runs += 1;
    const injuryRoll = rng();
    let injury = 0;
    if (injuryRoll < 0.3) {
      injury = Math.round((10 + rng() * 25) * (1 - protection()));
      state.health = Math.max(0, state.health - injury);
      state.injuries += 1;
      log(`BAIL! You eat concrete on the ${trick.name}. Lost ${lost} points. Injury -${injury} health.`);
    } else {
      log(`BAIL! You slip out on the ${trick.name}. Lost ${lost} points.`);
    }
    state.energy = Math.max(0, state.energy - 10);
    return { ok: true, bailed: true, lost, injury, health: Math.round(state.health) };
  }

  function endRun() {
    const run = state.run;
    if (!run) return { ok: false, reason: 'no-run' };
    state.run = null;
    state.runs += 1;
    state.runsLanded += 1;
    state.totalScore += run.score;
    state.dayScore += run.score;
    if (run.score > state.bestRun) state.bestRun = run.score;
    const cash = Math.round(run.score / 50);
    if (cash > 0) {
      addCash(cash);
      state.totalEarned += cash;
      state.tipsEarned += cash;
    }
    const fans = Math.floor(run.score / 1000);
    state.fans += fans;
    const newRank = skateRankFor(state.totalScore);
    let promoted = false;
    if (newRank > state.rank) {
      state.rank = newRank;
      promoted = true;
      log(`RANK UP! You are now ${SKATE_RANKS[newRank].name}! Score multiplier x${SKATE_RANKS[newRank].mult}.`);
    }
    // Learn a new trick every few landed runs.
    if (state.runsLanded % 3 === 0) {
      const list = SKATE_TRICKS.filter((t) => !state.tricksLearned.includes(t.id) && t.level <= state.rank + 1);
      if (list.length > 0) {
        const next = list[Math.floor(rng() * list.length)];
        state.tricksLearned.push(next.id);
        log(`You learned a new trick: ${next.name}!`);
      }
    }
    log(`Run over at ${run.parkName}: ${run.score} points, ${run.tricks.length} tricks. Cashed $${cash}, +${fans} fans.`);
    return { ok: true, score: run.score, tricks: run.tricks.length, cash, fans, promoted, bestTrick: run.bestTrick };
  }

  function buyGear(gearId) {
    const gear = SKATE_GEAR.find((g) => g.id === gearId);
    if (!gear) return { ok: false, reason: 'no-such-gear' };
    if (hasGear(gearId)) {
      state.activeGear = gearId;
      return { ok: true, gear: gearId, switched: true };
    }
    if (getCash() < gear.price) return { ok: false, reason: 'no-cash', need: gear.price };
    addCash(-gear.price);
    state.gear.push(gearId);
    if (gear.kind === 'board' || gear.kind === 'bmx') state.activeGear = gearId;
    log(`Bought ${gear.name} for $${gear.price}!`);
    return { ok: true, gear: gearId, price: gear.price };
  }

  function filmClip() {
    if (!state.run) return { ok: false, reason: 'no-run' };
    if (!hasGear('camera')) return { ok: false, reason: 'no-camera' };
    const run = state.run;
    const views = Math.round(run.score * (2 + rng() * 5) * (1 + state.fans * 0.01));
    const clip = { day: getDay(), score: run.score, views, park: run.parkId };
    state.clips.push(clip);
    state.videoViews += views;
    if (views > 50000) {
      state.clipsViral += 1;
      const bonus = 200;
      addCash(bonus);
      state.totalEarned += bonus;
      log(`CLIP WENT VIRAL! ${views.toLocaleString()} views! Sponsor bonus $${bonus}.`);
      return { ok: true, views, viral: true, bonus };
    }
    log(`Clip filmed: ${views.toLocaleString()} views so far.`);
    return { ok: true, views, viral: false };
  }

  function signSponsor(sponsorId) {
    const sponsor = SKATE_SPONSORS.find((s) => s.id === sponsorId);
    if (!sponsor) return { ok: false, reason: 'no-such-sponsor' };
    if (state.sponsor) return { ok: false, reason: 'sponsor-active' };
    if (state.totalScore < sponsor.needScore) return { ok: false, reason: 'score-too-low', need: sponsor.needScore };
    state.sponsor = sponsorId;
    state.sponsorPay = sponsor.pay;
    log(`SIGNED with ${sponsor.name}! $${sponsor.pay}/day. Perks: ${sponsor.perks.join(', ')}.`);
    return { ok: true, sponsor: sponsorId, pay: sponsor.pay };
  }

  function enterComp(compId) {
    const comp = SKATE_COMPS.find((c) => c.id === compId);
    if (!comp) return { ok: false, reason: 'no-such-comp' };
    if (state.rank < comp.needLevel) return { ok: false, reason: 'rank-too-low', need: SKATE_RANKS[comp.needLevel].name };
    if (getCash() < comp.entry) return { ok: false, reason: 'no-cash', need: comp.entry };
    if (state.energy < 30) return { ok: false, reason: 'too-tired' };
    addCash(-comp.entry);
    state.compsEntered += 1;
    state.energy = Math.max(0, state.energy - 30);
    // Three judged runs: your best run vs the field.
    const myBest = state.bestRun + Math.round(rng() * 2000);
    const field = [];
    for (let i = 0; i < 5; i++) {
      field.push(3000 + Math.floor(rng() * (4000 + comp.needLevel * 3000)));
    }
    field.sort((a, b) => b - a);
    const place = field.filter((s) => s > myBest).length + 1;
    if (place === 1) {
      addCash(comp.prize);
      state.totalEarned += comp.prize;
      state.compsWon += 1;
      state.fans += 100;
      log(`COMP WIN! ${comp.name} — first place! Prize $${comp.prize}! +100 fans.`);
      return { ok: true, won: true, place: 1, score: myBest, prize: comp.prize, field };
    }
    log(`${comp.name}: placed ${place} of 6 (best ${myBest}). The field was strong.`);
    return { ok: true, won: false, place, score: myBest, prize: 0, field };
  }

  function playSkate(opponentSkill = 0.5) {
    if (state.run) return { ok: false, reason: 'run-active' };
    if (state.energy < 15) return { ok: false, reason: 'too-tired' };
    state.energy = Math.max(0, state.energy - 15);
    // Game of S.K.A.T.E.: alternate trick calls; first to 5 letters loses.
    let myLetters = 0;
    let oppLetters = 0;
    const rounds = [];
    while (myLetters < 5 && oppLetters < 5) {
      const trick = SKATE_TRICKS[Math.floor(rng() * SKATE_TRICKS.length)];
      const iLand = rng() > bailChance(trick);
      const oppLands = rng() < opponentSkill;
      if (iLand && !oppLands) {
        oppLetters += 1;
        rounds.push(`${trick.name}: you land, they miss — they get ${'SKATE'[oppLetters - 1]}`);
      } else if (!iLand && oppLands) {
        myLetters += 1;
        rounds.push(`${trick.name}: you bail, they land — you get ${'SKATE'[myLetters - 1]}`);
      } else {
        rounds.push(`${trick.name}: both ${iLand ? 'land' : 'bail'} — no letter`);
      }
      if (rounds.length > 20) break;
    }
    const won = oppLetters >= 5;
    if (won) {
      state.skateGamesWon += 1;
      const prize = 30;
      addCash(prize);
      state.totalEarned += prize;
      state.fans += 10;
      log(`S.K.A.T.E. WIN! ${rounds.length} rounds. +$${prize}, +10 fans.`);
      return { ok: true, won: true, rounds, score: `${myLetters}-${oppLetters}` };
    }
    state.skateGamesLost += 1;
    log(`S.K.A.T.E. loss. ${rounds.length} rounds.`);
    return { ok: true, won: false, rounds, score: `${myLetters}-${oppLetters}` };
  }

  function heal() {
    const cost = 30;
    if (state.health >= 100) return { ok: false, reason: 'full-health' };
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.health = 100;
    log(`Patched up at the skate clinic for $${cost}. Good as new.`);
    return { ok: true, cost };
  }

  function rest() {
    state.energy = 100;
    state.health = Math.min(100, state.health + 10);
    log('You rest on the bench. Energy full, health +10.');
    return { ok: true, energy: 100 };
  }

  function tick(dt) {
    // A live run ticks down; time up ends the run with what you banked.
    if (state.run) {
      state.run.timeLeft -= dt;
      if (state.run.timeLeft <= 0) {
        log('Time! Run over.');
        endRun();
      }
    }
    // Energy recovers slowly when not riding; health recovers slower.
    if (!state.run) {
      state.energy = Math.min(100, state.energy + dt * 0.8);
      if (state.health < 100) state.health = Math.min(100, state.health + dt * 0.2);
    }
    // Random park events, rare.
    if (rng() < dt * 0.002) {
      const ev = SKATE_EVENTS[Math.floor(rng() * SKATE_EVENTS.length)];
      state.eventsSeen[ev.id] = (state.eventsSeen[ev.id] || 0) + 1;
      switch (ev.id) {
        case 'crowd':
          state.fans += 5;
          log('A crowd gathers to watch you ride. +5 fans.');
          break;
        case 'security':
          addHeat(5);
          log('Security tells you to move along. Heat +5.');
          break;
        case 'kid-fan':
          state.fans += 15;
          log('A kid asks for your autograph! +15 fans.');
          break;
        case 'rain-park':
          if (state.run) {
            log('Rain makes the concrete slick — bail risk up!');
          }
          break;
        case 'filmer':
          if (state.run && hasGear('camera')) {
            filmClip();
          } else {
            log('A filmer shows up — land something big!');
          }
          break;
        case 'rival-skater':
          playSkate(0.5 + state.rank * 0.05);
          break;
        case 'cop-park':
          addHeat(3);
          log('A cop watches you from the edge of the park. Heat +3.');
          break;
        case 'sponsor-scout':
          if (state.totalScore > 20000 && !state.sponsor) {
            log('A sponsor scout is watching from the bleachers. Impress them!');
          }
          break;
        default:
          log(`Skatepark: ${ev.text}`);
          break;
      }
    }
  }

  function tickDay(day) {
    // Sponsor pay lands every morning; energy and health reset.
    if (state.sponsor) {
      addCash(state.sponsorPay);
      state.totalEarned += state.sponsorPay;
      log(`Sponsor pay: $${state.sponsorPay} from ${SKATE_SPONSORS.find((s) => s.id === state.sponsor).name}.`);
    }
    state.energy = 100;
    if (state.dayScore > state.bestDay) state.bestDay = state.dayScore;
    state.dayScore = 0;
    return { day, totalScore: state.totalScore, rank: SKATE_RANKS[state.rank].name };
  }

  function interact() {
    const p = getPlayerPos();
    const park = SKATE_PARKS.find((s) => Math.hypot(s.x - p.x, s.z - p.z) < 20);
    if (!park) return false;
    if (state.run) {
      // Mid-run: land your best learned trick.
      const learned = state.tricksLearned[state.tricksLearned.length - 1] || 'ollie';
      const res = landTrick(learned);
      return res.ok || res.bailed;
    }
    const res = startRun(park.id, 'skate');
    return res.ok || res.reason === 'too-tired';
  }

  function hudLine() {
    if (state.run) {
      const r = state.run;
      return `SKATE ${r.parkName} · ${r.score} pts · combo x${r.combo} · ${Math.ceil(r.timeLeft)}s`;
    }
    const p = getPlayerPos();
    const park = SKATE_PARKS.find((s) => Math.hypot(s.x - p.x, s.z - p.z) < 20);
    if (park) {
      return `SKATEPARK ${park.name} · ${SKATE_RANKS[state.rank].name} · best ${state.bestRun} · fans ${state.fans}`;
    }
    if (state.health < 30) return 'SKATER hurt — heal at the park!';
    return '';
  }

  function stats() {
    return {
      rank: SKATE_RANKS[state.rank].name,
      rankIndex: state.rank,
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
      style: styleBonus(),
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
      lessonsTaken: state.lessonsTaken || 0,
      videosEdited: state.videosEdited || 0,
      parksCleaned: state.parksCleaned || 0,
      ledgesWaxed: state.ledgesWaxed || 0,
      rivalBeaten: state.rivalBeaten || 0,
      marathons: state.marathons || 0,
      rampsBuilt: state.rampsBuilt || 0,
      skillBonus: state.skillBonus || 0,
    };
  }

  function deserialize(d) {
    if (!d) return;
    state.rank = d.rank ?? 0;
    state.totalScore = d.totalScore ?? 0;
    state.bestRun = d.bestRun ?? 0;
    state.bestCombo = d.bestCombo ?? 0;
    state.runs = d.runs ?? 0;
    state.runsLanded = d.runsLanded ?? 0;
    state.bails = d.bails ?? 0;
    state.injuries = d.injuries ?? 0;
    state.health = d.health ?? 100;
    state.energy = d.energy ?? 100;
    state.gear = [...(d.gear || ['board-basic'])];
    state.activeGear = d.activeGear || 'board-basic';
    state.tricksLanded = { ...(d.tricksLanded || {}) };
    state.tricksLearned = [...(d.tricksLearned || ['ollie'])];
    state.sponsor = d.sponsor ?? null;
    state.sponsorPay = d.sponsorPay ?? 0;
    state.clips = (d.clips || []).map((c) => ({ ...c }));
    state.clipsViral = d.clipsViral ?? 0;
    state.videoViews = d.videoViews ?? 0;
    state.compsWon = d.compsWon ?? 0;
    state.compsEntered = d.compsEntered ?? 0;
    state.skateGamesWon = d.skateGamesWon ?? 0;
    state.skateGamesLost = d.skateGamesLost ?? 0;
    state.totalEarned = d.totalEarned ?? 0;
    state.tipsEarned = d.tipsEarned ?? 0;
    state.fans = d.fans ?? 0;
    state.bestDay = d.bestDay ?? 0;
    state.lastParkDay = d.lastParkDay ?? 0;
    state.currentPark = d.currentPark || 'concrete-kings';
    state.eventsSeen = { ...(d.eventsSeen || {}) };
    state.lessonsTaken = d.lessonsTaken ?? 0;
    state.videosEdited = d.videosEdited ?? 0;
    state.parksCleaned = d.parksCleaned ?? 0;
    state.ledgesWaxed = d.ledgesWaxed ?? 0;
    state.rivalBeaten = d.rivalBeaten ?? 0;
    state.marathons = d.marathons ?? 0;
    state.rampsBuilt = d.rampsBuilt ?? 0;
    state.skillBonus = d.skillBonus ?? 0;
    state.run = null;
    state.dayScore = 0;
  }

  // --- Round 7 top-up: lessons, video editing, park cleanup, shop ---
  const SKATE_LESSONS = [
    { id: 'beginner', name: 'Beginner Lesson', price: 30, gain: 1, time: 20 },
    { id: 'advanced', name: 'Advanced Coaching', price: 80, gain: 3, time: 40 },
    { id: 'pro-clinic', name: 'Pro Clinic', price: 200, gain: 6, time: 60 },
  ];
  function takeLesson(lessonId) {
    const lesson = SKATE_LESSONS.find((l) => l.id === lessonId);
    if (!lesson) return { ok: false, reason: 'no-such-lesson' };
    if (getCash() < lesson.price) return { ok: false, reason: 'no-cash', need: lesson.price };
    addCash(-lesson.price);
    state.lessonsTaken = (state.lessonsTaken || 0) + 1;
    state.skillBonus = (state.skillBonus || 0) + lesson.gain;
    state.totalScore += lesson.gain * 100;
    log(`${lesson.name} complete! Skill +${lesson.gain}.`);
    return { ok: true, lesson: lessonId, gain: lesson.gain };
  }
  function editVideo(clipIndex) {
    if (!state.clips[clipIndex]) return { ok: false, reason: 'no-such-clip' };
    const clip = state.clips[clipIndex];
    const boost = Math.round(clip.views * 0.5);
    clip.views += boost;
    state.videoViews += boost;
    state.videosEdited = (state.videosEdited || 0) + 1;
    log(`Edited clip ${clipIndex}: +${boost.toLocaleString()} views after the cut!`);
    return { ok: true, clip: clipIndex, views: clip.views, boost };
  }
  function cleanPark() {
    const pay = 40;
    addCash(pay);
    state.totalEarned += pay;
    state.parksCleaned = (state.parksCleaned || 0) + 1;
    state.fans += 5;
    log(`Cleaned up the skatepark. The locals respect it. Pay $${pay}, +5 fans.`);
    return { ok: true, pay };
  }
  function waxLedge() {
    const cost = 10;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.ledgesWaxed = (state.ledgesWaxed || 0) + 1;
    log(`Waxed the ledge for $${cost}. Grinds slide like butter now.`);
    return { ok: true, cost };
  }
  function challengeRivalSkater() {
    const res = playSkate(0.6 + state.rank * 0.05);
    if (res.ok && res.won) {
      state.rivalBeaten = (state.rivalBeaten || 0) + 1;
      const prize = 50;
      addCash(prize);
      state.totalEarned += prize;
      log(`Rival skater beaten! Side bet $${prize}.`);
      return { ...res, prize };
    }
    return res;
  }
  function skateMarathon() {
    if (state.energy < 50) return { ok: false, reason: 'too-tired' };
    state.energy = Math.max(0, state.energy - 50);
    const distance = 5 + Math.floor(rng() * 10);
    const earned = distance * 8;
    addCash(earned);
    state.totalEarned += earned;
    state.marathons = (state.marathons || 0) + 1;
    state.totalScore += distance * 50;
    log(`Skate marathon: ${distance}km across the city! Earned $${earned}.`);
    return { ok: true, distance, earned };
  }
  function buildRamp() {
    const cost = 300;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.rampsBuilt = (state.rampsBuilt || 0) + 1;
    state.fans += 20;
    log(`Built a new ramp at the DIY spot for $${cost}. +20 fans. The scene grows.`);
    return { ok: true, cost, ramps: state.rampsBuilt };
  }

  return {
    state,
    tick,
    tickDay,
    interact,
    hudLine,
    stats,
    serialize,
    deserialize,
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
    skillBonus,
    styleBonus,
    protection,
    hasGear,
    gearInfo,
    rankInfo,
    takeLesson,
    editVideo,
    cleanPark,
    waxLedge,
    challengeRivalSkater,
    skateMarathon,
    buildRamp,
  };
}
