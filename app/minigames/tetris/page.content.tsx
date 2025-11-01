'use client'

import { useEffect, useState } from 'react'

import { Title } from '@/app/page.styles'

import {
  FIELD_COLUMNS,
  FIELD_EMPTY_AREA,
  FIELD_ROWS,
  PART_INITIAL,
} from './page.constants'

import * as Game from './page.styles'
import { Field, Part } from './page.types'

const Content = () => {
  const [field, setField] = useState<Field>([[]])
  const [part, setPart] = useState<Part>(PART_INITIAL)

  // ---- Build field (grid) ----
  const buildField = () => {
    return Array.from({ length: FIELD_ROWS }, () =>
      Array.from({ length: FIELD_COLUMNS }, () => FIELD_EMPTY_AREA),
    )
  }

  // ---- Falling logic ----
  useEffect(() => {
    // Inicializa o campo
    setField(buildField())

    const interval = setInterval(() => {
      setPart(prev => {
        const newY = prev.position.y + 1

        return {
          ...prev,
          position: {
            ...prev.position,
            y: newY >= FIELD_ROWS ? 0 : newY,
          },
        }
      })
    }, 800)

    return () => clearInterval(interval)
  }, [])

  // ---- Atualiza o field quando a peça move ----
  useEffect(() => {
    setField(() => {
      const newField = buildField()

      const { x, y } = part.position

      if (y < FIELD_ROWS && x < FIELD_COLUMNS) {
        // TODO: colocar shapes reais depois
        newField[y][x] = 1
      }

      return newField
    })
  }, [part])

  // ---- Movimentação com teclado ----
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
            position: { x: Math.min(FIELD_COLUMNS - 1, x + 1), y },
          }
        }

        if (event.key === 'ArrowDown') {
          return {
            ...prev,
            position: { x, y: Math.min(FIELD_ROWS - 1, y + 1) },
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
            />
          )),
        )}
      </Game.Container>
    </Game.Wrapper>
  )
}

export default Content
