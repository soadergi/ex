import { useRouteContext } from './useRouteContext'
import { useNextJSHistory } from './useNextJSHistory'

export const useLocation = () => {
  const {
    // usual react router
    useLocation: useReactRouterLocation,
    // nextJS router
    router,
  } = useRouteContext()
  const nextJSHistory = useNextJSHistory()
  const isNext = Boolean(router)
  if (isNext) {
    return { ...nextJSHistory, pathname: router.asPath }
  }
  const reactRouterLocation = useReactRouterLocation() // eslint-disable-line
  return reactRouterLocation
}
