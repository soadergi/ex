import { createSelector } from 'reselect'

import { MATCH_MEMBER_PARTICIPATION_TYPES } from 'weplay-competitive/constants/matchMemberParticipationTypes'
import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'
import { createParticipantActiveSelector } from 'weplay-competitive/reduxs/commonSelectors/matchMembers'
import { matchesSelectors } from 'weplay-competitive/reduxs/matches'

export const createIsMatchTechnicalEndedSelector = mapPropsToMatchId => createSelector(
  [
    createParticipantActiveSelector(mapPropsToMatchId, MATCH_MEMBER_PARTICIPATION_TYPES.HOME),
    createParticipantActiveSelector(mapPropsToMatchId, MATCH_MEMBER_PARTICIPATION_TYPES.AWAY),
    matchesSelectors.createRecordByIdSelector(mapPropsToMatchId),
  ],
  (
    isHomeParticipantActive,
    isAwayParticipantActive,
    match,
  ) => {
    if (match.status === MATCH_STATUSES.TECHNICAL_DEFEAT) return true
    if (match.status === MATCH_STATUSES.FINISHED) {
      return !(isHomeParticipantActive && isAwayParticipantActive)
    }
    return false
  },
)
