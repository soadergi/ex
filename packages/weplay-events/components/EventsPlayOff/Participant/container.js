import {
  compose,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as R from 'ramda'

import { betProviderSelector } from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    betProvider: betProviderSelector,
  }), {
  }),
  withProps(({
    coefficient,
    participant,
    isWinner,
    isThirdPlaceMatch,
    isParticipantFinal,
    isFullBracket,
    isGameFinished,
    isTwoParticipantsExists,
    isTournamentFinished,
    isTournamentModule,
    stage3playOff,
    hasBracketNote,
  }) => {
    const iconThirdPlace = isWinner ? 'bronzeCup' : 'emptyCup'
    const iconWinner = isWinner ? 'goldCup' : 'silverCup'
    const iconName = isThirdPlaceMatch ? iconThirdPlace : iconWinner

    return {
      winnerIconBlock: isParticipantFinal && !isFullBracket && isGameFinished,
      iconName: (stage3playOff && hasBracketNote) ? 'invite' : iconName,
      betProviderBlock: !R.isNil(participant.nickname)
        && isTwoParticipantsExists
        && !isTournamentFinished
        && !isGameFinished
        && !isTournamentModule,
      hasCoefficient: !R.isNil(coefficient),
    }
  }),
)

export default container
