// studio.js — Solara Nights music studio system (round 6 rebuild).
//
// A self-contained factory: no imports, no DOM, no network. The host game
// hands the factory a deps object and the system does everything through
// it. Every random draw goes through deps.rng, every dollar moves through
// deps.getCash / deps.addCash, every heat point through deps.addHeat and
// every notable moment through deps.log. All deps are optional and fall
// back to harmless defaults, so the system can be constructed bare for
// inspection and still behave.
//
// The fantasy: the player runs a small recording studio on the Solara
// strip. They cut tracks in a genre, optionally pay a featured artist to
// lift the quality, release the track onto the weekly chart, play gigs at
// local venues to grow a fanbase, and eventually sign a label deal that
// doubles royalties and pays a daily advance.
//
// Money rules, in one place:
//   * Recording a track costs the genre production cost plus the featured
//     artist fee when one is booked. The cash check happens before any
//     money moves, so a failed recording never charges the player.
//   * A released track earns royalties every day it sits on the chart.
//     A track at chart position P earns (11 - P) * 8 dollars, so a number
//     one record pays 80 a day and a number ten record pays 8.
//   * Holding a label deal doubles every royalty payment and adds a flat
//     150 dollars a day as an advance against future earnings.
//   * A gig pays the venue payout scaled by the fanbase: payout * (1 +
//     fans / 1000), rounded down. A bigger crowd means a bigger cheque.
//
// Chart rules, in one place:
//   * A track is born with quality 40 + rng * 40 + feature bonus, capped
//     at 100. A bare session lands between 40 and 79; a star feature can
//     push a great take all the way to a perfect 100.
//   * Releasing a track puts it on the chart at a starting position set
//     by its quality: 11 - floor(quality / 10), clamped to 1..10. A
//     quality 90 record debuts at number 2; a quality 40 record debuts
//     at number 7.
//   * Every day each charted track drifts one step toward its natural
//     position, which is the same quality-derived slot. Strong records
//     climb, weak records slide, and nothing teleports overnight.
//
// Fan rules, in one place:
//   * Gigs grow the fanbase by a tenth of the venue capacity, rounded
//     down. A 200-capacity lounge adds 20 fans; a 5000-capacity bowl
//     adds 500.
//   * Every charted track adds 5 fans a day, quietly, while it charts.
//   * Gigs need a released track and at least 100 fans, and a label deal
//     needs 3 released tracks and 500 fans. The studio is a slow build.
//
// Every public action returns a plain object. Success is { ok: true,
// ...numbers }; failure is { ok: false, reason: 'kebab-case' }.

export const STUDIO_GENRES = [
  {
    id: 'neon-pop',
    name: 'Neon Pop',
    cost: 320,
    baseAppeal: 18,
    tagline: 'Bright hooks and glitter choruses for the strip at midnight.',
    mood: 'upbeat',
  },
  {
    id: 'bay-bass',
    name: 'Bay Bass',
    cost: 450,
    baseAppeal: 24,
    tagline: 'Low-end pressure built for car stereos and dockside speakers.',
    mood: 'heavy',
  },
  {
    id: 'sunset-soul',
    name: 'Sunset Soul',
    cost: 260,
    baseAppeal: 14,
    tagline: 'Warm vocals and slow grooves for the golden hour crowd.',
    mood: 'smooth',
  },
  {
    id: 'chrome-rock',
    name: 'Chrome Rock',
    cost: 500,
    baseAppeal: 28,
    tagline: 'Loud guitars and louder drums, polished until they shine.',
    mood: 'loud',
  },
  {
    id: 'midnight-jazz',
    name: 'Midnight Jazz',
    cost: 380,
    baseAppeal: 20,
    tagline: 'Late-night horns for the after-hours rooms nobody advertises.',
    mood: 'late',
  },
];

