import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

import { getEnvironment, ENV_NAMES } from 'weplay-singleton/helpers/getEnvironment'

import { NAMES, pathForRoute } from 'weplay-core/routes'

// TODO: replace all routes with custom wrapper around route
const BrowserDevRoute = ({ config, ...props }) => {
  const isDevEnvironment = useMemo(
    () => [ENV_NAMES.LOCALHOST, ENV_NAMES.DEV].includes(getEnvironment(window.location.origin)),
    [origin],
  )

  return isDevEnvironment
    ? <Route {...props} />
    : <Redirect to={`/${pathForRoute(NAMES.NOT_FOUND)}`} />
}
BrowserDevRoute.propTypes = {
  config: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
}
BrowserDevRoute.defaultProps = {
  config: {},
}
export default React.memo(BrowserDevRoute)
