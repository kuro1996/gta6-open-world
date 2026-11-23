// Solara Nights — Nightclub Empire (Round 6 attempt 8).
// Own and run Solara Bay's nightclubs: buy a venue, book DJs, set the
// cover charge, sell VIP tables, and keep the neighbours (and the cops)
// happy. A club earns every in-game night it is open; a bad night —
// cheap DJ, high cover, no security — costs heat, rep and cash instead.
// The system owns its state and only touches the game through the small
// ctx hooks below (rng / getCash / addCash / addHeat / log / getHour /
// getDay), the same factory pattern as arcade.js / bank.js / tuning.js.

export const NIGHTCLUBS = [
  {
    id: 'basement',
    name: 'The Basement',
    district: 'Docks',
    price: 1200,
    capacity: 80,
    baseCover: 10,
    baseBuzz: 22,
    blurb: 'A sweaty dockside cellar with a soundsystem held together by hope.',
  },
  {
    id: 'neon-reef',
    name: 'Neon Reef',
    district: 'Marina',
    price: 3500,
    capacity: 220,
    baseCover: 25,
    baseBuzz: 48,
    blurb: 'Glass floor over the marina, lasers, and a queue round the block.',
  },
  {
    id: 'velvet-room',
    name: 'The Velvet Room',
    district: 'Plaza',
    price: 8000,
    capacity: 150,
    baseCover: 60,
    baseBuzz: 70,
    blurb: 'Members-only velvet and brass. The mayor drinks here. So does Crown.',
  },
  {
    id: 'rooftop-88',
    name: 'Rooftop 88',
    district: 'Downtown',
    price: 15000,
    capacity: 400,
    baseCover: 45,
    baseBuzz: 82,
    blurb: 'Eighty-eight floors up, open sky, the whole bay glittering below.',
  },
];

export const NIGHTCLUB_DJS = [
  { id: 'dj-static', name: 'DJ Static', fee: 150, buzz: 12, style: 'house', blurb: 'Reliable local. Never misses a beat, never moves a crowd either.' },
  { id: 'dj-mira', name: 'DJ Mira Sol', fee: 450, buzz: 30, style: 'techno', blurb: 'Marina favourite. Her 2 a.m. sets are the stuff of legend.' },
  { id: 'dj-kova', name: 'DJ Kova', fee: 900, buzz: 52, style: 'drum & bass', blurb: 'Imports from the mainland. One set and the city talks for a week.' },
  { id: 'dj-nova', name: 'DJ Nova Lux', fee: 2200, buzz: 78, style: 'electro', blurb: 'Global headliner. Books out a year ahead — except tonight, somehow.' },
];

export const NIGHTCLUB_UPGRADES = [
  { id: 'sound', name: 'Sound System', price: 600, buzz: 10, blurb: '+10 buzz. The bass hits the chest, not just the ears.' },
  { id: 'lights', name: 'Laser Rig', price: 900, buzz: 12, blurb: '+12 buzz. Half the crowd comes just to film the ceiling.' },
  { id: 'security', name: 'Door Security', price: 750, buzz: 4, heatCut: 1, blurb: '+4 buzz, −1 heat per night. Bouncers who actually bounce trouble.' },
  { id: 'vip-lounge', name: 'VIP Lounge', price: 1800, buzz: 14, vip: 6, blurb: '+14 buzz and 6 VIP tables a night. Bottle service pays the rent.' },
  { id: 'rooftop-bar', name: 'Rooftop Bar', price: 1400, buzz: 9, blurb: '+9 buzz. Sunset drinks, midnight regret, morning tips.' },
];

const VIP_TABLE_PRICE = 250;
const COMPLAINT_HEAT = 1; // heat per bad night before security cuts it
const MAX_BUZZ = 100;

function clampBuzz(n) {
  return Math.max(0, Math.min(MAX_BUZZ, n));
}

