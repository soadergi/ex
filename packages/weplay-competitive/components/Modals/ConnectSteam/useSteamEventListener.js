import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import useAction from 'weplay-core/helpers/useAction'
import { getUser } from 'weplay-core/reduxs/_legacy/auth/actions'

import { STEAM_MESSAGE_TYPES } from 'weplay-competitive/constants/steamMessageTypes'

const STEAM_MESSAGE_ERROR_CODE = 5018

export const useSteamEventListener = ({
  setSteamNickname,
  setSteamError,
  setIsConnectSteamBtnDisabled,
}) => {
  const dispatch = useDispatch()
  const globalScope = useSelector(globalScopeSelector)

  const { getUserData } = useAction({ getUserData: getUser })

  const steamEventListener = useCallback((event) => {
    const eventData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
    switch (eventData.type) {
      case STEAM_MESSAGE_TYPES.ADD_STEAM_SUCCESS:
        setSteamNickname(eventData.nickname)
        setSteamError('')
        dispatch(getUserData)
        break
      case STEAM_MESSAGE_TYPES.ADD_STEAM_ERROR:
        setIsConnectSteamBtnDisabled(false)
        if (eventData?.error?.response?.data?.error?.code === STEAM_MESSAGE_ERROR_CODE) {
          setSteamError('steamAlreadyExists')
        } else {
          setSteamError('steamConnectError')
        }
        break
      default:
        break
    }
  }, [setSteamError, setIsConnectSteamBtnDisabled, setSteamNickname, dispatch, getUserData])

  useEffect(() => {
    globalScope.addEventListener('message', steamEventListener)

    return () => {
      globalScope.removeEventListener('message', steamEventListener)
    }
  }, [globalScope, steamEventListener])
}
