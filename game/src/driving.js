// Solara Nights — arcade car physics: acceleration, steering that tightens at
// low speed, handbrake drift, building collision and traffic bumps.
import { WORLD } from './config.js';
import { clamp, dampAngle } from './random.js';
import { syncCarMesh } from './vehicles.js';

export class Driving {
  constructor(city, audio, effects) {
    this.city = city;
    this.audio = audio;
    this.effects = effects;
    this.car = null;
    this.skidTimer = 0;
  }

  enter(car) {
    this.car = car;
    car.parked = false;
    car.speed = 0;
    return car;
  }

  exit() {
    const car = this.car;
    this.car = null;
    if (this.audio) this.audio.engine(null);
    return car;
  }

  update(dt, input, traffic) {
    const car = this.car;
    if (!car) return;
    const axes = input.moveAxes();
    const handbrake = input.down('Space');
    const accel = axes.forward > 0 ? WORLD.carAccel : axes.forward < 0 ? -WORLD.carBrake * 0.7 : 0;
    const maxSpeed = car.maxSpeed;
    if (axes.forward > 0) car.speed = Math.min(maxSpeed, car.speed + accel * dt);
    else if (axes.forward < 0) {
      car.speed = car.speed > 0.5 ? Math.max(0, car.speed + accel * dt) : Math.max(-WORLD.carReverseMax, car.speed + accel * dt);
    } else {
      car.speed -= Math.sign(car.speed) * Math.min(Math.abs(car.speed), 10 * dt);
    }
    if (handbrake) car.speed -= Math.sign(car.speed) * Math.min(Math.abs(car.speed), 22 * dt);
    // Steering: sharper when slow, reversed when reversing.
    const speedFactor = clamp(Math.abs(car.speed) / 14, 0, 1);
    const steerTarget = -axes.strafe * WORLD.carTurn * (0.35 + 0.65 * (1 - speedFactor * 0.6));
    const steerRate = handbrake ? 4.5 : 3.2;
    car.steer += clamp(steerTarget - car.steer, -steerRate * dt, steerRate * dt);
    const turnSign = car.speed >= 0 ? 1 : -1;
    car.heading += car.steer * (Math.abs(car.speed) / Math.max(6, Math.abs(car.speed))) * turnSign * dt * clamp(Math.abs(car.speed) / 8, 0, 1);
    // Drift: with the handbrake the car slides sideways a touch.
    const drift = handbrake ? 0.35 : 0.92;
    const fx = Math.sin(car.heading);
    const fz = Math.cos(car.heading);
    let vx = fx * car.speed;
    let vz = fz * car.speed;
    if (this._vx === undefined) {
      this._vx = vx;
      this._vz = vz;
    }
    this._vx += (vx - this._vx) * Math.min(1, drift * 8 * dt);
    this._vz += (vz - this._vz) * Math.min(1, drift * 8 * dt);
    car.x += this._vx * dt;
    car.z += this._vz * dt;
    // Buildings.
    const fixed = this.city.collideCircle(car.x, car.z, WORLD.carRadius);
    if (fixed.hit && Math.abs(car.speed) > 6) {
      car.health = Math.max(0, car.health - Math.abs(car.speed) * 0.6);
      car.speed *= 0.45;
      if (this.audio) this.audio.crash();
      if (this.effects) this.effects.burst(car.x, 1, car.z, 0xffcc66, 10, 4);
      this._vx *= 0.4;
      this._vz *= 0.4;
    }
    car.x = fixed.x;
    car.z = fixed.z;
    // Traffic bumps.
    if (traffic) {
      for (const other of traffic.cars) {
        const dx = car.x - other.x;
        const dz = car.z - other.z;
        const d = Math.hypot(dx, dz);
        if (d > 0.01 && d < 4.2) {
          const push = (4.2 - d) / 2;
          car.x += (dx / d) * push;
          car.z += (dz / d) * push;
          other.x -= (dx / d) * push;
          other.z -= (dz / d) * push;
          if (Math.abs(car.speed) > 5) {
            car.speed *= 0.7;
            if (this.audio) this.audio.thud();
            if (this.effects) this.effects.burst(car.x, 1, car.z, 0xffffff, 6, 3);
          }
        }
      }
    }
    // Tire smoke while drifting at speed.
    this.skidTimer -= dt;
    if (handbrake && Math.abs(car.speed) > 10 && this.skidTimer <= 0) {
      this.skidTimer = 0.12;
      if (this.effects) this.effects.smoke(car.x - Math.sin(car.heading) * 1.6, 0.4, car.z - Math.cos(car.heading) * 1.6);
    }
    if (car.health <= 40 && !car.smoke) {
      car.smoke = true;
      if (this.effects) this.effects.smoke(car.x, 1.4, car.z);
    }
    if (this.audio) this.audio.engine(Math.abs(car.speed) / car.maxSpeed);
    syncCarMesh(car);
  }

  /** Chase camera behind the car. */
  placeCamera(camera, dt) {
    const car = this.car;
    if (!car) return;
    const back = 9.5 + Math.abs(car.speed) * 0.06;
    const tx = car.x - Math.sin(car.heading) * back;
    const tz = car.z - Math.cos(car.heading) * back;
    const targetYaw = Math.atan2(camera.position.x - car.x, camera.position.z - car.z);
    const desiredYaw = car.heading + Math.PI;
    const yaw = dampAngle(targetYaw, desiredYaw, 2.2, dt);
    const cx = car.x + Math.sin(yaw) * back;
    const cz = car.z + Math.cos(yaw) * back;
    camera.position.x += (cx - camera.position.x) * Math.min(1, dt * 6);
    camera.position.y += (4.2 - camera.position.y) * Math.min(1, dt * 6);
    camera.position.z += (cz - camera.position.z) * Math.min(1, dt * 6);
    if (camera.position.y < 1.2) camera.position.y = 1.2;
    camera.lookAt(car.x + Math.sin(car.heading) * 6, 1.4, car.z + Math.cos(car.heading) * 6);
  }

  snapCamera(camera) {
    const car = this.car;
    if (!car) return;
    camera.position.set(
      car.x - Math.sin(car.heading) * 9.5,
      4.2,
      car.z - Math.cos(car.heading) * 9.5,
    );
    camera.lookAt(car.x, 1.4, car.z);
  }
}
