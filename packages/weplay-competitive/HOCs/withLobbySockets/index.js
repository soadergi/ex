import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withHandlers,
  withPropsOnChange,
  withState,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { userIdSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { dispatchPartialModelAction } from 'weplay-core/reduxs/_factories/utils'

import withMatchAlert from 'weplay-components/withMatchAlert'

import { LOBBY_STATUSES } from 'weplay-competitive/constants/lobbyStatuses'
import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'
import { MATCH_MEMBER_STATUSES } from 'weplay-competitive/constants/matchMemberStatuses'
import lobbySocket from 'weplay-competitive/services/lobbySocket'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import { lobbiesSelectors } from 'weplay-competitive/reduxs/lobbies'
import { tournamentMembersSelectors } from 'weplay-competitive/reduxs/tournamentMembers'
import { getInitialData } from 'weplay-competitive/pages/MatchPage/actionChains'
import { MEMBER_STATUSES } from 'weplay-competitive/constants/memberStatuses'

import { createOnLobbySocketMessage } from './createOnLobbySocketMessage'
// TODO: @illia think how to avoid assumming passed property
// now it assumes matchMembers and match
const container = compose(
  connect(createStructuredSelector({
    // selectors
    currentUserId: userIdSelector,
    currentMember: currentMemberSelector,
    getTournamentMemberById: tournamentMembersSelectors.getRecordByIdSelector,
    getLobbyById: lobbiesSelectors.getRecordByIdSelector,
  }), {
    // actionCreators
    dispatchPartialModelAction,
    getInitialData,
  }),
  withMatchAlert,
  withState('isOnlineEventSent', 'setIsOnlineEventSent', false),
  withState('startVoteDatetime', 'setStartVoteDatetime', ''),
  withState('isShowRestartLobbyAlert', 'setShowRestartLobbyAlert', false),
  withPropsOnChange([
    'match',
  ], ({
    match,
  }) => ({
    lobbyId: R.path([
      'relationships',
      'lobby',
      'id',
    ])(match),
  })),
  withPropsOnChange([
    'currentMember',
    'matchMembers',
    'getTournamentMemberById',
  ], ({
    currentMember,
    matchMembers,
    getTournamentMemberById,
  }) => ({
    currentMatchMemberId: R.pipe(
      R.find(R.pipe(
        R.path(['relationships', 'tournamentMember', 'id']),
        getTournamentMemberById,
        R.pathEq(['relationships', 'member', 'id'], currentMember.id),
      )),
      R.prop('id'),
    )(matchMembers),
    currentMatchMember: R.pipe(
      R.find(R.pipe(
        R.path(['relationships', 'tournamentMember', 'id']),
        getTournamentMemberById,
        R.pathEq(['relationships', 'member', 'id'], currentMember.id),
      )),
    )(matchMembers),
  })),
  withPropsOnChange([
    'lobbyId',
    'getLobbyById',
  ], ({
    lobbyId,
    getLobbyById,
  }) => ({
    lobby: getLobbyById(lobbyId),
  })),
  withState(
    'listenerIndexWS',
    'setListenerIndexWS',
    undefined,
  ),
  withHandlers(({ setListenerIndexWS }) => {
    let listenerIndex
    return {
      setListenerIndex: () => (newListenerIndex) => {
        listenerIndex = newListenerIndex
        setListenerIndexWS(listenerIndex)
      },
      getListenerIndex: () => () => listenerIndex,
    }
  }),
  withHandlers({
    sendMemberStatusOnlineEvent: ({
      currentUserId,
      lobbyId,
      currentMatchMemberId,
      lobby,
      currentMatchMember,
      match,
      setIsOnlineEventSent,
      listenerIndexWS,
      currentMember,
    }) => () => {
      if (
        lobbyId
          && lobby?.status === LOBBY_STATUSES.UPCOMING
          && match?.status === MATCH_STATUSES.UPCOMING
          && currentMatchMemberId
          && currentMatchMember.status === MATCH_MEMBER_STATUSES.OFFLINE
          && currentUserId
          && !R.isNil(listenerIndexWS)
          && currentMember.status !== MEMBER_STATUSES.BANNED
      ) {
        lobbySocket.sendMemberStatusEvent({
          userId: currentUserId,
          lobbyId,
          currentMatchMemberId,
          status: MATCH_MEMBER_STATUSES.ONLINE,
        })
        setIsOnlineEventSent(true)
      }
    },
  }),
  withHandlers({
    onLobbySocketMessage: ({
      match,
      playMatchAlertSound,
      setStartVoteDatetime,
      setShowRestartLobbyAlert,
      dispatchPartialModelAction, // eslint-disable-line no-shadow
    }) => createOnLobbySocketMessage({
      match,
      playMatchAlertSound,
      setStartVoteDatetime,
      setShowRestartLobbyAlert,
      dispatchPartialModelAction,
    }),
  }),
  // TODO: @ILLIA this is first candidate to rewrite with react hooks
  lifecycle({
    componentDidMount() {
      const {
        lobbyId,
        onLobbySocketMessage,
        setListenerIndex,
      } = this.props

      if (lobbyId) {
        lobbySocket.subscribe(lobbyId, onLobbySocketMessage)
          .then(setListenerIndex)
      }
    },
    componentDidUpdate(prevProps) {
      const {
        lobbyId,
        getListenerIndex,
        onLobbySocketMessage,
        setListenerIndex,
        isOnlineEventSent,
        setIsOnlineEventSent,
        getInitialData, // eslint-disable-line no-shadow
        sendMemberStatusOnlineEvent,
        listenerIndexWS,
      } = this.props
      if ((prevProps.lobbyId !== lobbyId)) {
        if (prevProps.lobbyId) {
          lobbySocket.unsubscribe(prevProps.lobbyId, getListenerIndex())
          setIsOnlineEventSent(false)
        }
        if (lobbyId) {
          getInitialData(this.props)
            .then(() => lobbySocket.subscribe(lobbyId, onLobbySocketMessage)
              .then((res) => {
                setListenerIndex(res)
                setIsOnlineEventSent(false)
                sendMemberStatusOnlineEvent()
              }))
        }
      }
      if ((prevProps.listenerIndexWS !== listenerIndexWS)) {
        sendMemberStatusOnlineEvent()
      }

      if (!isOnlineEventSent && !R.isNil(listenerIndexWS)) {
        sendMemberStatusOnlineEvent()
      }
    },
    componentWillUnmount() {
      if (this.props.lobbyId) {
        lobbySocket.unsubscribe(this.props.lobbyId, this.props.getListenerIndex())
      }
    },
  }),
)

export default container
