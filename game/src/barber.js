// Fresh Cuts & Ink — barbershop and tattoo parlour: haircuts, beards,
// tattoos, piercings, style stats and celebrity clients. Round 7,
// all-new system. Your look is a stat: Sharpness opens doors with the
// rich, Street Cred opens doors with the crews, and a bad tattoo closes
// both. Book appointments, ride the trend cycle, keep the shop's rating
// up, and take walk-in clients for cash while your own style levels up.
export const BARBER_SHOP = { id: 'fresh-cuts', name: 'Fresh Cuts & Ink', x: 55, z: -25, district: 'Downtown' };

export const HAIRCUTS = [
  { id: 'buzz', name: 'Buzz Cut', price: 15, sharp: 1, street: 2, time: 10, trend: 0.6 },
  { id: 'fade', name: 'Skin Fade', price: 25, sharp: 3, street: 2, time: 15, trend: 1.0 },
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
  { id: 'mustache', name: 'Handlebar Mustache', price: 16, sharp: 4, street: 1 },
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
  { id: 'barbed', name: 'Barbed Wire', price: 130, sharp: 0, street: 3, pain: 3, size: 'medium', spot: 'arm' },
  { id: 'star', name: 'Star', price: 80, sharp: 1, street: 1, pain: 1, size: 'small', spot: 'wrist' },
];

export const PIERCINGS = [
  { id: 'ear', name: 'Ear Stud', price: 25, sharp: 1, street: 1, pain: 1 },
  { id: 'nose', name: 'Nose Ring', price: 40, sharp: 1, street: 3, pain: 2 },
  { id: 'brow', name: 'Eyebrow Bar', price: 45, sharp: 2, street: 3, pain: 2 },
  { id: 'lip', name: 'Lip Ring', price: 50, sharp: 0, street: 4, pain: 3 },
  { id: 'tongue', name: 'Tongue Stud', price: 60, sharp: 1, street: 3, pain: 3 },
];

export const BARBER_TRENDS = [
  { id: 'fade-season', name: 'Fade Season', boosts: ['fade', 'undercut'], mult: 1.5 },
  { id: 'retro', name: 'Retro Wave', boosts: ['pompadour', 'slick', 'mustache'], mult: 1.5 },
  { id: 'street', name: 'Street Wave', boosts: ['dreads', 'mohawk', 'afro'], mult: 1.5 },
  { id: 'minimal', name: 'Minimal Wave', boosts: ['buzz', 'bald', 'clean'], mult: 1.5 },
  { id: 'ink', name: 'Ink Wave', boosts: ['dragon', 'phoenix', 'solara'], mult: 1.5 },
];

export const BARBER_CLIENTS = [
  { id: 'rapper', name: 'Lil Tuna', kind: 'rapper', patience: 3, tip: 0.5, wants: ['fade', 'dreads', 'mohawk'] },
  { id: 'ceo', name: 'Mrs. Voss', kind: 'ceo', patience: 2, tip: 0.8, wants: ['slick', 'pompadour', 'undercut'] },
  { id: 'biker', name: 'Big Ray', kind: 'biker', patience: 4, tip: 0.3, wants: ['buzz', 'bald', 'full'] },
  { id: 'student', name: 'Maya', kind: 'student', patience: 5, tip: 0.1, wants: ['afro', 'man-bun', 'undercut'] },
  { id: 'actor', name: 'Dante Cole', kind: 'actor', patience: 2, tip: 1.0, wants: ['pompadour', 'slick', 'fade'] },
  { id: 'cop', name: 'Officer Diaz', kind: 'cop', patience: 3, tip: 0.2, wants: ['buzz', 'clean', 'stubble'] },
  { id: 'dj', name: 'DJ Mira', kind: 'dj', patience: 4, tip: 0.6, wants: ['undercut', 'fade', 'mohawk'] },
  { id: 'gangster', name: 'Silas Crown', kind: 'gangster', patience: 1, tip: 1.2, wants: ['slick', 'crown', 'dragon'] },
];

