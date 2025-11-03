export type MiniGame = {
  id: number
  name: string
  url: string
  disabled: boolean
  board: React.ComponentType
}

export type MiniGameSlug = Lowercase<MiniGame['name']>

export type MiniGameBySlug = {
  [K in Lowercase<MiniGame['name']>]: MiniGame
}
