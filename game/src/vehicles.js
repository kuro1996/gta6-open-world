// Solara Nights — cars: mesh factory plus the traffic system that drives them
// around the road grid, and the parked cars the player can steal.
import * as THREE from 'three';
import { CITY_HALF, COLORS, GRID_K, PITCH, ROAD_WIDTH } from './config.js';
import { clamp, distance2D } from './random.js';

const BODY_GEO = new THREE.BoxGeometry(1, 1, 1);
const CABIN_GEO = new THREE.BoxGeometry(1, 1, 1);
const WHEEL_GEO = new THREE.CylinderGeometry(0.36, 0.36, 0.28, 10);
const LIGHT_GEO = new THREE.BoxGeometry(0.3, 0.18, 0.08);

export function makeCarMesh(type, colorHex) {
  const group = new THREE.Group();
  const paint = new THREE.MeshLambertMaterial({ color: colorHex });
  const glass = new THREE.MeshLambertMaterial({ color: 0x1a2733 });
  const dark = new THREE.MeshLambertMaterial({ color: 0x15151a });

  const dims = type === 'truck' ? { w: 2.2, l: 5.6, h: 1.0, cabH: 0.9 } : type === 'sport' ? { w: 1.9, l: 4.4, h: 0.62, cabH: 0.55 } : { w: 2.0, l: 4.6, h: 0.78, cabH: 0.7 };
  const body = new THREE.Mesh(BODY_GEO, paint);
  body.scale.set(dims.w, dims.h, dims.l);
  body.position.y = 0.55 + dims.h / 2;
  group.add(body);
  const cabin = new THREE.Mesh(CABIN_GEO, glass);
  cabin.scale.set(dims.w * 0.86, dims.cabH, dims.l * (type === 'truck' ? 0.3 : 0.5));
  cabin.position.set(0, 0.55 + dims.h + dims.cabH / 2, type === 'truck' ? dims.l * 0.28 : -dims.l * 0.06);
  group.add(cabin);
  if (type === 'truck') {
    const bed = new THREE.Mesh(BODY_GEO, dark);
    bed.scale.set(dims.w * 0.9, 0.5, dims.l * 0.5);
    bed.position.set(0, 0.55 + dims.h + 0.25, -dims.l * 0.24);
    group.add(bed);
  }
  const wheelMat = new THREE.MeshLambertMaterial({ color: 0x0c0c0e });
  const wheelPos = [
    [-dims.w / 2, dims.l * 0.32],
    [dims.w / 2, dims.l * 0.32],
    [-dims.w / 2, -dims.l * 0.32],
    [dims.w / 2, -dims.l * 0.32],
  ];
  const wheels = [];
  for (const [wx, wz] of wheelPos) {
    const wheel = new THREE.Mesh(WHEEL_GEO, wheelMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(wx, 0.36, wz);
    group.add(wheel);
    wheels.push(wheel);
  }
  const headMat = new THREE.MeshBasicMaterial({ color: 0xfff6c8 });
  for (const hx of [-dims.w * 0.32, dims.w * 0.32]) {
    const head = new THREE.Mesh(LIGHT_GEO, headMat);
    head.position.set(hx, 0.75, dims.l / 2 + 0.02);
    group.add(head);
  }
  const tailMat = new THREE.MeshBasicMaterial({ color: 0xd21f1f });
  for (const tx of [-dims.w * 0.32, dims.w * 0.32]) {
    const tail = new THREE.Mesh(LIGHT_GEO, tailMat);
    tail.position.set(tx, 0.75, -dims.l / 2 - 0.02);
    group.add(tail);
  }
  if (type === 'taxi') {
    const sign = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.25, 0.4), new THREE.MeshBasicMaterial({ color: 0xffd23d }));
    sign.position.set(0, 0.55 + dims.h + dims.cabH + 0.12, 0);
    group.add(sign);
  }
  if (type === 'police') {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.18, 0.4), new THREE.MeshBasicMaterial({ color: 0x222226 }));
    bar.position.set(0, 0.55 + dims.h + dims.cabH + 0.1, 0);
    group.add(bar);
    const red = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, 0.42), new THREE.MeshBasicMaterial({ color: 0xff2222 }));
    red.position.set(-0.28, 0.55 + dims.h + dims.cabH + 0.22, 0);
    group.add(red);
    const blue = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, 0.42), new THREE.MeshBasicMaterial({ color: 0x2244ff }));
    blue.position.set(0.28, 0.55 + dims.h + dims.cabH + 0.22, 0);
    group.add(blue);
    group.userData.lightRed = red;
    group.userData.lightBlue = blue;
  }
  group.userData.wheels = wheels;
  group.userData.type = type;
  return group;
}

/** A car the player (or traffic) drives: mesh plus arcade state. */
export function makeCarState(mesh, type, maxSpeed) {
  return {
    mesh,
    type,
    maxSpeed: maxSpeed || 38,
    speed: 0,
    steer: 0,
    heading: 0,
    x: 0,
    z: 0,
    health: 100,
    smoke: false,
  };
}

export function syncCarMesh(car) {
  car.mesh.position.set(car.x, 0, car.z);
  car.mesh.rotation.y = car.heading;
  const spin = car.speed * 0.12;
  for (const wheel of car.mesh.userData.wheels || []) wheel.rotation.x += spin;
}

