import { client } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowLeft } from 'lucide-react'

async function getAllBlogs() {
  const query = `*[_type == "blogPost"] | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "imageUrl": mainImage.asset->url
  }`
  return await client.fetch(query)
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export const metadata = {
  title: 'Blog | Duets',
  description: 'Latest news, performances, and behind-the-scenes stories from Duets',
}

export default async function BlogPage() {
  const blogs = await getAllBlogs()
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-fuchsia-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              DUETS
            </span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Latest news, performances, and behind-the-scenes stories
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link 
                key={blog._id} 
                href={`/blog/${blog.slug.current}`}
                className="group relative bg-gray-900/50 border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                {blog.imageUrl ? (
                  <div className="aspect-video overflow-hidden relative">
                    <Image 
                      src={blog.imageUrl} 
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-cyan-400 opacity-50" />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-sm text-cyan-400 mb-2">{formatDate(blog.publishedAt)}</p>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                    {blog.title}
                  </h3>
                  {blog.excerpt && (
                    <p className="text-gray-400 text-sm line-clamp-3">{blog.excerpt}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            DUETS
          </div>
          <p className="text-gray-500 mb-4">© 2025 Duets. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}