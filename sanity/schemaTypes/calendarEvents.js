export default {
  name: 'calendarEvent',
  title: 'Calendar Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'month',
      title: 'Month',
      type: 'string',
      options: {
        list: [
          {title: 'January', value: 'january'},
          {title: 'February', value: 'february'},
          {title: 'March', value: 'march'},
          {title: 'April', value: 'april'},
          {title: 'May', value: 'may'},
          {title: 'June', value: 'june'},
          {title: 'July', value: 'july'},
          {title: 'August', value: 'august'},
          {title: 'September', value: 'september'},
          {title: 'October', value: 'october'},
          {title: 'November', value: 'november'},
          {title: 'December', value: 'december'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'venue',
      title: 'Venue',
      type: 'string'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'ticketLink',
      title: 'Ticket Link',
      type: 'url'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'venue',
      date: 'date'
    },
    prepare(selection) {
      const {title, subtitle, date} = selection
      return {
        title: title,
        subtitle: `${subtitle} - ${new Date(date).toLocaleDateString()}`
      }
    }
  }
}