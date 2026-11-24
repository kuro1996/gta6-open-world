export const CHIP_PACKS = [
  { id: 'starter', name: 'Starter Stack', chips: 100, price: 100 },
  { id: 'high-roller', name: 'High Roller Stack', chips: 500, price: 480 },
  { id: 'whale', name: 'Whale Stack', chips: 1000, price: 900 },
  { id: 'vault', name: 'Vault Stack', chips: 5000, price: 4000 },
];

export const SLOT_SYMBOLS = [
  { id: 'cherry', label: 'Cherry', weight: 30, pay3: 5, pay5: 50 },
  { id: 'lemon', label: 'Lemon', weight: 25, pay3: 4, pay5: 40 },
  { id: 'bell', label: 'Bell', weight: 20, pay3: 8, pay5: 80 },
  { id: 'bar', label: 'Bar', weight: 15, pay3: 10, pay5: 100 },
  { id: 'seven', label: 'Seven', weight: 8, pay3: 25, pay5: 250 },
  { id: 'diamond', label: 'Diamond', weight: 4, pay3: 50, pay5: 500 },
  { id: 'wild', label: 'Wild', weight: 6, pay3: 20, pay5: 200 },
];

export const SLOT_MACHINES = [
  { id: 'neon-nights', name: 'Neon Nights', minBet: 1, maxBet: 25, reels: 3, jackpot: 1000, rtp: 0.94 },
  { id: 'gold-rush', name: 'Gold Rush', minBet: 5, maxBet: 50, reels: 5, jackpot: 5000, rtp: 0.95 },
  { id: 'royale-deluxe', name: 'Royale Deluxe', minBet: 25, maxBet: 250, reels: 5, jackpot: 25000, rtp: 0.96 },
  { id: 'diamond-vault', name: 'Diamond Vault', minBet: 100, maxBet: 1000, reels: 5, jackpot: 100000, rtp: 0.97 },
];

export const ROULETTE_WHEEL = [
  { n: 0, color: 'green' },
  { n: 0, color: 'green', double: true },
  { n: 1, color: 'red' }, { n: 2, color: 'black' }, { n: 3, color: 'red' },
  { n: 4, color: 'black' }, { n: 5, color: 'red' }, { n: 6, color: 'black' },
  { n: 7, color: 'red' }, { n: 8, color: 'black' }, { n: 9, color: 'red' },
  { n: 10, color: 'black' }, { n: 11, color: 'black' }, { n: 12, color: 'red' },
  { n: 13, color: 'black' }, { n: 14, color: 'red' }, { n: 15, color: 'black' },
  { n: 16, color: 'red' }, { n: 17, color: 'black' }, { n: 18, color: 'red' },
  { n: 19, color: 'red' }, { n: 20, color: 'black' }, { n: 21, color: 'red' },
  { n: 22, color: 'black' }, { n: 23, color: 'red' }, { n: 24, color: 'black' },
  { n: 25, color: 'red' }, { n: 26, color: 'black' }, { n: 27, color: 'red' },
  { n: 28, color: 'black' }, { n: 29, color: 'black' }, { n: 30, color: 'red' },
  { n: 31, color: 'black' }, { n: 32, color: 'red' }, { n: 33, color: 'black' },
  { n: 34, color: 'red' }, { n: 35, color: 'black' }, { n: 36, color: 'red' },
];

export const ROULETTE_BETS = [
  { id: 'straight', name: 'Straight Up', pays: 35 },
  { id: 'red', name: 'Red', pays: 1 },
  { id: 'black', name: 'Black', pays: 1 },
  { id: 'even', name: 'Even', pays: 1 },
  { id: 'odd', name: 'Odd', pays: 1 },
  { id: 'low', name: 'Low 1-18', pays: 1 },
  { id: 'high', name: 'High 19-36', pays: 1 },
  { id: 'dozen1', name: 'Dozen 1-12', pays: 2 },
  { id: 'dozen2', name: 'Dozen 13-24', pays: 2 },
  { id: 'dozen3', name: 'Dozen 25-36', pays: 2 },
  { id: 'col1', name: 'Column 1', pays: 2 },
  { id: 'col2', name: 'Column 2', pays: 2 },
  { id: 'col3', name: 'Column 3', pays: 2 },
];

export const BLACKJACK_TABLES = [
  { id: 'classic', name: 'Classic Table', minBet: 5, maxBet: 100, blackjackPays: 1.5, dealerStandsOn: 17, decks: 4 },
  { id: 'vip', name: 'VIP Table', minBet: 25, maxBet: 500, blackjackPays: 1.5, dealerStandsOn: 17, decks: 6 },
  { id: 'high-limit', name: 'High Limit Table', minBet: 100, maxBet: 2000, blackjackPays: 1.5, dealerStandsOn: 17, decks: 8 },
];

export const VIP_TIERS = [
  { id: 'bronze', name: 'Bronze', wagerNeeded: 0, dailyComp: 25, cashback: 0, tables: ['classic'] },
  { id: 'silver', name: 'Silver', wagerNeeded: 1000, dailyComp: 50, cashback: 0.05, tables: ['classic', 'vip'] },
  { id: 'gold', name: 'Gold', wagerNeeded: 5000, dailyComp: 100, cashback: 0.1, tables: ['classic', 'vip'] },
  { id: 'platinum', name: 'Platinum', wagerNeeded: 20000, dailyComp: 250, cashback: 0.15, tables: ['classic', 'vip', 'high-limit'] },
  { id: 'diamond', name: 'Diamond', wagerNeeded: 100000, dailyComp: 500, cashback: 0.2, tables: ['classic', 'vip', 'high-limit'] },
];

