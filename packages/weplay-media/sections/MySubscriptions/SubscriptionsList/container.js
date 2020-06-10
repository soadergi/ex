import {
  compose,
  withPropsOnChange,
  lifecycle,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import {
  isUserHasSubscriptionsSelector,
  createSubscriptionsByIdsSelector,
  userSubscriptionIdsSelector,
} from 'weplay-core/reduxs/subscriptions/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    isUserHasSubscriptions: isUserHasSubscriptionsSelector,
    userSubscriptionIds: userSubscriptionIdsSelector,
    fetchedSubscriptions: createSubscriptionsByIdsSelector(R.prop('fetchedSubscriptionIds')),
  }), {
    // actionCreators
  }),
  withLocale, // props: { locale, t }

  withPropsOnChange([
    'fetchedSubscriptions',
  ], ({
    fetchedSubscriptions,
  }) => ({
    // TODO !!!this is temporary decision, remove when backend fix it on theirs side
    subscriptionsList: fetchedSubscriptions.filter(subscription => subscription.id !== '5d94778eb08711360c4436d3'),
  })),

  withPropsOnChange([
    'subscriptionsList',
    'viewOptions',
    'locale',
  ], ({
    subscriptionsList,
    viewOptions,
    locale,
  }) => {
    const sortedList = viewOptions.sortDesc
      ? R.sort(R.descend(R.path(['localizations', locale, viewOptions.sortType])), subscriptionsList)
      : R.sort(R.ascend(R.path(['localizations', locale, viewOptions.sortType])), subscriptionsList)
    return {
      filteredSubscriptions: R.filter(R.pipe(
        R.pathOr('', ['localizations', locale, 'title']),
        R.toLower,
        R.includes(R.toLower(viewOptions.search)),
      ))(sortedList),
    }
  }),

  withPropsOnChange([
    'filteredSubscriptions',
    'userSubscriptionIds',
  ], ({
    filteredSubscriptions,
    userSubscriptionIds,
  }) => ({
    userSubscriptions: R.filter(
      subscription => R.includes(R.prop('id', subscription), userSubscriptionIds),
    )(filteredSubscriptions),
    restSubscriptions: R.filter(
      subscription => R.and(
        !R.includes(R.prop('id', subscription), userSubscriptionIds),
        R.propEq('isActive', true)(subscription),
      ),
    )(filteredSubscriptions),
  })),

  lifecycle({
    componentDidUpdate(prevProps) {
      const { filteredSubscriptions, viewOptions, createAnalyticsWithAction } = this.props
      if (prevProps.filteredSubscriptions !== filteredSubscriptions && viewOptions.search) {
        const logSearchStatus = createAnalyticsWithAction('Searching')
        logSearchStatus(R.isEmpty(filteredSubscriptions) ? 'No results' : 'With results')
      }
    },
  }),
)

export default container
