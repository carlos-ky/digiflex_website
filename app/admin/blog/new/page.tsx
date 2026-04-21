'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const CATEGORIES = ['Branding', 'Marketing', 'Communication', 'Social Media', 'Web', 'Strategie']
const MAX_FEATURED = 3

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export default function NewArticlePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string>('')
  const [featuredArticles, setFeaturedArticles] = useState<any[]>([])
  const [showFeaturedWarning, setShowFeaturedWarning] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Branding',
    status: 'draft',
    published_at: '',
    is_featured: false,
  })

  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }))
  
  useEffect(() => {
    supabase
      .from('blog_articles')
      .select('id, title')
      .eq('is_featured', true)
      .then(({ data }: { data: any }) => setFeaturedArticles(data ?? []))
  }, [])

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: f.slug === '' || f.slug === generateSlug(f.title) ? generateSlug(title) : f.slug,
    }))
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setCoverFile(file)
    if (file) setCoverPreview(URL.createObjectURL(file))
    else setCoverPreview('')
  }

  const handleFeaturedChange = (checked: boolean) => {
    if (checked && featuredArticles.length >= MAX_FEATURED) {
      setShowFeaturedWarning(true)
      return
    }
    set('is_featured', checked)
  }

  const removeFeatured = async (id: string) => {
    await supabase
      .from('blog_articles')
      .update({ is_featured: false })
      .eq('id', id)
    setFeaturedArticles((prev) => prev.filter((a) => a.id !== id))
    setShowFeaturedWarning(false)
    set('is_featured', true)
  }

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split('.').pop()
    const filename = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
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
      let cover_image = null
      if (coverFile) cover_image = await uploadImage(coverFile)

      const { error } = await supabase.from('blog_articles').insert({
        ...form,
        cover_image,
        published_at: form.status === 'published'
          ? (form.published_at || new Date().toISOString())
          : null,
      })

      if (error) throw error

      router.push('/admin/blog')
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
            Blog
          </p>
          <h2 className="text-4xl font-light"
            style={{ color: '#F8F6F0', fontFamily: 'Cormorant Garamond, serif' }}>
            Nouvel article
          </h2>
        </div>
        <Link href="/admin/blog" className="text-xs tracking-widest uppercase"
          style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
          ← Retour
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">

        {/* Titre */}
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Titre *
          </label>
          <input type="text" value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)} required
            className="w-full px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
          />
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
          <p className="text-xs mt-1" style={{ color: '#2A2A2A', fontFamily: 'DM Sans, sans-serif' }}>
            Genere automatiquement depuis le titre — modifiable manuellement
          </p>
        </div>

        {/* Extrait */}
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Extrait
          </label>
          <textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)}
            rows={3} className="w-full px-4 py-3 text-sm outline-none resize-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
          />
        </div>

        {/* Contenu */}
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Contenu
          </label>
          <textarea value={form.content} onChange={(e) => set('content', e.target.value)}
            rows={12} placeholder="Redigez votre article ici..."
            className="w-full px-4 py-3 text-sm outline-none resize-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
          />
        </div>

        {/* Catégorie + Statut */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2"
              style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
              Categorie
            </label>
            <select value={form.category} onChange={(e) => set('category', e.target.value)}
              className="w-full px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2"
              style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
              Statut
            </label>
            <select value={form.status} onChange={(e) => set('status', e.target.value)}
              className="w-full px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
              <option value="draft">Brouillon</option>
              <option value="published">Publie</option>
            </select>
          </div>
        </div>

        {/* Image de couverture */}
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Image de couverture
          </label>
          <input type="file" accept="image/*" onChange={handleCoverChange}
            className="w-full px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
          />
          {coverPreview && (
            <img src={coverPreview} alt="Apercu"
              className="mt-3 w-40 h-28 object-cover" />
          )}
        </div>

        {/* Mis en avant */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <input type="checkbox" id="is_featured" checked={form.is_featured}
              onChange={(e) => handleFeaturedChange(e.target.checked)}
              style={{ accentColor: '#F8F6F0' }}
            />
            <label htmlFor="is_featured" className="text-sm"
              style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
              Article mis en avant sur la page d'accueil
              <span className="ml-2" style={{ color: '#4A4A4A' }}>
                ({featuredArticles.length} / {MAX_FEATURED})
              </span>
            </label>
          </div>

          {showFeaturedWarning && (
            <div className="mt-3 p-4" style={{ backgroundColor: '#0A0A0A', border: '1px solid #3A3A3A' }}>
              <p className="text-xs mb-3" style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
                La limite de {MAX_FEATURED} articles en avant est atteinte. Retire un article pour pouvoir mettre celui-ci en avant.
              </p>
              <div className="space-y-2">
                {featuredArticles.map((a) => (
                  <div key={a.id} className="flex items-center justify-between px-3 py-2"
                    style={{ backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                    <p className="text-xs truncate flex-1 mr-3"
                      style={{ color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
                      {a.title}
                    </p>
                    <button type="button" onClick={() => removeFeatured(a.id)}
                      className="text-xs tracking-widest uppercase ml-4 shrink-0"
                      style={{ color: '#ef4444', fontFamily: 'DM Sans, sans-serif' }}>
                      Retirer
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => setShowFeaturedWarning(false)}
                className="mt-3 text-xs tracking-widest uppercase"
                style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
                Annuler
              </button>
            </div>
          )}
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
            {loading ? 'Enregistrement...' : "Enregistrer l'article"}
          </button>
          <Link href="/admin/blog" className="text-xs tracking-widest uppercase"
            style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
            Annuler
          </Link>
        </div>
      </form>
    </div>
  )
}