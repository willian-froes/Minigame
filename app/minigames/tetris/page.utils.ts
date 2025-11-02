'use client'

import { Dispatch, SetStateAction } from 'react'
import {
  FIELD_COLUMNS,
  FIELD_EMPTY_AREA,
  FIELD_FILL_AREA,
  FIELD_ROWS,
  PART_COLORS,
  PART_SHAPES,
} from './page.constants'
import { Field, Part, PartColor, PartShape } from './page.types'

export const randomizeColor = (): PartColor => {
  const index = Math.floor(Math.random() * PART_COLORS.length)
  return PART_COLORS[index]
}

export const randomizeShape = (): PartShape => {
  const index = Math.floor(Math.random() * PART_SHAPES.length)
  return PART_SHAPES[index]
}

export const buildField = (): Field => {
  return Array.from({ length: FIELD_ROWS }, () =>
    Array.from({ length: FIELD_COLUMNS }, () => FIELD_EMPTY_AREA),
  )
}

export const buildPart = (field: Field, part: Part): Field => {
  const { x, y } = part.position

  if (y < FIELD_ROWS && x < FIELD_COLUMNS) {
    if (part.shape === '.') {
      if (y >= 0) {
        field[y][x] = 1
      }
    }

    if (part.shape === 's') {
      if (y === 0) {
        field[y][x + 1] = 1
      }
      if (y === 1) {
        field[y - 1][x] = 1
        field[y - 1][x + 1] = 1
        field[y][x + 1] = 1
      }
      if (y >= 2) {
        field[y - 2][x] = 1
        field[y - 1][x] = 1
        field[y - 1][x + 1] = 1
        field[y][x + 1] = 1
      }
    }

    if (part.shape === 'i') {
      if (y === 0) {
        field[y][x] = 1
      }
      if (y === 1) {
        field[y - 1][x] = 1
        field[y][x] = 1
      }
      if (y === 2) {
        field[y - 2][x] = 1
        field[y - 1][x] = 1
        field[y][x] = 1
      }
      if (y >= 3) {
        field[y - 3][x] = 1
        field[y - 2][x] = 1
        field[y - 1][x] = 1
        field[y][x] = 1
      }
    }

    if (part.shape === 't') {
      if (y === 0) {
        field[y][x + 1] = 1
      }

      if (y >= 1) {
        field[y - 1][x + 2] = 1
        field[y - 1][x + 1] = 1
        field[y - 1][x] = 1
        field[y][x + 1] = 1
      }
    }

    if (part.shape === 'o') {
      if (y === 0) {
        field[y][x] = 1
        field[y][x + 1] = 1
      }
      if (y >= 1) {
        field[y][x] = 1
        field[y][x + 1] = 1
        field[y - 1][x] = 1
        field[y - 1][x + 1] = 1
      }
    }
  }

  return field
}

export const renderPart = (part: Part): Part => {
  const newY = part.position.y + 1
  const isNewPart = newY >= FIELD_ROWS

  return {
    ...part,
    position: {
      ...part.position,
      y: isNewPart ? 0 : newY,
    },
    color: isNewPart ? randomizeColor() : part.color,
    shape: isNewPart ? randomizeShape() : part.shape,
  }
}

// TODO: Atualizar movimentação por forma considerando se está nas extremidades ou tem alguma forma nas laterais
export const handlePartMovement = (part: Part, event: KeyboardEvent): Part => {
  const { x, y } = part.position

  if (event.key === 'ArrowLeft') {
    return { ...part, position: { x: Math.max(0, x - 1), y } }
  }

  if (event.key === 'ArrowRight') {
    return {
      ...part,
      position: {
        x: Math.min(
          FIELD_COLUMNS -
            (['i', '.'].includes(part.shape) ? 1 : part.shape === 't' ? 3 : 2),
          x + 1,
        ),
        y,
      },
    }
  }

  return part
}

export const handleFieldStack = (
  field: Field,
  part: Part,
  setPart: Dispatch<SetStateAction<Part>>,
) => {
  const { x, y } = part.position
  const isBottom = y === FIELD_ROWS - 1
  let isBellowFill = false

  if (part.shape === '.' || part.shape === 'i') {
    isBellowFill = field[y + 1]?.[x] === FIELD_FILL_AREA
  }

  if (part.shape === 'o') {
    isBellowFill =
      field[y + 1]?.[x] === FIELD_FILL_AREA ||
      field[y + 1]?.[x + 1] === FIELD_FILL_AREA
  }

  if (part.shape === 's') {
    isBellowFill =
      field[y]?.[x] === FIELD_FILL_AREA ||
      field[y + 1]?.[x + 1] === FIELD_FILL_AREA
  }

  if (part.shape === 't') {
    isBellowFill =
      field[y]?.[x] === FIELD_FILL_AREA ||
      field[y + 1]?.[x + 1] === FIELD_FILL_AREA ||
      field[y]?.[x + 2] === FIELD_FILL_AREA
  }

  if (isBellowFill || isBottom) {
    const newField = field.map(row => [...row])
    const fixedField = buildPart(newField, part)

    setPart({
      position: { x: 0, y: 0 },
      color: randomizeColor(),
      shape: randomizeShape(),
    })

    return fixedField
  }

  return field
}
