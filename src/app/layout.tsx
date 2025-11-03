import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

import { LobbyLayout } from '@/modules/lobby'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

type LayoutProps = Readonly<{
  children: React.ReactNode
}>

export const Layout = ({ children }: LayoutProps) => (
  <html lang="pt-BR">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <LobbyLayout>{children}</LobbyLayout>
    </body>
  </html>
)

export default Layout
