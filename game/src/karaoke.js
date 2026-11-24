export const KARAOKE_BAR = { id: 'neon-mic', name: 'Neon Mic Karaoke Bar', x: 70, z: 90, district: 'Downtown' };

export const KARAOKE_SONGS = [
  { id: 'solara-nights', name: 'Solara Nights', artist: 'The Palms', difficulty: 1, length: 90, genre: 'pop', base: 100 },
  { id: 'neon-heart', name: 'Neon Heart', artist: 'DJ Mira', difficulty: 2, length: 110, genre: 'dance', base: 150 },
  { id: 'harbor-blues', name: 'Harbor Blues', artist: 'Old Mike', difficulty: 2, length: 130, genre: 'blues', base: 140 },
  { id: 'midnight-drive', name: 'Midnight Drive', artist: 'Comet GT', difficulty: 3, length: 120, genre: 'rock', base: 200 },
  { id: 'golden-hour', name: 'Golden Hour', artist: 'Luna Ray', difficulty: 1, length: 80, genre: 'pop', base: 90 },
  { id: 'street-anthem', name: 'Street Anthem', artist: 'Lil Tuna', difficulty: 3, length: 100, genre: 'hip-hop', base: 220 },
  { id: 'ocean-eyes', name: 'Ocean Eyes', artist: 'Marina Blue', difficulty: 2, length: 95, genre: 'ballad', base: 160 },
  { id: 'thunder-road', name: 'Thunder Road', artist: 'Big Tony', difficulty: 4, length: 140, genre: 'rock', base: 260 },
  { id: 'palm-shadows', name: 'Palm Shadows', artist: 'The Palms', difficulty: 3, length: 115, genre: 'indie', base: 190 },
  { id: 'disco-fever', name: 'Disco Fever', artist: 'Neon Reef', difficulty: 2, length: 105, genre: 'disco', base: 170 },
  { id: 'lullaby-city', name: 'Lullaby City', artist: 'Luna Ray', difficulty: 1, length: 85, genre: 'ballad', base: 95 },
  { id: 'fireworks', name: 'Fireworks', artist: 'DJ Mira', difficulty: 4, length: 125, genre: 'dance', base: 280 },
  { id: 'runaway', name: 'Runaway', artist: 'Comet GT', difficulty: 3, length: 110, genre: 'rock', base: 210 },
  { id: 'moonlight', name: 'Moonlight', artist: 'Old Mike', difficulty: 2, length: 120, genre: 'jazz', base: 150 },
  { id: 'electric', name: 'Electric', artist: 'Neon Reef', difficulty: 3, length: 100, genre: 'pop', base: 200 },
  { id: 'sunday-drive', name: 'Sunday Drive', artist: 'The Palms', difficulty: 1, length: 88, genre: 'indie', base: 95 },
  { id: 'storm-chaser', name: 'Storm Chaser', artist: 'Comet GT', difficulty: 4, length: 135, genre: 'rock', base: 270 },
];

export const KARAOKE_NOTES = ['low', 'mid', 'high', 'hold'];

export const KARAOKE_CROWD = [
  { id: 'regulars', name: 'Regulars', size: 20, generosity: 0.5, mood: 0.6 },
  { id: 'students', name: 'Students', size: 35, generosity: 0.3, mood: 0.8 },
  { id: 'tourists', name: 'Tourists', size: 25, generosity: 0.9, mood: 0.7 },
  { id: 'critics', name: 'Critics', size: 5, generosity: 0.2, mood: 0.3 },
  { id: 'party', name: 'Party Crowd', size: 15, generosity: 1.0, mood: 0.9 },
  { id: 'date-night', name: 'Date Night', size: 12, generosity: 0.6, mood: 0.75 },
];

export const KARAOKE_DRINKS = [
  { id: 'water', name: 'Water', price: 2, voice: 0, courage: 0 },
  { id: 'tea', name: 'Honey Tea', price: 6, voice: 10, courage: 0 },
  { id: 'beer', name: 'Beer', price: 5, voice: -5, courage: 15 },
  { id: 'cocktail', name: 'Neon Cocktail', price: 12, voice: -5, courage: 30 },
  { id: 'shot', name: 'Liquid Courage', price: 8, voice: -10, courage: 40 },
  { id: 'smoothie', name: 'Berry Smoothie', price: 7, voice: 5, courage: 5 },
];

