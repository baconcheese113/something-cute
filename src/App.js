import React from 'react'
import styled from 'styled-components'
import Game from './Game'

const StyledApp = styled.main`
  display: flex;
  justify-content: center;
`

export default function App() {
  return (
    <StyledApp>
      <Game />
    </StyledApp>
  )
}
