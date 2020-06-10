import { useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo } from 'react'

import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import useAction from 'weplay-core/helpers/useAction'
import { SUB_API_ACTIONS } from 'weplay-core/consts/subApiActions'

import { MMQueuesActions, MMQueuesSelectors } from 'weplay-competitive/reduxs/MMQueues'
import { MATCH_STATUSES } from 'weplay-competitive/constants/MM/matchStatuses'
import useMMCheckIn from 'weplay-competitive/hooks/MM/useMMCheckIn'
import useMMActiveMatch from 'weplay-competitive/hooks/MM/useMMActiveMatch'

const useMMQueue = () => {
  const { activeMMMatch } = useMMActiveMatch()
  const { isActiveMMCheckInModal } = useMMCheckIn(activeMMMatch)
  const getMMQueueById = useSelector(MMQueuesSelectors.getRecordByIdSelector)
  const currentUser = useSelector(currentUserSelector)
  const { deleteQueueRequest } = useAction({ deleteQueueRequest: MMQueuesActions.deleteRecord.request })
  const { clearQueueRequest } = useAction({ clearQueueRequest: MMQueuesActions.clearRecords })

  const MMQueue = useMemo(
    () => getMMQueueById(currentUser?.id),
    [getMMQueueById, currentUser],
  )

  const handleDeleteQueue = useCallback(() => {
    deleteQueueRequest({
      subApiAction: SUB_API_ACTIONS.REMOVE,
      game_mode: MMQueue.gameMode,
      region: MMQueue.region,
    })
      .then(clearQueueRequest)
  }, [deleteQueueRequest, clearQueueRequest, MMQueue])

  const isMMQueueActive = useMemo(
    () => getMMQueueById(currentUser?.id)?.isFetched
      && !isActiveMMCheckInModal,
    [getMMQueueById, currentUser, isActiveMMCheckInModal],
  )
  useEffect(
    () => {
      if (MMQueue?.isFetched && activeMMMatch?.status === MATCH_STATUSES.VOTING) {
        clearQueueRequest()
      }
    },
    [activeMMMatch, MMQueue, clearQueueRequest],
  )

  return { isMMQueueActive, handleDeleteQueue, MMQueue }
}

export default useMMQueue