export const BARBER_UPGRADES = [
  { id: 'chair2', name: 'Second Chair', price: 800, desc: 'serve 2 clients at once' },
  { id: 'neon', name: 'Neon Sign', price: 400, desc: '+20% walk-ins' },
  { id: 'ink-gun', name: 'Pro Ink Gun', price: 650, desc: 'tattoos 30% cheaper to do, +1 street' },
  { id: 'mirror', name: 'LED Mirrors', price: 350, desc: '+1 sharpness on every cut' },
  { id: 'sound', name: 'Shop Sound System', price: 300, desc: 'clients wait 25% longer' },
  { id: 'franchise', name: 'Second Location', price: 5000, desc: 'passive income $120/day' },
];

export const BARBER_APPOINTMENTS = [
  { id: 'vip', name: 'VIP Appointment', fee: 100, reward: 250, needSharp: 8 },
  { id: 'wedding', name: 'Wedding Party', fee: 0, reward: 400, needSharp: 12 },
  { id: 'shoot', name: 'Magazine Shoot', fee: 0, reward: 600, needSharp: 18 },
  { id: 'crew', name: 'Crew Cut Day', fee: 0, reward: 300, needStreet: 12 },
];

export function barberStyleScore(style) {
  const hair = HAIRCUTS.find((h) => h.id === style.hair);
  const beard = BEARDS.find((b) => b.id === style.beard);
  let sharp = 0;
  let street = 0;
  if (hair) { sharp += hair.sharp; street += hair.street; }
  if (beard) { sharp += beard.sharp; street += beard.street; }
  for (const t of style.tattoos || []) {
    const tat = TATTOOS.find((x) => x.id === t);
    if (tat) { sharp += tat.sharp; street += tat.street; }
  }
  for (const p of style.piercings || []) {
    const pier = PIERCINGS.find((x) => x.id === p);
    if (pier) { sharp += pier.sharp; street += pier.street; }
  }
  return { sharp, street };
}

