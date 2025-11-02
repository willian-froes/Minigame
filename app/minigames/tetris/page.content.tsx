'use client'

import { useEffect, useMemo, useState } from 'react'

import { Title } from '@/app/page.styles'

import { FIELD_FRAME_RATE, PART_INITIAL } from './page.constants'
import * as Game from './page.styles'
import { Field, Part } from './page.types'
import {
  buildField,
  buildPart,
  renderPart,
  handlePartMovement,
  handleFieldStack,
} from './page.utils'

const Content = () => {
  const [field, setField] = useState<Field>([[]])
  const [part, setPart] = useState<Part>(PART_INITIAL)
  const [score, setScore] = useState<number>(0)

  const renderField = useMemo(() => {
    const fieldBase = field.map(row => [...row])
    return buildPart(fieldBase, part)
  }, [field, part])

  const _game = useMemo(
    () =>
      renderField.map((row, rowIndex) =>
        row.map((filled, columnIndex) => (
          <Game.Area
            key={`${rowIndex}-${columnIndex}`}
            $filled={Boolean(filled)}
            $color={part.color}
          />
        )),
      ),
    [renderField, part],
  )

  useEffect(() => {
    setField(buildField())

    const renderFrame = setInterval(() => {
      setPart(prev => renderPart(prev))
    }, FIELD_FRAME_RATE)

    return () => clearInterval(renderFrame)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPart(prev => handlePartMovement(prev, event))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // TODO: Tratar stack quando cumprir multiplas linhas e atualizar score
  useEffect(() => {
    setField(prev => handleFieldStack(prev, part, setPart))
  }, [part])

  return (
    <Game.Wrapper>
      <Title>Tetris</Title>
      <p>Score: {score}</p>
      <Game.Container>
        <Game.Field>{_game}</Game.Field>
      </Game.Container>
    </Game.Wrapper>
  )
}

export default Content
