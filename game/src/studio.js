export const STUDIO_GENRES = [
  { id: 'neon-pop', name: 'Neon Pop', cost: 320, baseAppeal: 18, tagline: 'Bright hooks for bright nights.', mood: 'upbeat' },
  { id: 'bay-bass', name: 'Bay Bass', cost: 450, baseAppeal: 24, tagline: 'Heavy low end from the harbour.', mood: 'heavy' },
  { id: 'sunset-soul', name: 'Sunset Soul', cost: 260, baseAppeal: 14, tagline: 'Smooth songs for slow evenings.', mood: 'smooth' },
  { id: 'chrome-rock', name: 'Chrome Rock', cost: 500, baseAppeal: 28, tagline: 'Loud guitars, louder crowds.', mood: 'loud' },
  { id: 'midnight-jazz', name: 'Midnight Jazz', cost: 380, baseAppeal: 20, tagline: 'Late notes for late people.', mood: 'late' },
];

export const STUDIO_FEATURES = [
  { id: 'luna-mara', name: 'Luna Mara', fee: 900, appealBonus: 12, style: 'silk-voiced pop siren' },
  { id: 'dj-velvet', name: 'DJ Velvet', fee: 600, appealBonus: 8, style: 'veteran turntablist' },
  { id: 'kiko-flame', name: 'Kiko Flame', fee: 1200, appealBonus: 14, style: 'firebrand rapper' },
  { id: 'sister-pearl', name: 'Sister Pearl', fee: 450, appealBonus: 6, style: 'gospel-rooted harmony singer' },
  { id: 'mr-octane', name: 'Mr Octane', fee: 1500, appealBonus: 15, style: 'arena-rock frontman' },
  { id: 'yuki-snow', name: 'Yuki Snow', fee: 300, appealBonus: 4, style: 'bedroom-pop newcomer' },
];

export const STUDIO_VENUES = [
  { id: 'rooftop-lounge', name: 'Rooftop Lounge', capacity: 200, payout: 400, vibe: 'wind and city lights' },
  { id: 'boardwalk-hall', name: 'Boardwalk Hall', capacity: 600, payout: 900, vibe: 'salt air and dancing' },
  { id: 'arena-dome', name: 'Arena Dome', capacity: 2500, payout: 1800, vibe: 'big room, big noise' },
  { id: 'sunset-bowl', name: 'Sunset Bowl', capacity: 5000, payout: 2500, vibe: 'golden hour, open sky' },
];

export const STUDIO_MAX_QUALITY = 100;
export const STUDIO_BASE_QUALITY = 40;
export const STUDIO_QUALITY_SPREAD = 40;
export const STUDIO_MIN_FANS_FOR_GIG = 100;
export const STUDIO_TRACKS_FOR_DEAL = 3;
export const STUDIO_FANS_FOR_DEAL = 500;
export const STUDIO_DEAL_DAILY_ADVANCE = 150;
export const STUDIO_FANS_PER_CHARTED_TRACK = 5;
export const STUDIO_ROYALTY_PER_STEP = 8;
export const STUDIO_CHART_TOP = 1;
export const STUDIO_CHART_BOTTOM = 10;

export function chartPositionForQuality(quality) {
  const q = Math.max(0, Math.min(100, Math.floor(quality)));
  const pos = 11 - Math.floor(q / 10);
  return Math.max(1, Math.min(10, pos));
}

export function qualityBand(quality) {
  if (quality >= 90) return 'masterpiece';
  if (quality >= 75) return 'hit';
  if (quality >= 60) return 'solid';
  if (quality >= 50) return 'rough';
  return 'demo';
}

export function royaltyForPosition(position) {
  if (position === null || position === undefined) return 0;
  const p = Math.max(1, Math.min(10, position));
  return (11 - p) * 8;
}

export function gigPayoutFor(venueId, fans) {
  const v = venueInfo(venueId);
  if (!v) return 0;
  const f = Math.max(0, Math.floor(fans));
  return Math.floor(v.payout * (1 + f / 1000));
}

export function gigFansFor(venueId) {
  const v = venueInfo(venueId);
  if (!v) return 0;
  return Math.floor(v.capacity / 10);
}

export function genreInfo(id) {
  for (const g of STUDIO_GENRES) if (g.id === id) return g;
  return null;
}

export function featureInfo(id) {
  if (id === null || id === undefined) return null;
  for (const f of STUDIO_FEATURES) if (f.id === id) return f;
  return null;
}

export function venueInfo(id) {
  for (const v of STUDIO_VENUES) if (v.id === id) return v;
  return null;
}

