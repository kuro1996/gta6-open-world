import * as THREE from '../vendor/three/three.module.min.js';

const BODY_DIMS = {
  truck: { w: 2.2, h: 1.6, l: 5.2 },
  sport: { w: 1.9, h: 1.1, l: 4.2 },
  van: { w: 2.1, h: 1.9, l: 4.8 },
  muscle: { w: 2.0, h: 1.2, l: 4.6 },
  convertible: { w: 1.9, h: 1.0, l: 4.3 },
  sedan: { w: 1.9, h: 1.3, l: 4.5 },
  taxi: { w: 1.9, h: 1.3, l: 4.5 },
  police: { w: 2.0, h: 1.35, l: 4.6 },
};

const TRAFFIC_MIX = [
  ['sedan', 5], ['taxi', 2], ['truck', 2], ['sport', 1],
  ['van', 2], ['muscle', 1], ['convertible', 1],
];

const TRAFFIC_TOP = { sport: 30, muscle: 28, convertible: 27 };
const PARKED_TOP = { sport: 48, muscle: 46, convertible: 44 };
const PALETTE = [0xd33a2c, 0x2e9bff, 0xffd24a, 0x39d353, 0xe8e8e8, 0x222222, 0x7a4fd0, 0xff7a2e];

function clampV(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function dist2D(x1, z1, x2, z2) {
  return Math.hypot(x2 - x1, z2 - z1);
}

function meshObj(kind, color) {
  const shade = color === undefined ? 0xffffff : color;
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: shade, emissive: shade, emissiveIntensity: 0.25 }),
  );
  mesh.userData.kind = kind;
  mesh.kind = kind;
  return mesh;
}

export function makeCarMesh(type, color) {
  const dims = BODY_DIMS[type] || BODY_DIMS.sedan;
  const group = meshObj('car', color);
  group.userData.type = type;
  const body = meshObj('body', color);
  body.scale.x = dims.w;
  body.scale.y = dims.h;
  body.scale.z = dims.l;
  body.position.y = 0.7;
  group.add(body);
  const cabin = meshObj('cabin', 0x1a2530);
  cabin.scale.x = dims.w * 0.8;
  cabin.scale.y = dims.h * 0.55;
  cabin.scale.z = dims.l * 0.45;
  cabin.position.y = 1.3;
  group.add(cabin);
  const wheels = [];
  for (const [wx, wz] of [[-0.85, 1.4], [0.85, 1.4], [-0.85, -1.4], [0.85, -1.4]]) {
    const wheel = meshObj('wheel', 0x111111);
    wheel.position.x = wx;
    wheel.position.y = 0.35;
    wheel.position.z = wz;
    group.add(wheel);
    wheels.push(wheel);
  }
  group.userData.wheels = wheels;
  const head = meshObj('headlight', 0xfff6c0);
  head.position.z = dims.l / 2;
  head.position.y = 0.7;
  group.add(head);
  const tail = meshObj('taillight', 0xff2222);
  tail.position.z = -dims.l / 2;
  tail.position.y = 0.7;
  group.add(tail);
  if (type === 'truck') {
    const bed = meshObj('truckbed', 0x333333);
    bed.position.y = 1.1;
    bed.position.z = -1.2;
    group.add(bed);
  }
  if (type === 'muscle') {
    const spoiler = meshObj('spoiler', color);
    spoiler.position.z = -dims.l / 2;
    spoiler.position.y = 1.4;
    group.add(spoiler);
    const scoop = meshObj('scoop', color);
    scoop.position.y = 1.35;
    group.add(scoop);
  }
  if (type === 'convertible') {
    const top = meshObj('softtop', 0x222222);
    top.scale.y = 0.15;
    top.position.y = 1.25;
    group.add(top);
  }
  if (type === 'taxi') {
    const sign = meshObj('taxisign', 0xffd24a);
    sign.position.y = 1.7;
    group.add(sign);
  }
  if (type === 'police') {
    const bar = meshObj('lightbar', 0x111111);
    bar.position.y = 1.65;
    const red = meshObj('redlight', 0xff2222);
    red.position.x = -0.3;
    const blue = meshObj('bluelight', 0x2222ff);
    blue.position.x = 0.3;
    bar.add(red);
    bar.add(blue);
    group.add(bar);
  }
  if (type === 'sport' || type === 'muscle' || type === 'convertible') {
    const glow = meshObj('underglow', 0x2ee6e6);
    glow.scale.x = dims.w + 0.3;
    glow.scale.z = dims.l + 0.3;
    glow.position.y = 0.05;
    glow.material.emissiveIntensity = 0;
    group.add(glow);
    group.userData.glow = glow;
  }
  return group;
}

