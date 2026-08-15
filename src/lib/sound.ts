const SOUND_KEY = "quiztime:sound";
let context: AudioContext | null = null;

function getContext() {
  const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtor) return null;
  context ??= new AudioCtor();
  if (context.state === "suspended") void context.resume();
  return context;
}

export function isSoundEnabled() {
  try { return localStorage.getItem(SOUND_KEY) !== "0"; } catch { return true; }
}

export function setSoundEnabled(enabled: boolean) {
  try { localStorage.setItem(SOUND_KEY, enabled ? "1" : "0"); } catch { /* ignore */ }
}

export function playSound(kind: "correct" | "wrong" | "tick" | "nav") {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getContext();
    if (!ctx) return;
    const config = {
      correct: { start: 620, end: 980, duration: 0.18, volume: 0.075, type: "sine" as OscillatorType },
      wrong: { start: 190, end: 120, duration: 0.22, volume: 0.065, type: "triangle" as OscillatorType },
      tick: { start: 680, end: 520, duration: 0.06, volume: 0.032, type: "square" as OscillatorType },
      nav: { start: 430, end: 510, duration: 0.07, volume: 0.026, type: "sine" as OscillatorType },
    }[kind];
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = config.type;
    osc.frequency.setValueAtTime(config.start, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(config.end, ctx.currentTime + config.duration);
    gain.gain.setValueAtTime(config.volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + config.duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + config.duration);
  } catch { /* sound is optional and never blocks gameplay */ }
}

/** Sonic logo Quiz Time. The browser may block autoplay until the first user gesture. */
export function playBrandSound() {
  if (!isSoundEnabled()) return false;
  try {
    const ctx = getContext();
    if (!ctx) return false;
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.14, now + 0.06);
    master.gain.exponentialRampToValueAtTime(0.001, now + 1.45);
    master.connect(ctx.destination);

    const notes = [196, 293.66, 392, 587.33];
    notes.forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + index * 0.12;
      osc.type = index === 3 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(frequency, start);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.015, start + 0.48);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.8 / notes.length, start + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.72);
      osc.connect(gain).connect(master);
      osc.start(start);
      osc.stop(start + 0.75);
    });

    const sweep = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    sweep.type = "sawtooth";
    sweep.frequency.setValueAtTime(140, now + 0.18);
    sweep.frequency.exponentialRampToValueAtTime(620, now + 0.95);
    sweepGain.gain.setValueAtTime(0.0001, now + 0.18);
    sweepGain.gain.exponentialRampToValueAtTime(0.035, now + 0.38);
    sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.05);
    sweep.connect(sweepGain).connect(master);
    sweep.start(now + 0.18);
    sweep.stop(now + 1.08);
    return true;
  } catch {
    return false;
  }
}
