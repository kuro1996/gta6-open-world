// lawyer.js
//
// Fixer-lawyer system for Solara Nights.
//
// The player can be hit with criminal charges while working the streets.
// A lawyer softens what the court does. Cheap counsel barely helps, while
// the best silk in the harbor almost always walks the player free. Every
// charge carries its own fine, its own severity, and its own court date,
// and every court date that arrives forces a trial whether the player
// asked for one or not.
//
// This module is deliberately self contained. It never touches the DOM,
// never touches the network, and never imports another game file. The only
// things it needs arrive through the deps object handed to the factory,
// and every single dep is optional: when the caller leaves one out, a
// harmless default takes its place. All randomness flows through the
// injected rng function, so a test can rig the dice and assert exact
// outcomes. All money flows through getCash and addCash, so the module
// never keeps a private wallet. All heat flows through addHeat, and all
// notable events flow through log.
//
// Return contract for every action:
//   success -> { ok: true, ...numbers and ids describing what happened }
//   failure -> { ok: false, reason: 'kebab-case-string', ...context }
//
// A lost trial and a failed bribe are failures in this sense: the action
// ran, the money moved, but the outcome went against the player, so the
// result carries ok false plus a reason. A guilty plea is a success: the
// player chose to pay and the case closed exactly as asked.
//
// Money is always whole dollars. Any percentage of a fine is rounded
// down to the nearest whole dollar so cash never gains fractions.
//
// ---------------------------------------------------------------------------
// Lawyer tiers
// ---------------------------------------------------------------------------
//
// Three tiers, cheapest first. The free tier is the public defender the
// court assigns when nobody else is hired: no retainer, modest skill.
// The middle tier is a working street counsel who knows the local
// judges. The top tier is the harbor silk every fixer dreams of hiring:
// expensive, and worth every dollar in front of a jury.
//
// Retainers and skills, in tier order:
//   tier one   -> retainer 0,    skill 30
//   tier two   -> retainer 800,  skill 65
//   tier three -> retainer 2500, skill 90
//
// Skill is added straight onto the trial roll, which runs from 0 to 100,
// so the top tier turns even a middling roll into a strong courtroom
// score, while the free tier leaves the player mostly at the mercy of
// the dice.

export const LAWYERS = [
  {
    id: 'public-defender',
    name: 'Dana Cole, Public Defender',
    retainer: 0,
    skill: 30,
    blurb: 'Court appointed, overworked, honest. Better than standing alone.',
  },
  {
    id: 'midtown-counsel',
    name: 'Rosa Ibanez, Midtown Counsel',
    retainer: 800,
    skill: 65,
    blurb: 'Knows every judge on the midtown bench by first name.',
  },
  {
    id: 'harbor-silk',
    name: 'Vera Kline, Harbor Silk',
    retainer: 2500,
    skill: 90,
    blurb: 'The most expensive voice in the harbor. Juries listen to her.',
  },
];

// ---------------------------------------------------------------------------
// Charges
// ---------------------------------------------------------------------------
//
// Six charges, lightest first. Severity runs 1 through 6 and feeds the
// trial threshold directly: the court expects a score of 50 plus ten
// points per severity step, so a severity 6 charge needs a courtroom
// score of 110, which only the best lawyer plus a kind roll can reach.
// Base fines run from 200 up to 3000 dollars, climbing with severity.

export const CHARGES = [
  {
    id: 'jaywalking',
    name: 'Jaywalking',
    severity: 1,
    baseFine: 200,
    blurb: 'Crossed against the light in front of a patrol car.',
  },
  {
    id: 'reckless-driving',
    name: 'Reckless Driving',
    severity: 2,
    baseFine: 450,
    blurb: 'Caught drifting through a red light at speed.',
  },
  {
    id: 'street-racing',
    name: 'Street Racing',
    severity: 3,
    baseFine: 900,
    blurb: 'Flagged in an illegal sprint down the marina strip.',
  },
  {
    id: 'smuggling',
    name: 'Smuggling',
    severity: 4,
    baseFine: 1400,
    blurb: 'A trunk full of goods with no papers and no story.',
  },
  {
    id: 'grand-theft',
    name: 'Grand Theft',
    severity: 5,
    baseFine: 2100,
    blurb: 'A parked supercar that was not yours to take.',
  },
  {
    id: 'bank-heist',
    name: 'Bank Heist',
    severity: 6,
    baseFine: 3000,
    blurb: 'The harbor bank job. The whole city knows your face.',
  },
];

