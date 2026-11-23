// detective.js — Solara Nights private eye system (round 6 rebuild).
//
// A self-contained factory: no imports, no DOM, no network. The host game
// hands the factory a deps object and the system does everything through
// it. Every random draw goes through deps.rng, every dollar moves through
// deps.getCash / deps.addCash, every heat point through deps.addHeat and
// every notable moment through deps.log. All deps are optional and fall
// back to harmless defaults, so the system can be constructed bare for
// inspection and still behave.
//
// The fantasy: the player works as a private eye on the Solara strip.
// Clients bring cases, each one pointing at a specific person of interest.
// The eye tails the target to build familiarity, snaps photographic
// evidence once the tail is solid, and then chooses how to cash in: finish
// the case properly for the client payout, or blackmail the target for a
// quick, dirty, exposure-heavy payday. Informants can be paid to sharpen
// every photograph. Exposure is the long shadow over all of it: get seen
// too often and the street starts watching back.
//
// The loop, in one place:
//   * takeCase picks up one case at a time. A case names its target, its
//     difficulty and its payout. While a case is active no other case can
//     be taken.
//   * tailTarget is the stealth check. A roll of rng * 6 plus the tailing
//     progress built so far must beat the target alertness. Success adds
//     one tailing progress. Failure adds 10 exposure and 1 heat.
//   * snapEvidence needs tailing progress of at least 2 on that target.
//     Evidence quality is 30 + rng * 50 + informant level * 10, capped at
//     100. A sharp eye with good informants shoots sharper photos.
//   * blackmail needs evidence of at least 50 on the target, pays evidence
//     times 12 dollars, adds 10 exposure and burns the target forever: a
//     burned target can never be blackmailed again.
//   * completeCase needs an active case and evidence of at least 60 on
//     that case target. It pays the case payout and counts one case done.
//   * payInformant costs 150 dollars and raises the informant level by
//     one, up to a maximum of 3. Informants make every future photograph
//     better.
//
// Exposure rules, in one place:
//   * A failed tail adds 10 exposure. A blackmail adds 10 exposure.
//   * Exposure decays by 5 every day, down to a floor of 0. Laying low
//     works, slowly.
//   * An active case older than 5 days expires with no payout. The client
//     moves on and the trail goes cold.
//
// Every public action returns a plain object. Success is { ok: true,
// ...numbers }; failure is { ok: false, reason: 'kebab-case' }.

export const TAIL_TARGETS = [
  {
    id: 'wandering-husband',
    name: 'Wandering Husband',
    alertness: 2,
    habit: 'Slips out of the marina hotel every Thursday after dark.',
  },
  {
    id: 'vanished-heiress',
    name: 'Vanished Heiress',
    alertness: 4,
    habit: 'Moves between safe houses with two drivers and no phone.',
  },
  {
    id: 'limping-clerk',
    name: 'Limping Clerk',
    alertness: 3,
    habit: 'Claims a bad back but jogs the boardwalk before sunrise.',
  },
  {
    id: 'nervous-accountant',
    name: 'Nervous Accountant',
    alertness: 5,
    habit: 'Checks every mirror and changes taxis twice a trip.',
  },
  {
    id: 'velvet-mayor',
    name: 'Velvet Mayor',
    alertness: 5,
    habit: 'A city figure with a security detail and a second ledger.',
  },
  {
    id: 'faded-starlet',
    name: 'Faded Starlet',
    alertness: 1,
    habit: 'Drifts between auditions, cafés and old premieres.',
  },
];

