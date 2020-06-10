import { useRouteContext } from './useRouteContext'

export const useNextJSHistory = () => {
  const {
    // nextJS router
    router,
    getNextHref,
  } = useRouteContext()
  const nextJSHistory = {
    ...router,
    push: (location) => {
      if (typeof location === 'object') {
        console.warn('Objects are not supported yet')
        return
      }
      const href = getNextHref(location)
      router.push(href, location)
    },
    replace: (location) => {
      if (typeof location === 'object') {
        console.warn('Objects are not supported yet')
        return
      }
      const href = getNextHref(location)
      router.replace(href, location)
    },
    listen: (listener) => {
      router.events.on('routeChangeStart', newUrl => listener({
        pathname: newUrl,
      }))
    },
  }
  if (router?.asPath) {
    nextJSHistory.location = { ...nextJSHistory, pathname: router.asPath }
    const search = router.asPath.split('?')[1]
    nextJSHistory.location.search = search
      ? `?${search}`
      : ''
  }
  nextJSHistory.go = nextJSHistory.push
  return nextJSHistory
}
