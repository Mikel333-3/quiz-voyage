export type SharePayload = {
  score: number;
  correct?: number;
  total?: number;
  combo?: number;
  xp?: number;
  level?: number;
  name?: string;
};

const appUrl = () => {
  if (typeof window === "undefined") return "https://mikel333-3.github.io/quiz-voyage/";
  return window.location.origin + window.location.pathname.replace(/\/[^/]*$/, "/");
};

export function challengeUrl(payload: SharePayload) {
  const url = new URL(appUrl());
  url.searchParams.set("challengeScore", String(payload.score));
  if (payload.name) url.searchParams.set("challengeName", payload.name);
  if (payload.level) url.searchParams.set("challengeLevel", String(payload.level));
  return url.toString();
}

export function shareText(payload: SharePayload, challenge = false) {
  const name = payload.name || "Moi";
  const result = `${payload.score.toLocaleString("fr-FR")} XP`;
  if (challenge) {
    return `🎮 ${name} te défie sur Quiz Time !\n🏆 Score à battre : ${result}\n🔥 Tu penses pouvoir faire mieux ?\n\n👉 ${challengeUrl(payload)}`;
  }
  return `🎮 Je viens de faire ${result} sur Quiz Time !\n🔥 ${payload.combo ? `Combo x${payload.combo} · ` : ""}${payload.correct != null && payload.total != null ? `${payload.correct}/${payload.total} bonnes réponses` : ""}\n🧠 Tu peux faire mieux ? Joue à Quiz Time !\n\n👉 ${appUrl()}`;
}

export async function shareQuiz(payload: SharePayload, challenge = false) {
  const text = shareText(payload, challenge);
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title: "Quiz Time", text, url: challenge ? challengeUrl(payload) : appUrl() });
      return "shared" as const;
    } catch {
      return "cancelled" as const;
    }
  }
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(text)}`;
  if (typeof window !== "undefined") window.open(whatsapp, "_blank", "noopener,noreferrer");
  return "whatsapp" as const;
}

export function shareQuizWhatsApp(payload: SharePayload, challenge = false) {
  const text = shareText(payload, challenge);
  if (typeof window !== "undefined") {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }
}

export async function copyShareText(payload: SharePayload, challenge = false) {
  const text = shareText(payload, challenge);
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  return false;
}
