import Character from './character'
import Enemy from './enemy'
import { getRandomInt } from '../utils/helperFunctions'

export default class BattleManager {
  constructor() {
    this.characters = Array(5)
      .fill()
      .map(() => new Character(100))
    this.enemies = Array(3)
      .fill()
      .map(() => new Enemy(100))
  }

  getEnemyTarget = () => {
    const validEnemies = this.enemies.filter(val => val.HP > 0)
    return validEnemies[getRandomInt(validEnemies.length)]
  }

  getCharacterTarget = () => {
    const validCharacters = this.characters.filter(val => val.HP > 0)
    return validCharacters[getRandomInt(validCharacters.length)]
  }
}
