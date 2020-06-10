import { compose } from 'recompose'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'

const container = compose(
  withRouteInfo,
)

export default container
