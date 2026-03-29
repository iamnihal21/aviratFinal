import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/app/(frontend)/components/header'
import { Footer } from '@/app/(frontend)/components/footer'


import './styles/globals.css'
// import './globals.css'


const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Avirat University | Excellence in Education Since 1892',
  description: 'Avirat University is a leading research institution offering undergraduate, graduate, and doctoral programs across engineering, sciences, humanities, and the arts.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1419' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}