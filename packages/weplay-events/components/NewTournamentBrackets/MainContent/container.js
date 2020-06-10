import {
  compose,
  pure,
} from 'recompose'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'

const container = compose(
  withRouteInfo,
  pure,
)
export default container
