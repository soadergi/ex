import {
  compose, withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

const container = compose(
  withAnalytics,
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  withHandlers({
    logSponsorClick: ({ logAnalytics }) => () => {
      logAnalytics({
        eventAction: 'Sponsors block',
      })
    },
  }),
)

export default container
