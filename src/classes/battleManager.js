import Character from './character'
import Enemy from './enemy'
import { getRandomInt } from '../utils/helperFunctions'

export default class BattleManager {
  constructor() {
    this.characters = Array(5)
      .fill()
      .map(() => new Character(80))
    this.enemies = Array(3)
      .fill()
      .map(() => new Enemy(100))
  }

  getEnemyTarget = () => {
    const validEnemies = this.enemies.filter(val => val.HP > 1)
    if (validEnemies.length < 1) return null
    const enemy = validEnemies[getRandomInt(validEnemies.length)]
    console.log(enemy.HP)
    return enemy
  }

  getCharacterTarget = () => {
    const validCharacters = this.characters.filter(val => val.HP > 1)
    if (validCharacters.length < 1) return null
    const character = validCharacters[getRandomInt(validCharacters.length)]
    console.log(character.HP)
    return character
  }
}
