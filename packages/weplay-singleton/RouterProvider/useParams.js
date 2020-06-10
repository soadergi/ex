import { useRouteContext } from './useRouteContext'

export const useParams = () => {
  const {
    // usual react router
    useParams: useReactRouterParams,

    // nextJS router
    router,
    prepareNextParams,
  } = useRouteContext()
  const isNext = Boolean(router)
  if (isNext) {
    return prepareNextParams(router)
  }
  const reactRouterParams = useReactRouterParams() // eslint-disable-line
  return reactRouterParams
}
