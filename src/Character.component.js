import React from 'react'
import styled from 'styled-components'

const StyledCharacter = styled.button`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
`

export default function Character(props) {
  const { characterClass, onAttack } = props
  const [HP, setHP] = React.useState(characterClass.HP)

  if (characterClass) {
    characterClass.setDamageHandler(damage => {
      console.log(`taking ${damage} damage`)
      setHP(characterClass.HP - damage)
    })
  }

  const handleClick = e => {
    e.stopPropagation()
    console.log('ATTACKING')
    onAttack(characterClass)
  }

  return (
    <StyledCharacter color={characterClass.color} onClick={handleClick}>
      {HP}
    </StyledCharacter>
  )
}
