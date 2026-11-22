// Solara Nights — dynamic weather: a full storm cycle the city lives
// under. Clear skies drift into overcast, drizzle, a hard storm with
// lightning, then fog that rolls in off the bay and burns off again.
// Storms change how the game plays: rain slicks the roads (the driving
// model reads rainLevel), lightning is a real hazard that can strike
// near the player, wind gusts push the car and the rain sideways, and
// puddles linger after the rain stops. Fog cuts sight lines, which is
// exactly what a night operator wants — see nightops.js.
import * as THREE from 'three';
import { clamp, clamp01 } from './random.js';

// How long each condition tends to last, in seconds. Storms are short
// and violent; clear stretches are the long default between fronts.
const CONDITION_LENGTH = {
  clear: [150, 300],
  overcast: [60, 140],
  drizzle: [50, 110],
  storm: [35, 75],
  fog: [45, 90],
};

// Which condition can follow which. Weather never jumps straight from
// clear to storm — a front builds through overcast and drizzle first,
// and fog only ever arrives after rain, off the water.
const NEXT_CONDITION = {
  clear: ['clear', 'clear', 'overcast'],
  overcast: ['overcast', 'drizzle', 'clear'],
  drizzle: ['drizzle', 'storm', 'overcast', 'fog'],
  storm: ['storm', 'drizzle', 'fog'],
  fog: ['fog', 'clear', 'overcast'],
};

// Rain intensity (0..1) each condition feeds into the shared rain level.
const CONDITION_RAIN = { clear: 0, overcast: 0.06, drizzle: 0.38, storm: 1, fog: 0.1 };

// Fog density (0..1) each condition contributes. Fog is its own
// condition, but a storm's tail carries a little of it too.
const CONDITION_FOG = { clear: 0, overcast: 0.08, drizzle: 0.15, storm: 0.3, fog: 1 };

// Wind strength (m/s) each condition brings. Storm gusts are the only
// ones strong enough to matter to a moving car.
const CONDITION_WIND = { clear: 2, overcast: 4, drizzle: 6, storm: 14, fog: 1.5 };

const LIGHTNING_COLORS = [0xdfe9ff, 0xcfe0ff, 0xfff6d8, 0xbcd2ff];

// A single lightning bolt: a jagged polyline from the cloud deck to a
// rooftop or street point, rebuilt for every strike so no two look alike.
function buildBoltGeometry(rng, x, z, topY) {
  const points = [];
  const segments = 7 + Math.floor(rng.range(0, 5));
  let cx = x;
  let cz = z;
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    points.push(new THREE.Vector3(cx, topY * (1 - t), cz));
    cx += rng.range(-9, 9);
    cz += rng.range(-9, 9);
  }
  return new THREE.BufferGeometry().setFromPoints(points);
}

export class WeatherSystem {
  constructor(scene, rng, audio, effects) {
    this.scene = scene;
    this.rng = rng;
    this.audio = audio;
    this.effects = effects;

    this.condition = 'clear';
    this.conditionTimer = rng.range(...CONDITION_LENGTH.clear);
    this.rainLevel = 0;
    this.fogLevel = 0;
    this.windSpeed = CONDITION_WIND.clear;
    this.windDir = rng.range(0, Math.PI * 2);
    this.windGust = 0;
    this.gustTimer = 0;
    // Wind vector the driving model reads every frame (x/z, m/s).
    this.windX = 0;
    this.windZ = 0;

    // Lightning state: a strike flashes the sky, the bolt mesh shows
    // for a blink, and the thunder rolls in late — the farther the
    // strike, the longer the delay, like real thunder.
    this.flashTimer = 0;
    this.flashLevel = 0;
    this.strikeTimer = rng.range(6, 14);
    this.strikeCount = 0;
    this.lastStrikeDistance = 0;
    this.bolt = null;
    this.boltTimer = 0;
    this.boltMaterial = new THREE.LineBasicMaterial({ color: 0xeaf2ff, transparent: true, opacity: 0 });
    this.flashLight = new THREE.DirectionalLight(0xdfe9ff, 0);
    this.flashLight.position.set(120, 220, -80);
    this.scene.add(this.flashLight);

    // Puddles: a pool of shallow reflective discs that appear while it
    // rains and shrink away slowly after the rain stops. They sit just
    // above the road so z-fighting never shows.
    this.puddles = [];
    const puddleGeo = new THREE.CircleGeometry(1, 20);
    for (let i = 0; i < 26; i += 1) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0x2a4a66,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(puddleGeo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(rng.range(-220, 220), 0.06, rng.range(-220, 220));
      const radius = rng.range(1.2, 4.2);
      mesh.scale.set(radius, radius, 1);
      mesh.visible = false;
      this.scene.add(mesh);
      this.puddles.push({ mesh, base: radius, wet: 0, target: 0 });
    }
    this.puddleTimer = 0;

    // Forecast the player can read: the next condition and roughly when
    // it arrives. The HUD shows it as a one-word outlook.
    this.forecast = 'clear';
    this.forecastTimer = 40;

    // Stats the save file and the HUD read.
    this.stormsSeen = 0;
    this.strikesSeen = 0;
    this.rainSeconds = 0;
    this.totalRain = 0;
  }

