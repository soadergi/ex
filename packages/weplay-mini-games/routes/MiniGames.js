import PropTypes from 'prop-types'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { NAMES, pathForRoute } from 'weplay-core/routes'

import BrowserDevRoute from 'weplay-components/BrowserDevRoute/BrowserDevRoute'

import Game2048Page from 'weplay-mini-games/pages/Game2048Page/loadable'
import GameLoonyDragonPage from 'weplay-mini-games/pages/GameLoonyDragonPage/loadable'
import GameMatchUpPage from 'weplay-mini-games/pages/GameMatchUpPage/loadable'

const MiniGames = ({
  match: { path },
}) => (
  <Switch>
    <Route
      path={`${path}/${pathForRoute(NAMES.GAME_2048)}`}
      component={Game2048Page}
    />
    <Route
      path={`${path}/${pathForRoute(NAMES.GAME_LOONY_DRAGON)}`}
      component={GameLoonyDragonPage}
    />
    <BrowserDevRoute
      path={`${path}/${pathForRoute(NAMES.GAME_MATCH_UP)}`}
      component={GameMatchUpPage}
    />
  </Switch>
)

MiniGames.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
}

export default MiniGames
