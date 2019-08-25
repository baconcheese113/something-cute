import React from 'react'
import styled from 'styled-components'
import CharacterPanel from './CharacterPanel'
import EnemyPanel from './EnemyPanel'
import BattleManager from './classes/battleManager'
import backgroundImage from './artbits/BG1.svg'

const StyledGame = styled.section`
  position: relative;
  width: 100%;
  /* max-width: 1200px; */
  height: 100vh;
  background-color: #313131;
  overflow: hidden;
`
const Background = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
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
      <Background src={backgroundImage} alt="background" />
      <StartButton onClick={handleStartNextRound} disabled={!canAdvance}>
        Start Level {level}
      </StartButton>
      <EnemyPanel onAttack={handleEnemyAttack} enemies={battleManager.current.enemies} />
      <CharacterPanel onAttack={handleCharacterAttack} characters={battleManager.current.characters} />
    </StyledGame>
  )
}
