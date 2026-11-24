import * as THREE from '../vendor/three/three.module.min.js';

const WORLD_BOUND = 260;
const MAG_SIZE = 12;
const RAY_RANGE = 120;
const PATROL_RANGE = 18;
const ALERT_RADIUS = 30;
const SPOT_RANGE = 25;
const TAKEDOWN_RANGE = 2.6;
const PISTOL_DAMAGE = 34;
const NEAR_FALLOFF = 12;
const MID_FALLOFF = 35;

function clampN(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function dist2D(x1, z1, x2, z2) {
  return Math.hypot(x2 - x1, z2 - z1);
}

function part(kind, color) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color }),
  );
  mesh.userData.kind = kind;
  mesh.kind = kind;
  return mesh;
}

function buildGuardMesh() {
  const root = part('guard', 0x222222);
  const body = part('body', 0x1a1a2e);
  body.position.y = 1.0;
  const head = part('head', 0xd9a066);
  head.position.y = 1.65;
  const gun = part('gun', 0x111111);
  gun.position.x = 0.3;
  gun.position.y = 1.1;
  const legL = part('leg', 0x111122);
  legL.position.x = -0.15;
  legL.position.y = 0.45;
  const legR = part('leg', 0x111122);
  legR.position.x = 0.15;
  legR.position.y = 0.45;
  root.add(body);
  root.add(head);
  root.add(gun);
  root.add(legL);
  root.add(legR);
  root.userData = { legL, legR };
  return root;
}

export class Enemy {
  constructor(scene, x, z) {
    this.scene = scene || null;
    this.mesh = buildGuardMesh();
    this.x = x || 0;
    this.z = z || 0;
    this.mesh.position.x = this.x;
    this.mesh.position.z = this.z;
    this.health = 68;
    this.alive = true;
    this.shootTimer = 1 + Math.random() * 1;
    this.walkPhase = Math.random() * Math.PI * 2;
    this.strafeDir = Math.random() < 0.5 ? -1 : 1;
    this.strafeTimer = 0;
    this.flinchTimer = 0;
    this.patrolX = this.x;
    this.patrolZ = this.z;
    this.postX = this.x;
    this.postZ = this.z;
    this.patrolTimer = 0;
    this.alerted = false;
    this.alertTimer = 0;
    if (this.scene && typeof this.scene.add === 'function') this.scene.add(this.mesh);
  }

  alert() {
    this.alerted = true;
    this.alertTimer = 6;
  }

  damage(amount) {
    if (!this.alive) return;
    this.health = Math.max(0, this.health - (amount || 0));
    if (this.health > 0) {
      this.flinchTimer = 0.45;
      this.alert();
    } else {
      this.alive = false;
      this.mesh.rotation.x = -Math.PI / 2;
      this.mesh.position.y = 0.25;
    }
  }

