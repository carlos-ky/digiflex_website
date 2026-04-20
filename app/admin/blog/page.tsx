import { supabaseServer } from '@/lib/supabase'
import Link from 'next/link'
import { DeleteBlogButton } from './DeleteBlogButton'

const MAX_FEATURED = 3

async function getArticles() {
  const { data } = await supabaseServer
    .from('blog_articles')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

export default async function AdminBlogPage() {
  const articles = await getArticles()
  const featuredCount = articles.filter((a: any) => a.is_featured).length

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p
            className="text-xs tracking-[0.3em] uppercase mb-2"
            style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
          >
            Gestion
          </p>
          <h2
            className="text-4xl font-light"
            style={{ color: '#F8F6F0', fontFamily: 'Cormorant Garamond, serif' }}
          >
            Blog
          </h2>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-6 py-3 text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
          style={{
            backgroundColor: '#F8F6F0',
            color: '#0E0E0E',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          + Nouvel article
        </Link>
      </div>

      {/* Compteur featured */}
      <div
        className="flex items-center gap-3 px-4 py-3 mb-6"
        style={{ backgroundColor: '#0A0A0A', border: '1px solid #1A1A1A' }}
      >
        <div className="flex gap-1">
          {Array.from({ length: MAX_FEATURED }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-1"
              style={{
                backgroundColor: i < featuredCount ? '#F8F6F0' : '#2A2A2A',
              }}
            />
          ))}
        </div>
        <p
          className="text-xs"
          style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
        >
          {featuredCount} / {MAX_FEATURED} articles mis en avant sur la page d'accueil
        </p>
      </div>

      {/* Liste */}
      {articles.length === 0 ? (
        <div className="p-12 text-center" style={{ border: '1px solid #1A1A1A' }}>
          <p className="text-sm mb-4" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
            Aucun article pour le moment.
          </p>
          <Link
            href="/admin/blog/new"
            className="text-xs tracking-widest uppercase"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}
          >
            Rediger le premier article →
          </Link>
        </div>
      ) : (
        <div style={{ border: '1px solid #1A1A1A' }}>
          {/* Thead */}
          <div
            className="grid grid-cols-12 px-6 py-3 text-xs tracking-widest uppercase"
            style={{ borderBottom: '1px solid #1A1A1A', color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
          >
            <span className="col-span-1">Image</span>
            <span className="col-span-3">Titre</span>
            <span className="col-span-2">Categorie</span>
            <span className="col-span-2">Statut</span>
            <span className="col-span-2">Accueil</span>
            <span className="col-span-2 text-right">Actions</span>
          </div>

          {/* Rows */}
          {articles.map((article: any, i: number) => (
            <div
              key={article.id}
              className="grid grid-cols-12 items-center px-6 py-4"
              style={{
                borderBottom: i < articles.length - 1 ? '1px solid #1A1A1A' : 'none',
                backgroundColor: article.is_featured ? '#0A0A0A' : 'transparent',
              }}
            >
              {/* Image */}
              <div className="col-span-1">
                {article.cover_image ? (
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="w-10 h-10 object-cover"
                  />
                ) : (
                  <div className="w-10 h-10" style={{ backgroundColor: '#1A1A1A' }} />
                )}
              </div>

              {/* Titre */}
              <div className="col-span-3">
                <p className="text-sm" style={{ color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
                  {article.title}
                </p>
                <p className="text-xs mt-0.5 truncate" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
                  /{article.slug}
                </p>
              </div>

              {/* Catégorie */}
              <div className="col-span-2">
                <span
                  className="text-xs px-2 py-1"
                  style={{ backgroundColor: '#1A1A1A', color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}
                >
                  {article.category ?? '—'}
                </span>
              </div>

              {/* Statut */}
              <div className="col-span-2">
                <span
                  className="text-xs px-2 py-1"
                  style={{
                    backgroundColor: article.status === 'published' ? '#0F2A1A' : '#1A1A1A',
                    color: article.status === 'published' ? '#4ade80' : '#9A9A9A',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {article.status === 'published' ? 'Publie' : 'Brouillon'}
                </span>
              </div>

              {/* Featured */}
              <div className="col-span-2">
                {article.is_featured ? (
                  <span
                    className="text-xs px-2 py-1"
                    style={{ backgroundColor: '#1A2A1A', color: '#4ade80', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    En avant
                  </span>
                ) : (
                  <span className="text-xs" style={{ color: '#2A2A2A', fontFamily: 'DM Sans, sans-serif' }}>
                    —
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-end gap-4">
                <Link
                  href={`/admin/blog/${article.id}`}
                  className="text-xs tracking-widest uppercase"
                  style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}
                >
                  Modifier
                </Link>
                <DeleteBlogButton id={article.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}