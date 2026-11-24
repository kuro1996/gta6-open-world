export const BARBER_SHOP = { id: 'fresh-cuts', name: 'Fresh Cuts and Ink', x: 55, z: -25, district: 'Downtown' };

export const HAIRCUTS = [
  { id: 'buzz', name: 'Buzz Cut', price: 15, sharp: 1, street: 2, time: 10, trend: 0.6 },
  { id: 'fade', name: 'Fade', price: 25, sharp: 3, street: 2, time: 15, trend: 1.0 },
  { id: 'pompadour', name: 'Pompadour', price: 35, sharp: 5, street: 1, time: 25, trend: 0.8 },
  { id: 'dreads', name: 'Dreads', price: 45, sharp: 1, street: 5, time: 40, trend: 0.9 },
  { id: 'mohawk', name: 'Mohawk', price: 30, sharp: 2, street: 5, time: 20, trend: 0.7 },
  { id: 'slick', name: 'Slick Back', price: 40, sharp: 5, street: 0, time: 20, trend: 0.75 },
  { id: 'afro', name: 'Afro', price: 35, sharp: 2, street: 4, time: 30, trend: 0.85 },
  { id: 'undercut', name: 'Undercut', price: 28, sharp: 4, street: 3, time: 18, trend: 1.1 },
  { id: 'man-bun', name: 'Man Bun', price: 22, sharp: 3, street: 2, time: 12, trend: 0.65 },
  { id: 'bald', name: 'Clean Shave', price: 12, sharp: 2, street: 3, time: 8, trend: 0.5 },
];

export const BEARDS = [
  { id: 'clean', name: 'Clean Shaven', price: 8, sharp: 2, street: 0 },
  { id: 'stubble', name: 'Stubble', price: 10, sharp: 2, street: 2 },
  { id: 'goatee', name: 'Goatee', price: 14, sharp: 3, street: 2 },
  { id: 'full', name: 'Full Beard', price: 18, sharp: 3, street: 3 },
  { id: 'viking', name: 'Viking Beard', price: 30, sharp: 1, street: 5 },
  { id: 'mustache', name: 'Mustache', price: 16, sharp: 4, street: 1 },
];

export const TATTOOS = [
  { id: 'rose', name: 'Rose', price: 120, sharp: 1, street: 2, pain: 2, size: 'small', spot: 'arm' },
  { id: 'dragon', name: 'Dragon Sleeve', price: 600, sharp: 2, street: 5, pain: 5, size: 'large', spot: 'arm' },
  { id: 'skull', name: 'Skull', price: 150, sharp: 0, street: 4, pain: 3, size: 'medium', spot: 'chest' },
  { id: 'crown', name: 'Crown', price: 200, sharp: 3, street: 3, pain: 2, size: 'small', spot: 'neck' },
  { id: 'panther', name: 'Black Panther', price: 350, sharp: 1, street: 4, pain: 4, size: 'medium', spot: 'back' },
  { id: 'solara', name: 'Solara Skyline', price: 400, sharp: 3, street: 4, pain: 4, size: 'large', spot: 'back' },
  { id: 'dice', name: 'Lucky Dice', price: 90, sharp: 0, street: 3, pain: 1, size: 'small', spot: 'hand' },
  { id: 'anchor', name: 'Anchor', price: 110, sharp: 1, street: 2, pain: 2, size: 'small', spot: 'forearm' },
  { id: 'snake', name: 'Snake', price: 280, sharp: 1, street: 4, pain: 3, size: 'medium', spot: 'leg' },
  { id: 'phoenix', name: 'Phoenix', price: 750, sharp: 4, street: 5, pain: 5, size: 'large', spot: 'chest' },
  { id: 'wire', name: 'Barbed Wire', price: 130, sharp: 0, street: 3, pain: 3, size: 'medium', spot: 'arm' },
  { id: 'star', name: 'Star', price: 80, sharp: 1, street: 1, pain: 1, size: 'small', spot: 'wrist' },
];

