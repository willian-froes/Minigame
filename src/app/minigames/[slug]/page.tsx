import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import { MINIGAMES_BY_SLUG } from '@/shared/constants'
import { MiniGameSlug } from '@/shared/types'

type MinigamePageProps = {
  params: Promise<{
    slug: MiniGameSlug
  }>
}

export const generateMetadata = async (
  props: MinigamePageProps,
): Promise<Metadata> => {
  const { slug } = await props.params

  const miniGame = MINIGAMES_BY_SLUG[slug]

  if (!miniGame) return {}

  return {
    title: `Hub | ${miniGame.name}`,
    icons: {
      icon: [
        {
          url: `/favicons/${slug}/favicon-16x16.png`,
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: `/favicons/${slug}/favicon-32x32.png`,
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: `/favicons/${slug}/favicon-48x48.png`,
          sizes: '48x48',
          type: 'image/png',
        },
      ],
      apple: `/favicons/${slug}/apple-touch-icon.png`,
    },
  }
}

const MinigamePage = async ({ params }: MinigamePageProps) => {
  const { slug } = await params

  const miniGame = MINIGAMES_BY_SLUG[slug]

  if (!miniGame) return notFound()

  const Board = miniGame.board

  return <Board />
}

export default MinigamePage
