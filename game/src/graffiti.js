// Street-art crew system for Solara Nights.
//
// The player runs a small graffiti crew trying to make a name across the
// city. Cans of spray paint are bought from the corner shop, tags go up
// district by district, rival crews fight back over turf, and every
// district the crew holds pays a little turf money each day.
//
// This module is self contained. It knows nothing about the DOM, nothing
// about rendering, and nothing about any other game file. All it needs
// arrives through the single `deps` object handed to the factory: a random
// number source, the clock, the cash and heat hooks, and a log hook.
// Every one of those is optional; sensible stand-ins are used when a
// caller leaves one out.
//
// Money never lives here. The cash balance belongs to the caller: this
// system only asks how much there is (getCash) and moves it (addCash).
// Heat is reported through addHeat, and anything worth the player
// noticing is reported through log.
//
// Every public action answers with a plain object. A success carries
// `ok: true` and the numbers that describe what happened. A failure
// carries `ok: false` and a short kebab-case `reason` string, so callers
// can branch on the reason without parsing a message.
//
// Randomness always flows through `deps.rng`. The module never reaches
// for Math.random on its own, so a caller can hand it a seeded generator
// and replay a whole session exactly.
//
// Eight corners of the city. Each one carries a police heat level from 0
// (sleepy) to 3 (crawling with patrols) and a daily turf income in dollars
// paid to whoever controls the walls there. The `owner` field records who
// holds the district right now: 'you', one of the rival crew ids, or
// 'none' when nobody has claimed it yet. Rival crews start out holding
// the richer walls; the quiet districts start unclaimed.

export const GRAFFITI_DISTRICTS = [
  {
    id: 'harbor',
    name: 'The Harbor',
    heat: 2,
    turfIncome: 60,
    owner: 'neon-vandals',
    blurb: 'Container stacks and crane arms, seen for miles.',
  },
  {
    id: 'old-town',
    name: 'Old Town',
    heat: 1,
    turfIncome: 45,
    owner: 'none',
    blurb: 'Cobbled lanes and shuttered shopfronts.',
  },
  {
    id: 'boardwalk',
    name: 'Boardwalk',
    heat: 2,
    turfIncome: 75,
    owner: 'chrome-kings',
    blurb: 'Arcades, surf shops and a mile of wooden planks.',
  },
  {
    id: 'downtown',
    name: 'Downtown',
    heat: 3,
    turfIncome: 110,
    owner: 'neon-vandals',
    blurb: 'Glass towers and the busiest walls in the city.',
  },
  {
    id: 'suburbs',
    name: 'Suburbs',
    heat: 0,
    turfIncome: 40,
    owner: 'none',
    blurb: 'Quiet cul-de-sacs and sleepy garden fences.',
  },
  {
    id: 'industrial',
    name: 'Industrial Zone',
    heat: 1,
    turfIncome: 55,
    owner: 'street-saints',
    blurb: 'Warehouses, rail sidings and rusted silos.',
  },
  {
    id: 'university',
    name: 'University Quarter',
    heat: 1,
    turfIncome: 80,
    owner: 'none',
    blurb: 'Dorm blocks, lecture halls and late-night crowds.',
  },
  {
    id: 'marina',
    name: 'Marina',
    heat: 2,
    turfIncome: 100,
    owner: 'midnight-ink',
    blurb: 'Yachts, boatyards and long white pontoons.',
  },
];

// Four brands on the shop shelf. Price roughly doubles with each step
// up the shelf, and so does the quality of the line the paint lays down.
// Quality runs from 1 (thin, drippy) to 4 (buttery, opaque in one pass).

export const SPRAY_BRANDS = [
  {
    id: 'rattle-can',
    name: 'Rattle Can Basics',
    price: 15,
    quality: 1,
    blurb: 'Cheap, thin, and always in stock.',
  },
  {
    id: 'nova-spray',
    name: 'Nova Spray',
    price: 30,
    quality: 2,
    blurb: 'A decent everyday can with a clean cap.',
  },
  {
    id: 'krome-line',
    name: 'Krome Line Pro',
    price: 60,
    quality: 3,
    blurb: 'Pro grade. Rich colour, fat lines, no drips.',
  },
  {
    id: 'aerosol-royal',
    name: 'Aerosol Royal',
    price: 120,
    quality: 4,
    blurb: 'The crown jewel. One pass and the wall is yours.',
  },
];

// Four crews already working the city. `skill` is how good their pieces
// are in a style battle (1 to 10). `aggression` is how hard they push
// back when they lose (1 to 10); it flavours the log lines and the heat
// a lost battle brings.

