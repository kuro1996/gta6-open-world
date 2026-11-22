// Solara Nights — the Black Market: three crews, one stall, and a
// reputation ledger that remembers every deal. Ria earns REP by doing
// night work and side jobs; the crews spend it. The Vipers sell speed,
// the Harbor Kings sell protection, the Night Owls sell silence —
// each crew has its own stock, its own price curve, and its own
// attitude. Buy from one crew too often and the other two notice:
// their prices creep up while the favourite's prices fall. The stall
// itself is a real place in the world (a shuttered kiosk by the docks
// with a neon sign that only lights after dark), and the shop only
// opens when Ria is standing next to it. No menus from nowhere —
// walk to the docks, press B, spend the money.
import * as THREE from 'three';
import { clamp, clamp01, distance2D } from './random.js';

// The three crews. Standing runs -100..100: negative means they will
// not deal with you at all; high standing unlocks their best stock.
export const CREWS = {
  vipers: {
    name: 'Vipers',
    color: 0x39ff6a,
    tag: 'SPEED',
    blurb: 'Street racers. They sell go-fast parts and ask no questions.',
  },
  harbor: {
    name: 'Harbor Kings',
    color: 0x4db8ff,
    tag: 'ARMOR',
    blurb: 'Dock muscle. They sell plating, plates, and second chances.',
  },
  owls: {
    name: 'Night Owls',
    color: 0xc07dff,
    tag: 'SILENCE',
    blurb: 'Fixers and ghosts. They sell quiet — the most expensive thing in Solara.',
  },
};

// The catalogue. Every item names the crew that stocks it, what it
// costs in cash and in reputation, what it does, and which crew it
// offends (buying from a rival's shelf costs standing with them).
export const MARKET_ITEMS = [
  {
    id: 'nitro-1', crew: 'vipers', name: 'Nitro Shot', key: '1',
    cash: 450, rep: 0, blurb: 'One full nitro burst per chase. (passive)',
    effect: 'nitro', value: 1, offends: null,
  },
  {
    id: 'engine-1', crew: 'vipers', name: 'Viper Tune', key: '2',
    cash: 800, rep: 10, blurb: '+12% top speed on every car you drive.',
    effect: 'topSpeed', value: 0.12, offends: 'harbor',
  },
  {
    id: 'engine-2', crew: 'vipers', name: 'Viper Heart', key: '3',
    cash: 1500, rep: 30, blurb: '+25% top speed. The Vipers only sell this to family.',
    effect: 'topSpeed', value: 0.25, offends: 'harbor',
  },
  {
    id: 'armor-1', crew: 'harbor', name: 'Door Plating', key: '4',
    cash: 600, rep: 5, blurb: 'Cars take 20% less damage from rams and bullets.',
    effect: 'carArmor', value: 0.2, offends: 'vipers',
  },
  {
    id: 'armor-2', crew: 'harbor', name: 'Kevlar Weave', key: '5',
    cash: 900, rep: 20, blurb: 'Ria takes 25% less damage on foot.',
    effect: 'bodyArmor', value: 0.25, offends: 'vipers',
  },
  {
    id: 'armor-3', crew: 'harbor', name: 'Clean Plates', key: '6',
    cash: 1200, rep: 35, blurb: 'Wanted stars cool off 30% faster.',
    effect: 'coolOff', value: 0.3, offends: 'owls',
  },
  {
    id: 'ghost-1', crew: 'owls', name: 'Ghost Soles', key: '7',
    cash: 500, rep: 8, blurb: 'Half the noise while sneaking at night.',
    effect: 'quietFeet', value: 0.5, offends: 'vipers',
  },
  {
    id: 'ghost-2', crew: 'owls', name: 'Dead Drop Key', key: '8',
    cash: 1100, rep: 25, blurb: 'Night contracts pay +30% — the Owls skim nothing.',
    effect: 'nightPay', value: 0.3, offends: 'harbor',
  },
  {
    id: 'ghost-3', crew: 'owls', name: 'Owl Eyes', key: '9',
    cash: 1400, rep: 40, blurb: 'See watcher cones 40% farther on the minimap.',
    effect: 'owlEyes', value: 0.4, offends: 'harbor',
  },
];

// Where the stall lives: the shuttered kiosk by the docks, far enough
// from the story waypoints that finding it feels like finding it.
export const STALL_POS = { x: -185, z: 195 };

