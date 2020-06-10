import * as R from 'ramda'
import {
  compose,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { setTooltipViewed } from 'weplay-core/reduxs/tooltips/actions'
import { isTooltipViewedSelector } from 'weplay-core/reduxs/tooltips/reducer'

const container = compose(
  withAnalytics,
  connect(createStructuredSelector({
    // selectors
    isTooltipViewed: isTooltipViewedSelector(R.path(['tooltip', 'path'])),
  }), {
    // actionCreators
    setTooltipViewed,
  }),

  withHandlers({
    handleTooltipClosing: ({
      tooltip,
      setTooltipViewed, // eslint-disable-line no-shadow
      logAnalytics,
      location,
    }) => () => {
      setTooltipViewed(tooltip)
      logAnalytics({
        eventCategory: 'Tooltips',
        eventAction: 'OK btn',
        eventLabel: location.pathname,
      })
    },
    handleLinkClick: ({
      logAnalytics,
      location,
    }) => () => {
      logAnalytics({
        eventCategory: 'Tooltips',
        eventAction: 'inner link',
        eventLabel: location.pathname,
      })
    },
  }),
)

export default container
