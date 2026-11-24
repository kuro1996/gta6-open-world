// casinoroyale.js — The Royale Casino: slots, blackjack, roulette.
// A self-contained casino floor. Chips are bought with cash and cashed back
// out; the house edge is real but beatable in short bursts, and VIP tiers
// unlock higher tables. Pure logic: no rendering, no DOM, no imports.
// Factory: createCasinoRoyaleSystem(deps) with deps { rng, getHour, getDay,
// getCash, addCash, addHeat, log }.

// ---------------------------------------------------------------------------
// Data tables
// ---------------------------------------------------------------------------

// Chip denominations the cage sells. Each entry: value per chip, pack size,
// pack price (a small bulk discount on the big packs).
export const CHIP_PACKS = [
  { id: 'starter', name: 'Starter Stack', chips: 100, price: 100 },
  { id: 'regular', name: 'Regular Stack', chips: 500, price: 480 },
  { id: 'high', name: 'High Roller Stack', chips: 2500, price: 2300 },
  { id: 'whale', name: 'Whale Stack', chips: 10000, price: 9000 },
];

// Slot symbols: weight controls how often a symbol lands, pay3/pay5 are the
// multipliers for three / five of a kind on a payline.
export const SLOT_SYMBOLS = [
  { id: 'cherry', label: 'Cherry', weight: 30, pay3: 5, pay5: 50 },
  { id: 'lemon', label: 'Lemon', weight: 24, pay3: 8, pay5: 80 },
  { id: 'bell', label: 'Bell', weight: 18, pay3: 12, pay5: 120 },
  { id: 'bar', label: 'BAR', weight: 12, pay3: 20, pay5: 200 },
  { id: 'seven', label: 'Lucky 7', weight: 8, pay3: 50, pay5: 500 },
  { id: 'diamond', label: 'Diamond', weight: 5, pay3: 100, pay5: 1000 },
  { id: 'wild', label: 'Wild Star', weight: 3, pay3: 150, pay5: 1500 },
];

// Slot machines on the floor. Bigger bet ranges, bigger jackpots.
export const SLOT_MACHINES = [
  { id: 'penny', name: 'Penny Paradise', minBet: 1, maxBet: 25, reels: 3, jackpot: 5000, rtp: 0.94 },
  { id: 'neon', name: 'Neon Nights', minBet: 5, maxBet: 100, reels: 5, jackpot: 25000, rtp: 0.95 },
  { id: 'royale', name: 'Royale Deluxe', minBet: 25, maxBet: 500, reels: 5, jackpot: 100000, rtp: 0.96 },
  { id: 'vault', name: 'Vault Breaker', minBet: 100, maxBet: 2000, reels: 5, jackpot: 500000, rtp: 0.97 },
];

// Roulette numbers in wheel order with their colour. 0 and 00 are green.
export const ROULETTE_WHEEL = [
  { n: 0, color: 'green' }, { n: 28, color: 'black' }, { n: 9, color: 'red' },
  { n: 26, color: 'black' }, { n: 30, color: 'red' }, { n: 11, color: 'black' },
  { n: 7, color: 'red' }, { n: 20, color: 'black' }, { n: 32, color: 'red' },
  { n: 17, color: 'black' }, { n: 5, color: 'red' }, { n: 22, color: 'black' },
  { n: 34, color: 'red' }, { n: 15, color: 'black' }, { n: 3, color: 'red' },
  { n: 24, color: 'black' }, { n: 36, color: 'red' }, { n: 13, color: 'black' },
  { n: 1, color: 'red' }, { n: 0, color: 'green', double: true }, { n: 27, color: 'black' },
  { n: 10, color: 'red' }, { n: 25, color: 'black' }, { n: 29, color: 'red' },
  { n: 12, color: 'black' }, { n: 8, color: 'red' }, { n: 19, color: 'black' },
  { n: 31, color: 'red' }, { n: 18, color: 'black' }, { n: 6, color: 'red' },
  { n: 21, color: 'black' }, { n: 33, color: 'red' }, { n: 16, color: 'black' },
  { n: 4, color: 'red' }, { n: 23, color: 'black' }, { n: 35, color: 'red' },
  { n: 14, color: 'black' }, { n: 2, color: 'red' },
];

// Roulette bet types: payout multiplier (profit) and a matcher.
export const ROULETTE_BETS = [
  { id: 'straight', name: 'Straight Up (one number)', pays: 35 },
  { id: 'red', name: 'Red', pays: 1 },
  { id: 'black', name: 'Black', pays: 1 },
  { id: 'even', name: 'Even', pays: 1 },
  { id: 'odd', name: 'Odd', pays: 1 },
  { id: 'low', name: 'Low 1-18', pays: 1 },
  { id: 'high', name: 'High 19-36', pays: 1 },
  { id: 'dozen1', name: 'Dozen 1-12', pays: 2 },
  { id: 'dozen2', name: 'Dozen 13-24', pays: 2 },
  { id: 'dozen3', name: 'Dozen 25-36', pays: 2 },
  { id: 'column1', name: 'Column 1', pays: 2 },
  { id: 'column2', name: 'Column 2', pays: 2 },
  { id: 'column3', name: 'Column 3', pays: 2 },
];

// Blackjack tables: higher minimums, better rules for the player.
export const BLACKJACK_TABLES = [
  { id: 'classic', name: 'Classic 21', minBet: 10, maxBet: 500, blackjackPays: 1.5, dealerStandsOn: 17, decks: 6 },
  { id: 'vip', name: 'VIP 21', minBet: 100, maxBet: 5000, blackjackPays: 1.5, dealerStandsOn: 17, decks: 4 },
  { id: 'highlimit', name: 'High Limit 21', minBet: 500, maxBet: 25000, blackjackPays: 1.5, dealerStandsOn: 17, decks: 2 },
];

// VIP tiers: earned by lifetime chips wagered. Each tier unlocks tables and
// a daily comp (free chips) plus a cashback rate on losses.
export const VIP_TIERS = [
  { id: 'bronze', name: 'Bronze', wagerNeeded: 0, dailyComp: 25, cashback: 0.00, tables: ['penny', 'neon', 'classic'] },
  { id: 'silver', name: 'Silver', wagerNeeded: 5000, dailyComp: 100, cashback: 0.02, tables: ['penny', 'neon', 'royale', 'classic', 'vip'] },
  { id: 'gold', name: 'Gold', wagerNeeded: 25000, dailyComp: 400, cashback: 0.05, tables: ['penny', 'neon', 'royale', 'vault', 'classic', 'vip', 'highlimit'] },
  { id: 'platinum', name: 'Platinum', wagerNeeded: 100000, dailyComp: 1500, cashback: 0.08, tables: ['penny', 'neon', 'royale', 'vault', 'classic', 'vip', 'highlimit'] },
  { id: 'diamond', name: 'Diamond', wagerNeeded: 500000, dailyComp: 5000, cashback: 0.12, tables: ['penny', 'neon', 'royale', 'vault', 'classic', 'vip', 'highlimit'] },
];

