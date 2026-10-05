/**
 * One local line per Paris arrondissement for the « Épaviste dans votre
 * arrondissement » block of the Paris hubs (S3.3). Landmarks and stations are
 * public geography; préfourrières come from data/idf-fourrieres.ts (Ville de
 * Paris). Population is read from the dataset (INSEE), not written here.
 */

export const PARIS_ARRONDISSEMENT_LINES: Record<string, string> = {
  'paris-1er': 'Louvre, Les Halles, Palais-Royal — la préfourrière Louvre-Samaritaine est sous la place du Louvre.',
  'paris-2e': 'Bourse, Sentier, quartier piéton Montorgueil : le plus petit arrondissement, 1 km².',
  'paris-3e': 'Haut-Marais, Arts-et-Métiers : rues étroites en sens unique, accès par Turbigo ou Bretagne.',
  'paris-4e': 'Marais, Hôtel de Ville, îles de la Cité et Saint-Louis : treuillage jusqu’au quai le plus proche.',
  'paris-5e': 'Quartier latin, Panthéon, Jardin des Plantes : rues en pente et parkings à 1,90 m.',
  'paris-6e': 'Saint-Germain-des-Prés, Luxembourg : parkings en ouvrage Saint-Sulpice et Marché Saint-Germain.',
  'paris-7e': 'Tour Eiffel, Invalides, quais piétons de la rive gauche : accès par Suffren ou Breteuil.',
  'paris-8e': 'Champs-Élysées, gare Saint-Lazare : parkings de bureaux et de résidences sur plusieurs niveaux.',
  'paris-9e': 'Opéra, grands magasins, Pigalle : interventions tôt le matin, avant les livraisons.',
  'paris-10e': 'Gares du Nord et de l’Est, canal Saint-Martin : rues denses et cours d’immeubles.',
  'paris-11e': 'République, Bastille, Oberkampf : stationnement résidentiel et box en sous-sol.',
  'paris-12e': 'Gare de Lyon, Bercy et le bois de Vincennes, qui porte la surface à 16,4 km².',
  'paris-13e': 'Place d’Italie, Paris Rive Gauche : préfourrière Charléty et fourrière Chevaleret.',
  'paris-14e': 'Montparnasse, Alésia, Cité universitaire : pavillons, villas et parkings de résidences.',
  'paris-15e': 'Vaugirard, Convention, Front de Seine : l’arrondissement le plus peuplé de Paris.',
  'paris-16e': 'Trocadéro, Auteuil, bois de Boulogne : préfourrière Foch sous l’avenue Foch.',
  'paris-17e': 'Batignolles, Ternes : la préfourrière Pouchet est juste derrière la porte Pouchet, à Clichy.',
  'paris-18e': 'Montmartre, Barbès, La Chapelle : rues en pente et accès contraints autour de la Butte.',
  'paris-19e': 'La Villette, Buttes-Chaumont : préfourrière Pantin, rue de la Marseillaise.',
  'paris-20e': 'Belleville, Ménilmontant, Père-Lachaise : rues étroites et parkings de grands ensembles.',
};
