import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check, Flame, Timer, X, Zap } from "lucide-react";
import { AppShell } from "@/components/quiz/AppShell";
import { Panel } from "@/components/quiz/ui";
import { useGame } from "@/lib/game-store";
import { QUESTIONS, GAME_MODES, shuffle } from "@/lib/quiz-data";
import { EXTRA_QUESTIONS } from "@/lib/question-bank";
import { EXTRA_QUESTIONS_2 } from "@/lib/question-bank-2";
import { HAITI_ZONE_QUESTIONS } from "@/lib/haiti-zone-questions";
import { HAITI_ZONE_QUESTIONS_EXTRA } from "@/lib/haiti-zone-questions-extra";
import { comboMultiplier, pointsForAnswer, comboTier } from "@/lib/scoring";
import { getFeedbackDelay, getTimerDuration } from "@/lib/game-settings";
import { playSound, playTimerEndSound } from "@/lib/sound";

export const Route = createFileRoute("/quiz")({ component: QuizPage });
const LEVELS = ["7e AF", "8e AF", "9e AF", "Seconde", "Rhéto", "Philo"] as const;
const RECENT_KEY = "quiztime:recent-question-ids";
const RECENT_LIMIT = 150;
type QuizQuestion = (typeof QUESTIONS)[number] & { level?: (typeof LEVELS)[number]; difficulty?: "Facile" | "Moyen" | "Difficile"; zoneId?: string };
function levelDistance(a?: string, b?: string) { if (!a || !b) return 99; return Math.abs(LEVELS.indexOf(a as (typeof LEVELS)[number]) - LEVELS.indexOf(b as (typeof LEVELS)[number])); }

function chooseQuestions(config: NonNullable<ReturnType<typeof useGame>["config"]>) {
  const all = [...QUESTIONS, ...EXTRA_QUESTIONS, ...EXTRA_QUESTIONS_2] as QuizQuestion[];
  let subjectPool: QuizQuestion[];
  if (config.zoneId) {
    subjectPool = [...HAITI_ZONE_QUESTIONS, ...HAITI_ZONE_QUESTIONS_EXTRA].filter((q) => q.zoneId === config.zoneId) as QuizQuestion[];
  } else {
    subjectPool = all.filter((q) => config.subject === "haiti" ? q.subject === "histoire" : q.subject === config.subject);
  }
  const recent = new Set<string>();
  try { const saved = JSON.parse(sessionStorage.getItem(RECENT_KEY) ?? "[]"); if (Array.isArray(saved)) saved.forEach((id) => recent.add(String(id))); } catch { /* ignore */ }
  const fresh = subjectPool.filter((q) => !recent.has(q.id));
  const candidatePool = fresh.length >= config.questionCount ? fresh : subjectPool;
  const tagged = candidatePool.filter((q) => q.level);
  const exactLevelAndDifficulty = tagged.filter((q) => q.level === config.level && q.difficulty === config.difficulty);
  const exactLevel = tagged.filter((q) => q.level === config.level);
  const nearby = tagged.filter((q) => levelDistance(q.level, config.level) <= 1);
  const exactDifficulty = tagged.filter((q) => q.difficulty === config.difficulty);
  const legacy = candidatePool.filter((q) => !q.level);
  const ordered: QuizQuestion[] = [];
  const seen = new Set<string>();
  for (const group of [exactLevelAndDifficulty, exactLevel, nearby, exactDifficulty, shuffle(tagged), shuffle(legacy)]) {
    for (const q of shuffle(group)) if (!seen.has(q.id)) { seen.add(q.id); ordered.push(q); }
  }
  let selected = ordered.slice(0, Math.min(config.questionCount, ordered.length));
  if (selected.length < config.questionCount) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const recycled = subjectPool.filter((q) => !selectedIds.has(q.id));
    for (const q of shuffle(recycled)) { if (selected.length >= config.questionCount) break; if (!selectedIds.has(q.id)) { selectedIds.add(q.id); selected.push(q); } }
  }
  selected = shuffle(selected);
  try { sessionStorage.setItem(RECENT_KEY, JSON.stringify([...selected.map((q) => q.id), ...Array.from(recent)].slice(0, RECENT_LIMIT))); } catch { /* ignore */ }
  return selected.map((q) => { const answers = shuffle(q.answers.map((text, index) => ({ text, index }))); return { ...q, answers: answers.map((a) => a.text), correctIndex: answers.findIndex((a) => a.index === q.correctIndex) }; });
}

