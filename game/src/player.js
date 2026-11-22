// Solara Nights — Ria Santos on foot: third-person controller, camera orbit,
// jump, and the character mesh. Driving lives in driving.js.
import * as THREE from 'three';
import { WORLD } from './config.js';
import { clamp, dampAngle } from './random.js';

const BODY_GEO = new THREE.CylinderGeometry(0.34, 0.4, 1.05, 10);
const HEAD_GEO = new THREE.SphereGeometry(0.27, 12, 10);
const LEG_GEO = new THREE.BoxGeometry(0.17, 0.6, 0.17);
const ARM_GEO = new THREE.BoxGeometry(0.14, 0.55, 0.14);

export function makePlayerMesh() {
  const group = new THREE.Group();
  const jacket = new THREE.MeshLambertMaterial({ color: 0xc23b2e });
  const pants = new THREE.MeshLambertMaterial({ color: 0x22262e });
  const skin = new THREE.MeshLambertMaterial({ color: 0xe8b98a });
  const hair = new THREE.MeshLambertMaterial({ color: 0x1c1210 });
  const body = new THREE.Mesh(BODY_GEO, jacket);
  body.position.y = 1.12;
  const head = new THREE.Mesh(HEAD_GEO, skin);
  head.position.y = 1.92;
  const hairMesh = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8, 0, Math.PI * 2, 0, 1.4), hair);
  hairMesh.position.y = 1.96;
  const legL = new THREE.Mesh(LEG_GEO, pants);
  legL.position.set(-0.15, 0.32, 0);
  const legR = new THREE.Mesh(LEG_GEO, pants);
  legR.position.set(0.15, 0.32, 0);
  const armL = new THREE.Mesh(ARM_GEO, jacket);
  armL.position.set(-0.48, 1.2, 0);
  const armR = new THREE.Mesh(ARM_GEO, jacket);
  armR.position.set(0.48, 1.2, 0);
  group.add(body, head, hairMesh, legL, legR, armL, armR);
  group.userData = { legL, legR, armL, armR };
  return group;
}

export class Player {
  constructor(scene, startX, startZ) {
    this.mesh = makePlayerMesh();
    scene.add(this.mesh);
    this.x = startX;
    this.z = startZ;
    this.y = 0;
    this.vy = 0;
    this.heading = 0;
    this.camYaw = Math.PI;
    this.camPitch = 0.32;
    this.health = WORLD.playerHealth;
    this.inCar = null;
    this.walkPhase = 0;
    this.moving = false;
    this.aiming = false;
    this.hurtTimer = 0;
    this.mesh.position.set(this.x, 0, this.z);
  }

  get pos() {
    return { x: this.x, y: this.y, z: this.z };
  }

  reset(x, z, health) {
    this.x = x;
    this.z = z;
    this.y = 0;
    this.vy = 0;
    this.health = health === undefined ? WORLD.playerHealth : health;
    this.inCar = null;
    this.mesh.visible = true;
    this.mesh.position.set(x, 0, z);
  }

  damage(amount) {
    if (this.hurtTimer > 0) return;
    this.health = Math.max(0, this.health - amount);
    this.hurtTimer = 0.5;
  }

  update(dt, input, city) {
    if (this.inCar) return;
    this.hurtTimer = Math.max(0, this.hurtTimer - dt);
    const mouse = input.takeMouseDelta();
    this.camYaw -= mouse.dx * 0.0032;
    this.camPitch = clamp(this.camPitch + mouse.dy * 0.0028, -0.15, 0.9);
    const axes = input.moveAxes();
    const sprint = input.down('ShiftLeft') || input.down('ShiftRight');
    const speed = sprint ? WORLD.playerSprint : WORLD.playerWalk;
    const sin = Math.sin(this.camYaw);
    const cos = Math.cos(this.camYaw);
    // Camera looks toward -Z rotated by camYaw; forward is away from the camera.
    let mx = (-sin * axes.forward + cos * axes.strafe) * speed;
    let mz = (-cos * axes.forward - sin * axes.strafe) * speed;
    const len = Math.hypot(mx, mz);
    this.moving = len > 0.1;
    if (this.moving) {
      mx /= len / speed;
      mz /= len / speed;
      this.heading = dampAngle(this.heading, Math.atan2(mx, mz), 12, dt);
      this.walkPhase += dt * speed * 1.6;
    }
    this.x += mx * dt;
    this.z += mz * dt;
    const fixed = city.collideCircle(this.x, this.z, WORLD.playerRadius);
    this.x = fixed.x;
    this.z = fixed.z;
    // The map ends at the world bounds: never walk off the ground plane.
    this.x = clamp(this.x, WORLD.boundMinX, WORLD.boundX);
    this.z = clamp(this.z, WORLD.boundMinZ, WORLD.boundZ);
    // Jump + gravity.
    if (input.down('Space') && this.y <= 0.01) this.vy = WORLD.playerJump;
    this.vy -= WORLD.gravity * dt;
    this.y = Math.max(0, this.y + this.vy * dt);
    if (this.y === 0) this.vy = 0;
    this.aiming = input.mouseDown;
    const swing = this.moving ? Math.sin(this.walkPhase) * 0.55 : 0;
    const ud = this.mesh.userData;
    ud.legL.rotation.x = swing;
    ud.legR.rotation.x = -swing;
    ud.armL.rotation.x = this.aiming ? -1.2 : -swing * 0.7;
    ud.armR.rotation.x = this.aiming ? -1.2 : swing * 0.7;
    this.mesh.position.set(this.x, this.y + Math.abs(Math.sin(this.walkPhase)) * (this.moving ? 0.05 : 0), this.z);
    this.mesh.rotation.y = this.heading;
  }

  /** Third-person camera position for the given camera object. */
  placeCamera(camera, dt) {
    const dist = this.aiming ? 4.5 : 7.5;
    const height = 2.6 + this.camPitch * 4;
    const cx = this.x + Math.sin(this.camYaw) * dist;
    const cz = this.z + Math.cos(this.camYaw) * dist;
    camera.position.x += (cx - camera.position.x) * Math.min(1, dt * 10);
    camera.position.y += (height - camera.position.y) * Math.min(1, dt * 10);
    camera.position.z += (cz - camera.position.z) * Math.min(1, dt * 10);
    if (camera.position.y < 0.6) camera.position.y = 0.6;
    camera.lookAt(this.x, this.y + 1.6, this.z);
  }

  snapCamera(camera) {
    const dist = 7.5;
    camera.position.set(
      this.x + Math.sin(this.camYaw) * dist,
      2.6 + this.camPitch * 4,
      this.z + Math.cos(this.camYaw) * dist,
    );
    camera.lookAt(this.x, 1.6, this.z);
  }
}
