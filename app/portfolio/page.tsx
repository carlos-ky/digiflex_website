import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import CTABand from '@/components/CTABand';
import { getProjects } from '@/lib/portfolio';
import Image from 'next/image';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Portfolio — Digiflex',
  description:
    'Découvrez nos réalisations : branding, social media, shooting photo, couverture événementielle, développement web.',
};

const gradients = [
  'linear-gradient(135deg, #1a1a2e, #16213e)',
  'linear-gradient(135deg, #2d2d2d, #1a1a1a)',
  'linear-gradient(135deg, #3d1f1f, #1a1a1a)',
  'linear-gradient(135deg, #1f3d2d, #1a1a1a)',
  'linear-gradient(135deg, #3d3d1f, #1a1a1a)',
  'linear-gradient(135deg, #1f2d3d, #1a1a1a)',
];

// Ratios variés pour l'effet masonry
const ratios = [
  'aspect-[4/5]',
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-[4/3]',
  'aspect-[4/5]',
  'aspect-[4/3]',
]

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <section className="pt-40 pb-24 px-[4%]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="text-xs tracking-[0.2em] uppercase text-gris-moyen mb-6 block">
              Portfolio
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              className="font-display leading-[1.15] mb-3"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
            >
              Nos réalisations
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-gris-graphite max-w-2xl mb-16">
              Chaque projet est une histoire de transformation. Branding, communication
              digitale, shooting photo, couverture événementielle — voici notre travail.
            </p>
          </Reveal>

          {/* Masonry grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.08}>
                <Link href={`/portfolio/${project.slug}`} className="block break-inside-avoid mb-4">
                  <div
                    className={`group relative overflow-hidden ${ratios[i % ratios.length]}`}
                    style={{ background: gradients[i % gradients.length] }}
                  >
                    {project.coverImage && (
                      <Image
                        src={project.coverImage}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={75}
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}

                    {/* Overlay permanent léger */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />

                    {/* Infos toujours visibles en bas */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                      <div className="text-[0.6rem] tracking-[0.2em] uppercase text-white/50 mb-1">
                        {project.category}{project.sector ? ` · ${project.sector}` : ''}
                      </div>
                      <div className="font-display text-lg font-semibold text-white leading-snug">
                        {project.name}
                      </div>
                    </div>

                    {/* Hover — excerpt */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-20 flex items-center justify-center p-6">
                      <div className="text-center">
                        <div className="text-[0.6rem] tracking-[0.2em] uppercase text-white/50 mb-2">
                          {project.category}
                        </div>
                        <div className="font-display text-xl font-semibold text-white mb-3">
                          {project.name}
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed">
                          {project.excerpt}
                        </p>
                        <div className="mt-4 text-xs tracking-widest uppercase text-white/50 border-b border-white/20 pb-0.5 inline-block">
                          Voir le projet
                        </div>
                      </div>
                    </div>
                  </div>
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