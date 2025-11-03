import { TetrisPage } from '@/modules/minigames/tetris'
import { MiniGame, MiniGameBySlug } from '../types'

export const MINIGAMES: MiniGame[] = [
  {
    id: 1,
    name: 'Tetris',
    url: '/minigames/tetris',
    disabled: false,
    board: TetrisPage,
  },
  {
    id: 2,
    name: 'Bomberman',
    url: '/minigames/bomberman',
    disabled: true,
    board: () => null,
  },
]

export const MINIGAMES_BY_SLUG: MiniGameBySlug = MINIGAMES.reduce(
  (acc, game) => {
    const key = game.name.toLowerCase() as Lowercase<MiniGame['name']>
    acc[key] = game

    return acc
  },
  {} as MiniGameBySlug,
)
