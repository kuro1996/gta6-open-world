// Solara Nights — the story: four missions for Ria Santos, from homecoming to
// payback at the Crown Docks, plus the waypoint beacon that marks each goal.
// Round 4 attempt 3 adds two things on top of the story: a par-time speed
// bonus for EVERY mission (not just The Drop), and side-job chains — Mara's
// work now comes in runs of three, and finishing a whole chain pays a bonus.
import * as THREE from 'three';
import { PLACES, WORLD } from './config.js';
import { distance2D } from './random.js';

export const MISSIONS = [  {
    id: 'homecoming',
    title: '1 — Homecoming',
    briefing: 'Mara Voss: "Ria. You are back. The Crown took your brother\'s garage — drive to Voss Garage and we will talk."',
    objective: 'Drive to Voss Garage',
    reward: 200,
    par: 120, // seconds: a brisk drive from the start to the garage
  },
  {
    id: 'hotwheels',
    title: '2 — Hot Wheels',
    briefing: 'Mara Voss: "The Crown parks a Comet GT on the plaza like they own the city. Take it. Bring it home — and lose the cops first."',
    objective: 'Steal the Comet GT, lose the cops, return to the garage',
    reward: 500,
    par: 240,
  },
  {
    id: 'thedrop',
    title: '3 — The Drop',
    briefing: 'Mara Voss: "A package for the marina. The cops are already tailing you — 150 seconds, no excuses."',
    objective: 'Deliver the package to the Marina before time runs out',
    reward: 800,
    par: 180,
  },
  {
    id: 'payback',
    title: '4 — Payback at the Docks',
    briefing: 'Mara Voss: "Silas Crown is at the docks with his guards. Finish it, Ria. Then disappear — the whole city will be looking."',
    objective: 'Clear the docks of Crown guards, then escape to the garage',
    reward: 1500,
    par: 300,
  },
];

// Par-time speed bonus, attempt 3: every mission pays for a fast finish,
// not just The Drop. Beating par by the margin pays the big bonus;
// finishing under par at all pays the small one. The Drop keeps its own
// $200 timer bonus on top when the package lands with 30+ s to spare.
export function parBonusFor(mission, elapsedSeconds) {
  if (!mission || typeof elapsedSeconds !== 'number') return 0;
  const under = mission.par - elapsedSeconds;
  if (under >= WORLD.parBonusMargin) return WORLD.parBonusBig;
  if (under > 0) return WORLD.parBonusSmall;
  return 0;
}

export class MissionManager {
  constructor(scene, audio) {
    this.scene = scene;
    this.audio = audio;
    this.index = 0;
    this.stage = 'briefing'; // briefing | active | done
    this.timer = 0;
    this.timeLeft = 0;
    this.message = '';
    this.objective = '';
    this.waypoint = null;
    this.beacon = null;
    this.diamond = null;
    this.onMissionComplete = null;
    this.onStoryComplete = null;
    // Attempts per mission id: a retry after a fail or a timeout shows
    // "Attempt 2" in the banner, so the player can feel the grind.
    this.attempts = {};
    // Attempt 3 — par clock: seconds since begin() on the current attempt.
    // The HUD reads it through missionElapsed(); complete() turns it into
    // the speed bonus. Best times are kept per mission for the end screen.
    this.elapsed = 0;
    this.bestTimes = {};
    this._buildBeacon();
  }

