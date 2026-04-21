'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const CATEGORIES = ['Social Media', 'Shooting', 'Branding', 'Événementiel', 'Web']
const MAX_FEATURED = 6

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([])
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([])
  const [existingGallery, setExistingGallery] = useState<string[]>([])
  const [videoUrl, setVideoUrl] = useState('')
  const [videoUrls, setVideoUrls] = useState<string[]>([])
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([])
  const [showFeaturedWarning, setShowFeaturedWarning] = useState(false)
  const [originalFeatured, setOriginalFeatured] = useState(false)
  const [form, setForm] = useState({
    client_name: '',
    category: 'Branding',
    short_description: '',
    long_description: '',
    sector: '',
    year: '',
    is_featured: false,
    display_order: '0',
    cover_image: '',
  })

  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }))

  const isVideoUrl = (url: string) =>
    url.includes('youtube.com') ||
    url.includes('youtu.be') ||
    url.includes('vimeo.com') ||
    url.includes('facebook.com/watch') ||
    url.includes('tiktok.com')

  useEffect(() => {
    supabase
      .from('portfolio_projects')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }: { data: any }) => {
        if (data) {
          const gallery: string[] = data.gallery_images ?? []
          const images = gallery.filter((u: string) => !isVideoUrl(u))
          const videos = gallery.filter((u: string) => isVideoUrl(u))

          setForm({
            client_name: data.client_name ?? '',
            category: data.category ?? 'Branding',
            short_description: data.short_description ?? '',
            long_description: data.long_description ?? '',
            sector: data.sector ?? '',
            year: data.year?.toString() ?? '',
            is_featured: data.is_featured ?? false,
            display_order: data.display_order?.toString() ?? '0',
            cover_image: data.cover_image ?? '',
          })
          setOriginalFeatured(data.is_featured ?? false)
          setExistingGallery(images)
          setVideoUrls(videos)
        }
        setFetching(false)
      })

    supabase
      .from('portfolio_projects')
      .select('id, client_name, display_order')
      .eq('is_featured', true)
      .neq('id', id)
      .order('display_order', { ascending: true })
      .then(({ data }: { data: any }) => setFeaturedProjects(data ?? []))
  }, [id])

  const handleFeaturedChange = (checked: boolean) => {
    // Si on coche et qu'on était pas déjà featured
    if (checked && !originalFeatured && featuredProjects.length >= MAX_FEATURED) {
      setShowFeaturedWarning(true)
      return
    }
    set('is_featured', checked)
  }

  const removeFeatured = async (pid: string) => {
    await supabase
      .from('portfolio_projects')
      .update({ is_featured: false })
      .eq('id', pid)
    setFeaturedProjects((prev) => prev.filter((p) => p.id !== pid))
    setShowFeaturedWarning(false)
    set('is_featured', true)
  }

  const removeExistingImage = (i: number) => {
    setExistingGallery((prev) => prev.filter((_, idx) => idx !== i))
  }

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    setNewGalleryFiles(files)
    setNewGalleryPreviews(files.map((f) => URL.createObjectURL(f)))
  }

  const removeNewGalleryFile = (i: number) => {
    setNewGalleryFiles((prev) => prev.filter((_, idx) => idx !== i))
    setNewGalleryPreviews((prev) => prev.filter((_, idx) => idx !== i))
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
      let cover_image = form.cover_image

      if (coverFile) {
        setUploadProgress('Upload image de couverture...')
        cover_image = await uploadImage(coverFile, 'portfolio')
      }

      // Upload nouvelles images galerie
      const newImageUrls: string[] = []
      for (let i = 0; i < newGalleryFiles.length; i++) {
        setUploadProgress(`Upload image ${i + 1} / ${newGalleryFiles.length}...`)
        const url = await uploadImage(newGalleryFiles[i], 'portfolio/gallery')
        newImageUrls.push(url)
      }

      // Galerie finale = images existantes conservées + nouvelles images + vidéos
      const gallery_images = [...existingGallery, ...newImageUrls, ...videoUrls]

      setUploadProgress('Enregistrement...')

      const { error } = await supabase
        .from('portfolio_projects')
        .update({
          ...form,
          year: form.year ? parseInt(form.year) : null,
          display_order: parseInt(form.display_order),
          cover_image,
          gallery_images,
        })
        .eq('id', id)

      if (error) throw error

      router.push('/admin/portfolio')
      router.refresh()
    } catch (err: any) {
      setError(err.message ?? 'Une erreur est survenue.')
      setLoading(false)
      setUploadProgress('')
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
            Portfolio
          </p>
          <h2 className="text-4xl font-light"
            style={{ color: '#F8F6F0', fontFamily: 'Cormorant Garamond, serif' }}>
            Modifier le projet
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

        {/* Galerie existante */}
        {existingGallery.length > 0 && (
          <div>
            <label className="block text-xs tracking-widest uppercase mb-2"
              style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
              Galerie actuelle — Images
            </label>
            <p className="text-xs mb-3" style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}>
              Clique sur ✕ pour supprimer une image de la galerie.
            </p>
            <div className="grid grid-cols-4 gap-2">
              {existingGallery.map((src, i) => (
                <div key={i} className="relative group">
                  <img src={src} alt={`Galerie ${i + 1}`}
                    className="w-full aspect-square object-cover" />
                  <button type="button" onClick={() => removeExistingImage(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/70 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nouvelles images galerie */}
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2"
            style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
            Galerie — Ajouter des images
          </label>
          <input type="file" accept="image/*" multiple onChange={handleGalleryChange}
            className="w-full px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: '#0F0F0F', border: '1px solid #2A2A2A', color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
          />
          {newGalleryPreviews.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              {newGalleryPreviews.map((src, i) => (
                <div key={i} className="relative group">
                  <img src={src} alt={`Nouveau ${i + 1}`}
                    className="w-full aspect-square object-cover" />
                  <button type="button" onClick={() => removeNewGalleryFile(i)}
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
            <input type="checkbox" id="is_featured" checked={form.is_featured}
              onChange={(e) => handleFeaturedChange(e.target.checked)}
              style={{ accentColor: '#F8F6F0' }}
            />
            <label htmlFor="is_featured" className="text-sm"
              style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
              Projet mis en avant sur la page d'accueil
              <span className="ml-2" style={{ color: '#4A4A4A' }}>
                ({featuredProjects.length + (originalFeatured ? 1 : 0)} / {MAX_FEATURED})
              </span>
            </label>
          </div>

          {showFeaturedWarning && (
            <div className="mt-3 p-4" style={{ backgroundColor: '#0A0A0A', border: '1px solid #3A3A3A' }}>
              <p className="text-xs mb-3" style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}>
                La limite de {MAX_FEATURED} projets en avant est atteinte. Retire un projet pour pouvoir mettre celui-ci en avant.
              </p>
              <div className="space-y-2">
                {featuredProjects.map((p) => (
                  <div key={p.id} className="flex items-center justify-between px-3 py-2"
                    style={{ backgroundColor: '#111', border: '1px solid #1A1A1A' }}>
                    <p className="text-xs" style={{ color: '#F8F6F0', fontFamily: 'DM Sans, sans-serif' }}>
                      {p.client_name}
                    </p>
                    <button type="button" onClick={() => removeFeatured(p.id)}
                      className="text-xs tracking-widest uppercase ml-4"
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
            {loading ? uploadProgress || 'Enregistrement...' : 'Enregistrer les modifications'}
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