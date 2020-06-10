import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'

const container = compose(
  withRouteInfo,
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),
)

export default container
