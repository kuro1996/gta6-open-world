import * as THREE from '../vendor/three/three.module.min.js';
import { WORLD } from './config.js';
import { clamp, dampAngle } from './random.js';

const JACKET = 0x2a4a8a;
const PANTS = 0x222831;
const SKIN = 0xc98d64;
const HAIR = 0x1a1210;

export function makePlayerMesh() {
  const group = new THREE.Group();
  const jacketMat = new THREE.MeshStandardMaterial({ color: JACKET });
  const pantsMat = new THREE.MeshStandardMaterial({ color: PANTS });
  const skinMat = new THREE.MeshStandardMaterial({ color: SKIN });
  const hairMat = new THREE.MeshStandardMaterial({ color: HAIR });

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 0.85, 10), jacketMat);
  body.position.y = 1.05;
  group.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 10), skinMat);
  head.position.y = 1.72;
  group.add(head);

  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 10), hairMat);
  hair.position.y = 1.8;
  hair.scale.set(1, 0.75, 1);
  group.add(hair);

  const legL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.62, 0.16), pantsMat);
  legL.position.set(-0.14, 0.31, 0);
  group.add(legL);

  const legR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.62, 0.16), pantsMat);
  legR.position.set(0.14, 0.31, 0);
  group.add(legR);

  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.6, 0.13), jacketMat);
  armL.position.set(-0.44, 1.1, 0);
  group.add(armL);

  const armR = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.6, 0.13), jacketMat);
  armR.position.set(0.44, 1.1, 0);
  group.add(armR);

  group.userData.legL = legL;
  group.userData.legR = legR;
  group.userData.armL = armL;
  group.userData.armR = armR;
  return group;
}

export class Player {
  constructor(scene, startX, startZ) {
    this.scene = scene;
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
    this.calmTimer = 99;
    this.stamina = WORLD.sprintStaminaMax;
    this.sneaking = false;
    this.noise = 0;
    this.mesh.position.set(this.x, this.y, this.z);
  }

  setSneak(value) {
    this.sneaking = !!value;
    return this.sneaking;
  }

  get sneakFactor() {
    return this.sneaking ? 0.5 : 1;
  }

  get stamina01() {
    return this.stamina / WORLD.sprintStaminaMax;
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
    this.calmTimer = 99;
    this.stamina = WORLD.sprintStaminaMax;
    this.mesh.visible = true;
    this.mesh.position.set(this.x, this.y, this.z);
  }

  damage(amount) {
    if (this.hurtTimer > 0) return;
    this.health = Math.max(0, this.health - amount);
    this.hurtTimer = 0.5;
    this.calmTimer = 0;
  }

  regen(dt, effects) {
    if (this.inCar || this.health <= 0 || this.health >= WORLD.playerHealth) return;
    this.calmTimer += dt;
    if (this.calmTimer < WORLD.healthRegenDelay) return;
    this.health = Math.min(WORLD.playerHealth, this.health + WORLD.healthRegenRate * dt);
    if (effects && typeof effects.heal === 'function' && Math.random() < dt * 2) {
      effects.heal({ x: this.x, y: this.y + 1, z: this.z });
    }
  }

