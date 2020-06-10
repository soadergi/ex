export const $isEmpty = (entity) => {
  if (Array.isArray(entity) || typeof entity === 'string') {
    return !entity.length
  }
  if (typeof entity === 'object' && entity !== null) {
    return !Object.keys(entity).length
  }
  return false
}
