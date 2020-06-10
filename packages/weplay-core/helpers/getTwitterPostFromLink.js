import * as R from 'ramda'

import { SOCIAL_NAMES } from 'weplay-core/config'

const socials = {
  [SOCIAL_NAMES.FB]: 'facebook.com',
  [SOCIAL_NAMES.TW]: 'twitter.com',
  [SOCIAL_NAMES.INST]: 'instagram.com',
}

export const getTwitterPostFromLink = (link) => {
  let post = {}
  R.forEachObjIndexed((value, key) => {
    if (R.contains(value, link)) {
      post = {
        type: key,
        url: link,
        id: R.pipe(
          R.split('/'),
          R.filter(Boolean),
          R.last,
          R.ifElse(
            R.test(/^[0-9]*$/),
            R.identity,
            R.always(null),
          ),
        )(link),
      }
    }
  })(socials)
  const isPostValid = R.and(
    R.pipe(
      R.values,
      R.map(Boolean),
      R.all(R.equals(true)),
    )(post),
    R.not(R.isEmpty(post)),
  )
  return isPostValid ? post : null
}
