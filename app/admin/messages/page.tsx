import { supabaseServer } from '@/lib/supabase'
import { MarkAsReadButton } from './MarkAsReadButton'

async function getMessages() {
  const { data } = await supabaseServer
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

export default async function AdminMessagesPage() {
  const messages = await getMessages()
  const unread = messages.filter((m: any) => !m.is_read).length

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
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
            Messages
          </h2>
        </div>
        {unread > 0 && (
          <span
            className="px-4 py-2 text-xs tracking-widest uppercase"
            style={{
              backgroundColor: '#1A1A1A',
              color: '#9A9A9A',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {unread} non lu{unread > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="p-12 text-center" style={{ border: '1px solid #1A1A1A' }}>
          <p className="text-sm" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
            Aucun message reçu pour le moment.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg: any) => (
            <div
              key={msg.id}
              className="p-6"
              style={{
                border: !msg.is_read ? '1px solid #3A3A3A' : '1px solid #1A1A1A',
                backgroundColor: !msg.is_read ? '#0F0F0F' : 'transparent',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p
                      className="text-base font-medium"
                      style={{ color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {msg.full_name}
                    </p>
                    {!msg.is_read && (
                      <span
                        className="text-xs px-2 py-0.5"
                        style={{
                          backgroundColor: '#2A2A2A',
                          color: '#9A9A9A',
                          fontFamily: 'DM Sans, sans-serif',
                        }}
                      >
                        Nouveau
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <p
                      className="text-xs"
                      style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {msg.email}
                    </p>
                    {msg.phone && (
                      <p
                        className="text-xs"
                        style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
                      >
                        {msg.phone}
                      </p>
                    )}
                    {msg.company && (
                      <p
                        className="text-xs"
                        style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
                      >
                        {msg.company}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <p
                    className="text-xs"
                    style={{ color: '#2A2A2A', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {new Date(msg.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  {!msg.is_read && <MarkAsReadButton id={msg.id} />}
                </div>
              </div>

              <div
                className="p-4"
                style={{ backgroundColor: '#0A0A0A', borderLeft: '2px solid #2A2A2A' }}
              >
                <p
                  className="text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}
                >
                  {msg.message}
                </p>
              </div>

              <div className="mt-3">
                
                <a  href={'mailto:' + msg.email + '?subject=Re: Digiflex — Votre demande'}
                  className="text-xs tracking-widest uppercase"
                  style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
                >
                  Repondre par email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}