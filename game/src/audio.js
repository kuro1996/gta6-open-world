const CHORDS = [
  [220.0, 261.63, 329.63],
  [174.61, 220.0, 261.63],
  [261.63, 329.63, 392.0],
  [196.0, 246.94, 293.66],
];

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.musicTimer = null;
    this.musicStep = 0;
    this.engineOsc = null;
    this.engineGain = null;
    this.sirenOsc = null;
    this.sirenGain = null;
    this.sirenLfo = null;
    this.sirenOn = false;
    this.rainSource = null;
    this.rainGain = null;
  }

  ensure() {
    try {
      if (typeof window === 'undefined' || !window.AudioContext) return;
      if (!this.ctx) {
        this.ctx = new window.AudioContext();
        this.master = this.ctx.createGain();
        this.master.gain.value = this.muted ? 0 : 0.5;
        this.master.connect(this.ctx.destination);
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch (err) {
      // audio is optional
    }
  }

  setMuted(m) {
    this.muted = !!m;
    if (this.master) this.master.gain.value = this.muted ? 0 : 0.5;
  }

  tone(freq, dur, type = 'sine', vol = 0.2, slideTo) {
    if (!this.ctx || !this.master) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, this.ctx.currentTime + dur);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start();
      osc.stop(this.ctx.currentTime + dur);
    } catch (err) {}
  }

  noise(dur, vol = 0.2, lowpass) {
    if (!this.ctx || !this.master) return;
    try {
      const len = Math.floor(this.ctx.sampleRate * dur);
      const buffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      const src = this.ctx.createBufferSource();
      src.buffer = buffer;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
      let node = src;
      if (lowpass) {
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = lowpass;
        src.connect(filter);
        node = filter;
      }
      node.connect(gain);
      gain.connect(this.master);
      src.start();
    } catch (err) {}
  }

  blip() { this.tone(880, 0.07, 'square', 0.12); }

  horn() {
    this.tone(370, 0.35, 'sawtooth', 0.2);
    if (typeof setTimeout === 'function') setTimeout(() => this.tone(466, 0.3, 'sawtooth', 0.18), 120);
  }

  radioBlip() {
    this.tone(1200, 0.05, 'square', 0.1);
    if (typeof setTimeout === 'function') setTimeout(() => this.tone(900, 0.05, 'square', 0.1), 80);
  }

  chime() {
    this.tone(660, 0.2, 'sine', 0.15);
    if (typeof setTimeout === 'function') setTimeout(() => this.tone(880, 0.25, 'sine', 0.15), 120);
  }

  thunder(delay = 0, vol = 0.5) {
    if (!this.ctx) return;
    const wait = Math.max(0, delay * 1000);
    if (typeof setTimeout === 'function') setTimeout(() => this.noise(2, vol * 0.6, 220), wait);
  }

  marketChime() {
    this.tone(1046, 0.12, 'triangle', 0.18);
    if (typeof setTimeout === 'function') {
      setTimeout(() => this.tone(1318, 0.12, 'triangle', 0.18), 90);
      setTimeout(() => this.tone(1568, 0.2, 'triangle', 0.18), 180);
    }
  }

  lockpickTick() { this.tone(1800, 0.03, 'square', 0.08); }

  cameraShutter() {
    this.noise(0.05, 0.25, 3000);
    if (typeof setTimeout === 'function') setTimeout(() => this.noise(0.05, 0.25, 3000), 120);
  }

  stormGust() { this.tone(220, 0.8, 'sawtooth', 0.12, 60); }

  setRainLevel(level) {
    const lv = Math.max(0, Math.min(1, level || 0));
    if (!this.ctx || !this.master) return;
    if (lv <= 0.02) {
      if (this.rainSource) {
        try { this.rainSource.stop(); } catch (err) {}
        this.rainSource = null;
        this.rainGain = null;
      }
      return;
    }
    try {
      if (!this.rainSource) {
        const len = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
        const src = this.ctx.createBufferSource();
        src.buffer = buffer;
        src.loop = true;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1200;
        const gain = this.ctx.createGain();
        gain.gain.value = lv * 0.25;
        src.connect(filter);
        filter.connect(gain);
        gain.connect(this.master);
        src.start();
        this.rainSource = src;
        this.rainGain = gain;
      } else if (this.rainGain) {
        this.rainGain.gain.value = lv * 0.25;
      }
    } catch (err) {}
  }

  beep() { this.tone(1200, 0.08, 'square', 0.12); }

  skid() { this.noise(0.3, 0.15, 900); }

  reloadClick() {
    this.tone(1400, 0.04, 'square', 0.1);
    if (typeof setTimeout === 'function') setTimeout(() => this.tone(900, 0.04, 'square', 0.1), 100);
  }

  doorSlam() {
    this.noise(0.15, 0.3, 400);
    this.tone(90, 0.2, 'sine', 0.25, 50);
  }

  setSirenLevel(level) {
    if (this.sirenLfo) {
      this.sirenLfo.frequency.value = 0.5 + (level || 0) * 1.5;
    }
  }

  pickup() {
    this.tone(523, 0.12, 'triangle', 0.18);
    if (typeof setTimeout === 'function') setTimeout(() => this.tone(784, 0.18, 'triangle', 0.18), 100);
  }

  shot() {
    this.noise(0.12, 0.4, 2500);
    this.tone(180, 0.15, 'square', 0.2, 60);
  }

  enemyShot() { this.noise(0.1, 0.2, 2000); }

  thud() {
    this.noise(0.12, 0.3, 300);
    this.tone(70, 0.2, 'sine', 0.25, 40);
  }

  crash() {
    this.noise(0.5, 0.4, 800);
    this.tone(120, 0.4, 'sawtooth', 0.2, 40);
  }

  jingle() {
    const notes = [523, 659, 784, 1046];
    notes.forEach((n, i) => {
      if (typeof setTimeout === 'function') setTimeout(() => this.tone(n, 0.2, 'triangle', 0.18), i * 110);
      else if (i === 0) this.tone(n, 0.2, 'triangle', 0.18);
    });
  }

  fail() {
    const notes = [392, 330, 262];
    notes.forEach((n, i) => {
      if (typeof setTimeout === 'function') setTimeout(() => this.tone(n, 0.25, 'sawtooth', 0.15), i * 140);
      else if (i === 0) this.tone(n, 0.25, 'sawtooth', 0.15);
    });
  }

  engine(frac) {
    if (!this.ctx || !this.master) return;
    const f = frac == null ? 0 : Math.max(0, Math.min(1, frac));
    if (frac == null) {
      if (this.engineOsc) {
        try { this.engineOsc.stop(); } catch (err) {}
        this.engineOsc = null;
        this.engineGain = null;
      }
      return;
    }
    try {
      if (!this.engineOsc) {
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 600;
        const gain = this.ctx.createGain();
        gain.gain.value = 0.05;
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.master);
        osc.start();
        this.engineOsc = osc;
        this.engineGain = gain;
      }
      this.engineOsc.frequency.value = 60 + f * 180;
      if (this.engineGain) this.engineGain.gain.value = 0.03 + f * 0.1;
    } catch (err) {}
  }

  siren(on) {
    if (!this.ctx || !this.master) return;
    if (on && !this.sirenOn) {
      try {
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = 700;
        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.8;
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 250;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        const gain = this.ctx.createGain();
        gain.gain.value = 0.06;
        osc.connect(gain);
        gain.connect(this.master);
        osc.start();
        lfo.start();
        this.sirenOsc = osc;
        this.sirenGain = gain;
        this.sirenLfo = lfo;
        this.sirenOn = true;
      } catch (err) {}
    } else if (!on && this.sirenOn) {
      try { if (this.sirenOsc) this.sirenOsc.stop(); } catch (err) {}
      try { if (this.sirenLfo) this.sirenLfo.stop(); } catch (err) {}
      this.sirenOsc = null;
      this.sirenGain = null;
      this.sirenLfo = null;
      this.sirenOn = false;
    }
  }

  startMusic() {
    if (this.musicTimer || !this.ctx) return;
    if (typeof setInterval !== 'function') return;
    this.musicTimer = setInterval(() => {
      if (this.muted) return;
      const chord = CHORDS[this.musicStep % CHORDS.length];
      this.musicStep += 1;
      for (const n of chord) this.tone(n, 1.8, 'sine', 0.05);
      this.tone(chord[0] / 2, 1.8, 'triangle', 0.07);
    }, 2000);
  }

  stopMusic() {
    if (this.musicTimer && typeof clearInterval === 'function') clearInterval(this.musicTimer);
    this.musicTimer = null;
  }
}
