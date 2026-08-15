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
  { id: "entrainement", name: "Entraînement", tagline: "Apprends sans pression", description: "Pas de chrono. Explications après chaque réponse.", icon: "brain", accent: "primary", timePerQuestion: null, xpMultiplier: 1 },
  { id: "chrono", name: "Chrono", tagline: "Contre la montre", description: "Temps réglable par question. Rapidité = points bonus.", icon: "timer", accent: "success", timePerQuestion: 10, xpMultiplier: 1.5 },
  { id: "examen", name: "Examen", tagline: "Simule les vrais examens", description: "Format sérieux, temps réglable, résultat détaillé.", icon: "graduation", accent: "violet", timePerQuestion: 10, xpMultiplier: 1.3 },
  { id: "aleatoire", name: "Défi aléatoire", tagline: "Un quiz surprise t'attend", description: "Le système choisit matière, niveau et difficulté, avec temps réglable.", icon: "dice", accent: "warning", timePerQuestion: 10, xpMultiplier: 1.7 },
  { id: "haiti", name: "Haïti Quest", tagline: "Explore ton pays", description: "Histoire, géographie, culture et patrimoine d'Haïti, avec temps réglable.", icon: "flag", accent: "haiti", timePerQuestion: 10, xpMultiplier: 1.6 },
];

export type SubjectId = "maths" | "francais" | "physique" | "histoire" | "sciences" | "creole";
export type Subject = { id: SubjectId; name: string; players: number; icon: string };
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

export type Question = {
  id: string;
  subject: SubjectId | "haiti";
  category?: string;
  prompt: string;
  answers: string[];
  correctIndex: number;
  explanation: string;
};

