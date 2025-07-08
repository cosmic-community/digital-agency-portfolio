import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Digital Agency Portfolio - Expert Web Development & Design Services',
  description: 'Professional digital agency offering web development, UI/UX design, and digital strategy consulting. Transform your business with our expert team.',
  keywords: 'web development, UI/UX design, digital strategy, consulting, agency',
  authors: [{ name: 'Digital Agency Portfolio' }],
  openGraph: {
    title: 'Digital Agency Portfolio',
    description: 'Professional digital agency offering web development, UI/UX design, and digital strategy consulting.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}