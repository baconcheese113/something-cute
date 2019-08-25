import Pawn from './pawn'
import { getRandomInt } from '../utils/helperFunctions'
import Enemy4 from '../artbits/Enemy4.svg'

export default class Attacker extends Pawn {
  constructor(HP) {
    super(HP)
    this.damage = 5
    this.baseCooldown = 4000 + getRandomInt(2000)
    this.abilityLength = 2000
    this.regenIncHealth = 5
    this.regenTimes = 4
    this.image = Enemy4
    this.abilityTitle = 'Regen'
  }

  useAbility(target) {
    console.log('support using ability')
    super.useAbility(target)
  }
}