// ---------------------------------------------------------------------------
// Tuning numbers
// ---------------------------------------------------------------------------
//
// These constants gather every magic number in one place so a balance
// pass never has to hunt through the logic. Each one is used in exactly
// the way its name describes.

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

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------
//
// findLawyer and findCharge are plain linear lookups over the short
// constant tables. The tables are tiny, so no index is ever needed.
//
// clampInt keeps a number inside a closed range and drops any fraction,
// which is how ratings and day counts stay whole.
//
// roundDownToDollar drops the fractional part of a money amount. Fines
// are whole dollars, and sixty percent of a fine can land on a fraction,
// so the player always pays the floor, never a rounded-up surprise.
//
// copyCharge makes a detached snapshot of a live charge so callers can
// read state without ever mutating the system's own records.

function findLawyer(tierId) {
  for (let i = 0; i < LAWYERS.length; i += 1) {
    if (LAWYERS[i].id === tierId) {
      return LAWYERS[i];
    }
  }
  return null;
}

function findCharge(chargeId) {
  for (let i = 0; i < CHARGES.length; i += 1) {
    if (CHARGES[i].id === chargeId) {
      return CHARGES[i];
    }
  }
  return null;
}

function clampInt(value, low, high) {
  if (value < low) {
    return low;
  }
  if (value > high) {
    return high;
  }
  return Math.floor(value);
}

function roundDownToDollar(amount) {
  return Math.floor(amount);
}

function copyCharge(charge, today) {
  return {
    id: charge.id,
    name: charge.name,
    severity: charge.severity,
    fine: charge.fine,
    courtDay: charge.courtDay,
    daysLeft: charge.courtDay - today,
    motionUsed: charge.motionUsed,
  };
}

function countMotionsUsed(charges) {
  let count = 0;
  for (let i = 0; i < charges.length; i += 1) {
    if (charges[i].motionUsed) {
      count += 1;
    }
  }
  return count;
}

function sumFines(charges) {
  let total = 0;
  for (let i = 0; i < charges.length; i += 1) {
    total += charges[i].fine;
  }
  return total;
}