export const EYE_CASES = [
  {
    id: 'runaway-star',
    name: 'Runaway Star',
    difficulty: 1,
    payout: 400,
    targetId: 'faded-starlet',
    brief: 'A talent agent wants his missing starlet found before opening night.',
  },
  {
    id: 'cheating-spouse',
    name: 'Cheating Spouse',
    difficulty: 2,
    payout: 600,
    targetId: 'wandering-husband',
    brief: 'A wife wants proof of where her husband really spends Thursdays.',
  },
  {
    id: 'insurance-scam',
    name: 'Insurance Scam',
    difficulty: 3,
    payout: 900,
    targetId: 'limping-clerk',
    brief: 'An insurer suspects the limping clerk is faking the injury.',
  },
  {
    id: 'missing-heir',
    name: 'Missing Heir',
    difficulty: 4,
    payout: 1400,
    targetId: 'vanished-heiress',
    brief: 'A family lawyer needs the vanished heiress located, quietly.',
  },
  {
    id: 'stolen-ledger',
    name: 'Stolen Ledger',
    difficulty: 5,
    payout: 1800,
    targetId: 'nervous-accountant',
    brief: 'A syndicate bookkeeper walked off with the second set of books.',
  },
  {
    id: 'blackmail-ring',
    name: 'Blackmail Ring',
    difficulty: 6,
    payout: 2000,
    targetId: 'velvet-mayor',
    brief: 'Someone is squeezing the mayor. Find who holds the pictures.',
  },
];

// The highest evidence quality a photograph can reach.
export const EYE_MAX_EVIDENCE = 100;

// The lowest evidence quality a snapshot can roll.
export const EYE_BASE_EVIDENCE = 30;

// The spread a lucky shot can add above the base evidence.
export const EYE_EVIDENCE_SPREAD = 50;

// Evidence points each informant level adds to a snapshot.
export const EYE_EVIDENCE_PER_INFORMANT = 10;

// Tailing progress needed before a target can be photographed.
export const EYE_TAILING_FOR_EVIDENCE = 2;

// Evidence quality needed to blackmail a target.
export const EYE_EVIDENCE_FOR_BLACKMAIL = 50;

// Evidence quality needed on a case target to close the case.
export const EYE_EVIDENCE_FOR_CASE = 60;

// Dollars paid per evidence point on a blackmail.
export const EYE_BLACKMAIL_PER_POINT = 12;

// Exposure added by a failed tail and by a blackmail.
export const EYE_EXPOSURE_PER_INCIDENT = 10;

// Heat added by a failed tail.
export const EYE_HEAT_PER_FAILED_TAIL = 1;

// Exposure shed each day the eye lays low.
export const EYE_EXPOSURE_DECAY_PER_DAY = 5;

// Dollars charged for one informant level.
export const EYE_INFORMANT_COST = 150;

// Highest informant level money can buy.
export const EYE_MAX_INFORMANT_LEVEL = 3;

// Days an active case stays live before it expires with no payout.
export const EYE_CASE_TTL_DAYS = 5;

// Clamp a number into a closed interval. Used for evidence quality,
// exposure and anything else that must never escape its legal band.
function clampNumber(value, low, high) {
  if (value < low) return low;
  if (value > high) return high;
  return value;
}

// The stealth score for a tailing attempt: the rng roll stretched across
// six points plus the familiarity built so far. A target with alertness
// 5 can only be beaten by a strong roll or a well-worn tail; a target
// with alertness 1 can be beaten by almost any careful attempt.
export function tailCheckScore(roll, progress) {
  return roll * 6 + progress;
}

// Whether a stealth score beats a target alertness. Strictly greater:
// matching the alertness exactly means the target noticed something.
export function tailBeatsAlertness(score, alertness) {
  return score > alertness;
}

// The evidence quality a snapshot would roll for a given rng draw and
// informant level, before the tailing gate is checked. Kept pure so
// tests can predict a photograph exactly from a rigged rng.
export function evidenceQualityFor(roll, informantLevel) {
  const level = clampNumber(Math.floor(informantLevel), 0, EYE_MAX_INFORMANT_LEVEL);
  const quality = Math.floor(EYE_BASE_EVIDENCE + roll * EYE_EVIDENCE_SPREAD + level * EYE_EVIDENCE_PER_INFORMANT);
  return clampNumber(quality, 0, EYE_MAX_EVIDENCE);
}

// The blackmail cheque for a given evidence quality: twelve dollars per
// point of proof. Quality 50 pays 600; quality 90 pays 1080.
export function blackmailPayoutFor(evidenceQuality) {
  const q = clampNumber(Math.floor(evidenceQuality), 0, EYE_MAX_EVIDENCE);
  return q * EYE_BLACKMAIL_PER_POINT;
}

