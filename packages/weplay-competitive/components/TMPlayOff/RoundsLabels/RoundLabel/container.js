import {
  compose,
  withPropsOnChange,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'

const mapPropsToTournamentId = R.pipe(
  R.path([
    'match', 'params', 'tournamentId',
  ]),
  Number,
)

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    // selectors
    currentTournament: tournamentsSelectors.createRecordByIdSelector(mapPropsToTournamentId),

  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'round',
    'currentTournament',
  ], ({
    round,
    currentTournament,
  }) => {
    const roundSettings = currentTournament?.settings?.[round.roundType]
        ?? currentTournament?.settings?.qualification
    return {
      voteFormat: R.concat(
        'BO',
        R.pipe(
          R.propOr('', 'voteFormat'),
          R.split('best'),
          R.last(),
        )(roundSettings),
      ),
    }
  }),
)

export default container
