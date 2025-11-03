import styled from 'styled-components'

import { FIELD_COLUMNS } from './Tetris.constants'
import { PartColor } from './Tetris.types'

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Field = styled.div`
  display: grid;
  grid-template-columns: repeat(${FIELD_COLUMNS}, 1fr);
`

export const Area = styled.div<{ $filled: boolean; $color?: PartColor }>`
  border: 1px solid gray;
  width: 40px;
  height: 40px;
  background-color: ${({ $filled, $color }) =>
    $filled ? $color : 'transparent'};
`
