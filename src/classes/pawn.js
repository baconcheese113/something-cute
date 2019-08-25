import uuidv4 from 'uuid/v4'
import { getRandomIntRange, getRandomInt } from '../utils/helperFunctions'

export default class Pawn {
  constructor(HP) {
    this.baseHP = HP
    this.HP = this.baseHP
    this.damage = 10
    this.id = uuidv4()
    this.color = `#${getRandomIntRange(100000, 999999)}`
    this.lastAttackTime = Date.now() - 40000
    this.lastAbilityTime = Date.now() - 40000
    this.baseCooldown = 2000 + getRandomInt(8000)
    this.abilityCooldown = 6000 + getRandomInt(2000)
    this.regenHealthInterval = null
    this.abilityTitle = 'Ability'
  }

  setAttackHandler = handler => {
    this.attackHandler = handler
  }

  attack = target => {
    target.takeDamage(this, this.damage)
    const now = Date.now()
    this.lastAttackTime = now
    this.attackHandler(now)
  }

  setDamageHandler = handler => {
    this.takeDamageHandler = handler
  }

  takeDamage = (attacker, damage) => {
    this.HP -= damage
    console.log(`Now have ${this.HP}HP`)
    this.takeDamageHandler(damage)
  }

  canAttack = () => {
    return Date.now() > this.lastAttackTime + this.baseCooldown && this.HP > 0
  }

  canUseAbility = () => {
    return Date.now() > this.lastAbilityTime + this.abilityCooldown && this.HP > 0
  }

  setAbilityHandler = handler => {
    this.useAbilityHandler = handler
  }

  useAbility = () => {
    const now = Date.now()
    this.lastAbilityTime = now
    this.useAbilityHandler(now)
  }

  setRegenHandler = handler => {
    this.regenHealthHandler = handler
  }

  regenHealth = (incHealth, times) => {
    window.clearInterval(this.regenHealthInterval)
    let timesLeft = times
    this.regenHealthInterval = setInterval(() => {
      timesLeft -= 1
      if (this.HP > 0 && this.HP < this.baseHP) this.HP = Math.min(this.HP + incHealth, this.baseHP)
      this.regenHealthHandler()
      if (timesLeft < 1) window.clearInterval(this.regenHealthInterval)
    }, 500)
  }
}
