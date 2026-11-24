export const CASINO_VERSION = 1;
export const CHIP_RATE = 1;
export const MAX_BET = 500;
export const MIN_BET = 5;

export const SLOT_SYMBOLS = [
  { id: 'cherry', label: '🍒', weight: 30, pay3: 5, pay2: 0 },
  { id: 'lemon', label: '🍋', weight: 24, pay3: 10, pay2: 0 },
  { id: 'bell', label: '🔔', weight: 16, pay3: 25, pay2: 2 },
  { id: 'seven', label: '7️⃣', weight: 10, pay3: 100, pay2: 5 },
  { id: 'diamond', label: '💎', weight: 6, pay3: 250, pay2: 10 },
  { id: 'crown', label: '👑', weight: 3, pay3: 1000, pay2: 25 },
];

export function spinReels(rng) {
  const roll = typeof rng === 'function' ? rng : Math.random;
  const total = SLOT_SYMBOLS.reduce((a, s) => a + s.weight, 0);
  const out = [];
  for (let i = 0; i < 3; i++) {
    let r = roll() * total;
    let picked = SLOT_SYMBOLS[0];
    for (const s of SLOT_SYMBOLS) {
      r -= s.weight;
      if (r <= 0) { picked = s; break; }
    }
    out.push(picked);
  }
  return out;
}

export function slotPayout(reels, bet, jackpot) {
  const [a, b, c] = reels;
  if (a.id === 'crown' && b.id === 'crown' && c.id === 'crown') {
    return { kind: 'jackpot', amount: jackpot, label: 'JACKPOT! Three crowns!' };
  }
  if (a.id === b.id && b.id === c.id) {
    return { kind: 'win', amount: bet * a.pay3, label: `Three ${a.id}s!` };
  }
  let pair = null;
  if (a.id === b.id) pair = a;
  else if (b.id === c.id) pair = b;
  else if (a.id === c.id) pair = a;
  if (pair && pair.pay2 > 0) {
    return { kind: 'win', amount: bet * pair.pay2, label: `Pair of ${pair.id}s!` };
  }
  return { kind: 'loss', amount: 0, label: 'No win this spin.' };
}

