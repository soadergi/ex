import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { pathWithParamsByRoute, NAMES } from 'weplay-core/routes'

import { getDisciplineByTournamentIdSelector } from 'weplay-events/reduxs/discipline/selectors'
import { TOURNAMENT_DISCIPLINES } from 'weplay-events/pages/EventPage/constants'
import { tournamentSelectors } from 'weplay-events/reduxs/tournament'

export const useTournamentInfo = ({ tournamentId }) => {
  const getTournamentByIdSelector = useSelector(tournamentSelectors.getRecordByIdSelector)
  const getDisciplineByTournamentId = useSelector(getDisciplineByTournamentIdSelector)

  const tournament = useMemo(
    () => getTournamentByIdSelector(tournamentId),
    [tournamentId],
  )

  const { name } = useMemo(
    () => getDisciplineByTournamentId(tournament.id),
    [getDisciplineByTournamentId, tournament.id],
  )

  const tournamentSlug = tournament?.slug
  const tournamentDiscipline = TOURNAMENT_DISCIPLINES[name]

  const tournamentLinkUrl = useMemo(
    () => pathWithParamsByRoute(
      NAMES.EVENT_PAGE,
      {
        tournamentDiscipline,
        tournamentSlug,
      },
    ),
    [tournament],
  )

  return {
    tournament,
    tournamentLinkUrl,
  }
}
