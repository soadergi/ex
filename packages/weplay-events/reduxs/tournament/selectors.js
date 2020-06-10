import { createSelector } from 'reselect'

import { tournamentSelectors } from 'weplay-events/reduxs/tournament'

export const getTournamentRelationshipsSelector = createSelector(
  [tournamentSelectors.getRecordByIdSelector],
  createTournamentByIdSelector => tournamentId => tournamentId
    |> createTournamentByIdSelector
    |> (tournament => tournament?.relationships),
)

export const getTournamentBySlugSelector = createSelector(
  [tournamentSelectors.allRecordsSelector],
  allTournaments => tournamentSlug => allTournaments.find(
    tournament => tournament.slug === tournamentSlug,
  ),
)
