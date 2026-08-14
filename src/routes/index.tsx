import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Brain,
  Timer,
  GraduationCap,
  Dices,
  Flag,
  Flame,
  Trophy,
  Target,
  Users,
  Gift,
  ChevronRight,
  Rocket,
} from "lucide-react";
import { AppShell } from "@/components/quiz/AppShell";
import { Intro, useIntro } from "@/components/quiz/Intro";
import { Logo } from "@/components/quiz/Logo";
import { GhostButton, Panel, PrimaryButton, SectionTitle, StatTile, XpBar } from "@/components/quiz/ui";
import { levelProgress, useGame } from "@/lib/game-store";
import { GAME_MODES, ONLINE_PLAYERS, SUBJECTS } from "@/lib/quiz-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quiz Time — Le jeu de quiz éducatif des élèves haïtiens" },
      {
        name: "description",
        content:
          "Quiz Time : apprends en jouant. Modes Chrono, Examen, Défi aléatoire et Haïti Quest. Gagne de l'XP, monte de niveau et grimpe au classement.",
      },
      { property: "og:title", content: "Quiz Time — Apprendre devient un jeu" },
      {
        property: "og:description",
        content:
          "Entre dans le lobby futuriste de Quiz Time : quiz, combos, XP, badges et Haïti Quest.",
      },
    ],
  }),
  component: Lobby,
});

const MODE_ICONS = { brain: Brain, timer: Timer, graduation: GraduationCap, dice: Dices, flag: Flag };

function Lobby() {
  const intro = useIntro();
  const navigate = useNavigate();
  const { player, level, successRate } = useGame();
  const progress = levelProgress(player.xp);

  if (intro.show) return <Intro onDone={intro.dismiss} />;

  return (
    <AppShell>
      <div className="space-y-6">
        <Panel glow className="relative overflow-hidden p-5 sm:p-7 animate-rise">
          <div className="absolute -right-16 -top-20 size-56 rounded-full bg-primary/25 blur-3xl" />
          <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="min-w-0">
              <Logo className="mb-3 hidden text-2xl lg:flex" />
              <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
                Mission du jour
              </p>
              <h1 className="mt-2 truncate text-2xl font-black sm:text-3xl">
                Bonjour, {player.name} 👋
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Prêt à défier ton esprit aujourd'hui ?
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] font-display text-lg font-black text-primary-foreground">
                  {level}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Niveau {level}</span>
                    <span>
                      {progress.inLevel} / {progress.needed} XP
                    </span>
                  </div>
                  <XpBar className="mt-1.5" percent={progress.percent} />
                </div>
              </div>
            </div>
            <div className="glass flex items-center gap-2 justify-self-start rounded-full px-4 py-2 text-xs font-semibold lg:justify-self-end">
              <span className="size-2 animate-glow-pulse rounded-full bg-success" />
              <Users className="size-4 text-accent" />
              {ONLINE_PLAYERS.toLocaleString("fr-FR")} joueurs en ligne
            </div>
          </div>
        </Panel>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="Quiz joués" value={player.gamesPlayed} icon={<Target className="size-4" />} />
          <StatTile label="Réussite" value={`${successRate}%`} icon={<Trophy className="size-4" />} accent="success" />
          <StatTile label="Série" value={`${player.streakDays} j`} icon={<Flame className="size-4" />} accent="warning" />
          <StatTile label="Meilleur combo" value={`x${player.bestCombo}`} icon={<Rocket className="size-4" />} accent="violet" />
        </div>

        <PrimaryButton onClick={() => navigate({ to: "/jouer" })} className="py-5 text-base">
          ⚡ Jouer maintenant
        </PrimaryButton>

        <section>
          <SectionTitle
            title="Modes de jeu"
            action={
              <Link to="/jouer" className="tap flex items-center text-xs font-semibold text-accent">
                Tout voir <ChevronRight className="size-4" />
              </Link>
            }
          />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            {GAME_MODES.map((mode) => {
              const Icon = MODE_ICONS[mode.icon as keyof typeof MODE_ICONS];
              return (
                <Link
                  key={mode.id}
                  to="/jouer/preparation"
                  search={{ mode: mode.id }}
                  className="tap glass group relative overflow-hidden rounded-3xl p-4"
                >
                  <span
                    className="absolute -right-8 -top-8 size-24 rounded-full blur-2xl opacity-40 transition-opacity group-hover:opacity-70"
                    style={{ background: `var(--color-${mode.accent})` }}
                  />
                  <Icon className={`relative mb-3 size-7 text-${mode.accent}`} strokeWidth={1.6} />
                  <p className="relative font-display text-sm font-bold">{mode.name}</p>
                  <p className="relative mt-1 text-xs text-muted-foreground">{mode.tagline}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-2">
          <Link to="/haiti-quest" className="tap block">
            <Panel className="relative h-full overflow-hidden p-5">
              <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-haiti)] opacity-25" />
              <p className="font-display text-xs uppercase tracking-[0.25em] text-accent">
                Signature Quiz Time
              </p>
              <h3 className="mt-2 text-xl font-black">🇭🇹 Haïti Quest</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Explore ton pays. Teste tes connaissances. {player.zonesCleared.length}/8 zones
                conquises.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 font-display text-xs font-bold uppercase tracking-widest text-accent">
                Explorer <ChevronRight className="size-4" />
              </span>
            </Panel>
          </Link>

          <Panel className="p-5">
            <SectionTitle title="Récompenses disponibles" />
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-warning/15 text-warning">
                <Gift className="size-6" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-bold">Coffre quotidien</p>
                <p className="text-xs text-muted-foreground">
                  Termine 1 quiz aujourd'hui pour l'ouvrir
                </p>
              </div>
            </div>
            <Link to="/recompenses" className="mt-4 block">
              <GhostButton>Voir mes badges</GhostButton>
            </Link>
          </Panel>
        </div>

        <section>
          <SectionTitle title="Quiz populaires" />
          <div className="flex snap-x gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {SUBJECTS.slice(0, 6).map((s) => (
              <Link
                key={s.id}
                to="/jouer/preparation"
                search={{ mode: "entrainement", subject: s.id }}
                className="tap glass min-w-[9.5rem] shrink-0 snap-start rounded-2xl p-4"
              >
                <p className="font-display text-sm font-bold">{s.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {s.players.toLocaleString("fr-FR")} joueurs
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
