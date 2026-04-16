import Reveal from './Reveal';

const steps = [
  {
    num: '01',
    title: 'Diagnostic',
    text: "On commence toujours par comprendre. Votre marché, vos clients, vos concurrents, vos vrais problèmes. Pas de solution sans diagnostic. Pas de devis sans conversation.",
  },
  {
    num: '02',
    title: 'Stratégie',
    text: "Sur la base du diagnostic, nous construisons une proposition sur mesure. Chaque action répond à un objectif. Chaque contenu sert une intention. Rien n'est laissé au hasard.",
  },
  {
    num: '03',
    title: 'Exécution',
    text: "C'est là que la différence se voit. Une exécution obsessionnelle dans les détails — visuels, contenus, livrables — à un niveau que vous n'avez jamais vu chez un prestataire local.",
  },
];

export default function Approach() {
  return (
    <section className="py-24 px-[4%] bg-noir">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <span className="text-xs tracking-[0.2em] uppercase text-gris-moyen mb-6 block">
            Notre approche
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="font-display text-blanc-casse leading-[1.15] mb-12"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Trois étapes.
            <br />
            Un standard.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.15}>
              <div
                className={`p-10 relative ${
                  i < steps.length - 1
                    ? 'md:border-r border-b md:border-b-0 border-white/[0.08]'
                    : ''
                }`}
              >
                <div className="absolute top-4 right-6 font-display text-7xl font-light text-white/[0.06] leading-none">
                  {step.num}
                </div>
                <h3 className="font-display text-xl font-semibold text-blanc-casse mb-4">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gris-moyen">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
