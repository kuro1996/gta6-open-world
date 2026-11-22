// Solara Nights — bank heist planning (round 4 attempt 7).
// Ria plans a bank job in three phases: pick a crew, buy gear, choose an
// approach (silent or loud), then crack the vault dial-by-dial. Silent
// pays less but barely raises heat; loud pays the vault in full and the
// whole city answers. A failed crack trips the alarm and the crew scatters.
export const HEIST_TARGETS = [
  { id: 'marina-branch', name: 'Marina Branch', vault: 2400, guard: 2, difficulty: 1, blurb: 'Small branch, sleepy guard, thin vault.' },
  { id: 'plaza-central', name: 'Plaza Central', vault: 6500, guard: 4, difficulty: 2, blurb: 'Downtown flagship — cameras on every corner.' },
  { id: 'crown-vault', name: 'Crown Reserve', vault: 15000, guard: 7, difficulty: 3, blurb: 'Silas Crown\'s own reserve. Nobody has cracked it.' },
];

export const CREW_ROLES = [
  { id: 'driver', name: 'Getaway Driver', cost: 400, cut: 0.12, effect: 'escape', blurb: 'A clean exit cuts the chase short.' },
  { id: 'hacker', name: 'Hacker', cost: 600, cut: 0.15, effect: 'crack', blurb: 'Widens the vault-crack window.' },
  { id: 'muscle', name: 'Muscle', cost: 350, cut: 0.10, effect: 'guard', blurb: 'Keeps the guards busy while you work.' },
  { id: 'lookout', name: 'Lookout', cost: 250, cut: 0.08, effect: 'alarm', blurb: 'Warns you before the alarm trips.' },
];

export const GEAR_ITEMS = [
  { id: 'drill', name: 'Thermal Drill', cost: 500, effect: 'crack', blurb: '+1 dial per crack round.' },
  { id: 'jammer', name: 'Signal Jammer', cost: 350, effect: 'alarm', blurb: 'Alarm trips one mistake later.' },
  { id: 'masks', name: 'Clean Masks', cost: 150, effect: 'heat', blurb: 'Half the heat from the job.' },
  { id: 'smoke', name: 'Smoke Bombs', cost: 200, effect: 'guard', blurb: 'Guards lose a round.' },
];

export const APPROACHES = {
  silent: { label: 'Silent', payMult: 0.7, heat: 20, alarmChances: 0.12 },
  loud: { label: 'Loud', payMult: 1.0, heat: 60, alarmChances: 0.3 },
};

