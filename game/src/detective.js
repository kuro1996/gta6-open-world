export const TAIL_TARGETS = [
  { id: 'wandering-husband', name: 'Wandering Husband', alertness: 2, habit: 'Long lunches near the marina.' },
  { id: 'vanished-heiress', name: 'Vanished Heiress', alertness: 4, habit: 'Changes cars twice a day.' },
  { id: 'limping-clerk', name: 'Limping Clerk', alertness: 3, habit: 'Same route, same hour, every day.' },
  { id: 'nervous-accountant', name: 'Nervous Accountant', alertness: 5, habit: 'Checks every window he passes.' },
  { id: 'velvet-mayor', name: 'Velvet Mayor', alertness: 5, habit: 'Bodyguards and closed curtains.' },
  { id: 'faded-starlet', name: 'Faded Starlet', alertness: 1, habit: 'Cafes on the boardwalk at noon.' },
];

export const EYE_CASES = [
  { id: 'runaway-star', name: 'Runaway Star', difficulty: 1, payout: 400, targetId: 'faded-starlet', brief: 'Find the starlet before her agent does.' },
  { id: 'cheating-spouse', name: 'Cheating Spouse', difficulty: 2, payout: 600, targetId: 'wandering-husband', brief: 'Prove where the husband really goes.' },
  { id: 'insurance-scam', name: 'Insurance Scam', difficulty: 3, payout: 900, targetId: 'limping-clerk', brief: 'Catch the limp that disappears on weekends.' },
  { id: 'missing-heir', name: 'Missing Heir', difficulty: 4, payout: 1400, targetId: 'vanished-heiress', brief: 'Trace the heiress through her shell companies.' },
  { id: 'stolen-ledger', name: 'Stolen Ledger', difficulty: 5, payout: 1800, targetId: 'nervous-accountant', brief: 'Follow the books the accountant hid.' },
  { id: 'blackmail-ring', name: 'Blackmail Ring', difficulty: 6, payout: 2000, targetId: 'velvet-mayor', brief: 'Unmask who the mayor pays every month.' },
];

export const EYE_MAX_EVIDENCE = 100;
export const EYE_BASE_EVIDENCE = 30;
export const EYE_EVIDENCE_SPREAD = 50;
export const EYE_EVIDENCE_PER_INFORMANT = 10;
export const EYE_TAILING_FOR_EVIDENCE = 2;
export const EYE_EVIDENCE_FOR_BLACKMAIL = 50;
export const EYE_EVIDENCE_FOR_CASE = 60;
export const EYE_BLACKMAIL_PER_POINT = 12;
export const EYE_EXPOSURE_PER_INCIDENT = 10;
export const EYE_HEAT_PER_FAILED_TAIL = 1;
export const EYE_EXPOSURE_DECAY_PER_DAY = 5;
export const EYE_INFORMANT_COST = 150;
export const EYE_MAX_INFORMANT_LEVEL = 3;
export const EYE_CASE_TTL_DAYS = 5;

export function tailCheckScore(roll, progress) {
  return roll * 6 + progress;
}

export function tailBeatsAlertness(score, alertness) {
  return score > alertness;
}

export function evidenceQualityFor(roll, informantLevel) {
  const lvl = Math.max(0, Math.min(3, Math.floor(informantLevel || 0)));
  const q = Math.floor(30 + roll * 50 + lvl * 10);
  return Math.max(0, Math.min(100, q));
}

export function blackmailPayoutFor(evidence) {
  const q = Math.max(0, Math.min(100, evidence));
  return q * 12;
}

export function evidenceBand(quality) {
  if (quality >= 90) return 'ironclad';
  if (quality >= 75) return 'damning';
  if (quality >= 60) return 'solid';
  if (quality >= 50) return 'usable';
  return 'flimsy';
}

export function exposureBand(exposure) {
  if (exposure >= 40) return 'burning';
  if (exposure >= 25) return 'watched';
  if (exposure >= 10) return 'noticed';
  return 'clean';
}

export function caseInfo(id) {
  for (const c of EYE_CASES) if (c.id === id) return c;
  return null;
}

export function targetInfo(id) {
  for (const t of TAIL_TARGETS) if (t.id === id) return t;
  return null;
}

