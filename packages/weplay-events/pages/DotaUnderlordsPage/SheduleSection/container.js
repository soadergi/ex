import * as R from 'ramda'
import {
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withMoment from 'weplay-core/HOCs/withMoment'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'

import {
  tournamentGroupNamesSelector,
  createTournamentGroupGamesByDateSelector,
} from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  withRouteInfo,
  withMoment,
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    tournamentGroupNames: tournamentGroupNamesSelector,
    tournamentGroupGamesByDate: createTournamentGroupGamesByDateSelector(R.prop('moment')),
    // selectors
  }), {
    // actionCreators
  }),
)

export default container
