import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import { gameUrlsSelector, participantKeySelector } from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    participantKey: participantKeySelector,
    urls: gameUrlsSelector(R.path([
      'game',
    ])),
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
  ], ({
    game,
  }) => ({
    isGameFinished: game.status === 'FINISHED',
    isGameInProgress: game.status === 'ACTIVE',
    isGameSheduled: game.status === 'SCHEDULED',
  })),
  withPropsOnChange([
    'game',
  ], ({
    game,
  }) => {
    const participantKey = (R.has('teams', game) ? 'teams' : 'players')

    return {
      participantA: game[participantKey].a,
      participantB: R.pipe(
        R.path([participantKey, 'b']),
        R.ifElse(
          R.isEmpty,
          R.always(null),
          R.identity,
        ),
      )(game),
      isTwoParticipantsExists: !R.isEmpty(game[participantKey].a.uuid) && !R.isEmpty(game[participantKey].b.uuid),
    }
  }),
)

export default container