export const STUDIO_FEATURES = [
  {
    id: 'luna-mara',
    name: 'Luna Mara',
    fee: 900,
    appealBonus: 12,
    style: 'silk-voiced pop siren',
  },
  {
    id: 'dj-velvet',
    name: 'DJ Velvet',
    fee: 600,
    appealBonus: 8,
    style: 'veteran turntablist with a velvet touch',
  },
  {
    id: 'kiko-flame',
    name: 'Kiko Flame',
    fee: 1200,
    appealBonus: 14,
    style: 'firebrand rapper with a chart streak',
  },
  {
    id: 'sister-pearl',
    name: 'Sister Pearl',
    fee: 450,
    appealBonus: 6,
    style: 'gospel-rooted harmony singer',
  },
  {
    id: 'mr-octane',
    name: 'Mr Octane',
    fee: 1500,
    appealBonus: 15,
    style: 'arena-rock frontman, all swagger',
  },
  {
    id: 'yuki-snow',
    name: 'Yuki Snow',
    fee: 300,
    appealBonus: 4,
    style: 'bedroom-pop newcomer with a loyal niche',
  },
];

export const STUDIO_VENUES = [
  {
    id: 'rooftop-lounge',
    name: 'Rooftop Lounge',
    capacity: 200,
    payout: 400,
    vibe: 'Intimate skyline room above the strip.',
  },
  {
    id: 'boardwalk-hall',
    name: 'Boardwalk Hall',
    capacity: 600,
    payout: 900,
    vibe: 'Salt-air hall where the pier crowd gathers.',
  },
  {
    id: 'arena-dome',
    name: 'Arena Dome',
    capacity: 2500,
    payout: 1800,
    vibe: 'The big dome under the Solara lights.',
  },
  {
    id: 'sunset-bowl',
    name: 'Sunset Bowl',
    capacity: 5000,
    payout: 2500,
    vibe: 'Open-air bowl, the largest stage in the city.',
  },
];

// The highest quality a track can ever reach. Recording caps here even
// when a star feature and a lucky take would push past it.
export const STUDIO_MAX_QUALITY = 100;

// The lowest quality a bare session can roll. Recording adds rng * 40 on
// top of this floor, before any feature bonus.
export const STUDIO_BASE_QUALITY = 40;

// The spread a lucky take can add above the base quality.
export const STUDIO_QUALITY_SPREAD = 40;

// Fans needed before any venue will book the act.
export const STUDIO_MIN_FANS_FOR_GIG = 100;

// Released tracks needed before a label will talk terms.
export const STUDIO_TRACKS_FOR_DEAL = 3;

// Fans needed before a label will talk terms.
export const STUDIO_FANS_FOR_DEAL = 500;

// Flat daily advance while a label deal is held.
export const STUDIO_DEAL_DAILY_ADVANCE = 150;

// Fans gained per charted track each day.
export const STUDIO_FANS_PER_CHARTED_TRACK = 5;

// Royalty dollars per chart step per day: a track at position P earns
// (11 - P) * STUDIO_ROYALTY_PER_STEP each day it charts.
export const STUDIO_ROYALTY_PER_STEP = 8;

// Chart positions run 1 (best) to 10 (worst). Anything outside that band
// is not charting at all and is stored as null on the track.
export const STUDIO_CHART_TOP = 1;
export const STUDIO_CHART_BOTTOM = 10;

// Clamp a number into a closed interval. Used for quality, chart slots
// and anything else that must never escape its legal band.
function clampNumber(value, low, high) {
  if (value < low) return low;
  if (value > high) return high;
  return value;
}

// The chart slot a track of this quality naturally belongs in. Higher
// quality means a smaller (better) number: quality 95 sits at 2, quality
// 42 sits at 7, quality 100 sits at 1. Both the release debut and the
// daily drift target use this one formula, so a track never drifts to a
// slot its debut would not have predicted.
export function chartPositionForQuality(quality) {
  const q = clampNumber(Math.floor(quality), 0, STUDIO_MAX_QUALITY);
  const slot = 11 - Math.floor(q / 10);
  return clampNumber(slot, STUDIO_CHART_TOP, STUDIO_CHART_BOTTOM);
}

