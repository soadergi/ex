import * as R from 'ramda'
import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { createNewsByIdSelector } from 'weplay-core/reduxs/news/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    news: createNewsByIdSelector(R.prop('newsIds')),
  }), {
    // actionCreators
  }),
)

export default container
