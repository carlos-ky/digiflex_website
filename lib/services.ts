import { supabaseServer } from './supabase-server'
import { services as fallbackServices } from '@/data/services'

export type ServiceCategory = {
  id: string
  name: string
  slug: string
  description: string | null
  display_order: number
  is_active: boolean
}

export type ServiceFromDB = {
  id: string
  number: string
  name: string
  slug: string
  description: string
  long_description: string | null
  includes: string[]
  portfolio_category: string | null
  category_id: string | null
  is_active: boolean
  is_home: boolean
  display_order: number
  created_at: string
  updated_at: string
  service_categories?: ServiceCategory
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  try {
    const { data, error } = await supabaseServer
      .from('service_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error || !data) return []
    return data
  } catch {
    return []
  }
}

export async function getServices(): Promise<ServiceFromDB[]> {
  try {
    const { data, error } = await supabaseServer
      .from('services')
      .select('*, service_categories(*)')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return fallbackServices.map((s, i) => ({
        id: s.number,
        number: s.number,
        name: s.name,
        slug: s.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-'),
        description: s.description,
        long_description: null,
        includes: s.includes,
        portfolio_category: null,
        category_id: null,
        is_active: true,
        is_home: false,
        display_order: i,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))
    }

    return data
  } catch {
    return fallbackServices.map((s, i) => ({
      id: s.number,
      number: s.number,
      name: s.name,
      slug: s.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-'),
      description: s.description,
      long_description: null,
      includes: s.includes,
      portfolio_category: null,
      category_id: null,
      is_active: true,
      is_home: false,
      display_order: i,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }))
  }
}

export async function getServicesByCategory(categorySlug: string): Promise<ServiceFromDB[]> {
  try {
    const { data: category } = await supabaseServer
      .from('service_categories')
      .select('id')
      .eq('slug', categorySlug)
      .single()

    if (!category) return []

    const { data, error } = await supabaseServer
      .from('services')
      .select('*')
      .eq('category_id', category.id)
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error || !data) return []
    return data
  } catch {
    return []
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceFromDB | null> {
  try {
    const { data, error } = await supabaseServer
      .from('services')
      .select('*, service_categories(*)')
      .eq('slug', slug)
      .single()

    if (error || !data) return null
    return data
  } catch {
    return null
  }
}