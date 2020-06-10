import * as R from 'ramda'
import {
  compose,
  withProps,
  branch,
  renderNothing,
  withHandlers,
  withState,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'

import { memberStatisticSelector } from 'weplay-competitive/reduxs/statistic/reducer'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'
import { AT__USER_PERFORMANCE_SPOILER } from 'weplay-competitive/analytics/amplitude'

const INITIAL_PERFORMANCE_LINES = 5

const container = compose(
  connect(createStructuredSelector({
    // selectors
    statistic: memberStatisticSelector,
  }), {
    // actionCreators
  }),
  withDiscipline,
  withAnalytics,
  withLocale,
  withState('isShowAllPerformance', 'updateShowAllPerformance', false),
  withHandlers({
    togglePerformance: ({
      isShowAllPerformance,
      updateShowAllPerformance,
      logAmplitude,
    }) => () => {
      if (!isShowAllPerformance) {
        logAmplitude(AT__USER_PERFORMANCE_SPOILER)
      }
      updateShowAllPerformance(!isShowAllPerformance)
    },
  }),
  withProps(({
    t,
    statistic,
    isShowAllPerformance,
    tournamentDiscipline,
  }) => {
    const performances = tournamentDiscipline.statistic.performanceNames.map(performanceItem => ({
      id: performanceItem.name,
      text: t(`competitive.member.tournamentSection.${tournamentDiscipline.statistic.name}.performance.${performanceItem.name}`), // eslint-disable-line
      value: R.pipe(
        R.map(name => R.prop(name)(statistic)),
        R.join('/'),
      )(performanceItem.value),
    }))

    return {
      performances: isShowAllPerformance ? performances : performances.slice(0, INITIAL_PERFORMANCE_LINES),
    }
  }),

  branch(
    ({ performances }) => !performances,
    renderNothing,
  ),

)

export default container
