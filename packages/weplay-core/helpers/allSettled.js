import { safeStringify } from './safeStringify'

export function allSettled(promises) {
  const wrappedPromises = promises.map(promise => promise
    .catch((err) => {
      const stringifiedErr = safeStringify(err)
      console.warn('allSettled promise failed err', err)
      return ({ status: 'rejected', reason: stringifiedErr.parsed })
    }))
  return Promise.all(wrappedPromises)
}
