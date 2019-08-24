import React from 'react'
import styled from 'styled-components'
import CharacterPanel from './CharacterPanel'
import EnemyPanel from './EnemyPanel'
import BattleManager from './classes/battleManager'

const StyledGame = styled.section`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 100vh;
  background-color: red;
`

export default function Game() {
  const battleManager = React.useRef(new BattleManager())

  const handleCharacterAttack = character => {
    const target = battleManager.current.getEnemyTarget()
    character.attack(target)
  }

  const handleEnemyAttack = enemy => {
    const target = battleManager.current.getCharacterTarget()
    enemy.attack(target)
  }

  return (
    <StyledGame>
      <EnemyPanel onAttack={handleEnemyAttack} enemies={battleManager.current.enemies} />
      <CharacterPanel onAttack={handleCharacterAttack} characters={battleManager.current.characters} />
    </StyledGame>
  )
}
