export const trimObjectStringKeys = (params) => {
  if (!params || typeof params !== 'object') return params

  const trimmedParams = {}
  Object.keys(params)
    .forEach((key) => {
      if (typeof params[key] === 'string') {
        trimmedParams[key] = params[key].trim()
      }
    })
  return Object.assign(params, trimmedParams)
}
