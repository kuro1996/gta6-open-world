// Solara Nights — the HUD: money, health, wanted stars, speed, ammo, objective,
// banners, and a live 2D minimap drawn on a canvas.
import { clamp } from './random.js';

export class HUD {
  constructor() {
    this.el = {
      money: document.getElementById('hud-money'),
      health: document.getElementById('hud-health-fill'),
      healthText: document.getElementById('hud-health-text'),
      stars: document.getElementById('hud-stars'),
      speed: document.getElementById('hud-speed'),
      ammo: document.getElementById('hud-ammo'),
      objective: document.getElementById('hud-objective'),
      distance: document.getElementById('hud-distance'),
      mission: document.getElementById('hud-mission'),
      banner: document.getElementById('hud-banner'),
      bannerTitle: document.getElementById('hud-banner-title'),
      bannerSub: document.getElementById('hud-banner-sub'),
      prompt: document.getElementById('hud-prompt'),
      crosshair: document.getElementById('crosshair'),
      vignette: document.getElementById('dmg-vignette'),
      minimap: document.getElementById('minimap'),
      clock: document.getElementById('hud-clock'),
    };
    this.mapCtx = this.el.minimap.getContext('2d');
    this._bannerTimer = 0;
    this._lastStars = -1;
  }

  showBanner(title, sub, ms) {
    this.el.bannerTitle.textContent = title;
    this.el.bannerSub.textContent = sub || '';
    // An empty sub leaves a blank line that shifts the title; hide it.
    this.el.bannerSub.classList.toggle('hidden', !sub);
    this.el.banner.classList.remove('hidden');
    this._bannerTimer = (ms || 3500) / 1000;
  }

  hideBanner() {
    this.el.banner.classList.add('hidden');
    this._bannerTimer = 0;
  }

  setPrompt(text) {
    if (text) {
      this.el.prompt.textContent = text;
      this.el.prompt.classList.remove('hidden');
    } else {
      this.el.prompt.classList.add('hidden');
    }
  }

  setCrosshair(visible) {
    this.el.crosshair.classList.toggle('hidden', !visible);
  }

  update(dt, state) {
    if (this._bannerTimer > 0) {
      this._bannerTimer -= dt;
      if (this._bannerTimer <= 0) this.hideBanner();
    }
    this.el.money.textContent = `$${state.money.toLocaleString('en-US')}`;
    const hp = Math.max(0, Math.round(state.health));
    this.el.health.style.width = `${hp}%`;
    this.el.health.style.background = hp > 50 ? '#3aa655' : hp > 25 ? '#e8a33a' : '#c23b2e';
    this.el.healthText.textContent = `${hp}`;
    if (state.wanted !== this._lastStars) {
      this._lastStars = state.wanted;
      this.el.stars.textContent = '★'.repeat(state.wanted) + '☆'.repeat(5 - state.wanted);
      this.el.stars.classList.toggle('hot', state.wanted > 0);
    }
    this.el.speed.textContent = state.inCar ? `${Math.round(Math.abs(state.speed) * 3.6)} km/h` : '';
    this.el.ammo.textContent = state.reloading ? 'RELOADING…' : `◉ ${state.ammo} / ∞`;
    this.el.mission.textContent = state.missionTitle || 'FREE ROAM';
    this.el.objective.textContent = state.objective || '';
    this.el.distance.textContent = state.waypointDist ? `▸ ${Math.round(state.waypointDist)} m to target` : '';
    this.el.clock.textContent = state.timeLeft ? `⏱ ${Math.ceil(state.timeLeft)}s` : state.clock;
    this.el.vignette.style.opacity = state.hurt ? '0.85' : state.health < 30 ? '0.45' : '0';
    this._drawMinimap(state);
  }

  _drawMinimap(state) {
    const ctx = this.mapCtx;
    const S = 180;
    const half = 300;
    const toMap = (x, z) => [S / 2 + (x / half) * (S / 2), S / 2 + (z / half) * (S / 2)];
    ctx.clearRect(0, 0, S, S);
    ctx.fillStyle = 'rgba(10, 18, 30, 0.82)';
    ctx.fillRect(0, 0, S, S);
    // Ocean + beach on the east edge.
    ctx.fillStyle = '#1e6f9e';
    ctx.fillRect(S * 0.86, 0, S * 0.14, S);
    ctx.fillStyle = '#e8d29a';
    ctx.fillRect(S * 0.82, 0, S * 0.04, S);
    // Roads.
    ctx.strokeStyle = '#5a5a62';
    ctx.lineWidth = 3;
    for (let k = -4; k <= 4; k += 1) {
      const [x1, z1] = toMap(k * 58, -260);
      const [x2, z2] = toMap(k * 58, 260);
      ctx.beginPath();
      ctx.moveTo(x1, z1);
      ctx.lineTo(x2, z2);
      ctx.stroke();
      const [x3, z3] = toMap(-260, k * 58);
      const [x4, z4] = toMap(260, k * 58);
      ctx.beginPath();
      ctx.moveTo(x3, z3);
      ctx.lineTo(x4, z4);
      ctx.stroke();
    }
    // Waypoint.
    if (state.waypoint) {
      const [wx, wy] = toMap(state.waypoint.x, state.waypoint.z);
      ctx.fillStyle = '#ffd23d';
      ctx.save();
      ctx.translate(wx, wy);
      ctx.rotate(Math.PI / 4);
      ctx.fillRect(-4, -4, 8, 8);
      ctx.restore();
    }
    // Traffic + police dots.
    for (const c of state.cars || []) {
      const [cx, cy] = toMap(c.x, c.z);
      ctx.fillStyle = c.police ? (Math.floor(performance.now() / 250) % 2 ? '#ff2222' : '#2244ff') : '#c8c8c8';
      ctx.fillRect(cx - 2, cy - 2, 4, 4);
    }
    // Player arrow, clamped inside the map so it never vanishes when the
    // player drives out to the world bounds.
    const [rawPx, rawPy] = toMap(state.px, state.pz);
    const px = clamp(rawPx, 5, S - 5);
    const py = clamp(rawPy, 5, S - 5);
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(state.heading || 0);
    ctx.fillStyle = state.inCar ? '#3aa655' : '#ffffff';
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(4.5, 5);
    ctx.lineTo(-4.5, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, S - 2, S - 2);
  }
}
