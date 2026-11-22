// Solara Nights — the wanted system: heat builds with crimes and cools when the
// player lays low; police cars chase and ram, foot cops chase and bust on foot.
import * as THREE from 'three';
import { CITY_HALF, WORLD } from './config.js';
import { clamp, distance2D, wrapAngle } from './random.js';
import { makeCarMesh, makeCarState, syncCarMesh } from './vehicles.js';

export class WantedSystem {
  constructor() {
    this.heat = 0;
    this.level = 0;
    this.quietTime = 0;
  }

  addHeat(amount) {
    this.heat = clamp(this.heat + amount, 0, 100);
    this.quietTime = 0;
    this.level = Math.min(WORLD.maxWanted, Math.floor(this.heat / 20));
  }

  update(dt, policeNear) {
    if (policeNear) {
      this.quietTime = 0;
    } else {
      this.quietTime += dt;
      if (this.quietTime > 5) this.heat = Math.max(0, this.heat - 4 * dt);
    }
    this.level = Math.min(WORLD.maxWanted, Math.floor(this.heat / 20));
  }
}

function makeCopMesh() {
  const group = new THREE.Group();
  const uniform = new THREE.MeshLambertMaterial({ color: 0x1e3a6e });
  const skin = new THREE.MeshLambertMaterial({ color: 0xe8b98a });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.4, 1.05, 10), uniform);
  body.position.y = 1.12;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.27, 12, 10), skin);
  head.position.y = 1.92;
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.14, 10), new THREE.MeshLambertMaterial({ color: 0x14264a }));
  cap.position.y = 2.12;
  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.6, 0.17), uniform);
  legL.position.set(-0.15, 0.32, 0);
  const legR = legL.clone();
  legR.position.x = 0.15;
  group.add(body, head, cap, legL, legR);
  group.userData = { legL, legR };
  return group;
}

export class PoliceSystem {
  constructor(scene, rng, city, audio, effects) {
    this.scene = scene;
    this.rng = rng;
    this.city = city;
    this.audio = audio;
    this.effects = effects;
    this.cars = [];
    this.cops = [];
    this.bustTimer = 0;
    this.flashTimer = 0;
    this.spawnTimer = 0;
  }

  get count() {
    return this.cars.length + this.cops.length;
  }

  _spawnCarNear(x, z) {
    const mesh = makeCarMesh('police', 0xf2f2ee);
    this.scene.add(mesh);
    const car = makeCarState(mesh, 'police', 40);
    const angle = this.rng.range(0, Math.PI * 2);
    const dist = this.rng.range(55, 80);
    car.x = clamp(x + Math.sin(angle) * dist, -CITY_HALF, CITY_HALF);
    car.z = clamp(z + Math.cos(angle) * dist, -CITY_HALF, CITY_HALF);
    const fixed = this.city.collideCircle(car.x, car.z, 2.2);
    car.x = fixed.x;
    car.z = fixed.z;
    car.heading = Math.atan2(x - car.x, z - car.z);
    car.speed = 12;
    syncCarMesh(car);
    this.cars.push(car);
    return car;
  }

  _spawnCopNear(x, z) {
    const mesh = makeCopMesh();
    this.scene.add(mesh);
    const angle = this.rng.range(0, Math.PI * 2);
    const cop = {
      mesh,
      x: clamp(x + Math.sin(angle) * 30, -CITY_HALF, CITY_HALF),
      z: clamp(z + Math.cos(angle) * 30, -CITY_HALF, CITY_HALF),
      heading: 0,
      speed: 5.2,
      walkPhase: 0,
    };
    this.cops.push(cop);
    return cop;
  }

