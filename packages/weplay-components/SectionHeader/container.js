import {
  compose,
  withHandlers,
  pure,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

const container = compose(
  pure,
  withAnalytics,
  connect(createStructuredSelector({
    // selectors
    isMobileWidth: isMobileWidthSelector,
  }), {
    // actionCreators
  }),
  withHandlers({
    logLinkClick: ({
      contentType,
      contentAction,
      logAnalytics,
    }) => () => {
      logAnalytics({
        eventCategory: contentType,
        eventAction: contentAction,
      })
    },
  }),
)

export default container