// Casino missions: one-off challenges with a cash/chip reward.
export const CASINO_MISSIONS = [
  { id: 'first-spin', name: 'First Spin', desc: 'Spin any slot machine once.', rewardChips: 50, rewardCash: 0 },
  { id: 'slot-jackpot', name: 'Jackpot Hunter', desc: 'Hit any slot jackpot (5 of a kind on Royale or better).', rewardChips: 1000, rewardCash: 0 },
  { id: 'bj-win5', name: 'Card Shark', desc: 'Win 5 blackjack hands.', rewardChips: 500, rewardCash: 250 },
  { id: 'bj-blackjack', name: 'Natural 21', desc: 'Get a blackjack (Ace + 10).', rewardChips: 300, rewardCash: 150 },
  { id: 'roulette-straight', name: 'Lucky Number', desc: 'Win a straight-up roulette bet.', rewardChips: 800, rewardCash: 0 },
  { id: 'wager-10k', name: 'High Roller', desc: 'Wager 10,000 chips in total.', rewardChips: 2000, rewardCash: 1000 },
  { id: 'profit-5k', name: 'In The Green', desc: 'End a session 5,000 chips ahead of where you started.', rewardChips: 0, rewardCash: 2500 },
  { id: 'vip-gold', name: 'Gold Member', desc: 'Reach Gold VIP tier.', rewardChips: 5000, rewardCash: 0 },
  { id: 'slots-100', name: 'Slot Machine Regular', desc: 'Spin the slots 100 times.', rewardChips: 750, rewardCash: 0 },
  { id: 'roulette-dozen', name: 'Dozen Doubler', desc: 'Win 3 dozen bets in a row.', rewardChips: 400, rewardCash: 200 },
];

// Comp rewards the player can buy with comp points earned while wagering.
export const COMP_REWARDS = [
  { id: 'drink', name: 'Free Drink', cost: 20, chips: 0, desc: 'A drink on the house. +10 luck for the next spin.' },
  { id: 'snack', name: 'Buffet Pass', cost: 50, chips: 100, desc: 'Buffet pass plus 100 chips.' },
  { id: 'room', name: 'Suite Night', cost: 200, chips: 500, desc: 'A night in the Royale suite plus 500 chips.' },
  { id: 'limo', name: 'Limo Ride', cost: 400, chips: 1000, desc: 'Limo pickup plus 1,000 chips.' },
  { id: 'show', name: 'Show Tickets', cost: 150, chips: 300, desc: 'Two show tickets plus 300 chips.' },
];

// A standard deck: ranks with blackjack values (ace handled separately).
export const CARD_RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
export const CARD_SUITS = ['spades', 'hearts', 'diamonds', 'clubs'];
export const CARD_VALUES = { A: 11, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, J: 10, Q: 10, K: 10 };

// Basic-strategy hints shown to the player (flavour + a real nudge).
export const BJ_HINTS = {
  hard: [
    { hand: '8 or less', action: 'Always hit.' },
    { hand: '9', action: 'Double vs dealer 3-6, else hit.' },
    { hand: '10', action: 'Double vs dealer 2-9, else hit.' },
    { hand: '11', action: 'Always double, else hit.' },
    { hand: '12', action: 'Stand vs dealer 4-6, else hit.' },
    { hand: '13-16', action: 'Stand vs dealer 2-6, else hit.' },
    { hand: '17+', action: 'Always stand.' },
  ],
  soft: [
    { hand: 'A,2 - A,5', action: 'Double vs dealer 4-6, else hit.' },
    { hand: 'A,6', action: 'Double vs dealer 3-6, else hit.' },
    { hand: 'A,7', action: 'Stand vs dealer 2, 7, 8. Double vs 3-6. Hit vs 9-A.' },
    { hand: 'A,8+', action: 'Always stand.' },
  ],
};

// ---------------------------------------------------------------------------
// Small helpers (pure)
// ---------------------------------------------------------------------------

function clampNum(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

function pickWeighted(rng, items) {
  let total = 0;
  for (const it of items) total += it.weight;
  let roll = rng() * total;
  for (const it of items) {
    roll -= it.weight;
    if (roll <= 0) return it;
  }
  return items[items.length - 1];
}

function shuffleDeck(rng, decks) {
  const cards = [];
  for (let d = 0; d < decks; d++) {
    for (const s of CARD_SUITS) {
      for (const r of CARD_RANKS) cards.push({ rank: r, suit: s });
    }
  }
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const t = cards[i]; cards[i] = cards[j]; cards[j] = t;
  }
  return cards;
}

export function handValue(cards) {
  let total = 0;
  let aces = 0;
  for (const c of cards) {
    total += CARD_VALUES[c.rank];
    if (c.rank === 'A') aces++;
  }
  while (total > 21 && aces > 0) { total -= 10; aces--; }
  const soft = aces > 0 && total <= 21;
  return { total, soft, bust: total > 21, blackjack: cards.length === 2 && total === 21 };
}

export function rouletteColor(n, isDoubleZero) {
  if (n === 0) return isDoubleZero ? 'green (00)' : 'green';
  const reds = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
  return reds.has(n) ? 'red' : 'black';
}

export function rouletteBetWins(bet, result) {
  const n = result.n;
  const isZero = n === 0 || result.double === true;
  switch (bet.type) {
    case 'straight': return bet.number === n && !result.double ? true : (bet.number === 0 && result.double ? false : bet.number === n);
    case 'red': return !isZero && rouletteColor(n) === 'red';
    case 'black': return !isZero && rouletteColor(n) === 'black';
    case 'even': return !isZero && n % 2 === 0;
    case 'odd': return !isZero && n % 2 === 1;
    case 'low': return n >= 1 && n <= 18;
    case 'high': return n >= 19 && n <= 36;
    case 'dozen1': return n >= 1 && n <= 12;
    case 'dozen2': return n >= 13 && n <= 24;
    case 'dozen3': return n >= 25 && n <= 36;
    case 'column1': return !isZero && n % 3 === 1;
    case 'column2': return !isZero && n % 3 === 2;
    case 'column3': return !isZero && n % 3 === 0;
    default: return false;
  }
}

