import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Brain, Timer, GraduationCap, Dices, Flag, Flame, Trophy, Target, Users, Gift, ChevronRight, Rocket, Swords, MessageCircle } from "lucide-react";
import { AppShell } from "@/components/quiz/AppShell";
import { Intro, useIntro } from "@/components/quiz/Intro";
import { Logo } from "@/components/quiz/Logo";
import { GhostButton, Panel, PrimaryButton, SectionTitle, StatTile, XpBar } from "@/components/quiz/ui";
import { levelProgress, useGame } from "@/lib/game-store";
import { GAME_MODES, ONLINE_PLAYERS, SUBJECTS } from "@/lib/quiz-data";
import { shareQuizWhatsApp } from "@/lib/sharing";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Quiz Time — Le jeu de quiz éducatif des élèves haïtiens" },
    { name: "description", content: "Quiz Time : apprends en jouant. Modes Chrono, Examen, Défi aléatoire et Haïti Quest. Gagne de l'XP, monte de niveau et grimpe au classement." },
    { property: "og:title", content: "Quiz Time — Apprendre devient un jeu" },
    { property: "og:description", content: "Entre dans le lobby futuriste de Quiz Time : quiz, combos, XP, badges et Haïti Quest." },
  ] }),
  component: Lobby,
});

const MODE_ICONS = { brain: Brain, timer: Timer, graduation: GraduationCap, dice: Dices, flag: Flag };
const MODE_GLOWS: Record<string, string> = {
  primary: "hsl(191 100% 55% / 0.18)",
  success: "hsl(145 75% 50% / 0.16)",
  violet: "hsl(270 85% 65% / 0.17)",
  warning: "hsl(42 95% 58% / 0.18)",
  haiti: "hsl(199 95% 55% / 0.18)",
};

