import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import {
  Switch,
  Redirect,
  Route,
} from 'react-router-dom'
import { useSelector } from 'react-redux'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { allLangRegexp } from 'weplay-core/helpers/languages'
import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import {
  NAMES,
  PROJECT_PREFIXS,
  pathForRoute,
} from 'weplay-core/routes'
import { ROUTES as MEDIA_ROUTES } from 'weplay-core/routes/media'

import TournamentsPackage from 'weplay-competitive/pages/loadable'

import EventsProject from 'weplay-events/pages/loadable'

import MediaPackage from 'weplay-media/pages/loadable'

import MiniGamesPage from 'weplay-mini-games/pages/MiniGamesPage/loadable'

import DonateCharityPlayPage from '../../pages/DonateCharityPlayPage'
import AuthVerifyCodePage from '../../pages/AuthVerifyCodePage/loadable'
import CandidatePage from '../../pages/CandidatePage/loadable'
import CodePage from '../../pages/CodePage/loadable'
import NotFoundPage from '../../pages/NotFoundPage/loadable'
import NotificationsSettingsPage from '../../pages/NotificationsSettingsPage/loadable'
import ProfilePage from '../../pages/ProfilePage/loadable'
import RootPage from '../../pages/RootPage/loadable'
import ServicePage from '../../pages/ServicePage/loadable'
import VerifyPage from '../../pages/VerifyPage/loadable'
import VotingMVP from '../../pages/VotingMVP/loadable'
import VotingPage from '../../pages/VotingPage/loadable'
import PrivateRoute from '../../pages/_helpers/PrivateRoute'
import EmptyPage from '../../pages/_helpers/EmptyPage'

export const isVerifyPage = locationPathname => ['verify-pass', 'verify-email']
  .some(routeSubstring => locationPathname.includes(routeSubstring))

const mediaRoutes = MEDIA_ROUTES.map(R.prop('path'))
const RegularRoutes = ({
  location: { pathname },
}) => {
  const currentUser = useSelector(currentUserSelector)
  return (
    <Switch>
      <Route
        exact
        path={`/:lang2(${allLangRegexp})?`}
        component={RootPage}
      />
      <Route
        path={`/:lang2(${allLangRegexp})?/${PROJECT_PREFIXS.EVENT_PROJECT_PREFIX}`}
        component={EventsProject}
      />
      <Route
        path={`/:lang2(${allLangRegexp})?/${PROJECT_PREFIXS.TOURNAMENT_PROJECT_PREFIX}`}
        component={TournamentsPackage}
      />
      <Route
        path={mediaRoutes.map(route => `/:language(${allLangRegexp})?/${route}`)}
        component={MediaPackage}
      />
      <Route
        exact
        path={`/:lang2(${allLangRegexp})?/${PROJECT_PREFIXS.MINI_GAMES_PROJECT_PREFIX}`}
        component={MiniGamesPage}
      />
      <Route
        exact
        path="/empty-page"
        component={EmptyPage}
      />
      <PrivateRoute
        exact
        path={`/:lang2(${allLangRegexp})?/${pathForRoute(NAMES.PROFILE)}`}
        currentUser={currentUser}
        component={ProfilePage}
      />
      <Route
        exact
        path={`/:lang2(${allLangRegexp})?/${pathForRoute(NAMES.CODES)}`}
        component={CodePage}
      />

      <Route
        exact
        path={`/:lang2(${allLangRegexp})?/${pathForRoute(NAMES.VOTING_MWP)}`}
        component={VotingMVP}
      />

      <Route
        exact
        path={`/:lang2(${allLangRegexp})?/${pathForRoute(NAMES.VOTING)}`}
        component={VotingPage}
      />
      <Route
        exact
        path={`/:lang2(${allLangRegexp})?/${pathForRoute(NAMES.CANDIDATE)}`}
        component={CandidatePage}
      />

      <Route
        path={`/:lang2(${allLangRegexp})?/${pathForRoute(NAMES.AUTH_VERIFY_CODE)}`}
        component={AuthVerifyCodePage}
      />

      <Route
        path={`/:lang2(${allLangRegexp})?/${pathForRoute(NAMES.NOT_FOUND)}`}
        component={NotFoundPage}
      />
      <Route
        path={`/:lang2(${allLangRegexp})?/${pathForRoute(NAMES.NOTIFICATIONS_SETTINGS)}`}
        component={NotificationsSettingsPage}
      />
      <Route
        exact
        path={`/:lang2(${allLangRegexp})?/${pathForRoute(NAMES.DONATE_CHARITY_PLAY)}`}
        component={DonateCharityPlayPage}
      />
      <Route
        exact
        path={`/:lang2(${allLangRegexp})?/${pathForRoute(NAMES.DONATE_CHARITY_SUCCESS)}`}
        component={DonateCharityPlayPage}
      />
      {/* TODO: Fix isVerifyPage(globalScope) rendering */}
      {isVerifyPage(pathname) && (
        <Route
          path={pathname}
          component={VerifyPage}
        />
      )}
      <Route
        exact
        path={`/:lang2(${allLangRegexp})?/${pathForRoute(NAMES.SERVICE_PAGE)}`}
        component={ServicePage}
      />

      <Redirect to={`/:language(${allLangRegexp})?/${pathForRoute(NAMES.NOT_FOUND)}`} />
    </Switch>
  )
}

RegularRoutes.propTypes = {
  // required
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  // from container
  // optional
}

RegularRoutes.defaultProps = {
  // optional
  // from container
}

export default withRouter(React.memo(RegularRoutes))
