import { supabaseServer } from '@/lib/supabase-server'
import Link from 'next/link'
import { DeleteClientButton } from './DeleteClientButton'

async function getClients() {
  const { data } = await supabaseServer
    .from('clients')
    .select('*')
    .order('display_order', { ascending: true })
  return data ?? []
}

export default async function AdminClientsPage() {
  const clients = await getClients()

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
            Clients
          </h2>
        </div>
        <Link
          href="/admin/clients/new"
          className="px-6 py-3 text-xs tracking-widest uppercase transition-opacity hover:opacity-70"
          style={{ backgroundColor: '#F8F6F0', color: '#0E0E0E', fontFamily: 'DM Sans, sans-serif' }}
        >
          + Nouveau client
        </Link>
      </div>

      {clients.length === 0 ? (
        <div className="p-12 text-center" style={{ border: '1px solid #1A1A1A' }}>
          <p className="text-sm mb-4" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
            Aucun client pour le moment.
          </p>
        </div>
      ) : (
        <div style={{ border: '1px solid #1A1A1A' }}>
          <div className="grid grid-cols-12 px-6 py-3 text-xs tracking-widest uppercase"
            style={{ borderBottom: '1px solid #1A1A1A', color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
            <span className="col-span-1">Logo</span>
            <span className="col-span-4">Nom</span>
            <span className="col-span-2">Initiales</span>
            <span className="col-span-2">Statut</span>
            <span className="col-span-3 text-right">Actions</span>
          </div>

          {clients.map((client: any, i: number) => (
            <div key={client.id}
              className="grid grid-cols-12 items-center px-6 py-4"
              style={{ borderBottom: i < clients.length - 1 ? '1px solid #1A1A1A' : 'none' }}
            >
              <div className="col-span-1">
                {client.logo_url ? (
                  <img src={client.logo_url} alt={client.name}
                    className="w-10 h-10 object-contain filter grayscale" />
                ) : (
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: '#F8F6F0', color: '#0E0E0E', fontFamily: 'DM Sans, sans-serif' }}>
                    {client.initials}
                  </div>
                )}
              </div>

              <div className="col-span-4">
                <p className="text-sm" style={{ color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
                  {client.name}
                </p>
              </div>

              <div className="col-span-2">
                <span className="text-xs px-2 py-1"
                  style={{ backgroundColor: '#1A1A1A', color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
                  {client.initials}
                </span>
              </div>

              <div className="col-span-2">
                <span className="text-xs px-2 py-1"
                  style={{
                    backgroundColor: client.is_active ? '#0F2A1A' : '#1A1A1A',
                    color: client.is_active ? '#4ade80' : '#9A9A9A',
                    fontFamily: 'DM Sans, sans-serif',
                  }}>
                  {client.is_active ? 'Actif' : 'Inactif'}
                </span>
              </div>

              <div className="col-span-3 flex items-center justify-end gap-4">
                <Link href={`/admin/clients/${client.id}`}
                  className="text-xs tracking-widest uppercase"
                  style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
                  Modifier
                </Link>
                <DeleteClientButton id={client.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}