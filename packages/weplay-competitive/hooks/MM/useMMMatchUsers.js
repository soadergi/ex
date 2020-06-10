import { useSelector } from 'react-redux'
import { useMemo } from 'react'

import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

const useMMMatchUsers = (MMMatch) => {
  const currentUser = useSelector(currentUserSelector)

  const MMUsers = useMemo(
    () => MMMatch?.teamLeft.concat(MMMatch?.teamRight) ?? [],
    [MMMatch],
  )
  const currentMMUser = useMemo(
    () => MMUsers?.find(user => user.id === currentUser?.id) ?? {},
    [MMUsers, currentUser],
  )

  const opponentsMMUsers = useMemo(
    () => MMUsers?.filter(user => user.id !== currentUser?.id) ?? [],
    [MMUsers, currentUser],
  )
  // TODO: @Tetiana rewrite logic for opponentsMMUsers and add teammatesMMUsers
  return {
    MMUsers,
    currentMMUser,
    opponentsMMUsers,
  }
}

export default useMMMatchUsers
