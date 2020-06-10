import {
  compose, withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withMoment from 'weplay-core/HOCs/withMoment'

import withCountDown from 'weplay-components/withCountDown'

const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),

  withMoment,
  withPropsOnChange([
    'lobbyVoteDuration',
    'lastVoteDateTime',
    'moment',
  ], ({
    lobbyVoteDuration,
    lastVoteDateTime,
    moment,
  }) => ({
    finishVoteDatetime: moment(lastVoteDateTime).add(lobbyVoteDuration, 's'),
  })),

  withCountDown({
    countdownTimePath: ['finishVoteDatetime'],
  }),
)

export default container
