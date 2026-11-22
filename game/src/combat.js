// Solara Nights — combat: the player's pistol (hitscan raycast from the camera)
// and the Crown Syndicate guards who shoot back during the docks mission.
import * as THREE from 'three';
import { WORLD } from './config.js';
import { clamp, distance2D } from './random.js';

function makeGuardMesh() {
  const group = new THREE.Group();
  const suit = new THREE.MeshLambertMaterial({ color: 0x2a2a30 });
  const skin = new THREE.MeshLambertMaterial({ color: 0xd8a070 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.42, 1.1, 10), suit);
  body.position.y = 1.12;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.27, 12, 10), skin);
  head.position.y = 1.92;
  const gun = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.55), new THREE.MeshLambertMaterial({ color: 0x111111 }));
  gun.position.set(0.3, 1.35, 0.35);
  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.6, 0.17), suit);
  legL.position.set(-0.15, 0.32, 0);
  const legR = legL.clone();
  legR.position.x = 0.15;
  group.add(body, head, gun, legL, legR);
  group.userData = { legL, legR, gun };
  return group;
}

export class Enemy {
  constructor(scene, x, z) {
    this.mesh = makeGuardMesh();
    scene.add(this.mesh);
    this.x = x;
    this.z = z;
    // 68 HP = two pistol hits (34 dmg each). Three hits per guard made the
    // six-guard fight mathematically unwinnable: six guards at close range
    // deal ~34 dps while the player needs 4 s of perfect fire to kill them
    // all, and the player only has 100 HP.
    this.health = 68;
    this.alive = true;
    this.shootTimer = 1 + Math.random();
    this.walkPhase = 0;
    // Strafe state: guards sidestep while shooting so the docks fight is
    // not six stationary targets.
    this.strafeDir = Math.random() < 0.5 ? 1 : -1;
    this.strafeTimer = 1 + Math.random() * 2;
    // Flinch: seconds left of the stagger after taking a hit, during which
    // the guard holds fire.
    this.flinch = 0;
    // Round 4 attempt 2 — patrol + radio: a guard who cannot see Ria
    // walks a random waypoint near his post instead of standing still,
    // and a guard who spots her (or takes a bullet) radios the others.
    this.patrolX = x;
    this.patrolZ = z;
    // The post (spawn point) anchors the patrol: waypoints are picked
    // around it, never around wherever the guard happens to be standing.
    this._postX = x;
    this._postZ = z;
    this.patrolTimer = 1 + Math.random() * 2;
    this.alerted = false;
    this.alertTimer = 0;
    this.mesh.position.set(x, 0, z);
  }

  /** Another guard (or a bullet) tipped this one off: hunt the player. */
  alert() {
    this.alerted = true;
    this.alertTimer = 6;
  }

  damage(amount) {
    this.health = Math.max(0, this.health - amount);
    // A hit staggers the guard: he holds fire briefly, so landing shots
    // actually suppresses the docks instead of trading damage one-for-one.
    // It also tips him off — a wounded guard radios the others (see alert).
    if (this.alive) {
      this.flinch = WORLD.guardFlinchTime;
      this.alert();
    }
    if (this.health <= 0 && this.alive) {
      this.alive = false;
      this.mesh.rotation.x = -Math.PI / 2;
      this.mesh.position.y = 0.35;
    }
  }

