// Solara Nights — tuning garage (round 4 attempt 7).
// Voss Garage sells paint, wheels, engine, handling and nitro upgrades.
// Every part has three tiers, prices scale with the tier, and a tune is
// stored per car (by name) so the Comet GT and the Voss Sedan keep their
// own builds. Handling and engine parts change how the car actually
// drives; paint and wheels are pure style — and pure resale value.
export const TUNING_CATEGORIES = [
  { id: 'paint', name: 'Paint', blurb: 'Candy, matte and chrome finishes.' },
  { id: 'wheels', name: 'Wheels', blurb: 'Rims, tyres and stance.' },
  { id: 'engine', name: 'Engine', blurb: 'Turbo, intake and exhaust.' },
  { id: 'handling', name: 'Handling', blurb: 'Suspension, brakes and aero.' },
  { id: 'nitro', name: 'Nitro', blurb: 'A bottle in the boot, for emergencies.' },
];

export const TUNING_PARTS = [
  // Paint — style only, adds resale value.
  { id: 'paint-stock', cat: 'paint', tier: 0, name: 'Factory Paint', price: 0, style: 0, resale: 0 },
  { id: 'paint-candy', cat: 'paint', tier: 1, name: 'Candy Red', price: 250, style: 2, resale: 120 },
  { id: 'paint-matte', cat: 'paint', tier: 2, name: 'Matte Black', price: 600, style: 4, resale: 300 },
  { id: 'paint-chrome', cat: 'paint', tier: 3, name: 'Chrome Gold', price: 1400, style: 7, resale: 800 },
  // Wheels — a little grip, a lot of looks.
  { id: 'wheels-stock', cat: 'wheels', tier: 0, name: 'Steelies', price: 0, style: 0, grip: 0, resale: 0 },
  { id: 'wheels-sport', cat: 'wheels', tier: 1, name: 'Sport Alloys', price: 400, style: 2, grip: 0.04, resale: 180 },
  { id: 'wheels-forged', cat: 'wheels', tier: 2, name: 'Forged Monoblocks', price: 900, style: 4, grip: 0.08, resale: 420 },
  { id: 'wheels-gold', cat: 'wheels', tier: 3, name: 'Gold Spinners', price: 1800, style: 8, grip: 0.1, resale: 950 },
  // Engine — real speed: +top speed and +acceleration per tier.
  { id: 'engine-stock', cat: 'engine', tier: 0, name: 'Stock Block', price: 0, topSpeed: 0, accel: 0, resale: 0 },
  { id: 'engine-intake', cat: 'engine', tier: 1, name: 'Cold Intake', price: 700, topSpeed: 3, accel: 0.08, resale: 300 },
  { id: 'engine-turbo', cat: 'engine', tier: 2, name: 'Turbo Kit', price: 1600, topSpeed: 7, accel: 0.18, resale: 750 },
  { id: 'engine-twin', cat: 'engine', tier: 3, name: 'Twin-Turbo V8', price: 3500, topSpeed: 12, accel: 0.32, resale: 1800 },
  // Handling — steering feel and braking.
  { id: 'handling-stock', cat: 'handling', tier: 0, name: 'Stock Suspension', price: 0, steer: 0, brake: 0, resale: 0 },
  { id: 'handling-coil', cat: 'handling', tier: 1, name: 'Coilovers', price: 500, steer: 0.08, brake: 0.06, resale: 220 },
  { id: 'handling-race', cat: 'handling', tier: 2, name: 'Race Suspension', price: 1100, steer: 0.16, brake: 0.12, resale: 500 },
  { id: 'handling-aero', cat: 'handling', tier: 3, name: 'Full Aero Kit', price: 2400, steer: 0.26, brake: 0.2, resale: 1200 },
  // Nitro — one-shot boost, refilled per use.
  { id: 'nitro-none', cat: 'nitro', tier: 0, name: 'No Bottle', price: 0, boost: 0, resale: 0 },
  { id: 'nitro-small', cat: 'nitro', tier: 1, name: 'Small Bottle', price: 300, boost: 6, resale: 100 },
  { id: 'nitro-big', cat: 'nitro', tier: 2, name: 'Big Bottle', price: 650, boost: 12, resale: 280 },
  { id: 'nitro-dual', cat: 'nitro', tier: 3, name: 'Dual Bottles', price: 1300, boost: 20, resale: 600 },
];

