import React from 'react'

import { useRouteContext } from './useRouteContext'
import { useHistory } from './useHistory'
import { useLocation } from './useLocation'
import { useParams } from './useParams'

const withRouter = WrappedComponent => (props) => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const {
    // nextJS router
    router,
    getNextHref,
    prepareNextParams,
    ...contextProps
  } = useRouteContext()
  const isNext = Boolean(router)
  return (
    <WrappedComponent
      history={history}
      location={location}
      match={{ params }}
      {...props}
      isNext={isNext}
      currentUrl={isNext ? history.asPath : location.pathname}
      {...contextProps}
    />
  )
}

export default withRouter
