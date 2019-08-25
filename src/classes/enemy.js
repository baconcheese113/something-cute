import Pawn from './pawn'
import Enemy1 from '../artbits/Enemy1.svg'
import Enemy2 from '../artbits/Enemy2.svg'
import Enemy3 from '../artbits/Enemy3.svg'
import Enemy4 from '../artbits/Enemy4.svg'
import { getRandomInt } from '../utils/helperFunctions'

const ENEMY_IMAGES = [Enemy1, Enemy2, Enemy3, Enemy4]

export default class Enemy extends Pawn {
  constructor(HP) {
    super(HP)
    this.image = ENEMY_IMAGES[getRandomInt(ENEMY_IMAGES.length - 1)]
  }
}
