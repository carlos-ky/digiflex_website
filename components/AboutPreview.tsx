import Link from 'next/link';
import Reveal from './Reveal';
import { siteConfig } from '@/lib/config';

export default function AboutPreview() {
  return (
    <section className="py-24 px-[4%]" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="aspect-[3/4] bg-gris-clair border border-gris-clair flex items-center justify-center text-gris-moyen italic text-sm">
            Photo de {siteConfig.founder.name}
            <br />
            {siteConfig.founder.role}
          </div>
        </Reveal>

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
            <p className="text-lg leading-relaxed text-gris-graphite mb-4 max-w-xl">
              Digiflex est née d&apos;une conviction : les entreprises africaines
              méritent une communication à la hauteur de leur ambition. Pas des
              templates, pas des packs — une approche stratégique, exécutée avec
              obsession.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-lg leading-relaxed text-gris-graphite mb-8 max-w-xl">
              Fondée et dirigée par{' '}
              <strong className="text-noir">{siteConfig.founder.name}</strong>,{' '}
              {siteConfig.founder.title}, l&apos;agence accompagne les entrepreneurs
              et gérants de PME qui veulent transformer leur entreprise en marque.
            </p>
          </Reveal>

          <div className="space-y-4">
            {[
              {
                title: 'Stratégie d\'abord.',
                text: 'Chaque action répond à un objectif. Nous ne postons pas — nous construisons.',
              },
              {
                title: 'Exécution obsessionnelle.',
                text: "Le premium se ressent, il ne s'annonce pas. Chaque livrable reflète un standard que vous n'avez jamais vu.",
              },
              {
                title: 'Diagnostic avant tout.',
                text: "Nous n'envoyons pas de devis. Nous commençons par comprendre.",
              },
            ].map((value, i) => (
              <Reveal key={i} delay={0.3 + i * 0.1}>
                <div className="flex gap-4 items-start">
                  <span className="font-display text-3xl font-light text-gris-clair leading-none flex-shrink-0 w-8">
                    —
                  </span>
                  <p className="text-sm leading-relaxed text-gris-graphite">
                    <strong className="text-noir">{value.title}</strong>{' '}
                    {value.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.6}>
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-block px-8 py-3 border border-noir text-noir font-bold text-sm tracking-wider uppercase hover:bg-noir hover:text-blanc-casse transition-all"
              >
                En savoir plus
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
