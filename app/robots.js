export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://your-domain.vercel.app/sitemap.xml',
  }
}