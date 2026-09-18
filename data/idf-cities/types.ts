/**
 * Hand-written, town-specific content for Île-de-France city pages.
 *
 * One record per (department, commune), stored in data/idf-cities/<dept>.ts.
 * Every fact must be public and checkable (mairie, paris.fr, préfecture,
 * INSEE, geo.api.gouv.fr…) — cite it in `sources`. No business claims that
 * only the owner can vouch for (ratings, volumes, response times).
 */

import type { FaqItem } from '@/lib/faq';

export interface IdfFourriere {
  name: string;
  address: string;
  phone?: string;
  hours?: string;
  /** Public tariff, quoted as published (e.g. "179 € + 29 €/jour"). */
  tarif?: string;
  note?: string;
}

export interface IdfCitySituation {
  title: string;
  text: string;
}

export interface IdfCityContent {
  /**
   * Date of the last substantive edit (ISO YYYY-MM-DD). Drives <lastmod> in
   * sitemap-idf.xml and the city sitemaps — bump it only when the content
   * really changes.
   */
  updatedAt: string;
  /** Intro paragraphs specific to the commune, épaviste angle. */
  intro: string[];
  /** "Situations fréquentes à {Ville}" — parking souterrain, rue étroite, fourrière… */
  situations: IdfCitySituation[];
  /** The fourrière serving the commune, public data only. */
  fourriere?: IdfFourriere;
  /** Access constraints: ZFE, zones piétonnes, voies sur berges, hauteur de parking… */
  acces: string[];
  /** Town-specific questions, the town's name in Q and A. */
  faqEpaviste: FaqItem[];
  /** Rachat angle: intro paragraphs specific to the commune. */
  rachatIntro: string[];
  faqRachat: FaqItem[];
  /** Public sources the facts above come from. */
  sources: string[];
}

export type IdfCityContentMap = Record<string, IdfCityContent>;
