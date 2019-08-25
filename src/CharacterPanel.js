import React from 'react'
import styled from 'styled-components'
import Character from './Character.component'

const StyledCharacterPanel = styled.section`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
`

export default function CharacterPanel(props) {
  const { characters, onAttack, onAbility } = props

  return (
    <StyledCharacterPanel>
      {characters.map(v => (
        <Character key={v.id} characterClass={v} onAttack={onAttack} onAbility={onAbility} />
      ))}
    </StyledCharacterPanel>
  )
}
