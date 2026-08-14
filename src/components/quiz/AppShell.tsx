import { Link } from "@tanstack/react-router";
import {
  Home,
  Gamepad2,
  MapPinned,
  Trophy,
  Medal,
  User,
  Settings,
  HelpCircle,
  Flame,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { levelProgress, useGame } from "@/lib/game-store";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Lobby", icon: Home, exact: true },
  { to: "/jouer", label: "Jouer", icon: Gamepad2 },
  { to: "/haiti-quest", label: "Haïti Quest", icon: MapPinned },
  { to: "/classement", label: "Classement", icon: Trophy },
  { to: "/recompenses", label: "Récompenses", icon: Medal },
  { to: "/profil", label: "Profil", icon: User },
] as const;

const MOBILE_NAV = NAV.filter((n) => n.label !== "Récompenses");

export function StarField() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-floor absolute inset-x-0 top-0 h-[70vh]" />
      {Array.from({ length: 26 }).map((_, i) => (
        <span
          key={i}
          className="absolute size-[3px] rounded-full bg-accent/70 animate-glow-pulse"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i % 8) * 0.35}s`,
          }}
        />
      ))}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { player, level } = useGame();
  const progress = levelProgress(player.xp);

  return (
    <div className="min-h-screen">
      <StarField />
      <div className="mx-auto flex w-full max-w-[1400px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-6 border-r border-border/60 px-5 py-6 lg:flex">
          <Link to="/" className="tap">
            <Logo className="text-2xl" />
          </Link>
          <nav className="flex flex-col gap-1">
            {NAV.map(({ to, label, icon: Icon, ...rest }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: "exact" in rest ? rest.exact : false }}
                activeProps={{
                  className: "glass glow-ring text-accent",
                }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
                className="tap flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold uppercase tracking-wide"
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-primary)] font-display text-sm font-bold text-primary-foreground">
                  {level}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm">{player.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {progress.inLevel} / {progress.needed} XP
                  </p>
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-[width] duration-700"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
            </div>
            <div className="flex gap-2 text-xs text-muted-foreground">
              <Link to="/parametres" className="tap glass flex-1 rounded-xl px-3 py-2 text-center">
                <Settings className="mx-auto size-4" />
              </Link>
              <Link to="/aide" className="tap glass flex-1 rounded-xl px-3 py-2 text-center">
                <HelpCircle className="mx-auto size-4" />
              </Link>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {/* Mobile top bar */}
          <header className="sticky top-0 z-20 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl lg:hidden">
            <Link to="/" className="min-w-0">
              <Logo className="text-lg" />
            </Link>
            <div className="flex shrink-0 items-center gap-2">
              <span className="glass flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold">
                <Flame className="size-3.5 text-warning" />
                {player.streakDays}
              </span>
              <span className="glass flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold">
                <Zap className="size-3.5 text-accent" />
                {player.xp}
              </span>
            </div>
          </header>

          <main className="px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-10">{children}</main>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border/60 bg-background/90 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
        <ul className="mx-auto flex max-w-md items-stretch justify-between">
          {MOBILE_NAV.map(({ to, label, icon: Icon, ...rest }) => (
            <li key={to} className="flex-1">
              <Link
                to={to}
                activeOptions={{ exact: "exact" in rest ? rest.exact : false }}
                activeProps={{ className: "text-accent" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="tap flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5"
              >
                <Icon className="size-5" />
                <span className="text-[10px] font-semibold uppercase tracking-wide">
                  {label === "Haïti Quest" ? "Haïti" : label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
