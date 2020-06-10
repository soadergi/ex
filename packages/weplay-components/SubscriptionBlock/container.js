import * as R from 'ramda'
import _ from 'lodash'
import {
  compose,
  withHandlers,
  lifecycle,
  branch,
  renderNothing,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { camelCase } from 'weplay-core/helpers/camelCase'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { createSubscriptionByLocationSelector } from 'weplay-core/reduxs/subscriptions/reducer'
import {
  isSubscriptionBlockLoadingSelector,
  isSubscriptionBlockAlreadyFetchedSelector,
} from 'weplay-core/reduxs/subscriptionBlocks/reducer'
import { getSubscriptionBlock } from 'weplay-core/reduxs/subscriptionBlocks/actions'

const mapPropsToLocation = ({
  routeInfo: { name },
  match: { params },
  pageName,
}) => (pageName ? {
  page: camelCase(pageName),
  id: 0,
} : {
  page: camelCase(name),
  id: parseInt(params[`${name}Id`], 10) || 0,
})

const container = compose(
  withRouteInfo,
  withLocale,
  connect(createStructuredSelector({
    // selectors
    isSubscriptionBlockLoading: isSubscriptionBlockLoadingSelector,
    subscriptionBlock: createSubscriptionByLocationSelector(mapPropsToLocation),
    isSubscriptionBlockAlreadyFetched: isSubscriptionBlockAlreadyFetchedSelector(mapPropsToLocation),
  }), {
    // actionCreators
    getSubscriptionBlock: getSubscriptionBlock.request,
  }),

  withHandlers({
    fetchSubscription: ({
      locale,
      routeInfo,
      match,
      getSubscriptionBlock, // eslint-disable-line no-shadow
      pageName,
    }) => () => getSubscriptionBlock({
      params: {
        language: locale,
        isActive: 1,
        locationPage: pageName || _.snakeCase(routeInfo.name),
        locationId: R.pathOr(0, ['params', `${routeInfo.name}Id`], match),
      },
    }),
  }),

  lifecycle({
    componentDidMount() {
      if (!this.props.isSubscriptionBlockAlreadyFetched && !this.props.isSubscriptionBlockLoading) {
        this.props.fetchSubscription()
      }
    },
    componentDidUpdate(prevProps) {
      if (prevProps.locale !== this.props.locale) {
        this.props.fetchSubscription()
      }
    },
  }),

  branch(
    ({
      subscriptionBlock,
      isSubscriptionBlockLoading,
    }) => R.not(R.prop('isActive', subscriptionBlock)) || isSubscriptionBlockLoading,
    renderNothing,
  ),
)

export default container
