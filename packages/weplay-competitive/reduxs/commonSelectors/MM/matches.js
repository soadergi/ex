import { createSelector } from 'reselect'

import { $prop } from 'weplay-core/$utils/$prop'

import { MMMatchesSelectors } from 'weplay-competitive/reduxs/MMMatches'

export const createMMMatchMembersSelector = matchId => createSelector(
  [
    MMMatchesSelectors.createRecordByIdSelector(matchId),
  ],
  match => ([
    ...match.teamLeft.map($prop('id')),
    ...match.teamRight.map($prop('id')),
  ]),
)
