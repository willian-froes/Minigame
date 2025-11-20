import styled, { keyframes } from 'styled-components'

import {
  FIELD_AREA_SIZE,
  FIELD_COLUMNS,
  PLAYER_COLOR_BY_MODEL,
} from './Bomberman.constants'
import {
  BlockType,
  Direction,
  PlayerColor,
  Position,
  PowerUpType,
} from './Bomberman.types'

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

const powerUpBackground = keyframes`
  0% {
    background-color: lightblue;
  }
  20% {
    background-color: lightgreen;
  }
  40% {
    background-color: lightyellow;
  }
   60% {
    background-color: lightcoral;
  }
   80% {
    background-color: lightseagreen;
  }
   100% {
    background-color: lightblue;
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

const areaColorByBlockType: Record<BlockType, string> = {
  solid: 'gray',
  breakable: 'darkgray',
  grass: 'green',
}

export const Area = styled.div<{ $type: BlockType }>`
  width: ${FIELD_AREA_SIZE}px;
  height: ${FIELD_AREA_SIZE}px;
  background-color: ${({ $type }) => areaColorByBlockType[$type]};
`

const playerArmMovement = keyframes`
  0% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(-30px);
  }
  50% {
    transform: translateY(0px);
  }
  75% {
    transform: translateY(30px);
  }
   100% {
   transform: translateY(0px);
  }
`

const playerHairMovement = keyframes`
  0% {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(-20px);
  }
  50% {
    transform: translateX(0px);
  }
  75% {
    transform: translateX(20px);
  }
   100% {
   transform: translateX(0px);
  }
`

export const playerRotationByDirection: Record<
  Exclude<Direction, null>,
  string
> = {
  up: '0deg',
  down: '180deg',
  left: '-90deg',
  right: '90deg',
}

export const PlayerV2Base = styled.svg<{
  $position: Position
  $direction?: Direction
  $stopped?: boolean
  $color: PlayerColor
}>`
  width: ${FIELD_AREA_SIZE}px;
  height: ${FIELD_AREA_SIZE}px;

  position: absolute;
  z-index: 10;

  transform: translate(
      ${({ $position }) => $position.x * FIELD_AREA_SIZE}px,
      ${({ $position }) => $position.y * FIELD_AREA_SIZE}px
    )
    rotate(
      ${({ $direction }) => $direction && playerRotationByDirection[$direction]}
    );
  transition: transform 150ms linear;

  & .right-arm {
    color: ${({ $color }) => PLAYER_COLOR_BY_MODEL[$color].hands};
    animation: ${playerArmMovement} 1s ease-in-out infinite;
  }

  & .left-arm {
    color: ${({ $color }) => PLAYER_COLOR_BY_MODEL[$color].hands};
    animation: ${playerArmMovement} 1s ease-in-out infinite reverse;
  }

  & .hair {
    color: ${({ $color }) => PLAYER_COLOR_BY_MODEL[$color].hair};
    animation: ${playerHairMovement} 1s ease-in-out infinite;
  }

  & .head {
    color: ${({ $color }) => PLAYER_COLOR_BY_MODEL[$color].head};
  }

  & .body {
    color: ${({ $color }) => PLAYER_COLOR_BY_MODEL[$color].body};
  }

  ${({ $stopped }) =>
    $stopped &&
    `
    .right-arm, .left-arm, .hair {
      animation-play-state: paused;
    }
  `}
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

const dropIconByType: Record<PowerUpType, string> = {
  bomb: '💣',
  explosion: '💥',
  velocity: '⛸️',
}

export const Drop = styled.div<{ $position: Position; $type: PowerUpType }>`
  width: ${FIELD_AREA_SIZE}px;
  height: ${FIELD_AREA_SIZE}px;
  position: absolute;
  z-index: 9;
  animation: ${powerUpBackground} 0.2s infinite;
  opacity: 0.7;

  transform: translate(
    ${({ $position }) => $position.x * FIELD_AREA_SIZE}px,
    ${({ $position }) => $position.y * FIELD_AREA_SIZE}px
  );
  transition: transform 150ms linear;

  &::before {
    content: '${({ $type }) => dropIconByType[$type]}';
    font-size: ${FIELD_AREA_SIZE * 0.5}px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`
