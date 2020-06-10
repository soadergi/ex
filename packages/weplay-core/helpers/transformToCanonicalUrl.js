import * as R from 'ramda'

import transliterate from 'weplay-core/helpers/translit'

export const transformToCanonicalUrl = (urlWithId, name) => {
  if (!urlWithId || !name) {
    return urlWithId || null
  }
  const splitUrl = R.split('/', urlWithId)
  return R.join('/', R.append(
    `${transliterate(name)}-${R.last(splitUrl)}`,
    R.init(splitUrl),
  ))
}
