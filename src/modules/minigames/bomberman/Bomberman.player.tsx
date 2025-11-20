'use client'

import { useEffect, useState } from 'react'

import { PlayerV2Base } from './Bomberman.styles'
import { Player, Direction } from './Bomberman.types'

interface PlayerV2Props {
  player: Player
}

export const PlayerV2 = ({ player }: PlayerV2Props) => {
  const [currentDirection, setCurrentDirection] = useState<Direction>()
  const [isStopped, setIsStopped] = useState<boolean>(true)

  useEffect(() => {
    if (player.movement.direction === null) {
      setIsStopped(true)
      return
    }

    setIsStopped(false)
    setCurrentDirection(player.movement.direction)
  }, [player.movement.direction])

  return (
    <PlayerV2Base
      width="136"
      height="136"
      viewBox="0 0 136 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      $position={player.movement.position}
      $direction={currentDirection}
      $stopped={isStopped}
      $color={player.color}
    >
      <circle
        className="right-arm"
        cx="117.5"
        cy="49.5"
        r="17"
        fill="currentColor"
        stroke="black"
        strokeWidth="3"
      />
      <circle
        className="left-arm"
        cx="18.5"
        cy="49.5"
        r="17"
        fill="currentColor"
        stroke="black"
        strokeWidth="3"
      />
      <circle
        className="body"
        cx="67.5"
        cy="43.5"
        r="43.5"
        fill="currentColor"
      />
      <circle
        className="head"
        cx="67.5"
        cy="62.5"
        r="52.5"
        fill="currentColor"
      />
      <circle
        className="hair"
        cx="67.5"
        cy="115.5"
        r="18.5"
        fill="currentColor"
      />
    </PlayerV2Base>
  )
}
