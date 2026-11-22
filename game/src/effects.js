// Solara Nights — small particle effects: muzzle sparks, crash bursts, tire
// smoke and a pooled THREE.Points cloud so nothing is allocated per frame.
import * as THREE from 'three';

const MAX_PARTICLES = 400;

export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MAX_PARTICLES * 3), 3));
    geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(MAX_PARTICLES * 3), 3));
    const mat = new THREE.PointsMaterial({ size: 0.35, vertexColors: true, transparent: true, opacity: 0.95, depthWrite: false });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    scene.add(this.points);
    for (let i = 0; i < MAX_PARTICLES; i += 1) {
      this.particles.push({ life: 0, max: 1, x: 0, y: -100, z: 0, vx: 0, vy: 0, vz: 0, r: 1, g: 1, b: 1, size: 1 });
    }
    this._cursor = 0;
    // One pooled point light for muzzle flashes and crash flashes: a single
    // light whose intensity decays, instead of a new light per shot.
    this.flashLight = new THREE.PointLight(0xffdd88, 0, 18, 1.6);
    this.flashLight.position.set(0, -100, 0);
    scene.add(this.flashLight);
  }

  _spawn(x, y, z, vx, vy, vz, life, r, g, b) {
    const p = this.particles[this._cursor];
    this._cursor = (this._cursor + 1) % MAX_PARTICLES;
    p.life = life;
    p.max = life;
    p.x = x;
    p.y = y;
    p.z = z;
    p.vx = vx;
    p.vy = vy;
    p.vz = vz;
    p.r = r;
    p.g = g;
    p.b = b;
  }

  /** Brief light pop at a point (muzzle flash, crash spark): decays in update. */
  flash(x, y, z, colorHex, intensity) {
    this.flashLight.position.set(x, y, z);
    this.flashLight.color.setHex(colorHex || 0xffdd88);
    this.flashLight.intensity = intensity || 14;
  }

  burst(x, y, z, colorHex, count, speed) {
    const color = new THREE.Color(colorHex);
    for (let i = 0; i < count; i += 1) {
      const a = Math.random() * Math.PI * 2;
      const e = Math.random() * Math.PI - Math.PI / 2;
      // ??, not ||: an explicit speed of 0 is a still burst, not a 5 m/s one.
      const s = (speed ?? 5) * (0.4 + Math.random() * 0.8);
      this._spawn(
        x, y, z,
        Math.cos(a) * Math.cos(e) * s,
        Math.abs(Math.sin(e)) * s + 1.5,
        Math.sin(a) * Math.cos(e) * s,
        0.4 + Math.random() * 0.4,
        color.r, color.g, color.b,
      );
    }
  }

  /** White-yellow metal sparks for a car-on-car bump, with a light pop. */
  sparks(x, y, z) {
    for (let i = 0; i < 6; i += 1) {
      const a = Math.random() * Math.PI * 2;
      const s = 3 + Math.random() * 4;
      this._spawn(
        x, y, z,
        Math.cos(a) * s, 1.5 + Math.random() * 2, Math.sin(a) * s,
        0.25 + Math.random() * 0.25, 1, 0.9, 0.5,
      );
    }
    this.flash(x, y, z, 0xfff2c8, 8);
  }

  smoke(x, y, z) {
    for (let i = 0; i < 3; i += 1) {
      this._spawn(
        x + (Math.random() - 0.5) * 0.6, y, z + (Math.random() - 0.5) * 0.6,
        (Math.random() - 0.5) * 0.8, 1.2 + Math.random(), (Math.random() - 0.5) * 0.8,
        0.9 + Math.random() * 0.5, 0.55, 0.55, 0.55,
      );
    }
  }

  /** Pale dust kicked up by sprinting feet — lighter and lower than tyre smoke. */
  dust(x, y, z) {
    for (let i = 0; i < 2; i += 1) {
      this._spawn(
        x + (Math.random() - 0.5) * 0.5, y, z + (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5, 0.5 + Math.random() * 0.5, (Math.random() - 0.5) * 0.5,
        0.5 + Math.random() * 0.3, 0.75, 0.7, 0.55,
      );
    }
  }

  muzzle(x, y, z, dirX, dirY, dirZ) {
    this._spawn(x, y, z, dirX * 12, dirY * 12, dirZ * 12, 0.08, 1, 0.85, 0.3);
    this._spawn(x, y, z, dirX * 8, dirY * 8 + 1, dirZ * 8, 0.12, 1, 0.6, 0.2);
    this.flash(x, y, z, 0xffdd88, 14);
  }

  /** Soft green motes rising off the player while health regenerates. */
  heal(x, y, z) {
    for (let i = 0; i < 2; i += 1) {
      this._spawn(
        x + (Math.random() - 0.5) * 0.8, y + Math.random() * 0.5, z + (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.3, 1.6 + Math.random() * 0.8, (Math.random() - 0.5) * 0.3,
        0.8 + Math.random() * 0.4, 0.35, 0.9, 0.45,
      );
    }
  }

  update(dt) {
    const pos = this.points.geometry.attributes.position.array;
    const col = this.points.geometry.attributes.color.array;
    for (let i = 0; i < MAX_PARTICLES; i += 1) {
      const p = this.particles[i];
      if (p.life > 0) {
        p.life -= dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.z += p.vz * dt;
        p.vy -= 3 * dt;
        p.vx *= 1 - 1.5 * dt;
        p.vz *= 1 - 1.5 * dt;
      } else {
        p.y = -100;
      }
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;
      const fade = p.life > 0 ? p.life / p.max : 0;
      col[i * 3] = p.r * fade;
      col[i * 3 + 1] = p.g * fade;
      col[i * 3 + 2] = p.b * fade;
    }
    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.color.needsUpdate = true;
    // The flash light decays fast: a muzzle pop is gone in ~0.15 s.
    if (this.flashLight.intensity > 0) {
      this.flashLight.intensity = Math.max(0, this.flashLight.intensity - dt * 110);
      if (this.flashLight.intensity === 0) this.flashLight.position.y = -100;
    }
  }
}
