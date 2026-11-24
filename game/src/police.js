import * as THREE from 'three';
import * as CFG from './config.js';
import * as RND from './random.js';
import * as VEH from './vehicles.js';

const CITY_HALF = typeof CFG.CITY_HALF === 'number' ? CFG.CITY_HALF : 380;
const MAX_WANTED = typeof CFG.MAX_WANTED_LEVEL === 'number' ? CFG.MAX_WANTED_LEVEL : 5;
const HELI_LEVEL = typeof CFG.HELI_LEVEL === 'number' ? CFG.HELI_LEVEL : 5;
const HELI_HEIGHT = typeof CFG.HELI_HEIGHT === 'number' ? CFG.HELI_HEIGHT : 60;
const HELI_RADIUS = typeof CFG.HELI_RADIUS === 'number' ? CFG.HELI_RADIUS : 55;
const HELI_SPEED = typeof CFG.HELI_SPEED === 'number' ? CFG.HELI_SPEED : 0.5;
const ROADBLOCK_LEVEL = typeof CFG.ROADBLOCK_LEVEL === 'number' ? CFG.ROADBLOCK_LEVEL : 4;
const ROADBLOCK_AHEAD = typeof CFG.ROADBLOCK_AHEAD === 'number' ? CFG.ROADBLOCK_AHEAD : 40;
const ROADBLOCK_GAP = typeof CFG.ROADBLOCK_GAP === 'number' ? CFG.ROADBLOCK_GAP : 8;
const ROADBLOCK_INTERVAL = typeof CFG.ROADBLOCK_INTERVAL === 'number' ? CFG.ROADBLOCK_INTERVAL : 12;
const PIT_LEVEL = typeof CFG.PIT_LEVEL === 'number' ? CFG.PIT_LEVEL : 3;
const WING_LEVEL = typeof CFG.WING_LEVEL === 'number' ? CFG.WING_LEVEL : 2;
const SPRINT_LEVEL = typeof CFG.SPRINT_LEVEL === 'number' ? CFG.SPRINT_LEVEL : 3;
const POLICE_TOP = typeof CFG.POLICE_TOP_SPEED === 'number' ? CFG.POLICE_TOP_SPEED : 50;

function clamp(v, a, b) {
  if (typeof RND.clamp === 'function') return RND.clamp(v, a, b);
  return Math.max(a, Math.min(b, v));
}

function dist2D(ax, az, bx, bz) {
  if (typeof RND.distance2D === 'function') return RND.distance2D(ax, az, bx, bz);
  return Math.hypot(ax - bx, az - bz);
}

function wrapAngle(a) {
  if (typeof RND.wrapAngle === 'function') return RND.wrapAngle(a);
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

function levelFromHeat(heat) {
  return Math.min(MAX_WANTED, Math.floor(heat / 20));
}

export class WantedSystem {
  constructor() {
    this.heat = 0;
    this.level = 0;
    this.quietTime = 0;
  }

  addHeat(amount) {
    this.heat = clamp(this.heat + amount, 0, 100);
    this.quietTime = 0;
    this.level = levelFromHeat(this.heat);
  }

  update(dt, policeNear) {
    if (policeNear) {
      this.quietTime = 0;
      return;
    }
    this.quietTime += dt;
    if (this.quietTime > 5) {
      this.heat = clamp(this.heat - 4 * dt, 0, 100);
      this.level = levelFromHeat(this.heat);
    }
  }
}

function matColorHex(mat) {
  if (!mat) return null;
  const c = mat.color;
  if (c && typeof c.getHex === 'function') return c.getHex();
  if (typeof c === 'number') return c;
  return null;
}

function setMatColor(mat, hex) {
  if (!mat) return;
  const c = mat.color;
  if (c && typeof c.setHex === 'function') { c.setHex(hex); return; }
  if (c && typeof c.set === 'function') { c.set(hex); return; }
  mat.color = hex;
}

function findLightBar(mesh) {
  const stack = [mesh];
  while (stack.length > 0) {
    const node = stack.pop();
    if (node.material && matColorHex(node.material) === 0xff2222) return node.material;
    if (node.children) {
      for (const kid of node.children) stack.push(kid);
    }
  }
  return null;
}

function fallbackCarMesh(color) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1, 4.4),
    new THREE.MeshStandardMaterial({ color: color || 0x1a2a4a })
  );
  mesh.position.y = 0.6;
  const bar = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.3, 0.6),
    new THREE.MeshBasicMaterial({ color: 0xff2222 })
  );
  bar.position.y = 0.7;
  mesh.add(bar);
  return mesh;
}

