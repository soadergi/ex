import {
  compose, withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import esBetImg from './img/ESBET.png'
import lootBetImg from './img/lootBet.svg'
import onexBetImg from './img/onexBet.svg'
import pmImg from './img/parimatch.png'

const betProviderImagesMap = {
  esBet: esBetImg,
  lootBet: lootBetImg,
  onexBet: onexBetImg,
  pariMatch: pmImg,
}

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'betProvider',
  ], ({
    betProvider,
  }) => ({
    betProviderImg: betProviderImagesMap[betProvider],
  })),
)

export default container
