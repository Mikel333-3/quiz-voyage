import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/quiz/AppShell";
import { GhostButton, Panel, SectionTitle } from "@/components/quiz/ui";
import { useGame } from "@/lib/game-store";
import { isSoundEnabled, setSoundEnabled } from "@/lib/sound";

export const Route = createFileRoute("/parametres")({ component: SettingsPage });
function SettingsPage() {
  const navigate = useNavigate();
  const { resetProgress } = useGame();
  const [sound, setSound] = useState(true);
  const [confirm, setConfirm] = useState(false);
  useEffect(() => setSound(isSoundEnabled()), []);
  function toggleSound() { const next = !sound; setSound(next); setSoundEnabled(next); }
  return <AppShell><div className="mx-auto max-w-2xl space-y-5"><button onClick={() => navigate({ to: "/" })} className="tap glass inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-transform duration-200 hover:-translate-y-0.5"><ArrowLeft className="size-4" /> Lobby</button><header><h1 className="text-2xl font-black">Paramètres</h1><p className="mt-1 text-sm text-muted-foreground">Personnalise ton expérience de jeu.</p></header><Panel className="p-5"><SectionTitle title="Expérience" /><button onClick={toggleSound} className="tap flex w-full items-center justify-between rounded-2xl bg-surface-2 p-4 text-left transition-transform duration-200 hover:-translate-y-0.5"><span className="flex items-center gap-3"><Volume2 className="size-5 text-accent" /><span><b className="block text-sm">Sons du jeu</b><small className="text-muted-foreground">Navigation, chrono et feedback</small></span></span><span className={`h-6 w-11 rounded-full p-1 transition ${sound ? "bg-primary" : "bg-muted"}`}><span className={`block size-4 rounded-full bg-white transition ${sound ? "translate-x-5" : ""}`} /></span></button></Panel><Panel className="p-5"><SectionTitle title="Données locales" /><p className="text-sm text-muted-foreground">Ta progression actuelle est enregistrée localement sur cet appareil.</p>{confirm ? <div className="mt-4 rounded-2xl border border-destructive/40 bg-destructive/10 p-4"><p className="text-sm font-semibold">Réinitialiser toute la progression ?</p><div className="mt-3 flex gap-2"><button onClick={() => { resetProgress(); setConfirm(false); }} className="tap rounded-xl bg-destructive px-4 py-2 text-sm font-bold text-white">Confirmer</button><button onClick={() => setConfirm(false)} className="tap rounded-xl bg-muted px-4 py-2 text-sm font-semibold">Annuler</button></div></div> : <GhostButton onClick={() => setConfirm(true)} className="mt-4 text-destructive"><RotateCcw className="mr-2 inline size-4" /> Réinitialiser la progression</GhostButton>}</Panel></div></AppShell>;
}
