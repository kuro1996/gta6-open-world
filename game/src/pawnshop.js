// Solara Nights — Pawnshop / Crown & Anchor Pawn (Round 7b-B, fresh).
// Behind the marina, under a flickering neon anchor, Ria runs the
// pawnshop the whole bay whispers about. Desperate sailors, broke
// musicians, a bride with a ring she cannot keep — they bring the
// goods, you name a price. Lend sixty percent, charge the interest,
// and wait: redeemed loans pay steady money, forfeited goods go to
// the shelf or the auction block. Spot the fakes, haggle with the
// regulars, keep the cops happy and the books clean, and never, ever
// lend more than the thing is worth. Some items are cursed. Some are
// stolen. All of them have a story, and a price.
// Pure logic: no rendering, no imports. Wired through the standard ctx
// { rng, getDay, getHour, getCash, addCash, addHeat, log, getPlayerPos,
// getSpeed } and driven by tick/tickDay from the main loop.

export const PAWN_CATEGORIES = [
  { id: 'watch', name: 'Watches', baseValue: 220, loanRate: 0.6, interest: 0.15, demand: 0.8, fakeRate: 0.25, desc: 'Gold, steel, ticking, stopped.' },
  { id: 'jewelry', name: 'Jewellery', baseValue: 320, loanRate: 0.6, interest: 0.18, demand: 0.9, fakeRate: 0.3, desc: 'Rings, chains, grandmothers’ pearls.' },
  { id: 'guitar', name: 'Guitars', baseValue: 260, loanRate: 0.55, interest: 0.12, demand: 0.7, fakeRate: 0.05, desc: 'Acoustic, electric, one very sad cello.' },
  { id: 'phone', name: 'Phones', baseValue: 180, loanRate: 0.5, interest: 0.12, demand: 0.85, fakeRate: 0.15, desc: 'Last year’s flagship, cracked or clean.' },
  { id: 'laptop', name: 'Laptops', baseValue: 300, loanRate: 0.55, interest: 0.14, demand: 0.8, fakeRate: 0.1, desc: 'Wiped, locked, or “totally fine”.' },
  { id: 'camera', name: 'Cameras', baseValue: 240, loanRate: 0.55, interest: 0.12, demand: 0.6, fakeRate: 0.12, desc: 'Film bodies and fast glass.' },
  { id: 'console', name: 'Game Consoles', baseValue: 200, loanRate: 0.5, interest: 0.1, demand: 0.75, fakeRate: 0.05, desc: 'With controllers, sometimes with games.' },
  { id: 'bike', name: 'Bicycles', baseValue: 160, loanRate: 0.5, interest: 0.1, demand: 0.65, fakeRate: 0.02, desc: 'Chained, rusty, or suspiciously new.' },
  { id: 'tv', name: 'Televisions', baseValue: 210, loanRate: 0.5, interest: 0.1, demand: 0.6, fakeRate: 0.08, desc: 'Flat, huge, one dead pixel.' },
  { id: 'art', name: 'Art', baseValue: 500, loanRate: 0.5, interest: 0.2, demand: 0.5, fakeRate: 0.4, desc: 'Paintings of the bay. Some are real.' },
  { id: 'coin', name: 'Coins & Bullion', baseValue: 420, loanRate: 0.65, interest: 0.15, demand: 0.9, fakeRate: 0.35, desc: 'Gold coins, silver bars, heavy pockets.' },
  { id: 'tools', name: 'Tools', baseValue: 90, loanRate: 0.5, interest: 0.08, demand: 0.55, fakeRate: 0.02, desc: 'Drills, saws, a whole workshop once.' },
  { id: 'sneakers', name: 'Sneakers', baseValue: 150, loanRate: 0.45, interest: 0.1, demand: 0.7, fakeRate: 0.45, desc: 'Limited drops. Half of them fake.' },
  { id: 'vinyl', name: 'Vinyl & Hi-Fi', baseValue: 130, loanRate: 0.5, interest: 0.1, demand: 0.5, fakeRate: 0.05, desc: 'First pressings and turntables.' },
  { id: 'boat', name: 'Boat Gear', baseValue: 380, loanRate: 0.55, interest: 0.14, demand: 0.6, fakeRate: 0.05, desc: 'Outboards, sails, a brass compass.' },
  { id: 'antique', name: 'Antiques', baseValue: 600, loanRate: 0.5, interest: 0.2, demand: 0.55, fakeRate: 0.5, desc: 'Old, ornate, and probably haunted.' },
];

export const PAWN_CUSTOMERS = [
  { id: 'sailor', name: 'Broke Sailor', patience: 80, haggle: 0.3, honesty: 0.8, desc: 'Paid off, ship gone, watch on the table.' },
  { id: 'musician', name: 'Skint Musician', patience: 100, haggle: 0.5, honesty: 0.9, desc: 'The guitar stays or the rent does not.' },
  { id: 'bride', name: 'Quiet Bride', patience: 60, haggle: 0.2, honesty: 0.95, desc: 'A ring, a story, no eye contact.' },
  { id: 'dealer', name: 'Smooth Dealer', patience: 120, haggle: 0.8, honesty: 0.3, desc: 'Too smooth. Check everything twice.' },
  { id: 'student', name: 'Broke Student', patience: 70, haggle: 0.4, honesty: 0.85, desc: 'Laptop for textbooks. It hurts.' },
  { id: 'collector', name: 'Collector', patience: 140, haggle: 0.6, honesty: 0.7, desc: 'Knows the value to the dollar. So do you.' },
  { id: 'fisher', name: 'Old Fisher', patience: 90, haggle: 0.25, honesty: 0.95, desc: 'His father’s compass. He will be back.' },
  { id: 'tourist', name: 'Flash Tourist', patience: 50, haggle: 0.7, honesty: 0.5, desc: 'Wants cash fast, asks no questions.' },
];

export const PAWN_AUCTIONS = [
  { id: 'friday', name: 'Friday Night Auction', day: 5, fee: 20, bidders: 12, hype: 1.0, desc: 'The weekly crowd, cash in hand.' },
  { id: 'estate', name: 'Estate Sale', day: 0, fee: 50, bidders: 20, hype: 1.4, desc: 'A whole house, one afternoon.' },
  { id: 'midnight', name: 'Midnight Auction', day: 3, fee: 30, bidders: 8, hype: 1.6, desc: 'No questions, high rollers, cash only.' },
  { id: 'charity', name: 'Charity Gala', day: 6, fee: 0, bidders: 25, hype: 1.2, desc: 'Rich guests, good cause, loose wallets.' },
  { id: 'dock', name: 'Dockside Sale', day: 2, fee: 10, bidders: 10, hype: 0.9, desc: 'Boat gear and tools, working crowd.' },
  { id: 'online', name: 'Online Listing', day: 1, fee: 15, bidders: 15, hype: 1.1, desc: 'Photos, bids, shipping. Slow but wide.' },
];

