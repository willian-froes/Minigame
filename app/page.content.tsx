'use client'

import { useMemo } from 'react'

import { Button } from './components'

import * as Home from './page.styles'
import { MINIGAMES } from './page.constants'

export const Content = () => {
  const _minigames = useMemo(
    () =>
      MINIGAMES.map(({ id, name, disabled, url }) => (
        <Button key={id} label={name} disabled={disabled} url={url} />
      )),
    [],
  )

  return (
    <Home.Wrapper>
      <Home.Title>Minigames</Home.Title>
      {_minigames}
    </Home.Wrapper>
  )
}

export default Content
