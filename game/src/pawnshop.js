// Ria runs the Crown and Anchor pawnshop behind the marina: appraise goods,
// spot fakes and stolen items, lend against them, collect interest, and sell
// forfeited goods over the counter or at auction. Context supplies rng, the
// day getter, cash access, a logger and the player position. The hour getter,
// heat adder and speed getter are present with defaults but never called.
// No weather getter exists.
export const PAWN_CATEGORIES = [
  { id: 'jewelry', name: 'Jewelry', baseValue: 200, loanRate: 0.6, interest: 0.1, demand: 0.8, fakeRate: 0.3, desc: 'Rings, chains and bracelets.' },
  { id: 'watches', name: 'Watches', baseValue: 300, loanRate: 0.6, interest: 0.1, demand: 0.75, fakeRate: 0.35, desc: 'Watches, real and otherwise.' },
  { id: 'electronics', name: 'Electronics', baseValue: 150, loanRate: 0.5, interest: 0.12, demand: 0.7, fakeRate: 0.15, desc: 'Gadgets and gizmos.' },
  { id: 'tools', name: 'Tools', baseValue: 80, loanRate: 0.5, interest: 0.08, demand: 0.6, fakeRate: 0.05, desc: 'Power tools and hand tools.' },
  { id: 'instruments', name: 'Instruments', baseValue: 250, loanRate: 0.55, interest: 0.09, demand: 0.5, fakeRate: 0.1, desc: 'Guitars, horns and violins.' },
  { id: 'art', name: 'Art', baseValue: 400, loanRate: 0.5, interest: 0.1, demand: 0.4, fakeRate: 0.4, desc: 'Paintings and prints.' },
  { id: 'antiques', name: 'Antiques', baseValue: 350, loanRate: 0.55, interest: 0.09, demand: 0.45, fakeRate: 0.25, desc: 'Old things with old stories.' },
  { id: 'phones', name: 'Phones', baseValue: 180, loanRate: 0.5, interest: 0.12, demand: 0.85, fakeRate: 0.2, desc: 'Smartphones, locked or not.' },
  { id: 'laptops', name: 'Laptops', baseValue: 220, loanRate: 0.5, interest: 0.11, demand: 0.7, fakeRate: 0.1, desc: 'Laptops and tablets.' },
  { id: 'cameras', name: 'Cameras', baseValue: 260, loanRate: 0.55, interest: 0.1, demand: 0.55, fakeRate: 0.2, desc: 'Cameras and lenses.' },
  { id: 'bikes', name: 'Bikes', baseValue: 120, loanRate: 0.5, interest: 0.08, demand: 0.6, fakeRate: 0.05, desc: 'Bicycles of every kind.' },
  { id: 'consoles', name: 'Consoles', baseValue: 160, loanRate: 0.5, interest: 0.11, demand: 0.8, fakeRate: 0.15, desc: 'Game consoles and controllers.' },
  { id: 'gold', name: 'Gold', baseValue: 500, loanRate: 0.7, interest: 0.08, demand: 0.9, fakeRate: 0.2, desc: 'Gold bars, coins and scrap.' },
  { id: 'silver', name: 'Silver', baseValue: 120, loanRate: 0.6, interest: 0.08, demand: 0.6, fakeRate: 0.1, desc: 'Silverware and silver coins.' },
  { id: 'designer', name: 'Designer Goods', baseValue: 280, loanRate: 0.55, interest: 0.1, demand: 0.65, fakeRate: 0.45, desc: 'Bags and jackets with big names.' },
  { id: 'coins', name: 'Coins', baseValue: 90, loanRate: 0.6, interest: 0.07, demand: 0.5, fakeRate: 0.15, desc: 'Old coins and collections.' },
];

export const PAWN_CUSTOMERS = [
  { id: 'sailor', name: 'Sailor', patience: 60, haggle: 0.2, honesty: 0.8, desc: 'Needs cash before the next tide.' },
  { id: 'student', name: 'Student', patience: 80, haggle: 0.3, honesty: 0.9, desc: 'Pawning a laptop for rent.' },
  { id: 'collector', name: 'Collector', patience: 120, haggle: 0.5, honesty: 0.6, desc: 'Knows the value of everything.' },
  { id: 'tourist', name: 'Tourist', patience: 50, haggle: 0.1, honesty: 0.7, desc: 'In a hurry, takes what is offered.' },
  { id: 'musician', name: 'Musician', patience: 90, haggle: 0.3, honesty: 0.85, desc: 'A guitar for one more gig.' },
  { id: 'dealer', name: 'Dealer', patience: 100, haggle: 0.6, honesty: 0.4, desc: 'A smooth talker with a smooth story.' },
  { id: 'grandma', name: 'Grandma', patience: 140, haggle: 0.2, honesty: 0.95, desc: 'Selling the family silver, sadly.' },
  { id: 'fisherman', name: 'Fisherman', patience: 70, haggle: 0.25, honesty: 0.75, desc: 'Tools for the boat, cash for the nets.' },
];

export const PAWN_AUCTIONS = [
  { id: 'monday-sale', name: 'Monday Sale', dayOfWeek: 1, fee: 20, bidders: 12, hype: 1.1, desc: 'A steady Monday crowd.' },
  { id: 'wednesday-night', name: 'Wednesday Night', dayOfWeek: 3, fee: 30, bidders: 18, hype: 1.25, desc: 'The midweek bidding war.' },
  { id: 'friday-gala', name: 'Friday Gala', dayOfWeek: 5, fee: 50, bidders: 30, hype: 1.5, desc: 'The big Friday night gala.' },
  { id: 'saturday-fair', name: 'Saturday Fair', dayOfWeek: 6, fee: 40, bidders: 25, hype: 1.35, desc: 'A fair crowd, fair prices.' },
  { id: 'sunday-quiet', name: 'Sunday Quiet', dayOfWeek: 0, fee: 15, bidders: 8, hype: 0.9, desc: 'A quiet Sunday, low bids.' },
  { id: 'monthly-grand', name: 'Monthly Grand', dayOfWeek: 4, fee: 80, bidders: 40, hype: 1.8, desc: 'The monthly grand auction.' },
];