export const NITRO_REFILL = 50; // $ per refill
export const TUNING_SPOT = { x: -203.5, z: 203.5, name: 'Voss Garage' };

export function createTuningSystem(ctx) {
  const rng = ctx.rng || (() => Math.random());
  const state = {
    cars: {}, // carName -> { paint, wheels, engine, handling, nitro, nitroLeft }
    spent: 0,
    installs: 0,
    boostsUsed: 0,
    lastInstall: null,
  };

  function part(id) {
    return TUNING_PARTS.find((p) => p.id === id) || null;
  }

  function build(carName) {
    if (!state.cars[carName]) {
      state.cars[carName] = {
        paint: 'paint-stock', wheels: 'wheels-stock', engine: 'engine-stock',
        handling: 'handling-stock', nitro: 'nitro-none', nitroLeft: 0,
      };
    }
    return state.cars[carName];
  }

  function partsFor(cat) {
    return TUNING_PARTS.filter((p) => p.cat === cat).sort((a, b) => a.tier - b.tier);
  }

  function install(carName, partId) {
    const p = part(partId);
    if (!p) return { ok: false, reason: 'no-part' };
    if (!carName) return { ok: false, reason: 'no-car' };
    const buildState = build(carName);
    const current = buildState[p.cat];
    if (current === partId) return { ok: false, reason: 'already-installed' };
    const currentPart = part(current);
    // Downgrades are free (the old part is "sold back" at half its price).
    const price = p.tier > (currentPart ? currentPart.tier : 0)
      ? p.price - Math.floor((currentPart ? currentPart.price : 0) / 2)
      : 0;
    if (price > 0 && (ctx.getCash ? ctx.getCash() : 0) < price) {
      return { ok: false, reason: 'no-cash', need: price };
    }
    if (price > 0) ctx.addCash(-price);
    if (price < 0) ctx.addCash(-price); // refund path (price is never negative here, kept for clarity)
    buildState[p.cat] = partId;
    if (p.cat === 'nitro') buildState.nitroLeft = p.tier > 0 ? 3 : 0;
    state.spent += Math.max(0, price);
    state.installs += 1;
    state.lastInstall = { car: carName, part: p.name, price };
    ctx.log && ctx.log(`${carName}: installed ${p.name}${price ? ` — $${price}` : ' (free swap)'}.`);
    return { ok: true, car: carName, part: p.name, price, build: { ...buildState } };
  }

  function useNitro(carName) {
    const b = build(carName);
    const p = part(b.nitro);
    if (!p || p.tier === 0) return { ok: false, reason: 'no-nitro' };
    if (b.nitroLeft <= 0) return { ok: false, reason: 'empty', refill: NITRO_REFILL };
    b.nitroLeft -= 1;
    state.boostsUsed += 1;
    return { ok: true, boost: p.boost, left: b.nitroLeft };
  }

  function refillNitro(carName) {
    const b = build(carName);
    const p = part(b.nitro);
    if (!p || p.tier === 0) return { ok: false, reason: 'no-nitro' };
    if (b.nitroLeft >= 3) return { ok: false, reason: 'full' };
    if ((ctx.getCash ? ctx.getCash() : 0) < NITRO_REFILL) return { ok: false, reason: 'no-cash', need: NITRO_REFILL };
    ctx.addCash(-NITRO_REFILL);
    b.nitroLeft = 3;
    return { ok: true, left: 3 };
  }

  // Effective driving numbers for a tuned car, on top of the base car.
  function effectiveStats(carName) {
    const b = build(carName);
    const pick = (cat) => part(b[cat]) || part(`${cat}-stock`);
    const eng = pick('engine');
    const han = pick('handling');
    const wh = pick('wheels');
    const nit = pick('nitro');
    return {
      topSpeedBonus: eng.topSpeed || 0,
      accelBonus: eng.accel || 0,
      steerBonus: han.steer || 0,
      brakeBonus: han.brake || 0,
      gripBonus: wh.grip || 0,
      nitroBoost: nit.boost || 0,
      nitroLeft: b.nitroLeft,
      style: TUNING_CATEGORIES.reduce((sum, c) => sum + ((part(b[c.id]) || {}).style || 0), 0),
    };
  }

  function resaleValue(carName, baseValue) {
    const b = build(carName);
    let extra = 0;
    for (const cat of TUNING_CATEGORIES) {
      const p = part(b[cat.id]);
      if (p) extra += p.resale || 0;
    }
    return Math.round((baseValue || 0) + extra);
  }

  function randomBuild(carName, budget) {
    // A "surprise me" build: spends up to the budget on random tiers,
    // cheapest first so the money never overshoots.
    const b = build(carName);
    let left = Math.max(0, budget || 0);
    const chosen = [];
    for (const cat of TUNING_CATEGORIES) {
      const options = partsFor(cat.id).filter((p) => p.price <= left);
      if (options.length === 0) continue;
      const pick = options[Math.floor(rng() * options.length)];
      const res = install(carName, pick.id);
      if (res.ok) {
        left -= Math.max(0, res.price);
        chosen.push(pick.name);
      }
    }
    return { ok: true, chosen, spent: (budget || 0) - left, build: { ...b } };
  }

  // Compare two tuned cars side by side: which one is faster, which one
  // grips better, and which one is worth more on resale.
  function compareBuilds(carA, carB) {
    const a = effectiveStats(carA);
    const b = effectiveStats(carB);
    const rows = [
      { stat: 'Top speed', a: a.topSpeedBonus, b: b.topSpeedBonus, winner: a.topSpeedBonus >= b.topSpeedBonus ? carA : carB },
      { stat: 'Acceleration', a: a.accelBonus, b: b.accelBonus, winner: a.accelBonus >= b.accelBonus ? carA : carB },
      { stat: 'Steering', a: a.steerBonus, b: b.steerBonus, winner: a.steerBonus >= b.steerBonus ? carA : carB },
      { stat: 'Style', a: a.style, b: b.style, winner: a.style >= b.style ? carA : carB },
      { stat: 'Resale bonus', a: resaleValue(carA, 0), b: resaleValue(carB, 0), winner: resaleValue(carA, 0) >= resaleValue(carB, 0) ? carA : carB },
    ];
    return { carA, carB, rows };
  }

  // Cheapest upgrade path: the next tier in each category, sorted by
  // price, so the player can see what $500 buys next.
  function nextUpgrades(carName, cash) {
    const b = build(carName);
    const out = [];
    for (const cat of TUNING_CATEGORIES) {
      const cur = part(b[cat.id]);
      const next = partsFor(cat.id).find((p) => p.tier === (cur ? cur.tier : 0) + 1);
      if (!next) continue;
      out.push({ cat: cat.name, part: next.name, price: next.price, affordable: (cash ?? 0) >= next.price });
    }
    return out.sort((x, y) => x.price - y.price);
  }

  function listCars() {
    return Object.keys(state.cars).map((name) => ({
      name,
      style: effectiveStats(name).style,
      topSpeed: effectiveStats(name).topSpeedBonus,
      resale: resaleValue(name, 0),
    }));
  }

  function hudLine() {
    if (state.installs === 0) return '';
    const last = state.lastInstall;
    return last ? `TUNING ${last.car}: ${last.part}` : `TUNING ${state.installs} installs`;
  }

  function stats() {
    return {
      cars: Object.keys(state.cars).length,
      installs: state.installs,
      spent: state.spent,
      boosts: state.boostsUsed,
      last: state.lastInstall,
    };
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(data) {
    if (!data) return;
    Object.assign(state, JSON.parse(JSON.stringify(data)));
    state.cars = state.cars || {};
  }

  return {
    state, install, useNitro, refillNitro, effectiveStats, resaleValue,
    randomBuild, partsFor, part, build, compareBuilds, nextUpgrades, listCars,
    hudLine, stats, serialize, deserialize,
  };
}
