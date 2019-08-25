import Character from './character'
import Enemy from './enemy'
import { getRandomInt } from '../utils/helperFunctions'
import Attacker from './attacker'

export default class BattleManager {
  constructor() {
    this.characters = [new Attacker(80), new Attacker(80), new Attacker(80)]
    this.enemies = []

    this.round = 0
  }

  startNextRound = () => {
    this.round += 1
    this.enemies = Array(Math.min(this.round, 5))
      .fill()
      .map(() => new Enemy(100))
    return this.round
  }

  getEnemyTarget = () => {
    const validEnemies = this.enemies.filter(val => val.HP > 0)
    if (validEnemies.length < 1) return null
    const enemy = validEnemies[getRandomInt(validEnemies.length)]
    console.log(enemy.HP)
    return enemy
  }

  getCharacterTarget = () => {
    const validCharacters = this.characters.filter(val => val.HP > 0)
    if (validCharacters.length < 1) return null
    const character = validCharacters[getRandomInt(validCharacters.length)]
    console.log(character.HP)
    return character
  }

  levelComplete = () => {
    // if(this.characters.filter(val => val.HP > 0).length < 1) return true
    if (this.enemies.filter(val => val.HP > 0).length < 1) return true
    return false
  }
}
