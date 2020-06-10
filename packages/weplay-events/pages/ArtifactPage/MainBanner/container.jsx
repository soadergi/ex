import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withProps,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import withRouter from 'weplay-singleton/RouterProvider/withRouter'
import { goTo, NAMES } from 'weplay-core/routes'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { tournamentStagesSelector } from 'weplay-events/reduxs/tournaments/reducer'

import { STAGE_STATUS, ARTIFACT_STAGE_TITLES } from '../consts'

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    stages: tournamentStagesSelector,
    i18nTexts: i18nTextsSelector,
  })),
  withPropsOnChange([
    'match',
  ], ({
    match,
  }) => ({
    stageId: match.params.tournamentId,
  })),

  withHandlers({
    goToStage: ({
      history,
    }) => (stage) => {
      // TODO: extract it to some routing serice
      goTo({
        name: NAMES.ARTIFACT,
        history,
        params: {
          stageTitle: ARTIFACT_STAGE_TITLES[stage.id],
          tournamentId: stage.id,
        },
      })
    },
  }),
  withProps({
    STAGE_STATUS,
    ARTIFACT_STAGE_TITLES,
  }),
  /* eslint-disable no-shadow */
  withProps(({
    stages,
    stageId,
  }) => ({
    isGameInProgress: R.pipe(
      R.find(R.pathEq(['status'], STAGE_STATUS.ACTIVE)),
      Boolean,
    )(stages),
    currentStage: R.find(R.propEq('id', stageId))(stages),
  })),
)

export default container
