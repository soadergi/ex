import {
  compose,
  withHandlers,
  withProps,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { isRadiantWinnerSelector } from 'weplay-events/reduxs/openDota/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    isRadiantWinner: isRadiantWinnerSelector,
  }), {
    // actionCreators
  }),
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
  withProps({
    gameDuration: {
      hours: '1h',
      minutes: '29m',
    },
  }),
  withPropsOnChange([
    'matchId',
  ], ({
    matchId,
  }) => ({
    openDotaMatchIds: matchId.split(','),
  })),
)

export default container
