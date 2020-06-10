import * as R from 'ramda'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withPreloader from 'weplay-components/withPreloader'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  withPreloader({
    mapPropsToIsLoading: R.pipe(
      R.path(['tournaments']),
      tournaments => R.isNil(tournaments),
    ),
    skeletonProps: {
      count: 3,
      height: '80px',
    },
  }),
)

export default container
