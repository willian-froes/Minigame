'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  FIELD_COLUMNS,
  FIELD_FRAME_RATE,
  PART_INITIAL,
} from './Tetris.constants'
import * as Game from './Tetris.styles'
import { Field, Part } from './Tetris.types'
import {
  buildField,
  buildPart,
  renderPart,
  handlePartMovement,
  handleFieldStack,
  randomizeColor,
  randomizeShape,
} from './Tetris.utils'
import { MiniGameStatus } from '@/shared/types'
import { Button } from '@/shared/components'

export const TetrisPage = () => {
  const { refresh } = useRouter()

  const [field, setField] = useState<Field>(buildField())
  const [part, setPart] = useState<Part>(PART_INITIAL)
  const [score, setScore] = useState<number>(0)
  const [status, setStatus] = useState<MiniGameStatus>('playing')

  const resetGame = useCallback(() => {
    setField(buildField())
    setPart(PART_INITIAL)
    setScore(0)
    setStatus('playing')
  }, [])

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
    if (status === 'game-over') return

    const interval = setInterval(() => {
      setPart(prev => renderPart(prev))
    }, FIELD_FRAME_RATE)

    return () => clearInterval(interval)
  }, [status])

  useEffect(() => {
    if (status === 'game-over') return

    const handleKeyDown = (event: KeyboardEvent) => {
      setPart(prev => handlePartMovement(prev, field, event))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [field, status])

  useEffect(() => {
    if (status === 'game-over') return

    setField(prev => handleFieldStack(prev, part, setPart))
  }, [part, status])

  useEffect(() => {
    if (!field || status === 'game-over') return

    const hasAllRowsContainsPart = field.every(column =>
      column.some(cell => !!cell),
    )

    if (hasAllRowsContainsPart) {
      setStatus('game-over')
    }
  }, [field, status])

  useEffect(() => {
    setPart({
      ...PART_INITIAL,
      color: randomizeColor(),
      shape: randomizeShape(),
    })
  }, [])

  if (status === 'game-over')
    return (
      <Game.Wrapper>
        <p>Tetris: Game over!</p>
        <Button onClick={resetGame} label="Restart" />
      </Game.Wrapper>
    )

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
