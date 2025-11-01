'use client'

import styled from 'styled-components'
import { FIELD_AREA_SIZE, FIELD_COLUMNS } from './page.constants'

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(${FIELD_COLUMNS}, 1fr);
`

export const Area = styled.div<{ $filled: boolean }>`
  border: 1px solid gray;
  width: ${FIELD_AREA_SIZE}px;
  height: ${FIELD_AREA_SIZE}px;
  background-color: ${({ $filled }) => ($filled ? 'gray' : 'transparent')};
`