// A human-readable band for a quality score, used in logs and HUD text.
export function qualityBand(quality) {
  if (quality >= 90) return 'masterpiece';
  if (quality >= 75) return 'hit';
  if (quality >= 60) return 'solid';
  if (quality >= 50) return 'rough';
  return 'demo';
}

// The royalty a single track earns in one day at a chart position, before
// any label-deal doubling. Position 1 pays 80, position 10 pays 8, and
// an uncharted track pays nothing.
export function royaltyForPosition(chartPosition) {
  if (chartPosition === null || chartPosition === undefined) return 0;
  const pos = clampNumber(chartPosition, STUDIO_CHART_TOP, STUDIO_CHART_BOTTOM);
  return (11 - pos) * STUDIO_ROYALTY_PER_STEP;
}

// The gig cheque for a venue at a given fan count, before the money is
// moved. Payout scales linearly with fans: every 1000 fans doubles the
// base payout, and the result is rounded down to whole dollars.
export function gigPayoutFor(venueId, fans) {
  const venue = STUDIO_VENUES.find((v) => v.id === venueId);
  if (!venue) return 0;
  const safeFans = Math.max(0, Math.floor(fans));
  return Math.floor(venue.payout * (1 + safeFans / 1000));
}

// Fans a gig at this venue adds to the fanbase: a tenth of capacity.
export function gigFansFor(venueId) {
  const venue = STUDIO_VENUES.find((v) => v.id === venueId);
  if (!venue) return 0;
  return Math.floor(venue.capacity / 10);
}

// Look a genre up by id. Returns the genre object or null.
export function genreInfo(genreId) {
  return STUDIO_GENRES.find((g) => g.id === genreId) || null;
}

// Look a featured artist up by id. Returns the feature object or null.
export function featureInfo(featureId) {
  if (featureId === null || featureId === undefined) return null;
  return STUDIO_FEATURES.find((f) => f.id === featureId) || null;
}

