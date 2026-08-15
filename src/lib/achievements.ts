export type QuizTitle = { id: string; name: string; description: string; condition: string };

export const TITLES: QuizTitle[] = [
  { id: "apprenti", name: "Apprenti Quiz", description: "Tu commences ton aventure.", condition: "Débloqué dès la première partie" },
  { id: "genie-herbe", name: "Génie en herbe", description: "Curieux, rapide et toujours prêt à apprendre.", condition: "Atteindre le niveau 5" },
  { id: "cerveau-foudre", name: "Cerveau éclair", description: "La vitesse devient une arme.", condition: "Obtenir 3 victoires en mode Chrono" },
  { id: "maitre-combo", name: "Maître du combo", description: "Une série qui fait trembler le compteur.", condition: "Atteindre un combo x10" },
  { id: "savant", name: "Savant du Nord", description: "Ton savoir commence à voyager partout.", condition: "Atteindre le niveau 10" },
  { id: "legende", name: "Légende Quiz Time", description: "Le sommet de l'arène.", condition: "Atteindre le niveau 20" },
  { id: "explorateur", name: "Explorateur d'Haïti", description: "Tu connais le pays zone après zone.", condition: "Terminer 4 zones Haïti Quest" },
];

export const EXTRA_BADGES = [
  { id: "combo-10", name: "Combo Titan", description: "Une série spectaculaire.", icon: "flame", condition: "Atteindre un combo x10" },
  { id: "marathon", name: "Marathonien", description: "Tu ne lâches jamais le quiz.", icon: "zap", condition: "Jouer 25 quiz" },
  { id: "collector", name: "Collectionneur", description: "Ta collection commence à briller.", icon: "trophy", condition: "Débloquer 8 badges" },
  { id: "multi-subject", name: "Polyvalent", description: "Maths, langues, sciences... tu touches à tout.", icon: "target", condition: "Réussir un quiz dans 4 matières" },
  { id: "quest-master", name: "Maître de la Quête", description: "Haïti Quest n'a presque plus de secrets.", icon: "flag", condition: "Terminer les 8 zones" },
  { id: "comeback", name: "Comeback", description: "Une mauvaise série ne t'arrête pas.", icon: "crown", condition: "Gagner après une partie sous 50 %" },
];

export const ALL_EXTRA_BADGES = EXTRA_BADGES;

export function titleFor(level: number, bestCombo: number, zones: number, games: number) {
  if (level >= 20) return TITLES.find((t) => t.id === "legende")!;
  if (zones >= 4) return TITLES.find((t) => t.id === "explorateur")!;
  if (level >= 10) return TITLES.find((t) => t.id === "savant")!;
  if (bestCombo >= 10) return TITLES.find((t) => t.id === "maitre-combo")!;
  if (level >= 5) return TITLES.find((t) => t.id === "genie-herbe")!;
  if (games > 0) return TITLES.find((t) => t.id === "apprenti")!;
  return null;
}
