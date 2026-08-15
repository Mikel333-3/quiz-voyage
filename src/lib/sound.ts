const SOUND_KEY = "quiztime:sound";
let context: AudioContext | null = null;

export function isSoundEnabled() {
  try { return localStorage.getItem(SOUND_KEY) !== "0"; } catch { return true; }
}

export function setSoundEnabled(enabled: boolean) {
  try { localStorage.setItem(SOUND_KEY, enabled ? "1" : "0"); } catch { /* ignore */ }
}

export function playSound(kind: "correct" | "wrong" | "tick" | "nav") {
  if (!isSoundEnabled()) return;
  try {
    const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    context ??= new AudioCtor();
    if (context.state === "suspended") void context.resume();
    const config = { correct: [740, 0.16, 0.045], wrong: [180, 0.22, 0.05], tick: [520, 0.045, 0.02], nav: [430, 0.05, 0.014] }[kind];
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = kind === "wrong" ? "triangle" : "sine";
    osc.frequency.value = config[0];
    gain.gain.setValueAtTime(config[2], context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + config[1]);
    osc.connect(gain).connect(context.destination);
    osc.start();
    osc.stop(context.currentTime + config[1]);
  } catch { /* sound is optional */ }
}
