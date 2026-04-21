import Link from 'next/link';
import Reveal from './Reveal';
import { getServices } from '@/lib/services';

export default async function Services() {
  const allServices = await getServices()
  const homeServices = allServices.filter((s) => s.is_home)

  return (
    <section className="py-24 px-[4%]" id="services">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <span className="text-xs tracking-[0.2em] uppercase text-gris-moyen mb-6 block">
            Ce que nous faisons
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="font-display leading-[1.15] mb-3"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Chaque entreprise mérite
            <br />
            une image à la hauteur
            <br />
            de son ambition.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg leading-relaxed text-gris-graphite max-w-2xl mb-12">
            Nous ne vendons pas des packs. Nous commençons par comprendre votre
            business, puis nous construisons une solution sur mesure. Stratégie
            d&apos;abord, exécution ensuite.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {homeServices.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.1}>
              <Link href={`/services/${service.slug}`} className="block h-full">
                <div className="group border border-gris-clair hover:border-noir p-8 h-full transition-all duration-400 hover:-translate-y-1 bg-blanc-casse cursor-pointer">
                  <div className="font-display text-5xl font-light text-gris-clair group-hover:text-noir transition-colors leading-none mb-4">
                    {service.number}
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-4">
                    {service.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-gris-graphite mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-1.5 text-xs text-gris-moyen mb-6">
                    {service.includes.slice(0, 3).map((item) => (
                      <li key={item} className="pl-4 relative">
                        <span className="absolute left-0">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="text-xs tracking-widest uppercase text-gris-moyen border-b border-gris-clair pb-0.5 group-hover:border-noir group-hover:text-noir transition-colors">
                    En savoir plus →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block px-10 py-3.5 border border-noir text-noir font-bold text-sm tracking-wider uppercase hover:bg-noir hover:text-blanc-casse transition-all"
            >
              Voir tous nos services
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}