import Pawn from './pawn'
import Enemy2 from '../artbits/Enemy2.svg'
import { getRandomInt } from '../utils/helperFunctions'

export default class Speedy extends Pawn {
  constructor(HP) {
    super(HP)
    this.damage = 25
    this.baseCooldown = 7000 + getRandomInt(4000)
    this.image = Enemy2
  }
}