export const PIERCINGS = [
  { id: 'ear-stud', name: 'Ear Stud', price: 25, sharp: 1, street: 1, pain: 1 },
  { id: 'nose-ring', name: 'Nose Ring', price: 40, sharp: 1, street: 3, pain: 2 },
  { id: 'brow-bar', name: 'Eyebrow Bar', price: 45, sharp: 2, street: 3, pain: 2 },
  { id: 'lip-ring', name: 'Lip Ring', price: 50, sharp: 0, street: 4, pain: 3 },
  { id: 'tongue-stud', name: 'Tongue Stud', price: 60, sharp: 1, street: 3, pain: 3 },
];

export const BARBER_TRENDS = [
  { id: 'fade-season', name: 'Fade Season', boosts: ['fade', 'undercut'], mult: 1.5 },
  { id: 'retro', name: 'Retro', boosts: ['pompadour', 'slick', 'mustache'], mult: 1.5 },
  { id: 'street', name: 'Street', boosts: ['dreads', 'mohawk', 'afro'], mult: 1.5 },
  { id: 'minimal', name: 'Minimal', boosts: ['buzz', 'bald', 'clean'], mult: 1.5 },
  { id: 'ink', name: 'Ink Wave', boosts: ['dragon', 'phoenix', 'solara'], mult: 1.5 },
];

export const BARBER_CLIENTS = [
  { id: 'lil-tuna', name: 'Lil Tuna', kind: 'rapper', patience: 3, tip: 0.5, wants: ['fade', 'dreads', 'mohawk'] },
  { id: 'mrs-voss', name: 'Mrs. Voss', kind: 'ceo', patience: 2, tip: 0.8, wants: ['slick', 'pompadour', 'undercut'] },
  { id: 'big-ray', name: 'Big Ray', kind: 'biker', patience: 4, tip: 0.3, wants: ['buzz', 'bald', 'full'] },
  { id: 'maya', name: 'Maya', kind: 'student', patience: 5, tip: 0.1, wants: ['afro', 'man-bun', 'undercut'] },
  { id: 'dante', name: 'Dante Cole', kind: 'actor', patience: 2, tip: 1.0, wants: ['pompadour', 'slick', 'fade'] },
  { id: 'diaz', name: 'Officer Diaz', kind: 'cop', patience: 3, tip: 0.2, wants: ['buzz', 'clean', 'stubble'] },
  { id: 'dj-mira', name: 'DJ Mira', kind: 'dj', patience: 4, tip: 0.6, wants: ['undercut', 'fade', 'mohawk'] },
  { id: 'silas', name: 'Silas Crown', kind: 'gangster', patience: 1, tip: 1.2, wants: ['slick', 'crown', 'dragon'] },
];

export const BARBER_UPGRADES = [
  { id: 'chair2', name: 'Second Chair', price: 800, desc: 'Serve 2 clients at once.' },
  { id: 'neon', name: 'Neon Sign', price: 400, desc: 'Plus 20 percent walk-ins.' },
  { id: 'ink-gun', name: 'Pro Ink Gun', price: 650, desc: 'Tattoos 30 percent cheaper plus 1 street.' },
  { id: 'mirror', name: 'LED Mirrors', price: 350, desc: 'Plus 1 sharpness on every cut.' },
  { id: 'sound', name: 'Shop Sound System', price: 300, desc: 'Clients wait 25 percent longer.' },
  { id: 'franchise', name: 'Second Location', price: 5000, desc: 'Passive income 120 dollars per day.' },
];

export const BARBER_APPOINTMENTS = [
  { id: 'vip', name: 'VIP Appointment', fee: 100, reward: 250, needSharp: 8 },
  { id: 'wedding', name: 'Wedding Party', fee: 0, reward: 400, needSharp: 12 },
  { id: 'shoot', name: 'Magazine Shoot', fee: 0, reward: 600, needSharp: 18 },
  { id: 'crew', name: 'Crew Cut Day', fee: 0, reward: 300, needStreet: 12 },
];

