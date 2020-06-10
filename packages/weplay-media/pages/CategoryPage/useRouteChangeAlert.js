import { useState } from 'react'

export const useRouteChangeAlert = (isAlertActive) => {
  const [isRouteChangeAccepted, setIsRouteChangeAccepted] = useState(false)

  const isRouteChangeAlert = isAlertActive && !isRouteChangeAccepted
  const acceptRouteChange = () => setIsRouteChangeAccepted(true)

  return {
    acceptRouteChange,
    isRouteChangeAlert,
  }
}