  update(dt, player, audio, effects) {
    if (!this.alive) return null;
    const d = distance2D(this.x, this.z, player.x, player.z);
    let shot = false;
    // Spotting Ria at close range tips this guard off too: he radios the
    // others (the Combat class relays the alert to guards in range).
    if (d < 25 && !this.alerted) this.alert();
    this.alertTimer = Math.max(0, this.alertTimer - dt);
    if (this.alertTimer <= 0) this.alerted = false;
    if (this.flinch > 0) {
      // Staggered: no movement, no shooting — the flinch timer is the only
      // thing that ticks down.
      this.flinch = Math.max(0, this.flinch - dt);
    } else if (d < 45) {
      this.mesh.rotation.y = Math.atan2(player.x - this.x, player.z - this.z);
      this.shootTimer -= dt;
      if (d > 16) {
        // Close the distance — into pistol range. The old 26 m stop let the
        // guards sit outside the ~18 m the player's ray can reach (the ray
        // leaves the camera toward the player's chest, so it dives under
        // distant targets), forcing the player to walk 8 m through their fire
        // just to shoot back.
        const step = 3.4 * dt;
        this.x += Math.sin(this.mesh.rotation.y) * step;
        this.z += Math.cos(this.mesh.rotation.y) * step;
        this.walkPhase += dt * 8;
        const swing = Math.sin(this.walkPhase) * 0.45;
        this.mesh.userData.legL.rotation.x = swing;
        this.mesh.userData.legR.rotation.x = -swing;
      } else {
        // In range: sidestep perpendicular to the player and flip direction
        // every second or two, so the guard is a moving target while firing.
        this.strafeTimer -= dt;
        if (this.strafeTimer <= 0) {
          this.strafeTimer = 1 + Math.random() * 1.5;
          this.strafeDir *= -1;
        }
        const strafe = 2.2 * this.strafeDir * dt;
        this.x += Math.cos(this.mesh.rotation.y) * strafe;
        this.z -= Math.sin(this.mesh.rotation.y) * strafe;
        this.walkPhase += dt * 8;
        const swing = Math.sin(this.walkPhase) * 0.45;
        this.mesh.userData.legL.rotation.x = swing;
        this.mesh.userData.legR.rotation.x = -swing;
      }
      if (this.shootTimer <= 0) {
        // 1.5-2.1 s between shots: the old 1.1-1.6 s let six guards stack
        // ~34 dps at close range, more than the player's 100 HP could absorb
        // in the time needed to kill them all.
        this.shootTimer = 1.5 + Math.random() * 0.6;
        shot = true;
        if (effects) {
          effects.muzzle(
            this.x + Math.sin(this.mesh.rotation.y) * 0.6, 1.4, this.z + Math.cos(this.mesh.rotation.y) * 0.6,
            Math.sin(this.mesh.rotation.y), 0, Math.cos(this.mesh.rotation.y),
          );
        }
      }
    } else if (this.alerted) {
      // Alerted but out of sight: close in fast toward the player instead
      // of standing at the post waiting to be picked off one by one.
      this.mesh.rotation.y = Math.atan2(player.x - this.x, player.z - this.z);
      const step = WORLD.guardAlertSpeed * dt;
      this.x += Math.sin(this.mesh.rotation.y) * step;
      this.z += Math.cos(this.mesh.rotation.y) * step;
      this.walkPhase += dt * 8;
      const swing = Math.sin(this.walkPhase) * 0.45;
      this.mesh.userData.legL.rotation.x = swing;
      this.mesh.userData.legR.rotation.x = -swing;
    } else {
      // Idle patrol: pick a fresh random waypoint near the post every few
      // seconds and stroll to it, so the docks feel guarded, not frozen.
      this.patrolTimer -= dt;
      const pd = distance2D(this.x, this.z, this.patrolX, this.patrolZ);
      if (this.patrolTimer <= 0 || pd < 1.5) {
        this.patrolTimer = 3 + Math.random() * 3;
        // The post is the guard's spawn point: waypoints stay within
        // guardPatrolRange of it, so a patrol never wanders into the sea.
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * WORLD.guardPatrolRange;
        this.patrolX = this._postX + Math.sin(a) * r;
        this.patrolZ = this._postZ + Math.cos(a) * r;
      }
      this.mesh.rotation.y = Math.atan2(this.patrolX - this.x, this.patrolZ - this.z);
      const step = 1.6 * dt;
      this.x += Math.sin(this.mesh.rotation.y) * step;
      this.z += Math.cos(this.mesh.rotation.y) * step;
      this.walkPhase += dt * 4;
      const swing = Math.sin(this.walkPhase) * 0.3;
      this.mesh.userData.legL.rotation.x = swing;
      this.mesh.userData.legR.rotation.x = -swing;
    }
    // Strafing has no building collision: keep the guard inside the map so
    // a sidestep can never carry one through a wall or into the ocean.
    this.x = clamp(this.x, WORLD.boundMinX, WORLD.boundX);
    this.z = clamp(this.z, WORLD.boundMinZ, WORLD.boundZ);
    this.mesh.position.set(this.x, 0, this.z);
    return shot ? { damage: d < 18 ? 14 : d < 32 ? 9 : 5, distance: d } : null;
  }

  remove(scene) {
    scene.remove(this.mesh);
  }
}

export class Combat {
  constructor(scene, audio, effects) {
    this.scene = scene;
    this.audio = audio;
    this.effects = effects;
    this.ammo = WORLD.pistolMag;
    this.reserve = Infinity;
    this.reloadTimer = 0;
    this.shotCooldown = 0;
    this.enemies = [];
    this.kills = 0;
    this.raycaster = new THREE.Raycaster();
    this.raycaster.far = WORLD.pistolRange;
    this.lastHit = null;
    this.lastDamage = 0;
  }

  spawnEnemies(positions) {
    this.clearEnemies();
    for (const [x, z] of positions) this.enemies.push(new Enemy(this.scene, x, z));
  }

  clearEnemies() {
    for (const e of this.enemies) e.remove(this.scene);
    this.enemies = [];
  }

  get aliveCount() {
    return this.enemies.filter((e) => e.alive).length;
  }

  /** Guard radio relay: any alerted guard tips off the other alive guards
   * within guardAlertRadius, so the docks react as a team instead of six
   * lone shooters who never notice their neighbour going down. */
  relayAlerts() {
    for (const a of this.enemies) {
      if (!a.alive || !a.alerted) continue;
      for (const b of this.enemies) {
        if (b === a || !b.alive || b.alerted) continue;
        if (distance2D(a.x, a.z, b.x, b.z) < WORLD.guardAlertRadius) b.alert();
      }
    }
  }