export function createBarberSystem(deps = {}) {
  const rng = deps.rng || Math.random;
  const getCash = deps.getCash || (() => 0);
  const addCash = deps.addCash || (() => {});
  const addHeat = deps.addHeat || (() => {});
  const log = deps.log || (() => {});
  const getDay = deps.getDay || (() => 1);
  const getHour = deps.getHour || (() => 12);
  const getPlayerPos = deps.getPlayerPos || (() => ({ x: 0, z: 0 }));

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
    shopRating: 3.0,
    ratingCount: 10,
    upgrades: [],
    trend: BARBER_TRENDS[0],
    trendDay: 1,
    currentClient: null,
    clientWait: 0,
    nextClientIn: 20,
    appointmentsDone: 0,
    vipClients: 0,
    revenue: 0,
    regrets: 0,
    removals: 0,
    hairGrowth: 0, // 0 fresh .. 100 shaggy; grows daily
    lastCutDay: 1,
    loyalty: 0,
    shopLevel: 1,
    dailyClients: 0,
    bestTip: 0,
    inkSessions: 0,
    painTotal: 0,
  };

  function trendMultFor(itemId) {
    return state.trend.boosts.includes(itemId) ? state.trend.mult : 1;
  }
  function hasUpgrade(id) { return state.upgrades.includes(id); }
  function recomputeStyle() {
    const score = barberStyleScore(state.style);
    state.sharp = score.sharp + (hasUpgrade('mirror') ? 1 : 0);
    state.street = score.street + (hasUpgrade('ink-gun') ? 1 : 0);
    if (state.style.dye) {
      const dye = HAIR_DYES.find((d) => d.id === state.style.dye);
      if (dye) { state.sharp += dye.sharp; state.street += dye.street; }
    }
  }
  function shopOpen() {
    const h = getHour();
    return h >= 9 && h < 21;
  }

  function getHaircut(cutId) {
    const cut = HAIRCUTS.find((c) => c.id === cutId);
    if (!cut) return { ok: false, reason: 'no-such-cut' };
    if (!shopOpen()) return { ok: false, reason: 'shop-closed' };
    const price = Math.round(cut.price * trendMultFor(cutId));
    if (getCash() < price) return { ok: false, reason: 'no-cash', need: price };
    addCash(-price);
    state.style.hair = cutId;
    state.cutsDone += 1;
    state.hairGrowth = 0;
    state.lastCutDay = getDay();
    state.loyalty += 1;
    recomputeStyle();
    const trendNote = trendMultFor(cutId) > 1 ? ' (trending!)' : '';
    log(`Fresh cut: ${cut.name} for $${price}${trendNote}. Sharp ${state.sharp}, Street ${state.street}.`);
    return { ok: true, cut: cutId, price, sharp: state.sharp, street: state.street };
  }

  function getBeard(beardId) {
    const beard = BEARDS.find((b) => b.id === beardId);
    if (!beard) return { ok: false, reason: 'no-such-beard' };
    if (!shopOpen()) return { ok: false, reason: 'shop-closed' };
    if (getCash() < beard.price) return { ok: false, reason: 'no-cash', need: beard.price };
    addCash(-beard.price);
    state.style.beard = beardId;
    state.cutsDone += 1;
    recomputeStyle();
    log(`Beard styled: ${beard.name} for $${beard.price}. Sharp ${state.sharp}, Street ${state.street}.`);
    return { ok: true, beard: beardId, price: beard.price, sharp: state.sharp, street: state.street };
  }

  function getTattoo(tatId) {
    const tat = TATTOOS.find((t) => t.id === tatId);
    if (!tat) return { ok: false, reason: 'no-such-tattoo' };
    if (!shopOpen()) return { ok: false, reason: 'shop-closed' };
    if (state.style.tattoos.includes(tatId)) return { ok: false, reason: 'already-inked' };
    let price = Math.round(tat.price * trendMultFor(tatId));
    if (hasUpgrade('ink-gun')) price = Math.round(price * 0.7);
    if (getCash() < price) return { ok: false, reason: 'no-cash', need: price };
    addCash(-price);
    state.style.tattoos.push(tatId);
    state.tattoosDone += 1;
    state.inkSessions += 1;
    state.painTotal += tat.pain;
    state.loyalty += 2;
    recomputeStyle();
    log(`Inked: ${tat.name} (${tat.spot}, ${tat.size}) for $${price}. Pain ${tat.pain}/5. Sharp ${state.sharp}, Street ${state.street}.`);
    return { ok: true, tattoo: tatId, price, pain: tat.pain, sharp: state.sharp, street: state.street };
  }

  function removeTattoo(tatId) {
    if (!state.style.tattoos.includes(tatId)) return { ok: false, reason: 'not-inked' };
    const tat = TATTOOS.find((t) => t.id === tatId);
    const price = Math.round(tat.price * 0.6);
    if (getCash() < price) return { ok: false, reason: 'no-cash', need: price };
    addCash(-price);
    state.style.tattoos = state.style.tattoos.filter((t) => t !== tatId);
    state.removals += 1;
    state.regrets += 1;
    recomputeStyle();
    log(`Laser removal: ${tat.name} gone for $${price}. Sometimes a look just doesn't age well.`);
    return { ok: true, removed: tatId, price };
  }

  function getPiercing(pierceId) {
    const pier = PIERCINGS.find((p) => p.id === pierceId);
    if (!pier) return { ok: false, reason: 'no-such-piercing' };
    if (!shopOpen()) return { ok: false, reason: 'shop-closed' };
    if (state.style.piercings.includes(pierceId)) return { ok: false, reason: 'already-pierced' };
    if (getCash() < pier.price) return { ok: false, reason: 'no-cash', need: pier.price };
    addCash(-pier.price);
    state.style.piercings.push(pierceId);
    state.piercingsDone += 1;
    state.painTotal += pier.pain;
    recomputeStyle();
    log(`Pierced: ${pier.name} for $${pier.price}. Sharp ${state.sharp}, Street ${state.street}.`);
    return { ok: true, piercing: pierceId, price: pier.price };
  }

  function spawnClient() {
    const client = BARBER_CLIENTS[Math.floor(rng() * BARBER_CLIENTS.length)];
    const want = client.wants[Math.floor(rng() * client.wants.length)];
    state.currentClient = { ...client, wantsId: want, waitLeft: 60 + client.patience * 20 };
    state.clientWait = state.currentClient.waitLeft;
    log(`Walk-in: ${client.name} (${client.kind}) wants a ${want}. Serve them before they walk out!`);
    return { ...state.currentClient };
  }

  function serveClient(cutId) {
    const client = state.currentClient;
    if (!client) return { ok: false, reason: 'no-client' };
    const cut = HAIRCUTS.find((c) => c.id === cutId) || BEARDS.find((b) => b.id === cutId);
    if (!cut) return { ok: false, reason: 'no-such-cut' };
    state.currentClient = null;
    state.clientsServed += 1;
    state.dailyClients += 1;
    const base = cut.price;
    const isWant = cutId === client.wantsId;
    const tip = isWant ? Math.round(base * client.tip) : 0;
    const pay = base + tip;
    addCash(pay);
    state.revenue += pay;
    state.tipsEarned += tip;
    if (tip > state.bestTip) state.bestTip = tip;
    // Rating moves toward the outcome.
    const target = isWant ? 5 : 2.5;
    state.shopRating = (state.shopRating * state.ratingCount + target) / (state.ratingCount + 1);
    state.ratingCount += 1;
    if (isWant) {
      state.loyalty += 1;
      if (client.kind === 'actor' || client.kind === 'gangster') state.vipClients += 1;
      log(`Served ${client.name} exactly what they wanted! $${pay} (tip $${tip}). Rating ${state.shopRating.toFixed(1)}.`);
      return { ok: true, pay, tip, happy: true, client: client.id };
    }
    state.clientsAngry += 1;
    log(`${client.name} wanted ${client.wantsId}, got ${cutId}. They pay $${pay} but leave unhappy.`);
    return { ok: true, pay, tip, happy: false, client: client.id };
  }

  function refuseClient() {
    if (!state.currentClient) return { ok: false, reason: 'no-client' };
    const client = state.currentClient;
    state.currentClient = null;
    state.clientsAngry += 1;
    state.shopRating = Math.max(1, state.shopRating - 0.1);
    log(`Turned away ${client.name}. They will remember that.`);
    return { ok: true, refused: client.id };
  }

  function bookAppointment(apptId) {
    const appt = BARBER_APPOINTMENTS.find((a) => a.id === apptId);
    if (!appt) return { ok: false, reason: 'no-such-appointment' };
    if (appt.needSharp && state.sharp < appt.needSharp) return { ok: false, reason: 'sharp-too-low', need: appt.needSharp };
    if (appt.needStreet && state.street < appt.needStreet) return { ok: false, reason: 'street-too-low', need: appt.needStreet };
    if (appt.fee > 0 && getCash() < appt.fee) return { ok: false, reason: 'no-cash', need: appt.fee };
    if (appt.fee > 0) addCash(-appt.fee);
    addCash(appt.reward);
    state.revenue += appt.reward;
    state.appointmentsDone += 1;
    state.loyalty += 3;
    log(`${appt.name} booked! Earned $${appt.reward}. Sharp ${state.sharp}, Street ${state.street} opened that door.`);
    return { ok: true, appointment: apptId, reward: appt.reward };
  }

  function buyUpgrade(upId) {
    const up = BARBER_UPGRADES.find((u) => u.id === upId);
    if (!up) return { ok: false, reason: 'no-such-upgrade' };
    if (hasUpgrade(upId)) return { ok: false, reason: 'already-owned' };
    if (getCash() < up.price) return { ok: false, reason: 'no-cash', need: up.price };
    addCash(-up.price);
    state.upgrades.push(upId);
    state.shopLevel += 1;
    recomputeStyle();
    log(`Shop upgrade: ${up.name} for $${up.price}. ${up.desc}.`);
    return { ok: true, upgrade: upId, price: up.price };
  }

  function rotateTrend() {
    const idx = Math.floor(rng() * BARBER_TRENDS.length);
    state.trend = BARBER_TRENDS[idx];
    state.trendDay = getDay();
    log(`New trend in Solara: ${state.trend.name}! ${state.trend.boosts.join(', ')} are hot — cuts cost more but pay more.`);
    return { ...state.trend };
  }

  function tick(dt) {
    // Walk-ins arrive while the shop is open and no client is waiting.
    if (shopOpen() && !state.currentClient) {
      state.nextClientIn -= dt * (hasUpgrade('neon') ? 1.2 : 1);
      if (state.nextClientIn <= 0) {
        state.nextClientIn = 45 + rng() * 90;
        spawnClient();
      }
    }
    // A waiting client loses patience in real time.
    if (state.currentClient) {
      state.currentClient.waitLeft -= dt;
      state.clientWait = state.currentClient.waitLeft;
      if (state.currentClient.waitLeft <= 0) {
        const client = state.currentClient;
        state.currentClient = null;
        state.clientsAngry += 1;
        state.shopRating = Math.max(1, state.shopRating - 0.15);
        log(`${client.name} got tired of waiting and walked out. Rating ${state.shopRating.toFixed(1)}.`);
      }
    }
    // Hair grows: after 3 days without a cut, sharpness starts to slip.
    if (getDay() - state.lastCutDay >= 3) {
      state.hairGrowth = Math.min(100, state.hairGrowth + dt * 0.05);
    }
  }

  function tickDay(day) {
    // Trend rotates every 2 days; hair grows a full step each morning.
    if (day - state.trendDay >= 2) rotateTrend();
    state.hairGrowth = Math.min(100, state.hairGrowth + 15);
    state.dailyClients = 0;
    state.lastCutDay = state.lastCutDay; // explicit: no-op, kept for save clarity
    if (state.hairGrowth >= 60 && state.style.hair !== 'bald') {
      log('Your hair is getting shaggy — a fresh cut would restore your Sharpness.');
    }
    // Franchise passive income.
    if (hasUpgrade('franchise')) {
      addCash(120);
      state.revenue += 120;
      log('Second location paid out $120 in passive income.');
    }
    // Loyalty discount: every 10 loyalty, a free trim is offered.
    if (state.loyalty >= 10 && state.loyalty % 10 === 0) {
      state.hairGrowth = 0;
      log('Loyalty reward: a free trim! Hair is fresh again.');
    }
    return { day, trend: state.trend.id, hairGrowth: Math.round(state.hairGrowth), rating: Number(state.shopRating.toFixed(1)) };
  }

  function interact() {
    const p = getPlayerPos();
    const d = Math.hypot(BARBER_SHOP.x - p.x, BARBER_SHOP.z - p.z);
    if (d > 14) return false;
    if (!shopOpen()) {
      log('Fresh Cuts & Ink is closed (open 09:00–21:00).');
      return true;
    }
    // If a client waits, serve them what they asked for.
    if (state.currentClient) {
      const res = serveClient(state.currentClient.wantsId);
      return res.ok;
    }
    // Otherwise get yourself the trending cut.
    const trending = state.trend.boosts.find((b) => HAIRCUTS.some((h) => h.id === b));
    if (trending) {
      const res = getHaircut(trending);
      return res.ok || res.reason === 'no-cash';
    }
    return true;
  }

  function hudLine() {
    const p = getPlayerPos();
    const d = Math.hypot(BARBER_SHOP.x - p.x, BARBER_SHOP.z - p.z);
    if (state.currentClient) {
      return `CLIENT ${state.currentClient.name} wants ${state.currentClient.wantsId} — ${Math.ceil(state.currentClient.waitLeft)}s left!`;
    }
    if (d < 14) {
      return `FRESH CUTS · Sharp ${state.sharp} · Street ${state.street} · ${state.trend.name} · ★${state.shopRating.toFixed(1)}`;
    }
    if (state.hairGrowth >= 60) return 'HAIR shaggy — visit Fresh Cuts & Ink';
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
      shopRating: Number(state.shopRating.toFixed(1)),
      ratingCount: state.ratingCount,
      upgrades: [...state.upgrades],
      shopLevel: state.shopLevel,
      trend: state.trend.id,
      trendName: state.trend.name,
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
      trend: state.trend.id,
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
      dye: state.style.dye || null,
      products: { ...(state.products || {}) },
      weddingsDone: state.weddingsDone || 0,
      battles: state.battles ? { ...state.battles } : { won: 0, lost: 0 },
      loyaltyCards: state.loyaltyCards || 0,
      radioSong: state.radioSong || null,
    };
  }

  function deserialize(d) {
    if (!d) return;
    state.style = {
      hair: d.style?.hair ?? 'buzz',
      beard: d.style?.beard ?? 'clean',
      tattoos: [...(d.style?.tattoos || [])],
      piercings: [...(d.style?.piercings || [])],
    };
    state.cutsDone = d.cutsDone ?? 0;
    state.tattoosDone = d.tattoosDone ?? 0;
    state.piercingsDone = d.piercingsDone ?? 0;
    state.clientsServed = d.clientsServed ?? 0;
    state.clientsAngry = d.clientsAngry ?? 0;
    state.tipsEarned = d.tipsEarned ?? 0;
    state.bestTip = d.bestTip ?? 0;
    state.shopRating = d.shopRating ?? 3.0;
    state.ratingCount = d.ratingCount ?? 10;
    state.upgrades = [...(d.upgrades || [])];
    state.trend = BARBER_TRENDS.find((t) => t.id === d.trend) || BARBER_TRENDS[0];
    state.trendDay = d.trendDay ?? 1;
    state.appointmentsDone = d.appointmentsDone ?? 0;
    state.vipClients = d.vipClients ?? 0;
    state.revenue = d.revenue ?? 0;
    state.regrets = d.regrets ?? 0;
    state.removals = d.removals ?? 0;
    state.hairGrowth = d.hairGrowth ?? 0;
    state.lastCutDay = d.lastCutDay ?? 1;
    state.loyalty = d.loyalty ?? 0;
    state.shopLevel = d.shopLevel ?? 1;
    state.inkSessions = d.inkSessions ?? 0;
    state.painTotal = d.painTotal ?? 0;
    state.style.dye = d.dye || null;
    state.products = { ...(d.products || {}) };
    state.weddingsDone = d.weddingsDone ?? 0;
    state.battles = d.battles ? { ...d.battles } : { won: 0, lost: 0 };
    state.loyaltyCards = d.loyaltyCards ?? 0;
    state.radioSong = d.radioSong || null;
    state.currentClient = null;
    state.nextClientIn = 20;
    recomputeStyle();
  }

  // --- Round 7 top-up: hair dye, products, weddings, barber battles ---
  const HAIR_DYES = [
    { id: 'black', name: 'Jet Black', price: 30, sharp: 1, street: 1 },
    { id: 'blonde', name: 'Platinum Blonde', price: 45, sharp: 3, street: 2 },
    { id: 'red', name: 'Fire Red', price: 40, sharp: 1, street: 4 },
    { id: 'blue', name: 'Electric Blue', price: 50, sharp: 2, street: 5 },
    { id: 'pink', name: 'Bubblegum Pink', price: 50, sharp: 2, street: 4 },
    { id: 'silver', name: 'Silver Fox', price: 60, sharp: 5, street: 1 },
    { id: 'green', name: 'Neon Green', price: 55, sharp: 0, street: 5 },
    { id: 'rainbow', name: 'Rainbow', price: 90, sharp: 3, street: 5 },
  ];
  const BARBER_PRODUCTS = [
    { id: 'pomade', name: 'Pomade', price: 15, effect: '+1 sharp for a day' },
    { id: 'beard-oil', name: 'Beard Oil', price: 18, effect: '+1 sharp, +1 street for a day' },
    { id: 'wax', name: 'Hair Wax', price: 12, effect: '+1 street for a day' },
    { id: 'spray', name: 'Hold Spray', price: 10, effect: 'style lasts 2 days longer' },
    { id: 'shampoo', name: 'Premium Shampoo', price: 20, effect: 'hair growth -50% for a day' },
    { id: 'ink-care', name: 'Tattoo Aftercare', price: 25, effect: 'tattoos heal faster, +1 street' },
  ];
  const WEDDING_PACKAGES = [
    { id: 'groom', name: 'Groom Package', price: 0, reward: 250, needSharp: 10 },
    { id: 'groomsmen', name: 'Groomsmen (4)', price: 0, reward: 500, needSharp: 12 },
    { id: 'full-wedding', name: 'Full Wedding Party', price: 0, reward: 900, needSharp: 16 },
  ];
  const BARBER_RIVALS = [
    { id: 'slick-sam', name: 'Slick Sam', skill: 0.6, bet: 100 },
    { id: 'razor-rita', name: 'Razor Rita', skill: 0.75, bet: 250 },
    { id: 'master-blade', name: 'Master Blade', skill: 0.9, bet: 500 },
  ];
  function dyeHair(dyeId) {
    const dye = HAIR_DYES.find((d) => d.id === dyeId);
    if (!dye) return { ok: false, reason: 'no-such-dye' };
    if (!shopOpen()) return { ok: false, reason: 'shop-closed' };
    if (getCash() < dye.price) return { ok: false, reason: 'no-cash', need: dye.price };
    addCash(-dye.price);
    state.style.dye = dyeId;
    state.cutsDone += 1;
    state.loyalty += 1;
    recomputeStyle();
    state.sharp += dye.sharp;
    state.street += dye.street;
    log(`Hair dyed ${dye.name} for $${dye.price}. Sharp ${state.sharp}, Street ${state.street}.`);
    return { ok: true, dye: dyeId, price: dye.price, sharp: state.sharp, street: state.street };
  }
  function buyProduct(productId) {
    const product = BARBER_PRODUCTS.find((p) => p.id === productId);
    if (!product) return { ok: false, reason: 'no-such-product' };
    if (getCash() < product.price) return { ok: false, reason: 'no-cash', need: product.price };
    addCash(-product.price);
    state.products = state.products || {};
    state.products[productId] = (state.products[productId] || 0) + 1;
    if (productId === 'pomade' || productId === 'beard-oil') state.sharp += 1;
    if (productId === 'wax' || productId === 'ink-care') state.street += 1;
    log(`Bought ${product.name} for $${product.price}. ${product.effect}.`);
    return { ok: true, product: productId, price: product.price };
  }
  function bookWedding(packageId) {
    const pkg = WEDDING_PACKAGES.find((w) => w.id === packageId);
    if (!pkg) return { ok: false, reason: 'no-such-package' };
    if (state.sharp < pkg.needSharp) return { ok: false, reason: 'sharp-too-low', need: pkg.needSharp };
    addCash(pkg.reward);
    state.revenue += pkg.reward;
    state.appointmentsDone += 1;
    state.loyalty += 4;
    state.weddingsDone = (state.weddingsDone || 0) + 1;
    log(`${pkg.name} booked! Earned $${pkg.reward}. The wedding party looks sharp.`);
    return { ok: true, package: packageId, reward: pkg.reward };
  }
  function barberBattle(rivalId) {
    const rival = BARBER_RIVALS.find((r) => r.id === rivalId);
    if (!rival) return { ok: false, reason: 'no-such-rival' };
    if (getCash() < rival.bet) return { ok: false, reason: 'no-cash', need: rival.bet };
    addCash(-rival.bet);
    const mySkill = 0.4 + state.sharp * 0.03 + state.street * 0.02 + state.cutsDone * 0.001;
    const won = rng() < mySkill / (mySkill + rival.skill);
    state.battles = state.battles || { won: 0, lost: 0 };
    if (won) {
      const prize = rival.bet * 2;
      addCash(prize);
      state.revenue += prize;
      state.battles.won += 1;
      state.shopRating = Math.min(5, state.shopRating + 0.2);
      log(`BARBER BATTLE WIN! You out-cut ${rival.name}! Won $${prize}. Rating up!`);
      return { ok: true, won: true, prize, rival: rivalId };
    }
    state.battles.lost += 1;
    state.shopRating = Math.max(1, state.shopRating - 0.1);
    log(`${rival.name} out-cuts you. The bet is gone, and so is a little pride.`);
    return { ok: true, won: false, prize: 0, rival: rivalId };
  }
  function giveLoyaltyCard() {
    if (state.loyalty < 5) return { ok: false, reason: 'loyalty-too-low', need: 5 };
    state.loyaltyCards = (state.loyaltyCards || 0) + 1;
    const discount = 10;
    log(`Loyalty card stamped! Next cut is $${discount} off.`);
    return { ok: true, cards: state.loyaltyCards, discount };
  }
  function shopRadio(songId) {
    const songs = ['fade-season', 'retro', 'street', 'minimal', 'ink'];
    const pick = songId || songs[Math.floor(rng() * songs.length)];
    state.radioSong = pick;
    log(`Shop radio now playing: ${pick}. The clients nod along.`);
    return { ok: true, song: pick };
  }
  function deepCleanShop() {
    const cost = 50;
    if (getCash() < cost) return { ok: false, reason: 'no-cash', need: cost };
    addCash(-cost);
    state.shopRating = Math.min(5, state.shopRating + 0.15);
    log(`Deep-cleaned the shop for $${cost}. Rating up to ${state.shopRating.toFixed(1)}.`);
    return { ok: true, cost, rating: Number(state.shopRating.toFixed(1)) };
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
    trendMultFor,
    hasUpgrade,
    shopOpen,
    recomputeStyle,
    dyeHair,
    buyProduct,
    bookWedding,
    barberBattle,
    giveLoyaltyCard,
    shopRadio,
    deepCleanShop,
  };
}
