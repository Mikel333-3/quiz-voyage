import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowLeft, Zap } from "lucide-react";
import { AppShell } from "@/components/quiz/AppShell";
import { GhostButton, Panel, PrimaryButton, SectionTitle } from "@/components/quiz/ui";
import { useGame } from "@/lib/game-store";
import { DIFFICULTIES, GAME_MODES, LEVELS, QUESTION_COUNTS, SUBJECTS, shuffle, type GameModeId, type SubjectId } from "@/lib/quiz-data";
import { cn } from "@/lib/utils";

type Search = { mode?: GameModeId; subject?: SubjectId };
export const Route = createFileRoute("/jouer/preparation")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const result: Search = { mode: (search["mode"] as GameModeId) ?? "entrainement" };
    const subject = search["subject"] as SubjectId | undefined;
    if (subject !== undefined) result.subject = subject;
    return result;
  },
  head: () => ({ meta: [{ title: "Prépare ta partie — Quiz Time" }, { name: "description", content: "Configure ta mission Quiz Time." }] }),
  component: Preparation,
});
function Chip({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) { return <button onClick={onClick} className={cn("tap rounded-xl border px-4 py-2.5 text-sm font-semibold", active ? "border-transparent bg-[image:var(--gradient-primary)] text-primary-foreground" : "border-border bg-surface-2 text-muted-foreground")}>{children}</button>; }
function Preparation() {
  const { mode: modeId, subject: presetSubject } = Route.useSearch();
  const navigate = useNavigate(); const { setConfig } = useGame();
  const mode = GAME_MODES.find((m) => m.id === modeId) ?? GAME_MODES[0]!; const isHaiti = mode.id === "haiti"; const random = mode.id === "aleatoire";
  const [subject, setSubject] = useState<SubjectId | "haiti">(isHaiti ? "haiti" : (presetSubject ?? "maths")); const [level, setLevel] = useState(LEVELS[2]); const [difficulty, setDifficulty] = useState(DIFFICULTIES[1]); const [count, setCount] = useState(10);
  const launch = () => { const finalSubject: SubjectId | "haiti" = isHaiti ? "haiti" : random ? (shuffle(SUBJECTS)[0]!.id as SubjectId) : subject; setConfig({ mode: mode.id, subject: finalSubject, level: random ? shuffle([...LEVELS])[0]! : level, difficulty: random ? shuffle([...DIFFICULTIES])[0]! : difficulty, questionCount: count }); navigate({ to: "/quiz" }); };
  return <AppShell><div className="mx-auto max-w-3xl space-y-5"><button onClick={() => navigate({ to: "/jouer" })} className="tap glass inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold"><ArrowLeft className="size-4" /> Modes</button><Panel glow className="p-5"><p className="font-display text-xs uppercase tracking-[0.35em] text-accent">Ready ?</p><h1 className="mt-2 text-2xl font-black">{mode.name}</h1><p className="mt-1 text-sm text-muted-foreground">{mode.description}</p><div className="mt-4 flex flex-wrap gap-2 text-xs"><span className="glass rounded-full px-3 py-1.5">{mode.timePerQuestion ? `${mode.timePerQuestion}s / question` : "Sans chrono"}</span><span className="glass rounded-full px-3 py-1.5">XP x{mode.xpMultiplier}</span><span className="glass flex items-center gap-1 rounded-full px-3 py-1.5 text-accent"><Zap className="size-3.5" /> ~{Math.round(count * 130 * mode.xpMultiplier)} XP</span></div></Panel>{random ? <Panel className="p-5 text-sm text-muted-foreground">🎲 Le système choisira automatiquement la matière, le niveau et la difficulté.</Panel> : !isHaiti && <section><SectionTitle title="Matière" /><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{SUBJECTS.map((s) => <Chip key={s.id} active={subject === s.id} onClick={() => setSubject(s.id)}>{s.name}</Chip>)}</div></section>}{!random && <><section><SectionTitle title="Niveau" /><div className="flex flex-wrap gap-2">{LEVELS.map((l) => <Chip key={l} active={level === l} onClick={() => setLevel(l)}>{l}</Chip>)}</div></section><section><SectionTitle title="Difficulté" /><div className="flex flex-wrap gap-2">{DIFFICULTIES.map((d) => <Chip key={d} active={difficulty === d} onClick={() => setDifficulty(d)}>{d}</Chip>)}</div></section></>}<section><SectionTitle title="Nombre de questions" /><div className="flex flex-wrap gap-2">{QUESTION_COUNTS.map((c) => <Chip key={c} active={count === c} onClick={() => setCount(c)}>{c} questions</Chip>)}</div></section><div className="sticky bottom-24 space-y-2"><PrimaryButton onClick={launch}>Lancer la partie</PrimaryButton><GhostButton onClick={() => navigate({ to: "/" })}>Retour au lobby</GhostButton></div></div></AppShell>;
}
