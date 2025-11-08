import { Player } from './Bomberman.types'

export const FIELD_ROWS: number = 11

export const FIELD_COLUMNS: number = 15

export const FIELD_AREA_SIZE: number = 75

export const PLAYER_INITIAL: Player = {
  id: 1,
  color: 'blue',
  movement: {
    position: {
      x: 1,
      y: 1,
    },
    direction: 'down',
  },
  attributes: {
    lifes: 3,
    multipleBombsLimit: 1,
    explosionRange: 1,
    movementVelocity: 1,
  },
}
