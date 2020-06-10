import * as R from 'ramda'
import {
  compose,
  withStateHandlers,
  withHandlers,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import { userEmailSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import {
  getUserSubscriptions,
  getSubscriptionScopes,
} from 'weplay-core/reduxs/subscriptions/actions'
import {
  isSubscriptionScopesLoadingSelector,
  subscriptionsIdsSelector,
} from 'weplay-core/reduxs/subscriptions/reducer'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { setTooltipViewed } from 'weplay-core/reduxs/tooltips/actions'
import { tooltips } from 'weplay-core/reduxs/tooltips/config'
import { PROFILE_PATHS } from 'weplay-core/routes/core'

import withPreloader from 'weplay-components/withPreloader'

import { SORT_OPTIONS } from './config'

const container = compose(
  withLocale,
  withAnalytics,
  connect(createStructuredSelector({
    userEmail: userEmailSelector,
    isSubscriptionsLoading: isSubscriptionScopesLoadingSelector,
    fetchedSubscriptionIds: subscriptionsIdsSelector,
  }), {
    // actionCreators
    getUserSubscriptions: getUserSubscriptions.request,
    getSubscriptions: getSubscriptionScopes.request,
    setTooltipViewed,
  }),

  withPageViewAnalytics({
    subPage: PROFILE_PATHS.SUBSCRIPTIONS,
  }),

  withStateHandlers(({ fetchedSubscriptionIds }) => ({
    fetchedSubscriptionIds,
    viewOptions: {
      sortType: SORT_OPTIONS.POPULARITY,
      sortDesc: true,
      search: '',
    },
  }), {
    setFetchedSubscriptions: () => fetchedSubscriptionIds => ({
      fetchedSubscriptionIds,
    }),
    handleViewOptionsChange: () => viewOptions => ({
      viewOptions,
    }),
  }),

  withHandlers({
    createAnalyticsWithAction: ({
      logAnalytics,
    }) => eventAction => (eventLabel) => {
      logAnalytics({
        eventCategory: 'Subscription management',
        eventAction,
        eventLabel,
      })
    },
  }),

  withHandlers({
    /* eslint-disable no-shadow */
    fetchUserSubscriptions: ({
      getUserSubscriptions,
      userEmail,
      locale,
    }) => () => {
      getUserSubscriptions({
        userEmail,
        params: {
          language: locale,
        },
      })
    },
    fetchSubscriptions: ({
      getSubscriptions,
      locale,
      setFetchedSubscriptions,
    }) => () => {
      getSubscriptions({
        params: {
          language: locale,
          limit: 200,
        },
      }).then(R.pipe(
        R.pathOr([], ['data', 'data']),
        R.map(R.prop('id')),
        setFetchedSubscriptions,
      ))
    },
  }),

  lifecycle({
    componentDidMount() {
      if (this.props.userEmail) {
        this.props.fetchUserSubscriptions()
      }
      this.props.fetchSubscriptions()
      this.props.setTooltipViewed(tooltips.newContent.mySubscriptions)
    },

    componentDidUpdate(prevProps) {
      if (prevProps.locale !== this.props.locale) {
        this.props.fetchUserSubscriptions()
        this.props.fetchSubscriptions()
      }
      if (prevProps.userEmail !== this.props.userEmail) {
        this.props.fetchUserSubscriptions()
      }
    },
  }),
  withPreloader({
    mapPropsToIsLoading: ({
      isSubscriptionsLoading,
      fetchedSubscriptionIds,
    }) => (isSubscriptionsLoading && !fetchedSubscriptionIds.length),
  }),
)

export default container
