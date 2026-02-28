/**
 * IDF-Specific Testimonials
 * 20+ testimonials from IDF clients with department/city references
 */

export interface IdfTestimonial {
  name: string;
  location: string;
  deptCode: string;
  rating: number;
  text: string;
  service: 'epaviste' | 'rachat';
  date: string;
}

export const idfTestimonials: IdfTestimonial[] = [
  {
    name: 'Marc D.',
    location: 'Paris 15e',
    deptCode: '75',
    rating: 5,
    text: "Enlèvement de mon épave en moins de 2h dans mon parking souterrain du 15e. Équipe très professionnelle, certificat de destruction reçu sur place. Je recommande vivement !",
    service: 'epaviste',
    date: '2025-12-15',
  },
  {
    name: 'Sophie L.',
    location: 'Boulogne-Billancourt',
    deptCode: '92',
    rating: 5,
    text: "Service impeccable pour le rachat de ma Peugeot 308 accidentée. Estimation juste, paiement cash immédiat. Pas besoin de CT, ils se sont occupés de tout.",
    service: 'rachat',
    date: '2025-11-28',
  },
  {
    name: 'Ahmed K.',
    location: 'Saint-Denis',
    deptCode: '93',
    rating: 5,
    text: "Intervention rapide un dimanche matin à Saint-Denis. Ma voiture était en panne depuis 3 mois, ils l'ont enlevée gratuitement en 1h. Merci pour le certificat de destruction !",
    service: 'epaviste',
    date: '2025-11-20',
  },
  {
    name: 'Christine M.',
    location: 'Créteil',
    deptCode: '94',
    rating: 5,
    text: "Excellent service à Créteil. Mon véhicule ne passait plus le CT et était interdit de circulation ZFE. Enlèvement gratuit et certificat pour la prime à la conversion. Parfait !",
    service: 'epaviste',
    date: '2025-10-05',
  },
  {
    name: 'Thomas R.',
    location: 'Argenteuil',
    deptCode: '95',
    rating: 5,
    text: "Rachat de ma Renault Clio à Argenteuil sans contrôle technique. Estimation gratuite par téléphone, enlèvement le lendemain et paiement immédiat. Très satisfait.",
    service: 'rachat',
    date: '2025-09-18',
  },
  {
    name: 'Fatima B.',
    location: 'Meaux',
    deptCode: '77',
    rating: 5,
    text: "Malgré la distance (Meaux, en Seine-et-Marne), ils sont venus enlever mon épave en moins de 24h. Service entièrement gratuit, rien à redire.",
    service: 'epaviste',
    date: '2025-09-10',
  },
  {
    name: 'Pierre G.',
    location: 'Versailles',
    deptCode: '78',
    rating: 5,
    text: "Rachat de mon ancien SUV à Versailles. Prix proposé supérieur à la concurrence, paiement par virement instantané. Démarches administratives gérées par eux.",
    service: 'rachat',
    date: '2025-08-22',
  },
  {
    name: 'Nadia S.',
    location: 'Évry-Courcouronnes',
    deptCode: '91',
    rating: 5,
    text: "Enlèvement express à Évry, en plein été. Équipe ponctuelle et très professionnelle. Certificat de destruction fourni immédiatement. 100% gratuit comme promis.",
    service: 'epaviste',
    date: '2025-08-15',
  },
  {
    name: 'Jean-Paul V.',
    location: 'Paris 18e',
    deptCode: '75',
    rating: 5,
    text: "Ma vieille Twingo était dans une cour intérieure étroite du 18e. Ils ont réussi à la sortir sans aucun problème. Service gratuit, rapide et efficace.",
    service: 'epaviste',
    date: '2025-07-30',
  },
  {
    name: 'Lucie H.',
    location: 'Montreuil',
    deptCode: '93',
    rating: 5,
    text: "Rachat de ma voiture accidentée à Montreuil. J'ai reçu 1 200€ cash pour ma Clio qui ne roulait plus. Bien mieux que ce que la casse locale m'avait proposé.",
    service: 'rachat',
    date: '2025-07-15',
  },
  {
    name: 'Karim A.',
    location: 'Sartrouville',
    deptCode: '78',
    rating: 5,
    text: "Enlèvement d'un Scenic accidenté à Sartrouville en moins de 3h. L'assurance avait refusé de prendre en charge le remorquage. Eux l'ont fait gratuitement. Top !",
    service: 'epaviste',
    date: '2025-06-28',
  },
  {
    name: 'Marie C.',
    location: 'Colombes',
    deptCode: '92',
    rating: 5,
    text: "Service exceptionnel à Colombes. Enlèvement de 2 véhicules le même jour, certificats de destruction fournis pour les deux. Gratuit et sans surprise.",
    service: 'epaviste',
    date: '2025-06-10',
  },
  {
    name: 'David F.',
    location: 'Melun',
    deptCode: '77',
    rating: 5,
    text: "Rachat de mon utilitaire Kangoo à Melun. Véhicule de 2008 avec 250 000 km, ils m'en ont donné 400€ cash. Rapide et honnête.",
    service: 'rachat',
    date: '2025-05-20',
  },
  {
    name: 'Isabelle P.',
    location: 'Vitry-sur-Seine',
    deptCode: '94',
    rating: 5,
    text: "Mon fils m'a recommandé ce service pour enlever ma vieille 206 à Vitry. Intervention le jour même, gratuit, certificat fourni. Je recommande à toute l'IDF.",
    service: 'epaviste',
    date: '2025-05-05',
  },
  {
    name: 'Olivier T.',
    location: 'Cergy',
    deptCode: '95',
    rating: 5,
    text: "Enlèvement d'une moto accidentée à Cergy. Je ne pensais pas qu'ils prendraient une moto, mais oui ! Gratuit, rapide, professionnel.",
    service: 'epaviste',
    date: '2025-04-18',
  },
  {
    name: 'Sylvie R.',
    location: 'Massy',
    deptCode: '91',
    rating: 5,
    text: "Rachat de ma Toyota Yaris sans CT à Massy. Estimation par WhatsApp en 10 minutes, enlèvement le lendemain avec paiement cash. Très pratique.",
    service: 'rachat',
    date: '2025-04-02',
  },
  {
    name: 'Bruno M.',
    location: 'Paris 11e',
    deptCode: '75',
    rating: 5,
    text: "3e fois que je fais appel à eux pour des clients de mon garage dans le 11e. Toujours fiables, toujours rapides. Le meilleur épaviste de Paris.",
    service: 'epaviste',
    date: '2025-03-15',
  },
  {
    name: 'Amina D.',
    location: 'Aulnay-sous-Bois',
    deptCode: '93',
    rating: 5,
    text: "Enlèvement gratuit d'une Clio brûlée à Aulnay-sous-Bois. Malgré l'état du véhicule, ils sont venus le lendemain. Certificat de destruction reçu immédiatement.",
    service: 'epaviste',
    date: '2025-03-01',
  },
  {
    name: 'Philippe J.',
    location: 'Pontault-Combault',
    deptCode: '77',
    rating: 5,
    text: "Service impeccable à Pontault-Combault. Ma voiture était en panne dans mon allée depuis 6 mois. Enlèvement gratuit en 24h, rien à débourser.",
    service: 'epaviste',
    date: '2025-02-12',
  },
  {
    name: 'Laura K.',
    location: 'Nanterre',
    deptCode: '92',
    rating: 5,
    text: "Rachat de mon Audi A3 accidentée à Nanterre. 2 500€ cash, bien au-dessus de mes attentes. Paiement sur place, enlèvement immédiat. Merci !",
    service: 'rachat',
    date: '2025-01-25',
  },
];

/** Get testimonials for a specific IDF department */
export function getIdfTestimonialsByDept(deptCode: string): IdfTestimonial[] {
  return idfTestimonials.filter(t => t.deptCode === deptCode);
}

/** Get testimonials for a specific service type in IDF */
export function getIdfTestimonialsByService(service: 'epaviste' | 'rachat'): IdfTestimonial[] {
  return idfTestimonials.filter(t => t.service === service);
}

/** Get all IDF testimonials (for region page) */
export function getAllIdfTestimonials(): IdfTestimonial[] {
  return idfTestimonials;
}
