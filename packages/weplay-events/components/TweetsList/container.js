import {
  compose,
  withProps,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import { tournamentHotTweetIDsSelector, allTweetsUrlSelector } from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    tournamentHotTweetIDs: tournamentHotTweetIDsSelector,
    allTweetsUrl: allTweetsUrlSelector,
    isMobileWidth: isMobileWidthSelector,
  }), {
    // actionCreators
  }),

  withProps({
    // analytic
    contentAction: 'Show all tweets',
    contentType: 'Content',
  }),

  withStateHandlers({
    isOpened: true,
  }, {
    handleClick: ({ isOpened }) => () => ({
      isOpened: !isOpened,
    }),
  }),
)

export default container
