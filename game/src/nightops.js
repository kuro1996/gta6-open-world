// Solara Nights — Night Shift: stealth contracts that only exist after
// dark. When the sun is down, Ria can take quiet work from a burner
// phone: slip a package through a guarded block, photograph a drop
// point, or tail a courier without ever being seen. The whole system
// runs on two meters the player can feel — NOISE and EYES. Noise rises
// when Ria runs, drives fast, or fires a shot, and falls when she walks
// slow or crouches in shadow; eyes rise when a watcher has line of
// sight. Fill either meter and the contract burns: the mark bolts, the
// cops get a tip, and the night's pay is gone. Fog and rain are a
// friend here — they shrink every watcher's sight range.
import * as THREE from 'three';
import { clamp, clamp01, distance2D } from './random.js';

// The three contract types. Each one is a different verb, so a night
// never plays the same way twice: deliver, photograph, tail.
const CONTRACT_TYPES = {
  drop: {
    label: 'Silent Drop',
    brief: 'Leave the package at the mark. No running, no witnesses.',
    pay: 320,
    rep: 12,
  },
  photo: {
    label: 'Cold Photo',
    brief: 'Photograph the drop point and get out. Stay out of the light.',
    pay: 260,
    rep: 10,
  },
  tail: {
    label: 'Long Tail',
    brief: 'Follow the courier. Close enough to see, far enough to vanish.',
    pay: 400,
    rep: 16,
  },
};

// Where contracts send the player, by district name. The coordinates
// are city blocks, not story waypoints — Night Shift owns its own map.
const CONTRACT_SPOTS = [
  { name: 'Docks Crane 4', x: -198, z: 168 },
  { name: 'Marina Slip 9', x: 205, z: -175 },
  { name: 'Plaza North Steps', x: 30, z: -120 },
  { name: 'Hospital Alley', x: -140, z: -60 },
  { name: 'Beach Boardwalk', x: 190, z: 210 },
  { name: 'Garage Back Lot', x: -60, z: 140 },
  { name: 'Old Market Arch', x: 90, z: 60 },
  { name: 'Rooftop Stairwell', x: -180, z: -150 },
];

// A watcher: a guard who stands a post and sweeps a cone of sight.
// The cone is drawn as a translucent wedge on the ground, so the
// player always knows exactly where "seen" begins.
function makeWatcherMesh(scene, colorHex) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.55, 1.8, 8),
    new THREE.MeshStandardMaterial({ color: 0x1c1c22, roughness: 0.8 }),
  );
  body.position.y = 0.9;
  group.add(body);
  const visor = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.12, 0.2),
    new THREE.MeshBasicMaterial({ color: colorHex }),
  );
  visor.position.set(0, 1.55, 0.4);
  group.add(visor);
  // Sight cone: a flat wedge lying on the ground, pointing where the
  // watcher looks. It fades with distance so the far edge reads soft.
  const coneGeo = new THREE.CircleGeometry(1, 24, -Math.PI / 6, Math.PI / 3);
  const coneMat = new THREE.MeshBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const cone = new THREE.Mesh(coneGeo, coneMat);
  cone.rotation.x = -Math.PI / 2;
  cone.rotation.z = Math.PI / 2;
  cone.position.y = 0.08;
  group.add(cone);
  scene.add(group);
  return { group, cone, coneMat };
}

export class NightOps {
  constructor(scene, rng, audio, effects, hooks) {
    this.scene = scene;
    this.rng = rng;
    this.audio = audio;
    this.effects = effects;
    // Hooks the main loop wires up: announce(text), reward(money, rep),
    // fail(reason), onSpotted(). All optional — NightOps never crashes
    // for a missing hook.
    this.hooks = hooks || {};

    this.active = false;
    this.contract = null;
    this.contractIndex = 0;
    this.noise = 0;
    this.eyes = 0;
    this.watchers = [];
    this.marker = null;
    this.markerRing = null;
    this.tailTarget = null;
    this.tailSeen = 0;
    this.tailLost = 0;
    this.photoTimer = 0;
    this.photoHeld = 0;
    this.contractsDone = 0;
    this.contractsBurned = 0;
    this.bestNightPay = 0;
    this.nightMinutes = 0;
    this.offerTimer = 8;
    this.offer = null;
    this._lastAnnounce = '';
    this._spottedCooldown = 0;
  }

  get hasOffer() {
    return !!this.offer && !this.active;
  }

  get isNightWork() {
    return this.active;
  }

