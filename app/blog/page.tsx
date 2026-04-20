import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import CTABand from '@/components/CTABand';
import { getBlogPosts } from '@/lib/blog';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — Digiflex',
  description:
    "Reflexions strategiques, conseils pratiques, et analyses du marche digital en Afrique de l'Ouest.",
};

const blogGradients = ['#1a1a2e', '#2d1f1f', '#1f2d1f'];

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <>
      <section className="pt-40 pb-24 px-[4%]">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <span className="text-xs tracking-[0.2em] uppercase text-gris-moyen mb-6 block">
              Blog
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              className="font-display leading-[1.15] mb-3"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
            >
              On partage ce qu&apos;on sait.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-gris-graphite max-w-2xl mb-16">
              Reflexions strategiques, conseils pratiques, et analyses du marche
              digital en Afrique de l&apos;Ouest.
            </p>
          </Reveal>

          <div className="space-y-8">
            {blogPosts.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <article className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-0 border border-gris-clair group-hover:border-noir transition-all duration-400 group-hover:-translate-y-1">
                    <div
                      className="relative aspect-video md:aspect-auto overflow-hidden"
                      style={{ background: blogGradients[i % blogGradients.length] }}
                    >
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          quality={75}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-gris-moyen italic">
                          Article a venir
                        </div>
                      )}
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-xs text-gris-moyen tracking-wider uppercase">
                          {post.date}
                        </span>
                        <span className="text-xs text-gris-moyen">·</span>
                        <span className="text-xs text-gris-moyen tracking-wider uppercase">
                          {post.category}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl font-semibold mb-3 leading-snug group-hover:text-gris-graphite transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-gris-graphite mb-4">
                        {post.excerpt}
                      </p>
                      <span className="text-xs tracking-widest uppercase text-gris-moyen border-b border-gris-clair pb-0.5 group-hover:border-noir group-hover:text-noir transition-colors">
                        Lire l'article →
                      </span>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}