export function slotPaylineWin(symbols, bet) {
  // symbols: array of symbol ids on one line. Wild substitutes for anything.
  // Returns { win, kind } where win is a multiplier of the bet.
  const counts = {};
  for (const s of symbols) counts[s] = (counts[s] || 0) + 1;
  const wilds = counts.wild || 0;
  let best = { win: 0, kind: 'none' };
  for (const sym of SLOT_SYMBOLS) {
    if (sym.id === 'wild') continue;
    const n = (counts[sym.id] || 0) + wilds;
    if (symbols.length === 3) {
      if (n === 3) {
        const w = sym.pay3;
        if (w > best.win) best = { win: w, kind: `${sym.label} x3` };
      }
    } else {
      if (n === 5) {
        const w = sym.pay5;
        if (w > best.win) best = { win: w, kind: `${sym.label} x5` };
      } else if (n === 4) {
        const w = Math.floor(sym.pay5 / 5);
        if (w > best.win) best = { win: w, kind: `${sym.label} x4` };
      } else if (n === 3) {
        const w = sym.pay3;
        if (w > best.win) best = { win: w, kind: `${sym.label} x3` };
      }
    }
  }
  if (wilds === symbols.length) {
    const w = symbols.length === 3 ? 150 : 1500;
    if (w > best.win) best = { win: w, kind: `Wild x${symbols.length}` };
  }
  return { win: best.win * bet, kind: best.kind };
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createCasinoRoyaleSystem(deps) {
  const d = deps || {};
  const rng = d.rng || Math.random;
  const getHour = d.getHour || (() => 12);
  const getDay = d.getDay || (() => 1);
  const getCash = d.getCash || (() => 0);
  const addCash = d.addCash || (() => {});
  const addHeat = d.addHeat || (() => {});
  const log = d.log || (() => {});

  const state = {
    chips: 0,
    lifetimeWagered: 0,
    lifetimeWon: 0,
    lifetimeLost: 0,
    sessionStartChips: 0,
    sessionSpins: 0,
    sessionBjHands: 0,
    sessionRouletteSpins: 0,
    compPoints: 0,
    vipTier: 'bronze',
    lastCompDay: 0,
    luckBoost: 0,
    luckBoostSpins: 0,
    slotsSpun: 0,
    slotsWon: 0,
    biggestSlotWin: 0,
    jackpots: 0,
    bjHandsWon: 0,
    bjHandsPlayed: 0,
    bjBlackjacks: 0,
    rouletteWins: 0,
    rouletteSpins: 0,
    rouletteDozenStreak: 0,
    missionsDone: {},
    missionProgress: {},
    activeSlot: null,
    activeBlackjack: null,
    activeRoulette: null,
    recentResults: [],
    dailyWagered: 0,
    dailyDay: 1,
    cashbackOwed: 0,
    banned: false,
    cheatSuspicion: 0,
  };

  function vip() {
    return VIP_TIERS.find((t) => t.id === state.vipTier) || VIP_TIERS[0];
  }

  function refreshVip() {
    let best = VIP_TIERS[0];
    for (const t of VIP_TIERS) {
      if (state.lifetimeWagered >= t.wagerNeeded) best = t;
    }
    if (best.id !== state.vipTier) {
      const old = state.vipTier;
      state.vipTier = best.id;
      log(`VIP upgrade: ${old} -> ${best.name}. Daily comp ${best.dailyComp} chips.`);
      checkMission('vip-gold');
    }
  }

  function addResult(text) {
    state.recentResults.unshift(text);
    if (state.recentResults.length > 12) state.recentResults.pop();
  }

  function recordWager(amount) {
    state.lifetimeWagered += amount;
    state.dailyWagered += amount;
    state.compPoints += Math.floor(amount / 10);
    refreshVip();
    checkMission('wager-10k');
  }

  function recordWin(amount) {
    state.lifetimeWon += amount;
    const net = state.chips - state.sessionStartChips;
    if (net >= 5000) checkMission('profit-5k');
  }

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const m = CASINO_MISSIONS.find((x) => x.id === id);
    if (!m) return;
    let done = false;
    switch (id) {
      case 'first-spin': done = state.slotsSpun >= 1; break;
      case 'slot-jackpot': done = state.jackpots >= 1; break;
      case 'bj-win5': done = state.bjHandsWon >= 5; break;
      case 'bj-blackjack': done = state.bjBlackjacks >= 1; break;
      case 'roulette-straight': done = (state.missionProgress.rouletteStraight || 0) >= 1; break;
      case 'wager-10k': done = state.lifetimeWagered >= 10000; break;
      case 'profit-5k': done = (state.chips - state.sessionStartChips) >= 5000; break;
      case 'vip-gold': done = ['gold', 'platinum', 'diamond'].includes(state.vipTier); break;
      case 'slots-100': done = state.slotsSpun >= 100; break;
      case 'roulette-dozen': done = state.rouletteDozenStreak >= 3; break;
      default: done = false;
    }
    if (!done) return;
    state.missionsDone[id] = true;
    if (m.rewardChips) state.chips += m.rewardChips;
    if (m.rewardCash) addCash(m.rewardCash);
    log(`Casino mission complete: ${m.name} (+${m.rewardChips} chips, +$${m.rewardCash}).`);
  }

  function buyChips(packId) {
    const pack = CHIP_PACKS.find((p) => p.id === packId);
    if (!pack) return { ok: false, error: 'unknown pack' };
    if (getCash() < pack.price) return { ok: false, error: 'not enough cash' };
    addCash(-pack.price);
    state.chips += pack.chips;
    if (state.sessionStartChips === 0) state.sessionStartChips = state.chips;
    log(`Bought ${pack.chips} chips for $${pack.price}. Balance: ${state.chips} chips.`);
    return { ok: true, chips: state.chips, pack };
  }

  function cashOut(amount) {
    const n = amount === 'all' ? state.chips : Math.floor(amount);
    if (!n || n <= 0) return { ok: false, error: 'nothing to cash out' };
    if (n > state.chips) return { ok: false, error: 'not enough chips' };
    state.chips -= n;
    addCash(n);
    log(`Cashed out ${n} chips for $${n}.`);
    return { ok: true, chips: state.chips, cashed: n };
  }

  function claimDailyComp() {
    const day = getDay();
    if (state.lastCompDay === day) return { ok: false, error: 'already claimed today' };
    state.lastCompDay = day;
    const amount = vip().dailyComp;
    state.chips += amount;
    log(`Daily VIP comp: +${amount} chips (${vip().name}).`);
    return { ok: true, chips: state.chips, amount };
  }

  function redeemComp(rewardId) {
    const r = COMP_REWARDS.find((x) => x.id === rewardId);
    if (!r) return { ok: false, error: 'unknown reward' };
    if (state.compPoints < r.cost) return { ok: false, error: 'not enough comp points' };
    state.compPoints -= r.cost;
    state.chips += r.chips;
    if (rewardId === 'drink') { state.luckBoost = 0.05; state.luckBoostSpins = 3; }
    log(`Redeemed comp: ${r.name} (-${r.cost} pts).`);
    return { ok: true, reward: r, chips: state.chips, compPoints: state.compPoints };
  }

  // --- Slots ---------------------------------------------------------------
  function spinSlots(machineId, bet) {
    const machine = SLOT_MACHINES.find((m) => m.id === machineId);
    if (!machine) return { ok: false, error: 'unknown machine' };
    if (!vip().tables.includes(machineId)) return { ok: false, error: `needs ${machineId} VIP access` };
    const b = clampNum(Math.floor(bet) || machine.minBet, machine.minBet, machine.maxBet);
    if (state.chips < b) return { ok: false, error: 'not enough chips' };
    state.chips -= b;
    recordWager(b);
    state.slotsSpun++;
    state.sessionSpins++;
    const reels = [];
    for (let i = 0; i < machine.reels; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) row.push(pickWeighted(rng, SLOT_SYMBOLS).id);
      reels.push(row);
    }
    // Middle row is the payline; on 5-reel machines all three rows pay.
    const lines = [reels.map((r) => r[1])];
    if (machine.reels === 5) {
      lines.push(reels.map((r) => r[0]));
      lines.push(reels.map((r) => r[2]));
    }
    let totalWin = 0;
    const lineResults = [];
    for (const line of lines) {
      const res = slotPaylineWin(line, b);
      lineResults.push({ symbols: line, win: res.win, kind: res.kind });
      totalWin += res.win;
    }
    // Jackpot: five diamonds on the middle line of a 5-reel machine.
    const mid = lines[0];
    const isJackpot = machine.reels === 5 && mid.every((s) => s === 'diamond');
    if (isJackpot) {
      totalWin += machine.jackpot;
      state.jackpots++;
      log(`JACKPOT! ${machine.name} pays ${machine.jackpot} chips!`);
    }
    // Luck boost from a comp drink nudges one reel toward a win.
    if (state.luckBoostSpins > 0 && totalWin === 0 && rng() < state.luckBoost) {
      const bonus = b * 2;
      totalWin += bonus;
      lineResults.push({ symbols: ['wild', 'wild', 'wild'], win: bonus, kind: 'Lucky drink bonus' });
    }
    if (state.luckBoostSpins > 0) state.luckBoostSpins--;
    if (totalWin > 0) {
      state.chips += totalWin;
      state.slotsWon += totalWin;
      state.biggestSlotWin = Math.max(state.biggestSlotWin, totalWin);
      recordWin(totalWin);
    } else {
      state.lifetimeLost += b;
    }
    const summary = lineResults.map((l) => `${l.symbols.join('-')} ${l.kind} +${l.win}`).join(' | ');
    addResult(`Slots ${machine.name} bet ${b}: ${summary}`);
    checkMission('first-spin');
    checkMission('slot-jackpot');
    checkMission('slots-100');
    state.activeSlot = { machineId, bet: b, reels, lineResults, totalWin, jackpot: isJackpot };
    return { ok: true, machine, bet: b, reels, lineResults, totalWin, jackpot: isJackpot, chips: state.chips };
  }

  // --- Blackjack -----------------------------------------------------------
  function startBlackjack(tableId, bet) {
    const table = BLACKJACK_TABLES.find((t) => t.id === tableId);
    if (!table) return { ok: false, error: 'unknown table' };
    if (!vip().tables.includes(tableId)) return { ok: false, error: 'VIP access required' };
    if (state.activeBlackjack) return { ok: false, error: 'hand already in progress' };
    const b = clampNum(Math.floor(bet) || table.minBet, table.minBet, table.maxBet);
    if (state.chips < b) return { ok: false, error: 'not enough chips' };
    state.chips -= b;
    recordWager(b);
    const shoe = shuffleDeck(rng, table.decks);
    const player = [shoe.pop(), shoe.pop()];
    const dealer = [shoe.pop(), shoe.pop()];
    const pv = handValue(player);
    const dv = handValue(dealer);
    state.activeBlackjack = { tableId, bet: b, shoe, player, dealer, doubled: false, over: false, result: null, canSplit: player[0].rank === player[1].rank };
    if (pv.blackjack) {
      const payout = Math.floor(b * (1 + table.blackjackPays));
      state.chips += b + payout;
      state.bjBlackjacks++;
      state.bjHandsWon++;
      state.bjHandsPlayed++;
      recordWin(payout);
      state.activeBlackjack.over = true;
      state.activeBlackjack.result = 'blackjack';
      log(`Blackjack! Pays ${payout} chips.`);
      checkMission('bj-blackjack');
      checkMission('bj-win5');
      return { ok: true, hand: state.activeBlackjack, payout, chips: state.chips };
    }
    log(`Blackjack ${table.name}: you ${pv.total} vs dealer ${dealer[0].rank} showing.`);
    return { ok: true, hand: state.activeBlackjack, chips: state.chips };
  }

  function blackjackHit() {
    const h = state.activeBlackjack;
    if (!h || h.over) return { ok: false, error: 'no active hand' };
    h.player.push(h.shoe.pop());
    const v = handValue(h.player);
    if (v.bust) return finishBlackjack('bust');
    return { ok: true, hand: h, value: v.total };
  }

  function blackjackStand() {
    const h = state.activeBlackjack;
    if (!h || h.over) return { ok: false, error: 'no active hand' };
    return finishBlackjack('stand');
  }

  function blackjackDouble() {
    const h = state.activeBlackjack;
    if (!h || h.over) return { ok: false, error: 'no active hand' };
    if (h.player.length !== 2) return { ok: false, error: 'can only double on first two cards' };
    if (state.chips < h.bet) return { ok: false, error: 'not enough chips to double' };
    state.chips -= h.bet;
    recordWager(h.bet);
    h.bet *= 2;
    h.doubled = true;
    h.player.push(h.shoe.pop());
    const v = handValue(h.player);
    if (v.bust) return finishBlackjack('bust');
    return finishBlackjack('stand');
  }

  function finishBlackjack(how) {
    const h = state.activeBlackjack;
    const table = BLACKJACK_TABLES.find((t) => t.id === h.tableId);
    const pv = handValue(h.player);
    if (how === 'bust') {
      h.over = true;
      h.result = 'bust';
      state.bjHandsPlayed++;
      state.lifetimeLost += h.bet;
      log(`Bust at ${pv.total}. Lost ${h.bet} chips.`);
      state.activeBlackjack = null;
      return { ok: true, result: 'bust', playerTotal: pv.total, chips: state.chips };
    }
    let dv = handValue(h.dealer);
    while (dv.total < table.dealerStandsOn || (dv.total === 17 && dv.soft && table.dealerStandsOn === 17 && false)) {
      h.dealer.push(h.shoe.pop());
      dv = handValue(h.dealer);
    }
    // Dealer stands on all 17s (including soft 17) at these tables.
    while (dv.total < 17) {
      h.dealer.push(h.shoe.pop());
      dv = handValue(h.dealer);
    }
    h.over = true;
    state.bjHandsPlayed++;
    let result;
    let payout = 0;
    if (dv.bust) { result = 'dealer-bust'; payout = h.bet * 2; }
    else if (pv.total > dv.total) { result = 'win'; payout = h.bet * 2; }
    else if (pv.total < dv.total) { result = 'lose'; payout = 0; }
    else { result = 'push'; payout = h.bet; }
    h.result = result;
    if (payout > 0) {
      state.chips += payout;
      if (result !== 'push') { state.bjHandsWon++; recordWin(payout - h.bet); }
    } else {
      state.lifetimeLost += h.bet;
    }
    log(`Blackjack: you ${pv.total} vs dealer ${dv.total} — ${result}. ${payout ? `+${payout} chips.` : `Lost ${h.bet}.`}`);
    checkMission('bj-win5');
    state.activeBlackjack = null;
    return { ok: true, result, playerTotal: pv.total, dealerTotal: dv.total, payout, chips: state.chips };
  }

  function blackjackHint() {
    const h = state.activeBlackjack;
    if (!h) return { ok: false, error: 'no active hand' };
    const v = handValue(h.player);
    const dealerUp = CARD_VALUES[h.dealer[0].rank];
    let hint = 'Hit.';
    if (v.blackjack) hint = 'Blackjack! Collect.';
    else if (v.soft) {
      if (v.total >= 19) hint = 'Stand on soft 19+.';
      else if (v.total === 18) hint = dealerUp >= 3 && dealerUp <= 6 ? 'Double vs dealer 3-6.' : dealerUp >= 9 ? 'Hit vs dealer 9+.' : 'Stand.';
      else hint = 'Hit or double vs dealer 4-6.';
    } else if (v.total >= 17) hint = 'Stand.';
    else if (v.total === 11) hint = 'Double if you can, else hit.';
    else if (v.total === 10) hint = dealerUp <= 9 ? 'Double vs dealer 2-9.' : 'Hit.';
    else if (v.total === 12) hint = dealerUp >= 4 && dealerUp <= 6 ? 'Stand vs dealer 4-6.' : 'Hit.';
    else if (v.total >= 13 && v.total <= 16) hint = dealerUp >= 2 && dealerUp <= 6 ? 'Stand vs dealer 2-6.' : 'Hit.';
    return { ok: true, playerTotal: v.total, soft: v.soft, dealerUp: h.dealer[0].rank, hint };
  }

  // --- Roulette ------------------------------------------------------------
  function placeRouletteBet(betType, amount, number) {
    const def = ROULETTE_BETS.find((b) => b.id === betType);
    if (!def) return { ok: false, error: 'unknown bet type' };
    const amt = Math.floor(amount);
    if (!amt || amt <= 0) return { ok: false, error: 'bet must be positive' };
    if (amt > state.chips) return { ok: false, error: 'not enough chips' };
    if (betType === 'straight') {
      if (typeof number !== 'number' || number < 0 || number > 36) return { ok: false, error: 'straight bet needs a number 0-36' };
    }
    if (!state.activeRoulette) state.activeRoulette = { bets: [], spins: 0 };
    state.activeRoulette.bets.push({ type: betType, amount: amt, number });
    state.chips -= amt;
    recordWager(amt);
    return { ok: true, bets: state.activeRoulette.bets, chips: state.chips };
  }

  function spinRoulette() {
    if (!state.activeRoulette || state.activeRoulette.bets.length === 0) {
      return { ok: false, error: 'place a bet first' };
    }
    const slot = ROULETTE_WHEEL[Math.floor(rng() * ROULETTE_WHEEL.length)];
    const result = { n: slot.n, double: !!slot.double, color: slot.double ? 'green (00)' : slot.color };
    let totalReturn = 0;
    let totalBet = 0;
    const outcomes = [];
    let dozenWin = false;
    for (const bet of state.activeRoulette.bets) {
      totalBet += bet.amount;
      const def = ROULETTE_BETS.find((b) => b.id === bet.type);
      const won = rouletteBetWins(bet, result);
      const ret = won ? bet.amount * (def.pays + 1) : 0;
      totalReturn += ret;
      outcomes.push({ bet, won, returned: ret });
      if (won && bet.type === 'straight') {
        state.missionProgress.rouletteStraight = (state.missionProgress.rouletteStraight || 0) + 1;
        checkMission('roulette-straight');
      }
      if (won && bet.type.startsWith('dozen')) dozenWin = true;
    }
    state.rouletteDozenStreak = dozenWin ? state.rouletteDozenStreak + 1 : 0;
    state.rouletteSpins++;
    state.sessionRouletteSpins++;
    if (totalReturn > 0) {
      state.chips += totalReturn;
      state.rouletteWins++;
      recordWin(totalReturn - totalBet);
    } else {
      state.lifetimeLost += totalBet;
    }
    addResult(`Roulette ${result.n}${result.double ? ' (00)' : ''} ${result.color}: bet ${totalBet}, returned ${totalReturn}.`);
    log(`Roulette: ${result.n} ${result.color}. Returned ${totalReturn} chips on ${totalBet} bet.`);
    checkMission('roulette-dozen');
    state.activeRoulette = null;
    return { ok: true, result, outcomes, totalBet, totalReturn, chips: state.chips };
  }

  function clearRouletteBets() {
    if (!state.activeRoulette) return { ok: false, error: 'no bets placed' };
    let refund = 0;
    for (const b of state.activeRoulette.bets) refund += b.amount;
    state.chips += refund;
    state.activeRoulette = null;
    return { ok: true, refunded: refund, chips: state.chips };
  }

  // --- Missions, events, daily loop ----------------------------------------
  function missions() {
    return CASINO_MISSIONS.map((m) => ({
      ...m,
      done: !!state.missionsDone[m.id],
    }));
  }

  function applyCashback() {
    const tier = vip();
    if (tier.cashback <= 0 || state.lifetimeLost <= 0) return { ok: false, error: 'no cashback available' };
    const owed = Math.floor(state.lifetimeLost * tier.cashback) - state.cashbackOwed;
    if (owed <= 0) return { ok: false, error: 'cashback already collected' };
    state.cashbackOwed += owed;
    state.chips += owed;
    log(`VIP cashback: +${owed} chips (${Math.round(tier.cashback * 100)}% of losses).`);
    return { ok: true, amount: owed, chips: state.chips };
  }

  function tick(dt) {
    // Daily rollover: reset the daily wager counter and the session marker.
    const day = getDay();
    if (day !== state.dailyDay) {
      state.dailyDay = day;
      state.dailyWagered = 0;
      state.sessionStartChips = state.chips;
    }
    // The casino is busiest at night: a small free-chip drop for players
    // who hang around after 22:00, once per hour of play.
    const hour = getHour();
    if (hour >= 22 || hour < 2) {
      state._nightTimer = (state._nightTimer || 0) + dt;
      if (state._nightTimer > 3600) {
        state._nightTimer = 0;
        const drop = 10 + Math.floor(rng() * 20);
        state.chips += drop;
        addResult(`Night owl drop: +${drop} chips.`);
      }
    }
    // Heat: winning huge sums too fast draws security attention.
    if (state.biggestSlotWin >= 100000 && state.cheatSuspicion < 3) {
      state.cheatSuspicion++;
      addHeat(1);
      log('Casino security is watching you after that big win.');
    }
  }

  function hudLine() {
    if (state.chips <= 0 && state.lifetimeWagered === 0) return '';
    return `Casino ${vip().name} | ${state.chips} chips | wagered ${state.lifetimeWagered}`;
  }

  function summary() {
    return {
      chips: state.chips,
      vipTier: state.vipTier,
      lifetimeWagered: state.lifetimeWagered,
      lifetimeWon: state.lifetimeWon,
      lifetimeLost: state.lifetimeLost,
      compPoints: state.compPoints,
      slotsSpun: state.slotsSpun,
      jackpots: state.jackpots,
      biggestSlotWin: state.biggestSlotWin,
      bjHandsWon: state.bjHandsWon,
      bjHandsPlayed: state.bjHandsPlayed,
      rouletteWins: state.rouletteWins,
      rouletteSpins: state.rouletteSpins,
      missionsDone: Object.keys(state.missionsDone).length,
      recentResults: [...state.recentResults],
    };
  }

  function serialize() {
    return {
      chips: state.chips,
      lifetimeWagered: state.lifetimeWagered,
      lifetimeWon: state.lifetimeWon,
      lifetimeLost: state.lifetimeLost,
      compPoints: state.compPoints,
      vipTier: state.vipTier,
      lastCompDay: state.lastCompDay,
      slotsSpun: state.slotsSpun,
      slotsWon: state.slotsWon,
      biggestSlotWin: state.biggestSlotWin,
      jackpots: state.jackpots,
      bjHandsWon: state.bjHandsWon,
      bjHandsPlayed: state.bjHandsPlayed,
      bjBlackjacks: state.bjBlackjacks,
      rouletteWins: state.rouletteWins,
      rouletteSpins: state.rouletteSpins,
      missionsDone: state.missionsDone,
      missionProgress: state.missionProgress,
      cashbackOwed: state.cashbackOwed,
    };
  }

  function deserialize(s) {
    if (!s || typeof s !== 'object') return;
    for (const k of ['chips', 'lifetimeWagered', 'lifetimeWon', 'lifetimeLost', 'compPoints', 'slotsSpun', 'slotsWon', 'biggestSlotWin', 'jackpots', 'bjHandsWon', 'bjHandsPlayed', 'bjBlackjacks', 'rouletteWins', 'rouletteSpins', 'cashbackOwed', 'lastCompDay']) {
      if (typeof s[k] === 'number') state[k] = s[k];
    }
    if (typeof s.vipTier === 'string') state.vipTier = s.vipTier;
    if (s.missionsDone) state.missionsDone = { ...s.missionsDone };
    if (s.missionProgress) state.missionProgress = { ...s.missionProgress };
    state.sessionStartChips = state.chips;
  }

  return {
    state,
    buyChips,
    cashOut,
    claimDailyComp,
    redeemComp,
    spinSlots,
    startBlackjack,
    blackjackHit,
    blackjackStand,
    blackjackDouble,
    blackjackHint,
    placeRouletteBet,
    spinRoulette,
    clearRouletteBets,
    missions,
    applyCashback,
    checkMission,
    tick,
    hudLine,
    summary,
    serialize,
    deserialize,
  };
}


