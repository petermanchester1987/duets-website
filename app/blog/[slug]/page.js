import { client } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { Calendar, ArrowLeft } from 'lucide-react'

export const revalidate = 3600 // Revalidate every hour

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const query = `*[_type == "blogPost"]{ "slug": slug.current }`
  const posts = await client.fetch(query)
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Fetch single blog post with proper image references
async function getPost(slug) {
  const query = `*[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    headerType,
    "mainImage": mainImage.asset->url,
    youtubeId,
    body[]{
      ...,
      _type == "image" => {
        ...,
        "imageUrl": asset->url,
        "alt": alt
      }
    }
  }`
  
  return await client.fetch(query, { slug })
}

// Format date
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: `${post.title} | Duets Blog`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: post.mainImage ? [
        {
          url: post.mainImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
    },
  }
}

// Portable Text components for styling
const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.imageUrl) return null
      
      return (
        <div className="my-8 rounded-2xl overflow-hidden">
          <img
            src={value.imageUrl}
            alt={value.alt || 'Blog image'}
            className="w-full h-auto"
          />
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-400 mt-12">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white mt-8">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-lg text-gray-300 mb-6 leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-cyan-500 pl-6 py-2 my-8 italic text-gray-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-300">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 hover:text-fuchsia-400 underline transition-colors"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
  },
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/" className="text-cyan-400 hover:text-fuchsia-400 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    )
  }
  
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

      {/* Hero Section with Title and Date */}
      <section className="relative pt-32 pb-8 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-cyan-400 mb-6">
            <Calendar className="w-5 h-5" />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-gray-300 leading-relaxed max-w-4xl">
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* Featured Media Section - Image or Video */}
      <section className="relative px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          {post.headerType === 'youtube' && post.youtubeId ? (
            // YouTube Video Header
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 shadow-2xl shadow-cyan-500/20">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${post.youtubeId}`}
                title={post.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : post.mainImage ? (
            // Image Header
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 shadow-2xl shadow-cyan-500/20">
              <img
                src={post.mainImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}
        </div>
      </section>

      {/* Content Section */}
      <article className="relative px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          {post.body && post.body.length > 0 ? (
            <div className="prose prose-invert prose-lg max-w-none">
              <PortableText 
                value={post.body} 
                components={portableTextComponents}
              />
            </div>
          ) : (
            <p className="text-gray-400 text-center py-12">No content available</p>
          )}
          
          {/* Back to Blog Link */}
          <div className="mt-16 pt-8 border-t border-cyan-500/20">
            <Link 
              href="/#blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full font-semibold hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            DUETS
          </div>
          <p className="text-gray-500 mb-4">© 2025 Duets. All rights reserved.</p>
          <p className="text-gray-600 text-sm">Bringing musical magic to stages and seas worldwide</p>
        </div>
      </footer>
    </div>
  )
}