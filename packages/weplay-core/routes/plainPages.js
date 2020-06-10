import { $hasData } from 'weplay-core/$utils/$hasData'
import { allLangRegexp } from 'weplay-core/helpers/languages'

import { matchPath } from './matchPath'
import { PLAIN_PAGE_PATHS as MINI_GAMES_PLAIN_PAGE_PATHS } from './miniGames'

const PATHS = [
  ...MINI_GAMES_PLAIN_PAGE_PATHS,
  'crystal-ball',
  'tickets',
  'oauth-callback',
]

export const PLAIN_PAGE_PATHS = PATHS.map(path => `/:language(${allLangRegexp})?/${path}`)
export const isPlainPage = pathname => PLAIN_PAGE_PATHS.reduce(
  (isMatch, path) => isMatch || $hasData(matchPath(pathname, {
    path,
    exact: true,
  })),
  false,
)