export const PAWN_UPGRADES = [
  { id: 'loupe', name: 'Jeweller Loupe', cost: 150, desc: 'Fake detection +30%.', effect: 'detect-plus' },
  { id: 'safe', name: 'Bigger Safe', cost: 400, desc: 'Hold +10 active loans.', effect: 'loans-plus' },
  { id: 'scale', name: 'Precision Scale', cost: 220, desc: 'Appraisals +10% accurate.', effect: 'appraise-plus' },
  { id: 'camera2', name: 'Security Cameras', cost: 300, desc: 'Fewer stolen goods, fewer police visits.', effect: 'heat-down' },
  { id: 'display', name: 'Glass Display', cost: 350, desc: 'Retail sales +15%.', effect: 'retail-plus' },
  { id: 'ledger', name: 'Digital Ledger', cost: 280, desc: 'Never miss a redemption deadline.', effect: 'deadline-plus' },
  { id: 'expert', name: 'Art Expert Line', cost: 600, desc: 'Art and antiques appraised perfectly.', effect: 'art-perfect' },
  { id: 'vault', name: 'Back Vault', cost: 900, desc: 'High-value storage: +25% auction prices.', effect: 'auction-plus' },
];

export const PAWN_RANKS = [
  { level: 0, name: 'Counter Hand', xp: 0, perk: 'Small loans, small risks.' },
  { level: 1, name: 'Pawnbroker', xp: 150, perk: 'Bigger loans, better eye.' },
  { level: 2, name: 'Shop Keeper', xp: 400, perk: 'Auctions unlock, regulars trust you.' },
  { level: 3, name: 'Bay Trader', xp: 800, perk: 'High-value goods, midnight auctions.' },
  { level: 4, name: 'King of the Anchor', xp: 1500, perk: 'The shop is legend. Prices follow you.' },
];

export const PAWN_STAFF = [
  { id: 'appraiser', name: 'Old Gus', role: 'Appraiser', wage: 50, skill: 'appraise', value: 0.25, desc: 'Fifty years. Spots a fake by smell.' },
  { id: 'guard', name: 'Guard Ray', role: 'Security', wage: 45, skill: 'security', value: 0.3, desc: 'Big, calm, and always watching the door.' },
  { id: 'clerk', name: 'Clerk June', role: 'Clerk', wage: 35, skill: 'service', value: 0.2, desc: 'Sweet with customers, sharp with numbers.' },
  { id: 'auctioneer', name: 'Auctioneer Vic', role: 'Auctioneer', wage: 70, skill: 'auction', value: 0.25, desc: 'Could sell sand to the beach.' },
];

export const PAWN_ITEMS_POOL = [
  { name: 'Gold diver watch', category: 'watch', condition: 0.9 },
  { name: 'Steel chronograph', category: 'watch', condition: 0.7 },
  { name: 'Pearl necklace', category: 'jewelry', condition: 0.85 },
  { name: 'Diamond ring', category: 'jewelry', condition: 0.95 },
  { name: 'Sunburst acoustic', category: 'guitar', condition: 0.8 },
  { name: 'Bass guitar', category: 'guitar', condition: 0.6 },
  { name: 'Flagship phone', category: 'phone', condition: 0.75 },
  { name: 'Cracked phone', category: 'phone', condition: 0.4 },
  { name: 'Gaming laptop', category: 'laptop', condition: 0.85 },
  { name: 'Old ultrabook', category: 'laptop', condition: 0.5 },
  { name: 'Film camera', category: 'camera', condition: 0.8 },
  { name: 'DSLR body', category: 'camera', condition: 0.7 },
  { name: 'Game console', category: 'console', condition: 0.9 },
  { name: 'Retro console', category: 'console', condition: 0.6 },
  { name: 'Road bike', category: 'bike', condition: 0.75 },
  { name: 'Mountain bike', category: 'bike', condition: 0.65 },
  { name: '65-inch TV', category: 'tv', condition: 0.8 },
  { name: 'Bay oil painting', category: 'art', condition: 0.7 },
  { name: 'Gold sovereign', category: 'coin', condition: 0.95 },
  { name: 'Silver bar', category: 'coin', condition: 0.9 },
  { name: 'Drill set', category: 'tools', condition: 0.7 },
  { name: 'Limited sneakers', category: 'sneakers', condition: 0.95 },
  { name: 'First-press vinyl', category: 'vinyl', condition: 0.8 },
  { name: 'Turntable', category: 'vinyl', condition: 0.65 },
  { name: 'Outboard motor', category: 'boat', condition: 0.7 },
  { name: 'Brass compass', category: 'boat', condition: 0.9 },
  { name: 'Porcelain vase', category: 'antique', condition: 0.75 },
  { name: 'Oak writing desk', category: 'antique', condition: 0.6 },
];

export function pawnRankFor(xp) {
  let rank = 0;
  for (let i = 0; i < PAWN_RANKS.length; i++) {
    if (xp >= PAWN_RANKS[i].xp) rank = i;
  }
  return rank;
}

export function pawnAppraiseValue(item, upgrades) {
  const cat = PAWN_CATEGORIES.find((x) => x.id === item.category);
  if (!cat) return 0;
  let value = cat.baseValue * item.condition;
  value *= 0.85 + item.quality * 0.3;
  if (upgrades.includes('scale')) value *= 1.1;
  if (upgrades.includes('expert') && (item.category === 'art' || item.category === 'antique')) value *= 1.15;
  return Math.round(value);
}

export function pawnLoanFor(value, categoryId) {
  const cat = PAWN_CATEGORIES.find((x) => x.id === categoryId);
  if (!cat) return Math.round(value * 0.5);
  return Math.round(value * cat.loanRate);
}

export function pawnRedemptionFor(loan, categoryId, daysHeld) {
  const cat = PAWN_CATEGORIES.find((x) => x.id === categoryId);
  const rate = cat ? cat.interest : 0.12;
  const interest = Math.round(loan * rate * (1 + daysHeld * 0.02));
  return loan + interest;
}

