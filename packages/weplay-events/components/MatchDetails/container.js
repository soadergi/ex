import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withPreloader from 'weplay-components/withPreloader'

import { getGameStatistic } from 'weplay-events/reduxs/gameStats/actions'
import {
  matchSelector,
  areMatchesLoadingSelector,
} from 'weplay-events/reduxs/gameStats/reducer'
import { tournamentDisciplineSelector } from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    matches: matchSelector,
    loading: areMatchesLoadingSelector,
    tournamentDiscipline: tournamentDisciplineSelector,
  }), {
    // actionCreators
    getGameStatistic: getGameStatistic.request,
  }),

  withPreloader({
    mapPropsToIsLoading: R.prop(!'loading'),
    isFullScreen: false,
  }),

  withPropsOnChange([
    'matches',
  ], ({
    matches,
  }) => ({
    participantAStats: R.pathOr({}, ['mapsStats', '0', 'teams', '0'], matches),
    participantBStats: R.pathOr({}, ['mapsStats', '0', 'teams', '1'], matches),
  })),

  lifecycle({
    componentDidMount() {
      if (this.props.tournamentDiscipline === 'csgo') {
        this.props.getGameStatistic({
          matchId: this.props.matchId,
        })
      }
    },
  }),
)

export default container