// ---------------------------------------------------------------------------
// Part 3 — High-roller events, slot tournaments, daily challenges
// ---------------------------------------------------------------------------

// Daily challenges: one per weekday, each with a chip reward.
export const CASINO_DAILY_CHALLENGES = [
  { day: 0, id: 'sunday-slots', name: 'Sunday Slots', desc: 'Spin the slots 20 times.', target: 20, kind: 'spins', rewardChips: 300 },
  { day: 1, id: 'monday-cards', name: 'Monday Cards', desc: 'Win 3 blackjack hands.', target: 3, kind: 'bjWins', rewardChips: 250 },
  { day: 2, id: 'tuesday-wheel', name: 'Tuesday Wheel', desc: 'Win 5 roulette bets.', target: 5, kind: 'rouletteWins', rewardChips: 250 },
  { day: 3, id: 'wednesday-wager', name: 'Wednesday Wager', desc: 'Wager 2,000 chips.', target: 2000, kind: 'wagered', rewardChips: 400 },
  { day: 4, id: 'thursday-high', name: 'Thursday High Roller', desc: 'Place a single bet of 500+ chips.', target: 500, kind: 'bigBet', rewardChips: 500 },
  { day: 5, id: 'friday-jackpot', name: 'Friday Jackpot', desc: 'Hit any 3-of-a-kind win of 50x or more.', target: 1, kind: 'bigWin', rewardChips: 600 },
  { day: 6, id: 'saturday-vip', name: 'Saturday VIP', desc: 'Earn 100 comp points.', target: 100, kind: 'comp', rewardChips: 350 },
];

