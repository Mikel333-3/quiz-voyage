import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BADGES, GAME_MODES, type GameModeId, type SubjectId } from "./quiz-data";

const XP_PER_LEVEL = 400;
const STORAGE_KEY = "quiztime:player:v1";

export type PlayerState = {
  name: string;
  school: string;
  xp: number;
  gamesPlayed: number;
  correctAnswers: number;
  totalAnswers: number;
  bestCombo: number;
  streakDays: number;
  badges: string[];
  zonesCleared: string[];
};

export type MatchConfig = {
  mode: GameModeId;
  subject: SubjectId | "haiti";
  level: string;
  difficulty: string;
  questionCount: number;
  category?: string;
  zoneId?: string;
};

export type MatchResult = {
  config: MatchConfig;
  score: number;
  correct: number;
  total: number;
  bestCombo: number;
  xpGained: number;
  levelBefore: number;
  levelAfter: number;
  newBadges: string[];
};

const DEFAULT_PLAYER: PlayerState = {
  name: "BrainMaster",
  school: "Lycée Pétion",
  xp: 850,
  gamesPlayed: 12,
  correctAnswers: 94,
  totalAnswers: 120,
  bestCombo: 4,
  streakDays: 12,
  badges: ["first-win", "scholar"],
  zonesCleared: [],
};

export function levelFromXp(xp: number) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}
export function levelProgress(xp: number) {
  const inLevel = xp % XP_PER_LEVEL;
  return { inLevel, needed: XP_PER_LEVEL, percent: Math.round((inLevel / XP_PER_LEVEL) * 100) };
}

type Ctx = {
  player: PlayerState;
  level: number;
  successRate: number;
  config: MatchConfig | null;
  lastResult: MatchResult | null;
  setConfig: (c: MatchConfig) => void;
  finishMatch: (input: {
    score: number;
    correct: number;
    total: number;
    bestCombo: number;
    config: MatchConfig;
  }) => MatchResult;
  resetProgress: () => void;
};

const GameContext = createContext<Ctx | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<PlayerState>(DEFAULT_PLAYER);
  const [config, setConfig] = useState<MatchConfig | null>(null);
  const [lastResult, setLastResult] = useState<MatchResult | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPlayer({ ...DEFAULT_PLAYER, ...JSON.parse(raw) });
    } catch {
      /* ignore corrupted local data */
    }
  }, []);

  const persist = useCallback((next: PlayerState) => {
    setPlayer(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const finishMatch: Ctx["finishMatch"] = useCallback(
    ({ score, correct, total, bestCombo, config: cfg }) => {
      const mode = GAME_MODES.find((m) => m.id === cfg.mode)!;
      const xpGained = Math.round(score * mode.xpMultiplier);
      const levelBefore = levelFromXp(player.xp);
      const xp = player.xp + xpGained;
      const levelAfter = levelFromXp(xp);

      const earned = new Set(player.badges);
      const newBadges: string[] = [];
      const add = (id: string) => {
        if (!earned.has(id) && BADGES.some((b) => b.id === id)) {
          earned.add(id);
          newBadges.push(id);
        }
      };
      add("first-win");
      if (correct === total && total > 0) add("perfect-run");
      if (bestCombo >= 5) add("streak-master");
      if (cfg.mode === "chrono" && correct / Math.max(total, 1) >= 0.8) add("speedster");
      if (cfg.mode === "haiti") add("haiti-explorer");
      if (player.gamesPlayed + 1 >= 10) add("scholar");
      if (levelAfter >= 10) add("top-100");
      if (new Date().getHours() >= 22) add("night-owl");

      const next: PlayerState = {
        ...player,
        xp,
        gamesPlayed: player.gamesPlayed + 1,
        correctAnswers: player.correctAnswers + correct,
        totalAnswers: player.totalAnswers + total,
        bestCombo: Math.max(player.bestCombo, bestCombo),
        badges: [...earned],
        zonesCleared:
          cfg.zoneId && !player.zonesCleared.includes(cfg.zoneId)
            ? [...player.zonesCleared, cfg.zoneId]
            : player.zonesCleared,
      };
      persist(next);

      const result: MatchResult = {
        config: cfg,
        score,
        correct,
        total,
        bestCombo,
        xpGained,
        levelBefore,
        levelAfter,
        newBadges,
      };
      setLastResult(result);
      return result;
    },
    [player, persist],
  );

  const value = useMemo<Ctx>(
    () => ({
      player,
      level: levelFromXp(player.xp),
      successRate: player.totalAnswers
        ? Math.round((player.correctAnswers / player.totalAnswers) * 100)
        : 0,
      config,
      lastResult,
      setConfig,
      finishMatch,
      resetProgress: () => persist(DEFAULT_PLAYER),
    }),
    [player, config, lastResult, finishMatch, persist],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used inside <GameProvider>");
  return ctx;
}
