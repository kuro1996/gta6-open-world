export const ARCADE_CABINETS = [
  { id: 'neon-rush', name: 'Neon Rush', kind: 'racing', cost: 2, prize: 120, blurb: 'Outrun the grid under pink neon.' },
  { id: 'dead-pixel', name: 'Dead Pixel', kind: 'shooter', cost: 3, prize: 200, blurb: 'Blast the glitch horde before it eats the screen.' },
  { id: 'bassline-fever', name: 'Bassline Fever', kind: 'dance', cost: 2, prize: 150, blurb: 'Hit the beat and ride the bassline.' },
  { id: 'claw-king', name: 'Claw King', kind: 'claw', cost: 1, prize: 90, blurb: 'One claw, one plush, one shot at glory.' },
];

export const TOKEN_PRICE = 5;

export const ARCADE_SPOT = { x: 58, z: 232, name: 'Solara Arcade' };

export const PRIZE_TIERS = [
  { min: 9500, label: 'S-RANK', mult: 3.0 },
  { min: 7500, label: 'A-RANK', mult: 2.0 },
  { min: 5000, label: 'B-RANK', mult: 1.25 },
  { min: 2500, label: 'C-RANK', mult: 0.5 },
  { min: 0, label: 'D-RANK', mult: 0 },
];

function deepCopy(v) {
  return v === undefined ? undefined : JSON.parse(JSON.stringify(v));
}

function rollOf() {
  return Math.random();
}

