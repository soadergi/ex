import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import { participantKeySelector } from 'weplay-events/reduxs/tournaments/reducer'
import { amountOfGroupWinnersSelector } from 'weplay-events/reduxs/selectors/groupWinners'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    isMobileWidth: isMobileWidthSelector,
    participantKey: participantKeySelector,
    groupWinners: amountOfGroupWinnersSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'groupWinners',
    'groupWinnersNumber',
  ], ({
    groupWinners,
    groupWinnersNumber,
  }) => ({
    amountOfWinners: groupWinnersNumber || groupWinners,
  })),
)

export default container
