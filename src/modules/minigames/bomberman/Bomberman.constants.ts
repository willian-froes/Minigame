import { Player } from './Bomberman.types'

export const FIELD_ROWS: number = 11

export const FIELD_COLUMNS: number = 15

export const FIELD_AREA_SIZE: number = 75

export const LIFES_INITIAL: number = 3

export const PLAYER_INITIAL: Player = {
  color: 'blue',
  position: {
    x: 1,
    y: 1,
  },
}
