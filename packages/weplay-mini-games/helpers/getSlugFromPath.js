import { PROJECT_PREFIXS } from 'weplay-core/routes'
import { matchPath } from 'weplay-core/routes/matchPath'

const MINI_GAME_MATCH_PATH = `/:lang?/${PROJECT_PREFIXS.MINI_GAMES_PROJECT_PREFIX}/:slug`

export const getSlugFromPath = (path) => {
  const { params: { slug } } = matchPath(path, MINI_GAME_MATCH_PATH)
  return slug
}
