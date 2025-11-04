import { TetrisPage } from '@/modules/minigames/tetris'
import { BombermanPage } from '@/modules/minigames/bomberman'

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
    disabled: false,
    board: BombermanPage,
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
