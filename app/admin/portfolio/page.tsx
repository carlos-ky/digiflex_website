import { supabaseServer } from '@/lib/supabase-server'
import Link from 'next/link'
import { DeleteProjectButton } from './DeleteProjectButton'

const MAX_FEATURED = 6

async function getProjects() {
  const { data } = await supabaseServer
    .from('portfolio_projects')
    .select('*')
    .order('display_order', { ascending: true })
  return data ?? []
}

export default async function AdminPortfolioPage() {
  const projects = await getProjects()
  const featuredCount = projects.filter((p: any) => p.is_featured).length

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
            Portfolio
          </h2>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="px-6 py-3 text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
          style={{
            backgroundColor: '#F8F6F0',
            color: '#0E0E0E',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          + Nouveau projet
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
          {featuredCount} / {MAX_FEATURED} projets mis en avant sur la page d'accueil
        </p>
      </div>

      {/* Liste */}
      {projects.length === 0 ? (
        <div className="p-12 text-center" style={{ border: '1px solid #1A1A1A' }}>
          <p className="text-sm mb-4" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
            Aucun projet pour le moment.
          </p>
          <Link
            href="/admin/portfolio/new"
            className="text-xs tracking-widest uppercase"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}
          >
            Ajouter le premier projet →
          </Link>
        </div>
      ) : (
        <div style={{ border: '1px solid #1A1A1A' }}>
          {/* Thead */}
          <div
            className="grid grid-cols-12 px-6 py-3 text-xs tracking-widest uppercase"
            style={{
              borderBottom: '1px solid #1A1A1A',
              color: '#4A4A4A',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            <span className="col-span-1">Image</span>
            <span className="col-span-3">Client</span>
            <span className="col-span-2">Categorie</span>
            <span className="col-span-2">Annee</span>
            <span className="col-span-2">Accueil</span>
            <span className="col-span-2 text-right">Actions</span>
          </div>

          {/* Rows */}
          {projects.map((project: any, i: number) => (
            <div
              key={project.id}
              className="grid grid-cols-12 items-center px-6 py-4"
              style={{
                borderBottom: i < projects.length - 1 ? '1px solid #1A1A1A' : 'none',
                backgroundColor: project.is_featured ? '#0A0A0A' : 'transparent',
              }}
            >
              {/* Image */}
              <div className="col-span-1">
                {project.cover_image ? (
                  <img
                    src={project.cover_image}
                    alt={project.client_name}
                    className="w-10 h-10 object-cover"
                    style={{ filter: 'grayscale(20%)' }}
                  />
                ) : (
                  <div className="w-10 h-10" style={{ backgroundColor: '#1A1A1A' }} />
                )}
              </div>

              {/* Client */}
              <div className="col-span-3">
                <p className="text-sm" style={{ color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
                  {project.client_name}
                </p>
                <p className="text-xs mt-0.5 truncate" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
                  {project.short_description}
                </p>
              </div>

              {/* Catégorie */}
              <div className="col-span-2">
                <span
                  className="text-xs px-2 py-1"
                  style={{ backgroundColor: '#1A1A1A', color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}
                >
                  {project.category}
                </span>
              </div>

              {/* Année */}
              <div className="col-span-2">
                <p className="text-sm" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
                  {project.year ?? '—'}
                </p>
              </div>

              {/* Featured */}
              <div className="col-span-2">
                {project.is_featured ? (
                  <span
                    className="text-xs px-2 py-1"
                    style={{ backgroundColor: '#1A2A1A', color: '#4ade80', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    En avant
                  </span>
                ) : (
                  <span
                    className="text-xs"
                    style={{ color: '#2A2A2A', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    —
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-end gap-4">
                <Link
                  href={`/admin/portfolio/${project.id}`}
                  className="text-xs tracking-widest uppercase"
                  style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}
                >
                  Modifier
                </Link>
                <DeleteProjectButton id={project.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}