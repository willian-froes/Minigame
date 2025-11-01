import { Metadata } from 'next'

import Content from './page.content'

export const metadata: Metadata = {
  title: 'Hub | Tetris',
  icons: {
    icon: [
      {
        url: '/favicons/tetris/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicons/tetris/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicons/tetris/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
    ],
    apple: '/favicons/tetris/apple-touch-icon.png',
  },
}

const Page = () => <Content />

export default Page
