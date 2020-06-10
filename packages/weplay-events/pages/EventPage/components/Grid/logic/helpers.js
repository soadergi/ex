import * as R from 'ramda'

export function findAndGetEntityIds(entities, comparator) {
  return entities.filter(comparator).map(R.prop('id'))
}

export function getMatchesNumber(n) {
  return n * ((n - 1) / 2)
}
