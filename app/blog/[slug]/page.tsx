import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { Clock, User, ArrowLeft, Phone } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  return {
    title: `${post.title} | Blog Les Épavistes Pro`,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
    alternates: {
      canonical: `https://lesepavistespro.fr/blog/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      
      <main className="pt-28 md:pt-32 pb-20 bg-neutral-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-neutral-200">
          <div className="container mx-auto px-[5%] py-4">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Link href="/" className="hover:text-brand-red transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-brand-red transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-neutral-900">{post.category}</span>
            </div>
          </div>
        </div>

        <article className="container mx-auto px-[5%] py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-brand-red text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                  {post.category}
                </span>
                <div className="flex items-center gap-4 text-sm text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <Clock size={18} weight="bold" className="text-brand-blue" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={18} weight="bold" className="text-brand-blue" />
                    <span>{new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed border-l-4 border-brand-red pl-6">
                {post.excerpt}
              </p>
            </header>

            {/* Featured Image */}
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-8">
              <div 
                className="prose prose-lg max-w-none 
                  prose-headings:font-bold prose-headings:text-neutral-900 prose-headings:mb-4 prose-headings:mt-8
                  prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:border-b prose-h2:border-neutral-200 prose-h2:pb-3
                  prose-h3:text-xl prose-h3:md:text-2xl prose-h3:text-brand-navy
                  prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:my-6 prose-ul:space-y-2
                  prose-li:text-neutral-700 prose-li:pl-2
                  prose-strong:text-brand-navy prose-strong:font-semibold
                  prose-a:text-brand-blue prose-a:no-underline hover:prose-a:text-brand-red prose-a:transition-colors"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  Besoin d'aide pour votre véhicule ?
                </h3>
                <p className="text-lg md:text-xl text-neutral-200 mb-8 leading-relaxed">
                  Service d'enlèvement gratuit 24h/24, 7j/7 • Intervention rapide • Certificat VHU garanti
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="tel:0979049486"
                    className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-light text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all group"
                  >
                    <Phone size={24} weight="bold" className="icon-cta-pulse group-hover:icon-cta-shake" />
                    <span>09 79 04 94 86</span>
                  </a>
                  <Link 
                    href="/blog"
                    className="inline-flex items-center justify-center gap-2 bg-white text-brand-navy hover:bg-neutral-100 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    <ArrowLeft size={24} weight="bold" />
                    <span>Retour au blog</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12">
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
                Articles similaires
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts
                  .filter(p => p.slug !== slug && p.category === post.category)
                  .slice(0, 2)
                  .map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group"
                    >
                      <span className="text-xs font-semibold text-brand-red mb-2 block">
                        {relatedPost.category}
                      </span>
                      <h4 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-brand-blue font-semibold text-sm">
                        <span>Lire l'article</span>
                        <ArrowLeft size={16} weight="bold" className="rotate-180 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
