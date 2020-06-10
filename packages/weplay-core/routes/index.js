import * as R from 'ramda'

import { trimResidualSlash } from 'weplay-core/routes/_helpers'

import config from '../config'

import {
  ROUTES as ROUTES_TOURNAMENTS,
  NAMES as TOURNAMENT_NAMES,
  PROJECT_PREFIX as TOURNAMENT_PROJECT_PREFIX,
} from './competitive'
import {
  ROUTES as ROUTES_EVENTS,
  NAMES as EVENT_NAMES,
  PROJECT_PREFIX as EVENT_PROJECT_PREFIX,
} from './events'
import {
  ROUTES as ROUTES_MEDIA,
  NAMES as MEDIA_NAMES,
  PROJECT_PREFIX as MEDIA_PROJECT_PREFIX,
} from './media'
import {
  ROUTES as ROUTES_MINI_GAMES,
  NAMES as MINI_GAMES_NAMES,
  PROJECT_PREFIX as MINI_GAMES_PROJECT_PREFIX,
} from './miniGames'
import {
  ROUTES as ROUTES_CORE,
  NAMES as CORE_NAMES,
  PROJECT_PREFIX as CORE_PROJECT_PREFIX,
} from './core'

export const PROJECT_PREFIXS = {
  CORE_PROJECT_PREFIX,
  MEDIA_PROJECT_PREFIX,
  EVENT_PROJECT_PREFIX,
  TOURNAMENT_PROJECT_PREFIX,
  MINI_GAMES_PROJECT_PREFIX,
}
export const NAMES = {
  ...CORE_NAMES,
  ...MEDIA_NAMES,
  ...TOURNAMENT_NAMES,
  ...EVENT_NAMES,
  ...MINI_GAMES_NAMES,
}
const tournamentNames = R.values(TOURNAMENT_NAMES)
const eventNames = R.values(EVENT_NAMES)
const miniGamesNames = R.values(MINI_GAMES_NAMES)

const getProjectRoutes = (project, routes) => R.map(
  R.assoc('project', project),
  routes,
)

export const ROUTES = [
  ...getProjectRoutes(CORE_PROJECT_PREFIX, ROUTES_CORE),
  ...getProjectRoutes(MEDIA_PROJECT_PREFIX, ROUTES_MEDIA),
  ...getProjectRoutes(EVENT_PROJECT_PREFIX, ROUTES_EVENTS),
  ...getProjectRoutes(TOURNAMENT_PROJECT_PREFIX, ROUTES_TOURNAMENTS),
  ...getProjectRoutes(MINI_GAMES_PROJECT_PREFIX, ROUTES_MINI_GAMES),
]

export const findRouteByName = name => ROUTES.find(route => route.name === name)
export const pathForRoute = name => findRouteByName(name).path
export const getProjectPrefix = (name) => {
  if (tournamentNames.includes(name)) {
    return `${TOURNAMENT_PROJECT_PREFIX}`
  }
  if (eventNames.includes(name)) {
    return `${EVENT_PROJECT_PREFIX}`
  }
  if (miniGamesNames.includes(name)) {
    return `${MINI_GAMES_PROJECT_PREFIX}`
  }
  return ''
}
export const pathWithParamsByRoute = (name, params) => {
  const projectPrefix = getProjectPrefix(name)
  const path = pathForRoute(name)
  return R.pipe(
    R.defaultTo({}),
    R.toPairs,
    R.reduce(
      (pathWithPartialParams, [paramKey, paramValue]) => {
        const substring = paramKey === '$placeholder' ? '*' : new RegExp(`:${paramKey}[?]?`)
        return pathWithPartialParams.replace(substring, paramValue)
      },
      path,
    ),
    R.replace(/\/:(\w)+\?/g, ''), // for optional params - we don't need it if we don't pass it
    pathWithAllParams => (projectPrefix
      ? `/${projectPrefix}/${pathWithAllParams}`
      : `/${pathWithAllParams}`),
    trimResidualSlash,
  )(params)
}

// TODO: maybe we need to wrap it to HOC so user don't have to
// pass history directly
export const goTo = ({
  name,
  history,
  params,
  method = 'push',
  search,
}) => {
  const possbilyLanguagePrefix = history.location.pathname.split('/')[1]
  const pathWithParams = pathWithParamsByRoute(name, params)
  const langPrefix = config.languages.slice(1).includes(possbilyLanguagePrefix)
    ? `/${possbilyLanguagePrefix}`
    : ''
  history[method](`${langPrefix}${pathWithParams}${search || ''}`)
}
