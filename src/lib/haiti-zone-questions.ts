import type { Question } from "./quiz-data";

type ZoneQuestion = Question & { zoneId: string };
const q = (id: string, zoneId: string, category: string, prompt: string, answers: string[], correctIndex: number, explanation: string): ZoneQuestion => ({ id, zoneId, subject: "haiti", category, prompt, answers, correctIndex, explanation });

export const HAITI_ZONE_QUESTIONS: ZoneQuestion[] = [
  q("zn1", "nord", "Patrimoine", "Dans quel département se trouve la Citadelle Laferrière ?", ["Nord", "Sud", "Ouest", "Centre"], 0, "La Citadelle se trouve près de Milot, dans le département du Nord."),
  q("zn2", "nord", "Patrimoine", "Quelle construction historique se trouve à Milot ?", ["Sans-Souci", "Palais national", "Fort Jacques", "Bassin Bleu"], 0, "Le Palais Sans-Souci se trouve à Milot, au pied de la Citadelle."),
  q("zn3", "nord", "Histoire", "Quel dirigeant est associé à la construction de la Citadelle ?", ["Henri Christophe", "Alexandre Pétion", "Dutty Boukman", "Vincent Ogé"], 0, "Henri Christophe fit construire la Citadelle au début du XIXe siècle."),
  q("zn4", "nord", "Géographie", "Quelle ville est proche de la Citadelle Laferrière ?", ["Milot", "Jacmel", "Jérémie", "Hinche"], 0, "La Citadelle domine la zone de Milot."),
  q("zn5", "nord", "Culture", "Quel site historique avec la Citadelle est lié au Parc national historique ?", ["Sans-Souci", "Labadee", "Saut-Mathurine", "Fort Jacques"], 0, "Le Parc national historique comprend notamment la Citadelle et Sans-Souci."),

  q("za1", "artibonite", "Histoire", "Dans quelle ville l'indépendance d'Haïti fut-elle proclamée le 1er janvier 1804 ?", ["Gonaïves", "Cap-Haïtien", "Port-au-Prince", "Jacmel"], 0, "Jean-Jacques Dessalines proclama l'indépendance aux Gonaïves."),
  q("za2", "artibonite", "Histoire", "Quel acte historique est directement associé aux Gonaïves en 1804 ?", ["La proclamation de l'indépendance", "La création de la Citadelle", "La bataille de Vertières", "La fondation de Pétion-Ville"], 0, "Les Gonaïves sont le lieu de la proclamation de l'indépendance."),
  q("za3", "artibonite", "Géographie", "Quel grand fleuve donne son nom au département de l'Artibonite ?", ["Artibonite", "Grise", "Grande-Anse", "Libon"], 0, "Le fleuve Artibonite traverse le département et porte son nom."),
  q("za4", "artibonite", "Agriculture", "Quelle activité agricole est importante dans la vallée de l'Artibonite ?", ["Riziculture", "Café uniquement", "Cacao uniquement", "Culture du coton uniquement"], 0, "La vallée de l'Artibonite est particulièrement connue pour la production de riz."),
  q("za5", "artibonite", "Histoire", "Quel chef de la Révolution haïtienne est lié à la région de l'Artibonite ?", ["Toussaint Louverture", "Alexandre Pétion", "Faustin Soulouque", "Dumarsais Estimé"], 0, "Toussaint Louverture mena des opérations majeures dans cette région pendant la Révolution."),

  q("zo1", "ouest", "Institutions", "Quelle est la capitale d'Haïti ?", ["Port-au-Prince", "Cap-Haïtien", "Les Cayes", "Gonaïves"], 0, "Port-au-Prince est la capitale et se trouve dans l'Ouest."),
  q("zo2", "ouest", "Géographie", "Quel golfe borde Port-au-Prince ?", ["Golfe de la Gonâve", "Golfe du Mexique", "Golfe du Honduras", "Golfe de Panama"], 0, "Port-au-Prince se trouve au bord du golfe de la Gonâve."),
  q("zo3", "ouest", "Institutions", "Quel palais est la résidence officielle du président d'Haïti ?", ["Palais national", "Palais Sans-Souci", "Palais de Justice de Jacmel", "Fort Jacques"], 0, "Le Palais national se trouve à Port-au-Prince."),
  q("zo4", "ouest", "Culture", "Quel grand musée consacré à l'histoire haïtienne se trouve à Port-au-Prince ?", ["MUPANAH", "Musée du Louvre", "Musée Ogier-Fombrun", "Musée du Quai Branly"], 0, "Le MUPANAH présente une importante collection sur l'histoire et le patrimoine haïtiens."),
  q("zo5", "ouest", "Géographie", "Quelle grande île se trouve au large de l'Ouest d'Haïti ?", ["La Gonâve", "La Tortue", "La Navasse", "Île-à-Vache"], 0, "La Gonâve se situe dans le golfe du même nom, au large de l'Ouest."),

  q("zs1", "sud", "Géographie", "Quelle ville est la capitale du département du Sud ?", ["Les Cayes", "Jérémie", "Jacmel", "Hinche"], 0, "Les Cayes est le chef-lieu du département du Sud."),
  q("zs2", "sud", "Nature", "Quel site naturel spectaculaire se trouve près de Port-à-Piment ?", ["Grotte Marie-Jeanne", "Citadelle", "Bassin Bleu", "Lagon des Baradères"], 0, "La Grotte Marie-Jeanne se trouve dans le Sud, près de Port-à-Piment."),
  q("zs3", "sud", "Nature", "Quel pic majeur se trouve dans le massif de la Hotte ?", ["Pic Macaya", "Morne la Selle", "Morne Cabaio", "Morne Rouge"], 0, "Le Pic Macaya se trouve dans le massif de la Hotte, dans le Sud."),
  q("zs4", "sud", "Culture", "Quelle île est située au large du département du Sud ?", ["Île-à-Vache", "La Gonâve", "La Tortue", "La Navasse"], 0, "Île-à-Vache se trouve au large des Cayes."),
  q("zs5", "sud", "Histoire", "Quelle bataille majeure de la guerre d'indépendance a précédé 1804 ?", ["Vertières", "Rivière Froide", "Crête-à-Pierrot", "Pétionville"], 0, "La bataille de Vertières, en novembre 1803, précéda la proclamation de l'indépendance."),

  q("zg1", "grandanse", "Personnalités", "Quelle ville est surnommée la cité des poètes en référence à sa vie culturelle ?", ["Jérémie", "Hinche", "Fort-Liberté", "Gonaïves"], 0, "Jérémie, capitale de la Grand'Anse, est réputée pour ses écrivains et poètes."),
  q("zg2", "grandanse", "Personnalités", "Quel écrivain haïtien célèbre est originaire de Jérémie ?", ["Émile Roumer", "Jacques Roumain", "Dany Laferrière", "Frankétienne"], 0, "Émile Roumer est né à Jérémie."),
  q("zg3", "grandanse", "Géographie", "Quel département se trouve à l'extrémité ouest de la péninsule du Sud ?", ["Grand'Anse", "Nord-Est", "Centre", "Artibonite"], 0, "La Grand'Anse occupe l'extrémité ouest de la péninsule du Sud."),
  q("zg4", "grandanse", "Nature", "Quel environnement naturel est particulièrement présent dans la Grand'Anse ?", ["Forêts et montagnes", "Déserts de sable", "Toundra", "Steppes froides"], 0, "La Grand'Anse possède de nombreux massifs, forêts et paysages côtiers."),
  q("zg5", "grandanse", "Culture", "Quel produit agricole est traditionnellement important dans la Grand'Anse ?", ["Café", "Blé", "Houblon", "Olive"], 0, "Le café fait partie des productions agricoles historiquement importantes de la région."),

  q("ze1", "sudest", "Culture", "Quelle ville est la capitale du Sud-Est ?", ["Jacmel", "Les Cayes", "Jérémie", "Hinche"], 0, "Jacmel est le chef-lieu du département du Sud-Est."),
  q("ze2", "sudest", "Culture", "Jacmel est particulièrement connue pour quel art traditionnel ?", ["Carnaval et masques", "Sculpture sur glace", "Poterie japonaise", "Tapisserie nordique"], 0, "Jacmel est célèbre pour ses masques, son carnaval et son artisanat créatif."),
  q("ze3", "sudest", "Patrimoine", "Quel type d'architecture historique est visible dans le centre de Jacmel ?", ["Maisons anciennes et façades colorées", "Châteaux médiévaux européens", "Pagodes", "Pyramides"], 0, "Le centre historique de Jacmel est réputé pour son architecture et ses anciennes maisons."),
  q("ze4", "sudest", "Géographie", "Quel cours d'eau est associé à la région de Jacmel ?", ["La Grande Rivière de Jacmel", "L'Artibonite", "Le fleuve du Nord", "Le Libon"], 0, "La Grande Rivière de Jacmel est un cours d'eau important de la zone."),
  q("ze5", "sudest", "Culture", "Quel matériau est souvent travaillé par les artisans de Jacmel ?", ["Papier mâché", "Glace", "Acier inoxydable uniquement", "Bambou japonais"], 0, "Le papier mâché est très présent dans les masques et créations du carnaval de Jacmel."),

  q("zc1", "centre", "Géographie", "Quelle ville est la capitale du département du Centre ?", ["Hinche", "Jacmel", "Jérémie", "Fort-Liberté"], 0, "Hinche est le chef-lieu du Centre."),
  q("zc2", "centre", "Géographie", "Le département du Centre est principalement caractérisé par quel relief ?", ["Plateaux et montagnes", "Grand désert", "Plaine polaire", "Volcans actifs"], 0, "Le Centre possède de nombreux plateaux et massifs montagneux."),
  q("zc3", "centre", "Environnement", "Quel bassin versant important traverse le Centre ?", ["Artibonite", "Amazonie", "Mississippi", "Nil"], 0, "Le bassin de l'Artibonite couvre une partie importante du Centre."),
  q("zc4", "centre", "Histoire", "Quelle ancienne région frontalière est liée à l'histoire du Centre ?", ["Plateau Central", "Côte des Arcadins", "Île-à-Vache", "Péninsule de Jérémie"], 0, "Le Plateau Central occupe une place importante dans la géographie et l'histoire du Centre."),
  q("zc5", "centre", "Nature", "Quel type d'écosystème doit être protégé dans les zones montagneuses du Centre ?", ["Forêts et sources d'eau", "Banquise", "Récifs polaires", "Dunes arctiques"], 0, "Les forêts et bassins versants jouent un rôle majeur pour l'eau et les sols."),

  q("zne1", "nordest", "Géographie", "Quelle ville est la capitale du Nord-Est ?", ["Fort-Liberté", "Ouanaminthe", "Cap-Haïtien", "Hinche"], 0, "Fort-Liberté est le chef-lieu du Nord-Est."),
  q("zne2", "nordest", "Géographie", "Quelle ville importante du Nord-Est se trouve près de la frontière dominicaine ?", ["Ouanaminthe", "Jérémie", "Jacmel", "Port-de-Paix"], 0, "Ouanaminthe se trouve près de la frontière avec la République dominicaine."),
  q("zne3", "Patrimoine", "nordest", "Quel site historique se trouve dans la région de Fort-Liberté ?", ["Fort Liberté", "Citadelle Laferrière", "Palais Sans-Souci", "Fort Jacques"], 0, "Le fort de Fort-Liberté fait partie du patrimoine historique de la zone."),
  q("zne4", "Géographie", "nordest", "Quelle baie est associée à Fort-Liberté ?", ["Baie de Fort-Liberté", "Baie de Port-au-Prince", "Baie des Cayes", "Baie de Jacmel"], 0, "Fort-Liberté est située autour de sa baie historique."),
  q("zne5", "Surprise", "nordest", "Quelle frontière internationale se trouve à proximité du Nord-Est haïtien ?", ["République dominicaine", "Cuba", "Jamaïque", "Bahamas"], 0, "Le Nord-Est partage une frontière terrestre avec la République dominicaine."),
];

export function questionsForZone(zoneId: string, count: number) {
  const pool = HAITI_ZONE_QUESTIONS.filter((q) => q.zoneId === zoneId);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
