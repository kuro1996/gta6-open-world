export const NIGHTCLUBS = [
  { id: 'basement', name: 'The Basement', district: 'Old Town', price: 1200, capacity: 80, baseCover: 10, baseBuzz: 35, blurb: 'Sweaty, loud, and always packed.' },
  { id: 'neon-reef', name: 'Neon Reef', district: 'Marina', price: 3500, capacity: 180, baseCover: 20, baseBuzz: 45, blurb: 'Neon light on the water.' },
  { id: 'velvet-room', name: 'The Velvet Room', district: 'Downtown', price: 8000, capacity: 320, baseCover: 35, baseBuzz: 55, blurb: 'Velvet ropes, velvet sound.' },
  { id: 'rooftop-88', name: 'Rooftop 88', district: 'Downtown', price: 15000, capacity: 500, baseCover: 50, baseBuzz: 65, blurb: 'The whole city below, the sky above.' },
];

export const NIGHTCLUB_DJS = [
  { id: 'static', name: 'DJ Static', fee: 150, buzz: 10, style: 'Electro', blurb: 'Crackling energy, every set.' },
  { id: 'mira', name: 'DJ Mira Sol', fee: 450, buzz: 18, style: 'House', blurb: 'Sunset house that never lets go.' },
  { id: 'kova', name: 'DJ Kova', fee: 900, buzz: 28, style: 'Techno', blurb: 'Relentless, driving techno.' },
  { id: 'nova', name: 'DJ Nova Lux', fee: 2200, buzz: 40, style: 'Headline', blurb: 'The name on every poster in town.' },
];

export const NIGHTCLUB_UPGRADES = [
  { id: 'sound', name: 'Sound System', price: 600, buzz: 8, blurb: 'Speakers you feel in your chest.' },
  { id: 'lights', name: 'Light Rig', price: 500, buzz: 7, blurb: 'Lasers, strobes, and haze.' },
  { id: 'security', name: 'Security Team', price: 900, buzz: 4, blurb: 'Calm doors, fewer complaints.', heatCut: 1 },
  { id: 'vip', name: 'VIP Lounge', price: 1500, buzz: 10, blurb: 'Bottle service behind the rope.', vip: 4 },
  { id: 'bar', name: 'Top-Shelf Bar', price: 1100, buzz: 9, blurb: 'Drinks worth the cover charge.' },
];

const VIP_PRICE = 250;
const COMPLAINT_HEAT = 1;
const BUZZ_MAX = 100;

function deep(v) {
  return JSON.parse(JSON.stringify(v));
}