export const PAWN_UPGRADES = [
  { id: 'loupe', name: 'Jeweller Loupe', cost: 200, desc: 'Spot fakes at a glance.', effect: 'detect' },
  { id: 'safe', name: 'Big Safe', cost: 500, desc: 'Room for ten more loans.', effect: 'capacity' },
  { id: 'display', name: 'Glass Display', cost: 300, desc: 'Retail prices rise with a good display.', effect: 'retail' },
  { id: 'vault', name: 'Vault Room', cost: 800, desc: 'Auction prices rise with secure storage.', effect: 'auction' },
  { id: 'expert', name: 'Expert Eye', cost: 600, desc: 'Art and antiques appraise higher.', effect: 'appraise' },
  { id: 'scale', name: 'Precision Scale', cost: 250, desc: 'Exact weights, better appraisals.', effect: 'appraise' },
  { id: 'security', name: 'Security System', cost: 400, desc: 'Cameras and alarms for the shop.', effect: 'safety' },
  { id: 'sign', name: 'Neon Sign', cost: 150, desc: 'Brings more customers through the door.', effect: 'footfall' },
];

export const PAWN_RANKS = [
  { level: 0, name: 'Counter Hand', xp: 0, perk: 'Take small loans and learn the trade.' },
  { level: 1, name: 'Broker', xp: 150, perk: 'Better buyers and bigger loans.' },
  { level: 2, name: 'Trader', xp: 400, perk: 'Auctions and collections open up.' },
  { level: 3, name: 'Master Broker', xp: 800, perk: 'The big dealers trust you.' },
  { level: 4, name: 'Bay Legend', xp: 1500, perk: 'The name on every pawn ticket.' },
];

export const PAWN_STAFF = [
  { id: 'appraiser', name: 'Appraiser Ada', role: 'appraiser', wage: 50, skill: 'appraise', value: 20, desc: 'Spots a fake from across the room.' },
  { id: 'auctioneer', name: 'Auctioneer Ben', role: 'auctioneer', wage: 60, skill: 'auction', value: 25, desc: 'Works a room into a bidding war.' },
  { id: 'clerk', name: 'Clerk Cleo', role: 'clerk', wage: 30, skill: 'sales', value: 10, desc: 'Keeps the books and the counter tidy.' },
  { id: 'guard', name: 'Guard Gus', role: 'guard', wage: 40, skill: 'security', value: 12, desc: 'A big man by the door.' },
];

export const PAWN_ITEMS_POOL = [
  { name: 'Gold Ring', category: 'jewelry', condition: 0.9 },
  { name: 'Silver Chain', category: 'jewelry', condition: 0.7 },
  { name: 'Pearl Necklace', category: 'jewelry', condition: 0.8 },
  { name: 'Diver Watch', category: 'watches', condition: 0.85 },
  { name: 'Old Pocket Watch', category: 'watches', condition: 0.6 },
  { name: 'Smart Watch', category: 'watches', condition: 0.75 },
  { name: 'Tablet', category: 'electronics', condition: 0.7 },
  { name: 'Radio', category: 'electronics', condition: 0.5 },
  { name: 'Drill', category: 'tools', condition: 0.8 },
  { name: 'Saw Set', category: 'tools', condition: 0.65 },
  { name: 'Acoustic Guitar', category: 'instruments', condition: 0.8 },
  { name: 'Trumpet', category: 'instruments', condition: 0.7 },
  { name: 'Oil Painting', category: 'art', condition: 0.6 },
  { name: 'Watercolour', category: 'art', condition: 0.75 },
  { name: 'Brass Clock', category: 'antiques', condition: 0.55 },
  { name: 'Vintage Vase', category: 'antiques', condition: 0.65 },
  { name: 'Smartphone', category: 'phones', condition: 0.85 },
  { name: 'Old Flip Phone', category: 'phones', condition: 0.4 },
  { name: 'Laptop', category: 'laptops', condition: 0.8 },
  { name: 'Netbook', category: 'laptops', condition: 0.6 },
  { name: 'Film Camera', category: 'cameras', condition: 0.7 },
  { name: 'Digital Camera', category: 'cameras', condition: 0.85 },
  { name: 'Road Bike', category: 'bikes', condition: 0.75 },
  { name: 'Mountain Bike', category: 'bikes', condition: 0.6 },
  { name: 'Game Console', category: 'consoles', condition: 0.8 },
  { name: 'Handheld Console', category: 'consoles', condition: 0.7 },
  { name: 'Gold Bar', category: 'gold', condition: 0.95 },
  { name: 'Silver Cutlery', category: 'silver', condition: 0.7 },
];

export const PAWN_SCAMS = [
  { id: 'fake-watch', name: 'Fake Watch', category: 'watches', tell: 'The movement ticks too loudly.', desc: 'A copy of a famous watch.' },
  { id: 'fake-gold', name: 'Fake Gold', category: 'gold', tell: 'Too light for its size.', desc: 'Gold-plated, not solid.' },
  { id: 'fake-bag', name: 'Fake Bag', category: 'designer', tell: 'Stitching is uneven inside.', desc: 'A designer copy.' },
  { id: 'fake-painting', name: 'Fake Painting', category: 'art', tell: 'The canvas is too new.', desc: 'A print passed off as an original.' },
  { id: 'fake-phone', name: 'Fake Phone', category: 'phones', tell: 'The logo is slightly off.', desc: 'A clone phone with a real box.' },
];

