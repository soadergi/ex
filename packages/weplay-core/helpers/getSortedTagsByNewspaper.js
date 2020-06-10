import * as R from 'ramda'

export const getSortedTagsByNewspaper = R.pipe(
  R.props(['tags', 'unusualTags']),
  R.flatten,
  R.filter(item => !R.isNil(item)),
  R.sort(R.descend(R.prop('articlesCount'))),
)
