import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { currentLanguagePrefixSelector } from 'weplay-core/reduxs/language/reducer'

const container = compose(
  connect(createStructuredSelector({
    currentLanguagePrefix: currentLanguagePrefixSelector,
  }), {
  }),
)
export default container
