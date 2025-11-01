import { PART_SHAPES, PART_COLORS } from './page.constants'

export type Field = Array<Array<number>>

export type Part = {
  position: PartPosition
  shape: PartShape
  color: PartColor
}

export type PartPosition = {
  x: number
  y: number
}

export type PartShape = (typeof PART_SHAPES)[number]

export type PartColor = (typeof PART_COLORS)[number]