export const QUESTIONS: Question[] = [
  { id: "m1", subject: "maths", prompt: "Quelle est la valeur de x dans l'équation 2x + 5 = 17 ?", answers: ["x = 6", "x = 11", "x = 7", "x = 12"], correctIndex: 0, explanation: "2x = 17 - 5 = 12, donc x = 6." },
  { id: "m2", subject: "maths", prompt: "Combien font 15 % de 200 ?", answers: ["15", "20", "30", "35"], correctIndex: 2, explanation: "15 % de 200 = 0,15 × 200 = 30." },
  { id: "m3", subject: "maths", prompt: "Quel est le périmètre d'un carré de côté 7 cm ?", answers: ["14 cm", "21 cm", "28 cm", "49 cm"], correctIndex: 2, explanation: "Périmètre = 4 × 7 = 28 cm." },
  { id: "m4", subject: "maths", prompt: "Quelle est la racine carrée de 144 ?", answers: ["11", "12", "13", "14"], correctIndex: 1, explanation: "12 × 12 = 144." },
  { id: "m5", subject: "maths", prompt: "Si un triangle a des angles de 60° et 70°, quel est le troisième ?", answers: ["40°", "50°", "60°", "70°"], correctIndex: 1, explanation: "180 - (60 + 70) = 50°." },
  { id: "f1", subject: "francais", prompt: "Quel est le pluriel de « cheval » ?", answers: ["Chevals", "Chevaux", "Chevales", "Chevaus"], correctIndex: 1, explanation: "Les mots en -al font leur pluriel en -aux." },
  { id: "f2", subject: "francais", prompt: "Dans « Il court vite », quelle est la nature de « vite » ?", answers: ["Adjectif", "Adverbe", "Nom", "Pronom"], correctIndex: 1, explanation: "« Vite » modifie le verbe : c'est un adverbe." },
  { id: "f3", subject: "francais", prompt: "Quel temps : « Nous avions mangé » ?", answers: ["Passé composé", "Plus-que-parfait", "Imparfait", "Futur antérieur"], correctIndex: 1, explanation: "Auxiliaire à l'imparfait + participe passé = plus-que-parfait." },
  { id: "f4", subject: "francais", prompt: "Qui a écrit « Gouverneurs de la rosée » ?", answers: ["Jacques Roumain", "Jacques Stephen Alexis", "René Depestre", "Frankétienne"], correctIndex: 0, explanation: "Jacques Roumain, publié en 1944." },
  { id: "p1", subject: "physique", prompt: "Quelle est l'unité de la force dans le système international ?", answers: ["Joule", "Watt", "Newton", "Pascal"], correctIndex: 2, explanation: "La force se mesure en newtons (N)." },
  { id: "p2", subject: "physique", prompt: "La vitesse de la lumière dans le vide est d'environ :", answers: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "1 500 m/s", "340 m/s"], correctIndex: 0, explanation: "Environ 300 000 km/s." },
  { id: "p3", subject: "physique", prompt: "Quel état de la matière a un volume propre mais pas de forme propre ?", answers: ["Solide", "Liquide", "Gaz", "Plasma"], correctIndex: 1, explanation: "Le liquide prend la forme de son contenant." },
  { id: "s1", subject: "sciences", prompt: "Quel gaz les plantes absorbent-elles pour la photosynthèse ?", answers: ["Oxygène", "Azote", "Dioxyde de carbone", "Hydrogène"], correctIndex: 2, explanation: "Elles absorbent le CO₂ et rejettent de l'oxygène." },
  { id: "s2", subject: "sciences", prompt: "Quel organe pompe le sang dans le corps humain ?", answers: ["Le foie", "Le cœur", "Les poumons", "Les reins"], correctIndex: 1, explanation: "Le cœur est la pompe du système circulatoire." },
  { id: "s3", subject: "sciences", prompt: "Quel est le plus grand risque naturel majeur en Haïti ?", answers: ["Tornades", "Séismes et cyclones", "Éruptions", "Blizzards"], correctIndex: 1, explanation: "Haïti se situe sur des failles actives et sur la route des cyclones." },
  { id: "k1", subject: "creole", prompt: "Ki sa « konesans » vle di an franse ?", answers: ["Courage", "Connaissance", "Confiance", "Conscience"], correctIndex: 1, explanation: "« Konesans » = connaissance." },
  { id: "k2", subject: "creole", prompt: "An ki ane kreyòl vin yon lang ofisyèl an Ayiti ?", answers: ["1964", "1987", "1991", "2004"], correctIndex: 1, explanation: "Konstitisyon 1987 la rekonèt kreyòl kòm lang ofisyèl." },
  { id: "h1", subject: "histoire", category: "Histoire", prompt: "En quelle année Haïti a-t-elle proclamé son indépendance ?", answers: ["1791", "1803", "1804", "1806"], correctIndex: 2, explanation: "Le 1er janvier 1804, aux Gonaïves." },
  { id: "h2", subject: "histoire", category: "Histoire", prompt: "Qui a proclamé l'indépendance d'Haïti ?", answers: ["Toussaint Louverture", "Jean-Jacques Dessalines", "Henri Christophe", "Alexandre Pétion"], correctIndex: 1, explanation: "Jean-Jacques Dessalines, premier chef d'État haïtien." },
  { id: "h3", subject: "histoire", category: "Patrimoine", prompt: "Quel monument haïtien est classé au patrimoine mondial de l'UNESCO ?", answers: ["Le Palais Sans-Souci", "La Citadelle Laferrière", "Le Marché en Fer", "Les deux premiers"], correctIndex: 3, explanation: "Le Parc national historique inclut la Citadelle et Sans-Souci." },
  { id: "h4", subject: "histoire", category: "Géographie", prompt: "Combien de départements compte Haïti ?", answers: ["8", "9", "10", "12"], correctIndex: 2, explanation: "Haïti compte 10 départements." },
  { id: "h5", subject: "histoire", category: "Géographie", prompt: "Quel est le point culminant d'Haïti ?", answers: ["Pic Macaya", "Morne la Selle", "Morne Cabaio", "Chaîne des Matheux"], correctIndex: 1, explanation: "Le Morne la Selle, environ 2 680 m." },
  { id: "h6", subject: "histoire", category: "Culture", prompt: "Quel plat est traditionnellement mangé le 1er janvier en Haïti ?", answers: ["Soup joumou", "Diri kole", "Tchaka", "Legim"], correctIndex: 0, explanation: "La soupe au giraumon, symbole de la liberté." },
  { id: "h7", subject: "histoire", category: "Institutions", prompt: "Quelles sont les couleurs du drapeau haïtien ?", answers: ["Bleu et rouge", "Rouge et noir", "Bleu et blanc", "Vert et rouge"], correctIndex: 0, explanation: "Bleu et rouge, avec les armes de la République." },
  { id: "h8", subject: "histoire", category: "Personnalités", prompt: "Qui est surnommé « le Précurseur » de l'indépendance haïtienne ?", answers: ["Vincent Ogé", "Toussaint Louverture", "Boukman", "Capois-La-Mort"], correctIndex: 1, explanation: "Toussaint Louverture, le Précurseur." },
];

export function questionsFor(subject: SubjectId | "haiti", count: number, category?: string): Question[] {
  let pool = QUESTIONS.filter((q) => subject === "haiti" ? q.subject === "histoire" || q.category !== undefined : q.subject === subject);
  if (category) { const filtered = pool.filter((q) => q.category === category); if (filtered.length >= 3) pool = filtered; }
  if (pool.length < count) pool = [...pool, ...QUESTIONS.filter((q) => !pool.includes(q))];
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j]!, a[i]!]; }
  return a;
}