export const PAWN_COLLECTIONS = [
  { id: 'gold-set', name: 'Gold Set', items: ['gold', 'jewelry', 'coins'], mult: 1.4, desc: 'Gold, jewelry and coins together.' },
  { id: 'tech-set', name: 'Tech Set', items: ['phones', 'laptops', 'consoles'], mult: 1.3, desc: 'A full shelf of working tech.' },
  { id: 'music-set', name: 'Music Set', items: ['instruments', 'electronics'], mult: 1.25, desc: 'Instruments and the gear to play them.' },
  { id: 'art-set', name: 'Art Set', items: ['art', 'antiques'], mult: 1.5, desc: 'Art and antiques, a collector’s dream.' },
  { id: 'tool-set', name: 'Tool Set', items: ['tools', 'bikes'], mult: 1.2, desc: 'Tools and bikes for the workshop.' },
  { id: 'photo-set', name: 'Photo Set', items: ['cameras', 'electronics'], mult: 1.25, desc: 'Cameras and the kit to go with them.' },
];

export const PAWN_REGULATIONS = [
  { id: 'id-check', name: 'ID Check', cost: 0, desc: 'Check the seller’s ID on every loan.' },
  { id: 'police-list', name: 'Police List', cost: 0, desc: 'Check the stolen-goods list daily.' },
  { id: 'hold-period', name: 'Hold Period', cost: 0, desc: 'Hold new items for seven days.' },
  { id: 'receipt-rule', name: 'Receipt Rule', cost: 0, desc: 'Give a receipt for every transaction.' },
  { id: 'interest-cap', name: 'Interest Cap', cost: 0, desc: 'Never charge over the legal cap.' },
  { id: 'record-keeping', name: 'Record Keeping', cost: 0, desc: 'Log every loan and sale.' },
];

export const PAWN_BUYERS = [
  { id: 'gold-dealer', name: 'Gold Dealer', wants: ['gold', 'jewelry', 'silver', 'coins'], mult: 1.2, desc: 'Buys all things precious.' },
  { id: 'tech-trader', name: 'Tech Trader', wants: ['phones', 'laptops', 'consoles', 'electronics'], mult: 1.15, desc: 'Buys working tech in bulk.' },
  { id: 'art-collector', name: 'Art Collector', wants: ['art', 'antiques'], mult: 1.4, desc: 'Pays well for the real thing.' },
  { id: 'music-shop', name: 'Music Shop', wants: ['instruments'], mult: 1.25, desc: 'Always needs good instruments.' },
  { id: 'bike-shop', name: 'Bike Shop', wants: ['bikes', 'tools'], mult: 1.1, desc: 'Buys bikes and workshop tools.' },
  { id: 'fashion-house', name: 'Fashion House', wants: ['designer', 'watches'], mult: 1.3, desc: 'Designer goods and fine watches.' },
];

export const PAWN_DAILY_DEALS = [
  { id: 'deal-gold', name: 'Gold Day', category: 'gold', mult: 1.3, desc: 'Gold prices up today.' },
  { id: 'deal-tech', name: 'Tech Day', category: 'phones', mult: 1.2, desc: 'Phones sell fast today.' },
  { id: 'deal-art', name: 'Art Day', category: 'art', mult: 1.35, desc: 'A collector is in town.' },
  { id: 'deal-tools', name: 'Tool Day', category: 'tools', mult: 1.15, desc: 'Builders need tools.' },
  { id: 'deal-watches', name: 'Watch Day', category: 'watches', mult: 1.25, desc: 'Watch buyers are out.' },
  { id: 'deal-bikes', name: 'Bike Day', category: 'bikes', mult: 1.2, desc: 'Summer means bikes.' },
];

export const PAWN_LOAN_TERMS = [
  { id: 'short', name: 'Short Term', days: 7, interest: 0.05, desc: 'A week to redeem.' },
  { id: 'standard', name: 'Standard Term', days: 30, interest: 0.1, desc: 'A month to redeem.' },
  { id: 'long', name: 'Long Term', days: 90, interest: 0.2, desc: 'Three months to redeem.' },
];

export const PAWN_TIPS = [
  { id: 'tip-appraise', name: 'Appraise First', tip: 'Appraise before you offer, fakes hide in plain sight.' },
  { id: 'tip-fakes', name: 'Spot Fakes', tip: 'A loupe and an appraiser catch most fakes.' },
  { id: 'tip-stolen', name: 'Stolen Goods', tip: 'Stolen items cost reputation, refuse them fast.' },
  { id: 'tip-haggle', name: 'Haggle Smart', tip: 'Offers near the fair loan are usually accepted.' },
  { id: 'tip-auction', name: 'Auction Day', tip: 'Friday gala pays the best auction prices.' },
  { id: 'tip-collections', name: 'Sell Sets', tip: 'A full collection set pays a bonus multiplier.' },
  { id: 'tip-deadlines', name: 'Watch Deadlines', tip: 'Loans expire after thirty days and become stock.' },
  { id: 'tip-retail', name: 'Retail Patience', tip: 'Some days nobody buys, try again tomorrow.' },
];

export const PAWN_AWARDS = [
  { id: 'first-loan', name: 'First Loan', need: 'loansMade', goal: 1, desc: 'Make your first loan.' },
  { id: 'five-loans', name: 'Five Loans', need: 'loansMade', goal: 5, desc: 'Make five loans.' },
  { id: 'fake-catcher', name: 'Fake Catcher', need: 'fakesCaught', goal: 5, desc: 'Catch five fakes.' },
  { id: 'auction-star', name: 'Auction Star', need: 'auctionSales', goal: 3, desc: 'Sell three auction lots.' },
  { id: 'trusted-broker', name: 'Trusted Broker', need: 'reputation', goal: 70, desc: 'Reach seventy reputation.' },
];

