import React from 'react'
import styled from 'styled-components'

const StyledEnemy = styled.button`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: ${props => props.color};
`

export default function Enemy(props) {
  const { enemyClass, onAttack } = props
  const [HP, setHP] = React.useState(enemyClass.HP)

  if (enemyClass) {
    enemyClass.setDamageHandler(damage => {
      console.log(`taking ${damage} damage`)
      setHP(enemyClass.HP - damage)
    })
  }

  return <StyledEnemy color={enemyClass.color}>{HP}</StyledEnemy>
}
