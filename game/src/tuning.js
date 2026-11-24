export const TUNING_CATEGORIES = [
  { id: 'paint', name: 'Paint', blurb: 'Fresh coats and wild finishes for the body.' },
  { id: 'wheels', name: 'Wheels', blurb: 'Rims that grip harder and turn more heads.' },
  { id: 'engine', name: 'Engine', blurb: 'More power under the hood, more speed on the straight.' },
  { id: 'handling', name: 'Handling', blurb: 'Suspension and aero that keep the car planted.' },
  { id: 'nitro', name: 'Nitro', blurb: 'Bottled boost for when the lights go green.' },
];

export const TUNING_PARTS = [
  { id: 'paint-stock', category: 'paint', tier: 0, name: 'Stock Paint', price: 0, resale: 0, style: 0 },
  { id: 'paint-candy', category: 'paint', tier: 1, name: 'Candy Paint', price: 250, resale: 100, style: 2 },
  { id: 'paint-matte', category: 'paint', tier: 2, name: 'Matte Paint', price: 600, resale: 250, style: 4 },
  { id: 'paint-chrome', category: 'paint', tier: 3, name: 'Chrome Paint', price: 1400, resale: 600, style: 7 },
  { id: 'wheels-stock', category: 'wheels', tier: 0, name: 'Stock Wheels', price: 0, resale: 0, style: 0, grip: 0 },
  { id: 'wheels-sport', category: 'wheels', tier: 1, name: 'Sport Wheels', price: 400, resale: 150, style: 2, grip: 0.04 },
  { id: 'wheels-forged', category: 'wheels', tier: 2, name: 'Forged Wheels', price: 900, resale: 350, style: 4, grip: 0.08 },
  { id: 'wheels-gold', category: 'wheels', tier: 3, name: 'Gold Wheels', price: 1800, resale: 700, style: 8, grip: 0.1 },
  { id: 'engine-stock', category: 'engine', tier: 0, name: 'Stock Engine', price: 0, resale: 0, topSpeed: 0, accel: 0 },
  { id: 'engine-intake', category: 'engine', tier: 1, name: 'Cold Intake', price: 700, resale: 300, topSpeed: 3, accel: 0.08 },
  { id: 'engine-turbo', category: 'engine', tier: 2, name: 'Turbo', price: 1600, resale: 650, topSpeed: 7, accel: 0.18 },
  { id: 'engine-twinturbo', category: 'engine', tier: 3, name: 'Twin Turbo', price: 3500, resale: 1400, topSpeed: 12, accel: 0.32 },
  { id: 'handling-stock', category: 'handling', tier: 0, name: 'Stock Suspension', price: 0, resale: 0, steer: 0, brake: 0 },
  { id: 'handling-coilovers', category: 'handling', tier: 1, name: 'Coilovers', price: 500, resale: 200, steer: 0.08, brake: 0.06 },
  { id: 'handling-race', category: 'handling', tier: 2, name: 'Race Suspension', price: 1100, resale: 450, steer: 0.16, brake: 0.12 },
  { id: 'handling-aero', category: 'handling', tier: 3, name: 'Aero Kit', price: 2400, resale: 950, steer: 0.26, brake: 0.2 },
  { id: 'nitro-none', category: 'nitro', tier: 0, name: 'No Nitro', price: 0, resale: 0, boost: 0 },
  { id: 'nitro-small', category: 'nitro', tier: 1, name: 'Small Nitro', price: 300, resale: 100, boost: 6 },
  { id: 'nitro-big', category: 'nitro', tier: 2, name: 'Big Nitro', price: 650, resale: 250, boost: 12 },
  { id: 'nitro-dual', category: 'nitro', tier: 3, name: 'Dual Nitro', price: 1300, resale: 500, boost: 20 },
];

export const NITRO_REFILL = 50;

export const TUNING_SPOT = { x: -203.5, z: 203.5, name: 'Voss Garage' };

function cloneDeep(v) {
  return JSON.parse(JSON.stringify(v));
}

