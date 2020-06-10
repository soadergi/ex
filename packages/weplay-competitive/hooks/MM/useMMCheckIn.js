import { useSelector } from 'react-redux'
import {
  useCallback, useEffect, useMemo,
} from 'react'

import { useHistory } from 'weplay-singleton/RouterProvider/useHistory'

import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import useAction from 'weplay-core/helpers/useAction'
import useMoment from 'weplay-core/hooks/useMoment'
import { usePrevious } from 'weplay-core/hooks/usePrevious'
import { goTo, NAMES } from 'weplay-core/routes'

import { MMQueuesActions } from 'weplay-competitive/reduxs/MMQueues'
import MMCheckInSocket from 'weplay-competitive/services/MMCheckInSocket'
import { MATCH_STATUSES } from 'weplay-competitive/constants/MM/matchStatuses'
import { useCountdown } from 'weplay-competitive/hooks/useCountdown'
import useMMMatchUsers from 'weplay-competitive/hooks/MM/useMMMatchUsers'

const useMMCheckIn = (activeMMMatch) => {
  const { moment } = useMoment()
  const history = useHistory()
  const {
    MMUsers,
    currentMMUser,
  } = useMMMatchUsers(activeMMMatch)

  const currentUser = useSelector(currentUserSelector)

  const endCheckInTime = activeMMMatch?.endCheckinTime ?? ''

  const { secondsTotal } = useCountdown(endCheckInTime)

  const isAllMMUsersCheckedIn = MMUsers.length > 0 && !MMUsers.some(user => !user.checkIn)
  const isActiveMMCheckInModal = useMemo(
    () => {
      if (moment) {
        return activeMMMatch?.status === MATCH_STATUSES.CHECK_IN
          && !isAllMMUsersCheckedIn
          && moment(endCheckInTime).diff(moment()) >= 0
          && secondsTotal > 0
      }
      return false
    },
    [activeMMMatch, isAllMMUsersCheckedIn, moment, endCheckInTime, secondsTotal],
  )
  const { clearQueueRequest } = useAction({ clearQueueRequest: MMQueuesActions.clearRecords })
  const handleCheckIn = useCallback(
    checkIn => MMCheckInSocket.sendUserCheckInEvent({
      userId: currentUser.id,
      MMMatchId: activeMMMatch.id,
      checkIn,
    }),
    [currentUser, activeMMMatch],
  )
  const handleAcceptCheckIn = useCallback(() => handleCheckIn(true), [handleCheckIn])
  const handleDeclineCheckIn = useCallback(() => {
    handleCheckIn(false)
    clearQueueRequest()
  }, [handleCheckIn, clearQueueRequest])

  const prevIsActiveMMCheckInModal = usePrevious(isActiveMMCheckInModal)

  useEffect(() => {
    if (prevIsActiveMMCheckInModal && isActiveMMCheckInModal !== prevIsActiveMMCheckInModal) {
      if (isAllMMUsersCheckedIn) {
        clearQueueRequest()
        goTo({
          name: NAMES.MM_MATCH,
          history,
          params: {
            // TODO: @Tetiana get discipline from Game or gameMode request (we have gameMode info)
            discipline: 'cs-go',
            matchId: activeMMMatch.id,
          },
        })
      } else if (currentMMUser.id && !currentMMUser.checkIn && activeMMMatch?.status !== MATCH_STATUSES.DECLINE) {
        clearQueueRequest()
      }
    }
  }, [
    prevIsActiveMMCheckInModal,
    isActiveMMCheckInModal,
    isAllMMUsersCheckedIn,
    activeMMMatch,
    clearQueueRequest,
    currentMMUser,
    history,
  ])

  return {
    isActiveMMCheckInModal,
    handleAcceptCheckIn,
    handleDeclineCheckIn,
  }
}

export default useMMCheckIn
