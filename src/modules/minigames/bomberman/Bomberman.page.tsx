'use client'

import { useEffect, useMemo, useState } from 'react'

import * as Game from './Bomberman.styles'
import { Block, BlockType, Bomb, Field, Player } from './Bomberman.types'
import { buildField } from './Bomberman.utils'
import { PLAYER_INITIAL } from './Bomberman.constants'

export const BombermanPage = () => {
  const [field, setField] = useState<Field>(buildField())
  const [bombs, setBombs] = useState<Bomb[]>([])

  const [player, setPlayer] = useState<Player>(PLAYER_INITIAL)

  const _game = useMemo(
    () =>
      field.map((row, rowIndex) =>
        row.map((block, columnIndex) => (
          <Game.Area
            key={`${rowIndex}-${columnIndex}`}
            $type={block?.type as BlockType}
          />
        )),
      ),
    [field],
  )

  useEffect(() => {
    setField(prev => {
      const rows = prev.length
      const cols = prev[0].length

      // 1) Inicia tudo como grass
      const baseField: Block[][] = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ type: 'grass' })),
      )

      // 2) Gera SOLID nas bordas
      for (let x = 0; x < cols; x++) {
        baseField[0][x] = { type: 'solid' }
        baseField[rows - 1][x] = { type: 'solid' }
      }

      for (let y = 0; y < rows; y++) {
        baseField[y][0] = { type: 'solid' }
        baseField[y][cols - 1] = { type: 'solid' }
      }

      // 3) Gera SOLID internos (padrão Bomberman)
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          if (y % 2 === 0 && x % 2 === 0) {
            baseField[y][x] = { type: 'solid' }
          }
        }
      }

      // 4) Limpa área inicial do player (3 tiles)
      const safePositions = [
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 1 },
      ]
      safePositions.forEach(pos => {
        if (baseField[pos.y][pos.x].type !== 'solid') {
          baseField[pos.y][pos.x] = { type: 'grass' }
        }
      })

      // 5) Gera BREAKABLE BLOCKS aleatórios nas áreas de grass
      const probability = 0.15 // ideal 0.65
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          if (baseField[y][x].type === 'grass') {
            const isSafe = safePositions.some(p => p.x === x && p.y === y)
            if (!isSafe && Math.random() < probability) {
              baseField[y][x] = { type: 'breakable' }
            }
          }
        }
      }

      return baseField
    })
  }, [])

  // Gerencia inputs do teclado dinamicamente
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft')
        setPlayer(
          prev =>
            ({
              ...prev,
              movement: { ...prev.movement, direction: 'left' },
            } as Player),
        )

      if (event.key === 'ArrowRight')
        setPlayer(
          prev =>
            ({
              ...prev,
              movement: { ...prev.movement, direction: 'right' },
            } as Player),
        )

      if (event.key === 'ArrowUp')
        setPlayer(
          prev =>
            ({
              ...prev,
              movement: { ...prev.movement, direction: 'up' },
            } as Player),
        )

      if (event.key === 'ArrowDown')
        setPlayer(
          prev =>
            ({
              ...prev,
              movement: { ...prev.movement, direction: 'down' },
            } as Player),
        )
      if (event.key.toLowerCase() === 'b') {
        const id = crypto.randomUUID()

        const bomb: Bomb = {
          id,
          position: player.movement.position,
          range: 1,
        }

        setBombs(prev => [...prev, bomb])

        setTimeout(() => {
          setBombs(prev =>
            prev.map(bombInField => {
              // TODO: Modificar lógica considerando range da bomba do player
              if (bombInField.id === id) {
                // Expande explosão 1 área acima
                if (
                  field[bomb.position.y + 1][bomb.position.x]?.type !== 'solid'
                ) {
                  const explosion: Bomb = {
                    id: crypto.randomUUID(),
                    position: {
                      x: bomb.position.x,
                      y: bomb.position.y + 1,
                    },
                    parentId: id,
                    range: 1,
                    isExploded: true,
                  }

                  setBombs(prev => [...prev, explosion])

                  // TODO: Lógica aqui para quebrar bloco quebrável, replicar para demais
                }

                // Expande explosão 1 área abaixo
                if (
                  field[bomb.position.y - 1][bomb.position.x]?.type !== 'solid'
                ) {
                  const explosion: Bomb = {
                    id: crypto.randomUUID(),
                    position: {
                      x: bomb.position.x,
                      y: bomb.position.y - 1,
                    },
                    range: 1,
                    parentId: id,
                    isExploded: true,
                  }

                  setBombs(prev => [...prev, explosion])
                }

                // Expande explosão 1 área a esquerda
                if (
                  field[bomb.position.y][bomb.position.x + 1]?.type !== 'solid'
                ) {
                  const explosion: Bomb = {
                    id: crypto.randomUUID(),
                    position: {
                      x: bomb.position.x + 1,
                      y: bomb.position.y,
                    },
                    range: 1,
                    parentId: id,
                    isExploded: true,
                  }

                  setBombs(prev => [...prev, explosion])
                }

                // Expande explosão 1 área a direita
                if (
                  field[bomb.position.y][bomb.position.x - 1]?.type !== 'solid'
                ) {
                  const explosion: Bomb = {
                    id: crypto.randomUUID(),
                    position: {
                      x: bomb.position.x - 1,
                      y: bomb.position.y,
                    },
                    range: 1,
                    parentId: id,
                    isExploded: true,
                  }

                  setBombs(prev => [...prev, explosion])
                }

                // Sumir explosões 2 segundos após explodir a bomba
                setTimeout(() => {
                  setBombs(prev =>
                    prev.filter(
                      b =>
                        b.parentId !== bombInField.id &&
                        b.id !== bombInField.id,
                    ),
                  )
                }, 2000)

                return {
                  ...bombInField,
                  isExploded: true,
                } as Bomb
              }

              return bombInField
            }),
          )
        }, 5000)
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (player.movement.direction === 'left' && event.key === 'ArrowLeft')
        setPlayer(
          prev =>
            ({
              ...prev,
              movement: { ...prev.movement, direction: null },
            } as Player),
        )
      if (player.movement.direction === 'right' && event.key === 'ArrowRight')
        setPlayer(
          prev =>
            ({
              ...prev,
              movement: { ...prev.movement, direction: null },
            } as Player),
        )
      if (player.movement.direction === 'up' && event.key === 'ArrowUp')
        setPlayer(
          prev =>
            ({
              ...prev,
              movement: { ...prev.movement, direction: null },
            } as Player),
        )
      if (player.movement.direction === 'down' && event.key === 'ArrowDown')
        setPlayer(
          prev =>
            ({
              ...prev,
              movement: { ...prev.movement, direction: null },
            } as Player),
        )
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [field, player.movement.direction, player.movement.position])

  // TODO: Atualiza posição do jogador
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayer(prev => {
        if (!prev.movement.direction) return prev

        const { x, y } = prev.movement.position

        if (prev.movement.direction === 'left') {
          if (field[y][x - 1]?.type !== 'grass') return prev
          return {
            ...prev,
            movement: {
              ...prev.movement,
              position: { x: x - 1, y },
            },
          }
        }

        if (prev.movement.direction === 'right') {
          if (field[y][x + 1]?.type !== 'grass') return prev
          return {
            ...prev,
            movement: {
              ...prev.movement,
              position: { x: x + 1, y },
            },
          }
        }

        if (prev.movement.direction === 'up') {
          if (field[y - 1][x]?.type !== 'grass') return prev
          return {
            ...prev,
            movement: {
              ...prev.movement,
              position: { x, y: y - 1 },
            },
          }
        }

        if (prev.movement.direction === 'down') {
          if (field[y + 1][x]?.type !== 'grass') return prev
          return {
            ...prev,
            movement: {
              ...prev.movement,
              position: { x, y: y + 1 },
            },
          }
        }

        return prev
      })
    }, 150)

    return () => clearInterval(interval)
  }, [field])

  return (
    <Game.Wrapper>
      <p>Bomberman</p>
      <p>Lifes: {player.attributes.lifes}</p>

      <Game.Field>
        {_game}
        <Game.Player
          $color={player.color}
          $position={player.movement.position}
        />
        {bombs.map(bomb => (
          <Game.Bomb
            key={bomb.id}
            $position={bomb.position}
            $isExplosion={bomb.isExploded}
          />
        ))}
        {/* TODO: Incluir drops nos blocks breakable e fazer bomba quebrar blocos */}
        {/* {
          <>
            <Game.Drop $type="bomb" $position={{ x: 4, y: 1 }} />
            <Game.Drop $type="explosion" $position={{ x: 6, y: 1 }} />
            <Game.Drop $type="velocity" $position={{ x: 8, y: 1 }} />
          </>
        } */}
      </Game.Field>
    </Game.Wrapper>
  )
}
