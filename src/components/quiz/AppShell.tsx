import { Link } from "@tanstack/react-router";
import { Home, Gamepad2, MapPinned, Trophy, Medal, User, Settings, HelpCircle, Flame, Zap, Menu, Bell, X, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { levelProgress, useGame } from "@/lib/game-store";
import { playSound } from "@/lib/sound";
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
const SESSION_START = "quiztime:session-start";
const NOTIFICATIONS = [
  { id: "welcome", delay: 60_000, title: "Bienvenue dans Quiz Time !", text: "Ta première mission t'attend. Fais un quiz et gagne ton premier XP.", icon: "👋" },
  { id: "daily", delay: 180_000, title: "Nouvelle mission", text: "Défi du jour : joue un quiz et tente de battre ton meilleur combo.", icon: "⚡" },
  { id: "quest", delay: 360_000, title: "Mission Haïti Quest", text: "Une nouvelle zone t'appelle. Explore, réponds et débloque ta prochaine récompense.", icon: "🇭🇹" },
];
type NotificationItem = (typeof NOTIFICATIONS)[number];

export function StarField() {
  return <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"><div className="grid-floor absolute inset-x-0 top-0 h-[70vh]" />{Array.from({ length: 26 }).map((_, i) => <span key={i} className="absolute size-[3px] rounded-full bg-accent/70 animate-glow-pulse" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animationDelay: `${(i % 8) * 0.35}s` }} />)}</div>;
}

function NotificationButton({ notifications, onToggle }: { notifications: NotificationItem[]; onToggle: () => void }) {
  return <button type="button" aria-label="Notifications" onClick={onToggle} className="tap relative grid size-10 place-items-center rounded-xl glass hover:scale-105 hover:text-accent transition-transform"><Bell className="size-5" />{notifications.length > 0 && <span className="absolute right-1.5 top-1.5 grid min-w-4 place-items-center rounded-full bg-destructive px-1 text-[9px] font-black text-destructive-foreground">{Math.min(9, notifications.length)}</span>}</button>;
}

function NotificationPanel({ notifications }: { notifications: NotificationItem[] }) {
  return <div className="absolute right-0 top-12 z-50 w-[min(20rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-2 shadow-2xl backdrop-blur-xl"><div className="flex items-center justify-between px-2 py-2"><p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-accent">Notifications</p><Sparkles className="size-4 text-accent" /></div>{notifications.length === 0 ? <p className="px-2 py-4 text-xs text-muted-foreground">Aucune nouvelle mission pour le moment.</p> : <div className="space-y-1">{[...notifications].reverse().map((item) => <div key={item.id} className="rounded-xl bg-muted/40 p-3"><div className="flex gap-3"><span className="text-lg">{item.icon}</span><div><p className="text-xs font-bold">{item.title}</p><p className="mt-1 text-[11px] leading-4 text-muted-foreground">{item.text}</p></div></div></div>)}</div>}</div>;
}

export function AppShell({ children }: { children: ReactNode }) {
  const { player, level } = useGame();
  const progress = levelProgress(player.xp);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    let start = Date.now();
    try {
      const saved = sessionStorage.getItem(SESSION_START);
      if (saved) start = Number(saved) || start;
      else sessionStorage.setItem(SESSION_START, String(start));
    } catch { /* ignore */ }
    const timers = NOTIFICATIONS.map((item) => {
      const remaining = Math.max(0, item.delay - (Date.now() - start));
      return window.setTimeout(() => setNotifications((current) => current.some((n) => n.id === item.id) ? current : [...current, item]), remaining);
    });
    return () => timers.forEach(window.clearTimeout);
  }, []);

  const toggleNotifications = () => {
    setNotificationsOpen((v) => !v);
    setMenuOpen(false);
    playSound("nav");
  };

  return <div className="min-h-screen">
    <StarField />
    <div className="mx-auto flex w-full max-w-[1400px]">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-6 border-r border-border/60 px-5 py-6 lg:flex">
        <div className="relative flex items-center justify-between gap-3"><Link to="/" className="tap" onClick={() => playSound("nav")}><Logo className="text-2xl" /></Link><NotificationButton notifications={notifications} onToggle={toggleNotifications} />{notificationsOpen && <NotificationPanel notifications={notifications} />}</div>
        <nav className="flex flex-col gap-1">{NAV.map(({ to, label, icon: Icon, ...rest }) => <Link key={to} to={to} onClick={() => playSound("nav")} activeOptions={{ exact: "exact" in rest ? rest.exact : false }} activeProps={{ className: "glass glow-ring text-accent" }} inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }} className="tap flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold uppercase tracking-wide"><Icon className="size-4 shrink-0" /><span className="truncate">{label}</span></Link>)}</nav>
        <div className="mt-auto flex flex-col gap-3"><div className="glass rounded-2xl p-4"><div className="flex items-center gap-3"><div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-primary)] font-display text-sm font-bold text-primary-foreground">{level}</div><div className="min-w-0"><p className="truncate font-display text-sm">{player.name}</p><p className="text-xs text-muted-foreground">{progress.inLevel} / {progress.needed} XP</p></div></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-[width] duration-700" style={{ width: `${progress.percent}%` }} /></div></div><div className="flex gap-2 text-xs text-muted-foreground"><Link to="/parametres" onClick={() => playSound("nav")} className="tap glass flex-1 rounded-xl px-3 py-2 text-center"><Settings className="mx-auto size-4" /></Link><Link to="/aide" onClick={() => playSound("nav")} className="tap glass flex-1 rounded-xl px-3 py-2 text-center"><HelpCircle className="mx-auto size-4" /></Link></div></div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border/60 bg-background/85 px-3 backdrop-blur-xl lg:hidden">
          <button type="button" aria-label="Ouvrir le menu" onClick={() => { setMenuOpen((v) => !v); setNotificationsOpen(false); playSound("nav"); }} className="tap grid size-10 place-items-center rounded-xl glass">{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
          <Link to="/" aria-label="Quiz Time" onClick={() => { setMenuOpen(false); setNotificationsOpen(false); playSound("nav"); }} className="tap absolute left-1/2 -translate-x-1/2"><Logo className="text-lg" /></Link>
          <div className="relative"><NotificationButton notifications={notifications} onToggle={toggleNotifications} />{notificationsOpen && <NotificationPanel notifications={notifications} />}</div>
        </header>
        {menuOpen && <div className="fixed inset-x-3 top-[4.25rem] z-50 rounded-2xl border border-border/70 bg-card/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden"><nav className="grid grid-cols-2 gap-1">{NAV.map(({ to, label, icon: Icon, ...rest }) => <Link key={to} to={to} onClick={() => { setMenuOpen(false); playSound("nav"); }} activeOptions={{ exact: "exact" in rest ? rest.exact : false }} className="tap flex items-center gap-2 rounded-xl px-3 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground active:text-accent"><Icon className="size-4" />{label}</Link>)}</nav></div>}
        {notifications.length > 0 && !notificationsOpen && <div className="pointer-events-none fixed bottom-20 left-3 right-3 z-40 lg:hidden"><div className="ml-auto max-w-sm rounded-2xl border border-accent/20 bg-card/95 p-3 shadow-2xl backdrop-blur-xl animate-rise"><div className="flex gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent/10 text-lg">{notifications[notifications.length - 1]?.icon}</span><div><p className="text-xs font-bold">{notifications[notifications.length - 1]?.title}</p><p className="mt-1 text-[11px] leading-4 text-muted-foreground">{notifications[notifications.length - 1]?.text}</p></div></div></div></div>}
        <main className="px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-10">{children}</main>
      </div>
    </div>
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border/60 bg-background/90 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden"><ul className="mx-auto flex max-w-md items-stretch justify-between">{MOBILE_NAV.map(({ to, label, icon: Icon, ...rest }) => <li key={to} className="flex-1"><Link to={to} onClick={() => playSound("nav")} activeOptions={{ exact: "exact" in rest ? rest.exact : false }} activeProps={{ className: "text-accent" }} inactiveProps={{ className: "text-muted-foreground" }} className="tap flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5"><Icon className="size-5" /><span className="text-[10px] font-semibold uppercase tracking-wide">{label === "Haïti Quest" ? "Haïti" : label}</span></Link></li>)}</ul></nav>
  </div>;
}
