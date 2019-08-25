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
const StartButton = styled.button`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`

export default function Game() {
  const battleManager = React.useRef(new BattleManager())
  const [level, setLevel] = React.useState(0)
  const [canAdvance, setCanAdvance] = React.useState(true)

  const handleStartNextRound = e => {
    e.stopPropagation()
    if (canAdvance) {
      const newLevel = battleManager.current.startNextRound()
      setLevel(newLevel)
      setCanAdvance(false)
    }
  }

  const handleCharacterAttack = character => {
    const target = battleManager.current.getEnemyTarget()
    if (target) character.attack(target)
    if (battleManager.current.levelComplete()) {
      setCanAdvance(true)
    }
  }

  const handleEnemyAttack = enemy => {
    const target = battleManager.current.getCharacterTarget()
    if (target) enemy.attack(target)
  }

  return (
    <StyledGame>
      <StartButton onClick={handleStartNextRound} disabled={!canAdvance}>
        Start Level {level}
      </StartButton>
      <EnemyPanel onAttack={handleEnemyAttack} enemies={battleManager.current.enemies} />
      <CharacterPanel onAttack={handleCharacterAttack} characters={battleManager.current.characters} />
    </StyledGame>
  )
}
