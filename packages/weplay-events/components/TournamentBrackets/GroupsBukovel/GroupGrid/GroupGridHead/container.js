import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

const container = compose(
  withRouteInfo,
  connect(createStructuredSelector({
    // selectors
    isMobileWidth: isMobileWidthSelector,
  }), {
    // actionCreators
  }),
)

export default container
