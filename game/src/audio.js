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
    // Rain loop handles (created lazily by setRainLevel, stopped by it).
    this._rainSrc = null;
    this._rainGain = null;
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

  /** Two-tone car horn (H while driving). */
  horn() {
    this._tone(370, 0.16, 'square', 0.13);
    setTimeout(() => this._tone(466, 0.22, 'square', 0.13), 140);
  }

  /** Short radio squelch blip: a foot cop just called the rest of the force. */
  radioBlip() {
    this._tone(1150, 0.05, 'square', 0.08);
    setTimeout(() => this._tone(1150, 0.05, 'square', 0.08), 90);
  }

  /** Soft chime for a tutorial step completing — quieter than the jingle. */
  chime() {
    this._tone(880, 0.12, 'sine', 0.12);
    setTimeout(() => this._tone(1318, 0.16, 'sine', 0.1), 110);
  }

  /** Looping rain patter (filtered noise). level 0..1; call every frame
   * or with 0 to stop. The loop reuses one buffer source, so rain costs
   * no allocation while it falls. */
  setRainLevel(level) {
    if (!this.ctx) return;
    if (level <= 0.02) {
      if (this._rainSrc) {
        try { this._rainSrc.stop(); } catch { /* already stopped */ }
        this._rainSrc = null;
        this._rainGain = null;
      }
      return;
    }
    if (!this._rainSrc) {
      const len = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < len; i += 1) data[i] = Math.random() * 2 - 1;
      const src = this.ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1400;
      const gain = this.ctx.createGain();
      gain.gain.value = 0;
      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.master);
      src.start();
      this._rainSrc = src;
      this._rainGain = gain;
    }
    this._rainGain.gain.setTargetAtTime(0.05 + level * 0.09, this.ctx.currentTime, 0.3);
  }

  /** Short reverse warning beep while the car backs up. */
  beep() {
    this._tone(880, 0.07, 'square', 0.07);
  }

  /** Tyre screech for a handbrake drift or a burnout (band-passed noise). */
  skid() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const len = Math.max(1, Math.floor(this.ctx.sampleRate * 0.12));
    const buffer = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1400;
    filter.Q.value = 2.5;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.14, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    src.start(t);
  }

  /** Dry click when a reload starts, so R gives feedback before the mag fills. */
  reloadClick() {
    this._tone(1200, 0.05, 'square', 0.09);
    setTimeout(() => this._tone(900, 0.05, 'square', 0.09), 70);
  }

  /** Car door slam when entering or leaving a car. */
  doorSlam() {
    this._noise(0.12, 0.35, 500);
    this._tone(90, 0.1, 'sine', 0.25, 50);
  }

  /** Siren urgency follows the wanted level: a faster wail at higher heat. */
  setSirenLevel(level) {
    if (this._sirenLfo && this.ctx) {
      this._sirenLfo.frequency.setTargetAtTime(0.9 + level * 0.35, this.ctx.currentTime, 0.2);
    }
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
