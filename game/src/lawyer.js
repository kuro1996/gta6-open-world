export const LAWYERS = [
  { id: 'public', name: 'Public Defender', retainer: 100, skill: 30, blurb: 'Overworked but honest' },
  { id: 'private', name: 'Private Attorney', retainer: 500, skill: 60, blurb: 'Sharp suit, sharper arguments' },
  { id: 'top', name: 'Top Fixer', retainer: 2000, skill: 90, blurb: 'Nobody beats him in court' },
];

export const CHARGES = [
  { id: 'speeding', name: 'Speeding', severity: 1, baseFine: 200, blurb: 'Caught doing double the limit' },
  { id: 'reckless', name: 'Reckless Driving', severity: 2, baseFine: 500, blurb: 'Drifting through downtown' },
  { id: 'vandalism', name: 'Vandalism', severity: 2, baseFine: 400, blurb: 'Spray paint on the courthouse' },
  { id: 'theft', name: 'Grand Theft Auto', severity: 4, baseFine: 2000, blurb: 'Took a car that was not yours' },
  { id: 'assault', name: 'Assault', severity: 5, baseFine: 5000, blurb: 'A fight that went too far' },
  { id: 'heist', name: 'Bank Heist', severity: 6, baseFine: 20000, blurb: 'The big one' },
];

const COURT_DAYS_AHEAD = 4;
const GUILTY_FRACTION = 0.6;
const GUILTY_HEAT_DROP = 2;
const TRIAL_WIN_HEAT_DROP = 1;
const TRIAL_LOSE_HEAT_RISE = 1;
const TRIAL_BASE_THRESHOLD = 50;
const TRIAL_SEVERITY_STEP = 10;
const BRIBE_COST = 300;
const BRIBE_SUCCESS_CHANCE = 0.55;
const BRIBE_FAIL_HEAT_RISE = 2;
const BRIBE_FAIL_FINE_RISE = 200;
const MOTION_COST = 150;
const MOTION_DELAY_DAYS = 3;
const MOTION_SEVERITY_DROP = 1;
const MIN_SEVERITY = 1;
const NEW_CHARGE_CHANCE = 0.25;
const NEW_CHARGE_MIN_HEAT = 3;

function lawyerById(id) {
  return LAWYERS.find((l) => l.id === id);
}

function chargeById(id) {
  return CHARGES.find((c) => c.id === id);
}

