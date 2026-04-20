import { supabaseServer } from '@/lib/supabase-server'
import { projects as fallbackProjects } from '@/data/portfolio'
import type { PortfolioProject } from '@/data/portfolio'

export type ProjectFromDB = {
  id: string
  client_name: string
  category: string
  short_description: string
  long_description: string | null
  sector: string | null
  year: number | null
  cover_image: string | null
  gallery_images: string[]
  is_featured: boolean
  display_order: number
  created_at: string
}

// Convertit un projet Supabase vers le format du site
function toPortfolioProject(p: ProjectFromDB): PortfolioProject {
  return {
    id: p.id,
    slug: p.client_name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-'),
    name: p.client_name,
    category: p.category as PortfolioProject['category'],
    excerpt: p.short_description,
    description: p.long_description ?? p.short_description,
    coverImage: p.cover_image ?? '',
    images: p.gallery_images,
    year: p.year?.toString() ?? '',
    sector: p.sector ?? undefined,
  }
}

export async function getFeaturedProjects(): Promise<PortfolioProject[]> {
  try {
    const { data, error } = await supabaseServer
      .from('portfolio_projects')
      .select('*')
      .eq('is_featured', true)
      .order('display_order', { ascending: true })
      .limit(6)

    if (error || !data || data.length === 0) {
      return fallbackProjects.slice(0, 6)
    }

    return data.map(toPortfolioProject)
  } catch {
    return fallbackProjects.slice(0, 6)
  }
}

export async function getProjects(): Promise<PortfolioProject[]> {
  try {
    const { data, error } = await supabaseServer
      .from('portfolio_projects')
      .select('*')
      .order('display_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return fallbackProjects
    }

    return data.map(toPortfolioProject)
  } catch {
    return fallbackProjects
  }
}