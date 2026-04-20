'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const CATEGORIES = ['Social Media', 'Shooting', 'Branding', 'Événementiel', 'Web']
const MAX_FEATURED = 6

export default function NewProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [error, setError] = useState('')
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string>('')
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])
  const [videoUrl, setVideoUrl] = useState('')
  const [videoUrls, setVideoUrls] = useState<string[]>([])
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([])
  const [showFeaturedWarning, setShowFeaturedWarning] = useState(false)
  const [form, setForm] = useState({
    client_name: '',
    category: 'Branding',
    short_description: '',
    long_description: '',
    sector: '',
    year: new Date().getFullYear().toString(),
    is_featured: false,
    display_order: '0',
  })

  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }))

  // Charge les projets mis en avant au montage
  useEffect(() => {
    supabase
      .from('portfolio_projects')
      .select('id, client_name, display_order')
      .eq('is_featured', true)
      .order('display_order', { ascending: true })
      .then(({ data }) => setFeaturedProjects(data ?? []))
  }, [])

  const handleFeaturedChange = (checked: boolean) => {
    if (checked && featuredProjects.length >= MAX_FEATURED) {
      setShowFeaturedWarning(true)
      return
    }
    set('is_featured', checked)
  }

  const removeFeatured = async (id: string) => {
    await supabase
      .from('portfolio_projects')
      .update({ is_featured: false })
      .eq('id', id)
    setFeaturedProjects((prev) => prev.filter((p) => p.id !== id))
    setShowFeaturedWarning(false)
    set('is_featured', true)
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setCoverFile(file)
    if (file) setCoverPreview(URL.createObjectURL(file))
    else setCoverPreview('')
  }

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    setGalleryFiles(files)
    setGalleryPreviews(files.map((f) => URL.createObjectURL(f)))
  }

  const addVideoUrl = () => {
    const url = videoUrl.trim()
    if (!url) return
    setVideoUrls((prev) => [...prev, url])
    setVideoUrl('')
  }

  const removeVideoUrl = (i: number) => {
    setVideoUrls((prev) => prev.filter((_, idx) => idx !== i))
  }

  const removeGalleryFile = (i: number) => {
    setGalleryFiles((prev) => prev.filter((_, idx) => idx !== i))
    setGalleryPreviews((prev) => prev.filter((_, idx) => idx !== i))
  }

  const uploadImage = async (file: File, folder: string): Promise<string> => {
    const ext = file.name.split('.').pop()
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
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
      const gallery_images: string[] = []

      if (coverFile) {
        setUploadProgress('Upload image de couverture...')
        cover_image = await uploadImage(coverFile, 'portfolio')
      }

      for (let i = 0; i < galleryFiles.length; i++) {
        setUploadProgress(`Upload image ${i + 1} / ${galleryFiles.length}...`)
        const url = await uploadImage(galleryFiles[i], 'portfolio/gallery')
        gallery_images.push(url)
      }

      gallery_images.push(...videoUrls)

      setUploadProgress('Enregistrement...')

      const { error } = await supabase.from('portfolio_projects').insert({
        ...form,
        year: form.year ? parseInt(form.year) : null,
        display_order: parseInt(form.display_order),
        cover_image,
        gallery_images,
      })

      if (error) throw error

      router.push('/admin/portfolio')
      router.refresh()
    } catch (err: any) {
      setError(err.message ?? 'Une erreur est survenue.')
      setLoading(false)
      setUploadProgress('')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase mb-2"
            style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
            Portfolio
          </p>
          <h2 className="text-4xl font-light"
            style={{ color: '#F8F6F0', fontFamily: 'Cormorant Garamond, serif' }}>
            Nouveau projet
          </h2>
        </div>
        <Link href="/admin/portfolio" className="text-xs tracking-widest uppercase"
          style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
          ← Retour
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">

        {/* Client */}
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Nom du client *
          </label>
          <input type="text" value={form.client_name}
            onChange={(e) => set('client_name', e.target.value)} required
            className="w-full px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
          />
        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Catégorie *
          </label>
          <select value={form.category} onChange={(e) => set('category', e.target.value)}
            className="w-full px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Description courte */}
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Description courte *
          </label>
          <input type="text" value={form.short_description}
            onChange={(e) => set('short_description', e.target.value)}
            required maxLength={150}
            className="w-full px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
          />
        </div>

        {/* Description longue */}
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Description longue
          </label>
          <textarea value={form.long_description}
            onChange={(e) => set('long_description', e.target.value)}
            rows={6} className="w-full px-4 py-3 text-sm outline-none resize-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
          />
        </div>

        {/* Secteur + Année */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2"
              style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
              Secteur
            </label>
            <input type="text" value={form.sector}
              onChange={(e) => set('sector', e.target.value)}
              className="w-full px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2"
              style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
              Année
            </label>
            <input type="number" value={form.year}
              onChange={(e) => set('year', e.target.value)}
              min="2000" max="2099"
              className="w-full px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
            />
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
            <img src={coverPreview} alt="Apercu couverture"
              className="mt-3 w-40 h-28 object-cover" />
          )}
        </div>

        {/* Galerie images */}
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Galerie — Images
          </label>
          <p className="text-xs mb-3" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
            Max recommande : 5 images par upload.
          </p>
          <input type="file" accept="image/*" multiple onChange={handleGalleryChange}
            className="w-full px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
          />
          {galleryPreviews.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              {galleryPreviews.map((src, i) => (
                <div key={i} className="relative group">
                  <img src={src} alt={`Galerie ${i + 1}`}
                    className="w-full aspect-square object-cover" />
                  <button type="button" onClick={() => removeGalleryFile(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/70 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* URLs vidéo */}
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Galerie — Videos (YouTube, Vimeo, etc.)
          </label>
          <div className="flex gap-2">
            <input type="text" value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="flex-1 px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addVideoUrl() } }}
            />
            <button type="button" onClick={addVideoUrl}
              className="px-4 py-3 text-xs tracking-widest uppercase"
              style={{ backgroundColor: '#1A1A1A', color: '#9A9A9A', border: '1px solid #2A2A2A', fontFamily: 'DM Sans, sans-serif' }}>
              Ajouter
            </button>
          </div>
          {videoUrls.length > 0 && (
            <div className="mt-3 space-y-2">
              {videoUrls.map((url, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2"
                  style={{ backgroundColor: '#0A0A0A', border: '1px solid #1A1A1A' }}>
                  <p className="text-xs truncate flex-1 mr-3"
                    style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
                    {url}
                  </p>
                  <button type="button" onClick={() => removeVideoUrl(i)}
                    className="text-xs shrink-0"
                    style={{ color: '#3A3A3A', fontFamily: 'DM Sans, sans-serif' }}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mis en avant */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              id="is_featured"
              checked={form.is_featured}
              onChange={(e) => handleFeaturedChange(e.target.checked)}
              style={{ accentColor: '#F8F6F0' }}
            />
            <label htmlFor="is_featured" className="text-sm"
              style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
              Projet mis en avant sur la page d'accueil
              <span className="ml-2" style={{ color: '#4A4A4A' }}>
                ({featuredProjects.length} / {MAX_FEATURED})
              </span>
            </label>
          </div>

          {/* Avertissement limite atteinte */}
          {showFeaturedWarning && (
            <div className="mt-3 p-4" style={{ backgroundColor: '#0A0A0A', border: '1px solid #3A3A3A' }}>
              <p className="text-xs mb-3" style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
                La limite de {MAX_FEATURED} projets en avant est atteinte. Retire un projet de la liste pour pouvoir mettre celui-ci en avant.
              </p>
              <div className="space-y-2">
                {featuredProjects.map((p) => (
                  <div key={p.id} className="flex items-center justify-between px-3 py-2"
                    style={{ backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                    <p className="text-xs" style={{ color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
                      {p.client_name}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeFeatured(p.id)}
                      className="text-xs tracking-widest uppercase ml-4"
                      style={{ color: '#ef4444', fontFamily: 'DM Sans, sans-serif' }}
                    >
                      Retirer
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowFeaturedWarning(false)}
                className="mt-3 text-xs tracking-widest uppercase"
                style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
              >
                Annuler
              </button>
            </div>
          )}
        </div>

        {/* Ordre d'affichage */}
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

        {error && (
          <p className="text-xs" style={{ color: '#ef4444', fontFamily: 'DM Sans, sans-serif' }}>
            {error}
          </p>
        )}

        {uploadProgress && (
          <p className="text-xs" style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            {uploadProgress}
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
            {loading ? uploadProgress || 'Enregistrement...' : 'Enregistrer le projet'}
          </button>
          <Link href="/admin/portfolio"
            className="text-xs tracking-widest uppercase"
            style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
            Annuler
          </Link>
        </div>
      </form>
    </div>
  )
}