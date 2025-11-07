export type Field = Array<Array<Block | undefined>>

export type Block = {
  type: BlockType
  drop?: PowerUp
}

export type BlockType = 'solid' | 'breakable' | 'grass'

export type PowerUp = {
  name: string
  type: PowerUpType
}

export type PowerUpType = 'bomb' | 'explosion' | 'velocity'

export type Player = {
  color: PlayerColor
  position: Position
}

export type PlayerColor = 'red' | 'blue' | 'green' | 'black'

export type Position = {
  x: number
  y: number
}

export type Bomb = {
  id: string
  position: Position
  range: number
  isExploded?: boolean
  parentId?: string
}
