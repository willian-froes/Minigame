import styled, { keyframes } from 'styled-components'

import { FIELD_AREA_SIZE, FIELD_COLUMNS } from './Bomberman.constants'
import { PlayerColor, Position } from './Bomberman.types'

const bombPulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1);
  }
`

const explosionPulse = keyframes`
  0% {
    transform: scale(1.3);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1.3);
  }
`

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

export const Bomb = styled.div<{ $position: Position; $isExplosion?: boolean }>`
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
    content: '${({ $isExplosion }) => ($isExplosion ? '💥' : '💣')}';
    font-size: ${FIELD_AREA_SIZE * 0.7}px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    animation: ${({ $isExplosion }) =>
        $isExplosion ? explosionPulse : bombPulse}
      ${({ $isExplosion }) => ($isExplosion ? '300ms' : '1s')} infinite
      ease-in-out;
  }
`