export const CASINO_MISSIONS = [
  { id: 'first-spin', name: 'First Spin', desc: 'Spin the slots once', rewardChips: 25, rewardCash: 0 },
  { id: 'spin-100', name: 'Century Spinner', desc: 'Spin the slots 100 times', rewardChips: 200, rewardCash: 0 },
  { id: 'jackpot', name: 'Jackpot Hunter', desc: 'Hit a slot jackpot', rewardChips: 1000, rewardCash: 500 },
  { id: 'bj-win-10', name: 'Blackjack Pro', desc: 'Win 10 blackjack hands', rewardChips: 150, rewardCash: 0 },
  { id: 'bj-natural', name: 'Natural Twenty-One', desc: 'Get a natural blackjack', rewardChips: 100, rewardCash: 0 },
  { id: 'roulette-win', name: 'Wheel Winner', desc: 'Win a roulette spin', rewardChips: 50, rewardCash: 0 },
  { id: 'roulette-dozen', name: 'Dozen Streak', desc: 'Win three dozen bets in a row', rewardChips: 300, rewardCash: 0 },
  { id: 'wager-5000', name: 'High Roller', desc: 'Wager 5000 chips in total', rewardChips: 250, rewardCash: 100 },
  { id: 'profit-1000', name: 'In The Green', desc: 'Finish a session 1000 chips ahead', rewardChips: 500, rewardCash: 0 },
  { id: 'vip-gold', name: 'Gold Member', desc: 'Reach Gold VIP tier', rewardChips: 400, rewardCash: 200 },
];

export const COMP_REWARDS = [
  { id: 'chips-50', name: '50 Free Chips', cost: 100, chips: 50, desc: 'A small stack of house chips' },
  { id: 'chips-200', name: '200 Free Chips', cost: 350, chips: 200, desc: 'A decent stack of house chips' },
  { id: 'chips-1000', name: '1000 Free Chips', cost: 1500, chips: 1000, desc: 'A fat stack of house chips' },
  { id: 'drink', name: 'Lucky Drink', cost: 75, chips: 0, desc: 'A house cocktail that boosts your luck' },
  { id: 'suite', name: 'Penthouse Suite', cost: 2000, chips: 500, desc: 'A night in the penthouse plus chips' },
];

export const CARD_RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
export const CARD_SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];

export const CARD_VALUES = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  '10': 10, J: 10, Q: 10, K: 10, A: 11,
};

export const BJ_HINTS = {
  hard: [
    { hand: '5-8', action: 'Always hit' },
    { hand: '9', action: 'Double against 3-6, otherwise hit' },
    { hand: '10', action: 'Double against 2-9, otherwise hit' },
    { hand: '11', action: 'Always double' },
    { hand: '12', action: 'Stand against 4-6, otherwise hit' },
    { hand: '13-16', action: 'Stand against 2-6, otherwise hit' },
    { hand: '17+', action: 'Always stand' },
  ],
  soft: [
    { hand: '13-14', action: 'Hit' },
    { hand: '15-17', action: 'Double against 4-6, otherwise hit' },
    { hand: '18', action: 'Stand against 2, 7, 8; double against 3-6' },
    { hand: '19+', action: 'Always stand' },
  ],
};

export const CASINO_DAILY_CHALLENGES = [
  { day: 0, id: 'sunday-spins', name: 'Sunday Spins', desc: 'Spin the slots 20 times', target: 20, kind: 'slots', rewardChips: 100 },
  { day: 1, id: 'monday-bj', name: 'Monday Blackjack', desc: 'Win 3 blackjack hands', target: 3, kind: 'blackjack', rewardChips: 100 },
  { day: 2, id: 'tuesday-roulette', name: 'Tuesday Roulette', desc: 'Win 2 roulette spins', target: 2, kind: 'roulette', rewardChips: 100 },
  { day: 3, id: 'wednesday-wager', name: 'Wednesday Wager', desc: 'Wager 1000 chips', target: 1000, kind: 'wager', rewardChips: 150 },
  { day: 4, id: 'thursday-slots', name: 'Thursday Slots', desc: 'Spin the slots 30 times', target: 30, kind: 'slots', rewardChips: 150 },
  { day: 5, id: 'friday-bj', name: 'Friday Blackjack', desc: 'Play 10 blackjack hands', target: 10, kind: 'blackjack', rewardChips: 150 },
  { day: 6, id: 'saturday-high', name: 'Saturday High Roller', desc: 'Wager 2500 chips', target: 2500, kind: 'wager', rewardChips: 250 },
];

export const SLOT_TOURNAMENTS = [
  { id: 'neon-cup', name: 'Neon Cup', entry: 50, spins: 20, prize: 2000, machineId: 'neon-nights', desc: 'A fast nightly slot race' },
  { id: 'gold-rush-cup', name: 'Gold Rush Cup', entry: 100, spins: 25, prize: 5000, machineId: 'gold-rush', desc: 'Dig deep for the big prize' },
  { id: 'royale-cup', name: 'Royale Cup', entry: 250, spins: 30, prize: 15000, machineId: 'royale-deluxe', desc: 'The house showcase event' },
  { id: 'vault-cup', name: 'Diamond Vault Cup', entry: 500, spins: 40, prize: 50000, machineId: 'diamond-vault', desc: 'Only for the boldest rollers' },
];

export const HIGH_ROLLER_EVENTS = [
  { id: 'whale-night', name: 'Whale Night', desc: 'The biggest spenders take the floor', effect: 'double-comp' },
  { id: 'lucky-hour', name: 'Lucky Hour', desc: 'The house loosens the slots for an hour', effect: 'luck-boost' },
  { id: 'cashback-day', name: 'Cashback Day', desc: 'Extra cashback on every loss', effect: 'cashback-boost' },
  { id: 'vip-gala', name: 'VIP Gala', desc: 'A gala for diamond members only', effect: 'vip-only' },
  { id: 'jackpot-frenzy', name: 'Jackpot Frenzy', desc: 'Jackpot odds rise across the floor', effect: 'jackpot-boost' },
  { id: 'midnight-madness', name: 'Midnight Madness', desc: 'Late night tables with raised limits', effect: 'raised-limits' },
];

