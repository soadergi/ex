import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

const container = compose(
  connect(createStructuredSelector({
    // Selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),
)

export default container
