// Solara Nights — the story: four missions for Ria Santos, from homecoming to
// payback at the Crown Docks, plus the waypoint beacon that marks each goal.
import * as THREE from 'three';
import { PLACES } from './config.js';
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
    if (m) this.attempts[m.id] = (this.attempts[m.id] || 0) + 1;
    return m;
  }

  begin() {
    this.stage = 'active';
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
    // Speed bonus: The Drop pays $200 extra when the package lands with
    // more than 30 seconds to spare.
    if (m) m.bonus = m.id === 'thedrop' && this.timeLeft > 30 ? 200 : 0;
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

// --- Side jobs (round 4 attempt 2) -----------------------------------------
// Optional paid work between story missions: Mara Voss always has a fare,
// a parcel or a stunt to pay for. A job is offered when the player is free
// (no story mission active), accepted with Q, and pays cash on arrival.
// Jobs never block the story — starting a story mission cancels the job.
export const SIDE_JOBS = [
  {
    id: 'taxi',
    title: 'Side Job — Taxi Fare',
    text: 'Mara: "A tourist at the beach needs a lift to the hospital. $150, no questions."',
    target: { x: 262, z: 0, name: 'Solara Beach' },
    dest: { x: 203.5, z: -203.5, name: 'Solara General' },
    reward: 150,
    needsCar: true,
  },
  {
    id: 'courier',
    title: 'Side Job — Courier Run',
    text: 'Mara: "A parcel for the marina, quick and quiet. $250 if it gets there in one piece."',
    target: { x: 0, z: 262, name: 'Marina' },
    dest: { x: -120, z: 262, name: 'Crown Docks' },
    reward: 250,
    needsCar: false,
  },
  {
    id: 'stunt',
    title: 'Side Job — Stunt Jump',
    text: 'Mara: "The crew bets you can\'t clear the plaza fountain at speed. $400 says you can."',
    target: { x: 29, z: 29, name: 'Solara Plaza' },
    dest: { x: 29, z: 29, name: 'Solara Plaza' },
    reward: 400,
    needsCar: true,
    stunt: true, // complete by crossing the plaza faster than 25 m/s
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
  }

  /** Offer the next job the player has not done yet, rotating the list. */
  offer() {
    const remaining = SIDE_JOBS.filter((j) => !this.done[j.id]);
    const pool = remaining.length ? remaining : SIDE_JOBS;
    this.offered = pool[Math.floor(Math.random() * pool.length)];
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
    this.active = null;
    this.offered = null;
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
    if (this.audio) this.audio.jingle();
    return job;
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
