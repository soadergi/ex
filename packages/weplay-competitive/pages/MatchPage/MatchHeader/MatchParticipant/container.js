import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as R from 'ramda'

import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'
import { createParticipantInfoSelector } from 'weplay-competitive/reduxs/commonSelectors/members'
import { createTournamentGameModeSelector } from 'weplay-competitive/reduxs/commonSelectors/gameModes'

const mapPropsToTournamentId = R.prop('tournamentId')
const mapPropsToParticipantId = R.prop('tournamentMemberId')

const container = compose(
  withDiscipline,
  connect(createStructuredSelector({
    // selectors
    participant: createParticipantInfoSelector(mapPropsToTournamentId, mapPropsToParticipantId),
    gameMode: createTournamentGameModeSelector(mapPropsToTournamentId),
  }), {
    // actionCreators
  }),
)

export default container
