import {
  compose,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'

import { betProviderSelector } from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    betProvider: betProviderSelector,
  }), {
    // actionCreators
  }),
  withAnalytics,
  withHandlers({
    logWinterMadnessSponsorAction: ({
      logAnalytics,
    }) => () => {
      logAnalytics({
        eventAction: 'Coefficients',
        categorySuffix: 'sponsor',
      })
    },
  }),
)

export default container
