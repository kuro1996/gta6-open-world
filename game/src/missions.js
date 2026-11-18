// Solara Nights — the story: four missions for Ria Santos, from homecoming to
// payback at the Crown Docks, plus the waypoint beacon that marks each goal.
import * as THREE from 'three';
import { PLACES } from './config.js';
import { distance2D } from './random.js';

export const MISSIONS = [
  {
    id: 'homecoming',
    title: '1 — Homecoming',
    briefing: 'Mara Voss: "Ria. You are back. The Crown took your brother\'s garage — drive to Voss Garage and we will talk."',
    objective: 'Drive to Voss Garage',
    reward: 200,
  },
  {
    id: 'hotwheels',
    title: '2 — Hot Wheels',
    briefing: 'Mara Voss: "The Crown parks a Comet GT on the plaza like they own the city. Take it. Bring it home — and lose the cops first."',
    objective: 'Steal the Comet GT, lose the cops, return to the garage',
    reward: 500,
  },
  {
    id: 'thedrop',
    title: '3 — The Drop',
    briefing: 'Mara Voss: "A package for the marina. The cops are already tailing you — 150 seconds, no excuses."',
    objective: 'Deliver the package to the Marina before time runs out',
    reward: 800,
  },
  {
    id: 'payback',
    title: '4 — Payback at the Docks',
    briefing: 'Mara Voss: "Silas Crown is at the docks with his guards. Finish it, Ria. Then disappear — the whole city will be looking."',
    objective: 'Clear the docks of Crown guards, then escape to the garage',
    reward: 1500,
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
    this._buildBeacon();
  }

  _buildBeacon() {
    const geo = new THREE.CylinderGeometry(3.2, 3.2, 60, 16, 1, true);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffd23d, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false,
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

  start(index) {
    this.index = index;
    this.stage = 'briefing';
    const m = this.current;
    this.message = m ? m.briefing : '';
    this.objective = m ? m.objective : '';
    this.timer = 0;
    this.timeLeft = 0;
    return m;
  }

  begin() {
    this.stage = 'active';
    const m = this.current;
    if (!m) return;
    if (m.id === 'homecoming') this.setWaypoint(PLACES.garage.x, PLACES.garage.z - 14);
    else if (m.id === 'hotwheels') this.setWaypoint(PLACES.plaza.x + 4, PLACES.plaza.z - 7);
    else if (m.id === 'thedrop') {
      this.setWaypoint(PLACES.marina.x, PLACES.marina.z - 8);
      this.timeLeft = 150;
    } else if (m.id === 'payback') this.setWaypoint(PLACES.docks.x, PLACES.docks.z - 6);
  }

  complete() {
    const m = this.current;
    this.stage = 'done';
    this.clearWaypoint();
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
    return distance2D(x, z, this.waypoint.x, this.waypoint.z) < (radius || 9);
  }

  update(dt) {
    if (this.diamond.visible) {
      this.diamond.rotation.y += dt * 2;
      this.diamond.position.y = 10 + Math.sin(performance.now() * 0.003) * 1.2;
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
