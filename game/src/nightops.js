import * as THREE from '../vendor/three/three.module.min.js';

const CONTRACT_TYPES = {
  drop: { label: 'Package Drop', brief: 'Leave the package at the mark. Quietly.', pay: 320, rep: 5 },
  photo: { label: 'Photo the Drop', brief: 'Photograph the drop point and hold still.', pay: 260, rep: 4 },
  tail: { label: 'Tail the Courier', brief: 'Follow the courier without being seen.', pay: 400, rep: 8 },
};

const CONTRACT_SPOTS = [
  { name: 'Docks Crane 4', x: -185, z: 195 },
  { name: 'Marina Slip 9', x: 40, z: 190 },
  { name: 'Plaza North Steps', x: 0, z: -20 },
  { name: 'Hospital Alley', x: 110, z: -30 },
  { name: 'Beach Boardwalk', x: 180, z: 150 },
  { name: 'Garage Back Lot', x: -150, z: 160 },
  { name: 'Old Market Arch', x: 120, z: 120 },
  { name: 'Rooftop Stairwell', x: 60, z: 100 },
];

function clampN(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function clamp01N(v) {
  return clampN(v, 0, 1);
}

function distN(x1, z1, x2, z2) {
  return Math.hypot(x2 - x1, z2 - z1);
}

function meshObj(kind, color) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 0.5 }),
  );
  mesh.userData.kind = kind;
  mesh.kind = kind;
  return mesh;
}

export class NightOps {
  constructor(scene, rng, audio, effects, hooks = {}) {
    this.scene = scene || null;
    this.rng = rng || null;
    this.audio = audio || null;
    this.effects = effects || null;
    this.hooks = hooks || {};
    this.active = false;
    this.contract = null;
    this.contractIndex = 0;
    this.noise = 0;
    this.eyes = 0;
    this.watchers = [];
    this.marker = null;
    this.tailTarget = null;
    this.tailSeen = 0;
    this.tailLost = 0;
    this.photoTimer = 0;
    this.photoHeld = 0;
    this.done = 0;
    this.burned = 0;
    this.bestNightPay = 0;
    this.nightMinutes = 0;
    this.offerTimer = 8;
    this.offer = null;
    this.lastAnnounce = '';
    this.spottedCooldown = 0;
    this.flashCycle = 0;
  }

  get hasOffer() {
    return !!this.offer && !this.active;
  }

  get isNightWork() {
    return this.active;
  }

  nightOpen(nightF) {
    return (nightF || 0) > 0.55;
  }

  roll(a, b) {
    const r = this.rng;
    if (r && typeof r.range === 'function') return r.range(a, b);
    if (typeof r === 'function') return a + r() * (b - a);
    return a + Math.random() * (b - a);
  }

  announce(text) {
    if (text === this.lastAnnounce) return;
    this.lastAnnounce = text;
    if (typeof this.hooks.announce === 'function') this.hooks.announce(text);
  }

  rollOffer() {
    const types = Object.keys(CONTRACT_TYPES);
    const type = types[Math.floor(this.roll(0, types.length))];
    const spot = CONTRACT_SPOTS[Math.floor(this.roll(0, CONTRACT_SPOTS.length))];
    const base = CONTRACT_TYPES[type];
    const trust = Math.min(0.6, this.done * 0.06);
    const pay = Math.round(base.pay * (1 + trust));
    this.offer = {
      id: `night-${this.done + this.burned + 1}`,
      type,
      label: base.label,
      brief: base.brief,
      pay,
      rep: base.rep,
      reputation: base.rep,
      spot: { ...spot },
    };
    return this.offer;
  }

  acceptOffer() {
    if (!this.offer || this.active) return false;
    this.contract = this.offer;
    this.offer = null;
    this.active = true;
    this.noise = 0;
    this.eyes = 0;
    this.photoTimer = 0;
    this.photoHeld = 0;
    this.tailSeen = 0;
    this.tailLost = 0;
    this.flashCycle = 0;
    this.spawnWatchers();
    this.spawnMarker();
    this.announce(`${this.contract.label}: ${this.contract.brief}`);
    if (this.audio && typeof this.audio.radioBlip === 'function') this.audio.radioBlip();
    return true;
  }

  declineOffer() {
    this.offer = null;
    this.offerTimer = this.roll(25, 60);
  }

