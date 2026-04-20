'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function MarkAsReadButton({ id }: { id: string }) {
  const router = useRouter()

  const handleMarkRead = async () => {
    await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id)
    router.refresh()
  }

  return (
    <button
      onClick={handleMarkRead}
      className="text-xs tracking-widest uppercase transition-colors"
      style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#F8F6F0')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#4A4A4A')}
    >
      Marquer lu
    </button>
  )
}