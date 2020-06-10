import {
  compose,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import { TEASER } from '../constants'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withHandlers({
    showSeason2TeaserModal: ({ showTeaserModal }) => () => showTeaserModal(TEASER.season_2.url),
  }),
)

export default container