  update(dt, player, audio, effects) {
    if (!this.alive) return null;
    const step = Number(dt) || 0;
    const px = player ? player.x || 0 : 0;
    const pz = player ? player.z || 0 : 0;
    const d = dist2D(this.x, this.z, px, pz);
    if (d < SPOT_RANGE) this.alert();
    if (this.alertTimer > 0) this.alertTimer -= step;
    else if (this.alerted) this.alerted = false;
    if (this.flinchTimer > 0) {
      this.flinchTimer -= step;
      this.mesh.position.x = this.x;
      this.mesh.position.z = this.z;
      return null;
    }
    let shot = null;
    const speed = this.alerted ? 4.2 : 1.6;
    if (this.alerted && d > 45) {
      const ang = Math.atan2(px - this.x, pz - this.z);
      this.x += Math.sin(ang) * speed * step * 1.4;
      this.z += Math.cos(ang) * speed * step * 1.4;
    } else if (this.alerted && d > 16) {
      const ang = Math.atan2(px - this.x, pz - this.z);
      this.x += Math.sin(ang) * speed * step;
      this.z += Math.cos(ang) * speed * step;
    } else if (this.alerted && d <= 16) {
      this.strafeTimer -= step;
      if (this.strafeTimer <= 0) {
        this.strafeDir *= -1;
        this.strafeTimer = 1 + Math.random() * 1.5;
      }
      const ang = Math.atan2(px - this.x, pz - this.z);
      const side = ang + Math.PI / 2;
      this.x += Math.sin(side) * this.strafeDir * 2.2 * step;
      this.z += Math.cos(side) * this.strafeDir * 2.2 * step;
      this.shootTimer -= step;
      if (this.shootTimer <= 0) {
        this.shootTimer = 1.5 + Math.random() * 0.6;
        const dmg = d <= 18 ? 14 : (d <= 32 ? 9 : 5);
        shot = { damage: dmg, distance: d, from: 'enemy' };
        if (audio && typeof audio.enemyShot === 'function') audio.enemyShot();
      }
    } else {
      this.patrolTimer -= step;
      if (this.patrolTimer <= 0) {
        this.patrolTimer = 3 + Math.random() * 4;
        this.patrolX = this.postX + (Math.random() * 2 - 1) * PATROL_RANGE;
        this.patrolZ = this.postZ + (Math.random() * 2 - 1) * PATROL_RANGE;
      }
      const pd = dist2D(this.x, this.z, this.patrolX, this.patrolZ);
      if (pd > 0.5) {
        const ang = Math.atan2(this.patrolX - this.x, this.patrolZ - this.z);
        this.x += Math.sin(ang) * 1.4 * step;
        this.z += Math.cos(ang) * 1.4 * step;
      }
    }
    this.x = clampN(this.x, -WORLD_BOUND, WORLD_BOUND);
    this.z = clampN(this.z, -WORLD_BOUND, WORLD_BOUND);
    this.walkPhase += step * 6;
    this.mesh.position.x = this.x;
    this.mesh.position.z = this.z;
    if (this.mesh.userData && this.mesh.userData.legL) {
      this.mesh.userData.legL.rotation.x = Math.sin(this.walkPhase) * 0.4;
      this.mesh.userData.legR.rotation.x = -Math.sin(this.walkPhase) * 0.4;
    }
    return shot;
  }

  remove() {
    if (this.scene && typeof this.scene.remove === 'function') this.scene.remove(this.mesh);
  }
}

export class Combat {
  constructor(scene, audio, effects) {
    this.scene = scene || null;
    this.audio = audio || null;
    this.effects = effects || null;
    this.ammo = MAG_SIZE;
    this.reserve = Infinity;
    this.reloadTimer = 0;
    this.cooldown = 0;
    this.enemies = [];
    this.kills = 0;
    this.rayRange = RAY_RANGE;
    this.lastHit = null;
    this.lastDamage = 0;
  }

  get aliveCount() {
    return this.enemies.filter((e) => e.alive).length;
  }

  spawnEnemies(positions) {
    this.clearEnemies();
    for (const p of positions || []) {
      const [x, z] = Array.isArray(p) ? p : [p.x || 0, p.z || 0];
      this.enemies.push(new Enemy(this.scene, x, z));
    }
    return this.enemies;
  }

  clearEnemies() {
    for (const e of this.enemies) e.remove();
    this.enemies = [];
  }

  relayAlerts() {
    const alerted = this.enemies.filter((e) => e.alive && e.alerted);
    for (const src of alerted) {
      for (const other of this.enemies) {
        if (!other.alive || other.alerted) continue;
        if (dist2D(src.x, src.z, other.x, other.z) <= ALERT_RADIUS) other.alert();
      }
    }
  }

  reload() {
    if (this.reloadTimer > 0 || this.ammo >= MAG_SIZE) return false;
    this.reloadTimer = 1.4;
    if (this.audio && typeof this.audio.reloadClick === 'function') this.audio.reloadClick();
    return true;
  }

