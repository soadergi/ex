import {
  compose,
  withPropsOnChange,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { currentUserSelector, isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { isUserHasNotificationsSelector } from 'weplay-core/reduxs/notifications/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    isLoggedIn: isLoggedInSelector,
    currentUser: currentUserSelector,
    isUserHasNotifications: isUserHasNotificationsSelector,
  }), {
    // actionCreators
  }),
  withLocale,
  withPropsOnChange([
    'currentUser',
  ], ({
    currentUser,
  }) => ({
    avatarPath: currentUser && currentUser.avatar_path,
    isPremiumAccount: currentUser && currentUser.is_premium_account,
  })),

  withStateHandlers({
    isControlsPopupOpen: false,
  }, {
    triggerControlsPopup: ({ isControlsPopupOpen }) => () => ({
      isControlsPopupOpen: !isControlsPopupOpen,
    }),
    closeControlsPopup: () => () => ({
      isControlsPopupOpen: false,
    }),
  }),
)

export default container
