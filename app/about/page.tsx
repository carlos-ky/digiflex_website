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

const stats = [
  { number: '12+', label: 'Clients accompagnés' },
  { number: '3', label: 'Ans d\'expérience' },
  { number: '5', label: 'Expertises maîtrisées' },
  { number: '100%', label: 'Sur mesure' },
]

export default function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-24 px-[4%]">
        <div className="max-w-7xl mx-auto">

          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
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
                <p className="text-lg leading-relaxed text-gris-graphite">
                  Le premium Digiflex ne réside pas dans le prix — il réside dans
                  l&apos;expérience. De la première conversation WhatsApp à la livraison
                  finale, chaque interaction reflète un standard de professionnalisme
                  et d&apos;exigence qui fait la différence.
                </p>
              </Reveal>
            </div>

            {/* Bloc fondateur */}
            <Reveal delay={0.2}>
              <div className="sticky top-32 space-y-6">
                {/* Citation */}
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
                    style={{ color: '#F8F6F0', fontSize: 'clamp(1.1rem, 2vw, 1.3rem)' }}
                  >
                    Le branding et la communication sont des outils de souveraineté
                    culturelle et économique pour l&apos;Afrique.
                  </p>
                  <div className="mt-6 pt-6" style={{ borderTop: '1px solid #2A2A2A' }}>
                    <p
                      className="text-xs tracking-widest uppercase mb-1"
                      style={{ color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {siteConfig.founder.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {siteConfig.founder.role} — Digiflex
                    </p>
                  </div>
                </div>

                {/* Infos fondateur */}
                <div
                  className="p-8"
                  style={{ border: '1px solid #E8E8E8' }}
                >
                  <p
                    className="text-xs tracking-[0.2em] uppercase mb-4"
                    style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    Le fondateur
                  </p>
                  <h3 className="font-display text-2xl font-semibold mb-2">
                    {siteConfig.founder.name}
                  </h3>
                  <p
                    className="text-sm text-gris-moyen mb-4"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {siteConfig.founder.role}
                  </p>
                  <p
                    className="text-sm leading-relaxed text-gris-graphite"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {siteConfig.founder.title}. Convaincu que le branding et la
                    communication sont des instruments de croissance pour les
                    entrepreneurs africains qui veulent s&apos;imposer.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Chiffres clés */}
          <Reveal>
            <div className="mb-24">
              <h2
                className="font-display mb-12"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}
              >
                En chiffres
              </h2>
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
            </div>
          </Reveal>

          {/* Valeurs */}
          <div>
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
                  text: 'Le premium se ressent, il ne s\'annonce pas. Chaque livrable reflète un standard d\'excellence que le client voit et ressent immédiatement.',
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