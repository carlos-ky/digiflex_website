import Link from 'next/link';
import Image from 'next/image';
import Reveal from './Reveal';
import { getFeaturedProjects } from '@/lib/portfolio';

const gradients = [
  'linear-gradient(135deg, #1a1a2e, #16213e)',
  'linear-gradient(135deg, #2d2d2d, #1a1a1a)',
  'linear-gradient(135deg, #3d1f1f, #1a1a1a)',
  'linear-gradient(135deg, #1f3d2d, #1a1a1a)',
  'linear-gradient(135deg, #3d3d1f, #1a1a1a)',
  'linear-gradient(135deg, #1f2d3d, #1a1a1a)',
];

export default async function PortfolioPreview() {
  const projects = await getFeaturedProjects();

  return (
    <section className="py-24 px-[4%]" id="portfolio">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <span className="text-xs tracking-[0.2em] uppercase text-gris-moyen mb-6 block">
            Nos réalisations
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="font-display leading-[1.15] mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Le travail parle
            <br />
            de lui-même.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg leading-relaxed text-gris-graphite max-w-2xl mb-12">
            Chaque projet est une histoire de transformation. Voici quelques-unes
            de nos collaborations.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.1}>
              <div
                className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
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
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-500 z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 z-20">
                  <div className="text-[0.65rem] tracking-[0.15em] uppercase text-gris-moyen mb-1">
                    {project.category}
                  </div>
                  <div className="font-display text-xl font-semibold text-blanc-casse">
                    {project.name}
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center font-display text-lg italic text-white/30 group-hover:opacity-0 transition-opacity duration-300 z-20">
                  {project.name}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-block px-10 py-3.5 border border-noir text-noir font-bold text-sm tracking-wider uppercase hover:bg-noir hover:text-blanc-casse transition-all"
            >
              Voir tout le portfolio
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}