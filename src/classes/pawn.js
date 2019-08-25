import uuidv4 from 'uuid/v4'
import { getRandomIntRange, getRandomInt } from '../utils/helperFunctions'

export default class Pawn {
  constructor(HP) {
    this.HP = HP
    this.damage = 10
    this.id = uuidv4()
    this.color = `#${getRandomIntRange(100000, 999999)}`
    this.lastAttackTime = Date.now() - 40000
    this.baseCooldown = 2000 + getRandomInt(8000)
  }

  setAttackHandler = handler => {
    this.attackHandler = handler
  }

  attack = target => {
    target.takeDamage(this.damage)
    const now = Date.now()
    this.lastAttackTime = now
    this.attackHandler(now)
  }

  setDamageHandler = handler => {
    this.takeDamageHandler = handler
  }

  takeDamage = damage => {
    this.HP -= damage
    console.log(`Now have ${this.HP}HP`)
    this.takeDamageHandler(damage)
  }

  canAttack = () => {
    return Date.now() > this.lastAttackTime + this.baseCooldown && this.HP > 0
  }
}
