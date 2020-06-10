import { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useHistory } from 'weplay-singleton/RouterProvider/useHistory'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { NAMES, pathForRoute } from 'weplay-core/routes'
import { getSubscriptionScopes } from 'weplay-core/reduxs/subscriptions/actions'

import fetchEntitiesRecursively from 'weplay-events/helpers/fetchEntitiesRecursively'
import { tournamentActions, tournamentSelectors } from 'weplay-events/reduxs/tournament'
import { getDisciplineByTournamentIdSelector } from 'weplay-events/reduxs/discipline/selectors'
import {
  MAX_ENTITIES_PER_REQUEST,
  TOURNAMENT_DISCIPLINES,
  TOURNAMENT_STATUSES,
} from 'weplay-events/pages/EventPage/constants'
import { participantsActions } from 'weplay-events/reduxs/participants'
import { tournamentPlayerActions } from 'weplay-events/reduxs/tournamentPlayer'
import { tournamentTeamActions } from 'weplay-events/reduxs/tournamentTeam'
import { stageActions } from 'weplay-events/reduxs/stages'
import { getParimatchBets } from 'weplay-events/reduxs/bets/actions'

const SUBSCRIPTIONS_LIMIT = 200
const includedEntitiesForTournament = [
  'prizes',
  'seo_snippet',
  'media_tag',
  'game_mode',
  'media_resources',
  'tournament_companies',
  'streams',
  'discipline',
]

// TODO @Anton Think how to group and make readable all requests here or share them between block and sections
// https://weplayspace.atlassian.net/browse/WE-1579
export default function useEventPage({ tournamentSlug, tournamentDiscipline }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { locale } = useLocale()
  const [tournamentId, setTournamentId] = useState('')
  const getDisciplineByTournamentId = useSelector(getDisciplineByTournamentIdSelector)
  const getTournamentByIdSelector = useSelector(tournamentSelectors.getRecordByIdSelector)

  const discipline = useMemo(() => getDisciplineByTournamentId(tournamentId),
    [tournamentId, getDisciplineByTournamentId])
  const tournament = useMemo(() => getTournamentByIdSelector(tournamentId), [tournamentId, getTournamentByIdSelector])

  // FETCH TOURNAMENT
  useEffect(() => {
    dispatch(tournamentActions.queryRecords.request({
      included: includedEntitiesForTournament.join(','),
      'filter[slug]': tournamentSlug,
    })).then(resp => (resp?.data?.['0']?.id) |> setTournamentId)
  }, [dispatch, tournamentSlug, locale])

  // FETCH SUBSCRIPTIONS
  useEffect(() => {
    dispatch(getSubscriptionScopes.request({
      params: {
        limit: SUBSCRIPTIONS_LIMIT,
      },
    })).catch(error => console.warn(error))
  }, [dispatch])

  // FETCH PARTICIPANTS, TEAMS AND PLAYERS
  useEffect(() => {
    if (!tournamentId) {
      return
    }

    const params = {
      'filter[tournament.id]': tournamentId,
      'page[limit]': MAX_ENTITIES_PER_REQUEST,
    }

    fetchEntitiesRecursively(participantsActions.queryRecords.request, dispatch, params)
    fetchEntitiesRecursively(tournamentPlayerActions.queryRecords.request, dispatch, params)
    fetchEntitiesRecursively(tournamentTeamActions.queryRecords.request, dispatch, params)
  }, [dispatch, tournamentId])

  // FETCH STAGES
  useEffect(() => {
    if (tournament.status === TOURNAMENT_STATUSES.ONGOING || tournament.status === TOURNAMENT_STATUSES.ENDED) {
      fetchEntitiesRecursively(stageActions.queryRecords.request, dispatch, {
        'filter[tournament.id]': tournamentId,
        included: 'grids',
      })
    }
  }, [dispatch, tournamentId, tournament.status])

  // FETCH BETS
  useEffect(() => {
    if (tournament.status === TOURNAMENT_STATUSES.ONGOING) {
      dispatch(getParimatchBets.request())
    }
  }, [tournament.status, dispatch])

  // IF DISCIPLINE IN URL IS INCORRECT DISPLAY 404 PAGE
  useEffect(() => {
    if (tournamentSlug === tournament.slug
      && discipline.isFetched
      && (TOURNAMENT_DISCIPLINES[discipline.name] !== tournamentDiscipline)) {
      history.replace(`/${pathForRoute(NAMES.NOT_FOUND)}`)
    }
  }, [tournamentSlug, tournament.slug, discipline, tournamentDiscipline, history])

  return {
    tournamentId,
    status: tournament.status,
  }
}
