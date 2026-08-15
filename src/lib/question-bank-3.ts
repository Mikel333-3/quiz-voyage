import type { Question } from "./quiz-data";

type Level = "7e AF" | "8e AF" | "9e AF" | "Seconde" | "Rhéto" | "Philo";
type Difficulty = "Facile" | "Moyen" | "Difficile";
type TaggedQuestion = Question & { level: Level; difficulty: Difficulty };

const q = (id: string, subject: TaggedQuestion["subject"], level: Level, difficulty: Difficulty, prompt: string, answers: string[], correctIndex: number, explanation: string, category?: string): TaggedQuestion => ({ id, subject, level, difficulty, prompt, answers, correctIndex, explanation, category });

export const EXTRA_QUESTIONS_3: TaggedQuestion[] = [
  q("m23", "maths", "7e AF", "Facile", "Combien font 9 × 6 ?", ["45", "54", "56", "63"], 1, "9 × 6 = 54."),
  q("m24", "maths", "8e AF", "Moyen", "Quel est le résultat de 2,5 × 4 ?", ["8", "9", "10", "12"], 2, "2,5 × 4 = 10."),
  q("m25", "maths", "9e AF", "Facile", "Quel est le périmètre d'un rectangle de 5 cm sur 3 cm ?", ["8 cm", "15 cm", "16 cm", "30 cm"], 2, "P = 2 × (5 + 3) = 16 cm."),
  q("m26", "maths", "Seconde", "Moyen", "Combien vaut 5² - 3² ?", ["8", "16", "18", "25"], 1, "25 - 9 = 16."),
  q("m27", "maths", "Rhéto", "Difficile", "Quelle est la solution de 2x = 18 ?", ["7", "8", "9", "10"], 2, "x = 18 ÷ 2 = 9."),
  q("m28", "maths", "Philo", "Moyen", "Quelle est la moyenne de 10, 14 et 18 ?", ["12", "13", "14", "15"], 2, "(10 + 14 + 18) ÷ 3 = 14."),
  q("m29", "maths", "8e AF", "Difficile", "Quel est 3/4 de 20 ?", ["12", "15", "16", "18"], 1, "20 × 3/4 = 15."),
  q("m30", "maths", "9e AF", "Moyen", "Un angle droit mesure combien de degrés ?", ["45°", "90°", "120°", "180°"], 1, "Un angle droit mesure 90°."),
  q("m31", "maths", "Rhéto", "Moyen", "Combien vaut 10% de 350 ?", ["25", "30", "35", "40"], 2, "0,10 × 350 = 35."),
  q("m32", "maths", "Philo", "Difficile", "Si 2x + 6 = 20, combien vaut x ?", ["6", "7", "8", "9"], 1, "2x = 14, donc x = 7."),

  q("f22", "francais", "7e AF", "Facile", "Quel est le synonyme de « heureux » ?", ["Triste", "Joyeux", "Lent", "Froid"], 1, "Heureux et joyeux sont des synonymes."),
  q("f23", "francais", "8e AF", "Moyen", "Quel est le féminin de « directeur » ?", ["Directeuse", "Directrice", "Directeure", "Directe"], 1, "Le féminin courant est « directrice »."),
  q("f24", "francais", "9e AF", "Facile", "Quel mot est un nom commun ?", ["Courir", "Rapidement", "Maison", "Grand"], 2, "« Maison » est un nom commun."),
  q("f25", "francais", "Seconde", "Moyen", "Quel temps est « nous finirons » ?", ["Présent", "Imparfait", "Futur simple", "Passé simple"], 2, "« Finirons » est au futur simple."),
  q("f26", "francais", "Rhéto", "Difficile", "Quel auteur a écrit « Le Petit Prince » ?", ["Antoine de Saint-Exupéry", "Jules Verne", "Molière", "Camus"], 0, "Le Petit Prince est une œuvre d'Antoine de Saint-Exupéry."),
  q("f27", "francais", "Philo", "Moyen", "Quelle figure donne des caractéristiques humaines à une chose ?", ["Personnification", "Hyperbole", "Rime", "Gradation"], 0, "La personnification attribue des traits humains à une réalité non humaine."),
  q("f28", "francais", "8e AF", "Facile", "Quel est l'antonyme de « difficile » ?", ["Complexe", "Facile", "Long", "Lourd"], 1, "L'antonyme de difficile est facile."),
  q("f29", "francais", "9e AF", "Moyen", "Dans « Elle chante », quel est le verbe ?", ["Elle", "chante", "la", "aucun"], 1, "« Chante » est le verbe de la phrase."),
  q("f30", "francais", "Rhéto", "Difficile", "Qui a écrit « Candide » ?", ["Voltaire", "Rousseau", "Hugo", "Diderot"], 0, "Voltaire est l'auteur de Candide."),
  q("f31", "francais", "Philo", "Difficile", "Quel mouvement littéraire est associé à Victor Hugo ?", ["Romantisme", "Surréalisme", "Classicisme", "Naturalisme"], 0, "Victor Hugo est une grande figure du romantisme français."),

  q("p21", "physique", "7e AF", "Facile", "Quel instrument mesure la masse ?", ["Balance", "Thermomètre", "Chronomètre", "Baromètre"], 0, "Une balance mesure une masse."),
  q("p22", "physique", "8e AF", "Moyen", "Quelle unité mesure l'intensité électrique ?", ["Ampère", "Volt", "Watt", "Ohm"], 0, "L'intensité du courant se mesure en ampères."),
  q("p23", "physique", "9e AF", "Facile", "Quel phénomène produit un écho ?", ["Réflexion du son", "Fusion", "Évaporation", "Magnétisme"], 0, "Un écho provient de la réflexion des ondes sonores."),
  q("p24", "physique", "Seconde", "Moyen", "Quelle énergie est stockée dans une pile ?", ["Énergie chimique", "Énergie nucléaire", "Énergie lumineuse", "Énergie cinétique"], 0, "Une pile transforme de l'énergie chimique en énergie électrique."),
  q("p25", "physique", "Rhéto", "Difficile", "Quelle est l'unité SI de pression ?", ["Pascal", "Joule", "Newton", "Watt"], 0, "La pression se mesure en pascals."),
  q("p26", "physique", "Philo", "Moyen", "Quelle force attire les objets vers la Terre ?", ["Force magnétique", "Gravitation", "Force électrique", "Frottement"], 1, "La gravitation attire les masses les unes vers les autres."),
  q("p27", "physique", "8e AF", "Facile", "Quelle source fournit directement de la lumière pendant la journée ?", ["Le Soleil", "La Lune", "Un miroir", "Une vitre"], 0, "Le Soleil est une source primaire de lumière."),
  q("p28", "physique", "9e AF", "Moyen", "Que mesure un voltmètre ?", ["La tension", "La masse", "La température", "La distance"], 0, "Le voltmètre mesure la tension électrique."),
  q("p29", "physique", "Rhéto", "Difficile", "Quelle grandeur se conserve dans un circuit électrique en série ?", ["L'intensité", "La résistance de chaque composant", "La tension de chaque composant", "La puissance"], 0, "En série, l'intensité est la même dans tous les composants."),
  q("p30", "physique", "Philo", "Difficile", "Quelle relation définit la puissance électrique ?", ["P = U × I", "P = U/I", "P = I/U", "P = U + I"], 0, "La puissance électrique vaut P = U × I."),

  q("s21", "sciences", "7e AF", "Facile", "Quel animal est un mammifère ?", ["Dauphin", "Grenouille", "Lézard", "Truite"], 0, "Le dauphin est un mammifère."),
  q("s22", "sciences", "8e AF", "Moyen", "Quel organe est principalement associé à la digestion des aliments après l'estomac ?", ["Intestin grêle", "Poumon", "Cœur", "Rein"], 0, "L'intestin grêle joue un rôle majeur dans la digestion et l'absorption."),
  q("s23", "sciences", "9e AF", "Facile", "Quelle planète est surnommée la planète rouge ?", ["Vénus", "Mars", "Mercure", "Saturne"], 1, "Mars paraît rouge à cause notamment des oxydes de fer à sa surface."),
  q("s24", "sciences", "Seconde", "Moyen", "Quel élément chimique a pour symbole O ?", ["Or", "Oxygène", "Osmium", "Ozone"], 1, "O est le symbole chimique de l'oxygène."),
  q("s25", "sciences", "Rhéto", "Difficile", "Quel type de cellule possède généralement un noyau ?", ["Cellule eucaryote", "Virus", "Prion", "Aucune cellule"], 0, "Les cellules eucaryotes possèdent un noyau délimité."),
  q("s26", "sciences", "Philo", "Moyen", "Quel phénomène explique principalement les saisons sur Terre ?", ["L'inclinaison de l'axe terrestre", "La distance à la Lune", "La rotation du Soleil", "Les marées"], 0, "L'inclinaison de l'axe terrestre modifie l'ensoleillement selon les saisons."),
  q("s27", "sciences", "8e AF", "Facile", "Quelle partie de la plante absorbe principalement l'eau du sol ?", ["Racines", "Fleurs", "Fruits", "Feuilles"], 0, "Les racines absorbent l'eau et les sels minéraux du sol."),
  q("s28", "sciences", "9e AF", "Moyen", "Quel organe produit l'insuline ?", ["Pancréas", "Cœur", "Rate", "Poumon"], 0, "Le pancréas produit notamment l'insuline."),
  q("s29", "sciences", "Rhéto", "Difficile", "Quel niveau d'organisation vient après la cellule ?", ["Tissu", "Atome", "Molécule", "Planète"], 0, "Des cellules spécialisées peuvent s'organiser en tissus."),
  q("s30", "sciences", "Philo", "Difficile", "Quelle unité mesure une température thermodynamique dans le SI ?", ["Kelvin", "Celsius", "Fahrenheit", "Joule"], 0, "Le kelvin est l'unité SI de température thermodynamique."),

  q("k21", "creole", "7e AF", "Facile", "Ki sa « liv » vle di an franse ?", ["Livre", "Table", "Chaise", "École"], 0, "« Liv » vle di livre."),
  q("k22", "creole", "8e AF", "Moyen", "Ki sa « dlo » vle di ?", ["Feu", "Eau", "Terre", "Air"], 1, "« Dlo » vle di eau."),
  q("k23", "creole", "9e AF", "Facile", "Ki mo ki vle di « merci » ?", ["Mèsi", "Padon", "Bonjou", "Tanpri"], 0, "« Mèsi » vle di merci."),
  q("k24", "creole", "Seconde", "Moyen", "Ki sa « zanmi » vle di ?", ["Ami", "Frè", "Pwofesè", "Vwazen"], 0, "« Zanmi » vle di ami."),
  q("k25", "creole", "Rhéto", "Difficile", "Ki lang ki se youn nan de lang ofisyèl Ayiti ?", ["Kreyòl", "Espanyòl sèlman", "Angle sèlman", "Pòtigè"], 0, "Kreyòl se youn nan de lang ofisyèl Ayiti, ansanm ak franse."),
  q("k26", "creole", "Philo", "Moyen", "Ki sa « respè » vle di an franse ?", ["Respect", "Repos", "Risque", "Rêve"], 0, "« Respè » vle di respect."),
  q("k27", "creole", "8e AF", "Facile", "Ki sa « solèy » ak « lalin » reprezante ?", ["Soleil et lune", "Mer et montagne", "Jour et école", "Pluie et vent"], 0, "Solèy = soleil, lalin = lune."),
  q("k28", "creole", "9e AF", "Moyen", "Ki mo ki vle di « demain » ?", ["Yè", "Jodi a", "Demen", "Kounye a"], 2, "« Demen » vle di demain."),
  q("k29", "creole", "Rhéto", "Difficile", "Ki sa « libète » vle di ?", ["Liberté", "Justice", "École", "Victoire"], 0, "« Libète » vle di liberté."),
  q("k30", "creole", "Philo", "Difficile", "Ki sa pwovèb « Men anpil, chay pa lou » ankouraje ?", ["Travay ansanm", "Travay pou kont ou", "Kouri vit", "Pa pale"], 0, "Pwovèb la mete aksan sou fòs kolaborasyon."),

  q("h21", "histoire", "7e AF", "Facile", "Quelle ville est connue comme la ville où fut proclamée l'indépendance d'Haïti ?", ["Gonaïves", "Cap-Haïtien", "Jacmel", "Port-de-Paix"], 0, "L'indépendance fut proclamée aux Gonaïves le 1er janvier 1804.", "Histoire"),
  q("h22", "histoire", "8e AF", "Moyen", "Quelle date est célébrée comme la fête du drapeau haïtien ?", ["1er janvier", "18 mai", "17 octobre", "18 novembre"], 1, "Le 18 mai est célébré comme la fête du drapeau haïtien.", "Culture"),
  q("h23", "histoire", "9e AF", "Moyen", "Dans quelle ville se trouve la Citadelle Laferrière ?", ["Milot", "Jacmel", "Jérémie", "Les Cayes"], 0, "La Citadelle se trouve près de Milot, dans le Nord d'Haïti.", "Patrimoine"),
  q("h24", "histoire", "Seconde", "Difficile", "Quel événement est associé au 14 août 1791 ?", ["Cérémonie du Bois Caïman", "Indépendance", "Bataille de Vertières", "Constitution de 1987"], 0, "Le 14 août 1791 est traditionnellement associé à la cérémonie du Bois Caïman.", "Histoire"),
  q("h25", "histoire", "Rhéto", "Moyen", "Quel ancien nom colonial correspond à l'actuelle Haïti occidentale ?", ["Saint-Domingue", "Louisiane", "Nouvelle-France", "Guyane"], 0, "La partie française de l'île était appelée Saint-Domingue.", "Histoire"),
  q("h26", "histoire", "Philo", "Difficile", "Quelle Constitution haïtienne a consacré le créole et le français comme langues officielles ?", ["1987", "1805", "1843", "1915"], 0, "La Constitution haïtienne de 1987 reconnaît les deux langues officielles.", "Institutions"),
  q("h27", "histoire", "8e AF", "Facile", "Quel est le nom du palais royal construit par Henri Christophe ?", ["Sans-Souci", "Versailles", "Louvre", "Trianon"], 0, "Le palais Sans-Souci fut construit sous Henri Christophe.", "Patrimoine"),
  q("h28", "histoire", "9e AF", "Moyen", "Quelle mer borde une grande partie de la côte sud d'Haïti ?", ["Mer des Caraïbes", "Mer du Nord", "Mer Baltique", "Mer Rouge"], 0, "Haïti est située dans la région de la mer des Caraïbes.", "Géographie"),
  q("h29", "histoire", "Rhéto", "Difficile", "Quel personnage dirigea le royaume du Nord après l'indépendance ?", ["Henri Christophe", "Alexandre Pétion", "Jean-Pierre Boyer", "Boukman"], 0, "Henri Christophe dirigea le royaume du Nord et prit le titre de roi Henri Ier.", "Personnalités"),
  q("h30", "histoire", "Philo", "Difficile", "Quel événement militaire du 18 novembre 1803 précéda directement l'indépendance ?", ["Bataille de Vertières", "Bataille de Waterloo", "Bataille de Trafalgar", "Bataille de Yorktown"], 0, "La victoire de Vertières précéda la proclamation de l'indépendance le 1er janvier 1804.", "Histoire"),
];
