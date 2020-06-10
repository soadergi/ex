import {
  compose,
  withProps,
  pure,
} from 'recompose'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'

const container = compose(
  withRouteInfo,
  pure,
  withProps(({
  }) => ({
    // analytic
    contentAction: 'Show all news',
    contentType: 'Content',
  })),
)

export default container
