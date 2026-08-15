import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check, Flame, Timer, X, Zap } from "lucide-react";
import { AppShell } from "@/components/quiz/AppShell";
import { Panel, PrimaryButton } from "@/components/quiz/ui";
import { useGame } from "@/lib/game-store";
import { questionsFor, GAME_MODES } from "@/lib/quiz-data";
import { comboMultiplier, pointsForAnswer, comboTier } from "@/lib/scoring";

export const Route = createFileRoute("/quiz")({ component: QuizPage });

const FEEDBACK_DELAY = 5000;
let audioContext: AudioContext | null = null;

function tone(kind: "correct" | "wrong" | "tick" | "nav") {
  try {
    const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;
    audioContext ??= new AudioCtor();
    if (audioContext.state === "suspended") void audioContext.resume();
    const ctx = audioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const config = {
      correct: [740, 0.16, 0.045],
      wrong: [180, 0.22, 0.05],
      tick: [520, 0.045, 0.02],
      nav: [430, 0.055, 0.018],
    }[kind];
    osc.type = kind === "wrong" ? "triangle" : "sine";
    osc.frequency.value = config[0];
    gain.gain.setValueAtTime(config[2], ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + config[1]);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + config[1]);
  } catch {
    // Sound is optional and never blocks gameplay.
  }
}

function QuizPage() {
  const navigate = useNavigate();
  const { config, finishMatch } = useGame();
  const mode = GAME_MODES.find((m) => m.id === config?.mode) ?? GAME_MODES[0]!;
  const questions = useMemo(() => config ? questionsFor(config.subject, config.questionCount, config.category) : [], [config]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(mode.timePerQuestion ?? 0);
  const [answered, setAnswered] = useState(false);
  const scoreRef = useRef(0);
  const correctRef = useRef(0);
  const comboRef = useRef(0);
  const bestComboRef = useRef(0);
  const advancingRef = useRef(false);

  useEffect(() => { if (!config) void navigate({ to: "/jouer" }); }, [config, navigate]);

  useEffect(() => {
    if (!config || answered || mode.timePerQuestion === null) return;
    if (seconds <= 0) { submit(null); return; }
    const id = window.setInterval(() => {
      setSeconds((s) => {
        const next = Math.max(0, s - 1);
        if (next <= 5) tone("tick");
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [seconds, answered, config, mode.timePerQuestion]);

  useEffect(() => {
    if (!answered) return;
    const id = window.setTimeout(() => next(), FEEDBACK_DELAY);
    return () => window.clearTimeout(id);
  }, [answered]);

  if (!config || !questions.length) return null;
  const question = questions[index];
  if (!question) return null;
  const tier = comboTier(combo);

  function submit(answer: number | null) {
    if (answered) return;
    const correct = answer === question.correctIndex;
    const nextCombo = correct ? comboRef.current + 1 : 0;
    const gained = correct ? pointsForAnswer(nextCombo, mode.timePerQuestion === null ? null : seconds, mode.timePerQuestion) : 0;
    const nextScore = scoreRef.current + gained;
    const nextCorrect = correctRef.current + (correct ? 1 : 0);
    const nextBest = Math.max(bestComboRef.current, nextCombo);
    scoreRef.current = nextScore;
    correctRef.current = nextCorrect;
    comboRef.current = nextCombo;
    bestComboRef.current = nextBest;
    setSelected(answer);
    setAnswered(true);
    setCombo(nextCombo);
    setBestCombo(nextBest);
    setCorrectCount(nextCorrect);
    setScore(nextScore);
    if (correct) tone("correct"); else tone("wrong");
  }

  function next() {
    if (advancingRef.current) return;
    advancingRef.current = true;
    if (index + 1 >= questions.length) {
      finishMatch({ score: scoreRef.current, correct: correctRef.current, total: questions.length, bestCombo: bestComboRef.current, config });
      void navigate({ to: "/resultats" });
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setAnswered(false);
    setSeconds(mode.timePerQuestion ?? 0);
    advancingRef.current = false;
  }

  const progress = ((index + (answered ? 1 : 0)) / questions.length) * 100;
  return <AppShell>
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex items-center justify-between gap-3">
        <button onClick={() => { tone("nav"); void navigate({ to: "/jouer" }); }} className="tap glass rounded-full p-2 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105"><ArrowLeft className="size-4" /></button>
        <div className="min-w-0 flex-1"><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-[image:var(--gradient-primary)] transition-all" style={{ width: `${progress}%` }} /></div></div>
        <span className="font-display text-xs font-bold">{index + 1}/{questions.length}</span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="glass flex items-center gap-1 rounded-full px-3 py-1.5"><Zap className="size-3.5 text-accent" /> {score} pts</span>
        <span className={`glass flex items-center gap-1 rounded-full px-3 py-1.5 ${tier !== "none" ? "text-warning" : "text-muted-foreground"}`}><Flame className="size-3.5" /> x{comboMultiplier(combo)}</span>
        {mode.timePerQuestion !== null && <span className={`glass flex items-center gap-1 rounded-full px-3 py-1.5 ${seconds <= 5 ? "text-destructive animate-glow-pulse" : "text-accent"}`}><Timer className="size-3.5" /> {seconds}s</span>}
      </div>
      <Panel glow className="p-5 sm:p-7">
        <p className="font-display text-xs uppercase tracking-[0.25em] text-accent">{question.category ?? mode.name}</p>
        <h1 className="mt-3 text-xl font-black leading-tight sm:text-2xl">{question.prompt}</h1>
        <div className="mt-6 grid gap-3">
          {question.answers.map((answer, i) => {
            const isCorrect = answered && i === question.correctIndex;
            const isWrong = answered && selected === i && !isCorrect;
            return <button key={answer} disabled={answered} onClick={() => submit(i)} className={`tap rounded-2xl border p-4 text-left text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_24px_hsl(var(--primary)/.12)] ${isCorrect ? "border-success bg-success/15" : isWrong ? "border-destructive bg-destructive/15" : "border-border bg-surface-2 hover:border-primary/60"}`}><span className="mr-3 inline-grid size-7 place-items-center rounded-lg bg-muted font-display text-xs">{String.fromCharCode(65 + i)}</span>{answer}{isCorrect && <Check className="float-right mt-1 size-5 text-success" />}{isWrong && <X className="float-right mt-1 size-5 text-destructive" />}</button>;
          })}
        </div>
        {answered && <div className="mt-5 animate-rise rounded-2xl bg-surface-2 p-4"><p className="font-display text-sm font-bold">{selected === question.correctIndex ? "🔥 Bonne réponse !" : "Pas cette fois."}</p><p className="mt-1 text-sm text-muted-foreground">{question.explanation}</p><p className="mt-3 text-xs text-muted-foreground">Question suivante dans 5 secondes…</p></div>}
      </Panel>
    </div>
  </AppShell>;
}
