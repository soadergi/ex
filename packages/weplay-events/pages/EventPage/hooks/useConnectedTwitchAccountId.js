import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { userSocialInfoSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

function useConnectedTwitchAccountId() {
  const userSocialInfo = useSelector(userSocialInfoSelector)

  const connectedTwitchAccountId = useMemo(
    () => userSocialInfo.find(userSocialAccount => userSocialAccount.type === 'TWITCH')?.id,
    [userSocialInfo],
  )

  return Number(connectedTwitchAccountId)
}

export default useConnectedTwitchAccountId
