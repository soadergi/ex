import { createSelector } from 'reselect'

import { getTournamentRelationshipsSelector } from 'weplay-events/reduxs/tournament/selectors'
import { tournamentCompanySelectors } from 'weplay-events/reduxs/tournamentCompanies'

export const getEventPartnersSelector = createSelector(
  [
    getTournamentRelationshipsSelector,
    tournamentCompanySelectors.getRecordByIdSelector,
  ],
  (getTournamentRelationships, getTournamentCompanyByIdSelector) => tournamentId => tournamentId
  |> getTournamentRelationships
  |> (tournamentRelationships => tournamentRelationships?.tournamentCompanies?.map(
    company => getTournamentCompanyByIdSelector(company?.id)
  )),
)
