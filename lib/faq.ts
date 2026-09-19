/**
 * FAQ content and FAQPage schema.
 *
 * Two rules drive this module:
 *   1. A page emits AT MOST ONE FAQPage node. Google merges nothing — several
 *      FAQPage blocks on one URL is an invalid-structured-data error.
 *   2. A FAQPage may only contain questions that are VISIBLY RENDERED on that
 *      page. Every consumer therefore builds one item list, renders it, and
 *      passes the same list to buildFaqPage().
 */

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Default FAQ rendered by <FAQ />. Lives here (not in the client component) so
 * server code can build the matching FAQPage without importing the component.
 */
export const genericFaqItems: FaqItem[] = [
  {
    question: 'L’enlèvement d’épave est-il vraiment gratuit ?',
    answer: 'Oui, l’enlèvement est 100% gratuit pour tout véhicule complet (avec moteur et éléments essentiels). Aucun frais caché, même si votre véhicule est en sous-sol ou difficile d’accès. C’est la loi française qui impose aux centres VHU agréés d’accepter gratuitement les véhicules hors d’usage.',
  },
  {
    question: 'Dois-je être présent lors de l’enlèvement ?',
    answer: 'Idéalement oui, pour signer les documents de cession. Si vous ne pouvez pas être présent, une procuration signée avec copie de votre pièce d’identité permet à un tiers de vous représenter. Nous nous adaptons à votre emploi du temps.',
  },
  {
    question: 'Puis-je faire enlever une épave sans carte grise ?',
    answer: 'Dans certains cas particuliers (véhicule très ancien, perte de papiers, succession), nous pouvons intervenir. Contactez-nous pour étudier votre situation. Des démarches spécifiques seront nécessaires auprès de la préfecture.',
  },
  {
    question: 'Intervenez-vous en sous-sol ou parking privé ?',
    answer: 'Oui, nous intervenons dans tous types de parkings : sous-sol, copropriété, parking privé, box fermé. Notre équipement (treuil, chariot) permet d’extraire les véhicules même dans les espaces étroits. Aucun surcoût.',
  },
  {
    question: 'Quels documents faut-il fournir ?',
    answer: 'Vous devez fournir : la carte grise originale avec la mention "cédé le" + date et signature, un certificat de non-gage de moins de 15 jours, une copie de votre pièce d’identité, et le formulaire Cerfa 15776*02 rempli. Nous vous aidons pour toutes ces démarches.',
  },
  {
    question: 'Combien de temps prend l’intervention ?',
    answer: 'Nous intervenons généralement sous 24 à 48h après votre demande. En urgence, nous pouvons intervenir sous 2h en région parisienne. L’enlèvement lui-même prend environ 30 minutes. Vous recevez le certificat de destruction sous 15 jours.',
  },
  {
    question: 'La prime à la conversion existe-t-elle encore ?',
    answer: 'Non : la prime à la conversion nationale a été supprimée le 2 décembre 2024. D’autres aides à l’achat d’un véhicule propre existent (coup de pouce CEE pour l’électrique, aides locales), avec leurs propres conditions. Le certificat de destruction que nous vous remettons reste le justificatif officiel de la mise au rebut de votre ancien véhicule.',
  },
  {
    question: 'Que devient mon véhicule après l’enlèvement ?',
    answer: 'Votre véhicule est acheminé vers notre centre VHU agréé où il est dépollué (retrait des fluides toxiques), démonté (récupération des pièces réutilisables) et recyclé (jusqu’à 95% du poids). Vous recevez un certificat de destruction officiel sous 15 jours.',
  },
  {
    question: 'Intervenez-vous partout en France ?',
    answer: 'Oui, nous couvrons l’intégralité de la France : 18 régions, 101 départements, plus de 35 000 communes desservies sans frais supplémentaires.',
  },
  {
    question: 'Puis-je vendre mon épave au lieu de la faire enlever gratuitement ?',
    answer: 'Oui ! Si votre véhicule a encore de la valeur (pièces récupérables, métaux), nous pouvons vous le racheter. Le prix dépend de l’état, du modèle et de l’année. Contactez-nous pour une estimation gratuite.',
  },
];

