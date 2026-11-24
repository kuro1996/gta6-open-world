import * as THREE from '../vendor/three/three.module.min.js';
import { WORLD, PITCH, GRID_K, CITY_HALF } from './config.js';
import { clamp, distance2D } from './random.js';

const SHIRTS = [0xd03030, 0x3060d0, 0xe0c020, 0x30b060, 0x9030b0, 0xe0e0e0, 0xd07020, 0x40c0c0];
const PANTS = [0x222831, 0x3a2a1a, 0x2a3a5a, 0x555555];
const SKINS = [0xc98d64, 0x8a5a3a, 0xe8b890];

function skinTone(rng) {
  return SKINS[Math.floor(rng.next() * SKINS.length)];
}

export class PedestrianSystem {
  constructor(scene, rng, city) {
    this.scene = scene;
    this.rng = rng;
    this.city = city;
    this.peds = [];
    this.nightWalkers = [];
    for (let i = 0; i < WORLD.pedCount; i++) {
      const ped = this._buildPed(false);
      this.peds.push(ped);
      scene.add(ped.group);
    }
  }

  _buildPed(isNight) {
    const group = new THREE.Group();
    const shirt = new THREE.MeshStandardMaterial({ color: SHIRTS[Math.floor(this.rng.next() * SHIRTS.length)] });
    const pants = new THREE.MeshStandardMaterial({ color: PANTS[Math.floor(this.rng.next() * PANTS.length)] });
    const skin = new THREE.MeshStandardMaterial({ color: skinTone(this.rng) });
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.3, 0.7, 8), shirt);
    torso.position.y = 0.95;
    group.add(torso);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), skin);
    head.position.y = 1.5;
    group.add(head);
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.55, 0.13), pants);
    legL.position.set(-0.11, 0.28, 0);
    group.add(legL);
    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.55, 0.13), pants);
    legR.position.set(0.11, 0.28, 0);
    group.add(legR);
    const ped = {
      group,
      legL,
      legR,
      x: 0,
      z: 0,
      heading: this.rng.next() * Math.PI * 2,
      speed: isNight ? 0.9 + this.rng.next() * 0.5 : 1.2 + this.rng.next() * 1.0,
      walkPhase: this.rng.next() * Math.PI * 2,
      fleeTimer: 0,
      fleeX: 0,
      fleeZ: 0,
      pauseTimer: 0,
      nextPause: 8 + this.rng.next() * 16,
      rainFactor: 0,
      dodgeTimer: 0,
      dodgeDir: 1,
      axis: 'x',
      line: 0,
      direction: 1,
      isNight: !!isNight,
    };
    this._placeOnSidewalk(ped);
    group.position.set(ped.x, 0, ped.z);
    group.rotation.y = ped.heading;
    return ped;
  }

  _placeOnSidewalk(ped) {
    const axis = this.rng.next() < 0.5 ? 'x' : 'z';
    const block = Math.floor(this.rng.next() * (GRID_K * 2 + 1)) - GRID_K;
    const edge = (this.rng.next() < 0.5 ? -1 : 1) * (PITCH / 2 + 2.5);
    const along = (this.rng.next() * 2 - 1) * CITY_HALF;
    ped.axis = axis;
    ped.line = block * PITCH + edge;
    ped.direction = this.rng.next() < 0.5 ? -1 : 1;
    if (axis === 'x') {
      ped.z = ped.line;
      ped.x = along;
      ped.heading = ped.direction > 0 ? Math.PI / 2 : -Math.PI / 2;
    } else {
      ped.x = ped.line;
      ped.z = along;
      ped.heading = ped.direction > 0 ? 0 : Math.PI;
    }
  }

  addNightWalker(x, z) {
    if (this.nightWalkers.length >= 6) return null;
    const ped = this._buildPed(true);
    ped.x = x;
    ped.z = z;
    ped.heading = this.rng.next() * Math.PI * 2;
    ped.speed = 0.9 + this.rng.next() * 0.5;
    ped.nextPause = Infinity;
    ped.isNight = true;
    ped.group.position.set(x, 0, z);
    this.peds.push(ped);
    this.nightWalkers.push(ped);
    this.scene.add(ped.group);
    return ped;
  }

  get nightWalkerCount() {
    return this.nightWalkers.length;
  }

  clearNightWalkers() {
    for (const ped of this.nightWalkers) {
      const idx = this.peds.indexOf(ped);
      if (idx >= 0) this.peds.splice(idx, 1);
      this.scene.remove(ped.group);
    }
    this.nightWalkers = [];
  }

  scare(x, z, radius) {
    for (const ped of this.peds) {
      if (distance2D(ped.x, ped.z, x, z) <= radius) {
        ped.fleeTimer = 4;
        ped.fleeX = x;
        ped.fleeZ = z;
      }
    }
  }

  update(dt, hazards, rainFactor) {
    const rain = rainFactor || 0;
    const hurry = 1 + rain * (WORLD.rainPedHurry - 1);
    const hazardList = Array.isArray(hazards)
      ? hazards
      : [
          ...(hazards && hazards.car ? [hazards.car] : []),
          ...((hazards && hazards.traffic) || []),
          ...((hazards && hazards.police) || []),
        ];
    for (const ped of this.peds) {
      ped.rainFactor = rain;
      let vx = 0;
      let vz = 0;
      if (ped.fleeTimer > 0) {
        ped.fleeTimer -= dt;
        const away = Math.atan2(ped.x - ped.fleeX, ped.z - ped.fleeZ);
        const sp = ped.speed * 2.6 * hurry;
        vx = Math.sin(away) * sp;
        vz = Math.cos(away) * sp;
        ped.heading = away;
      } else if (ped.dodgeTimer > 0) {
        ped.dodgeTimer -= dt;
        const side = ped.axis === 'x' ? Math.PI / 2 : 0;
        const dir = ped.heading + side * ped.dodgeDir;
        const sp = ped.speed * WORLD.pedDodgeMult;
        vx = Math.sin(dir) * sp;
        vz = Math.cos(dir) * sp;
      } else if (ped.pauseTimer > 0) {
        ped.pauseTimer -= dt;
      } else {
        ped.nextPause -= dt;
        if (ped.nextPause <= 0 && !ped.isNight && rain <= 0.3) {
          ped.pauseTimer = 2 + this.rng.next() * 3;
          ped.nextPause = 8 + this.rng.next() * 16;
        } else {
          let dodged = false;
          if (hazardList.length) {
            for (const hz of hazardList) {
              if (distance2D(ped.x, ped.z, hz.x, hz.z) < WORLD.pedDodgeDist) {
                ped.dodgeTimer = 0.7;
                ped.dodgeDir = this.rng.next() < 0.5 ? -1 : 1;
                dodged = true;
                break;
              }
            }
          }
          if (!dodged) {
            const sp = ped.speed * hurry;
            vx = Math.sin(ped.heading) * sp;
            vz = Math.cos(ped.heading) * sp;
          }
        }
      }
      ped.x += vx * dt;
      ped.z += vz * dt;
      if (Math.abs(ped.x) > CITY_HALF || Math.abs(ped.z) > CITY_HALF) {
        ped.direction *= -1;
        ped.heading += Math.PI;
        ped.x = clamp(ped.x, -CITY_HALF, CITY_HALF);
        ped.z = clamp(ped.z, -CITY_HALF, CITY_HALF);
      }
      if (ped.fleeTimer <= 0 && ped.dodgeTimer <= 0) {
        if (ped.axis === 'x') ped.z = ped.line;
        else ped.x = ped.line;
      }
      if (this.city && typeof this.city.resolveCircle === 'function') {
        const fixed = this.city.resolveCircle(ped.x, ped.z, 0.4);
        ped.x = fixed.x;
        ped.z = fixed.z;
      }
      const moving = Math.abs(vx) + Math.abs(vz) > 0.01;
      if (moving) ped.walkPhase += dt * 8;
      const swing = moving ? Math.sin(ped.walkPhase) * 0.5 : 0;
      ped.legL.rotation.x = swing;
      ped.legR.rotation.x = -swing;
      ped.group.position.set(ped.x, 0, ped.z);
      ped.group.rotation.y = ped.heading;
    }
  }
}