export function pawnRetailPrice(value, rank, upgrades) {
  let price = value * 1.25;
  price *= 1 + rank * 0.05;
  if (upgrades.includes('display')) price *= 1.15;
  return Math.round(price);
}

export function pawnAuctionPrice(value, auction, upgrades, hype) {
  let price = value * auction.hype * hype;
  price *= 0.9 + Math.random() * 0.3;
  if (upgrades.includes('vault')) price *= 1.25;
  return Math.round(price);
}

export function createPawnshopSystem(ctx) {
  const c = ctx || {};
  const rng = typeof c.rng === 'function' ? c.rng : Math.random;
  const getCash = typeof c.getCash === 'function' ? c.getCash : () => 0;
  const addCash = typeof c.addCash === 'function' ? c.addCash : () => {};
  const addHeat = typeof c.addHeat === 'function' ? c.addHeat : () => {};
  const log = typeof c.log === 'function' ? c.log : () => {};
  const getDay = typeof c.getDay === 'function' ? c.getDay : () => 1;
  const getHour = typeof c.getHour === 'function' ? c.getHour : () => 12;
  const getPos = typeof c.getPlayerPos === 'function' ? c.getPlayerPos : () => ({ x: 0, z: 0 });

  const state = {
    xp: 0,
    rank: 0,
    owned: false,
    open: false,
    loans: [],
    inventory: [],
    sold: 0,
    earned: 0,
    spent: 0,
    loansMade: 0,
    loansRedeemed: 0,
    loansForfeited: 0,
    interestEarned: 0,
    retailSales: 0,
    auctionSales: 0,
    auctionRevenue: 0,
    fakesCaught: 0,
    fakesMissed: 0,
    stolenRefused: 0,
    haggleWins: 0,
    haggleLosses: 0,
    upgrades: [],
    staff: [],
    reputation: 50,
    heat: 0,
    customer: null,
    customerItem: null,
    appraisedValue: 0,
    offerMade: 0,
    auction: null,
    auctionItem: null,
    auctionBids: 0,
    auctionHigh: 0,
    lastDay: 1,
    dailyLoans: 0,
    dailySales: 0,
    bestSale: 0,
    bestSaleItem: null,
    regulars: 0,
    complaints: 0,
    compliments: 0,
    loanCap: 10,
    cashInVault: 0,
  };

  function refreshRank() {
    const r = pawnRankFor(state.xp);
    if (r > state.rank) {
      state.rank = r;
      log(`Pawnshop rank up: ${PAWN_RANKS[r].name} — ${PAWN_RANKS[r].perk}`);
    }
  }

  function gainXp(n) {
    state.xp += n;
    refreshRank();
  }

  function rep(delta) {
    state.reputation = Math.max(0, Math.min(100, state.reputation + delta));
  }

  function buyShop() {
    if (state.owned) return { ok: false, reason: 'already-owned' };
    const cost = 2500;
    if (getCash() < cost) return { ok: false, reason: 'not-enough-cash', cost };
    addCash(-cost);
    state.spent += cost;
    state.owned = true;
    log('You bought the Crown & Anchor pawnshop. The neon anchor buzzes back to life.');
    return { ok: true, cost };
  }

  function openShop() {
    if (!state.owned) return { ok: false, reason: 'not-owned' };
    if (state.open) return { ok: false, reason: 'already-open' };
    state.open = true;
    log('Pawnshop open. The bell over the door rings for the first customer.');
    return { ok: true };
  }

  function closeShop() {
    if (!state.open) return { ok: false, reason: 'not-open' };
    state.open = false;
    state.customer = null;
    state.customerItem = null;
    log(`Closed. ${state.loans.length} loans on the books, ${state.inventory.length} items on the shelves.`);
    return { ok: true };
  }

  function newCustomer() {
    if (!state.open) return { ok: false, reason: 'not-open' };
    if (state.customer) return { ok: false, reason: 'customer-waiting' };
    const type = PAWN_CUSTOMERS[Math.floor(rng() * PAWN_CUSTOMERS.length)];
    const pool = PAWN_ITEMS_POOL[Math.floor(rng() * PAWN_ITEMS_POOL.length)];
    const isFake = rng() < PAWN_CATEGORIES.find((x) => x.id === pool.category).fakeRate;
    const isStolen = rng() < 0.08;
    const item = {
      name: pool.name, category: pool.category,
      condition: pool.condition,
      quality: 0.5 + rng() * 0.5,
      fake: isFake, stolen: isStolen,
      id: `item-${getDay()}-${state.loansMade + state.sold + 1}`,
    };
    state.customer = type.id;
    state.customerItem = item;
    state.appraisedValue = pawnAppraiseValue(item, state.upgrades);
    state.offerMade = 0;
    log(`${type.name} walks in with a ${item.name}.`);
    return { ok: true, customer: type.id, item: { name: item.name, category: item.category, condition: item.condition } };
  }

  function appraise() {
    if (!state.customerItem) return { ok: false, reason: 'no-customer' };
    const item = state.customerItem;
    const cat = PAWN_CATEGORIES.find((x) => x.id === item.category);
    let detect = 0.4 + state.rank * 0.1;
    if (state.upgrades.includes('loupe')) detect += 0.3;
    if (state.staff.includes('appraiser')) detect += 0.25;
    const fakeSpotted = item.fake && rng() < detect;
    const stolenSpotted = item.stolen && rng() < detect;
    const value = pawnAppraiseValue(item, state.upgrades);
    state.appraisedValue = value;
    return {
      ok: true, value, category: item.category,
      fake: fakeSpotted ? true : undefined,
      stolen: stolenSpotted ? true : undefined,
      hint: fakeSpotted ? 'This looks fake.' : stolenSpotted ? 'This looks stolen.' : 'Looks genuine.',
    };
  }

  function offerLoan(amount) {
    if (!state.customerItem) return { ok: false, reason: 'no-customer' };
    const item = state.customerItem;
    if (item.fake) {
      state.fakesCaught += 1;
      rep(2);
      log('You call out the fake. The customer leaves fast, empty-handed.');
      state.customer = null;
      state.customerItem = null;
      return { ok: false, reason: 'item-is-fake' };
    }
    if (item.stolen) {
      state.stolenRefused += 1;
      rep(3);
      log('Stolen goods — you refuse. The police will hear about this one.');
      state.customer = null;
      state.customerItem = null;
      return { ok: false, reason: 'item-is-stolen' };
    }
    const fair = pawnLoanFor(state.appraisedValue, item.category);
    if (amount > fair * 1.2) return { ok: false, reason: 'offer-too-high', fair };
    if (amount <= 0) return { ok: false, reason: 'bad-amount' };
    if (getCash() < amount) return { ok: false, reason: 'not-enough-cash', need: amount };
    if (state.loans.length >= state.loanCap + (state.upgrades.includes('safe') ? 10 : 0)) {
      return { ok: false, reason: 'loan-cap' };
    }
    const type = PAWN_CUSTOMERS.find((x) => x.id === state.customer);
    const acceptChance = 0.5 + (amount / fair) * 0.5 - type.haggle * 0.2;
    if (rng() > acceptChance) {
      state.haggleLosses += 1;
      log(`${type.name} shakes their head — too low. They want closer to $${fair}.`);
      return { ok: false, reason: 'offer-refused', fair };
    }
    addCash(-amount);
    state.spent += amount;
    state.loansMade += 1;
    state.dailyLoans += 1;
    const loan = {
      id: item.id, name: item.name, category: item.category,
      condition: item.condition, quality: item.quality,
      principal: amount, value: state.appraisedValue,
      dayTaken: getDay(), deadlineDay: getDay() + 30,
      customer: state.customer,
    };
    state.loans.push(loan);
    state.haggleWins += 1;
    gainXp(12);
    log(`Loan made: $${amount} on the ${item.name}. Thirty days, then it is yours or theirs.`);
    state.customer = null;
    state.customerItem = null;
    state.appraisedValue = 0;
    return { ok: true, loan };
  }

  function haggleOffer() {
    if (!state.customerItem) return { ok: false, reason: 'no-customer' };
    const type = PAWN_CUSTOMERS.find((x) => x.id === state.customer);
    const fair = pawnLoanFor(state.appraisedValue, state.customerItem.category);
    const roll = rng();
    if (roll < 0.45 + state.rank * 0.05) {
      state.haggleWins += 1;
      const better = Math.round(fair * 0.9);
      state.offerMade = better;
      return { ok: true, haggled: true, offer: better, fair };
    }
    state.haggleLosses += 1;
    return { ok: true, haggled: false, offer: fair, fair };
  }

  function redeemLoan(loanId) {
    const idx = state.loans.findIndex((l) => l.id === loanId);
    if (idx < 0) return { ok: false, reason: 'no-such-loan' };
    const loan = state.loans[idx];
    const daysHeld = getDay() - loan.dayTaken;
    const due = pawnRedemptionFor(loan.principal, loan.category, daysHeld);
    state.loans.splice(idx, 1);
    state.loansRedeemed += 1;
    state.interestEarned += due - loan.principal;
    state.earned += due;
    addCash(due);
    gainXp(15);
    rep(2);
    log(`${loan.name} redeemed for $${due} (interest $${due - loan.principal}).`);
    return { ok: true, due, interest: due - loan.principal };
  }

  function forfeitLoan(loanId) {
    const idx = state.loans.findIndex((l) => l.id === loanId);
    if (idx < 0) return { ok: false, reason: 'no-such-loan' };
    const loan = state.loans[idx];
    state.loans.splice(idx, 1);
    state.loansForfeited += 1;
    state.inventory.push({
      id: loan.id, name: loan.name, category: loan.category,
      condition: loan.condition, quality: loan.quality, value: loan.value,
    });
    gainXp(8);
    log(`Loan forfeited: the ${loan.name} is yours now. Shelf or auction?`);
    return { ok: true, item: loan.name };
  }

  function sellRetail(itemId) {
    const idx = state.inventory.findIndex((i) => i.id === itemId);
    if (idx < 0) return { ok: false, reason: 'no-such-item' };
    const item = state.inventory[idx];
    const price = pawnRetailPrice(item.value, state.rank, state.upgrades);
    const cat = PAWN_CATEGORIES.find((x) => x.id === item.category);
    const sellChance = 0.5 + cat.demand * 0.4 + state.rank * 0.03;
    if (rng() > sellChance) return { ok: false, reason: 'no-buyer-today', price };
    state.inventory.splice(idx, 1);
    state.retailSales += 1;
    state.sold += 1;
    state.dailySales += 1;
    state.earned += price;
    addCash(price);
    gainXp(10);
    if (price > state.bestSale) { state.bestSale = price; state.bestSaleItem = item.name; }
    log(`Sold the ${item.name} over the counter for $${price}.`);
    return { ok: true, price, item: item.name };
  }

  function startAuction(auctionId, itemId) {
    const auc = PAWN_AUCTIONS.find((a) => a.id === auctionId);
    if (!auc) return { ok: false, reason: 'no-such-auction' };
    if (state.auction) return { ok: false, reason: 'auction-active' };
    const idx = state.inventory.findIndex((i) => i.id === itemId);
    if (idx < 0) return { ok: false, reason: 'no-such-item' };
    if (getCash() < auc.fee) return { ok: false, reason: 'not-enough-cash', cost: auc.fee };
    addCash(-auc.fee);
    state.spent += auc.fee;
    const item = state.inventory[idx];
    state.inventory.splice(idx, 1);
    state.auction = { id: auc.id, bidders: auc.bidders, hype: auc.hype };
    state.auctionItem = item;
    state.auctionBids = 0;
    state.auctionHigh = Math.round(item.value * 0.8);
    log(`Auction lot: the ${item.name} goes under the hammer at the ${auc.name}.`);
    return { ok: true, item: item.name, start: state.auctionHigh };
  }

  function auctionBid() {
    if (!state.auction || !state.auctionItem) return { ok: false, reason: 'no-auction' };
    const item = state.auctionItem;
    const step = Math.round(item.value * (0.05 + rng() * 0.15));
    state.auctionHigh += step;
    state.auctionBids += 1;
    const staffBonus = state.staff.includes('auctioneer') ? 1.25 : 1;
    if (rng() < 0.3) {
      state.auctionHigh = Math.round(state.auctionHigh * staffBonus);
      return { ok: true, bids: state.auctionBids, high: state.auctionHigh, note: 'A bidding war!' };
    }
    return { ok: true, bids: state.auctionBids, high: state.auctionHigh };
  }

  function closeAuction() {
    if (!state.auction || !state.auctionItem) return { ok: false, reason: 'no-auction' };
    const item = state.auctionItem;
    const final = Math.round(state.auctionHigh * (0.95 + rng() * 0.15) * (state.upgrades.includes('vault') ? 1.25 : 1));
    state.auctionSales += 1;
    state.auctionRevenue += final;
    state.sold += 1;
    state.dailySales += 1;
    state.earned += final;
    addCash(final);
    gainXp(20);
    if (final > state.bestSale) { state.bestSale = final; state.bestSaleItem = item.name; }
    log(`SOLD! The ${item.name} goes for $${final} at the ${state.auction.id} auction.`);
    state.auction = null;
    state.auctionItem = null;
    state.auctionBids = 0;
    state.auctionHigh = 0;
    return { ok: true, price: final, item: item.name };
  }

  function buyUpgrade(id) {
    const u = PAWN_UPGRADES.find((x) => x.id === id);
    if (!u) return { ok: false, reason: 'no-such-upgrade' };
    if (state.upgrades.includes(id)) return { ok: false, reason: 'already-owned' };
    if (!state.owned) return { ok: false, reason: 'not-owned' };
    if (getCash() < u.cost) return { ok: false, reason: 'not-enough-cash', cost: u.cost };
    addCash(-u.cost);
    state.spent += u.cost;
    state.upgrades.push(id);
    if (id === 'safe') state.loanCap += 10;
    gainXp(20);
    log(`Bought ${u.name} for $${u.cost}.`);
    return { ok: true, id };
  }

  function hireStaff(id) {
    const s = PAWN_STAFF.find((x) => x.id === id);
    if (!s) return { ok: false, reason: 'no-such-staff' };
    if (state.staff.includes(id)) return { ok: false, reason: 'already-hired' };
    state.staff.push(id);
    log(`Hired ${s.name} (${s.role}) — $${s.wage}/day.`);
    return { ok: true, id };
  }

  function fireStaff(id) {
    const i = state.staff.indexOf(id);
    if (i < 0) return { ok: false, reason: 'not-hired' };
    state.staff.splice(i, 1);
    return { ok: true, id };
  }

  function refuseCustomer() {
    if (!state.customer) return { ok: false, reason: 'no-customer' };
    log(`You wave off the ${state.customer}. The bell rings as they leave.`);
    state.customer = null;
    state.customerItem = null;
    state.appraisedValue = 0;
    return { ok: true };
  }

  function tick(dt) {
    if (!state.open) return;
    if (!state.customer && rng() < dt * 0.03) {
      newCustomer();
    }
    if (state.customerItem && rng() < dt * 0.002) {
      const type = PAWN_CUSTOMERS.find((x) => x.id === state.customer);
      log(`${type.name} taps their foot — they do not have all day.`);
    }
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyLoans = 0;
    state.dailySales = 0;
    let wages = 0;
    for (const id of state.staff) {
      const s = PAWN_STAFF.find((x) => x.id === id);
      wages += s.wage;
    }
    if (wages > 0) {
      state.spent += wages;
      addCash(-wages);
      log(`Staff wages paid: $${wages}.`);
    }
    let expired = 0;
    for (let i = state.loans.length - 1; i >= 0; i--) {
      const loan = state.loans[i];
      if (day >= loan.deadlineDay) {
        state.loans.splice(i, 1);
        state.loansForfeited += 1;
        state.inventory.push({
          id: loan.id, name: loan.name, category: loan.category,
          condition: loan.condition, quality: loan.quality, value: loan.value,
        });
        expired += 1;
        gainXp(5);
      }
    }
    if (expired > 0) log(`${expired} loan(s) expired — goods moved to the shelves.`);
    if (rng() < 0.1) {
      const cat = PAWN_CATEGORIES[Math.floor(rng() * PAWN_CATEGORIES.length)];
      log(`Market buzz: ${cat.name} is hot today. Buyers are asking.`);
    }
    if (state.heat > 0) {
      state.heat = Math.max(0, state.heat - 1);
    }
  }

  function serialize() {
    return JSON.parse(JSON.stringify({
      xp: state.xp, rank: state.rank, owned: state.owned, open: state.open,
      loans: state.loans, inventory: state.inventory, sold: state.sold,
      earned: state.earned, spent: state.spent,
      loansMade: state.loansMade, loansRedeemed: state.loansRedeemed,
      loansForfeited: state.loansForfeited,
      interestEarned: state.interestEarned,
      retailSales: state.retailSales, auctionSales: state.auctionSales,
      auctionRevenue: state.auctionRevenue,
      fakesCaught: state.fakesCaught, fakesMissed: state.fakesMissed,
      stolenRefused: state.stolenRefused,
      haggleWins: state.haggleWins, haggleLosses: state.haggleLosses,
      upgrades: state.upgrades, staff: state.staff,
      reputation: state.reputation, heat: state.heat,
      customer: state.customer, customerItem: state.customerItem,
      appraisedValue: state.appraisedValue, offerMade: state.offerMade,
      auction: state.auction, auctionItem: state.auctionItem,
      auctionBids: state.auctionBids, auctionHigh: state.auctionHigh,
      lastDay: state.lastDay, dailyLoans: state.dailyLoans,
      dailySales: state.dailySales, bestSale: state.bestSale,
      bestSaleItem: state.bestSaleItem, regulars: state.regulars,
      complaints: state.complaints, compliments: state.compliments,
      loanCap: state.loanCap, cashInVault: state.cashInVault,
    }));
  }

  function deserialize(d) {
    if (!d || typeof d !== 'object') return;
    for (const k of Object.keys(state)) {
      if (d[k] !== undefined) state[k] = d[k];
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: PAWN_RANKS[state.rank].name,
      xp: state.xp,
      owned: state.owned,
      open: state.open,
      reputation: state.reputation,
      loans: state.loans.length,
      inventory: state.inventory.length,
      sold: state.sold,
      earned: Math.round(state.earned),
      spent: state.spent,
      loansMade: state.loansMade,
      loansRedeemed: state.loansRedeemed,
      loansForfeited: state.loansForfeited,
      interestEarned: Math.round(state.interestEarned),
      retailSales: state.retailSales,
      auctionSales: state.auctionSales,
      auctionRevenue: Math.round(state.auctionRevenue),
      fakesCaught: state.fakesCaught,
      fakesMissed: state.fakesMissed,
      stolenRefused: state.stolenRefused,
      haggleWins: state.haggleWins,
      haggleLosses: state.haggleLosses,
      upgrades: state.upgrades.length,
      staff: state.staff.length,
      bestSale: state.bestSale,
      bestSaleItem: state.bestSaleItem,
      customer: state.customer,
      auction: state.auction ? state.auction.id : null,
      loanCap: state.loanCap,
    };
  }

  function hudLine() {
    if (!state.owned) return '';
    if (state.customer) return `Pawnshop: ${state.customer} waiting — appraise the ${state.customerItem ? state.customerItem.name : 'item'}`;
    if (state.auction) return `Pawnshop: auction live — ${state.auctionItem.name} at $${state.auctionHigh} (${state.auctionBids} bids)`;
    if (state.loans.length > 0) return `Pawnshop: ${state.loans.length} loans out, ${state.inventory.length} items shelved`;
    return '';
  }

  function interact() {
    const pos = getPos();
    const nearShop = Math.hypot(pos.x - 140, pos.z + 60) < 25;
    if (!nearShop) return false;
    if (!state.owned) { buyShop(); return true; }
    if (!state.open) { openShop(); return true; }
    if (!state.customer) { newCustomer(); return true; }
    return false;
  }

  function loanBook() {
    return state.loans.map((l) => ({
      id: l.id, name: l.name, principal: l.principal,
      due: pawnRedemptionFor(l.principal, l.category, getDay() - l.dayTaken),
      deadlineDay: l.deadlineDay, daysLeft: l.deadlineDay - getDay(),
    }));
  }

  function shelfList() {
    return state.inventory.map((i) => ({
      id: i.id, name: i.name, category: i.category,
      retail: pawnRetailPrice(i.value, state.rank, state.upgrades),
    }));
  }

  return {
    state, buyShop, openShop, closeShop, newCustomer, appraise,
    offerLoan, haggleOffer, redeemLoan, forfeitLoan, sellRetail,
    startAuction, auctionBid, closeAuction, buyUpgrade, hireStaff,
    fireStaff, refuseCustomer, tick, tickDay, serialize, deserialize,
    stats, hudLine, interact, loanBook, shelfList,
  };
}

