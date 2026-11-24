import * as THREE from '../vendor/three/three.module.min.js';

const DURATIONS = {
  clear: [150, 300],
  overcast: [60, 140],
  drizzle: [50, 110],
  storm: [35, 75],
  fog: [45, 90],
};

const NEXTS = {
  clear: ['clear', 'overcast'],
  overcast: ['overcast', 'drizzle', 'clear'],
  drizzle: ['drizzle', 'storm', 'overcast', 'fog'],
  storm: ['storm', 'drizzle', 'fog'],
  fog: ['fog', 'clear', 'overcast'],
};

const RAIN_TARGET = { clear: 0, overcast: 0.06, drizzle: 0.38, storm: 1, fog: 0.1 };
const FOG_TARGET = { clear: 0, overcast: 0.08, drizzle: 0.15, storm: 0.3, fog: 1 };
const WIND_SPEED = { clear: 2, overcast: 4, drizzle: 6, storm: 14, fog: 1.5 };
const BOLT_COLORS = [0xbfdcff, 0xffffff, 0xffe9a8, 0x9fb8ff];

function clampW(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function clamp01W(v) {
  return clampW(v, 0, 1);
}

function meshObj(kind, color) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 0.9 }),
  );
  mesh.userData.kind = kind;
  mesh.kind = kind;
  return mesh;
}

export class WeatherSystem {
  constructor(scene, rng, audio, effects) {
    this.scene = scene || null;
    this.rng = rng || null;
    this.audio = audio || null;
    this.effects = effects || null;
    this.condition = 'clear';
    this.conditionTimer = this.roll(DURATIONS.clear[0], DURATIONS.clear[1]);
    this.rain = 0;
    this.fog = 0;
    this.windDir = this.roll(0, Math.PI * 2);
    this.windSpeed = WIND_SPEED.clear;
    this.windX = 0;
    this.windZ = 0;
    this.gust = 0;
    this.gustTimer = 0;
    this.strikeTimer = this.roll(6, 14);
    this.flash = 0;
    this.bolt = null;
    this.flashLight = meshObj('flashlight', 0xffffff);
    this.flashLight.visible = false;
    if (this.scene && typeof this.scene.add === 'function') this.scene.add(this.flashLight);
    this.puddles = [];
    for (let i = 0; i < 26; i++) {
      const p = meshObj('puddle', 0x224466);
      p.position.x = this.roll(-240, 240);
      p.position.z = this.roll(-240, 240);
      p.scale.x = 0.2;
      p.scale.z = 0.2;
      p.userData = { size: 0.2 };
      this.puddles.push(p);
      if (this.scene && typeof this.scene.add === 'function') this.scene.add(p);
    }
    this.forecast = 'clear';
    this.forecastTimer = 40;
    this.stormsSeen = 0;
    this.strikesSeen = 0;
    this.rainSeconds = 0;
    this.totalRain = 0;
  }

  roll(a, b) {
    const r = this.rng;
    if (r && typeof r.range === 'function') return r.range(a, b);
    if (typeof r === 'function') return a + r() * (b - a);
    return a + Math.random() * (b - a);
  }

  pickOne(list) {
    return list[Math.floor(this.roll(0, list.length))];
  }

  get isStorm() { return this.condition === 'storm'; }
  get isFoggy() { return this.condition === 'fog' || this.fog > 0.55; }
  get isRaining() { return this.rain > 0.25; }

  outlook() {
    if (this.condition === 'storm') return 'Storm';
    if (this.condition === 'drizzle') return 'Drizzle';
    if (this.condition === 'fog') return 'Fog';
    if (this.condition === 'overcast') return 'Overcast';
    if (this.forecast === 'storm') return 'Clear, storm coming';
    return 'Clear';
  }

  dimFactor() {
    if (this.condition === 'storm') return 0.55;
    if (this.condition === 'drizzle') return 0.3;
    if (this.condition === 'overcast') return 0.18;
    if (this.condition === 'fog') return 0.22;
    return 0;
  }

  visibility() {
    let v = 320 - this.fog * 190;
    if (this.condition === 'storm') v -= 40;
    return Math.max(40, v);
  }

  pickNext() {
    const options = NEXTS[this.condition] || ['clear'];
    const next = this.pickOne(options);
    this.condition = next;
    const [lo, hi] = DURATIONS[next];
    this.conditionTimer = this.roll(lo, hi);
    if (next === 'storm') this.stormsSeen += 1;
    this.forecast = this.pickOne(NEXTS[next] || ['clear']);
    this.forecastTimer = 40;
  }

