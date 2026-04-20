import Link from 'next/link';
import Image from 'next/image';
import Reveal from './Reveal';
import { getFeaturedBlogPosts } from '@/lib/blog';

const blogGradients = ['#1a1a2e', '#2d1f1f', '#1f2d1f'];

export default async function BlogPreview() {
  const blogPosts = await getFeaturedBlogPosts();

  return (
    <section className="py-24 px-[4%] bg-noir" id="blog">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <span className="text-xs tracking-[0.2em] uppercase text-gris-moyen mb-6 block">
            Insights
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="font-display text-blanc-casse leading-[1.15] mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            On partage ce
            <br />
            qu&apos;on sait.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg leading-relaxed text-gris-moyen max-w-2xl mb-12">
            Reflexions strategiques, conseils pratiques, et analyses du marche
            digital en Afrique de l&apos;Ouest.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="bg-noir border border-white/[0.08] hover:border-white/20 hover:-translate-y-1 transition-all duration-400">
                  <div
                    className="relative aspect-video overflow-hidden"
                    style={{ background: blogGradients[i % blogGradients.length] }}
                  >
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={75}
                        unoptimized
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-400"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-sm text-gris-moyen italic">
                        Article a venir
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-gris-moyen tracking-wider uppercase">
                        {post.date}
                      </span>
                      {post.category && (
                        <>
                          <span className="text-gris-moyen text-xs">·</span>
                          <span className="text-xs text-gris-moyen tracking-wider uppercase">
                            {post.category}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-semibold text-blanc-casse mb-3 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gris-moyen">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-block px-10 py-3.5 border border-white/20 text-blanc-casse font-bold text-sm tracking-wider uppercase hover:bg-white hover:text-noir transition-all"
            >
              Voir tous les articles
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}