export const PAWN_SCAMS = [
  { id: 'gold-plated', name: 'Gold-Plated Lead', category: 'jewelry', tell: 'Too light, too perfect.', desc: 'Lead core under thin gold.' },
  { id: 'fake-rolex', name: 'Fake Chronograph', category: 'watch', tell: 'The second hand stutters.', desc: 'A copy with a cheap movement.' },
  { id: 'print-art', name: 'Print as Painting', category: 'art', tell: 'No brush texture under the loupe.', desc: 'An inkjet print in an old frame.' },
  { id: 'fake-sneakers', name: 'Replica Sneakers', category: 'sneakers', tell: 'Stitching is wrong on the heel.', desc: 'Good fakes, wrong factory.' },
  { id: 'tungsten-coin', name: 'Tungsten Coin', category: 'coin', tell: 'Rings wrong when dropped.', desc: 'Tungsten core, gold shell.' },
];

export function pawnScamTell(scamId) {
  const s = PAWN_SCAMS.find((x) => x.id === scamId);
  return s ? s.tell : 'Nothing obvious.';
}

export function pawnDetectChance(rank, upgrades, staff) {
  let chance = 0.4 + rank * 0.1;
  if (upgrades.includes('loupe')) chance += 0.3;
  if (staff.includes('appraiser')) chance += 0.25;
  return Math.min(0.98, chance);
}

