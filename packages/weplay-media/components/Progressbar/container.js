import {
  compose,
  branch,
  renderNothing,
} from 'recompose'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { NAMES } from 'weplay-core/routes/media'
import withScrollInfo from 'weplay-core/HOCs/withScrollInfo'

const container = compose(
  withRouteInfo,
  branch(
    ({ routeInfo }) => routeInfo.name !== NAMES.ARTICLE_SHOW,
    renderNothing,
  ),

  withScrollInfo([
    'isScrolledTop',
    'scrollPercent',
    'isScrolled30MorePercents',
  ]),
)

export default container
