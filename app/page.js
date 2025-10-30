import DuetsWebsite from '@/components/DuetsWebsite'

export const metadata = {
  title: 'Duets - The Best Loved Duets in Musical Theatre and Pop',
  description: 'Experience the magic of musical theatre\'s most iconic partnerships. From Broadway classics to contemporary pop sensations.',
  keywords: 'duets, musical theatre, broadway, cruise entertainment, live performance',
  openGraph: {
    title: 'Duets - Musical Theatre and Pop',
    description: 'The best loved duets in Musical Theatre and Pop',
    type: 'website',
  },
}

export default function Home() {
  return <DuetsWebsite />
}