import {
  useCallback, useEffect, useMemo, useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { $prop } from 'weplay-core/$utils/$prop'
import toaster, { TOAST_TYPE } from 'weplay-core/services/toastNotifications'

import useSortedByDateGridMatches from 'weplay-events/hooks/useSortedByDateGridMatches'
import { getStagesByTournamentIdSelector } from 'weplay-events/reduxs/stages/selectors'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'
import useConnectedTwitchAccountId from 'weplay-events/pages/EventPage/hooks/useConnectedTwitchAccountId'
import { MAX_ENTITIES_PER_REQUEST } from 'weplay-events/pages/EventPage/constants'
import { predictionActions } from 'weplay-events/reduxs/predictions'
import { gridItemsActions } from 'weplay-events/reduxs/gridItems'

function fetchPredictionsRecursively(request, dispatch, params) {
  dispatch(request(params)).then((response) => {
    const { total, limit, offset } = response.meta.pagination
    if (total > limit + offset) {
      fetchPredictionsRecursively(request, dispatch, { ...params, page__offset: limit + offset })
    }
  })
}

const POST_PREDICTION_PARAMS = {
  participant_type: 'TEAM',
  tournament_type: 'PES',
}

function usePredictionsMatchList(setIsModalOpened) {
  const t = useTranslation()
  const dispatch = useDispatch()
  const getStagesByTournamentId = useSelector(getStagesByTournamentIdSelector)
  const tournamentId = useCurrentTournamentId()
  const connectedTwitchAccountId = useConnectedTwitchAccountId()
  const [predictAfterAuthParams, setPredictAfterAuthParams] = useState(null)

  const tournamentStages = useMemo(() => getStagesByTournamentId(tournamentId), [tournamentId, getStagesByTournamentId])

  const gridIds = useMemo(() => tournamentStages
    .flatMap(stage => stage.relationships.grids)
    .map($prop('id')), [tournamentStages])

  const sortedByDateGridMatches = useSortedByDateGridMatches({ gridIds })

  const makePrediction = useCallback(({ matchId, participantId }) => {
    if (!connectedTwitchAccountId) {
      setPredictAfterAuthParams({ matchId, participantId })
      setIsModalOpened(true)
      return Promise.reject()
    }

    return dispatch(predictionActions.createRecord.request({
      ...POST_PREDICTION_PARAMS,
      match_id: Number(matchId),
      participant_id: participantId,
      tournament_id: tournamentId,
      twitch_user_id: connectedTwitchAccountId,
    })).catch((error) => {
      console.warn(error)
      toaster.showNotification({
        type: TOAST_TYPE.ERROR,
        content: t('events.guess-winners.unexpectedError'),
      })
    })
  }, [connectedTwitchAccountId, tournamentId, setIsModalOpened, dispatch])

  useEffect(() => {
    if (predictAfterAuthParams && connectedTwitchAccountId) {
      setIsModalOpened(false)

      makePrediction(predictAfterAuthParams).then(() => setPredictAfterAuthParams(null))
        .catch(() => {
          toaster.showNotification({
            type: TOAST_TYPE.ERROR,
            content: t('events.guess-winners.alreadyGuessed'),
          })
        })
    }
  }, [predictAfterAuthParams, connectedTwitchAccountId, makePrediction, setIsModalOpened, dispatch, tournamentId, t])

  useEffect(() => {
    if (!tournamentId || !connectedTwitchAccountId) {
      return
    }

    const params = {
      filter__tournament_id: tournamentId,
      filter__twitch_user_id: connectedTwitchAccountId,
      page__limit: MAX_ENTITIES_PER_REQUEST,
    }

    fetchPredictionsRecursively(predictionActions.queryRecords.request, dispatch, params)
  }, [tournamentId, connectedTwitchAccountId, dispatch])

  useEffect(() => {
    if (gridIds.length === 0) {
      return
    }

    dispatch(gridItemsActions.queryRecords.request({
      'filter[grid.id]': `in:${gridIds.join(',')}`,
      included: 'matches',
      'page[limit]': MAX_ENTITIES_PER_REQUEST,
    }))
  }, [dispatch, gridIds])

  return {
    sortedByDateGridMatches,
    makePrediction,
  }
}

export default usePredictionsMatchList
