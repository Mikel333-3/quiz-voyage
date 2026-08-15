import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw, Volume2, Music2, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/quiz/AppShell";
import { GhostButton, Panel, SectionTitle } from "@/components/quiz/ui";
import { useGame } from "@/lib/game-store";
import { isSoundEnabled, setSoundEnabled, startAmbientMusic, stopAmbientMusic, playSound } from "@/lib/sound";
import { DEFAULT_FEEDBACK_DELAY, DEFAULT_TIMER_DURATION, getFeedbackDelay, getTimerDuration, getVolume, isMusicEnabled, setFeedbackDelay, setMusicEnabled, setTimerDuration, setVolume } from "@/lib/game-settings";

export const Route = createFileRoute("/parametres")({ component: SettingsPage });
function SettingsPage() {
  const navigate = useNavigate();
  const { resetProgress } = useGame();
  const [sound, setSound] = useState(true);
  const [music, setMusic] = useState(true);
  const [volume, setVolumeState] = useState(1);
  const [delay, setDelay] = useState(DEFAULT_FEEDBACK_DELAY);
  const [timerDuration, setTimerDurationState] = useState(DEFAULT_TIMER_DURATION);
  const [confirm, setConfirm] = useState(false);
  useEffect(() => { setSound(isSoundEnabled()); setMusic(isMusicEnabled()); setVolumeState(getVolume()); setDelay(getFeedbackDelay()); setTimerDurationState(getTimerDuration()); }, []);
  function toggleSound() { const next = !sound; setSound(next); setSoundEnabled(next); if (next && music) startAmbientMusic(); }
  function toggleMusic() { const next = !music; setMusic(next); setMusicEnabled(next); if (next && sound) startAmbientMusic(); else stopAmbientMusic(); }
  function changeVolume(value: number) { const next = setVolume(value); setVolumeState(next); if (sound) playSound("nav"); }
  function changeDelay(value: number) { setDelay(setFeedbackDelay(value)); }
  function changeTimer(value: number) { setTimerDurationState(setTimerDuration(value)); }
  return <AppShell><div className="mx-auto max-w-2xl space-y-5">
    <button onClick={() => navigate({ to: "/" })} className="tap glass inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-transform duration-200 hover:-translate-y-0.5"><ArrowLeft className="size-4" /> Lobby</button>
    <header><h1 className="text-2xl font-black">Paramètres</h1><p className="mt-1 text-sm text-muted-foreground">Personnalise ton expérience de jeu.</p></header>
    <Panel className="p-5"><SectionTitle title="Audio" /><div className="space-y-3">
      <button onClick={toggleSound} className="tap flex w-full items-center justify-between rounded-2xl bg-surface-2 p-4 text-left transition-transform duration-200 hover:-translate-y-0.5"><span className="flex items-center gap-3"><Volume2 className="size-5 text-accent" /><span><b className="block text-sm">Sons du jeu</b><small className="text-muted-foreground">Navigation, chrono et feedback</small></span></span><span className={`h-6 w-11 rounded-full p-1 transition ${sound ? "bg-primary" : "bg-muted"}`}><span className={`block size-4 rounded-full bg-white transition ${sound ? "translate-x-5" : ""}`} /></span></button>
      <div className="rounded-2xl bg-surface-2 p-4"><div className="flex items-center justify-between gap-3"><span className="flex items-center gap-3"><Volume2 className="size-5 text-accent" /><span><b className="block text-sm">Volume général</b><small className="text-muted-foreground">Effets et musique</small></span></span><span className="font-display text-xs font-bold text-accent">{Math.round(volume * 100)}%</span></div><input aria-label="Volume général" type="range" min="0" max="1" step="0.05" value={volume} onChange={(e) => changeVolume(Number(e.target.value))} className="mt-4 w-full accent-[hsl(var(--primary))]" /><p className="mt-2 text-[10px] text-muted-foreground">Le volume démarre au maximum. Tu peux le réduire ici.</p></div>
      <button onClick={toggleMusic} className="tap flex w-full items-center justify-between rounded-2xl bg-surface-2 p-4 text-left transition-transform duration-200 hover:-translate-y-0.5"><span className="flex items-center gap-3"><Music2 className="size-5 text-accent" /><span><b className="block text-sm">Ambiance musicale</b><small className="text-muted-foreground">Une musique discrète pendant le jeu</small></span></span><span className={`h-6 w-11 rounded-full p-1 transition ${music ? "bg-primary" : "bg-muted"}`}><span className={`block size-4 rounded-full bg-white transition ${music ? "translate-x-5" : ""}`} /></span></button>
    </div></Panel>
    <Panel className="p-5"><SectionTitle title="Chronomètre" /><div className="rounded-2xl bg-surface-2 p-4"><div className="flex items-center justify-between gap-3"><span className="flex items-center gap-3"><Timer className="size-5 text-accent" /><span><b className="block text-sm">Temps par question</b><small className="text-muted-foreground">Utilisé par les modes qui possèdent un chrono</small></span></span><span className="font-display text-sm font-bold text-accent">{timerDuration}s</span></div><input aria-label="Temps par question" type="range" min="5" max="60" step="1" value={timerDuration} onChange={(e) => changeTimer(Number(e.target.value))} className="mt-4 w-full accent-[hsl(var(--primary))]" /><div className="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>5 s</span><span>Par défaut : 10 s</span><span>60 s</span></div></div></Panel>
    <Panel className="p-5"><SectionTitle title="Déroulement" /><div className="rounded-2xl bg-surface-2 p-4"><div className="flex items-center justify-between gap-3"><span><b className="block text-sm">Temps après une réponse</b><small className="text-muted-foreground">Avant de passer automatiquement à la question suivante</small></span><span className="font-display text-sm font-bold text-accent">{delay}s</span></div><input aria-label="Temps après une réponse" type="range" min="1" max="10" step="1" value={delay} onChange={(e) => changeDelay(Number(e.target.value))} className="mt-4 w-full accent-[hsl(var(--primary))]" /><div className="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>1 s</span><span>Par défaut : 3 s</span><span>10 s</span></div></div></Panel>
    <Panel className="p-5"><SectionTitle title="Données locales" /><p className="text-sm text-muted-foreground">Ta progression actuelle est enregistrée localement sur cet appareil.</p>{confirm ? <div className="mt-4 rounded-2xl border border-destructive/40 bg-destructive/10 p-4"><p className="text-sm font-semibold">Réinitialiser toute la progression ?</p><div className="mt-3 flex gap-2"><button onClick={() => { resetProgress(); setConfirm(false); }} className="tap rounded-xl bg-destructive px-4 py-2 text-sm font-bold text-white">Confirmer</button><button onClick={() => setConfirm(false)} className="tap rounded-xl bg-muted px-4 py-2 text-sm font-semibold">Annuler</button></div></div> : <GhostButton onClick={() => setConfirm(true)} className="mt-4 text-destructive"><RotateCcw className="mr-2 inline size-4" /> Réinitialiser la progression</GhostButton>}</Panel>
  </div></AppShell>;
}
