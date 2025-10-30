export default {
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Video Title',
      type: 'string'
    },
    {
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'Example: dQw4w9WgXcQ from https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }
  ]
}