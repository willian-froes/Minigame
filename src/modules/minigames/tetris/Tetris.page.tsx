'use client'

import { useEffect, useMemo, useState } from 'react'

import { FIELD_FRAME_RATE, PART_INITIAL } from './Tetris.constants'
import * as Game from './Tetris.styles'
import { Field, Part } from './Tetris.types'
import {
  buildField,
  buildPart,
  renderPart,
  handlePartMovement,
  handleFieldStack,
} from './Tetris.utils'

export const TetrisPage = () => {
  const [field, setField] = useState<Field>(buildField())
  const [part, setPart] = useState<Part>(PART_INITIAL)
  const [score, setScore] = useState<number>(0)

  const renderField = useMemo(() => {
    const fieldBase = field.map(row => [...row])
    return buildPart(fieldBase, part)
  }, [field, part])

  const _game = useMemo(
    () =>
      renderField.map((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <Game.Area
            key={`${rowIndex}-${columnIndex}`}
            $filled={!!cell}
            $color={cell?.color}
          />
        )),
      ),
    [renderField],
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setPart(prev => renderPart(prev))
    }, FIELD_FRAME_RATE)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPart(prev => handlePartMovement(prev, event))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    setField(prev => handleFieldStack(prev, part, setPart))
  }, [part])

  return (
    <Game.Wrapper>
      <p>Tetris</p>
      <p>Score: {score}</p>
      <Game.Container>
        <Game.Field>{_game}</Game.Field>
      </Game.Container>
    </Game.Wrapper>
  )
}
