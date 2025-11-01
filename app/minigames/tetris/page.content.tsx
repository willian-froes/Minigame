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
} from './page.utils'

const Content = () => {
  const [field, setField] = useState<Field>([[]])
  const [part, setPart] = useState<Part>(PART_INITIAL)

  const _game = useMemo(
    () =>
      field.map((row, rowIndex) =>
        row.map((filled, columnIndex) => (
          <Game.Area
            key={`${rowIndex}-${columnIndex}`}
            $filled={Boolean(filled)}
            $color={part.color}
          />
        )),
      ),
    [field, part],
  )

  useEffect(() => {
    setField(buildField())

    const renderFrame = setInterval(() => {
      setPart(renderPart)
    }, FIELD_FRAME_RATE)

    return () => clearInterval(renderFrame)
  }, [])

  useEffect(() => {
    setField(() => buildPart(buildField(), part))
  }, [part])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPart(prev => handlePartMovement(prev, event))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Game.Wrapper>
      <Title>Tetris</Title>
      <Game.Container>{_game}</Game.Container>
    </Game.Wrapper>
  )
}

export default Content
