import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SUB_API_ACTIONS } from 'weplay-core/consts/subApiActions'
import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { MMQueuesActions } from 'weplay-competitive/reduxs/MMQueues'

export const useCreateQueue = ({
  activeMode,
  activeLadder,
  activeServer,
  onCloseModal,
}) => {
  const currentUser = useSelector(currentUserSelector)
  const dispatch = useDispatch()

  return useCallback(
    () => dispatch(MMQueuesActions.createRecord.request({
      gameMode: activeMode.name,
      steamId: currentUser.steam_id,
      ladderId: activeLadder.id,
      region: activeServer.name,
      subApiAction: SUB_API_ACTIONS.ADD,
    }))
      .finally(onCloseModal),
    [activeMode, activeLadder, activeServer, currentUser, dispatch, onCloseModal],
  )
}
