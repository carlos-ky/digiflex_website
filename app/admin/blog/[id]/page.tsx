'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
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

export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [featuredArticles, setFeaturedArticles] = useState<any[]>([])
  const [showFeaturedWarning, setShowFeaturedWarning] = useState(false)
  const [originalFeatured, setOriginalFeatured] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Branding',
    status: 'draft',
    published_at: '',
    cover_image: '',
    is_featured: false,
  })

  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }))

  useEffect(() => {
    // Charge l'article
    supabase
      .from('blog_articles')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setForm({
            title: data.title ?? '',
            slug: data.slug ?? '',
            excerpt: data.excerpt ?? '',
            content: data.content ?? '',
            category: data.category ?? 'Branding',
            status: data.status ?? 'draft',
            published_at: data.published_at ?? '',
            cover_image: data.cover_image ?? '',
            is_featured: data.is_featured ?? false,
          })
          setOriginalFeatured(data.is_featured ?? false)
        }
        setFetching(false)
      })

    // Charge les articles mis en avant (sauf celui-ci)
    supabase
      .from('blog_articles')
      .select('id, title')
      .eq('is_featured', true)
      .neq('id', id)
      .then(({ data }) => setFeaturedArticles(data ?? []))
  }, [id])

  const handleFeaturedChange = (checked: boolean) => {
    if (checked && !originalFeatured && featuredArticles.length >= MAX_FEATURED) {
      setShowFeaturedWarning(true)
      return
    }
    set('is_featured', checked)
  }

  const removeFeatured = async (aid: string) => {
    await supabase
      .from('blog_articles')
      .update({ is_featured: false })
      .eq('id', aid)
    setFeaturedArticles((prev) => prev.filter((a) => a.id !== aid))
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
      let cover_image = form.cover_image
      if (coverFile) cover_image = await uploadImage(coverFile)

      const { error } = await supabase
        .from('blog_articles')
        .update({
          ...form,
          cover_image,
          published_at: form.status === 'published'
            ? (form.published_at || new Date().toISOString())
            : null,
        })
        .eq('id', id)

      if (error) throw error

      router.push('/admin/blog')
      router.refresh()
    } catch (err: any) {
      setError(err.message ?? 'Une erreur est survenue.')
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
          Chargement...
        </p>
      </div>
    )
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
            Modifier l'article
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
            onChange={(e) => set('title', e.target.value)} required
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
            rows={12} className="w-full px-4 py-3 text-sm outline-none resize-none"
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
          {form.cover_image && (
            <div className="mb-3">
              <img src={form.cover_image} alt="Couverture actuelle"
                className="w-32 h-24 object-cover mb-2" />
              <p className="text-xs" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
                Image actuelle — choisir un nouveau fichier pour remplacer
              </p>
            </div>
          )}
          <input type="file" accept="image/*"
            onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
            className="w-full px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
          />
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
                ({featuredArticles.length + (originalFeatured ? 1 : 0)} / {MAX_FEATURED})
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
            {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
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