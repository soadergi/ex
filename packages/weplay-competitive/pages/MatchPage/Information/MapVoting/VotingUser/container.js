import {
  compose,
  withPropsOnChange,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import withMoment from 'weplay-core/HOCs/withMoment'

import withCountDown from 'weplay-components/withCountDown'

import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'

const container = compose(
  withLocale,
  connect(createStructuredSelector({
    // selectors
    getTournamentMemberById: tournamentMembersSelectors.getRecordByIdSelector,
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

  withPropsOnChange([
    'countdown',
    'currentLobbyMap',
    'lobbyVoteDuration',
    'tournamentMemberId',
    'getTournamentMemberById',
  ], ({
    countdown,
    currentLobbyMap,
    lobbyVoteDuration,
    tournamentMemberId,
    getTournamentMemberById,
  }) => {
    const { seconds, minutes } = countdown
    const circumference = 201
    const startingPoint = 0
    const timeLeftForVoteInSeconds = lobbyVoteDuration - (Number(minutes) * 60) - Number(seconds)
    const isVoting = R.pathEq(
      ['relationships', 'member', 'id'],
      R.pipe(
        getTournamentMemberById,
        R.pathOr(NaN, ['relationships', 'member', 'id']),
      )(tournamentMemberId),
    )(currentLobbyMap)
    const status = isVoting ? currentLobbyMap.vote : 'waiting'
    return {
      // eslint-disable-next-line no-mixed-operators
      dashOffset: (startingPoint - (timeLeftForVoteInSeconds * circumference / lobbyVoteDuration)) || 0,
      status,
      isVoting,
    }
  }),
)

export default container