export type Badge = { id: string; name: string; description: string; icon: string; condition: string };
export const BADGES: Badge[] = [
  { id: "first-win", name: "First Win", description: "Ta première partie terminée", icon: "trophy", condition: "Terminer 1 quiz" },
  { id: "speedster", name: "Speedster", description: "Rapide comme l'éclair", icon: "zap", condition: "Finir un Chrono avec 80 % de réussite" },
  { id: "perfect-run", name: "Perfect Run", description: "Aucune erreur", icon: "target", condition: "100 % de bonnes réponses" },
  { id: "streak-master", name: "Streak Master", description: "Série imbattable", icon: "flame", condition: "Atteindre un combo x5" },
  { id: "haiti-explorer", name: "Haïti Explorer", description: "Explorateur du pays", icon: "flag", condition: "Terminer une zone de Haïti Quest" },
  { id: "scholar", name: "Scholar", description: "Élève assidu", icon: "graduation", condition: "Jouer 10 quiz" },
  { id: "top-100", name: "Top 100", description: "Parmi les meilleurs", icon: "crown", condition: "Atteindre le niveau 10" },
  { id: "night-owl", name: "Night Owl", description: "Réviser tard le soir", icon: "moon", condition: "Jouer après 22 h" },
];

export type LeaderPlayer = { id: string; name: string; xp: number; level: number; school: string; friend: boolean };
export const LEADERBOARD: LeaderPlayer[] = [
  { id: "1", name: "GeniusHaiti", xp: 2450, level: 18, school: "Lycée Pétion", friend: false },
  { id: "2", name: "MathKing", xp: 1980, level: 15, school: "Collège Canapé-Vert", friend: true },
  { id: "3", name: "SmartKid", xp: 1850, level: 14, school: "Lycée Pétion", friend: true },
  { id: "4", name: "QueenQuiz", xp: 1720, level: 13, school: "Sainte-Rose", friend: false },
  { id: "5", name: "LogicLord", xp: 1680, level: 13, school: "Collège Canapé-Vert", friend: false },
  { id: "6", name: "StudyPro", xp: 1500, level: 12, school: "Lycée des Cayes", friend: true },
  { id: "7", name: "BrainGirl", xp: 1420, level: 11, school: "Sainte-Rose", friend: false },
  { id: "8", name: "KreyolAce", xp: 1310, level: 11, school: "Lycée du Cap", friend: true },
  { id: "9", name: "PhysikPro", xp: 1200, level: 10, school: "Lycée des Cayes", friend: false },
  { id: "10", name: "ZoeSavant", xp: 1120, level: 9, school: "Lycée du Cap", friend: false },
];

export const SCHOOLS = [
  { name: "Lycée Pétion", xp: 18450, players: 240 },
  { name: "Collège Canapé-Vert", xp: 16220, players: 198 },
  { name: "Lycée du Cap", xp: 14870, players: 176 },
  { name: "Sainte-Rose de Lima", xp: 12310, players: 154 },
  { name: "Lycée des Cayes", xp: 10990, players: 132 },
];

export type HaitiZone = { id: string; name: string; category: string; x: number; y: number; requiredLevel: number; questions: number };
export const HAITI_ZONES: HaitiZone[] = [
  { id: "nord", name: "Nord — Citadelle", category: "Patrimoine", x: 72, y: 22, requiredLevel: 1, questions: 8 },
  { id: "artibonite", name: "Artibonite — Gonaïves", category: "Histoire", x: 50, y: 34, requiredLevel: 1, questions: 8 },
  { id: "ouest", name: "Ouest — Port-au-Prince", category: "Institutions", x: 58, y: 58, requiredLevel: 1, questions: 10 },
  { id: "sud", name: "Sud — Les Cayes", category: "Géographie", x: 26, y: 74, requiredLevel: 2, questions: 8 },
  { id: "grandanse", name: "Grand'Anse — Jérémie", category: "Personnalités", x: 12, y: 64, requiredLevel: 3, questions: 8 },
  { id: "sudest", name: "Sud-Est — Jacmel", category: "Culture", x: 48, y: 78, requiredLevel: 4, questions: 8 },
  { id: "centre", name: "Centre — Hinche", category: "Sciences & Environnement", x: 70, y: 44, requiredLevel: 5, questions: 8 },
  { id: "nordest", name: "Nord-Est — Fort-Liberté", category: "Surprise", x: 88, y: 28, requiredLevel: 6, questions: 8 },
];

/** Static placeholder used only by the current mock UI until live presence is connected. */
export const ONLINE_PLAYERS = 1247;
