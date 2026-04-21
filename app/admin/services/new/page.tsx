'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const PORTFOLIO_CATEGORIES = ['Social Media', 'Shooting', 'Branding', 'Événementiel', 'Web']

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export default function NewServicePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [includes, setIncludes] = useState<string[]>([''])
  const [form, setForm] = useState({
    number: '',
    name: '',
    slug: '',
    description: '',
    long_description: '',
    portfolio_category: '',
    is_active: true,
    display_order: '0',
  })

  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }))

  const handleNameChange = (name: string) => {
    setForm((f) => ({
      ...f,
      name,
      slug: f.slug === '' || f.slug === generateSlug(f.name) ? generateSlug(name) : f.slug,
    }))
  }

  const addInclude = () => setIncludes((prev) => [...prev, ''])
  const removeInclude = (i: number) => setIncludes((prev) => prev.filter((_, idx) => idx !== i))
  const updateInclude = (i: number, value: string) => {
    setIncludes((prev) => prev.map((item, idx) => idx === i ? value : item))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.from('services').insert({
        ...form,
        display_order: parseInt(form.display_order),
        includes: includes.filter((i) => i.trim() !== ''),
        portfolio_category: form.portfolio_category || null,
      })

      if (error) throw error

      router.push('/admin/services')
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
            Services
          </p>
          <h2 className="text-4xl font-light"
            style={{ color: '#F8F6F0', fontFamily: 'Cormorant Garamond, serif' }}>
            Nouveau service
          </h2>
        </div>
        <Link href="/admin/services" className="text-xs tracking-widest uppercase"
          style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
          ← Retour
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">

        {/* Numéro + Nom */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2"
              style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
              N° *
            </label>
            <input type="text" value={form.number}
              onChange={(e) => set('number', e.target.value)}
              required placeholder="01"
              className="w-full px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
            />
          </div>
          <div className="col-span-3">
            <label className="block text-xs tracking-widest uppercase mb-2"
              style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
              Nom du service *
            </label>
            <input type="text" value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              className="w-full px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
            />
          </div>
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Slug (URL)
          </label>
          <input type="text" value={form.slug}
            onChange={(e) => set('slug', e.target.value)} required
            className="w-full px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
          />
        </div>

        {/* Description courte */}
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Description courte *
          </label>
          <textarea value={form.description}
            onChange={(e) => set('description', e.target.value)}
            required rows={3}
            className="w-full px-4 py-3 text-sm outline-none resize-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
          />
        </div>

        {/* Description longue */}
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Notre approche (description longue)
          </label>
          <textarea value={form.long_description}
            onChange={(e) => set('long_description', e.target.value)}
            rows={8} placeholder="Decrivez votre approche pour ce service..."
            className="w-full px-4 py-3 text-sm outline-none resize-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
          />
        </div>

        {/* Ce qui est inclus */}
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Ce qui est inclus
          </label>
          <div className="space-y-2">
            {includes.map((item, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={item}
                  onChange={(e) => updateInclude(i, e.target.value)}
                  placeholder={`Element ${i + 1}`}
                  className="flex-1 px-4 py-3 text-sm outline-none"
                  style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
                />
                {includes.length > 1 && (
                  <button type="button" onClick={() => removeInclude(i)}
                    className="px-3 text-xs"
                    style={{ color: '#3A3A3A', border: '1px solid #2A2A2A' }}>
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={addInclude}
            className="mt-2 text-xs tracking-widest uppercase"
            style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
            + Ajouter un element
          </button>
        </div>

        {/* Catégorie portfolio */}
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Categorie portfolio liee
          </label>
          <select value={form.portfolio_category}
            onChange={(e) => set('portfolio_category', e.target.value)}
            className="w-full px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
            <option value="">Aucune</option>
            {PORTFOLIO_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <p className="text-xs mt-1" style={{ color: '#2A2A2A', fontFamily: 'DM Sans, sans-serif' }}>
            Les projets de cette categorie seront affiches sur la page du service
          </p>
        </div>

        {/* Statut + Ordre */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="is_active" checked={form.is_active}
              onChange={(e) => set('is_active', e.target.checked)}
              style={{ accentColor: '#F8F6F0' }}
            />
            <label htmlFor="is_active" className="text-sm"
              style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
              Service actif
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
            {loading ? 'Enregistrement...' : 'Enregistrer le service'}
          </button>
          <Link href="/admin/services" className="text-xs tracking-widest uppercase"
            style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
            Annuler
          </Link>
        </div>
      </form>
    </div>
  )
}