function Lobby() {
  const intro = useIntro();
  const navigate = useNavigate();
  const { player, level, successRate } = useGame();
  const progress = levelProgress(player.xp);
  const challengeParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const challengeScore = challengeParams?.get("challengeScore");
  const challengeName = challengeParams?.get("challengeName") || "Un ami";
  const challengeLevel = challengeParams?.get("challengeLevel");
  const challengeValue = challengeScore ? Number(challengeScore) : 0;
  if (intro.show) return <Intro onDone={intro.dismiss} />;

  return <AppShell>
    <div className="space-y-6">
      {challengeScore && challengeValue > 0 && <Panel glow className="relative overflow-hidden border-accent/30 bg-accent/5 p-5 animate-rise"><div className="absolute -right-10 -top-10 size-32 rounded-full bg-accent/20 blur-3xl" /><div className="relative flex flex-col gap-4 sm:flex-row sm:items-center"><div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent"><Swords className="size-6" /></div><div className="min-w-0 flex-1"><p className="font-display text-xs uppercase tracking-[0.25em] text-accent">Défi reçu</p><h2 className="mt-1 text-xl font-black">{challengeName} te défie ! 🎯</h2><p className="mt-1 text-sm text-muted-foreground">Score à battre : <b className="text-foreground">{challengeValue.toLocaleString("fr-FR")} XP</b>{challengeLevel ? ` · niveau ${challengeLevel}` : ""}</p></div><button onClick={() => navigate({ to: "/jouer" })} className="tap rounded-2xl bg-[image:var(--gradient-primary)] px-5 py-3 font-display text-xs font-black uppercase tracking-wider text-primary-foreground">Accepter le défi</button></div></Panel>}
      <Panel glow className="relative overflow-hidden p-5 sm:p-7 animate-rise"><div className="absolute -right-16 -top-20 size-56 rounded-full bg-primary/25 blur-3xl" /><div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"><div className="min-w-0"><Logo className="mb-3 hidden text-2xl lg:flex" /><p className="font-display text-xs uppercase tracking-[0.3em] text-accent">Mission du jour</p><h1 className="mt-2 truncate text-2xl font-black sm:text-3xl">Bonjour, {player.name} 👋</h1><p className="mt-1 text-sm text-muted-foreground">Prêt à défier ton esprit aujourd'hui ?</p><div className="mt-4 flex items-center gap-3"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] font-display text-lg font-black text-primary-foreground">{level}</span><div className="min-w-0 flex-1"><div className="flex justify-between text-xs text-muted-foreground"><span>Niveau {level}</span><span>{progress.inLevel} / {progress.needed} XP</span></div><XpBar className="mt-1.5" percent={progress.percent} /></div></div></div><div className="glass flex items-center gap-2 justify-self-start rounded-full px-4 py-2 text-xs font-semibold lg:justify-self-end"><span className="size-2 animate-glow-pulse rounded-full bg-success" /><Users className="size-4 text-accent" />{ONLINE_PLAYERS.toLocaleString("fr-FR")} joueurs en ligne</div></div></Panel>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><StatTile label="Quiz joués" value={player.gamesPlayed} icon={<Target className="size-4" />} /><StatTile label="Réussite" value={`${successRate}%`} icon={<Trophy className="size-4" />} accent="success" /><StatTile label="Série" value={`${player.streakDays} j`} icon={<Flame className="size-4" />} accent="warning" /><StatTile label="Meilleur combo" value={`x${player.bestCombo}`} icon={<Rocket className="size-4" />} accent="violet" /></div>
      <PrimaryButton onClick={() => navigate({ to: "/jouer" })} className="py-5 text-base">⚡ Jouer maintenant</PrimaryButton>
      <section><SectionTitle title="Modes de jeu" action={<Link to="/jouer" className="tap flex items-center text-xs font-semibold text-accent">Tout voir <ChevronRight className="size-4" /></Link>} /><div className="grid grid-cols-2 gap-3 lg:grid-cols-5">{GAME_MODES.map((mode) => { const Icon = MODE_ICONS[mode.icon as keyof typeof MODE_ICONS]; const glow = MODE_GLOWS[mode.accent] ?? MODE_GLOWS.primary; return <Link key={mode.id} to="/jouer/preparation" search={{ mode: mode.id }} className="tap glass group relative overflow-hidden rounded-3xl p-4" style={{ boxShadow: `inset 0 0 70px ${glow}` }}><span className="absolute -right-10 -top-10 size-28 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-125" style={{ background: glow }} /><span className="absolute -bottom-12 -left-8 size-24 rounded-full blur-3xl opacity-50" style={{ background: glow }} /><Icon className={`relative mb-3 size-7 text-${mode.accent}`} strokeWidth={1.6} /><p className="relative font-display text-sm font-bold">{mode.name}</p><p className="relative mt-1 text-xs text-muted-foreground">{mode.tagline}</p></Link>; })}</div></section>
      <div className="grid gap-4 lg:grid-cols-2"><Link to="/haiti-quest" className="tap block"><Panel className="relative h-full overflow-hidden p-5"><div className="absolute inset-0 -z-10 bg-[image:var(--gradient-haiti)] opacity-25" /><p className="font-display text-xs uppercase tracking-[0.25em] text-accent">Signature Quiz Time</p><h3 className="mt-2 text-xl font-black">🇭🇹 Haïti Quest</h3><p className="mt-1 text-sm text-muted-foreground">Explore ton pays. Teste tes connaissances. {player.zonesCleared.length}/8 zones conquises.</p><span className="mt-4 inline-flex items-center gap-1 font-display text-xs font-bold uppercase tracking-widest text-accent">Explorer <ChevronRight className="size-4" /></span></Panel></Link><Panel className="p-5"><SectionTitle title="Récompenses disponibles" /><div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-2xl bg-warning/15 text-warning"><Gift className="size-6" /></span><div className="min-w-0"><p className="font-display text-sm font-bold">Coffre quotidien</p><p className="text-xs text-muted-foreground">Termine 1 quiz aujourd'hui pour l'ouvrir</p></div></div><Link to="/recompenses" className="mt-4 block"><GhostButton>Voir mes badges</GhostButton></Link></Panel></div>
      <Panel className="border-accent/20 bg-accent/5 p-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-center"><div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent"><Users className="size-5" /></div><div className="flex-1"><p className="font-display text-sm font-black">🎮 Quiz Time se joue mieux entre amis</p><p className="mt-1 text-xs text-muted-foreground">Invite un ami sur WhatsApp, lance un défi et vois qui domine le classement.</p></div><button onClick={() => shareQuizWhatsApp({ score: player.xp, level, name: player.name }, true)} className="tap inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 font-display text-xs font-black uppercase tracking-wider text-white"><MessageCircle className="size-4" /> Inviter</button></div></Panel>
      <section><SectionTitle title="Quiz populaires" /><div className="flex snap-x gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">{SUBJECTS.slice(0, 6).map((s) => <Link key={s.id} to="/jouer/preparation" search={{ mode: "entrainement", subject: s.id }} className="tap glass min-w-[9.5rem] shrink-0 snap-start rounded-2xl p-4"><p className="font-display text-sm font-bold">{s.name}</p><p className="mt-1 text-xs text-muted-foreground">{s.players.toLocaleString("fr-FR")} joueurs</p></Link>)}</div></section>
    </div>
  </AppShell>;
}
