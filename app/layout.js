import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Duets - Musical Theatre and Pop',
  description: 'The best loved duets in Musical Theatre and Pop',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-gramm="false">
      <body className={inter.className}>{children}</body>
    </html>
  )
}