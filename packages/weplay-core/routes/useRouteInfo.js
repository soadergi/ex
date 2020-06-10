import { useCallback, useMemo } from 'react'

import config from '../config'

import { getLanguageFromLocation } from './_helpers'
import { matchPath } from './matchPath'

export const useRouteInfo = ({
  history,
  ROUTES,
  getProjectPrefix,
  isNext,
}) => {
  const currentRoute = useCallback((page) => {
    const currentLanguage = getLanguageFromLocation(history.location)
    const pathArray = [
      currentLanguage === config.languages[0] ? '' : currentLanguage,
      getProjectPrefix(page.name),
      page.path,
    ]
    const path = `/${pathArray.filter(Boolean).join('/')}`
    return matchPath(isNext ? history.asPath : history.location.pathname, {
      path,
      exact: true,
    })
  }, [getProjectPrefix, history.location, history.asPath])

  const routeInfo = useMemo(() => {
    let route = Object.values(ROUTES).find(currentRoute)
    if (!route) {
      console.warn('no route')
      return {}
    }
    if (route.sections) {
      const { params } = currentRoute(route)
      route = {
        ...route,
        section: route.sections.find(routeSection => routeSection === params.section),
      }
    }
    return route
  }, [ROUTES, currentRoute])

  return { routeInfo }
}