  get isStorm() {
    return this.condition === 'storm';
  }

  get isFoggy() {
    return this.condition === 'fog' || this.fogLevel > 0.55;
  }

  get isRaining() {
    return this.rainLevel > 0.25;
  }

  // One-word outlook for the HUD: what the sky is doing right now.
  outlook() {
    if (this.isStorm) return '⛈ STORM';
    if (this.condition === 'drizzle') return '🌧 DRIZZLE';
    if (this.condition === 'fog') return '🌫 FOG';
    if (this.condition === 'overcast') return '☁ OVERCAST';
    if (this.forecast === 'storm') return '☀ CLEAR · storm coming';
    return '☀ CLEAR';
  }

  // How much the weather dims the world (0 = noon-bright, 1 = blackout).
  // Storms darken the sky hard; fog dims it a little; night stacks on top.
  dimFactor() {
    if (this.condition === 'storm') return 0.55;
    if (this.condition === 'drizzle') return 0.3;
    if (this.condition === 'overcast') return 0.18;
    if (this.condition === 'fog') return 0.22;
    return 0;
  }

  // Visibility in metres for AI sight checks — fog is the great
  // equaliser: guards and cameras see half as far in it.
  visibility() {
    return 320 - this.fogLevel * 190 - (this.isStorm ? 40 : 0);
  }

  _pickNext() {
    const options = NEXT_CONDITION[this.condition];
    const next = options[Math.floor(this.rng.range(0, options.length))];
    const [lo, hi] = CONDITION_LENGTH[next];
    this.conditionTimer = this.rng.range(lo, hi);
    if (next !== this.condition) {
      this.condition = next;
      if (next === 'storm') this.stormsSeen += 1;
    }
    // The forecast is a fresh roll from the new condition's own table,
    // so it is a real prediction, not a copy of the current state.
    const forecastOptions = NEXT_CONDITION[this.condition];
    this.forecast = forecastOptions[Math.floor(this.rng.range(0, forecastOptions.length))];
    this.forecastTimer = this.rng.range(30, 70);
  }

  _strikeLightning(playerX, playerZ) {
    const dx = this.rng.range(-160, 160);
    const dz = this.rng.range(-160, 160);
    const sx = playerX + dx;
    const sz = playerZ + dz;
    const dist = Math.hypot(dx, dz);
    this.lastStrikeDistance = dist;
    this.strikeCount += 1;
    this.strikesSeen += 1;
    // Rebuild the bolt so every strike has its own jagged shape.
    if (this.bolt) {
      this.scene.remove(this.bolt);
      this.bolt.geometry.dispose();
    }
    const geo = buildBoltGeometry(this.rng, sx, sz, 190);
    this.bolt = new THREE.Line(geo, this.boltMaterial);
    this.scene.add(this.bolt);
    this.boltTimer = 0.22;
    this.boltMaterial.opacity = 1;
    this.flashLevel = 1;
    this.flashTimer = 0.4;
    // Thunder arrives late by distance: ~340 m/s, clamped to a beat
    // the player can actually feel.
    const delay = clamp(dist / 340, 0.15, 2.2);
    const volume = clamp01(1.4 - dist / 220);
    if (this.audio && this.audio.thunder) {
      this.audio.thunder(delay, volume);
    }
    // A close strike is a hazard, not scenery: it scorches the ground
    // where it lands and startles anyone nearby. A close one also gets
    // a wind swell under the thunder, so the player feels it twice.
    if (this.effects) {
      this.effects.flash(sx, 4, sz, LIGHTNING_COLORS[Math.floor(this.rng.range(0, LIGHTNING_COLORS.length))], 3);
      if (dist < 60) {
        this.effects.burst(sx, 1, sz, 0xffc861, 10, 6);
        this.effects.smoke(sx, 2, sz);
        if (this.audio && this.audio.stormGust) this.audio.stormGust();
      }
    }
    this.strikeTimer = this.rng.range(5, 13);
    return dist;
  }

