import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Home, Trophy, Zap } from "lucide-react";
import { AppShell } from "@/components/quiz/AppShell";
import { Panel, PrimaryButton, StatTile } from "@/components/quiz/ui";
import { useGame } from "@/lib/game-store";

export const Route = createFileRoute("/resultats")({ component: ResultsPage });

function ResultsPage() {
  const navigate = useNavigate();
  const { lastResult } = useGame();
  if (!lastResult) return <AppShell><Panel className="mx-auto max-w-xl p-8 text-center"><h1 className="text-2xl font-black">Aucun résultat récent</h1><Link to="/jouer" className="mt-5 inline-block text-accent">Commencer une partie →</Link></Panel></AppShell>;
  const percent = Math.round((lastResult.correct / Math.max(1, lastResult.total)) * 100);
  return <AppShell><div className="mx-auto max-w-3xl space-y-5"><button onClick={() => navigate({ to: "/" })} className="tap glass rounded-full p-2"><ArrowLeft className="size-4" /></button><Panel glow className="p-6 text-center sm:p-8"><div className="mx-auto grid size-20 place-items-center rounded-3xl bg-[image:var(--gradient-primary)] text-primary-foreground"><Trophy className="size-10" /></div><p className="mt-4 font-display text-xs uppercase tracking-[0.3em] text-accent">Mission terminée</p><h1 className="mt-2 text-3xl font-black">{percent >= 80 ? "Excellent run !" : "Mission accomplie !"}</h1><p className="mt-2 text-sm text-muted-foreground">{lastResult.config.mode === "haiti" ? "Haïti Quest" : lastResult.config.mode}</p><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"><StatTile label="Score" value={lastResult.score} icon={<Zap className="size-4" />} /><StatTile label="Réussite" value={`${percent}%`} icon={<CheckCircle2 className="size-4" />} accent="success" /><StatTile label="Combo" value={`x${lastResult.bestCombo}`} /><StatTile label="XP gagné" value={`+${lastResult.xpGained}`} /></div></Panel><div className="grid gap-3 sm:grid-cols-2"><PrimaryButton onClick={() => navigate({ to: "/jouer/preparation", search: { mode: lastResult.config.mode, subject: lastResult.config.subject === "haiti" ? undefined : lastResult.config.subject } })}>Rejouer</PrimaryButton><Link to="/" className="tap glass flex items-center justify-center rounded-2xl px-5 py-4 font-display text-xs font-bold uppercase tracking-[0.18em]">Retour au lobby <Home className="ml-2 size-4" /></Link></div>{lastResult.newBadges.length > 0 && <Panel className="p-5"><p className="font-display text-sm font-bold">🎖️ Nouvelles récompenses</p><p className="mt-1 text-sm text-muted-foreground">{lastResult.newBadges.length} badge(s) débloqué(s). Va dans Récompenses pour les voir.</p></Panel>}</div></AppShell>;
}
