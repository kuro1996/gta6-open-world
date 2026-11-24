import * as THREE from '../vendor/three/three.module.min.js';

export const CREWS = {
  vipers: { name: 'Vipers', color: 0x39d353, tag: 'VIP', blurb: 'Fast, loud, and always looking for a fight.' },
  harbor: { name: 'Harbor Crew', color: 0x2e9bff, tag: 'HBR', blurb: 'Dockhands who know every crate that lands.' },
  owls: { name: 'Owls', color: 0xc9a0ff, tag: 'OWL', blurb: 'Quiet watchers who trade in secrets.' },
};

export const MARKET_ITEMS = [
  { id: 'nitro1', crew: 'vipers', name: 'Nitro Kit', key: '1', cash: 400, rep: 0, blurb: 'A bottle of go-fast.', effect: 'nitro', value: 0.25, offends: 'harbor' },
  { id: 'topspd1', crew: 'vipers', name: 'Tuned Gears', key: '2', cash: 650, rep: 10, blurb: 'Longer legs for the highway.', effect: 'topSpeed', value: 0.2, offends: 'owls' },
  { id: 'armor1', crew: 'harbor', name: 'Plate Armor', key: '3', cash: 500, rep: 5, blurb: 'Steel plates, welded on.', effect: 'carArmor', value: 0.3, offends: 'vipers' },
  { id: 'vest1', crew: 'harbor', name: 'Kevlar Vest', key: '4', cash: 350, rep: 0, blurb: 'Stops more than harsh words.', effect: 'bodyArmor', value: 0.35, offends: null },
  { id: 'cool1', crew: 'owls', name: 'Clean Papers', key: '5', cash: 700, rep: 15, blurb: 'Heat melts away faster.', effect: 'coolOff', value: 0.3, offends: 'vipers' },
  { id: 'quiet1', crew: 'owls', name: 'Soft Soles', key: '6', cash: 300, rep: 5, blurb: 'Footsteps nobody hears.', effect: 'quietFeet', value: 0.4, offends: 'harbor' },
  { id: 'nightpay1', crew: 'owls', name: 'Night Ledger', key: '7', cash: 800, rep: 20, blurb: 'Night work pays better.', effect: 'nightPay', value: 0.25, offends: null },
  { id: 'owleyes1', crew: 'harbor', name: 'Owl Optics', key: '8', cash: 450, rep: 10, blurb: 'See further in the dark.', effect: 'owlEyes', value: 0.3, offends: 'owls' },
  { id: 'nitro2', crew: 'vipers', name: 'Twin Nitro', key: '9', cash: 900, rep: 25, blurb: 'Two bottles. Twice the trouble.', effect: 'nitro', value: 0.4, offends: 'harbor' },
];

export const STALL_POS = { x: -185, z: 195 };

function clampNum(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function clamp01Num(v) {
  return clampNum(v, 0, 1);
}

function dist2(x1, z1, x2, z2) {
  const dx = x2 - x1;
  const dz = z2 - z1;
  return Math.sqrt(dx * dx + dz * dz);
}

function makeMesh(kind, color) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1 }),
  );
  mesh.userData.kind = kind;
  mesh.kind = kind;
  return mesh;
}

export class BlackMarket {
  constructor(scene, rng, audio, hooks = {}) {
    this.scene = scene || null;
    this.rng = rng || null;
    this.audio = audio || null;
    this.hooks = hooks || {};
    this.upgrades = { nitro: 0, topSpeed: 0, carArmor: 0, bodyArmor: 0, coolOff: 0, quietFeet: 0, nightPay: 0, owlEyes: 0 };
    this.owned = [];
    this.standing = { vipers: 0, harbor: 0, owls: 0 };
    this.spent = 0;
    this.deals = 0;
    this.open = false;
    this.near = false;
    this.announced = false;
    this.flicker = 0;
    this.signLit = false;
    this.lampIntensity = 0;
    this.stall = makeMesh('stall', 0x222233);
    this.stall.position.x = STALL_POS.x;
    this.stall.position.z = STALL_POS.z;
    this.signBars = Object.keys(CREWS).map((k) => {
      const bar = makeMesh('signbar', CREWS[k].color);
      this.stall.add(bar);
      return bar;
    });
    this.lamp = makeMesh('lamp', 0xffeeaa);
    this.stall.add(this.lamp);
    if (this.scene && typeof this.scene.add === 'function') this.scene.add(this.stall);
  }

  roll(a, b) {
    const r = this.rng;
    if (r && typeof r.range === 'function') return r.range(a, b);
    if (typeof r === 'function') return a + r() * (b - a);
    return a + Math.random() * (b - a);
  }

  priceFor(item) {
    const it = typeof item === 'string' ? MARKET_ITEMS.find((x) => x.id === item) : item;
    if (!it) return 0;
    const stand = this.standing[it.crew] || 0;
    const factor = clampNum(1 - stand / 200, 0.5, 2);
    return Math.round(it.cash * factor);
  }

