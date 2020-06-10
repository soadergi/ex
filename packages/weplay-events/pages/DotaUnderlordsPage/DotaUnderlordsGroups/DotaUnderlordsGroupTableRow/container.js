import * as R from 'ramda'
import {
  compose, withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getTournamentParticipantByIdSelector } from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    getTournamentParticipantById: getTournamentParticipantByIdSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'participant',
    'getTournamentParticipantById',
    'isFinalGroupTabActive',
    'isWinner',
  ], ({
    participant,
    getTournamentParticipantById,
    isFinalGroupTabActive,
    isWinner,
  }) => {
    const keys = R.keys(R.prop('score')(participant))
    const participantScore = R.map(key => ({
      label: key,
      value: R.path(['score', key], participant),
    }), keys)

    const participantInfo = getTournamentParticipantById(participant.uuid)

    return {
      participantScore,
      participantInfo,
      isWinnerIconVisible: R.and(isWinner, R.not(isFinalGroupTabActive)),
    }
  }),
)

export default container
