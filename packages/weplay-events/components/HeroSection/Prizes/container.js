import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import withPreloader from 'weplay-components/withPreloader'

import {
  specialPrizePoolSelector,
  prizePoolWithPlacesSelector,
} from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    topPlacesPrizePool: prizePoolWithPlacesSelector,
    specialPrizes: specialPrizePoolSelector,
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'specialPrizes',
    'topPlacesPrizePool',
  ], ({
    specialPrizes,
    topPlacesPrizePool,
  }) => ({
    topPlacesPrizePool: R.uniq(topPlacesPrizePool),
    specialPrizePool: R.toPairs(specialPrizes),
  })),
  withPreloader({
    mapPropsToIsLoading: R.pipe(
      R.path(['topPlacesPrizePool']),
      topPlacesPrizePool => R.isEmpty(topPlacesPrizePool),
    ),
    isFullScreen: false,
  }),
  withPropsOnChange([
    'topPlacesPrizePool',
  ], ({
    topPlacesPrizePool,
  }) => {
    if (R.isEmpty(topPlacesPrizePool)) {
      return {}
    }
    return {
      firstPlacePrize: topPlacesPrizePool[0],
      otherPlacesPrizes: topPlacesPrizePool.slice(1),
    }
  }),
)

export default container
