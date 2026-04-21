import { getServiceBySlug, getServices } from '@/lib/services'
import { supabaseServer } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import CTABand from '@/components/CTABand'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) return { title: 'Service introuvable — Digiflex' }

  return {
    title: `${service.name} — Digiflex`,
    description: service.description,
    openGraph: {
      title: `${service.name} — Digiflex`,
      description: service.description,
    },
  }
}

async function getRelatedProjects(category: string | null) {
  if (!category) return []

  const { data } = await supabaseServer
    .from('portfolio_projects')
    .select('*')
    .eq('category', category)
    .order('display_order', { ascending: true })
    .limit(6)

  return data ?? []
}

const gradients = [
  'linear-gradient(135deg, #1a1a2e, #16213e)',
  'linear-gradient(135deg, #2d2d2d, #1a1a1a)',
  'linear-gradient(135deg, #3d1f1f, #1a1a1a)',
  'linear-gradient(135deg, #1f3d2d, #1a1a1a)',
  'linear-gradient(135deg, #3d3d1f, #1a1a1a)',
  'linear-gradient(135deg, #1f2d3d, #1a1a1a)',
]

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [service, allServices] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
  ])

  if (!service) notFound()

  const relatedProjects = await getRelatedProjects(service.portfolio_category)
  const otherServices = allServices.filter((s) => s.slug !== slug)

  return (
    <>
      <section className="pt-40 pb-24 px-[4%]">
        <div className="max-w-5xl mx-auto">

          {/* Retour */}
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gris-moyen hover:text-noir transition-colors mb-12"
          >
            ← Retour aux services
          </Link>

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <div>
              <div
                className="font-display text-8xl font-light leading-none mb-6"
                style={{ color: '#E8E8E8' }}
              >
                {service.number}
              </div>
              <h1
                className="font-display leading-[1.15] mb-6"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
              >
                {service.name}
              </h1>
              <p className="text-lg leading-relaxed text-gris-graphite">
                {service.description}
              </p>
            </div>

            <div>
              {/* Ce qui est inclus */}
              <div
                className="p-8"
                style={{ backgroundColor: '#F8F6F0', border: '1px solid #E8E8E8' }}
              >
                <h3
                  className="text-xs tracking-[0.2em] uppercase mb-6"
                  style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
                >
                  Ce qui est inclus
                </h3>
                <ul className="space-y-3">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
                    >
                      <span className="mt-0.5 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-6 flex gap-4">
                <Link
                  href="/contact"
                  className="flex-1 text-center px-6 py-4 text-xs tracking-widest uppercase font-bold transition-colors"
                  style={{
                    backgroundColor: '#0E0E0E',
                    color: '#F8F6F0',
                  }}
                >
                  Demander un devis
                </Link>
                <Link
                  href="/#contact"
                  className="flex-1 text-center px-6 py-4 text-xs tracking-widest uppercase font-bold transition-colors border"
                  style={{
                    borderColor: '#0E0E0E',
                    color: '#0E0E0E',
                  }}
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>

          {/* Description longue */}
          {service.long_description && (
            <div className="mb-20 max-w-3xl">
              <h2
                className="font-display mb-8"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              >
                Notre approche
              </h2>
              <div>
                {service.long_description.split('\n').map((paragraph, i) =>
                  paragraph.trim() ? (
                    <p
                      key={i}
                      className="text-base leading-relaxed mb-4"
                      style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {paragraph}
                    </p>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Projets liés */}
          {relatedProjects.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8">
                <h2
                  className="font-display"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                >
                  Nos réalisations en {service.name}
                </h2>
                <Link
                  href="/portfolio"
                  className="text-xs tracking-widest uppercase text-gris-moyen hover:text-noir transition-colors"
                >
                  Voir tout →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedProjects.map((project: any, i: number) => {
                  const projectSlug = project.client_name
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-z0-9]+/g, '-')
                  return (
                    <Link key={project.id} href={`/portfolio/${projectSlug}`} className="block group">
                      <div
                        className="relative aspect-[4/3] overflow-hidden"
                        style={{ background: gradients[i % gradients.length] }}
                      >
                        {project.cover_image && (
                          <Image
                            src={project.cover_image}
                            alt={project.client_name}
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-300 z-10" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                          <p
                            className="text-xs tracking-widest uppercase mb-1"
                            style={{ color: 'rgba(255,255,255,0.5)' }}
                          >
                            {project.category}
                          </p>
                          <p className="font-display text-lg font-semibold text-white">
                            {project.client_name}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Autres services */}
          {otherServices.length > 0 && (
            <div>
              <h2
                className="font-display mb-8"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              >
                Nos autres services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherServices.map((s) => (
                  <Link key={s.id} href={`/services/${s.slug}`} className="block group">
                    <div
                      className="p-6 border transition-all duration-300 group-hover:border-noir group-hover:-translate-y-1"
                      style={{ borderColor: '#E8E8E8', backgroundColor: '#F8F6F0' }}
                    >
                      <div
                        className="font-display text-3xl font-light mb-3 transition-colors"
                        style={{ color: '#E8E8E8' }}
                      >
                        {s.number}
                      </div>
                      <h3 className="font-display text-lg font-semibold mb-2">
                        {s.name}
                      </h3>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
                      >
                        {s.description.substring(0, 80)}...
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
      <CTABand />
    </>
  )
}