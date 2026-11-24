import * as THREE from '../vendor/three/three.module.min.js';

export const MISSIONS = [
  { id: 'homecoming', title: 'Homecoming', briefing: 'Ria is back in Solara. Mara is waiting at the harbor.', objective: 'Meet Mara at the Harbor', reward: 200, par: 120 },
  { id: 'hotwheels', title: 'Hot Wheels', briefing: 'Steal the Comet GT and bring it to the garage.', objective: 'Steal the Comet GT', reward: 500, par: 240 },
  { id: 'thedrop', title: 'The Drop', briefing: 'A package needs to reach the docks before the clock runs out.', objective: 'Deliver the package to the Crown Docks', reward: 800, par: 180 },
  { id: 'payback', title: 'Payback', briefing: 'The Crown Syndicate took everything. Take it back.', objective: 'Confront the Syndicate at the Crown Docks', reward: 1500, par: 300 },
];

export const SIDE_JOB_CHAINS = [
  { id: 'mara-errands', title: "Mara's Errands", jobs: ['taxi', 'courier', 'stunt'] },
  { id: 'night-shift', title: 'Night Shift', jobs: ['nightcourier', 'viptaxi', 'beachdrift'] },
];

export const SIDE_JOBS = [
  { id: 'taxi', chain: 'mara-errands', title: 'Cab Run', text: 'Drive a fare across town.', target: { x: 0, z: 0, name: 'Plaza' }, dest: { x: 45, z: -60, name: 'Grand Hotel' }, reward: 150, needsCar: true },
  { id: 'courier', chain: 'mara-errands', title: 'Courier Run', text: 'Pick up a parcel and drop it off.', target: { x: -70, z: 30, name: 'Solara Mall' }, dest: { x: 80, z: 90, name: 'Neon Bar' }, reward: 250, needsCar: false },
  { id: 'stunt', chain: 'mara-errands', title: 'Stunt Pass', text: 'Blast through the plaza at speed.', target: { x: 0, z: 0, name: 'Plaza' }, dest: { x: 0, z: 0, name: 'Plaza' }, reward: 400, needsCar: true, stunt: true },
  { id: 'nightcourier', chain: 'night-shift', title: 'Night Courier', text: 'A quiet delivery after dark.', target: { x: 110, z: -30, name: 'Hospital' }, dest: { x: -40, z: -120, name: 'Train Station' }, reward: 250, needsCar: false },
  { id: 'viptaxi', chain: 'night-shift', title: 'VIP Taxi', text: 'A VIP needs a smooth ride.', target: { x: 45, z: -60, name: 'Grand Hotel' }, dest: { x: 180, z: 150, name: 'Beach' }, reward: 300, needsCar: true },
  { id: 'beachdrift', chain: 'night-shift', title: 'Beach Drift', text: 'Slide through the beachfront at speed.', target: { x: 180, z: 150, name: 'Beach' }, dest: { x: 180, z: 150, name: 'Beach' }, reward: 400, needsCar: true, stunt: true },
];

const PAR_MARGIN = 20;
const PAR_BIG = 200;
const PAR_SMALL = 100;
const CHAIN_BONUS = 500;

export function parBonusFor(mission, elapsed) {
  if (!mission || typeof elapsed !== 'number') return 0;
  const under = mission.par - elapsed;
  if (under >= PAR_MARGIN) return PAR_BIG;
  if (under > 0) return PAR_SMALL;
  return 0;
}

function dist2(x1, z1, x2, z2) {
  return Math.hypot(x2 - x1, z2 - z1);
}

function meshObj(kind, color) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 0.4 }),
  );
  mesh.visible = false;
  mesh.userData.kind = kind;
  mesh.kind = kind;
  return mesh;
}

const WAYPOINTS = {
  homecoming: { x: -140, z: 120 },
  hotwheels: { x: 55, z: -40 },
  thedrop: { x: -185, z: 195 },
  payback: { x: -185, z: 195 },
};

