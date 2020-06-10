import { useRouteContext } from './useRouteContext'
import { useNextJSHistory } from './useNextJSHistory'

export const useHistory = () => {
  const {
    // usual react router
    useHistory: useReactRouterHistory,
    // nextJS router
    router,
  } = useRouteContext()
  const nextJSHistory = useNextJSHistory()
  const isNext = Boolean(router)
  if (isNext) {
    return nextJSHistory
  }
  const reactRouterHistory = useReactRouterHistory() // eslint-disable-line
  return reactRouterHistory
}
