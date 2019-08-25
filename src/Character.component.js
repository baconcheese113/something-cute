import React from 'react'
import styled, { keyframes } from 'styled-components'

const recharge = totalChargeLength => {
  return keyframes`
    0% {stroke-dashoffset: ${totalChargeLength};}
    100%{stroke-dashoffset: 0;}
  `
}

const StyledCharacter = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 40px;
`
const CharacterButton = styled.button`
  position: relative;
  height: 100px;
  width: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: none;
  background-color: ${props => props.color};
  filter: ${props => !props.alive && 'brightness(20%)'};
  cursor: pointer;

  img {
    height: 63%;
  }
`
const Svg = styled.svg`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
`
const ChargeRing = styled.circle`
  transform: rotate(-90deg);
  transform-origin: center;
  transform-box: fill-box;
  pointer-events: none;
  stroke-dashoffset: 0;

  &.charging {
    animation: ${props => recharge(props.strokeDasharray)} ${props => props.cooldown}s linear forwards;
  }
  &.charged {
    stroke-dashoffset: 0;
  }
`
const AbilityButton = styled.button`
  width: 90%;
  margin-top: -30px;
  height: ${props => (props.canUseAbility ? 110 : 0)}px;
  padding: 0;
  overflow: hidden;
  border: none;
`
const HealthBar = styled.div`
  width: ${props => props.healthPercent}%;
  background-color: black;
  height: 10px;
  align-self: flex-start;
`

export default function Character(props) {
  const { characterClass, onAttack, onAbility } = props

  const [HP, setHP] = React.useState(characterClass.HP)
  const [lastAttackTime, setLastAttackTime] = React.useState(characterClass.lastAttackTime)
  const [totalChargeLength, setTotalChargeLength] = React.useState(0)
  const [lastAbilityTime, setLastAbilityTime] = React.useState(characterClass.lastAbilityTime)
  // const [abilityChargeLength, setAbilityChargeLength] = React.useState(0)

  const chargeRing = React.useRef()
  const chargeTimer = React.useRef()
  const abilityTimer = React.useRef()

  const alive = characterClass.HP > 0

  React.useEffect(() => {
    setTotalChargeLength(chargeRing.current.getTotalLength())
    return () => {
      window.clearTimeout(chargeTimer.current)
    }
  }, [chargeRing])

  const init = React.useCallback(() => {
    characterClass.setDamageHandler(damage => {
      console.log(`taking ${damage} damage`)
      setHP(characterClass.HP)
    })
    characterClass.setAttackHandler(time => {
      console.log('attacked!')
      chargeTimer.current = setTimeout(() => {
        console.log(time, characterClass.baseCooldown)
        chargeRing.current.classList.remove('charging')
        setLastAttackTime(time - 20000)
      }, characterClass.baseCooldown)
      setLastAttackTime(time)
    })
    characterClass.setAbilityHandler(time => {
      console.log('ability!')
      abilityTimer.current = setTimeout(() => {
        // chargeRing.current.classList.remove('charging')
        setLastAbilityTime(time - 20000)
      }, characterClass.abilityCooldown)
      setLastAbilityTime(time)
    })
    characterClass.setRegenHandler(() => {
      setHP(characterClass.HP)
    })
  }, [characterClass])
  init()

  const handleAttackClick = e => {
    e.stopPropagation()
    console.log('ATTACKING')
    if (characterClass.canAttack() && alive) onAttack(characterClass)
  }
  const handleAbilityClick = e => {
    e.stopPropagation()
    console.log('ABILITY')
    if (characterClass.canUseAbility()) onAbility(characterClass)
  }
  const radius = 50

  return (
    <StyledCharacter>
      <CharacterButton color={characterClass.color} onClick={handleAttackClick} alive={alive}>
        <img src={characterClass.image} alt="Character" />
        {HP}
        <Svg>
          <ChargeRing
            ref={chargeRing}
            cx={radius}
            cy={radius}
            r={radius - 6}
            stroke="white"
            strokeWidth="10"
            strokeDasharray={totalChargeLength}
            className={characterClass.canAttack() ? 'charged' : 'charging'}
            cooldown={characterClass.baseCooldown / 1000}
            fill="none"
          />
        </Svg>
      </CharacterButton>
      <AbilityButton canUseAbility={characterClass.canUseAbility()} onClick={handleAbilityClick}>
        Use Ability
      </AbilityButton>
      <HealthBar healthPercent={(HP / characterClass.baseHP) * 100} />
    </StyledCharacter>
  )
}
