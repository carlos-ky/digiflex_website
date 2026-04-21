'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function NewClientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>('')
  const [form, setForm] = useState({
    name: '',
    initials: '',
    is_active: true,
    display_order: '0',
  })

  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }))

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setLogoFile(file)
    if (file) setLogoPreview(URL.createObjectURL(file))
    else setLogoPreview('')
  }

  const uploadLogo = async (file: File): Promise<string> => {
    const ext = file.name.split('.').pop()
    const filename = `clients/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from('digiflex-media').upload(filename, file)
    if (error) throw error
    const { data } = supabase.storage.from('digiflex-media').getPublicUrl(filename)
    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let logo_url = null
      if (logoFile) logo_url = await uploadLogo(logoFile)

      const { error } = await supabase.from('clients').insert({
        ...form,
        display_order: parseInt(form.display_order),
        logo_url,
      })

      if (error) throw error

      router.push('/admin/clients')
      router.refresh()
    } catch (err: any) {
      setError(err.message ?? 'Une erreur est survenue.')
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase mb-2"
            style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
            Clients
          </p>
          <h2 className="text-4xl font-light"
            style={{ color: '#F8F6F0', fontFamily: 'Cormorant Garamond, serif' }}>
            Nouveau client
          </h2>
        </div>
        <Link href="/admin/clients" className="text-xs tracking-widest uppercase"
          style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
          ← Retour
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">

        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Nom du client *
          </label>
          <input type="text" value={form.name}
            onChange={(e) => set('name', e.target.value)} required
            className="w-full px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
          />
        </div>

        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Initiales *
          </label>
          <input type="text" value={form.initials}
            onChange={(e) => set('initials', e.target.value)} required
            maxLength={3} placeholder="Ex: CC"
            className="w-full px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
          />
        </div>

        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Logo (PNG ou SVG recommandé)
          </label>
          <input type="file" accept="image/*"
            onChange={handleLogoChange}
            className="w-full px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
          />
          {logoPreview && (
            <div className="mt-3 p-4 flex items-center justify-center"
              style={{ backgroundColor: '#1A1A1A', width: '120px', height: '80px' }}>
              <img src={logoPreview} alt="Apercu logo"
                className="max-w-full max-h-full object-contain" />
            </div>
          )}
          <p className="text-xs mt-2" style={{ color: '#2A2A2A', fontFamily: 'DM Sans, sans-serif' }}>
            Le logo sera affiché en blanc sur fond sombre — utilise de preference un logo sur fond transparent.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="is_active" checked={form.is_active}
              onChange={(e) => set('is_active', e.target.checked)}
              style={{ accentColor: '#F8F6F0' }}
            />
            <label htmlFor="is_active" className="text-sm"
              style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
              Visible sur le site
            </label>
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2"
              style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
              Ordre d'affichage
            </label>
            <input type="number" value={form.display_order}
              onChange={(e) => set('display_order', e.target.value)} min="0"
              className="w-full px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
            />
          </div>
        </div>

        {error && (
          <p className="text-xs" style={{ color: '#ef4444', fontFamily: 'DM Sans, sans-serif' }}>
            {error}
          </p>
        )}

        <div className="flex items-center gap-4 pt-4">
          <button type="submit" disabled={loading}
            className="px-8 py-3 text-xs tracking-widest uppercase transition-opacity"
            style={{
              backgroundColor: '#F8F6F0', color: '#0E0E0E',
              fontFamily: 'DM Sans, sans-serif',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}>
            {loading ? 'Enregistrement...' : 'Enregistrer le client'}
          </button>
          <Link href="/admin/clients" className="text-xs tracking-widest uppercase"
            style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
            Annuler
          </Link>
        </div>
      </form>
    </div>
  )
}