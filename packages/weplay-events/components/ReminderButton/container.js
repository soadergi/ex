import * as R from 'ramda'
import {
  compose,
  withHandlers,
  lifecycle,
  withPropsOnChange,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import {
  isLoggedInSelector,
  userEmailSelector,
} from 'weplay-core/reduxs/_legacy/auth/reducer'
import { openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { getUserSubscriptions } from 'weplay-core/reduxs/subscriptions/actions'
import {
  userSubscriptionIdsSelector,
  isUserSubscriptionsLoadingSelector,
} from 'weplay-core/reduxs/subscriptions/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    isLoggedIn: isLoggedInSelector,
    userEmail: userEmailSelector,
    userSubscriptionIds: userSubscriptionIdsSelector,
    isUserSubscriptionsLoading: isUserSubscriptionsLoadingSelector,
  }), {
    // actionCreators
    openLogin: openLoginModal,
    getUserSubscriptions: getUserSubscriptions.request,
  }),

  withLocale,

  withStateHandlers({
    isSetTournamentNotificationModalVisible: false,
  }, {
    toggleSetTournamentNotificationModal: ({ isSetTournamentNotificationModalVisible }) => () => ({
      isSetTournamentNotificationModalVisible: !isSetTournamentNotificationModalVisible,
    }),
  }),

  withPropsOnChange([
    't',
    'isLoggedIn',
    'subscriptionScopeId',
    'userSubscriptionIds',
    'isSetTournamentNotificationModalVisible',
  ], ({
    isSetTournamentNotificationModalVisible,
    subscriptionScopeId,
    userSubscriptionIds,
    isLoggedIn,
    t,
  }) => {
    const isUserSubscribed = isLoggedIn && R.contains(subscriptionScopeId, userSubscriptionIds)

    return ({
      isUserSubscribed,
      buttonText: t(`events.eventsRootPage.futureEventsBlock.body.${
        isUserSubscribed ? 'successButton' : 'setReminderButton'
      }`),
      isTournamentNotificationModalOpened: isLoggedIn && isSetTournamentNotificationModalVisible,
    })
  }),

  withHandlers({
    handleClick: ({
      isLoggedIn,
      toggleSetTournamentNotificationModal,
      openLogin,
    }) => () => {
      toggleSetTournamentNotificationModal()

      if (!isLoggedIn) {
        openLogin()
      }
    },
  }),

  withHandlers({
    getUserSubscriptionsHandler: ({
      getUserSubscriptions, // eslint-disable-line
      userEmail,
    }) => () => getUserSubscriptions({ userEmail }).catch(error => console.warn(error)),
  }),

  lifecycle({
    componentDidMount() {
      if (this.props.userEmail && !this.props.isUserSubscriptionsLoading) {
        this.props.getUserSubscriptionsHandler()
      }
    },

    componentDidUpdate(prevProps) {
      const {
        userEmail,
        isLoggedIn,
        getUserSubscriptionsHandler,
        isUserSubscriptionsLoading,
      } = this.props

      if ((prevProps.userEmail !== userEmail) && isLoggedIn && !isUserSubscriptionsLoading) {
        getUserSubscriptionsHandler()
      }
    },
  }),
)

export default container
