export const GRAFFITI_DISTRICTS = [
  { id: 'harbor', name: 'Harbor', heat: 2, turfIncome: 60, owner: 'neon-vandals', blurb: 'Crates and cranes, watched by the docks.' },
  { id: 'old-town', name: 'Old Town', heat: 1, turfIncome: 45, owner: 'none', blurb: 'Quiet lanes with old brick walls.' },
  { id: 'boardwalk', name: 'Boardwalk', heat: 2, turfIncome: 75, owner: 'chrome-kings', blurb: 'Bright boards above the sand.' },
  { id: 'downtown', name: 'Downtown', heat: 3, turfIncome: 110, owner: 'neon-vandals', blurb: 'Glass towers and camera eyes.' },
  { id: 'suburbs', name: 'Suburbs', heat: 0, turfIncome: 40, owner: 'none', blurb: 'Fences, garages, sleepy streets.' },
  { id: 'industrial', name: 'Industrial', heat: 1, turfIncome: 55, owner: 'street-saints', blurb: 'Warehouses nobody patrols at night.' },
  { id: 'university', name: 'University', heat: 1, turfIncome: 80, owner: 'none', blurb: 'Students who love a fresh wall.' },
  { id: 'marina', name: 'Marina', heat: 2, turfIncome: 100, owner: 'midnight-ink', blurb: 'White hulls and late-night lights.' },
];

export const SPRAY_BRANDS = [
  { id: 'rattle-can', name: 'Rattle-Can Basics', price: 15, quality: 1, blurb: 'Cheap, loud, gets the job done.' },
  { id: 'nova-spray', name: 'Nova Spray', price: 30, quality: 2, blurb: 'Clean lines, brighter colours.' },
  { id: 'krome-line', name: 'Krome-Line Pro', price: 60, quality: 3, blurb: 'Pro caps for sharp detail work.' },
  { id: 'aerosol-royal', name: 'Aerosol Royal', price: 120, quality: 4, blurb: 'The best paint money can buy.' },
];

export const RIVAL_CREWS = [
  { id: 'neon-vandals', name: 'Neon Vandals', skill: 7, aggression: 8, blurb: 'Fast, loud, everywhere at once.' },
  { id: 'chrome-kings', name: 'Chrome Kings', skill: 5, aggression: 6, blurb: 'Shiny pieces, old-school pride.' },
  { id: 'street-saints', name: 'Street Saints', skill: 4, aggression: 3, blurb: 'Slow and steady, hard to shift.' },
  { id: 'midnight-ink', name: 'Midnight Ink', skill: 8, aggression: 9, blurb: 'The crew everyone whispers about.' },
];

const RANKS = [
  { at: 0, name: 'Toy' },
  { at: 25, name: 'Up-and-Comer' },
  { at: 60, name: 'Street Legend' },
  { at: 120, name: 'Graffiti King' },
];
const BATTLE_PRIZE = 250;
const BATTLE_STYLE = 10;
const LOSS_HEAT = 2;
const MAX_CANS = 99;

function rankNameFor(points) {
  let out = RANKS[0].name;
  for (const r of RANKS) if (points >= r.at) out = r.name;
  return out;
}

function districtById(id) {
  for (const d of GRAFFITI_DISTRICTS) if (d.id === id) return d;
  return null;
}

function brandById(id) {
  for (const b of SPRAY_BRANDS) if (b.id === id) return b;
  return null;
}

function crewById(id) {
  for (const c of RIVAL_CREWS) if (c.id === id) return c;
  return null;
}