  silentTakedown(px, pz, playerHeading) {
    let best = null;
    let bestD = Infinity;
    for (const e of this.enemies) {
      if (!e.alive || e.alerted) continue;
      const d = dist2D(px, pz, e.x, e.z);
      if (d < bestD && d <= TAKEDOWN_RANGE) { bestD = d; best = e; }
    }
    if (!best) return null;
    const facing = best.heading || 0;
    const toPlayer = Math.atan2(px - best.x, pz - best.z);
    let diff = Math.abs(((toPlayer - facing + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
    const behind = diff > Math.PI * 0.6;
    const headingMatch = Math.abs(((playerHeading || 0) - facing + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    if (!behind && Math.abs(headingMatch) > 1.2) return null;
    best.alive = false;
    best.health = 0;
    best.remove();
    this.kills += 1;
    this.silencedKills = (this.silencedKills || 0) + 1;
    if (this.audio && typeof this.audio.thud === 'function') this.audio.thud();
    if (this.effects && typeof this.effects.shadowPuff === 'function') this.effects.shadowPuff(best.x, best.z);
    if (this.effects && typeof this.effects.smoke === 'function') this.effects.smoke(best.x, best.z);
    return best;
  }

  update(dt) {
    const step = Number(dt) || 0;
    if (this.cooldown > 0) this.cooldown -= step;
    if (this.reloadTimer > 0) {
      this.reloadTimer -= step;
      if (this.reloadTimer <= 0) {
        this.reloadTimer = 0;
        this.ammo = MAG_SIZE;
      }
    }
  }

  shoot(camera, hittables) {
    if (this.cooldown > 0 || this.reloadTimer > 0 || this.ammo <= 0) return null;
    this.ammo -= 1;
    this.cooldown = 0.28;
    if (this.ammo <= 0) this.reloadTimer = 1.4;
    if (this.audio && typeof this.audio.shot === 'function') this.audio.shot();
    if (this.effects && typeof this.effects.muzzle === 'function') this.effects.muzzle();
    const origin = camera && camera.position ? camera.position : { x: 0, y: 1.6, z: 0 };
    const dir = camera && typeof camera.getWorldDirection === 'function'
      ? camera.getWorldDirection({ x: 0, y: 0, z: 0 })
      : { x: 0, y: 0, z: -1 };
    let hitEnemy = null;
    let hitD = Infinity;
    for (const e of this.enemies) {
      if (!e.alive) continue;
      const d = dist2D(origin.x, origin.z, e.x, e.z);
      if (d < hitD && d <= this.rayRange) { hitD = d; hitEnemy = e; }
    }
    let hitKind = 'empty';
    let hitPoint = null;
    if (hitEnemy) {
      hitKind = 'enemy';
      hitPoint = { x: hitEnemy.x, y: 1.2, z: hitEnemy.z };
      let dmg = PISTOL_DAMAGE;
      if (hitD > MID_FALLOFF) dmg = Math.round(PISTOL_DAMAGE * 0.5);
      else if (hitD > NEAR_FALLOFF) dmg = Math.round(PISTOL_DAMAGE * 0.75);
      if (hitPoint.y > 1.7) dmg = Math.round(dmg * 1.5);
      this.lastDamage = dmg;
      hitEnemy.damage(dmg);
      if (!hitEnemy.alive) this.kills += 1;
      if (this.effects && typeof this.effects.burst === 'function') this.effects.burst(hitPoint.x, hitPoint.y, hitPoint.z);
    } else if (hittables && hittables.length) {
      const first = hittables[0];
      hitKind = first && first.kind ? first.kind : 'wall';
      hitPoint = { x: origin.x + dir.x * 10, y: origin.y, z: origin.z + dir.z * 10 };
    } else {
      hitKind = 'empty';
      hitPoint = { x: origin.x + dir.x * this.rayRange, y: origin.y, z: origin.z + dir.z * this.rayRange };
    }
    this.lastHit = hitPoint;
    if (hitKind === 'car' || hitKind === 'pedestrian' || hitKind === 'wall') {
      if (this.effects && typeof this.effects.burst === 'function' && hitPoint) this.effects.burst(hitPoint.x, hitPoint.y, hitPoint.z);
    }
    return hitKind;
  }
}