function fallbackCopMesh() {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.5, 1.8, 8),
    new THREE.MeshStandardMaterial({ color: 0x1a2a5a })
  );
  mesh.position.y = 0.9;
  return mesh;
}

function fallbackHeliMesh() {
  const mesh = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1.5, 5),
    new THREE.MeshStandardMaterial({ color: 0x2a4a6a })
  );
  mesh.add(body);
  const rotor = new THREE.Mesh(
    new THREE.BoxGeometry(10, 0.1, 0.6),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  );
  rotor.position.y = 1;
  rotor.name = 'rotor';
  mesh.add(rotor);
  return mesh;
}

export class PoliceSystem {
  constructor(scene, rng, city, audio, effects) {
    this.scene = scene;
    this.rng = typeof rng === 'function' ? rng : Math.random;
    this.city = city;
    this.audio = audio || null;
    this.effects = effects || null;
    this.cars = [];
    this.cops = [];
    this.roadblocks = [];
    this.bustTimer = 0;
    this.flashTimer = 0;
    this.spawnTimer = 0;
    this.hornTimer = 0;
    this.alertTimer = 0;
    this.alertX = 0;
    this.alertZ = 0;
    this.ramImmune = 0;
    this.heli = null;
    this.heliAngle = 0;
    this.heliRotor = 0;
    this.roadblockTimer = 0;
  }

  get count() {
    return this.cars.length + this.cops.length + (this.heli ? 1 : 0);
  }

  get heliActive() {
    return !!this.heli;
  }

  spawnCarNear(player) {
    const mesh = typeof VEH.makeCarMesh === 'function'
      ? VEH.makeCarMesh('police')
      : fallbackCarMesh(0x1a2a4a);
    this.scene.add(mesh);
    const state = typeof VEH.makeCarState === 'function'
      ? VEH.makeCarState()
      : { heading: 0, speed: 0, x: 0, z: 0 };
    state.topSpeed = 40;
    state.ramTimer = 0;
    state.role = this.cars.length === 0 ? 'lead' : this.cars.length % 2 === 1 ? 'wing-left' : 'wing-right';
    const angle = this.rng() * Math.PI * 2;
    const dist = 55 + this.rng() * 25;
    let x = clamp(player.x + Math.cos(angle) * dist, -CITY_HALF, CITY_HALF);
    let z = clamp(player.z + Math.sin(angle) * dist, -CITY_HALF, CITY_HALF);
    if (this.city && typeof this.city.collideCircle === 'function') {
      const fixed = this.city.collideCircle(x, z, 3);
      x = fixed.x;
      z = fixed.z;
    }
    state.x = x;
    state.z = z;
    state.heading = Math.atan2(player.x - x, player.z - z);
    state.speed = 12;
    const car = { mesh, state, roadblock: false, lightBar: findLightBar(mesh) };
    this.cars.push(car);
    return car;
  }

  spawnCopNear(player) {
    const mesh = fallbackCopMesh();
    this.scene.add(mesh);
    const angle = this.rng() * Math.PI * 2;
    const cop = {
      mesh,
      x: player.x + Math.cos(angle) * 30,
      z: player.z + Math.sin(angle) * 30,
      heading: 0,
      speed: 5.2,
      walkPhase: 0,
    };
    this.cops.push(cop);
    return cop;
  }

