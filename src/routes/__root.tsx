import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { GameProvider } from "../lib/game-store";
import { unlockAudio } from "../lib/sound";

function NotFoundComponent() {
  return <div className="flex min-h-screen items-center justify-center bg-background px-4"><div className="max-w-md text-center"><h1 className="text-7xl font-bold text-foreground">404</h1><h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2><p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p><div className="mt-6"><Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Go home</Link></div></div></div>;
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return <div className="flex min-h-screen items-center justify-center bg-background px-4"><div className="max-w-md text-center"><h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1><p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try refreshing or head back home.</p><div className="mt-6 flex flex-wrap justify-center gap-2"><button onClick={() => { router.invalidate(); reset(); }} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Try again</button><a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground">Go home</a></div></div></div>;
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "QuizTime Go — Apprendre devient un jeu" },
      { name: "description", content: "QuizTime Go, le jeu de quiz ouvert à tous, avec une expérience particulièrement pensée pour les étudiants." },
      { property: "og:title", content: "QuizTime Go — Apprendre devient un jeu" },
      { property: "og:description", content: "Quiz, combos, XP, badges et Haïti Quest." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/quiz-voyage/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800;900&family=Rajdhani:wght@400;500;600;700&display=swap" },
      { rel: "icon", href: "/quiztime-favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/quiztime-favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return <html lang="fr"><head><HeadContent /></head><body>{children}<Scripts /></body></html>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    let unlocked = false;
    const onUserGesture = () => {
      if (unlocked) return;
      unlocked = true;
      void unlockAudio();
      window.removeEventListener("pointerdown", onUserGesture, true);
      window.removeEventListener("keydown", onUserGesture, true);
    };
    window.addEventListener("pointerdown", onUserGesture, true);
    window.addEventListener("keydown", onUserGesture, true);
    return () => {
      window.removeEventListener("pointerdown", onUserGesture, true);
      window.removeEventListener("keydown", onUserGesture, true);
    };
  }, []);
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const base = new URL("./", window.location.href);
    const workerUrl = new URL("sw.js", base);
    navigator.serviceWorker.register(workerUrl.pathname).catch(() => { /* offline support is progressive */ });
  }, []);
  return <QueryClientProvider client={queryClient}><GameProvider><Outlet /></GameProvider></QueryClientProvider>;
}
