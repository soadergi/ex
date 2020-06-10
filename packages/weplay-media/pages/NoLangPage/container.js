import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as R from 'ramda'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import { PATH_NAME_PREFIXES } from './constants'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),

  withPageViewAnalytics({
    articleName: 'NoLangPage',
  }),

  withPropsOnChange([
    'match',
  ], ({
    match,
  }) => {
    const pathNamePrefix = R.path(['params', 'pathNamePrefix'], match)
    return ({
      pathNamePrefix,
      isNews: pathNamePrefix === PATH_NAME_PREFIXES.NEWS,
      isSpecialTag: pathNamePrefix === PATH_NAME_PREFIXES.SPECIAL_TAGS,
    })
  }),
)

export default container
