import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { membersSelectors } from 'weplay-competitive/reduxs/members'
import { teamsSelectors } from 'weplay-competitive/reduxs/teams'
import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'
import { GAME_MODE_TYPES } from 'weplay-competitive/constants/gameModeTypes'
import { createTournamentGameModeSelector } from 'weplay-competitive/reduxs/commonSelectors/gameModes'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    getMemberById: membersSelectors.getRecordByIdSelector,
    getTeamById: teamsSelectors.getRecordByIdSelector,
    getTournamentMemberById: tournamentMembersSelectors.getRecordByIdSelector,
    gameMode: createTournamentGameModeSelector(R.prop('tournamentId')),
  }), {
    // actionCreators
  }),
  withPropsOnChange(
    [
      'tournamentMemberId',
      'gameMode',
      'getMemberById',
      'getTournamentMemberById',
      'getTeamById',
    ], ({
      tournamentMemberId,
      gameMode,
      getMemberById,
      getTournamentMemberById,
      getTeamById,
    }) => ({
      member: gameMode.gameModeType === GAME_MODE_TYPES.SINGLE
        ? R.pipe(
          getTournamentMemberById,
          R.pathOr('', ['relationships', 'member', 'id']),
          getMemberById,
        )(tournamentMemberId)
        : getTeamById(tournamentMemberId),
      gameMode,
    }),
  ),
)

export default container
