import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import { REGIONS_MAP } from 'weplay-events/pages/TugOfWarPage/consts'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    isMobileWidth: isMobileWidthSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'i18nTexts',
    'winner',
  ], ({
    i18nTexts,
    winner,
  }) => {
    const Americas = winner.region === REGIONS_MAP.AMERICAS
      ? i18nTexts.region.americas
      : ''
    const Asia = winner.region === REGIONS_MAP.ASIA
      ? i18nTexts.region.asia
      : ''

    return ({
      labelSuffix: Americas || Asia,
    })
  }),
)

export default container