export function createDetectiveSystem(deps) {
  const d = deps || {};
  const rnd = typeof d.rng === 'function' ? d.rng : Math.random;
  const dayOf = typeof d.getDay === 'function' ? d.getDay : () => 1;
  const cashOf = typeof d.getCash === 'function' ? d.getCash : () => 0;
  const moveCash = typeof d.addCash === 'function' ? d.addCash : () => {};
  const pushHeat = typeof d.addHeat === 'function' ? d.addHeat : () => {};
  const say = typeof d.log === 'function' ? d.log : () => {};
  const heatOf = typeof d.getHeatLevel === 'function' ? d.getHeatLevel : () => 0;
  const hourOf = typeof d.getHour === 'function' ? d.getHour : () => 12;

  const state = {
    activeCase: null,
    tailing: {},
    evidence: {},
    burned: [],
    informantLevel: 0,
    exposure: 0,
    casesCompleted: 0,
    casesTaken: 0,
    casesExpired: 0,
    tailsSucceeded: 0,
    tailsFailed: 0,
    photosTaken: 0,
    blackmailsPaid: 0,
    totalEarned: 0,
    totalSpent: 0,
    lastTickDay: null,
  };

  function takeCase(caseId) {
    const c = caseInfo(caseId);
    if (!c) return { ok: false, reason: 'unknown-case' };
    if (state.activeCase) return { ok: false, reason: 'case-active' };
    const target = targetInfo(c.targetId);
    state.activeCase = {
      caseId: c.id,
      name: c.name,
      difficulty: c.difficulty,
      payout: c.payout,
      targetId: c.targetId,
      startedDay: dayOf(),
    };
    state.casesTaken += 1;
    say('Took the case: ' + c.name + '.');
    return { ok: true, caseId: c.id, name: c.name, difficulty: c.difficulty, payout: c.payout, targetId: c.targetId, targetName: target ? target.name : null, startedDay: state.activeCase.startedDay };
  }

  function tailTarget(targetId) {
    const t = targetInfo(targetId);
    if (!t) return { ok: false, reason: 'unknown-target' };
    const roll = rnd();
    const progress = state.tailing[targetId] || 0;
    const score = tailCheckScore(roll, progress);
    if (!tailBeatsAlertness(score, t.alertness)) {
      state.exposure += 10;
      pushHeat(1);
      state.tailsFailed += 1;
      say('Spotted tailing ' + t.name + '.');
      return { ok: false, reason: 'spotted', targetId, targetName: t.name, score, alertness: t.alertness, progress, exposure: state.exposure };
    }
    state.tailing[targetId] = progress + 1;
    state.tailsSucceeded += 1;
    return { ok: true, targetId, targetName: t.name, score, alertness: t.alertness, progress: state.tailing[targetId] };
  }

  function snapEvidence(targetId) {
    const t = targetInfo(targetId);
    if (!t) return { ok: false, reason: 'unknown-target' };
    const progress = state.tailing[targetId] || 0;
    if (progress < 2) return { ok: false, reason: 'not-enough-tailing' };
    const quality = evidenceQualityFor(rnd(), state.informantLevel);
    state.evidence[targetId] = quality;
    state.photosTaken += 1;
    say('Snapped evidence on ' + t.name + ' (' + evidenceBand(quality) + ').');
    return { ok: true, targetId, targetName: t.name, quality, band: evidenceBand(quality), informantLevel: state.informantLevel };
  }

  function blackmail(targetId) {
    const t = targetInfo(targetId);
    if (!t) return { ok: false, reason: 'unknown-target' };
    if (state.burned.includes(targetId)) return { ok: false, reason: 'already-burned' };
    const ev = state.evidence[targetId] || 0;
    if (ev < 50) return { ok: false, reason: 'not-enough-evidence' };
    const payout = blackmailPayoutFor(ev);
    moveCash(payout);
    state.totalEarned += payout;
    state.blackmailsPaid += 1;
    state.exposure += 10;
    state.burned.push(targetId);
    say('Blackmailed ' + t.name + ' for $' + payout + '.');
    return { ok: true, targetId, targetName: t.name, evidence: ev, payout, exposure: state.exposure, cash: cashOf() };
  }

  function payInformant() {
    if (state.informantLevel >= 3) return { ok: false, reason: 'max-level' };
    if (cashOf() < 150) return { ok: false, reason: 'not-enough-cash' };
    moveCash(-150);
    state.totalSpent += 150;
    state.informantLevel += 1;
    say('Paid an informant. Level is now ' + state.informantLevel + '.');
    return { ok: true, informantLevel: state.informantLevel, cost: 150, cash: cashOf() };
  }

  function completeCase() {
    if (!state.activeCase) return { ok: false, reason: 'no-case' };
    const ev = state.evidence[state.activeCase.targetId] || 0;
    if (ev < 60) return { ok: false, reason: 'not-enough-evidence' };
    const c = state.activeCase;
    moveCash(c.payout);
    state.totalEarned += c.payout;
    state.casesCompleted += 1;
    state.activeCase = null;
    say('Closed the case: ' + c.name + ' for $' + c.payout + '.');
    return { ok: true, caseId: c.caseId, name: c.name, targetId: c.targetId, targetName: (targetInfo(c.targetId) || {}).name || null, evidence: ev, payout: c.payout, casesCompleted: state.casesCompleted, cash: cashOf() };
  }

  function abandonCase() {
    if (!state.activeCase) return { ok: false, reason: 'no-case' };
    const c = state.activeCase;
    state.activeCase = null;
    say('Abandoned the case: ' + c.name + '.');
    return { ok: true, caseId: c.caseId, name: c.name, targetId: c.targetId };
  }

  function tickDay(day) {
    const today = day !== undefined && day !== null ? day : dayOf();
    if (state.lastTickDay === today) return { ok: false, reason: 'already-settled' };
    state.lastTickDay = today;
    let expired = false;
    let expiredCase = null;
    if (state.activeCase) {
      const age = today - state.activeCase.startedDay;
      if (age > 5) {
        expired = true;
        expiredCase = { ...state.activeCase };
        state.activeCase = null;
        state.casesExpired += 1;
        say('A case went cold: ' + expiredCase.name + '.');
      }
    }
    const before = state.exposure;
    const decayed = Math.min(before, 5);
    state.exposure = Math.max(0, before - 5);
    if (decayed > 0) say('Exposure faded by ' + decayed + '.');
    return { ok: true, day: today, expired, expiredCase, exposureBefore: before, exposure: state.exposure, decayed, activeCaseId: state.activeCase ? state.activeCase.caseId : null };
  }

  function stats() {
    return {
      activeCaseId: state.activeCase ? state.activeCase.caseId : null,
      activeTargetId: state.activeCase ? state.activeCase.targetId : null,
      informantLevel: state.informantLevel,
      exposure: state.exposure,
      exposureBand: exposureBand(state.exposure),
      casesCompleted: state.casesCompleted,
      casesTaken: state.casesTaken,
      casesExpired: state.casesExpired,
      tailsSucceeded: state.tailsSucceeded,
      tailsFailed: state.tailsFailed,
      photosTaken: state.photosTaken,
      blackmailsPaid: state.blackmailsPaid,
      burned: state.burned.length,
      totalEarned: state.totalEarned,
      totalSpent: state.totalSpent,
      cash: cashOf(),
      heatLevel: heatOf(),
      hour: hourOf(),
      day: dayOf(),
    };
  }

  function hudLine() {
    if (!state.activeCase && state.exposure === 0 && state.casesCompleted === 0 && state.blackmailsPaid === 0) return '';
    const bits = ['Eye', state.casesCompleted + ' closed'];
    if (state.activeCase) bits.push(state.activeCase.name);
    if (state.exposure > 0) bits.push(state.exposure + ' ' + exposureBand(state.exposure));
    return bits.join(' · ');
  }

  function caseStatus() {
    if (!state.activeCase) return { active: false, caseId: null, targetId: null };
    const c = state.activeCase;
    const ev = state.evidence[c.targetId] || 0;
    const age = dayOf() - c.startedDay;
    return {
      active: true,
      caseId: c.caseId,
      name: c.name,
      difficulty: c.difficulty,
      payout: c.payout,
      targetId: c.targetId,
      targetName: (targetInfo(c.targetId) || {}).name || null,
      startedDay: c.startedDay,
      age,
      daysLeft: Math.max(0, 5 - age),
      evidence: ev,
      evidenceNeeded: 60,
      ready: ev >= 60,
    };
  }

  function targetStatus(targetId) {
    const t = targetInfo(targetId);
    if (!t) return null;
    const ev = state.evidence[targetId] || 0;
    const progress = state.tailing[targetId] || 0;
    const burned = state.burned.includes(targetId);
    return {
      id: t.id,
      name: t.name,
      alertness: t.alertness,
      habit: t.habit,
      tailing: progress,
      evidence: ev,
      burned,
      canPhotograph: progress >= 2,
      canBlackmail: !burned && ev >= 50,
      blackmailPayout: !burned && ev >= 50 ? blackmailPayoutFor(ev) : 0,
    };
  }

  function listTargets() {
    return TAIL_TARGETS.map((t) => targetStatus(t.id));
  }

  function listCases() {
    return EYE_CASES.map((c) => ({
      id: c.id,
      name: c.name,
      difficulty: c.difficulty,
      payout: c.payout,
      targetId: c.targetId,
      targetName: (targetInfo(c.targetId) || {}).name || null,
      brief: c.brief,
      active: state.activeCase ? state.activeCase.caseId === c.id : false,
    }));
  }

  function easiestCase() {
    let best = EYE_CASES[0];
    for (const c of EYE_CASES) if (c.difficulty < best.difficulty) best = c;
    return { id: best.id, name: best.name, difficulty: best.difficulty, payout: best.payout };
  }

  function hardestCase() {
    let best = EYE_CASES[0];
    for (const c of EYE_CASES) if (c.difficulty > best.difficulty) best = c;
    return { id: best.id, name: best.name, difficulty: best.difficulty, payout: best.payout };
  }

  function calmestTarget() {
    let best = TAIL_TARGETS[0];
    for (const t of TAIL_TARGETS) if (t.alertness < best.alertness) best = t;
    return { id: best.id, name: best.name, alertness: best.alertness };
  }

  function sharpestTarget() {
    let best = TAIL_TARGETS[0];
    for (const t of TAIL_TARGETS) if (t.alertness > best.alertness) best = t;
    return { id: best.id, name: best.name, alertness: best.alertness };
  }

  function closeReadiness() {
    if (!state.activeCase) return { ready: false, reason: 'no-case' };
    const ev = state.evidence[state.activeCase.targetId] || 0;
    if (ev < 60) return { ready: false, reason: 'not-enough-evidence' };
    return { ready: true, caseId: state.activeCase.caseId, evidence: ev, payout: state.activeCase.payout };
  }

  function blackmailReadiness(targetId) {
    const t = targetInfo(targetId);
    if (!t) return { ready: false, reason: 'unknown-target' };
    if (state.burned.includes(targetId)) return { ready: false, reason: 'already-burned' };
    const ev = state.evidence[targetId] || 0;
    if (ev < 50) return { ready: false, reason: 'not-enough-evidence' };
    return { ready: true, targetId, evidence: ev, payout: blackmailPayoutFor(ev) };
  }

  function pendingBlackmailValue() {
    let total = 0;
    let count = 0;
    for (const t of TAIL_TARGETS) {
      const ev = state.evidence[t.id] || 0;
      if (!state.burned.includes(t.id) && ev >= 50) { total += blackmailPayoutFor(ev); count += 1; }
    }
    return { total, targets: count };
  }

  function serialize() {
    return {
      activeCase: state.activeCase ? { ...state.activeCase } : null,
      tailing: { ...state.tailing },
      evidence: { ...state.evidence },
      burned: [...state.burned],
      informantLevel: state.informantLevel,
      exposure: state.exposure,
      casesCompleted: state.casesCompleted,
      casesTaken: state.casesTaken,
      casesExpired: state.casesExpired,
      tailsSucceeded: state.tailsSucceeded,
      tailsFailed: state.tailsFailed,
      photosTaken: state.photosTaken,
      blackmailsPaid: state.blackmailsPaid,
      totalEarned: state.totalEarned,
      totalSpent: state.totalSpent,
      lastTickDay: state.lastTickDay,
    };
  }

  function deserialize(saved) {
    const s = saved || {};
    state.activeCase = s.activeCase && typeof s.activeCase.caseId === 'string' ? { ...s.activeCase } : null;
    state.tailing = {};
    if (s.tailing) for (const k of Object.keys(s.tailing)) {
      const v = Math.floor(Number(s.tailing[k]));
      if (Number.isFinite(v)) state.tailing[k] = Math.max(0, v);
    }
    state.evidence = {};
    if (s.evidence) for (const k of Object.keys(s.evidence)) {
      const v = Math.floor(Number(s.evidence[k]));
      if (Number.isFinite(v)) state.evidence[k] = Math.max(0, Math.min(100, v));
    }
    state.burned = Array.isArray(s.burned) ? s.burned.filter((x) => typeof x === 'string') : [];
    state.informantLevel = Math.max(0, Math.min(3, Math.floor(Number(s.informantLevel) || 0)));
    state.exposure = Math.max(0, Math.floor(Number(s.exposure) || 0));
    state.casesCompleted = Math.floor(Number(s.casesCompleted) || 0);
    state.casesTaken = Math.floor(Number(s.casesTaken) || 0);
    state.casesExpired = Math.floor(Number(s.casesExpired) || 0);
    state.tailsSucceeded = Math.floor(Number(s.tailsSucceeded) || 0);
    state.tailsFailed = Math.floor(Number(s.tailsFailed) || 0);
    state.photosTaken = Math.floor(Number(s.photosTaken) || 0);
    state.blackmailsPaid = Math.floor(Number(s.blackmailsPaid) || 0);
    state.totalEarned = Number(s.totalEarned) || 0;
    state.totalSpent = Number(s.totalSpent) || 0;
    state.lastTickDay = s.lastTickDay === null || s.lastTickDay === undefined ? null : Math.floor(Number(s.lastTickDay));
    return { ok: true, activeCaseId: state.activeCase ? state.activeCase.caseId : null, exposure: state.exposure, casesCompleted: state.casesCompleted };
  }

  return {
    name: 'Detective',
    state,
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
    serialize,
    deserialize,
  };
}
