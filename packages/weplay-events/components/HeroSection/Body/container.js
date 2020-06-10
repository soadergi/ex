import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withProps,
  withPropsOnChange,
} from 'recompose'
import _ from 'lodash'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { goTo, NAMES } from 'weplay-core/routes'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import {
  createIsTournamentFinishedSelector,
  topEightWinnersSelector,
  tournamentStagesSelector,
} from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  withRouteInfo,
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    topEightWinners: topEightWinnersSelector,
    isTournamentFinished: createIsTournamentFinishedSelector(R.path(['TOURNAMENT_ID'])),
    stages: tournamentStagesSelector,
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'TOURNAMENT_ID',
  ], ({
    TOURNAMENT_ID,
  }) => ({
    stageId: TOURNAMENT_ID,
  })),
  withProps(({
    stages,
    stageId,
  }) => ({
    currentStage: R.find(R.propEq('id', String(stageId)))(stages),
  })),
  withHandlers({
    goToStage: ({
      history,
    }) => (stage) => {
      goTo({
        name: NAMES.TUG_OF_WAR,
        history,
        params: {
          stageTitle: _.kebabCase(stage.title),
          tournamentId: stage.id,
        },
      })
    },
  }),
)

export default container