function soonestCourtDay(charges) {
  let soonest = null;
  for (let i = 0; i < charges.length; i += 1) {
    if (soonest === null || charges[i].courtDay < soonest) {
      soonest = charges[i].courtDay;
    }
  }
  return soonest;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------
//
// createLawyerSystem builds one independent lawyer system. Call it once
// per save, or once per test, and each call gets fresh state that never
// leaks into another system.
//
// Deps, all optional:
//   rng          -> () => number in [0, 1). Defaults to Math.random.
//   getDay       -> () => current in-game day number. Defaults to () => 1.
//   getHour      -> () => current in-game hour. Defaults to () => 12.
//   getCash      -> () => current cash. Defaults to () => 0.
//   addCash      -> (delta) => void. Defaults to a no-op.
//   addHeat      -> (n) => void. Defaults to a no-op.
//   log          -> (message) => void. Defaults to a no-op.
//   getHeatLevel -> () => current heat level. Defaults to () => 0.
//
// The factory reads deps once, wraps each one in a safe local, and the
// rest of the system only ever talks to those locals. A dep that arrives
// as something other than a function is treated as missing.

export function createLawyerSystem(deps) {
  const safeDeps = deps && typeof deps === 'object' ? deps : {};

  const rng = typeof safeDeps.rng === 'function' ? safeDeps.rng : Math.random;
  const getDay = typeof safeDeps.getDay === 'function' ? safeDeps.getDay : () => 1;
  const getHour = typeof safeDeps.getHour === 'function' ? safeDeps.getHour : () => 12;
  const getCash = typeof safeDeps.getCash === 'function' ? safeDeps.getCash : () => 0;
  const addCash = typeof safeDeps.addCash === 'function' ? safeDeps.addCash : () => {};
  const addHeat = typeof safeDeps.addHeat === 'function' ? safeDeps.addHeat : () => {};
  const log = typeof safeDeps.log === 'function' ? safeDeps.log : () => {};
  const getHeatLevel = typeof safeDeps.getHeatLevel === 'function'
    ? safeDeps.getHeatLevel
    : () => 0;

  // -- Live state ----------------------------------------------------------
  //
  // lawyerId holds the id of the currently hired tier, or null when the
  // player has nobody on retainer. A player with no lawyer still goes to
  // trial; they simply argue with a skill of zero.
  //
  // charges holds the live charge records. Each record tracks its own
  // severity, its current fine (which can grow after a failed bribe),
  // the absolute court day it must be answered by, and whether a motion
  // has already been filed against it.
  //
  // casesWon and casesLost count closed cases across the whole run.
  // finesPaid, retainersPaid, bribesPaid and motionsPaid track dollars
  // spent through each channel so the stats view can show where the
  // money went. bribesAttempted and bribesSucceeded track the bribe
  // record. motionsFiled counts every motion ever filed, including ones
  // on charges that have since closed.
  //
  // lastTickDay remembers the last day tickDay ran for, so the day hook
  // can refuse to run twice on the same day and never double-charge a
  // court date or double-roll a new charge.

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

  // -- Private lookups -----------------------------------------------------
  //
  // lawyerSkill reads the skill of the hired tier, or zero when nobody
  // is hired. The trial math calls this, never the raw id.
  //
  // findActive returns the live record for a charge id, or null when
  // that charge is not currently active. Every action that works on a
  // charge starts here.
  //
  // dropCharge removes a charge record by id and returns the record it
  // removed, or null when nothing matched. Closing a case always goes
  // through here so the removal happens in exactly one place.

  function lawyerSkill() {
    if (lawyerId === null) {
      return 0;
    }
    const tier = findLawyer(lawyerId);
    if (tier === null) {
      return 0;
    }
    return tier.skill;
  }

  function findActive(chargeId) {
    for (let i = 0; i < charges.length; i += 1) {
      if (charges[i].id === chargeId) {
        return charges[i];
      }
    }
    return null;
  }

  function dropCharge(chargeId) {
    for (let i = 0; i < charges.length; i += 1) {
      if (charges[i].id === chargeId) {
        const removed = charges[i];
        charges.splice(i, 1);
        return removed;
      }
    }
    return null;
  }

  // -- Trial engine --------------------------------------------------------
  //
  // runTrial is the single place where a courtroom contest is decided,
  // used both by a not-guilty plea and by the automatic court date in
  // tickDay. Sharing one engine guarantees the plea path and the
  // auto-resolve path can never drift apart.
  //
  // The roll: rng() times 100, plus the hired lawyer's skill. The bar:
  // 50 plus ten per severity point. The player wins when the score meets
  // or beats the bar. A win closes the case, drops one heat, and counts
  // a win. A loss closes the case, takes the full current fine in cash,
  // adds one heat, and counts a loss.
  //
  // The returned object always carries the raw roll, the final score,
  // and the bar, so tests and the HUD can show exactly why a case went
  // the way it did.

  function runTrial(charge) {
    const roll = rng() * 100;
    const skill = lawyerSkill();
    const score = roll + skill;
    const bar = TRIAL_BASE_THRESHOLD + charge.severity * TRIAL_SEVERITY_STEP;
    const won = score >= bar;
    const fine = charge.fine;
    const chargeName = charge.name;
    const chargeId = charge.id;

    dropCharge(chargeId);

    if (won) {
      casesWon += 1;
      addHeat(-TRIAL_WIN_HEAT_DROP);
      log('Case won: ' + chargeName + ' dismissed. Score ' + Math.floor(score) + ' beat the bar of ' + bar + '.');
      return {
        ok: true,
        won: true,
        charge: chargeId,
        name: chargeName,
        roll: roll,
        score: score,
        threshold: bar,
        skill: skill,
        heat: -TRIAL_WIN_HEAT_DROP,
        paid: 0,
      };
    }

    casesLost += 1;
    finesPaid += fine;
    addCash(-fine);
    addHeat(TRIAL_LOSE_HEAT_RISE);
    log('Case lost: ' + chargeName + ' convicted. Score ' + Math.floor(score) + ' fell short of the bar of ' + bar + '. Fine $' + fine + ' paid.');
    return {
      ok: false,
      won: false,
      reason: 'case-lost',
      charge: chargeId,
      name: chargeName,
      roll: roll,
      score: score,
      threshold: bar,
      skill: skill,
      heat: TRIAL_LOSE_HEAT_RISE,
      paid: fine,
    };
  }

  // -- Hiring --------------------------------------------------------------
  //
  // hireLawyer puts a tier on retainer. The retainer is charged in full
  // every time, even when the player re-hires the same tier, because the
  // firm bills per engagement. Hiring replaces whoever was hired before;
  // there is never more than one lawyer at a time.
  //
  // Failures, checked in this order:
  //   unknown tier      -> the id matches no tier in LAWYERS
  //   not enough cash   -> getCash() is below the tier's retainer

  function hireLawyer(tierId) {
    const tier = findLawyer(tierId);
    if (tier === null) {
      return { ok: false, reason: 'unknown-tier', tier: tierId };
    }
    if (getCash() < tier.retainer) {
      return {
        ok: false,
        reason: 'not-enough-cash',
        tier: tierId,
        retainer: tier.retainer,
        cash: getCash(),
      };
    }
    addCash(-tier.retainer);
    retainersPaid += tier.retainer;
    lawyerId = tier.id;
    log('Hired ' + tier.name + ' for a $' + tier.retainer + ' retainer. Courtroom skill ' + tier.skill + '.');
    return {
      ok: true,
      lawyer: tier.id,
      name: tier.name,
      retainer: tier.retainer,
      skill: tier.skill,
      cash: getCash(),
    };
  }

  // -- Adding charges ------------------------------------------------------
  //
  // addCharge books a new charge against the player. The fine starts at
  // the charge's base fine and the court date lands four days after the
  // current day. The same charge cannot be active twice: the court does
  // not stack identical counts.
  //
  // Failures, checked in this order:
  //   unknown charge -> the id matches nothing in CHARGES
  //   already active -> that charge is already on the books

  function addCharge(chargeId) {
    const def = findCharge(chargeId);
    if (def === null) {
      return { ok: false, reason: 'unknown-charge', charge: chargeId };
    }
    if (findActive(chargeId) !== null) {
      return { ok: false, reason: 'charge-active', charge: chargeId };
    }
    const today = getDay();
    const record = {
      id: def.id,
      name: def.name,
      severity: def.severity,
      fine: def.baseFine,
      courtDay: today + COURT_DAYS_AHEAD,
      motionUsed: false,
    };
    charges.push(record);
    log('New charge: ' + def.name + '. Fine $' + def.baseFine + '. Court in ' + COURT_DAYS_AHEAD + ' days.');
    return {
      ok: true,
      charge: record.id,
      name: record.name,
      severity: record.severity,
      fine: record.fine,
      courtDay: record.courtDay,
      daysLeft: COURT_DAYS_AHEAD,
    };
  }

  // -- Pleas ---------------------------------------------------------------
  //
  // plead answers a charge in court.
  //
  // Guilty: the player pays sixty percent of the current fine, rounded
  // down to whole dollars, loses two heat because the matter is closed
  // quietly, and the case counts as lost. The charge leaves the books.
  //
  // Not guilty: the case goes to a full trial through runTrial, with
  // the same roll, the same bar, and the same win and loss consequences
  // as an automatic court date.
  //
  // Failures, checked in this order:
  //   unknown charge -> the id is not an active charge
  //   bad plea       -> the plea is neither 'guilty' nor 'not-guilty'

  function plead(chargeId, plea) {
    const charge = findActive(chargeId);
    if (charge === null) {
      return { ok: false, reason: 'unknown-charge', charge: chargeId };
    }
    if (plea !== 'guilty' && plea !== 'not-guilty') {
      return { ok: false, reason: 'bad-plea', charge: chargeId, plea: plea };
    }

    if (plea === 'guilty') {
      const paid = roundDownToDollar(charge.fine * GUILTY_FRACTION);
      const chargeName = charge.name;
      const fineBefore = charge.fine;
      dropCharge(chargeId);
      casesLost += 1;
      finesPaid += paid;
      addCash(-paid);
      addHeat(-GUILTY_HEAT_DROP);
      log('Pleaded guilty to ' + chargeName + '. Paid $' + paid + ' of a $' + fineBefore + ' fine. Heat fell by ' + GUILTY_HEAT_DROP + '.');
      return {
        ok: true,
        plea: 'guilty',
        charge: chargeId,
        name: chargeName,
        paid: paid,
        fine: fineBefore,
        heat: -GUILTY_HEAT_DROP,
        cash: getCash(),
      };
    }

    return runTrial(charge);
  }

  // -- Bribing a witness ---------------------------------------------------
  //
  // bribeWitness tries to make a charge go away before it ever reaches
  // a courtroom. It costs a flat 300 dollars, paid up front whether the
  // witness takes the money and vanishes or takes the money and talks
  // anyway. The roll succeeds when rng() lands below 0.55.
  //
  // Success: the charge leaves the books with no fine and no heat.
  // Failure: the charge stays, two heat are added because the witness
  // talked, and the fine grows by 200 dollars because the attempt itself
  // is now part of the case file.
  //
  // Failures, checked in this order:
  //   unknown charge   -> the id is not an active charge
  //   not enough cash  -> getCash() is below the 300 dollar cost
  //
  // A failed bribe is reported as ok false with reason 'bribe-failed',
  // because the attempt did not achieve what the player paid for, even
  // though the money still moved.

  function bribeWitness(chargeId) {
    const charge = findActive(chargeId);
    if (charge === null) {
      return { ok: false, reason: 'unknown-charge', charge: chargeId };
    }
    if (getCash() < BRIBE_COST) {
      return {
        ok: false,
        reason: 'not-enough-cash',
        charge: chargeId,
        cost: BRIBE_COST,
        cash: getCash(),
      };
    }
    addCash(-BRIBE_COST);
    bribesPaid += BRIBE_COST;
    bribesAttempted += 1;
    const roll = rng();
    if (roll < BRIBE_SUCCESS_CHANCE) {
      const chargeName = charge.name;
      dropCharge(chargeId);
      bribesSucceeded += 1;
      log('Witness for ' + chargeName + ' took the money and vanished. Charge dropped.');
      return {
        ok: true,
        bribed: true,
        charge: chargeId,
        name: chargeName,
        cost: BRIBE_COST,
        roll: roll,
        cash: getCash(),
      };
    }
    charge.fine += BRIBE_FAIL_FINE_RISE;
    addHeat(BRIBE_FAIL_HEAT_RISE);
    log('Witness for ' + charge.name + ' talked anyway. Heat rose by ' + BRIBE_FAIL_HEAT_RISE + ' and the fine grew by $' + BRIBE_FAIL_FINE_RISE + ' to $' + charge.fine + '.');
    return {
      ok: false,
      reason: 'bribe-failed',
      bribed: false,
      charge: chargeId,
      name: charge.name,
      cost: BRIBE_COST,
      roll: roll,
      heat: BRIBE_FAIL_HEAT_RISE,
      fine: charge.fine,
      cash: getCash(),
    };
  }

  // -- Filing a motion -----------------------------------------------------
  //
  // fileMotion asks the court to push a case back and soften it. It
  // costs a flat 150 dollars, moves the court date three days later,
  // and lowers the charge severity by one step, never below severity 1.
  // A lower severity means a lower trial bar, so the motion genuinely
  // improves the odds when the case finally comes up.
  //
  // Each charge accepts at most one motion. A second motion on the same
  // charge is refused outright, before any money is checked, because the
  // court does not entertain repeat delay tactics on one count.
  //
  // Failures, checked in this order:
  //   unknown charge   -> the id is not an active charge
  //   motion used      -> a motion was already filed on this charge
  //   not enough cash  -> getCash() is below the 150 dollar cost

  function fileMotion(chargeId) {
    const charge = findActive(chargeId);
    if (charge === null) {
      return { ok: false, reason: 'unknown-charge', charge: chargeId };
    }
    if (charge.motionUsed) {
      return { ok: false, reason: 'motion-used', charge: chargeId };
    }
    if (getCash() < MOTION_COST) {
      return {
        ok: false,
        reason: 'not-enough-cash',
        charge: chargeId,
        cost: MOTION_COST,
        cash: getCash(),
      };
    }
    addCash(-MOTION_COST);
    motionsPaid += MOTION_COST;
    motionsFiled += 1;
    charge.motionUsed = true;
    charge.courtDay += MOTION_DELAY_DAYS;
    const before = charge.severity;
    charge.severity = Math.max(MIN_SEVERITY, charge.severity - MOTION_SEVERITY_DROP);
    log('Motion filed on ' + charge.name + '. Court pushed back ' + MOTION_DELAY_DAYS + ' days to day ' + charge.courtDay + '. Severity fell from ' + before + ' to ' + charge.severity + '.');
    return {
      ok: true,
      charge: chargeId,
      name: charge.name,
      cost: MOTION_COST,
      courtDay: charge.courtDay,
      severity: charge.severity,
      severityBefore: before,
      cash: getCash(),
    };
  }

  // -- Read-only views -----------------------------------------------------
  //
  // chargeStatus returns a detached copy of one active charge, with a
  // daysLeft figure measured against the current day, or null when the
  // charge is not active. The copy is safe to hand to a HUD or a test:
  // mutating it never touches live state.
  //
  // listCharges returns detached copies of every active charge, in the
  // order they were added, each with its own daysLeft.
  //
  // lawyerStatus returns the hired tier's public record, or null when
  // nobody is hired.
  //
  // totalExposure adds up the current fines of every active charge: the
  // worst-case bill if every case went against the player tomorrow.
  //
  // nextCourtIn returns the smallest daysLeft among active charges, or
  // -1 when no charge is active. A value of zero means a court date
  // arrives today.
  //
  // currentHour is a thin pass-through to the injected clock, kept so
  // the wiring layer can ask the system what time it thinks it is
  // without reaching past the factory.

  function chargeStatus(chargeId) {
    const charge = findActive(chargeId);
    if (charge === null) {
      return null;
    }
    return copyCharge(charge, getDay());
  }

  function listCharges() {
    const today = getDay();
    const out = [];
    for (let i = 0; i < charges.length; i += 1) {
      out.push(copyCharge(charges[i], today));
    }
    return out;
  }

  function lawyerStatus() {
    if (lawyerId === null) {
      return null;
    }
    const tier = findLawyer(lawyerId);
    if (tier === null) {
      return null;
    }
    return {
      id: tier.id,
      name: tier.name,
      retainer: tier.retainer,
      skill: tier.skill,
    };
  }

  function totalExposure() {
    return sumFines(charges);
  }

  function nextCourtIn() {
    const soonest = soonestCourtDay(charges);
    if (soonest === null) {
      return -1;
    }
    return soonest - getDay();
  }

  function currentHour() {
    return getHour();
  }

  // -- Stats and HUD -------------------------------------------------------
  //
  // stats returns a plain object of numbers, strings and booleans that
  // fully describes the system's public position. Nothing in it is a
  // live reference: it is safe to store, compare, or print.
  //
  // hudLine returns one short line for the on-screen HUD. When nothing
  // is happening it says so plainly instead of returning an empty
  // string, so the player always knows the lawyer desk is quiet rather
  // than wondering whether the line failed to render.

  function stats() {
    return {
      lawyer: lawyerId === null ? 'none' : lawyerId,
      lawyerSkill: lawyerSkill(),
      activeCharges: charges.length,
      casesWon: casesWon,
      casesLost: casesLost,
      motionsUsed: motionsFiled,
      motionsOnActive: countMotionsUsed(charges),
      finesPaid: finesPaid,
      retainersPaid: retainersPaid,
      bribesPaid: bribesPaid,
      bribesAttempted: bribesAttempted,
      bribesSucceeded: bribesSucceeded,
      motionsPaid: motionsPaid,
      totalExposure: totalExposure(),
      nextCourtIn: nextCourtIn(),
      hasLawyer: lawyerId !== null,
      lastTickDay: lastTickDay === null ? -1 : lastTickDay,
    };
  }

  function hudLine() {
    const hired = lawyerStatus();
    const lawyerText = hired === null ? 'No lawyer' : hired.name;
    if (charges.length === 0) {
      return lawyerText + ' | No active charges | Won ' + casesWon + ' Lost ' + casesLost;
    }
    const soonest = nextCourtIn();
    const courtText = soonest <= 0 ? 'Court TODAY' : 'Court in ' + soonest + 'd';
    return lawyerText + ' | ' + charges.length + ' charge' + (charges.length === 1 ? '' : 's') + ' | ' + courtText + ' | $' + totalExposure() + ' at risk';
  }

  // -- Persistence ---------------------------------------------------------
  //
  // serialize returns a plain JSON-able snapshot of every piece of
  // state. deserialize restores from such a snapshot and tolerates
  // missing fields by falling back to defaults, so an old save or a
  // hand-built partial object never crashes the system. Unknown extra
  // fields are ignored. Charge records are re-cloned on the way in so
  // the caller's object and the live state never share references.

  function serialize() {
    const savedCharges = [];
    for (let i = 0; i < charges.length; i += 1) {
      savedCharges.push({
        id: charges[i].id,
        name: charges[i].name,
        severity: charges[i].severity,
        fine: charges[i].fine,
        courtDay: charges[i].courtDay,
        motionUsed: charges[i].motionUsed,
      });
    }
    return {
      lawyerId: lawyerId,
      charges: savedCharges,
      casesWon: casesWon,
      casesLost: casesLost,
      finesPaid: finesPaid,
      retainersPaid: retainersPaid,
      bribesPaid: bribesPaid,
      motionsPaid: motionsPaid,
      bribesAttempted: bribesAttempted,
      bribesSucceeded: bribesSucceeded,
      motionsFiled: motionsFiled,
      lastTickDay: lastTickDay,
    };
  }

  function deserialize(d) {
    const data = d && typeof d === 'object' ? d : {};
    const savedLawyer = typeof data.lawyerId === 'string' ? data.lawyerId : null;
    lawyerId = savedLawyer !== null && findLawyer(savedLawyer) !== null ? savedLawyer : null;
    charges = [];
    if (Array.isArray(data.charges)) {
      for (let i = 0; i < data.charges.length; i += 1) {
        const raw = data.charges[i];
        if (!raw || typeof raw !== 'object' || typeof raw.id !== 'string') {
          continue;
        }
        const def = findCharge(raw.id);
        if (def === null) {
          continue;
        }
        charges.push({
          id: raw.id,
          name: typeof raw.name === 'string' ? raw.name : def.name,
          severity: typeof raw.severity === 'number' ? clampInt(raw.severity, MIN_SEVERITY, 6) : def.severity,
          fine: typeof raw.fine === 'number' ? Math.max(0, Math.floor(raw.fine)) : def.baseFine,
          courtDay: typeof raw.courtDay === 'number' ? Math.floor(raw.courtDay) : getDay() + COURT_DAYS_AHEAD,
          motionUsed: raw.motionUsed === true,
        });
      }
    }
    casesWon = typeof data.casesWon === 'number' ? Math.max(0, Math.floor(data.casesWon)) : 0;
    casesLost = typeof data.casesLost === 'number' ? Math.max(0, Math.floor(data.casesLost)) : 0;
    finesPaid = typeof data.finesPaid === 'number' ? Math.max(0, Math.floor(data.finesPaid)) : 0;
    retainersPaid = typeof data.retainersPaid === 'number' ? Math.max(0, Math.floor(data.retainersPaid)) : 0;
    bribesPaid = typeof data.bribesPaid === 'number' ? Math.max(0, Math.floor(data.bribesPaid)) : 0;
    motionsPaid = typeof data.motionsPaid === 'number' ? Math.max(0, Math.floor(data.motionsPaid)) : 0;
    bribesAttempted = typeof data.bribesAttempted === 'number' ? Math.max(0, Math.floor(data.bribesAttempted)) : 0;
    bribesSucceeded = typeof data.bribesSucceeded === 'number' ? Math.max(0, Math.floor(data.bribesSucceeded)) : 0;
    motionsFiled = typeof data.motionsFiled === 'number' ? Math.max(0, Math.floor(data.motionsFiled)) : 0;
    lastTickDay = typeof data.lastTickDay === 'number' ? Math.floor(data.lastTickDay) : null;
    return { ok: true, charges: charges.length, lawyer: lawyerId };
  }

  // -- Day hook ------------------------------------------------------------
  //
  // tickDay runs once per in-game day. The wiring layer calls it with
  // the new day number. Calling it twice for the same day returns a
  // failure with reason 'already-settled' and changes nothing, so a
  // double call can never double-resolve a court date.
  //
  // Step one: every charge whose court day has arrived is resolved
  // immediately as a not-guilty trial through runTrial, in the order
  // the charges were added. Each resolution consumes one rng roll.
  //
  // Step two: when the heat level is 3 or higher, the streets are hot
  // enough that a fresh charge may land. One rng roll decides whether
  // it happens at all: below 0.25 means a new charge. A second rng roll
  // picks which charge from the table. When the picked charge is already
  // active, the search walks forward through the table, wrapping around,
  // and takes the first inactive charge it finds. When every charge is
  // already active, nothing new is generated. A generated charge gets a
  // court date four days after the ticked day.
  //
  // The returned object lists every auto-resolved trial and the id of
  // any generated charge, or null when none was generated.

  function tickDay(day) {
    const dayNum = typeof day === 'number' ? Math.floor(day) : getDay();
    if (lastTickDay !== null && dayNum === lastTickDay) {
      return { ok: false, reason: 'already-settled', day: dayNum };
    }
    lastTickDay = dayNum;

    const resolved = [];
    const due = [];
    for (let i = 0; i < charges.length; i += 1) {
      if (charges[i].courtDay <= dayNum) {
        due.push(charges[i]);
      }
    }
    for (let j = 0; j < due.length; j += 1) {
      const outcome = runTrial(due[j]);
      resolved.push(outcome);
    }

    let generated = null;
    if (getHeatLevel() >= NEW_CHARGE_MIN_HEAT) {
      const spawnRoll = rng();
      if (spawnRoll < NEW_CHARGE_CHANCE) {
        const pick = Math.floor(rng() * CHARGES.length);
        let chosen = null;
        for (let k = 0; k < CHARGES.length; k += 1) {
          const candidate = CHARGES[(pick + k) % CHARGES.length];
          if (findActive(candidate.id) === null) {
            chosen = candidate;
            break;
          }
        }
        if (chosen !== null) {
          const record = {
            id: chosen.id,
            name: chosen.name,
            severity: chosen.severity,
            fine: chosen.baseFine,
            courtDay: dayNum + COURT_DAYS_AHEAD,
            motionUsed: false,
          };
          charges.push(record);
          generated = chosen.id;
          log('Heat brought a new charge: ' + chosen.name + '. Fine $' + chosen.baseFine + '. Court in ' + COURT_DAYS_AHEAD + ' days.');
        }
      }
    }

    return {
      ok: true,
      day: dayNum,
      resolved: resolved,
      generated: generated,
      activeCharges: charges.length,
    };
  }

  // -- Public surface ------------------------------------------------------
  //
  // Every method the wiring layer needs, and nothing it does not. The
  // returned object is the whole system: actions, views, persistence,
  // and the day hook.

  return {
    hireLawyer,
    addCharge,
    plead,
    bribeWitness,
    fileMotion,
    chargeStatus,
    listCharges,
    lawyerStatus,
    totalExposure,
    nextCourtIn,
    currentHour,
    stats,
    hudLine,
    serialize,
    deserialize,
    tickDay,
  };
}
