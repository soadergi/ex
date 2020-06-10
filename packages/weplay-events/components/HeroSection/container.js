import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import {
  createIsTournamentFinishedSelector,
  tournamentDatesSelector,
  createIsTournamentScheduledSelector,
} from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    tournamentDates: tournamentDatesSelector,
    isTournamentFinished: createIsTournamentFinishedSelector(R.path(['TOURNAMENT_ID'])),
    isTournamentScheduled: createIsTournamentScheduledSelector(R.path(['TOURNAMENT_ID'])),
  }), {
    // actionCreators
  }),

  withStateHandlers({
    isWinnersListCollapsed: true,
  }, {
    hideWinnersList: () => () => ({
      isWinnersListCollapsed: true,
    }),

    showWinnersList: () => () => ({
      isWinnersListCollapsed: false,
    }),
  }),
  withPropsOnChange([
    'tournamentDates',
    'tournamentStagesDates',
  ], ({
    tournamentDates,
    tournamentStagesDates,
  }) => ({
    tournamentDates: tournamentStagesDates || tournamentDates,
  })),
)

export default container
