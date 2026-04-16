import Link from 'next/link';
import Reveal from './Reveal';
import { blogPosts } from '@/data/blog';

const blogGradients = ['#1a1a2e', '#2d1f1f', '#1f2d1f'];

export default function BlogPreview() {
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
            Réflexions stratégiques, conseils pratiques, et analyses du marché
            digital en Afrique de l&apos;Ouest.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.1}>
              <div className="group bg-noir border border-white/[0.08] hover:border-white/20 hover:-translate-y-1 transition-all duration-400">
                <div
                  className="aspect-video flex items-center justify-center text-sm text-gris-moyen italic"
                  style={{ background: blogGradients[i % blogGradients.length] }}
                >
                  Article à venir
                </div>
                <div className="p-6">
                  <div className="text-xs text-gris-moyen tracking-wider uppercase mb-2">
                    {post.date}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-blanc-casse mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gris-moyen">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
