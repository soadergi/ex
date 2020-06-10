export const $omit = keys => (object) => {
  const newObject = { ...object }
  return keys.reduce((result, key) => {
    delete result[key] // eslint-disable-line no-param-reassign
    return result
  }, newObject)
}
