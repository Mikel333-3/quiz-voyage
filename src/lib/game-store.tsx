import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { BADGES, GAME_MODES, type GameModeId, type SubjectId } from "./quiz-data";
import { ALL_EXTRA_BADGES } from "./achievements";

const XP_PER_LEVEL = 400;
const STORAGE_KEY = "quiztime:player:v1";

export type PlayerState = { name: string; school: string; avatar: string; bio: string; xp: number; gamesPlayed: number; correctAnswers: number; totalAnswers: number; bestCombo: number; streakDays: number; badges: string[]; zonesCleared: string[] };
export type MatchConfig = { mode: GameModeId; subject: SubjectId | "haiti"; level: string; difficulty: string; questionCount: number; category?: string; zoneId?: string };
export type MatchResult = { config: MatchConfig; score: number; correct: number; total: number; bestCombo: number; xpGained: number; levelBefore: number; levelAfter: number; newBadges: string[] };

const DEFAULT_PLAYER: PlayerState = { name: "BrainMaster", school: "Lycée Pétion", avatar: "🧠", bio: "Je joue pour apprendre.", xp: 850, gamesPlayed: 12, correctAnswers: 94, totalAnswers: 120, bestCombo: 4, streakDays: 12, badges: ["first-win", "scholar"], zonesCleared: [] };
export function levelFromXp(xp: number) { return Math.floor(xp / XP_PER_LEVEL) + 1; }
export function levelProgress(xp: number) { const inLevel = xp % XP_PER_LEVEL; return { inLevel, needed: XP_PER_LEVEL, percent: Math.round((inLevel / XP_PER_LEVEL) * 100) }; }

type Ctx = { player: PlayerState; level: number; successRate: number; config: MatchConfig | null; lastResult: MatchResult | null; setConfig: (c: MatchConfig) => void; clearMatch: () => void; updateProfile: (patch: Pick<PlayerState, "name" | "school" | "avatar" | "bio">) => void; finishMatch: (input: { score: number; correct: number; total: number; bestCombo: number; config: MatchConfig }) => MatchResult; resetProgress: () => void };
const GameContext = createContext<Ctx | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<PlayerState>(DEFAULT_PLAYER); const [config, setConfig] = useState<MatchConfig | null>(null); const [lastResult, setLastResult] = useState<MatchResult | null>(null);
  useEffect(() => { try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) setPlayer({ ...DEFAULT_PLAYER, ...JSON.parse(raw) }); } catch { /* ignore */ } }, []);
  const persist = useCallback((next: PlayerState) => { setPlayer(next); try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ } }, []);
  const updateProfile = useCallback((patch: Pick<PlayerState, "name" | "school" | "avatar" | "bio">) => persist({ ...player, ...patch }), [player, persist]);
  const clearMatch = useCallback(() => setConfig(null), []);
  const resetProgress = useCallback(() => { persist(DEFAULT_PLAYER); setConfig(null); setLastResult(null); }, [persist]);
  const finishMatch: Ctx["finishMatch"] = useCallback(({ score, correct, total, bestCombo, config: cfg }) => {
    const mode = GAME_MODES.find((m) => m.id === cfg.mode)!; const xpGained = Math.round(score * mode.xpMultiplier); const levelBefore = levelFromXp(player.xp); const xp = player.xp + xpGained; const levelAfter = levelFromXp(xp);
    const allBadges = [...BADGES, ...ALL_EXTRA_BADGES]; const earned = new Set(player.badges); const newBadges: string[] = [];
    const add = (id: string) => { if (!earned.has(id) && allBadges.some((b) => b.id === id)) { earned.add(id); newBadges.push(id); } };
    add("first-win"); if (correct === total && total > 0) add("perfect-run"); if (bestCombo >= 5) add("streak-master"); if (bestCombo >= 10) add("combo-10"); if (cfg.mode === "chrono" && correct / Math.max(total, 1) >= 0.8) add("speedster"); if (cfg.mode === "haiti") add("haiti-explorer");
    if (player.gamesPlayed + 1 >= 10) add("scholar"); if (player.gamesPlayed + 1 >= 25) add("marathon"); if (levelAfter >= 10) add("top-100"); if (new Date().getHours() >= 22) add("night-owl");
    const nextZones = cfg.zoneId && !player.zonesCleared.includes(cfg.zoneId) ? [...player.zonesCleared, cfg.zoneId] : player.zonesCleared;
    if (nextZones.length >= 4) add("explorer"); if (nextZones.length >= 8) add("quest-master"); if (earned.size + newBadges.length >= 8) add("collector");
    const next: PlayerState = { ...player, xp, gamesPlayed: player.gamesPlayed + 1, correctAnswers: player.correctAnswers + correct, totalAnswers: player.totalAnswers + total, bestCombo: Math.max(player.bestCombo, bestCombo), badges: [...earned], zonesCleared: nextZones };
    persist(next);
    const result: MatchResult = { config: cfg, score, correct, total, bestCombo, xpGained, levelBefore, levelAfter, newBadges }; setLastResult(result); setConfig(null); return result;
  }, [player, persist]);
  const value = useMemo<Ctx>(() => ({ player, level: levelFromXp(player.xp), successRate: player.totalAnswers ? Math.round((player.correctAnswers / player.totalAnswers) * 100) : 0, config, lastResult, setConfig, clearMatch, updateProfile, finishMatch, resetProgress }), [player, config, lastResult, updateProfile, finishMatch, persist, clearMatch, resetProgress]);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
export function useGame() { const ctx = useContext(GameContext); if (!ctx) throw new Error("useGame must be used inside <GameProvider>"); return ctx; }
