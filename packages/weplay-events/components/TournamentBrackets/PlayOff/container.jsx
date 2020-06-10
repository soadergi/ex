import { compose, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  roundsSelector,
} from 'weplay-events/reduxs/tournaments/reducer'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    rounds: roundsSelector,
  }), {
  }),
  withPropsOnChange([
    'rounds',
  ], ({
    rounds,
  }) => ({
    hasExtraRound: rounds[0].gamePairs.length === rounds[1].gamePairs.length,
  })),
)

export default container
