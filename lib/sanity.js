import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Set to true for production (better performance)
  perspective: 'published', // Only fetch published documents
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}