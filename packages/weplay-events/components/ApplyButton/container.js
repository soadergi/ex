import {
  compose, withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { updateUser } from 'weplay-core/reduxs/_legacy/auth/actions'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'

const container = compose(
  withAnalytics,
  connect(createStructuredSelector({
    // selectors
    isLoggedIn: isLoggedInSelector,
  }), {
    // actionCreators
    updateUser,
    openLoginModal,
  }),

  withHandlers({
    logAnalyticsWithAction: ({
      logAnalytics,
    }) => (eventAction) => {
      logAnalytics({
        eventCategory: 'Lan ticket button',
        eventAction,
        eventLabel: 'Forge of Masters LAN landing click',
      })
    },
  }),

  withHandlers({
    handleApply: ({
      isLoggedIn,
      openLoginModal, // eslint-disable-line no-shadow
      updateUser, // eslint-disable-line no-shadow
      userPatch,
      logAnalyticsWithAction,
    }) => () => {
      if (!isLoggedIn) {
        openLoginModal(userPatch)
        logAnalyticsWithAction('Ask for a ticket unregistered')
      } else {
        updateUser({
          body: userPatch,
        }, { headers: { 'Content-Type': 'application/json' } })
        logAnalyticsWithAction('Ask for a ticket registered')
      }
    },
  }),
)

export default container
