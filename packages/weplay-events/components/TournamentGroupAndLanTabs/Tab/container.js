import {
  compose,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

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
    logTournamentTabClick: ({
      logAnalytics,
      link,
    }) => () => {
      logAnalytics({
        eventAction: link.eventAction,
      })
    },
  }),
)

export default container