export const PAWN_RECORDS = [
  { id: 'loans', name: 'Loans Made', field: 'loansMade', unit: 'loans', desc: 'All loans made.' },
  { id: 'redeemed', name: 'Loans Redeemed', field: 'loansRedeemed', unit: 'loans', desc: 'All loans redeemed.' },
  { id: 'sold', name: 'Items Sold', field: 'sold', unit: 'items', desc: 'All items sold.' },
  { id: 'earned', name: 'Total Earned', field: 'earned', unit: 'cash', desc: 'All cash earned.' },
  { id: 'best-sale', name: 'Best Sale', field: 'bestSale', unit: 'cash', desc: 'The biggest single sale.' },
];

export const PAWN_SEASONAL_DEMAND = [
  { id: 'spring-tech', name: 'Spring Tech', season: 'spring', category: 'phones', mult: 1.2, desc: 'New phones in spring.' },
  { id: 'summer-bikes', name: 'Summer Bikes', season: 'summer', category: 'bikes', mult: 1.3, desc: 'Bikes sell in summer.' },
  { id: 'autumn-art', name: 'Autumn Art', season: 'autumn', category: 'art', mult: 1.25, desc: 'Art season in autumn.' },
  { id: 'winter-gold', name: 'Winter Gold', season: 'winter', category: 'gold', mult: 1.4, desc: 'Gold gifts in winter.' },
];

export const PAWN_QUICK_START = [
  'Buy the shop, then open it for customers.',
  'Appraise every item before you offer a loan.',
  'Refuse fakes and stolen goods on the spot.',
  'Redeem loans for interest, or sell forfeits.',
  'Send the best items to auction on Friday.',
  'Complete collections for a bonus multiplier.',
];

export const PAWNSHOP_META = {
  system: 'pawnshop',
  version: '7b-B',
  author: 'builder-B',
  files: 1,
  lines: 1013,
  features: ['loans', 'appraisal', 'retail', 'auctions', 'collections', 'fakes'],
};

function findCategory(id) { return PAWN_CATEGORIES.find((c) => c.id === id); }
function findAuction(id) { return PAWN_AUCTIONS.find((a) => a.id === id); }

export function pawnRankFor(xp) {
  let out = 0;
  for (const r of PAWN_RANKS) if (xp >= r.xp) out = r.level;
  return out;
}

export function pawnAppraiseValue(item, upgrades) {
  const cat = findCategory(item.category);
  if (!cat) return 0;
  const quality = item.quality !== undefined ? item.quality : 1;
  let value = cat.baseValue * item.condition * (0.5 + quality);
  if (upgrades && upgrades.includes('scale')) value *= 1.1;
  if (upgrades && upgrades.includes('expert') && (item.category === 'art' || item.category === 'antiques')) value *= 1.25;
  return Math.round(value);
}

export function pawnLoanFor(value, categoryId) {
  const cat = findCategory(categoryId);
  if (!cat) return Math.round(value * 0.5);
  return Math.round(value * cat.loanRate);
}

export function pawnRedemptionFor(loan, categoryId, daysHeld) {
  const cat = findCategory(categoryId);
  const rate = cat ? cat.interest : 0.1;
  const interest = loan * rate * (1 + (daysHeld || 0) * 0.005);
  return Math.round(loan + interest);
}

export function pawnRetailPrice(value, rank, upgrades) {
  let price = value * 1.25 * (1 + (rank || 0) * 0.05);
  if (upgrades && upgrades.includes('display')) price *= 1.1;
  return Math.round(price);
}

export function pawnAuctionPrice(value, auction, upgrades, hype) {
  let price = value * auction.hype * (hype || 1) * (0.9 + Math.random() * 0.2);
  if (upgrades && upgrades.includes('vault')) price *= 1.25;
  return Math.round(price);
}

export function pawnScamTell(scamId) {
  const s = PAWN_SCAMS.find((x) => x.id === scamId);
  return s ? s.tell : 'Nothing obvious, check it twice.';
}

export function pawnDetectChance(rank, upgrades, staff) {
  let chance = 0.4 + (rank || 0) * 0.1;
  if (upgrades && upgrades.includes('loupe')) chance += 0.15;
  if (staff && staff.includes('appraiser')) chance += 0.2;
  return Math.min(0.98, chance);
}

export function pawnWeeklyReport(loans, redeemed, forfeited, retail, auctions) {
  const loanProfit = redeemed * 25;
  return {
    loans, redeemed, forfeited, retail, auctions, loanProfit,
    total: loans + redeemed + forfeited + retail + auctions,
  };
}

export function pawnReputationTier(reputation) {
  if (reputation >= 80) return 'Beloved Broker';
  if (reputation >= 65) return 'Trusted Trader';
  if (reputation >= 50) return 'Fair Dealer';
  if (reputation >= 35) return 'Shady Shop';
  return 'Fence';
}

export function pawnCollectionBonus(setId, inventory) {
  const set = PAWN_COLLECTIONS.find((s) => s.id === setId);
  if (!set) return 1;
  const have = new Set((inventory || []).map((i) => i.category));
  return set.items.every((c) => have.has(c)) ? set.mult : 1;
}

export function pawnBuyerFor(categoryId) {
  return PAWN_BUYERS.filter((b) => b.wants.includes(categoryId));
}

export function pawnBuyerPrice(value, buyerId) {
  const b = PAWN_BUYERS.find((x) => x.id === buyerId);
  if (!b) return value;
  return Math.round(value * b.mult);
}