  spawnWatchers() {
    this.clearWatchers();
    const spot = this.contract ? this.contract.spot : CONTRACT_SPOTS[0];
    const count = this.contract && this.contract.type === 'tail' ? 1 : 2 + Math.floor(this.roll(0, 2));
    for (let i = 0; i < count; i++) {
      const ang = this.roll(0, Math.PI * 2);
      const d = this.roll(14, 30);
      const mesh = meshObj('watcher', 0xff4444);
      mesh.position.x = spot.x + Math.sin(ang) * d;
      mesh.position.z = spot.z + Math.cos(ang) * d;
      const cone = meshObj('cone', 0xff6666);
      mesh.add(cone);
      if (this.scene && typeof this.scene.add === 'function') this.scene.add(mesh);
      this.watchers.push({
        mesh, cone,
        x: mesh.position.x, z: mesh.position.z,
        sight: this.roll(22, 30),
        heading: this.roll(0, Math.PI * 2),
        sweepSpeed: this.roll(0.3, 0.8),
        sweepPhase: this.roll(0, Math.PI * 2),
      });
    }
    if (this.contract && this.contract.type === 'tail') {
      const courier = meshObj('courier', 0xe8e8e8);
      courier.position.x = spot.x + 10;
      courier.position.z = spot.z + 10;
      if (this.scene && typeof this.scene.add === 'function') this.scene.add(courier);
      this.tailTarget = { mesh: courier, x: courier.position.x, z: courier.position.z, angle: 0, loopR: 12, cx: spot.x, cz: spot.z };
    }
  }

  spawnMarker() {
    this.clearMarker();
    const spot = this.contract ? this.contract.spot : CONTRACT_SPOTS[0];
    const ring = meshObj('ring', 0x2ee6e6);
    ring.position.x = spot.x;
    ring.position.z = spot.z;
    ring.scale.x = 3;
    ring.scale.z = 3;
    const beam = meshObj('beam', 0x2ee6e6);
    beam.position.x = spot.x;
    beam.position.y = 6;
    beam.position.z = spot.z;
    if (this.scene && typeof this.scene.add === 'function') {
      this.scene.add(ring);
      this.scene.add(beam);
    }
    this.marker = { ring, beam };
  }

  clearWatchers() {
    for (const w of this.watchers) {
      if (w.cone && w.cone.geometry) w.cone.geometry.dispose();
      if (w.mesh && this.scene && typeof this.scene.remove === 'function') this.scene.remove(w.mesh);
    }
    this.watchers = [];
    if (this.tailTarget) {
      if (this.scene && typeof this.scene.remove === 'function') this.scene.remove(this.tailTarget.mesh);
      this.tailTarget = null;
    }
  }

  clearMarker() {
    if (!this.marker) return;
    for (const part of [this.marker.ring, this.marker.beam]) {
      if (part && part.geometry) part.geometry.dispose();
      if (part && this.scene && typeof this.scene.remove === 'function') this.scene.remove(part);
    }
    this.marker = null;
  }

  burn(reason) {
    this.burned += 1;
    this.active = false;
    this.contract = null;
    this.clearWatchers();
    this.clearMarker();
    this.noise = 0;
    this.eyes = 0;
    this.offerTimer = this.roll(30, 75);
    if (this.audio && typeof this.audio.fail === 'function') this.audio.fail();
    if (typeof this.hooks.fail === 'function') this.hooks.fail(reason);
    this.announce(`Contract burned: ${reason}`);
    return { event: 'burned', detail: reason };
  }

  complete() {
    const pay = this.contract ? this.contract.pay : 0;
    const rep = this.contract ? this.contract.rep : 0;
    const label = this.contract ? this.contract.label : '';
    const spot = this.contract ? this.contract.spot : null;
    this.done += 1;
    if (pay > this.bestNightPay) this.bestNightPay = pay;
    this.active = false;
    this.contract = null;
    this.clearWatchers();
    this.clearMarker();
    this.noise = 0;
    this.eyes = 0;
    this.offerTimer = this.roll(20, 50);
    if (this.audio && typeof this.audio.jingle === 'function') this.audio.jingle();
    if (spot && this.effects && typeof this.effects.burst === 'function') this.effects.burst(spot.x, 1, spot.z);
    if (typeof this.hooks.reward === 'function') this.hooks.reward(pay, rep, label);
    this.announce(`Contract complete: ${label} paid $${pay}.`);
    return { event: 'complete', detail: label, pay, rep };
  }

  addNoise(amount, sneaking) {
    if (!this.active) return;
    const amt = sneaking ? (amount || 0) * 0.5 : (amount || 0);
    this.noise = clamp01N(this.noise + amt);
  }

