import type { Question } from "./quiz-data";

type Level = "7e AF" | "8e AF" | "9e AF" | "Seconde" | "Rhéto" | "Philo";
type Difficulty = "Facile" | "Moyen" | "Difficile";
type TaggedQuestion = Question & { level: Level; difficulty: Difficulty };

const q = (id: string, subject: TaggedQuestion["subject"], level: Level, difficulty: Difficulty, prompt: string, answers: string[], correctIndex: number, explanation: string, category?: string): TaggedQuestion => ({ id, subject, level, difficulty, prompt, answers, correctIndex, explanation, category });

export const EXTRA_QUESTIONS_2: TaggedQuestion[] = [
  q("m18", "maths", "7e AF", "Facile", "Quel nombre vient après 399 ?", ["398", "400", "401", "410"], 1, "Après 399 vient 400."),
  q("m19", "maths", "8e AF", "Moyen", "Quel est le résultat de 144 ÷ 12 ?", ["10", "11", "12", "14"], 2, "144 ÷ 12 = 12."),
  q("m20", "maths", "9e AF", "Moyen", "Quel est le carré de 15 ?", ["30", "125", "225", "250"], 2, "15² = 225."),
  q("m21", "maths", "Rhéto", "Difficile", "Quelle est la solution positive de x² = 49 ?", ["5", "6", "7", "8"], 2, "La solution positive est 7."),
  q("m22", "maths", "Philo", "Difficile", "Quelle est la dérivée de 3x + 5 ?", ["3", "5", "3x", "8"], 0, "La dérivée de 3x + 5 est 3."),

  q("f17", "francais", "7e AF", "Facile", "Quel mot est un verbe ?", ["Chanter", "Maison", "Bleu", "Rapidement"], 0, "« Chanter » est un verbe à l'infinitif."),
  q("f18", "francais", "8e AF", "Moyen", "Quel est le pluriel de « journal » ?", ["Journals", "Journaux", "Journalx", "Journales"], 1, "Le pluriel de journal est journaux."),
  q("f19", "francais", "9e AF", "Moyen", "Quel mot est un pronom personnel ?", ["Nous", "Très", "Maison", "Grand"], 0, "« Nous » est un pronom personnel."),
  q("f20", "francais", "Rhéto", "Difficile", "Qui a écrit « L'Étranger » ?", ["Albert Camus", "Victor Hugo", "Aimé Césaire", "Molière"], 0, "Albert Camus est l'auteur de L'Étranger."),
  q("f21", "francais", "Philo", "Difficile", "Quelle figure oppose deux idées pour créer un contraste ?", ["Antithèse", "Hyperbole", "Comparaison", "Allitération"], 0, "L'antithèse rapproche des idées fortement opposées."),

  q("p16", "physique", "7e AF", "Facile", "Quel objet peut attirer de petits morceaux de fer ?", ["Aimant", "Miroir", "Thermomètre", "Loupe"], 0, "Un aimant exerce une force magnétique sur certains métaux."),
  q("p17", "physique", "8e AF", "Moyen", "Quelle unité mesure la masse ?", ["Kilogramme", "Newton", "Watt", "Volt"], 0, "Le kilogramme est l'unité SI de masse."),
  q("p18", "physique", "9e AF", "Moyen", "Quel phénomène dévie la lumière lorsqu'elle passe d'un milieu à un autre ?", ["Réfraction", "Combustion", "Fusion", "Conduction"], 0, "La réfraction est la déviation de la lumière lors d'un changement de milieu."),
  q("p19", "physique", "Rhéto", "Difficile", "Quelle unité correspond à une énergie ?", ["Joule", "Watt", "Ampère", "Ohm"], 0, "Le joule est l'unité SI de l'énergie."),
  q("p20", "physique", "Philo", "Difficile", "Que devient la fréquence d'une onde si sa période diminue ?", ["Elle diminue", "Elle augmente", "Elle reste toujours nulle", "Elle disparaît"], 1, "La fréquence est l'inverse de la période."),

  q("s16", "sciences", "7e AF", "Facile", "Quelle planète est la plus proche du Soleil ?", ["Vénus", "Mars", "Mercure", "Jupiter"], 2, "Mercure est la planète la plus proche du Soleil."),
  q("s17", "sciences", "8e AF", "Moyen", "Quel nutriment fournit principalement de l'énergie rapide ?", ["Glucides", "Eau", "Vitamines", "Minéraux"], 0, "Les glucides sont une source importante d'énergie pour l'organisme."),
  q("s18", "sciences", "9e AF", "Moyen", "Quel système protège le corps contre de nombreux agents infectieux ?", ["Système immunitaire", "Système osseux", "Système digestif", "Système excréteur"], 0, "Le système immunitaire participe à la défense de l'organisme."),
  q("s19", "sciences", "Rhéto", "Difficile", "Quelle unité fondamentale mesure la quantité de matière ?", ["Mole", "Gramme", "Litre", "Newton"], 0, "La mole est l'unité SI de quantité de matière."),
  q("s20", "sciences", "Philo", "Difficile", "Quel phénomène décrit le passage d'une espèce de génération en génération avec des changements héréditaires ?", ["Évolution", "Évaporation", "Érosion", "Combustion"], 0, "L'évolution correspond aux changements héréditaires des populations au fil des générations."),

  q("k16", "creole", "7e AF", "Facile", "Ki sa « solèy » vle di an franse ?", ["Soleil", "Lune", "Pluie", "Vent"], 0, "« Solèy » vle di soleil."),
  q("k17", "creole", "8e AF", "Moyen", "Ki sa « fanmi » vle di ?", ["Famille", "Ami", "Femme", "Enfant"], 0, "« Fanmi » vle di famille."),
  q("k18", "creole", "9e AF", "Moyen", "Ki mo ki vle di « aujourd'hui » ?", ["Demen", "Jodi a", "Yè", "Lè sa a"], 1, "« Jodi a » vle di aujourd'hui."),
  q("k19", "creole", "Rhéto", "Difficile", "Ki non yo bay kreyòl ayisyen kòm lang nan Konstitisyon 1987 la ?", ["Lang ofisyèl", "Lang etranje", "Lang ansyen", "Lang sekrè"], 0, "Konstitisyon 1987 la rekonèt kreyòl kòm youn nan lang ofisyèl peyi a."),
  q("k20", "creole", "Philo", "Difficile", "Ki sa pwovèb « Piti piti zwazo fè nich li » mete aksan sou ?", ["Pasyans ak pwogrè", "Vitès", "Chans sèlman", "Konpetisyon"], 0, "Pwovèb la ankouraje konstwi bagay yo piti piti avèk pasyans."),

  q("h16", "histoire", "7e AF", "Facile", "Ki non premye jou ane a nan istwa endepandans Ayiti ?", ["1 janvye", "18 me", "18 novanm", "17 oktòb"], 0, "1 janvye 1804 se dat pwoklamasyon endepandans Ayiti.", "Histoire"),
  q("h17", "histoire", "8e AF", "Moyen", "Ki moun yo rele souvan « Papa nasyon an » nan premye peryòd endepandans lan ?", ["Jean-Jacques Dessalines", "Toussaint Louverture", "Alexandre Pétion", "Boukman"], 0, "Dessalines dirigea la proclamation de l'indépendance et devint le premier chef d'État de l'Haïti indépendante.", "Personnalités"),
  q("h18", "histoire", "9e AF", "Moyen", "Ki gwo chèn mòn ki travèse anpil zòn Ayiti ?", ["Cordillère Centrale", "Chaîne des Andes", "Himalaya", "Alpes"], 0, "La Cordillère Centrale se prolonge dans la région centrale de l'île.", "Géographie"),
  q("h19", "histoire", "Rhéto", "Difficile", "Ki ane batay Vertières la te fèt ?", ["1791", "1802", "1803", "1804"], 2, "La bataille de Vertières a eu lieu le 18 novembre 1803.", "Histoire"),
  q("h20", "histoire", "Philo", "Difficile", "Ki òganizasyon entènasyonal ki rekonèt Parc national historique Citadelle-Sans-Souci kòm patrimwàn mondyal ?", ["UNESCO", "FIFA", "OMS", "OEA"], 0, "UNESCO a inscrit le Parc national historique sur la Liste du patrimoine mondial.", "Patrimoine"),
];