/** FAQ rendered on the /epaviste and /rachat-voiture pillar pages. */
export const pillarFaqItems: FaqItem[] = [
  {
    question: "L'enlèvement d'épave est-il vraiment gratuit ?",
    answer: 'Oui, 100% gratuit pour un véhicule complet partout en France. Intervention sous 24–48h, 7j/7.',
  },
  {
    question: 'Quels documents faut-il fournir ?',
    answer: "Carte grise signée, certificat de situation administrative (non-gage) de moins de 15 jours, pièce d'identité, Cerfa 15776*02.",
  },
  {
    question: 'Intervenez-vous partout en France ?',
    answer: 'Oui, nous intervenons dans toute la France : 18 régions, 101 départements, plus de 34 900 communes desservies.',
  },
  {
    question: 'Pouvez-vous intervenir en sous-sol ou en fourrière ?',
    answer: "Oui. Nous gérons l'accès aux parkings, aux rampes et la coordination avec la fourrière si besoin.",
  },
  {
    question: 'Rachetez-vous les voitures sans contrôle technique ?',
    answer: "Oui, reprise possible selon l'état. Enlèvement à domicile 7j/7 et paiement rapide.",
  },
];

/**
 * Local questions for a city page, built from the real local data we hold for
 * that commune (parkings, fourrière, access constraints, specificities).
 * Returns plain items so the caller can render them AND schema them.
 */
export function getCityFaqItems(
  cityName: string,
  localData?: {
    parkings?: string[];
    fourriere?: { name: string; address: string; tarif: string };
    acces?: string;
    specificites?: string[];
  } | null
): FaqItem[] {
  const items: FaqItem[] = [
    {
      question: `Pouvez-vous enlever une épave en sous-sol à ${cityName} ?`,
      answer:
        localData?.parkings && localData.parkings.length > 0
          ? `Oui, nous intervenons 7j/7 en sous-sol à ${cityName}. Nous avons l'habitude d'intervenir dans les parkings locaux comme ${localData.parkings
              .slice(0, 2)
              .join(', ')}. Équipement adapté pour tous types de sous-sols.`
          : `Oui, nous intervenons 7j/7 en sous-sol à ${cityName} (parkings Indigo/Vinci), avec équipement adapté.`,
    },
    {
      question: `Quel est le délai d'intervention à ${cityName} ?`,
      answer: `Généralement sous 24–48h à ${cityName}. Pour une urgence, contactez-nous par téléphone (06 02 42 73 45) ou WhatsApp.`,
    },
  ];

  if (localData?.fourriere) {
    items.push({
      question: `Où se trouve la fourrière à ${cityName} ?`,
      answer: `La fourrière locale est ${localData.fourriere.name}, située ${localData.fourriere.address}. Tarif : ${localData.fourriere.tarif}. Nous pouvons récupérer votre véhicule directement en fourrière et gérer toutes les démarches pour vous.`,
    });
  }

  if (localData?.acces) {
    items.push({
      question: `Y a-t-il des contraintes d'accès à ${cityName} ?`,
      answer: localData.acces,
    });
  }

  if (localData?.specificites && localData.specificites.length > 0) {
    items.push({
      question: `Quelles sont les particularités de l'enlèvement d'épave à ${cityName} ?`,
      answer: `À ${cityName}, voici les points importants : ${localData.specificites.join('. ')}.`,
    });
  }

  return items;
}

/**
 * Build the single FAQPage node for a page, from exactly the items rendered
 * on it. Duplicate questions are collapsed; an empty list yields null so the
 * caller emits nothing rather than an empty FAQPage.
 */
export function buildFaqPage(items: FaqItem[]): Record<string, unknown> | null {
  const seen = new Set<string>();
  const unique = items.filter((item) => {
    const key = item.question.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (unique.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: unique.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