export const KARAOKE_BATTLERS = [
  { id: 'diva', name: 'Diva Dana', skill: 0.6, bet: 50, style: 'power ballads' },
  { id: 'crooner', name: 'Crooner Carl', skill: 0.7, bet: 100, style: 'smooth jazz' },
  { id: 'rapper', name: 'MC Flow', skill: 0.75, bet: 150, style: 'rapid fire' },
  { id: 'rocker', name: 'Rocker Rex', skill: 0.85, bet: 300, style: 'screaming rock' },
  { id: 'queen', name: 'Karaoke Queen', skill: 0.95, bet: 600, style: 'everything' },
];

export const KARAOKE_VOICE_TRAINING = [
  { id: 'scales', name: 'Scales', price: 0, gain: 2, time: 30 },
  { id: 'breathing', name: 'Breathing', price: 0, gain: 2, time: 30 },
  { id: 'coach', name: 'Vocal Coach', price: 150, gain: 8, time: 60 },
  { id: 'choir', name: 'Choir Practice', price: 40, gain: 5, time: 45 },
  { id: 'recording', name: 'Recording Session', price: 300, gain: 12, time: 90 },
];

export const KARAOKE_RANKS = [
  { rank: 0, name: 'Shower Singer', scoreNeeded: 0, mult: 1.0 },
  { rank: 1, name: 'Open Mic Regular', scoreNeeded: 2000, mult: 1.15 },
  { rank: 2, name: 'Bar Favorite', scoreNeeded: 6000, mult: 1.3 },
  { rank: 3, name: 'Local Star', scoreNeeded: 15000, mult: 1.5 },
  { rank: 4, name: 'Solara Idol', scoreNeeded: 35000, mult: 1.8 },
  { rank: 5, name: 'Superstar', scoreNeeded: 80000, mult: 2.2 },
];

export const KARAOKE_EVENTS = [
  { id: 'heckler', name: 'Heckler', text: 'Someone shouts from the back.' },
  { id: 'encore', name: 'Encore', text: 'The crowd chants for one more.' },
  { id: 'mic-drop', name: 'Mic Drop', text: 'The mic slips from your hand.' },
  { id: 'scout', name: 'Scout', text: 'A talent scout is watching.' },
  { id: 'proposal-song', name: 'Proposal Song', text: 'Someone proposes during your song.' },
  { id: 'power-out', name: 'Power Out', text: 'The lights flicker and die.' },
  { id: 'duet-offer', name: 'Duet Offer', text: 'A stranger asks to sing along.' },
  { id: 'birthday-song', name: 'Birthday Song', text: 'It is someone\'s birthday tonight.' },
];

export function karaokeRankFor(totalScore) {
  let out = 0;
  for (const r of KARAOKE_RANKS) if (totalScore >= r.scoreNeeded) out = r.rank;
  return out;
}

function songById(id) {
  for (const s of KARAOKE_SONGS) if (s.id === id) return s;
  return null;
}

function crowdById(id) {
  for (const c of KARAOKE_CROWD) if (c.id === id) return c;
  return null;
}

