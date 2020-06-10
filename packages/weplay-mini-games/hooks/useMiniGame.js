import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { $isEmpty } from 'weplay-core/$utils/$isEmpty'

import {
  miniGameBySlugSelector,
  miniGamesActions,
  miniGamesSelectors,
} from 'weplay-mini-games/reduxs/miniGames'
import { getSlugFromPath } from 'weplay-mini-games/helpers/getSlugFromPath'

export const useMiniGame = (pathname) => {
  const dispatch = useDispatch()
  const slug = getSlugFromPath(pathname)
  const miniGameBySlugSelectorMemoized = useMemo(() => miniGameBySlugSelector(slug), [slug])
  const game = useSelector(miniGameBySlugSelectorMemoized)
  const isGameLoading = useSelector(miniGamesSelectors.queryRecordsSelectors.loadingSelector)

  useEffect(() => {
    if ($isEmpty(game) && !isGameLoading) {
      dispatch(miniGamesActions.queryRecords.request({ filter__link__eq: slug }))
    }
  }, [dispatch, slug, game, isGameLoading])

  return game
}
