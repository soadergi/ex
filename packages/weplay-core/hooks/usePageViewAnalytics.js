import { useEffect } from 'react'

import { useRoutes } from 'weplay-singleton/RoutesProvider/useRoutes'

import { useRouteInfo } from 'weplay-core/routes/useRouteInfo'
import webAnalytics from 'weplay-core/services/webAnalytics'
import { capitalizeFirstLetter } from 'weplay-core/helpers/capitalizeFirstLetter'

export const usePageViewAnalytics = (history) => {
  const routesProps = useRoutes()
  const { routeInfo } = useRouteInfo({ history, ...routesProps })

  useEffect(() => {
    webAnalytics.sendPageView({
      pageType: `${capitalizeFirstLetter(routeInfo.name)}Page`,
    })
  }, [routeInfo.name])
}
