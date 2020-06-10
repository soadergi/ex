import { createSelector } from 'reselect'

import { getTournamentRelationshipsSelector } from 'weplay-events/reduxs/tournament/selectors'
import { tournamentResourcesSelectors } from 'weplay-events/reduxs/tournamentResources'

export const getEventMediaResourcesSelector = createSelector(
  [
    getTournamentRelationshipsSelector,
    tournamentResourcesSelectors.getRecordByIdSelector,
  ],
  (getTournamentRelationships, getTournamentResourcesByIdSelector) => tournamentId => tournamentId
  |> getTournamentRelationships
  |> (tournamentRelationships => tournamentRelationships?.mediaResources?.id)
  |> getTournamentResourcesByIdSelector,
)
