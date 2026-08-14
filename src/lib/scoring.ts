/** Logique de score, de combo et de bonus — indépendante de l'UI. */

export const BASE_POINTS = 100;

export function comboMultiplier(combo: number) {
  if (combo >= 5) return 2;
  if (combo >= 3) return 1.5;
  if (combo >= 2) return 1.25;
  return 1;
}

export function timeBonus(secondsLeft: number | null, totalSeconds: number | null) {
  if (secondsLeft === null || !totalSeconds) return 0;
  return Math.round((secondsLeft / totalSeconds) * 50);
}

export function pointsForAnswer(combo: number, secondsLeft: number | null, total: number | null) {
  const base = BASE_POINTS + timeBonus(secondsLeft, total);
  return Math.round(base * comboMultiplier(combo));
}

export function comboTier(combo: number): "none" | "hot" | "fire" | "blaze" {
  if (combo >= 5) return "blaze";
  if (combo >= 3) return "fire";
  if (combo >= 2) return "hot";
  return "none";
}