export function createNightclubSystem(ctx) {
  const c = ctx || {};
  const roll = typeof c.rng === 'function' ? c.rng : () => Math.random();

  const state = {
    owned: {},
    nights: 0,
    earned: 0,
    spent: 0,
    vipSold: 0,
    complaints: 0,
    bestNight: 0,
    lastNight: null,
    lastSettledDay: null,
  };

  function say(msg) {
    if (typeof c.log === 'function') c.log(msg);
  }

  function clubOf(id) {
    return NIGHTCLUBS.find((x) => x.id === id) || null;
  }

  function djOf(id) {
    return NIGHTCLUB_DJS.find((x) => x.id === id) || null;
  }

  function upgradeOf(id) {
    return NIGHTCLUB_UPGRADES.find((x) => x.id === id) || null;
  }

  function buzzFor(id) {
    const def = clubOf(id);
    const own = state.owned[id];
    if (!def || !own) return 0;
    let buzz = def.baseBuzz;
    if (own.dj) {
      const dj = djOf(own.dj);
      if (dj) buzz += dj.buzz;
    }
    for (const uid of own.upgrades) {
      const up = upgradeOf(uid);
      if (up) buzz += up.buzz;
    }
    const over = own.cover - def.baseCover;
    if (over > 0) buzz -= Math.floor(over / 10) * 3;
    else if (over < 0) buzz += Math.floor(-over / 10) * 2;
    return Math.max(0, Math.min(BUZZ_MAX, buzz));
  }

  function vipTables(id) {
    const own = state.owned[id];
    if (!own) return 0;
    let n = 0;
    for (const uid of own.upgrades) {
      const up = upgradeOf(uid);
      if (up && up.vip) n += up.vip;
    }
    return n;
  }

  function hasSecurity(id) {
    const own = state.owned[id];
    if (!own) return 0;
    let cut = 0;
    for (const uid of own.upgrades) {
      const up = upgradeOf(uid);
      if (up && up.heatCut) cut += up.heatCut;
    }
    return cut;
  }

  const sys = {
    state,

    buyClub(id) {
      const def = clubOf(id);
      if (!def) return { ok: false, reason: 'unknown-club' };
      if (state.owned[id]) return { ok: false, reason: 'already-owned' };
      const cash = typeof c.getCash === 'function' ? c.getCash() : 0;
      if (cash < def.price) return { ok: false, reason: 'no-cash', price: def.price, cash };
      if (typeof c.addCash === 'function') c.addCash(-def.price);
      state.spent += def.price;
      state.owned[id] = { id, cover: def.baseCover, dj: null, upgrades: [], nights: 0, earned: 0 };
      say(`Bought ${def.name} for $${def.price}.`);
      return { ok: true, club: def.name, clubName: def.name, price: def.price };
    },

    sellClub(id) {
      const def = clubOf(id);
      const own = state.owned[id];
      if (!def || !own) return { ok: false, reason: 'not-owned' };
      let upgradeSpend = 0;
      for (const uid of own.upgrades) {
        const up = upgradeOf(uid);
        if (up) upgradeSpend += up.price;
      }
      const price = Math.round(def.price * 0.6 + upgradeSpend * 0.5);
      if (typeof c.addCash === 'function') c.addCash(price);
      delete state.owned[id];
      say(`Sold ${def.name} for $${price}.`);
      return { ok: true, club: def.name, clubName: def.name, price };
    },

    setCover(id, cover) {
      const own = state.owned[id];
      if (!own) return { ok: false, reason: 'not-owned' };
      const n = Math.floor(Number(cover));
      if (!Number.isFinite(n) || n < 0 || n > 200) return { ok: false, reason: 'bad-cover', cover };
      own.cover = n;
      return { ok: true, club: id, cover: n, buzz: buzzFor(id) };
    },

    bookDj(id, djId) {
      const def = clubOf(id);
      const own = state.owned[id];
      const dj = djOf(djId);
      if (!def || !own) return { ok: false, reason: 'not-owned' };
      if (!dj) return { ok: false, reason: 'unknown-dj' };
      const cash = typeof c.getCash === 'function' ? c.getCash() : 0;
      if (cash < dj.fee) return { ok: false, reason: 'no-cash', fee: dj.fee, cash };
      if (typeof c.addCash === 'function') c.addCash(-dj.fee);
      state.spent += dj.fee;
      own.dj = dj.id;
      say(`${dj.name} booked for ${def.name}.`);
      return { ok: true, club: def.name, dj: dj.name, djName: dj.name, fee: dj.fee, buzz: buzzFor(id) };
    },

    buyUpgrade(id, upgradeId) {
      const def = clubOf(id);
      const own = state.owned[id];
      const up = upgradeOf(upgradeId);
      if (!def || !own) return { ok: false, reason: 'not-owned' };
      if (!up) return { ok: false, reason: 'unknown-upgrade' };
      if (own.upgrades.includes(up.id)) return { ok: false, reason: 'already-installed' };
      const cash = typeof c.getCash === 'function' ? c.getCash() : 0;
      if (cash < up.price) return { ok: false, reason: 'no-cash', price: up.price, cash };
      if (typeof c.addCash === 'function') c.addCash(-up.price);
      state.spent += up.price;
      own.upgrades.push(up.id);
      say(`${up.name} installed at ${def.name}.`);
      return { ok: true, club: def.name, upgrade: up.name, upgradeName: up.name, price: up.price, buzz: buzzFor(id) };
    },

    runNight(id) {
      const def = clubOf(id);
      const own = state.owned[id];
      if (!def || !own) return { ok: false, reason: 'not-owned' };
      const hour = typeof c.getHour === 'function' ? c.getHour() : 22;
      if (hour >= 6 && hour < 18) return { ok: false, reason: 'daytime', hour };
      const buzz = buzzFor(id);
      const factor = 0.7 + roll() * 0.6;
      let attendance = Math.floor(def.capacity * (buzz / 100) * factor);
      if (attendance > def.capacity) attendance = def.capacity;
      const tables = vipTables(id);
      const vipIncome = tables * VIP_PRICE;
      const gross = attendance * own.cover + vipIncome;
      const costs = 40 + def.capacity / 10;
      const net = Math.round(gross - costs);
      if (typeof c.addCash === 'function') c.addCash(net);
      own.nights += 1;
      own.earned += net;
      state.nights += 1;
      state.earned += net;
      state.vipSold += tables;
      if (net > state.bestNight) state.bestNight = net;
      let complained = false;
      if (buzz < 30) {
        state.complaints += 1;
        complained = true;
        let heat = COMPLAINT_HEAT + (buzz < 15 ? 1 : 0) - hasSecurity(id);
        heat = Math.max(0, heat);
        if (heat > 0 && typeof c.addHeat === 'function') c.addHeat(heat);
      }
      const result = { club: def.name, clubId: id, attendance, buzz, gross: Math.round(gross), costs: Math.round(costs), net, vipTables: tables, complained };
      state.lastNight = result;
      say(`${def.name}: ${attendance} guests, $${net} net.`);
      return { ok: true, ...result };
    },

    settleDay(day) {
      if (state.lastSettledDay === day) return { ok: false, reason: 'already-settled', day };
      state.lastSettledDay = day;
      const results = [];
      for (const id of Object.keys(state.owned)) {
        const def = clubOf(id);
        const own = state.owned[id];
        const buzz = buzzFor(id);
        const attendance = Math.floor(def.capacity * (buzz / 100) * 0.5);
        const tables = vipTables(id);
        const take = Math.max(0, Math.round(attendance * own.cover + tables * VIP_PRICE - 60));
        if (typeof c.addCash === 'function') c.addCash(take);
        own.nights += 1;
        own.earned += take;
        state.nights += 1;
        state.earned += take;
        if (take > state.bestNight) state.bestNight = take;
        results.push({ club: def.name, clubId: id, attendance, take, net: take });
      }
      return { ok: true, day, results };
    },

    clubStatus(id) {
      const def = clubOf(id);
      if (!def) return null;
      const own = state.owned[id];
      if (!own) {
        return { id, owned: false, name: def.name, price: def.price, capacity: def.capacity, baseCover: def.baseCover, baseBuzz: def.baseBuzz };
      }
      return {
        id, owned: true, name: def.name, cover: own.cover, buzz: buzzFor(id),
        dj: own.dj, upgrades: [...own.upgrades], vipTables: vipTables(id),
        nights: own.nights, earned: own.earned,
      };
    },

    buzzOf(id) { return buzzFor(id); },

    stats() {
      return {
        owned: Object.keys(state.owned).length,
        ownedCount: Object.keys(state.owned).length,
        ownedIds: Object.keys(state.owned),
        nights: state.nights,
        earned: state.earned,
        spent: state.spent,
        profit: state.earned - state.spent,
        vipSold: state.vipSold,
        vipTablesSold: state.vipSold,
        complaints: state.complaints,
        bestNight: state.bestNight,
        lastNight: state.lastNight ? deep(state.lastNight) : null,
      };
    },

    hudLine() {
      if (Object.keys(state.owned).length === 0) return '';
      return `Nightclubs ${Object.keys(state.owned).length} · Earned $${state.earned} · Best night $${state.bestNight}`;
    },

    serialize() {
      return {
        owned: deep(state.owned),
        nights: state.nights,
        earned: state.earned,
        spent: state.spent,
        vipSold: state.vipSold,
        complaints: state.complaints,
        bestNight: state.bestNight,
        lastNight: state.lastNight ? deep(state.lastNight) : null,
        lastSettledDay: state.lastSettledDay,
      };
    },

    deserialize(input) {
      if (!input || typeof input !== 'object') return;
      if (input.owned && typeof input.owned === 'object') state.owned = deep(input.owned);
      if (typeof input.nights === 'number') state.nights = input.nights;
      if (typeof input.earned === 'number') state.earned = input.earned;
      if (typeof input.spent === 'number') state.spent = input.spent;
      if (typeof input.vipSold === 'number') state.vipSold = input.vipSold;
      if (typeof input.complaints === 'number') state.complaints = input.complaints;
      if (typeof input.bestNight === 'number') state.bestNight = input.bestNight;
      if (input.lastNight) state.lastNight = deep(input.lastNight);
      if (typeof input.lastSettledDay === 'number' || input.lastSettledDay === null) state.lastSettledDay = input.lastSettledDay;
    },
  };

  return sys;
}