export function createNightclubSystem(ctx) {
  const state = {
    owned: {}, // clubId -> { upgrades: [], dj: null, cover: number, nights: number, earned: number }
    nightsRun: 0,
    totalEarned: 0,
    totalSpent: 0,
    vipSold: 0,
    complaints: 0,
    bestNight: 0,
    lastNight: null,
    lastDaySettled: -1,
  };

  function clubById(id) {
    return NIGHTCLUBS.find((c) => c.id === id) || null;
  }

  function djById(id) {
    return NIGHTCLUB_DJS.find((d) => d.id === id) || null;
  }

  function upgradeById(id) {
    return NIGHTCLUB_UPGRADES.find((u) => u.id === id) || null;
  }

  function buzzOf(clubId) {
    const club = clubById(clubId);
    const owned = state.owned[clubId];
    if (!club || !owned) return 0;
    let buzz = club.baseBuzz;
    if (owned.dj) {
      const dj = djById(owned.dj);
      if (dj) buzz += dj.buzz;
    }
    for (const upId of owned.upgrades) {
      const up = upgradeById(upId);
      if (up) buzz += up.buzz;
    }
    // Cover charge pushes the crowd away: every $10 over the base cover
    // costs 3 buzz, every $10 under it buys 2 buzz back.
    const over = owned.cover - club.baseCover;
    buzz += over > 0 ? -Math.floor(over / 10) * 3 : Math.floor(-over / 10) * 2;
    return clampBuzz(buzz);
  }

  function vipTables(clubId) {
    const owned = state.owned[clubId];
    if (!owned) return 0;
    let tables = 0;
    for (const upId of owned.upgrades) {
      const up = upgradeById(upId);
      if (up && up.vip) tables += up.vip;
    }
    return tables;
  }

  function securityCut(clubId) {
    const owned = state.owned[clubId];
    if (!owned) return 0;
    let cut = 0;
    for (const upId of owned.upgrades) {
      const up = upgradeById(upId);
      if (up && up.heatCut) cut += up.heatCut;
    }
    return cut;
  }

  function buyClub(id) {
    const club = clubById(id);
    if (!club) return { ok: false, reason: 'no-such-club' };
    if (state.owned[id]) return { ok: false, reason: 'already-owned' };
    if (ctx.getCash() < club.price) return { ok: false, reason: 'no-cash', need: club.price };
    ctx.addCash(-club.price);
    state.totalSpent += club.price;
    state.owned[id] = { upgrades: [], dj: null, cover: club.baseCover, nights: 0, earned: 0 };
    ctx.log(`Bought ${club.name} for $${club.price} — the night is yours now.`);
    return { ok: true, club: club.name, price: club.price };
  }

  function sellClub(id) {
    const club = clubById(id);
    const owned = state.owned[id];
    if (!club || !owned) return { ok: false, reason: 'not-owned' };
    // Resale: 60% of the purchase price plus half the upgrade spend.
    let upgradeSpend = 0;
    for (const upId of owned.upgrades) {
      const up = upgradeById(upId);
      if (up) upgradeSpend += up.price;
    }
    const price = Math.floor(club.price * 0.6 + upgradeSpend * 0.5);
    ctx.addCash(price);
    delete state.owned[id];
    ctx.log(`Sold ${club.name} for $${price}.`);
    return { ok: true, club: club.name, price };
  }

  function setCover(id, cover) {
    const owned = state.owned[id];
    if (!owned) return { ok: false, reason: 'not-owned' };
    const n = Math.floor(Number(cover));
    if (!Number.isFinite(n) || n < 0 || n > 200) return { ok: false, reason: 'bad-cover' };
    owned.cover = n;
    return { ok: true, club: id, cover: n, buzz: buzzOf(id) };
  }

  function bookDj(clubId, djId) {
    const owned = state.owned[clubId];
    if (!owned) return { ok: false, reason: 'not-owned' };
    const dj = djById(djId);
    if (!dj) return { ok: false, reason: 'no-such-dj' };
    if (ctx.getCash() < dj.fee) return { ok: false, reason: 'no-cash', need: dj.fee };
    ctx.addCash(-dj.fee);
    state.totalSpent += dj.fee;
    owned.dj = djId;
    ctx.log(`Booked ${dj.name} at ${clubById(clubId).name} — $${dj.fee} for the night.`);
    return { ok: true, club: clubId, dj: dj.name, fee: dj.fee, buzz: buzzOf(clubId) };
  }

  function buyUpgrade(clubId, upgradeId) {
    const owned = state.owned[clubId];
    if (!owned) return { ok: false, reason: 'not-owned' };
    const up = upgradeById(upgradeId);
    if (!up) return { ok: false, reason: 'no-such-upgrade' };
    if (owned.upgrades.includes(upgradeId)) return { ok: false, reason: 'already-installed' };
    if (ctx.getCash() < up.price) return { ok: false, reason: 'no-cash', need: up.price };
    ctx.addCash(-up.price);
    state.totalSpent += up.price;
    owned.upgrades.push(upgradeId);
    ctx.log(`${up.name} installed at ${clubById(clubId).name} — $${up.price}.`);
    return { ok: true, club: clubId, upgrade: up.name, price: up.price, buzz: buzzOf(clubId) };
  }

  // Run one night at one club. Attendance scales with buzz and capacity;
  // the take is cover x heads plus VIP tables, minus the DJ fee already
  // paid at booking. A low-buzz night (under 30) draws complaints and heat.
  function runNight(clubId) {
    const club = clubById(clubId);
    const owned = state.owned[clubId];
    if (!club || !owned) return { ok: false, reason: 'not-owned' };
    const hour = ctx.getHour ? ctx.getHour() : 22;
    if (hour < 18 && hour >= 6) return { ok: false, reason: 'not-night' };
    const buzz = buzzOf(clubId);
    const roll = ctx.rng ? ctx.rng() : Math.random();
    const attendance = Math.floor(club.capacity * (0.25 + (buzz / 100) * 0.7 + roll * 0.1));
    const heads = Math.max(0, Math.min(club.capacity, attendance));
    const tables = vipTables(clubId);
    const vipTake = tables * VIP_TABLE_PRICE;
    const coverTake = heads * owned.cover;
    const gross = coverTake + vipTake;
    const costs = 40 + Math.floor(club.capacity / 10); // staff + power
    const net = gross - costs;
    ctx.addCash(net);
    owned.nights += 1;
    owned.earned += net;
    state.nightsRun += 1;
    state.totalEarned += net;
    state.vipSold += tables;
    if (net > state.bestNight) state.bestNight = net;
    let heat = 0;
    if (buzz < 30) {
      state.complaints += 1;
      heat = Math.max(0, COMPLAINT_HEAT + (buzz < 15 ? 1 : 0) - securityCut(clubId));
      if (heat > 0 && ctx.addHeat) ctx.addHeat(heat);
    }
    state.lastNight = { club: clubId, heads, gross, net, buzz, vipTables: tables, heat };
    ctx.log(`${club.name}: ${heads} heads, +$${net} (cover $${coverTake}, VIP $${vipTake})${heat ? ` — neighbours complained, +${heat} heat` : ''}.`);
    return { ok: true, ...state.lastNight };
  }

  // Settle every owned club once per in-game day (called from the hourly
  // tick in main.js when the day rolls over): a quiet, passive take for
  // clubs the player did not run by hand, at half the hand-run rate.
  function settleDay(day) {
    if (day === state.lastDaySettled) return { ok: false, reason: 'already-settled' };
    state.lastDaySettled = day;
    const results = [];
    for (const clubId of Object.keys(state.owned)) {
      const club = clubById(clubId);
      const owned = state.owned[clubId];
      const buzz = buzzOf(clubId);
      const heads = Math.floor(club.capacity * (0.15 + (buzz / 100) * 0.4));
      const net = Math.max(0, heads * owned.cover + vipTables(clubId) * VIP_TABLE_PRICE - 60);
      ctx.addCash(net);
      owned.nights += 1;
      owned.earned += net;
      state.nightsRun += 1;
      state.totalEarned += net;
      if (net > state.bestNight) state.bestNight = net;
      results.push({ club: clubId, heads, net });
    }
    return { ok: true, day, results };
  }

  function clubStatus(id) {
    const club = clubById(id);
    const owned = state.owned[id];
    if (!club) return null;
    if (!owned) return { id, name: club.name, owned: false, price: club.price, capacity: club.capacity, baseCover: club.baseCover, baseBuzz: club.baseBuzz };
    return {
      id, name: club.name, owned: true, price: club.price, capacity: club.capacity,
      cover: owned.cover, buzz: buzzOf(id), dj: owned.dj, upgrades: [...owned.upgrades],
      vipTables: vipTables(id), nights: owned.nights, earned: owned.earned,
    };
  }

  function stats() {
    return {
      owned: Object.keys(state.owned).length,
      clubs: Object.keys(state.owned),
      nightsRun: state.nightsRun,
      totalEarned: state.totalEarned,
      totalSpent: state.totalSpent,
      profit: state.totalEarned - state.totalSpent,
      vipSold: state.vipSold,
      complaints: state.complaints,
      bestNight: state.bestNight,
      lastNight: state.lastNight,
    };
  }

  function hudLine() {
    const n = Object.keys(state.owned).length;
    if (!n) return '';
    return `CLUBS ${n} · +$${state.totalEarned} all-time · best night $${state.bestNight}`;
  }

  function serialize() {
    return {
      owned: JSON.parse(JSON.stringify(state.owned)),
      nightsRun: state.nightsRun,
      totalEarned: state.totalEarned,
      totalSpent: state.totalSpent,
      vipSold: state.vipSold,
      complaints: state.complaints,
      bestNight: state.bestNight,
      lastNight: state.lastNight ? { ...state.lastNight } : null,
      lastDaySettled: state.lastDaySettled,
    };
  }

  function deserialize(data) {
    if (!data || typeof data !== 'object') return;
    if (data.owned) state.owned = JSON.parse(JSON.stringify(data.owned));
    if (typeof data.nightsRun === 'number') state.nightsRun = data.nightsRun;
    if (typeof data.totalEarned === 'number') state.totalEarned = data.totalEarned;
    if (typeof data.totalSpent === 'number') state.totalSpent = data.totalSpent;
    if (typeof data.vipSold === 'number') state.vipSold = data.vipSold;
    if (typeof data.complaints === 'number') state.complaints = data.complaints;
    if (typeof data.bestNight === 'number') state.bestNight = data.bestNight;
    if (data.lastNight) state.lastNight = { ...data.lastNight };
    if (typeof data.lastDaySettled === 'number') state.lastDaySettled = data.lastDaySettled;
  }

  return {
    buyClub, sellClub, setCover, bookDj, buyUpgrade, runNight, settleDay,
    clubStatus, buzzOf, stats, hudLine, serialize, deserialize,
    state,
  };
}
