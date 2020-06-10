import * as R from 'ramda'
import { createSelector } from 'reselect'

import { tournamentMembersSelectors } from '../tournamentMembers'

import { matchMembersSelectors } from './index'

export const createMatchMemberByTournamentMemberIdSelector = mapPropsToTournamentId => createSelector(
  [
    matchMembersSelectors.allRecordsSelector,
    tournamentMembersSelectors.createRecordByIdSelector(mapPropsToTournamentId),
  ],
  (matchMembers, tournamentMember) => R.filter(
    R.pathEq(
      ['relationships', 'tournament', 'id'],
      R.prop('id', tournamentMember),
    ),
  )(matchMembers),
)
