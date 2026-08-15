import { Download, Smartphone, X } from "lucide-react";
import { useEffect, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallGame() {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!show || !installEvent) return null;

  const install = async () => {
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === "accepted") setShow(false);
    setInstallEvent(null);
  };

  return <div className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-3 right-3 z-[55] mx-auto max-w-sm rounded-2xl border border-accent/25 bg-card/95 p-3 shadow-2xl backdrop-blur-xl lg:bottom-5 lg:left-auto lg:right-5 lg:mx-0">
    <div className="flex items-start gap-3">
      <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent"><Smartphone className="size-5" /></div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">Télécharger QuizTime Go</p>
        <p className="mt-1 text-xs leading-4 text-muted-foreground">Installe le jeu sur ton appareil pour le lancer plus facilement et jouer hors connexion.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={install} className="tap inline-flex items-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-3 py-2 text-xs font-bold text-primary-foreground"><Download className="size-4" />Installer le jeu</button>
          <button type="button" onClick={() => setShow(false)} aria-label="Fermer" className="tap grid size-9 place-items-center rounded-xl glass"><X className="size-4" /></button>
        </div>
      </div>
    </div>
  </div>;
}
