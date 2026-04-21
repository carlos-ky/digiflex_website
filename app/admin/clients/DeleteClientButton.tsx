'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function DeleteClientButton({ id }: { id: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Supprimer ce client ?')) return
    await supabase.from('clients').delete().eq('id', id)
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="text-xs tracking-widest uppercase transition-colors"
      style={{ color: '#3A3A3A', fontFamily: 'DM Sans, sans-serif' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
      onMouseLeave={(e) => (e.currentTarget.style.color = '#3A3A3A')}
    >
      Supprimer
    </button>
  )
}