function QuizPage() {
  const navigate = useNavigate();
  const { config, clearMatch, finishMatch } = useGame();
  const mode = GAME_MODES.find((m) => m.id === config?.mode) ?? GAME_MODES[0]!;
  const questions = useMemo(() => config ? chooseQuestions(config) : [], [config]);
  const configuredTimer = getTimerDuration();
  const questionTimer = mode.timePerQuestion === null ? null : configuredTimer;
  const [index, setIndex] = useState(0); const [selected, setSelected] = useState<number | null>(null); const [combo, setCombo] = useState(0); const [bestCombo, setBestCombo] = useState(0); const [score, setScore] = useState(0); const [seconds, setSeconds] = useState(questionTimer ?? 0); const [answered, setAnswered] = useState(false);
  const scoreRef = useRef(0); const correctRef = useRef(0); const comboRef = useRef(0); const bestComboRef = useRef(0); const advancingRef = useRef(false); const timeoutHandledRef = useRef(false);
  const feedbackDelay = getFeedbackDelay() * 1000;
  useEffect(() => {
    if (!config) { void navigate({ to: "/jouer", replace: true }); return; }
    if (!questions.length) { clearMatch(); void navigate({ to: "/jouer", replace: true }); }
  }, [config, questions.length, clearMatch, navigate]);
  useEffect(() => { timeoutHandledRef.current = false; setSeconds(questionTimer ?? 0); }, [index, questionTimer]);
  useEffect(() => {
    if (!config || answered || questionTimer === null) return;
    if (seconds <= 0) {
      if (!timeoutHandledRef.current) {
        timeoutHandledRef.current = true;
        playTimerEndSound();
        submit(null);
      }
      return;
    }
    const id = window.setInterval(() => setSeconds((s) => { const next = Math.max(0, s - 1); if (next <= 5) playSound("tick"); return next; }), 1000);
    return () => window.clearInterval(id);
  }, [seconds, answered, config, questionTimer]);
  useEffect(() => { if (!answered) return; const id = window.setTimeout(() => next(), feedbackDelay); return () => window.clearTimeout(id); }, [answered, feedbackDelay]);
  if (!config || !questions.length) return null;
  const question = questions[index]; if (!question) return null; const tier = comboTier(combo);
  function submit(answer: number | null) { if (answered) return; const correct = answer === question.correctIndex; const nextCombo = correct ? comboRef.current + 1 : 0; const gained = correct ? pointsForAnswer(nextCombo, questionTimer === null ? null : seconds, questionTimer) : 0; const nextScore = scoreRef.current + gained; const nextBest = Math.max(bestComboRef.current, nextCombo); scoreRef.current = nextScore; correctRef.current += correct ? 1 : 0; comboRef.current = nextCombo; bestComboRef.current = nextBest; setSelected(answer); setAnswered(true); setCombo(nextCombo); setBestCombo(nextBest); setScore(nextScore); if (answer !== null) playSound(correct ? "correct" : "wrong"); }
  function next() { if (advancingRef.current) return; advancingRef.current = true; if (index + 1 >= questions.length) { finishMatch({ score: scoreRef.current, correct: correctRef.current, total: questions.length, bestCombo: bestComboRef.current, config }); void navigate({ to: "/resultats", replace: true }); return; } setIndex((i) => i + 1); setSelected(null); setAnswered(false); setSeconds(questionTimer ?? 0); timeoutHandledRef.current = false; advancingRef.current = false; }
  const exitMatch = () => { clearMatch(); playSound("nav"); void navigate({ to: "/jouer", replace: true }); };
  const progress = ((index + (answered ? 1 : 0)) / questions.length) * 100;
  return <AppShell><div className="mx-auto max-w-3xl space-y-4"><div className="flex items-center justify-between gap-3"><button onClick={exitMatch} className="tap glass rounded-full p-2 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105" aria-label="Quitter la partie"><ArrowLeft className="size-4" /></button><div className="min-w-0 flex-1"><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-[image:var(--gradient-primary)] transition-all" style={{ width: `${progress}%` }} /></div></div><span className="font-display text-xs font-bold">{index + 1}/{questions.length}</span></div>
    <div className="flex flex-wrap items-center justify-between gap-2 text-xs"><span className="glass flex items-center gap-1 rounded-full px-3 py-1.5"><Zap className="size-3.5 text-accent" /> {score} pts</span><span className={`glass flex items-center gap-1 rounded-full px-3 py-1.5 ${tier !== "none" ? "text-warning" : "text-muted-foreground"}`}><Flame className="size-3.5" /> x{comboMultiplier(combo)}</span>{questionTimer !== null && <span className={`glass flex items-center gap-1 rounded-full px-3 py-1.5 ${seconds <= 5 ? "text-destructive animate-glow-pulse" : "text-accent"}`}><Timer className="size-3.5" /> {seconds}s</span>}</div>
    <Panel glow className="p-5 sm:p-7"><p className="font-display text-xs uppercase tracking-[0.25em] text-accent">{question.category ?? mode.name}</p><h1 className="mt-3 text-xl font-black leading-tight sm:text-2xl">{question.prompt}</h1><div className="mt-6 grid gap-3">{question.answers.map((answer, i) => { const isCorrect = answered && i === question.correctIndex; const isWrong = answered && selected === i && !isCorrect; return <button key={`${question.id}-${i}`} disabled={answered} onClick={() => submit(i)} className={`tap rounded-2xl border p-4 text-left text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_24px_hsl(var(--primary)/.12)] ${isCorrect ? "border-success bg-success/15" : isWrong ? "border-destructive bg-destructive/15" : "border-border bg-surface-2 hover:border-primary/60"}`}><span className="mr-3 inline-grid size-7 place-items-center rounded-lg bg-muted font-display text-xs">{String.fromCharCode(65 + i)}</span>{answer}{isCorrect && <Check className="float-right mt-1 size-5 text-success" />}{isWrong && <X className="float-right mt-1 size-5 text-destructive" />}</button>; })}</div>{answered && <div className="mt-5 animate-rise rounded-2xl bg-surface-2 p-4"><p className="font-display text-sm font-bold">{selected === question.correctIndex ? "🔥 Bonne réponse !" : "Pas cette fois."}</p><p className="mt-1 text-sm text-muted-foreground">{question.explanation}</p><p className="mt-3 text-xs text-muted-foreground">Question suivante dans {feedbackDelay / 1000} seconde{feedbackDelay / 1000 > 1 ? "s" : ""}…</p></div>}</Panel></div></AppShell>;
}