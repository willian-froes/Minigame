import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { LayoutWrapper } from './page.styles'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Minigame',
  description: 'Developed by Will',
  authors: [
    {
      name: 'Willian Froes',
      url: 'https://github.com/willian-froes',
    },
  ],
  openGraph: {
    title: 'Minigame',
    description: 'Developed by Will',
    url: 'https://github.com/willian-froes/Minigame',
  },
}

type LayoutProps = Readonly<{
  children: React.ReactNode
}>

export const Layout = ({ children }: LayoutProps) => (
  <html lang="pt-BR">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <LayoutWrapper>{children}</LayoutWrapper>
    </body>
  </html>
)

export default Layout
