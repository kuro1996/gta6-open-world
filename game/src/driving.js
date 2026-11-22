// Solara Nights — arcade car physics: acceleration, steering that tightens at
// low speed, handbrake drift, building collision and traffic bumps.
// Round 4 attempt 3 adds three systems on top of the arcade base:
//   - Drift scoring: slide the car sideways at speed and the slide banks
//     points into cash when it ends cleanly.
//   - Suspension: the body rolls into corners and pitches under braking,
//     so the car reads as a car instead of a sliding box.
//   - Damage zones: a wall hit is charged to the side that took it, and
//     each zone bites into the handling until the garage patches it up.
import * as THREE from 'three';
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
    // Night factor 0..1 (from main.js): headlights switch on past 0.25.
    this.nightF = 0;
    this.headlight = null;
    this.beepTimer = 0;
    // Rain factor 0..1 (from main.js): wet roads cost grip — slower
    // acceleration and longer braking, so a rainy chase feels different.
    this.rainF = 0;
    // Attempt 3 — drift state: the live chain score, the chain timer, and
    // the banked total. takeBanked() hands the banked points to main.js
    // (which pays them out as cash) and resets the bank to zero.
    this.driftScore = 0;
    this.drifting = false;
    this._driftChainTimer = 0;
    this._banked = 0;
    this.bankedTotal = 0;
    // Attempt 3 — suspension state: smoothed roll/pitch for the body, and
    // the last frame's acceleration so the pitch follows braking.
    this._roll = 0;
    this._pitch = 0;
    this._lastSpeed = 0;
  }

  /** Rain factor from the weather cycle; 0 is dry asphalt, 1 is a shower. */
  setRain(f) {
    this.rainF = Math.max(0, Math.min(1, f));
  }

  /** Night factor from the day/night cycle; the beam follows the car. */
  setNight(f) {
    this.nightF = f;
    if (f > WORLD.headlightNightMin && !this.headlight && this.effects && this.effects.scene) {
      this.headlight = new THREE.SpotLight(0xfff2c8, 60, 55, 0.55, 0.5, 1.2);
      this.effects.scene.add(this.headlight);
      this.effects.scene.add(this.headlight.target);
    }
  }

  /** Points banked since the last payout; resets the bank to zero. */
  takeBanked() {
    const banked = this._banked;
    this._banked = 0;
    return banked;
  }

  /** Damage zones of the car being driven, or null on foot. */
  get damageZones() {
    return this.car && this.car.damage ? { ...this.car.damage } : null;
  }

  enter(car) {
    this.car = car;
    car.parked = false;
    car.speed = 0;
    // A car that has never been driven has no damage record yet; the zones
    // start clean and only wall hits charge them (see update()).
    if (!car.damage) car.damage = { front: 0, side: 0, rear: 0 };
    this.driftScore = 0;
    this.drifting = false;
    this._driftChainTimer = 0;
    this._roll = 0;
    this._pitch = 0;
    this._lastSpeed = 0;
    return car;
  }

  exit() {
    const car = this.car;
    this.car = null;
    // A chain left hanging banks itself on exit: the player should not
    // lose drift points for stepping out of the car at the garage door.
    if (this.driftScore > 0) {
      this._banked += Math.floor(this.driftScore);
      this.bankedTotal += Math.floor(this.driftScore);
      this.driftScore = 0;
    }
    this.drifting = false;
    if (this.headlight) this.headlight.visible = false;
    if (this.audio) this.audio.engine(null);
    return car;
  }

  /** Split a wall impact between the damage zones by the direction the car
   * was travelling when it hit: nose-first charges the front, a sideways
   * slide charges the side, and reversing into the wall charges the rear.
   * Returns the zone that took the hit, for the HUD. */
  _chargeDamage(car, amount, vx, vz) {
    if (!car.damage) car.damage = { front: 0, side: 0, rear: 0 };
    const fx = Math.sin(car.heading);
    const fz = Math.cos(car.heading);
    const forward = (vx * fx + vz * fz) / Math.max(1, Math.hypot(vx, vz));
    const lateral = Math.abs((vx * fz - vz * fx) / Math.max(1, Math.hypot(vx, vz)));
    let zone = 'front';
    if (forward < -0.4) zone = 'rear';
    else if (lateral > 0.55) zone = 'side';
    car.damage[zone] = Math.min(100, car.damage[zone] + amount);
    return zone;
  }

  /** Handling multipliers from the damage zones: front damage costs
   * acceleration, side damage costs steering, rear damage costs top
   * speed. A fresh car multiplies by 1 everywhere. */
  _damageMultipliers(car) {
    const d = car.damage || { front: 0, side: 0, rear: 0 };
    return {
      accel: 1 - WORLD.damageFrontAccel * (d.front / 100),
      steer: 1 - WORLD.damageSideSteer * (d.side / 100),
      top: 1 - WORLD.damageRearTop * (d.rear / 100),
    };
  }

  update(dt, input, traffic) {
    const car = this.car;
    if (!car) return;
    const axes = input.moveAxes();
    const handbrake = input.down('Space');
    // Burnout: handbrake + throttle from a standstill spins the wheels and
    // lays smoke without launching the car — a standing start with theatre.
    // The handbrake's speed bleed is skipped while burning out, or the car
    // could never build the revs to smoke.
    const burnout = handbrake && axes.forward > 0 && Math.abs(car.speed) < 2;
    // Wet roads (attempt 2): acceleration falls toward rainGrip and
    // braking stretches toward rainBrake, so the same car stops later in
    // a shower than in the sun.
    const grip = 1 - (1 - WORLD.rainGrip) * this.rainF;
    const brakeMult = 1 + (WORLD.rainBrake - 1) * this.rainF;
    // Damage zones (attempt 3): a wrecked front end accelerates slower, a
    // bent side steers worse, a crushed rear tops out lower.
    const dmg = this._damageMultipliers(car);
    const accel = axes.forward > 0 ? WORLD.carAccel * grip * dmg.accel : axes.forward < 0 ? -WORLD.carBrake * 0.7 * (2 - brakeMult) : 0;
    const maxSpeed = car.maxSpeed * dmg.top;
    if (axes.forward > 0) car.speed = Math.min(maxSpeed, car.speed + accel * dt);
    else if (axes.forward < 0) {
      car.speed = car.speed > 0.5 ? Math.max(0, car.speed + accel * dt) : Math.max(-WORLD.carReverseMax, car.speed + accel * dt);
    } else {
      car.speed -= Math.sign(car.speed) * Math.min(Math.abs(car.speed), 10 * dt);
    }
    if (handbrake && !burnout) car.speed -= Math.sign(car.speed) * Math.min(Math.abs(car.speed), 22 * dt);
    // Edge governor: within edgeMargin of a world bound, cap forward speed
    // while the car points at that bound — a full-speed U-turn near the
    // sand's end then tightens instead of sweeping out past the map edge.
    // The cap ramps from edgeSpeed at the bound back to full speed at the
    // margin, and only bites when the car is actually heading for the
    // bound, so a fast run parallel to the beach is unaffected.
    const edgeCap = this._edgeSpeedCap(car);
    if (car.speed > edgeCap) car.speed = edgeCap;
    // Steering: sharper when slow, reversed when reversing. Wet roads make
    // the steering a touch lazier too — the same input turns the car less
    // in a shower, so the player feels the rain through the wheel.
    // A bent side (attempt 3) dulls the steering further.
    const speedFactor = clamp(Math.abs(car.speed) / 14, 0, 1);
    const steerTarget = -axes.strafe * WORLD.carTurn * (0.35 + 0.65 * (1 - speedFactor * 0.6)) * (1 - 0.12 * this.rainF) * dmg.steer;
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
    // Attempt 3 — drift scoring: the slide angle is the angle between the
    // velocity the car actually has and the direction its nose points.
    // Above the speed and angle floors, with the handbrake held, the slide
    // scores — faster and more sideways scores faster, and the chain keeps
    // growing while the player links slides. Let go of the slide for
    // driftChainTime and the chain banks into cash (main.js pays it out).
    const speedNow = Math.hypot(this._vx, this._vz);
    const velAngle = speedNow > 0.5 ? Math.atan2(this._vx, this._vz) : car.heading;
    let slideAngle = velAngle - car.heading;
    while (slideAngle > Math.PI) slideAngle -= Math.PI * 2;
    while (slideAngle <= -Math.PI) slideAngle += Math.PI * 2;
    const sliding = handbrake && speedNow > WORLD.driftMinSpeed && Math.abs(slideAngle) > WORLD.driftMinAngle;
    this.drifting = sliding;
    if (sliding) {
      // Second pass: wet roads reward the slide — drifting on rain-slick
      // asphalt scores 25% faster (WORLD.driftWetBonus).
      const wetBonus = this.rainF > 0.3 ? WORLD.driftWetBonus : 1;
      this.driftScore += WORLD.driftScoreRate * Math.abs(slideAngle) * wetBonus * dt;
      this._driftChainTimer = WORLD.driftChainTime;
    } else if (this.driftScore > 0) {
      this._driftChainTimer -= dt;
      if (this._driftChainTimer <= 0) {
        const banked = Math.floor(this.driftScore);
        this._banked += banked;
        this.bankedTotal += banked;
        this.driftScore = 0;
      }
    }
    // Buildings.
    const fixed = this.city.collideCircle(car.x, car.z, WORLD.carRadius);
    if (fixed.hit && Math.abs(car.speed) > 6) {
      // One graze costs at most 10 HP: at 48 m/s the raw formula would
      // charge ~29 HP for a single wall kiss, totalling a car in two
      // brushes during a chase (found by the round-4 headless playtest:
      // the Comet GT reached 0 HP mid-escape in mission 2).
      const hitAmount = Math.min(10, Math.abs(car.speed) * 0.6);
      car.health = Math.max(0, car.health - hitAmount);
      // Attempt 3 — the same hit charges the damage zone that took it.
      this._chargeDamage(car, hitAmount, this._vx, this._vz);
      car.speed *= 0.45;
      if (this.audio) this.audio.crash();
      if (this.effects) this.effects.burst(car.x, 1, car.z, 0xffcc66, 10, 4);
      this._vx *= 0.4;
      this._vz *= 0.4;
      // A wall hit kills a drift chain outright: sliding into a building
      // is not a drift, and the points should not survive the crash.
      if (this.driftScore > 0) {
        this.driftScore = 0;
        this._driftChainTimer = 0;
      }
      this.drifting = false;
    }
    car.x = fixed.x;
    car.z = fixed.z;
    // World edge, hard backstop: the car can never leave the map, even at
    // full speed. Bleed off velocity on the clamp so it slides along the
    // edge instead of grinding against it.
    const bx = clamp(car.x, WORLD.boundMinX, WORLD.boundX);
    const bz = clamp(car.z, WORLD.boundMinZ, WORLD.boundZ);
    if (bx !== car.x || bz !== car.z) {
      car.x = bx;
      car.z = bz;
      this._vx *= 0.3;
      this._vz *= 0.3;
      car.speed *= 0.6;
    }
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
            // A traffic bump at speed is a side hit: it charges the side
            // zone a little, so repeated shunts still wear the car down.
            this._chargeDamage(car, 2, this._vx, this._vz);
            if (this.audio) this.audio.thud();
            if (this.effects) this.effects.sparks(car.x, 1, car.z);
          }
        }
      }
    }
    // Voss Garage repairs your ride: park by the garage door, nearly
    // stopped, and the crew patches the car up — so a chase-wrecked Comet GT
    // can still make it home instead of being abandoned at 0 HP.
    // Attempt 3: a full repair (health back to 100) also zeroes the damage
    // zones, so the handling comes back with the paint.
    const door = this.city.garageDoor;
    if (door && car.health < 100 && Math.abs(car.speed) < 1) {
      const d = Math.hypot(car.x - door.x, car.z - door.z);
      if (d < 14) {
        car.health = Math.min(100, car.health + 4 * dt);
        if (car.health >= 100 && car.damage) car.damage = { front: 0, side: 0, rear: 0 };
      }
    }
    // Tire smoke while drifting at speed.
    this.skidTimer -= dt;
    if (handbrake && Math.abs(car.speed) > 10 && this.skidTimer <= 0) {
      this.skidTimer = 0.12;
      if (this.effects) this.effects.smoke(car.x - Math.sin(car.heading) * 1.6, 0.4, car.z - Math.cos(car.heading) * 1.6);
      if (this.audio) this.audio.skid();
    }
    // A scoring drift lays twice the smoke: the chain should look as good
    // as it pays, and the extra smoke is the tell that points are ticking.
    if (sliding && this.skidTimer <= 0) {
      this.skidTimer = 0.08;
      if (this.effects) {
        this.effects.smoke(car.x - Math.sin(car.heading) * 1.6, 0.4, car.z - Math.cos(car.heading) * 1.6);
        this.effects.smoke(car.x + Math.cos(car.heading) * 1.2, 0.4, car.z - Math.sin(car.heading) * 1.2);
      }
    }
    // Burnout smoke from the rear wheels, with the engine revving high
    // even though the car barely moves.
    if (burnout && this.skidTimer <= 0) {
      this.skidTimer = 0.09;
      if (this.effects) this.effects.smoke(car.x - Math.sin(car.heading) * 1.6, 0.4, car.z - Math.cos(car.heading) * 1.6);
      if (this.audio) this.audio.skid();
    }
    // Reverse warning beep, at most twice a second, while backing up.
    this.beepTimer -= dt;
    if (car.speed < -0.5 && this.beepTimer <= 0) {
      this.beepTimer = 0.5;
      if (this.audio) this.audio.beep();
    }
    if (car.health <= 40 && !car.smoke) {
      car.smoke = true;
      if (this.effects) this.effects.smoke(car.x, 1.4, car.z);
    }
    // Headlights: at night the beam sits at the car's nose and points down
    // the road, so a night chase is lit by the player's own car.
    if (this.headlight) {
      const on = this.nightF > WORLD.headlightNightMin;
      this.headlight.visible = on;
      if (on) {
        this.headlight.position.set(car.x + Math.sin(car.heading) * 2.4, 1.1, car.z + Math.cos(car.heading) * 2.4);
        this.headlight.target.position.set(car.x + Math.sin(car.heading) * 30, 0.4, car.z + Math.cos(car.heading) * 30);
      }
    }
    if (this.audio) this.audio.engine(burnout ? 0.7 : Math.abs(car.speed) / car.maxSpeed);
    syncCarMesh(car);
    // Attempt 3 — suspension: the body rolls into the steering and pitches
    // under acceleration and braking. The targets are smoothed so the car
    // leans instead of snapping, and they ease back to level at a stop.
    // syncCarMesh only sets rotation.y, so the x/z lean survives it.
    const accelNow = (car.speed - this._lastSpeed) / Math.max(dt, 0.001);
    this._lastSpeed = car.speed;
    const rollTarget = clamp(-car.steer * Math.abs(car.speed) * 0.004, -0.09, 0.09);
    const pitchTarget = clamp(-accelNow * 0.0016, -0.06, 0.06);
    this._roll += (rollTarget - this._roll) * Math.min(1, dt * 6);
    this._pitch += (pitchTarget - this._pitch) * Math.min(1, dt * 6);
    car.mesh.rotation.z = this._roll;
    car.mesh.rotation.x = this._pitch;
  }

  /** Highest forward speed allowed this frame by the edge governor. */
  _edgeSpeedCap(car) {
    const m = WORLD.edgeMargin;
    let cap = Infinity;
    const toward = (dist, outward) => {
      if (dist < m && outward > 0.3) {
        const t = clamp(Math.max(0, dist) / m, 0, 1);
        cap = Math.min(cap, WORLD.edgeSpeed + (car.maxSpeed - WORLD.edgeSpeed) * t);
      }
    };
    toward(WORLD.boundX - car.x, Math.sin(car.heading));
    toward(car.x - WORLD.boundMinX, -Math.sin(car.heading));
    toward(WORLD.boundZ - car.z, Math.cos(car.heading));
    toward(car.z - WORLD.boundMinZ, -Math.cos(car.heading));
    return cap;
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
