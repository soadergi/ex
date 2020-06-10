export const NAMES = {
  MINI_GAMES: 'miniGames',
  GAME_2048: 'unlockTheHero',
  GAME_LOONY_DRAGON: 'loonyDragon',
  GAME_MATCH_UP: 'matchUp',
}

const PATHS = {
  [NAMES.GAME_2048]: '2048/:section?',
  [NAMES.GAME_LOONY_DRAGON]: 'loony-dragon/:section?',
  [NAMES.GAME_MATCH_UP]: 'match-up/:section?',
}

export const GAME_SECTION_PATHS = {
  GAME: '',
  DAILY_LADDER: 'daily-ladder',
  GLOBAL_LADDER: 'global-ladder',
  PRIZES: 'prizes',
}
const sections = Object.values(GAME_SECTION_PATHS)

export const PROJECT_PREFIX = 'mini-games'
export const ROUTES = [
  {
    name: NAMES.MINI_GAMES,
    path: '',
  },
  {
    name: NAMES.GAME_2048,
    path: PATHS[NAMES.GAME_2048],
    sections,
  },
  {
    name: NAMES.GAME_LOONY_DRAGON,
    path: PATHS[NAMES.GAME_LOONY_DRAGON],
    sections,
  },
  {
    name: NAMES.GAME_MATCH_UP,
    path: PATHS[NAMES.GAME_MATCH_UP],
    sections,
    isDevOnly: true,
  },
]

export const PLAIN_PAGE_PATHS = Object.values(PATHS).map(path => `${PROJECT_PREFIX}/${path}`)
