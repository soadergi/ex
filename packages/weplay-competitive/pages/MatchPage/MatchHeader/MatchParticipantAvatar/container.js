import {
  compose, withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as R from 'ramda'

import { membersSelectors } from 'weplay-competitive/reduxs/members'
import { teamsSelectors } from 'weplay-competitive/reduxs/teams'
import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'
import { gameModesSelectors } from 'weplay-competitive/reduxs/gameModes'
import { tournamentsSelectors } from 'weplay-competitive/reduxs/tournaments'

const container = compose(
  // TODO: @ILLIA EXTRACT TO HOC OR ONE SELECTOR?
  connect(createStructuredSelector({
    // selectors
    tournament: tournamentsSelectors.createRecordByIdSelector(
      R.prop('tournamentId'),
    ),
    tournamentMember: tournamentMembersSelectors.createRecordByIdSelector(
      R.prop('tournamentMemberId'),
    ),
  }), {
    // actionCreators
  }),
  connect(createStructuredSelector({
    // selectors
    gameMode: gameModesSelectors.createRecordByIdSelector(R.pathOr(NaN, [
      'tournament',
      'relationships',
      'gameMode',
      'id',
    ])),
    member: membersSelectors.createRecordByIdSelector(R.pathOr(NaN, [
      'tournamentMember',
      'relationships',
      'member',
      'id',
    ])),
    team: teamsSelectors.createRecordByIdSelector(R.pathOr(NaN, [
      'tournamentMember',
      'relationships',
      'team',
      'id',
    ])),
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'member',
    'team',
    'gameMode',
    'numbeOfActivePartipants',
  ], ({
    member,
    team,
    gameMode,
    numbeOfActivePartipants,
  }) => ({
    isActive: gameMode.size === numbeOfActivePartipants,
    participant: team.isFetched
      ? team
      : member,
  })),
)

export default container
