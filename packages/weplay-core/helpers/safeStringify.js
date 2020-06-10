// TODO: fix duplicated code because of node like require module system
const getCircularReplacer = () => {
  const seen = new WeakSet()
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return { _circular: true }
      }
      seen.add(value)
    }
    return value
  }
}

export const CANT_STRINGIFY = 'CANT_STRINGIFY'
export const STRINGIFIED = 'STRINGIFIED'
export function safeStringify(json) {
  if ((json ?? 'isNullish') === 'isNullish') {
    return String(json)
  }
  let argsStr = {}
  try {
    const stringified = JSON.stringify(json, null, 4)
    argsStr = {
      status: STRINGIFIED,
      stringified,
      parsed: JSON.parse(stringified),
    }
  } catch (err) {
    const stringified = JSON.stringify(json, getCircularReplacer())
    argsStr = {
      status: CANT_STRINGIFY,
      stringified,
      parsed: JSON.parse(stringified),
    }
  }
  return argsStr
}
