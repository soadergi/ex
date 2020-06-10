import {
  compose,
  withPropsOnChange,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    getTournamentMemberById: tournamentMembersSelectors.getRecordByIdSelector,
  }), {
    // actionCreators
  }),

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
    if (!lobbyMap) return {}

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

  withPropsOnChange([
    'lobbyMap',
    'currentLobbyMap',
  ], ({
    lobbyMap,
    currentLobbyMap,
  }) => ({
    color: lobbyMap.vote === 'PICK' ? 'isSuccess' : '',
    isActive: R.eqProps('id', lobbyMap, currentLobbyMap),
  })),
)

export default container
