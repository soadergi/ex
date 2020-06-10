import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withFeatureSupport from 'weplay-competitive/HOCs/withFeatureSupport'

const container = compose(
  withFeatureSupport,
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
)

export default container
