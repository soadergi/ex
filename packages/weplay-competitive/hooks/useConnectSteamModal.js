import { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { isSteamConnectedSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

const useConnectSteamModal = () => {
  const [isShownConnectSteam, setIsShownConnectSteam] = useState(false)

  const isSteamConnected = useSelector(isSteamConnectedSelector)

  const toggleConnectSteamModal = useCallback(() => {
    setIsShownConnectSteam(!isShownConnectSteam)
  }, [setIsShownConnectSteam, isShownConnectSteam])

  return {
    isShownConnectSteam,
    toggleConnectSteamModal,
    isSteamConnected,
  }
}

export default useConnectSteamModal
