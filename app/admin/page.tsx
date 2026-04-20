import { supabaseServer } from '@/lib/supabase-server'
import Link from 'next/link'

async function getStats() {
  const [portfolio, blog, messages, unread] = await Promise.all([
    supabaseServer.from('portfolio_projects').select('id', { count: 'exact', head: true }),
    supabaseServer.from('blog_articles').select('id', { count: 'exact', head: true }),
    supabaseServer.from('contact_messages').select('id', { count: 'exact', head: true }),
    supabaseServer.from('contact_messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
  ])

  return {
    portfolio: portfolio.count ?? 0,
    blog: blog.count ?? 0,
    messages: messages.count ?? 0,
    unread: unread.count ?? 0,
  }
}

async function getRecentMessages() {
  const { data } = await supabaseServer
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)
  return data ?? []
}

const statCards = (stats: Awaited<ReturnType<typeof getStats>>) => [
  { label: 'Projets portfolio', value: stats.portfolio, href: '/admin/portfolio', cta: 'Gérer' },
  { label: 'Articles blog', value: stats.blog, href: '/admin/blog', cta: 'Gérer' },
  { label: 'Messages reçus', value: stats.messages, href: '/admin/messages', cta: 'Voir' },
  { label: 'Messages non lus', value: stats.unread, href: '/admin/messages', cta: 'Voir', highlight: true },
]

export default async function AdminDashboard() {
  const [stats, messages] = await Promise.all([getStats(), getRecentMessages()])

  return (
    <div>
      <div className="mb-10">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-2"
          style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
        >
          Vue d'ensemble
        </p>
        <h2
          className="text-4xl font-light"
          style={{ color: '#F8F6F0', fontFamily: 'Cormorant Garamond, serif' }}
        >
          Dashboard
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {statCards(stats).map((card) => (
          <Link key={card.label} href={card.href}>
            <div
              className="p-6 cursor-pointer hover:border-gray-600 transition-colors"
              style={{
                backgroundColor: card.highlight ? '#1A1A1A' : '#0F0F0F',
                border: `1px solid ${card.highlight ? '#3A3A3A' : '#1A1A1A'}`,
              }}
            >
              <p
                className="text-3xl font-light mb-2"
                style={{ color: '#F8F6F0', fontFamily: 'Cormorant Garamond, serif' }}
              >
                {card.value}
              </p>
              <p
                className="text-xs mb-3"
                style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
              >
                {card.label}
              </p>
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}
              >
                {card.cta} →
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h3
            className="text-2xl font-light"
            style={{ color: '#F8F6F0', fontFamily: 'Cormorant Garamond, serif' }}
          >
            Messages récents
          </h3>
          <Link
            href="/admin/messages"
            className="text-xs tracking-widest uppercase"
            style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
          >
            Voir tout →
          </Link>
        </div>

        {messages.length === 0 ? (
          <div
            className="p-8 text-center"
            style={{ border: '1px solid #1A1A1A' }}
          >
            <p className="text-sm" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
              Aucun message reçu pour le moment.
            </p>
          </div>
        ) : (
          <div style={{ border: '1px solid #1A1A1A' }}>
            {messages.map((msg: any, i: number) => (
              <div
                key={msg.id}
                className="flex items-start justify-between px-6 py-4"
                style={{
                  borderBottom: i < messages.length - 1 ? '1px solid #1A1A1A' : 'none',
                  backgroundColor: !msg.is_read ? '#0F0F0F' : 'transparent',
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p
                      className="text-sm font-medium"
                      style={{ color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {msg.full_name}
                    </p>
                    {!msg.is_read && (
                      <span
                        className="text-xs px-2 py-0.5"
                        style={{
                          backgroundColor: '#1A1A1A',
                          color: '#9A9A9A',
                          fontFamily: 'DM Sans, sans-serif',
                        }}
                      >
                        Nouveau
                      </span>
                    )}
                  </div>
                  <p
                    className="text-xs truncate"
                    style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {msg.email} {msg.company ? `· ${msg.company}` : ''}
                  </p>
                  <p
                    className="text-xs mt-1 truncate"
                    style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {msg.message}
                  </p>
                </div>
                <p
                  className="text-xs ml-4 shrink-0"
                  style={{ color: '#2A2A2A', fontFamily: 'DM Sans, sans-serif' }}
                >
                  {new Date(msg.created_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}