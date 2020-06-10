import * as R from 'ramda'

export const getEntityIdByType = (entity) => {
  const types = ['newsId', 'specialTagTranslateId']
  for (let i = 0; i < types.length; i += 1) {
    if (R.has(types[i])(entity)) {
      return ({
        id: entity[types[i]],
        type: types[i],
      })
    }
  }
  return false
}
