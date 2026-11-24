// Neon Mic Karaoke — rhythm singing minigame, duets, battles and the
// open-mic night. Round 7, all-new system. Pick a song, hit the notes as
// they scroll, and work the crowd: pitch-perfect runs earn tips and fans,
// a duet with a stranger can go viral, and winning the Friday battle
// puts your name on the wall. Your voice has a stat — train it, or the
// crowd will train it for you.
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
  { id: 'moonlight', name: 'Moonlight Serenade', artist: 'Old Mike', difficulty: 2, length: 120, genre: 'jazz', base: 150 },
  { id: 'electric', name: 'Electric Love', artist: 'Neon Reef', difficulty: 3, length: 100, genre: 'pop', base: 200 },
  { id: 'sunday-drive', name: 'Sunday Drive', artist: 'The Palms', difficulty: 1, length: 88, genre: 'indie', base: 95 },
  { id: 'storm-chaser', name: 'Storm Chaser', artist: 'Comet GT', difficulty: 4, length: 135, genre: 'rock', base: 270 },
];

export const KARAOKE_NOTES = ['low', 'mid', 'high', 'hold'];

export const KARAOKE_CROWD = [
  { id: 'regulars', name: 'Regulars', size: 20, generosity: 0.5, mood: 0.6 },
  { id: 'students', name: 'Students', size: 35, generosity: 0.3, mood: 0.8 },
  { id: 'tourists', name: 'Tourists', size: 25, generosity: 0.9, mood: 0.7 },
  { id: 'critics', name: 'Music Critics', size: 5, generosity: 0.2, mood: 0.3 },
  { id: 'party', name: 'Birthday Party', size: 15, generosity: 1.0, mood: 0.9 },
  { id: 'date-night', name: 'Date Night Crowd', size: 12, generosity: 0.6, mood: 0.75 },
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
  { id: 'scales', name: 'Vocal Scales', price: 0, gain: 2, time: 30 },
  { id: 'breathing', name: 'Breathing Exercises', price: 0, gain: 2, time: 30 },
  { id: 'coach', name: 'Voice Coach Session', price: 150, gain: 8, time: 60 },
  { id: 'choir', name: 'Choir Practice', price: 40, gain: 5, time: 45 },
  { id: 'recording', name: 'Studio Recording', price: 300, gain: 12, time: 90 },
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
  { id: 'heckler', name: 'Heckler', text: 'A heckler shouts from the back!' },
  { id: 'encore', name: 'Encore!', text: 'The crowd chants for an encore!' },
  { id: 'mic-drop', name: 'Mic Drop', text: 'Someone drops the mic. The crowd gasps.' },
  { id: 'scout', name: 'Talent Scout', text: 'A talent scout watches from the bar.' },
  { id: 'proposal-song', name: 'Proposal Song', text: 'A couple gets engaged during your song!' },
  { id: 'power-out', name: 'Power Cut', text: 'The power cuts mid-song!' },
  { id: 'duet-offer', name: 'Duet Offer', text: 'A stranger asks to duet with you!' },
  { id: 'birthday-song', name: 'Birthday Song', text: 'It is someone\'s birthday — sing for them!' },
];

export function karaokeRankFor(totalScore) {
  let rank = 0;
  for (let i = 0; i < KARAOKE_RANKS.length; i++) {
    if (totalScore >= KARAOKE_RANKS[i].scoreNeeded) rank = i;
  }
  return rank;
}

