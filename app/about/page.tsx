import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import Trust from '@/components/Trust';
import CTABand from '@/components/CTABand';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'À propos — Digiflex',
  description:
    'Digiflex est une agence de branding et communication premium fondée par Carlos KY à Ouagadougou.',
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-24 px-[4%]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <Reveal>
                <span className="text-xs tracking-[0.2em] uppercase text-gris-moyen mb-6 block">
                  À propos
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h1
                  className="font-display leading-[1.15] mb-8"
                  style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
                >
                  Bâtir des marques
                  <br />
                  qui s&apos;imposent.
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg leading-relaxed text-gris-graphite mb-6">
                  Digiflex est née d&apos;une conviction : les entreprises africaines
                  méritent une communication à la hauteur de leur ambition. Pas des
                  templates, pas des packs — une approche stratégique, exécutée avec
                  obsession.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-lg leading-relaxed text-gris-graphite mb-6">
                  Dans un marché où la communication digitale se résume souvent à
                  &quot;faire des posts&quot;, Digiflex propose une alternative radicale :
                  commencer par comprendre le business, construire une stratégie qui
                  fait sens, puis exécuter chaque détail avec un niveau de qualité
                  que le client ressent immédiatement.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="text-lg leading-relaxed text-gris-graphite mb-8">
                  Le premium Digiflex ne réside pas dans le prix — il réside dans
                  l&apos;expérience. De la première conversation WhatsApp à la livraison
                  finale, chaque interaction reflète un standard de professionnalisme
                  et d&apos;exigence qui fait la différence.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="sticky top-32">
                <div className="aspect-[3/4] bg-gris-clair border border-gris-clair flex items-center justify-center text-gris-moyen italic text-sm mb-6">
                  Photo de {siteConfig.founder.name}
                </div>
                <h3 className="font-display text-2xl font-semibold mb-1">
                  {siteConfig.founder.name}
                </h3>
                <p className="text-sm text-gris-moyen mb-2">
                  {siteConfig.founder.role}
                </p>
                <p className="text-sm text-gris-graphite leading-relaxed">
                  {siteConfig.founder.title}. Convaincu que le branding et la
                  communication sont des outils de souveraineté culturelle et
                  économique pour l&apos;Afrique.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-24">
            <Reveal>
              <h2
                className="font-display mb-12"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}
              >
                Nos valeurs
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Stratégie d\'abord',
                  text: 'Chaque action répond à un objectif. Nous ne postons pas — nous construisons. Pas de devis sans diagnostic, pas de solution sans compréhension.',
                },
                {
                  title: 'Exécution obsessionnelle',
                  text: 'Le premium se ressent, il ne s\'annonce pas. Chaque livrable — un post, un Brand Book, un site — reflète un standard d\'excellence que le client voit et ressent.',
                },
                {
                  title: 'Sur mesure, toujours',
                  text: 'Pas de packs rigides, pas de solutions génériques. Chaque collaboration commence par une conversation et aboutit à une proposition qui correspond exactement au besoin.',
                },
              ].map((value, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <div className="border-t border-noir pt-6">
                    <h3 className="font-display text-xl font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gris-graphite">
                      {value.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Trust />
      <CTABand />
    </>
  );
}