// Slot tournaments: fixed entry, fixed spins, best total wins.
export const SLOT_TOURNAMENTS = [
  { id: 'penny-cup', name: 'Penny Cup', entry: 100, spins: 20, prize: 2000, machineId: 'penny', desc: 'Twenty spins on Penny Paradise. Best total wins.' },
  { id: 'neon-nights-cup', name: 'Neon Nights Cup', entry: 500, spins: 20, prize: 10000, machineId: 'neon', desc: 'Twenty spins on Neon Nights.' },
  { id: 'royale-cup', name: 'Royale Cup', entry: 2000, spins: 20, prize: 50000, machineId: 'royale', desc: 'The big one. Twenty spins on Royale Deluxe.' },
  { id: 'vault-cup', name: 'Vault Cup', entry: 5000, spins: 10, prize: 200000, machineId: 'vault', desc: 'Ten spins. One winner. Life-changing money.' },
];

// High-roller events that fire at random while playing.
export const HIGH_ROLLER_EVENTS = [
  { id: 'whale-arrives', name: 'A Whale Arrives', desc: 'A whale sits at your table. Minimums double for an hour.', effect: 'minBet x2' },
  { id: 'lucky-hour', name: 'Lucky Hour', desc: 'The casino is feeling generous. All slot wins +10% for an hour.', effect: 'slotWin +10%' },
  { id: 'dealer-change', name: 'Dealer Change', desc: 'A new dealer. The cards feel different.', effect: 'shuffle' },
  { id: 'comp-rain', name: 'Comp Rain', desc: 'The pit boss hands out free chips to everyone playing.', effect: '+50 chips' },
  { id: 'security-sweep', name: 'Security Sweep', desc: 'Security walks the floor. Card counters beware.', effect: 'heat +1' },
  { id: 'jackpot-party', name: 'Jackpot Party', desc: 'Somebody hit a jackpot nearby. The floor is electric.', effect: 'luck +5%' },
];