// A human-readable band for an evidence quality score, used in logs.
export function evidenceBand(quality) {
  if (quality >= 90) return 'ironclad';
  if (quality >= 75) return 'damning';
  if (quality >= 60) return 'solid';
  if (quality >= 50) return 'usable';
  return 'flimsy';
}

// A human-readable band for an exposure level, used in logs and HUD text.
export function exposureBand(exposure) {
  if (exposure >= 40) return 'burning';
  if (exposure >= 25) return 'watched';
  if (exposure >= 10) return 'noticed';
  return 'clean';
}

// Look a case up by id. Returns the case object or null.
export function caseInfo(caseId) {
  return EYE_CASES.find((c) => c.id === caseId) || null;
}

// Look a tail target up by id. Returns the target object or null.
export function targetInfo(targetId) {
  return TAIL_TARGETS.find((t) => t.id === targetId) || null;
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createDetectiveSystem(deps) {
  const safe = deps || {};
  const rng = typeof safe.rng === 'function' ? safe.rng : Math.random;
  const getDay = typeof safe.getDay === 'function' ? safe.getDay : () => 1;
  const getHour = typeof safe.getHour === 'function' ? safe.getHour : () => 12;
  const getCash = typeof safe.getCash === 'function' ? safe.getCash : () => 0;
  const addCash = typeof safe.addCash === 'function' ? safe.addCash : () => {};
  const addHeat = typeof safe.addHeat === 'function' ? safe.addHeat : () => {};
  const log = typeof safe.log === 'function' ? safe.log : () => {};
  const getHeatLevel = typeof safe.getHeatLevel === 'function' ? safe.getHeatLevel : () => 0;

  // --- Mutable state. Everything here round-trips through serialize. ---
  let activeCase = null;
  let tailing = {};
  let evidence = {};
  let burned = [];
  let informantLevel = 0;
  let exposure = 0;
  let casesCompleted = 0;
  let casesTaken = 0;
  let casesExpired = 0;
  let tailsSucceeded = 0;
  let tailsFailed = 0;
  let photosTaken = 0;
  let blackmailsPaid = 0;
  let totalEarned = 0;
  let totalSpent = 0;
  let lastTickDay = null;

  // Tailing progress on a target, defaulting to zero for a fresh face.
  function tailingOf(targetId) {
    const value = tailing[targetId];
    return typeof value === 'number' ? value : 0;
  }

  // Evidence quality held on a target, defaulting to zero.
  function evidenceOf(targetId) {
    const value = evidence[targetId];
    return typeof value === 'number' ? value : 0;
  }

  // Whether a target has been burned by a blackmail and can never be
  // blackmailed again.
  function isBurned(targetId) {
    return burned.indexOf(targetId) !== -1;
  }

  // Age of the active case in days, or zero when no case is active.
  function activeCaseAge(dayNumber) {
    if (!activeCase) return 0;
    const started = typeof activeCase.startedDay === 'number' ? activeCase.startedDay : dayNumber;
    return dayNumber - started;
  }

  // --- Taking cases ----------------------------------------------------------

  // Take a case. Only one case can be active at a time, and the case
  // names the target the eye must work. The start day is stamped from
  // the clock so the daily hook can expire stale cases.
  //
  // Failures, checked in this order:
  //   unknown-case     the case id is not in EYE_CASES
  //   case-active      another case is already open
  function takeCase(caseId) {
    const found = caseInfo(caseId);
    if (!found) return { ok: false, reason: 'unknown-case' };
    if (activeCase) return { ok: false, reason: 'case-active' };
    activeCase = {
      caseId: found.id,
      name: found.name,
      difficulty: found.difficulty,
      payout: found.payout,
      targetId: found.targetId,
      startedDay: getDay(),
    };
    casesTaken += 1;
    const target = targetInfo(found.targetId);
    log('Took case ' + found.name + ' — target: ' + (target ? target.name : found.targetId) + ', payout $' + found.payout + '.');
    return {
      ok: true,
      caseId: found.id,
      name: found.name,
      difficulty: found.difficulty,
      payout: found.payout,
      targetId: found.targetId,
      target: target ? target.name : null,
      startedDay: activeCase.startedDay,
    };
  }

  // --- Tailing ---------------------------------------------------------------

  // Tail a target. The stealth check is rng * 6 plus the tailing progress
  // already built on this target, and it must beat the target alertness.
  // Success adds one tailing progress. Failure adds 10 exposure and 1
  // heat, and the target is no closer to being photographed.
  //
  // Failures:
  //   unknown-target   the target id is not in TAIL_TARGETS
  //   spotted          the roll plus progress did not beat alertness
  function tailTarget(targetId) {
    const target = targetInfo(targetId);
    if (!target) return { ok: false, reason: 'unknown-target' };
    const progress = tailingOf(targetId);
    const roll = rng();
    const score = tailCheckScore(roll, progress);
    if (!tailBeatsAlertness(score, target.alertness)) {
      exposure += EYE_EXPOSURE_PER_INCIDENT;
      addHeat(EYE_HEAT_PER_FAILED_TAIL);
      tailsFailed += 1;
      log('Spotted tailing ' + target.name + ' — exposure +' + EYE_EXPOSURE_PER_INCIDENT + ' (' + exposure + '), heat +1.');
      return {
        ok: false,
        reason: 'spotted',
        targetId: target.id,
        target: target.name,
        score,
        alertness: target.alertness,
        progress,
        exposure,
      };
    }
    const next = progress + 1;
    tailing[targetId] = next;
    tailsSucceeded += 1;
    log('Tailed ' + target.name + ' cleanly — progress ' + next + '.');
    return {
      ok: true,
      targetId: target.id,
      target: target.name,
      score,
      alertness: target.alertness,
      progress: next,
    };
  }

  // --- Evidence --------------------------------------------------------------

  // Snap photographic evidence of a target. Needs tailing progress of at
  // least 2 on that target. Quality is 30 + rng * 50 + informant level
  // times 10, floored and capped at 100. A new snapshot replaces the old
  // one on that target, for better or worse: a bad re-shoot can weaken
  // the file.
  //
  // Failures, checked in this order:
  //   unknown-target       the target id is not in TAIL_TARGETS
  //   not-enough-tailing   fewer than 2 tailing progress on the target
  function snapEvidence(targetId) {
    const target = targetInfo(targetId);
    if (!target) return { ok: false, reason: 'unknown-target' };
    if (tailingOf(targetId) < EYE_TAILING_FOR_EVIDENCE) return { ok: false, reason: 'not-enough-tailing' };
    const roll = rng();
    const quality = evidenceQualityFor(roll, informantLevel);
    evidence[targetId] = quality;
    photosTaken += 1;
    const band = evidenceBand(quality);
    log('Snapped ' + target.name + ' — evidence ' + quality + ' (' + band + ').');
    return {
      ok: true,
      targetId: target.id,
      target: target.name,
      quality,
      band,
      informantLevel,
    };
  }

  // --- Blackmail ---------------------------------------------------------------

  // Blackmail a target for a quick payday. Needs evidence of at least 50
  // on the target. Pays evidence times 12 dollars, adds 10 exposure and
  // burns the target: a burned target can never be blackmailed again.
  // The evidence stays on file, but the burn flag blocks any repeat.
  //
  // Failures, checked in this order:
  //   unknown-target       the target id is not in TAIL_TARGETS
  //   already-burned       the target was already blackmailed once
  //   not-enough-evidence  evidence on the target is below 50
  function blackmail(targetId) {
    const target = targetInfo(targetId);
    if (!target) return { ok: false, reason: 'unknown-target' };
    if (isBurned(targetId)) return { ok: false, reason: 'already-burned' };
    const quality = evidenceOf(targetId);
    if (quality < EYE_EVIDENCE_FOR_BLACKMAIL) return { ok: false, reason: 'not-enough-evidence' };
    const payout = blackmailPayoutFor(quality);
    addCash(payout);
    totalEarned += payout;
    blackmailsPaid += 1;
    exposure += EYE_EXPOSURE_PER_INCIDENT;
    burned.push(targetId);
    log('Blackmailed ' + target.name + ' for $' + payout + ' — target burned, exposure +' + EYE_EXPOSURE_PER_INCIDENT + ' (' + exposure + ').');
    return {
      ok: true,
      targetId: target.id,
      target: target.name,
      evidence: quality,
      payout,
      exposure,
      cash: getCash(),
    };
  }

  // --- Informants --------------------------------------------------------------

  // Pay an informant 150 dollars to raise the informant level by one, up
  // to a maximum of 3. Every level adds 10 evidence quality to every
  // future snapshot.
  //
  // Failures, checked in this order:
  //   max-informant    the informant level is already 3
  //   not-enough-cash  the wallet cannot cover the 150
  function payInformant() {
    if (informantLevel >= EYE_MAX_INFORMANT_LEVEL) return { ok: false, reason: 'max-informant' };
    if (getCash() < EYE_INFORMANT_COST) return { ok: false, reason: 'not-enough-cash' };
    addCash(-EYE_INFORMANT_COST);
    totalSpent += EYE_INFORMANT_COST;
    informantLevel += 1;
    log('Paid an informant $' + EYE_INFORMANT_COST + ' — informant level ' + informantLevel + '.');
    return {
      ok: true,
      informantLevel,
      cost: EYE_INFORMANT_COST,
      cash: getCash(),
    };
  }

  // --- Closing cases -------------------------------------------------------------

  // Close the active case properly for the client payout. Needs an active
  // case and evidence of at least 60 on that case target. Pays the case
  // payout, counts one completed case and clears the active slot.
  //
  // Failures, checked in this order:
  //   no-active-case       no case is currently open
  //   not-enough-evidence  evidence on the case target is below 60
  function completeCase() {
    if (!activeCase) return { ok: false, reason: 'no-active-case' };
    const target = targetInfo(activeCase.targetId);
    const quality = evidenceOf(activeCase.targetId);
    if (quality < EYE_EVIDENCE_FOR_CASE) return { ok: false, reason: 'not-enough-evidence' };
    const payout = activeCase.payout;
    const finished = {
      caseId: activeCase.caseId,
      name: activeCase.name,
      targetId: activeCase.targetId,
      target: target ? target.name : null,
      evidence: quality,
      payout,
    };
    addCash(payout);
    totalEarned += payout;
    casesCompleted += 1;
    activeCase = null;
    log('Closed case ' + finished.name + ' — client paid $' + payout + '.');
    return {
      ok: true,
      caseId: finished.caseId,
      name: finished.name,
      targetId: finished.targetId,
      target: finished.target,
      evidence: finished.evidence,
      payout,
      casesCompleted,
      cash: getCash(),
    };
  }

  // Walk away from the active case with no payout. The trail is dropped
  // but the tailing progress and evidence already gathered stay on file.
  //
  // Failures:
  //   no-active-case       no case is currently open
  function abandonCase() {
    if (!activeCase) return { ok: false, reason: 'no-active-case' };
    const dropped = { caseId: activeCase.caseId, name: activeCase.name, targetId: activeCase.targetId };
    activeCase = null;
    log('Dropped case ' + dropped.name + ' — no payout.');
    return { ok: true, caseId: dropped.caseId, name: dropped.name, targetId: dropped.targetId };
  }

  // --- Day hook ------------------------------------------------------------------

  // Run once per in-game day. An active case older than 5 days expires
  // with no payout, and exposure decays by 5 down to a floor of 0.
  // Calling twice for the same day is a failure, not a second decay.
  //
  // Failures:
  //   already-settled      tickDay already ran for this day
  function tickDay(day) {
    const dayNumber = day === undefined || day === null ? getDay() : day;
    if (lastTickDay === dayNumber) return { ok: false, reason: 'already-settled' };
    lastTickDay = dayNumber;
    let expired = false;
    let expiredCase = null;
    if (activeCase && activeCaseAge(dayNumber) > EYE_CASE_TTL_DAYS) {
      expired = true;
      expiredCase = { caseId: activeCase.caseId, name: activeCase.name, targetId: activeCase.targetId };
      activeCase = null;
      casesExpired += 1;
      log('Case ' + expiredCase.name + ' expired — the client moved on.');
    }
    const before = exposure;
    exposure = Math.max(0, exposure - EYE_EXPOSURE_DECAY_PER_DAY);
    const decayed = before - exposure;
    if (decayed > 0) {
      log('Day ' + dayNumber + ': laid low, exposure -' + decayed + ' (' + exposure + ').');
    }
    return {
      ok: true,
      day: dayNumber,
      expired,
      expiredCase,
      exposureBefore: before,
      exposure,
      decayed,
      activeCase: activeCase ? activeCase.caseId : null,
    };
  }

  // --- Reporting -------------------------------------------------------------------

  // A plain snapshot of the numbers that matter: case pipeline, tailing
  // and evidence state, informants, exposure and lifetime money.
  function stats() {
    return {
      activeCase: activeCase ? activeCase.caseId : null,
      activeTarget: activeCase ? activeCase.targetId : null,
      informantLevel,
      exposure,
      exposureBand: exposureBand(exposure),
      casesCompleted,
      casesTaken,
      casesExpired,
      tailsSucceeded,
      tailsFailed,
      photosTaken,
      blackmailsPaid,
      burnedCount: burned.length,
      totalEarned,
      totalSpent,
      cash: getCash(),
      heat: getHeatLevel(),
      hour: getHour(),
      day: getDay(),
    };
  }

  // One short line for the HUD. Empty while the eye has no case, no
  // exposure and no completed work, so a fresh save does not clutter the
  // screen. Once anything exists, the line shows the open case, exposure
  // and completed count.
  function hudLine() {
    if (!activeCase && exposure === 0 && casesCompleted === 0 && blackmailsPaid === 0) return '';
    const caseBit = activeCase ? ' · case: ' + activeCase.name : '';
    const exposureBit = exposure > 0 ? ' · exposure ' + exposure + ' (' + exposureBand(exposure) + ')' : '';
    return 'Eye: ' + casesCompleted + ' closed' + caseBit + exposureBit;
  }

  // --- Persistence -------------------------------------------------------------------

  // Plain JSON-able state. Tailing and evidence maps are copied key by
  // key, and the burned list is copied, so a caller mutating the returned
  // snapshot cannot corrupt live state.
  function serialize() {
    return {
      activeCase: activeCase ? { ...activeCase } : null,
      tailing: { ...tailing },
      evidence: { ...evidence },
      burned: burned.slice(),
      informantLevel,
      exposure,
      casesCompleted,
      casesTaken,
      casesExpired,
      tailsSucceeded,
      tailsFailed,
      photosTaken,
      blackmailsPaid,
      totalEarned,
      totalSpent,
      lastTickDay,
    };
  }

  // Restore state from a serialize() snapshot. Missing fields fall back
  // to defaults, and malformed map rows are skipped rather than crashing
  // the load. A null or non-object snapshot resets to a fresh eye instead
  // of throwing.
  function deserialize(d) {
    const data = d && typeof d === 'object' ? d : {};
    if (data.activeCase && typeof data.activeCase === 'object' && typeof data.activeCase.caseId === 'string') {
      activeCase = {
        caseId: data.activeCase.caseId,
        name: typeof data.activeCase.name === 'string' ? data.activeCase.name : data.activeCase.caseId,
        difficulty: typeof data.activeCase.difficulty === 'number' ? data.activeCase.difficulty : 1,
        payout: typeof data.activeCase.payout === 'number' ? data.activeCase.payout : 0,
        targetId: typeof data.activeCase.targetId === 'string' ? data.activeCase.targetId : '',
        startedDay: typeof data.activeCase.startedDay === 'number' ? data.activeCase.startedDay : 1,
      };
    } else {
      activeCase = null;
    }
    tailing = {};
    if (data.tailing && typeof data.tailing === 'object') {
      for (const key of Object.keys(data.tailing)) {
        if (typeof data.tailing[key] === 'number') tailing[key] = Math.max(0, Math.floor(data.tailing[key]));
      }
    }
    evidence = {};
    if (data.evidence && typeof data.evidence === 'object') {
      for (const key of Object.keys(data.evidence)) {
        if (typeof data.evidence[key] === 'number') {
          evidence[key] = clampNumber(Math.floor(data.evidence[key]), 0, EYE_MAX_EVIDENCE);
        }
      }
    }
    burned = Array.isArray(data.burned) ? data.burned.filter((b) => typeof b === 'string') : [];
    informantLevel = typeof data.informantLevel === 'number'
      ? clampNumber(Math.floor(data.informantLevel), 0, EYE_MAX_INFORMANT_LEVEL)
      : 0;
    exposure = typeof data.exposure === 'number' ? Math.max(0, Math.floor(data.exposure)) : 0;
    casesCompleted = typeof data.casesCompleted === 'number' ? Math.max(0, Math.floor(data.casesCompleted)) : 0;
    casesTaken = typeof data.casesTaken === 'number' ? Math.max(0, Math.floor(data.casesTaken)) : 0;
    casesExpired = typeof data.casesExpired === 'number' ? Math.max(0, Math.floor(data.casesExpired)) : 0;
    tailsSucceeded = typeof data.tailsSucceeded === 'number' ? Math.max(0, Math.floor(data.tailsSucceeded)) : 0;
    tailsFailed = typeof data.tailsFailed === 'number' ? Math.max(0, Math.floor(data.tailsFailed)) : 0;
    photosTaken = typeof data.photosTaken === 'number' ? Math.max(0, Math.floor(data.photosTaken)) : 0;
    blackmailsPaid = typeof data.blackmailsPaid === 'number' ? Math.max(0, Math.floor(data.blackmailsPaid)) : 0;
    totalEarned = typeof data.totalEarned === 'number' ? data.totalEarned : 0;
    totalSpent = typeof data.totalSpent === 'number' ? data.totalSpent : 0;
    lastTickDay = typeof data.lastTickDay === 'number' ? data.lastTickDay : null;
    return { ok: true, activeCase: activeCase ? activeCase.caseId : null, exposure, casesCompleted };
  }

  // --- Lookups -------------------------------------------------------------------------

  // A copy of the active case's public fields, or null when no case is
  // open. The copy keeps callers from editing live state by accident.
  function caseStatus() {
    if (!activeCase) return { active: false, caseId: null, targetId: null };
    const target = targetInfo(activeCase.targetId);
    return {
      active: true,
      caseId: activeCase.caseId,
      name: activeCase.name,
      difficulty: activeCase.difficulty,
      payout: activeCase.payout,
      targetId: activeCase.targetId,
      target: target ? target.name : null,
      startedDay: activeCase.startedDay,
      ageDays: activeCaseAge(getDay()),
      daysLeft: Math.max(0, EYE_CASE_TTL_DAYS - activeCaseAge(getDay())),
      evidence: evidenceOf(activeCase.targetId),
      evidenceNeeded: EYE_EVIDENCE_FOR_CASE,
      readyToClose: evidenceOf(activeCase.targetId) >= EYE_EVIDENCE_FOR_CASE,
    };
  }

  // A copy of one target's live state: tailing, evidence, burn status and
  // the static alertness that governs the stealth check.
  function targetStatus(targetId) {
    const target = targetInfo(targetId);
    if (!target) return null;
    return {
      id: target.id,
      name: target.name,
      alertness: target.alertness,
      habit: target.habit,
      tailing: tailingOf(targetId),
      evidence: evidenceOf(targetId),
      burned: isBurned(targetId),
      canPhotograph: tailingOf(targetId) >= EYE_TAILING_FOR_EVIDENCE,
      canBlackmail: !isBurned(targetId) && evidenceOf(targetId) >= EYE_EVIDENCE_FOR_BLACKMAIL,
      blackmailPayout: blackmailPayoutFor(evidenceOf(targetId)),
    };
  }

  // Copies of every target's live state, in catalogue order.
  function listTargets() {
    return TAIL_TARGETS.map((t) => targetStatus(t.id));
  }

  // Copies of every case with its target name attached, for the case board.
  function listCases() {
    return EYE_CASES.map((c) => {
      const target = targetInfo(c.targetId);
      return {
        id: c.id,
        name: c.name,
        difficulty: c.difficulty,
        payout: c.payout,
        targetId: c.targetId,
        target: target ? target.name : null,
        brief: c.brief,
        active: activeCase ? activeCase.caseId === c.id : false,
      };
    });
  }

  // The easiest case on the board, for a new eye finding its feet.
  function easiestCase() {
    let easiest = EYE_CASES[0];
    for (const found of EYE_CASES) {
      if (found.difficulty < easiest.difficulty) easiest = found;
    }
    return { id: easiest.id, name: easiest.name, difficulty: easiest.difficulty, payout: easiest.payout };
  }

  // The hardest case on the board, and the richest.
  function hardestCase() {
    let hardest = EYE_CASES[0];
    for (const found of EYE_CASES) {
      if (found.difficulty > hardest.difficulty) hardest = found;
    }
    return { id: hardest.id, name: hardest.name, difficulty: hardest.difficulty, payout: hardest.payout };
  }

  // The least alert target on the street, the safest tail for a beginner.
  function calmestTarget() {
    let calmest = TAIL_TARGETS[0];
    for (const target of TAIL_TARGETS) {
      if (target.alertness < calmest.alertness) calmest = target;
    }
    return { id: calmest.id, name: calmest.name, alertness: calmest.alertness };
  }

  // The most alert target on the street, the hardest tail in the city.
  function sharpestTarget() {
    let sharpest = TAIL_TARGETS[0];
    for (const target of TAIL_TARGETS) {
      if (target.alertness > sharpest.alertness) sharpest = target;
    }
    return { id: sharpest.id, name: sharpest.name, alertness: sharpest.alertness };
  }

  // Whether the active case can be closed right now, broken down so the
  // UI can show which requirement is still short.
  function closeReadiness() {
    if (!activeCase) return { ready: false, reason: 'no-active-case' };
    const quality = evidenceOf(activeCase.targetId);
    if (quality < EYE_EVIDENCE_FOR_CASE) {
      return { ready: false, reason: 'not-enough-evidence', evidence: quality, needed: EYE_EVIDENCE_FOR_CASE };
    }
    return { ready: true, caseId: activeCase.caseId, evidence: quality, payout: activeCase.payout };
  }

  // Whether a target can be blackmailed right now, broken down the same
  // way, so the UI can explain a refusal before the player commits.
  function blackmailReadiness(targetId) {
    const target = targetInfo(targetId);
    if (!target) return { ready: false, reason: 'unknown-target' };
    if (isBurned(targetId)) return { ready: false, reason: 'already-burned' };
    const quality = evidenceOf(targetId);
    if (quality < EYE_EVIDENCE_FOR_BLACKMAIL) {
      return { ready: false, reason: 'not-enough-evidence', evidence: quality, needed: EYE_EVIDENCE_FOR_BLACKMAIL };
    }
    return { ready: true, targetId: target.id, evidence: quality, payout: blackmailPayoutFor(quality) };
  }

  // Expected blackmail value across every target that currently qualifies,
  // before exposure is counted. A quick read on how much dirty money is
  // sitting in the photo file.
  function pendingBlackmailValue() {
    let sum = 0;
    let count = 0;
    for (const target of TAIL_TARGETS) {
      if (isBurned(target.id)) continue;
      const quality = evidenceOf(target.id);
      if (quality >= EYE_EVIDENCE_FOR_BLACKMAIL) {
        sum += blackmailPayoutFor(quality);
        count += 1;
      }
    }
    return { total: sum, targets: count };
  }

  return {
    takeCase,
    tailTarget,
    snapEvidence,
    blackmail,
    payInformant,
    completeCase,
    abandonCase,
    tickDay,
    stats,
    hudLine,
    serialize,
    deserialize,
    caseStatus,
    targetStatus,
    listTargets,
    listCases,
    easiestCase,
    hardestCase,
    calmestTarget,
    sharpestTarget,
    closeReadiness,
    blackmailReadiness,
    pendingBlackmailValue,
  };
}