const HAIR_DYES = [
  { id: 'jet-black', name: 'Jet Black', price: 20, sharp: 1, street: 0 },
  { id: 'platinum', name: 'Platinum Blonde', price: 30, sharp: 2, street: 0 },
  { id: 'crimson', name: 'Crimson Red', price: 25, sharp: 0, street: 2 },
  { id: 'ocean-blue', name: 'Ocean Blue', price: 25, sharp: 0, street: 2 },
  { id: 'silver', name: 'Silver Fox', price: 35, sharp: 2, street: 1 },
  { id: 'candy-pink', name: 'Candy Pink', price: 25, sharp: 1, street: 2 },
  { id: 'forest-green', name: 'Forest Green', price: 25, sharp: 0, street: 2 },
  { id: 'royal-purple', name: 'Royal Purple', price: 30, sharp: 1, street: 2 },
];

const BARBER_PRODUCTS = [
  { id: 'pomade', name: 'Pomade', price: 12, effect: 'Plus 1 sharpness.' },
  { id: 'beard-oil', name: 'Beard Oil', price: 10, effect: 'Plus 1 sharpness.' },
  { id: 'wax', name: 'Hair Wax', price: 14, effect: 'Plus 1 street.' },
  { id: 'ink-care', name: 'Ink Care Balm', price: 16, effect: 'Plus 1 street.' },
  { id: 'shampoo', name: 'Salon Shampoo', price: 8, effect: 'Clean hair, fresh smell.' },
  { id: 'gel', name: 'Styling Gel', price: 9, effect: 'Holds any style all day.' },
];

const WEDDING_PACKAGES = [
  { id: 'classic', name: 'Classic Wedding', price: 0, reward: 500, needSharp: 10 },
  { id: 'royal', name: 'Royal Wedding', price: 0, reward: 900, needSharp: 16 },
  { id: 'beach', name: 'Beach Wedding', price: 0, reward: 650, needSharp: 12 },
];

const BARBER_RIVALS = [
  { id: 'slick-sam', name: 'Slick Sam', skill: 0.5, bet: 100 },
  { id: 'razor-ron', name: 'Razor Ron', skill: 0.65, bet: 200 },
  { id: 'clipper-kate', name: 'Clipper Kate', skill: 0.8, bet: 400 },
];

function pickFrom(list, id) {
  for (const item of list) if (item.id === id) return item;
  return null;
}

export function barberStyleScore(style) {
  let sharp = 0;
  let street = 0;
  const hair = pickFrom(HAIRCUTS, style.hair);
  if (hair) { sharp += hair.sharp; street += hair.street; }
  const beard = pickFrom(BEARDS, style.beard);
  if (beard) { sharp += beard.sharp; street += beard.street; }
  for (const t of style.tattoos || []) {
    const rec = pickFrom(TATTOOS, t);
    if (rec) { sharp += rec.sharp; street += rec.street; }
  }
  for (const p of style.piercings || []) {
    const rec = pickFrom(PIERCINGS, p);
    if (rec) { sharp += rec.sharp; street += rec.street; }
  }
  return { sharp, street };
}

