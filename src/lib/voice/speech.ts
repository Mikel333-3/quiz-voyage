const VOICE_ENABLED_KEY = "quiztime:voice-enabled";

export function isVoiceEnabled() {
  try { return localStorage.getItem(VOICE_ENABLED_KEY) === "1"; } catch { return false; }
}

export function setVoiceEnabled(enabled: boolean) {
  try { localStorage.setItem(VOICE_ENABLED_KEY, enabled ? "1" : "0"); } catch { /* ignore */ }
}

export function isSpeechSynthesisSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function stopSpeaking() {
  if (!isSpeechSynthesisSupported()) return;
  window.speechSynthesis.cancel();
}

export function speakQuestion(text: string, lang = "fr-FR") {
  if (!isSpeechSynthesisSupported() || !isVoiceEnabled()) return false;
  stopSpeaking();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
  return true;
}