  spawnHeli(player) {
    const mesh = fallbackHeliMesh();
    this.scene.add(mesh);
    const spot = new THREE.Object3D();
    spot.position.set(player.x, 0, player.z);
    this.scene.add(spot);
    this.heli = { mesh, spot, angle: this.heliAngle };
    this.heliAngle = 0;
    mesh.position.set(player.x + HELI_RADIUS, HELI_HEIGHT, player.z);
    if (this.audio && typeof this.audio.blip === 'function') this.audio.blip();
  }

  removeHeli() {
    if (!this.heli) return;
    this.scene.remove(this.heli.mesh);
    if (this.heli.spot) this.scene.remove(this.heli.spot);
    this.heli = null;
  }

  updateHeli(dt, player, playerCar) {
    if (!this.heli) return;
    const tight = playerCar ? 0.8 : 1;
    this.heliAngle += HELI_SPEED * dt * tight;
    const x = player.x + Math.cos(this.heliAngle) * HELI_RADIUS * tight;
    const z = player.z + Math.sin(this.heliAngle) * HELI_RADIUS * tight;
    this.heli.mesh.position.set(x, HELI_HEIGHT, z);
    this.heli.mesh.lookAt(player.x, HELI_HEIGHT, player.z);
    const speed = playerCar && playerCar.speed ? playerCar.speed : 0;
    this.heliRotor += dt * (10 + speed * 0.3);
    const rotor = this.heli.mesh.getObjectByName ? this.heli.mesh.getObjectByName('rotor') : null;
    if (rotor) rotor.rotation.y = this.heliRotor;
    if (this.heli.spot) {
      this.heli.spot.position.set(player.x, 0, player.z);
    }
    if (this.effects && typeof this.effects.dust === 'function' && this.rng() < dt * 0.2) {
      this.effects.dust(player.x, player.z);
    }
  }

  spawnRoadblock(player) {
    const heading = player.heading || 0;
    const aheadX = player.x + Math.sin(heading) * ROADBLOCK_AHEAD;
    const aheadZ = player.z + Math.cos(heading) * ROADBLOCK_AHEAD;
    for (let i = -1; i <= 1; i += 2) {
      const mesh = typeof VEH.makeCarMesh === 'function'
        ? VEH.makeCarMesh('police')
        : fallbackCarMesh(0x1a2a4a);
      this.scene.add(mesh);
      const state = typeof VEH.makeCarState === 'function'
        ? VEH.makeCarState()
        : { heading: 0, speed: 0, x: 0, z: 0 };
      const side = i * ROADBLOCK_GAP;
      state.x = aheadX + Math.cos(heading) * side;
      state.z = aheadZ - Math.sin(heading) * side;
      state.heading = heading + Math.PI;
      state.speed = 0;
      state.topSpeed = 0;
      state.ramTimer = 0;
      state.role = 'roadblock';
      this.roadblocks.push({ mesh, state, roadblock: true });
    }
    this.flashTimer = 0;
  }

  clearRoadblocks() {
    for (const block of this.roadblocks) this.scene.remove(block.mesh);
    this.roadblocks = [];
  }

  syncUnit(mesh, state) {
    if (typeof VEH.syncCarMesh === 'function') {
      VEH.syncCarMesh(mesh, state);
      return;
    }
    mesh.position.x = state.x;
    mesh.position.z = state.z;
    mesh.rotation.y = state.heading || 0;
  }

  update(dt, wanted, player, playerCar) {
    const level = wanted.level;
    const onFoot = !playerCar;
    const wantCars = Math.min(3, level);
    const wantCops = onFoot && level >= 2 ? 2 : 0;

    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      this.spawnTimer = 1.5;
      while (this.cars.length < wantCars) this.spawnCarNear(player);
      while (this.cops.length < wantCops) this.spawnCopNear(player);
    }
    while (this.cars.length > wantCars) {
      const car = this.cars.pop();
      this.scene.remove(car.mesh);
    }
    while (this.cops.length > wantCops) {
      const cop = this.cops.pop();
      this.scene.remove(cop.mesh);
    }