// Famous casino stories (flavour for the lounge wall).
export const CASINO_LORE = [
  'In 1987 a sailor put his last dollar in Vault Breaker and left with $250,000.',
  'The Diamond symbol has not hit five times on Royale Deluxe in eleven years.',
  'A card counter once won $40,000 here in a single night. He was escorted out politely.',
  'The whale in the high-limit room has been playing the same seat for nine years.',
  'The casino was built on the site of an old speakeasy. The vault is original.',
  'Nobody has ever beaten the house. Some people have beaten a night.',
];

// Chip tricks the player can learn (cosmetic progression).
export const CHIP_TRICKS = [
  { id: 'shuffle', name: 'Chip Shuffle', level: 1, desc: 'Shuffle three chips with one hand.' },
  { id: 'roll', name: 'Chip Roll', level: 2, desc: 'Roll a chip across your knuckles.' },
  { id: 'flip', name: 'Chip Flip', level: 3, desc: 'Flip a chip and catch it. Every time.' },
  { id: 'tower', name: 'Chip Tower', level: 4, desc: 'Stack twenty chips one-handed.' },
  { id: 'butterfly', name: 'Butterfly', level: 5, desc: 'The butterfly. The crowd goes quiet.' },
];

// Table etiquette (flavour).
export const CASINO_ETIQUETTE = [
  'Tip the dealer when you win big. They remember.',
  'Never touch your bet once the wheel spins.',
  'Do not say the word seven at the craps table. There is no craps table here, but still.',
  'Cash out when you are ahead. The house is patient. You should be too.',
  'A losing streak is not a debt the casino owes you.',
];