export function createStudioSystem(deps) {
  const d = deps || {};
  const rnd = typeof d.rng === 'function' ? d.rng : Math.random;
  const dayOf = typeof d.getDay === 'function' ? d.getDay : () => 1;
  const cashOf = typeof d.getCash === 'function' ? d.getCash : () => 0;
  const moveCash = typeof d.addCash === 'function' ? d.addCash : () => {};
  const say = typeof d.log === 'function' ? d.log : () => {};
  const heatOf = typeof d.getHeatLevel === 'function' ? d.getHeatLevel : () => 0;
  const hourOf = typeof d.getHour === 'function' ? d.getHour : () => 12;

  const state = {
    tracks: [],
    fans: 0,
    labelDeal: false,
    daysSinceLastRelease: 0,
    nextTrackNumber: 1,
    totalEarned: 0,
    totalSpent: 0,
    totalRoyalties: 0,
    totalGigPayout: 0,
    gigsPlayed: 0,
    tracksRecorded: 0,
    tracksReleased: 0,
    lastTickDay: null,
  };

  function naturalOf(track) {
    return chartPositionForQuality(track.quality);
  }

  function copyTrack(t) {
    return {
      id: t.id,
      title: t.title,
      genre: t.genre,
      genreName: t.genreName,
      feature: t.feature,
      featureName: t.featureName,
      quality: t.quality,
      band: qualityBand(t.quality),
      released: t.released,
      chartPosition: t.chartPosition,
      naturalPosition: naturalOf(t),
      lifetimeSales: t.lifetimeSales,
      recordedDay: t.recordedDay,
      releasedDay: t.releasedDay,
    };
  }

  function recordTrack(genreId, featureId) {
    const genre = genreInfo(genreId);
    if (!genre) return { ok: false, reason: 'unknown-genre' };
    let feature = null;
    if (featureId !== null && featureId !== undefined) {
      feature = featureInfo(featureId);
      if (!feature) return { ok: false, reason: 'unknown-feature' };
    }
    const cost = genre.cost + (feature ? feature.fee : 0);
    if (cashOf() < cost) return { ok: false, reason: 'not-enough-cash' };
    const quality = Math.min(100, Math.floor(40 + rnd() * 40 + (feature ? feature.appealBonus : 0)));
    moveCash(-cost);
    state.totalSpent += cost;
    const num = state.nextTrackNumber;
    state.nextTrackNumber += 1;
    const track = {
      id: 'track' + num,
      title: genre.name + ' Session ' + num,
      genre: genre.id,
      genreName: genre.name,
      feature: feature ? feature.id : null,
      featureName: feature ? feature.name : null,
      quality,
      released: false,
      chartPosition: null,
      lifetimeSales: 0,
      recordedDay: dayOf(),
      releasedDay: null,
    };
    state.tracks.push(track);
    state.tracksRecorded += 1;
    say('Recorded ' + track.title + ' — ' + qualityBand(quality) + ' (' + quality + ').');
    return { ok: true, trackId: track.id, title: track.title, genreId: genre.id, featureId: track.feature, quality, band: qualityBand(quality), cost, cash: cashOf() };
  }

  function releaseTrack(trackId) {
    const track = state.tracks.find((t) => t.id === trackId);
    if (!track) return { ok: false, reason: 'unknown-track' };
    if (track.released) return { ok: false, reason: 'already-released' };
    track.released = true;
    track.chartPosition = chartPositionForQuality(track.quality);
    track.releasedDay = dayOf();
    state.tracksReleased += 1;
    state.daysSinceLastRelease = 0;
    say('Released ' + track.title + ' at chart #' + track.chartPosition + '.');
    return { ok: true, trackId: track.id, title: track.title, quality: track.quality, chartPosition: track.chartPosition, released: true };
  }

  function playGig(venueId) {
    const venue = venueInfo(venueId);
    if (!venue) return { ok: false, reason: 'unknown-venue' };
    if (state.tracksReleased < 1) return { ok: false, reason: 'no-released-track' };
    if (state.fans < 100) return { ok: false, reason: 'not-enough-fans' };
    const payout = gigPayoutFor(venueId, state.fans);
    const gained = gigFansFor(venueId);
    moveCash(payout);
    state.totalEarned += payout;
    state.totalGigPayout += payout;
    state.gigsPlayed += 1;
    state.fans += gained;
    say('Played ' + venue.name + ' for $' + payout + '.');
    return { ok: true, venueId: venue.id, venueName: venue.name, payout, fansGained: gained, fans: state.fans, cash: cashOf() };
  }

  function signDeal() {
    if (state.labelDeal) return { ok: false, reason: 'already-signed' };
    if (state.tracksReleased < 3) return { ok: false, reason: 'not-enough-tracks' };
    if (state.fans < 500) return { ok: false, reason: 'not-enough-fans' };
    state.labelDeal = true;
    say('Signed a label deal.');
    return { ok: true, labelDeal: true, fans: state.fans, released: state.tracksReleased };
  }

  function tickDay(day) {
    const today = day !== undefined && day !== null ? day : dayOf();
    if (state.lastTickDay === today) return { ok: false, reason: 'already-settled' };
    state.lastTickDay = today;
    state.daysSinceLastRelease += 1;
    const moves = [];
    let charted = 0;
    let royalties = 0;
    for (const track of state.tracks) {
      if (!track.released || track.chartPosition === null) continue;
      charted += 1;
      const natural = naturalOf(track);
      const before = track.chartPosition;
      if (track.chartPosition < natural) track.chartPosition += 1;
      else if (track.chartPosition > natural) track.chartPosition -= 1;
      if (track.chartPosition !== before) moves.push({ trackId: track.id, from: before, to: track.chartPosition });
      royalties += royaltyForPosition(track.chartPosition);
      track.lifetimeSales += (11 - track.chartPosition) * 10;
    }
    if (state.labelDeal) royalties *= 2;
    const advance = state.labelDeal ? 150 : 0;
    const total = royalties + advance;
    if (total > 0) {
      moveCash(total);
      state.totalEarned += total;
      state.totalRoyalties += royalties;
    }
    const fansGained = charted * 5;
    state.fans += fansGained;
    if (charted > 0) say(charted + ' track(s) charted, $' + total + ' in royalties.');
    return { ok: true, day: today, charted, royalties, advance, total, fansGained, fans: state.fans, moves, labelDeal: state.labelDeal, cash: cashOf() };
  }

  function stats() {
    let best = 0;
    let charted = 0;
    for (const t of state.tracks) {
      if (t.chartPosition !== null) {
        charted += 1;
        if (best === 0 || t.chartPosition < best) best = t.chartPosition;
      }
    }
    return {
      tracks: state.tracks.length,
      recorded: state.tracksRecorded,
      released: state.tracksReleased,
      charted,
      bestChartPosition: best,
      fans: state.fans,
      labelDeal: state.labelDeal,
      daysSinceLastRelease: state.daysSinceLastRelease,
      gigsPlayed: state.gigsPlayed,
      totalEarned: state.totalEarned,
      totalSpent: state.totalSpent,
      totalRoyalties: state.totalRoyalties,
      totalGigPayout: state.totalGigPayout,
      cash: cashOf(),
      heatLevel: heatOf(),
      hour: hourOf(),
      day: dayOf(),
    };
  }

  function hudLine() {
    if (state.tracks.length === 0 && state.fans === 0) return '';
    let best = 0;
    for (const t of state.tracks) if (t.chartPosition !== null && (best === 0 || t.chartPosition < best)) best = t.chartPosition;
    const bits = ['Studio', state.fans + ' fans', state.tracksReleased + '/' + state.tracks.length + ' released'];
    if (best > 0) bits.push('#' + best);
    if (state.labelDeal) bits.push('LABEL');
    return bits.join(' · ');
  }

  function trackInfo(trackId) {
    const track = state.tracks.find((t) => t.id === trackId);
    if (!track) return null;
    return copyTrack(track);
  }

  function listTracks() {
    return state.tracks.map(copyTrack);
  }

  function releasedTracks() {
    return state.tracks.filter((t) => t.released).map(copyTrack);
  }

  function chartedTracks() {
    return state.tracks
      .filter((t) => t.chartPosition !== null)
      .sort((a, b) => a.chartPosition - b.chartPosition)
      .map(copyTrack);
  }

  function cheapestGenre() {
    let best = STUDIO_GENRES[0];
    for (const g of STUDIO_GENRES) if (g.cost < best.cost) best = g;
    return { id: best.id, name: best.name, cost: best.cost };
  }

  function priciestGenre() {
    let best = STUDIO_GENRES[0];
    for (const g of STUDIO_GENRES) if (g.cost > best.cost) best = g;
    return { id: best.id, name: best.name, cost: best.cost };
  }

  function biggestVenue() {
    let best = STUDIO_VENUES[0];
    for (const v of STUDIO_VENUES) if (v.capacity > best.capacity) best = v;
    return { id: best.id, name: best.name, capacity: best.capacity, payout: best.payout };
  }

  function topFeature() {
    let best = STUDIO_FEATURES[0];
    for (const f of STUDIO_FEATURES) if (f.appealBonus > best.appealBonus) best = f;
    return { id: best.id, name: best.name, fee: best.fee, bonus: best.appealBonus };
  }

  function recordingCost(genreId, featureId) {
    const genre = genreInfo(genreId);
    if (!genre) return 0;
    const feature = featureInfo(featureId);
    if (featureId !== null && featureId !== undefined && !feature) return 0;
    return genre.cost + (feature ? feature.fee : 0);
  }

  function canAffordRecording(genreId, featureId) {
    const genre = genreInfo(genreId);
    if (!genre) return false;
    const cost = recordingCost(genreId, featureId);
    if (cost === 0) return true;
    return cashOf() >= cost;
  }

  function expectedDailyRoyalties() {
    let sum = 0;
    for (const t of state.tracks) if (t.released && t.chartPosition !== null) sum += royaltyForPosition(t.chartPosition);
    if (state.labelDeal) sum = sum * 2 + 150;
    return sum;
  }

  function dealReadiness() {
    return {
      ready: !state.labelDeal && state.tracksReleased >= 3 && state.fans >= 500,
      signed: state.labelDeal,
      released: state.tracksReleased,
      tracksNeeded: 3,
      fans: state.fans,
      fansNeeded: 500,
    };
  }

  function gigReadiness(venueId) {
    const venue = venueInfo(venueId);
    if (!venue) return { ready: false, reason: 'unknown-venue' };
    if (state.tracksReleased < 1) return { ready: false, reason: 'no-released-track' };
    if (state.fans < 100) return { ready: false, reason: 'not-enough-fans' };
    return { ready: true, venueId: venue.id, payout: gigPayoutFor(venueId, state.fans), fansGained: gigFansFor(venueId) };
  }

  function serialize() {
    return {
      tracks: state.tracks.map((t) => ({
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
        releasedDay: t.releasedDay,
      })),
      fans: state.fans,
      labelDeal: state.labelDeal,
      daysSinceLastRelease: state.daysSinceLastRelease,
      nextTrackNumber: state.nextTrackNumber,
      totalEarned: state.totalEarned,
      totalSpent: state.totalSpent,
      totalRoyalties: state.totalRoyalties,
      totalGigPayout: state.totalGigPayout,
      gigsPlayed: state.gigsPlayed,
      tracksRecorded: state.tracksRecorded,
      tracksReleased: state.tracksReleased,
      lastTickDay: state.lastTickDay,
    };
  }

  function deserialize(saved) {
    const s = saved || {};
    state.tracks = [];
    if (Array.isArray(s.tracks)) {
      for (const row of s.tracks) {
        if (!row || typeof row.id !== 'string') continue;
        const genre = genreInfo(row.genre) || STUDIO_GENRES[0];
        const feature = featureInfo(row.feature);
        state.tracks.push({
          id: row.id,
          title: typeof row.title === 'string' ? row.title : genre.name + ' Session',
          genre: genre.id,
          genreName: typeof row.genreName === 'string' ? row.genreName : genre.name,
          feature: feature ? feature.id : null,
          featureName: feature ? feature.name : null,
          quality: Math.max(0, Math.min(100, Math.floor(Number(row.quality) || 0))),
          released: row.released === true,
          chartPosition: row.chartPosition === null || row.chartPosition === undefined ? null : Math.floor(Number(row.chartPosition)),
          lifetimeSales: Math.floor(Number(row.lifetimeSales) || 0),
          recordedDay: Math.floor(Number(row.recordedDay) || 1),
          releasedDay: row.releasedDay === null || row.releasedDay === undefined ? null : Math.floor(Number(row.releasedDay)),
        });
      }
    }
    state.fans = Math.floor(Number(s.fans) || 0);
    state.labelDeal = s.labelDeal === true;
    state.daysSinceLastRelease = Math.floor(Number(s.daysSinceLastRelease) || 0);
    state.nextTrackNumber = Math.max(1, Math.floor(Number(s.nextTrackNumber) || 1));
    state.totalEarned = Number(s.totalEarned) || 0;
    state.totalSpent = Number(s.totalSpent) || 0;
    state.totalRoyalties = Number(s.totalRoyalties) || 0;
    state.totalGigPayout = Number(s.totalGigPayout) || 0;
    state.gigsPlayed = Math.floor(Number(s.gigsPlayed) || 0);
    state.tracksRecorded = Math.floor(Number(s.tracksRecorded) || 0);
    state.tracksReleased = Math.floor(Number(s.tracksReleased) || 0);
    state.lastTickDay = s.lastTickDay === null || s.lastTickDay === undefined ? null : Math.floor(Number(s.lastTickDay));
    return { ok: true, tracks: state.tracks.length, fans: state.fans, labelDeal: state.labelDeal };
  }

  return {
    name: 'Studio',
    state,
    recordTrack,
    releaseTrack,
    playGig,
    signDeal,
    tickDay,
    stats,
    hudLine,
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
    serialize,
    deserialize,
  };
}