export const CASINO_LORE = [
  'The Royale was built on the site of an old speakeasy that never once got raided.',
  'A dealer named Marlowe once dealt the same player three blackjacks in a row.',
  'The chandelier above the high-limit room is made from ten thousand casino chips.',
  'Legend says the diamond vault machine has only ever paid its jackpot twice.',
  'The house cat, Chips, has a standing seat at the roulette wheel.',
  'Every New Year the casino burns one unlucky deck in the courtyard.',
];

export const CHIP_TRICKS = [
  { id: 'shuffle', name: 'Chip Shuffle', level: 1, desc: 'Roll chips across your knuckles' },
  { id: 'flip', name: 'Chip Flip', level: 2, desc: 'Flip a chip and catch it on your palm' },
  { id: 'bridge', name: 'Chip Bridge', level: 3, desc: 'Bridge two stacks with a single chip' },
  { id: 'cascade', name: 'Chip Cascade', level: 4, desc: 'Cascade a stack from hand to hand' },
  { id: 'tower', name: 'Chip Tower', level: 5, desc: 'Balance a tower of twenty chips on one finger' },
];

export const CASINO_ETIQUETTE = [
  'Tip your dealer when you win big.',
  'Never touch another player\'s chips.',
  'Keep your phone off the table during a hand.',
  'Wait for the hand to finish before sitting down.',
  'A quiet table is a lucky table.',
];

export const CASINO_FLOOR = [
  { id: 'slots-row', name: 'Slots Row', games: 'slots', minBet: 1, vibe: 'buzzy' },
  { id: 'roulette-pit', name: 'Roulette Pit', games: 'roulette', minBet: 5, vibe: 'electric' },
  { id: 'bj-pit', name: 'Blackjack Pit', games: 'blackjack', minBet: 5, vibe: 'focused' },
  { id: 'poker-room', name: 'Poker Room', games: 'poker', minBet: 25, vibe: 'tense' },
  { id: 'baccarat-room', name: 'Baccarat Room', games: 'baccarat', minBet: 50, vibe: 'elegant' },
  { id: 'lounge', name: 'VIP Lounge', games: 'all', minBet: 100, vibe: 'plush' },
  { id: 'high-limit', name: 'High Limit Room', games: 'all', minBet: 500, vibe: 'hushed' },
  { id: 'bar', name: 'Casino Bar', games: 'none', minBet: 0, vibe: 'brisk' },
  { id: 'cage', name: 'Cashier Cage', games: 'none', minBet: 0, vibe: 'brisk' },
  { id: 'terrace', name: 'Terrace', games: 'none', minBet: 0, vibe: 'breezy' },
];

export const DRINK_MENU = [
  { id: 'water', name: 'Sparkling Water', luck: 0, desc: 'Keeps you sharp' },
  { id: 'soda', name: 'House Soda', luck: 1, desc: 'Sweet and cold' },
  { id: 'beer', name: 'Craft Beer', luck: 2, desc: 'A local favourite' },
  { id: 'wine', name: 'Red Wine', luck: 2, desc: 'Smooth and steady' },
  { id: 'martini', name: 'Royale Martini', luck: 3, desc: 'Shaken, not stirred' },
  { id: 'whiskey', name: 'Old Whiskey', luck: 3, desc: 'A gambler\'s classic' },
  { id: 'lucky-shot', name: 'Lucky Shot', luck: 5, desc: 'The house special, on fire' },
  { id: 'champagne', name: 'Champagne', luck: 4, desc: 'For the big winners' },
];

export const CHIP_COLORS = [
  { denom: 1, color: 'white', name: 'White Chip' },
  { denom: 5, color: 'red', name: 'Red Chip' },
  { denom: 25, color: 'green', name: 'Green Chip' },
  { denom: 100, color: 'black', name: 'Black Chip' },
  { denom: 500, color: 'purple', name: 'Purple Chip' },
  { denom: 1000, color: 'gold', name: 'Gold Chip' },
  { denom: 5000, color: 'pink', name: 'Pink Chip' },
];

export const SLOT_QUIRKS = [
  { machine: 'neon-nights', quirk: 'Hums a synth tune on every win' },
  { machine: 'gold-rush', quirk: 'Shakes like a pickaxe when the jackpot nears' },
  { machine: 'royale-deluxe', quirk: 'The reels spin a little slower on Fridays' },
  { machine: 'diamond-vault', quirk: 'Flashes the vault light before every spin' },
];

export const POKER_NIGHTS = [
  { day: 'Friday', buyIn: 100, prize: 5000, desc: 'Friday night hold\'em, house takes no rake' },
  { day: 'Saturday', buyIn: 250, prize: 15000, desc: 'The big Saturday tournament' },
  { day: 'Sunday', buyIn: 50, prize: 2000, desc: 'A relaxed Sunday game' },
];

export const BACCARAT_RULES = [
  'Player and banker each receive two cards.',
  'A natural eight or nine wins immediately.',
  'Banker draws on six only when the player stands on six or seven.',
  'Ties pay eight to one.',
  'Banker wins pay a five percent commission.',
];

export const HOST_NOTES = [
  'Hosts are available for silver members and above.',
  'Your host can arrange the penthouse with a day\'s notice.',
  'Ask your host about the private dining room.',
];

export const HIGH_ROLLER_QUOTES = [
  'Luck is just preparation meeting a hot streak.',
  'The house always wins, until tonight.',
  'I never count my money at the table.',
  'Fortune favours the bold, and the bold bet big.',
];

