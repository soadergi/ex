import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { tournamentWinnerNameWithNickSelector, winnerSelector } from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    winner: winnerSelector,
    winnerName: tournamentWinnerNameWithNickSelector,
  }), {
    // actionCreators
  }),
)

export default container
