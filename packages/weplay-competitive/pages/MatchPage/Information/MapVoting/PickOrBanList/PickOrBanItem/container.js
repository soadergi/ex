import {
  branch,
  compose,
  renderNothing,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'

const container = compose(
  withLocale,
  connect(createStructuredSelector({
    // selectors
    getTournamentMemberById: tournamentMembersSelectors.getRecordByIdSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'voteItem',
    'lobbyMaps',
  ], ({
    voteItem,
    lobbyMaps,
  }) => ({
    lobbyMap: R.find(
      R.pathEq(['relationships', 'map', 'id'], R.prop('id', voteItem)),
    )(lobbyMaps),
  })),

  branch(
    ({
      lobbyMaps,
      voteItem,
    }) => !lobbyMaps || !voteItem,
    renderNothing,
  ),

  withPropsOnChange([
    'lobbyMap',
    'homeParticipant',
    'awayParticipant',
    'matchPlayer1Id',
    'getTournamentMemberById',
  ], ({
    lobbyMap,
    homeParticipant,
    awayParticipant,
    matchPlayer1Id,
    getTournamentMemberById,
  }) => {
    const isHome = R.pathEq(
      ['relationships', 'member', 'id'],
      R.pipe(
        getTournamentMemberById,
        R.pathOr(NaN, ['relationships', 'member', 'id']),
      )(matchPlayer1Id),
    )(lobbyMap)

    return {
      participant: isHome ? homeParticipant : awayParticipant,
    }
  }),

  withHandlers({
    handleVote: ({
      voteMap,
      voteItem,
      isCurrentMemberTurn,
    }) => () => (isCurrentMemberTurn ? voteMap({
      voteItemId: R.prop('id', voteItem),
    }) : null),
  }),
)

export default container
