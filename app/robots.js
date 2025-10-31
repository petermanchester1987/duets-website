export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
    ],
    sitemap: 'duets.the-manchesters.com/sitemap.xml', // Update with your domain
  }
}