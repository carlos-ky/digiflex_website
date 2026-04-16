import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { blogPosts } from '@/data/blog';
import CTABand from '@/components/CTABand';

export const metadata: Metadata = {
  title: 'Blog — Digiflex',
  description:
    'Réflexions stratégiques, conseils pratiques, et analyses du marché digital en Afrique de l\'Ouest.',
};

const blogGradients = ['#1a1a2e', '#2d1f1f', '#1f2d1f'];

export default function BlogPage() {
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
              Réflexions stratégiques, conseils pratiques, et analyses du marché
              digital en Afrique de l&apos;Ouest.
            </p>
          </Reveal>

          <div className="space-y-8">
            {blogPosts.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.1}>
                <article className="group grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-0 border border-gris-clair hover:border-noir transition-all duration-400 hover:-translate-y-1">
                  <div
                    className="aspect-video md:aspect-auto flex items-center justify-center text-sm text-gris-moyen italic"
                    style={{ background: blogGradients[i % blogGradients.length] }}
                  >
                    Article à venir
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
                    <h2 className="font-display text-2xl font-semibold mb-3 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-gris-graphite">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
