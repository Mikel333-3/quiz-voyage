import { createFileRoute } from "@tanstack/react-router";
import { Crown, MessageCircle, Share2, Trophy } from "lucide-react";
import { AppShell } from "@/components/quiz/AppShell";
import { Avatar, Panel, SectionTitle, Tabs } from "@/components/quiz/ui";
import { useGame } from "@/lib/game-store";
import { shareQuizWhatsApp } from "@/lib/sharing";
import { useState } from "react";

export const Route = createFileRoute("/classement")({ component: LeaderboardPage });

type LeaderPlayer = { id: string; name: string; xp: number; level: number; school: string };
type SchoolRow = { name: string; players: number; xp: number };
const LEADERBOARD: LeaderPlayer[] = [
  { id: "1", name: "GeniusHaiti", xp: 2450, level: 18, school: "Lycée Pétion" },
  { id: "2", name: "MathKing", xp: 1980, level: 15, school: "Collège Canapé-Vert" },
  { id: "3", name: "SmartKid", xp: 1850, level: 14, school: "Lycée Pétion" },
  { id: "4", name: "QueenQuiz", xp: 1720, level: 13, school: "Collège Saint-Louis" },
  { id: "5", name: "CapMaster", xp: 1590, level: 12, school: "Collège Pratique du Nord" },
];
const SCHOOLS: SchoolRow[] = [
  { name: "Lycée Pétion", players: 120, xp: 24500 },
  { name: "Collège Pratique du Nord", players: 95, xp: 19800 },
  { name: "Collège Canapé-Vert", players: 88, xp: 18400 },
  { name: "Collège Saint-Louis", players: 76, xp: 16100 },
];

function LeaderboardPage() {
  const { player, level } = useGame(); const [tab, setTab] = useState<"joueurs" | "ecoles">("joueurs"); const rows = [...LEADERBOARD].sort((a, b) => b.xp - a.xp); const rank = Math.max(1, rows.findIndex((p) => p.xp <= player.xp) + 1); const shareRanking = () => shareQuizWhatsApp({ score: player.xp, level, name: player.name });
  return <AppShell><div className="mx-auto max-w-3xl space-y-5"><header><p className="font-display text-xs uppercase tracking-[0.35em] text-accent">Arena</p><h1 className="mt-2 text-2xl font-black sm:text-3xl">Classement</h1><p className="mt-1 text-sm text-muted-foreground">Grimpe dans la ligue et fais briller ton école.</p></header><Tabs tabs={["joueurs", "ecoles"] as const} value={tab} onChange={setTab} />{tab === "joueurs" ? <Panel className="overflow-hidden p-3 sm:p-5"><div className="mb-4 flex items-center justify-between gap-3"><SectionTitle title="Top joueurs" /><button onClick={shareRanking} className="tap inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-3 py-2 text-xs font-bold text-white"><MessageCircle className="size-4" /> Partager</button></div>{rows.map((p, i) => <div key={p.id} className="flex items-center gap-3 border-b border-border/60 py-3 last:border-0"><span className="w-7 text-center font-display text-sm font-black">{i < 3 ? <Crown className={i === 0 ? "mx-auto size-5 text-warning" : "mx-auto size-4 text-muted-foreground"} /> : i + 1}</span><Avatar name={p.name} /><div className="min-w-0 flex-1"><p className="truncate font-display text-sm font-bold">{p.name}</p><p className="text-xs text-muted-foreground">Niveau {p.level} · {p.school}</p></div><span className="font-display text-sm font-bold text-accent">{p.xp} XP</span></div>)}<div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-primary/10 p-3 text-sm"><div><Trophy className="mr-2 inline size-4 text-accent" />Toi, <b>{player.name}</b> · niveau {level} · <b>#{rank}</b></div><button aria-label="Partager mon classement" onClick={shareRanking} className="tap rounded-xl p-2 text-accent"><Share2 className="size-4" /></button></div></Panel> : <Panel className="p-5"><SectionTitle title="Ligue des écoles" />{SCHOOLS.map((s, i) => <div key={s.name} className="flex items-center gap-3 border-b border-border/60 py-4 last:border-0"><span className="w-6 font-display font-black">{i + 1}</span><div className="flex-1"><p className="font-display text-sm font-bold">{s.name}</p><p className="text-xs text-muted-foreground">{s.players} joueurs</p></div><b className="text-accent">{s.xp.toLocaleString("fr-FR")} XP</b></div>)}</Panel>}</div></AppShell>;
}