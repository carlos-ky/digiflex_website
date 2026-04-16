import Reveal from './Reveal';
import { clients } from '@/data/portfolio';

export default function Trust() {
  return (
    <section className="py-24 px-[4%] bg-noir text-center">
      <Reveal>
        <h2
          className="font-display text-blanc-casse mb-3"
          style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}
        >
          Ils nous ont fait confiance
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-xs tracking-[0.2em] uppercase text-gris-moyen mb-16">
          Marques avec lesquelles nous avons collaboré
        </p>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 max-w-6xl mx-auto">
        {clients.map((client, i) => (
          <Reveal key={client.name} delay={i * 0.05}>
            <div className="group aspect-square bg-white/[0.03] border border-white/[0.08] flex flex-col items-center justify-center p-5 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1 transition-all duration-400">
              <div className="w-14 h-14 rounded-full bg-blanc-casse flex items-center justify-center mb-3 font-display font-bold text-xl text-noir tracking-tight">
                {client.initials}
              </div>
              <span className="text-[0.7rem] text-gris-moyen tracking-wider uppercase text-center font-medium leading-tight group-hover:text-blanc-casse transition-colors">
                {client.name}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
