import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getIdfIntent, getIdfIntents } from '@/data/idf-intents';
import { generateIdfIntentMeta } from '@/lib/seo';
import { getBreadcrumbData, getIdfIntentServiceData, getWebPageData, renderJSONLD } from '@/lib/structured-data';
import { buildFaqPage } from '@/lib/faq';
import { IDF_NAV_DEPARTMENTS } from '@/components/IdfNav';
import IdfIntentPage from '@/components/IdfIntentPage';
import Footer from '@/components/Footer';

const SERVICE = 'rachat-voiture' as const;
const BASE = 'https://www.lesepavistespro.fr';

/** Only the slugs in data/idf-intents.ts exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getIdfIntents(SERVICE).map((i) => ({ intent: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ intent: string }> }): Promise<Metadata> {
  const { intent } = await params;
  const data = getIdfIntent(SERVICE, intent);
  if (!data) return {};
  return generateIdfIntentMeta(SERVICE, data.slug, data.metaTitle, data.description);
}

export default async function RachatIdfIntentRoute({ params }: { params: Promise<{ intent: string }> }) {
  const { intent } = await params;
  const data = getIdfIntent(SERVICE, intent);
  if (!data) notFound();

  const url = `${BASE}/${SERVICE}/ile-de-france/${data.slug}`;
  const faqPage = buildFaqPage(data.faq);
  const structuredData = [
    getWebPageData(url, data.metaTitle, data.description),
    getBreadcrumbData([
      { name: 'Accueil', url: BASE },
      { name: 'Rachat voiture', url: `${BASE}/rachat-voiture` },
      { name: 'Île-de-France', url: `${BASE}/rachat-voiture/ile-de-france` },
      { name: data.label, url },
    ]),
    getIdfIntentServiceData(data.title, data.description, url, 'rachat', IDF_NAV_DEPARTMENTS.map((d) => d.name)),
    ...(faqPage ? [faqPage] : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJSONLD(structuredData)} />
      <IdfIntentPage intent={data} siblings={getIdfIntents(SERVICE).filter((i) => i.slug !== data.slug)} />
      <Footer />
    </>
  );
}
