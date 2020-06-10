import { compose, withHandlers } from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

import {
  GA__TEAM_NAME_LIST_CLICK,
  GA__PLAYER_NAME_LIST_CLICK,
  GA__PLAYER_PROFILE_LIST_CLICK,
  GA__TEAM_PROFILE_LIST_CLICK,
} from 'weplay-competitive/analytics'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'
import { createTournamentGameModeSelector } from 'weplay-competitive/reduxs/commonSelectors/gameModes'
import { GAME_MODE_TYPES } from 'weplay-competitive/constants/gameModeTypes'

const mapPropsToTournamentId = R.path([
  'match', 'params', 'tournamentId',
])

const container = compose(
  withAnalytics,
  withDiscipline,
  connect(createStructuredSelector({
    // selectors
    gameMode: createTournamentGameModeSelector(mapPropsToTournamentId),
  }), {
    // actionCreators
  }),
  withHandlers({
    handleClickAvatarOrName: ({
      logAnalytics,
      gameMode,
    }) => () => {
      logAnalytics(
        gameMode.gameModeType === GAME_MODE_TYPES.SINGLE
          ? GA__PLAYER_NAME_LIST_CLICK
          : GA__TEAM_NAME_LIST_CLICK,
      )
    },
  }),
  withHandlers({
    handleClickProfileLink: ({
      logAnalytics,
      gameMode,
    }) => () => {
      logAnalytics(
        gameMode.gameModeType === GAME_MODE_TYPES.SINGLE
          ? GA__PLAYER_PROFILE_LIST_CLICK
          : GA__TEAM_PROFILE_LIST_CLICK,
      )
    },
  }),
)

export default container