// Pure helpers for tournaments and challenges (usable by the game layer).

export function tournamentPrizeFor(tournament, playerTotal, rivalTotals) {
  const all = [...rivalTotals, playerTotal].sort((a, b) => b - a);
  const place = all.indexOf(playerTotal) + 1;
  const won = place === 1;
  const prize = won ? tournament.prize : place <= 3 ? Math.round(tournament.prize * 0.1) : 0;
  return { place, won, prize, total: playerTotal };
}

export function dailyChallengeFor(dayOfWeek) {
  const dow = ((Math.floor(dayOfWeek) % 7) + 7) % 7;
  return CASINO_DAILY_CHALLENGES.find((c) => c.day === dow) || CASINO_DAILY_CHALLENGES[0];
}

export function challengeProgress(challenge, stats) {
  const v = stats[challenge.kind] || 0;
  return { done: v >= challenge.target, progress: Math.min(v, challenge.target), target: challenge.target };
}

export function slotTournamentScore(spins) {
  return spins.reduce((sum, s) => sum + (s.totalWin || 0), 0);
}

export function vipProgress(lifetimeWagered) {
  let current = VIP_TIERS[0];
  let next = null;
  for (let i = 0; i < VIP_TIERS.length; i++) {
    if (lifetimeWagered >= VIP_TIERS[i].wagerNeeded) current = VIP_TIERS[i];
    else { next = VIP_TIERS[i]; break; }
  }
  return {
    current,
    next,
    toNext: next ? next.wagerNeeded - lifetimeWagered : 0,
    progress: next ? Math.round((lifetimeWagered / next.wagerNeeded) * 100) : 100,
  };
}

export function expectedSlotReturn(machine, bet, spins) {
  return Math.round(machine.rtp * bet * spins);
}

export function blackjackBustChance(cards) {
  const v = handValue(cards);
  if (v.total < 12) return 0;
  let bustCards = 0;
  for (const r of CARD_RANKS) {
    const val = CARD_VALUES[r];
    if (v.total + val > 21) bustCards += 4;
  }
  return Math.round((bustCards / 52) * 100) / 100;
}

export function rouletteExpectedReturn(betType, amount, spins) {
  const def = ROULETTE_BETS.find((b) => b.id === betType);
  if (!def) return 0;
  const winChance = betType === 'straight' ? 1 / 38 : betType === 'red' || betType === 'black' || betType === 'even' || betType === 'odd' || betType === 'low' || betType === 'high' ? 18 / 38 : 12 / 38;
  const evPerSpin = amount * (winChance * def.pays - (1 - winChance));
  return Math.round(evPerSpin * spins);
}

export function chipStackBreakdown(chips) {
  const denoms = [1000, 500, 100, 25, 5, 1];
  const out = [];
  let rest = chips;
  for (const d of denoms) {
    const n = Math.floor(rest / d);
    if (n > 0) out.push({ denom: d, count: n });
    rest -= n * d;
  }
  return out;
}

export function describeSlotResult(lineResults, bet) {
  return lineResults.map((l) => `${l.symbols.join(' ')} — ${l.kind} (+${l.win})`).join(' | ');
}

export function isHighRollerBet(bet, threshold) {
  return bet >= (threshold || 500);
}

export function compPointsFor(wagered) {
  return Math.floor(wagered / 10);
}

export function cashbackFor(lifetimeLost, tierId) {
  const tier = VIP_TIERS.find((t) => t.id === tierId) || VIP_TIERS[0];
  return Math.floor(lifetimeLost * tier.cashback);
}

export function tableMinFor(machineId) {
  const m = SLOT_MACHINES.find((x) => x.id === machineId);
  return m ? m.minBet : 1;
}

export function tableMaxFor(machineId) {
  const m = SLOT_MACHINES.find((x) => x.id === machineId);
  return m ? m.maxBet : 25;
}

export function bestSlotMachineForBankroll(chips) {
  const affordable = SLOT_MACHINES.filter((m) => chips >= m.minBet * 20);
  if (affordable.length === 0) return SLOT_MACHINES[0];
  return affordable[affordable.length - 1];
}

export function blackjackTableForBankroll(chips) {
  const affordable = BLACKJACK_TABLES.filter((t) => chips >= t.minBet * 10);
  if (affordable.length === 0) return BLACKJACK_TABLES[0];
  return affordable[affordable.length - 1];
}

// Session report: a plain summary the HUD can show after a session.
export function sessionReport(state) {
  const net = state.chips - state.sessionStartChips;
  return {
    chips: state.chips,
    net,
    verdict: net > 0 ? 'ahead' : net < 0 ? 'behind' : 'even',
    spins: state.sessionSpins,
    bjHands: state.sessionBjHands,
    rouletteSpins: state.sessionRouletteSpins,
    vipTier: state.vipTier,
    compPoints: state.compPoints,
  };
}

// Dealer shoe penetration warning (flavour + real mechanic hook).
export function shoePenetration(cardsLeft, totalCards) {
  const pct = Math.round((cardsLeft / totalCards) * 100);
  if (pct < 25) return { pct, note: 'Shoe is nearly empty — a shuffle is coming.' };
  if (pct < 50) return { pct, note: 'Half the shoe is gone.' };
  return { pct, note: 'Fresh shoe.' };
}


// ---------------------------------------------------------------------------
// Part 4 — Casino floor map, drink menu, chip denominations
// ---------------------------------------------------------------------------

// Casino floor areas.
export const CASINO_FLOOR = [
  { id: 'slots-floor', name: 'Slots Floor', games: 'slots', minBet: 1, vibe: 'Noisy, bright, endless.' },
  { id: 'blackjack-pit', name: 'Blackjack Pit', games: 'blackjack', minBet: 10, vibe: 'Quiet focus, green felt.' },
  { id: 'roulette-wheel', name: 'Roulette Wheel', games: 'roulette', minBet: 5, vibe: 'The wheel spins, the crowd holds its breath.' },
  { id: 'high-limit', name: 'High Limit Room', games: 'all', minBet: 500, vibe: 'Velvet ropes, quiet money.' },
  { id: 'poker-room', name: 'Poker Room', games: 'poker', minBet: 100, vibe: 'Sunglasses indoors. No talking.' },
  { id: 'baccarat', name: 'Baccarat Salon', games: 'baccarat', minBet: 50, vibe: 'Old money, old rules.' },
  { id: 'cage', name: 'Cashier Cage', games: 'none', minBet: 0, vibe: 'Chips in, chips out.' },
  { id: 'bar', name: 'Royale Bar', games: 'none', minBet: 0, vibe: 'Free drinks for players.' },
  { id: 'lounge', name: 'VIP Lounge', games: 'all', minBet: 1000, vibe: 'Members only. Whales only.' },
  { id: 'sportsbook', name: 'Sportsbook', games: 'sports', minBet: 10, vibe: 'Screens everywhere, odds everywhere.' },
];

