'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import { MiniGameStatus } from '@/shared/types'

import * as Game from './Bomberman.styles'
import { Block, Bomb, Field, Player } from './Bomberman.types'
import { buildField } from './Bomberman.utils'
import {
  LIFES_INITIAL,
  FIELD_COLUMNS,
  PLAYER_INITIAL,
} from './Bomberman.constants'

export const BombermanPage = () => {
  const [field, setField] = useState<Field>(buildField())
  const [lifes, setLifes] = useState<number>(LIFES_INITIAL)
  const [status, setStatus] = useState<MiniGameStatus>('playing')
  const [player, setPlayer] = useState<Player>(PLAYER_INITIAL)
  const [direction, setDirection] = useState<
    'left' | 'right' | 'up' | 'down' | null
  >(null)
  const [bombs, setBombs] = useState<Bomb[]>([])

  const _game = useMemo(
    () =>
      field.map((row, rowIndex) =>
        row.map((block, columnIndex) => (
          <Game.Area
            key={`${rowIndex}-${columnIndex}`}
            $solid={block?.type === 'solid'}
          />
        )),
      ),
    [field],
  )

  // Prepara o campo com blocos liberados e solidos
  useEffect(() => {
    setField(prev => {
      const emptyField = prev.map(row => [...row])

      emptyField[0] = emptyField[0].map(() => ({ type: 'solid' }))

      emptyField[emptyField.length - 1] = emptyField[emptyField.length - 1].map(
        () => ({ type: 'solid' }),
      )

      const newField = emptyField.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (
            (colIndex % 2 === 0 && rowIndex % 2 === 0) ||
            [0, FIELD_COLUMNS - 1].includes(colIndex)
          ) {
            return { type: 'solid' } as Block
          }
          return cell
        }),
      )

      return newField
    })
  }, [])

  // Gerencia inputs do teclado dinamicamente
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') setDirection('left')
      if (event.key === 'ArrowRight') setDirection('right')
      if (event.key === 'ArrowUp') setDirection('up')
      if (event.key === 'ArrowDown') setDirection('down')

      if (event.key.toLowerCase() === 'b') {
        setBombs(prev => {
          const updatedBombs = prev
          const bomb: Bomb = { position: player.position, range: 1 }

          updatedBombs.push(bomb)

          return updatedBombs
        })
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (direction === 'left' && event.key === 'ArrowLeft') setDirection(null)
      if (direction === 'right' && event.key === 'ArrowRight')
        setDirection(null)
      if (direction === 'up' && event.key === 'ArrowUp') setDirection(null)
      if (direction === 'down' && event.key === 'ArrowDown') setDirection(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [direction, player.position])

  // TODO: Atualiza posição do jogador
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayer(prev => {
        if (!direction) return prev

        const { x, y } = prev.position

        if (direction === 'left') {
          if (field[y][x - 1]?.type === 'solid') return prev
          return { ...prev, position: { x: x - 1, y } }
        }

        if (direction === 'right') {
          if (field[y][x + 1]?.type === 'solid') return prev
          return { ...prev, position: { x: x + 1, y } }
        }

        if (direction === 'up') {
          if (field[y - 1][x]?.type === 'solid') return prev
          return { ...prev, position: { x, y: y - 1 } }
        }

        if (direction === 'down') {
          if (field[y + 1][x]?.type === 'solid') return prev
          return { ...prev, position: { x, y: y + 1 } }
        }

        return prev
      })
    }, 150)

    return () => clearInterval(interval)
  }, [direction, field])

  return (
    <Game.Wrapper>
      <p>Bomberman</p>
      <p>Lifes: {lifes}</p>

      <Game.Field>
        {_game}
        <Game.Player $color={player.color} $position={player.position} />
        {bombs.map((bomb, index) => (
          <Game.Bomb key={index} $position={bomb.position} />
        ))}
      </Game.Field>
    </Game.Wrapper>
  )
}
