import {
  compose, withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { currentLanguageSelector, i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import withMoment from 'weplay-core/HOCs/withMoment'

const container = compose(
  withMoment,
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
  }), {
    // actionCreators
  }),

  withProps({
    categoryText: '', // TODO: @Andrew, temporary removed while all categories will be implemented
  }),
)

export default container
