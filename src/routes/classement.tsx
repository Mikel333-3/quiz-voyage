import { createFileRoute } from "@tanstack/react-router";
import { Crown, Trophy } from "lucide-react";
import { AppShell } from "@/components/quiz/AppShell";
import { Avatar, Panel, SectionTitle, Tabs } from "@/components/quiz/ui";
import { LEADERBOARD, SCHOOLS } from "@/lib/quiz-data";
import { useGame } from "@/lib/game-store";
import { useState } from "react";

export const Route = createFileRoute("/classement")({ component: LeaderboardPage });
function LeaderboardPage() {
  const { player } = useGame();
  const [tab, setTab] = useState<"joueurs" | "ecoles">("joueurs");
  const rows = [...LEADERBOARD].sort((a, b) => b.xp - a.xp);
  return <AppShell><div className="mx-auto max-w-3xl space-y-5"><header><p className="font-display text-xs uppercase tracking-[0.35em] text-accent">Arena</p><h1 className="mt-2 text-2xl font-black sm:text-3xl">Classement</h1><p className="mt-1 text-sm text-muted-foreground">Grimpe dans la ligue et fais briller ton école.</p></header><Tabs tabs={["joueurs", "ecoles"] as const} value={tab} onChange={setTab} />{tab === "joueurs" ? <Panel className="overflow-hidden p-3 sm:p-5"><SectionTitle title="Top joueurs" />{rows.map((p, i) => <div key={p.id} className="flex items-center gap-3 border-b border-border/60 py-3 last:border-0"><span className="w-7 text-center font-display text-sm font-black">{i < 3 ? <Crown className={i === 0 ? "mx-auto size-5 text-warning" : "mx-auto size-4 text-muted-foreground"} /> : i + 1}</span><Avatar name={p.name} /><div className="min-w-0 flex-1"><p className="truncate font-display text-sm font-bold">{p.name}</p><p className="text-xs text-muted-foreground">Niveau {p.level} · {p.school}</p></div><span className="font-display text-sm font-bold text-accent">{p.xp} XP</span></div>)}<div className="mt-3 rounded-2xl bg-primary/10 p-3 text-sm"><Trophy className="mr-2 inline size-4 text-accent" />Toi, <b>{player.name}</b> · niveau {Math.floor(player.xp / 400) + 1}</div></Panel> : <Panel className="p-5"><SectionTitle title="Ligue des écoles" />{SCHOOLS.map((s, i) => <div key={s.name} className="flex items-center gap-3 border-b border-border/60 py-4 last:border-0"><span className="w-6 font-display font-black">{i + 1}</span><div className="flex-1"><p className="font-display text-sm font-bold">{s.name}</p><p className="text-xs text-muted-foreground">{s.players} joueurs</p></div><b className="text-accent">{s.xp.toLocaleString("fr-FR")} XP</b></div>)}</Panel>}</div></AppShell>;
}
