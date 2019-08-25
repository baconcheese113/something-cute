import Pawn from './pawn'
import { getRandomInt } from '../utils/helperFunctions'
import Enemy3 from '../artbits/Enemy3.svg'

export default class Tank extends Pawn {
  constructor(HP) {
    super(HP)
    this.damage = 5
    this.baseCooldown = 4000 + getRandomInt(2000)
    this.abilityLength = 2000
    this.regenIncHealth = 5
    this.regenTimes = 4
    this.image = Enemy3
    this.abilityTitle = 'Taunt'
    this.isTaunting = false
    this.abilityTimer = null
  }

  useAbility() {
    this.isTaunting = true
    console.log(`isTaunting is ${this.isTaunting}`)
    super.useAbility()

    window.clearTimeout(this.abilityTimer)
    this.abilityTimer = setTimeout(() => {
      console.log(`isTaunting is still ${this.isTaunting}`)
      this.isTaunting = false
    }, this.abilityCooldown)
  }
}
