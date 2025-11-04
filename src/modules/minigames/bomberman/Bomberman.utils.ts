import { FIELD_COLUMNS, FIELD_ROWS } from './Bomberman.constants'
import { Field } from './Bomberman.types'

export const buildField = (): Field => {
  return Array.from({ length: FIELD_ROWS }, () =>
    Array.from({ length: FIELD_COLUMNS }, () => undefined),
  )
}
