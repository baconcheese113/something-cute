export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export function getRandomIntRange(min, max) {
  const minCeil = Math.ceil(min)
  const maxFloor = Math.floor(max)
  return Math.floor(Math.random() * (maxFloor - minCeil)) + minCeil // The maximum is exclusive and the minimum is inclusive
}

export function randomWeightedIndex(list) {
  const totalWeight = list.reduce((prev, cur) => cur.weight + prev, 0)
  const rand = getRandomInt(totalWeight)
  let sum = 0
  let index = 0
  for (const [idx, el] of list.entries()) {
    if (sum + el.weight > rand) {
      index = idx
      break
    }
    sum += el.weight
  }
  return index
}