export function createArcadeSystem(ctx) {
  const c = ctx || {};
  const dice = typeof c.rng === 'function' ? c.rng : rollOf;
  const state = {
    tokens: 0,
    gamesPlayed: 0,
    totalWon: 0,
    bestCombo: 0,
    scores: {},
    prizes: [],
    lastGame: null,
    sessions: {},
  };

  function say(msg) {
    if (typeof c.log === 'function') c.log(msg);
  }
  function cashNow() {
    return typeof c.getCash === 'function' ? c.getCash() : 0;
  }
  function pay(amount) {
    if (typeof c.addCash === 'function') c.addCash(amount);
  }

  function scoreFor(cab, skill) {
    const r1 = dice();
    const r2 = dice();
    let raw;
    if (cab.kind === 'racing') raw = skill * 0.7 + r1 * 0.3;
    else if (cab.kind === 'shooter') raw = skill * 0.5 + r1 * 0.35 + r2 * 0.15;
    else if (cab.kind === 'dance') raw = skill * 0.6 + r2 * 0.4;
    else raw = skill * 0.3 + r1 * 0.7;
    if (raw < 0) raw = 0;
    if (raw > 1) raw = 1;
    return Math.round(raw * 10000);
  }

  const sys = {
    cabinet(id) {
      for (const cab of ARCADE_CABINETS) if (cab.id === id) return cab;
      return null;
    },

    rankFor(score) {
      for (const tier of PRIZE_TIERS) {
        if (score >= tier.min) return tier;
      }
      return PRIZE_TIERS[PRIZE_TIERS.length - 1];
    },

    buyTokens(count) {
      const n = Math.max(1, Math.floor(count) || 1);
      const cost = n * TOKEN_PRICE;
      if (cashNow() < cost) return { ok: false, reason: 'no-cash', need: cost };
      pay(-cost);
      state.tokens += n;
      say('Bought ' + n + ' arcade tokens for $' + cost + '.');
      return { ok: true, tokens: state.tokens, cost };
    },

    play(id, skill) {
      const cab = sys.cabinet(id);
      if (!cab) return { ok: false, reason: 'no-cabinet' };
      if (state.tokens < cab.cost) return { ok: false, reason: 'no-tokens', need: cab.cost, tokens: state.tokens };
      state.tokens -= cab.cost;
      state.gamesPlayed += 1;
      state.sessions[id] = (state.sessions[id] || 0) + 1;
      let sk = skill;
      if (sk === undefined || sk === null) sk = 0.3 + dice() * 0.5;
      if (sk < 0) sk = 0;
      if (sk > 1) sk = 1;
      const score = scoreFor(cab, sk);
      const tier = sys.rankFor(score);
      const won = Math.round(cab.prize * tier.mult);
      if (won > 0) {
        pay(won);
        state.totalWon += won;
      }
      const prev = state.scores[id];
      const record = !prev || score > prev.score;
      if (record) state.scores[id] = { score, name: cab.name };
      if (state.bestCombo < score) state.bestCombo = score;
      if (tier.label === 'S-RANK' || tier.label === 'A-RANK') {
        state.prizes.push({ cabinet: cab.id, label: tier.label, amount: won, at: state.gamesPlayed });
      }
      state.lastGame = { cabinet: cab.id, score, rank: tier.label, won, record };
      say('Played ' + cab.name + ': ' + score + ' (' + tier.label + '), won $' + won + '.');
      return { ok: true, cabinet: cab.id, score, rank: tier.label, won, record, tokens: state.tokens };
    },

    clawGrab() {
      if (state.tokens < 1) return { ok: false, reason: 'no-tokens' };
      state.tokens -= 1;
      state.gamesPlayed += 1;
      state.sessions['claw-king'] = (state.sessions['claw-king'] || 0) + 1;
      const roll = dice();
      let prizeName = 'nothing';
      let amount = 0;
      if (roll < 0.125) {
        prizeName = 'golden bear';
        amount = 250;
      } else if (roll < 0.55) {
        prizeName = 'plush';
        amount = 25;
      }
      if (amount > 0) {
        pay(amount);
        state.totalWon += amount;
      }
      if (prizeName === 'golden bear') {
        state.prizes.push({ cabinet: 'claw-king', label: 'S-RANK', amount, at: state.gamesPlayed });
      }
      state.lastGame = { cabinet: 'claw-king', score: Math.round(roll * 10000), rank: prizeName, won: amount, record: false };
      return { ok: true, prize: prizeName, won: amount, tokens: state.tokens };
    },

    hotCabinet() {
      const idx = Math.floor(state.gamesPlayed / 10) % ARCADE_CABINETS.length;
      return ARCADE_CABINETS[idx];
    },

    playHot(id, skill) {
      const result = sys.play(id, skill);
      if (!result.ok) return result;
      const hot = sys.hotCabinet();
      if (hot && hot.id === id && (result.rank === 'A-RANK' || result.rank === 'S-RANK')) {
        const cab = sys.cabinet(id);
        const bonus = Math.round(cab.prize * sys.rankFor(result.score).mult);
        pay(bonus);
        state.totalWon += bonus;
        result.won += bonus;
        result.hotBonus = bonus;
        say('Hot cabinet bonus: +$' + bonus + ' on ' + cab.name + '.');
      }
      return result;
    },

    comboBonus() {
      if (!state.lastGame || state.lastGame.rank === 'D-RANK') return { ok: false, reason: 'no-combo' };
      const plays = state.sessions[state.lastGame.cabinet] || 0;
      if (plays > 0 && plays % 3 === 0) {
        state.tokens += 1;
        return { ok: true, tokens: state.tokens, reason: '3-play-combo' };
      }
      return { ok: false, reason: 'not-yet', plays };
    },

    topScores() {
      const rows = [];
      for (const cab of ARCADE_CABINETS) {
        const rec = state.scores[cab.id];
        rows.push({ cabinet: cab.name, score: rec ? rec.score : 0, plays: state.sessions[cab.id] || 0 });
      }
      rows.sort((a, b) => b.score - a.score);
      return rows;
    },

    hudLine() {
      if (state.tokens === 0 && state.gamesPlayed === 0) return '';
      let line = 'ARCADE ' + state.tokens + ' tokens';
      if (state.lastGame) {
        const cab = sys.cabinet(state.lastGame.cabinet);
        line += ' | ' + (cab ? cab.name : state.lastGame.cabinet) + ' ' + state.lastGame.rank;
      }
      return line;
    },

    stats() {
      return {
        tokens: state.tokens,
        games: state.gamesPlayed,
        won: state.totalWon,
        best: state.bestCombo,
        records: Object.keys(state.scores).length,
        prizes: state.prizes.length,
        last: state.lastGame,
      };
    },

    serialize() {
      return deepCopy(state);
    },

    deserialize(data) {
      if (!data) return;
      const copy = deepCopy(data);
      state.tokens = copy.tokens;
      state.gamesPlayed = copy.gamesPlayed;
      state.totalWon = copy.totalWon;
      state.bestCombo = copy.bestCombo;
      state.scores = copy.scores || {};
      state.prizes = copy.prizes || [];
      state.lastGame = copy.lastGame;
      state.sessions = copy.sessions || {};
    },
  };
  return sys;
}
