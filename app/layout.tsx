import type { Metadata } from 'next'
import { IBM_Plex_Mono, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-ibm-plex-mono',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Rafael Ramos — Director of Software Engineering',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
