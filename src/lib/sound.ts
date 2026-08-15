import { getVolume, isMusicEnabled } from "./game-settings";

const SOUND_KEY = "quiztime:sound";
let context: AudioContext | null = null;
let ambientTimer: number | null = null;
let ambientNodes: OscillatorNode[] = [];

function getContext() {
  if (typeof window === "undefined") return null;
  const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtor) return null;
  context ??= new AudioCtor();
  return context;
}

async function resumeContext() {
  const ctx = getContext();
  if (ctx?.state === "suspended") {
    try { await ctx.resume(); } catch { /* browser autoplay policy */ }
  }
  return ctx;
}

export function isSoundEnabled() {
  try { return localStorage.getItem(SOUND_KEY) !== "0"; } catch { return true; }
}

export function setSoundEnabled(enabled: boolean) {
  try { localStorage.setItem(SOUND_KEY, enabled ? "1" : "0"); } catch { /* ignore */ }
  if (!enabled) stopAmbientMusic();
}

export function playSound(kind: "correct" | "wrong" | "tick" | "nav") {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getContext();
    if (!ctx) return;
    const config = {
      correct: { start: 620, end: 980, duration: 0.2, volume: 0.13, type: "sine" as OscillatorType },
      wrong: { start: 190, end: 120, duration: 0.24, volume: 0.11, type: "triangle" as OscillatorType },
      tick: { start: 680, end: 520, duration: 0.065, volume: 0.055, type: "square" as OscillatorType },
      nav: { start: 430, end: 510, duration: 0.08, volume: 0.05, type: "sine" as OscillatorType },
    }[kind];
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    const master = getVolume();
    osc.type = config.type;
    osc.frequency.setValueAtTime(config.start, now);
    osc.frequency.exponentialRampToValueAtTime(config.end, now + config.duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(config.volume * master, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, now + config.duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + config.duration + 0.01);
  } catch { /* sound is optional and never blocks gameplay */ }
}

export async function unlockAudio() {
  if (!isSoundEnabled()) return false;
  const ctx = await resumeContext();
  if (!ctx) return false;
  if (isMusicEnabled()) startAmbientMusic();
  return true;
}

/** Signature sonore Quiz Time. Autoplay can be blocked until the first user gesture. */
export function playBrandSound() {
  if (!isSoundEnabled()) return false;
  try {
    const ctx = getContext();
    if (!ctx) return false;
    const now = ctx.currentTime;
    const master = ctx.createGain();
    const volume = getVolume();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.25 * volume, now + 0.06);
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
      gain.gain.exponentialRampToValueAtTime(0.95 / notes.length, start + 0.04);
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
    sweepGain.gain.exponentialRampToValueAtTime(0.06 * volume, now + 0.38);
    sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.05);
    sweep.connect(sweepGain).connect(master);
    sweep.start(now + 0.18);
    sweep.stop(now + 1.08);
    return true;
  } catch { return false; }
}

export function startAmbientMusic() {
  if (!isSoundEnabled() || !isMusicEnabled() || ambientTimer !== null) return;
  try {
    const ctx = getContext();
    if (!ctx) return;
    const playPad = () => {
      if (!isSoundEnabled() || !isMusicEnabled() || !context) return;
      const now = context.currentTime;
      const master = context.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.018 * getVolume(), now + 0.7);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 4.4);
      master.connect(context.destination);
      [130.81, 196, 261.63].forEach((frequency, index) => {
        const osc = context!.createOscillator();
        const gain = context!.createGain();
        osc.type = index === 2 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(frequency, now);
        gain.gain.setValueAtTime(0.65 / (index + 2), now);
        osc.connect(gain).connect(master);
        osc.start(now);
        osc.stop(now + 4.5);
        ambientNodes.push(osc);
        osc.onended = () => { ambientNodes = ambientNodes.filter((node) => node !== osc); };
      });
    };
    playPad();
    ambientTimer = window.setInterval(playPad, 4200);
  } catch { /* ambient audio is optional */ }
}

export function stopAmbientMusic() {
  if (ambientTimer !== null && typeof window !== "undefined") {
    window.clearInterval(ambientTimer);
    ambientTimer = null;
  }
  ambientNodes.forEach((osc) => { try { osc.stop(); } catch { /* already stopped */ } });
  ambientNodes = [];
}