export function setCarGlow(mesh, nightF) {
  if (!mesh || !mesh.userData || !mesh.userData.glow) return;
  mesh.userData.glow.material.emissiveIntensity = clampV(nightF || 0, 0, 1) * 1.2;
  mesh.userData.glow.visible = (nightF || 0) > 0.1;
}

export function makeCarState(mesh, type, maxSpeed = 38) {
  return {
    mesh, type, maxSpeed,
    speed: 0, steer: 0, heading: 0, x: 0, z: 0,
    health: 100, smoke: false, condition: 100,
    damage: { front: 0, side: 0, rear: 0 },
    wheelSpin: 0,
  };
}

export function syncCarMesh(car) {
  if (!car || !car.mesh) return;
  car.mesh.position.x = car.x;
  car.mesh.position.z = car.z;
  car.mesh.rotation.y = car.heading || 0;
  car.wheelSpin = ((car.wheelSpin || 0) + (car.speed || 0) * 0.16) % (Math.PI * 2);
  const wheels = car.mesh.userData ? car.mesh.userData.wheels : null;
  if (wheels) {
    for (const w of wheels) w.rotation.x = car.wheelSpin;
  }
}

const PARKED_SPOTS = [
  { x: 30, z: 20, heading: 0.5, type: 'sedan', color: 0xd33a2c, name: 'Voss Sedan' },
  { x: 55, z: -40, heading: -1.2, type: 'sport', color: 0xffd24a, name: 'Comet GT' },
  { x: -60, z: 45, heading: 1.6, type: 'sedan', color: 0x2e9bff, name: 'City Sedan' },
  { x: 10, z: -70, heading: 0, type: 'taxi', color: 0xffd24a, name: 'Taxi' },
  { x: -150, z: 160, heading: 2.4, type: 'truck', color: 0x888888, name: 'Hauler' },
  { x: 90, z: 120, heading: -0.7, type: 'sport', color: 0x7a4fd0, name: 'Comet S' },
  { x: -30, z: 190, heading: 1.1, type: 'van', color: 0x39d353, name: 'Surfer Van' },
  { x: 140, z: 60, heading: 0.3, type: 'sedan', color: 0xff7a2e, name: 'Sunset Sedan' },
  { x: -180, z: 120, heading: -2.0, type: 'truck', color: 0x2e9bff, name: 'Marina Hauler' },
  { x: 110, z: -30, heading: 1.9, type: 'taxi', color: 0xe8e8e8, name: 'Hospital Taxi' },
  { x: 175, z: 145, heading: -0.4, type: 'convertible', color: 0xe8e8e8, name: 'Beach Cruiser' },
  { x: -90, z: -140, heading: 2.8, type: 'muscle', color: 0x222222, name: 'Night Muscle' },
];

export function spawnParkedCars(scene, rng) {
  const list = [];
  for (const spot of PARKED_SPOTS) {
    const mesh = makeCarMesh(spot.type, spot.color);
    const top = PARKED_TOP[spot.type] || 38;
    const car = makeCarState(mesh, spot.type, top);
    car.x = spot.x;
    car.z = spot.z;
    car.heading = spot.heading;
    car.parked = true;
    car.name = spot.name;
    const cond = spot.name === 'Comet GT' ? 100 : 70 + ((rng && typeof rng.range === 'function') ? rng.range(0, 30) : Math.random() * 30);
    car.condition = cond;
    car.maxSpeed = top * (0.9 + cond / 1000);
    setCarGlow(mesh, 0.3);
    syncCarMesh(car);
    if (scene && typeof scene.add === 'function') scene.add(mesh);
    list.push(car);
  }
  return list;
}

export class TrafficSystem {
  constructor(scene, rng, city) {
    this.scene = scene || null;
    this.rng = rng || null;
    this.city = city || { roads: [-120, -60, 0, 60, 120], bounds: 260 };
    this.cars = [];
    this.rain = 0;
    this.night = 0;
    const count = 14;
    for (let i = 0; i < count; i++) this.cars.push(this.spawnTrafficCar());
  }

  roll(a, b) {
    const r = this.rng;
    if (r && typeof r.range === 'function') return r.range(a, b);
    if (typeof r === 'function') return a + r() * (b - a);
    return a + Math.random() * (b - a);
  }

