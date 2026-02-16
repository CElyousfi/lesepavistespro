import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { Clock, User, ArrowLeft, Phone } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import { getBlogArticleData, renderJSONLD, getBreadcrumbData } from '@/lib/structured-data';
import { getSpeakableSchema } from '@/lib/schema';
import VHUCertification from '@/components/VHUCertification';

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
      canonical: `https://www.lesepavistespro.fr/blog/${post.slug}`,
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

  // Generate Article structured data
  const articleData = post ? getBlogArticleData({
    title: post.title,
    description: post.excerpt,
    author: 'Les Épavistes Pro',
    publishDate: post.date,
    image: post.image,
    url: `https://www.lesepavistespro.fr/blog/${post.slug}`
  }) : null;

  const breadcrumbData = post ? getBreadcrumbData([
    { name: 'Accueil', url: 'https://www.lesepavistespro.fr' },
    { name: 'Blog', url: 'https://www.lesepavistespro.fr/blog' },
    { name: post.title, url: `https://www.lesepavistespro.fr/blog/${post.slug}` },
  ]) : null;

  const speakableData = post ? getSpeakableSchema(
    `https://www.lesepavistespro.fr/blog/${post.slug}`,
    ['h1', 'article h2', '.prose p:first-of-type']
  ) : null;

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Article Structured Data */}
      {articleData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={renderJSONLD(articleData)}
        />
      )}
      {/* Breadcrumb Structured Data */}
      {breadcrumbData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={renderJSONLD(breadcrumbData)}
        />
      )}
      {/* Speakable Structured Data */}
      {speakableData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={renderJSONLD(speakableData)}
        />
      )}

      <Header />

      <main className="pt-28 md:pt-32 pb-20 bg-white min-h-screen">
        {/* Breadcrumb */}
        <div className="border-b border-neutral-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-neutral-500 font-medium">
              <Link href="/" className="hover:text-brand-red transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-brand-red transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-brand-navy">{post.category}</span>
            </div>
          </div>
        </div>

        <article className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-brand-red text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {post.category}
                </span>
                <div className="flex items-center gap-4 text-sm text-neutral-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} weight="fill" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={16} weight="fill" />
                    <span>{new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-brand-navy mb-8 leading-tight tracking-tight">
                {post.title}
              </h1>

              <p className="text-lg text-neutral-600 leading-relaxed border-l-2 border-brand-red pl-6">
                {post.excerpt}
              </p>
            </header>

            {/* Featured Image */}
            <div className="relative w-full h-64 md:h-[500px] rounded-2xl overflow-hidden mb-10">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Article Content */}
            <div className="bg-brand-surface rounded-2xl p-8 md:p-16 border border-neutral-200 mb-10">
              <div
                className="prose prose-lg max-w-none 
                  prose-headings:font-bold prose-headings:text-brand-navy prose-headings:mb-6 prose-headings:mt-10
                  prose-h2:text-2xl prose-h2:border-b prose-h2:border-neutral-200 prose-h2:pb-4
                  prose-h3:text-xl
                  prose-p:text-neutral-600 prose-p:leading-relaxed prose-p:mb-6
                  prose-ul:my-8 prose-ul:space-y-3
                  prose-li:text-neutral-600 prose-li:pl-2
                  prose-strong:text-brand-navy prose-strong:font-bold
                  prose-a:text-brand-red prose-a:font-semibold prose-a:no-underline hover:prose-a:text-brand-navy prose-a:transition-colors
                  prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* CTA Section */}
            <div className="bg-brand-navy text-white rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">

              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-4xl font-bold mb-6 tracking-tight">
                  Besoin d&apos;aide pour votre véhicule ?
                </h3>
                <p className="text-neutral-300 mb-10 leading-relaxed">
                  Service d&apos;enlèvement gratuit 24h/24, 7j/7 • Intervention rapide • Certificat VHU garanti
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:0979049486"
                    className="inline-flex items-center justify-center gap-2 bg-brand-red text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-red/90 hover:scale-[1.02] transition-all shadow-lg"
                  >
                    <Phone size={20} weight="bold" />
                    <span>09 79 04 94 86</span>
                  </a>
                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-full font-semibold transition-all"
                  >
                    <ArrowLeft size={20} weight="bold" />
                    <span>Retour au blog</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-brand-navy mb-8">
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
                      className="bg-white rounded-2xl p-6 border border-neutral-200 hover:border-brand-red/20 hover:shadow-md transition-all duration-500 group block"
                    >
                      <span className="text-xs font-semibold text-brand-red mb-3 block uppercase tracking-wide">
                        {relatedPost.category}
                      </span>
                      <h4 className="text-lg font-bold text-brand-navy mb-3 group-hover:text-brand-red transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-neutral-600 line-clamp-2 mb-4 leading-relaxed text-sm">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-brand-red font-semibold text-sm group-hover:gap-3 transition-all">
                        <span>Lire l&apos;article</span>
                        <ArrowLeft size={14} weight="bold" className="rotate-180" />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </article>
      </main>

      <VHUCertification />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
