/**
 * Données de démonstration (mock) de QuizTime Go.
 * Cette couche est isolée volontairement : elle pourra être remplacée
 * plus tard par un vrai backend sans toucher à l'UI ni à la logique de jeu.
 */

export type GameModeId = "entrainement" | "chrono" | "examen" | "aleatoire" | "haiti";

export type GameMode = {
  id: GameModeId;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  accent: "primary" | "success" | "violet" | "warning" | "haiti";
  timePerQuestion: number | null;
  xpMultiplier: number;
};

export const GAME_MODES: GameMode[] = [
  {
    id: "entrainement",
    name: "Entraînement",
    tagline: "Apprends sans pression",
    description: "Pas de chrono. Explications après chaque réponse.",
    icon: "brain",
    accent: "primary",
    timePerQuestion: null,
    xpMultiplier: 1,
  },
  {
    id: "chrono",
    name: "Chrono",
    tagline: "Contre la montre",
    description: "Temps réglable par question. Rapidité = points bonus.",
    icon: "timer",
    accent: "success",
    timePerQuestion: 10,
    xpMultiplier: 1.5,
  },
  {
    id: "examen",
    name: "Examen",
    tagline: "Simule les vrais examens",
    description: "Format sérieux, temps réglable, résultat détaillé.",
    icon: "graduation",
    accent: "violet",
    timePerQuestion: 10,
    xpMultiplier: 1.3,
  },
  {
    id: "aleatoire",
    name: "Défi aléatoire",
    tagline: "Un quiz surprise t'attend",
    description: "Le système choisit matière, niveau et difficulté, avec temps réglable.",
    icon: "dice",
    accent: "warning",
    timePerQuestion: 10,
    xpMultiplier: 1.7,
  },
  {
    id: "haiti",
    name: "Haïti Quest",
    tagline: "Explore ton pays",
    description: "Histoire, géographie, culture et patrimoine d'Haïti, avec temps réglable.",
    icon: "flag",
    accent: "haiti",
    timePerQuestion: 10,
    xpMultiplier: 1.6,
  },
];

export type SubjectId =
  | "maths"
  | "francais"
  | "physique"
  | "histoire"
  | "sciences"
  | "creole";

export type Subject = {
  id: SubjectId;
  name: string;
  players: number;
  icon: string;
};

export const SUBJECTS: Subject[] = [
  { id: "maths", name: "Mathématiques", players: 2450, icon: "sigma" },
  { id: "francais", name: "Français", players: 1980, icon: "book" },
  { id: "physique", name: "Physique", players: 1560, icon: "atom" },
  { id: "histoire", name: "Histoire d'Haïti", players: 1320, icon: "landmark" },
  { id: "sciences", name: "Sciences & Nature", players: 980, icon: "leaf" },
  { id: "creole", name: "Kreyòl", players: 870, icon: "message" },
];

export const LEVELS = ["7e AF", "8e AF", "9e AF", "Seconde", "Rhéto", "Philo"] as const;
export const DIFFICULTIES = ["Facile", "Moyen", "Difficile"] as const;
export const QUESTION_COUNTS = [5, 10, 15] as const;
