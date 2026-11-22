// Solara Nights — pedestrians strolling the sidewalks, fleeing from gunfire.
import * as THREE from 'three';
import { CITY_HALF, GRID_K, PITCH, WORLD } from './config.js';
import { clamp, distance2D } from './random.js';

const BODY_GEO = new THREE.CylinderGeometry(0.32, 0.38, 1.1, 8);
const HEAD_GEO = new THREE.SphereGeometry(0.26, 10, 8);
const LEG_GEO = new THREE.BoxGeometry(0.16, 0.55, 0.16);

const SHIRTS = [0xd4762e, 0x2e6fc2, 0x3aa655, 0xc23b2e, 0xe8c33a, 0x7a4ac2, 0xe8e8e8, 0x222226];
const PANTS = [0x222226, 0x3a4a5a, 0x5a3a2a, 0x2a2a2a];

export class PedestrianSystem {
  constructor(scene, rng, city) {
    this.scene = scene;
    this.rng = rng;
    this.city = city;
    this.peds = [];
    // The count lives in config (WORLD.pedCount); the old hardcoded 22 here
    // silently ignored any tuning done there.
    for (let i = 0; i < WORLD.pedCount; i += 1) {
      const ped = this._makePed();
      this.peds.push(ped);
      scene.add(ped.group);
    }
  }

  _makePed() {
    const rng = this.rng;
    const group = new THREE.Group();
    const shirt = new THREE.MeshLambertMaterial({ color: SHIRTS[rng.int(0, SHIRTS.length - 1)] });
    const pants = new THREE.MeshLambertMaterial({ color: PANTS[rng.int(0, PANTS.length - 1)] });
    const skin = new THREE.MeshLambertMaterial({ color: [0xe8b98a, 0xc98a5a, 0x8a5a3a][rng.int(0, 2)] });
    const body = new THREE.Mesh(BODY_GEO, shirt);
    body.position.y = 1.15;
    const head = new THREE.Mesh(HEAD_GEO, skin);
    head.position.y = 1.95;
    const legL = new THREE.Mesh(LEG_GEO, pants);
    legL.position.set(-0.14, 0.32, 0);
    const legR = new THREE.Mesh(LEG_GEO, pants);
    legR.position.set(0.14, 0.32, 0);
    group.add(body, head, legL, legR);
    const ped = {
      group,
      legL,
      legR,
      x: 0,
      z: 0,
      heading: 0,
      speed: rng.range(1.2, 2.2),
      walkPhase: rng.range(0, 6),
      flee: 0,
      fleeX: 0,
      fleeZ: 0,
      // Idle pauses: a pedestrian sometimes stops for a moment — to check
      // a shop window, wait out a crossing — instead of marching forever.
      pause: 0,
      nextPause: rng.range(8, 24),
      // Rain hurry (attempt 2): set by update() from the weather — in a
      // shower pedestrians walk faster and never idle-pause, hurrying for
      // cover like everyone does when the rain starts.
      rainF: 0,
      // Dodge state: sidestepping a car that is about to run them over.
      dodge: 0,
      dodgeDir: 1,
      axis: 'x',
      line: 0,
      dir: 1,
    };
    this._placeOnSidewalk(ped);
    return ped;
  }

  _placeOnSidewalk(ped) {
    const axis = this.rng.chance(0.5) ? 'x' : 'z';
    const block = this.rng.int(-GRID_K, GRID_K - 1);
    const edge = (block + 0.5) * PITCH + (this.rng.chance(0.5) ? 1 : -1) * (22 + 3);
    const along = this.rng.range(-CITY_HALF + 20, CITY_HALF - 20);
    ped.axis = axis;
    ped.line = edge;
    ped.dir = this.rng.chance(0.5) ? 1 : -1;
    if (axis === 'x') {
      ped.x = along;
      ped.z = edge;
      ped.heading = ped.dir > 0 ? Math.PI / 2 : -Math.PI / 2;
    } else {
      ped.x = edge;
      ped.z = along;
      ped.heading = ped.dir > 0 ? 0 : Math.PI;
    }
    ped.group.position.set(ped.x, 0, ped.z);
    ped.group.rotation.y = ped.heading;
  }

  scare(x, z, radius) {
    for (const ped of this.peds) {
      if (distance2D(ped.x, ped.z, x, z) < radius) {
        ped.flee = 4;
        ped.fleeX = x;
        ped.fleeZ = z;
      }
    }
  }

  /** hazards: cars (player + traffic + police) to sidestep away from. */
  update(dt, hazards, rainF) {
    for (const ped of this.peds) {
      // Rain hurry (attempt 2): in a shower everyone walks faster and no
      // one stops to window-shop — the street empties toward cover.
      const hurry = 1 + (WORLD.rainPedHurry - 1) * (rainF || 0);
      let speed = ped.speed * hurry;
      let heading = ped.heading;
      if (ped.flee > 0) {
        ped.flee -= dt;
        // Fleeing pace follows the pedestrian's own walk speed, so a slow
        // stroller does not suddenly sprint like an athlete.
        speed = ped.speed * 2.6 * hurry;
        const away = Math.atan2(ped.x - ped.fleeX, ped.z - ped.fleeZ);
        heading = away;
      } else if (ped.dodge > 0) {
        // Mid-dodge: keep sidestepping perpendicular to the road until the
        // timer runs out, then resume the stroll.
        ped.dodge -= dt;
        speed = ped.speed * WORLD.pedDodgeMult * hurry;
        heading = ped.heading + (Math.PI / 2) * ped.dodgeDir;
      } else if (ped.pause > 0 && !(rainF > 0.3)) {
        ped.pause -= dt;
        speed = 0;
      } else {
        ped.nextPause -= dt;
        if (ped.nextPause <= 0 && !(rainF > 0.3)) {
          ped.pause = this.rng.range(0.8, 2);
          ped.nextPause = this.rng.range(10, 26);
        }
        // A car closing in on the sidewalk: sidestep out of its path
        // instead of strolling into the bumper.
        if (hazards) {
          for (const h of hazards) {
            if (!h) continue;
            if (distance2D(ped.x, ped.z, h.x, h.z) < WORLD.pedDodgeDist) {
              ped.dodge = 0.7;
              ped.dodgeDir = this.rng.chance(0.5) ? 1 : -1;
              heading = ped.heading + (Math.PI / 2) * ped.dodgeDir;
              speed = ped.speed * WORLD.pedDodgeMult;
              break;
            }
          }
        }
      }
      ped.heading = heading;
      ped.x += Math.sin(heading) * speed * dt;
      ped.z += Math.cos(heading) * speed * dt;
      if (ped.flee <= 0 && ped.dodge <= 0) {
        const along = ped.axis === 'x' ? ped.x : ped.z;
        if (Math.abs(along) > CITY_HALF - 10) {
          ped.dir *= -1;
          ped.heading += Math.PI;
        }
        if (ped.axis === 'x') ped.z = ped.line;
        else ped.x = ped.line;
      }
      const fixed = this.city.collideCircle(ped.x, ped.z, 0.5);
      ped.x = fixed.x;
      ped.z = fixed.z;
      ped.walkPhase += dt * speed * 3.2;
      const swing = Math.sin(ped.walkPhase) * 0.5;
      ped.legL.rotation.x = swing;
      ped.legR.rotation.x = -swing;
      ped.group.position.set(ped.x, 0, ped.z);
      ped.group.rotation.y = ped.heading;
      ped.group.position.y = Math.abs(Math.sin(ped.walkPhase)) * 0.04;
    }
  }
}
