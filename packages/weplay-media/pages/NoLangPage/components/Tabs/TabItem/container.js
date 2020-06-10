import {
  compose,
  withHandlers,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

const container = compose(
  withRouter,
  withAnalytics,
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),

  withHandlers({
    logTabClick: ({
      logAnalytics,
      tab,
    }) => () => {
      logAnalytics({
        eventAction: tab,
      })
    },
  }),
)

export default container