  // Night Shift only opens after dark. The main loop passes nightF
  // (0 = noon, 1 = midnight); below 0.55 the burner phone stays quiet.
  nightOpen(nightF) {
    return nightF > 0.55;
  }

  _announce(text) {
    if (text === this._lastAnnounce) return;
    this._lastAnnounce = text;
    if (this.hooks.announce) this.hooks.announce(text);
  }

  _rollOffer() {
    const typeKeys = Object.keys(CONTRACT_TYPES);
    const type = typeKeys[Math.floor(this.rng.range(0, typeKeys.length))];
    const spot = CONTRACT_SPOTS[Math.floor(this.rng.range(0, CONTRACT_SPOTS.length))];
    const base = CONTRACT_TYPES[type];
    // Pay scales with how many nights the player has already worked:
    // the burner phone trusts a proven runner with better money.
    const trust = 1 + Math.min(this.contractsDone * 0.06, 0.6);
    this.offer = {
      id: `night-${this.contractsDone + this.contractsBurned + 1}`,
      type,
      label: base.label,
      brief: base.brief,
      pay: Math.round(base.pay * trust),
      rep: base.rep,
      spot: { ...spot },
    };
  }

  acceptOffer() {
    if (!this.offer || this.active) return false;
    this.contract = this.offer;
    this.offer = null;
    this.active = true;
    this.noise = 0;
    this.eyes = 0;
    this.photoHeld = 0;
    this.tailSeen = 0;
    this.tailLost = 0;
    this._spawnWatchers();
    this._spawnMarker();
    this._announce(`${this.contract.label} — ${this.contract.spot.name}. ${this.contract.brief}`);
    if (this.audio && this.audio.radioBlip) this.audio.radioBlip();
    return true;
  }

  declineOffer() {
    this.offer = null;
    this.offerTimer = this.rng.range(25, 60);
  }

