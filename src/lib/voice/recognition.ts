type RecognitionResult = { transcript: string; confidence: number };
type RecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string; confidence: number }>> }) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};
type RecognitionConstructor = new () => RecognitionInstance;

type SpeechWindow = Window & {
  SpeechRecognition?: RecognitionConstructor;
  webkitSpeechRecognition?: RecognitionConstructor;
};

function getConstructor() {
  if (typeof window === "undefined") return null;
  const w = window as SpeechWindow;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function isSpeechRecognitionSupported() {
  return getConstructor() !== null;
}

export function createRecognition(lang = "fr-FR") {
  const Constructor = getConstructor();
  if (!Constructor) return null;
  const recognition = new Constructor();
  recognition.lang = lang;
  recognition.continuous = false;
  recognition.interimResults = false;
  return recognition;
}

export function startRecognition(onResult: (result: RecognitionResult) => void, onError: (message: string) => void, lang = "fr-FR") {
  const recognition = createRecognition(lang);
  if (!recognition) return null;
  recognition.onresult = (event) => {
    const first = event.results[0]?.[0];
    if (first) onResult({ transcript: first.transcript, confidence: first.confidence });
  };
  recognition.onerror = (event) => onError(event.error ?? "unknown");
  try { recognition.start(); } catch { onError("start-failed"); return null; }
  return recognition;
}