  reload() {
    if (this.reloadTimer > 0 || this.ammo === WORLD.pistolMag) return;
    this.reloadTimer = WORLD.pistolReload;
    if (this.audio) this.audio.reloadClick();
  }

  /** Silent takedown: drop a single enemy from behind without a shot.
   * Only works inside takedown range and only while the enemy is not
   * already alerted — a loud gunfight is not a stealth kill. The kill
   * is quiet (no shot, no heat spike), counts separately in stats, and
   * feeds the Night Shift noise meter nothing at all. */
  silentTakedown(playerX, playerZ, playerHeading) {
    let best = null;
    let bestDist = WORLD.takedownRange || 2.2;
    for (const e of this.enemies) {
      if (!e.alive || e.alerted) continue;
      const d = distance2D(playerX, playerZ, e.x, e.z);
      if (d >= bestDist) continue;
      // Behind means: the enemy's facing is roughly away from the player.
      const toPlayer = Math.atan2(playerX - e.x, playerZ - e.z);
      let diff = Math.abs(toPlayer - (e.heading || 0));
      if (diff > Math.PI) diff = Math.PI * 2 - diff;
      if (diff < Math.PI * 0.6) continue;
      best = e;
      bestDist = d;
    }
    if (!best) return null;
    best.alive = false;
    best.remove(this.scene);
    this.kills += 1;
    this.silencedKills = (this.silencedKills || 0) + 1;
    if (this.effects) {
      this.effects.shadowPuff(best.x, 1.2, best.z);
      this.effects.smoke(best.x, 1, best.z);
    }
    if (this.audio && this.audio.thud) this.audio.thud();
    return best;
  }

  update(dt) {
    this.shotCooldown = Math.max(0, this.shotCooldown - dt);
    if (this.reloadTimer > 0) {
      this.reloadTimer -= dt;
      if (this.reloadTimer <= 0) this.ammo = WORLD.pistolMag;
    }
  }

  /**
   * Fire one hitscan shot from the camera through the screen centre.
   * Returns 'enemy' | 'car' | 'ped' | 'wall' | 'empty' | null (no shot fired).
   */
  shoot(camera, hittables) {
    if (this.shotCooldown > 0 || this.reloadTimer > 0 || this.ammo <= 0) return null;
    this.shotCooldown = WORLD.pistolRate;
    this.ammo -= 1;
    if (this.ammo === 0) this.reloadTimer = WORLD.pistolReload;
    if (this.audio) this.audio.shot();
    const dir = new THREE.Vector3();
    camera.getWorldDirection(dir);
    const origin = camera.position.clone();
    if (this.effects) {
      this.effects.muzzle(origin.x + dir.x, origin.y + dir.y - 0.15, origin.z + dir.z, dir.x, dir.y, dir.z);
    }
    this.raycaster.set(origin, dir);
    const targets = [];
    for (const e of this.enemies) if (e.alive) targets.push(e.mesh);
    for (const h of hittables || []) targets.push(h.mesh);
    const hits = this.raycaster.intersectObjects(targets, true);
    // Debug handle: where the ray stopped, so a playtest can tell what a
    // shot actually hit (a car in the lane, a wall, the guard, thin air).
    this.lastHit = hits.length ? { x: hits[0].point.x, y: hits[0].point.y, z: hits[0].point.z } : null;
    if (!hits.length) return 'empty';
    const point = hits[0].point;
    if (this.effects) this.effects.burst(point.x, point.y, point.z, 0xffdd88, 5, 3);
    // Damage falls off with range: full 34 inside 25 m, 24 inside 50 m,
    // 16 beyond — closing in pays off in the docks fight. A hit above
    // 1.7 m is a headshot and deals 50% more.
    const dist = origin.distanceTo(point);
    let damage = dist < WORLD.pistolFalloffNear
      ? WORLD.pistolDamage
      : dist < WORLD.pistolFalloffMid ? WORLD.pistolDamageMid : WORLD.pistolDamageFar;
    if (point.y > 1.7) damage = Math.round(damage * 1.5);
    this.lastDamage = damage;
    for (const e of this.enemies) {
      if (e.alive && (e.mesh === hits[0].object || isDescendant(e.mesh, hits[0].object))) {
        e.damage(damage);
        if (!e.alive) this.kills += 1;
        return 'enemy';
      }
    }
    for (const h of hittables || []) {
      if (h.mesh === hits[0].object || isDescendant(h.mesh, hits[0].object)) return h.kind || 'car';
    }
    return 'wall';
  }
}

function isDescendant(root, obj) {
  let o = obj;
  while (o) {
    if (o === root) return true;
    o = o.parent;
  }
  return false;
}