  pickWeighted() {
    const total = TRAFFIC_MIX.reduce((a, [, w]) => a + w, 0);
    let r = this.roll(0, total);
    for (const [type, w] of TRAFFIC_MIX) {
      r -= w;
      if (r <= 0) return type;
    }
    return 'sedan';
  }

  placeOnRoad(car) {
    const roads = this.city.roads || [-120, -60, 0, 60, 120];
    const axis = this.roll(0, 1) < 0.5 ? 'x' : 'z';
    const line = roads[Math.floor(this.roll(0, roads.length))];
    const along = this.roll(-240, 240);
    const lane = this.roll(0, 1) < 0.5 ? -2 : 2;
    const dir = this.roll(0, 1) < 0.5 ? 1 : -1;
    if (axis === 'x') {
      car.x = along;
      car.z = line + lane;
      car.heading = dir > 0 ? Math.PI / 2 : -Math.PI / 2;
      car.axis = 'x';
    } else {
      car.x = line + lane;
      car.z = along;
      car.heading = dir > 0 ? 0 : Math.PI;
      car.axis = 'z';
    }
    car.dir = dir;
    syncCarMesh(car);
  }

  respawnNearPlayer(car, playerCar) {
    const px = playerCar ? playerCar.x || 0 : 0;
    const pz = playerCar ? playerCar.z || 0 : 0;
    this.placeOnRoad(car);
    car.x = clampV(car.x, px - 120, px + 120);
    car.z = clampV(car.z, pz - 120, pz + 120);
    syncCarMesh(car);
  }

  spawnTrafficCar() {
    const type = this.pickWeighted();
    const color = PALETTE[Math.floor(this.roll(0, PALETTE.length))];
    const mesh = makeCarMesh(type, color);
    const top = TRAFFIC_TOP[type] || 22;
    const car = makeCarState(mesh, type, top);
    car.condition = this.roll(65, 100);
    car.maxSpeed = top * (0.85 + car.condition / 400);
    car.speed = car.maxSpeed * 0.7;
    this.placeOnRoad(car);
    if (this.scene && typeof this.scene.add === 'function') this.scene.add(mesh);
    return car;
  }

  turn(car) {
    if (this.roll(0, 1) < 0.4) {
      car.dir *= -1;
      car.heading += Math.PI;
    } else {
      if (car.axis === 'x') {
        car.axis = 'z';
        car.heading = car.dir > 0 ? 0 : Math.PI;
      } else {
        car.axis = 'x';
        car.heading = car.dir > 0 ? Math.PI / 2 : -Math.PI / 2;
      }
    }
  }

  setRain(v) {
    this.rain = clampV(v || 0, 0, 1);
  }

  setNight(v) {
    this.night = clampV(v || 0, 0, 1);
    for (const car of this.cars) setCarGlow(car.mesh, this.night);
  }

  update(dt, playerCar) {
    const step = Number(dt) || 0;
    const px = playerCar ? playerCar.x || 0 : 0;
    const pz = playerCar ? playerCar.z || 0 : 0;
    const wet = 1 - this.rain * 0.25;
    for (const car of this.cars) {
      const d = dist2D(car.x, car.z, px, pz);
      if (d > 220) {
        this.respawnNearPlayer(car, playerCar);
        continue;
      }
      let target = car.maxSpeed * wet;
      for (const other of this.cars) {
        if (other === car) continue;
        if (other.axis !== car.axis) continue;
        const ahead = car.axis === 'x' ? (other.x - car.x) * car.dir : (other.z - car.z) * car.dir;
        const lateral = car.axis === 'x' ? Math.abs(other.z - car.z) : Math.abs(other.x - car.x);
        if (ahead > 0 && ahead < 14 && lateral < 4) target = Math.min(target, other.speed * 0.9);
      }
      if (playerCar && d < 16) target = Math.min(target, (playerCar.speed || 0) * 0.8 + 2);
      car.speed += (target - car.speed) * Math.min(1, step * 1.5);
      if (car.axis === 'x') car.x += Math.sin(car.heading) * car.speed * step;
      else car.z += Math.cos(car.heading) * car.speed * step;
      const bound = (this.city.bounds || 260) - 10;
      if (Math.abs(car.x) > bound || Math.abs(car.z) > bound) this.turn(car);
      car.x = clampV(car.x, -260, 260);
      car.z = clampV(car.z, -260, 260);
      syncCarMesh(car);
    }
  }
}
