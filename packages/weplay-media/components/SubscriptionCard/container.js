import * as R from 'ramda'
import {
  compose,
  defaultProps,
  withStateHandlers,
  withPropsOnChange,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { i18nTextsSelector, currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import {
  isUserSubscriptionsLoadingSelector,
  isCreateDeleteSubscriptionLoadingSelector,
  userTokenSelector,
} from 'weplay-core/reduxs/subscriptions/reducer'
import {
  createUserSubscription,
  deleteUserSubscription,
  getUserSubscriptions,
} from 'weplay-core/reduxs/subscriptions/actions'
import { isLoggedInSelector, userEmailSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
    userEmail: userEmailSelector,
    userToken: userTokenSelector,
    isLoggedIn: isLoggedInSelector,
    isUserSubscriptionsLoading: isUserSubscriptionsLoadingSelector,
    isCreateDeleteSubscriptionLoading: isCreateDeleteSubscriptionLoadingSelector,
  }), {
    // actionCreators
    createSubscription: createUserSubscription.request,
    deleteSubscription: deleteUserSubscription.request,
    getUserSubscriptions: getUserSubscriptions.request,
  }),

  defaultProps({
    createAnalyticsWithAction: R.always,
  }),
  withLocale,

  withPropsOnChange([
    'createAnalyticsWithAction',
  ], ({
    createAnalyticsWithAction,
  }) => ({
    logUserAllowed: createAnalyticsWithAction('Allow personal data'),
    logDeleteSubscription: createAnalyticsWithAction('Unsubscribe (switcher)'),
    logCreateSubscription: createAnalyticsWithAction('Subscribe (switcher)'),
  })),
  withPropsOnChange([
    'locale',
    'subscription',
  ], ({
    locale,
    subscription,
  }) => ({
    subscriptionTitle: subscription.localizations[locale]?.title,
  })),

  withStateHandlers({
    isChecked: false,
  }, {
    toggleUserAllowCheckbox: (
      { isChecked },
      { subscriptionTitle, logUserAllowed },
    ) => () => {
      if (!isChecked) {
        logUserAllowed(subscriptionTitle)
      }
      return {
        isChecked: !isChecked,
      }
    },
  }),

  withPropsOnChange([
    'isUserSubscriptionsLoading',
    'isCreateDeleteSubscriptionLoading',
  ], ({
    isUserSubscriptionsLoading,
    isCreateDeleteSubscriptionLoading,
  }) => ({
    isDataFetching: isUserSubscriptionsLoading || isCreateDeleteSubscriptionLoading,
  })),

  withHandlers({
    /* eslint-disable no-shadow */
    toggleUserSubscription: ({
      isUserSubscribed,
      subscription,
      subscriptionTitle,
      currentLanguage,
      userEmail,
      userToken,
      createSubscription,
      deleteSubscription,
      logDeleteSubscription,
      logCreateSubscription,
    }) => () => {
      if (isUserSubscribed) {
        deleteSubscription({
          email: userEmail,
          language: currentLanguage,
          scope: subscription.name,
          token: userToken,
        }).then(() => logDeleteSubscription(subscriptionTitle))
      } else {
        createSubscription({
          email: userEmail,
          language: currentLanguage,
          scope: subscription.name,
        }).then(() => logCreateSubscription(subscriptionTitle))
      }
    },
  }),
)

export default container
