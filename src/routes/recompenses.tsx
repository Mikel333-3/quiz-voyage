import { createFileRoute } from "@tanstack/react-router";
import { Crown, Flame, Flag, GraduationCap, Moon, Target, Trophy, Zap, Gift, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/quiz/AppShell";
import { Panel, SectionTitle } from "@/components/quiz/ui";
import { BADGES } from "@/lib/quiz-data";
import { ALL_EXTRA_BADGES } from "@/lib/achievements";
import { useGame } from "@/lib/game-store";
import { playSound } from "@/lib/sound";

export const Route = createFileRoute("/recompenses")({ component: RewardsPage });
const ALL_BADGES = [...BADGES, ...ALL_EXTRA_BADGES];
const ICONS: Record<string, typeof Trophy> = { trophy: Trophy, zap: Zap, target: Target, flame: Flame, flag: Flag, graduation: GraduationCap, crown: Crown, moon: Moon };

function RewardsPage() {
  const { player } = useGame();
  const [claimed, setClaimed] = useState<string[]>([]);
  const [celebration, setCelebration] = useState<(typeof ALL_BADGES)[number] | null>(null);

  const claim = (badge: (typeof ALL_BADGES)[number]) => {
    if (!player.badges.includes(badge.id) || claimed.includes(badge.id)) return;
    setClaimed((items) => [...items, badge.id]);
    setCelebration(badge);
    playSound("success");
  };

  return <AppShell>
    <div className="mx-auto max-w-3xl space-y-5">
      <header><p className="font-display text-xs uppercase tracking-[0.35em] text-accent">Collection</p><h1 className="mt-2 text-2xl font-black">Récompenses</h1><p className="mt-1 text-sm text-muted-foreground">Chaque partie peut débloquer une nouvelle pièce de ta collection.</p></header>
      <Panel glow className="p-5"><div className="flex items-center justify-between"><SectionTitle title="Progression" className="mb-0" /><span className="font-display text-sm font-bold text-accent">{player.badges.length}/{ALL_BADGES.length}</span></div><div className="mt-4 h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-[image:var(--gradient-primary)]" style={{ width: `${Math.min(100, (player.badges.length / ALL_BADGES.length) * 100)}%` }} /></div></Panel>
      <div className="grid gap-3 sm:grid-cols-2">{ALL_BADGES.map((b) => { const unlocked = player.badges.includes(b.id); const isClaimed = claimed.includes(b.id); const Icon = ICONS[b.icon] ?? Trophy; return <Panel key={b.id} className={`p-5 ${unlocked ? "glow-ring" : "opacity-55"}`}><div className="flex gap-4"><span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${unlocked ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"}`}><Icon className="size-6" /></span><div className="min-w-0 flex-1"><p className="font-display text-sm font-bold">{b.name} {unlocked && "✓"}</p><p className="mt-1 text-sm text-muted-foreground">{b.description}</p><p className="mt-2 text-xs text-accent">{b.condition}</p>{unlocked && <button type="button" disabled={isClaimed} onClick={() => claim(b)} className="tap mt-3 inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-3 py-2 text-xs font-bold text-primary-foreground disabled:cursor-default disabled:opacity-50"><Gift className="size-3.5" />{isClaimed ? "Récompense réclamée" : "Réclamer"}</button>}</div></div></Panel>})}</div>
    </div>
    {celebration && <div className="fixed inset-0 z-[70] grid place-items-center bg-background/75 p-5 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Récompense réclamée"><div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-accent/30 bg-card p-7 text-center shadow-[0_0_70px_hsl(var(--accent)/0.2)] animate-pop"><button type="button" aria-label="Fermer" onClick={() => setCelebration(null)} className="tap absolute right-3 top-3 grid size-9 place-items-center rounded-xl glass"><X className="size-4" /></button><div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.28),transparent_68%)]" /><div className="relative mx-auto grid size-20 place-items-center rounded-3xl bg-warning/15 text-warning"><Sparkles className="size-9 animate-glow-pulse" /></div><p className="relative mt-5 font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">Récompense réclamée !</p><h2 className="relative mt-2 text-2xl font-black">{celebration.name}</h2><p className="relative mt-2 text-sm text-muted-foreground">Bravo ! Cette récompense rejoint officiellement ta collection.</p><button type="button" onClick={() => setCelebration(null)} className="tap mt-6 w-full rounded-xl bg-[image:var(--gradient-primary)] px-4 py-3 text-sm font-bold text-primary-foreground">Continuer</button></div></div>}
  </AppShell>;
}