  _buildBeacon() {
    const geo = new THREE.CylinderGeometry(2.6, 2.6, 60, 16, 1, true);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffd23d, transparent: true, opacity: 0.15, side: THREE.DoubleSide, depthWrite: false,
    });
    this.beacon = new THREE.Mesh(geo, mat);
    this.beacon.visible = false;
    this.scene.add(this.beacon);
    const diaGeo = new THREE.OctahedronGeometry(1.1, 0);
    const diaMat = new THREE.MeshBasicMaterial({ color: 0xffd23d });
    this.diamond = new THREE.Mesh(diaGeo, diaMat);
    this.diamond.visible = false;
    this.scene.add(this.diamond);
  }

  setWaypoint(x, z) {
    this.waypoint = { x, z };
    this.beacon.position.set(x, 30, z);
    this.beacon.visible = true;
    this.diamond.position.set(x, 10, z);
    this.diamond.visible = true;
  }

  clearWaypoint() {
    this.waypoint = null;
    this.beacon.visible = false;
    this.diamond.visible = false;
  }

  get current() {
    return MISSIONS[this.index] || null;
  }

  get done() {
    return this.index >= MISSIONS.length;
  }

  /** Seconds spent on the current attempt (0 before begin()). */
  missionElapsed() {
    return this.elapsed;
  }

  /** Best (fastest) finish per mission id, in seconds, or null. */
  bestTimeFor(id) {
    const t = this.bestTimes[id];
    return typeof t === 'number' ? t : null;
  }

  /** Attempts spent on this mission id (1 on the first try). */
  attemptsFor(id) {
    return this.attempts[id] || 0;
  }

  start(index) {
    this.index = index;
    this.stage = 'briefing';
    const m = this.current;
    this.message = m ? m.briefing : '';
    this.objective = m ? m.objective : '';
    this.timer = 0;
    this.timeLeft = 0;
    this.elapsed = 0;
    if (m) this.attempts[m.id] = (this.attempts[m.id] || 0) + 1;
    return m;
  }

  begin() {
    this.stage = 'active';
    this.elapsed = 0;
    const m = this.current;
    if (!m) return;
    if (m.id === 'homecoming') this.setWaypoint(PLACES.garage.x, PLACES.garage.z - 14);
    else if (m.id === 'hotwheels') this.setWaypoint(PLACES.plaza.x + 11, PLACES.plaza.z - 17);
    else if (m.id === 'thedrop') {
      this.setWaypoint(PLACES.marina.x, PLACES.marina.z - 8);
      // The deadline is a fresh roll every run — 120, 150 or 180 seconds —
      // so the same delivery never plays the same twice.
      this.timeLeft = [120, 150, 180][Math.floor(Math.random() * 3)];
    } else if (m.id === 'payback') this.setWaypoint(PLACES.docks.x, PLACES.docks.z - 6);
  }

  complete() {
    const m = this.current;
    this.stage = 'done';
    this.clearWaypoint();
    // Speed bonus, attempt 3: the par clock decides. The Drop keeps its
    // own $200 timer bonus on top when the package lands with more than
    // 30 seconds to spare — the two bonuses stack, so a perfect Drop pays
    // $800 + $200 + $200.
    if (m) {
      const dropBonus = m.id === 'thedrop' && this.timeLeft > 30 ? 200 : 0;
      m.bonus = dropBonus + parBonusFor(m, this.elapsed);
      const prevBest = this.bestTimes[m.id];
      if (prevBest === undefined || this.elapsed < prevBest) this.bestTimes[m.id] = Math.round(this.elapsed * 10) / 10;
    }
    // Clear the briefing text: until the next mission starts, the HUD would
    // otherwise show the next mission's title above the old briefing.
    this.message = '';
    if (this.audio) this.audio.jingle();
    if (m && this.onMissionComplete) this.onMissionComplete(m);
    this.index += 1;
    if (this.index >= MISSIONS.length) {
      if (this.onStoryComplete) this.onStoryComplete();
      return true;
    }
    return false;
  }

  waypointDistance(x, z) {
    if (!this.waypoint) return null;
    return distance2D(x, z, this.waypoint.x, this.waypoint.z);
  }

  atWaypoint(x, z, radius) {
    if (!this.waypoint) return false;
    // ??, not ||: a radius of 0 is an exact-position check, not the default.
    return distance2D(x, z, this.waypoint.x, this.waypoint.z) < (radius ?? 9);
  }

  update(dt) {
    if (this.diamond.visible) {
      this.diamond.rotation.y += dt * 2;
      this.diamond.position.y = 10 + Math.sin(performance.now() * 0.003) * 1.2;
    }
    // The beacon breathes so the waypoint reads at a glance, even in the
    // middle of a chase at night.
    if (this.beacon.visible) {
      this.beacon.material.opacity = 0.12 + Math.sin(performance.now() * 0.004) * 0.06;
    }
    // The par clock only runs while the mission is active, so a pause on
    // the title screen or a retry does not charge the player for it.
    if (this.stage === 'active') this.elapsed += dt;
    if (this.stage === 'active' && this.current && this.current.id === 'thedrop') {
      this.timeLeft -= dt;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        return 'timeout';
      }
    }
    return null;
  }
}

