import { useMemo } from 'react'

import { pathWithParamsByRoute } from 'weplay-core/routes'
import { GAME_SECTION_PATHS } from 'weplay-core/routes/miniGames'

export const useMiniGamePaths = ({
  game,
  pageName,
}) => useMemo(() => {
  const ladders = game.ladders?.reduce((acc, ladderName) => ({
    ...acc,
    [`${ladderName.toLowerCase()}LadderPath`]: pathWithParamsByRoute(pageName,
      { section: GAME_SECTION_PATHS[`${ladderName}_LADDER`] }),
  }), {})
  const dateNow = new Date()
  const isPrizesActive = dateNow >= new Date(game.prizedFrom) && dateNow < new Date(game.prizedTo)

  return {
    gamePath: pathWithParamsByRoute(pageName, { section: GAME_SECTION_PATHS.GAME }),
    ...ladders,
    ...isPrizesActive && {
      prizesPath: pathWithParamsByRoute(pageName, { section: GAME_SECTION_PATHS.PRIZES }),
    },
  }
}, [pageName, game.ladders, game.prizedFrom, game.prizedTo])
