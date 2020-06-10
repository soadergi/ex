import * as R from 'ramda'
import {
  compose,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import {
  i18nTextsSelector,
} from 'weplay-core/reduxs/language/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withProps(({
    slide,
  }) => ({
    url: R.prop('url', slide),
  })),
)

export default container