// --- Side jobs (round 4 attempt 2, chains in attempt 3) ---------------------
// Optional paid work between story missions: Mara Voss always has a fare,
// a parcel or a stunt to pay for. A job is offered when the player is free
// (no story mission active), accepted with Q, and pays cash on arrival.
// Jobs never block the story — starting a story mission cancels the job.
//
// Attempt 3 — chains: the six jobs form two runs of three. "Mara's
// Errands" is the day run (taxi → courier → stunt); "Night Shift" is the
// late run (night courier → VIP taxi → beach drift). Jobs are offered in
// chain order, so the player always knows what comes next, and finishing
// a whole chain pays a $500 bonus on top of the three job rewards. A
// streak of jobs finished without a cancellation adds $25 per job in the
// streak, so steady work pays better than cherry-picking.
export const SIDE_JOB_CHAINS = [
  { id: 'errands', title: "Mara's Errands", jobs: ['taxi', 'courier', 'stunt'] },
  { id: 'nightshift', title: 'Night Shift', jobs: ['nightcourier', 'viptaxi', 'beachdrift'] },
];

export const SIDE_JOBS = [
  {
    id: 'taxi',
    chain: 'errands',
    title: 'Side Job — Taxi Fare',
    text: 'Mara: "A tourist at the beach needs a lift to the hospital. $150, no questions."',
    target: { x: 262, z: 0, name: 'Solara Beach' },
    dest: { x: 203.5, z: -203.5, name: 'Solara General' },
    reward: 150,
    needsCar: true,
  },
  {
    id: 'courier',
    chain: 'errands',
    title: 'Side Job — Courier Run',
    text: 'Mara: "A parcel for the marina, quick and quiet. $250 if it gets there in one piece."',
    target: { x: 0, z: 262, name: 'Marina' },
    dest: { x: -120, z: 262, name: 'Crown Docks' },
    reward: 250,
    needsCar: false,
  },
  {
    id: 'stunt',
    chain: 'errands',
    title: 'Side Job — Stunt Jump',
    text: 'Mara: "The crew bets you can\'t clear the plaza fountain at speed. $400 says you can."',
    target: { x: 29, z: 29, name: 'Solara Plaza' },
    dest: { x: 29, z: 29, name: 'Solara Plaza' },
    reward: 400,
    needsCar: true,
    stunt: true, // complete by crossing the plaza faster than 25 m/s
  },
  {
    id: 'nightcourier',
    chain: 'nightshift',
    title: 'Side Job — Night Courier',
    text: 'Mara: "A sealed envelope for the docks, after dark. $250, and don\'t stop for anyone."',
    target: { x: 29, z: 29, name: 'Solara Plaza' },
    dest: { x: -120, z: 262, name: 'Crown Docks' },
    reward: 250,
    needsCar: false,
  },
  {
    id: 'viptaxi',
    chain: 'nightshift',
    title: 'Side Job — VIP Taxi',
    text: 'Mara: "A Crown defector at the marina wants a quiet ride to the garage. $300, and keep it smooth."',
    target: { x: 0, z: 262, name: 'Marina' },
    dest: { x: -203.5, z: 203.5, name: 'Voss Garage' },
    reward: 300,
    needsCar: true,
  },
  {
    id: 'beachdrift',
    chain: 'nightshift',
    title: 'Side Job — Beach Drift',
    text: 'Mara: "The crew wants a show on the sand: slide the beach road sideways, over 25 m/s. $400."',
    target: { x: 262, z: 0, name: 'Solara Beach' },
    dest: { x: 262, z: 0, name: 'Solara Beach' },
    reward: 400,
    needsCar: true,
    stunt: true, // complete by crossing the beach faster than 25 m/s
  },
];

export class SideJobs {
  constructor(scene, audio) {
    this.scene = scene;
    this.audio = audio;
    this.offered = null; // job on offer (player may accept with Q)
    this.active = null; // accepted job, with its own waypoint
    this.stage = 'pickup'; // pickup | deliver (stunt jobs skip to 'stunt')
    this.done = {}; // id -> times completed
    this.offerTimer = 20; // first offer appears 20 s into free play
    // Attempt 3 — chain progress: chain id -> how many of its jobs are
    // done in the current run (0..3). A chain completes at 3 and resets
    // so it can be run again; the bonus is paid once per completion.
    this.chainProgress = {};
    // Attempt 3 — streak: jobs finished in a row without a cancellation.
    // Cancelling (a story mission starting, or a manual cancel) resets it.
    this.streak = 0;
    this.lastChainBonus = 0; // bonus paid by the most recent finish (0 if none)
  }

