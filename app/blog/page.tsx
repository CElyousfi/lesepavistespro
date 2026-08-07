import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { Clock, User, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { blogPosts } from '@/lib/blog-data';
import BlogAnimations from './BlogAnimations';
import { getBreadcrumbSchema } from '@/lib/schema';
import VHUCertification from '@/components/VHUCertification';

export const metadata: Metadata = {
  title: "Blog Épaviste – Conseils & Actualités Enlèvement Épave France",
  description: "Découvrez nos articles sur l'enlèvement d'épave, le rachat de voiture, les démarches VHU et conseils pour vendre votre véhicule en France.",
  keywords: [
    "blog épaviste",
    "conseils enlèvement épave",
    "actualités VHU",
    "rachat voiture conseils",
    "démarches épave",
    "certificat destruction",
    "vendre voiture HS",
  ],
  openGraph: {
    title: "Blog Épaviste | Conseils Enlèvement Épave",
    description: "Tous nos conseils et actualités sur l'enlèvement d'épave et le rachat de voiture en France",
    type: "website",
  },
  alternates: {
    canonical: "https://www.lesepavistespro.fr/blog",
  },
};

export default function BlogPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', url: 'https://www.lesepavistespro.fr' },
    { name: 'Blog', url: 'https://www.lesepavistespro.fr/blog' },
  ]);

  return (
    <>
      <Script
        id="structured-data-blog-breadcrumb"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogAnimations />
      <Header />

      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-white overflow-hidden pt-32 pb-20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy/[0.05] border border-brand-navy/[0.08] text-sm font-medium text-brand-navy/70 mb-8">
                Actualités &amp; Conseils
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-brand-navy">
                Blog Épaviste Pro
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                Tout savoir sur l&apos;enlèvement d&apos;épave, le rachat de voiture et les démarches VHU en France.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-brand-red/20 hover:shadow-lg transition-all duration-500 block"
                  >
                    {/* Blog Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-brand-red text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} weight="fill" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User size={14} weight="fill" />
                          <span>{new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                      </div>

                      <h2 className="text-lg font-bold text-brand-navy mb-3 group-hover:text-brand-red transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-neutral-600 mb-5 line-clamp-3 leading-relaxed text-sm">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-2 text-brand-red font-semibold group-hover:gap-3 transition-all text-sm">
                        <span>Lire l&apos;article</span>
                        <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brand-surface border-t border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mb-6 tracking-tight">
                Besoin d&apos;un enlèvement d&apos;épave ?
              </h2>
              <p className="text-lg text-neutral-600 mb-10 max-w-2xl mx-auto">
                Service gratuit, rapide et professionnel partout en France. Obtenez votre certificat de destruction immédiatement.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+33602427345"
                  className="inline-flex items-center justify-center gap-3 bg-brand-red text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-brand-red/90 hover:scale-[1.02] transition-all shadow-lg w-full sm:w-auto"
                >
                  <span>06 02 42 73 45</span>
                </a>
                <Link
                  href="/epaviste"
                  className="inline-flex items-center justify-center gap-3 bg-white border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white px-8 py-4 rounded-full font-semibold text-base transition-all w-full sm:w-auto"
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <VHUCertification />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
