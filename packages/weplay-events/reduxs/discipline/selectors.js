import { createSelector } from 'reselect'

import { getTournamentRelationshipsSelector } from 'weplay-events/reduxs/tournament/selectors'
import { disciplineSelectors } from 'weplay-events/reduxs/discipline'

export const getDisciplineByTournamentIdSelector = createSelector(
  [
    getTournamentRelationshipsSelector,
    disciplineSelectors.getRecordByIdSelector,
  ],
  (getTournamentRelationships, getDisciplineByIdSelectors) => tournamentId => tournamentId
  |> getTournamentRelationships
  |> (tournamentRelationships => tournamentRelationships?.discipline?.id)
  |> getDisciplineByIdSelectors,
)