  update(dt, u) {
    const step = Number(dt) || 0;
    const ctx = u || {};
    this.spottedCooldown = Math.max(0, this.spottedCooldown - step);
    if (!this.active) {
      if (this.nightOpen(ctx.nightF) && !this.offer) {
        this.offerTimer -= step;
        if (this.offerTimer <= 0) {
          this.rollOffer();
          this.announce(`Night work: ${this.offer.label} — $${this.offer.pay} at ${this.offer.spot.name}.`);
        }
      }
      return null;
    }
    this.nightMinutes += step / 60;
    this.noise = clamp01N(this.noise - step * 0.02);
    this.eyes = clamp01N(this.eyes - step * 0.03);
    if (ctx.shotFired) this.addNoise(0.4, ctx.sneaking);
    if ((ctx.speed || 0) > 12) this.addNoise(step * 0.08, ctx.sneaking);
    if (ctx.inCar) this.addNoise(step * 0.05, ctx.sneaking);
    const px = ctx.playerX ?? 0;
    const pz = ctx.playerZ ?? 0;
    const vis = ctx.visibility ?? 200;
    const time = (this.nightMinutes * 60 + step);
    for (const w of this.watchers) {
      w.sweepPhase += w.sweepSpeed * step;
      w.heading = w.sweepPhase;
      const sight = Math.min(w.sight, vis * 0.11);
      const d = distN(px, pz, w.x, w.z);
      if (d < sight) {
        const toPlayer = Math.atan2(px - w.x, pz - w.z);
        let diff = Math.abs(((toPlayer - w.heading + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
        if (diff < 0.9) {
          const closeness = 1 - d / sight;
          let fill = step * 0.5 * closeness;
          if (ctx.sneaking) fill *= 0.4;
          this.eyes = clamp01N(this.eyes + fill);
        }
      }
    }
    if (this.marker) {
      const pulse = 0.5 + Math.sin(time * 3) * 0.3;
      this.marker.ring.material.opacity = pulse;
    }
    if (this.eyes >= 1) {
      if (this.spottedCooldown <= 0) {
        this.spottedCooldown = 3;
        if (typeof this.hooks.onSpotted === 'function') this.hooks.onSpotted();
      }
      return this.burn('spotted');
    }
    if (this.noise >= 1) return this.burn('too loud');
    const spot = this.contract.spot;
    const dSpot = distN(px, pz, spot.x, spot.z);
    if (this.contract.type === 'drop') {
      if (dSpot <= 6) return this.complete();
      return { event: 'progress', detail: 'reach the mark' };
    }
    if (this.contract.type === 'photo') {
      if (dSpot <= 16 && (ctx.speed || 0) < 1) {
        this.photoHeld += step;
        this.flashCycle -= step;
        if (this.flashCycle <= -3) {
          this.flashCycle = 2;
          this.photoTimer += 1;
        }
        if (this.photoHeld >= 6) return this.complete();
        return { event: 'progress', detail: `photo ${Math.round(this.photoHeld)}/6s` };
      }
      this.photoHeld = Math.max(0, this.photoHeld - step);
      return { event: 'progress', detail: 'get close and hold still' };
    }
    if (this.contract.type === 'tail' && this.tailTarget) {
      const t = this.tailTarget;
      t.angle += step * 0.08;
      t.x = t.cx + Math.sin(t.angle) * t.loopR;
      t.z = t.cz + Math.cos(t.angle) * t.loopR;
      t.mesh.position.x = t.x;
      t.mesh.position.z = t.z;
      const dTail = distN(px, pz, t.x, t.z);
      if (dTail < 6) {
        this.eyes = clamp01N(this.eyes + step * 0.6);
      } else if (dTail >= 6 && dTail <= 26) {
        this.tailSeen += step;
        this.tailLost = 0;
        if (this.tailSeen >= 20) return this.complete();
      } else {
        this.tailLost += step;
        if (this.tailLost >= 9) return this.burn('lost the courier');
      }
      return { event: 'progress', detail: `tail ${Math.round(this.tailSeen)}/20s` };
    }
    return null;
  }

  statusLine() {
    if (this.active && this.contract) {
      const spot = this.contract.spot;
      let middle = `Reach ${spot.name}`;
      if (this.contract.type === 'tail') middle = `Tail the courier — ${Math.max(0, Math.round(20 - this.tailSeen))}s left`;
      else if (this.contract.type === 'photo') middle = `Photo progress ${Math.round(this.photoHeld)}/6s`;
      return `${this.contract.label} · ${middle} · Noise ${Math.round(this.noise * 100)}% · Eyes ${Math.round(this.eyes * 100)}%`;
    }
    if (this.offer) {
      return `Night work: ${this.offer.label} — $${this.offer.pay} at ${this.offer.spot.name} [Take]`;
    }
    return '';
  }

  serialize() {
    return {
      done: this.done,
      burned: this.burned,
      bestNightPay: this.bestNightPay,
      nightMinutes: Math.round(this.nightMinutes),
    };
  }

  restore(input) {
    if (!input || typeof input !== 'object') return;
    this.done = typeof input.done === 'number' ? input.done : 0;
    this.burned = typeof input.burned === 'number' ? input.burned : 0;
    this.bestNightPay = typeof input.bestNightPay === 'number' ? input.bestNightPay : 0;
    this.nightMinutes = typeof input.nightMinutes === 'number' ? input.nightMinutes : 0;
  }
}
