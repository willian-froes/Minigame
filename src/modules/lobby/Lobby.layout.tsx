'use client'

import { LayoutWrapper } from './Lobby.styles'

interface LobbyLayoutProps {
  children?: React.ReactNode
}

export const LobbyLayout = ({ children }: LobbyLayoutProps) => (
  <LayoutWrapper>{children}</LayoutWrapper>
)