function makeStallMesh(scene) {
  const group = new THREE.Group();
  const kiosk = new THREE.Mesh(
    new THREE.BoxGeometry(5, 3.2, 3.4),
    new THREE.MeshStandardMaterial({ color: 0x2a2a33, roughness: 0.85 }),
  );
  kiosk.position.y = 1.6;
  group.add(kiosk);
  const shutter = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 1.8, 0.15),
    new THREE.MeshStandardMaterial({ color: 0x55555f, roughness: 0.6, metalness: 0.4 }),
  );
  shutter.position.set(0, 1.4, 1.75);
  group.add(shutter);
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(5.6, 0.25, 4),
    new THREE.MeshStandardMaterial({ color: 0x1a1a20, roughness: 0.9 }),
  );
  roof.position.y = 3.3;
  group.add(roof);
  // The neon sign: three bars, one per crew, that light up after dark.
  const signBars = [];
  const crewKeys = Object.keys(CREWS);
  crewKeys.forEach((key, i) => {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.35, 0.1),
      new THREE.MeshBasicMaterial({ color: CREWS[key].color }),
    );
    bar.position.set(-1.6 + i * 1.6, 3.9, 0.4);
    group.add(bar);
    signBars.push(bar);
  });
  const lamp = new THREE.PointLight(0xc07dff, 0, 26, 1.6);
  lamp.position.set(0, 4.4, 2.5);
  group.add(lamp);
  group.position.set(STALL_POS.x, 0, STALL_POS.z);
  scene.add(group);
  return { group, signBars, lamp };
}

export class BlackMarket {
  constructor(scene, rng, audio, hooks) {
    this.scene = scene;
    this.rng = rng;
    this.audio = audio;
    this.hooks = hooks || {};

    this.stall = makeStallMesh(scene);
    // Upgrades the rest of the game reads. Every field starts at its
    // "no upgrade" value, so a fresh save plays exactly like before.
    this.upgrades = {
      nitro: 0,
      topSpeed: 0,
      carArmor: 0,
      bodyArmor: 0,
      coolOff: 0,
      quietFeet: 0,
      nightPay: 0,
      owlEyes: 0,
    };
    this.owned = {};
    // Standing per crew, -100..100. Everyone starts neutral: 0.
    this.standing = { vipers: 0, harbor: 0, owls: 0 };
    this.spent = 0;
    this.deals = 0;
    this.open = false;
    this.nearStall = false;
    this._neonFlicker = 0;
    this._lastPrompt = '';
  }

  // Price a crew's item with standing applied: a crew you are loved
  // by sells cheap, a crew you have offended charges through the nose.
  // The multiplier is clamped so no item ever costs less than half or
  // more than double its sticker price.
  priceFor(item) {
    const stand = this.standing[item.crew] || 0;
    const mult = clamp(1 - stand / 200, 0.5, 2);
    return Math.round(item.cash * mult);
  }

  // Can this item be bought right now? Returns a reason string when
  // not, so the shop can tell the player exactly what is missing.
  canBuy(item, money, rep) {
    if (this.owned[item.id]) return 'already owned';
    if (money < this.priceFor(item)) return 'not enough cash';
    if (rep < item.rep) return `needs ${item.rep} rep (you have ${rep})`;
    if ((this.standing[item.crew] || 0) < -50) return `${CREWS[item.crew].name} refuse to deal with you`;
    return null;
  }

  // Buy it. Returns { ok, price } or { ok: false, reason }. Applies
  // the effect, moves standing (up with the seller, down with the
  // offended rival), and tells the main loop what changed.
  buy(itemId, money, rep) {
    const item = MARKET_ITEMS.find((i) => i.id === itemId);
    if (!item) return { ok: false, reason: 'no such item' };
    const reason = this.canBuy(item, money, rep);
    if (reason) return { ok: false, reason };
    const price = this.priceFor(item);
    this.owned[item.id] = true;
    if (item.effect === 'nitro') this.upgrades.nitro += item.value;
    else this.upgrades[item.effect] = clamp01(this.upgrades[item.effect] + item.value);
    this.standing[item.crew] = clamp(this.standing[item.crew] + 8, -100, 100);
    if (item.offends) {
      this.standing[item.offends] = clamp(this.standing[item.offends] - 6, -100, 100);
    }
    this.spent += price;
    this.deals += 1;
    if (this.audio && this.audio.marketChime) this.audio.marketChime();
    if (this.hooks.onBuy) this.hooks.onBuy(item, price);
    return { ok: true, price, item };
  }

