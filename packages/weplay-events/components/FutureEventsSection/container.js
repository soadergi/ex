import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

const container = compose(
  connect(createStructuredSelector({
    isMobileWidth: isMobileWidthSelector,
  }), {
    // actionCreators
  }),
)

export default container
