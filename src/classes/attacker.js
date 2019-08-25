import Pawn from './pawn'
import { getRandomInt } from '../utils/helperFunctions'
import Enemy5 from '../artbits/Enemy5.svg'

export default class Attacker extends Pawn {
  constructor(HP) {
    super(HP)
    this.damage = 20
    this.baseCooldown = 1000 + getRandomInt(2000)
    this.abilityLength = 2000
    this.isReflecting = false
    this.image = Enemy5
    this.abilityTitle = 'Reflect'
    this.abilityTimer = null
  }

  takeDamage(attacker, damage) {
    if (!this.isReflecting || attacker.isReflecting) {
      super.takeDamage(attacker, damage)
    } else {
      // TODO handle this better
      attacker.takeDamage(this, damage)
    }
  }

  useAbility(target) {
    console.log('attacker using ability')
    this.isReflecting = true
    super.useAbility(target)

    window.clearTimeout(this.abilityTimer)
    this.abilityTimer = setTimeout(() => {
      this.isReflecting = false
    }, this.abilityCooldown)
  }
}
