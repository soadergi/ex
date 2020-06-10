export const getAnalyticsAttributes = (attributes) => {
  if (!attributes) return {}
  const keys = Object.keys(attributes)
  return keys.reduce((acc, key) => ({
    ...acc,
    [`data-event-${key}`]: attributes[key],
  }), {})
}