// Look a venue up by id. Returns the venue object or null.
export function venueInfo(venueId) {
  return STUDIO_VENUES.find((v) => v.id === venueId) || null;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createStudioSystem(deps) {
  const safe = deps || {};
  const rng = typeof safe.rng === 'function' ? safe.rng : Math.random;
  const getDay = typeof safe.getDay === 'function' ? safe.getDay : () => 1;
  const getHour = typeof safe.getHour === 'function' ? safe.getHour : () => 12;
  const getCash = typeof safe.getCash === 'function' ? safe.getCash : () => 0;
  const addCash = typeof safe.addCash === 'function' ? safe.addCash : () => {};
  const addHeat = typeof safe.addHeat === 'function' ? safe.addHeat : () => {};
  const log = typeof safe.log === 'function' ? safe.log : () => {};
  const getHeatLevel = typeof safe.getHeatLevel === 'function' ? safe.getHeatLevel : () => 0;

  // --- Mutable state. Everything here round-trips through serialize. ---
  let tracks = [];
  let fans = 0;
  let labelDeal = false;
  let daysSinceLastRelease = 0;
  let nextTrackNumber = 1;
  let totalEarned = 0;
  let totalSpent = 0;
  let totalRoyalties = 0;
  let totalGigPayout = 0;
  let gigsPlayed = 0;
  let tracksRecorded = 0;
  let tracksReleased = 0;
  let lastTickDay = null;

  // Find a track in the local list by id. Returns the track or undefined.
  function findTrack(trackId) {
    return tracks.find((t) => t.id === trackId);
  }

  // Count how many tracks have been released so far.
  function releasedCount() {
    let n = 0;
    for (const t of tracks) if (t.released) n += 1;
    return n;
  }

  // Count how many tracks are currently sitting on the chart.
  function chartedCount() {
    let n = 0;
    for (const t of tracks) {
      if (t.released && t.chartPosition !== null && t.chartPosition !== undefined) n += 1;
    }
    return n;
  }

  // The best (smallest) chart position among released tracks, or 0 when
  // nothing is charting. Used by stats so the HUD can brag accurately.
  function bestChartPosition() {
    let best = 0;
    for (const t of tracks) {
      if (!t.released) continue;
      if (t.chartPosition === null || t.chartPosition === undefined) continue;
      if (best === 0 || t.chartPosition < best) best = t.chartPosition;
    }
    return best;
  }

  // Build the deterministic display title for a new track. No randomness
  // is spent here on purpose: the rng budget of a recording belongs to
  // the quality roll alone, so seeded tests can predict it exactly.
  function titleFor(genre, number) {
    return genre.name + ' Session ' + number;
  }

  // --- Recording -----------------------------------------------------------

  // Cut a new track in a genre, optionally with a featured artist.
  //
  // Cost is the genre production cost plus the feature fee when one is
  // booked. Quality is 40 + rng * 40 + feature appeal bonus, floored and
  // capped at 100. The track starts unreleased and uncharted.
  //
  // Failures, checked in this order:
  //   unknown-genre      the genre id is not in STUDIO_GENRES
  //   unknown-feature    a feature id was given but is not in STUDIO_FEATURES
  //   not-enough-cash    the wallet cannot cover cost + fee
  function recordTrack(genreId, featureIdOrNull) {
    const genre = genreInfo(genreId);
    if (!genre) return { ok: false, reason: 'unknown-genre' };
    const feature = featureIdOrNull ? featureInfo(featureIdOrNull) : null;
    if (featureIdOrNull && !feature) return { ok: false, reason: 'unknown-feature' };
    const fee = feature ? feature.fee : 0;
    const cost = genre.cost + fee;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash' };
    const bonus = feature ? feature.appealBonus : 0;
    const roll = rng();
    const quality = clampNumber(
      Math.floor(STUDIO_BASE_QUALITY + roll * STUDIO_QUALITY_SPREAD + bonus),
      0,
      STUDIO_MAX_QUALITY,
    );
    addCash(-cost);
    totalSpent += cost;
    const number = nextTrackNumber;
    nextTrackNumber += 1;
    const track = {
      id: 'track-' + number,
      title: titleFor(genre, number),
      genre: genre.id,
      genreName: genre.name,
      feature: feature ? feature.id : null,
      featureName: feature ? feature.name : null,
      quality,
      released: false,
      chartPosition: null,
      lifetimeSales: 0,
      recordedDay: getDay(),
    };
    tracks.push(track);
    tracksRecorded += 1;
    const band = qualityBand(quality);
    if (feature) {
      log('Recorded ' + track.title + ' feat. ' + feature.name + ' — quality ' + quality + ' (' + band + '), cost $' + cost + '.');
    } else {
      log('Recorded ' + track.title + ' — quality ' + quality + ' (' + band + '), cost $' + cost + '.');
    }
    return {
      ok: true,
      trackId: track.id,
      title: track.title,
      genre: genre.id,
      feature: feature ? feature.id : null,
      quality,
      band,
      cost,
      cash: getCash(),
    };
  }

  // --- Releasing -----------------------------------------------------------

  // Put a recorded track on the weekly chart. The debut slot comes from
  // quality: better records debut higher. Releasing resets the clock
  // that counts days since the last release.
  //
  // Failures:
  //   unknown-track      no track with that id exists
  //   already-released   the track is already out
  function releaseTrack(trackId) {
    const track = findTrack(trackId);
    if (!track) return { ok: false, reason: 'unknown-track' };
    if (track.released) return { ok: false, reason: 'already-released' };
    track.released = true;
    track.chartPosition = chartPositionForQuality(track.quality);
    track.releasedDay = getDay();
    tracksReleased += 1;
    daysSinceLastRelease = 0;
    log('Released ' + track.title + ' — debuts at #' + track.chartPosition + ' on the weekly chart.');
    return {
      ok: true,
      trackId: track.id,
      title: track.title,
      quality: track.quality,
      chartPosition: track.chartPosition,
      released: true,
    };
  }

  // --- Gigs ----------------------------------------------------------------

  // Play a live gig at a venue. Needs at least one released track and at
  // least 100 fans. Pays venue payout scaled by the fanbase and grows
  // the fanbase by a tenth of the venue capacity.
  //
  // Failures, checked in this order:
  //   unknown-venue        the venue id is not in STUDIO_VENUES
  //   no-released-track    nothing is out yet, so there is nothing to play
  //   not-enough-fans      the crowd is too small for a live booking
  function playGig(venueId) {
    const venue = venueInfo(venueId);
    if (!venue) return { ok: false, reason: 'unknown-venue' };
    if (releasedCount() === 0) return { ok: false, reason: 'no-released-track' };
    if (fans < STUDIO_MIN_FANS_FOR_GIG) return { ok: false, reason: 'not-enough-fans' };
    const payout = gigPayoutFor(venue.id, fans);
    const fansGained = gigFansFor(venue.id);
    addCash(payout);
    totalEarned += payout;
    totalGigPayout += payout;
    gigsPlayed += 1;
    fans += fansGained;
    log('Gig at ' + venue.name + ': $' + payout + ' and +' + fansGained + ' fans (' + fans + ' total).');
    return {
      ok: true,
      venueId: venue.id,
      venue: venue.name,
      payout,
      fansGained,
      fans,
      cash: getCash(),
    };
  }

  // --- Label deal ----------------------------------------------------------

  // Sign with a label. Needs 3 released tracks and 500 fans. While the
  // deal is held, royalties double and a 150 dollar daily advance lands.
  //
  // Failures, checked in this order:
  //   already-signed       a deal is already in force
  //   not-enough-tracks    fewer than 3 tracks released
  //   not-enough-fans      fewer than 500 fans
  function signDeal() {
    if (labelDeal) return { ok: false, reason: 'already-signed' };
    if (releasedCount() < STUDIO_TRACKS_FOR_DEAL) return { ok: false, reason: 'not-enough-tracks' };
    if (fans < STUDIO_FANS_FOR_DEAL) return { ok: false, reason: 'not-enough-fans' };
    labelDeal = true;
    log('Signed a label deal — royalties doubled, $150 daily advance.');
    return { ok: true, labelDeal: true, fans, released: releasedCount() };
  }

  // --- Day hook ------------------------------------------------------------

  // Run once per in-game day. Each released track drifts one chart step
  // toward its natural quality slot. Royalties pay (11 - position) * 8
  // per charted track, doubled while a label deal is held, plus a flat
  // 150 while a deal is held. Fans grow by 5 per charted track. Calling
  // twice for the same day is a failure, not a double payment.
  //
  // Failures:
  //   already-settled      tickDay already ran for this day
  function tickDay(day) {
    const dayNumber = day === undefined || day === null ? getDay() : day;
    if (lastTickDay === dayNumber) return { ok: false, reason: 'already-settled' };
    lastTickDay = dayNumber;
    daysSinceLastRelease += 1;
    let charted = 0;
    let royalties = 0;
    const moves = [];
    for (const track of tracks) {
      if (!track.released) continue;
      if (track.chartPosition === null || track.chartPosition === undefined) continue;
      const natural = chartPositionForQuality(track.quality);
      const before = track.chartPosition;
      if (track.chartPosition > natural) track.chartPosition -= 1;
      else if (track.chartPosition < natural) track.chartPosition += 1;
      if (track.chartPosition !== before) {
        moves.push({ trackId: track.id, from: before, to: track.chartPosition });
      }
      const pay = royaltyForPosition(track.chartPosition);
      royalties += pay;
      track.lifetimeSales += (11 - track.chartPosition) * 10;
      charted += 1;
    }
    if (labelDeal) royalties *= 2;
    const advance = labelDeal ? STUDIO_DEAL_DAILY_ADVANCE : 0;
    const total = royalties + advance;
    if (total > 0) {
      addCash(total);
      totalEarned += total;
      totalRoyalties += royalties;
    }
    const fansGained = charted * STUDIO_FANS_PER_CHARTED_TRACK;
    fans += fansGained;
    if (charted > 0) {
      log('Day ' + dayNumber + ': ' + charted + ' track(s) charting, $' + total + ' royalties' + (labelDeal ? ' (label deal)' : '') + ', +' + fansGained + ' fans.');
    }
    return {
      ok: true,
      day: dayNumber,
      charted,
      royalties,
      advance,
      total,
      fansGained,
      fans,
      moves,
      labelDeal,
      cash: getCash(),
    };
  }

  // --- Reporting -----------------------------------------------------------

  // A plain snapshot of the numbers that matter: catalogue size, chart
  // health, fanbase, deal status and lifetime money in both directions.
  function stats() {
    return {
      tracks: tracks.length,
      recorded: tracksRecorded,
      released: tracksReleased,
      charted: chartedCount(),
      bestChart: bestChartPosition(),
      fans,
      labelDeal,
      daysSinceLastRelease,
      gigsPlayed,
      totalEarned,
      totalSpent,
      totalRoyalties,
      totalGigPayout,
      cash: getCash(),
      heat: getHeatLevel(),
      hour: getHour(),
      day: getDay(),
    };
  }

  // One short line for the HUD. Empty while the studio has no tracks and
  // no fans, so a fresh save does not clutter the screen with a zeroed
  // readout. Once anything exists, the line shows fans, catalogue and
  // the best chart slot, plus a deal marker when signed.
  function hudLine() {
    if (tracks.length === 0 && fans === 0) return '';
    const best = bestChartPosition();
    const chartBit = best > 0 ? ' · best #' + best : '';
    const dealBit = labelDeal ? ' · LABEL' : '';
    return 'Studio: ' + fans + ' fans · ' + releasedCount() + '/' + tracks.length + ' released' + chartBit + dealBit;
  }

  // --- Persistence ---------------------------------------------------------

  // Plain JSON-able state. Track objects are copied field by field so a
  // caller mutating the returned snapshot cannot corrupt live state.
  function serialize() {
    return {
      tracks: tracks.map((t) => ({
        id: t.id,
        title: t.title,
        genre: t.genre,
        genreName: t.genreName,
        feature: t.feature,
        featureName: t.featureName,
        quality: t.quality,
        released: t.released,
        chartPosition: t.chartPosition,
        lifetimeSales: t.lifetimeSales,
        recordedDay: t.recordedDay,
        releasedDay: t.releasedDay === undefined ? null : t.releasedDay,
      })),
      fans,
      labelDeal,
      daysSinceLastRelease,
      nextTrackNumber,
      totalEarned,
      totalSpent,
      totalRoyalties,
      totalGigPayout,
      gigsPlayed,
      tracksRecorded,
      tracksReleased,
      lastTickDay,
    };
  }

  // Restore state from a serialize() snapshot. Missing fields fall back
  // to defaults, and malformed track rows are skipped rather than
  // crashing the load. A null or non-object snapshot resets to a fresh
  // studio instead of throwing.
  function deserialize(d) {
    const data = d && typeof d === 'object' ? d : {};
    const rawTracks = Array.isArray(data.tracks) ? data.tracks : [];
    tracks = [];
    for (const raw of rawTracks) {
      if (!raw || typeof raw !== 'object') continue;
      if (typeof raw.id !== 'string') continue;
      tracks.push({
        id: raw.id,
        title: typeof raw.title === 'string' ? raw.title : raw.id,
        genre: typeof raw.genre === 'string' ? raw.genre : 'neon-pop',
        genreName: typeof raw.genreName === 'string' ? raw.genreName : raw.genre,
        feature: raw.feature === undefined ? null : raw.feature,
        featureName: raw.featureName === undefined ? null : raw.featureName,
        quality: typeof raw.quality === 'number' ? clampNumber(Math.floor(raw.quality), 0, STUDIO_MAX_QUALITY) : 40,
        released: raw.released === true,
        chartPosition: typeof raw.chartPosition === 'number' ? raw.chartPosition : null,
        lifetimeSales: typeof raw.lifetimeSales === 'number' ? raw.lifetimeSales : 0,
        recordedDay: typeof raw.recordedDay === 'number' ? raw.recordedDay : 1,
        releasedDay: typeof raw.releasedDay === 'number' ? raw.releasedDay : null,
      });
    }
    fans = typeof data.fans === 'number' ? Math.max(0, Math.floor(data.fans)) : 0;
    labelDeal = data.labelDeal === true;
    daysSinceLastRelease = typeof data.daysSinceLastRelease === 'number' ? Math.max(0, Math.floor(data.daysSinceLastRelease)) : 0;
    nextTrackNumber = typeof data.nextTrackNumber === 'number' ? Math.max(1, Math.floor(data.nextTrackNumber)) : tracks.length + 1;
    totalEarned = typeof data.totalEarned === 'number' ? data.totalEarned : 0;
    totalSpent = typeof data.totalSpent === 'number' ? data.totalSpent : 0;
    totalRoyalties = typeof data.totalRoyalties === 'number' ? data.totalRoyalties : 0;
    totalGigPayout = typeof data.totalGigPayout === 'number' ? data.totalGigPayout : 0;
    gigsPlayed = typeof data.gigsPlayed === 'number' ? Math.max(0, Math.floor(data.gigsPlayed)) : 0;
    tracksRecorded = typeof data.tracksRecorded === 'number' ? Math.max(0, Math.floor(data.tracksRecorded)) : tracks.length;
    tracksReleased = typeof data.tracksReleased === 'number' ? Math.max(0, Math.floor(data.tracksReleased)) : releasedCount();
    lastTickDay = typeof data.lastTickDay === 'number' ? data.lastTickDay : null;
    return { ok: true, tracks: tracks.length, fans, labelDeal };
  }

  // --- Lookups -------------------------------------------------------------

  // A copy of one track's public fields, or null when the id is unknown.
  // The copy keeps callers from editing live state by accident.
  function trackInfo(trackId) {
    const track = findTrack(trackId);
    if (!track) return null;
    return {
      id: track.id,
      title: track.title,
      genre: track.genre,
      genreName: track.genreName,
      feature: track.feature,
      featureName: track.featureName,
      quality: track.quality,
      band: qualityBand(track.quality),
      released: track.released,
      chartPosition: track.chartPosition,
      naturalPosition: chartPositionForQuality(track.quality),
      lifetimeSales: track.lifetimeSales,
      recordedDay: track.recordedDay,
      releasedDay: track.releasedDay === undefined ? null : track.releasedDay,
    };
  }

  // Copies of every track, in recording order. Safe to render directly.
  function listTracks() {
    return tracks.map((t) => trackInfo(t.id));
  }

  // Copies of every released track, in recording order.
  function releasedTracks() {
    return tracks.filter((t) => t.released).map((t) => trackInfo(t.id));
  }

  // Copies of every track currently on the chart, best position first.
  function chartedTracks() {
    const charted = tracks.filter(
      (t) => t.released && t.chartPosition !== null && t.chartPosition !== undefined,
    );
    charted.sort((a, b) => a.chartPosition - b.chartPosition);
    return charted.map((t) => trackInfo(t.id));
  }

  // The cheapest genre in the catalogue, for players counting dollars.
  function cheapestGenre() {
    let cheapest = STUDIO_GENRES[0];
    for (const genre of STUDIO_GENRES) {
      if (genre.cost < cheapest.cost) cheapest = genre;
    }
    return { id: cheapest.id, name: cheapest.name, cost: cheapest.cost };
  }

  // The most expensive genre in the catalogue.
  function priciestGenre() {
    let priciest = STUDIO_GENRES[0];
    for (const genre of STUDIO_GENRES) {
      if (genre.cost > priciest.cost) priciest = genre;
    }
    return { id: priciest.id, name: priciest.name, cost: priciest.cost };
  }

  // The largest venue in the catalogue.
  function biggestVenue() {
    let biggest = STUDIO_VENUES[0];
    for (const venue of STUDIO_VENUES) {
      if (venue.capacity > biggest.capacity) biggest = venue;
    }
    return { id: biggest.id, name: biggest.name, capacity: biggest.capacity, payout: biggest.payout };
  }

  // The featured artist with the highest appeal bonus.
  function topFeature() {
    let top = STUDIO_FEATURES[0];
    for (const feature of STUDIO_FEATURES) {
      if (feature.appealBonus > top.appealBonus) top = feature;
    }
    return { id: top.id, name: top.name, fee: top.fee, appealBonus: top.appealBonus };
  }

  // How much the next recording would cost in a genre, with or without
  // a feature, before any money moves. Useful for the UI price tag.
  function recordingCost(genreId, featureIdOrNull) {
    const genre = genreInfo(genreId);
    if (!genre) return 0;
    const feature = featureIdOrNull ? featureInfo(featureIdOrNull) : null;
    if (featureIdOrNull && !feature) return 0;
    return genre.cost + (feature ? feature.fee : 0);
  }

  // Whether the wallet can currently afford a recording in this genre
  // with this feature. Pure check, no side effects.
  function canAffordRecording(genreId, featureIdOrNull) {
    const cost = recordingCost(genreId, featureIdOrNull);
    if (cost === 0) return genreInfo(genreId) !== null && getCash() >= 0;
    return getCash() >= cost;
  }

  // Expected daily royalty income from the current chart, before any
  // label doubling. Lets the player see what tomorrow pays.
  function expectedDailyRoyalties() {
    let sum = 0;
    for (const track of tracks) {
      if (!track.released) continue;
      sum += royaltyForPosition(track.chartPosition);
    }
    if (labelDeal) sum *= 2;
    if (labelDeal) sum += STUDIO_DEAL_DAILY_ADVANCE;
    return sum;
  }

  // Whether the label-deal requirements are met right now, broken down
  // so the UI can show which bar is still short.
  function dealReadiness() {
    return {
      ready: releasedCount() >= STUDIO_TRACKS_FOR_DEAL && fans >= STUDIO_FANS_FOR_DEAL,
      signed: labelDeal,
      released: releasedCount(),
      tracksNeeded: STUDIO_TRACKS_FOR_DEAL,
      fans,
      fansNeeded: STUDIO_FANS_FOR_DEAL,
    };
  }

  // Whether a gig can be played at this venue right now, broken down so
  // the UI can explain a refusal before the player commits.
  function gigReadiness(venueId) {
    const venue = venueInfo(venueId);
    if (!venue) return { ready: false, reason: 'unknown-venue' };
    if (releasedCount() === 0) return { ready: false, reason: 'no-released-track' };
    if (fans < STUDIO_MIN_FANS_FOR_GIG) return { ready: false, reason: 'not-enough-fans' };
    return {
      ready: true,
      venueId: venue.id,
      payout: gigPayoutFor(venue.id, fans),
      fansGained: gigFansFor(venue.id),
    };
  }

  return {
    recordTrack,
    releaseTrack,
    playGig,
    signDeal,
    tickDay,
    stats,
    hudLine,
    serialize,
    deserialize,
    trackInfo,
    listTracks,
    releasedTracks,
    chartedTracks,
    cheapestGenre,
    priciestGenre,
    biggestVenue,
    topFeature,
    recordingCost,
    canAffordRecording,
    expectedDailyRoyalties,
    dealReadiness,
    gigReadiness,
  };
}
