import * as R from 'ramda'

export const getTimeStringFromYoutube = (duration) => {
  if (!duration) return null

  const getValue = (str, regexp, isExtraZero = false) => {
    const match = str.match(regexp)
    if (!match) return ''

    const timeStr = R.pipe(
      R.defaultTo([]),
      R.head,
      R.init,
    )(match)

    return isExtraZero ? R.ifElse(
      R.pipe(
        R.length,
        R.equals(1),
      ),
      R.concat('0'),
      R.identity,
    )(timeStr) : timeStr
  }

  const hours = getValue(duration, /\d{1,2}[H]/)
  const minutes = getValue(duration, /\d{1,2}[M]/, Boolean(hours))
  const seconds = getValue(duration, /\d{1,2}[S]/, true)

  return `${hours}${hours ? ':' : ''}${minutes || '0'}:${seconds}`
}
