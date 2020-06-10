import { $curry } from './$curry'

export const $prop = (...args) => $curry((prop, obj) => obj?.[prop], args)
