import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Timer, GraduationCap, Dices, Flag, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/quiz/AppShell";
import { Panel } from "@/components/quiz/ui";
import { GAME_MODES } from "@/lib/quiz-data";

export const Route = createFileRoute("/jouer/")({
  head: () => ({
    meta: [
      { title: "Choisis ton mode de jeu — QuizTime Go" },
      {
        name: "description",
        content:
          "Entraînement, Chrono, Examen, Défi aléatoire ou Haïti Quest : choisis ton mode de jeu QuizTime Go et lance ta partie.",
      },
      { property: "og:title", content: "Modes de jeu — QuizTime Go" },
      {
        property: "og:description",
        content: "Cinq façons de jouer et de gagner de l'XP sur QuizTime Go.",
      },
    ],
  }),
  component: PlayPage,
});

const ICONS = { brain: Brain, timer: Timer, graduation: GraduationCap, dice: Dices, flag: Flag };

function PlayPage() {
  return (
    <AppShell>
      <div className="space-y-5">
        <header className="animate-rise">
          <p className="font-display text-xs uppercase tracking-[0.35em] text-accent">
            Select your mission
          </p>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">Choisis ton mode de jeu</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Chaque mode a ses règles, son rythme et ses bonus d'XP.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {GAME_MODES.map((mode, i) => {
            const Icon = ICONS[mode.icon as keyof typeof ICONS];
            return (
              <Link
                key={mode.id}
                to="/jouer/preparation"
                search={{ mode: mode.id }}
                className="tap animate-rise"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <Panel className="group relative h-full overflow-hidden p-5">
                  <span
                    className="absolute -right-10 -top-10 size-28 rounded-full opacity-35 blur-2xl transition-opacity group-hover:opacity-70"
                    style={{ background: `var(--color-${mode.accent})` }}
                  />
                  <Icon className={`relative size-8 text-${mode.accent}`} strokeWidth={1.6} />
                  <h2 className="relative mt-3 text-lg font-black">{mode.name}</h2>
                  <p className="relative text-sm font-semibold text-accent">{mode.tagline}</p>
                  <p className="relative mt-2 text-sm text-muted-foreground">{mode.description}</p>
                  <div className="relative mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {mode.timePerQuestion ? `${mode.timePerQuestion}s / question` : "Sans chrono"}{" "}
                      · XP x{mode.xpMultiplier}
                    </span>
                    <ChevronRight className="size-4 text-accent" />
                  </div>
                </Panel>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
