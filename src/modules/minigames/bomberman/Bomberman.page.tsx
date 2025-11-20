'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import { MiniGameStatus } from '@/shared/types'
import { Button } from '@/shared/components'

import * as Game from './Bomberman.styles'
import {
  Block,
  BlockType,
  Bomb,
  Field,
  Player,
  Position,
  PowerUp,
} from './Bomberman.types'
import { buildField } from './Bomberman.utils'
import { PLAYER_INITIAL, POWER_UP_TYPES } from './Bomberman.constants'
import { PlayerV2 } from './Bomberman.player'

export const BombermanPage = () => {
  const [field, setField] = useState<Field>(buildField())
  const [bombs, setBombs] = useState<Bomb[]>([])
  const [drops, setDrops] = useState<PowerUp[]>([])
  const [status, setStatus] = useState<MiniGameStatus>('playing')

  const [player, setPlayer] = useState<Player>(PLAYER_INITIAL)

  // TODO: Fazer reset total do field
  const resetGame = useCallback(() => {
    setField(buildField())
    setBombs([])
    setDrops([])
    setStatus('playing')
  }, [])

  const updateFieldAfterExplosion = useCallback((explosion: Bomb) => {
    setField(prev => {
      const newField = prev.map(row => row.map(cell => ({ ...cell } as Block)))

      const y = explosion.position.y
      const x = explosion.position.x

      const block = newField[y]?.[x]

      if (!block) return prev

      if (block.type === 'breakable') {
        newField[y][x] = { type: 'grass' } as Block
        // Renderiza o powerup dropável se houver drop no bloco
        if (block.drop) {
          setDrops(prev => [
            ...prev,
            {
              id: crypto.randomUUID(),
              type: block.drop?.type,
              position: { x, y },
            } as PowerUp,
          ])
        }
      }

      return newField
    })
  }, [])

  const spawnExplosionsInDirection = useCallback(
    (
      startX: number,
      startY: number,
      dirX: number,
      dirY: number,
      range: number,
      parentId: string, // <- parentId agora é argumento
    ) => {
      const explosions: Bomb[] = []

      for (let i = 1; i <= range; i++) {
        const x = startX + dirX * i
        const y = startY + dirY * i

        const block = field[y]?.[x]

        // se sair do mapa, para
        if (!block) break

        // se bloco sólido, para antes de adicionar explosão
        if (block.type === 'solid') break

        const explosion: Bomb = {
          id: crypto.randomUUID(),
          parentId,
          position: { x, y },
          range: i,
          isExploded: true,
        }

        explosions.push(explosion)

        // atualiza o campo com base nessa explosão
        updateFieldAfterExplosion(explosion)

        // Se for quebrável → explodimos ele, mas paramos expansão
        if (block.type === 'breakable') break
      }

      setPlayer(prev => {
        const isPlayerKilled = explosions.some(
          explosion =>
            explosion.position.x === prev.movement.position.x &&
            explosion.position.y === prev.movement.position.y,
        )

        if (isPlayerKilled && prev.lastDamageFrom !== parentId) {
          return {
            ...prev,
            attributes: {
              ...prev.attributes,
              lifes: prev.attributes.lifes - 1,
            },
            lastDamageFrom: parentId,
          }
        }

        return prev
      })
      return explosions
    },
    [field, updateFieldAfterExplosion],
  )

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
      const breakableProbability = 0.15 // ideal 0.65
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          if (baseField[y][x].type === 'grass') {
            const isSafe = safePositions.some(p => p.x === x && p.y === y)
            if (!isSafe && Math.random() < breakableProbability) {
              // Cria um powerup dropável se houver possibilidade e sorteia qual aparece
              const dropProbability = 100.0

              if (Math.random() < dropProbability) {
                const randomIndex = Math.floor(
                  Math.random() * POWER_UP_TYPES.length,
                )
                const randomType = POWER_UP_TYPES[randomIndex]

                const powerUp = { type: randomType } as PowerUp

                baseField[y][x] = { type: 'breakable', drop: powerUp } as Block
              } else {
                baseField[y][x] = { type: 'breakable' } as Block
              }
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
        const playerBombsInFieldCount = bombs.filter(
          bomb => bomb.playerId === player.id,
        ).length

        if (playerBombsInFieldCount === player.attributes.multipleBombsLimit)
          return

        const id = crypto.randomUUID()

        const bomb: Bomb = {
          id,
          playerId: player.id,
          position: player.movement.position,
          range: 1,
        }

        setBombs(prev => [...prev, bomb])

        setTimeout(() => {
          setBombs(prev =>
            prev.map(bombInField => {
              // quando estiver processando a bomba com esse id
              if (bombInField.id !== id) return bombInField

              const parentId = bombInField.id // <- explicito, seguro para closures
              const range = player.attributes.explosionRange

              const allExplosions: Bomb[] = []

              // baixo
              allExplosions.push(
                ...spawnExplosionsInDirection(
                  bombInField.position.x,
                  bombInField.position.y,
                  0,
                  1,
                  range,
                  parentId,
                ),
              )

              // cima
              allExplosions.push(
                ...spawnExplosionsInDirection(
                  bombInField.position.x,
                  bombInField.position.y,
                  0,
                  -1,
                  range,
                  parentId,
                ),
              )

              // direita
              allExplosions.push(
                ...spawnExplosionsInDirection(
                  bombInField.position.x,
                  bombInField.position.y,
                  1,
                  0,
                  range,
                  parentId,
                ),
              )

              // esquerda
              allExplosions.push(
                ...spawnExplosionsInDirection(
                  bombInField.position.x,
                  bombInField.position.y,
                  -1,
                  0,
                  range,
                  parentId,
                ),
              )

              // adiciona todas as explosões ao estado de bombs
              setBombs(prev => [...prev, ...allExplosions])

              // remove as explosões 1s depois, usando parentId capturado
              setTimeout(() => {
                setBombs(prev =>
                  prev.filter(
                    b => b.parentId !== parentId && b.id !== parentId,
                  ),
                )
              }, 1000)

              return {
                ...bombInField,
                isExploded: true,
              } as Bomb
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
  }, [
    bombs,
    field,
    player,
    spawnExplosionsInDirection,
    updateFieldAfterExplosion,
  ])

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

  // TODO: Corrijir renderização das explosões
  useEffect(() => {
    const playerX = player.movement.position.x
    const playerY = player.movement.position.y

    // Verifica se existe um drop nessa posição
    const dropAtPosition = drops.find(
      drop => drop?.position?.x === playerX && drop.position.y === playerY,
    )

    if (!dropAtPosition) return

    // 1. Remove o drop do mapa
    setDrops(prev => prev.filter(d => d.id !== dropAtPosition.id))

    // 2. Atualiza os atributos do player conforme o tipo do powerup
    setPlayer(prev => {
      const attributes = { ...prev.attributes }

      if (dropAtPosition.type === 'bomb') attributes.multipleBombsLimit += 1

      if (dropAtPosition.type === 'explosion') attributes.explosionRange += 1

      if (dropAtPosition.type === 'velocity')
        attributes.movementVelocity = Math.max(
          50,
          attributes.movementVelocity - 10,
        )

      return {
        ...prev,
        attributes: attributes,
      }
    })
  }, [player.movement.position, drops])

  useEffect(() => {
    if (player.attributes.lifes === 0) setStatus('game-over')
  }, [player.attributes.lifes])

  if (status === 'game-over')
    return (
      <Game.Wrapper>
        <p>Bomberman: Game over!</p>
        <Button onClick={resetGame} label="Restart" />
      </Game.Wrapper>
    )

  return (
    <Game.Wrapper>
      <p>Bomberman</p>
      <p>attributes: {JSON.stringify(player.attributes)}</p>

      <Game.Field>
        {_game}
        <PlayerV2 player={player} />
        {bombs.map(bomb => (
          <Game.Bomb
            key={bomb.id}
            $position={bomb.position}
            $isExplosion={bomb.isExploded}
          />
        ))}
        {drops.map(powerUp => (
          <Game.Drop
            key={powerUp.id}
            $type={powerUp.type}
            $position={powerUp.position as Position}
          />
        ))}
      </Game.Field>
    </Game.Wrapper>
  )
}