export const CASINO_HOURS = [
  { area: 'slots-row', open: 0, close: 24, note: 'Open all day' },
  { area: 'poker-room', open: 18, close: 2, note: 'Evenings only' },
  { area: 'lounge', open: 12, close: 4, note: 'Midday to late night' },
  { area: 'high-limit', open: 20, close: 6, note: 'Late night only' },
];

export const LUCKY_NUMBERS = [3, 7, 11, 17, 21, 27, 33, 77];

export const CASINO_SUPERSTITIONS = [
  'Never count your chips at the table.',
  'Always blow on the dice before a roll.',
  'Red is lucky on Fridays.',
  'Never cross your legs at the roulette wheel.',
];

const RED_NUMBERS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

export function handValue(cards) {
  let total = 0;
  let aces = 0;
  for (const card of cards) {
    const v = CARD_VALUES[card.rank] || 0;
    total += v;
    if (card.rank === 'A') aces += 1;
  }
  let soft = aces > 0 && total <= 21;
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  soft = aces > 0 && total <= 21;
  return {
    total,
    soft,
    bust: total > 21,
    blackjack: cards.length === 2 && total === 21,
  };
}

export function rouletteColor(n, isDouble) {
  if (n === 0 && isDouble) return 'green (double zero)';
  if (n === 0) return 'green';
  return RED_NUMBERS.has(n) ? 'red' : 'black';
}

export function rouletteBetWins(bet, result) {
  const n = result.n;
  const dbl = !!result.double;
  if (bet.id === 'straight') {
    if (dbl) return false;
    return bet.number === n;
  }
  if (n === 0 || dbl) return false;
  switch (bet.id) {
    case 'red': return RED_NUMBERS.has(n);
    case 'black': return !RED_NUMBERS.has(n);
    case 'even': return n % 2 === 0;
    case 'odd': return n % 2 === 1;
    case 'low': return n >= 1 && n <= 18;
    case 'high': return n >= 19 && n <= 36;
    case 'dozen1': return n >= 1 && n <= 12;
    case 'dozen2': return n >= 13 && n <= 24;
    case 'dozen3': return n >= 25 && n <= 36;
    case 'col1': return n % 3 === 1;
    case 'col2': return n % 3 === 2;
    case 'col3': return n % 3 === 0;
    default: return false;
  }
}

function symbolById(id) {
  return SLOT_SYMBOLS.find((s) => s.id === id) || SLOT_SYMBOLS[0];
}

export function slotPaylineWin(symbols, bet) {
  const counts = {};
  let wilds = 0;
  for (const id of symbols) {
    if (id === 'wild') wilds += 1;
    else counts[id] = (counts[id] || 0) + 1;
  }
  let bestId = null;
  let bestCount = 0;
  for (const id of Object.keys(counts)) {
    const c = counts[id] + wilds;
    if (c > bestCount) { bestCount = c; bestId = id; }
  }
  if (wilds === symbols.length) {
    const wild = symbolById('wild');
    const pay = bestCount >= 5 ? wild.pay5 : bestCount >= 4 ? Math.floor(wild.pay5 / 5) : bestCount >= 3 ? wild.pay3 : 0;
    return { win: pay * bet, kind: 'wild' };
  }
  if (!bestId || bestCount < 3) return { win: 0, kind: 'none' };
  const sym = symbolById(bestId);
  const pay = bestCount >= 5 ? sym.pay5 : bestCount >= 4 ? Math.floor(sym.pay5 / 5) : sym.pay3;
  return { win: pay * bet, kind: bestId };
}

export function tournamentPrizeFor(tournament, playerTotal, rivalTotals) {
  const beaten = rivalTotals.filter((t) => playerTotal > t).length;
  const place = rivalTotals.length + 1 - beaten;
  const won = place === 1;
  const prize = place === 1 ? tournament.prize : place <= 3 ? Math.floor(tournament.prize / 10) : 0;
  return { place, won, prize, total: playerTotal };
}

export function dailyChallengeFor(weekday) {
  const d = ((weekday % 7) + 7) % 7;
  return CASINO_DAILY_CHALLENGES.find((c) => c.day === d) || CASINO_DAILY_CHALLENGES[0];
}

export function challengeProgress(challenge, stats) {
  const progress = Math.min(challenge.target, stats[challenge.kind] || 0);
  return { done: progress >= challenge.target, progress, target: challenge.target };
}

export function slotTournamentScore(spinRecords) {
  return spinRecords.reduce((sum, r) => sum + (r.totalWin || 0), 0);
}

export function vipProgress(lifetimeWagered) {
  let current = VIP_TIERS[0];
  let next = null;
  for (let i = 0; i < VIP_TIERS.length; i++) {
    if (lifetimeWagered >= VIP_TIERS[i].wagerNeeded) current = VIP_TIERS[i];
    else { next = VIP_TIERS[i]; break; }
  }
  const needed = next ? Math.max(0, next.wagerNeeded - lifetimeWagered) : 0;
  const span = next ? next.wagerNeeded - current.wagerNeeded : 1;
  const progress = next ? Math.min(100, Math.round(((lifetimeWagered - current.wagerNeeded) / span) * 100)) : 100;
  return { current, next, needed, progress };
}

export function expectedSlotReturn(machine, bet, spins) {
  return Math.round(machine.rtp * bet * spins);
}

export function blackjackBustChance(cards) {
  const hv = handValue(cards);
  if (hv.total < 12) return 0;
  const bustRanks = CARD_RANKS.filter((r) => {
    const v = CARD_VALUES[r];
    return hv.total + v > 21;
  }).length;
  return Math.round((bustRanks / CARD_RANKS.length) * 100) / 100;
}

export function rouletteExpectedReturn(betId, amount, spins) {
  let chance = 0;
  if (betId === 'straight') chance = 1 / 38;
  else if (betId === 'dozen1' || betId === 'dozen2' || betId === 'dozen3' || betId === 'col1' || betId === 'col2' || betId === 'col3') chance = 12 / 38;
  else chance = 18 / 38;
  const def = ROULETTE_BETS.find((b) => b.id === betId);
  const pays = def ? def.pays : 1;
  return Math.round(amount * spins * chance * (pays + 1));
}