  // Reputation from night work and side jobs flows through here so
  // every source uses the same ledger — and so a crew can be thanked
  // by name when the player helps them.
  addRep(amount, crew) {
    const before = this.standing[crew || 'owls'] || 0;
    if (crew && this.standing[crew] !== undefined) {
      this.standing[crew] = clamp(this.standing[crew] + amount, -100, 100);
    }
    return { crew: crew || 'owls', before, after: this.standing[crew || 'owls'] };
  }

  // Which crew likes Ria most right now — the HUD names a favourite
  // so the player can feel the ledger move.
  favouriteCrew() {
    let best = 'vipers';
    for (const key of Object.keys(this.standing)) {
      if (this.standing[key] > this.standing[best]) best = key;
    }
    return best;
  }

  // The shop's one-line catalogue, rendered by the main loop into the
  // prompt bar while the shop is open. Keys 1-9 buy, B closes.
  catalogueLines(money, rep) {
    const lines = ['— BLACK MARKET · press 1-9 to buy, B to leave —'];
    for (const item of MARKET_ITEMS) {
      const price = this.priceFor(item);
      const blocked = this.canBuy(item, money, rep);
      const mark = this.owned[item.id] ? 'OWNED' : blocked ? `✕ ${blocked}` : '✓';
      lines.push(`[${item.key}] ${item.name} · $${price} · ${item.rep} rep · ${CREWS[item.crew].name} · ${mark}`);
    }
    lines.push(`Standing — Vipers ${this.standing.vipers} · Harbor ${this.standing.harbor} · Owls ${this.standing.owls}`);
    return lines;
  }

  toggleShop() {
    if (!this.nearStall && !this.open) return false;
    this.open = !this.open;
    if (this.audio && this.audio.blip) this.audio.blip();
    return this.open;
  }

  update(dt, playerX, playerZ, nightF) {
    const dist = distance2D(playerX, playerZ, STALL_POS.x, STALL_POS.z);
    const wasNear = this.nearStall;
    this.nearStall = dist < 9;
    if (this.nearStall && !wasNear && !this.open) {
      if (this.hooks.announce) this.hooks.announce('Black Market stall — press B to browse.');
    }
    if (!this.nearStall && this.open) this.open = false;
    // Neon after dark: the sign flickers on once the sun is down and
    // stays dark in daylight, so the stall is a night landmark. Each
    // bar remembers its crew colour, so a flicker-off is a real dark
    // bar, not a bar that forgot what colour it was.
    this._neonFlicker -= dt;
    const lit = nightF > 0.5;
    if (lit && this._neonFlicker <= 0) {
      this._neonFlicker = this.rng.range(0.08, 0.5);
      const on = this.rng.range(0, 1) > 0.12;
      this.stall.lamp.intensity = on ? 1.6 : 0.2;
      const keys = Object.keys(CREWS);
      this.stall.signBars.forEach((bar, i) => {
        bar.material.color.setHex(on ? CREWS[keys[i]].color : 0x111111);
      });
      if (on && this.audio && this.audio.lockpickTick) this.audio.lockpickTick();
    } else if (!lit) {
      this.stall.lamp.intensity = 0;
      const keys = Object.keys(CREWS);
      this.stall.signBars.forEach((bar, i) => {
        bar.material.color.setHex(0x222222);
      });
    }
    return { near: this.nearStall, open: this.open, dist };
  }

  statusLine(money, rep) {
    if (this.open) return this.catalogueLines(money, rep).join('  |  ');
    if (this.nearStall) return '🛒 BLACK MARKET — press B to browse (1-9 to buy)';
    const fav = CREWS[this.favouriteCrew()];
    return `🛒 Black Market @ Docks · favourite: ${fav.name} (${this.standing[this.favouriteCrew()]}) · ${this.deals} deals`;
  }

  serialize() {
    return {
      upgrades: { ...this.upgrades },
      owned: { ...this.owned },
      standing: { ...this.standing },
      spent: this.spent,
      deals: this.deals,
    };
  }

  restore(data) {
    if (!data) return;
    if (data.upgrades) Object.assign(this.upgrades, data.upgrades);
    if (data.owned) Object.assign(this.owned, data.owned);
    if (data.standing) Object.assign(this.standing, data.standing);
    this.spent = data.spent || 0;
    this.deals = data.deals || 0;
  }
}
