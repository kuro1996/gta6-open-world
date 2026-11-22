// Solara Nights — Casino (round 4 attempt 6, NEW module).
// The Solara Royale casino on the strip: buy chips at the cage, then play
// slots or blackjack at the tables. Chips are the casino's own currency —
// the player converts cash in and out, and the house edge is real, so a
// long session trends down unless the player hits a jackpot or a hot shoe.
// Winning big raises the player's profile: high rollers get noticed, and
// the pit boss starts watching (and the wanted heat creeps up if the
// player keeps winning suspiciously large amounts).
//
// Blackjack here is a faithful small-deck game: hit, stand, double down,
// dealer stands on 17, blackjack pays 3:2. Slots are a 3-reel machine
// with weighted symbols and a progressive jackpot that grows with every
// losing spin across the session. Both games are pure functions of the
// injected rng, so they are testable without the renderer.
//
// Self-contained: talks to the game only through the optional `ctx` hooks.

export const CASINO_VERSION = 1;

export const CHIP_RATE = 1; // $1 cash = 1 chip, no commission at the cage.
export const MAX_BET = 500;
export const MIN_BET = 5;

// --- slots -----------------------------------------------------------------
export const SLOT_SYMBOLS = [
  { id: 'cherry', label: '🍒', weight: 30, pay3: 5, pay2: 0 },
  { id: 'lemon', label: '🍋', weight: 24, pay3: 10, pay2: 0 },
  { id: 'bell', label: '🔔', weight: 16, pay3: 25, pay2: 2 },
  { id: 'seven', label: '7️⃣', weight: 10, pay3: 100, pay2: 5 },
  { id: 'diamond', label: '💎', weight: 6, pay3: 250, pay2: 10 },
  { id: 'crown', label: '👑', weight: 3, pay3: 1000, pay2: 25 },
];

export function spinReels(rng) {
  const pick = () => {
    const total = SLOT_SYMBOLS.reduce((a, s) => a + s.weight, 0);
    let roll = (rng ? rng() : Math.random()) * total;
    for (const s of SLOT_SYMBOLS) {
      roll -= s.weight;
      if (roll <= 0) return s;
    }
    return SLOT_SYMBOLS[0];
  };
  return [pick(), pick(), pick()];
}

export function slotPayout(reels, bet, jackpot) {
  const [a, b, c] = reels;
  if (a.id === 'crown' && b.id === 'crown' && c.id === 'crown') {
    return { kind: 'jackpot', amount: jackpot, label: 'JACKPOT — three crowns!' };
  }
  if (a.id === b.id && b.id === c.id) {
    return { kind: 'win', amount: bet * a.pay3, label: `Three ${a.label} — ${a.pay3}x!` };
  }
  if (a.id === b.id || b.id === c.id || a.id === c.id) {
    const sym = a.id === b.id ? a : c;
    if (sym.pay2 > 0) {
      return { kind: 'win', amount: bet * sym.pay2, label: `Pair of ${sym.label} — ${sym.pay2}x` };
    }
  }
  return { kind: 'lose', amount: 0, label: 'No match — the house smiles.' };
}

