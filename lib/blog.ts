import { supabaseServer } from './supabase'
import { blogPosts as fallbackPosts } from '@/data/blog'
import type { BlogPost } from '@/data/blog'

export type ArticleFromDB = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  cover_image: string | null
  category: string | null
  status: string
  published_at: string | null
  created_at: string
}

function toBlogPost(a: ArticleFromDB): BlogPost {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt ?? '',
    content: a.content ?? '',
    coverImage: a.cover_image ?? '',
    date: a.published_at
      ? new Date(a.published_at).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : 'Bientot',
    author: 'Digiflex',
    readTime: '5 min',
    category: a.category ?? 'General',
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabaseServer
      .from('blog_articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return fallbackPosts
    }

    return data.map(toBlogPost)
  } catch {
    return fallbackPosts
  }
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabaseServer
      .from('blog_articles')
      .select('*')
      .eq('status', 'published')
      .eq('is_featured', true)
      .order('published_at', { ascending: false })
      .limit(3)

    if (error || !data || data.length === 0) {
      return fallbackPosts.slice(0, 3)
    }

    return data.map(toBlogPost)
  } catch {
    return fallbackPosts.slice(0, 3)
  }
}

export async function getRecentBlogPosts(limit = 3): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabaseServer
      .from('blog_articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error || !data || data.length === 0) {
      return fallbackPosts.slice(0, limit)
    }

    return data.map(toBlogPost)
  } catch {
    return fallbackPosts.slice(0, limit)
  }
}