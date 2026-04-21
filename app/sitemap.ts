import { MetadataRoute } from 'next'
import { supabaseServer } from '@/lib/supabase-server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://digiflex-burkina.com'

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  // Pages dynamiques portfolio
  const { data: projects } = await supabaseServer
    .from('portfolio_projects')
    .select('client_name, updated_at')
    .order('display_order', { ascending: true })

  const portfolioPages: MetadataRoute.Sitemap = (projects ?? []).map((p: any) => {
    const slug = p.client_name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
    return {
      url: `${baseUrl}/portfolio/${slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  })

  // Pages dynamiques blog
  const { data: articles } = await supabaseServer
    .from('blog_articles')
    .select('slug, updated_at')
    .eq('status', 'published')

  const blogPages: MetadataRoute.Sitemap = (articles ?? []).map((a: any) => ({
    url: `${baseUrl}/blog/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...portfolioPages, ...blogPages]
}