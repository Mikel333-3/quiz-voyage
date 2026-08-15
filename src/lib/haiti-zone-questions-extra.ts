import type { Question } from "./quiz-data";
export const HAITI_ZONE_QUESTIONS_EXTRA: Array<Question & { zoneId: string }> = [
  { id: "zne6", zoneId: "nordest", subject: "haiti", category: "Patrimoine", prompt: "Quel site historique se trouve dans la région de Fort-Liberté ?", answers: ["Fort Liberté", "Citadelle Laferrière", "Palais Sans-Souci", "Fort Jacques"], correctIndex: 0, explanation: "Le fort de Fort-Liberté fait partie du patrimoine historique de la zone." },
];
