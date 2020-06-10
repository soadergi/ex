import {
  compose,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector, currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'

import { betProviderSelector } from 'weplay-events/reduxs/tournaments/reducer'
import { betProviders } from 'weplay-events/constants/betProvidersData'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    betProvider: betProviderSelector,
    currentLanguage: currentLanguageSelector,
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withAnalytics,
  withHandlers({
    logWinterMadnessSponsorAction: ({
      betProvider,
      logAnalytics,
    }) => () => {
      logAnalytics({
        eventAction: `Coefficients ${betProvider} logo`,
        categorySuffix: 'sponsor',
      })
    },
  }),

  withPropsOnChange([
    'currentLanguage',
    'betProvider',
  ], ({
    currentLanguage,
    betProvider,
  }) => ({
    logoUrl: betProvider && betProviders[betProvider].logos[currentLanguage],
    gameUrl: betProvider && betProviders[betProvider].url[currentLanguage],
  })),
)

export default container
