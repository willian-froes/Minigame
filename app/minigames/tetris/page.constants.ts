import { Part } from './page.types'

export const FIELD_AREA_SIZE: number = 40

export const FIELD_ROWS: number = 20

export const FIELD_COLUMNS: number = 10

export const FIELD_EMPTY_AREA: number = 0

export const FIELD_FILL_AREA: number = 1

export const PART_SHAPES = ['s', 'i', 't', 'o', '.'] as const

export const PART_COLORS = [
  'red',
  'green',
  'blue',
  'yellow',
  'pink',
  'purple',
] as const

export const PART_INITIAL: Part = {
  position: {
    x: 0,
    y: 0,
  },
  shape: '.',
  color: 'red',
}
