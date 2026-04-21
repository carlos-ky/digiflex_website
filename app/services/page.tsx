import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import CTABand from '@/components/CTABand';
import { getServiceCategories, getServices } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Services — Digiflex',
  description:
    'Brand Book, Site Web, Social Media, Publicité Digitale, Photography & Videography. Des solutions sur mesure pour transformer votre entreprise en marque.',
};

export default async function ServicesPage() {
  const [categories, services] = await Promise.all([
    getServiceCategories(),
    getServices(),
  ])

  return (
    <>
      <section className="pt-40 pb-24 px-[4%]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="text-xs tracking-[0.2em] uppercase text-gris-moyen mb-6 block">
              Ce que nous faisons
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              className="font-display leading-[1.15] mb-3"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
            >
              Chaque entreprise mérite
              <br />
              une image à la hauteur
              <br />
              de son ambition.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg leading-relaxed text-gris-graphite max-w-2xl mb-20">
              Nous ne vendons pas des packs. Nous commençons par comprendre votre
              business, puis nous construisons une solution sur mesure. Stratégie
              d&apos;abord, exécution ensuite.
            </p>
          </Reveal>

          <div className="space-y-20">
            {categories.map((category, ci) => {
              const categoryServices = services.filter(
                (s) => s.category_id === category.id
              )
              if (categoryServices.length === 0) return null

              return (
                <div key={category.id}>
                  <Reveal delay={ci * 0.05}>
                    <div className="mb-8">
                      <p className="text-xs tracking-[0.2em] uppercase text-gris-moyen mb-1">
                        {String(ci + 1).padStart(2, '0')}
                      </p>
                      <h2 className="font-display text-3xl font-light mb-2">
                        {category.name}
                      </h2>
                      {category.description && (
                        <p className="text-sm text-gris-graphite max-w-xl">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </Reveal>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {categoryServices.map((service, i) => (
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
                              {service.includes.map((item) => (
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
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  )
}