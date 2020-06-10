import { createSelector } from 'reselect'

import { getTournamentRelationshipsSelector } from 'weplay-events/reduxs/tournament/selectors'
import { gameModeSelectors } from 'weplay-events/reduxs/gameMode'

export const getGameModeByTournamentIdSelector = createSelector(
  [
    getTournamentRelationshipsSelector,
    gameModeSelectors.getRecordByIdSelector,
  ],
  (getTournamentRelationships, getGameModeByIdSelector) => tournamentId => tournamentId
  |> getTournamentRelationships
  |> (tournamentRelationships => tournamentRelationships?.gameMode?.id)
  |> getGameModeByIdSelector,
)
