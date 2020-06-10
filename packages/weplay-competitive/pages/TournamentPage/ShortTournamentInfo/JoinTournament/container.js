import {
  branch,
  compose,
  renderNothing,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withMoment from 'weplay-core/HOCs/withMoment'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'

import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'
import { ACCESS_TYPES } from 'weplay-competitive/constants/accessTypes'
import { TOURNAMENT_STATUSES } from 'weplay-competitive/constants/tournamentStatuses'
import { AT__TOURNAMENTS_DETAILS_SEE_BRACKET } from 'weplay-competitive/analytics/amplitude'

const container = compose(
  // TODO: move here Join Tournament logic
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),
  branch(
    ({ currentTournament }) => currentTournament.status === TOURNAMENT_STATUSES.CANCELED,
    renderNothing,
  ),
  withHandlers({
    scrollToBrackets: () => el => el.scrollIntoView({ behavior: 'smooth', block: 'start' }),
  }),
  withAnalytics,
  withDiscipline,
  withLocale,
  withHandlers({
    handleSeeBracketClick: ({
      logAmplitude,
      discipline,
    }) => () => {
      logAmplitude(AT__TOURNAMENTS_DETAILS_SEE_BRACKET, {
        Discipline: discipline,
      })
    },
  }),
  withMoment,
  withPropsOnChange([
    'currentTournament',
    'moment',
  ], (({
    currentTournament,
    moment,
  }) => ({
    regWillBeClosed:
      !moment().isAfter(currentTournament.closeRegistrationDatetime)
      && currentTournament.status === TOURNAMENT_STATUSES.UPCOMING,
    isPremiumTournament: currentTournament.accessType === ACCESS_TYPES.ACCESS_BY_PREMIUM,
  }))),
)

export default container