export function createBarberSystem(deps) {
  const d = deps || {};
  const rnd = typeof d.rng === 'function' ? d.rng : Math.random;
  const cashOf = typeof d.getCash === 'function' ? d.getCash : () => 0;
  const moveCash = typeof d.addCash === 'function' ? d.addCash : () => {};
  const say = typeof d.log === 'function' ? d.log : () => {};
  const dayOf = typeof d.getDay === 'function' ? d.getDay : () => 1;
  const hourOf = typeof d.getHour === 'function' ? d.getHour : () => 12;
  const posOf = typeof d.getPlayerPos === 'function' ? d.getPlayerPos : () => ({ x: 0, z: 0 });

  const state = {
    style: { hair: 'buzz', beard: 'clean', tattoos: [], piercings: [] },
    sharp: 3,
    street: 2,
    cutsDone: 0,
    tattoosDone: 0,
    piercingsDone: 0,
    clientsServed: 0,
    clientsAngry: 0,
    tipsEarned: 0,
    bestTip: 0,
    shopRating: 3.0,
    ratingCount: 10,
    upgrades: [],
    trend: BARBER_TRENDS[0].id,
    trendDay: 1,
    currentClient: null,
    clientWait: 0,
    nextClient: 20,
    hairGrowth: 0,
    lastCutDay: 1,
    loyalty: 0,
    shopLevel: 1,
    dailyClients: 0,
    inkSessions: 0,
    painTotal: 0,
    appointmentsDone: 0,
    vipClients: 0,
    revenue: 0,
    regrets: 0,
    removals: 0,
    dye: null,
    products: {},
    weddingsDone: 0,
    battles: { won: 0, lost: 0 },
    loyaltyCards: 0,
    radioSong: null,
  };

  function trendRec() {
    return pickFrom(BARBER_TRENDS, state.trend) || BARBER_TRENDS[0];
  }

  function trendMultFor(itemId) {
    const t = trendRec();
    return t.boosts.includes(itemId) ? t.mult : 1;
  }

  function hasUpgrade(id) {
    return state.upgrades.includes(id);
  }

  function recomputeStyle() {
    const score = barberStyleScore(state.style);
    state.sharp = score.sharp;
    state.street = score.street;
    if (hasUpgrade('mirror')) state.sharp += 1;
    if (hasUpgrade('ink-gun')) state.street += 1;
    if (state.dye) {
      const dye = pickFrom(HAIR_DYES, state.dye);
      if (dye) { state.sharp += dye.sharp; state.street += dye.street; }
    }
  }

  function shopOpen() {
    const h = hourOf();
    return h >= 9 && h < 21;
  }

  function getHaircut(cutId) {
    const cut = pickFrom(HAIRCUTS, cutId);
    if (!cut) return { ok: false, reason: 'unknown-cut' };
    if (!shopOpen()) return { ok: false, reason: 'shop-closed' };
    const price = Math.round(cut.price * trendMultFor(cutId));
    if (cashOf() < price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-price);
    state.style.hair = cutId;
    state.cutsDone += 1;
    state.hairGrowth = 0;
    state.lastCutDay = dayOf();
    state.loyalty += 1;
    recomputeStyle();
    say('Got a ' + cut.name + ' for $' + price + '.');
    return { ok: true, cutId, price, sharp: state.sharp, street: state.street };
  }

  function getBeard(beardId) {
    const beard = pickFrom(BEARDS, beardId);
    if (!beard) return { ok: false, reason: 'unknown-beard' };
    if (!shopOpen()) return { ok: false, reason: 'shop-closed' };
    if (cashOf() < beard.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-beard.price);
    state.style.beard = beardId;
    state.cutsDone += 1;
    state.loyalty += 1;
    recomputeStyle();
    say('Trimmed a ' + beard.name + ' for $' + beard.price + '.');
    return { ok: true, beardId, price: beard.price, sharp: state.sharp, street: state.street };
  }

  function getTattoo(tattooId) {
    const tat = pickFrom(TATTOOS, tattooId);
    if (!tat) return { ok: false, reason: 'unknown-tattoo' };
    if (!shopOpen()) return { ok: false, reason: 'shop-closed' };
    if (state.style.tattoos.includes(tattooId)) return { ok: false, reason: 'already-inked' };
    let price = Math.round(tat.price * trendMultFor(tattooId));
    if (hasUpgrade('ink-gun')) price = Math.round(price * 0.7);
    if (cashOf() < price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-price);
    state.style.tattoos.push(tattooId);
    state.tattoosDone += 1;
    state.inkSessions += 1;
    state.painTotal += tat.pain;
    state.loyalty += 1;
    recomputeStyle();
    say('Inked a ' + tat.name + ' for $' + price + '.');
    return { ok: true, tattooId, price, pain: tat.pain, sharp: state.sharp, street: state.street };
  }

  function removeTattoo(tattooId) {
    if (!state.style.tattoos.includes(tattooId)) return { ok: false, reason: 'not-inked' };
    const tat = pickFrom(TATTOOS, tattooId);
    const price = Math.round((tat ? tat.price : 0) * 0.6);
    if (cashOf() < price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-price);
    state.style.tattoos = state.style.tattoos.filter((t) => t !== tattooId);
    state.removals += 1;
    state.regrets += 1;
    recomputeStyle();
    return { ok: true, removedId: tattooId, price };
  }

  function getPiercing(piercingId) {
    const rec = pickFrom(PIERCINGS, piercingId);
    if (!rec) return { ok: false, reason: 'unknown-piercing' };
    if (!shopOpen()) return { ok: false, reason: 'shop-closed' };
    if (state.style.piercings.includes(piercingId)) return { ok: false, reason: 'already-pierced' };
    if (cashOf() < rec.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-rec.price);
    state.style.piercings.push(piercingId);
    state.piercingsDone += 1;
    state.painTotal += rec.pain;
    state.loyalty += 1;
    recomputeStyle();
    say('Pierced a ' + rec.name + ' for $' + rec.price + '.');
    return { ok: true, piercingId, price: rec.price, pain: rec.pain, sharp: state.sharp, street: state.street };
  }

  function spawnClient() {
    const base = BARBER_CLIENTS[Math.floor(rnd() * BARBER_CLIENTS.length)];
    const want = base.wants[Math.floor(rnd() * base.wants.length)];
    const client = { ...base, wants: [...base.wants], want, wait: 60 + base.patience * 20 };
    state.currentClient = client;
    state.clientWait = client.wait;
    say('Walk-in: ' + base.name + ' wants a ' + want + '.');
    return { ...client };
  }

  function serveClient(cutId) {
    if (!state.currentClient) return { ok: false, reason: 'no-client' };
    const cut = pickFrom(HAIRCUTS, cutId);
    if (!cut) return { ok: false, reason: 'unknown-cut' };
    const client = state.currentClient;
    state.currentClient = null;
    state.clientWait = 0;
    const happy = client.want === cutId;
    const tip = happy ? Math.round(cut.price * client.tip * 100) / 100 : 0;
    const pay = cut.price + tip;
    moveCash(pay);
    state.revenue += pay;
    state.tipsEarned += tip;
    if (tip > state.bestTip) state.bestTip = tip;
    state.clientsServed += 1;
    state.dailyClients += 1;
    if (happy) {
      state.shopRating = Math.min(5, state.shopRating + (5 - state.shopRating) * 0.1);
      state.loyalty += 1;
      if (client.kind === 'actor' || client.kind === 'gangster') state.vipClients += 1;
    } else {
      state.shopRating = Math.max(1, state.shopRating + (2.5 - state.shopRating) * 0.1);
      state.clientsAngry += 1;
    }
    state.ratingCount += 1;
    say('Served ' + client.name + (happy ? ', happy' : ', not happy') + ' — $' + pay + '.');
    return { ok: true, pay, tip, happy, clientId: client.id };
  }

  function refuseClient() {
    if (!state.currentClient) return { ok: false, reason: 'no-client' };
    const client = state.currentClient;
    state.currentClient = null;
    state.clientWait = 0;
    state.clientsAngry += 1;
    state.shopRating = Math.max(1, state.shopRating - 0.1);
    return { ok: true, refusedId: client.id };
  }

  function bookAppointment(apptId) {
    const appt = pickFrom(BARBER_APPOINTMENTS, apptId);
    if (!appt) return { ok: false, reason: 'unknown-appointment' };
    if (appt.needSharp && state.sharp < appt.needSharp) return { ok: false, reason: 'sharp-too-low' };
    if (appt.needStreet && state.street < appt.needStreet) return { ok: false, reason: 'street-too-low' };
    if (cashOf() < appt.fee) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-appt.fee);
    moveCash(appt.reward);
    state.revenue += appt.reward;
    state.appointmentsDone += 1;
    state.loyalty += 3;
    return { ok: true, appointmentId: apptId, reward: appt.reward };
  }

  function buyUpgrade(upgradeId) {
    const up = pickFrom(BARBER_UPGRADES, upgradeId);
    if (!up) return { ok: false, reason: 'unknown-upgrade' };
    if (hasUpgrade(upgradeId)) return { ok: false, reason: 'already-owned' };
    if (cashOf() < up.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-up.price);
    state.upgrades.push(upgradeId);
    state.shopLevel += 1;
    recomputeStyle();
    return { ok: true, upgradeId, price: up.price };
  }

  function rotateTrend() {
    const next = BARBER_TRENDS[Math.floor(rnd() * BARBER_TRENDS.length)];
    state.trend = next.id;
    state.trendDay = dayOf();
    say('New trend: ' + next.name + '.');
    return { ...next };
  }

  function dyeHair(dyeId) {
    const dye = pickFrom(HAIR_DYES, dyeId);
    if (!dye) return { ok: false, reason: 'unknown-dye' };
    if (!shopOpen()) return { ok: false, reason: 'shop-closed' };
    if (cashOf() < dye.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-dye.price);
    state.dye = dyeId;
    state.cutsDone += 1;
    state.loyalty += 1;
    recomputeStyle();
    state.sharp += dye.sharp;
    state.street += dye.street;
    return { ok: true, dyeId, price: dye.price, sharp: state.sharp, street: state.street };
  }

  function buyProduct(productId) {
    const prod = pickFrom(BARBER_PRODUCTS, productId);
    if (!prod) return { ok: false, reason: 'unknown-product' };
    if (cashOf() < prod.price) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-prod.price);
    state.products[productId] = (state.products[productId] || 0) + 1;
    if (productId === 'pomade' || productId === 'beard-oil') state.sharp += 1;
    if (productId === 'wax' || productId === 'ink-care') state.street += 1;
    return { ok: true, productId, price: prod.price };
  }

  function bookWedding(packageId) {
    const pkg = pickFrom(WEDDING_PACKAGES, packageId);
    if (!pkg) return { ok: false, reason: 'unknown-package' };
    if (state.sharp < pkg.needSharp) return { ok: false, reason: 'sharp-too-low' };
    moveCash(pkg.reward);
    state.revenue += pkg.reward;
    state.appointmentsDone += 1;
    state.weddingsDone += 1;
    state.loyalty += 4;
    return { ok: true, packageId, reward: pkg.reward };
  }

  function barberBattle(rivalId) {
    const rival = pickFrom(BARBER_RIVALS, rivalId);
    if (!rival) return { ok: false, reason: 'unknown-rival' };
    if (cashOf() < rival.bet) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-rival.bet);
    const skill = 0.4 + state.sharp * 0.03 + state.street * 0.02 + state.cutsDone * 0.001;
    const won = rnd() < skill / (skill + rival.skill);
    let prize = 0;
    if (won) {
      prize = rival.bet * 2;
      moveCash(prize);
      state.revenue += prize;
      state.battles.won += 1;
      state.shopRating = Math.min(5, state.shopRating + 0.2);
    } else {
      state.battles.lost += 1;
      state.shopRating = Math.max(1, state.shopRating - 0.1);
    }
    return { ok: true, won, prize, rivalId };
  }

  function giveLoyaltyCard() {
    if (state.loyalty < 5) return { ok: false, reason: 'not-enough-loyalty' };
    state.loyaltyCards += 1;
    return { ok: true, cards: state.loyaltyCards, discount: 10 };
  }

  function shopRadio(songId) {
    const song = songId || BARBER_TRENDS[Math.floor(rnd() * BARBER_TRENDS.length)].id;
    state.radioSong = song;
    return { ok: true, song };
  }

  function deepCleanShop() {
    if (cashOf() < 50) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-50);
    state.shopRating = Math.min(5, state.shopRating + 0.15);
    return { ok: true, cost: 50, rating: Math.round(state.shopRating * 10) / 10 };
  }

  function tick(dt) {
    const step = dt || 0;
    if (shopOpen() && !state.currentClient) {
      const rate = hasUpgrade('neon') ? 1.2 : 1;
      state.nextClient -= step * rate;
      if (state.nextClient <= 0) {
        spawnClient();
        state.nextClient = 45 + rnd() * 90;
      }
    }
    if (state.currentClient) {
      state.clientWait -= step;
      if (state.clientWait <= 0) {
        state.currentClient = null;
        state.clientWait = 0;
        state.clientsAngry += 1;
        state.shopRating = Math.max(1, state.shopRating - 0.15);
        say('A client walked out waiting.');
      }
    }
    if (dayOf() - state.lastCutDay >= 3) {
      state.hairGrowth = Math.min(100, state.hairGrowth + step * 0.05);
    }
  }

  function tickDay(day) {
    const today = day !== undefined && day !== null ? day : dayOf();
    if (today - state.trendDay >= 2) rotateTrend();
    state.hairGrowth = Math.min(100, state.hairGrowth + 15);
    state.dailyClients = 0;
    state.lastCutDay = state.lastCutDay;
    if (state.hairGrowth >= 60 && state.style.hair !== 'bald') say('Your hair is getting shaggy.');
    if (hasUpgrade('franchise')) {
      moveCash(120);
      state.revenue += 120;
    }
    if (state.loyalty >= 10 && state.loyalty % 10 === 0) {
      state.hairGrowth = 0;
      say('Loyalty free trim — hair tidied up.');
    }
    return { day: today, trendId: state.trend, hairGrowth: Math.round(state.hairGrowth), rating: Math.round(state.shopRating * 10) / 10 };
  }

  function interact() {
    const pos = posOf();
    const dx = pos.x - BARBER_SHOP.x;
    const dz = pos.z - BARBER_SHOP.z;
    if (Math.hypot(dx, dz) > 14) return false;
    if (!shopOpen()) {
      say('Fresh Cuts is open 09:00 to 21:00.');
      return true;
    }
    if (state.currentClient) {
      const res = serveClient(state.currentClient.want);
      return res.ok;
    }
    const trend = trendRec();
    for (const cutId of trend.boosts) {
      const cut = pickFrom(HAIRCUTS, cutId);
      if (!cut) continue;
      const price = Math.round(cut.price * trendMultFor(cutId));
      if (cashOf() >= price) {
        getHaircut(cutId);
        return true;
      }
      return true;
    }
    return false;
  }

  function hudLine() {
    if (state.currentClient) {
      return 'CLIENT ' + state.currentClient.name + ' wants ' + state.currentClient.want + ' · ' + Math.ceil(state.clientWait) + 's';
    }
    const pos = posOf();
    const dx = pos.x - BARBER_SHOP.x;
    const dz = pos.z - BARBER_SHOP.z;
    if (Math.hypot(dx, dz) <= 14) {
      return 'FRESH CUTS · Sharp ' + state.sharp + ' · Street ' + state.street + ' · ' + trendRec().name + ' · ' + Math.round(state.shopRating * 10) / 10 + '★';
    }
    if (state.hairGrowth >= 60) return 'Your hair is shaggy — time for a cut.';
    return '';
  }

  function stats() {
    return {
      hair: state.style.hair,
      beard: state.style.beard,
      tattoos: [...state.style.tattoos],
      piercings: [...state.style.piercings],
      sharp: state.sharp,
      street: state.street,
      cutsDone: state.cutsDone,
      tattoosDone: state.tattoosDone,
      piercingsDone: state.piercingsDone,
      clientsServed: state.clientsServed,
      clientsAngry: state.clientsAngry,
      tipsEarned: state.tipsEarned,
      bestTip: state.bestTip,
      shopRating: Math.round(state.shopRating * 10) / 10,
      ratingCount: state.ratingCount,
      upgrades: [...state.upgrades],
      shopLevel: state.shopLevel,
      trendId: state.trend,
      trendName: trendRec().name,
      clientWaiting: state.currentClient ? state.currentClient.name : null,
      appointmentsDone: state.appointmentsDone,
      vipClients: state.vipClients,
      revenue: state.revenue,
      regrets: state.regrets,
      removals: state.removals,
      hairGrowth: Math.round(state.hairGrowth),
      loyalty: state.loyalty,
      dailyClients: state.dailyClients,
      inkSessions: state.inkSessions,
      painTotal: state.painTotal,
      shopOpen: shopOpen(),
    };
  }

  function serialize() {
    return {
      style: { hair: state.style.hair, beard: state.style.beard, tattoos: [...state.style.tattoos], piercings: [...state.style.piercings] },
      cutsDone: state.cutsDone,
      tattoosDone: state.tattoosDone,
      piercingsDone: state.piercingsDone,
      clientsServed: state.clientsServed,
      clientsAngry: state.clientsAngry,
      tipsEarned: state.tipsEarned,
      bestTip: state.bestTip,
      shopRating: state.shopRating,
      ratingCount: state.ratingCount,
      upgrades: [...state.upgrades],
      trend: state.trend,
      trendDay: state.trendDay,
      appointmentsDone: state.appointmentsDone,
      vipClients: state.vipClients,
      revenue: state.revenue,
      regrets: state.regrets,
      removals: state.removals,
      hairGrowth: state.hairGrowth,
      lastCutDay: state.lastCutDay,
      loyalty: state.loyalty,
      shopLevel: state.shopLevel,
      inkSessions: state.inkSessions,
      painTotal: state.painTotal,
      dye: state.dye,
      products: { ...state.products },
      weddingsDone: state.weddingsDone,
      battles: { ...state.battles },
      loyaltyCards: state.loyaltyCards,
      radioSong: state.radioSong,
    };
  }

  function deserialize(saved) {
    const s = saved || {};
    const st = s.style || {};
    state.style = {
      hair: typeof st.hair === 'string' ? st.hair : 'buzz',
      beard: typeof st.beard === 'string' ? st.beard : 'clean',
      tattoos: Array.isArray(st.tattoos) ? [...st.tattoos] : [],
      piercings: Array.isArray(st.piercings) ? [...st.piercings] : [],
    };
    state.cutsDone = Math.floor(Number(s.cutsDone) || 0);
    state.tattoosDone = Math.floor(Number(s.tattoosDone) || 0);
    state.piercingsDone = Math.floor(Number(s.piercingsDone) || 0);
    state.clientsServed = Math.floor(Number(s.clientsServed) || 0);
    state.clientsAngry = Math.floor(Number(s.clientsAngry) || 0);
    state.tipsEarned = Number(s.tipsEarned) || 0;
    state.bestTip = Number(s.bestTip) || 0;
    state.shopRating = Number(s.shopRating) || 3.0;
    state.ratingCount = Math.floor(Number(s.ratingCount) || 0);
    state.upgrades = Array.isArray(s.upgrades) ? [...s.upgrades] : [];
    state.trend = pickFrom(BARBER_TRENDS, s.trend) ? s.trend : BARBER_TRENDS[0].id;
    state.trendDay = Math.floor(Number(s.trendDay) || 1);
    state.appointmentsDone = Math.floor(Number(s.appointmentsDone) || 0);
    state.vipClients = Math.floor(Number(s.vipClients) || 0);
    state.revenue = Number(s.revenue) || 0;
    state.regrets = Math.floor(Number(s.regrets) || 0);
    state.removals = Math.floor(Number(s.removals) || 0);
    state.hairGrowth = Number(s.hairGrowth) || 0;
    state.lastCutDay = Math.floor(Number(s.lastCutDay) || 1);
    state.loyalty = Math.floor(Number(s.loyalty) || 0);
    state.shopLevel = Math.floor(Number(s.shopLevel) || 1);
    state.inkSessions = Math.floor(Number(s.inkSessions) || 0);
    state.painTotal = Number(s.painTotal) || 0;
    state.dye = s.dye || null;
    state.products = s.products && typeof s.products === 'object' ? { ...s.products } : {};
    state.weddingsDone = Math.floor(Number(s.weddingsDone) || 0);
    state.battles = { won: Math.floor(Number(s.battles && s.battles.won) || 0), lost: Math.floor(Number(s.battles && s.battles.lost) || 0) };
    state.loyaltyCards = Math.floor(Number(s.loyaltyCards) || 0);
    state.radioSong = s.radioSong || null;
    state.currentClient = null;
    state.clientWait = 0;
    state.nextClient = 20;
    recomputeStyle();
    return { ok: true };
  }

  return {
    name: 'Barber',
    state,
    trendMultFor,
    hasUpgrade,
    recomputeStyle,
    shopOpen,
    getHaircut,
    getBeard,
    getTattoo,
    removeTattoo,
    getPiercing,
    spawnClient,
    serveClient,
    refuseClient,
    bookAppointment,
    buyUpgrade,
    rotateTrend,
    dyeHair,
    buyProduct,
    bookWedding,
    barberBattle,
    giveLoyaltyCard,
    shopRadio,
    deepCleanShop,
    tick,
    tickDay,
    interact,
    hudLine,
    stats,
    serialize,
    deserialize,
  };
}
