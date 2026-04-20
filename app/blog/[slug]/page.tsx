import { supabaseServer } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import CTABand from '@/components/CTABand'
import { blogPosts as fallbackPosts } from '@/data/blog'

async function getArticle(slug: string) {
  const { data } = await supabaseServer
    .from('blog_articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (data) return { source: 'db', data }

  const post = fallbackPosts.find((p) => p.slug === slug)
  if (post) return { source: 'static', data: post }

  return null
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const result = await getArticle(params.slug)
  if (!result) notFound()

  const isDB = result.source === 'db'
  const p = result.data as any

  const title = p.title
  const excerpt = isDB ? p.excerpt : p.excerpt
  const content = isDB ? p.content : p.content
  const coverImage = isDB ? p.cover_image : p.coverImage
  const category = isDB ? p.category : p.category
  const date = isDB
    ? p.published_at
      ? new Date(p.published_at).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : ''
    : p.date
  const readTime = isDB ? '5 min' : p.readTime

  return (
    <>
      <section className="pt-40 pb-24 px-[4%]">
        <div className="max-w-3xl mx-auto">

          {/* Retour */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gris-moyen hover:text-noir transition-colors mb-12"
          >
            ← Retour au blog
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {category && (
                <span className="text-xs tracking-[0.2em] uppercase text-gris-moyen">
                  {category}
                </span>
              )}
              {category && date && (
                <span className="text-gris-moyen text-xs">·</span>
              )}
              {date && (
                <span className="text-xs tracking-[0.2em] uppercase text-gris-moyen">
                  {date}
                </span>
              )}
              {readTime && (
                <>
                  <span className="text-gris-moyen text-xs">·</span>
                  <span className="text-xs tracking-[0.2em] uppercase text-gris-moyen">
                    {readTime} de lecture
                  </span>
                </>
              )}
            </div>
            <h1
              className="font-display leading-[1.15] mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              {title}
            </h1>
            {excerpt && (
              <p className="text-lg leading-relaxed text-gris-graphite">
                {excerpt}
              </p>
            )}
          </div>

          {/* Image de couverture */}
          {coverImage && (
            <div className="relative aspect-[16/9] mb-16 overflow-hidden">
              <Image
                src={coverImage}
                alt={title}
                fill
                sizes="100vw"
                quality={85}
                unoptimized
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Contenu */}
          {content && content !== 'Article a venir prochainement.' && (
            <div
              className="prose prose-lg max-w-none"
              style={{
                color: '#4A4A4A',
                fontFamily: 'DM Sans, sans-serif',
                lineHeight: '1.8',
              }}
            >
              {content.split('\n').map((paragraph: string, i: number) =>
                paragraph.trim() ? (
                  <p
                    key={i}
                    className="mb-6 text-base leading-relaxed"
                    style={{ color: '#4A4A4A' }}
                  >
                    {paragraph}
                  </p>
                ) : null
              )}
            </div>
          )}

          {/* Auteur */}
          <div
            className="mt-16 pt-8 flex items-center gap-4"
            style={{ borderTop: '1px solid #E8E8E8' }}
          >
            <div
              className="w-10 h-10 flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: '#0E0E0E', color: '#F8F6F0' }}
            >
              D
            </div>
            <div>
              <p className="text-sm font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Digiflex
              </p>
              <p className="text-xs text-gris-moyen" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Agence de branding et communication — Ouagadougou
              </p>
            </div>
          </div>

        </div>
      </section>
      <CTABand />
    </>
  )
}