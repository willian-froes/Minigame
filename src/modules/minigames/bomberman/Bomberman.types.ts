export type Field = Array<Array<Block | undefined>>

export type Block = {
  type: BlockType
  drop?: PowerUp
}

export type BlockType = 'solid' | 'breakable'

export type PowerUp = {
  name: string
}

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
  position: Position
  range: number
}