export class TrafficSystem {
  constructor(scene, rng, city) {
    this.scene = scene;
    this.rng = rng;
    this.city = city;
    this.cars = [];
    const types = ['sedan', 'sedan', 'sedan', 'taxi', 'truck', 'sport'];
    for (let i = 0; i < 14; i += 1) {
      const type = types[i % types.length];
      const color = COLORS.carPalette[rng.int(0, COLORS.carPalette.length - 1)];
      const mesh = makeCarMesh(type, color);
      scene.add(mesh);
      const car = makeCarState(mesh, type, type === 'sport' ? 30 : 22);
      this._placeOnRoad(car);
      this.cars.push(car);
    }
  }

  _placeOnRoad(car) {
    const axis = this.rng.chance(0.5) ? 'x' : 'z';
    const line = this.rng.int(-GRID_K, GRID_K) * PITCH;
    const along = this.rng.range(-CITY_HALF + 20, CITY_HALF - 20);
    const lane = this.rng.chance(0.5) ? 3.5 : -3.5;
    const dir = this.rng.chance(0.5) ? 1 : -1;
    if (axis === 'x') {
      car.x = along;
      car.z = line + lane;
      car.heading = dir > 0 ? Math.PI / 2 : -Math.PI / 2;
    } else {
      car.x = line + lane;
      car.z = along;
      car.heading = dir > 0 ? 0 : Math.PI;
    }
    car.axis = axis;
    car.line = line;
    car.dir = dir;
    car.speed = this.rng.range(10, 18);
    syncCarMesh(car);
  }

  /** Pick a new road at the next intersection. */
  _turn(car) {
    const turn = this.rng.chance(0.5);
    if (!turn) {
      car.dir *= -1;
      car.heading += Math.PI;
      return;
    }
    const cross = Math.round((car.axis === 'x' ? car.z : car.x) / PITCH) * PITCH;
    const newAxis = car.axis === 'x' ? 'z' : 'x';
    const newLine = clamp(cross, -GRID_K * PITCH, GRID_K * PITCH);
    const lane = this.rng.chance(0.5) ? 3.5 : -3.5;
    car.axis = newAxis;
    car.line = newLine;
    car.dir = this.rng.chance(0.5) ? 1 : -1;
    if (newAxis === 'x') {
      car.z = newLine + lane;
      car.heading = car.dir > 0 ? Math.PI / 2 : -Math.PI / 2;
    } else {
      car.x = newLine + lane;
      car.heading = car.dir > 0 ? 0 : Math.PI;
    }
  }

  update(dt, playerCar) {
    for (const car of this.cars) {
      // Slow down for the car ahead on the same lane.
      let target = car.maxSpeed;
      for (const other of this.cars) {
        if (other === car || other.axis !== car.axis || Math.abs(other.line - car.line) > 1) continue;
        const ahead = car.axis === 'x' ? (other.x - car.x) * car.dir : (other.z - car.z) * car.dir;
        if (ahead > 0 && ahead < 12) target = Math.min(target, other.speed * 0.8);
      }
      if (playerCar) {
        const d = distance2D(car.x, car.z, playerCar.x, playerCar.z);
        if (d < 10) target = Math.min(target, 6);
      }
      car.speed += clamp(target - car.speed, -14 * dt, 8 * dt);
      const step = car.speed * dt;
      if (car.axis === 'x') {
        car.x += step * car.dir;
        if (Math.abs(car.x) > CITY_HALF - 6) this._turn(car);
      } else {
        car.z += step * car.dir;
        if (Math.abs(car.z) > CITY_HALF - 6) this._turn(car);
      }
      // Stay out of buildings (a turn can cut a corner).
      const fixed = this.city.collideCircle(car.x, car.z, 2.2);
      car.x = fixed.x;
      car.z = fixed.z;
      syncCarMesh(car);
    }
  }
}

/** Parked cars the player can steal, placed along roads. */
export function spawnParkedCars(scene, rng) {
  const parked = [];
  const spots = [
    { x: -186, z: 190, heading: Math.PI / 2, type: 'sedan', color: 0x3aa655, name: 'Voss Sedan' },
    { x: 33, z: 22, heading: 0, type: 'sport', color: 0xe8c33a, name: 'Comet GT' },
    { x: 120, z: -58, heading: Math.PI, type: 'sedan', color: 0x2e6fc2, name: 'City Sedan' },
    { x: -58, z: -120, heading: -Math.PI / 2, type: 'taxi', color: 0xe8c33a, name: 'Taxi' },
    { x: 174, z: 120, heading: Math.PI / 2, type: 'truck', color: 0xd4762e, name: 'Hauler' },
    { x: -120, z: -174, heading: 0, type: 'sport', color: 0xc23b2e, name: 'Comet S' },
  ];
  for (const spot of spots) {
    const mesh = makeCarMesh(spot.type, spot.color);
    scene.add(mesh);
    const car = makeCarState(mesh, spot.type, spot.type === 'sport' ? 48 : 38);
    car.x = spot.x;
    car.z = spot.z;
    car.heading = spot.heading;
    car.name = spot.name;
    car.parked = true;
    syncCarMesh(car);
    parked.push(car);
  }
  return parked;
}