export function createTuningSystem(ctx) {
  const c = ctx || {};
  const dice = typeof c.rng === 'function' ? c.rng : Math.random;
  const state = { cars: {}, spent: 0, installs: 0, boostsUsed: 0, lastInstall: null };

  function say(msg) {
    if (typeof c.log === 'function') c.log(msg);
  }
  function cashNow() {
    return typeof c.getCash === 'function' ? c.getCash() : 0;
  }
  function charge(amount) {
    if (typeof c.addCash === 'function') c.addCash(amount);
  }
  function fitted(build, cat) {
    const id = build[cat];
    for (const p of TUNING_PARTS) if (p.id === id) return p;
    return null;
  }

  const sys = {
    part(id) {
      for (const p of TUNING_PARTS) if (p.id === id) return p;
      return null;
    },

    build(car) {
      if (!state.cars[car]) {
        state.cars[car] = { paint: 'paint-stock', wheels: 'wheels-stock', engine: 'engine-stock', handling: 'handling-stock', nitro: 'nitro-none', nitroLeft: 0 };
      }
      return state.cars[car];
    },

    partsFor(cat) {
      return TUNING_PARTS.filter((p) => p.category === cat).sort((a, b) => a.tier - b.tier);
    },

    install(car, partId) {
      const p = sys.part(partId);
      if (!p) return { ok: false, reason: 'no-part' };
      if (!car) return { ok: false, reason: 'no-car' };
      const build = sys.build(car);
      if (build[p.category] === partId) return { ok: false, reason: 'already-installed' };
      const current = fitted(build, p.category);
      let price = p.price;
      if (current && p.tier > current.tier) price = p.price - Math.floor(current.price / 2);
      else if (current && p.tier <= current.tier) price = 0;
      if (price < 0) price = 0;
      if (cashNow() < price) return { ok: false, reason: 'no-cash', need: price };
      if (price > 0) charge(-price);
      build[p.category] = partId;
      if (p.category === 'nitro') build.nitroLeft = p.tier > 0 ? 3 : 0;
      if (price > 0) state.spent += price;
      state.installs += 1;
      state.lastInstall = { car, part: p.name, price };
      say('Installed ' + p.name + ' on ' + car + ' for $' + price + '.');
      return { ok: true, car, part: p.name, price, build: cloneDeep(build) };
    },

    useNitro(car) {
      const build = state.cars[car];
      if (!build) return { ok: false, reason: 'no-nitro' };
      const p = fitted(build, 'nitro');
      if (!p || p.tier === 0) return { ok: false, reason: 'no-nitro' };
      if (build.nitroLeft <= 0) return { ok: false, reason: 'empty', need: NITRO_REFILL };
      build.nitroLeft -= 1;
      state.boostsUsed += 1;
      return { ok: true, boost: p.boost, nitroLeft: build.nitroLeft };
    },

    refillNitro(car) {
      const build = state.cars[car];
      if (!build) return { ok: false, reason: 'no-nitro' };
      const p = fitted(build, 'nitro');
      if (!p || p.tier === 0) return { ok: false, reason: 'no-nitro' };
      if (build.nitroLeft >= 3) return { ok: false, reason: 'full' };
      if (cashNow() < NITRO_REFILL) return { ok: false, reason: 'no-cash', need: NITRO_REFILL };
      charge(-NITRO_REFILL);
      build.nitroLeft = 3;
      return { ok: true, nitroLeft: 3 };
    },

    effectiveStats(car) {
      const build = state.cars[car] || { paint: 'paint-stock', wheels: 'wheels-stock', engine: 'engine-stock', handling: 'handling-stock', nitro: 'nitro-none', nitroLeft: 0 };
      const eng = fitted(build, 'engine') || {};
      const han = fitted(build, 'handling') || {};
      const whl = fitted(build, 'wheels') || {};
      const nit = fitted(build, 'nitro') || {};
      let style = 0;
      for (const cat of ['paint', 'wheels', 'engine', 'handling', 'nitro']) {
        const part = fitted(build, cat);
        style += part && part.style ? part.style : 0;
      }
      return {
        topSpeedBonus: eng.topSpeed || 0,
        accelBonus: eng.accel || 0,
        steerBonus: han.steer || 0,
        brakeBonus: han.brake || 0,
        gripBonus: whl.grip || 0,
        nitroBoost: nit.boost || 0,
        nitroLeft: build.nitroLeft || 0,
        style,
      };
    },

    resaleValue(car, base) {
      const build = state.cars[car];
      if (!build) return base;
      let extra = 0;
      for (const cat of ['paint', 'wheels', 'engine', 'handling', 'nitro']) {
        const part = fitted(build, cat);
        if (part) extra += part.resale || 0;
      }
      return Math.round(base + extra);
    },

    randomBuild(car, budget) {
      let left = budget;
      const chosen = [];
      const cats = ['paint', 'wheels', 'engine', 'handling', 'nitro'];
      for (const cat of cats) {
        const options = sys.partsFor(cat).filter((p) => p.price <= left && p.tier > 0);
        if (options.length === 0) continue;
        const pick = options[Math.floor(dice() * options.length)];
        const before = cashNow();
        const res = sys.install(car, pick.id);
        if (res.ok) {
          chosen.push(pick.name);
          left -= res.price;
        }
      }
      const spent = budget - left;
      return { ok: true, parts: chosen, spent, build: cloneDeep(sys.build(car)) };
    },

    compareBuilds(carA, carB) {
      const a = sys.effectiveStats(carA);
      const b = sys.effectiveStats(carB);
      const rows = [
        { stat: 'topSpeed', a: a.topSpeedBonus, b: b.topSpeedBonus, winner: a.topSpeedBonus >= b.topSpeedBonus ? carA : carB },
        { stat: 'accel', a: a.accelBonus, b: b.accelBonus, winner: a.accelBonus >= b.accelBonus ? carA : carB },
        { stat: 'steer', a: a.steerBonus, b: b.steerBonus, winner: a.steerBonus >= b.steerBonus ? carA : carB },
        { stat: 'style', a: a.style, b: b.style, winner: a.style >= b.style ? carA : carB },
        { stat: 'resale', a: sys.resaleValue(carA, 0), b: sys.resaleValue(carB, 0), winner: sys.resaleValue(carA, 0) >= sys.resaleValue(carB, 0) ? carA : carB },
      ];
      return { carA, carB, rows };
    },

    nextUpgrades(car, cash) {
      const build = sys.build(car);
      const out = [];
      for (const cat of TUNING_CATEGORIES) {
        const parts = sys.partsFor(cat.id);
        const cur = fitted(build, cat.id);
        const curTier = cur ? cur.tier : 0;
        const next = parts.find((p) => p.tier === curTier + 1);
        if (next) out.push({ category: cat.name, part: next.name, price: next.price, affordable: cash >= next.price });
      }
      out.sort((x, y) => x.price - y.price);
      return out;
    },

    listCars() {
      const rows = [];
      for (const name of Object.keys(state.cars)) {
        const st = sys.effectiveStats(name);
        rows.push({ name, style: st.style, topSpeedBonus: st.topSpeedBonus, resaleBonus: sys.resaleValue(name, 0) });
      }
      return rows;
    },

    hudLine() {
      if (state.installs === 0) return '';
      if (state.lastInstall) return 'TUNING ' + state.lastInstall.car + ' — ' + state.lastInstall.part;
      return 'TUNING ' + state.installs + ' installs';
    },

    stats() {
      return { cars: Object.keys(state.cars).length, installs: state.installs, spent: state.spent, boosts: state.boostsUsed, last: state.lastInstall };
    },

    serialize() {
      return cloneDeep(state);
    },

    deserialize(data) {
      if (!data) return;
      const copy = cloneDeep(data);
      state.cars = copy.cars || {};
      state.spent = copy.spent;
      state.installs = copy.installs;
      state.boostsUsed = copy.boostsUsed;
      state.lastInstall = copy.lastInstall;
    },
  };
  return sys;
}
