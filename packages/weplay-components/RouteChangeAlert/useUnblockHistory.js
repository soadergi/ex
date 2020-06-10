import { useCallback, useEffect, useState } from 'react'

import { useHistory } from 'weplay-singleton/RouterProvider/useHistory'

export const useUnblockHistory = ({ onBlock, isActive }) => {
  const [nextLocation, setNextLocation] = useState()
  const history = useHistory()
  const unblockHistory = useCallback(() => history.block(true), [history])

  useEffect(() => {
    if (isActive) {
      history.block((location) => {
        setNextLocation(location)
        onBlock()
        return false
      })
    } else {
      unblockHistory()
    }
  }, [isActive, history, onBlock, unblockHistory])

  return () => {
    unblockHistory()
    history.push(nextLocation.pathname)
  }
}
