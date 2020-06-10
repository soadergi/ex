import { createSelector } from 'reselect'

import { getTournamentRelationshipsSelector } from 'weplay-events/reduxs/tournament/selectors'
import { mediaTagSelectors } from 'weplay-events/reduxs/mediaTag'

export const getMediaTagIdSelector = createSelector(
  [
    getTournamentRelationshipsSelector,
    mediaTagSelectors.getRecordByIdSelector,
  ],
  (getTournamentRelationships, getMediaTagByIdSelector) => tournamentId => tournamentId
  |> getTournamentRelationships
  |> (tournamentRelationships => tournamentRelationships?.mediaTag?.id)
  |> getMediaTagByIdSelector,
)
