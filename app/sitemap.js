import { getBlogs, getCalendarEvents } from '@/lib/sanity-queries'

export default async function sitemap() {
  const baseUrl = 'https://your-domain.vercel.app' // Update with your actual domain
  
  const blogs = await getBlogs().catch(() => [])
  const events = await getCalendarEvents().catch(() => [])

  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug.current}`,
    lastModified: new Date(blog.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/#features`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#calendar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  return [...staticPages, ...blogUrls]
}