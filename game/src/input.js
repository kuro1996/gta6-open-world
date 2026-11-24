import { clamp } from './random.js';

export const ACT_INTERACT = 1;
export const ACT_RELOAD = 2;
export const ACT_PAUSE = 4;
export const ACT_HORN = 8;
export const ACT_MUTE = 16;
export const ACT_SIDEJOB = 32;
export const ACT_TUTORIAL = 64;
export const ACT_MARKET = 128;
export const ACT_NIGHTOPS = 256;
export const ACT_RACE = 512;
export const ACT_SAFEHOUSE = 1024;
export const ACT_FISH = 2048;
export const ACT_PHOTO = 8192;

const ONE_SHOT = {
  KeyE: ACT_INTERACT,
  KeyF: ACT_INTERACT,
  KeyR: ACT_RELOAD,
  Escape: ACT_PAUSE,
  KeyP: ACT_PAUSE,
  KeyH: ACT_HORN,
  KeyM: ACT_MUTE,
  KeyQ: ACT_SIDEJOB,
  KeyT: ACT_TUTORIAL,
  KeyB: ACT_MARKET,
  KeyN: ACT_NIGHTOPS,
  KeyG: ACT_RACE,
  KeyU: ACT_SAFEHOUSE,
  KeyJ: ACT_FISH,
  KeyV: ACT_PHOTO,
};

export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.held = new Set();
    this.flags = 0;
    this.dx = 0;
    this.dy = 0;
    this.mouseDown = false;
    this.clicked = false;
    this.digit = 0;
    this.locked = false;
    this.onFirstGesture = null;
    this._gestured = false;

    window.addEventListener('keydown', (ev) => this._onKeyDown(ev));
    window.addEventListener('keyup', (ev) => this._onKeyUp(ev));
    window.addEventListener('blur', () => this.held.clear());
    document.addEventListener('mousemove', (ev) => this._onMouseMove(ev));
    canvas.addEventListener('mousedown', (ev) => this._onMouseDown(ev));
    canvas.addEventListener('mouseup', (ev) => this._onMouseUp(ev));
    canvas.addEventListener('contextmenu', (ev) => ev.preventDefault());
    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.canvas;
    });
  }

  _gesture() {
    if (this._gestured) return;
    this._gestured = true;
    if (typeof this.onFirstGesture === 'function') this.onFirstGesture();
  }

  _onKeyDown(ev) {
    const tag = ev.target && ev.target.tagName;
    if (tag === 'INPUT' || tag === 'BUTTON') return;
    this._gesture();
    if (ev.code === 'Space' || ev.code.indexOf('Arrow') === 0) ev.preventDefault();
    this.held.add(ev.code);
    if (ev.repeat) return;
    const flag = ONE_SHOT[ev.code];
    if (flag !== undefined) this.flags |= flag;
    if (ev.code.length === 6 && ev.code.slice(0, 5) === 'Digit') {
      const n = Number(ev.code.slice(5));
      if (n >= 1 && n <= 9) this.digit = n;
    }
  }

  _onKeyUp(ev) {
    this.held.delete(ev.code);
  }

  _onMouseMove(ev) {
    if (!this.locked) return;
    this.dx += ev.movementX || 0;
    this.dy += ev.movementY || 0;
  }

  _onMouseDown(ev) {
    this._gesture();
    if (ev.button === 0 || ev.button === 2) {
      this.mouseDown = true;
      this.clicked = true;
    }
  }

  _onMouseUp(ev) {
    if (ev.button === 0 || ev.button === 2) this.mouseDown = false;
  }

  down(code) {
    return this.held.has(code);
  }

  moveAxes() {
    let fwd = 0;
    let strafe = 0;
    if (this.held.has('KeyW') || this.held.has('ArrowUp')) fwd += 1;
    if (this.held.has('KeyS') || this.held.has('ArrowDown')) fwd -= 1;
    if (this.held.has('KeyD') || this.held.has('ArrowRight')) strafe += 1;
    if (this.held.has('KeyA') || this.held.has('ArrowLeft')) strafe -= 1;
    return { forward: fwd, strafe };
  }

  takeMouseDelta() {
    const out = { dx: clamp(this.dx, -300, 300), dy: clamp(this.dy, -300, 300) };
    this.dx = 0;
    this.dy = 0;
    return out;
  }

  takeActions() {
    const out = this.flags;
    this.flags = 0;
    return out;
  }

  consumeActions() {
    const flags = this.takeActions();
    return {
      pause: !!(flags & ACT_PAUSE),
      interact: !!(flags & ACT_INTERACT),
      reload: !!(flags & ACT_RELOAD),
      acceptJob: !!(flags & ACT_SIDEJOB),
      skipTutorial: !!(flags & ACT_TUTORIAL),
      toggleMarket: !!(flags & ACT_MARKET),
      acceptNightOps: !!(flags & ACT_NIGHTOPS),
      fish: !!(flags & ACT_FISH),
      togglePhoto: !!(flags & ACT_PHOTO),
      startRace: !!(flags & ACT_RACE),
      safehouse: !!(flags & ACT_SAFEHOUSE),
      digit: this.takeDigit(),
      sneak: this.held.has('KeyC'),
      horn: !!(flags & ACT_HORN),
      mute: !!(flags & ACT_MUTE),
      space: this.held.has('Space'),
      mouse: this.mouseDown,
    };
  }

  takeDigit() {
    const out = this.digit;
    this.digit = 0;
    return out;
  }

  takeClick() {
    const out = this.clicked;
    this.clicked = false;
    return out;
  }

  lockPointer() {
    try {
      const p = this.canvas.requestPointerLock();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } catch (err) {
      // headless or denied lock; ignore
    }
  }

  unlockPointer() {
    if (document.pointerLockElement) document.exitPointerLock();
  }
}