  /** Keep the force matched to the wanted level; returns true when any unit is close. */
  update(dt, wanted, player, playerCar) {
    const px = playerCar ? playerCar.x : player.x;
    const pz = playerCar ? playerCar.z : player.z;
    const wantCars = Math.min(3, wanted.level);
    const wantCops = !playerCar && wanted.level >= 2 ? 2 : 0;
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      this.spawnTimer = 1.5;
      if (this.cars.length < wantCars) this._spawnCarNear(px, pz);
      if (this.cops.length < wantCops) this._spawnCopNear(px, pz);
    }
    // Despawn the surplus when the heat drops.
    while (this.cars.length > wantCars) {
      const car = this.cars.pop();
      this.scene.remove(car.mesh);
    }
    while (this.cops.length > wantCops) {
      const cop = this.cops.pop();
      this.scene.remove(cop.mesh);
    }
    let near = false;
    for (const car of this.cars) {
      const targetHeading = Math.atan2(px - car.x, pz - car.z);
      const diff = wrapAngle(targetHeading - car.heading);
      car.heading += clamp(diff, -2.4 * dt, 2.4 * dt);
      const d = distance2D(car.x, car.z, px, pz);
      near = near || d < 70;
      const wantSpeed = d > 6 ? car.maxSpeed : 8;
      car.speed += clamp(wantSpeed - car.speed, -20 * dt, 12 * dt);
      car.x += Math.sin(car.heading) * car.speed * dt;
      car.z += Math.cos(car.heading) * car.speed * dt;
      const fixed = this.city.collideCircle(car.x, car.z, 2.2);
      if (fixed.hit) car.speed *= 0.6;
      car.x = fixed.x;
      car.z = fixed.z;
      // A chase onto the beach must not run the police car off the map edge.
      car.x = clamp(car.x, WORLD.boundMinX, WORLD.boundX);
      car.z = clamp(car.z, WORLD.boundMinZ, WORLD.boundZ);
      // Ram the player's car.
      if (playerCar && d < 4.4) {
        const push = 4.4 - d;
        playerCar.x += ((playerCar.x - car.x) / Math.max(0.1, d)) * push;
        playerCar.z += ((playerCar.z - car.z) / Math.max(0.1, d)) * push;
        playerCar.speed *= 0.82;
        playerCar.health = Math.max(0, playerCar.health - 4);
        car.speed *= 0.7;
        if (this.audio) this.audio.thud();
        if (this.effects) this.effects.burst(playerCar.x, 1, playerCar.z, 0xffcc66, 8, 4);
      }
      // Flash the light bar.
      this.flashTimer += dt;
      const on = Math.floor(this.flashTimer * 4) % 2 === 0;
      if (car.mesh.userData.lightRed) {
        car.mesh.userData.lightRed.material.color.setHex(on ? 0xff2222 : 0x441111);
        car.mesh.userData.lightBlue.material.color.setHex(on ? 0x111144 : 0x2244ff);
      }
      syncCarMesh(car);
    }
    // Foot cops: run at the player, bust on contact.
    this.bustTimer = 0;
    for (const cop of this.cops) {
      const d = distance2D(cop.x, cop.z, player.x, player.z);
      near = near || d < 50;
      cop.heading = Math.atan2(player.x - cop.x, player.z - cop.z);
      const speed = d > 2.5 ? cop.speed : 0;
      cop.x += Math.sin(cop.heading) * speed * dt;
      cop.z += Math.cos(cop.heading) * speed * dt;
      const fixed = this.city.collideCircle(cop.x, cop.z, 0.5);
      cop.x = fixed.x;
      cop.z = fixed.z;
      cop.x = clamp(cop.x, WORLD.boundMinX, WORLD.boundX);
      cop.z = clamp(cop.z, WORLD.boundMinZ, WORLD.boundZ);
      cop.walkPhase += dt * speed * 3;
      const swing = Math.sin(cop.walkPhase) * 0.5;
      cop.mesh.userData.legL.rotation.x = swing;
      cop.mesh.userData.legR.rotation.x = -swing;
      cop.mesh.position.set(cop.x, 0, cop.z);
      cop.mesh.rotation.y = cop.heading;
      if (d < 2.6) this.bustTimer += dt;
    }
    if (this.audio) this.audio.siren(wanted.level > 0);
    return near;
  }

  clear() {
    for (const car of this.cars) this.scene.remove(car.mesh);
    for (const cop of this.cops) this.scene.remove(cop.mesh);
    this.cars = [];
    this.cops = [];
    this.bustTimer = 0;
    if (this.audio) this.audio.siren(false);
  }
}
