import { camelCase } from './camelCase'

export const camelizeKeys = (data) => {
  if (data === null) {
    return data
  }
  if (typeof data !== 'object') {
    return data
  }
  if (data instanceof Array) {
    return data.map(camelizeKeys)
  }
  return Object.keys(data)
    .reduce((memo, key) => {
      memo[camelCase(key)] = camelizeKeys(data[key]) // eslint-disable-line no-param-reassign
      return memo
    }, {})
}