export function createKaraokeSystem(deps = {}) {
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
    voice: 30, // 0..100, trained up
    courage: 50, // 0..100, drinks and experience
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
    performance: null, // { songId, notes: [], noteIndex, score, combo, maxCombo, timeLeft, crowdId, bet, opponent }
    training: null, // { trainingId, timeLeft }
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
  };

  function rankInfo() { return KARAOKE_RANKS[state.rank]; }
  function songInfo(id) { return KARAOKE_SONGS.find((s) => s.id === id); }
  function hitChance() {
    let chance = 0.45 + state.voice * 0.004 + state.courage * 0.001;
    if (state.voiceFatigue > 50) chance -= 0.15;
    if (state.drinksTaken > 2) chance -= 0.1;
    return Math.max(0.15, Math.min(0.95, chance));
  }
  function crowdInfo() {
    return KARAOKE_CROWD.find((c) => c.id === state.currentCrowd) || KARAOKE_CROWD[0];
  }

  function generateNotes(song) {
    const count = 12 + song.difficulty * 6;
    const notes = [];
    for (let i = 0; i < count; i++) {
      const type = KARAOKE_NOTES[Math.floor(rng() * KARAOKE_NOTES.length)];
      notes.push({ type, hit: null, at: (i / count) * song.length });
    }
    return notes;
  }

  function startSong(songId, crowdId = null) {
    if (state.performance) return { ok: false, reason: 'performance-active' };
    const song = songInfo(songId);
    if (!song) return { ok: false, reason: 'no-such-song' };
    const hour = getHour();
    if (hour < 18 && hour >= 2) return { ok: false, reason: 'bar-closed', open: '18:00' };
    if (state.voiceFatigue >= 80) return { ok: false, reason: 'voice-tired' };
    if (state.stageFright && state.courage < 30) {
      return { ok: false, reason: 'stage-fright', need: 'courage 30+' };
    }
    const crowd = crowdId ? KARAOKE_CROWD.find((c) => c.id === crowdId) : KARAOKE_CROWD[Math.floor(rng() * KARAOKE_CROWD.length)];
    state.currentCrowd = crowd.id;
    state.crowdMood = crowd.mood;
    const notes = generateNotes(song);
    state.performance = {
      songId, songName: song.name, artist: song.artist,
      notes, noteIndex: 0, score: 0, combo: 0, maxCombo: 0,
      timeLeft: song.length, crowdId: crowd.id, bet: 0, opponent: null,
      duet: false, startedDay: getDay(),
    };
    state.lastSongDay = getDay();
    log(`On stage: ${song.name} by ${song.artist} for the ${crowd.name}! ${notes.length} notes — hit them!`);
    return { ok: true, performance: { songId, notes: notes.length, crowd: crowd.id } };
  }

  function hitNote(noteType = null) {
    const perf = state.performance;
    if (!perf) return { ok: false, reason: 'no-performance' };
    if (perf.noteIndex >= perf.notes.length) return { ok: false, reason: 'song-over' };
    const note = perf.notes[perf.noteIndex];
    perf.noteIndex += 1;
    const wanted = noteType || note.type;
    const perfect = wanted === note.type && rng() < hitChance();
    const good = !perfect && rng() < hitChance() + 0.25;
    const song = songInfo(perf.songId);
    if (perfect) {
      perf.combo += 1;
      if (perf.combo > perf.maxCombo) perf.maxCombo = perf.combo;
      const comboMult = 1 + (perf.combo - 1) * 0.1;
      const points = Math.round(song.base * 0.2 * comboMult * rankInfo().mult);
      perf.score += points;
      note.hit = 'perfect';
      state.perfectNotes += 1;
      state.crowdMood = Math.min(1, state.crowdMood + 0.02);
      return { ok: true, result: 'perfect', points, combo: perf.combo, score: perf.score };
    }
    if (good) {
      perf.combo += 1;
      if (perf.combo > perf.maxCombo) perf.maxCombo = perf.combo;
      const points = Math.round(song.base * 0.1 * rankInfo().mult);
      perf.score += points;
      note.hit = 'good';
      state.goodNotes += 1;
      return { ok: true, result: 'good', points, combo: perf.combo, score: perf.score };
    }
    perf.combo = 0;
    note.hit = 'miss';
    state.missedNotes += 1;
    state.crowdMood = Math.max(0, state.crowdMood - 0.03);
    if (rng() < 0.1) {
      state.stageFright = true;
      log('You freeze mid-note — stage fright! The crowd murmurs.');
    }
    return { ok: true, result: 'miss', points: 0, combo: 0, score: perf.score };
  }

  function finishPerformance() {
    const perf = state.performance;
    if (!perf) return { ok: false, reason: 'no-performance' };
    state.performance = null;
    state.songsSung += 1;
    state.totalScore += perf.score;
    state.voiceFatigue = Math.min(100, state.voiceFatigue + 15);
    const song = songInfo(perf.songId);
    state.songHistory[perf.songId] = (state.songHistory[perf.songId] || 0) + 1;
    let top = null;
    let topN = 0;
    for (const [k, v] of Object.entries(state.songHistory)) {
      if (v > topN) { topN = v; top = k; }
    }
    state.favoriteSong = top;
    if (perf.score > state.bestScore) {
      state.bestScore = perf.score;
      state.bestSong = perf.songId;
    }
    const maxPossible = perf.notes.length * Math.round(song.base * 0.2 * rankInfo().mult);
    const accuracy = maxPossible > 0 ? perf.score / maxPossible : 0;
    const crowd = crowdInfo();
    let tips = 0;
    if (accuracy >= 0.5) {
      tips = Math.round(crowd.size * crowd.generosity * accuracy * (1 + state.fans * 0.001));
      if (perf.duet) tips = Math.round(tips * 1.5);
    }
    let payout = tips;
    let wonBet = false;
    if (perf.opponent) {
      const battler = KARAOKE_BATTLERS.find((b) => b.id === perf.opponent);
      const oppScore = Math.round(maxPossible * battler.skill * (0.8 + rng() * 0.4));
      if (perf.score > oppScore) {
        wonBet = true;
        payout += perf.bet * 2;
        state.battlesWon += 1;
        log(`BATTLE WIN! You out-sang ${battler.name} ${perf.score}–${oppScore}! Won $${perf.bet * 2}.`);
      } else {
        state.battlesLost += 1;
        log(`${battler.name} out-sang you ${oppScore}–${perf.score}. The bet is gone.`);
      }
    }
    if (perf.duet) {
      state.duets += 1;
      if (accuracy >= 0.6) state.duetsWon += 1;
    }
    addCash(payout);
    state.totalEarned += payout;
    state.dayEarned += payout;
    state.tipsEarned += tips;
    const fansGained = Math.round(accuracy * 20 * state.crowdMood);
    state.fans += fansGained;
    let encore = false;
    if (accuracy >= 0.8 && rng() < 0.5) {
      encore = true;
      state.encores += 1;
      const encoreTip = 50;
      addCash(encoreTip);
      state.totalEarned += encoreTip;
      state.dayEarned += encoreTip;
      log('ENCORE! The crowd demands another song! +$50.');
    }
    const viral = accuracy >= 0.85 && rng() < 0.2;
    if (viral) {
      state.viralPerformances += 1;
      state.fans += 200;
      log('Your performance goes VIRAL! +200 fans!');
    }
    const newRank = karaokeRankFor(state.totalScore);
    let promoted = false;
    if (newRank > state.rank) {
      state.rank = newRank;
      promoted = true;
      log(`RANK UP! You are now ${KARAOKE_RANKS[newRank].name}! Tips x${KARAOKE_RANKS[newRank].mult}.`);
    }
    state.courage = Math.min(100, state.courage + 2);
    log(`Song over: ${perf.songName} — ${perf.score} points, ${Math.round(accuracy * 100)}% accuracy, $${payout} earned, +${fansGained} fans.`);
    return { ok: true, score: perf.score, accuracy: Number(accuracy.toFixed(2)), tips, payout, fans: fansGained, encore, viral, wonBet, promoted };
  }

  function startDuet(songId) {
    const res = startSong(songId);
    if (!res.ok) return res;
    state.performance.duet = true;
    log('A stranger joins you on stage for a duet! The crowd loves it.');
    return { ok: true, duet: true, performance: res.performance };
  }

  function challengeBattler(battlerId, songId) {
    const battler = KARAOKE_BATTLERS.find((b) => b.id === battlerId);
    if (!battler) return { ok: false, reason: 'no-such-battler' };
    if (getCash() < battler.bet) return { ok: false, reason: 'no-cash', need: battler.bet };
    const res = startSong(songId);
    if (!res.ok) return res;
    addCash(-battler.bet);
    state.performance.bet = battler.bet;
    state.performance.opponent = battlerId;
    log(`${battler.name} accepts your $${battler.bet} battle! Style: ${battler.style}.`);
    return { ok: true, battler: battlerId, bet: battler.bet };
  }

  function buyDrink(drinkId) {
    const drink = KARAOKE_DRINKS.find((d) => d.id === drinkId);
    if (!drink) return { ok: false, reason: 'no-such-drink' };
    if (getCash() < drink.price) return { ok: false, reason: 'no-cash', need: drink.price };
    addCash(-drink.price);
    state.drinksTaken += 1;
    state.voice = Math.max(0, Math.min(100, state.voice + drink.voice));
    state.courage = Math.max(0, Math.min(100, state.courage + drink.courage));
    if (drinkId === 'shot' || drinkId === 'cocktail') state.stageFright = false;
    log(`Drank ${drink.name}. Voice ${Math.round(state.voice)}, courage ${Math.round(state.courage)}.`);
    return { ok: true, drink: drinkId, voice: Math.round(state.voice), courage: Math.round(state.courage) };
  }

  function trainVoice(trainingId) {
    if (state.training) return { ok: false, reason: 'training-active' };
    const training = KARAOKE_VOICE_TRAINING.find((t) => t.id === trainingId);
    if (!training) return { ok: false, reason: 'no-such-training' };
    if (getCash() < training.price) return { ok: false, reason: 'no-cash', need: training.price };
    addCash(-training.price);
    state.training = { trainingId, timeLeft: training.time, gain: training.gain };
    log(`Voice training started: ${training.name} (${training.time}s).`);
    return { ok: true, training: trainingId, timeLeft: training.time };
  }

  function enterOpenMic() {
    const entry = 10;
    if (getCash() < entry) return { ok: false, reason: 'no-cash', need: entry };
    if (state.performance) return { ok: false, reason: 'performance-active' };
    addCash(-entry);
    state.openMicEntries += 1;
    const song = KARAOKE_SONGS[Math.floor(rng() * KARAOKE_SONGS.length)];
    const res = startSong(song.id);
    if (!res.ok) {
      addCash(entry);
      state.openMicEntries -= 1;
      return res;
    }
    state.performance.openMic = true;
    log(`Open mic night! You are up with ${song.name}. Win the night for $200!`);
    return { ok: true, song: song.id };
  }

  function tick(dt) {
    // A live performance ticks down; the song ends when the clock does.
    const perf = state.performance;
    if (perf) {
      perf.timeLeft -= dt;
      if (perf.timeLeft <= 0 || perf.noteIndex >= perf.notes.length) {
        finishPerformance();
        return;
      }
      // Random stage events, rare.
      if (rng() < dt * 0.003) {
        const ev = KARAOKE_EVENTS[Math.floor(rng() * KARAOKE_EVENTS.length)];
        state.eventsSeen[ev.id] = (state.eventsSeen[ev.id] || 0) + 1;
        switch (ev.id) {
          case 'heckler':
            state.crowdMood = Math.max(0, state.crowdMood - 0.1);
            if (state.courage >= 60) {
              state.fans += 10;
              log('You shut the heckler down with a high note! +10 fans.');
            } else {
              log('A heckler shouts from the back! The crowd murmurs.');
            }
            break;
          case 'encore':
            state.crowdMood = Math.min(1, state.crowdMood + 0.1);
            log('The crowd chants for an encore!');
            break;
          case 'mic-drop':
            state.crowdMood = Math.max(0, state.crowdMood - 0.05);
            log('Someone drops the mic. The crowd gasps.');
            break;
          case 'scout':
            if (state.voice >= 60) {
              state.fans += 25;
              log('A talent scout is impressed! +25 fans.');
            } else {
              log('A talent scout watches from the bar...');
            }
            break;
          case 'proposal-song':
            state.fans += 20;
            addCash(40);
            state.totalEarned += 40;
            log('A couple gets engaged during your song! They tip $40. +20 fans.');
            break;
          case 'power-out':
            state.crowdMood = Math.max(0, state.crowdMood - 0.15);
            log('The power cuts mid-song! The band keeps playing acoustic.');
            break;
          case 'duet-offer':
            if (!perf.duet) {
              perf.duet = true;
              state.crowdMood = Math.min(1, state.crowdMood + 0.15);
              log('A stranger jumps on stage for a duet! The crowd goes wild!');
            }
            break;
          case 'birthday-song':
            state.fans += 15;
            addCash(25);
            state.totalEarned += 25;
            log('It is someone\'s birthday — you sing for them! +$25, +15 fans.');
            break;
          default:
            log(`Karaoke: ${ev.text}`);
            break;
        }
      }
    }
    // Voice training progresses.
    if (state.training) {
      state.training.timeLeft -= dt;
      if (state.training.timeLeft <= 0) {
        const gain = state.training.gain;
        state.voice = Math.min(100, state.voice + gain);
        state.training = null;
        log(`Voice training complete! Voice +${gain} (now ${Math.round(state.voice)}).`);
      }
    }
    // Voice fatigue recovers when not singing; courage settles.
    if (!perf) {
      state.voiceFatigue = Math.max(0, state.voiceFatigue - dt * 0.5);
      if (state.drinksTaken > 0 && rng() < dt * 0.01) state.drinksTaken = Math.max(0, state.drinksTaken - 1);
    }
    // Stage fright fades with courage.
    if (state.stageFright && state.courage >= 50) {
      state.stageFright = false;
      log('Stage fright fades. You own the stage now.');
    }
  }

  function tickDay(day) {
    // A new day: voice rests, fatigue clears, the bar books a new crowd.
    state.voiceFatigue = 0;
    state.drinksTaken = 0;
    state.currentCrowd = KARAOKE_CROWD[Math.floor(rng() * KARAOKE_CROWD.length)].id;
    if (state.dayEarned > state.bestDay) state.bestDay = state.dayEarned;
    state.dayEarned = 0;
    // Friday is battle night at the Neon Mic.
    if (day % 7 === 5) {
      log('Friday battle night at the Neon Mic! Challenge a battler and win big.');
    }
    return { day, voice: Math.round(state.voice), rank: KARAOKE_RANKS[state.rank].name };
  }

  function interact() {
    const p = getPlayerPos();
    const d = Math.hypot(KARAOKE_BAR.x - p.x, KARAOKE_BAR.z - p.z);
    if (d > 16) return false;
    if (state.performance) {
      // On stage: hit the next note.
      const res = hitNote();
      return res.ok;
    }
    // Off stage: sing your favorite song (or the first one).
    const songId = state.favoriteSong || 'solara-nights';
    const res = startSong(songId);
    if (res.ok) return true;
    if (res.reason === 'bar-closed') {
      log('Neon Mic opens at 18:00. Come back tonight!');
      return true;
    }
    return true;
  }

  function hudLine() {
    if (state.performance) {
      const perf = state.performance;
      return `KARAOKE ${perf.songName} · ${perf.score} pts · combo x${perf.combo} · note ${perf.noteIndex}/${perf.notes.length}`;
    }
    if (state.training) {
      return `VOICE TRAINING ${Math.ceil(state.training.timeLeft)}s left`;
    }
    const p = getPlayerPos();
    if (Math.hypot(KARAOKE_BAR.x - p.x, KARAOKE_BAR.z - p.z) < 16) {
      return `NEON MIC · ${KARAOKE_RANKS[state.rank].name} · voice ${Math.round(state.voice)} · fans ${state.fans}`;
    }
    if (state.voiceFatigue >= 80) return 'VOICE tired — rest before singing again';
    return '';
  }

  function stats() {
    return {
      rank: KARAOKE_RANKS[state.rank].name,
      rankIndex: state.rank,
      voice: Math.round(state.voice),
      courage: Math.round(state.courage),
      totalScore: state.totalScore,
      bestScore: state.bestScore,
      bestSong: state.bestSong,
      songsSung: state.songsSung,
      perfectNotes: state.perfectNotes,
      goodNotes: state.goodNotes,
      missedNotes: state.missedNotes,
      accuracy: state.perfectNotes + state.goodNotes + state.missedNotes > 0
        ? Number(((state.perfectNotes + state.goodNotes) / (state.perfectNotes + state.goodNotes + state.missedNotes)).toFixed(2))
        : null,
      duets: state.duets,
      duetsWon: state.duetsWon,
      battlesWon: state.battlesWon,
      battlesLost: state.battlesLost,
      encores: state.encores,
      tipsEarned: state.tipsEarned,
      totalEarned: state.totalEarned,
      fans: state.fans,
      performance: state.performance ? state.performance.songId : null,
      training: state.training ? state.training.trainingId : null,
      favoriteSong: state.favoriteSong,
      crowdMood: Number(state.crowdMood.toFixed(2)),
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
      requests: state.requests || 0,
      demosSold: state.demosSold || 0,
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
      requests: state.requests || 0,
      demosSold: state.demosSold || 0,
    };
  }

  function deserialize(d) {
    if (!d) return;
    state.rank = d.rank ?? 0;
    state.voice = d.voice ?? 30;
    state.courage = d.courage ?? 50;
    state.totalScore = d.totalScore ?? 0;
    state.bestScore = d.bestScore ?? 0;
    state.bestSong = d.bestSong ?? null;
    state.songsSung = d.songsSung ?? 0;
    state.perfectNotes = d.perfectNotes ?? 0;
    state.goodNotes = d.goodNotes ?? 0;
    state.missedNotes = d.missedNotes ?? 0;
    state.duets = d.duets ?? 0;
    state.duetsWon = d.duetsWon ?? 0;
    state.battlesWon = d.battlesWon ?? 0;
    state.battlesLost = d.battlesLost ?? 0;
    state.encores = d.encores ?? 0;
    state.tipsEarned = d.tipsEarned ?? 0;
    state.totalEarned = d.totalEarned ?? 0;
    state.fans = d.fans ?? 0;
    state.songHistory = { ...(d.songHistory || {}) };
    state.favoriteSong = d.favoriteSong ?? null;
    state.crowdMood = d.crowdMood ?? 0.6;
    state.currentCrowd = d.currentCrowd || 'regulars';
    state.drinksTaken = d.drinksTaken ?? 0;
    state.voiceFatigue = d.voiceFatigue ?? 0;
    state.openMicWins = d.openMicWins ?? 0;
    state.openMicEntries = d.openMicEntries ?? 0;
    state.viralPerformances = d.viralPerformances ?? 0;
    state.bestDay = d.bestDay ?? 0;
    state.lastSongDay = d.lastSongDay ?? 0;
    state.stageFright = !!d.stageFright;
    state.eventsSeen = { ...(d.eventsSeen || {}) };
    state.requests = d.requests ?? 0;
    state.demosSold = d.demosSold ?? 0;
    state.performance = null;
    state.training = null;
    state.dayEarned = 0;
  }

  function tipJar() {
    const tips = 5 + Math.floor(rng() * 25) + Math.floor(state.fans * 0.05);
    addCash(tips);
    state.totalEarned += tips;
    state.tipsEarned += tips;
    state.dayEarned += tips;
    log(`Someone drops $${tips} in the tip jar!`);
    return { ok: true, tips };
  }
  function songRequest(songId) {
    const song = songInfo(songId);
    if (!song) return { ok: false, reason: 'no-such-song' };
    const tip = 10 + Math.floor(rng() * 20);
    addCash(tip);
    state.totalEarned += tip;
    state.tipsEarned += tip;
    state.requests = (state.requests || 0) + 1;
    log(`A fan requests ${song.name} and tips $${tip} to hear it!`);
    return { ok: true, song: songId, tip };
  }
  function cureStageFright() {
    if (!state.stageFright) return { ok: false, reason: 'no-stage-fright' };
    const cost = 20;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.stageFright = false;
    state.courage = Math.min(100, state.courage + 10);
    log('A deep breath and a honey tea — stage fright gone. Courage +10.');
    return { ok: true, cost };
  }
  function recordDemo() {
    const cost = 100;
    if (state.songsSung < 5) return { ok: false, reason: 'need-5-songs', have: state.songsSung };
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    const sales = 20 + Math.floor(rng() * 80);
    const earned = sales * 2;
    addCash(earned);
    state.totalEarned += earned;
    state.demosSold = (state.demosSold || 0) + sales;
    state.fans += 30;
    log(`Demo recorded and sold ${sales} copies! Earned $${earned}, +30 fans.`);
    return { ok: true, sales, earned, cost };
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
    startSong,
    hitNote,
    finishPerformance,
    startDuet,
    challengeBattler,
    buyDrink,
    trainVoice,
    enterOpenMic,
    hitChance,
    crowdInfo,
    rankInfo,
    songInfo,
    tipJar,
    songRequest,
    cureStageFright,
    recordDemo,
  };
}
