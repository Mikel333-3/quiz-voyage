export const QUIZ_LEVELS = ["7e AF", "8e AF", "9e AF", "Seconde", "Rhéto", "Philo"] as const;
export type Level = (typeof QUIZ_LEVELS)[number];

export const QUIZ_DIFFICULTIES = ["Facile", "Moyen", "Difficile"] as const;
export type Difficulty = (typeof QUIZ_DIFFICULTIES)[number];
