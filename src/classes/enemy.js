import Pawn from './pawn'
import Enemy1 from '../artbits/Enemy1.svg'

export default class Enemy extends Pawn {
  constructor(HP) {
    super(HP)
    this.image = Enemy1
  }
}
