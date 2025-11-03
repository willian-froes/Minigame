import { Metadata } from 'next'

import { LobbyPage } from '@/modules/lobby'

export const metadata: Metadata = {
  title: 'Hub de Minigames',
  icons: {
    icon: [
      {
        url: '/favicons/lobby/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicons/lobby/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicons/lobby/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
    ],
    apple: '/favicons/lobby/apple-touch-icon.png',
  },
  authors: [
    {
      name: 'Willian Froes',
      url: 'https://github.com/willian-froes',
    },
  ],
  openGraph: {
    title: 'Hub de Minigames',
    description: 'Developed by Will',
    url: 'https://github.com/willian-froes/Minigame',
  },
}

const Page = () => <LobbyPage />

export default Page
