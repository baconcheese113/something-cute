export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export function getRandomIntRange(min, max) {
  const minCeil = Math.ceil(min)
  const maxFloor = Math.floor(max)
  return Math.floor(Math.random() * (maxFloor - minCeil)) + minCeil // The maximum is exclusive and the minimum is inclusive
}
