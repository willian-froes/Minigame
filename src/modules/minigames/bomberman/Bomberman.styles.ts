import styled from 'styled-components'

import { FIELD_AREA_SIZE, FIELD_COLUMNS } from './Bomberman.constants'
import { PlayerColor, Position } from './Bomberman.types'

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

export const Field = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${FIELD_COLUMNS}, 1fr);
`

export const Area = styled.div<{ $solid: boolean }>`
  width: ${FIELD_AREA_SIZE}px;
  height: ${FIELD_AREA_SIZE}px;
  background-color: ${({ $solid }) => ($solid ? 'gray' : 'green')};
`

export const Player = styled.div<{
  $color: PlayerColor
  $position: Position
}>`
  width: ${FIELD_AREA_SIZE}px;
  height: ${FIELD_AREA_SIZE}px;
  border-radius: ${FIELD_AREA_SIZE}px;
  background-color: ${({ $color }) => $color};
  border: 1px solid black;

  position: absolute;
  z-index: 10;

  transform: translate(
    ${({ $position }) => $position.x * FIELD_AREA_SIZE}px,
    ${({ $position }) => $position.y * FIELD_AREA_SIZE}px
  );
  transition: transform 150ms linear;
`

export const Bomb = styled.div<{ $position: Position }>`
  width: ${FIELD_AREA_SIZE}px;
  height: ${FIELD_AREA_SIZE}px;
  position: absolute;
  z-index: 9;

  transform: translate(
    ${({ $position }) => $position.x * FIELD_AREA_SIZE}px,
    ${({ $position }) => $position.y * FIELD_AREA_SIZE}px
  );
  transition: transform 150ms linear;

  &::before {
    content: '💣';
    font-size: ${FIELD_AREA_SIZE * 0.7}px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`