export function createKaraokeSystem(deps) {
  const d = deps || {};
  const rnd = typeof d.rng === 'function' ? d.rng : Math.random;
  const cashOf = typeof d.getCash === 'function' ? d.getCash : () => 0;
  const moveCash = typeof d.addCash === 'function' ? d.addCash : () => {};
  const say = typeof d.log === 'function' ? d.log : () => {};
  const dayOf = typeof d.getDay === 'function' ? d.getDay : () => 1;
  const hourOf = typeof d.getHour === 'function' ? d.getHour : () => 20;
  const posOf = typeof d.getPlayerPos === 'function' ? d.getPlayerPos : () => ({ x: 0, z: 0 });

  const state = {
    rank: 0,
    voice: 30,
    courage: 50,
    totalScore: 0,
    bestScore: 0,
    bestSong: null,
    songsSung: 0,
    perfectNotes: 0,
    goodNotes: 0,
    missedNotes: 0,
    duets: 0,
    duetsWon: 0,
    battlesWon: 0,
    battlesLost: 0,
    encores: 0,
    tipsEarned: 0,
    totalEarned: 0,
    fans: 0,
    performance: null,
    training: null,
    songHistory: {},
    favoriteSong: null,
    crowdMood: 0.6,
    currentCrowd: 'regulars',
    drinksTaken: 0,
    voiceFatigue: 0,
    openMicWins: 0,
    openMicEntries: 0,
    viralPerformances: 0,
    eventsSeen: {},
    dayEarned: 0,
    bestDay: 0,
    lastSongDay: 0,
    stageFright: false,
    requests: 0,
    demosSold: 0,
  };

  function rankInfo() {
    return KARAOKE_RANKS[state.rank] || KARAOKE_RANKS[0];
  }

  function hitChance() {
    let c = 0.45 + state.voice * 0.004 + state.courage * 0.001;
    if (state.voiceFatigue > 50) c -= 0.15;
    if (state.drinksTaken > 2) c -= 0.1;
    return Math.max(0.15, Math.min(0.95, c));
  }

  function crowdInfo() {
    return crowdById(state.currentCrowd) || KARAOKE_CROWD[0];
  }

  function maxPossible(song) {
    const notes = 12 + song.difficulty * 6;
    return notes * song.base * 0.2 * rankInfo().mult;
  }

  function startSong(songId, crowdId) {
    if (state.performance) return { ok: false, reason: 'already-performing' };
    const song = songById(songId);
    if (!song) return { ok: false, reason: 'unknown-song' };
    const hour = hourOf();
    if (hour >= 2 && hour < 18) return { ok: false, reason: 'bar-closed' };
    if (state.voiceFatigue >= 80) return { ok: false, reason: 'voice-tired' };
    if (state.stageFright && state.courage < 30) return { ok: false, reason: 'stage-fright' };
    const crowd = crowdId ? crowdById(crowdId) : null;
    const chosen = crowd || KARAOKE_CROWD[Math.floor(rnd() * KARAOKE_CROWD.length)];
    state.currentCrowd = chosen.id;
    state.crowdMood = chosen.mood;
    const count = 12 + song.difficulty * 6;
    const notes = [];
    for (let i = 0; i < count; i++) {
      notes.push({ type: KARAOKE_NOTES[Math.floor(rnd() * KARAOKE_NOTES.length)], hit: null, time: (song.length / count) * i });
    }
    state.performance = {
      songId: song.id,
      songName: song.name,
      artist: song.artist,
      notes,
      noteIndex: 0,
      score: 0,
      combo: 0,
      maxCombo: 0,
      timeLeft: song.length,
      crowdId: chosen.id,
      bet: 0,
      opponent: null,
      duet: false,
      openMic: false,
    };
    state.lastSongDay = dayOf();
    say('Started singing ' + song.name + ' by ' + song.artist + '.');
    return { ok: true, songId: song.id, noteCount: count, crowdId: chosen.id };
  }

  function hitNote(noteType) {
    if (!state.performance) return { ok: false, reason: 'no-performance' };
    const perf = state.performance;
    if (perf.noteIndex >= perf.notes.length) return { ok: false, reason: 'song-over' };
    const note = perf.notes[perf.noteIndex];
    perf.noteIndex += 1;
    const wanted = noteType || note.type;
    const song = songById(perf.songId);
    const chance = hitChance();
    const roll = rnd();
    let result;
    let points = 0;
    if (wanted === note.type && roll < chance) {
      result = 'perfect';
      perf.combo += 1;
      if (perf.combo > perf.maxCombo) perf.maxCombo = perf.combo;
      const mult = 1 + (perf.combo - 1) * 0.1;
      points = Math.round(song.base * 0.2 * mult * rankInfo().mult);
      note.hit = 'perfect';
      state.perfectNotes += 1;
      state.crowdMood = Math.min(1, state.crowdMood + 0.02);
    } else if (roll < chance + 0.25) {
      result = 'good';
      points = Math.round(song.base * 0.1 * rankInfo().mult);
      note.hit = 'good';
      state.goodNotes += 1;
    } else {
      result = 'miss';
      perf.combo = 0;
      note.hit = 'miss';
      state.missedNotes += 1;
      state.crowdMood = Math.max(0, state.crowdMood - 0.03);
      if (rnd() < 0.1) state.stageFright = true;
    }
    perf.score += points;
    return { ok: true, result, points, combo: perf.combo, score: perf.score };
  }

  function finishPerformance() {
    if (!state.performance) return { ok: false, reason: 'no-performance' };
    const perf = state.performance;
    state.performance = null;
    const song = songById(perf.songId);
    state.songsSung += 1;
    state.totalScore += perf.score;
    state.voiceFatigue += 15;
    state.songHistory[perf.songId] = (state.songHistory[perf.songId] || 0) + 1;
    let bestCount = 0;
    for (const k of Object.keys(state.songHistory)) if (state.songHistory[k] > bestCount) { bestCount = state.songHistory[k]; state.favoriteSong = k; }
    if (perf.score > state.bestScore) { state.bestScore = perf.score; state.bestSong = perf.songId; }
    const max = maxPossible(song);
    const accuracy = max > 0 ? Math.round((perf.score / max) * 100) / 100 : 0;
    const crowd = crowdById(perf.crowdId) || KARAOKE_CROWD[0];
    let tips = 0;
    if (accuracy >= 0.5) {
      tips = Math.round(crowd.size * crowd.generosity * accuracy * (1 + state.fans * 0.001) * (perf.duet ? 1.5 : 1));
    }
    let payout = tips;
    let wonBet = false;
    if (perf.opponent) {
      const battler = KARAOKE_BATTLERS.find((b) => b.id === perf.opponent);
      const oppScore = max * (battler ? battler.skill : 0.5) * 0.8 + rnd() * 0.4 * max;
      if (perf.score > oppScore) {
        wonBet = true;
        payout += perf.bet * 2;
        state.battlesWon += 1;
      } else {
        state.battlesLost += 1;
      }
    }
    if (perf.duet) {
      state.duets += 1;
      if (accuracy >= 0.6) state.duetsWon += 1;
    }
    if (tips > 0) {
      moveCash(tips);
      state.tipsEarned += tips;
    }
    if (payout > 0) {
      if (perf.opponent && wonBet) moveCash(perf.bet * 2);
      state.totalEarned += payout;
      state.dayEarned += payout;
    }
    const fansGained = Math.floor(accuracy * 20 * state.crowdMood);
    state.fans += fansGained;
    let encore = false;
    if (accuracy >= 0.8 && rnd() < 0.5) {
      encore = true;
      state.encores += 1;
      moveCash(50);
      state.totalEarned += 50;
      state.dayEarned += 50;
      payout += 50;
    }
    let viral = false;
    if (accuracy >= 0.85 && rnd() < 0.2) {
      viral = true;
      state.viralPerformances += 1;
      state.fans += 200;
    }
    const oldRank = state.rank;
    const newRank = karaokeRankFor(state.totalScore);
    const promoted = newRank > oldRank;
    if (promoted) { state.rank = newRank; say('Promoted to ' + rankInfo().name + '!'); }
    state.courage = Math.min(100, state.courage + 2);
    say('Finished ' + song.name + ' — score ' + perf.score + ', accuracy ' + accuracy + '.');
    return { ok: true, score: perf.score, accuracy, tips, payout, fansGained, encore, viral, wonBet, promoted };
  }

  function startDuet(songId, crowdId) {
    const started = startSong(songId, crowdId);
    if (!started.ok) return started;
    state.performance.duet = true;
    return { ok: true, duet: true, songId, noteCount: started.noteCount, crowdId: started.crowdId };
  }

  function challengeBattler(battlerId, songId) {
    const battler = KARAOKE_BATTLERS.find((b) => b.id === battlerId);
    if (!battler) return { ok: false, reason: 'unknown-battler' };
    if (cashOf() < battler.bet) return { ok: false, reason: 'not-enough-cash' };
    const started = startSong(songId);
    if (!started.ok) return started;
    moveCash(-battler.bet);
    state.performance.bet = battler.bet;
    state.performance.opponent = battlerId;
    return { ok: true, battlerId, bet: battler.bet };
  }

  function buyDrink(drinkId) {
    const drink = KARAOKE_DRINKS.find((x) => x.id === drinkId);
    if (!drink) return { ok: false, reason: 'unknown-drink' };
    if (cashOf() < drink.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-drink.price);
    state.drinksTaken += 1;
    state.voice = Math.max(0, Math.min(100, state.voice + drink.voice));
    state.courage = Math.max(0, Math.min(100, state.courage + drink.courage));
    if (drinkId === 'shot' || drinkId === 'cocktail') state.stageFright = false;
    return { ok: true, drinkId, voice: state.voice, courage: state.courage };
  }

  function trainVoice(trainingId) {
    if (state.training) return { ok: false, reason: 'already-training' };
    const rec = KARAOKE_VOICE_TRAINING.find((x) => x.id === trainingId);
    if (!rec) return { ok: false, reason: 'unknown-training' };
    if (cashOf() < rec.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-rec.price);
    state.training = { id: rec.id, timeLeft: rec.time, gain: rec.gain };
    return { ok: true, trainingId: rec.id, timeLeft: rec.time };
  }

  function enterOpenMic() {
    if (cashOf() < 10) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-10);
    state.openMicEntries += 1;
    const song = KARAOKE_SONGS[Math.floor(rnd() * KARAOKE_SONGS.length)];
    const started = startSong(song.id);
    if (!started.ok) {
      moveCash(10);
      state.openMicEntries -= 1;
      return started;
    }
    state.performance.openMic = true;
    return { ok: true, songId: song.id };
  }

  function applyStageEvent(eventId) {
    const perf = state.performance;
    state.eventsSeen[eventId] = (state.eventsSeen[eventId] || 0) + 1;
    if (eventId === 'heckler') {
      state.crowdMood = Math.max(0, state.crowdMood - 0.1);
      if (state.courage >= 60) state.fans += 10;
    } else if (eventId === 'encore') {
      state.crowdMood = Math.min(1, state.crowdMood + 0.1);
    } else if (eventId === 'mic-drop') {
      state.crowdMood = Math.max(0, state.crowdMood - 0.05);
    } else if (eventId === 'scout') {
      if (state.voice >= 60) state.fans += 25;
    } else if (eventId === 'proposal-song') {
      state.fans += 20;
      moveCash(40);
      state.totalEarned += 40;
      state.dayEarned += 40;
    } else if (eventId === 'power-out') {
      state.crowdMood = Math.max(0, state.crowdMood - 0.15);
    } else if (eventId === 'duet-offer') {
      if (perf) perf.duet = true;
      state.crowdMood = Math.min(1, state.crowdMood + 0.15);
    } else if (eventId === 'birthday-song') {
      state.fans += 15;
      moveCash(25);
      state.totalEarned += 25;
      state.dayEarned += 25;
    }
    return eventId;
  }

  function tick(dt) {
    const step = dt || 0;
    if (state.performance) {
      const perf = state.performance;
      perf.timeLeft -= step;
      if (rnd() < step * 0.003) {
        const ev = KARAOKE_EVENTS[Math.floor(rnd() * KARAOKE_EVENTS.length)];
        applyStageEvent(ev.id);
      }
      if (perf.timeLeft <= 0 || perf.noteIndex >= perf.notes.length) finishPerformance();
    }
    if (state.training) {
      state.training.timeLeft -= step;
      if (state.training.timeLeft <= 0) {
        state.voice = Math.min(100, state.voice + state.training.gain);
        say('Voice training complete: +' + state.training.gain + ' voice.');
        state.training = null;
      }
    }
    if (!state.performance) {
      state.voiceFatigue = Math.max(0, state.voiceFatigue - 0.5 * step);
      if (state.drinksTaken > 0 && rnd() < step * 0.001) state.drinksTaken -= 1;
    }
    if (state.stageFright && state.courage >= 50) state.stageFright = false;
  }

  function tickDay(day) {
    const today = day !== undefined && day !== null ? day : dayOf();
    state.voiceFatigue = 0;
    state.drinksTaken = 0;
    state.currentCrowd = KARAOKE_CROWD[Math.floor(rnd() * KARAOKE_CROWD.length)].id;
    if (state.dayEarned > state.bestDay) state.bestDay = state.dayEarned;
    state.dayEarned = 0;
    if (today % 7 === 5) say('Friday battle night at Neon Mic.');
    return { day: today, voice: Math.round(state.voice), rankName: rankInfo().name };
  }

  function interact() {
    const pos = posOf();
    if (Math.hypot(pos.x - KARAOKE_BAR.x, pos.z - KARAOKE_BAR.z) > 16) return false;
    if (state.performance) return hitNote();
    const songId = state.favoriteSong || 'solara-nights';
    const started = startSong(songId);
    if (!started.ok && started.reason === 'bar-closed') {
      say('Neon Mic opens at 18:00.');
      return true;
    }
    return true;
  }

  function hudLine() {
    if (state.performance) {
      const p = state.performance;
      return 'KARAOKE ' + p.songName + ' · ' + p.score + ' pts · combo ' + p.combo + ' · ' + p.noteIndex + '/' + p.notes.length;
    }
    if (state.training) return 'VOICE TRAINING · ' + Math.ceil(state.training.timeLeft) + 's left';
    const pos = posOf();
    if (Math.hypot(pos.x - KARAOKE_BAR.x, pos.z - KARAOKE_BAR.z) <= 16) {
      return 'NEON MIC · ' + rankInfo().name + ' · voice ' + Math.round(state.voice) + ' · ' + state.fans + ' fans';
    }
    if (state.voiceFatigue >= 80) return 'Voice is tired — rest before singing.';
    return '';
  }

  function stats() {
    const totalNotes = state.perfectNotes + state.goodNotes + state.missedNotes;
    const acc = totalNotes > 0 ? Math.round(((state.perfectNotes + state.goodNotes) / totalNotes) * 100) / 100 : null;
    return {
      rankName: rankInfo().name,
      rank: state.rank,
      voice: Math.round(state.voice),
      courage: Math.round(state.courage),
      totalScore: state.totalScore,
      bestScore: state.bestScore,
      bestSong: state.bestSong,
      songsSung: state.songsSung,
      perfectNotes: state.perfectNotes,
      goodNotes: state.goodNotes,
      missedNotes: state.missedNotes,
      accuracy: acc,
      duets: state.duets,
      duetsWon: state.duetsWon,
      battlesWon: state.battlesWon,
      battlesLost: state.battlesLost,
      encores: state.encores,
      tipsEarned: state.tipsEarned,
      totalEarned: state.totalEarned,
      fans: state.fans,
      performanceSong: state.performance ? state.performance.songId : null,
      trainingId: state.training ? state.training.id : null,
      favoriteSong: state.favoriteSong,
      crowdMood: Math.round(state.crowdMood * 100) / 100,
      currentCrowd: state.currentCrowd,
      drinksTaken: state.drinksTaken,
      voiceFatigue: Math.round(state.voiceFatigue),
      openMicWins: state.openMicWins,
      openMicEntries: state.openMicEntries,
      viralPerformances: state.viralPerformances,
      dayEarned: state.dayEarned,
      bestDay: state.bestDay,
      stageFright: state.stageFright,
      eventsSeen: Object.keys(state.eventsSeen).length,
      requests: state.requests,
      demosSold: state.demosSold,
    };
  }

  function serialize() {
    return {
      rank: state.rank,
      voice: state.voice,
      courage: state.courage,
      totalScore: state.totalScore,
      bestScore: state.bestScore,
      bestSong: state.bestSong,
      songsSung: state.songsSung,
      perfectNotes: state.perfectNotes,
      goodNotes: state.goodNotes,
      missedNotes: state.missedNotes,
      duets: state.duets,
      duetsWon: state.duetsWon,
      battlesWon: state.battlesWon,
      battlesLost: state.battlesLost,
      encores: state.encores,
      tipsEarned: state.tipsEarned,
      totalEarned: state.totalEarned,
      fans: state.fans,
      songHistory: { ...state.songHistory },
      favoriteSong: state.favoriteSong,
      crowdMood: state.crowdMood,
      currentCrowd: state.currentCrowd,
      drinksTaken: state.drinksTaken,
      voiceFatigue: state.voiceFatigue,
      openMicWins: state.openMicWins,
      openMicEntries: state.openMicEntries,
      viralPerformances: state.viralPerformances,
      bestDay: state.bestDay,
      lastSongDay: state.lastSongDay,
      stageFright: state.stageFright,
      eventsSeen: { ...state.eventsSeen },
      requests: state.requests,
      demosSold: state.demosSold,
    };
  }

  function deserialize(saved) {
    const s = saved || {};
    state.rank = Math.floor(Number(s.rank) || 0);
    state.voice = Number(s.voice) || 30;
    state.courage = Number(s.courage) || 50;
    state.totalScore = Number(s.totalScore) || 0;
    state.bestScore = Number(s.bestScore) || 0;
    state.bestSong = s.bestSong || null;
    state.songsSung = Math.floor(Number(s.songsSung) || 0);
    state.perfectNotes = Math.floor(Number(s.perfectNotes) || 0);
    state.goodNotes = Math.floor(Number(s.goodNotes) || 0);
    state.missedNotes = Math.floor(Number(s.missedNotes) || 0);
    state.duets = Math.floor(Number(s.duets) || 0);
    state.duetsWon = Math.floor(Number(s.duetsWon) || 0);
    state.battlesWon = Math.floor(Number(s.battlesWon) || 0);
    state.battlesLost = Math.floor(Number(s.battlesLost) || 0);
    state.encores = Math.floor(Number(s.encores) || 0);
    state.tipsEarned = Number(s.tipsEarned) || 0;
    state.totalEarned = Number(s.totalEarned) || 0;
    state.fans = Math.floor(Number(s.fans) || 0);
    state.songHistory = s.songHistory && typeof s.songHistory === 'object' ? { ...s.songHistory } : {};
    state.favoriteSong = s.favoriteSong || null;
    state.crowdMood = Number(s.crowdMood) || 0.6;
    state.currentCrowd = typeof s.currentCrowd === 'string' ? s.currentCrowd : 'regulars';
    state.drinksTaken = Math.floor(Number(s.drinksTaken) || 0);
    state.voiceFatigue = Number(s.voiceFatigue) || 0;
    state.openMicWins = Math.floor(Number(s.openMicWins) || 0);
    state.openMicEntries = Math.floor(Number(s.openMicEntries) || 0);
    state.viralPerformances = Math.floor(Number(s.viralPerformances) || 0);
    state.bestDay = Number(s.bestDay) || 0;
    state.lastSongDay = Math.floor(Number(s.lastSongDay) || 0);
    state.stageFright = s.stageFright === true;
    state.eventsSeen = s.eventsSeen && typeof s.eventsSeen === 'object' ? { ...s.eventsSeen } : {};
    state.requests = Math.floor(Number(s.requests) || 0);
    state.demosSold = Math.floor(Number(s.demosSold) || 0);
    state.performance = null;
    state.training = null;
    state.dayEarned = 0;
    return { ok: true };
  }

  function tipJar() {
    const tips = Math.round(5 + rnd() * 24 + state.fans * 0.05);
    moveCash(tips);
    state.tipsEarned += tips;
    state.totalEarned += tips;
    state.dayEarned += tips;
    return { ok: true, tips };
  }

  function songRequest(songId) {
    const song = songById(songId);
    if (!song) return { ok: false, reason: 'unknown-song' };
    const tip = 10 + Math.floor(rnd() * 20);
    moveCash(tip);
    state.tipsEarned += tip;
    state.totalEarned += tip;
    state.dayEarned += tip;
    state.requests += 1;
    return { ok: true, songId, tip };
  }

  function cureStageFright() {
    if (!state.stageFright) return { ok: false, reason: 'no-stage-fright' };
    if (cashOf() < 20) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-20);
    state.stageFright = false;
    state.courage = Math.min(100, state.courage + 10);
    return { ok: true, cost: 20 };
  }

  function recordDemo() {
    if (state.songsSung < 5) return { ok: false, reason: 'not-enough-songs' };
    if (cashOf() < 100) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-100);
    const sales = 20 + Math.floor(rnd() * 80);
    const earned = sales * 2;
    moveCash(earned);
    state.totalEarned += earned;
    state.dayEarned += earned;
    state.demosSold += sales;
    state.fans += 30;
    return { ok: true, sales, earned, cost: 100 };
  }

  return {
    name: 'Karaoke',
    state,
    startSong,
    hitNote,
    finishPerformance,
    startDuet,
    challengeBattler,
    buyDrink,
    trainVoice,
    enterOpenMic,
    tick,
    tickDay,
    interact,
    hudLine,
    stats,
    serialize,
    deserialize,
    tipJar,
    songRequest,
    cureStageFright,
    recordDemo,
  };
}