  canBuy(itemId, cash, rep) {
    const it = MARKET_ITEMS.find((x) => x.id === itemId);
    if (!it) return 'Unknown item.';
    if (this.owned.includes(it.id)) return 'Already owned.';
    if ((cash ?? 0) < this.priceFor(it)) return 'Not enough cash.';
    if ((rep ?? 0) < it.rep) return 'Not enough reputation.';
    if ((this.standing[it.crew] || 0) < -50) return `${CREWS[it.crew].name} will not deal with you.`;
    return null;
  }

  buy(itemId, cash, rep) {
    const blocked = this.canBuy(itemId, cash, rep);
    if (blocked) return { ok: false, reason: blocked };
    const it = MARKET_ITEMS.find((x) => x.id === itemId);
    const price = this.priceFor(it);
    this.owned.push(it.id);
    if (it.effect === 'nitro') {
      this.upgrades.nitro = (this.upgrades.nitro || 0) + it.value;
    } else {
      this.upgrades[it.effect] = clamp01Num((this.upgrades[it.effect] || 0) + it.value);
    }
    this.standing[it.crew] = clampNum((this.standing[it.crew] || 0) + 8, -100, 100);
    if (it.offends) {
      this.standing[it.offends] = clampNum((this.standing[it.offends] || 0) - 6, -100, 100);
    }
    this.spent += price;
    this.deals += 1;
    if (this.audio && typeof this.audio.marketChime === 'function') this.audio.marketChime();
    if (typeof this.hooks.onBuy === 'function') this.hooks.onBuy(it, price);
    return { ok: true, price, item: it, name: it.name };
  }

  addRep(crew = 'owls', amount = 0) {
    const before = this.standing[crew] || 0;
    const after = clampNum(before + amount, -100, 100);
    this.standing[crew] = after;
    return { crew, crewName: CREWS[crew] ? CREWS[crew].name : crew, before, after, standing: after };
  }

  favouriteCrew() {
    let best = 'vipers';
    let top = -Infinity;
    for (const k of Object.keys(this.standing)) {
      if (this.standing[k] > top) { top = this.standing[k]; best = k; }
    }
    return best;
  }

  catalogueLines(cash, rep) {
    const lines = ['BLACK MARKET — dock stall'];
    for (const it of MARKET_ITEMS) {
      const price = this.priceFor(it);
      let mark = 'available';
      if (this.owned.includes(it.id)) mark = 'OWNED';
      else if (this.canBuy(it.id, cash, rep)) mark = 'blocked';
      lines.push(`[${it.key}] ${it.name} — $${price} · ${it.rep} rep · ${CREWS[it.crew].name} · ${mark}`);
    }
    const fav = this.favouriteCrew();
    lines.push(`Standing — Vipers ${this.standing.vipers} · Harbor ${this.standing.harbor} · Owls ${this.standing.owls} · Favourite: ${CREWS[fav].name} · Deals: ${this.deals}`);
    return lines;
  }

  toggleShop() {
    if (!this.near && !this.open) return false;
    this.open = !this.open;
    if (this.audio && typeof this.audio.blip === 'function') this.audio.blip();
    return this.open;
  }

  update(dt, px, pz, nightF = 0) {
    const d = dist2(px, pz, STALL_POS.x, STALL_POS.z);
    const wasNear = this.near;
    this.near = d <= 9;
    if (this.near && !wasNear && !this.announced) {
      this.announced = true;
      if (typeof this.hooks.announce === 'function') this.hooks.announce('Black market stall nearby — press B to browse.');
    }
    if (!this.near) {
      this.announced = false;
      if (this.open) this.open = false;
    }
    const lit = nightF > 0.3;
    this.signLit = lit;
    this.flicker += dt;
    if (lit) {
      const flick = Math.sin(this.flicker * 9) > -0.85 ? 1 : 0.25;
      this.lampIntensity = flick * (0.4 + nightF);
      this.signBars.forEach((bar, i) => {
        bar.material.emissiveIntensity = flick * (0.6 + 0.2 * i);
      });
      if (this.audio && typeof this.audio.lockpickTick === 'function' && this.roll(0, 1) < dt * 0.05) {
        this.audio.lockpickTick();
      }
    } else {
      this.lampIntensity = 0;
      this.signBars.forEach((bar) => { bar.material.emissiveIntensity = 0.15; });
    }
    return { near: this.near, open: this.open, distance: d };
  }

  statusLine() {
    if (this.open) return this.catalogueLines().join(' | ');
    if (this.near) return 'Press B — Black Market';
    const fav = this.favouriteCrew();
    return `Black Market · Favourite ${CREWS[fav].name} (${this.standing[fav]}) · ${this.deals} deals`;
  }

  serialize() {
    return {
      upgrades: { ...this.upgrades },
      owned: [...this.owned],
      standing: { ...this.standing },
      spent: this.spent,
      deals: this.deals,
    };
  }

  restore(input) {
    if (!input || typeof input !== 'object') return;
    if (input.upgrades) this.upgrades = { ...this.upgrades, ...input.upgrades };
    if (Array.isArray(input.owned)) this.owned = [...input.owned];
    if (input.standing) this.standing = { ...this.standing, ...input.standing };
    this.spent = typeof input.spent === 'number' ? input.spent : 0;
    this.deals = typeof input.deals === 'number' ? input.deals : 0;
  }
}
