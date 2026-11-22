// Solara Nights — the wanted system: heat builds with crimes and cools when the
// player lays low; police cars chase and ram, foot cops chase and bust on foot.
// Round 4 attempt 3 adds the top of the wanted ladder: at 5 stars the PD
// sends a helicopter that orbits Ria and keeps her lit, so the heat never
// cools while it watches; at 4+ stars the PD parks roadblocks across the
// road ahead of her; and the chase cars stop queuing on her bumper — the
// lead car PITs while the wing cars flank left and right to cut her off.
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

// --- Police helicopter (attempt 3) ------------------------------------------
// A small chopper: dark body, tail boom, a spinning two-blade rotor, and a
// searchlight that tracks the player. It never shoots — its job is to watch:
// while it is overhead, the wanted heat cannot cool, so a 5-star escape has
// to break line of sight or drop the stars another way. The rotor spins
// faster as it closes in, and the spotlight cone is a translucent mesh so
// the beam reads in the dark as well as in the day.
function makeHeliMesh(scene) {
  const group = new THREE.Group();
  const paint = new THREE.MeshLambertMaterial({ color: 0x1e3a6e });
  const dark = new THREE.MeshLambertMaterial({ color: 0x14264a });
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.6, 4.2), paint);
  body.position.y = 0;
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.9, 10, 8), new THREE.MeshLambertMaterial({ color: 0x9fc6e8 }));
  nose.position.set(0, -0.2, 2.1);
  const boom = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 4.4), dark);
  boom.position.set(0, 0.3, -3.6);
  const tailFin = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.4, 0.8), dark);
  tailFin.position.set(0, 0.8, -5.6);
  const skidL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 3.2), dark);
  skidL.position.set(-1.1, -1.1, 0);
  const skidR = skidL.clone();
  skidR.position.x = 1.1;
  // The rotor is a group so it can spin around Y without moving the body.
  const rotor = new THREE.Group();
  rotor.position.y = 1.1;
  const bladeMat = new THREE.MeshBasicMaterial({ color: 0x222226 });
  const bladeA = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 9.5), bladeMat);
  const bladeB = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.08, 0.35), bladeMat);
  rotor.add(bladeA, bladeB);
  // Searchlight: a real spotlight aimed at the player, plus a translucent
  // cone so the beam itself is visible at night.
  const spot = new THREE.SpotLight(0xfff6c8, 180, WORLD.heliSpotRange, 0.32, 0.45, 1.1);
  spot.position.set(0, -0.8, 0);
  const coneGeo = new THREE.ConeGeometry(5.5, WORLD.heliSpotRange, 12, 1, true);
  const coneMat = new THREE.MeshBasicMaterial({
    color: 0xfff2c8, transparent: true, opacity: 0.07, side: THREE.DoubleSide, depthWrite: false,
  });
  const cone = new THREE.Mesh(coneGeo, coneMat);
  // The cone hangs straight down from the chopper: its apex sits at the
  // spotlight (the cone's own +Y apex is already at the top, so no
  // rotation is needed) and its base reaches the street. The beam stays
  // vertical while the real spotlight tracks the player — the chopper
  // orbits almost directly overhead, so the difference never reads.
  cone.position.y = -WORLD.heliSpotRange / 2;
  group.add(body, nose, boom, tailFin, skidL, skidR, rotor, spot, cone);
  group.userData = { rotor, spot, cone };
  scene.add(group);
  scene.add(spot.target);
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
    this.hornTimer = 0;
    // Round 4 attempt 2 — radio alert: when one foot cop gets close enough
    // to see Ria clearly, he radios the rest of the force. Every other cop
    // then sprints to an intercept point ahead of her for a few seconds
    // instead of all of them trailing behind in a line.
    this.alertTimer = 0;
    this.alertX = 0;
    this.alertZ = 0;
    // Global ram immunity: after ANY police car rams, no car can ram again
    // for 2 s. The per-car cooldown alone lets two or three cars take
    // turns ramming every 1.5 s, which totals a car mid-chase even with
    // the per-hit damage capped. Re-verified attempt 2: the ram branch
    // below still costs speed only (playerCar.speed *= 0.82, rammer *= 0.55)
    // — no HP is ever subtracted by a ram.
    this.ramImmune = 0;
    // Attempt 3 — helicopter: one chopper at 5 stars, with its orbit angle
    // and a rotor that spins up as it closes on the player.
    this.heli = null;
    this.heliAngle = 0;
    this.heliRotor = 0;
    // Attempt 3 — roadblocks: up to two parked cruisers across the road
    // ahead of the player at 4+ stars, with a respawn timer so a cleared
    // block is set again after a breather.
    this.roadblocks = [];
    this.roadblockTimer = 0;
  }

  get count() {
    return this.cars.length + this.cops.length + (this.heli ? 1 : 0);
  }

  /** True while the helicopter is overhead at 5 stars. */
  get heliActive() {
    return !!this.heli;
  }

  _spawnCarNear(x, z) {
    const mesh = makeCarMesh('police', 0xf2f2ee);
    this.scene.add(mesh);
    const car = makeCarState(mesh, 'police', 40);
    // Ram cooldown: a police car can only ram once per 1.5 s, so a chase
    // stays a chase instead of a bumper glued to the player cutting speed
    // 18% every frame until the car can never pull away.
    car.ramTimer = 0;
    // Attempt 3 — coordination role: the first car is the lead (it PITs),
    // the rest are wings that flank left and right instead of queuing.
    car.role = this.cars.length === 0 ? 'lead' : (this.cars.length % 2 === 1 ? 'wing-left' : 'wing-right');
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

  // --- Helicopter (attempt 3) -------------------------------------------------
  _spawnHeli(px, pz) {
    const mesh = makeHeliMesh(this.scene);
    this.heli = { mesh, x: px + WORLD.heliOrbitRadius, z: pz, y: WORLD.heliHeight };
    this.heliAngle = 0;
    if (this.audio) this.audio.radioBlip();
    return this.heli;
  }

  _removeHeli() {
    if (!this.heli) return;
    this.scene.remove(this.heli.mesh);
    if (this.heli.mesh.userData.spot) this.scene.remove(this.heli.mesh.userData.spot.target);
    this.heli = null;
  }

  _updateHeli(dt, px, pz, playerCar) {
    if (!this.heli) return;
    // Orbit the player: the chopper circles slowly, always keeping the
    // spotlight on Ria, and it closes the orbit a little when she is in a
    // car (a moving target is harder to hold from far out).
    this.heliAngle += WORLD.heliSpeed * dt;
    const radius = playerCar ? WORLD.heliOrbitRadius * 0.8 : WORLD.heliOrbitRadius;
    const hx = px + Math.sin(this.heliAngle) * radius;
    const hz = pz + Math.cos(this.heliAngle) * radius;
    this.heli.x = hx;
    this.heli.z = hz;
    const mesh = this.heli.mesh;
    mesh.position.set(hx, WORLD.heliHeight, hz);
    mesh.rotation.y = Math.atan2(px - hx, pz - hz);
    // Rotor spins up with closing speed: a distant orbit idles, a tight
    // one whirs. The spin is purely visual — the chopper never attacks.
    this.heliRotor += dt * (14 + (playerCar ? Math.abs(playerCar.speed) * 0.25 : 0));
    mesh.userData.rotor.rotation.y = this.heliRotor;
    // The spotlight tracks the player exactly; the cone hangs vertically
    // under the chopper, so the beam sweeps the street as it orbits.
    const spot = mesh.userData.spot;
    spot.target.position.set(px, 0, pz);
    // A faint rotor wash: dust kicked up under the beam every few seconds.
    if (this.effects && Math.random() < dt * 0.5) {
      this.effects.burst(px, 0.5, pz, 0xc8c8b8, 3, 3);
    }
  }

  // --- Roadblocks (attempt 3) -------------------------------------------------
  _spawnRoadblock(px, pz, heading) {
    // Two cruisers parked across the road ahead of the player, nose to
    // nose with a gap between them too small to thread at speed. They sit
    // still: their job is to be hit, not to chase.
    const fx = Math.sin(heading);
    const fz = Math.cos(heading);
    // Perpendicular to the player's direction of travel.
    const rx = Math.cos(heading);
    const rz = -Math.sin(heading);
    const bx = px + fx * WORLD.roadblockAhead;
    const bz = pz + fz * WORLD.roadblockAhead;
    for (const side of [-1, 1]) {
      const mesh = makeCarMesh('police', 0xf2f2ee);
      this.scene.add(mesh);
      const car = makeCarState(mesh, 'police', 0);
      car.x = clamp(bx + rx * side * WORLD.roadblockGap, -CITY_HALF, CITY_HALF);
      car.z = clamp(bz + rz * side * WORLD.roadblockGap, -CITY_HALF, CITY_HALF);
      const fixed = this.city.collideCircle(car.x, car.z, 2.2);
      car.x = fixed.x;
      car.z = fixed.z;
      // Parked sideways across the road, facing the oncoming player.
      car.heading = Math.atan2(-fx, -fz) + Math.PI / 2;
      car.speed = 0;
      car.roadblock = true;
      syncCarMesh(car);
      this.roadblocks.push(car);
    }
    // Flash their light bars from the moment they park, so the block reads
    // as a block before the player is on top of it.
    this.flashTimer = 0;
  }

  _clearRoadblocks() {
    for (const car of this.roadblocks) this.scene.remove(car.mesh);
    this.roadblocks = [];
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
    // Helicopter (attempt 3): called in at 5 stars, sent home below it.
    // While it is overhead the heat cannot cool — the update below treats
    // the heli as a unit that is always near.
    if (wanted.level >= WORLD.heliLevel && !this.heli) this._spawnHeli(px, pz);
    else if (wanted.level < WORLD.heliLevel && this.heli) this._removeHeli();
    this._updateHeli(dt, px, pz, playerCar);
    // Roadblocks (attempt 3): at 4+ stars, set a block ahead of the player
    // every roadblockRespawn seconds; clear it when the heat drops below 4
    // or the player gets well past it.
    if (wanted.level >= WORLD.roadblockLevel) {
      this.roadblockTimer -= dt;
      // Second pass: a roadblock only makes sense when the player is
      // actually moving — parking two cruisers ahead of a parked car just
      // wastes the block and reads as a bug.
      const playerMoving = playerCar ? Math.abs(playerCar.speed) > 5 : true;
      if (this.roadblocks.length === 0 && this.roadblockTimer <= 0 && playerMoving) {
        const heading = playerCar ? playerCar.heading : player.heading;
        this._spawnRoadblock(px, pz, heading);
        this.roadblockTimer = WORLD.roadblockRespawn;
      }
      if (this.roadblocks.length > 0) {
        const d = distance2D(this.roadblocks[0].x, this.roadblocks[0].z, px, pz);
        if (d > WORLD.roadblockClearDist) this._clearRoadblocks();
      }
    } else if (this.roadblocks.length > 0) {
      this._clearRoadblocks();
    }
    let near = !!this.heli;
    for (const car of this.cars) {
      // The force gets faster with the heat: a 5-star chase tops out at the
      // config's policeTopSpeed instead of the flat 40 of a 1-star tail.
      car.maxSpeed = Math.min(40 + wanted.level * 2, WORLD.policeTopSpeed);
      // Target point by role (attempt 3): the lead car PITs at 3+ stars,
      // aiming at the player's rear quarter to spin the car; the wing cars
      // flank, aiming at a point beside the player so the force closes
      // from three sides instead of queuing on the bumper.
      let tx = px;
      let tz = pz;
      if (playerCar && wanted.level >= WORLD.policePitLevel && car.role === 'lead') {
        const side = Math.sin(performance.now() * 0.001 + car.x) > 0 ? 1 : -1;
        tx = px - Math.sin(playerCar.heading) * 2.5 + Math.cos(playerCar.heading) * side * 2;
        tz = pz - Math.cos(playerCar.heading) * 2.5 - Math.sin(playerCar.heading) * side * 2;
      } else if (playerCar && wanted.level >= WORLD.policeWingLevel && car.role !== 'lead') {
        const side = car.role === 'wing-left' ? -1 : 1;
        const off = WORLD.policeWingOffset;
        tx = px + Math.cos(playerCar.heading) * side * off + Math.sin(playerCar.heading) * 4;
        tz = pz - Math.sin(playerCar.heading) * side * off + Math.cos(playerCar.heading) * 4;
      }
      const targetHeading = Math.atan2(tx - car.x, tz - car.z);
      const diff = wrapAngle(targetHeading - car.heading);
      car.heading += clamp(diff, -2.4 * dt, 2.4 * dt);
      const d = distance2D(car.x, car.z, px, pz);
      near = near || d < 70;
      // A close police car leans on the horn every few seconds, so a chase
      // sounds like a chase even before the first ram lands.
      this.hornTimer -= dt;
      if (d < 20 && this.hornTimer <= 0) {
        this.hornTimer = 3;
        if (this.audio) this.audio.horn();
      }
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
      // Ram the player's car — once per cooldown, so a glued-on police car
      // cannot cut the player's speed 18% every frame until escape is
      // impossible (found by the round-3 headless playtest: the Comet GT
      // stalled at ~1 m/s under back-to-back rams).
      car.ramTimer = Math.max(0, (car.ramTimer || 0) - dt);
      this.ramImmune = Math.max(0, this.ramImmune - dt);
      if (playerCar && d < 4.4 && car.ramTimer <= 0 && this.ramImmune <= 0) {
        car.ramTimer = 1.5;
        this.ramImmune = 2.0;
        const push = 4.4 - d;
        playerCar.x += ((playerCar.x - car.x) / Math.max(0.1, d)) * push;
        playerCar.z += ((playerCar.z - car.z) / Math.max(0.1, d)) * push;
        playerCar.speed *= 0.82;
        // Rams cost speed and position, not health: a chase that totals
        // the car in the middle of the escape makes the mission about
        // surviving the police rather than losing them (round-4 playtest
        // runs 1–5: the Comet GT kept reaching 0 HP mid-chase even with
        // the per-hit damage capped and a 2 s global ram immunity).
        // Car health is for wall crashes instead — see driving.js.
        // The ramming car bounces off harder than before, so a ram opens a
        // gap instead of leaving the police car glued to the rear bumper.
        car.speed *= 0.55;
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
    // Roadblock collision (attempt 3): a parked cruiser is a wall with a
    // siren. Driving into one shoves the player's car back, costs speed
    // and a little health — like clipping a building, because that is what
    // it is. The block itself is shoved a touch too, so a full-speed hit
    // opens a gap instead of welding the two cars together.
    if (playerCar) {
      for (const block of this.roadblocks) {
        const dx = playerCar.x - block.x;
        const dz = playerCar.z - block.z;
        const d = Math.hypot(dx, dz);
        if (d > 0.01 && d < 4.4) {
          const push = (4.4 - d) / 2;
          playerCar.x += (dx / d) * push;
          playerCar.z += (dz / d) * push;
          block.x -= (dx / d) * push * 0.5;
          block.z -= (dz / d) * push * 0.5;
          if (Math.abs(playerCar.speed) > 5) {
            playerCar.speed *= 0.55;
            playerCar.health = Math.max(0, playerCar.health - 6);
            if (this.audio) this.audio.crash();
            if (this.effects) this.effects.burst(playerCar.x, 1, playerCar.z, 0xffcc66, 10, 4);
          }
          syncCarMesh(block);
        }
        // Flash the roadblock's light bar with the chase cars.
        const on = Math.floor(this.flashTimer * 4) % 2 === 0;
        if (block.mesh.userData.lightRed) {
          block.mesh.userData.lightRed.material.color.setHex(on ? 0xff2222 : 0x441111);
          block.mesh.userData.lightBlue.material.color.setHex(on ? 0x111144 : 0x2244ff);
        }
      }
    }
    // Foot cops: run at the player, bust on contact — and sprint at 3+
    // stars, so losing them on foot gets harder as the heat rises. At 5
    // stars they run faster still (7.5 m/s): the top of the wanted ladder
    // should feel like the whole city is closing in.
    // Radio alert (attempt 2): the closest cop calls it in. While the
    // alert lasts, every cop aims at a point ahead of Ria's movement
    // (an intercept, not a tail chase), and they all run at sprint pace.
    this.bustTimer = 0;
    this.alertTimer = Math.max(0, this.alertTimer - dt);
    let closestCop = null;
    let closestD = Infinity;
    for (const cop of this.cops) {
      const d0 = distance2D(cop.x, cop.z, player.x, player.z);
      if (d0 < closestD) {
        closestD = d0;
        closestCop = cop;
      }
    }
    if (closestCop && closestD < 12 && this.alertTimer <= 0) {
      this.alertTimer = 4;
      // Intercept point: 6 m ahead of where Ria is heading, so the force
      // cuts her off instead of queuing behind her.
      const vx = player.inCar ? Math.sin(player.inCar.heading) * (player.inCar.speed || 0) : Math.sin(player.heading) * 5;
      const vz = player.inCar ? Math.cos(player.inCar.heading) * (player.inCar.speed || 0) : Math.cos(player.heading) * 5;
      this.alertX = player.x + clamp(vx, -6, 6);
      this.alertZ = player.z + clamp(vz, -6, 6);
      if (this.audio) this.audio.radioBlip();
    }
    for (const cop of this.cops) {
      const d = distance2D(cop.x, cop.z, player.x, player.z);
      near = near || d < 50;
      // Alerted cops head for the intercept point; the caller keeps
      // chasing Ria directly, so the net still closes from two sides.
      const tx = this.alertTimer > 0 && cop !== closestCop ? this.alertX : player.x;
      const tz = this.alertTimer > 0 && cop !== closestCop ? this.alertZ : player.z;
      cop.heading = Math.atan2(tx - cop.x, tz - cop.z);
      const sprint = wanted.level >= WORLD.maxWanted
        ? WORLD.copSprintMaxSpeed
        : wanted.level >= WORLD.copSprintLevel ? WORLD.copSprintSpeed : cop.speed;
      const alertBoost = this.alertTimer > 0 ? 1.15 : 1;
      const speed = d > 2.5 ? sprint * alertBoost : 0;
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
    if (this.audio) {
      this.audio.setSirenLevel(wanted.level);
      this.audio.siren(wanted.level > 0);
    }
    return near;
  }

  clear() {
    for (const car of this.cars) this.scene.remove(car.mesh);
    for (const cop of this.cops) this.scene.remove(cop.mesh);
    this._clearRoadblocks();
    this._removeHeli();
    this.cars = [];
    this.cops = [];
    this.bustTimer = 0;
    if (this.audio) this.audio.siren(false);
  }
}
