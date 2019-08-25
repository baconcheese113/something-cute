import React from 'react'
import styled, { keyframes } from 'styled-components'
import { getRandomInt } from './utils/helperFunctions'

const recharge = totalChargeLength => {
  return keyframes`
    0% {stroke-dashoffset: ${totalChargeLength};}
    100%{stroke-dashoffset: 0;}
  `
}
const StyledEnemy = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const EnemyButton = styled.button`
  position: relative;
  height: 100px;
  width: 100px;
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
const HealthBar = styled.div`
  width: ${props => props.healthPercent}%;
  background-color: black;
  height: 10px;
  align-self: flex-start;
`

const radius = 50

export default function Character(props) {
  const { enemyClass, onAttack } = props

  const [HP, setHP] = React.useState(enemyClass.HP)
  const [lastAttackTime, setLastAttackTime] = React.useState(enemyClass.lastAttackTime)
  const [totalChargeLength, setTotalChargeLength] = React.useState(0)

  const chargeRing = React.useRef()
  const chargeTimer = React.useRef()
  const attackTimer = React.useRef()

  const alive = enemyClass.HP > 0

  React.useEffect(() => {
    setTotalChargeLength(chargeRing.current.getTotalLength())
  }, [chargeRing])

  const performAttack = () => {
    window.clearTimeout(attackTimer.current)
    attackTimer.current = setTimeout(() => {
      if (enemyClass.canAttack()) onAttack(enemyClass)
      performAttack()
    }, enemyClass.baseCooldown + getRandomInt(1000))
  }

  React.useEffect(() => {
    performAttack()
    return () => {
      window.clearTimeout(attackTimer.current)
      window.clearTimeout(chargeTimer.current)
    }
  }, [])

  const init = React.useCallback(() => {
    enemyClass.setDamageHandler(damage => {
      console.log(`taking ${damage} damage`)
      setHP(enemyClass.HP)
    })
    enemyClass.setAttackHandler(time => {
      console.log('attacked!')
      chargeTimer.current = setTimeout(() => {
        console.log(time, enemyClass.baseCooldown)
        chargeRing.current.classList.remove('charging')
        setLastAttackTime(time - 20000)
      }, enemyClass.baseCooldown)
      setLastAttackTime(time)
    })
  }, [enemyClass])

  init()

  return (
    <StyledEnemy>
      <EnemyButton color={enemyClass.color} alive={alive}>
        <img src={enemyClass.image} alt="Enemy" />
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
            className={Date.now() > lastAttackTime + enemyClass.baseCooldown ? 'charged' : 'charging'}
            cooldown={enemyClass.baseCooldown / 1000}
            fill="none"
          />
        </Svg>
      </EnemyButton>
      <HealthBar healthPercent={(HP / enemyClass.baseHP) * 100} />
    </StyledEnemy>
  )
}
