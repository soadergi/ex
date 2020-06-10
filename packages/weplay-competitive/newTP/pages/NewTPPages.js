import React from 'react'
import PropTypes from 'prop-types'
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

import { NAMES, pathForRoute } from 'weplay-core/routes'

import TournamentsListPage from './TournamentsListPage/loadable'
import TournamentPage from './TournamentPage/loadable'

const NewTPPages = ({
  match: { path },
}) => (
  <Switch>
    <Route
      exact
      path={`${path}/${pathForRoute(NAMES.NEW_TP__TOURNAMENTS_LIST)}`}
      component={TournamentsListPage}
    />
    <Route
      exact
      path={`${path}/${pathForRoute(NAMES.NEW_TP__TOURNAMENT)}`}
      component={TournamentPage}
    />
    <Redirect to={`/${pathForRoute(NAMES.NOT_FOUND)}`} />
  </Switch>
)
NewTPPages.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
}

export default React.memo(NewTPPages)