export function createLawyerSystem(deps = {}) {
  const rng = typeof deps.rng === 'function' ? deps.rng : Math.random;
  const getDay = typeof deps.getDay === 'function' ? deps.getDay : () => 1;
  const getHour = typeof deps.getHour === 'function' ? deps.getHour : () => 12;
  const getCash = typeof deps.getCash === 'function' ? deps.getCash : () => 0;
  const addCash = typeof deps.addCash === 'function' ? deps.addCash : () => {};
  const addHeat = typeof deps.addHeat === 'function' ? deps.addHeat : () => {};
  const log = typeof deps.log === 'function' ? deps.log : () => {};
  const getHeatLevel = typeof deps.getHeatLevel === 'function' ? deps.getHeatLevel : () => 0;

  let lawyerId = null;
  let charges = [];
  let casesWon = 0;
  let casesLost = 0;
  let finesPaid = 0;
  let retainersPaid = 0;
  let bribesPaid = 0;
  let motionsPaid = 0;
  let bribesAttempted = 0;
  let bribesSucceeded = 0;
  let motionsFiled = 0;
  let lastTickDay = null;

  function lawyerRecord() {
    return lawyerId ? lawyerById(lawyerId) : null;
  }

  function lawyerSkill() {
    const lawyer = lawyerRecord();
    return lawyer ? lawyer.skill : 0;
  }

  function daysLeft(charge) {
    return charge.courtDay - getDay();
  }

  function chargeCopy(charge) {
    return {
      id: charge.id,
      name: charge.name,
      severity: charge.severity,
      fine: charge.fine,
      courtDay: charge.courtDay,
      daysLeft: daysLeft(charge),
      motionUsed: charge.motionUsed,
    };
  }

  function closeCharge(charge) {
    charges = charges.filter((c) => c !== charge);
  }

  function runTrial(charge) {
    const roll = Math.floor(rng() * 100);
    const skill = lawyerSkill();
    const score = roll + skill;
    const threshold = TRIAL_BASE_THRESHOLD + charge.severity * TRIAL_SEVERITY_STEP;
    const name = charge.name;
    const id = charge.id;
    closeCharge(charge);
    if (score >= threshold) {
      casesWon += 1;
      addHeat(-TRIAL_WIN_HEAT_DROP);
      log(`Won the case: ${name}`);
      return {
        ok: true,
        won: true,
        chargeId: id,
        name,
        roll,
        score,
        threshold,
        skill,
        heat: -TRIAL_WIN_HEAT_DROP,
        paid: 0,
      };
    }
    casesLost += 1;
    const paid = charge.fine;
    addCash(-paid);
    finesPaid += paid;
    addHeat(TRIAL_LOSE_HEAT_RISE);
    log(`Lost the case: ${name}, paid ${paid}`);
    return {
      ok: false,
      reason: 'case-lost',
      won: false,
      chargeId: id,
      name,
      roll,
      score,
      threshold,
      skill,
      heat: TRIAL_LOSE_HEAT_RISE,
      paid,
    };
  }

  function spawnCharge(day) {
    const activeIds = new Set(charges.map((c) => c.id));
    const start = Math.floor(rng() * CHARGES.length);
    for (let i = 0; i < CHARGES.length; i++) {
      const candidate = CHARGES[(start + i) % CHARGES.length];
      if (activeIds.has(candidate.id)) continue;
      const record = {
        id: candidate.id,
        name: candidate.name,
        severity: candidate.severity,
        fine: candidate.baseFine,
        courtDay: day + COURT_DAYS_AHEAD,
        motionUsed: false,
      };
      charges.push(record);
      log(`New charge: ${candidate.name}`);
      return candidate.id;
    }
    return null;
  }

  const system = {
    hireLawyer(tierId) {
      const lawyer = lawyerById(tierId);
      if (!lawyer) return { ok: false, reason: 'unknown-tier' };
      if (getCash() < lawyer.retainer) {
        return { ok: false, reason: 'not-enough-cash', retainer: lawyer.retainer, cash: getCash() };
      }
      addCash(-lawyer.retainer);
      lawyerId = lawyer.id;
      retainersPaid += lawyer.retainer;
      log(`Hired lawyer: ${lawyer.name}`);
      return { ok: true, lawyerId: lawyer.id, name: lawyer.name, retainer: lawyer.retainer, skill: lawyer.skill, cash: getCash() };
    },

    addCharge(chargeId) {
      const def = chargeById(chargeId);
      if (!def) return { ok: false, reason: 'unknown-charge' };
      if (charges.some((c) => c.id === chargeId)) return { ok: false, reason: 'charge-active' };
      const record = {
        id: def.id,
        name: def.name,
        severity: def.severity,
        fine: def.baseFine,
        courtDay: getDay() + COURT_DAYS_AHEAD,
        motionUsed: false,
      };
      charges.push(record);
      log(`Charged with ${def.name}`);
      return {
        ok: true,
        chargeId: record.id,
        name: record.name,
        severity: record.severity,
        fine: record.fine,
        courtDay: record.courtDay,
        daysLeft: COURT_DAYS_AHEAD,
      };
    },

    plead(chargeId, plea) {
      const charge = charges.find((c) => c.id === chargeId);
      if (!charge) return { ok: false, reason: 'unknown-charge' };
      if (plea !== 'guilty' && plea !== 'not-guilty') return { ok: false, reason: 'bad-plea' };
      if (plea === 'guilty') {
        const paid = Math.floor(charge.fine * GUILTY_FRACTION);
        const fineBefore = charge.fine;
        addCash(-paid);
        finesPaid += paid;
        addHeat(-GUILTY_HEAT_DROP);
        casesLost += 1;
        const name = charge.name;
        closeCharge(charge);
        log(`Pleaded guilty to ${name}, paid ${paid}`);
        return {
          ok: true,
          plea: 'guilty',
          chargeId,
          name,
          paid,
          fine: fineBefore,
          heat: -GUILTY_HEAT_DROP,
          cash: getCash(),
        };
      }
      return runTrial(charge);
    },

    bribeWitness(chargeId) {
      const charge = charges.find((c) => c.id === chargeId);
      if (!charge) return { ok: false, reason: 'unknown-charge' };
      if (getCash() < BRIBE_COST) {
        return { ok: false, reason: 'not-enough-cash', cost: BRIBE_COST, cash: getCash() };
      }
      addCash(-BRIBE_COST);
      bribesAttempted += 1;
      bribesPaid += BRIBE_COST;
      const roll = rng();
      if (roll < BRIBE_SUCCESS_CHANCE) {
        const name = charge.name;
        bribesSucceeded += 1;
        closeCharge(charge);
        log(`Witness bribed, ${name} dropped`);
        return { ok: true, bribed: true, chargeId, name, cost: BRIBE_COST, roll, cash: getCash() };
      }
      charge.fine += BRIBE_FAIL_FINE_RISE;
      addHeat(BRIBE_FAIL_HEAT_RISE);
      log(`Bribe failed on ${charge.name}`);
      return {
        ok: false,
        reason: 'bribe-failed',
        bribed: false,
        chargeId,
        name: charge.name,
        cost: BRIBE_COST,
        roll,
        heat: BRIBE_FAIL_HEAT_RISE,
        fine: charge.fine,
        cash: getCash(),
      };
    },

    fileMotion(chargeId) {
      const charge = charges.find((c) => c.id === chargeId);
      if (!charge) return { ok: false, reason: 'unknown-charge' };
      if (charge.motionUsed) return { ok: false, reason: 'motion-used' };
      if (getCash() < MOTION_COST) {
        return { ok: false, reason: 'not-enough-cash', cost: MOTION_COST, cash: getCash() };
      }
      addCash(-MOTION_COST);
      motionsFiled += 1;
      motionsPaid += MOTION_COST;
      charge.motionUsed = true;
      charge.courtDay += MOTION_DELAY_DAYS;
      const before = charge.severity;
      charge.severity = Math.max(MIN_SEVERITY, charge.severity - MOTION_SEVERITY_DROP);
      log(`Filed motion on ${charge.name}, court delayed`);
      return {
        ok: true,
        chargeId,
        name: charge.name,
        cost: MOTION_COST,
        courtDay: charge.courtDay,
        severity: charge.severity,
        severityBefore: before,
        cash: getCash(),
      };
    },

    chargeStatus(chargeId) {
      const charge = charges.find((c) => c.id === chargeId);
      if (!charge) return null;
      return chargeCopy(charge);
    },

    listCharges() {
      return charges.map((c) => chargeCopy(c));
    },

    lawyerStatus() {
      const lawyer = lawyerRecord();
      if (!lawyer) return null;
      return { lawyerId: lawyer.id, name: lawyer.name, retainer: lawyer.retainer, skill: lawyer.skill };
    },

    totalExposure() {
      return charges.reduce((s, c) => s + c.fine, 0);
    },

    nextCourtIn() {
      if (charges.length === 0) return -1;
      return Math.min(...charges.map((c) => daysLeft(c)));
    },

    currentHour() {
      return getHour();
    },

    stats() {
      const lawyer = lawyerRecord();
      const motionsOnActive = charges.filter((c) => c.motionUsed).length;
      return {
        lawyer: lawyerId || 'none',
        lawyerSkill: lawyerSkill(),
        activeCharges: charges.length,
        casesWon,
        casesLost,
        motionsUsed: motionsFiled,
        motionsOnActive,
        finesPaid,
        retainersPaid,
        bribesPaid,
        bribesAttempted,
        bribesSucceeded,
        motionsPaid,
        totalExposure: this.totalExposure(),
        nextCourtIn: this.nextCourtIn(),
        hasLawyer: lawyerId !== null,
        lastTickDay: lastTickDay === null ? -1 : lastTickDay,
      };
    },

    hudLine() {
      const lawyer = lawyerRecord();
      const who = lawyer ? lawyer.name : 'No lawyer';
      if (charges.length === 0) {
        return `${who} | No active charges | Won ${casesWon} Lost ${casesLost}`;
      }
      const next = this.nextCourtIn();
      const courtText = next === 0 ? 'Court TODAY' : `Court in ${next}d`;
      const word = charges.length === 1 ? 'charge' : 'charges';
      return `${who} | ${charges.length} ${word} | ${courtText} | $${this.totalExposure()} at risk`;
    },

    tickDay(day) {
      const d = typeof day === 'number' ? day : getDay();
      if (lastTickDay !== null && lastTickDay === d) {
        return { ok: false, reason: 'already-settled' };
      }
      lastTickDay = d;
      const resolved = [];
      const due = charges.filter((c) => c.courtDay <= d);
      for (const charge of due) {
        resolved.push(runTrial(charge));
      }
      let generated = null;
      if (getHeatLevel() >= NEW_CHARGE_MIN_HEAT) {
        if (rng() < NEW_CHARGE_CHANCE) {
          generated = spawnCharge(d);
        }
      }
      return { ok: true, day: d, resolved, generated, activeCharges: charges.length };
    },

    serialize() {
      return {
        lawyerId,
        charges: charges.map((c) => ({
          id: c.id,
          name: c.name,
          severity: c.severity,
          fine: c.fine,
          courtDay: c.courtDay,
          motionUsed: c.motionUsed,
        })),
        casesWon,
        casesLost,
        finesPaid,
        retainersPaid,
        bribesPaid,
        motionsPaid,
        bribesAttempted,
        bribesSucceeded,
        motionsFiled,
        lastTickDay,
      };
    },

    deserialize(saved) {
      const restored = { charges: 0, lawyerId: null };
      if (!saved || typeof saved !== 'object') return { ok: true, charges: 0, lawyerId: null };
      if (typeof saved.lawyerId === 'string' && lawyerById(saved.lawyerId)) {
        lawyerId = saved.lawyerId;
        restored.lawyerId = lawyerId;
      } else {
        lawyerId = null;
      }
      if (Array.isArray(saved.charges)) {
        charges = [];
        for (const c of saved.charges) {
          if (!c || typeof c !== 'object') continue;
          if (!chargeById(c.id)) continue;
          const def = chargeById(c.id);
          charges.push({
            id: c.id,
            name: typeof c.name === 'string' ? c.name : def.name,
            severity: Math.max(1, Math.min(6, typeof c.severity === 'number' ? Math.floor(c.severity) : def.severity)),
            fine: Math.max(0, typeof c.fine === 'number' ? Math.floor(c.fine) : def.baseFine),
            courtDay: typeof c.courtDay === 'number' ? Math.floor(c.courtDay) : getDay() + COURT_DAYS_AHEAD,
            motionUsed: c.motionUsed === true,
          });
        }
      } else {
        charges = [];
      }
      restored.charges = charges.length;
      const counters = ['casesWon', 'casesLost', 'finesPaid', 'retainersPaid', 'bribesPaid', 'motionsPaid', 'bribesAttempted', 'bribesSucceeded', 'motionsFiled'];
      for (const key of counters) {
        if (typeof saved[key] === 'number') {
          const v = Math.max(0, Math.floor(saved[key]));
          if (key === 'casesWon') casesWon = v;
          else if (key === 'casesLost') casesLost = v;
          else if (key === 'finesPaid') finesPaid = v;
          else if (key === 'retainersPaid') retainersPaid = v;
          else if (key === 'bribesPaid') bribesPaid = v;
          else if (key === 'motionsPaid') motionsPaid = v;
          else if (key === 'bribesAttempted') bribesAttempted = v;
          else if (key === 'bribesSucceeded') bribesSucceeded = v;
          else if (key === 'motionsFiled') motionsFiled = v;
        }
      }
      if (typeof saved.lastTickDay === 'number' || saved.lastTickDay === null) {
        lastTickDay = saved.lastTickDay;
      }
      return { ok: true, charges: restored.charges, lawyerId: restored.lawyerId };
    },
  };

  return system;
}
