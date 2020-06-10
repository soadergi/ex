import {
  branch,
  renderNothing,
  compose,
  withHandlers,
  withProps,
  withPropsOnChange,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import withMoment from 'weplay-core/HOCs/withMoment'
import { userIdSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { lobbiesSelectors } from 'weplay-competitive/reduxs/lobbies'
import { lobbyMapsSelectors } from 'weplay-competitive/reduxs/lobbyMaps'
import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'
import { createParticipantInfoSelector } from 'weplay-competitive/reduxs/commonSelectors/members'
import lobbySocket from 'weplay-competitive/services/lobbySocket'

// eslint-disable-next-line max-len
const lobbyModalBg = 'https://static-prod.weplay.tv/2020-03-16/0b6e4a36dcf2276ef79220e01f9f4908.11182C-434046-333C46.jpeg'

const mapPropsToTournamentId = R.path([
  'match', 'params', 'tournamentId',
])
const mapPropsToHomeParticipantId = R.prop('matchPlayer1Id')
const mapPropsToAwayParticipantId = R.prop('matchPlayer2Id')

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    // selectors
    currentUserId: userIdSelector,
    lobby: lobbiesSelectors.createRecordByIdSelector(R.prop('lobbyId')),
    getLobbyMapById: lobbyMapsSelectors.getRecordByIdSelector,
    getTournamentMemberById: tournamentMembersSelectors.getRecordByIdSelector,
    homeParticipant: createParticipantInfoSelector(mapPropsToTournamentId, mapPropsToHomeParticipantId),
    awayParticipant: createParticipantInfoSelector(mapPropsToTournamentId, mapPropsToAwayParticipantId),
  }), {
    // actionCreators
  }),

  withMoment,

  withPropsOnChange([
    'lobby',
    'moment',
    'getLobbyMapById',
    'startVoteDatetime',
    'matchPlayer1Id',
    'getTournamentMemberById',
  ], ({
    lobby,
    moment,
    getLobbyMapById,
    startVoteDatetime,
    matchPlayer1Id,
    getTournamentMemberById,
  }) => {
    if (!lobby.isFetched) return {}

    const maps = R.pipe(
      R.path(['relationships', 'maps']),
      R.map(
        R.pipe(
          R.prop('id'),
          getLobbyMapById,
        ),
      ),
    )(lobby)

    const coinMemberId = R.pipe(
      R.head,
      R.path(['relationships', 'member', 'id']),
    )(maps)

    const homeMemberId = R.pipe(
      getTournamentMemberById,
      R.pathOr(NaN, ['relationships', 'member', 'id']),
    )(matchPlayer1Id)

    const isHomeMemberHasCoin = coinMemberId && homeMemberId && (coinMemberId === homeMemberId)

    const currentLobbyMap = R.find(
      lobbyMap => lobbyMap.isFetched && !lobbyMap.relationships.map,
      maps,
    )

    const lastVoteDateTime = R.pipe(
      R.indexOf(currentLobbyMap),
      indexOfCurrentLobbyMap => maps[indexOfCurrentLobbyMap - 1],
      R.prop('updateDatetime'),
      R.defaultTo(moment(startVoteDatetime).toISOString()),
    )(maps)

    return ({
      lastVoteDateTime,
      currentLobbyMap,
      isHomeMemberHasCoin,
    })
  }),

  withPropsOnChange([
    'lobby',
  ], ({
    lobby,
  }) => ({
    lobbyVotePool: R.pathOr('', ['settings', 'votePool'], lobby),
    voteVetoLogic: R.pathOr('', ['settings', 'voteVetoLogic'], lobby),
  })),

  branch(
    ({
      currentLobbyMap,
      homeParticipant,
      awayParticipant,
    }) => !currentLobbyMap || !homeParticipant || !awayParticipant,
    renderNothing,
  ),

  withHandlers({
    voteMap: ({
      currentLobbyMap,
      lobbyId,
      currentUserId,
    }) => ({ voteItemId }) => lobbySocket.sendVoteMapEvent({
      userId: currentUserId,
      currentLobbyMapId: currentLobbyMap.id,
      lobbyId,
      voteItemId,
    }),
  }),

  withProps({
    background: {
      backgroundImage: `url('${lobbyModalBg}')`,
    },
  }),
)

export default container
