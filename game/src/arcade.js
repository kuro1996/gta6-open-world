// Solara Nights — arcade hall (round 4 attempt 7).
// Four cabinets on the boardwalk: a racing cabinet, a light-gun shooter,
// a dance machine, and a claw crane. Tokens are bought with cash, every
// game costs tokens, and a good score pays cash back plus a place on the
// local high-score board. Scores, tokens and prizes persist in the save.
export const ARCADE_CABINETS = [
  { id: 'neon-rush', name: 'Neon Rush', kind: 'racing', cost: 2, prize: 120, blurb: 'Outrun the ghost cars down the neon strip.' },
  { id: 'dead-pixel', name: 'Dead Pixel', kind: 'shooter', cost: 3, prize: 200, blurb: 'Light-gun zombie alley — headshots pay double.' },
  { id: 'bassline', name: 'Bassline Fever', kind: 'dance', cost: 2, prize: 150, blurb: 'Hit the arrows on the beat, don\'t miss the drop.' },
  { id: 'claw-king', name: 'Claw King', kind: 'claw', cost: 1, prize: 90, blurb: 'One grab, one plush, one shot at the golden bear.' },
];

export const TOKEN_PRICE = 5; // $5 per token
export const ARCADE_SPOT = { x: 58, z: 232, name: 'Solara Arcade' };
export const PRIZE_TIERS = [
  { min: 9500, label: 'S-RANK', mult: 3.0 },
  { min: 7500, label: 'A-RANK', mult: 2.0 },
  { min: 5000, label: 'B-RANK', mult: 1.25 },
  { min: 2500, label: 'C-RANK', mult: 0.5 },
  { min: 0, label: 'D-RANK', mult: 0 },
];

