import { $curry } from './$curry'

export const $propEq = (...args) => $curry((propName, propValue, obj) => obj?.[propName] === propValue, args)
