import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  compose,
  withPropsOnChange,
} from 'recompose'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import getArticleImage from 'weplay-core/helpers/getArticleImage'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'newspaper',
  ], ({
    newspaper,
  }) => ({
    articleImage: getArticleImage(newspaper),
  })),
)

export default container