  update(dt, input, city) {
    if (this.inCar) return;
    if (this.hurtTimer > 0) this.hurtTimer -= dt;
    const delta = input.takeMouseDelta();
    this.camYaw -= delta.dx * 0.0032;
    this.camPitch = clamp(this.camPitch + delta.dy * 0.0022, -0.15, 0.9);
    const axes = input.moveAxes();
    const wantSprint = input.down('ShiftLeft') || input.down('ShiftRight');
    let sprinting = false;
    if (wantSprint && (axes.forward !== 0 || axes.strafe !== 0) && this.stamina > 0) {
      sprinting = true;
      this.stamina = Math.max(0, this.stamina - dt);
    } else {
      this.stamina = Math.min(WORLD.sprintStaminaMax, this.stamina + WORLD.staminaRegen * dt);
    }
    let speed = WORLD.playerWalkSpeed;
    if (sprinting) speed = WORLD.playerSprintSpeed;
    if (this.stamina <= 0) speed = WORLD.playerWalkSpeed;
    const fx = -Math.sin(this.camYaw);
    const fz = -Math.cos(this.camYaw);
    const rx = -fz;
    const rz = fx;
    let mx = fx * axes.forward + rx * axes.strafe;
    let mz = fz * axes.forward + rz * axes.strafe;
    const len = Math.hypot(mx, mz);
    this.moving = len > 0.01;
    if (this.moving) {
      mx /= len;
      mz /= len;
      const targetHeading = Math.atan2(mx, mz);
      this.heading = dampAngle(this.heading, targetHeading, 12, dt);
      this.walkPhase += dt * (sprinting ? 13 : 9);
      this.x += mx * speed * dt;
      this.z += mz * speed * dt;
    }
    if (city && typeof city.resolveCircle === 'function') {
      const fixed = city.resolveCircle(this.x, this.z, WORLD.playerRadius);
      this.x = fixed.x;
      this.z = fixed.z;
    }
    this.x = clamp(this.x, WORLD.boundsMinX, WORLD.boundsMaxX);
    this.z = clamp(this.z, WORLD.boundsMinZ, WORLD.boundsMaxZ);
    if (input.down('Space') && this.y <= 0.001) {
      this.vy = WORLD.playerJumpSpeed;
    }
    this.vy -= WORLD.gravity * dt;
    this.y += this.vy * dt;
    if (this.y < 0) {
      this.y = 0;
      this.vy = 0;
    }
    this.aiming = !!input.mouseDown;
    this.noise = this.moving ? (this.sneaking ? 0.5 : 1) * (sprinting ? 1.6 : 1) : 0;
    const swing = this.moving ? Math.sin(this.walkPhase) * 0.55 : 0;
    const ud = this.mesh.userData;
    if (ud.legL) ud.legL.rotation.x = swing;
    if (ud.legR) ud.legR.rotation.x = -swing;
    if (this.aiming) {
      if (ud.armL) ud.armL.rotation.x = -1.3;
      if (ud.armR) ud.armR.rotation.x = -1.3;
    } else {
      if (ud.armL) ud.armL.rotation.x = -swing * 0.7;
      if (ud.armR) ud.armR.rotation.x = swing * 0.7;
    }
    const bob = this.moving ? Math.abs(Math.sin(this.walkPhase)) * 0.05 : 0;
    this.mesh.position.set(this.x, this.y + bob, this.z);
    this.mesh.rotation.y = this.heading;
  }

  placeCamera(camera, dt) {
    const dist = this.aiming ? 3.2 : 5.2;
    const height = 2.2 + this.camPitch * 2.4;
    const cx = this.x + Math.sin(this.camYaw) * dist;
    const cz = this.z + Math.cos(this.camYaw) * dist;
    const k = 1 - Math.exp(-10 * dt);
    camera.position.x += (cx - camera.position.x) * k;
    camera.position.y += (height - camera.position.y) * k;
    camera.position.z += (cz - camera.position.z) * k;
    if (camera.position.y < 0.6) camera.position.y = 0.6;
    if (this.hurtTimer > 0) {
      camera.position.x += (Math.random() - 0.5) * 0.12;
      camera.position.y += (Math.random() - 0.5) * 0.12;
    }
    const targetFov = this.moving ? 68 : 60;
    if (camera.fov !== undefined) {
      camera.fov += (targetFov - camera.fov) * k;
      if (typeof camera.updateProjectionMatrix === 'function') camera.updateProjectionMatrix();
    }
    camera.lookAt(this.x, this.y + 1.4, this.z);
  }

  snapCamera(camera) {
    const dist = 5.2;
    const height = 2.2 + this.camPitch * 2.4;
    camera.position.set(
      this.x + Math.sin(this.camYaw) * dist,
      height,
      this.z + Math.cos(this.camYaw) * dist
    );
    camera.lookAt(this.x, this.y + 1.4, this.z);
  }
}
