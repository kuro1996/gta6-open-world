// Solara Nights — combat: the player's pistol (hitscan raycast from the camera)
// and the Crown Syndicate guards who shoot back during the docks mission.
import * as THREE from 'three';
import { WORLD } from './config.js';
import { distance2D } from './random.js';

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
    this.health = 100;
    this.alive = true;
    this.shootTimer = 1 + Math.random();
    this.walkPhase = 0;
    this.mesh.position.set(x, 0, z);
  }

  damage(amount) {
    this.health -= amount;
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
    if (d < 45) {
      this.mesh.rotation.y = Math.atan2(player.x - this.x, player.z - this.z);
      this.shootTimer -= dt;
      if (d > 26) {
        // Close the distance.
        const step = 3.4 * dt;
        this.x += Math.sin(this.mesh.rotation.y) * step;
        this.z += Math.cos(this.mesh.rotation.y) * step;
        this.walkPhase += dt * 8;
        const swing = Math.sin(this.walkPhase) * 0.45;
        this.mesh.userData.legL.rotation.x = swing;
        this.mesh.userData.legR.rotation.x = -swing;
      }
      if (this.shootTimer <= 0) {
        this.shootTimer = 1.1 + Math.random() * 0.5;
        shot = true;
        if (effects) {
          effects.muzzle(
            this.x + Math.sin(this.mesh.rotation.y) * 0.6, 1.4, this.z + Math.cos(this.mesh.rotation.y) * 0.6,
            Math.sin(this.mesh.rotation.y), 0, Math.cos(this.mesh.rotation.y),
          );
        }
      }
    }
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
    this.raycaster = new THREE.Raycaster();
    this.raycaster.far = WORLD.pistolRange;
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

  reload() {
    if (this.reloadTimer > 0 || this.ammo === WORLD.pistolMag) return;
    this.reloadTimer = WORLD.pistolReload;
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
    if (!hits.length) return 'empty';
    const point = hits[0].point;
    if (this.effects) this.effects.burst(point.x, point.y, point.z, 0xffdd88, 5, 3);
    for (const e of this.enemies) {
      if (e.alive && (e.mesh === obj || e.mesh === hits[0].object || isDescendant(e.mesh, hits[0].object))) {
        e.damage(WORLD.pistolDamage);
        return 'enemy';
      }
    }
    for (const h of hittables || []) {
      if (h.mesh === obj || isDescendant(h.mesh, hits[0].object)) return h.kind || 'car';
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