export const RIVAL_CREWS = [
  {
    id: 'neon-vandals',
    name: 'Neon Vandals',
    skill: 7,
    aggression: 8,
    blurb: 'Loud colours, louder mouths, downtown regulars.',
  },
  {
    id: 'chrome-kings',
    name: 'Chrome Kings',
    skill: 5,
    aggression: 6,
    blurb: 'Silver-heavy throwies along the boardwalk.',
  },
  {
    id: 'street-saints',
    name: 'Street Saints',
    skill: 4,
    aggression: 3,
    blurb: 'Patient old heads who paint the warehouses.',
  },
  {
    id: 'midnight-ink',
    name: 'Midnight Ink',
    skill: 8,
    aggression: 9,
    blurb: 'The best hands in the city, and they know it.',
  },
];

// Ranks are earned purely from style points. A tag earns style equal to
// its quality, a battle win earns a flat bonus. The thresholds below are
// the whole ladder; there is no other way up it.

const CREW_RANKS = [
  { min: 0, name: 'Toy' },
  { min: 25, name: 'Up-and-Comer' },
  { min: 60, name: 'Street Legend' },
  { min: 120, name: 'Graffiti King' },
];

const BATTLE_WIN_STYLE = 10;

const BATTLE_WIN_CASH = 250;

const BATTLE_LOSS_HEAT = 2;

const HOT_DISTRICT_HEAT = 2;

// Daytime hours, inclusive on both ends. Tagging a hot wall while the
// sun is up risks a patrol spotting the crew.
const DAY_START_HOUR = 6;
const DAY_END_HOUR = 20;

const MAX_CANS_PER_BUY = 99;

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function findDistrict(districtId) {
  for (let i = 0; i < GRAFFITI_DISTRICTS.length; i += 1) {
    if (GRAFFITI_DISTRICTS[i].id === districtId) return GRAFFITI_DISTRICTS[i];
  }
  return null;
}

function findBrand(brandId) {
  for (let i = 0; i < SPRAY_BRANDS.length; i += 1) {
    if (SPRAY_BRANDS[i].id === brandId) return SPRAY_BRANDS[i];
  }
  return null;
}

function findCrew(crewId) {
  for (let i = 0; i < RIVAL_CREWS.length; i += 1) {
    if (RIVAL_CREWS[i].id === crewId) return RIVAL_CREWS[i];
  }
  return null;
}

function isWholeCount(value) {
  return typeof value === 'number' && Number.isFinite(value) && Math.floor(value) === value;
}