    if (level >= HELI_LEVEL && !this.heli) this.spawnHeli(player);
    if (level < HELI_LEVEL && this.heli) this.removeHeli();
    if (this.heli) this.updateHeli(dt, player, playerCar);

    const playerSpeed = playerCar && playerCar.speed ? playerCar.speed : 0;
    const moving = Math.abs(playerSpeed) > 1;
    this.roadblockTimer -= dt;
    if (level >= ROADBLOCK_LEVEL) {
      if (moving && this.roadblockTimer <= 0 && this.roadblocks.length === 0) {
        this.spawnRoadblock(player);
        this.roadblockTimer = ROADBLOCK_INTERVAL;
      }
    } else if (this.roadblocks.length > 0) {
      this.clearRoadblocks();
    }
    if (this.roadblocks.length > 0) {
      const block = this.roadblocks[0];
      const past = dist2D(player.x, player.z, block.state.x, block.state.z);
      if (past > 120) this.clearRoadblocks();
    }

    let near = false;
    if (this.heli) near = true;
    this.flashTimer += dt;
    this.ramImmune = Math.max(0, this.ramImmune - dt);
    this.alertTimer = Math.max(0, this.alertTimer - dt);

    const flashOn = Math.floor(this.flashTimer * 4) % 2 === 0;

    for (const car of this.cars) {
      const s = car.state;
      s.ramTimer = Math.max(0, (s.ramTimer || 0) - dt);
      const d = dist2D(s.x, s.z, player.x, player.z);
      if (d < 70) near = true;
      s.topSpeed = Math.min(40 + 2 * level, POLICE_TOP);
      let targetX = player.x;
      let targetZ = player.z;
      const heading = player.heading || 0;
      if (s.role === 'lead' && level >= PIT_LEVEL) {
        targetX = player.x - Math.sin(heading) * 4;
        targetZ = player.z - Math.cos(heading) * 4;
      } else if (s.role === 'wing-left' && level >= WING_LEVEL) {
        targetX = player.x - Math.cos(heading) * 6;
        targetZ = player.z + Math.sin(heading) * 6;
      } else if (s.role === 'wing-right' && level >= WING_LEVEL) {
        targetX = player.x + Math.cos(heading) * 6;
        targetZ = player.z - Math.sin(heading) * 6;
      }
      const wantHeading = Math.atan2(targetX - s.x, targetZ - s.z);
      const turn = clamp(wrapAngle(wantHeading - s.heading), -2.4 * dt, 2.4 * dt);
      s.heading += turn;
      const wantSpeed = d > 20 ? s.topSpeed : 8;
      s.speed += clamp(wantSpeed - s.speed, -20 * dt, 20 * dt);
      s.x += Math.sin(s.heading) * s.speed * dt;
      s.z += Math.cos(s.heading) * s.speed * dt;
      if (this.city && typeof this.city.collideCircle === 'function') {
        const before = { x: s.x, z: s.z };
        const fixed = this.city.collideCircle(s.x, s.z, 2);
        if (fixed.hit) {
          s.x = fixed.x;
          s.z = fixed.z;
          if (Math.hypot(fixed.x - before.x, fixed.z - before.z) > 0.01) s.speed *= 0.6;
        }
      }
      s.x = clamp(s.x, -CITY_HALF, CITY_HALF);
      s.z = clamp(s.z, -CITY_HALF, CITY_HALF);
      this.syncUnit(car.mesh, s);
      if (car.lightBar) setMatColor(car.lightBar, flashOn ? 0xff2222 : 0x2222ff);

      if (playerCar && d < 4.4 && s.ramTimer <= 0 && this.ramImmune <= 0) {
        const pushX = player.x - s.x;
        const pushZ = player.z - s.z;
        const len = Math.hypot(pushX, pushZ) || 1;
        playerCar.x = (playerCar.x || player.x) + (pushX / len) * 3;
        playerCar.z = (playerCar.z || player.z) + (pushZ / len) * 3;
        playerCar.speed = (playerCar.speed || 0) * 0.82;
        s.speed *= 0.55;
        s.ramTimer = 2;
        this.ramImmune = 2;
        if (this.audio && typeof this.audio.thud === 'function') this.audio.thud();
        if (this.effects && typeof this.effects.burst === 'function') this.effects.burst(player.x, player.z);
      }
    }

