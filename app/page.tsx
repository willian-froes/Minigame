import { Metadata } from 'next'

import Content from './page.content'

export const metadata: Metadata = {
  title: 'Hub de Minigames',
  icons: {
    icon: [
      {
        url: '/favicons/home/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicons/home/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicons/home/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
    ],
    apple: '/favicons/home/apple-touch-icon.png',
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

export const Page = () => <Content />

export default Page