export function pawnDailyDealFor(day) {
  return PAWN_DAILY_DEALS[((day % PAWN_DAILY_DEALS.length) + PAWN_DAILY_DEALS.length) % PAWN_DAILY_DEALS.length];
}

export function pawnDealMult(dealId, categoryId) {
  const d = PAWN_DAILY_DEALS.find((x) => x.id === dealId);
  if (!d) return 1;
  return d.category === categoryId ? d.mult : 1;
}

export function pawnTermInterest(termId, principal) {
  const t = PAWN_LOAN_TERMS.find((x) => x.id === termId);
  if (!t) return principal;
  return Math.round(principal * (1 + t.interest));
}

export function pawnShopValue(inventory) {
  return (inventory || []).reduce((s, i) => s + (i.value || 0), 0);
}

export function pawnLoanBookValue(loans) {
  return (loans || []).reduce((s, l) => s + (l.principal || 0), 0);
}

export function pawnNetWorth(inventory, loans, cash) {
  return pawnShopValue(inventory) + pawnLoanBookValue(loans) + (cash || 0);
}

export function pawnTipFor(day) {
  return PAWN_TIPS[((day % PAWN_TIPS.length) + PAWN_TIPS.length) % PAWN_TIPS.length];
}

export function pawnAwardProgress(awardId, state) {
  const a = PAWN_AWARDS.find((x) => x.id === awardId);
  if (!a) return null;
  const current = state[a.need] || 0;
  return { id: a.id, name: a.name, current, goal: a.goal, done: current >= a.goal };
}

export function pawnLoanRisk(principal, value) {
  const ratio = value ? principal / value : 1;
  if (ratio < 0.5) return 'safe';
  if (ratio < 0.8) return 'normal';
  return 'risky';
}

export function pawnShelfTurnover(sold, inventoryCount) {
  if (!inventoryCount) return 0;
  return Math.round((sold / inventoryCount) * 100) / 100;
}

export function pawnInterestTotal(principal, categoryId, days) {
  return pawnRedemptionFor(principal, categoryId, days) - principal;
}

export function pawnBestCategory(inventory) {
  if (!inventory || !inventory.length) return null;
  const totals = {};
  for (const item of inventory) totals[item.category] = (totals[item.category] || 0) + (item.value || 0);
  let best = null;
  for (const cat of Object.keys(totals)) {
    if (!best || totals[cat] > best.total) best = { category: cat, total: totals[cat] };
  }
  return best;
}

export function pawnRecordFor(recordId, state) {
  const rec = PAWN_RECORDS.find((r) => r.id === recordId);
  if (!rec) return null;
  return { id: rec.id, name: rec.name, value: state[rec.field] || 0, unit: rec.unit };
}

export function pawnAllRecords(state) {
  return PAWN_RECORDS.map((r) => ({ id: r.id, name: r.name, value: state[r.field] || 0, unit: r.unit, desc: r.desc }));
}

export function pawnRedemptionRate(redeemed, forfeited) {
  const total = redeemed + forfeited;
  if (!total) return 100;
  return Math.round((redeemed / total) * 100);
}

export function pawnProfitMargin(earned, spent) {
  if (!spent) return earned > 0 ? 100 : 0;
  if (!earned) return 0;
  return Math.round(((earned - spent) / spent) * 100);
}

export function pawnBrokerGrade(loansMade, reputation, bestSale) {
  if (loansMade >= 20 && reputation >= 70 && bestSale >= 1000) return 'S';
  if (loansMade >= 10 && reputation >= 60) return 'A';
  if (loansMade >= 5) return 'B';
  if (loansMade >= 1) return 'C';
  return 'D';
}

export function pawnSeasonalDemand(seasonId, categoryId) {
  const row = PAWN_SEASONAL_DEMAND.find((r) => r.season === seasonId && r.category === categoryId);
  return row ? row.mult : 1;
}

export function pawnBestSeasonFor(categoryId) {
  let best = null;
  for (const row of PAWN_SEASONAL_DEMAND) {
    if (row.category !== categoryId) continue;
    if (!best || row.mult > best.mult) best = { season: row.season, mult: row.mult };
  }
  return best;
}

export function pawnVaultValue(inventory, loans) {
  return pawnShopValue(inventory) + pawnLoanBookValue(loans);
}

export function pawnQuickStart(step) {
  if (step < 0 || step >= PAWN_QUICK_START.length) return null;
  return PAWN_QUICK_START[step];
}

export function pawnTotalValue(state) {
  return pawnShopValue(state.inventory) + pawnLoanBookValue(state.loans);
}

export function pawnProgressPercent(state) {
  const total = state.loansRedeemed + state.loansForfeited;
  if (!total) return 0;
  return Math.round((state.loansRedeemed / total) * 1000) / 10;
}

export function pawnshopSummary(state) {
  const rankName = PAWN_RANKS[state.rank].name;
  return `${rankName} Ria made ${state.loansMade} loans, sold ${state.sold} items, earned ${Math.round(state.earned)} and holds ${state.reputation} reputation.`;
}

export function pawnshopNextGoal(state) {
  if (!state.owned) return 'Buy the shop to hit your first goal.';
  if (state.loansMade < 5) return 'Make 5 loans to hit your next goal.';
  if (state.auctionSales < 1) return 'Sell one auction lot to hit your next goal.';
  return 'Reach the top rank and become a Bay Legend.';
}

export function pawnshopMeta() {
  return { ...PAWNSHOP_META, features: [...PAWNSHOP_META.features] };
}

