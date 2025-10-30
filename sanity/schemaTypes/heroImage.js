export default {
  name: 'heroImage',
  title: 'Hero Image',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string'
    }
  ]
}