export function pawnWeeklyReport(loansMade, redeemed, forfeited, retail, auctions) {
  const loanProfit = redeemed * 25;
  const total = loanProfit + retail + auctions;
  return { loansMade, redeemed, forfeited, retail, auctions, loanProfit, total };
}

export function pawnReputationTier(reputation) {
  if (reputation >= 90) return 'Beloved Broker';
  if (reputation >= 70) return 'Trusted Trader';
  if (reputation >= 50) return 'Fair Dealer';
  if (reputation >= 30) return 'Shady Shop';
  return 'Fence';
}

export const PAWN_COLLECTIONS = [
  { id: 'watch-set', name: 'Watch Collection', items: ['watch', 'watch', 'watch'], bonus: 1.3, desc: 'Three watches, one buyer, a premium.' },
  { id: 'gold-set', name: 'Gold Hoard', items: ['jewelry', 'coin', 'coin'], bonus: 1.35, desc: 'Gold in every form.' },
  { id: 'music-set', name: 'Musician Kit', items: ['guitar', 'vinyl', 'vinyl'], bonus: 1.25, desc: 'A whole studio in a box.' },
  { id: 'tech-set', name: 'Tech Bundle', items: ['phone', 'laptop', 'console'], bonus: 1.2, desc: 'Everything with a screen.' },
  { id: 'sea-set', name: 'Sailor Chest', items: ['boat', 'boat', 'antique'], bonus: 1.3, desc: 'The sea, boxed up.' },
  { id: 'art-set', name: 'Gallery Lot', items: ['art', 'art', 'antique'], bonus: 1.4, desc: 'Two paintings and a vase.' },
];

