import {
  compose,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withStateHandlers({
    videoUrl: '',
  }, {
    showTeaserModal: () => videoUrl => ({
      videoUrl,
    }),
    hideTeaserModal: () => () => ({
      videoUrl: '',
    }),
  }),
)

export default container
