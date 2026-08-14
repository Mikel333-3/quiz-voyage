import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { XpBar } from "./ui";

const MESSAGES = ["INITIALIZING...", "LOADING KNOWLEDGE...", "CONNECTING PLAYERS..."];
const SEEN_KEY = "quiztime:intro-seen";

export function Intro({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(8);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => setProgress((p) => Math.min(100, p + 7)), 90);
    const msg = setInterval(() => setStep((s) => (s + 1) % MESSAGES.length), 550);
    const end = setTimeout(() => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
      onDone();
    }, 2300);
    return () => {
      clearInterval(tick);
      clearInterval(msg);
      clearTimeout(end);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-background px-8 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute size-[3px] rounded-full bg-accent/60 animate-drift"
            style={{
              left: `${(i * 29) % 100}%`,
              top: `${(i * 41) % 100}%`,
              animationDelay: `${(i % 10) * 0.6}s`,
            }}
          />
        ))}
      </div>
      <div className="relative">
        <span className="absolute inset-0 -z-10 rounded-full bg-primary/40 blur-3xl animate-glow-pulse" />
        <Logo className="animate-pop text-4xl sm:text-5xl" />
      </div>
      <p className="max-w-xs text-sm text-muted-foreground">
        Défie ton esprit. Surpasse tes limites.
      </p>
      <div className="w-full max-w-xs">
        <XpBar percent={progress} />
        <p className="mt-3 font-display text-[11px] tracking-[0.3em] text-accent">
          {MESSAGES[step]}
        </p>
      </div>
    </div>
  );
}

export function useIntro() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      if (!sessionStorage.getItem(SEEN_KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);
  return { show, dismiss: () => setShow(false) };
}
