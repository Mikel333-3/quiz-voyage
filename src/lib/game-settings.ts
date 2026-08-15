const VOLUME_KEY = "quiztime:volume";
const FEEDBACK_KEY = "quiztime:feedback-delay";
const MUSIC_KEY = "quiztime:music";

export const DEFAULT_VOLUME = 0.65;
export const DEFAULT_FEEDBACK_DELAY = 3;

export function getVolume() {
  try {
    const value = Number(localStorage.getItem(VOLUME_KEY));
    return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : DEFAULT_VOLUME;
  } catch { return DEFAULT_VOLUME; }
}

export function setVolume(value: number) {
  const safe = Math.min(1, Math.max(0, value));
  try { localStorage.setItem(VOLUME_KEY, String(safe)); } catch { /* ignore */ }
  return safe;
}

export function getFeedbackDelay() {
  try {
    const value = Number(localStorage.getItem(FEEDBACK_KEY));
    return Number.isFinite(value) ? Math.min(10, Math.max(1, Math.round(value))) : DEFAULT_FEEDBACK_DELAY;
  } catch { return DEFAULT_FEEDBACK_DELAY; }
}

export function setFeedbackDelay(value: number) {
  const safe = Math.min(10, Math.max(1, Math.round(value)));
  try { localStorage.setItem(FEEDBACK_KEY, String(safe)); } catch { /* ignore */ }
  return safe;
}

export function isMusicEnabled() {
  try { return localStorage.getItem(MUSIC_KEY) !== "0"; } catch { return true; }
}

export function setMusicEnabled(enabled: boolean) {
  try { localStorage.setItem(MUSIC_KEY, enabled ? "1" : "0"); } catch { /* ignore */ }
}
