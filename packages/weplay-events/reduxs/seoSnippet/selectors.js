import { createSelector } from 'reselect'

import { getTournamentRelationshipsSelector } from 'weplay-events/reduxs/tournament/selectors'
import { seoSnippetsSelectors } from 'weplay-events/reduxs/seoSnippet'

export const getSeoSnippetByTournamentIdSelector = createSelector(
  [
    getTournamentRelationshipsSelector,
    seoSnippetsSelectors.getRecordByIdSelector,
  ],
  (getTournamentRelationships, getSeoSnippetsByIdSelector) => tournamentId => tournamentId
  |> getTournamentRelationships
  |> (tournamentRelationships => tournamentRelationships?.seoSnippet?.id)
  |> getSeoSnippetsByIdSelector,
)
