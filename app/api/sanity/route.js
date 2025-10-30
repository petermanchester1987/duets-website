import { client } from '@/lib/sanity'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  try {
    let query = ''
    
    switch(type) {
      case 'hero':
        query = `*[_type == "heroImage" && isActive == true][0]{
          _id,
          alt,
          "imageUrl": image.asset->url
        }`
        break
      
      case 'videos':
        query = `*[_type == "video" && isPublished == true] | order(order asc){
          _id,
          title,
          youtubeId,
          description,
          order
        }`
        break
      
      case 'blogs':
        query = `*[_type == "blogPost"] | order(publishedAt desc)[0...6]{
          _id,
          title,
          slug,
          excerpt,
          publishedAt,
          "imageUrl": mainImage.asset->url
        }`
        break
      
      case 'calendar':
        query = `*[_type == "calendarEvent"] | order(date asc){
          _id,
          title,
          month,
          year,
          date,
          venue,
          location,
          description,
          ticketLink
        }`
        break
      
      case 'testimonials':
        query = `*[_type == "testimonial"] | order(order asc){
          _id,
          text,
          author,
          role,
          "imageUrl": image.asset->url
        }`
        break
      
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    const data = await client.fetch(query)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch data', details: error.message }, { status: 500 })
  }
}