export const PAWN_REGULATIONS = [
  { id: 'id-check', name: 'ID Checks', cost: 0, desc: 'Always record ID. No exceptions.' },
  { id: 'hold-7', name: 'Seven-Day Hold', cost: 0, desc: 'New goods wait seven days before sale.' },
  { id: 'police-list', name: 'Police List', cost: 0, desc: 'Check every item against the stolen list.' },
  { id: 'max-interest', name: 'Interest Cap', cost: 0, desc: 'Never charge above the legal cap.' },
  { id: 'receipt', name: 'Receipts Always', cost: 0, desc: 'Every deal gets paper.' },
  { id: 'age-check', name: 'Age Checks', cost: 0, desc: 'No loans to minors. Ever.' },
];

export const PAWN_BUYERS = [
  { id: 'collector-ana', name: 'Collector Ana', wants: ['art', 'antique'], mult: 1.4, desc: 'Pays over the odds for real art.' },
  { id: 'dealer-moss', name: 'Dealer Moss', wants: ['watch', 'jewelry', 'coin'], mult: 1.3, desc: 'Gold and watches, cash today.' },
  { id: 'gamer-kid', name: 'Gamer Kid', wants: ['console', 'phone', 'laptop'], mult: 1.15, desc: 'Tech, any condition, quick sale.' },
  { id: 'sailor-bob', name: 'Sailor Bob', wants: ['boat', 'tools'], mult: 1.2, desc: 'Boat gear and tools, no questions.' },
  { id: 'dj-neon', name: 'DJ Neon', wants: ['vinyl', 'guitar'], mult: 1.25, desc: 'Vinyl and instruments for the studio.' },
  { id: 'pawn-king', name: 'The Pawn King', wants: ['watch', 'art', 'coin', 'antique'], mult: 1.5, desc: 'The big buyer. Rare visits, huge money.' },
];

