import React from 'react'
import styled, { keyframes } from 'styled-components'

const recharge = totalChargeLength => {
  return keyframes`
    0% {stroke-dashoffset: ${totalChargeLength};}
    100%{stroke-dashoffset: 0;}
  `
}

const StyledCharacter = styled.button`
  position: relative;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: none;
  background-color: ${props => props.color};
  filter: ${props => !props.alive && 'brightness(20%)'};
  cursor: pointer;
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

export default function Character(props) {
  const { characterClass, onAttack } = props

  const [HP, setHP] = React.useState(characterClass.HP)
  const [lastAttackTime, setLastAttackTime] = React.useState(characterClass.lastAttackTime)
  const [totalChargeLength, setTotalChargeLength] = React.useState(0)

  const chargeRing = React.useRef()
  const chargeTimer = React.useRef()

  const alive = characterClass.HP > 0

  React.useEffect(() => {
    setTotalChargeLength(chargeRing.current.getTotalLength())
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
  }, [characterClass])
  init()

  const handleClick = e => {
    e.stopPropagation()
    console.log('ATTACKING')
    if (characterClass.canAttack() && alive) onAttack(characterClass)
  }
  const radius = 50
  console.log(`now is ${Date.now()} and time to beat is ${lastAttackTime + characterClass.baseCooldown}`)

  return (
    <StyledCharacter color={characterClass.color} onClick={handleClick} alive={alive}>
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
          className={Date.now() > lastAttackTime + characterClass.baseCooldown ? 'charged' : 'charging'}
          cooldown={characterClass.baseCooldown / 1000}
          fill="none"
        />
      </Svg>
    </StyledCharacter>
  )
}
