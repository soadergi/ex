import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import useAction from 'weplay-core/helpers/useAction'

import { miniGamesSelector, miniGamesActions } from 'weplay-mini-games/reduxs/miniGames'

export const useMiniGames = () => {
  const miniGames = useSelector(miniGamesSelector)
  const { getMiniGames } = useAction({ getMiniGames: miniGamesActions.queryRecords.request })

  useEffect(() => {
    if (!miniGames.length) {
      getMiniGames({
        filter__active__eq: true,
      })
    }
  }, [getMiniGames, miniGames.length])

  return {
    miniGames,
  }
}