export function makeDeck(rng) {
  const roll = typeof rng === 'function' ? rng : Math.random;
  const suits = ['♠', '♥', '♦', '♣'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck = [];
  for (const suit of suits) {
    for (const rank of ranks) deck.push({ rank, suit, value: rank === 'A' ? 11 : (['J', 'Q', 'K'].includes(rank) ? 10 : Number(rank)) });
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(roll() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function handValue(hand) {
  let total = 0;
  let aces = 0;
  for (const card of hand) {
    total += card.value;
    if (card.rank === 'A') aces += 1;
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return { total, value: total, soft: aces > 0 };
}

export function isBlackjack(hand) {
  return hand.length === 2 && handValue(hand).total === 21;
}

export function handLabel(hand) {
  return hand.map((card) => `${card.rank}${card.suit}`).join(' ');
}

function clone(v) {
  return JSON.parse(JSON.stringify(v));
}

export function createCasinoSystem(ctx = {}) {
  const c = ctx || {};
  const roll = typeof c.rng === 'function' ? c.rng : () => Math.random();

  const state = {
    version: CASINO_VERSION,
    chips: 0,
    jackpot: 2500,
    spins: 0,
    spinWins: 0,
    hands: 0,
    handsWon: 0,
    handsLost: 0,
    handsPushed: 0,
    net: 0,
    biggestWin: 0,
    biggestLoss: 0,
    heatNotices: 0,
    hand: null,
    deck: [],
    bet: 0,
  };

  function say(msg) {
    if (typeof c.log === 'function') c.log(msg);
  }

  function cashNow() {
    if (typeof c.getCash === 'function') return c.getCash();
    if (typeof c.cash === 'number') return c.cash;
    return 0;
  }

  function moveCash(amount) {
    if (typeof c.addCash === 'function') c.addCash(amount);
    else if (typeof c.cash === 'number') c.cash += amount;
  }

  function settle(outcome) {
    const bet = state.bet;
    let payout = 0;
    let net = 0;
    if (outcome === 'blackjack') {
      payout = Math.round(bet * 2.5);
      net = payout - bet;
      state.handsWon += 1;
    } else if (outcome === 'dealer-bust' || outcome === 'win') {
      payout = bet * 2;
      net = bet;
      state.handsWon += 1;
    } else if (outcome === 'push') {
      payout = bet;
      net = 0;
      state.handsPushed += 1;
    } else {
      payout = 0;
      net = -bet;
      state.handsLost += 1;
    }
    state.chips += payout;
    state.net += net;
    if (net > 0 && net > state.biggestWin) state.biggestWin = net;
    if (net < 0 && -net > state.biggestLoss) state.biggestLoss = -net;
    const label = { blackjack: 'Blackjack!', 'dealer-bust': 'Dealer busts — you win!', win: 'You win!', push: 'Push.', loss: 'You lose.', bust: 'Bust — you lose.' }[outcome] || outcome;
    state.hand = null;
    state.bet = 0;
    say(label);
    return { ok: true, outcome, net, win: net, label, chips: state.chips };
  }

  const sys = {
    name: 'Casino',
    version: CASINO_VERSION,
    state,

    buyChips(amount) {
      const n = Math.floor(Number(amount));
      if (!Number.isFinite(n) || n <= 0) return { ok: false, reason: 'bad-amount' };
      if (cashNow() < n) return { ok: false, reason: 'no-cash', amount: n, cash: cashNow() };
      moveCash(-n);
      state.chips += n * CHIP_RATE;
      say(`Bought ${n} chips.`);
      return { ok: true, chips: state.chips, amount: n };
    },

    cashOut() {
      if (state.chips <= 0) return { ok: false, reason: 'no-chips' };
      const amount = state.chips * CHIP_RATE;
      state.chips = 0;
      moveCash(amount);
      say(`Cashed out $${amount}.`);
      return { ok: true, amount, cash: amount };
    },

    playSlots(bet) {
      const b = Math.floor(Number(bet));
      if (!Number.isFinite(b) || b < MIN_BET || b > MAX_BET) return { ok: false, reason: 'bad-bet', bet: b };
      if (state.chips < b) return { ok: false, reason: 'no-chips', bet: b, chips: state.chips };
      state.chips -= b;
      state.jackpot += Math.round(b * 0.1);
      state.spins += 1;
      const reels = spinReels(roll);
      const result = slotPayout(reels, b, state.jackpot);
      let won = 0;
      if (result.kind === 'jackpot') {
        won = result.amount;
        state.jackpot = 2500;
        state.spinWins += 1;
        if (won >= 1000) {
          state.heatNotices += 1;
          if (typeof c.addHeat === 'function') c.addHeat(5);
        }
      } else if (result.kind === 'win') {
        won = result.amount;
        state.spinWins += 1;
      }
      state.chips += won;
      state.net += won - b;
      if (won - b > state.biggestWin) state.biggestWin = won - b;
      if (b - won > state.biggestLoss) state.biggestLoss = b - won;
      say(`Slots: ${reels.map((r) => r.label).join(' ')} — ${result.label}`);
      return { ok: true, reels: reels.map((r) => r.id), symbols: reels.map((r) => r.id), kind: result.kind, amount: won, win: won, label: result.label, chips: state.chips, jackpot: state.jackpot };
    },

    startBlackjack(bet) {
      const b = Math.floor(Number(bet));
      if (!Number.isFinite(b) || b < MIN_BET || b > MAX_BET) return { ok: false, reason: 'bad-bet', bet: b };
      if (state.hand) return { ok: false, reason: 'hand-active' };
      if (state.chips < b) return { ok: false, reason: 'no-chips', bet: b, chips: state.chips };
      state.chips -= b;
      state.bet = b;
      state.deck = makeDeck(roll);
      const player = [state.deck.pop(), state.deck.pop()];
      const dealer = [state.deck.pop(), state.deck.pop()];
      state.hand = { player, dealer };
      state.hands += 1;
      say(`Blackjack: you hold ${handLabel(player)} vs dealer ${dealer[0].rank}${dealer[0].suit}.`);
      if (isBlackjack(player)) {
        return { ...settle('blackjack'), player: clone(player), dealerUp: dealer[0], value: 21, blackjack: true };
      }
      return { ok: true, player: clone(player), dealerUp: dealer[0], dealer: clone(dealer), value: handValue(player).total };
    },

    hit() {
      if (!state.hand) return { ok: false, reason: 'no-hand' };
      const card = state.deck.pop();
      state.hand.player.push(card);
      const val = handValue(state.hand.player).total;
      say(`Hit: ${handLabel(state.hand.player)} (${val}).`);
      if (val > 21) return { ...settle('bust'), player: clone(state.hand ? state.hand.player : []), value: val, bust: true };
      return { ok: true, player: clone(state.hand.player), value: val };
    },

    stand() {
      if (!state.hand) return { ok: false, reason: 'no-hand' };
      const dealer = state.hand.dealer;
      while (handValue(dealer).total < 17) dealer.push(state.deck.pop());
      const dv = handValue(dealer).total;
      const pv = handValue(state.hand.player).total;
      say(`Dealer holds ${handLabel(dealer)} (${dv}).`);
      if (dv > 21) return { ...settle('dealer-bust'), dealer: clone(dealer), dealerValue: dv, playerValue: pv };
      if (pv > dv) return { ...settle('win'), dealer: clone(dealer), dealerValue: dv, playerValue: pv };
      if (pv < dv) return { ...settle('loss'), dealer: clone(dealer), dealerValue: dv, playerValue: pv };
      return { ...settle('push'), dealer: clone(dealer), dealerValue: dv, playerValue: pv };
    },

    doubleDown() {
      if (!state.hand) return { ok: false, reason: 'no-hand' };
      if (state.hand.player.length !== 2) return { ok: false, reason: 'too-late' };
      if (state.chips < state.bet) return { ok: false, reason: 'no-chips', bet: state.bet };
      state.chips -= state.bet;
      state.bet *= 2;
      const card = state.deck.pop();
      state.hand.player.push(card);
      const val = handValue(state.hand.player).total;
      if (val > 21) return { ...settle('bust'), player: clone(state.hand ? state.hand.player : []), value: val, bust: true };
      return sys.stand();
    },

    stats() {
      return {
        chips: state.chips,
        jackpot: state.jackpot,
        spins: state.spins,
        spinWins: state.spinWins,
        hands: state.hands,
        handsWon: state.handsWon,
        handsLost: state.handsLost,
        handsPushed: state.handsPushed,
        net: state.net,
        biggestWin: state.biggestWin,
        biggestLoss: state.biggestLoss,
        heatNotices: state.heatNotices,
      };
    },

    serialize() {
      const copy = clone(state);
      copy.hand = null;
      copy.deck = [];
      return copy;
    },

    deserialize(input) {
      if (!input || typeof input !== 'object') return false;
      if (input.version !== CASINO_VERSION) return false;
      Object.keys(input).forEach((k) => { state[k] = clone(input[k]); });
      state.hand = null;
      state.deck = [];
      return true;
    },

    hudLine() {
      if (state.hand) {
        const pv = handValue(state.hand.player).total;
        const up = state.hand.dealer[0];
        return `Blackjack ${pv} vs ${up.rank} · Bet ${state.bet} chips`;
      }
      if (state.chips > 0) return `Casino: ${state.chips} chips · Jackpot $${state.jackpot}`;
      return '';
    },
  };

  return sys;
}

export default createCasinoSystem;
