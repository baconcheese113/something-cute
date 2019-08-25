import Enemy from './enemy'
import { getRandomInt, randomWeightedIndex } from '../utils/helperFunctions'
import Attacker from './attacker'
import Support from './support'
import Tank from './tank'
import Attacky from './attacky'
import Speedy from './speedy'

export default class BattleManager {
  constructor() {
    this.characters = [new Tank(80), new Attacker(80), new Support(80)]
    this.enemies = []
    this.weightedList = [{ weight: 4, type: Speedy }, { weight: 2, type: Attacky }, { weight: 5, type: Enemy }]
    this.round = 0
  }

  startNextRound = () => {
    this.round += 1
    this.enemies = Array(Math.min(this.round, 5))
      .fill()
      .map(() => {
        const index = randomWeightedIndex(this.weightedList)
        if (index === 0) return new Speedy(100)
        if (index === 1) return new Attacky(100)
        return new Enemy(100)
      })
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
    console.log(this.characters)
    const tauntCharacter = this.characters.find(c => c.isTaunting)
    if (tauntCharacter) console.log(`found ${tauntCharacter}`)
    const character = tauntCharacter || validCharacters[getRandomInt(validCharacters.length)]
    console.log(character.HP)
    return character
  }

  levelComplete = () => {
    // if(this.characters.filter(val => val.HP > 0).length < 1) return true
    if (this.enemies.filter(val => val.HP > 0).length < 1) return true
    return false
  }

  applyTeamRegen = (caster, incHealth, times) => {
    this.characters.forEach(c => {
      if (c.HP > 0 && c !== caster) {
        c.regenHealth(incHealth, times)
      }
    })
  }
}
