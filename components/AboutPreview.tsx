import Link from 'next/link';
import Reveal from './Reveal';
import { siteConfig } from '@/lib/config';

const stats = [
  { number: '12+', label: 'Clients accompagnés' },
  { number: '3', label: 'Ans d\'expérience' },
  { number: '5', label: 'Expertises maîtrisées' },
  { number: '100%', label: 'Sur mesure' },
]

export default function AboutPreview() {
  return (
    <section className="py-24 px-[4%]" id="about">
      <div className="max-w-7xl mx-auto">

        {/* Header + Citation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
          <div>
            <Reveal>
              <span className="text-xs tracking-[0.2em] uppercase text-gris-moyen mb-6 block">
                À propos
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="font-display leading-[1.15] mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              >
                Bâtir des marques
                <br />
                qui s&apos;imposent.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg leading-relaxed text-gris-graphite mb-8 max-w-xl">
                Digiflex est née d&apos;une conviction : les entreprises africaines
                méritent une communication à la hauteur de leur ambition. Nous appliquons
                une approche stratégique, exécutée avec
                obsession.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                href="/about"
                className="inline-block px-8 py-3 border border-noir text-noir font-bold text-sm tracking-wider uppercase hover:bg-noir hover:text-blanc-casse transition-all"
              >
                En savoir plus
              </Link>
            </Reveal>
          </div>

          {/* Citation fondateur */}
          <Reveal delay={0.2}>
            <div
              className="p-10 relative"
              style={{ backgroundColor: '#0E0E0E' }}
            >
              <div
                className="font-display text-6xl font-light leading-none absolute top-6 left-8"
                style={{ color: '#2A2A2A' }}
              >
                "
              </div>
              <p
                className="font-display leading-relaxed pt-8"
                style={{ color: '#F8F6F0', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
              >
                Le branding et la communication sont des outils de souveraineté
                culturelle et économique pour l&apos;Afrique.
              </p>
              <div className="mt-6 pt-6" style={{ borderTop: '1px solid #2A2A2A' }}>
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
                >
                  {siteConfig.founder.name} — Fondateur, Digiflex
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Chiffres clés */}
        <Reveal delay={0.1}>
          <div
            className="grid grid-cols-2 lg:grid-cols-4"
            style={{ borderTop: '1px solid #E8E8E8', borderLeft: '1px solid #E8E8E8' }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-8 text-center"
                style={{ borderRight: '1px solid #E8E8E8', borderBottom: '1px solid #E8E8E8' }}
              >
                <p
                  className="font-display font-light mb-2"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#0E0E0E', lineHeight: 1 }}
                >
                  {stat.number}
                </p>
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}