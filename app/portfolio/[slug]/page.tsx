import { supabaseServer } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import CTABand from '@/components/CTABand'
import { projects as fallbackProjects } from '@/data/portfolio'
import GalleryLightbox from '@/components/GalleryLightbox'

async function getProject(slug: string) {
  const { data } = await supabaseServer
    .from('portfolio_projects')
    .select('*')
    .order('display_order', { ascending: true })

  if (data && data.length > 0) {
    const project = data.find((p: any) => {
      const projectSlug = p.client_name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
      return projectSlug === slug
    })
    if (project) return { source: 'db', data: project }
  }

  const project = fallbackProjects.find((p) => p.slug === slug)
  if (project) return { source: 'static', data: project }

  return null
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  )
  return match ? match[1] : null
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match ? match[1] : null
}

function isVideoUrl(url: string): boolean {
  return (
    url.includes('youtube.com') ||
    url.includes('youtu.be') ||
    url.includes('vimeo.com') ||
    url.includes('facebook.com/watch') ||
    url.includes('tiktok.com')
  )
}

function MediaItem({ url, alt }: { url: string; alt: string }) {
  if (getYouTubeId(url)) {
    const id = getYouTubeId(url)
    return (
      <div className="relative aspect-video w-full overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={alt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  if (getVimeoId(url)) {
    const id = getVimeoId(url)
    return (
      <div className="relative aspect-video w-full overflow-hidden">
        <iframe
          src={`https://player.vimeo.com/video/${id}`}
          title={alt}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  if (isVideoUrl(url)) {
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
        
        <a  href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-widest uppercase text-white/60 border border-white/20 px-6 py-3"
        >
          Voir la vidéo →
        </a>
      </div>
    )
  }

  // Image
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      <Image
        src={url}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={80}
        className="object-cover"
      />
    </div>
  )
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const result = await getProject(params.slug)
  if (!result) notFound()

  const isDB = result.source === 'db'
  const p = result.data as any

  const name = isDB ? p.client_name : p.name
  const category = p.category
  const sector = p.sector
  const year = isDB ? p.year?.toString() : p.year
  const excerpt = isDB ? p.short_description : p.excerpt
  const description = isDB ? p.long_description ?? p.short_description : p.description
  const coverImage = isDB ? p.cover_image : p.coverImage
  const gallery: string[] = isDB ? p.gallery_images ?? [] : p.images ?? []

  return (
    <>
      <section className="pt-40 pb-24 px-[4%]">
        <div className="max-w-5xl mx-auto">

          {/* Retour */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gris-moyen hover:text-noir transition-colors mb-12"
          >
            ← Retour au portfolio
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs tracking-[0.2em] uppercase text-gris-moyen">
                {category}
              </span>
              {sector && (
                <>
                  <span className="text-gris-moyen">·</span>
                  <span className="text-xs tracking-[0.2em] uppercase text-gris-moyen">
                    {sector}
                  </span>
                </>
              )}
              {year && (
                <>
                  <span className="text-gris-moyen">·</span>
                  <span className="text-xs tracking-[0.2em] uppercase text-gris-moyen">
                    {year}
                  </span>
                </>
              )}
            </div>
            <h1
              className="font-display leading-[1.15] mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
            >
              {name}
            </h1>
            <p className="text-lg leading-relaxed text-gris-graphite max-w-2xl">
              {excerpt}
            </p>
          </div>

          {/* Image de couverture */}
          {coverImage && (
            <div className="relative aspect-[16/9] mb-16 overflow-hidden">
              <Image
                src={coverImage}
                alt={name}
                fill
                sizes="100vw"
                quality={85}
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Description */}
          {description && (
            <div className="mb-16 max-w-3xl">
              <p className="text-base leading-relaxed text-gris-graphite whitespace-pre-line">
                {description}
              </p>
            </div>
          )}

          {/* Galerie — images et vidéos */}
            {gallery.length > 0 && (
            <div>
                <h2
                className="font-display mb-8"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                >
                Galerie
                </h2>
                <GalleryLightbox items={gallery} projectName={name} />
            </div>
            )}

        </div>
      </section>
      <CTABand />
    </>
  )
}