export function pawnCollectionBonus(setId, inventory) {
  const set = PAWN_COLLECTIONS.find((x) => x.id === setId);
  if (!set) return 1;
  const counts = {};
  for (const item of inventory) {
    counts[item.category] = (counts[item.category] || 0) + 1;
  }
  for (const need of set.items) {
    if ((counts[need] || 0) <= 0) return 1;
    counts[need] -= 1;
  }
  return set.bonus;
}

export function pawnBuyerFor(categoryId) {
  return PAWN_BUYERS.filter((b) => b.wants.includes(categoryId));
}

export function pawnBuyerPrice(value, buyerId) {
  const b = PAWN_BUYERS.find((x) => x.id === buyerId);
  if (!b) return value;
  return Math.round(value * b.mult);
}

export function createPawnCollections(system) {
  const setsSold = [];
  let setsRevenue = 0;

  function checkSets() {
    const ready = [];
    for (const set of PAWN_COLLECTIONS) {
      const bonus = pawnCollectionBonus(set.id, system.state.inventory);
      if (bonus > 1) ready.push({ id: set.id, name: set.name, bonus });
    }
    return ready;
  }

  function sellSet(setId, buyerId) {
    const set = PAWN_COLLECTIONS.find((x) => x.id === setId);
    if (!set) return { ok: false, reason: 'no-such-set' };
    const bonus = pawnCollectionBonus(setId, system.state.inventory);
    if (bonus <= 1) return { ok: false, reason: 'set-incomplete' };
    const buyer = PAWN_BUYERS.find((b) => b.id === buyerId);
    let total = 0;
    const used = [];
    const counts = {};
    for (const item of system.state.inventory) {
      counts[item.category] = counts[item.category] || [];
      counts[item.category].push(item);
    }
    for (const need of set.items) {
      const item = counts[need].shift();
      if (!item) return { ok: false, reason: 'set-incomplete' };
      total += pawnRetailPrice(item.value, system.state.rank, system.state.upgrades);
      used.push(item.id);
    }
    total = Math.round(total * bonus * (buyer ? buyer.mult : 1));
    system.state.inventory = system.state.inventory.filter((i) => !used.includes(i.id));
    system.state.earned += total;
    system.state.sold += used.length;
    setsSold.push(setId);
    setsRevenue += total;
    return { ok: true, set: setId, total, items: used.length, bonus };
  }

  function record() {
    return { setsSold: [...setsSold], setsRevenue, ready: checkSets() };
  }

  return { checkSets, sellSet, record };
}

export const PAWN_DAILY_DEALS = [
  { id: 'watch-day', name: 'Watch Day', category: 'watch', mult: 1.2, desc: 'Watches sell 20% better today.' },
  { id: 'gold-day', name: 'Gold Day', category: 'coin', mult: 1.25, desc: 'Gold is hot today.' },
  { id: 'tech-day', name: 'Tech Day', category: 'laptop', mult: 1.15, desc: 'Students are buying laptops.' },
  { id: 'music-day', name: 'Music Day', category: 'guitar', mult: 1.2, desc: 'A festival is coming. Guitars move.' },
  { id: 'art-day', name: 'Art Day', category: 'art', mult: 1.3, desc: 'A gallery opening drives demand.' },
  { id: 'boat-day', name: 'Boat Day', category: 'boat', mult: 1.2, desc: 'Sailing season starts.' },
];

export const PAWN_LOAN_TERMS = [
  { id: 'week', name: 'One Week', days: 7, interest: 0.05, desc: 'Quick loan, small interest.' },
  { id: 'month', name: 'One Month', days: 30, interest: 0.15, desc: 'The standard term.' },
  { id: 'quarter', name: 'Three Months', days: 90, interest: 0.35, desc: 'Long term, big interest, big risk.' },
];

export function pawnDailyDealFor(day) {
  return PAWN_DAILY_DEALS[day % PAWN_DAILY_DEALS.length];
}

export function pawnDealMult(dealId, categoryId) {
  const deal = PAWN_DAILY_DEALS.find((x) => x.id === dealId);
  if (!deal) return 1;
  return deal.category === categoryId ? deal.mult : 1;
}

export function pawnTermInterest(termId, principal) {
  const term = PAWN_LOAN_TERMS.find((x) => x.id === termId);
  if (!term) return principal;
  return Math.round(principal * (1 + term.interest));
}

export function pawnShopValue(inventory) {
  let total = 0;
  for (const item of inventory) {
    total += item.value || 0;
  }
  return total;
}

export function pawnLoanBookValue(loans) {
  let total = 0;
  for (const loan of loans) {
    total += loan.principal || 0;
  }
  return total;
}

export function pawnNetWorth(inventory, loans, cash) {
  return pawnShopValue(inventory) + pawnLoanBookValue(loans) + cash;
}

export const PAWN_TIPS = [
  { id: 'loupe-first', name: 'Loupe First', text: 'Buy the loupe before the safe. Fakes cost more.' },
  { id: 'know-value', name: 'Know the Value', text: 'Appraise before you offer. Every time.' },
  { id: 'lowball-kind', name: 'Lowball Kindly', text: 'A fair low offer keeps the customer coming back.' },
  { id: 'stolen-never', name: 'Stolen Never', text: 'Stolen goods cost more than they pay. Refuse.' },
  { id: 'sets-sell', name: 'Sets Sell', text: 'Three matching pieces beat three singles.' },
  { id: 'auction-friday', name: 'Friday Auctions', text: 'The Friday crowd pays the most.' },
  { id: 'gold-watch', name: 'Watch Gold', text: 'Gold prices move daily. Check before you lend.' },
  { id: 'receipt-always', name: 'Receipts Always', text: 'Paper protects you. Paper protects them.' },
];

export const PAWN_AWARDS = [
  { id: 'first-hundred', name: 'First Hundred', need: 'loansMade', goal: 100, desc: 'Make 100 loans.' },
  { id: 'fake-hunter', name: 'Fake Hunter', need: 'fakesCaught', goal: 20, desc: 'Catch 20 fakes.' },
  { id: 'auction-king', name: 'Auction King', need: 'auctionSales', goal: 25, desc: 'Sell 25 lots at auction.' },
  { id: 'big-sale', name: 'Big Sale', need: 'bestSale', goal: 1000, desc: 'Sell one item for $1,000.' },
  { id: 'trusted', name: 'Trusted Trader', need: 'reputation', goal: 90, desc: 'Reach 90 reputation.' },
];

