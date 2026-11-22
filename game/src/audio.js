// Solara Nights — fully procedural WebAudio sound: engine hum, sirens, gunshots,
// UI blips, mission jingles and a quiet synthwave-ish music loop. No audio files.
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
    this.sirenOn = false;
  }

  /** Call from a user gesture; safe to call repeatedly. */
  ensure() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        // resume() returns a promise in current Chrome; a rejection (e.g.
        // the tab lost audio focus) must not surface as an uncaught error.
        const p = this.ctx.resume();
        if (p && typeof p.catch === 'function') p.catch(() => {});
      }
      return;
    }
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.5;
      this.master.connect(this.ctx.destination);
    } catch {
      this.ctx = null;
    }
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.master) this.master.gain.value = muted ? 0 : 0.5;
  }

  _tone(freq, dur, type, vol, slideTo) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, t);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), t + dur);
    gain.gain.setValueAtTime(vol || 0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  _noise(dur, vol, lowpass) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const len = Math.max(1, Math.floor(this.ctx.sampleRate * dur));
    const buffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol || 0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
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
    src.start(t);
  }

  blip() {
    this._tone(660, 0.08, 'square', 0.12);
  }

  pickup() {
    this._tone(523, 0.09, 'sine', 0.18);
    setTimeout(() => this._tone(784, 0.12, 'sine', 0.18), 90);
  }

  shot() {
    this._noise(0.14, 0.5, 3200);
    this._tone(160, 0.1, 'square', 0.22, 60);
  }

  enemyShot() {
    this._noise(0.1, 0.18, 2400);
  }

  thud() {
    this._noise(0.18, 0.4, 300);
    this._tone(70, 0.18, 'sine', 0.3, 40);
  }

  crash() {
    this._noise(0.3, 0.5, 900);
    this._tone(90, 0.25, 'sawtooth', 0.2, 45);
  }

  jingle() {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => this._tone(f, 0.22, 'triangle', 0.22), i * 110));
  }

  fail() {
    [392, 330, 262].forEach((f, i) => setTimeout(() => this._tone(f, 0.3, 'sawtooth', 0.14), i * 150));
  }

  /** Continuous engine hum; speed01 is 0..1. Call every frame, or with null to stop. */
  engine(speed01) {
    if (!this.ctx) return;
    if (speed01 === null || speed01 === undefined) {
      if (this.engineOsc) {
        try { this.engineOsc.stop(); } catch { /* already stopped */ }
        this.engineOsc = null;
        this.engineGain = null;
      }
      return;
    }
    if (!this.engineOsc) {
      this.engineOsc = this.ctx.createOscillator();
      this.engineOsc.type = 'sawtooth';
      this.engineGain = this.ctx.createGain();
      this.engineGain.gain.value = 0.0;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 900;
      this.engineOsc.connect(filter);
      filter.connect(this.engineGain);
      this.engineGain.connect(this.master);
      this.engineOsc.start();
    }
    const t = this.ctx.currentTime;
    this.engineOsc.frequency.setTargetAtTime(55 + speed01 * 130, t, 0.05);
    this.engineGain.gain.setTargetAtTime(0.02 + speed01 * 0.06, t, 0.1);
  }

  /** Two-tone police siren loop. */
  siren(on) {
    if (!this.ctx) return;
    if (on === this.sirenOn) return;
    this.sirenOn = on;
    if (!on) {
      if (this.sirenOsc) {
        try { this.sirenOsc.stop(); } catch { /* already stopped */ }
        this.sirenOsc = null;
        this.sirenGain = null;
      }
      if (this._sirenLfo) {
        try { this._sirenLfo.stop(); } catch { /* already stopped */ }
        this._sirenLfo = null;
      }
      return;
    }
    this.sirenOsc = this.ctx.createOscillator();
    this.sirenOsc.type = 'triangle';
    this.sirenGain = this.ctx.createGain();
    this.sirenGain.gain.value = 0.045;
    this.sirenOsc.connect(this.sirenGain);
    this.sirenGain.connect(this.master);
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.9;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 220;
    lfo.connect(lfoGain);
    lfoGain.connect(this.sirenOsc.frequency);
    this.sirenOsc.frequency.value = 780;
    this.sirenOsc.start();
    lfo.start();
    this._sirenLfo = lfo;
  }

  /** Quiet loop: Am – F – C – G pad plus a soft bass pulse. */
  startMusic() {
    if (!this.ctx || this.musicTimer) return;
    const chords = [
      [220.0, 261.63, 329.63],
      [174.61, 220.0, 261.63],
      [196.0, 246.94, 293.66],
      [130.81, 164.81, 196.0],
    ];
    this.musicTimer = setInterval(() => {
      if (!this.ctx || this.muted) return;
      const chord = chords[this.musicStep % chords.length];
      this.musicStep += 1;
      chord.forEach((f) => this._tone(f, 1.9, 'sine', 0.035));
      this._tone(chord[0] / 2, 1.9, 'triangle', 0.05);
    }, 2000);
  }

  stopMusic() {
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }
}
