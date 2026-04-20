'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  )
  return match ? match[1] : null
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match ? match[1] : null
}

function isVideoUrl(url: string): boolean {
  return (
    url.includes('youtube.com') ||
    url.includes('youtu.be') ||
    url.includes('vimeo.com') ||
    url.includes('facebook.com/watch') ||
    url.includes('tiktok.com')
  )
}

function MediaThumb({
  url,
  alt,
  onClick,
}: {
  url: string
  alt: string
  onClick: () => void
}) {
  const isVideo = isVideoUrl(url)
  const ytId = getYouTubeId(url)

  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden cursor-pointer group"
    >
      {isVideo ? (
        <div
          className="relative aspect-video bg-black flex items-center justify-center"
          style={{ minHeight: '160px' }}
        >
          {ytId ? (
            <Image
              src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
              alt={alt}
              fill
              className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
              quality={70}
            />
          ) : (
            <div className="absolute inset-0 bg-black/80" />
          )}
          <div className="relative z-10 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <div
              className="w-0 h-0 ml-1"
              style={{
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderLeft: '14px solid white',
              }}
            />
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden">
          <Image
            src={url}
            alt={alt}
            width={800}
            height={600}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={75}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
    </div>
  )
}

function LightboxModal({
  url,
  alt,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  url: string
  alt: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}) {
  const isVideo = isVideoUrl(url)
  const ytId = getYouTubeId(url)
  const vimeoId = getVimeoId(url)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      {/* Fermer */}
      <button
        className="absolute top-6 right-6 text-white/60 hover:text-white text-xs tracking-widest uppercase z-10"
        onClick={onClose}
        style={{ fontFamily: 'DM Sans, sans-serif' }}
      >
        Fermer ✕
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-2xl z-10 px-4 py-8"
          onClick={(e) => { e.stopPropagation(); onPrev() }}
        >
          ‹
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-2xl z-10 px-4 py-8"
          onClick={(e) => { e.stopPropagation(); onNext() }}
        >
          ›
        </button>
      )}

      {/* Contenu */}
      <div
        className="relative max-w-5xl w-full mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <div className="relative aspect-video w-full">
            {ytId && (
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                title={alt}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            )}
            {vimeoId && (
              <iframe
                src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
                title={alt}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            )}
            {!ytId && !vimeoId && (
              <div className="flex items-center justify-center h-full">
                
                <a  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest uppercase text-white/60 border border-white/20 px-6 py-3"
                >
                  Voir la vidéo →
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <Image
              src={url}
              alt={alt}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[85vh] object-contain"
              quality={90}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default function GalleryLightbox({
  items,
  projectName,
}: {
  items: string[]
  projectName: string
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  if (items.length === 0) return null

  return (
    <>
      {/* Masonry grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-3">
        {items.map((url, i) => (
          <div key={i} className="break-inside-avoid mb-3">
            <MediaThumb
              url={url}
              alt={`${projectName} — ${i + 1}`}
              onClick={() => setActiveIndex(i)}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <LightboxModal
          url={items[activeIndex]}
          alt={`${projectName} — ${activeIndex + 1}`}
          onClose={() => setActiveIndex(null)}
          onPrev={() => setActiveIndex((i) => (i !== null ? i - 1 : null))}
          onNext={() => setActiveIndex((i) => (i !== null ? i + 1 : null))}
          hasPrev={activeIndex > 0}
          hasNext={activeIndex < items.length - 1}
        />
      )}
    </>
  )
}