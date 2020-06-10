import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { PLAIN_PAGE_PATHS } from 'weplay-core/routes/plainPages'
import {
  allLangRegexp,
  defaultLanguage,
} from 'weplay-core/helpers/languages'

import PlainLayout from 'weplay-platform/App/Main/PlainLayout/PlainLayout'
import BaseLayout from 'weplay-platform/App/Main/BaseLayout/BaseLayout'

import useActiveTournament from 'weplay-events/hooks/useActiveTournament'

import PlainRoutes from './PlainRoutes/PlainRoutes'
import container from './container'
import RegularRoutes from './RegularRoutes/RegularRoutes'

const BrowserRoutes = ({
  location,
}) => {
  const {
    liveStreamUrl,
    tournament,
    tournamentLinkUrl,
  } = useActiveTournament()

  const renderPlainRoutes = useCallback(
    () => (
      <PlainLayout routesNode={<PlainRoutes />} />
    ),
    [],
  )
  const renderRegularRoutes = useCallback(
    () => (
      <BaseLayout
        routesNode={<RegularRoutes />}
        tournament={tournament}
        tournamentLinkUrl={tournamentLinkUrl}
        liveStreamUrl={liveStreamUrl}
      />
    ),
    [tournament, liveStreamUrl, tournamentLinkUrl],
  )

  return (
    <Switch>
      <Redirect
        from={`/${defaultLanguage}`}
        to={location.pathname.replace(`/${defaultLanguage}`, '')}
      />
      <Route
        path={PLAIN_PAGE_PATHS}
        render={renderPlainRoutes}
      />
      {/* TODO: fix this importnat that Plain should go first as Base has redirect inside */}
      <Route
        path={`/:language(${allLangRegexp})?`}
        render={renderRegularRoutes}
      />
    </Switch>
  )
}

BrowserRoutes.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

BrowserRoutes.defaultProps = {
  // optional props
}

export default container(BrowserRoutes)
