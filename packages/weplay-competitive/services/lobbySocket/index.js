import webSocket, { WS_TOPICS } from 'weplay-singleton/socket'

const getLobbyTopic = lobbyId => `${WS_TOPICS.LOBBY}${lobbyId}`
export const EVENTS = {
  MATCH_STARTED_EVENT: 'MatchStartedEvent',
  MATCH_ONGOING_EVENT: 'MatchOngoingEvent',
  MATCH_ENDED_EVENT: 'MatchEndedEvent',
  MATCH_FINISHED_EVENT: 'MatchFinishedEvent',
  MATCH_CANCELED_EVENT: 'MatchCanceledEvent',
  MATCH_SCORE_EVENT: 'MatchScoreEvent',
  MATCH_CHANGE_SCORE_EVENT: 'MatchChangeScoreEvent',
  VOTE_EVENT: 'VoteEvent',
  MEMBER_EVENT: 'MemberEvent',
  RESTART_LOBBY_EVENT: 'RestartLobbyEvent',
}
const LOBBY_SERVICE_INPUT_TOPIC = '/wss/input/lobby'
class LobbySocket {
  // TODO: here API can be reducer like - we can pass object with keys -
  // event types and values - handler of those messages
  subscribe = (lobbyId, onLobbySocketMessage) => {
    const lobbyTopic = getLobbyTopic(lobbyId)
    return webSocket.subscribeToTopic(lobbyTopic, onLobbySocketMessage)
  }

  unsubscribe = (lobbyId, indexOfListener) => {
    const lobbyTopic = getLobbyTopic(lobbyId)
    return webSocket.unsubscribeFromTopic(lobbyTopic, indexOfListener)
  }

  sendMemberStatusEvent = ({
    userId,
    lobbyId,
    currentMatchMemberId,
    status,
  }) => {
    const statusEvent = {
      meta: {
        type: EVENTS.MEMBER_EVENT,
      },
      data: {
        data: {
          id: currentMatchMemberId,
          type: 'MatchMember',
          attributes: {
            status,
          },
          relationships: {
            lobby: {
              data: {
                type: 'Lobby',
                id: lobbyId,
              },
            },
          },
        },
      },
    }
    webSocket.send(userId, LOBBY_SERVICE_INPUT_TOPIC, statusEvent)
  }

  sendVoteMapEvent = ({
    userId,
    currentLobbyMapId,
    lobbyId,
    voteItemId,
  }) => {
    const voteEvent = {
      meta: {
        type: EVENTS.VOTE_EVENT,
      },
      data: {
        data: {
          id: currentLobbyMapId,
          type: 'LobbyMap',
          relationships: {
            map: {
              data: {
                type: 'VoteItem',
                id: voteItemId,
              },
            },
            lobby: {
              data: {
                type: 'Lobby',
                id: lobbyId,
              },
            },
          },
        },
      },
    }
    return webSocket.send(userId, LOBBY_SERVICE_INPUT_TOPIC, voteEvent)
  }
}

export default new LobbySocket()