  _updatePuddles(dt, playerX, playerZ) {
    this.puddleTimer -= dt;
    if (this.puddleTimer <= 0) {
      this.puddleTimer = 1.5;
      // Puddles grow where the rain is, and only near the player — a
      // puddle two blocks away is never seen, so it never spawns.
      for (const p of this.puddles) {
        const near = Math.hypot(p.mesh.position.x - playerX, p.mesh.position.z - playerZ) < 190;
        p.target = this.isRaining && near ? 1 : 0;
      }
    }
    for (const p of this.puddles) {
      const speed = p.target > 0 ? dt * 0.25 : dt * 0.06;
      p.wet = clamp01(p.wet + (p.target > 0 ? speed : -speed));
      p.mesh.visible = p.wet > 0.03;
      p.mesh.material.opacity = p.wet * 0.5;
      const s = p.base * (0.5 + p.wet * 0.5);
      p.mesh.scale.set(s, s, 1);
      // Rain rings on a full puddle: a splash every now and then.
      if (p.wet > 0.8 && this.effects && this.rng.range(0, 1) < dt * 0.6) {
        this.effects.puddleSplash(p.mesh.position.x, 0.1, p.mesh.position.z);
      }
    }
  }

  _updateWind(dt) {
    this.gustTimer -= dt;
    if (this.gustTimer <= 0) {
      this.gustTimer = this.rng.range(2.5, 7);
      const base = CONDITION_WIND[this.condition];
      this.windGust = this.rng.range(0, this.isStorm ? base * 0.9 : base * 0.4);
      this.windDir += this.rng.range(-0.5, 0.5);
    }
    const speed = CONDITION_WIND[this.condition] + this.windGust;
    this.windSpeed = speed;
    this.windX = Math.sin(this.windDir) * speed;
    this.windZ = Math.cos(this.windDir) * speed;
  }

  // Called every frame from the main loop. Returns a small summary the
  // loop uses to steer rain, fog, lighting and the driving model.
  update(dt, playerX, playerZ) {
    this.conditionTimer -= dt;
    if (this.conditionTimer <= 0) this._pickNext();
    this.forecastTimer -= dt;
    if (this.forecastTimer <= 0) {
      const options = NEXT_CONDITION[this.condition];
      this.forecast = options[Math.floor(this.rng.range(0, options.length))];
      this.forecastTimer = this.rng.range(30, 70);
    }

    // Rain and fog ease toward their condition targets instead of
    // snapping — a front rolls in over seconds, not one frame.
    const rainTarget = CONDITION_RAIN[this.condition];
    this.rainLevel += clamp(rainTarget - this.rainLevel, -dt / 6, dt / 6);
    const fogTarget = CONDITION_FOG[this.condition];
    this.fogLevel += clamp(fogTarget - this.fogLevel, -dt / 9, dt / 9);
    if (this.isRaining) {
      this.rainSeconds += dt;
      this.totalRain += this.rainLevel * dt;
    }

    this._updateWind(dt);
    this._updatePuddles(dt, playerX, playerZ);

    // Lightning only lives in a storm, and never twice in the same beat.
    if (this.isStorm) {
      this.strikeTimer -= dt;
      if (this.strikeTimer <= 0) this._strikeLightning(playerX, playerZ);
    }
    if (this.flashTimer > 0) {
      this.flashTimer -= dt;
      this.flashLevel = clamp01(this.flashTimer / 0.4);
      this.flashLight.intensity = this.flashLevel * 2.4;
    } else {
      this.flashLight.intensity = 0;
    }
    if (this.boltTimer > 0) {
      this.boltTimer -= dt;
      this.boltMaterial.opacity = clamp01(this.boltTimer / 0.22);
      if (this.boltTimer <= 0 && this.bolt) {
        this.scene.remove(this.bolt);
        this.bolt.geometry.dispose();
        this.bolt = null;
      }
    }

    return {
      condition: this.condition,
      rain: this.rainLevel,
      fog: this.fogLevel,
      windX: this.windX,
      windZ: this.windZ,
      windSpeed: this.windSpeed,
      flash: this.flashLevel,
      strikes: this.strikeCount,
      dim: this.dimFactor(),
      visibility: this.visibility(),
    };
  }

  // A storm the player can summon for a screenshot or a test: forces
  // the next condition to storm right now, whatever the sky was doing.
  forceStorm() {
    this.condition = 'storm';
    this.conditionTimer = CONDITION_LENGTH.storm[1];
    this.strikeTimer = 1.5;
    this.stormsSeen += 1;
  }

  // Save/load: only the counters and the current condition survive a
  // reload — the timers re-roll, so no two sessions share one sky.
  serialize() {
    return {
      condition: this.condition,
      stormsSeen: this.stormsSeen,
      strikesSeen: this.strikesSeen,
      rainSeconds: Math.round(this.rainSeconds),
    };
  }

  restore(data) {
    if (!data) return;
    if (typeof data.condition === 'string' && CONDITION_LENGTH[data.condition]) {
      this.condition = data.condition;
    }
    this.stormsSeen = data.stormsSeen || 0;
    this.strikesSeen = data.strikesSeen || 0;
    this.rainSeconds = data.rainSeconds || 0;
  }
}
