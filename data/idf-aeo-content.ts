/**
 * Blocs AEO/GEO pour les pages IDF
 * Format optimisé pour l'extraction par les moteurs IA (AI Overviews, ChatGPT, Perplexity).
 * Chaque bloc : question en titre naturel + réponse directe en 1ère phrase + contexte (40-80 mots).
 * Ces blocs couvrent les clusters d'intention absents ou partiels identifiés dans l'audit.
 */

export interface AeoBlock {
  question: string;
  answer: string;
  /** Cluster thématique pour l'organisation dans les pages */
  cluster: 'eligibilite' | 'comparaison' | 'zfe' | 'recyclage' | 'cas-particuliers' | 'responsabilite';
}

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 1 — ÉLIGIBILITÉ DOCUMENTAIRE
// ─────────────────────────────────────────────────────────────────────────────

export const aeoEligibilite: AeoBlock[] = [
  {
    cluster: 'eligibilite',
    question: 'Puis-je faire enlever une épave sans carte grise ?',
    answer: 'Oui, dans la majorité des cas. La carte grise facilite les démarches, mais son absence n\'est pas un obstacle absolu. Si vous avez perdu votre carte grise, nous vous aidons à obtenir un certificat de situation administrative (non-gage) auprès de l\'ANTS, qui suffit pour initier la procédure. En cas de perte totale de documents, une déclaration sur l\'honneur accompagnée d\'une pièce d\'identité permet souvent de débloquer la situation. Appelez-nous : chaque cas est traité individuellement.',
  },
  {
    cluster: 'eligibilite',
    question: 'Mon véhicule est encore sous crédit (gagé) — peut-il être enlevé gratuitement ?',
    answer: 'Un véhicule gagé ne peut légalement être cédé ou détruit sans accord du créancier. Si votre véhicule est hors d\'usage et encore sous crédit automobile, vous devez d\'abord obtenir une mainlevée de gage auprès de votre organisme de financement (banque, loueur). Une fois la mainlevée obtenue — document gratuit si le crédit est soldé — l\'enlèvement peut avoir lieu normalement. Nous vous guidons dans cette démarche si besoin.',
  },
  {
    cluster: 'eligibilite',
    question: 'Le propriétaire du véhicule est décédé — comment procéder pour faire enlever l\'épave ?',
    answer: 'En cas de succession, les héritiers peuvent faire enlever le véhicule en fournissant une attestation notariale ou un acte de notoriété prouvant leur qualité d\'héritier, accompagné de leur pièce d\'identité. Si la succession est simple (conjoint survivant), une attestation sur l\'honneur de dévolution successorale peut suffire. Nous avons traité de nombreux cas de succession en Île-de-France — contactez-nous pour une procédure adaptée à votre situation.',
  },
  {
    cluster: 'eligibilite',
    question: 'Acceptez-vous les véhicules sans contrôle technique pour le rachat ?',
    answer: 'Oui, absolument. Nous rachetons tous les véhicules sans contrôle technique, quel que soit leur état : panne mécanique, carrosserie accidentée, moteur HS, kilométrage élevé. Le CT n\'est exigé que pour les transactions entre particuliers — pas pour un professionnel agréé VHU. L\'estimation est gratuite par téléphone ou WhatsApp en moins de 15 minutes, et le paiement est réalisé comptant le jour de l\'enlèvement.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 2 — COMPARAISON ÉPAVISTE / FOURRIÈRE / CASSE
// ─────────────────────────────────────────────────────────────────────────────

export const aeoComparaison: AeoBlock[] = [
  {
    cluster: 'comparaison',
    question: 'Quelle est la différence entre un épaviste privé agréé et la fourrière municipale ?',
    answer: 'La fourrière municipale agit sur réquisition d\'un officier de police (pour stationnement illégal sur voie publique) et facture des frais de gardiennage (souvent 150-300€). L\'épaviste privé agréé intervient à votre demande, sur votre propriété ou voie publique, gratuitement. Résultat concret : avec nous, vous recevez un certificat de destruction le jour même, sans frais, sans délai administratif — contre 1 à 3 semaines et plusieurs centaines d\'euros via la fourrière.',
  },
  {
    cluster: 'comparaison',
    question: 'Quelle différence entre un épaviste agréé VHU et une casse automobile traditionnelle ?',
    answer: 'Une casse traditionnelle achète votre véhicule pour ses pièces — elle peut vous proposer une somme mais n\'est pas forcément agréée VHU. Un épaviste agréé VHU (comme nous, n° PR9500003D) est autorisé par la préfecture à émettre le certificat de destruction officiel, indispensable pour radier votre véhicule à l\'ANTS et bénéficier de la prime à la conversion. Sans cet agrément, le document fourni n\'a aucune valeur légale.',
  },
  {
    cluster: 'comparaison',
    question: 'Vaut-il mieux passer par le SIVOM / la mairie ou par un épaviste privé ?',
    answer: 'Le SIVOM (Syndicat intercommunal) peut intervenir pour les épaves sur voie publique, mais les délais sont souvent de plusieurs semaines et la procédure implique un procès-verbal de police. Pour un véhicule sur propriété privée, le SIVOM n\'est pas compétent — seul un épaviste privé peut agir. Notre intervention est plus rapide (24-48h), totalement gratuite, et inclut le certificat de destruction conforme.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 3 — CAS PARTICULIERS (absent du site avant cet audit)
// ─────────────────────────────────────────────────────────────────────────────

export const aeoCasParticuliers: AeoBlock[] = [
  {
    cluster: 'cas-particuliers',
    question: 'Enlevez-vous les véhicules brûlés ou partiellement calcinés ?',
    answer: 'Oui, nous enlevons les véhicules brûlés, même partiellement calcinés. Nos équipes sont équipées pour manipuler des épaves dans cet état (protections adaptées, plateau fermé). Un véhicule brûlé n\'a généralement plus de valeur marchande en pièces, mais son enlèvement reste gratuit car les matériaux ferreux ont une valeur de recyclage. Le certificat de destruction est remis normalement. Seul pré-requis : le rapport de pompiers ou d\'assurance attestant de l\'incendie est utile mais pas obligatoire.',
  },
  {
    cluster: 'cas-particuliers',
    question: 'Peut-on enlever une épave sans roues, sans moteur ou partiellement démantelée ?',
    answer: 'Cela dépend de l\'état exact. Un véhicule sans roues, posé sur des cales, peut être enlevé avec notre équipement spécialisé (rollers de déplacement, treuil). Un véhicule sans moteur est remorquable normalement. En revanche, si le véhicule est réduit à une carcasse sans valeur de recyclage (moins de 50 kg de ferraille récupérable), des frais d\'enlèvement exceptionnels peuvent s\'appliquer — nous vous le précisons avant toute intervention. Appelez-nous pour une évaluation gratuite.',
  },
  {
    cluster: 'cas-particuliers',
    question: 'Intervenez-vous pour les flottes professionnelles ou les véhicules d\'entreprise ?',
    answer: 'Oui, nous travaillons avec les professionnels : TPE, PME, administrations, sociétés de location, concessionnaires. Pour les flottes, nous proposons des interventions groupées (plusieurs véhicules en un déplacement), une facturation adaptée et des certificats de destruction délivrés pour chaque véhicule. Nous établissons également des conventions de partenariat avec les garages et carrosseries de la région qui souhaitent nous déléguer la gestion des épaves de leurs clients.',
  },
  {
    cluster: 'cas-particuliers',
    question: 'Pouvez-vous enlever une épave en sous-sol de copropriété sans l\'accord de tous les copropriétaires ?',
    answer: 'L\'accord du propriétaire du véhicule suffit — pas besoin d\'un vote en assemblée de copropriété. Si le propriétaire est injoignable et que l\'épave bloque un accès, le syndic peut mandater notre intervention après un délai de mise en demeure (généralement 7 à 15 jours). Nous travaillons régulièrement avec des syndics en Île-de-France et connaissons la procédure applicable. Contactez-nous en indiquant votre situation.',
  },
  {
    cluster: 'cas-particuliers',
    question: 'Enlevez-vous les motos, scooters et véhicules deux-roues épaves ?',
    answer: 'Oui, nous enlevons tous les deux-roues motorisés : motos, scooters, cyclomoteurs, side-cars. L\'enlèvement est gratuit dans les mêmes conditions que pour les voitures. Le certificat de destruction VHU est fourni. Pour une moto sans carte grise, la procédure est identique à celle d\'un véhicule léger — une pièce d\'identité du propriétaire suffit généralement. Les motos stockées en sous-sol sont accessibles via notre chariot de manutention.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 4 — RESPONSABILITÉ (voie publique / copropriété)
// ─────────────────────────────────────────────────────────────────────────────

export const aeoResponsabilite: AeoBlock[] = [
  {
    cluster: 'responsabilite',
    question: 'Qui est responsable d\'une épave abandonnée sur la voie publique ?',
    answer: 'Le propriétaire inscrit sur la carte grise reste légalement responsable du véhicule tant qu\'il n\'a pas fourni un certificat de destruction VHU valide. En cas d\'abandon sur voie publique, il s\'expose à une amende de 1 500€ pour abandon de véhicule (contravention de 4e classe) et au paiement des frais de fourrière. La seule façon de se dégager de cette responsabilité est de faire détruire le véhicule dans un centre VHU agréé et de radier le véhicule à l\'ANTS.',
  },
  {
    cluster: 'responsabilite',
    question: 'Mon voisin a abandonné son épave dans notre parking privé — que faire ?',
    answer: 'Si le propriétaire du parking (syndic, bailleur, propriétaire) identifie le véhicule et son propriétaire, il peut le mettre en demeure par courrier recommandé de le déplacer sous 7 jours. En l\'absence de réaction, le syndic peut faire appel à un épaviste agréé pour l\'enlèvement aux frais du propriétaire du véhicule. Nous intervenons dans ce cadre régulièrement en IDF, avec une procédure documentée. Appelez-nous pour un accompagnement juridique et opérationnel.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT GROUPÉ
// ─────────────────────────────────────────────────────────────────────────────

export const allAeoBlocks: AeoBlock[] = [
  ...aeoEligibilite,
  ...aeoComparaison,
  ...aeoCasParticuliers,
  ...aeoResponsabilite,
];

/** Retourne les blocs AEO pour un ou plusieurs clusters */
export function getAeoBlocks(clusters?: AeoBlock['cluster'][]): AeoBlock[] {
  if (!clusters || clusters.length === 0) return allAeoBlocks;
  return allAeoBlocks.filter(b => clusters.includes(b.cluster));
}