// Drink menu (free for players).
export const DRINK_MENU = [
  { id: 'water', name: 'Water', luck: 0, desc: 'Hydration. Boring, effective.' },
  { id: 'coffee', name: 'Coffee', luck: 0, desc: 'Stay sharp at 3 AM.' },
  { id: 'beer', name: 'Beer', luck: 1, desc: 'One beer. Loose and lucky.' },
  { id: 'whiskey', name: 'Whiskey', luck: 2, desc: 'Liquid courage.' },
  { id: 'cocktail', name: 'Royale Cocktail', luck: 2, desc: 'The house special. Blue, sweet, strong.' },
  { id: 'champagne', name: 'Champagne', luck: 3, desc: 'For winners. Or for people about to win.' },
  { id: 'energy', name: 'Energy Drink', luck: 0, desc: 'For the all-night session.' },
  { id: 'mocktail', name: 'Mocktail', luck: 1, desc: 'All flavour, no fog.' },
];

// Chip denomination colours.
export const CHIP_COLORS = [
  { denom: 1, color: 'white', name: 'White' },
  { denom: 5, color: 'red', name: 'Red' },
  { denom: 25, color: 'green', name: 'Green' },
  { denom: 100, color: 'black', name: 'Black' },
  { denom: 500, color: 'purple', name: 'Purple' },
  { denom: 1000, color: 'yellow', name: 'Yellow' },
  { denom: 5000, color: 'orange', name: 'Orange' },
];

// Slot machine quirks (flavour).
export const SLOT_QUIRKS = [
  { machine: 'penny', quirk: 'The third reel sticks sometimes. Players swear it is luck.' },
  { machine: 'neon', quirk: 'The neon buzzes in time with the music.' },
  { machine: 'royale', quirk: 'A butler in white gloves polishes it every hour.' },
  { machine: 'vault', quirk: 'It has not paid its jackpot in three years. It is due.' },
];

// More helpers.

export function floorAreaFor(game) {
  return CASINO_FLOOR.filter((a) => a.games === game || a.games === 'all');
}

export function drinkLuck(drinkId) {
  const d = DRINK_MENU.find((x) => x.id === drinkId);
  return d ? d.luck : 0;
}

export function chipColorFor(denom) {
  const c = CHIP_COLORS.find((x) => x.denom === denom);
  return c ? c.color : 'white';
}

export function slotQuirkFor(machineId) {
  const q = SLOT_QUIRKS.find((x) => x.machine === machineId);
  return q ? q.quirk : '';
}

export function minBetOnFloor(areaId) {
  const a = CASINO_FLOOR.find((x) => x.id === areaId);
  return a ? a.minBet : 1;
}

export function canEnterArea(areaId, chips, vipTier) {
  const a = CASINO_FLOOR.find((x) => x.id === areaId);
  if (!a) return false;
  if (a.id === 'lounge') return ['gold', 'platinum', 'diamond'].includes(vipTier);
  if (a.id === 'high-limit') return chips >= 500 || ['silver', 'gold', 'platinum', 'diamond'].includes(vipTier);
  return true;
}

export function floorVibe(areaId) {
  const a = CASINO_FLOOR.find((x) => x.id === areaId);
  return a ? a.vibe : '';
}


// ---------------------------------------------------------------------------
// Part 5 — Poker nights, baccarat table, casino host notes
// ---------------------------------------------------------------------------

export const POKER_NIGHTS = [
  { day: 'Friday', buyIn: 100, prize: 2000, desc: 'Friday night poker. Everybody plays.' },
  { day: 'Saturday', buyIn: 500, prize: 10000, desc: 'Saturday high stakes.' },
  { day: 'Sunday', buyIn: 50, prize: 800, desc: 'Sunday friendly game.' },
];

export const BACCARAT_RULES = [
  'Bet on Player, Banker, or Tie.',
  'Banker wins pay 95%. Player wins pay 100%.',
  'A Tie pays 800%. It almost never happens.',
  'Cards are worth face value. Tens are zero.',
  'Closest to nine wins. That is the whole game.',
];

export const HOST_NOTES = [
  'The host remembers your name, your drink, and your last win.',
  'High rollers get a host. The host gets everything else.',
  'Ask the host for a room. Ask the host for anything.',
];

export function pokerNightFor(dayName) {
  return POKER_NIGHTS.find((p) => p.day.toLowerCase() === dayName.toLowerCase()) || null;
}

export function baccaratPayout(betOn, winner, amount) {
  if (betOn === winner) {
    if (winner === 'banker') return Math.round(amount * 0.95);
    if (winner === 'tie') return amount * 8;
    return amount;
  }
  return -amount;
}

export function hostAvailable(vipTier) {
  return ['silver', 'gold', 'platinum', 'diamond'].includes(vipTier);
}


// ---------------------------------------------------------------------------
// Part 6 — Casino chip tricks, high-roller quotes
// ---------------------------------------------------------------------------

export const HIGH_ROLLER_QUOTES = [
  'Luck is just preparation meeting opportunity. — High roller',
  'I never lose. I either win or I learn the table.',
  'The house always wins. Except tonight.',
  'Chips are just paper with ambition.',
];

export const CASINO_HOURS = [
  { area: 'slots-floor', open: 0, close: 24, note: 'Slots never sleep.' },
  { area: 'blackjack-pit', open: 10, close: 4, note: 'Tables open late morning.' },
  { area: 'roulette-wheel', open: 12, close: 4, note: 'The wheel spins from noon.' },
  { area: 'high-limit', open: 18, close: 6, note: 'High limit opens at dusk.' },
];

export function isAreaOpen(areaId, hour) {
  const row = CASINO_HOURS.find((h) => h.area === areaId);
  if (!row) return true;
  const h = Math.floor(hour) % 24;
  if (row.open < row.close) return h >= row.open && h < row.close;
  return h >= row.open || h < row.close;
}

export function randomHighRollerQuote(rng) {
  return HIGH_ROLLER_QUOTES[Math.floor(rng() * HIGH_ROLLER_QUOTES.length)];
}


// ---------------------------------------------------------------------------
// Part 7 — Lucky numbers, casino superstitions
// ---------------------------------------------------------------------------

export const LUCKY_NUMBERS = [7, 11, 21, 13, 3, 27, 8, 17];
export const CASINO_SUPERSTITIONS = [
  'Never bet on 13. Or always bet on 13.',
  'Blow on the dice for luck. There are no dice here, but blow anyway.',
  'A lucky chip never leaves your pocket.',
  'Red is hot tonight. Or black. Somebody always knows.',
];

export function isLuckyNumber(n) {
  return LUCKY_NUMBERS.includes(n);
}

export function superstitionCasino(index) {
  return CASINO_SUPERSTITIONS[index % CASINO_SUPERSTITIONS.length];
}
