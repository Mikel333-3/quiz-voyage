const VOICE_ENABLED_KEY = "quiztime:voice-enabled";

export function isVoiceEnabled() {
  try { return localStorage.getItem(VOICE_ENABLED_KEY) === "1"; } catch { return false; }
}

export function setVoiceEnabled(enabled: boolean) {
  try { localStorage.setItem(VOICE_ENABLED_KEY, enabled ? "1" : "0"); } catch { /* ignore */ }
}

export function isSpeechSynthesisSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

function getVoices() {
  if (!isSpeechSynthesisSupported()) return [];
  return window.speechSynthesis.getVoices();
}

function getBestVoice(lang: string) {
  const voices = getVoices();
  if (!voices.length) return null;
  const normalized = lang.toLowerCase();
  const base = normalized.split("-")[0];
  return voices.find((voice) => voice.lang.toLowerCase() === normalized)
    ?? voices.find((voice) => voice.lang.toLowerCase().startsWith(`${base}-`))
    ?? voices.find((voice) => voice.default)
    ?? voices[0]
    ?? null;
}

export function stopSpeaking() {
  if (!isSpeechSynthesisSupported()) return;
  try {
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
  } catch { /* speech is optional */ }
}

export function speakQuestion(text: string, lang = "fr-FR", onEnd?: () => void) {
  if (!isSpeechSynthesisSupported() || !isVoiceEnabled() || !text.trim()) return false;

  const speak = () => {
    if (!isVoiceEnabled() || !isSpeechSynthesisSupported()) return;
    try {
      stopSpeaking();
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = getBestVoice(lang);
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang ?? lang;
      utterance.rate = 0.88;
      utterance.pitch = 1.02;
      utterance.volume = 1;
      utterance.onend = () => onEnd?.();
      utterance.onerror = () => onEnd?.();
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);
    } catch {
      onEnd?.();
    }
  };

  if (getVoices().length) {
    speak();
  } else {
    const retry = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", retry);
      speak();
    };
    window.speechSynthesis.addEventListener("voiceschanged", retry, { once: true });
    window.setTimeout(() => {
      window.speechSynthesis.removeEventListener("voiceschanged", retry);
      speak();
    }, 350);
  }
  return true;
}
