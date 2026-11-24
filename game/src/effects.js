import * as THREE from '../vendor/three/three.module.min.js';

const MAX_PARTICLES = 400;
const MAX_RAIN = 500;
const PARK_Y = -999;

export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.cursor = 0;

    const posArr = new Float32Array(MAX_PARTICLES * 3);
    const colArr = new Float32Array(MAX_PARTICLES * 3);
    for (let i = 0; i < MAX_PARTICLES; i++) posArr[i * 3 + 1] = PARK_Y;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colArr, 3));
    const mat = new THREE.PointsMaterial({ size: 0.35, vertexColors: true, transparent: true, opacity: 0.95, depthWrite: false });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    scene.add(this.points);

    this.parts = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      this.parts.push({ life: 0, maxLife: 1, x: 0, y: PARK_Y, z: 0, vx: 0, vy: 0, vz: 0, r: 1, g: 1, b: 1, size: 1 });
    }

    this.flashLight = new THREE.PointLight(0xffc080, 0, 18, 1.6);
    this.flashLight.position.set(0, PARK_Y, 0);
    scene.add(this.flashLight);

    const rainPos = new Float32Array(MAX_RAIN * 3);
    for (let i = 0; i < MAX_RAIN; i++) rainPos[i * 3 + 1] = PARK_Y;
    const rainGeo = new THREE.BufferGeometry();
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
    const rainMat = new THREE.PointsMaterial({ color: 0xaaccee, size: 0.12, transparent: true, opacity: 0.55 });
    this.rainPoints = new THREE.Points(rainGeo, rainMat);
    this.rainPoints.visible = false;
    scene.add(this.rainPoints);
    this.drops = [];
    for (let i = 0; i < MAX_RAIN; i++) {
      this.drops.push({ x: 0, y: PARK_Y, z: 0, speed: 22 + Math.random() * 10 });
    }
    this.rainLevel = 0;
    this.px = 0;
    this.pz = 0;
  }

  setRain(level, x, z) {
    this.rainLevel = Math.max(0, Math.min(1, level));
    this.px = x;
    this.pz = z;
    this.rainPoints.visible = this.rainLevel > 0.02;
  }

  _updateRain(dt) {
    if (this.rainLevel <= 0.02) return;
    const pos = this.rainPoints.geometry.attributes.position.array;
    const active = Math.floor(MAX_RAIN * this.rainLevel);
    for (let i = 0; i < MAX_RAIN; i++) {
      const d = this.drops[i];
      if (i < active) {
        d.y -= d.speed * dt;
        if (d.y < 0) {
          d.y = 18 + Math.random() * 10;
          d.x = this.px + (Math.random() - 0.5) * 60;
          d.z = this.pz + (Math.random() - 0.5) * 60;
        }
        pos[i * 3] = d.x;
        pos[i * 3 + 1] = d.y;
        pos[i * 3 + 2] = d.z;
      } else {
        pos[i * 3 + 1] = PARK_Y;
      }
    }
    this.rainPoints.geometry.attributes.position.needsUpdate = true;
  }

  _spawn(x, y, z, vx, vy, vz, life, hex) {
    const p = this.parts[this.cursor];
    this.cursor = (this.cursor + 1) % MAX_PARTICLES;
    p.x = x;
    p.y = y;
    p.z = z;
    p.vx = vx;
    p.vy = vy;
    p.vz = vz;
    p.life = life;
    p.maxLife = life;
    const col = new THREE.Color(hex);
    p.r = col.r;
    p.g = col.g;
    p.b = col.b;
  }

  flash(pos, color, intensity) {
    this.flashLight.position.set(pos.x, pos.y, pos.z);
    if (color !== undefined) this.flashLight.color.setHex(color);
    this.flashLight.intensity = intensity === undefined ? 14 : intensity;
  }

  burst(pos, color, count, speed) {
    const sp = speed ?? 5;
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2;
      const up = Math.random() * 0.9 + 0.1;
      const v = sp * (0.5 + Math.random() * 0.5);
      this._spawn(pos.x, pos.y, pos.z, Math.cos(ang) * v, up * v, Math.sin(ang) * v, 0.4 + Math.random() * 0.4, color);
    }
  }

  sparks(pos) {
    for (let i = 0; i < 6; i++) {
      const ang = Math.random() * Math.PI * 2;
      this._spawn(pos.x, pos.y, pos.z, Math.cos(ang) * 4, Math.random() * 3, Math.sin(ang) * 4, 0.25 + Math.random() * 0.2, 0xffe080);
    }
    this.flash(pos, 0xfff2c0, 8);
  }

  smoke(pos) {
    for (let i = 0; i < 3; i++) {
      this._spawn(pos.x, pos.y, pos.z, (Math.random() - 0.5) * 0.6, 0.8 + Math.random() * 0.5, (Math.random() - 0.5) * 0.6, 0.9 + Math.random() * 0.3, 0x888888);
    }
  }

  dust(pos) {
    for (let i = 0; i < 2; i++) {
      this._spawn(pos.x, pos.y + 0.1, pos.z, (Math.random() - 0.5) * 0.8, 0.3 + Math.random() * 0.3, (Math.random() - 0.5) * 0.8, 0.7 + Math.random() * 0.3, 0xccbbaa);
    }
  }

  puddleSplash(pos) {
    for (let i = 0; i < 3; i++) {
      this._spawn(pos.x, pos.y, pos.z, (Math.random() - 0.5) * 1.5, 1.5 + Math.random(), (Math.random() - 0.5) * 1.5, 0.4, 0x99ccff);
    }
  }

  shadowPuff(pos) {
    for (let i = 0; i < 5; i++) {
      this._spawn(pos.x, pos.y, pos.z, (Math.random() - 0.5) * 0.4, 0.2 + Math.random() * 0.3, (Math.random() - 0.5) * 0.4, 1.0 + Math.random() * 0.5, 0x4a2a6a);
    }
  }

  neonSpark(pos) {
    for (let i = 0; i < 2; i++) {
      const ang = Math.random() * Math.PI * 2;
      this._spawn(pos.x, pos.y, pos.z, Math.cos(ang) * 3, Math.random() * 2, Math.sin(ang) * 3, 0.4, 0xc040ff);
    }
    this.flash(pos, 0xc040ff, 6);
  }

  muzzle(pos, dir) {
    for (let i = 0; i < 2; i++) {
      this._spawn(pos.x, pos.y, pos.z, dir.x * 8 + (Math.random() - 0.5), dir.y * 2, dir.z * 8 + (Math.random() - 0.5), 0.12 + Math.random() * 0.08, 0xffaa20);
    }
    this.flash(pos, 0xffcc66, 14);
  }

  heal(pos) {
    for (let i = 0; i < 2; i++) {
      this._spawn(pos.x, pos.y, pos.z, (Math.random() - 0.5) * 0.4, 0.6 + Math.random() * 0.4, (Math.random() - 0.5) * 0.4, 0.9, 0x60e080);
    }
  }

  update(dt) {
    this._updateRain(dt);
    const pos = this.points.geometry.attributes.position.array;
    const col = this.points.geometry.attributes.color.array;
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const p = this.parts[i];
      if (p.life > 0) {
        p.life -= dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.z += p.vz * dt;
        p.vy -= 6 * dt;
        p.vx *= 1 - 1.5 * dt;
        p.vz *= 1 - 1.5 * dt;
        if (p.life <= 0) {
          pos[i * 3 + 1] = PARK_Y;
          col[i * 3] = 0;
          col[i * 3 + 1] = 0;
          col[i * 3 + 2] = 0;
        } else {
          const fade = p.life / p.maxLife;
          pos[i * 3] = p.x;
          pos[i * 3 + 1] = p.y;
          pos[i * 3 + 2] = p.z;
          col[i * 3] = p.r * fade;
          col[i * 3 + 1] = p.g * fade;
          col[i * 3 + 2] = p.b * fade;
        }
      }
    }
    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.color.needsUpdate = true;
    if (this.flashLight.intensity > 0) {
      this.flashLight.intensity = Math.max(0, this.flashLight.intensity - 110 * dt);
      if (this.flashLight.intensity === 0) this.flashLight.position.set(0, PARK_Y, 0);
    }
  }
}