export class MissionManager {
  constructor(scene, audio) {
    this.scene = scene || null;
    this.audio = audio || null;
    this.index = 0;
    this.stage = 'briefing';
    this.timer = 0;
    this.timeLeft = 0;
    this.message = '';
    this.objective = '';
    this.waypoint = null;
    this.beacon = meshObj('beacon', 0xffd24a);
    this.beacon.scale.x = 2;
    this.beacon.scale.z = 2;
    this.beacon.scale.y = 12;
    this.diamond = meshObj('diamond', 0xffd24a);
    this.diamond.scale.x = 1;
    this.diamond.scale.y = 1;
    this.diamond.scale.z = 1;
    if (this.scene && typeof this.scene.add === 'function') {
      this.scene.add(this.beacon);
      this.scene.add(this.diamond);
    }
    this.onMissionComplete = null;
    this.onStoryComplete = null;
    this.attempts = {};
    this.elapsed = 0;
    this.bestTimes = {};
    this.spin = 0;
  }

  setWaypoint(x, z) {
    this.waypoint = { x, z };
    this.beacon.visible = true;
    this.beacon.position.x = x;
    this.beacon.position.z = z;
    this.diamond.visible = true;
    this.diamond.position.x = x;
    this.diamond.position.y = 3;
    this.diamond.position.z = z;
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

  missionElapsed() {
    return this.elapsed;
  }

  bestTimeFor(id) {
    return this.bestTimes[id] ?? null;
  }

  attemptsFor(id) {
    return this.attempts[id] || 0;
  }

  start(idx) {
    const i = idx ?? this.index;
    this.index = i;
    const m = MISSIONS[i];
    if (!m) return null;
    this.stage = 'briefing';
    this.message = m.briefing;
    this.objective = m.objective;
    this.timer = 0;
    this.timeLeft = 0;
    this.elapsed = 0;
    this.attempts[m.id] = (this.attempts[m.id] || 0) + 1;
    this.clearWaypoint();
    return m;
  }

  begin() {
    const m = this.current;
    if (!m) return null;
    this.stage = 'active';
    this.elapsed = 0;
    if (m.id === 'thedrop') {
      const roll = Math.random();
      this.timeLeft = roll < 0.33 ? 120 : (roll < 0.66 ? 150 : 180);
    }
    const wp = WAYPOINTS[m.id];
    if (wp) this.setWaypoint(wp.x, wp.z);
    return m;
  }

  complete() {
    const m = this.current;
    if (!m) return false;
    this.stage = 'done';
    this.clearWaypoint();
    let bonus = parBonusFor(m, this.elapsed);
    if (m.id === 'thedrop' && this.timeLeft > 30) bonus += 200;
    m.bonus = bonus;
    if (this.bestTimes[m.id] == null || this.elapsed < this.bestTimes[m.id]) {
      this.bestTimes[m.id] = this.elapsed;
    }
    this.message = '';
    if (this.audio && typeof this.audio.jingle === 'function') this.audio.jingle();
    if (typeof this.onMissionComplete === 'function') this.onMissionComplete(m, bonus);
    this.index += 1;
    if (this.index >= MISSIONS.length) {
      if (typeof this.onStoryComplete === 'function') this.onStoryComplete();
      return true;
    }
    return false;
  }

  waypointDistance(px, pz) {
    if (!this.waypoint) return null;
    return dist2(px, pz, this.waypoint.x, this.waypoint.z);
  }

  atWaypoint(px, pz, radius = 9) {
    if (!this.waypoint) return false;
    if (radius === 0) return px === this.waypoint.x && pz === this.waypoint.z;
    return dist2(px, pz, this.waypoint.x, this.waypoint.z) <= radius;
  }

  update(dt) {
    const step = Number(dt) || 0;
    this.spin += step;
    if (this.diamond.visible) {
      this.diamond.rotation.y = this.spin * 1.5;
      this.diamond.position.y = 3 + Math.sin(this.spin * 2) * 0.4;
    }
    if (this.beacon.visible) {
      this.beacon.material.opacity = 0.25 + Math.sin(this.spin * 2) * 0.15;
    }
    if (this.stage !== 'active') return null;
    this.elapsed += step;
    const m = this.current;
    if (m && m.id === 'thedrop') {
      this.timeLeft -= step;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        return 'timeout';
      }
    }
    return null;
  }
}

export class SideJobs {
  constructor(scene, audio) {
    this.scene = scene || null;
    this.audio = audio || null;
    this.offered = null;
    this.active = null;
    this.stage = 'pickup';
    this.done = {};
    this.offerTimer = 20;
    this.chainProgress = {};
    this.streak = 0;
    this.lastChainBonus = 0;
  }

