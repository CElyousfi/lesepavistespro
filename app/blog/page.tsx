import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { Clock, User, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { blogPosts } from '@/lib/blog-data';
import BlogAnimations from './BlogAnimations';

export const metadata: Metadata = {
  title: "Blog Épaviste | Conseils & Actualités Enlèvement Épave Île-de-France",
  description: "Découvrez nos articles sur l'enlèvement d'épave, le rachat de voiture, les démarches VHU et conseils pour vendre votre véhicule en Île-de-France.",
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
    description: "Tous nos conseils et actualités sur l'enlèvement d'épave et le rachat de voiture en Île-de-France",
    type: "website",
  },
  alternates: {
    canonical: "https://lesepavistespro.fr/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <BlogAnimations />
      <Header />
      
      <main className="bg-neutral-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-white overflow-hidden min-h-[60vh] flex items-center justify-center p-1 md:p-[0.25%] pt-28 md:pt-32">
          <div className="w-full md:w-[99.5%] relative z-10">
            <div className="w-full bg-brand-navy text-white border-2 border-neutral-200 rounded-2xl md:rounded-3xl p-8 md:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark opacity-95 rounded-2xl md:rounded-3xl"></div>
              <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Blog Épaviste Pro
              </h1>
              <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed">
                Conseils, actualités et guides pratiques sur l'enlèvement d'épave et le rachat de voiture en Île-de-France
              </p>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-[5%]">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <Link 
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover-lift scroll-animate animation-delay-${index * 100}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Blog Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-brand-red text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock size={16} weight="bold" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={16} weight="bold" />
                          <span>{new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-brand-red transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-neutral-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-2 text-brand-red font-semibold group-hover:gap-3 transition-all">
                        <span>Lire l'article</span>
                        <ArrowRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-[5%]">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Besoin d'un enlèvement d'épave ?
              </h2>
              <p className="text-xl text-neutral-600 mb-8">
                Service gratuit, rapide et professionnel en Île-de-France
              </p>
              <a 
                href="tel:0979049486"
                className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-light text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <span>09 79 04 94 86</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
