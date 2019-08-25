import Pawn from './pawn'
import Enemy3 from '../artbits/Enemy3.svg'
import { getRandomInt } from '../utils/helperFunctions'

export default class Speedy extends Pawn {
  constructor(HP) {
    super(HP)
    this.damage = 5
    this.baseCooldown = 2000 + getRandomInt(1000)
    this.image = Enemy3
  }
}
