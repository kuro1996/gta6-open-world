const EL_IDS = [
  'money', 'health-fill', 'health-text', 'stars', 'speed', 'ammo', 'objective',
  'distance', 'mission', 'banner', 'banner-title', 'banner-sub', 'prompt',
  'crosshair', 'vignette', 'minimap', 'clock', 'car', 'car-fill', 'car-text',
  'weather', 'tutorial', 'drift', 'heli', 'chain', 'nightops', 'market',
];

function stubEl(id) {
  return {
    id,
    textContent: '',
    style: {},
    classList: { add() {}, remove() {}, toggle() {} },
    getContext() { return stubCtx(); },
    width: 180,
    height: 180,
  };
}

function stubCtx() {
  const noop = () => {};
  return new Proxy({}, {
    get(t, k) {
      if (k === 'canvas') return { width: 180, height: 180 };
      return typeof k === 'string' ? noop : undefined;
    },
    set() { return true; },
  });
}

function clampV(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

export class HUD {
  constructor() {
    this.els = {};
    const hasDoc = typeof document !== 'undefined' && document && typeof document.getElementById === 'function';
    for (const id of EL_IDS) {
      this.els[id] = hasDoc ? (document.getElementById(id) || stubEl(id)) : stubEl(id);
    }
    const mm = this.els.minimap;
    this.mapCtx = (mm && typeof mm.getContext === 'function') ? mm.getContext('2d') : stubCtx();
    this.bannerTimer = 0;
    this.lastStars = -1;
    this.driftFlashTimer = 0;
    this.lastBanked = 0;
    this.timeNow = 0;
  }

  showBanner(title, sub, seconds = 3.5) {
    const b = this.els.banner;
    if (this.els['banner-title']) this.els['banner-title'].textContent = title || '';
    if (this.els['banner-sub']) {
      this.els['banner-sub'].textContent = sub || '';
      this.els['banner-sub'].style.display = sub ? '' : 'none';
    }
    if (b) b.style.display = '';
    this.bannerTimer = seconds;
  }

  hideBanner() {
    if (this.els.banner) this.els.banner.style.display = 'none';
    this.bannerTimer = 0;
  }

  setPrompt(text) {
    const p = this.els.prompt;
    if (!p) return;
    p.textContent = text || '';
    p.style.display = text ? '' : 'none';
  }

  setTutorial(text) {
    const t = this.els.tutorial;
    if (!t) return;
    t.textContent = text || '';
    t.style.display = text ? '' : 'none';
  }

  setCrosshair(show) {
    const ch = this.els.crosshair;
    if (!ch) return;
    ch.style.display = show ? '' : 'none';
  }

  update(dt, st) {
    const step = Number(dt) || 0;
    const s = st || {};
    this.timeNow += step;
    if (this.bannerTimer > 0) {
      this.bannerTimer -= step;
      if (this.bannerTimer <= 0) this.hideBanner();
    }
    const money = s.money ?? 0;
    if (this.els.money) this.els.money.textContent = '$' + Number(money).toLocaleString('en-US');
    const hp = s.health ?? 100;
    if (this.els['health-fill']) this.els['health-fill'].style.width = clampV(hp, 0, 100) + '%';
    if (this.els['health-text']) this.els['health-text'].textContent = String(Math.round(hp));
    if (this.els['health-fill']) {
      this.els['health-fill'].style.background = hp > 50 ? '#39d353' : (hp > 25 ? '#ffb020' : '#ff4444');
    }
    const wanted = s.wanted ?? 0;
    if (this.els.stars && wanted !== this.lastStars) {
      this.lastStars = wanted;
      this.els.stars.textContent = '★'.repeat(wanted) + '☆'.repeat(Math.max(0, 5 - wanted));
      this.els.stars.style.color = wanted > 0 ? '#ff4444' : '';
    }
    if (this.els.speed) {
      this.els.speed.textContent = s.inCar ? `${Math.round((s.speed || 0) * 3.6)} km/h` : '';
    }
    if (this.els.ammo) {
      if (s.reloading) this.els.ammo.textContent = 'Reloading…';
      else {
        this.els.ammo.textContent = `${s.ammo ?? 0} / ∞`;
        this.els.ammo.style.color = (s.ammo ?? 0) <= 3 ? '#ff4444' : '';
      }
    }
    if (this.els.car) {
      if (s.inCar) {
        this.els.car.style.display = '';
        const ch = s.carHealth ?? 100;
        if (this.els['car-fill']) {
          this.els['car-fill'].style.width = clampV(ch, 0, 100) + '%';
          this.els['car-fill'].style.background = ch > 50 ? '#39d353' : (ch > 25 ? '#ffb020' : '#ff4444');
        }
        if (this.els['car-text']) {
          const zones = s.damageZones || { front: 0, side: 0, rear: 0 };
          let worst = 'front';
          let worstV = zones.front || 0;
          if ((zones.side || 0) > worstV) { worst = 'side'; worstV = zones.side; }
          if ((zones.rear || 0) > worstV) { worst = 'rear'; worstV = zones.rear; }
          this.els['car-text'].textContent = worstV > 0 ? `Damage: ${worst}` : 'Car OK';
        }
      } else {
        this.els.car.style.display = 'none';
      }
    }
    if (this.els.mission) this.els.mission.textContent = s.missionTitle || 'Free Roam';
    if (this.els.objective) this.els.objective.textContent = s.objective || '';
    if (this.els.distance) {
      this.els.distance.textContent = s.waypointDist != null ? `${Math.round(s.waypointDist)}m` : '';
    }
    if (this.els.clock) {
      if (s.timeLeft != null) {
        const t = Math.max(0, s.timeLeft);
        this.els.clock.textContent = `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
        this.els.clock.style.color = t < 30 ? '#ff4444' : '';
      } else {
        const icon = { dawn: '🌅', day: '☀️', dusk: '🌇', night: '🌙' }[s.dayPhase] || '☀️';
        this.els.clock.textContent = `${icon} ${s.clock || ''}`;
        this.els.clock.style.color = '';
      }
    }
    if (this.els.weather) {
      this.els.weather.textContent = s.raining ? '🌧 Rain' : '';
      this.els.weather.style.display = s.raining ? '' : 'none';
    }
    if (this.els.heli) {
      this.els.heli.textContent = (s.wanted >= 5 && s.heli) ? '🚁 HELICOPTER' : '';
      this.els.heli.style.display = (s.wanted >= 5 && s.heli) ? '' : 'none';
    }
    if (this.els.nightops) {
      const txt = [s.outlook, s.nightops].filter(Boolean).join(' · ');
      this.els.nightops.textContent = txt;
    }
    if (this.els.market) this.els.market.textContent = s.market || '';
    if (this.els.drift) {
      if (s.drifting) {
        this.els.drift.textContent = `DRIFT ${Math.round(s.drift || 0)}`;
        this.els.drift.style.display = '';
      } else if (this.driftFlashTimer > 0) {
        this.driftFlashTimer -= step;
        const delta = Math.floor(((s.driftBanked || 0) - this.lastBanked) / 2);
        this.els.drift.textContent = delta > 0 ? `+$${delta} drift banked` : '';
      } else {
        this.els.drift.textContent = '';
      }
      if ((s.driftBanked || 0) !== this.lastBanked && !s.drifting) {
        this.driftFlashTimer = 2.5;
        this.lastBanked = s.driftBanked || 0;
      }
    }
    if (this.els.chain) {
      const ch = s.chain;
      this.els.chain.textContent = ch && ch.done > 0 ? `Chain: ${ch.title} ${ch.done}/${ch.total} (+$${ch.bonus || 0})` : '';
    }
    if (this.els.vignette) {
      const hurt = s.hurt || 0;
      const low = hp < 30 ? (30 - hp) / 30 : 0;
      this.els.vignette.style.opacity = String(clampV(Math.max(hurt, low), 0, 1));
    }
    this.drawMinimap(s);
  }

  drawMinimap(s) {
    const g = this.mapCtx;
    if (!g) return;
    const W = 180;
    const H = 180;
    const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : this.timeNow * 1000;
    try {
      g.clearRect(0, 0, W, H);
      g.fillStyle = '#0d1b2a';
      g.fillRect(0, 0, W, H);
      g.fillStyle = '#c9a86a';
      g.fillRect(W - 14, 0, 14, H);
      g.fillStyle = '#1f7a5c';
      g.fillRect(W - 18, 0, 4, H);
      g.strokeStyle = '#334455';
      g.lineWidth = 1;
      for (let i = 0; i <= 6; i++) {
        const p = (i / 6) * W;
        g.beginPath(); g.moveTo(p, 0); g.lineTo(p, H); g.stroke();
        g.beginPath(); g.moveTo(0, p); g.lineTo(W, p); g.stroke();
      }
      const toMap = (x, z) => ({ x: clampV((x + 260) / 520 * W, 4, W - 4), y: clampV((z + 260) / 520 * H, 4, H - 4) });
      const diamond = (x, z, color) => {
        const m = toMap(x, z);
        g.fillStyle = color;
        g.beginPath();
        g.moveTo(m.x, m.y - 5); g.lineTo(m.x + 5, m.y); g.lineTo(m.x, m.y + 5); g.lineTo(m.x - 5, m.y);
        g.closePath(); g.fill();
      };
      if (s.waypoint) diamond(s.waypoint.x, s.waypoint.z, '#ffd24a');
      if (s.sideWaypoint) diamond(s.sideWaypoint.x, s.sideWaypoint.z, '#2ee6e6');
      g.fillStyle = '#ffffff';
      g.textAlign = 'right';
      g.font = '9px sans-serif';
      for (const pl of s.places || []) {
        const m = toMap(pl.x, pl.z);
        g.fillText(pl.name || '', m.x, m.y - 4);
      }
      const flash = Math.floor(now / 400) % 2 === 0;
      for (const car of s.cars || []) {
        const m = toMap(car.x, car.z);
        g.fillStyle = '#888888';
        g.fillRect(m.x - 1, m.y - 1, 2, 2);
      }
      for (const pol of s.police || []) {
        const m = toMap(pol.x, pol.z);
        g.fillStyle = flash ? '#ff4444' : '#2e9bff';
        g.fillRect(m.x - 2, m.y - 2, 4, 4);
      }
      for (const car of s.parked || []) {
        const m = toMap(car.x, car.z);
        g.fillStyle = '#ffd24a';
        g.fillRect(m.x - 1, m.y - 1, 3, 3);
      }
      g.strokeStyle = '#ff4444';
      for (const rb of s.roadblocks || []) {
        const m = toMap(rb.x, rb.z);
        g.beginPath();
        g.moveTo(m.x - 4, m.y - 4); g.lineTo(m.x + 4, m.y + 4);
        g.moveTo(m.x + 4, m.y - 4); g.lineTo(m.x - 4, m.y + 4);
        g.stroke();
      }
      if (s.heliPos) {
        const m = toMap(s.heliPos.x, s.heliPos.z);
        g.strokeStyle = '#ffffff';
        g.beginPath(); g.arc(m.x, m.y, 6, 0, Math.PI * 2); g.stroke();
      }
      const px = s.playerX ?? s.x ?? 0;
      const pz = s.playerZ ?? s.z ?? 0;
      const pm = toMap(px, pz);
      const heading = s.heading || 0;
      g.fillStyle = s.inCar ? '#39d353' : '#ffffff';
      g.beginPath();
      g.moveTo(pm.x + Math.sin(heading) * 7, pm.y - Math.cos(heading) * 7);
      g.lineTo(pm.x + Math.sin(heading + 2.6) * 5, pm.y - Math.cos(heading + 2.6) * 5);
      g.lineTo(pm.x + Math.sin(heading - 2.6) * 5, pm.y - Math.cos(heading - 2.6) * 5);
      g.closePath(); g.fill();
      g.strokeStyle = '#ffffff';
      g.strokeRect(0.5, 0.5, W - 1, H - 1);
      g.fillStyle = '#ffffff';
      g.textAlign = 'left';
      g.fillText('N', 4, 12);
    } catch (err) {
      // minimap is decorative; never break the frame
    }
  }
}
