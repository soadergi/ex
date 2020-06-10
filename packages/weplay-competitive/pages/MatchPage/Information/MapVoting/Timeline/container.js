import {
  compose,
  withPropsOnChange,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { lobbyMapsSelectors } from 'weplay-competitive/reduxs/lobbyMaps'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    getLobbyMapById: lobbyMapsSelectors.getRecordByIdSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'lobby',
    'getLobbyMapById',
  ], ({
    lobby,
    getLobbyMapById,
  }) => ({
    lobbyMaps: R.pipe(
      R.pathOr('', ['relationships', 'maps']),
      R.map(
        R.pipe(
          R.prop('id'),
          getLobbyMapById,
        ),
      ),
    )(lobby),
  })),
)

export default container
