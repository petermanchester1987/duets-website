import { client } from '@/lib/sanity'

export async function getHeroImage() {
  const query = `*[_type == "heroImage" && isActive == true][0]{
    _id,
    alt,
    "imageUrl": image.asset->url
  }`
  return await client.fetch(query)
}

export async function getVideos() {
  const query = `*[_type == "video" && isPublished == true] | order(order asc){
    _id,
    title,
    youtubeId,
    description,
    order
  }`
  return await client.fetch(query)
}

export async function getBlogs() {
  const query = `*[_type == "blogPost"] | order(publishedAt desc)[0...6]{
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "imageUrl": mainImage.asset->url
  }`
  return await client.fetch(query)
}

export async function getCalendarEvents() {
  const query = `*[_type == "calendarEvent"] | order(date asc){
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
  return await client.fetch(query)
}

export async function getTestimonials() {
  const query = `*[_type == "testimonial"] | order(order asc){
    _id,
    text,
    author,
    role,
    "imageUrl": image.asset->url
  }`
  return await client.fetch(query)
}