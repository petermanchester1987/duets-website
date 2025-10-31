import DuetsWebsite from '@/components/DuetsWebsite'
import { 
  getHeroImage, 
  getVideos, 
  getBlogs, 
  getCalendarEvents, 
  getTestimonials 
} from '@/lib/sanity-queries'

export const metadata = {
  title: 'Duets - The Best Loved Duets in Musical Theatre and Pop',
  description: 'Experience the magic of musical theatre\'s most iconic partnerships. From Broadway classics to contemporary pop sensations, witness two extraordinary voices unite in perfect harmony.',
  keywords: 'duets, musical theatre, broadway, cruise entertainment, live performance, west end, pop music',
  authors: [{ name: 'Duets' }],
  openGraph: {
    title: 'Duets - Musical Theatre and Pop',
    description: 'The best loved duets in Musical Theatre and Pop performed by West End performers',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Add your OpenGraph image
        width: 1200,
        height: 630,
        alt: 'Duets Performance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duets - Musical Theatre and Pop',
    description: 'The best loved duets in Musical Theatre and Pop',
  },
}

// This enables Static Site Generation with revalidation
export const revalidate = 3600 // Revalidate every hour (in seconds)

export default async function Home() {
  // Fetch all data server-side
  const [heroImage, videos, blogs, calendarEvents, testimonials] = await Promise.all([
    getHeroImage().catch(() => null),
    getVideos().catch(() => []),
    getBlogs().catch(() => []),
    getCalendarEvents().catch(() => []),
    getTestimonials().catch(() => []),
  ])

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'PerformingGroup',
    name: 'Duets',
    description: 'The best loved duets in Musical Theatre and Pop',
    genre: ['Musical Theatre', 'Pop Music'],
    events: calendarEvents.map(event => ({
      '@type': 'Event',
      name: event.title,
      startDate: event.date,
      location: {
        '@type': 'Place',
        name: event.venue,
        address: event.location
      },
      ...(event.ticketLink && {
        offers: {
          '@type': 'Offer',
          url: event.ticketLink
        }
      })
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DuetsWebsite 
        heroImage={heroImage}
        videos={videos}
        blogs={blogs}
        calendarEvents={calendarEvents}
        testimonials={testimonials}
      />
    </>
  )
}