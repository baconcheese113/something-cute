import uuidv4 from 'uuid/v4'
import { getRandomIntRange } from '../utils/helperFunctions'

export default class Pawn {
  constructor(HP) {
    this.HP = HP
    this.damage = 10
    this.id = uuidv4()
    this.color = `#${getRandomIntRange(100000, 999999)}`
  }

  attack = target => {
    target.takeDamage(this.damage)
  }

  setDamageHandler = handler => {
    this.takeDamageHandler = handler
  }

  takeDamage = damage => {
    this.HP -= damage
    console.log(`Now have ${this.HP}HP`)
    this.takeDamageHandler(damage)
  }
}
