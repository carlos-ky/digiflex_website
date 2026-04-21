import { supabaseServer } from '@/lib/supabase-server'
import { getAnalyticsStats, getTopPages, getTrafficSources } from '@/lib/analytics'

async function getWhatsAppClicks() {
  const { data } = await supabaseServer
    .from('whatsapp_clicks')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

async function getWhatsAppClicksCount() {
  const { count } = await supabaseServer
    .from('whatsapp_clicks')
    .select('*', { count: 'exact', head: true })
  return count ?? 0
}

export default async function AnalyticsPage() {
  const [stats, topPages, sources, waClicks, waTotalClicks] = await Promise.all([
    getAnalyticsStats(),
    getTopPages(),
    getTrafficSources(),
    getWhatsAppClicks(),
    getWhatsAppClicksCount(),
  ])

  const waClicksByPage = waClicks.reduce((acc: any, click: any) => {
    acc[click.page] = (acc[click.page] || 0) + 1
    return acc
  }, {})

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.3em] uppercase mb-2"
          style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
          Tableau de bord
        </p>
        <h2 className="text-4xl font-light"
          style={{ color: '#F8F6F0', fontFamily: 'Cormorant Garamond, serif' }}>
          Analytics
        </h2>
        <p className="text-xs mt-2" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
          30 derniers jours
        </p>
      </div>

      {/* Stats GA4 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Visiteurs uniques', value: stats.users.toLocaleString('fr-FR') },
          { label: 'Sessions', value: stats.sessions.toLocaleString('fr-FR') },
          { label: 'Pages vues', value: stats.pageViews.toLocaleString('fr-FR') },
          { label: 'Taux de rebond', value: `${stats.bounceRate}%` },
        ].map((stat) => (
          <div key={stat.label} className="p-6"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #1A1A1A' }}>
            <p className="text-3xl font-light mb-2"
              style={{ color: '#F8F6F0', fontFamily: 'Cormorant Garamond, serif' }}>
              {stat.value}
            </p>
            <p className="text-xs" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Pages les plus vues */}
        <div style={{ border: '1px solid #1A1A1A' }}>
          <div className="px-6 py-4" style={{ borderBottom: '1px solid #1A1A1A' }}>
            <h3 className="text-sm" style={{ color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
              Pages les plus vues
            </h3>
          </div>
          {topPages.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <p className="text-xs" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
                Aucune donnée disponible
              </p>
            </div>
          ) : (
            topPages.map((page, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-3"
                style={{ borderBottom: i < topPages.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
                <p className="text-xs truncate flex-1 mr-4"
                  style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
                  {page.page || '/'}
                </p>
                <p className="text-xs shrink-0"
                  style={{ color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
                  {page.views.toLocaleString('fr-FR')} vues
                </p>
              </div>
            ))
          )}
        </div>

        {/* Sources de trafic */}
        <div style={{ border: '1px solid #1A1A1A' }}>
          <div className="px-6 py-4" style={{ borderBottom: '1px solid #1A1A1A' }}>
            <h3 className="text-sm" style={{ color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
              Sources de trafic
            </h3>
          </div>
          {sources.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <p className="text-xs" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
                Aucune donnée disponible
              </p>
            </div>
          ) : (
            sources.map((source, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-3"
                style={{ borderBottom: i < sources.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
                <p className="text-xs" style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
                  {source.source}
                </p>
                <p className="text-xs" style={{ color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
                  {source.sessions.toLocaleString('fr-FR')} sessions
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* WhatsApp Clics */}
      <div style={{ border: '1px solid #1A1A1A' }}>
        <div className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid #1A1A1A' }}>
          <h3 className="text-sm" style={{ color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
            Clics WhatsApp
          </h3>
          <span className="text-xs px-3 py-1"
            style={{ backgroundColor: '#0F2A1A', color: '#4ade80', fontFamily: 'DM Sans, sans-serif' }}>
            {waTotalClicks} total
          </span>
        </div>
        {Object.keys(waClicksByPage).length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-xs" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
              Aucun clic enregistré pour le moment
            </p>
          </div>
        ) : (
          Object.entries(waClicksByPage)
            .sort(([, a]: any, [, b]: any) => b - a)
            .map(([page, count]: any, i, arr) => (
              <div key={page} className="flex items-center justify-between px-6 py-3"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid #1A1A1A' : 'none' }}>
                <p className="text-xs" style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
                  {page}
                </p>
                <p className="text-xs" style={{ color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
                  {count} clic{count > 1 ? 's' : ''}
                </p>
              </div>
            ))
        )}
      </div>
    </div>
  )
}