  strikeLightning(px, pz) {
    const sx = px + this.roll(-40, 40);
    const sz = pz + this.roll(-40, 40);
    const d = Math.hypot(sx - px, sz - pz);
    if (this.bolt && this.scene && typeof this.scene.remove === 'function') this.scene.remove(this.bolt);
    const bolt = meshObj('bolt', this.pickOne(BOLT_COLORS));
    bolt.position.x = sx;
    bolt.position.z = sz;
    bolt.position.y = 40;
    bolt.scale.y = 8 + this.roll(0, 6);
    bolt.rotation.z = this.roll(-0.2, 0.2);
    this.bolt = bolt;
    if (this.scene && typeof this.scene.add === 'function') this.scene.add(bolt);
    this.flash = 1;
    this.flashLight.visible = true;
    this.strikesSeen += 1;
    const delay = clampW(d / 340, 0.15, 2.2);
    const vol = clamp01W(1 - d / 120);
    if (this.audio && typeof this.audio.thunder === 'function') this.audio.thunder(delay, vol);
    if (d < 25) {
      this.gust = 1;
      if (this.effects && typeof this.effects.burst === 'function') this.effects.burst(sx, 0, sz);
      if (this.effects && typeof this.effects.smoke === 'function') this.effects.smoke(sx, sz);
      if (this.audio && typeof this.audio.stormGust === 'function') this.audio.stormGust();
    }
    this.strikeTimer = this.roll(5, 13);
  }

  updatePuddles(dt, px, pz) {
    for (const p of this.puddles) {
      const d = Math.hypot(p.position.x - px, p.position.z - pz);
      const near = d < 190;
      if (this.isRaining && near) {
        p.userData.size = Math.min(1, p.userData.size + dt * 0.2);
        if (p.userData.size > 0.9 && this.effects && typeof this.effects.puddleSplash === 'function' && Math.random() < dt * 0.1) {
          this.effects.puddleSplash(p.position.x, p.position.z);
        }
      } else {
        p.userData.size = Math.max(0.15, p.userData.size - dt * 0.05);
      }
      p.scale.x = p.userData.size;
      p.scale.z = p.userData.size;
      p.visible = p.userData.size > 0.2;
    }
  }

  updateWind(dt) {
    this.gustTimer -= dt;
    if (this.gustTimer <= 0) {
      this.gustTimer = this.roll(2.5, 7);
      this.gust = this.roll(0, 1);
      this.windDir += this.roll(-0.4, 0.4);
    }
    const base = WIND_SPEED[this.condition] || 2;
    this.windSpeed = base * (1 + this.gust * 0.8);
    this.windX = Math.sin(this.windDir) * this.windSpeed;
    this.windZ = Math.cos(this.windDir) * this.windSpeed;
  }

  update(dt, px, pz) {
    const step = Number(dt) || 0;
    this.conditionTimer -= step;
    if (this.conditionTimer <= 0) this.pickNext();
    this.forecastTimer -= step;
    if (this.forecastTimer <= 0) {
      this.forecastTimer = 40;
      this.forecast = this.pickOne(NEXTS[this.condition] || ['clear']);
    }
    const rainTarget = RAIN_TARGET[this.condition] ?? 0;
    const fogTarget = FOG_TARGET[this.condition] ?? 0;
    const ease = Math.min(1, step * 0.25);
    this.rain += (rainTarget - this.rain) * ease;
    this.fog += (fogTarget - this.fog) * ease;
    if (this.isRaining) {
      this.rainSeconds += step;
      this.totalRain += this.rain * step;
    }
    this.updateWind(step);
    this.updatePuddles(step, px || 0, pz || 0);
    if (this.condition === 'storm') {
      this.strikeTimer -= step;
      if (this.strikeTimer <= 0) this.strikeLightning(px || 0, pz || 0);
    }
    if (this.flash > 0) {
      this.flash = Math.max(0, this.flash - step * 2.5);
      if (this.flash <= 0) {
        this.flashLight.visible = false;
        if (this.bolt) this.bolt.visible = false;
      }
    }
    if (this.audio && typeof this.audio.setRainLevel === 'function') this.audio.setRainLevel(this.rain);
    return {
      condition: this.condition,
      rain: this.rain,
      fog: this.fog,
      windX: this.windX,
      windZ: this.windZ,
      windSpeed: this.windSpeed,
      flash: this.flash,
      strikes: this.strikesSeen,
      strikeCount: this.strikesSeen,
      dim: this.dimFactor(),
      dimFactor: this.dimFactor(),
      visibility: this.visibility(),
    };
  }

  forceStorm() {
    this.condition = 'storm';
    this.conditionTimer = this.roll(60, 90);
    this.strikeTimer = 2;
    this.stormsSeen += 1;
  }

  serialize() {
    return {
      condition: this.condition,
      stormsSeen: this.stormsSeen,
      strikesSeen: this.strikesSeen,
      rainSeconds: Math.round(this.rainSeconds),
    };
  }

  restore(input) {
    if (!input || typeof input !== 'object') return;
    if (typeof input.condition === 'string' && DURATIONS[input.condition]) this.condition = input.condition;
    this.stormsSeen = typeof input.stormsSeen === 'number' ? input.stormsSeen : 0;
    this.strikesSeen = typeof input.strikesSeen === 'number' ? input.strikesSeen : 0;
    this.rainSeconds = typeof input.rainSeconds === 'number' ? input.rainSeconds : 0;
  }
}
