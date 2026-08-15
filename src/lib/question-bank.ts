import type { Question, Level, Difficulty } from "./quiz-data";

type TaggedQuestion = Question & {
  level: Level;
  difficulty: Difficulty;
};

const q = (
  id: string,
  subject: TaggedQuestion["subject"],
  level: Level,
  difficulty: Difficulty,
  prompt: string,
  answers: string[],
  correctIndex: number,
  explanation: string,
  category?: string,
): TaggedQuestion => ({ id, subject, level, difficulty, prompt, answers, correctIndex, explanation, category });

export const EXTRA_QUESTIONS: TaggedQuestion[] = [
  // Mathématiques
  q("m6", "maths", "7e AF", "Facile", "Combien font 7 × 8 ?", ["54", "56", "58", "64"], 1, "7 × 8 = 56."),
  q("m7", "maths", "7e AF", "Moyen", "Quelle fraction représente la moitié ?", ["1/3", "1/4", "1/2", "2/3"], 2, "La moitié correspond à 1/2."),
  q("m8", "maths", "8e AF", "Facile", "Combien font 3,5 + 2,4 ?", ["5,7", "5,9", "6,1", "6,9"], 1, "3,5 + 2,4 = 5,9."),
  q("m9", "maths", "8e AF", "Moyen", "Quel est le PGCD de 18 et 24 ?", ["3", "4", "6", "8"], 2, "6 est le plus grand diviseur commun."),
  q("m10", "maths", "9e AF", "Facile", "Quel est 25 % de 80 ?", ["15", "20", "25", "30"], 1, "25 % = 1/4, donc 80 ÷ 4 = 20."),
  q("m11", "maths", "9e AF", "Moyen", "Si x + 9 = 21, quelle est la valeur de x ?", ["10", "11", "12", "13"], 2, "x = 21 - 9 = 12."),
  q("m12", "maths", "Seconde", "Moyen", "Quelle est la dérivée de x² ?", ["x", "2x", "x²", "2"], 1, "La dérivée de x² est 2x."),
  q("m13", "maths", "Seconde", "Difficile", "Résous 3x - 4 = 11.", ["3", "4", "5", "6"], 2, "3x = 15, donc x = 5."),
  q("m14", "maths", "Rhéto", "Moyen", "Quelle est la valeur de 2³ × 2² ?", ["16", "24", "32", "64"], 2, "2³ × 2² = 2⁵ = 32."),
  q("m15", "maths", "Rhéto", "Difficile", "Si f(x)=2x+3, que vaut f(4) ?", ["8", "9", "10", "11"], 3, "f(4)=2×4+3=11."),
  q("m16", "maths", "Philo", "Moyen", "Quelle est la probabilité d'obtenir un nombre pair avec un dé équilibré ?", ["1/6", "1/3", "1/2", "2/3"], 2, "Il y a 3 résultats pairs sur 6, donc 1/2."),
  q("m17", "maths", "Philo", "Difficile", "Quelle est la somme des angles intérieurs d'un pentagone ?", ["360°", "540°", "720°", "900°"], 1, "(5 - 2) × 180° = 540°."),

  // Français
  q("f5", "francais", "7e AF", "Facile", "Quel est le contraire de « rapide » ?", ["Lent", "Fort", "Petit", "Vif"], 0, "Le contraire de rapide est lent."),
  q("f6", "francais", "7e AF", "Moyen", "Dans « Les enfants jouent », quel est le sujet ?", ["jouent", "les", "Les enfants", "enfants jouent"], 2, "« Les enfants » réalise l'action."),
  q("f7", "francais", "8e AF", "Facile", "Quel mot est un adjectif ?", ["Maison", "Rapidement", "Magnifique", "Courir"], 2, "« Magnifique » qualifie un nom."),
  q("f8", "francais", "8e AF", "Moyen", "Quel est le féminin de « acteur » ?", ["Acteuse", "Actrice", "Acteure", "Acteureuse"], 1, "Le féminin courant est « actrice »."),
  q("f9", "francais", "9e AF", "Facile", "Quel temps est « je partirai » ?", ["Présent", "Imparfait", "Futur simple", "Conditionnel"], 2, "La terminaison -ai indique ici le futur simple."),
  q("f10", "francais", "9e AF", "Moyen", "Dans « parce que », quelle classe grammaticale forme l'expression ?", ["Conjonction de subordination", "Préposition", "Adjectif", "Pronom"], 0, "« Parce que » introduit une proposition subordonnée."),
  q("f11", "francais", "Seconde", "Moyen", "Quel registre domine dans un texte qui cherche à faire rire ?", ["Comique", "Tragique", "Épique", "Lyrique"], 0, "Le registre comique cherche notamment à provoquer le rire."),
  q("f12", "francais", "Seconde", "Difficile", "Quel procédé consiste à exagérer une idée ?", ["Litote", "Hyperbole", "Euphémisme", "Anaphore"], 1, "L'hyperbole amplifie volontairement une idée."),
  q("f13", "francais", "Rhéto", "Moyen", "Qui est l'auteur de « Les Misérables » ?", ["Victor Hugo", "Émile Zola", "Molière", "Albert Camus"], 0, "Victor Hugo a publié Les Misérables en 1862."),
  q("f14", "francais", "Rhéto", "Difficile", "Une répétition en début de plusieurs phrases est une…", ["Anaphore", "Métaphore", "Ellipse", "Antithèse"], 0, "L'anaphore répète un mot ou groupe de mots en tête de phrase."),
  q("f15", "francais", "Philo", "Moyen", "Quel genre argumentatif défend une thèse avec des raisons ?", ["Le débat argumenté", "Le récit", "La description", "Le portrait"], 0, "L'argumentation organise des raisons pour défendre une position."),
  q("f16", "francais", "Philo", "Difficile", "Quelle figure rapproche deux éléments avec « comme » ?", ["Métaphore", "Comparaison", "Personnification", "Métonymie"], 1, "La comparaison établit explicitement un rapprochement, souvent avec « comme »."),

  // Physique
  q("p4", "physique", "7e AF", "Facile", "Quel instrument mesure la température ?", ["Baromètre", "Thermomètre", "Voltmètre", "Balance"], 1, "Le thermomètre mesure la température."),
  q("p5", "physique", "7e AF", "Moyen", "Quelle unité mesure une durée ?", ["Seconde", "Newton", "Volt", "Pascal"], 0, "La seconde est l'unité SI du temps."),
  q("p6", "physique", "8e AF", "Facile", "Quel état de la matière occupe tout le volume disponible ?", ["Solide", "Liquide", "Gaz", "Cristal"], 2, "Un gaz se répartit dans tout le volume disponible."),
  q("p7", "physique", "8e AF", "Moyen", "Quelle grandeur se mesure en volts ?", ["Intensité", "Tension électrique", "Masse", "Force"], 1, "La tension électrique se mesure en volts."),
  q("p8", "physique", "9e AF", "Facile", "Quelle formule donne la vitesse moyenne ?", ["v=d/t", "v=t/d", "v=d×t", "v=d+t"], 0, "La vitesse moyenne est la distance divisée par le temps."),
  q("p9", "physique", "9e AF", "Moyen", "Quelle énergie possède un objet en mouvement ?", ["Chimique", "Cinétique", "Nucléaire", "Sonore"], 1, "L'énergie liée au mouvement est l'énergie cinétique."),
  q("p10", "physique", "Seconde", "Moyen", "Quelle est l'unité de puissance ?", ["Watt", "Joule", "Newton", "Coulomb"], 0, "La puissance se mesure en watts."),
  q("p11", "physique", "Seconde", "Difficile", "Selon la deuxième loi de Newton, la force résultante vaut…", ["m/a", "m×a", "m+a", "a/m"], 1, "F = m × a."),
  q("p12", "physique", "Rhéto", "Moyen", "Dans un circuit en série, l'intensité est…", ["La même partout", "Nulle partout", "Toujours différente", "Égale à la tension"], 0, "En série, le même courant traverse successivement les composants."),
  q("p13", "physique", "Rhéto", "Difficile", "Quelle relation relie tension, résistance et intensité ?", ["U=RI", "U=R/I", "U=I/R", "R=UI"], 0, "La loi d'Ohm est U = R × I."),
  q("p14", "physique", "Philo", "Moyen", "Quelle particule porte une charge électrique négative ?", ["Proton", "Neutron", "Électron", "Photon"], 2, "L'électron porte une charge négative."),
  q("p15", "physique", "Philo", "Difficile", "Quelle grandeur reste constante lors d'une transformation d'énergie idéale ?", ["L'énergie totale", "La vitesse", "La température", "La puissance"], 0, "Dans un système idéal isolé, l'énergie totale se conserve."),

  // Sciences & Nature
  q("s4", "sciences", "7e AF", "Facile", "Quel organe permet principalement de respirer ?", ["Poumons", "Estomac", "Foie", "Cerveau"], 0, "Les poumons assurent les échanges gazeux respiratoires."),
  q("s5", "sciences", "7e AF", "Moyen", "Quel est le satellite naturel de la Terre ?", ["Mars", "La Lune", "Le Soleil", "Vénus"], 1, "La Lune est le satellite naturel de la Terre."),
  q("s6", "sciences", "8e AF", "Facile", "Quel sens utilise principalement les yeux ?", ["L'ouïe", "La vue", "Le goût", "Le toucher"], 1, "Les yeux sont les organes de la vue."),
  q("s7", "sciences", "8e AF", "Moyen", "Quel phénomène transforme l'eau liquide en vapeur ?", ["Fusion", "Évaporation", "Condensation", "Solidification"], 1, "L'évaporation transforme un liquide en gaz."),
  q("s8", "sciences", "9e AF", "Facile", "Quel organe filtre principalement le sang pour former l'urine ?", ["Cœur", "Rein", "Poumon", "Pancréas"], 1, "Les reins filtrent le sang et participent à la formation de l'urine."),
  q("s9", "sciences", "9e AF", "Moyen", "Quel est le rôle principal des globules rouges ?", ["Défendre contre les microbes", "Transporter l'oxygène", "Digérer les aliments", "Produire des hormones"], 1, "L'hémoglobine des globules rouges transporte notamment l'oxygène."),
  q("s10", "sciences", "Seconde", "Moyen", "Quelle molécule porte l'information génétique ?", ["ADN", "ATP", "Eau", "Glucose"], 0, "L'ADN contient l'information génétique des cellules."),
  q("s11", "sciences", "Seconde", "Difficile", "Quel organite est le principal siège de la respiration cellulaire ?", ["Noyau", "Mitochondrie", "Ribosome", "Vacuole"], 1, "Les mitochondries produisent une grande partie de l'ATP cellulaire."),
  q("s12", "sciences", "Rhéto", "Moyen", "Quel processus produit du glucose chez les plantes grâce à la lumière ?", ["Respiration", "Photosynthèse", "Fermentation", "Digestion"], 1, "La photosynthèse utilise l'énergie lumineuse pour fabriquer des sucres."),
  q("s13", "sciences", "Rhéto", "Difficile", "Quel niveau de biodiversité concerne la variété des espèces ?", ["Diversité génétique", "Diversité spécifique", "Diversité minérale", "Diversité climatique"], 1, "La diversité spécifique correspond à la variété des espèces."),
  q("s14", "sciences", "Philo", "Moyen", "Quel gaz est majoritaire dans l'atmosphère terrestre ?", ["Oxygène", "Azote", "CO₂", "Hydrogène"], 1, "L'azote représente environ 78 % de l'atmosphère."),
  q("s15", "sciences", "Philo", "Difficile", "Quel principe explique qu'une population évolue lorsque certaines variations favorisent la survie et la reproduction ?", ["Sélection naturelle", "Évaporation", "Photosynthèse", "Gravitation"], 0, "La sélection naturelle favorise certaines variations héréditaires au fil des générations."),

  // Kreyòl
  q("k3", "creole", "7e AF", "Facile", "Ki sa « lekòl » vle di an franse ?", ["École", "Maison", "Rue", "Livre"], 0, "« Lekòl » vle di école."),
  q("k4", "creole", "7e AF", "Moyen", "Ki mo ki vle di « bonjour » ?", ["Mèsi", "Bonjou", "Bonswa", "Padon"], 1, "« Bonjou » se fason nou salye yon moun nan jounen an."),
  q("k5", "creole", "8e AF", "Facile", "Ki sa « dlo » vle di ?", ["Dlo", "Fe", "Eau", "Solèy"], 2, "« Dlo » vle di eau."),
  q("k6", "creole", "8e AF", "Moyen", "Ki mo ki vle di « merci » ?", ["Tanpri", "Mèsi", "Padon", "Wi"], 1, "« Mèsi » vle di merci."),
  q("k7", "creole", "9e AF", "Facile", "Ki jan ou di « maison » an kreyòl ?", ["Kay", "Kè", "Kou", "Krey"], 0, "« Kay » vle di maison."),
  q("k8", "creole", "9e AF", "Moyen", "Ki mo ki vle di « demain » ?", ["Yè", "Jodi a", "Demen", "Kounye a"], 2, "« Demen » vle di demain."),
  q("k9", "creole", "Seconde", "Moyen", "Nan fraz « Timoun yo ap jwe », ki moun k ap fè aksyon an ?", ["Timoun yo", "Jwe", "Ap", "Yo"], 0, "« Timoun yo » se sijè fraz la."),
  q("k10", "creole", "Seconde", "Difficile", "Ki kalite mo « bèl » ye nan « yon bèl kay » ?", ["Vèb", "Adjektif", "Non", "Konjonksyon"], 1, "« Bèl » dekri non « kay », se yon adjektif."),
  q("k11", "creole", "Rhéto", "Moyen", "Ki ane Konstitisyon Ayiti te rekonèt kreyòl kòm lang ofisyèl ?", ["1804", "1915", "1987", "2010"], 2, "Konstitisyon 1987 la rekonèt kreyòl ak franse kòm lang ofisyèl."),
  q("k12", "creole", "Rhéto", "Difficile", "Ki ekriven ki te ekri « Gouverneurs de la rosée » ?", ["Jacques Roumain", "Dany Laferrière", "Frankétienne", "René Depestre"], 0, "Jacques Roumain se otè roman an."),
  q("k13", "creole", "Philo", "Moyen", "Ki sa « libète » vle di ?", ["Liberté", "Justice", "Force", "Mémoire"], 0, "« Libète » vle di liberté."),
  q("k14", "creole", "Philo", "Difficile", "Nan lang kreyòl ayisyen, ki wòl « pa » souvan jwe nan fraz negatif ?", ["Li make negasyon", "Li make tan pase", "Li se yon non", "Li make kesyon"], 0, "« Pa » se youn nan mak prensipal negasyon an."),
  q("k15", "creole", "Philo", "Difficile", "Ki sa pwovèb « Men anpil, chay pa lou » ankouraje ?", ["Travay ansanm", "Travay pou kont ou", "Vitès", "Silans"], 0, "Pwovèb la mete aksan sou fòs kolaborasyon."),

  // Histoire d'Haïti
  q("h9", "histoire", "7e AF", "Facile", "Ki vil yo rele « Vil Endepandans lan » ?", ["Okap", "Gonaïves", "Jakmèl", "Pòtoprens"], 1, "Se nan Gonaïves endepandans lan te pwoklame an 1804.", "Histoire"),
  q("h10", "histoire", "7e AF", "Moyen", "Ki jou Ayiti selebre fèt drapo li ?", ["1 janvye", "18 me", "17 oktòb", "20 me"], 1, "18 me se fèt drapo ak inite nasyonal.", "Culture"),
  q("h11", "histoire", "8e AF", "Facile", "Ki non ansyen koloni franse a te genyen anvan endepandans Ayiti ?", ["Saint-Domingue", "Louisiane", "Martinique", "Guadeloupe"], 0, "Pati lwès zile a te rele Saint-Domingue anba dominasyon franse.", "Histoire"),
  q("h12", "histoire", "8e AF", "Moyen", "Ki batay ki te make viktwa final lame endijèn lan an 1803 ?", ["Vertières", "Crête-à-Pierrot", "Ravine-à-Couleuvres", "Savane-à-Roche"], 0, "Batay Vertières la te fèt 18 novanm 1803.", "Histoire"),
  q("h13", "histoire", "9e AF", "Facile", "Ki vil ki se kapital Ayiti ?", ["Okap", "Pòtoprens", "Gonaïves", "Jakmèl"], 1, "Pòtoprens se kapital Repiblik Ayiti.", "Géographie"),
  q("h14", "histoire", "9e AF", "Moyen", "Ki non fò a ki domine Okap depi mòn lan ?", ["Citadelle Laferrière", "Fort Jacques", "Fort Liberté", "Fort Dimanche"], 0, "Citadelle Laferrière domine la région du Nord.", "Patrimoine"),
  q("h15", "histoire", "Seconde", "Moyen", "Ki moun ki te dirije konstriksyon Citadelle Laferrière ?", ["Henri Christophe", "Alexandre Pétion", "Boukman", "Vincent Ogé"], 0, "Henri Christophe fit construire la Citadelle au début du XIXe siècle.", "Patrimoine"),
];
