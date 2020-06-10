import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

import { allLangRegexp } from 'weplay-core/helpers/languages'
import { NAMES, pathForRoute, PROJECT_PREFIXS } from 'weplay-core/routes'

import MiniGames from 'weplay-mini-games/routes/loadable'

import CrystalBallPage from '../../pages/plainPages/CrystalBallPage/loadable'
import TicketsManagementPage from '../../pages/plainPages/TicketsManagementPage/loadable'
import OAuthMobileVerify from '../../pages/plainPages/OAuthMobileVerify/OAuthMobileVerify'

const PlainRoutes = () => (
  <Switch>
    <Route
      path={`/:language(${allLangRegexp})?/${PROJECT_PREFIXS.MINI_GAMES_PROJECT_PREFIX}`}
      component={MiniGames}
    />
    <Route
      path={`/${pathForRoute(NAMES.OAUTH_MOBILE_VERIFY)}`}
      component={OAuthMobileVerify}
    />
    <Route
      path={`/:language(${allLangRegexp})?/${pathForRoute(NAMES.CRYSTAL_BALL)}`}
      component={CrystalBallPage}
    />
    <Route
      path={`/:language(${allLangRegexp})?/${pathForRoute(NAMES.TICKETS_MANAGEMENT)}`}
      component={TicketsManagementPage}
    />
  </Switch>
)
export default PlainRoutes