export function pawnTipFor(day) {
  return PAWN_TIPS[day % PAWN_TIPS.length];
}

export function pawnAwardProgress(awardId, state) {
  const a = PAWN_AWARDS.find((x) => x.id === awardId);
  if (!a) return null;
  const have = state[a.need] || 0;
  return { id: a.id, name: a.name, have, goal: a.goal, done: have >= a.goal };
}

export function pawnLoanRisk(principal, value) {
  const ratio = principal / Math.max(1, value);
  if (ratio <= 0.5) return 'safe';
  if (ratio <= 0.65) return 'normal';
  return 'risky';
}

export function pawnShelfTurnover(sold, inventory) {
  if (inventory === 0) return 0;
  return Math.round((sold / inventory) * 100) / 100;
}

export function pawnInterestTotal(principal, categoryId, days) {
  return pawnRedemptionFor(principal, categoryId, days) - principal;
}

export function pawnBestCategory(inventory) {
  const totals = {};
  for (const item of inventory) {
    totals[item.category] = (totals[item.category] || 0) + (item.value || 0);
  }
  let best = null;
  let bestValue = 0;
  for (const [cat, value] of Object.entries(totals)) {
    if (value > bestValue) { bestValue = value; best = cat; }
  }
  return best ? { category: best, value: bestValue } : null;
}

export const PAWN_RECORDS = [
  { id: 'most-loans', name: 'Most Loans', stat: 'loansMade', unit: 'loans', desc: 'Most loans made.' },
  { id: 'most-redeemed', name: 'Most Redeemed', stat: 'loansRedeemed', unit: 'loans', desc: 'Most loans redeemed.' },
  { id: 'most-earned', name: 'Most Earned', stat: 'earned', unit: '$', desc: 'Most money earned.' },
  { id: 'best-sale', name: 'Best Sale', stat: 'bestSale', unit: '$', desc: 'Biggest single sale.' },
  { id: 'most-auctions', name: 'Most Auctions', stat: 'auctionSales', unit: 'lots', desc: 'Most auction lots sold.' },
];

export function pawnRecordFor(recordId, state) {
  const r = PAWN_RECORDS.find((x) => x.id === recordId);
  if (!r) return null;
  return { id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit };
}

export function pawnAllRecords(state) {
  return PAWN_RECORDS.map((r) => ({
    id: r.id, name: r.name, value: state[r.stat] || 0, unit: r.unit, desc: r.desc,
  }));
}

export function pawnRedemptionRate(redeemed, forfeited) {
  const total = redeemed + forfeited;
  if (total === 0) return 100;
  return Math.round((redeemed / total) * 100);
}

export function pawnProfitMargin(earned, spent) {
  if (spent === 0) return earned > 0 ? 100 : 0;
  return Math.round(((earned - spent) / spent) * 100);
}

export function pawnBrokerGrade(loansMade, reputation, bestSale) {
  if (loansMade >= 50 && reputation >= 80) return 'S';
  if (loansMade >= 25) return 'A';
  if (loansMade >= 10) return 'B';
  if (loansMade >= 3) return 'C';
  return 'D';
}

export const PAWN_SEASONAL_DEMAND = [
  { id: 'christmas', name: 'Christmas Rush', season: 'winter', category: 'jewelry', mult: 1.4, desc: 'Everyone buys jewellery in December.' },
  { id: 'back-school', name: 'Back to School', season: 'autumn', category: 'laptop', mult: 1.3, desc: 'Students need laptops.' },
  { id: 'summer-travel', name: 'Summer Travel', season: 'summer', category: 'camera', mult: 1.25, desc: 'Tourists buy cameras.' },
  { id: 'spring-clean', name: 'Spring Clean', season: 'spring', category: 'antique', mult: 1.2, desc: 'Attics open, antiques appear.' },
];

export function pawnSeasonalDemand(seasonId, categoryId) {
  const row = PAWN_SEASONAL_DEMAND.find((x) => x.season === seasonId && x.category === categoryId);
  return row ? row.mult : 1;
}

export function pawnBestSeasonFor(categoryId) {
  let best = null;
  let bestMult = 0;
  for (const row of PAWN_SEASONAL_DEMAND) {
    if (row.category === categoryId && row.mult > bestMult) { bestMult = row.mult; best = row.season; }
  }
  return best ? { season: best, mult: bestMult } : null;
}

export function pawnVaultValue(inventory, loans) {
  return pawnShopValue(inventory) + pawnLoanBookValue(loans);
}

export const PAWN_QUICK_START = [
  'Appraise before you offer. Every item, every time.',
  'Buy the loupe first — fakes are expensive.',
  'Lend 60%, never more. The margin is your profit.',
  'Refuse stolen goods. Always, no exceptions.',
  'Sell sets, not singles. Three matching pieces pay more.',
  'Friday auctions pay the most. Save the good stuff.',
];

export function pawnQuickStart(step) {
  return PAWN_QUICK_START[step] || null;
}

export function pawnTotalValue(state) {
  return pawnShopValue(state.inventory) + pawnLoanBookValue(state.loans);
}

export function pawnProgressPercent(state) {
  const total = state.loansRedeemed + state.loansForfeited;
  if (total === 0) return 0;
  return Math.round((state.loansRedeemed / total) * 100);
}

export function pawnshopSummary(state) {
  return `${PAWN_RANKS[state.rank].name}: ${state.loansMade} loans, ${state.sold} sold, $${Math.round(state.earned)} earned, rep ${state.reputation}.`;
}

export function pawnshopNextGoal(state) {
  if (!state.owned) return 'Buy the shop.';
  if (state.loansMade < 5) return 'Make 5 loans.';
  if (state.auctionSales < 1) return 'Sell a lot at auction.';
  return 'Become King of the Anchor.';
}

export const PAWNSHOP_META = {
  system: 'pawnshop', version: '7b-B', author: 'builder-B',
  files: 1, lines: 1013, features: ['loans', 'appraisal', 'retail', 'auctions', 'collections', 'fakes'],
};

export function pawnshopMeta() {
  return { ...PAWNSHOP_META };
}