    for (const block of this.roadblocks) {
      const s = block.state;
      const d = dist2D(s.x, s.z, player.x, player.z);
      if (playerCar && d < 4) {
        const pushX = player.x - s.x;
        const pushZ = player.z - s.z;
        const len = Math.hypot(pushX, pushZ) || 1;
        playerCar.x = (playerCar.x || player.x) + (pushX / len) * 2;
        playerCar.z = (playerCar.z || player.z) + (pushZ / len) * 2;
        if (playerSpeed > 5) {
          playerCar.speed = playerSpeed * 0.55;
          playerCar.health = (playerCar.health === undefined ? 100 : playerCar.health) - 6;
          if (this.audio && typeof this.audio.crash === 'function') this.audio.crash();
          if (this.effects && typeof this.effects.burst === 'function') this.effects.burst(player.x, player.z);
        }
      }
      this.syncUnit(block.mesh, s);
    }

    let closestCop = null;
    let closestD = Infinity;
    for (const cop of this.cops) {
      const d = dist2D(cop.x, cop.z, player.x, player.z);
      if (d < closestD) { closestD = d; closestCop = cop; }
      if (d < 50) near = true;
    }
    for (const cop of this.cops) {
      let tx = player.x;
      let tz = player.z;
      let spd = cop.speed;
      if (level >= SPRINT_LEVEL) spd = 6.5;
      if (level >= MAX_WANTED) spd = 7.5;
      if (this.alertTimer > 0 && cop !== closestCop) {
        tx = this.alertX;
        tz = this.alertZ;
        spd *= 1.15;
      }
      const d = dist2D(cop.x, cop.z, tx, tz);
      if (d > 0.5) {
        const wantHeading = Math.atan2(tx - cop.x, tz - cop.z);
        cop.heading = wantHeading;
        cop.x += Math.sin(cop.heading) * spd * dt;
        cop.z += Math.cos(cop.heading) * spd * dt;
        cop.walkPhase += dt * spd * 2;
      }
      cop.mesh.position.set(cop.x, 0.9 + Math.abs(Math.sin(cop.walkPhase)) * 0.1, cop.z);
      cop.mesh.rotation.y = cop.heading;
      if (closestCop === cop && closestD < 12 && this.alertTimer <= 0) {
        this.alertTimer = 4;
        const heading = player.heading || 0;
        this.alertX = player.x + Math.sin(heading) * 6;
        this.alertZ = player.z + Math.cos(heading) * 6;
        if (this.audio && typeof this.audio.radio === 'function') this.audio.radio();
      }
      if (closestCop === cop && closestD < 2.6) {
        this.bustTimer += dt;
      }
    }

    if (this.audio) {
      this.audio.sirenLevel = level;
      this.audio.sirenOn = level > 0;
    }

    return near;
  }

  clear() {
    for (const car of this.cars) this.scene.remove(car.mesh);
    for (const cop of this.cops) this.scene.remove(cop.mesh);
    this.clearRoadblocks();
    this.removeHeli();
    this.cars = [];
    this.cops = [];
    this.bustTimer = 0;
    if (this.audio) this.audio.sirenOn = false;
  }
}
