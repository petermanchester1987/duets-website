export default {
  name: 'heroImage',
  title: 'Hero Image',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only one hero image should be active at a time',
      initialValue: true
    }
  ]
}