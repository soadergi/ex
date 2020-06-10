import * as R from 'ramda'
import {
  compose, withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'
import { teamsSelectors } from 'weplay-competitive/reduxs/teams'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    getTournamentMemberById: tournamentMembersSelectors.getRecordByIdSelector,
    getTeamById: teamsSelectors.getRecordByIdSelector,
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'homeTournamentMemberId',
    'awayTournamentMemberId',
    'getTournamentMemberById',
    'getTeamById',
  ], ({
    homeTournamentMemberId,
    awayTournamentMemberId,
    getTournamentMemberById,
    getTeamById,
  }) => {
    const getTeamNameByTournamentMemberId = R.pipe(
      getTournamentMemberById,
      R.path([
        'relationships',
        'team',
        'id',
      ]),
      getTeamById,
      R.propOr('', 'name'),
    )
    return ({
      homeTeamName: getTeamNameByTournamentMemberId(homeTournamentMemberId),
      awayTeamName: getTeamNameByTournamentMemberId(awayTournamentMemberId),
    })
  }),
)

export default container
