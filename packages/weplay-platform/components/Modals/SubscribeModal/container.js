import {
  compose,
  withProps,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import queryString from 'query-string'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { PROFILE_PATHS } from 'weplay-core/routes/core'
import { approveSubscription } from 'weplay-core/reduxs/subscriptions/actions'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    globalScope: globalScopeSelector,
  }), {
    // actionCreators
    approveUserSubscription: approveSubscription.request,
  }),

  withProps({
    link: pathWithParamsByRoute(NAMES.PROFILE, { section: PROFILE_PATHS.SUBSCRIPTIONS }),
  }),

  lifecycle({
    componentDidMount() {
      const { approveUserSubscription, globalScope } = this.props
      approveUserSubscription({ id: queryString.parse(globalScope.location.search).subscribe_request_id })
    },
  }),
)

export default container