export function createGraffitiSystem(deps) {
  const d = deps || {};
  const rnd = typeof d.rng === 'function' ? d.rng : Math.random;
  const dayOf = typeof d.getDay === 'function' ? d.getDay : () => 1;
  const hourOf = typeof d.getHour === 'function' ? d.getHour : () => 12;
  const cashOf = typeof d.getCash === 'function' ? d.getCash : () => 0;
  const moveCash = typeof d.addCash === 'function' ? d.addCash : () => {};
  const pushHeat = typeof d.addHeat === 'function' ? d.addHeat : () => {};
  const say = typeof d.log === 'function' ? d.log : () => {};
  const heatOf = typeof d.getHeatLevel === 'function' ? d.getHeatLevel : () => 0;

  const owners = {};
  for (const dist of GRAFFITI_DISTRICTS) owners[dist.id] = dist.owner;

  const state = {
    cans: {},
    tags: {},
    owners,
    stylePoints: 0,
    totalEarned: 0,
    tagsPlaced: 0,
    tagsLost: 0,
    cansBought: 0,
    battlesWon: 0,
    battlesLost: 0,
    lastSettledDay: 0,
  };

  function bestCan() {
    let best = null;
    for (const b of SPRAY_BRANDS) {
      const held = state.cans[b.id] || 0;
      if (held > 0 && (!best || b.quality > best.quality)) best = b;
    }
    return best;
  }

  function totalCans() {
    let n = 0;
    for (const k of Object.keys(state.cans)) n += state.cans[k];
    return n;
  }

  function turfCount() {
    let n = 0;
    for (const k of Object.keys(state.owners)) if (state.owners[k] === 'you') n += 1;
    return n;
  }

  function buyCans(brandId, qty) {
    const brand = brandById(brandId);
    if (!brand) return { ok: false, reason: 'unknown-brand' };
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_CANS) return { ok: false, reason: 'bad-quantity' };
    const cost = brand.price * qty;
    if (cashOf() < cost) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-cost);
    state.cans[brandId] = (state.cans[brandId] || 0) + qty;
    state.cansBought += qty;
    say('Bought ' + qty + ' cans of ' + brand.name + '.');
    return { ok: true, brandId, brandName: brand.name, quantity: qty, cost, held: state.cans[brandId] };
  }

  function tag(districtId) {
    const dist = districtById(districtId);
    if (!dist) return { ok: false, reason: 'unknown-district' };
    const brand = bestCan();
    if (!brand) return { ok: false, reason: 'no-cans' };
    state.cans[brand.id] -= 1;
    if (state.cans[brand.id] <= 0) delete state.cans[brand.id];
    const quality = brand.quality + Math.floor(rnd() * 3);
    let heatAdded = 0;
    const hour = hourOf();
    if (dist.heat >= 2 && hour >= 6 && hour <= 20) {
      heatAdded = 1;
      pushHeat(1);
    }
    const existing = state.tags[districtId];
    if (existing && quality <= existing.quality) {
      return { ok: false, reason: 'tag-too-weak', quality, existingQuality: existing.quality, heatAdded, cansLeft: totalCans() };
    }
    state.tags[districtId] = { quality, age: 0 };
    state.owners[districtId] = 'you';
    state.stylePoints += quality;
    state.tagsPlaced += 1;
    say('Tagged ' + dist.name + ' with ' + brand.name + ' (quality ' + quality + ').');
    return { ok: true, districtId, districtName: dist.name, brandId: brand.id, quality, stylePoints: state.stylePoints, heatAdded, cansLeft: totalCans() };
  }

  function challengeRival(crewId) {
    const crew = crewById(crewId);
    if (!crew) return { ok: false, reason: 'unknown-crew' };
    let qualitySum = 0;
    let tagCount = 0;
    for (const k of Object.keys(state.tags)) {
      if (state.owners[k] === 'you') { qualitySum += state.tags[k].quality; tagCount += 1; }
    }
    const avg = tagCount > 0 ? qualitySum / tagCount : 0;
    const playerScore = Math.round((avg + rnd() * 5) * 10) / 10;
    const rivalScore = crew.skill;
    if (playerScore > rivalScore) {
      let taken = null;
      for (const dist of GRAFFITI_DISTRICTS) {
        if (state.owners[dist.id] === crewId) { taken = dist.id; break; }
      }
      if (taken) state.owners[taken] = 'you';
      moveCash(BATTLE_PRIZE);
      state.totalEarned += BATTLE_PRIZE;
      state.stylePoints += BATTLE_STYLE;
      state.battlesWon += 1;
      say('Beat ' + crew.name + ' in a style battle.');
      return { ok: true, won: true, crewId, crewName: crew.name, playerScore, rivalScore, districtTaken: taken, prize: BATTLE_PRIZE, stylePoints: state.stylePoints };
    }
    let lostTag = null;
    let weakest = null;
    let weakestQ = Infinity;
    for (const k of Object.keys(state.tags)) {
      if (state.owners[k] === 'you' && state.tags[k].quality < weakestQ) { weakestQ = state.tags[k].quality; weakest = k; }
    }
    if (weakest) {
      lostTag = weakest;
      delete state.tags[weakest];
      state.owners[weakest] = 'none';
    }
    pushHeat(LOSS_HEAT);
    state.battlesLost += 1;
    say('Lost a battle to ' + crew.name + '.');
    return { ok: true, won: false, crewId, crewName: crew.name, playerScore, rivalScore, tagLost: lostTag, heatAdded: LOSS_HEAT, stylePoints: state.stylePoints };
  }

  function crewRank() {
    return rankNameFor(state.stylePoints);
  }

  function districtStatus(districtId) {
    const dist = districtById(districtId);
    if (!dist) return { ok: false, reason: 'unknown-district' };
    const tagRec = state.tags[districtId];
    return {
      ok: true,
      id: dist.id,
      name: dist.name,
      heat: dist.heat,
      turfIncome: dist.turfIncome,
      owner: state.owners[districtId],
      controlled: state.owners[districtId] === 'you',
      tagQuality: tagRec ? tagRec.quality : null,
      tagAge: tagRec ? tagRec.age : null,
    };
  }

  function settleDay(day) {
    const today = day !== undefined && day !== null ? day : dayOf();
    if (state.lastSettledDay === today) return { ok: false, reason: 'already-settled' };
    state.lastSettledDay = today;
    const painted = [];
    for (const crew of RIVAL_CREWS) {
      const mine = Object.keys(state.tags).filter((k) => state.owners[k] === 'you');
      if (mine.length === 0) break;
      let lowest = Infinity;
      for (const k of mine) if (state.tags[k].quality < lowest) lowest = state.tags[k].quality;
      const weakest = mine.filter((k) => state.tags[k].quality === lowest);
      const victim = weakest[Math.floor(rnd() * weakest.length)];
      const q = state.tags[victim].quality;
      delete state.tags[victim];
      state.owners[victim] = crew.id;
      state.tagsLost += 1;
      const dist = districtById(victim);
      painted.push({ crewId: crew.id, crewName: crew.name, district: victim, quality: q, districtName: dist ? dist.name : victim });
    }
    for (const k of Object.keys(state.tags)) state.tags[k].age += 1;
    let income = 0;
    const paid = [];
    for (const dist of GRAFFITI_DISTRICTS) {
      if (state.owners[dist.id] === 'you') {
        income += dist.turfIncome;
        paid.push({ districtId: dist.id, income: dist.turfIncome });
      }
    }
    if (income > 0) {
      moveCash(income);
      state.totalEarned += income;
    }
    const standing = Object.keys(state.tags).filter((k) => state.owners[k] === 'you').length;
    return { ok: true, day: today, income, paid, paintedOver: painted, tagsLost: painted.length, tagsStanding: standing, stylePoints: state.stylePoints };
  }

  function stats() {
    return {
      tags: Object.keys(state.tags).length,
      totalCans: totalCans(),
      cansBought: state.cansBought,
      stylePoints: state.stylePoints,
      rank: crewRank(),
      districtsControlled: turfCount(),
      totalEarned: state.totalEarned,
      tagsPlaced: state.tagsPlaced,
      tagsLost: state.tagsLost,
      battlesWon: state.battlesWon,
      battlesLost: state.battlesLost,
      lastSettledDay: state.lastSettledDay || 0,
      heatLevel: heatOf(),
    };
  }

  function hudLine() {
    const tagCount = Object.keys(state.tags).length;
    if (tagCount === 0 && state.stylePoints === 0 && turfCount() === 0) return '';
    return ['Graffiti', tagCount + ' tags', state.stylePoints + ' style', crewRank(), turfCount() + ' turf'].join(' · ');
  }

  function serialize() {
    return {
      cans: { ...state.cans },
      tags: JSON.parse(JSON.stringify(state.tags)),
      owners: { ...state.owners },
      stylePoints: state.stylePoints,
      totalEarned: state.totalEarned,
      tagsPlaced: state.tagsPlaced,
      tagsLost: state.tagsLost,
      cansBought: state.cansBought,
      battlesWon: state.battlesWon,
      battlesLost: state.battlesLost,
      lastSettledDay: state.lastSettledDay,
    };
  }

  function deserialize(saved) {
    const s = saved || {};
    state.cans = {};
    if (s.cans) for (const k of Object.keys(s.cans)) {
      const v = Math.floor(Number(s.cans[k]));
      if (Number.isFinite(v) && v > 0) state.cans[k] = v;
    }
    state.tags = {};
    if (s.tags) for (const k of Object.keys(s.tags)) {
      const rec = s.tags[k] || {};
      state.tags[k] = { quality: Math.floor(Number(rec.quality) || 1), age: Math.floor(Number(rec.age) || 0) };
    }
    state.owners = {};
    for (const dist of GRAFFITI_DISTRICTS) {
      state.owners[dist.id] = s.owners && typeof s.owners[dist.id] === 'string' ? s.owners[dist.id] : dist.owner;
    }
    state.stylePoints = Math.floor(Number(s.stylePoints) || 0);
    state.totalEarned = Number(s.totalEarned) || 0;
    state.tagsPlaced = Math.floor(Number(s.tagsPlaced) || 0);
    state.tagsLost = Math.floor(Number(s.tagsLost) || 0);
    state.cansBought = Math.floor(Number(s.cansBought) || 0);
    state.battlesWon = Math.floor(Number(s.battlesWon) || 0);
    state.battlesLost = Math.floor(Number(s.battlesLost) || 0);
    state.lastSettledDay = Math.floor(Number(s.lastSettledDay) || 0);
    return { ok: true };
  }

  return {
    name: 'Graffiti',
    state,
    buyCans,
    tag,
    challengeRival,
    crewRank,
    districtStatus,
    settleDay,
    stats,
    hudLine,
    serialize,
    deserialize,
  };
}
