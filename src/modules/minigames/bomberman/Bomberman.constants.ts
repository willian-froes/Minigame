import { Player, PlayerColor, PlayerColorModel } from './Bomberman.types'

export const FIELD_ROWS: number = 11

export const FIELD_COLUMNS: number = 15

export const FIELD_AREA_SIZE: number = 75

export const PLAYER_INITIAL: Player = {
  id: 1,
  color: 'white',
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

export const POWER_UP_TYPES = ['bomb', 'velocity', 'explosion'] as const

export const PLAYER_COLOR_BY_MODEL: Record<PlayerColor, PlayerColorModel> = {
  white: {
    head: '#FFFFFF',
    hands: '#FC456F',
    hair: '#FB4570',
    body: '#0725EF',
  },
  black: {
    head: '#291D3D',
    hands: '#FC456F',
    hair: '#FB4570',
    body: '#2D2B2C',
  },
  red: {
    head: '#C60F1B',
    hands: '#FC456F',
    hair: '#FB4570',
    body: '#CA1E1F',
  },
  green: {
    head: '#9BDB61',
    hands: '#FC456F',
    hair: '#FB4570',
    body: '#AFD582',
  },
}

export const PLAYER_SPEED_BASE_IN_MILLISECONDS = 150
