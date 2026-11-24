import * as THREE from '../vendor/three/three.module.min.js';

const WORLD_BOUND = 260;
const EDGE_MARGIN = 20;
const HEADLIGHT_AT = 0.45;
const DRIFT_MIN_SPEED = 8;
const CHAIN_TIME = 2.5;
const GARAGE_X = -150;
const GARAGE_Z = 160;

function clampD(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function dampAngle(current, target, lambda, dt) {
  let diff = ((target - current + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
  return current + diff * (1 - Math.exp(-lambda * dt));
}

function meshPart(kind, color) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color }),
  );
  mesh.userData.kind = kind;
  mesh.kind = kind;
  return mesh;
}

export class Driving {
  constructor(city, audio, effects) {
    this.city = city || { roads: [-120, -60, 0, 60, 120], bounds: WORLD_BOUND, garage: { x: GARAGE_X, z: GARAGE_Z } };
    this.audio = audio || null;
    this.effects = effects || null;
    this.car = null;
    this.skidTimer = 0;
    this.nightF = 0;
    this.headlight = null;
    this.beepTimer = 0;
    this.rainF = 0;
    this.driftScore = 0;
    this.drifting = false;
    this.chainTimer = 0;
    this.banked = 0;
    this.bankedTotal = 0;
    this.roll = 0;
    this.pitch = 0;
    this.lastSpeed = 0;
    this.vx = 0;
    this.vz = 0;
  }

  setRain(v) {
    this.rainF = clampD(v || 0, 0, 1);
  }

  setNight(v) {
    this.nightF = clampD(v || 0, 0, 1);
    if (this.nightF > HEADLIGHT_AT && !this.headlight) {
      const lamp = meshPart('headlight', 0xfff6c0);
      lamp.position.y = 3;
      this.headlight = lamp;
      if (this.effects && this.effects.scene && typeof this.effects.scene.add === 'function') {
        this.effects.scene.add(lamp);
      }
    }
  }

  takeBanked() {
    const amount = this.banked;
    this.banked = 0;
    return amount;
  }

  get damageZones() {
    if (!this.car) return null;
    return this.car.damage ? { ...this.car.damage } : null;
  }

  enter(car) {
    if (!car) return null;
    car.parked = false;
    car.speed = 0;
    if (!car.damage) car.damage = { front: 0, side: 0, rear: 0 };
    this.car = car;
    this.driftScore = 0;
    this.drifting = false;
    this.chainTimer = 0;
    this.roll = 0;
    this.pitch = 0;
    this.lastSpeed = 0;
    this.vx = 0;
    this.vz = 0;
    return car;
  }

  exit() {
    const car = this.car;
    if (car && this.driftScore > 0) {
      this.banked += this.driftScore;
      this.bankedTotal += this.driftScore;
      this.driftScore = 0;
    }
    this.drifting = false;
    if (this.headlight) this.headlight.visible = false;
    if (this.audio && typeof this.audio.engine === 'function') this.audio.engine(null);
    this.car = null;
    return car;
  }

  chargeDamage(heading, impactDir) {
    if (!this.car) return null;
    let zone = 'front';
    const rel = Math.cos(impactDir - heading);
    if (rel < -0.5) zone = 'rear';
    else if (Math.abs(rel) < 0.5) zone = 'side';
    const zones = this.car.damage;
    zones[zone] = Math.min(100, (zones[zone] || 0) + 12);
    return zone;
  }

  damageMultipliers() {
    const z = this.car ? this.car.damage || { front: 0, side: 0, rear: 0 } : { front: 0, side: 0, rear: 0 };
    return {
      accel: 1 - (z.front / 100) * 0.5,
      steer: 1 - (z.side / 100) * 0.45,
      top: 1 - (z.rear / 100) * 0.4,
    };
  }

  edgeSpeed(x, z, heading) {
    const bound = WORLD_BOUND;
    const margin = EDGE_MARGIN;
    let cap = 1;
    const towardEast = Math.sin(heading) > 0.3 && x > bound - margin;
    const towardWest = Math.sin(heading) < -0.3 && x < -bound + margin;
    const towardSouth = Math.cos(heading) > 0.3 && z > bound - margin;
    const towardNorth = Math.cos(heading) < -0.3 && z < -bound + margin;
    if (towardEast || towardWest || towardSouth || towardNorth) {
      const dist = Math.min(
        towardEast ? bound - x : Infinity,
        towardWest ? x + bound : Infinity,
        towardSouth ? bound - z : Infinity,
        towardNorth ? z + bound : Infinity,
      );
      cap = clampD(dist / margin, 0.15, 1);
    }
    return cap;
  }