  /** Next job in chain order: the first un-done job of the chain the
   * player is furthest along, so offers always advance a chain instead
   * of jumping around the list at random. */
  offer() {
    for (const chain of SIDE_JOB_CHAINS) {
      const done = this.chainProgress[chain.id] || 0;
      if (done < chain.jobs.length) {
        const nextId = chain.jobs[done];
        this.offered = SIDE_JOBS.find((j) => j.id === nextId) || null;
        // Second pass: the offer carries its chain position, so the HUD
        // prompt can say "Mara's Errands 2/3" instead of just a job name.
        if (this.offered) this.offered.chainNote = `${chain.title} ${done + 1}/${chain.jobs.length}`;
        return this.offered;
      }
    }
    // Both chains are mid-run-complete only when every job is done once
    // this cycle — but chains reset on completion, so this is a fallback
    // for a save that predates chains: offer the first job again.
    this.offered = SIDE_JOBS[0];
    return this.offered;
  }

  accept() {
    if (!this.offered) return null;
    this.active = this.offered;
    this.offered = null;
    this.stage = this.active.stunt ? 'stunt' : 'pickup';
    if (this.audio) this.audio.pickup();
    return this.active;
  }

  cancel() {
    // A story mission starting cancels the job AND breaks the streak:
    // the player chose the story over the fare, and the chain keeps its
    // progress (only the streak resets) so the work is not lost.
    this.active = null;
    this.offered = null;
    this.streak = 0;
    this.offerTimer = 30;
  }

  /** Called every frame while playing: counts down to the next offer. */
  update(dt, free) {
    if (this.active || this.offered) return;
    if (!free) {
      this.offerTimer = 20;
      return;
    }
    this.offerTimer -= dt;
    if (this.offerTimer <= 0) this.offer();
  }

  /** Returns the completed job (or null) when the player reaches a target. */
  checkArrival(x, z, speed) {
    if (!this.active) return null;
    if (this.active.stunt) {
      const d = distance2D(x, z, this.active.target.x, this.active.target.z);
      if (d < 12 && Math.abs(speed || 0) > 25) return this._finish();
      return null;
    }
    const target = this.stage === 'pickup' ? this.active.target : this.active.dest;
    if (distance2D(x, z, target.x, target.z) < 10) {
      if (this.stage === 'pickup') {
        this.stage = 'deliver';
        if (this.audio) this.audio.pickup();
        return 'picked';
      }
      return this._finish();
    }
    return null;
  }

  _finish() {
    const job = this.active;
    this.done[job.id] = (this.done[job.id] || 0) + 1;
    this.active = null;
    this.offerTimer = 45; // a breather before the next offer
    // Streak bonus: every job in an unbroken streak adds $25, so the
    // third job of a run pays $50 extra on top of its reward.
    this.streak += 1;
    const streakBonus = (this.streak - 1) * WORLD.sideStreakBonus;
    job.streakBonus = streakBonus;
    // Chain progress: finishing this job advances its chain. At 3/3 the
    // chain pays the $500 bonus and resets, ready to run again.
    this.lastChainBonus = 0;
    if (job.chain) {
      const chain = SIDE_JOB_CHAINS.find((c) => c.id === job.chain);
      const next = (this.chainProgress[job.chain] || 0) + 1;
      if (chain && next >= chain.jobs.length) {
        this.chainProgress[job.chain] = 0;
        this.lastChainBonus = WORLD.sideChainBonus;
        job.chainBonus = WORLD.sideChainBonus;
        job.chainComplete = chain.title;
      } else {
        this.chainProgress[job.chain] = next;
      }
    }
    if (this.audio) this.audio.jingle();
    return job;
  }

  /** Chain status for the HUD and the debug handle: the chain the player
   * is furthest along, how far, and what the completion bonus pays. */
  chainStatus() {
    let best = null;
    for (const chain of SIDE_JOB_CHAINS) {
      const done = this.chainProgress[chain.id] || 0;
      if (!best || done > best.done) best = { chain: chain.id, title: chain.title, done, total: chain.jobs.length, bonus: WORLD.sideChainBonus };
    }
    return best;
  }

  /** Current waypoint for the HUD beacon/minimap (pickup, then delivery). */
  get waypoint() {
    if (!this.active) return null;
    if (this.active.stunt) return this.active.target;
    return this.stage === 'pickup' ? this.active.target : this.active.dest;
  }

  /** One-line objective for the HUD while a job is running. */
  get objective() {
    if (!this.active) return '';
    if (this.active.stunt) return `Stunt: cross ${this.active.target.name} faster than 25 m/s — $${this.active.reward}`;
    const where = this.stage === 'pickup' ? this.active.target.name : this.active.dest.name;
    const verb = this.stage === 'pickup' ? 'Pick up at' : 'Deliver to';
    return `${verb} ${where} — $${this.active.reward}`;
  }
}
