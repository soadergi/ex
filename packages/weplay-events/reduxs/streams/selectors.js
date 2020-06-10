import { createSelector } from 'reselect'

import { getTournamentRelationshipsSelector } from 'weplay-events/reduxs/tournament/selectors'
import { tournamentStreamsSelectors } from 'weplay-events/reduxs/streams'

export const getEventStreamsSelector = createSelector(
  [
    getTournamentRelationshipsSelector,
    tournamentStreamsSelectors.getRecordByIdSelector,
  ],
  (getTournamentRelationships, getTournamentStreamByIdSelector) => tournamentId => tournamentId
  |> getTournamentRelationships
  |> (tournamentRelationships => tournamentRelationships?.streams?.id)
  |> getTournamentStreamByIdSelector,
)