export function createBankSystem(ctx) {
  const rng = ctx.rng || (() => Math.random());
  const state = {
    targetId: null,
    approach: 'silent',
    crew: [], // role ids
    gear: [], // gear ids
    phase: 'planning', // planning | cracking | done | busted
    dials: 0, // dials left on the vault
    dialTotal: 0,
    mistakes: 0,
    maxMistakes: 3,
    heistsDone: 0,
    heistsBusted: 0,
    totalTaken: 0,
    bestTake: 0,
    lastHeist: null,
  };

  function target(id) {
    return HEIST_TARGETS.find((t) => t.id === id) || null;
  }

  function hasEffect(effect) {
    const fromCrew = CREW_ROLES.some((r) => state.crew.includes(r.id) && r.effect === effect);
    const fromGear = GEAR_ITEMS.some((g) => state.gear.includes(g.id) && g.effect === effect);
    return fromCrew || fromGear;
  }

  function crewCost() {
    return state.crew.reduce((sum, id) => sum + (CREW_ROLES.find((r) => r.id === id)?.cost || 0), 0);
  }

  function gearCost() {
    return state.gear.reduce((sum, id) => sum + (GEAR_ITEMS.find((g) => g.id === id)?.cost || 0), 0);
  }

  function crewCut() {
    return state.crew.reduce((sum, id) => sum + (CREW_ROLES.find((r) => r.id === id)?.cut || 0), 0);
  }

  function planHeist(targetId, approach) {
    const t = target(targetId);
    if (!t) return { ok: false, reason: 'no-target' };
    if (state.phase === 'cracking') return { ok: false, reason: 'in-progress' };
    state.targetId = targetId;
    state.approach = APPROACHES[approach] ? approach : 'silent';
    state.phase = 'planning';
    state.crew = [];
    state.gear = [];
    state.mistakes = 0;
    ctx.log && ctx.log(`Heist planned: ${t.name} (${APPROACHES[state.approach].label}). Hire a crew, buy gear, then breach.`);
    return { ok: true, target: t.name, approach: state.approach };
  }

  function hireCrew(roleId) {
    if (state.phase !== 'planning') return { ok: false, reason: 'not-planning' };
    const role = CREW_ROLES.find((r) => r.id === roleId);
    if (!role) return { ok: false, reason: 'no-role' };
    if (state.crew.includes(roleId)) return { ok: false, reason: 'already-hired' };
    if (state.crew.length >= 3) return { ok: false, reason: 'crew-full' };
    if ((ctx.getCash ? ctx.getCash() : 0) < role.cost) return { ok: false, reason: 'no-cash', need: role.cost };
    ctx.addCash(-role.cost);
    state.crew.push(roleId);
    ctx.log && ctx.log(`Hired ${role.name} for $${role.cost} (${Math.round(role.cut * 100)}% cut).`);
    return { ok: true, crew: [...state.crew] };
  }

  function buyGear(gearId) {
    if (state.phase !== 'planning') return { ok: false, reason: 'not-planning' };
    const item = GEAR_ITEMS.find((g) => g.id === gearId);
    if (!item) return { ok: false, reason: 'no-gear' };
    if (state.gear.includes(gearId)) return { ok: false, reason: 'already-owned' };
    if ((ctx.getCash ? ctx.getCash() : 0) < item.cost) return { ok: false, reason: 'no-cash', need: item.cost };
    ctx.addCash(-item.cost);
    state.gear.push(gearId);
    ctx.log && ctx.log(`Bought ${item.name} for $${item.cost}.`);
    return { ok: true, gear: [...state.gear] };
  }

  function startHeist() {
    if (state.phase !== 'planning' || !state.targetId) return { ok: false, reason: 'no-plan' };
    const t = target(state.targetId);
    state.dialTotal = 3 + t.difficulty * 2; // 5 / 7 / 9 dials
    state.dials = state.dialTotal;
    state.maxMistakes = hasEffect('alarm') ? 4 : 3;
    state.mistakes = 0;
    state.phase = 'cracking';
    ctx.log && ctx.log(`Inside ${t.name}. Crack ${state.dialTotal} dials before the alarm trips — ${state.maxMistakes} mistakes allowed.`);
    return { ok: true, dials: state.dials, maxMistakes: state.maxMistakes };
  }

  // One vault-crack round: the player guesses the dial position 0-9.
  // A hit opens one dial (two with a thermal drill); a miss counts as a
  // mistake, and the alarm chance rolls on every miss.
  function crackVault(guess) {
    if (state.phase !== 'cracking') return { ok: false, reason: 'not-cracking' };
    const g = Math.max(0, Math.min(9, Math.floor(guess ?? 0)));
    const code = Math.floor(rng() * 10);
    const window = hasEffect('crack') ? 2 : 1; // hacker/drill widens it
    const hit = Math.abs(g - code) <= window || (hasEffect('guard') && rng() < 0.15);
    if (hit) {
      const opened = hasEffect('crack') && state.gear.includes('drill') ? 2 : 1;
      state.dials = Math.max(0, state.dials - opened);
      ctx.log && ctx.log(`Dial ${opened > 1 ? 'x2 ' : ''}cracked — ${state.dials} left.`);
      if (state.dials === 0) return finishHeist(true);
      return { ok: true, hit: true, dials: state.dials, code };
    }
    state.mistakes += 1;
    const alarmRoll = rng();
    const alarmChance = APPROACHES[state.approach].alarmChances;
    if (state.mistakes >= state.maxMistakes || alarmRoll < alarmChance) {
      return finishHeist(false, 'alarm-tripped');
    }
    ctx.log && ctx.log(`Wrong dial (was ${code}) — ${state.maxMistakes - state.mistakes} mistakes left.`);
    return { ok: true, hit: false, dials: state.dials, mistakes: state.mistakes, code };
  }

  function finishHeist(success, failReason) {
    const t = target(state.targetId);
    if (!success) {
      state.phase = 'busted';
      state.heistsBusted += 1;
      const heat = APPROACHES[state.approach].heat;
      ctx.addHeat && ctx.addHeat(heat);
      state.lastHeist = { target: t.name, success: false, reason: failReason || 'busted', heat };
      ctx.log && ctx.log(`HEIST BUSTED at ${t.name} — the crew scattered, +${heat} heat.`);
      state.phase = 'planning';
      state.targetId = null;
      return { ok: true, success: false, reason: failReason || 'busted', heat };
    }
    const gross = Math.round(t.vault * APPROACHES[state.approach].payMult * (0.85 + rng() * 0.3));
    const cut = Math.round(gross * crewCut());
    const take = gross - cut;
    let heat = APPROACHES[state.approach].heat;
    if (hasEffect('heat')) heat = Math.round(heat / 2);
    ctx.addCash(take);
    ctx.addHeat && ctx.addHeat(heat);
    state.heistsDone += 1;
    state.totalTaken += take;
    state.bestTake = Math.max(state.bestTake, take);
    state.lastHeist = { target: t.name, success: true, gross, cut, take, heat };
    state.phase = 'done';
    ctx.log && ctx.log(`HEIST CLEAN: ${t.name} — took $${take} (crew cut $${cut}), +${heat} heat.`);
    state.phase = 'planning';
    state.targetId = null;
    return { ok: true, success: true, gross, cut, take, heat };
  }

  // Scout a target before planning: reveals the guard count and whether
  // the vault is "cold" (a quiet week — pays 10% more) or "hot".
  function scout(targetId) {
    const t = target(targetId);
    if (!t) return { ok: false, reason: 'no-target' };
    const roll = rng();
    const cold = roll < 0.35;
    const guardShift = roll < 0.2 ? -1 : 0; // a guard called in sick
    return {
      ok: true,
      target: t.name,
      guards: Math.max(1, t.guard + guardShift),
      vault: t.vault,
      cold,
      tip: cold ? 'Quiet week — the vault is fuller than usual.' : guardShift < 0 ? 'A guard called in sick.' : 'Standard security. Nothing unusual.',
    };
  }

  // Full plan summary for the HUD / planning screen: what the job costs
  // up front, what the crew takes, and the expected take-home.
  function planSummary() {
    if (!state.targetId) return { ok: false, reason: 'no-plan' };
    const t = target(state.targetId);
    const upfront = crewCost() + gearCost();
    const gross = Math.round(t.vault * APPROACHES[state.approach].payMult);
    const cut = Math.round(gross * crewCut());
    return {
      ok: true,
      target: t.name,
      approach: APPROACHES[state.approach].label,
      upfront,
      gross,
      cut,
      expectedTake: gross - cut,
      heat: APPROACHES[state.approach].heat,
      crew: state.crew.map((id) => CREW_ROLES.find((r) => r.id === id)?.name),
      gear: state.gear.map((id) => GEAR_ITEMS.find((g) => g.id === id)?.name),
    };
  }

  function abortHeist() {
    if (state.phase !== 'cracking') return { ok: false, reason: 'not-cracking' };
    state.phase = 'planning';
    state.targetId = null;
    state.heistsBusted += 1;
    ctx.log && ctx.log('Heist aborted — walked away clean, no payout.');
    return { ok: true };
  }

  function hudLine() {
    if (state.phase === 'cracking') return `HEIST ${state.dials}/${state.dialTotal} dials · ${state.maxMistakes - state.mistakes} mistakes left`;
    if (state.targetId) return `HEIST planned: ${target(state.targetId).name} (${state.crew.length} crew)`;
    return '';
  }

  function stats() {
    return {
      phase: state.phase,
      target: state.targetId,
      crew: state.crew.length,
      gear: state.gear.length,
      dials: state.dials,
      done: state.heistsDone,
      busted: state.heistsBusted,
      taken: state.totalTaken,
      best: state.bestTake,
      last: state.lastHeist,
    };
  }

  function serialize() {
    return JSON.parse(JSON.stringify(state));
  }

  function deserialize(data) {
    if (!data) return;
    Object.assign(state, JSON.parse(JSON.stringify(data)));
    state.crew = state.crew || [];
    state.gear = state.gear || [];
  }

  return {
    state, planHeist, hireCrew, buyGear, startHeist, crackVault, abortHeist,
    crewCost, gearCost, crewCut, hasEffect, target, scout, planSummary,
    hudLine, stats, serialize, deserialize,
  };
}