  update(dt, input, traffic) {
    const step = Number(dt) || 0;
    const car = this.car;
    if (!car) return;
    const axes = (input && typeof input.moveAxes === 'function') ? input.moveAxes() : { x: 0, y: 0 };
    const handbrake = !!(input && typeof input.down === 'function' ? input.down('handbrake') : input && input.handbrake);
    const throttle = -(axes.y || 0);
    const steerIn = axes.x || 0;
    const mult = this.damageMultipliers();
    const grip = 1 - this.rainF * 0.35;
    const topSpeed = (car.maxSpeed || 38) * mult.top * grip * this.edgeSpeed(car.x, car.z, car.heading);
    const accel = 22 * mult.accel * grip;
    const reversing = throttle < 0;
    const burnout = handbrake && throttle > 0.5 && Math.abs(car.speed) < 0.5;
    let targetSpeed = car.speed + throttle * accel * step;
    if (handbrake && !burnout) targetSpeed *= Math.max(0, 1 - step * 1.2);
    const braking = throttle < 0 && car.speed > 0.5;
    if (braking) targetSpeed = car.speed + throttle * accel * 1.6 * step;
    targetSpeed = clampD(targetSpeed, -topSpeed * 0.4, topSpeed);
    const steerSharp = clampD(1.4 - Math.abs(car.speed) / 30, 0.5, 1.4);
    const steerRate = 2.1 * steerSharp * mult.steer * (reversing ? -1 : 1);
    car.heading += steerIn * steerRate * step * clampD(Math.abs(car.speed) / 6, 0.2, 1);
    const fx = Math.sin(car.heading);
    const fz = Math.cos(car.heading);
    const desiredVx = fx * targetSpeed;
    const desiredVz = fz * targetSpeed;
    const slide = handbrake ? 0.92 : 0.35;
    this.vx += (desiredVx - this.vx) * Math.min(1, step * (handbrake ? 2.5 : 8));
    this.vz += (desiredVz - this.vz) * Math.min(1, step * (handbrake ? 2.5 : 8));
    if (handbrake) {
      const sideVx = this.vx - fx * (this.vx * fx + this.vz * fz);
      const sideVz = this.vz - fz * (this.vx * fx + this.vz * fz);
      this.vx -= sideVx * slide * step * 2;
      this.vz -= sideVz * slide * step * 2;
    }
    car.x += this.vx * step;
    car.z += this.vz * step;
    car.speed = Math.hypot(this.vx, this.vz) * Math.sign(targetSpeed || 1);
    const slideAngle = Math.abs(Math.atan2(this.vx * fz - this.vz * fx, this.vx * fx + this.vz * fz));
    const sliding = handbrake && Math.abs(car.speed) > DRIFT_MIN_SPEED && slideAngle > 0.25;
    if (sliding) {
      this.drifting = true;
      this.chainTimer = CHAIN_TIME;
      let gain = Math.abs(car.speed) * slideAngle * step * 12;
      if (this.rainF > 0.3) gain *= 1.25;
      this.driftScore += gain;
      if (this.effects && typeof this.effects.smoke === 'function' && Math.random() < step * 8) {
        this.effects.smoke(car.x, car.z);
      }
      if (this.audio && typeof this.audio.skid === 'function') {
        this.skidTimer -= step;
        if (this.skidTimer <= 0) { this.audio.skid(); this.skidTimer = 0.5; }
      }
    } else if (this.drifting) {
      this.chainTimer -= step;
      if (this.chainTimer <= 0) {
        this.banked += Math.round(this.driftScore);
        this.bankedTotal += Math.round(this.driftScore);
        this.driftScore = 0;
        this.drifting = false;
      }
    }
    if (burnout && this.effects && typeof this.effects.smoke === 'function') {
      this.effects.smoke(car.x, car.z);
    }
    const hitBuilding = this.city && typeof this.city.hitsBuilding === 'function'
      ? this.city.hitsBuilding(car.x, car.z)
      : (Math.abs(car.x) > 240 && Math.abs(car.z) < 200 ? true : false);
    if (hitBuilding) {
      const zone = this.chargeDamage(car.heading, Math.atan2(-this.vx, -this.vz));
      car.health = Math.max(0, (car.health ?? 100) - 10);
      this.vx *= -0.3;
      this.vz *= -0.3;
      car.speed *= 0.4;
      this.driftScore = 0;
      this.drifting = false;
      if (this.audio && typeof this.audio.crash === 'function') this.audio.crash();
    }
    car.x = clampD(car.x, -WORLD_BOUND, WORLD_BOUND);
    car.z = clampD(car.z, -WORLD_BOUND, WORLD_BOUND);
    if (traffic && traffic.length) {
      for (const other of traffic) {
        if (!other || other === car) continue;
        const d = Math.hypot(other.x - car.x, other.z - car.z);
        if (d < 4 && d > 0.01) {
          const push = (4 - d) / 2;
          const nx = (car.x - other.x) / d;
          const nz = (car.z - other.z) / d;
          car.x += nx * push;
          car.z += nz * push;
          car.speed *= 0.85;
          if (car.damage) car.damage.side = Math.min(100, (car.damage.side || 0) + 2);
          if (this.audio && typeof this.audio.thud === 'function') this.audio.thud();
        }
      }
    }
    const gx = (this.city.garage && this.city.garage.x) ?? GARAGE_X;
    const gz = (this.city.garage && this.city.garage.z) ?? GARAGE_Z;
    const nearGarage = Math.hypot(car.x - gx, car.z - gz) < 12;
    if (nearGarage && Math.abs(car.speed) < 1) {
      car.health = Math.min(100, (car.health ?? 100) + 4 * step);
      if (car.health >= 100 && car.damage) car.damage = { front: 0, side: 0, rear: 0 };
    }
    if (reversing && Math.abs(car.speed) > 1) {
      this.beepTimer -= step;
      if (this.beepTimer <= 0) {
        if (this.audio && typeof this.audio.beep === 'function') this.audio.beep();
        this.beepTimer = 0.5;
      }
    }
    car.smoke = (car.health ?? 100) <= 40;
    if (this.headlight && this.nightF > HEADLIGHT_AT) {
      this.headlight.visible = true;
      this.headlight.position.x = car.x + Math.sin(car.heading) * 3;
      this.headlight.position.z = car.z + Math.cos(car.heading) * 3;
    }
    if (this.audio && typeof this.audio.engine === 'function') {
      this.audio.engine(Math.abs(car.speed) / Math.max(1, topSpeed));
    }
    if (car.mesh) {
      car.mesh.position.x = car.x;
      car.mesh.position.z = car.z;
      car.mesh.rotation.y = car.heading;
      const accelNow = (car.speed - this.lastSpeed) / Math.max(step, 0.001);
      this.roll += ((steerIn * -0.06 * clampD(Math.abs(car.speed) / 20, 0, 1)) - this.roll) * Math.min(1, step * 6);
      this.pitch += ((clampD(accelNow * 0.001, -0.05, 0.05)) - this.pitch) * Math.min(1, step * 6);
      car.mesh.rotation.z = this.roll;
      car.mesh.rotation.x = this.pitch;
    }
    this.lastSpeed = car.speed;
  }

  placeCamera(camera, car) {
    if (!camera || !car) return;
    const target = car || this.car;
    if (!target) return;
    const dist = 8 + Math.abs(target.speed || 0) * 0.15;
    const cx = target.x - Math.sin(target.heading) * dist;
    const cz = target.z - Math.cos(target.heading) * dist;
    camera.position.x += (cx - camera.position.x) * 0.08;
    camera.position.z += (cz - camera.position.z) * 0.08;
    camera.position.y += (4.2 - camera.position.y) * 0.08;
    camera.rotation.y = dampAngle(camera.rotation.y || 0, target.heading, 4, 0.016);
    if (typeof camera.lookAt === 'function') camera.lookAt(target.x, 1.5, target.z);
  }

  snapCamera(camera, car) {
    if (!camera || !car) return;
    const dist = 8;
    camera.position.x = car.x - Math.sin(car.heading) * dist;
    camera.position.z = car.z - Math.cos(car.heading) * dist;
    camera.position.y = 4.2;
    camera.rotation.y = car.heading;
    if (typeof camera.lookAt === 'function') camera.lookAt(car.x, 1.5, car.z);
  }
}
