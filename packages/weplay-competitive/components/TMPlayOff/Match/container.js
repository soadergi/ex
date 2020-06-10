import {
  compose,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as R from 'ramda'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'
import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'
import { GA__VIEW_LOBBY } from 'weplay-competitive/analytics'
import { createIsMatchTechnicalEndedSelector } from 'weplay-competitive/reduxs/commonSelectors/matches'

const container = compose(
  connect(createStructuredSelector({
    isMatchTechnicalEnded: createIsMatchTechnicalEndedSelector(props => props?.game?.matchId),
  }), {
  }),
  withDiscipline,
  withAnalytics,
  withHandlers({
    handleClickViewLobby: ({
      logAnalytics,
    }) => () => {
      logAnalytics(GA__VIEW_LOBBY)
    },
  }),

  withPropsOnChange([
    'game',
  ], ({
    game,
  }) => ({
    isGameFinished: game.status === MATCH_STATUSES.FINISHED || game.status === MATCH_STATUSES.TECHNICAL_DEFEAT,
    isGameInProgress: game.status === MATCH_STATUSES.ONGOING || game.status === 'ACTIVE',
    isGameSheduled: game.status === MATCH_STATUSES.UPCOMING || game.status === MATCH_STATUSES.VOTING
        || game.status === MATCH_STATUSES.SETUP_SERVER
        || game.status === 'SCHEDULED',
    isGameCanceled: game.status === MATCH_STATUSES.CANCELED,
  })),
  withPropsOnChange([
    'game',
  ], ({
    game,
  }) => {
    const participantKey = (R.has('teams', game) ? 'teams' : 'players')

    return {
      participantA: game[participantKey].a,
      participantB: game[participantKey].b,
    }
  }),
)

export default container
