// Solara Nights — keyboard + mouse input with pointer lock.
// Held keys are read every frame; one-shot presses (interact, reload, pause) are queued
// as flags and taken once, so a press between frames is never lost or counted twice.
import { clamp } from './random.js';

export const ACT_INTERACT = 1;
export const ACT_RELOAD = 2;
export const ACT_PAUSE = 4;
export const ACT_HORN = 8;
export const ACT_MUTE = 16;

export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = new Set();
    this.actions = 0;
    this.mouseDX = 0;
    this.mouseDY = 0;
    this.mouseDown = false;
    this.mouseClicked = false;
    this.locked = false;
    this.onFirstGesture = null;
    this._gestured = false;

    window.addEventListener('keydown', (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON')) return;
      this.keys.add(e.code);
      if (!e.repeat) {
        if (e.code === 'KeyE') this.actions |= ACT_INTERACT;
        if (e.code === 'KeyR') this.actions |= ACT_RELOAD;
        if (e.code === 'Escape' || e.code === 'KeyP') this.actions |= ACT_PAUSE;
        if (e.code === 'KeyH') this.actions |= ACT_HORN;
        if (e.code === 'KeyM') this.actions |= ACT_MUTE;
      }
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
      this._gesture();
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => this.keys.clear());
    document.addEventListener('mousemove', (e) => {
      if (this.locked) {
        this.mouseDX += e.movementX;
        this.mouseDY += e.movementY;
      }
    });
    canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.mouseDown = true;
        this.mouseClicked = true;
      }
      this._gesture();
    });
    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.mouseDown = false;
    });
    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === canvas;
    });
  }

  _gesture() {
    if (!this._gestured) {
      this._gestured = true;
      if (this.onFirstGesture) this.onFirstGesture();
    }
  }

  down(code) {
    return this.keys.has(code);
  }

  /** Forward/back/strafe as -1..1, from WASD or arrows. */
  moveAxes() {
    const f = (this.down('KeyW') || this.down('ArrowUp') ? 1 : 0) - (this.down('KeyS') || this.down('ArrowDown') ? 1 : 0);
    const s = (this.down('KeyD') || this.down('ArrowRight') ? 1 : 0) - (this.down('KeyA') || this.down('ArrowLeft') ? 1 : 0);
    return { forward: f, strafe: s };
  }

  takeMouseDelta() {
    // Clamp the accumulated delta: after a tab switch a huge backlog would
    // otherwise spin the camera a full turn in one frame.
    const dx = clamp(this.mouseDX, -300, 300);
    const dy = clamp(this.mouseDY, -300, 300);
    this.mouseDX = 0;
    this.mouseDY = 0;
    return { dx, dy };
  }

  takeActions() {
    const taken = this.actions;
    this.actions = 0;
    return taken;
  }

  takeClick() {
    const c = this.mouseClicked;
    this.mouseClicked = false;
    return c;
  }

  lockPointer() {
    try {
      // requestPointerLock returns a promise in current Chrome; a denial
      // (headless, iframe without permission) rejects it, so swallow the
      // rejection instead of letting it surface as an uncaught error.
      const p = this.canvas.requestPointerLock();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } catch {
      // Pointer lock can fail in headless runs; mouse look then stays off.
    }
  }

  unlockPointer() {
    if (document.pointerLockElement) document.exitPointerLock();
  }
}