// --- blackjack -------------------------------------------------------------
export function makeDeck(rng) {
  const suits = ['♠', '♥', '♦', '♣'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck = [];
  for (const suit of suits) for (const rank of ranks) deck.push({ rank, suit });
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor((rng ? rng() : Math.random()) * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function handValue(cards) {
  let total = 0;
  let aces = 0;
  for (const c of cards) {
    if (c.rank === 'A') { aces += 1; total += 11; }
    else if (['K', 'Q', 'J'].includes(c.rank)) total += 10;
    else total += Number(c.rank);
  }
  while (total > 21 && aces > 0) { total -= 10; aces -= 1; }
  return { total, soft: aces > 0 };
}

export function isBlackjack(cards) {
  return cards.length === 2 && handValue(cards).total === 21;
}

export function handLabel(cards) {
  return cards.map((c) => `${c.rank}${c.suit}`).join(' ');
}

// --- system ----------------------------------------------------------------
export function createCasinoSystem(ctx = {}) {
  const rng = ctx.rng || Math.random;
  const state = {
    version: CASINO_VERSION,
    chips: 0,
    inCasino: false,
    jackpot: 2500,
    spins: 0,
    spinWins: 0,
    spinWon: 0,
    spinLost: 0,
    hands: 0,
    handsWon: 0,
    handsLost: 0,
    handsPushed: 0,
    bjWon: 0,
    bjLost: 0,
    biggestWin: 0,
    biggestLoss: 0,
    lifetimeWon: 0,
    lifetimeLost: 0,
    heatNotices: 0,
    hand: null, // { deck, player, dealer, bet, doubled, phase }
    lastResult: null,
    log: [],
  };

  function note(msg) {
    state.log.push(msg);
    if (state.log.length > 40) state.log.shift();
    if (typeof ctx.log === 'function') ctx.log(msg);
  }

  function cash() {
    return typeof ctx.getCash === 'function' ? ctx.getCash() : (ctx.cash ?? 0);
  }

  function addCash(amount) {
    if (typeof ctx.addCash === 'function') ctx.addCash(amount);
    else if (typeof ctx.cash === 'number') ctx.cash += amount;
  }

  function addHeat(amount) {
    if (typeof ctx.addHeat === 'function') ctx.addHeat(amount);
  }

  function buyChips(amount) {
    if (!Number.isFinite(amount) || amount <= 0) return { ok: false, reason: 'bad-amount' };
    if (cash() < amount) return { ok: false, reason: 'not-enough-cash' };
    addCash(-amount);
    state.chips += Math.floor(amount * CHIP_RATE);
    note(`Bought ${Math.floor(amount)} chips at the cage.`);
    return { ok: true, chips: state.chips };
  }

  function cashOut() {
    if (state.chips <= 0) return { ok: false, reason: 'no-chips' };
    const amount = state.chips;
    state.chips = 0;
    addCash(amount * CHIP_RATE);
    note(`Cashed out ${amount} chips for $${amount}.`);
    return { ok: true, amount };
  }

  function checkBet(bet) {
    if (!Number.isFinite(bet) || bet < MIN_BET) return 'bet-too-small';
    if (bet > MAX_BET) return 'bet-too-big';
    if (bet > state.chips) return 'not-enough-chips';
    return null;
  }

  function playSlots(bet) {
    const err = checkBet(bet);
    if (err) return { ok: false, reason: err };
    state.chips -= bet;
    state.spins += 1;
    state.jackpot += Math.floor(bet * 0.1);
    const reels = spinReels(rng);
    const result = slotPayout(reels, bet, state.jackpot);
    if (result.kind === 'jackpot') {
      state.chips += result.amount;
      state.jackpot = 2500;
      state.spinWins += 1;
      state.spinWon += result.amount;
      state.lifetimeWon += result.amount;
      state.biggestWin = Math.max(state.biggestWin, result.amount);
      note(`🎰 ${result.label} Won ${result.amount} chips!`);
      if (result.amount >= 1000) { state.heatNotices += 1; addHeat(5); }
    } else if (result.kind === 'win') {
      state.chips += result.amount;
      state.spinWins += 1;
      state.spinWon += result.amount;
      state.lifetimeWon += result.amount;
      state.biggestWin = Math.max(state.biggestWin, result.amount);
      note(`🎰 ${result.label} Won ${result.amount} chips.`);
    } else {
      state.spinLost += bet;
      state.lifetimeLost += bet;
      state.biggestLoss = Math.max(state.biggestLoss, bet);
      note(`🎰 ${result.label}`);
    }
    state.lastResult = { game: 'slots', reels: reels.map((r) => r.id), ...result, bet };
    return { ok: true, ...state.lastResult, chips: state.chips, jackpot: state.jackpot };
  }

  function startBlackjack(bet) {
    const err = checkBet(bet);
    if (err) return { ok: false, reason: err };
    if (state.hand) return { ok: false, reason: 'hand-in-progress' };
    state.chips -= bet;
    const deck = makeDeck(rng);
    const hand = {
      deck,
      player: [deck.pop(), deck.pop()],
      dealer: [deck.pop(), deck.pop()],
      bet,
      doubled: false,
      phase: 'player',
    };
    state.hand = hand;
    state.hands += 1;
    note(`🃏 Blackjack — bet ${bet} chips. Your hand: ${handLabel(hand.player)} (${handValue(hand.player).total}). Dealer shows ${hand.dealer[0].rank}${hand.dealer[0].suit}.`);
    if (isBlackjack(hand.player)) return settleBlackjack('blackjack');
    return { ok: true, player: hand.player, dealerUp: hand.dealer[0], value: handValue(hand.player).total };
  }

  function settleBlackjack(outcome) {
    const hand = state.hand;
    if (!hand) return { ok: false, reason: 'no-hand' };
    const pv = handValue(hand.player).total;
    const dv = handValue(hand.dealer).total;
    let result;
    if (outcome === 'blackjack') {
      const win = Math.floor(hand.bet * 2.5);
      state.chips += win;
      state.handsWon += 1;
      state.bjWon += win - hand.bet;
      state.lifetimeWon += win - hand.bet;
      state.biggestWin = Math.max(state.biggestWin, win - hand.bet);
      result = { outcome: 'blackjack', win: win - hand.bet, label: 'BLACKJACK! Pays 3:2.' };
    } else if (outcome === 'bust') {
      state.handsLost += 1;
      state.bjLost += hand.bet;
      state.lifetimeLost += hand.bet;
      state.biggestLoss = Math.max(state.biggestLoss, hand.bet);
      result = { outcome: 'bust', win: -hand.bet, label: `Bust at ${pv}. Dealer takes it.` };
    } else if (outcome === 'dealer-bust') {
      const win = hand.bet * 2;
      state.chips += win;
      state.handsWon += 1;
      state.bjWon += hand.bet;
      state.lifetimeWon += hand.bet;
      result = { outcome: 'dealer-bust', win: hand.bet, label: `Dealer busts at ${dv}. You win ${hand.bet}.` };
    } else if (pv > dv) {
      const win = hand.bet * 2;
      state.chips += win;
      state.handsWon += 1;
      state.bjWon += hand.bet;
      state.lifetimeWon += hand.bet;
      result = { outcome: 'win', win: hand.bet, label: `${pv} beats ${dv}. You win ${hand.bet}.` };
    } else if (pv < dv) {
      state.handsLost += 1;
      state.bjLost += hand.bet;
      state.lifetimeLost += hand.bet;
      result = { outcome: 'lose', win: -hand.bet, label: `${dv} beats ${pv}. You lose ${hand.bet}.` };
    } else {
      state.chips += hand.bet;
      state.handsPushed += 1;
      result = { outcome: 'push', win: 0, label: `Push at ${pv}. Bet returned.` };
    }
    state.hand = null;
    state.lastResult = { game: 'blackjack', ...result };
    note(`🃏 ${result.label}`);
    return { ok: true, ...result, chips: state.chips };
  }

  function hit() {
    const hand = state.hand;
    if (!hand || hand.phase !== 'player') return { ok: false, reason: 'no-hand' };
    hand.player.push(hand.deck.pop());
    const v = handValue(hand.player).total;
    note(`🃏 Hit: ${handLabel(hand.player)} (${v}).`);
    if (v > 21) return settleBlackjack('bust');
    return { ok: true, player: hand.player, value: v };
  }

  function stand() {
    const hand = state.hand;
    if (!hand || hand.phase !== 'player') return { ok: false, reason: 'no-hand' };
    hand.phase = 'dealer';
    while (handValue(hand.dealer).total < 17) hand.dealer.push(hand.deck.pop());
    const dv = handValue(hand.dealer).total;
    note(`🃏 Dealer: ${handLabel(hand.dealer)} (${dv}).`);
    if (dv > 21) return settleBlackjack('dealer-bust');
    return settleBlackjack('compare');
  }

  function doubleDown() {
    const hand = state.hand;
    if (!hand || hand.phase !== 'player') return { ok: false, reason: 'no-hand' };
    if (hand.player.length !== 2) return { ok: false, reason: 'too-late' };
    if (state.chips < hand.bet) return { ok: false, reason: 'not-enough-chips' };
    state.chips -= hand.bet;
    hand.bet *= 2;
    hand.doubled = true;
    hand.player.push(hand.deck.pop());
    const v = handValue(hand.player).total;
    note(`🃏 Double down — bet now ${hand.bet}. Hand: ${handLabel(hand.player)} (${v}).`);
    if (v > 21) return settleBlackjack('bust');
    return stand();
  }

  function stats() {
    return {
      chips: state.chips,
      jackpot: state.jackpot,
      spins: state.spins,
      spinWins: state.spinWins,
      hands: state.hands,
      handsWon: state.handsWon,
      handsLost: state.handsLost,
      handsPushed: state.handsPushed,
      net: state.lifetimeWon - state.lifetimeLost,
      biggestWin: state.biggestWin,
      biggestLoss: state.biggestLoss,
      heatNotices: state.heatNotices,
    };
  }

  function serialize() {
    const { hand, ...rest } = state;
    return JSON.parse(JSON.stringify(rest));
  }

  function deserialize(data) {
    if (!data || data.version !== CASINO_VERSION) return false;
    Object.assign(state, data);
    state.hand = null;
    return true;
  }

  function hudLine() {
    if (state.hand) return `CASINO: blackjack ${handValue(state.hand.player).total} vs ${state.hand.dealer[0].rank} — bet ${state.hand.bet}`;
    if (state.chips > 0) return `CASINO: ${state.chips} chips — jackpot ${state.jackpot}`;
    return '';
  }

  return {
    name: 'casino',
    version: CASINO_VERSION,
    state,
    buyChips,
    cashOut,
    playSlots,
    startBlackjack,
    hit,
    stand,
    doubleDown,
    stats,
    serialize,
    deserialize,
    hudLine,
  };
}

export default createCasinoSystem;