function rankNameForPoints(points) {
  let name = CREW_RANKS[0].name;
  for (let i = 0; i < CREW_RANKS.length; i += 1) {
    if (points >= CREW_RANKS[i].min) name = CREW_RANKS[i].name;
  }
  return name;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createGraffitiSystem(deps = {}) {
  const rng = typeof deps.rng === 'function' ? deps.rng : Math.random;
  const getDay = typeof deps.getDay === 'function' ? deps.getDay : () => 1;
  const getHour = typeof deps.getHour === 'function' ? deps.getHour : () => 12;
  const getCash = typeof deps.getCash === 'function' ? deps.getCash : () => 0;
  const addCash = typeof deps.addCash === 'function' ? deps.addCash : () => {};
  const addHeat = typeof deps.addHeat === 'function' ? deps.addHeat : () => {};
  const log = typeof deps.log === 'function' ? deps.log : () => {};
  const getHeatLevel = typeof deps.getHeatLevel === 'function' ? deps.getHeatLevel : () => 0;

  // cans: brand id -> cans on hand. tags: district id -> { quality, age }.
  // owners: district id -> 'you' | rival crew id | 'none'.
  const cans = {};
  const tags = {};
  const owners = {};
  for (let i = 0; i < GRAFFITI_DISTRICTS.length; i += 1) {
    owners[GRAFFITI_DISTRICTS[i].id] = GRAFFITI_DISTRICTS[i].owner;
  }

  let stylePoints = 0;
  let totalEarned = 0;
  let tagsPlaced = 0;
  let tagsLost = 0;
  let cansBought = 0;
  let battlesWon = 0;
  let battlesLost = 0;
  let lastSettledDay = null;

  // --- private helpers -----------------------------------------------------

  function cansTotal() {
    let total = 0;
    const ids = Object.keys(cans);
    for (let i = 0; i < ids.length; i += 1) total += cans[ids[i]];
    return total;
  }

  function tagCount() {
    return Object.keys(tags).length;
  }

  function districtsControlled() {
    let count = 0;
    const ids = Object.keys(owners);
    for (let i = 0; i < ids.length; i += 1) {
      if (owners[ids[i]] === 'you') count += 1;
    }
    return count;
  }

  // The best can on hand: the highest-quality brand with at least one
  // can left. Returns the brand record, or null when the bag is empty.
  function bestBrandOwned() {
    let best = null;
    for (let i = SPRAY_BRANDS.length - 1; i >= 0; i -= 1) {
      const brand = SPRAY_BRANDS[i];
      if ((cans[brand.id] || 0) > 0) {
        best = brand;
        break;
      }
    }
    return best;
  }

  function averageTagQuality() {
    const ids = Object.keys(tags);
    if (ids.length === 0) return 0;
    let sum = 0;
    for (let i = 0; i < ids.length; i += 1) sum += tags[ids[i]].quality;
    return sum / ids.length;
  }

  function lowestQualityTagDistricts() {
    const ids = Object.keys(tags);
    if (ids.length === 0) return [];
    let lowest = Infinity;
    for (let i = 0; i < ids.length; i += 1) {
      if (tags[ids[i]].quality < lowest) lowest = tags[ids[i]].quality;
    }
    const out = [];
    for (let i = 0; i < ids.length; i += 1) {
      if (tags[ids[i]].quality === lowest) out.push(ids[i]);
    }
    return out;
  }

  // -------------------------------------------------------------------------
  // Public actions
  // -------------------------------------------------------------------------

  function buyCans(brandId, qty) {
    const brand = findBrand(brandId);
    if (!brand) return { ok: false, reason: 'unknown-brand' };
    if (!isWholeCount(qty) || qty < 1 || qty > MAX_CANS_PER_BUY) {
      return { ok: false, reason: 'bad-quantity' };
    }
    const cost = brand.price * qty;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash' };
    addCash(-cost);
    cans[brand.id] = (cans[brand.id] || 0) + qty;
    cansBought += qty;
    log(`Bought ${qty}x ${brand.name} spray for $${cost}.`);
    return { ok: true, brand: brand.id, brandName: brand.name, qty, cost, cans: cans[brand.id] };
  }

  // Put a tag up in a district. One can of the best brand on hand is
  // spent, and the piece quality is that brand's quality plus a small
  // burst of inspiration from the rng (0 to 2). A fresh wall takes the
  // tag outright; a wall the crew already holds only swaps the piece
  // when the new one is strictly better. Tagging a hot district in
  // daylight draws a patrol, which adds one heat.
  function tag(districtId) {
    const district = findDistrict(districtId);
    if (!district) return { ok: false, reason: 'unknown-district' };
    const brand = bestBrandOwned();
    if (!brand) return { ok: false, reason: 'no-cans' };

    // The can is spent the moment the crew starts spraying, whether or
    // not the new piece ends up better than what is already there.
    cans[brand.id] -= 1;
    const bonus = Math.floor(rng() * 3);
    const quality = brand.quality + bonus;
    const hour = getHour();
    const isDaytime = hour >= DAY_START_HOUR && hour <= DAY_END_HOUR;
    const heatAdded = district.heat >= HOT_DISTRICT_HEAT && isDaytime ? 1 : 0;

    const existing = tags[districtId];
    if (existing && quality <= existing.quality) {
      if (heatAdded > 0) addHeat(heatAdded);
      log(`Tag in ${district.name} was not better than the old piece (${quality} vs ${existing.quality}).`);
      return {
        ok: false,
        reason: 'tag-too-weak',
        district: districtId,
        quality,
        existingQuality: existing.quality,
        heatAdded,
        cansLeft: cans[brand.id],
      };
    }

    tags[districtId] = { quality, age: 0 };
    owners[districtId] = 'you';
    stylePoints += quality;
    tagsPlaced += 1;
    if (heatAdded > 0) addHeat(heatAdded);
    log(`Tagged ${district.name} with ${brand.name} (quality ${quality}).`);
    return {
      ok: true,
      district: districtId,
      districtName: district.name,
      brand: brand.id,
      quality,
      stylePoints,
      heatAdded,
      cansLeft: cans[brand.id],
    };
  }

  // Challenge a rival crew to a style battle. The crew's score is the
  // average quality of its standing tags plus a roll of 0 to 5; the
  // rival's score is its flat skill number. A win takes the rival's
  // first listed district, pays $250, and adds style. A loss costs the
  // crew its weakest tag and adds heat.
  function challengeRival(crewId) {
    const crew = findCrew(crewId);
    if (!crew) return { ok: false, reason: 'unknown-crew' };

    const average = averageTagQuality();
    const roll = rng() * 5;
    const playerScore = average + roll;
    const rivalScore = crew.skill;
    const won = playerScore > rivalScore;

    if (won) {
      let taken = null;
      for (let i = 0; i < GRAFFITI_DISTRICTS.length; i += 1) {
        const district = GRAFFITI_DISTRICTS[i];
        if (owners[district.id] === crew.id) {
          owners[district.id] = 'you';
          taken = district.id;
          break;
        }
      }
      addCash(BATTLE_WIN_CASH);
      totalEarned += BATTLE_WIN_CASH;
      stylePoints += BATTLE_WIN_STYLE;
      battlesWon += 1;
      log(`Beat ${crew.name} in a style battle and took ${taken ? findDistrict(taken).name : 'no turf'} (+$${BATTLE_WIN_CASH}).`);
      return {
        ok: true,
        won: true,
        crew: crew.id,
        crewName: crew.name,
        playerScore,
        rivalScore,
        districtTaken: taken,
        prize: BATTLE_WIN_CASH,
        stylePoints,
      };
    }

    // Lost: the rival crew buffs the crew's weakest piece. When the
    // walls are already bare there is simply nothing left to lose.
    const weakest = lowestQualityTagDistricts();
    let lostTag = null;
    if (weakest.length > 0) {
      lostTag = weakest[0];
      const lostQuality = tags[lostTag].quality;
      delete tags[lostTag];
      owners[lostTag] = 'none';
      tagsLost += 1;
      log(`${crew.name} painted over the crew's piece in ${findDistrict(lostTag).name} (quality ${lostQuality}).`);
    }
    addHeat(BATTLE_LOSS_HEAT);
    battlesLost += 1;
    log(`Lost a style battle to ${crew.name} (+${BATTLE_LOSS_HEAT} heat).`);
    return {
      ok: true,
      won: false,
      crew: crew.id,
      crewName: crew.name,
      playerScore,
      rivalScore,
      tagLost: lostTag,
      heatAdded: BATTLE_LOSS_HEAT,
      stylePoints,
    };
  }

  function crewRank() {
    return rankNameForPoints(stylePoints);
  }

  function districtStatus(districtId) {
    const district = findDistrict(districtId);
    if (!district) return { ok: false, reason: 'unknown-district' };
    const ownTag = tags[districtId] || null;
    return {
      ok: true,
      id: district.id,
      name: district.name,
      heat: district.heat,
      turfIncome: district.turfIncome,
      owner: owners[districtId],
      controlled: owners[districtId] === 'you',
      tagQuality: ownTag ? ownTag.quality : null,
      tagAge: ownTag ? ownTag.age : null,
    };
  }

  // Daily settlement, run once per in-game day. Each rival crew paints
  // over one of the crew's lowest-quality tags (ties are broken with a
  // roll), the surviving tags age by a day, and every district the crew
  // still controls pays its turf income in a single cash move.
  function settleDay(day) {
    const dayNumber = typeof day === 'number' ? day : getDay();
    if (lastSettledDay !== null && dayNumber === lastSettledDay) {
      return { ok: false, reason: 'already-settled' };
    }
    lastSettledDay = dayNumber;

    const paintedOver = [];
    for (let c = 0; c < RIVAL_CREWS.length; c += 1) {
      const crew = RIVAL_CREWS[c];
      const weakest = lowestQualityTagDistricts();
      if (weakest.length === 0) break;
      const pick = Math.floor(rng() * weakest.length);
      const districtId = weakest[pick];
      const lostQuality = tags[districtId].quality;
      delete tags[districtId];
      owners[districtId] = crew.id;
      tagsLost += 1;
      paintedOver.push({ crew: crew.id, crewName: crew.name, district: districtId, quality: lostQuality });
      log(`${crew.name} painted over the crew's piece in ${findDistrict(districtId).name}.`);
    }

    const remaining = Object.keys(tags);
    for (let i = 0; i < remaining.length; i += 1) {
      tags[remaining[i]].age += 1;
    }

    let income = 0;
    const paid = [];
    for (let i = 0; i < GRAFFITI_DISTRICTS.length; i += 1) {
      const district = GRAFFITI_DISTRICTS[i];
      if (owners[district.id] === 'you') {
        income += district.turfIncome;
        paid.push({ district: district.id, income: district.turfIncome });
      }
    }
    if (income > 0) {
      addCash(income);
      totalEarned += income;
      log(`Turf income: +$${income} from ${paid.length} district(s).`);
    }

    return {
      ok: true,
      day: dayNumber,
      income,
      districtsPaid: paid,
      paintedOver,
      tagsLost: paintedOver.length,
      tagsStanding: tagCount(),
      stylePoints,
    };
  }

  // --- reporting -----------------------------------------------------------

  function stats() {
    return {
      tags: tagCount(),
      cansTotal: cansTotal(),
      cansBought,
      stylePoints,
      rank: rankNameForPoints(stylePoints),
      districtsControlled: districtsControlled(),
      totalEarned,
      tagsPlaced,
      tagsLost,
      battlesWon,
      battlesLost,
      lastSettledDay: lastSettledDay === null ? 0 : lastSettledDay,
      heatLevel: getHeatLevel(),
    };
  }

  function hudLine() {
    if (tagCount() === 0 && stylePoints === 0 && districtsControlled() === 0) return '';
    return `Graffiti: ${tagCount()} tags · ${stylePoints} style · ${rankNameForPoints(stylePoints)} · ${districtsControlled()} turf`;
  }

  // --- persistence ---------------------------------------------------------

  function serialize() {
    const cansOut = {};
    const brandIds = Object.keys(cans);
    for (let i = 0; i < brandIds.length; i += 1) cansOut[brandIds[i]] = cans[brandIds[i]];
    const tagsOut = {};
    const tagIds = Object.keys(tags);
    for (let i = 0; i < tagIds.length; i += 1) {
      tagsOut[tagIds[i]] = { quality: tags[tagIds[i]].quality, age: tags[tagIds[i]].age };
    }
    const ownersOut = {};
    const ownerIds = Object.keys(owners);
    for (let i = 0; i < ownerIds.length; i += 1) ownersOut[ownerIds[i]] = owners[ownerIds[i]];
    return {
      cans: cansOut,
      tags: tagsOut,
      owners: ownersOut,
      stylePoints,
      totalEarned,
      tagsPlaced,
      tagsLost,
      cansBought,
      battlesWon,
      battlesLost,
      lastSettledDay,
    };
  }

  function deserialize(d) {
    const data = d && typeof d === 'object' ? d : {};
    const savedCans = data.cans && typeof data.cans === 'object' ? data.cans : {};
    const savedTags = data.tags && typeof data.tags === 'object' ? data.tags : {};
    const savedOwners = data.owners && typeof data.owners === 'object' ? data.owners : {};

    const canIds = Object.keys(cans);
    for (let i = 0; i < canIds.length; i += 1) delete cans[canIds[i]];
    const canKeys = Object.keys(savedCans);
    for (let i = 0; i < canKeys.length; i += 1) {
      const amount = savedCans[canKeys[i]];
      if (typeof amount === 'number' && amount > 0) cans[canKeys[i]] = Math.floor(amount);
    }

    const tagIds = Object.keys(tags);
    for (let i = 0; i < tagIds.length; i += 1) delete tags[tagIds[i]];
    const savedTagKeys = Object.keys(savedTags);
    for (let i = 0; i < savedTagKeys.length; i += 1) {
      const entry = savedTags[savedTagKeys[i]];
      if (entry && typeof entry === 'object') {
        tags[savedTagKeys[i]] = {
          quality: typeof entry.quality === 'number' ? entry.quality : 1,
          age: typeof entry.age === 'number' ? entry.age : 0,
        };
      }
    }

    for (let i = 0; i < GRAFFITI_DISTRICTS.length; i += 1) {
      const id = GRAFFITI_DISTRICTS[i].id;
      owners[id] = typeof savedOwners[id] === 'string' ? savedOwners[id] : GRAFFITI_DISTRICTS[i].owner;
    }

    stylePoints = typeof data.stylePoints === 'number' ? data.stylePoints : 0;
    totalEarned = typeof data.totalEarned === 'number' ? data.totalEarned : 0;
    tagsPlaced = typeof data.tagsPlaced === 'number' ? data.tagsPlaced : 0;
    tagsLost = typeof data.tagsLost === 'number' ? data.tagsLost : 0;
    cansBought = typeof data.cansBought === 'number' ? data.cansBought : 0;
    battlesWon = typeof data.battlesWon === 'number' ? data.battlesWon : 0;
    battlesLost = typeof data.battlesLost === 'number' ? data.battlesLost : 0;
    lastSettledDay = typeof data.lastSettledDay === 'number' ? data.lastSettledDay : null;
    return { ok: true };
  }

  return {
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
