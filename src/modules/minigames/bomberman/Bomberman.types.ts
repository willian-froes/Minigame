import { POWER_UP_TYPES } from './Bomberman.constants'

export type Field = Array<Array<Block | undefined>>

export type Block = {
  type: BlockType
  drop?: PowerUp
}

export type BlockType = 'solid' | 'breakable' | 'grass'

export type PowerUp = {
  id: string
  type: PowerUpType
  position?: Position
}

export type PowerUpType = (typeof POWER_UP_TYPES)[number]

export type Player = {
  id: number
  color: PlayerColor
  movement: PlayerMovement
  attributes: PlayerAttributes
  lastDamageFrom?: string | null
}

export type PlayerMovement = {
  position: Position
  direction: Direction
}

export type PlayerAttributes = {
  lifes: number
  multipleBombsLimit: number
  explosionRange: number
  movementVelocity: number
}

export type PlayerColor = 'white' | 'black' | 'red' | 'green'

export type PlayerColorModel = {
  head: string
  hands: string
  hair: string
  body: string
}

export type Position = {
  x: number
  y: number
}

export type Direction = 'left' | 'right' | 'up' | 'down' | null

export type Bomb = {
  id: string
  position: Position
  range: number
  isExploded?: boolean
  parentId?: string
  playerId?: number
}