  _spawnWatchers() {
    this._clearWatchers();
    const spot = this.contract.spot;
    const count = this.contract.type === 'tail' ? 1 : 2 + Math.floor(this.rng.range(0, 2));
    for (let i = 0; i < count; i += 1) {
      const angle = this.rng.range(0, Math.PI * 2);
      const dist = this.rng.range(14, 30);
      const x = spot.x + Math.sin(angle) * dist;
      const z = spot.z + Math.cos(angle) * dist;
      const mesh = makeWatcherMesh(this.scene, 0xff5346);
      mesh.group.position.set(x, 0, z);
      const range = this.rng.range(22, 30);
      mesh.cone.scale.set(range, range, 1);
      this.watchers.push({
        x,
        z,
        range,
        heading: this.rng.range(0, Math.PI * 2),
        sweep: this.rng.range(0.25, 0.6),
        sweepPhase: this.rng.range(0, Math.PI * 2),
        mesh,
        alert: 0,
      });
    }
    // A tail contract also needs the courier being followed: a pale
    // figure who walks a slow loop near the spot.
    if (this.contract.type === 'tail') {
      const courier = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.5, 1.7, 8),
        new THREE.MeshStandardMaterial({ color: 0xd8c98a, roughness: 0.7 }),
      );
      courier.position.set(spot.x + 8, 0.85, spot.z + 8);
      this.scene.add(courier);
      this.tailTarget = {
        mesh: courier,
        x: spot.x + 8,
        z: spot.z + 8,
        angle: this.rng.range(0, Math.PI * 2),
        radius: this.rng.range(10, 18),
        speed: this.rng.range(0.35, 0.55),
      };
    }
  }

  _spawnMarker() {
    const spot = this.contract.spot;
    const geo = new THREE.RingGeometry(2.4, 3, 32);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x7df9ff,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.markerRing = new THREE.Mesh(geo, mat);
    this.markerRing.rotation.x = -Math.PI / 2;
    this.markerRing.position.set(spot.x, 0.12, spot.z);
    this.scene.add(this.markerRing);
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 1.6, 26, 10, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0x7df9ff, transparent: true, opacity: 0.14,
        side: THREE.DoubleSide, depthWrite: false,
      }),
    );
    beam.position.set(spot.x, 13, spot.z);
    this.scene.add(beam);
    this.marker = beam;
  }

  _clearWatchers() {
    for (const w of this.watchers) {
      this.scene.remove(w.mesh.group);
      w.mesh.cone.geometry.dispose();
      w.mesh.coneMat.dispose();
    }
    this.watchers = [];
    if (this.tailTarget) {
      this.scene.remove(this.tailTarget.mesh);
      this.tailTarget = null;
    }
  }

  _clearMarker() {
    if (this.markerRing) {
      this.scene.remove(this.markerRing);
      this.markerRing.geometry.dispose();
      this.markerRing.material.dispose();
      this.markerRing = null;
    }
    if (this.marker) {
      this.scene.remove(this.marker);
      this.marker.geometry.dispose();
      this.marker.material.dispose();
      this.marker = null;
    }
  }

  _burn(reason) {
    this.contractsBurned += 1;
    this.active = false;
    this._clearWatchers();
    this._clearMarker();
    this.noise = 0;
    this.eyes = 0;
    this.offerTimer = this.rng.range(30, 75);
    if (this.audio && this.audio.fail) this.audio.fail();
    if (this.hooks.fail) this.hooks.fail(reason);
    this._announce(`Contract burned — ${reason}`);
  }

  _complete() {
    const pay = this.contract.pay;
    const rep = this.contract.rep;
    this.contractsDone += 1;
    this.bestNightPay = Math.max(this.bestNightPay, pay);
    this.active = false;
    this._clearWatchers();
    this._clearMarker();
    this.noise = 0;
    this.eyes = 0;
    this.offerTimer = this.rng.range(20, 50);
    if (this.audio && this.audio.jingle) this.audio.jingle();
    if (this.effects) this.effects.burst(this.contract.spot.x, 2, this.contract.spot.z, 0x7df9ff, 14, 5);
    if (this.hooks.reward) this.hooks.reward(pay, rep, this.contract.label);
    this._announce(`${this.contract.label} done — $${pay} + ${rep} rep.`);
  }

  // Noise: how loud Ria is being right now. The main loop feeds in
  // what she just did; NightOps turns it into a meter that decays
  // when she goes quiet. Crouching (sneak) halves every gain.
  addNoise(amount, sneaking) {
    if (!this.active) return;
    this.noise = clamp01(this.noise + amount * (sneaking ? 0.5 : 1));
  }

  // The one update the loop calls. ctx carries everything NightOps
  // needs and nothing it owns: player position/speed/sneak, night
  // factor, weather visibility, and whether a shot was just fired.
  update(dt, ctx) {
    this._spottedCooldown = Math.max(0, this._spottedCooldown - dt);
    if (!this.active) {
      // No contract running: roll fresh offers while it is night, and
      // let the burner phone go quiet again by dawn.
      if (ctx.nightF > 0.55 && !this.offer) {
        this.offerTimer -= dt;
        if (this.offerTimer <= 0) this._rollOffer();
      }
      return null;
    }
    this.nightMinutes += dt / 60;
    const px = ctx.playerX;
    const pz = ctx.playerZ;

    // Decay: standing still in the dark bleeds both meters away.
    this.noise = clamp01(this.noise - dt * 0.05);
    this.eyes = clamp01(this.eyes - dt * 0.04);
    if (ctx.shotFired) this.addNoise(0.34, ctx.sneaking);
    if (ctx.speed > 9) this.addNoise(dt * 0.06, ctx.sneaking);
    else if (ctx.speed > 4) this.addNoise(dt * 0.025, ctx.sneaking);
    if (ctx.inCar) this.addNoise(dt * 0.02, false);

    // Watchers sweep their cones. Being inside a cone with line of
    // sight fills EYES; fog and rain shrink the range, darkness helps
    // a crouched player most of all.
    const visibility = ctx.visibility || 320;
    for (const w of this.watchers) {
      w.sweepPhase += dt * w.sweep;
      w.heading = w.heading + Math.sin(w.sweepPhase) * dt * 0.7;
      w.mesh.group.rotation.y = w.heading;
      w.mesh.cone.rotation.z = Math.PI / 2 - w.heading;
      const dist = distance2D(px, pz, w.x, w.z);
      const range = Math.min(w.range, visibility * 0.11);
      if (dist < range) {
        const ang = Math.atan2(px - w.x, pz - w.z);
        let diff = Math.abs(ang - w.heading);
        if (diff > Math.PI) diff = Math.PI * 2 - diff;
        if (diff < Math.PI / 5) {
          const closeness = 1 - dist / range;
          const sneakFactor = ctx.sneaking ? 0.35 : 1;
          this.eyes = clamp01(this.eyes + dt * 0.55 * closeness * sneakFactor);
          w.alert = clamp01(w.alert + dt * 0.8);
          w.mesh.coneMat.opacity = 0.16 + w.alert * 0.4;
        }
      }
      w.alert = clamp01(w.alert - dt * 0.25);
      if (w.alert < 0.2) w.mesh.coneMat.opacity = 0.16;
    }

    // The marker pulses so the player can find the spot at night.
    if (this.markerRing) {
      const pulse = 1 + Math.sin(Date.now() / 280) * 0.12;
      this.markerRing.scale.set(pulse, pulse, 1);
    }

    // Burn conditions: seen for too long, or too loud for too long.
    if (this.eyes >= 1) {
      if (this._spottedCooldown <= 0) {
        this._spottedCooldown = 3;
        if (this.hooks.onSpotted) this.hooks.onSpotted();
      }
      this._burn('a watcher made you — the mark bolted.');
      return { event: 'burned', reason: 'spotted' };
    }
    if (this.noise >= 1) {
      this._burn('too loud — someone tipped the cops.');
      return { event: 'burned', reason: 'noise' };
    }

    const spot = this.contract.spot;
    const dist = distance2D(px, pz, spot.x, spot.z);
    if (this.contract.type === 'drop') {
      if (dist < 6) {
        this._complete();
        return { event: 'done', label: this.contract ? this.contract.label : 'Silent Drop' };
      }
    } else if (this.contract.type === 'photo') {
      if (dist < 16) {
        this.photoHeld += dt;
        if (this.photoHeld > 0.4 && this.effects) {
          this.effects.flash(spot.x, 3, spot.z, 0xffffff, 0.6);
          this.photoHeld = -2.5;
        }
        if (this.photoHeld <= -2.4) {
          this._complete();
          return { event: 'done', label: 'Cold Photo' };
        }
      } else {
        this.photoHeld = Math.max(0, this.photoHeld - dt);
      }
    } else if (this.contract.type === 'tail' && this.tailTarget) {
      const t = this.tailTarget;
      t.angle += (t.speed / t.radius) * dt;
      t.x = spot.x + Math.sin(t.angle) * t.radius;
      t.z = spot.z + Math.cos(t.angle) * t.radius;
      t.mesh.position.set(t.x, 0.85, t.z);
      const d = distance2D(px, pz, t.x, t.z);
      if (d < 26 && d > 6) {
        this.tailSeen += dt;
        this.tailLost = 0;
      } else if (d <= 6) {
        // Too close: the courier feels the breath on his neck.
        this.eyes = clamp01(this.eyes + dt * 0.5);
        this.tailLost = 0;
      } else {
        this.tailLost += dt;
        this.tailSeen = Math.max(0, this.tailSeen - dt * 0.5);
      }
      if (this.tailLost > 9) {
        this._burn('lost the courier in the dark.');
        return { event: 'burned', reason: 'lost' };
      }
      if (this.tailSeen > 20) {
        this._complete();
        return { event: 'done', label: 'Long Tail' };
      }
    }
    return { event: 'active', noise: this.noise, eyes: this.eyes, dist };
  }

  // HUD line: what the night looks like right now.
  statusLine() {
    if (this.active && this.contract) {
      const type = this.contract.type === 'tail'
        ? `TAIL ${Math.max(0, Math.ceil(20 - this.tailSeen))}s`
        : this.contract.type === 'photo'
          ? (this.photoHeld > 0 ? `PHOTO ${Math.min(99, Math.round((this.photoHeld / 0.4) * 100))}% — HOLD STILL` : 'HOLD STILL · PHOTO')
          : 'REACH THE MARK';
      return `🌙 ${this.contract.label} · ${type} · NOISE ${Math.round(this.noise * 100)}% · EYES ${Math.round(this.eyes * 100)}%`;
    }
    if (this.offer) {
      return `📱 BURNER: ${this.offer.label} — $${this.offer.pay} · ${this.offer.spot.name} (N to take)`;
    }
    return '';
  }

  serialize() {
    return {
      contractsDone: this.contractsDone,
      contractsBurned: this.contractsBurned,
      bestNightPay: this.bestNightPay,
      nightMinutes: Math.round(this.nightMinutes),
    };
  }

  restore(data) {
    if (!data) return;
    this.contractsDone = data.contractsDone || 0;
    this.contractsBurned = data.contractsBurned || 0;
    this.bestNightPay = data.bestNightPay || 0;
    this.nightMinutes = data.nightMinutes || 0;
  }
}