export function chipStackBreakdown(chips) {
  const denoms = [1000, 500, 100, 25, 5, 1];
  const out = [];
  let left = chips;
  for (const d of denoms) {
    const count = Math.floor(left / d);
    if (count > 0) out.push({ denom: d, count });
    left -= count * d;
  }
  return out;
}

export function describeSlotResult(lineResults, bet) {
  return lineResults.map((l) => `${l.kind} pays ${l.win} on a ${bet} bet`).join('; ');
}

export function isHighRollerBet(bet, threshold = 500) {
  return bet >= threshold;
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
  let best = SLOT_MACHINES[0];
  for (const m of SLOT_MACHINES) {
    if (chips >= m.minBet * 20) best = m;
  }
  return best;
}

export function blackjackTableForBankroll(chips) {
  let best = BLACKJACK_TABLES[0];
  for (const t of BLACKJACK_TABLES) {
    if (chips >= t.minBet * 10) best = t;
  }
  return best;
}

export function sessionReport(state) {
  const net = state.chips - state.sessionStartChips;
  const verdict = net > 0 ? 'ahead' : net < 0 ? 'behind' : 'even';
  return {
    chips: state.chips,
    net,
    verdict,
    spins: state.sessionSpins,
    bjHands: state.sessionBjHands,
    rouletteSpins: state.sessionRouletteSpins,
    vipTier: state.vipTier,
    compPoints: state.compPoints,
  };
}

export function shoePenetration(cardsLeft, totalCards) {
  const pct = totalCards > 0 ? Math.round((cardsLeft / totalCards) * 100) : 0;
  const note = pct < 25 ? 'Shoe nearly exhausted, shuffle soon' : 'Fresh shoe';
  return { pct, note };
}

export function floorAreaFor(game) {
  if (game === 'all') return CASINO_FLOOR.slice();
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
  if (areaId === 'lounge') return ['gold', 'platinum', 'diamond'].includes(vipTier);
  if (areaId === 'high-limit') {
    return chips >= 500 || ['silver', 'gold', 'platinum', 'diamond'].includes(vipTier);
  }
  return true;
}

export function floorVibe(areaId) {
  const a = CASINO_FLOOR.find((x) => x.id === areaId);
  return a ? a.vibe : '';
}

export function pokerNightFor(dayName) {
  return POKER_NIGHTS.find((p) => p.day === dayName) || null;
}

export function baccaratPayout(side, winner, amount) {
  if (side !== winner) return -amount;
  if (side === 'banker') return Math.round(amount * 0.95);
  if (side === 'tie') return amount * 8;
  return amount;
}

export function hostAvailable(vipTier) {
  return ['silver', 'gold', 'platinum', 'diamond'].includes(vipTier);
}

export function isAreaOpen(areaId, hour) {
  const row = CASINO_HOURS.find((h) => h.area === areaId);
  if (!row) return true;
  if (row.open === 0 && row.close === 24) return true;
  if (row.open < row.close) return hour >= row.open && hour < row.close;
  return hour >= row.open || hour < row.close;
}

export function randomHighRollerQuote(rng) {
  const r = rng || Math.random;
  return HIGH_ROLLER_QUOTES[Math.floor(r() * HIGH_ROLLER_QUOTES.length)];
}

export function isLuckyNumber(n) {
  return LUCKY_NUMBERS.includes(n);
}

export function superstitionCasino(index) {
  return CASINO_SUPERSTITIONS[((index % CASINO_SUPERSTITIONS.length) + CASINO_SUPERSTITIONS.length) % CASINO_SUPERSTITIONS.length];
}

