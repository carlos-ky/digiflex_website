import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

let browserClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabase() {
  if (!browserClient) {
    browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey)
  }
  return browserClient
}

export const supabase = getSupabase()

export type PortfolioProject = {
  id: string
  client_name: string
  category: 'Social Media' | 'Shooting' | 'Branding' | 'Événementiel' | 'Web'
  short_description: string
  long_description: string | null
  sector: string | null
  year: number | null
  cover_image: string | null
  gallery_images: string[]
  is_featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export type BlogArticle = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  category: string | null
  status: 'draft' | 'published'
  published_at: string | null
  created_at: string
  updated_at: string
}

export type ContactMessage = {
  id: string
  full_name: string
  email: string
  phone: string | null
  company: string | null
  message: string
  is_read: boolean
  created_at: string
}