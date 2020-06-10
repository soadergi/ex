export const $curry = (fn, args) => {
  if (args.length < fn.length) {
    return (...nextArgs) => $curry(fn, [...args, ...nextArgs])
  }
  return fn(...args)
}
