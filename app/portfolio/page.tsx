import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { projects } from '@/data/portfolio';
import CTABand from '@/components/CTABand';

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

export default function PortfolioPage() {
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.1}>
                <div
                  className="group relative aspect-[16/10] overflow-hidden cursor-pointer"
                  style={{ background: gradients[i % gradients.length] }}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                      <div className="text-[0.65rem] tracking-[0.15em] uppercase text-gris-moyen mb-2">
                        {project.category} · {project.sector}
                      </div>
                      <div className="font-display text-2xl font-semibold text-blanc-casse mb-3">
                        {project.name}
                      </div>
                      <p className="text-sm text-gris-moyen max-w-sm mx-auto px-6">
                        {project.excerpt}
                      </p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                      <div className="text-center">
                        <div className="font-display text-2xl text-white/40 font-semibold">
                          {project.name}
                        </div>
                        <div className="text-xs text-white/20 mt-1 tracking-wider uppercase">
                          {project.category}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