  offer() {
    let pick = null;
    let bestChain = null;
    let bestDone = -1;
    for (const chain of SIDE_JOB_CHAINS) {
      const doneCount = chain.jobs.filter((id) => this.done[id]).length;
      if (doneCount > bestDone && doneCount < chain.jobs.length) {
        bestDone = doneCount;
        bestChain = chain;
      }
    }
    if (bestChain) {
      const nextId = bestChain.jobs.find((id) => !this.done[id]);
      pick = SIDE_JOBS.find((j) => j.id === nextId);
      if (pick) {
        const pos = bestChain.jobs.indexOf(nextId) + 1;
        pick = { ...pick, chainNote: `${bestChain.title} ${pos}/${bestChain.jobs.length}` };
      }
    }
    if (!pick) pick = { ...SIDE_JOBS[0] };
    this.offered = pick;
    return pick;
  }

  accept() {
    if (!this.offered) return null;
    this.active = this.offered;
    this.offered = null;
    this.stage = this.active.stunt ? 'stunt' : 'pickup';
    if (this.audio && typeof this.audio.pickup === 'function') this.audio.pickup();
    return this.active;
  }

  cancel() {
    this.offered = null;
    this.active = null;
    this.streak = 0;
    this.offerTimer = 30;
    this.stage = 'pickup';
  }

  update(dt, free) {
    const step = Number(dt) || 0;
    if (this.offered || this.active) return;
    if (!free) {
      this.offerTimer = 20;
      return;
    }
    this.offerTimer -= step;
    if (this.offerTimer <= 0) {
      this.offer();
      this.offerTimer = 20;
    }
  }

  checkArrival(px, pz, speed) {
    const job = this.active;
    if (!job) return null;
    if (job.stunt) {
      const d = dist2(px, pz, job.target.x, job.target.z);
      if (d <= 12 && (speed || 0) > 25) {
        return this.finish(job);
      }
      return null;
    }
    if (this.stage === 'pickup') {
      const d = dist2(px, pz, job.target.x, job.target.z);
      if (d <= 9) {
        this.stage = 'deliver';
        return 'picked';
      }
      return null;
    }
    const d = dist2(px, pz, job.dest.x, job.dest.z);
    if (d <= 9) return this.finish(job);
    return null;
  }

  finish(job) {
    this.done[job.id] = true;
    this.active = null;
    this.stage = 'pickup';
    this.offerTimer = 45;
    this.streak += 1;
    let payout = job.reward;
    if (this.streak > 1) payout += 25 * (this.streak - 1);
    const chain = SIDE_JOB_CHAINS.find((ch) => ch.id === job.chain);
    let chainBonus = 0;
    if (chain) {
      this.chainProgress[chain.id] = (this.chainProgress[chain.id] || 0) + 1;
      if (this.chainProgress[chain.id] >= 3) {
        chainBonus = CHAIN_BONUS;
        payout += chainBonus;
        this.lastChainBonus = chainBonus;
        this.chainProgress[chain.id] = 0;
        for (const id of chain.jobs) delete this.done[id];
      }
    }
    job.payout = payout;
    if (this.audio && typeof this.audio.jingle === 'function') this.audio.jingle();
    return { ...job, payout, chainBonus };
  }

  chainStatus() {
    let best = null;
    let bestDone = -1;
    for (const chain of SIDE_JOB_CHAINS) {
      const doneCount = chain.jobs.filter((id) => this.done[id]).length;
      if (doneCount > bestDone) {
        bestDone = doneCount;
        best = chain;
      }
    }
    if (!best) return null;
    return { id: best.id, title: best.title, done: bestDone, total: best.jobs.length, bonus: CHAIN_BONUS };
  }

  get waypoint() {
    const job = this.active;
    if (!job) return null;
    if (job.stunt) return job.target;
    return this.stage === 'pickup' ? job.target : job.dest;
  }

  get objective() {
    const job = this.active;
    if (!job) return '';
    const where = this.stage === 'pickup' ? job.target.name : job.dest.name;
    return `${job.title}: ${where} — $${job.reward}`;
  }
}
