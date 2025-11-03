import styled from 'styled-components'

export const Wrapper = styled.button`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`
