'use client'

import { useMemo } from 'react'

import { Button } from '@/shared/components'
import { MINIGAMES } from '@/shared/constants'

import * as Lobby from './Lobby.styles'

export const LobbyPage = () => {
  const _minigames = useMemo(
    () =>
      MINIGAMES.map(({ id, name, disabled, url }) => (
        <Button key={id} label={name} disabled={disabled} url={url} />
      )),
    [],
  )

  return (
    <Lobby.Wrapper>
      <Lobby.Title>Minigames</Lobby.Title>
      {_minigames}
    </Lobby.Wrapper>
  )
}
