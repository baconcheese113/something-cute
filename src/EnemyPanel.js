import React from 'react'
import styled from 'styled-components'
import Enemy from './Enemy.component'

const StyledEnemyPanel = styled.section`
  position: absolute;
  top: 20%;
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: space-around;
`

export default function EnemyPanel(props) {
  const { onAttack, enemies } = props
  return (
    <StyledEnemyPanel>
      {enemies.map(v => (
        <Enemy key={v.id} enemyClass={v} onAttack={onAttack} />
      ))}
    </StyledEnemyPanel>
  )
}
