import { compose } from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { voteItemsSelectors } from 'weplay-competitive/reduxs/voteItems'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    voteItem: voteItemsSelectors.createRecordByIdSelector(
      R.path(['lobbyMap', 'relationships', 'map', 'id']),
    ),

  }), {
    // actionCreators
  }),
)

export default container
