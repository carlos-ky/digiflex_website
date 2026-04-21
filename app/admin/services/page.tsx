import { supabaseServer } from '@/lib/supabase-server'
import Link from 'next/link'
import { DeleteServiceButton } from './DeleteServiceButton'

async function getServices() {
  const { data } = await supabaseServer
    .from('services')
    .select('*, service_categories(name)')
    .order('display_order', { ascending: true })
  return data ?? []
}

export default async function AdminServicesPage() {
  const services = await getServices()

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase mb-2"
            style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
            Gestion
          </p>
          <h2 className="text-4xl font-light"
            style={{ color: '#F8F6F0', fontFamily: 'Cormorant Garamond, serif' }}>
            Services
          </h2>
        </div>
        <Link
          href="/admin/services/new"
          className="px-6 py-3 text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
          style={{ backgroundColor: '#F8F6F0', color: '#0E0E0E', fontFamily: 'DM Sans, sans-serif' }}
        >
          + Nouveau service
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="p-12 text-center" style={{ border: '1px solid #1A1A1A' }}>
          <p className="text-sm mb-4" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
            Aucun service pour le moment.
          </p>
          <Link href="/admin/services/new" className="text-xs tracking-widest uppercase"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Ajouter le premier service →
          </Link>
        </div>
      ) : (
        <div style={{ border: '1px solid #1A1A1A' }}>
          {/* Thead */}
          <div className="grid grid-cols-12 px-6 py-3 text-xs tracking-widest uppercase"
            style={{ borderBottom: '1px solid #1A1A1A', color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
            <span className="col-span-1">N°</span>
            <span className="col-span-3">Nom</span>
            <span className="col-span-3">Categorie</span>
            <span className="col-span-1">Statut</span>
            <span className="col-span-2">Accueil</span>
            <span className="col-span-2 text-right">Actions</span>
          </div>

          {services.map((service: any, i: number) => (
            <div key={service.id}
              className="grid grid-cols-12 items-center px-6 py-4"
              style={{
                borderBottom: i < services.length - 1 ? '1px solid #1A1A1A' : 'none',
                backgroundColor: service.is_home ? '#0A0A0A' : 'transparent',
              }}
            >
              {/* Numéro */}
              <div className="col-span-1">
                <p className="font-display text-2xl font-light"
                  style={{ color: '#2A2A2A', fontFamily: 'Cormorant Garamond, serif' }}>
                  {service.number}
                </p>
              </div>

              {/* Nom */}
              <div className="col-span-3">
                <p className="text-sm" style={{ color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
                  {service.name}
                </p>
                <p className="text-xs mt-0.5 truncate" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
                  /{service.slug}
                </p>
              </div>

              {/* Catégorie */}
              <div className="col-span-3">
                {service.service_categories?.name ? (
                  <span className="text-xs px-2 py-1"
                    style={{ backgroundColor: '#1A1A1A', color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
                    {service.service_categories.name}
                  </span>
                ) : (
                  <span className="text-xs" style={{ color: '#2A2A2A', fontFamily: 'DM Sans, sans-serif' }}>—</span>
                )}
              </div>

              {/* Statut */}
              <div className="col-span-1">
                <span className="text-xs px-2 py-1"
                  style={{
                    backgroundColor: service.is_active ? '#0F2A1A' : '#1A1A1A',
                    color: service.is_active ? '#4ade80' : '#9A9A9A',
                    fontFamily: 'DM Sans, sans-serif',
                  }}>
                  {service.is_active ? 'Actif' : 'Inactif'}
                </span>
              </div>

              {/* Accueil */}
              <div className="col-span-2">
                {service.is_home ? (
                  <span className="text-xs px-2 py-1"
                    style={{ backgroundColor: '#1A2A1A', color: '#4ade80', fontFamily: 'DM Sans, sans-serif' }}>
                    En avant
                  </span>
                ) : (
                  <span className="text-xs" style={{ color: '#2A2A2A', fontFamily: 'DM Sans, sans-serif' }}>—</span>
                )}
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-end gap-4">
                <Link href={`/admin/services/${service.id}`}
                  className="text-xs tracking-widest uppercase"
                  style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
                  Modifier
                </Link>
                <DeleteServiceButton id={service.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}