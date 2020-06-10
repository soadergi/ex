import {
  compose,
  withPropsOnChange,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { lobbyMapsSelectors } from 'weplay-competitive/reduxs/lobbyMaps'
import { voteItemsSelectors } from 'weplay-competitive/reduxs/voteItems'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    currentMember: currentMemberSelector,
    getLobbyMapById: lobbyMapsSelectors.getRecordByIdSelector,
    getVoteItemById: voteItemsSelectors.getRecordByIdSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'lobby',
    'getLobbyMapById',
    'getVoteItemById',
  ], ({
    lobby,
    getLobbyMapById,
    getVoteItemById,
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
    voteItems: R.pipe(
      R.pathOr([], ['settings', 'votePool']),
      R.map(getVoteItemById),
    )(lobby),
  })),

  withPropsOnChange([
    'currentMember',
    'currentLobbyMap',
  ], ({
    currentMember,
    currentLobbyMap,
  }) => ({
    isCurrentMemberTurn: R.pathEq(['relationships', 'member', 'id'], currentMember.id)(currentLobbyMap),
  })),
)

export default container
