'use client'

import { useCallback, useEffect, useState } from 'react'

import { Title } from '@/app/page.styles'

import {
  FIELD_COLUMNS,
  FIELD_EMPTY_AREA,
  FIELD_ROWS,
  PART_COLORS,
  PART_INITIAL,
  PART_SHAPES,
} from './page.constants'

import * as Game from './page.styles'
import { Field, Part, PartColor, PartShape } from './page.types'

const Content = () => {
  const [field, setField] = useState<Field>([[]])
  const [part, setPart] = useState<Part>(PART_INITIAL)

  // Randomize part color
  const randomColor = useCallback((): PartColor => {
    const index = Math.floor(Math.random() * PART_COLORS.length)
    return PART_COLORS[index]
  }, [])

  // Randomize part shape
  const randomShape = useCallback((): PartShape => {
    const index = Math.floor(Math.random() * PART_SHAPES.length)
    return PART_SHAPES[index]
  }, [])

  // Build field
  const buildField = () => {
    return Array.from({ length: FIELD_ROWS }, () =>
      Array.from({ length: FIELD_COLUMNS }, () => FIELD_EMPTY_AREA),
    )
  }

  // Falling logic
  useEffect(() => {
    // Init field
    setField(buildField())

    const interval = setInterval(() => {
      setPart(prev => {
        const newY = prev.position.y + 1
        const isNewPart = newY >= FIELD_ROWS

        return {
          ...prev,
          position: {
            ...prev.position,
            y: isNewPart ? 0 : newY,
          },
          color: isNewPart ? randomColor() : prev.color,
          shape: isNewPart ? randomShape() : prev.shape,
        }
      })
    }, 300)

    return () => clearInterval(interval)
  }, [randomColor, randomShape])

  // Update field with movement
  useEffect(() => {
    setField(() => {
      const newField = buildField()

      const { x, y } = part.position

      if (y < FIELD_ROWS && x < FIELD_COLUMNS) {
        if (part.shape === '.') {
          if (y >= 0) {
            newField[y][x] = 1
          }
        }

        if (part.shape === 's') {
          if (y === 0) {
            newField[y][x + 1] = 1
          }
          if (y === 1) {
            newField[y - 1][x] = 1
            newField[y - 1][x + 1] = 1
            newField[y][x + 1] = 1
          }
          if (y >= 2) {
            newField[y - 2][x] = 1
            newField[y - 1][x] = 1
            newField[y - 1][x + 1] = 1
            newField[y][x + 1] = 1
          }
        }

        if (part.shape === 'i') {
          if (y === 0) {
            newField[y][x] = 1
          }
          if (y === 1) {
            newField[y - 1][x] = 1
            newField[y][x] = 1
          }
          if (y === 2) {
            newField[y - 2][x] = 1
            newField[y - 1][x] = 1
            newField[y][x] = 1
          }
          if (y >= 3) {
            newField[y - 3][x] = 1
            newField[y - 2][x] = 1
            newField[y - 1][x] = 1
            newField[y][x] = 1
          }
        }

        if (part.shape === 't') {
          if (y === 0) {
            newField[y][x + 1] = 1
          }

          if (y >= 1) {
            newField[y - 1][x + 2] = 1
            newField[y - 1][x + 1] = 1
            newField[y - 1][x] = 1
            newField[y][x + 1] = 1
          }
        }

        if (part.shape === 'o') {
          if (y === 0) {
            newField[y][x] = 1
            newField[y][x + 1] = 1
          }
          if (y >= 1) {
            newField[y][x] = 1
            newField[y][x + 1] = 1
            newField[y - 1][x] = 1
            newField[y - 1][x + 1] = 1
          }
        }
      }

      return newField
    })
  }, [part])

  // Keyboard movement
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPart(prev => {
        const { x, y } = prev.position

        if (event.key === 'ArrowLeft') {
          return { ...prev, position: { x: Math.max(0, x - 1), y } }
        }

        if (event.key === 'ArrowRight') {
          return {
            ...prev,
            position: {
              x: Math.min(
                FIELD_COLUMNS -
                  (['i', '.'].includes(prev.shape)
                    ? 1
                    : prev.shape === 't'
                    ? 3
                    : 2),
                x + 1,
              ),
              y,
            },
          }
        }

        return prev
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Game.Wrapper>
      <Title>Tetris</Title>

      <Game.Container>
        {field.map((row, rowIndex) =>
          row.map((filled, columnIndex) => (
            <Game.Area
              key={`${rowIndex}-${columnIndex}`}
              $filled={Boolean(filled)}
              $color={part.color}
            />
          )),
        )}
      </Game.Container>
    </Game.Wrapper>
  )
}

export default Content
