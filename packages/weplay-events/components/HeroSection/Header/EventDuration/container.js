import {
  compose,
  withPropsOnChange,
} from 'recompose'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { NAMES } from 'weplay-core/routes'

const container = compose(
  withRouteInfo,
  withPropsOnChange([
    'routeInfo',
  ], ({
    routeInfo,
  }) => ({
    hasCalendarIcon: routeInfo.title === NAMES.FORGE_OF_MASTERS_LAN_SECOND_SEASON,
  })),
)

export default container