export function createPawnshopSystem(ctx) {
  const {
    rng = Math.random,
    getDay = () => 1,
    getHour = () => 12,
    getCash = () => 0,
    addCash = () => {},
    addHeat = () => {},
    getSpeed = () => 0,
    log = () => {},
    getPlayerPos = () => ({ x: 0, y: 0, z: 0 }),
  } = ctx || {};

  const state = {
    xp: 0, rank: 0, owned: false, open: false, loans: [], inventory: [], sold: 0,
    earned: 0, spent: 0, loansMade: 0, loansRedeemed: 0, loansForfeited: 0,
    interestEarned: 0, retailSales: 0, auctionSales: 0, auctionRevenue: 0,
    fakesCaught: 0, fakesMissed: 0, stolenRefused: 0, haggleWins: 0, haggleLosses: 0,
    upgrades: [], staff: [], reputation: 50, heat: 0, customer: null, customerItem: null,
    appraisedValue: 0, offerMade: 0, auction: null, auctionItem: null, auctionBids: 0,
    auctionHigh: 0, lastDay: 1, dailyLoans: 0, dailySales: 0, bestSale: 0,
    bestSaleItem: null, regulars: 0, complaints: 0, compliments: 0, loanCap: 10,
    cashInVault: 0,
  };

  function refreshRank() {
    const next = pawnRankFor(state.xp);
    if (next > state.rank) state.rank = next;
  }
  function gainXp(n) { state.xp += n; refreshRank(); }
  function fail(reason) { return { ok: false, reason }; }
  function hasUpgrade(id) { return state.upgrades.includes(id); }
  function trackBestSale(amount, itemName) {
    if (amount > state.bestSale) {
      state.bestSale = amount;
      state.bestSaleItem = itemName;
    }
  }
  function clearCustomer() {
    state.customer = null;
    state.customerItem = null;
    state.appraisedValue = 0;
    state.offerMade = 0;
  }

  function buyShop() {
    if (state.owned) return fail('already owned');
    if (getCash() < 2500) return fail('not enough cash');
    addCash(-2500);
    state.spent += 2500;
    state.owned = true;
    return { ok: true, cost: 2500 };
  }

  function openShop() {
    if (!state.owned) return fail('shop not owned');
    if (state.open) return fail('already open');
    state.open = true;
    return { ok: true };
  }

  function closeShop() {
    if (!state.open) return fail('not open');
    state.open = false;
    state.customer = null;
    state.customerItem = null;
    return { ok: true };
  }

  function newCustomer() {
    if (!state.open) return fail('shop not open');
    if (state.customer) return fail('customer already waiting');
    const type = PAWN_CUSTOMERS[Math.floor(rng() * PAWN_CUSTOMERS.length)];
    const pool = PAWN_ITEMS_POOL[Math.floor(rng() * PAWN_ITEMS_POOL.length)];
    const cat = findCategory(pool.category);
    const fake = rng() < cat.fakeRate;
    const stolen = rng() < 0.08;
    const item = {
      id: `item-${getDay()}-${state.loansMade + state.sold}`,
      name: pool.name, category: pool.category, condition: pool.condition,
      quality: 0.5 + rng() * 0.5, fake, stolen,
    };
    state.customer = { ...type };
    state.customerItem = item;
    state.appraisedValue = pawnAppraiseValue(item, state.upgrades);
    state.offerMade = 0;
    return { ok: true, customer: type.id, item: { name: item.name, category: item.category, condition: item.condition } };
  }

  function appraise() {
    if (!state.customerItem) return fail('no customer item');
    const chance = pawnDetectChance(state.rank, state.upgrades, state.staff);
    const spottedFake = state.customerItem.fake && rng() < chance;
    const spottedStolen = state.customerItem.stolen && rng() < chance;
    state.appraisedValue = pawnAppraiseValue(state.customerItem, state.upgrades);
    let hint = 'Looks genuine enough.';
    if (spottedFake) hint = 'This looks fake, the details are wrong.';
    else if (spottedStolen) hint = 'This matches a stolen-goods report.';
    return {
      ok: true, value: state.appraisedValue, category: state.customerItem.category,
      fake: spottedFake, stolen: spottedStolen, hint,
    };
  }

  function offerLoan(amount) {
    if (!state.customerItem) return fail('no customer item');
    const item = state.customerItem;
    if (item.fake) {
      state.fakesCaught += 1;
      state.reputation += 2;
      clearCustomer();
      return fail('item is fake');
    }
    if (item.stolen) {
      state.stolenRefused += 1;
      state.reputation += 3;
      clearCustomer();
      return fail('item is stolen');
    }
    const fair = pawnLoanFor(state.appraisedValue, item.category);
    if (amount > fair * 1.2) return fail('offer above fair loan');
    if (!amount || amount <= 0) return fail('bad amount');
    if (getCash() < amount) return fail('not enough cash');
    const capacity = state.loanCap + (hasUpgrade('safe') ? 10 : 0);
    if (state.loans.length >= capacity) return fail('loan book full');
    const customer = PAWN_CUSTOMERS.find((c) => c.id === state.customer.id) || state.customer;
    const chance = Math.max(0.05, Math.min(0.95, amount / fair - customer.haggle * 0.2));
    if (rng() >= chance) {
      state.haggleLosses += 1;
      return { ok: false, reason: 'offer refused', fair };
    }
    addCash(-amount);
    state.spent += amount;
    state.loansMade += 1;
    state.dailyLoans += 1;
    const loan = {
      id: item.id, name: item.name, category: item.category, condition: item.condition,
      quality: item.quality, principal: amount, value: state.appraisedValue,
      dayTaken: state.lastDay, deadlineDay: state.lastDay + 30, customer: state.customer.id,
    };
    state.loans.push(loan);
    state.haggleWins += 1;
    gainXp(12);
    clearCustomer();
    return { ok: true, loan };
  }

  function haggleOffer() {
    if (!state.customerItem) return fail('no customer item');
    const fair = pawnLoanFor(state.appraisedValue, state.customerItem.category);
    const chance = 0.4 + state.rank * 0.1;
    if (rng() < chance) {
      state.haggleWins += 1;
      const offer = Math.round(fair * 0.9);
      state.offerMade = offer;
      return { ok: true, haggled: true, offer, fair };
    }
    state.haggleLosses += 1;
    return { ok: true, haggled: false, offer: fair, fair };
  }

  function redeemLoan(loanId) {
    const idx = state.loans.findIndex((l) => l.id === loanId);
    if (idx < 0) return fail('unknown loan');
    const loan = state.loans[idx];
    const due = pawnRedemptionFor(loan.principal, loan.category, state.lastDay - loan.dayTaken);
    const interest = due - loan.principal;
    state.loans.splice(idx, 1);
    state.loansRedeemed += 1;
    state.interestEarned += interest;
    addCash(due);
    state.earned += due;
    gainXp(15);
    state.reputation += 2;
    return { ok: true, due, interest };
  }

  function forfeitLoan(loanId) {
    const idx = state.loans.findIndex((l) => l.id === loanId);
    if (idx < 0) return fail('unknown loan');
    const loan = state.loans[idx];
    state.loans.splice(idx, 1);
    state.loansForfeited += 1;
    state.inventory.push({
      id: loan.id, name: loan.name, category: loan.category,
      condition: loan.condition, quality: loan.quality, value: loan.value,
    });
    gainXp(8);
    return { ok: true, item: loan.name };
  }

  function sellRetail(itemId) {
    const idx = state.inventory.findIndex((i) => i.id === itemId);
    if (idx < 0) return fail('unknown inventory item');
    const item = state.inventory[idx];
    const cat = findCategory(item.category);
    const price = pawnRetailPrice(item.value, state.rank, state.upgrades);
    const chance = 0.5 + cat.demand * 0.3 + state.rank * 0.05;
    if (rng() > chance) return { ok: false, reason: 'no buyer today', price };
    state.inventory.splice(idx, 1);
    state.retailSales += 1;
    state.sold += 1;
    state.dailySales += 1;
    addCash(price);
    state.earned += price;
    gainXp(10);
    trackBestSale(price, item.name);
    return { ok: true, price, item: item.name };
  }

  function startAuction(auctionId, itemId) {
    const auction = findAuction(auctionId);
    if (!auction) return fail('unknown auction');
    if (state.auction) return fail('auction already active');
    const idx = state.inventory.findIndex((i) => i.id === itemId);
    if (idx < 0) return fail('unknown inventory item');
    if (getCash() < auction.fee) return fail('not enough cash for the auction fee');
    const item = state.inventory[idx];
    addCash(-auction.fee);
    state.spent += auction.fee;
    state.inventory.splice(idx, 1);
    state.auction = { id: auctionId, bidders: auction.bidders, hype: auction.hype };
    state.auctionItem = item;
    state.auctionBids = 0;
    state.auctionHigh = Math.round(item.value * 0.8);
    return { ok: true, item: item.name, high: state.auctionHigh };
  }

  function auctionBid() {
    if (!state.auction || !state.auctionItem) return fail('no auction active');
    state.auctionHigh += Math.round(state.auctionItem.value * (0.05 + rng() * 0.15));
    state.auctionBids += 1;
    let war = false;
    if (rng() < 0.3 && state.staff.includes('auctioneer')) {
      state.auctionHigh = Math.round(state.auctionHigh * 1.25);
      war = true;
    }
    return { ok: true, bids: state.auctionBids, high: state.auctionHigh, war };
  }

  function closeAuction() {
    if (!state.auction || !state.auctionItem) return fail('no auction active');
    const item = state.auctionItem;
    let price = state.auctionHigh * (0.95 + Math.random() * 0.15);
    if (hasUpgrade('vault')) price *= 1.25;
    price = Math.round(price);
    state.auctionSales += 1;
    state.sold += 1;
    state.dailySales += 1;
    state.auctionRevenue += price;
    addCash(price);
    state.earned += price;
    gainXp(20);
    trackBestSale(price, item.name);
    state.auction = null;
    state.auctionItem = null;
    state.auctionBids = 0;
    state.auctionHigh = 0;
    return { ok: true, price, item: item.name };
  }

  function buyUpgrade(upgradeId) {
    const up = PAWN_UPGRADES.find((u) => u.id === upgradeId);
    if (!up) return fail('unknown upgrade');
    if (hasUpgrade(upgradeId)) return fail('already owned');
    if (!state.owned) return fail('shop not owned');
    if (getCash() < up.cost) return fail('not enough cash');
    addCash(-up.cost);
    state.spent += up.cost;
    state.upgrades.push(upgradeId);
    if (upgradeId === 'safe') state.loanCap += 10;
    gainXp(20);
    return { ok: true, id: upgradeId };
  }

  function hireStaff(staffId) {
    const s = PAWN_STAFF.find((x) => x.id === staffId);
    if (!s) return fail('unknown staff');
    if (state.staff.includes(staffId)) return fail('already hired');
    state.staff.push(staffId);
    return { ok: true, id: staffId };
  }

  function fireStaff(staffId) {
    if (!state.staff.includes(staffId)) return fail('not hired');
    state.staff = state.staff.filter((x) => x !== staffId);
    return { ok: true, id: staffId };
  }

  function refuseCustomer() {
    if (!state.customer) return fail('no customer waiting');
    clearCustomer();
    return { ok: true };
  }

  function tick(dt) {
    if (!state.open) return;
    if (!state.customer && rng() < dt * 0.03) newCustomer();
    if (state.customer && rng() < dt * 0.02) log('The waiting customer is tapping their foot.');
  }

  function tickDay(day) {
    if (day === state.lastDay) return;
    state.lastDay = day;
    state.dailyLoans = 0;
    state.dailySales = 0;
    let wages = 0;
    for (const id of state.staff) {
      const s = PAWN_STAFF.find((x) => x.id === id);
      if (s) wages += s.wage;
    }
    if (wages > 0) {
      addCash(-wages);
      state.spent += wages;
    }
    for (let i = state.loans.length - 1; i >= 0; i--) {
      const loan = state.loans[i];
      if (day > loan.deadlineDay) {
        state.loans.splice(i, 1);
        state.loansForfeited += 1;
        state.inventory.push({
          id: loan.id, name: loan.name, category: loan.category,
          condition: loan.condition, quality: loan.quality, value: loan.value,
        });
        gainXp(5);
      }
    }
    if (rng() < 0.3) {
      const cat = PAWN_CATEGORIES[Math.floor(rng() * PAWN_CATEGORIES.length)];
      log(`Market buzz: ${cat.name} is moving today.`);
    }
    state.heat = Math.max(0, state.heat - 1);
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(saved) {
    if (!saved || typeof saved !== 'object') return;
    for (const key of Object.keys(saved)) {
      if (key in state) state[key] = saved[key];
    }
    refreshRank();
  }

  function stats() {
    return {
      rank: PAWN_RANKS[state.rank].name, xp: state.xp, owned: state.owned, open: state.open,
      reputation: state.reputation, loans: state.loans.length,
      inventory: state.inventory.length, sold: state.sold,
      earned: Math.round(state.earned), spent: state.spent, loansMade: state.loansMade,
      loansRedeemed: state.loansRedeemed, loansForfeited: state.loansForfeited,
      interestEarned: Math.round(state.interestEarned), retailSales: state.retailSales,
      auctionSales: state.auctionSales, auctionRevenue: Math.round(state.auctionRevenue),
      fakesCaught: state.fakesCaught, fakesMissed: state.fakesMissed,
      stolenRefused: state.stolenRefused, haggleWins: state.haggleWins,
      haggleLosses: state.haggleLosses, upgrades: state.upgrades.length,
      staff: state.staff.length, bestSale: state.bestSale, bestSaleItem: state.bestSaleItem,
      customer: state.customer ? state.customer.id : null,
      auction: state.auction ? state.auction.id : null, loanCap: state.loanCap,
    };
  }

  function hudLine() {
    if (!state.owned) return '';
    if (state.customer) return `Customer ${state.customer.name} with a ${state.customerItem.name}.`;
    if (state.auction) return `Auction: ${state.auctionItem.name}, high bid ${state.auctionHigh}, ${state.auctionBids} bids.`;
    if (state.loans.length > 0) return `${state.loans.length} loans out, ${state.inventory.length} items shelved.`;
    return '';
  }

  function interact() {
    const pos = getPlayerPos() || {};
    const dx = (pos.x || 0) - 140;
    const dz = (pos.z || 0) - (-60);
    if (Math.sqrt(dx * dx + dz * dz) > 25) return false;
    if (!state.owned) { buyShop(); return true; }
    if (!state.open) { openShop(); return true; }
    if (!state.customer) { newCustomer(); return true; }
    return false;
  }

  function loanBook() {
    return state.loans.map((l) => ({
      id: l.id, name: l.name, principal: l.principal,
      due: pawnRedemptionFor(l.principal, l.category, state.lastDay - l.dayTaken),
      deadlineDay: l.deadlineDay, daysLeft: l.deadlineDay - state.lastDay,
    }));
  }

  function shelfList() {
    return state.inventory.map((i) => ({
      id: i.id, name: i.name, category: i.category,
      price: pawnRetailPrice(i.value, state.rank, state.upgrades),
    }));
  }

  return {
    state, buyShop, openShop, closeShop, newCustomer, appraise, offerLoan,
    haggleOffer, redeemLoan, forfeitLoan, sellRetail, startAuction, auctionBid,
    closeAuction, buyUpgrade, hireStaff, fireStaff, refuseCustomer, tick, tickDay,
    serialize, deserialize, stats, hudLine, interact, loanBook, shelfList,
  };
}

export function createPawnCollections(system) {
  const st = system.state;
  let soldSets = [];
  let setsRevenue = 0;

  function fail(reason) { return { ok: false, reason }; }

  function readySets() {
    const have = new Set(st.inventory.map((i) => i.category));
    return PAWN_COLLECTIONS.filter((s) => s.items.every((c) => have.has(c)))
      .map((s) => ({ id: s.id, name: s.name, bonus: s.mult }));
  }

  function checkSets() {
    return readySets();
  }

  function sellSet(setId, buyerId) {
    const set = PAWN_COLLECTIONS.find((s) => s.id === setId);
    if (!set) return fail('unknown set');
    const used = [];
    for (const cat of set.items) {
      const idx = st.inventory.findIndex((i) => i.category === cat && !used.includes(i));
      if (idx < 0) return fail('set incomplete');
      used.push(st.inventory[idx]);
    }
    let total = 0;
    for (const item of used) total += pawnRetailPrice(item.value, st.rank, st.upgrades);
    total = Math.round(total * set.mult);
    if (buyerId) {
      const buyer = PAWN_BUYERS.find((b) => b.id === buyerId);
      if (buyer) total = Math.round(total * buyer.mult);
    }
    for (const item of used) {
      const idx = st.inventory.indexOf(item);
      if (idx >= 0) st.inventory.splice(idx, 1);
    }
    st.earned += total;
    st.sold += used.length;
    soldSets.push(setId);
    setsRevenue += total;
    return { ok: true, set: setId, total, items: used.length, bonus: set.mult };
  }

  function record() {
    return { soldSets: [...soldSets], setsRevenue, readySets: readySets() };
  }

  return { checkSets, sellSet, record };
}
