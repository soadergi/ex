import * as R from 'ramda'
import {
  compose, withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

import { gameUrlsSelector, participantKeySelector } from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    urls: gameUrlsSelector(R.path([
      'game',
    ])),
    participantKey: participantKeySelector,
  }), {
  }),
  withAnalytics,
  withHandlers({
    logSocialClick: ({
      logAnalytics,
      game,
      participantKey,
    }) => socialType => logAnalytics({
      eventAction: `Match content - ${socialType}`,
      eventLabel: `${game[participantKey].a.nickname} - ${game[participantKey].b.nickname}`,
    }),
  }),
  withPropsOnChange([
    'game',
    'participantKey',
  ], ({
    game,
    participantKey,
  }) => ({
    isGameInProgress: game.status === 'ACTIVE',
    isGameSheduled: game.status === 'SCHEDULED',
    isTwoParticipantsExists: !R.isEmpty(game[participantKey].a.uuid) && !R.isEmpty(game[participantKey].a.uuid),
  })),
)

export default container