export function createArcadeSystem(ctx) {
  const rng = ctx.rng || (() => Math.random());
  const state = {
    tokens: 0,
    gamesPlayed: 0,
    totalWon: 0,
    bestCombo: 0,
    scores: {}, // cabinetId -> { score, name }
    prizes: [], // { cabinet, label, amount, day }
    lastGame: null, // { cabinet, score, rank, won }
    sessions: {}, // cabinetId -> plays
  };

  function cabinet(id) {
    return ARCADE_CABINETS.find((c) => c.id === id) || null;
  }

  function rankFor(score) {
    for (const tier of PRIZE_TIERS) {
      if (score >= tier.min) return tier;
    }
    return PRIZE_TIERS[PRIZE_TIERS.length - 1];
  }

  function playScore(cab, skill) {
    // Base skill 0..1 (a playtest passes it in; a live play rolls it).
    // Each cabinet weights the roll differently so no two feel identical.
    const roll = rng();
    const wobble = (rng() - 0.5) * 0.3;
    let base;
    if (cab.kind === 'racing') base = 0.45 + skill * 0.45 + wobble * 0.5 + roll * 0.15;
    else if (cab.kind === 'shooter') base = 0.35 + skill * 0.55 + wobble + roll * 0.1;
    else if (cab.kind === 'dance') base = 0.4 + skill * 0.5 + wobble * 0.8;
    else base = 0.15 + skill * 0.35 + roll * 0.5; // claw: mostly luck
    const clamped = Math.max(0, Math.min(1, base));
    return Math.round(clamped * 10000);
  }

  function buyTokens(count) {
    const n = Math.max(1, Math.floor(count || 1));
    const cost = n * TOKEN_PRICE;
    if ((ctx.getCash ? ctx.getCash() : 0) < cost) {
      return { ok: false, reason: 'no-cash', need: cost };
    }
    ctx.addCash(-cost);
    state.tokens += n;
    ctx.log && ctx.log(`Bought ${n} arcade tokens for $${cost}.`);
    return { ok: true, tokens: state.tokens, cost };
  }

  function play(cabinetId, skill) {
    const cab = cabinet(cabinetId);
    if (!cab) return { ok: false, reason: 'no-cabinet' };
    if (state.tokens < cab.cost) {
      return { ok: false, reason: 'no-tokens', need: cab.cost, tokens: state.tokens };
    }
    state.tokens -= cab.cost;
    state.gamesPlayed += 1;
    state.sessions[cabinetId] = (state.sessions[cabinetId] || 0) + 1;
    const s = typeof skill === 'number' ? Math.max(0, Math.min(1, skill)) : 0.3 + rng() * 0.5;
    const score = playScore(cab, s);
    const tier = rankFor(score);
    const won = Math.round(cab.prize * tier.mult);
    if (won > 0) {
      ctx.addCash(won);
      state.totalWon += won;
    }
    const prev = state.scores[cabinetId];
    const isRecord = !prev || score > prev.score;
    if (isRecord) state.scores[cabinetId] = { score, name: 'Ria' };
    state.bestCombo = Math.max(state.bestCombo, score);
    if (tier.label === 'S-RANK' || tier.label === 'A-RANK') {
      state.prizes.push({ cabinet: cab.name, label: tier.label, amount: won, at: state.gamesPlayed });
    }
    state.lastGame = { cabinet: cab.name, score, rank: tier.label, won, record: isRecord };
    ctx.log && ctx.log(`${cab.name}: ${score.toLocaleString()} pts — ${tier.label}${won ? `, +$${won}` : ''}${isRecord ? ' — NEW RECORD!' : ''}`);
    return { ok: true, ...state.lastGame, tokens: state.tokens };
  }

  function clawGrab() {
    // The claw is a one-token gamble with a visible luck number, so the
    // player can feel the 1-in-8 golden bear instead of a black box.
    if (state.tokens < 1) return { ok: false, reason: 'no-tokens' };
    state.tokens -= 1;
    state.gamesPlayed += 1;
    const roll = rng();
    let result;
    if (roll < 0.125) {
      const won = 250;
      ctx.addCash(won);
      state.totalWon += won;
      result = { ok: true, prize: 'golden-bear', won, tokens: state.tokens };
      state.prizes.push({ cabinet: 'Claw King', label: 'GOLDEN BEAR', amount: won, at: state.gamesPlayed });
    } else if (roll < 0.55) {
      result = { ok: true, prize: 'plush', won: 25, tokens: state.tokens };
      ctx.addCash(25);
      state.totalWon += 25;
    } else {
      result = { ok: true, prize: 'nothing', won: 0, tokens: state.tokens };
    }
    state.lastGame = { cabinet: 'Claw King', score: Math.round(roll * 10000), rank: result.prize, won: result.won, record: false };
    return result;
  }

  // Weekly challenge: one cabinet is "hot" each week (by games played),
  // paying double on any A-rank or better. The hot cabinet rotates once
  // the player has played 10 games since the last rotation.
  function hotCabinet() {
    const idx = Math.floor(state.gamesPlayed / 10) % ARCADE_CABINETS.length;
    return ARCADE_CABINETS[idx];
  }

  function playHot(cabinetId, skill) {
    const hot = hotCabinet();
    const res = play(cabinetId, skill);
    if (!res.ok) return res;
    if (cabinetId === hot.id && (res.rank === 'A-RANK' || res.rank === 'S-RANK')) {
      const bonus = res.won; // double the prize on a hot cabinet
      ctx.addCash(bonus);
      state.totalWon += bonus;
      res.won += bonus;
      res.hotBonus = bonus;
      ctx.log && ctx.log(`HOT CABINET bonus on ${hot.name}: +$${bonus} extra!`);
    }
    return res;
  }

  // Combo: three plays in a row on the same cabinet without a D-rank
  // earns a free token — the hall rewards regulars.
  function comboBonus() {
    const last = state.lastGame;
    if (!last || last.rank === 'D-RANK') return { ok: false, reason: 'no-combo' };
    const plays = state.sessions[ARCADE_CABINETS.find((c) => c.name === last.cabinet)?.id] || 0;
    if (plays > 0 && plays % 3 === 0) {
      state.tokens += 1;
      return { ok: true, tokens: state.tokens, reason: '3-play-combo' };
    }
    return { ok: false, reason: 'not-yet', plays };
  }

  function topScores() {
    return ARCADE_CABINETS.map((cab) => ({
      cabinet: cab.name,
      score: state.scores[cab.id] ? state.scores[cab.id].score : 0,
      plays: state.sessions[cab.id] || 0,
    })).sort((a, b) => b.score - a.score);
  }

  function hudLine() {
    if (state.tokens <= 0 && state.gamesPlayed === 0) return '';
    const last = state.lastGame;
    return last
      ? `ARCADE ${state.tokens} tok · ${last.cabinet} ${last.rank}`
      : `ARCADE ${state.tokens} tok`;
  }

  function stats() {
    return {
      tokens: state.tokens,
      games: state.gamesPlayed,
      won: state.totalWon,
      best: state.bestCombo,
      records: Object.keys(state.scores).length,
      prizes: state.prizes.length,
      last: state.lastGame,
    };
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(data) {
    if (!data) return;
    Object.assign(state, JSON.parse(JSON.stringify(data)));
    state.scores = state.scores || {};
    state.prizes = state.prizes || [];
    state.sessions = state.sessions || {};
  }

  return {
    state, buyTokens, play, clawGrab, topScores, rankFor, cabinet, playHot, comboBonus, hotCabinet,
    hudLine, stats, serialize, deserialize,
  };
}
