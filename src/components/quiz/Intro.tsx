import { Lightbulb, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { XpBar } from "./ui";
import { unlockAudio, playBrandSound, startAmbientMusic } from "@/lib/sound";
import { isMusicEnabled } from "@/lib/game-settings";

const MESSAGES = [
  { title: "Le saviez-vous ?", text: "15 minutes de révision régulière peuvent faire une vraie différence sur la durée.", icon: "💡" },
  { title: "Astuce QuizTime Go", text: "Lis bien toute la question avant de choisir : la réponse la plus rapide n'est pas toujours la bonne.", icon: "🎯" },
  { title: "Défi du jour", text: "Un petit quiz aujourd'hui, un peu d'XP demain, et bientôt ton nom dans le classement.", icon: "🚀" },
];
const STATUS = ["INITIALIZING...", "LOADING KNOWLEDGE...", "PREPARING YOUR QUEST..."];
const SEEN_KEY = "quiztime:intro-seen";

function hasSeenIntro() {
  try { return sessionStorage.getItem(SEEN_KEY) === "1"; } catch { return false; }
}

export function Intro({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(8);
  const [step, setStep] = useState(0);
  const [tip, setTip] = useState(0);

  useEffect(() => {
    let unlocked = false;
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      void unlockAudio();
      playBrandSound();
      if (isMusicEnabled()) startAmbientMusic();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
    void unlockAudio().then(() => { playBrandSound(); if (isMusicEnabled()) startAmbientMusic(); }).catch(() => undefined);
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true, passive: true });

    const tick = setInterval(() => setProgress((p) => Math.min(100, p + 2.4)), 100);
    const msg = setInterval(() => setStep((s) => (s + 1) % STATUS.length), 1400);
    const tipTimer = setInterval(() => setTip((t) => (t + 1) % MESSAGES.length), 1400);
    const end = setTimeout(() => {
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch { /* ignore */ }
      onDone();
    }, 4200);
    return () => {
      clearInterval(tick); clearInterval(msg); clearInterval(tipTimer); clearTimeout(end);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [onDone]);

  const currentTip = MESSAGES[tip] ?? MESSAGES[0]!;
  const currentStatus = STATUS[step] ?? STATUS[0]!;

  return <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-5 text-center sm:px-8">
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 32 }).map((_, i) => <span key={i} className="absolute size-[3px] rounded-full bg-accent/60 animate-drift" style={{ left: `${(i * 29) % 100}%`, top: `${(i * 41) % 100}%`, animationDelay: `${(i % 10) * 0.6}s` }} />)}
    </div>
    <div className="relative z-10"><span className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-3xl animate-glow-pulse" /><Logo className="animate-pop text-4xl sm:text-5xl" /><p className="mt-4 text-sm text-muted-foreground">Défie ton esprit. Surpasse tes limites.</p></div>
    <div className="absolute inset-x-4 bottom-24 z-10 mx-auto max-w-md sm:bottom-28">
      <div className="min-h-[106px] animate-rise rounded-2xl border border-accent/20 bg-card/80 p-4 text-left shadow-[0_0_30px_hsl(var(--accent)/0.08)] backdrop-blur-xl sm:min-h-[112px]">
        <div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-warning/15" aria-hidden><Lightbulb className="size-5 text-warning" /></span><div className="min-w-0"><p className="flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-accent"><Sparkles className="size-3" />{currentTip.title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">{currentTip.text} <span aria-hidden>{currentTip.icon}</span></p></div></div>
      </div>
    </div>
    <div className="absolute inset-x-5 bottom-7 z-10 mx-auto w-full max-w-xs"><XpBar percent={progress} /><p className="mt-3 font-display text-[11px] tracking-[0.3em] text-accent">{currentStatus}</p><p className="mt-2 text-[10px] font-medium tracking-[0.2em] text-muted-foreground/70">Ajout by Legeek</p></div>
  </div>;
}

export function useIntro() {
  const [show, setShow] = useState(() => !hasSeenIntro());
  useEffect(() => { if (hasSeenIntro()) setShow(false); }, []);
  return { show, dismiss: () => setShow(false) };
}
