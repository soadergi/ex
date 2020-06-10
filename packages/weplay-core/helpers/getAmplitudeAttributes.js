export const getAmplitudeAttributes = (attributes) => {
  const keys = Object.keys(attributes)
  return keys.reduce((acc, key) => ({
    ...acc,
    [`data-event-${key}`]: attributes[key],
  }), {})
}
