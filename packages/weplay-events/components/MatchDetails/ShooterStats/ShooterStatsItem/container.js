import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  withAnalytics,

  withPropsOnChange([
    'mapStat',
  ], ({
    mapStat,
  }) => ({
    participantAStats: {
      score: {
        total: R.path(['teams', 0, 'score'], mapStat),
        ct: R.path(['teams', 0, 'ct'], mapStat),
        terrorist: R.path(['teams', 0, 'terrorist'], mapStat),
      },
    },
    participantBStats: {
      score: {
        total: R.path(['teams', 1, 'score'], mapStat),
        ct: R.path(['teams', 1, 'ct'], mapStat),
        terrorist: R.path(['teams', 1, 'terrorist'], mapStat),
      },
    },
  })),

  withHandlers({
    logSocialClick: ({
      logAnalytics,
    }) => (socialType) => {
      logAnalytics({
        eventAction: `Match content - ${socialType}`,
      })
    },
    logMapImageClick: ({
      logAnalytics,
    }) => () => {
      logAnalytics({
        eventAction: 'Playoffs Map photo',
      })
    },
    logMapNameClick: ({
      logAnalytics,
    }) => () => {
      logAnalytics({
        eventAction: 'Playoffs  Map name',
      })
    },
  }),
)

export default container