export function createCasinoRoyaleSystem(deps = {}) {
  const rng = typeof deps.rng === 'function' ? deps.rng : Math.random;
  const getHour = typeof deps.getHour === 'function' ? deps.getHour : () => 12;
  const getDay = typeof deps.getDay === 'function' ? deps.getDay : () => 1;
  const getCash = typeof deps.getCash === 'function' ? deps.getCash : () => 0;
  const addCash = typeof deps.addCash === 'function' ? deps.addCash : () => {};
  const addHeat = typeof deps.addHeat === 'function' ? deps.addHeat : () => {};
  const log = typeof deps.log === 'function' ? deps.log : () => {};

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

  function pushResult(text) {
    state.recentResults.push(text);
    if (state.recentResults.length > 12) state.recentResults.shift();
  }

  function refreshVip() {
    const prog = vipProgress(state.lifetimeWagered);
    state.vipTier = prog.current.id;
  }

  function tierRecord() {
    return VIP_TIERS.find((t) => t.id === state.vipTier) || VIP_TIERS[0];
  }

  function recordWager(amount) {
    state.lifetimeWagered += amount;
    state.dailyWagered += amount;
    state.compPoints += compPointsFor(amount);
    refreshVip();
  }

  function pickWeightedSymbol() {
    const total = SLOT_SYMBOLS.reduce((s, x) => s + x.weight, 0);
    let roll = rng() * total;
    for (const sym of SLOT_SYMBOLS) {
      roll -= sym.weight;
      if (roll <= 0) return sym.id;
    }
    return SLOT_SYMBOLS[0].id;
  }

  function buildShoe(decks) {
    const shoe = [];
    for (let d = 0; d < decks; d++) {
      for (const suit of CARD_SUITS) {
        for (const rank of CARD_RANKS) shoe.push({ rank, suit });
      }
    }
    for (let i = shoe.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = shoe[i]; shoe[i] = shoe[j]; shoe[j] = tmp;
    }
    return shoe;
  }

  function checkMission(id) {
    if (state.missionsDone[id]) return;
    const mission = CASINO_MISSIONS.find((m) => m.id === id);
    if (!mission) return;
    let done = false;
    if (id === 'first-spin') done = state.slotsSpun >= 1;
    else if (id === 'spin-100') done = state.slotsSpun >= 100;
    else if (id === 'jackpot') done = state.jackpots >= 1;
    else if (id === 'bj-win-10') done = state.bjHandsWon >= 10;
    else if (id === 'bj-natural') done = state.bjBlackjacks >= 1;
    else if (id === 'roulette-win') done = state.rouletteWins >= 1;
    else if (id === 'roulette-dozen') done = state.rouletteDozenStreak >= 3;
    else if (id === 'wager-5000') done = state.lifetimeWagered >= 5000;
    else if (id === 'profit-1000') done = state.chips - state.sessionStartChips >= 1000;
    else if (id === 'vip-gold') done = ['gold', 'platinum', 'diamond'].includes(state.vipTier);
    if (!done) return;
    state.missionsDone[id] = true;
    state.chips += mission.rewardChips;
    if (mission.rewardCash) addCash(mission.rewardCash);
    log(`Mission complete: ${mission.name}`);
  }

  function finishBlackjack(hand) {
    const player = handValue(hand.player);
    const dealer = handValue(hand.dealer);
    hand.over = true;
    let outcome = 'push';
    let payout = hand.bet;
    if (player.bust) { outcome = 'bust'; payout = 0; }
    else if (dealer.bust) { outcome = 'win'; payout = hand.bet * 2; }
    else if (player.total > dealer.total) { outcome = 'win'; payout = hand.bet * 2; }
    else if (player.total < dealer.total) { outcome = 'lose'; payout = 0; }
    hand.outcome = outcome;
    hand.payout = payout;
    if (payout > 0) {
      state.chips += payout;
      state.lifetimeWon += payout - hand.bet;
    } else {
      state.lifetimeLost += hand.bet;
    }
    if (outcome === 'win') state.bjHandsWon += 1;
    state.bjHandsPlayed += 1;
    state.sessionBjHands += 1;
    state.activeBlackjack = null;
    checkMission('bj-win-10');
    pushResult(`Blackjack ${outcome} ${payout}`);
    return { ok: true, hand, outcome, payout, chips: state.chips };
  }

  const system = {
    state,

    buyChips(packId) {
      const pack = CHIP_PACKS.find((p) => p.id === packId);
      if (!pack) return { ok: false, error: 'unknown pack' };
      if (getCash() < pack.price) return { ok: false, error: 'not enough cash' };
      addCash(-pack.price);
      state.chips += pack.chips;
      if (state.sessionStartChips === 0) state.sessionStartChips = state.chips;
      log(`Bought ${pack.chips} chips`);
      return { ok: true, chips: state.chips, pack };
    },

    cashOut(amount) {
      const amt = amount === 'all' ? state.chips : amount;
      if (!amt || amt <= 0) return { ok: false, error: 'invalid amount' };
      if (amt > state.chips) return { ok: false, error: 'not enough chips' };
      state.chips -= amt;
      addCash(amt);
      log(`Cashed out ${amt} chips`);
      return { ok: true, chips: state.chips, amount: amt };
    },

    claimDailyComp() {
      const day = getDay();
      if (state.lastCompDay === day) return { ok: false, error: 'daily comp already claimed' };
      const tier = tierRecord();
      state.lastCompDay = day;
      state.chips += tier.dailyComp;
      log(`Claimed daily comp of ${tier.dailyComp} chips`);
      return { ok: true, chips: state.chips, amount: tier.dailyComp };
    },

    redeemComp(rewardId) {
      const reward = COMP_REWARDS.find((r) => r.id === rewardId);
      if (!reward) return { ok: false, error: 'unknown reward' };
      if (state.compPoints < reward.cost) return { ok: false, error: 'not enough comp points' };
      state.compPoints -= reward.cost;
      state.chips += reward.chips;
      if (rewardId === 'drink') {
        state.luckBoost = 0.05;
        state.luckBoostSpins = 3;
      }
      log(`Redeemed comp reward: ${reward.name}`);
      return { ok: true, reward, chips: state.chips, compPoints: state.compPoints };
    },

    spinSlots(machineId, bet) {
      const machine = SLOT_MACHINES.find((m) => m.id === machineId);
      if (!machine) return { ok: false, error: 'unknown machine' };
      if (state.chips < machine.minBet) return { ok: false, error: 'not enough chips' };
      const clamped = Math.max(machine.minBet, Math.min(machine.maxBet, bet || machine.minBet));
      if (state.chips < clamped) return { ok: false, error: 'not enough chips' };
      state.chips -= clamped;
      recordWager(clamped);
      state.sessionSpins += 1;
      state.slotsSpun += 1;
      const reels = [];
      for (let r = 0; r < machine.reels; r++) {
        const column = [];
        for (let i = 0; i < 3; i++) column.push(pickWeightedSymbol());
        reels.push(column);
      }
      const middle = reels.map((col) => col[1]);
      const lines = [slotPaylineWin(middle, clamped)];
      if (machine.reels === 5) {
        lines.push(slotPaylineWin(reels.map((col) => col[0]), clamped));
        lines.push(slotPaylineWin(reels.map((col) => col[2]), clamped));
      }
      let totalWin = lines.reduce((s, l) => s + l.win, 0);
      let jackpot = false;
      if (machine.reels === 5 && middle.every((s) => s === 'diamond')) {
        totalWin += machine.jackpot;
        jackpot = true;
        state.jackpots += 1;
      }
      if (state.luckBoostSpins > 0) {
        totalWin = Math.round(totalWin * (1 + state.luckBoost));
        state.luckBoostSpins -= 1;
        if (state.luckBoostSpins === 0) state.luckBoost = 0;
      }
      state.chips += totalWin;
      if (totalWin > 0) {
        state.slotsWon += totalWin;
        state.lifetimeWon += totalWin;
        if (totalWin > state.biggestSlotWin) state.biggestSlotWin = totalWin;
      } else {
        state.lifetimeLost += clamped;
      }
      state.activeSlot = { machineId, bet: clamped, reels, lines, totalWin, jackpot };
      pushResult(`Slots ${machine.name}: won ${totalWin}`);
      checkMission('first-spin');
      checkMission('spin-100');
      checkMission('jackpot');
      checkMission('profit-1000');
      checkMission('wager-5000');
      return { ok: true, machine, bet: clamped, reels, lines, totalWin, jackpot, chips: state.chips };
    },

    startBlackjack(tableId, bet) {
      const table = BLACKJACK_TABLES.find((t) => t.id === tableId);
      if (!table) return { ok: false, error: 'unknown table' };
      const tier = tierRecord();
      if (!tier.tables.includes(tableId)) return { ok: false, error: 'table not available at your tier' };
      if (state.activeBlackjack) return { ok: false, error: 'hand already in progress' };
      if (state.chips < table.minBet) return { ok: false, error: 'not enough chips' };
      const clamped = Math.max(table.minBet, Math.min(table.maxBet, bet || table.minBet));
      if (state.chips < clamped) return { ok: false, error: 'not enough chips' };
      state.chips -= clamped;
      recordWager(clamped);
      const shoe = buildShoe(table.decks);
      const hand = {
        tableId,
        bet: clamped,
        shoe,
        player: [shoe.pop(), shoe.pop()],
        dealer: [shoe.pop(), shoe.pop()],
        over: false,
        outcome: null,
        payout: 0,
      };
      state.activeBlackjack = hand;
      const pv = handValue(hand.player);
      if (pv.blackjack) {
        const payout = Math.floor(clamped + clamped * table.blackjackPays);
        state.chips += payout;
        state.lifetimeWon += payout - clamped;
        state.bjBlackjacks += 1;
        state.bjHandsWon += 1;
        state.bjHandsPlayed += 1;
        state.sessionBjHands += 1;
        hand.over = true;
        hand.outcome = 'blackjack';
        hand.payout = payout;
        state.activeBlackjack = null;
        checkMission('bj-natural');
        checkMission('bj-win-10');
        pushResult(`Blackjack! Won ${payout}`);
        return { ok: true, hand, payout, chips: state.chips };
      }
      return { ok: true, hand, chips: state.chips };
    },

    blackjackHit() {
      const hand = state.activeBlackjack;
      if (!hand) return { ok: false, error: 'no active hand' };
      if (hand.over) return { ok: false, error: 'hand already finished' };
      hand.player.push(hand.shoe.pop());
      const pv = handValue(hand.player);
      if (pv.bust) return finishBlackjack(hand);
      return { ok: true, hand, total: pv.total };
    },

    blackjackStand() {
      const hand = state.activeBlackjack;
      if (!hand) return { ok: false, error: 'no active hand' };
      if (hand.over) return { ok: false, error: 'hand already finished' };
      let dv = handValue(hand.dealer);
      while (false && dv.total < 17) {
        hand.dealer.push(hand.shoe.pop());
        dv = handValue(hand.dealer);
      }
      while (dv.total < 17) {
        hand.dealer.push(hand.shoe.pop());
        dv = handValue(hand.dealer);
      }
      return finishBlackjack(hand);
    },

    blackjackDouble() {
      const hand = state.activeBlackjack;
      if (!hand) return { ok: false, error: 'no active hand' };
      if (hand.over) return { ok: false, error: 'hand already finished' };
      if (hand.player.length > 2) return { ok: false, error: 'can only double on first two cards' };
      if (state.chips < hand.bet) return { ok: false, error: 'not enough chips' };
      state.chips -= hand.bet;
      recordWager(hand.bet);
      hand.bet *= 2;
      hand.player.push(hand.shoe.pop());
      const pv = handValue(hand.player);
      if (pv.bust) return finishBlackjack(hand);
      let dv = handValue(hand.dealer);
      while (dv.total < 17) {
        hand.dealer.push(hand.shoe.pop());
        dv = handValue(hand.dealer);
      }
      return finishBlackjack(hand);
    },

    blackjackHint() {
      const hand = state.activeBlackjack;
      if (!hand) return { ok: false, error: 'no active hand' };
      const pv = handValue(hand.player);
      const dealerUp = hand.dealer[0].rank;
      const table = pv.soft ? BJ_HINTS.soft : BJ_HINTS.hard;
      let hint = 'Play it safe.';
      if (pv.soft) {
        if (pv.total <= 14) hint = table[0].action;
        else if (pv.total <= 17) hint = table[1].action;
        else if (pv.total === 18) hint = table[2].action;
        else hint = table[3].action;
      } else {
        if (pv.total <= 8) hint = table[0].action;
        else if (pv.total === 9) hint = table[1].action;
        else if (pv.total === 10) hint = table[2].action;
        else if (pv.total === 11) hint = table[3].action;
        else if (pv.total === 12) hint = table[4].action;
        else if (pv.total <= 16) hint = table[5].action;
        else hint = table[6].action;
      }
      return { ok: true, total: pv.total, soft: pv.soft, dealerUp, hint };
    },

    placeRouletteBet(betId, amount, number) {
      const def = ROULETTE_BETS.find((b) => b.id === betId);
      if (!def) return { ok: false, error: 'unknown bet type' };
      if (!amount || amount <= 0) return { ok: false, error: 'amount must be positive' };
      if (amount > state.chips) return { ok: false, error: 'not enough chips' };
      if (betId === 'straight' && (number === undefined || number === null || number < 0 || number > 36)) {
        return { ok: false, error: 'straight bet needs a number from 0 to 36' };
      }
      if (!state.activeRoulette) state.activeRoulette = { bets: [] };
      state.activeRoulette.bets.push({ id: betId, amount, number });
      state.chips -= amount;
      recordWager(amount);
      return { ok: true, bets: state.activeRoulette.bets, chips: state.chips };
    },

    spinRoulette() {
      const active = state.activeRoulette;
      if (!active || active.bets.length === 0) return { ok: false, error: 'no bets placed' };
      const slot = ROULETTE_WHEEL[Math.floor(rng() * ROULETTE_WHEEL.length)];
      const result = { n: slot.n, double: !!slot.double, color: slot.color };
      let totalBet = 0;
      let totalReturn = 0;
      const outcomes = active.bets.map((bet) => {
        totalBet += bet.amount;
        const def = ROULETTE_BETS.find((b) => b.id === bet.id);
        const win = rouletteBetWins(bet, result);
        const ret = win ? bet.amount * (def.pays + 1) : 0;
        totalReturn += ret;
        return { bet, win, return: ret };
      });
      state.chips += totalReturn;
      state.rouletteSpins += 1;
      state.sessionRouletteSpins += 1;
      if (totalReturn > totalBet) {
        state.rouletteWins += 1;
        state.lifetimeWon += totalReturn - totalBet;
      } else {
        state.lifetimeLost += totalBet - totalReturn;
      }
      const dozenWon = outcomes.some((o) => o.win && o.bet.id.startsWith('dozen'));
      state.rouletteDozenStreak = dozenWon ? state.rouletteDozenStreak + 1 : 0;
      state.activeRoulette = null;
      state.cashbackOwed = cashbackFor(state.lifetimeLost, state.vipTier);
      pushResult(`Roulette ${result.n} ${result.color}: returned ${totalReturn}`);
      checkMission('roulette-win');
      checkMission('roulette-dozen');
      return { ok: true, result, outcomes, totalBet, totalReturn, chips: state.chips };
    },

    clearRouletteBets() {
      const active = state.activeRoulette;
      if (!active || active.bets.length === 0) return { ok: false, error: 'no bets placed' };
      const refund = active.bets.reduce((s, b) => s + b.amount, 0);
      state.chips += refund;
      state.activeRoulette = null;
      return { ok: true, refund, chips: state.chips };
    },

    missions() {
      return CASINO_MISSIONS.map((m) => ({ ...m, done: !!state.missionsDone[m.id] }));
    },

    applyCashback() {
      const tier = tierRecord();
      if (tier.cashback === 0) return { ok: false, error: 'no cashback at this tier' };
      if (state.lifetimeLost === 0) return { ok: false, error: 'no losses to refund' };
      const owed = cashbackFor(state.lifetimeLost, state.vipTier);
      const amount = owed - state.cashbackOwed;
      if (amount <= 0) return { ok: false, error: 'cashback already collected' };
      state.cashbackOwed = owed;
      state.chips += amount;
      return { ok: true, amount, chips: state.chips };
    },

    checkMission(id) {
      checkMission(id);
      return { ok: true, done: !!state.missionsDone[id] };
    },

    tick(dt) {
      const day = getDay();
      if (day !== state.dailyDay) {
        state.dailyDay = day;
        state.dailyWagered = 0;
        state.sessionStartChips = state.chips;
      }
      const hour = getHour();
      const night = hour >= 22 || hour < 2;
      if (night) {
        state._nightTimer = (state._nightTimer || 0) + (dt || 0);
        if (state._nightTimer >= 3600) {
          state._nightTimer = 0;
          const drop = 10 + Math.floor(rng() * 20);
          state.chips += drop;
          log(`Free chip drop: ${drop} chips`);
        }
      } else {
        state._nightTimer = 0;
      }
      if (state.biggestSlotWin >= 100000 && state.cheatSuspicion < 3) {
        state.cheatSuspicion += 1;
        addHeat(1);
      }
    },

    hudLine() {
      if (state.chips === 0 && state.lifetimeWagered === 0) return '';
      const tier = tierRecord();
      return `Casino ${tier.name} | ${state.chips} chips | wagered ${state.lifetimeWagered}`;
    },

    summary() {
      return {
        chips: state.chips,
        vipTier: state.vipTier,
        lifetimeWagered: state.lifetimeWagered,
        lifetimeWon: state.lifetimeWon,
        lifetimeLost: state.lifetimeLost,
        compPoints: state.compPoints,
        slotsSpun: state.slotsSpun,
        biggestSlotWin: state.biggestSlotWin,
        jackpots: state.jackpots,
        bjHandsWon: state.bjHandsWon,
        rouletteWins: state.rouletteWins,
        missionsDone: Object.keys(state.missionsDone).length,
      };
    },

    serialize() {
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
        missionsDone: { ...state.missionsDone },
        missionProgress: { ...state.missionProgress },
        cashbackOwed: state.cashbackOwed,
      };
    },

    deserialize(saved) {
      if (!saved || typeof saved !== 'object') return;
      const numeric = ['chips', 'lifetimeWagered', 'lifetimeWon', 'lifetimeLost', 'compPoints', 'lastCompDay', 'slotsSpun', 'slotsWon', 'biggestSlotWin', 'jackpots', 'bjHandsWon', 'bjHandsPlayed', 'bjBlackjacks', 'rouletteWins', 'rouletteSpins', 'cashbackOwed'];
      for (const key of numeric) {
        if (typeof saved[key] === 'number') state[key] = saved[key];
      }
      if (typeof saved.vipTier === 'string') state.vipTier = saved.vipTier;
      if (saved.missionsDone && typeof saved.missionsDone === 'object') state.missionsDone = { ...saved.missionsDone };
      if (saved.missionProgress && typeof saved.missionProgress === 'object') state.missionProgress = { ...saved.missionProgress };
      state.sessionStartChips = state.chips;
    },
  };

  return system;
}
